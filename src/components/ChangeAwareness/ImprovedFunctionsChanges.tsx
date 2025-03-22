import React, { useState } from 'react';
import { StandardChangeTable } from './shared/StandardChangeTable';
import { FunctionChange } from '../../types/changeAwareness';
import { renderFunctionCategory } from './shared/TableConfigurations';

const ImprovedFunctionsChanges: React.FC = () => {
  const [weeks, setWeeks] = useState<number>(4);
  const [productType, setProductType] = useState<'missile' | 'fighter'>('missile');

  return (
    <StandardChangeTable<FunctionChange>
      domain="function"
      title="Function Changes"
      weeks={weeks}
      setWeeks={setWeeks}
      productType={productType}
      categoryRenderer={renderFunctionCategory}
      expandedRowOptions={{
        showImpact: true,
        showTechnicalDetails: true,
        showDependencies: true
      }}
    />
  );
};

export default ImprovedFunctionsChanges; 