import React from 'react';
import { Tag, Progress, Space, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { StandardTable } from '../../common/StandardTable';
import RelatedItemsPanel, { RelatedItem, MissionItem, RequirementItem, FunctionItem, LogicalItem, CADItem, EBOMItem, ModelItem, AutomationItem } from '../../common/RelatedItemsPanel';

// Interface for analysis items
interface AnalysisItem {
  id: string;
  name: string;
  status: 'Completed' | 'In Progress' | 'Pending';
  progress: number;
  type: 'Design' | 'Verification' | 'Simulation';
  dueDate: string;
  assignedTo: string;
  lastRun?: string;
}

// Sample data matching the screenshot
const sampleAnalyses: AnalysisItem[] = [
  {
    id: 'AN-001',
    name: 'Structural Analysis - Wing Components',
    status: 'Completed',
    progress: 100,
    type: 'Design',
    dueDate: '2023-04-30',
    assignedTo: 'John Smith',
    lastRun: '2023-05-10'
  },
  {
    id: 'AN-002',
    name: 'Thermal Analysis - Engine Bay',
    status: 'In Progress',
    progress: 65,
    type: 'Verification',
    dueDate: '2023-05-20',
    assignedTo: 'Emily Johnson',
    lastRun: '2023-05-08'
  },
  {
    id: 'AN-003',
    name: 'Aerodynamic Analysis - Full Aircraft',
    status: 'In Progress',
    progress: 45,
    type: 'Simulation',
    dueDate: '2023-06-15',
    assignedTo: 'Michael Chen',
    lastRun: '2023-05-05'
  },
  {
    id: 'AN-004',
    name: 'Control Systems Analysis',
    status: 'Pending',
    progress: 0,
    type: 'Verification',
    dueDate: '2023-05-30',
    assignedTo: 'Sarah Williams',
    lastRun: undefined
  },
  {
    id: 'AN-005',
    name: 'Environmental Impact Analysis',
    status: 'Completed',
    progress: 100,
    type: 'Simulation',
    dueDate: '2023-05-10',
    assignedTo: 'David Kim',
    lastRun: '2023-04-28'
  }
];

// Mock related items data for each analysis
const mockRelatedItems: Record<string, {
  mission: MissionItem[];
  requirements: RequirementItem[];
  functions: FunctionItem[];
  logical: LogicalItem[];
  cad: CADItem[];
  ebom: EBOMItem[];
  models: ModelItem[];
  automation: AutomationItem[];
}> = {
  'AN-001': {
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
      }
    ],
    ebom: [],
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
      }
    ],
    automation: []
  },
  'AN-002': {
    mission: [],
    requirements: [
      {
        id: 'SR-203',
        title: 'Thermal Management',
        status: 'Released',
        date: '2024-11-15',
        author: 'Systems Engineering',
        type: 'Performance',
        verification: 'Analysis'
      }
    ],
    functions: [],
    logical: [],
    cad: [
      {
        id: 'CAD-503',
        title: 'Engine Bay Assembly',
        status: 'Released',
        date: '2024-12-03',
        author: 'CAD Department',
        partNumber: 'ENG-B15-01',
        revision: 'A',
        maturity: 'Released'
      }
    ],
    ebom: [],
    models: [
      {
        id: 'MDL-703',
        title: 'Thermal Analysis Model',
        status: 'Current',
        date: '2025-01-10',
        author: 'Thermal Team',
        type: 'Analysis',
        format: 'CFD',
        version: '1.5'
      }
    ],
    automation: []
  },
  'AN-003': {
    mission: [],
    requirements: [
      {
        id: 'SR-204',
        title: 'Aerodynamic Performance',
        status: 'Released',
        date: '2024-11-12',
        author: 'Aero Team',
        type: 'Performance',
        verification: 'Analysis'
      }
    ],
    functions: [],
    logical: [],
    cad: [],
    ebom: [],
    models: [
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
        id: 'AUTO-802',
        title: 'Aerodynamic Performance Analysis',
        status: 'Active',
        date: '2025-01-12',
        author: 'Aero Team',
        type: 'Workflow',
        language: 'Python',
        lastRun: '2025-01-15'
      }
    ]
  },
  'AN-004': {
    mission: [],
    requirements: [],
    functions: [],
    logical: [],
    cad: [],
    ebom: [],
    models: [],
    automation: []
  },
  'AN-005': {
    mission: [],
    requirements: [],
    functions: [],
    logical: [],
    cad: [],
    ebom: [],
    models: [
      {
        id: 'MDL-705',
        title: 'Environmental Impact Model',
        status: 'Current',
        date: '2025-01-08',
        author: 'Environmental Team',
        type: 'Simulation',
        format: 'Custom',
        version: '1.0'
      }
    ],
    automation: []
  }
};

const AnalysesTab: React.FC = () => {
  // Status tag renderer
  const getStatusTag = (status: string) => {
    switch (status) {
      case 'Completed':
        return (
          <Tag color="success" style={{ margin: 0, padding: '0 6px', height: '18px', lineHeight: '18px' }}>
            Completed
          </Tag>
        );
      case 'In Progress':
        return (
          <Tag color="processing" style={{ margin: 0, padding: '0 6px', height: '18px', lineHeight: '18px' }}>
            In Progress
          </Tag>
        );
      case 'Pending':
        return (
          <Tag color="warning" style={{ margin: 0, padding: '0 6px', height: '18px', lineHeight: '18px' }}>
            Pending
          </Tag>
        );
      default:
        return status;
    }
  };
  
  // Type tag renderer
  const getTypeTag = (type: string) => {
    switch (type) {
      case 'Design':
        return (
          <Tag color="blue" style={{ margin: 0, padding: '0 6px', height: '18px', lineHeight: '18px' }}>
            Design
          </Tag>
        );
      case 'Verification':
        return (
          <Tag color="purple" style={{ margin: 0, padding: '0 6px', height: '18px', lineHeight: '18px' }}>
            Verification
          </Tag>
        );
      case 'Simulation':
        return (
          <Tag color="cyan" style={{ margin: 0, padding: '0 6px', height: '18px', lineHeight: '18px' }}>
            Simulation
          </Tag>
        );
      default:
        return type;
    }
  };
  
  // Handle related item click
  const handleRelatedItemClick = (item: RelatedItem, type: string) => {
    console.log(`Clicked on ${type} item:`, item);
    // In a real app, you might navigate to the item's detail page
  };
  
  // Expanded row render function for showing related items
  const expandedRowRender = (record: AnalysisItem) => {
    const relatedItems = mockRelatedItems[record.id] || {
      mission: [],
      requirements: [],
      functions: [],
      logical: [],
      cad: [],
      ebom: [],
      models: [],
      automation: []
    };
    
    // Create the current item in the format expected by RelatedItemsPanel
    const currentItem = {
      id: record.id,
      title: record.name,
      status: (record.status === 'Completed' ? 'Completed' : 
              record.status === 'In Progress' ? 'Active' :
              'Current') as 'Completed' | 'Current' | 'Active' | 'Modified' | 'Released' | 'In Development' | 'Deprecated' | 'Archived' | 'Updated',
      date: record.dueDate,
      author: record.assignedTo
    };
    
    // Determine which category should be considered the current item type
    const currentItemType = 'models'; // Analysis items are typically associated with models
    
    // Handle creating a relationship
    const handleCreateRelationship = (categoryKey: string) => {
      console.log(`Creating relationship with ${categoryKey} for analysis ${record.id}`);
      // In a real implementation, this would open a modal or navigate to create a relationship
    };
    
    return (
      <div style={{ padding: '0 20px 20px 20px' }}>
        <RelatedItemsPanel
          mission={relatedItems.mission}
          requirements={relatedItems.requirements}
          functions={relatedItems.functions}
          logical={relatedItems.logical}
          cad={relatedItems.cad}
          ebom={relatedItems.ebom}
          models={relatedItems.models}
          automation={relatedItems.automation}
          onItemClick={handleRelatedItemClick}
          currentItem={currentItem}
          currentItemType={currentItemType}
          onCreateRelationship={handleCreateRelationship}
        />
      </div>
    );
  };
  
  // Table columns definition
  const columns: ColumnsType<AnalysisItem> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
      width: 250,
      ellipsis: true,
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => getStatusTag(status),
      filters: [
        { text: 'Completed', value: 'Completed' },
        { text: 'In Progress', value: 'In Progress' },
        { text: 'Pending', value: 'Pending' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'PROGRESS',
      dataIndex: 'progress',
      key: 'progress',
      width: 130,
      render: (progress, record) => {
        const progressStatus = 
          record.status === 'Completed' ? 'success' : 
          record.status === 'In Progress' ? 'active' : 'normal';
        
        return <Progress percent={progress} status={progressStatus} size="small" style={{ margin: 0 }} />;
      },
    },
    {
      title: 'TYPE',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      render: (type) => getTypeTag(type),
      filters: [
        { text: 'Design', value: 'Design' },
        { text: 'Verification', value: 'Verification' },
        { text: 'Simulation', value: 'Simulation' },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: 'DUE DATE',
      dataIndex: 'dueDate',
      key: 'dueDate',
      width: 110,
      sorter: (a, b) => a.dueDate.localeCompare(b.dueDate),
    },
    {
      title: 'ASSIGNED TO',
      dataIndex: 'assignedTo',
      key: 'assignedTo',
      width: 150,
    },
    {
      title: 'LAST RUN',
      dataIndex: 'lastRun',
      key: 'lastRun',
      width: 110,
      render: (lastRun) => lastRun || 'N/A',
    },
  ];
  
  // Stats for the header
  const totalAnalyses = sampleAnalyses.length;
  const completedAnalyses = sampleAnalyses.filter(item => item.status === 'Completed').length;
  const inProgressAnalyses = sampleAnalyses.filter(item => item.status === 'In Progress').length;
  const pendingAnalyses = sampleAnalyses.filter(item => item.status === 'Pending').length;
  
  // Formatted stats for the StandardTable
  const tableStats = [
    { label: 'Total', value: totalAnalyses },
    { label: 'Completed', value: completedAnalyses, color: '#52c41a' },
    { label: 'In Progress', value: inProgressAnalyses, color: '#1890ff' },
    { label: 'Pending', value: pendingAnalyses, color: '#faad14' }
  ];
  
  return (
    <StandardTable
      title="Analyses"
      data={sampleAnalyses}
      columns={columns}
      loading={false}
      expandedRowRender={expandedRowRender}
      stats={tableStats}
      searchableFields={['id', 'name', 'assignedTo']}
      refreshData={() => console.log('Refreshing data...')}
    />
  );
};

export default AnalysesTab; 