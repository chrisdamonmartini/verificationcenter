// Teamcenter data models and mock data

// Interface for generic Teamcenter item
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

// Interface for Teamcenter requirement
export interface TCRequirement extends TCItem {
  status: string;
  priority: string;
  verificationMethod: string;
  category: string;
  source: string;
  tags: string[];
  attributes: Record<string, string>;
}

// Interface for Teamcenter test case
export interface TCTestCase extends TCItem {
  associatedRequirements: string[];
  expectedResults: string;
  actualResults: string;
  status: string;
  steps: string[];
  priority: string;
  executionDate: string | null;
}

// Interface for Teamcenter document
export interface TCDocument extends TCItem {
  format: string;
  version: string;
  status: string;
  fileSize: number;
  url: string;
  associatedItems: string[];
}

// Interface for Teamcenter verification matrix
export interface TCVerificationMatrix extends TCItem {
  requirements: string[];
  testCases: string[];
  status: string;
  coverage: number;
  lastRun: string | null;
}

// Mock data for Teamcenter requirements for missile product
export const missileTCRequirements: TCRequirement[] = [
  {
    id: "TC_REQ_MISS_001",
    name: "Missile Range Requirement",
    revision: "A",
    type: "Performance Requirement",
    owner: "John Smith",
    creationDate: "2023-01-10",
    modifiedDate: "2023-06-15",
    description: "The missile system shall have a minimum range of 250 kilometers.",
    status: "Released",
    priority: "Critical",
    verificationMethod: "Test",
    category: "Performance",
    source: "Customer Specification",
    tags: ["Range", "Performance", "Critical"],
    attributes: {
      "Required Range": "250 km",
      "Compliance": "Mandatory",
      "Verification Level": "System"
    }
  },
  {
    id: "TC_REQ_MISS_002",
    name: "Missile Guidance Accuracy",
    revision: "B",
    type: "Technical Requirement",
    owner: "Maria Johnson",
    creationDate: "2023-01-15",
    modifiedDate: "2023-05-20",
    description: "The missile guidance system shall achieve a CEP (Circular Error Probable) of less than 2.5 meters.",
    status: "In Review",
    priority: "Critical",
    verificationMethod: "Test",
    category: "Guidance",
    source: "Engineering Specification",
    tags: ["Guidance", "Accuracy", "CEP"],
    attributes: {
      "Required CEP": "<2.5 m",
      "Compliance": "Mandatory",
      "Verification Level": "Subsystem"
    }
  },
  {
    id: "TC_REQ_MISS_003",
    name: "Environmental Operating Temperature",
    revision: "A",
    type: "Environmental Requirement",
    owner: "Robert Chen",
    creationDate: "2023-01-25",
    modifiedDate: "2023-04-10",
    description: "The missile system shall operate within temperature range of -40°C to +50°C.",
    status: "Released",
    priority: "High",
    verificationMethod: "Test",
    category: "Environmental",
    source: "Military Standard",
    tags: ["Environmental", "Temperature", "Operational"],
    attributes: {
      "Min Temperature": "-40°C",
      "Max Temperature": "+50°C",
      "Compliance": "Mandatory",
      "Verification Level": "System"
    }
  }
];

// Mock data for Teamcenter requirements for fighter product
export const fighterTCRequirements: TCRequirement[] = [
  {
    id: "TC_REQ_FGHT_001",
    name: "Fighter Maximum Speed",
    revision: "A",
    type: "Performance Requirement",
    owner: "Jessica Wong",
    creationDate: "2023-02-05",
    modifiedDate: "2023-07-10",
    description: "The fighter aircraft shall achieve a maximum speed of at least Mach 1.8.",
    status: "Released",
    priority: "Critical",
    verificationMethod: "Test",
    category: "Performance",
    source: "Customer Specification",
    tags: ["Speed", "Performance", "Critical"],
    attributes: {
      "Required Speed": "Mach 1.8",
      "Compliance": "Mandatory",
      "Verification Level": "Aircraft"
    }
  },
  {
    id: "TC_REQ_FGHT_002",
    name: "Fighter Stealth Capability",
    revision: "A",
    type: "Technical Requirement",
    owner: "David Miller",
    creationDate: "2023-02-10",
    modifiedDate: "2023-06-20",
    description: "The fighter aircraft shall have a radar cross-section of less than 0.1 square meters.",
    status: "In Review",
    priority: "Critical",
    verificationMethod: "Test",
    category: "Stealth",
    source: "Engineering Specification",
    tags: ["Stealth", "RCS", "Signature"],
    attributes: {
      "Required RCS": "<0.1 m²",
      "Compliance": "Mandatory",
      "Verification Level": "Aircraft"
    }
  },
  {
    id: "TC_REQ_FGHT_003",
    name: "Cockpit Display Visibility",
    revision: "B",
    type: "Human Factors Requirement",
    owner: "Samantha Lee",
    creationDate: "2023-02-20",
    modifiedDate: "2023-05-15",
    description: "The cockpit displays shall be readable in all ambient light conditions from full darkness to direct sunlight.",
    status: "Released",
    priority: "High",
    verificationMethod: "Test",
    category: "Cockpit",
    source: "Human Factors Standard",
    tags: ["Cockpit", "Display", "Human Factors"],
    attributes: {
      "Light Conditions": "Full range",
      "Compliance": "Mandatory",
      "Verification Level": "Subsystem"
    }
  }
];

// Mock testcases
export const missileTCTestCases: TCTestCase[] = [
  {
    id: "TC_TEST_MISS_001",
    name: "Missile Range Verification Test",
    revision: "A",
    type: "System Test",
    owner: "Test Team Alpha",
    creationDate: "2023-03-05",
    modifiedDate: "2023-04-20",
    description: "Verify the missile can reach targets at maximum specified range.",
    associatedRequirements: ["TC_REQ_MISS_001"],
    expectedResults: "Missile reaches and neutralizes target at 250km distance",
    actualResults: "Target at 255km successfully neutralized",
    status: "Passed",
    steps: [
      "Launch missile at maximum range target",
      "Track missile trajectory",
      "Verify target acquisition and hit"
    ],
    priority: "Critical",
    executionDate: "2023-04-15"
  },
  {
    id: "TC_TEST_MISS_002",
    name: "Environmental Temperature Test",
    revision: "A",
    type: "Environmental Test",
    owner: "Test Team Beta",
    creationDate: "2023-03-10",
    modifiedDate: "2023-04-25",
    description: "Verify missile operation at minimum temperature.",
    associatedRequirements: ["TC_REQ_MISS_003"],
    expectedResults: "All systems function normally at -40°C",
    actualResults: "All systems functional, guidance response 2% slower than nominal",
    status: "Passed",
    steps: [
      "Condition missile in temperature chamber at -40°C",
      "Verify all systems operational",
      "Perform simulated launch and flight"
    ],
    priority: "High",
    executionDate: "2023-04-20"
  }
];

export const fighterTCTestCases: TCTestCase[] = [
  {
    id: "TC_TEST_FGHT_001",
    name: "Maximum Speed Test",
    revision: "A",
    type: "Flight Test",
    owner: "Test Squadron Alpha",
    creationDate: "2023-04-10",
    modifiedDate: "2023-06-20",
    description: "Verify the aircraft can achieve the specified maximum speed.",
    associatedRequirements: ["TC_REQ_FGHT_001"],
    expectedResults: "Aircraft achieves minimum Mach 1.8 in level flight",
    actualResults: "Aircraft achieved Mach 1.87 in level flight at 40,000 ft",
    status: "Passed",
    steps: [
      "Perform standard takeoff and climb to test altitude of 40,000 ft",
      "Accelerate to maximum power in level flight",
      "Record maximum speed achieved",
      "Return to base using standard approach"
    ],
    priority: "Critical",
    executionDate: "2023-06-15"
  },
  {
    id: "TC_TEST_FGHT_002",
    name: "Cockpit Display Readability Test",
    revision: "A",
    type: "Human Factors Test",
    owner: "Test Squadron Beta",
    creationDate: "2023-04-15",
    modifiedDate: "2023-06-25",
    description: "Verify cockpit displays are readable in bright sunlight.",
    associatedRequirements: ["TC_REQ_FGHT_003"],
    expectedResults: "All displays readable with minimum score of 8/10",
    actualResults: "All displays scored 9/10 or higher for readability",
    status: "Passed",
    steps: [
      "Position aircraft facing into direct sunlight",
      "Test pilots evaluate readability of all primary displays",
      "Record light levels and readability scores"
    ],
    priority: "High",
    executionDate: "2023-06-20"
  }
];

// Mock documents
export const tcDocuments: TCDocument[] = [
  {
    id: "TC_DOC_001",
    name: "Missile System Requirements Specification",
    revision: "C",
    type: "Requirements Document",
    owner: "John Smith",
    creationDate: "2023-01-05",
    modifiedDate: "2023-06-10",
    description: "Complete specification of missile system requirements",
    format: "PDF",
    version: "1.3",
    status: "Approved",
    fileSize: 4562104,
    url: "https://teamcenter.example.com/documents/TC_DOC_001",
    associatedItems: ["TC_REQ_MISS_001", "TC_REQ_MISS_002", "TC_REQ_MISS_003"]
  },
  {
    id: "TC_DOC_002",
    name: "Fighter Aircraft System Requirements Specification",
    revision: "B",
    type: "Requirements Document",
    owner: "Jessica Wong",
    creationDate: "2023-02-01",
    modifiedDate: "2023-07-05",
    description: "Complete specification of fighter aircraft system requirements",
    format: "PDF",
    version: "1.2",
    status: "Approved",
    fileSize: 5243678,
    url: "https://teamcenter.example.com/documents/TC_DOC_002",
    associatedItems: ["TC_REQ_FGHT_001", "TC_REQ_FGHT_002", "TC_REQ_FGHT_003"]
  },
  {
    id: "TC_DOC_003",
    name: "Missile Test Procedures",
    revision: "A",
    type: "Test Document",
    owner: "Test Team Alpha",
    creationDate: "2023-03-01",
    modifiedDate: "2023-04-10",
    description: "Detailed test procedures for missile verification",
    format: "DOCX",
    version: "1.0",
    status: "Approved",
    fileSize: 2341509,
    url: "https://teamcenter.example.com/documents/TC_DOC_003",
    associatedItems: ["TC_TEST_MISS_001", "TC_TEST_MISS_002"]
  }
];

// Mock verification matrices
export const tcVerificationMatrices: TCVerificationMatrix[] = [
  {
    id: "TC_VM_001",
    name: "Missile System Verification Matrix",
    revision: "B",
    type: "Verification Matrix",
    owner: "Maria Johnson",
    creationDate: "2023-03-15",
    modifiedDate: "2023-05-01",
    description: "Verification matrix linking missile requirements to test cases",
    requirements: ["TC_REQ_MISS_001", "TC_REQ_MISS_002", "TC_REQ_MISS_003"],
    testCases: ["TC_TEST_MISS_001", "TC_TEST_MISS_002"],
    status: "In Progress",
    coverage: 67,
    lastRun: "2023-04-25"
  },
  {
    id: "TC_VM_002",
    name: "Fighter Aircraft Verification Matrix",
    revision: "A",
    type: "Verification Matrix",
    owner: "David Miller",
    creationDate: "2023-04-20",
    modifiedDate: "2023-06-30",
    description: "Verification matrix linking fighter requirements to test cases",
    requirements: ["TC_REQ_FGHT_001", "TC_REQ_FGHT_002", "TC_REQ_FGHT_003"],
    testCases: ["TC_TEST_FGHT_001", "TC_TEST_FGHT_002"],
    status: "In Progress",
    coverage: 67,
    lastRun: "2023-06-25"
  }
];

// Function to get Teamcenter requirements based on product type
export const getTeamcenterRequirements = (productType: 'missile' | 'fighter') => {
  return productType === 'missile' ? missileTCRequirements : fighterTCRequirements;
};

// Function to get Teamcenter test cases based on product type
export const getTeamcenterTestCases = (productType: 'missile' | 'fighter') => {
  return productType === 'missile' ? missileTCTestCases : fighterTCTestCases;
};

// Mock function to simulate syncing with Teamcenter
export const syncWithTeamcenter = async () => {
  // Simulate API call delay
  return new Promise<{
    status: string; 
    requirements: TCRequirement[];
    testCases: TCTestCase[];
    documents: TCDocument[];
    matrices: TCVerificationMatrix[];
  }>((resolve) => {
    setTimeout(() => {
      resolve({
        status: 'success',
        requirements: [...missileTCRequirements, ...fighterTCRequirements],
        testCases: [...missileTCTestCases, ...fighterTCTestCases],
        documents: tcDocuments,
        matrices: tcVerificationMatrices
      });
    }, 1500);
  });
};

// Alias for backward compatibility
export const syncTeamcenterData = syncWithTeamcenter;