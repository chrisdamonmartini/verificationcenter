import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as GiIcons from 'react-icons/gi';

const VerificationDashboard: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Verification Center Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {/* Verification Status Card */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3">Verification Status</h3>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Total Requirements</p>
              <p className="text-2xl font-bold">248</p>
            </div>
            <div>
              <div className="w-24 h-24 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold">62%</span>
                </div>
                {/* This would be a circular progress component in actual implementation */}
                <div className="w-full h-full rounded-full border-8 border-blue-300 opacity-75"></div>
                <div className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-blue-500 border-t-transparent border-l-transparent border-r-transparent transform -rotate-45"></div>
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2 text-xs text-center">
            <div>
              <div className="bg-green-100 text-green-800 px-2 py-1 rounded">Verified</div>
              <p className="mt-1 font-bold">154</p>
            </div>
            <div>
              <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">In Progress</div>
              <p className="mt-1 font-bold">45</p>
            </div>
            <div>
              <div className="bg-red-100 text-red-800 px-2 py-1 rounded">Failed</div>
              <p className="mt-1 font-bold">12</p>
            </div>
            <div>
              <div className="bg-gray-100 text-gray-800 px-2 py-1 rounded">Not Started</div>
              <p className="mt-1 font-bold">37</p>
            </div>
          </div>
        </div>
        
        {/* Verification Methods Card */}
        <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3">Verification Methods</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-2 rounded shadow-sm">
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-full mr-2">
                  <FaIcons.FaSearchPlus className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Inspection</p>
                  <p className="text-xl font-bold">52</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-2 rounded shadow-sm">
              <div className="flex items-center">
                <div className="bg-purple-100 p-2 rounded-full mr-2">
                  <FaIcons.FaCalculator className="text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Analysis</p>
                  <p className="text-xl font-bold">87</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-2 rounded shadow-sm">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full mr-2">
                  <GiIcons.GiTestTubes className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Test</p>
                  <p className="text-xl font-bold">76</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-2 rounded shadow-sm">
              <div className="flex items-center">
                <div className="bg-yellow-100 p-2 rounded-full mr-2">
                  <FaIcons.FaDesktop className="text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Simulation</p>
                  <p className="text-xl font-bold">33</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Upcoming Activities Card */}
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3">Upcoming Activities</h3>
          <ul className="space-y-2">
            <li className="bg-white p-2 rounded shadow-sm">
              <div className="flex items-start">
                <div className="bg-red-100 p-1 rounded-full mr-2 mt-1">
                  <FaIcons.FaCalendarAlt className="text-red-600 text-sm" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Flight Test #FT-103</p>
                  <p className="text-xs text-gray-600">Tomorrow, 09:00 AM</p>
                </div>
              </div>
            </li>
            <li className="bg-white p-2 rounded shadow-sm">
              <div className="flex items-start">
                <div className="bg-blue-100 p-1 rounded-full mr-2 mt-1">
                  <FaIcons.FaCalendarAlt className="text-blue-600 text-sm" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Integration Test Review</p>
                  <p className="text-xs text-gray-600">Wed, 02:30 PM</p>
                </div>
              </div>
            </li>
            <li className="bg-white p-2 rounded shadow-sm">
              <div className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full mr-2 mt-1">
                  <FaIcons.FaCalendarAlt className="text-green-600 text-sm" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Simulation Scenario Planning</p>
                  <p className="text-xs text-gray-600">Thu, 10:00 AM</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Activity Timeline */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
          <div className="space-y-4">
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div className="bg-blue-500 rounded-full h-4 w-4"></div>
                <div className="bg-gray-200 h-full w-0.5 mx-auto"></div>
              </div>
              <div>
                <p className="text-sm font-semibold">Ground Test GT-056 Completed</p>
                <p className="text-xs text-gray-600">All test points met success criteria</p>
                <p className="text-xs text-gray-500">Today, 11:32 AM</p>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div className="bg-yellow-500 rounded-full h-4 w-4"></div>
                <div className="bg-gray-200 h-full w-0.5 mx-auto"></div>
              </div>
              <div>
                <p className="text-sm font-semibold">Simulation S-234 Results Updated</p>
                <p className="text-xs text-gray-600">3 scenarios need further analysis</p>
                <p className="text-xs text-gray-500">Today, 09:15 AM</p>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div className="bg-green-500 rounded-full h-4 w-4"></div>
                <div className="bg-gray-200 h-full w-0.5 mx-auto"></div>
              </div>
              <div>
                <p className="text-sm font-semibold">Verification Requirement VR-078 Approved</p>
                <p className="text-xs text-gray-600">Added to verification matrix</p>
                <p className="text-xs text-gray-500">Yesterday, 04:45 PM</p>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div className="bg-red-500 rounded-full h-4 w-4"></div>
                <div className="bg-gray-200 h-full w-0.5 mx-auto"></div>
              </div>
              <div>
                <p className="text-sm font-semibold">Test Article TA-003 Inspection Failed</p>
                <p className="text-xs text-gray-600">Rework required before next test</p>
                <p className="text-xs text-gray-500">Yesterday, 02:20 PM</p>
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <button className="text-blue-600 text-sm hover:underline">View All Activity</button>
          </div>
        </div>
        
        {/* Resource Allocation */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Resource Allocation</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Test Facilities</span>
                <span className="text-sm font-medium">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Test Articles</span>
                <span className="text-sm font-medium">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Engineering Staff</span>
                <span className="text-sm font-medium">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Simulation Resources</span>
                <span className="text-sm font-medium">60%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-gray-50 p-2 rounded">
              <p className="text-xs text-gray-600">Highest Utilization</p>
              <p className="text-sm font-semibold">Flight Test Team (92%)</p>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <p className="text-xs text-gray-600">Potential Bottleneck</p>
              <p className="text-sm font-semibold">Wind Tunnel (89%)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationDashboard; 