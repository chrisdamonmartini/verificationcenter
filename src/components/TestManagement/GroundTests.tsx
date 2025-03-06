import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

// Interface for ground test
interface GroundTest {
  id: string;
  name: string;
  description: string;
  facility: string;
  equipment: string[];
  status: 'Planned' | 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  startDate: string | null;
  endDate: string | null;
  duration: string;
  requirements: string[];
  testProcedure: string;
  testTeam: string[];
}

const GroundTests: React.FC = () => {
  // Sample ground tests data
  const [tests] = useState<GroundTest[]>([
    {
      id: 'GT-001',
      name: 'Power System Ground Test',
      description: 'Comprehensive testing of the power system in a controlled environment.',
      facility: 'Power Systems Test Lab',
      equipment: ['Power Supply Unit', 'Load Bank', 'Data Acquisition System'],
      status: 'Completed',
      priority: 'High',
      startDate: '2023-04-15',
      endDate: '2023-04-18',
      duration: '3 days',
      requirements: ['REQ-PWR-001', 'REQ-PWR-002', 'REQ-PWR-005'],
      testProcedure: 'TP-PWR-GT-001',
      testTeam: ['John Smith', 'Sarah Williams', 'Robert Johnson']
    },
    {
      id: 'GT-002',
      name: 'Propulsion System Static Fire',
      description: 'Static fire test of the propulsion system with all components integrated.',
      facility: 'Propulsion Test Stand',
      equipment: ['Control System', 'Fuel Tank', 'Thrust Measurement', 'High-Speed Cameras'],
      status: 'Scheduled',
      priority: 'Critical',
      startDate: '2023-05-10',
      endDate: null,
      duration: '1 day',
      requirements: ['REQ-PRO-001', 'REQ-PRO-003', 'REQ-PRO-004'],
      testProcedure: 'TP-PRO-GT-002',
      testTeam: ['Emily Davis', 'Mike Chen', 'Jessica Brown']
    },
    {
      id: 'GT-003',
      name: 'Environmental Control System Test',
      description: 'Testing of the environmental control system under various conditions.',
      facility: 'Environmental Test Chamber',
      equipment: ['Temperature Controller', 'Humidity Generator', 'Air Quality Monitors'],
      status: 'In Progress',
      priority: 'Medium',
      startDate: '2023-04-28',
      endDate: null,
      duration: '5 days',
      requirements: ['REQ-ECS-002', 'REQ-ECS-003'],
      testProcedure: 'TP-ECS-GT-003',
      testTeam: ['David Miller', 'Lisa Wong']
    }
  ]);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Filter the tests based on search term and status
  const filteredTests = tests.filter(test => {
    const matchesSearch = 
      test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || test.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Helper function for status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Planned': return 'bg-gray-100 text-gray-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold mb-4 sm:mb-0">Ground Tests</h2>
        <div className="flex space-x-2">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
            onClick={() => { /* Add new test functionality */ }}
          >
            <FaIcons.FaPlus className="mr-2" />
            Add Test
          </button>
        </div>
      </div>

      {/* Search and filter */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search ground tests..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute right-3 top-2 text-gray-400">
              <FaIcons.FaSearch />
            </span>
          </div>
        </div>
        <div>
          <select
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Planned">Planned</option>
            <option value="Scheduled">Scheduled</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Ground tests list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTests.length > 0 ? (
          filteredTests.map(test => (
            <div key={test.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow">
              <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
                <div>
                  <span className="font-bold">{test.id}</span>
                  <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${getStatusBadge(test.status)}`}>
                    {test.status}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <FaIcons.FaEdit title="Edit" />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <FaIcons.FaTrash title="Delete" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{test.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{test.description}</p>
                
                <div className="text-sm mb-2">
                  <span className="font-medium">Facility:</span> {test.facility}
                </div>
                
                <div className="text-sm mb-2">
                  <span className="font-medium">Date:</span> {test.startDate || 'TBD'} {test.endDate ? `to ${test.endDate}` : ''}
                </div>
                
                <div className="text-sm mb-2">
                  <span className="font-medium">Duration:</span> {test.duration}
                </div>
                
                <div className="text-sm mb-3">
                  <span className="font-medium">Team:</span> {test.testTeam.join(', ')}
                </div>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {test.requirements.map((req, index) => (
                    <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                      {req}
                    </span>
                  ))}
                </div>
                
                <button className="w-full mt-2 py-2 text-center border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white">
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-8 text-gray-500">
            <AiIcons.AiOutlineInbox className="text-6xl mx-auto mb-4" />
            <p>No ground tests found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroundTests; 