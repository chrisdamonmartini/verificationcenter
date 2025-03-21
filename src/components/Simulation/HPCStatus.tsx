import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';
import { 
  mockHPCClusters, 
  mockHPCJobs, 
  getClusterStatusBadgeColor,
  getJobStatusBadgeColor,
  getJobPriorityBadgeColor,
  HPCCluster,
  HPCJob
} from '../../Mocked Up Data/hpcData';

const HPCStatus: React.FC = () => {
  const [selectedCluster, setSelectedCluster] = useState<string>('all');
  const [jobStatusFilter, setJobStatusFilter] = useState<string>('all');
  const [jobPriorityFilter, setJobPriorityFilter] = useState<string>('all');
  
  // Filter clusters based on selection
  const filteredClusters = selectedCluster === 'all' 
    ? mockHPCClusters 
    : mockHPCClusters.filter(cluster => cluster.id === selectedCluster);
  
  // Filter jobs based on selection and filters
  const filteredJobs = mockHPCJobs.filter(job => {
    // Filter by cluster
    if (selectedCluster !== 'all' && job.cluster !== selectedCluster) {
      return false;
    }
    
    // Filter by status
    if (jobStatusFilter !== 'all' && job.status !== jobStatusFilter) {
      return false;
    }
    
    // Filter by priority
    if (jobPriorityFilter !== 'all' && job.priority !== jobPriorityFilter) {
      return false;
    }
    
    return true;
  });
  
  // Get count of running and queued jobs
  const runningAndQueuedJobs = filteredJobs.filter(
    job => job.status === 'Running' || job.status === 'Queued'
  );
  
  // Get count of completed and failed jobs from the last 7 days
  const completedAndFailedJobs = filteredJobs.filter(
    job => job.status === 'Completed' || job.status === 'Failed'
  ).slice(0, 5); // Just show the 5 most recent
  
  // Calculate the duration between start and end time
  const calculateDuration = (startTime: string, endTime?: string): string => {
    if (!endTime || startTime === 'Pending') return '-';
    
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    const durationMs = end - start;
    
    // Format as HH:MM:SS
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((durationMs % (1000 * 60)) / 1000);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">HPC Cluster Status</h2>
        <div className="flex space-x-2">
          <select 
            className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedCluster}
            onChange={(e) => setSelectedCluster(e.target.value)}
          >
            <option value="all">All Clusters</option>
            {mockHPCClusters.map(cluster => (
              <option key={cluster.id} value={cluster.id}>{cluster.name}</option>
            ))}
          </select>
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-3 py-1 text-sm flex items-center"
            onClick={() => window.location.reload()}
          >
            <FaIcons.FaSync className="mr-1" /> Refresh
          </button>
        </div>
      </div>

      {/* HPC Clusters */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Compute Clusters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredClusters.map(cluster => (
            <div key={cluster.id} className="border rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-lg">{cluster.name}</h4>
                  <p className="text-sm text-gray-500 mb-1">{cluster.id}</p>
                </div>
                <div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    getClusterStatusBadgeColor(cluster.status)
                  }`}>
                    {cluster.status}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">CPU Usage</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        cluster.cpuUsage > 90 ? 'bg-red-500' : cluster.cpuUsage > 70 ? 'bg-yellow-500' : 'bg-green-500'
                      }`} 
                      style={{ width: `${cluster.cpuUsage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-right mt-1">{cluster.cpuUsage}%</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">Memory Usage</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        cluster.memoryUsage > 90 ? 'bg-red-500' : cluster.memoryUsage > 70 ? 'bg-yellow-500' : 'bg-green-500'
                      }`} 
                      style={{ width: `${cluster.memoryUsage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-right mt-1">{cluster.memoryUsage}%</p>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Nodes:</span>
                  <span className="ml-1">{cluster.activeNodes}/{cluster.totalNodes}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Jobs:</span>
                  <span className="ml-1">{cluster.jobsRunning} running, {cluster.jobsQueued} queued</span>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Uptime:</span>
                  <span className="ml-1">{cluster.uptime}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Next Maintenance:</span>
                  <span className="ml-1">{cluster.nextMaintenance}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* HPC Jobs */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Running & Queued Jobs</h3>
          <div className="flex space-x-2">
            <select 
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={jobStatusFilter}
              onChange={(e) => setJobStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="Running">Running</option>
              <option value="Queued">Queued</option>
              <option value="Completed">Completed</option>
              <option value="Failed">Failed</option>
            </select>
            <select 
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={jobPriorityFilter}
              onChange={(e) => setJobPriorityFilter(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Normal">Normal</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID / Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resources</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {runningAndQueuedJobs.map(job => (
                <tr key={job.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{job.id}</div>
                    <div className="text-sm text-gray-500">{job.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      getJobStatusBadgeColor(job.status)
                    }`}>
                      {job.status}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        getJobPriorityBadgeColor(job.priority)
                      }`}>
                        {job.priority}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {job.status === 'Running' ? (
                      <div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="h-2.5 rounded-full bg-blue-500" 
                            style={{ width: `${job.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-right mt-1">{job.progress}%</p>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{job.cpuCores} CPUs, {job.memoryAllocated}</div>
                    <div className="text-xs text-gray-500">On {job.nodesAllocated} node(s)</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {job.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {job.startTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">Completed Jobs (Last 7 Days)</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID / Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resources</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Time</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {completedAndFailedJobs.map(job => (
                  <tr key={job.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{job.id}</div>
                      <div className="text-sm text-gray-500">{job.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        getJobStatusBadgeColor(job.status)
                      }`}>
                        {job.status}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          getJobPriorityBadgeColor(job.priority)
                        }`}>
                          {job.priority}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {calculateDuration(job.startTime, job.endTime)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{job.cpuCores} CPUs, {job.memoryAllocated}</div>
                      <div className="text-xs text-gray-500">On {job.nodesAllocated} node(s)</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {job.user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {job.endTime || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HPCStatus; 