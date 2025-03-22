import React, { useState } from 'react';
import { StandardChangeTable } from './shared/StandardChangeTable';
import { RequirementChange } from '../../types/changeAwareness';
import { renderRequirementCategory } from './shared/TableConfigurations';
import { Card } from 'antd';
import ContentPanel from '../common/ContentPanel';

const ImprovedRequirementsChanges: React.FC = () => {
  const [weeks, setWeeks] = useState<number>(4);
  const [productType, setProductType] = useState<'missile' | 'fighter'>('missile');

  const mockRequirementChanges: RequirementChange[] = [
    // ...existing mock data remains the same
  ];

  return (
    <div className="requirements-changes">
      <ContentPanel title="Requirements Changes">
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
      </ContentPanel>
    </div>
  );
};

export default ImprovedRequirementsChanges; 