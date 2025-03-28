import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Tag, Space, Divider, Button, Tooltip, Alert } from 'antd';
import { ArrowRightOutlined, CaretRightOutlined, DownOutlined, RightOutlined } from '@ant-design/icons';
import { MissionChange, OperationalScenarioChange, RequirementChange, ImpactedItem } from '../../types/changeAwareness';
import { missionChanges, operationalScenarioChanges, requirementChanges } from '../../mockData/changeAwarenessData';
import useColors from '../../hooks/useColors';

// Import icons
import MissionIcon from '../../icons/typeTarget48.svg';
import OperationalScenariosIcon from '../../icons/typeBranchRevision48.svg';
import RequirementsIcon from '../../icons/Requirements.svg';
import ParametersIcon from '../../icons/Parameters.svg';
import FunctionsIcon from '../../icons/Functions.svg';
import LogicalIcon from '../../icons/Logical.svg';
import CADIcon from '../../icons/typePartComponent48.svg';
import EBOMIcon from '../../icons/typeClass48.svg';

const { Title, Text } = Typography;

// Interface for the expanded change tree
interface ChangeTree {
  mission: MissionChange;
  operationalScenarios: OperationalScenarioChange[];
  requirements: RequirementChange[];
  parameters: ImpactedItem[];
  functions: ImpactedItem[];
  logical: ImpactedItem[];
  cad: ImpactedItem[];
  bom: ImpactedItem[];
}

// Domain type mapping
const domainTypeMap: Record<string, string> = {
  'mission': 'Mission',
  'operationalScenario': 'Operational Scenario',
  'requirement': 'Requirement',
  'parameter': 'Parameter',
  'function': 'Function',
  'logical': 'Logical Architecture',
  'cad': 'CAD Design',
  'bom': 'Engineering BOM'
};

// Domain icon mapping
const domainIconMap: Record<string, string> = {
  'mission': MissionIcon,
  'operationalScenario': OperationalScenariosIcon,
  'requirement': RequirementsIcon,
  'parameter': ParametersIcon,
  'function': FunctionsIcon,
  'logical': LogicalIcon,
  'cad': CADIcon,
  'bom': EBOMIcon
};

// Helper function to get color class for domain
const getDomainColorClass = (domain: string): string => {
  switch (domain) {
    case 'mission':
      return 'mission-item';
    case 'operationalScenario':
      return 'scenario-item';
    case 'requirement':
      return 'requirement-item';
    case 'parameter': 
      return 'parameter-item';
    case 'function':
      return 'function-item';
    case 'logical':
      return 'logical-item';
    case 'cad':
      return 'cad-item';
    case 'bom':
      return 'bom-item';
    default:
      return '';
  }
};

const ChangeChain: React.FC = () => {
  const [selectedMission, setSelectedMission] = useState<MissionChange | null>(null);
  const [changeTree, setChangeTree] = useState<ChangeTree | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    operationalScenarios: true,
    requirements: true,
    parameters: true,
    functions: true,
    logical: true,
    cad: true,
    bom: true
  });
  const colors = useColors();

  // CSS styles for the component
  const styles = {
    wrapper: {
      padding: '16px 0',
      maxWidth: '100%',
      overflow: 'auto'
    },
    swimlane: {
      marginBottom: '24px',
      position: 'relative' as const
    },
    swimlaneHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '12px',
      cursor: 'pointer',
      userSelect: 'none' as const
    },
    swimlaneTitle: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginLeft: '8px',
      marginRight: '8px'
    },
    itemCount: {
      marginLeft: '8px',
      fontSize: '14px',
      color: colors.chart.textSecondary
    },
    cardWrapper: {
      display: 'flex',
      flexWrap: 'nowrap' as const,
      overflowX: 'auto' as const,
      padding: '8px 0',
      position: 'relative' as const
    },
    missionCard: {
      width: '320px',
      minWidth: '320px',
      marginRight: '16px',
      border: `1px solid ${colors.category.mission}`
    },
    operationalScenarioCard: {
      width: '300px',
      minWidth: '300px',
      marginRight: '16px',
      border: `1px solid ${colors.chart.series3}`
    },
    requirementCard: {
      width: '280px',
      minWidth: '280px',
      marginRight: '16px',
      border: `1px solid ${colors.category.requirements}`
    },
    itemCard: {
      width: '260px',
      minWidth: '260px',
      marginRight: '16px'
    },
    cardTitle: {
      fontSize: '14px',
      fontWeight: 'bold',
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'center'
    },
    cardId: {
      fontSize: '12px',
      color: colors.chart.textSecondary,
      marginBottom: '8px'
    },
    cardIcon: {
      width: '24px',
      height: '24px',
      marginRight: '8px'
    },
    cardContent: {
      fontSize: '13px'
    },
    arrowIcon: {
      fontSize: '20px',
      color: colors.chart.textSecondary,
      margin: '0 8px'
    },
    emptyMessage: {
      padding: '24px',
      textAlign: 'center' as const
    },
    impactedItemsList: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '8px'
    },
    itemRow: {
      display: 'flex',
      alignItems: 'center',
      padding: '8px',
      borderRadius: '4px',
      backgroundColor: '#f5f5f5'
    }
  };

  // Add dynamic color classes
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .mission-item { border-color: ${colors.category.mission} !important; }
      .scenario-item { border-color: ${colors.chart.series3} !important; }
      .requirement-item { border-color: ${colors.category.requirements} !important; }
      .parameter-item { border-color: ${colors.category.parameter} !important; }
      .function-item { border-color: ${colors.category.functions} !important; }
      .logical-item { border-color: ${colors.chart.series1} !important; }
      .cad-item { border-color: ${colors.category.cad} !important; }
      .bom-item { border-color: ${colors.category.bom} !important; }
    `;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, [colors]);

  // Select first mission by default
  useEffect(() => {
    if (missionChanges.length > 0 && !selectedMission) {
      handleSelectMission(missionChanges[0]);
    }
  }, []);

  // Build the change tree when a mission is selected
  useEffect(() => {
    if (!selectedMission) return;
    
    // Find relevant operational scenarios
    const relatedScenarios = operationalScenarioChanges.filter(scenario => {
      return scenario.impactedItems?.some(item => 
        item.id === selectedMission.id && item.type === 'mission'
      );
    });
    
    // Find requirements impacted by the mission or operational scenarios
    const relatedRequirements = requirementChanges.filter(req => {
      // Direct impact from mission
      const directImpact = selectedMission.impactedItems?.some(item => 
        item.id === req.id && item.type === 'requirement'
      );
      
      // Impact from related operational scenarios
      const scenarioImpact = relatedScenarios.some(scenario => 
        scenario.impactedItems?.some(item => 
          item.id === req.id && item.type === 'requirement'
        )
      );
      
      return directImpact || scenarioImpact;
    });
    
    // Extract impacted items by type from mission and operational scenarios
    const extractImpactedItemsByType = (type: string): ImpactedItem[] => {
      const items: ImpactedItem[] = [];
      
      // From mission
      selectedMission.impactedItems?.forEach(item => {
        if (item.type === type && !items.some(i => i.id === item.id)) {
          items.push(item);
        }
      });
      
      // From operational scenarios
      relatedScenarios.forEach(scenario => {
        scenario.impactedItems?.forEach(item => {
          if (item.type === type && !items.some(i => i.id === item.id)) {
            items.push(item);
          }
        });
      });
      
      // From requirements
      relatedRequirements.forEach(req => {
        req.impactedItems?.forEach(item => {
          if (item.type === type && !items.some(i => i.id === item.id)) {
            items.push(item);
          }
        });
      });
      
      return items;
    };
    
    // Build the complete change tree
    setChangeTree({
      mission: selectedMission,
      operationalScenarios: relatedScenarios,
      requirements: relatedRequirements,
      parameters: extractImpactedItemsByType('parameter'),
      functions: extractImpactedItemsByType('function'),
      logical: extractImpactedItemsByType('logical'),
      cad: extractImpactedItemsByType('cad'),
      bom: extractImpactedItemsByType('bom')
    });
  }, [selectedMission]);

  // Handle mission selection
  const handleSelectMission = (mission: MissionChange) => {
    setSelectedMission(mission);
  };

  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Get appropriate card style based on domain
  const getCardStyle = (domain: string) => {
    const baseStyle = { ...styles.itemCard };
    return {
      ...baseStyle,
      borderColor: domain === 'mission' ? colors.category.mission :
                  domain === 'operationalScenario' ? colors.chart.series3 :
                  domain === 'requirement' ? colors.category.requirements :
                  domain === 'parameter' ? colors.category.parameter :
                  domain === 'function' ? colors.category.functions :
                  domain === 'logical' ? colors.chart.series1 :
                  domain === 'cad' ? colors.category.cad :
                  domain === 'bom' ? colors.category.bom : '#d9d9d9'
    };
  };

  // Render a card for an item
  const renderItemCard = (item: any, domain: string) => {
    const domainClass = getDomainColorClass(domain);
    return (
      <Card 
        key={item.id} 
        style={getCardStyle(domain)}
        className={domainClass}
        size="small"
        hoverable
      >
        <div style={styles.cardTitle}>
          <img src={domainIconMap[domain]} alt={domain} style={styles.cardIcon} />
          {item.title || item.name}
        </div>
        <div style={styles.cardId}>{item.id}</div>
        {item.description && (
          <div style={styles.cardContent}>{item.description}</div>
        )}
        {domain === 'mission' && item.impactedItems && (
          <div style={{ marginTop: '12px' }}>
            <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>
              Impacts {item.impactedItems.length} items
            </Text>
            <Space wrap>
              {Object.entries(countImpactsByType(item.impactedItems)).map(([type, count]) => (
                <Tag key={type}>
                  {type}: {count}
                </Tag>
              ))}
            </Space>
          </div>
        )}
      </Card>
    );
  };

  // Count impacts by type
  const countImpactsByType = (items: ImpactedItem[] | undefined): Record<string, number> => {
    if (!items) return {};
    
    const counts: Record<string, number> = {};
    items.forEach(item => {
      counts[item.type] = (counts[item.type] || 0) + 1;
    });
    
    return counts;
  };

  // Render swimlane section
  const renderSwimlane = (title: string, domain: string, items: any[] | undefined, section: string) => {
    if (!items || items.length === 0) return null;
    
    const isExpanded = expandedSections[section];
    
    return (
      <div style={styles.swimlane}>
        <div 
          style={styles.swimlaneHeader} 
          onClick={() => toggleSection(section)}
        >
          {isExpanded ? <DownOutlined /> : <RightOutlined />}
          <span style={styles.swimlaneTitle}>
            <img src={domainIconMap[domain]} alt={title} style={{ width: '20px', height: '20px', marginRight: '8px' }} />
            {title}
          </span>
          <span style={styles.itemCount}>({items.length} items)</span>
        </div>
        
        {isExpanded && (
          <div style={styles.cardWrapper}>
            {items.map(item => renderItemCard(item, domain))}
          </div>
        )}
      </div>
    );
  };

  if (!changeTree) {
    return (
      <div style={styles.emptyMessage}>
        <Alert
          message="No mission selected"
          description="Please select a mission to view its impact across domains"
          type="info"
          showIcon
        />
      </div>
    );
  }

  // Render the component
  return (
    <div style={styles.wrapper}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={4}>Change Impact Visualization</Title>
          <Text type="secondary">Showing how changes propagate across domains from mission to implementation</Text>
        </Col>
        
        <Col span={24}>
          <Card title="Select Mission" size="small">
            <Space wrap>
              {missionChanges.map(mission => (
                <Button 
                  key={mission.id}
                  type={selectedMission?.id === mission.id ? 'primary' : 'default'}
                  onClick={() => handleSelectMission(mission)}
                >
                  {mission.title}
                </Button>
              ))}
            </Space>
          </Card>
        </Col>
        
        <Col span={24}>
          <Card 
            title={
              <Space>
                <img src={MissionIcon} alt="Mission" style={{ width: '24px', height: '24px' }} />
                <span>Selected Mission</span>
              </Space>
            } 
            size="small"
          >
            <div style={styles.cardWrapper}>
              {renderItemCard(changeTree.mission, 'mission')}
            </div>
          </Card>
        </Col>
      </Row>
      
      <Divider />
      
      {/* Swimlanes for each domain */}
      {renderSwimlane("Operational Scenarios", "operationalScenario", changeTree.operationalScenarios, "operationalScenarios")}
      {renderSwimlane("Requirements", "requirement", changeTree.requirements, "requirements")}
      {renderSwimlane("Parameters", "parameter", changeTree.parameters, "parameters")}
      {renderSwimlane("Functions", "function", changeTree.functions, "functions")}
      {renderSwimlane("Logical Architecture", "logical", changeTree.logical, "logical")}
      {renderSwimlane("CAD Design", "cad", changeTree.cad, "cad")}
      {renderSwimlane("Engineering BOM", "bom", changeTree.bom, "bom")}
    </div>
  );
};

export default ChangeChain; 