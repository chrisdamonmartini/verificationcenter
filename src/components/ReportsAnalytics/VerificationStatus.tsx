import React, { useState } from 'react';
import { FaFilter, FaDownload, FaChartPie, FaChartBar, FaSearch, FaCalendarAlt, FaExclamationTriangle } from 'react-icons/fa';

// Define interfaces for our data
interface VerificationItem {
  id: string;
  requirement: string;
  method: 'Test' | 'Analysis' | 'Inspection' | 'Demonstration' | 'Simulation';
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Blocked' | 'Waived';
  progress: number;
  category: string;
  assignedTo: string;
  startDate: string;
  completionDate: string | null;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  issues: number;
}

interface StatusSummary {
  notStarted: number;
  inProgress: number;
  completed: number;
  blocked: number;
  waived: number;
  total: number;
}

interface MethodSummary {
  test: number;
  analysis: number;
  inspection: number;
  demonstration: number;
  simulation: number;
}

const VerificationStatus: React.FC = () => {
  // Sample data for demonstration
  const [verificationItems, setVerificationItems] = useState<VerificationItem[]>([
    {
      id: 'VER-001',
      requirement: 'SYS-REQ-001',
      method: 'Test',
      status: 'Completed',
      progress: 100,
      category: 'Performance',
      assignedTo: 'John Smith',
      startDate: '2023-06-15',
      completionDate: '2023-06-30',
      priority: 'High',
      issues: 0
    },
    {
      id: 'VER-002',
      requirement: 'SYS-REQ-002',
      method: 'Test',
      status: 'In Progress',
      progress: 75,
      category: 'Performance',
      assignedTo: 'Sarah Johnson',
      startDate: '2023-06-20',
      completionDate: null,
      priority: 'Critical',
      issues: 1
    },
    {
      id: 'VER-003',
      requirement: 'SYS-REQ-003',
      method: 'Analysis',
      status: 'Completed',
      progress: 100,
      category: 'Environmental',
      assignedTo: 'Robert Lee',
      startDate: '2023-06-10',
      completionDate: '2023-06-25',
      priority: 'High',
      issues: 0
    },
    {
      id: 'VER-004',
      requirement: 'SYS-REQ-004',
      method: 'Simulation',
      status: 'Blocked',
      progress: 45,
      category: 'Compliance',
      assignedTo: 'Emily Chen',
      startDate: '2023-06-18',
      completionDate: null,
      priority: 'Medium',
      issues: 2
    },
    {
      id: 'VER-005',
      requirement: 'SYS-REQ-005',
      method: 'Test',
      status: 'Not Started',
      progress: 0,
      category: 'Performance',
      assignedTo: 'John Smith',
      startDate: '2023-07-05',
      completionDate: null,
      priority: 'Medium',
      issues: 0
    },
    {
      id: 'VER-006',
      requirement: 'SYS-REQ-006',
      method: 'Demonstration',
      status: 'In Progress',
      progress: 30,
      category: 'Performance',
      assignedTo: 'Sarah Johnson',
      startDate: '2023-07-01',
      completionDate: null,
      priority: 'Medium',
      issues: 0
    },
    {
      id: 'VER-007',
      requirement: 'SYS-REQ-007',
      method: 'Inspection',
      status: 'Completed',
      progress: 100,
      category: 'Performance',
      assignedTo: 'Robert Lee',
      startDate: '2023-06-25',
      completionDate: '2023-07-02',
      priority: 'High',
      issues: 0
    },
    {
      id: 'VER-008',
      requirement: 'SYS-REQ-008',
      method: 'Analysis',
      status: 'In Progress',
      progress: 60,
      category: 'Performance',
      assignedTo: 'Emily Chen',
      startDate: '2023-06-28',
      completionDate: null,
      priority: 'Low',
      issues: 0
    },
    {
      id: 'VER-009',
      requirement: 'SYS-REQ-009',
      method: 'Test',
      status: 'Waived',
      progress: 0,
      category: 'Environmental',
      assignedTo: 'John Smith',
      startDate: '2023-07-10',
      completionDate: null,
      priority: 'High',
      issues: 0
    },
    {
      id: 'VER-010',
      requirement: 'SYS-REQ-010',
      method: 'Test',
      status: 'Not Started',
      progress: 0,
      category: 'Environmental',
      assignedTo: 'Sarah Johnson',
      startDate: '2023-07-15',
      completionDate: null,
      priority: 'High',
      issues: 0
    }
  ]);

  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [methodFilter, setMethodFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'details'>('overview');

  // Filter the verification items
  const filteredItems = verificationItems.filter(item => {
    return (
      (searchTerm === '' || 
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.requirement.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
      ) &&
      (methodFilter === null || item.method === methodFilter) &&
      (statusFilter === null || item.status === statusFilter) &&
      (categoryFilter === null || item.category === categoryFilter)
    );
  });

  // Calculate summary metrics
  const calculateStatusSummary = (): StatusSummary => {
    const summary: StatusSummary = {
      notStarted: 0,
      inProgress: 0,
      completed: 0,
      blocked: 0,
      waived: 0,
      total: verificationItems.length
    };

    verificationItems.forEach(item => {
      switch (item.status) {
        case 'Not Started':
          summary.notStarted++;
          break;
        case 'In Progress':
          summary.inProgress++;
          break;
        case 'Completed':
          summary.completed++;
          break;
        case 'Blocked':
          summary.blocked++;
          break;
        case 'Waived':
          summary.waived++;
          break;
      }
    });

    return summary;
  };

  const calculateMethodSummary = (): MethodSummary => {
    const summary: MethodSummary = {
      test: 0,
      analysis: 0,
      inspection: 0,
      demonstration: 0,
      simulation: 0
    };

    verificationItems.forEach(item => {
      switch (item.method) {
        case 'Test':
          summary.test++;
          break;
        case 'Analysis':
          summary.analysis++;
          break;
        case 'Inspection':
          summary.inspection++;
          break;
        case 'Demonstration':
          summary.demonstration++;
          break;
        case 'Simulation':
          summary.simulation++;
          break;
      }
    });

    return summary;
  };

  const statusSummary = calculateStatusSummary();
  const methodSummary = calculateMethodSummary();
  const completionPercentage = Math.round((statusSummary.completed / statusSummary.total) * 100);
  
  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Not Started': return 'bg-gray-100 text-gray-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Blocked': return 'bg-red-100 text-red-800';
      case 'Waived': return 'bg-purple-100 text-purple-800';
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

  // Helper function to get method color
  const getMethodColor = (method: string) => {
    switch (method) {
      case 'Test': return 'bg-blue-100 text-blue-800';
      case 'Analysis': return 'bg-green-100 text-green-800';
      case 'Inspection': return 'bg-purple-100 text-purple-800';
      case 'Demonstration': return 'bg-yellow-100 text-yellow-800';
      case 'Simulation': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to calculate progress color
  const getProgressColor = (progress: number) => {
    if (progress < 25) return 'bg-red-500';
    if (progress < 50) return 'bg-orange-500';
    if (progress < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-gray-50 p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Verification Status</h1>
        
        {/* Tabs */}
        <div className="mb-6 flex space-x-2">
          <button
            className={`px-4 py-2 rounded-md font-medium text-sm ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            <FaChartPie className="inline mr-2" /> Overview
          </button>
          <button
            className={`px-4 py-2 rounded-md font-medium text-sm ${
              activeTab === 'details'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('details')}
          >
            <FaChartBar className="inline mr-2" /> Detailed Status
          </button>
        </div>
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-2">Overall Progress</h2>
                <div className="text-4xl font-bold text-blue-600 mb-2">{completionPercentage}%</div>
                <div className="mb-2 h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
                <p className="text-gray-600 text-sm">
                  {statusSummary.completed} of {statusSummary.total} verification activities completed
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-2">Status Breakdown</h2>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm">Completed: {statusSummary.completed}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm">In Progress: {statusSummary.inProgress}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
                    <span className="text-sm">Not Started: {statusSummary.notStarted}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-sm">Blocked: {statusSummary.blocked}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                    <span className="text-sm">Waived: {statusSummary.waived}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-2">Verification Methods</h2>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-sm">Test</span>
                    </div>
                    <span className="text-sm font-medium">{methodSummary.test}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm">Analysis</span>
                    </div>
                    <span className="text-sm font-medium">{methodSummary.analysis}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                      <span className="text-sm">Inspection</span>
                    </div>
                    <span className="text-sm font-medium">{methodSummary.inspection}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <span className="text-sm">Demonstration</span>
                    </div>
                    <span className="text-sm font-medium">{methodSummary.demonstration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
                      <span className="text-sm">Simulation</span>
                    </div>
                    <span className="text-sm font-medium">{methodSummary.simulation}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Issues and Alerts */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-lg font-semibold mb-4">Issues and Alerts</h2>
              
              {verificationItems.filter(item => item.issues > 0 || item.status === 'Blocked').length > 0 ? (
                <div className="space-y-4">
                  {verificationItems
                    .filter(item => item.issues > 0 || item.status === 'Blocked')
                    .map(item => (
                      <div key={item.id} className="flex items-start p-3 border border-red-200 rounded-md bg-red-50">
                        <FaExclamationTriangle className="text-red-500 mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-red-800">{item.id}: {item.requirement}</div>
                          <div className="text-sm text-red-700">
                            Status: <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>{item.status}</span>
                            {item.issues > 0 && (
                              <span className="ml-2">Issues: {item.issues}</span>
                            )}
                          </div>
                          <div className="text-sm text-red-700 mt-1">Assigned to: {item.assignedTo}</div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No critical issues or blockers found
                </div>
              )}
            </div>
            
            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Recent Activity</h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View All</button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <FaCalendarAlt className="text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium">VER-007 completed</div>
                    <div className="text-sm text-gray-500">July 2, 2023 • Robert Lee</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full mr-3">
                    <FaExclamationTriangle className="text-red-600" />
                  </div>
                  <div>
                    <div className="font-medium">VER-004 blocked</div>
                    <div className="text-sm text-gray-500">June 29, 2023 • Emily Chen</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <FaCalendarAlt className="text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">VER-002 progress updated to 75%</div>
                    <div className="text-sm text-gray-500">June 28, 2023 • Sarah Johnson</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <FaCalendarAlt className="text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium">VER-003 completed</div>
                    <div className="text-sm text-gray-500">June 25, 2023 • Robert Lee</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Detailed Status Tab */}
        {activeTab === 'details' && (
          <div>
            {/* Filters */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="flex flex-col md:flex-row md:items-end gap-4">
                <div className="flex-grow">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search by ID, requirement, or assignee..."
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Method</label>
                  <select
                    className="border border-gray-300 rounded-md p-2 w-full"
                    value={methodFilter || ''}
                    onChange={(e) => setMethodFilter(e.target.value === '' ? null : e.target.value)}
                  >
                    <option value="">All Methods</option>
                    <option value="Test">Test</option>
                    <option value="Analysis">Analysis</option>
                    <option value="Inspection">Inspection</option>
                    <option value="Demonstration">Demonstration</option>
                    <option value="Simulation">Simulation</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    className="border border-gray-300 rounded-md p-2 w-full"
                    value={statusFilter || ''}
                    onChange={(e) => setStatusFilter(e.target.value === '' ? null : e.target.value)}
                  >
                    <option value="">All Statuses</option>
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Blocked">Blocked</option>
                    <option value="Waived">Waived</option>
                  </select>
                </div>
                
                <div>
                  <button
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center text-sm h-10"
                    onClick={() => {
                      setSearchTerm('');
                      setMethodFilter(null);
                      setStatusFilter(null);
                      setCategoryFilter(null);
                    }}
                  >
                    <FaFilter className="mr-2" /> Reset
                  </button>
                </div>
              </div>
            </div>
            
            {/* Verification Items Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Requirement
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Method
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Progress
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Priority
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Assigned To
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Start Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredItems.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                          {item.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.requirement}
                          {item.issues > 0 && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              {item.issues} {item.issues === 1 ? 'issue' : 'issues'}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${getMethodColor(item.method)}`}>
                            {item.method}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-grow w-24 h-2 bg-gray-200 rounded-full mr-2">
                              <div
                                className={`h-full rounded-full ${getProgressColor(item.progress)}`}
                                style={{ width: `${item.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs">{item.progress}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${getPriorityColor(item.priority)}`}>
                            {item.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.assignedTo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.startDate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredItems.length === 0 ? (
                <div className="py-10 text-center">
                  <p className="text-gray-500">No verification items match your search criteria</p>
                </div>
              ) : (
                <div className="px-6 py-3 bg-gray-50 text-sm text-gray-500">
                  Showing {filteredItems.length} of {verificationItems.length} verification items
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationStatus; 