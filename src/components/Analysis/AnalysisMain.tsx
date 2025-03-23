import React, { useState } from 'react';
import { Card, Tabs } from 'antd';
import ModelsTab from './tabs/ModelsTab';
import AutomationTab from './tabs/AutomationTab';
import AnalysesTab from './tabs/AnalysesTab';
import AnalysisIcon from '../../icons/AnalysisItem.svg';
import ModelIcon from '../../icons/AnalysisDataset.svg';
import AutomationIcon from '../../icons/AnalysisRequest.svg';
import ResultsAnalysisIcon from '../../icons/typeSimulationRequestRevision48.svg';
import SimulationRunsIcon from '../../icons/typeSimulationJob48.svg';
import HPCStatusIcon from '../../icons/typeOperation48.svg';
import HPCStatus from '../Simulation/HPCStatus';
import ResultsAnalysis from '../Simulation/ResultsAnalysis';
import SimulationRuns from '../Simulation/SimulationRuns';
import ContentPanel from '../common/ContentPanel';

const { TabPane } = Tabs;

const AnalysisMain: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('analyses');
  
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
            tab={
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <img src={AnalysisIcon} alt="Analyses" style={{ width: '24px', height: '24px', marginRight: '8px', verticalAlign: 'middle', display: 'inline-block' }} />
                <span>Analyses</span>
              </span>
            } 
            key="analyses"
          >
            <AnalysesTab />
          </TabPane>
          
          <TabPane 
            tab={
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <img src={ModelIcon} alt="Models" style={{ width: '24px', height: '24px', marginRight: '8px', verticalAlign: 'middle', display: 'inline-block' }} />
                <span>Models</span>
              </span>
            } 
            key="models"
          >
            <ModelsTab />
          </TabPane>
          
          <TabPane 
            tab={
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <img src={AutomationIcon} alt="Automation" style={{ width: '24px', height: '24px', marginRight: '8px', verticalAlign: 'middle', display: 'inline-block' }} />
                <span>Automation</span>
              </span>
            } 
            key="automation"
          >
            <AutomationTab />
          </TabPane>

          <TabPane 
            tab={
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <img src={ResultsAnalysisIcon} alt="Results Analysis" style={{ width: '24px', height: '24px', marginRight: '8px', verticalAlign: 'middle', display: 'inline-block' }} />
                <span>Results Analysis</span>
              </span>
            } 
            key="results"
          >
            <ResultsAnalysis />
          </TabPane>

          <TabPane 
            tab={
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <img src={SimulationRunsIcon} alt="Simulation Runs" style={{ width: '24px', height: '24px', marginRight: '8px', verticalAlign: 'middle', display: 'inline-block' }} />
                <span>Simulation Runs</span>
              </span>
            } 
            key="runs"
          >
            <SimulationRuns />
          </TabPane>

          <TabPane 
            tab={
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <img src={HPCStatusIcon} alt="HPC Status" style={{ width: '24px', height: '24px', marginRight: '8px', verticalAlign: 'middle', display: 'inline-block' }} />
                <span>HPC Status</span>
              </span>
            } 
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