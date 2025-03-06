import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaFileAlt, FaDownload, FaChartBar, FaEye, FaCheck, FaTimes, FaExclamationTriangle, FaList, FaChartPie, FaExclamation, FaCheckCircle, FaClipboardList, FaFileAlt as FaFileAltSolid, FaClipboardCheck, FaExclamationCircle, FaHistory } from 'react-icons/fa';

// Define interfaces for compliance reports
interface ComplianceReport {
  id: string;
  title: string;
  type: 'System Verification' | 'Subsystem Verification' | 'Component Verification' | 'Requirement Verification' | 'Waiver Assessment';
  status: 'Draft' | 'In Review' | 'Approved' | 'Rejected';
  createdBy: string;
  createdDate: string;
  reviewedBy: string | null;
  reviewDate: string | null;
  approvedBy: string | null;
  approvalDate: string | null;
  documentNumber: string;
  version: string;
  description: string;
  requirements: string[];
  verificationItems: string[];
  reportSections: ReportSection[];
  attachments: Attachment[];
}

interface ReportSection {
  id: string;
  title: string;
  content: string;
  type: 'Introduction' | 'Scope' | 'References' | 'Results' | 'Conclusion' | 'Recommendations' | 'Other';
}

interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadDate: string;
  uploadedBy: string;
}

interface RequirementSummary {
  id: string;
  text: string;
  status: 'Verified' | 'Not Verified' | 'In Progress' | 'Waived' | 'Not Applicable';
}

interface RequirementCompliance {
  categoryName: string;
  totalRequirements: number;
  verified: number;
  inProgress: number;
  notVerified: number;
  waived: number;
  notApplicable: number;
}

const ComplianceReports: React.FC = () => {
  // Sample data for reports
  const [reports, setReports] = useState<ComplianceReport[]>([
    {
      id: 'REP-001',
      title: 'Navigation Subsystem Verification Report',
      type: 'Subsystem Verification',
      status: 'Approved',
      createdBy: 'John Smith',
      createdDate: '2023-10-05',
      reviewedBy: 'Sarah Johnson',
      reviewDate: '2023-10-15',
      approvedBy: 'David Wong',
      approvalDate: '2023-10-20',
      documentNumber: 'VR-NAV-001',
      version: '1.0',
      description: 'Verification report for the Navigation Subsystem covering all performance and interface requirements.',
      requirements: ['REQ-001', 'REQ-002', 'REQ-005', 'REQ-008'],
      verificationItems: ['VER-001', 'VER-002', 'VER-005', 'VER-008'],
      reportSections: [
        {
          id: 'SEC-001',
          title: 'Introduction',
          content: 'This report documents the verification activities performed for the Navigation Subsystem as part of the overall system verification.',
          type: 'Introduction'
        },
        {
          id: 'SEC-002',
          title: 'Verification Scope',
          content: 'The scope includes verification of performance requirements, interface requirements, and environmental requirements.',
          type: 'Scope'
        },
        {
          id: 'SEC-003',
          title: 'Verification Results',
          content: 'All performance requirements were verified through a combination of testing and analysis. The navigation accuracy was measured to be 3.2m CEP, which exceeds the requirement of 5m CEP.',
          type: 'Results'
        },
        {
          id: 'SEC-004',
          title: 'Conclusions and Recommendations',
          content: 'The Navigation Subsystem meets or exceeds all requirements. It is recommended to proceed with system integration.',
          type: 'Conclusion'
        }
      ],
      attachments: [
        {
          id: 'ATT-001',
          name: 'Navigation Accuracy Test Data.xlsx',
          type: 'application/xlsx',
          size: 1240000,
          url: '/documents/nav-test-data.xlsx',
          uploadDate: '2023-10-02',
          uploadedBy: 'John Smith'
        },
        {
          id: 'ATT-002',
          name: 'Navigation Subsystem Test Procedure.pdf',
          type: 'application/pdf',
          size: 3500000,
          url: '/documents/nav-test-procedure.pdf',
          uploadDate: '2023-09-15',
          uploadedBy: 'John Smith'
        }
      ]
    },
    {
      id: 'REP-002',
      title: 'EMI/EMC Compliance Waiver Assessment',
      type: 'Waiver Assessment',
      status: 'Approved',
      createdBy: 'Robert Lee',
      createdDate: '2023-09-01',
      reviewedBy: 'Sarah Johnson',
      reviewDate: '2023-09-08',
      approvedBy: 'David Wong',
      approvalDate: '2023-09-10',
      documentNumber: 'WAI-EMC-001',
      version: '1.0',
      description: 'Assessment of the impact of waiving formal EMI/EMC testing for the system.',
      requirements: ['REQ-004'],
      verificationItems: ['VER-004'],
      reportSections: [
        {
          id: 'SEC-005',
          title: 'Introduction',
          content: 'This document assesses the risk and impact of waiving formal EMI/EMC testing as specified in MIL-STD-461.',
          type: 'Introduction'
        },
        {
          id: 'SEC-006',
          title: 'Waiver Justification',
          content: 'The system will not be used near sensitive electronics. Commercial EMI/EMC testing performed showed the system is compliant with commercial standards.',
          type: 'Scope'
        },
        {
          id: 'SEC-007',
          title: 'Risk Assessment',
          content: 'The risk of EMI/EMC issues is assessed as low based on the operating environment and commercial testing results.',
          type: 'Results'
        },
        {
          id: 'SEC-008',
          title: 'Recommendations',
          content: 'It is recommended to approve the waiver with the condition that if the operating environment changes, this assessment should be revisited.',
          type: 'Recommendations'
        }
      ],
      attachments: [
        {
          id: 'ATT-003',
          name: 'Commercial EMC Test Report.pdf',
          type: 'application/pdf',
          size: 2100000,
          url: '/documents/comm-emc-report.pdf',
          uploadDate: '2023-08-25',
          uploadedBy: 'Robert Lee'
        }
      ]
    },
    {
      id: 'REP-003',
      title: 'System Verification Summary Report',
      type: 'System Verification',
      status: 'In Review',
      createdBy: 'David Wong',
      createdDate: '2023-11-01',
      reviewedBy: null,
      reviewDate: null,
      approvedBy: null,
      approvalDate: null,
      documentNumber: 'VR-SYS-001',
      version: '0.9',
      description: 'Overall system verification summary report covering all subsystems and compliance with system requirements.',
      requirements: ['REQ-001', 'REQ-002', 'REQ-003', 'REQ-004', 'REQ-005', 'REQ-006', 'REQ-007', 'REQ-008'],
      verificationItems: ['VER-001', 'VER-002', 'VER-003', 'VER-004', 'VER-005', 'VER-006', 'VER-007', 'VER-008'],
      reportSections: [
        {
          id: 'SEC-009',
          title: 'Executive Summary',
          content: 'This report summarizes the verification status of all system requirements. Currently, 75% of requirements have been verified successfully.',
          type: 'Introduction'
        },
        {
          id: 'SEC-010',
          title: 'Verification Approach',
          content: 'Requirements were verified using a combination of test, analysis, demonstration, and inspection methods according to the Verification Plan.',
          type: 'Scope'
        },
        {
          id: 'SEC-011',
          title: 'Verification Results by Subsystem',
          content: 'Navigation Subsystem: 100% verified\nPower Subsystem: 80% verified\nCommunication Subsystem: 60% verified\nData Processing Subsystem: 70% verified',
          type: 'Results'
        },
        {
          id: 'SEC-012',
          title: 'Open Items and Path Forward',
          content: 'Several environmental and security requirements remain to be verified. Testing is scheduled for December 2023.',
          type: 'Recommendations'
        }
      ],
      attachments: [
        {
          id: 'ATT-004',
          name: 'System Verification Matrix.xlsx',
          type: 'application/xlsx',
          size: 1850000,
          url: '/documents/sys-ver-matrix.xlsx',
          uploadDate: '2023-10-30',
          uploadedBy: 'David Wong'
        }
      ]
    },
    {
      id: 'REP-004',
      title: 'Reliability Requirements Verification Report',
      type: 'Requirement Verification',
      status: 'Draft',
      createdBy: 'Emily Chen',
      createdDate: '2023-10-25',
      reviewedBy: null,
      reviewDate: null,
      approvedBy: null,
      approvalDate: null,
      documentNumber: 'VR-REL-001',
      version: '0.5',
      description: 'Verification of all reliability requirements through analysis and testing.',
      requirements: ['REQ-005'],
      verificationItems: ['VER-005'],
      reportSections: [
        {
          id: 'SEC-013',
          title: 'Introduction',
          content: 'This report documents the verification of reliability requirements, focusing on MTBF predictions and analysis.',
          type: 'Introduction'
        },
        {
          id: 'SEC-014',
          title: 'Analysis Methodology',
          content: 'Reliability analysis was performed using component reliability data, operational profiles, and stress analysis.',
          type: 'Scope'
        },
        {
          id: 'SEC-015',
          title: 'MTBF Results',
          content: 'Analysis shows MTBF of 6750 hours, which exceeds the requirement of 5000 hours. This provides a margin of 35%.',
          type: 'Results'
        },
        {
          id: 'SEC-016',
          title: 'Confidence Assessment',
          content: 'The analysis has a 90% confidence level based on the quality of component data and analysis methodology.',
          type: 'Conclusion'
        }
      ],
      attachments: [
        {
          id: 'ATT-005',
          name: 'Reliability Analysis Report.pdf',
          type: 'application/pdf',
          size: 2750000,
          url: '/documents/rel-analysis.pdf',
          uploadDate: '2023-10-20',
          uploadedBy: 'Emily Chen'
        }
      ]
    }
  ]);

  // Sample requirement compliance data
  const [requirementCompliance, setRequirementCompliance] = useState<RequirementCompliance[]>([
    {
      categoryName: 'Performance',
      totalRequirements: 12,
      verified: 8,
      inProgress: 2,
      notVerified: 2,
      waived: 0,
      notApplicable: 0
    },
    {
      categoryName: 'Functional',
      totalRequirements: 25,
      verified: 18,
      inProgress: 4,
      notVerified: 3,
      waived: 0,
      notApplicable: 0
    },
    {
      categoryName: 'Interface',
      totalRequirements: 10,
      verified: 7,
      inProgress: 1,
      notVerified: 1,
      waived: 0,
      notApplicable: 1
    },
    {
      categoryName: 'Environmental',
      totalRequirements: 8,
      verified: 3,
      inProgress: 2,
      notVerified: 2,
      waived: 1,
      notApplicable: 0
    },
    {
      categoryName: 'Security',
      totalRequirements: 6,
      verified: 2,
      inProgress: 1,
      notVerified: 3,
      waived: 0,
      notApplicable: 0
    },
    {
      categoryName: 'Reliability',
      totalRequirements: 5,
      verified: 4,
      inProgress: 0,
      notVerified: 1,
      waived: 0,
      notApplicable: 0
    },
    {
      categoryName: 'Usability',
      totalRequirements: 4,
      verified: 3,
      inProgress: 0,
      notVerified: 0,
      waived: 0,
      notApplicable: 1
    }
  ]);

  // State for filters and search
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<ComplianceReport | null>(null);
  const [activeTab, setActiveTab] = useState<'reports' | 'dashboard'>('reports');

  // Filter reports
  const filteredReports = reports.filter(report => {
    return (
      (searchTerm === '' || 
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.documentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.description.toLowerCase().includes(searchTerm.toLowerCase())
      ) &&
      (statusFilter === null || report.status === statusFilter) &&
      (typeFilter === null || report.type === typeFilter)
    );
  });

  // Calculate overall compliance stats
  const totalRequirements = requirementCompliance.reduce((sum, category) => sum + category.totalRequirements, 0);
  const verifiedRequirements = requirementCompliance.reduce((sum, category) => sum + category.verified, 0);
  const inProgressRequirements = requirementCompliance.reduce((sum, category) => sum + category.inProgress, 0);
  const notVerifiedRequirements = requirementCompliance.reduce((sum, category) => sum + category.notVerified, 0);
  const waivedRequirements = requirementCompliance.reduce((sum, category) => sum + category.waived, 0);
  const notApplicableRequirements = requirementCompliance.reduce((sum, category) => sum + category.notApplicable, 0);
  
  const compliancePercentage = Math.round((verifiedRequirements + waivedRequirements + notApplicableRequirements) / totalRequirements * 100);

  // Helper functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'In Review': return 'bg-blue-100 text-blue-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Verified': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Not Verified': return 'bg-gray-100 text-gray-800';
      case 'Waived': return 'bg-yellow-100 text-yellow-800';
      case 'Not Applicable': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
      case 'Verified': 
        return <FaCheck className="text-green-600" />;
      case 'In Review':
      case 'In Progress': 
        return <FaExclamationTriangle className="text-blue-600" />;
      case 'Draft':
      case 'Not Verified': 
        return <FaTimes className="text-gray-600" />;
      case 'Rejected': 
        return <FaTimes className="text-red-600" />;
      case 'Waived': 
        return <FaExclamationTriangle className="text-yellow-600" />;
      default: 
        return <FaTimes className="text-gray-600" />;
    }
  };

  const getReportTypeColor = (type: string) => {
    switch (type) {
      case 'System Verification': return 'bg-purple-100 text-purple-800';
      case 'Subsystem Verification': return 'bg-blue-100 text-blue-800';
      case 'Component Verification': return 'bg-indigo-100 text-indigo-800';
      case 'Requirement Verification': return 'bg-green-100 text-green-800';
      case 'Waiver Assessment': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSelectReport = (report: ComplianceReport) => {
    setSelectedReport(report);
  };

  const handleCloseDetail = () => {
    setSelectedReport(null);
  };

  // Format file size
  const formatFileSize = (sizeInBytes: number): string => {
    if (sizeInBytes < 1024) {
      return `${sizeInBytes} B`;
    } else if (sizeInBytes < 1024 * 1024) {
      return `${(sizeInBytes / 1024).toFixed(1)} KB`;
    } else {
      return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
    }
  };

  return (
    <div className="bg-gray-50 p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Compliance Reports</h1>
        
        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex -mb-px">
            <button
              className={`py-2 px-4 border-b-2 font-medium text-sm ${
                activeTab === 'reports'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('reports')}
            >
              <FaList className="inline mr-2" /> Reports
            </button>
            <button
              className={`ml-8 py-2 px-4 border-b-2 font-medium text-sm ${
                activeTab === 'dashboard'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('dashboard')}
            >
              <FaChartPie className="inline mr-2" /> Compliance Dashboard
            </button>
          </div>
        </div>
        
        {activeTab === 'reports' && (
          <div className="mb-8">
            {/* Report Controls */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h2 className="text-xl font-semibold mb-2 md:mb-0">Verification Reports</h2>
                <div className="flex space-x-2">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center text-sm">
                    <FaFileAlt className="mr-2" /> New Report
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-4">
                <div className="w-full md:w-64">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search reports..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span className="absolute left-3 top-2.5 text-gray-400">
                      <FaSearch />
                    </span>
                  </div>
                </div>
                
                <div className="w-full md:w-48">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    className="border border-gray-300 rounded-md p-2 w-full"
                    value={statusFilter || ''}
                    onChange={(e) => setStatusFilter(e.target.value === '' ? null : e.target.value)}
                  >
                    <option value="">All Statuses</option>
                    <option value="Draft">Draft</option>
                    <option value="In Review">In Review</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
                
                <div className="w-full md:w-56">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                  <select
                    className="border border-gray-300 rounded-md p-2 w-full"
                    value={typeFilter || ''}
                    onChange={(e) => setTypeFilter(e.target.value === '' ? null : e.target.value)}
                  >
                    <option value="">All Types</option>
                    <option value="System Verification">System Verification</option>
                    <option value="Subsystem Verification">Subsystem Verification</option>
                    <option value="Component Verification">Component Verification</option>
                    <option value="Requirement Verification">Requirement Verification</option>
                    <option value="Waiver Assessment">Waiver Assessment</option>
                  </select>
                </div>
                
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center text-sm"
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter(null);
                    setTypeFilter(null);
                  }}
                >
                  <FaFilter className="mr-2" /> Reset
                </button>
              </div>
            </div>
            
            {/* Reports List */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doc #</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredReports.map((report) => (
                      <tr 
                        key={report.id} 
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleSelectReport(report)}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 text-gray-400 mt-1 mr-3">
                              <FaFileAlt />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{report.title}</div>
                              <div className="text-sm text-gray-500 line-clamp-1">{report.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {report.documentNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getReportTypeColor(report.type)}`}>
                            {report.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="mr-2">{getStatusIcon(report.status)}</div>
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(report.status)}`}>
                              {report.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{report.createdDate}</div>
                          <div className="text-sm text-gray-500">{report.createdBy}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {report.version}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectReport(report);
                            }}
                          >
                            <FaEye />
                          </button>
                          <button
                            className="text-blue-600 hover:text-blue-900"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Download functionality
                            }}
                          >
                            <FaDownload />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredReports.length === 0 ? (
                <div className="py-10 text-center">
                  <p className="text-gray-500">No reports match your search criteria</p>
                </div>
              ) : (
                <div className="px-6 py-3 bg-gray-50 text-sm text-gray-500">
                  Showing {filteredReports.length} of {reports.length} reports
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'dashboard' && (
          <div className="mb-8">
            {/* Compliance Overview Cards */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-6">Compliance Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 flex flex-col items-center justify-center">
                  <div className="text-3xl font-semibold text-blue-700">{totalRequirements}</div>
                  <div className="text-sm text-gray-600">Total Requirements</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200 flex flex-col items-center justify-center">
                  <div className="text-3xl font-semibold text-green-700">{verifiedRequirements}</div>
                  <div className="text-sm text-gray-600">Verified</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 flex flex-col items-center justify-center">
                  <div className="text-3xl font-semibold text-blue-700">{inProgressRequirements}</div>
                  <div className="text-sm text-gray-600">In Progress</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex flex-col items-center justify-center">
                  <div className="text-3xl font-semibold text-gray-700">{notVerifiedRequirements}</div>
                  <div className="text-sm text-gray-600">Not Verified</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 flex flex-col items-center justify-center">
                  <div className="text-3xl font-semibold text-yellow-700">{waivedRequirements + notApplicableRequirements}</div>
                  <div className="text-sm text-gray-600">Waived/N.A.</div>
                </div>
              </div>
              
              {/* Overall Compliance Progress */}
              <div className="mb-2 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Overall Verification Progress</span>
                <span className="text-sm font-medium text-gray-700">{compliancePercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                <div 
                  className="bg-green-600 h-2.5 rounded-full" 
                  style={{ width: `${compliancePercentage}%` }}
                ></div>
              </div>
              
              {/* Documents Status */}
              <h3 className="text-lg font-semibold mb-4">Document Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center">
                  <div className="rounded-full bg-green-100 p-3 mr-4">
                    <FaCheckCircle className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold">{reports.filter(r => r.status === 'Approved').length}</div>
                    <div className="text-sm text-gray-600">Approved</div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center">
                  <div className="rounded-full bg-blue-100 p-3 mr-4">
                    <FaHistory className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold">{reports.filter(r => r.status === 'In Review').length}</div>
                    <div className="text-sm text-gray-600">In Review</div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center">
                  <div className="rounded-full bg-yellow-100 p-3 mr-4">
                    <FaFileAltSolid className="text-yellow-600 text-xl" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold">{reports.filter(r => r.status === 'Draft').length}</div>
                    <div className="text-sm text-gray-600">Draft</div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center">
                  <div className="rounded-full bg-red-100 p-3 mr-4">
                    <FaTimes className="text-red-600 text-xl" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold">{reports.filter(r => r.status === 'Rejected').length}</div>
                    <div className="text-sm text-gray-600">Rejected</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Compliance by Category */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-6">Compliance by Category</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Reqs</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {requirementCompliance.map((category, index) => {
                      const verifiedPercent = Math.round((category.verified + category.waived + category.notApplicable) / category.totalRequirements * 100);
                      const inProgressPercent = Math.round(category.inProgress / category.totalRequirements * 100);
                      const notVerifiedPercent = Math.round(category.notVerified / category.totalRequirements * 100);
                      
                      return (
                        <tr key={category.categoryName} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {category.categoryName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {category.totalRequirements}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-col space-y-1">
                              <div className="flex items-center text-sm">
                                <FaCheck className="text-green-600 mr-2" />
                                <span>Verified: {category.verified}</span>
                                {category.waived > 0 && (
                                  <span className="ml-1 text-xs text-gray-500">
                                    (Waived: {category.waived}, N/A: {category.notApplicable})
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center text-sm">
                                <FaExclamationTriangle className="text-blue-600 mr-2" />
                                <span>In Progress: {category.inProgress}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <FaTimes className="text-gray-600 mr-2" />
                                <span>Not Verified: {category.notVerified}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                                <div className="flex h-2.5 rounded-full overflow-hidden">
                                  <div 
                                    className="bg-green-600 h-2.5" 
                                    style={{ width: `${verifiedPercent}%` }}
                                  ></div>
                                  <div 
                                    className="bg-blue-600 h-2.5" 
                                    style={{ width: `${inProgressPercent}%` }}
                                  ></div>
                                  <div 
                                    className="bg-gray-400 h-2.5" 
                                    style={{ width: `${notVerifiedPercent}%` }}
                                  ></div>
                                </div>
                              </div>
                              <div className="text-sm text-gray-500 flex justify-between">
                                <span>{verifiedPercent}% Complete</span>
                                <span>{inProgressPercent}% In Progress</span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Recent Verification Activity */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <h2 className="text-xl font-semibold">Recent Verification Activity</h2>
                <button className="mt-2 md:mt-0 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center text-sm">
                  <FaHistory className="mr-2" /> View All Activity
                </button>
              </div>
              
              <div className="overflow-hidden">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                    <div className="rounded-full bg-green-100 p-2 mr-4">
                      <FaCheckCircle className="text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                        <div className="text-sm font-medium text-gray-900">Navigation Subsystem Verification Report approved</div>
                        <div className="text-sm text-gray-500">2 days ago</div>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">David Wong approved VR-NAV-001</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                    <div className="rounded-full bg-blue-100 p-2 mr-4">
                      <FaClipboardCheck className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                        <div className="text-sm font-medium text-gray-900">Performance requirement REQ-006 verification started</div>
                        <div className="text-sm text-gray-500">3 days ago</div>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">John Smith started verification for "Sensor data latency"</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                    <div className="rounded-full bg-yellow-100 p-2 mr-4">
                      <FaFileAltSolid className="text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                        <div className="text-sm font-medium text-gray-900">New draft report created</div>
                        <div className="text-sm text-gray-500">5 days ago</div>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">Emily Chen created "Reliability Requirements Verification Report"</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                    <div className="rounded-full bg-green-100 p-2 mr-4">
                      <FaCheck className="text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                        <div className="text-sm font-medium text-gray-900">Requirement REQ-005 verified</div>
                        <div className="text-sm text-gray-500">1 week ago</div>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">Emily Chen verified "MTBF of 5000 hours" through analysis</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                    <div className="rounded-full bg-yellow-100 p-2 mr-4">
                      <FaExclamationTriangle className="text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                        <div className="text-sm font-medium text-gray-900">Waiver approved for REQ-004</div>
                        <div className="text-sm text-gray-500">1 week ago</div>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">David Wong approved waiver for "EMI/EMC compliance"</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Report Detail Modal */}
        {selectedReport && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={handleCloseDetail}>
            <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedReport.title}</h2>
                    <div className="text-sm text-gray-500 mt-1">Document Number: {selectedReport.documentNumber} • Version: {selectedReport.version}</div>
                  </div>
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getReportTypeColor(selectedReport.type)}`}>
                      {selectedReport.type}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedReport.status)}`}>
                      {selectedReport.status}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                    {selectedReport.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Report Information</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Created By</p>
                          <p className="text-gray-700">{selectedReport.createdBy}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Created Date</p>
                          <p className="text-gray-700">{selectedReport.createdDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Reviewed By</p>
                          <p className="text-gray-700">{selectedReport.reviewedBy || 'Not yet reviewed'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Review Date</p>
                          <p className="text-gray-700">{selectedReport.reviewDate || 'Not yet reviewed'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Approved By</p>
                          <p className="text-gray-700">{selectedReport.approvedBy || 'Not yet approved'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Approval Date</p>
                          <p className="text-gray-700">{selectedReport.approvalDate || 'Not yet approved'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Referenced Items</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="mb-4">
                        <p className="text-sm text-gray-500 mb-1">Requirements</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedReport.requirements.map((req) => (
                            <span key={req} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Verification Items</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedReport.verificationItems.map((item) => (
                            <span key={item} className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Report Content</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    {selectedReport.reportSections.map((section) => (
                      <div key={section.id} className="mb-4 last:mb-0">
                        <h4 className="font-medium text-gray-900 mb-1">{section.title}</h4>
                        <p className="text-gray-700 whitespace-pre-line">{section.content}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Attachments</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    {selectedReport.attachments.length > 0 ? (
                      <div className="divide-y divide-gray-200">
                        {selectedReport.attachments.map((attachment) => (
                          <div key={attachment.id} className="py-3 first:pt-0 last:pb-0">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <FaFileAlt className="text-gray-400 mr-3" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{attachment.name}</p>
                                  <p className="text-xs text-gray-500">
                                    {formatFileSize(attachment.size)} • Uploaded by {attachment.uploadedBy} on {attachment.uploadDate}
                                  </p>
                                </div>
                              </div>
                              <button className="text-indigo-600 hover:text-indigo-900">
                                <FaDownload />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No attachments</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button 
                    className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                    onClick={handleCloseDetail}
                  >
                    Close
                  </button>
                  <button className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none">
                    <FaDownload className="inline mr-2" /> Download Report
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

export default ComplianceReports; 