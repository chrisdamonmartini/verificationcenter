import React, { useState } from 'react';
import { Table, Card, Typography, Tag, Space, Button, Drawer, Timeline, List, Badge, Collapse, Tooltip, Image } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { 
  ToolOutlined,
  InfoCircleOutlined, 
  WarningOutlined, 
  CheckCircleOutlined,
  DownOutlined,
  RightOutlined,
  SearchOutlined,
  CalendarOutlined,
  UserOutlined,
  FileTextOutlined,
  BuildOutlined,
  BgColorsOutlined,
  ColumnWidthOutlined,
  LinkOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

interface CADChange {
  id: string;
  modelId: string;
  title: string;
  description: string;
  changeType: 'added' | 'modified' | 'removed';
  severity: 'critical' | 'major' | 'minor';
  date: string;
  author: string;
  oldValue?: string;
  newValue?: string;
  thumbnailBefore?: string;
  thumbnailAfter?: string;
  impactedItems: {
    requirements: number;
    functions: number;
    components: number;
    assemblies: number;
  };
  status: 'reviewed' | 'pending' | 'approved' | 'rejected';
  category: 'geometry' | 'material' | 'assembly' | 'dimension' | 'tolerance';
}

const CADDesignChanges: React.FC = () => {
  const [selectedChange, setSelectedChange] = useState<CADChange | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

  // Sample data for CAD design changes
  const cadChanges: CADChange[] = [
    {
      id: 'CAD-001',
      modelId: 'MODEL-A452',
      title: 'Modified wing geometry for improved aerodynamics',
      description: 'Adjusted the wing tip design to reduce drag and improve fuel efficiency.',
      changeType: 'modified',
      severity: 'major',
      date: '2025-02-15',
      author: 'Jennifer Smith',
      oldValue: 'Standard wing tip',
      newValue: 'Curved winglet design',
      thumbnailBefore: 'https://placehold.co/300x200/e6f7ff/1890ff?text=Original+Wing',
      thumbnailAfter: 'https://placehold.co/300x200/f6ffed/52c41a?text=Modified+Wing',
      impactedItems: {
        requirements: 2,
        functions: 1,
        components: 4,
        assemblies: 1
      },
      status: 'approved',
      category: 'geometry'
    },
    {
      id: 'CAD-002',
      modelId: 'MODEL-B103',
      title: 'Updated material specification for engine mount',
      description: 'Changed material from aluminum alloy to titanium for improved heat resistance.',
      changeType: 'modified',
      severity: 'critical',
      date: '2025-02-12',
      author: 'David Wong',
      oldValue: 'Aluminum 7075-T6',
      newValue: 'Titanium Ti-6Al-4V',
      impactedItems: {
        requirements: 3,
        functions: 0,
        components: 1,
        assemblies: 2
      },
      status: 'pending',
      category: 'material'
    },
    {
      id: 'CAD-003',
      modelId: 'MODEL-C789',
      title: 'Revised tolerances for control surfaces',
      description: 'Tightened tolerances on control surface joints for improved precision.',
      changeType: 'modified',
      severity: 'minor',
      date: '2025-02-10',
      author: 'Sarah Johnson',
      oldValue: '±0.5mm',
      newValue: '±0.2mm',
      impactedItems: {
        requirements: 1,
        functions: 0,
        components: 3,
        assemblies: 1
      },
      status: 'approved',
      category: 'tolerance'
    },
    {
      id: 'CAD-004',
      modelId: 'MODEL-D241',
      title: 'Added new sensor mounting bracket',
      description: 'Designed new bracket for mounting additional environmental sensors.',
      changeType: 'added',
      severity: 'minor',
      date: '2025-02-08',
      author: 'Michael Brown',
      thumbnailAfter: 'https://placehold.co/300x200/f6ffed/52c41a?text=New+Bracket',
      impactedItems: {
        requirements: 1,
        functions: 2,
        components: 2,
        assemblies: 1
      },
      status: 'approved',
      category: 'assembly'
    },
    {
      id: 'CAD-005',
      modelId: 'MODEL-E567',
      title: 'Removed redundant structural support',
      description: 'Removed unnecessary support structure to reduce weight.',
      changeType: 'removed',
      severity: 'major',
      date: '2025-02-05',
      author: 'Emily Chen',
      thumbnailBefore: 'https://placehold.co/300x200/e6f7ff/1890ff?text=With+Support',
      impactedItems: {
        requirements: 0,
        functions: 0,
        components: 1,
        assemblies: 1
      },
      status: 'reviewed',
      category: 'geometry'
    }
  ];

  const handleViewDetails = (record: CADChange) => {
    setSelectedChange(record);
    setDrawerVisible(true);
  };

  const handleExpand = (expanded: boolean, record: CADChange) => {
    if (expanded) {
      setExpandedRowKeys([...expandedRowKeys, record.id]);
    } else {
      setExpandedRowKeys(expandedRowKeys.filter(key => key !== record.id));
    }
  };

  const expandedRowRender = (record: CADChange) => {
    return (
      <div className="p-4">
        <Paragraph>
          <strong>Detailed Description:</strong> {record.description}
        </Paragraph>
        
        <div className="my-3">
          {(record.thumbnailBefore || record.thumbnailAfter) && (
            <div className="mb-3">
              <div className="mb-1"><strong>Visualization:</strong></div>
              <div className="grid grid-cols-2 gap-4">
                {record.thumbnailBefore && (
                  <div>
                    <div className="mb-1 text-sm text-gray-500">Before:</div>
                    <Image 
                      src={record.thumbnailBefore} 
                      alt="Before change" 
                      width={300}
                      height={200}
                      className="object-cover rounded border border-gray-200"
                    />
                  </div>
                )}
                {record.thumbnailAfter && (
                  <div>
                    <div className="mb-1 text-sm text-gray-500">After:</div>
                    <Image 
                      src={record.thumbnailAfter} 
                      alt="After change" 
                      width={300}
                      height={200}
                      className="object-cover rounded border border-gray-200"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
          
          {record.oldValue && record.newValue && (
            <div className="mb-3">
              <div className="mb-1"><strong>Changed Parameter:</strong></div>
              <div className="grid grid-cols-2 gap-4">
                <Card size="small" title="Before Change" className="bg-gray-50">
                  <div className="text-red-500">
                    <MinusCircleOutlined /> {record.oldValue}
                  </div>
                </Card>
                <Card size="small" title="After Change" className="bg-gray-50">
                  <div className="text-green-500">
                    <PlusCircleOutlined /> {record.newValue}
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
        
        <div className="my-3">
          <div className="mb-1"><strong>Impacted Items:</strong></div>
          <div className="grid grid-cols-4 gap-2">
            <Card size="small" className="text-center">
              <Statistic
                title="Requirements"
                value={record.impactedItems.requirements}
                valueStyle={{ color: record.impactedItems.requirements > 0 ? '#ff4d4f' : '#8c8c8c' }}
              />
            </Card>
            <Card size="small" className="text-center">
              <Statistic
                title="Functions"
                value={record.impactedItems.functions}
                valueStyle={{ color: record.impactedItems.functions > 0 ? '#ff4d4f' : '#8c8c8c' }}
              />
            </Card>
            <Card size="small" className="text-center">
              <Statistic
                title="Components"
                value={record.impactedItems.components}
                valueStyle={{ color: record.impactedItems.components > 0 ? '#ff4d4f' : '#8c8c8c' }}
              />
            </Card>
            <Card size="small" className="text-center">
              <Statistic
                title="Assemblies"
                value={record.impactedItems.assemblies}
                valueStyle={{ color: record.impactedItems.assemblies > 0 ? '#ff4d4f' : '#8c8c8c' }}
              />
            </Card>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <Button type="primary" onClick={() => handleViewDetails(record)}>
            View Full Details
          </Button>
        </div>
      </div>
    );
  };

  const renderDrawer = () => {
    if (!selectedChange) return null;

    return (
      <Drawer
        title={`CAD Design Change Details: ${selectedChange.title}`}
        placement="right"
        width={600}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <Title level={4}>{selectedChange.title}</Title>
            <div className="ml-auto">
              {renderStatusTag(selectedChange.status)}
            </div>
          </div>

          <div className="mb-4">
            <Tag color="blue">ID: {selectedChange.modelId}</Tag>
            <Tag color={getChangeTypeColor(selectedChange.changeType)}>
              {getChangeTypeIcon(selectedChange.changeType)}
              {selectedChange.changeType.toUpperCase()}
            </Tag>
            {renderCategoryTag(selectedChange.category)}
            {renderSeverityTag(selectedChange.severity)}
          </div>

          <div className="mb-4">
            <Text type="secondary" className="flex items-center">
              <CalendarOutlined className="mr-2" /> {selectedChange.date}
            </Text>
            <Text type="secondary" className="flex items-center ml-4">
              <UserOutlined className="mr-2" /> {selectedChange.author}
            </Text>
          </div>
        </div>

        <Card title="Description" className="mb-4">
          <Paragraph>{selectedChange.description}</Paragraph>
        </Card>

        {(selectedChange.thumbnailBefore || selectedChange.thumbnailAfter) && (
          <Card title="Visualization" className="mb-4">
            <div className="grid grid-cols-2 gap-4">
              {selectedChange.thumbnailBefore && (
                <div>
                  <div className="mb-2 font-semibold">Before:</div>
                  <Image 
                    src={selectedChange.thumbnailBefore} 
                    alt="Before change" 
                    width={250}
                    className="object-cover rounded border border-gray-200"
                  />
                </div>
              )}
              {selectedChange.thumbnailAfter && (
                <div>
                  <div className="mb-2 font-semibold">After:</div>
                  <Image 
                    src={selectedChange.thumbnailAfter} 
                    alt="After change" 
                    width={250}
                    className="object-cover rounded border border-gray-200"
                  />
                </div>
              )}
            </div>
          </Card>
        )}

        {selectedChange.oldValue && selectedChange.newValue && (
          <Card title="Parameter Changes" className="mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="mb-2 font-semibold">Before:</div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded text-red-500">
                  <MinusCircleOutlined /> {selectedChange.oldValue}
                </div>
              </div>
              <div>
                <div className="mb-2 font-semibold">After:</div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded text-green-500">
                  <PlusCircleOutlined /> {selectedChange.newValue}
                </div>
              </div>
            </div>
          </Card>
        )}

        <Card title="Impact Analysis" className="mb-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Card size="small" className="text-center">
              <Statistic
                title="Requirements"
                value={selectedChange.impactedItems.requirements}
                valueStyle={{ color: selectedChange.impactedItems.requirements > 0 ? '#ff4d4f' : '#8c8c8c' }}
              />
            </Card>
            <Card size="small" className="text-center">
              <Statistic
                title="Functions"
                value={selectedChange.impactedItems.functions}
                valueStyle={{ color: selectedChange.impactedItems.functions > 0 ? '#ff4d4f' : '#8c8c8c' }}
              />
            </Card>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card size="small" className="text-center">
              <Statistic
                title="Components"
                value={selectedChange.impactedItems.components}
                valueStyle={{ color: selectedChange.impactedItems.components > 0 ? '#ff4d4f' : '#8c8c8c' }}
              />
            </Card>
            <Card size="small" className="text-center">
              <Statistic
                title="Assemblies"
                value={selectedChange.impactedItems.assemblies}
                valueStyle={{ color: selectedChange.impactedItems.assemblies > 0 ? '#ff4d4f' : '#8c8c8c' }}
              />
            </Card>
          </div>
        </Card>

        <Card title="Change Timeline" className="mb-4">
          <Timeline mode="left">
            <Timeline.Item 
              color="green" 
              label="2025-02-01"
              dot={<ClockCircleOutlined />}
            >
              Design change request submitted
            </Timeline.Item>
            <Timeline.Item 
              color="blue" 
              label="2025-02-03"
            >
              CAD model updated
            </Timeline.Item>
            <Timeline.Item 
              color="gold" 
              label="2025-02-05"
            >
              Engineering review
            </Timeline.Item>
            <Timeline.Item 
              color="red" 
              label="2025-02-08"
            >
              FEA analysis completed
            </Timeline.Item>
            <Timeline.Item 
              color="purple" 
              label="2025-02-10"
            >
              Design approved
            </Timeline.Item>
          </Timeline>
        </Card>

        <div className="flex justify-end mt-6">
          <Space>
            <Button>Reject</Button>
            <Button type="primary">Approve</Button>
          </Space>
        </div>
      </Drawer>
    );
  };

  const columns: ColumnsType<CADChange> = [
    {
      title: 'Model ID',
      dataIndex: 'modelId',
      key: 'modelId',
      render: (text) => <Code>{text}</Code>,
      width: 140
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: 'geometry' | 'material' | 'assembly' | 'dimension' | 'tolerance') => {
        const categoryIcons: Record<string, React.ReactNode> = {
          geometry: <ColumnWidthOutlined />,
          material: <BgColorsOutlined />,
          assembly: <LinkOutlined />,
          dimension: <ColumnWidthOutlined />,
          tolerance: <BuildOutlined />
        };
        
        const colors: Record<string, string> = {
          geometry: 'green',
          material: 'orange',
          assembly: 'blue',
          dimension: 'purple',
          tolerance: 'cyan'
        };
        
        return (
          <Tag color={colors[category]} icon={categoryIcons[category]}>
            {category.toUpperCase()}
          </Tag>
        );
      },
      width: 140,
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
          <div>{text}</div>
          <div className="text-xs text-gray-500">
            <CalendarOutlined className="mr-1" /> {record.date}
          </div>
        </div>
      )
    },
    {
      title: 'Change Type',
      dataIndex: 'changeType',
      key: 'changeType',
      render: (type) => {
        return (
          <Tag color={getChangeTypeColor(type)} icon={getChangeTypeIcon(type)}>
            {type.toUpperCase()}
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
      render: (severity) => renderSeverityTag(severity),
      width: 120,
      filters: [
        { text: 'Critical', value: 'critical' },
        { text: 'Major', value: 'major' },
        { text: 'Minor', value: 'minor' }
      ],
      onFilter: (value, record) => record.severity === value
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => renderStatusTag(status),
      width: 120,
      filters: [
        { text: 'Pending', value: 'pending' },
        { text: 'Reviewed', value: 'reviewed' },
        { text: 'Approved', value: 'approved' },
        { text: 'Rejected', value: 'rejected' }
      ],
      onFilter: (value, record) => record.status === value
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button type="link" onClick={() => handleViewDetails(record)}>
          Details
        </Button>
      ),
      width: 100
    }
  ];

  const renderStatusTag = (status: string) => {
    let color = '';
    let icon = null;
    
    switch (status) {
      case 'pending':
        color = 'gold';
        icon = <ClockCircleOutlined />;
        break;
      case 'reviewed':
        color = 'blue';
        icon = <InfoCircleOutlined />;
        break;
      case 'approved':
        color = 'green';
        icon = <CheckCircleOutlined />;
        break;
      case 'rejected':
        color = 'red';
        icon = <WarningOutlined />;
        break;
    }
    
    return (
      <Tag color={color} icon={icon}>
        {status.toUpperCase()}
      </Tag>
    );
  };

  const renderSeverityTag = (severity: string) => {
    let color = '';
    let icon = null;
    
    switch (severity) {
      case 'critical':
        color = 'red';
        icon = <WarningOutlined />;
        break;
      case 'major':
        color = 'orange';
        icon = <InfoCircleOutlined />;
        break;
      case 'minor':
        color = 'green';
        icon = <InfoCircleOutlined />;
        break;
    }
    
    return (
      <Tag color={color} icon={icon}>
        {severity.toUpperCase()}
      </Tag>
    );
  };

  const renderCategoryTag = (category: string) => {
    const categoryIcons: Record<string, React.ReactNode> = {
      geometry: <ColumnWidthOutlined />,
      material: <BgColorsOutlined />,
      assembly: <LinkOutlined />,
      dimension: <ColumnWidthOutlined />,
      tolerance: <BuildOutlined />
    };
    
    const colors: Record<string, string> = {
      geometry: 'green',
      material: 'orange',
      assembly: 'blue',
      dimension: 'purple',
      tolerance: 'cyan'
    };
    
    return (
      <Tag color={colors[category]} icon={categoryIcons[category]}>
        {category.toUpperCase()}
      </Tag>
    );
  };

  const getChangeTypeColor = (type: string) => {
    switch (type) {
      case 'added':
        return 'green';
      case 'modified':
        return 'blue';
      case 'removed':
        return 'red';
      default:
        return 'default';
    }
  };

  const getChangeTypeIcon = (type: string) => {
    switch (type) {
      case 'added':
        return <PlusCircleOutlined />;
      case 'modified':
        return <EditOutlined />;
      case 'removed':
        return <MinusCircleOutlined />;
      default:
        return null;
    }
  };

  return (
    <div className="cad-design-changes-container">
      <Card title={<div className="flex items-center"><ToolOutlined className="mr-2" /> CAD Design Changes</div>} className="mb-4">
        <Paragraph>
          Track and analyze changes to CAD models and design parameters. 
          This view shows all modifications to geometry, materials, assemblies, dimensions, and tolerances.
        </Paragraph>
      </Card>
      
      <Table
        columns={columns}
        dataSource={cadChanges}
        rowKey="id"
        expandable={{
          expandedRowRender,
          expandedRowKeys,
          onExpand: handleExpand,
          expandIcon: ({ expanded, onExpand, record }) =>
            expanded ? (
              <DownOutlined onClick={e => onExpand(record, e)} />
            ) : (
              <RightOutlined onClick={e => onExpand(record, e)} />
            )
        }}
      />
      
      {renderDrawer()}
    </div>
  );
};

// Utility components
const Code = ({ children }: { children: React.ReactNode }) => (
  <span className="px-2 py-1 bg-gray-100 rounded font-mono text-sm">{children}</span>
);

// Simple icon components
const PlusCircleOutlined = () => <span style={{ marginRight: 5 }}>+</span>;
const MinusCircleOutlined = () => <span style={{ marginRight: 5 }}>-</span>;
const EditOutlined = () => <span style={{ marginRight: 5 }}>✎</span>;

// Simple Statistic component
const Statistic = ({ title, value, valueStyle }: any) => (
  <div>
    <div className="text-xs text-gray-500">{title}</div>
    <div className="text-xl font-bold" style={valueStyle}>{value}</div>
  </div>
);

export default CADDesignChanges; 