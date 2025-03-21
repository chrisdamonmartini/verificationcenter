import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import DigitalThreadNetworkView from './DigitalThreadNetworkView';
import { Select, Checkbox, Button, Divider } from 'antd';
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';
import * as AiIcons from 'react-icons/ai';

// Define types
type DigitalThreadItemType = 'Scenario' | 'Requirement' | 'Function' | 'Logical' | 'CAD' | 'BOM' | 'Simulation' | 'Test' | 'Result';

interface DigitalThreadItemBase {
  id: string;
  name: string;
  type: DigitalThreadItemType;
  status: 'Current' | 'Modified' | 'New' | 'Deprecated';
  lastModified: string;
  modifiedBy: string;
  description: string;
  linkedItems: string[];
  version: string;
}

// Generate mock data for different item types
const generateMockData = (): DigitalThreadItemBase[] => {
  const items: DigitalThreadItemBase[] = [];
  
  // Scenarios
  items.push({
    id: 'SCN-1001',
    name: 'High-Speed Pursuit Scenario',
    type: 'Scenario',
    status: 'Current',
    lastModified: '2023-06-15',
    modifiedBy: 'J. Smith',
    description: 'Fighter jet intercepting a high-speed target at altitude.',
    linkedItems: ['REQ-2001', 'REQ-2002', 'REQ-2003'],
    version: '1.2'
  });
  
  // Requirements
  items.push({
    id: 'REQ-2001',
    name: 'Target Acquisition Time',
    type: 'Requirement',
    status: 'Modified',
    lastModified: '2023-07-10',
    modifiedBy: 'T. Johnson',
    description: 'System shall acquire target within 2.5 seconds under all weather conditions.',
    linkedItems: ['FUN-3001', 'FUN-3002'],
    version: '2.1'
  });
  
  items.push({
    id: 'REQ-2002',
    name: 'Tracking Accuracy',
    type: 'Requirement',
    status: 'Current',
    lastModified: '2023-05-22',
    modifiedBy: 'A. Miller',
    description: 'System shall maintain tracking accuracy of +/- 1m at 50km range.',
    linkedItems: ['FUN-3003'],
    version: '1.0'
  });
  
  items.push({
    id: 'REQ-2003',
    name: 'Engagement Range',
    type: 'Requirement',
    status: 'New',
    lastModified: '2023-08-01',
    modifiedBy: 'R. Williams',
    description: 'System shall engage targets at ranges up to 100km.',
    linkedItems: ['FUN-3004'],
    version: '1.0'
  });
  
  // Functions
  items.push({
    id: 'FUN-3001',
    name: 'Radar Signal Processing',
    type: 'Function',
    status: 'Current',
    lastModified: '2023-04-12',
    modifiedBy: 'C. Davis',
    description: 'Process radar returns to identify target characteristics.',
    linkedItems: ['LOG-4001'],
    version: '3.2'
  });
  
  items.push({
    id: 'FUN-3002',
    name: 'Target Classification',
    type: 'Function',
    status: 'Modified',
    lastModified: '2023-07-18',
    modifiedBy: 'M. Wilson',
    description: 'Classify targets based on signature analysis.',
    linkedItems: ['LOG-4002'],
    version: '2.3'
  });
  
  // Logical Elements
  items.push({
    id: 'LOG-4001',
    name: 'Signal Processor Unit',
    type: 'Logical',
    status: 'Current',
    lastModified: '2023-02-10',
    modifiedBy: 'D. Thomas',
    description: 'Logical component for processing radar signals.',
    linkedItems: ['CAD-5001'],
    version: '2.5'
  });
  
  // CAD Models
  items.push({
    id: 'CAD-5001',
    name: 'Processor Board Layout',
    type: 'CAD',
    status: 'Current',
    lastModified: '2023-01-20',
    modifiedBy: 'N. Harris',
    description: 'PCB layout for signal processor board.',
    linkedItems: ['BOM-6001'],
    version: '4.0'
  });
  
  // BOM Items
  items.push({
    id: 'BOM-6001',
    name: 'Signal Processor Components',
    type: 'BOM',
    status: 'Current',
    lastModified: '2023-01-30',
    modifiedBy: 'S. Martinez',
    description: 'Bill of materials for signal processor board.',
    linkedItems: ['SIM-7001'],
    version: '2.1'
  });
  
  // Simulations
  items.push({
    id: 'SIM-7001',
    name: 'Signal Processing Performance',
    type: 'Simulation',
    status: 'Current',
    lastModified: '2023-04-25',
    modifiedBy: 'J. Lee',
    description: 'Simulation of signal processing performance under various conditions.',
    linkedItems: ['TST-8001'],
    version: '3.5'
  });
  
  // Tests
  items.push({
    id: 'TST-8001',
    name: 'Signal Processing Unit Test',
    type: 'Test',
    status: 'Current',
    lastModified: '2023-05-15',
    modifiedBy: 'R. Allen',
    description: 'Laboratory testing of signal processing unit performance.',
    linkedItems: ['RES-9001'],
    version: '2.0'
  });
  
  // Results
  items.push({
    id: 'RES-9001',
    name: 'Signal Processing Results',
    type: 'Result',
    status: 'Current',
    lastModified: '2023-05-30',
    modifiedBy: 'T. Green',
    description: 'Test results for signal processing performance.',
    linkedItems: [],
    version: '1.5'
  });
  
  return items;
};

const DigitalThread: React.FC = () => {
  const [items, setItems] = useState<DigitalThreadItemBase[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [viewType, setViewType] = useState<string>('network');
  const [timeframeFilter, setTimeframeFilter] = useState<string>('all');
  const [typeFilters, setTypeFilters] = useState<string[]>([
    'Scenario', 'Requirement', 'Function', 'Logical', 'CAD', 'BOM', 'Simulation', 'Test', 'Result'
  ]);
  const [statusFilters, setStatusFilters] = useState<string[]>([
    'Current', 'Modified', 'New', 'Deprecated'
  ]);
  
  // Load mock data
  useEffect(() => {
    setItems(generateMockData());
  }, []);
  
  // Filter items based on selected filters
  const filteredItems = items.filter(item => {
    // Filter by type
    if (!typeFilters.includes(item.type)) return false;
    
    // Filter by status
    if (!statusFilters.includes(item.status)) return false;
    
    // Filter by timeframe
    if (timeframeFilter !== 'all') {
      const itemDate = new Date(item.lastModified);
      const today = new Date();
      const daysDiff = Math.floor((today.getTime() - itemDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (timeframeFilter === 'last7' && daysDiff > 7) return false;
      if (timeframeFilter === 'last30' && daysDiff > 30) return false;
      if (timeframeFilter === 'last90' && daysDiff > 90) return false;
    }
    
    return true;
  });
  
  // Get color for type
  const getColorForType = (type: DigitalThreadItemType): string => {
    const colorMap: Record<DigitalThreadItemType, string> = {
      'Scenario': '#1890ff',
      'Requirement': '#13c2c2',
      'Function': '#52c41a',
      'Logical': '#faad14',
      'CAD': '#fa8c16',
      'BOM': '#fa541c',
      'Simulation': '#722ed1',
      'Test': '#eb2f96',
      'Result': '#f5222d'
    };
    
    return colorMap[type] || '#1890ff';
  };
  
  // Get status badge style
  const getStatusBadgeStyle = (status: string): string => {
    const statusMap: Record<string, string> = {
      'Current': 'bg-green-100 text-green-800 px-2 py-0.5 rounded-full',
      'Modified': 'bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full',
      'New': 'bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full',
      'Deprecated': 'bg-red-100 text-red-800 px-2 py-0.5 rounded-full'
    };
    
    return statusMap[status] || '';
  };
  
  // Get item by ID
  const getItemById = (id: string): DigitalThreadItemBase | undefined => {
    return items.find(item => item.id === id);
  };
  
  // Select an item
  const handleSelectItem = (id: string | null) => {
    setSelectedItem(id);
  };
  
  // Render the detail panel for a selected item
  const renderDetailPanel = () => {
    if (!selectedItem) return null;
    
    const item = getItemById(selectedItem);
    if (!item) return null;
    
    // Get linked items
    const linkedItems = item.linkedItems.map(id => getItemById(id)).filter(Boolean) as DigitalThreadItemBase[];
    
    return (
      <div className="border rounded-lg bg-white p-4 mt-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-medium">{item.name}</h2>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <span className="mr-3">{item.id}</span>
              <span className={getStatusBadgeStyle(item.status)}>{item.status}</span>
            </div>
          </div>
          <Button type="text" onClick={() => setSelectedItem(null)}>✕</Button>
        </div>
        
        <div className="mt-4">
          <p className="text-gray-700">{item.description}</p>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <p className="text-sm text-gray-500">Type</p>
            <p className="font-medium">{item.type}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Version</p>
            <p className="font-medium">{item.version}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Modified</p>
            <p className="font-medium">{item.lastModified} by {item.modifiedBy}</p>
          </div>
        </div>
        
        <Divider />
        
        <div>
          <h3 className="font-medium mb-2">Linked Items</h3>
          <div className="space-y-2">
            {linkedItems.length === 0 ? (
              <p className="text-gray-500 text-sm">No linked items</p>
            ) : (
              linkedItems.map(linkedItem => (
                <div 
                  key={linkedItem.id} 
                  className="flex items-center justify-between p-2 border rounded hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedItem(linkedItem.id)}
                >
                  <div>
                    <div className="flex items-center">
                      <span 
                        className="w-2 h-2 rounded-full mr-2"
                        style={{ backgroundColor: getColorForType(linkedItem.type) }}
                      ></span>
                      <span className="font-medium">{linkedItem.name}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <span className="mr-2">{linkedItem.id}</span>
                      <span className={getStatusBadgeStyle(linkedItem.status)}>{linkedItem.status}</span>
                    </div>
                  </div>
                  <span>→</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  };
  
  // Render the Flow View
  const renderFlowView = () => {
    return (
      <div className="p-4">
        <div className="bg-white rounded-lg border p-8 text-center">
          <div className="flex flex-col items-center">
            <BiIcons.BiNetworkChart className="text-6xl text-blue-500 mb-4" />
            <h2 className="text-2xl font-medium mb-2">Flow View</h2>
            <p className="text-gray-600 max-w-xl">
              This view displays elements in a horizontal flow from left to right, showing the progression
              through the development lifecycle from scenarios to test results.
            </p>
            
            <div className="mt-8 w-full">
              <div className="flex justify-between">
                {['Scenario', 'Requirement', 'Function', 'Logical', 'CAD', 'BOM', 'Simulation', 'Test', 'Result'].map((type, index) => (
                  <div key={type} className="flex flex-col items-center">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                      style={{ backgroundColor: getColorForType(type as DigitalThreadItemType) }}
                    >
                      {type.substring(0, 1)}
                    </div>
                    <div className="text-xs mt-2">{type}</div>
                    {index < 8 && (
                      <div className="w-20 h-0.5 bg-gray-300 absolute" style={{ marginLeft: '50px' }}></div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-16 grid grid-cols-9 gap-4">
                {['Scenario', 'Requirement', 'Function', 'Logical', 'CAD', 'BOM', 'Simulation', 'Test', 'Result'].map((type) => (
                  <div key={type} className="flex flex-col items-center">
                    {items
                      .filter(item => item.type === type)
                      .map(item => (
                        <div 
                          key={item.id}
                          className="mb-2 p-2 border rounded-lg text-xs w-full cursor-pointer hover:bg-gray-50"
                          onClick={() => handleSelectItem(item.id)}
                        >
                          <div className="font-medium truncate">{item.name}</div>
                          <div className="text-gray-500 truncate">{item.id}</div>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Render the Timeline View
  const renderTimelineView = () => {
    // Sort items by lastModified date
    const sortedItems = [...items].sort((a, b) => 
      new Date(a.lastModified).getTime() - new Date(b.lastModified).getTime()
    );
    
    return (
      <div className="p-4">
        <div className="bg-white rounded-lg border p-8">
          <div className="flex items-center mb-6">
            <AiIcons.AiOutlineClockCircle className="text-3xl text-blue-500 mr-4" />
            <h2 className="text-2xl font-medium">Timeline View</h2>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 z-0"></div>
            
            {/* Timeline items */}
            <div className="space-y-8 relative z-10">
              {sortedItems.map((item, index) => (
                <div key={item.id} className="flex">
                  <div 
                    className="w-4 h-4 rounded-full mt-1.5 ml-6 z-10"
                    style={{ backgroundColor: getColorForType(item.type) }}
                  ></div>
                  <div className="ml-6">
                    <div className="text-xs text-gray-500">{item.lastModified}</div>
                    <div className="font-medium flex items-center">
                      <span 
                        className="w-2 h-2 rounded-full mr-2"
                        style={{ backgroundColor: getColorForType(item.type) }}
                      ></span>
                      {item.name}
                      <span className="ml-2 text-xs text-gray-500">{item.id}</span>
                    </div>
                    <div className="text-sm mt-1">{item.description.substring(0, 80)}...</div>
                    <div className="text-xs text-gray-500 mt-1">Modified by {item.modifiedBy}</div>
                    
                    {item.status === 'Modified' && (
                      <div className="mt-2 bg-yellow-50 p-2 rounded-lg border border-yellow-200">
                        <div className="text-xs text-yellow-700 font-medium">Modified</div>
                        <div className="text-xs text-yellow-600">
                          Changes to this element may impact connected elements.
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Render the Network View
  const renderNetworkView = () => {
    return (
      <div>
        <div className="flex space-x-6">
          <div className="w-1/5">
            <div className="border rounded-lg bg-white p-4 mb-4">
              <h3 className="font-medium mb-3">Filter by Type</h3>
              <div className="space-y-2">
                {['Scenario', 'Requirement', 'Function', 'Logical', 'CAD', 'BOM', 'Simulation', 'Test', 'Result'].map(type => (
                  <div key={type} className="flex items-center">
                    <Checkbox
                      checked={typeFilters.includes(type)}
                      onChange={e => {
                        if (e.target.checked) {
                          setTypeFilters([...typeFilters, type]);
                        } else {
                          setTypeFilters(typeFilters.filter(t => t !== type));
                        }
                      }}
                    >
                      <div className="flex items-center">
                        <span 
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: getColorForType(type as DigitalThreadItemType) }}
                        ></span>
                        <span>{type}</span>
                      </div>
                    </Checkbox>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border rounded-lg bg-white p-4">
              <h3 className="font-medium mb-3">Filter by Status</h3>
              <div className="space-y-2">
                {['Current', 'Modified', 'New', 'Deprecated'].map(status => (
                  <div key={status} className="flex items-center">
                    <Checkbox
                      checked={statusFilters.includes(status)}
                      onChange={e => {
                        if (e.target.checked) {
                          setStatusFilters([...statusFilters, status]);
                        } else {
                          setStatusFilters(statusFilters.filter(s => s !== status));
                        }
                      }}
                    >
                      <span className={getStatusBadgeStyle(status)}>{status}</span>
                    </Checkbox>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="w-4/5">
            <DigitalThreadNetworkView 
              items={filteredItems}
              selectedItem={selectedItem}
              onSelectItem={handleSelectItem}
              getColorForType={getColorForType}
              getStatusBadgeStyle={getStatusBadgeStyle}
              getItemById={getItemById}
            />
            
            {renderDetailPanel()}
          </div>
        </div>
      </div>
    );
  };
  
  // Tab configuration
  const tabItems = [
    {
      key: 'network',
      label: (
        <span className="flex items-center">
          <FaIcons.FaProjectDiagram className="mr-2" />
          Network View
        </span>
      ),
      children: renderNetworkView(),
    },
    {
      key: 'flow',
      label: (
        <span className="flex items-center">
          <BiIcons.BiNetworkChart className="mr-2" />
          Flow View
        </span>
      ),
      children: renderFlowView(),
    },
    {
      key: 'timeline',
      label: (
        <span className="flex items-center">
          <AiIcons.AiOutlineClockCircle className="mr-2" />
          Timeline View
        </span>
      ),
      children: renderTimelineView(),
    },
  ];
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium">Digital Thread</h1>
        
        <div className="flex space-x-4">
          <Select
            placeholder="Timeframe"
            style={{ width: 140 }}
            value={timeframeFilter}
            onChange={value => setTimeframeFilter(value)}
          >
            <Select.Option value="all">All Time</Select.Option>
            <Select.Option value="last7">Last 7 Days</Select.Option>
            <Select.Option value="last30">Last 30 Days</Select.Option>
            <Select.Option value="last90">Last 90 Days</Select.Option>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="border rounded-lg bg-white p-4">
          <div className="mb-2">
            <h3 className="font-medium">Elements</h3>
          </div>
          <div className="text-3xl font-bold">{filteredItems.length}</div>
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>{items.filter(item => item.status === 'Modified').length} Modified</span>
            <span>{items.filter(item => item.status === 'New').length} New</span>
          </div>
        </div>
        
        <div className="border rounded-lg bg-white p-4">
          <div className="mb-2">
            <h3 className="font-medium">Connections</h3>
          </div>
          <div className="text-3xl font-bold">
            {items.reduce((sum, item) => sum + item.linkedItems.length, 0)}
          </div>
          <div className="mt-2 text-sm text-gray-500">
            <span>Avg: {(items.reduce((sum, item) => sum + item.linkedItems.length, 0) / items.length).toFixed(1)} per element</span>
          </div>
        </div>
        
        <div className="border rounded-lg bg-white p-4">
          <div className="mb-2">
            <h3 className="font-medium">Changes</h3>
          </div>
          <div className="text-3xl font-bold">
            {items.filter(item => item.status === 'Modified' || item.status === 'New').length}
          </div>
          <div className="mt-2 text-sm text-gray-500">
            <span>Last update: {new Date(Math.max(...items.map(item => new Date(item.lastModified).getTime()))).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      
      <Tabs 
        activeKey={viewType}
        onChange={setViewType}
        items={tabItems}
        className="digital-thread-tabs"
      />
      
      <div className="mt-6 bg-blue-50 p-4 rounded-lg text-sm">
        <div>
          <p className="text-blue-800 font-medium">About Digital Thread View</p>
          <p className="text-blue-700 mt-1">
            This visualization shows the connections between different elements in the product development lifecycle.
            Elements are organized by type from left to right showing the progression from initial scenarios and requirements
            through to test results. You can click on any element to see its details and connections.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DigitalThread; 