import React, { useState } from 'react';
import { Mission, Aircraft } from '../types';
import { format, isToday, isPast, isFuture, addDays, differenceInHours, differenceInMinutes, isSameDay } from 'date-fns';
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';
import * as MdIcons from 'react-icons/md';
import { motion } from 'framer-motion';

interface MissionScheduleProps {
  missions: Mission[];
  aircraft?: Aircraft[];
}

// Helper function to get time remaining until mission
const getTimeToMission = (startTimeStr?: string): string => {
  if (!startTimeStr) return 'Unknown';
  
  const startTime = new Date(startTimeStr);
  const now = new Date();
  
  const hoursRemaining = differenceInHours(startTime, now);
  if (hoursRemaining > 24) {
    const days = Math.floor(hoursRemaining / 24);
    return `${days} day${days > 1 ? 's' : ''} remaining`;
  } else if (hoursRemaining > 0) {
    const minutes = differenceInMinutes(startTime, now) % 60;
    return `${hoursRemaining}h ${minutes}m remaining`;
  } else {
    return 'Mission in progress/overdue';
  }
};

const MissionSchedule: React.FC<MissionScheduleProps> = ({ missions, aircraft = [] }) => {
  const [timeFilter, setTimeFilter] = useState<'all' | 'past' | 'today' | 'future'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'calendar' | 'timeline'>('list');
  const [selectedAircraftId, setSelectedAircraftId] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  
  // Filter missions based on time, aircraft, and priority
  const filteredMissions = missions.filter(mission => {
    const startDate = mission.startTime ? new Date(mission.startTime) : new Date();
    
    // Time filter
    let passesTimeFilter = true;
    switch (timeFilter) {
      case 'past':
        passesTimeFilter = isPast(startDate) && !isToday(startDate);
        break;
      case 'today':
        passesTimeFilter = isToday(startDate);
        break;
      case 'future':
        passesTimeFilter = isFuture(startDate);
        break;
    }
    
    // Aircraft filter
    const passesAircraftFilter = selectedAircraftId ? mission.aircraftId === selectedAircraftId : true;
    
    // Priority filter
    const passesPriorityFilter = priorityFilter ? mission.priority === priorityFilter : true;
    
    return passesTimeFilter && passesAircraftFilter && passesPriorityFilter;
  });

  // Sort by start time
  filteredMissions.sort((a, b) => {
    const aTime = a.startTime ? new Date(a.startTime).getTime() : 0;
    const bTime = b.startTime ? new Date(b.startTime).getTime() : 0;
    return aTime - bTime;
  });
  
  // Generate calendar days (for calendar view)
  const calendarDays = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));
  
  // Count missions by status
  const completedCount = missions.filter(m => m.status === 'Completed').length;
  const inProgressCount = missions.filter(m => m.status === 'In Progress').length;
  const scheduledCount = missions.filter(m => m.status === 'Scheduled').length;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const cancelledCount = filteredMissions.filter(m => m.status === 'Cancelled').length;
  
  // Get available priority levels from missions
  const priorityLevels = Array.from(new Set(missions.map(m => m.priority).filter(Boolean)));

  // Render mission item for list view
  const renderMissionItem = (mission: Mission) => (
    <motion.div 
      key={mission.id} 
      className="border-b border-gray-200 pb-3 mb-3 last:border-b-0 last:mb-0 last:pb-0"
      whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
      onClick={() => setSelectedMission(mission)}
    >
      <div className="flex justify-between">
        <div>
          <h3 className="font-medium">{mission.name}</h3>
          <p className="text-sm text-gray-600">
            Aircraft: {mission.aircraftId}
            {aircraft.length > 0 && ` - ${aircraft.find(a => a.id === mission.aircraftId)?.tailNumber || ''}`}
          </p>
        </div>
        <div className={`text-sm px-2 py-1 rounded h-fit ${
          mission.status === 'Completed' ? 'bg-green-100 text-green-800' :
          mission.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
          mission.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {mission.status}
        </div>
      </div>
      
      <div className="flex justify-between mt-2 text-sm">
        <div>
          <div className="text-gray-600">Start: {mission.startTime ? format(new Date(mission.startTime), 'MMM d, yyyy h:mm a') : 'TBD'}</div>
          <div className="text-gray-600">End: {mission.endTime ? format(new Date(mission.endTime), 'MMM d, yyyy h:mm a') : 'TBD'}</div>
        </div>
        <div className={`px-2 py-1 rounded self-start ${
          mission.priority === 'Critical' ? 'bg-red-100 text-red-800' :
          mission.priority === 'High' ? 'bg-orange-100 text-orange-800' :
          mission.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {mission.priority} Priority
        </div>
      </div>
      
      {mission.status === 'Scheduled' && (
        <div className="mt-2 text-xs text-gray-500">
          Time to mission: {mission.startTime ? getTimeToMission(mission.startTime) : 'Unknown'}
        </div>
      )}
      
      <div className="mt-3 flex gap-2">
        <button className="text-blue-600 hover:text-blue-800">
          <BiIcons.BiDetail />
        </button>
        {mission.status !== 'Completed' && mission.status !== 'Cancelled' && (
          <>
            <button className="text-green-600 hover:text-green-800">
              <FaIcons.FaEdit />
            </button>
            <button className="text-red-600 hover:text-red-800">
              <MdIcons.MdCancel />
            </button>
          </>
        )}
      </div>
    </motion.div>
  );

  // Render calendar view
  const renderCalendarView = () => (
    <div>
      <div className="grid grid-cols-7 gap-2 mb-4">
        {calendarDays.map((day, index) => (
          <div key={index} className="text-center">
            <div className={`mb-1 font-medium ${isToday(day) ? 'text-blue-600' : ''}`}>
              {format(day, 'EEE')}
            </div>
            <div className={`text-lg mb-2 ${isToday(day) ? 'bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mx-auto text-blue-800' : ''}`}>
              {format(day, 'd')}
            </div>
            
            {/* Count of missions for this day */}
            {(() => {
              const dayMissions = filteredMissions.filter(m => 
                m.startTime && isSameDay(new Date(m.startTime), day)
              );
              if (dayMissions.length === 0) return <div className="text-xs text-gray-400">No missions</div>;
              return (
                <div 
                  className={`text-xs px-2 py-1 rounded-full 
                    ${dayMissions.some(m => m.priority === 'Critical') ? 'bg-red-100 text-red-800' : 
                      dayMissions.some(m => m.priority === 'High') ? 'bg-orange-100 text-orange-800' : 
                      'bg-blue-100 text-blue-800'}`
                  }
                >
                  {dayMissions.length} mission{dayMissions.length !== 1 ? 's' : ''}
                </div>
              );
            })()}
          </div>
        ))}
      </div>
      
      {/* Missions by day */}
      <div className="space-y-6">
        {calendarDays.map((day, dayIndex) => {
          const dayMissions = filteredMissions.filter(m => 
            m.startTime && isSameDay(new Date(m.startTime), day)
          );
          
          if (dayMissions.length === 0) return null;
          
          return (
            <div key={dayIndex} className="border-b pb-4 last:border-b-0 last:pb-0">
              <h3 className={`font-medium mb-2 ${isToday(day) ? 'text-blue-600' : ''}`}>
                {format(day, 'EEEE, MMMM d')}
                {isToday(day) && <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Today</span>}
              </h3>
              <div className="space-y-3">
                {dayMissions.map(renderMissionItem)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
  
  // Render timeline view
  const renderTimelineView = () => {
    if (filteredMissions.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          <FaIcons.FaCalendarTimes className="mx-auto text-4xl mb-3 text-gray-400" />
          <p>No missions found for selected filters</p>
        </div>
      );
    }

    return (
      <div className="relative pl-8">
        {filteredMissions.map((mission, index) => (
          <div key={mission.id} className="mb-6 relative">
            <div className="absolute left-[-30px] w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white">
              {index + 1}
            </div>
            <div className="absolute left-[-27px] bottom-[-20px] w-[2px] h-[calc(100%+10px)] bg-blue-200"></div>
            <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{mission.name}</h3>
                  <p className="text-sm text-gray-600">
                    {mission.startTime ? format(new Date(mission.startTime), 'MMM d, yyyy h:mm a') : 'TBD'}
                  </p>
                </div>
                <div className={`text-sm px-2 py-1 rounded ${
                  mission.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  mission.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  mission.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {mission.status}
                </div>
              </div>
              
              <div className="mt-2 text-sm">
                <div className="text-gray-600">
                  Aircraft: {aircraft.find(a => a.id === mission.aircraftId)?.tailNumber || mission.aircraftId}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Update the mission stats display at the top
  const renderMissionStats = () => (
    <div className="grid grid-cols-4 gap-3 mb-4">
      <div className="bg-blue-700 rounded-lg p-3 text-center">
        <div className="text-2xl font-bold text-white">{filteredMissions.length}</div>
        <div className="text-xs text-blue-100">Total</div>
      </div>
      <div className="bg-green-700 rounded-lg p-3 text-center">
        <div className="text-2xl font-bold text-white">{completedCount}</div>
        <div className="text-xs text-green-100">Completed</div>
      </div>
      <div className="bg-yellow-700 rounded-lg p-3 text-center">
        <div className="text-2xl font-bold text-white">{scheduledCount}</div>
        <div className="text-xs text-yellow-100">Scheduled</div>
      </div>
      <div className="bg-indigo-700 rounded-lg p-3 text-center">
        <div className="text-2xl font-bold text-white">{inProgressCount}</div>
        <div className="text-xs text-indigo-100">In Progress</div>
      </div>
    </div>
  );

  // Add the renderListView function after renderCalendarView
  const renderListView = () => {
    if (filteredMissions.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          <FaIcons.FaCalendarTimes className="mx-auto text-4xl mb-3 text-gray-400" />
          <p>No missions found for selected filters</p>
          <button 
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => {
              setTimeFilter('all');
              setSelectedAircraftId(null);
              setPriorityFilter(null);
            }}
          >
            Clear All Filters
          </button>
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        {filteredMissions.map(renderMissionItem)}
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <FaIcons.FaCalendarAlt className="text-3xl text-black mr-3" />
              <h1 className="text-2xl font-bold">Mission Schedule</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {missions.length} Total Missions
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              <button 
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                <BiIcons.BiListUl />
              </button>
              
              <button 
                className={`p-2 rounded ${viewMode === 'calendar' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                onClick={() => setViewMode('calendar')}
                title="Calendar View"
              >
                <BiIcons.BiCalendar />
              </button>
              
              <button 
                className={`p-2 rounded ${viewMode === 'timeline' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                onClick={() => setViewMode('timeline')}
                title="Timeline View"
              >
                <BiIcons.BiTimeFive />
              </button>
            </div>
          </div>
          
          {renderMissionStats()}
          
          <div className="flex justify-between mb-4">
            <div className="flex bg-gray-50 rounded-lg">
              <button 
                className={`px-3 py-1 rounded ${timeFilter === 'all' ? 'bg-blue-600 text-white' : ''}`}
                onClick={() => setTimeFilter('all')}
              >
                All
              </button>
              <button 
                className={`px-3 py-1 rounded ${timeFilter === 'past' ? 'bg-blue-600 text-white' : ''}`}
                onClick={() => setTimeFilter('past')}
              >
                Past
              </button>
              <button 
                className={`px-3 py-1 rounded ${timeFilter === 'today' ? 'bg-blue-600 text-white' : ''}`}
                onClick={() => setTimeFilter('today')}
              >
                Today
              </button>
              <button 
                className={`px-3 py-1 rounded ${timeFilter === 'future' ? 'bg-blue-600 text-white' : ''}`}
                onClick={() => setTimeFilter('future')}
              >
                Future
              </button>
            </div>
            
            <div className="flex space-x-2">
              <select 
                className="bg-white border border-gray-300 rounded px-2 py-1 text-sm"
                value={selectedAircraftId || ''}
                onChange={(e) => setSelectedAircraftId(e.target.value || null)}
              >
                <option value="">All Aircraft</option>
                {aircraft.map(a => (
                  <option key={a.id} value={a.id}>{a.tailNumber}</option>
                ))}
              </select>
              
              <select 
                className="bg-white border border-gray-300 rounded px-2 py-1 text-sm"
                value={priorityFilter || ''}
                onChange={(e) => setPriorityFilter(e.target.value || null)}
              >
                <option value="">All Priorities</option>
                {priorityLevels.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="max-h-[500px] overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
            {/* Mission content based on view mode */}
            {viewMode === 'list' && renderListView()}
            {viewMode === 'calendar' && renderCalendarView()}
            {viewMode === 'timeline' && renderTimelineView()}
          </div>
          
          {/* Mission Details Modal */}
          {selectedMission && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <motion.div 
                className="bg-white rounded-lg max-w-2xl w-full mx-4 overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="flex justify-between items-center border-b p-4">
                  <h3 className="text-lg font-bold">Mission Details</h3>
                  <button onClick={() => setSelectedMission(null)} className="text-gray-500 hover:text-gray-700">
                    <FaIcons.FaTimes />
                  </button>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium">{selectedMission.name}</h4>
                      {selectedMission.description && (
                        <p className="text-gray-600 mt-2">{selectedMission.description}</p>
                      )}
                      
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <span className={`px-2 py-0.5 rounded text-sm ${
                            selectedMission.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            selectedMission.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                            selectedMission.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {selectedMission.status}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Priority:</span>
                          <span className={`px-2 py-0.5 rounded text-sm ${
                            selectedMission.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                            selectedMission.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                            selectedMission.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {selectedMission.priority} Priority
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Aircraft:</span>
                          <span>{aircraft.find(a => a.id === selectedMission.aircraftId)?.tailNumber || selectedMission.aircraftId}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Time & Date</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Start:</span>
                          <span>
                            {selectedMission.startTime 
                              ? format(new Date(selectedMission.startTime), 'MMM d, yyyy h:mm a')
                              : 'TBD'
                            }
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">End:</span>
                          <span>
                            {selectedMission.endTime 
                              ? format(new Date(selectedMission.endTime), 'MMM d, yyyy h:mm a')
                              : 'TBD'
                            }
                          </span>
                        </div>
                        {selectedMission.duration && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Duration:</span>
                            <span>{selectedMission.duration} hours</span>
                          </div>
                        )}
                        
                        {selectedMission.status === 'Scheduled' && selectedMission.startTime && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Time Remaining:</span>
                            <span>{getTimeToMission(selectedMission.startTime)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t p-4 flex justify-end space-x-2">
                  <button 
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => setSelectedMission(null)}
                  >
                    Close
                  </button>
                  {selectedMission.status === 'Scheduled' && (
                    <>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        <FaIcons.FaEdit className="inline mr-1" /> Edit
                      </button>
                      <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                        <FaIcons.FaBan className="inline mr-1" /> Cancel
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MissionSchedule; 