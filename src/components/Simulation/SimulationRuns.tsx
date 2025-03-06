import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as MdIcons from 'react-icons/md';
import * as BsIcons from 'react-icons/bs';

// Types for simulation runs
interface SimulationRun {
  id: string;
  name: string;
  description: string;
  modelId: string;
  modelName: string;
  status: 'Scheduled' | 'Running' | 'Completed' | 'Failed' | 'Cancelled';
  progress: number;
  startTime: string;
  endTime: string | null;
  owner: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  requirements: string[];
  parameters: {
    name: string;
    value: string;
    unit?: string;
  }[];
  results: {
    metric: string;
    value: string;
    unit?: string;
    status: 'Pass' | 'Fail' | 'Warning' | 'N/A';
  }[];
}

const SimulationRuns: React.FC = () => {
  // Sample simulation runs data
  const [runs, setRuns] = useState<SimulationRun[]>([
    {
      id: 'SIM-RUN-001',
      name: 'Aerodynamic Performance - Baseline Config',
      description: 'Baseline aerodynamic performance simulation at standard conditions',
      modelId: 'SIM-001',
      modelName: 'Aerodynamic Performance Model',
      status: 'Completed',
      progress: 100,
      startTime: '2023-05-10T09:00:00',
      endTime: '2023-05-10T11:45:00',
      owner: 'John Smith',
      priority: 'Medium',
      requirements: ['SR-001', 'SR-009'],
      parameters: [
        { name: 'Airspeed', value: '250', unit: 'knots' },
        { name: 'Altitude', value: '10000', unit: 'ft' },
        { name: 'Temperature', value: '15', unit: '°C' },
        { name: 'Configuration', value: 'Clean' }
      ],
      results: [
        { metric: 'Lift Coefficient', value: '1.32', unit: '', status: 'Pass' },
        { metric: 'Drag Coefficient', value: '0.087', unit: '', status: 'Pass' },
        { metric: 'L/D Ratio', value: '15.2', unit: '', status: 'Pass' },
        { metric: 'Stall Speed', value: '105', unit: 'knots', status: 'Pass' }
      ]
    },
    {
      id: 'SIM-RUN-002',
      name: 'Structural Load Case #1',
      description: 'Structural integrity analysis under maximum load conditions',
      modelId: 'SIM-002',
      modelName: 'Structural Integrity Model',
      status: 'Completed',
      progress: 100,
      startTime: '2023-05-11T14:30:00',
      endTime: '2023-05-11T20:15:00',
      owner: 'Sarah Johnson',
      priority: 'High',
      requirements: ['SR-003', 'SR-015'],
      parameters: [
        { name: 'Load Factor', value: '4.5', unit: 'g' },
        { name: 'Gust Velocity', value: '50', unit: 'ft/s' },
        { name: 'Fuel Load', value: '75', unit: '%' }
      ],
      results: [
        { metric: 'Max Stress', value: '425', unit: 'MPa', status: 'Pass' },
        { metric: 'Safety Factor', value: '1.35', unit: '', status: 'Pass' },
        { metric: 'Max Displacement', value: '45', unit: 'mm', status: 'Warning' },
        { metric: 'Fatigue Life', value: '10000', unit: 'cycles', status: 'Pass' }
      ]
    },
    {
      id: 'SIM-RUN-003',
      name: 'Thermal Management - Hot Day',
      description: 'Thermal simulation of system behavior in hot day conditions',
      modelId: 'SIM-003',
      modelName: 'Thermal Management Simulation',
      status: 'Running',
      progress: 65,
      startTime: '2023-05-15T08:15:00',
      endTime: null,
      owner: 'Michael Brown',
      priority: 'Medium',
      requirements: ['SR-021', 'SR-022'],
      parameters: [
        { name: 'Ambient Temperature', value: '45', unit: '°C' },
        { name: 'Operation Duration', value: '120', unit: 'min' },
        { name: 'System Power', value: '100', unit: '%' }
      ],
      results: []
    },
    {
      id: 'SIM-RUN-004',
      name: 'Avionics Integration Test',
      description: 'Full system integration test of avionics components',
      modelId: 'SIM-004',
      modelName: 'Avionics System Model',
      status: 'Failed',
      progress: 78,
      startTime: '2023-05-14T10:30:00',
      endTime: '2023-05-14T12:45:00',
      owner: 'Lisa Chen',
      priority: 'High',
      requirements: ['SR-051', 'SR-052', 'SR-053'],
      parameters: [
        { name: 'Software Version', value: '3.5.2' },
        { name: 'Test Scenario', value: 'Full Mission' },
        { name: 'Fault Injection', value: 'Enabled' }
      ],
      results: [
        { metric: 'System Latency', value: '15', unit: 'ms', status: 'Pass' },
        { metric: 'Data Throughput', value: '120', unit: 'Mbps', status: 'Pass' },
        { metric: 'Error Rate', value: '0.05', unit: '%', status: 'Fail' },
        { metric: 'Fault Recovery', value: 'Failed', unit: '', status: 'Fail' }
      ]
    },
    {
      id: 'SIM-RUN-005',
      name: 'Flight Control System Response',
      description: 'Simulation of control system response characteristics',
      modelId: 'SIM-005',
      modelName: 'Flight Control System Model',
      status: 'Scheduled',
      progress: 0,
      startTime: '2023-05-20T09:00:00',
      endTime: null,
      owner: 'David Wilson',
      priority: 'Medium',
      requirements: ['SR-035', 'SR-036'],
      parameters: [
        { name: 'Maneuver Type', value: 'Step Input' },
        { name: 'Input Magnitude', value: '5', unit: 'deg' },
        { name: 'Flight Condition', value: 'Cruise' }
      ],
      results: []
    },
    {
      id: 'SIM-RUN-006',
      name: 'Environmental Extreme Cold',
      description: 'Testing system behavior in extreme cold environment',
      modelId: 'SIM-006',
      modelName: 'Environmental Conditions Model',
      status: 'Completed',
      progress: 100,
      startTime: '2023-05-12T13:00:00',
      endTime: '2023-05-12T17:30:00',
      owner: 'Rachel Adams',
      priority: 'Low',
      requirements: ['SR-002', 'SR-024'],
      parameters: [
        { name: 'Temperature', value: '-40', unit: '°C' },
        { name: 'Humidity', value: '5', unit: '%' },
        { name: 'Duration', value: '240', unit: 'min' }
      ],
      results: [
        { metric: 'System Start Time', value: '45', unit: 's', status: 'Warning' },
        { metric: 'Fluid Viscosity', value: 'Within Limits', unit: '', status: 'Pass' },
        { metric: 'Material Response', value: 'No Cracking', unit: '', status: 'Pass' },
        { metric: 'Power Consumption', value: '15', unit: '%', status: 'Pass' }
      ]
    },
    {
      id: 'SIM-RUN-007',
      name: 'Propulsion Performance Max Thrust',
      description: 'Engine performance simulation at max thrust conditions',
      modelId: 'SIM-007',
      modelName: 'Propulsion System Model',
      status: 'Completed',
      progress: 100,
      startTime: '2023-05-13T09:30:00',
      endTime: '2023-05-13T15:45:00',
      owner: 'Thomas Garcia',
      priority: 'Critical',
      requirements: ['SR-010', 'SR-011', 'SR-012'],
      parameters: [
        { name: 'Thrust Setting', value: '100', unit: '%' },
        { name: 'Altitude', value: 'Sea Level', unit: '' },
        { name: 'Temperature', value: 'ISA+15', unit: '' }
      ],
      results: [
        { metric: 'Thrust Output', value: '25000', unit: 'lbf', status: 'Pass' },
        { metric: 'Fuel Flow', value: '1850', unit: 'kg/hr', status: 'Pass' },
        { metric: 'EGT', value: '720', unit: '°C', status: 'Pass' },
        { metric: 'SFC', value: '0.37', unit: 'lb/lbf-hr', status: 'Pass' }
      ]
    }
  ]);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [modelFilter, setModelFilter] = useState('All');

  // Get unique models for filter options
  const modelOptions = Array.from(new Set(runs.map(run => ({ id: run.modelId, name: run.modelName }))));

  // Handle run filtering
  const filteredRuns = runs.filter(run => {
    const matchesSearch = 
      run.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      run.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      run.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || run.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || run.priority === priorityFilter;
    const matchesModel = modelFilter === 'All' || run.modelId === modelFilter;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesModel;
  });

  // Helper functions for styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Running':
        return 'bg-blue-100 text-blue-800';
      case 'Scheduled':
        return 'bg-purple-100 text-purple-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      case 'Cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-100 text-red-800';
      case 'High':
        return 'bg-orange-100 text-orange-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getResultBadge = (status: string) => {
    switch (status) {
      case 'Pass':
        return 'bg-green-100 text-green-800';
      case 'Fail':
        return 'bg-red-100 text-red-800';
      case 'Warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'N/A':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // State for expanded simulation run
  const [expandedRunId, setExpandedRunId] = useState<string | null>(null);

  const toggleExpandRun = (id: string) => {
    if (expandedRunId === id) {
      setExpandedRunId(null);
    } else {
      setExpandedRunId(id);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold mb-3 sm:mb-0">Simulation Runs</h2>
        <div className="flex space-x-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center">
            <FaIcons.FaPlus className="mr-2" />
            New Simulation Run
          </button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 flex items-center">
            <FaIcons.FaFileExport className="mr-2" />
            Export Results
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search simulation runs..." 
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaIcons.FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>

        <div>
          <select 
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Running">Running</option>
            <option value="Completed">Completed</option>
            <option value="Failed">Failed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <select 
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="All">All Priorities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div>
          <select 
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={modelFilter}
            onChange={(e) => setModelFilter(e.target.value)}
          >
            <option value="All">All Models</option>
            {modelOptions.map((model, index) => (
              <option key={index} value={model.id}>{model.name}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-end">
          <span className="text-sm text-gray-600">Showing {filteredRuns.length} of {runs.length} runs</span>
        </div>
      </div>

      {/* Simulation Runs List */}
      <div className="space-y-4">
        {filteredRuns.map(run => (
          <div key={run.id} className="border rounded-lg overflow-hidden">
            {/* Run Header */}
            <div 
              className={`p-4 cursor-pointer hover:bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center ${expandedRunId === run.id ? 'bg-blue-50' : 'bg-white'}`} 
              onClick={() => toggleExpandRun(run.id)}
            >
              <div className="flex flex-col sm:flex-row sm:items-center">
                <div className="mr-4 mb-2 sm:mb-0">
                  {run.status === 'Running' ? (
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center animate-pulse">
                      <FaIcons.FaPlay className="text-blue-600 text-xs" />
                    </div>
                  ) : run.status === 'Completed' ? (
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <FaIcons.FaCheck className="text-green-600" />
                    </div>
                  ) : run.status === 'Failed' ? (
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                      <FaIcons.FaTimes className="text-red-600" />
                    </div>
                  ) : run.status === 'Scheduled' ? (
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <FaIcons.FaClock className="text-purple-600" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <FaIcons.FaBan className="text-gray-600" />
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="font-bold text-lg text-blue-600">{run.name}</h3>
                  <p className="text-sm text-gray-600">{run.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(run.status)}`}>
                      {run.status}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityBadge(run.priority)}`}>
                      {run.priority} Priority
                    </span>
                    <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
                      ID: {run.id}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center mt-3 sm:mt-0">
                {run.status === 'Running' && (
                  <div className="mr-4 w-32">
                    <div className="text-xs text-gray-600 mb-1 text-right">{run.progress}%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${run.progress}%` }}></div>
                    </div>
                  </div>
                )}
                <div className="text-sm text-gray-500 mr-4 hidden sm:block">
                  {expandedRunId === run.id ? (
                    <FaIcons.FaChevronUp />
                  ) : (
                    <FaIcons.FaChevronDown />
                  )}
                </div>
              </div>
            </div>
            
            {/* Expanded Run Details */}
            {expandedRunId === run.id && (
              <div className="border-t p-4 bg-gray-50">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column - Details */}
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3">Run Details</h4>
                    <div className="bg-white p-3 rounded border">
                      <div className="grid grid-cols-2 gap-y-2 text-sm">
                        <div className="font-medium">Model:</div>
                        <div>{run.modelName}</div>
                        <div className="font-medium">Owner:</div>
                        <div>{run.owner}</div>
                        <div className="font-medium">Start Time:</div>
                        <div>{formatDate(run.startTime)}</div>
                        <div className="font-medium">End Time:</div>
                        <div>{run.endTime ? formatDate(run.endTime) : 'N/A'}</div>
                        <div className="font-medium">Requirements:</div>
                        <div className="flex flex-wrap gap-1">
                          {run.requirements.map(req => (
                            <span key={req} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs">
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Middle Column - Parameters */}
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3">Simulation Parameters</h4>
                    <div className="bg-white p-3 rounded border">
                      <table className="min-w-full text-sm">
                        <thead>
                          <tr className="text-left text-gray-500">
                            <th className="pb-2">Parameter</th>
                            <th className="pb-2">Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {run.parameters.map((param, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                              <td className="py-1 font-medium">{param.name}</td>
                              <td className="py-1">{param.value} {param.unit}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  {/* Right Column - Results */}
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3">Results</h4>
                    {run.status === 'Completed' || run.status === 'Failed' ? (
                      <div className="bg-white p-3 rounded border">
                        {run.results.length > 0 ? (
                          <table className="min-w-full text-sm">
                            <thead>
                              <tr className="text-left text-gray-500">
                                <th className="pb-2">Metric</th>
                                <th className="pb-2">Value</th>
                                <th className="pb-2">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {run.results.map((result, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                                  <td className="py-1 font-medium">{result.metric}</td>
                                  <td className="py-1">{result.value} {result.unit}</td>
                                  <td className="py-1">
                                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${getResultBadge(result.status)}`}>
                                      {result.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          <p className="text-gray-500 italic">No results available</p>
                        )}
                      </div>
                    ) : run.status === 'Running' ? (
                      <div className="bg-white p-6 rounded border text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-3"></div>
                        <p className="text-blue-600">Simulation in progress...</p>
                        <p className="text-gray-500 text-sm mt-2">Started {formatDate(run.startTime)}</p>
                      </div>
                    ) : (
                      <div className="bg-white p-6 rounded border text-center">
                        <BiIcons.BiTimeFive className="text-gray-400 text-3xl mx-auto mb-2" />
                        <p className="text-gray-500">Simulation not yet started</p>
                        <p className="text-gray-500 text-sm mt-2">Scheduled for {formatDate(run.startTime)}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex justify-end mt-4 pt-3 border-t">
                  {run.status === 'Scheduled' && (
                    <>
                      <button className="bg-blue-600 text-white px-3 py-1 rounded mr-2 text-sm flex items-center">
                        <FaIcons.FaPlay className="mr-1" /> Start Now
                      </button>
                      <button className="bg-yellow-600 text-white px-3 py-1 rounded mr-2 text-sm flex items-center">
                        <FaIcons.FaEdit className="mr-1" /> Edit
                      </button>
                      <button className="bg-red-600 text-white px-3 py-1 rounded text-sm flex items-center">
                        <FaIcons.FaTrash className="mr-1" /> Cancel
                      </button>
                    </>
                  )}
                  
                  {run.status === 'Running' && (
                    <button className="bg-red-600 text-white px-3 py-1 rounded text-sm flex items-center">
                      <FaIcons.FaStop className="mr-1" /> Abort
                    </button>
                  )}
                  
                  {(run.status === 'Completed' || run.status === 'Failed') && (
                    <>
                      <button className="bg-blue-600 text-white px-3 py-1 rounded mr-2 text-sm flex items-center">
                        <FaIcons.FaFileExport className="mr-1" /> Export Results
                      </button>
                      <button className="bg-green-600 text-white px-3 py-1 rounded mr-2 text-sm flex items-center">
                        <FaIcons.FaChartLine className="mr-1" /> Detailed Analysis
                      </button>
                      <button className="bg-purple-600 text-white px-3 py-1 rounded text-sm flex items-center">
                        <FaIcons.FaCopy className="mr-1" /> Clone
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredRuns.length === 0 && (
        <div className="text-center py-12">
          <AiIcons.AiOutlineInbox className="mx-auto text-gray-400 text-5xl mb-4" />
          <h3 className="text-xl font-medium text-gray-800 mb-2">No simulation runs found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Pagination */}
      {filteredRuns.length > 0 && (
        <div className="mt-6 flex justify-center">
          <nav className="flex items-center space-x-1">
            <button className="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-100">
              <FaIcons.FaChevronLeft className="text-sm" />
            </button>
            <button className="px-3 py-1 border rounded-md bg-blue-600 text-white">1</button>
            <button className="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-100">2</button>
            <button className="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-100">3</button>
            <button className="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-100">
              <FaIcons.FaChevronRight className="text-sm" />
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default SimulationRuns; 