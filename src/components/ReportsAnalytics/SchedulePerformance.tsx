import React, { useState } from 'react';
import { 
  FaCalendarAlt, 
  FaChartLine, 
  FaClock,
  FaExclamationTriangle,
  FaFilter, 
  FaSearch,
  FaDownload,
  FaCheckCircle,
  FaExclamationCircle
} from 'react-icons/fa';

// Define interfaces for our data
interface MilestoneData {
  id: string;
  name: string;
  plannedDate: string;
  actualDate: string | null;
  status: 'Completed' | 'In Progress' | 'Delayed' | 'At Risk' | 'Planned';
  dependencies: string[];
  owner: string;
  description: string;
  daysVariance: number;
}

interface PerformanceMetric {
  category: string;
  onTime: number;
  delayed: number;
  total: number;
  percentOnTime: number;
}

interface MonthlySpi {
  month: string;
  spi: number;
}

const SchedulePerformance: React.FC = () => {
  // Sample data for demonstration
  const [milestones, setMilestones] = useState<MilestoneData[]>([
    {
      id: 'MS-001',
      name: 'Requirements Verification Plan',
      plannedDate: '2023-03-15',
      actualDate: '2023-03-18',
      status: 'Completed',
      dependencies: [],
      owner: 'John Smith',
      description: 'Finalize and approve verification plan for all requirements',
      daysVariance: 3
    },
    {
      id: 'MS-002',
      name: 'Environmental Test Setup',
      plannedDate: '2023-04-10',
      actualDate: '2023-04-15',
      status: 'Completed',
      dependencies: ['MS-001'],
      owner: 'Emily Chen',
      description: 'Prepare environmental test facility and equipment',
      daysVariance: 5
    },
    {
      id: 'MS-003',
      name: 'Performance Tests Execution',
      plannedDate: '2023-05-01',
      actualDate: '2023-05-05',
      status: 'Completed',
      dependencies: ['MS-002'],
      owner: 'Robert Lee',
      description: 'Execute all performance-related verification tests',
      daysVariance: 4
    },
    {
      id: 'MS-004',
      name: 'Environmental Tests Execution',
      plannedDate: '2023-05-15',
      actualDate: '2023-05-25',
      status: 'Completed',
      dependencies: ['MS-002'],
      owner: 'Emily Chen',
      description: 'Execute all environmental verification tests',
      daysVariance: 10
    },
    {
      id: 'MS-005',
      name: 'Interface Tests Execution',
      plannedDate: '2023-06-01',
      actualDate: '2023-06-03',
      status: 'Completed',
      dependencies: ['MS-003'],
      owner: 'Sarah Johnson',
      description: 'Execute all interface verification tests',
      daysVariance: 2
    },
    {
      id: 'MS-006',
      name: 'Data Analysis Completion',
      plannedDate: '2023-06-15',
      actualDate: null,
      status: 'In Progress',
      dependencies: ['MS-003', 'MS-004', 'MS-005'],
      owner: 'John Smith',
      description: 'Complete analysis of all test data',
      daysVariance: 0
    },
    {
      id: 'MS-007',
      name: 'Verification Report Draft',
      plannedDate: '2023-06-30',
      actualDate: null,
      status: 'At Risk',
      dependencies: ['MS-006'],
      owner: 'Robert Lee',
      description: 'Complete draft of verification report',
      daysVariance: 0
    },
    {
      id: 'MS-008',
      name: 'Verification Review Meeting',
      plannedDate: '2023-07-15',
      actualDate: null,
      status: 'Planned',
      dependencies: ['MS-007'],
      owner: 'Sarah Johnson',
      description: 'Conduct review meeting with stakeholders',
      daysVariance: 0
    },
    {
      id: 'MS-009',
      name: 'Final Verification Report',
      plannedDate: '2023-07-30',
      actualDate: null,
      status: 'Planned',
      dependencies: ['MS-008'],
      owner: 'John Smith',
      description: 'Submit final verification report',
      daysVariance: 0
    },
    {
      id: 'MS-010',
      name: 'Compliance Assessment',
      plannedDate: '2023-08-15',
      actualDate: null,
      status: 'Planned',
      dependencies: ['MS-009'],
      owner: 'Emily Chen',
      description: 'Complete compliance assessment',
      daysVariance: 0
    }
  ]);

  // Performance metrics by category
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([
    {
      category: 'Performance Tests',
      onTime: 8,
      delayed: 2,
      total: 10,
      percentOnTime: 80
    },
    {
      category: 'Environmental Tests',
      onTime: 6,
      delayed: 4,
      total: 10,
      percentOnTime: 60
    },
    {
      category: 'Interface Tests',
      onTime: 9,
      delayed: 1,
      total: 10,
      percentOnTime: 90
    },
    {
      category: 'Data Analysis',
      onTime: 7,
      delayed: 3,
      total: 10,
      percentOnTime: 70
    },
    {
      category: 'Documentation',
      onTime: 8,
      delayed: 2,
      total: 10,
      percentOnTime: 80
    }
  ]);

  // Monthly Schedule Performance Index (SPI)
  const [spiData, setSpiData] = useState<MonthlySpi[]>([
    { month: 'Jan', spi: 0.95 },
    { month: 'Feb', spi: 0.98 },
    { month: 'Mar', spi: 0.92 },
    { month: 'Apr', spi: 0.88 },
    { month: 'May', spi: 0.85 },
    { month: 'Jun', spi: 0.90 }
  ]);

  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // Filter milestones based on search term and filters
  const filteredMilestones = milestones.filter(milestone => {
    // Filter by search term (name or ID)
    const matchesSearch = 
      searchTerm === '' || 
      milestone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      milestone.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      milestone.owner.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by status
    const matchesStatus = statusFilter === null || milestone.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate overall metrics
  const completedMilestones = milestones.filter(m => m.status === 'Completed').length;
  const delayedMilestones = milestones.filter(m => m.status === 'Completed' && m.daysVariance > 0).length;
  const atRiskMilestones = milestones.filter(m => m.status === 'At Risk').length;
  const totalMilestones = milestones.length;
  const onTimePercentage = completedMilestones > 0 
    ? Math.round(((completedMilestones - delayedMilestones) / completedMilestones) * 100)
    : 0;
  
  // Get current SPI (last month)
  const currentSpi = spiData.length > 0 ? spiData[spiData.length - 1].spi : 0;

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Delayed': return 'bg-red-100 text-red-800';
      case 'At Risk': return 'bg-orange-100 text-orange-800';
      case 'Planned': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get variance color
  const getVarianceColor = (days: number) => {
    if (days > 5) return 'text-red-600';
    if (days > 0) return 'text-orange-600';
    return 'text-green-600';
  };

  // Get SPI color
  const getSpiColor = (spi: number) => {
    if (spi < 0.9) return 'text-red-600';
    if (spi < 0.95) return 'text-orange-600';
    return 'text-green-600';
  };

  // Format date string to more readable format
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-gray-50 p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Schedule Performance</h1>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-1">Milestone Progress</h2>
            <div className="flex items-center">
              <div className="text-3xl font-bold text-blue-600">{completedMilestones}/{totalMilestones}</div>
              <div className="ml-3 text-sm text-gray-500">
                ({Math.round((completedMilestones / totalMilestones) * 100)}% Complete)
              </div>
            </div>
            <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600"
                style={{ width: `${(completedMilestones / totalMilestones) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-1">On-Time Completion</h2>
            <div className="text-3xl font-bold text-green-600">{onTimePercentage}%</div>
            <div className="mt-2 text-sm text-gray-500">
              Milestones completed on time
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-1">Schedule Performance Index</h2>
            <div className={`text-3xl font-bold ${getSpiColor(currentSpi)}`}>
              {currentSpi.toFixed(2)}
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Current SPI (Target: ≥0.95)
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-1">At Risk Milestones</h2>
            <div className="text-3xl font-bold text-orange-600">{atRiskMilestones}</div>
            <div className="mt-2 text-sm text-gray-500">
              Milestones flagged as at risk
            </div>
          </div>
        </div>
        
        {/* Schedule Performance Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Schedule Performance Trend</h2>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-md flex items-center text-sm">
              <FaDownload className="mr-2" /> Export
            </button>
          </div>
          
          <div className="flex flex-col">
            {/* SPI Trend Chart */}
            <div className="h-64 flex items-end space-x-1">
              {spiData.map((data, index) => (
                <div key={data.month} className="flex flex-col items-center flex-1">
                  <div 
                    className={`w-full rounded-t ${getSpiColor(data.spi)}`}
                    style={{ 
                      height: `${data.spi * 100}%`,
                      opacity: 0.7 + (index / spiData.length) * 0.3
                    }}
                  ></div>
                  <div className="text-xs font-medium mt-2">{data.month}</div>
                  <div className={`text-xs ${getSpiColor(data.spi)}`}>{data.spi.toFixed(2)}</div>
                </div>
              ))}
            </div>
            
            {/* Target Line */}
            <div className="mt-4 flex items-center">
              <div className="w-full h-px bg-gray-300 relative">
                <div className="absolute left-0 -top-4 right-0 flex justify-between">
                  <span className="text-xs text-gray-500">Target SPI: 0.95</span>
                  <span className="text-xs text-gray-500">1.0 = On Schedule</span>
                  <span className="text-xs text-gray-500">&lt;0.9 = Critical Delay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Performance by Category */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-lg font-semibold mb-4">Performance by Category</h2>
          
          <div className="space-y-4">
            {performanceMetrics.map((metric) => (
              <div key={metric.category}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{metric.category}</span>
                  <span className="text-sm">
                    {metric.onTime} on-time of {metric.total} ({metric.percentOnTime}%)
                  </span>
                </div>
                <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500"
                    style={{ width: `${metric.percentOnTime}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Milestone List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Milestones</h2>
            <div className="flex space-x-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
                Add Milestone
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm">
                <FaDownload className="inline mr-1" /> Export
              </button>
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-grow">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name, ID, or owner..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="absolute left-3 top-2.5 text-gray-400">
                  <FaSearch />
                </span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                className="border border-gray-300 rounded-md p-2 w-full"
                value={statusFilter || ''}
                onChange={(e) => setStatusFilter(e.target.value === '' ? null : e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Delayed">Delayed</option>
                <option value="At Risk">At Risk</option>
                <option value="Planned">Planned</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center text-sm h-10"
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter(null);
                }}
              >
                <FaFilter className="mr-2" /> Reset
              </button>
            </div>
          </div>
          
          {/* Milestone Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID & Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Planned Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actual Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Variance
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Owner
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMilestones.map((milestone) => (
                  <tr key={milestone.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{milestone.id}</div>
                      <div className="text-sm text-gray-500">{milestone.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(milestone.plannedDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(milestone.actualDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${getStatusColor(milestone.status)}`}>
                        {milestone.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {milestone.status === 'Completed' ? (
                        <span className={`text-sm font-medium ${getVarianceColor(milestone.daysVariance)}`}>
                          {milestone.daysVariance > 0 ? `+${milestone.daysVariance} days` : 
                           milestone.daysVariance < 0 ? `${milestone.daysVariance} days` : 'On time'}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-500">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {milestone.owner}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredMilestones.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No milestones match your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchedulePerformance; 