import React from 'react';
import useColors from '../../hooks/useColors';
import ContentPanel from '../common/ContentPanel';

const Dashboard: React.FC = () => {
  const colors = useColors();
  
  return (
    <div>
      {/* Remove Dashboard title as it will be shown in the subheader */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
        {/* Two cards for verification status and methods */}
        <ContentPanel title="Verification Status">
          <div className="border-t pt-4">
            {/* Placeholder for verification status chart */}
            <div className="h-40 flex items-center justify-center" style={{ backgroundColor: `${colors.chart.backgroundLight}` }}>
              <span style={{ color: colors.chart.textSecondary }}>Verification Status Chart</span>
            </div>
          </div>
        </ContentPanel>
        
        <ContentPanel title="Verification Methods">
          <div className="border-t pt-4">
            {/* Placeholder for verification methods chart */}
            <div className="h-40 flex items-center justify-center" style={{ backgroundColor: `${colors.chart.backgroundLight}` }}>
              <span style={{ color: colors.chart.textSecondary }}>Verification Methods Chart</span>
            </div>
          </div>
        </ContentPanel>
        
        {/* Third card spanning full width */}
        <ContentPanel title="Recent Activity" style={{ gridColumn: '1 / span 2' }}>
          <div className="border-t pt-4">
            {/* Placeholder for recent activity list */}
            <ul className="divide-y">
              <li className="py-3">
                <span style={{ color: colors.brand.primary }}>Updated</span> Verification Plan VP-2023-01
              </li>
              <li className="py-3">
                <span style={{ color: colors.status.minor }}>Completed</span> Test Case TC-AV-442
              </li>
              <li className="py-3">
                <span style={{ color: colors.status.info }}>New</span> Requirement REQ-SYS-255 added
              </li>
              <li className="py-3">
                <span style={{ color: colors.status.major }}>Submitted</span> Test Results TR-2023-15
              </li>
            </ul>
          </div>
        </ContentPanel>
      </div>
    </div>
  );
};

export default Dashboard; 