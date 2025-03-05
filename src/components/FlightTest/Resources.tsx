import React, { useState } from 'react';
import { TestResource } from '../../types';
import * as FaIcons from 'react-icons/fa';
import { motion } from 'framer-motion';

interface ResourcesProps {
  // Add props as needed
}

export const Resources: React.FC<ResourcesProps> = () => {
  const [filterType, setFilterType] = useState<TestResource['type'] | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock resources data
  const resources: TestResource[] = [
    {
      id: 'RES001',
      type: 'Aircraft',
      name: 'Chase Aircraft - T-38A',
      status: 'Available',
      qualifications: ['Test Pilot', 'Safety Chase'],
      certifications: ['Formation Flight', 'Test Chase']
    },
    {
      id: 'RES002',
      type: 'Equipment',
      name: 'Mobile Telemetry Station',
      status: 'In Use',
      nextAvailable: new Date('2024-03-20'),
      certifications: ['Range Certified', 'Secure Data']
    },
    {
      id: 'RES003',
      type: 'Personnel',
      name: 'Flight Test Engineer Team',
      status: 'Available',
      qualifications: ['Performance Testing', 'Data Analysis'],
      certifications: ['Test Safety', 'Flight Test Engineering']
    },
    {
      id: 'RES004',
      type: 'Facility',
      name: 'Hangar 7 - Instrumentation Lab',
      status: 'Maintenance',
      nextAvailable: new Date('2024-03-18'),
      certifications: ['Calibration Lab', 'Environmental Control']
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header with Search and Filters */}
      <div className="flex justify-between items-center">
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaIcons.FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
        <div className="flex space-x-4">
          <select
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as TestResource['type'] | 'all')}
          >
            <option value="all">All Types</option>
            <option value="Aircraft">Aircraft</option>
            <option value="Equipment">Equipment</option>
            <option value="Personnel">Personnel</option>
            <option value="Facility">Facility</option>
          </select>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
          >
            <FaIcons.FaPlus className="mr-2" /> Add Resource
          </button>
        </div>
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources
          .filter(resource => 
            (filterType === 'all' || resource.type === filterType) &&
            resource.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map(resource => (
            <motion.div
              key={resource.id}
              layout
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
            >
              {/* Resource Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center">
                    {resource.type === 'Aircraft' && <FaIcons.FaPlane className="text-gray-400 mr-2" />}
                    {resource.type === 'Equipment' && <FaIcons.FaTools className="text-gray-400 mr-2" />}
                    {resource.type === 'Personnel' && <FaIcons.FaUsers className="text-gray-400 mr-2" />}
                    {resource.type === 'Facility' && <FaIcons.FaBuilding className="text-gray-400 mr-2" />}
                    <h3 className="text-lg font-medium text-gray-900">{resource.name}</h3>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{resource.type}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  resource.status === 'Available' ? 'bg-green-100 text-green-800' :
                  resource.status === 'In Use' ? 'bg-blue-100 text-blue-800' :
                  resource.status === 'Maintenance' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {resource.status}
                </span>
              </div>

              {/* Resource Details */}
              <div className="space-y-3">
                {resource.nextAvailable && (
                  <div className="flex items-center text-sm">
                    <FaIcons.FaClock className="text-gray-400 mr-2" />
                    <span>Available: {resource.nextAvailable.toLocaleDateString()}</span>
                  </div>
                )}

                {resource.qualifications && resource.qualifications.length > 0 && (
                  <div className="space-y-1">
                    <div className="text-sm text-gray-500">Qualifications:</div>
                    <div className="flex flex-wrap gap-2">
                      {resource.qualifications.map((qual, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700"
                        >
                          {qual}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {resource.certifications && resource.certifications.length > 0 && (
                  <div className="space-y-1">
                    <div className="text-sm text-gray-500">Certifications:</div>
                    <div className="flex flex-wrap gap-2">
                      {resource.certifications.map((cert, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-blue-50 rounded-full text-xs text-blue-700"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end space-x-2">
                <button className="p-2 text-gray-600 hover:text-blue-600">
                  <FaIcons.FaEdit />
                </button>
                <button className="p-2 text-gray-600 hover:text-blue-600">
                  <FaIcons.FaCalendarAlt />
                </button>
                <button className="p-2 text-gray-600 hover:text-red-600">
                  <FaIcons.FaTrash />
                </button>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default Resources; 