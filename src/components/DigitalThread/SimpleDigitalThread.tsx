import React from 'react';
import NetworkView from './NetworkView';

// Simple placeholder component to test if NetworkView imports correctly
const SimpleDigitalThread: React.FC = () => {
  return (
    <div>
      <h1>Digital Thread Test Component</h1>
      <p>This is a simple test component to verify NetworkView imports correctly.</p>
      
      {/* We're not actually using NetworkView here, just importing it to test */}
      {/* <NetworkView /> */}
    </div>
  );
};

export default SimpleDigitalThread; 