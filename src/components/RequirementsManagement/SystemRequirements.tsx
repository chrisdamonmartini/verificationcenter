import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaEdit, FaTrash, FaPlus, FaSort, FaSortUp, FaSortDown, FaEye, FaFileExport, FaFileImport } from 'react-icons/fa';
import { useProduct } from '../../context/ProductContext';
import { getRequirementsData } from '../../data';

// Define the requirement interface
interface Requirement {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  category: string;
  createdBy: string;
  createdDate: string;
  updatedBy: string | null;
  updatedDate: string | null;
  version: string;
  tags: string[];
  verificationMethod?: string;
  // Other optional properties
  type?: string;
  source?: string;
  verification?: string;
  parentRequirement?: string | null;
  childRequirements?: string[];
  rationale?: string;
}

const SystemRequirements: React.FC = () => {
  // Use product context
  const { productType, productName } = useProduct();
  
  // Local state for requirements
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  
  // Load requirements based on product type
  useEffect(() => {
    const data = getRequirementsData(productType);
    setRequirements(data.systemRequirements);
  }, [productType]);

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [selectedRequirement, setSelectedRequirement] = useState<Requirement | null>(null);
  
  // State for sorting
  const [sortField, setSortField] = useState<keyof Requirement>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Filter requirements based on search and filters
  const filteredRequirements = requirements.filter(req => {
    return (
      (searchTerm === '' || 
        req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      ) &&
      (statusFilter === null || req.status === statusFilter) &&
      (typeFilter === null || req.type === typeFilter) &&
      (priorityFilter === null || req.priority === priorityFilter) &&
      (categoryFilter === null || req.category === categoryFilter)
    );
  });

  // Sort requirements
  const sortedRequirements = [...filteredRequirements].sort((a, b) => {
    // Handle potential null/undefined values safely
    const aValue = a[sortField] ?? '';
    const bValue = b[sortField] ?? '';
    
    if (aValue < bValue) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Handle sort click
  const handleSort = (field: keyof Requirement) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Get sort icon
  const getSortIcon = (field: keyof Requirement) => {
    if (sortField !== field) {
      return <FaSort className="ml-1" />;
    }
    return sortDirection === 'asc' ? <FaSortUp className="ml-1" /> : <FaSortDown className="ml-1" />;
  };

  // Get unique values for filters
  const uniqueStatuses = Array.from(new Set(requirements.map(req => req.status)));
  const uniqueTypes = Array.from(new Set(requirements.map(req => req.type)));
  const uniquePriorities = Array.from(new Set(requirements.map(req => req.priority)));
  const uniqueCategories = Array.from(new Set(requirements.map(req => req.category)));

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      case 'Implemented': return 'bg-purple-100 text-purple-800';
      case 'Verified': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle requirement selection
  const handleSelectRequirement = (requirement: Requirement) => {
    setSelectedRequirement(requirement);
  };

  // Handle close detail view
  const handleCloseDetail = () => {
    setSelectedRequirement(null);
  };

  return (
    <div className="bg-gray-50 p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">System Requirements</h1>
        
        {/* Controls */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-semibold">Requirements Management</h2>
              <p className="text-gray-600">Manage and track system requirements</p>
            </div>
            <div className="flex space-x-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center text-sm">
                <FaPlus className="mr-2" /> New Requirement
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center text-sm">
                <FaFileImport className="mr-2" /> Import
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center text-sm">
                <FaFileExport className="mr-2" /> Export
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by ID, title, description, or tags..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="absolute left-3 top-2.5 text-gray-400">
                  <FaSearch />
                </span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                className="border border-gray-300 rounded-md p-2 w-full"
                value={statusFilter || ''}
                onChange={(e) => setStatusFilter(e.target.value === '' ? null : e.target.value)}
              >
                <option value="">All Statuses</option>
                {uniqueStatuses.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                className="border border-gray-300 rounded-md p-2 w-full"
                value={typeFilter || ''}
                onChange={(e) => setTypeFilter(e.target.value === '' ? null : e.target.value)}
              >
                <option value="">All Types</option>
                {uniqueTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                className="border border-gray-300 rounded-md p-2 w-full"
                value={priorityFilter || ''}
                onChange={(e) => setPriorityFilter(e.target.value === '' ? null : e.target.value)}
              >
                <option value="">All Priorities</option>
                {uniquePriorities.map((priority) => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex items-end justify-end mt-4">
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center text-sm"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter(null);
                setTypeFilter(null);
                setPriorityFilter(null);
                setCategoryFilter(null);
              }}
            >
              <FaFilter className="mr-2" /> Reset Filters
            </button>
          </div>
        </div>
        
        {/* Requirements Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('id')}
                  >
                    <div className="flex items-center">
                      ID {getSortIcon('id')}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('title')}
                  >
                    <div className="flex items-center">
                      Title {getSortIcon('title')}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('type')}
                  >
                    <div className="flex items-center">
                      Type {getSortIcon('type')}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('priority')}
                  >
                    <div className="flex items-center">
                      Priority {getSortIcon('priority')}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center">
                      Status {getSortIcon('status')}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('verification')}
                  >
                    <div className="flex items-center">
                      Verification {getSortIcon('verification')}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedRequirements.map((req) => (
                  <tr 
                    key={req.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleSelectRequirement(req)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {req.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 line-clamp-2">{req.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {req.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(req.priority)}`}>
                        {req.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(req.status)}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {req.verification}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectRequirement(req);
                        }}
                      >
                        <FaEye />
                      </button>
                      <button
                        className="text-blue-600 hover:text-blue-900 mr-3"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Edit functionality would go here
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Delete functionality would go here
                        }}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredRequirements.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-gray-500">No requirements match your search criteria</p>
            </div>
          ) : (
            <div className="px-6 py-3 bg-gray-50 text-sm text-gray-500">
              Showing {filteredRequirements.length} of {requirements.length} requirements
            </div>
          )}
        </div>
        
        {/* Requirement Detail Modal */}
        {selectedRequirement && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={handleCloseDetail}>
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedRequirement.id}</h2>
                    <div className="text-sm text-gray-500 mt-1">Version: {selectedRequirement.version}</div>
                  </div>
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedRequirement.status)}`}>
                      {selectedRequirement.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(selectedRequirement.priority)}`}>
                      {selectedRequirement.priority}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Title</h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                    {selectedRequirement.title}
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg whitespace-pre-line">
                    {selectedRequirement.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Details</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Type</p>
                          <p className="text-gray-700">{selectedRequirement.type}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Category</p>
                          <p className="text-gray-700">{selectedRequirement.category}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Source</p>
                          <p className="text-gray-700">{selectedRequirement.source}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Verification Method</p>
                          <p className="text-gray-700">{selectedRequirement.verification}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Created By</p>
                          <p className="text-gray-700">{selectedRequirement.createdBy}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Created Date</p>
                          <p className="text-gray-700">{selectedRequirement.createdDate}</p>
                        </div>
                        {selectedRequirement.updatedBy && (
                          <>
                            <div>
                              <p className="text-sm text-gray-500">Updated By</p>
                              <p className="text-gray-700">{selectedRequirement.updatedBy}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Updated Date</p>
                              <p className="text-gray-700">{selectedRequirement.updatedDate}</p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Relationships</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      {selectedRequirement.parentRequirement && (
                        <div className="mb-4">
                          <p className="text-sm text-gray-500 mb-1">Parent Requirement</p>
                          <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm inline-block">
                            {selectedRequirement.parentRequirement}
                          </div>
                        </div>
                      )}
                      
                      {selectedRequirement.childRequirements && selectedRequirement.childRequirements.length > 0 && (
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Child Requirements</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedRequirement.childRequirements.map((req) => (
                              <span key={req} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm">
                                {req}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {!selectedRequirement.parentRequirement && selectedRequirement.childRequirements && selectedRequirement.childRequirements.length === 0 && (
                        <p className="text-gray-500">No relationships defined</p>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold mt-4 mb-2">Rationale</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700">{selectedRequirement.rationale}</p>
                    </div>
                    
                    <h3 className="text-lg font-semibold mt-4 mb-2">Tags</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex flex-wrap gap-2">
                        {selectedRequirement.tags.map((tag) => (
                          <span key={tag} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button 
                    className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                    onClick={handleCloseDetail}
                  >
                    Close
                  </button>
                  <button className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none">
                    Edit Requirement
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemRequirements; 