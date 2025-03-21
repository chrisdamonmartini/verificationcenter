import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import { FiChevronUp, FiChevronDown, FiFilter } from 'react-icons/fi';

const VerificationMatrixView: React.FC = () => {
  // State for sorting and filtering
  const [sortField, setSortField] = useState<string>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filters, setFilters] = useState<Record<string, string>>({
    category: 'All Categories',
    status: 'All Statuses'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  // This would be loaded from a data source in a real application
  const verificationData = [
    {
      id: 'SR-001',
      description: 'The system shall provide navigation accuracy of ±10 meters',
      category: 'Performance',
      inspection: false,
      analysis: true,
      demonstration: false,
      test: true,
      flightTest: true,
      simulation: true,
      status: 'In Progress'
    },
    {
      id: 'SR-002',
      description: 'The system shall operate in temperature ranges from -40°C to +60°C',
      category: 'Environmental',
      inspection: false,
      analysis: true,
      demonstration: false,
      test: true,
      flightTest: false,
      simulation: false,
      status: 'Verified'
    },
    {
      id: 'SR-003',
      description: 'The system shall withstand shock loads of up to 10g',
      category: 'Structural',
      inspection: true,
      analysis: true,
      demonstration: false,
      test: true,
      flightTest: true,
      simulation: true,
      status: 'Not Started'
    },
    {
      id: 'SR-004',
      description: 'The system shall have a Mean Time Between Failures (MTBF) of at least 5000 hours',
      category: 'Reliability',
      inspection: false,
      analysis: true,
      demonstration: false,
      test: false,
      flightTest: false,
      simulation: true,
      status: 'Failed'
    },
    {
      id: 'SR-005',
      description: 'The system shall be maintainable by a single technician',
      category: 'Maintainability',
      inspection: true,
      analysis: false,
      demonstration: true,
      test: false,
      flightTest: false,
      simulation: false,
      status: 'Verified'
    },
    // Adding 20 more mock data entries
    {
      id: 'SR-006',
      description: 'The system shall provide real-time data processing with latency less than 100ms',
      category: 'Performance',
      inspection: false,
      analysis: true,
      demonstration: true,
      test: true,
      flightTest: false,
      simulation: true,
      status: 'In Progress'
    },
    {
      id: 'SR-007',
      description: 'The system shall maintain data integrity during power fluctuations',
      category: 'Reliability',
      inspection: false,
      analysis: true,
      demonstration: true,
      test: true,
      flightTest: false,
      simulation: true,
      status: 'Verified'
    },
    {
      id: 'SR-008',
      description: 'The system shall be capable of operating in humidity levels of 0-95%',
      category: 'Environmental',
      inspection: false,
      analysis: true,
      demonstration: false,
      test: true,
      flightTest: false,
      simulation: false,
      status: 'Not Started'
    },
    {
      id: 'SR-009',
      description: 'The system shall provide diagnostic capabilities for common failures',
      category: 'Maintainability',
      inspection: true,
      analysis: true,
      demonstration: true,
      test: false,
      flightTest: false,
      simulation: false,
      status: 'In Progress'
    },
    {
      id: 'SR-010',
      description: 'The system shall be capable of interfacing with standard communication protocols',
      category: 'Interoperability',
      inspection: false,
      analysis: true,
      demonstration: true,
      test: true,
      flightTest: false,
      simulation: true,
      status: 'Verified'
    },
    {
      id: 'SR-011',
      description: 'The system shall maintain data security during all operations',
      category: 'Security',
      inspection: false,
      analysis: true,
      demonstration: false,
      test: true,
      flightTest: false,
      simulation: true,
      status: 'In Progress'
    },
    {
      id: 'SR-012',
      description: 'The system shall provide backup capabilities for critical functions',
      category: 'Reliability',
      inspection: false,
      analysis: true,
      demonstration: true,
      test: true,
      flightTest: false,
      simulation: true,
      status: 'Not Started'
    },
    {
      id: 'SR-013',
      description: 'The system shall support multiple user roles with appropriate access controls',
      category: 'Security',
      inspection: false,
      analysis: true,
      demonstration: true,
      test: true,
      flightTest: false,
      simulation: false,
      status: 'Failed'
    },
    {
      id: 'SR-014',
      description: 'The system shall provide audit logging for all administrative actions',
      category: 'Security',
      inspection: false,
      analysis: true,
      demonstration: true,
      test: true,
      flightTest: false,
      simulation: false,
      status: 'Verified'
    },
    {
      id: 'SR-015',
      description: 'The system shall be capable of operating in altitude ranges from sea level to 10,000 feet',
      category: 'Environmental',
      inspection: false,
      analysis: true,
      demonstration: false,
      test: true,
      flightTest: true,
      simulation: false,
      status: 'In Progress'
    },
    {
      id: 'SR-016',
      description: 'The system shall maintain accuracy during GPS signal degradation',
      category: 'Performance',
      inspection: false,
      analysis: true,
      demonstration: false,
      test: true,
      flightTest: true,
      simulation: true,
      status: 'Not Started'
    },
    {
      id: 'SR-017',
      description: 'The system shall be capable of autonomous operation for periods up to 72 hours',
      category: 'Reliability',
      inspection: false,
      analysis: true,
      demonstration: true,
      test: true,
      flightTest: true,
      simulation: true,
      status: 'Verified'
    },
    {
      id: 'SR-018',
      description: 'The system shall provide user notifications for critical events within 5 seconds',
      category: 'Performance',
      inspection: false,
      analysis: true,
      demonstration: true,
      test: true,
      flightTest: false,
      simulation: true,
      status: 'In Progress'
    },
    {
      id: 'SR-019',
      description: 'The system shall be resistant to common electromagnetic interference',
      category: 'Environmental',
      inspection: false,
      analysis: true,
      demonstration: false,
      test: true,
      flightTest: false,
      simulation: false,
      status: 'Not Started'
    },
    {
      id: 'SR-020',
      description: 'The system shall implement graceful degradation for critical component failures',
      category: 'Reliability',
      inspection: false,
      analysis: true,
      demonstration: true,
      test: true,
      flightTest: false,
      simulation: true,
      status: 'Failed'
    },
    {
      id: 'SR-021',
      description: 'The system shall comply with industry standard data formats',
      category: 'Interoperability',
      inspection: true,
      analysis: true,
      demonstration: true,
      test: true,
      flightTest: false,
      simulation: false,
      status: 'Verified'
    },
    {
      id: 'SR-022',
      description: 'The system shall provide redundant power systems for critical components',
      category: 'Reliability',
      inspection: true,
      analysis: true,
      demonstration: true,
      test: true,
      flightTest: false,
      simulation: false,
      status: 'In Progress'
    },
    {
      id: 'SR-023',
      description: 'The system shall support modular component replacement within 30 minutes',
      category: 'Maintainability',
      inspection: true,
      analysis: false,
      demonstration: true,
      test: false,
      flightTest: false,
      simulation: false,
      status: 'Verified'
    },
    {
      id: 'SR-024',
      description: 'The system shall accommodate software updates without operational interruption',
      category: 'Maintainability',
      inspection: false,
      analysis: true,
      demonstration: true,
      test: true,
      flightTest: false,
      simulation: false,
      status: 'Not Started'
    },
    {
      id: 'SR-025',
      description: 'The system shall process and store up to 10TB of mission data',
      category: 'Performance',
      inspection: false,
      analysis: true,
      demonstration: false,
      test: true,
      flightTest: false,
      simulation: true,
      status: 'In Progress'
    }
  ];

  // Helper function to render status badge
  const renderStatusBadge = (status: string) => {
    let color;
    switch (status) {
      case 'Verified':
        color = 'bg-green-100 text-green-800';
        break;
      case 'In Progress':
        color = 'bg-yellow-100 text-yellow-800';
        break;
      case 'Not Started':
        color = 'bg-gray-100 text-gray-800';
        break;
      default:
        color = 'bg-blue-100 text-blue-800';
    }
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>{status}</span>;
  };

  // Helper function to render verification method icons with different statuses
  const renderMethodStatus = (isActive: boolean, itemStatus: string, itemId: string, methodType: string) => {
    if (!isActive) return null;
    
    // Use item ID to derive a consistent status for demo purposes
    const hashCode = itemId.split('-')[1];
    const lastNum = parseInt(hashCode) || 0;
    
    // Use different logic for each method type to demonstrate progression
    // Analysis is always independent
    if (methodType === 'analysis') {
      if (itemStatus === 'Verified') {
        return <FaIcons.FaCheck className="mx-auto text-green-500" />;
      } else if (itemStatus === 'In Progress') {
        const statusMod = lastNum % 4;
        if (statusMod === 0) return <FaIcons.FaArrowRight className="mx-auto text-yellow-600" />;
        if (statusMod === 1) return <FaIcons.FaClock className="mx-auto text-green-500" />;
        if (statusMod === 2) return <FaIcons.FaClock className="mx-auto text-red-500" />;
        return <FaIcons.FaTimes className="mx-auto text-red-500" />;
      }
      return <FaIcons.FaArrowRight className="mx-auto text-yellow-600" />;
    }
    
    // Unit Test depends on Analysis
    if (methodType === 'test') {
      // If the item ID is even, Analysis is incomplete so Unit Test can't start
      if (lastNum % 2 === 0) {
        return null; // Can't start until Analysis is completed
      }
      // Analysis complete, show Unit Test status
      if (itemStatus === 'Verified') {
        return <FaIcons.FaCheck className="mx-auto text-green-500" />;
      } else {
        const statusMod = (lastNum + 1) % 4;
        if (statusMod === 0) return <FaIcons.FaArrowRight className="mx-auto text-yellow-600" />;
        if (statusMod === 1) return <FaIcons.FaClock className="mx-auto text-green-500" />;
        if (statusMod === 2) return <FaIcons.FaClock className="mx-auto text-red-500" />;
        return <FaIcons.FaTimes className="mx-auto text-red-500" />;
      }
    }
    
    // Demo depends on Unit Test
    if (methodType === 'demonstration') {
      // If the item ID is not divisible by 3, Unit Test is incomplete
      if (lastNum % 3 !== 0) {
        return null; // Can't start until Unit Test is completed
      }
      // Unit Test complete, show Demo status
      if (itemStatus === 'Verified') {
        return <FaIcons.FaCheck className="mx-auto text-green-500" />;
      } else {
        const statusMod = (lastNum + 2) % 4;
        if (statusMod === 0) return <FaIcons.FaArrowRight className="mx-auto text-yellow-600" />;
        if (statusMod === 1) return <FaIcons.FaClock className="mx-auto text-green-500" />;
        if (statusMod === 2) return <FaIcons.FaClock className="mx-auto text-red-500" />;
        return <FaIcons.FaTimes className="mx-auto text-red-500" />;
      }
    }
    
    // Flight Test depends on Demo
    if (methodType === 'flightTest') {
      // If the item ID is not divisible by 5, Demo is incomplete
      if (lastNum % 5 !== 0) {
        return null; // Can't start until Demo is completed
      }
      // Demo complete, show Flight Test status
      if (itemStatus === 'Verified') {
        return <FaIcons.FaCheck className="mx-auto text-green-500" />;
      } else {
        const statusMod = (lastNum + 3) % 4;
        if (statusMod === 0) return <FaIcons.FaArrowRight className="mx-auto text-yellow-600" />;
        if (statusMod === 1) return <FaIcons.FaClock className="mx-auto text-green-500" />;
        if (statusMod === 2) return <FaIcons.FaClock className="mx-auto text-red-500" />;
        return <FaIcons.FaTimes className="mx-auto text-red-500" />;
      }
    }
    
    return null;
  };

  // Function to handle sort
  const handleSort = (field: string) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Function to handle filter changes
  const handleFilterChange = (filterName: string, value: string) => {
    setFilters({
      ...filters,
      [filterName]: value
    });
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Function to get unique category values
  const getUniqueCategories = () => {
    const categories = verificationData.map(item => item.category);
    return ['All Categories', ...Array.from(new Set(categories))];
  };

  // Function to get unique status values
  const getUniqueStatuses = () => {
    const statuses = verificationData.map(item => item.status);
    return ['All Statuses', ...Array.from(new Set(statuses))];
  };

  // Function to render sort indicator
  const renderSortIndicator = (field: string) => {
    if (sortField === field) {
      return sortDirection === 'asc' ? 
        <FiChevronUp className="inline ml-1" /> : 
        <FiChevronDown className="inline ml-1" />;
    }
    return null;
  };

  // Filter and sort data
  const filteredAndSortedData = verificationData
    .filter(item => {
      return (filters.category === 'All Categories' || item.category === filters.category) &&
             (filters.status === 'All Statuses' || item.status === filters.status);
    })
    .sort((a, b) => {
      const aValue = a[sortField as keyof typeof a];
      const bValue = b[sortField as keyof typeof b];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
        return sortDirection === 'asc' 
          ? (aValue === bValue ? 0 : aValue ? -1 : 1)
          : (aValue === bValue ? 0 : aValue ? 1 : -1);
      }
      
      return 0;
    });

  // Paginate data
  const paginatedData = filteredAndSortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaIcons.FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <select 
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            {getUniqueCategories().map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select 
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            {getUniqueStatuses().map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        
        {/* Status legend - moved inline with filters */}
        <div className="flex items-center space-x-3">
          <FaIcons.FaCheck className="text-green-500" /> 
          <span className="mr-3">Completed</span>
          
          <FaIcons.FaArrowRight className="text-yellow-600" /> 
          <span className="mr-3">In Progress</span>
          
          <FaIcons.FaClock className="text-green-500" /> 
          <span className="mr-3">On Schedule</span>
          
          <FaIcons.FaClock className="text-red-500" /> 
          <span className="mr-3">Late</span>
          
          <FaIcons.FaTimes className="text-red-500" /> 
          <span className="mr-3">Failed</span>
        </div>
        
        <div className="flex space-x-2">
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 flex items-center">
            <FaIcons.FaFileExport className="mr-2" />
            Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th 
                className="py-3 px-4 text-left font-medium text-gray-600 cursor-pointer"
                onClick={() => handleSort('id')}
              >
                ID {renderSortIndicator('id')}
              </th>
              <th 
                className="py-3 px-4 text-left font-medium text-gray-600 cursor-pointer"
                onClick={() => handleSort('description')}
              >
                Description {renderSortIndicator('description')}
              </th>
              <th 
                className="py-3 px-4 text-left font-medium text-gray-600 cursor-pointer"
                onClick={() => handleSort('category')}
              >
                Category {renderSortIndicator('category')}
              </th>
              <th 
                className="py-3 px-4 text-center font-medium text-gray-600 cursor-pointer"
                onClick={() => handleSort('analysis')}
              >
                <div className="flex flex-col items-center">
                  <FaIcons.FaCalculator className="mb-1" />
                  <span>Analysis {renderSortIndicator('analysis')}</span>
                </div>
              </th>
              <th 
                className="py-3 px-4 text-center font-medium text-gray-600 cursor-pointer"
                onClick={() => handleSort('test')}
              >
                <div className="flex flex-col items-center">
                  <FaIcons.FaFlask className="mb-1" />
                  <span>Unit Test {renderSortIndicator('test')}</span>
                </div>
              </th>
              <th 
                className="py-3 px-4 text-center font-medium text-gray-600 cursor-pointer"
                onClick={() => handleSort('demonstration')}
              >
                <div className="flex flex-col items-center">
                  <FaIcons.FaPlay className="mb-1" />
                  <span>Demo {renderSortIndicator('demonstration')}</span>
                </div>
              </th>
              <th 
                className="py-3 px-4 text-center font-medium text-gray-600 cursor-pointer"
                onClick={() => handleSort('flightTest')}
              >
                <div className="flex flex-col items-center">
                  <FaIcons.FaPlane className="mb-1" />
                  <span>Flight Test {renderSortIndicator('flightTest')}</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={item.id} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                <td className="py-3 px-4 text-blue-600 font-medium">{item.id}</td>
                <td className="py-3 px-4">{item.description}</td>
                <td className="py-3 px-4">{item.category}</td>
                <td className="py-3 px-4 text-center">
                  {renderMethodStatus(item.analysis, item.status, item.id, 'analysis')}
                </td>
                <td className="py-3 px-4 text-center">
                  {renderMethodStatus(item.test, item.status, item.id, 'test')}
                </td>
                <td className="py-3 px-4 text-center">
                  {renderMethodStatus(item.demonstration, item.status, item.id, 'demonstration')}
                </td>
                <td className="py-3 px-4 text-center">
                  {renderMethodStatus(item.flightTest, item.status, item.id, 'flightTest')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination controls */}
      <div className="mt-4 flex items-center justify-between">
        <div>
          <span className="text-sm text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)} of {filteredAndSortedData.length} items
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Previous
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            // Show at most 5 page numbers centered around the current page
            let pageNum = currentPage;
            if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            
            if (pageNum > 0 && pageNum <= totalPages) {
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 rounded ${currentPage === pageNum ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  {pageNum}
                </button>
              );
            }
            return null;
          })}
          <button
            onClick={() => setCurrentPage(page => Math.min(page + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationMatrixView; 