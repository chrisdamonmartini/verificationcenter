import React, { useState } from 'react';
import { InstrumentationConfig, Aircraft } from '../../types';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

interface InstrumentationProps {
  aircraft: Aircraft[];
}

export const Instrumentation: React.FC<InstrumentationProps> = ({ aircraft }) => {
  const [selectedAircraft, setSelectedAircraft] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'sensors' | 'telemetry' | 'recorders'>('sensors');

  // Mock instrumentation data
  const instrumentationConfigs: InstrumentationConfig[] = [
    {
      id: 'INST001',
      aircraftId: 'AF-10042',
      sensors: [
        {
          id: 'SENS001',
          type: 'Accelerometer',
          location: 'Wing Root',
          calibrationDate: new Date('2024-01-15'),
          nextCalibration: new Date('2024-07-15'),
          status: 'Operational'
        },
        {
          id: 'SENS002',
          type: 'Strain Gauge',
          location: 'Vertical Stabilizer',
          calibrationDate: new Date('2024-02-01'),
          nextCalibration: new Date('2024-08-01'),
          status: 'Needs Calibration'
        },
        {
          id: 'SENS003',
          type: 'Pressure Transducer',
          location: 'Engine Inlet',
          calibrationDate: new Date('2024-01-20'),
          nextCalibration: new Date('2024-07-20'),
          status: 'Operational'
        }
      ],
      dataRecorders: [
        {
          id: 'REC001',
          type: 'Flight Test Recorder',
          status: 'Operational',
          storageRemaining: 85
        },
        {
          id: 'REC002',
          type: 'High Speed DAQ',
          status: 'Operational',
          storageRemaining: 92
        }
      ],
      telemetry: {
        status: 'Online',
        bandwidth: 50,
        encryption: 'AES-256'
      }
    }
    // Add more configurations for other aircraft
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Instrumentation Configuration</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
          <FaIcons.FaPlus className="mr-2" /> New Configuration
        </button>
      </div>

      {/* Aircraft Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {aircraft.map(ac => {
          const config = instrumentationConfigs.find(c => c.aircraftId === ac.id);
          const sensorIssues = config?.sensors.filter(s => s.status !== 'Operational').length || 0;
          const recorderIssues = config?.dataRecorders.filter(r => r.status !== 'Operational').length || 0;

          return (
            <motion.div
              key={ac.id}
              className={`bg-white rounded-lg shadow-sm border p-4 cursor-pointer ${
                selectedAircraft === ac.id ? 'border-blue-500' : 'border-gray-200'
              }`}
              onClick={() => setSelectedAircraft(selectedAircraft === ac.id ? null : ac.id)}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-medium text-gray-900">{ac.tailNumber}</h4>
                  <p className="text-sm text-gray-500">{ac.model}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  config?.telemetry.status === 'Online' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {config?.telemetry.status || 'No Config'}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Sensors:</span>
                  <span className={sensorIssues > 0 ? 'text-yellow-600' : 'text-green-600'}>
                    {config?.sensors.length || 0} ({sensorIssues} issues)
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Recorders:</span>
                  <span className={recorderIssues > 0 ? 'text-yellow-600' : 'text-green-600'}>
                    {config?.dataRecorders.length || 0} ({recorderIssues} issues)
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Telemetry:</span>
                  <span>{config?.telemetry.bandwidth || 0} Mbps</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Detailed Configuration View */}
      <AnimatePresence>
        {selectedAircraft && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200"
          >
            {/* Configuration Tabs */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex">
                {['sensors', 'telemetry', 'recorders'].map((tab) => (
                  <button
                    key={tab}
                    className={`${
                      activeTab === tab
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm capitalize`}
                    onClick={() => setActiveTab(tab as any)}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'sensors' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Sensors</h4>
                    <button className="text-blue-600 hover:text-blue-800">
                      <FaIcons.FaPlus /> Add Sensor
                    </button>
                  </div>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Type</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Location</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Status</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Calibration</th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {instrumentationConfigs
                        .find(c => c.aircraftId === selectedAircraft)
                        ?.sensors.map(sensor => (
                          <tr key={sensor.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2">{sensor.type}</td>
                            <td className="px-4 py-2">{sensor.location}</td>
                            <td className="px-4 py-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                sensor.status === 'Operational' ? 'bg-green-100 text-green-800' :
                                sensor.status === 'Needs Calibration' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {sensor.status}
                              </span>
                            </td>
                            <td className="px-4 py-2 text-sm">
                              Next: {sensor.nextCalibration.toLocaleDateString()}
                            </td>
                            <td className="px-4 py-2 text-right">
                              <button className="text-blue-600 hover:text-blue-900 mr-2">
                                <FaIcons.FaEdit />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <FaIcons.FaTrash />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'telemetry' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Status</h5>
                      <div className="text-2xl font-semibold">
                        {instrumentationConfigs.find(c => c.aircraftId === selectedAircraft)?.telemetry.status}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Bandwidth</h5>
                      <div className="text-2xl font-semibold">
                        {instrumentationConfigs.find(c => c.aircraftId === selectedAircraft)?.telemetry.bandwidth} Mbps
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Encryption</h5>
                      <div className="text-2xl font-semibold">
                        {instrumentationConfigs.find(c => c.aircraftId === selectedAircraft)?.telemetry.encryption}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'recorders' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Data Recorders</h4>
                    <button className="text-blue-600 hover:text-blue-800">
                      <FaIcons.FaPlus /> Add Recorder
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {instrumentationConfigs
                      .find(c => c.aircraftId === selectedAircraft)
                      ?.dataRecorders.map(recorder => (
                        <div key={recorder.id} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h5 className="font-medium">{recorder.type}</h5>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                recorder.status === 'Operational' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {recorder.status}
                              </span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-500">Storage</div>
                              <div className="font-medium">{recorder.storageRemaining}%</div>
                            </div>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500"
                              style={{ width: `${recorder.storageRemaining}%` }}
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Instrumentation; 