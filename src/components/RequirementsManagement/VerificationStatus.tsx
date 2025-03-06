import React, { useState, useEffect } from 'react';
import { 
  FaSearch, 
  FaFilter, 
  FaCheckCircle, 
  FaExclamationCircle, 
  FaHourglassHalf,
  FaTimesCircle,
  FaBan,
  FaChartBar,
  FaFileExport,
  FaDownload,
  FaSortUp,
  FaSortDown,
  FaSort,
  FaChevronRight,
  FaChevronDown
} from 'react-icons/fa';

// Define interfaces for our data
interface Requirement {
  id: string;
  title: string;
  description: string;
  type: 'System' | 'Functional';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  category: string;
}

interface VerificationItem {
  id: string;
  requirementId: string;
  method: 'Test' | 'Analysis' | 'Inspection' | 'Demonstration' | 'Simulation';
  status: 'Not Started' | 'In Progress' | 'Verified' | 'Failed' | 'Blocked' | 'Waived';
  progress: number;
  assignedTo: string;
  startDate: string | null;
  completionDate: string | null;
  testCases: string[];
  lastUpdated: string;
  notes: string;
  issues: number;
  evidence: string[];
}

interface VerificationSummary {
  totalRequirements: number;
  totalVerificationItems: number;
  verified: number;
  inProgress: number;
  notStarted: number;
  failed: number;
  blocked: number;
  waived: number;
  verificationCompletionRate: number;
  byPriority: {
    critical: { total: number; verified: number; rate: number };
    high: { total: number; verified: number; rate: number };
    medium: { total: number; verified: number; rate: number };
    low: { total: number; verified: number; rate: number };
  };
  byMethod: {
    test: number;
    analysis: number;
    inspection: number;
    demonstration: number;
    simulation: number;
  };
}

const VerificationStatus: React.FC = () => {
  // Sample requirements data
  const [requirements, setRequirements] = useState<Requirement[]>([
    {
      id: 'SYS-REQ-001',
      title: 'System Navigation Accuracy',
      description: 'The system shall provide navigation accuracy within 5 meters CEP under normal operating conditions.',
      type: 'System',
      priority: 'High',
      category: 'Performance'
    },
    {
      id: 'SYS-REQ-002',
      title: 'Real-time Data Updates',
      description: 'The system shall provide real-time traffic updates every 5 minutes.',
      type: 'System',
      priority: 'Medium',
      category: 'Performance'
    },
    {
      id: 'SYS-REQ-003',
      title: 'User Interface Responsiveness',
      description: 'The system shall respond to user inputs within 200ms.',
      type: 'System',
      priority: 'Medium',
      category: 'Usability'
    },
    {
      id: 'SYS-REQ-008',
      title: 'System Security Requirements',
      description: 'The system shall encrypt all sensitive data using AES-256 encryption.',
      type: 'System',
      priority: 'Critical',
      category: 'Security'
    },
    {
      id: 'SYS-REQ-010',
      title: 'User Preferences Storage',
      description: 'The system shall store and retrieve user preferences across sessions.',
      type: 'System',
      priority: 'Low',
      category: 'Functionality'
    },
    {
      id: 'FUNC-REQ-001',
      title: 'User Authentication',
      description: 'The system shall authenticate users based on username and password credentials.',
      type: 'Functional',
      priority: 'Critical',
      category: 'Security'
    },
    {
      id: 'FUNC-REQ-002',
      title: 'Data Encryption',
      description: 'The system shall encrypt all sensitive data using AES-256 encryption.',
      type: 'Functional',
      priority: 'Critical',
      category: 'Security'
    },
    {
      id: 'FUNC-REQ-003',
      title: 'Navigation Route Calculation',
      description: 'The system shall calculate optimal routes based on current traffic conditions.',
      type: 'Functional',
      priority: 'High',
      category: 'Navigation'
    },
    {
      id: 'FUNC-REQ-007',
      title: 'Location Services',
      description: 'The system shall determine current location using GPS, network, and sensor fusion.',
      type: 'Functional',
      priority: 'Critical',
      category: 'Navigation'
    }
  ]);

  // Sample verification items data
  const [verificationItems, setVerificationItems] = useState<VerificationItem[]>([
    {
      id: 'VER-001',
      requirementId: 'SYS-REQ-001',
      method: 'Test',
      status: 'Verified',
      progress: 100,
      assignedTo: 'Emily Chen',
      startDate: '2023-05-10',
      completionDate: '2023-05-25',
      testCases: ['TC-001', 'TC-002', 'TC-003'],
      lastUpdated: '2023-05-25',
      notes: 'All tests passed successfully. GPS accuracy was within required parameters.',
      issues: 0,
      evidence: ['test-report-001.pdf', 'gps-accuracy-data.xlsx']
    },
    {
      id: 'VER-002',
      requirementId: 'SYS-REQ-002',
      method: 'Test',
      status: 'In Progress',
      progress: 75,
      assignedTo: 'Michael Brown',
      startDate: '2023-05-15',
      completionDate: null,
      testCases: ['TC-004', 'TC-005'],
      lastUpdated: '2023-06-10',
      notes: 'Initial tests show good performance. Need to complete edge case testing.',
      issues: 1,
      evidence: ['partial-test-results.pdf']
    },
    {
      id: 'VER-003',
      requirementId: 'SYS-REQ-003',
      method: 'Test',
      status: 'Failed',
      progress: 100,
      assignedTo: 'Sarah Johnson',
      startDate: '2023-05-10',
      completionDate: '2023-05-20',
      testCases: ['TC-006', 'TC-007', 'TC-008'],
      lastUpdated: '2023-05-20',
      notes: 'User interface response time exceeds 200ms under heavy load conditions.',
      issues: 2,
      evidence: ['ui-performance-report.pdf']
    },
    {
      id: 'VER-004',
      requirementId: 'SYS-REQ-008',
      method: 'Analysis',
      status: 'Verified',
      progress: 100,
      assignedTo: 'David Wilson',
      startDate: '2023-04-15',
      completionDate: '2023-05-05',
      testCases: [],
      lastUpdated: '2023-05-05',
      notes: 'Security analysis confirmed proper implementation of AES-256 encryption.',
      issues: 0,
      evidence: ['security-analysis-report.pdf', 'encryption-audit.pdf']
    },
    {
      id: 'VER-005',
      requirementId: 'SYS-REQ-010',
      method: 'Test',
      status: 'Blocked',
      progress: 30,
      assignedTo: 'Jennifer Lee',
      startDate: '2023-05-20',
      completionDate: null,
      testCases: ['TC-012'],
      lastUpdated: '2023-06-01',
      notes: 'Blocked by database connection issues. Waiting for IT to resolve.',
      issues: 1,
      evidence: []
    },
    {
      id: 'VER-006',
      requirementId: 'FUNC-REQ-001',
      method: 'Test',
      status: 'Verified',
      progress: 100,
      assignedTo: 'Robert Kim',
      startDate: '2023-04-20',
      completionDate: '2023-05-10',
      testCases: ['TC-020', 'TC-021', 'TC-022'],
      lastUpdated: '2023-05-10',
      notes: 'Authentication function works correctly for all test cases.',
      issues: 0,
      evidence: ['auth-test-results.pdf']
    },
    {
      id: 'VER-007',
      requirementId: 'FUNC-REQ-002',
      method: 'Inspection',
      status: 'Verified',
      progress: 100,
      assignedTo: 'David Wilson',
      startDate: '2023-04-25',
      completionDate: '2023-05-15',
      testCases: [],
      lastUpdated: '2023-05-15',
      notes: 'Code inspection confirms proper implementation of encryption functions.',
      issues: 0,
      evidence: ['code-review-notes.pdf']
    },
    {
      id: 'VER-008',
      requirementId: 'FUNC-REQ-003',
      method: 'Test',
      status: 'In Progress',
      progress: 60,
      assignedTo: 'Michael Brown',
      startDate: '2023-05-25',
      completionDate: null,
      testCases: ['TC-030', 'TC-031', 'TC-032', 'TC-033'],
      lastUpdated: '2023-06-15',
      notes: 'Route calculation works for most scenarios, but still has issues with complex routes.',
      issues: 2,
      evidence: ['route-calc-test-data.xlsx']
    },
    {
      id: 'VER-009',
      requirementId: 'FUNC-REQ-007',
      method: 'Demonstration',
      status: 'Not Started',
      progress: 0,
      assignedTo: 'Emily Chen',
      startDate: null,
      completionDate: null,
      testCases: [],
      lastUpdated: '2023-06-01',
      notes: 'Demonstration scheduled for next sprint.',
      issues: 0,
      evidence: []
    },
    {
      id: 'VER-010',
      requirementId: 'FUNC-REQ-007',
      method: 'Test',
      status: 'Waived',
      progress: 0,
      assignedTo: 'Robert Kim',
      startDate: '2023-05-05',
      completionDate: '2023-05-05',
      testCases: [],
      lastUpdated: '2023-05-05',
      notes: 'This test has been waived as it duplicates other verification activities.',
      issues: 0,
      evidence: ['waiver-approval.pdf']
    }
  ]);

  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [methodFilter, setMethodFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [showOnlyWithIssues, setShowOnlyWithIssues] = useState(false);

  // State for sorting
  const [sortField, setSortField] = useState<keyof VerificationItem>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // State for expanded rows (to show details)
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // State for summary data
  const [summary, setSummary] = useState<VerificationSummary>({
    totalRequirements: 0,
    totalVerificationItems: 0,
    verified: 0,
    inProgress: 0,
    notStarted: 0,
    failed: 0,
    blocked: 0,
    waived: 0,
    verificationCompletionRate: 0,
    byPriority: {
      critical: { total: 0, verified: 0, rate: 0 },
      high: { total: 0, verified: 0, rate: 0 },
      medium: { total: 0, verified: 0, rate: 0 },
      low: { total: 0, verified: 0, rate: 0 },
    },
    byMethod: {
      test: 0,
      analysis: 0,
      inspection: 0,
      demonstration: 0,
      simulation: 0,
    }
  });

  // Helper function to calculate summary statistics
  useEffect(() => {
    // Fix for linter error - convert Set to Array first
    const uniqueRequirementIds = Array.from(new Set(verificationItems.map(item => item.requirementId)));
    
    const verified = verificationItems.filter(item => item.status === 'Verified').length;
    const inProgress = verificationItems.filter(item => item.status === 'In Progress').length;
    const notStarted = verificationItems.filter(item => item.status === 'Not Started').length;
    const failed = verificationItems.filter(item => item.status === 'Failed').length;
    const blocked = verificationItems.filter(item => item.status === 'Blocked').length;
    const waived = verificationItems.filter(item => item.status === 'Waived').length;
    
    // Get verification items grouped by requirement
    const reqMap = new Map<string, VerificationItem[]>();
    verificationItems.forEach(item => {
      if (!reqMap.has(item.requirementId)) {
        reqMap.set(item.requirementId, []);
      }
      reqMap.get(item.requirementId)?.push(item);
    });
    
    // Calculate priority stats
    const criticalReqs = requirements.filter(req => req.priority === 'Critical');
    const highReqs = requirements.filter(req => req.priority === 'High');
    const mediumReqs = requirements.filter(req => req.priority === 'Medium');
    const lowReqs = requirements.filter(req => req.priority === 'Low');
    
    const criticalVerified = criticalReqs.filter(req => {
      const items = reqMap.get(req.id) || [];
      return items.some(item => item.status === 'Verified');
    }).length;
    
    const highVerified = highReqs.filter(req => {
      const items = reqMap.get(req.id) || [];
      return items.some(item => item.status === 'Verified');
    }).length;
    
    const mediumVerified = mediumReqs.filter(req => {
      const items = reqMap.get(req.id) || [];
      return items.some(item => item.status === 'Verified');
    }).length;
    
    const lowVerified = lowReqs.filter(req => {
      const items = reqMap.get(req.id) || [];
      return items.some(item => item.status === 'Verified');
    }).length;
    
    // Calculate method counts
    const testCount = verificationItems.filter(item => item.method === 'Test').length;
    const analysisCount = verificationItems.filter(item => item.method === 'Analysis').length;
    const inspectionCount = verificationItems.filter(item => item.method === 'Inspection').length;
    const demonstrationCount = verificationItems.filter(item => item.method === 'Demonstration').length;
    const simulationCount = verificationItems.filter(item => item.method === 'Simulation').length;
    
    // Calculate verification completion rate
    const verificationCompletionRate = (verified + waived) / verificationItems.length * 100;
    
    setSummary({
      totalRequirements: requirements.length,
      totalVerificationItems: verificationItems.length,
      verified,
      inProgress,
      notStarted,
      failed,
      blocked,
      waived,
      verificationCompletionRate,
      byPriority: {
        critical: { 
          total: criticalReqs.length, 
          verified: criticalVerified, 
          rate: criticalReqs.length ? (criticalVerified / criticalReqs.length * 100) : 0 
        },
        high: { 
          total: highReqs.length, 
          verified: highVerified, 
          rate: highReqs.length ? (highVerified / highReqs.length * 100) : 0 
        },
        medium: { 
          total: mediumReqs.length, 
          verified: mediumVerified, 
          rate: mediumReqs.length ? (mediumVerified / mediumReqs.length * 100) : 0 
        },
        low: { 
          total: lowReqs.length, 
          verified: lowVerified, 
          rate: lowReqs.length ? (lowVerified / lowReqs.length * 100) : 0 
        },
      },
      byMethod: {
        test: testCount,
        analysis: analysisCount,
        inspection: inspectionCount,
        demonstration: demonstrationCount,
        simulation: simulationCount,
      }
    });
  }, [requirements, verificationItems]);

  // Filter verification items based on search and filters
  const filteredItems = verificationItems.filter(item => {
    const requirement = requirements.find(r => r.id === item.requirementId);
    if (!requirement) return false;
    
    // Apply search filter
    if (searchTerm && !(
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      requirement.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      requirement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.notes.toLowerCase().includes(searchTerm.toLowerCase())
    )) {
      return false;
    }
    
    // Apply method filter
    if (methodFilter && item.method !== methodFilter) {
      return false;
    }
    
    // Apply status filter
    if (statusFilter && item.status !== statusFilter) {
      return false;
    }
    
    // Apply type filter
    if (typeFilter && requirement.type !== typeFilter) {
      return false;
    }
    
    // Apply priority filter
    if (priorityFilter && requirement.priority !== priorityFilter) {
      return false;
    }
    
    // Apply issues filter
    if (showOnlyWithIssues && item.issues === 0) {
      return false;
    }
    
    return true;
  });
  
  // Helper function to get sorted items
  const getSortedItems = () => {
    return [...filteredItems].sort((a, b) => {
      if (sortField === 'id' || sortField === 'requirementId' || sortField === 'method' || sortField === 'status' || sortField === 'assignedTo' || sortField === 'lastUpdated') {
        const aValue = String(a[sortField]);
        const bValue = String(b[sortField]);
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      } else if (sortField === 'progress' || sortField === 'issues') {
        const aValue = Number(a[sortField]);
        const bValue = Number(b[sortField]);
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });
  };
  
  const sortedItems = getSortedItems();
  
  // Toggle expansion of a row
  const toggleExpand = (id: string) => {
    if (expandedItems.includes(id)) {
      setExpandedItems(expandedItems.filter(itemId => itemId !== id));
    } else {
      setExpandedItems([...expandedItems, id]);
    }
  };
  
  // Handle header click for sorting
  const handleHeaderClick = (field: keyof VerificationItem) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Helper function to get status icon
  const getStatusIcon = (status: VerificationItem['status']) => {
    switch (status) {
      case 'Verified':
        return <FaCheckCircle className="text-green-500" />;
      case 'In Progress':
        return <FaHourglassHalf className="text-blue-500" />;
      case 'Not Started':
        return <FaTimesCircle className="text-gray-400" />;
      case 'Failed':
        return <FaExclamationCircle className="text-red-500" />;
      case 'Blocked':
        return <FaBan className="text-orange-500" />;
      case 'Waived':
        return <FaExclamationCircle className="text-purple-500" />;
      default:
        return null;
    }
  };
  
  // Helper function to get status color class
  const getStatusColorClass = (status: VerificationItem['status']) => {
    switch (status) {
      case 'Verified':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Not Started':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'Failed':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'Blocked':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Waived':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
  // Helper function to get priority color class
  const getPriorityColorClass = (priority: Requirement['priority']) => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'High':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  // Render function for the verification status component
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Verification Status</h2>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="text-sm text-blue-600 font-medium">Total Requirements</div>
          <div className="text-2xl font-bold mt-1">{summary.totalRequirements}</div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="text-sm text-green-600 font-medium">Verified</div>
          <div className="text-2xl font-bold mt-1">{summary.verified}</div>
          <div className="text-sm text-green-600 mt-1">
            {Math.round(summary.verificationCompletionRate)}% Complete
          </div>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="text-sm text-yellow-600 font-medium">In Progress</div>
          <div className="text-2xl font-bold mt-1">{summary.inProgress}</div>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="text-sm text-red-600 font-medium">Issues</div>
          <div className="text-2xl font-bold mt-1">
            {summary.failed + summary.blocked}
          </div>
        </div>
      </div>
      
      {/* Status breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Verification Status</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Verified</span>
              <span className="font-medium">{summary.verified}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${(summary.verified / summary.totalVerificationItems) * 100}%` }}></div>
            </div>
            
            <div className="flex justify-between">
              <span>In Progress</span>
              <span className="font-medium">{summary.inProgress}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${(summary.inProgress / summary.totalVerificationItems) * 100}%` }}></div>
            </div>
            
            <div className="flex justify-between">
              <span>Not Started</span>
              <span className="font-medium">{summary.notStarted}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-gray-500 h-2.5 rounded-full" style={{ width: `${(summary.notStarted / summary.totalVerificationItems) * 100}%` }}></div>
            </div>
            
            <div className="flex justify-between">
              <span>Failed</span>
              <span className="font-medium">{summary.failed}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-red-500 h-2.5 rounded-full" style={{ width: `${(summary.failed / summary.totalVerificationItems) * 100}%` }}></div>
            </div>
            
            <div className="flex justify-between">
              <span>Blocked</span>
              <span className="font-medium">{summary.blocked}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: `${(summary.blocked / summary.totalVerificationItems) * 100}%` }}></div>
            </div>
            
            <div className="flex justify-between">
              <span>Waived</span>
              <span className="font-medium">{summary.waived}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: `${(summary.waived / summary.totalVerificationItems) * 100}%` }}></div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Priority Coverage</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Critical</span>
              <span className="font-medium">{summary.byPriority.critical.verified} / {summary.byPriority.critical.total}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-red-500 h-2.5 rounded-full" style={{ width: `${summary.byPriority.critical.rate}%` }}></div>
            </div>
            
            <div className="flex justify-between">
              <span>High</span>
              <span className="font-medium">{summary.byPriority.high.verified} / {summary.byPriority.high.total}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: `${summary.byPriority.high.rate}%` }}></div>
            </div>
            
            <div className="flex justify-between">
              <span>Medium</span>
              <span className="font-medium">{summary.byPriority.medium.verified} / {summary.byPriority.medium.total}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: `${summary.byPriority.medium.rate}%` }}></div>
            </div>
            
            <div className="flex justify-between">
              <span>Low</span>
              <span className="font-medium">{summary.byPriority.low.verified} / {summary.byPriority.low.total}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${summary.byPriority.low.rate}%` }}></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search requirements or verification items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <select
              className="border-gray-300 rounded-md text-sm"
              value={methodFilter || ''}
              onChange={(e) => setMethodFilter(e.target.value || null)}
            >
              <option value="">All Methods</option>
              <option value="Test">Test</option>
              <option value="Analysis">Analysis</option>
              <option value="Inspection">Inspection</option>
              <option value="Demonstration">Demonstration</option>
              <option value="Simulation">Simulation</option>
            </select>
            
            <select
              className="border-gray-300 rounded-md text-sm"
              value={statusFilter || ''}
              onChange={(e) => setStatusFilter(e.target.value || null)}
            >
              <option value="">All Statuses</option>
              <option value="Verified">Verified</option>
              <option value="In Progress">In Progress</option>
              <option value="Not Started">Not Started</option>
              <option value="Failed">Failed</option>
              <option value="Blocked">Blocked</option>
              <option value="Waived">Waived</option>
            </select>
            
            <select
              className="border-gray-300 rounded-md text-sm"
              value={typeFilter || ''}
              onChange={(e) => setTypeFilter(e.target.value || null)}
            >
              <option value="">All Types</option>
              <option value="System">System</option>
              <option value="Functional">Functional</option>
            </select>
            
            <select
              className="border-gray-300 rounded-md text-sm"
              value={priorityFilter || ''}
              onChange={(e) => setPriorityFilter(e.target.value || null)}
            >
              <option value="">All Priorities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                id="issuesFilter"
                checked={showOnlyWithIssues}
                onChange={(e) => setShowOnlyWithIssues(e.target.checked)}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <label htmlFor="issuesFilter" className="text-sm text-gray-700">
                Issues Only
              </label>
            </div>
            
            <button
              onClick={() => {
                setSearchTerm('');
                setMethodFilter(null);
                setStatusFilter(null);
                setTypeFilter(null);
                setPriorityFilter(null);
                setShowOnlyWithIssues(false);
              }}
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>
      
      {/* Verification Items Table */}
      <div className="mt-6 overflow-x-auto">
        {sortedItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No verification items match the current filters.
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-10"></th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleHeaderClick('id')}
                >
                  <div className="flex items-center">
                    ID
                    {sortField === 'id' ? (
                      sortDirection === 'asc' ? <FaSortUp className="ml-1" /> : <FaSortDown className="ml-1" />
                    ) : (
                      <FaSort className="ml-1 text-gray-400" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleHeaderClick('requirementId')}
                >
                  <div className="flex items-center">
                    Requirement
                    {sortField === 'requirementId' ? (
                      sortDirection === 'asc' ? <FaSortUp className="ml-1" /> : <FaSortDown className="ml-1" />
                    ) : (
                      <FaSort className="ml-1 text-gray-400" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleHeaderClick('method')}
                >
                  <div className="flex items-center">
                    Method
                    {sortField === 'method' ? (
                      sortDirection === 'asc' ? <FaSortUp className="ml-1" /> : <FaSortDown className="ml-1" />
                    ) : (
                      <FaSort className="ml-1 text-gray-400" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleHeaderClick('status')}
                >
                  <div className="flex items-center">
                    Status
                    {sortField === 'status' ? (
                      sortDirection === 'asc' ? <FaSortUp className="ml-1" /> : <FaSortDown className="ml-1" />
                    ) : (
                      <FaSort className="ml-1 text-gray-400" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleHeaderClick('progress')}
                >
                  <div className="flex items-center">
                    Progress
                    {sortField === 'progress' ? (
                      sortDirection === 'asc' ? <FaSortUp className="ml-1" /> : <FaSortDown className="ml-1" />
                    ) : (
                      <FaSort className="ml-1 text-gray-400" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleHeaderClick('assignedTo')}
                >
                  <div className="flex items-center">
                    Assigned To
                    {sortField === 'assignedTo' ? (
                      sortDirection === 'asc' ? <FaSortUp className="ml-1" /> : <FaSortDown className="ml-1" />
                    ) : (
                      <FaSort className="ml-1 text-gray-400" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleHeaderClick('issues')}
                >
                  <div className="flex items-center">
                    Issues
                    {sortField === 'issues' ? (
                      sortDirection === 'asc' ? <FaSortUp className="ml-1" /> : <FaSortDown className="ml-1" />
                    ) : (
                      <FaSort className="ml-1 text-gray-400" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleHeaderClick('lastUpdated')}
                >
                  <div className="flex items-center">
                    Last Updated
                    {sortField === 'lastUpdated' ? (
                      sortDirection === 'asc' ? <FaSortUp className="ml-1" /> : <FaSortDown className="ml-1" />
                    ) : (
                      <FaSort className="ml-1 text-gray-400" />
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedItems.map((item) => {
                const requirement = requirements.find(r => r.id === item.requirementId);
                const isExpanded = expandedItems.includes(item.id);
                
                return (
                  <React.Fragment key={item.id}>
                    <tr className="hover:bg-gray-50">
                      <td className="px-2 py-4 whitespace-nowrap text-center">
                        <button 
                          onClick={() => toggleExpand(item.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.id}</div>
                      </td>
                      <td className="px-6 py-4">
                        {requirement && (
                          <div>
                            <div className="text-sm font-medium text-gray-900">{requirement.id}</div>
                            <div className="text-sm text-gray-500">{requirement.title}</div>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium rounded-full">
                          {item.method}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="mr-2">
                            {getStatusIcon(item.status)}
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColorClass(item.status)}`}>
                            {item.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${
                              item.status === 'Verified' ? 'bg-green-500' : 
                              item.status === 'In Progress' ? 'bg-blue-500' :
                              item.status === 'Failed' ? 'bg-red-500' :
                              item.status === 'Blocked' ? 'bg-orange-500' :
                              item.status === 'Waived' ? 'bg-purple-500' :
                              'bg-gray-500'
                            }`} 
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{item.progress}%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.assignedTo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.issues > 0 ? (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                            {item.issues}
                          </span>
                        ) : (
                          <span className="text-gray-500">0</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.lastUpdated}
                      </td>
                    </tr>
                    
                    {/* Expanded detail row */}
                    {isExpanded && (
                      <tr>
                        <td colSpan={9} className="px-6 py-4 bg-gray-50">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Details</h4>
                              {requirement && (
                                <div className="mb-4">
                                  <div className="text-sm font-medium">Requirement Description:</div>
                                  <div className="text-sm text-gray-600 mt-1">{requirement.description}</div>
                                </div>
                              )}
                              
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                  <div className="text-sm font-medium">Start Date:</div>
                                  <div className="text-sm text-gray-600 mt-1">{item.startDate || 'Not started'}</div>
                                </div>
                                <div>
                                  <div className="text-sm font-medium">Completion Date:</div>
                                  <div className="text-sm text-gray-600 mt-1">{item.completionDate || 'Not completed'}</div>
                                </div>
                              </div>
                              
                              <div className="mb-4">
                                <div className="text-sm font-medium">Notes:</div>
                                <div className="text-sm text-gray-600 mt-1">{item.notes}</div>
                              </div>
                            </div>
                            
                            <div>
                              {item.testCases.length > 0 && (
                                <div className="mb-4">
                                  <div className="text-sm font-medium mb-2">Test Cases:</div>
                                  <div className="flex flex-wrap gap-2">
                                    {item.testCases.map(testCase => (
                                      <span key={testCase} className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                        {testCase}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {item.evidence.length > 0 && (
                                <div>
                                  <div className="text-sm font-medium mb-2">Evidence:</div>
                                  <div className="space-y-2">
                                    {item.evidence.map(evidence => (
                                      <div key={evidence} className="flex items-center">
                                        <FaDownload className="text-gray-400 mr-2" />
                                        <span className="text-sm text-blue-600 hover:underline cursor-pointer">
                                          {evidence}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      
      {/* Export and Actions */}
      <div className="mt-6 flex justify-end">
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2">
          <FaFileExport className="mr-2 -ml-1" />
          Export Report
        </button>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <FaChartBar className="mr-2 -ml-1" />
          Generate Insights
        </button>
      </div>
    </div>
  );
};

export default VerificationStatus; 