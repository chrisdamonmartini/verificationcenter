// Interfaces for Analyses data
export interface AnalysisItem {
  id: string;
  name: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Failed';
  completionPercentage: number;
  requirements: string[];
  lastRun: string;
  assignedTo: string;
  type: 'Design' | 'Verification' | 'Simulation' | 'Integration';
}

export interface EnhancedAnalysisItem extends AnalysisItem {
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

// Digital Thread interfaces
export interface DigitalThreadItem {
  id: string;
  name: string;
  type: 'Requirement' | 'Function' | 'CAD' | 'Simulation' | 'BOM' | 'Test' | 'Analysis';
  status: 'Current' | 'Modified' | 'New' | 'Deprecated';
  lastModified: string;
  modifiedBy: string;
  linkedItems: string[];
}

// Mock data for analyses
export const mockAnalysisItems: EnhancedAnalysisItem[] = [
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
    linkedThreadItems: [],
    type: 'Design'
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
    linkedThreadItems: [],
    type: 'Verification'
  },
  {
    id: 'AN-003',
    name: 'Aerodynamic Analysis - Full Aircraft',
    status: 'In Progress',
    completionPercentage: 45,
    requirements: ['SR-002', 'SR-005', 'SR-008'],
    lastRun: '2023-05-05',
    assignedTo: 'Michael Chen',
    scenarios: ['Cruise Conditions', 'Takeoff and Landing', 'Crosswind Operations'],
    functions: ['Drag Reduction', 'Lift Optimization'],
    cad: ['Full Aircraft Assembly v1.8', 'Fuselage Design v2.2'],
    bom: ['Aerodynamic Surfaces BOM v1.5'],
    simulationModels: ['SM-004', 'SM-006'],
    automations: ['AUTO-003'],
    dueDate: '2023-06-15',
    description: 'Comprehensive aerodynamic analysis of the full aircraft configuration',
    linkedThreadItems: [],
    type: 'Simulation'
  },
  {
    id: 'AN-004',
    name: 'Control Systems Analysis',
    status: 'Pending',
    completionPercentage: 0,
    requirements: ['SR-020', 'SR-021', 'SR-022'],
    lastRun: 'N/A',
    assignedTo: 'Sarah Williams',
    scenarios: ['Normal Operation', 'Emergency Procedures', 'System Failures'],
    functions: ['Flight Control', 'Stability Augmentation'],
    cad: ['Control Surfaces v1.3', 'Actuator Assemblies v2.0'],
    bom: ['Control Systems BOM v1.0'],
    simulationModels: ['SM-008', 'SM-009'],
    automations: ['AUTO-004'],
    dueDate: '2023-05-30',
    description: 'Analysis of control systems response and performance under different flight conditions',
    linkedThreadItems: [],
    type: 'Verification'
  },
  {
    id: 'AN-005',
    name: 'Environmental Impact Analysis',
    status: 'Completed',
    completionPercentage: 100,
    requirements: ['SR-030', 'SR-031'],
    lastRun: '2023-04-28',
    assignedTo: 'David Kim',
    scenarios: ['Standard Flight Profile', 'Extended Range Operations'],
    functions: ['Emissions Control', 'Noise Reduction'],
    cad: ['Engine Exhaust v2.5', 'Acoustic Treatments v1.7'],
    bom: ['Environmental Systems BOM v2.2'],
    simulationModels: ['SM-010', 'SM-011'],
    automations: ['AUTO-005'],
    dueDate: '2023-05-10',
    description: 'Analysis of emissions and environmental impact across multiple flight profiles',
    linkedThreadItems: [],
    type: 'Simulation'
  }
];

// Mock data for digital thread items
export const mockDigitalThreadItems: DigitalThreadItem[] = [
  {
    id: 'SR-001',
    name: 'Wing Structure Load Requirements',
    type: 'Requirement',
    status: 'Current',
    lastModified: '2023-03-15',
    modifiedBy: 'Robert Johnson',
    linkedItems: ['AN-001']
  },
  {
    id: 'SR-004',
    name: 'Wing Flex Tolerance',
    type: 'Requirement',
    status: 'Modified',
    lastModified: '2023-04-20',
    modifiedBy: 'Lisa Chen',
    linkedItems: ['AN-001']
  },
  {
    id: 'SR-009',
    name: 'Material Strength Requirements',
    type: 'Requirement',
    status: 'Current',
    lastModified: '2023-02-10',
    modifiedBy: 'Robert Johnson',
    linkedItems: ['AN-001']
  },
  {
    id: 'SR-012',
    name: 'Engine Bay Thermal Limits',
    type: 'Requirement',
    status: 'Modified',
    lastModified: '2023-04-05',
    modifiedBy: 'Maria Garcia',
    linkedItems: ['AN-002']
  },
  {
    id: 'SR-015',
    name: 'Heat Shield Performance',
    type: 'Requirement',
    status: 'Current',
    lastModified: '2023-03-01',
    modifiedBy: 'Alex Thompson',
    linkedItems: ['AN-002']
  },
  {
    id: 'SR-002',
    name: 'Drag Coefficient Targets',
    type: 'Requirement',
    status: 'Current',
    lastModified: '2023-02-20',
    modifiedBy: 'Robert Johnson',
    linkedItems: ['AN-003']
  },
  {
    id: 'SR-005',
    name: 'Lift Performance Requirements',
    type: 'Requirement',
    status: 'Current',
    lastModified: '2023-02-25',
    modifiedBy: 'Lisa Chen',
    linkedItems: ['AN-003']
  },
  {
    id: 'SR-008',
    name: 'Crosswind Stability Requirements',
    type: 'Requirement',
    status: 'New',
    lastModified: '2023-04-15',
    modifiedBy: 'Michael Chen',
    linkedItems: ['AN-003']
  },
  {
    id: 'SR-020',
    name: 'Control Response Time',
    type: 'Requirement',
    status: 'Current',
    lastModified: '2023-03-10',
    modifiedBy: 'Sarah Williams',
    linkedItems: ['AN-004']
  },
  {
    id: 'SR-021',
    name: 'Control System Redundancy',
    type: 'Requirement',
    status: 'Current',
    lastModified: '2023-03-12',
    modifiedBy: 'David Kim',
    linkedItems: ['AN-004']
  },
  {
    id: 'SR-022',
    name: 'Failure Mode Handling',
    type: 'Requirement',
    status: 'Current',
    lastModified: '2023-03-15',
    modifiedBy: 'Emily Johnson',
    linkedItems: ['AN-004']
  },
  {
    id: 'SR-030',
    name: 'Emissions Standards Compliance',
    type: 'Requirement',
    status: 'Current',
    lastModified: '2023-02-05',
    modifiedBy: 'Maria Garcia',
    linkedItems: ['AN-005']
  },
  {
    id: 'SR-031',
    name: 'Noise Level Requirements',
    type: 'Requirement',
    status: 'Current',
    lastModified: '2023-02-08',
    modifiedBy: 'Alex Thompson',
    linkedItems: ['AN-005']
  }
];

// Mock data for recent changes
export const mockRecentChanges: { [id: string]: boolean } = {
  'SR-004': true,
  'SR-008': true,
  'SR-012': true,
  'SM-002': true,
  'SM-006': true,
  'AUTO-001': true,
  'CAD-1': true,
  'BOM-2': true,
  'FUNC-1': true
};

// Helper function to get status badge color
export const getAnalysisStatusBadgeColor = (status: string): string => {
  switch (status) {
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