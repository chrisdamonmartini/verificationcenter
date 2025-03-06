import React, { useState } from 'react';
import { 
  Table, 
  Button, 
  Space, 
  Tag, 
  DatePicker, 
  Select, 
  Input, 
  Tooltip, 
  Badge, 
  Typography 
} from 'antd';
import { 
  SearchOutlined, 
  ThunderboltOutlined, 
  ClockCircleOutlined, 
  ToolOutlined, 
  FileOutlined, 
  TagOutlined, 
  RightOutlined, 
  QuestionCircleOutlined,
  InfoCircleOutlined 
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { RangePicker } = DatePicker;
const { Title, Text } = Typography;
const { Option } = Select;

interface BOMChange {
  id: string;
  bomId: string;
  title: string;
  category: 'hardware' | 'electronics' | 'software' | 'material' | 'supplier';
  type: 'added' | 'modified' | 'removed';
  severity: 'critical' | 'major' | 'minor';
  date: string;
  status: 'approved' | 'pending' | 'rejected';
  impactCount: number;
}

const EngineeringBOMChanges: React.FC = () => {
  // State for filters
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);
  const [selectedBOMs, setSelectedBOMs] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Sample data for BOM changes
  const bomChanges: BOMChange[] = [
    {
      id: 'BOM-007',
      bomId: 'E-215',
      title: 'Added New Sensor Component',
      category: 'electronics',
      type: 'added',
      severity: 'minor',
      date: '2023-03-25',
      status: 'approved',
      impactCount: 15
    },
    {
      id: 'BOM-006',
      bomId: 'H-398',
      title: 'Changed Fastener Specification',
      category: 'hardware',
      type: 'modified',
      severity: 'major',
      date: '2023-03-29',
      status: 'pending',
      impactCount: 24
    },
    {
      id: 'BOM-005',
      bomId: 'M-193',
      title: 'Updated Critical Material Source',
      category: 'material',
      type: 'modified',
      severity: 'critical',
      date: '2023-04-02',
      status: 'approved',
      impactCount: 32
    },
    {
      id: 'BOM-004',
      bomId: 'S-112',
      title: 'Removed Deprecated Software Package',
      category: 'software',
      type: 'removed',
      severity: 'minor',
      date: '2023-04-05',
      status: 'approved',
      impactCount: 8
    },
    {
      id: 'BOM-003',
      bomId: 'P-110',
      title: 'Changed Primary Supplier',
      category: 'supplier',
      type: 'modified',
      severity: 'major',
      date: '2023-04-09',
      status: 'approved',
      impactCount: 19
    }
  ];

  // Sample data for BOM options in filter
  const bomOptions = [
    { value: 'E-215', label: 'E-215 - Electronics Assembly' },
    { value: 'H-398', label: 'H-398 - Hardware Components' },
    { value: 'M-193', label: 'M-193 - Materials Specification' },
    { value: 'S-112', label: 'S-112 - Software Packages' },
    { value: 'P-110', label: 'P-110 - Procurement Items' }
  ];

  const handleDateRangeChange = (dates: any, dateStrings: [string, string]) => {
    if (dates) {
      setDateRange(dateStrings);
    } else {
      setDateRange(null);
    }
  };

  const handleBOMChange = (value: string[]) => {
    setSelectedBOMs(value);
  };

  const columns: ColumnsType<BOMChange> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      align: 'left'
    },
    {
      title: 'BOM',
      dataIndex: 'bomId',
      key: 'bomId',
      width: 100,
      align: 'left'
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => {
        const categoryConfig: Record<string, { color: string, icon: React.ReactNode, text: string }> = {
          hardware: { color: '#108ee9', icon: <ToolOutlined />, text: 'HARDWARE' },
          electronics: { color: '#87d068', icon: <ThunderboltOutlined />, text: 'ELECTRONICS' },
          software: { color: '#722ed1', icon: <FileOutlined />, text: 'SOFTWARE' },
          material: { color: '#faad14', icon: <TagOutlined />, text: 'MATERIAL' },
          supplier: { color: '#f50', icon: <ClockCircleOutlined />, text: 'SUPPLIER' }
        };

        const config = categoryConfig[category];
        return (
          <Tag color={config.color} icon={config.icon}>
            {config.text}
          </Tag>
        );
      },
      width: 160,
      align: 'left',
      filters: [
        { text: 'Hardware', value: 'hardware' },
        { text: 'Electronics', value: 'electronics' },
        { text: 'Software', value: 'software' },
        { text: 'Material', value: 'material' },
        { text: 'Supplier', value: 'supplier' }
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
      width: 300,
      align: 'left'
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => {
        const typeConfig: Record<string, { color: string, text: string, prefix: string }> = {
          added: { color: '#52c41a', text: 'ADDED', prefix: '+ ' },
          modified: { color: '#faad14', text: 'MODIFIED', prefix: '↻ ' },
          removed: { color: '#f5222d', text: 'REMOVED', prefix: '- ' }
        };

        const config = typeConfig[type];
        return (
          <Tag color={config.color} style={{ borderRadius: '12px', fontWeight: 'normal' }}>
            {config.prefix}{config.text}
          </Tag>
        );
      },
      width: 120,
      align: 'center',
      filters: [
        { text: 'Added', value: 'added' },
        { text: 'Modified', value: 'modified' },
        { text: 'Removed', value: 'removed' }
      ],
      onFilter: (value, record) => record.type === value
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {config.icon}
            <span style={{ marginLeft: 8, color: config.color, fontWeight: 'normal' }}>
              {config.text}
            </span>
          </div>
        );
      },
      width: 120,
      align: 'center',
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
      render: (date) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span>{date}</span>
        </div>
      ),
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      sortDirections: ['descend', 'ascend'],
      width: 120,
      align: 'center'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusConfig: Record<string, { color: string, dot: React.ReactNode }> = {
          approved: { color: '#52c41a', dot: <span style={{ marginRight: 6, color: '#52c41a' }}>●</span> },
          pending: { color: '#faad14', dot: <span style={{ marginRight: 6, color: '#faad14' }}>●</span> },
          rejected: { color: '#f5222d', dot: <span style={{ marginRight: 6, color: '#f5222d' }}>●</span> }
        };

        const config = statusConfig[status];
        return (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {config.dot}
            <span style={{ textTransform: 'capitalize' }}>{status}</span>
          </div>
        );
      },
      width: 120,
      align: 'center',
      filters: [
        { text: 'Approved', value: 'approved' },
        { text: 'Pending', value: 'pending' },
        { text: 'Rejected', value: 'rejected' }
      ],
      onFilter: (value, record) => record.status === value
    },
    {
      title: 'Impact',
      key: 'impact',
      render: (_, record) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Tag color="volcano" style={{ borderRadius: '12px' }}>
            {record.impactCount} affected items
          </Tag>
        </div>
      ),
      width: 150,
      align: 'center'
    }
  ];

  const expandedRowRender = (record: BOMChange) => {
    return (
      <div style={{ padding: '16px' }}>
        <p><strong>Detailed Description:</strong> This change affects component specifications in the engineering BOM.</p>
        <p><strong>Change Reason:</strong> Component availability and design improvements</p>
        <div style={{ marginTop: '16px' }}>
          <h4>Impacted Items:</h4>
          <ul>
            <li>Components: 7</li>
            <li>Assemblies: 4</li>
            <li>Documents: 3</li>
            <li>Verification Items: 5</li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="engineering-bom-changes">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Title level={5} style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
          <ToolOutlined style={{ marginRight: 8 }} /> Engineering BOM Changes
        </Title>
        <Space>
          <Button icon={<SearchOutlined />} style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginLeft: 4 }}>Advanced Search</span>
          </Button>
          <Button type="primary" icon={<ThunderboltOutlined />} style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginLeft: 4 }}>Impact Report</span>
          </Button>
        </Space>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        <div style={{ flex: 1 }}>
          <Text strong>Filter by Date Range</Text>
          <RangePicker 
            style={{ width: '100%', marginTop: 8 }} 
            onChange={handleDateRangeChange}
            placeholder={['Start date', 'End date']}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Text strong>Filter by BOM</Text>
          <Select
            mode="multiple"
            style={{ width: '100%', marginTop: 8 }}
            placeholder="Select BOMs"
            onChange={handleBOMChange}
            options={bomOptions}
            allowClear
          />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={bomChanges}
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
          total: bomChanges.length,
          pageSize: 5,
          showSizeChanger: false
        }}
      />
    </div>
  );
};

export default EngineeringBOMChanges; 