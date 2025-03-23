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
  ClockCircleOutlined,
  HistoryOutlined
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
import ChildIcon from '../../../icons/cmdChild24.svg';
import ChildExpandedIcon from '../../../icons/cmdChildExpanded24.svg';

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
        ...getColumnSearchProps(col.dataIndex)
      } as ColumnType<T>;
    }
    return col;
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
      customSectionContent={expandedRowOptions?.customSectionContent && expandedRowOptions.customSectionContent(record)}
    />
  );

  return (
    <Card>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Row gutter={16} align="middle" style={{ marginBottom: 16 }}>
          {!tableOptions?.hideStatsCard && (
            <Col span={4}>
              <Card 
                className="dashboard-stat-card" 
                style={{ 
                  background: colors.status.major,
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                  padding: '8px 12px',
                  height: 'auto',
                  border: 'none'
                }}
                bodyStyle={{ padding: '0' }}
              >
                <div style={{ color: 'white' }}>
                  <div style={{ fontSize: '14px', fontWeight: 'normal' }}>
                    {title}
                  </div>
                  <div style={{ fontSize: '14px' }}>
                    {data.length} in last {weeks} {weeks === 1 ? 'week' : 'weeks'}
                  </div>
                </div>
              </Card>
            </Col>
          )}
          <Col span={tableOptions?.hideStatsCard ? 16 : 12}>
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
          expandable={{
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
                    width: '24px', 
                    height: '24px'
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
                    width: '24px', 
                    height: '24px'
                  }}
                >
                  <img src={ChildIcon} alt="Expand" style={{ width: '24px', height: '24px' }} />
                </div>
              )
            )
          }}
          size="middle"
          locale={{
            emptyText: (
              <div style={{ padding: "20px 0" }}>
                <HistoryOutlined style={{ fontSize: 36, color: "#bfbfbf", marginBottom: 10 }} />
                <p>No changes for that period.</p>
              </div>
            )
          }}
        />
      </Space>
    </Card>
  );
} 