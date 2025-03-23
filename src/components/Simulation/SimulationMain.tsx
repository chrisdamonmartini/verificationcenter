import React, { useState } from 'react';
import { Card, Tabs } from 'antd';
import AnalysesTab from './AnalysesTab';
import HPCStatus from './HPCStatus';
import ModelsManagement from './ModelsManagement';
import ResultsAnalysis from './ResultsAnalysis';
import SimulationRuns from './SimulationRuns';

const { TabPane } = Tabs;

const SimulationMain: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('models');
  
  return (
    <div className="simulation-container" style={{ padding: '20px' }}>
      <Card bordered={false} className="simulation-card">
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          size="large"
          tabBarStyle={{ marginBottom: '16px' }}
        >
          <TabPane 
            tab="Models"
            key="models"
          >
            <ModelsManagement />
          </TabPane>
          
          <TabPane 
            tab="Simulation Runs"
            key="runs"
          >
            <SimulationRuns />
          </TabPane>
          
          <TabPane 
            tab="Results Analysis"
            key="results"
          >
            <ResultsAnalysis />
          </TabPane>
          
          <TabPane 
            tab="HPC Status"
            key="hpc"
          >
            <HPCStatus />
          </TabPane>
          
          <TabPane 
            tab="Analyses"
            key="analyses"
          >
            <AnalysesTab />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default SimulationMain; 