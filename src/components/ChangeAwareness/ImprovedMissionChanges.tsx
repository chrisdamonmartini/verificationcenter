import React, { useState } from 'react';
import { StandardChangeTable } from './shared/StandardChangeTable';
import { MissionChange } from '../../types/changeAwareness';
import { renderMissionCategory } from './shared/TableConfigurations';

const ImprovedMissionChanges: React.FC = () => {
  const [weeks, setWeeks] = useState<number>(4);
  const [productType, setProductType] = useState<'missile' | 'fighter'>('missile');

  return (
    <StandardChangeTable<MissionChange>
      domain="mission"
      title="Mission Changes"
      weeks={weeks}
      setWeeks={setWeeks}
      productType={productType}
      categoryRenderer={renderMissionCategory}
      expandedRowOptions={{
        showImpact: true,
        showTechnicalDetails: true
      }}
    />
  );
};

export default ImprovedMissionChanges; 