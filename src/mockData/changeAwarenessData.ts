import { 
  MissionChange, 
  OperationalScenarioChange, 
  RequirementChange, 
  ParameterChange,
  FunctionChange,
  LogicalChange,
  CADChange,
  BOMChange,
  ImpactedItem,
  BaseChange
} from '../types/changeAwareness';

type ProductType = 'missile' | 'fighter';

// Common component IDs for cross-referencing
const MISSILE_IDS = {
  missions: {
    LONG_RANGE: 'MISSION-LR-001',
    ANTI_SHIP: 'MISSION-AS-002',
    LAND_ATTACK: 'MISSION-LA-003',
  },
  scenarios: {
    MARITIME_DEFENSE: 'SCEN-MD-001',
    LITTORAL_OPS: 'SCEN-LO-002',
    STANDOFF_STRIKE: 'SCEN-SS-003',
  },
  requirements: {
    RANGE_REQ: 'REQ-RNG-001',
    SPEED_REQ: 'REQ-SPD-002',
    PAYLOAD_REQ: 'REQ-PLD-003',
    GUIDANCE_REQ: 'REQ-GDN-004',
    STEALTH_REQ: 'REQ-STL-005',
  },
  parameters: {
    MAX_RANGE: 'PARAM-RNG-001',
    CRUISE_SPEED: 'PARAM-SPD-002',
    MAX_SPEED: 'PARAM-SPD-003',
    WARHEAD_WEIGHT: 'PARAM-WGT-004',
    RCS_VALUE: 'PARAM-RCS-005',
  },
  functions: {
    PROPULSION: 'FUNC-PRO-001',
    GUIDANCE_SYSTEM: 'FUNC-GDN-002',
    PAYLOAD_DELIVERY: 'FUNC-PLD-003',
    TERMINAL_GUIDANCE: 'FUNC-TGD-004',
  },
  logical: {
    ENGINE_CONTROL: 'LOG-ENG-001',
    NAVIGATION_SYSTEM: 'LOG-NAV-002',
    TARGET_ACQUISITION: 'LOG-TGT-003',
    PAYLOAD_MANAGEMENT: 'LOG-PLD-004',
  },
  cad: {
    ENGINE_ASSEMBLY: 'CAD-ENG-001',
    GUIDANCE_MODULE: 'CAD-GDN-002',
    WARHEAD_COMPARTMENT: 'CAD-WPN-003',
    FUSELAGE: 'CAD-FUS-004',
    CONTROL_SURFACES: 'CAD-CTL-005',
  },
  bom: {
    TURBOFAN_ENGINE: 'BOM-ENG-001',
    FUEL_SYSTEM: 'BOM-FUEL-002',
    INS_MODULE: 'BOM-NAV-003',
    WARHEAD: 'BOM-WPN-004',
    COMPOSITE_SHELL: 'BOM-STR-005',
    ACTUATORS: 'BOM-ACT-006',
  }
};

// Mission Changes
export const missionChanges: MissionChange[] = [
  {
    id: MISSILE_IDS.missions.LONG_RANGE,
    title: 'Extended Range Capability',
    description: 'Increased the required operational range from 1000km to 1500km to match competitor capabilities',
    date: '2025-02-18T08:30:00Z',
    author: 'Col. James Wilson',
    category: 'performance',
    severity: 'major',
    status: 'approved',
    domain: 'mission',
    changeType: 'modified',
    impactedItems: [
      { id: MISSILE_IDS.requirements.RANGE_REQ, type: 'requirement', name: 'Operational Range Requirement' },
      { id: MISSILE_IDS.parameters.MAX_RANGE, type: 'parameter', name: 'Maximum Range Parameter' },
      { id: MISSILE_IDS.functions.PROPULSION, type: 'function', name: 'Propulsion System' },
      { id: MISSILE_IDS.logical.ENGINE_CONTROL, type: 'logical', name: 'Engine Control System' },
      { id: MISSILE_IDS.cad.ENGINE_ASSEMBLY, type: 'cad', name: 'Engine Assembly' },
      { id: MISSILE_IDS.bom.TURBOFAN_ENGINE, type: 'bom', name: 'Turbofan Engine' },
      { id: MISSILE_IDS.bom.FUEL_SYSTEM, type: 'bom', name: 'Fuel System' }
    ],
    technicalDetails: {
      rationale: 'Strategic assessment revealed a capability gap in long-range strike missions',
      tradeoffs: 'Increased range will require more fuel or improved fuel efficiency',
      risks: 'May increase weight, affecting other performance parameters'
    }
  },
  {
    id: MISSILE_IDS.missions.ANTI_SHIP,
    title: 'Enhanced Anti-Ship Capability',
    description: 'Added requirement for improved terminal guidance to counter advanced naval defenses',
    date: '2025-01-12T14:15:00Z',
    author: 'Cmdr. Sarah Rodriguez',
    category: 'capability',
    severity: 'critical',
    status: 'approved',
    domain: 'mission',
    changeType: 'added',
    impactedItems: [
      { id: MISSILE_IDS.requirements.GUIDANCE_REQ, type: 'requirement', name: 'Guidance System Requirement' },
      { id: MISSILE_IDS.functions.TERMINAL_GUIDANCE, type: 'function', name: 'Terminal Guidance Function' },
      { id: MISSILE_IDS.logical.TARGET_ACQUISITION, type: 'logical', name: 'Target Acquisition System' },
      { id: MISSILE_IDS.cad.GUIDANCE_MODULE, type: 'cad', name: 'Guidance Module' },
      { id: MISSILE_IDS.bom.INS_MODULE, type: 'bom', name: 'INS Module' }
    ],
    technicalDetails: {
      rationale: 'Need to counter increasingly sophisticated naval defense systems',
      tradeoffs: 'Higher cost, increased software complexity',
      risks: 'Integration challenges with existing systems'
    }
  },
  {
    id: MISSILE_IDS.missions.LAND_ATTACK,
    title: 'Reduced Collateral Damage Requirement',
    description: 'Added precision strike requirement to minimize collateral damage in urban environments',
    date: '2024-12-05T11:30:00Z',
    author: 'Gen. Robert Chen',
    category: 'safety',
    severity: 'major',
    status: 'approved',
    domain: 'mission',
    changeType: 'modified',
    impactedItems: [
      { id: MISSILE_IDS.requirements.PAYLOAD_REQ, type: 'requirement', name: 'Payload Requirements' },
      { id: MISSILE_IDS.parameters.WARHEAD_WEIGHT, type: 'parameter', name: 'Warhead Weight' },
      { id: MISSILE_IDS.functions.PAYLOAD_DELIVERY, type: 'function', name: 'Payload Delivery' },
      { id: MISSILE_IDS.logical.PAYLOAD_MANAGEMENT, type: 'logical', name: 'Payload Management System' },
      { id: MISSILE_IDS.cad.WARHEAD_COMPARTMENT, type: 'cad', name: 'Warhead Compartment' },
      { id: MISSILE_IDS.bom.WARHEAD, type: 'bom', name: 'Precision Warhead' }
    ],
    technicalDetails: {
      rationale: 'Political constraints require minimizing civilian casualties',
      tradeoffs: 'Smaller warhead may reduce overall effectiveness',
      risks: 'May not be sufficient against hardened targets'
    }
  }
];

// Operational Scenario Changes
export const operationalScenarioChanges: OperationalScenarioChange[] = [
  {
    id: MISSILE_IDS.scenarios.MARITIME_DEFENSE,
    title: 'Maritime Defense Scenario Update',
    description: 'Updated with new adversary naval defense capabilities',
    date: '2025-02-16T09:45:00Z',
    author: 'Lt. Cmdr. Michael Tang',
    category: 'scenario',
    severity: 'major',
    status: 'approved',
    domain: 'operationalScenario',
    changeType: 'modified',
    impactedItems: [
      { id: MISSILE_IDS.missions.ANTI_SHIP, type: 'mission', name: 'Anti-Ship Mission' },
      { id: MISSILE_IDS.requirements.SPEED_REQ, type: 'requirement', name: 'Speed Requirement' },
      { id: MISSILE_IDS.requirements.GUIDANCE_REQ, type: 'requirement', name: 'Guidance Requirement' },
      { id: MISSILE_IDS.parameters.MAX_SPEED, type: 'parameter', name: 'Maximum Speed' },
      { id: MISSILE_IDS.functions.TERMINAL_GUIDANCE, type: 'function', name: 'Terminal Guidance' },
      { id: MISSILE_IDS.logical.TARGET_ACQUISITION, type: 'logical', name: 'Target Acquisition' },
      { id: MISSILE_IDS.cad.CONTROL_SURFACES, type: 'cad', name: 'Control Surfaces' }
    ],
    technicalDetails: {
      rationale: 'Intelligence reports on new ship-based defense systems',
      tradeoffs: 'Need to balance speed with stealth',
      risks: 'May require significant software updates'
    }
  },
  {
    id: MISSILE_IDS.scenarios.STANDOFF_STRIKE,
    title: 'Standoff Strike Scenario Modification',
    description: 'Added requirement to launch from higher altitude to avoid detection',
    date: '2025-01-09T13:20:00Z',
    author: 'Col. David Park',
    category: 'scenario',
    severity: 'minor',
    status: 'approved',
    domain: 'operationalScenario',
    changeType: 'modified',
    impactedItems: [
      { id: MISSILE_IDS.missions.LONG_RANGE, type: 'mission', name: 'Long Range Mission' },
      { id: MISSILE_IDS.requirements.RANGE_REQ, type: 'requirement', name: 'Range Requirement' },
      { id: MISSILE_IDS.parameters.MAX_RANGE, type: 'parameter', name: 'Maximum Range' },
      { id: MISSILE_IDS.functions.PROPULSION, type: 'function', name: 'Propulsion System' },
      { id: MISSILE_IDS.logical.ENGINE_CONTROL, type: 'logical', name: 'Engine Control' },
      { id: MISSILE_IDS.cad.ENGINE_ASSEMBLY, type: 'cad', name: 'Engine Assembly' },
      { id: MISSILE_IDS.bom.FUEL_SYSTEM, type: 'bom', name: 'Fuel System' }
    ],
    technicalDetails: {
      rationale: 'Need to avoid recently deployed early warning radar systems',
      tradeoffs: 'Higher altitude launch reduces range',
      risks: 'May affect accuracy at extreme ranges'
    }
  }
];

// Requirement Changes
export const requirementChanges: RequirementChange[] = [
  {
    id: MISSILE_IDS.requirements.RANGE_REQ,
    title: 'Extended Range Requirement',
    description: 'Increased operational range requirement from 1000km to 1500km',
    date: '2025-02-17T10:15:00Z',
    author: 'Dr. Emily Johnson',
    category: 'performance',
    severity: 'major',
    status: 'approved',
    domain: 'requirement',
    changeType: 'modified',
    impactedItems: [
      { id: MISSILE_IDS.missions.LONG_RANGE, type: 'mission', name: 'Long Range Mission' },
      { id: MISSILE_IDS.parameters.MAX_RANGE, type: 'parameter', name: 'Maximum Range Parameter' },
      { id: MISSILE_IDS.functions.PROPULSION, type: 'function', name: 'Propulsion System' },
      { id: MISSILE_IDS.cad.ENGINE_ASSEMBLY, type: 'cad', name: 'Engine Assembly' },
      { id: MISSILE_IDS.bom.TURBOFAN_ENGINE, type: 'bom', name: 'Turbofan Engine' },
      { id: MISSILE_IDS.bom.FUEL_SYSTEM, type: 'bom', name: 'Fuel System' }
    ],
    technicalDetails: {
      rationale: 'Match competitor capabilities',
      specification: 'SRS-001-Range-V2',
      verification: 'Flight test required'
    }
  },
  {
    id: MISSILE_IDS.requirements.GUIDANCE_REQ,
    title: 'Advanced Guidance System Requirement',
    description: 'Updated to require multi-mode seeker with improved ECCM capabilities',
    date: '2025-01-10T16:30:00Z',
    author: 'Dr. Kevin Zhang',
    category: 'capability',
    severity: 'critical',
    status: 'approved',
    domain: 'requirement',
    changeType: 'modified',
    impactedItems: [
      { id: MISSILE_IDS.missions.ANTI_SHIP, type: 'mission', name: 'Anti-Ship Mission' },
      { id: MISSILE_IDS.functions.GUIDANCE_SYSTEM, type: 'function', name: 'Guidance System' },
      { id: MISSILE_IDS.functions.TERMINAL_GUIDANCE, type: 'function', name: 'Terminal Guidance' },
      { id: MISSILE_IDS.logical.TARGET_ACQUISITION, type: 'logical', name: 'Target Acquisition System' },
      { id: MISSILE_IDS.cad.GUIDANCE_MODULE, type: 'cad', name: 'Guidance Module' },
      { id: MISSILE_IDS.bom.INS_MODULE, type: 'bom', name: 'INS Module' }
    ],
    technicalDetails: {
      rationale: 'Counter advanced electronic warfare systems',
      specification: 'SRS-004-Guidance-V3',
      verification: 'Lab testing and field trials required'
    }
  },
  {
    id: MISSILE_IDS.requirements.STEALTH_REQ,
    title: 'Enhanced Stealth Requirement',
    description: 'Reduced radar cross-section requirement from 0.1m² to 0.05m²',
    date: '2024-11-03T14:00:00Z',
    author: 'Dr. Lisa Morgan',
    category: 'survivability',
    severity: 'major',
    status: 'approved',
    domain: 'requirement',
    changeType: 'modified',
    impactedItems: [
      { id: MISSILE_IDS.parameters.RCS_VALUE, type: 'parameter', name: 'Radar Cross Section Value' },
      { id: MISSILE_IDS.cad.FUSELAGE, type: 'cad', name: 'Fuselage Design' },
      { id: MISSILE_IDS.cad.CONTROL_SURFACES, type: 'cad', name: 'Control Surfaces' },
      { id: MISSILE_IDS.bom.COMPOSITE_SHELL, type: 'bom', name: 'Composite Shell Materials' }
    ],
    technicalDetails: {
      rationale: 'Increased detection capabilities of modern air defense systems',
      specification: 'SRS-005-Stealth-V2',
      verification: 'Anechoic chamber testing required'
    }
  }
];

// Parameter Changes
export const parameterChanges: ParameterChange[] = [
  {
    id: MISSILE_IDS.parameters.MAX_RANGE,
    title: 'Maximum Range Parameter Update',
    description: 'Increased from 1000km to 1500km',
    date: '2025-02-15T09:00:00Z',
    author: 'Dr. Thomas Wilson',
    category: 'performance',
    severity: 'major',
    status: 'approved',
    domain: 'parameter',
    changeType: 'modified',
    impactedItems: [
      { id: MISSILE_IDS.requirements.RANGE_REQ, type: 'requirement', name: 'Range Requirement' },
      { id: MISSILE_IDS.functions.PROPULSION, type: 'function', name: 'Propulsion System' },
      { id: MISSILE_IDS.cad.ENGINE_ASSEMBLY, type: 'cad', name: 'Engine Assembly' },
      { id: MISSILE_IDS.bom.TURBOFAN_ENGINE, type: 'bom', name: 'Turbofan Engine' },
      { id: MISSILE_IDS.bom.FUEL_SYSTEM, type: 'bom', name: 'Fuel System' }
    ],
    technicalDetails: {
      oldValue: '1000 km',
      newValue: '1500 km',
      rationale: 'Match mission requirements',
      impact: 'Requires fuel system redesign'
    }
  },
  {
    id: MISSILE_IDS.parameters.MAX_SPEED,
    title: 'Maximum Speed Parameter Increase',
    description: 'Increased from Mach 2.5 to Mach 3.0',
    date: '2025-01-05T11:45:00Z',
    author: 'Dr. Rachel Kim',
    category: 'performance',
    severity: 'major',
    status: 'approved',
    domain: 'parameter',
    changeType: 'modified',
    impactedItems: [
      { id: MISSILE_IDS.requirements.SPEED_REQ, type: 'requirement', name: 'Speed Requirement' },
      { id: MISSILE_IDS.functions.PROPULSION, type: 'function', name: 'Propulsion System' },
      { id: MISSILE_IDS.logical.ENGINE_CONTROL, type: 'logical', name: 'Engine Control System' },
      { id: MISSILE_IDS.cad.ENGINE_ASSEMBLY, type: 'cad', name: 'Engine Assembly' },
      { id: MISSILE_IDS.cad.FUSELAGE, type: 'cad', name: 'Fuselage Design' },
      { id: MISSILE_IDS.bom.TURBOFAN_ENGINE, type: 'bom', name: 'Turbofan Engine' }
    ],
    technicalDetails: {
      oldValue: 'Mach 2.5',
      newValue: 'Mach 3.0',
      rationale: 'Required to defeat enemy air defenses',
      impact: 'Thermal management challenges, material stress'
    }
  },
  {
    id: MISSILE_IDS.parameters.RCS_VALUE,
    title: 'Radar Cross Section Reduction',
    description: 'Reduced RCS requirement from 0.1m² to 0.05m²',
    date: '2024-10-28T15:30:00Z',
    author: 'Dr. Eric Chen',
    category: 'survivability',
    severity: 'major',
    status: 'approved',
    domain: 'parameter',
    changeType: 'modified',
    impactedItems: [
      { id: MISSILE_IDS.requirements.STEALTH_REQ, type: 'requirement', name: 'Stealth Requirement' },
      { id: MISSILE_IDS.cad.FUSELAGE, type: 'cad', name: 'Fuselage Design' },
      { id: MISSILE_IDS.cad.CONTROL_SURFACES, type: 'cad', name: 'Control Surfaces' },
      { id: MISSILE_IDS.bom.COMPOSITE_SHELL, type: 'bom', name: 'Composite Shell Materials' }
    ],
    technicalDetails: {
      oldValue: '0.1 m²',
      newValue: '0.05 m²',
      rationale: 'Improved survivability against modern radar',
      impact: 'Requires new RAM coatings and shape modifications'
    }
  }
];

// Function Changes
export const functionChanges: FunctionChange[] = [
  {
    id: MISSILE_IDS.functions.PROPULSION,
    title: 'Propulsion System Enhancement',
    description: 'Updated propulsion system to provide extended range and higher speed',
    date: '2025-02-19T08:30:00Z',
    author: 'Eng. Robert Davis',
    category: 'performance',
    severity: 'major',
    status: 'approved',
    domain: 'function',
    changeType: 'modified',
    impactedItems: [
      { id: MISSILE_IDS.parameters.MAX_RANGE, type: 'parameter', name: 'Maximum Range' },
      { id: MISSILE_IDS.parameters.MAX_SPEED, type: 'parameter', name: 'Maximum Speed' },
      { id: MISSILE_IDS.logical.ENGINE_CONTROL, type: 'logical', name: 'Engine Control System' },
      { id: MISSILE_IDS.cad.ENGINE_ASSEMBLY, type: 'cad', name: 'Engine Assembly' },
      { id: MISSILE_IDS.bom.TURBOFAN_ENGINE, type: 'bom', name: 'Turbofan Engine' },
      { id: MISSILE_IDS.bom.FUEL_SYSTEM, type: 'bom', name: 'Fuel System' }
    ],
    technicalDetails: {
      rationale: 'Meet new range and speed requirements',
      approach: 'Upgraded combustion chamber and fuel injection system',
      implications: 'Increased thermal management requirements'
    }
  },
  {
    id: MISSILE_IDS.functions.TERMINAL_GUIDANCE,
    title: 'Terminal Guidance Function Update',
    description: 'Enhanced terminal phase guidance for improved accuracy against moving targets',
    date: '2025-01-13T14:15:00Z',
    author: 'Eng. Sophia Martinez',
    category: 'capability',
    severity: 'critical',
    status: 'approved',
    domain: 'function',
    changeType: 'modified',
    impactedItems: [
      { id: MISSILE_IDS.requirements.GUIDANCE_REQ, type: 'requirement', name: 'Guidance Requirement' },
      { id: MISSILE_IDS.logical.TARGET_ACQUISITION, type: 'logical', name: 'Target Acquisition System' },
      { id: MISSILE_IDS.cad.GUIDANCE_MODULE, type: 'cad', name: 'Guidance Module' },
      { id: MISSILE_IDS.bom.INS_MODULE, type: 'bom', name: 'INS Module' }
    ],
    technicalDetails: {
      rationale: 'Counter increasing target evasion capabilities',
      approach: 'Multi-mode seeker with improved algorithms',
      implications: 'Increased processing requirements'
    }
  }
];

// Logical Architecture Changes
export const logicalChanges: LogicalChange[] = [
  {
    id: MISSILE_IDS.logical.ENGINE_CONTROL,
    title: 'Engine Control System Redesign',
    description: 'Redesigned for improved fuel efficiency and thrust management',
    date: '2025-02-20T10:00:00Z',
    author: 'Eng. Jason Thompson',
    category: 'architecture',
    severity: 'major',
    status: 'approved',
    domain: 'logical',
    changeType: 'modified',
    impactedItems: [
      { id: MISSILE_IDS.functions.PROPULSION, type: 'function', name: 'Propulsion System' },
      { id: MISSILE_IDS.cad.ENGINE_ASSEMBLY, type: 'cad', name: 'Engine Assembly' },
      { id: MISSILE_IDS.bom.TURBOFAN_ENGINE, type: 'bom', name: 'Turbofan Engine' },
      { id: MISSILE_IDS.bom.FUEL_SYSTEM, type: 'bom', name: 'Fuel System' }
    ],
    technicalDetails: {
      rationale: 'Support extended range without major fuel system redesign',
      approach: 'Advanced digital control algorithms with adaptive fuel mapping',
      implications: 'Software update required for ECS firmware'
    }
  },
  {
    id: MISSILE_IDS.logical.TARGET_ACQUISITION,
    title: 'Target Acquisition System Upgrade',
    description: 'Improved target discrimination and multi-target tracking',
    date: '2025-01-14T15:30:00Z',
    author: 'Eng. Melissa Wong',
    category: 'architecture',
    severity: 'critical',
    status: 'approved',
    domain: 'logical',
    changeType: 'modified',
    impactedItems: [
      { id: MISSILE_IDS.functions.TERMINAL_GUIDANCE, type: 'function', name: 'Terminal Guidance' },
      { id: MISSILE_IDS.cad.GUIDANCE_MODULE, type: 'cad', name: 'Guidance Module' },
      { id: MISSILE_IDS.bom.INS_MODULE, type: 'bom', name: 'INS Module' }
    ],
    technicalDetails: {
      rationale: 'Counter improved countermeasures and decoys',
      approach: 'Enhanced signal processing algorithms and sensor fusion',
      implications: 'Requires processor upgrade in guidance hardware'
    }
  }
];

// CAD Design Changes
export const cadChanges: CADChange[] = [
  {
    id: MISSILE_IDS.cad.ENGINE_ASSEMBLY,
    title: 'Engine Assembly Redesign',
    description: 'Redesigned for higher thrust and improved fuel efficiency',
    date: '2025-02-21T09:45:00Z',
    author: 'Des. Christopher Lee',
    category: 'mechanical',
    severity: 'major',
    status: 'approved',
    domain: 'cad',
    changeType: 'modified',
    impactedItems: [
      { id: MISSILE_IDS.logical.ENGINE_CONTROL, type: 'logical', name: 'Engine Control System' },
      { id: MISSILE_IDS.bom.TURBOFAN_ENGINE, type: 'bom', name: 'Turbofan Engine' },
      { id: MISSILE_IDS.bom.FUEL_SYSTEM, type: 'bom', name: 'Fuel System' }
    ],
    technicalDetails: {
      cadFile: 'EA-MISSILE-V3.2.STEP',
      changes: 'Redesigned combustion chamber, upgraded turbine blades, improved intake',
      materials: 'Titanium alloy for high-temperature components'
    }
  },
  {
    id: MISSILE_IDS.cad.FUSELAGE,
    title: 'Fuselage Design Modification',
    description: 'Modified for reduced radar cross-section and improved aerodynamics',
    date: '2025-01-15T13:20:00Z',
    author: 'Des. Sarah Johnson',
    category: 'structural',
    severity: 'major',
    status: 'approved',
    domain: 'cad',
    changeType: 'modified',
    impactedItems: [
      { id: MISSILE_IDS.parameters.RCS_VALUE, type: 'parameter', name: 'Radar Cross Section Value' },
      { id: MISSILE_IDS.bom.COMPOSITE_SHELL, type: 'bom', name: 'Composite Shell Materials' }
    ],
    technicalDetails: {
      cadFile: 'FUSELAGE-MISSILE-V2.8.STEP',
      changes: 'Refined leading edges, modified body contours, integrated RAM panels',
      materials: 'Carbon fiber composites with radar absorbent material layers'
    }
  },
  {
    id: MISSILE_IDS.cad.GUIDANCE_MODULE,
    title: 'Guidance Module Update',
    description: 'Redesigned to accommodate new multi-mode seeker',
    date: '2024-12-11T11:30:00Z',
    author: 'Des. Daniel Kim',
    category: 'electronic',
    severity: 'critical',
    status: 'approved',
    domain: 'cad',
    changeType: 'modified',
    impactedItems: [
      { id: MISSILE_IDS.logical.TARGET_ACQUISITION, type: 'logical', name: 'Target Acquisition System' },
      { id: MISSILE_IDS.bom.INS_MODULE, type: 'bom', name: 'INS Module' }
    ],
    technicalDetails: {
      cadFile: 'GUIDANCE-MODULE-V4.1.STEP',
      changes: 'Expanded seeker housing, additional cooling channels, upgraded processor bay',
      materials: 'Aluminum chassis with gold-plated electronics housing'
    }
  }
];

// Engineering BOM Changes
export const bomChanges: BOMChange[] = [
  {
    id: MISSILE_IDS.bom.TURBOFAN_ENGINE,
    title: 'Turbofan Engine Upgrade',
    description: 'Replaced with higher thrust model with improved fuel efficiency',
    date: '2025-03-02T08:00:00Z',
    author: 'Eng. Richard Taylor',
    category: 'component',
    severity: 'major',
    status: 'approved',
    domain: 'bom',
    changeType: 'modified',
    impactedItems: [
      { id: MISSILE_IDS.parameters.MAX_RANGE, type: 'parameter', name: 'Maximum Range' },
      { id: MISSILE_IDS.parameters.MAX_SPEED, type: 'parameter', name: 'Maximum Speed' },
      { id: MISSILE_IDS.functions.PROPULSION, type: 'function', name: 'Propulsion System' },
      { id: MISSILE_IDS.cad.ENGINE_ASSEMBLY, type: 'cad', name: 'Engine Assembly' }
    ],
    technicalDetails: {
      partNumber: 'TF-5000-X',
      supplier: 'Advanced Propulsion Systems',
      changes: 'Increased thrust from 45kN to 55kN, 15% improvement in fuel efficiency',
      compatibility: 'Requires updated mounting fixtures and fuel lines'
    }
  },
  {
    id: MISSILE_IDS.bom.INS_MODULE,
    title: 'INS Module Replacement',
    description: 'Upgraded with higher precision IMU and multi-mode seeker',
    date: '2025-02-17T14:45:00Z',
    author: 'Eng. Andrea Lewis',
    category: 'component',
    severity: 'critical',
    status: 'approved',
    domain: 'bom',
    changeType: 'modified',
    impactedItems: [
      { id: MISSILE_IDS.requirements.GUIDANCE_REQ, type: 'requirement', name: 'Guidance Requirement' },
      { id: MISSILE_IDS.functions.TERMINAL_GUIDANCE, type: 'function', name: 'Terminal Guidance' },
      { id: MISSILE_IDS.logical.TARGET_ACQUISITION, type: 'logical', name: 'Target Acquisition System' },
      { id: MISSILE_IDS.cad.GUIDANCE_MODULE, type: 'cad', name: 'Guidance Module' }
    ],
    technicalDetails: {
      partNumber: 'INS-9000-M',
      supplier: 'Precision Navigation Technologies',
      changes: 'Ring laser gyro with <0.001 deg/hr drift, multi-mode RF/IR seeker',
      compatibility: 'Requires updated power supply and cooling'
    }
  },
  {
    id: MISSILE_IDS.bom.COMPOSITE_SHELL,
    title: 'Composite Shell Material Change',
    description: 'Changed to advanced carbon-fiber composite with integrated RAM',
    date: '2025-01-08T09:30:00Z',
    author: 'Eng. Mark Williams',
    category: 'material',
    severity: 'major',
    status: 'approved',
    domain: 'bom',
    changeType: 'modified',
    impactedItems: [
      { id: MISSILE_IDS.parameters.RCS_VALUE, type: 'parameter', name: 'Radar Cross Section Value' },
      { id: MISSILE_IDS.requirements.STEALTH_REQ, type: 'requirement', name: 'Stealth Requirement' },
      { id: MISSILE_IDS.cad.FUSELAGE, type: 'cad', name: 'Fuselage Design' }
    ],
    technicalDetails: {
      partNumber: 'CS-RAM-3000',
      supplier: 'Advanced Materials Corp',
      changes: 'Multi-layer carbon fiber with embedded ferrite RAM material',
      compatibility: 'Requires modified manufacturing process and tooling'
    }
  }
];

// Define type for the changes map returned by getAllChanges
export interface ChangesMap {
  mission: MissionChange[];
  operationalScenario: OperationalScenarioChange[];
  requirement: RequirementChange[];
  parameter: ParameterChange[];
  function: FunctionChange[];
  logical: LogicalChange[];
  cad: CADChange[];
  bom: BOMChange[];
}

// Get a map of all changes by domain
export const getAllChanges = (): ChangesMap => {
  return {
    mission: missionChanges,
    operationalScenario: operationalScenarioChanges,
    requirement: requirementChanges,
    parameter: parameterChanges,
    function: functionChanges,
    logical: logicalChanges,
    cad: cadChanges,
    bom: bomChanges
  };
};

// Filter changes based on domain and other criteria
export const getFilteredChanges = (domain: keyof ChangesMap, weeks: number, productType: ProductType = 'missile') => {
  console.log(`getFilteredChanges called with domain: ${domain}, weeks: ${weeks}, productType: ${productType}`);
  
  const allChanges = getAllChanges();
  console.log('All changes:', allChanges);
  
  const filteredChanges = allChanges[domain] || [];
  console.log(`Changes for domain ${domain}:`, filteredChanges);

  // Apply time filter (last N weeks)
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - (weeks * 7));
  console.log('Cutoff date:', cutoffDate);
  
  const result = (filteredChanges as BaseChange[]).filter(change => {
    // Filter by date
    const changeDate = new Date(change.date);
    console.log(`Change date: ${changeDate}, included: ${changeDate >= cutoffDate}`);
    return changeDate >= cutoffDate;
  });
  
  console.log('Filtered results:', result);
  return result;
};

export default {
  missionChanges,
  operationalScenarioChanges,
  requirementChanges,
  parameterChanges,
  functionChanges,
  logicalChanges,
  cadChanges,
  bomChanges,
  getAllChanges,
  getFilteredChanges
}; 