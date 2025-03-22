import React, { useState, useEffect } from 'react';
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
  SettingOutlined,
  NodeIndexOutlined,
  AppstoreOutlined,
  PlayCircleOutlined,
  BranchesOutlined
} from '@ant-design/icons';
import vcLogo from '../../icons/vc.png';

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
    title: 'Req. Management',
    path: '/requirements',
    icon: <FileProtectOutlined />
  },
  {
    title: 'Verification Mgmt.',
    path: '/verification-planning',
    icon: <FaIcons.FaClipboardCheck />
  },
  {
    title: 'Analysis',
    path: '/simulation',
    icon: <FundOutlined />
  },
  {
    title: 'Test Mgmt.',
    path: '/test-management',
    icon: <CheckCircleOutlined />
  },
  {
    title: 'Flight Test',
    path: '/flight-test',
    icon: <FaIcons.FaPlane />
  },
  {
    title: 'Test Results',
    path: '/test-results',
    icon: <FileSearchOutlined />
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
  // Check if this is the current active view
  const isActiveView = (path: string) => {
    const pathWithoutSlash = path.replace('/', '');
    return currentView === pathWithoutSlash;
  };

  return (
    <div 
      className="text-white min-h-screen"
      style={{
        position: 'fixed',
        top: '0px', // Position from the top of the page
        left: 0,
        bottom: 0,
        zIndex: 999,
        width: '60px',
        flexShrink: 0,
        overflowY: 'auto',
        height: '100vh', // Full height
        backgroundColor: '#00688C', // Match header color
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
      }}
    >
      {/* VC logo in a square matching sidebar color */}
      <div style={{
        width: '60px', 
        height: '60px', 
        backgroundColor: '#00688C', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center'
      }}>
        <img src={vcLogo} alt="VC Logo" style={{ width: '40px', height: '40px' }} />
      </div>
      
      {/* Add spacer div to push content below header and subheader */}
      <div style={{ height: '30px' }}></div>
      
      <nav>
        {/* Main Items with icons above text */}
        {SidebarData.map((item, index) => {
          const itemPath = item.path === '/' ? 'dashboard' : item.path.replace('/', '');
          const isActive = isActiveView(item.path);
          
          return (
            <div 
              key={index}
              className="flex flex-col items-center justify-center cursor-pointer"
              onClick={() => onNavigate(item.path)}
              title={item.title} // Tooltip showing the full title on hover
              style={{
                height: '60px',
                marginTop: '6px',
                marginBottom: '6px',
                padding: '4px 0',
                backgroundColor: isActive ? '#004C6C' : 'transparent',
                transition: 'background-color 0.2s ease-in-out',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = '#004C6C';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {/* Icon on top */}
              <div className="flex items-center justify-center mb-1">
                <span className="text-lg">{item.icon}</span>
              </div>
              
              {/* Text label below */}
              <div className="text-center">
                <span style={{ 
                  fontSize: '10px', 
                  fontFamily: 'Arial, sans-serif',
                  lineHeight: '1.1',
                  display: 'block',
                  width: '56px',
                  height: '24px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'normal'
                }}>
                  {item.title}
                </span>
              </div>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar; 