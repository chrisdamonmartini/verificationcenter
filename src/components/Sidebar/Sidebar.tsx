import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';
import {
  HomeOutlined,
  BellOutlined,
  FileProtectOutlined,
  ProjectOutlined,
  CheckCircleOutlined,
  FundOutlined,
  FileSearchOutlined,
  DatabaseOutlined,
  AuditOutlined,
  BarChartOutlined,
  SettingOutlined
} from '@ant-design/icons';

// Updated navigation items for Verification Management - Flattened structure
export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <HomeOutlined />
  },
  {
    title: 'Change Awareness',
    path: '/change-awareness',
    icon: <BellOutlined />
  },
  {
    title: 'Requirements Mgmt.',
    path: '/requirements',
    icon: <FileProtectOutlined />
  },
  {
    title: 'Verification Planning',
    path: '/verification-planning',
    icon: <ProjectOutlined />
  },
  {
    title: 'Test Management',
    path: '/test-management',
    icon: <CheckCircleOutlined />
  },
  {
    title: 'Analysis',
    path: '/simulation',
    icon: <FundOutlined />
  },
  {
    title: 'Test Results',
    path: '/test-results',
    icon: <FileSearchOutlined />
  },
  {
    title: 'Data Management',
    path: '/data-management',
    icon: <DatabaseOutlined />
  },
  {
    title: 'Access Compliance',
    path: '/compliance-assessment',
    icon: <AuditOutlined />
  },
  {
    title: 'Reports & Analytics',
    path: '/reports-analytics',
    icon: <BarChartOutlined />
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <SettingOutlined />
  }
];

interface SidebarProps {
  currentView: string;
  onNavigate: (route: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const [collapsed, setCollapsed] = useState(false);
  
  // Check if this is the current active view
  const isActiveView = (path: string) => {
    const pathWithoutSlash = path.replace('/', '');
    return currentView === pathWithoutSlash;
  };

  return (
    <div 
      className={`bg-[#1e3a8a] text-white min-h-screen transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      } p-4`}
    >
      {/* Collapse Toggle Button */}
      <div className="flex justify-end mb-6">
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="text-white/70 hover:text-white"
        >
          {collapsed ? (
            <FaIcons.FaAngleRight className="text-xl" />
          ) : (
            <FaIcons.FaAngleLeft className="text-xl" />
          )}
        </button>
      </div>

      <nav>
        {/* Main Items - without submenu functionality */}
        {SidebarData.map((item, index) => {
          const itemPath = item.path === '/' ? 'dashboard' : item.path.replace('/', '');
          const isActive = isActiveView(item.path);
          
          return (
            <div 
              key={index}
              className={`flex items-center p-3 mb-2 rounded cursor-pointer
                ${isActive ? 'bg-blue-700' : 'hover:bg-blue-800'}`}
              onClick={() => onNavigate(item.path)}
              title={collapsed ? item.title : undefined}
            >
              <div className="flex items-center">
                <span className={`text-xl ${collapsed ? 'mx-auto' : 'mr-4'}`}>{item.icon}</span>
                {!collapsed && <span>{item.title}</span>}
              </div>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar; 