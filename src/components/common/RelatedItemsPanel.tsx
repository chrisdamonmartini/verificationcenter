import React, { useState } from 'react';
import { Card, Row, Col, Badge, Typography, Tooltip, Empty, Switch, Space, Tag } from 'antd';
import { ClockCircleOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
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

export interface RelatedItemsPanelProps {
  mission?: MissionItem[];
  requirements?: RequirementItem[];
  functions?: FunctionItem[];
  logical?: LogicalItem[];
  cad?: CADItem[];
  ebom?: EBOMItem[];
  models?: ModelItem[];
  automation?: AutomationItem[];
  defaultActiveTab?: string;
  onItemClick?: (item: RelatedItem, type: string) => void;
  showFilter?: boolean;
}

interface CategoryConfig {
  name: string;
  key: string;
  color: string;
  bgcolor: string;
  active: boolean;
  items: any[];
}

// Toggle visibility component
const ToggleVisibility: React.FC<{
  activeCategories: Record<string, boolean>;
  setActiveCategories: (categories: Record<string, boolean>) => void;
}> = ({ activeCategories, setActiveCategories }) => {
  const colors = useColors();
  
  return (
    <div className="filter-controls">
      <Space align="center">
        <span style={{ marginRight: '8px' }}>Toggle Visibility:</span>
        {Object.entries(activeCategories).map(([key, isActive]) => {
          let color;
          switch(key) {
            case 'requirements': color = colors.category.requirements; break;
            case 'mission': color = colors.category.mission; break;
            case 'functions': color = colors.category.functions; break;
            case 'logical': color = colors.chart.series4; break;
            case 'cad': color = colors.category.cad; break;
            case 'ebom': color = colors.category.bom; break;
            default: color = colors.chart.series8;
          }
          
          return (
            <Tag 
              key={key} 
              onClick={() => setActiveCategories({ ...activeCategories, [key]: !isActive })}
              style={{ 
                cursor: 'pointer', 
                backgroundColor: isActive ? `${color}15` : '#f0f0f0',
                color: isActive ? color : colors.chart.textSecondary,
                borderColor: isActive ? color : '#d9d9d9'
              }}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Tag>
          );
        })}
      </Space>
    </div>
  );
};

const RelatedItemsPanel: React.FC<RelatedItemsPanelProps> = ({
  mission = [],
  requirements = [],
  functions = [],
  logical = [],
  cad = [],
  ebom = [],
  models = [],
  automation = [],
  defaultActiveTab,
  onItemClick,
  showFilter = true,
}) => {
  const colors = useColors();
  const [showAll, setShowAll] = useState(true);
  const [activeCategories, setActiveCategories] = useState<Record<string, boolean>>({
    mission: true,
    requirements: true,
    functions: true,
    logical: true,
    cad: true,
    ebom: true,
    models: true,
    automation: true,
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

  // Define category configs with styling
  const categories = [
    {
      name: 'Mission',
      key: 'mission',
      color: colors.category.mission,
      bgcolor: `${colors.category.mission}10`,
      active: activeCategories.mission && mission.length > 0,
      items: filterItems(mission)
    },
    {
      name: 'Requirements',
      key: 'requirements',
      color: colors.category.requirements,
      bgcolor: `${colors.category.requirements}10`,
      active: activeCategories.requirements && requirements.length > 0,
      items: filterItems(requirements)
    },
    {
      name: 'Functions',
      key: 'functions',
      color: colors.category.functions,
      bgcolor: `${colors.category.functions}10`,
      active: activeCategories.functions && functions.length > 0,
      items: filterItems(functions)
    },
    {
      name: 'Logical',
      key: 'logical',
      color: colors.chart.series4,
      bgcolor: `${colors.chart.series4}10`,
      active: activeCategories.logical && logical.length > 0,
      items: filterItems(logical)
    },
    {
      name: 'CAD',
      key: 'cad',
      color: colors.category.cad,
      bgcolor: `${colors.category.cad}10`,
      active: activeCategories.cad && cad.length > 0,
      items: filterItems(cad)
    },
    {
      name: 'EBOM',
      key: 'ebom',
      color: colors.category.bom,
      bgcolor: `${colors.category.bom}10`,
      active: activeCategories.ebom && ebom.length > 0,
      items: filterItems(ebom)
    },
    {
      name: 'Models',
      key: 'models',
      color: colors.chart.series7,
      bgcolor: `${colors.chart.series7}10`,
      active: activeCategories.models && models.length > 0,
      items: filterItems(models)
    },
    {
      name: 'Automation',
      key: 'automation',
      color: colors.chart.series8,
      bgcolor: `${colors.chart.series8}10`,
      active: activeCategories.automation && automation.length > 0,
      items: filterItems(automation)
    }
  ].filter(category => category.items.length > 0);

  // No items to display
  if (categories.length === 0) {
    return renderEmpty();
  }

  // Toggle category visibility
  const toggleCategory = (key: string) => {
    setActiveCategories({
      ...activeCategories,
      [key]: !activeCategories[key]
    });
  };

  // Render an individual item
  const renderItem = (item: RelatedItem, category: CategoryConfig) => {
    return (
      <div
        key={item.id}
        style={{
          padding: '8px 12px',
          borderBottom: '1px solid #f0f0f0',
          cursor: onItemClick ? 'pointer' : 'default',
        }}
        onClick={() => onItemClick && onItemClick(item, category.key)}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Space direction="vertical" size={0} style={{ flex: 1 }}>
            <div>
              <Text
                strong
                style={{ color: category.color, marginRight: '8px' }}
              >
                {item.id}
              </Text>
              <Text>{item.title}</Text>
            </div>
            
            <div style={{ marginTop: '4px' }}>
              <Space>
                {renderStatusTag(item.status)}
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  <ClockCircleOutlined style={{ marginRight: '4px' }} />
                  {formatDate(item.date)}
                </Text>
              </Space>
            </div>
          </Space>
        </div>
      </div>
    );
  };

  // Calculate active categories for filter
  const activeCategoryKeys = Object.entries(activeCategories)
    .filter(([_, active]) => active)
    .map(([key]) => key);

  return (
    <div className="related-items-panel">
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
            <ToggleVisibility 
              activeCategories={activeCategories} 
              setActiveCategories={setActiveCategories} 
            />
          </Col>
          <Col>
            <Space>
              <Text type="secondary" style={{ fontSize: '12px' }}>Show only current</Text>
              <Switch 
                size="small" 
                checked={!showAll} 
                onChange={checked => setShowAll(!checked)} 
              />
            </Space>
          </Col>
        </Row>
      )}

      {/* Related items grid */}
      <Row gutter={[16, 16]}>
        {categories
          .filter(category => category.active && category.items.length > 0)
          .map(category => (
            <Col xs={24} sm={12} md={8} lg={8} xl={6} key={category.key}>
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
                  border: `1px solid ${category.color}40`
                }}
                bodyStyle={{ padding: 0 }}
              >
                {category.items.map(item => renderItem(item, category))}
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default RelatedItemsPanel; 