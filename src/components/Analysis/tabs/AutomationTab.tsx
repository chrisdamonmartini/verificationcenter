import React, { useState } from 'react';
import { Table, Card, Typography, Tag, Space, Button, Tooltip, Progress, Input, Select } from 'antd';
import { SearchOutlined, PlayCircleOutlined, PauseCircleOutlined, ClockCircleOutlined, CheckCircleOutlined, CloseCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import AutomationIcon from '../../../icons/AnalysisRequest.svg';

const { Title, Text } = Typography;
const { Option } = Select;

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
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  // Status tag renderer
  const getStatusTag = (status: string) => {
    switch (status) {
      case 'Running':
        return (
          <Tag icon={<PlayCircleOutlined />} color="processing">
            {status}
          </Tag>
        );
      case 'Completed':
        return (
          <Tag icon={<CheckCircleOutlined />} color="success">
            {status}
          </Tag>
        );
      case 'Failed':
        return (
          <Tag icon={<CloseCircleOutlined />} color="error">
            {status}
          </Tag>
        );
      case 'Scheduled':
        return (
          <Tag icon={<ClockCircleOutlined />} color="default">
            {status}
          </Tag>
        );
      case 'Paused':
        return (
          <Tag icon={<PauseCircleOutlined />} color="warning">
            {status}
          </Tag>
        );
      default:
        return <Tag>{status}</Tag>;
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
      width: 140,
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
      width: 150,
      render: (progress, record) => {
        const progressStatus = 
          record.status === 'Failed' ? 'exception' : 
          record.status === 'Paused' ? 'normal' :
          record.status === 'Completed' ? 'success' : 'active';
        
        return <Progress percent={progress} status={progressStatus} size="small" />;
      },
    },
    {
      title: 'Last Run',
      dataIndex: 'lastRun',
      key: 'lastRun',
      width: 120,
    },
    {
      title: 'Next Run',
      dataIndex: 'nextRun',
      key: 'nextRun',
      width: 120,
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
      width: 150,
    },
    {
      title: 'Environment',
      dataIndex: 'environmentName',
      key: 'environmentName',
      width: 180,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 180,
      render: (_, record) => (
        <Space size="small">
          {record.status === 'Running' && (
            <Button size="small" icon={<PauseCircleOutlined />}>Pause</Button>
          )}
          {record.status === 'Paused' && (
            <Button size="small" type="primary" icon={<PlayCircleOutlined />}>Resume</Button>
          )}
          {record.status === 'Scheduled' && (
            <Button size="small" type="primary" icon={<PlayCircleOutlined />}>Start</Button>
          )}
          {record.status === 'Failed' && (
            <Button size="small" type="primary" icon={<PlayCircleOutlined />}>Retry</Button>
          )}
          {record.results && (
            <Button size="small" type="link">Results</Button>
          )}
        </Space>
      ),
    },
  ];
  
  // Filter the data based on search text and status filter
  const filteredData = sampleAutomation.filter(item => {
    const matchesSearch = searchText
      ? (item.name.toLowerCase().includes(searchText.toLowerCase()) ||
         item.description.toLowerCase().includes(searchText.toLowerCase()) ||
         item.id.toLowerCase().includes(searchText.toLowerCase()))
      : true;
    
    const matchesStatus = statusFilter
      ? item.status === statusFilter
      : true;
    
    return matchesSearch && matchesStatus;
  });
  
  return (
    <div className="automation-tab-container">
      <div className="filter-section" style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Space>
          <Input
            placeholder="Search automation workflows..."
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            prefix={<SearchOutlined />}
            style={{ width: 250 }}
          />
          <Select
            placeholder="Filter by Status"
            style={{ width: 180 }}
            allowClear
            onChange={(value) => setStatusFilter(value)}
          >
            <Option value="Running">Running</Option>
            <Option value="Scheduled">Scheduled</Option>
            <Option value="Completed">Completed</Option>
            <Option value="Failed">Failed</Option>
            <Option value="Paused">Paused</Option>
          </Select>
        </Space>
        <Button type="primary">Create Workflow</Button>
      </div>
      
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        size="middle"
        pagination={{ pageSize: 10 }}
        expandable={{
          expandedRowRender: (record) => (
            <div style={{ padding: '0 20px' }}>
              <p style={{ margin: 0 }}><strong>Description:</strong> {record.description}</p>
              <p style={{ margin: '8px 0' }}>
                <strong>Schedule:</strong> {record.schedule} | 
                <strong> Duration:</strong> {record.duration} | 
                <strong> Model IDs:</strong> {record.modelIds.join(', ')}
              </p>
              {(record.status === 'Running' || record.cpuUsage > 0) && (
                <div style={{ display: 'flex', gap: '20px', marginTop: '8px' }}>
                  <div>
                    <strong>CPU Usage:</strong>
                    <Progress percent={record.cpuUsage} size="small" />
                  </div>
                  <div>
                    <strong>Memory Usage:</strong>
                    <Progress percent={record.memoryUsage} size="small" />
                  </div>
                </div>
              )}
            </div>
          ),
        }}
      />
    </div>
  );
};

export default AutomationTab; 