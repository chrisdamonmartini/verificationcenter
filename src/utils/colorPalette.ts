/**
 * TeamCenter-Style Color Palette
 * 
 * A consistent set of colors for use across dashboards, charts, and visualizations
 * in the Verification Center application.
 */

// Primary brand colors
export const brandColors = {
  primary: '#00688C',     // Primary blue - matches header
  secondary: '#003750',   // Dark blue - matches subheader
  accent: '#ABE7F6',      // Light blue accent - matches tab highlight
};

// Status/severity colors
export const statusColors = {
  critical: '#BC3D38',    // Red for critical items
  major: '#E9963C',       // Orange for major items
  minor: '#34A06B',       // Green for minor items
  info: '#5B8C9A',        // Blue-gray for informational items
};

// Chart colors - for consistent data visualization
export const chartColors = {
  // Primary series colors (colorblind-friendly)
  series1: '#00688C',     // Primary blue
  series2: '#E9963C',     // Orange
  series3: '#34A06B',     // Green
  series4: '#7B64C0',     // Purple
  series5: '#5D87A1',     // Blue-gray
  series6: '#D95555',     // Red
  series7: '#6EB5C0',     // Teal
  series8: '#CCA539',     // Gold
  
  // Background colors
  backgroundLight: '#f9f9f9',  // Light gray for containers
  backgroundMedium: '#f0f0f0', // Medium gray for alternating rows
  
  // Text colors
  textPrimary: '#333333',      // Primary text
  textSecondary: '#767676',    // Secondary/helper text
};

// Category colors - for domain-specific items
export const categoryColors = {
  mission: '#4A6FA5',        // Mission-related
  requirements: '#E9963C',   // Requirements-related 
  functions: '#7B64C0',      // Functions-related
  cad: '#34A06B',            // CAD design-related
  bom: '#BC3D38',            // BOM-related
};

// Create an array of chart colors for easy iteration
export const chartColorArray = [
  chartColors.series1,
  chartColors.series2, 
  chartColors.series3,
  chartColors.series4,
  chartColors.series5,
  chartColors.series6,
  chartColors.series7,
  chartColors.series8,
];

// Function to get colors by index (for dynamic chart generation)
export const getChartColorByIndex = (index: number): string => {
  return chartColorArray[index % chartColorArray.length];
};

// Gradient generators for charts
export const getLinearGradient = (color: string, opacity: number = 0.8): string => {
  return `linear-gradient(135deg, ${color}, ${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')})`;
};

// Export a default color palette object with all color sets
const colorPalette = {
  brand: brandColors,
  status: statusColors,
  chart: chartColors,
  category: categoryColors,
  getChartColor: getChartColorByIndex,
  getGradient: getLinearGradient,
};

export default colorPalette; 