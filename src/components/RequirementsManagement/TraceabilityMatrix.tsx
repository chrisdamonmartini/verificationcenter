import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaDownload, FaPlus, FaCheck, FaMinus, FaQuestion } from 'react-icons/fa';

// Define types for our traceability data
interface SystemRequirement {
  id: string;
  title: string;
  category: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: string;
}

interface FunctionalRequirement {
  id: string;
  title: string;
  category: string;
  systemRequirement: string | null;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: string;
}

interface TestCase {
  id: string;
  title: string;
  type: 'Unit' | 'Integration' | 'System' | 'Acceptance';
  status: string;
}

interface DesignComponent {
  id: string;
  name: string;
  category: string;
  type: 'HW' | 'SW' | 'Mechanical' | 'Electrical';
}

// Define relationship types
type RelationshipType = 'Satisfies' | 'Implements' | 'Verifies' | 'Allocated' | 'None';

// Define matrix cell data
interface MatrixCell {
  relationshipType: RelationshipType;
  description?: string;
  status?: 'Verified' | 'Not Verified' | 'Partially Verified' | 'Not Applicable';
  coverage?: number; // percentage
}

// Matrix row for different artifacts
interface MatrixRow {
  id: string;
  title: string;
  type: 'System' | 'Functional' | 'Test' | 'Design';
  cells: Record<string, MatrixCell>; // key is target item id
}

const TraceabilityMatrix: React.FC = () => {
  // Sample data for system requirements
  const [systemRequirements, setSystemRequirements] = useState<SystemRequirement[]>([
    { 
      id: 'SYS-REQ-001', 
      title: 'System Navigation Accuracy', 
      category: 'Performance',
      priority: 'High',
      status: 'Approved'
    },
    { 
      id: 'SYS-REQ-002', 
      title: 'Real-time Data Updates', 
      category: 'Performance',
      priority: 'Medium',
      status: 'Approved'
    },
    { 
      id: 'SYS-REQ-003', 
      title: 'User Interface Responsiveness', 
      category: 'Usability',
      priority: 'Medium',
      status: 'Approved'
    },
    { 
      id: 'SYS-REQ-008', 
      title: 'System Security Requirements', 
      category: 'Security',
      priority: 'Critical',
      status: 'Approved'
    },
    { 
      id: 'SYS-REQ-010', 
      title: 'User Preferences Storage', 
      category: 'Functionality',
      priority: 'Low',
      status: 'Under Review'
    },
    { 
      id: 'SYS-REQ-012', 
      title: 'Error Handling Requirements', 
      category: 'Reliability',
      priority: 'High',
      status: 'Approved'
    }
  ]);

  // Sample data for functional requirements
  const [functionalRequirements, setFunctionalRequirements] = useState<FunctionalRequirement[]>([
    {
      id: 'FUNC-REQ-001',
      title: 'User Authentication',
      category: 'Security',
      systemRequirement: 'SYS-REQ-008',
      priority: 'Critical',
      status: 'Approved'
    },
    {
      id: 'FUNC-REQ-002',
      title: 'Data Encryption',
      category: 'Security',
      systemRequirement: 'SYS-REQ-008',
      priority: 'Critical',
      status: 'Approved'
    },
    {
      id: 'FUNC-REQ-003',
      title: 'Navigation Route Calculation',
      category: 'Navigation',
      systemRequirement: 'SYS-REQ-001',
      priority: 'High',
      status: 'Implemented'
    },
    {
      id: 'FUNC-REQ-004',
      title: 'Real-time Traffic Updates',
      category: 'Navigation',
      systemRequirement: 'SYS-REQ-002',
      priority: 'Medium',
      status: 'Implemented'
    },
    {
      id: 'FUNC-REQ-005',
      title: 'User Preference Storage',
      category: 'User Experience',
      systemRequirement: 'SYS-REQ-010',
      priority: 'Medium',
      status: 'Approved'
    },
    {
      id: 'FUNC-REQ-007',
      title: 'Location Services',
      category: 'Navigation',
      systemRequirement: 'SYS-REQ-001',
      priority: 'Critical',
      status: 'Verified'
    },
    {
      id: 'FUNC-REQ-008',
      title: 'System Error Reporting',
      category: 'System Operations',
      systemRequirement: 'SYS-REQ-012',
      priority: 'Medium',
      status: 'Implemented'
    }
  ]);

  // Sample test cases
  const [testCases, setTestCases] = useState<TestCase[]>([
    {
      id: 'TEST-001',
      title: 'Authentication Test Suite',
      type: 'System',
      status: 'Passed'
    },
    {
      id: 'TEST-002',
      title: 'Encryption Algorithm Tests',
      type: 'Unit',
      status: 'Passed'
    },
    {
      id: 'TEST-003',
      title: 'Navigation Accuracy Tests',
      type: 'System',
      status: 'In Progress'
    },
    {
      id: 'TEST-004',
      title: 'Traffic Update Integration Tests',
      type: 'Integration',
      status: 'Passed'
    },
    {
      id: 'TEST-005',
      title: 'User Preferences Persistence Tests',
      type: 'Unit',
      status: 'Passed'
    },
    {
      id: 'TEST-006',
      title: 'GPS Accuracy Tests',
      type: 'System',
      status: 'Passed'
    },
    {
      id: 'TEST-007',
      title: 'Error Handling and Recovery Tests',
      type: 'Integration',
      status: 'In Progress'
    }
  ]);

  // Sample design components
  const [designComponents, setDesignComponents] = useState<DesignComponent[]>([
    {
      id: 'COMP-001',
      name: 'Authentication Service',
      category: 'Backend',
      type: 'SW'
    },
    {
      id: 'COMP-002',
      name: 'Encryption Module',
      category: 'Security',
      type: 'SW'
    },
    {
      id: 'COMP-003',
      name: 'Navigation Engine',
      category: 'Core Functionality',
      type: 'SW'
    },
    {
      id: 'COMP-004',
      name: 'Traffic Service',
      category: 'Backend',
      type: 'SW'
    },
    {
      id: 'COMP-005',
      name: 'User Preferences Database',
      category: 'Data Storage',
      type: 'SW'
    },
    {
      id: 'COMP-006',
      name: 'GPS Module',
      category: 'Hardware Interface',
      type: 'HW'
    },
    {
      id: 'COMP-007',
      name: 'Error Logging System',
      category: 'System',
      type: 'SW'
    }
  ]);

  // Sample traceability matrix data
  const [matrixRows, setMatrixRows] = useState<MatrixRow[]>([]);

  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [sourceTypeFilter, setSourceTypeFilter] = useState<string | null>(null);
  const [targetTypeFilter, setTargetTypeFilter] = useState<string | null>(null);
  const [relationshipFilter, setRelationshipFilter] = useState<RelationshipType | null>(null);
  const [showEmptyRelationships, setShowEmptyRelationships] = useState(false);

  // State for selected columns (can toggle which artifact types to show)
  const [showSystemReqs, setShowSystemReqs] = useState(true);
  const [showFunctionalReqs, setShowFunctionalReqs] = useState(true);
  const [showTestCases, setShowTestCases] = useState(true);
  const [showDesignComponents, setShowDesignComponents] = useState(true);

  // Build the matrix data when component mounts or dependencies change
  useEffect(() => {
    const rows: MatrixRow[] = [];
    
    // Add system requirements as rows
    systemRequirements.forEach(sysReq => {
      const cells: Record<string, MatrixCell> = {};
      
      // System requirements don't typically trace to other system requirements
      // Add cells for functional requirements
      functionalRequirements.forEach(funcReq => {
        if (funcReq.systemRequirement === sysReq.id) {
          cells[funcReq.id] = { 
            relationshipType: 'Satisfies',
            status: 'Partially Verified',
            coverage: 75
          };
        } else {
          cells[funcReq.id] = { relationshipType: 'None' };
        }
      });
      
      // Add cells for test cases (direct system req verification)
      testCases.forEach(testCase => {
        // Just for demonstration, assign some test cases to system requirements
        if (
          (sysReq.id === 'SYS-REQ-001' && testCase.id === 'TEST-003') ||
          (sysReq.id === 'SYS-REQ-008' && testCase.id === 'TEST-001') ||
          (sysReq.id === 'SYS-REQ-010' && testCase.id === 'TEST-005') ||
          (sysReq.id === 'SYS-REQ-012' && testCase.id === 'TEST-007')
        ) {
          cells[testCase.id] = { 
            relationshipType: 'Verifies',
            status: testCase.status === 'Passed' ? 'Verified' : 'Not Verified',
            coverage: testCase.status === 'Passed' ? 100 : 50
          };
        } else {
          cells[testCase.id] = { relationshipType: 'None' };
        }
      });
      
      // Add cells for design components
      designComponents.forEach(comp => {
        cells[comp.id] = { relationshipType: 'None' };
      });
      
      rows.push({
        id: sysReq.id,
        title: sysReq.title,
        type: 'System',
        cells
      });
    });
    
    // Add functional requirements as rows
    functionalRequirements.forEach(funcReq => {
      const cells: Record<string, MatrixCell> = {};
      
      // Add cells for system requirements (parent relationship)
      systemRequirements.forEach(sysReq => {
        if (funcReq.systemRequirement === sysReq.id) {
          cells[sysReq.id] = { 
            relationshipType: 'Satisfies',
            status: 'Partially Verified',
            coverage: 75
          };
        } else {
          cells[sysReq.id] = { relationshipType: 'None' };
        }
      });
      
      // Functional requirements don't trace to other functional requirements in this example
      functionalRequirements.forEach(fr => {
        cells[fr.id] = { relationshipType: 'None' };
      });
      
      // Add cells for test cases
      testCases.forEach(testCase => {
        // For demonstration, assign some test cases to functional requirements
        if (
          (funcReq.id === 'FUNC-REQ-001' && testCase.id === 'TEST-001') ||
          (funcReq.id === 'FUNC-REQ-002' && testCase.id === 'TEST-002') ||
          (funcReq.id === 'FUNC-REQ-003' && testCase.id === 'TEST-003') ||
          (funcReq.id === 'FUNC-REQ-004' && testCase.id === 'TEST-004') ||
          (funcReq.id === 'FUNC-REQ-005' && testCase.id === 'TEST-005') ||
          (funcReq.id === 'FUNC-REQ-007' && testCase.id === 'TEST-006') ||
          (funcReq.id === 'FUNC-REQ-008' && testCase.id === 'TEST-007')
        ) {
          cells[testCase.id] = { 
            relationshipType: 'Verifies',
            status: testCase.status === 'Passed' ? 'Verified' : 'Not Verified',
            coverage: testCase.status === 'Passed' ? 100 : 50
          };
        } else {
          cells[testCase.id] = { relationshipType: 'None' };
        }
      });
      
      // Add cells for design components
      designComponents.forEach(comp => {
        // For demonstration, assign some design components to functional requirements
        if (
          (funcReq.id === 'FUNC-REQ-001' && comp.id === 'COMP-001') ||
          (funcReq.id === 'FUNC-REQ-002' && comp.id === 'COMP-002') ||
          (funcReq.id === 'FUNC-REQ-003' && comp.id === 'COMP-003') ||
          (funcReq.id === 'FUNC-REQ-004' && comp.id === 'COMP-004') ||
          (funcReq.id === 'FUNC-REQ-005' && comp.id === 'COMP-005') ||
          (funcReq.id === 'FUNC-REQ-007' && comp.id === 'COMP-006') ||
          (funcReq.id === 'FUNC-REQ-008' && comp.id === 'COMP-007')
        ) {
          cells[comp.id] = { 
            relationshipType: 'Implements',
            status: 'Partially Verified',
            coverage: 80
          };
        } else {
          cells[comp.id] = { relationshipType: 'None' };
        }
      });
      
      rows.push({
        id: funcReq.id,
        title: funcReq.title,
        type: 'Functional',
        cells
      });
    });
    
    // Set the matrix rows
    setMatrixRows(rows);
  }, [systemRequirements, functionalRequirements, testCases, designComponents]);

  // Filter rows based on search term and filters
  const filteredRows = matrixRows.filter(row => {
    // Filter by search term
    const matchesSearch = 
      searchTerm === '' ||
      row.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by source type
    const matchesSourceType = sourceTypeFilter === null || row.type === sourceTypeFilter;
    
    // Filter by relationship - requires checking cells
    let matchesRelationship = true;
    if (relationshipFilter !== null) {
      // For each row, check if there's at least one cell that matches the relationship filter
      const hasMatchingRelationship = Object.values(row.cells).some(cell => 
        cell.relationshipType === relationshipFilter
      );
      matchesRelationship = hasMatchingRelationship;
    }
    
    // Filter out empty relationships if needed
    let hasNonEmptyRelationships = true;
    if (!showEmptyRelationships) {
      const hasNonEmpty = Object.values(row.cells).some(cell => 
        cell.relationshipType !== 'None'
      );
      hasNonEmptyRelationships = hasNonEmpty;
    }
    
    return matchesSearch && matchesSourceType && matchesRelationship && hasNonEmptyRelationships;
  });

  // Get visible columns based on filters and toggles
  const getVisibleColumns = () => {
    let columns: { id: string; title: string; type: string }[] = [];
    
    if (showSystemReqs) {
      columns = columns.concat(systemRequirements.map(req => ({ 
        id: req.id, 
        title: req.title,
        type: 'System'
      })));
    }
    
    if (showFunctionalReqs) {
      columns = columns.concat(functionalRequirements.map(req => ({ 
        id: req.id, 
        title: req.title,
        type: 'Functional'
      })));
    }
    
    if (showTestCases) {
      columns = columns.concat(testCases.map(test => ({ 
        id: test.id, 
        title: test.title,
        type: 'Test'
      })));
    }
    
    if (showDesignComponents) {
      columns = columns.concat(designComponents.map(comp => ({ 
        id: comp.id, 
        title: comp.name,
        type: 'Design'
      })));
    }
    
    // Apply target type filter if set
    if (targetTypeFilter !== null) {
      columns = columns.filter(col => col.type === targetTypeFilter);
    }
    
    return columns;
  };

  const visibleColumns = getVisibleColumns();

  // Helper to get relationship icon and color
  const getRelationshipIndicator = (relationship: RelationshipType) => {
    switch (relationship) {
      case 'Satisfies':
        return <FaCheck className="text-green-500" title="Satisfies" />;
      case 'Implements':
        return <FaCheck className="text-blue-500" title="Implements" />;
      case 'Verifies':
        return <FaCheck className="text-purple-500" title="Verifies" />;
      case 'Allocated':
        return <FaCheck className="text-orange-500" title="Allocated" />;
      case 'None':
        return <FaMinus className="text-gray-300" title="No Relationship" />;
      default:
        return <FaQuestion className="text-gray-400" title="Unknown" />;
    }
  };

  // Helper to get coverage indicator
  const getCoverageIndicator = (coverage?: number) => {
    if (!coverage) return null;
    
    let bgColor = 'bg-gray-200';
    if (coverage >= 90) bgColor = 'bg-green-500';
    else if (coverage >= 70) bgColor = 'bg-green-400';
    else if (coverage >= 50) bgColor = 'bg-yellow-400';
    else if (coverage >= 30) bgColor = 'bg-orange-400';
    else bgColor = 'bg-red-400';
    
    return (
      <div className="w-full h-1 bg-gray-200 mt-1">
        <div 
          className={`h-full ${bgColor}`} 
          style={{ width: `${coverage}%` }}
          title={`${coverage}% coverage`}
        ></div>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md" style={{ maxWidth: 'calc(100vw - 245px)' }}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Traceability Matrix</h2>
        <div className="flex space-x-2">
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm flex items-center">
            <FaDownload className="mr-2" /> Export
          </button>
        </div>
      </div>

      {/* Filters and Toggle Controls */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-grow min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by ID or name..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="absolute left-3 top-2.5 text-gray-400">
                <FaSearch />
              </span>
            </div>
          </div>

          <div className="w-full md:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">Source Type</label>
            <select
              className="border border-gray-300 rounded-lg p-2 min-w-[150px]"
              value={sourceTypeFilter || ''}
              onChange={(e) => setSourceTypeFilter(e.target.value === '' ? null : e.target.value)}
            >
              <option value="">All Source Types</option>
              <option value="System">System Requirements</option>
              <option value="Functional">Functional Requirements</option>
            </select>
          </div>

          <div className="w-full md:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Type</label>
            <select
              className="border border-gray-300 rounded-lg p-2 min-w-[150px]"
              value={targetTypeFilter || ''}
              onChange={(e) => setTargetTypeFilter(e.target.value === '' ? null : e.target.value)}
            >
              <option value="">All Target Types</option>
              <option value="System">System Requirements</option>
              <option value="Functional">Functional Requirements</option>
              <option value="Test">Test Cases</option>
              <option value="Design">Design Components</option>
            </select>
          </div>

          <div className="w-full md:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
            <select
              className="border border-gray-300 rounded-lg p-2 min-w-[150px]"
              value={relationshipFilter || ''}
              onChange={(e) => setRelationshipFilter(e.target.value === '' ? null : e.target.value as RelationshipType)}
            >
              <option value="">All Relationships</option>
              <option value="Satisfies">Satisfies</option>
              <option value="Implements">Implements</option>
              <option value="Verifies">Verifies</option>
              <option value="Allocated">Allocated</option>
              <option value="None">None</option>
            </select>
          </div>

          <div className="w-full md:w-auto flex items-end">
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center h-10"
              onClick={() => {
                setSearchTerm('');
                setSourceTypeFilter(null);
                setTargetTypeFilter(null);
                setRelationshipFilter(null);
              }}
            >
              <FaFilter className="mr-2" /> Reset Filters
            </button>
          </div>
        </div>

        {/* Toggle Visibility of Column Types */}
        <div className="flex flex-wrap gap-4 bg-gray-50 p-4 rounded-lg">
          <div className="text-sm font-medium text-gray-700 mr-4">Show Columns:</div>
          
          <label className="inline-flex items-center">
            <input 
              type="checkbox" 
              checked={showSystemReqs} 
              onChange={(e) => setShowSystemReqs(e.target.checked)}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span className="ml-2 text-sm text-gray-700">System Requirements</span>
          </label>
          
          <label className="inline-flex items-center">
            <input 
              type="checkbox" 
              checked={showFunctionalReqs} 
              onChange={(e) => setShowFunctionalReqs(e.target.checked)}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span className="ml-2 text-sm text-gray-700">Functional Requirements</span>
          </label>
          
          <label className="inline-flex items-center">
            <input 
              type="checkbox" 
              checked={showTestCases} 
              onChange={(e) => setShowTestCases(e.target.checked)}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span className="ml-2 text-sm text-gray-700">Test Cases</span>
          </label>
          
          <label className="inline-flex items-center">
            <input 
              type="checkbox" 
              checked={showDesignComponents} 
              onChange={(e) => setShowDesignComponents(e.target.checked)}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span className="ml-2 text-sm text-gray-700">Design Components</span>
          </label>
          
          <div className="ml-auto">
            <label className="inline-flex items-center">
              <input 
                type="checkbox" 
                checked={showEmptyRelationships} 
                onChange={(e) => setShowEmptyRelationships(e.target.checked)}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-sm text-gray-700">Show Empty Relationships</span>
            </label>
          </div>
        </div>
      </div>

      {/* Traceability Matrix */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 table-fixed">
          <thead className="bg-gray-50">
            <tr>
              {/* First column - empty corner */}
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100 sticky left-0 z-10 w-40">
                Source / Target
              </th>
              
              {/* Column headers - target items */}
              {visibleColumns.map(column => (
                <th 
                  key={column.id} 
                  className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]"
                  title={column.title}
                >
                  <div className="truncate max-w-[120px]">{column.id}</div>
                  <div className="text-xxs text-gray-400 truncate max-w-[120px]">{column.type}</div>
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRows.map(row => (
              <tr key={row.id} className="hover:bg-gray-50">
                {/* First column - row label (source item) */}
                <td className="px-3 py-4 text-sm font-medium text-gray-900 bg-gray-50 sticky left-0 z-10">
                  <div className="font-medium">{row.id}</div>
                  <div className="text-xs text-gray-500 truncate max-w-[180px]" title={row.title}>
                    {row.title}
                  </div>
                  <div className="text-xxs text-gray-400">{row.type}</div>
                </td>
                
                {/* Matrix cells */}
                {visibleColumns.map(column => {
                  const cell = row.cells[column.id] || { relationshipType: 'None' };
                  // Skip rendering the cell if it's the same item (e.g., a requirement traced to itself)
                  if (row.id === column.id) {
                    return (
                      <td key={`${row.id}-${column.id}`} className="px-3 py-4 text-center bg-gray-100">
                        <div className="text-xxs text-gray-400">Self</div>
                      </td>
                    );
                  }
                  
                  return (
                    <td 
                      key={`${row.id}-${column.id}`} 
                      className={`px-3 py-4 text-center ${cell.relationshipType !== 'None' ? 'hover:bg-blue-50 cursor-pointer' : ''}`}
                    >
                      <div className="flex flex-col items-center">
                        {getRelationshipIndicator(cell.relationshipType)}
                        {cell.relationshipType !== 'None' && getCoverageIndicator(cell.coverage)}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredRows.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No relationships match your search criteria</p>
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <div className="text-sm font-medium mb-3">Relationship Types:</div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="flex items-center">
            <FaCheck className="text-green-500 mr-2" /> 
            <span className="text-sm">Satisfies</span>
          </div>
          <div className="flex items-center">
            <FaCheck className="text-blue-500 mr-2" /> 
            <span className="text-sm">Implements</span>
          </div>
          <div className="flex items-center">
            <FaCheck className="text-purple-500 mr-2" /> 
            <span className="text-sm">Verifies</span>
          </div>
          <div className="flex items-center">
            <FaCheck className="text-orange-500 mr-2" /> 
            <span className="text-sm">Allocated</span>
          </div>
          <div className="flex items-center">
            <FaMinus className="text-gray-300 mr-2" /> 
            <span className="text-sm">No Relationship</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraceabilityMatrix; 