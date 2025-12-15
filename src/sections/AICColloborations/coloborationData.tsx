

export interface Collaboration {
  id: string;
  companyName: string;
  collegeName?: string;
  collegeLogoUrl: string;
  projectTitle: string;
  projectDescription: string;
  duration?: string;
  status?: "ongoing" | "completed" | "upcoming";
}


export interface AICCollaborationsProps {
  data?: Collaboration[];
}

export const collaborations: Collaboration[] = [
  {
    id: "1",
    companyName: "Sumitomo",
    collegeName: "Texas Collage",
    collegeLogoUrl: "/images/logos/texas-mgmt-id.png",
    projectTitle:
      "Improving Supply Chain Efficiency through Centralized Supplier Data",
    projectDescription:
      "Optimizing the supply chain process by implementing a centralized system for managing supplier data, increasing transparency and operational efficiency.",
    duration: "6 months",
    status: "completed",
  },
  {
    id: "2",
    companyName: "Nexport",
    collegeName: "Texas Collage",
    collegeLogoUrl: "/images/logos/texas-mgmt-id.png",
    projectTitle:
      "Sourcing the Best Cross Border Logistics Company using Blockchain Technology",
    projectDescription:
      "Leveraging blockchain technology to optimize cross-border logistics, ensuring transparency and improving trust in the supply chain process.",
    duration: "6 months",
    status: "completed",
  },
  {
    id: "3",
    companyName: "Saransa Media and Technology Group",
    collegeName: "Texas Collage",
    collegeLogoUrl: "/images/logos/texas-mgmt-id.png",
    projectTitle: "Saransa Catalyst Project",
    projectDescription:
      "Developing cutting-edge media and technology solutions for industries like entertainment and digital marketing through the Saransa Catalyst Project.",
    duration: "6 months",
    status: "completed",
  },
  {
    id: "4",
    companyName: "Bimba Glass Private Limited",
    // collegeName: "Demo University",
    collegeLogoUrl: "/images/logos/bimba-glass.jpg",
    projectTitle:
      "Strategic Market Expansion and Distribution Plan for Bimba Glass Across Six Provinces of Nepal",
    projectDescription:
      "Building a market expansion strategy for Bimba Glass to establish a strong distribution network across six provinces of Nepal.",
    // duration: "24 months",
    status: "upcoming",
  },
  {
    id: "5",
    companyName: "National Innovation Centre",
    // collegeName: "Demo University",
    collegeLogoUrl: "/images/logos/national-innovation.png",
    projectTitle: "Medical Drone Delivery",
    projectDescription:
      "Developing a drone-based delivery system for transporting medical supplies, ensuring quick access to remote areas.",
    // duration: "15 months",
    status: "upcoming",
  },
  {
    id: "6",
    companyName: "Nexport",
    collegeName: "Kathmandu University",
    collegeLogoUrl: "/images/logos/kulogo.png",
    projectTitle:
      "Building an MVP FF SaaS for the Global Supply Chain Industry",
    projectDescription:
      "Creating a Minimum Viable Product (MVP) for a SaaS platform tailored for the global supply chain industry, streamlining operations across borders.",
    duration: "9 months",
    status: "ongoing",
  },
  {
    id: "7",
    companyName: "Aaha Nepali Enterprises Private Limited",
    // collegeName: "Demo University",
    collegeLogoUrl: "/images/c-3.jpeg",
    projectTitle: "PicklePath UK – From Nepali Kitchens to the UK",
    projectDescription:
      "Introducing authentic Nepali pickles to the UK market by identifying reliable vendors, ensuring consistent product quality, optimizing costs and profit margins, and designing an efficient logistics and compliance strategy aligned with UK import and consumer standards.",
    status: "upcoming",
  },
  {
    id: "8",
    companyName: "Forefront Engineering Private Limited",
    // collegeName: "Demo University",
    collegeLogoUrl: "/images/logos/coll-three.png",
    projectTitle: "Integrated BIM and Hydropower Modelling",
    projectDescription:
      "An applied research project integrating Building Information Modelling (BIM) with hydrological analysis and hydropower engineering to improve planning, design efficiency, and sustainability through digital workflows, simulations, and data-driven modelling.",
    status: "upcoming",
  },
  {
    id: "9",
    companyName: "Milk Art and Food Product Private Limited",
    // collegeName: "Demo University",
    collegeLogoUrl: "/images/logos/coll-two.png",
    projectTitle:
      "Market Expansion and Operations Strategy: Milk Art and Food Pvt. Ltd.",
    projectDescription:
      "Analyzing operations, product positioning, marketing strategy, and market expansion opportunities to support scalable growth and long-term business sustainability.",
    status: "upcoming",
  },
  {
    id: "10",
    companyName: "Global Loss Adjustor Private Limited",
    // collegeName: "Demo University",
    collegeLogoUrl: "/images/logos/coll-one.jpeg",
    projectTitle: "Automating Accident Reporting & Insurance Claim Processing",
    projectDescription:
      "Identifying market gaps, cost inefficiencies, and business opportunities for building an autonomous mobile application that automates accident reporting, data collection, police verification, and insurance claim initiation.",
    status: "upcoming",
  },
  {
    id: "11",
    companyName: "Nepvigyapan Private Limited",
    // collegeName: "Demo University",
    collegeLogoUrl: "/images/logos/neplogo.png",
    projectTitle: "Rental Platform",
    projectDescription:
      "A community-based rental platform that allows neighbors to safely lend or rent specialized equipment such as high-end camera lenses, home repair tools, and party supplies within a city or local community.",
    status: "upcoming",
  },
];
