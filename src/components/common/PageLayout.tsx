import React, { ReactNode } from 'react';
import { Typography, Breadcrumb } from 'antd';
import '../../styles/containerStyles.css';

const { Title } = Typography;

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  breadcrumbs?: Array<{ title: string; path?: string }>;
  actions?: ReactNode;
}

/**
 * PageLayout - A standardized page layout component
 * 
 * This component provides consistent page structure with title, optional subtitle,
 * breadcrumbs, and action buttons.
 */
const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  subtitle,
  children,
  breadcrumbs,
  actions
}) => {
  return (
    <div className="page-container">
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        marginBottom: '16px' 
      }}>
        <div>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <Breadcrumb 
              items={breadcrumbs.map(item => ({ 
                title: item.path ? <a href={item.path}>{item.title}</a> : item.title
              }))}
              style={{ marginBottom: '8px' }}
            />
          )}
          <Title level={3} style={{ margin: 0 }}>{title}</Title>
          {subtitle && <p style={{ margin: '4px 0 0 0', color: '#666' }}>{subtitle}</p>}
        </div>
        
        {actions && (
          <div className="page-actions">{actions}</div>
        )}
      </div>
      
      {children}
    </div>
  );
};

export default PageLayout; 