import React, { useState, useEffect } from 'react';
import { StandardChangeTable } from './shared/StandardChangeTable';
import { RequirementChange } from '../../types/changeAwareness';
import { renderRequirementCategory } from './shared/TableConfigurations';

const ImprovedRequirementsChanges: React.FC = () => {
  const [weeks, setWeeks] = useState<number>(52);
  const [productType, setProductType] = useState<'missile' | 'fighter'>('missile');
  
  useEffect(() => {
    console.log("Requirements tab - weeks updated:", weeks);
  }, [weeks]);

  return (
    <StandardChangeTable<RequirementChange>
      domain="requirement"
      title="Requirement Changes"
      weeks={weeks}
      setWeeks={setWeeks}
      productType={productType}
      categoryRenderer={renderRequirementCategory}
      expandedRowOptions={{
        showImpact: true,
        showTechnicalDetails: true
      }}
      tableOptions={{
        hideStatsCard: false
      }}
    />
  );
};

export default ImprovedRequirementsChanges; 