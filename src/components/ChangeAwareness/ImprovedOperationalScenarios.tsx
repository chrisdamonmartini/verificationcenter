import React, { useState } from 'react';
import { StandardChangeTable } from './shared/StandardChangeTable';
import { OperationalScenarioChange, ImpactedItem } from '../../types/changeAwareness';
import { renderOperationalScenarioCategory } from './shared/TableConfigurations';
import { Card, Tabs } from 'antd';
import RelatedItemsSwimlane from './RelatedItemsSwimlane';
import { missionChanges, requirementChanges } from '../../mockData/changeAwarenessData';

const { TabPane } = Tabs;

const ImprovedOperationalScenarios: React.FC = () => {
  const [weeks, setWeeks] = useState<number>(4);
  const [productType, setProductType] = useState<'missile' | 'fighter'>('missile');

  // Find upstream and downstream items for a scenario
  const getRelatedItems = (selectedChange: OperationalScenarioChange) => {
    // Find upstream items (missions that impact this scenario)
    const upstreamItems: ImpactedItem[] = [];
    missionChanges.forEach(mission => {
      const impactsThisScenario = mission.impactedItems?.some(
        item => item.id === selectedChange.id && item.type === 'operationalScenario'
      );
      if (impactsThisScenario) {
        upstreamItems.push({
          id: mission.id,
          type: 'mission',
          name: mission.title
        });
      }
    });

    // Find downstream items (requirements impacted by this scenario)
    const downstreamItems: ImpactedItem[] = [];
    
    // Items explicitly listed in this scenario's impactedItems array
    selectedChange.impactedItems?.forEach(item => {
      // Don't add upstream items as downstream
      if (item.type !== 'mission') {
        downstreamItems.push(item);
      }
    });

    return {
      upstreamItems,
      downstreamItems
    };
  };

  // Custom expandable row render to include swimlanes
  const expandedRowRender = (record: OperationalScenarioChange) => {
    const { upstreamItems, downstreamItems } = getRelatedItems(record);
    
    return (
      <Card bordered={false} style={{ marginBottom: '16px' }}>
        <Tabs defaultActiveKey="swimlanes">
          <TabPane tab="Change Chain" key="swimlanes">
            <RelatedItemsSwimlane 
              selectedChange={record}
              upstreamItems={upstreamItems}
              downstreamItems={downstreamItems}
            />
          </TabPane>
          <TabPane tab="Details" key="details">
            <div style={{ padding: '16px' }}>
              <p><strong>Description:</strong> {record.description}</p>
              {record.scenarioType && (
                <p><strong>Scenario Type:</strong> {record.scenarioType}</p>
              )}
              {record.linkedMissions && record.linkedMissions.length > 0 && (
                <p><strong>Linked Missions:</strong> {record.linkedMissions.join(', ')}</p>
              )}
            </div>
          </TabPane>
        </Tabs>
      </Card>
    );
  };

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
        showTechnicalDetails: true,
        customExpandedRowRender: expandedRowRender
      }}
    />
  );
};

export default ImprovedOperationalScenarios; 