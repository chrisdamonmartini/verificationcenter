import React, { useState } from 'react';
import { 
  FaDatabase, 
  FaFlask, 
  FaSearch, 
  FaFilter, 
  FaPlus, 
  FaChartLine,
  FaCode,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaCog,
  FaCalendarAlt,
  FaUser,
  FaLayerGroup,
  FaEye,
  FaLink,
  FaFileAlt,
  FaClock,
  FaPlay,
  FaTimes,
  FaServer,
  FaMicrochip,
  FaMemory,
  FaHdd,
  FaImage,
  FaDownload,
  FaTable
} from 'react-icons/fa';

// Interface for simulation activities
interface SimulationActivity {
  id: string;
  name: string;
  description: string;
  modelId: string;
  modelName: string;
  type: 'CFD' | 'FEA' | 'Thermal' | 'Dynamic' | 'Electrical' | 'Software' | 'Mission' | 'Other';
  status: 'Planned' | 'Setup' | 'Running' | 'Completed' | 'Failed' | 'Analyzing' | 'Cancelled';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  requirements: string[];
  engineer: string;
  team: string[];
  startDate: string | null;
  endDate: string | null;
  duration: string;
  parameters: {
    id: string;
    name: string;
    value: string;
    unit: string;
    description: string;
  }[];
  results: {
    id: string;
    name: string;
    description: string;
    value: string | null;
    expectedValue: string | null;
    unit: string;
    status: 'Pass' | 'Fail' | 'Inconclusive' | 'Pending';
    visualizationUrl: string | null;
  }[];
  resources: {
    computeHours: number;
    cores: number;
    memory: string;
    storage: string;
  };
  artifacts: {
    type: 'Input' | 'Output' | 'Report' | 'Data' | 'Visual';
    name: string;
    description: string;
    url: string;
    timestamp: string;
  }[];
  notes: string;
}

const Simulation: React.FC = () => {
  // Sample simulation activities data
  const [simulations, setSimulations] = useState<SimulationActivity[]>([
    {
      id: "SIM-001",
      name: "Wing Structure Load Analysis",
      description: "Finite element analysis of the wing structure under maximum load conditions",
      modelId: "MDL-005",
      modelName: "Wing Assembly FEA Model",
      type: "FEA",
      status: "Completed",
      priority: "High",
      requirements: ["REQ-STR-101", "REQ-STR-102", "REQ-STR-103"],
      engineer: "Thomas Chen",
      team: ["Sarah Johnson", "Robert Lee"],
      startDate: "2023-05-15",
      endDate: "2023-05-17",
      duration: "38 hours",
      parameters: [
        {
          id: "PARAM-001",
          name: "Max Load Factor",
          value: "3.8",
          unit: "g",
          description: "Maximum design load factor"
        },
        {
          id: "PARAM-002",
          name: "Material",
          value: "AL-7075-T6",
          unit: "",
          description: "Wing skin material"
        },
        {
          id: "PARAM-003",
          name: "Temperature",
          value: "20",
          unit: "°C",
          description: "Ambient temperature"
        }
      ],
      results: [
        {
          id: "RES-001",
          name: "Maximum Stress",
          description: "Von Mises stress at maximum load",
          value: "320",
          expectedValue: "350",
          unit: "MPa",
          status: "Pass",
          visualizationUrl: "/simulations/SIM-001/stress-field.png"
        },
        {
          id: "RES-002",
          name: "Wing Tip Deflection",
          description: "Deflection at the wing tip under maximum load",
          value: "0.45",
          expectedValue: "0.5",
          unit: "m",
          status: "Pass",
          visualizationUrl: "/simulations/SIM-001/deflection.png"
        },
        {
          id: "RES-003",
          name: "Minimum Safety Factor",
          description: "Minimum safety factor across the structure",
          value: "1.35",
          expectedValue: "1.2",
          unit: "",
          status: "Pass",
          visualizationUrl: null
        }
      ],
      resources: {
        computeHours: 56,
        cores: 64,
        memory: "256 GB",
        storage: "2 TB"
      },
      artifacts: [
        {
          type: "Input",
          name: "Wing Assembly Model",
          description: "CAD model of the complete wing assembly",
          url: "/models/wing-assembly-v3.2.step",
          timestamp: "2023-05-15T08:30:00Z"
        },
        {
          type: "Output",
          name: "FEA Results Database",
          description: "Complete simulation results database",
          url: "/simulations/SIM-001/results.frd",
          timestamp: "2023-05-17T14:45:00Z"
        },
        {
          type: "Report",
          name: "Simulation Report",
          description: "Full technical report of the simulation",
          url: "/reports/SIM-001-report.pdf",
          timestamp: "2023-05-19T10:15:00Z"
        }
      ],
      notes: "Simulation completed successfully. All results within acceptable ranges. Recommended to run additional analysis for flutter conditions."
    },
    {
      id: "SIM-002",
      name: "Engine Thermal Analysis",
      description: "Thermal analysis of the engine components during maximum thrust conditions",
      modelId: "MDL-012",
      modelName: "Engine Thermal Model v2.1",
      type: "Thermal",
      status: "Failed",
      priority: "Critical",
      requirements: ["REQ-ENG-201", "REQ-ENG-202"],
      engineer: "Melissa Zhang",
      team: ["John Smith", "David Garcia"],
      startDate: "2023-06-10",
      endDate: "2023-06-11",
      duration: "22 hours",
      parameters: [
        {
          id: "PARAM-001",
          name: "Max Thrust",
          value: "100",
          unit: "%",
          description: "Maximum thrust setting"
        },
        {
          id: "PARAM-002",
          name: "Ambient Temperature",
          value: "35",
          unit: "°C",
          description: "External ambient temperature"
        },
        {
          id: "PARAM-003",
          name: "Cooling Flow Rate",
          value: "5.2",
          unit: "kg/s",
          description: "Cooling airflow rate"
        }
      ],
      results: [
        {
          id: "RES-001",
          name: "Maximum Combustor Temperature",
          description: "Peak temperature in the combustor liner",
          value: "1250",
          expectedValue: "1200",
          unit: "°C",
          status: "Fail",
          visualizationUrl: "/simulations/SIM-002/temp-field.png"
        },
        {
          id: "RES-002",
          name: "Turbine Inlet Temperature",
          description: "Average temperature at turbine inlet",
          value: "980",
          expectedValue: "950",
          unit: "°C",
          status: "Fail",
          visualizationUrl: "/simulations/SIM-002/turbine-temp.png"
        }
      ],
      resources: {
        computeHours: 32,
        cores: 32,
        memory: "128 GB",
        storage: "1.5 TB"
      },
      artifacts: [
        {
          type: "Input",
          name: "Engine Thermal Model",
          description: "Thermal model of the engine assembly",
          url: "/models/engine-thermal-v2.1.thm",
          timestamp: "2023-06-10T09:15:00Z"
        },
        {
          type: "Output",
          name: "Thermal Results",
          description: "Complete thermal analysis results",
          url: "/simulations/SIM-002/thermal-results.db",
          timestamp: "2023-06-11T07:30:00Z"
        }
      ],
      notes: "Simulation failed to meet temperature limits. Cooling system redesign required. Critical issue escalated to propulsion team."
    },
    {
      id: "SIM-003",
      name: "Flight Control System Response",
      description: "Software simulation of flight control system response to control inputs",
      modelId: "MDL-023",
      modelName: "Flight Control Model v4.5",
      type: "Software",
      status: "Running",
      priority: "High",
      requirements: ["REQ-FCS-301", "REQ-FCS-302", "REQ-FCS-303"],
      engineer: "Alex Morgan",
      team: ["Lisa Wong", "Paul Johnson"],
      startDate: "2023-07-05",
      endDate: null,
      duration: "In progress",
      parameters: [
        {
          id: "PARAM-001",
          name: "Flight Condition",
          value: "Cruise",
          unit: "",
          description: "Flight condition for the simulation"
        },
        {
          id: "PARAM-002",
          name: "Controller Version",
          value: "v2.3.5",
          unit: "",
          description: "Flight control software version"
        },
        {
          id: "PARAM-003",
          name: "Input Profile",
          value: "Step+Sinusoidal",
          unit: "",
          description: "Control input profile"
        }
      ],
      results: [
        {
          id: "RES-001",
          name: "Response Time",
          description: "System response time to step input",
          value: null,
          expectedValue: "0.2",
          unit: "s",
          status: "Pending",
          visualizationUrl: null
        },
        {
          id: "RES-002",
          name: "Overshoot",
          description: "Maximum overshoot in response",
          value: null,
          expectedValue: "5",
          unit: "%",
          status: "Pending",
          visualizationUrl: null
        }
      ],
      resources: {
        computeHours: 18,
        cores: 8,
        memory: "32 GB",
        storage: "500 GB"
      },
      artifacts: [
        {
          type: "Input",
          name: "Control System Model",
          description: "Simulink model of the flight control system",
          url: "/models/fcs-model-v4.5.slx",
          timestamp: "2023-07-05T11:00:00Z"
        }
      ],
      notes: "Simulation is currently running. Estimated completion time: 8 hours from now."
    }
  ]);
  
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [selectedSimulation, setSelectedSimulation] = useState<SimulationActivity | null>(null);
  
  // Filter simulations based on search term and filters
  const filteredSimulations = simulations.filter(sim => {
    // Apply search filter
    const matchesSearch = searchTerm === '' || 
      sim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sim.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sim.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sim.modelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sim.requirements.some(req => req.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Apply status filter
    const matchesStatus = statusFilter === 'All' || sim.status === statusFilter;
    
    // Apply type filter
    const matchesType = typeFilter === 'All' || sim.type === typeFilter;
    
    // Apply priority filter
    const matchesPriority = priorityFilter === 'All' || sim.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesType && matchesPriority;
  });
  
  // Helper functions for badges
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800"><FaCheckCircle className="inline mr-1" />Completed</span>;
      case 'Running':
        return <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"><FaCog className="inline mr-1 animate-spin" />Running</span>;
      case 'Failed':
        return <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800"><FaTimesCircle className="inline mr-1" />Failed</span>;
      case 'Planned':
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800"><FaCalendarAlt className="inline mr-1" />Planned</span>;
      case 'Setup':
        return <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800"><FaFlask className="inline mr-1" />Setup</span>;
      case 'Analyzing':
        return <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800"><FaChartLine className="inline mr-1" />Analyzing</span>;
      case 'Cancelled':
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-300 text-gray-800">Cancelled</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">{status}</span>;
    }
  };
  
  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'CFD':
        return <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">CFD</span>;
      case 'FEA':
        return <span className="px-2 py-1 rounded-full text-xs bg-indigo-100 text-indigo-800">FEA</span>;
      case 'Thermal':
        return <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">Thermal</span>;
      case 'Dynamic':
        return <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">Dynamic</span>;
      case 'Electrical':
        return <span className="px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-800">Electrical</span>;
      case 'Software':
        return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Software</span>;
      case 'Mission':
        return <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">Mission</span>;
      case 'Other':
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">Other</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">{type}</span>;
    }
  };
  
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">Critical</span>;
      case 'High':
        return <span className="px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">High</span>;
      case 'Medium':
        return <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">Medium</span>;
      case 'Low':
        return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Low</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">{priority}</span>;
    }
  };
  
  const getResultStatusBadge = (status: string) => {
    switch (status) {
      case 'Pass':
        return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800"><FaCheckCircle className="inline mr-1" />Pass</span>;
      case 'Fail':
        return <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800"><FaTimesCircle className="inline mr-1" />Fail</span>;
      case 'Inconclusive':
        return <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800"><FaExclamationTriangle className="inline mr-1" />Inconclusive</span>;
      case 'Pending':
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">Pending</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">{status}</span>;
    }
  };
  
  // Handle viewing simulation details
  const handleViewSimulation = (simulation: SimulationActivity) => {
    setSelectedSimulation(simulation);
  };
  
  // Handle closing simulation details modal
  const handleCloseDetails = () => {
    setSelectedSimulation(null);
  };
  
  return (
    <div className="p-6 max-w-full">
      <h1 className="text-2xl font-bold mb-6">Simulation Verification Method</h1>
      <p className="mb-6 text-gray-600">
        Manage and track simulation activities to verify requirements through computational modeling and analysis.
      </p>
      
      {/* Header with Add Simulation button */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Simulation Activities</h2>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
          <FaPlus className="mr-2" /> Add Simulation
        </button>
      </div>

      {/* Search and filter controls */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search field */}
        <div className="col-span-1 md:col-span-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by ID, name, description, model, or requirements..."
              className="w-full px-10 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Status filter */}
        <div className="col-span-1">
          <div className="relative">
            <select
              className="w-full px-10 py-2 border rounded-lg appearance-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Planned">Planned</option>
              <option value="Setup">Setup</option>
              <option value="Running">Running</option>
              <option value="Analyzing">Analyzing</option>
              <option value="Completed">Completed</option>
              <option value="Failed">Failed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <FaFilter className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Type filter */}
        <div className="col-span-1">
          <div className="relative">
            <select
              className="w-full px-10 py-2 border rounded-lg appearance-none"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="CFD">CFD</option>
              <option value="FEA">FEA</option>
              <option value="Thermal">Thermal</option>
              <option value="Dynamic">Dynamic</option>
              <option value="Electrical">Electrical</option>
              <option value="Software">Software</option>
              <option value="Mission">Mission</option>
              <option value="Other">Other</option>
            </select>
            <FaFilter className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Status summary */}
      <div className="mb-6 flex flex-wrap gap-3">
        <span className="text-sm text-gray-600">
          Showing {filteredSimulations.length} of {simulations.length} simulations
        </span>
        <span className="text-sm ml-4">
          <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs mr-1">
            {simulations.filter(s => s.status === 'Completed').length} Completed
          </span>
          <span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs mr-1">
            {simulations.filter(s => s.status === 'Failed').length} Failed
          </span>
          <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs mr-1">
            {simulations.filter(s => s.status === 'Running').length} Running
          </span>
          <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs mr-1">
            {simulations.filter(s => s.status === 'Analyzing').length} Analyzing
          </span>
        </span>
      </div>

      {/* Simulations list */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Model</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Priority</th>
              <th className="py-3 px-4 text-left">Engineer</th>
              <th className="py-3 px-4 text-left">Start Date</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSimulations.map(simulation => (
              <tr key={simulation.id} className="border-t hover:bg-gray-50">
                <td className="py-3 px-4">{simulation.id}</td>
                <td className="py-3 px-4">
                  <div className="font-medium">{simulation.name}</div>
                  <div className="text-sm text-gray-600 truncate max-w-xs">{simulation.description}</div>
                </td>
                <td className="py-3 px-4">{getTypeBadge(simulation.type)}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <FaLayerGroup className="mr-2 text-gray-500" />
                    <span className="text-sm">{simulation.modelName}</span>
                  </div>
                </td>
                <td className="py-3 px-4">{getStatusBadge(simulation.status)}</td>
                <td className="py-3 px-4">{getPriorityBadge(simulation.priority)}</td>
                <td className="py-3 px-4">{simulation.engineer}</td>
                <td className="py-3 px-4">{simulation.startDate || 'Not scheduled'}</td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleViewSimulation(simulation)}
                      className="p-1 text-blue-600 hover:text-blue-800"
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Simulation details modal */}
      {selectedSimulation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-xl font-bold">{selectedSimulation.id}: {selectedSimulation.name}</h2>
              <button 
                onClick={handleCloseDetails}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="p-4">
              {/* Simulation details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-gray-700">{selectedSimulation.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Status</h3>
                    <div>{getStatusBadge(selectedSimulation.status)}</div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Type</h3>
                    <div>{getTypeBadge(selectedSimulation.type)}</div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Priority</h3>
                    <div>{getPriorityBadge(selectedSimulation.priority)}</div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Duration</h3>
                    <div className="flex items-center">
                      <FaClock className="mr-1 text-gray-500" />
                      {selectedSimulation.duration}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Model details */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Model Information</h3>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center mb-2">
                    <FaLayerGroup className="mr-2 text-blue-600" />
                    <span className="text-lg font-medium">{selectedSimulation.modelName}</span>
                  </div>
                  <div className="text-sm text-gray-600">ID: {selectedSimulation.modelId}</div>
                </div>
              </div>
              
              {/* Requirements */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Requirements</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSimulation.requirements.map(req => (
                    <span key={req} className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm">
                      <FaLink className="inline-block mr-1 text-gray-500" />
                      {req}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Team and dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold mb-2">Engineer</h3>
                  <div className="flex items-center">
                    <FaUser className="mr-2 text-gray-500" />
                    {selectedSimulation.engineer}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Team</h3>
                  <ul className="list-disc list-inside">
                    {selectedSimulation.team.map((member, index) => (
                      <li key={index}>{member}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Start Date</h3>
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2 text-gray-500" />
                    {selectedSimulation.startDate || 'Not scheduled'}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">End Date</h3>
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2 text-gray-500" />
                    {selectedSimulation.endDate || 'Not completed'}
                  </div>
                </div>
              </div>
              
              {/* Resources */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Computational Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <FaClock className="text-blue-500" />
                      <span className="text-xl font-medium">{selectedSimulation.resources.computeHours}</span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Compute Hours</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <FaMicrochip className="text-green-500" />
                      <span className="text-xl font-medium">{selectedSimulation.resources.cores}</span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">CPU Cores</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <FaMemory className="text-purple-500" />
                      <span className="text-xl font-medium">{selectedSimulation.resources.memory}</span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Memory</div>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <FaHdd className="text-amber-500" />
                      <span className="text-xl font-medium">{selectedSimulation.resources.storage}</span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Storage</div>
                  </div>
                </div>
              </div>
              
              {/* Parameters */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Simulation Parameters</h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedSimulation.parameters.map(param => (
                        <tr key={param.id}>
                          <td className="px-4 py-2 font-medium">{param.name}</td>
                          <td className="px-4 py-2">{param.value}</td>
                          <td className="px-4 py-2">{param.unit}</td>
                          <td className="px-4 py-2 text-gray-600">{param.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Results */}
              {selectedSimulation.results.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Simulation Results</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expected</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actual</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visual</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {selectedSimulation.results.map(result => (
                          <tr key={result.id}>
                            <td className="px-4 py-2 font-medium">{result.name}</td>
                            <td className="px-4 py-2">{result.expectedValue || '-'}</td>
                            <td className="px-4 py-2">{result.value || '-'}</td>
                            <td className="px-4 py-2">{result.unit}</td>
                            <td className="px-4 py-2">{getResultStatusBadge(result.status)}</td>
                            <td className="px-4 py-2">
                              {result.visualizationUrl ? (
                                <button className="text-blue-600 hover:text-blue-800">
                                  <FaImage className="inline mr-1" /> View
                                </button>
                              ) : (
                                <span className="text-gray-400">None</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {/* Artifacts */}
              {selectedSimulation.artifacts.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Artifacts</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedSimulation.artifacts.map((artifact, index) => (
                      <div key={index} className="flex items-center p-3 border rounded-lg">
                        {artifact.type === 'Input' && <FaDatabase className="text-blue-500 mr-3" />}
                        {artifact.type === 'Output' && <FaTable className="text-green-500 mr-3" />}
                        {artifact.type === 'Report' && <FaFileAlt className="text-red-500 mr-3" />}
                        {artifact.type === 'Data' && <FaServer className="text-purple-500 mr-3" />}
                        {artifact.type === 'Visual' && <FaImage className="text-amber-500 mr-3" />}
                        <div className="flex-grow">
                          <div className="font-medium">{artifact.name}</div>
                          <div className="text-sm text-gray-600">{artifact.description}</div>
                          <div className="text-xs text-gray-400 mt-1">
                            {new Date(artifact.timestamp).toLocaleString()}
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 ml-2">
                          <FaDownload />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Notes */}
              {selectedSimulation.notes && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Notes</h3>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    {selectedSimulation.notes}
                  </div>
                </div>
              )}
              
              {/* Actions */}
              <div className="flex justify-end space-x-3 border-t pt-4">
                {selectedSimulation.status === 'Running' && (
                  <button className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50">
                    Stop Simulation
                  </button>
                )}
                {(selectedSimulation.status === 'Completed' || selectedSimulation.status === 'Failed') && (
                  <button className="px-4 py-2 border border-green-500 text-green-500 rounded-lg hover:bg-green-50">
                    <FaFileAlt className="inline-block mr-2" />
                    Export Report
                  </button>
                )}
                {selectedSimulation.status !== 'Running' && (
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <FaPlay className="inline-block mr-2" />
                    Run Simulation
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Simulation; 