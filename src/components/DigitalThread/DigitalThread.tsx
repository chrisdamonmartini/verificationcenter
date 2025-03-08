import React, { useState, useEffect, useRef } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import * as BiIcons from 'react-icons/bi';

// Tabs for different visualization approaches
type VisualizationType = 'FlowView' | 'NetworkView' | 'TimelineView';

// Types for all elements in the digital thread
export interface DigitalThreadItem {
  id: string;
  name: string;
  type: 'Scenario' | 'Requirement' | 'Function' | 'Logical' | 'CAD' | 'BOM' | 'Simulation' | 'Test' | 'Result';
  status: 'Current' | 'Modified' | 'New' | 'Deprecated';
  lastModified: string;
  modifiedBy: string;
  description: string;
  linkedItems: string[];
  version: string;
  changes?: {
    date: string;
    user: string;
    description: string;
    type: 'Added' | 'Modified' | 'Removed';
  }[];
}

// Interface for each type of item
interface ScenarioItem extends DigitalThreadItem {
  type: 'Scenario';
  operationalContext: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  stakeholders: string[];
}

interface RequirementItem extends DigitalThreadItem {
  type: 'Requirement';
  category: 'Functional' | 'Performance' | 'Interface' | 'Physical' | 'Environmental' | 'Structural';
  verification: 'Analysis' | 'Inspection' | 'Demonstration' | 'Test';
  criticality: 'Low' | 'Medium' | 'High' | 'Critical';
  parentRequirements: string[];
}

interface FunctionItem extends DigitalThreadItem {
  type: 'Function';
  inputs: string[];
  outputs: string[];
  category: 'Primary' | 'Support' | 'Management';
}

interface LogicalItem extends DigitalThreadItem {
  type: 'Logical';
  category: 'Component' | 'Subsystem' | 'System';
  interfaces: { from: string; to: string; type: string }[];
  allocatedFunctions: string[];
}

interface CADItem extends DigitalThreadItem {
  type: 'CAD';
  fileFormat: string;
  fileSize: string;
  dimensions: string;
  materials: string[];
  weight: string;
}

interface BOMItem extends DigitalThreadItem {
  type: 'BOM';
  partNumber: string;
  quantity: number;
  supplier: string;
  cost: number;
  leadTime: string;
}

interface SimulationItem extends DigitalThreadItem {
  type: 'Simulation';
  simulationType: 'Structural' | 'Thermal' | 'CFD' | 'Electromagnetic' | 'System';
  parameters: { name: string; value: string; unit: string }[];
  model: string;
  environment: string;
}

interface TestItem extends DigitalThreadItem {
  type: 'Test';
  testType: 'Unit' | 'Integration' | 'System' | 'Acceptance';
  location: string;
  equipment: string[];
  testProcedure: string;
}

interface ResultItem extends DigitalThreadItem {
  type: 'Result';
  outcome: 'Pass' | 'Fail' | 'Partial';
  metrics: { name: string; value: string; unit: string }[];
  deviations: string[];
  recommendations: string[];
}

// Type for combinations
type DigitalThreadElementItem = 
  | ScenarioItem 
  | RequirementItem 
  | FunctionItem 
  | LogicalItem 
  | CADItem 
  | BOMItem 
  | SimulationItem 
  | TestItem 
  | ResultItem;

// Main component for the Digital Thread page
const DigitalThread: React.FC = () => {
  // State for active visualization tab
  const [activeView, setActiveView] = useState<VisualizationType>('FlowView');
  
  // State for selected item
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  
  // State for time filter
  const [timeRange, setTimeRange] = useState<'1W' | '1M' | '3M' | '6M' | '1Y' | 'All'>('All');
  
  // State for change filter
  const [showChanges, setShowChanges] = useState<boolean>(true);
  
  // Reference to SVG container for network view
  const networkContainerRef = useRef<HTMLDivElement>(null);

  // Generate mock digital thread data
  const digitalThreadData: DigitalThreadElementItem[] = [
    // Scenarios
    {
      id: 'SCN-001',
      name: 'Cruise Flight',
      type: 'Scenario',
      status: 'Current',
      lastModified: '2023-01-15',
      modifiedBy: 'John Smith',
      description: 'Standard cruise flight at 30,000 ft and Mach 0.85',
      linkedItems: ['REQ-001', 'REQ-003', 'REQ-005'],
      version: '1.0',
      operationalContext: 'Normal Operation',
      priority: 'High',
      stakeholders: ['Flight Operations', 'Safety', 'Performance']
    },
    {
      id: 'SCN-002',
      name: 'Emergency Descent',
      type: 'Scenario',
      status: 'Current',
      lastModified: '2023-02-10',
      modifiedBy: 'Emily Johnson',
      description: 'Rapid descent due to cabin depressurization',
      linkedItems: ['REQ-002', 'REQ-004'],
      version: '1.0',
      operationalContext: 'Emergency',
      priority: 'Critical',
      stakeholders: ['Safety', 'Flight Operations']
    },
    
    // Requirements
    {
      id: 'REQ-001',
      name: 'Wing Loading Requirement',
      type: 'Requirement',
      status: 'Current',
      lastModified: '2023-01-20',
      modifiedBy: 'Sarah Williams',
      description: 'Wing structure shall withstand loads of up to 2.5G without permanent deformation',
      linkedItems: ['SCN-001', 'FUNC-001', 'FUNC-002'],
      version: '1.2',
      category: 'Structural',
      verification: 'Test',
      criticality: 'High',
      parentRequirements: []
    },
    {
      id: 'REQ-002',
      name: 'Emergency Descent Rate',
      type: 'Requirement',
      status: 'Modified',
      lastModified: '2023-03-15',
      modifiedBy: 'Michael Chen',
      description: 'Aircraft shall be capable of descending at 10,000 ft/min during emergency procedures',
      linkedItems: ['SCN-002', 'FUNC-003'],
      version: '1.3',
      category: 'Performance',
      verification: 'Analysis',
      criticality: 'Critical',
      parentRequirements: [],
      changes: [
        {
          date: '2023-03-15',
          user: 'Michael Chen',
          description: 'Updated descent rate from 8,000 to 10,000 ft/min based on new regulatory guidelines',
          type: 'Modified'
        }
      ]
    },
    {
      id: 'REQ-003',
      name: 'Fuel Efficiency',
      type: 'Requirement',
      status: 'Current',
      lastModified: '2023-01-25',
      modifiedBy: 'David Wilson',
      description: 'Aircraft shall achieve fuel efficiency of at least 3.5 liters per passenger per 100 km',
      linkedItems: ['SCN-001', 'FUNC-004'],
      version: '1.0',
      category: 'Performance',
      verification: 'Analysis',
      criticality: 'Medium',
      parentRequirements: []
    },
    
    // Functions
    {
      id: 'FUNC-001',
      name: 'Generate Lift',
      type: 'Function',
      status: 'Current',
      lastModified: '2023-02-05',
      modifiedBy: 'Sarah Williams',
      description: 'Generate sufficient lift to maintain flight at design cruise conditions',
      linkedItems: ['REQ-001', 'LOG-001'],
      version: '1.1',
      inputs: ['Airspeed', 'Air density', 'Angle of attack'],
      outputs: ['Lift force'],
      category: 'Primary'
    },
    {
      id: 'FUNC-002',
      name: 'Distribute Loads',
      type: 'Function',
      status: 'Modified',
      lastModified: '2023-03-10',
      modifiedBy: 'Michael Chen',
      description: 'Distribute aerodynamic and inertial loads through the wing structure',
      linkedItems: ['REQ-001', 'LOG-002'],
      version: '1.2',
      inputs: ['Lift force', 'Inertial forces'],
      outputs: ['Distributed structural loads'],
      category: 'Primary',
      changes: [
        {
          date: '2023-03-10',
          user: 'Michael Chen',
          description: 'Added consideration for gust loads',
          type: 'Modified'
        }
      ]
    },
    
    // Logical Elements
    {
      id: 'LOG-001',
      name: 'Wing Aerodynamic Surfaces',
      type: 'Logical',
      status: 'Current',
      lastModified: '2023-02-15',
      modifiedBy: 'Emily Johnson',
      description: 'Logical definition of wing aerodynamic surfaces',
      linkedItems: ['FUNC-001', 'CAD-001'],
      version: '1.0',
      category: 'Subsystem',
      interfaces: [
        { from: 'LOG-001', to: 'LOG-002', type: 'Mechanical' },
        { from: 'LOG-001', to: 'LOG-003', type: 'Aerodynamic' }
      ],
      allocatedFunctions: ['FUNC-001']
    },
    {
      id: 'LOG-002',
      name: 'Wing Structure',
      type: 'Logical',
      status: 'Current',
      lastModified: '2023-02-18',
      modifiedBy: 'David Wilson',
      description: 'Logical definition of primary wing structure',
      linkedItems: ['FUNC-002', 'CAD-002'],
      version: '1.0',
      category: 'Subsystem',
      interfaces: [
        { from: 'LOG-002', to: 'LOG-001', type: 'Mechanical' },
        { from: 'LOG-002', to: 'LOG-004', type: 'Mechanical' }
      ],
      allocatedFunctions: ['FUNC-002']
    },
    
    // CAD Models
    {
      id: 'CAD-001',
      name: 'Wing Aerodynamic Surface Model',
      type: 'CAD',
      status: 'Current',
      lastModified: '2023-02-25',
      modifiedBy: 'John Smith',
      description: 'Detailed CAD model of wing aerodynamic surfaces',
      linkedItems: ['LOG-001', 'BOM-001'],
      version: '2.3',
      fileFormat: 'CATIA V5',
      fileSize: '45 MB',
      dimensions: '35m x 5m x 0.5m',
      materials: ['Aluminum 7075', 'Composite'],
      weight: '850 kg'
    },
    {
      id: 'CAD-002',
      name: 'Wing Structure Model',
      type: 'CAD',
      status: 'Modified',
      lastModified: '2023-04-05',
      modifiedBy: 'Sarah Williams',
      description: 'Detailed CAD model of internal wing structure',
      linkedItems: ['LOG-002', 'BOM-002'],
      version: '2.4',
      fileFormat: 'CATIA V5',
      fileSize: '78 MB',
      dimensions: '33m x 4m x 0.8m',
      materials: ['Aluminum 7075', 'Titanium Ti-6Al-4V', 'Carbon Fiber Composite'],
      weight: '1240 kg',
      changes: [
        {
          date: '2023-04-05',
          user: 'Sarah Williams',
          description: 'Reinforced wing root attachment points',
          type: 'Modified'
        }
      ]
    },
    
    // BOM Items
    {
      id: 'BOM-001',
      name: 'Wing Skin Assembly',
      type: 'BOM',
      status: 'Current',
      lastModified: '2023-03-05',
      modifiedBy: 'David Wilson',
      description: 'Bill of materials for wing skin components',
      linkedItems: ['CAD-001', 'SIM-001'],
      version: '1.1',
      partNumber: 'WS-10045',
      quantity: 1,
      supplier: 'Aerospace Structures Inc.',
      cost: 125000,
      leadTime: '12 weeks'
    },
    {
      id: 'BOM-002',
      name: 'Wing Internal Structure',
      type: 'BOM',
      status: 'Modified',
      lastModified: '2023-04-10',
      modifiedBy: 'Emily Johnson',
      description: 'Bill of materials for internal wing structural components',
      linkedItems: ['CAD-002', 'SIM-002'],
      version: '1.2',
      partNumber: 'WI-20078',
      quantity: 1,
      supplier: 'Advanced Aero Components',
      cost: 210000,
      leadTime: '16 weeks',
      changes: [
        {
          date: '2023-04-10',
          user: 'Emily Johnson',
          description: 'Added 4 reinforcement brackets to wing root attachment',
          type: 'Modified'
        }
      ]
    },
    
    // Simulations
    {
      id: 'SIM-001',
      name: 'Wing Aerodynamic Analysis',
      type: 'Simulation',
      status: 'Current',
      lastModified: '2023-03-15',
      modifiedBy: 'Michael Chen',
      description: 'CFD analysis of wing performance at cruise conditions',
      linkedItems: ['BOM-001', 'TEST-001', 'RES-001'],
      version: '1.0',
      simulationType: 'CFD',
      parameters: [
        { name: 'Airspeed', value: '250', unit: 'm/s' },
        { name: 'Altitude', value: '10000', unit: 'm' },
        { name: 'Angle of Attack', value: '2.5', unit: 'degrees' }
      ],
      model: 'SIM-M-001',
      environment: 'ANSYS Fluent 2023'
    },
    {
      id: 'SIM-002',
      name: 'Wing Structural Analysis',
      type: 'Simulation',
      status: 'Modified',
      lastModified: '2023-04-20',
      modifiedBy: 'Sarah Williams',
      description: 'FEA analysis of wing structure under maximum load conditions',
      linkedItems: ['BOM-002', 'TEST-002', 'RES-002'],
      version: '1.1',
      simulationType: 'Structural',
      parameters: [
        { name: 'Load Factor', value: '2.5', unit: 'G' },
        { name: 'Fuel Load', value: '75', unit: '%' },
        { name: 'Temperature', value: '-55', unit: '°C' }
      ],
      model: 'SIM-M-002',
      environment: 'Abaqus 2023',
      changes: [
        {
          date: '2023-04-20',
          user: 'Sarah Williams',
          description: 'Updated model to include reinforced wing root attachments',
          type: 'Modified'
        }
      ]
    },
    
    // Tests
    {
      id: 'TEST-001',
      name: 'Wing Wind Tunnel Test',
      type: 'Test',
      status: 'Current',
      lastModified: '2023-03-25',
      modifiedBy: 'John Smith',
      description: 'Wind tunnel testing of wing model to validate aerodynamic performance',
      linkedItems: ['SIM-001', 'RES-001'],
      version: '1.0',
      testType: 'System',
      location: 'National Aerospace Lab',
      equipment: ['5m Wind Tunnel', 'Force Balance', 'Pressure Sensors'],
      testProcedure: 'ATP-WT-001'
    },
    {
      id: 'TEST-002',
      name: 'Wing Static Load Test',
      type: 'Test',
      status: 'Current',
      lastModified: '2023-04-25',
      modifiedBy: 'Emily Johnson',
      description: 'Static load testing of wing structure',
      linkedItems: ['SIM-002', 'RES-002'],
      version: '1.0',
      testType: 'System',
      location: 'Structural Test Facility',
      equipment: ['Hydraulic Actuators', 'Load Cells', 'Strain Gauges'],
      testProcedure: 'ATP-ST-002'
    },
    
    // Results
    {
      id: 'RES-001',
      name: 'Wing Aerodynamic Performance Results',
      type: 'Result',
      status: 'Current',
      lastModified: '2023-03-30',
      modifiedBy: 'Michael Chen',
      description: 'Results from aerodynamic analysis and wind tunnel testing',
      linkedItems: ['SIM-001', 'TEST-001'],
      version: '1.0',
      outcome: 'Pass',
      metrics: [
        { name: 'Lift Coefficient', value: '0.58', unit: '' },
        { name: 'Drag Coefficient', value: '0.021', unit: '' },
        { name: 'L/D Ratio', value: '27.6', unit: '' }
      ],
      deviations: [],
      recommendations: ['Proceed with detailed design']
    },
    {
      id: 'RES-002',
      name: 'Wing Structural Analysis Results',
      type: 'Result',
      status: 'Modified',
      lastModified: '2023-04-30',
      modifiedBy: 'Sarah Williams',
      description: 'Results from structural analysis and load testing',
      linkedItems: ['SIM-002', 'TEST-002'],
      version: '1.1',
      outcome: 'Pass',
      metrics: [
        { name: 'Maximum Stress', value: '410', unit: 'MPa' },
        { name: 'Safety Factor', value: '1.2', unit: '' },
        { name: 'Maximum Deflection', value: '0.35', unit: 'm' }
      ],
      deviations: ['Localized stress concentration at wing root within acceptable limits'],
      recommendations: ['Monitor in flight testing', 'Consider additional reinforcement in next design iteration'],
      changes: [
        {
          date: '2023-04-30',
          user: 'Sarah Williams',
          description: 'Updated results based on reinforced wing root design',
          type: 'Modified'
        }
      ]
    }
  ];

  // Get an item by ID
  const getItemById = (id: string): DigitalThreadElementItem | undefined => {
    return digitalThreadData.find(item => item.id === id);
  };

  // Get linked items for a given item
  const getLinkedItems = (id: string): DigitalThreadElementItem[] => {
    const item = getItemById(id);
    if (!item) return [];
    
    return item.linkedItems
      .map(linkedId => getItemById(linkedId))
      .filter(Boolean) as DigitalThreadElementItem[];
  };

  // Get the color for an item type
  const getColorForType = (type: DigitalThreadItem['type']): string => {
    switch (type) {
      case 'Scenario': return '#3498db'; // Blue
      case 'Requirement': return '#2ecc71'; // Green
      case 'Function': return '#e74c3c'; // Red
      case 'Logical': return '#9b59b6'; // Purple
      case 'CAD': return '#f39c12'; // Orange
      case 'BOM': return '#1abc9c'; // Teal
      case 'Simulation': return '#d35400'; // Dark Orange
      case 'Test': return '#c0392b'; // Dark Red
      case 'Result': return '#27ae60'; // Dark Green
      default: return '#7f8c8d'; // Gray
    }
  };

  // Get the icon for an item type
  const getIconForType = (type: DigitalThreadItem['type']) => {
    switch (type) {
      case 'Scenario':
        return <FaIcons.FaBookOpen />;
      case 'Requirement':
        return <FaIcons.FaClipboardCheck />;
      case 'Function':
        return <FaIcons.FaCogs />;
      case 'Logical':
        return <FaIcons.FaCubes />;
      case 'CAD':
        return <FaIcons.FaDrawPolygon />;
      case 'BOM':
        return <FaIcons.FaListAlt />;
      case 'Simulation':
        return <FaIcons.FaChartLine />;
      case 'Test':
        return <FaIcons.FaVial />;
      case 'Result':
        return <FaIcons.FaCheckCircle />;
      default:
        return <FaIcons.FaQuestion />;
    }
  };

  // Get the badge style for status
  const getStatusBadgeStyle = (status: DigitalThreadItem['status']) => {
    switch (status) {
      case 'Current':
        return 'bg-green-100 text-green-800';
      case 'Modified':
        return 'bg-yellow-100 text-yellow-800';
      case 'New':
        return 'bg-blue-100 text-blue-800';
      case 'Deprecated':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Component for top dashboard
  const renderDashboard = () => {
    const counts = digitalThreadData.reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const changes = digitalThreadData.filter(item => item.status === 'Modified').length;
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Total Items</h3>
            <FaIcons.FaProjectDiagram className="text-blue-500" />
          </div>
          <p className="text-3xl font-bold">{digitalThreadData.length}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Recent Changes</h3>
            <FaIcons.FaEdit className="text-yellow-500" />
          </div>
          <p className="text-3xl font-bold">{changes}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Connected Items</h3>
            <FaIcons.FaLink className="text-green-500" />
          </div>
          <p className="text-3xl font-bold">{digitalThreadData.reduce((sum, item) => sum + item.linkedItems.length, 0)}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Categories</h3>
            <FaIcons.FaTags className="text-purple-500" />
          </div>
          <p className="text-3xl font-bold">{Object.keys(counts).length}</p>
        </div>
      </div>
    );
  };

  // Flow View visualization
  const renderFlowView = () => {
    // Group items by type for the flow view
    const itemsByType: Record<string, DigitalThreadElementItem[]> = digitalThreadData.reduce((acc, item) => {
      if (!acc[item.type]) acc[item.type] = [];
      acc[item.type].push(item);
      return acc;
    }, {} as Record<string, DigitalThreadElementItem[]>);

    // Order of types in the flow
    const typeOrder: DigitalThreadItem['type'][] = [
      'Scenario', 'Requirement', 'Function', 'Logical', 'CAD', 'BOM', 'Simulation', 'Test', 'Result'
    ];

    return (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Digital Thread Flow View</h2>
          <div className="flex space-x-2">
            <button 
              className={`px-3 py-1 rounded-lg ${showChanges ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}
              onClick={() => setShowChanges(!showChanges)}
            >
              {showChanges ? 'Hiding Changes' : 'Show Changes'}
            </button>
            <select 
              className="border rounded-lg px-3 py-1"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
            >
              <option value="1W">1 Week</option>
              <option value="1M">1 Month</option>
              <option value="3M">3 Months</option>
              <option value="6M">6 Months</option>
              <option value="1Y">1 Year</option>
              <option value="All">All Time</option>
            </select>
          </div>
        </div>

        <div className="flex overflow-x-auto pb-4 pt-2 space-x-6">
          {typeOrder.map(type => (
            <div key={type} className="min-w-64 flex-shrink-0">
              <div 
                className="mb-2 font-medium text-center p-2 rounded-t-lg flex items-center justify-center"
                style={{ backgroundColor: `${getColorForType(type)}20` }}
              >
                {getIconForType(type)}
                <span className="ml-2">{type}s</span>
                <span className="ml-2 px-2 py-0.5 rounded-full bg-white text-xs">
                  {itemsByType[type]?.length || 0}
                </span>
              </div>
              
              <div className="space-y-2">
                {itemsByType[type]?.map(item => {
                  const hasChanges = item.changes && item.changes.length > 0;
                  const shouldHighlight = showChanges && hasChanges;
                  
                  return (
                    <div 
                      key={item.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-all
                        ${selectedItem === item.id ? 'ring-2 ring-blue-500' : ''}
                        ${shouldHighlight ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200 hover:bg-gray-50'}`}
                      onClick={() => setSelectedItem(item.id === selectedItem ? null : item.id)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center">
                          <span 
                            className="w-2 h-2 rounded-full mr-2" 
                            style={{ backgroundColor: getColorForType(item.type) }}
                          ></span>
                          <span className="font-medium text-sm">{item.id}</span>
                        </div>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusBadgeStyle(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-sm">{item.name}</p>
                      
                      {/* If item is selected, show additional details */}
                      {selectedItem === item.id && (
                        <div className="mt-2 pt-2 border-t border-gray-200 text-xs">
                          <p className="mb-1 text-gray-600">{item.description}</p>
                          
                          <div className="flex justify-between mt-2">
                            <span className="text-gray-500">v{item.version}</span>
                            <span className="text-gray-500">{item.lastModified}</span>
                          </div>
                          
                          {showChanges && hasChanges && (
                            <div className="mt-2 p-2 bg-yellow-50 rounded">
                              <p className="font-medium">Recent Changes:</p>
                              {item.changes?.map((change, idx) => (
                                <div key={idx} className="mt-1">
                                  <p>{change.description}</p>
                                  <div className="flex justify-between text-gray-500">
                                    <span>{change.user}</span>
                                    <span>{change.date}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          <div className="mt-2">
                            <p className="font-medium">Linked Items:</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {item.linkedItems.map(linkedId => {
                                const linkedItem = getItemById(linkedId);
                                return linkedItem ? (
                                  <span 
                                    key={linkedId}
                                    className="px-1.5 py-0.5 rounded"
                                    style={{ 
                                      backgroundColor: `${getColorForType(linkedItem.type)}20`,
                                      color: getColorForType(linkedItem.type)
                                    }}
                                  >
                                    {linkedId}
                                  </span>
                                ) : null;
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Network View visualization
  const renderNetworkView = () => {
    return (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Digital Thread Network View</h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 rounded-lg bg-blue-100 text-blue-800">
              Zoom to Fit
            </button>
            <button className="px-3 py-1 rounded-lg bg-gray-100 text-gray-800">
              Reset View
            </button>
          </div>
        </div>
        
        <div className="border rounded-lg h-[600px] bg-gray-50 p-4 flex items-center justify-center">
          <div className="text-center">
            <FaIcons.FaProjectDiagram className="mx-auto text-gray-400 text-5xl mb-4" />
            <p className="text-gray-600">Interactive network graph visualization will be rendered here</p>
            <p className="text-gray-500 text-sm mt-2">This will show nodes representing all items and edges showing their connections</p>
          </div>
        </div>
      </div>
    );
  };

  // Timeline View visualization
  const renderTimelineView = () => {
    return (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Digital Thread Timeline View</h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 rounded-lg bg-green-100 text-green-800">
              <FaIcons.FaClock className="inline mr-1" />
              Show All Events
            </button>
            <button className="px-3 py-1 rounded-lg bg-gray-100 text-gray-800">
              <FaIcons.FaFilter className="inline mr-1" />
              Filter Events
            </button>
          </div>
        </div>
        
        <div className="border rounded-lg h-[600px] bg-gray-50 p-4 flex items-center justify-center">
          <div className="text-center">
            <FaIcons.FaHistory className="mx-auto text-gray-400 text-5xl mb-4" />
            <p className="text-gray-600">Interactive timeline visualization will be rendered here</p>
            <p className="text-gray-500 text-sm mt-2">This will show the evolution of the digital thread over time</p>
          </div>
        </div>
      </div>
    );
  };

  // Functions to render the active view
  const renderActiveView = () => {
    switch (activeView) {
      case 'FlowView':
        return renderFlowView();
      case 'NetworkView':
        return renderNetworkView();
      case 'TimelineView':
        return renderTimelineView();
      default:
        return null;
    }
  };

  // Render the complete component
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Digital Thread</h1>
      </div>

      {/* Render the dashboard */}
      {renderDashboard()}

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveView('FlowView')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeView === 'FlowView'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FaIcons.FaStream className="inline mr-2" />
            Flow View
          </button>
          <button
            onClick={() => setActiveView('NetworkView')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeView === 'NetworkView'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FaIcons.FaProjectDiagram className="inline mr-2" />
            Network View
          </button>
          <button
            onClick={() => setActiveView('TimelineView')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeView === 'TimelineView'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FaIcons.FaHistory className="inline mr-2" />
            Timeline View
          </button>
        </nav>
      </div>

      {/* Render the active view */}
      {renderActiveView()}
    </div>
  );
};

export default DigitalThread; 