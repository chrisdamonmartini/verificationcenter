import React, { useState } from 'react';
import { StandardChangeTable } from './shared/StandardChangeTable';
import { OperationalScenarioChange } from '../../types/changeAwareness';
import { renderOperationalScenarioCategory } from './shared/TableConfigurations';

const ImprovedOperationalScenarios: React.FC = () => {
  const [weeks, setWeeks] = useState<number>(4);
  const [productType, setProductType] = useState<'missile' | 'fighter'>('missile');

  return (
    <StandardChangeTable<OperationalScenarioChange>
      domain="operationalScenario"
      title="Operational Scenario Changes"
      weeks={weeks}
      setWeeks={setWeeks}
      productType={productType}
      categoryRenderer={renderOperationalScenarioCategory}
      expandedRowOptions={{
        showImpact: true,
        showTechnicalDetails: true
      }}
    />
  );
};

export default ImprovedOperationalScenarios; 