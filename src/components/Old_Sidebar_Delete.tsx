import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as GiIcons from 'react-icons/gi';
import { motion } from 'framer-motion';
import { FaClipboardCheck } from 'react-icons/fa';

interface SidebarProps {
  onNavigate: (route: string) => void;
  currentView: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate, currentView }) => {
  const [collapsed, setCollapsed] = useState(false);
  
  // Handle navigation
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, route: string) => {
    e.preventDefault();
    onNavigate(route);
  };
  
  return (
    <div 
      className={`bg-blue-900 text-white shadow-lg h-full transition-all duration-300 flex flex-col ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className={`py-4 ${collapsed ? 'px-3' : 'px-6'} border-b border-blue-800 flex items-center`}>
        {collapsed ? (
          <div className="flex justify-center w-full">
            <button 
              className="text-blue-300 hover:text-white"
              onClick={() => setCollapsed(!collapsed)}
            >
              <FaIcons.FaAngleRight className="text-xl" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <FaIcons.FaList className="text-blue-300 mr-2" />
            </div>
            <button 
              className="text-blue-300 hover:text-white"
              onClick={() => setCollapsed(!collapsed)}
            >
              <FaIcons.FaAngleLeft className="text-xl" />
            </button>
          </div>
        )}
      </div>
      
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1">
          <motion.li whileHover={{ x: collapsed ? 0 : 5 }}>
            <a 
              href="#dashboard"
              onClick={(e) => handleNavClick(e, '/dashboard')}
              className={`flex items-center py-3 px-4 transition-colors ${
                currentView === 'dashboard' 
                  ? 'bg-blue-800 text-white' 
                  : 'hover:bg-blue-800'
              }`}
              title="Dashboard"
            >
              <FaIcons.FaTachometerAlt className={`text-xl ${collapsed ? 'mx-auto' : 'mr-3'}`} />
              {!collapsed && <span>Dashboard</span>}
            </a>
          </motion.li>
          
          <motion.li whileHover={{ x: collapsed ? 0 : 5 }}>
            <a 
              href="#fleet"
              onClick={(e) => handleNavClick(e, '/fleet')}
              className={`flex items-center py-3 px-4 transition-colors ${
                currentView === 'fleet' 
                  ? 'bg-blue-800 text-white' 
                  : 'hover:bg-blue-800'
              }`}
              title="Fleet Management"
            >
              <FaIcons.FaPlaneArrival className={`text-xl ${collapsed ? 'mx-auto' : 'mr-3'}`} />
              {!collapsed && <span>Fleet Management</span>}
            </a>
          </motion.li>
          
          <motion.li whileHover={{ x: collapsed ? 0 : 5 }}>
            <a 
              href="#schedule"
              onClick={(e) => handleNavClick(e, '/schedule')}
              className={`flex items-center py-3 px-4 transition-colors ${
                currentView === 'schedule' 
                  ? 'bg-blue-800 text-white' 
                  : 'hover:bg-blue-800'
              }`}
              title="Mission Schedule"
            >
              <BiIcons.BiCalendarEvent className={`text-xl ${collapsed ? 'mx-auto' : 'mr-3'}`} />
              {!collapsed && <span>Mission Schedule</span>}
            </a>
          </motion.li>
          
          <motion.li whileHover={{ x: collapsed ? 0 : 5 }}>
            <a 
              href="#personnel"
              onClick={(e) => handleNavClick(e, '/personnel')}
              className={`flex items-center py-3 px-4 transition-colors ${
                currentView === 'personnel' 
                  ? 'bg-blue-800 text-white' 
                  : 'hover:bg-blue-800'
              }`}
              title="Personnel"
            >
              <FaIcons.FaUsersCog className={`text-xl ${collapsed ? 'mx-auto' : 'mr-3'}`} />
              {!collapsed && <span>Personnel</span>}
            </a>
          </motion.li>
          
          <motion.li whileHover={{ x: collapsed ? 0 : 5 }}>
            <a 
              href="#inventory"
              onClick={(e) => handleNavClick(e, '/inventory')}
              className={`flex items-center py-3 px-4 transition-colors ${
                currentView === 'inventory' 
                  ? 'bg-blue-800 text-white' 
                  : 'hover:bg-blue-800'
              }`}
              title="Parts Inventory"
            >
              <FaIcons.FaBoxes className={`text-xl ${collapsed ? 'mx-auto' : 'mr-3'}`} />
              {!collapsed && <span>Parts Inventory</span>}
            </a>
          </motion.li>
          
          <motion.li whileHover={{ x: collapsed ? 0 : 5 }}>
            <a 
              href="#flight-test"
              onClick={(e) => handleNavClick(e, '/flight-test')}
              className={`flex items-center py-3 px-4 transition-colors ${
                currentView === 'flight-test' 
                  ? 'bg-blue-800 text-white' 
                  : 'hover:bg-blue-800'
              }`}
              title="Flight Test"
            >
              <FaClipboardCheck className={`text-xl ${collapsed ? 'mx-auto' : 'mr-3'}`} />
              {!collapsed && <span>Flight Test</span>}
            </a>
          </motion.li>
          
          <motion.li whileHover={{ x: collapsed ? 0 : 5 }}>
            <a 
              href="#reports"
              onClick={(e) => handleNavClick(e, '/reports')}
              className={`flex items-center py-3 px-4 transition-colors ${
                currentView === 'reports' 
                  ? 'bg-blue-800 text-white' 
                  : 'hover:bg-blue-800'
              }`}
              title="Reports"
            >
              <FaIcons.FaChartBar className={`text-xl ${collapsed ? 'mx-auto' : 'mr-3'}`} />
              {!collapsed && <span>Reports</span>}
            </a>
          </motion.li>
          
          <motion.li whileHover={{ x: collapsed ? 0 : 5 }}>
            <a 
              href="#maintenance"
              onClick={(e) => handleNavClick(e, 'maintenance')}
              className={`flex items-center py-3 px-4 transition-colors ${
                currentView === 'maintenance' 
                  ? 'bg-blue-800 text-white' 
                  : 'hover:bg-blue-800'
              }`}
              title="Maintenance Schedule"
            >
              <FaIcons.FaTools className={`text-xl ${collapsed ? 'mx-auto' : 'mr-3'}`} />
              {!collapsed && <span>Maintenance Schedule</span>}
            </a>
          </motion.li>
          
          <motion.li whileHover={{ x: collapsed ? 0 : 5 }}>
            <a 
              href="#repairs"
              onClick={(e) => handleNavClick(e, 'repairs')}
              className={`flex items-center py-3 px-4 transition-colors ${
                currentView === 'repairs' 
                  ? 'bg-blue-800 text-white' 
                  : 'hover:bg-blue-800'
              }`}
              title="Repair Tracker"
            >
              <FaIcons.FaWrench className={`text-xl ${collapsed ? 'mx-auto' : 'mr-3'}`} />
              {!collapsed && <span>Repair Tracker</span>}
            </a>
          </motion.li>
        </ul>
      </nav>
      
      <div className="border-t border-blue-800 py-4">
        <button 
          onClick={(e) => handleNavClick(e as any, 'settings')}
          className={`flex items-center py-3 px-4 w-full transition-colors ${
            currentView === 'settings' 
              ? 'bg-blue-800 text-white' 
              : 'hover:bg-blue-800'
          }`}
          title="Settings"
        >
          <FaIcons.FaCog className={`text-xl ${collapsed ? 'mx-auto' : 'mr-3'}`} />
          {!collapsed && <span>Settings</span>}
        </button>

        {collapsed ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center">
              <span className="font-semibold text-sm">JD</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center px-6">
            <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center mr-3">
              <span className="font-semibold text-sm">JD</span>
            </div>
            <div>
              <div className="text-sm font-medium">John Doe</div>
              <div className="text-xs text-blue-300">Maintenance Officer</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar; 