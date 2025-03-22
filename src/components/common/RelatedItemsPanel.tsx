import React, { useState } from 'react';
import { Card, Row, Col, Badge, Typography, Tooltip, Empty, Switch, Space, Tag } from 'antd';
import { ClockCircleOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

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
    
    switch (status) {
      case 'Active':
        return <Tag color="#87d068">Active</Tag>;
      case 'Released':
        return <Tag color="#87d068">Released</Tag>;
      case 'Modified':
        return <Tag color="#faad14">Modified</Tag>;
      case 'In Development':
        return <Tag color="#1890ff">In Development</Tag>;
      case 'Deprecated':
        return <Tag color="#999">Deprecated</Tag>;
      case 'Archived':
        return <Tag color="#999">Archived</Tag>;
      case 'Updated':
        return <Tag color="#1890ff">Updated</Tag>;
      case 'Completed':
        return <Tag color="#87d068">Completed</Tag>;
      default:
        return <Tag color="#f50">{status}</Tag>;
    }
  };

  // Empty state
  const renderEmpty = () => (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No related items" style={{ margin: '20px 0' }} />
  );

  // Define category configs with styling
  const categories: CategoryConfig[] = [
    {
      name: 'Mission',
      key: 'mission',
      color: '#92b4d7',
      bgcolor: '#f0f7ff',
      active: activeCategories.mission && mission.length > 0,
      items: filterItems(mission)
    },
    {
      name: 'Requirements',
      key: 'requirements',
      color: '#9badee',
      bgcolor: '#f5f8ff',
      active: activeCategories.requirements && requirements.length > 0,
      items: filterItems(requirements)
    },
    {
      name: 'Functions',
      key: 'functions',
      color: '#a8dba8',
      bgcolor: '#f0faf0',
      active: activeCategories.functions && functions.length > 0,
      items: filterItems(functions)
    },
    {
      name: 'Logical',
      key: 'logical',
      color: '#f3d5a0',
      bgcolor: '#fffaf0',
      active: activeCategories.logical && logical.length > 0,
      items: filterItems(logical)
    },
    {
      name: 'CAD',
      key: 'cad',
      color: '#c8b5e0',
      bgcolor: '#f9f5ff',
      active: activeCategories.cad && cad.length > 0,
      items: filterItems(cad)
    },
    {
      name: 'EBOM',
      key: 'ebom',
      color: '#f3b5cd',
      bgcolor: '#fff5f8',
      active: activeCategories.ebom && ebom.length > 0,
      items: filterItems(ebom)
    },
    {
      name: 'Models',
      key: 'models',
      color: '#ffd5a0',
      bgcolor: '#fff9f0',
      active: activeCategories.models && models.length > 0,
      items: filterItems(models)
    },
    {
      name: 'Automation',
      key: 'automation',
      color: '#ffb5b5',
      bgcolor: '#fff5f5',
      active: activeCategories.automation && automation.length > 0,
      items: filterItems(automation)
    }
  ];

  // Filter to only include categories with items
  const visibleCategories = categories.filter(cat => cat.items.length > 0);
  
  // Check if there are any items
  const hasItems = visibleCategories.length > 0;

  // Toggle a category
  const toggleCategory = (key: string) => {
    setActiveCategories(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Render a related item in the standard format
  const renderItem = (item: RelatedItem, category: CategoryConfig) => {
    return (
      <div 
        key={item.id}
        style={{ 
          padding: '8px 12px',
          marginBottom: '6px',
          backgroundColor: 'white',
          borderRadius: '2px',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          gap: '2px'
        }}
        onClick={() => onItemClick && onItemClick(item, category.key)}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text strong style={{ fontSize: '12px' }}>{item.id}</Text>
          {renderStatusTag(item.status)}
        </div>
        
        <Text style={{ fontSize: '12px' }}>{item.title}</Text>
        
        <div style={{ 
          display: 'flex', 
          fontSize: '10px', 
          color: '#999', 
          marginTop: '2px',
          alignItems: 'center'
        }}>
          <ClockCircleOutlined style={{ marginRight: '2px', fontSize: '10px' }} />
          <Text type="secondary" style={{ fontSize: '10px' }}>
            {formatDate(item.date)} by {item.author}
          </Text>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '12px'
      }}>
        <div style={{ 
          fontSize: '14px', 
          display: 'flex',
          alignItems: 'center'
        }}>
          <span style={{ marginRight: '8px' }}>Toggle Visibility:</span>
          {visibleCategories.map(category => (
            <Tag
              key={category.key}
              color={category.active ? category.color : undefined}
              style={{ 
                cursor: 'pointer',
                margin: '0 4px',
                userSelect: 'none',
                color: category.active ? 'white' : undefined,
                borderColor: category.active ? category.color : undefined
              }}
              onClick={() => toggleCategory(category.key)}
            >
              {category.name}
            </Tag>
          ))}
          {hasItems && (
            <Tag 
              color={showAll ? undefined : "gold"}
              style={{ cursor: 'pointer', marginLeft: '8px' }}
              onClick={() => setShowAll(!showAll)}
            >
              <ClockCircleOutlined /> Changed in last 8 weeks
            </Tag>
          )}
        </div>
      </div>

      {hasItems && (
        <Row gutter={[8, 8]} style={{ display: 'flex', overflowX: 'auto', flexWrap: 'nowrap' }}>
          {visibleCategories.map(category => {
            return category.active && (
              <Col key={category.key} style={{ 
                width: '200px', 
                flex: '0 0 200px',
                marginBottom: '12px'
              }}>
                <div style={{ 
                  backgroundColor: category.bgcolor, 
                  borderRadius: '4px',
                  height: '100%',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    padding: '6px 12px',
                    backgroundColor: category.color,
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '12px'
                  }}>
                    {category.name}
                  </div>
                  <div style={{ 
                    padding: '8px',
                    maxHeight: '300px',
                    overflowY: 'auto'
                  }}>
                    {category.items.length > 0 
                      ? category.items.map(item => renderItem(item, category)) 
                      : <div style={{ padding: '8px 16px', color: '#999' }}>No items</div>
                    }
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      )}

      {!hasItems && renderEmpty()}
    </div>
  );
};

export default RelatedItemsPanel; 