import React, { useState } from 'react';
import { FaCalendarAlt, FaFilter, FaSearch, FaChevronLeft, FaChevronRight, FaList, FaThLarge } from 'react-icons/fa';

// Define interfaces for our schedule data
interface ScheduleItem {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  type: 'Test' | 'Analysis' | 'Demonstration' | 'Inspection' | 'Simulation';
  status: 'Planned' | 'In Progress' | 'Completed' | 'Delayed' | 'Cancelled';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  dependencies: string[];
  resources: string[];
  owner: string;
  milestone: boolean;
  description: string;
}

interface TimelineMonth {
  month: string;
  year: number;
  startDay: Date;
  endDay: Date;
}

const VerificationSchedule: React.FC = () => {
  // Sample data for demonstration
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([
    {
      id: 'SCH-001',
      name: 'Requirements Analysis',
      startDate: '2023-01-15',
      endDate: '2023-01-30',
      type: 'Analysis',
      status: 'Completed',
      priority: 'High',
      dependencies: [],
      resources: ['RES-001', 'RES-006'],
      owner: 'John Smith',
      milestone: false,
      description: 'Review and analysis of verification requirements'
    },
    {
      id: 'SCH-002',
      name: 'Preliminary Design Review',
      startDate: '2023-03-30',
      endDate: '2023-03-30',
      type: 'Analysis',
      status: 'Completed',
      priority: 'Critical',
      dependencies: ['SCH-001'],
      resources: ['RES-001', 'RES-003', 'RES-006'],
      owner: 'Sarah Johnson',
      milestone: true,
      description: 'Review of preliminary design and verification approach'
    },
    {
      id: 'SCH-003',
      name: 'Avionics Integration Tests',
      startDate: '2023-04-15',
      endDate: '2023-05-30',
      type: 'Test',
      status: 'In Progress',
      priority: 'High',
      dependencies: ['SCH-002'],
      resources: ['RES-001', 'RES-003'],
      owner: 'John Smith',
      milestone: false,
      description: 'Integration testing of avionics subsystems'
    },
    {
      id: 'SCH-004',
      name: 'Structural Analysis',
      startDate: '2023-04-01',
      endDate: '2023-05-15',
      type: 'Analysis',
      status: 'In Progress',
      priority: 'Medium',
      dependencies: ['SCH-002'],
      resources: ['RES-004', 'RES-006'],
      owner: 'David Wong',
      milestone: false,
      description: 'Structural analysis and modelling'
    },
    {
      id: 'SCH-005',
      name: 'Environmental Testing',
      startDate: '2023-06-01',
      endDate: '2023-06-15',
      type: 'Test',
      status: 'Planned',
      priority: 'High',
      dependencies: ['SCH-003', 'SCH-004'],
      resources: ['RES-002'],
      owner: 'Mia Rodriguez',
      milestone: false,
      description: 'Environmental stress testing of hardware'
    },
    {
      id: 'SCH-006',
      name: 'Critical Design Review',
      startDate: '2023-07-15',
      endDate: '2023-07-15',
      type: 'Analysis',
      status: 'Planned',
      priority: 'Critical',
      dependencies: ['SCH-003', 'SCH-004', 'SCH-005'],
      resources: ['RES-001', 'RES-003', 'RES-006'],
      owner: 'Sarah Johnson',
      milestone: true,
      description: 'Critical design review checkpoint'
    },
    {
      id: 'SCH-007',
      name: 'EMI/EMC Testing',
      startDate: '2023-08-01',
      endDate: '2023-08-31',
      type: 'Test',
      status: 'Planned',
      priority: 'Medium',
      dependencies: ['SCH-006'],
      resources: ['RES-005'],
      owner: 'John Smith',
      milestone: false,
      description: 'Electromagnetic interference/compatibility testing'
    },
    {
      id: 'SCH-008',
      name: 'Integration Verification',
      startDate: '2023-09-01',
      endDate: '2023-10-15',
      type: 'Test',
      status: 'Planned',
      priority: 'High',
      dependencies: ['SCH-006', 'SCH-007'],
      resources: ['RES-001', 'RES-003'],
      owner: 'Mia Rodriguez',
      milestone: false,
      description: 'System integration verification testing'
    },
    {
      id: 'SCH-009',
      name: 'Qualification Tests',
      startDate: '2023-10-16',
      endDate: '2023-11-30',
      type: 'Test',
      status: 'Planned',
      priority: 'Critical',
      dependencies: ['SCH-008'],
      resources: ['RES-001', 'RES-002', 'RES-003'],
      owner: 'David Wong',
      milestone: false,
      description: 'Final qualification testing'
    },
    {
      id: 'SCH-010',
      name: 'Verification Closure',
      startDate: '2023-12-15',
      endDate: '2023-12-15',
      type: 'Demonstration',
      status: 'Planned',
      priority: 'Critical',
      dependencies: ['SCH-009'],
      resources: ['RES-001', 'RES-006'],
      owner: 'Sarah Johnson',
      milestone: true,
      description: 'Final verification closure and review'
    }
  ]);
  
  // State for view options and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'timeline' | 'list'>('timeline');
  const [currentDateRange, setCurrentDateRange] = useState<{start: Date, end: Date}>({
    start: new Date(2023, 0, 1), // January 1, 2023
    end: new Date(2023, 11, 31)  // December 31, 2023
  });

  // Helper functions
  const getMonthsInRange = (startDate: Date, endDate: Date): TimelineMonth[] => {
    const months: TimelineMonth[] = [];
    
    let currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      const month = currentDate.toLocaleString('default', { month: 'short' });
      const year = currentDate.getFullYear();
      
      // Get first day of the month
      const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      
      // Get last day of the month
      const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      
      months.push({
        month,
        year,
        startDay: firstDay,
        endDay: lastDay
      });
      
      // Move to next month
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    
    return months;
  };

  const getMonthWidth = (month: TimelineMonth): number => {
    const daysInMonth = month.endDay.getDate();
    return daysInMonth * 3; // 3px per day
  };

  const calculateItemPosition = (item: ScheduleItem, timelineStart: Date, pixelsPerDay: number): { left: number, width: number } => {
    const startDate = new Date(item.startDate);
    const endDate = new Date(item.endDate);
    
    const daysDifferenceSinceStart = Math.max(0, Math.round((startDate.getTime() - timelineStart.getTime()) / (1000 * 60 * 60 * 24)));
    const durationDays = Math.max(1, Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1);
    
    return {
      left: daysDifferenceSinceStart * pixelsPerDay,
      width: durationDays * pixelsPerDay
    };
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Completed': return 'bg-green-100 border-green-600 text-green-800';
      case 'In Progress': return 'bg-blue-100 border-blue-600 text-blue-800';
      case 'Planned': return 'bg-gray-100 border-gray-600 text-gray-800';
      case 'Delayed': return 'bg-yellow-100 border-yellow-600 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 border-red-600 text-red-800';
      default: return 'bg-gray-100 border-gray-600 text-gray-800';
    }
  };

  const getTypeColor = (type: string): string => {
    switch (type) {
      case 'Test': return 'bg-blue-500';
      case 'Analysis': return 'bg-purple-500';
      case 'Demonstration': return 'bg-green-500';
      case 'Inspection': return 'bg-yellow-500';
      case 'Simulation': return 'bg-indigo-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter schedule items
  const filteredItems = scheduleItems.filter(item => {
    return (
      (searchTerm === '' || 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.owner.toLowerCase().includes(searchTerm.toLowerCase())
      ) &&
      (typeFilter === null || item.type === typeFilter) &&
      (statusFilter === null || item.status === statusFilter)
    );
  });

  // Timeline variables
  const timelineMonths = getMonthsInRange(currentDateRange.start, currentDateRange.end);
  const pixelsPerDay = 3;

  return (
    <div className="bg-gray-50 p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Verification Schedule</h1>
        
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Schedule Overview</h2>
          <p className="text-gray-700 mb-4">
            View and manage the verification schedule, including key milestones, tests, analyses, 
            and other verification activities.
          </p>
          
          {/* Schedule Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 flex flex-col items-center justify-center">
              <div className="text-xl font-semibold">{scheduleItems.length}</div>
              <div className="text-sm text-gray-600">Total Activities</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200 flex flex-col items-center justify-center">
              <div className="text-xl font-semibold">{scheduleItems.filter(i => i.status === 'Completed').length}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 flex flex-col items-center justify-center">
              <div className="text-xl font-semibold">{scheduleItems.filter(i => i.status === 'In Progress').length}</div>
              <div className="text-sm text-gray-600">In Progress</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 flex flex-col items-center justify-center">
              <div className="text-xl font-semibold">{scheduleItems.filter(i => i.status === 'Delayed').length}</div>
              <div className="text-sm text-gray-600">Delayed</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 flex flex-col items-center justify-center">
              <div className="text-xl font-semibold">{scheduleItems.filter(i => i.milestone).length}</div>
              <div className="text-sm text-gray-600">Milestones</div>
            </div>
          </div>
        </div>

        {/* Controls and filters */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <button 
                className={`px-3 py-2 rounded-md ${viewMode === 'timeline' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                onClick={() => setViewMode('timeline')}
              >
                <FaCalendarAlt className="inline mr-2" /> Timeline
              </button>
              <button 
                className={`px-3 py-2 rounded-md ${viewMode === 'list' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                onClick={() => setViewMode('list')}
              >
                <FaList className="inline mr-2" /> List
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search schedule..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="absolute left-3 top-2.5 text-gray-400">
                <FaSearch />
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Activity Type</label>
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
                <option value="Delayed">Delayed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div className="flex items-end">
              <button 
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-md flex items-center text-sm transition-colors"
                onClick={() => {
                  setSearchTerm('');
                  setTypeFilter(null);
                  setStatusFilter(null);
                }}
              >
                <FaFilter className="mr-2" /> Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Timeline View */}
        {viewMode === 'timeline' && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8 overflow-x-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Timeline View</h2>
              <div className="flex space-x-2">
                <button className="p-2 bg-gray-100 rounded hover:bg-gray-200">
                  <FaChevronLeft />
                </button>
                <span className="p-2">2023</span>
                <button className="p-2 bg-gray-100 rounded hover:bg-gray-200">
                  <FaChevronRight />
                </button>
              </div>
            </div>
            
            {/* Timeline Header */}
            <div className="relative min-w-max">
              <div className="flex border-b">
                <div className="w-64 flex-shrink-0 px-4 py-2 font-medium text-gray-700 border-r">
                  Activity
                </div>
                <div className="flex-grow flex">
                  {timelineMonths.map((month, index) => (
                    <div 
                      key={`${month.month}-${month.year}`} 
                      className="text-center font-medium text-gray-700 border-r px-2"
                      style={{ width: `${getMonthWidth(month)}px` }}
                    >
                      {month.month}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Timeline Rows */}
              <div className="min-w-max">
                {filteredItems.map((item) => {
                  const { left, width } = calculateItemPosition(item, currentDateRange.start, pixelsPerDay);
                  
                  return (
                    <div key={item.id} className="flex border-b hover:bg-gray-50">
                      <div className="w-64 flex-shrink-0 px-4 py-3 border-r flex items-center">
                        <div className={`w-3 h-3 rounded-full ${getTypeColor(item.type)} mr-2`}></div>
                        <div className="truncate">
                          <div className="font-medium text-gray-900 text-sm">{item.name}</div>
                          <div className="text-gray-500 text-xs">{item.id}</div>
                        </div>
                      </div>
                      <div className="flex-grow relative h-12">
                        <div 
                          className={`absolute top-2 h-8 rounded border ${item.milestone ? 'w-6 h-6 rounded-full flex items-center justify-center' : ''} ${getStatusColor(item.status)}`}
                          style={{ 
                            left: `${left}px`, 
                            width: item.milestone ? 'auto' : `${width}px`,
                            zIndex: item.milestone ? 2 : 1
                          }}
                          title={`${item.name} (${item.startDate} to ${item.endDate})`}
                        >
                          {!item.milestone && (
                            <div className="px-2 truncate text-xs font-medium whitespace-nowrap overflow-hidden">
                              {width > 100 ? item.name : ''}
                            </div>
                          )}
                          {item.milestone && (
                            <div className="text-xs">★</div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        
        {/* List View */}
        {viewMode === 'list' && (
          <div className="bg-white rounded-lg shadow-md mb-8 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timeline</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {item.milestone && (
                            <span className="mr-2 text-yellow-500">★</span>
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">{item.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>{item.startDate}</div>
                        <div>to</div>
                        <div>{item.endDate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full ${getTypeColor(item.type)} mr-2`}></div>
                          <span className="text-sm text-gray-900">{item.type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(item.priority)}`}>
                          {item.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.owner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationSchedule; 