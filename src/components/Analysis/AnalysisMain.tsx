import React, { useState, useEffect } from 'react';
import { Card, Tabs } from 'antd';
import ModelsTab from './tabs/ModelsTab';
import AutomationTab from './tabs/AutomationTab';
import AnalysesTab from './tabs/AnalysesTab';
import AnalysisIcon from '../../icons/AnalysisItem.svg';
import ModelIcon from '../../icons/AnalysisDataset.svg';
import AutomationIcon from '../../icons/typeAppDeploymentCenterStart48.svg';
import ResultsAnalysisIcon from '../../icons/typeSimulationRequestRevision48.svg';
import SimulationRunsIcon from '../../icons/typeSimulationJob48.svg';
import HPCStatusIcon from '../../icons/typeOperation48.svg';
import HPCStatus from '../Simulation/HPCStatus';
import ResultsAnalysis from '../Simulation/ResultsAnalysis';
import SimulationRuns from '../Simulation/SimulationRuns';
import ContentPanel from '../common/ContentPanel';
import TabWithIcon from '../common/TabWithIcon';
import useColors from '../../hooks/useColors';

const { TabPane } = Tabs;

const AnalysisMain: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('analyses');
  const colors = useColors();
  
  // Add styles for tabs using the color palette
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      /* Analysis tabs styling */
      .analysis-container .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
        color: ${colors.brand.primary} !important;
      }
      
      .analysis-container .ant-tabs-ink-bar {
        background-color: ${colors.brand.primary} !important;
      }
      
      .analysis-container .ant-tabs-tab:hover .ant-tabs-tab-btn {
        color: ${colors.brand.primary} !important;
      }
      
      .analysis-container .ant-pagination-item:hover {
        border-color: ${colors.brand.primary} !important;
      }
      
      .analysis-container .ant-pagination-item:hover a {
        color: ${colors.brand.primary} !important;
      }
      
      .analysis-container .ant-pagination-item-active {
        border-color: ${colors.brand.primary} !important;
      }
      
      .analysis-container .ant-pagination-item-active a {
        color: ${colors.brand.primary} !important;
      }
      
      .analysis-container .ant-pagination-item-link:hover {
        color: ${colors.brand.primary} !important;
        border-color: ${colors.brand.primary} !important;
      }
      
      .analysis-container .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector {
        border-color: ${colors.brand.primary} !important;
        box-shadow: 0 0 0 2px ${colors.brand.primary}33 !important;
      }
    `;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, [colors]);
  
  return (
    <div className="analysis-container">
      <ContentPanel>
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          size="large"
          className="changes-tabs"
        >
          <TabPane 
            tab={<TabWithIcon icon={AnalysisIcon} label="Analyses" />}
            key="analyses"
          >
            <AnalysesTab />
          </TabPane>
          
          <TabPane 
            tab={<TabWithIcon icon={ModelIcon} label="Models" />}
            key="models"
          >
            <ModelsTab />
          </TabPane>
          
          <TabPane 
            tab={<TabWithIcon icon={AutomationIcon} label="Automation" />}
            key="automation"
          >
            <AutomationTab />
          </TabPane>

          <TabPane 
            tab={<TabWithIcon icon={ResultsAnalysisIcon} label="Results Analysis" />}
            key="results"
          >
            <ResultsAnalysis />
          </TabPane>

          <TabPane 
            tab={<TabWithIcon icon={SimulationRunsIcon} label="Simulation Runs" />}
            key="runs"
          >
            <SimulationRuns />
          </TabPane>

          <TabPane 
            tab={<TabWithIcon icon={HPCStatusIcon} label="HPC Status" />}
            key="hpc"
          >
            <HPCStatus />
          </TabPane>
        </Tabs>
      </ContentPanel>
    </div>
  );
};

export default AnalysisMain; 