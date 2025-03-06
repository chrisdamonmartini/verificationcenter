import React, { createContext, useContext, useState, ReactNode } from 'react';

// Type for different product types
export type ProductType = 'missile' | 'fighter';

// Define the shape of our context
interface ProductContextType {
  productType: ProductType;
  setProductType: (type: ProductType) => void;
  productName: string;
  productDetails: {
    program: string;
    version: string;
    stage: string;
    organization: string;
  };
  // Keep these methods for backward compatibility
  getProductName: () => string;
  getProductDetails: () => {
    name: string;
    description: string;
    image?: string;
  };
}

// Create the context with a default value
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Provider component
export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State to track the current product type
  const [productType, setProductType] = useState<ProductType>('missile');

  // Function to get the product name
  const getProductName = (): string => {
    return productType === 'missile' 
      ? 'Advanced Tactical Missile System' 
      : 'Next-Gen Fighter Aircraft';
  };

  // Function to get the product details
  const getProductDetails = () => {
    if (productType === 'missile') {
      return {
        name: 'Advanced Tactical Missile System',
        description: 'Long-range precision strike missile system with advanced guidance and targeting capabilities.',
        image: '/images/missile.jpg'
      };
    } else {
      return {
        name: 'Next-Gen Fighter Aircraft',
        description: 'Stealth multi-role fighter aircraft designed for air superiority and ground attack missions.',
        image: '/images/fighter.jpg'
      };
    }
  };

  // Get product details for legacy interface
  const getProductDetailsLegacy = () => {
    if (productType === 'missile') {
      return {
        name: 'ATMS Block 3',
        program: 'Advanced Tactical Missile System',
        version: 'Block 3',
        stage: 'Development',
        organization: 'Defense Systems Division'
      };
    } else {
      return {
        name: 'F/A-29E Raptor II',
        program: 'Advanced Tactical Fighter',
        version: '2.3',
        stage: 'Testing',
        organization: 'Aerospace Division'
      };
    }
  };

  const details = getProductDetailsLegacy();

  // Value object that will be passed to consumers
  const value = {
    productType,
    setProductType,
    productName: details.name,
    productDetails: {
      program: details.program,
      version: details.version,
      stage: details.stage,
      organization: details.organization
    },
    getProductName,
    getProductDetails
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use the product context
export const useProduct = (): ProductContextType => {
  const context = useContext(ProductContext);
  
  if (context === undefined) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  
  return context;
};

export default ProductContext; 