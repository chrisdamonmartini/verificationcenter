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
  Col,
  Tag
} from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import { 
  ReloadOutlined, 
  SearchOutlined, 
  FilterOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import { BaseChange, AnyChange } from '../../../types/changeAwareness';
import { StandardExpandedRow } from './ExpandedRowComponents';
import { getStandardColumns, StandardBaseChange } from './TableConfigurations';
import { 
  useChangesData, 
  usePagination, 
  useTableControls, 
  useTableSearch 
} from './hooks';
import TimeRangeSelector from './TimeRangeSelector';

const { Text, Title } = Typography;
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

export function StandardChangeTable<T extends StandardBaseChange>({
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
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={4}>{title}</Title>
          </Col>
          <Col>
            <Space>
              <Button icon={<ReloadOutlined />} onClick={refreshData}>Refresh</Button>
              <Button icon={<FilterOutlined />} onClick={() => setIsFilterDrawerOpen(true)}>Filter</Button>
              <Button icon={<DownloadOutlined />}>Export</Button>
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
          expandable={{
            expandedRowRender
          }}
          size="middle"
        />
      </Space>
    </Card>
  );
} 