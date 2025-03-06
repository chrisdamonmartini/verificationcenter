import React, { useState } from 'react';
import { Table, Card, Typography, Tag, Space, Button, Drawer, Timeline, List, Badge, Collapse, Tooltip, Select, DatePicker, Row, Col } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { 
  ClockCircleOutlined,
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
  ApartmentOutlined,
  EnvironmentOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;
const { Option } = Select;
const { RangePicker } = DatePicker;

interface ScenarioChange {
  id: string;
  scenarioId: string;
  title: string;
  description: string;
  changeType: 'added' | 'modified' | 'removed';
  severity: 'critical' | 'major' | 'minor';
  date: string;
  author: string;
  oldValue?: string;
  newValue?: string;
  impactedItems: {
    missions: number;
    requirements: number;
    functions: number;
    components: number;
  };
  status: 'reviewed' | 'pending' | 'approved' | 'rejected';
  category: 'environmental' | 'operational' | 'safety' | 'performance' | 'logistics';
}

const OperationalScenarios: React.FC = () => {
  const [selectedChange, setSelectedChange] = useState<ScenarioChange | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
  
  // Sample data for operational scenario changes
  const scenarioChanges: ScenarioChange[] = [
    {
      id: "SC-001",
      scenarioId: "OS-105",
      title: "Updated Environmental Conditions",
      description: "Modified the environmental conditions for high-altitude reconnaissance missions",
      changeType: "modified",
      severity: "major",
      date: "2023-04-16",
      author: "Maj. Sarah Chen",
      oldValue: "Clear weather, daylight operations",
      newValue: "All-weather capability, day and night operations",
      impactedItems: {
        missions: 2,
        requirements: 8,
        functions: 5,
        components: 4
      },
      status: "approved",
      category: "environmental"
    },
    {
      id: "SC-002",
      scenarioId: "OS-107",
      title: "Added Threat Environment",
      description: "Added new electronic warfare threat scenario for mission planning",
      changeType: "added",
      severity: "critical",
      date: "2023-04-12",
      author: "Col. James Wilson",
      newValue: "ECM and ECCM threat environment with hostile radar coverage",
      impactedItems: {
        missions: 4,
        requirements: 12,
        functions: 8,
        components: 7
      },
      status: "pending",
      category: "operational"
    },
    {
      id: "SC-003",
      scenarioId: "OS-110",
      title: "Modified Operating Duration",
      description: "Extended the required operational duration for extended surveillance missions",
      changeType: "modified",
      severity: "major",
      date: "2023-04-09",
      author: "Lt. Col. Rodriguez",
      oldValue: "8 hours mission duration",
      newValue: "12 hours mission duration",
      impactedItems: {
        missions: 3,
        requirements: 5,
        functions: 4,
        components: 6
      },
      status: "approved",
      category: "performance"
    },
    {
      id: "SC-004",
      scenarioId: "OS-112",
      title: "Removed Secondary Target Scenario",
      description: "Removed the requirement for multi-target tracking in urban environments",
      changeType: "removed",
      severity: "minor",
      date: "2023-04-05",
      author: "Col. James Wilson",
      oldValue: "Track up to 5 secondary targets in urban environment",
      impactedItems: {
        missions: 1,
        requirements: 3,
        functions: 2,
        components: 2
      },
      status: "approved",
      category: "operational"
    },
    {
      id: "SC-005",
      scenarioId: "OS-103",
      title: "Added Safety Critical Scenario",
      description: "Added new scenario for emergency procedures during system failure",
      changeType: "added",
      severity: "critical",
      date: "2023-04-02",
      author: "Lt. Col. Rodriguez",
      newValue: "Emergency procedures for critical system failure over populated areas",
      impactedItems: {
        missions: 5,
        requirements: 14,
        functions: 10,
        components: 8
      },
      status: "approved",
      category: "safety"
    },
    {
      id: "SC-006",
      scenarioId: "OS-108",
      title: "Modified Terrain Profile",
      description: "Updated the terrain profile for low-altitude operations",
      changeType: "modified",
      severity: "major",
      date: "2023-03-29",
      author: "Maj. Sarah Chen",
      oldValue: "Flat and moderate terrain",
      newValue: "Complex terrain with urban and mountainous features",
      impactedItems: {
        missions: 3,
        requirements: 7,
        functions: 6,
        components: 5
      },
      status: "pending",
      category: "environmental"
    },
    {
      id: "SC-007",
      scenarioId: "OS-115",
      title: "Added Logistics Scenario",
      description: "Added new scenario for rapid deployment and field maintenance",
      changeType: "added",
      severity: "minor",
      date: "2023-03-25",
      author: "Col. James Wilson",
      newValue: "Deployment and field maintenance with minimal support equipment",
      impactedItems: {
        missions: 2,
        requirements: 6,
        functions: 3,
        components: 9
      },
      status: "approved",
      category: "logistics"
    }
  ];

  // Define table columns
  const columns: ColumnsType<ScenarioChange> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <Text strong>{text}</Text>,
      width: 100
    },
    {
      title: 'Scenario',
      dataIndex: 'scenarioId',
      key: 'scenarioId',
      render: (text) => <Code>{text}</Code>,
      width: 120
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => {
        const categoryIcons = {
          environmental: <EnvironmentOutlined />,
          operational: <ClockCircleOutlined />,
          safety: <WarningOutlined />,
          performance: <ThunderboltOutlined />,
          logistics: <ToolOutlined />
        };
        
        const colors = {
          environmental: 'green',
          operational: 'blue',
          safety: 'red',
          performance: 'purple',
          logistics: 'orange'
        };
        
        return (
          <Tag color={colors[category]} icon={categoryIcons[category]}>
            {category.toUpperCase()}
          </Tag>
        );
      },
      width: 140,
      filters: [
        { text: 'Environmental', value: 'environmental' },
        { text: 'Operational', value: 'operational' },
        { text: 'Safety', value: 'safety' },
        { text: 'Performance', value: 'performance' },
        { text: 'Logistics', value: 'logistics' }
      ],
      onFilter: (value, record) => record.category === value
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Space>
          <Text>{text}</Text>
          <Tooltip title="View details">
            <Button 
              type="link" 
              icon={<InfoCircleOutlined />} 
              onClick={(e) => {
                e.stopPropagation();
                setSelectedChange(record);
                setDrawerVisible(true);
              }}
              size="small"
            />
          </Tooltip>
        </Space>
      )
    },
    {
      title: 'Type',
      dataIndex: 'changeType',
      key: 'changeType',
      render: (type) => {
        let color = 'blue';
        let icon = null;
        
        if (type === 'added') {
          color = 'green';
          icon = <PlusCircleOutlined />;
        } else if (type === 'removed') {
          color = 'red';
          icon = <MinusCircleOutlined />;
        } else if (type === 'modified') {
          color = 'orange';
          icon = <EditOutlined />;
        }
        
        return (
          <Tag color={color} icon={icon}>
            {type.toUpperCase()}
          </Tag>
        );
      },
      width: 120,
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
        const color = severity === 'critical' ? 'red' : severity === 'major' ? 'orange' : 'green';
        const icon = severity === 'critical' ? <WarningOutlined /> : 
                    severity === 'major' ? <InfoCircleOutlined /> : 
                    <CheckCircleOutlined />;
        
        return (
          <Tag color={color} icon={icon}>
            {severity.toUpperCase()}
          </Tag>
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
      render: (date) => (
        <Space>
          <CalendarOutlined />
          <span>{date}</span>
        </Space>
      ),
      sorter: (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      defaultSortOrder: 'descend',
      width: 130
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'default';
        
        if (status === 'approved') color = 'success';
        if (status === 'pending') color = 'processing';
        if (status === 'rejected') color = 'error';
        if (status === 'reviewed') color = 'warning';
        
        return <Badge status={color as any} text={status.charAt(0).toUpperCase() + status.slice(1)} />;
      },
      width: 120,
      filters: [
        { text: 'Approved', value: 'approved' },
        { text: 'Pending', value: 'pending' },
        { text: 'Rejected', value: 'rejected' },
        { text: 'Reviewed', value: 'reviewed' }
      ],
      onFilter: (value, record) => record.status === value
    },
    {
      title: 'Impact',
      key: 'impact',
      render: (_, record) => {
        const total = Object.values(record.impactedItems).reduce((sum, val) => sum + val, 0);
        
        return (
          <Tooltip title="Click to see impact details">
            <Tag color={total > 10 ? 'red' : total > 5 ? 'orange' : 'green'}>
              {total} affected items
            </Tag>
          </Tooltip>
        );
      },
      width: 120
    }
  ];

  // Function to handle row expansion
  const handleExpand = (expanded: boolean, record: ScenarioChange) => {
    if (expanded) {
      setExpandedRowKeys([record.id]);
    } else {
      setExpandedRowKeys([]);
    }
  };

  // Expanded row render function
  const expandedRowRender = (record: ScenarioChange) => {
    const { impactedItems } = record;
    
    return (
      <Card 
        title={<Text strong>Impact Analysis</Text>} 
        size="small" 
        className="expanded-row-card"
      >
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Card className="impact-card">
              <Statistic
                title="Missions"
                value={impactedItems.missions}
                prefix={<RocketOutlined />}
                valueStyle={{ color: impactedItems.missions > 3 ? '#ff4d4f' : '#1890ff' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card className="impact-card">
              <Statistic
                title="Requirements"
                value={impactedItems.requirements}
                prefix={<FileTextOutlined />}
                valueStyle={{ color: impactedItems.requirements > 10 ? '#ff4d4f' : '#1890ff' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card className="impact-card">
              <Statistic
                title="Functions"
                value={impactedItems.functions}
                prefix={<ApartmentOutlined />}
                valueStyle={{ color: impactedItems.functions > 5 ? '#ff4d4f' : '#1890ff' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card className="impact-card">
              <Statistic
                title="Components"
                value={impactedItems.components}
                prefix={<ToolOutlined />}
                valueStyle={{ color: impactedItems.components > 5 ? '#ff4d4f' : '#1890ff' }}
              />
            </Card>
          </Col>
        </Row>
        
        <Collapse ghost style={{ marginTop: 16 }}>
          <Panel header="View Affected Items" key="1">
            <List
              size="small"
              dataSource={[
                { type: 'Mission', id: 'M-002', title: 'Extended Range Operations' },
                { type: 'Mission', id: 'M-007', title: 'Electronic Warfare Support' },
                { type: 'Requirement', id: 'REQ-E-023', title: 'Environmental Operation Requirements' },
                { type: 'Requirement', id: 'REQ-P-045', title: 'Performance in Adverse Conditions' },
                { type: 'Function', id: 'FUNC-112', title: 'Navigation System' }
              ]}
              renderItem={item => (
                <List.Item>
                  <Space>
                    <Tag>{item.type}</Tag>
                    <Code>{item.id}</Code>
                    <Text>{item.title}</Text>
                  </Space>
                </List.Item>
              )}
            />
            <div style={{ textAlign: 'center', marginTop: 8 }}>
              <Button type="link">View All Affected Items</Button>
            </div>
          </Panel>
        </Collapse>
      </Card>
    );
  };

  // Render the details drawer
  const renderDrawer = () => {
    if (!selectedChange) return null;
    
    return (
      <Drawer
        title={<Space><ClockCircleOutlined /> Operational Scenario Change Details</Space>}
        placement="right"
        width={600}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <Card>
            <Title level={4}>{selectedChange.title}</Title>
            <Space>
              <Tag color={selectedChange.severity === 'critical' ? 'red' : selectedChange.severity === 'major' ? 'orange' : 'green'}>
                {selectedChange.severity.toUpperCase()}
              </Tag>
              <Tag color={
                selectedChange.changeType === 'added' ? 'green' : 
                selectedChange.changeType === 'removed' ? 'red' : 'orange'
              }>
                {selectedChange.changeType.toUpperCase()}
              </Tag>
              
              {/* Category tag */}
              <Tag color={
                selectedChange.category === 'environmental' ? 'green' :
                selectedChange.category === 'operational' ? 'blue' :
                selectedChange.category === 'safety' ? 'red' :
                selectedChange.category === 'performance' ? 'purple' : 'orange'
              }>
                {selectedChange.category.toUpperCase()}
              </Tag>
            </Space>
            <Paragraph style={{ marginTop: 16 }}>{selectedChange.description}</Paragraph>
          </Card>
          
          <Card title="Change Details">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Row>
                <Col span={8}><Text strong>Scenario ID:</Text></Col>
                <Col span={16}><Code>{selectedChange.scenarioId}</Code></Col>
              </Row>
              <Row>
                <Col span={8}><Text strong>Change ID:</Text></Col>
                <Col span={16}><Code>{selectedChange.id}</Code></Col>
              </Row>
              <Row>
                <Col span={8}><Text strong>Date:</Text></Col>
                <Col span={16}>{selectedChange.date}</Col>
              </Row>
              <Row>
                <Col span={8}><Text strong>Author:</Text></Col>
                <Col span={16}><Space><UserOutlined /> {selectedChange.author}</Space></Col>
              </Row>
              <Row>
                <Col span={8}><Text strong>Status:</Text></Col>
                <Col span={16}>
                  <Badge 
                    status={
                      selectedChange.status === 'approved' ? 'success' : 
                      selectedChange.status === 'pending' ? 'processing' : 
                      selectedChange.status === 'rejected' ? 'error' : 'warning'
                    } 
                    text={selectedChange.status.charAt(0).toUpperCase() + selectedChange.status.slice(1)} 
                  />
                </Col>
              </Row>
              
              {selectedChange.oldValue && (
                <Row>
                  <Col span={8}><Text strong>Previous Value:</Text></Col>
                  <Col span={16}>
                    <Text delete type="secondary">{selectedChange.oldValue}</Text>
                  </Col>
                </Row>
              )}
              
              {selectedChange.newValue && (
                <Row>
                  <Col span={8}><Text strong>New Value:</Text></Col>
                  <Col span={16}>
                    <Text mark>{selectedChange.newValue}</Text>
                  </Col>
                </Row>
              )}
            </Space>
          </Card>
          
          <Card title="Impact Timeline">
            <Timeline mode="left">
              <Timeline.Item color="green" label="Initial Change">
                <Text strong>Operational Scenario Modified</Text>
                <Paragraph>Change request submitted by {selectedChange.author}</Paragraph>
              </Timeline.Item>
              <Timeline.Item color="blue" label="Immediate Impact">
                <Text strong>Mission Parameters Updated</Text>
                <Paragraph>{selectedChange.impactedItems.missions} missions affected</Paragraph>
              </Timeline.Item>
              <Timeline.Item color="orange" label="Downstream Impact">
                <Text strong>Requirements Modified</Text>
                <Paragraph>{selectedChange.impactedItems.requirements} requirements needed updating</Paragraph>
              </Timeline.Item>
              <Timeline.Item color="red" label="Further Impact">
                <Text strong>Functional Changes Required</Text>
                <Paragraph>{selectedChange.impactedItems.functions} functions and {selectedChange.impactedItems.components} components affected</Paragraph>
              </Timeline.Item>
            </Timeline>
          </Card>
          
          <div style={{ textAlign: 'right' }}>
            <Space>
              <Button onClick={() => setDrawerVisible(false)}>Close</Button>
              <Button type="primary">Generate Impact Report</Button>
            </Space>
          </div>
        </Space>
      </Drawer>
    );
  };

  return (
    <div className="operational-scenarios-container">
      <Card 
        title={<Space><ClockCircleOutlined /> Operational Scenario Changes</Space>}
        extra={
          <Space>
            <Button icon={<SearchOutlined />}>Advanced Search</Button>
            <Button type="primary" icon={<InfoCircleOutlined />}>Impact Report</Button>
          </Space>
        }
      >
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col span={12}>
            <Title level={5}>Filter by Date Range</Title>
            <RangePicker style={{ width: '100%' }} />
          </Col>
          <Col span={12}>
            <Title level={5}>Filter by Scenario</Title>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Select operational scenarios"
              defaultValue={[]}
            >
              <Option value="OS-103">OS-103: Emergency Procedures</Option>
              <Option value="OS-105">OS-105: High-Altitude Reconnaissance</Option>
              <Option value="OS-107">OS-107: Electronic Warfare</Option>
              <Option value="OS-108">OS-108: Low-Altitude Operations</Option>
              <Option value="OS-110">OS-110: Extended Surveillance</Option>
              <Option value="OS-112">OS-112: Urban Environment Operations</Option>
              <Option value="OS-115">OS-115: Rapid Deployment</Option>
            </Select>
          </Col>
        </Row>
        
        <Table 
          columns={columns} 
          dataSource={scenarioChanges}
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
          pagination={{ pageSize: 5 }}
        />
      </Card>
      
      {renderDrawer()}
    </div>
  );
};

// Helper components
const Code = ({ children }: { children: React.ReactNode }) => (
  <span 
    style={{ 
      fontFamily: 'monospace',
      backgroundColor: 'rgba(0, 0, 0, 0.06)',
      padding: '2px 4px',
      borderRadius: '3px'
    }}
  >
    {children}
  </span>
);

// Import these from ant design or define simple replacements
const PlusCircleOutlined = () => <span style={{ marginRight: 5 }}>+</span>;
const MinusCircleOutlined = () => <span style={{ marginRight: 5 }}>-</span>;
const EditOutlined = () => <span style={{ marginRight: 5 }}>✎</span>;
const ToolOutlined = () => <span style={{ marginRight: 5 }}>🔧</span>;
const Statistic = ({ title, value, prefix, valueStyle }: any) => (
  <div>
    <div style={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.45)' }}>{title}</div>
    <div style={{ fontSize: '24px', fontWeight: 'bold', ...valueStyle }}>
      {prefix && <span style={{ marginRight: 5 }}>{prefix}</span>}
      {value}
    </div>
  </div>
);

export default OperationalScenarios; 