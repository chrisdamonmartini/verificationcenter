import React, { useState } from 'react';
import { Table, Card, Typography, Tag, Space, Button, Drawer, Timeline, List, Badge, Collapse, Tooltip, Select, DatePicker, Row, Col } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { 
  RocketOutlined, 
  InfoCircleOutlined, 
  WarningOutlined, 
  CheckCircleOutlined,
  DownOutlined,
  RightOutlined,
  SearchOutlined,
  CalendarOutlined,
  UserOutlined,
  FileTextOutlined,
  ApartmentOutlined,
  ToolOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;
const { Option } = Select;
const { RangePicker } = DatePicker;

interface MissionChange {
  id: string;
  objectiveId: string;
  title: string;
  description: string;
  changeType: 'added' | 'modified' | 'removed';
  severity: 'critical' | 'major' | 'minor';
  date: string;
  author: string;
  oldValue?: string;
  newValue?: string;
  impactedItems: {
    operationalScenarios: number;
    requirements: number;
    functions: number;
    components: number;
  };
  status: 'reviewed' | 'pending' | 'approved' | 'rejected';
}

const MissionChanges: React.FC = () => {
  const [selectedChange, setSelectedChange] = useState<MissionChange | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

  // Sample data for mission changes
  const missionChanges: MissionChange[] = [
    {
      id: "MC-001",
      objectiveId: "M-002",
      title: "Extended Mission Range Requirement",
      description: "Extended the required operational range for the mission from 200km to 300km",
      changeType: "modified",
      severity: "critical",
      date: "2023-04-15",
      author: "Col. James Wilson",
      oldValue: "200km",
      newValue: "300km",
      impactedItems: {
        operationalScenarios: 3,
        requirements: 12,
        functions: 5,
        components: 8
      },
      status: "approved"
    },
    {
      id: "MC-002",
      objectiveId: "M-007",
      title: "Added ECM Countermeasures Objective",
      description: "Added new mission objective for electronic countermeasures capability",
      changeType: "added",
      severity: "major",
      date: "2023-04-12",
      author: "Maj. Sarah Chen",
      newValue: "System must provide ECM protection against known threats",
      impactedItems: {
        operationalScenarios: 2,
        requirements: 7,
        functions: 4,
        components: 3
      },
      status: "approved"
    },
    {
      id: "MC-003",
      objectiveId: "M-005",
      title: "Modified Altitude Constraints",
      description: "Changed operational altitude constraints for the mission",
      changeType: "modified",
      severity: "major",
      date: "2023-04-08",
      author: "Lt. Col. Rodriguez",
      oldValue: "15,000-25,000 ft",
      newValue: "10,000-30,000 ft",
      impactedItems: {
        operationalScenarios: 4,
        requirements: 6,
        functions: 3,
        components: 2
      },
      status: "pending"
    },
    {
      id: "MC-004",
      objectiveId: "M-009",
      title: "Removed Secondary Target Objective",
      description: "Removed secondary target acquisition requirement from mission objectives",
      changeType: "removed",
      severity: "minor",
      date: "2023-04-05",
      author: "Col. James Wilson",
      oldValue: "System must identify and track up to 3 secondary targets",
      impactedItems: {
        operationalScenarios: 1,
        requirements: 3,
        functions: 2,
        components: 1
      },
      status: "approved"
    },
    {
      id: "MC-005",
      objectiveId: "M-001",
      title: "Modified Mission Success Criteria",
      description: "Updated the primary mission success criteria with additional verification requirements",
      changeType: "modified",
      severity: "critical",
      date: "2023-04-02",
      author: "Gen. Williams",
      oldValue: "Target neutralization with 90% confidence",
      newValue: "Target neutralization with 95% confidence and mission data recorded",
      impactedItems: {
        operationalScenarios: 5,
        requirements: 15,
        functions: 8,
        components: 6
      },
      status: "approved"
    },
    {
      id: "MC-006",
      objectiveId: "M-010",
      title: "Added Stealth Requirement to Mission",
      description: "Added requirement for reduced radar cross-section during approach phase",
      changeType: "added",
      severity: "critical",
      date: "2023-03-28",
      author: "Lt. Col. Rodriguez",
      newValue: "System must maintain radar cross-section below 0.1m² during approach",
      impactedItems: {
        operationalScenarios: 3,
        requirements: 9,
        functions: 7,
        components: 12
      },
      status: "pending"
    },
    {
      id: "MC-007",
      objectiveId: "M-003",
      title: "Modified Weather Constraints",
      description: "Updated mission weather constraints to include operations in adverse conditions",
      changeType: "modified",
      severity: "major",
      date: "2023-03-25",
      author: "Maj. Sarah Chen",
      oldValue: "VMC conditions only",
      newValue: "IMC conditions with moderate precipitation",
      impactedItems: {
        operationalScenarios: 6,
        requirements: 8,
        functions: 5,
        components: 7
      },
      status: "approved"
    }
  ];

  // Define table columns
  const columns: ColumnsType<MissionChange> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <Text strong>{text}</Text>,
      width: 100
    },
    {
      title: 'Mission Objective',
      dataIndex: 'objectiveId',
      key: 'objectiveId',
      render: (text) => <Code>{text}</Code>,
      width: 150
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
      width: 150
    }
  ];

  // Function to handle row expansion
  const handleExpand = (expanded: boolean, record: MissionChange) => {
    if (expanded) {
      setExpandedRowKeys([record.id]);
    } else {
      setExpandedRowKeys([]);
    }
  };

  // Expanded row render function
  const expandedRowRender = (record: MissionChange) => {
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
                title="Operational Scenarios"
                value={impactedItems.operationalScenarios}
                prefix={<ClockCircleOutlined />}
                valueStyle={{ color: impactedItems.operationalScenarios > 3 ? '#ff4d4f' : '#1890ff' }}
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
                { type: 'Operational Scenario', id: 'OS-105', title: 'High Altitude Reconnaissance' },
                { type: 'Operational Scenario', id: 'OS-107', title: 'Target Acquisition in IMC' },
                { type: 'Requirement', id: 'REQ-M-023', title: 'Mission Range Requirements' },
                { type: 'Requirement', id: 'REQ-P-045', title: 'Fuel Capacity' },
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
        title={<Space><RocketOutlined /> Mission Change Details</Space>}
        placement="right"
        width={600}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <Card>
            <Title level={4}>{selectedChange.title}</Title>
            <Tag color={selectedChange.severity === 'critical' ? 'red' : selectedChange.severity === 'major' ? 'orange' : 'green'}>
              {selectedChange.severity.toUpperCase()}
            </Tag>
            <Tag color={
              selectedChange.changeType === 'added' ? 'green' : 
              selectedChange.changeType === 'removed' ? 'red' : 'orange'
            }>
              {selectedChange.changeType.toUpperCase()}
            </Tag>
            <Paragraph style={{ marginTop: 16 }}>{selectedChange.description}</Paragraph>
          </Card>
          
          <Card title="Change Details">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Row>
                <Col span={8}><Text strong>Mission Objective:</Text></Col>
                <Col span={16}><Code>{selectedChange.objectiveId}</Code></Col>
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
                <Text strong>Mission Objective Modified</Text>
                <Paragraph>Change request submitted by {selectedChange.author}</Paragraph>
              </Timeline.Item>
              <Timeline.Item color="blue" label="Immediate Impact">
                <Text strong>Operational Scenarios Updated</Text>
                <Paragraph>{selectedChange.impactedItems.operationalScenarios} scenarios affected</Paragraph>
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
    <div className="mission-changes-container">
      <Card 
        title={<Space><RocketOutlined /> Mission Changes</Space>}
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
            <Title level={5}>Filter by Mission Objective</Title>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Select mission objectives"
              defaultValue={[]}
            >
              <Option value="M-001">M-001: Primary Mission</Option>
              <Option value="M-002">M-002: Range Requirements</Option>
              <Option value="M-003">M-003: Weather Constraints</Option>
              <Option value="M-005">M-005: Altitude Parameters</Option>
              <Option value="M-007">M-007: ECM Capabilities</Option>
              <Option value="M-009">M-009: Target Acquisition</Option>
              <Option value="M-010">M-010: Stealth Requirements</Option>
            </Select>
          </Col>
        </Row>
        
        <Table 
          columns={columns} 
          dataSource={missionChanges}
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

// Import these from ant design
const PlusCircleOutlined = () => <span style={{ marginRight: 5 }}>+</span>;
const MinusCircleOutlined = () => <span style={{ marginRight: 5 }}>-</span>;
const EditOutlined = () => <span style={{ marginRight: 5 }}>✎</span>;
const ClockCircleOutlined = () => <span style={{ marginRight: 5 }}>⏱</span>;
const Statistic = ({ title, value, prefix, valueStyle }: any) => (
  <div>
    <div style={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.45)' }}>{title}</div>
    <div style={{ fontSize: '24px', fontWeight: 'bold', ...valueStyle }}>
      {prefix && <span style={{ marginRight: 5 }}>{prefix}</span>}
      {value}
    </div>
  </div>
);

export default MissionChanges; 