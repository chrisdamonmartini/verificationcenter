import React, { useState } from 'react';
import { Part } from '../types';
import { format } from 'date-fns';
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';
import * as MdIcons from 'react-icons/md';
import { motion } from 'framer-motion';

interface PartsInventoryProps {
  parts: Part[];
}

const PartsInventory: React.FC<PartsInventoryProps> = ({ parts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'in-stock' | 'low-stock' | 'out-of-stock'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'inventory' | 'part-number'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderQuantity, setOrderQuantity] = useState<number>(0);
  const [selectedPartNumber, setSelectedPartNumber] = useState('');
  
  // Compute stock status
  const getStockStatus = (part: Part) => {
    if (!part.inventory || part.inventory === 0) return 'out-of-stock';
    if (part.inventory <= 2) return 'low-stock';
    return 'in-stock';
  };
  
  // Apply filters and search
  const filteredParts = parts.filter(part => {
    // Search term filter
    const matchesSearch = searchTerm === '' || 
      part.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      part.partNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && getStockStatus(part) === statusFilter;
  });
  
  // Apply sorting
  const sortedParts = [...filteredParts].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'inventory':
        comparison = (a.inventory || 0) - (b.inventory || 0);
        break;
      case 'part-number':
        comparison = (a.partNumber || '').localeCompare(b.partNumber || '');
        break;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });
  
  // Calculate summary statistics
  const totalParts = parts.reduce((sum, part) => sum + (part.inventory || 0), 0);
  const totalPartsOnOrder = parts.reduce((sum, part) => sum + (part.onOrder || 0), 0);
  const outOfStockCount = parts.filter(part => !part.inventory || part.inventory === 0).length;
  const lowStockCount = parts.filter(part => part.inventory && part.inventory > 0 && part.inventory <= 2).length;
  
  const handleSort = (field: 'name' | 'inventory' | 'part-number') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };
  
  const handleOrderPart = (part: Part) => {
    setSelectedPart(part);
    setShowOrderForm(true);
    setOrderQuantity(5); // Default order quantity
  };
  
  const handleOrderSubmit = () => {
    alert(`Order placed for ${orderQuantity} units of ${selectedPart?.name}`);
    setShowOrderForm(false);
    setSelectedPart(null);
  };
  
  const handleSelectPart = (part: Part | null) => {
    setSelectedPart(part);
    if (part && part.partNumber) {
      setSelectedPartNumber(part.partNumber);
    } else {
      setSelectedPartNumber('');
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-900">
        <FaIcons.FaTools className="mr-2" /> Parts Inventory
      </h2>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-blue-700 p-4 rounded-lg text-center shadow-md"
        >
          <div className="text-3xl font-bold text-white">{totalParts}</div>
          <div className="text-sm text-blue-100">Total Parts</div>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-green-700 p-4 rounded-lg text-center shadow-md"
        >
          <div className="text-3xl font-bold text-white">{parts.length}</div>
          <div className="text-sm text-green-100">Unique Parts</div>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-orange-700 p-4 rounded-lg text-center shadow-md"
        >
          <div className="text-3xl font-bold text-white">{totalPartsOnOrder}</div>
          <div className="text-sm text-orange-100">Parts On Order</div>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-red-800 p-4 rounded-lg text-center shadow-md"
        >
          <div className="text-3xl font-bold text-white">{outOfStockCount}</div>
          <div className="text-sm text-red-100">Out of Stock</div>
        </motion.div>
      </div>
      
      {/* Filters and search */}
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <div className="flex mb-4 md:mb-0">
          <div className="relative">
            <input 
              type="text" 
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search parts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <FaIcons.FaSearch className="text-gray-400" />
            </div>
          </div>
          
          <select
            className="ml-2 border rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
          >
            <option value="all">All Status</option>
            <option value="in-stock">In Stock</option>
            <option value="low-stock">Low Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </div>
        
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
          onClick={() => {
            setSelectedPart(null);
            setShowOrderForm(true);
          }}
        >
          <FaIcons.FaPlus className="mr-2" /> Order New Parts
        </button>
      </div>
      
      {/* Warning for out of stock parts */}
      {outOfStockCount > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6 bg-red-100 p-4 rounded-lg flex items-center"
        >
          <FaIcons.FaExclamationTriangle className="text-red-600 mr-3 text-xl" />
          <span className="text-red-800">
            <strong>Attention:</strong> {outOfStockCount} part{outOfStockCount !== 1 ? 's' : ''} out of stock. 
            {lowStockCount > 0 && ` Additionally, ${lowStockCount} part${lowStockCount !== 1 ? 's' : ''} running low.`}
          </span>
        </motion.div>
      )}
      
      {/* Parts Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center">
                  Part Name
                  {sortBy === 'name' && (
                    sortOrder === 'asc' ? <FaIcons.FaSortUp className="ml-1" /> : <FaIcons.FaSortDown className="ml-1" />
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('part-number')}
              >
                <div className="flex items-center">
                  Part Number
                  {sortBy === 'part-number' && (
                    sortOrder === 'asc' ? <FaIcons.FaSortUp className="ml-1" /> : <FaIcons.FaSortDown className="ml-1" />
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('inventory')}
              >
                <div className="flex items-center">
                  Inventory
                  {sortBy === 'inventory' && (
                    sortOrder === 'asc' ? <FaIcons.FaSortUp className="ml-1" /> : <FaIcons.FaSortDown className="ml-1" />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                On Order
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Est. Arrival
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedParts.map((part, index) => {
              const stockStatus = getStockStatus(part);
              
              return (
                <tr 
                  key={part.partNumber || `part-${index}`} 
                  className={`border-b hover:bg-gray-50 cursor-pointer ${
                    selectedPart?.partNumber === part.partNumber ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => handleSelectPart(part)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{part.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{part.partNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{part.inventory}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      stockStatus === 'in-stock'
                        ? 'bg-green-100 text-green-800'
                        : stockStatus === 'low-stock'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {stockStatus === 'in-stock'
                        ? 'In Stock'
                        : stockStatus === 'low-stock'
                        ? 'Low Stock'
                        : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {part.onOrder ? part.onOrder : '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {part.estimatedArrival 
                        ? format(new Date(part.estimatedArrival), 'MMM d, yyyy') 
                        : '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button 
                      className="text-blue-600 hover:text-blue-900"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectPart(part);
                      }}
                    >
                      <BiIcons.BiDetail className="inline" /> Details
                    </button>
                    {stockStatus !== 'in-stock' && (
                      <button 
                        className="text-green-600 hover:text-green-900"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOrderPart(part);
                        }}
                      >
                        <FaIcons.FaShoppingCart className="inline" /> Order
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {sortedParts.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          <FaIcons.FaSearch className="mx-auto text-4xl mb-3 text-gray-300" />
          <p>No parts found for your current filters.</p>
          <button 
            className="mt-3 text-blue-600 hover:text-blue-800"
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
            }}
          >
            Clear filters
          </button>
        </div>
      )}
      
      {/* Part Details Modal */}
      {selectedPart && !showOrderForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            className="bg-white rounded-lg max-w-2xl w-full mx-4 overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-lg font-bold">Part Details</h3>
              <button onClick={() => setSelectedPart(null)} className="text-gray-500 hover:text-gray-700">
                <FaIcons.FaTimes />
              </button>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-lg">{selectedPart.name}</h4>
                  <p className="text-gray-500 mt-1">Part #{selectedPart.partNumber}</p>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`px-2 py-0.5 rounded text-sm ${
                        getStockStatus(selectedPart) === 'in-stock'
                          ? 'bg-green-100 text-green-800'
                          : getStockStatus(selectedPart) === 'low-stock'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {getStockStatus(selectedPart) === 'in-stock'
                          ? 'In Stock'
                          : getStockStatus(selectedPart) === 'low-stock'
                          ? 'Low Stock'
                          : 'Out of Stock'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Inventory:</span>
                      <span>{selectedPart.inventory}</span>
                    </div>
                    {selectedPart.category && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span>{selectedPart.category}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Order Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">On Order:</span>
                      <span>{selectedPart.onOrder || 0} units</span>
                    </div>
                    {selectedPart.estimatedArrival && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Estimated Arrival:</span>
                        <span>{format(new Date(selectedPart.estimatedArrival), 'MMM d, yyyy')}</span>
                      </div>
                    )}
                    {selectedPart.leadTime && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Lead Time:</span>
                        <span>{selectedPart.leadTime} days</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t p-4 flex justify-end space-x-2">
              <button 
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setSelectedPart(null)}
              >
                Close
              </button>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => {
                  setShowOrderForm(true);
                  setOrderQuantity(5);
                }}
              >
                <FaIcons.FaShoppingCart className="inline mr-1" /> Order More
              </button>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Order Form Modal */}
      {showOrderForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            className="bg-white rounded-lg max-w-md w-full mx-4 overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-lg font-bold">Order Parts</h3>
              <button onClick={() => setShowOrderForm(false)} className="text-gray-500 hover:text-gray-700">
                <FaIcons.FaTimes />
              </button>
            </div>
            <div className="p-4">
              <form onSubmit={(e) => {
                e.preventDefault();
                handleOrderSubmit();
              }}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Part
                  </label>
                  {selectedPart ? (
                    <div className="p-2 border rounded bg-gray-50">
                      <strong>{selectedPart.name}</strong> ({selectedPart.partNumber})
                    </div>
                  ) : (
                    <select 
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                      onChange={(e) => {
                        const partId = e.target.value;
                        const foundPart = parts.find(p => p.partNumber === partId);
                        handleSelectPart(foundPart || null);
                      }}
                      value={selectedPartNumber}
                    >
                      <option value="">Select a part...</option>
                      {parts.map(part => (
                        <option key={part.partNumber} value={part.partNumber || ''}>
                          {part.name} - {part.partNumber}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Quantity
                  </label>
                  <input 
                    type="number" 
                    min="1"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={orderQuantity}
                    onChange={(e) => setOrderQuantity(parseInt(e.target.value) || 0)}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Priority
                  </label>
                  <select 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option>Normal</option>
                    <option>Rush</option>
                    <option>Critical</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-end">
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                    type="button"
                    onClick={() => setShowOrderForm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    type="submit"
                  >
                    Submit Order
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PartsInventory; 