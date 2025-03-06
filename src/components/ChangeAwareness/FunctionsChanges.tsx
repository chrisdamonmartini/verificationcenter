import React, { useState } from 'react';
import { Table, Card, Typography, Tag, Space, Button, Drawer, Timeline, List, Badge, Collapse, Tooltip, Select, DatePicker, Row, Col } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { 
  ApartmentOutlined,
  InfoCircleOutlined, 
  WarningOutlined, 
  CheckCircleOutlined,
  DownOutlined,
  RightOutlined,
  SearchOutlined,
  CalendarOutlined,
  UserOutlined,
  FileTextOutlined,
  RocketOutlined,
  NodeIndexOutlined,
  PartitionOutlined,
  ApiOutlined,
  BlockOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;
const { Option } = Select;
const { RangePicker } = DatePicker;

interface FunctionChange {
  id: string;
  functionId: string;
  title: string;
  description: string;
  changeType: 'added' | 'modified' | 'removed';
  severity: 'critical' | 'major' | 'minor';
  date: string;
  author: string;
  oldValue?: string;
  newValue?: string;
  impactedItems: {
    requirements: number;
    components: number;
    interfaces: number;
    tests: number;
  };
  status: 'reviewed' | 'pending' | 'approved' | 'rejected';
  category: 'decomposition' | 'allocation' | 'interface' | 'behavior' | 'performance';
}

const FunctionsChanges: React.FC = () => {
  const [selectedChange, setSelectedChange] = useState<FunctionChange | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

  // Sample data for function changes
  const functionChanges: FunctionChange[] = [
    {
      id: 'FC-001',
      functionId: 'FUNC-101',
      title: 'Updated signal processing algorithm',
      description: 'The signal processing algorithm was updated to improve detection reliability in high-noise environments.',
      changeType: 'modified',
      severity: 'major',
      date: '2025-02-28',
      author: 'Maria Johnson',
      oldValue: 'SNR threshold: 10dB',
      newValue: 'SNR threshold: 7dB',
      impactedItems: {
        requirements: 3,
        components: 2,
        interfaces: 1,
        tests: 4
      },
      status: 'approved',
      category: 'performance'
    },
    {
      id: 'FC-002',
      functionId: 'FUNC-205',
      title: 'Added error recovery function',
      description: 'Added a new function to handle error recovery after communication loss.',
      changeType: 'added',
      severity: 'major',
      date: '2025-02-25',
      author: 'Alex Chen',
      impactedItems: {
        requirements: 2,
        components: 3,
        interfaces: 2,
        tests: 5
      },
      status: 'pending',
      category: 'behavior'
    },
    {
      id: 'FC-003',
      functionId: 'FUNC-118',
      title: 'Reassigned function to different subsystem',
      description: 'Navigation function reassigned from guidance subsystem to flight control subsystem.',
      changeType: 'modified',
      severity: 'critical',
      date: '2025-02-20',
      author: 'Robert Smith',
      oldValue: 'Guidance Subsystem',
      newValue: 'Flight Control Subsystem',
      impactedItems: {
        requirements: 0,
        components: 4,
        interfaces: 6,
        tests: 3
      },
      status: 'reviewed',
      category: 'allocation'
    },
    {
      id: 'FC-004',
      functionId: 'FUNC-322',
      title: 'Removed redundant data validation',
      description: 'Removed redundant data validation that was causing performance bottlenecks.',
      changeType: 'removed',
      severity: 'minor',
      date: '2025-02-18',
      author: 'Sophia Kim',
      oldValue: 'Multiple validation checks',
      newValue: 'Single validation at entry point',
      impactedItems: {
        requirements: 1,
        components: 1,
        interfaces: 0,
        tests: 2
      },
      status: 'approved',
      category: 'behavior'
    },
    {
      id: 'FC-005',
      functionId: 'FUNC-156',
      title: 'Modified interface parameters',
      description: 'Updated interface parameters for the altitude control function.',
      changeType: 'modified',
      severity: 'major',
      date: '2025-02-15',
      author: 'David Wilson',
      oldValue: '3 input parameters',
      newValue: '5 input parameters',
      impactedItems: {
        requirements: 2,
        components: 1,
        interfaces: 3,
        tests: 4
      },
      status: 'approved',
      category: 'interface'
    }
  ];

  const handleViewDetails = (record: FunctionChange) => {
    setSelectedChange(record);
    setDrawerVisible(true);
  };

  const handleExpand = (expanded: boolean, record: FunctionChange) => {
    if (expanded) {
      setExpandedRowKeys([...expandedRowKeys, record.id]);
    } else {
      setExpandedRowKeys(expandedRowKeys.filter(key => key !== record.id));
    }
  };

  const expandedRowRender = (record: FunctionChange) => {
    return (
      <div className="p-4">
        <Paragraph>
          <strong>Detailed Description:</strong> {record.description}
        </Paragraph>
        
        {record.oldValue && record.newValue && (
          <div className="my-3">
            <div className="mb-1"><strong>Changes:</strong></div>
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
                title="Components"
                value={record.impactedItems.components}
                valueStyle={{ color: record.impactedItems.components > 0 ? '#ff4d4f' : '#8c8c8c' }}
              />
            </Card>
            <Card size="small" className="text-center">
              <Statistic
                title="Interfaces"
                value={record.impactedItems.interfaces}
                valueStyle={{ color: record.impactedItems.interfaces > 0 ? '#ff4d4f' : '#8c8c8c' }}
              />
            </Card>
            <Card size="small" className="text-center">
              <Statistic
                title="Tests"
                value={record.impactedItems.tests}
                valueStyle={{ color: record.impactedItems.tests > 0 ? '#ff4d4f' : '#8c8c8c' }}
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
        title={`Function Change Details: ${selectedChange.title}`}
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
            <Tag color="blue">ID: {selectedChange.functionId}</Tag>
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

        {selectedChange.oldValue && selectedChange.newValue && (
          <Card title="Changes" className="mb-4">
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
                title="Components"
                value={selectedChange.impactedItems.components}
                valueStyle={{ color: selectedChange.impactedItems.components > 0 ? '#ff4d4f' : '#8c8c8c' }}
              />
            </Card>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card size="small" className="text-center">
              <Statistic
                title="Interfaces"
                value={selectedChange.impactedItems.interfaces}
                valueStyle={{ color: selectedChange.impactedItems.interfaces > 0 ? '#ff4d4f' : '#8c8c8c' }}
              />
            </Card>
            <Card size="small" className="text-center">
              <Statistic
                title="Tests"
                value={selectedChange.impactedItems.tests}
                valueStyle={{ color: selectedChange.impactedItems.tests > 0 ? '#ff4d4f' : '#8c8c8c' }}
              />
            </Card>
          </div>
        </Card>

        <Card title="Change Timeline" className="mb-4">
          <Timeline mode="left">
            <Timeline.Item 
              color="green" 
              label="2025-02-10"
              dot={<ClockCircleOutlined />}
            >
              Change request submitted
            </Timeline.Item>
            <Timeline.Item 
              color="blue" 
              label="2025-02-15"
            >
              Impact analysis completed
            </Timeline.Item>
            <Timeline.Item 
              color="gold" 
              label="2025-02-18"
            >
              Change review meeting
            </Timeline.Item>
            <Timeline.Item 
              color="red" 
              label="2025-02-20"
            >
              Change implementation
            </Timeline.Item>
            <Timeline.Item 
              color="purple" 
              label="2025-02-25"
            >
              Verification completed
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

  const columns: ColumnsType<FunctionChange> = [
    {
      title: 'Function ID',
      dataIndex: 'functionId',
      key: 'functionId',
      render: (text) => <Code>{text}</Code>,
      width: 140
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: 'decomposition' | 'allocation' | 'interface' | 'behavior' | 'performance') => {
        const categoryIcons = {
          decomposition: <NodeIndexOutlined />,
          allocation: <PartitionOutlined />,
          interface: <ApiOutlined />,
          behavior: <ApartmentOutlined />,
          performance: <BlockOutlined />
        };
        
        const colors = {
          decomposition: 'green',
          allocation: 'blue',
          interface: 'purple',
          behavior: 'cyan',
          performance: 'orange'
        };
        
        return (
          <Tag color={colors[category]} icon={categoryIcons[category]}>
            {category.toUpperCase()}
          </Tag>
        );
      },
      width: 140,
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
      decomposition: <NodeIndexOutlined />,
      allocation: <PartitionOutlined />,
      interface: <ApiOutlined />,
      behavior: <ApartmentOutlined />,
      performance: <BlockOutlined />
    };
    
    const colors: Record<string, string> = {
      decomposition: 'green',
      allocation: 'blue',
      interface: 'purple',
      behavior: 'cyan',
      performance: 'orange'
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
    <div className="functions-changes-container">
      <Card title={<div className="flex items-center"><ApartmentOutlined className="mr-2" /> Function Changes</div>} className="mb-4">
        <Paragraph>
          Track and analyze changes to functional decomposition, allocation and interfaces.
          This view shows all modifications to system functions and their impacts on requirements, components, interfaces, and tests.
        </Paragraph>
      </Card>
      
      <Card className="mb-4">
        <div className="mb-4">
          <Row gutter={24}>
            <Col xs={24} md={8}>
              <Title level={5}>Filter by Date Range</Title>
              <RangePicker style={{ width: '100%' }} />
            </Col>
            <Col xs={24} md={8}>
              <Title level={5}>Filter by Category</Title>
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Select categories"
                defaultValue={['decomposition', 'allocation', 'interface', 'behavior', 'performance']}
              >
                <Option value="decomposition">Decomposition</Option>
                <Option value="allocation">Allocation</Option>
                <Option value="interface">Interface</Option>
                <Option value="behavior">Behavior</Option>
                <Option value="performance">Performance</Option>
              </Select>
            </Col>
            <Col xs={24} md={8}>
              <Title level={5}>Filter by Status</Title>
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Select statuses"
                defaultValue={['pending', 'reviewed', 'approved', 'rejected']}
              >
                <Option value="pending">Pending</Option>
                <Option value="reviewed">Reviewed</Option>
                <Option value="approved">Approved</Option>
                <Option value="rejected">Rejected</Option>
              </Select>
            </Col>
          </Row>
          <Row style={{ marginTop: 16 }}>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary">Apply Filters</Button>
              <Button style={{ marginLeft: 8 }}>Reset</Button>
            </Col>
          </Row>
        </div>
      </Card>
      
      <Table
        columns={columns}
        dataSource={functionChanges}
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

export default FunctionsChanges; 