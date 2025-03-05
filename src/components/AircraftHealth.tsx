import React, { useState, useMemo } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as GiIcons from 'react-icons/gi';
import * as MdIcons from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import { Aircraft } from '../types';

type HealthStatus = 'Operational' | 'Warning' | 'Critical';

export interface SubsystemHealth {
  name: string;
  health: number;
  status: HealthStatus;
  sensors: {
    name: string;
    value: number;
    unit: string;
    status: 'normal' | 'warning' | 'critical';
  }[];
}

interface AircraftSystemHealth {
  aircraftId: string;
  systems: SubsystemHealth[];
  overallStatus: HealthStatus;
  criticalCount: number;
  warningCount: number;
  lastUpdated: Date;
}

const subsystems: SubsystemHealth[] = [
  {
    name: 'Pneumatic System',
    health: 95,
    status: 'Operational',
    sensors: [
      { name: 'Bleed Air Pressure', value: 42, unit: 'PSI', status: 'normal' },
      { name: 'Air Temperature', value: 180, unit: '°C', status: 'normal' },
      { name: 'Flow Rate', value: 95, unit: '%', status: 'normal' },
    ]
  },
  {
    name: 'Fuel & Power System',
    health: 98,
    status: 'Operational',
    sensors: [
      { name: 'Fuel Level', value: 85, unit: '%', status: 'normal' },
      { name: 'Fuel Flow Rate', value: 850, unit: 'PPH', status: 'normal' },
      { name: 'Engine Power', value: 92, unit: '%', status: 'normal' },
    ]
  },
  {
    name: 'Electrical System',
    health: 92,
    status: 'Operational',
    sensors: [
      { name: 'Main Bus Voltage', value: 28, unit: 'V', status: 'normal' },
      { name: 'Generator Output', value: 95, unit: '%', status: 'normal' },
      { name: 'Battery Health', value: 88, unit: '%', status: 'normal' },
    ]
  },
  {
    name: 'Ice Protection System',
    health: 89,
    status: 'Warning',
    sensors: [
      { name: 'Wing Anti-Ice', value: 78, unit: '%', status: 'warning' },
      { name: 'Engine Anti-Ice', value: 95, unit: '%', status: 'normal' },
      { name: 'Probe Heat', value: 100, unit: '%', status: 'normal' },
    ]
  },
  {
    name: 'Weapon System',
    health: 96,
    status: 'Operational',
    sensors: [
      { name: 'Targeting System', value: 98, unit: '%', status: 'normal' },
      { name: 'Weapon Bay Doors', value: 100, unit: '%', status: 'normal' },
      { name: 'Release Mechanism', value: 95, unit: '%', status: 'normal' },
    ]
  },
  {
    name: 'Flight Control System',
    health: 97,
    status: 'Operational',
    sensors: [
      { name: 'Aileron Response', value: 98, unit: '%', status: 'normal' },
      { name: 'Elevator Function', value: 96, unit: '%', status: 'normal' },
      { name: 'Rudder System', value: 97, unit: '%', status: 'normal' },
    ]
  },
  {
    name: 'Hydraulic System',
    health: 86,
    status: 'Warning',
    sensors: [
      { name: 'System A Pressure', value: 2800, unit: 'PSI', status: 'warning' },
      { name: 'System B Pressure', value: 3000, unit: 'PSI', status: 'normal' },
      { name: 'Fluid Level', value: 82, unit: '%', status: 'warning' },
    ]
  },
  {
    name: 'Fire Protection System',
    health: 100,
    status: 'Operational',
    sensors: [
      { name: 'Smoke Detection', value: 100, unit: '%', status: 'normal' },
      { name: 'Extinguisher Pressure', value: 100, unit: '%', status: 'normal' },
      { name: 'Heat Detection', value: 100, unit: '%', status: 'normal' },
    ]
  },
  {
    name: 'Communications & Navigation',
    health: 94,
    status: 'Operational',
    sensors: [
      { name: 'Radio Systems', value: 96, unit: '%', status: 'normal' },
      { name: 'GPS Signal', value: 92, unit: '%', status: 'normal' },
      { name: 'ILS System', value: 95, unit: '%', status: 'normal' },
    ]
  },
  {
    name: 'Sensors',
    health: 91,
    status: 'Operational',
    sensors: [
      { name: 'Radar System', value: 93, unit: '%', status: 'normal' },
      { name: 'IR Sensors', value: 90, unit: '%', status: 'normal' },
      { name: 'Weather Radar', value: 95, unit: '%', status: 'normal' },
    ]
  },
  {
    name: 'Landing Gear',
    health: 88,
    status: 'Warning',
    sensors: [
      { name: 'Gear Retraction', value: 85, unit: '%', status: 'warning' },
      { name: 'Brake Wear', value: 82, unit: '%', status: 'warning' },
      { name: 'Tire Pressure', value: 95, unit: '%', status: 'normal' },
    ]
  },
  {
    name: 'Structure',
    health: 93,
    status: 'Operational',
    sensors: [
      { name: 'Airframe Integrity', value: 95, unit: '%', status: 'normal' },
      { name: 'Vibration Level', value: 92, unit: '%', status: 'normal' },
      { name: 'Stress Indicators', value: 90, unit: '%', status: 'normal' },
    ]
  },
];

interface AircraftHealthProps {
  aircraft: Aircraft[];
}

export const AircraftHealth: React.FC<AircraftHealthProps> = ({ aircraft }) => {
  const [expandedAircraft, setExpandedAircraft] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'health' | 'critical' | 'warnings' | 'tailNumber'>('health');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showAllSystems, setShowAllSystems] = useState(false);

  // Generate random health data for each aircraft
  const aircraftHealthData = useMemo(() => {
    return aircraft.map(ac => {
      let hasIssues = Math.random() < 0.3;

      const systemsData = subsystems.map(system => {
        if (!hasIssues) {
          return {
            ...system,
            status: 'Operational' as HealthStatus,
            sensors: system.sensors.map(sensor => ({
              ...sensor,
              status: 'normal' as const
            }))
          };
        } else {
          const isSystemAffected = Math.random() < 0.15;
          
          if (!isSystemAffected) {
            return {
              ...system,
              status: 'Operational' as HealthStatus,
              sensors: system.sensors.map(sensor => ({
                ...sensor,
                status: 'normal' as const
              }))
            };
          }

          // System with issues
          const status = Math.random() < 0.3 ? 'Critical' as HealthStatus : 'Warning' as HealthStatus;
          return {
            ...system,
            status,
            sensors: system.sensors.map(sensor => ({
              ...sensor,
              status: Math.random() > 0.5 ? 'warning' : 'critical'
            }))
          };
        }
      });

      const criticalCount = systemsData.filter(s => s.status === 'Critical').length;
      const warningCount = systemsData.filter(s => s.status === 'Warning').length;
      
      const overallStatus: HealthStatus = criticalCount > 0 ? 'Critical' : 
                                        warningCount > 0 ? 'Warning' : 
                                        'Operational';

      return {
        aircraftId: ac.id,
        systems: systemsData,
        overallStatus,
        criticalCount,
        warningCount,
        lastUpdated: new Date(Date.now() - Math.random() * 3600000)
      };
    });
  }, [aircraft]);

  // Filter and sort the aircraft
  const filteredAndSortedAircraft = useMemo(() => {
    let filtered = aircraft.filter(ac => 
      ac.tailNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ac.model.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const healthData = new Map(aircraftHealthData.map(data => [data.aircraftId, data]));

    return filtered.sort((a, b) => {
      const aHealth = healthData.get(a.id)!;
      const bHealth = healthData.get(b.id)!;

      let comparison = 0;
      switch (sortBy) {
        case 'health':
          // Convert status to numeric value for sorting (Critical first)
          const getStatusPriority = (status: HealthStatus): number => {
            switch (status) {
              case 'Critical': return 0;
              case 'Warning': return 1;
              case 'Operational': return 2;
            }
          };
          // Compare overall status first
          const aValue = getStatusPriority(aHealth.overallStatus);
          const bValue = getStatusPriority(bHealth.overallStatus);
          comparison = aValue - bValue;
          
          // If status is the same, sort by number of issues
          if (comparison === 0) {
            // Sort by critical count first
            comparison = bHealth.criticalCount - aHealth.criticalCount;
            if (comparison === 0) {
              // If critical count is the same, sort by warning count
              comparison = bHealth.warningCount - aHealth.warningCount;
            }
          }
          break;
        case 'critical':
          comparison = bHealth.criticalCount - aHealth.criticalCount;
          break;
        case 'warnings':
          comparison = bHealth.warningCount - aHealth.warningCount;
          break;
        case 'tailNumber':
          comparison = a.tailNumber.localeCompare(b.tailNumber);
          break;
      }
      return comparison; // No need to check sortOrder since we're using fixed priority
    });
  }, [aircraft, aircraftHealthData, searchTerm, sortBy]);

  const getHealthColor = (status: HealthStatus) => {
    switch (status) {
      case 'Operational': return 'bg-green-500';
      case 'Warning': return 'bg-yellow-500';
      case 'Critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Operational': return 'text-green-600';
      case 'Warning': return 'text-yellow-600';
      case 'Critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-4">
      {/* Header with Search and Sort Controls */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-xl font-semibold flex items-center">
            <FaIcons.FaHeartbeat className="mr-2 text-blue-500" />
            Aircraft Health Status
          </h2>
          <div className="flex flex-wrap gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search aircraft..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaIcons.FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            <select
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="health">Sort by Health</option>
              <option value="critical">Sort by Critical Issues</option>
              <option value="warnings">Sort by Warnings</option>
              <option value="tailNumber">Sort by Tail Number</option>
            </select>
            <button
              className="p-2 border rounded-lg hover:bg-gray-50"
              onClick={() => setSortOrder(order => order === 'asc' ? 'desc' : 'asc')}
            >
              {sortOrder === 'asc' ? 
                <FaIcons.FaSortAmountDown className="text-gray-600" /> : 
                <FaIcons.FaSortAmountUp className="text-gray-600" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Aircraft List - Update the mapping to use filteredAndSortedAircraft */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aircraft</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overall Health</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Critical Systems</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Warnings</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedAircraft.map((ac) => {
                const healthData = aircraftHealthData.find(d => d.aircraftId === ac.id)!;
                return (
                  <React.Fragment key={ac.id}>
                    <tr className="hover:bg-gray-50 h-12">
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8">
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                              <FaIcons.FaPlane className="text-blue-500 text-sm" />
                            </div>
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{ac.tailNumber}</div>
                            <div className="text-xs text-gray-500">{ac.model}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${getHealthColor(healthData.overallStatus)}`}></div>
                          <span className={`text-sm font-medium ${
                            healthData.overallStatus === 'Critical' ? 'text-red-600' :
                            healthData.overallStatus === 'Warning' ? 'text-yellow-600' :
                            'text-green-600'
                          }`}>
                            {healthData.overallStatus}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <span className="text-red-600 text-sm">{healthData.criticalCount}</span>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <span className="text-yellow-600 text-sm">{healthData.warningCount}</span>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                        {healthData.lastUpdated.toLocaleTimeString()}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => setExpandedAircraft(expandedAircraft === ac.id ? null : ac.id)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          {expandedAircraft === ac.id ? 
                            <MdIcons.MdKeyboardArrowUp className="text-xl" /> : 
                            <MdIcons.MdKeyboardArrowDown className="text-xl" />
                          }
                        </button>
                      </td>
                    </tr>
                    <AnimatePresence>
                      {expandedAircraft === ac.id && (
                        <motion.tr
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-gray-50"
                        >
                          <td colSpan={6} className="px-6 py-4">
                            <div className="space-y-2">
                              <div className="flex justify-between items-center mb-4">
                                <span className="text-sm text-gray-500">
                                  Showing {showAllSystems ? 'all' : 'critical'} systems
                                </span>
                                <button
                                  onClick={() => setShowAllSystems(!showAllSystems)}
                                  className="text-sm text-blue-600 hover:text-blue-800"
                                >
                                  {showAllSystems ? 'Show Critical Only' : 'Show All Systems'}
                                </button>
                              </div>
                              
                              <table className="min-w-full">
                                <thead>
                                  <tr className="bg-gray-100">
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">System</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Status</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Sensors</th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white">
                                  {healthData.systems
                                    .filter(system => showAllSystems || system.status !== 'Operational')
                                    .map((system) => (
                                      <tr key={system.name} className="border-b border-gray-100">
                                        <td className="px-4 py-3">
                                          <div className="flex items-center">
                                            <div className={`w-3 h-3 rounded-full mr-3 ${getHealthColor(system.status)}`}></div>
                                            <span className="text-sm font-medium text-gray-900">
                                              {system.name}
                                            </span>
                                          </div>
                                        </td>
                                        <td className="px-4 py-3">
                                          <span className={`text-sm font-medium ${
                                            system.status === 'Critical' ? 'text-red-600' :
                                            system.status === 'Warning' ? 'text-yellow-600' :
                                            'text-green-600'
                                          }`}>
                                            {system.status}
                                          </span>
                                        </td>
                                        <td className="px-4 py-3">
                                          <div className="text-sm text-gray-500">
                                            {system.sensors
                                              .filter(sensor => sensor.status !== 'normal')
                                              .map(sensor => (
                                                <div key={sensor.name} className={
                                                  sensor.status === 'critical' ? 'text-red-600' : 'text-yellow-600'
                                                }>
                                                  {sensor.name}: {sensor.value}{sensor.unit}
                                                </div>
                                              ))}
                                          </div>
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AircraftHealth; 