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
  id: number;
  title: string;
  description: string;
  stage: ProjectStage;

  team: string;
  college: string;
  year: string | number;

  image: string;
  report: string;

  teamLeader: Person;
  teams: Person[];
}
