import React, { useState, useEffect } from 'react';
import { Tag, Space, Button, Row, Col, Card, Slider, Switch, Input, Table } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined, SearchOutlined, ReloadOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import ModelIcon from '../../../icons/typeCAEModel48.svg';
import { StandardTable } from '../../common/StandardTable';
import moment from 'moment';

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

// Function to get relative date from March 24, 2025
const getRelativeDate = (daysAgo: number): string => {
  return moment('2025-03-24').subtract(daysAgo, 'days').format('YYYY-MM-DD');
};

// Function to check if a date is within past weeks
const isWithinPastWeeks = (date: string, weeks: number): boolean => {
  const referenceDate = moment('2025-03-24');
  const modelDate = moment(date);
  const weeksDiff = referenceDate.diff(modelDate, 'weeks');
  return weeksDiff <= weeks;
};

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
    lastModified: getRelativeDate(5),
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
    lastModified: getRelativeDate(2),
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
    lastModified: getRelativeDate(10),
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
    lastModified: getRelativeDate(8),
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
    lastModified: getRelativeDate(12),
    validationStatus: 'Partially Validated',
    tags: ['Controls', 'Dynamics', 'Feedback'],
    applicableRequirements: ['SR-501', 'SR-502']
  }
];

// Add the CSS styles at the top of the file after the imports
const tableStyles = `
.models-table-with-borders {
  border-top: 1px solid #f0f0f0;
}

.models-table-with-borders .ant-table-pagination {
  border-left: none;
  border-right: none;
  margin: 16px 0;
}

/* Remove hover effects from dashboard cards */
.dashboard-card:hover {
  transform: none !important;
  box-shadow: none !important;
  cursor: default !important;
}
`;

const ModelsTab: React.FC = () => {
  // State management
  const [timeFrame, setTimeFrame] = useState<number>(8);
  const [dateFilterEnabled, setDateFilterEnabled] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>('');
  const [filteredModels, setFilteredModels] = useState<SimulationModel[]>(sampleModels);

  // Filter models based on time frame and search text
  const filterModels = (weeks: number, text: string) => {
    console.log('Filtering models with timeframe:', weeks, 'weeks and search:', text);
    let filtered = [...sampleModels];
    
    // Apply date filter if weeks > 0 (date filtering enabled)
    if (weeks > 0) {
      const cutoffDate = moment().subtract(weeks, 'weeks');
      filtered = filtered.filter(model => {
        const modelDate = moment(model.lastModified);
        return modelDate.isAfter(cutoffDate);
      });
      console.log('After date filtering:', filtered.length, 'models remain');
    }
    
    // Apply text search if there is search text
    if (text && text.trim() !== '') {
      const searchLower = text.toLowerCase();
      filtered = filtered.filter(model => 
        model.id.toLowerCase().includes(searchLower) ||
        model.name.toLowerCase().includes(searchLower) ||
        model.description.toLowerCase().includes(searchLower) ||
        model.type.toLowerCase().includes(searchLower) ||
        model.owner.toLowerCase().includes(searchLower)
      );
      console.log('After text filtering:', filtered.length, 'models remain');
    }
    
    setFilteredModels(filtered);
  };

  // Update filtered data when dependencies change
  useEffect(() => {
    filterModels(timeFrame, searchText);
  }, [timeFrame, dateFilterEnabled, searchText]);

  // Status tag renderer
  const getStatusTag = (status: string) => {
    return <span style={{ fontSize: '14px' }}>{status}</span>;
  };
  
  // Validation status tag renderer
  const getValidationTag = (status: string) => {
    return <span style={{ fontSize: '14px' }}>{status}</span>;
  };

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
    // Only update filtered data if date filtering is enabled
    if (dateFilterEnabled) {
      filterModels(value, searchText);
    }
  };

  // Toggle date filtering
  const handleToggleDateFilter = (checked: boolean) => {
    setDateFilterEnabled(checked);
    if (checked) {
      filterModels(timeFrame, searchText);
    } else {
      // When disabling date filter, show all models with text filter only
      filterModels(0, searchText); // Pass 0 to indicate no date filtering
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
      width: 250,
      render: (text, record) => (
        <Space>
          <img src={ModelIcon} alt="Model" style={{ width: '24px', height: '24px' }} />
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
      width: 120,
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
      width: 180,
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
  ];

  // Calculate stats for dashboard cards
  const totalModels = filteredModels.length;
  const activeModels = filteredModels.filter(model => model.status === 'Active').length;
  const inDevModels = filteredModels.filter(model => model.status === 'In Development').length;
  const validatedModels = filteredModels.filter(model => model.validationStatus === 'Fully Validated').length;

  // Expandable row render for expanded model details
  const expandedRowRender = (record: SimulationModel) => (
    <div style={{ padding: '0 48px' }}>
      <p style={{ margin: '8px 0' }}><strong>Description:</strong> {record.description}</p>
      <p style={{ margin: '8px 0' }}><strong>Version:</strong> {record.version}</p>
      <p style={{ margin: '8px 0' }}>
        <strong>Tags:</strong>{' '}
        {record.tags.map(tag => (
          <Tag key={tag} style={{ margin: '0 4px 4px 0', padding: '0 6px', height: '18px', lineHeight: '18px' }}>{tag}</Tag>
        ))}
      </p>
      <p style={{ margin: '8px 0' }}>
        <strong>Applicable Requirements:</strong>{' '}
        {record.applicableRequirements.map(req => (
          <Tag key={req} color="blue" style={{ margin: '0 4px 4px 0', padding: '0 6px', height: '18px', lineHeight: '18px' }}>{req}</Tag>
        ))}
      </p>
    </div>
  );

  return (
    <div className="full-width-table-container">
      <style>{tableStyles}</style>
      <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '16px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div className="dashboard-card card-all-simulations" style={{ padding: '12px 16px', backgroundColor: '#14364F' }}>
            <div style={{ fontSize: '14px', fontWeight: 'normal', marginBottom: '4px', color: 'white' }}>All Models</div>
            <div style={{ fontSize: '14px', fontWeight: 'normal', color: 'white' }}>{totalModels} in last {timeFrame} weeks</div>
          </div>
          
          <div className="dashboard-card card-function" style={{ padding: '12px 16px' }}>
            <div style={{ fontSize: '14px', fontWeight: 'normal', marginBottom: '4px' }}>Active</div>
            <div style={{ fontSize: '14px', fontWeight: 'normal' }}>{activeModels}</div>
          </div>
          
          <div className="dashboard-card card-logical" style={{ padding: '12px 16px' }}>
            <div style={{ fontSize: '14px', fontWeight: 'normal', marginBottom: '4px' }}>In Development</div>
            <div style={{ fontSize: '14px', fontWeight: 'normal' }}>{inDevModels}</div>
          </div>
          
          <div className="dashboard-card card-parameter" style={{ padding: '12px 16px' }}>
            <div style={{ fontSize: '14px', fontWeight: 'normal', marginBottom: '4px' }}>Validated</div>
            <div style={{ fontSize: '14px', fontWeight: 'normal' }}>{validatedModels}</div>
          </div>
        </div>

        <div style={{ flex: 1, marginLeft: '24px' }}>
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
                  onChange={handleToggleDateFilter}
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
                onChange={(e) => {
                  setSearchText(e.target.value);
                  filterModels(timeFrame, e.target.value);
                }}
                value={searchText}
              />
              <Button 
                icon={<ReloadOutlined />} 
                onClick={() => filterModels(timeFrame, searchText)}
              >
                Refresh
              </Button>
            </div>
          </div>
          
          <Slider 
            marks={sliderMarks}
            min={1}
            max={52}
            value={timeFrame}
            onChange={handleTimeFrameChange}
            style={{ 
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

      <Table
        columns={columns}
        dataSource={filteredModels}
        pagination={{ pageSize: 25, position: ['bottomRight'] }}
        size="middle"
        rowKey="id"
        className="models-table-with-borders full-width-table"
        bordered={false}
        style={{ marginTop: 0 }}
        expandable={{
          expandedRowRender: expandedRowRender,
          expandRowByClick: false
        }}
      />
    </div>
  );
};

export default ModelsTab; 