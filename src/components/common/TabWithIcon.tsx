import React from 'react';

interface TabWithIconProps {
  icon: string;
  label: string;
  alt?: string;
}

/**
 * TabWithIcon - A reusable component for tab labels with icons
 * This component ensures consistent styling across all tabs in the application
 */
const TabWithIcon: React.FC<TabWithIconProps> = ({ icon, label, alt }) => {
  return (
    <span style={{ 
      display: 'flex', 
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%'
    }}>
      <img
        src={icon}
        alt={alt || label}
        style={{
          width: '24px',
          height: '24px',
          marginRight: '8px',
          verticalAlign: 'middle',
          display: 'inline-block'
        }}
      />
      <span>{label}</span>
    </span>
  );
};

export default TabWithIcon; 