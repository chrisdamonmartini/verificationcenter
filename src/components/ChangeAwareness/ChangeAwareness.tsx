import React, { useState, useEffect } from 'react';
import { Tabs, Card, Typography, Badge, Space, Alert, Timeline, Row, Col, Select, DatePicker, Button, Statistic, InputNumber, Slider, Tooltip } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
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
  CheckCircleOutlined,
  EditOutlined,
  PlusOutlined,
  MinusOutlined,
  CalendarOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  ControlOutlined,
  ClusterOutlined
} from '@ant-design/icons';
// Import the components
import MissionChanges from './MissionChanges';
import ImprovedMissionChanges from './ImprovedMissionChanges';
import OperationalScenarios from './OperationalScenarios';
import ImprovedOperationalScenarios from './ImprovedOperationalScenarios';
import RequirementsChanges from './RequirementsChanges';
import ImprovedRequirementsChanges from './ImprovedRequirementsChanges';
import FunctionsChanges from './FunctionsChanges';
import ImprovedFunctionsChanges from './ImprovedFunctionsChanges';
import CADDesignChanges from './CADDesignChanges';
import ImprovedCADDesignChanges from './ImprovedCADDesignChanges';
import EngineeringBOMChanges from './EngineeringBOMChanges';
import ImprovedEngineeringBOMChanges from './ImprovedEngineeringBOMChanges';
import ImprovedParametersChanges from './ImprovedParametersChanges';
import ImprovedLogicalChanges from './ImprovedLogicalChanges';
// Import ContentPanel component
import ContentPanel from '../common/ContentPanel';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker;

// Sample mock data for the dashboard
const generateMockData = (weeksBack: number) => {
  const today = dayjs();
  const startDate = today.subtract(weeksBack, 'week');
  
  // Generate random data with some patterns
  const totalChanges = Math.floor(Math.random() * 30) + 50;
  const criticalChanges = Math.floor(totalChanges * (Math.random() * 0.15 + 0.05)); 
  const majorChanges = Math.floor(totalChanges * (Math.random() * 0.25 + 0.15)); 
  const minorChanges = totalChanges - criticalChanges - majorChanges;
  
  // Changes by domain
  const domains = {
    mission: Math.floor(Math.random() * 15) + 5,
    operational: Math.floor(Math.random() * 12) + 8,
    requirements: Math.floor(Math.random() * 20) + 10,
    functions: Math.floor(Math.random() * 10) + 5,
    cad: Math.floor(Math.random() * 8) + 3,
    bom: Math.floor(Math.random() * 6) + 2
  };
  
  // Previous period for trends (make it somewhat realistic with some changes)
  const prevPeriodTrend = Math.random() > 0.5 ? 1.15 : 0.85;
  const prevTotalChanges = Math.floor(totalChanges * prevPeriodTrend);
  
  // Calculate trend percentages
  const totalChangesTrend = Math.round((totalChanges - prevTotalChanges) / prevTotalChanges * 100);
  
  return {
    totalChanges,
    criticalChanges,
    majorChanges,
    minorChanges,
    domains,
    trends: {
      total: totalChangesTrend,
      critical: Math.round(Math.random() * 40 - 20), // Random -20% to +20%
      major: Math.round(Math.random() * 30 - 15),    // Random -15% to +15%
      minor: Math.round(Math.random() * 25 - 10)     // Random -10% to +15%
    },
    startDate,
    endDate: today
  };
};

// Custom tab styles to match the header/sidebar color
const tabStyles = {
  '.ant-tabs-tab': {
    color: 'rgba(255, 255, 255, 0.85) !important',
  },
  '.ant-tabs-tab-active': {
    color: '#00688C !important',
  },
  '.ant-tabs-ink-bar': {
    backgroundColor: '#00688C !important',
  }
};

// Custom slider styles to match the header/sidebar color
const sliderStyles = {
  '.ant-slider-track': {
    backgroundColor: '#00688C !important',
  },
  '.ant-slider-handle': {
    borderColor: '#00688C !important',
  },
  '.ant-slider-handle:focus': {
    boxShadow: '0 0 0 5px rgba(0, 104, 140, 0.2) !important',
  }
};

const ChangeAwareness: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [weeksFilter, setWeeksFilter] = useState<number>(8);
  const [dashboardData, setDashboardData] = useState(generateMockData(8));

  // Extract the current tab from the URL if it exists
  React.useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('/change-awareness/')) {
      const tab = path.split('/').pop() || 'overview';
      setActiveTab(tab);
    }
  }, []);

  // Add custom styles to the component
  React.useEffect(() => {
    // Add styles for tabs and slider
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
        color: #00688C !important;
      }
      .ant-tabs-ink-bar {
        background-color: #00688C !important;
      }
      .ant-slider-track {
        background-color: #00688C !important;
      }
      .ant-slider-handle {
        border-color: #00688C !important;
      }
      .ant-slider-handle:focus {
        box-shadow: 0 0 0 5px rgba(0, 104, 140, 0.2) !important;
      }
      /* Table header styles */
      .ant-table-thead > tr > th {
        background-color: #E6E6E6 !important;
        color: rgba(0, 0, 0, 0.85) !important;
        border: 0.5px solid #BFBFBF !important; /* Thinner border */
        padding: 8px 12px !important; /* Reduced vertical padding for headers */
      }
      /* Table cell styles */
      .ant-table-tbody > tr > td {
        border: 0.5px solid #BFBFBF !important; /* Thinner border */
        padding: 4px 12px !important; /* Reduced vertical padding */
      }
      /* Table row hover styles */
      .ant-table-tbody > tr:hover > td {
        background-color: #CDE6EB !important;
      }
      /* Make sure hover state is consistent */
      .ant-table-tbody > tr.ant-table-row:hover > td {
        background-color: #CDE6EB !important;
      }
      /* Make table header resize handles visible and functional */
      .react-resizable {
        position: relative;
        background-clip: padding-box;
      }
      .react-resizable-handle {
        position: absolute;
        right: -5px;
        bottom: 0;
        z-index: 1;
        width: 10px;
        height: 100%;
        cursor: col-resize;
      }
    `;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  
  // Update dashboard data when weeks filter changes
  useEffect(() => {
    setDashboardData(generateMockData(weeksFilter));
  }, [weeksFilter]);

  // Function to render trend indicator
  const renderTrend = (value: number) => {
    if (value > 0) {
      return (
        <span style={{ color: value > 10 ? '#f5222d' : '#fa8c16', marginLeft: 8 }}>
          <ArrowUpOutlined /> {value}%
        </span>
      );
    } else if (value < 0) {
      return (
        <span style={{ color: '#52c41a', marginLeft: 8 }}>
          <ArrowDownOutlined /> {Math.abs(value)}%
        </span>
      );
    }
    return <span style={{ color: '#8c8c8c', marginLeft: 8 }}>0%</span>;
  };

  return (
    <div className="change-awareness-container">
      <Tabs
        defaultActiveKey="overview"
        className="changes-tabs"
        activeKey={activeTab}
        onChange={(key) => {
          // Stop event propagation to prevent affecting sidebar
          setActiveTab(key);
        }}
      >
        <TabPane
          tab={<span><BranchesOutlined /> Overview</span>}
          key="overview"
        >
          {/* Weeks filter control */}
          <ContentPanel style={{ marginBottom: 16 }}>
            <Row gutter={16} align="middle">
              <Col xs={24} md={4}>
                <Text strong>Time Period:</Text>
              </Col>
              <Col xs={24} md={12}>
                <Slider
                  min={1}
                  max={52}
                  value={weeksFilter}
                  onChange={value => setWeeksFilter(value)}
                  tooltip={{ formatter: (value) => `${value} weeks` }}
                />
              </Col>
              <Col xs={24} md={8}>
                <InputNumber
                  min={1}
                  max={52}
                  value={weeksFilter}
                  onChange={value => setWeeksFilter(value as number)}
                  addonBefore="Last"
                  addonAfter="Weeks"
                  style={{ width: '100%' }}
                />
              </Col>
            </Row>
            <Row style={{ marginTop: 8 }}>
              <Col span={24}>
                <Text type="secondary">
                  Showing changes from {dashboardData.startDate.format('MMM D, YYYY')} to {dashboardData.endDate.format('MMM D, YYYY')}
                </Text>
              </Col>
            </Row>
          </ContentPanel>

          {/* Main statistics cards */}
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={12} md={6}>
              <Card bordered={false} style={{ background: 'linear-gradient(135deg, #1890ff, #096dd9)', borderRadius: '8px', boxShadow: '0 2px 12px rgba(24, 144, 255, 0.3)' }}>
                <Statistic
                  title={<Text style={{ color: 'white', fontSize: '16px' }}>Total Changes</Text>}
                  value={dashboardData.totalChanges}
                  valueStyle={{ color: 'white', fontSize: '28px' }}
                  prefix={<BellOutlined />}
                  suffix={renderTrend(dashboardData.trends.total)}
                />
                <div style={{ marginTop: 8, color: 'rgba(255, 255, 255, 0.8)' }}>
                  <CalendarOutlined /> Last {weeksFilter} weeks
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card bordered={false} style={{ background: 'linear-gradient(135deg, #ff4d4f, #cf1322)', borderRadius: '8px', boxShadow: '0 2px 12px rgba(255, 77, 79, 0.3)' }}>
                <Statistic
                  title={<Text style={{ color: 'white', fontSize: '16px' }}>Critical Changes</Text>}
                  value={dashboardData.criticalChanges}
                  valueStyle={{ color: 'white', fontSize: '28px' }}
                  prefix={<WarningOutlined />}
                  suffix={renderTrend(dashboardData.trends.critical)}
                />
                <div style={{ marginTop: 8, color: 'rgba(255, 255, 255, 0.8)' }}>
                  <WarningOutlined /> {Math.round(dashboardData.criticalChanges / dashboardData.totalChanges * 100)}% of total
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card bordered={false} style={{ background: 'linear-gradient(135deg, #faad14, #d48806)', borderRadius: '8px', boxShadow: '0 2px 12px rgba(250, 173, 20, 0.3)' }}>
                <Statistic
                  title={<Text style={{ color: 'white', fontSize: '16px' }}>Major Changes</Text>}
                  value={dashboardData.majorChanges}
                  valueStyle={{ color: 'white', fontSize: '28px' }}
                  prefix={<InfoCircleOutlined />}
                  suffix={renderTrend(dashboardData.trends.major)}
                />
                <div style={{ marginTop: 8, color: 'rgba(255, 255, 255, 0.8)' }}>
                  <InfoCircleOutlined /> {Math.round(dashboardData.majorChanges / dashboardData.totalChanges * 100)}% of total
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card bordered={false} style={{ background: 'linear-gradient(135deg, #52c41a, #389e0d)', borderRadius: '8px', boxShadow: '0 2px 12px rgba(82, 196, 26, 0.3)' }}>
                <Statistic
                  title={<Text style={{ color: 'white', fontSize: '16px' }}>Minor Changes</Text>}
                  value={dashboardData.minorChanges}
                  valueStyle={{ color: 'white', fontSize: '28px' }}
                  prefix={<InfoCircleOutlined />}
                  suffix={renderTrend(dashboardData.trends.minor)}
                />
                <div style={{ marginTop: 8, color: 'rgba(255, 255, 255, 0.8)' }}>
                  <InfoCircleOutlined /> {Math.round(dashboardData.minorChanges / dashboardData.totalChanges * 100)}% of total
                </div>
              </Card>
            </Col>
          </Row>

          {/* Changes by domain */}
          <ContentPanel title="Changes by Domain" style={{ marginBottom: 16 }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={8} lg={4}>
                <Card bordered={false} style={{ background: '#f0f5ff', borderRadius: '6px' }}>
                  <Statistic
                    title={<Text strong>Mission</Text>}
                    value={dashboardData.domains.mission}
                    valueStyle={{ color: '#1890ff' }}
                    prefix={<RocketOutlined />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8} lg={4}>
                <Card bordered={false} style={{ background: '#f6ffed', borderRadius: '6px' }}>
                  <Statistic
                    title={<Text strong>Op. Scenarios</Text>}
                    value={dashboardData.domains.operational}
                    valueStyle={{ color: '#52c41a' }}
                    prefix={<ClockCircleOutlined />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8} lg={4}>
                <Card bordered={false} style={{ background: '#fffbe6', borderRadius: '6px' }}>
                  <Statistic
                    title={<Text strong>Requirements</Text>}
                    value={dashboardData.domains.requirements}
                    valueStyle={{ color: '#faad14' }}
                    prefix={<FileTextOutlined />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8} lg={4}>
                <Card bordered={false} style={{ background: '#f9f0ff', borderRadius: '6px' }}>
                  <Statistic
                    title={<Text strong>Functions</Text>}
                    value={dashboardData.domains.functions}
                    valueStyle={{ color: '#722ed1' }}
                    prefix={<FunctionOutlined />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8} lg={4}>
                <Card bordered={false} style={{ background: '#e6f7ff', borderRadius: '6px' }}>
                  <Statistic
                    title={<Text strong>CAD Design</Text>}
                    value={dashboardData.domains.cad}
                    valueStyle={{ color: '#1890ff' }}
                    prefix={<ApartmentOutlined />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8} lg={4}>
                <Card bordered={false} style={{ background: '#fff2e8', borderRadius: '6px' }}>
                  <Statistic
                    title={<Text strong>Eng. BOM</Text>}
                    value={dashboardData.domains.bom}
                    valueStyle={{ color: '#fa541c' }}
                    prefix={<ToolOutlined />}
                  />
                </Card>
              </Col>
            </Row>
          </ContentPanel>

          <Alert
            message="Recent Critical Changes"
            description="There are 5 critical changes in the last 7 days that require your attention."
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
          />

          <ContentPanel title="Change Impact Summary">
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
          </ContentPanel>
        </TabPane>

        <TabPane
          tab={<span><RocketOutlined /> Mission</span>}
          key="mission"
        >
          <ImprovedMissionChanges />
        </TabPane>

        <TabPane
          tab={<span><ClockCircleOutlined /> Operational Scenarios</span>}
          key="operational"
        >
          <ImprovedOperationalScenarios />
        </TabPane>

        <TabPane
          tab={<span><FileTextOutlined /> Requirements</span>}
          key="requirements"
        >
          <ImprovedRequirementsChanges />
        </TabPane>

        <TabPane
          tab={<span><ControlOutlined /> Parameters</span>}
          key="parameters"
        >
          <ImprovedParametersChanges />
        </TabPane>

        <TabPane
          tab={<span><FunctionOutlined /> Functions</span>}
          key="functions"
        >
          <ImprovedFunctionsChanges />
        </TabPane>

        <TabPane
          tab={<span><ClusterOutlined /> Logical</span>}
          key="logical"
        >
          <ImprovedLogicalChanges />
        </TabPane>

        <TabPane
          tab={<span><ApartmentOutlined /> CAD Design</span>}
          key="cad"
        >
          <ImprovedCADDesignChanges />
        </TabPane>

        <TabPane
          tab={<span><ToolOutlined /> Engineering BOM</span>}
          key="bom"
        >
          <ImprovedEngineeringBOMChanges />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ChangeAwareness; 