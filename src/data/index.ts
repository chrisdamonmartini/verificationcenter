import { ProductType } from '../context/ProductContext';
import { missileTCRequirements, fighterTCRequirements } from './teamcenter';

// Requirements data for each product type
const missileRequirements = {
  systemRequirements: [
    {
      id: "SR-MISS-001",
      title: "Range Capability",
      description: "The missile system shall have a minimum range of 250 kilometers.",
      priority: "Critical",
      status: "Verified",
      category: "Performance",
      createdBy: "John Smith",
      createdDate: "2023-01-15",
      updatedBy: "Maria Johnson",
      updatedDate: "2023-06-28",
      version: "1.2",
      tags: ["Range", "Performance", "Critical"],
      verificationMethod: "Test"
    },
    {
      id: "SR-MISS-002",
      title: "Guidance Accuracy",
      description: "The missile guidance system shall achieve a CEP (Circular Error Probable) of less than 2.5 meters.",
      priority: "Critical",
      status: "In Progress",
      category: "Guidance",
      createdBy: "Maria Johnson",
      createdDate: "2023-01-20",
      updatedBy: null,
      updatedDate: null,
      version: "1.0",
      tags: ["Guidance", "Accuracy"],
      verificationMethod: "Test"
    },
    {
      id: "SR-MISS-003",
      title: "Environmental Operating Temperature",
      description: "The missile system shall operate within temperature range of -40°C to +50°C.",
      priority: "High",
      status: "Verified",
      category: "Environmental",
      createdBy: "Robert Chen",
      createdDate: "2023-02-05",
      updatedBy: "John Smith",
      updatedDate: "2023-05-12",
      version: "1.1",
      tags: ["Environmental", "Temperature"],
      verificationMethod: "Test"
    }
  ],
  functionalRequirements: [
    {
      id: "FR-MISS-001",
      title: "Target Acquisition",
      description: "The missile shall be able to acquire targets at a distance of at least 200 kilometers.",
      systemRequirement: "SR-MISS-001",
      priority: "Critical",
      status: "Verified",
      category: "Targeting",
      functionality: "Target Detection",
      inputs: ["Radar Signal", "Infrared Signal"],
      outputs: ["Target Location Data"],
      constraints: "Must operate in all weather conditions",
      createdBy: "David Park",
      createdDate: "2023-01-25",
      updatedBy: "Sarah Miller",
      updatedDate: "2023-06-15",
      version: "1.3",
      dependsOn: [],
      verificationCriteria: "Successfully detect 95% of targets at specified distance",
      tags: ["Targeting", "Detection", "Radar"]
    },
    {
      id: "FR-MISS-002",
      title: "Guidance Control",
      description: "The missile shall continuously adjust flight path based on target tracking data.",
      systemRequirement: "SR-MISS-002",
      priority: "Critical",
      status: "In Progress",
      category: "Guidance",
      functionality: "Flight Control",
      inputs: ["Target Location Data", "Missile Position Data"],
      outputs: ["Control Surface Commands"],
      constraints: "Adjustments must be made within 10ms of receiving data",
      createdBy: "Sarah Miller",
      createdDate: "2023-02-05",
      updatedBy: null,
      updatedDate: null,
      version: "1.0",
      dependsOn: ["FR-MISS-001"],
      verificationCriteria: "Maintain tracking lock on target throughout flight",
      tags: ["Guidance", "Control", "Flight Path"]
    }
  ],
  testCases: [
    {
      id: "TC-MISS-001",
      title: "Maximum Range Test",
      description: "Verify the missile can reach targets at maximum specified range.",
      requirements: ["SR-MISS-001", "FR-MISS-001"],
      status: "Passed",
      priority: "Critical",
      createdBy: "Test Team Alpha",
      createdDate: "2023-03-10",
      executionDate: "2023-04-15",
      testSteps: [
        "Launch missile at maximum range target",
        "Track missile trajectory",
        "Verify target acquisition and hit"
      ],
      expectedResults: "Missile reaches and neutralizes target at 250km distance",
      actualResults: "Target at 255km successfully neutralized",
      testEnvironment: "Field Range Alpha, Conditions: Clear Weather"
    },
    {
      id: "TC-MISS-002",
      title: "Environmental Temperature Test - Cold",
      description: "Verify missile operation at minimum temperature.",
      requirements: ["SR-MISS-003"],
      status: "Passed",
      priority: "High",
      createdBy: "Test Team Beta",
      createdDate: "2023-03-15",
      executionDate: "2023-04-20",
      testSteps: [
        "Condition missile in temperature chamber at -40°C",
        "Verify all systems operational",
        "Perform simulated launch and flight"
      ],
      expectedResults: "All systems function normally at -40°C",
      actualResults: "All systems functional, guidance response 2% slower than nominal",
      testEnvironment: "Environmental Test Chamber, Condition: -40°C"
    }
  ]
};

const fighterRequirements = {
  systemRequirements: [
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
    }
  ],
  functionalRequirements: [
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
    }
  ],
  testCases: [
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
      requirements: ["SR-FGHT-003"],
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
    }
  ]
};

// Function to get requirements based on product type
export const getRequirementsData = (productType: ProductType) => {
  return productType === 'missile' ? missileRequirements : fighterRequirements;
}; 