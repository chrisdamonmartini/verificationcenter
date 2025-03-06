import React, { useState } from 'react';
import { FaSearchPlus, FaEdit, FaTrash, FaPlus, FaFilter, FaFileDownload, FaFileUpload } from 'react-icons/fa';
import { BiCheckCircle, BiError } from 'react-icons/bi';
import { motion } from 'framer-motion';

// Define interfaces for our verification strategy data
interface VerificationActivity {
  id: string;
  name: string;
  description: string;
  type: 'Test' | 'Analysis' | 'Demonstration' | 'Inspection' | 'Simulation';
  status: 'Planned' | 'In Progress' | 'Completed' | 'Blocked' | 'Cancelled';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  requirements: string[];
  assignee: string;
  startDate: string | null;
  endDate: string | null;
  dependencies: string[];
  resources: string[];
  risks: {
    id: string;
    description: string;
    impact: 'Low' | 'Medium' | 'High';
    mitigation: string;
  }[];
  rationale: string;
  notes: string;
}

interface VerificationPhase {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  activities: string[]; // IDs of activities in this phase
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Delayed';
  completion: number; // Percentage complete
}

const VerificationStrategy: React.FC = () => {
  // Sample data for demonstration
  const [phases, setPhases] = useState<VerificationPhase[]>([
    {
      id: 'phase-1',
      name: 'Preliminary Design Verification',
      description: 'Verification activities during the preliminary design phase',
      startDate: '2023-01-15',
      endDate: '2023-03-30',
      activities: ['act-1', 'act-2', 'act-3'],
      status: 'Completed',
      completion: 100
    },
    {
      id: 'phase-2',
      name: 'Critical Design Verification',
      description: 'Verification activities during the critical design phase',
      startDate: '2023-04-01',
      endDate: '2023-07-15',
      activities: ['act-4', 'act-5', 'act-6', 'act-7'],
      status: 'In Progress',
      completion: 65
    },
    {
      id: 'phase-3',
      name: 'Integration Verification',
      description: 'Verification during system integration',
      startDate: '2023-07-16',
      endDate: '2023-10-30',
      activities: ['act-8', 'act-9'],
      status: 'Not Started',
      completion: 0
    },
    {
      id: 'phase-4',
      name: 'Qualification Verification',
      description: 'Final qualification verification activities',
      startDate: '2023-11-01',
      endDate: '2024-02-28',
      activities: ['act-10', 'act-11', 'act-12'],
      status: 'Not Started',
      completion: 0
    }
  ]);

  const [activities, setActivities] = useState<VerificationActivity[]>([
    {
      id: 'act-1',
      name: 'Requirements Analysis Review',
      description: 'Review of requirements to ensure verifiability',
      type: 'Analysis',
      status: 'Completed',
      priority: 'High',
      requirements: ['REQ-001', 'REQ-002', 'REQ-003', 'REQ-004'],
      assignee: 'John Smith',
      startDate: '2023-01-15',
      endDate: '2023-01-30',
      dependencies: [],
      resources: ['Systems Engineering Team'],
      risks: [
        {
          id: 'risk-1',
          description: 'Incomplete requirements documentation',
          impact: 'High',
          mitigation: 'Early stakeholder engagement and documentation review'
        }
      ],
      rationale: 'Ensure all requirements are verifiable before proceeding with design',
      notes: 'Completed on schedule, all requirements reviewed and approved'
    },
    {
      id: 'act-2',
      name: 'Preliminary Analysis Models',
      description: 'Development of initial analysis models for performance verification',
      type: 'Simulation',
      status: 'Completed',
      priority: 'Medium',
      requirements: ['REQ-005', 'REQ-006'],
      assignee: 'Emily Chen',
      startDate: '2023-02-01',
      endDate: '2023-03-15',
      dependencies: ['act-1'],
      resources: ['Analysis Team', 'High-Performance Computing'],
      risks: [
        {
          id: 'risk-2',
          description: 'Model accuracy issues',
          impact: 'Medium',
          mitigation: 'Validate with existing test data'
        }
      ],
      rationale: 'Enable early performance assessment before hardware is available',
      notes: 'Models completed and validated against legacy system data'
    },
    {
      id: 'act-4',
      name: 'Critical Design Analysis',
      description: 'Detailed analysis of the critical design',
      type: 'Analysis',
      status: 'In Progress',
      priority: 'Critical',
      requirements: ['REQ-007', 'REQ-008', 'REQ-009'],
      assignee: 'David Wong',
      startDate: '2023-04-01',
      endDate: '2023-05-15',
      dependencies: ['act-2'],
      resources: ['Analysis Team', 'Design Team'],
      risks: [
        {
          id: 'risk-3',
          description: 'Design changes during analysis',
          impact: 'Medium',
          mitigation: 'Freeze design before starting analysis'
        }
      ],
      rationale: 'Verify design meets all performance requirements',
      notes: 'Analysis at 65% completion, preliminary results satisfactory'
    },
    {
      id: 'act-5',
      name: 'Structural Test Planning',
      description: 'Development of structural test plans',
      type: 'Test',
      status: 'Planned',
      priority: 'High',
      requirements: ['REQ-010', 'REQ-011'],
      assignee: 'Sarah Johnson',
      startDate: '2023-05-01',
      endDate: null,
      dependencies: ['act-4'],
      resources: ['Test Engineering', 'Facilities'],
      risks: [
        {
          id: 'risk-4',
          description: 'Test facility availability',
          impact: 'High',
          mitigation: 'Book facility well in advance'
        }
      ],
      rationale: 'Prepare for structural qualification testing',
      notes: 'Waiting for analysis completion before finalizing test plan'
    }
  ]);

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [phaseFilter, setPhaseFilter] = useState<string | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<VerificationActivity | null>(null);

  // Filtered activities
  const filteredActivities = activities
    .filter(activity => 
      (searchTerm === '' || 
        activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.requirements.some(req => req.toLowerCase().includes(searchTerm.toLowerCase()))
      ) &&
      (typeFilter === null || activity.type === typeFilter) &&
      (statusFilter === null || activity.status === statusFilter) &&
      (priorityFilter === null || activity.priority === priorityFilter) &&
      (phaseFilter === null || phases.find(p => p.id === phaseFilter)?.activities.includes(activity.id) || false) &&
      (selectedPhase === null || phases.find(p => p.id === selectedPhase)?.activities.includes(activity.id) || false)
    );

  // Helper functions for UI elements
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Planned': return 'bg-purple-100 text-purple-800';
      case 'Blocked': return 'bg-red-100 text-red-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
      case 'Not Started': return 'bg-gray-100 text-gray-800';
      case 'Delayed': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Test': return 'bg-blue-100 text-blue-800';
      case 'Analysis': return 'bg-purple-100 text-purple-800';
      case 'Demonstration': return 'bg-green-100 text-green-800';
      case 'Inspection': return 'bg-yellow-100 text-yellow-800';
      case 'Simulation': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Handlers
  const handleSelectPhase = (phaseId: string) => {
    setSelectedPhase(phaseId === selectedPhase ? null : phaseId);
    setSelectedActivity(null);
  };

  const handleSelectActivity = (activity: VerificationActivity) => {
    setSelectedActivity(activity);
  };

  const handleCloseActivityDetail = () => {
    setSelectedActivity(null);
  };

  return (
    <div className="bg-gray-50 p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Verification Strategy</h1>
        
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Verification Approach</h2>
          <p className="text-gray-700 mb-4">
            This verification strategy outlines the approach for verifying system requirements through a combination 
            of analysis, test, demonstration, inspection, and simulation methods. The verification activities are organized 
            into phases aligned with the system development lifecycle.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-medium text-blue-800 mb-2">Verification Principles</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Early verification to identify issues</li>
                <li>Progressive verification throughout lifecycle</li>
                <li>Analysis before test when possible</li>
                <li>Risk-based verification prioritization</li>
                <li>Reuse of verification results when applicable</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-medium text-green-800 mb-2">Key Metrics</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Requirements verification coverage</li>
                <li>Verification activities completion rate</li>
                <li>Issues identified per verification activity</li>
                <li>Verification resource utilization</li>
                <li>Schedule performance index</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Verification Phases</h2>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {phases.map(phase => (
              <div 
                key={phase.id}
                onClick={() => handleSelectPhase(phase.id)}
                className={`bg-white p-4 rounded-lg shadow-md cursor-pointer transition-all ${
                  selectedPhase === phase.id ? 'ring-2 ring-blue-500 transform scale-[1.02]' : 'hover:shadow-lg'
                }`}
              >
                <h3 className="font-semibold text-gray-900">{phase.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{phase.startDate} to {phase.endDate}</p>
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(phase.status)}`}>
                    {phase.status}
                  </span>
                  <span className="text-sm font-medium text-gray-700">{phase.completion}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className={`h-2 rounded-full ${phase.status === 'Completed' ? 'bg-green-500' : 'bg-blue-500'}`}
                    style={{ width: `${phase.completion}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600">{phase.activities.length} activities</p>
              </div>
            ))}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-xl font-semibold mb-2 md:mb-0">Verification Activities</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search activities, requirements..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="absolute left-3 top-2.5 text-gray-400">
                <FaSearchPlus />
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                className="border border-gray-300 rounded-md p-2 w-full text-sm"
                value={typeFilter || ''}
                onChange={(e) => setTypeFilter(e.target.value === '' ? null : e.target.value)}
              >
                <option value="">All Types</option>
                <option value="Test">Test</option>
                <option value="Analysis">Analysis</option>
                <option value="Demonstration">Demonstration</option>
                <option value="Inspection">Inspection</option>
                <option value="Simulation">Simulation</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                className="border border-gray-300 rounded-md p-2 w-full text-sm"
                value={statusFilter || ''}
                onChange={(e) => setStatusFilter(e.target.value === '' ? null : e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="Planned">Planned</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Blocked">Blocked</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                className="border border-gray-300 rounded-md p-2 w-full text-sm"
                value={priorityFilter || ''}
                onChange={(e) => setPriorityFilter(e.target.value === '' ? null : e.target.value)}
              >
                <option value="">All Priorities</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phase</label>
              <select
                className="border border-gray-300 rounded-md p-2 w-full text-sm"
                value={phaseFilter || ''}
                onChange={(e) => setPhaseFilter(e.target.value === '' ? null : e.target.value)}
              >
                <option value="">All Phases</option>
                {phases.map(phase => (
                  <option key={phase.id} value={phase.id}>{phase.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button 
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-md flex items-center text-sm transition-colors"
                onClick={() => {
                  setSearchTerm('');
                  setTypeFilter(null);
                  setStatusFilter(null);
                  setPriorityFilter(null);
                  setPhaseFilter(null);
                }}
              >
                <FaFilter className="mr-2" /> Reset Filters
              </button>
            </div>
          </div>

          {/* Activities Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requirements</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredActivities.length > 0 ? (
                  filteredActivities.map((activity) => (
                    <tr key={activity.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleSelectActivity(activity)}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activity.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{activity.name}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{activity.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(activity.type)}`}>
                          {activity.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(activity.status)}`}>
                          {activity.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(activity.priority)}`}>
                          {activity.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {activity.requirements.slice(0, 3).map((req) => (
                            <span key={req} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                              {req}
                            </span>
                          ))}
                          {activity.requirements.length > 3 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                              +{activity.requirements.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.assignee}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3" onClick={(e) => {
                          e.stopPropagation();
                          // Edit functionality would go here
                        }}>
                          <FaEdit />
                        </button>
                        <button className="text-red-600 hover:text-red-900" onClick={(e) => {
                          e.stopPropagation();
                          // Delete functionality would go here
                        }}>
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">
                      No verification activities found matching the criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Activity Count Summary */}
          <div className="mt-4 flex flex-wrap gap-4">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{filteredActivities.length}</span> of <span className="font-medium">{activities.length}</span> activities
            </div>
            <div className="flex gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {activities.filter(a => a.status === 'Completed').length} Completed
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {activities.filter(a => a.status === 'In Progress').length} In Progress
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                {activities.filter(a => a.status === 'Planned').length} Planned
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                {activities.filter(a => a.status === 'Blocked').length} Blocked
              </span>
            </div>
          </div>
        </div>

        {/* Add Activity Button */}
        <div className="fixed bottom-8 right-8">
          <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-colors">
            <FaPlus className="text-xl" />
          </button>
        </div>

        {/* Activity Detail Modal */}
        {selectedActivity && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={handleCloseActivityDetail}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedActivity.name}</h2>
                    <div className="text-sm text-gray-500 mt-1">ID: {selectedActivity.id}</div>
                  </div>
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedActivity.status)}`}>
                      {selectedActivity.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTypeColor(selectedActivity.type)}`}>
                      {selectedActivity.type}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(selectedActivity.priority)}`}>
                      {selectedActivity.priority}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-700">{selectedActivity.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Details</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-500 text-sm">Assignee:</span>
                        <span className="text-gray-900 ml-2">{selectedActivity.assignee}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 text-sm">Start Date:</span>
                        <span className="text-gray-900 ml-2">{selectedActivity.startDate || 'Not set'}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 text-sm">End Date:</span>
                        <span className="text-gray-900 ml-2">{selectedActivity.endDate || 'Not set'}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 text-sm">Dependencies:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedActivity.dependencies.length > 0 ? (
                            selectedActivity.dependencies.map((dep) => (
                              <span key={dep} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                {dep}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-400 text-xs">None</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500 text-sm">Resources:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedActivity.resources.length > 0 ? (
                            selectedActivity.resources.map((resource) => (
                              <span key={resource} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                {resource}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-400 text-xs">None</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                    <div className="space-y-2">
                      {selectedActivity.requirements.map((req) => (
                        <div key={req} className="p-2 bg-gray-50 rounded border border-gray-200">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">{req}</span>
                            <span className="text-blue-600 hover:text-blue-800 text-xs cursor-pointer">View</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {selectedActivity.risks.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Risks</h3>
                    <div className="space-y-2">
                      {selectedActivity.risks.map((risk) => (
                        <div key={risk.id} className="p-3 bg-red-50 rounded border border-red-200">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="font-medium">{risk.description}</div>
                              <div className="text-sm mt-1">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                  risk.impact === 'High' ? 'bg-red-100 text-red-800' :
                                  risk.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-green-100 text-green-800'
                                }`}>
                                  {risk.impact} Impact
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-2 text-sm">
                            <span className="text-gray-500">Mitigation:</span>
                            <span className="text-gray-700 ml-2">{risk.mitigation}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Rationale</h3>
                  <p className="text-gray-700">{selectedActivity.rationale}</p>
                </div>

                {selectedActivity.notes && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Notes</h3>
                    <p className="text-gray-700">{selectedActivity.notes}</p>
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button 
                    className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                    onClick={handleCloseActivityDetail}
                  >
                    Close
                  </button>
                  <button className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none">
                    Edit
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default VerificationStrategy; 