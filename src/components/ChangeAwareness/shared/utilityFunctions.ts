/**
 * Utility functions for Change Awareness components
 */

import { AnyChange } from '../../../types/changeAwareness';

/**
 * Filter out items with "Current" status
 */
export const filterCurrentStatus = (items: AnyChange[]): AnyChange[] => {
  return items.filter(item => item.status !== 'Current');
};

/**
 * Format date to a more readable format
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

/**
 * Get the relative time (e.g., "2 days ago") from a date string
 */
export const getRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}; 