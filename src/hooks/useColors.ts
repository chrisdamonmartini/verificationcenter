/**
 * useColors hook
 * Provides standardized colors for use across the application
 */

// Define the color palette
const colorPalette = {
  // Brand colors
  brand: {
    primary: '#00688C',  // Deep blue
    secondary: '#5B8C9A' // Muted blue-gray
  },

  // Status/severity colors
  status: {
    critical: '#BC3D38', // Red
    major: '#E9963C',    // Orange/amber
    minor: '#34A06B',    // Green
    info: '#5B8C9A'      // Blue-gray
  },

  // Category colors for different types of items
  category: {
    mission: '#2E5475',     // Dark blue
    requirements: '#636DB5', // Indigo
    functions: '#34A06B',   // Green
    cad: '#9370DB',        // Purple
    bom: '#D25C7C',        // Rose
    parameter: '#E9963C'    // Amber
  },

  // Chart colors
  chart: {
    series1: '#00688C',  // Primary blue
    series2: '#34A06B',  // Green
    series3: '#E9963C',  // Amber
    series4: '#A56DB1',  // Purple
    series5: '#BC3D38',  // Red
    series6: '#636DB5',  // Indigo
    series7: '#617C7C',  // Slate
    series8: '#D25C7C',  // Rose
    
    backgroundLight: '#F9F9F9',  // Very light gray
    backgroundMedium: '#F0F0F0', // Light gray
    
    textPrimary: '#333333',    // Near black
    textSecondary: '#707070'   // Medium gray
  },

  // UI element colors
  ui: {
    border: '#E6E6E6',      // Light gray
    borderDark: '#CCCCCC',  // Medium gray
    hover: '#EAEAEA',       // Hover gray
    focus: '#00688C20',     // 20% opacity primary blue
    disabled: '#F5F5F5'     // Disabled gray
  },

  // Text colors
  text: {
    primary: '#333333',     // Near black
    secondary: '#707070',   // Medium gray 
    disabled: '#A0A0A0',    // Light gray
    inverse: '#FFFFFF'      // White
  },

  // Background colors
  background: {
    default: '#FFFFFF',     // White
    paper: '#F9F9F9',       // Very light gray
    disabled: '#F5F5F5',    // Disabled gray
    highlight: '#00688C10'  // 10% opacity primary blue
  }
};

// Hook to access color palette
const useColors = () => {
  return colorPalette;
};

export default useColors; 