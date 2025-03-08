import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import NetworkView from './NetworkView';
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

const SimpleDigitalThread: React.FC = () => {
  const [items, setItems] = useState<DigitalThreadItemBase[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('network');
  
  // Load mock data
  useEffect(() => {
    setItems(generateMockData());
  }, []);
  
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
      children: (
        <NetworkView 
          items={items}
          selectedItem={selectedItem}
          onSelectItem={handleSelectItem}
          getColorForType={getColorForType}
          getStatusBadgeStyle={getStatusBadgeStyle}
          getItemById={getItemById}
        />
      ),
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
      <h1 className="text-2xl font-medium mb-6">Digital Thread Visualization</h1>
      
      <Tabs 
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        className="digital-thread-tabs"
      />
    </div>
  );
};

export default SimpleDigitalThread; 