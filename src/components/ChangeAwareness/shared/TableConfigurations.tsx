import React from 'react';
import { Typography, Space, Button, Tag, Badge, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { 
  InfoCircleOutlined, 
  CalendarOutlined,
  UserOutlined,
  RocketOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  ThunderboltOutlined,
  EnvironmentOutlined,
  ApartmentOutlined,
  ToolOutlined,
  BuildOutlined,
  ColumnWidthOutlined,
  BgColorsOutlined,
  LinkOutlined,
  ControlOutlined,
  EyeOutlined,
  ApiOutlined,
  FunctionOutlined,
  SettingOutlined,
  DatabaseOutlined,
  HeatMapOutlined,
  GlobalOutlined,
  DeploymentUnitOutlined,
  CompassOutlined,
  FileTextOutlined,
  ClusterOutlined,
  PartitionOutlined
} from '@ant-design/icons';
import { 
  Code, 
  SeverityTag, 
  ChangeTypeTag, 
  getStatusColor
} from './UtilityComponents';
import { 
  BaseChange, 
  MissionChange, 
  OperationalScenarioChange,
  RequirementChange,
  FunctionChange,
  ParameterChange,
  LogicalChange,
  BOMChange,
  CADChange
} from '../../../types/changeAwareness';

const { Text } = Typography;

// Extend BaseChange interface to include required fields
interface StandardBaseChange extends BaseChange {
  id: string;
  category: string;
  changeType: "New" | "Modified" | "Deprecated" | "Removed";
  severity: "Critical" | "High" | "Medium" | "Low";
  date: string;
  status: "Draft" | "In Review" | "Approved" | "Rejected" | "Implemented";
  author: string;
  title: string;
  impactedItems: Record<string, number>;
}

// Type for category configuration
interface CategoryConfig {
  color: string;
  icon: React.ReactNode;
  name: string;
}

// Domain-specific category configurations
export const missionCategories: Record<string, CategoryConfig> = {
  objective: { color: 'blue', icon: <RocketOutlined />, name: 'Objective' },
  constraint: { color: 'red', icon: <RocketOutlined />, name: 'Constraint' },
  timeline: { color: 'orange', icon: <RocketOutlined />, name: 'Timeline' },
  environment: { color: 'green', icon: <RocketOutlined />, name: 'Environment' },
  capability: { color: 'purple', icon: <RocketOutlined />, name: 'Capability' }
};

export const scenarioCategories: Record<string, CategoryConfig> = {
  operational: { color: 'blue', icon: <CompassOutlined />, name: 'Operational' },
  environmental: { color: 'green', icon: <CompassOutlined />, name: 'Environmental' },
  safety: { color: 'red', icon: <CompassOutlined />, name: 'Safety' },
  performance: { color: 'orange', icon: <CompassOutlined />, name: 'Performance' },
  logistics: { color: 'purple', icon: <CompassOutlined />, name: 'Logistics' },
  tactical: { color: 'geekblue', icon: <CompassOutlined />, name: 'Tactical' },
  test: { color: 'cyan', icon: <CompassOutlined />, name: 'Test' },
  maintenance: { color: 'gold', icon: <CompassOutlined />, name: 'Maintenance' }
};

export const requirementCategories: Record<string, CategoryConfig> = {
  system: { color: 'blue', icon: <FileTextOutlined />, name: 'System' },
  functional: { color: 'geekblue', icon: <FileTextOutlined />, name: 'Functional' },
  performance: { color: 'orange', icon: <FileTextOutlined />, name: 'Performance' },
  interface: { color: 'cyan', icon: <FileTextOutlined />, name: 'Interface' },
  physical: { color: 'purple', icon: <FileTextOutlined />, name: 'Physical' },
  verification: { color: 'lime', icon: <FileTextOutlined />, name: 'Verification' },
  environmental: { color: 'green', icon: <FileTextOutlined />, name: 'Environmental' },
  safety: { color: 'red', icon: <FileTextOutlined />, name: 'Safety' },
  reliability: { color: 'gold', icon: <FileTextOutlined />, name: 'Reliability' }
};

export const parameterCategories: Record<string, CategoryConfig> = {
  performance: { color: 'orange', icon: <ControlOutlined />, name: 'Performance' },
  physical: { color: 'purple', icon: <ControlOutlined />, name: 'Physical' },
  electrical: { color: 'blue', icon: <ControlOutlined />, name: 'Electrical' },
  thermal: { color: 'red', icon: <ControlOutlined />, name: 'Thermal' },
  environmental: { color: 'green', icon: <ControlOutlined />, name: 'Environmental' },
  operational: { color: 'cyan', icon: <ControlOutlined />, name: 'Operational' },
  design: { color: 'geekblue', icon: <ControlOutlined />, name: 'Design' },
  safety: { color: 'volcano', icon: <ControlOutlined />, name: 'Safety' },
  reliability: { color: 'gold', icon: <ControlOutlined />, name: 'Reliability' }
};

export const functionCategories: Record<string, CategoryConfig> = {
  control: { color: 'blue', icon: <SettingOutlined />, name: 'Control' },
  sensing: { color: 'cyan', icon: <SettingOutlined />, name: 'Sensing' },
  processing: { color: 'orange', icon: <SettingOutlined />, name: 'Processing' },
  communication: { color: 'purple', icon: <SettingOutlined />, name: 'Communication' },
  propulsion: { color: 'red', icon: <SettingOutlined />, name: 'Propulsion' }
};

export const logicalCategories: Record<string, CategoryConfig> = {
  architecture: { color: 'blue', icon: <ClusterOutlined />, name: 'Architecture' },
  interface: { color: 'cyan', icon: <ClusterOutlined />, name: 'Interface' },
  logic: { color: 'orange', icon: <ClusterOutlined />, name: 'Logic' },
  control: { color: 'purple', icon: <ClusterOutlined />, name: 'Control' },
  dataflow: { color: 'green', icon: <ClusterOutlined />, name: 'Dataflow' }
};

export const cadCategories: Record<string, CategoryConfig> = {
  assembly: { color: 'blue', icon: <BuildOutlined />, name: 'Assembly' },
  part: { color: 'cyan', icon: <BuildOutlined />, name: 'Part' },
  drawing: { color: 'orange', icon: <BuildOutlined />, name: 'Drawing' },
  model: { color: 'purple', icon: <BuildOutlined />, name: 'Model' },
  tolerance: { color: 'green', icon: <BuildOutlined />, name: 'Tolerance' },
  component: { color: 'geekblue', icon: <BuildOutlined />, name: 'Component' },
  material: { color: 'magenta', icon: <BuildOutlined />, name: 'Material' },
  geometry: { color: 'gold', icon: <BuildOutlined />, name: 'Geometry' }
};

export const bomCategories: Record<string, CategoryConfig> = {
  part: { color: 'blue', icon: <PartitionOutlined />, name: 'Part' },
  assembly: { color: 'cyan', icon: <PartitionOutlined />, name: 'Assembly' },
  supplier: { color: 'orange', icon: <PartitionOutlined />, name: 'Supplier' },
  material: { color: 'purple', icon: <PartitionOutlined />, name: 'Material' },
  specification: { color: 'green', icon: <PartitionOutlined />, name: 'Specification' }
};

// Common category renderer function
export const renderCategory = (category: string, domainCategories: Record<string, CategoryConfig>) => {
  if (!category || !domainCategories[category]) {
    return <Tag color="default">Unknown</Tag>;
  }

  const config = domainCategories[category];
  
  return (
    <Tag color={config.color} icon={config.icon}>
      {config.name}
    </Tag>
  );
};

// Domain-specific category renderers
export const renderMissionCategory = (category: string) => renderCategory(category, missionCategories);
export const renderScenarioCategory = (category: string) => renderCategory(category, scenarioCategories);
export const renderRequirementCategory = (category: string) => renderCategory(category, requirementCategories);
export const renderParameterCategory = (category: string) => renderCategory(category, parameterCategories);
export const renderFunctionCategory = (category: string) => renderCategory(category, functionCategories);
export const renderLogicalCategory = (category: string) => renderCategory(category, logicalCategories);
export const renderCADCategory = (category: string) => renderCategory(category, cadCategories);
export const renderBOMCategory = (category: string) => renderCategory(category, bomCategories);

// Helper function to get the appropriate category renderer based on domain
export const getCategoryRendererByDomain = (domain: string) => {
  switch (domain) {
    case 'mission':
      return renderMissionCategory;
    case 'operationalScenario':
      return renderScenarioCategory;
    case 'requirement':
      return renderRequirementCategory;
    case 'parameter':
      return renderParameterCategory;
    case 'function':
      return renderFunctionCategory;
    case 'logical':
      return renderLogicalCategory;
    case 'cad':
      return renderCADCategory;
    case 'bom':
      return renderBOMCategory;
    default:
      return (category: string) => <Tag color="default">{category}</Tag>;
  }
};

// Combined category renderer that automatically detects the domain based on the ID fields present
export const renderAutoDetectedCategory = (record: any) => {
  if (record.missionId) {
    return renderMissionCategory(record.category);
  } else if (record.scenarioId) {
    return renderScenarioCategory(record.category);
  } else if (record.requirementId) {
    return renderRequirementCategory(record.category);
  } else if (record.parameterId) {
    return renderParameterCategory(record.category);
  } else if (record.functionId) {
    return renderFunctionCategory(record.category);
  } else if (record.logicalId) {
    return renderLogicalCategory(record.category);
  } else if (record.cadId) {
    return renderCADCategory(record.category);
  } else if (record.bomId) {
    return renderBOMCategory(record.category);
  } else {
    return <Tag color="default">{record.category}</Tag>;
  }
};

// Helper function to detect the domain of a change based on its ID fields
export const detectDomain = (record: any): string => {
  if (record.missionId) return 'mission';
  if (record.scenarioId) return 'operationalScenario';
  if (record.requirementId) return 'requirement';
  if (record.parameterId) return 'parameter';
  if (record.functionId) return 'function';
  if (record.logicalId) return 'logical';
  if (record.cadId) return 'cad';
  if (record.bomId) return 'bom';
  return 'unknown';
};

// Helper function to get the domain-specific ID of a change
export const getDomainSpecificId = (record: any): string | null => {
  if (record.missionId) return record.missionId;
  if (record.scenarioId) return record.scenarioId;
  if (record.requirementId) return record.requirementId;
  if (record.parameterId) return record.parameterId;
  if (record.functionId) return record.functionId;
  if (record.logicalId) return record.logicalId;
  if (record.cadId) return record.cadId;
  if (record.bomId) return record.bomId;
  return null;
};

// Standard column configurations
export const getStandardColumns = <T extends StandardBaseChange>(
  handleViewDetails: (record: T) => void,
  categoryRenderer: (category: string, record: T) => React.ReactNode,
  options?: {
    idField?: string;
    idLabel?: string;
    showImpact?: boolean;
  }
): ColumnsType<T> => {
  const idField = options?.idField || 'id';
  const idLabel = options?.idLabel || 'ID';
  
  const columns: ColumnsType<T> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <Text strong>{text}</Text>,
      width: 100,
      sorter: (a, b) => a.id.localeCompare(b.id),
      sortDirections: ['ascend', 'descend']
    },
    {
      title: idLabel,
      dataIndex: idField as string,
      key: idField,
      render: (text) => <Code>{text}</Code>,
      width: 120,
      sorter: (a, b) => (a[idField as keyof T] as string).localeCompare(b[idField as keyof T] as string),
      sortDirections: ['ascend', 'descend']
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Space>
          <Text>{text}</Text>
          <Tooltip title="View details">
            <Button 
              type="link" 
              icon={<InfoCircleOutlined />} 
              onClick={(e) => {
                e.stopPropagation();
                handleViewDetails(record);
              }}
              size="small"
            />
          </Tooltip>
        </Space>
      ),
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortDirections: ['ascend', 'descend']
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category, record) => categoryRenderer(category, record),
      width: 140,
      sorter: (a, b) => a.category.localeCompare(b.category),
      sortDirections: ['ascend', 'descend']
    },
    {
      title: 'Type',
      dataIndex: 'changeType',
      key: 'changeType',
      render: (type) => <ChangeTypeTag type={type} />,
      width: 120,
      filters: [
        { text: 'Added', value: 'added' },
        { text: 'Modified', value: 'modified' },
        { text: 'Removed', value: 'removed' }
      ],
      onFilter: (value, record) => record.changeType === value,
      sorter: (a, b) => a.changeType.localeCompare(b.changeType),
      sortDirections: ['ascend', 'descend']
    },
    {
      title: 'Severity',
      dataIndex: 'severity',
      key: 'severity',
      render: (severity) => <SeverityTag severity={severity} />,
      width: 120,
      filters: [
        { text: 'Critical', value: 'critical' },
        { text: 'Major', value: 'major' },
        { text: 'Minor', value: 'minor' }
      ],
      onFilter: (value, record) => record.severity === value,
      sorter: (a, b) => {
        const severityOrder: Record<string, number> = { critical: 1, major: 2, minor: 3 };
        return severityOrder[a.severity] - severityOrder[b.severity];
      },
      sortDirections: ['ascend', 'descend']
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => (
        <Space>
          <CalendarOutlined />
          <span>{date}</span>
        </Space>
      ),
      sorter: (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      defaultSortOrder: 'descend',
      width: 130
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const color = getStatusColor(status);
        return <Badge status={color as any} text={status.charAt(0).toUpperCase() + status.slice(1)} />;
      },
      width: 120,
      filters: [
        { text: 'Approved', value: 'approved' },
        { text: 'Pending', value: 'pending' },
        { text: 'Rejected', value: 'rejected' },
        { text: 'Reviewed', value: 'reviewed' }
      ],
      onFilter: (value, record) => record.status === value,
      sorter: (a, b) => a.status.localeCompare(b.status),
      sortDirections: ['ascend', 'descend']
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      render: (author) => (
        <Space>
          <UserOutlined />
          <span>{author}</span>
        </Space>
      ),
      width: 150,
      sorter: (a, b) => a.author.localeCompare(b.author),
      sortDirections: ['ascend', 'descend']
    }
  ];

  // Add impact column if specified
  if (options?.showImpact) {
    columns.push({
      title: 'Impact',
      key: 'impact',
      render: (_, record) => {
        const impactedItems = record.impactedItems;
        const total = Object.values(impactedItems).reduce((sum: number, val) => sum + (val || 0), 0);
        
        return (
          <Tooltip title="Click to see impact details">
            <Tag color={total > 10 ? 'red' : total > 5 ? 'orange' : 'green'}>
              {total} affected items
            </Tag>
          </Tooltip>
        );
      },
      width: 120
    });
  }

  return columns;
};

// Standard column configurations
export const getChangeColumns = (domainType: string, showActions: boolean = true) => {
  // ... existing code ...
}; 