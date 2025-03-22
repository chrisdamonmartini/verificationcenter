import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Tag, Space, Divider, Button, Descriptions, Spin } from 'antd';
import { FileTextOutlined, CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import RelatedItemsPanel, { RelatedItem, EBOMItem, MissionItem, RequirementItem, FunctionItem, LogicalItem, CADItem, ModelItem, AutomationItem } from '../common/RelatedItemsPanel';

const { Title, Text } = Typography;

interface AnalysisDetailProps {
  analysisId: string;
}

interface AnalysisData {
  id: string;
  title: string;
  description: string;
  status: 'Completed' | 'In Progress' | 'Planned' | 'Failed';
  type: string;
  date: string;
  author: string;
  results?: {
    maxStress?: number;
    maxDeformation?: number;
    safetyFactor?: number;
    confidence?: number;
  };
}

const AnalysisDetail: React.FC<AnalysisDetailProps> = ({ analysisId }) => {
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [relatedItems, setRelatedItems] = useState<{
    mission: any[];
    requirements: any[];
    functions: any[];
    logical: any[];
    cad: any[];
    ebom: any[];
    models: any[];
    automation: any[];
  }>({
    mission: [],
    requirements: [],
    functions: [],
    logical: [],
    cad: [],
    ebom: [],
    models: [],
    automation: []
  });

  // Simulate fetching data
  useEffect(() => {
    // In a real app, you would make an API call here
    setTimeout(() => {
      // Mock analysis data
      const mockAnalysis: AnalysisData = {
        id: analysisId,
        title: 'Wing Load Analysis - Flight Condition A',
        description: 'Structural integrity analysis of the main wing assembly under high-speed flight conditions',
        status: 'Completed',
        type: 'Finite Element Analysis',
        date: '2025-01-15',
        author: 'John Smith',
        results: {
          maxStress: 325.8,
          maxDeformation: 12.5,
          safetyFactor: 1.8,
          confidence: 0.95
        }
      };
      
      // Mock related items
      const mockRelatedItems = {
        mission: [
          {
            id: 'M-101',
            title: 'High-Speed Cruise',
            status: 'Current',
            date: '2024-12-10',
            author: 'Mission Planning',
            objective: 'Sustain Mach 0.85 at 35,000 ft',
            priority: 'High'
          }
        ],
        requirements: [
          {
            id: 'SR-201',
            title: 'Wing Load Requirements',
            status: 'Released',
            date: '2024-11-05',
            author: 'Systems Engineering',
            type: 'Performance',
            verification: 'Analysis'
          },
          {
            id: 'SR-202',
            title: 'Structural Integrity',
            status: 'Released',
            date: '2024-11-10',
            author: 'Structures Team',
            type: 'System',
            verification: 'Test'
          }
        ],
        functions: [
          {
            id: 'FUNC-301',
            title: 'Load Distribution',
            status: 'Current',
            date: '2024-10-15',
            author: 'Aerodynamics',
            category: 'Structural',
            inputs: ['Airspeed', 'Altitude', 'Weight'],
            outputs: ['Load Distribution']
          }
        ],
        logical: [
          {
            id: 'LB-401',
            title: 'Wing Structure Model',
            status: 'Current',
            date: '2024-11-20',
            author: 'Design Team',
            category: 'Block',
            implementedFunctions: ['FUNC-301']
          }
        ],
        cad: [
          {
            id: 'CAD-501',
            title: 'Wing Assembly',
            status: 'Released',
            date: '2024-12-01',
            author: 'CAD Department',
            partNumber: 'WNG-A22-01',
            revision: 'C',
            maturity: 'Released'
          },
          {
            id: 'CAD-502',
            title: 'Wing Skin',
            status: 'Released',
            date: '2024-12-05',
            author: 'CAD Department',
            partNumber: 'WNG-A22-02',
            revision: 'B',
            maturity: 'Released'
          }
        ],
        ebom: [
          {
            id: 'BOM-601',
            title: 'Wing Assembly BOM',
            status: 'Released',
            date: '2024-12-10',
            author: 'Manufacturing',
            partNumber: 'WNG-A22-01',
            quantity: 1,
            supplier: 'Internal'
          },
          {
            id: 'BOM-602',
            title: 'Fasteners',
            status: 'Released',
            date: '2024-12-10',
            author: 'Manufacturing',
            partNumber: 'FST-103',
            quantity: 240,
            supplier: 'Aerospace Fasteners Inc.'
          }
        ],
        models: [
          {
            id: 'MDL-701',
            title: 'Wing FEM',
            status: 'Current',
            date: '2025-01-05',
            author: 'Analysis Team',
            type: 'Analysis',
            format: 'Nastran',
            version: '3.2'
          },
          {
            id: 'MDL-702',
            title: 'Aerodynamic Model',
            status: 'Current',
            date: '2025-01-02',
            author: 'Aerodynamics',
            type: 'Simulation',
            format: 'CFD',
            version: '2.1'
          }
        ],
        automation: [
          {
            id: 'AUTO-801',
            title: 'Load Analysis Workflow',
            status: 'Active',
            date: '2025-01-10',
            author: 'Process Automation',
            type: 'Workflow',
            language: 'Python',
            lastRun: '2025-01-15'
          }
        ]
      };
      
      setAnalysis(mockAnalysis);
      setRelatedItems(mockRelatedItems);
      setLoading(false);
    }, 1000);
  }, [analysisId]);
  
  const handleRelatedItemClick = (item: RelatedItem, type: string) => {
    console.log(`Clicked on ${type} item:`, item);
    // In a real app, you might navigate to the item's detail page
  };
  
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
        <Spin size="large" tip="Loading analysis details..." />
      </div>
    );
  }
  
  if (!analysis) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <ExclamationCircleOutlined style={{ fontSize: '32px', color: '#ff4d4f' }} />
        <Title level={4}>Analysis Not Found</Title>
        <Text>The requested analysis could not be found or may have been deleted.</Text>
      </div>
    );
  }
  
  const getStatusTag = (status: string) => {
    switch (status) {
      case 'Completed':
        return <Tag icon={<CheckCircleOutlined />} color="success">{status}</Tag>;
      case 'In Progress':
        return <Tag icon={<ClockCircleOutlined />} color="processing">{status}</Tag>;
      case 'Planned':
        return <Tag icon={<ClockCircleOutlined />} color="default">{status}</Tag>;
      case 'Failed':
        return <Tag icon={<ExclamationCircleOutlined />} color="error">{status}</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };
  
  return (
    <div style={{ padding: '20px' }}>
      <Card>
        <Row gutter={24}>
          <Col span={24}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <Title level={3}>{analysis.title}</Title>
                <Text type="secondary">{analysis.id}</Text>
              </div>
              <div>
                {getStatusTag(analysis.status)}
              </div>
            </div>
            
            <Descriptions bordered column={2} size="small">
              <Descriptions.Item label="Type">{analysis.type}</Descriptions.Item>
              <Descriptions.Item label="Date">{analysis.date}</Descriptions.Item>
              <Descriptions.Item label="Author">{analysis.author}</Descriptions.Item>
              <Descriptions.Item label="Status">{analysis.status}</Descriptions.Item>
            </Descriptions>
            
            <Divider orientation="left">Description</Divider>
            <Text>{analysis.description}</Text>
            
            {analysis.results && (
              <>
                <Divider orientation="left">Results</Divider>
                <Row gutter={[16, 16]}>
                  {analysis.results.maxStress && (
                    <Col xs={12} sm={6}>
                      <Card size="small">
                        <Statistic 
                          title="Max Stress" 
                          value={analysis.results.maxStress} 
                          suffix="MPa"
                          precision={1}
                        />
                      </Card>
                    </Col>
                  )}
                  {analysis.results.maxDeformation && (
                    <Col xs={12} sm={6}>
                      <Card size="small">
                        <Statistic 
                          title="Max Deformation" 
                          value={analysis.results.maxDeformation} 
                          suffix="mm"
                          precision={1}
                        />
                      </Card>
                    </Col>
                  )}
                  {analysis.results.safetyFactor && (
                    <Col xs={12} sm={6}>
                      <Card size="small">
                        <Statistic 
                          title="Safety Factor" 
                          value={analysis.results.safetyFactor}
                          precision={2}
                        />
                      </Card>
                    </Col>
                  )}
                  {analysis.results.confidence && (
                    <Col xs={12} sm={6}>
                      <Card size="small">
                        <Statistic 
                          title="Confidence" 
                          value={analysis.results.confidence * 100}
                          suffix="%"
                          precision={0}
                        />
                      </Card>
                    </Col>
                  )}
                </Row>
              </>
            )}
          </Col>
        </Row>
      </Card>
      
      <div style={{ marginTop: '20px' }}>
        <RelatedItemsPanel
          mission={relatedItems.mission}
          requirements={relatedItems.requirements}
          functions={relatedItems.functions}
          logical={relatedItems.logical}
          cad={relatedItems.cad}
          ebom={relatedItems.ebom}
          models={relatedItems.models}
          automation={relatedItems.automation}
          defaultActiveTab="ebom"
          onItemClick={handleRelatedItemClick}
        />
      </div>
    </div>
  );
};

export default AnalysisDetail;

interface StatisticProps {
  title: string;
  value: number;
  suffix?: string;
  precision?: number;
}

const Statistic: React.FC<StatisticProps> = ({ title, value, suffix, precision = 0 }) => {
  return (
    <div>
      <Text type="secondary" style={{ fontSize: '12px' }}>{title}</Text>
      <div>
        <Text strong style={{ fontSize: '20px' }}>
          {value.toFixed(precision)}{suffix ? ` ${suffix}` : ''}
        </Text>
      </div>
    </div>
  );
}; 