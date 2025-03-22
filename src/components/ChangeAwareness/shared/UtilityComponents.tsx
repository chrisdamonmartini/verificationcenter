import React from 'react';
import { Tag } from 'antd';
import { 
  InfoCircleOutlined, 
  WarningOutlined, 
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { CodeProps, StatisticProps } from '../../../types/changeAwareness';

// Code display component for IDs
export const Code: React.FC<CodeProps> = ({ children }) => (
  <span 
    style={{ 
      fontFamily: 'monospace',
      backgroundColor: 'rgba(0, 0, 0, 0.06)',
      padding: '2px 4px',
      borderRadius: '3px'
    }}
  >
    {children}
  </span>
);

// Simple icon components
export const PlusCircleOutlined: React.FC = () => <span style={{ marginRight: 5 }}>+</span>;
export const MinusCircleOutlined: React.FC = () => <span style={{ marginRight: 5 }}>-</span>;
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

// Helper functions for consistent tag colors
export const getSeverityTagColor = (severity: string): string => {
  switch (severity) {
    case 'critical': return 'red';
    case 'major': return 'orange';
    case 'minor': return 'green';
    default: return 'default';
  }
};

export const getSeverityTagIcon = (severity: string): React.ReactNode => {
  switch (severity) {
    case 'critical': return <WarningOutlined />;
    case 'major': return <InfoCircleOutlined />;
    case 'minor': return <CheckCircleOutlined />;
    default: return null;
  }
};

export const getChangeTypeTagColor = (changeType: string): string => {
  switch (changeType) {
    case 'added': return 'green';
    case 'removed': return 'red';
    case 'modified': return 'orange';
    default: return 'blue';
  }
};

export const getChangeTypeTagIcon = (changeType: string): React.ReactNode => {
  switch (changeType) {
    case 'added': return <PlusCircleOutlined />;
    case 'removed': return <MinusCircleOutlined />;
    case 'modified': return <EditOutlined />;
    default: return null;
  }
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'approved': return 'success';
    case 'pending': return 'processing';
    case 'rejected': return 'error';
    case 'reviewed': return 'warning';
    default: return 'default';
  }
};

export const getStatusIcon = (status: string): React.ReactNode => {
  switch (status) {
    case 'approved': return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
    case 'rejected': return <ClockCircleOutlined style={{ color: '#ff4d4f' }} />;
    case 'pending': return <ClockCircleOutlined style={{ color: '#faad14' }} />;
    case 'reviewed': return <ExclamationCircleOutlined style={{ color: '#1890ff' }} />;
    default: return null;
  }
};

// Standardized Tag Components
export const SeverityTag: React.FC<{ severity: string }> = ({ severity }) => (
  <Tag color={getSeverityTagColor(severity)} icon={getSeverityTagIcon(severity)}>
    {severity.toUpperCase()}
  </Tag>
);

export const ChangeTypeTag: React.FC<{ type: string }> = ({ type }) => (
  <Tag color={getChangeTypeTagColor(type)} icon={getChangeTypeTagIcon(type)}>
    {type.toUpperCase()}
  </Tag>
);

// If file exists, add code to hide Current status labels 