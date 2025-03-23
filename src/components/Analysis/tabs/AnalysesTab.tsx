import React, { useState } from 'react';
import { Table, Tag, Progress, Space, Button, Input, Select } from 'antd';
import { SearchOutlined, CheckCircleOutlined, SyncOutlined, ClockCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Option } = Select;

// Interface for analysis items
interface AnalysisItem {
  id: string;
  name: string;
  status: 'Completed' | 'In Progress' | 'Pending';
  progress: number;
  type: 'Design' | 'Verification' | 'Simulation';
  dueDate: string;
  assignedTo: string;
  lastRun?: string;
}

// Sample data matching the screenshot
const sampleAnalyses: AnalysisItem[] = [
  {
    id: 'AN-001',
    name: 'Structural Analysis - Wing Components',
    status: 'Completed',
    progress: 100,
    type: 'Design',
    dueDate: '2023-04-30',
    assignedTo: 'John Smith',
    lastRun: '2023-05-10'
  },
  {
    id: 'AN-002',
    name: 'Thermal Analysis - Engine Bay',
    status: 'In Progress',
    progress: 65,
    type: 'Verification',
    dueDate: '2023-05-20',
    assignedTo: 'Emily Johnson',
    lastRun: '2023-05-08'
  },
  {
    id: 'AN-003',
    name: 'Aerodynamic Analysis - Full Aircraft',
    status: 'In Progress',
    progress: 45,
    type: 'Simulation',
    dueDate: '2023-06-15',
    assignedTo: 'Michael Chen',
    lastRun: '2023-05-05'
  },
  {
    id: 'AN-004',
    name: 'Control Systems Analysis',
    status: 'Pending',
    progress: 0,
    type: 'Verification',
    dueDate: '2023-05-30',
    assignedTo: 'Sarah Williams',
    lastRun: undefined
  },
  {
    id: 'AN-005',
    name: 'Environmental Impact Analysis',
    status: 'Completed',
    progress: 100,
    type: 'Simulation',
    dueDate: '2023-05-10',
    assignedTo: 'David Kim',
    lastRun: '2023-04-28'
  }
];

const AnalysesTab: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  
  // Status tag renderer
  const getStatusTag = (status: string) => {
    switch (status) {
      case 'Completed':
        return (
          <Tag color="success">
            Completed
          </Tag>
        );
      case 'In Progress':
        return (
          <Tag color="processing">
            In Progress
          </Tag>
        );
      case 'Pending':
        return (
          <Tag color="default">
            Pending
          </Tag>
        );
      default:
        return <Tag>{status}</Tag>;
    }
  };
  
  // Type tag renderer
  const getTypeTag = (type: string) => {
    switch (type) {
      case 'Design':
        return (
          <Tag color="purple">
            Design
          </Tag>
        );
      case 'Verification':
        return (
          <Tag color="blue">
            Verification
          </Tag>
        );
      case 'Simulation':
        return (
          <Tag color="cyan">
            Simulation
          </Tag>
        );
      default:
        return <Tag>{type}</Tag>;
    }
  };
  
  // Table columns definition
  const columns: ColumnsType<AnalysisItem> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => getStatusTag(status),
      filters: [
        { text: 'Completed', value: 'Completed' },
        { text: 'In Progress', value: 'In Progress' },
        { text: 'Pending', value: 'Pending' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'PROGRESS',
      dataIndex: 'progress',
      key: 'progress',
      width: 150,
      render: (progress, record) => {
        const progressStatus = 
          record.status === 'Completed' ? 'success' : 
          record.status === 'In Progress' ? 'active' : 'normal';
        
        return <Progress percent={progress} status={progressStatus} size="small" />;
      },
    },
    {
      title: 'TYPE',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      render: (type) => getTypeTag(type),
      filters: [
        { text: 'Design', value: 'Design' },
        { text: 'Verification', value: 'Verification' },
        { text: 'Simulation', value: 'Simulation' },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: 'DUE DATE',
      dataIndex: 'dueDate',
      key: 'dueDate',
      width: 120,
      sorter: (a, b) => a.dueDate.localeCompare(b.dueDate),
    },
    {
      title: 'ASSIGNED TO',
      dataIndex: 'assignedTo',
      key: 'assignedTo',
      width: 150,
    },
    {
      title: 'LAST RUN',
      dataIndex: 'lastRun',
      key: 'lastRun',
      width: 120,
      render: (lastRun) => lastRun || 'N/A',
    },
    {
      title: 'ACTIONS',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <Button type="text" size="small" style={{ padding: 0 }}>✓</Button>
          <Button type="text" size="small" style={{ padding: 0 }}>⋮</Button>
          <Button type="text" size="small" style={{ padding: 0 }}>▶</Button>
        </Space>
      ),
    },
  ];
  
  // Filter the data based on search and filters
  const filteredData = sampleAnalyses.filter(item => {
    const matchesSearch = searchText
      ? (item.name.toLowerCase().includes(searchText.toLowerCase()) ||
         item.id.toLowerCase().includes(searchText.toLowerCase()) ||
         item.assignedTo.toLowerCase().includes(searchText.toLowerCase()))
      : true;
    
    const matchesStatus = statusFilter
      ? item.status === statusFilter
      : true;
    
    const matchesType = typeFilter
      ? item.type === typeFilter
      : true;
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  // Stats for the header
  const totalAnalyses = sampleAnalyses.length;
  const completedAnalyses = sampleAnalyses.filter(item => item.status === 'Completed').length;
  const inProgressAnalyses = sampleAnalyses.filter(item => item.status === 'In Progress').length;
  
  return (
    <div className="analyses-tab-container">
      <div className="stats-bar" style={{ marginBottom: '16px', display: 'flex', gap: '16px' }}>
        <div>Total: {totalAnalyses}</div>
        <div>Completed: {completedAnalyses}</div>
        <div>In Progress: {inProgressAnalyses}</div>
        
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
          <Input
            placeholder="Search analyses..."
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            prefix={<SearchOutlined />}
            style={{ width: 200 }}
          />
          <Select
            placeholder="All Statuses"
            style={{ width: 140 }}
            onChange={(value) => setStatusFilter(value)}
            allowClear
          >
            <Option value="Completed">Completed</Option>
            <Option value="In Progress">In Progress</Option>
            <Option value="Pending">Pending</Option>
          </Select>
        </div>
      </div>
      
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        size="middle"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default AnalysesTab; 