import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';

// Interface definition
interface IntegrationTest {
  id: string;
  name: string;
  description: string;
  systems: string[];
  status: 'Planned' | 'Ready' | 'In Progress' | 'Passed' | 'Failed' | 'Blocked';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  requirements: string[];
  createdBy: string;
  createdDate: string;
  lastRun: string | null;
  lastResult: 'Pass' | 'Fail' | 'Error' | null;
  dependencies: string[];
  testEnvironment: string;
  duration: string;
  attachments: string[];
  issues: {
    id: string;
    description: string;
    severity: 'Low' | 'Medium' | 'High' | 'Critical';
    status: 'Open' | 'In Progress' | 'Resolved';
  }[];
}

const IntegrationTests: React.FC = () => {
  // Sample test data
  const [tests, setTests] = useState<IntegrationTest[]>([
    {
      id: 'IT-001',
      name: 'Navigation and Guidance System Integration',
      description: 'Verify the integration between the navigation system and the guidance system.',
      systems: ['Navigation System', 'Guidance System'],
      status: 'Passed',
      priority: 'Critical',
      requirements: ['REQ-NAV-001', 'REQ-NAV-002', 'REQ-GUI-003'],
      createdBy: 'John Smith',
      createdDate: '2023-02-15',
      lastRun: '2023-04-20',
      lastResult: 'Pass',
      dependencies: ['UT-001', 'UT-002'],
      testEnvironment: 'System Integration Lab (SIL)',
      duration: '8 hours',
      attachments: ['test_report.pdf', 'integration_setup.jpg'],
      issues: []
    },
    {
      id: 'IT-002',
      name: 'Communication System Interface Test',
      description: 'Test the interfaces between the main communication system and external datalinks.',
      systems: ['Communication System', 'External Datalink'],
      status: 'Failed',
      priority: 'High',
      requirements: ['REQ-COM-001', 'REQ-COM-004', 'REQ-COM-005'],
      createdBy: 'Jane Doe',
      createdDate: '2023-02-20',
      lastRun: '2023-04-22',
      lastResult: 'Fail',
      dependencies: ['UT-006'],
      testEnvironment: 'Communication System Test Bench',
      duration: '6 hours',
      attachments: ['interface_spec.pdf', 'failure_report.docx'],
      issues: [
        {
          id: 'ISS-001',
          description: 'Data packets are corrupted when transmission rate exceeds 50 Mbps',
          severity: 'High',
          status: 'Open'
        }
      ]
    },
    {
      id: 'IT-003',
      name: 'Power and Propulsion Integration',
      description: 'Verify the integration between the power management system and propulsion control unit.',
      systems: ['Power Management System', 'Propulsion Control Unit'],
      status: 'In Progress',
      priority: 'High',
      requirements: ['REQ-PWR-002', 'REQ-PRO-001', 'REQ-PRO-003'],
      createdBy: 'Robert Johnson',
      createdDate: '2023-03-05',
      lastRun: '2023-04-25',
      lastResult: 'Error',
      dependencies: ['UT-001', 'UT-007'],
      testEnvironment: 'Power Systems Integration Lab',
      duration: '12 hours',
      attachments: ['integration_plan.pdf'],
      issues: [
        {
          id: 'ISS-002',
          description: 'Power fluctuations during high thrust commands',
          severity: 'Medium',
          status: 'In Progress'
        }
      ]
    },
    {
      id: 'IT-004',
      name: 'Flight Control and Avionics Integration',
      description: 'Test the integration between flight control systems and the main avionics package.',
      systems: ['Flight Control System', 'Avionics System'],
      status: 'Ready',
      priority: 'Critical',
      requirements: ['REQ-FCS-001', 'REQ-FCS-002', 'REQ-AVI-005'],
      createdBy: 'Sarah Williams',
      createdDate: '2023-03-10',
      lastRun: null,
      lastResult: null,
      dependencies: ['UT-004', 'UT-006'],
      testEnvironment: 'Flight Systems Integration Lab',
      duration: '10 hours',
      attachments: ['test_procedure.pdf'],
      issues: []
    },
    {
      id: 'IT-005',
      name: 'Environmental Control and Life Support Integration',
      description: 'Verify integration between environmental control systems and life support systems.',
      systems: ['Environmental Control System', 'Life Support System'],
      status: 'Planned',
      priority: 'Medium',
      requirements: ['REQ-ECS-001', 'REQ-LSS-002'],
      createdBy: 'Michael Brown',
      createdDate: '2023-03-15',
      lastRun: null,
      lastResult: null,
      dependencies: ['UT-005'],
      testEnvironment: 'Environmental Systems Lab',
      duration: '8 hours',
      attachments: ['integration_checklist.pdf'],
      issues: []
    },
    {
      id: 'IT-006',
      name: 'Sensor Fusion and Data Integration',
      description: 'Test the integration and data fusion between multiple sensor systems.',
      systems: ['Radar System', 'Infrared Sensors', 'Optical Sensors'],
      status: 'Blocked',
      priority: 'High',
      requirements: ['REQ-SEN-001', 'REQ-SEN-003', 'REQ-DAT-002'],
      createdBy: 'Emily Davis',
      createdDate: '2023-03-20',
      lastRun: '2023-04-15',
      lastResult: 'Fail',
      dependencies: ['UT-008', 'UT-009'],
      testEnvironment: 'Sensor Integration Lab',
      duration: '14 hours',
      attachments: ['sensor_config.pdf', 'integration_issues.xlsx'],
      issues: [
        {
          id: 'ISS-003',
          description: 'Timing synchronization issues between radar and IR sensors',
          severity: 'Critical',
          status: 'Open'
        },
        {
          id: 'ISS-004',
          description: 'Data format incompatibility in fusion algorithm',
          severity: 'High',
          status: 'In Progress'
        }
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [selectedTest, setSelectedTest] = useState<IntegrationTest | null>(null);
  const [showTestDetail, setShowTestDetail] = useState(false);

  // Helper functions
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Planned': return 'bg-gray-100 text-gray-800';
      case 'Ready': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Passed': return 'bg-green-100 text-green-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      case 'Blocked': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'Low': return 'bg-gray-100 text-gray-800';
      case 'Medium': return 'bg-blue-100 text-blue-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter tests based on selected filters
  const filteredTests = tests.filter(test => {
    const matchesSearch = 
      test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.systems.some(sys => sys.toLowerCase().includes(searchTerm.toLowerCase())) ||
      test.requirements.some(req => req.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'All' || test.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || test.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold mb-4 sm:mb-0">Integration Tests Management</h2>
        <div className="flex space-x-2">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
            onClick={() => { /* Add new test functionality */ }}
          >
            <FaIcons.FaPlus className="mr-2" />
            Add Test
          </button>
        </div>
      </div>

      {/* Search bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by ID, name, description, systems or requirements..."
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
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
        <h3 className="text-lg font-semibold mb-3">Filter Tests</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
      </div>

      {/* Test count and status summary */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 justify-between items-center">
          <div className="text-gray-600">
            Showing {filteredTests.length} of {tests.length} tests
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded bg-green-100 text-green-800 text-sm flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              Passed: {tests.filter(t => t.status === 'Passed').length}
            </span>
            <span className="px-3 py-1 rounded bg-red-100 text-red-800 text-sm flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              Failed: {tests.filter(t => t.status === 'Failed').length}
            </span>
            <span className="px-3 py-1 rounded bg-yellow-100 text-yellow-800 text-sm flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              In Progress: {tests.filter(t => t.status === 'In Progress').length}
            </span>
            <span className="px-3 py-1 rounded bg-purple-100 text-purple-800 text-sm flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
              Blocked: {tests.filter(t => t.status === 'Blocked').length}
            </span>
          </div>
        </div>
      </div>

      {/* Tests table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-3 px-4 text-left font-medium text-gray-600">ID</th>
              <th className="py-3 px-4 text-left font-medium text-gray-600">Name</th>
              <th className="py-3 px-4 text-left font-medium text-gray-600">Systems</th>
              <th className="py-3 px-4 text-left font-medium text-gray-600">Status</th>
              <th className="py-3 px-4 text-left font-medium text-gray-600">Priority</th>
              <th className="py-3 px-4 text-left font-medium text-gray-600">Last Run</th>
              <th className="py-3 px-4 text-left font-medium text-gray-600">Issues</th>
              <th className="py-3 px-4 text-left font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTests.length > 0 ? (
              filteredTests.map((test) => (
                <tr key={test.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{test.id}</td>
                  <td className="py-3 px-4">
                    <div className="font-medium">{test.name}</div>
                    <div className="text-xs text-gray-500 truncate max-w-md">{test.description}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {test.systems.map((system, index) => (
                        <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                          {system}
                        </span>
                      ))}
                    </div>
                  </td>
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
                    {test.issues.length > 0 ? (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                        {test.issues.length} {test.issues.length === 1 ? 'Issue' : 'Issues'}
                      </span>
                    ) : (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                        No Issues
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800" title="View Details">
                        <FaIcons.FaEye />
                      </button>
                      <button className="text-green-600 hover:text-green-800" title="Run Test">
                        <FaIcons.FaPlay />
                      </button>
                      <button className="text-red-600 hover:text-red-800" title="Delete Test">
                        <FaIcons.FaTrash />
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
    </div>
  );
};

export default IntegrationTests; 