import React, { useState } from 'react';
import { 
  Table, 
  Button, 
  Space, 
  Tag, 
  DatePicker, 
  Select, 
  Tooltip, 
  Badge, 
  Typography 
} from 'antd';
import { 
  SearchOutlined, 
  ThunderboltOutlined, 
  ApartmentOutlined, 
  NodeIndexOutlined, 
  PartitionOutlined, 
  ApiOutlined, 
  BlockOutlined, 
  ClockCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  RightOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { RangePicker } = DatePicker;
const { Title, Text } = Typography;
const { Option } = Select;

interface FunctionChange {
  id: string;
  functionId: string;
  title: string;
  description: string;
  category: 'decomposition' | 'allocation' | 'interface' | 'behavior' | 'performance';
  changeType: 'added' | 'modified' | 'removed';
  severity: 'critical' | 'major' | 'minor';
  date: string;
  status: 'reviewed' | 'pending' | 'approved' | 'rejected';
  impactCount: number;
}

const FunctionsChanges: React.FC = () => {
  // State for filters
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);
  const [selectedFunctions, setSelectedFunctions] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Sample data for function changes
  const functionChanges: FunctionChange[] = [
    {
      id: 'FUNC-001',
      functionId: 'FUNC-101',
      title: 'Updated signal processing algorithm',
      description: 'The signal processing algorithm was updated to improve detection reliability in high-noise environments.',
      category: 'performance',
      changeType: 'modified',
      severity: 'major',
      date: '2025-02-28',
      status: 'approved',
      impactCount: 10
    },
    {
      id: 'FUNC-002',
      functionId: 'FUNC-205',
      title: 'Added error recovery function',
      description: 'Added a new function to handle error recovery after communication loss.',
      category: 'behavior',
      changeType: 'added',
      severity: 'major',
      date: '2025-02-25',
      status: 'pending',
      impactCount: 12
    },
    {
      id: 'FUNC-003',
      functionId: 'FUNC-118',
      title: 'Reassigned function to different subsystem',
      description: 'Navigation function reassigned from guidance subsystem to flight control subsystem.',
      category: 'allocation',
      changeType: 'modified',
      severity: 'critical',
      date: '2025-02-20',
      status: 'reviewed',
      impactCount: 13
    },
    {
      id: 'FUNC-004',
      functionId: 'FUNC-322',
      title: 'Removed redundant data validation',
      description: 'Removed redundant data validation that was causing performance bottlenecks.',
      category: 'behavior',
      changeType: 'removed',
      severity: 'minor',
      date: '2025-02-18',
      status: 'approved',
      impactCount: 4
    },
    {
      id: 'FUNC-005',
      functionId: 'FUNC-156',
      title: 'Modified interface parameters',
      description: 'Updated interface parameters for the altitude control function.',
      category: 'interface',
      changeType: 'modified',
      severity: 'major',
      date: '2025-02-15',
      status: 'approved',
      impactCount: 10
    }
  ];

  // Sample data for function options in filter
  const functionOptions = [
    { value: 'FUNC-100', label: 'FUNC-100 - Signal Processing' },
    { value: 'FUNC-200', label: 'FUNC-200 - Error Recovery' },
    { value: 'FUNC-115', label: 'FUNC-115 - Navigation Control' },
    { value: 'FUNC-320', label: 'FUNC-320 - Data Validation' },
    { value: 'FUNC-150', label: 'FUNC-150 - Altitude Control' }
  ];

  const handleDateRangeChange = (dates: any, dateStrings: [string, string]) => {
    if (dates) {
      setDateRange(dateStrings);
    } else {
      setDateRange(null);
    }
  };

  const handleFunctionChange = (value: string[]) => {
    setSelectedFunctions(value);
  };

  const columns: ColumnsType<FunctionChange> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 120
    },
    {
      title: 'Function ID',
      dataIndex: 'functionId',
      key: 'functionId',
      width: 120
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => {
        const categoryConfig: Record<string, { color: string, icon: React.ReactNode, text: string }> = {
          decomposition: { color: 'green', icon: <NodeIndexOutlined />, text: 'DECOMPOSITION' },
          allocation: { color: 'blue', icon: <PartitionOutlined />, text: 'ALLOCATION' },
          interface: { color: 'purple', icon: <ApiOutlined />, text: 'INTERFACE' },
          behavior: { color: 'cyan', icon: <ApartmentOutlined />, text: 'BEHAVIOR' },
          performance: { color: 'orange', icon: <BlockOutlined />, text: 'PERFORMANCE' }
        };

        const config = categoryConfig[category];
        return (
          <Tag color={config.color} icon={config.icon}>
            {config.text}
          </Tag>
        );
      },
      width: 150,
      filters: [
        { text: 'Decomposition', value: 'decomposition' },
        { text: 'Allocation', value: 'allocation' },
        { text: 'Interface', value: 'interface' },
        { text: 'Behavior', value: 'behavior' },
        { text: 'Performance', value: 'performance' }
      ],
      onFilter: (value, record) => record.category === value
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <div>
          {text}
          <Tooltip title="View detailed information about this change">
            <InfoCircleOutlined style={{ marginLeft: 8, color: '#1890ff' }} />
          </Tooltip>
        </div>
      ),
      width: 300
    },
    {
      title: 'Type',
      dataIndex: 'changeType',
      key: 'changeType',
      render: (type) => {
        const typeConfig: Record<string, { color: string, text: string, prefix: string }> = {
          added: { color: '#52c41a', text: 'ADDED', prefix: '+ ' },
          modified: { color: '#faad14', text: 'MODIFIED', prefix: '⟳ ' },
          removed: { color: '#f5222d', text: 'REMOVED', prefix: '- ' }
        };

        const config = typeConfig[type];
        return (
          <Tag color={config.color}>
            {config.prefix}{config.text}
          </Tag>
        );
      },
      width: 130,
      filters: [
        { text: 'Added', value: 'added' },
        { text: 'Modified', value: 'modified' },
        { text: 'Removed', value: 'removed' }
      ],
      onFilter: (value, record) => record.changeType === value
    },
    {
      title: 'Severity',
      dataIndex: 'severity',
      key: 'severity',
      render: (severity) => {
        const severityConfig: Record<string, { color: string, icon: React.ReactNode, text: string }> = {
          critical: { color: '#f5222d', icon: <Badge status="error" />, text: 'CRITICAL' },
          major: { color: '#faad14', icon: <Badge status="warning" />, text: 'MAJOR' },
          minor: { color: '#52c41a', icon: <Badge status="success" />, text: 'MINOR' }
        };

        const config = severityConfig[severity];
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {config.icon}
            <span style={{ marginLeft: 8, color: config.color }}>
              {config.text}
            </span>
          </div>
        );
      },
      width: 120,
      filters: [
        { text: 'Critical', value: 'critical' },
        { text: 'Major', value: 'major' },
        { text: 'Minor', value: 'minor' }
      ],
      onFilter: (value, record) => record.severity === value
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      sortDirections: ['descend', 'ascend'],
      width: 120
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusConfig: Record<string, { color: string, dot: React.ReactNode }> = {
          approved: { color: '#52c41a', dot: <span style={{ marginRight: 6, color: '#52c41a' }}>●</span> },
          pending: { color: '#faad14', dot: <span style={{ marginRight: 6, color: '#faad14' }}>●</span> },
          reviewed: { color: '#1890ff', dot: <span style={{ marginRight: 6, color: '#1890ff' }}>●</span> },
          rejected: { color: '#f5222d', dot: <span style={{ marginRight: 6, color: '#f5222d' }}>●</span> }
        };

        const config = statusConfig[status];
        return (
          <div>
            {config.dot}
            <span style={{ textTransform: 'capitalize' }}>{status}</span>
          </div>
        );
      },
      width: 120,
      filters: [
        { text: 'Approved', value: 'approved' },
        { text: 'Pending', value: 'pending' },
        { text: 'Reviewed', value: 'reviewed' },
        { text: 'Rejected', value: 'rejected' }
      ],
      onFilter: (value, record) => record.status === value
    },
    {
      title: 'Impact',
      key: 'impact',
      render: (_, record) => (
        <Tag color="volcano">
          {record.impactCount} affected items
        </Tag>
      ),
      width: 150
    }
  ];

  const expandedRowRender = (record: FunctionChange) => {
    return (
      <div style={{ padding: '16px' }}>
        <p><strong>Detailed Description:</strong> {record.description}</p>
        <p><strong>Change Reason:</strong> Functionality improvement and system optimization</p>
        <div style={{ marginTop: '16px' }}>
          <h4>Impacted Items:</h4>
          <ul>
            <li>Requirements: 3</li>
            <li>Components: 4</li>
            <li>Interfaces: 2</li>
            <li>Tests: 1</li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="functions-changes-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Title level={5} style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
          <ApartmentOutlined style={{ marginRight: 8 }} /> Function Changes
        </Title>
        <Space>
          <Button icon={<SearchOutlined />}>Advanced Search</Button>
          <Button type="primary" icon={<ThunderboltOutlined />}>Impact Report</Button>
        </Space>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        <div style={{ flex: 1 }}>
          <Text strong>Filter by Date Range</Text>
          <RangePicker 
            style={{ width: '100%', marginTop: 8 }} 
            onChange={handleDateRangeChange}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Text strong>Filter by Function</Text>
          <Select
            mode="multiple"
            style={{ width: '100%', marginTop: 8 }}
            placeholder="Select Functions"
            onChange={handleFunctionChange}
            options={functionOptions}
            allowClear
          />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={functionChanges}
        rowKey="id"
        expandable={{
          expandedRowRender,
          expandIcon: ({ expanded, onExpand, record }) => 
            expanded ? (
              <RightOutlined rotate={90} onClick={e => onExpand(record, e)} style={{ cursor: 'pointer' }} />
            ) : (
              <RightOutlined onClick={e => onExpand(record, e)} style={{ cursor: 'pointer' }} />
            )
        }}
        size="middle"
        pagination={{
          current: currentPage,
          onChange: setCurrentPage,
          showSizeChanger: false,
          simple: true
        }}
      />
    </div>
  );
};

export default FunctionsChanges; 