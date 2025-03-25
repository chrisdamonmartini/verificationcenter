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
}

// Function to get relative date from March 24, 2025
const getRelativeDate = (daysAgo: number): string => {
  return moment('2025-03-24').subtract(daysAgo, 'days').format('YYYY-MM-DD');
};

// Sample automation data
const sampleAutomation: AutomationWorkflow[] = [
  {
    id: 'AUTO-801',
    name: 'Load Analysis Workflow',
    description: 'Automated workflow for structural load analysis using FEM models',
    status: 'Completed',
    progress: 100,
    schedule: 'Daily',
    nextRun: '2025-01-16',
    lastRun: getRelativeDate(3),
    owner: 'Process Automation',
    environmentId: 'ENV-101',
    environmentName: 'High Performance Cluster',
    modelIds: ['MDL-701'],
    duration: '3h 45m',
    cpuUsage: 85,
    memoryUsage: 72,
    results: 'https://results.example.com/AUTO-801'
  },
  {
    id: 'AUTO-802',
    name: 'Aerodynamic Performance Analysis',
    description: 'Automated CFD analysis for performance evaluation',
    status: 'Running',
    progress: 65,
    schedule: 'Weekly',
    nextRun: '2025-01-22',
    lastRun: getRelativeDate(7),
    owner: 'Aero Team',
    environmentId: 'ENV-102',
    environmentName: 'Cloud Compute Environment',
    modelIds: ['MDL-702'],
    duration: '8h 10m (estimated)',
    cpuUsage: 92,
    memoryUsage: 86,
    results: undefined
  },
  {
    id: 'AUTO-803',
    name: 'Thermal Analysis Sequence',
    description: 'Multi-stage thermal analysis workflow for engine components',
    status: 'Scheduled',
    progress: 0,
    schedule: 'On Demand',
    nextRun: '2025-01-17',
    lastRun: getRelativeDate(14),
    owner: 'Thermal Team',
    environmentId: 'ENV-101',
    environmentName: 'High Performance Cluster',
    modelIds: ['MDL-703'],
    duration: '2h 30m (estimated)',
    cpuUsage: 0,
    memoryUsage: 0,
    results: undefined
  },
  {
    id: 'AUTO-804',
    name: 'Fatigue Analysis Job',
    description: 'Batch processing for fatigue life prediction across multiple load cases',
    status: 'Failed',
    progress: 38,
    schedule: 'Weekly',
    nextRun: '2025-01-20',
    lastRun: getRelativeDate(10),
    owner: 'Materials Team',
    environmentId: 'ENV-103',
    environmentName: 'Local Compute Environment',
    modelIds: ['MDL-704'],
    duration: '1h 20m (terminated)',
    cpuUsage: 0,
    memoryUsage: 0,
    results: 'https://results.example.com/AUTO-804-error'
  },
  {
    id: 'AUTO-805',
    name: 'Control System Simulation',
    description: 'Simulation of flight control system response under various scenarios',
    status: 'Paused',
    progress: 45,
    schedule: 'Daily',
    nextRun: 'Paused',
    lastRun: getRelativeDate(9),
    owner: 'Controls Team',
    environmentId: 'ENV-102',
    environmentName: 'Cloud Compute Environment',
    modelIds: ['MDL-705'],
    duration: '1h 15m (paused)',
    cpuUsage: 0,
    memoryUsage: 0,
    results: undefined
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

  // Filter workflows based on time frame and search text
  const filterWorkflows = (weeks: number, text: string) => {
    console.log('Filtering workflows with timeframe:', weeks, 'weeks and search:', text);
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
        workflow.environmentName.toLowerCase().includes(searchLower)
      );
      console.log('After text filtering:', filtered.length, 'workflows remain');
    }
    
    setFilteredWorkflows(filtered);
  };

  // Update filtered data when dependencies change
  useEffect(() => {
    filterWorkflows(timeFrame, searchText);
  }, [timeFrame, dateFilterEnabled, searchText]);

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
      filterWorkflows(value, searchText);
    }
  };

  // Toggle date filtering
  const handleToggleDateFilter = (checked: boolean) => {
    setDateFilterEnabled(checked);
    if (checked) {
      filterWorkflows(timeFrame, searchText);
    } else {
      // When disabling date filter, show all workflows with text filter only
      filterWorkflows(0, searchText); // Pass 0 to indicate no date filtering
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
      width: 200,
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      width: 150,
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
  
  // Expandable row render function
  const expandedRowRender = (record: AutomationWorkflow) => (
    <div style={{ padding: '0 48px' }}>
      <p style={{ margin: '8px 0' }}><strong>Description:</strong> {record.description}</p>
      <div style={{ display: 'flex', gap: '24px', margin: '16px 0' }}>
        <div>
          <p><strong>Owner:</strong> {record.owner}</p>
          <p><strong>Last Run:</strong> {record.lastRun}</p>
        </div>
        <div>
          <p><strong>Models:</strong> {record.modelIds.join(', ')}</p>
          <p><strong>Environment ID:</strong> {record.environmentId}</p>
        </div>
        {record.status === 'Running' && (
          <div>
            <p><strong>CPU Usage:</strong> {record.cpuUsage}%</p>
            <p><strong>Memory Usage:</strong> {record.memoryUsage}%</p>
          </div>
        )}
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

  return (
    <div className="full-width-table-container">
      <style>{tableStyles}</style>
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
                  filterWorkflows(timeFrame, e.target.value);
                }}
                value={searchText}
              />
              <Button 
                icon={<ReloadOutlined />} 
                onClick={() => filterWorkflows(timeFrame, searchText)}
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