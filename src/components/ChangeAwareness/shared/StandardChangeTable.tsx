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
  Statistic
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
          <Col span={4}>
            <Card 
              className="dashboard-stat-card" 
              style={{ 
                background: colors.getGradient(colors.brand.primary, '135deg', '20'),
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                textAlign: 'center',
                padding: '0',
                height: '100%',
                transition: 'all 0.3s',
                transform: data.length ? 'translateY(0)' : 'translateY(2px)',
                border: 'none'
              }}
              bodyStyle={{ padding: '12px' }}
            >
              <Statistic
                title={<span style={{ color: 'white', fontWeight: 'normal', fontSize: '14px' }}>{title} Changes</span>}
                value={data.length}
                valueStyle={{ color: 'white', fontWeight: 'bold', fontSize: '28px' }}
                prefix={<BarChartOutlined style={{ marginRight: '8px' }} />}
              />
              <div style={{ marginTop: '8px', fontSize: '12px', opacity: 0.8, color: 'white' }}>
                <ClockCircleOutlined style={{ marginRight: '4px' }} />
                Last {weeks} {weeks === 1 ? 'week' : 'weeks'}
              </div>
            </Card>
          </Col>
          <Col span={12}>
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
            expandedRowRender
          }}
          size="middle"
        />
      </Space>
    </Card>
  );
} 