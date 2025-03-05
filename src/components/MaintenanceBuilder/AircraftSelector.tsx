import React from 'react';
import { AircraftWithAnomalies } from '../../types';

interface AircraftSelectorProps {
  selectedAircraft: AircraftWithAnomalies | null;
  setSelectedAircraft: (aircraft: AircraftWithAnomalies | null) => void;
  aircraftWithAnomalies: AircraftWithAnomalies[];
}

const AircraftSelector: React.FC<AircraftSelectorProps> = ({
  selectedAircraft,
  setSelectedAircraft,
  aircraftWithAnomalies
}) => {
  return (
    <div className="mb-2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Select Aircraft for Maintenance Plan</h2>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Show All Aircraft
        </button>
      </div>

      <div className="grid gap-4">
        {aircraftWithAnomalies.map((aircraft) => (
          <div
            key={aircraft.id}
            className={`p-4 rounded-lg border cursor-pointer ${
              selectedAircraft?.id === aircraft.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => setSelectedAircraft(aircraft)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{aircraft.tailNumber}</h3>
                <p className="text-sm text-gray-600">{aircraft.model}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Location: {aircraft.location}
                </p>
              </div>
              <div className="flex items-center">
                <span className="text-red-500 text-sm font-medium">
                  {aircraft.anomalies.length} Anomalies
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AircraftSelector; 