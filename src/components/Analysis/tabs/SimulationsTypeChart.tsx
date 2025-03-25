import React from 'react';
import { Pie } from '@ant-design/charts';
import { Card, Typography } from 'antd';
import { RightOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface SimulationTypeData {
  type: string;
  value: number;
  color: string;
}

interface SimulationsTypeChartProps {
  data: SimulationTypeData[];
}

const SimulationsTypeChart: React.FC<SimulationsTypeChartProps> = ({ data }) => {
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    legend: false,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ value }: { value: number }) => `${value}`,
      style: {
        fontSize: 14,
        textAlign: 'center',
        fill: '#fff',
      },
    },
    color: data.map(item => item.color),
    interactions: [{ type: 'element-active' }],
  };

  return (
    <Card 
      style={{ marginTop: 24, marginBottom: 24, borderRadius: 4, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
      bodyStyle={{ padding: 16 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Title level={5} style={{ margin: 0 }}>Simulations by Type</Title>
        <RightOutlined style={{ color: '#8c8c8c' }} />
      </div>
      <div style={{ height: 320 }}>
        <Pie {...config} />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 16 }}>
        {data.map((item, index) => (
          <div key={index} style={{ marginRight: 24, marginBottom: 8, display: 'flex', alignItems: 'center' }}>
            <div style={{ width: 12, height: 12, backgroundColor: item.color, marginRight: 8, borderRadius: 2 }} />
            <span>{item.type}</span>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: 16, color: '#8c8c8c' }}>
        Total: {data.reduce((sum, item) => sum + item.value, 0)} simulations
      </div>
    </Card>
  );
};

export default SimulationsTypeChart; 