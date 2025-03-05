import { v4 as uuidv4 } from 'uuid';

export type MaintenanceStatus = 
  | 'Operational' 
  | 'In Mission' 
  | 'Diagnosing'
  | 'Fault Isolating'
  | 'Parts on Order'
  | 'Repair in Progress'
  | 'Repair Complete'
  | 'Safe for Flight';

export type Severity = 'Critical' | 'Warning' | 'Normal';

export interface Aircraft {
  id: string;
  tailNumber: string;
  model: string;
  status: MaintenanceStatus;
  location: string;
  missionCapable: boolean;
  lastMaintenance: string; // ISO date string
  nextScheduledMaintenance: string; // ISO date string
  errors: SystemError[];
  currentRepair: Repair | null;
  missions: Mission[];
}

export interface SystemError {
  id: string;
  system: string;
  component: string;
  description: string;
  severity: Severity;
  reportedAt: string; // ISO date string
  affectedSystems: string[];
}

export interface Mission {
  id: string;
  name: string;
  startTime: string; // ISO date string
  endTime: string; // ISO date string
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  aircraftId: string;
}

export interface Repair {
  id: string;
  aircraftId: string;
  relatedErrorId?: string;
  stage: MaintenanceStatus;
  startTime: string;
  estimatedCompletionTime: string;
  actualCompletionTime?: string;
  assignedTechnicians: Technician[];
  technicianIds?: string[];
  status?: string;
  description?: string;
  location?: string;
  partsRequired: {
    id: string;
    quantity: number;
    name: string;
  }[];
  notes: string;
}

export interface Qualification {
  id: string;
  name: string;
  type: 'Certification' | 'Training' | 'License';
  issuedDate: string;
  expirationDate: string;
  status: 'Active' | 'Expired' | 'Expiring Soon';
  issuingAuthority: string;
  certificationNumber?: string;
}

export interface SkillRating {
  skill: string;
  level: 1 | 2 | 3 | 4 | 5; // 1=Basic, 5=Expert
  lastAssessed: string;
  endorsedBy?: string;
}

export interface Availability {
  shift: 'Day' | 'Night' | 'Swing';
  nextAvailable: string; // ISO date string
  schedule: string[];
  leaves: string[]; // Array of ISO date strings
}

export interface Certification {
  type: string;
  number: string;
  issuedDate: string;
  expirationDate: string;
  status: string;
}

export interface Training {
  name: string;
  completedDate: string;
  validUntil: string;
  score: number;
}

export interface Assignment {
  aircraftId: string;
  taskType: string;
  startDate: string;
  endDate: string;
  outcome: string;
}

export interface Technician {
  id: string;
  name: string;
  specialties?: string[];
  available: boolean;
  currentAssignment?: string;
  rank?: string;
  experience?: number;
  certifications?: Certification[];
  trainings?: Training[];
  assignmentHistory?: Assignment[];
  availability: 'Available' | 'On Duty' | 'Off Duty';
}

export interface Part {
  id: string;
  name: string;
  partNumber: string;
  inventory: number;
  onOrder: number;
  estimatedArrival?: string; // ISO date string
}

export interface WeatherCondition {
  temperature: number;
  windSpeed: number;
  visibility: number;
  conditions: string;
  forecast: WeatherForecast[];
}

export interface WeatherForecast {
  time: string; // ISO date string
  temperature: number;
  windSpeed: number;
  visibility: number;
  conditions: string;
}

export interface Team {
  id: string;
  name: string;
  supervisor: string;
  members: string[];
  specialization: string[];
  shift: 'Day' | 'Night' | 'Swing';
} 