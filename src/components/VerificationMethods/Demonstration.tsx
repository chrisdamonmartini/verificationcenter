import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import * as BsIcons from 'react-icons/bs';

// Define interface for demonstration activities
interface DemonstrationActivity {
  id: string;
  name: string;
  description: string;
  status: 'Planned' | 'Ready' | 'In Progress' | 'Completed' | 'Blocked' | 'Cancelled';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  requirements: string[];
  demonstrator: string;
  witnesses: string[];
  location: string;
  scheduledDate: string | null;
  completionDate: string | null;
  duration: string;
  equipment: string[];
  procedure: {
    id: string;
    step: string;
    expected: string;
    actual: string;
    status: 'Not Started' | 'Pass' | 'Fail' | 'N/A' | 'Deferred';
    notes: string;
  }[];
  media: {
    type: 'Image' | 'Video' | 'Document';
    title: string;
    description: string;
    url: string;
  }[];
  issues: {
    id: string;
    description: string;
    severity: 'Minor' | 'Major' | 'Critical';
    status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
    assignee: string;
  }[];
  notes: string;
}

const Demonstration: React.FC = () => {
  // Sample demonstration activities data
  const [demonstrations] = useState<DemonstrationActivity[]>([
    {
      id: 'DEM-001',
      name: 'Navigation System Functionality Demonstration',
      description: 'Demonstrate the functionality of the navigation system in realistic operational scenarios.',
      status: 'Completed',
      priority: 'High',
      requirements: ['REQ-NAV-001', 'REQ-NAV-002', 'REQ-NAV-005'],
      demonstrator: 'Capt. James Wilson',
      witnesses: ['Lt. Col. Robert Johnson', 'Dr. Sarah Chen', 'Michael Brown'],
      location: 'Flight Simulator Facility',
      scheduledDate: '2023-02-10',
      completionDate: '2023-02-10',
      duration: '3 hours',
      equipment: ['Navigation Console', 'Flight Simulator', 'Recording Equipment'],
      procedure: [
        { id: 'STEP-001', step: 'Initialize navigation system', expected: 'System boots up and performs self-test', actual: 'System successfully initialized', status: 'Pass', notes: '' },
        { id: 'STEP-002', step: 'Enter flight plan', expected: 'Flight plan accepted and displayed', actual: 'Flight plan properly loaded', status: 'Pass', notes: '' },
        { id: 'STEP-003', step: 'Simulate route deviation', expected: 'System alerts and suggests correction', actual: 'Alert generated and correct route calculated', status: 'Pass', notes: 'Alert activated at expected threshold' },
        { id: 'STEP-004', step: 'Test GPS signal loss', expected: 'System switches to inertial navigation', actual: 'Switched to inertial with appropriate notification', status: 'Pass', notes: '' }
      ],
      media: [
        { type: 'Video', title: 'Navigation Demo Recording', description: 'Full recording of the demonstration', url: 'videos/nav_demo_full.mp4' },
        { type: 'Image', title: 'Console Screenshot', description: 'Screenshot of navigation console during route deviation', url: 'images/nav_console_deviation.jpg' },
        { type: 'Document', title: 'Demonstration Report', description: 'Detailed report of the demonstration results', url: 'docs/nav_demo_report.pdf' }
      ],
      issues: [],
      notes: 'Demonstration completed successfully with all requirements verified. Witnesses signed off on results.'
    },
    {
      id: 'DEM-002',
      name: 'Emergency Power System Demonstration',
      description: 'Demonstrate the emergency power system activation and functionality.',
      status: 'Blocked',
      priority: 'Critical',
      requirements: ['REQ-PWR-010', 'REQ-PWR-011', 'REQ-EMG-003'],
      demonstrator: 'Emily Davis',
      witnesses: ['Dr. Michael Lee', 'Thomas Garcia', 'Sarah Johnson'],
      location: 'Power Systems Lab',
      scheduledDate: '2023-03-15',
      completionDate: null,
      duration: '2 hours',
      equipment: ['Main Power Control Unit', 'Emergency Generator', 'Load Bank', 'Measurement Equipment'],
      procedure: [
        { id: 'STEP-001', step: 'Initialize main power system', expected: 'All indicators show normal operation', actual: '', status: 'Not Started', notes: '' },
        { id: 'STEP-002', step: 'Simulate main power failure', expected: 'System detects failure and initiates emergency sequence', actual: '', status: 'Not Started', notes: '' },
        { id: 'STEP-003', step: 'Verify emergency generator startup', expected: 'Generator starts within 5 seconds', actual: '', status: 'Not Started', notes: '' },
        { id: 'STEP-004', step: 'Verify power transfer to critical systems', expected: 'Critical systems receive power within specifications', actual: '', status: 'Not Started', notes: '' }
      ],
      media: [
        { type: 'Document', title: 'Emergency Power Demo Plan', description: 'Detailed plan for the demonstration', url: 'docs/emergency_power_demo_plan.pdf' }
      ],
      issues: [
        { id: 'ISS-001', description: 'Emergency generator controller firmware update required before demonstration', severity: 'Major', status: 'In Progress', assignee: 'David Kim' }
      ],
      notes: 'Demonstration blocked due to required firmware update on the emergency generator controller. Rescheduling once update is completed and verified.'
    },
    {
      id: 'DEM-003',
      name: 'Payload Deployment Mechanism Demonstration',
      description: 'Demonstrate the functionality of the payload deployment system under various conditions.',
      status: 'Planned',
      priority: 'Medium',
      requirements: ['REQ-PLD-001', 'REQ-PLD-002', 'REQ-PLD-003'],
      demonstrator: 'Dr. Robert Johnson',
      witnesses: ['John Smith', 'Maria Rodriguez', 'James Wilson'],
      location: 'Integration Facility',
      scheduledDate: '2023-04-05',
      completionDate: null,
      duration: '4 hours',
      equipment: ['Payload Deployment System', 'Test Payload', 'Recording Equipment', 'Measurement Tools'],
      procedure: [
        { id: 'STEP-001', step: 'Initialize payload system', expected: 'System powers up with all indicators nominal', actual: '', status: 'Not Started', notes: '' },
        { id: 'STEP-002', step: 'Execute deployment sequence', expected: 'Sequence executes with proper timing', actual: '', status: 'Not Started', notes: '' },
        { id: 'STEP-003', step: 'Verify payload separation', expected: 'Clean separation with no interference', actual: '', status: 'Not Started', notes: '' },
        { id: 'STEP-004', step: 'Measure separation velocity', expected: 'Velocity within 0.5-0.7 m/s', actual: '', status: 'Not Started', notes: '' },
        { id: 'STEP-005', step: 'Test deployment in cold conditions', expected: 'Deployment successful at -20°C', actual: '', status: 'Not Started', notes: '' }
      ],
      media: [
        { type: 'Document', title: 'Deployment System Specs', description: 'Technical specifications for the deployment system', url: 'docs/deployment_specs.pdf' }
      ],
      issues: [],
      notes: 'Environmental chamber reserved for cold condition testing. All equipment prepared for demonstration.'
    },
    {
      id: 'DEM-004',
      name: 'Communications System Redundancy Demonstration',
      description: 'Demonstrate the failover capabilities of the communication system.',
      status: 'In Progress',
      priority: 'High',
      requirements: ['REQ-COM-005', 'REQ-COM-007', 'REQ-COM-008'],
      demonstrator: 'Lt. Sarah Chen',
      witnesses: ['Maj. David Miller', 'Dr. Emily Davis', 'Robert Jackson'],
      location: 'Communications Lab',
      scheduledDate: '2023-03-08',
      completionDate: null,
      duration: '3 hours',
      equipment: ['Primary Communication Unit', 'Backup Communication Unit', 'Signal Generator', 'Spectrum Analyzer'],
      procedure: [
        { id: 'STEP-001', step: 'Establish baseline communications', expected: 'Normal operation on primary system', actual: 'Primary system operating within parameters', status: 'Pass', notes: '' },
        { id: 'STEP-002', step: 'Simulate primary system failure', expected: 'Automatic detection of failure', actual: 'Failure correctly detected', status: 'Pass', notes: 'Detection time: 1.2 seconds' },
        { id: 'STEP-003', step: 'Verify backup system activation', expected: 'Backup system activates within 2 seconds', actual: 'Activation time: 1.8 seconds', status: 'Pass', notes: '' },
        { id: 'STEP-004', step: 'Test data integrity during transition', expected: 'No data loss during transition', actual: '', status: 'Not Started', notes: 'Currently analyzing data logs' },
        { id: 'STEP-005', step: 'Return to primary system', expected: 'Smooth transition back to primary', actual: '', status: 'Not Started', notes: '' }
      ],
      media: [
        { type: 'Image', title: 'Redundancy Test Setup', description: 'Photo of the test configuration', url: 'images/comms_redundancy_setup.jpg' },
        { type: 'Video', title: 'Failover Sequence', description: 'Video of the failover sequence', url: 'videos/failover_sequence.mp4' }
      ],
      issues: [],
      notes: 'Demonstration proceeding well. Initial steps completed successfully, now analyzing data integrity during transition.'
    }
  ]);

  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedDemo, setSelectedDemo] = useState<DemonstrationActivity | null>(null);

  // Filter demonstrations based on search term and status
  const filteredDemos = demonstrations.filter(demo => {
    const matchesSearch = 
      demo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      demo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      demo.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      demo.requirements.some(req => req.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'All' || demo.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Helper function for status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Planned': return 'bg-blue-100 text-blue-800';
      case 'Ready': return 'bg-indigo-100 text-indigo-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Blocked': return 'bg-red-100 text-red-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
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

  // Helper function for procedure step status badge
  const getStepStatusBadge = (status: string) => {
    switch (status) {
      case 'Pass': return 'bg-green-100 text-green-800';
      case 'Fail': return 'bg-red-100 text-red-800';
      case 'Not Started': return 'bg-gray-100 text-gray-800';
      case 'N/A': return 'bg-blue-100 text-blue-800';
      case 'Deferred': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function for issue severity badge
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'Major': return 'bg-orange-100 text-orange-800';
      case 'Minor': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function for issue status badge
  const getIssueStatusBadge = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-red-100 text-red-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-blue-100 text-blue-800';
      case 'Closed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function for media type icon
  const getMediaTypeIcon = (type: string) => {
    switch (type) {
      case 'Image': return <FaIcons.FaImage className="text-blue-500" />;
      case 'Video': return <FaIcons.FaVideo className="text-blue-500" />;
      case 'Document': return <FaIcons.FaFileAlt className="text-blue-500" />;
      default: return <FaIcons.FaFile className="text-blue-500" />;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      {selectedDemo ? (
        // Detailed view of selected demonstration
        <div>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <button 
                className="p-2 bg-gray-100 rounded-full mr-3"
                onClick={() => setSelectedDemo(null)}
              >
                <BiIcons.BiArrowBack />
              </button>
              <h2 className="text-2xl font-bold">{selectedDemo.name}</h2>
            </div>
            <div className="flex space-x-2">
              <span className={`px-3 py-1 rounded text-sm font-medium ${getStatusBadge(selectedDemo.status)}`}>
                {selectedDemo.status}
              </span>
              <span className={`px-3 py-1 rounded text-sm font-medium ${getPriorityBadge(selectedDemo.priority)}`}>
                {selectedDemo.priority}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3 text-gray-700">Details</h3>
              <div className="space-y-2">
                <p><span className="font-medium">ID:</span> {selectedDemo.id}</p>
                <p><span className="font-medium">Demonstrator:</span> {selectedDemo.demonstrator}</p>
                <p><span className="font-medium">Location:</span> {selectedDemo.location}</p>
                <p><span className="font-medium">Scheduled:</span> {selectedDemo.scheduledDate || 'Not scheduled'}</p>
                {selectedDemo.completionDate && (
                  <p><span className="font-medium">Completed:</span> {selectedDemo.completionDate}</p>
                )}
                <p><span className="font-medium">Duration:</span> {selectedDemo.duration}</p>
                <div>
                  <p className="font-medium mb-1">Witnesses:</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {selectedDemo.witnesses.map((witness, index) => (
                      <li key={index}>{witness}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 text-gray-700">Description</h3>
              <p className="mb-4">{selectedDemo.description}</p>
              
              <h3 className="font-semibold mt-4 mb-2 text-gray-700">Requirements</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedDemo.requirements.map((req, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm">
                    {req}
                  </span>
                ))}
              </div>
              
              <h3 className="font-semibold mt-4 mb-2 text-gray-700">Equipment</h3>
              <div className="flex flex-wrap gap-2">
                {selectedDemo.equipment.map((equip, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                    {equip}
                  </span>
                ))}
              </div>
              
              {selectedDemo.notes && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2 text-gray-700">Notes</h3>
                  <p className="text-sm">{selectedDemo.notes}</p>
                </div>
              )}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Demonstration Procedure</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="py-2 px-4 text-left">Step</th>
                    <th className="py-2 px-4 text-left">Description</th>
                    <th className="py-2 px-4 text-left">Expected Result</th>
                    <th className="py-2 px-4 text-left">Actual Result</th>
                    <th className="py-2 px-4 text-left">Status</th>
                    <th className="py-2 px-4 text-left">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedDemo.procedure.map((step) => (
                    <tr key={step.id} className="border-b">
                      <td className="py-2 px-4">{step.id}</td>
                      <td className="py-2 px-4">{step.step}</td>
                      <td className="py-2 px-4">{step.expected}</td>
                      <td className="py-2 px-4">{step.actual || '-'}</td>
                      <td className="py-2 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStepStatusBadge(step.status)}`}>
                          {step.status}
                        </span>
                      </td>
                      <td className="py-2 px-4">{step.notes || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {selectedDemo.media.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Media</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedDemo.media.map((media, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex items-center mb-2">
                      {getMediaTypeIcon(media.type)}
                      <span className="ml-2 font-medium">{media.title}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{media.description}</p>
                    <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                      <FaIcons.FaDownload className="mr-1" /> Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedDemo.issues.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Issues</h3>
              <div className="space-y-3">
                {selectedDemo.issues.map((issue) => (
                  <div key={issue.id} className="border rounded-lg p-3">
                    <div className="flex justify-between">
                      <span className="font-medium">{issue.id}</span>
                      <div className="flex space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityBadge(issue.severity)}`}>
                          {issue.severity}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getIssueStatusBadge(issue.status)}`}>
                          {issue.status}
                        </span>
                      </div>
                    </div>
                    <p className="mt-2">{issue.description}</p>
                    <p className="mt-1 text-sm text-gray-600">Assignee: {issue.assignee}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        // List view of all demonstrations
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h2 className="text-2xl font-bold mb-4 sm:mb-0">Demonstration Verification Activities</h2>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
              onClick={() => { /* Add new demonstration functionality */ }}
            >
              <FaIcons.FaPlus className="mr-2" />
              Add Demonstration
            </button>
          </div>

          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search demonstrations..."
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
                <option value="Ready">Ready</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Blocked">Blocked</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Stats summary */}
          <div className="mb-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="text-blue-800 text-lg font-semibold">{demonstrations.length}</div>
              <div className="text-blue-600 text-sm">Total Demonstrations</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <div className="text-green-800 text-lg font-semibold">
                {demonstrations.filter(d => d.status === 'Completed').length}
              </div>
              <div className="text-green-600 text-sm">Completed</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
              <div className="text-yellow-800 text-lg font-semibold">
                {demonstrations.filter(d => d.status === 'In Progress').length}
              </div>
              <div className="text-yellow-600 text-sm">In Progress</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="text-blue-800 text-lg font-semibold">
                {demonstrations.filter(d => d.status === 'Planned' || d.status === 'Ready').length}
              </div>
              <div className="text-blue-600 text-sm">Planned/Ready</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
              <div className="text-red-800 text-lg font-semibold">
                {demonstrations.filter(d => d.status === 'Blocked' || d.status === 'Cancelled').length}
              </div>
              <div className="text-red-600 text-sm">Blocked/Cancelled</div>
            </div>
          </div>

          {/* Demonstrations list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDemos.length > 0 ? (
              filteredDemos.map(demo => (
                <div 
                  key={demo.id} 
                  className="border rounded-lg overflow-hidden hover:shadow-md cursor-pointer transition-shadow"
                  onClick={() => setSelectedDemo(demo)}
                >
                  <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
                    <div className="font-bold flex items-center">
                      <span>{demo.id}</span>
                      {demo.priority === 'Critical' && (
                        <span className="ml-2 text-red-600" title="Critical Priority">
                          <FaIcons.FaExclamationCircle />
                        </span>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(demo.status)}`}>
                        {demo.status}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityBadge(demo.priority)}`}>
                        {demo.priority}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{demo.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{demo.description}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                      <div className="text-sm">
                        <span className="font-medium">Demonstrator:</span> {demo.demonstrator}
                      </div>
                      
                      <div className="text-sm">
                        <span className="font-medium">Location:</span> {demo.location}
                      </div>
                      
                      <div className="text-sm">
                        <span className="font-medium">Date:</span> {demo.scheduledDate || 'Not scheduled'}
                      </div>
                      
                      <div className="text-sm">
                        <span className="font-medium">Duration:</span> {demo.duration}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {demo.requirements.map((req, index) => (
                        <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                          {req}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-y-2 justify-between text-sm">
                      <div>
                        <span className="font-medium">Steps:</span> {demo.procedure.length}
                        <span className="ml-2 text-green-600">
                          {demo.procedure.filter(p => p.status === 'Pass').length} pass
                        </span>
                        {demo.procedure.filter(p => p.status === 'Fail').length > 0 && (
                          <span className="ml-2 text-red-600">
                            {demo.procedure.filter(p => p.status === 'Fail').length} fail
                          </span>
                        )}
                      </div>
                      
                      {demo.issues.length > 0 && (
                        <div className="text-sm text-red-600 flex items-center">
                          <FaIcons.FaExclamationTriangle className="mr-1" />
                          {demo.issues.length} issue{demo.issues.length !== 1 ? 's' : ''}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-8 text-gray-500">
                <AiIcons.AiOutlineInbox className="text-6xl mx-auto mb-4" />
                <p>No demonstration activities found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Demonstration; 