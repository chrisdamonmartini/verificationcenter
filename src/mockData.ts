import { v4 as uuidv4 } from 'uuid';
import { 
  Aircraft, 
  SystemError, 
  Part, 
  Technician, 
  Mission, 
  Repair, 
  WeatherCondition, 
  MissionStage, 
  Base, 
  RepairStage, 
  FaultIsolationProcedure, 
  RepairProcedure, 
  ModKit, 
  AircraftWithAnomalies
} from './types';
import { addDays, subDays } from 'date-fns';

const NOW = new Date();

// Helper to create ISO date strings
const toISOString = (date: Date) => date.toISOString();

// At the top of the mockData.ts file, add:
interface TechnicianWithDetails extends Omit<Technician, 'certifications' | 'trainings' | 'assignmentHistory'> {
  certifications?: {
    type: string;
    number: string;
    issuedDate: string;
    expirationDate: string;
    status: string;
  }[];
  trainings?: {
    name: string;
    completedDate: string;
    validUntil: string;
    score: number;
  }[];
  assignmentHistory?: {
    aircraftId: string;
    taskType: string;
    startDate: string;
    endDate: string;
    outcome: string;
  }[];
}

// Generate mock technicians
export const mockTechnicians: TechnicianWithDetails[] = [
  {
    id: '1',
    name: 'John Smith',
    specialties: ['Avionics', 'Electrical'],
    available: true,
    rank: 'Senior Technician',
    certifications: [
      {
        type: 'Airframe Electronics Technician (AET)',
        number: 'AET45678',
        issuedDate: '2020-03-15',
        expirationDate: '2024-06-15',
        status: 'Active'
      },
      {
        type: 'F-35 Avionics Systems',
        number: 'F35-AV-2022',
        issuedDate: '2022-01-10',
        expirationDate: '2024-01-10',
        status: 'Active'
      }
    ],
    trainings: [
      {
        name: 'Advanced Troubleshooting for Military Aircraft',
        completedDate: '2022-09-05',
        validUntil: '2025-09-05',
        score: 95
      },
      {
        name: 'Electrical Systems Safety',
        completedDate: '2023-02-10',
        validUntil: '2025-02-10',
        score: 92
      }
    ],
    assignmentHistory: [
      {
        aircraftId: 'AC-7349',
        taskType: 'Avionics System Repair',
        startDate: '2023-08-10',
        endDate: '2023-08-12',
        outcome: 'Completed'
      },
      {
        aircraftId: 'AC-5621',
        taskType: 'Navigation System Calibration',
        startDate: '2023-07-22',
        endDate: '2023-07-23',
        outcome: 'Completed'
      }
    ],
    availability: 'Available'
  },
  {
    id: '2',
    name: 'Maria Garcia',
    specialties: ['Engines', 'Hydraulics'],
    available: false,
    currentAssignment: 'AC-8235 Engine Overhaul',
    rank: 'Technician II',
    certifications: [
      {
        type: 'F110 Engine Specialist',
        number: 'F110-2023-735',
        issuedDate: '2022-05-20',
        expirationDate: '2024-05-20',
        status: 'Active'
      },
      {
        type: 'Hydraulic Systems Maintenance',
        number: 'HYD-435',
        issuedDate: '2021-11-15',
        expirationDate: '2023-11-15', // About to expire
        status: 'Active'
      }
    ],
    trainings: [
      {
        name: 'Jet Engine Overhaul Procedures',
        completedDate: '2022-06-10',
        validUntil: '2024-06-10',
        score: 88
      }
    ],
    assignmentHistory: [
      {
        aircraftId: 'AC-8235',
        taskType: 'Engine Overhaul',
        startDate: '2023-09-01',
        endDate: '2023-09-10',
        outcome: 'In Progress'
      }
    ],
    availability: 'On Duty'
  },
  {
    id: '3',
    name: 'David Johnson',
    specialties: ['Airframe', 'Landing Gear'],
    available: true,
    rank: 'Lead Technician',
    certifications: [
      {
        type: 'A&P License',
        number: 'AP-98765',
        issuedDate: '2019-04-10',
        expirationDate: '2025-04-10',
        status: 'Active'
      },
      {
        type: 'NDT Level II',
        number: 'NDT-II-4532',
        issuedDate: '2020-08-21',
        expirationDate: '2024-08-21',
        status: 'Active'
      },
      {
        type: 'Landing Gear Specialist',
        number: 'LG-2022-398',
        issuedDate: '2022-02-15',
        expirationDate: '2024-02-15',
        status: 'Active'
      }
    ],
    trainings: [
      {
        name: 'Structural Repair Techniques',
        completedDate: '2022-07-15',
        validUntil: '2024-07-15',
        score: 97
      },
      {
        name: 'Composite Materials Repair',
        completedDate: '2023-01-25',
        validUntil: '2025-01-25',
        score: 94
      }
    ],
    assignmentHistory: [
      {
        aircraftId: 'AC-3246',
        taskType: 'Landing Gear Overhaul',
        startDate: '2023-06-05',
        endDate: '2023-06-12',
        outcome: 'Completed'
      },
      {
        aircraftId: 'AC-7519',
        taskType: 'Fuselage Inspection',
        startDate: '2023-05-15',
        endDate: '2023-05-17',
        outcome: 'Completed'
      }
    ],
    availability: 'Available'
  },
  {
    id: '4',
    name: 'Sarah Williams',
    specialties: ['Weapons Systems', 'Radar'],
    available: true,
    rank: 'Specialist',
    certifications: [
      {
        type: 'Armament Systems Technician',
        number: 'AST-2023-587',
        issuedDate: '2022-09-18',
        expirationDate: '2025-09-18',
        status: 'Active'
      },
      {
        type: 'Radar Systems Certification',
        number: 'RSC-789',
        issuedDate: '2021-06-30',
        expirationDate: '2023-10-30', // Critical - about to expire soon
        status: 'Active'
      }
    ],
    trainings: [
      {
        name: 'Advanced Weapons Integration',
        completedDate: '2022-11-09',
        validUntil: '2024-11-09',
        score: 91
      },
      {
        name: 'Military Radar Systems Maintenance',
        completedDate: '2023-03-20',
        validUntil: '2025-03-20',
        score: 89
      }
    ],
    assignmentHistory: [
      {
        aircraftId: 'AC-4578',
        taskType: 'Weapons Bay Inspection',
        startDate: '2023-07-05',
        endDate: '2023-07-06',
        outcome: 'Completed'
      },
      {
        aircraftId: 'AC-9125',
        taskType: 'Radar Calibration',
        startDate: '2023-08-01',
        endDate: '2023-08-03',
        outcome: 'Completed'
      }
    ],
    availability: 'Available'
  },
  {
    id: '5',
    name: 'Michael Chen',
    specialties: ['Avionics', 'Electrical'],
    available: false,
    rank: 'Technician I',
    availability: 'Off Duty'
  },
  {
    id: '6',
    name: 'Robert Taylor',
    specialties: ['Engines', 'Fuel Systems'],
    available: true,
    rank: 'Senior Technician',
    certifications: [
      {
        type: 'F135 Engine Specialist',
        number: 'F135-2021-392',
        issuedDate: '2021-03-25',
        expirationDate: '2023-03-25', // Expired
        status: 'Expired'
      },
      {
        type: 'Fuel Systems Safety',
        number: 'FSS-634',
        issuedDate: '2022-04-10',
        expirationDate: '2024-04-10',
        status: 'Active'
      }
    ],
    trainings: [
      {
        name: 'Advanced Engine Diagnostics',
        completedDate: '2021-05-15',
        validUntil: '2023-05-15', // Expired
        score: 86
      },
      {
        name: 'Fuel System Troubleshooting',
        completedDate: '2022-08-22',
        validUntil: '2024-08-22',
        score: 90
      }
    ],
    assignmentHistory: [
      {
        aircraftId: 'AC-6423',
        taskType: 'Engine Performance Test',
        startDate: '2023-04-18',
        endDate: '2023-04-19',
        outcome: 'Completed'
      }
    ],
    availability: 'Available'
  },
  {
    id: '7',
    name: 'Jennifer Lee',
    specialties: ['Hydraulics', 'Environmental Systems'],
    available: true,
    rank: 'Technician II',
    certifications: [
      {
        type: 'Environmental Control Systems',
        number: 'ECS-2022-156',
        issuedDate: '2022-02-28',
        expirationDate: '2024-02-28',
        status: 'Active'
      },
      {
        type: 'Hydraulic Power Systems',
        number: 'HPS-789',
        issuedDate: '2021-09-15',
        expirationDate: '2023-09-15', // Critical - expires very soon
        status: 'Active'
      }
    ],
    trainings: [
      {
        name: 'Hydraulic System Troubleshooting',
        completedDate: '2021-10-10',
        validUntil: '2023-10-10',
        score: 92
      }
    ],
    assignmentHistory: [
      {
        aircraftId: 'AC-2917',
        taskType: 'Hydraulic System Overhaul',
        startDate: '2023-07-12',
        endDate: '2023-07-15',
        outcome: 'Completed'
      }
    ],
    availability: 'Available'
  },
  {
    id: '8',
    name: 'Thomas Wright',
    specialties: ['Airframe', 'Composite Repair'],
    available: false,
    currentAssignment: 'AC-5132 Structural Repair',
    rank: 'Specialist',
    certifications: [
      {
        type: 'Advanced Composite Repair',
        number: 'ACR-2022-734',
        issuedDate: '2022-05-10',
        expirationDate: '2024-05-10',
        status: 'Active'
      }
    ],
    trainings: [
      {
        name: 'Carbon Fiber Repair Techniques',
        completedDate: '2022-06-15',
        validUntil: '2024-06-15',
        score: 94
      }
    ],
    assignmentHistory: [
      {
        aircraftId: 'AC-5132',
        taskType: 'Structural Repair',
        startDate: '2023-09-05',
        endDate: '2023-09-12',
        outcome: 'In Progress'
      },
      {
        aircraftId: 'AC-3789',
        taskType: 'Wing Panel Replacement',
        startDate: '2023-08-10',
        endDate: '2023-08-15',
        outcome: 'Completed'
      }
    ],
    availability: 'On Duty'
  }
];

// Generate mock parts
export const mockParts: Part[] = [
  {
    id: uuidv4(),
    name: 'Hydraulic Pump',
    partNumber: 'HP-2234-A',
    inventory: 5,
    onOrder: 2,
    estimatedArrival: toISOString(addDays(NOW, 3)),
  },
  {
    id: uuidv4(),
    name: 'Fuel Filter',
    partNumber: 'FF-1122-B',
    inventory: 12,
    onOrder: 0,
  },
  {
    id: uuidv4(),
    name: 'Navigation Computer',
    partNumber: 'NC-7788-C',
    inventory: 1,
    onOrder: 3,
    estimatedArrival: toISOString(addDays(NOW, 7)),
  },
  {
    id: uuidv4(),
    name: 'Landing Gear Actuator',
    partNumber: 'LGA-4456-D',
    inventory: 0,
    onOrder: 4,
    estimatedArrival: toISOString(addDays(NOW, 2)),
  },
];

// Generate mock system errors
const generateErrors = (): SystemError[] => {
  return [
    {
      id: uuidv4(),
      system: 'Hydraulics',
      component: 'Main Pump',
      description: 'Pressure fluctuations during operation',
      severity: 'Warning',
      reportedAt: toISOString(subDays(NOW, 2)),
      affectedSystems: ['Landing Gear', 'Control Surfaces'],
    },
    {
      id: uuidv4(),
      system: 'Avionics',
      component: 'Navigation System',
      description: 'GPS signal intermittent',
      severity: 'Warning',
      reportedAt: toISOString(subDays(NOW, 1)),
      affectedSystems: ['Navigation', 'Mission Systems'],
    },
    {
      id: uuidv4(),
      system: 'Engines',
      component: 'Turbine',
      description: 'Excessive vibration at high RPM',
      severity: 'Critical',
      reportedAt: toISOString(subDays(NOW, 1)),
      affectedSystems: ['Propulsion', 'Fuel System'],
    },
  ];
};

// Generate mock repairs
const generateRepair = (aircraftId: string, repairId: string): Repair => ({
  id: repairId,
  aircraftId,
  stage: 'Maintenance In Work' as RepairStage,
  startTime: toISOString(subDays(NOW, 1)),
  estimatedCompletionTime: toISOString(addDays(NOW, 2)),
  assignedTechnicians: [mockTechnicians[0]],
  technicianIds: [mockTechnicians[0].id],
  status: 'In Progress',
  description: 'Repairing hydraulic system components',
  location: 'Main Hangar',
  partsRequired: [
    { id: mockParts[0].id, quantity: 1, name: mockParts[0].name },
    { id: mockParts[3].id, quantity: 2, name: mockParts[3].name }
  ],
  notes: 'Replacing main hydraulic pump and testing system integrity'
});

// Generate mock missions
const generateMissions = (aircraftId: string): Mission[] => {
  return [
    {
      id: uuidv4(),
      name: 'Training Exercise Alpha',
      title: 'Training Exercise Alpha',
      date: toISOString(subDays(NOW, 5)),
      duration: 24,
      startTime: toISOString(subDays(NOW, 5)),
      endTime: toISOString(subDays(NOW, 4)),
      status: 'Completed',
      priority: 'Medium',
      aircraftId,
      stages: [],
    },
    {
      id: uuidv4(),
      name: 'Reconnaissance Flight Bravo',
      title: 'Reconnaissance Flight Bravo',
      date: toISOString(addDays(NOW, 1)),
      duration: 48,
      startTime: toISOString(addDays(NOW, 1)),
      endTime: toISOString(addDays(NOW, 2)),
      status: 'Scheduled',
      priority: 'High',
      aircraftId,
      stages: [],
    },
    {
      id: uuidv4(),
      name: 'Transport Mission Charlie',
      title: 'Transport Mission Charlie',
      date: toISOString(addDays(NOW, 4)),
      duration: 72,
      startTime: toISOString(addDays(NOW, 4)),
      endTime: toISOString(addDays(NOW, 6)),
      status: 'Scheduled',
      priority: 'Medium',
      aircraftId,
      stages: [],
    },
  ];
};

// Update the missionStages with a larger flight path
const missionStages: MissionStage[] = [
  {
    id: '1',
    name: 'Takeoff',
    status: 'Completed',
    estimatedDuration: 15,
    waypoints: [
      { lat: 41.123, lng: -111.973, altitude: 0, order: 0 },
      { lat: 41.125, lng: -111.975, altitude: 1000, order: 1 },
      { lat: 41.127, lng: -111.977, altitude: 5000, order: 2 }
    ]
  },
  {
    id: '2',
    name: 'Mission Path Alpha',
    status: 'In Progress',
    estimatedDuration: 120,
    waypoints: [
      { lat: 41.127, lng: -111.977, altitude: 5000, order: 0 },
      { lat: 41.140, lng: -111.990, altitude: 10000, order: 1 },
      { lat: 41.160, lng: -112.010, altitude: 15000, order: 2 },
      { lat: 41.180, lng: -112.030, altitude: 20000, order: 3 },
      { lat: 41.200, lng: -112.050, altitude: 25000, order: 4 },
      { lat: 41.220, lng: -112.030, altitude: 25000, order: 5 },
      { lat: 41.240, lng: -112.010, altitude: 25000, order: 6 },
      { lat: 41.260, lng: -111.990, altitude: 25000, order: 7 },
      { lat: 41.280, lng: -111.970, altitude: 25000, order: 8 },
      { lat: 41.260, lng: -111.950, altitude: 25000, order: 9 },
      { lat: 41.240, lng: -111.930, altitude: 25000, order: 10 },
      { lat: 41.220, lng: -111.910, altitude: 25000, order: 11 },
      { lat: 41.200, lng: -111.890, altitude: 25000, order: 12 }
    ]
  },
  {
    id: '3',
    name: 'Landing',
    status: 'Pending',
    estimatedDuration: 20,
    waypoints: [
      { lat: 41.200, lng: -111.890, altitude: 25000, order: 0 },
      { lat: 41.180, lng: -111.880, altitude: 15000, order: 1 },
      { lat: 41.160, lng: -111.870, altitude: 10000, order: 2 },
      { lat: 41.140, lng: -111.860, altitude: 5000, order: 3 },
      { lat: 41.123, lng: -111.973, altitude: 0, order: 4 }
    ]
  }
];

// Helper function to generate varied flight hours and maintenance data
function generateAircraftMetrics(baseAge: number, lowHours = false) {
  const flightHours = lowHours ? 
    Math.round(Math.random() * 100) : 
    Math.round(500 + Math.random() * 1500);
  
  return {
    flightHours,
    flightHoursUntilMaintenance: Math.round(100 + Math.random() * 200),
    age: baseAge,
    maintenanceHistory: [
      {
        id: `hist-${Math.random().toString(36).substr(2, 9)}`,
        stage: 'Routine Check',
        startTime: new Date(Date.now() - (30 + Math.random() * 60) * 24 * 60 * 60 * 1000).toISOString(),
        completionTime: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
  };
}

// Update the helper function to include location
const generateRepairWithStage = (aircraftId: string, repairId: string, stage: string): Repair => ({
  id: repairId,
  aircraftId: aircraftId,
  startTime: toISOString(subDays(NOW, 2)),
  estimatedCompletionTime: toISOString(addDays(NOW, 3)),
  technicianIds: [mockTechnicians[0].id],
  status: 'In Progress',
  stage: stage as RepairStage,
  description: `Aircraft ${aircraftId} ${stage.toLowerCase()} process`,
  notes: `Currently in ${stage.toLowerCase()} phase`,
  assignedTechnicians: [mockTechnicians[0]],
  partsRequired: [
    {
      id: mockParts[0].id,
      quantity: 1,
      name: mockParts[0].name
    }
  ],
  location: 'Main Hangar'
});

// Update mockAircraft array to include aircraft in different repair stages
export const mockAircraft: Aircraft[] = [
  {
    id: '1',
    tailNumber: 'AF-10042',
    model: 'F-35A',
    status: 'Repair in Progress',
    location: 'Hangar A',
    locationLat: 41.123,
    locationLng: -111.973,
    missionCapable: false,
    lastMaintenance: toISOString(subDays(NOW, 30)),
    nextScheduledMaintenance: toISOString(addDays(NOW, 60)),
    errors: generateErrors(),
    currentRepair: generateRepair('1', '1'),
    missions: generateMissions('1'),
    repairs: [],
    currentMission: {
      id: '1',
      name: 'Training Flight',
      title: 'Training Flight',
      date: new Date().toISOString(),
      duration: 155,
      status: 'In Progress',
      stages: missionStages,
      currentStage: '2',
      aircraftId: '1'
    },
    ...generateAircraftMetrics(4.5),
    baseId: 'base1'
  },
  {
    id: '2',
    tailNumber: 'AF-10043',
    model: 'F-35A',
    status: 'Operational',
    location: 'Runway',
    locationLat: 41.124,
    locationLng: -111.974,
    missionCapable: true,
    lastMaintenance: toISOString(subDays(NOW, 15)),
    nextScheduledMaintenance: toISOString(addDays(NOW, 75)),
    errors: [],
    currentRepair: null,
    missions: generateMissions('2'),
    repairs: [],
    currentMission: null,
    ...generateAircraftMetrics(3.8),
    baseId: 'base2'
  },
  {
    id: '3',
    tailNumber: 'AF-10044',
    model: 'F-35A',
    status: 'In Mission',
    location: 'Airborne',
    locationLat: 41.125,
    locationLng: -111.975,
    missionCapable: true,
    lastMaintenance: toISOString(subDays(NOW, 7)),
    nextScheduledMaintenance: toISOString(addDays(NOW, 83)),
    errors: [],
    currentRepair: null,
    missions: generateMissions('3'),
    repairs: [],
    currentMission: {
      id: '1',
      name: 'Training Flight',
      title: 'Training Flight',
      date: new Date().toISOString(),
      duration: 155,
      status: 'In Progress',
      stages: missionStages,
      currentStage: '2',
      aircraftId: '3'
    },
    ...generateAircraftMetrics(4.2),
    baseId: 'base3'
  },
  {
    id: '4',
    tailNumber: 'AF-10045',
    model: 'F-35A',
    status: 'Diagnosing',
    location: 'Hangar B',
    locationLat: 41.126,
    locationLng: -111.976,
    missionCapable: false,
    lastMaintenance: toISOString(subDays(NOW, 45)),
    nextScheduledMaintenance: toISOString(addDays(NOW, 45)),
    errors: generateErrors().slice(0, 2),
    currentRepair: null,
    missions: generateMissions('4'),
    repairs: [],
    currentMission: null,
    ...generateAircraftMetrics(5.1),
    baseId: 'base1'
  },
  {
    id: '5',
    tailNumber: 'AF-10046',
    model: 'F-22A',
    status: 'Operational',
    location: 'Tarmac',
    locationLat: 41.127,
    locationLng: -111.977,
    missionCapable: true,
    lastMaintenance: toISOString(subDays(NOW, 5)),
    nextScheduledMaintenance: toISOString(addDays(NOW, 85)),
    errors: [],
    currentRepair: null,
    missions: generateMissions('5'),
    repairs: [],
    currentMission: null,
    ...generateAircraftMetrics(6.5),
    baseId: 'base2'
  },
  {
    id: '6',
    tailNumber: 'AF-10047',
    model: 'F-22A',
    status: 'Parts on Order',
    location: 'Hangar C',
    locationLat: 41.128,
    locationLng: -111.978,
    missionCapable: false,
    lastMaintenance: toISOString(subDays(NOW, 60)),
    nextScheduledMaintenance: toISOString(addDays(NOW, 30)),
    errors: generateErrors().slice(1, 3),
    currentRepair: generateRepair('6', '2'),
    missions: generateMissions('6'),
    repairs: [],
    currentMission: null,
    ...generateAircraftMetrics(7.2),
    baseId: 'base3'
  },
  {
    id: '7',
    tailNumber: 'AF-10048',
    model: 'F-35A',
    status: 'In Mission',
    location: 'Airborne',
    locationLat: 41.220,
    locationLng: -112.030,
    missionCapable: true,
    lastMaintenance: toISOString(subDays(NOW, 10)),
    nextScheduledMaintenance: toISOString(addDays(NOW, 80)),
    errors: [],
    currentRepair: null,
    missions: generateMissions('7'),
    repairs: [],
    currentMission: {
      id: '2',
      name: 'Combat Air Patrol',
      title: 'Combat Air Patrol',
      date: new Date().toISOString(),
      duration: 180,
      status: 'In Progress',
      stages: missionStages,
      currentStage: '2',
      aircraftId: '7'
    },
    ...generateAircraftMetrics(2.5, true),
    baseId: 'base1'
  },
  {
    id: '8',
    tailNumber: 'AF-10049',
    model: 'F-22A',
    status: 'In Mission',
    location: 'Airborne',
    locationLat: 41.240,
    locationLng: -112.010,
    missionCapable: true,
    lastMaintenance: toISOString(subDays(NOW, 8)),
    nextScheduledMaintenance: toISOString(addDays(NOW, 82)),
    errors: [],
    currentRepair: null,
    missions: generateMissions('8'),
    repairs: [],
    currentMission: {
      id: '3',
      name: 'Combat Air Patrol',
      title: 'Combat Air Patrol',
      date: new Date().toISOString(),
      duration: 180,
      status: 'In Progress',
      stages: missionStages,
      currentStage: '2',
      aircraftId: '8'
    },
    ...generateAircraftMetrics(8.4),
    baseId: 'base2'
  },
  {
    id: '9',
    tailNumber: 'AF-10050',
    model: 'F-35A',
    status: 'In Mission',
    location: 'Airborne',
    locationLat: 41.260,
    locationLng: -111.990,
    missionCapable: true,
    lastMaintenance: toISOString(subDays(NOW, 12)),
    nextScheduledMaintenance: toISOString(addDays(NOW, 78)),
    errors: [],
    currentRepair: null,
    missions: generateMissions('9'),
    repairs: [],
    currentMission: {
      id: '4',
      name: 'Combat Air Patrol',
      title: 'Combat Air Patrol',
      date: new Date().toISOString(),
      duration: 180,
      status: 'In Progress',
      stages: missionStages,
      currentStage: '2',
      aircraftId: '9'
    },
    ...generateAircraftMetrics(3.9),
    baseId: 'base3'
  },
  {
    id: '10',
    tailNumber: 'AF-10051',
    model: 'F-22A',
    status: 'In Mission',
    location: 'Airborne',
    locationLat: 41.280,
    locationLng: -111.970,
    missionCapable: true,
    lastMaintenance: toISOString(subDays(NOW, 6)),
    nextScheduledMaintenance: toISOString(addDays(NOW, 84)),
    errors: [],
    currentRepair: null,
    missions: generateMissions('10'),
    repairs: [],
    currentMission: {
      id: '5',
      name: 'Combat Air Patrol',
      title: 'Combat Air Patrol',
      date: new Date().toISOString(),
      duration: 180,
      status: 'In Progress',
      stages: missionStages,
      currentStage: '2',
      aircraftId: '10'
    },
    ...generateAircraftMetrics(5.8),
    baseId: 'base1'
  },
  // Add aircraft in Anomaly Detected stage
  {
    id: '11',
    tailNumber: 'AF-10052',
    model: 'F-35A',
    status: 'Maintenance',
    location: 'Hangar A',
    locationLat: 41.123,
    locationLng: -111.973,
    missionCapable: false,
    lastMaintenance: toISOString(subDays(NOW, 10)),
    nextScheduledMaintenance: toISOString(addDays(NOW, 80)),
    errors: generateErrors().slice(0, 1),
    currentRepair: generateRepairWithStage('11', 'repair11', 'Anomaly Detected'),
    missions: generateMissions('11'),
    repairs: [],
    currentMission: null,
    ...generateAircraftMetrics(3.2),
    baseId: 'base1'
  },
  // Add aircraft in Ambiguity Identified stage
  {
    id: '12',
    tailNumber: 'AF-10053',
    model: 'F-22A',
    status: 'Maintenance',
    location: 'Hangar B',
    locationLat: 41.124,
    locationLng: -111.974,
    missionCapable: false,
    lastMaintenance: toISOString(subDays(NOW, 15)),
    nextScheduledMaintenance: toISOString(addDays(NOW, 75)),
    errors: generateErrors().slice(0, 2),
    currentRepair: generateRepairWithStage('12', 'repair12', 'Ambiguity Identified'),
    missions: generateMissions('12'),
    repairs: [],
    currentMission: null,
    ...generateAircraftMetrics(4.1),
    baseId: 'base2'
  },
  // Add aircraft in Fault Isolation stage
  {
    id: '13',
    tailNumber: 'AF-10054',
    model: 'F-35A',
    status: 'Maintenance',
    location: 'Hangar C',
    locationLat: 41.125,
    locationLng: -111.975,
    missionCapable: false,
    lastMaintenance: toISOString(subDays(NOW, 20)),
    nextScheduledMaintenance: toISOString(addDays(NOW, 70)),
    errors: generateErrors().slice(0, 1),
    currentRepair: generateRepairWithStage('13', 'repair13', 'Fault Isolation'),
    missions: generateMissions('13'),
    repairs: [],
    currentMission: null,
    ...generateAircraftMetrics(3.8),
    baseId: 'base3'
  },
  // Add aircraft in Maintenance Identified stage
  {
    id: '14',
    tailNumber: 'AF-10055',
    model: 'F-22A',
    status: 'Maintenance',
    location: 'Hangar D',
    locationLat: 41.126,
    locationLng: -111.976,
    missionCapable: false,
    lastMaintenance: toISOString(subDays(NOW, 25)),
    nextScheduledMaintenance: toISOString(addDays(NOW, 65)),
    errors: generateErrors().slice(0, 2),
    currentRepair: {
      id: 'repair14',
      aircraftId: '14',
      stage: "Packaging Work" as RepairStage,
      startTime: "2024-02-27T03:08:00Z",
      estimatedCompletionTime: "2024-03-01T03:08:00Z",
      notes: "Preparing work package for system overhaul",
      technicianIds: [mockTechnicians[0].id],
      status: 'In Progress',
      description: 'System overhaul preparation',
      assignedTechnicians: [mockTechnicians[0]],
      partsRequired: [{
        id: mockParts[0].id,
        quantity: 1,
        name: mockParts[0].name
      }],
      location: 'Hangar D (KHIF)'
    },
    missions: generateMissions('14'),
    repairs: [],
    currentMission: null,
    ...generateAircraftMetrics(5.2),
    baseId: 'base1'
  },
  // Add aircraft in Maintenance In Work stage
  {
    id: '15',
    tailNumber: 'AF-10056',
    model: 'F-35A',
    status: 'Maintenance',
    location: 'Hangar E',
    locationLat: 41.127,
    locationLng: -111.977,
    missionCapable: false,
    lastMaintenance: toISOString(subDays(NOW, 30)),
    nextScheduledMaintenance: toISOString(addDays(NOW, 60)),
    errors: generateErrors().slice(0, 1),
    currentRepair: generateRepairWithStage('15', 'repair15', 'Maintenance In Work'),
    missions: generateMissions('15'),
    repairs: [],
    currentMission: null,
    ...generateAircraftMetrics(4.5),
    baseId: 'base2'
  },
  // Add aircraft in Inspection stage
  {
    id: '16',
    tailNumber: 'AF-10057',
    model: 'F-22A',
    status: 'Maintenance',
    location: 'Hangar F',
    locationLat: 41.128,
    locationLng: -111.978,
    missionCapable: false,
    lastMaintenance: toISOString(subDays(NOW, 35)),
    nextScheduledMaintenance: toISOString(addDays(NOW, 55)),
    errors: generateErrors().slice(0, 1),
    currentRepair: generateRepairWithStage('16', 'repair16', 'Inspection'),
    missions: generateMissions('16'),
    repairs: [],
    currentMission: null,
    ...generateAircraftMetrics(3.9),
    baseId: 'base3'
  },
  // Add aircraft in Safe for Flight stage
  {
    id: '17',
    tailNumber: 'AF-10058',
    model: 'F-35A',
    status: 'Maintenance',
    location: 'Tarmac',
    locationLat: 41.129,
    locationLng: -111.979,
    missionCapable: true,
    lastMaintenance: toISOString(subDays(NOW, 40)),
    nextScheduledMaintenance: toISOString(addDays(NOW, 50)),
    errors: [],
    currentRepair: generateRepairWithStage('17', 'repair17', 'Safe for Flight'),
    missions: generateMissions('17'),
    repairs: [],
    currentMission: null,
    ...generateAircraftMetrics(4.7),
    baseId: 'base1'
  },
  // Aircraft 42, 47, and 55 with complete type properties
  {
    id: '42',
    tailNumber: "AF-42",
    model: "C-130J",
    status: 'Maintenance',
    location: "Hangar A",
    locationLat: 41.123,
    locationLng: -111.973,
    missionCapable: false,
    lastMaintenance: toISOString(subDays(NOW, 30)),
    nextScheduledMaintenance: toISOString(addDays(NOW, 60)),
    errors: generateErrors(),
    currentRepair: {
      id: 'repair42',
      aircraftId: '42',
      stage: "Ambiguity Identified" as RepairStage,
      startTime: "2024-02-27T00:57:00Z",
      estimatedCompletionTime: "2024-03-04T00:57:00Z",
      notes: "Investigating hydraulic system anomalies",
      technicianIds: [mockTechnicians[0].id],
      status: 'In Progress',
      description: 'Hydraulic system fault isolation',
      assignedTechnicians: [mockTechnicians[0]],
      partsRequired: [{
        id: mockParts[0].id,
        quantity: 1,
        name: mockParts[0].name
      }],
      location: 'Hangar A'
    },
    missions: generateMissions('42'),
    repairs: [],
    currentMission: null,
    ...generateAircraftMetrics(4.2),
    baseId: 'KEDW'
  },
  {
    id: '47',
    tailNumber: "AF-47",
    model: "C-130J",
    status: 'Maintenance',
    location: "Hangar B",
    locationLat: 41.124,
    locationLng: -111.974,
    missionCapable: false,
    lastMaintenance: toISOString(subDays(NOW, 25)),
    nextScheduledMaintenance: toISOString(addDays(NOW, 65)),
    errors: generateErrors(),
    currentRepair: {
      id: 'repair47',
      aircraftId: '47',
      stage: "Maintenance In Work" as RepairStage,
      startTime: "2024-02-25T00:57:00Z",
      estimatedCompletionTime: "2024-03-02T00:57:00Z",
      notes: "Replacing main hydraulic pump",
      technicianIds: [mockTechnicians[0].id],
      status: 'In Progress',
      description: 'Hydraulic pump replacement',
      assignedTechnicians: [mockTechnicians[0]],
      partsRequired: [{
        id: mockParts[0].id,
        quantity: 1,
        name: mockParts[0].name
      }],
      location: 'Hangar B'
    },
    missions: generateMissions('47'),
    repairs: [],
    currentMission: null,
    ...generateAircraftMetrics(3.8),
    baseId: 'KEDW'
  },
  {
    id: '55',
    tailNumber: "AF-55",
    model: "C-130J",
    status: "Maintenance",
    location: "Hangar C",
    locationLat: 41.125,
    locationLng: -111.975,
    missionCapable: false,
    lastMaintenance: toISOString(subDays(NOW, 20)),
    nextScheduledMaintenance: toISOString(addDays(NOW, 70)),
    errors: generateErrors(),
    currentRepair: {
      id: 'repair55',
      aircraftId: '55',
      stage: "Packaging Work" as RepairStage,
      startTime: "2024-02-26T00:57:00Z",
      estimatedCompletionTime: "2024-03-03T00:57:00Z",
      notes: "Preparing work package for hydraulic system overhaul",
      technicianIds: [mockTechnicians[0].id],
      status: 'In Progress',
      description: 'Hydraulic system overhaul preparation',
      assignedTechnicians: [mockTechnicians[0]],
      partsRequired: [{
        id: mockParts[0].id,
        quantity: 1,
        name: mockParts[0].name
      }],
      location: 'Hangar C'
    },
    missions: generateMissions('55'),
    repairs: [],
    currentMission: null,
    ...generateAircraftMetrics(4.5),
    baseId: 'KEDW'
  }
].map(aircraft => {
  // Assign specific bases based on aircraft ID or other criteria
  let baseId;
  switch (aircraft.id) {
    case '42':
    case '47':
    case '55':
      baseId = 'KEDW'; // Keep their original base ID
      break;
    case '11': // AF-10052
    case '14': // AF-10055
    case '17': // AF-10058
    case '1':  // AF-10042
    case '4':  // AF-10045
    case '7':  // AF-10048
    case '10': // AF-10051
      baseId = 'base1'; // Hill Air Force Base
      break;
    case '12': // AF-10053
    case '15': // AF-10056
    case '2':  // AF-10043
    case '5':  // AF-10046
    case '8':  // AF-10049
      baseId = 'base2'; // Edwards Air Force Base
      break;
    case '13': // AF-10054
    case '16': // AF-10057
    case '3':  // AF-10044
    case '6':  // AF-10047
    case '9':  // AF-10050
      baseId = 'base3'; // Nellis Air Force Base
      break;
    default:
      baseId = 'base1';
  }
  return {
    ...aircraft,
    baseId
  };
});

// Generate mock weather
export const mockWeather: WeatherCondition = {
  conditions: 'Partly Cloudy',
  temperature: 68,
  windSpeed: 12,
  windDirection: 'NW',
  humidity: 45,
  visibility: 8.5,
  ceiling: 25000,
  updatedAt: new Date().toISOString(),
  forecast: [
    {
      time: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      conditions: 'Sunny',
      temperature: 72,
      windSpeed: 8,
      precipitation: 0
    },
    {
      time: new Date(Date.now() + 86400000 * 2).toISOString(), // Day after tomorrow
      conditions: 'Cloudy',
      temperature: 65,
      windSpeed: 15,
      precipitation: 30
    },
    {
      time: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days from now
      conditions: 'Rain',
      temperature: 59,
      windSpeed: 20,
      precipitation: 80
    }
  ]
};

export const mockBases: Base[] = [
  {
    id: 'base1',
    name: 'Hill Air Force Base',
    code: 'KHIF',
    location: {
      lat: 41.123,
      lng: -111.973
    },
    facilities: {
      hangars: 12,
      runways: 2,
      maintenanceBays: 8
    },
    status: 'Active'
  },
  {
    id: 'base2',
    name: 'Edwards Air Force Base',
    code: 'KEDW',
    location: {
      lat: 34.905,
      lng: -117.883
    },
    facilities: {
      hangars: 15,
      runways: 3,
      maintenanceBays: 10
    },
    status: 'Active'
  },
  {
    id: 'base3',
    name: 'Nellis Air Force Base',
    code: 'KLSV',
    location: {
      lat: 36.236,
      lng: -115.034
    },
    facilities: {
      hangars: 10,
      runways: 2,
      maintenanceBays: 6
    },
    status: 'Active'
  }
];

// Add mock fault isolation procedures
export const mockFaultIsolationProcedures: FaultIsolationProcedure[] = [
  {
    id: 'fi-001',
    code: 'FI-HYD-001',
    title: 'Hydraulic System Pressure Loss',
    description: 'Isolate source of hydraulic pressure loss in main system',
    estimatedTime: 1.5,
    requiredPersonnel: ['Hydraulic Specialist'],
    equipment: ['Hydraulic Test Stand', 'Pressure Gauges'],
    relatedSystems: ['Main Hydraulics', 'Landing Gear'],
    prerequisites: ['Aircraft Powered Down', 'System Depressurized']
  },
  {
    id: 'fi-002',
    code: 'FI-ELEC-001',
    title: 'Electrical Power Fluctuation',
    description: 'Diagnose intermittent power supply issues',
    estimatedTime: 2,
    requiredPersonnel: ['Electrical Specialist'],
    equipment: ['Multimeter', 'Power Supply Analyzer'],
    relatedSystems: ['Electrical', 'Avionics'],
    prerequisites: ['Battery Disconnected']
  },
  {
    id: 'fi-003',
    code: 'FI-FUEL-001',
    title: 'Fuel System Pressure Anomaly',
    description: 'Diagnose fuel system pressure fluctuations',
    estimatedTime: 1.5,
    requiredPersonnel: ['Fuel Systems Specialist'],
    equipment: ['Fuel Pressure Gauge', 'Flow Meter'],
    relatedSystems: ['Fuel System', 'Engine'],
    prerequisites: ['Fuel System Depressurized']
  },
  {
    id: 'fi-004',
    code: 'FI-NAV-001',
    title: 'Navigation System Error',
    description: 'Isolate source of navigation system malfunction',
    estimatedTime: 2.5,
    requiredPersonnel: ['Avionics Specialist'],
    equipment: ['Navigation Test Set', 'GPS Simulator'],
    relatedSystems: ['Navigation', 'GPS'],
    prerequisites: ['Ground Power Connected']
  },
  {
    id: 'fi-005',
    code: 'FI-COM-001',
    title: 'Communication System Fault',
    description: 'Diagnose radio communication issues',
    estimatedTime: 1,
    requiredPersonnel: ['Communications Specialist'],
    equipment: ['Radio Test Set', 'Frequency Analyzer'],
    relatedSystems: ['Communications', 'Antenna'],
    prerequisites: ['Power Available']
  },
  {
    id: 'fi-006',
    code: 'FI-LAND-001',
    title: 'Landing Gear Extension Fault',
    description: 'Troubleshoot landing gear extension system',
    estimatedTime: 2,
    requiredPersonnel: ['Landing Gear Specialist'],
    equipment: ['Hydraulic Test Stand', 'Extension Test Kit'],
    relatedSystems: ['Landing Gear', 'Hydraulics'],
    prerequisites: ['Aircraft Jacked']
  },
  {
    id: 'fi-007',
    code: 'FI-ENG-001',
    title: 'Engine Performance Analysis',
    description: 'Analyze engine performance anomalies',
    estimatedTime: 3,
    requiredPersonnel: ['Engine Specialist', 'Test Engineer'],
    equipment: ['Engine Diagnostic Computer', 'Performance Analyzer'],
    relatedSystems: ['Engine', 'Fuel System'],
    prerequisites: ['Engine Cool Down Complete']
  },
  {
    id: 'fi-008',
    code: 'FI-APU-001',
    title: 'APU Start Fault',
    description: 'Diagnose APU starting system issues',
    estimatedTime: 1.5,
    requiredPersonnel: ['APU Specialist'],
    equipment: ['APU Test Set', 'Starting System Analyzer'],
    relatedSystems: ['APU', 'Electrical'],
    prerequisites: ['Battery Power Available']
  },
  {
    id: 'fi-009',
    code: 'FI-RADAR-001',
    title: 'Radar System Fault',
    description: 'Isolate radar system malfunction',
    estimatedTime: 2,
    requiredPersonnel: ['Radar Specialist'],
    equipment: ['Radar Test Set', 'Signal Generator'],
    relatedSystems: ['Radar', 'Avionics'],
    prerequisites: ['System Power Available']
  },
  {
    id: 'fi-010',
    code: 'FI-BRAKE-001',
    title: 'Brake System Analysis',
    description: 'Diagnose brake system issues',
    estimatedTime: 1.5,
    requiredPersonnel: ['Brake Specialist'],
    equipment: ['Brake Pressure Tester', 'Wear Gauge'],
    relatedSystems: ['Brakes', 'Hydraulics'],
    prerequisites: ['Wheels Chocked']
  },
  {
    id: 'fi-011',
    code: 'FI-CTRL-001',
    title: 'Flight Control Response',
    description: 'Analyze flight control system anomalies',
    estimatedTime: 2.5,
    requiredPersonnel: ['Flight Control Specialist'],
    equipment: ['Control Surface Tester', 'Movement Analyzer'],
    relatedSystems: ['Flight Controls', 'Hydraulics'],
    prerequisites: ['Hydraulic Power Available']
  },
  {
    id: 'fi-012',
    code: 'FI-OXYGEN-001',
    title: 'Oxygen System Check',
    description: 'Investigate oxygen system faults',
    estimatedTime: 1,
    requiredPersonnel: ['Environmental Specialist'],
    equipment: ['Oxygen Analyzer', 'Pressure Tester'],
    relatedSystems: ['Oxygen', 'Environmental'],
    prerequisites: ['System Depressurized']
  }
];

// Add mock repair procedures
export const mockRepairProcedures: RepairProcedure[] = [
  {
    id: 'rp-001',
    code: 'RP-HYD-001',
    title: 'Hydraulic Pump Replacement',
    description: 'Replace faulty hydraulic pump',
    estimatedTime: 4,
    requiredParts: ['Hydraulic Pump P/N 123-456', 'Seal Kit'],
    requiredPersonnel: ['Hydraulic Specialist', 'Assistant'],
    equipment: ['Hydraulic Test Stand', 'Torque Wrench']
  },
  {
    id: 'rp-002',
    code: 'RP-ELEC-001',
    title: 'Generator Control Unit Replacement',
    description: 'Replace faulty GCU',
    estimatedTime: 3,
    requiredParts: ['GCU P/N 789-012'],
    requiredPersonnel: ['Electrical Specialist'],
    equipment: ['Diagnostic Computer']
  },
  {
    id: 'rp-003',
    code: 'RP-FUEL-001',
    title: 'Fuel Pump Replacement',
    description: 'Replace malfunctioning fuel pump',
    estimatedTime: 3,
    requiredParts: ['Fuel Pump P/N 234-567', 'Gasket Kit'],
    requiredPersonnel: ['Fuel System Specialist'],
    equipment: ['Fuel System Tools', 'Torque Wrench']
  },
  {
    id: 'rp-004',
    code: 'RP-NAV-001',
    title: 'Navigation Computer Update',
    description: 'Replace and update navigation computer',
    estimatedTime: 2,
    requiredParts: ['Nav Computer P/N 345-678'],
    requiredPersonnel: ['Avionics Specialist'],
    equipment: ['Diagnostic Computer', 'Software Loader']
  },
  {
    id: 'rp-005',
    code: 'RP-RADAR-001',
    title: 'Radar Antenna Replacement',
    description: 'Replace faulty radar antenna',
    estimatedTime: 4,
    requiredParts: ['Radar Antenna P/N 456-789'],
    requiredPersonnel: ['Radar Specialist', 'Assistant'],
    equipment: ['Crane', 'Calibration Kit']
  },
  {
    id: 'rp-006',
    code: 'RP-APU-001',
    title: 'APU Starter Replacement',
    description: 'Replace failed APU starter',
    estimatedTime: 3,
    requiredParts: ['APU Starter P/N 567-890'],
    requiredPersonnel: ['APU Specialist'],
    equipment: ['APU Tools', 'Tester']
  },
  {
    id: 'rp-007',
    code: 'RP-BRAKE-001',
    title: 'Brake Assembly Replacement',
    description: 'Replace worn brake assembly',
    estimatedTime: 2,
    requiredParts: ['Brake Assembly P/N 678-901'],
    requiredPersonnel: ['Brake Specialist'],
    equipment: ['Jack Stand', 'Brake Tools']
  },
  {
    id: 'rp-008',
    code: 'RP-OXYGEN-001',
    title: 'Oxygen Regulator Replacement',
    description: 'Replace faulty oxygen regulator',
    estimatedTime: 1.5,
    requiredParts: ['O2 Regulator P/N 789-012'],
    requiredPersonnel: ['Environmental Specialist'],
    equipment: ['O2 System Tools', 'Tester']
  },
  {
    id: 'rp-009',
    code: 'RP-CTRL-001',
    title: 'Control Surface Actuator',
    description: 'Replace control surface actuator',
    estimatedTime: 4,
    requiredParts: ['Actuator P/N 890-123'],
    requiredPersonnel: ['Flight Control Specialist'],
    equipment: ['Hydraulic Tools', 'Rigging Kit']
  },
  {
    id: 'rp-010',
    code: 'RP-LAND-001',
    title: 'Landing Gear Strut',
    description: 'Replace landing gear strut',
    estimatedTime: 6,
    requiredParts: ['Strut Assembly P/N 901-234'],
    requiredPersonnel: ['Landing Gear Specialist', 'Assistant'],
    equipment: ['Jack Stands', 'Alignment Tools']
  },
  {
    id: 'rp-011',
    code: 'RP-ENG-001',
    title: 'Engine Fuel Control',
    description: 'Replace engine fuel control unit',
    estimatedTime: 5,
    requiredParts: ['Fuel Control P/N 012-345'],
    requiredPersonnel: ['Engine Specialist'],
    equipment: ['Engine Tools', 'Test Equipment']
  },
  {
    id: 'rp-012',
    code: 'RP-COM-001',
    title: 'Radio Transceiver',
    description: 'Replace faulty radio transceiver',
    estimatedTime: 2,
    requiredParts: ['Transceiver P/N 123-456'],
    requiredPersonnel: ['Communications Specialist'],
    equipment: ['Radio Test Set', 'Tools']
  }
];

// Add mock mod kits
export const mockModKits: ModKit[] = [
  {
    id: 'mk-001',
    code: 'MK-AV-001',
    title: 'Navigation System Upgrade',
    description: 'Install updated navigation computer and software',
    estimatedTime: 6,
    compatibility: ['F-22A', 'F-35A'],
    requiredParts: ['Nav Computer', 'Wiring Harness'],
    requiredPersonnel: ['Avionics Specialist', 'Software Technician']
  },
  {
    id: 'mk-002',
    code: 'MK-COM-001',
    title: 'Communications Suite Update',
    description: 'Update radio and encryption modules',
    estimatedTime: 4,
    compatibility: ['All Models'],
    requiredParts: ['Encryption Module', 'Radio Module'],
    requiredPersonnel: ['Communications Specialist']
  },
  {
    id: 'mk-003',
    code: 'MK-RADAR-001',
    title: 'Advanced Radar Upgrade',
    description: 'Install new generation radar system',
    estimatedTime: 8,
    compatibility: ['F-22A', 'F-35A'],
    requiredParts: ['Radar Unit', 'Processing Module'],
    requiredPersonnel: ['Radar Specialist', 'Software Engineer']
  },
  {
    id: 'mk-004',
    code: 'MK-ENG-001',
    title: 'Engine Performance Upgrade',
    description: 'Install engine performance enhancement kit',
    estimatedTime: 12,
    compatibility: ['F-22A'],
    requiredParts: ['Engine Components', 'Control Unit'],
    requiredPersonnel: ['Engine Specialist', 'Test Engineer']
  },
  {
    id: 'mk-005',
    code: 'MK-FUEL-001',
    title: 'Fuel System Enhancement',
    description: 'Upgrade fuel management system',
    estimatedTime: 6,
    compatibility: ['All Models'],
    requiredParts: ['Fuel Computer', 'Sensors'],
    requiredPersonnel: ['Fuel System Specialist']
  },
  {
    id: 'mk-006',
    code: 'MK-COCK-001',
    title: 'Cockpit Display Upgrade',
    description: 'Install modern glass cockpit displays',
    estimatedTime: 10,
    compatibility: ['C-130J', 'F-35A'],
    requiredParts: ['Display Units', 'Control Panel'],
    requiredPersonnel: ['Avionics Specialist', 'Software Technician']
  },
  {
    id: 'mk-007',
    code: 'MK-SELF-001',
    title: 'Self-Protection Suite',
    description: 'Install advanced threat detection system',
    estimatedTime: 14,
    compatibility: ['F-22A', 'F-35A'],
    requiredParts: ['Sensor Suite', 'Processing Unit'],
    requiredPersonnel: ['Electronic Warfare Specialist']
  },
  {
    id: 'mk-008',
    code: 'MK-DATA-001',
    title: 'Data Link System Update',
    description: 'Upgrade tactical data link capabilities',
    estimatedTime: 8,
    compatibility: ['All Models'],
    requiredParts: ['Data Link Module', 'Antenna System'],
    requiredPersonnel: ['Communications Specialist']
  },
  {
    id: 'mk-009',
    code: 'MK-ENV-001',
    title: 'Environmental Control Upgrade',
    description: 'Enhance environmental control system',
    estimatedTime: 9,
    compatibility: ['C-130J'],
    requiredParts: ['Control Unit', 'Sensor Package'],
    requiredPersonnel: ['Environmental Systems Specialist']
  },
  {
    id: 'mk-010',
    code: 'MK-LAND-001',
    title: 'Landing System Enhancement',
    description: 'Upgrade landing assistance systems',
    estimatedTime: 7,
    compatibility: ['All Models'],
    requiredParts: ['Radar Unit', 'Processing Module'],
    requiredPersonnel: ['Avionics Specialist', 'Software Engineer']
  },
  {
    id: 'mk-011',
    code: 'MK-CARGO-001',
    title: 'Cargo Handling System',
    description: 'Install advanced cargo handling system',
    estimatedTime: 16,
    compatibility: ['C-130J'],
    requiredParts: ['Handling Equipment', 'Control System'],
    requiredPersonnel: ['Structural Specialist', 'Systems Engineer']
  },
  {
    id: 'mk-012',
    code: 'MK-LIGHT-001',
    title: 'LED Lighting Upgrade',
    description: 'Convert all lighting to LED systems',
    estimatedTime: 5,
    compatibility: ['All Models'],
    requiredParts: ['LED Units', 'Control Modules'],
    requiredPersonnel: ['Electrical Specialist']
  }
];

// Add mock aircraft with anomalies
export const mockAircraftWithAnomalies: AircraftWithAnomalies[] = [
  {
    id: '1',
    tailNumber: 'AF-12345',
    model: 'C-130J',
    status: 'Maintenance Required',
    location: 'Hangar A',
    nextMission: new Date('2024-02-29T10:00:00'),
    anomalies: [
      {
        id: 'a1',
        description: 'Hydraulic pressure fluctuation in main system',
        reportedAt: new Date('2024-02-28'),
        severity: 'high',
        system: 'Hydraulics'
      },
      {
        id: 'a2',
        description: 'Navigation system intermittent errors',
        reportedAt: new Date('2024-02-27'),
        severity: 'medium',
        system: 'Avionics'
      }
    ]
  },
  {
    id: '2',
    tailNumber: 'AF-12346',
    model: 'F-35A',
    status: 'Maintenance Required',
    location: 'Hangar B',
    nextMission: new Date('2024-02-29T14:00:00'),
    anomalies: [
      {
        id: 'a3',
        description: 'Engine temperature sensor malfunction',
        reportedAt: new Date('2024-02-28'),
        severity: 'high',
        system: 'Propulsion'
      }
    ]
  },
  {
    id: '3',
    tailNumber: 'AF-12347',
    model: 'F-22A',
    status: 'Maintenance Required',
    location: 'Hangar C',
    nextMission: new Date('2024-02-29T08:00:00'),
    anomalies: [
      {
        id: 'a4',
        description: 'Landing gear retraction delay',
        reportedAt: new Date('2024-02-27'),
        severity: 'medium',
        system: 'Landing Gear'
      },
      {
        id: 'a5',
        description: 'Radar system calibration error',
        reportedAt: new Date('2024-02-28'),
        severity: 'high',
        system: 'Avionics'
      },
      {
        id: 'a6',
        description: 'Fuel gauge inconsistent readings',
        reportedAt: new Date('2024-02-26'),
        severity: 'low',
        system: 'Fuel'
      }
    ]
  }
];

// Helper function to check qualification status
export const getQualificationStatus = (expirationDate: string): 'Active' | 'Expired' | 'Expiring Soon' => {
  const now = new Date();
  const expDate = new Date(expirationDate);
  const daysUntilExpiration = Math.floor((expDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (daysUntilExpiration < 0) return 'Expired';
  if (daysUntilExpiration <= 30) return 'Expiring Soon';
  return 'Active';
};