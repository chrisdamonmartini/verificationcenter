import React from 'react';
import { Part, Repair, Technician } from '../types';
import { format, formatDistance } from 'date-fns';

interface MaintenanceStatusProps {
  repairs: Repair[];
  technicians: Technician[];
  parts: Part[];
}

// Maps repair stages to step numbers for the progress indicator
const getStageStep = (stage: string): number => {
  const stages = [
    'Diagnosing',
    'Fault Isolating',
    'Parts on Order',
    'Repair in Progress',
    'Repair Complete',
    'Safe for Flight'
  ];
  return stages.indexOf(stage) + 1;
};

const RepairProgressIndicator: React.FC<{ stage: string }> = ({ stage }) => {
  const currentStep = getStageStep(stage);
  const totalSteps = 6; // Total number of stages
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <React.Fragment key={index}>
            {/* Connecting line between circles */}
            {index > 0 && (
              <div 
                className={`flex-grow h-1 mx-1 ${
                  index < currentStep ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              ></div>
            )}
            
            {/* Circle indicator */}
            <div 
              className={`w-6 h-6 flex items-center justify-center rounded-full ${
                index + 1 === currentStep 
                  ? 'bg-blue-500 text-white' 
                  : index + 1 < currentStep 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-300 text-gray-600'
              }`}
            >
              {index + 1}
            </div>
          </React.Fragment>
        ))}
      </div>
      
      <div className="flex justify-between text-xs text-gray-500">
        <span>Diagnosing</span>
        <span className="ml-2">Fault Isolating</span>
        <span className="ml-1">Parts on Order</span>
        <span>Repair</span>
        <span>Complete</span>
        <span>Safe for Flight</span>
      </div>
    </div>
  );
};

const MaintenanceStatus: React.FC<MaintenanceStatusProps> = ({ repairs, technicians, parts }) => {
  // Get all parts that are on order (inventory = 0 and onOrder > 0)
  const partsOnOrder = parts.filter(part => part.onOrder && part.onOrder > 0);
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Maintenance Status</h2>
      
      <div className="mb-6">
        <h3 className="font-medium mb-3">Active Repairs ({repairs.length})</h3>
        
        {repairs.length > 0 ? (
          <div className="space-y-4">
            {repairs.map(repair => (
              <div key={repair.id} className="border border-gray-200 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium">Aircraft {repair.aircraftId}</h4>
                    <p className="text-gray-700">{repair.notes}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    Started {formatDistance(new Date(repair.startTime), new Date(), { addSuffix: true })}
                  </div>
                </div>
                
                <RepairProgressIndicator stage={repair.stage || 'Diagnosing'} />
                
                <div className="mt-4 text-sm">
                  <p><span className="text-gray-600">Stage:</span> {repair.stage}</p>
                  <p>
                    <span className="text-gray-600">Est. Completion:</span>
                    {repair.estimatedCompletionTime 
                      ? format(new Date(repair.estimatedCompletionTime), 'MMM d, yyyy')
                      : 'Not set'}
                  </p>
                </div>
                
                <div className="mt-3">
                  <h5 className="text-sm font-medium mb-1">Assigned Technicians:</h5>
                  <div className="flex flex-wrap gap-1">
                    {repair.assignedTechnicians?.map(tech => (
                      <span 
                        key={tech.id} 
                        className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>
                
                {repair.partsRequired.length > 0 && (
                  <div className="mt-3">
                    <h5 className="text-sm font-medium mb-1">Parts Required:</h5>
                    <div className="flex flex-wrap gap-1">
                      {repair.partsRequired.map(part => {
                        const partDetails = parts.find(p => p.id === part.id);
                        const isAvailable = partDetails && partDetails.inventory && partDetails.inventory > 0;
                        
                        return (
                          <span 
                            key={part.id} 
                            className={`px-2 py-1 text-xs rounded-full ${
                              isAvailable 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {part.name || `Part ${part.id}`} {!isAvailable && '(On Order)'}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No active repairs</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium mb-3">Available Technicians</h3>
          
          <div className="overflow-y-auto max-h-60 space-y-2">
            {technicians.filter(t => t.available).map(tech => (
              <div key={tech.id} className="border border-gray-200 p-2 flex justify-between items-center">
                <div>
                  <p className="font-medium">{tech.name}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {tech.specialties?.map((specialty, idx) => (
                      <span 
                        key={idx} 
                        className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-green-600 text-sm">Available</div>
              </div>
            ))}
            
            {technicians.filter(t => t.available).length === 0 && (
              <p className="text-gray-500">No available technicians</p>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-3">Parts on Order</h3>
          
          <div className="overflow-y-auto max-h-60 space-y-2">
            {partsOnOrder.map(part => (
              <div key={part.id} className="border border-gray-200 p-2">
                <div className="flex justify-between">
                  <p className="font-medium">{part.name || `Part ${part.id}`}</p>
                  <p className="text-sm bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                    {part.onOrder} on order
                  </p>
                </div>
                <p className="text-xs text-gray-600 mt-1">Part #: {part.partNumber}</p>
                
                {part.estimatedArrival && (
                  <p className="text-xs text-gray-600 mt-1">
                    Est. Arrival: {format(new Date(part.estimatedArrival), 'MMM d, yyyy')}
                  </p>
                )}
              </div>
            ))}
            
            {partsOnOrder.length === 0 && (
              <p className="text-gray-500">No parts currently on order</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceStatus;
