import React, { useState } from 'react';
import './App.css';
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';
import * as GiIcons from 'react-icons/gi';
import Sidebar from './components/Sidebar/Sidebar';
import { motion } from 'framer-motion';

// Define a type for requirements
interface Requirement {
  id: string;
  title: string;
  description: string;
  type: string;
  priority: string;
  status: string;
  source: string;
  verification: string;
  compliance: string;
  category: string;
}

// Define a type for system functions
interface SystemFunction {
  id: string;
  name: string;
  description: string;
  level: number;
  parent: string | null;
  inputs: string[];
  outputs: string[];
  allocation: string[];
  status: 'Defined' | 'In Analysis' | 'Verified' | 'Draft';
  category: string;
}

// Define a type for logical architecture blocks
interface LogicalBlock {
  id: string;
  name: string;
  description: string;
  category: string;
  parent: string | null;
  status: string;
  requirements: string[];
}

// Define a type for logical interfaces
interface LogicalInterface {
  id: string;
  name: string;
  description: string;
  type: string;
  source: string;
  target: string;
  signals: string[];
}

// Define a type for physical components
interface PhysicalComponent {
  id: string;
  name: string;
  description: string;
  category: string;
  parent: string | null;
  status: string;
  weight: number;
  dimensions: string;
  material: string;
  supplier: string;
  logicalAllocation: string[];
  requirements: string[];
}

// Define a type for physical interfaces
interface PhysicalInterface {
  id: string;
  name: string;
  description: string;
  type: string;
  sourceComponent: string;
  targetComponent: string;
  specification: string;
}

// Create placeholder components for the systems engineering views
const Dashboard = () => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-6">Systems Engineering Dashboard</h2>
    <p className="text-gray-700 mb-4">Welcome to the Systems Engineering Dashboard for aerospace applications.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="font-bold text-lg mb-2">Requirements Status</h3>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-blue-700">84%</div>
            <div className="text-sm text-gray-500">Completion</div>
          </div>
          <BiIcons.BiCheckCircle className="text-4xl text-blue-500" />
        </div>
      </div>
      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <h3 className="font-bold text-lg mb-2">Test Coverage</h3>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-green-700">76%</div>
            <div className="text-sm text-gray-500">Verified</div>
          </div>
          <BiIcons.BiTestTube className="text-4xl text-green-500" />
        </div>
      </div>
      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
        <h3 className="font-bold text-lg mb-2">Risk Exposure</h3>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-red-700">Medium</div>
            <div className="text-sm text-gray-500">3 high priority</div>
          </div>
          <BiIcons.BiError className="text-4xl text-red-500" />
        </div>
      </div>
    </div>
  </div>
);

// Mock requirements data for aerospace systems engineering
const mockRequirements: Requirement[] = [
  { 
    id: 'SYS-REQ-001', 
    title: 'Operating Environment', 
    description: 'The system shall operate in temperature ranges from -40°C to +85°C.', 
    type: 'Functional', 
    priority: 'High', 
    status: 'Approved', 
    source: 'Customer Spec v1.2', 
    verification: 'Test',
    compliance: 'Compliant',
    category: 'Environmental' 
  },
  { 
    id: 'SYS-REQ-002', 
    title: 'Operational Lifetime', 
    description: 'The system shall have an operational lifetime of at least 15 years.', 
    type: 'Non-Functional', 
    priority: 'Medium', 
    status: 'Approved', 
    source: 'Industry Standard AS9100', 
    verification: 'Analysis',
    compliance: 'Partially Compliant',
    category: 'Reliability' 
  },
  { 
    id: 'SYS-REQ-003', 
    title: 'Power Consumption', 
    description: 'The system shall consume less than 500W during normal operation.', 
    type: 'Performance', 
    priority: 'Medium', 
    status: 'In Review', 
    source: 'System Spec v2.1', 
    verification: 'Test',
    compliance: 'Unknown',
    category: 'Electrical' 
  },
  { 
    id: 'SYS-REQ-004', 
    title: 'Weight Constraint', 
    description: 'The total system weight shall not exceed 75kg.', 
    type: 'Constraint', 
    priority: 'High', 
    status: 'Approved', 
    source: 'Customer Spec v1.2', 
    verification: 'Inspection',
    compliance: 'At Risk',
    category: 'Mechanical' 
  },
  { 
    id: 'SYS-REQ-005', 
    title: 'Electromagnetic Compatibility', 
    description: 'The system shall comply with MIL-STD-461G for EMC.', 
    type: 'Compliance', 
    priority: 'High', 
    status: 'Approved', 
    source: 'Regulatory', 
    verification: 'Test',
    compliance: 'Compliant',
    category: 'Electrical' 
  },
  { 
    id: 'SYS-REQ-006', 
    title: 'Maintainability', 
    description: 'The system shall be designed for maintenance intervals not less than 2000 flight hours.', 
    type: 'Non-Functional', 
    priority: 'Medium', 
    status: 'Approved', 
    source: 'Maintenance Plan v1.0', 
    verification: 'Analysis',
    compliance: 'Compliant',
    category: 'Supportability' 
  },
  { 
    id: 'SYS-REQ-007', 
    title: 'Data Latency', 
    description: 'The system shall process and transmit data with a latency of less than 100ms.', 
    type: 'Performance', 
    priority: 'High', 
    status: 'In Review', 
    source: 'System Spec v2.1', 
    verification: 'Test',
    compliance: 'Unknown',
    category: 'Software' 
  },
  { 
    id: 'SYS-REQ-008', 
    title: 'Redundancy', 
    description: 'The system shall implement triple redundancy for critical functions.', 
    type: 'Safety', 
    priority: 'Critical', 
    status: 'Approved', 
    source: 'Safety Assessment', 
    verification: 'Inspection',
    compliance: 'Compliant',
    category: 'Safety' 
  },
  { 
    id: 'SYS-REQ-009', 
    title: 'Vibration Resistance', 
    description: 'The system shall withstand vibration levels defined in MIL-STD-810H.', 
    type: 'Environmental', 
    priority: 'High', 
    status: 'Approved', 
    source: 'Environmental Spec', 
    verification: 'Test',
    compliance: 'Partially Compliant',
    category: 'Environmental' 
  },
  { 
    id: 'SYS-REQ-010', 
    title: 'User Interface', 
    description: 'The system shall provide a graphical user interface compliant with Human Factors standards.', 
    type: 'Functional', 
    priority: 'Medium', 
    status: 'Draft', 
    source: 'HMI Spec v1.0', 
    verification: 'Demonstration',
    compliance: 'Unknown',
    category: 'Human Factors' 
  },
  { 
    id: 'SYS-REQ-011', 
    title: 'Fault Detection', 
    description: 'The system shall detect 99% of internal faults within 5 seconds of occurrence.', 
    type: 'Safety', 
    priority: 'High', 
    status: 'Approved', 
    source: 'Safety Assessment', 
    verification: 'Test',
    compliance: 'At Risk',
    category: 'Reliability' 
  },
  { 
    id: 'SYS-REQ-012', 
    title: 'Software Security', 
    description: 'The system software shall comply with DO-326A airworthiness security standards.', 
    type: 'Security', 
    priority: 'High', 
    status: 'Approved', 
    source: 'Security Plan', 
    verification: 'Analysis',
    compliance: 'Compliant',
    category: 'Security' 
  }
];

// Mock functions data for aerospace systems
const mockFunctions: SystemFunction[] = [
  {
    id: 'F0',
    name: 'Provide Flight Management Capability',
    description: 'Top level function to provide flight management for the aircraft',
    level: 0,
    parent: null,
    inputs: ['Pilot Commands', 'External Data'],
    outputs: ['System Status', 'Control Signals'],
    allocation: ['Flight Management System'],
    status: 'Verified',
    category: 'Primary'
  },
  {
    id: 'F1',
    name: 'Process Flight Data',
    description: 'Acquire and process all flight-related data',
    level: 1,
    parent: 'F0',
    inputs: ['Sensor Data', 'Navigation Inputs'],
    outputs: ['Processed Flight Data'],
    allocation: ['Data Processing Unit'],
    status: 'Verified',
    category: 'Data Processing'
  },
  {
    id: 'F1.1',
    name: 'Acquire Sensor Data',
    description: 'Collect data from all onboard sensors',
    level: 2,
    parent: 'F1',
    inputs: ['Raw Sensor Signals'],
    outputs: ['Formatted Sensor Data'],
    allocation: ['Sensor Interface Module'],
    status: 'Verified',
    category: 'Data Acquisition'
  },
  {
    id: 'F1.2',
    name: 'Filter Sensor Data',
    description: 'Apply filtering algorithms to clean sensor data',
    level: 2,
    parent: 'F1',
    inputs: ['Formatted Sensor Data'],
    outputs: ['Filtered Sensor Data'],
    allocation: ['Signal Processing Module'],
    status: 'Verified',
    category: 'Data Processing'
  },
  {
    id: 'F1.3',
    name: 'Calibrate Sensor Data',
    description: 'Apply calibration factors to sensor data',
    level: 2,
    parent: 'F1',
    inputs: ['Filtered Sensor Data', 'Calibration Parameters'],
    outputs: ['Calibrated Sensor Data'],
    allocation: ['Calibration Module'],
    status: 'In Analysis',
    category: 'Data Processing'
  },
  {
    id: 'F2',
    name: 'Navigate Aircraft',
    description: 'Determine aircraft position and route',
    level: 1,
    parent: 'F0',
    inputs: ['GPS Data', 'INS Data', 'Flight Plan'],
    outputs: ['Navigation Solution', 'Route Guidance'],
    allocation: ['Navigation Computer'],
    status: 'Verified',
    category: 'Navigation'
  },
  {
    id: 'F2.1',
    name: 'Determine Position',
    description: 'Calculate current aircraft position',
    level: 2,
    parent: 'F2',
    inputs: ['GPS Data', 'INS Data'],
    outputs: ['Position Data'],
    allocation: ['Positioning Module'],
    status: 'Verified',
    category: 'Navigation'
  },
  {
    id: 'F2.2',
    name: 'Plan Route',
    description: 'Determine optimal route based on mission parameters',
    level: 2,
    parent: 'F2',
    inputs: ['Position Data', 'Mission Objectives', 'Environmental Data'],
    outputs: ['Route Plan'],
    allocation: ['Route Planning Module'],
    status: 'In Analysis',
    category: 'Navigation'
  },
  {
    id: 'F3',
    name: 'Control Aircraft',
    description: 'Manage aircraft control surfaces and propulsion',
    level: 1,
    parent: 'F0',
    inputs: ['Navigation Solution', 'Pilot Commands', 'Sensor Data'],
    outputs: ['Control Surface Commands', 'Propulsion Commands'],
    allocation: ['Flight Control Computer'],
    status: 'Verified',
    category: 'Control'
  },
  {
    id: 'F3.1',
    name: 'Manage Control Surfaces',
    description: 'Control aerodynamic surfaces for maneuvering',
    level: 2,
    parent: 'F3',
    inputs: ['Control Algorithms', 'Flight Path Commands'],
    outputs: ['Surface Actuation Commands'],
    allocation: ['Control Surface Module'],
    status: 'Verified',
    category: 'Control'
  },
  {
    id: 'F3.2',
    name: 'Manage Propulsion',
    description: 'Control engine thrust and efficiency',
    level: 2,
    parent: 'F3',
    inputs: ['Thrust Commands', 'Engine Status'],
    outputs: ['Engine Control Signals'],
    allocation: ['Propulsion Control Module'],
    status: 'Verified',
    category: 'Propulsion'
  },
  {
    id: 'F4',
    name: 'Monitor System Health',
    description: 'Perform continuous monitoring of system health and status',
    level: 1,
    parent: 'F0',
    inputs: ['Component Status Signals', 'Diagnostic Data'],
    outputs: ['System Health Status', 'Maintenance Alerts'],
    allocation: ['Health Monitoring System'],
    status: 'In Analysis',
    category: 'Monitoring'
  },
  {
    id: 'F4.1',
    name: 'Detect Faults',
    description: 'Identify system faults and anomalies',
    level: 2,
    parent: 'F4',
    inputs: ['System Signals', 'Fault Thresholds'],
    outputs: ['Fault Indicators'],
    allocation: ['Fault Detection Module'],
    status: 'In Analysis',
    category: 'Diagnostics'
  },
  {
    id: 'F4.2',
    name: 'Log System Data',
    description: 'Record system performance and events',
    level: 2,
    parent: 'F4',
    inputs: ['System Status', 'Event Triggers'],
    outputs: ['Data Logs'],
    allocation: ['Data Logging Module'],
    status: 'Defined',
    category: 'Data Management'
  },
  {
    id: 'F5',
    name: 'Provide User Interface',
    description: 'Manage interactions with pilots and operators',
    level: 1,
    parent: 'F0',
    inputs: ['System Status', 'Alert Conditions'],
    outputs: ['Display Information', 'Audio Alerts'],
    allocation: ['Cockpit Display System', 'Audio System'],
    status: 'Draft',
    category: 'Human Interface'
  }
];

// Mock data for logical architecture blocks
const mockLogicalBlocks: LogicalBlock[] = [
  {
    id: 'SYS001',
    name: 'Aircraft System',
    description: 'Top-level aircraft system',
    category: 'System',
    parent: null,
    status: 'Defined',
    requirements: ['REQ001', 'REQ002', 'REQ010']
  },
  {
    id: 'SYS002',
    name: 'Propulsion Subsystem',
    description: 'Provides thrust for the aircraft',
    category: 'Propulsion',
    parent: 'SYS001',
    status: 'In Analysis',
    requirements: ['REQ003', 'REQ004']
  },
  {
    id: 'SYS003',
    name: 'Avionics Subsystem',
    description: 'Handles navigation and flight control',
    category: 'Avionics',
    parent: 'SYS001',
    status: 'Verified',
    requirements: ['REQ005', 'REQ006']
  },
  {
    id: 'SYS004',
    name: 'Structural Subsystem',
    description: 'Main airframe structure',
    category: 'Structural',
    parent: 'SYS001',
    status: 'Defined',
    requirements: ['REQ007', 'REQ008']
  },
  {
    id: 'SYS005',
    name: 'Flight Control System',
    description: 'Controls aircraft movement',
    category: 'Avionics',
    parent: 'SYS003',
    status: 'In Analysis',
    requirements: ['REQ009']
  }
];

// Mock data for interfaces between logical blocks
const mockLogicalInterfaces: LogicalInterface[] = [
  {
    id: 'IF-1',
    name: 'Flight Control Interface',
    description: 'Interface between avionics and aerodynamic systems',
    source: 'AVNCS',
    target: 'AERO',
    type: 'Control',
    signals: ['Control Surface Commands', 'Surface Position Feedback']
  },
  {
    id: 'IF-2',
    name: 'Engine Control Interface',
    description: 'Interface between avionics and propulsion systems',
    source: 'AVNCS',
    target: 'PROP',
    type: 'Control',
    signals: ['Thrust Commands', 'Engine Status Data']
  },
  {
    id: 'IF-3',
    name: 'Avionic Data Bus',
    description: 'Main avionics data bus for system integration',
    source: 'AVNCS',
    target: 'SYS',
    type: 'Data',
    signals: ['System Status', 'Mission Data', 'Navigation Information']
  },
  {
    id: 'IF-4',
    name: 'Power Supply Interface',
    description: 'Electrical power distribution to all systems',
    source: 'PWR',
    target: 'SYS',
    type: 'Power',
    signals: ['28V DC', '115V AC', 'Power Status Monitoring']
  },
  {
    id: 'IF-5',
    name: 'Control Surface Actuation',
    description: 'Interface for actuating control surfaces',
    source: 'AVNCS',
    target: 'CTRL_SURF',
    type: 'Mechanical',
    signals: ['Hydraulic Pressure', 'Position Feedback']
  },
  {
    id: 'IF-6',
    name: 'Engine Power Interface',
    description: 'Power connections to engine systems',
    source: 'PWR',
    target: 'ENG',
    type: 'Power',
    signals: ['Electrical Power', 'Ignition Control']
  },
  {
    id: 'IF-7',
    name: 'Cockpit Display Power',
    description: 'Power connections to display systems',
    source: 'PWR',
    target: 'DISPLAY',
    type: 'Power',
    signals: ['Regulated Power', 'Brightness Control']
  },
  {
    id: 'IF-8',
    name: 'Navigation Data Interface',
    description: 'Navigation data transfer',
    source: 'NAV',
    target: 'FMS',
    type: 'Data',
    signals: ['Position Data', 'Velocity Data', 'Attitude Data']
  },
  {
    id: 'IF-9',
    name: 'Communication Interface',
    description: 'External communication systems interface',
    source: 'COMM',
    target: 'AVNCS',
    type: 'Data',
    signals: ['Voice', 'Datalink', 'Transponder Codes']
  }
];

// Mock physical components data
const mockPhysicalComponents: PhysicalComponent[] = [
  {
    id: 'PHY001',
    name: 'Aircraft Structure',
    description: 'Main structural assembly of the aircraft',
    category: 'Assembly',
    parent: null,
    status: 'In Production',
    weight: 2450.5,
    dimensions: '35m x 30m x 12m',
    material: 'Aluminum/Composite',
    supplier: 'In-house',
    logicalAllocation: ['SYS001', 'SYS004'],
    requirements: ['REQ001', 'REQ007', 'REQ008']
  },
  {
    id: 'PHY002',
    name: 'Fuselage Assembly',
    description: 'Main body structure of the aircraft',
    category: 'Assembly',
    parent: 'PHY001',
    status: 'In Production',
    weight: 1200.0,
    dimensions: '25m x 4m x 4m',
    material: 'Aluminum/Composite',
    supplier: 'AeroStructures Inc.',
    logicalAllocation: ['SYS004'],
    requirements: ['REQ007']
  },
  {
    id: 'PHY003',
    name: 'Wing Assembly',
    description: 'Main lift surfaces',
    category: 'Assembly',
    parent: 'PHY001',
    status: 'In Production',
    weight: 850.5,
    dimensions: '30m x 5m x 1m',
    material: 'Carbon Fiber Composite',
    supplier: 'AeroStructures Inc.',
    logicalAllocation: ['SYS004'],
    requirements: ['REQ008']
  },
  {
    id: 'PHY004',
    name: 'Propulsion System',
    description: 'Aircraft propulsion unit',
    category: 'System',
    parent: null,
    status: 'Testing',
    weight: 1350.0,
    dimensions: '4m x 2.5m x 2.5m',
    material: 'Various Alloys',
    supplier: 'PowerJet Systems',
    logicalAllocation: ['SYS002'],
    requirements: ['REQ003', 'REQ004']
  },
  {
    id: 'PHY005',
    name: 'Engine',
    description: 'Main propulsion engine',
    category: 'Component',
    parent: 'PHY004',
    status: 'Testing',
    weight: 950.0,
    dimensions: '3.2m x 2.1m x 2.1m',
    material: 'Titanium Alloy',
    supplier: 'PowerJet Systems',
    logicalAllocation: ['SYS002'],
    requirements: ['REQ003']
  },
  {
    id: 'PHY006',
    name: 'Fuel System',
    description: 'Fuel storage and distribution',
    category: 'System',
    parent: 'PHY004',
    status: 'In Production',
    weight: 400.0,
    dimensions: '2.5m x 1.5m x 1.5m',
    material: 'Aluminum',
    supplier: 'FluidTech',
    logicalAllocation: ['SYS002'],
    requirements: ['REQ004']
  },
  {
    id: 'PHY007',
    name: 'Avionics Package',
    description: 'Electronic systems for flight control and navigation',
    category: 'System',
    parent: null,
    status: 'Integration',
    weight: 120.0,
    dimensions: '1.5m x 1m x 0.5m',
    material: 'Various',
    supplier: 'AviSys Technologies',
    logicalAllocation: ['SYS003', 'SYS005'],
    requirements: ['REQ005', 'REQ006', 'REQ009']
  },
  {
    id: 'PHY008',
    name: 'Flight Computer',
    description: 'Main flight control computer',
    category: 'Component',
    parent: 'PHY007',
    status: 'Testing',
    weight: 12.5,
    dimensions: '0.4m x 0.3m x 0.2m',
    material: 'Various',
    supplier: 'AviSys Technologies',
    logicalAllocation: ['SYS003', 'SYS005'],
    requirements: ['REQ005', 'REQ009']
  },
  {
    id: 'PHY009',
    name: 'Navigation System',
    description: 'GPS and inertial navigation components',
    category: 'Component',
    parent: 'PHY007',
    status: 'Integration',
    weight: 25.0,
    dimensions: '0.5m x 0.4m x 0.3m',
    material: 'Various',
    supplier: 'NavTech',
    logicalAllocation: ['SYS003'],
    requirements: ['REQ006']
  }
];

// Mock physical interfaces data
const mockPhysicalInterfaces: PhysicalInterface[] = [
  {
    id: 'PHYIF001',
    name: 'Structure-Propulsion Mount',
    description: 'Interface between aircraft structure and propulsion system',
    type: 'Mechanical',
    sourceComponent: 'PHY001',
    targetComponent: 'PHY004',
    specification: 'Standard mounting bracket AS9100'
  },
  {
    id: 'PHYIF002',
    name: 'Avionics-Structure Installation',
    description: 'Mounting interface for avionics in the aircraft structure',
    type: 'Mechanical',
    sourceComponent: 'PHY001',
    targetComponent: 'PHY007',
    specification: 'Rack mount specification AVS-234'
  },
  {
    id: 'PHYIF003',
    name: 'Engine-Fuel Connection',
    description: 'Fuel line connection between engine and fuel system',
    type: 'Fluid',
    sourceComponent: 'PHY006',
    targetComponent: 'PHY005',
    specification: 'High-pressure fuel line spec FL-123'
  },
  {
    id: 'PHYIF004',
    name: 'Avionics-Engine Control',
    description: 'Digital control interface between avionics and engine',
    type: 'Electrical',
    sourceComponent: 'PHY008',
    targetComponent: 'PHY005',
    specification: 'ARINC 429 protocol'
  },
  {
    id: 'PHYIF005',
    name: 'Wing-Fuselage Attachment',
    description: 'Structural connection between wing and fuselage',
    type: 'Mechanical',
    sourceComponent: 'PHY002',
    targetComponent: 'PHY003',
    specification: 'Structural spec SAS-789'
  }
];

// Replace the simple Requirements component with a more comprehensive implementation
const Requirements = () => {
  const [filteredRequirements, setFilteredRequirements] = useState<Requirement[]>(mockRequirements);
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [complianceFilter, setComplianceFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRequirement, setSelectedRequirement] = useState<Requirement | null>(null);
  
  // Filter requirements based on selected filters and search query
  React.useEffect(() => {
    let filtered = mockRequirements;
    
    if (statusFilter !== 'All') {
      filtered = filtered.filter(req => req.status === statusFilter);
    }
    
    if (typeFilter !== 'All') {
      filtered = filtered.filter(req => req.type === typeFilter);
    }
    
    if (complianceFilter !== 'All') {
      filtered = filtered.filter(req => req.compliance === complianceFilter);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(req => 
        req.id.toLowerCase().includes(query) || 
        req.title.toLowerCase().includes(query) || 
        req.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredRequirements(filtered);
  }, [statusFilter, typeFilter, complianceFilter, searchQuery]);

  // Calculate requirements stats
  const requirementsStats = {
    total: mockRequirements.length,
    approved: mockRequirements.filter(req => req.status === 'Approved').length,
    inReview: mockRequirements.filter(req => req.status === 'In Review').length,
    draft: mockRequirements.filter(req => req.status === 'Draft').length,
    compliant: mockRequirements.filter(req => req.compliance === 'Compliant').length,
    partiallyCompliant: mockRequirements.filter(req => req.compliance === 'Partially Compliant').length,
    atRisk: mockRequirements.filter(req => req.compliance === 'At Risk').length,
    unknown: mockRequirements.filter(req => req.compliance === 'Unknown').length
  };

  // Get unique values for filter options using Array.from for TypeScript compatibility
  const statusOptions = ['All', ...Array.from(new Set(mockRequirements.map(req => req.status)))];
  const typeOptions = ['All', ...Array.from(new Set(mockRequirements.map(req => req.type)))];
  const complianceOptions = ['All', ...Array.from(new Set(mockRequirements.map(req => req.compliance)))];
  
  // Helper for compliance status colors
  const getComplianceColor = (compliance: string): string => {
    switch (compliance) {
      case 'Compliant': return 'bg-green-100 text-green-800';
      case 'Partially Compliant': return 'bg-yellow-100 text-yellow-800';
      case 'At Risk': return 'bg-red-100 text-red-800';
      case 'Unknown': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'In Review': return 'bg-blue-100 text-blue-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Requirements Dashboard Header */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Requirements Management</h2>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              <FaIcons.FaPlus className="inline mr-2" />
              Add Requirement
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
              <FaIcons.FaFileExport className="inline mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Requirements Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="text-sm text-blue-500 mb-1">Total Requirements</div>
            <div className="text-2xl font-bold">{requirementsStats.total}</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="text-sm text-green-500 mb-1">Approved</div>
            <div className="text-2xl font-bold">{requirementsStats.approved}</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <div className="text-sm text-yellow-600 mb-1">Compliance Issues</div>
            <div className="text-2xl font-bold">{requirementsStats.partiallyCompliant + requirementsStats.atRisk}</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <div className="text-sm text-purple-500 mb-1">Verification Complete</div>
            <div className="text-2xl font-bold">{Math.round((requirementsStats.compliant / requirementsStats.total) * 100)}%</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
          <div className="flex-grow">
            <div className="relative">
              <input
                type="text"
                placeholder="Search requirements..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaIcons.FaSearch className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <select 
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statusOptions.map(option => (
                <option key={option} value={option}>{option} Status</option>
              ))}
            </select>
            
            <select 
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              {typeOptions.map(option => (
                <option key={option} value={option}>{option} Type</option>
              ))}
            </select>
            
            <select 
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={complianceFilter}
              onChange={(e) => setComplianceFilter(e.target.value)}
            >
              {complianceOptions.map(option => (
                <option key={option} value={option}>{option} Compliance</option>
              ))}
            </select>
          </div>
        </div>

        {/* Requirements Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Compliance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequirements.map((req) => (
                <tr 
                  key={req.id} 
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedRequirement(req)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {req.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {req.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {req.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {req.priority}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(req.status)}`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getComplianceColor(req.compliance)}`}>
                      {req.compliance}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-500 hover:text-blue-700 mr-2">
                      <FaIcons.FaEdit />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <FaIcons.FaEllipsisH />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredRequirements.length === 0 && (
            <div className="text-center py-6 text-gray-500">
              No requirements match your search criteria.
            </div>
          )}
        </div>
      </div>

      {/* Requirement Detail Panel - Shows when a requirement is selected */}
      {selectedRequirement && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Requirement Details</h3>
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedRequirement(null)}
            >
              <FaIcons.FaTimes />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-1">ID</div>
                <div className="font-medium">{selectedRequirement.id}</div>
              </div>
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-1">Title</div>
                <div className="font-medium">{selectedRequirement.title}</div>
              </div>
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-1">Description</div>
                <div className="font-medium">{selectedRequirement.description}</div>
              </div>
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-1">Category</div>
                <div className="font-medium">{selectedRequirement.category}</div>
              </div>
            </div>
            
            <div>
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-1">Type</div>
                <div className="font-medium">{selectedRequirement.type}</div>
              </div>
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-1">Priority</div>
                <div className="font-medium">{selectedRequirement.priority}</div>
              </div>
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-1">Status</div>
                <div className="font-medium">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedRequirement.status)}`}>
                    {selectedRequirement.status}
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-1">Source</div>
                <div className="font-medium">{selectedRequirement.source}</div>
              </div>
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-1">Verification Method</div>
                <div className="font-medium">{selectedRequirement.verification}</div>
              </div>
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-1">Compliance</div>
                <div className="font-medium">
                  <span className={`px-2 py-1 text-xs rounded-full ${getComplianceColor(selectedRequirement.compliance)}`}>
                    {selectedRequirement.compliance}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex mt-6 space-x-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Edit Requirement
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
              View Relationships
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Verify Requirement
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Enhanced Functions component with functional hierarchy and relationship views
const Functions = () => {
  const [selectedView, setSelectedView] = useState<'hierarchy' | 'interfaces' | 'allocation'>('hierarchy');
  const [selectedFunction, setSelectedFunction] = useState<SystemFunction | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<string[]>(['F0']);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  // Get unique categories and statuses for filters
  const categories = ['All', ...Array.from(new Set(mockFunctions.map(f => f.category)))];
  const statuses = ['All', ...Array.from(new Set(mockFunctions.map(f => f.status)))];
  
  // Apply filters
  const filteredFunctions = mockFunctions.filter(f => 
    (filterCategory === 'All' || f.category === filterCategory) &&
    (filterStatus === 'All' || f.status === filterStatus)
  );

  // Function to toggle node expansion in the hierarchy
  const toggleNode = (id: string) => {
    if (expandedNodes.includes(id)) {
      setExpandedNodes(expandedNodes.filter(nodeId => nodeId !== id));
    } else {
      setExpandedNodes([...expandedNodes, id]);
    }
  };

  // Function to render the hierarchy
  const renderHierarchy = (parentId: string | null, level: number = 0) => {
    const children = filteredFunctions.filter(f => f.parent === parentId);
    
    if (children.length === 0) return null;
    
    return (
      <ul className={`pl-${level > 0 ? 6 : 0}`}>
        {children.map(func => {
          const hasChildren = filteredFunctions.some(f => f.parent === func.id);
          const isExpanded = expandedNodes.includes(func.id);
          
          return (
            <li key={func.id} className="mb-2">
              <div 
                className={`flex items-center py-2 px-3 rounded hover:bg-blue-50 cursor-pointer ${selectedFunction?.id === func.id ? 'bg-blue-100' : ''}`}
                onClick={() => setSelectedFunction(func)}
              >
                {hasChildren && (
                  <button 
                    className="mr-2 h-5 w-5 flex items-center justify-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleNode(func.id);
                    }}
                  >
                    {isExpanded ? 
                      <FaIcons.FaChevronDown className="text-gray-500" /> : 
                      <FaIcons.FaChevronRight className="text-gray-500" />
                    }
                  </button>
                )}
                {!hasChildren && <div className="w-5 mr-2"></div>}
                
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="font-medium text-blue-600">{func.id}</span>
                    <span className="mx-2 font-medium">{func.name}</span>
                    <div 
                      className={`ml-2 px-2 py-0.5 text-xs rounded-full ${func.status === 'Verified' ? 'bg-green-100 text-green-800' : 
                                func.status === 'In Analysis' ? 'bg-blue-100 text-blue-800' : 
                                func.status === 'Defined' ? 'bg-gray-100 text-gray-800' : 
                                'bg-yellow-100 text-yellow-800'}`}
                    >
                      {func.status}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 truncate">{func.description}</div>
                </div>
              </div>
              
              {hasChildren && isExpanded && renderHierarchy(func.id, level + 1)}
            </li>
          );
        })}
      </ul>
    );
  };

  // Calculate statistics
  const functionStats = {
    total: mockFunctions.length,
    verified: mockFunctions.filter(f => f.status === 'Verified').length,
    inAnalysis: mockFunctions.filter(f => f.status === 'In Analysis').length,
    defined: mockFunctions.filter(f => f.status === 'Defined').length,
    draft: mockFunctions.filter(f => f.status === 'Draft').length,
  };

  // Render interfaces tab (simplified visualization for interfaces)
  const renderInterfaces = () => {
    if (!selectedFunction) {
      return (
        <div className="text-center py-12 text-gray-500">
          Select a function to view its interfaces
        </div>
      );
    }

    return (
      <div className="p-4">
        <h3 className="text-lg font-medium mb-4">{selectedFunction.id}: {selectedFunction.name} - Interfaces</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h4 className="font-medium mb-3 text-blue-700">Inputs</h4>
            <ul className="space-y-2">
              {selectedFunction.inputs.map((input, idx) => (
                <li key={idx} className="flex items-center">
                  <FaIcons.FaArrowRight className="text-blue-500 mr-2" />
                  <span>{input}</span>
                </li>
              ))}
              {selectedFunction.inputs.length === 0 && (
                <li className="text-gray-500 italic">No inputs defined</li>
              )}
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h4 className="font-medium mb-3 text-green-700">Outputs</h4>
            <ul className="space-y-2">
              {selectedFunction.outputs.map((output, idx) => (
                <li key={idx} className="flex items-center">
                  <FaIcons.FaArrowRight className="text-green-500 mr-2" />
                  <span>{output}</span>
                </li>
              ))}
              {selectedFunction.outputs.length === 0 && (
                <li className="text-gray-500 italic">No outputs defined</li>
              )}
            </ul>
          </div>
        </div>
        
        <div className="mt-8">
          <h4 className="font-medium mb-3">Related Functions</h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            {/* Parent function if it exists */}
            {selectedFunction.parent && (
              <div className="mb-4">
                <h5 className="text-sm text-gray-500 mb-1">Parent Function</h5>
                <div className="flex items-center p-2 bg-white rounded border border-gray-200">
                  <FaIcons.FaLevelUpAlt className="text-gray-500 mr-2 transform rotate-90" />
                  <div>
                    <span className="font-medium text-blue-600 mr-2">
                      {mockFunctions.find(f => f.id === selectedFunction.parent)?.id}
                    </span>
                    <span>
                      {mockFunctions.find(f => f.id === selectedFunction.parent)?.name}
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Child functions if they exist */}
            <div>
              <h5 className="text-sm text-gray-500 mb-1">Child Functions</h5>
              <div className="space-y-2">
                {mockFunctions.filter(f => f.parent === selectedFunction.id).map(child => (
                  <div key={child.id} className="flex items-center p-2 bg-white rounded border border-gray-200">
                    <FaIcons.FaLevelDownAlt className="text-gray-500 mr-2 transform rotate-90" />
                    <div>
                      <span className="font-medium text-blue-600 mr-2">{child.id}</span>
                      <span>{child.name}</span>
                    </div>
                  </div>
                ))}
                {mockFunctions.filter(f => f.parent === selectedFunction.id).length === 0 && (
                  <div className="text-gray-500 italic p-2">No child functions</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render allocation tab
  const renderAllocation = () => {
    if (!selectedFunction) {
      return (
        <div className="text-center py-12 text-gray-500">
          Select a function to view its allocations
        </div>
      );
    }

    return (
      <div className="p-4">
        <h3 className="text-lg font-medium mb-4">{selectedFunction.id}: {selectedFunction.name} - Allocation</h3>
        
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
          <h4 className="font-medium mb-3 text-purple-700">Allocated Components</h4>
          <ul className="space-y-2">
            {selectedFunction.allocation.map((component, idx) => (
              <li key={idx} className="flex items-center p-2 bg-white rounded border border-gray-200">
                <FaIcons.FaMicrochip className="text-purple-500 mr-2" />
                <span>{component}</span>
              </li>
            ))}
            {selectedFunction.allocation.length === 0 && (
              <li className="text-gray-500 italic">No allocations defined</li>
            )}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Function Management Header */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Functional Architecture</h2>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              <FaIcons.FaPlus className="inline mr-2" />
              Add Function
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
              <FaIcons.FaFileExport className="inline mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Function Analysis Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="text-sm text-blue-500 mb-1">Total Functions</div>
            <div className="text-2xl font-bold">{functionStats.total}</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="text-sm text-green-500 mb-1">Verified</div>
            <div className="text-2xl font-bold">{functionStats.verified}</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="text-sm text-blue-500 mb-1">In Analysis</div>
            <div className="text-2xl font-bold">{functionStats.inAnalysis}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Defined</div>
            <div className="text-2xl font-bold">{functionStats.defined}</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <div className="text-sm text-yellow-600 mb-1">Draft</div>
            <div className="text-2xl font-bold">{functionStats.draft}</div>
          </div>
        </div>
      </div>

      {/* Function Analysis Main Section */}
      <div className="bg-white rounded-lg shadow-lg">
        {/* View Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button 
              className={`px-6 py-3 text-center border-b-2 font-medium text-sm ${selectedView === 'hierarchy' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setSelectedView('hierarchy')}
            >
              Functional Hierarchy
            </button>
            <button 
              className={`px-6 py-3 text-center border-b-2 font-medium text-sm ${selectedView === 'interfaces' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setSelectedView('interfaces')}
            >
              Interfaces
            </button>
            <button 
              className={`px-6 py-3 text-center border-b-2 font-medium text-sm ${selectedView === 'allocation' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setSelectedView('allocation')}
            >
              Allocation
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-4">
            <select
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category === 'All' ? 'All Categories' : category}</option>
              ))}
            </select>
            
            <select
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status === 'All' ? 'All Statuses' : status}</option>
              ))}
            </select>
          </div>
          
          {/* View content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left panel - always shows hierarchy for navigation */}
            <div className="md:col-span-1 border-r pr-4">
              <h3 className="font-medium mb-4">Function Hierarchy</h3>
              <div className="overflow-auto max-h-[600px]">
                {renderHierarchy(null)}
              </div>
            </div>
            
            {/* Right panel - changes based on selected view */}
            <div className="md:col-span-2">
              {selectedView === 'hierarchy' && selectedFunction && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Function Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="mb-4">
                        <div className="text-sm text-gray-500 mb-1">ID</div>
                        <div className="font-medium">{selectedFunction.id}</div>
                      </div>
                      <div className="mb-4">
                        <div className="text-sm text-gray-500 mb-1">Name</div>
                        <div className="font-medium">{selectedFunction.name}</div>
                      </div>
                      <div className="mb-4">
                        <div className="text-sm text-gray-500 mb-1">Description</div>
                        <div className="font-medium">{selectedFunction.description}</div>
                      </div>
                      <div className="mb-4">
                        <div className="text-sm text-gray-500 mb-1">Level</div>
                        <div className="font-medium">{selectedFunction.level}</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="mb-4">
                        <div className="text-sm text-gray-500 mb-1">Category</div>
                        <div className="font-medium">{selectedFunction.category}</div>
                      </div>
                      <div className="mb-4">
                        <div className="text-sm text-gray-500 mb-1">Status</div>
                        <div className="font-medium">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            selectedFunction.status === 'Verified' ? 'bg-green-100 text-green-800' : 
                            selectedFunction.status === 'In Analysis' ? 'bg-blue-100 text-blue-800' : 
                            selectedFunction.status === 'Defined' ? 'bg-gray-100 text-gray-800' : 
                            'bg-yellow-100 text-yellow-800'}`}
                          >
                            {selectedFunction.status}
                          </span>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="text-sm text-gray-500 mb-1">Inputs</div>
                        <div className="font-medium">
                          {selectedFunction.inputs.join(', ') || 'None'}
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="text-sm text-gray-500 mb-1">Outputs</div>
                        <div className="font-medium">
                          {selectedFunction.outputs.join(', ') || 'None'}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex mt-4 space-x-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                      Edit Function
                    </button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
                      Add Child Function
                    </button>
                  </div>
                </div>
              )}
              
              {selectedView === 'interfaces' && renderInterfaces()}
              
              {selectedView === 'allocation' && renderAllocation()}
              
              {selectedView === 'hierarchy' && !selectedFunction && (
                <div className="text-center py-12 text-gray-500">
                  Select a function to view details
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced LogicalArchitecture component
const LogicalArchitecture = () => {
  const [selectedBlock, setSelectedBlock] = useState<LogicalBlock | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  
  // Get unique categories for filters
  const categories = ['All', ...Array.from(new Set(mockLogicalBlocks.map(block => block.category)))];

  // Apply category filter
  const filteredBlocks = mockLogicalBlocks.filter(block => 
    filterCategory === 'All' || block.category === filterCategory
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Logical Architecture</h2>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            <FaIcons.FaPlus className="inline mr-2" />
            Add Block
          </button>
        </div>
      </div>

      {/* Architecture Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="text-sm text-blue-500 mb-1">Logical Blocks</div>
          <div className="text-2xl font-bold">{mockLogicalBlocks.length}</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <div className="text-sm text-green-500 mb-1">Verified Blocks</div>
          <div className="text-2xl font-bold">
            {mockLogicalBlocks.filter(block => block.status === 'Verified').length}
          </div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
          <div className="text-sm text-yellow-600 mb-1">Requirement Coverage</div>
          <div className="text-2xl font-bold">
            {mockLogicalBlocks.filter(b => b.requirements.length > 0).length} / {mockLogicalBlocks.length}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <div className="text-gray-700">Filter by category:</div>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                className={`px-3 py-1 rounded-full text-sm ${
                  filterCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setFilterCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Block list and details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left panel - blocks list */}
        <div className="md:col-span-1 border-r pr-4">
          <h3 className="font-medium mb-4">Logical Blocks</h3>
          <div className="space-y-2 overflow-auto max-h-[500px]">
            {filteredBlocks.map(block => (
              <div
                key={block.id}
                className={`p-3 rounded-lg border cursor-pointer hover:bg-blue-50 ${
                  selectedBlock?.id === block.id ? 'bg-blue-100 border-blue-300' : 'border-gray-200'
                }`}
                onClick={() => setSelectedBlock(block)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{block.id}</span>
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full ${
                      block.status === 'Verified' ? 'bg-green-100 text-green-800' : 
                      block.status === 'In Analysis' ? 'bg-blue-100 text-blue-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {block.status}
                  </span>
                </div>
                <div className="font-medium">{block.name}</div>
                <div className="text-sm text-gray-500 truncate">{block.description}</div>
                <div className="text-xs text-gray-500 mt-1">
                  <span className="mr-2">Category: {block.category}</span>
                  <span>Requirements: {block.requirements.length}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel - block details */}
        <div className="md:col-span-2">
          {selectedBlock ? (
            <div>
              <h3 className="text-xl font-bold mb-4">{selectedBlock.name} ({selectedBlock.id})</h3>
              
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-1">Description</div>
                <div className="p-3 bg-gray-50 rounded-lg">{selectedBlock.description}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Category</div>
                  <div className="font-medium">{selectedBlock.category}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Status</div>
                  <div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        selectedBlock.status === 'Verified' ? 'bg-green-100 text-green-800' : 
                        selectedBlock.status === 'In Analysis' ? 'bg-blue-100 text-blue-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {selectedBlock.status}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Parent/Child Relationships */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Block Hierarchy</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {/* Parent block if it exists */}
                  {selectedBlock.parent && (
                    <div className="mb-4">
                      <h5 className="text-sm text-gray-500 mb-1">Parent Block</h5>
                      <div className="p-2 bg-white rounded border border-gray-200">
                        <div>
                          <span className="font-medium text-blue-600 mr-2">
                            {mockLogicalBlocks.find(b => b.id === selectedBlock.parent)?.id}
                          </span>
                          <span>
                            {mockLogicalBlocks.find(b => b.id === selectedBlock.parent)?.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Child blocks if they exist */}
                  <div>
                    <h5 className="text-sm text-gray-500 mb-1">Child Blocks</h5>
                    <div className="space-y-2">
                      {mockLogicalBlocks.filter(block => block.parent === selectedBlock.id).map(child => (
                        <div 
                          key={child.id} 
                          className="p-2 bg-white rounded border border-gray-200 cursor-pointer hover:bg-blue-50"
                          onClick={() => setSelectedBlock(child)}
                        >
                          <div>
                            <span className="font-medium text-blue-600 mr-2">{child.id}</span>
                            <span>{child.name}</span>
                          </div>
                        </div>
                      ))}
                      {mockLogicalBlocks.filter(block => block.parent === selectedBlock.id).length === 0 && (
                        <div className="text-gray-500 italic p-2">No child blocks</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Requirements Traceability */}
              <div>
                <h4 className="font-medium mb-3">Requirements</h4>
                {selectedBlock.requirements.length > 0 ? (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="space-y-2">
                      {selectedBlock.requirements.map(reqId => (
                        <div key={reqId} className="p-2 bg-white rounded border border-blue-200">
                          <span className="font-medium text-blue-600">{reqId}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-500 italic">No requirements linked</div>
                )}
              </div>
              
              <div className="flex mt-6 space-x-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Edit Block
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                  Add Child Block
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-12 text-gray-500">
              <FaIcons.FaProjectDiagram className="text-5xl mb-4" />
              <p>Select a logical block to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PhysicalArchitecture = () => {
  const [selectedTab, setSelectedTab] = useState<string>('overview');
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Physical Architecture</h2>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            <FaIcons.FaPlus className="inline mr-2" />
            Add Component
          </button>
        </div>
      </div>
      
      {/* Tab navigation */}
      <div className="flex border-b mb-6">
        <button 
          className={`px-4 py-2 ${selectedTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setSelectedTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`px-4 py-2 ${selectedTab === 'components' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setSelectedTab('components')}
        >
          Components
        </button>
        <button 
          className={`px-4 py-2 ${selectedTab === 'interfaces' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setSelectedTab('interfaces')}
        >
          Interfaces
        </button>
      </div>
      
      {/* Stats section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="text-sm text-blue-500 mb-1">Total Components</div>
          <div className="text-2xl font-bold">24</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <div className="text-sm text-green-500 mb-1">In Production</div>
          <div className="text-2xl font-bold">8</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
          <div className="text-sm text-yellow-600 mb-1">In Testing</div>
          <div className="text-2xl font-bold">10</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
          <div className="text-sm text-purple-500 mb-1">In Design</div>
          <div className="text-2xl font-bold">6</div>
        </div>
      </div>
      
      {/* Tab content */}
      <div className="mt-4">
        {selectedTab === 'overview' && (
          <div>
            <h3 className="text-lg font-medium mb-4">Physical Architecture Overview</h3>
            <p className="text-gray-600 mb-4">
              This section provides a view of the system's physical components, their interfaces, 
              and relationships. The physical architecture defines how the logical functions are 
              implemented in hardware and other physical elements.
            </p>
            
            {/* Simplified hierarchy diagram */}
            <div className="border rounded-lg p-6 bg-gray-50 my-4">
              <div className="flex justify-center items-center mb-8">
                <div className="px-6 py-3 bg-blue-100 rounded-lg border border-blue-300 text-center">
                  <div className="font-medium">Aircraft System</div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="w-0.5 h-8 bg-gray-400"></div>
              </div>
              
              <div className="flex justify-around mb-8">
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-6 bg-gray-400"></div>
                  <div className="px-4 py-2 bg-green-100 rounded-lg border border-green-300 text-center">
                    <div className="font-medium">Structural</div>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-6 bg-gray-400"></div>
                  <div className="px-4 py-2 bg-yellow-100 rounded-lg border border-yellow-300 text-center">
                    <div className="font-medium">Propulsion</div>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-6 bg-gray-400"></div>
                  <div className="px-4 py-2 bg-purple-100 rounded-lg border border-purple-300 text-center">
                    <div className="font-medium">Avionics</div>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-6 bg-gray-400"></div>
                  <div className="px-4 py-2 bg-red-100 rounded-lg border border-red-300 text-center">
                    <div className="font-medium">Power</div>
                  </div>
                </div>
              </div>
              
              <div className="text-center text-sm text-gray-500 mt-4">
                Simplified Physical Architecture Breakdown
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Major Physical Components</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Fuselage Structure</li>
                  <li>Wing Assembly</li>
                  <li>Landing Gear</li>
                  <li>Propulsion System</li>
                  <li>Flight Control Surfaces</li>
                  <li>Avionics Package</li>
                  <li>Environmental Control System</li>
                  <li>Electrical Power System</li>
                </ul>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Key Interfaces</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Structure-Propulsion Mounts</li>
                  <li>Wing-Fuselage Attachment</li>
                  <li>Control Surface Actuators</li>
                  <li>Electrical Harness Connections</li>
                  <li>Hydraulic Line Couplings</li>
                  <li>Data Bus Network</li>
                  <li>Fuel System Connections</li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {selectedTab === 'components' && (
          <div>
            <h3 className="text-lg font-medium mb-4">Physical Components</h3>
            <p className="text-gray-600 mb-4">
              Navigate through the physical components of the system using the table below.
            </p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Component</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">PHY001</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Fuselage Structure</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Structural</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        In Production
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-800">View</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">PHY002</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Wing Assembly</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Structural</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        In Production
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-800">View</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">PHY003</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Engine System</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Propulsion</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        In Testing
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-800">View</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">PHY004</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Flight Control Computer</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Avionics</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        In Testing
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-800">View</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">PHY005</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Power Distribution Unit</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Electrical</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                        In Design
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-800">View</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {selectedTab === 'interfaces' && (
          <div>
            <h3 className="text-lg font-medium mb-4">Physical Interfaces</h3>
            <p className="text-gray-600 mb-4">
              The physical interfaces define how components connect and interact with each other.
            </p>
            
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-green-50">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium">Wing-Fuselage Attachment</h4>
                    <p className="text-sm text-gray-600">Mechanical interface between wing assembly and fuselage structure</p>
                  </div>
                  <span className="px-2 py-1 h-6 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Mechanical
                  </span>
                </div>
                <div className="mt-2 text-sm">
                  <span className="text-gray-500">Components: </span>
                  <span className="text-blue-600">PHY001 ↔ PHY002</span>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg bg-blue-50">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium">Engine Control Interface</h4>
                    <p className="text-sm text-gray-600">Digital interface for controlling engine functions</p>
                  </div>
                  <span className="px-2 py-1 h-6 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    Electrical
                  </span>
                </div>
                <div className="mt-2 text-sm">
                  <span className="text-gray-500">Components: </span>
                  <span className="text-blue-600">PHY004 → PHY003</span>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg bg-yellow-50">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium">Fuel Supply Line</h4>
                    <p className="text-sm text-gray-600">Fuel delivery from tanks to engine</p>
                  </div>
                  <span className="px-2 py-1 h-6 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Fluid
                  </span>
                </div>
                <div className="mt-2 text-sm">
                  <span className="text-gray-500">Components: </span>
                  <span className="text-blue-600">PHY006 → PHY003</span>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg bg-red-50">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium">Power Distribution</h4>
                    <p className="text-sm text-gray-600">Primary power bus to avionics systems</p>
                  </div>
                  <span className="px-2 py-1 h-6 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Power
                  </span>
                </div>
                <div className="mt-2 text-sm">
                  <span className="text-gray-500">Components: </span>
                  <span className="text-blue-600">PHY005 → PHY004</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ProgramManagement = () => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-6">Program Management</h2>
    <p className="text-gray-600 mb-4">Track program schedules, resources, and milestones.</p>
  </div>
);

const RiskManagement = () => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-6">Risk Management</h2>
    <p className="text-gray-600 mb-4">Identify, analyze, and mitigate project risks.</p>
  </div>
);

const TradeStudies = () => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-6">Trade Studies</h2>
    <p className="text-gray-600 mb-4">Perform analysis of alternatives and trade-off studies.</p>
  </div>
);

const VerificationMatrix = () => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-6">Verification Matrix</h2>
    <p className="text-gray-600 mb-4">Track verification status against requirements.</p>
  </div>
);

const Integration = () => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-6">Integration Management</h2>
    <p className="text-gray-600 mb-4">Manage system integration activities and interfaces.</p>
  </div>
);

const Reports = () => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-6">Reports</h2>
    <p className="text-gray-600 mb-4">Generate and view system engineering reports and analytics.</p>
  </div>
);

function App() {
  const [activeView, setActiveView] = useState<string>('dashboard');

  // Function to pass to the Sidebar component
  const handleNavigation = (route: string) => {
    setActiveView(route.replace('/', '') || 'dashboard');
  };

  // Render the appropriate content based on currentView
  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'requirements':
        return <Requirements />;
      case 'functions':
        return <Functions />;
      case 'logical':
        return <LogicalArchitecture />;
      case 'physical':
        return <PhysicalArchitecture />;
      case 'program':
        return <ProgramManagement />;
      case 'risks':
        return <RiskManagement />;
      case 'trade-studies':
        return <TradeStudies />;
      case 'verification':
        return <VerificationMatrix />;
      case 'integration':
        return <Integration />;
      case 'reports':
        return <Reports />;
      default:
        return (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold">Page not found</h2>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-900 text-white py-2 px-4 flex items-center">
        {/* SYSTEMSCENTER Logo */}
        <div className="flex items-center">
          <GiIcons.GiGears className="text-white mr-2 text-2xl" />
          <span className="font-bold text-lg mr-8">SYSTEMSCENTER</span>
        </div>
        
        {/* Spacer to push right-side buttons to the end */}
        <div className="flex-grow"></div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-blue-800 rounded-full">
            <FaIcons.FaSearch className="text-xl" />
          </button>
          <button className="p-2 hover:bg-blue-800 rounded-full relative">
            <FaIcons.FaBell className="text-xl" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar onNavigate={handleNavigation} currentView={activeView} />
        
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App; 