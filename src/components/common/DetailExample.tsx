import React from 'react';
import { Card, Tag, Typography, Row, Col, Divider } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, WarningOutlined } from '@ant-design/icons';

const { Text } = Typography;

const DetailExample: React.FC = () => {
  // Example scenario data from the screenshot
  const scenarioData = {
    id: 'SCEN-SS-003',
    title: 'Standoff Strike Scenario Modification',
    description: 'Added requirement to launch from higher altitude to avoid detection',
    date: '2025-01-09T13:20:00Z',
    author: 'Col. David Park',
    status: 'Approved',
    changeType: 'MODIFIED',
    severity: 'MINOR',
    category: 'scenario',
    technicalDetails: {
      rationale: 'Need to avoid recently deployed early warning radar systems',
      tradeoffs: 'Higher altitude launch reduces range',
      risks: 'May affect accuracy at extreme ranges'
    }
  };

  // Format the status tag
  const renderStatusTag = (status: string) => {
    switch (status) {
      case 'Approved':
        return <Tag color="success" icon={<CheckCircleOutlined />}>{status}</Tag>;
      case 'In Progress':
        return <Tag color="processing" icon={<ClockCircleOutlined />}>{status}</Tag>;
      case 'Pending':
        return <Tag color="warning" icon={<ClockCircleOutlined />}>{status}</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  return (
    <Card title={
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Text strong>{scenarioData.title}</Text>
          <Text type="secondary" style={{ marginLeft: 8 }}>{scenarioData.id}</Text>
        </div>
        <div>
          <Tag color="blue">{scenarioData.category.toUpperCase()}</Tag>
          <Tag color="orange">MODIFIED</Tag>
          <Tag color="green">MINOR</Tag>
        </div>
      </div>
    }>
      {/* Combined Details Section */}
      <div className="details-section" style={{ border: '1px solid #f0f0f0', borderRadius: '2px', padding: '16px', marginBottom: '24px' }}>
        <Text strong style={{ fontSize: '16px', display: 'block', marginBottom: '16px' }}>Details</Text>
        
        <Row gutter={[24, 12]}>
          {/* Description (Full Width) */}
          <Col span={24}>
            <Text type="secondary" style={{ fontSize: '13px' }}>Description</Text>
            <div>{scenarioData.description}</div>
          </Col>
          
          {/* Left Column */}
          <Col xs={24} md={12}>
            <Row gutter={[0, 12]}>
              <Col span={24}>
                <Text type="secondary" style={{ fontSize: '13px' }}>ID</Text>
                <div><Text strong>{scenarioData.id}</Text></div>
              </Col>
              <Col span={24}>
                <Text type="secondary" style={{ fontSize: '13px' }}>Date</Text>
                <div>{new Date(scenarioData.date).toLocaleString()}</div>
              </Col>
              <Col span={24}>
                <Text type="secondary" style={{ fontSize: '13px' }}>Status</Text>
                <div>{renderStatusTag(scenarioData.status)}</div>
              </Col>
              <Col span={24}>
                <Text type="secondary" style={{ fontSize: '13px' }}>Rationale</Text>
                <div>{scenarioData.technicalDetails.rationale}</div>
              </Col>
            </Row>
          </Col>
          
          {/* Right Column */}
          <Col xs={24} md={12}>
            <Row gutter={[0, 12]}>
              <Col span={24}>
                <Text type="secondary" style={{ fontSize: '13px' }}>Author</Text>
                <div>{scenarioData.author}</div>
              </Col>
              <Col span={24}>
                <Text type="secondary" style={{ fontSize: '13px' }}>Change Type</Text>
                <div>
                  <Tag color={scenarioData.changeType === 'MODIFIED' ? 'blue' : 'green'}>
                    {scenarioData.changeType}
                  </Tag>
                </div>
              </Col>
              <Col span={24}>
                <Text type="secondary" style={{ fontSize: '13px' }}>Severity</Text>
                <div>
                  <Tag color={scenarioData.severity === 'MINOR' ? 'green' : scenarioData.severity === 'MAJOR' ? 'orange' : 'red'}>
                    {scenarioData.severity}
                  </Tag>
                </div>
              </Col>
              <Col span={24}>
                <Text type="secondary" style={{ fontSize: '13px' }}>Tradeoffs</Text>
                <div>{scenarioData.technicalDetails.tradeoffs}</div>
              </Col>
              <Col span={24}>
                <Text type="secondary" style={{ fontSize: '13px' }}>Risks</Text>
                <div>{scenarioData.technicalDetails.risks}</div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default DetailExample;

// Add empty export to make this a module
export {}; 