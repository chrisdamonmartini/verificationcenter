import colorPalette, { 
  brandColors, 
  statusColors, 
  chartColors, 
  categoryColors,
  chartColorArray,
  getChartColorByIndex,
  getLinearGradient
} from '../utils/colorPalette';

/**
 * A custom hook to provide easy access to the TeamCenter color palette
 * throughout the application
 */
const useColors = () => {
  return {
    // All color sets
    ...colorPalette,
    
    // Individual color sets for direct destructuring
    brand: brandColors,
    status: statusColors,
    chart: chartColors,
    category: categoryColors,
    
    // Helper functions
    getSeriesColor: getChartColorByIndex,
    getGradient: getLinearGradient,
    
    // Raw array for charting libraries
    seriesColors: chartColorArray,
    
    // CSS variable generator for component styles
    getCssVars: () => ({
      '--primary-color': brandColors.primary,
      '--secondary-color': brandColors.secondary,
      '--accent-color': brandColors.accent,
      '--critical-color': statusColors.critical,
      '--major-color': statusColors.major,
      '--minor-color': statusColors.minor,
      '--info-color': statusColors.info,
      '--background-light': chartColors.backgroundLight,
      '--background-medium': chartColors.backgroundMedium,
      '--text-primary': chartColors.textPrimary,
      '--text-secondary': chartColors.textSecondary,
    }),
  };
};

export default useColors; 