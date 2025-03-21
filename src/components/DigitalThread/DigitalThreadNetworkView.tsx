import React, { useState, useEffect, useRef } from 'react';
import * as FaIcons from 'react-icons/fa';

// Interface for node positions
interface NodePosition {
  id: string;
  x: number;
  y: number;
  fx?: number | null;
  fy?: number | null;
}

// Types from DigitalThread component
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

type NetworkViewItem = DigitalThreadItemBase & {
  x?: number;
  y?: number;
};

interface DigitalThreadNetworkViewProps {
  items: NetworkViewItem[];
  selectedItem: string | null;
  onSelectItem: (id: string | null) => void;
  getColorForType: (type: DigitalThreadItemType) => string;
  getStatusBadgeStyle: (status: string) => string;
  getItemById: (id: string) => NetworkViewItem | undefined;
}

const DigitalThreadNetworkView: React.FC<DigitalThreadNetworkViewProps> = ({
  items,
  selectedItem,
  onSelectItem,
  getColorForType,
  getStatusBadgeStyle,
  getItemById
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [viewBox, setViewBox] = useState<string>("0 0 1000 600");
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [nodePositions, setNodePositions] = useState<Map<string, NodePosition>>(new Map());
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState<{ x: number, y: number } | null>(null);
  const [tooltip, setTooltip] = useState<{ id: string, x: number, y: number } | null>(null);
  
  // Calculate initial positions for nodes by type
  useEffect(() => {
    const positions = new Map<string, NodePosition>();
    
    // Define type order for horizontal layout
    const typeOrder: DigitalThreadItemType[] = [
      'Scenario', 'Requirement', 'Function', 'Logical', 'CAD', 'BOM', 'Simulation', 'Test', 'Result'
    ];
    
    // Group items by type
    const itemsByType = items.reduce((acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = [];
      }
      acc[item.type].push(item);
      return acc;
    }, {} as Record<DigitalThreadItemType, NetworkViewItem[]>);
    
    // Calculate positions
    const svgWidth = 1000;
    const svgHeight = 600;
    const padding = 50;
    const columnWidth = (svgWidth - padding * 2) / (typeOrder.length - 1);
    
    typeOrder.forEach((type, typeIndex) => {
      const itemsOfType = itemsByType[type] || [];
      const columnHeight = Math.min(svgHeight - padding * 2, itemsOfType.length * 60);
      const itemSpacing = itemsOfType.length <= 1 ? 0 : columnHeight / (itemsOfType.length - 1);
      
      itemsOfType.forEach((item, itemIndex) => {
        const x = padding + typeIndex * columnWidth;
        const y = padding + (itemsOfType.length <= 1 ? columnHeight / 2 : itemIndex * itemSpacing);
        
        positions.set(item.id, { id: item.id, x, y });
      });
    });
    
    setNodePositions(positions);
  }, [items]);
  
  // Handle zooming with mouse wheel
  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.max(0.5, Math.min(3, zoom * delta));
    
    // Adjust the zoom around the cursor position
    if (svgRef.current) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const mouseX = e.clientX - svgRect.left;
      const mouseY = e.clientY - svgRect.top;
      
      const viewBoxValues = viewBox.split(' ').map(Number);
      const svgWidth = viewBoxValues[2];
      const svgHeight = viewBoxValues[3];
      
      const mouseViewBoxX = viewBoxValues[0] + mouseX * (svgWidth / svgRect.width);
      const mouseViewBoxY = viewBoxValues[1] + mouseY * (svgHeight / svgRect.height);
      
      const newWidth = svgWidth / newZoom;
      const newHeight = svgHeight / newZoom;
      
      const newX = mouseViewBoxX - (mouseX / svgRect.width) * newWidth;
      const newY = mouseViewBoxY - (mouseY / svgRect.height) * newHeight;
      
      setViewBox(`${newX} ${newY} ${newWidth} ${newHeight}`);
      setZoom(newZoom);
    }
  };
  
  // Handle panning when dragging the SVG (not a node)
  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (e.target === e.currentTarget) {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isDragging && dragStart) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      
      if (svgRef.current) {
        const svgRect = svgRef.current.getBoundingClientRect();
        const viewBoxValues = viewBox.split(' ').map(Number);
        
        const svgWidth = viewBoxValues[2];
        const svgHeight = viewBoxValues[3];
        
        const dxViewBox = dx * (svgWidth / svgRect.width);
        const dyViewBox = dy * (svgHeight / svgRect.height);
        
        const newX = viewBoxValues[0] - dxViewBox;
        const newY = viewBoxValues[1] - dyViewBox;
        
        setViewBox(`${newX} ${newY} ${svgWidth} ${svgHeight}`);
        setDragStart({ x: e.clientX, y: e.clientY });
      }
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
    setDragStart(null);
  };
  
  // Handle node dragging
  const handleNodeMouseDown = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    setDraggedNode(nodeId);
    setIsDragging(true);
    
    const node = nodePositions.get(nodeId);
    if (node) {
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };
  
  const handleNodeMouseMove = (e: React.MouseEvent) => {
    if (isDragging && draggedNode && dragStart) {
      const node = nodePositions.get(draggedNode);
      if (node) {
        const svgRect = svgRef.current?.getBoundingClientRect();
        if (svgRect) {
          const viewBoxValues = viewBox.split(' ').map(Number);
          const svgWidth = viewBoxValues[2];
          const svgHeight = viewBoxValues[3];
          
          const dx = e.clientX - dragStart.x;
          const dy = e.clientY - dragStart.y;
          
          const dxViewBox = dx * (svgWidth / svgRect.width);
          const dyViewBox = dy * (svgHeight / svgRect.height);
          
          const newPositions = new Map(nodePositions);
          newPositions.set(draggedNode, {
            ...node,
            x: node.x + dxViewBox,
            y: node.y + dyViewBox
          });
          
          setNodePositions(newPositions);
          setDragStart({ x: e.clientX, y: e.clientY });
        }
      }
    }
  };
  
  const handleNodeMouseUp = () => {
    setIsDragging(false);
    setDraggedNode(null);
    setDragStart(null);
  };
  
  // Show tooltip when hovering over a node
  const handleNodeMouseEnter = (e: React.MouseEvent, nodeId: string) => {
    const item = getItemById(nodeId);
    if (item) {
      const { left, top } = (e.target as SVGElement).getBoundingClientRect();
      setTooltip({ id: nodeId, x: left, y: top - 10 });
    }
  };
  
  const handleNodeMouseLeave = () => {
    setTooltip(null);
  };
  
  // Reset view
  const resetView = () => {
    setZoom(1);
    setViewBox("0 0 1000 600");
    setPan({ x: 0, y: 0 });
  };
  
  // Find connected nodes for highlighting
  const getConnectedNodes = (nodeId: string): Set<string> => {
    const connectedNodes = new Set<string>([nodeId]);
    
    items.forEach(item => {
      if (item.id === nodeId) {
        // Add all linked items
        item.linkedItems.forEach(linkedId => connectedNodes.add(linkedId));
      } else if (item.linkedItems.includes(nodeId)) {
        // Add items that link to this node
        connectedNodes.add(item.id);
      }
    });
    
    return connectedNodes;
  };
  
  // Generate links between nodes
  const generateLinks = () => {
    const links: { source: string; target: string; color: string }[] = [];
    
    items.forEach(item => {
      item.linkedItems.forEach(targetId => {
        const target = getItemById(targetId);
        if (target) {
          const isHighlighted = selectedItem && 
            (selectedItem === item.id || selectedItem === targetId);
          
          links.push({
            source: item.id,
            target: targetId,
            color: isHighlighted ? '#ff9800' : 
                   item.status === 'Modified' || target.status === 'Modified' ? 
                   '#f39c12' : '#aaaaaa'
          });
        }
      });
    });
    
    return links;
  };
  
  // Calculate a path for a link between nodes
  const getLinkPath = (sourceId: string, targetId: string): string => {
    const source = nodePositions.get(sourceId);
    const target = nodePositions.get(targetId);
    
    if (!source || !target) return '';
    
    // Simple curved path
    const dx = target.x - source.x;
    const dy = target.y - source.y;
    const dr = Math.sqrt(dx * dx + dy * dy) * 1.5;
    
    return `M${source.x},${source.y}A${dr},${dr} 0 0,1 ${target.x},${target.y}`;
  };
  
  // Determine if a node should be highlighted
  const isNodeHighlighted = (nodeId: string): boolean => {
    if (!selectedItem) return false;
    
    const connectedNodes = getConnectedNodes(selectedItem);
    return connectedNodes.has(nodeId);
  };
  
  // Get node opacity based on selection state
  const getNodeOpacity = (nodeId: string): number => {
    if (!selectedItem) return 1;
    return isNodeHighlighted(nodeId) ? 1 : 0.3;
  };
  
  // Get link opacity based on selection state
  const getLinkOpacity = (sourceId: string, targetId: string): number => {
    if (!selectedItem) return 0.6;
    
    const isSourceHighlighted = isNodeHighlighted(sourceId);
    const isTargetHighlighted = isNodeHighlighted(targetId);
    
    return isSourceHighlighted && isTargetHighlighted ? 1 : 0.1;
  };
  
  // Render the tooltip
  const renderTooltip = () => {
    if (!tooltip) return null;
    
    const item = getItemById(tooltip.id);
    if (!item) return null;
    
    return (
      <div 
        className="absolute bg-white p-3 rounded-lg shadow-lg border border-gray-200 z-50 max-w-xs"
        style={{ left: tooltip.x + 20, top: tooltip.y - 20 }}
      >
        <h3 className="font-medium">{item.name}</h3>
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>{item.id}</span>
          <span className={getStatusBadgeStyle(item.status)}>{item.status}</span>
        </div>
        <p className="text-xs text-gray-600 mt-1">{item.description.substring(0, 100)}{item.description.length > 100 ? '...' : ''}</p>
        <div className="mt-2 text-xs text-gray-500">
          <div>Modified: {item.lastModified}</div>
          <div>Version: {item.version}</div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="relative">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {['Scenario', 'Requirement', 'Function', 'Logical', 'CAD', 'BOM', 'Simulation', 'Test', 'Result'].map(type => (
            <div key={type} className="flex items-center">
              <span 
                className="w-3 h-3 rounded-full mr-1" 
                style={{ backgroundColor: getColorForType(type as DigitalThreadItemType) }}
              ></span>
              <span className="text-xs">{type}</span>
            </div>
          ))}
        </div>
        
        <div className="flex space-x-2">
          <button 
            className="px-3 py-1 rounded-lg bg-blue-100 text-blue-800"
            onClick={resetView}
          >
            <FaIcons.FaCompressArrowsAlt className="inline mr-1" />
            Reset View
          </button>
          <div className="px-3 py-1 text-gray-600 bg-gray-50 rounded-lg flex items-center">
            <FaIcons.FaSearch className="mr-1" />
            <span className="text-sm">{Math.round(zoom * 100)}%</span>
          </div>
        </div>
      </div>
      
      <div className="border rounded-lg bg-white">
        <svg 
          ref={svgRef}
          className="w-full h-[600px]"
          viewBox={viewBox}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={e => {
            handleMouseMove(e);
            handleNodeMouseMove(e);
          }}
          onMouseUp={() => {
            handleMouseUp();
            handleNodeMouseUp();
          }}
          onMouseLeave={() => {
            handleMouseUp();
            handleNodeMouseUp();
          }}
          onClick={e => {
            if (e.target === e.currentTarget) {
              onSelectItem(null);
            }
          }}
        >
          {/* Draw links */}
          <g className="links">
            {generateLinks().map(({ source, target, color }) => (
              <path
                key={`${source}-${target}`}
                d={getLinkPath(source, target)}
                stroke={color}
                strokeWidth={selectedItem === source || selectedItem === target ? 2 : 1}
                strokeOpacity={getLinkOpacity(source, target)}
                fill="none"
                markerEnd="url(#arrowhead)"
              />
            ))}
          </g>
          
          {/* Draw nodes */}
          <g className="nodes">
            {Array.from(nodePositions.entries()).map(([id, position]) => {
              const item = getItemById(id);
              if (!item) return null;
              
              const isHighlighted = selectedItem === id;
              const isConnected = selectedItem ? isNodeHighlighted(id) : false;
              const radius = item.status === 'Modified' ? 12 : 10;
              
              return (
                <g 
                  key={id}
                  transform={`translate(${position.x}, ${position.y})`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectItem(selectedItem === id ? null : id);
                  }}
                  onMouseDown={(e) => handleNodeMouseDown(e, id)}
                  onMouseEnter={(e) => handleNodeMouseEnter(e, id)}
                  onMouseLeave={handleNodeMouseLeave}
                  style={{ cursor: 'pointer' }}
                  opacity={getNodeOpacity(id)}
                >
                  <circle
                    r={radius}
                    fill={getColorForType(item.type)}
                    stroke={isHighlighted ? '#fff' : '#ddd'}
                    strokeWidth={isHighlighted ? 2 : 1}
                  />
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#fff"
                    fontSize="10px"
                  >
                    {item.type.substring(0, 1)}
                  </text>
                  <text
                    textAnchor="middle"
                    dominantBaseline="hanging"
                    y={radius + 5}
                    fill="#333"
                    fontSize="8px"
                  >
                    {item.id}
                  </text>
                </g>
              );
            })}
          </g>
          
          {/* Arrow marker definition */}
          <defs>
            <marker
              id="arrowhead"
              viewBox="0 -5 10 10"
              refX="15"
              refY="0"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0,-5L10,0L0,5" fill="#999" />
            </marker>
          </defs>
        </svg>
      </div>
      
      {renderTooltip()}
      
      <div className="mt-4 bg-blue-50 p-3 rounded-lg text-sm text-blue-800">
        <FaIcons.FaInfoCircle className="inline mr-2" />
        <span className="font-medium">Interactive Network:</span> Drag nodes to reposition them. Click on a node to highlight
        its connections. Use mouse wheel to zoom and drag the background to pan.
      </div>
    </div>
  );
};

export default DigitalThreadNetworkView; 