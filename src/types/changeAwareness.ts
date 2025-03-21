import { ReactNode } from 'react';
import { ProductType } from '../context/ProductContext';

// Base change interface that all domain-specific changes extend
export interface BaseChange {
  id: string;
  name: string;
  description: string;
  changedBy: string;
  changedDate: string;
  status: 'Draft' | 'In Review' | 'Approved' | 'Rejected' | 'Implemented';
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  changeType: 'New' | 'Modified' | 'Deprecated' | 'Removed';
  affectedSystem?: string;
  domain?: string;
  impactedItems?: Record<string, number>;
}

// Union type for any change
export type AnyChange = 
  | RequirementChange
  | MissionChange
  | FunctionChange
  | LogicalChange
  | PhysicalChange
  | ParameterChange
  | CADChange
  | BOMChange
  | OperationalScenarioChange;

// Domain-specific change interfaces
export interface RequirementChange extends BaseChange {
  domain: 'requirement';
  requirementType: string;
  verification: string[];
}

export interface MissionChange extends BaseChange {
  domain: 'mission';
  missionPhase: string;
  linkedOperations: string[];
}

export interface FunctionChange extends BaseChange {
  domain: 'function';
  functionType: string;
  inputs: string[];
  outputs: string[];
}

export interface LogicalChange extends BaseChange {
  domain: 'logical';
  blockType: string;
  interfaces: string[];
}

export interface PhysicalChange extends BaseChange {
  domain: 'physical';
  componentType: string;
  manufacturer: string;
  partNumber: string;
}

export interface ParameterChange extends BaseChange {
  domain: 'parameter';
  parameterType: string;
  oldValue: string;
  newValue: string;
  unit: string;
}

export interface CADChange extends BaseChange {
  domain: 'cad';
  partNumber: string;
  revision: string;
  assembly: string;
}

export interface BOMChange extends BaseChange {
  domain: 'bom';
  partNumber: string;
  revision: string;
  quantity: number;
  assembly: string;
}

export interface OperationalScenarioChange extends BaseChange {
  domain: 'operationalScenario';
  scenarioType: string;
  linkedMissions: string[];
  conditions: string[];
}

// Standard expanded change interface
export interface StandardExpandedChange extends BaseChange {
  expanded?: boolean;
  children?: StandardExpandedChange[];
}

// Props for change components
export interface ChangesComponentProps {
  weeks: number;
  setWeeks: (weeks: number) => void;
  productType: ProductType;
}

// Utility component props
export interface CodeProps {
  children: ReactNode;
  size?: 'small' | 'default' | 'large';
}

export interface StatisticProps {
  value: number | string;
  label: string;
  icon?: ReactNode;
  trend?: 'up' | 'down' | 'none';
  trendValue?: number;
} 