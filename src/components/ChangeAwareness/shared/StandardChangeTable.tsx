import React, { useState } from 'react';
import { 
  Table, 
  Card, 
  Space, 
  Button, 
  Drawer,
  Typography, 
  Input, 
  DatePicker,
  Select,
  Row,
  Col
} from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import { 
  ReloadOutlined, 
  SearchOutlined, 
} from '@ant-design/icons';
import { BaseChange, AnyChange } from '../../../types/changeAwareness';
import { StandardExpandedRow } from './ExpandedRowComponents';
import { getStandardColumns } from './TableConfigurations';
import { 
  useChangesData, 
  usePagination, 
  useTableControls, 
  useRowSelection, 
  useTableSearch 
} from './hooks';
import TimeRangeSelector from './TimeRangeSelector';

const { Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

export interface StandardChangeTableProps<T extends BaseChange> {
  title: string;
  domain: string;
  weeks: number;
  setWeeks: (weeks: number) => void;
  productType?: string;
  categoryRenderer: (category: string, record: T) => React.ReactNode;
  expandedRowOptions?: {
    showTechnicalDetails?: boolean;
    showImpact?: boolean;
    showDependencies?: boolean;
    showDocuments?: boolean;
    customSectionTitle?: string;
    customSectionContent?: (record: T) => React.ReactNode;
  };
  tableOptions?: {
    idField?: string;
    idLabel?: string;
    showImpact?: boolean;
    additionalColumns?: ColumnsType<T>;
    searchableFields?: string[];
  };
}

export function StandardChangeTable<T extends AnyChange>({
  title,
  domain,
  weeks,
  setWeeks,
  productType = 'missile',
  categoryRenderer,
  expandedRowOptions,
  tableOptions
}: StandardChangeTableProps<T>) {
  // Component state
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  
  // Use custom hooks
  const { 
    data, 
    loading, 
    selectedChange, 
    isDetailsVisible,
    handleViewDetails, 
    handleCloseDetails, 
    refreshData 
  } = useChangesData<T>(domain, weeks, productType);
  
  const { 
    paginationProps 
  } = usePagination();
  
  const { 
    sortedInfo, 
    filteredInfo, 
    handleTableChange, 
    clearAllFilters, 
    resetTableControls 
  } = useTableControls();
  
  const { 
    rowSelection, 
    selectedRowKeys, 
    hasSelected 
  } = useRowSelection<T>();
  
  const searchableFields = tableOptions?.searchableFields || ['id', 'title', 'description', 'author'];
  const { 
    searchText, 
    filteredData, 
    getColumnSearchProps, 
    setSearchText 
  } = useTableSearch<T>(data, searchableFields);

  // Generate standard columns
  const columns = getStandardColumns<T>(
    handleViewDetails,
    categoryRenderer,
    {
      idField: tableOptions?.idField,
      idLabel: tableOptions?.idLabel,
      showImpact: tableOptions?.showImpact
    }
  );
  
  // Add any additional columns
  const allColumns = [...columns];
  if (tableOptions?.additionalColumns) {
    allColumns.push(...tableOptions.additionalColumns);
  }
  
  // Apply search props to columns
  const columnsWithSearch = allColumns.map(col => {
    if ('dataIndex' in col && typeof col.dataIndex === 'string' && searchableFields.includes(col.dataIndex)) {
      return {
        ...col,
        ...getColumnSearchProps(col.dataIndex)
      } as ColumnType<T>;
    }
    return col;
  });

  // Render expanded row content
  const expandedRowRender = (record: T) => (
    <StandardExpandedRow
      record={record}
      showTechnicalDetails={expandedRowOptions?.showTechnicalDetails}
      showImpact={expandedRowOptions?.showImpact}
      showDependencies={expandedRowOptions?.showDependencies}
      showDocuments={expandedRowOptions?.showDocuments}
      showCustomSection={!!expandedRowOptions?.customSectionContent}
      customSectionTitle={expandedRowOptions?.customSectionTitle}
      customSectionContent={expandedRowOptions?.customSectionContent && expandedRowOptions.customSectionContent(record)}
    />
  );

  return (
    <Card>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Row gutter={16} align="middle" style={{ marginBottom: 16 }}>
          <Col span={16}>
            <TimeRangeSelector weeks={weeks} setWeeks={setWeeks} />
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
              <Button 
                onClick={refreshData} 
                loading={loading}
                icon={<ReloadOutlined />}
              >
                Refresh
              </Button>
            </Space>
          </Col>
        </Row>

        <Table
          rowKey="id"
          dataSource={filteredData(data)}
          columns={columnsWithSearch}
          pagination={paginationProps}
          onChange={handleTableChange}
          loading={loading}
          rowSelection={rowSelection}
          expandable={{
            expandedRowRender
          }}
          size="middle"
        />

        {hasSelected && (
          <div style={{ marginTop: 16 }}>
            <Text>Selected {selectedRowKeys.length} items</Text>
          </div>
        )}
      </Space>
    </Card>
  );
} 