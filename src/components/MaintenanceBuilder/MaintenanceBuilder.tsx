import React, { useState } from 'react';
import { 
  DragDropContext, 
  Droppable, 
  Draggable, 
  DroppableProvided, 
  DraggableProvided,
  DropResult 
} from '@hello-pangea/dnd';
import { format, addHours } from 'date-fns';
import * as FaIcons from 'react-icons/fa';
import { mockFaultIsolationProcedures, mockRepairProcedures, mockModKits, mockAircraftWithAnomalies } from '../../mockData';
import { FaultIsolationProcedure, RepairProcedure, ModKit, Aircraft, AircraftAnomaly, AircraftWithAnomalies } from '../../types';
import AircraftSelector from './AircraftSelector';

// Add more specific types
type TaskType = 'fault-isolation' | 'repair' | 'mod-kit';
type Severity = 'high' | 'medium' | 'low';

interface BaseTask {
  id: string;
  code: string;
  title: string;
  description: string;
  estimatedTime: number;
}

interface SystemRelatedTask extends BaseTask {
  relatedSystems: string[];
  requiredPersonnel: string[];
  equipment: string[];
}

interface MaintenanceTask {
  id: string;
  title: string;
  type: 'fault-isolation' | 'repair' | 'mod-kit';
  estimatedTime: number; // in hours
  description: string;
  priority: 'high' | 'medium' | 'low';
}

interface TimelineItem extends MaintenanceTask {
  startTime: Date;
  endTime: Date;
}

// Add new interface for time buffer
interface TimeBuffer {
  id: string;
  startTime: Date;
  duration: number; // in minutes
  afterTaskId: string; // Add reference to task
}

const MaintenanceBuilder: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'fault-isolation' | 'repair' | 'mod-kit'>('fault-isolation');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTasks, setSelectedTasks] = useState<TimelineItem[]>([]);
  const [availableTime] = useState({
    start: new Date('2024-02-28T08:19:00'),
    end: new Date('2024-02-28T16:15:00')
  });
  const [selectedAircraft, setSelectedAircraft] = useState<AircraftWithAnomalies | null>(null);
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [filterSystem, setFilterSystem] = useState<string>('all');
  const [searchAircraft, setSearchAircraft] = useState('');
  const [showAllAircraft, setShowAllAircraft] = useState(true);
  const [timeBuffers, setTimeBuffers] = useState<TimeBuffer[]>([]);
  const [columnWidths, setColumnWidths] = useState({
    code: 100,
    duration: 100,
    system: 120,
    task: 200,
    description: 400
  });
  const [resizing, setResizing] = useState<string | null>(null);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);

  // Mock data for aircraft with anomalies
  const aircraftWithAnomalies: AircraftWithAnomalies[] = [
    {
      id: '1',
      tailNumber: 'AF-12345',
      model: 'C-130J',
      status: 'Maintenance Required',
      location: 'Hangar A',
      nextMission: new Date('2024-02-29T10:00:00'),
      anomalies: [
        {
          id: 'a1',
          description: 'Hydraulic pressure fluctuation in main system',
          reportedAt: new Date('2024-02-28'),
          severity: 'high',
          system: 'Hydraulics'
        },
        {
          id: 'a2',
          description: 'Navigation system intermittent errors',
          reportedAt: new Date('2024-02-27'),
          severity: 'medium',
          system: 'Avionics'
        }
      ]
    },
    // Add more aircraft as needed
  ];

  // Helper function to convert procedures to MaintenanceTask
  const convertToMaintenanceTask = (
    item: FaultIsolationProcedure | RepairProcedure | ModKit,
    type: 'fault-isolation' | 'repair' | 'mod-kit'
  ): MaintenanceTask => ({
    id: item.id,
    title: item.title,
    type,
    estimatedTime: item.estimatedTime,
    description: item.description,
    priority: 'medium'
  });

  // Get tasks based on active tab
  const getTasksForActiveTab = (): MaintenanceTask[] => {
    switch (activeTab) {
      case 'fault-isolation':
        return mockFaultIsolationProcedures.map(p => convertToMaintenanceTask(p, 'fault-isolation'));
      case 'repair':
        return mockRepairProcedures.map(p => convertToMaintenanceTask(p, 'repair'));
      case 'mod-kit':
        return mockModKits.map(p => convertToMaintenanceTask(p, 'mod-kit'));
      default:
        return [];
    }
  };

  // Add task to timeline
  const addTaskToTimeline = (task: MaintenanceTask) => {
    // Find the first available time slot
    let startTime = new Date(availableTime.start);
    let isValidPosition = false;

    while (!isValidPosition) {
      isValidPosition = true;
      const endTime = new Date(startTime);
      endTime.setHours(endTime.getHours() + task.estimatedTime);

      // Check for overlaps with existing tasks
      for (const existingTask of selectedTasks) {
        if (
          (startTime >= existingTask.startTime && startTime < existingTask.endTime) ||
          (endTime > existingTask.startTime && endTime <= existingTask.endTime) ||
          (startTime <= existingTask.startTime && endTime >= existingTask.endTime)
        ) {
          // If overlap found, move start time to after the existing task
          startTime = new Date(existingTask.endTime);
          isValidPosition = false;
          break;
        }
      }
    }

    // Create new timeline item with calculated times and unique ID
    const timelineItem: TimelineItem = {
      ...task,
      id: `${task.id}-${Date.now()}`, // Add timestamp to make ID unique
      startTime,
      endTime: new Date(startTime.getTime() + task.estimatedTime * 60 * 60 * 1000)
    };

    // Add new task and sort by start time
    const newTasks = [...selectedTasks, timelineItem].sort((a, b) => 
      a.startTime.getTime() - b.startTime.getTime()
    );
    
    setSelectedTasks(newTasks);
  };

  // Timeline rendering
  const TimelineView = () => {
    // Constants for timeline layout
    const HOUR_HEIGHT = 60; // pixels per hour
    const TIMELINE_START = availableTime.start;
    const HOURS_TO_SHOW = 24;

    // Helper functions
    const getTimePosition = (time: Date) => {
      const diffInHours = (time.getTime() - TIMELINE_START.getTime()) / (1000 * 60 * 60);
      return diffInHours * HOUR_HEIGHT;
    };

    const isMidnight = (date: Date) => {
      return date.getHours() === 0 && date.getMinutes() === 0;
    };

    const getNextHour = (date: Date) => {
      const nextHour = new Date(date);
      nextHour.setHours(nextHour.getHours() + 1);
      nextHour.setMinutes(0);
      nextHour.setSeconds(0);
      nextHour.setMilliseconds(0);
      return nextHour;
    };

    const firstMarkerTime = getNextHour(TIMELINE_START);
    const hoursUntilEnd = Math.ceil((availableTime.end.getTime() - firstMarkerTime.getTime()) / (60 * 60 * 1000));

    // Add buffer handling functions
    const handleAddBuffer = (afterTaskIndex: number) => {
      const currentTask = selectedTasks[afterTaskIndex];
      
      // Find existing buffer or create new one
      const existingBufferIndex = timeBuffers.findIndex(
        buffer => buffer.afterTaskId === currentTask.id
      );

      if (existingBufferIndex >= 0) {
        // Update existing buffer
        const updatedBuffers = [...timeBuffers];
        updatedBuffers[existingBufferIndex].duration += 30;
        setTimeBuffers(updatedBuffers);
      } else {
        // Create new buffer
        const newBuffer: TimeBuffer = {
          id: `buffer-${Date.now()}`,
          startTime: new Date(currentTask.endTime),
          duration: 30,
          afterTaskId: currentTask.id
        };
        setTimeBuffers([...timeBuffers, newBuffer]);
      }

      // Update subsequent task times
      const updatedTasks = selectedTasks.map((task, index) => {
        if (index <= afterTaskIndex) return task;
        
        let newStartTime = new Date(task.startTime);
        newStartTime.setMinutes(newStartTime.getMinutes() + 30);
        
        let newEndTime = new Date(task.endTime);
        newEndTime.setMinutes(newEndTime.getMinutes() + 30);
        
        return { ...task, startTime: newStartTime, endTime: newEndTime };
      });

      setSelectedTasks(updatedTasks);
    };

    const handleRemoveBuffer = (afterTaskIndex: number) => {
      const currentTask = selectedTasks[afterTaskIndex];
      const bufferIndex = timeBuffers.findIndex(
        buffer => buffer.afterTaskId === currentTask.id
      );

      if (bufferIndex >= 0) {
        const buffer = timeBuffers[bufferIndex];
        const updatedBuffers = timeBuffers.filter((_, index) => index !== bufferIndex);
        setTimeBuffers(updatedBuffers);

        // Update subsequent task times
        const updatedTasks = selectedTasks.map((task, index) => {
          if (index <= afterTaskIndex) return task;
          
          let newStartTime = new Date(task.startTime);
          newStartTime.setMinutes(newStartTime.getMinutes() - buffer.duration);
          
          let newEndTime = new Date(task.endTime);
          newEndTime.setMinutes(newEndTime.getMinutes() - buffer.duration);
          
          return { ...task, startTime: newStartTime, endTime: newEndTime };
        });

        setSelectedTasks(updatedTasks);
      }
    };

    const onTimelineDragEnd = (result: DropResult) => {
      if (!result.destination) return;

      const items = Array.from(selectedTasks);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      // Recalculate times for all tasks and their buffers in the new order
      let currentTime = new Date(availableTime.start);
      const updatedItems = items.map((task, index) => {
        const startTime = new Date(currentTime);
        const endTime = new Date(startTime.getTime() + task.estimatedTime * 60 * 60 * 1000);
        
        // Update current time to end of task
        currentTime = new Date(endTime);
        
        // If there's a buffer after this task, add its duration
        const buffer = timeBuffers.find(b => b.afterTaskId === task.id);
        if (buffer && index < items.length - 1) {
          currentTime = new Date(currentTime.getTime() + buffer.duration * 60 * 1000);
          // Update buffer start time
          const updatedBuffer = {
            ...buffer,
            startTime: new Date(endTime)
          };
          timeBuffers.splice(timeBuffers.findIndex(b => b.id === buffer.id), 1, updatedBuffer);
        }

        return { ...task, startTime, endTime };
      });

      setSelectedTasks(updatedItems);
      setTimeBuffers([...timeBuffers]); // Trigger buffer update
    };

    // Add delete task function
    const handleDeleteTask = (taskId: string) => {
      setSelectedTasks(selectedTasks.filter(task => task.id !== taskId));
      // Also remove any associated buffers
      setTimeBuffers(timeBuffers.filter(buffer => buffer.afterTaskId !== taskId));
    };

    return (
      <div className="w-1/3">
        <Droppable droppableId="timeline">
          {(provided) => (
            <div 
              ref={provided.innerRef} 
              {...provided.droppableProps}
              className="relative h-[calc(100vh-200px)]"
            >
              {/* Scrollable container */}
              <div className="h-full overflow-y-auto">
                <div 
                  className="relative border-l-2 border-gray-300 ml-12 mr-4"
                  style={{ minHeight: `${HOUR_HEIGHT * HOURS_TO_SHOW}px` }}
                >
                  {/* Time markers */}
                  <div className="absolute left-0 top-0 bottom-0 w-12 -ml-12 bg-gray-50 z-30">
                    {Array.from({ length: HOURS_TO_SHOW }).map((_, i) => {
                      const markerTime = addHours(firstMarkerTime, i);
                      const markerPosition = getTimePosition(markerTime);
                      const isNewDay = isMidnight(markerTime);
                      
                      return (
                        <div 
                          key={i} 
                          className="absolute flex items-center"
                          style={{ 
                            top: `${markerPosition}px`, 
                            transform: 'translateY(-50%)'
                          }}
                        >
                          <div className="flex flex-col items-end">
                            {isNewDay && (
                              <span className="text-xs text-gray-500 font-medium mb-1">
                                {format(markerTime, 'MM/dd')}
                              </span>
                            )}
                            <span className="text-xs text-gray-500 w-8 text-right">
                              {format(markerTime, 'HH')}
                            </span>
                          </div>
                          <div className="w-2 h-px bg-gray-300 ml-1" />
                        </div>
                      );
                    })}
                  </div>

                  {/* Hour lines */}
                  <div className="absolute left-0 right-0 top-0 h-full pointer-events-none z-10">
                    {Array.from({ length: HOURS_TO_SHOW }).map((_, i) => {
                      const lineTime = addHours(firstMarkerTime, i);
                      const linePosition = getTimePosition(lineTime);
                      const isNewDay = isMidnight(lineTime);
                      
                      return (
                        <div
                          key={i}
                          className={`absolute left-0 right-0 border-t ${
                            isNewDay 
                              ? 'border-gray-300 border-t-2' 
                              : 'border-gray-200'
                          }`}
                          style={{
                            top: `${linePosition}px`
                          }}
                        >
                          {isNewDay && (
                            <div className="absolute left-14 -top-3 bg-gray-100 px-2 py-1 rounded text-xs text-gray-600">
                              {format(lineTime, 'MM/dd')}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Aircraft Available box - positioned with bottom at start time */}
                  <div 
                    className="absolute left-0 right-0 bg-gray-600 text-white p-2 rounded-lg z-40"
                    style={{ 
                      top: `${getTimePosition(availableTime.start)}px`,
                      transform: 'translateY(-100%)' // This moves the box up so its bottom aligns with the start time
                    }}
                  >
                    <p className="text-sm">
                      {selectedAircraft?.tailNumber} available — {format(availableTime.start, 'dd/MM/yyyy')} — {format(availableTime.start, 'HH:mm')}
                    </p>
                  </div>

                  {/* Tasks container - starts after Aircraft Available box */}
                  <div className="relative mt-14"> {/* Add margin-top to create space for the Aircraft Available box */}
                    {selectedTasks.map((task, index) => (
                      <React.Fragment key={task.id}>
                        <Draggable draggableId={task.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`absolute left-0 right-0 rounded-lg p-2 transition-all duration-300 group z-20
                                ${task.type === 'fault-isolation' 
                                  ? 'bg-blue-50 border border-blue-300' 
                                  : task.type === 'repair' 
                                    ? 'bg-orange-50 border border-orange-300' 
                                    : 'bg-green-50 border border-green-300'}`}
                              style={{
                                top: `${getTimePosition(task.startTime)}px`,
                                height: `${task.estimatedTime * HOUR_HEIGHT}px`,
                                ...provided.draggableProps.style
                              }}
                            >
                              <div className="flex flex-col justify-center h-full relative">
                                {/* Delete button - now always visible and black */}
                                <button
                                  onClick={() => handleDeleteTask(task.id)}
                                  className="absolute -right-1 -top-1 w-5 h-5 bg-white border border-gray-300 
                                    rounded-full flex items-center justify-center text-black"
                                  title="Remove task"
                                >
                                  <FaIcons.FaTimes className="w-3 h-3" />
                                </button>
                                
                                {/* Centered content */}
                                <div>
                                  <div className="flex justify-between items-center mb-1">
                                    <h3 className="font-medium text-sm">{task.title}</h3>
                                    <span className="text-xs font-medium">{task.estimatedTime}h</span>
                                  </div>
                                  <p className="text-xs text-gray-600">{task.description}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>

                        {/* Buffer display and controls */}
                        {index < selectedTasks.length - 1 && (
                          <>
                            {timeBuffers.map(buffer => {
                              if (buffer.afterTaskId === task.id) {
                                return (
                                  <div
                                    key={buffer.id}
                                    className="absolute left-0 right-0 group"
                                    style={{
                                      top: `${getTimePosition(buffer.startTime)}px`,
                                      height: `${(buffer.duration / 60) * HOUR_HEIGHT}px`
                                    }}
                                  >
                                    {/* Buffer visual with inline controls */}
                                    <div className="relative w-full h-full bg-gray-100 border border-gray-300 rounded-lg">
                                      <div className="flex items-center justify-center h-full space-x-2">
                                        <span className="text-xs text-gray-500">{buffer.duration}</span>
                                        <span className="text-xs text-gray-500">minute increment</span>
                                        <div className="flex items-center space-x-1">
                                          <button
                                            className="w-4 h-4 flex items-center justify-center text-gray-500 hover:text-gray-700"
                                            onClick={() => {
                                              const updatedBuffers = [...timeBuffers];
                                              const bufferIndex = updatedBuffers.findIndex(b => b.id === buffer.id);
                                              updatedBuffers[bufferIndex].duration += 30;
                                              setTimeBuffers(updatedBuffers);
                                              
                                              // Update subsequent task times
                                              const updatedTasks = selectedTasks.map((t, i) => {
                                                if (i <= index) return t;
                                                let newStartTime = new Date(t.startTime);
                                                newStartTime.setMinutes(newStartTime.getMinutes() + 30);
                                                let newEndTime = new Date(t.endTime);
                                                newEndTime.setMinutes(newEndTime.getMinutes() + 30);
                                                return { ...t, startTime: newStartTime, endTime: newEndTime };
                                              });
                                              setSelectedTasks(updatedTasks);
                                            }}
                                          >
                                            <FaIcons.FaPlus className="w-3 h-3" />
                                          </button>
                                          <button
                                            className="w-4 h-4 flex items-center justify-center text-gray-500 hover:text-gray-700"
                                            onClick={() => {
                                              const updatedBuffers = [...timeBuffers];
                                              const bufferIndex = updatedBuffers.findIndex(b => b.id === buffer.id);
                                              if (updatedBuffers[bufferIndex].duration > 30) {
                                                updatedBuffers[bufferIndex].duration -= 30;
                                                setTimeBuffers(updatedBuffers);
                                                
                                                // Update subsequent task times
                                                const updatedTasks = selectedTasks.map((t, i) => {
                                                  if (i <= index) return t;
                                                  let newStartTime = new Date(t.startTime);
                                                  newStartTime.setMinutes(newStartTime.getMinutes() - 30);
                                                  let newEndTime = new Date(t.endTime);
                                                  newEndTime.setMinutes(newEndTime.getMinutes() - 30);
                                                  return { ...t, startTime: newStartTime, endTime: newEndTime };
                                                });
                                                setSelectedTasks(updatedTasks);
                                              }
                                            }}
                                          >
                                            <FaIcons.FaMinus className="w-3 h-3" />
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                              return null;
                            })}

                            {/* Add buffer button - only show if no buffer exists for this task */}
                            {!timeBuffers.find(buffer => buffer.afterTaskId === task.id) && (
                              <button
                                className="absolute left-1/2 transform -translate-x-1/2 z-50 w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-600"
                                style={{
                                  top: `${getTimePosition(task.endTime) + (getTimePosition(selectedTasks[index + 1]?.startTime || task.endTime) - getTimePosition(task.endTime)) / 2}px`,
                                  marginTop: '-12px'
                                }}
                                onClick={() => handleAddBuffer(index)}
                                title="Add 30 minute buffer"
                              >
                                <FaIcons.FaPlus className="w-3 h-3" />
                              </button>
                            )}
                          </>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Next Mission box */}
                  <div 
                    className="absolute left-0 right-0 bg-gray-600 text-white p-2 rounded-lg z-40"
                    style={{ 
                      top: `${getTimePosition(selectedAircraft?.nextMission || availableTime.end)}px`
                    }}
                  >
                    <p className="text-sm">
                      Next Mission — {selectedAircraft?.model} Training — {format(selectedAircraft?.nextMission || new Date(), 'dd/MM/yyyy')} — {format(selectedAircraft?.nextMission || new Date(), 'HH:mm')}
                    </p>
                  </div>

                  {/* Add gray buffer button when there are no tasks */}
                  {selectedTasks.length === 0 && (
                    <button
                      className="absolute left-1/2 transform -translate-x-1/2 z-50 w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-600"
                      style={{
                        top: `${getTimePosition(availableTime.start)}px`,
                        marginTop: '12px'
                      }}
                      onClick={() => {
                        // Create a buffer at the start time
                        const newBuffer: TimeBuffer = {
                          id: `buffer-${Date.now()}`,
                          startTime: new Date(availableTime.start),
                          duration: 30,
                          afterTaskId: 'start' // Special ID for start buffer
                        };
                        setTimeBuffers([...timeBuffers, newBuffer]);
                      }}
                      title="Add 30 minute buffer"
                    >
                      <FaIcons.FaPlus className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </Droppable>
      </div>
    );
  };

  // Add the main onDragEnd handler at the component level
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // Handle dragging between different lists
    if (source.droppableId !== destination.droppableId) {
      if (source.droppableId === 'taskList' && destination.droppableId === 'timeline') {
        // Get the task from the task list
        const task = getTasksForActiveTab()[source.index];
        // Add it to the timeline
        addTaskToTimeline(task);
      }
      return;
    }

    // Handle reordering within the timeline
    if (source.droppableId === 'timeline') {
      const items = Array.from(selectedTasks);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);

      // Recalculate times for all tasks and their buffers in the new order
      let currentTime = new Date(availableTime.start);
      const updatedItems = items.map((task, index) => {
        const startTime = new Date(currentTime);
        const endTime = new Date(startTime.getTime() + task.estimatedTime * 60 * 60 * 1000);
        
        // Update current time to end of task
        currentTime = new Date(endTime);
        
        // If there's a buffer after this task, add its duration
        const buffer = timeBuffers.find(b => b.afterTaskId === task.id);
        if (buffer && index < items.length - 1) {
          currentTime = new Date(currentTime.getTime() + buffer.duration * 60 * 1000);
          // Update buffer start time
          const updatedBuffer = {
            ...buffer,
            startTime: new Date(endTime)
          };
          timeBuffers.splice(timeBuffers.findIndex(b => b.id === buffer.id), 1, updatedBuffer);
        }

        return { ...task, startTime, endTime };
      });

      setSelectedTasks(updatedItems);
      setTimeBuffers([...timeBuffers]); // Trigger buffer update
    }
  };

  // Add the missing filterTasks function
  const filterTasks = (tasks: MaintenanceTask[], system: string, search: string) => {
    return tasks.filter(task => {
      const matchesSystem = system === 'all' || getTaskSystem(task) === system;
      const matchesSearch = search === '' || 
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase());
      return matchesSystem && matchesSearch;
    });
  };

  // Update the mock data systems mapping
  const getTaskSystem = (task: MaintenanceTask) => {
    // Comprehensive system mapping for all task types
    const systems: Record<string, string> = {
      // Fault Isolation Systems
      'fi-001': 'Hydraulic',
      'fi-002': 'Electrical',
      'fi-003': 'Fuel',
      'fi-004': 'Navigation',
      'fi-005': 'Communications',
      'fi-006': 'Landing',
      'fi-007': 'Engine',
      'fi-008': 'APU',
      'fi-009': 'Radar',
      // Repair Systems
      'rp-001': 'Hydraulic',
      'rp-002': 'Electrical',
      'rp-003': 'Fuel',
      'rp-004': 'Navigation',
      'rp-005': 'Communications',
      'rp-006': 'Landing',
      'rp-007': 'Engine',
      'rp-008': 'APU',
      'rp-009': 'Radar',
      // Mod Kit Systems
      'mk-001': 'Navigation',
      'mk-002': 'Communications',
      'mk-003': 'Radar',
      'mk-004': 'Engine',
      'mk-005': 'Fuel',
      'mk-006': 'Cockpit',
      'mk-007': 'Protection',
      'mk-008': 'Data Link',
      'mk-009': 'Environmental',
      'mk-010': 'Landing'
    };

    // For any task type, use the title to determine system if not in mapping
    const taskCode = task.id.split('-')[0].toLowerCase() + '-' + task.id.split('-')[1];
    
    // First try the mapping
    if (systems[taskCode]) return systems[taskCode];
    
    // Then try to detect from title
    const title = task.title.toLowerCase();
    if (title.includes('hydraulic')) return 'Hydraulic';
    if (title.includes('electrical') || title.includes('power')) return 'Electrical';
    if (title.includes('fuel')) return 'Fuel';
    if (title.includes('navigation')) return 'Navigation';
    if (title.includes('communication')) return 'Communications';
    if (title.includes('landing')) return 'Landing';
    if (title.includes('engine')) return 'Engine';
    if (title.includes('apu')) return 'APU';
    if (title.includes('radar')) return 'Radar';
    if (title.includes('cockpit')) return 'Cockpit';
    if (title.includes('protection')) return 'Protection';
    if (title.includes('data link')) return 'Data Link';
    if (title.includes('environmental')) return 'Environmental';
    
    return 'Unknown';
  };

  const getTaskCode = (task: MaintenanceTask) => {
    return task.id.split('-')[0] + '-' + task.id.split('-')[1];
  };

  // Add delete task function
  const handleDeleteTask = (taskId: string) => {
    setSelectedTasks(selectedTasks.filter(task => task.id !== taskId));
    // Also remove any associated buffers
    setTimeBuffers(timeBuffers.filter(buffer => buffer.afterTaskId !== taskId));
  };

  const handleResizeStart = (e: React.MouseEvent, column: string) => {
    e.preventDefault();
    const table = e.currentTarget.closest('table');
    if (!table) return;
    
    const tableRect = table.getBoundingClientRect();
    setResizing(column);
    setStartX(e.clientX);
    setStartWidth(columnWidths[column as keyof typeof columnWidths]);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (resizing) {
        const diff = e.clientX - startX;
        const newWidth = Math.max(80, startWidth + diff);
        const totalWidth = Object.values(columnWidths).reduce((sum, width) => sum + width, 0);
        
        if (totalWidth + diff <= tableRect.width) {
          setColumnWidths(prev => ({
            ...prev,
            [resizing]: newWidth
          }));
        }
      }
    };

    const handleMouseUp = () => {
      setResizing(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Update the table header with resize handles
  const renderResizeHandle = (column: string) => (
    <div
      className="absolute top-0 right-0 h-full w-1 cursor-col-resize group"
      onMouseDown={(e) => handleResizeStart(e, column)}
    >
      <div className="absolute right-0 top-0 h-full w-px bg-gray-300 group-hover:bg-gray-400" />
    </div>
  );

  // Update the table structure in TaskList component
  const TableHeader = () => (
    <thead>
      <tr className="bg-gray-50">
        <th className="relative px-4 py-2" style={{ width: columnWidths.code }}>
          <span className="text-left text-sm font-medium text-gray-600">Code</span>
          {renderResizeHandle('code')}
        </th>
        <th className="relative px-4 py-2" style={{ width: columnWidths.duration }}>
          <span className="text-left text-sm font-medium text-gray-600">Duration</span>
          {renderResizeHandle('duration')}
        </th>
        <th className="relative px-4 py-2" style={{ width: columnWidths.system }}>
          <span className="text-left text-sm font-medium text-gray-600">System</span>
          {renderResizeHandle('system')}
        </th>
        <th className="relative px-4 py-2" style={{ width: columnWidths.task }}>
          <span className="text-left text-sm font-medium text-gray-600">Task</span>
          {renderResizeHandle('task')}
        </th>
        <th className="px-4 py-2" style={{ width: columnWidths.description }}>
          <span className="text-left text-sm font-medium text-gray-600">Description</span>
        </th>
      </tr>
    </thead>
  );

  // Update the TaskList component's tab styling
  const TaskList = () => {
    const tasks = getTasksForActiveTab();
    const systems = Array.from(new Set(tasks.map(getTaskSystem))).filter(Boolean);

    return (
      <div className="w-2/3">
        <div className="rounded-lg">
          {/* Updated tab styling to match main navigation */}
          <div className="flex border-b border-gray-200 mb-4">
            <button
              className={`px-6 py-3 font-medium text-sm border-b-2 -mb-px ${
                activeTab === 'fault-isolation'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('fault-isolation')}
            >
              Fault Isolation
            </button>
            <button
              className={`px-6 py-3 font-medium text-sm border-b-2 -mb-px ${
                activeTab === 'repair'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('repair')}
            >
              Repair
            </button>
            <button
              className={`px-6 py-3 font-medium text-sm border-b-2 -mb-px ${
                activeTab === 'mod-kit'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('mod-kit')}
            >
              Mod-kit
            </button>
          </div>

          {/* Filters */}
          <div className="flex gap-4 mb-4">
            <select
              className="border rounded px-2 py-1"
              value={filterSystem}
              onChange={(e) => setFilterSystem(e.target.value)}
            >
              <option value="all">All Systems</option>
              {systems.map((system) => (
                <option key={system} value={system}>
                  {system}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Search tasks..."
              className="border rounded px-2 py-1 flex-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Task Table with resizable columns */}
          <Droppable droppableId="taskList">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="overflow-x-auto relative"
              >
                <table className="min-w-full bg-white border border-gray-200">
                  <TableHeader />
                  <tbody>
                    {filterTasks(tasks, filterSystem, searchTerm).map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="border-t border-gray-100 hover:bg-gray-50 cursor-move"
                          >
                            <td className="px-4 py-3 text-sm text-gray-600" style={{ width: columnWidths.code }}>
                              {getTaskCode(task)}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600" style={{ width: columnWidths.duration }}>
                              {task.estimatedTime}h
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600" style={{ width: columnWidths.system }}>
                              {getTaskSystem(task)}
                            </td>
                            <td className="px-4 py-3" style={{ width: columnWidths.task }}>
                              <div className="font-medium text-gray-900">{task.title}</div>
                            </td>
                            <td className="px-4 py-3" style={{ width: columnWidths.description }}>
                              <div className="text-sm text-gray-500">{task.description}</div>
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </tbody>
                </table>
                {resizing && (
                  <div 
                    className="fixed top-0 bottom-0 w-px bg-blue-500" 
                    style={{ 
                      left: `${startX + columnWidths[resizing as keyof typeof columnWidths] - startWidth}px`,
                      pointerEvents: 'none',
                      zIndex: 50 
                    }} 
                  />
                )}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <FaIcons.FaWrench className="text-3xl text-black mr-3" />
        <h1 className="text-2xl font-bold">Maintenance Builder</h1>
      </div>

      <div className="bg-gray-50 rounded-lg">
        {/* Aircraft Selector Section */}
        <div className="px-6 py-4 border-b border-gray-200">
          <AircraftSelector 
            selectedAircraft={selectedAircraft}
            setSelectedAircraft={setSelectedAircraft}
            aircraftWithAnomalies={aircraftWithAnomalies}
          />
        </div>

        {selectedAircraft ? (
          <>
            {/* Maintenance Plan Section */}
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold">Maintenance Plan Build</h2>
            </div>

            <div className="p-6">
              <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex space-x-6">
                  {/* Timeline View */}
                  <TimelineView />

                  {/* Task List */}
                  <div className="border-l-2 border-gray-200" />
                  <TaskList />
                </div>
              </DragDropContext>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500 py-12">
            Please select an aircraft to build a maintenance plan
          </div>
        )}
      </div>
    </div>
  );
};

export default MaintenanceBuilder;