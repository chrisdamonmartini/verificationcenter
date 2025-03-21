import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';

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
  isFixed?: boolean; // New prop to control fixed vs relative positioning
  children?: React.ReactNode; // Add children prop
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
  renderThreadContent,
  isFixed = false, // Default to relative positioning
  children
}) => {
  // State to manage height for resizing
  const [panelHeight, setPanelHeight] = useState(height);

  // Function to handle resizing panel
  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const startY = e.clientY;
    const startHeight = parseInt(panelHeight.replace('h-', ''), 10);
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaY = startY - moveEvent.clientY;
      const newHeight = Math.max(64, startHeight + Math.floor(deltaY / 4));
      setPanelHeight(`h-${newHeight}`);
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Determine styles based on position and positioning type
  const containerStyles = isFixed 
    ? (position === 'bottom'
        ? `fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-300 transition-all duration-300 ease-in-out ${
            showDigitalThread ? panelHeight : 'h-10'
          } z-40`
        : `fixed top-0 bottom-0 right-0 bg-white shadow-lg border-l border-gray-300 transition-all duration-300 ease-in-out ${
            showDigitalThread ? width : 'w-10'
          } z-40`)
    : (position === 'bottom'
        ? `relative bg-white shadow-lg border border-gray-300 mt-4 transition-all duration-300 ease-in-out ${
            showDigitalThread ? panelHeight : 'h-10'
          }`
        : `relative bg-white shadow-lg border border-gray-300 transition-all duration-300 ease-in-out ${
            showDigitalThread ? width : 'w-10'
          }`);
  
  const headerStyles = 'flex items-center justify-between px-4 py-2 bg-gray-100 cursor-pointer border-b';
  
  return (
    <div className={`${showDigitalThread ? 'block' : 'hidden'} ${isFixed ? 'fixed' : 'relative'} ${position === 'bottom' ? 'bottom-0 left-0 right-0' : 'top-0 right-0 bottom-0'} bg-white border-t border-gray-200 shadow-lg z-50`}>
      {/* Drag handle for resizing */}
      <div 
        className="absolute top-0 left-0 right-0 h-2 bg-gray-200 cursor-ns-resize flex justify-center items-center"
        onMouseDown={handleResizeStart}
      >
        <div className="w-16 h-1 bg-gray-400 rounded-full"></div>
      </div>
      
      {/* Any additional children */}
      {children}
      
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="text-lg font-medium">{title}</h3>
        <button
          onClick={() => setShowDigitalThread(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <FaTimes />
        </button>
      </div>
      
      <div className={`${panelHeight} ${width} overflow-auto p-4`}>
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