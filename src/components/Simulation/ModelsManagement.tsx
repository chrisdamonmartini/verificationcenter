import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';
import * as AiIcons from 'react-icons/ai';

// Types for simulation models
interface SimulationModel {
  id: string;
  name: string;
  description: string;
  type: string;
  version: string;
  status: 'Active' | 'In Development' | 'Deprecated' | 'Archived';
  fidelity: 'Low' | 'Medium' | 'High';
  owner: string;
  lastModified: string;
  validationStatus: 'Not Validated' | 'Partially Validated' | 'Fully Validated';
  tags: string[];
  applicableRequirements: string[];
}

const ModelsManagement: React.FC = () => {
  // Sample simulation models data
  const [models, setModels] = useState<SimulationModel[]>([
    {
      id: 'SIM-001',
      name: 'Aerodynamic Performance Model',
      description: 'High-fidelity model for aerodynamic performance prediction',
      type: 'CFD',
      version: '2.3.4',
      status: 'Active',
      fidelity: 'High',
      owner: 'John Smith',
      lastModified: '2023-04-15',
      validationStatus: 'Fully Validated',
      tags: ['Aerodynamics', 'Performance', 'CFD'],
      applicableRequirements: ['SR-001', 'SR-009', 'SR-023']
    },
    {
      id: 'SIM-002',
      name: 'Structural Integrity Model',
      description: 'FEA model for structural analysis and load testing',
      type: 'FEA',
      version: '1.8.0',
      status: 'Active',
      fidelity: 'High',
      owner: 'Sarah Johnson',
      lastModified: '2023-03-22',
      validationStatus: 'Fully Validated',
      tags: ['Structural', 'FEA', 'Load Testing'],
      applicableRequirements: ['SR-003', 'SR-015', 'SR-042']
    },
    {
      id: 'SIM-003',
      name: 'Thermal Management Simulation',
      description: 'Model for thermal analysis and heat distribution',
      type: 'Thermal Analysis',
      version: '3.1.2',
      status: 'In Development',
      fidelity: 'Medium',
      owner: 'Michael Brown',
      lastModified: '2023-05-02',
      validationStatus: 'Partially Validated',
      tags: ['Thermal', 'Heat Transfer', 'Environment'],
      applicableRequirements: ['SR-021', 'SR-022']
    },
    {
      id: 'SIM-004',
      name: 'Avionics System Model',
      description: 'Digital twin of the avionics system for functional testing',
      type: 'System Simulation',
      version: '2.0.1',
      status: 'Active',
      fidelity: 'High',
      owner: 'Lisa Chen',
      lastModified: '2023-04-28',
      validationStatus: 'Partially Validated',
      tags: ['Avionics', 'Electronics', 'Software'],
      applicableRequirements: ['SR-051', 'SR-052', 'SR-053', 'SR-054']
    },
    {
      id: 'SIM-005',
      name: 'Flight Control System Model',
      description: 'Behavioral model of flight control system responses',
      type: 'Control System',
      version: '1.4.3',
      status: 'In Development',
      fidelity: 'Medium',
      owner: 'David Wilson',
      lastModified: '2023-05-10',
      validationStatus: 'Not Validated',
      tags: ['Controls', 'Flight Dynamics', 'Autopilot'],
      applicableRequirements: ['SR-035', 'SR-036', 'SR-037']
    },
    {
      id: 'SIM-006',
      name: 'Environmental Conditions Model',
      description: 'Simulation of various environmental conditions for testing',
      type: 'Environmental',
      version: '1.2.0',
      status: 'Active',
      fidelity: 'Medium',
      owner: 'Rachel Adams',
      lastModified: '2023-02-18',
      validationStatus: 'Fully Validated',
      tags: ['Environment', 'Climate', 'Weather'],
      applicableRequirements: ['SR-002', 'SR-024', 'SR-025']
    },
    {
      id: 'SIM-007',
      name: 'Propulsion System Model',
      description: 'Performance model of the propulsion system',
      type: 'Propulsion',
      version: '3.5.2',
      status: 'Active',
      fidelity: 'High',
      owner: 'Thomas Garcia',
      lastModified: '2023-03-05',
      validationStatus: 'Fully Validated',
      tags: ['Propulsion', 'Engine', 'Performance'],
      applicableRequirements: ['SR-010', 'SR-011', 'SR-012']
    }
  ]);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [validationFilter, setValidationFilter] = useState('All');

  // Handle model filtering
  const filteredModels = models.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         model.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         model.id.toLowerCase().includes(searchTerm.toLowerCase());
                         
    const matchesStatus = statusFilter === 'All' || model.status === statusFilter;
    const matchesType = typeFilter === 'All' || model.type === typeFilter;
    const matchesValidation = validationFilter === 'All' || model.validationStatus === validationFilter;
    
    return matchesSearch && matchesStatus && matchesType && matchesValidation;
  });

  // Get unique types for filter options
  const modelTypes = Array.from(new Set(models.map(model => model.type)));

  // Get status badge styling
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'In Development':
        return 'bg-blue-100 text-blue-800';
      case 'Deprecated':
        return 'bg-yellow-100 text-yellow-800';
      case 'Archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get validation status badge styling
  const getValidationBadge = (status: string) => {
    switch(status) {
      case 'Fully Validated':
        return 'bg-green-100 text-green-800';
      case 'Partially Validated':
        return 'bg-yellow-100 text-yellow-800';
      case 'Not Validated':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get fidelity badge styling
  const getFidelityBadge = (fidelity: string) => {
    switch(fidelity) {
      case 'High':
        return 'bg-purple-100 text-purple-800';
      case 'Medium':
        return 'bg-blue-100 text-blue-800';
      case 'Low':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Simulation Models Management</h2>
        <div className="flex space-x-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center">
            <FaIcons.FaPlus className="mr-2" />
            New Model
          </button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 flex items-center">
            <FaIcons.FaFileImport className="mr-2" />
            Import
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search models..." 
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
            <option value="Active">Active</option>
            <option value="In Development">In Development</option>
            <option value="Deprecated">Deprecated</option>
            <option value="Archived">Archived</option>
          </select>
        </div>

        <div>
          <select 
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="All">All Types</option>
            {modelTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <select 
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={validationFilter}
            onChange={(e) => setValidationFilter(e.target.value)}
          >
            <option value="All">All Validation Statuses</option>
            <option value="Fully Validated">Fully Validated</option>
            <option value="Partially Validated">Partially Validated</option>
            <option value="Not Validated">Not Validated</option>
          </select>
        </div>

        <div className="text-right">
          <span className="text-sm text-gray-600">Showing {filteredModels.length} of {models.length} models</span>
        </div>
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredModels.map(model => (
          <div key={model.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg text-blue-600">{model.name}</h3>
              <div className="flex space-x-1">
                <button className="p-1 text-gray-500 hover:text-gray-700">
                  <BsIcons.BsThreeDotsVertical />
                </button>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-3">{model.description}</p>
            
            <div className="flex items-center mb-2">
              <span className="text-xs font-medium mr-2">ID:</span>
              <span className="text-xs">{model.id}</span>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-3">
              <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(model.status)}`}>
                {model.status}
              </span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${getValidationBadge(model.validationStatus)}`}>
                {model.validationStatus}
              </span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${getFidelityBadge(model.fidelity)}`}>
                {model.fidelity} Fidelity
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
              <div>
                <span className="font-medium">Type:</span> {model.type}
              </div>
              <div>
                <span className="font-medium">Version:</span> {model.version}
              </div>
              <div>
                <span className="font-medium">Owner:</span> {model.owner}
              </div>
              <div>
                <span className="font-medium">Modified:</span> {model.lastModified}
              </div>
            </div>
            
            <div className="mb-3">
              <p className="text-xs font-medium mb-1">Applicable Requirements:</p>
              <div className="flex flex-wrap gap-1">
                {model.applicableRequirements.map(req => (
                  <span key={req} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs">
                    {req}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-xs font-medium mb-1">Tags:</p>
              <div className="flex flex-wrap gap-1">
                {model.tags.map(tag => (
                  <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t flex justify-between">
              <button className="text-blue-600 text-sm hover:text-blue-800 flex items-center">
                <FaIcons.FaEdit className="mr-1" /> Edit
              </button>
              <button className="text-blue-600 text-sm hover:text-blue-800 flex items-center">
                <FaIcons.FaPlayCircle className="mr-1" /> Use in Simulation
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {filteredModels.length > 0 && (
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

      {/* No Results */}
      {filteredModels.length === 0 && (
        <div className="text-center py-12">
          <AiIcons.AiOutlineInbox className="mx-auto text-gray-400 text-5xl mb-4" />
          <h3 className="text-xl font-medium text-gray-800 mb-2">No models found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default ModelsManagement; 