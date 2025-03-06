import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import * as HiIcons from 'react-icons/hi';

// Define interface for inspection activities
interface InspectionActivity {
  id: string;
  name: string;
  description: string;
  status: 'Planned' | 'In Progress' | 'Completed' | 'Blocked' | 'Cancelled';
  requirements: string[];
  inspector: string;
  date: string | null;
  location: string;
  duration: string;
  checklist: {
    id: string;
    item: string;
    status: 'Pending' | 'Pass' | 'Fail' | 'N/A';
    comments: string;
  }[];
  findings: {
    id: string;
    description: string;
    severity: 'Minor' | 'Major' | 'Critical';
    status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
    assignee: string;
  }[];
  artifacts: string[];
  notes: string;
}

const Inspection: React.FC = () => {
  // Sample inspection activities data
  const [inspections] = useState<InspectionActivity[]>([
    {
      id: 'INSP-001',
      name: 'Avionics Bay Physical Inspection',
      description: 'Visual inspection of avionics bay wiring, connections, and mounting hardware.',
      status: 'Completed',
      requirements: ['REQ-AVI-001', 'REQ-AVI-002', 'REQ-AVI-003'],
      inspector: 'John Smith',
      date: '2023-02-15',
      location: 'Assembly Building 3',
      duration: '2 hours',
      checklist: [
        { id: 'CL-001', item: 'All cable runs properly secured', status: 'Pass', comments: 'Compliant with specification XYZ-123' },
        { id: 'CL-002', item: 'Connector pin retention verification', status: 'Pass', comments: 'All connectors tested and verified' },
        { id: 'CL-003', item: 'Mounting hardware torqued to spec', status: 'Pass', comments: 'Torque values checked and documented' },
        { id: 'CL-004', item: 'Interference/clearance check', status: 'Pass', comments: 'No interference with nearby assemblies' }
      ],
      findings: [
        { id: 'FND-001', description: 'Cable tie too close to connector body', severity: 'Minor', status: 'Resolved', assignee: 'Robert Johnson' }
      ],
      artifacts: ['avionics_inspection_form.pdf', 'bay_photos_20230215.zip'],
      notes: 'Inspection completed within planned timeframe. Follow-up inspection scheduled in 6 months.'
    },
    {
      id: 'INSP-002',
      name: 'Landing Gear Assembly Inspection',
      description: 'Detailed inspection of landing gear mechanical components and hydraulic systems.',
      status: 'In Progress',
      requirements: ['REQ-LG-001', 'REQ-LG-002', 'REQ-LG-005'],
      inspector: 'Maria Rodriguez',
      date: '2023-03-03',
      location: 'Hangar 5',
      duration: '4 hours',
      checklist: [
        { id: 'CL-001', item: 'Hydraulic line integrity check', status: 'Pass', comments: 'No leaks detected' },
        { id: 'CL-002', item: 'Structural component inspection', status: 'Pending', comments: '' },
        { id: 'CL-003', item: 'Actuator operation test', status: 'Pending', comments: '' },
        { id: 'CL-004', item: 'Safety switch verification', status: 'Fail', comments: 'Switch S-22 not engaging correctly' }
      ],
      findings: [
        { id: 'FND-001', description: 'Safety switch S-22 failed operational test', severity: 'Major', status: 'Open', assignee: 'David Kim' }
      ],
      artifacts: ['landing_gear_checklist.pdf'],
      notes: 'Inspection paused pending replacement of safety switch S-22.'
    },
    {
      id: 'INSP-003',
      name: 'Fuel System Compliance Inspection',
      description: 'Regulatory compliance inspection of fuel system components and safety mechanisms.',
      status: 'Planned',
      requirements: ['REQ-FUEL-001', 'REQ-FUEL-003', 'REQ-FUEL-007', 'REQ-SAFETY-022'],
      inspector: 'James Wilson',
      date: '2023-04-12',
      location: 'Fuel Systems Lab',
      duration: '6 hours',
      checklist: [
        { id: 'CL-001', item: 'Fuel line pressure test', status: 'Pending', comments: '' },
        { id: 'CL-002', item: 'Valve operation verification', status: 'Pending', comments: '' },
        { id: 'CL-003', item: 'Seal integrity check', status: 'Pending', comments: '' },
        { id: 'CL-004', item: 'Emergency shutoff system test', status: 'Pending', comments: '' }
      ],
      findings: [],
      artifacts: ['inspection_plan_fuel_system_v2.pdf'],
      notes: 'Regulatory inspector will be present during this inspection.'
    },
    {
      id: 'INSP-004',
      name: 'Environmental Control System Documentation Review',
      description: 'Review of ECS design documentation against requirements and standards.',
      status: 'Completed',
      requirements: ['REQ-ECS-001', 'REQ-ECS-002', 'REQ-DOC-015'],
      inspector: 'Sarah Chen',
      date: '2023-01-20',
      location: 'Engineering Office',
      duration: '5 hours',
      checklist: [
        { id: 'CL-001', item: 'System specifications review', status: 'Pass', comments: 'All specifications present and correct' },
        { id: 'CL-002', item: 'Design calculation verification', status: 'Pass', comments: 'Calculations verified by independent analysis' },
        { id: 'CL-003', item: 'Drawing compliance check', status: 'Pass', comments: 'All drawings comply with standards' },
        { id: 'CL-004', item: 'Test procedure review', status: 'Fail', comments: 'Test procedure TP-ECS-003 missing critical steps' }
      ],
      findings: [
        { id: 'FND-001', description: 'Test procedure TP-ECS-003 incomplete', severity: 'Major', status: 'Resolved', assignee: 'Michael Brown' }
      ],
      artifacts: ['ecs_doc_review_report.pdf', 'revised_test_procedure_tp-ecs-003.pdf'],
      notes: 'All documentation issues have been addressed. Ready for physical inspection.'
    }
  ]);

  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedInspection, setSelectedInspection] = useState<InspectionActivity | null>(null);

  // Filter inspections based on search term and status
  const filteredInspections = inspections.filter(inspection => {
    const matchesSearch = 
      inspection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inspection.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inspection.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inspection.requirements.some(req => req.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'All' || inspection.status === statusFilter;
    
    return matchesSearch && matchesStatus;
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

  // Helper function for checklist item status badge
  const getChecklistStatusBadge = (status: string) => {
    switch (status) {
      case 'Pass': return 'bg-green-100 text-green-800';
      case 'Fail': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'N/A': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function for finding severity badge
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'Major': return 'bg-orange-100 text-orange-800';
      case 'Minor': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function for finding status badge
  const getFindingStatusBadge = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-red-100 text-red-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-blue-100 text-blue-800';
      case 'Closed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      {selectedInspection ? (
        // Detailed view of selected inspection
        <div>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <button 
                className="p-2 bg-gray-100 rounded-full mr-3"
                onClick={() => setSelectedInspection(null)}
              >
                <BiIcons.BiArrowBack />
              </button>
              <h2 className="text-2xl font-bold">{selectedInspection.name}</h2>
            </div>
            <span className={`px-3 py-1 rounded text-sm font-medium ${getStatusBadge(selectedInspection.status)}`}>
              {selectedInspection.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 text-gray-700">Details</h3>
              <div className="space-y-2">
                <p><span className="font-medium">ID:</span> {selectedInspection.id}</p>
                <p><span className="font-medium">Inspector:</span> {selectedInspection.inspector}</p>
                <p><span className="font-medium">Date:</span> {selectedInspection.date || 'Not scheduled'}</p>
                <p><span className="font-medium">Location:</span> {selectedInspection.location}</p>
                <p><span className="font-medium">Duration:</span> {selectedInspection.duration}</p>
              </div>
            </div>

            <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 text-gray-700">Description</h3>
              <p>{selectedInspection.description}</p>
              <h3 className="font-semibold mt-4 mb-2 text-gray-700">Requirements</h3>
              <div className="flex flex-wrap gap-2">
                {selectedInspection.requirements.map((req, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm">
                    {req}
                  </span>
                ))}
              </div>
              <h3 className="font-semibold mt-4 mb-2 text-gray-700">Notes</h3>
              <p>{selectedInspection.notes}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Inspection Checklist</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="py-2 px-4 text-left">Item</th>
                    <th className="py-2 px-4 text-left">Status</th>
                    <th className="py-2 px-4 text-left">Comments</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInspection.checklist.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-2 px-4">{item.item}</td>
                      <td className="py-2 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getChecklistStatusBadge(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-2 px-4">{item.comments}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {selectedInspection.findings.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Findings</h3>
              <div className="space-y-3">
                {selectedInspection.findings.map((finding) => (
                  <div key={finding.id} className="border rounded-lg p-3">
                    <div className="flex justify-between">
                      <span className="font-medium">{finding.id}</span>
                      <div className="flex space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityBadge(finding.severity)}`}>
                          {finding.severity}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getFindingStatusBadge(finding.status)}`}>
                          {finding.status}
                        </span>
                      </div>
                    </div>
                    <p className="mt-2">{finding.description}</p>
                    <p className="mt-1 text-sm text-gray-600">Assignee: {finding.assignee}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedInspection.artifacts.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Artifacts</h3>
              <div className="space-y-2">
                {selectedInspection.artifacts.map((artifact, index) => (
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
        // List view of all inspections
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h2 className="text-2xl font-bold mb-4 sm:mb-0">Inspection Verification Activities</h2>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
              onClick={() => { /* Add new inspection activity functionality */ }}
            >
              <FaIcons.FaPlus className="mr-2" />
              Add Inspection
            </button>
          </div>

          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search inspections..."
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
          </div>

          {/* Stats summary */}
          <div className="mb-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="text-blue-800 text-lg font-semibold">{inspections.length}</div>
              <div className="text-blue-600 text-sm">Total Inspections</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <div className="text-green-800 text-lg font-semibold">
                {inspections.filter(i => i.status === 'Completed').length}
              </div>
              <div className="text-green-600 text-sm">Completed</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
              <div className="text-yellow-800 text-lg font-semibold">
                {inspections.filter(i => i.status === 'In Progress').length}
              </div>
              <div className="text-yellow-600 text-sm">In Progress</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="text-blue-800 text-lg font-semibold">
                {inspections.filter(i => i.status === 'Planned').length}
              </div>
              <div className="text-blue-600 text-sm">Planned</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
              <div className="text-red-800 text-lg font-semibold">
                {inspections.filter(i => i.status === 'Blocked' || i.status === 'Cancelled').length}
              </div>
              <div className="text-red-600 text-sm">Blocked/Cancelled</div>
            </div>
          </div>

          {/* Inspections list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredInspections.length > 0 ? (
              filteredInspections.map(inspection => (
                <div 
                  key={inspection.id} 
                  className="border rounded-lg overflow-hidden hover:shadow-md cursor-pointer transition-shadow"
                  onClick={() => setSelectedInspection(inspection)}
                >
                  <div className="bg-gray-50 p-4 border-b flex justify-between">
                    <div className="font-bold">{inspection.id}</div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(inspection.status)}`}>
                      {inspection.status}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{inspection.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{inspection.description}</p>
                    
                    <div className="text-sm mb-2">
                      <span className="font-medium">Inspector:</span> {inspection.inspector}
                    </div>
                    
                    <div className="text-sm mb-2">
                      <span className="font-medium">Date:</span> {inspection.date || 'Not scheduled'}
                    </div>
                    
                    <div className="text-sm mb-3">
                      <span className="font-medium">Location:</span> {inspection.location}
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {inspection.requirements.map((req, index) => (
                        <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                          {req}
                        </span>
                      ))}
                    </div>
                    
                    {inspection.findings.length > 0 && (
                      <div className="text-sm text-red-600 mb-2">
                        <FaIcons.FaExclamationTriangle className="inline mr-1" />
                        {inspection.findings.length} finding{inspection.findings.length > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-8 text-gray-500">
                <AiIcons.AiOutlineInbox className="text-6xl mx-auto mb-4" />
                <p>No inspection activities found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Inspection; 