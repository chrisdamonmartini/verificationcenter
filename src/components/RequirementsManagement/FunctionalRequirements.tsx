import React, { useState } from 'react';
import { FaSearch, FaFilter, FaEdit, FaTrash, FaPlus, FaSort, FaSortUp, FaSortDown, FaEye, FaFileExport, FaFileImport, FaExchangeAlt, FaLink } from 'react-icons/fa';

// Define the functional requirement interface
interface FunctionalRequirement {
  id: string;
  title: string;
  description: string;
  systemRequirement: string | null; // Reference to parent system requirement
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Draft' | 'Approved' | 'Rejected' | 'Under Review' | 'Implemented' | 'Verified';
  category: string;
  functionality: string; // Type of functionality
  inputs: string[];
  outputs: string[];
  constraints: string;
  createdBy: string;
  createdDate: string;
  updatedBy: string | null;
  updatedDate: string | null;
  version: string;
  dependsOn: string[]; // Dependencies on other functional requirements
  verificationCriteria: string;
  tags: string[];
}

const FunctionalRequirements: React.FC = () => {
  // Sample data for functional requirements
  const [functionalRequirements, setFunctionalRequirements] = useState<FunctionalRequirement[]>([
    {
      id: 'FUNC-REQ-001',
      title: 'User Authentication',
      description: 'The system shall authenticate users based on username and password credentials.',
      systemRequirement: 'SYS-REQ-008',
      priority: 'Critical',
      status: 'Approved',
      category: 'Security',
      functionality: 'Authentication',
      inputs: ['Username', 'Password'],
      outputs: ['Authentication Token', 'User Session'],
      constraints: 'Authentication must complete within 3 seconds',
      createdBy: 'Jennifer Lee',
      createdDate: '2023-04-10',
      updatedBy: 'David Wilson',
      updatedDate: '2023-05-15',
      version: '1.3',
      dependsOn: [],
      verificationCriteria: 'Successful login with valid credentials, rejection of invalid credentials',
      tags: ['Security', 'Authentication', 'User']
    },
    {
      id: 'FUNC-REQ-002',
      title: 'Data Encryption',
      description: 'The system shall encrypt all sensitive data using AES-256 encryption.',
      systemRequirement: 'SYS-REQ-008',
      priority: 'Critical',
      status: 'Approved',
      category: 'Security',
      functionality: 'Data Protection',
      inputs: ['Unencrypted Data'],
      outputs: ['Encrypted Data'],
      constraints: 'Encryption/decryption must not add more than 100ms to processing time',
      createdBy: 'Jennifer Lee',
      createdDate: '2023-04-12',
      updatedBy: null,
      updatedDate: null,
      version: '1.0',
      dependsOn: [],
      verificationCriteria: 'Data stored in database is encrypted; data in transit is encrypted',
      tags: ['Security', 'Encryption', 'Data Protection']
    },
    {
      id: 'FUNC-REQ-003',
      title: 'Navigation Route Calculation',
      description: 'The system shall calculate optimal routes based on current traffic conditions.',
      systemRequirement: 'SYS-REQ-001',
      priority: 'High',
      status: 'Implemented',
      category: 'Navigation',
      functionality: 'Route Planning',
      inputs: ['Start Location', 'Destination', 'Traffic Data'],
      outputs: ['Route', 'ETA', 'Distance'],
      constraints: 'Route calculation must complete within 5 seconds',
      createdBy: 'Michael Chen',
      createdDate: '2023-04-15',
      updatedBy: 'Sarah Johnson',
      updatedDate: '2023-06-10',
      version: '2.1',
      dependsOn: ['FUNC-REQ-007'],
      verificationCriteria: 'Routes avoid high traffic areas; calculations complete in required time',
      tags: ['Navigation', 'Algorithm', 'Performance']
    },
    {
      id: 'FUNC-REQ-004',
      title: 'Real-time Traffic Updates',
      description: 'The system shall provide real-time traffic updates every 5 minutes.',
      systemRequirement: 'SYS-REQ-002',
      priority: 'Medium',
      status: 'Implemented',
      category: 'Navigation',
      functionality: 'Data Acquisition',
      inputs: ['Traffic API', 'Geographic Location'],
      outputs: ['Traffic Status', 'Incident Reports'],
      constraints: 'Updates must not consume more than 10MB of data per hour',
      createdBy: 'Michael Chen',
      createdDate: '2023-04-18',
      updatedBy: 'Sarah Johnson',
      updatedDate: '2023-06-12',
      version: '1.5',
      dependsOn: [],
      verificationCriteria: 'Traffic data is updated within specified intervals; data usage within limits',
      tags: ['Navigation', 'Real-time', 'Data']
    },
    {
      id: 'FUNC-REQ-005',
      title: 'User Preference Storage',
      description: 'The system shall store and retrieve user preferences across sessions.',
      systemRequirement: 'SYS-REQ-010',
      priority: 'Medium',
      status: 'Approved',
      category: 'User Experience',
      functionality: 'Data Storage',
      inputs: ['User ID', 'Preferences Data'],
      outputs: ['Success/Failure Status'],
      constraints: 'Preferences must be restored within 1 second of login',
      createdBy: 'Emily Roberts',
      createdDate: '2023-04-25',
      updatedBy: null,
      updatedDate: null,
      version: '1.0',
      dependsOn: ['FUNC-REQ-001'],
      verificationCriteria: 'User preferences persist across logout/login cycles',
      tags: ['User Experience', 'Storage', 'Preferences']
    },
    {
      id: 'FUNC-REQ-006',
      title: 'Route Guidance Voice Instructions',
      description: 'The system shall provide voice-guided turn-by-turn navigation instructions.',
      systemRequirement: 'SYS-REQ-003',
      priority: 'High',
      status: 'Under Review',
      category: 'Navigation',
      functionality: 'User Interface',
      inputs: ['Current Location', 'Route Data', 'User Settings'],
      outputs: ['Voice Prompts', 'Visual Instructions'],
      constraints: 'Voice instructions must be delivered 100 meters before required action',
      createdBy: 'Robert Kim',
      createdDate: '2023-05-02',
      updatedBy: 'Michael Chen',
      updatedDate: '2023-06-15',
      version: '1.4',
      dependsOn: ['FUNC-REQ-003'],
      verificationCriteria: 'Voice prompts are clear and timely; multiple language support',
      tags: ['Navigation', 'Voice', 'User Interface']
    },
    {
      id: 'FUNC-REQ-007',
      title: 'Location Services',
      description: 'The system shall determine current location using GPS, network, and sensor fusion.',
      systemRequirement: 'SYS-REQ-001',
      priority: 'Critical',
      status: 'Verified',
      category: 'Navigation',
      functionality: 'Positioning',
      inputs: ['GPS Signal', 'Network Data', 'Sensor Data'],
      outputs: ['Location Coordinates', 'Accuracy Estimate'],
      constraints: 'Must function in GPS-denied environments with reduced accuracy',
      createdBy: 'Michael Chen',
      createdDate: '2023-04-05',
      updatedBy: 'Robert Kim',
      updatedDate: '2023-06-20',
      version: '2.2',
      dependsOn: [],
      verificationCriteria: 'Location accuracy meets specification in various environments',
      tags: ['Navigation', 'GPS', 'Sensors']
    },
    {
      id: 'FUNC-REQ-008',
      title: 'System Error Reporting',
      description: 'The system shall log and report errors with appropriate severity levels.',
      systemRequirement: 'SYS-REQ-012',
      priority: 'Medium',
      status: 'Implemented',
      category: 'System Operations',
      functionality: 'Error Handling',
      inputs: ['Error Event', 'System Context'],
      outputs: ['Error Log', 'User Notification'],
      constraints: 'Critical errors must trigger immediate admin notification',
      createdBy: 'David Wilson',
      createdDate: '2023-05-10',
      updatedBy: null,
      updatedDate: null,
      version: '1.1',
      dependsOn: [],
      verificationCriteria: 'Errors are properly logged with correct severity; notifications work',
      tags: ['Error Handling', 'Logging', 'Monitoring']
    }
  ]);

  // State for filtering and sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterPriority, setFilterPriority] = useState<string | null>(null);
  const [sortField, setSortField] = useState<keyof FunctionalRequirement>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedRequirement, setSelectedRequirement] = useState<FunctionalRequirement | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Get unique categories for filter dropdown
  const categories = Array.from(new Set(functionalRequirements.map(req => req.category)));
  
  // Get unique statuses for filter dropdown
  const statuses = Array.from(new Set(functionalRequirements.map(req => req.status)));
  
  // Get unique priorities for filter dropdown
  const priorities = Array.from(new Set(functionalRequirements.map(req => req.priority)));

  // Get unique functionality types for filter dropdown
  const functionalities = Array.from(new Set(functionalRequirements.map(req => req.functionality)));

  // Filter requirements based on search and filter criteria
  const filteredRequirements = functionalRequirements.filter(req => {
    const matchesSearch = 
      searchTerm === '' || 
      req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = filterCategory === null || req.category === filterCategory;
    const matchesStatus = filterStatus === null || req.status === filterStatus;
    const matchesPriority = filterPriority === null || req.priority === filterPriority;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
  });

  // Sort requirements based on sort criteria
  const sortedRequirements = [...filteredRequirements].sort((a, b) => {
    // Handle potential null values
    const aValue = a[sortField] ?? '';
    const bValue = b[sortField] ?? '';
    
    let comparison = 0;
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      comparison = aValue.localeCompare(bValue);
    } else {
      comparison = aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  // Handle sort click
  const handleSort = (field: keyof FunctionalRequirement) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Get sort icon for table headers
  const getSortIcon = (field: keyof FunctionalRequirement) => {
    if (sortField !== field) {
      return <FaSort className="ml-1 text-gray-400" />;
    }
    
    return sortDirection === 'asc' 
      ? <FaSortUp className="ml-1 text-blue-600" />
      : <FaSortDown className="ml-1 text-blue-600" />;
  };

  // Get color for status badge
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Implemented': return 'bg-blue-100 text-blue-800';
      case 'Verified': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get color for priority badge
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle selecting a requirement to view details
  const handleSelectRequirement = (requirement: FunctionalRequirement) => {
    setSelectedRequirement(requirement);
    setShowDetailModal(true);
  };

  // Handle closing detail modal
  const handleCloseDetail = () => {
    setShowDetailModal(false);
    setSelectedRequirement(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Functional Requirements</h2>
        <div className="flex space-x-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm flex items-center">
            <FaPlus className="mr-2" /> Add Requirement
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm flex items-center">
            <FaFileImport className="mr-2" /> Import
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm flex items-center">
            <FaFileExport className="mr-2" /> Export
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex-grow min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search requirements..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute left-3 top-2.5 text-gray-400">
              <FaSearch />
            </span>
          </div>
        </div>

        <div className="w-full md:w-auto">
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            className="border border-gray-300 rounded-lg p-2 min-w-[150px]"
            value={filterCategory || ''}
            onChange={(e) => setFilterCategory(e.target.value === '' ? null : e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-auto">
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            className="border border-gray-300 rounded-lg p-2 min-w-[150px]"
            value={filterStatus || ''}
            onChange={(e) => setFilterStatus(e.target.value === '' ? null : e.target.value)}
          >
            <option value="">All Statuses</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-auto">
          <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select
            className="border border-gray-300 rounded-lg p-2 min-w-[150px]"
            value={filterPriority || ''}
            onChange={(e) => setFilterPriority(e.target.value === '' ? null : e.target.value)}
          >
            <option value="">All Priorities</option>
            {priorities.map(priority => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-auto flex items-end">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center h-10"
            onClick={() => {
              setSearchTerm('');
              setFilterCategory(null);
              setFilterStatus(null);
              setFilterPriority(null);
            }}
          >
            <FaFilter className="mr-2" /> Reset Filters
          </button>
        </div>
      </div>

      {/* Requirements Table */}
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
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center">
                  Status {getSortIcon('status')}
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
                onClick={() => handleSort('category')}
              >
                <div className="flex items-center">
                  Category {getSortIcon('category')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('functionality')}
              >
                <div className="flex items-center">
                  Functionality {getSortIcon('functionality')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('version')}
              >
                <div className="flex items-center">
                  Version {getSortIcon('version')}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedRequirements.map((req) => (
              <tr key={req.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                  {req.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {req.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(req.status)}`}>
                    {req.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(req.priority)}`}>
                    {req.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {req.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {req.functionality}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {req.version}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    className="text-blue-600 hover:text-blue-900 mr-3"
                    onClick={() => handleSelectRequirement(req)}
                  >
                    <FaEye />
                  </button>
                  <button className="text-green-600 hover:text-green-900 mr-3">
                    <FaEdit />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sortedRequirements.length === 0 && (
        <div className="text-center py-4">
          <p className="text-gray-500">No requirements match your search criteria</p>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedRequirement && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center">
                    <h2 className="text-2xl font-bold text-gray-900">{selectedRequirement.id}</h2>
                    <span className={`ml-3 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedRequirement.status)}`}>
                      {selectedRequirement.status}
                    </span>
                    <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(selectedRequirement.priority)}`}>
                      {selectedRequirement.priority}
                    </span>
                  </div>
                  <h3 className="text-xl text-gray-800 mt-1">{selectedRequirement.title}</h3>
                </div>
                <button
                  onClick={handleCloseDetail}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="col-span-2">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Description</h4>
                  <p className="text-gray-800">{selectedRequirement.description}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">System Requirement</h4>
                  <p className="text-blue-600 flex items-center">
                    {selectedRequirement.systemRequirement || 'None'} 
                    {selectedRequirement.systemRequirement && 
                      <FaLink className="ml-2 text-gray-400" />
                    }
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Category</h4>
                  <p className="text-gray-800">{selectedRequirement.category}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Functionality</h4>
                  <p className="text-gray-800">{selectedRequirement.functionality}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Version</h4>
                  <p className="text-gray-800">{selectedRequirement.version}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Inputs</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedRequirement.inputs.map(input => (
                      <span key={input} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                        {input}
                      </span>
                    ))}
                    {selectedRequirement.inputs.length === 0 && <span className="text-gray-500">None specified</span>}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Outputs</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedRequirement.outputs.map(output => (
                      <span key={output} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                        {output}
                      </span>
                    ))}
                    {selectedRequirement.outputs.length === 0 && <span className="text-gray-500">None specified</span>}
                  </div>
                </div>

                <div className="col-span-2">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Constraints</h4>
                  <p className="text-gray-800">{selectedRequirement.constraints}</p>
                </div>

                <div className="col-span-2">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Verification Criteria</h4>
                  <p className="text-gray-800">{selectedRequirement.verificationCriteria}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Dependencies</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedRequirement.dependsOn.map(dep => (
                      <span key={dep} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs flex items-center">
                        <FaExchangeAlt className="mr-1 text-xs" /> {dep}
                      </span>
                    ))}
                    {selectedRequirement.dependsOn.length === 0 && <span className="text-gray-500">No dependencies</span>}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Tags</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedRequirement.tags.map(tag => (
                      <span key={tag} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Created By</h4>
                    <p className="text-gray-800">{selectedRequirement.createdBy} on {selectedRequirement.createdDate}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Last Updated</h4>
                    <p className="text-gray-800">
                      {selectedRequirement.updatedBy 
                        ? `${selectedRequirement.updatedBy} on ${selectedRequirement.updatedDate}` 
                        : 'Not updated yet'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={handleCloseDetail}
                  className="bg-white border border-gray-300 px-4 py-2 rounded mr-2 hover:bg-gray-50"
                >
                  Close
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FunctionalRequirements; 