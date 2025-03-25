import React, { useState, useEffect } from 'react';
import { Tag, Space, Button, Tooltip, Progress, Row, Col, Card, Slider, Switch, Input, Table } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined, ClockCircleOutlined, CheckCircleOutlined, CloseCircleOutlined, InfoCircleOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import AutomationIcon from '../../../icons/typeAppDeploymentCenterStart48.svg';
import moment from 'moment';

// Interface for automation workflows
interface AutomationWorkflow {
  id: string;
  name: string;
  description: string;
  status: 'Running' | 'Scheduled' | 'Completed' | 'Failed' | 'Paused';
  progress: number;
  schedule: string;
  nextRun: string;
  lastRun: string;
  owner: string;
  environmentId: string;
  environmentName: string;
  modelIds: string[];
  duration: string;
  cpuUsage: number;
  memoryUsage: number;
  results?: string;
  type: string;
}

// Function to get relative date from March 24, 2025
const getRelativeDate = (daysAgo: number): string => {
  return moment('2025-03-24').subtract(daysAgo, 'days').format('YYYY-MM-DD');
};

// Sample automation data
const sampleAutomation: AutomationWorkflow[] = [
  {
    id: 'AUTO-801',
    name: 'Hypersonic Free Flight Simulation',
    description: 'Operating scenario from MBSE (Cameo, ARISE, and/or Simulink), provides input to both CFD, thermal, and structural models for assessment. Results from combined thermal and pressure state in FE model determine system margin.',
    status: 'Completed',
    progress: 100,
    schedule: 'Weekly',
    nextRun: '2025-01-16',
    lastRun: getRelativeDate(3),
    owner: 'Hypersonics Team',
    environmentId: 'ENV-101',
    environmentName: 'High Performance Cluster',
    modelIds: ['MDL-701', 'MDL-705'],
    duration: '14h 20m',
    cpuUsage: 85,
    memoryUsage: 72,
    results: 'https://results.example.com/AUTO-801',
    type: 'CFD Simulation'
  },
  {
    id: 'AUTO-802',
    name: 'Standard Integrated LOS Jitter',
    description: 'Integration of Simulink servo simulation, FE flex-body simulation, thermal disturbances, flow disturbances, and optical prescription. Tools work together in tightly integrated physical modeling simulation.',
    status: 'Running',
    progress: 65,
    schedule: 'Weekly',
    nextRun: '2025-01-22',
    lastRun: getRelativeDate(7),
    owner: 'Optical Systems',
    environmentId: 'ENV-102',
    environmentName: 'Cloud Compute Environment',
    modelIds: ['MDL-702'],
    duration: '8h 10m (estimated)',
    cpuUsage: 92,
    memoryUsage: 86,
    results: undefined,
    type: 'Integrated Simulation'
  },
  {
    id: 'AUTO-803',
    name: 'Wavefront Error Assessment',
    description: 'Integration of Simulink servo simulation, FE flex-body simulation, thermal disturbances, flow disturbances, and optical prescription. Assesses wavefront error in SigFit for integrated assessment.',
    status: 'Scheduled',
    progress: 0,
    schedule: 'On Demand',
    nextRun: '2025-01-17',
    lastRun: getRelativeDate(14),
    owner: 'Optical Systems',
    environmentId: 'ENV-101',
    environmentName: 'High Performance Cluster',
    modelIds: ['MDL-703'],
    duration: '5h 45m (estimated)',
    cpuUsage: 0,
    memoryUsage: 0,
    results: undefined,
    type: 'Optical Analysis'
  },
  {
    id: 'AUTO-804',
    name: 'CCA Analysis',
    description: 'Convergence of ECAD and CAD information, thermal assessment, and structural assessment. Integrated process to ensure electronic and mechanical design compatibility.',
    status: 'Failed',
    progress: 38,
    schedule: 'Weekly',
    nextRun: '2025-01-20',
    lastRun: getRelativeDate(10),
    owner: 'Systems Integration',
    environmentId: 'ENV-103',
    environmentName: 'Local Compute Environment',
    modelIds: ['MDL-704'],
    duration: '3h 40m (terminated)',
    cpuUsage: 0,
    memoryUsage: 0,
    results: 'https://results.example.com/AUTO-804-error',
    type: 'Integration Analysis'
  },
  {
    id: 'AUTO-805',
    name: 'Body-Integrated Antenna Performance',
    description: 'Simulation of EM/RF performance as a function of thermal state, body deflection state, and RF/EM elements. Integrates RF tool such as ANSYS HFSS with thermal and structural tools.',
    status: 'Paused',
    progress: 45,
    schedule: 'Daily',
    nextRun: 'Paused',
    lastRun: getRelativeDate(9),
    owner: 'RF Systems',
    environmentId: 'ENV-102',
    environmentName: 'Cloud Compute Environment',
    modelIds: ['MDL-705'],
    duration: '6h 15m (paused)',
    cpuUsage: 0,
    memoryUsage: 0,
    results: undefined,
    type: 'RF Simulation'
  },
  {
    id: 'AUTO-806',
    name: 'Store Separation Event',
    description: 'Whether canister launch, bomb-rack, eject launch, or rail launch - simulation is comprised of force/pressure time histories from physical modeling or MBSE domain. Results provide derived requirements for verification.',
    status: 'Completed',
    progress: 100,
    schedule: 'Weekly',
    nextRun: '2025-01-21',
    lastRun: getRelativeDate(5),
    owner: 'Structures Team',
    environmentId: 'ENV-101',
    environmentName: 'High Performance Cluster',
    modelIds: ['MDL-702', 'MDL-704'],
    duration: '10h 30m',
    cpuUsage: 78,
    memoryUsage: 65,
    results: 'https://results.example.com/AUTO-806',
    type: 'Dynamic Simulation'
  },
  {
    id: 'AUTO-807',
    name: 'Fire Control Optical Bed Isolation',
    description: 'Combined Physical Modeling (systems servo simulation) and structural modeling, influenced by Cameo, ARISE, or vibroacoustic environments to establish proper isolation selection/placement.',
    status: 'Running',
    progress: 52,
    schedule: 'On Demand',
    nextRun: '2025-01-25',
    lastRun: getRelativeDate(2),
    owner: 'Optical Systems',
    environmentId: 'ENV-102',
    environmentName: 'Cloud Compute Environment',
    modelIds: ['MDL-701', 'MDL-703'],
    duration: '7h 45m (estimated)',
    cpuUsage: 88,
    memoryUsage: 74,
    results: undefined,
    type: 'Optical Analysis'
  },
  {
    id: 'AUTO-808',
    name: 'Container Analysis',
    description: 'Receives CAD geometry restrictions, functional requirements from CAMED, and derives store mitigations through structural simulations.',
    status: 'Scheduled',
    progress: 0,
    schedule: 'Weekly',
    nextRun: '2025-01-18',
    lastRun: getRelativeDate(21),
    owner: 'Mechanical Design',
    environmentId: 'ENV-103',
    environmentName: 'Local Compute Environment',
    modelIds: ['MDL-704'],
    duration: '4h 20m (estimated)',
    cpuUsage: 0,
    memoryUsage: 0,
    results: undefined,
    type: 'Structural Analysis'
  },
  {
    id: 'AUTO-809',
    name: 'CAS/CCU Simulation',
    description: 'Integrated system simulation of servo behavior of mechanisms. Thermal and structural simulation of influences on bearings and links from thermal and load inputs.',
    status: 'Completed',
    progress: 100,
    schedule: 'Daily',
    nextRun: '2025-01-17',
    lastRun: getRelativeDate(1),
    owner: 'Mechanisms Team',
    environmentId: 'ENV-101',
    environmentName: 'High Performance Cluster',
    modelIds: ['MDL-702', 'MDL-705'],
    duration: '9h 10m',
    cpuUsage: 82,
    memoryUsage: 70,
    results: 'https://results.example.com/AUTO-809',
    type: 'Integrated Simulation'
  },
  {
    id: 'AUTO-810',
    name: 'Missile Free Flight Loads',
    description: 'Receive operational points for store from CAMEO. Derive aero loads for static loads and dynamic loads and pass these results to CAMEO as specification for structural tools.',
    status: 'Running',
    progress: 35,
    schedule: 'Weekly',
    nextRun: '2025-01-23',
    lastRun: getRelativeDate(4),
    owner: 'Structures Team',
    environmentId: 'ENV-102',
    environmentName: 'Cloud Compute Environment',
    modelIds: ['MDL-701', 'MDL-704'],
    duration: '12h 15m (estimated)',
    cpuUsage: 94,
    memoryUsage: 82,
    results: undefined,
    type: 'Aero-Structural Simulation'
  }
];

// Add the CSS styles for table and dashboard cards
const tableStyles = `
.automation-table-with-borders {
  border-top: 1px solid #f0f0f0;
}

.automation-table-with-borders .ant-table-pagination {
  border-left: none;
  border-right: none;
  margin: 16px 0;
}

/* Remove hover effects from dashboard cards */
.dashboard-card:hover {
  transform: none !important;
  box-shadow: none !important;
  cursor: default !important;
}
`;

const AutomationTab: React.FC = () => {
  // State management
  const [timeFrame, setTimeFrame] = useState<number>(8);
  const [dateFilterEnabled, setDateFilterEnabled] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>('');
  const [filteredWorkflows, setFilteredWorkflows] = useState<AutomationWorkflow[]>(sampleAutomation);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  // Filter workflows based on time frame, search text, and type
  const filterWorkflows = (weeks: number, text: string, type: string | null = null) => {
    console.log('Filtering workflows with timeframe:', weeks, 'weeks, search:', text, 'type:', type);
    let filtered = [...sampleAutomation];
    
    // Apply date filter if weeks > 0 (date filtering enabled)
    if (weeks > 0) {
      const cutoffDate = moment().subtract(weeks, 'weeks');
      filtered = filtered.filter(workflow => {
        const workflowDate = moment(workflow.lastRun);
        return workflowDate.isAfter(cutoffDate);
      });
      console.log('After date filtering:', filtered.length, 'workflows remain');
    }
    
    // Apply text search if there is search text
    if (text && text.trim() !== '') {
      const searchLower = text.toLowerCase();
      filtered = filtered.filter(workflow => 
        workflow.id.toLowerCase().includes(searchLower) ||
        workflow.name.toLowerCase().includes(searchLower) ||
        workflow.description.toLowerCase().includes(searchLower) ||
        workflow.owner.toLowerCase().includes(searchLower) ||
        workflow.environmentName.toLowerCase().includes(searchLower) ||
        workflow.type.toLowerCase().includes(searchLower)
      );
      console.log('After text filtering:', filtered.length, 'workflows remain');
    }
    
    // Apply type filter if type is provided
    if (type) {
      filtered = filtered.filter(workflow => workflow.type === type);
      console.log('After type filtering:', filtered.length, 'workflows remain');
    }
    
    setFilteredWorkflows(filtered);
  };

  // Update filtered data when dependencies change
  useEffect(() => {
    filterWorkflows(timeFrame, searchText, selectedType);
  }, [timeFrame, dateFilterEnabled, searchText, selectedType]);

  // Handle type filter click
  const handleTypeFilterClick = (type: string) => {
    if (selectedType === type) {
      // If clicking the already selected type, clear the filter
      setSelectedType(null);
    } else {
      setSelectedType(type);
    }
  };

  // Status tag renderer - simplified to just text without tags
  const getStatusTag = (status: string) => {
    return <span style={{ fontSize: '14px' }}>{status}</span>;
  };
  
  // Progress renderer
  const getProgressBar = (progress: number, status: string) => {
    let strokeColor;
    const progressStatus = 
      status === 'Completed' ? 'success' : 
      status === 'Running' ? 'active' : 
      status === 'Failed' ? 'exception' : 'normal';
    
    // Match colors with dashboard cards
    switch (status) {
      case 'Completed':
        strokeColor = '#52c41a'; // Green for completed
        break;
      case 'Running':
        strokeColor = '#1890ff'; // Blue for running
        break;
      case 'Failed':
        strokeColor = '#f5222d'; // Red for failed
        break;
      case 'Paused':
        strokeColor = '#faad14'; // Orange/amber for paused
        break;
      case 'Scheduled':
        strokeColor = '#8c8c8c'; // Grey for scheduled
        break;
      default:
        strokeColor = undefined;
    }
    
    return <Progress 
      percent={progress} 
      status={progressStatus} 
      size="small" 
      style={{ margin: 0 }} 
      strokeColor={strokeColor}
    />;
  };

  // Time period slider marks
  const sliderMarks = {
    1: '1w',
    12: '12w',
    26: '26w',
    52: '52w'
  };

  // Handle time frame change
  const handleTimeFrameChange = (value: number) => {
    setTimeFrame(value);
    // Only update filtered data if date filtering is enabled
    if (dateFilterEnabled) {
      filterWorkflows(value, searchText, selectedType);
    }
  };

  // Toggle date filtering
  const handleToggleDateFilter = (checked: boolean) => {
    setDateFilterEnabled(checked);
    if (checked) {
      filterWorkflows(timeFrame, searchText, selectedType);
    } else {
      // When disabling date filter, show all workflows with text filter only
      filterWorkflows(0, searchText, selectedType); // Pass 0 to indicate no date filtering
    }
  };
  
  // Table columns definition
  const columns: ColumnsType<AutomationWorkflow> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 250,
      render: (text, record) => (
        <Space>
          <img src={AutomationIcon} alt="Automation" style={{ width: '24px', height: '24px' }} />
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 150,
      filters: Array.from(new Set(sampleAutomation.map(workflow => workflow.type))).map(type => ({
        text: type,
        value: type,
      })),
      onFilter: (value, record) => record.type === value,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => getStatusTag(status),
      filters: [
        { text: 'Running', value: 'Running' },
        { text: 'Scheduled', value: 'Scheduled' },
        { text: 'Completed', value: 'Completed' },
        { text: 'Failed', value: 'Failed' },
        { text: 'Paused', value: 'Paused' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      width: 130,
      render: (progress, record) => getProgressBar(progress, record.status),
    },
    {
      title: 'Schedule',
      dataIndex: 'schedule',
      key: 'schedule',
      width: 100,
    },
    {
      title: 'Next Run',
      dataIndex: 'nextRun',
      key: 'nextRun',
      width: 100,
    },
    {
      title: 'Environment',
      dataIndex: 'environmentName',
      key: 'environmentName',
      width: 180,
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      width: 120,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space size="small">
          {record.status === 'Running' && (
            <Button size="small" icon={<PauseCircleOutlined />}>
              Pause
            </Button>
          )}
          {(record.status === 'Scheduled' || record.status === 'Paused') && (
            <Button size="small" icon={<PlayCircleOutlined />}>
              Start
            </Button>
          )}
          {record.results && (
            <Tooltip title="View Results">
              <Button size="small" icon={<InfoCircleOutlined />}>
                Results
              </Button>
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];
  
  // Expandable row render function with enhanced workflow details
  const expandedRowRender = (record: AutomationWorkflow) => (
    <div style={{ padding: '0 48px' }}>
      <h4 style={{ marginBottom: '12px', fontSize: '15px' }}>Workflow Details</h4>
      
      <div style={{ marginBottom: '16px' }}>
        <strong>Description:</strong> 
        <p style={{ margin: '8px 0' }}>{record.description}</p>
      </div>
      
      <div style={{ display: 'flex', gap: '24px', marginBottom: '16px' }}>
        <div style={{ flex: 2 }}>
          <h5 style={{ fontSize: '14px', marginBottom: '8px' }}>Workflow Components</h5>
          <div style={{ 
            padding: '12px',
            background: '#f5f5f5',
            borderRadius: '4px',
            border: '1px solid #e8e8e8'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ 
                padding: '8px 12px', 
                background: '#fff', 
                border: '1px solid #d9d9d9', 
                borderRadius: '4px',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <strong>Input Processing</strong>
                  <Tag color="blue">MBSE/Cameo</Tag>
                </div>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px' }}>Requirements and parameters from system model</p>
                <div style={{ position: 'absolute', bottom: '-12px', left: '50%', transform: 'translateX(-50%)' }}>↓</div>
              </div>
              
              <div style={{ 
                padding: '8px 12px', 
                background: '#fff', 
                border: '1px solid #d9d9d9', 
                borderRadius: '4px',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <strong>Simulation Execution</strong>
                  <Tag color="green">{record.type}</Tag>
                </div>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px' }}>Primary analysis using specialized tools</p>
                <div style={{ position: 'absolute', bottom: '-12px', left: '50%', transform: 'translateX(-50%)' }}>↓</div>
              </div>
              
              <div style={{ 
                padding: '8px 12px', 
                background: '#fff', 
                border: '1px solid #d9d9d9', 
                borderRadius: '4px',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <strong>Results Processing</strong>
                  <Tag color="orange">Post-Processing</Tag>
                </div>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px' }}>Data analysis and derived requirements generation</p>
                <div style={{ position: 'absolute', bottom: '-12px', left: '50%', transform: 'translateX(-50%)' }}>↓</div>
              </div>
              
              <div style={{ 
                padding: '8px 12px', 
                background: '#fff', 
                border: '1px solid #d9d9d9', 
                borderRadius: '4px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <strong>Output Integration</strong>
                  <Tag color="purple">System Integration</Tag>
                </div>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px' }}>Return results to system model and verification database</p>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{ flex: 1 }}>
          <h5 style={{ fontSize: '14px', marginBottom: '8px' }}>Execution Details</h5>
          <div>
            <p><strong>Owner:</strong> {record.owner}</p>
            <p><strong>Last Run:</strong> {record.lastRun}</p>
            <p><strong>Environment ID:</strong> {record.environmentId}</p>
            <p><strong>Models:</strong> {record.modelIds.join(', ')}</p>
            {record.status === 'Running' && (
              <>
                <p><strong>CPU Usage:</strong> {record.cpuUsage}%</p>
                <p><strong>Memory Usage:</strong> {record.memoryUsage}%</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
  // Calculate stats for dashboard cards
  const totalWorkflows = filteredWorkflows.length;
  const completedWorkflows = filteredWorkflows.filter(workflow => workflow.status === 'Completed').length;
  const runningWorkflows = filteredWorkflows.filter(workflow => workflow.status === 'Running').length;
  const scheduledWorkflows = filteredWorkflows.filter(workflow => workflow.status === 'Scheduled').length;
  const failedWorkflows = filteredWorkflows.filter(workflow => workflow.status === 'Failed').length;
  const pausedWorkflows = filteredWorkflows.filter(workflow => workflow.status === 'Paused').length;
  
  // Get counts by workflow type
  const typeCounts = filteredWorkflows.reduce((acc, workflow) => {
    acc[workflow.type] = (acc[workflow.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Get the top 3 most common workflow types
  const topWorkflowTypes = Object.entries(typeCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <div className="full-width-table-container">
      <style>{tableStyles}</style>
      
      {/* Primary Statistics */}
      <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '16px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', maxWidth: '60%' }}>
          <div className="dashboard-card card-all-simulations" style={{ padding: '12px 16px', backgroundColor: '#14364F' }}>
            <div style={{ fontSize: '14px', fontWeight: 'normal', marginBottom: '4px', color: 'white' }}>All Workflows</div>
            <div style={{ fontSize: '14px', fontWeight: 'normal', color: 'white' }}>{totalWorkflows} in last {timeFrame} weeks</div>
          </div>
          
          <div className="dashboard-card card-function" style={{ padding: '12px 16px' }}>
            <div style={{ fontSize: '14px', fontWeight: 'normal', marginBottom: '4px' }}>Completed</div>
            <div style={{ fontSize: '14px', fontWeight: 'normal', color: '#52c41a' }}>{completedWorkflows}</div>
          </div>
          
          <div className="dashboard-card card-logical" style={{ padding: '12px 16px' }}>
            <div style={{ fontSize: '14px', fontWeight: 'normal', marginBottom: '4px' }}>Running</div>
            <div style={{ fontSize: '14px', fontWeight: 'normal', color: '#1890ff' }}>{runningWorkflows}</div>
          </div>
          
          <div className="dashboard-card card-parameter" style={{ padding: '12px 16px' }}>
            <div style={{ fontSize: '14px', fontWeight: 'normal', marginBottom: '4px' }}>Scheduled</div>
            <div style={{ fontSize: '14px', fontWeight: 'normal', color: '#8c8c8c' }}>{scheduledWorkflows}</div>
          </div>
          
          <div className="dashboard-card card-parameter" style={{ padding: '12px 16px' }}>
            <div style={{ fontSize: '14px', fontWeight: 'normal', marginBottom: '4px' }}>Failed</div>
            <div style={{ fontSize: '14px', fontWeight: 'normal', color: '#f5222d' }}>{failedWorkflows}</div>
          </div>
          
          <div className="dashboard-card card-parameter" style={{ padding: '12px 16px' }}>
            <div style={{ fontSize: '14px', fontWeight: 'normal', marginBottom: '4px' }}>Paused</div>
            <div style={{ fontSize: '14px', fontWeight: 'normal', color: '#faad14' }}>{pausedWorkflows}</div>
          </div>
        </div>

        <div style={{ flex: 1, marginLeft: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              opacity: dateFilterEnabled ? 1 : 0.5,
              transition: 'opacity 0.3s'
            }}>
              Time Period: {timeFrame} weeks
              <div style={{ display: 'flex', alignItems: 'center', marginLeft: '16px' }}>
                <span style={{ marginRight: '8px', fontSize: '13px', color: '#666' }}>
                  Date filtering {dateFilterEnabled ? 'enabled' : 'disabled'}
                </span>
                <Switch 
                  checkedChildren="On" 
                  unCheckedChildren="Off" 
                  defaultChecked={dateFilterEnabled}
                  onChange={handleToggleDateFilter}
                  size="small"
                  style={{ backgroundColor: dateFilterEnabled ? '#2C668A' : undefined }}
                />
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Input 
                prefix={<SearchOutlined />} 
                placeholder="Search"
                style={{ width: '200px', marginRight: '8px' }}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  filterWorkflows(timeFrame, e.target.value, selectedType);
                }}
                value={searchText}
              />
              <Button 
                icon={<ReloadOutlined />} 
                onClick={() => filterWorkflows(timeFrame, searchText, selectedType)}
              >
                Refresh
              </Button>
            </div>
          </div>
          
          <Slider 
            marks={sliderMarks}
            min={1}
            max={52}
            value={timeFrame}
            onChange={handleTimeFrameChange}
            style={{ 
              width: '100%',
              opacity: dateFilterEnabled ? 1 : 0.5,
              transition: 'opacity 0.3s',
              marginRight: '10px'
            }}
            disabled={!dateFilterEnabled}
            trackStyle={{ backgroundColor: '#2C668A' }}
            handleStyle={{ borderColor: '#2C668A', backgroundColor: '#2C668A' }}
          />
        </div>
      </div>
      
      {/* Workflow Type Statistics */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
          Top Workflow Types
          {selectedType && (
            <Button 
              type="link" 
              size="small" 
              onClick={() => setSelectedType(null)}
              style={{ marginLeft: '8px', fontSize: '12px' }}
            >
              Clear Filter
            </Button>
          )}
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          {topWorkflowTypes.map(([type, count]) => (
            <div 
              key={type} 
              className="dashboard-card" 
              style={{ 
                padding: '12px 16px', 
                backgroundColor: selectedType === type ? '#bae7ff' : '#f0f7ff',
                border: '1px solid #bae0ff',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              onClick={() => handleTypeFilterClick(type)}
            >
              <div style={{ fontSize: '14px', fontWeight: 'normal', marginBottom: '4px' }}>{type}</div>
              <div style={{ fontSize: '14px', fontWeight: 'normal', color: '#1890ff' }}>{count} workflows</div>
            </div>
          ))}
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredWorkflows}
        pagination={{ pageSize: 25, position: ['bottomRight'] }}
        size="middle"
        rowKey="id"
        className="automation-table-with-borders full-width-table"
        bordered={false}
        style={{ marginTop: 0 }}
        expandable={{
          expandedRowRender: expandedRowRender,
          expandRowByClick: false
        }}
      />
    </div>
  );
};

export default AutomationTab; 