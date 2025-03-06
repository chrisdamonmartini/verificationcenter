import React, { useState } from 'react';
import { FaSearch, FaEdit, FaTrash, FaPlus, FaClock, FaLink, FaFileAlt, FaRegClipboard, FaCheckCircle } from 'react-icons/fa';
import { BiCube, BiBarChart } from 'react-icons/bi';
import { motion } from 'framer-motion';

// Define interfaces for our test articles data
interface TestArticle {
  id: string;
  name: string;
  description: string;
  type: 'Prototype' | 'Engineering Model' | 'Qualification Model' | 'Flight Unit' | 'Ground Unit' | 'Test Fixture';
  status: 'In Development' | 'Ready' | 'In Use' | 'Refurbishment' | 'Retired';
  buildVersion: string;
  location: string;
  owner: string;
  createdDate: string;
  lastModified: string;
  expectedLifetime: string;
  usageCount: number;
  fidelity: 'Low' | 'Medium' | 'High' | 'Flight';
  requirements: string[];
  tests: string[];
  cost: number;
  features: string[];
  limitations: string[];
  attachments: {
    id: string;
    name: string;
    type: string;
    url: string;
    dateAdded: string;
  }[];
  notes: string;
}

const TestArticles: React.FC = () => {
  // Sample data for demonstration
  const [testArticles, setTestArticles] = useState<TestArticle[]>([
    {
      id: 'TA-001',
      name: 'Avionics Integration Prototype',
      description: 'First prototype for avionics subsystem integration testing',
      type: 'Prototype',
      status: 'In Use',
      buildVersion: 'v1.2',
      location: 'Integration Lab 3',
      owner: 'Sarah Johnson',
      createdDate: '2023-01-10',
      lastModified: '2023-06-15',
      expectedLifetime: '1 year',
      usageCount: 15,
      fidelity: 'Medium',
      requirements: ['REQ-A103', 'REQ-A104', 'REQ-A105'],
      tests: ['Test-0012', 'Test-0015', 'Test-0023'],
      cost: 75000,
      features: [
        'Full navigation system integration',
        'Partial communication system',
        'Hardware-in-the-loop capability'
      ],
      limitations: [
        'No environmental testing capability',
        'Uses commercial-grade components only'
      ],
      attachments: [
        {
          id: 'att-001',
          name: 'Assembly Document',
          type: 'PDF',
          url: '/documents/avionics_proto_assembly.pdf',
          dateAdded: '2023-01-15'
        },
        {
          id: 'att-002',
          name: 'Test Setup Photos',
          type: 'ZIP',
          url: '/documents/avionics_test_photos.zip',
          dateAdded: '2023-02-10'
        }
      ],
      notes: 'Currently being used for communication subsystem integration tests. Schedule available in project calendar.'
    },
    {
      id: 'TA-002',
      name: 'Structural Qualification Model',
      description: 'Full-scale structural model for qualification testing',
      type: 'Qualification Model',
      status: 'Ready',
      buildVersion: 'v2.0',
      location: 'Structural Test Facility',
      owner: 'Robert Chen',
      createdDate: '2023-02-20',
      lastModified: '2023-05-30',
      expectedLifetime: '2 years',
      usageCount: 8,
      fidelity: 'High',
      requirements: ['REQ-S201', 'REQ-S202', 'REQ-S205', 'REQ-S210'],
      tests: ['Test-0045', 'Test-0046', 'Test-0050'],
      cost: 250000,
      features: [
        'Full structural fidelity',
        'Instrumented for load measurements',
        'Thermal cycling capability',
        'Vibration test compatible'
      ],
      limitations: [
        'No electronic systems',
        'Limited to structural tests only'
      ],
      attachments: [
        {
          id: 'att-003',
          name: 'Structural Analysis Report',
          type: 'PDF',
          url: '/documents/structural_analysis.pdf',
          dateAdded: '2023-03-05'
        }
      ],
      notes: 'Scheduled for vibration testing next month. Contact Robert for availability.'
    },
    {
      id: 'TA-003',
      name: 'Thermal Engineering Model',
      description: 'Thermal model for heat dissipation testing',
      type: 'Engineering Model',
      status: 'In Development',
      buildVersion: 'v0.9',
      location: 'Thermal Lab 2',
      owner: 'Mia Rodriguez',
      createdDate: '2023-04-15',
      lastModified: '2023-06-01',
      expectedLifetime: '1 year',
      usageCount: 3,
      fidelity: 'Medium',
      requirements: ['REQ-T101', 'REQ-T102', 'REQ-T103'],
      tests: ['Test-0060'],
      cost: 120000,
      features: [
        'Thermally representative',
        'Integrated temperature sensors',
        'Active thermal control'
      ],
      limitations: [
        'No mechanical interfaces',
        'Limited to 80% of flight thermal load'
      ],
      attachments: [
        {
          id: 'att-004',
          name: 'Thermal Model Specifications',
          type: 'PDF',
          url: '/documents/thermal_model_specs.pdf',
          dateAdded: '2023-04-20'
        }
      ],
      notes: 'Currently being updated with new sensor locations. Expected to be ready by end of month.'
    },
    {
      id: 'TA-004',
      name: 'Software Test Bench',
      description: 'Dedicated hardware for flight software testing',
      type: 'Test Fixture',
      status: 'In Use',
      buildVersion: 'v3.1',
      location: 'Software Lab',
      owner: 'David Garcia',
      createdDate: '2022-11-10',
      lastModified: '2023-05-20',
      expectedLifetime: '3 years',
      usageCount: 45,
      fidelity: 'High',
      requirements: ['REQ-SW301', 'REQ-SW302', 'REQ-SW310'],
      tests: ['Test-0070', 'Test-0071', 'Test-0072', 'Test-0080'],
      cost: 180000,
      features: [
        'Flight-equivalent processors',
        'Hardware simulation interfaces',
        'Real-time debug capability',
        'Automated test execution'
      ],
      limitations: [
        'Limited sensor simulation fidelity',
        'Cannot test power distribution systems'
      ],
      attachments: [
        {
          id: 'att-005',
          name: 'Software Test Bench Manual',
          type: 'PDF',
          url: '/documents/sw_testbench_manual.pdf',
          dateAdded: '2022-12-01'
        },
        {
          id: 'att-006',
          name: 'Test Configuration Files',
          type: 'ZIP',
          url: '/documents/test_configs.zip',
          dateAdded: '2023-01-05'
        }
      ],
      notes: 'Heavily used resource - booking required at least 1 week in advance. Contact David for scheduling.'
    }
  ]);

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [fidelityFilter, setFidelityFilter] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<TestArticle | null>(null);

  // Filtered test articles
  const filteredArticles = testArticles
    .filter(article => 
      (searchTerm === '' || 
        article.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.requirements.some(req => req.toLowerCase().includes(searchTerm.toLowerCase())) ||
        article.owner.toLowerCase().includes(searchTerm.toLowerCase())
      ) &&
      (typeFilter === null || article.type === typeFilter) &&
      (statusFilter === null || article.status === statusFilter) &&
      (fidelityFilter === null || article.fidelity === fidelityFilter)
    );

  // Helper functions for UI elements
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready': return 'bg-green-100 text-green-800';
      case 'In Use': return 'bg-blue-100 text-blue-800';
      case 'In Development': return 'bg-yellow-100 text-yellow-800';
      case 'Refurbishment': return 'bg-purple-100 text-purple-800';
      case 'Retired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Prototype': return 'bg-yellow-100 text-yellow-800';
      case 'Engineering Model': return 'bg-blue-100 text-blue-800';
      case 'Qualification Model': return 'bg-purple-100 text-purple-800';
      case 'Flight Unit': return 'bg-green-100 text-green-800';
      case 'Ground Unit': return 'bg-indigo-100 text-indigo-800';
      case 'Test Fixture': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFidelityColor = (fidelity: string) => {
    switch (fidelity) {
      case 'Low': return 'bg-gray-100 text-gray-800';
      case 'Medium': return 'bg-blue-100 text-blue-800';
      case 'High': return 'bg-purple-100 text-purple-800';
      case 'Flight': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Handlers
  const handleSelectArticle = (article: TestArticle) => {
    setSelectedArticle(article);
  };

  const handleCloseArticleDetail = () => {
    setSelectedArticle(null);
  };

  return (
    <div className="bg-gray-50 p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Test Articles</h1>
        
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Test Article Management</h2>
          <p className="text-gray-700 mb-4">
            Test articles are physical or virtual assets used for verification activities. This management system 
            helps track all test articles, their current status, and their usage in verification tests.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 flex flex-col items-center justify-center">
              <BiCube className="text-3xl text-blue-600 mb-2" />
              <div className="text-xl font-semibold">{testArticles.length}</div>
              <div className="text-sm text-gray-600">Total Test Articles</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200 flex flex-col items-center justify-center">
              <FaCheckCircle className="text-3xl text-green-600 mb-2" />
              <div className="text-xl font-semibold">{testArticles.filter(a => a.status === 'Ready').length}</div>
              <div className="text-sm text-gray-600">Available Articles</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 flex flex-col items-center justify-center">
              <FaClock className="text-3xl text-yellow-600 mb-2" />
              <div className="text-xl font-semibold">{testArticles.filter(a => a.status === 'In Development').length}</div>
              <div className="text-sm text-gray-600">In Development</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 flex flex-col items-center justify-center">
              <BiBarChart className="text-3xl text-purple-600 mb-2" />
              <div className="text-xl font-semibold">
                {testArticles.reduce((total, article) => total + article.tests.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Linked Tests</div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-xl font-semibold mb-2 md:mb-0">Test Article Inventory</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, ID, requirements..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="absolute left-3 top-2.5 text-gray-400">
                <FaSearch />
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                className="border border-gray-300 rounded-md p-2 w-full text-sm"
                value={typeFilter || ''}
                onChange={(e) => setTypeFilter(e.target.value === '' ? null : e.target.value)}
              >
                <option value="">All Types</option>
                <option value="Prototype">Prototype</option>
                <option value="Engineering Model">Engineering Model</option>
                <option value="Qualification Model">Qualification Model</option>
                <option value="Flight Unit">Flight Unit</option>
                <option value="Ground Unit">Ground Unit</option>
                <option value="Test Fixture">Test Fixture</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                className="border border-gray-300 rounded-md p-2 w-full text-sm"
                value={statusFilter || ''}
                onChange={(e) => setStatusFilter(e.target.value === '' ? null : e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="In Development">In Development</option>
                <option value="Ready">Ready</option>
                <option value="In Use">In Use</option>
                <option value="Refurbishment">Refurbishment</option>
                <option value="Retired">Retired</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fidelity</label>
              <select
                className="border border-gray-300 rounded-md p-2 w-full text-sm"
                value={fidelityFilter || ''}
                onChange={(e) => setFidelityFilter(e.target.value === '' ? null : e.target.value)}
              >
                <option value="">All Fidelity Levels</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Flight">Flight</option>
              </select>
            </div>
          </div>

          {/* Test Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <div 
                  key={article.id}
                  onClick={() => handleSelectArticle(article)}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
                >
                  <div className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{article.name}</h3>
                        <p className="text-sm text-gray-500 mb-2">{article.id}</p>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(article.status)}`}>
                          {article.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(article.type)}`}>
                          {article.type}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{article.description}</p>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="text-xs text-gray-500">
                        <span className="font-medium">Build:</span> {article.buildVersion}
                      </div>
                      <div className="text-xs text-gray-500">
                        <span className="font-medium">Location:</span> {article.location}
                      </div>
                      <div className="text-xs text-gray-500">
                        <span className="font-medium">Owner:</span> {article.owner}
                      </div>
                      <div className="text-xs text-gray-500">
                        <span className="font-medium">Uses:</span> {article.usageCount}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${getFidelityColor(article.fidelity)}`}>
                        {article.fidelity} Fidelity
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-blue-600">
                        <FaLink className="mr-1" /> 
                        <span className="font-medium">{article.tests.length} Tests</span>
                      </div>
                      <div className="flex items-center text-xs text-purple-600">
                        <FaRegClipboard className="mr-1" /> 
                        <span className="font-medium">{article.requirements.length} Requirements</span>
                      </div>
                      <div className="flex items-center text-xs text-green-600">
                        <FaFileAlt className="mr-1" /> 
                        <span className="font-medium">{article.attachments.length} Files</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 p-6 text-center">
                <p className="text-gray-500">No test articles found matching the criteria.</p>
              </div>
            )}
          </div>

          {/* Test Article Count Summary */}
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{filteredArticles.length}</span> of <span className="font-medium">{testArticles.length}</span> test articles
            </div>
          </div>
        </div>

        {/* Add Test Article Button */}
        <div className="fixed bottom-8 right-8">
          <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-colors">
            <FaPlus className="text-xl" />
          </button>
        </div>

        {/* Test Article Detail Modal */}
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={handleCloseArticleDetail}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedArticle.name}</h2>
                    <div className="text-sm text-gray-500 mt-1">ID: {selectedArticle.id}</div>
                  </div>
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedArticle.status)}`}>
                      {selectedArticle.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTypeColor(selectedArticle.type)}`}>
                      {selectedArticle.type}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getFidelityColor(selectedArticle.fidelity)}`}>
                      {selectedArticle.fidelity} Fidelity
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-700">{selectedArticle.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Details</h3>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-gray-500 text-sm">Build Version:</span>
                          <div className="text-gray-900">{selectedArticle.buildVersion}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">Location:</span>
                          <div className="text-gray-900">{selectedArticle.location}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">Owner:</span>
                          <div className="text-gray-900">{selectedArticle.owner}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">Usage Count:</span>
                          <div className="text-gray-900">{selectedArticle.usageCount}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">Created:</span>
                          <div className="text-gray-900">{selectedArticle.createdDate}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">Last Modified:</span>
                          <div className="text-gray-900">{selectedArticle.lastModified}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">Expected Lifetime:</span>
                          <div className="text-gray-900">{selectedArticle.expectedLifetime}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">Cost:</span>
                          <div className="text-gray-900">${selectedArticle.cost.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Features & Limitations</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="mb-4">
                        <h4 className="font-medium text-sm text-blue-700 mb-2">Features</h4>
                        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                          {selectedArticle.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-red-700 mb-2">Limitations</h4>
                        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                          {selectedArticle.limitations.map((limitation, index) => (
                            <li key={index}>{limitation}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      {selectedArticle.requirements.length > 0 ? (
                        <div className="grid grid-cols-1 gap-2">
                          {selectedArticle.requirements.map((req) => (
                            <div key={req} className="flex items-center justify-between p-2 bg-white rounded border border-gray-200">
                              <span className="font-medium text-sm">{req}</span>
                              <span className="text-blue-600 hover:text-blue-800 text-xs cursor-pointer">View</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm">No requirements linked.</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Tests</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      {selectedArticle.tests.length > 0 ? (
                        <div className="grid grid-cols-1 gap-2">
                          {selectedArticle.tests.map((test) => (
                            <div key={test} className="flex items-center justify-between p-2 bg-white rounded border border-gray-200">
                              <span className="font-medium text-sm">{test}</span>
                              <span className="text-blue-600 hover:text-blue-800 text-xs cursor-pointer">View</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm">No tests linked.</p>
                      )}
                    </div>
                  </div>
                </div>

                {selectedArticle.attachments.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Attachments</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-1 gap-2">
                        {selectedArticle.attachments.map((attachment) => (
                          <div key={attachment.id} className="flex items-center justify-between p-2 bg-white rounded border border-gray-200">
                            <div className="flex items-center">
                              <FaFileAlt className="text-gray-400 mr-2" />
                              <div>
                                <div className="font-medium text-sm">{attachment.name}</div>
                                <div className="text-xs text-gray-500">Added: {attachment.dateAdded} • {attachment.type}</div>
                              </div>
                            </div>
                            <span className="text-blue-600 hover:text-blue-800 text-xs cursor-pointer">Download</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {selectedArticle.notes && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Notes</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700">{selectedArticle.notes}</p>
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-4">
                  <button 
                    className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                    onClick={handleCloseArticleDetail}
                  >
                    Close
                  </button>
                  <button className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none">
                    Edit
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TestArticles; 