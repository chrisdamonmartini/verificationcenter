import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Table, 
  Tag, 
  Button, 
  Input, 
  Tabs, 
  Select, 
  Badge, 
  Progress,
  DatePicker,
  Alert,
  Tooltip,
  Space,
  Timeline,
  List,
  Divider
} from 'antd';
import { 
  WarningOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  SearchOutlined,
  BellOutlined,
  RightOutlined,
  FileSearchOutlined,
  SettingOutlined,
  LineChartOutlined,
  PieChartOutlined
} from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { mockProcessRequests, Process107Request } from '../../mockData/process107Data';

const { TabPane } = Tabs;
const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const Process107Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [filteredRequests, setFilteredRequests] = useState(mockProcessRequests);
  const [searchText, setSearchText] = useState('');
  const [requestFilter, setRequestFilter] = useState('all');
  const [urgencyFilter, setUrgencyFilter] = useState('all');

  // Calculate summary metrics
  const totalRequests = mockProcessRequests.length;
  const activeRequests = mockProcessRequests.filter((req: Process107Request) => req.status !== 'Closed').length;
  const emergencyRequests = mockProcessRequests.filter((req: Process107Request) => req.urgency === 'Emergency').length;
  const tarRequests = mockProcessRequests.filter((req: Process107Request) => req.type === 'TAR').length;
  const marRequests = mockProcessRequests.filter((req: Process107Request) => req.type === 'MAR').length;

  // Response time calculations
  const avgResponseTime = Math.round(
    mockProcessRequests.reduce((sum: number, req: Process107Request) => {
      return sum + (req.responseTime || 0);
    }, 0) / mockProcessRequests.length
  );

  // Filter handler
  const handleFilter = () => {
    let filtered = [...mockProcessRequests];
    
    if (searchText) {
      filtered = filtered.filter(req => 
        req.id.toLowerCase().includes(searchText.toLowerCase()) ||
        req.asset.toLowerCase().includes(searchText.toLowerCase()) ||
        req.assignedTo.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    if (requestFilter !== 'all') {
      filtered = filtered.filter(req => req.type === requestFilter);
    }
    
    if (urgencyFilter !== 'all') {
      filtered = filtered.filter(req => req.urgency === urgencyFilter);
    }
    
    setFilteredRequests(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchText('');
    setRequestFilter('all');
    setUrgencyFilter('all');
    setFilteredRequests(mockProcessRequests);
  };

  // Chart data for Request Types
  const requestTypeData = [
    { name: 'TAR', value: tarRequests },
    { name: 'MAR', value: marRequests },
  ];

  // Chart data for Urgency Levels
  const urgencyData = [
    { name: 'Emergency', value: mockProcessRequests.filter((r: Process107Request) => r.urgency === 'Emergency').length },
    { name: 'Immediate', value: mockProcessRequests.filter((r: Process107Request) => r.urgency === 'Immediate').length },
    { name: 'Urgent', value: mockProcessRequests.filter((r: Process107Request) => r.urgency === 'Urgent').length },
    { name: 'Routine', value: mockProcessRequests.filter((r: Process107Request) => r.urgency === 'Routine').length },
  ];

  // Chart data for Status Breakdown
  const statusData = [
    { name: 'Field Submission', value: mockProcessRequests.filter((r: Process107Request) => r.stage === 'Field Submission').length },
    { name: 'SM Review', value: mockProcessRequests.filter((r: Process107Request) => r.stage === 'SM Review').length },
    { name: 'Engineering', value: mockProcessRequests.filter((r: Process107Request) => r.stage === 'Engineering').length },
    { name: 'SOR Engagement', value: mockProcessRequests.filter((r: Process107Request) => r.stage === 'SOR Engagement').length },
    { name: 'Closure', value: mockProcessRequests.filter((r: Process107Request) => r.stage === 'Closure').length },
  ];

  // Time trend data
  const trendData = [
    { month: 'Jan', requests: 12 },
    { month: 'Feb', requests: 19 },
    { month: 'Mar', requests: 15 },
    { month: 'Apr', requests: 21 },
    { month: 'May', requests: 18 },
    { month: 'Jun', requests: 24 },
  ];

  // Response time data
  const responseTimeData = [
    { category: 'Emergency', actual: 2.1, target: 1 },
    { category: 'Immediate', actual: 4.8, target: 4 },
    { category: 'Urgent', actual: 9.2, target: 8 },
    { category: 'Routine', actual: 14.5, target: 15 },
  ];

  // COLORS for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  const STATUS_COLORS: Record<string, string> = {
    'Pending': 'orange',
    'In-Review': 'blue',
    'Approved': 'cyan',
    'In-Progress': 'purple',
    'Closed': 'green',
  };

  // Table columns
  const columns = [
    {
      title: 'Request ID',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={type === 'TAR' ? 'blue' : 'green'}>{type}</Tag>
      ),
    },
    {
      title: 'Asset',
      dataIndex: 'asset',
      key: 'asset',
    },
    {
      title: 'Urgency',
      dataIndex: 'urgency',
      key: 'urgency',
      render: (urgency: string) => {
        let color = 'green';
        if (urgency === 'Emergency') color = 'red';
        else if (urgency === 'Immediate') color = 'orange';
        else if (urgency === 'Urgent') color = 'gold';
        
        return <Tag color={color}>{urgency}</Tag>;
      },
    },
    {
      title: 'Submitted',
      dataIndex: 'submittedDate',
      key: 'submittedDate',
    },
    {
      title: 'Current Stage',
      dataIndex: 'stage',
      key: 'stage',
      render: (stage: string) => (
        <Space>
          <Badge status={getBadgeStatus(stage)} text={stage} />
        </Space>
      ),
    },
    {
      title: 'Assigned To',
      dataIndex: 'assignedTo',
      key: 'assignedTo',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={STATUS_COLORS[status] || 'default'}>{status}</Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space size="small">
          <Button type="primary" size="small">View</Button>
          <Button size="small">Update</Button>
        </Space>
      ),
    },
  ];

  // Helper function to get badge status
  function getBadgeStatus(stage: string) {
    switch(stage) {
      case 'Field Submission': return 'processing';
      case 'SM Review': return 'warning';
      case 'Engineering': return 'error';
      case 'SOR Engagement': return 'default';
      case 'Closure': return 'success';
      default: return 'default';
    }
  }

  return (
    <div className="process-107-dashboard">
      <h1><FileSearchOutlined /> 107 Process Dashboard</h1>
      
      <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)}>
        <TabPane tab="Overview" key="overview">
          {/* Summary Cards */}
          <Row gutter={16} style={{ marginBottom: '24px' }}>
            <Col span={4}>
              <Card>
                <Statistic
                  title="Total Active Requests"
                  value={activeRequests}
                  prefix={<FileSearchOutlined />}
                  valueStyle={{ color: '#3f8600' }}
                />
              </Card>
            </Col>
            <Col span={4}>
              <Card>
                <Statistic
                  title="TAR Requests"
                  value={tarRequests}
                  valueStyle={{ color: '#0088FE' }}
                />
              </Card>
            </Col>
            <Col span={4}>
              <Card>
                <Statistic
                  title="MAR Requests"
                  value={marRequests}
                  valueStyle={{ color: '#00C49F' }}
                />
              </Card>
            </Col>
            <Col span={4}>
              <Card>
                <Statistic
                  title="Emergency Requests"
                  value={emergencyRequests}
                  valueStyle={{ color: '#cf1322' }}
                  prefix={<WarningOutlined />}
                />
              </Card>
            </Col>
            <Col span={4}>
              <Card>
                <Statistic
                  title="Avg Response (hrs)"
                  value={avgResponseTime}
                  prefix={<ClockCircleOutlined />}
                  valueStyle={{ color: avgResponseTime <= 8 ? '#3f8600' : '#cf1322' }}
                />
              </Card>
            </Col>
            <Col span={4}>
              <Card>
                <Statistic
                  title="Completion Rate"
                  value={Math.round((mockProcessRequests.filter((r: Process107Request) => r.status === 'Closed').length / totalRequests) * 100)}
                  suffix="%"
                  prefix={<CheckCircleOutlined />}
                  valueStyle={{ color: '#3f8600' }}
                />
              </Card>
            </Col>
          </Row>

          {/* Process Flow Visualization */}
          <Row gutter={16} style={{ marginBottom: '24px' }}>
            <Col span={24}>
              <Card title="107 Process Flow Status">
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <Row gutter={[8, 8]} align="middle" justify="space-around">
                    <Col span={4}>
                      <div className="process-stage">
                        <div className="stage-count">
                          <Badge count={statusData[0].value} overflowCount={999} style={{ backgroundColor: '#1890ff' }} />
                        </div>
                        <div className="stage-name">Field Submission</div>
                        <Progress percent={Math.round((statusData[0].value / totalRequests) * 100)} showInfo={false} status="active" />
                      </div>
                    </Col>
                    <Col span={1}>
                      <RightOutlined />
                    </Col>
                    <Col span={4}>
                      <div className="process-stage">
                        <div className="stage-count">
                          <Badge count={statusData[1].value} overflowCount={999} style={{ backgroundColor: '#faad14' }} />
                        </div>
                        <div className="stage-name">SM Review</div>
                        <Progress percent={Math.round((statusData[1].value / totalRequests) * 100)} showInfo={false} status="active" strokeColor="#faad14" />
                      </div>
                    </Col>
                    <Col span={1}>
                      <RightOutlined />
                    </Col>
                    <Col span={4}>
                      <div className="process-stage">
                        <div className="stage-count">
                          <Badge count={statusData[2].value} overflowCount={999} style={{ backgroundColor: '#722ed1' }} />
                        </div>
                        <div className="stage-name">Engineering</div>
                        <Progress percent={Math.round((statusData[2].value / totalRequests) * 100)} showInfo={false} status="active" strokeColor="#722ed1" />
                      </div>
                    </Col>
                    <Col span={1}>
                      <RightOutlined />
                    </Col>
                    <Col span={4}>
                      <div className="process-stage">
                        <div className="stage-count">
                          <Badge count={statusData[3].value} overflowCount={999} style={{ backgroundColor: '#eb2f96' }} />
                        </div>
                        <div className="stage-name">SOR Engagement</div>
                        <Progress percent={Math.round((statusData[3].value / totalRequests) * 100)} showInfo={false} status="active" strokeColor="#eb2f96" />
                      </div>
                    </Col>
                    <Col span={1}>
                      <RightOutlined />
                    </Col>
                    <Col span={4}>
                      <div className="process-stage">
                        <div className="stage-count">
                          <Badge count={statusData[4].value} overflowCount={999} style={{ backgroundColor: '#52c41a' }} />
                        </div>
                        <div className="stage-name">Closure</div>
                        <Progress percent={Math.round((statusData[4].value / totalRequests) * 100)} showInfo={false} status="success" />
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          </Row>

          {/* Alerts and Action Items */}
          <Row gutter={16} style={{ marginBottom: '24px' }}>
            <Col span={12}>
              <Card title={<span><BellOutlined /> Recent Alerts & Notifications</span>} style={{ height: '300px', overflowY: 'auto' }}>
                <Alert
                  message="Emergency TAR-2023-089 Requires Immediate Attention"
                  description="Response time target: 1 hour (Submitted 35 minutes ago)"
                  type="error"
                  showIcon
                  style={{ marginBottom: '10px' }}
                  action={
                    <Button size="small" type="primary">
                      View
                    </Button>
                  }
                />
                <Alert
                  message="MAR-2023-112 Approaching Target Response Time"
                  description="Target: 8 hours, Time Remaining: 47 minutes"
                  type="warning"
                  showIcon
                  style={{ marginBottom: '10px' }}
                />
                <Alert
                  message="Engineering Disposition Required for TAR-2023-075"
                  description="Request has been in Engineering stage for 18 hours"
                  type="info"
                  showIcon
                  style={{ marginBottom: '10px' }}
                />
                <Alert
                  message="TAR-2023-081 Successfully Closed"
                  description="Completed within target timeframe (4 hours ago)"
                  type="success"
                  showIcon
                  style={{ marginBottom: '10px' }}
                />
                <Alert
                  message="New Maintenance Assistance Request Submitted"
                  description="MAR-2023-114 requires SM initial review"
                  type="info"
                  showIcon
                  style={{ marginBottom: '10px' }}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card title={<span><SettingOutlined /> Action Items</span>} style={{ height: '300px', overflowY: 'auto' }}>
                <List
                  itemLayout="horizontal"
                  dataSource={[
                    {
                      title: 'Review Emergency TAR-2023-089',
                      description: 'Initial SM review needed within 25 minutes',
                      priority: 'High'
                    },
                    {
                      title: 'Engineering Disposition for MAR-2023-112',
                      description: 'Complete technical evaluation and cost estimate',
                      priority: 'Medium'
                    },
                    {
                      title: 'Route TAR-2023-093 to Propulsion SOR',
                      description: 'Request ready for SOR engagement',
                      priority: 'Medium'
                    },
                    {
                      title: 'Cost Estimate Approval for MAR-2023-108',
                      description: 'Finance validation required before proceeding',
                      priority: 'Medium'
                    },
                    {
                      title: 'Close and Document MAR-2023-099',
                      description: 'Maintenance action completed, waiting for documentation',
                      priority: 'Low'
                    }
                  ]}
                  renderItem={(item) => (
                    <List.Item
                      actions={[<Button type="primary" size="small">Take Action</Button>]}
                    >
                      <List.Item.Meta
                        avatar={
                          <Tag color={item.priority === 'High' ? 'red' : item.priority === 'Medium' ? 'orange' : 'green'}>
                            {item.priority}
                          </Tag>
                        }
                        title={item.title}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>

          {/* Charts and Visualizations */}
          <Row gutter={16}>
            <Col span={12}>
              <Card title={<span><PieChartOutlined /> Request Distribution</span>}>
                <Row>
                  <Col span={12}>
                    <h4 style={{ textAlign: 'center' }}>By Request Type</h4>
                    <PieChart width={200} height={200}>
                      <Pie
                        data={requestTypeData}
                        cx={100}
                        cy={100}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label
                      >
                        {requestTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  </Col>
                  <Col span={12}>
                    <h4 style={{ textAlign: 'center' }}>By Urgency Level</h4>
                    <PieChart width={200} height={200}>
                      <Pie
                        data={urgencyData}
                        cx={100}
                        cy={100}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label
                      >
                        {urgencyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={12}>
              <Card title={<span><LineChartOutlined /> Trend Analysis</span>}>
                <Row>
                  <Col span={24}>
                    <h4 style={{ textAlign: 'center' }}>Request Volume Over Time</h4>
                    <BarChart
                      width={500}
                      height={200}
                      data={trendData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Bar dataKey="requests" fill="#8884d8" />
                    </BarChart>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </TabPane>
        
        <TabPane tab="Request Management" key="requests">
          <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
            <Space>
              <Search
                placeholder="Search by ID, asset or assignee..."
                onSearch={(value) => { setSearchText(value); handleFilter(); }}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: 300 }}
              />
              <Select 
                value={requestFilter} 
                onChange={(value) => { setRequestFilter(value); handleFilter(); }}
                style={{ width: 120 }}
              >
                <Option value="all">All Types</Option>
                <Option value="TAR">TAR</Option>
                <Option value="MAR">MAR</Option>
              </Select>
              <Select 
                value={urgencyFilter} 
                onChange={(value) => { setUrgencyFilter(value); handleFilter(); }}
                style={{ width: 140 }}
              >
                <Option value="all">All Urgency</Option>
                <Option value="Emergency">Emergency</Option>
                <Option value="Immediate">Immediate</Option>
                <Option value="Urgent">Urgent</Option>
                <Option value="Routine">Routine</Option>
              </Select>
              <Button onClick={resetFilters}>Reset</Button>
            </Space>
            <Button type="primary">New Request</Button>
          </div>
          
          <Table 
            columns={columns} 
            dataSource={filteredRequests}
            rowKey="id"
            expandable={{
              expandedRowRender: record => (
                <div style={{ padding: '20px' }}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <h3>Request Details</h3>
                      <p><strong>Description:</strong> {record.description}</p>
                      <p><strong>Requested By:</strong> {record.requestedBy}</p>
                      <p><strong>Unit:</strong> {record.unit}</p>
                      <p><strong>Target Response:</strong> {record.targetResponseTime} hours</p>
                      <p><strong>Actual Response:</strong> {record.responseTime || 'N/A'} hours</p>
                    </Col>
                    <Col span={12}>
                      <h3>Process Timeline</h3>
                      <Timeline>
                        <Timeline.Item color="green">
                          Submitted: {record.submittedDate}
                          <p>{record.requestedBy} submitted request</p>
                        </Timeline.Item>
                        {record.timeline?.map((item: any, index: number) => (
                          <Timeline.Item 
                            key={index} 
                            color={item.status === 'Completed' ? 'green' : item.status === 'In Progress' ? 'blue' : 'gray'}
                          >
                            {item.date}: {item.action}
                            <p>{item.details}</p>
                          </Timeline.Item>
                        ))}
                      </Timeline>
                    </Col>
                  </Row>
                </div>
              ),
            }}
          />
        </TabPane>

        <TabPane tab="Analytics & Reports" key="reports">
          <Row gutter={16} style={{ marginBottom: '24px' }}>
            <Col span={24}>
              <Card title="Response Time Performance vs Target">
                <BarChart
                  width={1000}
                  height={300}
                  data={responseTimeData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
                  <RechartsTooltip />
                  <Legend />
                  <Bar dataKey="actual" fill="#8884d8" name="Actual Response Time" />
                  <Bar dataKey="target" fill="#82ca9d" name="Target Response Time" />
                </BarChart>
              </Card>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Card title="Key Performance Indicators">
                <List
                  bordered
                  dataSource={[
                    { metric: 'Request Resolution Rate', value: '87%', trend: '+2.5%', status: 'success' },
                    { metric: 'Avg Time in Engineering', value: '18.5 hours', trend: '-4.2%', status: 'success' },
                    { metric: 'Emergency Response Compliance', value: '94%', trend: '+1.2%', status: 'success' },
                    { metric: 'SOR Engagement Time', value: '2.3 days', trend: '+0.5', status: 'warning' },
                    { metric: 'Documentation Compliance', value: '92%', trend: '-0.8%', status: 'warning' }
                  ]}
                  renderItem={item => (
                    <List.Item>
                      <Row style={{ width: '100%' }}>
                        <Col span={16}>{item.metric}</Col>
                        <Col span={4} style={{ fontWeight: 'bold' }}>{item.value}</Col>
                        <Col span={4}>
                          <Tag color={item.status === 'success' ? 'green' : 'orange'}>
                            {item.trend}
                          </Tag>
                        </Col>
                      </Row>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card title="System Health & Compliance">
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>Documentation Completeness</span>
                    <span>92%</span>
                  </div>
                  <Progress percent={92} status="active" />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>Response Time Compliance</span>
                    <span>88%</span>
                  </div>
                  <Progress percent={88} status="active" strokeColor="#faad14" />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>Engineering Disposition Quality</span>
                    <span>95%</span>
                  </div>
                  <Progress percent={95} status="success" />
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>Cost Estimate Accuracy</span>
                    <span>84%</span>
                  </div>
                  <Progress percent={84} status="active" strokeColor="#722ed1" />
                </div>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Process107Dashboard; 