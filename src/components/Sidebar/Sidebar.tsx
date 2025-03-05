import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';
import * as GoIcons from 'react-icons/go';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import * as GiIcons from 'react-icons/gi';
import { motion } from 'framer-motion';
import { 
  HomeOutlined,
  RocketOutlined,
  FundOutlined,
  ExperimentOutlined,
  ApartmentOutlined,
  NodeIndexOutlined,
  SettingOutlined,
  FileSearchOutlined,
  AuditOutlined,
  BranchesOutlined,
  ProjectOutlined,
  CheckCircleOutlined,
  WarningOutlined
} from '@ant-design/icons';

// Update the navigation items array for Systems Engineering
export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <HomeOutlined />,
    subNav: []
  },
  {
    title: 'Requirements',
    path: '/requirements',
    icon: <AuditOutlined />,
    subNav: []
  },
  {
    title: 'Functions',
    path: '/functions',
    icon: <BranchesOutlined />,
    subNav: []
  },
  {
    title: 'Logical Architecture',
    path: '/logical',
    icon: <ApartmentOutlined />,
    subNav: []
  },
  {
    title: 'Physical Architecture',
    path: '/physical',
    icon: <NodeIndexOutlined />,
    subNav: []
  },
  {
    title: 'Program Management',
    path: '/program',
    icon: <ProjectOutlined />,
    subNav: []
  },
  {
    title: 'Risk Management',
    path: '/risks',
    icon: <WarningOutlined />,
    subNav: []
  },
  {
    title: 'Trade Studies',
    path: '/trade-studies',
    icon: <FundOutlined />,
    subNav: []
  },
  {
    title: 'Verification Matrix',
    path: '/verification',
    icon: <CheckCircleOutlined />,
    subNav: []
  },
  {
    title: 'Integration',
    path: '/integration',
    icon: <GiIcons.GiGears />,
    subNav: []
  },
  {
    title: 'Reports',
    path: '/reports',
    icon: <FaIcons.FaChartBar />,
    subNav: []
  }
];

interface SidebarProps {
  currentView: string;
  onNavigate: (route: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const [collapsed, setCollapsed] = useState(false);

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
        {SidebarData.map((item, index) => {
          const itemPath = item.path === '/' ? 'dashboard' : item.path.replace('/', '');
          
          return (
            <div
              key={index}
              className={`flex items-center p-3 mb-2 rounded cursor-pointer
                ${currentView === itemPath ? 'bg-blue-700' : 'hover:bg-blue-800'}`}
              onClick={() => onNavigate(item.path)}
              title={collapsed ? item.title : undefined}
            >
              <span className={`text-xl ${collapsed ? 'mx-auto' : 'mr-4'}`}>{item.icon}</span>
              {!collapsed && <span>{item.title}</span>}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar; 