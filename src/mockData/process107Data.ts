export interface Process107Request {
  id: string;
  type: 'TAR' | 'MAR';
  asset: string;
  description: string;
  urgency: 'Emergency' | 'Immediate' | 'Urgent' | 'Routine';
  submittedDate: string;
  stage: 'Field Submission' | 'SM Review' | 'Engineering' | 'SOR Engagement' | 'Closure';
  status: 'Pending' | 'In-Review' | 'Approved' | 'In-Progress' | 'Closed';
  requestedBy: string;
  assignedTo: string;
  unit: string;
  targetResponseTime: number;
  responseTime?: number;
  timeline?: {
    date: string;
    action: string;
    details: string;
    status: 'Pending' | 'In Progress' | 'Completed';
  }[];
}

export const mockProcessRequests: Process107Request[] = [
  {
    id: 'TAR-2023-078',
    type: 'TAR',
    asset: 'F-35A (AF-10042)',
    description: 'Engine control system fault requiring technical assistance for troubleshooting',
    urgency: 'Urgent',
    submittedDate: '2023-06-15 09:25',
    stage: 'Engineering',
    status: 'In-Review',
    requestedBy: 'TSgt Michael Rodriguez',
    assignedTo: 'Capt Jennifer Chen',
    unit: '388th Fighter Wing',
    targetResponseTime: 8,
    responseTime: 6.5,
    timeline: [
      {
        date: '2023-06-15 09:25',
        action: 'Request Submitted',
        details: 'TAR submitted via IMDS',
        status: 'Completed'
      },
      {
        date: '2023-06-15 10:30',
        action: 'SM Initial Review',
        details: 'TAR validated and routed to propulsion engineering',
        status: 'Completed'
      },
      {
        date: '2023-06-15 15:45',
        action: 'Engineering Review',
        details: 'Propulsion team analyzing fault data',
        status: 'In Progress'
      }
    ]
  },
  {
    id: 'MAR-2023-112',
    type: 'MAR',
    asset: 'C-130J (AF-42)',
    description: 'Center wing box corrosion requiring depot-level maintenance assistance',
    urgency: 'Immediate',
    submittedDate: '2023-06-17 14:10',
    stage: 'SM Review',
    status: 'Pending',
    requestedBy: 'MSgt Sarah Johnson',
    assignedTo: 'Maj Robert Wilson',
    unit: '317th Airlift Wing',
    targetResponseTime: 4,
    responseTime: 3.2,
    timeline: [
      {
        date: '2023-06-17 14:10',
        action: 'Request Submitted',
        details: 'MAR submitted with corrosion photos and structural analysis',
        status: 'Completed'
      },
      {
        date: '2023-06-17 17:20',
        action: 'SM Initial Review',
        details: 'Reviewing documentation and preparing engineering tasking',
        status: 'In Progress'
      }
    ]
  },
  {
    id: 'TAR-2023-089',
    type: 'TAR',
    asset: 'F-22A (AF-12347)',
    description: 'Critical avionics system failure affecting mission capability',
    urgency: 'Emergency',
    submittedDate: '2023-06-18 08:45',
    stage: 'Field Submission',
    status: 'Pending',
    requestedBy: 'Capt Thomas Brown',
    assignedTo: 'Lt Col James Davis',
    unit: '1st Fighter Wing',
    targetResponseTime: 1
  },
  {
    id: 'MAR-2023-099',
    type: 'MAR',
    asset: 'B-1B (AF-86125)',
    description: 'Fuel system component replacement requiring depot expertise',
    urgency: 'Routine',
    submittedDate: '2023-06-10 11:30',
    stage: 'Closure',
    status: 'Closed',
    requestedBy: 'MSgt David Martinez',
    assignedTo: 'Maj Lisa Taylor',
    unit: '7th Bomb Wing',
    targetResponseTime: 24,
    responseTime: 18.5,
    timeline: [
      {
        date: '2023-06-10 11:30',
        action: 'Request Submitted',
        details: 'MAR submitted via IMDS',
        status: 'Completed'
      },
      {
        date: '2023-06-10 15:40',
        action: 'SM Initial Review',
        details: 'Request validated and forwarded to engineering',
        status: 'Completed'
      },
      {
        date: '2023-06-11 10:15',
        action: 'Engineering Disposition',
        details: 'Technical solution developed and approved',
        status: 'Completed'
      },
      {
        date: '2023-06-12 13:20',
        action: 'SOR Engagement',
        details: 'SOR team dispatched with required parts',
        status: 'Completed'
      },
      {
        date: '2023-06-14 16:45',
        action: 'Request Closure',
        details: 'Repair completed and verified by QA',
        status: 'Completed'
      }
    ]
  },
  {
    id: 'TAR-2023-093',
    type: 'TAR',
    asset: 'F-15E (AF-90255)',
    description: 'Radar system anomalies requiring technical assistance',
    urgency: 'Urgent',
    submittedDate: '2023-06-16 13:20',
    stage: 'Engineering',
    status: 'In-Progress',
    requestedBy: 'TSgt Amanda Williams',
    assignedTo: 'Capt Daniel Park',
    unit: '366th Fighter Wing',
    targetResponseTime: 8,
    responseTime: 7.2,
    timeline: [
      {
        date: '2023-06-16 13:20',
        action: 'Request Submitted',
        details: 'TAR submitted with BIT data',
        status: 'Completed'
      },
      {
        date: '2023-06-16 16:10',
        action: 'SM Initial Review',
        details: 'Request validated and sent to avionics engineering',
        status: 'Completed'
      },
      {
        date: '2023-06-17 09:30',
        action: 'Engineering Review',
        details: 'Analysis of radar data in progress',
        status: 'In Progress'
      }
    ]
  },
  {
    id: 'MAR-2023-108',
    type: 'MAR',
    asset: 'KC-135R (AF-63782)',
    description: 'Main landing gear actuator replacement requiring depot support',
    urgency: 'Immediate',
    submittedDate: '2023-06-16 09:15',
    stage: 'SOR Engagement',
    status: 'In-Progress',
    requestedBy: 'MSgt Richard Garcia',
    assignedTo: 'Maj Samantha Hill',
    unit: '22nd Air Refueling Wing',
    targetResponseTime: 4,
    responseTime: 3.8,
    timeline: [
      {
        date: '2023-06-16 09:15',
        action: 'Request Submitted',
        details: 'MAR submitted with maintenance data',
        status: 'Completed'
      },
      {
        date: '2023-06-16 10:40',
        action: 'SM Initial Review',
        details: 'Request validated and forwarded to engineering',
        status: 'Completed'
      },
      {
        date: '2023-06-16 14:20',
        action: 'Engineering Disposition',
        details: 'Engineering approved and created maintenance procedure',
        status: 'Completed'
      },
      {
        date: '2023-06-17 08:30',
        action: 'SOR Engagement',
        details: 'SOR team activated and preparing for deployment',
        status: 'In Progress'
      }
    ]
  }
]; 