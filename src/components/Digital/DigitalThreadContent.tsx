import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import { EnhancedAnalysisItem, DigitalThreadItem } from '../../Mocked Up Data/analysesData';

interface DigitalThreadContentProps {
  selectedItem: EnhancedAnalysisItem | null;
  digitalThreadItems: DigitalThreadItem[];
  recentChanges: { [id: string]: boolean };
  onClose?: () => void;
}

const DigitalThreadContent: React.FC<DigitalThreadContentProps> = ({
  selectedItem,
  digitalThreadItems,
  recentChanges,
  onClose
}) => {
  // State for visibility toggles
  const [visibilityToggles, setVisibilityToggles] = useState({
    mission: true,
    requirements: true,
    functions: true,
    logical: true,
    cad: true,
    ebom: true,
    simulationModels: true,
    automations: true
  });

  // Function to toggle visibility of digital thread elements
  const toggleVisibility = (elementType: keyof typeof visibilityToggles) => {
    setVisibilityToggles(prev => ({
      ...prev,
      [elementType]: !prev[elementType]
    }));
  };

  // Function to check if an item was modified within the last 8 weeks
  const wasModifiedRecently = (lastModified: string): boolean => {
    const modifiedDate = new Date(lastModified);
    const eightWeeksAgo = new Date();
    eightWeeksAgo.setDate(eightWeeksAgo.getDate() - 56); // 8 weeks * 7 days
    return modifiedDate >= eightWeeksAgo;
  };

  // Function to get color based on modification time
  const getModificationColor = (lastModified: string): string => {
    if (wasModifiedRecently(lastModified)) {
      return 'bg-yellow-100 border-yellow-400'; // Highlight for recent changes
    }
    return ''; // Default styling
  };

  if (!selectedItem) return null;

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-semibold">{selectedItem.name} - Digital Thread</h3>
        {onClose && (
          <button 
            className="text-blue-600 hover:text-blue-800"
            onClick={onClose}
          >
            <FaIcons.FaTimes />
          </button>
        )}
      </div>

      {/* Legend for visibility toggles */}
      <div className="flex flex-wrap gap-2 mb-4 p-2 bg-gray-50 rounded">
        <div className="text-sm font-medium mr-2">Toggle Visibility:</div>
        <button 
          className={`px-2 py-1 text-xs rounded ${visibilityToggles.mission ? 'bg-gray-100 text-gray-800' : 'bg-gray-200 text-gray-600'}`}
          onClick={() => toggleVisibility('mission')}
        >
          Mission
        </button>
        <button 
          className={`px-2 py-1 text-xs rounded ${visibilityToggles.requirements ? 'bg-blue-100 text-blue-800' : 'bg-gray-200 text-gray-600'}`}
          onClick={() => toggleVisibility('requirements')}
        >
          Requirements
        </button>
        <button 
          className={`px-2 py-1 text-xs rounded ${visibilityToggles.functions ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'}`}
          onClick={() => toggleVisibility('functions')}
        >
          Functions
        </button>
        <button 
          className={`px-2 py-1 text-xs rounded ${visibilityToggles.logical ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-200 text-gray-600'}`}
          onClick={() => toggleVisibility('logical')}
        >
          Logical
        </button>
        <button 
          className={`px-2 py-1 text-xs rounded ${visibilityToggles.cad ? 'bg-purple-100 text-purple-800' : 'bg-gray-200 text-gray-600'}`}
          onClick={() => toggleVisibility('cad')}
        >
          CAD
        </button>
        <button 
          className={`px-2 py-1 text-xs rounded ${visibilityToggles.ebom ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-200 text-gray-600'}`}
          onClick={() => toggleVisibility('ebom')}
        >
          EBOM
        </button>
        <button 
          className={`px-2 py-1 text-xs rounded ${visibilityToggles.simulationModels ? 'bg-orange-100 text-orange-800' : 'bg-gray-200 text-gray-600'}`}
          onClick={() => toggleVisibility('simulationModels')}
        >
          Models
        </button>
        <button 
          className={`px-2 py-1 text-xs rounded ${visibilityToggles.automations ? 'bg-red-100 text-red-800' : 'bg-gray-200 text-gray-600'}`}
          onClick={() => toggleVisibility('automations')}
        >
          Automation
        </button>
        
        {/* Recent changes legend */}
        <div className="ml-4 flex items-center">
          <div className="w-3 h-3 bg-yellow-100 border border-yellow-400 rounded mr-1"></div>
          <span className="text-xs">Changed in last 8 weeks</span>
        </div>
      </div>
      
      {/* Digital Thread content - horizontal scrollable layout */}
      <div className="overflow-x-auto">
        <div className="flex space-x-2 min-w-max">
          {/* Mission Column */}
          {visibilityToggles.mission && (
            <div className="w-48 flex-shrink-0 border rounded-lg overflow-hidden">
              <div className="mb-2 font-medium text-center p-2 bg-gray-100 rounded-t-lg">Mission</div>
              <div className="space-y-2 p-2">
                <div className="p-2 border rounded bg-gray-50">
                  <div className="font-medium">Mission Statement</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Develop and validate aircraft components that meet safety and performance requirements.
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Requirements Column */}
          {visibilityToggles.requirements && (
            <div className="w-48 flex-shrink-0 border rounded-lg overflow-hidden">
              <div className="mb-2 font-medium text-center p-2 bg-blue-100 rounded-t-lg">Requirements</div>
              <div className="space-y-2 p-2">
                {selectedItem.requirements.map(reqId => {
                  const item = digitalThreadItems.find(item => item.id === reqId) || {
                    id: reqId,
                    name: `Requirement ${reqId}`,
                    type: 'Requirement',
                    status: 'Current',
                    lastModified: '2023-04-01',
                    modifiedBy: 'System',
                    linkedItems: [selectedItem.id]
                  };
                  
                  const isRecentlyChanged = recentChanges[reqId];
                  const modificationClass = wasModifiedRecently(item.lastModified) ? getModificationColor(item.lastModified) : '';
                  
                  return (
                    <div 
                      key={reqId} 
                      className={`p-2 border rounded ${isRecentlyChanged ? 'border-blue-500' : 'border-gray-200'} ${modificationClass}`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="font-medium">{item.id}</div>
                        <div className={`text-xs px-1.5 py-0.5 rounded ${
                          item.status === 'Current' ? 'bg-green-100 text-green-800' : 
                          item.status === 'Modified' ? 'bg-yellow-100 text-yellow-800' :
                          item.status === 'New' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {item.status}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">{item.name}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Last modified: {item.lastModified} by {item.modifiedBy}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* Functions Column */}
          {visibilityToggles.functions && (
            <div className="w-48 flex-shrink-0 border rounded-lg overflow-hidden">
              <div className="mb-2 font-medium text-center p-2 bg-green-100 rounded-t-lg">Functions</div>
              <div className="space-y-2 p-2">
                {selectedItem.functions.map((funcName, index) => {
                  const funcId = `FUNC-${index + 1}`;
                  const isRecentlyChanged = recentChanges[funcId];
                  const lastModified = isRecentlyChanged ? '2023-05-01' : '2023-01-15';
                  const modificationClass = wasModifiedRecently(lastModified) ? getModificationColor(lastModified) : '';
                  
                  return (
                    <div 
                      key={funcId} 
                      className={`p-2 border rounded ${isRecentlyChanged ? 'border-green-500' : 'border-gray-200'} ${modificationClass}`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="font-medium">{funcId}</div>
                        <div className="text-xs px-1.5 py-0.5 rounded bg-green-100 text-green-800">
                          Active
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">{funcName}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Last modified: {lastModified} by {isRecentlyChanged ? 'John Smith' : 'Emily Johnson'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* Logical Column */}
          {visibilityToggles.logical && (
            <div className="w-48 flex-shrink-0 border rounded-lg overflow-hidden">
              <div className="mb-2 font-medium text-center p-2 bg-yellow-100 rounded-t-lg">Logical</div>
              <div className="space-y-2 p-2">
                <div className="p-2 border rounded bg-gray-50">
                  <div className="font-medium">LOG-001</div>
                  <div className="text-sm text-gray-600">System Architecture</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Last modified: 2023-03-15 by System Architect
                  </div>
                </div>
                <div className="p-2 border rounded bg-gray-50">
                  <div className="font-medium">LOG-002</div>
                  <div className="text-sm text-gray-600">Control Flow</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Last modified: 2023-02-20 by System Engineer
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* CAD Column */}
          {visibilityToggles.cad && (
            <div className="w-48 flex-shrink-0 border rounded-lg overflow-hidden">
              <div className="mb-2 font-medium text-center p-2 bg-purple-100 rounded-t-lg">CAD</div>
              <div className="space-y-2 p-2">
                {selectedItem.cad.map((cadName, index) => {
                  const cadId = `CAD-${index + 1}`;
                  const isRecentlyChanged = recentChanges[cadId];
                  const lastModified = isRecentlyChanged ? '2023-05-03' : '2023-02-10';
                  const modificationClass = wasModifiedRecently(lastModified) ? getModificationColor(lastModified) : '';
                  
                  return (
                    <div 
                      key={cadId} 
                      className={`p-2 border rounded ${isRecentlyChanged ? 'border-purple-500' : 'border-gray-200'} ${modificationClass}`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="font-medium">{cadId}</div>
                        <div className="text-xs px-1.5 py-0.5 rounded bg-purple-100 text-purple-800">
                          {isRecentlyChanged ? 'Updated' : 'Released'}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">{cadName}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Last modified: {lastModified} by {isRecentlyChanged ? 'Michael Chen' : 'Sarah Williams'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* EBOM Column */}
          {visibilityToggles.ebom && (
            <div className="w-48 flex-shrink-0 border rounded-lg overflow-hidden">
              <div className="mb-2 font-medium text-center p-2 bg-indigo-100 rounded-t-lg">EBOM</div>
              <div className="space-y-2 p-2">
                {selectedItem.bom.map((bomName, index) => {
                  const bomId = `BOM-${index + 1}`;
                  const isRecentlyChanged = recentChanges[bomId];
                  const lastModified = isRecentlyChanged ? '2023-04-28' : '2023-03-15';
                  const modificationClass = wasModifiedRecently(lastModified) ? getModificationColor(lastModified) : '';
                  
                  return (
                    <div 
                      key={bomId} 
                      className={`p-2 border rounded ${isRecentlyChanged ? 'border-indigo-500' : 'border-gray-200'} ${modificationClass}`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="font-medium">{bomId}</div>
                        <div className="text-xs px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800">
                          {isRecentlyChanged ? 'Updated' : 'Released'}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">{bomName}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Last modified: {lastModified} by {isRecentlyChanged ? 'Robert Johnson' : 'Lisa Chen'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* Models Column */}
          {visibilityToggles.simulationModels && (
            <div className="w-48 flex-shrink-0 border rounded-lg overflow-hidden">
              <div className="mb-2 font-medium text-center p-2 bg-orange-100 rounded-t-lg">Models</div>
              <div className="space-y-2 p-2">
                {selectedItem.simulationModels.map(simId => {
                  const isRecentlyChanged = recentChanges[simId];
                  
                  const simulationModel = {
                    id: simId,
                    name: `Simulation Model ${simId.split('-')[1]}`,
                    version: isRecentlyChanged ? 'v2.1' : 'v1.5',
                    status: isRecentlyChanged ? 'Active' : 'In Development',
                    lastModified: isRecentlyChanged ? '2023-05-05' : '2023-01-20'
                  };
                  
                  const modificationClass = wasModifiedRecently(simulationModel.lastModified) ? getModificationColor(simulationModel.lastModified) : '';
                  
                  return (
                    <div 
                      key={simId} 
                      className={`p-2 border rounded ${isRecentlyChanged ? 'border-orange-500' : 'border-gray-200'} ${modificationClass}`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="font-medium">{simId}</div>
                        <div className="text-xs px-1.5 py-0.5 rounded bg-orange-100 text-orange-800">
                          {simulationModel.status}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">{simulationModel.name} ({simulationModel.version})</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Last modified: {simulationModel.lastModified} by {isRecentlyChanged ? 'David Kim' : 'Jennifer Lopez'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* Automation Column */}
          {visibilityToggles.automations && (
            <div className="w-48 flex-shrink-0 border rounded-lg overflow-hidden">
              <div className="mb-2 font-medium text-center p-2 bg-red-100 rounded-t-lg">Automation</div>
              <div className="space-y-2 p-2">
                {selectedItem.automations.map(autoId => {
                  const isRecentlyChanged = recentChanges[autoId];
                  
                  const automation = {
                    id: autoId,
                    name: `Automation Workflow ${autoId.split('-')[1]}`,
                    status: isRecentlyChanged ? 'Running' : 'Completed',
                    lastModified: isRecentlyChanged ? '2023-05-07' : '2023-02-25'
                  };
                  
                  const modificationClass = wasModifiedRecently(automation.lastModified) ? getModificationColor(automation.lastModified) : '';
                  
                  return (
                    <div 
                      key={autoId} 
                      className={`p-2 border rounded ${isRecentlyChanged ? 'border-red-500' : 'border-gray-200'} ${modificationClass}`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="font-medium">{autoId}</div>
                        <div className={`text-xs px-1.5 py-0.5 rounded ${
                          automation.status === 'Running' ? 'bg-blue-100 text-blue-800' : 
                          automation.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          automation.status === 'Failed' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {automation.status}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">{automation.name}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Last modified: {automation.lastModified} by {isRecentlyChanged ? 'Alex Thompson' : 'Maria Garcia'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DigitalThreadContent; 