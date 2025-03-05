import React, { useState } from 'react';
import { MissionCard, TestPoint, TestResource, InstrumentationConfig, Aircraft, TestEvent } from '../../types';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import { motion } from 'framer-motion';
import MissionCards from './MissionCards';
import TestPoints from './TestPoints';
import Instrumentation from './Instrumentation';
import Resources from './Resources';
import Schedule from './Schedule';
import Analysis from './Analysis';
import { mockTestEvents } from '../../mockFlightTest';

interface FlightTestManagementProps {
  aircraft: Aircraft[];
}

export const FlightTestManagement: React.FC<FlightTestManagementProps> = ({ aircraft }) => {
  const [activeTab, setActiveTab] = useState<
    'mission-cards' | 
    'test-points' | 
    'instrumentation' | 
    'resources' | 
    'schedule' | 
    'analysis'
  >('mission-cards');

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <FaIcons.FaClipboardCheck className="text-3xl text-black mr-3" />
            <h1 className="text-2xl font-bold">Flight Test</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {mockTestEvents.filter((e: TestEvent) => e.status === 'Scheduled').length} Active Tests
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`${
                activeTab === 'mission-cards'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('mission-cards')}
            >
              <FaIcons.FaClipboard className="inline-block mr-2" />
              Mission Cards
            </button>

            <button
              className={`${
                activeTab === 'test-points'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('test-points')}
            >
              <FaIcons.FaTasks className="inline-block mr-2" />
              Test Points
            </button>

            <button
              className={`${
                activeTab === 'instrumentation'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('instrumentation')}
            >
              <FaIcons.FaMicrochip className="inline-block mr-2" />
              Instrumentation
            </button>

            <button
              className={`${
                activeTab === 'resources'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('resources')}
            >
              <FaIcons.FaTools className="inline-block mr-2" />
              Resources
            </button>

            <button
              className={`${
                activeTab === 'schedule'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('schedule')}
            >
              <FaIcons.FaCalendarAlt className="inline-block mr-2" />
              Schedule
            </button>

            <button
              className={`${
                activeTab === 'analysis'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('analysis')}
            >
              <FaIcons.FaChartLine className="inline-block mr-2" />
              Analysis
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="mt-6">
          {activeTab === 'mission-cards' && <MissionCards aircraft={aircraft} />}
          {activeTab === 'test-points' && <TestPoints />}
          {activeTab === 'instrumentation' && <Instrumentation aircraft={aircraft} />}
          {activeTab === 'resources' && <Resources />}
          {activeTab === 'schedule' && <Schedule />}
          {activeTab === 'analysis' && <Analysis />}
        </div>
      </div>
    </div>
  );
};

export default FlightTestManagement; 