import React, { useState, useEffect } from 'react';
import './App.css';
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';
import * as GiIcons from 'react-icons/gi';
import Sidebar from './components/Sidebar/Sidebar';
import { motion } from 'framer-motion';
import VerificationDashboard from './components/VerificationDashboard';
import VerificationMatrixView from './components/VerificationMatrix/VerificationMatrixView';
// Import Siemens logo
import siemensLogo from './icons/siemens.png';
// Import Tab icon
import { ReactComponent as TabIcon } from './icons/TabIcon.svg';
// Import our simulation components
import ModelsManagementComponent from './components/Simulation/ModelsManagement';
import SimulationRunsComponent from './components/Simulation/SimulationRuns';
import ResultsAnalysisComponent from './components/Simulation/ResultsAnalysis';
// Import our test management components
import UnitTestsComponent from './components/TestManagement/UnitTests';
import IntegrationTestsComponent from './components/TestManagement/IntegrationTests';
import GroundTests from './components/TestManagement/GroundTests';
import FlightTests from './components/TestManagement/FlightTests';
// Import verification methods components
import Inspection from './components/VerificationMethods/Inspection';
import Analysis from './components/VerificationMethods/Analysis';
import Demonstration from './components/VerificationMethods/Demonstration';
import Test from './components/VerificationMethods/Test';
import Simulation from './components/VerificationMethods/Simulation';
import DataCollection from './components/DataManagement/DataCollection';
// Import verification planning components
import VerificationStrategyComponent from './components/VerificationPlanning/VerificationStrategy';
import TestArticlesComponent from './components/VerificationPlanning/TestArticles';
import ResourcesPlanningComponent from './components/VerificationPlanning/ResourcesPlanning';
import VerificationScheduleComponent from './components/VerificationPlanning/VerificationSchedule';
import VerificationClosureComponent from './components/ComplianceAssessment/VerificationClosure';
import ComplianceReportsComponent from './components/ComplianceAssessment/ComplianceReports';
// Import requirements management components
import RequirementsManagementComponent from './components/RequirementsManagement/RequirementsManagement';
// Import reports and analytics components
import VerificationStatusComponent from './components/ReportsAnalytics/VerificationStatus';
import ResourceUtilizationComponent from './components/ReportsAnalytics/ResourceUtilization';
import CostAnalysisComponent from './components/ReportsAnalytics/CostAnalysis';
import SchedulePerformanceComponent from './components/ReportsAnalytics/SchedulePerformance';
// Import Settings component
import Settings from './components/Settings/Settings';
// Import context providers
import { ProductProvider } from './context/ProductContext';
import { TeamcenterProvider } from './context/TeamcenterContext';
// Import Change Awareness components
import ChangeAwareness from './components/ChangeAwareness/ChangeAwareness';
import CADDesignChanges from './components/ChangeAwareness/CADDesignChanges';
import EngineeringBOMChanges from './components/ChangeAwareness/EngineeringBOMChanges';
import { FlightTestManagement } from './components/FlightTest/FlightTestManagement';
import { Aircraft } from './types';
import DigitalThread from './components/DigitalThread/DigitalThread';
// Import the SidebarData to get access to menu items
import { SidebarData } from './components/Sidebar/Sidebar';

// Define a type for requirements
interface Requirement {
  id: string;
  title: string;
  description: string;
  type: string;
  priority: string;
  status: string;
  source: string;
  verification: string;
  compliance: string;
  category: string;
}

// Define a type for system functions
interface SystemFunction {
  id: string;
  name: string;
  description: string;
  level: number;
  parent: string | null;
  inputs: string[];
  outputs: string[];
  allocation: string[];
  status: 'Defined' | 'In Analysis' | 'Verified' | 'Draft';
  category: string;
}

// Define a type for logical architecture blocks
interface LogicalBlock {
  id: string;
  name: string;
  description: string;
  category: string;
  parent: string | null;
  status: string;
  requirements: string[];
}

// Define a type for logical interfaces
interface LogicalInterface {
  id: string;
  name: string;
  description: string;
  type: string;
  source: string;
  target: string;
  signals: string[];
}

// Define a type for physical components
interface PhysicalComponent {
  id: string;
  name: string;
  description: string;
  category: string;
  parent: string | null;
  status: string;
  weight: number;
  dimensions: string;
  material: string;
  supplier: string;
  logicalAllocation: string[];
  requirements: string[];
}

// Define a type for physical interfaces
interface PhysicalInterface {
  id: string;
  name: string;
  description: string;
  type: string;
  sourceComponent: string;
  targetComponent: string;
  specification: string;
}

// Replace the existing Dashboard component with our VerificationDashboard
const Dashboard = () => <VerificationDashboard />;

// Use the new RequirementsManagement component instead of placeholders
const SystemRequirements = () => <RequirementsManagementComponent />;

const VerificationRequirements = () => <RequirementsManagementComponent />;

const RequirementsTraceability = () => <RequirementsManagementComponent />;

// Placeholder components for verification planning
const VerificationStrategy = () => <VerificationStrategyComponent />;

const TestArticles = () => <TestArticlesComponent />;

const ResourcesPlanning = () => <ResourcesPlanningComponent />;

const VerificationSchedule = () => <VerificationScheduleComponent />;

// Use the new VerificationMatrixView component
const FullMatrixView = () => <VerificationMatrixView />;

const CoverageAnalysis = () => (
      <div className="bg-white p-6 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-6">Coverage Analysis</h2>
    <p className="text-gray-600 mb-4">Analyze verification coverage and identify gaps.</p>
          </div>
  );

// Replace placeholder components for verification methods
const InspectionMethod = () => <Inspection />;
const AnalysisMethod = () => <Analysis />;
const DemonstrationMethod = () => <Demonstration />;
const TestMethod = () => <Test />;
const SimulationMethod = () => <Simulation />;

// Replace placeholder components for test management
const UnitTests = () => <UnitTestsComponent />;
const IntegrationTests = () => <IntegrationTestsComponent />;

// Replace placeholder components for simulation
const ModelsManagement = () => <ModelsManagementComponent />;
const SimulationRuns = () => <SimulationRunsComponent />;
const ResultsAnalysis = () => <ResultsAnalysisComponent />;

const DataCollectionTab = () => <DataCollection />;

// Placeholder components for test results
const ResultsAnalysisTab = () => (
        <div className="bg-white p-6 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-6">Results Analysis</h2>
    <p className="text-gray-600 mb-4">Analyze and interpret test data to verify requirements.</p>
    </div>
  );

const Anomalies = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-6">Anomalies</h2>
    <p className="text-gray-600 mb-4">Track and manage test anomalies and their resolution.</p>
                    </div>
  );

// Verification Closure tab
const VerificationClosureTab = () => {
  return <VerificationClosureComponent />;
};

// Compliance Reports tab
const ComplianceReportsTab = () => {
  return <ComplianceReportsComponent />;
};

// Placeholder components for compliance assessment
const VerificationClosure = () => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-6">Verification Closure</h2>
    <p className="text-gray-600 mb-4">Close out verification activities and document compliance.</p>
        </div>
      );

const ComplianceReports = () => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-6">Compliance Reports</h2>
    <p className="text-gray-600 mb-4">Generate and manage compliance reports.</p>
      </div>
    );

// Replace placeholder components for reports and analytics
const VerificationStatus = () => <VerificationStatusComponent />;

const ResourceUtilization = () => <ResourceUtilizationComponent />;

const CostAnalysis = () => <CostAnalysisComponent />;

const SchedulePerformance = () => <SchedulePerformanceComponent />;

// Digital Thread (with three tabs)
const DigitalThreadComponent = () => <DigitalThread />;

// Main App function
function App() {
  const [activeView, setActiveView] = useState<string>('dashboard');
  
  // Function to pass to the Sidebar component
  const handleNavigation = (route: string) => {
    setActiveView(route.replace('/', '') || 'dashboard');
  };

  // Render the appropriate content based on currentView
  const renderContent = () => {
    switch (activeView) {
      // Main dashboard
      case 'dashboard':
        return <Dashboard />;
        
      // Requirements Management
      case 'requirements/system':
        return <SystemRequirements />;
      case 'requirements/verification':
        return <VerificationRequirements />;
      case 'requirements/traceability':
        return <RequirementsTraceability />;
      case 'requirements':
        return <SystemRequirements />;
        
      // Verification Planning
      case 'verification-planning/strategy':
        return <VerificationStrategy />;
      case 'verification-planning/test-articles':
        return <TestArticles />;
      case 'verification-planning/resources':
        return <ResourcesPlanning />;
      case 'verification-planning/schedule':
        return <VerificationSchedule />;
      case 'verification-planning':
        return <VerificationStrategy />;
        
      // Verification Matrix
      case 'verification-matrix/full':
        return <FullMatrixView />;
      case 'verification-matrix/coverage':
        return <CoverageAnalysis />;
      case 'verification-matrix':
        return <FullMatrixView />;
        
      // Verification Methods
      case 'verification-methods/inspection':
        return <InspectionMethod />;
      case 'verification-methods/analysis':
        return <AnalysisMethod />;
      case 'verification-methods/demonstration':
        return <DemonstrationMethod />;
      case 'verification-methods/test':
        return <TestMethod />;
      case 'verification-methods/simulation':
        return <SimulationMethod />;
      case 'verification-methods':
        return <InspectionMethod />;
        
      // Test Management
      case 'test-management/unit':
        return <UnitTests />;
      case 'test-management/integration':
        return <IntegrationTests />;
      case 'test-management/ground':
        return <GroundTests />;
      case 'test-management/flight':
        return <FlightTests />;
      case 'test-management':
        return <UnitTests />;
        
      // Flight Test
      case 'flight-test':
        return <FlightTestManagement aircraft={[]} />;
        
      // Simulation/Analysis routes
      case 'simulation/models':
        return <ModelsManagement />;
      case 'simulation/runs':
        return <SimulationRuns />;
      case 'simulation/results':
        return <ResultsAnalysis />;
      case 'simulation':
        return <ModelsManagement />;
      
      // Digital Thread route - should show the component with three tabs
      case 'digital-thread':
        return <DigitalThreadComponent />;
        
      // Test Results
      case 'test-results/data':
        return <DataCollectionTab />;
      case 'test-results/analysis':
        return <ResultsAnalysisTab />;
      case 'test-results/anomalies':
        return <Anomalies />;
      case 'test-results':
        return <DataCollectionTab />;
        
      // Compliance Assessment
      case 'compliance-assessment':
      case 'compliance/closure':
        return <VerificationClosureTab />;
      case 'compliance/reports':
        return <ComplianceReportsTab />;
      case 'compliance':
        return <VerificationClosureTab />;
        
      // Reports & Analytics
      case 'reports-analytics':
      case 'reports/status':
        return <VerificationStatus />;
      case 'reports/resources':
        return <ResourceUtilization />;
      case 'reports/cost':
        return <CostAnalysis />;
      case 'reports/schedule':
        return <SchedulePerformance />;
      case 'reports':
        return <VerificationStatus />;

      // Handle deprecated routes
      case 'verification':
        return <FullMatrixView />;
      case 'functions':
      case 'logical':
      case 'physical':
      case 'program':
      case 'risks':
      case 'trade-studies':
      case 'integration':
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold">This module has been migrated</h2>
            <p className="mt-2">This functionality has been moved to the new verification management structure.</p>
        <button 
              onClick={() => setActiveView('dashboard')}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Go to Dashboard
        </button>
    </div>
  );
        
      // Settings
      case 'settings':
        return <Settings />;

      // Change Awareness
      case 'change-awareness':
      case 'change-awareness/overview':
        return <ChangeAwareness />;
      case 'change-awareness/mission':
      case 'change-awareness/operational':
      case 'change-awareness/requirements':
      case 'change-awareness/functions':
      case 'change-awareness/cad':
      case 'change-awareness/bom':
        return <ChangeAwareness />;
        
      default:
        return (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold">Page not found</h2>
            <button 
              onClick={() => setActiveView('dashboard')}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Return to Dashboard
            </button>
          </div>
        );
    }
  };

  // Function to get current page title based on activeView
  const getCurrentPageTitle = () => {
    // If we're on the dashboard (root path)
    if (activeView === 'dashboard') return 'Dashboard';
    
    // Otherwise, find the matching route in SidebarData
    const sidebarItem = SidebarData.find(item => 
      item.path.replace('/', '') === activeView
    );
    
    return sidebarItem ? sidebarItem.title : 'Verification Center';
  };

  return (
    <ProductProvider>
      <TeamcenterProvider>
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header and Subheader container */}
      <div className="relative">
        {/* Header */}
        <header className="text-white py-2 px-4 flex items-center justify-between" style={{ backgroundColor: '#00688C', height: '42px', zIndex: 1000 }}>
          {/* Placeholder for tab space */}
          <div style={{ marginLeft: '60px', visibility: 'hidden' }}>
            <span className="text-transparent">Verificationcenter</span>
          </div>
          
          {/* Siemens Logo on right side */}
          <div className="mr-6" style={{ display: 'flex', alignItems: 'center' }}>
            <img src={siemensLogo} alt="Siemens Logo" height="16" style={{ width: 'auto', maxHeight: '16px' }} />
          </div>
        </header>

        {/* Subheader */}
        <div style={{ backgroundColor: '#003750', height: '48px', zIndex: 990 }} className="flex items-center">
          {/* Vertical bar and current page title - positioned just after the tab */}
          <div className="flex" style={{ marginLeft: '300px', position: 'relative' }}>
            {/* Vertical bar positioned clearly to the left of title */}
            <div style={{ 
              width: '6px', 
              height: '28px', 
              backgroundColor: '#ABE7F6',
              position: 'absolute',
              left: '-6px',
              top: '0'
            }}></div>
            <div style={{ 
              backgroundColor: '#ABE7F6', 
              padding: '4px 14px',
              height: '28px',
              lineHeight: '20px',
              color: '#003750',
              fontWeight: 500,
              fontSize: '14px'
            }}>
              {getCurrentPageTitle()}
            </div>
          </div>
        </div>
        
        {/* Tab that overlays both header and subheader */}
        <div 
          className="absolute flex items-center" 
          style={{ 
            left: '60px',
            top: '10px',
            zIndex: 995,
            height: '32px'
          }}
        >
          {/* Create the tab shape with polygon clip-path */}
          <div 
            className="flex items-center pl-3 pr-6"
            style={{
              backgroundColor: '#003750',
              height: '100%',
              clipPath: 'polygon(0 0, 95% 0, 100% 100%, 0 100%)',
              paddingRight: '30px'
            }}
          >
            <TabIcon width="24" height="24" className="mr-2" />
            <span className="text-white font-normal text-xl" style={{ textTransform: 'none' }}>Verificationcenter</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar */}
        <Sidebar currentView={activeView} onNavigate={handleNavigation} />
    
        {/* Main Content Area */}
        <main 
          className="flex-grow p-4 overflow-auto transition-all duration-300" 
          style={{ 
            marginLeft: '60px',
            width: 'calc(100% - 60px)',
            marginTop: '90px', /* This positions content below header and subheader */
            position: 'fixed',
            top: '0',
            right: '0',
            bottom: '0',
            overflowY: 'auto'
          }}
        >
          {renderContent()}
        </main>
      </div>
    </div>
      </TeamcenterProvider>
    </ProductProvider>
  );
}

export default App; 