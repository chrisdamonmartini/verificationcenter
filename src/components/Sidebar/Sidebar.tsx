import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';
import * as GoIcons from 'react-icons/go';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import * as GiIcons from 'react-icons/gi';
import * as TbIcons from 'react-icons/tb';
import * as VscIcons from 'react-icons/vsc';
import * as ImIcons from 'react-icons/im';
import * as BsIcons from 'react-icons/bs';
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
  WarningOutlined,
  DatabaseOutlined,
  FileProtectOutlined,
  ClusterOutlined,
  BuildOutlined,
  CalculatorOutlined,
  SolutionOutlined,
  TeamOutlined,
  ScheduleOutlined,
  TableOutlined,
  PieChartOutlined,
  BarChartOutlined,
  DollarOutlined,
  FieldTimeOutlined
} from '@ant-design/icons';

// Updated navigation items for Verification Management
export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <HomeOutlined />,
    subNav: []
  },
  {
    title: 'Requirements Mgmt.',
    path: '/requirements',
    icon: <AuditOutlined />,
    subNav: [
      {
        title: 'System Requirements',
        path: '/requirements/system',
        icon: <FileProtectOutlined />
      },
      {
        title: 'Verification Requirements',
        path: '/requirements/verification',
        icon: <CheckCircleOutlined />
      },
      {
        title: 'Requirements Traceability',
        path: '/requirements/traceability',
        icon: <NodeIndexOutlined />
      }
    ]
  },
  {
    title: 'Verification Planning',
    path: '/verification-planning',
    icon: <ProjectOutlined />,
    subNav: [
      {
        title: 'Verification Strategy',
        path: '/verification-planning/strategy',
        icon: <FundOutlined />
      },
      {
        title: 'Test Articles',
        path: '/verification-planning/test-articles',
        icon: <GiIcons.GiCubeforce />
      },
      {
        title: 'Resources Planning',
        path: '/verification-planning/resources',
        icon: <TeamOutlined />
      },
      {
        title: 'Schedule',
        path: '/verification-planning/schedule',
        icon: <ScheduleOutlined />
      }
    ]
  },
  {
    title: 'Verification Matrix',
    path: '/verification-matrix',
    icon: <BsIcons.BsTable />,
    subNav: [
      {
        title: 'Full Matrix View',
        path: '/verification-matrix/full',
        icon: <TableOutlined />
      },
      {
        title: 'Coverage Analysis',
        path: '/verification-matrix/coverage',
        icon: <PieChartOutlined />
      }
    ]
  },
  {
    title: 'Verification Methods',
    path: '/verification-methods',
    icon: <ExperimentOutlined />,
    subNav: [
      {
        title: 'Inspection',
        path: '/verification-methods/inspection',
        icon: <FaIcons.FaSearchPlus />
      },
      {
        title: 'Analysis',
        path: '/verification-methods/analysis',
        icon: <CalculatorOutlined />
      },
      {
        title: 'Demonstration',
        path: '/verification-methods/demonstration',
        icon: <MdIcons.MdPresentToAll />
      },
      {
        title: 'Test',
        path: '/verification-methods/test',
        icon: <VscIcons.VscBeaker />
      },
      {
        title: 'Simulation',
        path: '/verification-methods/simulation',
        icon: <TbIcons.TbDeviceAnalytics />
      }
    ]
  },
  {
    title: 'Test Management',
    path: '/test-management',
    icon: <GiIcons.GiTestTubes />,
    subNav: [
      {
        title: 'Unit Tests',
        path: '/test-management/unit',
        icon: <BsIcons.BsBoxSeam />
      },
      {
        title: 'Integration Tests',
        path: '/test-management/integration',
        icon: <ClusterOutlined />
      },
      {
        title: 'Ground Tests',
        path: '/test-management/ground',
        icon: <GoIcons.GoServer />
      },
      {
        title: 'Flight Tests',
        path: '/test-management/flight',
        icon: <FaIcons.FaPlane />
      }
    ]
  },
  {
    title: 'Simulation',
    path: '/simulation',
    icon: <FaIcons.FaSimCard />,
    subNav: [
      {
        title: 'Models Management',
        path: '/simulation/models',
        icon: <DatabaseOutlined />
      },
      {
        title: 'Simulation Runs',
        path: '/simulation/runs',
        icon: <FaIcons.FaPlayCircle />
      },
      {
        title: 'Results Analysis',
        path: '/simulation/results',
        icon: <FundOutlined />
      }
    ]
  },
  {
    title: 'Test Results',
    path: '/test-results',
    icon: <MdIcons.MdAssessment />,
    subNav: [
      {
        title: 'Data Collection',
        path: '/test-results/data',
        icon: <FaIcons.FaDatabase />
      },
      {
        title: 'Analysis',
        path: '/test-results/analysis',
        icon: <CalculatorOutlined />
      },
      {
        title: 'Anomalies',
        path: '/test-results/anomalies',
        icon: <WarningOutlined />
      }
    ]
  },
  {
    title: 'Assess Compliance',
    path: '/compliance',
    icon: <ImIcons.ImCheckmark />,
    subNav: [
      {
        title: 'Verification Closure',
        path: '/compliance/closure',
        icon: <AiIcons.AiOutlineCheck />
      },
      {
        title: 'Compliance Reports',
        path: '/compliance/reports',
        icon: <SolutionOutlined />
      }
    ]
  },
  {
    title: 'Reports & Analytics',
    path: '/reports',
    icon: <FaIcons.FaChartBar />,
    subNav: [
      {
        title: 'Verification Status',
        path: '/reports/status',
        icon: <PieChartOutlined />
      },
      {
        title: 'Resource Utilization',
        path: '/reports/resources',
        icon: <BarChartOutlined />
      },
      {
        title: 'Cost Analysis',
        path: '/reports/cost',
        icon: <DollarOutlined />
      },
      {
        title: 'Schedule Performance',
        path: '/reports/schedule',
        icon: <FieldTimeOutlined />
      }
    ]
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <SettingOutlined />,
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