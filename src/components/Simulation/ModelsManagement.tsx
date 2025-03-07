import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import * as BiIcons from 'react-icons/bi';

// Types for simulation models
interface SimulationModel {
  id: string;
  name: string;
  description: string;
  type: string;
  version: string;
  status: 'Active' | 'In Development' | 'Deprecated' | 'Archived';
  fidelity: 'Low' | 'Medium' | 'High';
  owner: string;
  lastModified: string;
  validationStatus: 'Not Validated' | 'Partially Validated' | 'Fully Validated';
  tags: string[];
  applicableRequirements: string[];
}

// Analysis details interface
interface AnalysisItem {
  id: string;
  name: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Failed';
  completionPercentage: number;
  requirements: string[];
  lastRun: string;
  assignedTo: string;
}

// Simulation automation workflow interface
interface AutomationWorkflow {
  id: string;
  name: string;
  description: string;
  status: 'Running' | 'Scheduled' | 'Completed' | 'Failed' | 'Paused';
  progress: number;
  schedule: string;
  nextRun: string;
  lastRun: string;
  owner: string;
  environmentId: string;
  environmentName: string;
  modelIds: string[];
  duration: string;
  cpuUsage: number;
  memoryUsage: number;
  results?: string;
}

const ModelsManagement: React.FC = () => {
  // Active tab state
  const [activeTab, setActiveTab] = useState<'Activities' | 'Models' | 'Automation'>('Activities');
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [typeFilter, setTypeFilter] = useState('All');
  const [validationFilter, setValidationFilter] = useState('All');
  const [automationFilter, setAutomationFilter] = useState('All');

  // Sample analysis data
  const analysisItems: AnalysisItem[] = [
    {
      id: 'AN-001',
      name: 'Structural Analysis - Wing Components',
      status: 'Completed',
      completionPercentage: 100,
      requirements: ['SR-001', 'SR-004', 'SR-009'],
      lastRun: '2023-05-10',
      assignedTo: 'John Smith'
    },
    {
      id: 'AN-002',
      name: 'Thermal Analysis - Engine Bay',
      status: 'In Progress',
      completionPercentage: 65,
      requirements: ['SR-012', 'SR-015'],
      lastRun: '2023-05-08',
      assignedTo: 'Sarah Johnson'
    },
    {
      id: 'AN-003',
      name: 'Aerodynamic Performance Analysis',
      status: 'Pending',
      completionPercentage: 0,
      requirements: ['SR-003', 'SR-007', 'SR-018'],
      lastRun: 'Not Started',
      assignedTo: 'Michael Chen'
    },
    {
      id: 'AN-004',
      name: 'Control System Stability Analysis',
      status: 'In Progress',
      completionPercentage: 42,
      requirements: ['SR-022', 'SR-025'],
      lastRun: '2023-05-09',
      assignedTo: 'Lisa Garcia'
    },
    {
      id: 'AN-005',
      name: 'Environmental Impact Analysis',
      status: 'Failed',
      completionPercentage: 80,
      requirements: ['SR-030', 'SR-032', 'SR-035'],
      lastRun: '2023-05-07',
      assignedTo: 'Robert Wilson'
    }
  ];

  // Sample simulation models data
  const simulationModels: SimulationModel[] = [
    {
      id: 'SIM-001',
      name: 'Aerodynamic Performance Model',
      description: 'High-fidelity model for aerodynamic performance prediction',
      type: 'CFD',
      version: '2.3.4',
      status: 'Active',
      fidelity: 'High',
      owner: 'John Smith',
      lastModified: '2023-04-15',
      validationStatus: 'Fully Validated',
      tags: ['Aerodynamics', 'Performance', 'CFD'],
      applicableRequirements: ['SR-001', 'SR-002', 'SR-033'],
    },
    {
      id: 'SIM-002',
      name: 'Structural Integrity Model',
      description: 'FEA model for structural analysis and load testing',
      type: 'FEA',
      version: '1.8.0',
      status: 'Active',
      fidelity: 'High',
      owner: 'Sarah Johnson',
      lastModified: '2023-03-22',
      validationStatus: 'Fully Validated',
      tags: ['Structural', 'FEA', 'Load Testing'],
      applicableRequirements: ['SR-002', 'SR-015', 'SR-042'],
    },
    {
      id: 'SIM-003',
      name: 'Thermal Management Simulation',
      description: 'Model for thermal analysis and heat distribution',
      type: 'Thermal Analysis',
      version: '3.1.2',
      status: 'In Development',
      fidelity: 'Medium',
      owner: 'Michael Brown',
      lastModified: '2023-05-02',
      validationStatus: 'Partially Validated',
      tags: ['Thermal', 'Heat Transfer', 'Environment'],
      applicableRequirements: ['SR-021', 'SR-022'],
    },
    {
      id: 'SIM-004',
      name: 'Avionics System Model',
      description: 'Digital twin of the avionics system for functional testing',
      type: 'System Simulation',
      version: '2.0.1',
      status: 'Active',
      fidelity: 'High',
      owner: 'Lisa Chen',
      lastModified: '2023-04-28',
      validationStatus: 'Partially Validated',
      tags: ['Avionics', 'Electronics', 'Software'],
      applicableRequirements: ['SR-051', 'SR-052', 'SR-053', 'SR-054'],
    },
    {
      id: 'SIM-005',
      name: 'Flight Control System Model',
      description: 'Behavioral model of flight control system responses',
      type: 'Control System',
      version: '1.4.3',
      status: 'In Development',
      fidelity: 'Medium',
      owner: 'David Wilson',
      lastModified: '2023-05-10',
      validationStatus: 'Not Validated',
      tags: ['Controls', 'Flight Dynamics', 'Autopilot'],
      applicableRequirements: ['SR-035', 'SR-036', 'SR-037'],
    },
    {
      id: 'SIM-006',
      name: 'Environmental Conditions Model',
      description: 'Simulation of various environmental conditions for testing',
      type: 'Environmental',
      version: '1.2.0',
      status: 'Active',
      fidelity: 'Medium',
      owner: 'Rachel Adams',
      lastModified: '2023-02-18',
      validationStatus: 'Fully Validated',
      tags: ['Environment', 'Climate', 'Weather'],
      applicableRequirements: ['SR-002', 'SR-024', 'SR-025'],
    },
    {
      id: 'SIM-007',
      name: 'Propulsion System Model',
      description: 'High-fidelity engine performance simulation',
      type: 'Propulsion',
      version: '2.5.1',
      status: 'Active',
      fidelity: 'High',
      owner: 'James Wilson',
      lastModified: '2023-03-15',
      validationStatus: 'Fully Validated',
      tags: ['Propulsion', 'Engine', 'Performance'],
      applicableRequirements: ['SR-012', 'SR-013', 'SR-014'],
    },
  ];

  // Sample automation workflows
  const automationWorkflows: AutomationWorkflow[] = [
    {
      id: 'AUTO-001',
      name: 'Daily Aerodynamic Performance Simulation',
      description: 'Automated CFD analysis of wing surfaces with varying parameters',
      status: 'Running',
      progress: 78,
      schedule: 'Daily at 01:00',
      nextRun: '2023-05-12 01:00',
      lastRun: '2023-05-11 01:00',
      owner: 'John Smith',
      environmentId: 'ENV-003',
      environmentName: 'High-Performance Compute Cluster',
      modelIds: ['SIM-001', 'SIM-007'],
      duration: '4h 12m',
      cpuUsage: 85,
      memoryUsage: 72,
      results: 'https://results.verificationcenter.com/AUTO-001/latest'
    },
    {
      id: 'AUTO-002',
      name: 'Weekly Structural Integrity Tests',
      description: 'Comprehensive stress tests on all structural components',
      status: 'Scheduled',
      progress: 0,
      schedule: 'Weekly on Sunday at 22:00',
      nextRun: '2023-05-14 22:00',
      lastRun: '2023-05-07 22:00',
      owner: 'Sarah Johnson',
      environmentId: 'ENV-002',
      environmentName: 'FEA Workstation Cluster',
      modelIds: ['SIM-002'],
      duration: '8h 45m',
      cpuUsage: 0,
      memoryUsage: 0
    },
    {
      id: 'AUTO-003',
      name: 'Thermal Analysis Batch Processing',
      description: 'Multiple thermal simulations with varying ambient conditions',
      status: 'Completed',
      progress: 100,
      schedule: 'Monthly on 1st at 03:00',
      nextRun: '2023-06-01 03:00',
      lastRun: '2023-05-01 03:00',
      owner: 'Michael Brown',
      environmentId: 'ENV-001',
      environmentName: 'Standard Compute Grid',
      modelIds: ['SIM-003'],
      duration: '12h 22m',
      cpuUsage: 0,
      memoryUsage: 0,
      results: 'https://results.verificationcenter.com/AUTO-003/latest'
    },
    {
      id: 'AUTO-004',
      name: 'Flight Control System Verification Suite',
      description: 'Automated test suite for flight control responses',
      status: 'Failed',
      progress: 34,
      schedule: 'On commit to main branch',
      nextRun: 'On next commit',
      lastRun: '2023-05-10 14:22',
      owner: 'David Wilson',
      environmentId: 'ENV-004',
      environmentName: 'CI/CD Pipeline Environment',
      modelIds: ['SIM-005'],
      duration: '1h 12m',
      cpuUsage: 0,
      memoryUsage: 0
    },
    {
      id: 'AUTO-005',
      name: 'Environmental Conditions Batch Tests',
      description: 'Multiple simulations across diverse environmental conditions',
      status: 'Paused',
      progress: 52,
      schedule: 'Weekly on Wednesday at 15:00',
      nextRun: 'Paused',
      lastRun: '2023-05-03 15:00',
      owner: 'Rachel Adams',
      environmentId: 'ENV-003',
      environmentName: 'High-Performance Compute Cluster',
      modelIds: ['SIM-006'],
      duration: '3h 45m (paused)',
      cpuUsage: 0,
      memoryUsage: 0
    },
    {
      id: 'AUTO-006',
      name: 'Avionics System Integration Tests',
      description: 'Comprehensive integration testing of all avionics components',
      status: 'Running',
      progress: 23,
      schedule: 'Bi-weekly on Monday at 08:00',
      nextRun: '2023-05-22 08:00',
      lastRun: '2023-05-08 08:00',
      owner: 'Lisa Chen',
      environmentId: 'ENV-005',
      environmentName: 'Avionics Test Bench',
      modelIds: ['SIM-004'],
      duration: '1h 47m',
      cpuUsage: 64,
      memoryUsage: 58
    },
    {
      id: 'AUTO-007',
      name: 'Multi-model Parameter Sweep',
      description: 'Sweep through parameter space across multiple simulation models',
      status: 'Scheduled',
      progress: 0,
      schedule: 'Quarterly',
      nextRun: '2023-07-01 00:00',
      lastRun: '2023-04-01 00:00',
      owner: 'James Wilson',
      environmentId: 'ENV-003',
      environmentName: 'High-Performance Compute Cluster',
      modelIds: ['SIM-001', 'SIM-002', 'SIM-003', 'SIM-007'],
      duration: '48h+ (estimated)',
      cpuUsage: 0,
      memoryUsage: 0
    }
  ];

  // Filter the models based on search and filters
  const filteredModels = simulationModels.filter(model => {
    const matchesSearch = 
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      model.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'All Statuses' || model.status === statusFilter;
    const matchesType = typeFilter === 'All' || model.type === typeFilter;
    const matchesValidation = validationFilter === 'All' || model.validationStatus === validationFilter;
    
    return matchesSearch && matchesStatus && matchesType && matchesValidation;
  });

  // Filter automations based on status filter
  const filteredAutomations = automationWorkflows.filter(workflow => {
    return automationFilter === 'All' || workflow.status === automationFilter;
  });

  // Function to get the status badge color
  const getStatusBadgeColor = (status: string) => {
    switch(status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'In Development':
        return 'bg-blue-100 text-blue-800';
      case 'Deprecated':
        return 'bg-yellow-100 text-yellow-800';
      case 'Archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to get the validation badge color
  const getValidationBadgeColor = (status: string) => {
    switch(status) {
      case 'Fully Validated':
        return 'bg-green-100 text-green-800';
      case 'Partially Validated':
        return 'bg-yellow-100 text-yellow-800';
      case 'Not Validated':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to get the fidelity badge color
  const getFidelityBadgeColor = (fidelity: string) => {
    switch(fidelity) {
      case 'High':
        return 'bg-purple-100 text-purple-800';
      case 'Medium':
        return 'bg-blue-100 text-blue-800';
      case 'Low':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to get the analysis status badge color
  const getAnalysisStatusBadgeColor = (status: string) => {
    switch(status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to get automation status badge color
  const getAutomationStatusBadgeColor = (status: string) => {
    switch(status) {
      case 'Running':
        return 'bg-blue-100 text-blue-800';
      case 'Scheduled':
        return 'bg-purple-100 text-purple-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      case 'Paused':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Analysis</h1>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('Activities')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'Activities'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Activities
          </button>
          <button
            onClick={() => setActiveTab('Models')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'Models'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Models
          </button>
          <button
            onClick={() => setActiveTab('Automation')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'Automation'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Automation
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'Activities' && (
          <div>
            {/* Analysis Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Total Analyses</h3>
                  <FaIcons.FaChartBar className="text-blue-500" />
                </div>
                <p className="text-3xl font-bold">{analysisItems.length}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Completed</h3>
                  <FaIcons.FaCheckCircle className="text-green-500" />
                </div>
                <p className="text-3xl font-bold">{analysisItems.filter(item => item.status === 'Completed').length}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">In Progress</h3>
                  <FaIcons.FaSpinner className="text-yellow-500" />
                </div>
                <p className="text-3xl font-bold">{analysisItems.filter(item => item.status === 'In Progress').length}</p>
              </div>
            </div>

            {/* Analysis List */}
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-4">Analysis Activities</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="py-3 px-4 text-left font-medium text-gray-600">ID</th>
                      <th className="py-3 px-4 text-left font-medium text-gray-600">Name</th>
                      <th className="py-3 px-4 text-left font-medium text-gray-600">Status</th>
                      <th className="py-3 px-4 text-left font-medium text-gray-600">Progress</th>
                      <th className="py-3 px-4 text-left font-medium text-gray-600">Requirements</th>
                      <th className="py-3 px-4 text-left font-medium text-gray-600">Last Run</th>
                      <th className="py-3 px-4 text-left font-medium text-gray-600">Assigned To</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysisItems.map((item, index) => (
                      <tr key={item.id} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                        <td className="py-3 px-4 text-blue-600 font-medium">{item.id}</td>
                        <td className="py-3 px-4">{item.name}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAnalysisStatusBadgeColor(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                            <div 
                              className={`h-2.5 rounded-full ${
                                item.status === 'Completed' ? 'bg-green-500' : 
                                item.status === 'Failed' ? 'bg-red-500' : 'bg-blue-500'
                              }`} 
                              style={{ width: `${item.completionPercentage}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">{item.completionPercentage}%</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {item.requirements.map(req => (
                              <span key={req} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                {req}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-4">{item.lastRun}</td>
                        <td className="py-3 px-4">{item.assignedTo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bill of Analysis Resources */}
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-4">Analysis Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <FaIcons.FaFileAlt className="text-blue-500 mr-2 text-xl" />
                    <h3 className="font-medium">Requirements</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">15 requirements linked to analyses</p>
                  <div className="flex justify-between text-sm">
                    <span>Covered: 12</span>
                    <span>Pending: 3</span>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <FaIcons.FaCog className="text-blue-500 mr-2 text-xl" />
                    <h3 className="font-medium">Parameters</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">32 parameters defined across analyses</p>
                  <div className="flex justify-between text-sm">
                    <span>Validated: 24</span>
                    <span>In Review: 8</span>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <FaIcons.FaCubes className="text-blue-500 mr-2 text-xl" />
                    <h3 className="font-medium">CAD Models</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">8 CAD models linked to analyses</p>
                  <div className="flex justify-between text-sm">
                    <span>Latest Version: 7</span>
                    <span>Outdated: 1</span>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <FaIcons.FaListAlt className="text-blue-500 mr-2 text-xl" />
                    <h3 className="font-medium">EBOM</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">4 BOMs integrated with analyses</p>
                  <div className="flex justify-between text-sm">
                    <span>Current: 3</span>
                    <span>Pending Update: 1</span>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <FaIcons.FaChartLine className="text-blue-500 mr-2 text-xl" />
                    <h3 className="font-medium">Simulation Models</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">7 simulation models in use</p>
                  <div className="flex justify-between text-sm">
                    <span>Validated: 5</span>
                    <span>In Development: 2</span>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <FaIcons.FaCheckCircle className="text-blue-500 mr-2 text-xl" />
                    <h3 className="font-medium">Results</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">3 completed analysis results</p>
                  <div className="flex justify-between text-sm">
                    <span>Approved: 2</span>
                    <span>Under Review: 1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Models' && (
          <>
            {/* Filters */}
            <div className="flex justify-between mb-6">
              <div className="flex space-x-4 items-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search models..."
                    className="pl-10 pr-4 py-2 border rounded-lg w-64"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                  <FaIcons.FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
                <select
                  className="border rounded-lg px-4 py-2"
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                >
                  <option value="All Statuses">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="In Development">In Development</option>
                  <option value="Deprecated">Deprecated</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
              <div className="text-sm text-gray-500">
                Showing {filteredModels.length} of {simulationModels.length} models
              </div>
            </div>

            {/* Models Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredModels.map(model => (
                <div key={model.id} className="border rounded-lg shadow-sm overflow-hidden">
                  {/* Card Header */}
                  <div className="p-4 border-b bg-gray-50 flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{model.name}</h3>
                      <p className="text-sm text-gray-500">{model.description}</p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <FaIcons.FaEllipsisV />
                    </button>
                  </div>
                  
                  {/* Card Body */}
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium text-gray-500">ID: {model.id}</span>
                      <div className="flex space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(model.status)}`}>
                          {model.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getValidationBadgeColor(model.validationStatus)}`}>
                          {model.validationStatus}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFidelityBadgeColor(model.fidelity)}`}>
                          {model.fidelity} Fidelity
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-500">Type: {model.type}</p>
                        <p className="text-sm text-gray-500">Version: {model.version}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Owner: {model.owner}</p>
                        <p className="text-sm text-gray-500">Modified: {model.lastModified}</p>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm text-gray-500 mb-1">Applicable Requirements:</p>
                      <div className="flex flex-wrap gap-1">
                        {model.applicableRequirements.map(req => (
                          <span key={req} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm text-gray-500 mb-1">Tags:</p>
                      <div className="flex flex-wrap gap-1">
                        {model.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Card Footer */}
                  <div className="border-t p-3 bg-gray-50 flex justify-between">
                    <button className="text-blue-600 flex items-center text-sm">
                      <FaIcons.FaEdit className="mr-1" />
                      Edit
                    </button>
                    <button className="text-blue-600 flex items-center text-sm">
                      <FaIcons.FaPlay className="mr-1" />
                      Use in Simulation
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'Automation' && (
          <div>
            {/* Automation Dashboard */}
            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Total Workflows</h3>
                    <FaIcons.FaRobot className="text-blue-500" />
                  </div>
                  <p className="text-3xl font-bold">{automationWorkflows.length}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Running</h3>
                    <FaIcons.FaPlay className="text-green-500" />
                  </div>
                  <p className="text-3xl font-bold">{automationWorkflows.filter(wf => wf.status === 'Running').length}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Scheduled</h3>
                    <FaIcons.FaClock className="text-purple-500" />
                  </div>
                  <p className="text-3xl font-bold">{automationWorkflows.filter(wf => wf.status === 'Scheduled').length}</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Failed</h3>
                    <FaIcons.FaExclamationTriangle className="text-red-500" />
                  </div>
                  <p className="text-3xl font-bold">{automationWorkflows.filter(wf => wf.status === 'Failed').length}</p>
                </div>
              </div>
            </div>

            {/* Automation Filters */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-4 items-center">
                <select
                  className="border rounded-lg px-4 py-2"
                  value={automationFilter}
                  onChange={e => setAutomationFilter(e.target.value)}
                >
                  <option value="All">All Statuses</option>
                  <option value="Running">Running</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                  <option value="Failed">Failed</option>
                  <option value="Paused">Paused</option>
                </select>
              </div>
              <div className="text-sm text-gray-500">
                Showing {filteredAutomations.length} of {automationWorkflows.length} automation workflows
              </div>
            </div>

            {/* Active Workflows */}
            <div className="mb-8">
              <h2 className="text-lg font-medium mb-4">Active Workflows</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredAutomations.filter(wf => wf.status === 'Running').map(workflow => (
                  <div key={workflow.id} className="border rounded-lg overflow-hidden shadow-sm">
                    <div className="p-4 border-b bg-blue-50 flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{workflow.name}</h3>
                        <p className="text-sm text-gray-600">{workflow.description}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAutomationStatusBadgeColor(workflow.status)}`}>
                        {workflow.status}
                      </span>
                    </div>
                    <div className="p-4">
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{workflow.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${workflow.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center">
                          <FaIcons.FaClock className="text-gray-500 mr-2" />
                          <span className="text-gray-700">Runtime: {workflow.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <FaIcons.FaServer className="text-gray-500 mr-2" />
                          <span className="text-gray-700">{workflow.environmentName}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-3">
                        <div>
                          <span className="text-xs text-gray-500">CPU Usage</span>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className={`h-2 rounded-full ${workflow.cpuUsage > 90 ? 'bg-red-500' : 'bg-green-500'}`}
                              style={{ width: `${workflow.cpuUsage}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500">Memory Usage</span>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className={`h-2 rounded-full ${workflow.memoryUsage > 90 ? 'bg-red-500' : 'bg-green-500'}`}
                              style={{ width: `${workflow.memoryUsage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredAutomations.filter(wf => wf.status === 'Running').length === 0 && (
                  <div className="col-span-2 text-center py-8 bg-gray-50 rounded-lg">
                    <FaIcons.FaPauseCircle className="mx-auto text-4xl text-gray-400 mb-2" />
                    <p className="text-gray-500">No active workflows at the moment</p>
                  </div>
                )}
              </div>
            </div>

            {/* All Workflows Table */}
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-4">All Automation Workflows</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="py-3 px-4 text-left font-medium text-gray-600">ID</th>
                      <th className="py-3 px-4 text-left font-medium text-gray-600">Workflow</th>
                      <th className="py-3 px-4 text-left font-medium text-gray-600">Status</th>
                      <th className="py-3 px-4 text-left font-medium text-gray-600">Schedule</th>
                      <th className="py-3 px-4 text-left font-medium text-gray-600">Last Run</th>
                      <th className="py-3 px-4 text-left font-medium text-gray-600">Next Run</th>
                      <th className="py-3 px-4 text-left font-medium text-gray-600">Environment</th>
                      <th className="py-3 px-4 text-left font-medium text-gray-600">Owner</th>
                      <th className="py-3 px-4 text-center font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAutomations.map((workflow, index) => (
                      <tr key={workflow.id} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                        <td className="py-3 px-4 text-blue-600 font-medium">{workflow.id}</td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{workflow.name}</p>
                            <p className="text-xs text-gray-500">{workflow.description}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAutomationStatusBadgeColor(workflow.status)}`}>
                              {workflow.status}
                            </span>
                            {workflow.status === 'Running' && (
                              <span className="ml-2 text-xs text-gray-500">{workflow.progress}%</span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">{workflow.schedule}</td>
                        <td className="py-3 px-4">{workflow.lastRun}</td>
                        <td className="py-3 px-4">{workflow.nextRun}</td>
                        <td className="py-3 px-4">{workflow.environmentName}</td>
                        <td className="py-3 px-4">{workflow.owner}</td>
                        <td className="py-3 px-4">
                          <div className="flex justify-center space-x-2">
                            {workflow.status === 'Running' && (
                              <button className="text-yellow-600 hover:text-yellow-800" title="Pause">
                                <FaIcons.FaPause />
                              </button>
                            )}
                            {workflow.status === 'Paused' && (
                              <button className="text-green-600 hover:text-green-800" title="Resume">
                                <FaIcons.FaPlay />
                              </button>
                            )}
                            {workflow.status === 'Scheduled' && (
                              <button className="text-green-600 hover:text-green-800" title="Run Now">
                                <FaIcons.FaPlay />
                              </button>
                            )}
                            {workflow.status === 'Completed' && workflow.results && (
                              <button className="text-blue-600 hover:text-blue-800" title="View Results">
                                <FaIcons.FaChartBar />
                              </button>
                            )}
                            {workflow.status === 'Failed' && (
                              <button className="text-red-600 hover:text-red-800" title="View Logs">
                                <FaIcons.FaFileAlt />
                              </button>
                            )}
                            <button className="text-gray-600 hover:text-gray-800" title="Edit">
                              <FaIcons.FaEdit />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Resource Monitoring */}
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-4">Compute Resource Monitoring</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">High-Performance Cluster</h3>
                    <span className="text-green-500 text-sm font-medium">Healthy</span>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>CPU Utilization</span>
                      <span>76%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '76%' }}></div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Memory Usage</span>
                      <span>62%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '62%' }}></div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    3 active workflows, 28/32 nodes online
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">FEA Workstation Cluster</h3>
                    <span className="text-yellow-500 text-sm font-medium">Warning</span>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>CPU Utilization</span>
                      <span>92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Memory Usage</span>
                      <span>87%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    0 active workflows, 8/8 nodes online
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">CI/CD Pipeline Environment</h3>
                    <span className="text-red-500 text-sm font-medium">Error</span>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>CPU Utilization</span>
                      <span>35%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Memory Usage</span>
                      <span>42%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 flex items-center">
                    <FaIcons.FaExclamationCircle className="text-red-500 mr-1" />
                    Network connectivity issues detected
                  </div>
                </div>
              </div>
            </div>

            {/* Scheduled Workflows */}
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-4">Upcoming Scheduled Workflows</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="py-3 px-4 text-left font-medium text-gray-600">Workflow</th>
                      <th className="py-3 px-4 text-left font-medium text-gray-600">Schedule</th>
                      <th className="py-3 px-4 text-left font-medium text-gray-600">Next Run</th>
                      <th className="py-3 px-4 text-left font-medium text-gray-600">Environment</th>
                      <th className="py-3 px-4 text-left font-medium text-gray-600">Models</th>
                      <th className="py-3 px-4 text-center font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAutomations
                      .filter(wf => wf.status === 'Scheduled')
                      .sort((a, b) => new Date(a.nextRun).getTime() - new Date(b.nextRun).getTime())
                      .map((workflow, index) => (
                        <tr key={workflow.id} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium">{workflow.name}</p>
                              <p className="text-xs text-gray-500">{workflow.id}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">{workflow.schedule}</td>
                          <td className="py-3 px-4">{workflow.nextRun}</td>
                          <td className="py-3 px-4">{workflow.environmentName}</td>
                          <td className="py-3 px-4">
                            <div className="flex flex-wrap gap-1">
                              {workflow.modelIds.map(modelId => (
                                <span key={modelId} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                  {modelId}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex justify-center space-x-2">
                              <button className="text-green-600 hover:text-green-800" title="Run Now">
                                <FaIcons.FaPlay />
                              </button>
                              <button className="text-blue-600 hover:text-blue-800" title="Edit Schedule">
                                <FaIcons.FaClock />
                              </button>
                              <button className="text-gray-600 hover:text-gray-800" title="Edit">
                                <FaIcons.FaEdit />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelsManagement; 