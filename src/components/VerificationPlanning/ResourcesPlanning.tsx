import React, { useState } from 'react';
import { FaSearch, FaEdit, FaPlus, FaFilter, FaCalendarAlt, FaUserAlt, FaTools, FaChartBar, FaBuilding, FaLaptopCode, FaHandshake, FaTag } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Define interfaces for our resources planning data
interface Resource {
  id: string;
  name: string;
  type: 'Personnel' | 'Facility' | 'Equipment' | 'Software' | 'Service';
  category: string;
  availability: number; // Percentage
  capacity: number;
  capacityUnit: string;
  cost: number;
  costUnit: 'Hour' | 'Day' | 'Week' | 'Month' | 'Year' | 'Unit';
  location: string;
  description: string;
  tags: string[];
  skills?: string[];
  certifications?: string[];
  restrictions?: string[];
  notes: string;
}

interface ResourceAllocation {
  id: string;
  resourceId: string;
  activityId: string;
  activityName: string;
  startDate: string;
  endDate: string;
  allocation: number; // Percentage of resource allocated
  status: 'Planned' | 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  notes: string;
}

const ResourcesPlanning: React.FC = () => {
  // Sample data for demonstration
  const [resources, setResources] = useState<Resource[]>([
    {
      id: 'RES-001',
      name: 'John Smith',
      type: 'Personnel',
      category: 'Test Engineer',
      availability: 80,
      capacity: 40,
      capacityUnit: 'Hours/Week',
      cost: 85,
      costUnit: 'Hour',
      location: 'Main Office',
      description: 'Senior test engineer with expertise in avionics systems',
      tags: ['Avionics', 'Integration', 'Test Planning'],
      skills: ['Test Planning', 'ARINC-429', 'MIL-STD-1553', 'DO-178C'],
      certifications: ['FAA Part 107', 'DO-178C Level A'],
      notes: 'Scheduled vacation in July'
    },
    {
      id: 'RES-002',
      name: 'Environmental Test Chamber',
      type: 'Equipment',
      category: 'Test Equipment',
      availability: 60,
      capacity: 1,
      capacityUnit: 'Unit',
      cost: 500,
      costUnit: 'Day',
      location: 'Lab 3',
      description: 'Thermal/vacuum chamber for environmental testing',
      tags: ['Environmental', 'Thermal', 'Vacuum'],
      restrictions: ['Requires 2-day setup', 'Maximum size 2m x 2m x 2m'],
      notes: 'Scheduled maintenance first week of each month'
    },
    {
      id: 'RES-003',
      name: 'Integration Laboratory',
      type: 'Facility',
      category: 'Test Facility',
      availability: 90,
      capacity: 3,
      capacityUnit: 'Test Stations',
      cost: 1200,
      costUnit: 'Day',
      location: 'Building B',
      description: 'Main integration laboratory with test stations and support equipment',
      tags: ['Integration', 'System Test', 'Hardware'],
      restrictions: ['24-hour advance booking required', 'No classified activities'],
      notes: 'New test station being installed next month'
    },
    {
      id: 'RES-004',
      name: 'MATLAB License',
      type: 'Software',
      category: 'Analysis Tool',
      availability: 100,
      capacity: 5,
      capacityUnit: 'Concurrent Users',
      cost: 2000,
      costUnit: 'Month',
      location: 'Network',
      description: 'MATLAB with Simulink, Signal Processing, and Aerospace Toolboxes',
      tags: ['Analysis', 'Modeling', 'Simulation'],
      notes: 'License renewal in December'
    },
    {
      id: 'RES-005',
      name: 'EMI/EMC Testing',
      type: 'Service',
      category: 'External Test',
      availability: 50,
      capacity: 1,
      capacityUnit: 'Test Campaign',
      cost: 15000,
      costUnit: 'Unit',
      location: 'Vendor Facility',
      description: 'External vendor providing EMI/EMC qualification testing',
      tags: ['EMI', 'EMC', 'Qualification'],
      restrictions: ['4-week lead time', 'Requires test plan approval'],
      notes: 'Contract renewal in progress'
    },
    {
      id: 'RES-006',
      name: 'Sarah Johnson',
      type: 'Personnel',
      category: 'Systems Engineer',
      availability: 70,
      capacity: 40,
      capacityUnit: 'Hours/Week',
      cost: 90,
      costUnit: 'Hour',
      location: 'Main Office',
      description: 'Systems engineer specializing in requirements verification',
      tags: ['Requirements', 'Systems Engineering', 'Verification'],
      skills: ['Requirements Management', 'DOORS', 'Verification Planning'],
      certifications: ['INCOSE CSEP'],
      notes: 'Also supporting Program B at 30% time'
    }
  ]);

  const [allocations, setAllocations] = useState<ResourceAllocation[]>([
    {
      id: 'ALLOC-001',
      resourceId: 'RES-001',
      activityId: 'act-4',
      activityName: 'Critical Design Analysis',
      startDate: '2023-04-01',
      endDate: '2023-05-15',
      allocation: 50,
      status: 'In Progress',
      priority: 'High',
      notes: 'Focusing on avionics subsystem analysis'
    },
    {
      id: 'ALLOC-002',
      resourceId: 'RES-003',
      activityId: 'act-5',
      activityName: 'Structural Test Planning',
      startDate: '2023-05-01',
      endDate: '2023-05-30',
      allocation: 25,
      status: 'Planned',
      priority: 'Medium',
      notes: 'Need Test Station 2 for setup preparation'
    },
    {
      id: 'ALLOC-003',
      resourceId: 'RES-002',
      activityId: 'act-5',
      activityName: 'Structural Test Planning',
      startDate: '2023-06-01',
      endDate: '2023-06-15',
      allocation: 100,
      status: 'Planned',
      priority: 'High',
      notes: 'Full chamber reservation for structural thermal testing'
    },
    {
      id: 'ALLOC-004',
      resourceId: 'RES-004',
      activityId: 'act-4',
      activityName: 'Critical Design Analysis',
      startDate: '2023-04-01',
      endDate: '2023-05-15',
      allocation: 40,
      status: 'In Progress',
      priority: 'Medium',
      notes: 'Thermal modeling and simulation'
    },
    {
      id: 'ALLOC-005',
      resourceId: 'RES-006',
      activityId: 'act-4',
      activityName: 'Critical Design Analysis',
      startDate: '2023-04-15',
      endDate: '2023-05-15',
      allocation: 30,
      status: 'In Progress',
      priority: 'Medium',
      notes: 'Requirements verification planning'
    }
  ]);
  
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [activeTab, setActiveTab] = useState<'resources' | 'allocations'>('resources');

  // Helper functions for UI
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Personnel': return <FaUserAlt className="text-blue-500" />;
      case 'Equipment': return <FaTools className="text-yellow-500" />;
      case 'Facility': return <FaBuilding className="text-green-500" />;
      case 'Software': return <FaLaptopCode className="text-purple-500" />;
      case 'Service': return <FaHandshake className="text-red-500" />;
      default: return <FaTools className="text-gray-500" />;
    }
  };

  const getAvailabilityColor = (availability: number) => {
    if (availability >= 80) return 'bg-green-100 text-green-800';
    if (availability >= 50) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  // Filter resources based on search and filter criteria
  const filteredResources = resources.filter(resource => {
    return (
      (searchTerm === '' || 
        resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      ) &&
      (typeFilter === null || resource.type === typeFilter) &&
      (categoryFilter === null || resource.category === categoryFilter)
    );
  });

  // Get unique categories for the filter dropdown
  const uniqueCategories = Array.from(new Set(resources.map(resource => resource.category)));

  const handleSelectResource = (resource: Resource) => {
    setSelectedResource(resource);
  };

  const handleCloseResourceDetail = () => {
    setSelectedResource(null);
  };

  return (
    <div className="bg-gray-50 p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Resources Planning</h1>
        
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Resource Management</h2>
          <p className="text-gray-700 mb-4">
            Plan and manage resources required for verification activities. This includes personnel, facilities, 
            equipment, software, and services needed to complete verification tasks.
          </p>
          
          {/* Resource Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 flex flex-col items-center justify-center">
              <FaChartBar className="text-3xl text-blue-600 mb-2" />
              <div className="text-xl font-semibold">{resources.length}</div>
              <div className="text-sm text-gray-600">Total Resources</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200 flex flex-col items-center justify-center">
              <FaUserAlt className="text-3xl text-green-600 mb-2" />
              <div className="text-xl font-semibold">{resources.filter(r => r.type === 'Personnel').length}</div>
              <div className="text-sm text-gray-600">Personnel</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 flex flex-col items-center justify-center">
              <FaTools className="text-3xl text-yellow-600 mb-2" />
              <div className="text-xl font-semibold">{resources.filter(r => r.type === 'Equipment' || r.type === 'Facility').length}</div>
              <div className="text-sm text-gray-600">Equipment & Facilities</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 flex flex-col items-center justify-center">
              <FaCalendarAlt className="text-3xl text-purple-600 mb-2" />
              <div className="text-xl font-semibold">{allocations.length}</div>
              <div className="text-sm text-gray-600">Allocations</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200 flex flex-col items-center justify-center">
              <div className="text-xl font-semibold">
                ${resources.reduce((total, resource) => {
                  // Calculate monthly cost for all resources
                  let monthlyCost = 0;
                  switch (resource.costUnit) {
                    case 'Hour': monthlyCost = resource.cost * 160; break; // 40 hours/week * 4 weeks
                    case 'Day': monthlyCost = resource.cost * 20; break; // 20 working days/month
                    case 'Week': monthlyCost = resource.cost * 4; break; // 4 weeks/month
                    case 'Month': monthlyCost = resource.cost; break;
                    case 'Year': monthlyCost = resource.cost / 12; break;
                    case 'Unit': monthlyCost = resource.cost / 12; break; // Amortize over a year
                  }
                  return total + monthlyCost;
                }, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Monthly Cost</div>
            </div>
          </div>
        </div>

        {/* Tabs for Resources and Allocations */}
        <div className="mb-4">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'resources'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('resources')}
              >
                Resources
              </button>
              <button
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'allocations'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('allocations')}
              >
                Allocations
              </button>
            </nav>
          </div>
        </div>

        {/* Resources List */}
        {activeTab === 'resources' && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h2 className="text-xl font-semibold mb-2 md:mb-0">Resource List</h2>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search resources..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full md:w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <span className="absolute left-3 top-2.5 text-gray-400">
                    <FaSearch />
                  </span>
                </div>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
                >
                  <FaPlus className="mr-2" /> Add Resource
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  className="border border-gray-300 rounded-md p-2 w-full text-sm"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  className="border border-gray-300 rounded-md p-2 w-full text-sm"
                  value={categoryFilter || ''}
                  onChange={(e) => setCategoryFilter(e.target.value === '' ? null : e.target.value)}
                >
                  <option value="">All Categories</option>
                  {uniqueCategories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button 
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-md flex items-center text-sm transition-colors"
                  onClick={() => {
                    setSearchTerm('');
                    setTypeFilter(null);
                    setCategoryFilter(null);
                  }}
                >
                  <FaFilter className="mr-2" /> Reset Filters
                </button>
              </div>
            </div>

            {/* Resource Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.length > 0 ? (
                filteredResources.map((resource) => (
                  <div 
                    key={resource.id}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
                    onClick={() => handleSelectResource(resource)}
                  >
                    <div className="p-5">
                      <div className="flex items-start justify-between">
                        <div className="flex">
                          <div className="mr-3 mt-1">{getTypeIcon(resource.type)}</div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{resource.name}</h3>
                            <p className="text-sm text-gray-500">{resource.id} • {resource.category}</p>
                          </div>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(resource.availability)}`}>
                          {resource.availability}% Available
                        </div>
                      </div>
                      
                      <p className="mt-3 text-sm text-gray-600 line-clamp-2">{resource.description}</p>
                      
                      <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-500">
                        <div>
                          <span className="font-medium">Capacity:</span> {resource.capacity} {resource.capacityUnit}
                        </div>
                        <div>
                          <span className="font-medium">Location:</span> {resource.location}
                        </div>
                        <div>
                          <span className="font-medium">Cost:</span> ${resource.cost}/{resource.costUnit}
                        </div>
                        <div>
                          <span className="font-medium">Allocations:</span> {
                            allocations.filter(a => a.resourceId === resource.id).length
                          }
                        </div>
                      </div>
                      
                      <div className="mt-4 flex flex-wrap gap-1">
                        {resource.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                            <FaTag className="mr-1 text-gray-400" size={10} />
                            {tag}
                          </span>
                        ))}
                        {resource.tags.length > 3 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                            +{resource.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 p-6 text-center">
                  <p className="text-gray-500">No resources found matching the criteria.</p>
                </div>
              )}
            </div>

            {/* Resource Count Summary */}
            <div className="mt-6 flex items-center text-sm text-gray-700">
              Showing <span className="font-medium mx-1">{filteredResources.length}</span> of <span className="font-medium mx-1">{resources.length}</span> resources
            </div>
          </div>
        )}

        {/* Allocations Tab Content */}
        {activeTab === 'allocations' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Resource Allocations</h2>
            <p className="text-gray-600">The allocations view will be implemented in the next phase.</p>
          </div>
        )}
        
        {/* Add Resource Button */}
        <div className="fixed bottom-8 right-8">
          <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-colors">
            <FaPlus className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPlanning; 