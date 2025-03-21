import React from 'react';
import { Typography, Row, Col, Space, Descriptions, Table, Card, Tabs, Tag, Divider } from 'antd';
import type { TableProps } from 'antd';
import { NodeIndexOutlined } from '@ant-design/icons';
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

  // Toggle domain visibility
  const toggleDomain = (domain: string) => {
    setVisibleDomains(prev => ({
      ...prev,
      [domain]: !prev[domain]
    }));
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
      
      items.push({
        id: itemId,
        title: `${domain.charAt(0).toUpperCase() + domain.slice(1)} Item ${i + 1}`,
        lastModified: randomDate,
        modifiedBy: randomAuthor
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

  return (
    <div>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        {/* Header row with Total Impact and Toggle Visibility */}
        <Row align="middle" justify="space-between">
          <Col xs={24} md={8}>
            <Space align="center">
              <Tag color="red">{totalImpact} affected items</Tag>
            </Space>
          </Col>
          <Col xs={24} md={16} style={{ textAlign: 'right' }}>
            <Text style={{ marginRight: 8 }}>Toggle Visibility:</Text>
            <Space wrap>
              {activeDomains.map(domain => {
                const itemCount = impactData[domain.key]?.length || 0;
                
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
        
        {hasData ? (
          <>
            {/* Domain columns with items - using xs spans to fit more on screen */}
            <Row gutter={[24, 24]}>
              {activeDomains.map(domain => {
                // Skip if domain is not visible
                if (!visibleDomains[domain.key]) {
                  return null;
                }
                
                const domainItems = impactData[domain.key] || [];
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
                      {domainItems.map((item, index) => (
                        <div
                          key={`${item.id}-${index}`}
                          style={{
                            padding: '8px 12px',
                            borderBottom: index < domainItems.length - 1 ? '1px solid #f0f0f0' : 'none'
                          }}
                        >
                          <div>
                            <Text strong style={{ fontSize: '13px' }}>{item.id}</Text>
                          </div>
                          <div style={{ marginBottom: '4px' }}>
                            <Text style={{ fontSize: '13px' }}>{item.title}</Text>
                          </div>
                          {item.lastModified && (
                            <>
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
                      ))}
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </>
        ) : (
          // No impact data available
          <Text>No impact information available</Text>
        )}
      </Space>
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