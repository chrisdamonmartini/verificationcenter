# Change Awareness Shared Components

This directory contains shared utility components, hooks, and types that provide a standardized implementation pattern for all Change Awareness tab components. These utilities ensure consistency across the application with minimal code duplication.

## Component Structure

The shared utilities follow a layered approach:

1. **Types**: Type definitions for change data and components
2. **Utility Components**: Reusable UI elements (tags, codes, etc.)
3. **Table Configurations**: Standardized column definitions and renderers
4. **Expandable Rows**: Standard components for expanded row content
5. **Hooks**: Custom hooks for data fetching, filtering, pagination, etc.
6. **Table Component**: A standardized table with all features preconfigured

## How to Use

### 1. Implement a Change Awareness Tab Component

Creating a new Change Awareness tab component is simple:

```tsx
import React from 'react';
import { YourChangeType } from '../../types/changeAwareness';
import { ChangesComponentProps } from '../../types/changeAwareness';
import { StandardChangeTable } from './shared/StandardChangeTable';
import { yourCategoryRenderer } from './shared/TableConfigurations';

const YourChangesComponent: React.FC<ChangesComponentProps> = ({ 
  weeks, 
  setWeeks, 
  productType = 'missile' 
}) => {
  return (
    <StandardChangeTable<YourChangeType>
      title="Your Component Title"
      domain="yourDomain" // Must match the domain key in mockData
      weeks={weeks}
      setWeeks={setWeeks}
      productType={productType}
      categoryRenderer={yourCategoryRenderer}
      expandedRowOptions={{
        showTechnicalDetails: true,
        showImpact: true,
        showDependencies: true,
        showDocuments: true,
        // Optional custom section
        customSectionTitle: "Your Custom Section",
        customSectionContent: (record) => <YourCustomContent record={record} />
      }}
      tableOptions={{
        idField: 'yourTypeId', // The specific ID field for your domain
        idLabel: 'Your ID Label',
        showImpact: true,
        searchableFields: ['id', 'title', 'description', 'yourTypeId', 'author']
      }}
    />
  );
};

export default YourChangesComponent;
```

### 2. Add Category Renderer

If your change type has unique categories, add a category renderer in `TableConfigurations.tsx`:

```tsx
export const yourCategoryRenderer = (category: string, _: YourChangeType) => {
  const categoryIcons: Record<string, React.ReactNode> = {
    categoryA: <span>🔧</span>,
    categoryB: <span>📅</span>,
    // Add more icons for your categories
  };
  
  const colors: Record<string, string> = {
    categoryA: 'blue',
    categoryB: 'orange',
    // Add more colors for your categories
  };
  
  return (
    <Tag color={colors[category]} icon={categoryIcons[category]}>
      {category.toUpperCase()}
    </Tag>
  );
};
```

### 3. Update Types (if needed)

If adding a new change type, update the `changeAwareness.ts` types file with your domain-specific interface.

## Benefits

- **Standardized UI**: Consistent appearance and behavior across all tabs
- **Reduced code duplication**: 90%+ code reduction per component
- **Centralized behavior**: Filters, sorting, pagination, and search managed in one place
- **Easier maintenance**: Bug fixes and enhancements only need to be applied once
- **Improved performance**: Optimized components with proper React patterns

## Components Overview

- **StandardChangeTable**: Main table component with all standard features
- **TableConfigurations**: Predefined column configurations for each domain
- **ExpandedRowComponents**: Standardized expanded row content components
- **UtilityComponents**: Shared UI elements like tags, codes, etc.
- **hooks.tsx**: Custom hooks for data management and UI state 