import React, { useState } from 'react';
import { Card, Row, Col, Badge, Typography, Tooltip, Empty, Switch, Space, Tag, Table, Button } from 'antd';
import { ClockCircleOutlined, CheckCircleOutlined, ExclamationCircleOutlined, ExpandOutlined, PlusOutlined, LinkOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import useColors from '../../hooks/useColors';

const { Text } = Typography;

// Define types for the related items
export interface RelatedItem {
  id: string;
  title: string;
  description?: string;
  status: 'Current' | 'Active' | 'Modified' | 'Released' | 'In Development' | 'Deprecated' | 'Archived' | 'Updated' | 'Completed';
  date: string;
  author: string;
}

export interface MissionItem extends RelatedItem {
  objective: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface RequirementItem extends RelatedItem {
  type: 'System' | 'Functional' | 'Performance' | 'Interface';
  verification: 'Test' | 'Analysis' | 'Inspection' | 'Demonstration';
}

export interface FunctionItem extends RelatedItem {
  category: string;
  inputs: string[];
  outputs: string[];
}

export interface LogicalItem extends RelatedItem {
  category: 'Block' | 'Interface';
  implementedFunctions?: string[];
}

export interface CADItem extends RelatedItem {
  partNumber: string;
  revision: string;
  maturity: 'Preliminary' | 'Released' | 'In Review';
}

export interface EBOMItem extends RelatedItem {
  partNumber: string;
  quantity: number;
  supplier?: string;
}

export interface ModelItem extends RelatedItem {
  type: 'Simulation' | 'CAD' | 'Analysis';
  format: string;
  version: string;
}

export interface AutomationItem extends RelatedItem {
  type: 'Workflow' | 'Script';
  language?: string;
  lastRun?: string;
}

// Add new ParameterItem interface
export interface ParameterItem extends RelatedItem {
  value?: string;
  unit?: string;
  range?: string;
}

export interface RelatedItemsPanelProps {
  mission?: MissionItem[];
  requirements?: RequirementItem[];
  functions?: FunctionItem[];
  logical?: LogicalItem[];
  cad?: CADItem[];
  ebom?: EBOMItem[];
  models?: ModelItem[];
  automation?: AutomationItem[];
  parameters?: ParameterItem[];
  defaultActiveTab?: string;
  onItemClick?: (item: RelatedItem, type: string) => void;
  showFilter?: boolean;
  currentItem?: RelatedItem;
  currentItemType?: string;
  onCreateRelationship?: (categoryKey: string) => void;
}

interface CategoryConfig {
  name: string;
  key: string;
  color: string;
  bgcolor: string;
  active: boolean;
  items: any[];
}

const RelatedItemsPanel: React.FC<RelatedItemsPanelProps> = ({
  mission = [],
  requirements = [],
  functions = [],
  logical = [],
  cad = [],
  ebom = [],
  models = [],
  automation = [],
  parameters = [],
  defaultActiveTab,
  onItemClick,
  showFilter = true,
  currentItem,
  currentItemType,
  onCreateRelationship,
}) => {
  const colors = useColors();
  // State for showing all categories (including empty ones)
  const [showAllCategories, setShowAllCategories] = useState(false);
  // State for highlighting changed items
  const [highlightChanges, setHighlightChanges] = useState(false);
  // State for full screen mode
  const [isFullScreen, setIsFullScreen] = useState(false);
  // Always show all items, keep the state for backward compatibility
  const [showAll] = useState(true);
  const [activeCategories, setActiveCategories] = useState<Record<string, boolean>>({
    mission: true,
    requirements: true,
    functions: true,
    logical: true,
    cad: true,
    ebom: true,
    models: true,
    automation: true,
    parameters: true,
    operationalScenario: true,
  });

  // Filter items if showAll is false (only show Current items)
  const filterItems = (items: RelatedItem[]) => {
    if (showAll) return items;
    return items.filter(item => item.status === 'Current' || item.status === 'Active' || item.status === 'Released');
  };

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    return dayjs(dateString).format('MMM DD, YYYY');
  };

  // Render status badge/tag with appropriate color
  const renderStatusTag = (status: string) => {
    // Don't show Current status tags
    if (status === 'Current') {
      return null;
    }
    
    let color;
    
    switch (status) {
      case 'Active':
      case 'Released':
      case 'Completed':
        color = colors.status.minor;
        break;
      case 'Modified':
      case 'In Development':
      case 'Updated':
        color = colors.status.major;
        break;
      case 'Deprecated':
      case 'Archived':
        color = colors.chart.textSecondary;
        break;
      default:
        color = colors.status.critical;
    }
    
    return (
      <Tag 
        style={{ 
          backgroundColor: `${color}15`, 
          color: color, 
          borderColor: color 
        }}
      >
        {status}
      </Tag>
    );
  };

  // Empty state
  const renderEmpty = () => (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No related items" style={{ margin: '20px 0' }} />
  );

  // Define category configs with styling - now ordered as required
  const categoryConfigs = [
    {
      name: 'Mission',
      key: 'mission',
      color: colors.category.mission,
      bgcolor: `${colors.category.mission}10`,
      active: activeCategories.mission,
      items: filterItems(mission)
    },
    {
      name: 'Operational Scenario',
      key: 'operationalScenario',
      color: colors.category.mission || colors.chart.series3,
      bgcolor: `${colors.category.mission || colors.chart.series3}10`,
      active: activeCategories.operationalScenario,
      items: []
    },
    {
      name: 'Requirements',
      key: 'requirements',
      color: colors.category.requirements,
      bgcolor: `${colors.category.requirements}10`,
      active: activeCategories.requirements,
      items: filterItems(requirements)
    },
    {
      name: 'Parameters',
      key: 'parameters',
      color: colors.category.parameter || colors.chart.series5,
      bgcolor: `${colors.category.parameter || colors.chart.series5}10`,
      active: activeCategories.parameters,
      items: filterItems(parameters)
    },
    {
      name: 'Functions',
      key: 'functions',
      color: colors.category.functions,
      bgcolor: `${colors.category.functions}10`,
      active: activeCategories.functions,
      items: filterItems(functions)
    },
    {
      name: 'Logical',
      key: 'logical',
      color: colors.chart.series4,
      bgcolor: `${colors.chart.series4}10`,
      active: activeCategories.logical,
      items: filterItems(logical)
    },
    {
      name: 'CAD',
      key: 'cad',
      color: colors.category.cad,
      bgcolor: `${colors.category.cad}10`,
      active: activeCategories.cad,
      items: filterItems(cad)
    },
    {
      name: 'EBOM',
      key: 'ebom',
      color: colors.category.bom,
      bgcolor: `${colors.category.bom}10`,
      active: activeCategories.ebom,
      items: filterItems(ebom)
    },
    {
      name: 'Models',
      key: 'models',
      color: colors.chart.series7,
      bgcolor: `${colors.chart.series7}10`,
      active: activeCategories.models,
      items: filterItems(models)
    },
    {
      name: 'Automation',
      key: 'automation',
      color: colors.chart.series8,
      bgcolor: `${colors.chart.series8}10`,
      active: activeCategories.automation,
      items: filterItems(automation)
    }
  ];
  
  // Get the current item category key in a normalized form for comparison
  const getNormalizedCurrentKey = () => {
    if (!currentItemType) return null;
    
    // The currentItemType should already be normalized by the ExpandedRowComponents
    // Just log it and return it directly
    console.log("RelatedItemsPanel - Using category key:", currentItemType);
    console.log("RelatedItemsPanel - Available category keys:", categoryConfigs.map(c => c.key).join(', '));
    
    return currentItemType;
  };
  
  const normalizedCurrentKey = getNormalizedCurrentKey();
  
  // Always show all categories
  const categories = categoryConfigs.map(category => {
    // Is this the category of the current expanded item?
    const isCurrentCategory = normalizedCurrentKey === category.key;
    console.log(`Category ${category.key} - is current? ${isCurrentCategory}`);
    
    // Rule 1: If it is the category of the item that we are expanded on
    if (isCurrentCategory) {
      console.log(`Highlighting category ${category.key} in orange`);
      return {
        ...category,
        color: colors.category.parameter, // Orange theme for the category of expanded item
        bgcolor: `${colors.category.parameter}10` // Light fill
      };
    } 
    // Rule 2: If it has related objects
    else if (category.items.length > 0) {
      return {
        ...category,
        color: colors.brand.primary, // Darker blue theme for categories with objects
        bgcolor: `${colors.brand.primary}10` // Light fill
      };
    } 
    // Rule 3: If it doesn't have any related objects
    else {
      return {
        ...category,
        color: colors.text.secondary, // Neutral theme
        bgcolor: colors.background.paper
      };
    }
  });

  // Filter categories based on the showAllCategories state
  const filteredCategories = showAllCategories 
    ? categories 
    : categories.filter(category => 
        category.items.length > 0 || normalizedCurrentKey === category.key
      );

  // Add current item to categories if it exists and is not already included
  if (currentItem && currentItemType) {
    const categoryKey = currentItemType.toLowerCase();
    const categoryIndex = categories.findIndex(cat => cat.key === categoryKey);
    
    if (categoryIndex !== -1) {
      // Check if current item already exists in the category
      const exists = categories[categoryIndex].items.some(item => item.id === currentItem.id);
      
      if (!exists) {
        // Add the current item to the beginning of the appropriate category
        categories[categoryIndex].items = [currentItem, ...categories[categoryIndex].items];
      }
    }
  }

  // Render the "Create Relationship" button for empty categories
  const renderCreateRelationshipButton = (categoryKey: string, categoryColor: string) => {
    return (
      <Button 
        type="dashed" 
        icon={<LinkOutlined />} 
        style={{ 
          width: '100%', 
          marginTop: '8px',
          borderColor: categoryColor,
          color: categoryColor
        }}
        onClick={() => onCreateRelationship && onCreateRelationship(categoryKey)}
      >
        Create Relationship
      </Button>
    );
  };

  // Render expanded item summary - for the category we're expanded on
  const renderExpandedItemSummary = (item: RelatedItem, categoryColor: string) => {
    return (
      <Card
        key={item.id}
        size="small"
        style={{
          backgroundColor: '#FFFFFF',
          boxShadow: `0 0 8px ${categoryColor}80`,
          width: '100%',
          border: `2px solid ${categoryColor}`
        }}
        bodyStyle={{ padding: '8px' }}
      >
        <Space direction="vertical" size={4} style={{ width: '100%' }}>
          <div>
            <Text
              strong
              style={{ color: categoryColor, marginRight: '8px', display: 'block' }}
            >
              <ExpandOutlined style={{ marginRight: '5px' }} />
              {item.id}
            </Text>
            <Text style={{ fontSize: '0.9rem', whiteSpace: 'normal' }}>{item.title}</Text>
          </div>
          
          <div>
            <Space>
              <Tag color={categoryColor}>Current</Tag>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                <ClockCircleOutlined style={{ marginRight: '4px' }} />
                {formatDate(item.date)}
              </Text>
            </Space>
          </div>
        </Space>
      </Card>
    );
  };

  // Function to determine if an item has been changed (mock for now)
  // In a real implementation, this would check against the time period filter
  const hasChanged = (item: RelatedItem) => {
    // For now, we'll consider items with "Modified" or "Updated" status as changed
    return item.status === 'Modified' || item.status === 'Updated';
  };

  // Render a single item card with optional highlighting for changed items
  const renderItemCard = (item: RelatedItem, categoryKey: string, categoryColor: string) => {
    const isChanged = hasChanged(item);
    
    // Apply orange highlighting if this item has changed and highlight changes is enabled
    const cardStyle: React.CSSProperties = {
      marginBottom: '8px',
      backgroundColor: '#FFFFFF',
      ...(highlightChanges && isChanged 
        ? {
            boxShadow: `0 0 8px ${colors.category.parameter}`,
            border: `1px solid ${colors.category.parameter}`
          } 
        : {})
    };

    return (
      <Card
        key={item.id}
        size="small"
        style={cardStyle}
        bodyStyle={{ padding: '8px' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <Text code copyable={{ text: item.id }} style={{ 
              marginRight: '4px',
              color: highlightChanges && isChanged ? colors.category.parameter : categoryColor
            }}>
              {item.id}
            </Text>
            {renderStatusTag(item.status)}
          </div>
          
          <Text 
            strong
            style={{ 
              marginBottom: '4px',
              color: highlightChanges && isChanged ? colors.category.parameter : undefined
            }}
          >
            {item.title}
          </Text>
          
          <div style={{ fontSize: '0.8rem', color: colors.text.secondary, display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span>
              <ClockCircleOutlined /> {formatDate(item.date)}
            </span>
            <span>{item.author}</span>
          </div>
        </div>
      </Card>
    );
  };

  // No items to display - since we're now showing all categories, this should no longer happen
  if (categories.length === 0) {
    return renderEmpty();
  }

  return (
    <div className="related-items-panel" style={isFullScreen ? {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'white',
      zIndex: 1000,
      padding: '20px',
      overflow: 'auto'
    } : {}}>
      {/* Filter controls */}
      {showFilter && categories.length > 1 && (
        <Row 
          justify="space-between" 
          align="middle"
          style={{ 
            padding: '8px 16px', 
            marginBottom: '12px', 
            backgroundColor: colors.chart.backgroundLight,
            borderRadius: '4px'
          }}
        >
          <Col>
            <Typography.Title level={5} style={{ margin: 0 }}>Related Items</Typography.Title>
          </Col>
          <Col>
            <Space>
              <Button 
                type="text" 
                size="small"
                onClick={() => setShowAllCategories(!showAllCategories)}
              >
                {showAllCategories ? 'Hide Empty' : 'See All'}
              </Button>
              <Button
                type="text"
                size="small"
                onClick={() => setHighlightChanges(!highlightChanges)}
                style={highlightChanges ? { color: colors.category.parameter } : {}}
              >
                Highlight Additional Change
              </Button>
              <Button
                type="text"
                size="small"
                onClick={() => setIsFullScreen(!isFullScreen)}
                style={{ color: isFullScreen ? colors.category.parameter : undefined }}
              >
                {isFullScreen ? 'Leave Full Screen' : 'Full Screen'}
              </Button>
            </Space>
          </Col>
        </Row>
      )}

      {/* Related items grid with horizontal scrolling */}
      <div style={{ 
        width: '100%', 
        overflowX: 'auto', 
        whiteSpace: 'nowrap',
        paddingBottom: '12px' // Extra padding for scrollbar
      }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'row', 
          gap: '16px'
        }}>
          {filteredCategories
            .filter(category => category.active)
            .map(category => (
              <div key={category.key} style={{ 
                minWidth: '280px',
                display: 'inline-block',
                verticalAlign: 'top'
              }}>
                <Card
                  title={
                    <div style={{ color: category.color }}>
                      {category.name}
                      <span style={{ marginLeft: '8px', fontSize: '14px', fontWeight: 'normal' }}>
                        ({category.items.length})
                      </span>
                    </div>
                  }
                  size="small"
                  bordered
                  style={{ 
                    backgroundColor: category.bgcolor,
                    border: `1px solid ${category.color}40`,
                    height: '100%',
                    width: '100%',
                  }}
                  bodyStyle={{ padding: '8px' }}
                >
                  {/* Special case: This is the category of the current expanded item, but has no items yet */}
                  {category.items.length === 0 && currentItemType && category.key === currentItemType && currentItem ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px 0' }}>
                      {renderExpandedItemSummary(currentItem, category.color)}
                    </div>
                  ) : category.items.length > 0 ? (
                    <Space direction="vertical" style={{ width: '100%' }} size={8}>
                      {category.items.map(item => {
                        // Check if this is the current item being expanded
                        const isCurrentItem = currentItem && item.id === currentItem.id && category.key === currentItemType;
                        
                        // If it's the current item, use the special rendering
                        if (isCurrentItem) {
                          return renderExpandedItemSummary(item, category.color);
                        }
                        
                        // Otherwise use the standard item card rendering with highlight support
                        return (
                          <div key={item.id} onClick={() => onItemClick && onItemClick(item, category.key)}>
                            {renderItemCard(item, category.key, category.color)}
                          </div>
                        );
                      })}
                    </Space>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 8px' }}>
                      {/* Flip the order: Create Relationship button first, then "No related items" message */}
                      {onCreateRelationship && renderCreateRelationshipButton(category.key, category.color)}
                      <Empty 
                        image={Empty.PRESENTED_IMAGE_SIMPLE} 
                        description="No related items" 
                        style={{ margin: '16px 0 0' }}
                      />
                    </div>
                  )}
                </Card>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedItemsPanel; 