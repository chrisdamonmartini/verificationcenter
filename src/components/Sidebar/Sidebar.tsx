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
  FieldTimeOutlined,
  BellOutlined,
  ClockCircleOutlined,
  ToolOutlined
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
    title: 'Change Awareness',
    path: '/change-awareness',
    icon: <BellOutlined />,
    subNav: [
      {
        title: 'Overview',
        path: '/change-awareness/overview',
        icon: <BranchesOutlined />
      },
      {
        title: 'Mission',
        path: '/change-awareness/mission',
        icon: <RocketOutlined />
      },
      {
        title: 'Operational Scenarios',
        path: '/change-awareness/operational',
        icon: <ClockCircleOutlined />
      },
      {
        title: 'Requirements',
        path: '/change-awareness/requirements',
        icon: <FileProtectOutlined />
      },
      {
        title: 'Functions',
        path: '/change-awareness/functions',
        icon: <ApartmentOutlined />
      },
      {
        title: 'CAD Design',
        path: '/change-awareness/cad',
        icon: <BuildOutlined />
      },
      {
        title: 'Engineering BOM',
        path: '/change-awareness/bom',
        icon: <ToolOutlined />
      }
    ]
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
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Toggle submenu expansion
  const toggleSubNav = (path: string) => {
    if (expandedItems.includes(path)) {
      setExpandedItems(expandedItems.filter(item => item !== path));
    } else {
      setExpandedItems([...expandedItems, path]);
    }
  };

  // Check if this is a parent of the current active view
  const isParentOfActiveView = (path: string) => {
    const pathWithoutSlash = path.replace('/', '');
    return currentView.startsWith(pathWithoutSlash) && pathWithoutSlash !== currentView;
  };

  // Auto-expand parent of active view
  React.useEffect(() => {
    SidebarData.forEach(item => {
      if (isParentOfActiveView(item.path) && !expandedItems.includes(item.path)) {
        setExpandedItems(prev => [...prev, item.path]);
      }
    });
  }, [currentView]);

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
          const isActive = currentView === itemPath || isParentOfActiveView(item.path);
          const isExpanded = expandedItems.includes(item.path);
          const hasSubNav = item.subNav && item.subNav.length > 0;
          
          return (
            <div key={index}>
              <div
                className={`flex items-center justify-between p-3 mb-2 rounded cursor-pointer
                  ${isActive ? 'bg-blue-700' : 'hover:bg-blue-800'}`}
                onClick={() => {
                  if (hasSubNav) {
                    toggleSubNav(item.path);
                  } else {
                    onNavigate(item.path);
                  }
                }}
                title={collapsed ? item.title : undefined}
              >
                <div className="flex items-center">
                  <span className={`text-xl ${collapsed ? 'mx-auto' : 'mr-4'}`}>{item.icon}</span>
                  {!collapsed && <span>{item.title}</span>}
                </div>
                {!collapsed && hasSubNav && (
                  <span>
                    {isExpanded ? (
                      <FaIcons.FaChevronDown className="text-xs" />
                    ) : (
                      <FaIcons.FaChevronRight className="text-xs" />
                    )}
                  </span>
                )}
              </div>
              
              {!collapsed && hasSubNav && isExpanded && (
                <div className="ml-8 mt-2 mb-4">
                  {item.subNav.map((subItem, subIndex) => {
                    const subItemPath = subItem.path.replace('/', '');
                    const isSubItemActive = currentView === subItemPath;
                    
                    return (
                      <div
                        key={subIndex}
                        className={`flex items-center p-2 mb-1 rounded cursor-pointer
                          ${isSubItemActive ? 'bg-blue-700' : 'hover:bg-blue-800'}`}
                        onClick={() => onNavigate(subItem.path)}
                      >
                        <span className="text-sm mr-3">{subItem.icon}</span>
                        <span className="text-sm">{subItem.title}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar; 