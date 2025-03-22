import React from 'react';
import { Button, Row, Col, Typography, Space, Statistic } from 'antd';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import ContentPanel from './ContentPanel';

const { Text, Title } = Typography;

/**
 * ContentPanelExample - A demonstration of different ContentPanel usage patterns
 * 
 * This component shows how to use the ContentPanel component with different configurations
 * to achieve TeamCenter-like styling across the application.
 */
const ContentPanelExample: React.FC = () => {
  return (
    <div className="content-panel-examples">
      <Title level={3}>ContentPanel Examples</Title>
      <Text type="secondary" style={{ marginBottom: '16px', display: 'block' }}>
        These examples demonstrate how to use the TeamCenter-style ContentPanel component
        in different configurations.
      </Text>

      {/* Basic usage */}
      <ContentPanel title="Basic Panel" style={{ marginBottom: '20px' }}>
        <Text>
          This is a basic ContentPanel with a title. The panel has default styling
          similar to TeamCenter's raised content areas.
        </Text>
      </ContentPanel>

      {/* With header actions */}
      <ContentPanel 
        title="Panel with Actions" 
        headerExtra={
          <Button type="primary" size="small" icon={<PlusOutlined />}>
            Add Item
          </Button>
        }
        style={{ marginBottom: '20px' }}
      >
        <Text>
          This panel includes action buttons in the header area. This pattern is useful
          for sections that require user interaction.
        </Text>
      </ContentPanel>

      {/* Colored panel */}
      <ContentPanel 
        style={{ 
          backgroundColor: '#00688C', 
          color: 'white',
          marginBottom: '20px'
        }}
      >
        <Statistic
          title={<Text style={{ color: 'white' }}>Statistics Example</Text>}
          value={42}
          valueStyle={{ color: 'white' }}
          prefix={<InfoCircleOutlined />}
        />
      </ContentPanel>

      {/* Multiple panels in grid layout */}
      <Row gutter={16}>
        <Col span={12}>
          <ContentPanel title="Left Panel">
            <Text>Content in the left panel</Text>
          </ContentPanel>
        </Col>
        <Col span={12}>
          <ContentPanel title="Right Panel">
            <Text>Content in the right panel</Text>
          </ContentPanel>
        </Col>
      </Row>
    </div>
  );
};

export default ContentPanelExample; 