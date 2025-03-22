import React from 'react';
import { Tag, Badge, Typography, Space } from 'antd';
import {
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  ClockCircleOutlined,
  PlusOutlined as AntPlusOutlined,
  MinusOutlined as AntMinusOutlined,
  WarningOutlined,
  EditOutlined as AntEditOutlined
} from '@ant-design/icons';
import { CodeProps, StatisticProps } from '../../../types/changeAwareness';
import useColors from '../../../hooks/useColors';

const { Text } = Typography;

// Code display component for IDs
export const CodeDisplay: React.FC<{ 
  value?: string; 
  type?: string; 
  monospace?: boolean; 
  bold?: boolean;
  children?: React.ReactNode;
  size?: 'small' | 'default' | 'large';
}> = ({ value, type, monospace = false, bold = false, children, size = 'default' }) => {
  const colors = useColors();
  const displayValue = value || (children ? String(children) : '');
  
  const style: React.CSSProperties = {
    fontFamily: monospace ? 'monospace' : 'inherit',
    fontWeight: bold ? 'bold' : 'normal',
    padding: '2px 4px',
    borderRadius: '3px',
    fontSize: size === 'small' ? '0.8em' : size === 'large' ? '1em' : '0.9em',
  };

  return (
    <span style={style}>
      {displayValue}
    </span>
  );
};

// Simple icon components
export const PlusOutlined: React.FC = () => <span style={{ marginRight: 5 }}>+</span>;
export const MinusOutlined: React.FC = () => <span style={{ marginRight: 5 }}>-</span>;
export const EditOutlined: React.FC = () => <span style={{ marginRight: 5 }}>✎</span>;

// Simple Statistic component
export const Statistic: React.FC<StatisticProps> = ({ title, value, prefix, valueStyle }) => (
  <div>
    {title && <div style={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.45)' }}>{title}</div>}
    <div style={{ fontSize: '24px', fontWeight: 'bold', ...valueStyle }}>
      {prefix && <span style={{ marginRight: 5 }}>{prefix}</span>}
      {value}
    </div>
  </div>
);

// Helper functions for severity tags
export const getSeverityTagColor = (severity: string): string => {
  const colors = useColors();
  switch (severity.toLowerCase()) {
    case 'critical':
      return colors.status.critical;
    case 'major':
      return colors.status.major;
    case 'minor':
      return colors.status.minor;
    default:
      return colors.status.minor;
  }
};

export const getSeverityTagIcon = (severity: string) => {
  const color = getSeverityTagColor(severity);
  switch (severity.toLowerCase()) {
    case 'critical':
      return <ExclamationCircleOutlined style={{ color }} />;
    case 'major':
      return <WarningOutlined style={{ color }} />;
    case 'minor':
      return <InfoCircleOutlined style={{ color }} />;
    default:
      return <InfoCircleOutlined style={{ color }} />;
  }
};

// Helper functions for change type tags
export const getChangeTypeTagColor = (type: string): string => {
  const colors = useColors();
  switch (type.toLowerCase()) {
    case 'added':
      return colors.status.minor;
    case 'modified':
      return colors.status.major;
    case 'removed':
      return colors.status.critical;
    default:
      return colors.chart.textSecondary;
  }
};

export const getChangeTypeTagIcon = (type: string) => {
  const color = getChangeTypeTagColor(type);
  switch (type.toLowerCase()) {
    case 'added':
      return <AntPlusOutlined style={{ color }} />;
    case 'modified':
      return <AntEditOutlined style={{ color }} />;
    case 'removed':
      return <AntMinusOutlined style={{ color }} />;
    default:
      return <InfoCircleOutlined style={{ color }} />;
  }
};

// Helper functions for status
export const getStatusColor = (status: string): string => {
  const colors = useColors();
  switch (status.toLowerCase()) {
    case 'active':
    case 'current':
    case 'completed':
    case 'released':
      return colors.status.minor;
    case 'pending':
    case 'in progress':
    case 'in development':
    case 'modified':
      return colors.status.major;
    case 'deprecated':
    case 'archived':
      return colors.chart.textSecondary;
    default:
      return colors.status.critical;
  }
};

export const getStatusIcon = (status: string) => {
  const color = getStatusColor(status);
  switch (status.toLowerCase()) {
    case 'active':
    case 'current':
    case 'completed':
    case 'released':
      return <CheckCircleOutlined style={{ color }} />;
    case 'pending':
    case 'in progress':
    case 'in development':
      return <ClockCircleOutlined style={{ color }} />;
    case 'deprecated':
    case 'archived':
      return <InfoCircleOutlined style={{ color }} />;
    default:
      return <ExclamationCircleOutlined style={{ color }} />;
  }
};

// Component for displaying severity
export const SeverityTag: React.FC<{ severity: string }> = ({ severity }) => {
  const colors = useColors();
  const color = getSeverityTagColor(severity);
  
  return (
    <Tag
      icon={getSeverityTagIcon(severity)}
      style={{
        backgroundColor: `${color}15`,
        color: color,
        borderColor: color
      }}
    >
      {severity.toUpperCase()}
    </Tag>
  );
};

// Component for displaying change type
export const ChangeTypeTag: React.FC<{ type: string }> = ({ type }) => {
  const colors = useColors();
  const color = getChangeTypeTagColor(type);
  
  return (
    <Tag
      icon={getChangeTypeTagIcon(type)}
      style={{
        backgroundColor: `${color}15`,
        color: color,
        borderColor: color
      }}
    >
      {type.toUpperCase()}
    </Tag>
  );
};

// Component for displaying a property with label and value
export const PropertyDisplay: React.FC<{
  label: string;
  value: string | number | React.ReactNode;
  labelStyle?: React.CSSProperties;
  valueStyle?: React.CSSProperties;
}> = ({ label, value, labelStyle, valueStyle }) => {
  return (
    <div style={{ marginBottom: '8px' }}>
      <Text type="secondary" style={{ fontSize: '12px', ...labelStyle }}>
        {label}:
      </Text>
      <div style={{ ...valueStyle }}>
        {value}
      </div>
    </div>
  );
};

// Component for displaying item ID with type prefix styling
export const ItemID: React.FC<{ id: string }> = ({ id }) => {
  const colors = useColors();
  const parts = id.split('-');
  let color;
  
  if (parts.length >= 1) {
    const type = parts[0].toLowerCase();
    switch(type) {
      case 'req':
      case 'requirement':
        color = colors.category.requirements;
        break;
      case 'func':
      case 'function':
        color = colors.category.functions;
        break;
      case 'logical':
      case 'log':
        color = colors.chart.series4;
        break;
      case 'cad':
        color = colors.category.cad;
        break;
      case 'bom':
      case 'ebom':
        color = colors.category.bom;
        break;
      case 'mission':
      case 'mis':
        color = colors.category.mission;
        break;
      default:
        color = colors.chart.series8;
    }
  }
  
  return <Text strong style={{ color }}>{id}</Text>;
};

// If file exists, add code to hide Current status labels 

// Code component for backward compatibility
export const Code: React.FC<CodeProps> = ({ children, size = 'default' }) => {
  return <CodeDisplay value={children?.toString()} size={size} />;
}; 