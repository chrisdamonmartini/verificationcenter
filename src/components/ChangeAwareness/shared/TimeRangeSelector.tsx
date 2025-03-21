import React from 'react';
import { Space, Typography, Slider } from 'antd';

const { Text } = Typography;

interface TimeRangeSelectorProps {
  weeks: number;
  setWeeks: (weeks: number) => void;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({ weeks, setWeeks }) => {
  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
        <Text style={{ marginRight: 8 }}>Time Period: {weeks} weeks</Text>
      </div>
      <Slider
        min={1}
        max={52}
        value={weeks}
        onChange={setWeeks}
        marks={{ 1: '1w', 12: '12w', 26: '26w', 52: '52w' }}
      />
    </div>
  );
};

export default TimeRangeSelector; 