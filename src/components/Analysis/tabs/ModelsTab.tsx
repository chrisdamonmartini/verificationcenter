import React from 'react';
import { Tag, Button, Space } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import ModelIcon from '../../../icons/typeCAEModel48.svg';
import { StandardTable } from '../../common/StandardTable';

// Types for simulation models
interface SimulationModel {
  id: string;
  name: string;
  description: string;
  type: string;
  version: string;
  status: 'Active' | 'In Development' | 'Deprecated' | 'Archived';
  fidelity: 'Low' | 'Medium' | 'High';
  owner: string;
  lastModified: string;
  validationStatus: 'Not Validated' | 'Partially Validated' | 'Fully Validated';
  tags: string[];
  applicableRequirements: string[];
}

// Sample data for demonstration
const sampleModels: SimulationModel[] = [
  {
    id: 'MDL-701',
    name: 'Wing FEM',
    description: 'Finite Element Model of wing structure for load analysis',
    type: 'Structural',
    version: '3.2',
    status: 'Active',
    fidelity: 'High',
    owner: 'Analysis Team',
    lastModified: '2025-01-05',
    validationStatus: 'Fully Validated',
    tags: ['Wing', 'Structural', 'FEM'],
    applicableRequirements: ['SR-201', 'SR-202']
  },
  {
    id: 'MDL-702',
    name: 'Aerodynamic Model',
    description: 'CFD model for aerodynamic analysis under various flight conditions',
    type: 'Aerodynamic',
    version: '2.1',
    status: 'Active',
    fidelity: 'Medium',
    owner: 'Aerodynamics',
    lastModified: '2025-01-02',
    validationStatus: 'Partially Validated',
    tags: ['Aero', 'CFD', 'Flight'],
    applicableRequirements: ['SR-103', 'SR-205']
  },
  {
    id: 'MDL-703',
    name: 'Thermal Analysis Model',
    description: 'Model for thermal analysis of engine components',
    type: 'Thermal',
    version: '1.5',
    status: 'In Development',
    fidelity: 'Medium',
    owner: 'Thermal Team',
    lastModified: '2025-01-10',
    validationStatus: 'Not Validated',
    tags: ['Thermal', 'Engine', 'Heat Transfer'],
    applicableRequirements: ['SR-301', 'SR-302']
  },
  {
    id: 'MDL-704',
    name: 'Fatigue Analysis Model',
    description: 'Model for fatigue life prediction of critical components',
    type: 'Durability',
    version: '2.0',
    status: 'Active',
    fidelity: 'High',
    owner: 'Materials Team',
    lastModified: '2025-01-08',
    validationStatus: 'Fully Validated',
    tags: ['Fatigue', 'Durability', 'Lifecycle'],
    applicableRequirements: ['SR-401', 'SR-403']
  },
  {
    id: 'MDL-705',
    name: 'System Dynamics Model',
    description: 'Control system dynamics model for flight control surfaces',
    type: 'Controls',
    version: '1.8',
    status: 'Active',
    fidelity: 'Medium',
    owner: 'Controls Team',
    lastModified: '2025-01-12',
    validationStatus: 'Partially Validated',
    tags: ['Controls', 'Dynamics', 'Feedback'],
    applicableRequirements: ['SR-501', 'SR-502']
  }
];

const ModelsTab: React.FC = () => {
  // Status tag renderer
  const getStatusTag = (status: string) => {
    switch (status) {
      case 'Active':
        return <Tag color="green">{status}</Tag>;
      case 'In Development':
        return <Tag color="blue">{status}</Tag>;
      case 'Deprecated':
        return <Tag color="orange">{status}</Tag>;
      case 'Archived':
        return <Tag color="gray">{status}</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };
  
  // Validation status tag renderer
  const getValidationTag = (status: string) => {
    switch (status) {
      case 'Fully Validated':
        return <Tag icon={<CheckCircleOutlined />} color="success">{status}</Tag>;
      case 'Partially Validated':
        return <Tag icon={<ClockCircleOutlined />} color="processing">{status}</Tag>;
      case 'Not Validated':
        return <Tag icon={<ExclamationCircleOutlined />} color="warning">{status}</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };
  
  // Table columns definition
  const columns: ColumnsType<SimulationModel> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <img src={ModelIcon} alt="Model" style={{ width: '16px', height: '16px' }} />
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      filters: [
        { text: 'Structural', value: 'Structural' },
        { text: 'Aerodynamic', value: 'Aerodynamic' },
        { text: 'Thermal', value: 'Thermal' },
        { text: 'Durability', value: 'Durability' },
        { text: 'Controls', value: 'Controls' },
      ],
      onFilter: (value, record) => record.type.indexOf(value as string) === 0,
    },
    {
      title: 'Fidelity',
      dataIndex: 'fidelity',
      key: 'fidelity',
      width: 100,
      filters: [
        { text: 'High', value: 'High' },
        { text: 'Medium', value: 'Medium' },
        { text: 'Low', value: 'Low' },
      ],
      onFilter: (value, record) => record.fidelity === value,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 140,
      render: (text) => getStatusTag(text),
      filters: [
        { text: 'Active', value: 'Active' },
        { text: 'In Development', value: 'In Development' },
        { text: 'Deprecated', value: 'Deprecated' },
        { text: 'Archived', value: 'Archived' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Validation',
      dataIndex: 'validationStatus',
      key: 'validationStatus',
      width: 170,
      render: (text) => getValidationTag(text),
    },
    {
      title: 'Last Modified',
      dataIndex: 'lastModified',
      key: 'lastModified',
      width: 120,
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
      width: 150,
    },
    {
      title: 'Action',
      key: 'action',
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <Button type="link" size="small">View</Button>
          <Button type="link" size="small">Open</Button>
        </Space>
      ),
    },
  ];
  
  // Calculate stats for header
  const activeModels = sampleModels.filter(model => model.status === 'Active').length;
  const inDevelopmentModels = sampleModels.filter(model => model.status === 'In Development').length;
  
  // Expandable row render for expanded model details
  const expandedRowRender = (record: SimulationModel) => (
    <div style={{ padding: '0 48px' }}>
      <p style={{ margin: '8px 0' }}><strong>Description:</strong> {record.description}</p>
      <p style={{ margin: '8px 0' }}><strong>Version:</strong> {record.version}</p>
      <p style={{ margin: '8px 0' }}>
        <strong>Tags:</strong>{' '}
        {record.tags.map(tag => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </p>
      <p style={{ margin: '8px 0' }}>
        <strong>Applicable Requirements:</strong>{' '}
        {record.applicableRequirements.map(req => (
          <Tag key={req} color="blue">{req}</Tag>
        ))}
      </p>
    </div>
  );
  
  return (
    <StandardTable
      title="Analysis Models"
      data={sampleModels}
      columns={columns}
      loading={false}
      expandedRowRender={expandedRowRender}
      searchableFields={['id', 'name', 'description', 'type']}
      stats={{
        total: sampleModels.length,
        completed: activeModels,
        inProgress: inDevelopmentModels,
        customStats: (
          <div>
            Validated: {sampleModels.filter(model => model.validationStatus === 'Fully Validated').length}
          </div>
        )
      }}
      refreshData={() => console.log('Refreshing models...')}
    />
  );
};

export default ModelsTab; 