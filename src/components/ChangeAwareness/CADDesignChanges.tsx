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
  Typography, 
  Image 
} from 'antd';
import { 
  SearchOutlined, 
  ThunderboltOutlined, 
  ExperimentOutlined, 
  InfoCircleOutlined, 
  WarningOutlined, 
  CheckCircleOutlined, 
  RightOutlined, 
  ToolOutlined, 
  LayoutOutlined, 
  FundOutlined, 
  SyncOutlined, 
  BranchesOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { RangePicker } = DatePicker;
const { Title, Text } = Typography;
const { Option } = Select;

interface CADChange {
  id: string;
  partNumber: string;
  title: string;
  description: string;
  category: 'geometry' | 'material' | 'assembly' | 'dimension' | 'tolerance';
  changeType: 'added' | 'modified' | 'removed';
  severity: 'critical' | 'major' | 'minor';
  date: string;
  status: 'approved' | 'pending' | 'rejected' | 'in-review';
  impactCount: number;
  thumbnailUrl?: string;
}

const CADDesignChanges: React.FC = () => {
  // State for filters
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Sample data for CAD changes
  const cadChanges: CADChange[] = [
    {
      id: 'CAD-001',
      partNumber: 'P-10078-A',
      title: 'Updated wing profile geometry',
      description: 'Modified the wing profile to improve aerodynamic efficiency by 3.5%.',
      category: 'geometry',
      changeType: 'modified',
      severity: 'major',
      date: '2025-02-28',
      status: 'approved',
      impactCount: 8,
      thumbnailUrl: 'https://placehold.co/150x100/e6f7ff/1890ff?text=Wing+Profile'
    },
    {
      id: 'CAD-002',
      partNumber: 'P-22315-C',
      title: 'Added reinforcement ribs',
      description: 'Added additional reinforcement ribs to the central fuselage to improve structural integrity.',
      category: 'assembly',
      changeType: 'added',
      severity: 'major',
      date: '2025-02-25',
      status: 'pending',
      impactCount: 5,
      thumbnailUrl: 'https://placehold.co/150x100/e6f7ff/1890ff?text=Reinforcement+Ribs'
    },
    {
      id: 'CAD-003',
      partNumber: 'P-31109-B',
      title: 'Changed material specification',
      description: 'Updated the material specification for the landing gear support from AL-7075 to AL-7175 for increased strength.',
      category: 'material',
      changeType: 'modified',
      severity: 'critical',
      date: '2025-02-20',
      status: 'in-review',
      impactCount: 4,
      thumbnailUrl: 'https://placehold.co/150x100/e6f7ff/1890ff?text=Landing+Gear'
    },
    {
      id: 'CAD-004',
      partNumber: 'P-42056-A',
      title: 'Adjusted control surface dimensions',
      description: 'Increased the width of the elevator control surface by 15mm to improve responsiveness.',
      category: 'dimension',
      changeType: 'modified',
      severity: 'minor',
      date: '2025-02-18',
      status: 'approved',
      impactCount: 3,
      thumbnailUrl: 'https://placehold.co/150x100/e6f7ff/1890ff?text=Control+Surface'
    },
    {
      id: 'CAD-005',
      partNumber: 'P-12789-D',
      title: 'Removed redundant mounting brackets',
      description: 'Removed redundant mounting brackets that were no longer needed due to redesign of the navigation system housing.',
      category: 'assembly',
      changeType: 'removed',
      severity: 'minor',
      date: '2025-02-15',
      status: 'approved',
      impactCount: 6,
      thumbnailUrl: 'https://placehold.co/150x100/e6f7ff/1890ff?text=Mounting+Brackets'
    }
  ];

  // Sample data for parts filter
  const partOptions = [
    { value: 'P-10078-A', label: 'P-10078-A - Wing Profile' },
    { value: 'P-22315-C', label: 'P-22315-C - Fuselage Ribs' },
    { value: 'P-31109-B', label: 'P-31109-B - Landing Gear Support' },
    { value: 'P-42056-A', label: 'P-42056-A - Elevator Surface' },
    { value: 'P-12789-D', label: 'P-12789-D - Nav System Mounting' }
  ];

  const handleDateRangeChange = (dates: any, dateStrings: [string, string]) => {
    if (dates) {
      setDateRange(dateStrings);
    } else {
      setDateRange(null);
    }
  };

  const handlePartChange = (value: string[]) => {
    setSelectedParts(value);
  };

  const columns: ColumnsType<CADChange> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 120
    },
    {
      title: 'Part Number',
      dataIndex: 'partNumber',
      key: 'partNumber',
      width: 120
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => {
        const categoryConfig: Record<string, { color: string, icon: React.ReactNode, text: string }> = {
          geometry: { color: 'cyan', icon: <LayoutOutlined />, text: 'GEOMETRY' },
          material: { color: 'purple', icon: <ExperimentOutlined />, text: 'MATERIAL' },
          assembly: { color: 'blue', icon: <BranchesOutlined />, text: 'ASSEMBLY' },
          dimension: { color: 'green', icon: <FundOutlined />, text: 'DIMENSION' },
          tolerance: { color: 'orange', icon: <ToolOutlined />, text: 'TOLERANCE' }
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
        { text: 'Geometry', value: 'geometry' },
        { text: 'Material', value: 'material' },
        { text: 'Assembly', value: 'assembly' },
        { text: 'Dimension', value: 'dimension' },
        { text: 'Tolerance', value: 'tolerance' }
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
          'in-review': { color: '#1890ff', dot: <span style={{ marginRight: 6, color: '#1890ff' }}>●</span> },
          rejected: { color: '#f5222d', dot: <span style={{ marginRight: 6, color: '#f5222d' }}>●</span> }
        };

        const config = statusConfig[status];
        return (
          <div>
            {config.dot}
            <span style={{ textTransform: 'capitalize' }}>{status.replace('-', ' ')}</span>
          </div>
        );
      },
      width: 120,
      filters: [
        { text: 'Approved', value: 'approved' },
        { text: 'Pending', value: 'pending' },
        { text: 'In Review', value: 'in-review' },
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

  const expandedRowRender = (record: CADChange) => {
    return (
      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <p><strong>Detailed Description:</strong> {record.description}</p>
            <p><strong>Change Reason:</strong> Improved performance and design optimization</p>
            <div style={{ marginTop: '16px' }}>
              <h4>Impacted Items:</h4>
              <ul>
                <li>Assemblies: 2</li>
                <li>Other Parts: 3</li>
                <li>Requirements: {Math.floor(record.impactCount/2)}</li>
                <li>Tests: {Math.floor(record.impactCount/3)}</li>
              </ul>
            </div>
          </div>
          {record.thumbnailUrl && (
            <div style={{ marginLeft: '16px', width: '150px' }}>
              <Image
                src={record.thumbnailUrl}
                alt={record.title}
                style={{ maxWidth: '100%' }}
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="cad-design-changes-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Title level={5} style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
          <ToolOutlined style={{ marginRight: 8 }} /> CAD Design Changes
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
          <Text strong>Filter by Part</Text>
          <Select
            mode="multiple"
            style={{ width: '100%', marginTop: 8 }}
            placeholder="Select Parts"
            onChange={handlePartChange}
            options={partOptions}
            allowClear
          />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={cadChanges}
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

export default CADDesignChanges; 