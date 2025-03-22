import React, { useState } from 'react';
import { StandardChangeTable } from './shared/StandardChangeTable';
import { ParameterChange } from '../../types/changeAwareness';
import { renderParameterCategory } from './shared/TableConfigurations';

const ImprovedParametersChanges: React.FC = () => {
  const [weeks, setWeeks] = useState<number>(4);
  const [productType, setProductType] = useState<'missile' | 'fighter'>('missile');

  return (
    <StandardChangeTable<ParameterChange>
      domain="parameter"
      title="Parameter Changes"
      weeks={weeks}
      setWeeks={setWeeks}
      productType={productType}
      categoryRenderer={renderParameterCategory}
      expandedRowOptions={{
        showImpact: true,
        showTechnicalDetails: true,
        showDependencies: true
      }}
    />
  );
};

export default ImprovedParametersChanges; 