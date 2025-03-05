import React, { useState } from 'react';
import { MissionCard, Aircraft } from '../../types';
import * as FaIcons from 'react-icons/fa';
import { motion } from 'framer-motion';
import { mockMissionCards } from '../../mockFlightTest';

interface MissionCardsProps {
  aircraft: Aircraft[];
}

export const MissionCards: React.FC<MissionCardsProps> = ({ aircraft }) => {
  const [filterStatus, setFilterStatus] = useState<MissionCard['status'] | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter mission cards based on status and search term
  const filteredCards = mockMissionCards.filter(card => 
    (filterStatus === 'all' || card.status === filterStatus) &&
    (card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     card.aircraft.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header with Search and Filters */}
      <div className="flex justify-between items-center">
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <input
              type="text"
              placeholder="Search mission cards..."
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
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as MissionCard['status'] | 'all')}
          >
            <option value="all">All Status</option>
            <option value="Planned">Planned</option>
            <option value="Ready">Ready</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
            <FaIcons.FaPlus className="mr-2" /> New Mission Card
          </button>
        </div>
      </div>

      {/* Mission Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCards.map(card => (
          <motion.div
            key={card.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200"
          >
            {/* Card Header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-medium text-gray-900">{card.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  card.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  card.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  card.status === 'Ready' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {card.status}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                <div className="flex items-center">
                  <FaIcons.FaPlane className="mr-2" />
                  {card.aircraft}
                </div>
                <div className="flex items-center mt-1">
                  <FaIcons.FaCalendar className="mr-2" />
                  {card.date.toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Test Points */}
            <div className="p-4 border-b border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Test Points</h4>
              <div className="space-y-2">
                {card.testPoints.map(point => (
                  <div key={point.id} className="flex items-center justify-between text-sm">
                    <span className="flex-1">{point.name}</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                      point.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      point.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {point.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Crew Information */}
            <div className="p-4 border-b border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Crew</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <div>Test Pilot: {card.crew.testPilot}</div>
                <div>Flight Engineer: {card.crew.flightEngineer}</div>
                <div>Safety Officer: {card.crew.safetyOfficer}</div>
              </div>
            </div>

            {/* Weather and Times */}
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-500">Weather Required</div>
                  <div>{card.weather.required}</div>
                </div>
                <div>
                  <div className="text-gray-500">Weather Actual</div>
                  <div>{card.weather.actual}</div>
                </div>
                <div>
                  <div className="text-gray-500">Briefing</div>
                  <div>{card.briefingTime}</div>
                </div>
                <div>
                  <div className="text-gray-500">Takeoff</div>
                  <div>{card.takeoffTime}</div>
                </div>
              </div>
            </div>

            {/* Card Actions */}
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex justify-end space-x-2">
              <button className="p-2 text-gray-600 hover:text-blue-600">
                <FaIcons.FaEdit />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600">
                <FaIcons.FaExpandAlt />
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

export default MissionCards; 