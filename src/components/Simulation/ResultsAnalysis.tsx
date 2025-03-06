import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as BsIcons from 'react-icons/bs';

// Sample result data types
interface SimulationResult {
  runId: string;
  runName: string;
  modelName: string;
  date: string;
  parameters: {
    name: string;
    value: string;
    unit?: string;
  }[];
  metrics: {
    name: string;
    values: number[];
    timestamps: string[];
    unit?: string;
    min: number;
    max: number;
    mean: number;
    status: 'Pass' | 'Fail' | 'Warning' | 'N/A';
  }[];
  requirements: {
    id: string;
    name: string;
    threshold: string;
    actualValue: string;
    status: 'Pass' | 'Fail' | 'Warning' | 'N/A';
  }[];
}

const ResultsAnalysis: React.FC = () => {
  // Sample simulation results data
  const [results] = useState<SimulationResult[]>([
    {
      runId: 'SIM-RUN-001',
      runName: 'Aerodynamic Performance - Baseline Config',
      modelName: 'Aerodynamic Performance Model',
      date: '2023-05-10',
      parameters: [
        { name: 'Airspeed', value: '250', unit: 'knots' },
        { name: 'Altitude', value: '10000', unit: 'ft' },
        { name: 'Temperature', value: '15', unit: '°C' }
      ],
      metrics: [
        {
          name: 'Lift Coefficient',
          values: [1.2, 1.25, 1.32, 1.35, 1.33, 1.32, 1.31, 1.3, 1.28],
          timestamps: ['0', '10', '20', '30', '40', '50', '60', '70', '80'],
          min: 1.2,
          max: 1.35,
          mean: 1.29,
          status: 'Pass'
        },
        {
          name: 'Drag Coefficient',
          values: [0.085, 0.086, 0.087, 0.089, 0.09, 0.09, 0.088, 0.087, 0.086],
          timestamps: ['0', '10', '20', '30', '40', '50', '60', '70', '80'],
          min: 0.085,
          max: 0.09,
          mean: 0.088,
          status: 'Pass'
        },
        {
          name: 'L/D Ratio',
          values: [14.1, 14.5, 15.2, 15.1, 14.8, 14.7, 14.9, 14.9, 14.9],
          timestamps: ['0', '10', '20', '30', '40', '50', '60', '70', '80'],
          min: 14.1,
          max: 15.2,
          mean: 14.8,
          status: 'Pass'
        }
      ],
      requirements: [
        {
          id: 'SR-001',
          name: 'Min Lift Coefficient',
          threshold: 'CL > 1.0',
          actualValue: '1.29 (mean)',
          status: 'Pass'
        },
        {
          id: 'SR-009',
          name: 'Max Drag Coefficient',
          threshold: 'CD < 0.1',
          actualValue: '0.09 (max)',
          status: 'Pass'
        }
      ]
    },
    {
      runId: 'SIM-RUN-002',
      runName: 'Structural Load Case #1',
      modelName: 'Structural Integrity Model',
      date: '2023-05-11',
      parameters: [
        { name: 'Load Factor', value: '4.5', unit: 'g' },
        { name: 'Gust Velocity', value: '50', unit: 'ft/s' }
      ],
      metrics: [
        {
          name: 'Max Stress',
          values: [350, 380, 410, 425, 423, 415, 400, 390, 380],
          timestamps: ['0', '10', '20', '30', '40', '50', '60', '70', '80'],
          min: 350,
          max: 425,
          mean: 397,
          status: 'Pass'
        },
        {
          name: 'Safety Factor',
          values: [1.5, 1.42, 1.35, 1.3, 1.31, 1.33, 1.38, 1.40, 1.45],
          timestamps: ['0', '10', '20', '30', '40', '50', '60', '70', '80'],
          min: 1.3,
          max: 1.5,
          mean: 1.38,
          status: 'Pass'
        },
        {
          name: 'Max Displacement',
          values: [30, 35, 40, 42, 45, 44, 42, 38, 35],
          timestamps: ['0', '10', '20', '30', '40', '50', '60', '70', '80'],
          unit: 'mm',
          min: 30,
          max: 45,
          mean: 39,
          status: 'Warning'
        }
      ],
      requirements: [
        {
          id: 'SR-003',
          name: 'Max Structural Stress',
          threshold: '< 450 MPa',
          actualValue: '425 MPa (max)',
          status: 'Pass'
        },
        {
          id: 'SR-015',
          name: 'Minimum Safety Factor',
          threshold: 'SF > 1.25',
          actualValue: '1.3 (min)',
          status: 'Pass'
        },
        {
          id: 'SR-016',
          name: 'Max Displacement',
          threshold: '< 40 mm',
          actualValue: '45 mm (max)',
          status: 'Warning'
        }
      ]
    },
    {
      runId: 'SIM-RUN-004',
      runName: 'Avionics Integration Test',
      modelName: 'Avionics System Model',
      date: '2023-05-14',
      parameters: [
        { name: 'Software Version', value: '3.5.2' },
        { name: 'Test Scenario', value: 'Full Mission' }
      ],
      metrics: [
        {
          name: 'System Latency',
          values: [12, 13, 14, 15, 14, 13, 12, 15, 14],
          timestamps: ['0', '10', '20', '30', '40', '50', '60', '70', '80'],
          unit: 'ms',
          min: 12,
          max: 15,
          mean: 13.5,
          status: 'Pass'
        },
        {
          name: 'Data Throughput',
          values: [110, 115, 120, 118, 117, 119, 120, 120, 118],
          timestamps: ['0', '10', '20', '30', '40', '50', '60', '70', '80'],
          unit: 'Mbps',
          min: 110,
          max: 120,
          mean: 117.4,
          status: 'Pass'
        },
        {
          name: 'Error Rate',
          values: [0.01, 0.02, 0.05, 0.04, 0.05, 0.05, 0.04, 0.03, 0.02],
          timestamps: ['0', '10', '20', '30', '40', '50', '60', '70', '80'],
          unit: '%',
          min: 0.01,
          max: 0.05,
          mean: 0.03,
          status: 'Fail'
        }
      ],
      requirements: [
        {
          id: 'SR-051',
          name: 'System Latency Requirement',
          threshold: '< 20 ms',
          actualValue: '15 ms (max)',
          status: 'Pass'
        },
        {
          id: 'SR-052',
          name: 'Min Data Throughput',
          threshold: '> 100 Mbps',
          actualValue: '110 Mbps (min)',
          status: 'Pass'
        },
        {
          id: 'SR-053',
          name: 'Maximum Error Rate',
          threshold: '< 0.01%',
          actualValue: '0.05% (max)',
          status: 'Fail'
        }
      ]
    }
  ]);

  // State for selected results to compare
  const [selectedResults, setSelectedResults] = useState<string[]>(['SIM-RUN-001']);
  const [selectedMetric, setSelectedMetric] = useState<string>('');
  const [showComparison, setShowComparison] = useState<boolean>(false);

  // Helper functions
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pass':
        return 'bg-green-100 text-green-800';
      case 'Fail':
        return 'bg-red-100 text-red-800';
      case 'Warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'N/A':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get all available metrics from the first result (assuming all results have the same metrics)
  const getAvailableMetrics = () => {
    if (results.length === 0) return [];
    return results[0].metrics.map(metric => metric.name);
  };

  // Get filtered results based on selection
  const getFilteredResults = () => {
    return results.filter(result => selectedResults.includes(result.runId));
  };

  // Toggle result selection
  const toggleResultSelection = (runId: string) => {
    if (selectedResults.includes(runId)) {
      setSelectedResults(selectedResults.filter(id => id !== runId));
    } else {
      setSelectedResults([...selectedResults, runId]);
    }
  };

  // Draw a simple chart (this would be replaced with a proper charting library in a real app)
  const drawChart = (metric: string) => {
    const filteredResults = getFilteredResults();
    
    return (
      <div className="h-64 p-4 bg-white rounded-lg border">
        <div className="text-center text-lg font-medium mb-2">{metric} Over Time</div>
        
        {/* This is a placeholder for a real chart component */}
        <div className="h-48 flex items-end justify-around relative">
          {/* Y-axis label */}
          <div className="absolute -left-2 bottom-0 h-full flex items-center">
            <div className="transform -rotate-90 text-xs text-gray-500">Value</div>
          </div>
          
          {/* X-axis label */}
          <div className="absolute bottom-0 left-0 w-full text-center text-xs text-gray-500">Time</div>
          
          {/* Chart grid lines */}
          <div className="absolute inset-0">
            <div className="border-b border-gray-200 h-1/4"></div>
            <div className="border-b border-gray-200 h-1/4"></div>
            <div className="border-b border-gray-200 h-1/4"></div>
            <div className="border-b border-gray-200 h-1/4"></div>
          </div>
          
          {/* Fake chart lines */}
          {filteredResults.map((result, idx) => {
            const metricData = result.metrics.find(m => m.name === metric);
            if (!metricData) return null;
            
            // Generate a random color based on index
            const colors = ['blue', 'red', 'green', 'purple', 'orange'];
            const color = colors[idx % colors.length];
            
            return (
              <div key={result.runId} className="relative h-full flex-grow mx-1">
                <div className={`absolute bottom-0 left-0 right-0 h-3/4 border-t-2 border-${color}-500 bg-${color}-100 bg-opacity-20`}></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs">
                  <div className={`w-3 h-3 rounded-full bg-${color}-500 mx-auto mb-1`}></div>
                  <span className="text-xs">{result.runName.substring(0, 10)}...</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center text-xs text-gray-500 mt-4">Note: This is a placeholder chart. In a real application, use a proper charting library like Recharts.</div>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold mb-3 sm:mb-0">Simulation Results Analysis</h2>
        <div className="flex space-x-2">
          <button 
            className={`${showComparison ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'} px-4 py-2 rounded hover:bg-blue-700 hover:text-white flex items-center`}
            onClick={() => setShowComparison(!showComparison)}
          >
            <FaIcons.FaChartLine className="mr-2" />
            {showComparison ? 'Hide Comparison' : 'Compare Results'}
          </button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 flex items-center">
            <FaIcons.FaFileExport className="mr-2" />
            Export Analysis
          </button>
        </div>
      </div>

      {/* Results Selection for Comparison */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Select Simulation Results to Analyze</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map(result => (
            <div 
              key={result.runId}
              className={`p-4 border rounded-lg cursor-pointer ${selectedResults.includes(result.runId) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
              onClick={() => toggleResultSelection(result.runId)}
            >
              <div className="flex items-start">
                <div className={`mt-1 mr-3 ${selectedResults.includes(result.runId) ? 'text-blue-500' : 'text-gray-400'}`}>
                  {selectedResults.includes(result.runId) ? (
                    <FaIcons.FaCheckSquare className="text-lg" />
                  ) : (
                    <FaIcons.FaSquare className="text-lg" />
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-blue-600">{result.runName}</h4>
                  <p className="text-sm text-gray-600">{result.modelName}</p>
                  <p className="text-xs text-gray-500">Run ID: {result.runId} | Date: {result.date}</p>
                  
                  <div className="mt-2 flex flex-wrap gap-1">
                    {result.requirements.map(req => (
                      <span 
                        key={req.id}
                        className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(req.status)}`}
                      >
                        {req.id}: {req.status}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison View */}
      {showComparison && selectedResults.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Results Comparison</h3>
            <select 
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
            >
              <option value="">Select Metric to Compare...</option>
              {getAvailableMetrics().map(metric => (
                <option key={metric} value={metric}>{metric}</option>
              ))}
            </select>
          </div>
          
          {selectedMetric ? (
            // Chart view
            drawChart(selectedMetric)
          ) : (
            // Prompt to select metric
            <div className="text-center py-12 bg-gray-50 rounded-lg border">
              <BsIcons.BsBarChartLine className="mx-auto text-gray-400 text-5xl mb-4" />
              <h3 className="text-xl font-medium text-gray-800 mb-2">Select a metric to compare</h3>
              <p className="text-gray-500">Choose a metric from the dropdown above to see a comparison chart</p>
            </div>
          )}
          
          {/* Comparison Table */}
          {selectedMetric && (
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="py-3 px-4 text-left font-medium text-gray-600">Simulation Run</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-600">Min</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-600">Max</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-600">Mean</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {getFilteredResults().map(result => {
                    const metricData = result.metrics.find(m => m.name === selectedMetric);
                    if (!metricData) return null;
                    
                    return (
                      <tr key={result.runId} className="border-b">
                        <td className="py-3 px-4">
                          <div className="font-medium">{result.runName}</div>
                          <div className="text-xs text-gray-500">{result.runId}</div>
                        </td>
                        <td className="py-3 px-4">
                          {metricData.min} {metricData.unit}
                        </td>
                        <td className="py-3 px-4">
                          {metricData.max} {metricData.unit}
                        </td>
                        <td className="py-3 px-4">
                          {metricData.mean} {metricData.unit}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(metricData.status)}`}>
                            {metricData.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Detailed Results */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Detailed Analysis</h3>
        
        {selectedResults.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border">
            <AiIcons.AiOutlineInbox className="mx-auto text-gray-400 text-5xl mb-4" />
            <h3 className="text-xl font-medium text-gray-800 mb-2">No results selected</h3>
            <p className="text-gray-500">Select one or more simulation results to view detailed analysis</p>
          </div>
        ) : (
          <div className="space-y-6">
            {getFilteredResults().map(result => (
              <div key={result.runId} className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-4 border-b">
                  <h4 className="text-lg font-semibold text-blue-600">{result.runName}</h4>
                  <p className="text-sm text-gray-600">Model: {result.modelName} | Run Date: {result.date}</p>
                </div>
                
                <div className="p-4">
                  {/* Simulation Parameters */}
                  <div className="mb-6">
                    <h5 className="font-semibold text-gray-700 mb-2">Simulation Parameters</h5>
                    <div className="bg-gray-50 p-3 rounded border">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {result.parameters.map((param, index) => (
                          <div key={index} className="p-2">
                            <div className="text-xs text-gray-500">{param.name}</div>
                            <div className="font-medium">
                              {param.value} {param.unit}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Requirements Verification */}
                  <div className="mb-6">
                    <h5 className="font-semibold text-gray-700 mb-2">Requirements Verification</h5>
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border">
                        <thead>
                          <tr className="bg-gray-50 border-b">
                            <th className="py-2 px-4 text-left font-medium text-gray-600">Requirement</th>
                            <th className="py-2 px-4 text-left font-medium text-gray-600">Threshold</th>
                            <th className="py-2 px-4 text-left font-medium text-gray-600">Actual Value</th>
                            <th className="py-2 px-4 text-left font-medium text-gray-600">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.requirements.map((req, index) => (
                            <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                              <td className="py-2 px-4">
                                <div className="font-medium">{req.name}</div>
                                <div className="text-xs text-gray-500">{req.id}</div>
                              </td>
                              <td className="py-2 px-4">{req.threshold}</td>
                              <td className="py-2 px-4">{req.actualValue}</td>
                              <td className="py-2 px-4">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(req.status)}`}>
                                  {req.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  {/* Metrics Summary */}
                  <div>
                    <h5 className="font-semibold text-gray-700 mb-2">Metrics Summary</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {result.metrics.map((metric, index) => (
                        <div key={index} className={`p-4 rounded-lg border ${getStatusBadge(metric.status)}`}>
                          <h6 className="font-semibold mb-2">{metric.name}</h6>
                          <div className="grid grid-cols-3 gap-2 text-sm">
                            <div>
                              <div className="text-xs text-gray-600">Min</div>
                              <div className="font-medium">{metric.min} {metric.unit}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-600">Max</div>
                              <div className="font-medium">{metric.max} {metric.unit}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-600">Mean</div>
                              <div className="font-medium">{metric.mean} {metric.unit}</div>
                            </div>
                          </div>
                          <div className="mt-3 text-right">
                            <button 
                              className="text-blue-600 text-sm hover:text-blue-800"
                              onClick={() => {
                                setSelectedMetric(metric.name);
                                setShowComparison(true);
                              }}
                            >
                              View Details →
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 border-t flex justify-end">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm flex items-center mr-2">
                    <FaIcons.FaFileExport className="mr-1" /> Export
                  </button>
                  <button className="bg-green-600 text-white px-3 py-1 rounded text-sm flex items-center">
                    <FaIcons.FaFilePdf className="mr-1" /> Generate Report
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsAnalysis; 