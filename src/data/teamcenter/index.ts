// Teamcenter data models and mock data

// Teamcenter Item types
export interface TCItem {
  id: string;
  name: string;
  revision: string;
  type: string;
  owner: string;
  creationDate: string;
  modifiedDate: string;
  description: string;
}

// Teamcenter Requirements Item
export interface TCRequirement extends TCItem {
  status: string;
  priority: string;
  verificationMethod: string;
  category: string;
  source: string;
  tags: string[];
  attributes: Record<string, string | number | boolean>;
}

// Teamcenter Test Case
export interface TCTestCase extends TCItem {
  testType: string;
  testLevel: string;
  status: string;
  requirements: string[];
  executionDate?: string;
  testProcedure: string;
  results?: string;
  testedBy?: string;
}

// Teamcenter Document
export interface TCDocument extends TCItem {
  documentType: string;
  status: string;
  version: string;
  format: string;
  reviewers: string[];
  approvers: string[];
  approvalDate?: string;
  location: string;
}

// Teamcenter Verification Matrix Item
export interface TCVerificationMatrix {
  id: string;
  name: string;
  requirements: string[];
  testCases: string[];
  verificationMethods: Record<string, string[]>;
  creationDate: string;
  modifiedDate: string;
  owner: string;
  status: string;
}

// Mock Teamcenter data for missile product
export const missileTCRequirements: TCRequirement[] = [
  {
    id: "TC-REQ-MISS-001",
    name: "Missile Range Capability",
    revision: "A",
    type: "Performance Requirement",
    owner: "John Smith",
    creationDate: "2023-01-15",
    modifiedDate: "2023-06-28",
    description: "The missile system shall have a minimum range of 250 kilometers.",
    status: "Released",
    priority: "Critical",
    verificationMethod: "Test",
    category: "Performance",
    source: "Customer Specification",
    tags: ["Range", "Performance", "Critical"],
    attributes: {
      "minimumRange": 250,
      "rangeUnit": "kilometers",
      "verification_status": "Verified"
    }
  },
  {
    id: "TC-REQ-MISS-002",
    name: "Guidance System Accuracy",
    revision: "B",
    type: "Performance Requirement",
    owner: "Maria Johnson",
    creationDate: "2023-01-20",
    modifiedDate: "2023-07-15",
    description: "The missile guidance system shall achieve a CEP (Circular Error Probable) of less than 2.5 meters.",
    status: "Released",
    priority: "Critical",
    verificationMethod: "Test",
    category: "Guidance",
    source: "System Specification",
    tags: ["Guidance", "Accuracy", "CEP"],
    attributes: {
      "cep": 2.5,
      "cepUnit": "meters",
      "verification_status": "In Progress"
    }
  },
  {
    id: "TC-REQ-MISS-003",
    name: "Environmental Operating Temperature",
    revision: "A",
    type: "Environmental Requirement",
    owner: "Robert Chen",
    creationDate: "2023-02-05",
    modifiedDate: "2023-05-12",
    description: "The missile system shall operate within temperature range of -40°C to +50°C.",
    status: "Released",
    priority: "High",
    verificationMethod: "Test",
    category: "Environmental",
    source: "MIL-STD-810",
    tags: ["Environmental", "Temperature", "Operating Conditions"],
    attributes: {
      "minTemp": -40,
      "maxTemp": 50,
      "tempUnit": "Celsius",
      "verification_status": "Verified"
    }
  }
];

// Mock Teamcenter data for fighter product
export const fighterTCRequirements: TCRequirement[] = [
  {
    id: "TC-REQ-FGHT-001",
    name: "Maximum Speed Capability",
    revision: "C",
    type: "Performance Requirement",
    owner: "Jessica Wong",
    creationDate: "2023-03-10",
    modifiedDate: "2023-08-05",
    description: "The fighter aircraft shall achieve a maximum speed of at least Mach 1.8.",
    status: "Released",
    priority: "Critical",
    verificationMethod: "Test",
    category: "Performance",
    source: "Air Force Specification",
    tags: ["Speed", "Performance", "Critical"],
    attributes: {
      "maxSpeed": 1.8,
      "speedUnit": "Mach",
      "verification_status": "Verified"
    }
  },
  {
    id: "TC-REQ-FGHT-002",
    name: "Stealth Capability",
    revision: "B",
    type: "Performance Requirement",
    owner: "David Miller",
    creationDate: "2023-02-25",
    modifiedDate: "2023-07-18",
    description: "The fighter aircraft shall have a radar cross-section of less than 0.1 square meters.",
    status: "Released",
    priority: "Critical",
    verificationMethod: "Test",
    category: "Stealth",
    source: "System Specification",
    tags: ["Stealth", "RCS", "Signature"],
    attributes: {
      "maxRcs": 0.1,
      "rcsUnit": "square meters",
      "verification_status": "In Progress"
    }
  },
  {
    id: "TC-REQ-FGHT-003",
    name: "Cockpit Display Visibility",
    revision: "A",
    type: "Human Factors Requirement",
    owner: "Samantha Lee",
    creationDate: "2023-04-15",
    modifiedDate: "2023-06-20",
    description: "The cockpit displays shall be readable in all ambient light conditions from full darkness to direct sunlight.",
    status: "Released",
    priority: "High",
    verificationMethod: "Test",
    category: "Cockpit",
    source: "MIL-STD-1472",
    tags: ["Cockpit", "Display", "Human Factors"],
    attributes: {
      "minLighting": 0,
      "maxLighting": 100000,
      "lightUnit": "lux",
      "verification_status": "Verified"
    }
  }
];

// Function to get Teamcenter requirements based on product type
export const getTeamcenterRequirements = (productType: 'missile' | 'fighter') => {
  return productType === 'missile' ? missileTCRequirements : fighterTCRequirements;
};

// Function to simulate data synchronization with Teamcenter
export const syncTeamcenterData = async (productType: 'missile' | 'fighter'): Promise<{
  success: boolean;
  data?: TCRequirement[];
  message?: string;
}> => {
  // Mock API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  try {
    const requirements = getTeamcenterRequirements(productType);
    return {
      success: true,
      data: requirements,
      message: `Successfully synchronized ${requirements.length} requirements from Teamcenter.`
    };
  } catch (error) {
    return {
      success: false,
      message: `Error synchronizing data from Teamcenter: ${error instanceof Error ? error.message : String(error)}`
    };
  }
}; 