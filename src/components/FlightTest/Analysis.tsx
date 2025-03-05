import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
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