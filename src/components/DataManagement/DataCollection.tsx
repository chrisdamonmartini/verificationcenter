import React, { useState } from 'react';
import { 
  FaSearch, 
  FaFilter, 
  FaPlus, 
  FaUpload, 
  FaDownload, 
  FaFileAlt, 
  FaDatabase, 
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaChartLine,
  FaChartBar,
  FaTable,
  FaCalendarAlt,
  FaUserAlt,
  FaTag,
  FaEye,
  FaTrashAlt
} from 'react-icons/fa';

// Interface for data collection entries
interface DataCollectionEntry {
  id: string;
  name: string;
  description: string;
  testId: string;
  type: 'Telemetry' | 'Sensor' | 'Manual' | 'Video' | 'Survey' | 'Other';
  format: 'CSV' | 'JSON' | 'XML' | 'Binary' | 'Video' | 'Audio' | 'Text' | 'Other';
  status: 'Planned' | 'In Progress' | 'Completed' | 'Processing' | 'Failed' | 'Archived';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  source: string;
  collectionDate: string | null;
  collector: string;
  size: string;
  frequency: string;
  duration: string;
  tags: string[];
  location: string;
  dataPoints: number;
  storageLocation: string;
  processingStatus: 'Not Started' | 'In Progress' | 'Completed' | 'Failed' | 'N/A';
  availableForAnalysis: boolean;
  notes: string;
}

const DataCollection: React.FC = () => {
  // Sample data collection entries
  const [dataEntries, setDataEntries] = useState<DataCollectionEntry[]>([
    {
      id: "DATA-001",
      name: "Flight Test Telemetry - Test Flight 23",
      description: "Telemetry data captured during test flight 23 for primary flight control evaluation",
      testId: "FT-023",
      type: "Telemetry",
      format: "CSV",
      status: "Completed",
      priority: "High",
      source: "Aircraft Data Bus",
      collectionDate: "2023-05-20",
      collector: "Flight Test Group",
      size: "2.4 GB",
      frequency: "100 Hz",
      duration: "1h 30m",
      tags: ["Flight", "Control", "Telemetry", "IMU"],
      location: "Test Range Alpha",
      dataPoints: 540000,
      storageLocation: "/data/flight/FT-023/telemetry",
      processingStatus: "Completed",
      availableForAnalysis: true,
      notes: "Complete telemetry dataset with all primary flight parameters. Pre-processing completed with calibration applied."
    },
    {
      id: "DATA-002",
      name: "Engine Performance Data",
      description: "Engine performance metrics during full power test run",
      testId: "ENG-045",
      type: "Sensor",
      format: "JSON",
      status: "Completed",
      priority: "Medium",
      source: "Engine Control Unit",
      collectionDate: "2023-06-12",
      collector: "Propulsion Team",
      size: "850 MB",
      frequency: "50 Hz",
      duration: "45m",
      tags: ["Engine", "Performance", "Thrust", "Temperature"],
      location: "Engine Test Cell 3",
      dataPoints: 135000,
      storageLocation: "/data/engine/ENG-045/performance",
      processingStatus: "Completed",
      availableForAnalysis: true,
      notes: "All key engine parameters captured during the full power test run. Quality of data verified."
    },
    {
      id: "DATA-003",
      name: "Structural Strain Measurements",
      description: "Wing structural strain data during static load test",
      testId: "STR-017",
      type: "Sensor",
      format: "CSV",
      status: "Processing",
      priority: "High",
      source: "Load Test Rig Sensors",
      collectionDate: "2023-07-03",
      collector: "Structures Team",
      size: "1.2 GB",
      frequency: "200 Hz",
      duration: "2h 15m",
      tags: ["Structure", "Strain", "Wing", "Static Test"],
      location: "Structural Test Laboratory",
      dataPoints: 1620000,
      storageLocation: "/data/structural/STR-017/strain",
      processingStatus: "In Progress",
      availableForAnalysis: false,
      notes: "Processing in progress to remove noise and apply calibration factors. Expected to be available for analysis by 7/10."
    },
    {
      id: "DATA-004",
      name: "Environmental Test Chamber Video",
      description: "Video recording of component behavior during thermal cycling",
      testId: "ENV-032",
      type: "Video",
      format: "Video",
      status: "Completed",
      priority: "Medium",
      source: "Test Chamber Camera Array",
      collectionDate: "2023-06-25",
      collector: "Environmental Test Team",
      size: "18 GB",
      frequency: "30 fps",
      duration: "6h",
      tags: ["Thermal", "Video", "Component", "Environmental"],
      location: "Environmental Test Facility",
      dataPoints: 648000,
      storageLocation: "/data/environmental/ENV-032/video",
      processingStatus: "Not Started",
      availableForAnalysis: true,
      notes: "Four synchronized camera views of the test article during the complete thermal cycle. Raw footage available now, processed time-lapse pending."
    },
    {
      id: "DATA-005",
      name: "RF Communication System Test Data",
      description: "RF signal metrics during communications system verification",
      testId: "COM-051",
      type: "Telemetry",
      format: "Binary",
      status: "In Progress",
      priority: "High",
      source: "Signal Analyzer",
      collectionDate: "2023-07-08",
      collector: "Communications Team",
      size: "3.6 GB",
      frequency: "500 MHz",
      duration: "4h",
      tags: ["RF", "Communications", "Signal", "Spectrum"],
      location: "Anechoic Chamber",
      dataPoints: 7200000,
      storageLocation: "/data/communications/COM-051/rf",
      processingStatus: "Not Started",
      availableForAnalysis: false,
      notes: "Data collection still in progress. Expected completion in 2 hours. Signal data across full operational spectrum range."
    }
  ]);
  
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [selectedEntry, setSelectedEntry] = useState<DataCollectionEntry | null>(null);
  
  // Filter data entries based on search term and filters
  const filteredEntries = dataEntries.filter(entry => {
    // Apply search filter
    const matchesSearch = searchTerm === '' || 
      entry.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.testId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Apply status filter
    const matchesStatus = statusFilter === 'All' || entry.status === statusFilter;
    
    // Apply type filter
    const matchesType = typeFilter === 'All' || entry.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  // Helper functions for badges
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800"><FaCheckCircle className="inline mr-1" />Completed</span>;
      case 'In Progress':
        return <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">In Progress</span>;
      case 'Processing':
        return <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">Processing</span>;
      case 'Failed':
        return <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800"><FaTimesCircle className="inline mr-1" />Failed</span>;
      case 'Planned':
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">Planned</span>;
      case 'Archived':
        return <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">Archived</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">{status}</span>;
    }
  };
  
  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'Telemetry':
        return <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">Telemetry</span>;
      case 'Sensor':
        return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Sensor</span>;
      case 'Manual':
        return <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">Manual</span>;
      case 'Video':
        return <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">Video</span>;
      case 'Survey':
        return <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">Survey</span>;
      case 'Other':
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">Other</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">{type}</span>;
    }
  };
  
  const getFormatBadge = (format: string) => {
    switch (format) {
      case 'CSV':
        return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">CSV</span>;
      case 'JSON':
        return <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">JSON</span>;
      case 'XML':
        return <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">XML</span>;
      case 'Binary':
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">Binary</span>;
      case 'Video':
        return <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">Video</span>;
      case 'Audio':
        return <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">Audio</span>;
      case 'Text':
        return <span className="px-2 py-1 rounded-full text-xs bg-indigo-100 text-indigo-800">Text</span>;
      case 'Other':
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-300 text-gray-800">Other</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">{format}</span>;
    }
  };
  
  const getProcessingStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800"><FaCheckCircle className="inline mr-1" />Completed</span>;
      case 'In Progress':
        return <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">In Progress</span>;
      case 'Not Started':
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">Not Started</span>;
      case 'Failed':
        return <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800"><FaTimesCircle className="inline mr-1" />Failed</span>;
      case 'N/A':
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-300 text-gray-800">N/A</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">{status}</span>;
    }
  };
  
  // Handle viewing data entry details
  const handleViewEntry = (entry: DataCollectionEntry) => {
    setSelectedEntry(entry);
  };
  
  // Handle closing data entry details modal
  const handleCloseDetails = () => {
    setSelectedEntry(null);
  };
  
  return (
    <div className="p-6 max-w-full">
      <h1 className="text-2xl font-bold mb-6">Data Collection Management</h1>
      <p className="mb-6 text-gray-600">
        Manage and track data collection activities to support verification testing.
      </p>
      
      {/* Header with Add Entry button */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Data Collection Entries</h2>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center">
            <FaUpload className="mr-2" /> Upload Data
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
            <FaPlus className="mr-2" /> Add Entry
          </button>
        </div>
      </div>

      {/* Search and filter controls */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search field */}
        <div className="col-span-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by ID, name, test, or tags..."
              className="w-full px-10 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Status filter */}
        <div className="col-span-1">
          <div className="relative">
            <select
              className="w-full px-10 py-2 border rounded-lg appearance-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Planned">Planned</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Processing">Processing</option>
              <option value="Failed">Failed</option>
              <option value="Archived">Archived</option>
            </select>
            <FaFilter className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Type filter */}
        <div className="col-span-1">
          <div className="relative">
            <select
              className="w-full px-10 py-2 border rounded-lg appearance-none"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Telemetry">Telemetry</option>
              <option value="Sensor">Sensor</option>
              <option value="Manual">Manual</option>
              <option value="Video">Video</option>
              <option value="Survey">Survey</option>
              <option value="Other">Other</option>
            </select>
            <FaFilter className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Status summary */}
      <div className="mb-6 flex flex-wrap gap-3">
        <span className="text-sm text-gray-600">
          Showing {filteredEntries.length} of {dataEntries.length} data entries
        </span>
        <span className="text-sm ml-4">
          <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs mr-1">
            {dataEntries.filter(e => e.status === 'Completed').length} Completed
          </span>
          <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs mr-1">
            {dataEntries.filter(e => e.status === 'In Progress').length} In Progress
          </span>
          <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs mr-1">
            {dataEntries.filter(e => e.status === 'Processing').length} Processing
          </span>
        </span>
      </div>

      {/* Data entries table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Test ID</th>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Format</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Collection Date</th>
              <th className="py-3 px-4 text-left">Size</th>
              <th className="py-3 px-4 text-left">Analysis Ready</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.map(entry => (
              <tr key={entry.id} className="border-t hover:bg-gray-50">
                <td className="py-3 px-4">{entry.id}</td>
                <td className="py-3 px-4">
                  <div className="font-medium">{entry.name}</div>
                  <div className="text-sm text-gray-600 truncate max-w-xs">{entry.description}</div>
                </td>
                <td className="py-3 px-4">{entry.testId}</td>
                <td className="py-3 px-4">{getTypeBadge(entry.type)}</td>
                <td className="py-3 px-4">{getFormatBadge(entry.format)}</td>
                <td className="py-3 px-4">{getStatusBadge(entry.status)}</td>
                <td className="py-3 px-4">{entry.collectionDate || 'Not scheduled'}</td>
                <td className="py-3 px-4">{entry.size}</td>
                <td className="py-3 px-4">
                  {entry.availableForAnalysis 
                    ? <span className="text-green-600"><FaCheckCircle className="inline mr-1" />Yes</span> 
                    : <span className="text-red-600"><FaTimesCircle className="inline mr-1" />No</span>}
                </td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleViewEntry(entry)}
                      className="p-1 text-blue-600 hover:text-blue-800"
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                    <button 
                      className="p-1 text-green-600 hover:text-green-800"
                      title="Download Data"
                    >
                      <FaDownload />
                    </button>
                    <button 
                      className="p-1 text-red-600 hover:text-red-800"
                      title="Delete Entry"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Data entry details modal */}
      {selectedEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-xl font-bold">{selectedEntry.id}: {selectedEntry.name}</h2>
              <button 
                onClick={handleCloseDetails}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimesCircle />
              </button>
            </div>
            
            <div className="p-4">
              {/* Entry details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-gray-700">{selectedEntry.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Status</h3>
                    <div>{getStatusBadge(selectedEntry.status)}</div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Type</h3>
                    <div>{getTypeBadge(selectedEntry.type)}</div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Format</h3>
                    <div>{getFormatBadge(selectedEntry.format)}</div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Test ID</h3>
                    <div className="font-medium">{selectedEntry.testId}</div>
                  </div>
                </div>
              </div>
              
              {/* Collection details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold mb-2">Collection Date</h3>
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2 text-gray-500" />
                    {selectedEntry.collectionDate || 'Not scheduled'}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Collector</h3>
                  <div className="flex items-center">
                    <FaUserAlt className="mr-2 text-gray-500" />
                    {selectedEntry.collector}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Location</h3>
                  <div>{selectedEntry.location}</div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Source</h3>
                  <div>{selectedEntry.source}</div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Duration</h3>
                  <div>{selectedEntry.duration}</div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Frequency</h3>
                  <div>{selectedEntry.frequency}</div>
                </div>
              </div>
              
              {/* Data metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <h3 className="font-semibold mb-1">Size</h3>
                  <div className="text-xl font-bold">{selectedEntry.size}</div>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold mb-1">Data Points</h3>
                  <div className="text-xl font-bold">{selectedEntry.dataPoints.toLocaleString()}</div>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold mb-1">Analysis Ready</h3>
                  <div className="text-xl font-bold">
                    {selectedEntry.availableForAnalysis 
                      ? <span className="text-green-600"><FaCheckCircle className="inline mr-1" />Yes</span> 
                      : <span className="text-red-600"><FaTimesCircle className="inline mr-1" />No</span>}
                  </div>
                </div>
              </div>
              
              {/* Processing status */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Processing Status</h3>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between">
                    {getProcessingStatusBadge(selectedEntry.processingStatus)}
                    <div className="text-sm text-gray-600">
                      {selectedEntry.processingStatus === 'Completed' && "Data has been processed and is ready for analysis"}
                      {selectedEntry.processingStatus === 'In Progress' && "Data processing is currently underway"}
                      {selectedEntry.processingStatus === 'Not Started' && "Data processing has not been initiated"}
                      {selectedEntry.processingStatus === 'Failed' && "Data processing encountered errors"}
                      {selectedEntry.processingStatus === 'N/A' && "Processing not applicable for this data"}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Tags */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedEntry.tags.map((tag, index) => (
                    <span key={index} className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm">
                      <FaTag className="inline-block mr-1 text-gray-500" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Storage information */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Storage Information</h3>
                <div className="p-3 border rounded-lg flex items-center">
                  <FaDatabase className="text-blue-500 mr-3" />
                  <div>
                    <div className="font-medium">Location:</div>
                    <div className="text-gray-700">{selectedEntry.storageLocation}</div>
                  </div>
                </div>
              </div>
              
              {/* Notes */}
              {selectedEntry.notes && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Notes</h3>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    {selectedEntry.notes}
                  </div>
                </div>
              )}
              
              {/* Actions */}
              <div className="flex justify-end space-x-3 border-t pt-4">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <FaDownload className="inline-block mr-2" />
                  Download Data
                </button>
                <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50">
                  <FaChartLine className="inline-block mr-2" />
                  Analyze
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <FaChartBar className="inline-block mr-2" />
                  Visualize
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataCollection; 