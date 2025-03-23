import React from 'react';
import { Card } from 'antd';
import ModelsManagement from '../Simulation/ModelsManagement';

const ModelManagementView: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Card 
        title="Model Management"
        bordered={false}
        className="model-management-card"
      >
        <ModelsManagement />
      </Card>
    </div>
  );
};

export default ModelManagementView; 