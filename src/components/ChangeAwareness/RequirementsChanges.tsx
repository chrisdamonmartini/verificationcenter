import React, { useState } from 'react';
import { Table, Card, Typography, Tag, Space, Button, Drawer, Timeline, List, Badge, Collapse, Tooltip, Select, DatePicker, Row, Col } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { 
  FileTextOutlined,
  InfoCircleOutlined, 
  WarningOutlined, 
  CheckCircleOutlined,
  DownOutlined,
  RightOutlined,
  SearchOutlined,
  CalendarOutlined,
  UserOutlined,
  RocketOutlined,
  ApartmentOutlined,
  ToolOutlined,
  TagOutlined,
  BuildOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;
const { Option } = Select;
const { RangePicker } = DatePicker;

interface RequirementChange {
  id: string;
  requirementId: string;
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
    operationalScenarios: number;
    functions: number;
    components: number;
    verificationPlans: number;
  };
  status: 'reviewed' | 'pending' | 'approved' | 'rejected';
  category: 'system' | 'functional' | 'performance' | 'interface' | 'physical' | 'verification';
}

const RequirementsChanges: React.FC = () => {
  const [selectedChange, setSelectedChange] = useState<RequirementChange | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
  
  // Sample data for requirement changes
  const requirementChanges: RequirementChange[] = [
    {
      id: "RC-001",
      requirementId: "REQ-SYS-042",
      title: "Modified Range Requirement",
      description: "Updated the minimum operational range requirement for the system",
      changeType: "modified",
      severity: "critical",
      date: "2023-04-18",
      author: "Dr. Emily Wagner",
      oldValue: "Minimum range of 200km under standard conditions",
      newValue: "Minimum range of 250km under all environmental conditions",
      impactedItems: {
        missions: 3,
        operationalScenarios: 4,
        functions: 6,
        components: 8,
        verificationPlans: 2
      },
      status: "approved",
      category: "system"
    },
    {
      id: "RC-002",
      requirementId: "REQ-FUNC-078",
      title: "Added Target Acquisition Requirement",
      description: "Added new requirement for automatic target acquisition capabilities",
      changeType: "added",
      severity: "major",
      date: "2023-04-14",
      author: "Eng. John Mathews",
      newValue: "System shall automatically acquire targets within 3 seconds of detection",
      impactedItems: {
        missions: 2,
        operationalScenarios: 3,
        functions: 5,
        components: 4,
        verificationPlans: 1
      },
      status: "approved",
      category: "functional"
    },
    {
      id: "RC-003",
      requirementId: "REQ-PERF-031",
      title: "Modified Response Time",
      description: "Decreased the maximum allowable system response time",
      changeType: "modified",
      severity: "critical",
      date: "2023-04-12",
      author: "Dr. Emily Wagner",
      oldValue: "Maximum response time of 500ms",
      newValue: "Maximum response time of 250ms",
      impactedItems: {
        missions: 4,
        operationalScenarios: 5,
        functions: 8,
        components: 12,
        verificationPlans: 3
      },
      status: "pending",
      category: "performance"
    },
    {
      id: "RC-004",
      requirementId: "REQ-INT-015",
      title: "Updated Communication Interface",
      description: "Modified the communication interface specification for external systems",
      changeType: "modified",
      severity: "major",
      date: "2023-04-08",
      author: "Eng. Maria Sanchez",
      oldValue: "Interface shall support standard RS-422 protocol",
      newValue: "Interface shall support both RS-422 and Ethernet protocols",
      impactedItems: {
        missions: 2,
        operationalScenarios: 3,
        functions: 4,
        components: 6,
        verificationPlans: 2
      },
      status: "approved",
      category: "interface"
    },
    {
      id: "RC-005",
      requirementId: "REQ-PHY-056",
      title: "Removed Redundant Cooling System",
      description: "Removed requirement for redundant cooling in non-critical components",
      changeType: "removed",
      severity: "minor",
      date: "2023-04-05",
      author: "Eng. John Mathews",
      oldValue: "Non-critical components shall have N+1 redundant cooling",
      impactedItems: {
        missions: 0,
        operationalScenarios: 1,
        functions: 2,
        components: 5,
        verificationPlans: 1
      },
      status: "approved",
      category: "physical"
    },
    {
      id: "RC-006",
      requirementId: "REQ-VER-023",
      title: "Enhanced Testing Requirements",
      description: "Added requirement for automated regression testing after system updates",
      changeType: "added",
      severity: "major",
      date: "2023-04-02",
      author: "Dr. Emily Wagner",
      newValue: "System shall perform automated regression testing after any software update",
      impactedItems: {
        missions: 0,
        operationalScenarios: 0,
        functions: 3,
        components: 2,
        verificationPlans: 4
      },
      status: "approved",
      category: "verification"
    },
    {
      id: "RC-007",
      requirementId: "REQ-SYS-029",
      title: "Modified Power Consumption",
      description: "Reduced maximum power consumption requirement for portable operation",
      changeType: "modified",
      severity: "major",
      date: "2023-03-29",
      author: "Eng. Maria Sanchez",
      oldValue: "Maximum power consumption of 500W in portable mode",
      newValue: "Maximum power consumption of 350W in portable mode",
      impactedItems: {
        missions: 3,
        operationalScenarios: 4,
        functions: 2,
        components: 9,
        verificationPlans: 2
      },
      status: "pending",
      category: "system"
    }
  ];

  // Define table columns
  const columns: ColumnsType<RequirementChange> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <Text strong>{text}</Text>,
      width: 100
    },
    {
      title: 'Requirement',
      dataIndex: 'requirementId',
      key: 'requirementId',
      render: (text) => <Code>{text}</Code>,
      width: 140
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: 'system' | 'functional' | 'performance' | 'interface' | 'physical' | 'verification') => {
        const categoryMap: Record<string, { icon: React.ReactNode; color: string }> = {
          system: { icon: <BuildOutlined />, color: 'blue' },
          functional: { icon: <ApartmentOutlined />, color: 'purple' },
          performance: { icon: <ThunderboltOutlined />, color: 'cyan' },
          interface: { icon: <ApiOutlined />, color: 'green' },
          physical: { icon: <ToolOutlined />, color: 'orange' },
          verification: { icon: <CheckSquareOutlined />, color: 'magenta' }
        };
        
        return (
          <Tag color={categoryMap[category].color} icon={categoryMap[category].icon}>
            {category.toUpperCase()}
          </Tag>
        );
      },
      width: 120,
      filters: [
        { text: 'System', value: 'system' },
        { text: 'Functional', value: 'functional' },
        { text: 'Performance', value: 'performance' },
        { text: 'Interface', value: 'interface' },
        { text: 'Physical', value: 'physical' },
        { text: 'Verification', value: 'verification' }
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
    }
  ];

  // Function to handle row expansion
  const handleExpand = (expanded: boolean, record: RequirementChange) => {
    if (expanded) {
      setExpandedRowKeys([record.id]);
    } else {
      setExpandedRowKeys([]);
    }
  };

  // Expanded row render function
  const expandedRowRender = (record: RequirementChange) => {
    const { impactedItems } = record;
    
    return (
      <Card 
        title={<Text strong>Impact Analysis</Text>} 
        size="small" 
        className="expanded-row-card"
      >
        <Row gutter={[16, 16]}>
          <Col span={4}>
            <Card className="impact-card">
              <Statistic
                title="Missions"
                value={impactedItems.missions}
                prefix={<RocketOutlined />}
                valueStyle={{ color: impactedItems.missions > 3 ? '#ff4d4f' : '#1890ff' }}
              />
            </Card>
          </Col>
          <Col span={5}>
            <Card className="impact-card">
              <Statistic
                title="Scenarios"
                value={impactedItems.operationalScenarios}
                prefix={<ClockCircleOutlined />}
                valueStyle={{ color: impactedItems.operationalScenarios > 3 ? '#ff4d4f' : '#1890ff' }}
              />
            </Card>
          </Col>
          <Col span={5}>
            <Card className="impact-card">
              <Statistic
                title="Functions"
                value={impactedItems.functions}
                prefix={<ApartmentOutlined />}
                valueStyle={{ color: impactedItems.functions > 5 ? '#ff4d4f' : '#1890ff' }}
              />
            </Card>
          </Col>
          <Col span={5}>
            <Card className="impact-card">
              <Statistic
                title="Components"
                value={impactedItems.components}
                prefix={<ToolOutlined />}
                valueStyle={{ color: impactedItems.components > 5 ? '#ff4d4f' : '#1890ff' }}
              />
            </Card>
          </Col>
          <Col span={5}>
            <Card className="impact-card">
              <Statistic
                title="Verification"
                value={impactedItems.verificationPlans}
                prefix={<CheckSquareOutlined />}
                valueStyle={{ color: impactedItems.verificationPlans > 2 ? '#ff4d4f' : '#1890ff' }}
              />
            </Card>
          </Col>
        </Row>
        
        <Collapse ghost style={{ marginTop: 16 }}>
          <Panel header="View Affected Items" key="1">
            <List
              size="small"
              dataSource={[
                { type: 'Mission', id: 'M-003', title: 'All-Weather Operations' },
                { type: 'Scenario', id: 'OS-105', title: 'High Altitude Reconnaissance' },
                { type: 'Function', id: 'FUNC-112', title: 'Navigation System' },
                { type: 'Component', id: 'COMP-243', title: 'Radar Processor' },
                { type: 'Test Plan', id: 'TP-056', title: 'Environmental Testing' }
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
        title={<Space><FileTextOutlined /> Requirement Change Details</Space>}
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
                selectedChange.category === 'system' ? 'blue' :
                selectedChange.category === 'functional' ? 'purple' :
                selectedChange.category === 'performance' ? 'cyan' :
                selectedChange.category === 'interface' ? 'green' :
                selectedChange.category === 'physical' ? 'orange' : 'magenta'
              }>
                {selectedChange.category.toUpperCase()}
              </Tag>
            </Space>
            <Paragraph style={{ marginTop: 16 }}>{selectedChange.description}</Paragraph>
          </Card>
          
          <Card title="Change Details">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Row>
                <Col span={8}><Text strong>Requirement ID:</Text></Col>
                <Col span={16}><Code>{selectedChange.requirementId}</Code></Col>
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
                <Text strong>Requirement Modified</Text>
                <Paragraph>Change request submitted by {selectedChange.author}</Paragraph>
              </Timeline.Item>
              <Timeline.Item color="blue" label="Immediate Impact">
                <Text strong>Operational Items Updated</Text>
                <Paragraph>{selectedChange.impactedItems.missions} missions and {selectedChange.impactedItems.operationalScenarios} scenarios affected</Paragraph>
              </Timeline.Item>
              <Timeline.Item color="orange" label="Downstream Impact">
                <Text strong>Functions Modified</Text>
                <Paragraph>{selectedChange.impactedItems.functions} functions needed updating</Paragraph>
              </Timeline.Item>
              <Timeline.Item color="red" label="Further Impact">
                <Text strong>Physical Changes Required</Text>
                <Paragraph>{selectedChange.impactedItems.components} components and {selectedChange.impactedItems.verificationPlans} verification plans affected</Paragraph>
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
    <div className="requirements-changes-container">
      <Card 
        title={<Space><FileTextOutlined /> Requirements Changes</Space>}
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
            <Title level={5}>Filter by Requirement Type</Title>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Select requirement types"
              defaultValue={[]}
            >
              <Option value="system">System Requirements</Option>
              <Option value="functional">Functional Requirements</Option>
              <Option value="performance">Performance Requirements</Option>
              <Option value="interface">Interface Requirements</Option>
              <Option value="physical">Physical Requirements</Option>
              <Option value="verification">Verification Requirements</Option>
            </Select>
          </Col>
        </Row>
        
        <Table 
          columns={columns} 
          dataSource={requirementChanges}
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
const ClockCircleOutlined = () => <span style={{ marginRight: 5 }}>⏱</span>;
const ThunderboltOutlined = () => <span style={{ marginRight: 5 }}>⚡</span>;
const ApiOutlined = () => <span style={{ marginRight: 5 }}>🔗</span>;
const CheckSquareOutlined = () => <span style={{ marginRight: 5 }}>✓</span>;
const Statistic = ({ title, value, prefix, valueStyle }: any) => (
  <div>
    <div style={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.45)' }}>{title}</div>
    <div style={{ fontSize: '24px', fontWeight: 'bold', ...valueStyle }}>
      {prefix && <span style={{ marginRight: 5 }}>{prefix}</span>}
      {value}
    </div>
  </div>
);

export default RequirementsChanges; 