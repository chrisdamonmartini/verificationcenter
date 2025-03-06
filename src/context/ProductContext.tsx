import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the product types
export type ProductType = 'missile' | 'fighter';

// Define the context type
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
}

// Create context with default values
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Details for each product type
const productDetails = {
  missile: {
    program: 'Advanced Tactical Missile System',
    version: 'Block 3',
    stage: 'Development',
    organization: 'Defense Systems Division'
  },
  fighter: {
    program: 'Next-Gen Fighter Aircraft',
    version: 'F/A-29E',
    stage: 'System Integration',
    organization: 'Aerospace Systems Group'
  }
};

// Names for each product type
const productNames = {
  missile: 'ATMS Block 3',
  fighter: 'F/A-29E Raptor II'
};

// Provider component
export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [productType, setProductType] = useState<ProductType>('missile');

  // Computed values based on product type
  const productName = productNames[productType];
  const details = productDetails[productType];

  return (
    <ProductContext.Provider
      value={{
        productType,
        setProductType,
        productName,
        productDetails: details
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Hook for using the product context
export const useProduct = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
}; 