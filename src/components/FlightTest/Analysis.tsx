import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, ComposedChart, Rectangle } from 'recharts';
import * as FaIcons from 'react-icons/fa';
import { motion } from 'framer-motion';

interface AnalysisProps {
  // Add props as needed
}

interface TestMetrics {
  date: string;
  completionRate: number;
  testPointsCompleted: number;
  issuesIdentified: number;
  avgTestDuration: number;
}

interface TestEfficiency {
  category: string;
  planned: number;
  actual: number;
  variance: number;
}

// Interface for Test Point Burndown data
interface BurndownData {
  quarter: string;
  plan: number;
  actual: number | null;
  forecast: number | null;
}

// Interface for Approval Times data
interface ApprovalTimeData {
  name: string;
  min: number;
  worst: number;
  median: number;
  best: number;
  max: number;
}

export const Analysis: React.FC<AnalysisProps> = () => {
  const [dateRange, setDateRange] = useState<'week' | 'month' | 'quarter'>('month');
  const [selectedMetric, setSelectedMetric] = useState<string>('completion');

  // Mock data for metrics
  const metrics: TestMetrics[] = [
    {
      date: '2024-03-01',
      completionRate: 85,
      testPointsCompleted: 42,
      issuesIdentified: 3,
      avgTestDuration: 2.5
    },
    // Add more data points...
  ];

  const efficiencyData: TestEfficiency[] = [
    {
      category: 'Flight Hours',
      planned: 120,
      actual: 135,
      variance: -12.5
    },
    {
      category: 'Test Points',
      planned: 50,
      actual: 42,
      variance: 16
    },
    {
      category: 'Ground Time',
      planned: 24,
      actual: 28,
      variance: -16.7
    }
  ];

  // Mock data for Test Point Burndown chart
  const burndownData: BurndownData[] = [
    { quarter: '24Q1', plan: 1800, actual: 1780, forecast: 1780 },
    { quarter: '24Q2', plan: 1600, actual: 1650, forecast: 1650 },
    { quarter: '24Q3', plan: 1400, actual: 1530, forecast: 1530 },
    { quarter: '24Q4', plan: 1100, actual: 1300, forecast: 1300 },
    { quarter: '25Q1', plan: 800, actual: 950, forecast: 950 },
    { quarter: '25Q2', plan: 500, actual: 650, forecast: 600 },
    { quarter: '25Q3', plan: 200, actual: null, forecast: 300 },
    { quarter: '25Q4', plan: 0, actual: null, forecast: 0 },
  ];

  // Mock data for Approval Times chart
  const approvalTimesData: ApprovalTimeData[] = [
    { 
      name: 'Test Request', 
      min: 20, 
      worst: 30, 
      median: 45, 
      best: 55, 
      max: 65 
    },
    { 
      name: 'Test Plan', 
      min: 15, 
      worst: 25, 
      median: 35, 
      best: 45, 
      max: 55 
    },
    { 
      name: 'Test Card', 
      min: 25, 
      worst: 35, 
      median: 45, 
      best: 55, 
      max: 65 
    },
    { 
      name: 'Mission', 
      min: 30, 
      worst: 40, 
      median: 50, 
      best: 55, 
      max: 65 
    }
  ];

  // Custom box plot component
  const BoxPlot = (props: any) => {
    const { x, y, width, height, payload, dataKey, fill } = props;
    const data = payload;
    
    const baseWidth = width * 0.7; // Make the boxes slightly narrower
    const baseX = x + (width - baseWidth) / 2;
    
    return (
      <g>
        {/* Vertical line from min to max */}
        <line
          x1={x + width / 2}
          y1={y + height - height * (data.min / 80)}
          x2={x + width / 2}
          y2={y + height - height * (data.max / 80)}
          stroke="#000"
          strokeWidth={1}
        />
        
        {/* Box from worst to best */}
        <rect
          x={baseX}
          y={y + height - height * (data.best / 80)}
          width={baseWidth}
          height={height * ((data.best - data.worst) / 80)}
          fill={data.name === 'Mission' ? '#555' : '#fff'}
          stroke="#000"
          strokeWidth={1}
        />
        
        {/* Median line */}
        <line
          x1={baseX}
          y1={y + height - height * (data.median / 80)}
          x2={baseX + baseWidth}
          y2={y + height - height * (data.median / 80)}
          stroke="#000"
          strokeWidth={2}
        />
        
        {/* Min whisker */}
        <line
          x1={baseX + baseWidth * 0.25}
          y1={y + height - height * (data.min / 80)}
          x2={baseX + baseWidth * 0.75}
          y2={y + height - height * (data.min / 80)}
          stroke="#000"
          strokeWidth={1}
        />
        
        {/* Max whisker */}
        <line
          x1={baseX + baseWidth * 0.25}
          y1={y + height - height * (data.max / 80)}
          x2={baseX + baseWidth * 0.75}
          y2={y + height - height * (data.max / 80)}
          stroke="#000"
          strokeWidth={1}
        />
      </g>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Test Analysis & Metrics</h3>
        <div className="flex space-x-4">
          <select
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as any)}
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
            <FaIcons.FaDownload className="mr-2" /> Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Test Completion Rate', value: '85%', icon: <FaIcons.FaCheckCircle />, trend: '+5%' },
          { title: 'Test Points Completed', value: '42', icon: <FaIcons.FaTasks />, trend: '-3' },
          { title: 'Issues Identified', value: '12', icon: <FaIcons.FaExclamationTriangle />, trend: '+2' },
          { title: 'Avg Test Duration', value: '2.5h', icon: <FaIcons.FaClock />, trend: '-0.3h' }
        ].map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex justify-between items-start">
              <div className="text-gray-500">{metric.title}</div>
              <div className="text-blue-500">{metric.icon}</div>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div className="text-2xl font-semibold">{metric.value}</div>
              <div className={`text-sm ${
                metric.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'
              }`}>
                {metric.trend}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trend Analysis */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h4 className="font-medium mb-4">Performance Trends</h4>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={metrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="completionRate" stroke="#3B82F6" name="Completion Rate" />
              <Line type="monotone" dataKey="testPointsCompleted" stroke="#10B981" name="Test Points" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Approval Times Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h4 className="font-medium mb-4 text-center">Approval Times</h4>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={approvalTimesData}
              margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name" 
              />
              <YAxis
                domain={[0, 80]}
                ticks={[0, 20, 40, 60, 80]}
              />
              <Tooltip
                formatter={(value, name) => [`${value} hours`, name]}
              />
              <Legend
                verticalAlign="bottom" 
                height={36}
                payload={[
                  { value: '-2σ', type: 'rect', color: '#000' },
                  { value: 'Worse Case', type: 'rect', color: '#000' },
                  { value: 'Best Case', type: 'rect', color: '#000' },
                  { value: '+2σ', type: 'rect', color: '#000' }
                ]}
              />
              <Bar
                dataKey="median"
                name="Approval Time"
                shape={<BoxPlot />}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Test Point Burndown Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h4 className="font-medium mb-4 text-center">Test Point Burndown</h4>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={burndownData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="quarter" />
              <YAxis domain={[0, 2000]} />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="plan" 
                stroke="#3B82F6" 
                name="Plan" 
                strokeWidth={2}
                dot={{ r: 3 }}
              />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#F97316" 
                name="Actual" 
                strokeWidth={2}
                dot={{ r: 3 }}
              />
              <Line 
                type="monotone" 
                dataKey="forecast" 
                stroke="#9CA3AF" 
                name="Forecast" 
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Efficiency Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="font-medium mb-4">Resource Efficiency</h4>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={efficiencyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="planned" fill="#3B82F6" name="Planned" />
                <Bar dataKey="actual" fill="#10B981" name="Actual" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="font-medium mb-4">Test Point Analysis</h4>
          <div className="space-y-4">
            {efficiencyData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{item.category}</div>
                  <div className="text-xs text-gray-500">
                    Planned: {item.planned} | Actual: {item.actual}
                  </div>
                </div>
                <div className={`text-sm font-medium ${
                  item.variance > 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {item.variance}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Issues */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h4 className="font-medium mb-4">Recent Test Issues</h4>
        <div className="space-y-3">
          {[
            { id: 1, title: 'Telemetry Data Loss', severity: 'High', status: 'Open', date: '2024-03-15' },
            { id: 2, title: 'Test Point Deviation', severity: 'Medium', status: 'Resolved', date: '2024-03-14' },
            { id: 3, title: 'Weather Constraints', severity: 'Low', status: 'Closed', date: '2024-03-13' }
          ].map((issue) => (
            <div key={issue.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="text-sm font-medium">{issue.title}</div>
                <div className="text-xs text-gray-500">Reported: {issue.date}</div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  issue.severity === 'High' ? 'bg-red-100 text-red-800' :
                  issue.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {issue.severity}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  issue.status === 'Open' ? 'bg-blue-100 text-blue-800' :
                  issue.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {issue.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analysis; 