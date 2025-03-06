import React, { useState } from 'react';
import { Tabs, Card, Typography, Badge, Space, Alert, Timeline, Row, Col, Select, DatePicker, Button, Statistic } from 'antd';
import type { Dayjs } from 'dayjs';
import {
  BellOutlined,
  BranchesOutlined,
  RocketOutlined,
  FileTextOutlined,
  FunctionOutlined,
  ApartmentOutlined,
  ToolOutlined,
  ClockCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
// Import the MissionChanges component
import MissionChanges from './MissionChanges';
import OperationalScenarios from './OperationalScenarios';
import RequirementsChanges from './RequirementsChanges';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker;

// For now, we'll comment out the imports and use placeholders for other components
// import FunctionsChanges from './FunctionsChanges';
// import CADDesignChanges from './CADDesignChanges';
// import EngineeringBOMChanges from './EngineeringBOMChanges';

// Placeholders for sub-components that haven't been implemented yet
const FunctionsChanges = () => (
  <div>
    <Alert 
      message="Functions Changes Component" 
      description="This component will track changes to functional decomposition and allocations."
      type="info"
    />
  </div>
);

const CADDesignChanges = () => (
  <div>
    <Alert 
      message="CAD Design Changes Component" 
      description="This component will display modifications to CAD models and design parameters."
      type="info"
    />
  </div>
);

const EngineeringBOMChanges = () => (
  <div>
    <Alert 
      message="Engineering BOM Changes Component" 
      description="This component will track changes to the engineering bill of materials and parts."
      type="info"
    />
  </div>
);

const ChangeAwareness: React.FC = () => {
  const [timeRange, setTimeRange] = useState<[Dayjs, Dayjs] | null>(null);
  const [severityFilter, setSeverityFilter] = useState<string[]>(['critical', 'major', 'minor']);
  const [sourceFilter, setSourceFilter] = useState<string[]>([
    'mission', 'operational', 'requirements', 'functions', 'cad', 'bom'
  ]);
  const [activeTab, setActiveTab] = useState('overview');

  // Extract the current tab from the URL if it exists
  React.useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('/change-awareness/')) {
      const tab = path.split('/').pop() || 'overview';
      setActiveTab(tab);
    }
  }, []);

  // Mock data for the dashboard overview
  const changeSummary = {
    total: 42,
    critical: 5,
    major: 12,
    minor: 25,
    byDomain: {
      mission: 6,
      operational: 8,
      requirements: 14,
      functions: 7,
      cad: 4,
      bom: 3
    }
  };

  // Handle date range change
  const handleDateRangeChange = (dates: any, dateStrings: [string, string]) => {
    if (dates && dates[0] && dates[1]) {
      setTimeRange([dates[0], dates[1]]);
    } else {
      setTimeRange(null);
    }
  };

  return (
    <div className="change-awareness-container">
      <div className="header-section" style={{ marginBottom: 24 }}>
        <Title level={2}>
          <BellOutlined /> Change Awareness
        </Title>
        <Paragraph>
          Track and analyze changes across all domains of the verification process to ensure
          awareness of upstream modifications and their downstream impacts.
        </Paragraph>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="Total Changes"
              value={changeSummary.total}
              prefix={<BellOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="Critical Changes"
              value={changeSummary.critical}
              prefix={<WarningOutlined style={{ color: '#ff4d4f' }} />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="Major Changes"
              value={changeSummary.major}
              prefix={<InfoCircleOutlined style={{ color: '#faad14' }} />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="Minor Changes"
              value={changeSummary.minor}
              prefix={<InfoCircleOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>

      <div className="filters-section" style={{ marginBottom: 24 }}>
        <Card title="Filters">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Title level={5}>Time Range</Title>
              <RangePicker style={{ width: '100%' }} onChange={handleDateRangeChange} />
            </Col>
            <Col xs={24} md={8}>
              <Title level={5}>Severity</Title>
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Select severity levels"
                defaultValue={severityFilter}
                onChange={setSeverityFilter}
              >
                <Option value="critical">Critical</Option>
                <Option value="major">Major</Option>
                <Option value="minor">Minor</Option>
              </Select>
            </Col>
            <Col xs={24} md={8}>
              <Title level={5}>Source</Title>
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Select change sources"
                defaultValue={sourceFilter}
                onChange={setSourceFilter}
              >
                <Option value="mission">Mission</Option>
                <Option value="operational">Operational Scenarios</Option>
                <Option value="requirements">Requirements</Option>
                <Option value="functions">Functions</Option>
                <Option value="cad">CAD Design</Option>
                <Option value="bom">Engineering BOM</Option>
              </Select>
            </Col>
          </Row>
          <Row style={{ marginTop: 16 }}>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary">Apply Filters</Button>
              <Button style={{ marginLeft: 8 }}>Reset</Button>
            </Col>
          </Row>
        </Card>
      </div>

      <Tabs 
        defaultActiveKey="overview" 
        className="changes-tabs"
        activeKey={activeTab}
        onChange={setActiveTab}
      >
        <TabPane 
          tab={<span><BranchesOutlined /> Overview</span>} 
          key="overview"
        >
          <Alert
            message="Recent Critical Changes"
            description="There are 5 critical changes in the last 7 days that require your attention."
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
          />
          
          <Card title="Change Impact Summary">
            <Timeline mode="left">
              <Timeline.Item 
                color="red" 
                label="2 days ago"
                dot={<WarningOutlined style={{ fontSize: '16px' }} />}
              >
                <Text strong>Mission Objective Modified</Text>
                <Paragraph>Mission objective "M-002" was modified, affecting 3 operational scenarios and 12 requirements.</Paragraph>
              </Timeline.Item>
              <Timeline.Item 
                color="orange" 
                label="3 days ago"
                dot={<InfoCircleOutlined style={{ fontSize: '16px' }} />}
              >
                <Text strong>Operational Scenario Updated</Text>
                <Paragraph>Scenario "OS-105" updated with new environmental conditions, impacting 5 requirements.</Paragraph>
              </Timeline.Item>
              <Timeline.Item 
                color="red" 
                label="4 days ago"
                dot={<WarningOutlined style={{ fontSize: '16px' }} />}
              >
                <Text strong>Critical Requirement Changed</Text>
                <Paragraph>Requirement "REQ-F-123" performance threshold increased from 2.5s to 1.8s, affecting 4 functions and 2 components.</Paragraph>
              </Timeline.Item>
              <Timeline.Item 
                color="green" 
                label="5 days ago"
                dot={<CheckCircleOutlined style={{ fontSize: '16px' }} />}
              >
                <Text strong>CAD Model Updated</Text>
                <Paragraph>Minor dimension update to component "C-234" within acceptable tolerances, no downstream impact.</Paragraph>
              </Timeline.Item>
              <Timeline.Item 
                color="orange" 
                label="7 days ago"
                dot={<InfoCircleOutlined style={{ fontSize: '16px' }} />}
              >
                <Text strong>BOM Entry Modified</Text>
                <Paragraph>Supplier changed for part "P-567", requires verification of compatibility with existing components.</Paragraph>
              </Timeline.Item>
            </Timeline>
          </Card>
        </TabPane>
        
        <TabPane 
          tab={<span><RocketOutlined /> Mission</span>} 
          key="mission"
        >
          <MissionChanges />
        </TabPane>
        
        <TabPane 
          tab={<span><ClockCircleOutlined /> Operational Scenarios</span>} 
          key="operational"
        >
          <OperationalScenarios />
        </TabPane>
        
        <TabPane 
          tab={<span><FileTextOutlined /> Requirements</span>} 
          key="requirements"
        >
          <RequirementsChanges />
        </TabPane>
        
        <TabPane 
          tab={<span><FunctionOutlined /> Functions</span>} 
          key="functions"
        >
          <FunctionsChanges />
        </TabPane>
        
        <TabPane 
          tab={<span><ApartmentOutlined /> CAD Design</span>} 
          key="cad"
        >
          <CADDesignChanges />
        </TabPane>
        
        <TabPane 
          tab={<span><ToolOutlined /> Engineering BOM</span>} 
          key="bom"
        >
          <EngineeringBOMChanges />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ChangeAwareness; 