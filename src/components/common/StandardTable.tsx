import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Card, 
  Space, 
  Button, 
  Input, 
  Empty,
  Row,
  Col,
  Typography
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
import noDataImage from '../../icons/noDataTable.svg';
import '../../styles/tableStyles.css';

const { Title } = Typography;

export interface Statistic {
  label: string;
  value: string | number;
  color?: string;
}

export interface StandardTableProps<T> {
  title?: string;
  data: T[];
  columns: ColumnsType<T>;
  loading?: boolean;
  refreshData?: () => void;
  expandedRowRender?: (record: T) => React.ReactNode;
  searchableFields?: string[];
  stats?: Statistic[];
  extraControls?: React.ReactNode;
  tableProps?: TableProps<T>;
}

export function StandardTable<T>({
  title,
  data,
  columns,
  loading = false,
  refreshData,
  expandedRowRender,
  searchableFields = [],
  stats,
  extraControls,
  tableProps,
}: StandardTableProps<T>) {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState<T[]>(data);
  const colors = useColors();

  // Process columns to ensure consistent styling
  const processedColumns = columns.map((col) => ({
    ...col,
    className: `${col.className || ''} table-cell`,
  }));

  // Update filtered data when data or search changes
  useEffect(() => {
    if (!searchText || searchableFields.length === 0) {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter((item: any) => {
      return searchableFields.some((field) => {
        const value = item[field];
        if (value === undefined || value === null) return false;
        return String(value).toLowerCase().includes(searchText.toLowerCase());
      });
    });

    setFilteredData(filtered);
  }, [data, searchText, searchableFields]);

  // Define expanded row render with the table's expandedRowRender
  const expandable = expandedRowRender
    ? {
        expandedRowRender,
        expandRowByClick: true,
        expandIcon: ({ expanded, onExpand, record }: any) => (
          <img
            src={expanded ? '/icons/minus.svg' : '/icons/plus.svg'}
            alt={expanded ? 'Collapse' : 'Expand'}
            onClick={(e) => {
              e.stopPropagation();
              onExpand(record, e);
            }}
            style={{ cursor: 'pointer', marginRight: 8 }}
          />
        ),
      }
    : undefined;

  return (
    <div className="standard-table-container">
      <div className="table-header">
        {title && (
          <Typography.Title level={4} className="table-title">
            {title}
          </Typography.Title>
        )}
        
        {stats && stats.length > 0 && (
          <div className="table-stats">
            {stats.map((stat, index) => (
              <span key={index} style={{ color: stat.color }}>
                {stat.label}: <strong>{stat.value}</strong>
              </span>
            ))}
          </div>
        )}
        
        <div className="table-controls">
          {searchableFields.length > 0 && (
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 200 }}
            />
          )}
          
          {refreshData && (
            <Button 
              icon={<ReloadOutlined />} 
              onClick={refreshData}
              type="text"
            />
          )}
          
          {extraControls}
        </div>
      </div>
      
      <Table
        className="common-table"
        dataSource={filteredData}
        columns={processedColumns}
        loading={loading}
        expandable={expandable}
        pagination={{ pageSize: 10 }}
        locale={{
          emptyText: (
            <Empty
              image={noDataImage}
              imageStyle={{ height: 60 }}
              description="No Data Available"
            />
          ),
        }}
        bordered
        {...tableProps}
      />
    </div>
  );
} 