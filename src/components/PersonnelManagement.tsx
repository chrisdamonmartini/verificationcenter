import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Card, 
  Row, 
  Col, 
  Input, 
  Button, 
  Tag, 
  Tooltip, 
  Tabs, 
  Badge, 
  Progress,
  Select,
  Divider
} from 'antd';
import { 
  InfoCircleOutlined, 
  UserOutlined, 
  CheckCircleOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  ToolOutlined,
  WarningOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { mockTechnicians } from '../mockData';
import { checkQualificationStatus } from '../utils/qualificationUtils';
import { Technician } from '../types';

const { TabPane } = Tabs;
const { Search } = Input;
const { Option } = Select;

interface PersonnelManagementProps {
  technicians?: Technician[];
}

const PersonnelManagement: React.FC<PersonnelManagementProps> = ({ technicians: initialTechnicians }) => {
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [filteredTechnicians, setFilteredTechnicians] = useState<Technician[]>([]);
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    // Use props if provided, otherwise use mock data
    setTechnicians(initialTechnicians || mockTechnicians);
    setFilteredTechnicians(initialTechnicians || mockTechnicians);
  }, [initialTechnicians]);

  useEffect(() => {
    let filtered = [...technicians];
    
    // Apply search filter
    if (searchText) {
      filtered = filtered.filter(tech => 
        tech.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(tech => {
        if (filterStatus === 'available') return tech.available;
        if (filterStatus === 'assigned') return tech.currentAssignment;
        if (filterStatus === 'on-leave') return tech.availability === 'Off Duty';
        return true;
      });
    }
    
    setFilteredTechnicians(filtered);
  }, [searchText, technicians, filterStatus]);

  // Count metrics for status cards
  const totalPersonnel = technicians.length;
  const availablePersonnel = technicians.filter(t => t.available && !t.currentAssignment).length;
  const assignedPersonnel = technicians.filter(t => t.currentAssignment).length;
  const onLeavePersonnel = technicians.filter(t => t.availability === 'Off Duty').length;
  const inTrainingPersonnel = 2; // Mock data, would be calculated from technician trainings

  // Generate certification expiration data
  const expirationData = technicians
    .filter(tech => (tech as any).certifications && (tech as any).certifications.length > 0)
    .flatMap((tech: Technician) => {
      return ((tech as any).certifications || []).map((cert: any) => {
        const expDate = new Date(cert.expirationDate);
        const now = new Date();
        const daysUntil = Math.floor((expDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        
        return {
          techId: tech.id,
          name: tech.name,
          certType: cert.type,
          daysUntil,
          date: cert.expirationDate,
          status: daysUntil < 0 ? 'expired' : daysUntil <= 30 ? 'critical' : daysUntil <= 60 ? 'warning' : 'good'
        };
      });
    })
    .sort((a, b) => a.daysUntil - b.daysUntil)
    .slice(0, 10);

  // Generate specialization data for pie chart
  const specializationData = technicians.reduce((acc, tech) => {
    if (tech.specialties) {
      tech.specialties.forEach((specialty: string) => {
        if (!acc[specialty]) {
          acc[specialty] = 0;
        }
        acc[specialty]++;
      });
    }
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(specializationData).map(([specialty, count]) => ({
    type: specialty,
    value: count
  }));

  // Table columns
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Role/Specialties',
      dataIndex: 'specialties',
      key: 'specialties',
      render: (_: any, record: Technician) => (
        <span>
          {record.specialties?.map((specialty: string) => (
            <Tag color="blue" key={specialty}>
              {specialty}
            </Tag>
          ))}
        </span>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (_: any, record: Technician) => {
        if (record.currentAssignment) {
          return <Tag color="red">Assigned</Tag>;
        }
        if (record.availability === 'Off Duty') {
          return <Tag color="orange">On Leave</Tag>;
        }
        if (record.available) {
          return <Tag color="green">Available</Tag>;
        }
        return <Tag>Unavailable</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Technician) => (
        <Tooltip title="View details">
          <Button 
            type="primary" 
            size="small" 
            onClick={() => console.log('View details for', record.name)}
          >
            <InfoCircleOutlined /> Details
          </Button>
        </Tooltip>
      ),
    },
  ];

  // Training completion data
  const trainingData = [
    { program: 'F-35 Systems', completed: 15, total: 20 },
    { program: 'Safety Procedures', completed: 22, total: 25 },
    { program: 'Engine Maintenance', completed: 8, total: 18 },
    { program: 'Avionics Certification', completed: 12, total: 15 },
  ];

  return (
    <div className="personnel-management-container" style={{ padding: '20px' }}>
      <div className="page-header" style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', display: 'flex', alignItems: 'center' }}>
          <TeamOutlined style={{ marginRight: '10px' }} /> Personnel Management
        </h1>
      </div>

      <Tabs activeKey={activeTab} onChange={(key: string) => setActiveTab(key)}>
        <TabPane tab="Overview" key="overview">
          {/* Status Cards */}
          <Row gutter={16} style={{ marginBottom: '20px' }}>
            <Col span={4}>
              <Card style={{ background: '#1890ff', color: 'white', textAlign: 'center' }}>
                <UserOutlined style={{ fontSize: '24px' }} />
                <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{totalPersonnel}</div>
                <div>Total Personnel</div>
              </Card>
            </Col>
            <Col span={4}>
              <Card style={{ background: '#52c41a', color: 'white', textAlign: 'center' }}>
                <CheckCircleOutlined style={{ fontSize: '24px' }} />
                <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{availablePersonnel}</div>
                <div>Available</div>
              </Card>
            </Col>
            <Col span={4}>
              <Card style={{ background: '#f5222d', color: 'white', textAlign: 'center' }}>
                <ToolOutlined style={{ fontSize: '24px' }} />
                <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{assignedPersonnel}</div>
                <div>Assigned</div>
              </Card>
            </Col>
            <Col span={4}>
              <Card style={{ background: '#fa8c16', color: 'white', textAlign: 'center' }}>
                <CalendarOutlined style={{ fontSize: '24px' }} />
                <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{onLeavePersonnel}</div>
                <div>On Leave</div>
              </Card>
            </Col>
            <Col span={4}>
              <Card style={{ background: '#722ed1', color: 'white', textAlign: 'center' }}>
                <ClockCircleOutlined style={{ fontSize: '24px' }} />
                <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{inTrainingPersonnel}</div>
                <div>In Training</div>
              </Card>
            </Col>
            <Col span={4}>
              <Card style={{ background: '#eb2f96', color: 'white', textAlign: 'center' }}>
                <WarningOutlined style={{ fontSize: '24px' }} />
                <div style={{ fontSize: '36px', fontWeight: 'bold' }}>
                  {expirationData.filter(e => e.status === 'critical' || e.status === 'expired').length}
                </div>
                <div>Cert. Alerts</div>
              </Card>
            </Col>
          </Row>

          {/* Dashboard Widgets */}
          <Row gutter={16}>
            {/* Certification Expiration Timeline - Update span from 16 to 24 to take full width */}
            <Col span={24}>
              <Card title="Upcoming Certification Expirations" style={{ height: '400px', overflow: 'auto' }}>
                {expirationData.length > 0 ? (
                  <div>
                    {expirationData.map((item, index) => (
                      <div 
                        key={index} 
                        style={{ 
                          display: 'flex', 
                          marginBottom: '12px', 
                          padding: '8px', 
                          borderRadius: '4px',
                          background: item.status === 'expired' ? '#ffccc7' : 
                                     item.status === 'critical' ? '#ffe7ba' : 
                                     item.status === 'warning' ? '#ffffb8' : '#f6ffed'
                        }}
                      >
                        <div style={{ width: '30%' }}>
                          <strong>{item.name}</strong>
                        </div>
                        <div style={{ width: '30%' }}>
                          {item.certType}
                        </div>
                        <div style={{ width: '20%' }}>
                          {new Date(item.date).toLocaleDateString()}
                        </div>
                        <div style={{ width: '20%' }}>
                          <Badge 
                            status={
                              item.status === 'expired' ? 'error' : 
                              item.status === 'critical' ? 'warning' : 
                              item.status === 'warning' ? 'processing' : 'success'
                            } 
                            text={
                              item.status === 'expired' ? 'Expired' : 
                              `${item.daysUntil} days left`
                            } 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '40px' }}>
                    <p>No certification expiration data available</p>
                  </div>
                )}
              </Card>
            </Col>
          </Row>

          <Divider />

          {/* Training Completion Section */}
          <Row>
            <Col span={24}>
              <Card title="Training Completion Status">
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                  {trainingData.map((training, index) => (
                    <div key={index} style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{training.program}</span>
                        <span>{training.completed}/{training.total} Complete</span>
                      </div>
                      <Progress 
                        percent={Math.round((training.completed / training.total) * 100)} 
                        status={
                          (training.completed / training.total) === 1 ? 'success' : 'active'
                        } 
                      />
                    </div>
                  ))}
                </div>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Personnel List" key="personnel">
          <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
            <Search
              placeholder="Search by name..."
              onSearch={(value: string) => setSearchText(value)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
              style={{ width: 300 }}
            />
            <Select 
              defaultValue="all" 
              style={{ width: 200 }} 
              onChange={(value: string) => setFilterStatus(value)}
            >
              <Option value="all">All Status</Option>
              <Option value="available">Available</Option>
              <Option value="assigned">Assigned</Option>
              <Option value="on-leave">On Leave</Option>
            </Select>
          </div>
          
          <Table 
            columns={columns} 
            dataSource={filteredTechnicians}
            rowKey="id"
            expandable={{
              expandedRowRender: (record: Technician) => (
                <div style={{ padding: '20px' }}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <h3>Certifications</h3>
                      {(record as any).certifications && (record as any).certifications.length > 0 ? (
                        (record as any).certifications.map((cert: any, idx: number) => (
                          <div key={idx} style={{ marginBottom: '8px', padding: '8px', border: '1px solid #f0f0f0', borderRadius: '4px' }}>
                            <div><strong>{cert.type}</strong> (#{cert.number})</div>
                            <div>Status: <Tag color={cert.status === 'Active' ? 'green' : 'red'}>{cert.status}</Tag></div>
                            <div>Expires: {new Date(cert.expirationDate).toLocaleDateString()}</div>
                          </div>
                        ))
                      ) : (
                        <p>No certifications</p>
                      )}
                    </Col>
                    <Col span={12}>
                      <h3>Training History</h3>
                      {(record as any).trainings && (record as any).trainings.length > 0 ? (
                        (record as any).trainings.map((training: any, idx: number) => (
                          <div key={idx} style={{ marginBottom: '8px', padding: '8px', border: '1px solid #f0f0f0', borderRadius: '4px' }}>
                            <div><strong>{training.name}</strong></div>
                            <div>Completed: {new Date(training.completedDate).toLocaleDateString()}</div>
                            <div>Valid until: {new Date(training.validUntil).toLocaleDateString()}</div>
                            <div>Score: {training.score}%</div>
                          </div>
                        ))
                      ) : (
                        <p>No training records</p>
                      )}
                    </Col>
                  </Row>
                  {(record as any).assignmentHistory && (record as any).assignmentHistory.length > 0 && (
                    <div style={{ marginTop: '20px' }}>
                      <h3>Recent Assignments</h3>
                      <ul>
                        {(record as any).assignmentHistory.map((assignment: any, idx: number) => (
                          <li key={idx}>
                            <strong>{assignment.taskType}</strong> on Aircraft {assignment.aircraftId}<br />
                            {new Date(assignment.startDate).toLocaleDateString()} - {new Date(assignment.endDate).toLocaleDateString()}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ),
            }}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default PersonnelManagement; 