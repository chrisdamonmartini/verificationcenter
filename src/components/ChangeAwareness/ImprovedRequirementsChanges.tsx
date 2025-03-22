import React, { useState } from 'react';
import { StandardChangeTable } from './shared/StandardChangeTable';
import { RequirementChange } from '../../types/changeAwareness';
import { renderRequirementCategory } from './shared/TableConfigurations';

const ImprovedRequirementsChanges: React.FC = () => {
  const [weeks, setWeeks] = useState<number>(4);
  const [productType, setProductType] = useState<'missile' | 'fighter'>('missile');

  return (
    <StandardChangeTable<RequirementChange>
      domain="requirement"
      title="Requirements Changes"
      weeks={weeks}
      setWeeks={setWeeks}
      productType={productType}
      categoryRenderer={renderRequirementCategory}
      expandedRowOptions={{
        showImpact: true,
        showTechnicalDetails: true,
        showDependencies: true
      }}
    />
  );
};

export default ImprovedRequirementsChanges; 