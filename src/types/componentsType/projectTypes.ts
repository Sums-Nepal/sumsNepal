import type { off } from "node:cluster";

export type ProjectStage =
  | "idea"
  | "research"
  | "design"
  | "build-mvp"
  | "testing"
  | "launched"
  | "incubate"
  | "ideate"
  | "accelerate"
  | "relocate"
  | "test";

export interface Person {
  name: string;
  email: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  stage: ProjectStage;

  team: string;
  college: string;
  year: string | number;

  image: string;
  report?: string;

  projectLeaders: Person;
  teams: Person[];
}


export interface  ProjectPaginationMetaData {
  pageNumber: number;
}

export interface ProjectListResponse {
  projects: Project[];
  hasMore: boolean;
  total: number;
}

export interface GetProjectsArgs {
  page: number;
  stage?: string | null;
  colleges?: string[];
  years?: number[];
  q?: string; // search query
};
