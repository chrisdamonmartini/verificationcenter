import React from 'react';
import * as FaIcons from 'react-icons/fa';

// Interface for Digital Thread items
export interface DigitalThreadItem {
  id: string;
  name: string;
  type: 'Requirement' | 'Function' | 'CAD' | 'Simulation' | 'BOM' | 'Test' | 'Analysis';
  status: 'Current' | 'Modified' | 'New' | 'Deprecated';
  lastModified: string;
  modifiedBy: string;
  linkedItems: string[];
  dueDate?: string;
  description?: string;
}

// Props for the DigitalThreadPanel component
export interface DigitalThreadPanelProps {
  showDigitalThread: boolean;
  setShowDigitalThread: (show: boolean) => void;
  selectedItem: any | null;
  recentChanges: {[id: string]: boolean};
  position?: 'bottom' | 'right';
  height?: string;
  width?: string;
  title?: string;
  renderThreadContent: () => React.ReactNode;
}

// Reusable Digital Thread Panel Component
const DigitalThreadPanel: React.FC<DigitalThreadPanelProps> = ({
  showDigitalThread,
  setShowDigitalThread,
  selectedItem,
  recentChanges,
  position = 'bottom',
  height = 'h-96',
  width = 'w-full',
  title = 'Digital Thread Visualization',
  renderThreadContent
}) => {
  // Determine styles based on position
  const containerStyles = position === 'bottom'
    ? `fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-300 transition-all duration-300 ease-in-out ${
        showDigitalThread ? height : 'h-10'
      } z-40`
    : `fixed top-0 bottom-0 right-0 bg-white shadow-lg border-l border-gray-300 transition-all duration-300 ease-in-out ${
        showDigitalThread ? width : 'w-10'
      } z-40`;
  
  const headerStyles = position === 'bottom'
    ? 'flex items-center justify-between px-4 py-2 bg-gray-100 cursor-pointer border-b'
    : 'flex items-center justify-between px-4 py-2 bg-gray-100 cursor-pointer border-b h-10';
  
  return (
    <div className={containerStyles}>
      <div 
        className={headerStyles}
        onClick={() => setShowDigitalThread(!showDigitalThread)}
      >
        <div className="flex items-center">
          <FaIcons.FaProjectDiagram className="mr-2 text-blue-600" />
          <h3 className="font-medium">{title}</h3>
          {Object.keys(recentChanges).length > 0 && (
            <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
              {Object.keys(recentChanges).length} Recent Changes
            </span>
          )}
        </div>
        <div>
          {position === 'bottom' 
            ? (showDigitalThread ? <FaIcons.FaChevronDown /> : <FaIcons.FaChevronUp />)
            : (showDigitalThread ? <FaIcons.FaChevronLeft /> : <FaIcons.FaChevronRight />)
          }
        </div>
      </div>
      
      {showDigitalThread && (
        <div className="p-4 h-full overflow-auto">
          <div className="flex flex-col h-full">
            {selectedItem ? (
              renderThreadContent()
            ) : (
              <div className="text-center py-8">
                <FaIcons.FaProjectDiagram className="mx-auto text-gray-400 text-5xl mb-4" />
                <p className="text-gray-600">Select an item to view its Digital Thread</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Function to get the right icon for thread item types
export const getThreadItemIcon = (type: string) => {
  switch (type) {
    case 'Requirement':
      return <FaIcons.FaFileAlt className="text-blue-600" />;
    case 'Function':
      return <FaIcons.FaProjectDiagram className="text-green-600" />;
    case 'CAD':
      return <FaIcons.FaDrawPolygon className="text-purple-600" />;
    case 'Simulation':
      return <FaIcons.FaChartLine className="text-orange-600" />;
    case 'BOM':
      return <FaIcons.FaListAlt className="text-indigo-600" />;
    case 'Test':
      return <FaIcons.FaVial className="text-red-600" />;
    case 'Analysis':
      return <FaIcons.FaChartBar className="text-yellow-600" />;
    default:
      return <FaIcons.FaFile className="text-gray-600" />;
  }
};

// Function to get badge color for thread item status
export const getThreadStatusColor = (status: string) => {
  switch (status) {
    case 'Current':
      return 'bg-green-100 text-green-800';
    case 'Modified':
      return 'bg-yellow-100 text-yellow-800';
    case 'New':
      return 'bg-blue-100 text-blue-800';
    case 'Deprecated':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default DigitalThreadPanel; 