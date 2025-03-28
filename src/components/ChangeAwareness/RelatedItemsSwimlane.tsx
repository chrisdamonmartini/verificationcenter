import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Tag, Space, Button, Tooltip } from 'antd';
import { ArrowRightOutlined, RightOutlined } from '@ant-design/icons';
import { MissionChange, OperationalScenarioChange, RequirementChange, ImpactedItem, BaseChange } from '../../types/changeAwareness';
import useColors from '../../hooks/useColors';

// Import icons
import MissionIcon from '../../icons/typeTarget48.svg';
import OperationalScenariosIcon from '../../icons/typeBranchRevision48.svg';
import RequirementsIcon from '../../icons/Requirements.svg';
import ParametersIcon from '../../icons/Parameters.svg';
import FunctionsIcon from '../../icons/Functions.svg';
import LogicalIcon from '../../icons/Logical.svg';
import CADIcon from '../../icons/typePartComponent48.svg';
import EBOMIcon from '../../icons/typeClass48.svg';

const { Text } = Typography;

export interface RelatedItemsProps {
  selectedChange: BaseChange | null;
  upstreamItems?: ImpactedItem[];
  downstreamItems?: ImpactedItem[];
}

// Domain icon mapping
const domainIconMap: Record<string, string> = {
  'mission': MissionIcon,
  'operationalScenario': OperationalScenariosIcon,
  'requirement': RequirementsIcon,
  'parameter': ParametersIcon,
  'function': FunctionsIcon,
  'logical': LogicalIcon,
  'cad': CADIcon,
  'bom': EBOMIcon
};

const RelatedItemsSwimlane: React.FC<RelatedItemsProps> = ({ 
  selectedChange,
  upstreamItems = [],
  downstreamItems = []
}) => {
  const colors = useColors();

  // Domain type mapping
  const domainTypeMap: Record<string, string> = {
    'mission': 'Mission',
    'operationalScenario': 'Operational Scenario',
    'requirement': 'Requirement',
    'parameter': 'Parameter', 
    'function': 'Function',
    'logical': 'Logical Architecture',
    'cad': 'CAD Design',
    'bom': 'Engineering BOM'
  };

  // Helper to get domain color
  const getDomainColor = (domain: string) => {
    switch (domain) {
      case 'mission':
        return colors.category.mission;
      case 'operationalScenario':
        return colors.chart.series3;
      case 'requirement':
        return colors.category.requirements;
      case 'parameter':
        return colors.category.parameter;
      case 'function':
        return colors.category.functions;
      case 'logical':
        return colors.chart.series1;
      case 'cad':
        return colors.category.cad;
      case 'bom':
        return colors.category.bom;
      default:
        return '#d9d9d9';
    }
  };

  // Group items by domain
  const groupItemsByDomain = (items: ImpactedItem[]) => {
    const grouped: Record<string, ImpactedItem[]> = {};
    
    items.forEach(item => {
      if (!grouped[item.type]) {
        grouped[item.type] = [];
      }
      grouped[item.type].push(item);
    });
    
    return grouped;
  };

  const upstreamByDomain = groupItemsByDomain(upstreamItems);
  const downstreamByDomain = groupItemsByDomain(downstreamItems);

  // Get domains ordered by typical flow
  const getDomainOrder = () => {
    const order = [
      'mission', 
      'operationalScenario', 
      'requirement', 
      'parameter', 
      'function', 
      'logical', 
      'cad', 
      'bom'
    ];
    
    // Create an ordered array of domains that exist in our data
    const allDomains = new Set<string>();
    
    // Add upstream domains
    Object.keys(upstreamByDomain).forEach(domain => allDomains.add(domain));
    
    // Add current item domain if it exists
    if (selectedChange?.domain) {
      allDomains.add(selectedChange.domain);
    }
    
    // Add downstream domains
    Object.keys(downstreamByDomain).forEach(domain => allDomains.add(domain));
    
    // Return ordered domains that exist in our data
    return order.filter(domain => allDomains.has(domain));
  };

  const orderedDomains = getDomainOrder();

  // Render an item card
  const renderItemCard = (item: any, isCurrentItem: boolean = false) => {
    const domain = item.domain || item.type || 'unknown';
    
    return (
      <Card
        key={item.id}
        size="small"
        style={{
          width: '200px',
          margin: '0 8px',
          borderColor: getDomainColor(domain),
          borderWidth: isCurrentItem ? '2px' : '1px',
          backgroundColor: isCurrentItem ? 'rgba(0, 104, 140, 0.05)' : undefined
        }}
        bodyStyle={{ padding: '8px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
          <img 
            src={domainIconMap[domain]} 
            alt={domain} 
            style={{ width: '16px', height: '16px', marginRight: '8px' }} 
          />
          <Text strong style={{ fontSize: '13px' }}>
            {item.title || item.name}
          </Text>
        </div>
        <div style={{ fontSize: '12px', color: 'rgba(0, 0, 0, 0.45)', marginBottom: '4px' }}>
          {item.id}
        </div>
        {item.description && (
          <div style={{ fontSize: '12px', marginTop: '4px' }}>
            {item.description.length > 75 
              ? `${item.description.substring(0, 75)}...` 
              : item.description}
          </div>
        )}
      </Card>
    );
  };

  // Render a swimlane for a domain
  const renderSwimlane = (domain: string) => {
    const upstreamItems = upstreamByDomain[domain] || [];
    const isCurrentDomain = selectedChange?.domain === domain;
    const downstreamItems = downstreamByDomain[domain] || [];
    
    const hasItems = upstreamItems.length > 0 || isCurrentDomain || downstreamItems.length > 0;
    
    if (!hasItems) return null;
    
    return (
      <div style={{ marginBottom: '16px' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '8px',
          padding: '4px 8px',
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          borderRadius: '4px'
        }}>
          <img 
            src={domainIconMap[domain]} 
            alt={domain} 
            style={{ width: '20px', height: '20px', marginRight: '8px' }} 
          />
          <Text strong style={{ fontSize: '14px' }}>
            {domainTypeMap[domain] || domain}
          </Text>
          <Text type="secondary" style={{ marginLeft: '8px', fontSize: '12px' }}>
            ({upstreamItems.length + (isCurrentDomain ? 1 : 0) + downstreamItems.length} items)
          </Text>
        </div>
        
        <div style={{ 
          display: 'flex', 
          overflowX: 'auto',
          padding: '4px 0 8px 0'
        }}>
          {/* Upstream items */}
          {upstreamItems.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {upstreamItems.map(item => renderItemCard(item))}
              <ArrowRightOutlined style={{ margin: '0 8px', color: '#8c8c8c' }} />
            </div>
          )}
          
          {/* Current item */}
          {isCurrentDomain && selectedChange && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {renderItemCard(selectedChange, true)}
              {downstreamItems.length > 0 && (
                <ArrowRightOutlined style={{ margin: '0 8px', color: '#8c8c8c' }} />
              )}
            </div>
          )}
          
          {/* Downstream items */}
          {downstreamItems.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {downstreamItems.map(item => renderItemCard(item))}
            </div>
          )}
        </div>
      </div>
    );
  };

  if (!selectedChange) {
    return (
      <div style={{ textAlign: 'center', padding: '24px' }}>
        <Text type="secondary">Select an item to view relationships</Text>
      </div>
    );
  }

  return (
    <div style={{ padding: '8px 0' }}>
      <div style={{ marginBottom: '16px' }}>
        <Text strong>Change Impact Visualization</Text>
        <Text type="secondary" style={{ display: 'block', fontSize: '12px' }}>
          Showing how changes propagate across domains
        </Text>
      </div>
      
      {orderedDomains.map(domain => renderSwimlane(domain))}
    </div>
  );
};

export default RelatedItemsSwimlane; 