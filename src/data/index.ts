import { ProductType } from '../context/ProductContext';

// Import missile data
import * as missileRequirements from './missile/requirements';

// Import fighter data
import * as fighterRequirements from './fighter/requirements';

// Function to get the appropriate data based on product type
export const getRequirementsData = (productType: ProductType) => {
  switch (productType) {
    case 'missile':
      return {
        systemRequirements: missileRequirements.systemRequirements,
        functionalRequirements: missileRequirements.functionalRequirements,
        testCases: missileRequirements.testCases
      };
    case 'fighter':
      return {
        systemRequirements: fighterRequirements.systemRequirements,
        functionalRequirements: fighterRequirements.functionalRequirements,
        testCases: fighterRequirements.testCases
      };
    default:
      return {
        systemRequirements: [],
        functionalRequirements: [],
        testCases: []
      };
  }
};

// Add more data getter functions as needed for different parts of the application
// For example:

// export const getVerificationData = (productType: ProductType) => {
//   switch (productType) {
//     case 'missile':
//       return missileVerification;
//     case 'fighter':
//       return fighterVerification;
//     default:
//       return {};
//   }
// }; 