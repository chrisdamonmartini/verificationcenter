import React, { useState } from 'react';
import { StandardChangeTable } from './shared/StandardChangeTable';
import { BOMChange } from '../../types/changeAwareness';
import { renderBOMCategory } from './shared/TableConfigurations';

const ImprovedEngineeringBOMChanges: React.FC = () => {
  const [weeks, setWeeks] = useState<number>(4);
  const [productType, setProductType] = useState<'missile' | 'fighter'>('missile');

  return (
    <StandardChangeTable<BOMChange>
      domain="bom"
      title="Engineering BOM Changes"
      weeks={weeks}
      setWeeks={setWeeks}
      productType={productType}
      categoryRenderer={renderBOMCategory}
      expandedRowOptions={{
        showImpact: true,
        showTechnicalDetails: true,
        showDependencies: true
      }}
    />
  );
};

export default ImprovedEngineeringBOMChanges; 