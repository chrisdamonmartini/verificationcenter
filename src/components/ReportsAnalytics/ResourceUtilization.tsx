import React, { useState } from 'react';
import { FaSearch, FaFilter, FaCalendarAlt, FaUsers, FaTools, FaBuilding, FaDownload, FaChartLine } from 'react-icons/fa';

// Define interfaces for our data
interface Resource {
  id: string;
  name: string;
  type: 'Personnel' | 'Equipment' | 'Facility' | 'Software' | 'Service';
  utilization: number; // percentage of capacity used
  allocation: number; // number of activities allocated
  availability: number; // percentage available
  cost: number; // cost per hour/day/unit
  costUnit: 'hour' | 'day' | 'month' | 'unit';
  department?: string;
  location?: string;
}

interface ResourceUsage {
  month: string;
  personnel: number;
  equipment: number;
  facility: number;
  software: number;
  service: number;
}

const ResourceUtilization: React.FC = () => {
  // Sample data for demonstration
  const [resources, setResources] = useState<Resource[]>([
    {
      id: 'RES-001',
      name: 'John Smith',
      type: 'Personnel',
      utilization: 85,
      allocation: 3,
      availability: 15,
      cost: 75,
      costUnit: 'hour',
      department: 'Engineering'
    },
    {
      id: 'RES-002',
      name: 'Sarah Johnson',
      type: 'Personnel',
      utilization: 90,
      allocation: 4,
      availability: 10,
      cost: 80,
      costUnit: 'hour',
      department: 'Engineering'
    },
    {
      id: 'RES-003',
      name: 'David Lee',
      type: 'Personnel',
      utilization: 60,
      allocation: 2,
      availability: 40,
      cost: 70,
      costUnit: 'hour',
      department: 'Quality Assurance'
    },
    {
      id: 'RES-004',
      name: 'Environmental Chamber',
      type: 'Equipment',
      utilization: 70,
      allocation: 2,
      availability: 30,
      cost: 250,
      costUnit: 'day',
      location: 'Lab B'
    },
    {
      id: 'RES-005',
      name: 'Vibration Table',
      type: 'Equipment',
      utilization: 50,
      allocation: 1,
      availability: 50,
      cost: 300,
      costUnit: 'day',
      location: 'Lab A'
    },
    {
      id: 'RES-006',
      name: 'Main Test Facility',
      type: 'Facility',
      utilization: 85,
      allocation: 5,
      availability: 15,
      cost: 1500,
      costUnit: 'day',
      location: 'Building 3'
    },
    {
      id: 'RES-007',
      name: 'Simulation Software License',
      type: 'Software',
      utilization: 40,
      allocation: 2,
      availability: 60,
      cost: 500,
      costUnit: 'month'
    },
    {
      id: 'RES-008',
      name: 'Calibration Service',
      type: 'Service',
      utilization: 20,
      allocation: 1,
      availability: 80,
      cost: 1200,
      costUnit: 'unit'
    },
    {
      id: 'RES-009',
      name: 'Emily Chen',
      type: 'Personnel',
      utilization: 75,
      allocation: 3,
      availability: 25,
      cost: 75,
      costUnit: 'hour',
      department: 'Engineering'
    },
    {
      id: 'RES-010',
      name: 'Secondary Test Facility',
      type: 'Facility',
      utilization: 30,
      allocation: 1,
      availability: 70,
      cost: 1200,
      costUnit: 'day',
      location: 'Building 2'
    }
  ]);

  // Historical usage data
  const [usageData, setUsageData] = useState<ResourceUsage[]>([
    { month: 'Jan', personnel: 70, equipment: 55, facility: 65, software: 45, service: 20 },
    { month: 'Feb', personnel: 75, equipment: 60, facility: 70, software: 50, service: 25 },
    { month: 'Mar', personnel: 80, equipment: 65, facility: 75, software: 40, service: 20 },
    { month: 'Apr', personnel: 85, equipment: 60, facility: 80, software: 45, service: 15 },
    { month: 'May', personnel: 90, equipment: 70, facility: 85, software: 50, service: 10 },
    { month: 'Jun', personnel: 85, equipment: 75, facility: 80, software: 55, service: 20 }
  ]);

  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [utilizationFilter, setUtilizationFilter] = useState<string | null>(null);

  // Filter resources based on search term and filters
  const filteredResources = resources.filter(resource => {
    // Filter by search term (name or ID)
    const matchesSearch = 
      searchTerm === '' || 
      resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by resource type
    const matchesType = typeFilter === null || resource.type === typeFilter;
    
    // Filter by utilization level
    let matchesUtilization = true;
    if (utilizationFilter !== null) {
      switch(utilizationFilter) {
        case 'low':
          matchesUtilization = resource.utilization < 50;
          break;
        case 'medium':
          matchesUtilization = resource.utilization >= 50 && resource.utilization < 75;
          break;
        case 'high':
          matchesUtilization = resource.utilization >= 75;
          break;
      }
    }
    
    return matchesSearch && matchesType && matchesUtilization;
  });
  
  // Calculate resource metrics
  const totalResources = resources.length;
  const overutilizedResources = resources.filter(r => r.utilization > 85).length;
  const underutilizedResources = resources.filter(r => r.utilization < 30).length;
  
  // Calculate average utilization by type
  const calculateAverageUtilization = (type: string) => {
    const typeResources = resources.filter(r => r.type === type);
    if (typeResources.length === 0) return 0;
    
    const sum = typeResources.reduce((total, resource) => total + resource.utilization, 0);
    return Math.round(sum / typeResources.length);
  };
  
  const personnelUtilization = calculateAverageUtilization('Personnel');
  const equipmentUtilization = calculateAverageUtilization('Equipment');
  const facilityUtilization = calculateAverageUtilization('Facility');
  
  // Helper function to get utilization color
  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 85) return 'bg-red-500';
    if (utilization >= 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  // Helper function to get resource type icon
  const getResourceTypeIcon = (type: string) => {
    switch (type) {
      case 'Personnel':
        return <FaUsers className="text-blue-500" />;
      case 'Equipment':
        return <FaTools className="text-green-500" />;
      case 'Facility':
        return <FaBuilding className="text-purple-500" />;
      case 'Software':
        return <FaChartLine className="text-indigo-500" />;
      case 'Service':
        return <FaCalendarAlt className="text-orange-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Resource Utilization</h1>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Total Resources</h2>
            <div className="text-3xl font-bold text-blue-600">{totalResources}</div>
            <div className="mt-2 text-sm text-gray-500">
              Across all resource types
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Personnel Utilization</h2>
            <div className="text-3xl font-bold text-blue-600">{personnelUtilization}%</div>
            <div className="mt-2 text-sm text-gray-500">
              Average across all personnel
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Equipment Utilization</h2>
            <div className="text-3xl font-bold text-green-600">{equipmentUtilization}%</div>
            <div className="mt-2 text-sm text-gray-500">
              Average across all equipment
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Facility Utilization</h2>
            <div className="text-3xl font-bold text-purple-600">{facilityUtilization}%</div>
            <div className="mt-2 text-sm text-gray-500">
              Average across all facilities
            </div>
          </div>
        </div>
        
        {/* Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-start">
              <div className="p-3 bg-red-100 rounded-full mr-4">
                <FaChartLine className="text-red-500" />
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-1">Over-utilized Resources</h2>
                <div className="text-3xl font-bold text-red-600 mb-2">{overutilizedResources}</div>
                <p className="text-sm text-gray-600">
                  {overutilizedResources > 0 
                    ? `${Math.round((overutilizedResources / totalResources) * 100)}% of resources are over-utilized (>85%)`
                    : 'No resources are currently over-utilized'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-start">
              <div className="p-3 bg-green-100 rounded-full mr-4">
                <FaChartLine className="text-green-500" />
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-1">Under-utilized Resources</h2>
                <div className="text-3xl font-bold text-green-600 mb-2">{underutilizedResources}</div>
                <p className="text-sm text-gray-600">
                  {underutilizedResources > 0 
                    ? `${Math.round((underutilizedResources / totalResources) * 100)}% of resources are under-utilized (<30%)`
                    : 'No resources are currently under-utilized'}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Resource Utilization Trends */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Utilization Trends</h2>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-md flex items-center text-sm">
              <FaDownload className="mr-2" /> Export
            </button>
          </div>
          
          <div className="relative">
            <div className="flex justify-between mb-2">
              {usageData.map(data => (
                <div key={data.month} className="text-xs text-gray-500 font-medium">{data.month}</div>
              ))}
            </div>
            
            {/* Personnel Trend */}
            <div className="mb-6">
              <div className="flex items-center mb-1">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm font-medium">Personnel</span>
              </div>
              <div className="h-8 bg-gray-100 rounded-lg overflow-hidden flex">
                {usageData.map((data, index) => (
                  <div 
                    key={`personnel-${index}`}
                    className="h-full bg-blue-500 border-r border-gray-100"
                    style={{ width: `${100 / usageData.length}%`, opacity: data.personnel / 100 }}
                  ></div>
                ))}
              </div>
            </div>
            
            {/* Equipment Trend */}
            <div className="mb-6">
              <div className="flex items-center mb-1">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm font-medium">Equipment</span>
              </div>
              <div className="h-8 bg-gray-100 rounded-lg overflow-hidden flex">
                {usageData.map((data, index) => (
                  <div 
                    key={`equipment-${index}`}
                    className="h-full bg-green-500 border-r border-gray-100"
                    style={{ width: `${100 / usageData.length}%`, opacity: data.equipment / 100 }}
                  ></div>
                ))}
              </div>
            </div>
            
            {/* Facility Trend */}
            <div className="mb-6">
              <div className="flex items-center mb-1">
                <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                <span className="text-sm font-medium">Facilities</span>
              </div>
              <div className="h-8 bg-gray-100 rounded-lg overflow-hidden flex">
                {usageData.map((data, index) => (
                  <div 
                    key={`facility-${index}`}
                    className="h-full bg-purple-500 border-r border-gray-100"
                    style={{ width: `${100 / usageData.length}%`, opacity: data.facility / 100 }}
                  ></div>
                ))}
              </div>
            </div>
            
            {/* Software Trend */}
            <div className="mb-6">
              <div className="flex items-center mb-1">
                <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
                <span className="text-sm font-medium">Software</span>
              </div>
              <div className="h-8 bg-gray-100 rounded-lg overflow-hidden flex">
                {usageData.map((data, index) => (
                  <div 
                    key={`software-${index}`}
                    className="h-full bg-indigo-500 border-r border-gray-100"
                    style={{ width: `${100 / usageData.length}%`, opacity: data.software / 100 }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Resource List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Resource Details</h2>
            <div className="flex space-x-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
                Add Resource
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm">
                <FaDownload className="inline mr-1" /> Export
              </button>
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-grow">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="absolute left-3 top-2.5 text-gray-400">
                  <FaSearch />
                </span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                className="border border-gray-300 rounded-md p-2 w-full"
                value={typeFilter || ''}
                onChange={(e) => setTypeFilter(e.target.value === '' ? null : e.target.value)}
              >
                <option value="">All Types</option>
                <option value="Personnel">Personnel</option>
                <option value="Equipment">Equipment</option>
                <option value="Facility">Facility</option>
                <option value="Software">Software</option>
                <option value="Service">Service</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Utilization</label>
              <select
                className="border border-gray-300 rounded-md p-2 w-full"
                value={utilizationFilter || ''}
                onChange={(e) => setUtilizationFilter(e.target.value === '' ? null : e.target.value)}
              >
                <option value="">All Levels</option>
                <option value="low">Low (&lt;50%)</option>
                <option value="medium">Medium (50-75%)</option>
                <option value="high">High (&gt;75%)</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center text-sm h-10"
                onClick={() => {
                  setSearchTerm('');
                  setTypeFilter(null);
                  setUtilizationFilter(null);
                }}
              >
                <FaFilter className="mr-2" /> Reset
              </button>
            </div>
          </div>
          
          {/* Resource Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResources.map(resource => (
              <div key={resource.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex items-center mb-2">
                    <div className="p-2 rounded-full bg-gray-100 mr-3">
                      {getResourceTypeIcon(resource.type)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{resource.name}</h3>
                      <div className="text-xs text-gray-500">{resource.id}</div>
                    </div>
                  </div>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                    {resource.type}
                  </span>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Utilization</span>
                    <span className="font-medium">{resource.utilization}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getUtilizationColor(resource.utilization)}`}
                      style={{ width: `${resource.utilization}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Allocation</span>
                    <div className="font-medium">{resource.allocation} activities</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Availability</span>
                    <div className="font-medium">{resource.availability}%</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Cost</span>
                    <div className="font-medium">
                      ${resource.cost}/{resource.costUnit}
                    </div>
                  </div>
                  <div>
                    {resource.department && (
                      <>
                        <span className="text-gray-500">Department</span>
                        <div className="font-medium">{resource.department}</div>
                      </>
                    )}
                    {resource.location && (
                      <>
                        <span className="text-gray-500">Location</span>
                        <div className="font-medium">{resource.location}</div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredResources.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No resources match your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceUtilization; 