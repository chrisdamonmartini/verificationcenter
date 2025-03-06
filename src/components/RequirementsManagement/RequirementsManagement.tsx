import React, { useState, useEffect } from 'react';
import SystemRequirements from './SystemRequirements';
import FunctionalRequirements from './FunctionalRequirements';
import TraceabilityMatrix from './TraceabilityMatrix';
import VerificationStatus from './VerificationStatus';
import RequirementsMetrics from './RequirementsMetrics';
import { FaRegChartBar, FaNetworkWired, FaClipboardList, FaExchangeAlt, FaTasks } from 'react-icons/fa';

const RequirementsManagement: React.FC = () => {
  type TabType = 'system' | 'functions' | 'traceability' | 'verification' | 'metrics';
  const [activeTab, setActiveTab] = useState<TabType>('system');
  
  // Use effect to check current path and set appropriate tab
  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('/requirements/verification')) {
      setActiveTab('verification');
    } else if (path.includes('/requirements/traceability')) {
      setActiveTab('traceability');
    } else if (path.includes('/requirements/functions')) {
      setActiveTab('functions');
    } else if (path.includes('/requirements/metrics')) {
      setActiveTab('metrics');
    }
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Requirements Management</h1>
        </div>

        {/* Tabs */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
          <div className="flex border-b border-gray-200">
            <button
              className={`px-6 py-4 text-sm font-medium flex items-center ${
                activeTab === 'system' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('system')}
            >
              <FaClipboardList className="mr-2" /> System Requirements
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium flex items-center ${
                activeTab === 'functions' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('functions')}
            >
              <FaNetworkWired className="mr-2" /> Functional Requirements
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium flex items-center ${
                activeTab === 'traceability' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('traceability')}
            >
              <FaExchangeAlt className="mr-2" /> Traceability Matrix
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium flex items-center ${
                activeTab === 'verification' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('verification')}
            >
              <FaTasks className="mr-2" /> Verification Status
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium flex items-center ${
                activeTab === 'metrics' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('metrics')}
            >
              <FaRegChartBar className="mr-2" /> Metrics
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'system' && <SystemRequirements />}
          {activeTab === 'functions' && <FunctionalRequirements />}
          {activeTab === 'traceability' && <TraceabilityMatrix />}
          {activeTab === 'verification' && <VerificationStatus />}
          {activeTab === 'metrics' && <RequirementsMetrics />}
        </div>
      </div>
    </div>
  );
};

export default RequirementsManagement; 