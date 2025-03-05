import { MissionCard, TestPoint, TestResource, InstrumentationConfig, TestEvent } from './types';

// Mission Cards
export const mockMissionCards: MissionCard[] = [
  {
    id: 'MC001',
    title: 'F-35A High AOA Testing',
    aircraft: 'AF-10042',
    testPoints: [
      {
        id: 'TP001',
        name: 'High AOA Handling',
        description: 'Evaluate aircraft handling at high angles of attack',
        status: 'Planned',
        priority: 'High',
        requirements: {
          weather: 'VMC, No Precipitation',
          fuel: 'Min 80% internal',
          altitude: '25,000 ft',
          speed: '250 KIAS'
        },
        dependencies: ['Systems Check', 'Weather Requirements'],
        successCriteria: ['Stable flight at 25° AOA', 'Controllable recovery'],
        risks: ['Departure from controlled flight', 'Engine stall']
      }
    ],
    crew: {
      testPilot: 'Maj. Sarah Johnson',
      flightEngineer: 'Capt. Mike Chen',
      safetyOfficer: 'Lt. Col. David Brown'
    },
    date: new Date('2024-03-15'),
    status: 'Planned',
    weather: {
      required: 'VMC, No Precipitation',
      actual: 'Pending'
    },
    briefingTime: '07:00',
    takeoffTime: '08:30'
  },
  {
    id: 'MC002',
    title: 'F-22 Weapons Integration',
    aircraft: 'AF-09386',
    testPoints: [
      {
        id: 'TP002',
        name: 'AIM-120D Release',
        description: 'Verify safe separation and launch parameters',
        status: 'Completed',
        priority: 'High',
        requirements: {
          weather: 'Clear of Clouds',
          fuel: 'Full Internal',
          altitude: '30,000 ft',
          speed: '0.9 Mach'
        },
        dependencies: ['Range Clear', 'Telemetry Ready'],
        successCriteria: ['Clean separation', 'Guidance lock'],
        risks: ['Weapon malfunction', 'Separation issues']
      }
    ],
    crew: {
      testPilot: 'Lt. Col. James Wilson',
      flightEngineer: 'Maj. Emily Rodriguez',
      safetyOfficer: 'Col. Robert Taylor'
    },
    date: new Date('2024-03-18'),
    status: 'Ready',
    weather: {
      required: 'Clear of Clouds',
      actual: 'CAVOK'
    },
    briefingTime: '06:30',
    takeoffTime: '08:00'
  },
  {
    id: 'MC003',
    title: 'F-15EX Engine Performance',
    aircraft: 'AF-21001',
    testPoints: [
      {
        id: 'TP003',
        name: 'Max Thrust Verification',
        description: 'Verify F110-GE-129 engine performance at max power',
        status: 'In Progress',
        priority: 'High',
        requirements: {
          weather: 'Clear, ISA Conditions',
          fuel: 'Full Internal',
          altitude: '35,000 ft',
          speed: '1.2 Mach'
        },
        dependencies: ['Engine Break-in Complete', 'Instrumentation Calibrated'],
        successCriteria: ['Achieve predicted thrust', 'Normal temp ranges'],
        risks: ['Engine overheat', 'Instrumentation failure']
      }
    ],
    crew: {
      testPilot: 'Maj. Alex Thompson',
      flightEngineer: 'Capt. Lisa Park',
      safetyOfficer: 'Lt. Col. Mark Stevens'
    },
    date: new Date('2024-03-20'),
    status: 'In Progress',
    weather: {
      required: 'Clear, ISA Conditions',
      actual: 'Clear, Light Winds'
    },
    briefingTime: '06:45',
    takeoffTime: '08:15'
  },
  {
    id: 'MC004',
    title: 'B-21 Low Observable Testing',
    aircraft: 'AF-21002',
    testPoints: [
      {
        id: 'TP004',
        name: 'RCS Measurement',
        description: 'Radar Cross Section verification in operational config',
        status: 'Planned',
        priority: 'High',
        requirements: {
          weather: 'Clear, No Precipitation',
          fuel: 'Mission Dependent',
          altitude: 'Various',
          speed: '0.8 Mach'
        },
        dependencies: ['Range Instrumentation Ready', 'Security Clearance'],
        successCriteria: ['Meet RCS requirements', 'Signature stability'],
        risks: ['Classification concerns', 'Measurement accuracy']
      }
    ],
    crew: {
      testPilot: 'Col. Ryan Mitchell',
      flightEngineer: 'Maj. Sarah Wong',
      safetyOfficer: 'Col. James Patterson'
    },
    date: new Date('2024-03-22'),
    status: 'Planned',
    weather: {
      required: 'Clear, No Precipitation',
      actual: 'Pending'
    },
    briefingTime: '05:30',
    takeoffTime: '07:00'
  },
  {
    id: 'MC005',
    title: 'KC-46 Refueling Certification',
    aircraft: 'AF-19003',
    testPoints: [
      {
        id: 'TP005',
        name: 'F-35 Refueling',
        description: 'Certify KC-46 refueling capabilities with F-35',
        status: 'Planned',
        priority: 'Medium',
        requirements: {
          weather: 'VMC, Light Turbulence',
          fuel: 'Full Fuel Load',
          altitude: '20,000 ft',
          speed: '280 KIAS'
        },
        dependencies: ['Formation Qualified Crews', 'Boom Operational'],
        successCriteria: ['Successful contacts', 'Normal fuel flow'],
        risks: ['Formation issues', 'Equipment malfunction']
      }
    ],
    crew: {
      testPilot: 'Lt. Col. Diana Martinez',
      flightEngineer: 'Maj. Tom Wilson',
      safetyOfficer: 'Col. Eric Johnson'
    },
    date: new Date('2024-03-25'),
    status: 'Ready',
    weather: {
      required: 'VMC, Light Turbulence',
      actual: 'CAVOK'
    },
    briefingTime: '06:15',
    takeoffTime: '07:45'
  }
];

// Test Points
export const mockTestPoints: TestPoint[] = [
  {
    id: 'TP001',
    name: 'High AOA Handling',
    description: 'Evaluate aircraft handling at high angles of attack',
    status: 'Planned',
    priority: 'High',
    requirements: {
      weather: 'VMC, No Precipitation',
      fuel: 'Min 80% internal',
      altitude: '25,000 ft',
      speed: '250 KIAS'
    },
    dependencies: ['Systems Check', 'Weather Requirements'],
    successCriteria: ['Stable flight at 25° AOA', 'Controllable recovery'],
    risks: ['Departure from controlled flight', 'Engine stall']
  },
  {
    id: 'TP002',
    name: 'AIM-120D Release',
    description: 'Verify safe separation and launch parameters',
    status: 'Completed',
    priority: 'High',
    requirements: {
      weather: 'Clear of Clouds',
      fuel: 'Full Internal',
      altitude: '30,000 ft',
      speed: '0.9 Mach'
    },
    dependencies: ['Range Clear', 'Telemetry Ready'],
    successCriteria: ['Clean separation', 'Guidance lock'],
    risks: ['Weapon malfunction', 'Separation issues']
  },
  {
    id: 'TP003',
    name: 'Max Thrust Verification',
    description: 'Verify F110-GE-129 engine performance at max power',
    status: 'In Progress',
    priority: 'High',
    requirements: {
      weather: 'Clear, ISA Conditions',
      fuel: 'Full Internal',
      altitude: '35,000 ft',
      speed: '1.2 Mach'
    },
    dependencies: ['Engine Break-in Complete', 'Instrumentation Calibrated'],
    successCriteria: ['Achieve predicted thrust', 'Normal temp ranges'],
    risks: ['Engine overheat', 'Instrumentation failure']
  },
  {
    id: 'TP004',
    name: 'RCS Measurement',
    description: 'Radar Cross Section verification in operational config',
    status: 'Planned',
    priority: 'High',
    requirements: {
      weather: 'Clear, No Precipitation',
      fuel: 'Mission Dependent',
      altitude: 'Various',
      speed: '0.8 Mach'
    },
    dependencies: ['Range Instrumentation Ready', 'Security Clearance'],
    successCriteria: ['Meet RCS requirements', 'Signature stability'],
    risks: ['Classification concerns', 'Measurement accuracy']
  },
  {
    id: 'TP005',
    name: 'F-35 Refueling',
    description: 'Certify KC-46 refueling capabilities with F-35',
    status: 'Planned',
    priority: 'Medium',
    requirements: {
      weather: 'VMC, Light Turbulence',
      fuel: 'Full Fuel Load',
      altitude: '20,000 ft',
      speed: '280 KIAS'
    },
    dependencies: ['Formation Qualified Crews', 'Boom Operational'],
    successCriteria: ['Successful contacts', 'Normal fuel flow'],
    risks: ['Formation issues', 'Equipment malfunction']
  }
];

// Test Resources
export const mockTestResources: TestResource[] = [
  {
    id: 'RES001',
    type: 'Aircraft',
    name: 'Chase Aircraft - T-38A',
    status: 'Available',
    qualifications: ['Test Pilot', 'Safety Chase'],
    certifications: ['Formation Flight', 'Test Chase']
  },
  // Add more resources...
];

// Test Events for Schedule
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const nextWeek = new Date(today);
nextWeek.setDate(today.getDate() + 7);

export const mockTestEvents: TestEvent[] = [
  {
    id: 'EV001',
    title: 'High AOA Testing',
    missionCard: 'MC001',
    date: today,
    startTime: '08:30',
    duration: 2.5,
    resources: ['Chase Aircraft - T-38A', 'Mobile Telemetry Station'],
    status: 'Scheduled',
    weather: {
      required: 'VMC, No Precipitation',
      forecast: 'Clear Skies, 10kt winds'
    },
    briefingTime: '07:00',
    testTeam: ['Maj. Sarah Johnson', 'Capt. Mike Chen', 'Lt. Col. David Brown']
  },
  {
    id: 'EV002',
    title: 'F-22 Weapons Integration',
    missionCard: 'MC002',
    date: tomorrow,
    startTime: '08:00',
    duration: 3,
    resources: ['Range Control', 'Telemetry Station'],
    status: 'Scheduled',
    weather: {
      required: 'Clear of Clouds',
      forecast: 'CAVOK'
    },
    briefingTime: '06:30',
    testTeam: ['Lt. Col. James Wilson', 'Maj. Emily Rodriguez', 'Col. Robert Taylor']
  },
  {
    id: 'EV003',
    title: 'F-15EX Engine Performance',
    missionCard: 'MC003',
    date: nextWeek,
    startTime: '08:15',
    duration: 2,
    resources: ['Chase Aircraft', 'Engine Monitoring Station'],
    status: 'Scheduled',
    weather: {
      required: 'Clear, ISA Conditions',
      forecast: 'Clear, Light Winds'
    },
    briefingTime: '06:45',
    testTeam: ['Maj. Alex Thompson', 'Capt. Lisa Park', 'Lt. Col. Mark Stevens']
  },
  {
    id: 'EV004',
    title: 'B-21 LO Testing',
    missionCard: 'MC004',
    date: new Date('2024-03-22'),
    startTime: '07:00',
    duration: 4,
    resources: ['Secure Range', 'RCS Measurement Equipment'],
    status: 'Scheduled',
    weather: {
      required: 'Clear, No Precipitation',
      forecast: 'Clear Skies'
    },
    briefingTime: '05:30',
    testTeam: ['Col. Ryan Mitchell', 'Maj. Sarah Wong', 'Col. James Patterson']
  },
  {
    id: 'EV005',
    title: 'KC-46/F-35 Refueling',
    missionCard: 'MC005',
    date: new Date('2024-03-25'),
    startTime: '07:45',
    duration: 3.5,
    resources: ['F-35A Test Aircraft', 'Chase Aircraft', 'Video Recording'],
    status: 'Scheduled',
    weather: {
      required: 'VMC, Light Turbulence',
      forecast: 'Few Clouds, Light Chop'
    },
    briefingTime: '06:15',
    testTeam: ['Lt. Col. Diana Martinez', 'Maj. Tom Wilson', 'Col. Eric Johnson']
  }
];

// Instrumentation Configurations
export const mockInstrumentationConfigs: InstrumentationConfig[] = [
  {
    id: 'INST001',
    aircraftId: 'AF-10042',
    sensors: [
      {
        id: 'SENS001',
        type: 'Accelerometer',
        location: 'Wing Root',
        calibrationDate: new Date('2024-01-15'),
        nextCalibration: new Date('2024-07-15'),
        status: 'Operational'
      }
    ],
    dataRecorders: [
      {
        id: 'REC001',
        type: 'Flight Test Recorder',
        status: 'Operational',
        storageRemaining: 85
      }
    ],
    telemetry: {
      status: 'Online',
      bandwidth: 50,
      encryption: 'AES-256'
    }
  },
  // Add more configurations...
];

// Test Metrics
export interface TestMetrics {
  date: string;
  completionRate: number;
  testPointsCompleted: number;
  issuesIdentified: number;
  avgTestDuration: number;
}

export const mockTestMetrics: TestMetrics[] = [
  {
    date: '2024-03-01',
    completionRate: 85,
    testPointsCompleted: 42,
    issuesIdentified: 3,
    avgTestDuration: 2.5
  },
  // Add more metrics...
]; 