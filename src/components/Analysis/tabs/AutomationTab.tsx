import React from 'react';
import { Tag, Space, Button, Tooltip, Progress } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined, ClockCircleOutlined, CheckCircleOutlined, CloseCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import AutomationIcon from '../../../icons/AnalysisRequest.svg';
import { StandardTable } from '../../common/StandardTable';

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
    lastRun: '2025-01-15',
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
    lastRun: '2025-01-15',
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
    lastRun: '2025-01-10',
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
    lastRun: '2025-01-13',
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
    lastRun: '2025-01-14',
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

const AutomationTab: React.FC = () => {
  // Status tag renderer
  const getStatusTag = (status: string) => {
    switch (status) {
      case 'Running':
        return (
          <Tag icon={<PlayCircleOutlined />} color="processing" style={{ margin: 0, padding: '0 6px', height: '18px', lineHeight: '18px' }}>
            {status}
          </Tag>
        );
      case 'Completed':
        return (
          <Tag icon={<CheckCircleOutlined />} color="success" style={{ margin: 0, padding: '0 6px', height: '18px', lineHeight: '18px' }}>
            {status}
          </Tag>
        );
      case 'Failed':
        return (
          <Tag icon={<CloseCircleOutlined />} color="error" style={{ margin: 0, padding: '0 6px', height: '18px', lineHeight: '18px' }}>
            {status}
          </Tag>
        );
      case 'Scheduled':
        return (
          <Tag icon={<ClockCircleOutlined />} color="default" style={{ margin: 0, padding: '0 6px', height: '18px', lineHeight: '18px' }}>
            {status}
          </Tag>
        );
      case 'Paused':
        return (
          <Tag icon={<PauseCircleOutlined />} color="warning" style={{ margin: 0, padding: '0 6px', height: '18px', lineHeight: '18px' }}>
            {status}
          </Tag>
        );
      default:
        return <Tag style={{ margin: 0, padding: '0 6px', height: '18px', lineHeight: '18px' }}>{status}</Tag>;
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
          <img src={AutomationIcon} alt="Automation" style={{ width: '16px', height: '16px' }} />
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
      render: (progress, record) => {
        const progressStatus = 
          record.status === 'Completed' ? 'success' : 
          record.status === 'Running' ? 'active' : 
          record.status === 'Failed' ? 'exception' : 'normal';
        
        return <Progress percent={progress} status={progressStatus} size="small" style={{ margin: 0 }} />;
      },
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
  
  // Calculate stats
  const totalWorkflows = sampleAutomation.length;
  const completedWorkflows = sampleAutomation.filter(item => item.status === 'Completed').length;
  const runningWorkflows = sampleAutomation.filter(item => item.status === 'Running').length;
  const pendingWorkflows = sampleAutomation.filter(item => item.status === 'Scheduled').length;
  
  // Formatted stats for the StandardTable
  const tableStats = [
    { label: 'Total', value: totalWorkflows },
    { label: 'Completed', value: completedWorkflows, color: '#52c41a' },
    { label: 'Running', value: runningWorkflows, color: '#1890ff' },
    { label: 'Scheduled', value: pendingWorkflows, color: '#faad14' }
  ];
  
  // Extra controls
  const extraControls = (
    <Button type="primary">New Workflow</Button>
  );
  
  return (
    <StandardTable
      title="Automation Workflows"
      data={sampleAutomation}
      columns={columns}
      loading={false}
      expandedRowRender={expandedRowRender}
      searchableFields={['id', 'name', 'description', 'environmentName']}
      stats={tableStats}
      extraControls={extraControls}
      refreshData={() => console.log('Refreshing automation workflows...')}
    />
  );
};

export default AutomationTab; 