import React, { useState } from 'react';
import { 
  FaCheckCircle, 
  FaTimesCircle, 
  FaPlay, 
  FaSearch, 
  FaFilter, 
  FaFileAlt, 
  FaPlus, 
  FaExclamationTriangle,
  FaClipboardCheck,
  FaCalendarAlt,
  FaUserAlt,
  FaMapMarkerAlt,
  FaTools,
  FaClock,
  FaClipboardList,
  FaChartLine,
  FaEye,
  FaTrash,
  FaTimes,
  FaPencilAlt,
  FaLink,
  FaTable
} from 'react-icons/fa';

// Define the interface for test activities
interface TestActivity {
  id: string;
  name: string;
  description: string;
  testType: 'Unit' | 'Integration' | 'System' | 'Acceptance' | 'Performance' | 'Stress' | 'Environmental' | 'Safety';
  status: 'Planned' | 'Ready' | 'In Progress' | 'Completed' | 'Failed' | 'Blocked' | 'Cancelled';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  requirements: string[];
  testEngineer: string;
  testTeam: string[];
  testFacility: string;
  equipment: string[];
  scheduledDate: string | null;
  completionDate: string | null;
  duration: string;
  testProcedure: {
    id: string;
    step: string;
    expected: string;
    actual: string;
    status: 'Not Started' | 'Pass' | 'Fail' | 'Skipped' | 'Blocked';
    notes: string;
  }[];
  results: {
    id: string;
    parameter: string;
    expected: string;
    actual: string;
    tolerance: string;
    status: 'Pass' | 'Fail' | 'Inconclusive';
    timestamp: string;
  }[];
  issues: {
    id: string;
    description: string;
    severity: 'Minor' | 'Major' | 'Critical';
    status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
    assignee: string;
  }[];
  attachments: {
    type: 'Document' | 'Image' | 'Video' | 'Data';
    name: string;
    description: string;
    url: string;
  }[];
  notes: string;
}

const Test: React.FC = () => {
  // Sample test activities data
  const [testActivities, setTestActivities] = useState<TestActivity[]>([
    {
      id: "TEST-001",
      name: "Avionics System Performance Test",
      description: "Comprehensive testing of the avionics system under nominal flight conditions",
      testType: "System",
      status: "Completed",
      priority: "High",
      requirements: ["REQ-SYS-101", "REQ-SYS-102", "REQ-SYS-103"],
      testEngineer: "Emma Rodriguez",
      testTeam: ["John Smith", "Sarah Johnson", "Robert Lee"],
      testFacility: "Aerospace Testing Lab 3",
      equipment: ["Flight Simulator XJ-200", "Data Acquisition System", "Avionics Test Bench"],
      scheduledDate: "2023-05-10",
      completionDate: "2023-05-12",
      duration: "16 hours",
      testProcedure: [
        {
          id: "STEP-001",
          step: "Initialize avionics systems",
          expected: "All systems online with green status indicators",
          actual: "All systems online with green status indicators",
          status: "Pass",
          notes: "System initialization completed in 3.5 minutes, within expected timeframe"
        },
        {
          id: "STEP-002",
          step: "Calibrate navigation sensors",
          expected: "Sensors calibrated within ±0.01° accuracy",
          actual: "Sensors calibrated to ±0.008° accuracy",
          status: "Pass",
          notes: "Calibration exceeded minimum requirements"
        },
        {
          id: "STEP-003",
          step: "Simulate standard flight profile",
          expected: "Navigation error less than 0.5 miles over 500 mile course",
          actual: "Navigation error measured at 0.3 miles over 500 mile course",
          status: "Pass",
          notes: "Performance exceeds requirements by 40%"
        }
      ],
      results: [
        {
          id: "RES-001",
          parameter: "Navigation Accuracy",
          expected: "< 0.5 miles over 500 mile course",
          actual: "0.3 miles",
          tolerance: "± 0.1 miles",
          status: "Pass",
          timestamp: "2023-05-12T14:30:00Z"
        },
        {
          id: "RES-002",
          parameter: "System Response Time",
          expected: "< 200 ms",
          actual: "175 ms",
          tolerance: "± 20 ms",
          status: "Pass",
          timestamp: "2023-05-12T15:45:00Z"
        },
        {
          id: "RES-003",
          parameter: "Power Consumption",
          expected: "< 300 W",
          actual: "285 W",
          tolerance: "± 15 W",
          status: "Pass",
          timestamp: "2023-05-12T16:20:00Z"
        }
      ],
      issues: [],
      attachments: [
        {
          type: "Document",
          name: "Test Report - Avionics System",
          description: "Detailed report of avionics system test results",
          url: "/documents/TEST-001-report.pdf"
        },
        {
          type: "Data",
          name: "Raw Telemetry Data",
          description: "Raw data collected during test execution",
          url: "/data/TEST-001-telemetry.csv"
        }
      ],
      notes: "Overall test performance was excellent. The avionics system exceeded all performance requirements."
    },
    {
      id: "TEST-002",
      name: "Environmental Control System Test",
      description: "Verification of the ECS performance under extreme temperature conditions",
      testType: "Environmental",
      status: "Failed",
      priority: "Critical",
      requirements: ["REQ-ECS-201", "REQ-ECS-202", "REQ-ECS-203"],
      testEngineer: "Michael Chang",
      testTeam: ["Lisa Wong", "David Garcia"],
      testFacility: "Environmental Test Chamber",
      equipment: ["Temperature Controller", "Humidity Sensors", "Data Logger"],
      scheduledDate: "2023-06-05",
      completionDate: "2023-06-07",
      duration: "24 hours",
      testProcedure: [
        {
          id: "STEP-001",
          step: "Set chamber to -40°C and stabilize",
          expected: "Chamber temperature stabilizes at -40°C ± 2°C",
          actual: "Chamber temperature stabilized at -40.5°C",
          status: "Pass",
          notes: "Temperature stabilized within 45 minutes"
        },
        {
          id: "STEP-002",
          step: "Activate ECS and monitor cabin temperature",
          expected: "Cabin temperature reaches 20°C ± 2°C within 30 minutes",
          actual: "Cabin temperature reached only 15°C after 30 minutes",
          status: "Fail",
          notes: "System unable to achieve required heating performance"
        }
      ],
      results: [
        {
          id: "RES-001",
          parameter: "Cold Start Heating Rate",
          expected: "Minimum 1.5°C/minute",
          actual: "0.9°C/minute",
          tolerance: "± 0.2°C/minute",
          status: "Fail",
          timestamp: "2023-06-06T10:15:00Z"
        },
        {
          id: "RES-002",
          parameter: "Temperature Stability",
          expected: "± 1°C variation",
          actual: "± 0.8°C variation",
          tolerance: "± 0.5°C",
          status: "Pass",
          timestamp: "2023-06-06T11:30:00Z"
        }
      ],
      issues: [
        {
          id: "ISSUE-001",
          description: "Heating element performance below specification in extreme cold conditions",
          severity: "Major",
          status: "Open",
          assignee: "Thermal Systems Team"
        }
      ],
      attachments: [
        {
          type: "Document",
          name: "ECS Test Failure Analysis",
          description: "Initial analysis of test failure causes",
          url: "/documents/TEST-002-failure-analysis.pdf"
        },
        {
          type: "Image",
          name: "Thermal Imaging",
          description: "Thermal images of ECS during test",
          url: "/images/TEST-002-thermal.jpg"
        }
      ],
      notes: "Test failed due to insufficient heating performance at extreme low temperatures. Engineering investigation initiated to determine root cause."
    },
    {
      id: "TEST-003",
      name: "Propulsion System Integration Test",
      description: "Integration testing of the propulsion system with control interfaces",
      testType: "Integration",
      status: "In Progress",
      priority: "High",
      requirements: ["REQ-PROP-301", "REQ-PROP-302", "REQ-PROP-303"],
      testEngineer: "James Wilson",
      testTeam: ["Maria Gonzalez", "Thomas Scott", "Aisha Patel"],
      testFacility: "Propulsion Test Stand A",
      equipment: ["Control System Simulator", "Thrust Measurement System", "Fuel Flow Meters"],
      scheduledDate: "2023-07-20",
      completionDate: null,
      duration: "72 hours estimated",
      testProcedure: [
        {
          id: "STEP-001",
          step: "Install propulsion system on test stand",
          expected: "System correctly mounted with all connections verified",
          actual: "System mounted successfully, all connections verified",
          status: "Pass",
          notes: "Installation completed ahead of schedule"
        },
        {
          id: "STEP-002",
          step: "Perform pre-test system checks",
          expected: "All subsystems report ready status",
          actual: "All subsystems report ready status",
          status: "Pass",
          notes: "No anomalies detected during pre-test checks"
        },
        {
          id: "STEP-003",
          step: "Execute startup sequence",
          expected: "System starts and achieves idle state within parameters",
          actual: "System started successfully, idle parameters nominal",
          status: "Pass",
          notes: "Startup sequence executed without issues"
        },
        {
          id: "STEP-004",
          step: "Perform control response testing",
          expected: "Control system responds within 150ms to commands",
          actual: "Testing in progress",
          status: "Not Started",
          notes: "Scheduled for day 2 of testing"
        }
      ],
      results: [
        {
          id: "RES-001",
          parameter: "Startup Time",
          expected: "< 45 seconds",
          actual: "38 seconds",
          tolerance: "± 5 seconds",
          status: "Pass",
          timestamp: "2023-07-20T13:45:00Z"
        }
      ],
      issues: [],
      attachments: [
        {
          type: "Video",
          name: "Test Stand Setup",
          description: "Video documentation of test setup process",
          url: "/videos/TEST-003-setup.mp4"
        }
      ],
      notes: "Testing is proceeding according to plan. Days 2 and 3 will focus on performance characterization and anomaly response testing."
    },
    {
      id: "TEST-004",
      name: "Landing Gear Stress Test",
      description: "Verification of landing gear structural integrity under maximum load conditions",
      testType: "Stress",
      status: "Planned",
      priority: "Medium",
      requirements: ["REQ-LG-401", "REQ-LG-402"],
      testEngineer: "Samuel Kim",
      testTeam: ["Jennifer Adams"],
      testFacility: "Structural Test Lab",
      equipment: ["Hydraulic Load Frame", "Strain Gauges", "High-Speed Cameras"],
      scheduledDate: "2023-08-15",
      completionDate: null,
      duration: "8 hours",
      testProcedure: [
        {
          id: "STEP-001",
          step: "Mount landing gear assembly in test fixture",
          expected: "Assembly securely mounted with instrumentation attached",
          actual: "",
          status: "Not Started",
          notes: ""
        },
        {
          id: "STEP-002",
          step: "Apply 1.0x rated load and verify readings",
          expected: "Strain measurements within 10% of predicted values",
          actual: "",
          status: "Not Started",
          notes: ""
        },
        {
          id: "STEP-003",
          step: "Increase load to 1.5x rated load",
          expected: "No permanent deformation or failures",
          actual: "",
          status: "Not Started",
          notes: ""
        }
      ],
      results: [],
      issues: [],
      attachments: [
        {
          type: "Document",
          name: "Test Plan",
          description: "Detailed test procedure and acceptance criteria",
          url: "/documents/TEST-004-plan.pdf"
        }
      ],
      notes: "Test equipment has been reserved and calibrated. Awaiting final test article delivery."
    }
  ]);
  
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [selectedTest, setSelectedTest] = useState<TestActivity | null>(null);
  
  // Filter tests based on search term and filters
  const filteredTests = testActivities.filter(test => {
    // Apply search filter
    const matchesSearch = searchTerm === '' || 
      test.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.requirements.some(req => req.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Apply status filter
    const matchesStatus = statusFilter === 'All' || test.status === statusFilter;
    
    // Apply type filter
    const matchesType = typeFilter === 'All' || test.testType === typeFilter;
    
    // Apply priority filter
    const matchesPriority = priorityFilter === 'All' || test.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesType && matchesPriority;
  });
  
  // Helper functions for badges
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800"><FaCheckCircle className="inline mr-1" />Completed</span>;
      case 'In Progress':
        return <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"><FaPlay className="inline mr-1" />In Progress</span>;
      case 'Failed':
        return <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800"><FaTimesCircle className="inline mr-1" />Failed</span>;
      case 'Blocked':
        return <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800"><FaExclamationTriangle className="inline mr-1" />Blocked</span>;
      case 'Planned':
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800"><FaCalendarAlt className="inline mr-1" />Planned</span>;
      case 'Ready':
        return <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800"><FaClipboardCheck className="inline mr-1" />Ready</span>;
      case 'Cancelled':
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-300 text-gray-800">Cancelled</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">{status}</span>;
    }
  };
  
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">Critical</span>;
      case 'High':
        return <span className="px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">High</span>;
      case 'Medium':
        return <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">Medium</span>;
      case 'Low':
        return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Low</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">{priority}</span>;
    }
  };
  
  const getTestTypeBadge = (type: string) => {
    switch (type) {
      case 'Unit':
        return <span className="px-2 py-1 rounded-full text-xs bg-indigo-100 text-indigo-800">Unit</span>;
      case 'Integration':
        return <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">Integration</span>;
      case 'System':
        return <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">System</span>;
      case 'Acceptance':
        return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Acceptance</span>;
      case 'Performance':
        return <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">Performance</span>;
      case 'Stress':
        return <span className="px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">Stress</span>;
      case 'Environmental':
        return <span className="px-2 py-1 rounded-full text-xs bg-teal-100 text-teal-800">Environmental</span>;
      case 'Safety':
        return <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">Safety</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">{type}</span>;
    }
  };
  
  const getStepStatusBadge = (status: string) => {
    switch (status) {
      case 'Pass':
        return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800"><FaCheckCircle className="inline mr-1" />Pass</span>;
      case 'Fail':
        return <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800"><FaTimesCircle className="inline mr-1" />Fail</span>;
      case 'Not Started':
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">Not Started</span>;
      case 'Skipped':
        return <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">Skipped</span>;
      case 'Blocked':
        return <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800"><FaExclamationTriangle className="inline mr-1" />Blocked</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">{status}</span>;
    }
  };
  
  const getResultStatusBadge = (status: string) => {
    switch (status) {
      case 'Pass':
        return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800"><FaCheckCircle className="inline mr-1" />Pass</span>;
      case 'Fail':
        return <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800"><FaTimesCircle className="inline mr-1" />Fail</span>;
      case 'Inconclusive':
        return <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">Inconclusive</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">{status}</span>;
    }
  };
  
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">Critical</span>;
      case 'Major':
        return <span className="px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">Major</span>;
      case 'Minor':
        return <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">Minor</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">{severity}</span>;
    }
  };
  
  const getIssueStatusBadge = (status: string) => {
    switch (status) {
      case 'Open':
        return <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">Open</span>;
      case 'In Progress':
        return <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">In Progress</span>;
      case 'Resolved':
        return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Resolved</span>;
      case 'Closed':
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">Closed</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">{status}</span>;
    }
  };
  
  // Handle viewing test details
  const handleViewTest = (test: TestActivity) => {
    setSelectedTest(test);
  };
  
  // Handle closing test details modal
  const handleCloseDetails = () => {
    setSelectedTest(null);
  };
  
  return (
    <div className="p-6 max-w-full">
      <h1 className="text-2xl font-bold mb-6">Test Verification Method</h1>
      <p className="mb-6 text-gray-600">
        Manage and track test activities to verify requirements through physical testing.
      </p>

      {/* Header with Add Test button */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Test Activities</h2>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
          <FaPlus className="mr-2" /> Add Test
        </button>
      </div>

      {/* Search and filter controls */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search field */}
        <div className="col-span-1 md:col-span-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by ID, name, description, or requirements..."
              className="w-full px-10 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Status filter */}
        <div className="col-span-1">
          <div className="relative">
            <select
              className="w-full px-10 py-2 border rounded-lg appearance-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Planned">Planned</option>
              <option value="Ready">Ready</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Failed">Failed</option>
              <option value="Blocked">Blocked</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <FaFilter className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Test Type filter */}
        <div className="col-span-1">
          <div className="relative">
            <select
              className="w-full px-10 py-2 border rounded-lg appearance-none"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">All Test Types</option>
              <option value="Unit">Unit</option>
              <option value="Integration">Integration</option>
              <option value="System">System</option>
              <option value="Acceptance">Acceptance</option>
              <option value="Performance">Performance</option>
              <option value="Stress">Stress</option>
              <option value="Environmental">Environmental</option>
              <option value="Safety">Safety</option>
            </select>
            <FaFilter className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Status summary */}
      <div className="mb-6 flex flex-wrap gap-3">
        <span className="text-sm text-gray-600">
          Showing {filteredTests.length} of {testActivities.length} tests
        </span>
        <span className="text-sm ml-4">
          <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs mr-1">
            {testActivities.filter(t => t.status === 'Completed').length} Completed
          </span>
          <span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs mr-1">
            {testActivities.filter(t => t.status === 'Failed').length} Failed
          </span>
          <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs mr-1">
            {testActivities.filter(t => t.status === 'In Progress').length} In Progress
          </span>
          <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs mr-1">
            {testActivities.filter(t => t.status === 'Blocked').length} Blocked
          </span>
        </span>
      </div>

      {/* Test list */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Priority</th>
              <th className="py-3 px-4 text-left">Engineer</th>
              <th className="py-3 px-4 text-left">Scheduled</th>
              <th className="py-3 px-4 text-left">Requirements</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTests.map(test => (
              <tr key={test.id} className="border-t hover:bg-gray-50">
                <td className="py-3 px-4">{test.id}</td>
                <td className="py-3 px-4">
                  <div className="font-medium">{test.name}</div>
                  <div className="text-sm text-gray-600 truncate max-w-xs">{test.description}</div>
                </td>
                <td className="py-3 px-4">{getTestTypeBadge(test.testType)}</td>
                <td className="py-3 px-4">{getStatusBadge(test.status)}</td>
                <td className="py-3 px-4">{getPriorityBadge(test.priority)}</td>
                <td className="py-3 px-4">{test.testEngineer}</td>
                <td className="py-3 px-4">{test.scheduledDate || 'Not scheduled'}</td>
                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-1">
                    {test.requirements.slice(0, 2).map(req => (
                      <span key={req} className="inline-block bg-gray-100 px-2 py-1 rounded text-xs">
                        {req}
                      </span>
                    ))}
                    {test.requirements.length > 2 && (
                      <span className="inline-block bg-gray-100 px-2 py-1 rounded text-xs">
                        +{test.requirements.length - 2} more
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleViewTest(test)}
                      className="p-1 text-blue-600 hover:text-blue-800"
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                    <button 
                      className="p-1 text-green-600 hover:text-green-800"
                      title="Run Test"
                    >
                      <FaPlay />
                    </button>
                    <button 
                      className="p-1 text-red-600 hover:text-red-800"
                      title="Delete Test"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Test details modal */}
      {selectedTest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-xl font-bold">{selectedTest.id}: {selectedTest.name}</h2>
              <button 
                onClick={handleCloseDetails}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="p-4">
              {/* Test details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-gray-700">{selectedTest.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Status</h3>
                    <div>{getStatusBadge(selectedTest.status)}</div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Type</h3>
                    <div>{getTestTypeBadge(selectedTest.testType)}</div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Priority</h3>
                    <div>{getPriorityBadge(selectedTest.priority)}</div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Duration</h3>
                    <div className="flex items-center">
                      <FaClock className="mr-1 text-gray-500" />
                      {selectedTest.duration}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Requirements */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Requirements</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedTest.requirements.map(req => (
                    <span key={req} className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm">
                      <FaLink className="inline-block mr-1 text-gray-500" />
                      {req}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Test team and facility */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold mb-2">Test Engineer</h3>
                  <div className="flex items-center">
                    <FaUserAlt className="mr-2 text-gray-500" />
                    {selectedTest.testEngineer}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Test Facility</h3>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-gray-500" />
                    {selectedTest.testFacility}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Test Team</h3>
                  <ul className="list-disc list-inside">
                    {selectedTest.testTeam.map((member, index) => (
                      <li key={index}>{member}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Equipment</h3>
                  <ul className="list-disc list-inside">
                    {selectedTest.equipment.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold mb-2">Scheduled Date</h3>
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2 text-gray-500" />
                    {selectedTest.scheduledDate || 'Not scheduled'}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Completion Date</h3>
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2 text-gray-500" />
                    {selectedTest.completionDate || 'Not completed'}
                  </div>
                </div>
              </div>
              
              {/* Test procedure */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Test Procedure</h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Step</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expected</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actual</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedTest.testProcedure.map(step => (
                        <tr key={step.id}>
                          <td className="px-4 py-2 whitespace-normal">{step.step}</td>
                          <td className="px-4 py-2 whitespace-normal">{step.expected}</td>
                          <td className="px-4 py-2 whitespace-normal">{step.actual || '-'}</td>
                          <td className="px-4 py-2">{getStepStatusBadge(step.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Test results */}
              {selectedTest.results.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Test Results</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parameter</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expected</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actual</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tolerance</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {selectedTest.results.map(result => (
                          <tr key={result.id}>
                            <td className="px-4 py-2">{result.parameter}</td>
                            <td className="px-4 py-2">{result.expected}</td>
                            <td className="px-4 py-2">{result.actual}</td>
                            <td className="px-4 py-2">{result.tolerance}</td>
                            <td className="px-4 py-2">{getResultStatusBadge(result.status)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {/* Issues */}
              {selectedTest.issues.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Issues</h3>
                  <div className="space-y-3">
                    {selectedTest.issues.map(issue => (
                      <div key={issue.id} className="border rounded-lg p-3">
                        <div className="flex justify-between">
                          <div className="font-medium">{issue.id}</div>
                          <div className="flex space-x-2">
                            {getSeverityBadge(issue.severity)}
                            {getIssueStatusBadge(issue.status)}
                          </div>
                        </div>
                        <div className="mt-2">{issue.description}</div>
                        <div className="mt-1 text-sm text-gray-600">Assignee: {issue.assignee}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Attachments */}
              {selectedTest.attachments.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Attachments</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedTest.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center p-3 border rounded-lg">
                        {attachment.type === 'Document' && <FaFileAlt className="text-blue-500 mr-3" />}
                        {attachment.type === 'Image' && <FaFileAlt className="text-green-500 mr-3" />}
                        {attachment.type === 'Video' && <FaFileAlt className="text-red-500 mr-3" />}
                        {attachment.type === 'Data' && <FaTable className="text-purple-500 mr-3" />}
                        <div className="flex-grow">
                          <div className="font-medium">{attachment.name}</div>
                          <div className="text-sm text-gray-600">{attachment.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Notes */}
              {selectedTest.notes && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Notes</h3>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    {selectedTest.notes}
                  </div>
                </div>
              )}
              
              {/* Actions */}
              <div className="flex justify-end space-x-3 border-t pt-4">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <FaFileAlt className="inline-block mr-2" />
                  Export Report
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <FaPencilAlt className="inline-block mr-2" />
                  Edit Test
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Test; 