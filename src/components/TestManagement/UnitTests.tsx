import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as BsIcons from 'react-icons/bs';
import * as MdIcons from 'react-icons/md';

// Type definitions
interface UnitTest {
  id: string;
  name: string;
  description: string;
  component: string;
  status: 'Planned' | 'Ready' | 'In Progress' | 'Passed' | 'Failed' | 'Blocked';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  requirements: string[];
  createdBy: string;
  createdDate: string;
  lastRun: string | null;
  lastResult: 'Pass' | 'Fail' | 'Error' | null;
  automationStatus: 'Manual' | 'Automated' | 'Partially Automated';
  testMethod: 'Hardware' | 'Software' | 'Hybrid';
  attachments: string[];
  comments: {
    author: string;
    date: string;
    text: string;
  }[];
  coverage: {
    code: number;
    requirements: number;
  };
}

const UnitTests: React.FC = () => {
  // Sample data
  const [unitTests, setUnitTests] = useState<UnitTest[]>([
    {
      id: 'UT-001',
      name: 'Power Management Unit - Power On Sequence',
      description: 'Verify that the power-on sequence follows the specified timing requirements and voltage levels.',
      component: 'Power Management Unit',
      status: 'Passed',
      priority: 'High',
      requirements: ['REQ-PWR-001', 'REQ-PWR-002', 'REQ-PWR-005'],
      createdBy: 'John Smith',
      createdDate: '2023-02-15',
      lastRun: '2023-04-10',
      lastResult: 'Pass',
      automationStatus: 'Automated',
      testMethod: 'Hardware',
      attachments: ['test_procedure.pdf', 'test_setup.jpg'],
      comments: [
        {
          author: 'John Smith',
          date: '2023-04-10',
          text: 'All test cases passed successfully. Verified timing within acceptable tolerance.'
        }
      ],
      coverage: {
        code: 95,
        requirements: 100
      }
    },
    {
      id: 'UT-002',
      name: 'Navigation System - Position Calculation',
      description: 'Verify that the navigation system correctly calculates position based on sensor inputs.',
      component: 'Navigation System',
      status: 'Failed',
      priority: 'Critical',
      requirements: ['REQ-NAV-001', 'REQ-NAV-003'],
      createdBy: 'Jane Doe',
      createdDate: '2023-02-20',
      lastRun: '2023-04-12',
      lastResult: 'Fail',
      automationStatus: 'Automated',
      testMethod: 'Software',
      attachments: ['test_cases.xlsx', 'failure_log.txt'],
      comments: [
        {
          author: 'Jane Doe',
          date: '2023-04-12',
          text: 'Position calculation failed when GPS signal is degraded. Need to improve fallback algorithm.'
        }
      ],
      coverage: {
        code: 85,
        requirements: 90
      }
    },
    {
      id: 'UT-003',
      name: 'Fuel System - Flow Rate Monitoring',
      description: 'Verify that the fuel system correctly monitors and reports flow rates within the specified accuracy.',
      component: 'Fuel System',
      status: 'In Progress',
      priority: 'Medium',
      requirements: ['REQ-FUEL-002', 'REQ-FUEL-003'],
      createdBy: 'Robert Johnson',
      createdDate: '2023-03-05',
      lastRun: '2023-04-15',
      lastResult: 'Error',
      automationStatus: 'Partially Automated',
      testMethod: 'Hardware',
      attachments: ['test_plan.pdf'],
      comments: [
        {
          author: 'Robert Johnson',
          date: '2023-04-15',
          text: 'Test execution interrupted due to test equipment failure. Will reschedule after equipment is repaired.'
        }
      ],
      coverage: {
        code: 75,
        requirements: 80
      }
    },
    {
      id: 'UT-004',
      name: 'Flight Control System - Aileron Control Loop',
      description: 'Verify that the aileron control loop responds correctly to input commands and maintains stability.',
      component: 'Flight Control System',
      status: 'Ready',
      priority: 'Critical',
      requirements: ['REQ-FCS-001', 'REQ-FCS-007', 'REQ-FCS-010'],
      createdBy: 'Sarah Williams',
      createdDate: '2023-03-10',
      lastRun: null,
      lastResult: null,
      automationStatus: 'Automated',
      testMethod: 'Hybrid',
      attachments: ['test_procedure.pdf', 'simulation_setup.xlsx'],
      comments: [],
      coverage: {
        code: 80,
        requirements: 85
      }
    },
    {
      id: 'UT-005',
      name: 'Environmental Control System - Temperature Regulation',
      description: 'Verify that the environmental control system maintains temperature within specified range under various conditions.',
      component: 'Environmental Control System',
      status: 'Planned',
      priority: 'Medium',
      requirements: ['REQ-ECS-002', 'REQ-ECS-003'],
      createdBy: 'Michael Brown',
      createdDate: '2023-03-15',
      lastRun: null,
      lastResult: null,
      automationStatus: 'Manual',
      testMethod: 'Hardware',
      attachments: ['test_plan.pdf'],
      comments: [
        {
          author: 'Michael Brown',
          date: '2023-03-15',
          text: 'Test hardware setup in progress. Expect to be ready for testing by next week.'
        }
      ],
      coverage: {
        code: 0,
        requirements: 60
      }
    },
    {
      id: 'UT-006',
      name: 'Communication System - Message Encoding',
      description: 'Verify that the communication system correctly encodes messages according to the specified protocol.',
      component: 'Communication System',
      status: 'Blocked',
      priority: 'High',
      requirements: ['REQ-COM-004', 'REQ-COM-005'],
      createdBy: 'Emily Davis',
      createdDate: '2023-03-20',
      lastRun: '2023-04-05',
      lastResult: 'Fail',
      automationStatus: 'Automated',
      testMethod: 'Software',
      attachments: ['test_cases.xlsx', 'defect_report.pdf'],
      comments: [
        {
          author: 'Emily Davis',
          date: '2023-04-05',
          text: 'Testing blocked due to defect in encoding module. Defect has been reported to development team.'
        }
      ],
      coverage: {
        code: 90,
        requirements: 75
      }
    }
  ]);

  // Filter/search state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [componentFilter, setComponentFilter] = useState<string>('All');
  const [automationFilter, setAutomationFilter] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);
  
  // Detail view state
  const [selectedTest, setSelectedTest] = useState<UnitTest | null>(null);
  const [showTestDetail, setShowTestDetail] = useState(false);

  // Get unique component values for filtering
  const getUniqueComponents = () => {
    const components = unitTests.map(test => test.component);
    return ['All', ...Array.from(new Set(components))];
  };

  // Filter tests based on selected filters
  const filteredTests = unitTests.filter(test => {
    const matchesSearch = 
      test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.requirements.some(req => req.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'All' || test.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || test.priority === priorityFilter;
    const matchesComponent = componentFilter === 'All' || test.component === componentFilter;
    const matchesAutomation = automationFilter === 'All' || test.automationStatus === automationFilter;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesComponent && matchesAutomation;
  });

  // Helper function to get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Planned':
        return 'bg-gray-100 text-gray-800';
      case 'Ready':
        return 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Passed':
        return 'bg-green-100 text-green-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      case 'Blocked':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to get priority badge color
  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'Low':
        return 'bg-gray-100 text-gray-800';
      case 'Medium':
        return 'bg-blue-100 text-blue-800';
      case 'High':
        return 'bg-orange-100 text-orange-800';
      case 'Critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to get automation status badge color
  const getAutomationBadgeColor = (automationStatus: string) => {
    switch (automationStatus) {
      case 'Manual':
        return 'bg-gray-100 text-gray-800';
      case 'Automated':
        return 'bg-green-100 text-green-800';
      case 'Partially Automated':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to get test method badge color
  const getTestMethodBadgeColor = (testMethod: string) => {
    switch (testMethod) {
      case 'Hardware':
        return 'bg-indigo-100 text-indigo-800';
      case 'Software':
        return 'bg-teal-100 text-teal-800';
      case 'Hybrid':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Show test detail
  const openTestDetail = (test: UnitTest) => {
    setSelectedTest(test);
    setShowTestDetail(true);
  };

  // Close test detail
  const closeTestDetail = () => {
    setShowTestDetail(false);
    setSelectedTest(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold mb-4 sm:mb-0">Unit Tests Management</h2>
        <div className="flex space-x-2">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
            onClick={() => { /* Add new test functionality */ }}
          >
            <FaIcons.FaPlus className="mr-2" />
            Add Test
          </button>
          <button
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaIcons.FaFilter className="mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
      </div>

      {/* Search bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search tests by name, ID, description, or requirements..."
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute right-3 top-3 text-gray-400">
            <FaIcons.FaSearch />
          </span>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Status filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Planned">Planned</option>
                <option value="Ready">Ready</option>
                <option value="In Progress">In Progress</option>
                <option value="Passed">Passed</option>
                <option value="Failed">Failed</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>
            
            {/* Priority filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="All">All Priorities</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            
            {/* Component filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Component</label>
              <select
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={componentFilter}
                onChange={(e) => setComponentFilter(e.target.value)}
              >
                {getUniqueComponents().map((component, index) => (
                  <option key={index} value={component}>{component}</option>
                ))}
              </select>
            </div>
            
            {/* Automation Status filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Automation Status</label>
              <select
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={automationFilter}
                onChange={(e) => setAutomationFilter(e.target.value)}
              >
                <option value="All">All Types</option>
                <option value="Manual">Manual</option>
                <option value="Automated">Automated</option>
                <option value="Partially Automated">Partially Automated</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Test count and status summary */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 justify-between items-center">
          <div className="text-gray-600">
            Showing {filteredTests.length} of {unitTests.length} tests
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded bg-green-100 text-green-800 text-sm flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              Passed: {unitTests.filter(t => t.status === 'Passed').length}
            </span>
            <span className="px-3 py-1 rounded bg-red-100 text-red-800 text-sm flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              Failed: {unitTests.filter(t => t.status === 'Failed').length}
            </span>
            <span className="px-3 py-1 rounded bg-yellow-100 text-yellow-800 text-sm flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              In Progress: {unitTests.filter(t => t.status === 'In Progress').length}
            </span>
            <span className="px-3 py-1 rounded bg-purple-100 text-purple-800 text-sm flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
              Blocked: {unitTests.filter(t => t.status === 'Blocked').length}
            </span>
          </div>
        </div>
      </div>

      {/* Tests list */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-3 px-4 text-left font-medium text-gray-600">ID</th>
              <th className="py-3 px-4 text-left font-medium text-gray-600">Name</th>
              <th className="py-3 px-4 text-left font-medium text-gray-600">Component</th>
              <th className="py-3 px-4 text-left font-medium text-gray-600">Status</th>
              <th className="py-3 px-4 text-left font-medium text-gray-600">Priority</th>
              <th className="py-3 px-4 text-left font-medium text-gray-600">Last Run</th>
              <th className="py-3 px-4 text-left font-medium text-gray-600">Automation</th>
              <th className="py-3 px-4 text-left font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTests.length > 0 ? (
              filteredTests.map((test) => (
                <tr key={test.id} className="border-b hover:bg-gray-50 cursor-pointer" onClick={() => openTestDetail(test)}>
                  <td className="py-3 px-4">{test.id}</td>
                  <td className="py-3 px-4">
                    <div className="font-medium">{test.name}</div>
                    <div className="text-xs text-gray-500 truncate max-w-md">{test.description}</div>
                  </td>
                  <td className="py-3 px-4">{test.component}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadgeColor(test.status)}`}>
                      {test.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityBadgeColor(test.priority)}`}>
                      {test.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4">{test.lastRun || 'Never'}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getAutomationBadgeColor(test.automationStatus)}`}>
                      {test.automationStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                      <button className="text-blue-600 hover:text-blue-800">
                        <FaIcons.FaPlay title="Run Test" />
                      </button>
                      <button className="text-green-600 hover:text-green-800">
                        <FaIcons.FaEdit title="Edit Test" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <FaIcons.FaTrash title="Delete Test" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-8 text-center text-gray-500">
                  No tests found matching the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Test Detail Modal */}
      {showTestDetail && selectedTest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-bold">{selectedTest.id}: {selectedTest.name}</h3>
              <button onClick={closeTestDetail} className="text-gray-600 hover:text-gray-800">
                <AiIcons.AiOutlineClose className="text-xl" />
              </button>
            </div>
            
            <div className="p-6">
              {/* Header Info */}
              <div className="flex flex-wrap gap-3 mb-6">
                <span className={`px-3 py-1 rounded text-sm font-medium ${getStatusBadgeColor(selectedTest.status)}`}>
                  Status: {selectedTest.status}
                </span>
                <span className={`px-3 py-1 rounded text-sm font-medium ${getPriorityBadgeColor(selectedTest.priority)}`}>
                  Priority: {selectedTest.priority}
                </span>
                <span className={`px-3 py-1 rounded text-sm font-medium ${getAutomationBadgeColor(selectedTest.automationStatus)}`}>
                  {selectedTest.automationStatus}
                </span>
                <span className={`px-3 py-1 rounded text-sm font-medium ${getTestMethodBadgeColor(selectedTest.testMethod)}`}>
                  {selectedTest.testMethod}
                </span>
              </div>
              
              {/* Description */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">Description</h4>
                <p className="text-gray-700">{selectedTest.description}</p>
              </div>
              
              {/* Component Info */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">Component</h4>
                <p className="text-gray-700">{selectedTest.component}</p>
              </div>
              
              {/* Requirements */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">Requirements</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTest.requirements.map((req, index) => (
                    <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded border border-blue-200">
                      {req}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Coverage */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">Coverage</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Code Coverage</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${selectedTest.coverage.code > 80 ? 'bg-green-600' : selectedTest.coverage.code > 50 ? 'bg-yellow-400' : 'bg-red-600'}`}
                        style={{ width: `${selectedTest.coverage.code}%` }}
                      ></div>
                    </div>
                    <p className="text-right text-xs text-gray-500 mt-1">{selectedTest.coverage.code}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Requirements Coverage</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${selectedTest.coverage.requirements > 80 ? 'bg-green-600' : selectedTest.coverage.requirements > 50 ? 'bg-yellow-400' : 'bg-red-600'}`}
                        style={{ width: `${selectedTest.coverage.requirements}%` }}
                      ></div>
                    </div>
                    <p className="text-right text-xs text-gray-500 mt-1">{selectedTest.coverage.requirements}%</p>
                  </div>
                </div>
              </div>
              
              {/* Test Execution Info */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">Execution Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Created By</p>
                    <p className="font-medium">{selectedTest.createdBy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Created Date</p>
                    <p className="font-medium">{selectedTest.createdDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Run</p>
                    <p className="font-medium">{selectedTest.lastRun || 'Never'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Result</p>
                    {selectedTest.lastResult ? (
                      <span className={`px-2 py-1 rounded text-xs font-medium ${selectedTest.lastResult === 'Pass' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {selectedTest.lastResult}
                      </span>
                    ) : (
                      <p className="font-medium">N/A</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Attachments */}
              {selectedTest.attachments.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2">Attachments</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTest.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center bg-gray-50 border px-3 py-2 rounded-lg">
                        <FaIcons.FaFile className="text-gray-500 mr-2" />
                        <span>{attachment}</span>
                        <button className="ml-2 text-blue-600 hover:text-blue-800">
                          <FaIcons.FaDownload size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Comments */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">Comments</h4>
                {selectedTest.comments.length > 0 ? (
                  <div className="space-y-3">
                    {selectedTest.comments.map((comment, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg border">
                        <div className="flex items-center mb-2">
                          <FaIcons.FaUser className="text-gray-400 mr-2" />
                          <span className="font-medium mr-2">{comment.author}</span>
                          <span className="text-sm text-gray-500">{comment.date}</span>
                        </div>
                        <p className="text-gray-700">{comment.text}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No comments yet.</p>
                )}
                
                {/* Add comment form */}
                <div className="mt-4">
                  <textarea
                    placeholder="Add a comment..."
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    rows={3}
                  ></textarea>
                  <div className="mt-2 text-right">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
                      Add Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 p-6 border-t">
              <button 
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
              >
                <FaIcons.FaPlay className="mr-2" />
                Run Test
              </button>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
              >
                <FaIcons.FaEdit className="mr-2" />
                Edit Test
              </button>
              <button 
                onClick={closeTestDetail}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitTests; 