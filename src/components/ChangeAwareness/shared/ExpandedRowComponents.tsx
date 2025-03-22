import React from 'react';
import { Typography, Row, Col, Space, Descriptions, Table, Card, Tabs, Tag, Divider, Tooltip, Alert } from 'antd';
import type { TableProps } from 'antd';
import { NodeIndexOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { BaseChange, ImpactedItem } from '../../../types/changeAwareness';
import { CodeDisplay, SeverityTag, ChangeTypeTag } from './UtilityComponents';
import RelatedItemsPanel from '../../common/RelatedItemsPanel';

const { Text, Title, Paragraph } = Typography;
const { TabPane } = Tabs;

// Extended change interface with all properties needed by expanded rows
export interface StandardExpandedChange extends Omit<BaseChange, 'description'> {
  id: string;
  title: string;
  description?: string;
  severity: string;
  status: string;
  date: string;
  author: string;
  category: string; 
  impactedItems?: ImpactedItem[];
  changeType: string;
  technicalDetails?: any;
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

export const StandardExpandedRow = <T extends StandardExpandedChange>({
  record,
  showTechnicalDetails = true,
  showImpact = true,
  showDependencies = false
}: {
  record: T;
  showTechnicalDetails?: boolean;
  showImpact?: boolean;
  showDependencies?: boolean;
  showDocuments?: boolean;
  showCustomSection?: boolean;
  customSectionTitle?: string;
  customSectionContent?: React.ReactNode;
}) => {
  const { Title, Text, Paragraph } = Typography;

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  // Function to render a section header with optional tooltip
  const renderSectionHeader = (title: string, tooltip?: string) => (
    <Divider orientation="left">
      <Space>
        <Text strong>{title}</Text>
        {tooltip && (
          <Tooltip title={tooltip}>
            <InfoCircleOutlined style={{ color: '#1890ff' }} />
          </Tooltip>
        )}
      </Space>
    </Divider>
  );

  // Define table columns for impacted items
  const impactColumns: TableProps<any>['columns'] = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (text) => <Tag color="blue">{text.charAt(0).toUpperCase() + text.slice(1)}</Tag>,
    },
    {
      title: 'Item',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <CodeDisplay value={text} monospace />,
    }
  ];

  // Parse and organize impact/dependency information
  // Use impactedItems directly if available in the new format
  const impactedItemsData = record.impactedItems || [];

  // Prepare technical details for display
  const technicalDetailsEntries = record.technicalDetails
    ? Object.entries(record.technicalDetails).map(([key, value]) => ({
        key,
        label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
        value: typeof value === 'object' ? JSON.stringify(value) : String(value),
      }))
    : [];

  // Transform impacted items into the RelatedItemsPanel format
  const mapImpactedItemsToRelatedItems = () => {
    // Group items by type
    const groupedItems = impactedItemsData.reduce((acc, item) => {
      const type = item.type.toLowerCase();
      if (!acc[type]) {
        acc[type] = [];
      }
      
      // Convert to the RelatedItemsPanel item format
      acc[type].push({
        title: item.name,
        status: 'Current',
        date: new Date().toISOString(), // Use current date as fallback
        author: 'System',
        ...item  // Spread other properties (including id)
      });
      
      return acc;
    }, {} as Record<string, any[]>);

    return {
      mission: groupedItems.mission || [],
      requirements: groupedItems.requirement || [],
      functions: groupedItems.function || [],
      logical: groupedItems.logical || [],
      cad: groupedItems.cad || [],
      ebom: groupedItems.bom || [],
      models: groupedItems.model || [],
      automation: groupedItems.automation || []
    };
  };

  // Prepare related items data for the RelatedItemsPanel
  const relatedItems = mapImpactedItemsToRelatedItems();
  
  // Check if there are any related items to display
  const hasRelatedItems = Object.values(relatedItems).some(items => items.length > 0);

  return (
    <div className="expanded-row" style={{ padding: '0 20px 20px 20px' }}>
      <Row gutter={[24, 16]}>
        {/* Impact Analysis Section - Full Width */}
        {showImpact && (
          <Col xs={24}>
            {hasRelatedItems ? (
              <RelatedItemsPanel
                mission={relatedItems.mission}
                requirements={relatedItems.requirements}
                functions={relatedItems.functions}
                logical={relatedItems.logical}
                cad={relatedItems.cad}
                ebom={relatedItems.ebom}
                models={relatedItems.models}
                automation={relatedItems.automation}
                defaultActiveTab={Object.keys(relatedItems).find(key => relatedItems[key as keyof typeof relatedItems].length > 0)}
              />
            ) : (
              <Alert
                message="No impact analysis available"
                description="There are no traced impacts for this change."
                type="info"
                showIcon
              />
            )}
          </Col>
        )}
      </Row>
    </div>
  );
};

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

// For impacted items table
export const getImpactedItemsColumns = (): TableProps<ImpactedItem>['columns'] => {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <CodeDisplay value={text} monospace />,
    }
  ];
}; 