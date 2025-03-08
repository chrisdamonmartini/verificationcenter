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

// HPC cluster status interface
interface HPCCluster {
  id: string;
  name: string;
  status: 'Online' | 'Degraded' | 'Offline' | 'Maintenance';
  totalNodes: number;
  activeNodes: number;
  cpuUsage: number;
  memoryUsage: number;
  storageUsage: number;
  jobsRunning: number;
  jobsQueued: number;
  uptime: string;
  lastMaintenance: string;
  nextMaintenance: string;
}

// HPC Job interface
interface HPCJob {
  id: string;
  name: string;
  user: string;
  status: 'Running' | 'Queued' | 'Completed' | 'Failed' | 'Canceled';
  priority: 'Low' | 'Normal' | 'High' | 'Critical';
  startTime: string;
  endTime?: string;
  estimatedCompletion?: string;
  progress: number;
  nodesAllocated: number;
  cpuCores: number;
  memoryAllocated: string;
  cluster: string;
  analysisId?: string;
}

// Digital Thread interfaces
interface DigitalThreadNode {
  id: string;
  name: string;
  type: 'Requirement' | 'Function' | 'Component' | 'Simulation' | 'Test' | 'CAD' | 'BOM';
  status: 'Current' | 'Modified' | 'New' | 'Deprecated';
  lastModified: string;
  modifiedBy: string;
  links: string[]; // IDs of connected nodes
}

interface RelatedItem {
  id: string;
  name: string;
  type: string;
  status: string;
  link: string;
}

const ModelsManagement: React.FC = () => {
  // Active tab state
  const [activeTab, setActiveTab] = useState<'Analyses' | 'Models' | 'Automation' | 'HPCStatus'>('Analyses');
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [typeFilter, setTypeFilter] = useState('All');
  const [validationFilter, setValidationFilter] = useState('All');
  const [automationFilter, setAutomationFilter] = useState('All');
  const [clusterFilter, setClusterFilter] = useState('All Clusters');
  const [jobStatusFilter, setJobStatusFilter] = useState('All Statuses');

  // New state for Digital Thread
  const [showDigitalThread, setShowDigitalThread] = useState<boolean>(false);
  const [selectedNode, setSelectedNode] = useState<DigitalThreadNode | null>(null);
  const [timeframeFilter, setTimeframeFilter] = useState<string>('all');
  
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

  // Sample HPC clusters data
  const hpcClusters: HPCCluster[] = [
    {
      id: 'HPC-001',
      name: 'High-Performance Compute Cluster',
      status: 'Online',
      totalNodes: 32,
      activeNodes: 28,
      cpuUsage: 76,
      memoryUsage: 62,
      storageUsage: 58,
      jobsRunning: 5,
      jobsQueued: 3,
      uptime: '45 days, 12 hours',
      lastMaintenance: '2023-03-15',
      nextMaintenance: '2023-06-15'
    },
    {
      id: 'HPC-002',
      name: 'FEA Workstation Cluster',
      status: 'Degraded',
      totalNodes: 8,
      activeNodes: 8,
      cpuUsage: 92,
      memoryUsage: 87,
      storageUsage: 63,
      jobsRunning: 2,
      jobsQueued: 4,
      uptime: '32 days, 8 hours',
      lastMaintenance: '2023-04-01',
      nextMaintenance: '2023-07-01'
    },
    {
      id: 'HPC-003',
      name: 'CI/CD Pipeline Environment',
      status: 'Degraded',
      totalNodes: 4,
      activeNodes: 3,
      cpuUsage: 35,
      memoryUsage: 42,
      storageUsage: 29,
      jobsRunning: 1,
      jobsQueued: 0,
      uptime: '12 days, 6 hours',
      lastMaintenance: '2023-04-25',
      nextMaintenance: '2023-07-25'
    },
    {
      id: 'HPC-004',
      name: 'Data Analytics Cluster',
      status: 'Offline',
      totalNodes: 12,
      activeNodes: 0,
      cpuUsage: 0,
      memoryUsage: 0,
      storageUsage: 72,
      jobsRunning: 0,
      jobsQueued: 0,
      uptime: '0 days, 0 hours',
      lastMaintenance: '2023-05-10',
      nextMaintenance: '2023-05-12'
    }
  ];

  // Sample HPC jobs data
  const hpcJobs: HPCJob[] = [
    {
      id: 'JOB-001',
      name: 'Aerodynamic CFD Analysis - Full Wing',
      user: 'John Smith',
      status: 'Running',
      priority: 'High',
      startTime: '2023-05-11 08:34',
      estimatedCompletion: '2023-05-11 16:30',
      progress: 67,
      nodesAllocated: 8,
      cpuCores: 256,
      memoryAllocated: '1024 GB',
      cluster: 'High-Performance Compute Cluster',
      analysisId: 'AN-001'
    },
    {
      id: 'JOB-002',
      name: 'Structural FEA - Full Airframe',
      user: 'Sarah Johnson',
      status: 'Queued',
      priority: 'Normal',
      startTime: 'Pending',
      estimatedCompletion: 'Estimated 8h runtime',
      progress: 0,
      nodesAllocated: 4,
      cpuCores: 128,
      memoryAllocated: '512 GB',
      cluster: 'FEA Workstation Cluster',
      analysisId: 'AN-002'
    },
    {
      id: 'JOB-003',
      name: 'Thermal Analysis Batch - Engine Components',
      user: 'Michael Brown',
      status: 'Running',
      priority: 'Normal',
      startTime: '2023-05-11 10:15',
      estimatedCompletion: '2023-05-11 14:45',
      progress: 42,
      nodesAllocated: 2,
      cpuCores: 64,
      memoryAllocated: '256 GB',
      cluster: 'High-Performance Compute Cluster',
      analysisId: 'AN-002'
    },
    {
      id: 'JOB-004',
      name: 'Control System Simulation',
      user: 'Lisa Garcia',
      status: 'Running',
      priority: 'Low',
      startTime: '2023-05-11 09:00',
      estimatedCompletion: '2023-05-11 12:00',
      progress: 85,
      nodesAllocated: 1,
      cpuCores: 32,
      memoryAllocated: '128 GB',
      cluster: 'CI/CD Pipeline Environment',
      analysisId: 'AN-004'
    },
    {
      id: 'JOB-005',
      name: 'Environmental Impact Simulation',
      user: 'Robert Wilson',
      status: 'Failed',
      priority: 'Normal',
      startTime: '2023-05-10 14:30',
      endTime: '2023-05-10 15:45',
      progress: 34,
      nodesAllocated: 4,
      cpuCores: 128,
      memoryAllocated: '512 GB',
      cluster: 'High-Performance Compute Cluster',
      analysisId: 'AN-005'
    },
    {
      id: 'JOB-006',
      name: 'Multi-physics Simulation - Wing Loading',
      user: 'John Smith',
      status: 'Completed',
      priority: 'Critical',
      startTime: '2023-05-10 08:00',
      endTime: '2023-05-10 16:45',
      progress: 100,
      nodesAllocated: 12,
      cpuCores: 384,
      memoryAllocated: '1536 GB',
      cluster: 'High-Performance Compute Cluster',
      analysisId: 'AN-001'
    }
  ];

  // Mock digital thread data
  const digitalThreadNodes: DigitalThreadNode[] = [
    {
      id: 'REQ-001',
      name: 'Aerodynamic Performance',
      type: 'Requirement',
      status: 'Current',
      lastModified: '2024-03-15',
      modifiedBy: 'J. Smith',
      links: ['FUNC-001', 'SIM-001']
    },
    {
      id: 'FUNC-001',
      name: 'Wing Lift Calculation',
      type: 'Function',
      status: 'Modified',
      lastModified: '2024-04-02',
      modifiedBy: 'A. Johnson',
      links: ['REQ-001', 'CAD-001', 'SIM-001']
    },
    {
      id: 'CAD-001',
      name: 'Wing Assembly',
      type: 'CAD',
      status: 'Modified',
      lastModified: '2024-03-28',
      modifiedBy: 'R. Chen',
      links: ['FUNC-001', 'BOM-001']
    },
    {
      id: 'BOM-001',
      name: 'Wing Components',
      type: 'BOM',
      status: 'Current',
      lastModified: '2024-03-30',
      modifiedBy: 'S. Davis',
      links: ['CAD-001']
    },
    {
      id: 'SIM-001',
      name: 'Wing Aerodynamics Simulation',
      type: 'Simulation',
      status: 'Current',
      lastModified: '2024-04-05',
      modifiedBy: 'J. Wilson',
      links: ['REQ-001', 'FUNC-001', 'TEST-001']
    },
    {
      id: 'TEST-001',
      name: 'Wind Tunnel Test',
      type: 'Test',
      status: 'New',
      lastModified: '2024-04-10',
      modifiedBy: 'K. Lee',
      links: ['SIM-001']
    }
  ];
  
  // Filter digital thread nodes by timeframe
  const getFilteredNodes = () => {
    if (timeframeFilter === 'all') return digitalThreadNodes;
    
    const now = new Date();
    const cutoffDate = new Date();
    
    switch (timeframeFilter) {
      case '1week':
        cutoffDate.setDate(now.getDate() - 7);
        break;
      case '2weeks':
        cutoffDate.setDate(now.getDate() - 14);
        break;
      case '1month':
        cutoffDate.setMonth(now.getMonth() - 1);
        break;
      case '3months':
        cutoffDate.setMonth(now.getMonth() - 3);
        break;
      default:
        return digitalThreadNodes;
    }
    
    return digitalThreadNodes.filter(node => {
      const modifiedDate = new Date(node.lastModified);
      return modifiedDate >= cutoffDate;
    });
  };
  
  // Get color for node status
  const getNodeStatusColor = (status: string) => {
    switch (status) {
      case 'Current': return 'bg-green-100 text-green-800';
      case 'Modified': return 'bg-yellow-100 text-yellow-800';
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Deprecated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get icon for node type
  const getNodeTypeIcon = (type: string) => {
    switch (type) {
      case 'Requirement': return <FaIcons.FaFileAlt />;
      case 'Function': return <FaIcons.FaProjectDiagram />;
      case 'Component': return <FaIcons.FaCubes />;
      case 'Simulation': return <FaIcons.FaChartLine />;
      case 'Test': return <FaIcons.FaVial />;
      case 'CAD': return <FaIcons.FaDrawPolygon />;
      case 'BOM': return <FaIcons.FaListAlt />;
      default: return <FaIcons.FaFile />;
    }
  };
  
  // Get related items for a node
  const getRelatedItems = (nodeId: string): RelatedItem[] => {
    const node = digitalThreadNodes.find(n => n.id === nodeId);
    if (!node) return [];
    
    return node.links.map(linkId => {
      const linkedNode = digitalThreadNodes.find(n => n.id === linkId);
      if (!linkedNode) return null;
      
      return {
        id: linkedNode.id,
        name: linkedNode.name,
        type: linkedNode.type,
        status: linkedNode.status,
        link: `#${linkedNode.id}`
      };
    }).filter(item => item !== null) as RelatedItem[];
  };
  
  // Digital Thread panel component
  const DigitalThreadPanel = () => {
    return (
      <div className={`fixed bottom-0 left-0 right-0 bg-white shadow-lg transition-transform transform ${showDigitalThread ? 'translate-y-0' : 'translate-y-full'} z-50`} style={{ height: '60vh' }}>
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Digital Thread Visualization</h2>
          <div className="flex items-center space-x-4">
            <select
              className="border rounded-md p-1"
              value={timeframeFilter}
              onChange={(e) => setTimeframeFilter(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="1week">Last Week</option>
              <option value="2weeks">Last 2 Weeks</option>
              <option value="1month">Last Month</option>
              <option value="3months">Last 3 Months</option>
            </select>
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setShowDigitalThread(false)}
            >
              <FaIcons.FaTimes />
            </button>
          </div>
        </div>
        
        <div className="flex h-full">
          {/* Thread visualization */}
          <div className="flex-1 overflow-auto p-4 border-r">
            <div className="flex flex-wrap gap-4">
              {getFilteredNodes().map(node => (
                <div 
                  key={node.id}
                  className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${selectedNode?.id === node.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}`}
                  onClick={() => setSelectedNode(node)}
                >
                  <div className="flex items-center mb-2">
                    <span className="mr-2 text-blue-600">
                      {getNodeTypeIcon(node.type)}
                    </span>
                    <span className="font-medium">{node.id}: {node.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`px-2 py-1 text-xs rounded-full ${getNodeStatusColor(node.status)}`}>
                      {node.status}
                    </span>
                    <span className="text-xs text-gray-500">
                      {node.lastModified}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Selected node details */}
          {selectedNode && (
            <div className="w-96 overflow-auto p-4 bg-gray-50">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">{selectedNode.name}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="mr-2">{selectedNode.id}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getNodeStatusColor(selectedNode.status)}`}>
                    {selectedNode.status}
                  </span>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-1">Last Modified</div>
                <div className="flex items-center">
                  <FaIcons.FaCalendarAlt className="mr-2 text-gray-500" />
                  <span>{selectedNode.lastModified}</span>
                  <span className="mx-2">by</span>
                  <span>{selectedNode.modifiedBy}</span>
                </div>
              </div>
              
              {/* Related items */}
              <div>
                <div className="text-sm font-medium mb-2">Related Items</div>
                <div className="space-y-2">
                  {getRelatedItems(selectedNode.id).map(item => (
                    <div key={item.id} className="flex items-center justify-between p-2 border rounded hover:bg-white">
                      <div className="flex items-center">
                        <span className="mr-2 text-blue-600">
                          {getNodeTypeIcon(item.type)}
                        </span>
                        <span>{item.id}</span>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${getNodeStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

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

  // Filter HPC jobs based on status and cluster filters
  const filteredJobs = hpcJobs.filter(job => {
    const matchesStatus = jobStatusFilter === 'All Statuses' || job.status === jobStatusFilter;
    const matchesCluster = clusterFilter === 'All Clusters' || job.cluster === clusterFilter;
    return matchesStatus && matchesCluster;
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

  // Function to get the HPC cluster status badge color
  const getClusterStatusBadgeColor = (status: string) => {
    switch(status) {
      case 'Online':
        return 'bg-green-100 text-green-800';
      case 'Degraded':
        return 'bg-yellow-100 text-yellow-800';
      case 'Offline':
        return 'bg-red-100 text-red-800';
      case 'Maintenance':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to get the HPC job status badge color
  const getJobStatusBadgeColor = (status: string) => {
    switch(status) {
      case 'Running':
        return 'bg-blue-100 text-blue-800';
      case 'Queued':
        return 'bg-purple-100 text-purple-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      case 'Canceled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to get the job priority badge color
  const getJobPriorityBadgeColor = (priority: string) => {
    switch(priority) {
      case 'Critical':
        return 'bg-red-100 text-red-800';
      case 'High':
        return 'bg-orange-100 text-orange-800';
      case 'Normal':
        return 'bg-blue-100 text-blue-800';
      case 'Low':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-gray-50 p-6 min-h-screen relative">
      {/* Digital Thread toggle button */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg"
        onClick={() => setShowDigitalThread(!showDigitalThread)}
        title="Toggle Digital Thread View"
      >
        <FaIcons.FaProjectDiagram />
      </button>
      
      {/* Digital Thread Panel */}
      <DigitalThreadPanel />
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Analysis Dashboard</h1>
          <p className="text-gray-600">Manage simulation models, analyses, and digital thread visualization</p>
        </div>
        
        {/* Program Selection */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-lg font-semibold mb-4">Program Selection</h2>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="missileProgram"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={true}
              />
              <label htmlFor="missileProgram" className="ml-2 text-gray-700">
                Missile Program
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="fighterProgram"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={true}
              />
              <label htmlFor="fighterProgram" className="ml-2 text-gray-700">
                Fighter Program
              </label>
            </div>
          </div>
        </div>
        
        {/* Analysis Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Total Analyses</h2>
            <div className="text-4xl font-bold text-blue-600">24</div>
            <div className="mt-2 text-sm text-gray-600">5 completed, 12 in progress, 7 planned</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Models Utilized</h2>
            <div className="text-4xl font-bold text-green-600">18</div>
            <div className="mt-2 text-sm text-gray-600">12 fully validated, 6 partially validated</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Automation Workflows</h2>
            <div className="text-4xl font-bold text-purple-600">7</div>
            <div className="mt-2 text-sm text-gray-600">3 running, 2 scheduled, 2 completed</div>
          </div>
        </div>

        {/* Rest of the component... */}
      </div>
    </div>
  );
};

export default ModelsManagement; 