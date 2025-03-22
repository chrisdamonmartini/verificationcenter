import React, { useState } from 'react';
import { StandardChangeTable } from './shared/StandardChangeTable';
import { LogicalChange } from '../../types/changeAwareness';
import { renderLogicalCategory } from './shared/TableConfigurations';

const ImprovedLogicalChanges: React.FC = () => {
  const [weeks, setWeeks] = useState<number>(4);
  const [productType, setProductType] = useState<'missile' | 'fighter'>('missile');

  return (
    <StandardChangeTable<LogicalChange>
      domain="logical"
      title="Logical Architecture Changes"
      weeks={weeks}
      setWeeks={setWeeks}
      productType={productType}
      categoryRenderer={renderLogicalCategory}
      expandedRowOptions={{
        showImpact: true,
        showTechnicalDetails: true,
        showDependencies: true
      }}
    />
  );
};

export default ImprovedLogicalChanges; 