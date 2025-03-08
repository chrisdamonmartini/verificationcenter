import React, { useState, useEffect, useRef } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import * as BiIcons from 'react-icons/bi';
import DigitalThreadPanel, { getThreadItemIcon, getThreadStatusColor } from '../Digital/DigitalThreadPanel';

// Digital Thread interfaces - use our own definition to avoid import conflicts
interface DigitalThreadItem {
  id: string;
  name: string;
  type: 'Requirement' | 'Function' | 'CAD' | 'Simulation' | 'BOM' | 'Test' | 'Analysis';
  status: 'Current' | 'Modified' | 'New' | 'Deprecated';
  lastModified: string;
  modifiedBy: string;
  linkedItems: string[];
  dueDate?: string;
  description?: string;
}

// Enhanced Analysis Item interface
interface EnhancedAnalysisItem extends AnalysisItem {
  scenarios: string[];
  functions: string[];
  cad: string[];
  bom: string[];
  simulationModels: string[];
  automations: string[];
  dueDate: string;
  description: string;
  linkedThreadItems: DigitalThreadItem[];
}

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

const ModelsManagement: React.FC = () => {
  // Active tab state
  const [activeTab, setActiveTab] = useState<'Alpha' | 'Beta' | 'Charlie' | 'Models' | 'Automation' | 'HPCStatus'>('Alpha');
  
  // Digital Thread panel state - Alpha tab
  const [alphaShowDigitalThread, setAlphaShowDigitalThread] = useState<boolean>(false);
  const [alphaSelectedAnalysis, setAlphaSelectedAnalysis] = useState<EnhancedAnalysisItem | null>(null);
  
  // Digital Thread panel state - Beta tab
  const [betaSelectedAnalysis, setBetaSelectedAnalysis] = useState<EnhancedAnalysisItem | null>(null);
  
  // Digital Thread panel state - Charlie tab
  const [charlieExpandedAnalysis, setCharlieExpandedAnalysis] = useState<string | null>(null);
  const [charlieActiveMetric, setCharlieActiveMetric] = useState<'status' | 'requirements' | 'models' | 'changes'>('status');
  
  // Shared state
  const [recentChanges, setRecentChanges] = useState<{[id: string]: boolean}>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [typeFilter, setTypeFilter] = useState('All');
  const [validationFilter, setValidationFilter] = useState('All');
  const [automationFilter, setAutomationFilter] = useState('All');
  const [clusterFilter, setClusterFilter] = useState('All Clusters');
  const [jobStatusFilter, setJobStatusFilter] = useState('All Statuses');

  // Sample enhanced analysis data
  const enhancedAnalysisItems: EnhancedAnalysisItem[] = [
    {
      id: 'AN-001',
      name: 'Structural Analysis - Wing Components',
      status: 'Completed',
      completionPercentage: 100,
      requirements: ['SR-001', 'SR-004', 'SR-009'],
      lastRun: '2023-05-10',
      assignedTo: 'John Smith',
      scenarios: ['Flight Scenario 1', 'Extreme Weather Conditions'],
      functions: ['Lift Generation', 'Load Distribution'],
      cad: ['Wing Assembly v2.4', 'Winglet Design v1.1'],
      bom: ['Wing Components BOM v3.0'],
      simulationModels: ['SM-001', 'SM-003'],
      automations: ['AUTO-002'],
      dueDate: '2023-04-30',
      description: 'Structural analysis of main wing components under various load conditions',
      linkedThreadItems: []
    },
    {
      id: 'AN-002',
      name: 'Thermal Analysis - Engine Bay',
      status: 'In Progress',
      completionPercentage: 65,
      requirements: ['SR-012', 'SR-015'],
      lastRun: '2023-05-08',
      assignedTo: 'Emily Johnson',
      scenarios: ['Max Thrust Conditions', 'Extended Idle'],
      functions: ['Heat Dissipation', 'Thermal Insulation'],
      cad: ['Engine Bay v3.1', 'Heat Shield v2.0'],
      bom: ['Engine Components BOM v2.1'],
      simulationModels: ['SM-002', 'SM-007'],
      automations: ['AUTO-001'],
      dueDate: '2023-05-20',
      description: 'Analysis of thermal behavior in the engine bay during various operational scenarios',
      linkedThreadItems: []
    },
    {
      id: 'AN-003',
      name: 'Aerodynamic Analysis - Full Aircraft',
      status: 'Pending',
      completionPercentage: 0,
      requirements: ['SR-003', 'SR-007', 'SR-016'],
      lastRun: '',
      assignedTo: 'Michael Chen',
      scenarios: ['Cruise Conditions', 'Maximum Speed', 'Take-off & Landing'],
      functions: ['Drag Reduction', 'Lift Optimization'],
      cad: ['Full Aircraft v4.2'],
      bom: ['Aerodynamic Surfaces BOM v1.5'],
      simulationModels: ['SM-004', 'SM-008'],
      automations: ['AUTO-003'],
      dueDate: '2023-06-15',
      description: 'Comprehensive aerodynamic analysis of the full aircraft configuration',
      linkedThreadItems: []
    },
    {
      id: 'AN-004',
      name: 'Control Systems Analysis',
      status: 'In Progress',
      completionPercentage: 35,
      requirements: ['SR-022', 'SR-023', 'SR-025'],
      lastRun: '2023-05-05',
      assignedTo: 'Sarah Wilson',
      scenarios: ['Normal Operation', 'Emergency Procedures'],
      functions: ['Control Surface Response', 'System Latency'],
      cad: ['Control Systems v2.8', 'Actuators v1.7'],
      bom: ['Control Systems BOM v2.3'],
      simulationModels: ['SM-005', 'SM-010'],
      automations: ['AUTO-004'],
      dueDate: '2023-05-30',
      description: 'Analysis of control systems response and performance under different flight conditions',
      linkedThreadItems: []
    },
    {
      id: 'AN-005',
      name: 'Environmental Impact Analysis',
      status: 'Failed',
      completionPercentage: 75,
      requirements: ['SR-030', 'SR-032'],
      lastRun: '2023-05-03',
      assignedTo: 'David Wilson',
      scenarios: ['Standard Flight Profile', 'Extended Range Mission'],
      functions: ['Emissions Calculation', 'Fuel Efficiency'],
      cad: ['Engine Assembly v3.5', 'Fuel System v2.2'],
      bom: ['Engine BOM v3.6', 'Fuel System BOM v2.0'],
      simulationModels: ['SM-006', 'SM-009'],
      automations: ['AUTO-005'],
      dueDate: '2023-05-10',
      description: 'Analysis of emissions and environmental impact across multiple flight profiles',
      linkedThreadItems: []
    }
  ];

  // Sample Digital Thread Data
  const digitalThreadItems: DigitalThreadItem[] = [
    {
      id: 'REQ-001',
      name: 'Wing Loading Requirements',
      type: 'Requirement',
      status: 'Current',
      lastModified: '2023-03-15',
      modifiedBy: 'John Smith',
      linkedItems: ['FUNC-001', 'CAD-001', 'AN-001']
    },
    {
      id: 'FUNC-001',
      name: 'Wing Load Distribution',
      type: 'Function',
      status: 'Modified',
      lastModified: '2023-04-02',
      modifiedBy: 'Emily Johnson',
      linkedItems: ['REQ-001', 'CAD-001', 'SIM-001']
    },
    {
      id: 'CAD-001',
      name: 'Wing Assembly Design',
      type: 'CAD',
      status: 'Modified',
      lastModified: '2023-04-10',
      modifiedBy: 'Michael Chen',
      linkedItems: ['FUNC-001', 'BOM-001', 'AN-001']
    },
    {
      id: 'BOM-001',
      name: 'Wing Components',
      type: 'BOM',
      status: 'New',
      lastModified: '2023-04-15',
      modifiedBy: 'Sarah Wilson',
      linkedItems: ['CAD-001', 'AN-001']
    },
    {
      id: 'SIM-001',
      name: 'Wing Structural Model',
      type: 'Simulation',
      status: 'Current',
      lastModified: '2023-03-20',
      modifiedBy: 'David Wilson',
      linkedItems: ['FUNC-001', 'AN-001']
    }
  ];

  // Link thread items to analyses
  useEffect(() => {
    // Populate the linkedThreadItems for each analysis item
    const updatedAnalysisItems = enhancedAnalysisItems.map(analysis => {
      // Find all thread items that link to this analysis
      const linkedItems = digitalThreadItems.filter(item => 
        item.linkedItems.includes(analysis.id)
      );
      return {
        ...analysis,
        linkedThreadItems: linkedItems
      };
    });

    // Identify recent changes (items modified in the last 2 weeks)
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    
    const changes: {[id: string]: boolean} = {};
    digitalThreadItems.forEach(item => {
      const modifiedDate = new Date(item.lastModified);
      if (modifiedDate > twoWeeksAgo && item.status !== 'Current') {
        changes[item.id] = true;
      }
    });
    
    setRecentChanges(changes);
  }, []);

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

  // AlphaAnalysisCard component
  const AlphaAnalysisCard = ({ analysis }: { analysis: EnhancedAnalysisItem }) => {
    const hasRecentChanges = analysis.linkedThreadItems.some(item => recentChanges[item.id]);
    
    return (
      <div className={`border rounded-lg shadow-sm overflow-hidden ${hasRecentChanges ? 'border-yellow-500' : 'border-gray-200'}`}>
        <div className="p-4 bg-gray-50 flex justify-between items-start border-b">
          <div>
            <div className="flex items-center">
              <h3 className="font-medium">{analysis.name}</h3>
              {hasRecentChanges && (
                <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                  Recent Changes
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">{analysis.description}</p>
          </div>
          <div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAnalysisStatusBadgeColor(analysis.status)}`}>
              {analysis.status}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{analysis.completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  analysis.status === 'Completed' ? 'bg-green-500' :
                  analysis.status === 'Failed' ? 'bg-red-500' : 'bg-blue-500'
                }`} 
                style={{ width: `${analysis.completionPercentage}%` }}
              ></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
            <div>
              <p className="font-medium text-gray-700">Assigned To</p>
              <p>{analysis.assignedTo}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Due Date</p>
              <p>{analysis.dueDate}</p>
            </div>
          </div>
          
          <div className="mb-3">
            <p className="font-medium text-gray-700 text-sm mb-1">Requirements</p>
            <div className="flex flex-wrap gap-1">
              {analysis.requirements.map(req => (
                <span key={req} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  {req}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mb-3">
            <p className="font-medium text-gray-700 text-sm mb-1">Simulation Models</p>
            <div className="flex flex-wrap gap-1">
              {analysis.simulationModels.map(model => (
                <span key={model} className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">
                  {model}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mb-3">
            <p className="font-medium text-gray-700 text-sm mb-1">Scenarios</p>
            <div className="flex flex-wrap gap-1">
              {analysis.scenarios.map((scenario, index) => (
                <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                  {scenario}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t p-3 bg-gray-50 flex justify-between">
          <button 
            className="text-blue-600 flex items-center text-sm"
            onClick={() => {
              setAlphaSelectedAnalysis(analysis);
              setAlphaShowDigitalThread(true);
            }}
          >
            <FaIcons.FaProjectDiagram className="mr-1" />
            View Digital Thread
          </button>
          <button className="text-blue-600 flex items-center text-sm">
            <FaIcons.FaEdit className="mr-1" />
            View Details
          </button>
        </div>
      </div>
    );
  };
  
  // Function to render the Digital Thread content for Alpha tab
  const renderAlphaDigitalThread = () => {
    if (!alphaSelectedAnalysis) return null;
    
    return (
      <div className="flex flex-col h-full">
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-semibold">{alphaSelectedAnalysis.name} - Digital Thread</h3>
          <button 
            className="text-blue-600 hover:text-blue-800"
            onClick={() => setAlphaSelectedAnalysis(null)}
          >
            <FaIcons.FaTimes />
          </button>
        </div>
        
        <div className="flex-1 overflow-x-auto">
          <div className="flex space-x-4 pb-4 min-w-max">
            {/* Requirements Column */}
            <div className="min-w-64 flex-shrink-0">
              <div className="mb-2 font-medium text-center p-2 bg-blue-100 rounded-t-lg">Requirements</div>
              <div className="space-y-2">
                {alphaSelectedAnalysis.requirements.map(reqId => {
                  const item = digitalThreadItems.find(item => item.id === reqId) || {
                    id: reqId,
                    name: `Requirement ${reqId}`,
                    type: 'Requirement' as const,
                    status: 'Current' as const,
                    lastModified: '2023-04-01',
                    modifiedBy: 'System',
                    linkedItems: [alphaSelectedAnalysis.id]
                  };
                  
                  const isRecentlyChanged = recentChanges[item.id];
                  
                  return (
                    <div 
                      key={reqId}
                      className={`p-3 border rounded-lg ${isRecentlyChanged ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200'}`}
                    >
                      <div className="flex items-center mb-1">
                        {getThreadItemIcon('Requirement')}
                        <span className="ml-2 font-medium">{item.id}</span>
                      </div>
                      <p className="text-sm text-gray-700">{item.name}</p>
                      <div className="flex justify-between mt-1">
                        <span className={`px-2 py-1 text-xs rounded-full ${getThreadStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                        <span className="text-xs text-gray-500">{item.lastModified}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Functions Column */}
            <div className="min-w-64 flex-shrink-0">
              <div className="mb-2 font-medium text-center p-2 bg-green-100 rounded-t-lg">Functions</div>
              <div className="space-y-2">
                {alphaSelectedAnalysis.functions.map((funcName, index) => {
                  const funcId = `FUNC-${index + 1}`;
                  const isRecentlyChanged = recentChanges[funcId];
                  
                  return (
                    <div 
                      key={funcId}
                      className={`p-3 border rounded-lg ${isRecentlyChanged ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200'}`}
                    >
                      <div className="flex items-center mb-1">
                        {getThreadItemIcon('Function')}
                        <span className="ml-2 font-medium">{funcId}</span>
                      </div>
                      <p className="text-sm text-gray-700">{funcName}</p>
                      <div className="flex justify-between mt-1">
                        <span className={`px-2 py-1 text-xs rounded-full ${getThreadStatusColor('Current')}`}>
                          Current
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* CAD Column */}
            <div className="min-w-64 flex-shrink-0">
              <div className="mb-2 font-medium text-center p-2 bg-purple-100 rounded-t-lg">CAD Data</div>
              <div className="space-y-2">
                {alphaSelectedAnalysis.cad.map((cadName, index) => {
                  const cadId = `CAD-${index + 1}`;
                  const isRecentlyChanged = recentChanges[cadId];
                  
                  return (
                    <div 
                      key={cadId}
                      className={`p-3 border rounded-lg ${isRecentlyChanged ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200'}`}
                    >
                      <div className="flex items-center mb-1">
                        {getThreadItemIcon('CAD')}
                        <span className="ml-2 font-medium">{cadId}</span>
                      </div>
                      <p className="text-sm text-gray-700">{cadName}</p>
                      <div className="flex justify-between mt-1">
                        <span className={`px-2 py-1 text-xs rounded-full ${getThreadStatusColor('Current')}`}>
                          Current
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* BOM Column */}
            <div className="min-w-64 flex-shrink-0">
              <div className="mb-2 font-medium text-center p-2 bg-indigo-100 rounded-t-lg">Engineering BOM</div>
              <div className="space-y-2">
                {alphaSelectedAnalysis.bom.map((bomName, index) => {
                  const bomId = `BOM-${index + 1}`;
                  const isRecentlyChanged = recentChanges[bomId];
                  
                  return (
                    <div 
                      key={bomId}
                      className={`p-3 border rounded-lg ${isRecentlyChanged ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200'}`}
                    >
                      <div className="flex items-center mb-1">
                        {getThreadItemIcon('BOM')}
                        <span className="ml-2 font-medium">{bomId}</span>
                      </div>
                      <p className="text-sm text-gray-700">{bomName}</p>
                      <div className="flex justify-between mt-1">
                        <span className={`px-2 py-1 text-xs rounded-full ${getThreadStatusColor('Current')}`}>
                          Current
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Simulation Models Column */}
            <div className="min-w-64 flex-shrink-0">
              <div className="mb-2 font-medium text-center p-2 bg-orange-100 rounded-t-lg">Simulation Models</div>
              <div className="space-y-2">
                {alphaSelectedAnalysis.simulationModels.map(simId => {
                  const isRecentlyChanged = recentChanges[simId];
                  
                  return (
                    <div 
                      key={simId}
                      className={`p-3 border rounded-lg ${isRecentlyChanged ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200'}`}
                    >
                      <div className="flex items-center mb-1">
                        {getThreadItemIcon('Simulation')}
                        <span className="ml-2 font-medium">{simId}</span>
                      </div>
                      <p className="text-sm text-gray-700">Simulation Model</p>
                      <div className="flex justify-between mt-1">
                        <span className={`px-2 py-1 text-xs rounded-full ${getThreadStatusColor('Current')}`}>
                          Current
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Automations Column */}
            <div className="min-w-64 flex-shrink-0">
              <div className="mb-2 font-medium text-center p-2 bg-red-100 rounded-t-lg">Automations</div>
              <div className="space-y-2">
                {alphaSelectedAnalysis.automations.map(autoId => {
                  const isRecentlyChanged = recentChanges[autoId];
                  
                  return (
                    <div 
                      key={autoId}
                      className={`p-3 border rounded-lg ${isRecentlyChanged ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200'}`}
                    >
                      <div className="flex items-center mb-1">
                        {getThreadItemIcon('Test')}
                        <span className="ml-2 font-medium">{autoId}</span>
                      </div>
                      <p className="text-sm text-gray-700">Automation Workflow</p>
                      <div className="flex justify-between mt-1">
                        <span className={`px-2 py-1 text-xs rounded-full ${getThreadStatusColor('Current')}`}>
                          Current
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Beta tab specific state
  const BetaAnalysisCard = ({ analysis }: { analysis: EnhancedAnalysisItem }) => {
    const hasRecentChanges = analysis.linkedThreadItems.some(item => recentChanges[item.id]);
    
    return (
      <div 
        className={`border rounded-lg shadow-sm overflow-hidden cursor-pointer transition-all hover:shadow-md ${
          betaSelectedAnalysis?.id === analysis.id ? 'ring-2 ring-blue-500' : ''
        } ${hasRecentChanges ? 'border-yellow-500' : 'border-gray-200'}`}
        onClick={() => setBetaSelectedAnalysis(analysis)}
      >
        <div className="p-4 bg-gray-50 flex justify-between items-start border-b">
          <div>
            <div className="flex items-center">
              <h3 className="font-medium">{analysis.name}</h3>
              {hasRecentChanges && (
                <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                  Recent Changes
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 line-clamp-1">{analysis.description}</p>
          </div>
          <div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAnalysisStatusBadgeColor(analysis.status)}`}>
              {analysis.status}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{analysis.completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  analysis.status === 'Completed' ? 'bg-green-500' :
                  analysis.status === 'Failed' ? 'bg-red-500' : 'bg-blue-500'
                }`} 
                style={{ width: `${analysis.completionPercentage}%` }}
              ></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
            <div>
              <p className="font-medium text-gray-700">Assigned To</p>
              <p>{analysis.assignedTo}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Due Date</p>
              <p>{analysis.dueDate}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Last Run</p>
              <p>{analysis.lastRun || 'Not run yet'}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Req. Count</p>
              <p>{analysis.requirements.length}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Beta tab digital thread visualization
  const BetaDigitalThreadView = () => {
    if (!betaSelectedAnalysis) {
      return (
        <div className="h-full flex flex-col justify-center items-center bg-gray-50 rounded-lg border border-dashed border-gray-300 p-6">
          <FaIcons.FaProjectDiagram className="text-gray-400 text-5xl mb-4" />
          <p className="text-gray-600 text-center">Select an analysis on the left to view its digital thread</p>
        </div>
      );
    }
    
    return (
      <div className="h-full flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
          <div className="flex items-center">
            <FaIcons.FaProjectDiagram className="text-blue-600 mr-2" />
            <h3 className="font-medium">{betaSelectedAnalysis.name} - Digital Thread</h3>
            {betaSelectedAnalysis.linkedThreadItems.some(item => recentChanges[item.id]) && (
              <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                Recent Changes
              </span>
            )}
          </div>
        </div>
        
        <div className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="text-sm font-medium mb-2 text-gray-700">Description</h4>
              <p className="text-sm bg-white p-3 rounded-lg border border-gray-200">
                {betaSelectedAnalysis.description}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2 text-gray-700">Scenarios</h4>
              <div className="flex flex-wrap gap-1">
                {betaSelectedAnalysis.scenarios.map((scenario, index) => (
                  <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                    {scenario}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Thread visualization containers */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-3 flex items-center">
              <span className="flex items-center mr-2">
                <FaIcons.FaFileAlt className="text-blue-600 mr-1" />
                Requirements
              </span>
              <span className="text-xs text-gray-500">({betaSelectedAnalysis.requirements.length})</span>
            </h4>
            <div className="flex flex-wrap gap-3">
              {betaSelectedAnalysis.requirements.map(reqId => {
                const item = digitalThreadItems.find(item => item.id === reqId) || {
                  id: reqId,
                  name: `Requirement ${reqId}`,
                  type: 'Requirement' as const,
                  status: 'Current' as const,
                  lastModified: '2023-04-01',
                  modifiedBy: 'System',
                  linkedItems: [betaSelectedAnalysis.id]
                };
                
                const isRecentlyChanged = recentChanges[item.id];
                
                return (
                  <div 
                    key={reqId}
                    className={`p-3 border rounded-lg ${isRecentlyChanged ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200'} w-64`}
                  >
                    <div className="flex items-center mb-1">
                      {getThreadItemIcon('Requirement')}
                      <span className="ml-2 font-medium">{item.id}</span>
                    </div>
                    <p className="text-sm text-gray-700">{item.name}</p>
                    <div className="flex justify-between mt-1">
                      <span className={`px-2 py-1 text-xs rounded-full ${getThreadStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                      <span className="text-xs text-gray-500">{item.lastModified}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-8">
            <div className="mb-4 flex-1">
              <h4 className="text-sm font-semibold mb-3 flex items-center">
                <span className="flex items-center mr-2">
                  <FaIcons.FaProjectDiagram className="text-green-600 mr-1" />
                  Functions
                </span>
                <span className="text-xs text-gray-500">({betaSelectedAnalysis.functions.length})</span>
              </h4>
              <div className="space-y-2">
                {betaSelectedAnalysis.functions.map((funcName, index) => {
                  const funcId = `FUNC-${index + 1}`;
                  const isRecentlyChanged = recentChanges[funcId];
                  return (
                    <div 
                      key={funcId}
                      className={`p-3 border rounded-lg ${isRecentlyChanged ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200'}`}
                    >
                      <div className="flex items-center mb-1">
                        {getThreadItemIcon('Function')}
                        <span className="ml-2 font-medium">{funcId}</span>
                      </div>
                      <p className="text-sm text-gray-700">{funcName}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="mb-4 flex-1">
              <h4 className="text-sm font-semibold mb-3 flex items-center">
                <span className="flex items-center mr-2">
                  <FaIcons.FaDrawPolygon className="text-purple-600 mr-1" />
                  CAD Data
                </span>
                <span className="text-xs text-gray-500">({betaSelectedAnalysis.cad.length})</span>
              </h4>
              <div className="space-y-2">
                {betaSelectedAnalysis.cad.map((cadName, index) => {
                  const cadId = `CAD-${index + 1}`;
                  const isRecentlyChanged = recentChanges[cadId];
                  return (
                    <div 
                      key={cadId}
                      className={`p-3 border rounded-lg ${isRecentlyChanged ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200'}`}
                    >
                      <div className="flex items-center mb-1">
                        {getThreadItemIcon('CAD')}
                        <span className="ml-2 font-medium">{cadId}</span>
                      </div>
                      <p className="text-sm text-gray-700">{cadName}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-8">
            <div className="mb-4 flex-1">
              <h4 className="text-sm font-semibold mb-3 flex items-center">
                <span className="flex items-center mr-2">
                  <FaIcons.FaListAlt className="text-indigo-600 mr-1" />
                  BOM Items
                </span>
                <span className="text-xs text-gray-500">({betaSelectedAnalysis.bom.length})</span>
              </h4>
              <div className="space-y-2">
                {betaSelectedAnalysis.bom.map((bomName, index) => {
                  const bomId = `BOM-${index + 1}`;
                  const isRecentlyChanged = recentChanges[bomId];
                  return (
                    <div 
                      key={bomId}
                      className={`p-3 border rounded-lg ${isRecentlyChanged ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200'}`}
                    >
                      <div className="flex items-center mb-1">
                        {getThreadItemIcon('BOM')}
                        <span className="ml-2 font-medium">{bomId}</span>
                      </div>
                      <p className="text-sm text-gray-700">{bomName}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="mb-4 flex-1">
              <h4 className="text-sm font-semibold mb-3 flex items-center">
                <span className="flex items-center mr-2">
                  <FaIcons.FaChartLine className="text-orange-600 mr-1" />
                  Simulation Models
                </span>
                <span className="text-xs text-gray-500">({betaSelectedAnalysis.simulationModels.length})</span>
              </h4>
              <div className="space-y-2">
                {betaSelectedAnalysis.simulationModels.map(simId => {
                  const isRecentlyChanged = recentChanges[simId];
                  return (
                    <div 
                      key={simId}
                      className={`p-3 border rounded-lg ${isRecentlyChanged ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200'}`}
                    >
                      <div className="flex items-center mb-1">
                        {getThreadItemIcon('Simulation')}
                        <span className="ml-2 font-medium">{simId}</span>
                      </div>
                      <p className="text-sm text-gray-700">Simulation Model</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Charlie tab metric donut chart component
  const CharlieMetricDonut = ({ 
    title, 
    data, 
    colors,
    isActive,
    onClick
  }: { 
    title: string;
    data: { label: string; value: number; color: string }[];
    colors: string[];
    isActive: boolean;
    onClick: () => void;
  }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    return (
      <div 
        className={`border rounded-lg p-4 cursor-pointer transition-all ${isActive ? 'ring-2 ring-blue-500 shadow-md' : 'hover:shadow-sm'}`}
        onClick={onClick}
      >
        <h3 className="font-medium text-center mb-2">{title}</h3>
        
        <div className="flex justify-center mb-3">
          <div className="w-24 h-24 relative">
            <svg viewBox="0 0 36 36" className="w-full h-full">
              <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#e9ecef" strokeWidth="2"></circle>
              
              {data.map((item, index) => {
                const prevOffsetPercent = data
                  .slice(0, index)
                  .reduce((sum, d) => sum + (d.value / total) * 100, 0);
                  
                const strokeDasharray = `${(item.value / total) * 100} ${100 - (item.value / total) * 100}`;
                const strokeDashoffset = 100 - prevOffsetPercent;
                
                return (
                  <circle 
                    key={index}
                    cx="18" 
                    cy="18" 
                    r="15.91549430918954" 
                    fill="transparent"
                    stroke={item.color}
                    strokeWidth="3"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={String(strokeDashoffset)}
                    strokeLinecap="round"
                    style={{ transformOrigin: '50% 50%', transform: 'rotate(-90deg)' }}
                  ></circle>
                );
              })}
              
              <text x="18" y="18" textAnchor="middle" dominantBaseline="middle" className="text-xl font-bold" fill="#495057">
                {total}
              </text>
            </svg>
          </div>
        </div>
        
        <div className="space-y-1">
          {data.map((item, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                <span>{item.label}</span>
              </div>
              <span className="font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Charlie tab relationship metrics component
  const CharlieRelationshipMetrics = () => {
    const requirementCounts = enhancedAnalysisItems.reduce((acc, item) => {
      item.requirements.forEach(req => {
        if (!acc[req]) acc[req] = 0;
        acc[req]++;
      });
      return acc;
    }, {} as Record<string, number>);
    
    const modelCounts = enhancedAnalysisItems.reduce((acc, item) => {
      item.simulationModels.forEach(model => {
        if (!acc[model]) acc[model] = 0;
        acc[model]++;
      });
      return acc;
    }, {} as Record<string, number>);
    
    // Sort requirements by usage count (descending)
    const sortedRequirements = Object.entries(requirementCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);
    
    // Sort models by usage count (descending)
    const sortedModels = Object.entries(modelCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);
    
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-3">Top Requirements</h3>
          <div className="space-y-3">
            {sortedRequirements.map(([req, count]) => (
              <div key={req} className="flex items-center">
                <div className="mr-2 text-blue-500">
                  <FaIcons.FaFileAlt />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-sm">{req}</span>
                    <span className="text-sm text-gray-600">{count} analyses</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-blue-500 h-1.5 rounded-full" 
                      style={{ width: `${(count / Math.max(...Object.values(requirementCounts))) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-3">Top Simulation Models</h3>
          <div className="space-y-3">
            {sortedModels.map(([model, count]) => (
              <div key={model} className="flex items-center">
                <div className="mr-2 text-orange-500">
                  <FaIcons.FaChartLine />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-sm">{model}</span>
                    <span className="text-sm text-gray-600">{count} analyses</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-orange-500 h-1.5 rounded-full" 
                      style={{ width: `${(count / Math.max(...Object.values(modelCounts))) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  // Charlie tab analysis row component
  const CharlieAnalysisRow = ({ analysis }: { analysis: EnhancedAnalysisItem }) => {
    const isExpanded = charlieExpandedAnalysis === analysis.id;
    const hasRecentChanges = analysis.linkedThreadItems.some(item => recentChanges[item.id]);
    
    return (
      <div className="mb-2">
        {/* Main row */}
        <div 
          className={`flex items-center border rounded-lg p-3 cursor-pointer transition-all ${
            isExpanded ? 'bg-blue-50 border-blue-300' : hasRecentChanges ? 'bg-yellow-50 border-yellow-300' : 'bg-white border-gray-200 hover:bg-gray-50'
          }`}
          onClick={() => setCharlieExpandedAnalysis(isExpanded ? null : analysis.id)}
        >
          <div className="mr-3">
            <button className="text-blue-600 focus:outline-none">
              {isExpanded ? <FaIcons.FaChevronDown /> : <FaIcons.FaChevronRight />}
            </button>
          </div>
          
          <div className="w-10 mr-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAnalysisStatusBadgeColor(analysis.status)}`}>
              {analysis.status === 'Completed' ? <FaIcons.FaCheckCircle /> : 
               analysis.status === 'In Progress' ? <FaIcons.FaSpinner className="animate-spin" /> :
               analysis.status === 'Failed' ? <FaIcons.FaTimesCircle /> : <FaIcons.FaClock />}
            </span>
          </div>
          
          <div className="flex-grow">
            <div className="flex items-center">
              <h3 className="font-medium">{analysis.name}</h3>
              {hasRecentChanges && (
                <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                  Recent Changes
                </span>
              )}
            </div>
          </div>
          
          <div className="w-32 text-right text-sm text-gray-500">
            Due: {analysis.dueDate}
          </div>
          
          <div className="w-24 flex justify-end">
            <div className="w-16 flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-1.5 mr-2">
                <div 
                  className={`h-1.5 rounded-full ${
                    analysis.status === 'Completed' ? 'bg-green-500' :
                    analysis.status === 'Failed' ? 'bg-red-500' : 'bg-blue-500'
                  }`} 
                  style={{ width: `${analysis.completionPercentage}%` }}
                ></div>
              </div>
              <span className="text-xs">{analysis.completionPercentage}%</span>
            </div>
          </div>
        </div>
        
        {/* Expanded content */}
        {isExpanded && (
          <div className="border border-t-0 border-gray-200 rounded-b-lg p-4 bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
              <div>
                <h4 className="text-sm font-medium mb-2 text-gray-700">Description</h4>
                <p className="text-sm bg-gray-50 p-3 rounded-lg border border-gray-200">
                  {analysis.description}
                </p>
                
                <h4 className="text-sm font-medium mt-4 mb-2 text-gray-700">Scenarios</h4>
                <div className="flex flex-wrap gap-1">
                  {analysis.scenarios.map((scenario, index) => (
                    <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                      {scenario}
                    </span>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1 text-gray-700">Assigned To</h4>
                    <p className="text-sm">{analysis.assignedTo}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1 text-gray-700">Last Run</h4>
                    <p className="text-sm">{analysis.lastRun || 'Not run yet'}</p>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <h4 className="text-sm font-medium mb-2 text-gray-700">Digital Thread</h4>
                
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-3 border-b border-gray-200">
                    <ul className="flex space-x-3 text-sm">
                      <li>
                        <button className="px-2 py-1 rounded font-medium bg-blue-100 text-blue-800">Overview</button>
                      </li>
                      <li>
                        <button className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded">Changes</button>
                      </li>
                      <li>
                        <button className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded">Timeline</button>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-3">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <h5 className="text-xs font-medium mb-2 text-gray-500 flex items-center">
                          <FaIcons.FaFileAlt className="text-blue-600 mr-1" />
                          Requirements
                        </h5>
                        <div className="space-y-1">
                          {analysis.requirements.map(req => {
                            const isChanged = recentChanges[req];
                            return (
                              <div 
                                key={req} 
                                className={`text-xs px-2 py-1 rounded ${isChanged ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}
                              >
                                {req} {isChanged && <FaIcons.FaExclamationCircle className="inline ml-1" />}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="text-xs font-medium mb-2 text-gray-500 flex items-center">
                          <FaIcons.FaProjectDiagram className="text-green-600 mr-1" />
                          Functions
                        </h5>
                        <div className="space-y-1">
                          {analysis.functions.map((func, index) => {
                            const funcId = `FUNC-${index + 1}`;
                            const isChanged = recentChanges[funcId];
                            return (
                              <div 
                                key={index} 
                                className={`text-xs px-2 py-1 rounded ${isChanged ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}
                              >
                                {func} {isChanged && <FaIcons.FaExclamationCircle className="inline ml-1" />}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <h5 className="text-xs font-medium mb-2 text-gray-500 flex items-center">
                          <FaIcons.FaDrawPolygon className="text-purple-600 mr-1" />
                          CAD & BOM
                        </h5>
                        <div className="space-y-1">
                          {[...analysis.cad, ...analysis.bom].map((item, index) => {
                            const isChanged = index < analysis.cad.length 
                              ? recentChanges[`CAD-${index + 1}`] 
                              : recentChanges[`BOM-${index - analysis.cad.length + 1}`];
                            return (
                              <div 
                                key={index} 
                                className={`text-xs px-2 py-1 rounded ${isChanged ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}
                              >
                                {item} {isChanged && <FaIcons.FaExclamationCircle className="inline ml-1" />}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="text-xs font-medium mb-2 text-gray-500 flex items-center">
                          <FaIcons.FaChartLine className="text-orange-600 mr-1" />
                          Models & Automations
                        </h5>
                        <div className="space-y-1">
                          {[...analysis.simulationModels, ...analysis.automations].map((item, index) => {
                            const isChanged = recentChanges[item];
                            return (
                              <div 
                                key={index} 
                                className={`text-xs px-2 py-1 rounded ${isChanged ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}
                              >
                                {item} {isChanged && <FaIcons.FaExclamationCircle className="inline ml-1" />}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-2">
              <button className="flex items-center px-3 py-1 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 text-sm">
                <FaIcons.FaHistory className="mr-1" />
                History
              </button>
              <button className="flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 text-sm">
                <FaIcons.FaProjectDiagram className="mr-1" />
                Full Thread
              </button>
              <button className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200 text-sm">
                <FaIcons.FaEdit className="mr-1" />
                Edit
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Analysis</h1>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('Alpha')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'Alpha'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Alpha
          </button>
          <button
            onClick={() => setActiveTab('Beta')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'Beta'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Beta
          </button>
          <button
            onClick={() => setActiveTab('Charlie')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'Charlie'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Charlie
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
          <button
            onClick={() => setActiveTab('HPCStatus')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'HPCStatus'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            HPC Status
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'Alpha' && (
          <div>
            {/* Analysis Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Total Analyses</h3>
                  <FaIcons.FaChartBar className="text-blue-500" />
                </div>
                <p className="text-3xl font-bold">{enhancedAnalysisItems.length}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Completed</h3>
                  <FaIcons.FaCheckCircle className="text-green-500" />
                </div>
                <p className="text-3xl font-bold">{enhancedAnalysisItems.filter(item => item.status === 'Completed').length}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">In Progress</h3>
                  <FaIcons.FaSpinner className="text-yellow-500" />
                </div>
                <p className="text-3xl font-bold">{enhancedAnalysisItems.filter(item => item.status === 'In Progress').length}</p>
              </div>
            </div>

            {/* Analysis Filters */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex-grow">
                  <input
                    type="text"
                    placeholder="Search analyses..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div>
                  <select
                    className="border border-gray-300 rounded-lg px-4 py-2"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="All Statuses">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Analysis Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {enhancedAnalysisItems.map(analysis => (
                <AlphaAnalysisCard key={analysis.id} analysis={analysis} />
              ))}
            </div>
            
            {/* Alpha tab includes the digital thread visualization panel */}
            <DigitalThreadPanel
              showDigitalThread={alphaShowDigitalThread}
              setShowDigitalThread={setAlphaShowDigitalThread}
              selectedItem={alphaSelectedAnalysis}
              recentChanges={recentChanges}
              renderThreadContent={renderAlphaDigitalThread}
              position="bottom"
              height="h-96"
              title="Analysis Digital Thread"
            />
          </div>
        )}

        {activeTab === 'Beta' && (
          <div>
            {/* Beta tab dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Total Analyses</h3>
                  <FaIcons.FaChartBar className="text-blue-500" />
                </div>
                <p className="text-3xl font-bold">{enhancedAnalysisItems.length}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Completed</h3>
                  <FaIcons.FaCheckCircle className="text-green-500" />
                </div>
                <p className="text-3xl font-bold">{enhancedAnalysisItems.filter(item => item.status === 'Completed').length}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">In Progress</h3>
                  <FaIcons.FaSpinner className="text-yellow-500" />
                </div>
                <p className="text-3xl font-bold">{enhancedAnalysisItems.filter(item => item.status === 'In Progress').length}</p>
              </div>
            </div>

            {/* Beta tab filters */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex-grow">
                  <input
                    type="text"
                    placeholder="Search analyses..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div>
                  <select
                    className="border border-gray-300 rounded-lg px-4 py-2"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="All Statuses">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Beta tab side-by-side layout */}
            <div className="flex gap-6 mb-8">
              {/* Left column - Analysis list */}
              <div className="w-1/3">
                <h2 className="text-lg font-medium mb-4">Analysis List</h2>
                <div className="space-y-4">
                  {enhancedAnalysisItems.map(analysis => (
                    <BetaAnalysisCard key={analysis.id} analysis={analysis} />
                  ))}
                </div>
              </div>
              
              {/* Right column - Digital thread visualization */}
              <div className="w-2/3 border rounded-lg overflow-hidden shadow-sm">
                <BetaDigitalThreadView />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Charlie' && (
          <div>
            {/* Charlie tab - Top metrics cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <CharlieMetricDonut
                title="Analysis Status"
                data={[
                  { label: 'Completed', value: enhancedAnalysisItems.filter(item => item.status === 'Completed').length, color: '#10b981' },
                  { label: 'In Progress', value: enhancedAnalysisItems.filter(item => item.status === 'In Progress').length, color: '#3b82f6' },
                  { label: 'Pending', value: enhancedAnalysisItems.filter(item => item.status === 'Pending').length, color: '#f59e0b' },
                  { label: 'Failed', value: enhancedAnalysisItems.filter(item => item.status === 'Failed').length, color: '#ef4444' }
                ]}
                colors={['#10b981', '#3b82f6', '#f59e0b', '#ef4444']}
                isActive={charlieActiveMetric === 'status'}
                onClick={() => setCharlieActiveMetric('status')}
              />
              
              <CharlieMetricDonut
                title="Requirements Coverage"
                data={[
                  { label: 'Covered', value: 18, color: '#10b981' },
                  { label: 'Partial', value: 7, color: '#f59e0b' },
                  { label: 'Missing', value: 3, color: '#ef4444' }
                ]}
                colors={['#10b981', '#f59e0b', '#ef4444']}
                isActive={charlieActiveMetric === 'requirements'}
                onClick={() => setCharlieActiveMetric('requirements')}
              />
              
              <CharlieMetricDonut
                title="Simulation Models"
                data={[
                  { label: 'Validated', value: 5, color: '#10b981' },
                  { label: 'In Dev', value: 3, color: '#3b82f6' },
                  { label: 'Legacy', value: 2, color: '#f59e0b' }
                ]}
                colors={['#10b981', '#3b82f6', '#f59e0b']}
                isActive={charlieActiveMetric === 'models'}
                onClick={() => setCharlieActiveMetric('models')}
              />
              
              <CharlieMetricDonut
                title="Recent Changes"
                data={[
                  { label: 'Requirements', value: Object.keys(recentChanges).filter(id => id.startsWith('REQ')).length, color: '#3b82f6' },
                  { label: 'CAD/BOM', value: Object.keys(recentChanges).filter(id => id.startsWith('CAD') || id.startsWith('BOM')).length, color: '#8b5cf6' },
                  { label: 'Functions', value: Object.keys(recentChanges).filter(id => id.startsWith('FUNC')).length, color: '#10b981' },
                  { label: 'Models', value: Object.keys(recentChanges).filter(id => id.startsWith('SIM')).length, color: '#f59e0b' }
                ]}
                colors={['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b']}
                isActive={charlieActiveMetric === 'changes'}
                onClick={() => setCharlieActiveMetric('changes')}
              />
            </div>
            
            {/* Conditional metric details based on active metric */}
            {charlieActiveMetric === 'status' && (
              <div className="mb-6">
                <h2 className="text-lg font-medium mb-2">Analysis Status Overview</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2 text-gray-700">Status Timeline</h3>
                      <div className="flex items-center space-x-1">
                        <div className="h-8 bg-gray-200 rounded flex-grow flex items-center justify-center text-xs font-medium text-gray-600">
                          Planning
                        </div>
                        <FaIcons.FaChevronRight className="text-gray-400" />
                        <div className="h-8 bg-blue-200 rounded flex-grow flex items-center justify-center text-xs font-medium text-blue-800">
                          In Progress
                        </div>
                        <FaIcons.FaChevronRight className="text-gray-400" />
                        <div className="h-8 bg-gray-200 rounded flex-grow flex items-center justify-center text-xs font-medium text-gray-600">
                          Review
                        </div>
                        <FaIcons.FaChevronRight className="text-gray-400" />
                        <div className="h-8 bg-gray-200 rounded flex-grow flex items-center justify-center text-xs font-medium text-gray-600">
                          Complete
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2 text-gray-700">Current Status</h3>
                      <p className="text-sm text-gray-600 mb-2">Program is currently in active analysis phase with 3 analyses in progress.</p>
                      <div className="flex space-x-2">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                          2 analyses due this week
                        </span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          1 analysis completed today
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {charlieActiveMetric === 'changes' && <CharlieRelationshipMetrics />}
            
            {/* Analysis filters */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex-grow">
                  <input
                    type="text"
                    placeholder="Search analyses..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div>
                  <select
                    className="border border-gray-300 rounded-lg px-4 py-2"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="All Statuses">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Analyses section with expandable rows */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Analyses & Digital Thread</h2>
                <div className="text-sm text-gray-500">
                  Showing {enhancedAnalysisItems.length} analyses
                </div>
              </div>
              
              <div className="space-y-2">
                {enhancedAnalysisItems.map(analysis => (
                  <CharlieAnalysisRow key={analysis.id} analysis={analysis} />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Models' && (
          <>
            {/* Existing Models tab content */}
          </>
        )}

        {activeTab === 'Automation' && (
          <div>
            {/* Existing Automation tab content */}
          </div>
        )}

        {activeTab === 'HPCStatus' && (
          <div>
            {/* Existing HPCStatus tab content */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelsManagement; 