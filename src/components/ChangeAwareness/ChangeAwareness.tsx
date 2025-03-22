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
  ClusterOutlined,
  PieChartOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons';
// Import recharts components
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip as RechartsTooltip,
  Legend 
} from 'recharts';
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
import { useChangesData } from './shared/hooks';

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
  const [productType, setProductType] = useState<'missile' | 'fighter'>('missile');
  const [chartCollapsed, setChartCollapsed] = useState<boolean>(false);
  const colors = useColors();

  // Custom colors for the pie chart segments
  const DOMAIN_COLORS = {
    mission: colors.category.mission,
    operationalScenario: colors.chart.series3,
    requirement: colors.category.requirements,
    function: colors.category.functions,
    logical: colors.chart.series2,
    parameter: colors.chart.series5,
    cad: colors.category.cad,
    bom: colors.category.bom
  };

  // Fetch data using the useChangesData hook
  const { 
    data,
    loading 
  } = useChangesData<AnyChange>('all', weeks, productType);

  // Prepare data for the pie chart
  const preparePieChartData = () => {
    if (!data || data.length === 0) return [];
    
    // Count the number of changes by domain
    const domainCounts: Record<string, number> = {};
    
    data.forEach((change: AnyChange) => {
      const domain = change.domain;
      domainCounts[domain] = (domainCounts[domain] || 0) + 1;
    });
    
    // Convert to format needed for pie chart
    return Object.entries(domainCounts).map(([domain, value]) => ({
      name: getDomainDisplayName(domain),
      value,
      domain
    }));
  };
  
  // Get a human-readable display name for each domain
  const getDomainDisplayName = (domain: string): string => {
    switch (domain) {
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
        return domain || 'Unknown';
    }
  };

  // Get color for a specific domain
  const getDomainColor = (domain: string): string => {
    return DOMAIN_COLORS[domain as keyof typeof DOMAIN_COLORS] || colors.chart.textSecondary;
  };

  // Get appropriate color for impact based on count
  const getImpactColor = (count: number): string => {
    if (count > 6) return colors.brand.primary; // High impact - use sidebar color
    if (count > 3) return colors.brand.primary; // Medium impact - use sidebar color 
    return colors.brand.primary; // Low impact - use sidebar color
  };

  // Prepare pie chart data
  const pieChartData = preparePieChartData();

  // Add animation styles when component mounts
  React.useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .chart-container-animate {
        transition: all 0.5s ease;
      }
      .chart-toggle-button:hover {
        transform: scale(1.05);
      }
      .recharts-pie {
        position: relative;
        z-index: 2;
      }
      .recharts-sector {
        transform-origin: center 125%;  /* Origin at bottom center of chart */
        transition: transform 0.6s ease;
      }
      /* Fan unfold on entry */
      .chart-container-animate.open .recharts-sector {
        animation: fanUnfold 0.8s ease forwards;
      }
      /* Fold back on exit */
      .chart-container-animate:not(.open) .recharts-sector {
        animation: fanFold 0.6s ease forwards;
      }
      /* Individual sector delays for sequential animation */
      .recharts-sector:nth-child(1) { animation-delay: 0ms; }
      .recharts-sector:nth-child(2) { animation-delay: 50ms; }
      .recharts-sector:nth-child(3) { animation-delay: 100ms; }
      .recharts-sector:nth-child(4) { animation-delay: 150ms; }
      .recharts-sector:nth-child(5) { animation-delay: 200ms; }
      .recharts-sector:nth-child(6) { animation-delay: 250ms; }
      .recharts-sector:nth-child(7) { animation-delay: 300ms; }
      .recharts-sector:nth-child(8) { animation-delay: 350ms; }
      /* Fan out from bottom animation */
      @keyframes fanUnfold {
        0% { transform: scaleY(0.1) translateY(30px); opacity: 0; }
        100% { transform: scaleY(1) translateY(0); opacity: 1; }
      }
      /* Fan fold to bottom animation */
      @keyframes fanFold {
        0% { transform: scaleY(1) translateY(0); opacity: 1; }
        100% { transform: scaleY(0.1) translateY(30px); opacity: 0; }
      }
      /* Remove any potential ghosting effects */
      .recharts-wrapper {
        position: relative;
        z-index: 10;
      }
      .recharts-surface {
        overflow: visible;
      }
    `;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Custom label renderer for the pie chart
  const renderCustomizedLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent, value, name } = props;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
    
    if (percent < 0.05) return null; // Don't show labels for small slices
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${value}`}
      </text>
    );
  };

  return (
    <div className="overview-changes" style={{ position: 'relative' }}>
      {/* Table - Full width */}
      <ContentPanel>
        <StandardChangeTable<AnyChange>
          domain="all"
          title="All Changes"
          weeks={weeks}
          setWeeks={setWeeks}
          productType={productType}
          categoryRenderer={renderAutoDetectedCategory}
          expandedRowOptions={{
            showImpact: true,
            showTechnicalDetails: true,
            showDependencies: true,
          }}
          tableOptions={{
            showImpact: true,
            hiddenColumns: ['category', 'changeType', 'status'],
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
      
      {/* Pie Chart - Positioned as overlay from right */}
      <div 
        className={`chart-container-animate ${!chartCollapsed ? 'open' : ''}`}
        style={{ 
          position: 'absolute',
          top: '16px',
          right: chartCollapsed ? '-850px' : '16px',
          width: '650px',
          transition: 'right 0.6s ease, opacity 0.4s ease',
          zIndex: 1000,
          opacity: chartCollapsed ? 0 : 1,
          transform: 'translateX(0)',
          boxShadow: chartCollapsed ? 'none' : '0 4px 20px rgba(0,0,0,0.25)',
          overflow: 'visible',
        }}
      >
        <Card 
          style={{ 
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            borderRadius: '8px',
            transition: 'all 0.5s ease',
            transform: chartCollapsed ? 'scale(0.95)' : 'scale(1)',
          }}
          title={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <PieChartOutlined style={{ marginRight: 8, color: colors.brand.primary }} />
              <span>Changes by Source</span>
              <Button 
                type="text" 
                icon={<LeftOutlined />}
                onClick={() => setChartCollapsed(true)}
                style={{ marginLeft: 'auto', transition: 'transform 0.3s ease' }}
                className="chart-toggle-button"
              />
            </div>
          }
        >
          <div style={{ height: 350 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={600} height={350}>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={140}
                  fill="#8884d8"
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                  animationBegin={0}
                  animationDuration={0}
                  isAnimationActive={false}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={getDomainColor(entry.domain)} 
                    />
                  ))}
                </Pie>
                <RechartsTooltip 
                  formatter={(value, name) => [`${value} Changes`, name]}
                  labelFormatter={() => 'Source Distribution'}
                />
                <Legend 
                  layout="vertical"
                  align="left"
                  verticalAlign="middle"
                  iconSize={12}
                  wrapperStyle={{
                    paddingLeft: 25,
                    paddingRight: 25,
                    left: 20,
                    top: -20,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '4px',
                    padding: '10px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ marginTop: 16, textAlign: 'center' }}>
            <Text type="secondary">
              Total: {data.length} changes in last {weeks} weeks
            </Text>
          </div>
        </Card>
      </div>
      
      {/* Show toggle button when chart is collapsed */}
      <Button 
        type="primary"
        icon={<PieChartOutlined />}
        onClick={() => setChartCollapsed(false)}
        style={{ 
          position: 'absolute',
          top: '16px',
          right: chartCollapsed ? '0' : '-100px',
          transition: 'right 0.5s ease, opacity 0.4s ease',
          zIndex: 1000,
          borderRadius: '4px 0 0 4px',
          opacity: chartCollapsed ? 1 : 0,
          backgroundColor: colors.brand.primary,
          borderColor: colors.brand.primary,
          transform: 'translateX(0)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        }}
      />
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
      /* Style affected items tags to match color scheme */
      .ant-tag {
        border-color: ${colors.brand.primary}40 !important;
      }
      /* Style pagination to match sidebar color */
      .ant-pagination-item-active {
        border-color: ${colors.brand.primary} !important;
      }
      .ant-pagination-item-active a {
        color: ${colors.brand.primary} !important;
      }
      .ant-pagination-item:hover {
        border-color: ${colors.brand.primary} !important;
      }
      .ant-pagination-item:hover a {
        color: ${colors.brand.primary} !important;
      }
      .ant-pagination-prev:hover .ant-pagination-item-link,
      .ant-pagination-next:hover .ant-pagination-item-link {
        color: ${colors.brand.primary} !important;
        border-color: ${colors.brand.primary} !important;
      }
      .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector {
        border-color: ${colors.brand.primary} !important;
        box-shadow: 0 0 0 2px ${colors.brand.primary}33 !important;
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