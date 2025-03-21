import { useState, useEffect, useCallback } from 'react';
import { message, Input, Button } from 'antd';
import { getFilteredChanges } from '../../../mockData/changeAwarenessData';
import { BaseChange } from '../../../types/changeAwareness';

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
      const allChanges = getFilteredChanges(productType as 'missile' | 'fighter', weeks);
      
      // Map domain to the appropriate key in the changes object
      const domainMap: Record<string, string> = {
        'mission': 'missionChanges',
        'operationalScenario': 'operationalScenariosChanges',
        'requirement': 'requirementsChanges',
        'parameter': 'parameterChanges',
        'function': 'functionsChanges',
        'logical': 'logicalChanges',
        'cad': 'cadDesignChanges',
        'bom': 'engineeringBOMChanges'
      };
      
      const key = domainMap[domain];
      if (key && allChanges[key as keyof typeof allChanges]) {
        // Set the data with the appropriate domain changes
        setData(allChanges[key as keyof typeof allChanges] as unknown as T[]);
      } else {
        console.error(`Invalid domain: ${domain}`);
        setData([]);
      }
    } catch (error) {
      console.error(`Error fetching ${domain} changes:`, error);
      message.error(`Failed to load ${domain} changes. Please try again later.`);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [domain, weeks, productType]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleViewDetails = useCallback((record: T) => {
    setSelectedChange(record);
    setIsDetailsVisible(true);
  }, []);

  const handleCloseDetails = useCallback(() => {
    setIsDetailsVisible(false);
  }, []);

  return {
    data,
    loading,
    selectedChange,
    isDetailsVisible,
    handleViewDetails,
    handleCloseDetails,
    refreshData: fetchData
  };
};

// Hook for handling pagination
export const usePagination = (defaultPageSize: number = 25) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(defaultPageSize);

  const handlePageChange = useCallback((page: number, size?: number) => {
    setCurrentPage(page);
    if (size) setPageSize(size);
  }, []);

  const resetPagination = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return {
    currentPage,
    pageSize,
    handlePageChange,
    resetPagination,
    paginationProps: {
      current: currentPage,
      pageSize,
      onChange: handlePageChange,
      showSizeChanger: false,
      showTotal: (total: number) => `Total ${total} items`
    }
  };
};

// Hook for handling filtering and sorting
export const useTableControls = () => {
  const [sortedInfo, setSortedInfo] = useState<any>({});
  const [filteredInfo, setFilteredInfo] = useState<any>({});

  const handleTableChange = useCallback((pagination: any, filters: any, sorter: any) => {
    setSortedInfo(sorter);
    setFilteredInfo(filters);
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilteredInfo({});
  }, []);

  const clearSorters = useCallback(() => {
    setSortedInfo({});
  }, []);

  const resetTableControls = useCallback(() => {
    setFilteredInfo({});
    setSortedInfo({});
  }, []);

  return {
    sortedInfo,
    filteredInfo,
    handleTableChange,
    clearAllFilters,
    clearSorters,
    resetTableControls
  };
};

// Hook for handling selected row state
export const useRowSelection = <T extends { id: string }>(
  onSelectionChange?: (selectedRowKeys: React.Key[], selectedRows: T[]) => void
) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const handleSelectionChange = useCallback((selectedKeys: React.Key[], selectedRows: T[]) => {
    setSelectedRowKeys(selectedKeys);
    if (onSelectionChange) {
      onSelectionChange(selectedKeys, selectedRows);
    }
  }, [onSelectionChange]);

  const clearSelection = useCallback(() => {
    setSelectedRowKeys([]);
  }, []);

  const toggleSelection = useCallback((key: React.Key) => {
    setSelectedRowKeys(prev => {
      if (prev.includes(key)) {
        return prev.filter(k => k !== key);
      } else {
        return [...prev, key];
      }
    });
  }, []);

  return {
    selectedRowKeys,
    rowSelection: {
      selectedRowKeys,
      onChange: handleSelectionChange,
      selections: [
        {
          key: 'all-data',
          text: 'Select All Data',
          onSelect: (changableRowKeys: React.Key[]) => {
            setSelectedRowKeys(changableRowKeys);
          },
        },
        {
          key: 'clear-all',
          text: 'Clear All',
          onSelect: () => {
            setSelectedRowKeys([]);
          },
        },
      ],
    },
    clearSelection,
    toggleSelection,
    hasSelected: selectedRowKeys.length > 0
  };
};

// Hook for search functionality
export const useTableSearch = <T extends Record<string, any>>(data: T[], searchableFields: string[]) => {
  const [searchText, setSearchText] = useState<string>('');
  const [searchedColumn, setSearchedColumn] = useState<string>('');

  const handleSearch = useCallback((selectedKeys: React.Key[], confirm: () => void, dataIndex: string) => {
    confirm();
    setSearchText(selectedKeys[0] as string);
    setSearchedColumn(dataIndex);
  }, []);

  const handleReset = useCallback((clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  }, []);

  const filteredData = useCallback((dataSource: T[]) => {
    if (!searchText) {
      return dataSource;
    }
    
    return dataSource.filter(record => {
      return searchableFields.some(field => {
        const value = record[field];
        if (value === undefined || value === null) return false;
        
        return String(value).toLowerCase().includes(searchText.toLowerCase());
      });
    });
  }, [searchText, searchableFields]);

  const getColumnSearchProps = useCallback((dataIndex: string) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            onClick={() => handleReset(clearFilters)}
            style={{ width: '45%' }}
            size="small"
          >
            Reset
          </Button>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
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
    },
    onFilterDropdownVisibleChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => {
          const input = document.querySelector('.ant-table-filter-dropdown input') as HTMLInputElement;
          if (input) input.focus();
        }, 0);
      }
    }
  }), [handleSearch, handleReset]);

  return {
    searchText,
    searchedColumn,
    filteredData,
    getColumnSearchProps,
    setSearchText
  };
}; 