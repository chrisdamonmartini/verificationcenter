import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import '../../styles/tabStyles.css';

export interface StandardTabsProps extends TabsProps {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * StandardTabs - A consistent tab component that matches the Change Awareness tab styling
 * 
 * This component provides standardized tab styling consistent with the design language
 * used in the Change Awareness section of the application.
 */
const StandardTabs: React.FC<StandardTabsProps> = ({ 
  className = '',
  style = {},
  ...props 
}) => {
  return (
    <div className="standard-tabs-container" style={style}>
      <Tabs
        className={`standard-tabs ${className}`}
        type="card"
        size="middle"
        tabBarGutter={8}
        {...props}
      />
    </div>
  );
};

export default StandardTabs; 