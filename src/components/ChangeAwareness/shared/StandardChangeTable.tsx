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
  Statistic,
  Tag
} from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import { 
  ReloadOutlined, 
  SearchOutlined,
  BarChartOutlined,
  ClockCircleOutlined
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
import useColors from '../../../hooks/useColors';
import './styles.css'; // Import styles for resizable columns

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
    hideStatsCard?: boolean;
    hiddenColumns?: string[];
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
  const colors = useColors();
  
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
  const allColumns = tableOptions?.additionalColumns
    ? [...columns, ...tableOptions.additionalColumns]
    : columns;

  // Filter out hidden columns if specified
  const visibleColumns = tableOptions?.hiddenColumns
    ? allColumns.filter(column => !tableOptions.hiddenColumns?.includes(column.key as string))
    : allColumns;
  
  // Apply search props to columns
  const columnsWithSearch = visibleColumns.map(col => {
    if ('dataIndex' in col && typeof col.dataIndex === 'string' && searchableFields.includes(col.dataIndex)) {
      return {
        ...col,
        ...getColumnSearchProps(col.dataIndex),
        className: `${col.className || ''} resizable-column`.trim() // Add class for CSS resizing
      } as ColumnType<T>;
    }
    return {
      ...col,
      className: `${col.className || ''} resizable-column`.trim() // Add class for CSS resizing
    };
  });

  // Expanded row component rendering
  const expandedRowRender = (record: T) => (
    <StandardExpandedRow
      record={record}
      showTechnicalDetails={expandedRowOptions?.showTechnicalDetails}
      showImpact={expandedRowOptions?.showImpact}
      showDependencies={expandedRowOptions?.showDependencies}
      showDocuments={expandedRowOptions?.showDocuments}
      showCustomSection={!!expandedRowOptions?.customSectionContent}
      customSectionTitle={expandedRowOptions?.customSectionTitle}
      customSectionContent={expandedRowOptions?.customSectionContent?.(record)}
    />
  );

  return (
    <div style={{ width: '100%' }}>
      {!tableOptions?.hideStatsCard && (
        <Card className="stats-card" style={{ marginBottom: '16px' }}>
          <Row gutter={16} align="middle">
            <Col span={14}>
              <Title level={4} style={{ margin: 0 }}>{title}</Title>
              <Statistic
                value={data.length}
                suffix={`in last ${weeks} weeks`}
                valueStyle={{ fontSize: '16px', marginBottom: '4px' }}
              />
            </Col>
            <Col span={10} style={{ textAlign: 'right' }}>
              <Space>
                <Input
                  placeholder="Search..."
                  prefix={<SearchOutlined />}
                  onChange={e => setSearchText(e.target.value)}
                  value={searchText}
                  style={{ width: 200 }}
                />
                <Button 
                  onClick={refreshData}
                  icon={<ReloadOutlined />}
                >
                  Refresh
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>
      )}
      
      <TimeRangeSelector 
        weeks={weeks}
        setWeeks={setWeeks}
      />
      
      <div className="table-container" style={{ marginTop: '16px' }}>
        <Table
          rowKey="id"
          columns={columnsWithSearch}
          dataSource={filteredData(data)}
          pagination={paginationProps}
          loading={loading}
          onChange={handleTableChange}
          expandable={{
            expandedRowRender,
            expandRowByClick: true
          }}
          className="change-table resizable-table"
          size="middle"
        />
      </div>
      
      <Drawer
        title={`Details: ${selectedChange?.title || ''}`}
        placement="right"
        onClose={handleCloseDetails}
        open={isDetailsVisible}
        width={600}
      >
        {selectedChange && (
          <div>
            <Typography.Title level={4}>{selectedChange.title}</Typography.Title>
            <Typography.Paragraph>{selectedChange.description}</Typography.Paragraph>
            
            <Typography.Title level={5}>Change Information</Typography.Title>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Text strong>ID:</Text> {selectedChange.id}
              </Col>
              <Col span={12}>
                <Text strong>Date:</Text> {new Date(selectedChange.date).toLocaleDateString()}
              </Col>
              <Col span={12}>
                <Text strong>Author:</Text> {selectedChange.author}
              </Col>
              <Col span={12}>
                <Text strong>Status:</Text> {selectedChange.status}
              </Col>
              <Col span={12}>
                <Text strong>Category:</Text> {selectedChange.category}
              </Col>
              <Col span={12}>
                <Text strong>Change Type:</Text> {selectedChange.changeType}
              </Col>
            </Row>
          </div>
        )}
      </Drawer>
    </div>
  );
} 