import React, { useState, useEffect } from 'react';
import { Tag, Button, Input, Table, Slider, Row, Col, Switch } from 'antd';
import { SearchOutlined, ReloadOutlined, FilterOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import '../../../styles/tableStyles.css';
import '../../../styles/dashboardStyles.css';
import OpenIcon from '../../../icons/cmdOpen24.svg';
import AnalysisIcon from '../../../icons/AnalysisItem.svg';

// Define the simulation entry type
interface SimulationEntry {
  id: string;
  name: string;
  type: string;
  status: string;
  progress: number;
  lastRun: string;
  results: string;
  owner: string;
  priority: string;
}

// Define a function to generate a date relative to today
const getRelativeDate = (daysAgo: number): string => {
  // Use March 24, 2025 as the reference date
  const referenceDate = moment('2025-03-24');
  return referenceDate.subtract(daysAgo, 'days').format('YYYY-MM-DD');
};

// Define a function to check if a date is within the past X weeks
const isWithinPastWeeks = (dateString: string, weeks: number): boolean => {
  if (dateString === 'Not Run') return false;
  
  // Use March 24, 2025 as the reference date
  const referenceDate = moment('2025-03-24');
  const date = moment(dateString);
  const cutoffDate = referenceDate.clone().subtract(weeks, 'weeks');
  
  return date.isAfter(cutoffDate);
};

const SimulationsTab: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState<number>(8); // Default 8 weeks
  const [dateFilterEnabled, setDateFilterEnabled] = useState<boolean>(true); // Default enabled
  const [searchText, setSearchText] = useState<string>('');
  const [filteredSimulations, setFilteredSimulations] = useState<SimulationEntry[]>([]);
  
  // Full simulation data for missile program
  const allSimulations: SimulationEntry[] = [
    // Original simulations with updated dates
    {
      id: 'SIM-001',
      name: 'Terminal Guidance Accuracy',
      type: 'Monte Carlo',
      status: 'Completed',
      progress: 100,
      lastRun: getRelativeDate(10),
      results: 'Pass',
      owner: 'John Smith',
      priority: 'High'
    },
    {
      id: 'SIM-002',
      name: 'Propulsion System Performance',
      type: 'Transient Analysis',
      status: 'Running',
      progress: 65,
      lastRun: getRelativeDate(3),
      results: 'In Progress',
      owner: 'Sarah Johnson',
      priority: 'Critical'
    },
    {
      id: 'SIM-003',
      name: 'Thermal Analysis - Hot Conditions',
      type: 'Steady State',
      status: 'Completed',
      progress: 100,
      lastRun: getRelativeDate(14),
      results: 'Pass',
      owner: 'Michael Chen',
      priority: 'Medium'
    },
    {
      id: 'SIM-004',
      name: 'Aerodynamic Stability',
      type: 'CFD',
      status: 'Queued',
      progress: 0,
      lastRun: getRelativeDate(175),
      results: 'Pending',
      owner: 'Emily Davis',
      priority: 'High'
    },
    {
      id: 'SIM-005',
      name: 'Warhead Effectiveness',
      type: 'Blast Analysis',
      status: 'Error',
      progress: 80,
      lastRun: getRelativeDate(6),
      results: 'Failed',
      owner: 'Robert Wilson',
      priority: 'High'
    },
    {
      id: 'SIM-006',
      name: 'Structural Integrity - Vibration',
      type: 'Modal Analysis',
      status: 'Completed',
      progress: 100,
      lastRun: getRelativeDate(19),
      results: 'Pass with Notes',
      owner: 'Jennifer Lee',
      priority: 'Medium'
    },
    {
      id: 'SIM-007',
      name: 'EMI Susceptibility',
      type: 'Electromagnetic',
      status: 'Planned',
      progress: 0,
      lastRun: 'Not Run',
      results: 'Pending',
      owner: 'David Martinez',
      priority: 'Low'
    },
    // Additional 30 simulations for missile program
    {
      id: 'SIM-008',
      name: 'Guidance Control Loop Stability',
      type: 'Control System',
      status: 'Completed',
      progress: 100,
      lastRun: getRelativeDate(22),
      results: 'Pass',
      owner: 'Maria Garcia',
      priority: 'High'
    },
    {
      id: 'SIM-009',
      name: 'Seeker Performance - Clear Weather',
      type: 'Radar Simulation',
      status: 'Completed',
      progress: 100,
      lastRun: getRelativeDate(30),
      results: 'Pass',
      owner: 'Thomas Wong',
      priority: 'High'
    },
    {
      id: 'SIM-010',
      name: 'Seeker Performance - Adverse Weather',
      type: 'Radar Simulation',
      status: 'Running',
      progress: 45,
      lastRun: getRelativeDate(2),
      results: 'In Progress',
      owner: 'Thomas Wong',
      priority: 'High'
    },
    {
      id: 'SIM-011',
      name: 'Flight Control Actuator Response',
      type: 'Mechatronics',
      status: 'Completed',
      progress: 100,
      lastRun: getRelativeDate(27),
      results: 'Pass',
      owner: 'James Rodriguez',
      priority: 'Medium'
    },
    {
      id: 'SIM-012',
      name: 'Target Acquisition Probability',
      type: 'Monte Carlo',
      status: 'Completed',
      progress: 100,
      lastRun: getRelativeDate(42),
      results: 'Pass',
      owner: 'Lisa Patel',
      priority: 'High'
    },
    {
      id: 'SIM-013',
      name: 'Rocket Motor Ignition Sequence',
      type: 'Transient Analysis',
      status: 'Completed',
      progress: 100,
      lastRun: getRelativeDate(15),
      results: 'Pass with Notes',
      owner: 'Kevin Nguyen',
      priority: 'Critical'
    },
    {
      id: 'SIM-014',
      name: 'Missile Body Aerodynamic Heating',
      type: 'CFD',
      status: 'Running',
      progress: 78,
      lastRun: getRelativeDate(5),
      results: 'In Progress',
      owner: 'Emily Davis',
      priority: 'High'
    },
    {
      id: 'SIM-015',
      name: 'Fin Actuator Load Analysis',
      type: 'Structural Analysis',
      status: 'Completed',
      progress: 100,
      lastRun: getRelativeDate(18),
      results: 'Pass',
      owner: 'Robert Wilson',
      priority: 'Medium'
    },
    {
      id: 'SIM-016',
      name: 'Boost Phase Trajectory Optimization',
      type: 'Trajectory Analysis',
      status: 'Completed',
      progress: 100,
      lastRun: getRelativeDate(12),
      results: 'Pass',
      owner: 'Rachel Kim',
      priority: 'High'
    },
    {
      id: 'SIM-017',
      name: 'Radar Cross Section Analysis',
      type: 'Electromagnetic',
      status: 'Error',
      progress: 65,
      lastRun: getRelativeDate(8),
      results: 'Failed',
      owner: 'David Martinez',
      priority: 'Medium'
    },
    {
      id: 'SIM-018',
      name: 'Propellant Stress Analysis',
      type: 'Structural Analysis',
      status: 'Completed',
      progress: 100,
      lastRun: getRelativeDate(21),
      results: 'Pass',
      owner: 'Jennifer Lee',
      priority: 'Medium'
    },
    {
      id: 'SIM-019',
      name: 'Launch Environment Vibration',
      type: 'Modal Analysis',
      status: 'Queued',
      progress: 0,
      lastRun: getRelativeDate(60),
      results: 'Pending',
      owner: 'Matthew Brown',
      priority: 'Medium'
    },
    {
      id: 'SIM-020',
      name: 'Blast Fragmentation Pattern',
      type: 'Blast Analysis',
      status: 'Running',
      progress: 35,
      lastRun: getRelativeDate(4),
      results: 'In Progress',
      owner: 'Robert Wilson',
      priority: 'High'
    },
    {
      id: 'SIM-021',
      name: 'Electronics Cooling System',
      type: 'Thermal Analysis',
      status: 'Completed',
      progress: 100,
      lastRun: getRelativeDate(32),
      results: 'Pass with Notes',
      owner: 'Michael Chen',
      priority: 'Medium'
    },
    {
      id: 'SIM-022',
      name: 'Battery Discharge Performance',
      type: 'Electrical Analysis',
      status: 'Completed',
      progress: 100,
      lastRun: getRelativeDate(9),
      results: 'Pass',
      owner: 'Anna Schmidt',
      priority: 'Medium'
    },
    {
      id: 'SIM-023',
      name: 'Shock Wave Propagation',
      type: 'Transient Analysis',
      status: 'Planned',
      progress: 0,
      lastRun: 'Not Run',
      results: 'Pending',
      owner: 'Sarah Johnson',
      priority: 'Low'
    },
    {
      id: 'SIM-024',
      name: 'Communication Link Reliability',
      type: 'Monte Carlo',
      status: 'Error',
      progress: 90,
      lastRun: getRelativeDate(11),
      results: 'Failed',
      owner: 'John Smith',
      priority: 'High'
    },
    {
      id: 'SIM-025',
      name: 'Sensor Gimbal Dynamic Stability',
      type: 'Control System',
      status: 'Completed',
      progress: 100,
      lastRun: getRelativeDate(25),
      results: 'Pass',
      owner: 'James Rodriguez',
      priority: 'Medium'
    },
    {
      id: 'SIM-026',
      name: 'Solid Propellant Combustion',
      type: 'Combustion Analysis',
      status: 'Completed',
      progress: 100,
      lastRun: getRelativeDate(35),
      results: 'Pass',
      owner: 'Kevin Nguyen',
      priority: 'High'
    },
    {
      id: 'SIM-027',
      name: 'Infrared Seeker Noise Model',
      type: 'Sensor Simulation',
      status: 'Running',
      progress: 55,
      lastRun: getRelativeDate(7),
      results: 'In Progress',
      owner: 'Lisa Patel',
      priority: 'High'
    },
    {
      id: 'SIM-028',
      name: 'Endgame Maneuvering',
      type: 'Trajectory Analysis',
      status: 'Queued',
      progress: 0,
      lastRun: getRelativeDate(90),
      results: 'Pending',
      owner: 'Rachel Kim',
      priority: 'Critical'
    },
    {
      id: 'SIM-029',
      name: 'Stage Separation Dynamics',
      type: 'Multibody Dynamics',
      status: 'Completed',
      progress: 100,
      lastRun: getRelativeDate(17),
      results: 'Pass with Notes',
      owner: 'Matthew Brown',
      priority: 'High'
    },
    {
      id: 'SIM-030',
      name: 'Launch Rail Clearance',
      type: 'Trajectory Analysis',
      status: 'Completed',
      progress: 100,
      lastRun: getRelativeDate(45),
      results: 'Pass',
      owner: 'Sarah Johnson',
      priority: 'Medium'
    },
    {
      id: 'SIM-031',
      name: 'ECM Countermeasures Effectiveness',
      type: 'Electromagnetic',
      status: 'Planned',
      progress: 0,
      lastRun: 'Not Run',
      results: 'Pending',
      owner: 'David Martinez',
      priority: 'Medium'
    },
    {
      id: 'SIM-032',
      name: 'Fuze Timing Analysis',
      type: 'Transient Analysis',
      status: 'Completed',
      progress: 100,
      lastRun: getRelativeDate(28),
      results: 'Pass',
      owner: 'Robert Wilson',
      priority: 'High'
    },
    {
      id: 'SIM-033',
      name: 'Boost Phase Attitude Control',
      type: 'Control System',
      status: 'Error',
      progress: 75,
      lastRun: getRelativeDate(13),
      results: 'Failed',
      owner: 'James Rodriguez',
      priority: 'High'
    },
    {
      id: 'SIM-034',
      name: 'Thrust Vector Control Response',
      type: 'Control System',
      status: 'Completed',
      progress: 100,
      lastRun: getRelativeDate(20),
      results: 'Pass',
      owner: 'Kevin Nguyen',
      priority: 'Medium'
    },
    {
      id: 'SIM-035',
      name: 'Thermal Protection System',
      type: 'Thermal Analysis',
      status: 'Running',
      progress: 25,
      lastRun: getRelativeDate(1),
      results: 'In Progress',
      owner: 'Michael Chen',
      priority: 'High'
    },
    {
      id: 'SIM-036',
      name: 'Proximity Fuze Performance',
      type: 'Sensor Simulation',
      status: 'Planned',
      progress: 0,
      lastRun: 'Not Run',
      results: 'Pending',
      owner: 'Lisa Patel',
      priority: 'Medium'
    },
    {
      id: 'SIM-037',
      name: 'Weather Impact Assessment',
      type: 'Monte Carlo',
      status: 'Queued',
      progress: 0,
      lastRun: getRelativeDate(120),
      results: 'Pending',
      owner: 'John Smith',
      priority: 'Low'
    }
  ];

  // Time period slider marks
  const sliderMarks = {
    1: '1w',
    12: '12w',
    26: '26w',
    52: '52w'
  };
  
  // Handle time frame change
  const handleTimeFrameChange = (value: number) => {
    setTimeFrame(value);
    // Don't update filtered data if date filtering is disabled
    if (dateFilterEnabled) {
      filterSimulations(value, searchText);
    }
  };

  // Handle toggle for date filtering
  const handleToggleFilter = (checked: boolean) => {
    setDateFilterEnabled(checked);
    
    // If enabling filter, apply it. If disabling, show all simulations
    if (checked) {
      filterSimulations(timeFrame, searchText);
    } else {
      setFilteredSimulations(searchText ? 
        allSimulations.filter(sim => 
          sim.name.toLowerCase().includes(searchText.toLowerCase()) ||
          sim.id.toLowerCase().includes(searchText.toLowerCase()) ||
          sim.type.toLowerCase().includes(searchText.toLowerCase()) ||
          sim.owner.toLowerCase().includes(searchText.toLowerCase())
        ) : 
        [...allSimulations]
      );
    }
  };

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    filterSimulations(timeFrame, value);
  };

  // Filter simulations based on time frame and search text
  const filterSimulations = (weeks: number, search: string) => {
    let filtered = [...allSimulations];
    
    // Apply date filter if enabled
    if (dateFilterEnabled) {
      filtered = filtered.filter(sim => isWithinPastWeeks(sim.lastRun, weeks));
    }
    
    // Apply search filter if search text exists
    if (search) {
      filtered = filtered.filter(sim => 
        sim.name.toLowerCase().includes(search.toLowerCase()) ||
        sim.id.toLowerCase().includes(search.toLowerCase()) ||
        sim.type.toLowerCase().includes(search.toLowerCase()) ||
        sim.owner.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    setFilteredSimulations(filtered);
  };

  // Initialize filtered simulations on component mount
  useEffect(() => {
    filterSimulations(timeFrame, searchText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Define table columns
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      sorter: (a: SimulationEntry, b: SimulationEntry) => a.id.localeCompare(b.id),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 300,
      sorter: (a: SimulationEntry, b: SimulationEntry) => a.name.localeCompare(b.name),
      render: (text: string) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={AnalysisIcon} alt="Analysis" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
            <span>{text}</span>
          </div>
          <img src={OpenIcon} alt="Open" style={{ cursor: 'pointer', width: '24px', height: '24px' }} />
        </div>
      )
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 130,
      filters: Array.from(new Set(allSimulations.map(sim => sim.type))).map(type => ({
        text: type,
        value: type
      })),
      onFilter: (value: string, record: SimulationEntry) => record.type.indexOf(value) === 0,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      filters: [
        { text: 'Completed', value: 'Completed' },
        { text: 'Running', value: 'Running' },
        { text: 'Queued', value: 'Queued' },
        { text: 'Error', value: 'Error' },
        { text: 'Planned', value: 'Planned' },
      ],
      onFilter: (value: string, record: SimulationEntry) => record.status.indexOf(value) === 0,
      render: (text: string) => text
    },
    {
      title: 'Last Run',
      dataIndex: 'lastRun',
      key: 'lastRun',
      width: 100,
      sorter: (a: SimulationEntry, b: SimulationEntry) => {
        if (a.lastRun === 'Not Run') return 1;
        if (b.lastRun === 'Not Run') return -1;
        return new Date(a.lastRun).getTime() - new Date(b.lastRun).getTime();
      },
    },
    {
      title: 'Results',
      dataIndex: 'results',
      key: 'results',
      width: 130,
      filters: [
        { text: 'Pass', value: 'Pass' },
        { text: 'Pass with Notes', value: 'Pass with Notes' },
        { text: 'In Progress', value: 'In Progress' },
        { text: 'Failed', value: 'Failed' },
        { text: 'Pending', value: 'Pending' },
      ],
      onFilter: (value: string, record: SimulationEntry) => record.results.indexOf(value) === 0,
      render: (text: string) => text
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
      width: 130,
      sorter: (a: SimulationEntry, b: SimulationEntry) => a.owner.localeCompare(b.owner),
    },
  ];

  // Calculate statistics from filtered simulations
  const totalCount = filteredSimulations.length;
  const completedCount = filteredSimulations.filter(s => s.status === 'Completed').length;
  const runningCount = filteredSimulations.filter(s => s.status === 'Running').length;
  const failedCount = filteredSimulations.filter(s => s.status === 'Error').length;

  // Handle refresh button click
  const handleRefresh = () => {
    filterSimulations(timeFrame, searchText);
  };

  return (
    <div className="full-width-table-container">
      <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '16px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div className="dashboard-card card-all-simulations" style={{ padding: '12px 16px', backgroundColor: '#14364F' }}>
            <div style={{ fontSize: '14px', fontWeight: 'normal', marginBottom: '4px', color: 'white' }}>All Simulations</div>
            <div style={{ fontSize: '14px', fontWeight: 'normal', color: 'white' }}>{totalCount} in last {timeFrame} weeks</div>
          </div>
          
          <div className="dashboard-card card-function" style={{ padding: '12px 16px' }}>
            <div style={{ fontSize: '14px', fontWeight: 'normal', marginBottom: '4px' }}>Completed</div>
            <div style={{ fontSize: '14px', fontWeight: 'normal' }}>{completedCount}</div>
          </div>
          
          <div className="dashboard-card card-logical" style={{ padding: '12px 16px' }}>
            <div style={{ fontSize: '14px', fontWeight: 'normal', marginBottom: '4px' }}>Running</div>
            <div style={{ fontSize: '14px', fontWeight: 'normal' }}>{runningCount}</div>
          </div>
          
          <div className="dashboard-card card-parameter" style={{ padding: '12px 16px' }}>
            <div style={{ fontSize: '14px', fontWeight: 'normal', marginBottom: '4px' }}>Failed</div>
            <div style={{ fontSize: '14px', fontWeight: 'normal' }}>{failedCount}</div>
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '16px', flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              opacity: dateFilterEnabled ? 1 : 0.5,
              transition: 'opacity 0.3s'
            }}>
              Time Period: {timeFrame} weeks
              <div style={{ display: 'flex', alignItems: 'center', marginLeft: '16px' }}>
                <span style={{ marginRight: '8px', fontSize: '13px', color: '#666' }}>
                  Date filtering {dateFilterEnabled ? 'enabled' : 'disabled'}
                </span>
                <Switch 
                  checkedChildren="On" 
                  unCheckedChildren="Off" 
                  defaultChecked={dateFilterEnabled}
                  onChange={handleToggleFilter}
                  size="small"
                  style={{ backgroundColor: dateFilterEnabled ? '#2C668A' : undefined }}
                />
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Input 
                prefix={<SearchOutlined />} 
                placeholder="Search"
                style={{ width: '200px', marginRight: '8px' }}
                onChange={handleSearch}
                value={searchText}
              />
              <Button icon={<ReloadOutlined />} onClick={handleRefresh}>Refresh</Button>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Slider 
              marks={{
                1: '1w',
                12: '12w',
                26: '26w',
                52: '52w'
              }}
              min={1}
              max={52}
              defaultValue={timeFrame}
              onChange={handleTimeFrameChange}
              style={{ 
                flex: 1, 
                width: '100%',
                opacity: dateFilterEnabled ? 1 : 0.5,
                transition: 'opacity 0.3s',
                marginRight: '10px'
              }}
              disabled={!dateFilterEnabled}
              trackStyle={{ backgroundColor: '#2C668A' }}
              handleStyle={{ borderColor: '#2C668A', backgroundColor: '#2C668A' }}
            />
          </div>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredSimulations}
        pagination={{ pageSize: 25, position: ['bottomRight'] }}
        size="middle"
        rowKey="id"
        className="full-width-table"
        bordered={false}
      />
    </div>
  );
};

export default SimulationsTab; 