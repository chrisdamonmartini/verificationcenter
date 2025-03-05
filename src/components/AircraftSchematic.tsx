import React from 'react';
import { SystemError } from '../types';
import { motion } from 'framer-motion';

interface AircraftSchematicProps {
  errors: SystemError[];
  aircraftType: string;
}

const AircraftSchematic: React.FC<AircraftSchematicProps> = ({ errors, aircraftType }) => {
  // Different positioning for different aircraft types
  const getErrorPosition = (index: number, system: string) => {
    const basePositions: Record<string, {x: string, y: string}> = {
      'Engines': { x: '75%', y: '40%' },
      'Hydraulics': { x: '50%', y: '60%' },
      'Avionics': { x: '25%', y: '30%' },
      'Electrical': { x: '40%', y: '20%' },
      'Landing Gear': { x: '50%', y: '80%' },
      'Fuel System': { x: '60%', y: '50%' },
      'default': { x: `${30 + (index * 10)}%`, y: `${20 + (index * 15)}%` }
    };
    
    return basePositions[system] || basePositions.default;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getAircraftImage = () => {
    if (aircraftType.includes('F-35')) {
      return '/f35-schematic.svg'; // You would need to create these SVG files
    } else if (aircraftType.includes('F-22')) {
      return '/f22-schematic.svg';
    }
    return '/generic-aircraft.svg';
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 relative h-64 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-blue-500 animate-pulse" 
           style={{backgroundImage: 'linear-gradient(to right, #2563eb, #3b82f6, #60a5fa, #93c5fd, #dbeafe)', backgroundSize: '400% 400%', animation: 'gradientBG 15s ease infinite'}}></div>
      
      {/* This would be replaced with an actual SVG schematic */}
      <div className="text-white text-opacity-40 absolute inset-0 flex items-center justify-center text-lg">
        Aircraft Schematic Visualization
      </div>
      
      {/* Simplified aircraft shape */}
      <div className="absolute" style={{width: '80%', height: '60%', left: '10%', top: '20%'}}>
        <div className="absolute h-2 w-full bg-blue-500/30 rounded-full left-0 top-1/2 transform -translate-y-1/2"></div>
        <div className="absolute h-1/2 w-4 bg-blue-500/30 rounded-t-full left-0 top-1/4"></div>
        <div className="absolute h-4 w-1/4 bg-blue-500/30 rounded-r-full left-3/4 top-1/2 transform -translate-y-1/2"></div>
        <div className="absolute h-1/3 w-1/6 bg-blue-500/30 top-1/3 left-1/2 transform -translate-x-1/2"></div>
      </div>
      
      {errors.map((error, index) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const position = getErrorPosition(index, error.system);
        const severity = error.severity === 'Critical' ? 'red' : error.severity === 'Warning' ? 'yellow' : 'green';
        
        return (
          <motion.div 
            key={error.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.2 }}
            className={`absolute w-6 h-6 rounded-full bg-${severity}-500 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-${severity}-500/50 z-10`}
            style={{ 
              top: position.y, 
              left: position.x,
              cursor: 'pointer'
            }}
            whileHover={{ scale: 1.2 }}
          >
            !
            <span className="absolute bottom-full mb-2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              {error.system}: {error.component}
            </span>
          </motion.div>
        );
      })}

      {/* System indicators */}
      {errors.map((error, index) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const position = getErrorPosition(index, error.system);
        const system = error.system;
        const systemErrors = errors.filter(e => e.system === system);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const systemHighlight = 'Engines'; // Replace with actual logic to determine system highlight

        return (
          <div 
            key={`${system}-indicator`}
            className={`absolute ${getErrorPosition(index, system).x} ${getErrorPosition(index, system).y} w-4 h-4 rounded-full ${
              systemErrors.length > 0 ? 'bg-red-500 animate-pulse' : 'bg-green-500'
            }`}
          ></div>
        );
      })}

      {/* System highlight overlays */}
      {errors.map((error, index) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const position = getErrorPosition(index, error.system);
        const system = error.system;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const systemHighlight = 'Engines'; // Replace with actual logic to determine system highlight

        return (
          <div 
            key={`${system}-highlight`}
            className={`absolute inset-0 ${
              systemHighlight === system ? 'bg-blue-100 bg-opacity-30' : ''
            }`}
          ></div>
        );
      })}
    </div>
  );
};

export default AircraftSchematic; 