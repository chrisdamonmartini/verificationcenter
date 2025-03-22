import { ReactNode } from 'react';

// Base change interface
export interface BaseChange {
  id: string;
  name?: string;
  title: string;
  description?: string;
  changedBy?: string;
  author: string;
  changedDate?: string;
  date: string;
  status: string;
  severity: string;
  changeType: string;
  category: string;
  domain?: string;
  impactedItems?: ImpactedItem[];
  technicalDetails?: any;
}

export interface ImpactedItem {
  id: string;
  type: string;
  name: string;
}

// Domain-specific change interfaces
export interface RequirementChange extends BaseChange {
  domain: 'requirement';
  requirementType?: string;
  verification?: string[];
}

export interface MissionChange extends BaseChange {
  domain: 'mission';
  missionPhase?: string;
  linkedOperations?: string[];
}

export interface OperationalScenarioChange extends BaseChange {
  domain: 'operationalScenario';
  scenarioType?: string;
  linkedMissions?: string[];
}

export interface FunctionChange extends BaseChange {
  domain: 'function';
  functionType?: string;
  inputs?: string[];
  outputs?: string[];
}

export interface LogicalChange extends BaseChange {
  domain: 'logical';
  blockType?: string;
  interfaces?: string[];
}

export interface PhysicalChange extends BaseChange {
  domain: 'physical';
  componentType?: string;
  manufacturer?: string;
  partNumber?: string;
}

export interface ParameterChange extends BaseChange {
  domain: 'parameter';
  parameterType?: string;
  oldValue?: string;
  newValue?: string;
  unit?: string;
}

export interface CADChange extends BaseChange {
  domain: 'cad';
  partNumber?: string;
  revision?: string;
  assembly?: string;
}

export interface BOMChange extends BaseChange {
  domain: 'bom';
  partNumber?: string;
  revision?: string;
  quantity?: number;
  assembly?: string;
}

// Union type for any change
export type AnyChange = 
  | RequirementChange
  | MissionChange
  | OperationalScenarioChange
  | FunctionChange
  | LogicalChange
  | PhysicalChange
  | ParameterChange
  | CADChange
  | BOMChange;

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
  title?: string;
  prefix?: ReactNode;
  valueStyle?: React.CSSProperties;
} 