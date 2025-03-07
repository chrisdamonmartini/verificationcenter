import React from 'react';
import * as FaIcons from 'react-icons/fa';

const VerificationMatrixView: React.FC = () => {
  // This would be loaded from a data source in a real application
  const verificationData = [
    {
      id: 'SR-001',
      description: 'The system shall provide navigation accuracy of ±10 meters',
      category: 'Performance',
      inspection: false,
      analysis: true,
      demonstration: false,
      test: true,
      simulation: true,
      status: 'In Progress'
    },
    {
      id: 'SR-002',
      description: 'The system shall operate in temperature ranges from -40°C to +60°C',
      category: 'Environmental',
      inspection: false,
      analysis: true,
      demonstration: false,
      test: true,
      simulation: false,
      status: 'Verified'
    },
    {
      id: 'SR-003',
      description: 'The system shall withstand shock loads of up to 10g',
      category: 'Structural',
      inspection: true,
      analysis: true,
      demonstration: false,
      test: true,
      simulation: true,
      status: 'Not Started'
    },
    {
      id: 'SR-004',
      description: 'The system shall have a Mean Time Between Failures (MTBF) of at least 5000 hours',
      category: 'Reliability',
      inspection: false,
      analysis: true,
      demonstration: false,
      test: false,
      simulation: true,
      status: 'Failed'
    },
    {
      id: 'SR-005',
      description: 'The system shall be maintainable by a single technician',
      category: 'Maintainability',
      inspection: true,
      analysis: false,
      demonstration: true,
      test: false,
      simulation: false,
      status: 'Verified'
    },
  ];

  // Helper function to render status badge
  const renderStatusBadge = (status: string) => {
    let color;
    switch (status) {
      case 'Verified':
        color = 'bg-green-100 text-green-800';
        break;
      case 'In Progress':
        color = 'bg-yellow-100 text-yellow-800';
        break;
      case 'Not Started':
        color = 'bg-gray-100 text-gray-800';
        break;
      case 'Failed':
        color = 'bg-red-100 text-red-800';
        break;
      default:
        color = 'bg-blue-100 text-blue-800';
    }
    return <span className={`px-2 py-1 rounded ${color} text-xs font-medium`}>{status}</span>;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaIcons.FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <select className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Categories</option>
            <option>Performance</option>
            <option>Environmental</option>
            <option>Structural</option>
            <option>Reliability</option>
            <option>Maintainability</option>
          </select>
          <select className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Statuses</option>
            <option>Verified</option>
            <option>In Progress</option>
            <option>Not Started</option>
            <option>Failed</option>
          </select>
        </div>
        <div className="flex space-x-2">
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 flex items-center">
            <FaIcons.FaFileExport className="mr-2" />
            Export
          </button>
        </div>
      </div>
      
      <div className="flex justify-end items-center mb-4">
        <span className="text-sm text-gray-600">Showing 5 of 248 requirements</span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="py-3 px-4 text-left font-medium text-gray-600">ID</th>
              <th className="py-3 px-4 text-left font-medium text-gray-600">Description</th>
              <th className="py-3 px-4 text-left font-medium text-gray-600">Category</th>
              <th className="py-3 px-4 text-center font-medium text-gray-600">
                <div className="flex flex-col items-center">
                  <FaIcons.FaSearchPlus className="mb-1" />
                  <span>Inspection</span>
                </div>
              </th>
              <th className="py-3 px-4 text-center font-medium text-gray-600">
                <div className="flex flex-col items-center">
                  <FaIcons.FaCalculator className="mb-1" />
                  <span>Analysis</span>
                </div>
              </th>
              <th className="py-3 px-4 text-center font-medium text-gray-600">
                <div className="flex flex-col items-center">
                  <FaIcons.FaPlayCircle className="mb-1" />
                  <span>Demo</span>
                </div>
              </th>
              <th className="py-3 px-4 text-center font-medium text-gray-600">
                <div className="flex flex-col items-center">
                  <FaIcons.FaVial className="mb-1" />
                  <span>Test</span>
                </div>
              </th>
              <th className="py-3 px-4 text-center font-medium text-gray-600">
                <div className="flex flex-col items-center">
                  <FaIcons.FaDesktop className="mb-1" />
                  <span>Simulation</span>
                </div>
              </th>
              <th className="py-3 px-4 text-left font-medium text-gray-600">Status</th>
              <th className="py-3 px-4 text-center font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {verificationData.map((item, index) => (
              <tr key={item.id} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                <td className="py-3 px-4 text-blue-600 font-medium">{item.id}</td>
                <td className="py-3 px-4">{item.description}</td>
                <td className="py-3 px-4">{item.category}</td>
                <td className="py-3 px-4 text-center">
                  {item.inspection ? 
                    <FaIcons.FaCheck className="mx-auto text-green-500" /> : 
                    <FaIcons.FaTimes className="mx-auto text-red-500" />
                  }
                </td>
                <td className="py-3 px-4 text-center">
                  {item.analysis ? 
                    <FaIcons.FaCheck className="mx-auto text-green-500" /> : 
                    <FaIcons.FaTimes className="mx-auto text-red-500" />
                  }
                </td>
                <td className="py-3 px-4 text-center">
                  {item.demonstration ? 
                    <FaIcons.FaCheck className="mx-auto text-green-500" /> : 
                    <FaIcons.FaTimes className="mx-auto text-red-500" />
                  }
                </td>
                <td className="py-3 px-4 text-center">
                  {item.test ? 
                    <FaIcons.FaCheck className="mx-auto text-green-500" /> : 
                    <FaIcons.FaTimes className="mx-auto text-red-500" />
                  }
                </td>
                <td className="py-3 px-4 text-center">
                  {item.simulation ? 
                    <FaIcons.FaCheck className="mx-auto text-green-500" /> : 
                    <FaIcons.FaTimes className="mx-auto text-red-500" />
                  }
                </td>
                <td className="py-3 px-4">
                  {renderStatusBadge(item.status)}
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex justify-center space-x-2">
                    <button className="p-1 text-blue-600 hover:text-blue-800">
                      <FaIcons.FaEdit />
                    </button>
                    <button className="p-1 text-gray-600 hover:text-gray-800">
                      <FaIcons.FaCopy />
                    </button>
                    <button className="p-1 text-red-600 hover:text-red-800">
                      <FaIcons.FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <div>
          <span className="text-sm text-gray-600">Showing 1-5 of 248 items</span>
        </div>
        <div className="flex space-x-1">
          <button className="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-100">Previous</button>
          <button className="px-3 py-1 border rounded-md bg-blue-600 text-white">1</button>
          <button className="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-100">2</button>
          <button className="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-100">3</button>
          <button className="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-100">...</button>
          <button className="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-100">25</button>
          <button className="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-100">Next</button>
        </div>
      </div>
    </div>
  );
};

export default VerificationMatrixView; 