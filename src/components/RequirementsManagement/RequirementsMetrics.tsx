import React, { useState, useEffect } from 'react';
import { 
  FaChartBar, 
  FaChartPie, 
  FaChartLine, 
  FaFilter, 
  FaDownload,
  FaCalendarAlt,
  FaExclamationTriangle,
  FaCheck,
  FaTimes,
  FaSyncAlt,
  FaExclamationCircle,
  FaChevronRight,
  FaChevronDown
} from 'react-icons/fa';

// Define interfaces for data models
interface Requirement {
  id: string;
  title: string;
  description: string;
  type: 'System' | 'Functional' | 'Performance' | 'Interface' | 'Other';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Draft' | 'Review' | 'Approved' | 'Rejected' | 'Implemented' | 'Verified' | 'Deferred';
  category: string;
  createdDate: string;
  updatedDate: string;
  author: string;
  assignedTo: string;
  complexity: 'Simple' | 'Medium' | 'Complex';
  volatility: 'Low' | 'Medium' | 'High';
  dependencies: string[];
  verificationMethod: string[];
  coverage: number;
  changeCount: number;
}

interface ChangeHistory {
  id: string;
  requirementId: string;
  date: string;
  author: string;
  field: string;
  oldValue: string;
  newValue: string;
  reason: string;
}

interface StatusTrend {
  date: string;
  draft: number;
  review: number;
  approved: number;
  rejected: number;
  implemented: number;
  verified: number;
  deferred: number;
}

interface TypeSummary {
  type: string;
  count: number;
  percentage: number;
}

interface MetricsDashboard {
  totalRequirements: number;
  byType: TypeSummary[];
  byPriority: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  byStatus: {
    draft: number;
    review: number;
    approved: number;
    rejected: number;
    implemented: number;
    verified: number;
    deferred: number;
  };
  byCategory: Record<string, number>;
  byComplexity: {
    simple: number;
    medium: number;
    complex: number;
  };
  volatilityIndex: number;
  stabilityIndex: number;
  coveragePercentage: number;
  avgChangeFrequency: number;
  qualityIndex: number;
  growthRate: {
    lastMonth: number;
    lastQuarter: number;
  };
  riskAssessment: 'Low' | 'Medium' | 'High';
  statusTrends: StatusTrend[];
  verificationCoverage: number;
}

const RequirementsMetrics: React.FC = () => {
  // Sample requirements data
  const [requirements, setRequirements] = useState<Requirement[]>([
    {
      id: 'REQ-001',
      title: 'User Authentication',
      description: 'The system shall provide secure user authentication using username and password.',
      type: 'Functional',
      priority: 'Critical',
      status: 'Verified',
      category: 'Security',
      createdDate: '2023-01-15',
      updatedDate: '2023-04-10',
      author: 'John Smith',
      assignedTo: 'Sarah Johnson',
      complexity: 'Medium',
      volatility: 'Low',
      dependencies: ['REQ-003', 'REQ-015'],
      verificationMethod: ['Test', 'Demonstration'],
      coverage: 100,
      changeCount: 2
    },
    {
      id: 'REQ-002',
      title: 'Data Encryption',
      description: 'All sensitive data shall be encrypted using AES-256 encryption.',
      type: 'System',
      priority: 'Critical',
      status: 'Implemented',
      category: 'Security',
      createdDate: '2023-01-18',
      updatedDate: '2023-05-02',
      author: 'John Smith',
      assignedTo: 'Michael Davis',
      complexity: 'Complex',
      volatility: 'Low',
      dependencies: ['REQ-001'],
      verificationMethod: ['Analysis', 'Test'],
      coverage: 80,
      changeCount: 1
    },
    {
      id: 'REQ-003',
      title: 'Password Requirements',
      description: 'Passwords shall be at least 8 characters long with a mix of letters, numbers, and special characters.',
      type: 'Functional',
      priority: 'High',
      status: 'Approved',
      category: 'Security',
      createdDate: '2023-01-20',
      updatedDate: '2023-03-15',
      author: 'Emily Chen',
      assignedTo: 'Sarah Johnson',
      complexity: 'Simple',
      volatility: 'Medium',
      dependencies: [],
      verificationMethod: ['Analysis', 'Test'],
      coverage: 60,
      changeCount: 3
    },
    {
      id: 'REQ-004',
      title: 'System Response Time',
      description: 'The system shall respond to user inputs within 200ms under normal operating conditions.',
      type: 'Performance',
      priority: 'High',
      status: 'Implemented',
      category: 'Performance',
      createdDate: '2023-01-25',
      updatedDate: '2023-05-10',
      author: 'Robert Kim',
      assignedTo: 'Jennifer Lee',
      complexity: 'Medium',
      volatility: 'Medium',
      dependencies: [],
      verificationMethod: ['Test'],
      coverage: 90,
      changeCount: 2
    },
    {
      id: 'REQ-005',
      title: 'User Interface Accessibility',
      description: 'The system shall comply with WCAG 2.1 Level AA accessibility guidelines.',
      type: 'Functional',
      priority: 'Medium',
      status: 'Review',
      category: 'Usability',
      createdDate: '2023-02-01',
      updatedDate: '2023-04-05',
      author: 'Sarah Johnson',
      assignedTo: 'David Wilson',
      complexity: 'Complex',
      volatility: 'Low',
      dependencies: [],
      verificationMethod: ['Inspection', 'Test'],
      coverage: 40,
      changeCount: 1
    },
    {
      id: 'REQ-006',
      title: 'Data Backup',
      description: 'The system shall perform automatic backups of all data every 24 hours.',
      type: 'System',
      priority: 'High',
      status: 'Approved',
      category: 'Reliability',
      createdDate: '2023-02-05',
      updatedDate: '2023-03-20',
      author: 'Michael Davis',
      assignedTo: 'Emily Chen',
      complexity: 'Medium',
      volatility: 'Low',
      dependencies: ['REQ-009'],
      verificationMethod: ['Test', 'Demonstration'],
      coverage: 50,
      changeCount: 0
    },
    {
      id: 'REQ-007',
      title: 'User Session Management',
      description: 'The system shall automatically log out inactive users after 30 minutes.',
      type: 'Functional',
      priority: 'Medium',
      status: 'Implemented',
      category: 'Security',
      createdDate: '2023-02-10',
      updatedDate: '2023-05-05',
      author: 'Emily Chen',
      assignedTo: 'John Smith',
      complexity: 'Simple',
      volatility: 'Low',
      dependencies: ['REQ-001'],
      verificationMethod: ['Test'],
      coverage: 100,
      changeCount: 1
    },
    {
      id: 'REQ-008',
      title: 'Third-party Integration',
      description: 'The system shall provide API endpoints for integration with specified third-party services.',
      type: 'Interface',
      priority: 'Medium',
      status: 'Draft',
      category: 'Integration',
      createdDate: '2023-02-15',
      updatedDate: '2023-02-15',
      author: 'Robert Kim',
      assignedTo: 'Robert Kim',
      complexity: 'Complex',
      volatility: 'High',
      dependencies: [],
      verificationMethod: ['Test', 'Analysis'],
      coverage: 0,
      changeCount: 0
    },
    {
      id: 'REQ-009',
      title: 'Data Storage',
      description: 'The system shall securely store all user data in compliance with GDPR regulations.',
      type: 'System',
      priority: 'Critical',
      status: 'Approved',
      category: 'Compliance',
      createdDate: '2023-02-20',
      updatedDate: '2023-04-01',
      author: 'John Smith',
      assignedTo: 'Emily Chen',
      complexity: 'Complex',
      volatility: 'Medium',
      dependencies: ['REQ-002'],
      verificationMethod: ['Analysis', 'Inspection'],
      coverage: 70,
      changeCount: 2
    },
    {
      id: 'REQ-010',
      title: 'Audit Logging',
      description: 'The system shall maintain detailed audit logs of all security-related events.',
      type: 'Functional',
      priority: 'High',
      status: 'Verified',
      category: 'Security',
      createdDate: '2023-02-25',
      updatedDate: '2023-05-15',
      author: 'Sarah Johnson',
      assignedTo: 'Michael Davis',
      complexity: 'Medium',
      volatility: 'Low',
      dependencies: [],
      verificationMethod: ['Test', 'Inspection'],
      coverage: 100,
      changeCount: 1
    },
    {
      id: 'REQ-011',
      title: 'Mobile Compatibility',
      description: 'The system shall be fully functional on iOS and Android mobile devices.',
      type: 'System',
      priority: 'Medium',
      status: 'Review',
      category: 'Usability',
      createdDate: '2023-03-01',
      updatedDate: '2023-04-20',
      author: 'Jennifer Lee',
      assignedTo: 'David Wilson',
      complexity: 'Complex',
      volatility: 'Medium',
      dependencies: [],
      verificationMethod: ['Test', 'Demonstration'],
      coverage: 30,
      changeCount: 2
    },
    {
      id: 'REQ-012',
      title: 'Error Handling',
      description: 'The system shall provide clear error messages for all user-facing errors.',
      type: 'Functional',
      priority: 'Medium',
      status: 'Deferred',
      category: 'Usability',
      createdDate: '2023-03-05',
      updatedDate: '2023-04-10',
      author: 'David Wilson',
      assignedTo: 'Jennifer Lee',
      complexity: 'Medium',
      volatility: 'High',
      dependencies: [],
      verificationMethod: ['Test', 'Inspection'],
      coverage: 0,
      changeCount: 3
    }
  ]);

  // Sample change history data
  const [changeHistory, setChangeHistory] = useState<ChangeHistory[]>([
    {
      id: 'CH-001',
      requirementId: 'REQ-001',
      date: '2023-02-10',
      author: 'Emily Chen',
      field: 'description',
      oldValue: 'The system shall provide user authentication.',
      newValue: 'The system shall provide secure user authentication using username and password.',
      reason: 'Clarification of security requirements'
    },
    {
      id: 'CH-002',
      requirementId: 'REQ-001',
      date: '2023-04-10',
      author: 'Sarah Johnson',
      field: 'status',
      oldValue: 'Implemented',
      newValue: 'Verified',
      reason: 'Verification completed successfully'
    },
    {
      id: 'CH-003',
      requirementId: 'REQ-003',
      date: '2023-02-15',
      author: 'John Smith',
      field: 'description',
      oldValue: 'Passwords shall be at least 6 characters long.',
      newValue: 'Passwords shall be at least 8 characters long with a mix of letters, numbers, and special characters.',
      reason: 'Enhanced security requirements'
    },
    {
      id: 'CH-004',
      requirementId: 'REQ-003',
      date: '2023-03-01',
      author: 'Emily Chen',
      field: 'priority',
      oldValue: 'Medium',
      newValue: 'High',
      reason: 'Security risk assessment update'
    },
    {
      id: 'CH-005',
      requirementId: 'REQ-004',
      date: '2023-03-20',
      author: 'Robert Kim',
      field: 'description',
      oldValue: 'The system shall respond to user inputs within 500ms.',
      newValue: 'The system shall respond to user inputs within 200ms under normal operating conditions.',
      reason: 'Performance optimization goal update'
    },
    {
      id: 'CH-006',
      requirementId: 'REQ-009',
      date: '2023-03-15',
      author: 'Sarah Johnson',
      field: 'dependencies',
      oldValue: '',
      newValue: 'REQ-002',
      reason: 'Dependency on encryption requirements identified'
    },
    {
      id: 'CH-007',
      requirementId: 'REQ-012',
      date: '2023-04-10',
      author: 'Jennifer Lee',
      field: 'status',
      oldValue: 'Review',
      newValue: 'Deferred',
      reason: 'Feature postponed to next release cycle'
    }
  ]);
  
  // Status trend over time (sample data)
  const [statusTrends, setStatusTrends] = useState<StatusTrend[]>([
    {
      date: '2023-01-31',
      draft: 5,
      review: 3,
      approved: 1,
      rejected: 0,
      implemented: 0,
      verified: 0,
      deferred: 0
    },
    {
      date: '2023-02-28',
      draft: 3,
      review: 4,
      approved: 3,
      rejected: 0,
      implemented: 2,
      verified: 0,
      deferred: 0
    },
    {
      date: '2023-03-31',
      draft: 2,
      review: 3,
      approved: 4,
      rejected: 0,
      implemented: 3,
      verified: 1,
      deferred: 0
    },
    {
      date: '2023-04-30',
      draft: 1,
      review: 2,
      approved: 3,
      rejected: 0,
      implemented: 4,
      verified: 1,
      deferred: 1
    },
    {
      date: '2023-05-31',
      draft: 1,
      review: 2,
      approved: 2,
      rejected: 0,
      implemented: 4,
      verified: 2,
      deferred: 1
    }
  ]);

  // State for metrics dashboard
  const [metricsDashboard, setMetricsDashboard] = useState<MetricsDashboard>({
    totalRequirements: 0,
    byType: [],
    byPriority: {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0
    },
    byStatus: {
      draft: 0,
      review: 0,
      approved: 0,
      rejected: 0,
      implemented: 0,
      verified: 0,
      deferred: 0
    },
    byCategory: {},
    byComplexity: {
      simple: 0,
      medium: 0,
      complex: 0
    },
    volatilityIndex: 0,
    stabilityIndex: 0,
    coveragePercentage: 0,
    avgChangeFrequency: 0,
    qualityIndex: 0,
    growthRate: {
      lastMonth: 0,
      lastQuarter: 0
    },
    riskAssessment: 'Medium',
    statusTrends: [],
    verificationCoverage: 0
  });

  // State for filters
  const [timeframe, setTimeframe] = useState<'last30days' | 'last90days' | 'lastYear' | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Function to calculate metrics
  useEffect(() => {
    // Filter requirements based on selected timeframe
    const filteredRequirements = requirements.filter(req => {
      if (timeframe === 'all') return true;
      
      const updateDate = new Date(req.updatedDate);
      const today = new Date();
      
      if (timeframe === 'last30days') {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(today.getDate() - 30);
        return updateDate >= thirtyDaysAgo;
      } else if (timeframe === 'last90days') {
        const ninetyDaysAgo = new Date();
        ninetyDaysAgo.setDate(today.getDate() - 90);
        return updateDate >= ninetyDaysAgo;
      } else if (timeframe === 'lastYear') {
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(today.getFullYear() - 1);
        return updateDate >= oneYearAgo;
      }
      
      return true;
    }).filter(req => {
      // Apply category filter if selected
      if (categoryFilter) {
        return req.category === categoryFilter;
      }
      return true;
    }).filter(req => {
      // Apply type filter if selected
      if (typeFilter) {
        return req.type === typeFilter;
      }
      return true;
    });
    
    // Count requirements by type
    const typeCount: Record<string, number> = {};
    filteredRequirements.forEach(req => {
      typeCount[req.type] = (typeCount[req.type] || 0) + 1;
    });
    
    const byTypeArray: TypeSummary[] = Object.entries(typeCount).map(([type, count]) => ({
      type,
      count,
      percentage: (count / filteredRequirements.length) * 100
    }));
    
    // Count requirements by category
    const categoryCount: Record<string, number> = {};
    filteredRequirements.forEach(req => {
      categoryCount[req.category] = (categoryCount[req.category] || 0) + 1;
    });
    
    // Count requirements by status
    const statusCount = {
      draft: filteredRequirements.filter(req => req.status === 'Draft').length,
      review: filteredRequirements.filter(req => req.status === 'Review').length,
      approved: filteredRequirements.filter(req => req.status === 'Approved').length,
      rejected: filteredRequirements.filter(req => req.status === 'Rejected').length,
      implemented: filteredRequirements.filter(req => req.status === 'Implemented').length,
      verified: filteredRequirements.filter(req => req.status === 'Verified').length,
      deferred: filteredRequirements.filter(req => req.status === 'Deferred').length
    };
    
    // Count requirements by priority
    const priorityCount = {
      critical: filteredRequirements.filter(req => req.priority === 'Critical').length,
      high: filteredRequirements.filter(req => req.priority === 'High').length,
      medium: filteredRequirements.filter(req => req.priority === 'Medium').length,
      low: filteredRequirements.filter(req => req.priority === 'Low').length
    };
    
    // Count requirements by complexity
    const complexityCount = {
      simple: filteredRequirements.filter(req => req.complexity === 'Simple').length,
      medium: filteredRequirements.filter(req => req.complexity === 'Medium').length,
      complex: filteredRequirements.filter(req => req.complexity === 'Complex').length
    };
    
    // Calculate verification coverage
    const totalCoveragePercentage = filteredRequirements.length > 0
      ? filteredRequirements.reduce((sum, req) => sum + req.coverage, 0) / filteredRequirements.length
      : 0;
    
    // Calculate verification method coverage
    const verificationCoverage = filteredRequirements.length > 0
      ? filteredRequirements.filter(req => req.verificationMethod.length > 0).length / filteredRequirements.length * 100
      : 0;
    
    // Calculate volatility index (percentage of requirements with high volatility)
    const highVolatilityCount = filteredRequirements.filter(req => req.volatility === 'High').length;
    const volatilityIndex = filteredRequirements.length > 0
      ? (highVolatilityCount / filteredRequirements.length) * 100
      : 0;
    
    // Calculate stability index (percentage of requirements with low change count)
    const stableReqCount = filteredRequirements.filter(req => req.changeCount <= 1).length;
    const stabilityIndex = filteredRequirements.length > 0
      ? (stableReqCount / filteredRequirements.length) * 100
      : 0;
    
    // Calculate average change frequency
    const totalChanges = filteredRequirements.reduce((sum, req) => sum + req.changeCount, 0);
    const avgChangeFrequency = filteredRequirements.length > 0
      ? totalChanges / filteredRequirements.length
      : 0;
    
    // Calculate quality index (composite score based on coverage, stability, and volatility)
    const qualityIndex = (totalCoveragePercentage * 0.4) + (stabilityIndex * 0.4) + (100 - volatilityIndex) * 0.2;
    
    // Calculate growth rates
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(today.getMonth() - 3);
    
    const currentCount = filteredRequirements.length;
    const oneMonthAgoCount = requirements.filter(req => new Date(req.createdDate) < oneMonthAgo).length;
    const threeMonthsAgoCount = requirements.filter(req => new Date(req.createdDate) < threeMonthsAgo).length;
    
    const monthlyGrowthRate = oneMonthAgoCount > 0 
      ? ((currentCount - oneMonthAgoCount) / oneMonthAgoCount) * 100 
      : 0;
    
    const quarterlyGrowthRate = threeMonthsAgoCount > 0 
      ? ((currentCount - threeMonthsAgoCount) / threeMonthsAgoCount) * 100 
      : 0;
    
    // Determine risk assessment based on volatility, coverage, and complexity
    let riskAssessment: 'Low' | 'Medium' | 'High' = 'Medium';
    const criticalRequirementsPercentage = filteredRequirements.length > 0 
      ? (priorityCount.critical / filteredRequirements.length) * 100 
      : 0;
    
    const complexRequirementsPercentage = filteredRequirements.length > 0 
      ? (complexityCount.complex / filteredRequirements.length) * 100 
      : 0;
    
    if (volatilityIndex > 40 || criticalRequirementsPercentage > 50 || totalCoveragePercentage < 30) {
      riskAssessment = 'High';
    } else if (volatilityIndex < 15 && criticalRequirementsPercentage < 20 && totalCoveragePercentage > 70) {
      riskAssessment = 'Low';
    }
    
    // Update metrics dashboard
    setMetricsDashboard({
      totalRequirements: filteredRequirements.length,
      byType: byTypeArray,
      byPriority: priorityCount,
      byStatus: statusCount,
      byCategory: categoryCount,
      byComplexity: complexityCount,
      volatilityIndex,
      stabilityIndex,
      coveragePercentage: totalCoveragePercentage,
      avgChangeFrequency,
      qualityIndex,
      growthRate: {
        lastMonth: monthlyGrowthRate,
        lastQuarter: quarterlyGrowthRate
      },
      riskAssessment,
      statusTrends: statusTrends.slice(-5), // Use the last 5 status trends
      verificationCoverage
    });
    
  }, [requirements, changeHistory, statusTrends, timeframe, categoryFilter, typeFilter]);

  // Helper function to get status color
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Review': return 'bg-blue-100 text-blue-800';
      case 'Approved': return 'bg-indigo-100 text-indigo-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Implemented': return 'bg-green-100 text-green-800';
      case 'Verified': return 'bg-emerald-100 text-emerald-800';
      case 'Deferred': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to get priority color
  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to get risk color
  const getRiskColor = (risk: string): string => {
    switch (risk) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get unique categories for filter dropdown
  const uniqueCategories = Array.from(new Set(requirements.map(req => req.category)));
  const uniqueTypes = Array.from(new Set(requirements.map(req => req.type)));

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-2xl font-bold">Requirements Metrics</h2>
        
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          {/* Timeframe Filter */}
          <select
            className="border-gray-300 rounded-md text-sm"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value as any)}
          >
            <option value="all">All Time</option>
            <option value="last30days">Last 30 Days</option>
            <option value="last90days">Last 90 Days</option>
            <option value="lastYear">Last Year</option>
          </select>
          
          {/* Category Filter */}
          <select
            className="border-gray-300 rounded-md text-sm"
            value={categoryFilter || ''}
            onChange={(e) => setCategoryFilter(e.target.value || null)}
          >
            <option value="">All Categories</option>
            {uniqueCategories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
          
          {/* Type Filter */}
          <select
            className="border-gray-300 rounded-md text-sm"
            value={typeFilter || ''}
            onChange={(e) => setTypeFilter(e.target.value || null)}
          >
            <option value="">All Types</option>
            {uniqueTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
          
          {/* Export Button */}
          <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
            <FaDownload className="mr-2" /> Export
          </button>
        </div>
      </div>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="text-sm text-blue-600 font-medium">Total Requirements</div>
          <div className="text-2xl font-bold mt-1">{metricsDashboard.totalRequirements}</div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="text-sm text-green-600 font-medium">Verification Coverage</div>
          <div className="text-2xl font-bold mt-1">{Math.round(metricsDashboard.coveragePercentage)}%</div>
        </div>
        
        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
          <div className="text-sm text-indigo-600 font-medium">Quality Index</div>
          <div className="text-2xl font-bold mt-1">{Math.round(metricsDashboard.qualityIndex)}</div>
          <div className="mt-1 text-xs text-indigo-500">
            {metricsDashboard.qualityIndex >= 80 ? 'Excellent' : 
             metricsDashboard.qualityIndex >= 60 ? 'Good' : 
             metricsDashboard.qualityIndex >= 40 ? 'Fair' : 'Poor'}
          </div>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="text-sm text-yellow-600 font-medium">Stability Index</div>
          <div className="text-2xl font-bold mt-1">{Math.round(metricsDashboard.stabilityIndex)}%</div>
        </div>
        
        <div className={`p-4 rounded-lg border ${getRiskColor(metricsDashboard.riskAssessment)}`}>
          <div className={`text-sm font-medium ${getRiskColor(metricsDashboard.riskAssessment).replace('bg-', 'text-').replace('-100', '-600')}`}>
            Risk Assessment
          </div>
          <div className="text-2xl font-bold mt-1">{metricsDashboard.riskAssessment}</div>
        </div>
      </div>
      
      {/* Main Metrics Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Status Distribution Chart */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Requirements by Status</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Draft</span>
              <span className="font-medium">{metricsDashboard.byStatus.draft}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-gray-500 h-2.5 rounded-full" 
                style={{ 
                  width: `${metricsDashboard.totalRequirements > 0 
                    ? (metricsDashboard.byStatus.draft / metricsDashboard.totalRequirements * 100) 
                    : 0}%` 
                }}
              ></div>
            </div>
            
            <div className="flex justify-between">
              <span>Review</span>
              <span className="font-medium">{metricsDashboard.byStatus.review}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-500 h-2.5 rounded-full" 
                style={{ 
                  width: `${metricsDashboard.totalRequirements > 0 
                    ? (metricsDashboard.byStatus.review / metricsDashboard.totalRequirements * 100) 
                    : 0}%` 
                }}
              ></div>
            </div>
            
            <div className="flex justify-between">
              <span>Approved</span>
              <span className="font-medium">{metricsDashboard.byStatus.approved}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-indigo-500 h-2.5 rounded-full" 
                style={{ 
                  width: `${metricsDashboard.totalRequirements > 0 
                    ? (metricsDashboard.byStatus.approved / metricsDashboard.totalRequirements * 100) 
                    : 0}%` 
                }}
              ></div>
            </div>
            
            <div className="flex justify-between">
              <span>Implemented</span>
              <span className="font-medium">{metricsDashboard.byStatus.implemented}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-green-500 h-2.5 rounded-full" 
                style={{ 
                  width: `${metricsDashboard.totalRequirements > 0 
                    ? (metricsDashboard.byStatus.implemented / metricsDashboard.totalRequirements * 100) 
                    : 0}%` 
                }}
              ></div>
            </div>
            
            <div className="flex justify-between">
              <span>Verified</span>
              <span className="font-medium">{metricsDashboard.byStatus.verified}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-emerald-500 h-2.5 rounded-full" 
                style={{ 
                  width: `${metricsDashboard.totalRequirements > 0 
                    ? (metricsDashboard.byStatus.verified / metricsDashboard.totalRequirements * 100) 
                    : 0}%` 
                }}
              ></div>
            </div>
            
            <div className="flex justify-between">
              <span>Deferred</span>
              <span className="font-medium">{metricsDashboard.byStatus.deferred}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-orange-500 h-2.5 rounded-full" 
                style={{ 
                  width: `${metricsDashboard.totalRequirements > 0 
                    ? (metricsDashboard.byStatus.deferred / metricsDashboard.totalRequirements * 100) 
                    : 0}%` 
                }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Priority Distribution Chart */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Requirements by Priority</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Critical</span>
              <span className="font-medium">{metricsDashboard.byPriority.critical}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-red-500 h-2.5 rounded-full" 
                style={{ 
                  width: `${metricsDashboard.totalRequirements > 0 
                    ? (metricsDashboard.byPriority.critical / metricsDashboard.totalRequirements * 100) 
                    : 0}%` 
                }}
              ></div>
            </div>
            
            <div className="flex justify-between">
              <span>High</span>
              <span className="font-medium">{metricsDashboard.byPriority.high}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-orange-500 h-2.5 rounded-full" 
                style={{ 
                  width: `${metricsDashboard.totalRequirements > 0 
                    ? (metricsDashboard.byPriority.high / metricsDashboard.totalRequirements * 100) 
                    : 0}%` 
                }}
              ></div>
            </div>
            
            <div className="flex justify-between">
              <span>Medium</span>
              <span className="font-medium">{metricsDashboard.byPriority.medium}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-yellow-500 h-2.5 rounded-full" 
                style={{ 
                  width: `${metricsDashboard.totalRequirements > 0 
                    ? (metricsDashboard.byPriority.medium / metricsDashboard.totalRequirements * 100) 
                    : 0}%` 
                }}
              ></div>
            </div>
            
            <div className="flex justify-between">
              <span>Low</span>
              <span className="font-medium">{metricsDashboard.byPriority.low}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-green-500 h-2.5 rounded-full" 
                style={{ 
                  width: `${metricsDashboard.totalRequirements > 0 
                    ? (metricsDashboard.byPriority.low / metricsDashboard.totalRequirements * 100) 
                    : 0}%` 
                }}
              ></div>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold mt-6 mb-3">Requirements by Complexity</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Simple</span>
              <span className="font-medium">{metricsDashboard.byComplexity.simple}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-green-500 h-2.5 rounded-full" 
                style={{ 
                  width: `${metricsDashboard.totalRequirements > 0 
                    ? (metricsDashboard.byComplexity.simple / metricsDashboard.totalRequirements * 100) 
                    : 0}%` 
                }}
              ></div>
            </div>
            
            <div className="flex justify-between">
              <span>Medium</span>
              <span className="font-medium">{metricsDashboard.byComplexity.medium}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-yellow-500 h-2.5 rounded-full" 
                style={{ 
                  width: `${metricsDashboard.totalRequirements > 0 
                    ? (metricsDashboard.byComplexity.medium / metricsDashboard.totalRequirements * 100) 
                    : 0}%` 
                }}
              ></div>
            </div>
            
            <div className="flex justify-between">
              <span>Complex</span>
              <span className="font-medium">{metricsDashboard.byComplexity.complex}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-red-500 h-2.5 rounded-full" 
                style={{ 
                  width: `${metricsDashboard.totalRequirements > 0 
                    ? (metricsDashboard.byComplexity.complex / metricsDashboard.totalRequirements * 100) 
                    : 0}%` 
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Types and Trends Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Requirements by Type */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Requirements by Type</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Count
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Percentage
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {metricsDashboard.byType.map((typeInfo, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {typeInfo.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {typeInfo.count}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {typeInfo.percentage.toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Status Trends Over Time */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Status Trends Over Time</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Draft
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Review
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Approved
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Implemented
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Verified
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {metricsDashboard.statusTrends.map((trend, index) => (
                  <tr key={index}>
                    <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {trend.date}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      {trend.draft}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      {trend.review}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      {trend.approved}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      {trend.implemented}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      {trend.verified}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Additional Metrics Section */}
      <div className="border rounded-lg p-4 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Additional Metrics</h3>
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
            {showDetails ? <FaChevronDown className="ml-1" /> : <FaChevronRight className="ml-1" />}
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Volatility Index</div>
            <div className="text-xl font-semibold mt-1">{metricsDashboard.volatilityIndex.toFixed(1)}%</div>
            <div className="text-xs text-gray-500 mt-1">Percentage of requirements with high volatility</div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Average Change Frequency</div>
            <div className="text-xl font-semibold mt-1">{metricsDashboard.avgChangeFrequency.toFixed(1)}</div>
            <div className="text-xs text-gray-500 mt-1">Average changes per requirement</div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Growth Rate (Monthly)</div>
            <div className="text-xl font-semibold mt-1">{metricsDashboard.growthRate.lastMonth.toFixed(1)}%</div>
            <div className="text-xs text-gray-500 mt-1">Change in requirements in the last month</div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Growth Rate (Quarterly)</div>
            <div className="text-xl font-semibold mt-1">{metricsDashboard.growthRate.lastQuarter.toFixed(1)}%</div>
            <div className="text-xs text-gray-500 mt-1">Change in requirements in the last quarter</div>
          </div>
        </div>
        
        {showDetails && (
          <div className="mt-6">
            <h4 className="text-md font-medium mb-3">Category Distribution</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(metricsDashboard.byCategory).map(([category, count], index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{category}</span>
                  <span className="font-medium">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Actions Row */}
      <div className="flex justify-end">
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <FaChartLine className="mr-2 -ml-1" />
          Generate Detailed Report
        </button>
      </div>
    </div>
  );
};

export default RequirementsMetrics; 