import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { mockAircraft } from '../../mockData';
import { format } from 'date-fns';
import * as FaIcons from 'react-icons/fa';
import { Aircraft, Repair } from '../../types';

interface BaseMaintenanceTask {
  id: string;
  aircraftId: string;
  aircraftTailNumber: string;
  stage: string;
  startTime: string;
  status: 'scheduled' | 'in-progress' | 'completed';
}

interface ScheduledTask extends BaseMaintenanceTask {
  status: 'scheduled';
  estimatedCompletionTime: string;
}

interface InProgressTask extends BaseMaintenanceTask {
  status: 'in-progress';
  estimatedCompletionTime: string;
  notes?: string;
  description?: string;
  requiredParts?: string[];
}

interface CompletedTask extends BaseMaintenanceTask {
  status: 'completed';
  completionTime: string;
}

type MaintenanceTask = ScheduledTask | InProgressTask | CompletedTask;

const MaintenanceSchedule: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'scheduled' | 'in-progress' | 'completed'>('all');

  // Get all maintenance tasks from aircraft
  const getAllMaintenanceTasks = (): MaintenanceTask[] => {
    return mockAircraft.flatMap(aircraft => {
      const tasks: MaintenanceTask[] = [];
      
      // Add current repairs
      if (aircraft.currentRepair) {
        const inProgressTask: InProgressTask = {
          ...aircraft.currentRepair,
          aircraftTailNumber: aircraft.tailNumber,
          aircraftId: aircraft.id,
          status: 'in-progress' as const,
          stage: aircraft.currentRepair.stage || 'In Progress',
          startTime: aircraft.currentRepair.startTime,
          estimatedCompletionTime: aircraft.currentRepair.estimatedCompletionTime || 
            new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        };
        tasks.push(inProgressTask);
      }

      // Add scheduled maintenance
      if (aircraft.nextScheduledMaintenance) {
        const scheduledTask: ScheduledTask = {
          id: `scheduled-${aircraft.id}`,
          aircraftId: aircraft.id,
          aircraftTailNumber: aircraft.tailNumber,
          stage: 'Scheduled',
          startTime: aircraft.nextScheduledMaintenance,
          estimatedCompletionTime: new Date(new Date(aircraft.nextScheduledMaintenance).getTime() + 24 * 60 * 60 * 1000).toISOString(),
          status: 'scheduled' as const
        };
        tasks.push(scheduledTask);
      }

      // Add maintenance history
      if (aircraft.maintenanceHistory) {
        const historyTasks: CompletedTask[] = aircraft.maintenanceHistory.map(task => ({
          id: task.id,
          aircraftId: aircraft.id,
          aircraftTailNumber: aircraft.tailNumber,
          stage: task.stage,
          startTime: task.startTime,
          completionTime: task.completionTime,
          status: 'completed' as const
        }));
        tasks.push(...historyTasks);
      }

      return tasks;
    });
  };

  const maintenanceTasks = getAllMaintenanceTasks()
    .filter(task => filterStatus === 'all' || task.status === filterStatus)
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isInProgress = (task: MaintenanceTask): task is InProgressTask => 
    task.status === 'in-progress';

  const hasEstimatedCompletion = (task: MaintenanceTask): task is ScheduledTask | InProgressTask => 
    'estimatedCompletionTime' in task;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <FaIcons.FaTools className="text-3xl text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold">Maintenance Schedule</h1>
          </div>
          <div className="flex space-x-2">
            {['all', 'scheduled', 'in-progress', 'completed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status as any)}
                className={`px-4 py-2 rounded-md ${
                  filterStatus === status 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          {maintenanceTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`px-3 py-1 rounded-full text-sm ${getStatusColor(task.status)}`}>
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </div>
                  <div>
                    <h3 className="font-medium">Aircraft {task.aircraftTailNumber}</h3>
                    <p className="text-sm text-gray-500">{task.stage}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">
                    Start: {format(new Date(task.startTime), 'MMM dd, yyyy HH:mm')}
                  </div>
                  {hasEstimatedCompletion(task) && (
                    <div className="text-sm text-gray-500">
                      Est. Completion: {format(new Date(task.estimatedCompletionTime), 'MMM dd, yyyy HH:mm')}
                    </div>
                  )}
                </div>
              </div>

              {isInProgress(task) && (
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ 
                        width: `${Math.min(
                          100,
                          ((Date.now() - new Date(task.startTime).getTime()) /
                          (new Date(task.estimatedCompletionTime).getTime() - new Date(task.startTime).getTime())) * 100
                        )}%` 
                      }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          className="bg-white p-6 rounded-lg shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-lg font-medium mb-2">Scheduled</h3>
          <div className="text-3xl font-bold text-blue-600">
            {maintenanceTasks.filter(t => t.status === 'scheduled').length}
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-lg shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-lg font-medium mb-2">In Progress</h3>
          <div className="text-3xl font-bold text-yellow-600">
            {maintenanceTasks.filter(t => t.status === 'in-progress').length}
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-lg shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-medium mb-2">Completed</h3>
          <div className="text-3xl font-bold text-green-600">
            {maintenanceTasks.filter(t => t.status === 'completed').length}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MaintenanceSchedule; 