import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Aircraft, Repair } from '../../types';
import { mockAircraft, mockBases } from '../../mockData';
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';
import { format, formatDistanceToNow, differenceInMinutes, differenceInDays, addDays } from 'date-fns';

type RepairStage = 
  | 'Anomaly Detected'
  | 'Ambiguity Identified'
  | 'Fault Isolation'
  | 'Packaging Work'
  | 'Maintenance In Work'
  | 'Inspection'
  | 'Safe for Flight';

interface RepairStatus {
  stage: RepairStage;
  startTime: string;
  estimatedCompletion?: string;
  description: string;
  systemAffected: string;
  severity: 'Critical' | 'Warning' | 'Info';
}

interface StageDetails {
  technicians?: string[];
  equipment?: string[];
  location?: string;
  notes?: string;
  startTime?: string;
  completionTime?: string;
}

const stages: RepairStage[] = [
  'Anomaly Detected',
  'Ambiguity Identified',
  'Fault Isolation',
  'Packaging Work',
  'Maintenance In Work',
  'Inspection',
  'Safe for Flight'
];

// Add helper function for formatting duration
const formatDuration = (startTime: string, endTime: string) => {
  const days = differenceInDays(new Date(endTime), new Date(startTime));
  const minutes = differenceInMinutes(new Date(endTime), new Date(startTime)) % (24 * 60);
  return `${days}d ${Math.round(minutes)}m`;
};

// Add helper function to get darker text/border color based on status
const getDarkerColor = (status: 'completed' | 'current' | 'upcoming') => {
  switch (status) {
    case 'completed': return 'text-green-600 border-green-200';
    case 'current': return 'text-blue-600 border-blue-200';
    default: return 'text-gray-600 border-gray-200';
  }
};

// Update the status icon function to return null
const getStatusIcon = (status: 'completed' | 'current' | 'upcoming') => {
  return null;  // Remove all icons
};

const RepairTracker: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<RepairStage | null>(null);
  const [selectedBase, setSelectedBase] = useState<string>('all');
  const [selectedAircraft, setSelectedAircraft] = useState<string>('all');
  const [selectedRepairStage, setSelectedRepairStage] = useState<'all' | RepairStage>('all');

  const getStageColor = (stage: RepairStage) => {
    switch (stage) {
      case 'Anomaly Detected': return 'bg-red-100 text-red-800';
      case 'Ambiguity Identified': return 'bg-orange-100 text-orange-800';
      case 'Fault Isolation': return 'bg-yellow-100 text-yellow-800';
      case 'Packaging Work': return 'bg-blue-100 text-blue-800';
      case 'Maintenance In Work': return 'bg-indigo-100 text-indigo-800';
      case 'Inspection': return 'bg-purple-100 text-purple-800';
      case 'Safe for Flight': return 'bg-green-100 text-green-800';
    }
  };

  const getProgressPercentage = (stage: RepairStage): number => {
    return ((stages.indexOf(stage) + 1) / stages.length) * 100;
  };

  const getStageStatus = (currentStage: RepairStage, stage: RepairStage) => {
    const currentIndex = stages.indexOf(currentStage);
    const stageIndex = stages.indexOf(stage);
    
    if (stageIndex < currentIndex) return 'completed';
    if (stageIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  const ChevronProgress: React.FC<{ currentStage: RepairStage; repair: Repair }> = ({ currentStage, repair }) => {
    const [expandedStage, setExpandedStage] = useState<RepairStage | null>(null);

    // Helper function to get darker border color
    const getDarkerBorderColor = (status: 'completed' | 'current' | 'upcoming') => {
      switch (status) {
        case 'completed': return 'border-green-200';
        case 'current': return 'border-blue-200';
        default: return 'border-gray-200';
      }
    };

    // Unique note content based on stage
    const renderStageNotes = (stage: RepairStage) => {
      switch (stage) {
        case 'Anomaly Detected':
          return (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-bold text-black">Detection Method</h4>
                  <p className="text-sm">Automated System Alert</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-black">Alert Level</h4>
                  <p className="text-sm">Critical</p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-black">Symptoms</h4>
                <ul className="list-disc pl-4 text-sm">
                  <li>Unusual vibration during operation</li>
                  <li>Performance degradation noted</li>
                  <li>Warning light activated</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold text-black">Initial Assessment</h4>
                <p className="text-sm bg-red-50 p-2 rounded">
                  Potential hydraulic system malfunction detected during routine operation.
                  Multiple warning indicators active.
                </p>
              </div>
            </div>
          );

        case 'Ambiguity Identified':
          return (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-bold text-black">Possible Systems Affected</h4>
                  <ul className="text-sm list-disc pl-4">
                    <li>Primary Hydraulics</li>
                    <li>Secondary Control Systems</li>
                    <li>Landing Gear Mechanism</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-black">Test Procedures Required</h4>
                  <ul className="text-sm list-disc pl-4">
                    <li>Pressure Test</li>
                    <li>Visual Inspection</li>
                    <li>Electronic Diagnostic</li>
                  </ul>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-black">Diagnostic Steps</h4>
                <p className="text-sm bg-orange-50 p-2 rounded">
                  Multiple systems showing interconnected symptoms. 
                  Initial testing indicates potential root cause in hydraulic system.
                  Further isolation required.
                </p>
              </div>
            </div>
          );

        case 'Fault Isolation':
          return (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-bold text-yellow-700">Test Results</h4>
                  <ul className="text-sm list-disc pl-4">
                    <li>Pressure Test: Failed</li>
                    <li>Electronic Test: Passed</li>
                    <li>Visual Inspection: Issues Found</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-yellow-700">Isolated Components</h4>
                  <p className="text-sm">Main Hydraulic Pump (Port Side)</p>
                  <p className="text-sm">Connection Assembly A-234</p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-yellow-700">Fault Description</h4>
                <p className="text-sm bg-yellow-50 p-2 rounded">
                  Fault isolated to hydraulic pump assembly. 
                  Showing signs of internal wear and pressure loss.
                  Secondary systems unaffected.
                </p>
              </div>
            </div>
          );

        case 'Packaging Work':
          return (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-bold text-blue-700">Required Parts</h4>
                  <ul className="text-sm list-disc pl-4">
                    <li>Hydraulic Pump Assembly (P/N: HP-2234)</li>
                    <li>Seal Kit (P/N: SK-789)</li>
                    <li>Mounting Brackets (P/N: MB-456)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-blue-700">Required Personnel</h4>
                  <ul className="text-sm list-disc pl-4">
                    <li>Lead Hydraulics Technician</li>
                    <li>Systems Inspector</li>
                    <li>Quality Assurance</li>
                  </ul>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-blue-700">Maintenance Plan</h4>
                <p className="text-sm bg-blue-50 p-2 rounded">
                  Complete replacement of port side hydraulic pump assembly required.
                  Estimated 8-hour maintenance window needed.
                  Secondary systems inspection required post-installation.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-blue-700">Technical Documentation</h4>
                <ul className="text-sm list-disc pl-4">
                  <li>MM 29-10-00 Hydraulic Power</li>
                  <li>AMM 29-21-13 Pump Replacement</li>
                  <li>SB 29-XXX Inspection Requirements</li>
                </ul>
              </div>
            </div>
          );

        case 'Maintenance In Work':
          return (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-bold text-indigo-700">Current Task</h4>
                  <p className="text-sm">Hydraulic Pump Replacement</p>
                  <p className="text-sm font-bold mt-2">Progress: 60%</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-indigo-700">Active Personnel</h4>
                  <ul className="text-sm list-disc pl-4">
                    <li>John Smith (Lead)</li>
                    <li>Maria Garcia (Tech)</li>
                    <li>Robert Chen (QA)</li>
                  </ul>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-indigo-700">Work Steps Completed</h4>
                <ul className="text-sm list-disc pl-4">
                  <li>System depressurization complete</li>
                  <li>Old pump removed</li>
                  <li>Mounting area cleaned and inspected</li>
                  <li>New seals installed</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold text-indigo-700">Next Steps</h4>
                <p className="text-sm bg-indigo-50 p-2 rounded">
                  Install new pump assembly.
                  Perform initial pressure test.
                  Complete system bleeding procedure.
                </p>
              </div>
            </div>
          );

        case 'Inspection':
          return (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-bold text-purple-700">Inspection Checklist</h4>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center">
                      <FaIcons.FaCheckCircle className="text-green-500 mr-2" />
                      Visual Inspection
                    </li>
                    <li className="flex items-center">
                      <FaIcons.FaCheckCircle className="text-green-500 mr-2" />
                      Pressure Test
                    </li>
                    <li className="flex items-center">
                      <FaIcons.FaCircle className="text-gray-300 mr-2" />
                      Operational Test
                    </li>
                    <li className="flex items-center">
                      <FaIcons.FaCircle className="text-gray-300 mr-2" />
                      Systems Integration Check
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-purple-700">Test Parameters</h4>
                  <ul className="text-sm list-disc pl-4">
                    <li>Pressure: 3000 PSI</li>
                    <li>Temperature: Normal Range</li>
                    <li>Fluid Level: Full</li>
                    <li>Leak Check: Pass</li>
                  </ul>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-purple-700">Inspector Notes</h4>
                <p className="text-sm bg-purple-50 p-2 rounded">
                  Initial inspection shows proper installation.
                  Pressure test results within specifications.
                  Pending operational test under load conditions.
                </p>
              </div>
            </div>
          );

        case 'Safe for Flight':
          return (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-bold text-green-700">Final Checks</h4>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center">
                      <FaIcons.FaCheckCircle className="text-green-500 mr-2" />
                      All Systems Operational
                    </li>
                    <li className="flex items-center">
                      <FaIcons.FaCheckCircle className="text-green-500 mr-2" />
                      Documentation Complete
                    </li>
                    <li className="flex items-center">
                      <FaIcons.FaCheckCircle className="text-green-500 mr-2" />
                      QA Sign-off
                    </li>
                    <li className="flex items-center">
                      <FaIcons.FaCheckCircle className="text-green-500 mr-2" />
                      Maintenance Log Updated
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-green-700">Release Details</h4>
                  <p className="text-sm">Released by: James Wilson</p>
                  <p className="text-sm">Position: Chief Inspector</p>
                  <p className="text-sm">Date: {format(new Date(), 'MMM dd, yyyy HH:mm')}</p>
                  <p className="text-sm">Certificate: IA-1234-5678</p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-green-700">Return to Service Notes</h4>
                <p className="text-sm bg-green-50 p-2 rounded">
                  All maintenance actions completed and verified.
                  System performance meets or exceeds specifications.
                  Aircraft is airworthy and cleared for normal operations.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-green-700">Maintenance Summary</h4>
                <ul className="text-sm list-disc pl-4">
                  <li>Total Maintenance Time: 12.5 hours</li>
                  <li>Parts Replaced: 3</li>
                  <li>Tests Performed: 5</li>
                  <li>Next Inspection Due: {format(addDays(new Date(), 90), 'MMM dd, yyyy')}</li>
                </ul>
              </div>
            </div>
          );

        default:
          return (
            <div className="text-sm text-gray-600">
              No specific notes available for this stage.
            </div>
          );
      }
    };

    return (
      <div>
        {/* Chevrons Section */}
        <div className="relative flex items-center justify-between mb-2">
          {stages.map((stage, index) => {
            const status = getStageStatus(currentStage, stage);
            const isExpanded = expandedStage === stage;
            const bgColor = status === 'completed' ? 'bg-green-50' :
                           status === 'current' ? 'bg-blue-50' :
                           'bg-gray-50';
            const borderColor = getDarkerColor(status);
            
            return (
              <div 
                key={stage} 
                className="relative flex-1 flex items-center justify-center"
              >
                {/* Connecting line before box */}
                {index > 0 && (
                  <div className={`
                    h-[12px] w-full
                    ${getStageStatus(currentStage, stages[index - 1]) === 'completed' ? 'bg-green-200' : 'bg-gray-200'}
                  `} />
                )}

                {/* Stage box */}
                <div className={`
                  relative p-4 rounded-lg cursor-pointer transition-all group z-10
                  ${bgColor}
                  border
                  ${isExpanded ? getDarkerColor(status) : `hover:${getDarkerColor(status)}`}
                  flex-shrink-0 w-48 h-18
                  mx-0
                `}
                onClick={() => setExpandedStage(isExpanded ? null : stage)}
                >
                  {/* Stage text and arrow centered */}
                  <div className="flex items-center justify-center h-full">
                    <div className="flex items-center">
                      <span className="text-sm font-medium">{stage}</span>
                      <span className={`
                        ml-2
                        ${getDarkerColor(status).split(' ')[0]} 
                        opacity-60 
                        group-hover:opacity-100
                      `}>
                        {isExpanded ? '▲' : '▼'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Connecting line after box */}
                {index < stages.length - 1 && (
                  <div className={`
                    h-[12px] w-full
                    ${status === 'completed' ? 'bg-green-200' : 'bg-gray-200'}
                  `} />
                )}
              </div>
            );
          })}
        </div>

        {/* Expandable Notes Section with AnimatePresence */}
        <AnimatePresence>
          {expandedStage && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-2">
                <div className={`
                  rounded-lg p-4
                  ${getStageStatus(currentStage, expandedStage) === 'completed' ? 'bg-green-50 border border-green-200' :
                    getStageStatus(currentStage, expandedStage) === 'current' ? 'bg-blue-50 border border-blue-200' :
                    'bg-gray-50 border border-gray-200'}
                `}>
                  {renderStageNotes(expandedStage)}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // Get aircraft in repair first
  const aircraftInRepair = mockAircraft.filter(aircraft => {
    console.log('Aircraft:', aircraft.tailNumber, 'Repair:', aircraft.currentRepair?.stage);
    return aircraft.currentRepair !== null;
  });

  // Then apply both filters
  const filteredAircraft = aircraftInRepair.filter(aircraft => {
    const matchesSelectedAircraft = selectedAircraft === 'all' || aircraft.tailNumber === selectedAircraft;
    const matchesSelectedBase = selectedBase === 'all' || aircraft.baseId === selectedBase;
    const matchesSelectedStage = selectedRepairStage === 'all' || 
      (aircraft.currentRepair?.stage as RepairStage) === selectedRepairStage;
    
    return matchesSelectedAircraft && matchesSelectedBase && matchesSelectedStage;
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FaIcons.FaTools className="text-3xl text-black mr-3" />
          <h1 className="text-2xl font-bold">Repair Tracker</h1>
        </div>

        {/* Filter Controls */}
        <div className="flex space-x-4">
          {/* Aircraft Dropdown */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">
              Filter by Aircraft under Repair:
            </label>
            <select
              className="w-64 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedAircraft}
              onChange={(e) => setSelectedAircraft(e.target.value)}
            >
              <option value="all">Aircraft under repair</option>
              {aircraftInRepair.map(aircraft => (
                <option key={aircraft.id} value={aircraft.tailNumber}>
                  {aircraft.tailNumber}
                </option>
              ))}
            </select>
          </div>

          {/* Base Dropdown */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">
              Filter by Base:
            </label>
            <select
              className="w-64 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedBase}
              onChange={(e) => setSelectedBase(e.target.value)}
            >
              <option value="all">All Bases</option>
              {mockBases.map(base => (
                <option key={base.id} value={base.id}>
                  {base.name}
                </option>
              ))}
            </select>
          </div>

          {/* Repair State Dropdown */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">
              Filter by Repair State:
            </label>
            <select
              className="w-64 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedRepairStage}
              onChange={(e) => setSelectedRepairStage(e.target.value as 'all' | RepairStage)}
            >
              <option value="all">All Repair States</option>
              {stages.map(stage => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredAircraft.map((aircraft) => {
          const base = mockBases.find(b => b.id === aircraft.baseId);
          const initialGroundTime = aircraft.currentRepair?.startTime || new Date().toISOString();
          const timeOnGround = formatDistanceToNow(new Date(initialGroundTime));
          const nextMission = aircraft.missions.find(m => m.status === 'Scheduled');

          return (
            <motion.div
              key={aircraft.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              {/* Aircraft Header Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{aircraft.tailNumber}</h2>
                  <p className="text-lg text-gray-500">{aircraft.model}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-500">Base</p>
                  <p className="font-normal">{base?.name}</p>
                  <p className="text-sm font-bold text-gray-500">Location</p>
                  <p className="font-normal">{aircraft.location} ({base?.code})</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-500">Time on Ground</p>
                  <p className="font-normal">Initial: {format(new Date(initialGroundTime), 'MM/dd HH:mm')}</p>
                  <p className="font-normal">Total: {timeOnGround}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-500">Next Mission</p>
                  {nextMission ? (
                    <>
                      <p className="font-normal">{nextMission.name}</p>
                      <p className="text-sm font-normal">
                        In: {formatDistanceToNow(new Date(nextMission.date!))}
                      </p>
                    </>
                  ) : (
                    <p className="font-normal">No mission scheduled</p>
                  )}
                </div>
              </div>

              {/* Progress Chevrons */}
              {aircraft.currentRepair && (
                <ChevronProgress 
                  currentStage={aircraft.currentRepair.stage as RepairStage || 'Anomaly Detected'}
                  repair={aircraft.currentRepair}
                />
              )}
            </motion.div>
          );
        })}

        {filteredAircraft.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No repairs found matching your search criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default RepairTracker; 