import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import { motion } from 'framer-motion';
import DataModel from './DataModel';
import MockDataView from './MockDataView';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'settings' | 'data' | 'mockdata'>('settings');

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <FaIcons.FaCog className="text-3xl text-black mr-3" />
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`${
                activeTab === 'settings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('settings')}
            >
              <FaIcons.FaCog className="inline-block mr-2" />
              Settings
            </button>

            <button
              className={`${
                activeTab === 'data'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('data')}
            >
              <FaIcons.FaDatabase className="inline-block mr-2" />
              Data Model
            </button>

            <button
              className={`${
                activeTab === 'mockdata'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('mockdata')}
            >
              <FaIcons.FaCode className="inline-block mr-2" />
              Mock Data
            </button>
          </nav>
        </div>

        {/* Content Area */}
        {activeTab === 'settings' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Display Settings */}
            <motion.div 
              className="bg-white p-4 rounded-lg border border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3 className="text-lg font-medium mb-4">Display Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center justify-between">
                    <span>Dark Mode</span>
                    <input type="checkbox" className="form-checkbox" />
                  </label>
                </div>
                <div>
                  <label className="flex items-center justify-between">
                    <span>Compact View</span>
                    <input type="checkbox" className="form-checkbox" />
                  </label>
                </div>
                <div>
                  <label className="block">
                    <span>Default View</span>
                    <select className="mt-1 block w-full rounded-md border-gray-300">
                      <option>Fleet Overview</option>
                      <option>Mission Schedule</option>
                      <option>Maintenance Status</option>
                    </select>
                  </label>
                </div>
              </div>
            </motion.div>

            {/* Notification Settings */}
            <motion.div 
              className="bg-white p-4 rounded-lg border border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-lg font-medium mb-4">Notification Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center justify-between">
                    <span>Maintenance Alerts</span>
                    <input type="checkbox" className="form-checkbox" defaultChecked />
                  </label>
                </div>
                <div>
                  <label className="flex items-center justify-between">
                    <span>Mission Updates</span>
                    <input type="checkbox" className="form-checkbox" defaultChecked />
                  </label>
                </div>
                <div>
                  <label className="flex items-center justify-between">
                    <span>Weather Alerts</span>
                    <input type="checkbox" className="form-checkbox" defaultChecked />
                  </label>
                </div>
              </div>
            </motion.div>

            {/* User Preferences */}
            <motion.div 
              className="bg-white p-4 rounded-lg border border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-medium mb-4">User Preferences</h3>
              <div className="space-y-4">
                <div>
                  <label className="block">
                    <span>Time Zone</span>
                    <select className="mt-1 block w-full rounded-md border-gray-300">
                      <option>UTC</option>
                      <option>Local Time</option>
                      <option>Custom...</option>
                    </select>
                  </label>
                </div>
                <div>
                  <label className="block">
                    <span>Date Format</span>
                    <select className="mt-1 block w-full rounded-md border-gray-300">
                      <option>MM/DD/YYYY</option>
                      <option>DD/MM/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </label>
                </div>
              </div>
            </motion.div>

            {/* System Settings */}
            <motion.div 
              className="bg-white p-4 rounded-lg border border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg font-medium mb-4">System Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block">
                    <span>Data Refresh Rate</span>
                    <select className="mt-1 block w-full rounded-md border-gray-300">
                      <option>Real-time</option>
                      <option>Every 5 minutes</option>
                      <option>Every 15 minutes</option>
                      <option>Every 30 minutes</option>
                    </select>
                  </label>
                </div>
                <div>
                  <label className="block">
                    <span>Cache Duration</span>
                    <select className="mt-1 block w-full rounded-md border-gray-300">
                      <option>1 hour</option>
                      <option>4 hours</option>
                      <option>12 hours</option>
                      <option>24 hours</option>
                    </select>
                  </label>
                </div>
              </div>
            </motion.div>
          </div>
        ) : activeTab === 'data' ? (
          <DataModel />
        ) : (
          <MockDataView />
        )}
      </div>
    </div>
  );
};

export default Settings; 