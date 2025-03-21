import React from 'react';
import { Typography, Row, Col, Space, Descriptions, Table, Card, Tabs, Tag, Divider, Input, Button, Timeline, List } from 'antd';
import type { TableProps } from 'antd';
import { NodeIndexOutlined, CloseCircleOutlined, UpOutlined, DownOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { BaseChange } from '../../../types/changeAwareness';
import { Code, SeverityTag, ChangeTypeTag } from './UtilityComponents';

const { Text, Title } = Typography;
const { TabPane } = Tabs;

// Extended change interface with all properties needed by expanded rows
export interface StandardExpandedChange extends Omit<BaseChange, 'description'> {
  id: string;
  title: string;
  description?: string;
  changeType: "added" | "modified" | "removed";
  severity: "critical" | "major" | "minor";
  date: string;
  status: "reviewed" | "pending" | "approved" | "rejected";
  author: string;
  changeId?: string;
  technicalDetails?: Record<string, any>;
  impactedItems: Record<string, number>;
  dependencies?: Array<{
    id: string;
    type: string;
    title: string;
    relationship: string;
    key?: string;
  }>;
  documents?: Array<{
    id: string;
    type: string;
    title: string;
    version: string;
    key?: string;
  }>;
}

// Common expanded row component for change items
export interface ExpandedRowProps<T extends StandardExpandedChange> {
  record: T;
  showTechnicalDetails?: boolean;
  showImpact?: boolean;
  showDependencies?: boolean;
  showDocuments?: boolean;
  showCustomSection?: boolean;
  customSectionTitle?: string;
  customSectionContent?: React.ReactNode;
}

export function StandardExpandedRow<T extends StandardExpandedChange>({
  record,
  showTechnicalDetails = false,
  showImpact = true,
  showDependencies = false,
  showDocuments = false,
  showCustomSection = false,
  customSectionTitle = 'Additional Information',
  customSectionContent
}: ExpandedRowProps<T>): React.ReactElement {
  return (
    <Card style={{ width: '100%', marginBottom: 16 }}>
      <Descriptions 
        bordered 
        size="small" 
        column={{ xxl: 4, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}
        style={{ marginBottom: 16 }}
      >
        <Descriptions.Item label="ID">{record.id}</Descriptions.Item>
        {record.changeId && (
          <Descriptions.Item label="Change ID">
            <Code>{record.changeId}</Code>
          </Descriptions.Item>
        )}
        <Descriptions.Item label="Title">{record.title}</Descriptions.Item>
        <Descriptions.Item label="Description">{record.description}</Descriptions.Item>
        <Descriptions.Item label="Type">
          <ChangeTypeTag type={record.changeType} />
        </Descriptions.Item>
        <Descriptions.Item label="Severity">
          <SeverityTag severity={record.severity} />
        </Descriptions.Item>
        <Descriptions.Item label="Author">{record.author}</Descriptions.Item>
        <Descriptions.Item label="Date">{record.date}</Descriptions.Item>
      </Descriptions>

      {/* Impact Analysis Section */}
      {showImpact && (
        <div>
          <ImpactAnalysisSection record={record} />
        </div>
      )}
    </Card>
  );
}

// Impact Analysis Section
interface ImpactAnalysisSectionProps<T extends StandardExpandedChange> {
  record: T;
}

function ImpactAnalysisSection<T extends StandardExpandedChange>({ record }: ImpactAnalysisSectionProps<T>) {
  // All domains that could potentially have data
  const domainKeys = [
    'mission', 
    'requirements', 
    'functions', 
    'logical', 
    'cad', 
    'ebom', 
    'models', 
    'automation'
  ];

  // Initialize visible state for all domains
  const initialVisibility = domainKeys.reduce((acc, key) => {
    acc[key] = true;
    return acc;
  }, {} as Record<string, boolean>);

  const [visibleDomains, setVisibleDomains] = React.useState<Record<string, boolean>>(initialVisibility);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [expandedItems, setExpandedItems] = React.useState<Record<string, boolean>>({});
  const [showRelationships, setShowRelationships] = React.useState<boolean>(false);
  const [viewMode, setViewMode] = React.useState<'cards' | 'timeline'>('cards');

  // Toggle domain visibility
  const toggleDomain = (domain: string) => {
    setVisibleDomains(prev => ({
      ...prev,
      [domain]: !prev[domain]
    }));
  };

  // Toggle item expansion
  const toggleItemExpansion = (itemId: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  // Clear search query
  const clearSearch = () => {
    setSearchQuery('');
  };

  // Toggle relationship lines visibility
  const toggleRelationships = () => {
    setShowRelationships(prev => !prev);
  };

  // Toggle between card and timeline view
  const toggleViewMode = () => {
    setViewMode(prev => prev === 'cards' ? 'timeline' : 'cards');
  };

  // Calculate total impact from the record data
  const totalImpact = Object.values(record.impactedItems || {}).reduce(
    (sum: number, val) => sum + (val || 0), 0
  );

  // Helper function to create mock items for a domain based on count
  const createMockItemsForDomain = (domain: string, count: number): Array<{
    id: string;
    title: string;
    lastModified?: string;
    modifiedBy?: string;
    relatedTo?: Array<string>; // IDs of related items
  }> => {
    // For simplicity, create placeholder items with domain-specific IDs
    // In a real implementation, you would fetch the actual impacted items
    const items = [];
    const dates = ['2023-01-15', '2023-02-10', '2023-03-20', '2023-04-05'];
    const authors = ['Robert Johnson', 'Lisa Chen', 'John Smith', 'Emily Johnson', 'Michael Chen', 'Sarah Williams'];
    
    for (let i = 0; i < count; i++) {
      const randomDate = dates[Math.floor(Math.random() * dates.length)];
      const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
      
      // Create IDs that match the format from the screenshot
      let itemId: string;
      if (domain === 'mission') {
        itemId = `MISSION-${1000 + i}`;
      } else if (domain === 'requirements') {
        itemId = `REQUIREMENTS-${1000 + i}`;
      } else if (domain === 'functions') {
        itemId = `FUNCTIONS-${1000 + i}`;
      } else if (domain === 'logical') {
        itemId = `LOGICAL-${1000 + i}`;
      } else if (domain === 'cad') {
        itemId = `CAD-${1000 + i}`;
      } else if (domain === 'ebom') {
        itemId = `EBOM-${1000 + i}`;
      } else {
        itemId = `${domain.toUpperCase()}-${1000 + i}`;
      }
      
      // Create mock relationships (for demonstration purposes)
      const relatedTo: Array<string> = [];
      
      // For this example, we'll create relationships between adjacent domains
      // Mission items relate to Requirements, Requirements to Functions, etc.
      if (domain === 'mission' && i < count - 1) {
        relatedTo.push(`REQUIREMENTS-${1000 + Math.floor(Math.random() * count)}`);
      } else if (domain === 'requirements') {
        relatedTo.push(`FUNCTIONS-${1000 + Math.floor(Math.random() * count)}`);
      } else if (domain === 'functions') {
        relatedTo.push(`LOGICAL-${1000 + Math.floor(Math.random() * count)}`);
      } else if (domain === 'logical') {
        relatedTo.push(`CAD-${1000 + Math.floor(Math.random() * count)}`);
      } else if (domain === 'cad') {
        relatedTo.push(`EBOM-${1000 + Math.floor(Math.random() * count)}`);
      }
      
      items.push({
        id: itemId,
        title: `${domain.charAt(0).toUpperCase() + domain.slice(1)} Item ${i + 1}`,
        lastModified: randomDate,
        modifiedBy: randomAuthor,
        relatedTo
      });
    }
    
    return items;
  };

  // Create dynamic impact data from record.impactedItems
  const impactData = React.useMemo(() => {
    const result: Record<string, Array<any>> = {};
    
    // Map from impactedItems keys to our domain keys
    const domainMapping: Record<string, string> = {
      'missions': 'mission',
      'requirements': 'requirements',
      'functions': 'functions',
      'parameters': 'parameters', // Not in our UI domains but might exist in data
      'logical': 'logical',
      'cad': 'cad',
      'bom': 'ebom',  // BOM is shown as EBOM in UI
      'models': 'models',
      'automation': 'automation'
    };
    
    // Process each domain in the impactedItems
    Object.entries(record.impactedItems || {}).forEach(([key, count]) => {
      if (count > 0) {
        // Map the domain key if needed
        const mappedKey = domainMapping[key] || key;
        // Create mock items for this domain based on count
        result[mappedKey] = createMockItemsForDomain(mappedKey, count);
      }
    });
    
    return result;
  }, [record.impactedItems]);

  // Get color for domain headers
  const getDomainColor = (domain: string): string => {
    switch (domain) {
      case 'mission':
        return '#f6ffed'; // Light green
      case 'requirements':
        return '#f0f5ff'; // Light blue
      case 'functions':
        return '#fff0f6'; // Light pink
      case 'logical':
        return '#f9f0ff'; // Light purple
      case 'cad':
        return '#fff7e6'; // Light orange
      case 'ebom':
        return '#f0f5ff'; // Light blue
      case 'models':
        return '#f9f0ff'; // Light purple
      case 'automation':
        return '#fcffe6'; // Light yellow
      default:
        return '#f5f5f5'; // Light grey
    }
  };

  // Define the domains to display (in order)
  const domains = [
    { key: 'mission', label: 'Mission' },
    { key: 'requirements', label: 'Requirements' },
    { key: 'functions', label: 'Functions' },
    { key: 'logical', label: 'Logical' },
    { key: 'cad', label: 'CAD' },
    { key: 'ebom', label: 'EBOM' },
    { key: 'models', label: 'Models' },
    { key: 'automation', label: 'Automation' }
  ];

  // Only show domains that have data
  const activeDomains = domains.filter(domain => !!impactData[domain.key]?.length);
  const hasData = activeDomains.length > 0;

  // Filter items based on search query
  const filteredImpactData = React.useMemo(() => {
    if (!searchQuery.trim()) {
      return impactData; // Return all data if no search query
    }

    const query = searchQuery.toLowerCase().trim();
    const filtered: Record<string, Array<any>> = {};

    // Filter each domain's items
    Object.entries(impactData).forEach(([domainKey, items]) => {
      filtered[domainKey] = items.filter(item => 
        item.id.toLowerCase().includes(query) || 
        item.title.toLowerCase().includes(query) || 
        (item.lastModified && item.lastModified.includes(query)) ||
        (item.modifiedBy && item.modifiedBy.toLowerCase().includes(query))
      );
    });

    return filtered;
  }, [impactData, searchQuery]);

  // Count total filtered items
  const totalFilteredItems = React.useMemo(() => {
    return Object.values(filteredImpactData).reduce(
      (sum, items) => sum + items.length, 0
    );
  }, [filteredImpactData]);

  // Timeline view implementation
  const renderTimelineView = () => {
    // Group all items by date and sort chronologically
    const itemsByDate: Record<string, Array<any>> = Object.values(filteredImpactData)
      .flat()
      .filter(item => item.lastModified && 
        (visibleDomains[item.id.split('-')[0].toLowerCase()] || false))
      .reduce((acc: Record<string, Array<any>>, item: any) => {
        if (!acc[item.lastModified]) {
          acc[item.lastModified] = [];
        }
        acc[item.lastModified].push(item);
        return acc;
      }, {});

    // Sort dates chronologically
    const sortedEntries = Object.entries(itemsByDate)
      .sort(([dateA], [dateB]) => {
        return new Date(dateA).getTime() - new Date(dateB).getTime();
      });

    return (
      <div style={{ overflowX: 'auto' }}>
        <Timeline mode="alternate" style={{ marginTop: 20, marginBottom: 20 }}>
          {sortedEntries.map(([date, items]) => (
            <Timeline.Item 
              key={date} 
              color="blue"
              label={date}
            >
              <Card size="small" title={`Changes on ${date}`} style={{ width: 300 }}>
                <List
                  size="small"
                  dataSource={items}
                  renderItem={(item: any) => {
                    // Find domain for this item
                    const domainKey = item.id.split('-')[0].toLowerCase();
                    const domain = domains.find(d => d.key === domainKey);
                    
                    return (
                      <List.Item>
                        <List.Item.Meta
                          title={
                            <Space>
                              <Tag color={getDomainColor(domainKey)}>{domain?.label || domainKey}</Tag>
                              <Text strong>{item.id}</Text>
                            </Space>
                          }
                          description={
                            <>
                              <div>{item.title}</div>
                              <div>
                                <Text type="secondary" style={{ fontSize: '12px' }}>
                                  by {item.modifiedBy}
                                </Text>
                              </div>
                            </>
                          }
                        />
                      </List.Item>
                    );
                  }}
                />
              </Card>
            </Timeline.Item>
          ))}
        </Timeline>
      </div>
    );
  };

  // CSS styles for relationship lines
  const relationshipStyles = `
    .relationship-container {
      position: relative;
    }
    
    .impact-item {
      z-index: 1;
    }
    
    .relationship-line {
      position: absolute;
      background-color: #1890ff;
      opacity: 0.4;
      z-index: 0;
      pointer-events: none;
      height: 2px;
      transform-origin: 0 0;
    }
  `;

  // Effect to draw relationship lines
  React.useEffect(() => {
    if (!showRelationships || viewMode !== 'cards') return;
    
    // Clear existing lines
    const container = document.querySelector('.relationship-container');
    const linesContainer = document.querySelector('.relationship-lines');
    if (!container || !linesContainer) return;
    
    linesContainer.innerHTML = '';
    
    // Find all items with relationships
    const items = document.querySelectorAll('.impact-item');
    items.forEach(item => {
      const relations = item.getAttribute('data-relations');
      if (!relations) return;
      
      const relatedIds = relations.split(',');
      relatedIds.forEach(relatedId => {
        const relatedItem = document.getElementById(`item-${relatedId}`);
        if (!relatedItem) return;
        
        // Get positions
        const rect1 = item.getBoundingClientRect();
        const rect2 = relatedItem.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        // Calculate positions relative to container
        const x1 = rect1.right - containerRect.left;
        const y1 = rect1.top + rect1.height / 2 - containerRect.top;
        const x2 = rect2.left - containerRect.left;
        const y2 = rect2.top + rect2.height / 2 - containerRect.top;
        
        // Calculate line length and angle
        const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        
        // Create line element
        const line = document.createElement('div');
        line.className = 'relationship-line';
        line.style.width = `${length}px`;
        line.style.left = `${x1}px`;
        line.style.top = `${y1}px`;
        line.style.transform = `rotate(${angle}deg)`;
        
        linesContainer.appendChild(line);
      });
    });
  }, [showRelationships, filteredImpactData, visibleDomains, viewMode]);

  return (
    <div>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        {/* Header row with Search, Total Impact, and Toggle Visibility */}
        <Row align="middle" justify="space-between" gutter={[16, 16]}>
          <Col xs={24} md={16}>
            <Row gutter={16} align="middle">
              <Col xs={12} sm={8} md={6} lg={5} xl={4}>
                <Input.Search
                  placeholder="Search items..."
                  onChange={(e) => setSearchQuery(e.target.value)}
                  value={searchQuery}
                  allowClear
                  style={{ width: '100%' }}
                />
              </Col>
              <Col>
                <Tag color="red">{totalImpact} affected items</Tag>
                {searchQuery && (
                  <Tag color="blue">
                    {totalFilteredItems} filtered items
                    <CloseCircleOutlined 
                      onClick={clearSearch} 
                      style={{ marginLeft: 8, cursor: 'pointer' }} 
                    />
                  </Tag>
                )}
              </Col>
            </Row>
          </Col>
          <Col xs={24} md={8} style={{ textAlign: 'right' }}>
            <Space wrap>
              <Text style={{ marginRight: 8 }}>Toggle Visibility:</Text>
              {activeDomains.map(domain => {
                const itemCount = filteredImpactData[domain.key]?.length || 0;
                
                return (
                  <Tag 
                    key={domain.key}
                    color={visibleDomains[domain.key] ? undefined : 'default'}
                    style={{ 
                      cursor: 'pointer',
                      opacity: visibleDomains[domain.key] ? 1 : 0.5
                    }}
                    onClick={() => toggleDomain(domain.key)}
                  >
                    {domain.label} ({itemCount})
                  </Tag>
                );
              })}
            </Space>
          </Col>
        </Row>
        
        {/* View options */}
        <Row justify="end" align="middle">
          <Space>
            <Button 
              type={showRelationships ? "primary" : "default"} 
              icon={<NodeIndexOutlined />}
              onClick={toggleRelationships}
              size="small"
            >
              {showRelationships ? "Hide Relationships" : "Show Relationships"}
            </Button>
            <Button 
              type={viewMode === 'timeline' ? "primary" : "default"}
              icon={<ClockCircleOutlined />}
              onClick={toggleViewMode}
              size="small"
            >
              {viewMode === 'timeline' ? "Card View" : "Timeline View"}
            </Button>
          </Space>
        </Row>

        {hasData ? (
          <>
            {viewMode === 'cards' ? (
              // Card View
              <Row gutter={[24, 24]} className={showRelationships ? "relationship-container" : ""}>
                {activeDomains.map(domain => {
                  // Skip if domain is not visible
                  if (!visibleDomains[domain.key]) {
                    return null;
                  }
                  
                  const domainItems = filteredImpactData[domain.key] || [];
                  if (domainItems.length === 0) {
                    return null; // Skip empty domains after filtering
                  }
                  
                  const domainColor = getDomainColor(domain.key);
                  
                  return (
                    <Col key={domain.key} xs={24} sm={12} md={8} lg={6} xl={4}>
                      <Card 
                        title={domain.label}
                        size="small"
                        headStyle={{ 
                          backgroundColor: domainColor, 
                          padding: '8px 12px',
                          fontSize: '14px',
                          fontWeight: 'bold'
                        }}
                        bodyStyle={{ 
                          padding: 0, 
                          maxHeight: '400px', 
                          overflowY: 'auto'
                        }}
                      >
                        {domainItems.map((item, index) => {
                          const isExpanded = expandedItems[item.id] || false;
                          
                          return (
                            <div
                              key={`${item.id}-${index}`}
                              style={{
                                padding: '8px 12px',
                                borderBottom: index < domainItems.length - 1 ? '1px solid #f0f0f0' : 'none',
                                cursor: 'pointer',
                                position: 'relative'
                              }}
                              onClick={() => toggleItemExpansion(item.id)}
                              id={`item-${item.id}`}
                              className="impact-item"
                              data-relations={item.relatedTo?.join(',')}
                            >
                              <Row align="middle" justify="space-between">
                                <Col>
                                  <Text strong style={{ fontSize: '13px' }}>{item.id}</Text>
                                </Col>
                                <Col>
                                  {isExpanded ? 
                                    <UpOutlined style={{ fontSize: '12px' }} /> : 
                                    <DownOutlined style={{ fontSize: '12px' }} />
                                  }
                                </Col>
                              </Row>
                              
                              {/* Always show title */}
                              <div style={{ marginBottom: isExpanded ? '8px' : '0' }}>
                                <Text style={{ fontSize: '13px' }}>{item.title}</Text>
                              </div>
                              
                              {/* Expanded details */}
                              {isExpanded && item.lastModified && (
                                <>
                                  <Divider style={{ margin: '8px 0' }} />
                                  <div>
                                    <Text type="secondary" style={{ fontSize: '12px' }}>
                                      Last modified: {item.lastModified}
                                    </Text>
                                  </div>
                                  <div>
                                    <Text type="secondary" style={{ fontSize: '12px' }}>
                                      {item.modifiedBy && `by ${item.modifiedBy}`}
                                    </Text>
                                  </div>
                                </>
                              )}
                            </div>
                          );
                        })}
                      </Card>
                    </Col>
                  );
                })}
                
                {/* Render relationship lines if enabled */}
                {showRelationships && (
                  <div className="relationship-lines">
                    {/* This will be populated by useEffect after render */}
                  </div>
                )}
              </Row>
            ) : (
              // Timeline View
              renderTimelineView()
            )}
          </>
        ) : (
          // No impact data available
          <Text>No impact information available</Text>
        )}
      </Space>

      {/* Add CSS for relationship lines */}
      {showRelationships && (
        <style dangerouslySetInnerHTML={{ __html: relationshipStyles }} />
      )}
    </div>
  );
}

// We're keeping these interfaces and functions for backward compatibility,
// but they won't be used in the UI anymore

// Technical Details Section
interface TechnicalDetailsSectionProps<T extends StandardExpandedChange> {
  record: T;
}

function TechnicalDetailsSection<T extends StandardExpandedChange>({ record }: TechnicalDetailsSectionProps<T>) {
  return null;
}

// Dependencies Section
interface DependenciesSectionProps<T extends StandardExpandedChange> {
  record: T;
}

function DependenciesSection<T extends StandardExpandedChange>({ record }: DependenciesSectionProps<T>) {
  return null;
}

// Documents Section
interface DocumentsSectionProps<T extends StandardExpandedChange> {
  record: T;
}

function DocumentsSection<T extends StandardExpandedChange>({ record }: DocumentsSectionProps<T>) {
  return null;
} 