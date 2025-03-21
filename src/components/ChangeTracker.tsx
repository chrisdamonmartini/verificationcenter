import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea
} from 'recharts';

// Mock data for the changes over time
const changeData = [
  { date: 'Jan', operationalScenarios: 4, functions: 7, logical: 5, requirements: 12, phase: 'Pre-SRR' },
  { date: 'Feb', operationalScenarios: 6, functions: 10, logical: 8, requirements: 18, phase: 'Pre-SRR' },
  { date: 'Mar', operationalScenarios: 8, functions: 15, logical: 12, requirements: 25, phase: 'SRR' },
  { date: 'Apr', operationalScenarios: 5, functions: 8, logical: 10, requirements: 15, phase: 'Post-SRR' },
  { date: 'May', operationalScenarios: 3, functions: 5, logical: 7, requirements: 10, phase: 'Post-SRR' },
  { date: 'Jun', operationalScenarios: 2, functions: 4, logical: 5, requirements: 8, phase: 'Post-SRR' },
  { date: 'Jul', operationalScenarios: 3, functions: 6, logical: 4, requirements: 7, phase: 'Verification' },
  { date: 'Aug', operationalScenarios: 2, functions: 3, logical: 3, requirements: 5, phase: 'Verification' },
  { date: 'Sep', operationalScenarios: 1, functions: 2, logical: 2, requirements: 3, phase: 'Verification' },
];

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-md rounded">
        <p className="font-semibold text-sm">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }} className="text-xs">
            {`${entry.name}: ${entry.value} changes`}
          </p>
        ))}
        <p className="text-xs mt-1 text-gray-500">{`Phase: ${payload[0].payload.phase}`}</p>
      </div>
    );
  }

  return null;
};

const ChangeTracker: React.FC = () => {
  
  // Find index for SRR and start of Verification Phase
  const srrIndex = changeData.findIndex(item => item.phase === 'SRR');
  const verificationStartIndex = changeData.findIndex(item => item.phase === 'Verification');
  
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Changes Over Time</h3>
        <div className="text-sm text-gray-500">
          Tracking stability of requirements since SRR
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={changeData}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" />
          <YAxis label={{ value: 'Number of Changes', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          
          {/* Reference elements */}
          <ReferenceLine x={changeData[srrIndex].date} stroke="#ff7300" label={{ value: 'SRR', position: 'insideTopRight' }} />
          
          {/* Highlight Verification Phase */}
          <ReferenceArea 
            x1={changeData[verificationStartIndex].date} 
            x2={changeData[changeData.length - 1].date} 
            fill="#f9f9d5" 
            label={{ value: 'Verification Phase', position: 'insideTopRight' }} 
          />
          
          <Line 
            type="monotone" 
            dataKey="operationalScenarios" 
            name="Operational Scenarios" 
            stroke="#8884d8" 
            activeDot={{ r: 8 }} 
          />
          <Line 
            type="monotone" 
            dataKey="functions" 
            name="Functions" 
            stroke="#82ca9d" 
            activeDot={{ r: 8 }} 
          />
          <Line 
            type="monotone" 
            dataKey="logical" 
            name="Logical" 
            stroke="#ffc658" 
            activeDot={{ r: 8 }} 
          />
          <Line 
            type="monotone" 
            dataKey="requirements" 
            name="Requirements" 
            stroke="#ff8042" 
            activeDot={{ r: 8 }} 
          />
        </LineChart>
      </ResponsiveContainer>
      
      <div className="mt-4 text-sm text-gray-600">
        <div className="flex items-center mt-1">
          <span className="w-3 h-3 bg-yellow-100 inline-block mr-1"></span>
        </div>
      </div>
    </div>
  );
};

export default ChangeTracker; 