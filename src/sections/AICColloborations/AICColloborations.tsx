import { Building2, GraduationCap } from "lucide-react";
import React, { useState } from "react";
import { collaborations, type AICCollaborationsProps, type Collaboration } from "./coloborationData";

// Dynamic collaboration data structure


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


   {/* Filter Buttons */}
        <div className="mb-12 flex flex-wrap justify-center items-center gap-3">
          {status.map((currentData, index) => (
            <button
              key={currentData + String(index)}
              onClick={() => {
                if (currentData === "all") {
                  setFiltersColl(data)
                  return
                }
                setFiltersColl([...data.filter((current) => current.status === currentData)])
              }}
              className="group relative overflow-hidden rounded-full bg-white px-6 py-2.5 text-sm font-semibold capitalize text-foreground shadow-sm ring-1 ring-orange-500/20 transition-all hover:shadow-md hover:ring-orange-500/40 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">{currentData}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-orange-600/5 opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
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
