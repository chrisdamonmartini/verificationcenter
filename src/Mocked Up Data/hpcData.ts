// Types for HPC data
export interface HPCCluster {
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

export interface HPCJob {
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

// Mock HPC clusters data
export const mockHPCClusters: HPCCluster[] = [
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
    lastMaintenance: '2023-04-15',
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
    storageUsage: 0,
    jobsRunning: 0,
    jobsQueued: 0,
    uptime: '0 days, 0 hours',
    lastMaintenance: '2023-05-01',
    nextMaintenance: '2023-05-12'
  }
];

// Mock HPC jobs data
export const mockHPCJobs: HPCJob[] = [
  {
    id: 'JOB-001',
    name: 'Missile Body CFD Analysis',
    user: 'alex.johnson',
    status: 'Running',
    priority: 'High',
    startTime: '2023-05-04 08:15',
    estimatedCompletion: '2023-05-05 20:30',
    progress: 42,
    nodesAllocated: 8,
    cpuCores: 64,
    memoryAllocated: '256 GB',
    cluster: 'HPC-001',
    analysisId: 'A-101'
  },
  {
    id: 'JOB-002',
    name: 'Wing Structure FEA',
    user: 'samantha.wilson',
    status: 'Running',
    priority: 'Critical',
    startTime: '2023-05-04 10:45',
    estimatedCompletion: '2023-05-06 14:00',
    progress: 28,
    nodesAllocated: 4,
    cpuCores: 32,
    memoryAllocated: '128 GB',
    cluster: 'HPC-002',
    analysisId: 'A-102'
  },
  {
    id: 'JOB-003',
    name: 'Hypersonic Flow Simulation',
    user: 'michael.thompson',
    status: 'Running',
    priority: 'Normal',
    startTime: '2023-05-04 12:30',
    estimatedCompletion: '2023-05-05 18:00',
    progress: 65,
    nodesAllocated: 6,
    cpuCores: 48,
    memoryAllocated: '192 GB',
    cluster: 'HPC-001',
    analysisId: 'A-103'
  },
  {
    id: 'JOB-004',
    name: 'Radar Cross-Section Analysis',
    user: 'david.garcia',
    status: 'Running',
    priority: 'High',
    startTime: '2023-05-04 14:00',
    estimatedCompletion: '2023-05-06 02:30',
    progress: 18,
    nodesAllocated: 5,
    cpuCores: 40,
    memoryAllocated: '160 GB',
    cluster: 'HPC-001',
    analysisId: 'A-104'
  },
  {
    id: 'JOB-005',
    name: 'Fuselage Stress Analysis',
    user: 'jennifer.lee',
    status: 'Running',
    priority: 'Normal',
    startTime: '2023-05-04 15:30',
    estimatedCompletion: '2023-05-05 23:45',
    progress: 7,
    nodesAllocated: 4,
    cpuCores: 32,
    memoryAllocated: '128 GB',
    cluster: 'HPC-002',
    analysisId: 'A-105'
  },
  {
    id: 'JOB-006',
    name: 'Integration Test Pipeline',
    user: 'chris.davis',
    status: 'Running',
    priority: 'Low',
    startTime: '2023-05-04 16:45',
    estimatedCompletion: '2023-05-05 04:30',
    progress: 89,
    nodesAllocated: 3,
    cpuCores: 12,
    memoryAllocated: '48 GB',
    cluster: 'HPC-003',
    analysisId: 'A-106'
  },
  {
    id: 'JOB-007',
    name: 'Propulsion System CFD',
    user: 'alex.johnson',
    status: 'Queued',
    priority: 'High',
    startTime: 'Pending',
    estimatedCompletion: 'Est. 12 hours after start',
    progress: 0,
    nodesAllocated: 6,
    cpuCores: 48,
    memoryAllocated: '192 GB',
    cluster: 'HPC-001',
    analysisId: 'A-107'
  },
  {
    id: 'JOB-008',
    name: 'Control Surface FEA',
    user: 'robert.martinez',
    status: 'Queued',
    priority: 'Normal',
    startTime: 'Pending',
    estimatedCompletion: 'Est. 8 hours after start',
    progress: 0,
    nodesAllocated: 3,
    cpuCores: 24,
    memoryAllocated: '96 GB',
    cluster: 'HPC-002',
    analysisId: 'A-108'
  },
  {
    id: 'JOB-009',
    name: 'Landing Gear Stress Analysis',
    user: 'sophia.brown',
    status: 'Queued',
    priority: 'Low',
    startTime: 'Pending',
    estimatedCompletion: 'Est. 6 hours after start',
    progress: 0,
    nodesAllocated: 2,
    cpuCores: 16,
    memoryAllocated: '64 GB',
    cluster: 'HPC-002',
    analysisId: 'A-109'
  },
  {
    id: 'JOB-010',
    name: 'Full Aircraft Aero Analysis',
    user: 'james.wilson',
    status: 'Queued',
    priority: 'High',
    startTime: 'Pending',
    estimatedCompletion: 'Est. 24 hours after start',
    progress: 0,
    nodesAllocated: 10,
    cpuCores: 80,
    memoryAllocated: '320 GB',
    cluster: 'HPC-001',
    analysisId: 'A-110'
  },
  {
    id: 'JOB-011',
    name: 'Cockpit Environmental Simulation',
    user: 'emily.taylor',
    status: 'Queued',
    priority: 'Normal',
    startTime: 'Pending',
    estimatedCompletion: 'Est. 10 hours after start',
    progress: 0,
    nodesAllocated: 4,
    cpuCores: 32,
    memoryAllocated: '128 GB',
    cluster: 'HPC-002',
    analysisId: 'A-111'
  },
  {
    id: 'JOB-012',
    name: 'High-Alpha Flight Simulation',
    user: 'michael.thompson',
    status: 'Queued',
    priority: 'High',
    startTime: 'Pending',
    estimatedCompletion: 'Est. 18 hours after start',
    progress: 0,
    nodesAllocated: 8,
    cpuCores: 64,
    memoryAllocated: '256 GB',
    cluster: 'HPC-001',
    analysisId: 'A-112'
  },
  {
    id: 'JOB-013',
    name: 'Missile Separation Analysis',
    user: 'david.garcia',
    status: 'Completed',
    priority: 'Critical',
    startTime: '2023-05-02 09:00',
    endTime: '2023-05-03 14:30',
    progress: 100,
    nodesAllocated: 12,
    cpuCores: 96,
    memoryAllocated: '384 GB',
    cluster: 'HPC-001',
    analysisId: 'A-113'
  },
  {
    id: 'JOB-014',
    name: 'Wing Flutter Analysis',
    user: 'jennifer.lee',
    status: 'Completed',
    priority: 'High',
    startTime: '2023-05-03 11:15',
    endTime: '2023-05-04 02:45',
    progress: 100,
    nodesAllocated: 6,
    cpuCores: 48,
    memoryAllocated: '192 GB',
    cluster: 'HPC-002',
    analysisId: 'A-114'
  },
  {
    id: 'JOB-015',
    name: 'Radar Performance Simulation',
    user: 'robert.martinez',
    status: 'Failed',
    priority: 'Normal',
    startTime: '2023-05-03 16:00',
    endTime: '2023-05-03 16:42',
    progress: 12,
    nodesAllocated: 4,
    cpuCores: 32,
    memoryAllocated: '128 GB',
    cluster: 'HPC-001',
    analysisId: 'A-115'
  },
  {
    id: 'JOB-016',
    name: 'Engine Thermal Analysis',
    user: 'samantha.wilson',
    status: 'Completed',
    priority: 'High',
    startTime: '2023-05-01 08:30',
    endTime: '2023-05-02 19:15',
    progress: 100,
    nodesAllocated: 8,
    cpuCores: 64,
    memoryAllocated: '256 GB',
    cluster: 'HPC-001',
    analysisId: 'A-116'
  },
  {
    id: 'JOB-017',
    name: 'Aerodynamic Heating Simulation',
    user: 'alex.johnson',
    status: 'Completed',
    priority: 'Critical',
    startTime: '2023-05-02 14:00',
    endTime: '2023-05-04 06:20',
    progress: 100,
    nodesAllocated: 10,
    cpuCores: 80,
    memoryAllocated: '320 GB',
    cluster: 'HPC-001',
    analysisId: 'A-117'
  },
  {
    id: 'JOB-018',
    name: 'Integration Build Pipeline',
    user: 'chris.davis',
    status: 'Completed',
    priority: 'Low',
    startTime: '2023-05-04 08:00',
    endTime: '2023-05-04 10:15',
    progress: 100,
    nodesAllocated: 2,
    cpuCores: 8,
    memoryAllocated: '32 GB',
    cluster: 'HPC-003',
    analysisId: 'A-118'
  },
  {
    id: 'JOB-019',
    name: 'Radar Wave Propagation',
    user: 'emily.taylor',
    status: 'Failed',
    priority: 'Normal',
    startTime: '2023-05-03 09:45',
    endTime: '2023-05-03 11:12',
    progress: 34,
    nodesAllocated: 5,
    cpuCores: 40,
    memoryAllocated: '160 GB',
    cluster: 'HPC-001',
    analysisId: 'A-119'
  },
  {
    id: 'JOB-020',
    name: 'Avionics Cooling Analysis',
    user: 'sophia.brown',
    status: 'Completed',
    priority: 'High',
    startTime: '2023-05-03 13:30',
    endTime: '2023-05-04 03:50',
    progress: 100,
    nodesAllocated: 4,
    cpuCores: 32,
    memoryAllocated: '128 GB',
    cluster: 'HPC-002',
    analysisId: 'A-120'
  }
];

// Helper function to get badge color based on status
export const getClusterStatusBadgeColor = (status: string): string => {
  switch (status) {
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

// Helper function to get badge color based on job status
export const getJobStatusBadgeColor = (status: string): string => {
  switch (status) {
    case 'Running':
      return 'bg-green-100 text-green-800';
    case 'Queued':
      return 'bg-yellow-100 text-yellow-800';
    case 'Completed':
      return 'bg-blue-100 text-blue-800';
    case 'Failed':
      return 'bg-red-100 text-red-800';
    case 'Canceled':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Helper function to get badge color based on job priority
export const getJobPriorityBadgeColor = (priority: string): string => {
  switch (priority) {
    case 'Critical':
      return 'bg-red-100 text-red-800';
    case 'High':
      return 'bg-orange-100 text-orange-800';
    case 'Normal':
      return 'bg-blue-100 text-blue-800';
    case 'Low':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}; 