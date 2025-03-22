import React from 'react';
import { Card } from 'antd';

type ContentPanelProps = {
  children: React.ReactNode;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  headerExtra?: React.ReactNode;
};

/**
 * ContentPanel - A TeamCenter-style container component for content sections
 * 
 * This component provides a standardized container with styling consistent
 * with TeamCenter's UI design language. It includes a raised effect, proper
 * background colors, and optional title formatting.
 */
const ContentPanel: React.FC<ContentPanelProps> = ({
  children,
  title,
  className = '',
  style = {},
  headerExtra
}) => {
  return (
    <div 
      className={`content-panel ${className}`}
      style={{
        backgroundColor: '#f5f5f5', // Light gray background similar to TeamCenter
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)', // Subtle shadow for raised effect
        borderRadius: '4px',
        margin: '0 0 16px 0',
        overflow: 'hidden',
        border: '1px solid #e8e8e8',
        ...style
      }}
    >
      {title && (
        <div 
          style={{
            padding: '12px 16px',
            borderBottom: '1px solid #e8e8e8',
            backgroundColor: '#fafafa',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontWeight: 500,
            fontSize: '14px',
            color: '#454545'
          }}
        >
          <div>{title}</div>
          {headerExtra && <div>{headerExtra}</div>}
        </div>
      )}
      <div style={{ padding: '16px' }}>
        {children}
      </div>
    </div>
  );
};

export default ContentPanel;
