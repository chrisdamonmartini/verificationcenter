import React, { useState } from 'react';
import { FaSearch, FaFilter, FaCheck, FaTimes, FaExclamationTriangle, FaSignature, FaFileAlt, FaClipboardCheck, FaEye, FaEdit, FaDownload } from 'react-icons/fa';

// Define interfaces for compliance data
interface RequirementVerification {
  id: string;
  requirementId: string;
  requirementText: string;
  category: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  verificationMethod: 'Test' | 'Analysis' | 'Demonstration' | 'Inspection' | 'Simulation';
  status: 'Open' | 'In Progress' | 'Verified' | 'Not Verified' | 'Not Applicable' | 'Waived';
  evidence: Evidence[];
  assignee: string;
  verificationDate: string | null;
  closureDate: string | null;
  closedBy: string | null;
  waiverJustification: string | null;
  notes: string;
}

interface Evidence {
  id: string;
  type: 'Test Report' | 'Analysis Report' | 'Simulation Result' | 'Inspection Record' | 'Document' | 'Other';
  name: string;
  url: string;
  date: string;
  status: 'Draft' | 'In Review' | 'Approved' | 'Rejected';
  reviewer: string | null;
  reviewDate: string | null;
  notes: string;
}

interface VerificationSignature {
  id: string;
  role: string;
  name: string;
  date: string | null;
  status: 'Pending' | 'Approved' | 'Rejected';
  comments: string;
}

const VerificationClosure: React.FC = () => {
  // Sample data for demonstration
  const [requirements, setRequirements] = useState<RequirementVerification[]>([
    {
      id: 'VER-001',
      requirementId: 'REQ-001',
      requirementText: 'The system shall provide navigation accuracy within 5 meters CEP under normal operating conditions.',
      category: 'Performance',
      priority: 'High',
      verificationMethod: 'Test',
      status: 'Verified',
      evidence: [
        {
          id: 'EVD-001',
          type: 'Test Report',
          name: 'Navigation Accuracy Test Report',
          url: '/documents/NAV-TEST-001.pdf',
          date: '2023-10-15',
          status: 'Approved',
          reviewer: 'Sarah Johnson',
          reviewDate: '2023-10-20',
          notes: 'All test cases passed with margin.'
        }
      ],
      assignee: 'John Smith',
      verificationDate: '2023-10-15',
      closureDate: '2023-10-22',
      closedBy: 'David Wong',
      waiverJustification: null,
      notes: 'Verified with flight test data showing 3.2m CEP.'
    },
    {
      id: 'VER-002',
      requirementId: 'REQ-002',
      requirementText: 'The system shall operate continuously for at least 12 hours without performance degradation.',
      category: 'Performance',
      priority: 'Critical',
      verificationMethod: 'Test',
      status: 'In Progress',
      evidence: [
        {
          id: 'EVD-002',
          type: 'Test Report',
          name: 'Endurance Test Preliminary Results',
          url: '/documents/END-TEST-002.pdf',
          date: '2023-11-05',
          status: 'Draft',
          reviewer: null,
          reviewDate: null,
          notes: 'Test started on 2023-11-05, currently at 8 hours with no issues.'
        }
      ],
      assignee: 'Mia Rodriguez',
      verificationDate: null,
      closureDate: null,
      closedBy: null,
      waiverJustification: null,
      notes: 'Endurance test in progress. Expected completion on 2023-11-07.'
    },
    {
      id: 'VER-003',
      requirementId: 'REQ-003',
      requirementText: 'The system shall withstand temperature ranges from -20°C to +50°C without performance degradation.',
      category: 'Environmental',
      priority: 'High',
      verificationMethod: 'Test',
      status: 'Not Verified',
      evidence: [],
      assignee: 'John Smith',
      verificationDate: null,
      closureDate: null,
      closedBy: null,
      waiverJustification: null,
      notes: 'Environmental chamber scheduled for December 2023.'
    },
    {
      id: 'VER-004',
      requirementId: 'REQ-004',
      requirementText: 'The system shall comply with EMI/EMC requirements as specified in MIL-STD-461.',
      category: 'Compliance',
      priority: 'Medium',
      verificationMethod: 'Test',
      status: 'Waived',
      evidence: [
        {
          id: 'EVD-003',
          type: 'Document',
          name: 'EMI/EMC Waiver Approval',
          url: '/documents/WAIVER-EMC-001.pdf',
          date: '2023-09-10',
          status: 'Approved',
          reviewer: 'Sarah Johnson',
          reviewDate: '2023-09-15',
          notes: 'Waiver approved by Chief Engineer.'
        }
      ],
      assignee: 'Robert Lee',
      verificationDate: null,
      closureDate: '2023-09-15',
      closedBy: 'David Wong',
      waiverJustification: 'System will not be used near sensitive electronics. Commercial EMI/EMC testing deemed sufficient.',
      notes: 'Formal verification waived. Commercial testing performed with acceptable results.'
    },
    {
      id: 'VER-005',
      requirementId: 'REQ-005',
      requirementText: 'The system shall have a mean time between failures (MTBF) of at least 5000 hours.',
      category: 'Reliability',
      priority: 'High',
      verificationMethod: 'Analysis',
      status: 'Verified',
      evidence: [
        {
          id: 'EVD-004',
          type: 'Analysis Report',
          name: 'Reliability Analysis Report',
          url: '/documents/REL-RPT-001.pdf',
          date: '2023-08-20',
          status: 'Approved',
          reviewer: 'David Wong',
          reviewDate: '2023-08-25',
          notes: 'Analysis shows MTBF of 6750 hours.'
        }
      ],
      assignee: 'Emily Chen',
      verificationDate: '2023-08-20',
      closureDate: '2023-08-27',
      closedBy: 'David Wong',
      waiverJustification: null,
      notes: 'Verified by reliability analysis using component data and operational profiles.'
    },
    {
      id: 'VER-006',
      requirementId: 'REQ-006',
      requirementText: 'The system shall process sensor data with a latency of less than 100ms.',
      category: 'Performance',
      priority: 'Medium',
      verificationMethod: 'Test',
      status: 'Not Verified',
      evidence: [],
      assignee: 'John Smith',
      verificationDate: null,
      closureDate: null,
      closedBy: null,
      waiverJustification: null,
      notes: 'Test planned for November 2023.'
    },
    {
      id: 'VER-007',
      requirementId: 'REQ-007',
      requirementText: 'The system shall provide secure data transmission using AES-256 encryption.',
      category: 'Security',
      priority: 'Critical',
      verificationMethod: 'Demonstration',
      status: 'Not Verified',
      evidence: [],
      assignee: 'Robert Lee',
      verificationDate: null,
      closureDate: null,
      closedBy: null,
      waiverJustification: null,
      notes: 'Security audit scheduled for December 2023.'
    },
    {
      id: 'VER-008',
      requirementId: 'REQ-008',
      requirementText: 'The system shall be operable by a single operator with basic training.',
      category: 'Usability',
      priority: 'Medium',
      verificationMethod: 'Demonstration',
      status: 'Verified',
      evidence: [
        {
          id: 'EVD-005',
          type: 'Document',
          name: 'Usability Test Report',
          url: '/documents/USR-TST-001.pdf',
          date: '2023-07-15',
          status: 'Approved',
          reviewer: 'Sarah Johnson',
          reviewDate: '2023-07-20',
          notes: 'Test subjects completed all tasks successfully after 2-hour training.'
        }
      ],
      assignee: 'Mia Rodriguez',
      verificationDate: '2023-07-15',
      closureDate: '2023-07-22',
      closedBy: 'David Wong',
      waiverJustification: null,
      notes: 'Demonstrated with 3 operators after standard training.'
    }
  ]);

  const [signatures, setSignatures] = useState<VerificationSignature[]>([
    {
      id: 'SIG-001',
      role: 'Verification Engineer',
      name: 'John Smith',
      date: '2023-10-25',
      status: 'Approved',
      comments: 'All verification activities completed and results documented.'
    },
    {
      id: 'SIG-002',
      role: 'Quality Assurance',
      name: 'Sarah Johnson',
      date: '2023-10-27',
      status: 'Approved',
      comments: 'Quality records verified and compliant.'
    },
    {
      id: 'SIG-003',
      role: 'Program Manager',
      name: 'Michael Brown',
      date: null,
      status: 'Pending',
      comments: ''
    },
    {
      id: 'SIG-004',
      role: 'Customer Representative',
      name: 'Lisa Garcia',
      date: null,
      status: 'Pending',
      comments: ''
    }
  ]);

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [methodFilter, setMethodFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [selectedRequirement, setSelectedRequirement] = useState<RequirementVerification | null>(null);

  // Filter requirements
  const filteredRequirements = requirements.filter(req => {
    return (
      (searchTerm === '' || 
        req.requirementId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.requirementText.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.notes.toLowerCase().includes(searchTerm.toLowerCase())
      ) &&
      (statusFilter === null || req.status === statusFilter) &&
      (methodFilter === null || req.verificationMethod === methodFilter) &&
      (categoryFilter === null || req.category === categoryFilter)
    );
  });

  // Calculate stats
  const totalRequirements = requirements.length;
  const verifiedCount = requirements.filter(r => r.status === 'Verified').length;
  const inProgressCount = requirements.filter(r => r.status === 'In Progress').length;
  const notVerifiedCount = requirements.filter(r => r.status === 'Not Verified').length;
  const waivedCount = requirements.filter(r => r.status === 'Waived').length;
  const verificationProgress = Math.round((verifiedCount + waivedCount) / totalRequirements * 100);

  // Helper functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Verified': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Not Verified': return 'bg-gray-100 text-gray-800';
      case 'Not Applicable': return 'bg-purple-100 text-purple-800';
      case 'Waived': return 'bg-yellow-100 text-yellow-800';
      case 'Open': return 'bg-gray-100 text-gray-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Verified': return <FaCheck className="text-green-600" />;
      case 'In Progress': return <FaExclamationTriangle className="text-blue-600" />;
      case 'Not Verified': return <FaTimes className="text-gray-600" />;
      case 'Waived': return <FaExclamationTriangle className="text-yellow-600" />;
      default: return <FaTimes className="text-gray-600" />;
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

  const getEvidenceTypeIcon = (type: string) => {
    switch (type) {
      case 'Test Report': return <FaClipboardCheck className="text-blue-600" />;
      case 'Analysis Report': return <FaFileAlt className="text-purple-600" />;
      case 'Simulation Result': return <FaFileAlt className="text-indigo-600" />;
      case 'Inspection Record': return <FaClipboardCheck className="text-green-600" />;
      case 'Document': return <FaFileAlt className="text-gray-600" />;
      default: return <FaFileAlt className="text-gray-600" />;
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'Test': return 'bg-blue-100 text-blue-800';
      case 'Analysis': return 'bg-purple-100 text-purple-800';
      case 'Demonstration': return 'bg-green-100 text-green-800';
      case 'Inspection': return 'bg-yellow-100 text-yellow-800';
      case 'Simulation': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSelectRequirement = (requirement: RequirementVerification) => {
    setSelectedRequirement(requirement);
  };

  const handleCloseDetail = () => {
    setSelectedRequirement(null);
  };

  // Get unique categories for filtering
  const uniqueCategories = Array.from(new Set(requirements.map(req => req.category)));

  return (
    <div className="bg-gray-50 p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Verification Closure</h1>
        
        {/* Progress Overview */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <h2 className="text-xl font-semibold">Verification Status</h2>
            <div className="flex space-x-2 mt-2 md:mt-0">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center text-sm">
                <FaDownload className="mr-2" /> Export Report
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 flex flex-col items-center justify-center">
              <div className="text-2xl font-semibold">{totalRequirements}</div>
              <div className="text-sm text-gray-600">Total Requirements</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200 flex flex-col items-center justify-center">
              <div className="text-2xl font-semibold">{verifiedCount}</div>
              <div className="text-sm text-gray-600">Verified</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 flex flex-col items-center justify-center">
              <div className="text-2xl font-semibold">{inProgressCount}</div>
              <div className="text-sm text-gray-600">In Progress</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 flex flex-col items-center justify-center">
              <div className="text-2xl font-semibold">{waivedCount}</div>
              <div className="text-sm text-gray-600">Waived</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex flex-col items-center justify-center">
              <div className="text-2xl font-semibold">{notVerifiedCount}</div>
              <div className="text-sm text-gray-600">Not Verified</div>
            </div>
          </div>
          
          <div className="mb-2 flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Verification Progress</span>
            <span className="text-sm font-medium text-gray-700">{verificationProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-green-600 h-2.5 rounded-full" 
              style={{ width: `${verificationProgress}%` }}
            ></div>
          </div>
          
          {/* Signature Status */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Closure Signatures</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comments</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {signatures.map((signature) => (
                    <tr key={signature.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{signature.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{signature.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{signature.date || 'Pending'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(signature.status)}`}>
                          {signature.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{signature.comments || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Requirements Verification List */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-xl font-semibold mb-2 md:mb-0">Requirements Verification</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search requirements..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="absolute left-3 top-2.5 text-gray-400">
                <FaSearch />
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Verification Status</label>
              <select
                className="border border-gray-300 rounded-md p-2 w-full text-sm"
                value={statusFilter || ''}
                onChange={(e) => setStatusFilter(e.target.value === '' ? null : e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="Verified">Verified</option>
                <option value="In Progress">In Progress</option>
                <option value="Not Verified">Not Verified</option>
                <option value="Waived">Waived</option>
                <option value="Not Applicable">Not Applicable</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Verification Method</label>
              <select
                className="border border-gray-300 rounded-md p-2 w-full text-sm"
                value={methodFilter || ''}
                onChange={(e) => setMethodFilter(e.target.value === '' ? null : e.target.value)}
              >
                <option value="">All Methods</option>
                <option value="Test">Test</option>
                <option value="Analysis">Analysis</option>
                <option value="Demonstration">Demonstration</option>
                <option value="Inspection">Inspection</option>
                <option value="Simulation">Simulation</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                className="border border-gray-300 rounded-md p-2 w-full text-sm"
                value={categoryFilter || ''}
                onChange={(e) => setCategoryFilter(e.target.value === '' ? null : e.target.value)}
              >
                <option value="">All Categories</option>
                {uniqueCategories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button 
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-md flex items-center text-sm transition-colors"
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter(null);
                  setMethodFilter(null);
                  setCategoryFilter(null);
                }}
              >
                <FaFilter className="mr-2" /> Reset Filters
              </button>
            </div>
          </div>
          
          {/* Requirements Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requirement</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Evidence</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequirements.map((req) => (
                  <tr 
                    key={req.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleSelectRequirement(req)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{req.requirementId}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 line-clamp-2">{req.requirementText}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getMethodColor(req.verificationMethod)}`}>
                        {req.verificationMethod}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mr-2">{getStatusIcon(req.status)}</div>
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(req.status)}`}>
                          {req.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {req.evidence.length > 0 ? (
                        <div className="flex items-center">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                            {req.evidence.length} {req.evidence.length === 1 ? 'Document' : 'Documents'}
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-400">None</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectRequirement(req);
                        }}
                      >
                        <FaEye />
                      </button>
                      <button 
                        className="text-blue-600 hover:text-blue-900"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Edit functionality would go here
                        }}
                      >
                        <FaEdit />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Requirement count */}
          <div className="mt-4 text-sm text-gray-700">
            Showing <span className="font-medium">{filteredRequirements.length}</span> of <span className="font-medium">{requirements.length}</span> requirements
          </div>
        </div>
        
        {/* Detail Modal */}
        {selectedRequirement && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={handleCloseDetail}>
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedRequirement.requirementId}</h2>
                    <div className="text-sm text-gray-500 mt-1">Verification ID: {selectedRequirement.id}</div>
                  </div>
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedRequirement.status)}`}>
                      {selectedRequirement.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getMethodColor(selectedRequirement.verificationMethod)}`}>
                      {selectedRequirement.verificationMethod}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(selectedRequirement.priority)}`}>
                      {selectedRequirement.priority}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Requirement</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">{selectedRequirement.requirementText}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Verification Details</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Category</p>
                        <p className="text-gray-700">{selectedRequirement.category}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Assignee</p>
                        <p className="text-gray-700">{selectedRequirement.assignee}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Verification Date</p>
                        <p className="text-gray-700">{selectedRequirement.verificationDate || 'Not Yet Verified'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Closure Date</p>
                        <p className="text-gray-700">{selectedRequirement.closureDate || 'Not Yet Closed'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Closed By</p>
                        <p className="text-gray-700">{selectedRequirement.closedBy || 'N/A'}</p>
                      </div>
                    </div>
                    {selectedRequirement.notes && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-500">Notes</p>
                        <p className="text-gray-700">{selectedRequirement.notes}</p>
                      </div>
                    )}
                    {selectedRequirement.waiverJustification && (
                      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm font-medium text-yellow-800">Waiver Justification</p>
                        <p className="text-yellow-700">{selectedRequirement.waiverJustification}</p>
                      </div>
                    )}
                  </div>
                </div>

                {selectedRequirement.evidence.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Evidence</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      {selectedRequirement.evidence.map((evidence, index) => (
                        <div key={evidence.id} className={`p-3 ${index > 0 ? 'border-t border-gray-200 pt-4 mt-4' : ''}`}>
                          <div className="flex justify-between items-start">
                            <div className="flex items-start">
                              <div className="mr-3 mt-1">{getEvidenceTypeIcon(evidence.type)}</div>
                              <div>
                                <div className="font-medium text-gray-900">{evidence.name}</div>
                                <div className="text-sm text-gray-500">{evidence.type} • {evidence.date}</div>
                              </div>
                            </div>
                            <div>
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(evidence.status)}`}>
                                {evidence.status}
                              </span>
                            </div>
                          </div>
                          {evidence.notes && (
                            <div className="mt-2 text-sm text-gray-700">
                              {evidence.notes}
                            </div>
                          )}
                          {evidence.reviewer && (
                            <div className="mt-2 text-sm text-gray-500">
                              Reviewed by: {evidence.reviewer} on {evidence.reviewDate}
                            </div>
                          )}
                          <div className="mt-2">
                            <a 
                              href={evidence.url} 
                              className="text-indigo-600 hover:text-indigo-900 text-sm flex items-center"
                              onClick={(e) => e.preventDefault()}
                            >
                              <FaDownload className="mr-1" /> Download Document
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button 
                    className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                    onClick={handleCloseDetail}
                  >
                    Close
                  </button>
                  <button className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationClosure; 