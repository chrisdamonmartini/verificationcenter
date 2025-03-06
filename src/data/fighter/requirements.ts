// Fighter aircraft requirements data

// System requirements
export const systemRequirements = [
  {
    id: "SR-FGHT-001",
    title: "Maximum Speed",
    description: "The fighter aircraft shall achieve a maximum speed of at least Mach 1.8.",
    priority: "Critical",
    status: "Verified",
    category: "Performance",
    createdBy: "Jessica Wong",
    createdDate: "2023-03-10",
    updatedBy: "Michael Chen",
    updatedDate: "2023-08-05",
    version: "1.1",
    tags: ["Speed", "Performance", "Critical"],
    verificationMethod: "Test"
  },
  {
    id: "SR-FGHT-002",
    title: "Stealth Capability",
    description: "The fighter aircraft shall have a radar cross-section of less than 0.1 square meters.",
    priority: "Critical",
    status: "In Progress",
    category: "Stealth",
    createdBy: "David Miller",
    createdDate: "2023-02-25",
    updatedBy: null,
    updatedDate: null,
    version: "1.0",
    tags: ["Stealth", "RCS", "Signature"],
    verificationMethod: "Test"
  },
  {
    id: "SR-FGHT-003",
    title: "Cockpit Display Visibility",
    description: "The cockpit displays shall be readable in all ambient light conditions from full darkness to direct sunlight.",
    priority: "High",
    status: "Verified",
    category: "Cockpit",
    createdBy: "Samantha Lee",
    createdDate: "2023-04-15",
    updatedBy: "David Miller",
    updatedDate: "2023-06-20",
    version: "1.2",
    tags: ["Cockpit", "Display", "Human Factors"],
    verificationMethod: "Test"
  },
  {
    id: "SR-FGHT-004",
    title: "Combat Radius",
    description: "The fighter aircraft shall have a combat radius of at least 1,000 kilometers without refueling.",
    priority: "High",
    status: "In Progress",
    category: "Performance",
    createdBy: "Michael Chen",
    createdDate: "2023-02-28",
    updatedBy: "Jessica Wong",
    updatedDate: "2023-05-15",
    version: "1.1",
    tags: ["Range", "Performance", "Fuel"],
    verificationMethod: "Test"
  },
  {
    id: "SR-FGHT-005",
    title: "Weapons Capacity",
    description: "The fighter aircraft shall be capable of carrying a minimum payload of 8,000 kg of ordnance.",
    priority: "Medium",
    status: "Verified",
    category: "Weapons",
    createdBy: "David Miller",
    createdDate: "2023-03-01",
    updatedBy: null,
    updatedDate: null,
    version: "1.0",
    tags: ["Weapons", "Payload", "Capacity"],
    verificationMethod: "Test"
  }
];

// Functional requirements
export const functionalRequirements = [
  {
    id: "FR-FGHT-001",
    title: "Supersonic Flight Control",
    description: "The flight control system shall maintain stability during supersonic flight.",
    systemRequirement: "SR-FGHT-001",
    priority: "Critical",
    status: "Verified",
    category: "Flight Control",
    functionality: "Supersonic Stability",
    inputs: ["Airspeed Data", "Altitude Data", "Attitude Data"],
    outputs: ["Control Surface Commands"],
    constraints: "Must operate effectively between Mach 1.0 and Mach 2.0",
    createdBy: "Michael Chen",
    createdDate: "2023-03-15",
    updatedBy: "Jessica Wong",
    updatedDate: "2023-07-10",
    version: "1.2",
    dependsOn: [],
    verificationCriteria: "Maintain aircraft stability through supersonic transition",
    tags: ["Supersonic", "Flight Control", "Stability"]
  },
  {
    id: "FR-FGHT-002",
    title: "Radar Absorbing Material",
    description: "The aircraft exterior shall incorporate radar absorbing materials to reduce radar cross-section.",
    systemRequirement: "SR-FGHT-002",
    priority: "Critical",
    status: "In Progress",
    category: "Stealth",
    functionality: "Radar Signature Reduction",
    inputs: [],
    outputs: ["Reduced Radar Return"],
    constraints: "Materials must withstand temperatures from -50°C to 250°C",
    createdBy: "David Miller",
    createdDate: "2023-03-05",
    updatedBy: null,
    updatedDate: null,
    version: "1.0",
    dependsOn: [],
    verificationCriteria: "Radar cross-section reduction of 90% compared to non-stealth aircraft",
    tags: ["Stealth", "Materials", "RCS"]
  },
  {
    id: "FR-FGHT-003",
    title: "Cockpit Display Auto-Brightness",
    description: "The cockpit display system shall automatically adjust brightness based on ambient light conditions.",
    systemRequirement: "SR-FGHT-003",
    priority: "High",
    status: "Verified",
    category: "Cockpit",
    functionality: "Display Readability",
    inputs: ["Ambient Light Sensor Data"],
    outputs: ["Display Brightness Commands"],
    constraints: "Must adjust within 500ms of light condition change",
    createdBy: "Samantha Lee",
    createdDate: "2023-04-20",
    updatedBy: "David Miller",
    updatedDate: "2023-06-25",
    version: "1.1",
    dependsOn: [],
    verificationCriteria: "Displays remain readable across full range of lighting conditions",
    tags: ["Cockpit", "Display", "Brightness", "Human Factors"]
  },
  {
    id: "FR-FGHT-004",
    title: "Fuel System Monitoring",
    description: "The fuel system shall provide real-time monitoring of fuel levels and consumption rates.",
    systemRequirement: "SR-FGHT-004",
    priority: "High",
    status: "In Progress",
    category: "Fuel System",
    functionality: "Fuel Monitoring",
    inputs: ["Fuel Level Sensors", "Flow Rate Sensors", "Engine Performance Data"],
    outputs: ["Fuel Status Display", "Range Calculations"],
    constraints: "Accuracy must be within 2% of actual values",
    createdBy: "Michael Chen",
    createdDate: "2023-03-10",
    updatedBy: "Jessica Wong",
    updatedDate: "2023-05-20",
    version: "1.1",
    dependsOn: [],
    verificationCriteria: "Accurate fuel monitoring across all flight conditions",
    tags: ["Fuel", "Monitoring", "Range"]
  }
];

// Test cases
export const testCases = [
  {
    id: "TC-FGHT-001",
    title: "Maximum Speed Test",
    description: "Verify the aircraft can achieve the specified maximum speed.",
    requirements: ["SR-FGHT-001", "FR-FGHT-001"],
    status: "Passed",
    priority: "Critical",
    createdBy: "Test Squadron Alpha",
    createdDate: "2023-05-10",
    executionDate: "2023-06-15",
    testSteps: [
      "Perform standard takeoff and climb to test altitude of 40,000 ft",
      "Accelerate to maximum power in level flight",
      "Record maximum speed achieved",
      "Return to base using standard approach"
    ],
    expectedResults: "Aircraft achieves minimum Mach 1.8 in level flight",
    actualResults: "Aircraft achieved Mach 1.87 in level flight at 40,000 ft",
    testEnvironment: "Flight Test Range, Conditions: Clear Weather, Light Winds"
  },
  {
    id: "TC-FGHT-002",
    title: "Cockpit Display Readability Test",
    description: "Verify cockpit displays are readable in bright sunlight.",
    requirements: ["SR-FGHT-003", "FR-FGHT-003"],
    status: "Passed",
    priority: "High",
    createdBy: "Test Squadron Beta",
    createdDate: "2023-05-15",
    executionDate: "2023-06-20",
    testSteps: [
      "Position aircraft facing into direct sunlight",
      "Test pilots evaluate readability of all primary displays",
      "Record light levels and readability scores"
    ],
    expectedResults: "All displays readable with minimum score of 8/10",
    actualResults: "All displays scored 9/10 or higher for readability",
    testEnvironment: "Ground Test, Conditions: Clear Day, Direct Sunlight"
  },
  {
    id: "TC-FGHT-003",
    title: "Stealth Performance Test",
    description: "Verify the aircraft's radar cross-section meets requirements.",
    requirements: ["SR-FGHT-002", "FR-FGHT-002"],
    status: "In Progress",
    priority: "Critical",
    createdBy: "Test Squadron Gamma",
    createdDate: "2023-06-01",
    executionDate: null,
    testSteps: [
      "Position aircraft in anechoic chamber",
      "Measure radar cross-section from multiple angles",
      "Compare measurements to requirements"
    ],
    expectedResults: "Radar cross-section less than 0.1 square meters from all tested angles",
    actualResults: "Pending completion",
    testEnvironment: "Stealth Testing Facility, Anechoic Chamber"
  },
  {
    id: "TC-FGHT-004",
    title: "Combat Radius Verification",
    description: "Verify the aircraft can achieve the specified combat radius.",
    requirements: ["SR-FGHT-004", "FR-FGHT-004"],
    status: "In Progress",
    priority: "High",
    createdBy: "Test Squadron Alpha",
    createdDate: "2023-06-05",
    executionDate: null,
    testSteps: [
      "Load aircraft with standard combat configuration",
      "Execute long-range mission profile",
      "Monitor fuel consumption throughout flight",
      "Calculate effective combat radius"
    ],
    expectedResults: "Aircraft achieves minimum 1,000 km combat radius",
    actualResults: "Pending completion",
    testEnvironment: "Flight Test Range, Long-Range Mission Profile"
  }
];

// Combined requirements data
export default {
  systemRequirements,
  functionalRequirements,
  testCases
}; 