import React from 'react';

const VerificationPlanning: React.FC = () => {
  return (
    <div>
      {/* Content for Verification Planning */}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-medium mb-4">Verification Plans</h2>
          <div className="border-t pt-4">
            {/* Placeholder for verification plans table */}
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">VP-2023-01</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">System Verification Plan</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Active</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-04-12</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <a href="#" className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</a>
                    <a href="#" className="text-indigo-600 hover:text-indigo-900">View</a>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">VP-2023-02</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Software Verification Plan</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Draft</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-04-10</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <a href="#" className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</a>
                    <a href="#" className="text-indigo-600 hover:text-indigo-900">View</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationPlanning; 