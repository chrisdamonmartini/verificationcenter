import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div>
      {/* Remove Dashboard title as it will be shown in the subheader */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
        {/* Two cards for verification status and methods */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-medium mb-4">Verification Status</h2>
          <div className="border-t pt-4">
            {/* Placeholder for verification status chart */}
            <div className="h-40 bg-gray-100 flex items-center justify-center">
              <span className="text-gray-500">Verification Status Chart</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-medium mb-4">Verification Methods</h2>
          <div className="border-t pt-4">
            {/* Placeholder for verification methods chart */}
            <div className="h-40 bg-gray-100 flex items-center justify-center">
              <span className="text-gray-500">Verification Methods Chart</span>
            </div>
          </div>
        </div>
        
        {/* Third card spanning full width */}
        <div className="bg-white p-4 rounded shadow md:col-span-2">
          <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
          <div className="border-t pt-4">
            {/* Placeholder for recent activity list */}
            <ul className="divide-y">
              <li className="py-3">Updated Verification Plan VP-2023-01</li>
              <li className="py-3">Completed Test Case TC-AV-442</li>
              <li className="py-3">New Requirement REQ-SYS-255 added</li>
              <li className="py-3">Test Results TR-2023-15 submitted</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 