import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Switch,
  Divider,
  Typography,
  Row,
  Col,
  Select,
  InputNumber,
  Space,
  Alert,
  Badge,
  Tooltip
} from 'antd';
import {
  CloudServerOutlined,
  SyncOutlined,
  LinkOutlined,
  DisconnectOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import { useTeamcenter } from '../../context/TeamcenterContext';
import TeamcenterRequirementsPreview from './TeamcenterRequirementsPreview';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const TeamcenterSettings: React.FC = () => {
  const {
    connectionStatus,
    connectionError,
    lastSyncTime,
    isAuthenticated,
    settings,
    integrationSettings,
    updateSettings,
    updateIntegrationSettings,
    connect,
    disconnect,
    syncData
  } = useTeamcenter();

  const [loading, setLoading] = useState(false);
  const [syncLoading, setSyncLoading] = useState(false);
  const [connectionForm] = Form.useForm();
  const [integrationForm] = Form.useForm();

  // Function to handle connection
  const handleConnect = async () => {
    try {
      setLoading(true);
      await connect();
    } finally {
      setLoading(false);
    }
  };

  // Function to handle disconnection
  const handleDisconnect = () => {
    disconnect();
  };

  // Function to handle data synchronization
  const handleSyncData = async () => {
    try {
      setSyncLoading(true);
      await syncData();
    } finally {
      setSyncLoading(false);
    }
  };

  // Get connection status badge
  const getConnectionStatusBadge = () => {
    switch (connectionStatus) {
      case 'connected':
        return <Badge status="success" text="Connected" />;
      case 'connecting':
        return <Badge status="processing" text="Connecting..." />;
      case 'error':
        return <Badge status="error" text="Connection Error" />;
      case 'disconnected':
      default:
        return <Badge status="default" text="Disconnected" />;
    }
  };

  return (
    <div className="teamcenter-settings">
      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <Card
            title={
              <Space>
                <CloudServerOutlined />
                <span>Siemens Teamcenter Integration</span>
              </Space>
            }
            extra={getConnectionStatusBadge()}
          >
            {connectionError && (
              <Alert
                message="Connection Error"
                description={connectionError}
                type="error"
                showIcon
                style={{ marginBottom: 16 }}
              />
            )}

            <Row gutter={[24, 24]}>
              <Col xs={24} lg={12}>
                <Card
                  type="inner"
                  title="Connection Settings"
                  className="settings-card"
                  extra={
                    isAuthenticated ? (
                      <Button
                        danger
                        icon={<DisconnectOutlined />}
                        onClick={handleDisconnect}
                        disabled={connectionStatus === 'disconnected'}
                      >
                        Disconnect
                      </Button>
                    ) : (
                      <Button
                        type="primary"
                        icon={<LinkOutlined />}
                        onClick={handleConnect}
                        loading={loading}
                        disabled={connectionStatus === 'connecting'}
                      >
                        Connect
                      </Button>
                    )
                  }
                >
                  <Form
                    form={connectionForm}
                    layout="vertical"
                    initialValues={settings}
                    onValuesChange={(changedValues) => {
                      updateSettings(changedValues);
                    }}
                  >
                    <Form.Item
                      name="serverUrl"
                      label="Server URL"
                      rules={[{ required: true, message: 'Please enter the Teamcenter server URL' }]}
                    >
                      <Input
                        prefix={<CloudServerOutlined />}
                        placeholder="https://teamcenter.example.com"
                        disabled={isAuthenticated}
                      />
                    </Form.Item>

                    <Form.Item
                      name="instance"
                      label="Instance"
                      rules={[{ required: true, message: 'Please select an instance' }]}
                    >
                      <Select disabled={isAuthenticated}>
                        <Option value="production">Production</Option>
                        <Option value="development">Development</Option>
                        <Option value="testing">Testing</Option>
                        <Option value="staging">Staging</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item name="useSSO" label="Use SSO Authentication" valuePropName="checked">
                      <Switch disabled={isAuthenticated} />
                    </Form.Item>

                    {!settings.useSSO && (
                      <>
                        <Form.Item
                          name="username"
                          label="Username"
                          rules={[{ required: !settings.useSSO, message: 'Please enter your username' }]}
                        >
                          <Input disabled={isAuthenticated} />
                        </Form.Item>

                        <Form.Item
                          name="password"
                          label="Password"
                          rules={[{ required: !settings.useSSO, message: 'Please enter your password' }]}
                        >
                          <Input.Password disabled={isAuthenticated} />
                        </Form.Item>
                      </>
                    )}

                    {lastSyncTime && (
                      <div style={{ marginTop: 16 }}>
                        <Text type="secondary">
                          <ClockCircleOutlined /> Last synced:
                          {' ' + new Date(lastSyncTime).toLocaleString()}
                        </Text>
                      </div>
                    )}
                  </Form>
                </Card>
              </Col>

              <Col xs={24} lg={12}>
                <Card
                  type="inner"
                  title="Integration Settings"
                  className="settings-card"
                  extra={
                    <Button
                      type="primary"
                      icon={<SyncOutlined />}
                      onClick={handleSyncData}
                      disabled={!isAuthenticated || syncLoading}
                      loading={syncLoading}
                    >
                      Sync Now
                    </Button>
                  }
                >
                  <Form
                    form={integrationForm}
                    layout="vertical"
                    initialValues={integrationSettings}
                    onValuesChange={(changedValues) => {
                      updateIntegrationSettings(changedValues);
                    }}
                  >
                    <Row gutter={16}>
                      <Col span={24}>
                        <Paragraph>
                          <Text strong>Data Synchronization Options</Text>
                        </Paragraph>
                      </Col>

                      <Col span={12}>
                        <Form.Item name="syncRequirements" valuePropName="checked" label="Requirements">
                          <Switch disabled={!isAuthenticated} />
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Form.Item name="syncTestData" valuePropName="checked" label="Test Data">
                          <Switch disabled={!isAuthenticated} />
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Form.Item name="syncVerificationMatrix" valuePropName="checked" label="Verification Matrix">
                          <Switch disabled={!isAuthenticated} />
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Form.Item
                          name="enableBidirectionalSync"
                          valuePropName="checked"
                          label={
                            <Tooltip title="Changes can be made in both systems and synchronized">
                              <span>
                                Bidirectional Sync <InfoCircleOutlined />
                              </span>
                            </Tooltip>
                          }
                        >
                          <Switch disabled={!isAuthenticated} />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Divider />

                    <Row gutter={16}>
                      <Col span={24}>
                        <Paragraph>
                          <Text strong>Automatic Synchronization</Text>
                        </Paragraph>
                      </Col>

                      <Col span={12}>
                        <Form.Item name="autoSync" valuePropName="checked" label="Enable Auto-Sync">
                          <Switch disabled={!isAuthenticated} />
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Form.Item name="syncInterval" label="Sync Interval (minutes)">
                          <InputNumber
                            min={5}
                            max={1440}
                            disabled={!isAuthenticated || !integrationSettings.autoSync}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </Card>
              </Col>
            </Row>

            {isAuthenticated && (
              <>
                <Divider />
                <TeamcenterRequirementsPreview />
              </>
            )}
          </Card>
        </Col>
        
        <Col xs={24}>
          <Card 
            title={
              <span>
                <InfoCircleOutlined /> About Teamcenter Integration
              </span>
            }
            className="settings-card"
          >
            <Paragraph>
              This integration connects your verification center to Siemens Teamcenter PLM system, allowing synchronization of
              requirements, test data, and verification matrices. When connected, you can import data from Teamcenter and
              optionally push verification results back to Teamcenter.
            </Paragraph>
            <Paragraph>
              <Text strong>Note:</Text> You must have appropriate permissions in Teamcenter to access and modify the
              data. Contact your Teamcenter administrator if you encounter permission issues.
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TeamcenterSettings; 