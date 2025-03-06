import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as MdIcons from 'react-icons/md';

// Interface for flight test
interface FlightTest {
  id: string;
  name: string;
  description: string;
  aircraft: string;
  location: string;
  status: 'Planned' | 'Approved' | 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  startDate: string | null;
  endDate: string | null;
  duration: string;
  requirements: string[];
  flightCrew: string[];
  testConditions: {
    weatherRequirements: string;
    timeOfDay: 'Day' | 'Night' | 'Both';
    minAltitude: number;
    maxAltitude: number;
  };
  telemetryAvailable: boolean;
  attachments: string[];
}

const FlightTests: React.FC = () => {
  // Sample flight tests data
  const [tests] = useState<FlightTest[]>([
    {
      id: 'FT-001',
      name: 'Initial Flight Envelope Expansion',
      description: 'First flight test to verify basic flight envelope parameters.',
      aircraft: 'Test Aircraft 001',
      location: 'Edwards Air Force Base',
      status: 'Completed',
      priority: 'Critical',
      startDate: '2023-03-15',
      endDate: '2023-03-15',
      duration: '2.5 hours',
      requirements: ['REQ-FLT-001', 'REQ-FLT-002', 'REQ-FLT-003'],
      flightCrew: ['Capt. John Anderson (Pilot)', 'Lt. Sarah Chen (Co-Pilot)', 'Dr. Robert Johnson (Test Engineer)'],
      testConditions: {
        weatherRequirements: 'Clear skies, winds <15 knots',
        timeOfDay: 'Day',
        minAltitude: 1000,
        maxAltitude: 25000
      },
      telemetryAvailable: true,
      attachments: ['flight_plan.pdf', 'test_cards.pdf', 'preflight_checklist.pdf']
    },
    {
      id: 'FT-002',
      name: 'High-Speed Performance Testing',
      description: 'Evaluate aircraft performance at high speeds and various altitudes.',
      aircraft: 'Test Aircraft 002',
      location: 'Naval Air Station Patuxent River',
      status: 'Scheduled',
      priority: 'High',
      startDate: '2023-05-20',
      endDate: null,
      duration: '3 hours',
      requirements: ['REQ-FLT-005', 'REQ-FLT-006', 'REQ-PERF-001'],
      flightCrew: ['Maj. David Miller (Pilot)', 'Capt. James Wilson (Co-Pilot)', 'Dr. Emily Davis (Test Engineer)'],
      testConditions: {
        weatherRequirements: 'Clear skies, winds <10 knots, visibility >10 miles',
        timeOfDay: 'Day',
        minAltitude: 5000,
        maxAltitude: 40000
      },
      telemetryAvailable: true,
      attachments: ['flight_plan.pdf', 'test_matrix.xlsx']
    },
    {
      id: 'FT-003',
      name: 'Night Operations Qualification',
      description: 'Qualification testing for night operations capabilities.',
      aircraft: 'Test Aircraft 001',
      location: 'Edwards Air Force Base',
      status: 'Planned',
      priority: 'Medium',
      startDate: null,
      endDate: null,
      duration: '4 hours',
      requirements: ['REQ-FLT-010', 'REQ-NVG-001', 'REQ-NVG-002'],
      flightCrew: ['Capt. John Anderson (Pilot)', 'Lt. Sarah Chen (Co-Pilot)', 'Lt. Michael Brown (Test Engineer)'],
      testConditions: {
        weatherRequirements: 'Clear skies, winds <8 knots, no moon required',
        timeOfDay: 'Night',
        minAltitude: 1000,
        maxAltitude: 20000
      },
      telemetryAvailable: true,
      attachments: ['night_operations_plan.pdf']
    },
    {
      id: 'FT-004',
      name: 'Weather Radar System Testing',
      description: 'Evaluation of the weather radar system in various atmospheric conditions.',
      aircraft: 'Test Aircraft 003',
      location: 'Florida Test Range',
      status: 'In Progress',
      priority: 'High',
      startDate: '2023-05-05',
      endDate: null,
      duration: '6 hours',
      requirements: ['REQ-WX-001', 'REQ-WX-002', 'REQ-WX-003'],
      flightCrew: ['Maj. Lisa Wong (Pilot)', 'Capt. Thomas Garcia (Co-Pilot)', 'Dr. Jennifer Smith (Systems Engineer)'],
      testConditions: {
        weatherRequirements: 'Variable conditions with clouds and precipitation',
        timeOfDay: 'Both',
        minAltitude: 2000,
        maxAltitude: 35000
      },
      telemetryAvailable: true,
      attachments: ['weather_radar_test_plan.pdf', 'data_collection_sheet.xlsx']
    }
  ]);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  
  // Filter the tests based on search term and status
  const filteredTests = tests.filter(test => {
    const matchesSearch = 
      test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.aircraft.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || test.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Helper function for status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Planned': return 'bg-gray-100 text-gray-800';
      case 'Approved': return 'bg-indigo-100 text-indigo-800';
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
        <h2 className="text-2xl font-bold mb-4 sm:mb-0">Flight Tests</h2>
        <div className="flex space-x-2">
          <div className="bg-gray-100 rounded-lg p-1">
            <button
              className={`px-3 py-1 rounded-md ${viewMode === 'card' ? 'bg-white shadow-sm' : ''}`}
              onClick={() => setViewMode('card')}
              title="Card View"
            >
              <MdIcons.MdDashboard />
            </button>
            <button
              className={`px-3 py-1 rounded-md ${viewMode === 'table' ? 'bg-white shadow-sm' : ''}`}
              onClick={() => setViewMode('table')}
              title="Table View"
            >
              <FaIcons.FaTable />
            </button>
          </div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
            onClick={() => { /* Add new test functionality */ }}
          >
            <FaIcons.FaPlus className="mr-2" />
            Add Flight Test
          </button>
        </div>
      </div>

      {/* Search and filter */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search flight tests..."
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
            <option value="Approved">Approved</option>
            <option value="Scheduled">Scheduled</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Stats summary */}
      <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="text-blue-800 text-lg font-semibold">{tests.length}</div>
          <div className="text-blue-600 text-sm">Total Flight Tests</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <div className="text-green-800 text-lg font-semibold">
            {tests.filter(t => t.status === 'Completed').length}
          </div>
          <div className="text-green-600 text-sm">Completed</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
          <div className="text-yellow-800 text-lg font-semibold">
            {tests.filter(t => t.status === 'In Progress').length}
          </div>
          <div className="text-yellow-600 text-sm">In Progress</div>
        </div>
        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
          <div className="text-indigo-800 text-lg font-semibold">
            {tests.filter(t => ['Planned', 'Approved', 'Scheduled'].includes(t.status)).length}
          </div>
          <div className="text-indigo-600 text-sm">Upcoming</div>
        </div>
      </div>

      {/* Flight tests display */}
      {viewMode === 'card' ? (
        // Card view
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
                    <span className="font-medium">Aircraft:</span> {test.aircraft}
                  </div>
                  
                  <div className="text-sm mb-2">
                    <span className="font-medium">Location:</span> {test.location}
                  </div>
                  
                  <div className="text-sm mb-2">
                    <span className="font-medium">Date:</span> {test.startDate || 'TBD'} {test.endDate ? `to ${test.endDate}` : ''}
                  </div>
                  
                  <div className="text-sm mb-2">
                    <span className="font-medium">Duration:</span> {test.duration}
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {test.requirements.map((req, index) => (
                      <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                        {req}
                      </span>
                    ))}
                  </div>
                  
                  <div className="text-sm mb-3">
                    <span className="font-medium">Weather:</span> {test.testConditions.weatherRequirements}
                  </div>
                  
                  <div className="text-sm flex justify-between items-center mb-3">
                    <div>
                      <span className="font-medium">Time:</span> {test.testConditions.timeOfDay}
                    </div>
                    <div>
                      <span className="font-medium">Altitude:</span> {test.testConditions.minAltitude}-{test.testConditions.maxAltitude} ft
                    </div>
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
              <p>No flight tests found matching your filters.</p>
            </div>
          )}
        </div>
      ) : (
        // Table view
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-3 px-4 text-left font-medium text-gray-600">ID</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Name</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Aircraft</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Location</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Status</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Date</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTests.length > 0 ? (
                filteredTests.map(test => (
                  <tr key={test.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{test.id}</td>
                    <td className="py-3 px-4">
                      <div className="font-medium">{test.name}</div>
                      <div className="text-xs text-gray-500">{test.description.substring(0, 60)}...</div>
                    </td>
                    <td className="py-3 px-4">{test.aircraft}</td>
                    <td className="py-3 px-4">{test.location}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(test.status)}`}>
                        {test.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{test.startDate || 'TBD'}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800" title="View Details">
                          <FaIcons.FaEye />
                        </button>
                        <button className="text-green-600 hover:text-green-800" title="Edit">
                          <FaIcons.FaEdit />
                        </button>
                        <button className="text-red-600 hover:text-red-800" title="Delete">
                          <FaIcons.FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500">
                    No flight tests found matching the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FlightTests; 