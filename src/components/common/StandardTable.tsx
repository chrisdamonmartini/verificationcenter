import React, { useState } from 'react';
import { 
  Table, 
  Card, 
  Space, 
  Button, 
  Input, 
  Row,
  Col
} from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import {
  ReloadOutlined,
  SearchOutlined,
  HistoryOutlined
} from '@ant-design/icons';
import useColors from '../../hooks/useColors';
import ChildIcon from '../../icons/cmdChild24.svg';
import ChildExpandedIcon from '../../icons/cmdChildExpanded24.svg';
import '../../styles/tableStyles.css';

export interface StandardTableProps<T> {
  title: string;
  data: T[];
  columns: ColumnsType<T>;
  loading?: boolean;
  refreshData?: () => void;
  expandedRowRender?: (record: T) => React.ReactNode;
  searchableFields?: (keyof T)[];
  stats?: {
    total: number;
    completed?: number;
    inProgress?: number;
    pending?: number;
    customStats?: React.ReactNode;
  };
  extraControls?: React.ReactNode;
  tableProps?: TableProps<T>;
}

export function StandardTable<T extends { id: string }>({
  title,
  data,
  columns,
  loading = false,
  refreshData,
  expandedRowRender,
  searchableFields = ['id' as keyof T, 'name' as keyof T],
  stats,
  extraControls,
  tableProps
}: StandardTableProps<T>) {
  // Component state
  const [searchText, setSearchText] = useState<string>('');
  const colors = useColors();

  // Filter data based on search text
  const filteredData = searchText.trim() === '' 
    ? data 
    : data.filter(item => {
        return searchableFields.some(field => {
          const value = item[field];
          return value && String(value).toLowerCase().includes(searchText.toLowerCase());
        });
      });

  // Process columns to ensure consistent styling
  const processedColumns = columns.map(col => ({
    ...col,
    className: `${col.className || ''} table-column`,
    // Add any additional column processing here if needed
  }));

  return (
    <Card className="common-table" title={title}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Row gutter={16} align="middle" style={{ marginBottom: 16 }} className="table-controls">
          <Col span={16}>
            <div className="stats-bar">
              {stats && (
                <>
                  <div>Total: {stats.total}</div>
                  {stats.completed !== undefined && (
                    <div>Completed: {stats.completed}</div>
                  )}
                  {stats.inProgress !== undefined && (
                    <div>In Progress: {stats.inProgress}</div>
                  )}
                  {stats.pending !== undefined && (
                    <div>Pending: {stats.pending}</div>
                  )}
                  {stats.customStats}
                </>
              )}
            </div>
          </Col>
          <Col span={8} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Space>
              <Input
                placeholder="Search..."
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                style={{ width: 200 }}
                prefix={<SearchOutlined />}
              />
              {refreshData && (
                <Button
                  onClick={refreshData}
                  loading={loading}
                  icon={<ReloadOutlined />}
                >
                  Refresh
                </Button>
              )}
              {extraControls}
            </Space>
          </Col>
        </Row>

        <Table
          rowKey="id"
          dataSource={filteredData}
          columns={processedColumns}
          loading={loading}
          expandable={expandedRowRender ? {
            expandedRowRender,
            expandIcon: ({ expanded, onExpand, record }) => (
              expanded ? (
                <div
                  onClick={e => onExpand(record, e)}
                  style={{
                    display: 'flex',
                    cursor: 'pointer',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4px'
                  }}
                >
                  <img src={ChildExpandedIcon} alt="Collapse" style={{ width: '24px', height: '24px' }} />
                </div>
              ) : (
                <div
                  onClick={e => onExpand(record, e)}
                  style={{
                    display: 'flex',
                    cursor: 'pointer',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4px'
                  }}
                >
                  <img src={ChildIcon} alt="Expand" style={{ width: '24px', height: '24px' }} />
                </div>
              )
            )
          } : undefined}
          size="middle"
          locale={{
            emptyText: (
              <div style={{ padding: "20px 0" }}>
                <HistoryOutlined style={{ fontSize: 36, color: "#bfbfbf", marginBottom: 10 }} />
                <p>No data available</p>
              </div>
            )
          }}
          bordered
          {...tableProps}
        />
      </Space>
    </Card>
  );
} 