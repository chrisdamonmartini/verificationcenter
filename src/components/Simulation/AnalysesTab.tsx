import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';
import DigitalThreadPanel from '../Digital/DigitalThreadPanel';
import DigitalThreadContent from '../Digital/DigitalThreadContent';
import { 
  EnhancedAnalysisItem, 
  DigitalThreadItem, 
  mockAnalysisItems, 
  mockDigitalThreadItems,
  mockRecentChanges,
  getAnalysisStatusBadgeColor
} from '../../Mocked Up Data/analysesData';

interface AnalysesTabProps {
  // Add any props needed
}

const AnalysesTab: React.FC<AnalysesTabProps> = () => {
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All Statuses');
  
  // Sorting state
  const [sortField, setSortField] = useState<string>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Digital Thread panel state
  const [analysesShowDigitalThread, setAnalysesShowDigitalThread] = useState(false);
  const [analysesSelectedAnalysis, setAnalysesSelectedAnalysis] = useState<EnhancedAnalysisItem | null>(null);
  
  // Expanded row state
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  
  // Load and prepare data
  const [enhancedAnalysisItems, setEnhancedAnalysisItems] = useState<EnhancedAnalysisItem[]>([]);
  const [digitalThreadItems, setDigitalThreadItems] = useState<DigitalThreadItem[]>([]);
  const [recentChanges, setRecentChanges] = useState<{[id: string]: boolean}>({});
  
  useEffect(() => {
    // Initialize with mock data
    setEnhancedAnalysisItems(mockAnalysisItems);
    setDigitalThreadItems(mockDigitalThreadItems);
    setRecentChanges(mockRecentChanges);
    
    // Link digital thread items to analysis items
    setEnhancedAnalysisItems(prevItems => {
      return prevItems.map(item => {
        const linkedItems = digitalThreadItems.filter(threadItem => 
          threadItem.linkedItems.includes(item.id)
        );
        return {
          ...item,
          linkedThreadItems: linkedItems
        };
      });
    });
  }, []);

  // Filtered analysis items based on search and status filter
  const filteredAnalysisItems = enhancedAnalysisItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All Statuses' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Function to handle the toggle for row expansion
  const toggleRowExpansion = (id: string) => {
    if (expandedRowId === id) {
      setExpandedRowId(null);
    } else {
      setExpandedRowId(id);
    }
  };

  // Function to handle digital thread viewing
  const handleViewDigitalThread = (analysis: EnhancedAnalysisItem) => {
    setAnalysesSelectedAnalysis(analysis);
    setAnalysesShowDigitalThread(true);
  };

  // Function to handle sorting
  const handleSort = (field: string) => {
    if (sortField === field) {
      // Toggle direction if clicking the same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Function to get sorted analyses
  const getSortedAnalyses = () => {
    return [...filteredAnalysisItems].sort((a, b) => {
      let aValue: any = a[sortField as keyof EnhancedAnalysisItem];
      let bValue: any = b[sortField as keyof EnhancedAnalysisItem];
      
      // Handle string comparison
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  };

  // Function to render the Digital Thread content
  const renderAnalysesDigitalThread = () => {
    if (!analysesSelectedAnalysis) return null;
    
    return (
      <DigitalThreadContent
        selectedItem={analysesSelectedAnalysis}
        digitalThreadItems={digitalThreadItems}
        recentChanges={recentChanges}
        onClose={() => setAnalysesSelectedAnalysis(null)}
      />
    );
  };

  // Function to render the table with sortable headers
  const renderAnalysesTable = (): JSX.Element => {
    const sortedAnalyses = getSortedAnalyses();
    
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('id')}
              >
                <div className="flex items-center">
                  ID
                  {sortField === 'id' && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center">
                  NAME
                  {sortField === 'name' && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center">
                  STATUS
                  {sortField === 'status' && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('completionPercentage')}
              >
                <div className="flex items-center">
                  PROGRESS
                  {sortField === 'completionPercentage' && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('type')}
              >
                <div className="flex items-center">
                  TYPE
                  {sortField === 'type' && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('dueDate')}
              >
                <div className="flex items-center">
                  DUE DATE
                  {sortField === 'dueDate' && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('assignedTo')}
              >
                <div className="flex items-center">
                  ASSIGNED TO
                  {sortField === 'assignedTo' && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('lastRun')}
              >
                <div className="flex items-center">
                  LAST RUN
                  {sortField === 'lastRun' && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedAnalyses.map(analysis => (
              <React.Fragment key={analysis.id}>
                <tr className={expandedRowId === analysis.id ? 'bg-blue-50' : 'hover:bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    <Link to={`/analysis/${analysis.id}`}>{analysis.id}</Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{analysis.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getAnalysisStatusBadgeColor(analysis.status)}`}>
                      {analysis.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          analysis.status === 'Completed' ? 'bg-green-600' : 
                          analysis.status === 'Failed' ? 'bg-red-600' : 
                          'bg-blue-600'
                        }`} 
                        style={{ width: `${analysis.completionPercentage}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 text-right">{analysis.completionPercentage}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                      {analysis.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{analysis.dueDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{analysis.assignedTo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{analysis.lastRun}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => toggleRowExpansion(analysis.id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        {expandedRowId === analysis.id ? <FaIcons.FaChevronUp /> : <FaIcons.FaChevronDown />}
                      </button>
                      <button 
                        onClick={() => handleViewDigitalThread(analysis)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <BsIcons.BsDiagram3 />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <FaIcons.FaPlay />
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedRowId === analysis.id && (
                  <tr>
                    <td colSpan={9} className="px-6 py-4 bg-blue-50">
                      <div className="text-sm text-gray-700">
                        <h4 className="font-medium mb-2">Description</h4>
                        <p className="mb-4">{analysis.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h5 className="font-medium mb-1">Scenarios</h5>
                            <ul className="list-disc list-inside">
                              {analysis.scenarios.map((scenario, idx) => (
                                <li key={idx} className="text-gray-600">{scenario}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium mb-1">Functions</h5>
                            <ul className="list-disc list-inside">
                              {analysis.functions.map((func, idx) => (
                                <li key={idx} className="text-gray-600">{func}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium mb-1">CAD Models</h5>
                            <ul className="list-disc list-inside">
                              {analysis.cad.map((cad, idx) => (
                                <li key={idx} className="text-gray-600">{cad}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="relative px-3 py-2">
      {/* Simplified stats and search in one row */}
      <div className="flex items-center mb-3">
        <div className="flex space-x-4 text-sm">
          <div className="flex items-center">
            <span className="font-medium mr-1">Total:</span>
            <span className="text-blue-600 font-bold">{enhancedAnalysisItems.length}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium mr-1">Completed:</span>
            <span className="text-green-600 font-bold">{enhancedAnalysisItems.filter(item => item.status === 'Completed').length}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium mr-1">In Progress:</span>
            <span className="text-yellow-600 font-bold">{enhancedAnalysisItems.filter(item => item.status === 'In Progress').length}</span>
          </div>
        </div>
        
        <div className="flex-grow mx-4">
          <input
            type="text"
            placeholder="Search analyses..."
            className="w-full border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div>
          <select
            className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All Statuses">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Analysis Table */}
      <div className="mb-4">
        {renderAnalysesTable()}
      </div>
      
      {/* Digital Thread Panel with integrated resize functionality */}
      <div className="sticky bottom-0 z-10 w-full">
        <DigitalThreadPanel
          showDigitalThread={analysesShowDigitalThread}
          setShowDigitalThread={setAnalysesShowDigitalThread}
          selectedItem={analysesSelectedAnalysis}
          recentChanges={recentChanges}
          renderThreadContent={renderAnalysesDigitalThread}
          position="bottom"
          title="Analysis Digital Thread"
          isFixed={false}
        />
      </div>
    </div>
  );
};

export default AnalysesTab; 