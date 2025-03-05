import React from 'react';
import { motion } from 'framer-motion';
import { mockAircraft, mockParts, mockTechnicians, mockWeather } from '../../mockData';
import { FaPlane, FaTools, FaUserCog, FaCloudSun, FaInfoCircle } from 'react-icons/fa';
import { Part } from '../../types';

interface WeatherData {
  timestamp: string;
  conditions: string;
  temperature: number;
  windSpeed: number;
}

const MockDataView: React.FC = () => {
  // Helper function to safely get weather time range
  const getWeatherTimeRange = () => {
    if (mockWeather.conditions.length === 0) return 'No data';
    const firstCondition = mockWeather.conditions[0] as unknown as WeatherData;
    const lastCondition = mockWeather.conditions[mockWeather.conditions.length - 1] as unknown as WeatherData;
    return `${firstCondition?.timestamp || 'N/A'} - ${lastCondition?.timestamp || 'N/A'}`;
  };

  const mockDataSections = [
    {
      title: 'Aircraft Fleet',
      icon: <FaPlane className="text-2xl text-blue-600" />,
      data: mockAircraft,
      description: 'Mock fleet of aircraft with maintenance history, missions, and system errors',
      summary: {
        count: mockAircraft.length,
        details: [
          `Total Aircraft: ${mockAircraft.length}`,
          `Operational: ${mockAircraft.filter(a => a.status === 'Operational').length}`,
          `In Mission: ${mockAircraft.filter(a => a.status === 'In Mission').length}`,
          `Under Maintenance: ${mockAircraft.filter(a => a.status === 'Maintenance').length}`
        ]
      }
    },
    {
      title: 'Parts Inventory',
      icon: <FaTools className="text-2xl text-green-600" />,
      data: mockParts,
      description: 'Inventory of aircraft parts with stock levels and maintenance records',
      summary: {
        count: mockParts.length,
        details: [
          `Total Parts: ${mockParts.length}`,
          `Low Stock: ${mockParts.filter((p: Part) => (p.inventory ?? 0) < 5).length}`,
          `Categories: ${new Set(mockParts.map(p => p.category)).size}`
        ]
      }
    },
    {
      title: 'Maintenance Personnel',
      icon: <FaUserCog className="text-2xl text-indigo-600" />,
      data: mockTechnicians,
      description: 'Technical staff with specializations and availability status',
      summary: {
        count: mockTechnicians.length,
        details: [
          `Total Technicians: ${mockTechnicians.length}`,
          `Available: ${mockTechnicians.filter(t => t.available).length}`,
          `Specialties: ${new Set(mockTechnicians.flatMap(t => t.specialties || [])).size}`
        ]
      }
    },
    {
      title: 'Weather Conditions',
      icon: <FaCloudSun className="text-2xl text-yellow-600" />,
      data: mockWeather.conditions,
      description: 'Simulated weather data for mission planning',
      summary: {
        count: mockWeather.conditions.length,
        details: [
          `Data Points: ${mockWeather.conditions.length}`,
          `Time Range: ${getWeatherTimeRange()}`
        ]
      }
    }
  ];

  return (
    <div className="space-y-6">
      {mockDataSections.map((section, index) => (
        <motion.div
          key={section.title}
          className="bg-white p-6 rounded-lg border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-center mb-4">
            {section.icon}
            <h3 className="text-xl font-medium ml-3">{section.title}</h3>
          </div>
          
          <p className="text-gray-600 mb-4">{section.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {section.summary.details.map((detail, i) => (
              <div key={i} className="bg-gray-50 p-3 rounded-lg">
                <span className="text-sm text-gray-600">{detail}</span>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Sample Data:</h4>
              <pre className="text-xs overflow-auto max-h-40 bg-white p-2 rounded border border-gray-200">
                {JSON.stringify(section.data[0], null, 2)}
              </pre>
            </div>
          </div>
        </motion.div>
      ))}

      <motion.div
        className="bg-white p-6 rounded-lg border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center mb-4">
          <FaInfoCircle className="text-2xl text-blue-600" />
          <h3 className="text-xl font-medium ml-3">Mock Data Usage</h3>
        </div>
        
        <div className="space-y-4">
          <p className="text-gray-600">
            This mock data is used throughout the application to simulate a real fleet maintenance environment.
            The data is structured to demonstrate:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Aircraft lifecycle management</li>
            <li>Maintenance scheduling and tracking</li>
            <li>Parts inventory management</li>
            <li>Personnel assignment and availability</li>
            <li>Weather impact on operations</li>
          </ul>
          <p className="text-sm text-gray-500 mt-4">
            Note: All data is randomly generated and refreshed on application restart.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default MockDataView; 