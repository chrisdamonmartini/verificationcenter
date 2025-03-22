import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as GiIcons from 'react-icons/gi';
import ChangeTracker from './ChangeTracker';
import useColors from '../hooks/useColors';
import ContentPanel from './common/ContentPanel';

const VerificationDashboard: React.FC = () => {
  const colors = useColors();

  return (
    <div className="p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Verification Center Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {/* Verification Status Card */}
        <ContentPanel style={{ 
          background: `linear-gradient(135deg, ${colors.brand.primary}10, ${colors.brand.secondary}10)`, 
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
        }}>
          <h3 className="text-lg font-semibold mb-3">Verification Status</h3>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm" style={{ color: colors.chart.textSecondary }}>Total Requirements</p>
              <p className="text-2xl font-bold" style={{ color: colors.chart.textPrimary }}>248</p>
            </div>
            <div>
              <div className="w-24 h-24 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold" style={{ color: colors.brand.primary }}>62%</span>
                </div>
                {/* This would be a circular progress component in actual implementation */}
                <div className="w-full h-full rounded-full opacity-75" style={{ border: `8px solid ${colors.brand.accent}` }}></div>
                <div className="absolute top-0 left-0 w-full h-full rounded-full transform -rotate-45" 
                     style={{ 
                       border: `8px solid ${colors.brand.primary}`, 
                       borderTopColor: 'transparent', 
                       borderLeftColor: 'transparent', 
                       borderRightColor: 'transparent' 
                     }}></div>
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2 text-xs text-center">
            <div>
              <div className="px-2 py-1 rounded" style={{ backgroundColor: `${colors.status.minor}20`, color: colors.status.minor }}>Verified</div>
              <p className="mt-1 font-bold">154</p>
            </div>
            <div>
              <div className="px-2 py-1 rounded" style={{ backgroundColor: `${colors.status.major}20`, color: colors.status.major }}>In Progress</div>
              <p className="mt-1 font-bold">45</p>
            </div>
            <div>
              <div className="px-2 py-1 rounded" style={{ backgroundColor: `${colors.status.critical}20`, color: colors.status.critical }}>Failed</div>
              <p className="mt-1 font-bold">12</p>
            </div>
            <div>
              <div className="px-2 py-1 rounded" style={{ backgroundColor: `${colors.chart.textSecondary}20`, color: colors.chart.textSecondary }}>Not Started</div>
              <p className="mt-1 font-bold">37</p>
            </div>
          </div>
        </ContentPanel>
        
        {/* Verification Methods Card */}
        <ContentPanel style={{ 
          background: `linear-gradient(135deg, ${colors.category.functions}10, ${colors.chart.series3}10)`, 
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
        }}>
          <h3 className="text-lg font-semibold mb-3">Verification Methods</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-2 rounded shadow-sm">
              <div className="flex items-center">
                <div className="p-2 rounded-full mr-2" style={{ backgroundColor: `${colors.brand.primary}15` }}>
                  <FaIcons.FaSearchPlus style={{ color: colors.brand.primary }} />
                </div>
                <div>
                  <p className="text-sm font-semibold">Inspection</p>
                  <p className="text-xl font-bold">52</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-2 rounded shadow-sm">
              <div className="flex items-center">
                <div className="p-2 rounded-full mr-2" style={{ backgroundColor: `${colors.category.functions}15` }}>
                  <FaIcons.FaCalculator style={{ color: colors.category.functions }} />
                </div>
                <div>
                  <p className="text-sm font-semibold">Analysis</p>
                  <p className="text-xl font-bold">87</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-2 rounded shadow-sm">
              <div className="flex items-center">
                <div className="p-2 rounded-full mr-2" style={{ backgroundColor: `${colors.chart.series3}15` }}>
                  <GiIcons.GiTestTubes style={{ color: colors.chart.series3 }} />
                </div>
                <div>
                  <p className="text-sm font-semibold">Test</p>
                  <p className="text-xl font-bold">76</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-2 rounded shadow-sm">
              <div className="flex items-center">
                <div className="p-2 rounded-full mr-2" style={{ backgroundColor: `${colors.chart.series8}15` }}>
                  <FaIcons.FaDesktop style={{ color: colors.chart.series8 }} />
                </div>
                <div>
                  <p className="text-sm font-semibold">Simulation</p>
                  <p className="text-xl font-bold">33</p>
                </div>
              </div>
            </div>
          </div>
        </ContentPanel>
        
        {/* Upcoming Activities Card */}
        <ContentPanel style={{ 
          background: `linear-gradient(135deg, ${colors.status.info}10, ${colors.chart.series2}10)`, 
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
        }}>
          <h3 className="text-lg font-semibold mb-3">Upcoming Activities</h3>
          <ul className="space-y-2">
            <li className="bg-white p-2 rounded shadow-sm">
              <div className="flex items-start">
                <div className="p-1 rounded-full mr-2 mt-1" style={{ backgroundColor: `${colors.status.critical}15` }}>
                  <FaIcons.FaCalendarAlt style={{ color: colors.status.critical, fontSize: '0.875rem' }} />
                </div>
                <div>
                  <p className="text-sm font-semibold">Flight Test #FT-103</p>
                  <p className="text-xs" style={{ color: colors.chart.textSecondary }}>Tomorrow, 09:00 AM</p>
                </div>
              </div>
            </li>
            <li className="bg-white p-2 rounded shadow-sm">
              <div className="flex items-start">
                <div className="p-1 rounded-full mr-2 mt-1" style={{ backgroundColor: `${colors.brand.primary}15` }}>
                  <FaIcons.FaCalendarAlt style={{ color: colors.brand.primary, fontSize: '0.875rem' }} />
                </div>
                <div>
                  <p className="text-sm font-semibold">Integration Test Review</p>
                  <p className="text-xs" style={{ color: colors.chart.textSecondary }}>Wed, 02:30 PM</p>
                </div>
              </div>
            </li>
            <li className="bg-white p-2 rounded shadow-sm">
              <div className="flex items-start">
                <div className="p-1 rounded-full mr-2 mt-1" style={{ backgroundColor: `${colors.status.minor}15` }}>
                  <FaIcons.FaCalendarAlt style={{ color: colors.status.minor, fontSize: '0.875rem' }} />
                </div>
                <div>
                  <p className="text-sm font-semibold">Simulation Scenario Planning</p>
                  <p className="text-xs" style={{ color: colors.chart.textSecondary }}>Thu, 10:00 AM</p>
                </div>
              </div>
            </li>
          </ul>
        </ContentPanel>
      </div>
      
      {/* Changes Over Time Tracking */}
      <div className="mb-8">
        <ChangeTracker />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Activity Timeline */}
        <ContentPanel title="Recent Activities">
          <div className="space-y-4">
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div className="rounded-full h-4 w-4" style={{ backgroundColor: colors.brand.primary }}></div>
                <div className="bg-gray-200 h-full w-0.5 mx-auto"></div>
              </div>
              <div>
                <p className="text-sm font-semibold">Ground Test GT-056 Completed</p>
                <p className="text-xs" style={{ color: colors.chart.textSecondary }}>All test points met success criteria</p>
                <p className="text-xs" style={{ color: colors.chart.textSecondary }}>Today, 11:32 AM</p>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div className="rounded-full h-4 w-4" style={{ backgroundColor: colors.status.major }}></div>
                <div className="bg-gray-200 h-full w-0.5 mx-auto"></div>
              </div>
              <div>
                <p className="text-sm font-semibold">Simulation S-234 Results Updated</p>
                <p className="text-xs" style={{ color: colors.chart.textSecondary }}>3 scenarios need further analysis</p>
                <p className="text-xs" style={{ color: colors.chart.textSecondary }}>Today, 09:15 AM</p>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div className="rounded-full h-4 w-4" style={{ backgroundColor: colors.status.minor }}></div>
                <div className="bg-gray-200 h-full w-0.5 mx-auto"></div>
              </div>
              <div>
                <p className="text-sm font-semibold">Verification Requirement VR-078 Approved</p>
                <p className="text-xs" style={{ color: colors.chart.textSecondary }}>Added to verification matrix</p>
                <p className="text-xs" style={{ color: colors.chart.textSecondary }}>Yesterday, 04:45 PM</p>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div className="rounded-full h-4 w-4" style={{ backgroundColor: colors.status.critical }}></div>
                <div className="bg-gray-200 h-full w-0.5 mx-auto"></div>
              </div>
              <div>
                <p className="text-sm font-semibold">Test Article TA-003 Inspection Failed</p>
                <p className="text-xs" style={{ color: colors.chart.textSecondary }}>Rework required before next test</p>
                <p className="text-xs" style={{ color: colors.chart.textSecondary }}>Yesterday, 02:20 PM</p>
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <button style={{ color: colors.brand.primary }} className="text-sm hover:underline">View All Activity</button>
          </div>
        </ContentPanel>
        
        {/* Resource Allocation */}
        <ContentPanel title="Resource Allocation">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Test Facilities</span>
                <span className="text-sm font-medium">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="h-2.5 rounded-full" style={{ width: '78%', backgroundColor: colors.brand.primary }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Test Articles</span>
                <span className="text-sm font-medium">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="h-2.5 rounded-full" style={{ width: '45%', backgroundColor: colors.status.minor }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Engineering Staff</span>
                <span className="text-sm font-medium">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="h-2.5 rounded-full" style={{ width: '92%', backgroundColor: colors.status.critical }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Simulation Resources</span>
                <span className="text-sm font-medium">60%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="h-2.5 rounded-full" style={{ width: '60%', backgroundColor: colors.status.major }}></div>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="p-2 rounded" style={{ backgroundColor: colors.chart.backgroundMedium }}>
              <p className="text-xs" style={{ color: colors.chart.textSecondary }}>Highest Utilization</p>
              <p className="text-sm font-semibold">Flight Test Team (92%)</p>
            </div>
            <div className="p-2 rounded" style={{ backgroundColor: colors.chart.backgroundMedium }}>
              <p className="text-xs" style={{ color: colors.chart.textSecondary }}>Potential Bottleneck</p>
              <p className="text-sm font-semibold">Engineering Staff</p>
            </div>
          </div>
        </ContentPanel>
      </div>
    </div>
  );
};

export default VerificationDashboard; 