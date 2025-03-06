import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';
import * as AiIcons from 'react-icons/ai';
import * as GoIcons from 'react-icons/go';
import * as BsIcons from 'react-icons/bs';

// Define interface for analysis activities
interface AnalysisActivity {
  id: string;
  name: string;
  description: string;
  type: 'Structural' | 'Thermal' | 'Fluid' | 'Electrical' | 'Software' | 'Performance' | 'Other';
  status: 'Planned' | 'In Progress' | 'Completed' | 'Blocked' | 'Cancelled';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  requirements: string[];
  analyst: string;
  startDate: string | null;
  completionDate: string | null;
  methodology: string;
  tools: string[];
  inputs: {
    id: string;
    name: string;
    description: string;
    source: string;
  }[];
  assumptions: string[];
  results: {
    id: string;
    name: string;
    description: string;
    value: string;
    status: 'Pass' | 'Fail' | 'Inconclusive' | 'Not Run';
    date: string | null;
  }[];
  artifacts: string[];
  reviewStatus: 'Not Reviewed' | 'In Review' | 'Approved' | 'Rejected';
  reviewer: string | null;
}

const Analysis: React.FC = () => {
  // Sample analysis activities data
  const [analyses] = useState<AnalysisActivity[]>([
    {
      id: 'ANL-001',
      name: 'Wing Structural Load Analysis',
      description: 'Finite element analysis of wing structure under maximum load conditions.',
      type: 'Structural',
      status: 'Completed',
      priority: 'High',
      requirements: ['REQ-STR-001', 'REQ-STR-002', 'REQ-STR-005'],
      analyst: 'Dr. James Wilson',
      startDate: '2023-01-10',
      completionDate: '2023-01-25',
      methodology: 'Finite Element Analysis using non-linear material models',
      tools: ['ANSYS 2022', 'MATLAB R2022b'],
      inputs: [
        { id: 'INP-001', name: 'Material Properties', description: 'Material property database for all structural components', source: 'Materials Engineering Database' },
        { id: 'INP-002', name: 'Load Cases', description: '15 load cases representing critical flight conditions', source: 'Flight Loads Analysis Report ANL-FL-003' }
      ],
      assumptions: [
        'Linear elastic behavior up to yield point',
        'Temperature effects neglected (ambient conditions)',
        'Manufacturing tolerances set to nominal values'
      ],
      results: [
        { id: 'RES-001', name: 'Maximum Von Mises Stress', description: 'Peak stress under extreme load case 3', value: '460 MPa', status: 'Pass', date: '2023-01-20' },
        { id: 'RES-002', name: 'Wing Tip Deflection', description: 'Maximum deflection at wing tip under load case 7', value: '1.2 m', status: 'Pass', date: '2023-01-22' },
        { id: 'RES-003', name: 'Fatigue Life Estimation', description: 'Estimated fatigue life under typical usage profile', value: '25,000 flight hours', status: 'Pass', date: '2023-01-23' }
      ],
      artifacts: ['wing_fem_report.pdf', 'analysis_model_files.zip', 'results_summary.xlsx'],
      reviewStatus: 'Approved',
      reviewer: 'Dr. Sarah Chen'
    },
    {
      id: 'ANL-002',
      name: 'Propulsion System Performance Analysis',
      description: 'Analysis of engine performance across flight envelope.',
      type: 'Performance',
      status: 'In Progress',
      priority: 'Critical',
      requirements: ['REQ-PROP-001', 'REQ-PROP-002', 'REQ-PERF-005'],
      analyst: 'Emily Davis',
      startDate: '2023-02-15',
      completionDate: null,
      methodology: 'Computational Fluid Dynamics and Engine Cycle Analysis',
      tools: ['NPSS v2.8', 'FLUENT 2022', 'Python 3.9'],
      inputs: [
        { id: 'INP-001', name: 'Engine Specifications', description: 'Technical data for engine model XYZ-35B', source: 'Manufacturer Technical Data Package' },
        { id: 'INP-002', name: 'Flight Conditions', description: 'Atmospheric conditions across flight envelope', source: 'Mission Profile Document MP-328' }
      ],
      assumptions: [
        'Ideal gas behavior',
        'Standard atmospheric conditions',
        'Nominal manufacturing tolerances'
      ],
      results: [
        { id: 'RES-001', name: 'Thrust at Sea Level', description: 'Maximum thrust at sea level static conditions', value: '85.6 kN', status: 'Pass', date: '2023-02-20' },
        { id: 'RES-002', name: 'Fuel Consumption at Cruise', description: 'Specific fuel consumption at cruise altitude', value: '0.65 kg/kN-hr', status: 'Not Run', date: null }
      ],
      artifacts: ['preliminary_results.pdf'],
      reviewStatus: 'Not Reviewed',
      reviewer: null
    },
    {
      id: 'ANL-003',
      name: 'Avionics Cooling System Thermal Analysis',
      description: 'Thermal analysis of the avionics bay cooling system under worst-case conditions.',
      type: 'Thermal',
      status: 'Completed',
      priority: 'Medium',
      requirements: ['REQ-THERM-001', 'REQ-THERM-003', 'REQ-AVI-008'],
      analyst: 'Robert Johnson',
      startDate: '2023-01-05',
      completionDate: '2023-01-18',
      methodology: 'Computational Fluid Dynamics coupled with thermal resistance network',
      tools: ['FLUENT 2022', 'Thermal Desktop v6.0'],
      inputs: [
        { id: 'INP-001', name: 'Avionics Heat Loads', description: 'Heat generation data for all avionics components', source: 'Avionics System Integration Document' },
        { id: 'INP-002', name: 'Environmental Conditions', description: 'External temperature profiles for all flight phases', source: 'Environmental Control System Specification' }
      ],
      assumptions: [
        'Steady-state conditions for each flight phase',
        'No radiation heat transfer considered',
        'Fans operating at specified RPM throughout'
      ],
      results: [
        { id: 'RES-001', name: 'Maximum Component Temperature', description: 'Highest temperature of any avionics component', value: '72°C', status: 'Pass', date: '2023-01-15' },
        { id: 'RES-002', name: 'Cooling Air Flow Rate', description: 'Mass flow rate of cooling air in main duct', value: '0.35 kg/s', status: 'Pass', date: '2023-01-16' },
        { id: 'RES-003', name: 'Temperature Margin', description: 'Margin between component temp and max allowable', value: '18°C', status: 'Pass', date: '2023-01-17' }
      ],
      artifacts: ['thermal_analysis_report.pdf', 'cfd_results.zip'],
      reviewStatus: 'Approved',
      reviewer: 'Dr. Michael Lee'
    },
    {
      id: 'ANL-004',
      name: 'Flight Control System Software Analysis',
      description: 'Static and dynamic analysis of flight control software algorithms.',
      type: 'Software',
      status: 'Planned',
      priority: 'High',
      requirements: ['REQ-FCS-001', 'REQ-FCS-002', 'REQ-FCS-003', 'REQ-SW-007'],
      analyst: 'David Kim',
      startDate: '2023-04-10',
      completionDate: null,
      methodology: 'Static code analysis, formal methods verification, and simulation testing',
      tools: ['LDRA Testbed', 'MATLAB Simulink', 'Polyspace Code Prover'],
      inputs: [
        { id: 'INP-001', name: 'Software Requirements', description: 'Software requirements specification document', source: 'FCS Software Requirements Specification v2.1' },
        { id: 'INP-002', name: 'Source Code', description: 'Flight control software source code', source: 'Software Repository (tag: v1.2.5)' }
      ],
      assumptions: [
        'Input signals within specified ranges',
        'Processor timing characteristics per specification',
        'Hardware interfaces functioning correctly'
      ],
      results: [],
      artifacts: ['analysis_plan.pdf'],
      reviewStatus: 'Not Reviewed',
      reviewer: null
    }
  ]);

  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisActivity | null>(null);

  // Filter analyses based on search term, status, and type
  const filteredAnalyses = analyses.filter(analysis => {
    const matchesSearch = 
      analysis.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      analysis.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      analysis.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      analysis.requirements.some(req => req.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'All' || analysis.status === statusFilter;
    const matchesType = typeFilter === 'All' || analysis.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Helper function for status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Planned': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Blocked': return 'bg-red-100 text-red-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function for type badge
  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'Structural': return 'bg-purple-100 text-purple-800';
      case 'Thermal': return 'bg-orange-100 text-orange-800';
      case 'Fluid': return 'bg-blue-100 text-blue-800';
      case 'Electrical': return 'bg-yellow-100 text-yellow-800';
      case 'Software': return 'bg-indigo-100 text-indigo-800';
      case 'Performance': return 'bg-green-100 text-green-800';
      case 'Other': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function for priority badge
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function for review status badge
  const getReviewStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'In Review': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Not Reviewed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function for result status badge
  const getResultStatusBadge = (status: string) => {
    switch (status) {
      case 'Pass': return 'bg-green-100 text-green-800';
      case 'Fail': return 'bg-red-100 text-red-800';
      case 'Inconclusive': return 'bg-yellow-100 text-yellow-800';
      case 'Not Run': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      {selectedAnalysis ? (
        // Detailed view of selected analysis
        <div>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <button 
                className="p-2 bg-gray-100 rounded-full mr-3"
                onClick={() => setSelectedAnalysis(null)}
              >
                <BiIcons.BiArrowBack />
              </button>
              <h2 className="text-2xl font-bold">{selectedAnalysis.name}</h2>
            </div>
            <div className="flex space-x-2">
              <span className={`px-3 py-1 rounded text-sm font-medium ${getStatusBadge(selectedAnalysis.status)}`}>
                {selectedAnalysis.status}
              </span>
              <span className={`px-3 py-1 rounded text-sm font-medium ${getTypeBadge(selectedAnalysis.type)}`}>
                {selectedAnalysis.type}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3 text-gray-700">Details</h3>
              <div className="space-y-2">
                <p><span className="font-medium">ID:</span> {selectedAnalysis.id}</p>
                <p><span className="font-medium">Analyst:</span> {selectedAnalysis.analyst}</p>
                <p><span className="font-medium">Start Date:</span> {selectedAnalysis.startDate || 'Not scheduled'}</p>
                <p><span className="font-medium">Completion:</span> {selectedAnalysis.completionDate || 'In progress'}</p>
                <p><span className="font-medium">Priority:</span> 
                  <span className={`ml-2 px-2 py-0.5 rounded text-xs font-medium ${getPriorityBadge(selectedAnalysis.priority)}`}>
                    {selectedAnalysis.priority}
                  </span>
                </p>
                <p><span className="font-medium">Review Status:</span> 
                  <span className={`ml-2 px-2 py-0.5 rounded text-xs font-medium ${getReviewStatusBadge(selectedAnalysis.reviewStatus)}`}>
                    {selectedAnalysis.reviewStatus}
                  </span>
                </p>
                {selectedAnalysis.reviewer && <p><span className="font-medium">Reviewer:</span> {selectedAnalysis.reviewer}</p>}
              </div>
            </div>

            <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 text-gray-700">Description</h3>
              <p className="mb-4">{selectedAnalysis.description}</p>
              
              <h3 className="font-semibold mt-4 mb-2 text-gray-700">Requirements</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedAnalysis.requirements.map((req, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm">
                    {req}
                  </span>
                ))}
              </div>
              
              <h3 className="font-semibold mt-4 mb-2 text-gray-700">Methodology</h3>
              <p className="mb-4">{selectedAnalysis.methodology}</p>
              
              <h3 className="font-semibold mt-4 mb-2 text-gray-700">Tools</h3>
              <div className="flex flex-wrap gap-2">
                {selectedAnalysis.tools.map((tool, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {selectedAnalysis.inputs.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Analysis Inputs</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                  <thead>
                    <tr className="bg-gray-100 border-b">
                      <th className="py-2 px-4 text-left">ID</th>
                      <th className="py-2 px-4 text-left">Name</th>
                      <th className="py-2 px-4 text-left">Description</th>
                      <th className="py-2 px-4 text-left">Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedAnalysis.inputs.map((input) => (
                      <tr key={input.id} className="border-b">
                        <td className="py-2 px-4">{input.id}</td>
                        <td className="py-2 px-4">{input.name}</td>
                        <td className="py-2 px-4">{input.description}</td>
                        <td className="py-2 px-4">{input.source}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {selectedAnalysis.assumptions.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Assumptions</h3>
              <ul className="list-disc pl-5 space-y-1">
                {selectedAnalysis.assumptions.map((assumption, index) => (
                  <li key={index}>{assumption}</li>
                ))}
              </ul>
            </div>
          )}

          {selectedAnalysis.results.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Results</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                  <thead>
                    <tr className="bg-gray-100 border-b">
                      <th className="py-2 px-4 text-left">ID</th>
                      <th className="py-2 px-4 text-left">Name</th>
                      <th className="py-2 px-4 text-left">Description</th>
                      <th className="py-2 px-4 text-left">Value</th>
                      <th className="py-2 px-4 text-left">Status</th>
                      <th className="py-2 px-4 text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedAnalysis.results.map((result) => (
                      <tr key={result.id} className="border-b">
                        <td className="py-2 px-4">{result.id}</td>
                        <td className="py-2 px-4">{result.name}</td>
                        <td className="py-2 px-4">{result.description}</td>
                        <td className="py-2 px-4 font-mono">{result.value}</td>
                        <td className="py-2 px-4">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${getResultStatusBadge(result.status)}`}>
                            {result.status}
                          </span>
                        </td>
                        <td className="py-2 px-4">{result.date || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {selectedAnalysis.artifacts.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Artifacts</h3>
              <div className="space-y-2">
                {selectedAnalysis.artifacts.map((artifact, index) => (
                  <div key={index} className="border rounded-lg p-3 flex items-center">
                    <FaIcons.FaFile className="text-blue-500 mr-2" />
                    <span>{artifact}</span>
                    <button className="ml-auto text-blue-600 hover:text-blue-800">
                      <FaIcons.FaDownload />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        // List view of all analyses
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h2 className="text-2xl font-bold mb-4 sm:mb-0">Analysis Verification Activities</h2>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
              onClick={() => { /* Add new analysis activity functionality */ }}
            >
              <FaIcons.FaPlus className="mr-2" />
              Add Analysis
            </button>
          </div>

          <div className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search analyses..."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="absolute right-3 top-2 text-gray-400">
                  <FaIcons.FaSearch />
                </span>
              </div>
            </div>
            <div>
              <select
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Planned">Planned</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Blocked">Blocked</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <select
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="All">All Analysis Types</option>
                <option value="Structural">Structural</option>
                <option value="Thermal">Thermal</option>
                <option value="Fluid">Fluid</option>
                <option value="Electrical">Electrical</option>
                <option value="Software">Software</option>
                <option value="Performance">Performance</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Stats summary */}
          <div className="mb-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="text-blue-800 text-lg font-semibold">{analyses.length}</div>
              <div className="text-blue-600 text-sm">Total Analyses</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <div className="text-green-800 text-lg font-semibold">
                {analyses.filter(a => a.status === 'Completed').length}
              </div>
              <div className="text-green-600 text-sm">Completed</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
              <div className="text-yellow-800 text-lg font-semibold">
                {analyses.filter(a => a.status === 'In Progress').length}
              </div>
              <div className="text-yellow-600 text-sm">In Progress</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="text-blue-800 text-lg font-semibold">
                {analyses.filter(a => a.status === 'Planned').length}
              </div>
              <div className="text-blue-600 text-sm">Planned</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
              <div className="text-red-800 text-lg font-semibold">
                {analyses.filter(a => a.status === 'Blocked' || a.status === 'Cancelled').length}
              </div>
              <div className="text-red-600 text-sm">Blocked/Cancelled</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <div className="text-green-800 text-lg font-semibold">
                {analyses.filter(a => a.reviewStatus === 'Approved').length}
              </div>
              <div className="text-green-600 text-sm">Approved</div>
            </div>
          </div>

          {/* Analyses list */}
          <div className="grid grid-cols-1 gap-4">
            {filteredAnalyses.length > 0 ? (
              filteredAnalyses.map(analysis => (
                <div 
                  key={analysis.id} 
                  className="border rounded-lg overflow-hidden hover:shadow-md cursor-pointer transition-shadow"
                  onClick={() => setSelectedAnalysis(analysis)}
                >
                  <div className="bg-gray-50 p-4 border-b flex justify-between items-center flex-wrap gap-2">
                    <div className="font-bold flex items-center">
                      <span>{analysis.id}</span>
                      {analysis.priority === 'Critical' && (
                        <span className="ml-2 text-red-600" title="Critical Priority">
                          <FaIcons.FaExclamationCircle />
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(analysis.status)}`}>
                        {analysis.status}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeBadge(analysis.type)}`}>
                        {analysis.type}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getReviewStatusBadge(analysis.reviewStatus)}`}>
                        {analysis.reviewStatus}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{analysis.name}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityBadge(analysis.priority)}`}>
                        {analysis.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{analysis.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div className="text-sm">
                        <span className="font-medium">Analyst:</span> {analysis.analyst}
                      </div>
                      
                      <div className="text-sm">
                        <span className="font-medium">Start Date:</span> {analysis.startDate || 'Not scheduled'}
                      </div>
                      
                      <div className="text-sm">
                        <span className="font-medium">Completion:</span> {analysis.completionDate || 'In progress'}
                      </div>
                    </div>

                    <div className="text-sm mb-3">
                      <span className="font-medium">Methodology:</span> {analysis.methodology.length > 100 ? analysis.methodology.substring(0, 100) + '...' : analysis.methodology}
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {analysis.requirements.map((req, index) => (
                        <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                          {req}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-y-2 justify-between">
                      <div className="flex items-center text-sm text-gray-600">
                        <BiIcons.BiFile className="mr-1" />
                        {analysis.artifacts.length} artifact{analysis.artifacts.length !== 1 ? 's' : ''}
                      </div>
                      
                      {analysis.results.length > 0 && (
                        <div className="flex items-center text-sm">
                          <GoIcons.GoChecklist className="mr-1" />
                          Results: 
                          <span className="ml-1 text-green-600">{analysis.results.filter(r => r.status === 'Pass').length} pass</span>
                          {analysis.results.filter(r => r.status === 'Fail').length > 0 && (
                            <span className="ml-1 text-red-600">{analysis.results.filter(r => r.status === 'Fail').length} fail</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <AiIcons.AiOutlineInbox className="text-6xl mx-auto mb-4" />
                <p>No analysis activities found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Analysis; 