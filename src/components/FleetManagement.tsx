import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Aircraft, Base } from '../types';
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';
import * as MdIcons from 'react-icons/md';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, Area, ReferenceLine } from 'recharts';
import AircraftSchematic from './AircraftSchematic';
import AircraftMap from './AircraftMap';
import { AircraftHealth } from './AircraftHealth';
import { mockBases } from '../mockData';

interface FleetManagementProps {
  aircraft: Aircraft[];
}

const FleetManagement: React.FC<FleetManagementProps> = ({ aircraft }) => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'aircraft' | 'location' | 'health' | 'maintenance'>('overview');
  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('tailNumber');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBase, setSelectedBase] = useState<string | null>(null);

  // Filter and sort aircraft
  const filteredAircraft = aircraft
    .filter(a => !filterStatus || a.status === filterStatus)
    .filter(a => !selectedBase || a.baseId === selectedBase)
    .filter(a => a.tailNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
                a.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                a.location.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'tailNumber') return a.tailNumber.localeCompare(b.tailNumber);
      if (sortBy === 'status') return a.status.localeCompare(b.status);
      if (sortBy === 'model') return a.model.localeCompare(b.model);
      if (sortBy === 'flightHours') {
        if (b.flightHours && a.flightHours) {
          return b.flightHours - a.flightHours;
        }
        return 0;
      }
      if (sortBy === 'lastMaintenance') {
        if (b.lastMaintenance && a.lastMaintenance) {
          return new Date(b.lastMaintenance).getTime() - new Date(a.lastMaintenance).getTime();
        }
        return 0;
      }
      return 0;
    });

  // Generate statistics for operational metrics graph
  const maintenanceData = aircraft.map(a => ({
    name: a.tailNumber,
    hours: a.flightHours,
    nextMaintenance: a.flightHoursUntilMaintenance,
    maintenanceRatio: (a.flightHours && a.flightHoursUntilMaintenance) ? 
      (a.flightHours / (a.flightHours + a.flightHoursUntilMaintenance)) * 100 : 0
  }));

  // Update the fleet summary calculation
  const calculateFleetSummary = () => {
    const totalAircraft = aircraft.length;
    const available = aircraft.filter(a => a.status === 'Operational').length;
    const inMission = aircraft.filter(a => a.status === 'In Mission').length;
    const operational = available + inMission; // Combined operational count
    const inMaintenance = totalAircraft - operational;
    const averageFlightHours = aircraft.reduce((sum, a) => sum + (a.flightHours || 0), 0) / totalAircraft;
    const fleetAge = aircraft.reduce((sum, a) => sum + (a.age || 0), 0) / totalAircraft;

    return {
      total: totalAircraft,
      available,
      inMission,
      operational,
      inMaintenance,
      avgFlightHours: Math.round(averageFlightHours),
      avgAge: Math.round(fleetAge * 10) / 10
    };
  };

  // Mission readiness over time (simulated data)
  const readinessData = [
    { month: 'Jan', readiness: 92 },
    { month: 'Feb', readiness: 89 },
    { month: 'Mar', readiness: 87 },
    { month: 'Apr', readiness: 91 },
    { month: 'May', readiness: 94 },
    { month: 'Jun', readiness: 96 },
    { month: 'Jul', readiness: 93 },
    { month: 'Aug', readiness: 88 },
  ];

  // Add base summary stats
  const getBaseSummary = (baseId: string) => {
    const baseAircraft = aircraft.filter(a => a.baseId === baseId);
    return {
      total: baseAircraft.length,
      operational: baseAircraft.filter(a => a.status === 'Operational').length,
      inMaintenance: baseAircraft.filter(a => a.status.includes('Maintenance')).length,
      inMission: baseAircraft.filter(a => a.status === 'In Mission').length
    };
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'overview':
        const stats = calculateFleetSummary();
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Fleet Summary Section */}
            <div className="col-span-1 bg-white p-4 rounded-lg border border-gray-200 shadow">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <FaIcons.FaPlaneArrival className="mr-2 text-blue-400" /> Fleet Summary
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Total Aircraft</span>
                  <span className="font-bold text-lg">{stats.total}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Operational</span>
                  <span className="font-bold text-lg text-green-400">{stats.operational}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2 pl-4">
                  <span className="text-gray-500">└ Available</span>
                  <span className="font-bold text-lg text-green-400">{stats.available}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2 pl-4">
                  <span className="text-gray-500">└ In Mission</span>
                  <span className="font-bold text-lg text-blue-400">{stats.inMission}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="text-gray-500">In Maintenance</span>
                  <span className="font-bold text-lg text-yellow-400">{stats.inMaintenance}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Avg. Flight Hours</span>
                  <span className="font-bold text-lg">{stats.avgFlightHours}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Fleet Age (Avg. Years)</span>
                  <span className="font-bold text-lg">{stats.avgAge}</span>
                </div>
              </div>
            </div>
            
            {/* Fleet Readiness Trend - Now takes 2 columns */}
            <div className="col-span-2 bg-white p-6 rounded-lg border border-gray-200 shadow">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <BiIcons.BiTrendingUp className="mr-2 text-blue-500" /> Fleet Readiness Trend
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart 
                    data={readinessData} 
                    margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
                  >
                    <defs>
                      <linearGradient id="readinessGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke="#E5E7EB" 
                      vertical={false}
                    />
                    <XAxis 
                      dataKey="month"
                      stroke="#6B7280"
                      tick={{ fill: '#6B7280', fontSize: 13 }}
                      tickLine={{ stroke: '#6B7280' }}
                      axisLine={{ stroke: '#E5E7EB' }}
                      padding={{ left: 10, right: 10 }}
                    />
                    <YAxis 
                      domain={[75, 100]}
                      stroke="#6B7280"
                      tick={{ fill: '#6B7280', fontSize: 13 }}
                      tickLine={{ stroke: '#6B7280' }}
                      axisLine={{ stroke: '#E5E7EB' }}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.98)',
                        borderRadius: '8px',
                        border: '1px solid #E5E7EB',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        padding: '12px'
                      }}
                      formatter={(value: number) => [`${value}%`, 'Readiness']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="readiness"
                      stroke="none"
                      fill="url(#readinessGradient)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="readiness"
                      stroke="#3B82F6"
                      strokeWidth={3}
                      dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 8, strokeWidth: 2 }}
                    />
                    <ReferenceLine 
                      y={90} 
                      stroke="#10B981" 
                      strokeDasharray="3 3"
                      strokeWidth={4}
                      label={{ 
                        value: 'Target Readiness (90%)', 
                        position: 'right',
                        fill: '#10B981',
                        fontSize: 13,
                        fontWeight: 600
                      }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-gray-600 flex items-center justify-center bg-gray-50 p-3 rounded-lg">
                <span className="inline-flex items-center">
                  <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                  Current Readiness: {readinessData[readinessData.length - 1].readiness}%
                </span>
                <span className="mx-6 text-gray-300">|</span>
                <span className="inline-flex items-center">
                  <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                  Target: 90%
                </span>
              </div>
            </div>
            
            {/* Maintenance Hours Chart */}
            <div className="col-span-3 bg-white p-6 rounded-lg border border-gray-200 shadow">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <FaIcons.FaTools className="mr-2 text-blue-400" /> Flight Hours vs. Next Maintenance
              </h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={maintenanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '4px' }}
                      itemStyle={{ color: '#E5E7EB' }}
                      labelStyle={{ color: '#E5E7EB' }}
                    />
                    <Legend />
                    <Bar dataKey="hours" name="Flight Hours" fill="#3B82F6" />
                    <Bar dataKey="nextMaintenance" name="Hours Until Maintenance" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );
        
      case 'aircraft':
        return (
          <div className="space-y-6">
            {/* Search and filter controls */}
            <div className="flex flex-wrap gap-4 justify-between items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search aircraft..."
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg pl-10 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaIcons.FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
              
              <div className="flex gap-4">
                <select 
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filterStatus || ''}
                  onChange={(e) => setFilterStatus(e.target.value || null)}
                >
                  <option value="">All Statuses</option>
                  <option value="Operational">Operational</option>
                  <option value="In Mission">In Mission</option>
                  <option value="Diagnosing">Diagnosing</option>
                  <option value="Repair in Progress">Repair in Progress</option>
                  <option value="Parts on Order">Parts on Order</option>
                </select>
                
                <select 
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="tailNumber">Sort by Tail Number</option>
                  <option value="status">Sort by Status</option>
                  <option value="model">Sort by Model</option>
                  <option value="flightHours">Sort by Flight Hours</option>
                  <option value="lastMaintenance">Sort by Last Maintenance</option>
                </select>
              </div>
            </div>
            
            {/* Aircraft list */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase w-32">Tail Number</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase w-24">Model</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase w-32">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase w-32">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase w-40">Last Maintenance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase w-24">Flight Hours</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase w-52">Next Maintenance</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase w-28">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAircraft.map(aircraft => (
                    <tr key={aircraft.id}>
                      <td className="px-6 py-4">{aircraft.tailNumber}</td>
                      <td className="px-6 py-4">{aircraft.model}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          aircraft.status === 'Operational' ? 'bg-green-100 text-green-800' :
                          aircraft.status === 'In Mission' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {aircraft.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">{aircraft.location}</td>
                      <td className="px-6 py-4">
                        {aircraft.lastMaintenance 
                          ? new Date(aircraft.lastMaintenance).toLocaleDateString() 
                          : 'Not available'}
                      </td>
                      <td className="px-6 py-4">{aircraft.flightHours}</td>
                      <td className="px-6 py-4">
                        {renderMaintenanceBar(aircraft.flightHoursUntilMaintenance || 0)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center space-x-2">
                          <button className="text-blue-500 hover:text-blue-700">
                            <FaIcons.FaEye />
                          </button>
                          <button className="text-green-500 hover:text-green-700">
                            <FaIcons.FaEdit />
                          </button>
                          <button className="text-yellow-500 hover:text-yellow-700">
                            <FaIcons.FaHistory />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Selected Aircraft Detail */}
            {selectedAircraft && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 bg-white p-6 rounded-lg border border-gray-200 shadow"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-4">{selectedAircraft.tailNumber} - {selectedAircraft.model}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Status:</span>
                      <span className={`
                        ${selectedAircraft.status === 'Operational' ? 'text-green-400' :
                          selectedAircraft.status === 'In Mission' ? 'text-blue-400' :
                          'text-yellow-400'
                        }
                      `}>{selectedAircraft.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Location:</span>
                      <span>{selectedAircraft.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Age:</span>
                      <span>{selectedAircraft.age} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Flight Hours:</span>
                      <span>{selectedAircraft.flightHours} hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Last Maintenance:</span>
                      <span>
                        {selectedAircraft.lastMaintenance 
                          ? new Date(selectedAircraft.lastMaintenance).toLocaleDateString() 
                          : 'Not available'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Hours Until Maintenance:</span>
                      <span>{selectedAircraft.flightHoursUntilMaintenance || 0} hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Mission Capable:</span>
                      <span className={selectedAircraft.missionCapable ? 'text-green-400' : 'text-red-400'}>
                        {selectedAircraft.missionCapable ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold mb-2">Current Systems Errors</h4>
                    {selectedAircraft.errors.length > 0 ? (
                      <div className="space-y-2">
                        {selectedAircraft.errors.map((error, index) => (
                          <div key={index} className={`
                            p-3 rounded-lg
                            ${error.severity === 'Critical' ? 'bg-red-100 border border-red-300' :
                              error.severity === 'Warning' ? 'bg-yellow-100 border border-yellow-300' :
                              'bg-gray-200'
                            }
                          `}>
                            <div className="flex items-center">
                              {error.severity === 'Critical' ? 
                                <FaIcons.FaExclamationTriangle className="text-red-400 mr-2" /> :
                                <FaIcons.FaExclamationCircle className="text-yellow-400 mr-2" />
                              }
                              <span className="font-medium">{error.system} - {error.component}</span>
                            </div>
                            <p className="mt-1 text-sm text-gray-700">{error.description}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-green-400">No active system errors</div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-4">Aircraft Schematic</h4>
                  <AircraftSchematic errors={selectedAircraft.errors} aircraftType={selectedAircraft.model} />
                  
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold mb-2">Upcoming Missions</h4>
                    {selectedAircraft.missions.length > 0 ? (
                      <div className="space-y-3">
                        {selectedAircraft.missions.slice(0, 3).map((mission, index) => (
                          <div key={index} className="flex items-center p-3 bg-gray-200 rounded-lg">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                              <FaIcons.FaPlane />
                            </div>
                            <div>
                              <h5 className="font-medium">{mission.title}</h5>
                              <p className="text-sm text-gray-700">
                                {mission.date ? new Date(mission.date).toLocaleDateString() : 'TBD'} • {mission.duration || 'N/A'} hours
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-500">No upcoming missions</div>
                    )}
                  </div>
                  
                  <div className="mt-6 flex gap-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                      <BiIcons.BiPrinter className="mr-2" /> Print Report
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
                      <FaIcons.FaTools className="mr-2" /> Schedule Maintenance
                    </button>
                    <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center">
                      <FaIcons.FaEdit className="mr-2" /> Edit Details
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        );
      
      case 'location':
        return (
          <div className="space-y-2">
            {/* Search and filter controls */}
            <div className="flex flex-wrap gap-4 justify-between items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search aircraft..."
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg pl-10 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaIcons.FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
              
              <div className="flex gap-4">
                <select 
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filterStatus || ''}
                  onChange={(e) => setFilterStatus(e.target.value || null)}
                >
                  <option value="">All Statuses</option>
                  <option value="Operational">Operational</option>
                  <option value="In Mission">In Mission</option>
                  <option value="Diagnosing">Diagnosing</option>
                  <option value="Repair in Progress">Repair in Progress</option>
                  <option value="Parts on Order">Parts on Order</option>
                </select>
              </div>
            </div>

            {/* Map View - doubled the height */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden h-[800px]">
              <AircraftMap aircraft={filteredAircraft} />
            </div>

            {/* Aircraft List */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tail Number</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Model</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredAircraft.map((a) => (
                    <tr key={a.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{a.tailNumber}</td>
                      <td className="px-6 py-4">{a.model}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          a.status === 'Operational' ? 'bg-green-100 text-green-800' :
                          a.status === 'In Mission' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {a.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">{a.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      
      case 'health':
        return <AircraftHealth aircraft={aircraft} />;
      
      case 'maintenance':
        return (
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-6">Fleet Maintenance Schedule</h3>
            <p>Maintenance schedule calendar and planning tools would go here...</p>
            <div className="mt-4 text-gray-500">Maintenance scheduling features are under development</div>
          </div>
        );
        
      default:
        return <div>Tab not found</div>;
    }
  };

  // Update the maintenance bar rendering function
  const renderMaintenanceBar = (hours: number) => {
    const percentage = Math.min((hours / 1000) * 100, 100); // Convert to percentage, max 100%
    
    return (
      <div className="flex items-center w-full max-w-[200px]"> {/* Container with max width */}
        <div className="flex-grow bg-gray-200 rounded-full h-2 mr-2"> {/* Progress bar container */}
          <div
            className="bg-green-500 h-full rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-sm text-gray-600 w-16 flex-shrink-0 text-right">{hours}h</span>
      </div>
    );
  };

  // Update the table container styling
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center">
          <FaIcons.FaPlaneArrival className="mr-2 text-blue-400" /> Fleet Management
        </h2>
        
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
            <FaIcons.FaPlus className="mr-2" /> Add Aircraft
          </button>
          <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 flex items-center">
            <FaIcons.FaDownload className="mr-2" /> Export Data
          </button>
        </div>
      </div>
      
      <div className="border-b border-gray-200 mb-6">
        <button 
          className={`py-2 px-4 ${selectedTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setSelectedTab('overview')}
        >
          <MdIcons.MdDashboard className="inline-block mr-2" /> Overview
        </button>
        <button 
          className={`py-2 px-4 ${selectedTab === 'aircraft' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setSelectedTab('aircraft')}
        >
          <FaIcons.FaPlane className="inline-block mr-2" /> Aircraft Inventory
        </button>
        <button 
          className={`py-2 px-4 ${selectedTab === 'location' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setSelectedTab('location')}
        >
          <FaIcons.FaMapMarkerAlt className="inline-block mr-2" /> Aircraft Location
        </button>
        <button 
          className={`py-2 px-4 ${selectedTab === 'health' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setSelectedTab('health')}
        >
          <FaIcons.FaHeartbeat className="inline-block mr-2" /> Aircraft Health
        </button>
        <button 
          className={`py-2 px-4 ${selectedTab === 'maintenance' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setSelectedTab('maintenance')}
        >
          <FaIcons.FaTools className="inline-block mr-2" /> Maintenance Schedule
        </button>
      </div>
      
      <div className="p-6">
        {/* Add base filter dropdown */}
        <div className="mb-4">
          <select
            value={selectedBase || ''}
            onChange={(e) => setSelectedBase(e.target.value || null)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="">All Bases</option>
            {mockBases.map(base => (
              <option key={base.id} value={base.id}>
                {base.name} ({base.code})
              </option>
            ))}
          </select>
        </div>

        {/* Base Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {mockBases.map(base => {
            const summary = getBaseSummary(base.id);
            return (
              <motion.div
                key={base.id}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-lg font-medium mb-2">{base.name}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Total Aircraft</p>
                    <p className="text-xl font-semibold">{summary.total}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Operational</p>
                    <p className="text-xl font-semibold text-green-600">{summary.operational}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">In Maintenance</p>
                    <p className="text-xl font-semibold text-yellow-600">{summary.inMaintenance}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">In Mission</p>
                    <p className="text-xl font-semibold text-blue-600">{summary.inMission}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {renderTabContent()}
      </div>
    </div>
  );
};

export default FleetManagement; 