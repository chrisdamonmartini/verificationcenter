import React from 'react';
import { Typography, Divider, Table } from 'antd';
import { InfoCircleOutlined, ToolOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';

const { Text } = Typography;

export interface DetailItem {
  label: string;
  value: React.ReactNode;
  section?: 'basic' | 'technical';
  span?: number;
}

export interface DetailTableProps {
  basicInfo?: DetailItem[];
  technicalDetails?: DetailItem[];
  compact?: boolean;
  showSectionDividers?: boolean;
}

const DetailTable: React.FC<DetailTableProps> = ({ 
  basicInfo = [], 
  technicalDetails = [],
  compact = true,
  showSectionDividers = true
}) => {
  // Combine all items into a single array with section information
  const allItems = [
    ...basicInfo.map(item => ({ ...item, section: 'basic' as const })),
    ...technicalDetails.map(item => ({ ...item, section: 'technical' as const }))
  ];

  // Define columns for the table
  const columns: TableProps<DetailItem>['columns'] = [
    {
      title: '',
      dataIndex: 'label',
      key: 'label',
      width: '30%',
      render: (text, record) => {
        // Add section header for the first item of each section
        if (showSectionDividers) {
          if (record === basicInfo[0]) {
            return (
              <>
                <div style={{ 
                  fontWeight: 'bold', 
                  marginBottom: 4, 
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <InfoCircleOutlined style={{ marginRight: 8 }} />
                  <span>Basic Information</span>
                </div>
                <Text type="secondary">{text}</Text>
              </>
            );
          } else if (record === technicalDetails[0]) {
            return (
              <>
                <div style={{ 
                  fontWeight: 'bold', 
                  marginBottom: 4, 
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <ToolOutlined style={{ marginRight: 8 }} />
                  <span>Technical Details</span>
                </div>
                <Text type="secondary">{text}</Text>
              </>
            );
          }
        }
        return <Text type="secondary">{text}</Text>;
      },
    },
    {
      title: '',
      dataIndex: 'value',
      key: 'value',
      render: (value) => value,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={allItems}
      pagination={false}
      showHeader={false}
      size="small"
      rowKey="label"
      style={{ marginBottom: 0 }}
      bordered={false}
      className="detail-table"
      // Apply more compact styles
      rowClassName={() => "detail-table-row"}
    />
  );
};

// Add global CSS for the component
const style = document.createElement('style');
style.innerHTML = `
.detail-table .ant-table-tbody > tr > td {
  padding: 4px 8px;
  border-bottom: 1px solid #f0f0f0;
}
.detail-table-row:last-child td {
  border-bottom: none;
}
.detail-table .ant-table {
  background: transparent;
}
.detail-table .ant-table-tbody > tr.ant-table-row:hover > td {
  background: #fafafa;
}
`;
document.head.appendChild(style);

export default DetailTable; 