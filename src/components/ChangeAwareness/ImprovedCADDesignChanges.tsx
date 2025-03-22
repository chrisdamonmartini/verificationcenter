import React, { useState } from 'react';
import { StandardChangeTable } from './shared/StandardChangeTable';
import { CADChange } from '../../types/changeAwareness';
import { renderCADCategory } from './shared/TableConfigurations';

const ImprovedCADDesignChanges: React.FC = () => {
  const [weeks, setWeeks] = useState<number>(4);
  const [productType, setProductType] = useState<'missile' | 'fighter'>('missile');

  return (
    <StandardChangeTable<CADChange>
      domain="cad"
      title="CAD Design Changes"
      weeks={weeks}
      setWeeks={setWeeks}
      productType={productType}
      categoryRenderer={renderCADCategory}
      expandedRowOptions={{
        showImpact: true,
        showTechnicalDetails: true,
        showDependencies: true
      }}
    />
  );
};

export default ImprovedCADDesignChanges; 