import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ForceGraph2D from 'react-force-graph-2d';
import { mockAircraft, mockParts, mockTechnicians } from '../../mockData';
import { Aircraft, Part, Technician, SystemError, Mission, Repair } from '../../types';

const DataModel: React.FC = () => {
  const graphRef = useRef<HTMLDivElement>(null);

  // Get example data from mock data with proper typing
  const exampleAircraft = mockAircraft[0] || {} as Aircraft;
  const examplePart = mockParts[0] || {} as Part;
  const exampleTechnician = mockTechnicians[0] || {} as Technician;
  const exampleError = (exampleAircraft.errors?.[0] || {}) as SystemError;
  const exampleMission = (exampleAircraft.missions?.[0] || {}) as Mission;
  const exampleRepair = (exampleAircraft.currentRepair || {}) as Repair;

  // Detailed data structure with attributes and examples
  const dataStructure = {
    'Fleet Management': {
      primary: [{
        name: 'Aircraft',
        attributes: [
          { name: 'id', type: 'string', description: 'Unique identifier', example: exampleAircraft?.id },
          { name: 'tailNumber', type: 'string', description: 'Aircraft tail number', example: exampleAircraft?.tailNumber },
          { name: 'model', type: 'string', description: 'Aircraft model', example: exampleAircraft?.model },
          { name: 'status', type: 'MaintenanceStatus', description: 'Current status', example: exampleAircraft?.status },
          { name: 'location', type: 'string', description: 'Current location', example: exampleAircraft?.location },
          { name: 'missionCapable', type: 'boolean', description: 'Mission readiness', example: String(exampleAircraft?.missionCapable) },
          { name: 'lastMaintenance', type: 'Date', description: 'Last maintenance date', example: exampleAircraft?.lastMaintenance },
          { name: 'nextScheduledMaintenance', type: 'Date', description: 'Next maintenance date', example: exampleAircraft?.nextScheduledMaintenance }
        ]
      }],
      related: [
        {
          name: 'SystemError',
          attributes: [
            { name: 'id', type: 'string', description: 'Unique identifier', example: exampleError?.id },
            { name: 'system', type: 'string', description: 'Affected system', example: exampleError?.system },
            { name: 'severity', type: 'Severity', description: 'Error severity', example: exampleError?.severity },
            { name: 'description', type: 'string', description: 'Error description', example: exampleError?.description },
            { name: 'reportedAt', type: 'Date', description: 'Report timestamp', example: exampleError?.reportedAt }
          ]
        },
        {
          name: 'Mission',
          attributes: [
            { name: 'id', type: 'string', description: 'Unique identifier', example: exampleMission?.id },
            { name: 'name', type: 'string', description: 'Mission name', example: exampleMission?.name },
            { name: 'startTime', type: 'Date', description: 'Start time', example: exampleMission?.startTime },
            { name: 'endTime', type: 'Date', description: 'End time', example: exampleMission?.endTime },
            { name: 'status', type: 'string', description: 'Mission status', example: exampleMission?.status }
          ]
        }
      ]
    },
    'Maintenance Status': {
      primary: [{
        name: 'Repair',
        attributes: [
          { name: 'id', type: 'string', description: 'Unique identifier', example: exampleRepair?.id },
          { name: 'aircraftId', type: 'string', description: 'Associated aircraft', example: exampleRepair?.aircraftId },
          { name: 'stage', type: 'MaintenanceStatus', description: 'Repair stage', example: exampleRepair?.stage },
          { name: 'startTime', type: 'Date', description: 'Start time', example: exampleRepair?.startTime },
          { name: 'estimatedCompletionTime', type: 'Date', description: 'Estimated completion', example: exampleRepair?.estimatedCompletionTime }
        ]
      }],
      related: [
        {
          name: 'Technician',
          attributes: [
            { name: 'id', type: 'string', description: 'Unique identifier', example: exampleTechnician?.id },
            { name: 'name', type: 'string', description: 'Technician name', example: exampleTechnician?.name },
            { name: 'specialties', type: 'string[]', description: 'Areas of expertise', example: exampleTechnician?.specialties?.join(', ') || 'N/A' },
            { name: 'available', type: 'boolean', description: 'Availability status', example: String(exampleTechnician?.available) }
          ]
        },
        {
          name: 'Part',
          attributes: [
            { name: 'id', type: 'string', description: 'Unique identifier', example: examplePart?.id },
            { name: 'name', type: 'string', description: 'Part name', example: examplePart?.name },
            { name: 'partNumber', type: 'string', description: 'Part number', example: examplePart?.partNumber },
            { name: 'inventory', type: 'number', description: 'Current inventory', example: String(examplePart?.inventory) }
          ]
        }
      ]
    }
  };

  // Prepare data for force graph with improved styling
  const graphData = {
    nodes: [] as any[],
    links: [] as any[]
  };

  // Color scheme for better visualization
  const colors = {
    section: '#1e40af', // darker blue for main sections
    primary: '#3b82f6', // blue for primary objects
    related: '#93c5fd', // lighter blue for related objects
    link: {
      primary: '#60a5fa',
      related: '#dbeafe'
    }
  };

  // Add nodes and links based on data structure
  Object.entries(dataStructure).forEach(([section, data]) => {
    // Add section as a central node
    graphData.nodes.push({
      id: section,
      name: section,
      val: 35, // Larger size for section nodes
      color: colors.section,
      group: 'section',
      desc: 'Main Section'
    });

    // Add primary objects with relationships
    data.primary.forEach(obj => {
      graphData.nodes.push({
        id: obj.name,
        name: obj.name,
        val: 25, // Medium size for primary objects
        color: colors.primary,
        group: 'primary',
        desc: `Primary: ${obj.attributes.length} attributes`
      });
      graphData.links.push({
        source: section,
        target: obj.name,
        color: colors.link.primary,
        value: 3 // Thicker lines for primary relationships
      });

      // Connect primary objects to their related objects
      data.related.forEach(related => {
        graphData.links.push({
          source: obj.name,
          target: related.name,
          color: colors.link.related,
          value: 1 // Thinner lines for secondary relationships
        });
      });
    });

    // Add related objects
    data.related.forEach(obj => {
      graphData.nodes.push({
        id: obj.name,
        name: obj.name,
        val: 20, // Smaller size for related objects
        color: colors.related,
        group: 'related',
        desc: `Related: ${obj.attributes.length} attributes`
      });
    });
  });

  return (
    <div className="space-y-6">
      {/* Network Graph */}
      <motion.div
        className="bg-white p-4 rounded-lg border border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h3 className="text-lg font-medium mb-4">Data Model Network</h3>
        <div ref={graphRef} style={{ height: '500px' }}> {/* Increased height */}
          <ForceGraph2D
            graphData={graphData}
            nodeLabel={node => `${node.name}\n${node.desc}`}
            nodeRelSize={8}
            linkWidth={link => link.value}
            linkColor={link => link.color}
            nodeColor={node => node.color}
            cooldownTicks={100}
            linkDirectionalParticles={2}
            linkDirectionalParticleSpeed={0.005}
            d3AlphaDecay={0.02}
            d3VelocityDecay={0.3}
            dagMode="radialout"
            dagLevelDistance={100}
            onEngineStop={() => {
              if (graphRef.current) {
                const canvas = graphRef.current.querySelector('canvas');
                if (canvas) {
                  canvas.style.width = '100%';
                  canvas.style.height = '500px';
                }
              }
            }}
            nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
              const label = node.name;
              const fontSize = 40/globalScale;
              ctx.font = `bold ${fontSize}px Arial`;
              const textWidth = ctx.measureText(label).width;
              const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.8);

              ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
              ctx.fillRect(
                node.x - bckgDimensions[0] / 2,
                node.y - bckgDimensions[1] / 2,
                bckgDimensions[0],
                bckgDimensions[1]
              );

              ctx.strokeStyle = node.color;
              ctx.lineWidth = 2;
              ctx.strokeRect(
                node.x - bckgDimensions[0] / 2,
                node.y - bckgDimensions[1] / 2,
                bckgDimensions[0],
                bckgDimensions[1]
              );

              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillStyle = node.color;
              ctx.fillText(label, node.x, node.y);

              if (node.desc && node.desc !== 'Main Section') {
                const descFontSize = 30/globalScale;
                ctx.font = `${descFontSize}px Arial`;
                ctx.fillStyle = 'rgba(75, 85, 99, 0.9)';
                ctx.fillText(node.desc, node.x, node.y + fontSize);
              }
            }}
          />
        </div>
      </motion.div>

      {/* Existing card view with detailed attributes and examples */}
      {Object.entries(dataStructure).map(([section, data], index) => (
        <motion.div
          key={section}
          className="bg-white p-4 rounded-lg border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <h3 className="text-lg font-medium mb-4">{section}</h3>
          <div className="space-y-6">
            {/* Primary Objects with Attributes */}
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Primary Objects</h4>
              {data.primary.map(obj => (
                <div key={obj.name} className="mt-4 bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-medium text-blue-800 mb-2">{obj.name}</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {obj.attributes.map(attr => (
                      <div key={attr.name} className="text-sm border-b border-blue-100 pb-2">
                        <div className="font-medium">{attr.name}</div>
                        <div className="text-gray-500">Type: {attr.type}</div>
                        <div className="text-gray-600 text-xs">{attr.description}</div>
                        <div className="mt-1 font-mono text-xs bg-white p-1 rounded">
                          Example: {attr.example || 'N/A'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Related Objects with Attributes */}
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Related Objects</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.related.map(obj => (
                  <div key={obj.name} className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">{obj.name}</h5>
                    <div className="space-y-2">
                      {obj.attributes.map(attr => (
                        <div key={attr.name} className="text-sm border-b border-gray-200 pb-2">
                          <div className="font-medium">{attr.name}</div>
                          <div className="text-gray-500">Type: {attr.type}</div>
                          <div className="text-gray-600 text-xs">{attr.description}</div>
                          <div className="mt-1 font-mono text-xs bg-white p-1 rounded">
                            Example: {attr.example || 'N/A'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Data Types Reference */}
      <motion.div
        className="bg-white p-4 rounded-lg border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-lg font-medium mb-4">Data Types Reference</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Core Types</h4>
            <ul className="space-y-2 text-sm">
              <li><code className="bg-gray-100 px-2 py-1 rounded">Aircraft</code>: Main aircraft entity</li>
              <li><code className="bg-gray-100 px-2 py-1 rounded">Mission</code>: Mission details and scheduling</li>
              <li><code className="bg-gray-100 px-2 py-1 rounded">Repair</code>: Maintenance records</li>
              <li><code className="bg-gray-100 px-2 py-1 rounded">SystemError</code>: Error tracking</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Support Types</h4>
            <ul className="space-y-2 text-sm">
              <li><code className="bg-gray-100 px-2 py-1 rounded">Technician</code>: Maintenance personnel</li>
              <li><code className="bg-gray-100 px-2 py-1 rounded">Part</code>: Inventory management</li>
              <li><code className="bg-gray-100 px-2 py-1 rounded">WeatherCondition</code>: Weather data</li>
              <li><code className="bg-gray-100 px-2 py-1 rounded">TestResource</code>: Test equipment and resources</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DataModel; 