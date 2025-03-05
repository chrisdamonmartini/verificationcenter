import React from 'react';
import { Aircraft, SystemError } from '../types';
import { format } from 'date-fns';

interface DetailedAircraftViewProps {
  aircraft: Aircraft;
}

const ErrorCard: React.FC<{ error: SystemError }> = ({ error }) => {
  const severityColor = 
    error.severity === 'Critical' ? 'bg-red-500' :
    error.severity === 'Warning' ? 'bg-yellow-500' : 'bg-green-500';

  return (
    <div className="border border-gray-200 bg-white p-4 rounded-lg mb-3">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold">{error.system} - {error.component}</h4>
          <p className="text-sm">{error.description}</p>
        </div>
        <div className={`${severityColor} text-white text-xs px-2 py-1 rounded`}>
          {error.severity}
        </div>
      </div>
      
      <div className="mt-2">
        <p className="text-xs text-gray-600">
          Reported: {format(new Date(error.reportedAt), 'MMM d, yyyy h:mm a')}
        </p>
        <p className="text-xs text-gray-600 mt-1">
          Affected systems: {error.affectedSystems.join(', ')}
        </p>
      </div>
    </div>
  );
};

const AircraftSchematic: React.FC<{ errors: SystemError[] }> = ({ errors }) => {
  // This would be replaced with an actual aircraft schematic visualization
  // For now, we'll use a placeholder
  return (
    <div className="border border-gray-200 bg-gray-50 p-4 rounded-lg relative h-48 flex items-center justify-center">
      <p className="text-gray-400">Aircraft Schematic Visualization</p>
      
      {errors.map((error, index) => (
        <div 
          key={error.id}
          className="absolute w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold"
          style={{ 
            top: `${20 + (index * 15)}%`, 
            left: `${30 + (index * 10)}%` 
          }}
        >
          !
        </div>
      ))}
    </div>
  );
};

const DetailedAircraftView: React.FC<DetailedAircraftViewProps> = ({ aircraft }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">{aircraft.tailNumber} Details</h2>
          <p className="text-gray-700">{aircraft.model} • {aircraft.location}</p>
        </div>
        <div className={`px-3 py-1 rounded-full ${aircraft.missionCapable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {aircraft.missionCapable ? 'Mission Capable' : 'Not Mission Capable'}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-3">Aircraft Status</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Current Status:</span>
              <span>{aircraft.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last Maintenance:</span>
              <span>{format(new Date(aircraft.lastMaintenance), 'MMM d, yyyy')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Next Scheduled:</span>
              <span>{format(new Date(aircraft.nextScheduledMaintenance), 'MMM d, yyyy')}</span>
            </div>
            
            {aircraft.currentRepair && (
              <>
                <div className="border-t my-2"></div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Repair Stage:</span>
                  <span>{aircraft.currentRepair.stage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Repair Started:</span>
                  <span>{format(new Date(aircraft.currentRepair.startTime), 'MMM d, yyyy')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Completion:</span>
                  <span>
                    {aircraft.currentRepair.estimatedCompletionTime 
                      ? format(new Date(aircraft.currentRepair.estimatedCompletionTime), 'MMM d, yyyy')
                      : 'Not set'}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-3">Upcoming Missions</h3>
          
          {aircraft.missions
            .filter(m => m.startTime && new Date(m.startTime) > new Date() && m.status === 'Scheduled')
            .slice(0, 3)
            .map(mission => (
              <div key={mission.id} className="mb-3 pb-3 border-b">
                <div className="flex justify-between">
                  <span className="font-medium">{mission.name}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    mission.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                    mission.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                    mission.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {mission.priority}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {mission.startTime ? format(new Date(mission.startTime), 'MMM d, yyyy h:mm a') : 'TBD'} - 
                  {mission.endTime ? format(new Date(mission.endTime), 'MMM d, yyyy h:mm a') : 'TBD'}
                </div>
              </div>
            ))}
            
            {aircraft.missions.filter(m => m.startTime && new Date(m.startTime) > new Date() && m.status === 'Scheduled').length === 0 && (
              <p className="text-gray-500">No upcoming missions scheduled</p>
            )}
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="font-semibold mb-3">System Errors & Affected Components</h3>
        
        {aircraft.errors.length > 0 ? (
          <>
            <AircraftSchematic errors={aircraft.errors} />
            
            <div className="mt-4">
              {aircraft.errors.map(error => (
                <ErrorCard key={error.id} error={error} />
              ))}
            </div>
          </>
        ) : (
          <p className="text-gray-500">No current system errors</p>
        )}
      </div>
    </div>
  );
};

export default DetailedAircraftView; 