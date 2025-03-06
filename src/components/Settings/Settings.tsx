import React from 'react';
import { Card, Typography, Radio, Space, Divider, Button, Row, Col, Select, Switch, Tooltip } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { 
  SettingOutlined, 
  InfoCircleOutlined, 
  RocketOutlined, 
  ThunderboltOutlined, 
  DatabaseOutlined,
  UserOutlined,
  GlobalOutlined,
  LockOutlined
} from '@ant-design/icons';
import { ProductType, useProduct } from '../../context/ProductContext';

const { Title, Text } = Typography;
const { Option } = Select;

const Settings: React.FC = () => {
  const { productType, setProductType, productName, productDetails } = useProduct();

  const handleProductChange = (value: RadioChangeEvent) => {
    setProductType(value.target.value as ProductType);
  };

  // These would be actual settings in a real app
  const [darkMode, setDarkMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);
  const [dataSync, setDataSync] = React.useState(true);
  const [language, setLanguage] = React.useState('english');
  const [autoSave, setAutoSave] = React.useState(true);

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>
        <SettingOutlined /> Settings
      </Title>
      
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card 
            title={
              <span>
                <DatabaseOutlined /> Product Configuration
              </span>
            }
            style={{ marginBottom: '20px' }}
          >
            <div style={{ marginBottom: '20px' }}>
              <Title level={4}>Active Product</Title>
              <Text type="secondary">
                Switch between different product types to see relevant verification data
              </Text>
              
              <div style={{ marginTop: '16px' }}>
                <Radio.Group onChange={handleProductChange} value={productType} size="large">
                  <Space direction="vertical">
                    <Radio value="missile">
                      <Space>
                        <RocketOutlined />
                        <span>ATMS Block 3 (Missile System)</span>
                      </Space>
                    </Radio>
                    <Radio value="fighter">
                      <Space>
                        <ThunderboltOutlined />
                        <span>F/A-29E Raptor II (Fighter Aircraft)</span>
                      </Space>
                    </Radio>
                  </Space>
                </Radio.Group>
              </div>
            </div>
            
            <Divider />
            
            <Title level={4}>Product Details</Title>
            <div style={{ background: '#f5f5f5', padding: '16px', borderRadius: '4px' }}>
              <p><strong>Name:</strong> {productName}</p>
              <p><strong>Program:</strong> {productDetails.program}</p>
              <p><strong>Version:</strong> {productDetails.version}</p>
              <p><strong>Development Stage:</strong> {productDetails.stage}</p>
              <p><strong>Organization:</strong> {productDetails.organization}</p>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card 
            title={
              <span>
                <UserOutlined /> User Preferences
              </span>
            }
            style={{ marginBottom: '20px' }}
          >
            <div style={{ marginBottom: '16px' }}>
              <Row align="middle" justify="space-between">
                <Col>
                  <Text strong>Dark Mode</Text>
                  <br />
                  <Text type="secondary">Switch between light and dark theme</Text>
                </Col>
                <Col>
                  <Switch 
                    checked={darkMode} 
                    onChange={setDarkMode} 
                  />
                </Col>
              </Row>
            </div>
            
            <Divider />
            
            <div style={{ marginBottom: '16px' }}>
              <Row align="middle" justify="space-between">
                <Col>
                  <Text strong>Notifications</Text>
                  <br />
                  <Text type="secondary">Enable or disable notifications</Text>
                </Col>
                <Col>
                  <Switch 
                    checked={notifications} 
                    onChange={setNotifications} 
                  />
                </Col>
              </Row>
            </div>
            
            <Divider />
            
            <div style={{ marginBottom: '16px' }}>
              <Row align="middle" justify="space-between">
                <Col>
                  <Text strong>Auto-save</Text>
                  <br />
                  <Text type="secondary">Save data changes automatically</Text>
                </Col>
                <Col>
                  <Switch 
                    checked={autoSave} 
                    onChange={setAutoSave} 
                  />
                </Col>
              </Row>
            </div>
            
            <Divider />
            
            <div style={{ marginBottom: '16px' }}>
              <Row align="middle" justify="space-between">
                <Col>
                  <Text strong>Language</Text>
                  <br />
                  <Text type="secondary">Set your preferred language</Text>
                </Col>
                <Col>
                  <Select 
                    value={language} 
                    onChange={setLanguage}
                    style={{ width: '150px' }}
                  >
                    <Option value="english">English</Option>
                    <Option value="spanish">Spanish</Option>
                    <Option value="french">French</Option>
                    <Option value="german">German</Option>
                  </Select>
                </Col>
              </Row>
            </div>
            
            <Divider />
            
            <div style={{ marginBottom: '16px' }}>
              <Row align="middle" justify="space-between">
                <Col>
                  <Text strong>Data Synchronization</Text>
                  <br />
                  <Text type="secondary">Keep data in sync across devices</Text>
                </Col>
                <Col>
                  <Switch 
                    checked={dataSync} 
                    onChange={setDataSync} 
                  />
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
        
        <Col xs={24}>
          <Card 
            title={
              <span>
                <LockOutlined /> Data Security Settings
              </span>
            }
            extra={
              <Tooltip title="These settings control how sensitive verification data is handled">
                <InfoCircleOutlined />
              </Tooltip>
            }
          >
            <div>
              <Text>Security settings are managed by your organization administrator.</Text>
              <div style={{ marginTop: '16px' }}>
                <Button type="primary" disabled>
                  Request Security Policy Changes
                </Button>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Settings; 