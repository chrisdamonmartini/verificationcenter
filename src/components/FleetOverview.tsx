import React from 'react';
import { Aircraft } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Area, ReferenceLine } from 'recharts';
import { format, subMonths } from 'date-fns';
import { motion } from 'framer-motion';
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';
import AircraftMap from './AircraftMap';

interface FleetOverviewProps {
  aircraft: Aircraft[];
  onSelectAircraft: (aircraft: Aircraft) => void;
}

// Generate historical readiness data
const generateReadinessData = () => {
  const months = 12;
  return Array.from({ length: months }).map((_, i) => {
    const date = subMonths(new Date(), months - 1 - i);
    const baseValue = 85 + Math.sin(i * 0.5) * 10;
    
    return {
      month: format(date, 'MMM'),
      'Mission Readiness %': Math.min(100, baseValue + Math.random() * 5),
      'Operational Rate %': Math.min(100, baseValue - 2 + Math.cos(i * 0.5) * 8),
      'Maintenance Efficiency %': Math.min(100, baseValue + 5 + Math.sin(i * 0.7) * 5),
    };
  });
};

// Generate flight hours data
const generateFlightHoursData = (aircraft: Aircraft[]) => {
  return aircraft.map(a => ({
    tailNumber: a.tailNumber,
    'Flight Hours': Math.floor(Math.random() * 200 + 800),
    'Hours Until Maintenance': Math.floor(Math.random() * 100 + 100),
    Status: a.status
  }));
};

// Calculate fleet summary stats
const calculateFleetSummary = (aircraft: Aircraft[]) => {
  const total = aircraft.length;
  const available = aircraft.filter(a => a.status === 'Operational').length;
  const inMission = aircraft.filter(a => a.status === 'In Mission').length;
  const operational = available + inMission; // Combined operational count
  const inMaintenance = total - operational;
  const avgFlightHours = aircraft.reduce((sum, a) => sum + (a.flightHours || 0), 0) / total;
  const avgAge = aircraft.reduce((sum, a) => sum + (a.age || 0), 0) / total;

  return {
    total,
    available,
    inMission,
    operational,
    inMaintenance,
    avgFlightHours: Math.round(avgFlightHours),
    avgAge: Math.round(avgAge * 10) / 10
  };
};

const FleetOverview: React.FC<FleetOverviewProps> = ({ aircraft, onSelectAircraft }) => {
  const readinessData = generateReadinessData();
  const flightHoursData = generateFlightHoursData(aircraft);

  const stats = calculateFleetSummary(aircraft);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Operational': return 'bg-green-500';
      case 'In Mission': return 'bg-blue-700';
      case 'Diagnosing':
      case 'Fault Isolating': return 'bg-yellow-500';
      case 'Parts on Order':
      case 'Repair in Progress': return 'bg-orange-700';
      case 'Repair Complete':
      case 'Safe for Flight': return 'bg-green-400';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityIndicator = (aircraft: Aircraft) => {
    const criticalCount = aircraft.errors.filter(e => e.severity === 'Critical').length;
    const warningCount = aircraft.errors.filter(e => e.severity === 'Warning').length;
    
    if (criticalCount > 0) {
      return { color: 'bg-red-500', count: criticalCount };
    } else if (warningCount > 0) {
      return { color: 'bg-yellow-500', count: warningCount };
    }
    return { color: 'bg-green-500', count: 0 };
  };

  // Custom legend for the pie chart
  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex justify-center mt-4 space-x-4">
        {payload.map((entry: any, index: number) => (
          <div key={`legend-${index}`} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-1" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Fleet Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Total Aircraft */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-4xl font-bold text-gray-800">{stats.total}</div>
              <div className="text-gray-500">Total Aircraft</div>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg">
              <FaIcons.FaPlane className="text-blue-500 text-xl" />
            </div>
          </div>
        </div>

        {/* Operational Status */}
        <div className="md:col-span-2 bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-4xl font-bold text-green-600">{stats.operational}</div>
              <div className="text-gray-600">Operational</div>
            </div>
            <div className="flex space-x-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <FaIcons.FaCheckCircle className="text-green-500 text-xl" />
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <FaIcons.FaPlaneDeparture className="text-blue-500 text-xl" />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4 mt-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm text-gray-600">{stats.available} Available</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-sm text-gray-600">{stats.inMission} In Mission</span>
            </div>
          </div>
          <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-blue-500"
              style={{ width: `${(stats.operational / stats.total) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Maintenance Status */}
        <div className="bg-yellow-50 p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-4xl font-bold text-yellow-600">{stats.inMaintenance}</div>
              <div className="text-gray-600">In Maintenance</div>
            </div>
            <div className="p-2 bg-yellow-100 rounded-lg">
              <FaIcons.FaTools className="text-yellow-600 text-xl" />
            </div>
          </div>
          <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-yellow-500"
              style={{ width: `${(stats.inMaintenance / stats.total) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Fleet Metrics */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-600 text-sm">Avg. Flight Hours</span>
                <span className="text-purple-600 font-semibold">{stats.avgFlightHours}</span>
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-500"
                  style={{ width: `${(stats.avgFlightHours / 2000) * 100}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-600 text-sm">Fleet Age (Years)</span>
                <span className="text-blue-600 font-semibold">{stats.avgAge}</span>
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500"
                  style={{ width: `${(stats.avgAge / 10) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fleet Readiness Trend Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6 w-full">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <span className="text-blue-500 mr-2">📈</span> Fleet Readiness Trend
        </h2>
        <div className="h-[250px]"> {/* Reduced height */}
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
                horizontal={true}
                vertical={false}
              />
              <XAxis 
                dataKey="month" 
                stroke="#6B7280"
                tick={{ fill: '#6B7280', fontSize: 12 }}
                tickLine={{ stroke: '#6B7280' }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis 
                domain={[75, 100]}
                stroke="#6B7280"
                tick={{ fill: '#6B7280', fontSize: 12 }}
                tickLine={{ stroke: '#6B7280' }}
                axisLine={{ stroke: '#E5E7EB' }}
                tickFormatter={(value) => `${value}%`}
                width={40}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.98)',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  padding: '8px'
                }}
                formatter={(value: number) => [`${value}%`, 'Readiness']}
              />
              <Area 
                type="monotone" 
                dataKey="Mission Readiness %"
                stroke="none"
                fill="url(#readinessGradient)"
              />
              <Line 
                type="monotone" 
                dataKey="Mission Readiness %"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 8, strokeWidth: 2 }}
              />
              <ReferenceLine 
                y={90} 
                stroke="#10B981" 
                strokeDasharray="3 3"
                strokeWidth={2}
                label={{ 
                  value: 'Target (90%)', 
                  position: 'right',
                  fill: '#10B981',
                  fontSize: 12,
                  fontWeight: 500
                }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="flex items-center space-x-6">
            <span className="inline-flex items-center">
              <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
              Current: {readinessData[readinessData.length - 1]['Mission Readiness %'].toFixed(1)}%
            </span>
            <span className="inline-flex items-center">
              <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
              Target: 90%
            </span>
          </div>
          <div className="text-gray-500">
            <span className={`font-medium ${
              readinessData[readinessData.length - 1]['Mission Readiness %'] >= 90 
                ? 'text-green-600' 
                : 'text-yellow-600'
            }`}>
              {readinessData[readinessData.length - 1]['Mission Readiness %'] >= 90 
                ? '✓ Meeting Target' 
                : '! Below Target'}
            </span>
          </div>
        </div>
      </div>

      {/* Flight Hours vs. Maintenance Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <span className="text-blue-500 mr-2">🔧</span> Flight Hours vs. Next Maintenance
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={flightHoursData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="tailNumber" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Flight Hours" fill="#3B82F6" />
              <Bar dataKey="Hours Until Maintenance" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4 flex items-center mt-8 text-gray-900">
        <FaIcons.FaPlane className="mr-2" /> Aircraft Status
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aircraft.map(aircraft => {
          const severity = getSeverityIndicator(aircraft);
          const statusColor = getStatusColor(aircraft.status);
          
          return (
            <motion.div 
              key={aircraft.id}
              whileHover={{ y: -5 }}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
              onClick={() => onSelectAircraft(aircraft)}
            >
              {/* Status Bar */}
              <div className={`${statusColor} h-2 w-full`} />
              
              {/* Card Content */}
              <div className="p-5">
                {/* Top Row - Alerts and Status */}
                <div className="flex justify-between items-center mb-4">
                  {/* Critical/Warning Alerts */}
                  <div className="flex-1">
                    {severity.count > 0 ? (
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold ${
                        severity.color === 'bg-red-500' 
                          ? 'bg-red-100 text-red-800 border border-red-300' 
                          : 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                      }`}>
                        {severity.color === 'bg-red-500' ? (
                          <FaIcons.FaExclamationTriangle className="mr-1.5" />
                        ) : (
                          <FaIcons.FaExclamationCircle className="mr-1.5" />
                        )}
                        {severity.count} {severity.color === 'bg-red-500' ? 'Critical' : 'Warning'}
                      </span>
                    ) : (
                      <span className="invisible">No Issues</span> /* Placeholder for alignment */
                    )}
                  </div>

                  {/* Status Badge */}
                  <span className={`px-3 py-1.5 rounded-full text-sm font-bold ${
                    aircraft.status === 'Operational' ? 'bg-green-100 text-green-800 border border-green-300' :
                    aircraft.status === 'In Mission' ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                    aircraft.status === 'Diagnosing' ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' :
                    aircraft.status === 'Parts on Order' ? 'bg-orange-100 text-orange-800 border border-orange-300' :
                    'bg-red-100 text-red-800 border border-red-300'
                  }`}>
                    {aircraft.status}
                  </span>
                </div>

                {/* Mission Capable Status */}
                <div className="mb-4">
                  <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold w-full justify-center ${
                    aircraft.missionCapable 
                      ? "bg-green-100 text-green-800 border border-green-300" 
                      : "bg-red-100 text-red-800 border border-red-300"
                  }`}>
                    <span className={`w-2 h-2 rounded-full mr-2 ${
                      aircraft.missionCapable ? "bg-green-500" : "bg-red-500"
                    }`}></span>
                    {aircraft.missionCapable ? "Mission Capable" : "Not Mission Capable"}
                  </span>
                </div>

                {/* Aircraft Info */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{aircraft.tailNumber}</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-gray-600 font-medium">{aircraft.model}</span>
                    <span className="mx-2">•</span>
                    <span className="text-gray-500">{aircraft.location}</span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500 h-5">Flight Hours</div>
                    <div className="text-lg font-semibold">{aircraft.flightHours}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500 h-5">Next Maintenance</div>
                    <div className="text-lg font-semibold">{aircraft.flightHoursUntilMaintenance}h</div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AircraftMap aircraft={aircraft} />
    </div>
  );
};

export default FleetOverview; 