import { Building2, GraduationCap } from "lucide-react";
import React, { useMemo, useState } from "react";
import {
  collaborations,
  type AICCollaborationsProps,
  type Collaboration,
} from "./coloborationData";

type StatusFilter = "upcoming" | "ongoing" | "completed" | "all";
type DomainFilter = "all" | "engineering" | "it management";

function inferDomain(c: Collaboration): Exclude<DomainFilter, "all"> | "other" {
  const text = `${c.projectTitle} ${c.projectDescription} ${c.companyName} ${c.collegeName ?? ""}`.toLowerCase();

  // Engineering-ish keywords
  const engineeringKeywords = [
    "engineering",
    "hydropower",
    "hydrological",
    "bim",
    "modelling",
    "modeling",
    "infrastructure",
    "drone",
    "medical drone",
    "river basin",
    "sediment",
    "power generation",
    "glass",
    "builders",
    "construction",
  ];

  // IT / product / platform / systems-ish keywords
  const itKeywords = [
    "saas",
    "mvp",
    "platform",
    "application",
    "mobile",
    "system",
    "automating",
    "automation",
    "data",
    "blockchain",
    "digital",
    "software",
    "reporting",
    "processing",
    "rental",
    "hostel finder",
    "centralized",
    "supplier",
  ];

  const engineeringHit = engineeringKeywords.some((k) => text.includes(k));
  const itHit = itKeywords.some((k) => text.includes(k));

  // If both hit, prefer IT Management (since many engineering projects also mention "digital workflows")
  if (engineeringHit && !itHit) return "engineering";
  if (itHit) return "it management";

  return "other";
}

export function AICCollaborations({ data = collaborations }: AICCollaborationsProps) {
  const statusOrder: StatusFilter[] = ["upcoming", "ongoing", "completed", "all"];
  const domainOrder: DomainFilter[] = ["all", "engineering", "it management"];


  const [activeStatus, setActiveStatus] = useState<StatusFilter>("upcoming");
  const [activeDomain, setActiveDomain] = useState<DomainFilter>("all");


  const filteredCollabs = useMemo(() => {
    let list = data;

    if (activeStatus !== "all") {
      list = list.filter((c) => c.status === activeStatus);
    }

    if (activeDomain !== "all") {
      list = list.filter((c) => inferDomain(c) === activeDomain);
    }

    return list;
  }, [data, activeStatus, activeDomain]);

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

  return (
    <div className="w-full py-12 px-4 flex flex-col justify-center items-center">
      {/* Header Section */}
      <div className="mb-12 text-center max-w-3xl w-full">
        <h1 className="mb-4 text-4xl font-bold text-balance text-foreground md:text-5xl">
          AIC <span className="text-orange-500">Academy Industry Collaboration</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty">
          Fostering innovation through strategic partnerships between leading companies and
          prestigious academic institutions
        </p>
      </div>

      {/* Filters */}
      <div className="mb-10 flex flex-col items-center gap-4">
        {/* Status Filter Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-3">
          {statusOrder.map((s) => {
            const isActive = activeStatus === s;

            return (
              <button
                key={s}
                onClick={() => setActiveStatus(s)}
                className={[
                  "group relative overflow-hidden rounded-full px-6 py-2.5 text-sm font-semibold capitalize shadow-sm ring-1 transition-all hover:shadow-md hover:scale-105 active:scale-95",
                  isActive
                    ? "bg-orange-500 text-white ring-orange-500"
                    : "bg-white text-foreground ring-orange-500/20 hover:ring-orange-500/40",
                ].join(" ")}
              >
                <span className="relative z-10">{s}</span>
                {!isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-orange-600/5 opacity-0 transition-opacity group-hover:opacity-100" />
                )}
              </button>
            );
          })}
        </div>

        {/* Domain Filter Buttons (Engineering / IT Management) */}
        <div className="flex flex-wrap justify-center items-center gap-3">
          {domainOrder.map((d) => {
            const isActive = activeDomain === d;

            return (
              <button
                key={d}
                onClick={() => setActiveDomain(d)}
                className={[
                  "group relative overflow-hidden rounded-full px-6 py-2.5 text-sm font-semibold capitalize shadow-sm ring-1 transition-all hover:shadow-md hover:scale-105 active:scale-95",
                  isActive
                    ? "bg-orange-500 text-white ring-orange-500"
                    : "bg-white text-foreground ring-orange-500/20 hover:ring-orange-500/40",
                ].join(" ")}
              >
                <span className="relative z-10">{d}</span>
                {!isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-orange-600/5 opacity-0 transition-opacity group-hover:opacity-100" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Collaborations Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCollabs.map((collaboration) => (
          <div key={collaboration.id} className="group card max-w-sm mx-auto">
            {/* Card Header */}
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-center">
                <img
                  src={collaboration.collegeLogoUrl || "/placeholder.svg"}
                  alt={`${collaboration.collegeName} logo`}
                  className="h-40 w-40 object-contain"
                />
              </div>

              <h3 className="text-center text-xl font-semibold text-balance text-card-foreground">
                {collaboration.projectTitle}
              </h3>

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

              <div className="space-y-1 border-t border-border pt-4">
                <p className="text-sm text-muted-foreground text-pretty">
                  {collaboration.projectDescription}
                </p>
              </div>

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
