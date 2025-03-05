import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Aircraft, Repair } from '../../types';
import { mockAircraft, mockBases } from '../../mockData';
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';
import { format, formatDistanceToNow, differenceInMinutes, differenceInDays } from 'date-fns';

type MaintenanceStage = 
  | 'Anomaly Detected'
  | 'Ambiguity Identified'
  | 'Fault Isolation'
  | 'Maintenance Identified'
  | 'Maintenance In Work'
  | 'Inspection'
  | 'Safe for Flight';

interface MaintenanceStatus {
  stage: MaintenanceStage;
  startTime: string;
  estimatedCompletion?: string;
  description: string;
  systemAffected: string;
  severity: 'Critical' | 'Warning' | 'Info';
}

interface StageDetails {
  technicians?: string[];
  equipment?: string[];
  location?: string;
  notes?: string;
  startTime?: string;
  completionTime?: string;
}

const stages: MaintenanceStage[] = [
  'Anomaly Detected',
  'Ambiguity Identified',
  'Fault Isolation',
  'Maintenance Identified',
  'Maintenance In Work',
  'Inspection',
  'Safe for Flight'
];

const MaintenanceTracker: React.FC = () => {
  const [selectedBase, setSelectedBase] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter aircraft based on maintenance status and search term
  const filteredAircraft = mockAircraft.filter(aircraft => {
    const matchesSearch = 
      aircraft.tailNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aircraft.model.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBase = !selectedBase || aircraft.baseId === selectedBase;
    const matchesStatus = !filterStatus || aircraft.status === filterStatus;
    
    return matchesSearch && matchesBase && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <FaIcons.FaWrench className="text-3xl text-black mr-3" />
            <h1 className="text-2xl font-bold">Maintenance Tracker</h1>
          </div>
          
          {/* Filters */}
          <div className="flex space-x-4">
            <select
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedBase || ''}
              onChange={(e) => setSelectedBase(e.target.value || null)}
            >
              <option value="">All Bases</option>
              {mockBases.map(base => (
                <option key={base.id} value={base.id}>{base.name}</option>
              ))}
            </select>
            
            <select
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterStatus || ''}
              onChange={(e) => setFilterStatus(e.target.value || null)}
            >
              <option value="">All Statuses</option>
              {stages.map(stage => (
                <option key={stage} value={stage}>{stage}</option>
              ))}
            </select>
            
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
          </div>
        </div>

        {/* Aircraft Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAircraft.map(aircraft => (
            <motion.div
              key={aircraft.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Aircraft Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium">{aircraft.tailNumber}</h3>
                    <p className="text-sm text-gray-600">{aircraft.model}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                    aircraft.status === 'Operational' ? 'bg-green-100 text-green-800' :
                    aircraft.status === 'In Mission' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {aircraft.status}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  <div>Location: {aircraft.location}</div>
                  <div>Base: {mockBases.find(b => b.id === aircraft.baseId)?.name}</div>
                </div>
              </div>

              {/* System Errors */}
              <div className="p-4">
                <h4 className="font-medium mb-2">System Errors</h4>
                {aircraft.errors.map(error => (
                  <div key={error.id} className="flex items-start space-x-3 mb-3">
                    <div className="mt-1">
                      {error.severity === 'Critical' ? 
                        <FaIcons.FaExclamationCircle className="text-red-500" /> : 
                        <FaIcons.FaExclamationTriangle className="text-yellow-500" />
                      }
                    </div>
                    <div>
                      <h3 className="font-medium">{error.system} - {error.component}</h3>
                      <p className="text-gray-600">{error.description}</p>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <BiIcons.BiTime className="mr-1" />
                        {format(new Date(error.reportedAt), 'MMM dd, yyyy HH:mm')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Current Maintenance Details */}
              {aircraft.currentRepair && (
                <div className="mt-4 pt-4 border-t border-gray-200 p-4">
                  <h4 className="font-medium mb-2">Current Maintenance Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Started</p>
                      <p>{format(new Date(aircraft.currentRepair.startTime), 'MMM dd, yyyy HH:mm')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Estimated Completion</p>
                      <p>
                        {aircraft.currentRepair.estimatedCompletionTime 
                          ? format(new Date(aircraft.currentRepair.estimatedCompletionTime), 'MMM dd, yyyy HH:mm')
                          : 'Not set'}
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-600">{aircraft.currentRepair.notes}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MaintenanceTracker; 