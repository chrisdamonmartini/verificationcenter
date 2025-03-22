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
// Import our color palette and hook
import colorPalette, { getLinearGradient } from '../../utils/colorPalette';
import useColors from '../../hooks/useColors';
import { AnyChange } from '../../types/changeAwareness';
import { StandardChangeTable } from './shared/StandardChangeTable';
import { renderAutoDetectedCategory } from './shared/TableConfigurations';

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
    color: `${colorPalette.brand.primary} !important`,
  },
  '.ant-tabs-ink-bar': {
    backgroundColor: `${colorPalette.brand.primary} !important`,
  }
};

// Custom slider styles to match the header/sidebar color
const sliderStyles = {
  '.ant-slider-track': {
    backgroundColor: `${colorPalette.brand.primary} !important`,
  },
  '.ant-slider-handle': {
    borderColor: `${colorPalette.brand.primary} !important`,
  },
  '.ant-slider-handle:focus': {
    boxShadow: `0 0 0 5px rgba(0, 104, 140, 0.2) !important`,
  }
};

// New ImprovedOverviewChanges component for consistent UI with other tabs
const ImprovedOverviewChanges: React.FC = () => {
  const [weeks, setWeeks] = useState<number>(8);
  const colors = useColors();

  return (
    <div className="overview-changes">
      <ContentPanel>
        <StandardChangeTable<AnyChange>
          domain="all"
          title="All Changes"
          weeks={weeks}
          setWeeks={setWeeks}
          productType="missile"
          categoryRenderer={renderAutoDetectedCategory}
          expandedRowOptions={{
            showImpact: true,
            showTechnicalDetails: true,
            showDependencies: true,
          }}
          tableOptions={{
            showImpact: true,
            additionalColumns: [{
              title: 'Source',
              dataIndex: 'source',
              key: 'source',
              render: (_, record) => {
                // Use the domain property which exists on all change types
                switch (record.domain) {
                  case 'mission':
                    return 'Mission';
                  case 'operationalScenario':
                    return 'Operational Scenario';
                  case 'requirement':
                    return 'Requirement';
                  case 'parameter':
                    return 'Parameter';
                  case 'function':
                    return 'Function';
                  case 'logical':
                    return 'Logical';
                  case 'cad':
                    return 'CAD Design';
                  case 'bom':
                    return 'Engineering BOM';
                  default:
                    return record.domain || 'Unknown';
                }
              }
            }]
          }}
        />
      </ContentPanel>
    </div>
  );
};

const ChangeAwareness: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [weeksFilter, setWeeksFilter] = useState<number>(8);
  const [dashboardData, setDashboardData] = useState(generateMockData(8));
  const colors = useColors();

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
        color: ${colors.brand.primary} !important;
      }
      /* Add hover state styling for tab buttons */
      .ant-tabs-tab:hover .ant-tabs-tab-btn {
        color: ${colors.brand.primary} !important;
      }
      .ant-tabs-ink-bar {
        background-color: ${colors.brand.primary} !important;
      }
      .ant-slider-track {
        background-color: ${colors.brand.primary} !important;
      }
      .ant-slider-handle {
        border-color: ${colors.brand.primary} !important;
      }
      .ant-slider-handle:focus {
        box-shadow: 0 0 0 5px ${colors.brand.primary}33 !important;
      }
      /* Table header styles */
      .ant-table-thead > tr > th {
        background-color: #E6E6E6 !important;
        color: ${colors.chart.textPrimary} !important;
        border: 0.5px solid #BFBFBF !important; /* Thinner border */
        padding: 8px 12px !important; /* Reduced vertical padding for headers */
      }
      /* Table cell styles */
      .ant-table-tbody > tr > td {
        border: 0.5px solid #BFBFBF !important; /* Thinner border */
        padding: 4px 12px !important; /* Reduced vertical padding */
      }
      /* Table row hover styles - updated to match sidebar color */
      .ant-table-tbody > tr:hover > td,
      .ant-table-tbody > tr.ant-table-row-hover > td,
      .ant-table-tbody > tr.ant-table-row:hover > td,
      .related-items-table .ant-table-row:hover > td {
        background-color: var(--background-color-secondary) !important;
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
  }, [colors]);
  
  // Update dashboard data when weeks filter changes
  useEffect(() => {
    setDashboardData(generateMockData(weeksFilter));
  }, [weeksFilter]);

  // Function to render trend indicator
  const renderTrend = (value: number) => {
    if (value > 0) {
      return (
        <span style={{ color: value > 10 ? colors.status.critical : colors.status.major, marginLeft: 8 }}>
          <ArrowUpOutlined /> {value}%
        </span>
      );
    } else if (value < 0) {
      return (
        <span style={{ color: colors.status.minor, marginLeft: 8 }}>
          <ArrowDownOutlined /> {Math.abs(value)}%
        </span>
      );
    }
    return <span style={{ color: colors.chart.textSecondary, marginLeft: 8 }}>0%</span>;
  };

  return (
    <div className="change-awareness-container">
      <ContentPanel>
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
            <ImprovedOverviewChanges />
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
      </ContentPanel>
    </div>
  );
};

export default ChangeAwareness; 