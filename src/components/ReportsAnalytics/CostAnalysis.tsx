import React, { useState } from 'react';
import { FaDownload, FaCalendarAlt, FaChartBar, FaChartPie, FaDollarSign, FaExchangeAlt } from 'react-icons/fa';

// Define interfaces for our data
interface CostData {
  category: string;
  planned: number;
  actual: number;
  variance: number;
  percentage: number;
}

interface MonthlyCost {
  month: string;
  personnel: number;
  equipment: number;
  facility: number;
  materials: number;
  services: number;
}

const CostAnalysis: React.FC = () => {
  // Sample data for demonstration
  const [costData, setCostData] = useState<CostData[]>([
    {
      category: 'Personnel',
      planned: 250000,
      actual: 275000,
      variance: 25000,
      percentage: 110
    },
    {
      category: 'Equipment',
      planned: 150000,
      actual: 145000,
      variance: -5000,
      percentage: 97
    },
    {
      category: 'Facilities',
      planned: 100000,
      actual: 105000,
      variance: 5000,
      percentage: 105
    },
    {
      category: 'Materials',
      planned: 75000,
      actual: 70000,
      variance: -5000,
      percentage: 93
    },
    {
      category: 'Services',
      planned: 120000,
      actual: 135000,
      variance: 15000,
      percentage: 113
    }
  ]);

  // Monthly cost data
  const [monthlyCosts, setMonthlyCosts] = useState<MonthlyCost[]>([
    { month: 'Jan', personnel: 42000, equipment: 25000, facility: 18000, materials: 12000, services: 22000 },
    { month: 'Feb', personnel: 45000, equipment: 23000, facility: 17000, materials: 10000, services: 25000 },
    { month: 'Mar', personnel: 47000, equipment: 24000, facility: 18000, materials: 13000, services: 24000 },
    { month: 'Apr', personnel: 44000, equipment: 25000, facility: 17000, materials: 12000, services: 21000 },
    { month: 'May', personnel: 48000, equipment: 24000, facility: 17000, materials: 11000, services: 20000 },
    { month: 'Jun', personnel: 49000, equipment: 24000, facility: 18000, materials: 12000, services: 23000 }
  ]);

  // State for filter
  const [timeframe, setTimeframe] = useState('ytd');

  // Calculate total costs
  const totalPlanned = costData.reduce((sum, item) => sum + item.planned, 0);
  const totalActual = costData.reduce((sum, item) => sum + item.actual, 0);
  const totalVariance = totalActual - totalPlanned;
  const totalPercentage = Math.round((totalActual / totalPlanned) * 100);

  // Calculate totals by month
  const monthlyTotals = monthlyCosts.map(month => {
    return {
      month: month.month,
      total: month.personnel + month.equipment + month.facility + month.materials + month.services
    };
  });

  // Get variance color
  const getVarianceColor = (variance: number) => {
    if (variance > 0) return 'text-red-600';
    if (variance < 0) return 'text-green-600';
    return 'text-gray-600';
  };

  // Get percentage color
  const getPercentageColor = (percentage: number) => {
    if (percentage > 105) return 'text-red-600';
    if (percentage < 95) return 'text-green-600';
    return 'text-gray-600';
  };

  return (
    <div className="bg-gray-50 p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Cost Analysis</h1>
        
        {/* Time Period Filter */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
          <div className="flex space-x-2">
            <button 
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                timeframe === 'mtd' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setTimeframe('mtd')}
            >
              Month to Date
            </button>
            <button 
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                timeframe === 'qtd' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setTimeframe('qtd')}
            >
              Quarter to Date
            </button>
            <button 
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                timeframe === 'ytd' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setTimeframe('ytd')}
            >
              Year to Date
            </button>
          </div>
          
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center text-sm">
            <FaDownload className="mr-2" /> Export
          </button>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-1">Total Planned</h2>
            <div className="text-3xl font-bold text-gray-900">${(totalPlanned/1000).toFixed(0)}K</div>
            <div className="mt-2 text-sm text-gray-500">
              Total planned verification costs
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-1">Total Actual</h2>
            <div className="text-3xl font-bold text-gray-900">${(totalActual/1000).toFixed(0)}K</div>
            <div className="mt-2 text-sm text-gray-500">
              Total actual verification costs
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-1">Variance</h2>
            <div className={`text-3xl font-bold ${getVarianceColor(totalVariance)}`}>
              {totalVariance > 0 ? '+' : ''}{(totalVariance/1000).toFixed(0)}K
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Difference between actual and planned
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-1">% of Plan</h2>
            <div className={`text-3xl font-bold ${getPercentageColor(totalPercentage)}`}>
              {totalPercentage}%
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Actual costs as % of planned
            </div>
          </div>
        </div>
        
        {/* Cost Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
          {/* Category Cost Details */}
          <div className="lg:col-span-3 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Cost Breakdown by Category</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Planned
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actual
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Variance
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      % of Plan
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {costData.map((item) => (
                    <tr key={item.category} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        ${item.planned.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        ${item.actual.toLocaleString()}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-right ${getVarianceColor(item.variance)}`}>
                        {item.variance > 0 ? '+' : ''}{item.variance.toLocaleString()}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-right ${getPercentageColor(item.percentage)}`}>
                        {item.percentage}%
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      Total
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">
                      ${totalPlanned.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">
                      ${totalActual.toLocaleString()}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold text-right ${getVarianceColor(totalVariance)}`}>
                      {totalVariance > 0 ? '+' : ''}{totalVariance.toLocaleString()}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold text-right ${getPercentageColor(totalPercentage)}`}>
                      {totalPercentage}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Cost Distribution */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Cost Distribution</h2>
            
            <div className="flex flex-col space-y-4">
              {costData.map((item) => (
                <div key={item.category} className="flex flex-col">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">{item.category}</span>
                    <span className="text-sm font-medium">${(item.actual/1000).toFixed(0)}K ({Math.round((item.actual / totalActual) * 100)}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full"
                      style={{ 
                        width: `${(item.actual / totalActual) * 100}%`,
                        backgroundColor: getCategoryColor(item.category)
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-md font-medium mb-3">Planned vs. Actual</h3>
              <div className="flex items-center justify-center space-x-8">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full border-8 border-blue-500 flex items-center justify-center">
                    <span className="text-lg font-bold">${(totalPlanned/1000).toFixed(0)}K</span>
                  </div>
                  <span className="mt-2 text-sm text-gray-600">Planned</span>
                </div>
                
                <FaExchangeAlt className="text-gray-400 text-xl" />
                
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full border-8 border-green-500 flex items-center justify-center">
                    <span className="text-lg font-bold">${(totalActual/1000).toFixed(0)}K</span>
                  </div>
                  <span className="mt-2 text-sm text-gray-600">Actual</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Monthly Cost Trends */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Monthly Cost Trends</h2>
            <div className="flex items-center space-x-2">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center text-sm">
                <FaChartBar className="mr-2" /> Bar
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center text-sm">
                <FaChartPie className="mr-2" /> Pie
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center text-sm">
                <FaDownload className="mr-2" /> Export
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Total Costs */}
            <div>
              <h3 className="text-md font-medium mb-3">Total Monthly Costs</h3>
              <div className="h-64 flex items-end space-x-2">
                {monthlyTotals.map((month, index) => (
                  <div key={month.month} className="flex flex-col items-center flex-1">
                    <div 
                      className="w-full bg-blue-500 rounded-t"
                      style={{ 
                        height: `${(month.total / Math.max(...monthlyTotals.map(m => m.total))) * 100}%`,
                        backgroundColor: `rgba(59, 130, 246, ${0.5 + (index / monthlyTotals.length) * 0.5})`
                      }}
                    ></div>
                    <div className="text-xs font-medium mt-2">{month.month}</div>
                    <div className="text-xs text-gray-500">${(month.total/1000).toFixed(0)}K</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Monthly Cost Breakdown */}
            <div>
              <h3 className="text-md font-medium mb-3">Cost Breakdown by Month</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Month
                      </th>
                      <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Personnel
                      </th>
                      <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Equipment
                      </th>
                      <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Facility
                      </th>
                      <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Materials
                      </th>
                      <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Services
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {monthlyCosts.map((item) => (
                      <tr key={item.month} className="hover:bg-gray-50">
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.month}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900 text-right">
                          ${(item.personnel/1000).toFixed(0)}K
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900 text-right">
                          ${(item.equipment/1000).toFixed(0)}K
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900 text-right">
                          ${(item.facility/1000).toFixed(0)}K
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900 text-right">
                          ${(item.materials/1000).toFixed(0)}K
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900 text-right">
                          ${(item.services/1000).toFixed(0)}K
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get colors for categories
function getCategoryColor(category: string) {
  switch (category) {
    case 'Personnel':
      return '#3B82F6'; // blue-500
    case 'Equipment':
      return '#10B981'; // emerald-500 
    case 'Facilities':
      return '#8B5CF6'; // violet-500
    case 'Materials':
      return '#F59E0B'; // amber-500
    case 'Services':
      return '#EC4899'; // pink-500
    default:
      return '#6B7280'; // gray-500
  }
}

export default CostAnalysis; 