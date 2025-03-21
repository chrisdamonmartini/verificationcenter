import React from 'react';

// Define DigitalThreadItemType
type DigitalThreadItemType = 'Scenario' | 'Requirement' | 'Function' | 'Logical' | 'CAD' | 'BOM' | 'Simulation' | 'Test' | 'Result';

// Define the base item interface
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

// Define types for props
interface SimpleNetworkViewProps {
  items: DigitalThreadItemBase[];
  selectedItem: string | null;
  onSelectItem: (id: string | null) => void;
  getColorForType: (type: DigitalThreadItemType) => string;
  getStatusBadgeStyle: (status: string) => string;
  getItemById: (id: string) => DigitalThreadItemBase | undefined;
}

// Simple NetworkView component for testing imports
const SimpleNetworkView: React.FC<SimpleNetworkViewProps> = (props) => {
  return (
    <div className="p-4 border rounded-lg bg-white">
      <h2 className="text-lg font-medium mb-4">Network View (Simple Version)</h2>
      <p>This is a simplified network view component for testing imports.</p>
      <div className="mt-4">
        <p>Items count: {props.items.length}</p>
        <p>Selected item: {props.selectedItem || 'None'}</p>
      </div>
    </div>
  );
};

export default SimpleNetworkView; 