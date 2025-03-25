import React from 'react';
import '../../styles/containerStyles.css';

type ContentPanelProps = {
  children: React.ReactNode;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  headerExtra?: React.ReactNode;
};

/**
 * ContentPanel - A standardized container component
 * 
 * This component provides a standardized container with styling consistent
 * with the UI design language used across the application. It includes 
 * a raised effect, proper background colors, and optional title formatting.
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
      style={style}
    >
      {title && (
        <div className="content-panel-header">
          <div className="content-panel-title">{title}</div>
          {headerExtra && <div className="content-panel-extra">{headerExtra}</div>}
        </div>
      )}
      <div className="content-panel-body">
        {children}
      </div>
    </div>
  );
};

export default ContentPanel;
