import React, { useState } from 'react';
import { Tag, Button, Input, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import '../../../styles/tableStyles.css';
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

const SimulationsTab: React.FC = () => {
  // Sample simulation data for missile program
  const [simulations, setSimulations] = useState<SimulationEntry[]>([
    {
      id: 'SIM-001',
      name: 'Terminal Guidance Accuracy',
      type: 'Monte Carlo',
      status: 'Completed',
      progress: 100,
      lastRun: '2023-10-15',
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
      lastRun: '2023-10-21',
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
      lastRun: '2023-10-10',
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
      lastRun: '2023-09-30',
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
      lastRun: '2023-10-18',
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
      lastRun: '2023-10-05',
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
    }
  ]);

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
      filters: [
        { text: 'Monte Carlo', value: 'Monte Carlo' },
        { text: 'Transient Analysis', value: 'Transient Analysis' },
        { text: 'Steady State', value: 'Steady State' },
        { text: 'CFD', value: 'CFD' },
        { text: 'Blast Analysis', value: 'Blast Analysis' },
        { text: 'Modal Analysis', value: 'Modal Analysis' },
        { text: 'Electromagnetic', value: 'Electromagnetic' },
      ],
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

  // Calculate statistics
  const totalCount = simulations.length;
  const completedCount = simulations.filter(s => s.status === 'Completed').length;
  const runningCount = simulations.filter(s => s.status === 'Running').length;
  const failedCount = simulations.filter(s => s.status === 'Error').length;

  return (
    <div className="full-width-table-container">
      <div>
        <h3 className="table-title">Missile Program Simulations</h3>
        
        <div className="status-counts">
          <span>Total: <strong>{totalCount}</strong></span>
          <span style={{ color: '#52c41a' }}>Completed: <strong>{completedCount}</strong></span>
          <span style={{ color: '#1890ff' }}>Running: <strong>{runningCount}</strong></span>
          <span style={{ color: '#f5222d' }}>Failed: <strong>{failedCount}</strong></span>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={simulations}
        pagination={{ pageSize: 10, position: ['bottomRight'] }}
        size="middle"
        rowKey="id"
        className="full-width-table"
        bordered={false}
        title={() => (
          <div className="table-header-controls" style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px 0' }}>
            <Input 
              prefix={<SearchOutlined />} 
              placeholder="Search"
              style={{ width: '200px', marginRight: '8px' }}
            />
            <Button type="primary" style={{ marginRight: '8px' }}>New Simulation</Button>
            <Button>Import</Button>
          </div>
        )}
      />
    </div>
  );
};

export default SimulationsTab; 