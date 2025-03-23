import React, { useState } from 'react';
import { Card, Tabs } from 'antd';
import ModelsTab from './tabs/ModelsTab';
import AutomationTab from './tabs/AutomationTab';
import AnalysisIcon from '../../icons/AnalysisItem.svg';
import ModelIcon from '../../icons/AnalysisDataset.svg';
import AutomationIcon from '../../icons/AnalysisRequest.svg';

const { TabPane } = Tabs;

const AnalysisMain: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('analyses');
  
  return (
    <div className="analysis-container" style={{ padding: '20px' }}>
      <Card bordered={false} className="analysis-card">
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          size="large"
          tabBarStyle={{ marginBottom: '16px' }}
        >
          <TabPane 
            tab={
              <span>
                <img src={AnalysisIcon} alt="Analyses" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                Analyses
              </span>
            } 
            key="analyses"
          >
            <div className="analyses-content">
              <p>Analyses tab placeholder. This tab will display the analysis items.</p>
              <p>The analysis functionality is demonstrated in the AnalysisDetail component.</p>
            </div>
          </TabPane>
          
          <TabPane 
            tab={
              <span>
                <img src={ModelIcon} alt="Models" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                Models
              </span>
            } 
            key="models"
          >
            <ModelsTab />
          </TabPane>
          
          <TabPane 
            tab={
              <span>
                <img src={AutomationIcon} alt="Automation" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                Automation
              </span>
            } 
            key="automation"
          >
            <AutomationTab />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default AnalysisMain; 