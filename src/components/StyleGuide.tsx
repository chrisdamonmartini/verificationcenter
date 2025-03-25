import React from 'react';
import { 
  Button, 
  Tag, 
  Progress, 
  Input, 
  DatePicker, 
  Select, 
  Divider 
} from 'antd';
import { SearchOutlined, UserOutlined, CalendarOutlined } from '@ant-design/icons';
import { StandardTable } from './common/StandardTable';
import StandardTabs from './common/StandardTabs';
import ContentPanel from './common/ContentPanel';

const { Option } = Select;
const { RangePicker } = DatePicker;

/**
 * StyleGuide component
 * 
 * This component serves as a visual reference for all standardized UI elements
 * with styling based on the Change Awareness tables and components.
 */
const StyleGuide: React.FC = () => {
  // Sample data for tables
  const tableColumns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => {
        const statusMap: Record<string, { color: string; text: string }> = {
          active: { color: 'success', text: 'Active' },
          pending: { color: 'warning', text: 'Pending' },
          inactive: { color: 'error', text: 'Inactive' },
          inProgress: { color: 'processing', text: 'In Progress' },
        };
        
        const { color, text } = statusMap[status] || { color: 'default', text: status };
        return <Tag color={color}>{text}</Tag>;
      }
    },
    { 
      title: 'Progress', 
      dataIndex: 'progress', 
      key: 'progress',
      render: (progress: number) => <Progress percent={progress} size="small" />
    },
    { 
      title: 'Actions', 
      key: 'actions',
      render: () => (
        <div className="action-buttons">
          <Button type="link" size="small">View</Button>
          <Button type="link" size="small">Edit</Button>
        </div>
      )
    }
  ];
  
  const tableData = [
    { id: '001', name: 'Design Review', status: 'active', progress: 100 },
    { id: '002', name: 'Integration Testing', status: 'inProgress', progress: 45 },
    { id: '003', name: 'Documentation', status: 'pending', progress: 0 },
    { id: '004', name: 'User Acceptance', status: 'inactive', progress: 0 },
  ];
  
  // Sample data for tabs
  const tabItems = [
    { key: '1', label: 'Requirements', children: 'Requirements content' },
    { key: '2', label: 'Design', children: 'Design content' },
    { key: '3', label: 'Testing', children: 'Testing content' },
    { key: '4', label: 'Deployment', children: 'Deployment content' },
  ];

  return (
    <div className="page-container">
      <h1>UI Style Guide</h1>
      <p>This guide showcases the standardized UI components with styling based on the Change Awareness tables.</p>
      
      <Divider orientation="left">Tables</Divider>
      <ContentPanel title="Standard Table Example">
        <StandardTable 
          title="Project Activities"
          data={tableData}
          columns={tableColumns}
          searchableFields={['name', 'status']}
          stats={[
            { label: 'Total', value: 4 },
            { label: 'Active', value: 1, color: '#52c41a' },
            { label: 'In Progress', value: 1, color: '#1890ff' },
          ]}
          extraControls={
            <Button type="primary" size="small">Add New</Button>
          }
        />
      </ContentPanel>
      
      <Divider orientation="left">Tabs</Divider>
      <ContentPanel>
        <StandardTabs items={tabItems} />
      </ContentPanel>
      
      <Divider orientation="left">Content Panels</Divider>
      <div className="section-container">
        <ContentPanel title="Standard Panel">
          <p>This is a standard content panel with title.</p>
        </ContentPanel>
        
        <ContentPanel 
          title="Panel with Extra Controls" 
          headerExtra={<Button type="primary" size="small">Action</Button>}
        >
          <p>This panel has extra controls in the header.</p>
        </ContentPanel>
        
        <ContentPanel className="primary" title="Primary Panel">
          <p>This is a primary-styled panel.</p>
        </ContentPanel>
        
        <ContentPanel className="success" title="Success Panel">
          <p>This is a success-styled panel.</p>
        </ContentPanel>
        
        <ContentPanel className="warning" title="Warning Panel">
          <p>This is a warning-styled panel.</p>
        </ContentPanel>
        
        <ContentPanel className="error" title="Error Panel">
          <p>This is an error-styled panel.</p>
        </ContentPanel>
      </div>
      
      <Divider orientation="left">Form Controls</Divider>
      <ContentPanel title="Standard Form Controls">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label>Search Input:</label>
            <Input prefix={<SearchOutlined />} placeholder="Search" style={{ width: 200 }} />
          </div>
          
          <div>
            <label>Text Input:</label>
            <Input prefix={<UserOutlined />} placeholder="Username" style={{ width: 200 }} />
          </div>
          
          <div>
            <label>Date Range:</label>
            <RangePicker style={{ width: 300 }} />
          </div>
          
          <div>
            <label>Select:</label>
            <Select defaultValue="option1" style={{ width: 200 }}>
              <Option value="option1">Option 1</Option>
              <Option value="option2">Option 2</Option>
              <Option value="option3">Option 3</Option>
            </Select>
          </div>
          
          <div>
            <label>Buttons:</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button type="primary">Primary</Button>
              <Button>Default</Button>
              <Button type="dashed">Dashed</Button>
              <Button type="link">Link</Button>
              <Button type="primary" icon={<CalendarOutlined />}>With Icon</Button>
            </div>
          </div>
        </div>
      </ContentPanel>
    </div>
  );
};

export default StyleGuide; 