import { useState, useEffect, useCallback } from 'react';
import { message, Input, Button } from 'antd';
import { getFilteredChanges, ChangesMap } from '../../../mockData/changeAwarenessData';
import { BaseChange } from '../../../types/changeAwareness';

type ProductType = 'missile' | 'fighter';

// Hook for fetching and managing changes data
export const useChangesData = <T extends BaseChange>(
  domain: string,
  weeks: number = 2,
  productType: string = 'missile'
) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedChange, setSelectedChange] = useState<T | null>(null);
  const [isDetailsVisible, setIsDetailsVisible] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Get all changes from the service
      console.log(`Fetching data for domain: ${domain}, weeks: ${weeks}, productType: ${productType}`);
      const allChanges = getFilteredChanges(domain as keyof ChangesMap, weeks, productType as ProductType);
      console.log('Fetched changes:', allChanges);
      
      // Convert to the generic type T
      setData(allChanges as unknown as T[]);
    } catch (error) {
      console.error(`Error fetching ${domain} changes:`, error);
      message.error(`Failed to load ${domain} changes. Please try again later.`);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [domain, weeks, productType]);

  // Load data on initial render and when filters change
  useEffect(() => {
    console.log('useEffect triggered, calling fetchData');
    fetchData();
  }, [fetchData]);

  // Show details modal for a specific change
  const showDetails = useCallback((change: T) => {
    setSelectedChange(change);
    setIsDetailsVisible(true);
  }, []);

  // Hide details modal
  const hideDetails = useCallback(() => {
    setIsDetailsVisible(false);
  }, []);

  return {
    data,
    loading,
    selectedChange,
    isDetailsVisible,
    handleViewDetails: showDetails,
    handleCloseDetails: hideDetails,
    refreshData: fetchData
  };
};

// Hook for pagination state management
export const usePagination = (defaultPageSize: number = 25) => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const onChange = useCallback((page: number, size: number) => {
    setCurrent(page);
    setPageSize(size);
  }, []);

  const reset = useCallback(() => {
    setCurrent(1);
  }, []);

  return {
    current,
    pageSize,
    onChange,
    reset,
    paginationProps: {
      current,
      pageSize,
      onChange,
      showSizeChanger: true,
      showTotal: (total: number) => `Total ${total} items`
    }
  };
};

// Hook for table controls (search, sort, filter)
export const useTableControls = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [sortedInfo, setSortedInfo] = useState<any>({});
  const [filteredInfo, setFilteredInfo] = useState<any>({});

  const handleSearch = useCallback((selectedKeys: string[], confirm: Function, dataIndex: string) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  }, []);

  const handleReset = useCallback((clearFilters: Function) => {
    clearFilters();
    setSearchText('');
  }, []);

  const clearAll = useCallback(() => {
    setSearchText('');
    setSearchedColumn('');
    setSortedInfo({});
    setFilteredInfo({});
  }, []);

  return {
    searchText,
    searchedColumn,
    sortedInfo,
    filteredInfo,
    handleSearch,
    handleReset,
    setSortedInfo,
    setFilteredInfo,
    clearAll,
    handleTableChange: (pagination: any, filters: any, sorter: any) => {
      setSortedInfo(sorter);
      setFilteredInfo(filters);
    },
    clearAllFilters: () => {
      setFilteredInfo({});
    },
    resetTableControls: () => {
      setSearchText('');
      setSearchedColumn('');
      setSortedInfo({});
      setFilteredInfo({});
    }
  };
};

// Hook for row selection in table
export const useRowSelection = <T extends { id: string }>(
  onSelectionChange?: (selectedRowKeys: React.Key[], selectedRows: T[]) => void
) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  const onSelectChange = useCallback((selectedKeys: React.Key[], rows: T[]) => {
    setSelectedRowKeys(selectedKeys);
    setSelectedRows(rows);
    if (onSelectionChange) {
      onSelectionChange(selectedKeys, rows);
    }
  }, [onSelectionChange]);

  const selectAll = useCallback((data: T[]) => {
    const keys = data.map(item => item.id);
    setSelectedRowKeys(keys);
    setSelectedRows(data);
    if (onSelectionChange) {
      onSelectionChange(keys, data);
    }
  }, [onSelectionChange]);

  const deselectAll = useCallback(() => {
    setSelectedRowKeys([]);
    setSelectedRows([]);
    if (onSelectionChange) {
      onSelectionChange([], []);
    }
  }, [onSelectionChange]);

  const isSelected = useCallback((id: string) => {
    return selectedRowKeys.includes(id);
  }, [selectedRowKeys]);

  const toggleSelection = useCallback((item: T) => {
    if (isSelected(item.id)) {
      const newKeys = selectedRowKeys.filter(key => key !== item.id);
      const newRows = selectedRows.filter(row => row.id !== item.id);
      setSelectedRowKeys(newKeys);
      setSelectedRows(newRows);
      if (onSelectionChange) {
        onSelectionChange(newKeys, newRows);
      }
    } else {
      const newKeys = [...selectedRowKeys, item.id];
      const newRows = [...selectedRows, item];
      setSelectedRowKeys(newKeys);
      setSelectedRows(newRows);
      if (onSelectionChange) {
        onSelectionChange(newKeys, newRows);
      }
    }
  }, [selectedRowKeys, selectedRows, isSelected, onSelectionChange]);

  return {
    selectedRowKeys,
    selectedRows,
    onSelectChange,
    selectAll,
    deselectAll,
    isSelected,
    toggleSelection,
    rowSelection: {
      selectedRowKeys,
      onChange: onSelectChange,
    },
    hasSelected: selectedRowKeys.length > 0
  };
};

// Hook for search functionality in tables
export const useTableSearch = <T extends Record<string, any>>(data: T[], searchableFields: string[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState<T[]>(data);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredData(data);
      return;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = data.filter(item => {
      return searchableFields.some(field => {
        const value = item[field];
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(lowerCaseQuery);
      });
    });

    setFilteredData(filtered);
  }, [data, searchQuery, searchableFields]);

  const renderSearchInput = useCallback(() => {
    return (
      <Input.Search
        placeholder="Search..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        onSearch={value => setSearchQuery(value)}
        style={{ width: 200 }}
        allowClear
      />
    );
  }, [searchQuery]);

  const resetSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    filteredData: (data: T[]) => {
      if (!searchQuery) {
        return data;
      }

      const lowerCaseQuery = searchQuery.toLowerCase();
      return data.filter(item => {
        return searchableFields.some(field => {
          const value = item[field];
          if (value === null || value === undefined) return false;
          return String(value).toLowerCase().includes(lowerCaseQuery);
        });
      });
    },
    renderSearchInput,
    resetSearch,
    searchText: searchQuery,
    setSearchText: setSearchQuery,
    getColumnSearchProps: (dataIndex: string) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => {
              confirm();
              setSearchQuery(selectedKeys[0]);
            }}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              onClick={() => {
                clearFilters && clearFilters();
                setSearchQuery('');
              }}
              style={{ width: '45%' }}
              size="small"
            >
              Reset
            </Button>
            <Button
              type="primary"
              onClick={() => {
                confirm();
                setSearchQuery(selectedKeys[0]);
              }}
              style={{ width: '45%' }}
              size="small"
            >
              Search
            </Button>
          </div>
        </div>
      ),
      onFilter: (value: string, record: T) => {
        const data = record[dataIndex];
        return data ? data.toString().toLowerCase().includes(value.toLowerCase()) : false;
      }
    })
  };
}; 