import React, { useState } from 'react';
import { TestPoint } from '../../types';
import * as FaIcons from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { mockTestPoints } from '../../mockFlightTest';

interface TestPointsProps {
  // Add props as needed
}

export const TestPoints: React.FC<TestPointsProps> = () => {
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);
  const [filterPriority, setFilterPriority] = useState<'all' | 'High' | 'Medium' | 'Low'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter test points based on priority and search term
  const filteredPoints = mockTestPoints.filter(point => 
    (filterPriority === 'all' || point.priority === filterPriority) &&
    (point.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     point.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header with Search and Filters */}
      <div className="flex justify-between items-center">
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <input
              type="text"
              placeholder="Search test points..."
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
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value as any)}
          >
            <option value="all">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
          >
            <FaIcons.FaPlus className="mr-2" /> New Test Point
          </button>
        </div>
      </div>

      {/* Test Points Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Test Point
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Requirements
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPoints.map(point => (
              <React.Fragment key={point.id}>
                <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedPoint(selectedPoint === point.id ? null : point.id)}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPoint(selectedPoint === point.id ? null : point.id);
                        }}
                        className="text-gray-400 hover:text-blue-500 mr-2"
                      >
                        {selectedPoint === point.id ? 
                          <FaIcons.FaChevronDown /> : 
                          <FaIcons.FaChevronRight />
                        }
                      </button>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{point.name}</div>
                        <div className="text-sm text-gray-500">{point.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      point.priority === 'High' ? 'bg-red-100 text-red-800' :
                      point.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {point.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      point.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      point.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {point.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                        {point.requirements.altitude}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                        {point.requirements.speed}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <FaIcons.FaEdit />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <FaIcons.FaTrash />
                    </button>
                  </td>
                </tr>
                {selectedPoint === point.id && (
                  <motion.tr
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <td colSpan={5} className="px-6 py-4 bg-gray-50">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Success Criteria</h4>
                          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            {point.successCriteria.map((criteria, index) => (
                              <li key={index}>{criteria}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Dependencies</h4>
                          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            {point.dependencies.map((dep, index) => (
                              <li key={index}>{dep}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Risks</h4>
                          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            {point.risks.map((risk, index) => (
                              <li key={index}>{risk}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </td>
                  </motion.tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestPoints; 