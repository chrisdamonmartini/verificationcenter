import { AnyChange, BaseChange } from '../types/changeAwareness';
import { ProductType } from '../context/ProductContext';

// Sample domain item counts
const domainItemCounts: Record<string, Record<string, number>> = {
  requirement: { total: 42, critical: 6, high: 12, medium: 18, low: 6 },
  mission: { total: 24, critical: 3, high: 8, medium: 10, low: 3 },
  function: { total: 38, critical: 5, high: 12, medium: 15, low: 6 },
  logical: { total: 65, critical: 10, high: 20, medium: 25, low: 10 },
  physical: { total: 93, critical: 15, high: 30, medium: 35, low: 13 },
  parameter: { total: 56, critical: 8, high: 18, medium: 22, low: 8 },
  cad: { total: 78, critical: 12, high: 25, medium: 30, low: 11 },
  bom: { total: 45, critical: 7, high: 15, medium: 18, low: 5 }
};

// Generate random changes based on domain
const generateRandomChanges = (domain: string, count: number, productType: ProductType): BaseChange[] => {
  const changes: BaseChange[] = [];
  const statusOptions = ['Draft', 'In Review', 'Approved', 'Rejected', 'Implemented'] as const;
  const severityOptions = ['Critical', 'High', 'Medium', 'Low'] as const;
  const changeTypeOptions = ['New', 'Modified', 'Deprecated', 'Removed'] as const;
  
  for (let i = 0; i < count; i++) {
    const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
    const severity = severityOptions[Math.floor(Math.random() * severityOptions.length)];
    const changeType = changeTypeOptions[Math.floor(Math.random() * changeTypeOptions.length)];
    
    const impactedItems: Record<string, number> = {};
    
    // Generate random impact counts for other domains
    Object.keys(domainItemCounts).forEach(impactDomain => {
      if (Math.random() > 0.5) { // 50% chance of having impact on this domain
        impactedItems[impactDomain] = Math.floor(Math.random() * domainItemCounts[impactDomain].total * 0.2) + 1;
      }
    });

    const change: BaseChange = {
      id: `${domain.toUpperCase()}-${productType}-${i + 1000}`,
      name: `${domain.charAt(0).toUpperCase() + domain.slice(1)} Change ${i + 1}`,
      description: `This is a ${severity.toLowerCase()} ${changeType.toLowerCase()} change to the ${domain} affecting ${productType}.`,
      changedBy: `User${Math.floor(Math.random() * 10) + 1}`,
      changedDate: new Date(Date.now() - Math.floor(Math.random() * 60 * 24 * 60 * 60 * 1000)).toISOString(),
      status,
      severity,
      changeType,
      affectedSystem: `System-${Math.floor(Math.random() * 5) + 1}`,
      domain,
      impactedItems
    };
    
    changes.push(change);
  }
  
  return changes;
};

// Function to get filtered changes
export const getFilteredChanges = (
  domain: string, 
  weeks: number = 4, 
  productType: ProductType = 'missile'
): BaseChange[] => {
  const count = domainItemCounts[domain]?.total || 30;
  const changes = generateRandomChanges(domain, count, productType);
  
  // Filter by date range
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - (weeks * 7));
  
  return changes.filter(change => new Date(change.changedDate) >= cutoffDate);
};

// Function to get dashboard data
export const getDashboardData = (
  weeks: number = 4, 
  productType: ProductType = 'missile'
): Record<string, AnyChange[]> => {
  const domains = Object.keys(domainItemCounts);
  const result: Record<string, AnyChange[]> = {};
  
  domains.forEach(domain => {
    result[domain] = getFilteredChanges(domain, weeks, productType) as AnyChange[];
  });
  
  return result;
}; 