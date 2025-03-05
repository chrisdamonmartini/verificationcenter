import React, { useState, useMemo } from 'react';
import { Mission, Repair, Technician } from '../types';
import { format, subDays, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, ComposedChart
} from 'recharts';
import * as FaIcons from 'react-icons/fa';
import { motion } from 'framer-motion';

// Add Aircraft type if not already defined in types.ts
interface Aircraft {
  id: string;
  tailNumber: string;
  model: string;
  status: 'mission-ready' | 'maintenance' | 'pending-inspection' | 'grounded';
  lastInspection?: Date;
  type?: string;
  location?: string;
}

// Extended repair type for the reports functionality
interface RepairWithReportFields extends Omit<Repair, 'aircraftId'> {
  aircraftId?: string;
  dateReported?: Date | string;
  completionDate?: Date | string;
  priority?: 'low' | 'medium' | 'high';
  estimatedDuration?: number;
  actualDuration?: number;
  maintenanceType?: 'scheduled' | 'unscheduled' | 'inspection' | 'aog';
}

interface ReportsProps {
  missions: Mission[];
  repairs: Repair[];
  technicians: Technician[];
  aircraft?: Aircraft[];
}

interface FilterState {
  startDate: Date | null;
  endDate: Date | null;
  aircraftType: string;
  location: string;
  maintenanceType: string;
}

// Mission types and their baseline durations
const MISSION_TYPES = {
  SHORT: { min: 4, max: 8, probability: 0.3 },
  MEDIUM: { min: 24, max: 36, probability: 0.5 },
  LONG: { min: 48, max: 72, probability: 0.2 }
};

// Mock data generation functions
const generateMockMaintenanceData = (days: number) => {
  const data = [];
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = subDays(now, i);
    data.push({
      week: format(date, 'MMM d'),
      repairs: Math.floor(Math.random() * 8) + 2, // 2-10 repairs
      mttr: Math.round((Math.random() * 24 + 12) * 10) / 10, // 12-36 hours with one decimal
    });
  }
  return data;
};

const generateMockMissionData = (days: number) => {
  const data = [];
  const now = new Date();
  
  // Create a more realistic pattern with different mission types
  for (let i = days; i >= 0; i--) {
    const date = subDays(now, i);
    
    // Determine mission type based on probabilities
    const rand = Math.random();
    let missionType;
    if (rand < MISSION_TYPES.SHORT.probability) {
      missionType = MISSION_TYPES.SHORT;
    } else if (rand < MISSION_TYPES.SHORT.probability + MISSION_TYPES.MEDIUM.probability) {
      missionType = MISSION_TYPES.MEDIUM;
    } else {
      missionType = MISSION_TYPES.LONG;
    }

    // Add weekly pattern - fewer missions on weekends
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    // Generate base duration within mission type range
    const baseDuration = missionType.min + Math.random() * (missionType.max - missionType.min);
    
    // Add seasonal variation (more activity in spring/summer)
    const month = date.getMonth(); // 0-11
    const seasonalFactor = 1 + Math.sin((month / 12) * 2 * Math.PI) * 0.15; // ±15% seasonal variation

    // Add weather impact (random variation)
    const weatherImpact = Math.random() * 0.2 - 0.1; // ±10% weather variation

    // Calculate final duration with all factors
    let duration = baseDuration * seasonalFactor * (1 + weatherImpact);
    
    // Reduce duration on weekends
    if (isWeekend) {
      duration *= 0.7; // 30% reduction on weekends
    }

    // Round to 1 decimal place
    duration = Math.round(duration * 10) / 10;

    // Add some gaps in data to simulate no-mission days
    const hasMission = Math.random() > (isWeekend ? 0.5 : 0.1); // More likely to have gaps on weekends

    if (hasMission) {
      data.push({
        date: format(date, 'MMM d'),
        duration,
        type: Object.keys(MISSION_TYPES)[
          Object.values(MISSION_TYPES).indexOf(missionType)
        ].toLowerCase()
      });
    }
  }

  return data;
};

const generateMockCriticalIssues = (days: number) => {
  const data = [];
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = subDays(now, i);
    // Generate more critical issues every 7 days to simulate maintenance cycles
    const baseIssues = Math.floor(Math.random() * 3); // 0-2 base issues
    const cyclicalIssues = i % 7 === 0 ? Math.floor(Math.random() * 3) : 0; // Additional issues every week
    
    data.push({
      week: format(date, 'MMM d'),
      criticalIssues: baseIssues + cyclicalIssues,
    });
  }
  return data;
};

const generateMockMaintenanceTypes = () => {
  return [
    { name: 'Scheduled', value: Math.floor(Math.random() * 20) + 30 }, // 30-50
    { name: 'Unscheduled', value: Math.floor(Math.random() * 15) + 15 }, // 15-30
    { name: 'Inspection', value: Math.floor(Math.random() * 10) + 10 }, // 10-20
    { name: 'AOG', value: Math.floor(Math.random() * 5) + 1 }, // 1-6
  ];
};

const Reports: React.FC<ReportsProps> = ({ 
  missions = [], 
  repairs = [], 
  technicians = [], 
  aircraft = []
}) => {
  // Enhanced filter state
  const [filters, setFilters] = useState<FilterState>({
    startDate: null,
    endDate: null,
    aircraftType: 'all',
    location: 'all',
    maintenanceType: 'all'
  });

  // Get unique values for filters
  const aircraftTypes = useMemo(() => {
    const types = new Set(aircraft.map(a => a.type || 'Unknown'));
    return ['all', ...Array.from(types)];
  }, [aircraft]);

  const locations = useMemo(() => {
    const locs = new Set(aircraft.map(a => a.location || 'Unknown'));
    return ['all', ...Array.from(locs)];
  }, [aircraft]);

  const maintenanceTypes = ['all', 'scheduled', 'unscheduled', 'inspection', 'aog'];

  // Filter data based on all criteria
  const filteredData = useMemo(() => {
    let filteredMissions = missions;
    let filteredRepairs = repairs as RepairWithReportFields[];
    let filteredAircraft = aircraft;

    // Date range filtering
    if (filters.startDate && filters.endDate) {
      filteredMissions = missions.filter(mission => {
        if (!mission.startTime) return false;
        const missionDate = new Date(mission.startTime);
        return isWithinInterval(missionDate, {
          start: filters.startDate!,
          end: filters.endDate!
        });
      });

      filteredRepairs = filteredRepairs.filter(repair => {
        if (!repair.dateReported) return false;
        const repairDate = new Date(repair.dateReported);
        return isWithinInterval(repairDate, {
          start: filters.startDate!,
          end: filters.endDate!
        });
      });
    }

    // Aircraft type filtering
    if (filters.aircraftType !== 'all') {
      filteredAircraft = aircraft.filter(a => a.type === filters.aircraftType);
      const aircraftIds = new Set(filteredAircraft.map(a => a.id));
      filteredRepairs = filteredRepairs.filter(r => r.aircraftId && aircraftIds.has(r.aircraftId));
    }

    // Location filtering
    if (filters.location !== 'all') {
      filteredAircraft = filteredAircraft.filter(a => a.location === filters.location);
      const aircraftIds = new Set(filteredAircraft.map(a => a.id));
      filteredRepairs = filteredRepairs.filter(r => r.aircraftId && aircraftIds.has(r.aircraftId));
    }

    // Maintenance type filtering
    if (filters.maintenanceType !== 'all') {
      filteredRepairs = filteredRepairs.filter(r => 
        r.maintenanceType === filters.maintenanceType
      );
    }

    return {
      missions: filteredMissions,
      repairs: filteredRepairs,
      aircraft: filteredAircraft
    };
  }, [missions, repairs, aircraft, filters]);

  // Calculate metrics based on filtered data
  const metrics = useMemo(() => {
    const { missions: filteredMissions, repairs: filteredRepairs, aircraft: filteredAircraft } = filteredData;

    // Basic metrics
    const totalMissions = filteredMissions.length;
    const totalRepairs = filteredRepairs.length;
    const averageMissionDuration = totalMissions > 0
      ? (filteredMissions.reduce((sum, mission) => sum + (mission.duration || 0), 0) / totalMissions)
      : 0;

    // Personnel metrics
    const personnelUtilization = technicians.length > 0
      ? (technicians.filter(tech => !tech.available).length / technicians.length) * 100
      : 0;

    // Aircraft status metrics
    const missionReadyCount = filteredAircraft.filter(a => a.status === 'mission-ready').length;
    const inMaintenanceCount = filteredAircraft.filter(a => a.status === 'maintenance').length;
    const pendingInspectionCount = filteredAircraft.filter(a => a.status === 'pending-inspection').length;
    const groundedCount = filteredAircraft.filter(a => a.status === 'grounded').length;

    // Fleet readiness
    const fleetReadinessPercentage = filteredAircraft.length > 0
      ? (missionReadyCount / filteredAircraft.length) * 100
      : 0;

    // Maintenance efficiency metrics
    const completedRepairs = filteredRepairs.filter(repair => repair.completionDate);
    const mttr = completedRepairs.length > 0 
      ? completedRepairs.reduce((sum, repair) => {
          if (!repair.dateReported || !repair.completionDate) return sum;
          const start = new Date(repair.dateReported);
          const end = new Date(repair.completionDate);
          const durationHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
          return sum + (durationHours > 0 ? durationHours : 0);
        }, 0) / completedRepairs.length
      : 0;

    // Repair efficiency
    const repairEfficiency = completedRepairs.length > 0
      ? completedRepairs.reduce((sum, repair) => {
          if (!repair.estimatedDuration || !repair.actualDuration) return sum;
          return sum + (repair.estimatedDuration / repair.actualDuration);
        }, 0) / completedRepairs.length * 100
      : 0;

    // Critical issues
    const criticalIssuesCount = filteredRepairs.filter(
      repair => repair.priority === 'high' && !repair.completionDate
    ).length;

    return {
      totalMissions,
      totalRepairs,
      averageMissionDuration,
      personnelUtilization,
      missionReadyCount,
      inMaintenanceCount,
      pendingInspectionCount,
      groundedCount,
      fleetReadinessPercentage,
      mttr,
      repairEfficiency,
      criticalIssuesCount,
      completionRate: totalRepairs > 0 
        ? (completedRepairs.length / totalRepairs) * 100 
        : 0
    };
  }, [filteredData, technicians]);

  // Prepare chart data with mock data
  const chartData = useMemo(() => {
    const { missions: filteredMissions, repairs: filteredRepairs } = filteredData;

    // Use mock data if no real data is available
    const missionData = filteredMissions.length > 0
      ? filteredMissions.map(mission => ({
          date: mission.startTime ? format(new Date(mission.startTime), 'MMM d') : 'TBD',
          duration: mission.duration || 0,
        }))
      : generateMockMissionData(30); // Generate 30 days of mock mission data

    // Generate mock maintenance trends data
    const weeklyData = generateMockMaintenanceData(90); // Generate 90 days of maintenance data

    // Generate mock maintenance type distribution
    const maintenanceTypeData = generateMockMaintenanceTypes();

    // Generate mock critical issues data
    const criticalIssuesData = generateMockCriticalIssues(90);

    return {
      missionData,
      maintenanceTypeData,
      weeklyData,
      criticalIssuesData
    };
  }, [filteredData]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center text-gray-900">
          <FaIcons.FaChartLine className="mr-2" /> Reports
        </h2>

        {/* Export buttons */}
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            <FaIcons.FaFileExcel className="inline mr-2" />
            Export Excel
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            <FaIcons.FaFilePdf className="inline mr-2" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 bg-gray-50 p-4 rounded-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={filters.startDate?.toISOString().split('T')[0] || ''}
            onChange={(e) => {
              const date = e.target.value ? new Date(e.target.value) : null;
              setFilters(prev => ({ ...prev, startDate: date }));
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={filters.endDate?.toISOString().split('T')[0] || ''}
            onChange={(e) => {
              const date = e.target.value ? new Date(e.target.value) : null;
              setFilters(prev => ({ ...prev, endDate: date }));
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Aircraft Type</label>
          <select
            className="w-full p-2 border rounded"
            value={filters.aircraftType}
            onChange={(e) => setFilters(prev => ({ ...prev, aircraftType: e.target.value }))}
          >
            {aircraftTypes.map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <select
            className="w-full p-2 border rounded"
            value={filters.location}
            onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
          >
            {locations.map(location => (
              <option key={location} value={location}>
                {location.charAt(0).toUpperCase() + location.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-blue-700 p-4 rounded-lg text-center shadow-md"
        >
          <div className="text-3xl font-bold text-white">{metrics.totalMissions}</div>
          <div className="text-sm text-blue-100">Total Missions</div>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-green-700 p-4 rounded-lg text-center shadow-md"
        >
          <div className="text-3xl font-bold text-white">{metrics.totalRepairs}</div>
          <div className="text-sm text-green-100">Total Repairs</div>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-yellow-700 p-4 rounded-lg text-center shadow-md"
        >
          <div className="text-3xl font-bold text-white">{metrics.averageMissionDuration.toFixed(1)} hrs</div>
          <div className="text-sm text-yellow-100">Avg Mission Duration</div>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-orange-700 p-4 rounded-lg text-center shadow-md"
        >
          <div className="text-3xl font-bold text-white">{metrics.personnelUtilization.toFixed(1)}%</div>
          <div className="text-sm text-orange-100">Personnel Utilization</div>
        </motion.div>
      </div>

      {/* Fleet Status */}
      {filteredData.aircraft.length > 0 && (
        <>
          <h3 className="text-xl font-bold mb-4 text-gray-900">Fleet Status</h3>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-6">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-emerald-600 p-4 rounded-lg text-center shadow-md"
            >
              <div className="text-3xl font-bold text-white">
                {metrics.fleetReadinessPercentage.toFixed(1)}%
              </div>
              <div className="text-sm text-emerald-100">Fleet Readiness</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-green-600 p-4 rounded-lg text-center shadow-md"
            >
              <div className="text-3xl font-bold text-white">{metrics.missionReadyCount}</div>
              <div className="text-sm text-green-100">Mission Ready</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-amber-500 p-4 rounded-lg text-center shadow-md"
            >
              <div className="text-3xl font-bold text-white">{metrics.inMaintenanceCount}</div>
              <div className="text-sm text-amber-100">In Maintenance</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-blue-600 p-4 rounded-lg text-center shadow-md"
            >
              <div className="text-3xl font-bold text-white">{metrics.pendingInspectionCount}</div>
              <div className="text-sm text-blue-100">Pending Inspection</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-red-600 p-4 rounded-lg text-center shadow-md"
            >
              <div className="text-3xl font-bold text-white">{metrics.groundedCount}</div>
              <div className="text-sm text-red-100">Grounded</div>
            </motion.div>
          </div>
        </>
      )}

      {/* Maintenance Performance */}
      <h3 className="text-xl font-bold mb-4 text-gray-900">Maintenance Performance</h3>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-indigo-600 p-4 rounded-lg text-center shadow-md"
        >
          <div className="text-3xl font-bold text-white">{metrics.mttr.toFixed(1)} hrs</div>
          <div className="text-sm text-indigo-100">Mean Time To Repair</div>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-purple-600 p-4 rounded-lg text-center shadow-md"
        >
          <div className="text-3xl font-bold text-white">{metrics.criticalIssuesCount}</div>
          <div className="text-sm text-purple-100">Critical Issues</div>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-rose-600 p-4 rounded-lg text-center shadow-md"
        >
          <div className="text-3xl font-bold text-white">{metrics.completionRate.toFixed(1)}%</div>
          <div className="text-sm text-rose-100">Completion Rate</div>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-teal-600 p-4 rounded-lg text-center shadow-md"
        >
          <div className="text-3xl font-bold text-white">{metrics.repairEfficiency.toFixed(1)}%</div>
          <div className="text-sm text-teal-100">Repair Efficiency</div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Maintenance Trends */}
        <div className="bg-gray-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-2">Maintenance Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={chartData.weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="repairs" fill="#3B82F6" name="Repairs" />
              <Line yAxisId="right" type="monotone" dataKey="mttr" stroke="#EF4444" name="MTTR (hrs)" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Mission Duration Chart */}
        <div className="bg-gray-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-2">Mission Duration Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData.missionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date"
                interval="preserveStartEnd"
                minTickGap={30}
              />
              <YAxis 
                domain={[0, 'auto']}
                label={{ 
                  value: 'Duration (hrs)', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle' }
                }}
              />
              <Tooltip
                formatter={(value: number, name: string) => [
                  `${value.toFixed(1)} hrs`,
                  name === 'duration' ? 'Duration' : name
                ]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="duration" 
                stroke="#8884d8" 
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 8 }} 
                name="Duration (hrs)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Maintenance Type Distribution */}
        {chartData.maintenanceTypeData.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold mb-2">Maintenance Type Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData.maintenanceTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.maintenanceTypeData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={['#3B82F6', '#10B981', '#F59E0B', '#EF4444'][index % 4]} 
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Critical Issues Timeline */}
        <div className="bg-gray-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-2">Critical Issues Timeline</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.criticalIssuesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis domain={[0, 'auto']} />
              <Tooltip />
              <Legend />
              <Bar dataKey="criticalIssues" fill="#EF4444" name="Critical Issues" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Reports; 