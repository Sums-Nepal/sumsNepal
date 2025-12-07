import { Building2, GraduationCap } from "lucide-react";
import React, { useState } from "react";

// Dynamic collaboration data structure
export interface Collaboration {
  id: string;
  companyName: string;
  collegeName: string;
  collegeLogoUrl: string;
  projectTitle: string;
  projectDescription: string;
  duration?: string;
  status?: "ongoing" | "completed" | "upcoming";
}

// Sample data - replace with your actual data
const collaborations: Collaboration[] = [
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
    collegeName: "Demo University",
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
    collegeName: "Demo University",
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
];

interface AICCollaborationsProps {
  data?: Collaboration[];
}

export function AICCollaborations({
  data = collaborations,
}: AICCollaborationsProps) {
  const [filtersColl, setFiltersColl] =
    useState<Collaboration[]>(collaborations);
  const getStatusColor = (status?: string) => {
    switch (status) {
      case "ongoing":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
      case "completed":
        return "bg-green-100 text-green-900 dark:bg-green-600/30 dark:text-green-900";
      case "upcoming":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const status = ["all", "ongoing", "completed", "upcoming"]
  return (
    <div className="w-full py-12 px-4 flex flex-col justify-center items-center">
      {/* Header Section */}
      <div className="mb-12 text-center max-w-3xl w-full">
        <h1 className="mb-4 text-4xl font-bold text-balance text-foreground md:text-5xl">
          AIC{" "}
          <span className="text-orange-500">
            Academy Industry Collaboration
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty">
          Fostering innovation through strategic partnerships between leading
          companies and prestigious academic institutions
        </p>
      </div>

      {/* <div className="flex max-w-[60%] gap-6 mb-9 flex-wrap justify-center items-center">
        {[...filtersColl]
          .filter(
            (currentData, index, self) =>
              index ===
              self.findIndex((t) => t.collegeName === currentData.collegeName)
          )
          .map((currentData, index) => (
            <span
              className="bg-gray-900 text-white p-1 rounded-2xl shadow-2xl"
              key={currentData.collegeName + String(index)}
            >
              #{currentData.collegeName}
            </span>
          ))}
      </div> */}

      <div className="flex max-w-[60%] gap-6 mb-9 flex-wrap justify-center items-center">
        {status.map((currentData, index) => (
            <span
              className="bg-gray-900 text-white p-1 rounded-2xl shadow-2xl cursor-pointer"
              key={currentData + String(index)}
              onClick={(e: React.MouseEvent<HTMLSpanElement>) => {
                if (currentData === "all") {
                    setFiltersColl(collaborations);
                    return;
                }
                setFiltersColl([
                  ...collaborations.filter(
                    (current) => current.status === currentData
                  ),
                ]);
              }}
            >
              #{currentData}
            </span>
          ))}
      </div>

      {/* Collaborations Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtersColl.map((collaboration) => (
          <div
            key={collaboration.id}
            className="group card max-w-sm mx-auto" // Set max-width and center the cards
          >
            {/* Card Header */}
            <div className="p-6 space-y-4">
              {/* College Logo */}
              <div className="flex items-center justify-center">
                <div className="">
                  <img
                    src={collaboration.collegeLogoUrl || "/placeholder.svg"}
                    alt={`${collaboration.collegeName} logo`}
                    className="h-40 w-40 object-contain"
                  />
                </div>
              </div>

              {/* Project Title */}
              <h3 className="text-center text-xl font-semibold text-balance text-card-foreground">
                {collaboration.projectTitle}
              </h3>

              {/* Status Badge */}
              {collaboration.status && (
                <div className="flex justify-center">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide ${getStatusColor(
                      collaboration.status
                    )}`}
                  >
                    {collaboration.status}
                  </span>
                </div>
              )}
            </div>

            {/* Card Content */}
            <div className="p-6 pt-0 space-y-4">
              {/* Company Name */}
              <div className="flex items-start gap-2">
                <Building2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-500" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Company
                  </p>
                  <p className="font-semibold text-card-foreground">
                    {collaboration.companyName}
                  </p>
                </div>
              </div>

              {/* College Name */}
              <div className="flex items-start gap-2">
                <GraduationCap className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-500" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Academic Partner
                  </p>
                  <p className="font-semibold text-card-foreground">
                    {collaboration.collegeName}
                  </p>
                </div>
              </div>

              {/* Project Description */}
              <div className="space-y-1 border-t border-border pt-4">
                <p className="text-sm text-muted-foreground text-pretty">
                  {collaboration.projectDescription}
                </p>
              </div>

              {/* Duration */}
              {collaboration.duration && (
                <div className="flex items-center justify-between rounded-lg bg-orange-50 p-3 dark:bg-orange-950/20">
                  <span className="text-xs font-medium text-muted-foreground">
                    Duration
                  </span>
                  <span className="font-semibold text-orange-600 dark:text-orange-400">
                    {collaboration.duration}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
