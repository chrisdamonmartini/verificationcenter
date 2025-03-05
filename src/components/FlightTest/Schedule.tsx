import React, { useState, useMemo } from 'react';
import { TestEvent } from '../../types';
import * as FaIcons from 'react-icons/fa';
import { motion } from 'framer-motion';
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, addMonths, startOfMonth, endOfMonth, isSameDay } from 'date-fns';
import { mockTestEvents } from '../../mockFlightTest';

interface ScheduleProps {
  // Add props as needed
}

type ViewMode = 'month' | 'week' | 'day';

export const Schedule: React.FC<ScheduleProps> = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Use mockTestEvents instead of local mock data
  const testEvents = mockTestEvents;

  // Generate time slots for the schedule
  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = 6 + i; // Start at 6 AM
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  const calendarDays = useMemo(() => {
    switch (viewMode) {
      case 'month': {
        const start = startOfMonth(selectedDate);
        const end = endOfMonth(selectedDate);
        return eachDayOfInterval({ start, end });
      }
      case 'week': {
        const start = startOfWeek(selectedDate, { weekStartsOn: 1 }); // Start on Monday
        const end = endOfWeek(selectedDate, { weekStartsOn: 1 });
        return eachDayOfInterval({ start, end });
      }
      case 'day':
        return [selectedDate];
    }
  }, [selectedDate, viewMode]);

  const navigateDate = (direction: 'prev' | 'next') => {
    switch (viewMode) {
      case 'month':
        setSelectedDate(current => addMonths(current, direction === 'next' ? 1 : -1));
        break;
      case 'week':
        setSelectedDate(current => addDays(current, direction === 'next' ? 7 : -7));
        break;
      case 'day':
        setSelectedDate(current => addDays(current, direction === 'next' ? 1 : -1));
        break;
    }
  };

  const renderMonthView = () => (
    <div className="grid grid-cols-7 gap-1">
      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
        <div key={day} className="text-center py-2 text-sm font-medium text-gray-500">
          {day}
        </div>
      ))}
      {calendarDays.map(day => {
        const dayEvents = testEvents.filter(event => isSameDay(new Date(event.date), day));
        return (
          <div
            key={day.toISOString()}
            className="min-h-[100px] p-2 border border-gray-200 hover:bg-gray-50 cursor-pointer"
          >
            <div className="text-sm font-medium mb-2">{format(day, 'd')}</div>
            <div className="space-y-1">
              {dayEvents.map(event => (
                <div
                  key={event.id}
                  className={`text-xs p-1 rounded truncate ${
                    event.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    event.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}
                >
                  {event.title}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderWeekView = () => (
    <div className="grid grid-cols-[100px_1fr] divide-x divide-gray-200">
      <div className="space-y-4 py-4">
        {timeSlots.map(time => (
          <div key={time} className="text-sm text-gray-500 text-right pr-4 h-20">
            {time}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 divide-x divide-gray-200">
        {calendarDays.map(day => (
          <div key={day.toISOString()} className="relative">
            <div className="text-sm font-medium text-center py-2 border-b">
              {format(day, 'EEE d')}
            </div>
            {testEvents
              .filter(event => isSameDay(new Date(event.date), day))
              .map(event => {
                const startHour = parseInt(event.startTime.split(':')[0]);
                const top = (startHour - 6) * 80 + 40; // Adjusted for header
                const height = event.duration * 80;

                return (
                  <motion.div
                    key={event.id}
                    layout
                    className={`absolute left-1 right-1 rounded-lg p-2 shadow-sm border-l-4 ${
                      event.status === 'Completed' ? 'bg-green-50 border-green-500' :
                      event.status === 'In Progress' ? 'bg-blue-50 border-blue-500' :
                      'bg-gray-50 border-gray-500'
                    }`}
                    style={{
                      top: `${top}px`,
                      height: `${height}px`
                    }}
                  >
                    <div className="text-xs font-medium truncate">{event.title}</div>
                    <div className="text-xs text-gray-500">{event.startTime}</div>
                  </motion.div>
                );
              })}
          </div>
        ))}
      </div>
    </div>
  );

  const renderDayView = () => (
    <div className="grid grid-cols-[100px_1fr] divide-x divide-gray-200">
      <div className="space-y-4 py-4">
        {timeSlots.map(time => (
          <div key={time} className="text-sm text-gray-500 text-right pr-4 h-20">
            {time}
          </div>
        ))}
      </div>
      <div className="relative">
        {testEvents
          .filter(event => isSameDay(new Date(event.date), selectedDate))
          .map(event => {
            const startHour = parseInt(event.startTime.split(':')[0]);
            const top = (startHour - 6) * 80 + 16;
            const height = event.duration * 80;

            return (
              <motion.div
                key={event.id}
                layout
                className={`absolute left-2 right-2 rounded-lg p-3 shadow-sm border-l-4 ${
                  event.status === 'Completed' ? 'bg-green-50 border-green-500' :
                  event.status === 'In Progress' ? 'bg-blue-50 border-blue-500' :
                  'bg-gray-50 border-gray-500'
                }`}
                style={{
                  top: `${top}px`,
                  height: `${height}px`
                }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-sm">{event.title}</h4>
                    <p className="text-xs text-gray-500">
                      {event.startTime} - {event.briefingTime} Brief
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    event.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    event.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {event.status}
                  </span>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center text-xs text-gray-600">
                    <FaIcons.FaUsers className="mr-1" />
                    {event.testTeam[0]} +{event.testTeam.length - 1}
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <FaIcons.FaCloud className="mr-1" />
                    {event.weather.forecast}
                  </div>
                </div>
              </motion.div>
            );
          })}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold">Flight Test Schedule</h3>
          <div className="flex bg-gray-100 rounded-lg p-1">
            {(['month', 'week', 'day'] as ViewMode[]).map(mode => (
              <button
                key={mode}
                className={`px-3 py-1 rounded-md text-sm capitalize ${
                  viewMode === mode ? 'bg-white shadow' : 'text-gray-600'
                }`}
                onClick={() => setViewMode(mode)}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
          <FaIcons.FaPlus className="mr-2" /> Schedule Test
        </button>
      </div>

      {/* Calendar Navigation */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
        <button 
          className="p-2 hover:bg-gray-100 rounded-full"
          onClick={() => navigateDate('prev')}
        >
          <FaIcons.FaChevronLeft />
        </button>
        <h4 className="text-lg font-medium">
          {format(selectedDate, viewMode === 'month' ? 'MMMM yyyy' : 'MMMM d, yyyy')}
        </h4>
        <button 
          className="p-2 hover:bg-gray-100 rounded-full"
          onClick={() => navigateDate('next')}
        >
          <FaIcons.FaChevronRight />
        </button>
      </div>

      {/* Calendar View */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {viewMode === 'month' && renderMonthView()}
        {viewMode === 'week' && renderWeekView()}
        {viewMode === 'day' && renderDayView()}
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h4 className="font-medium mb-4">Upcoming Tests</h4>
        <div className="space-y-3">
          {testEvents
            .filter(event => new Date(event.date) >= new Date())
            .map(event => (
              <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="mr-4">
                    <div className="text-sm font-medium">{event.date.toLocaleDateString()}</div>
                    <div className="text-xs text-gray-500">{event.startTime}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">{event.title}</div>
                    <div className="text-xs text-gray-500">{event.testTeam[0]}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-600 hover:text-blue-600">
                    <FaIcons.FaEdit />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-red-600">
                    <FaIcons.FaTrash />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule; 