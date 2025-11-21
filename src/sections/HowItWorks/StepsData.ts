import { Briefcase, GraduationCap, Search, Users } from "lucide-react";

export const stepsData = [
  {
    id: 1,
    title: "Assess & Align",
    description: "Match skills to needs",
    icon: Search,
    active: true,
  },
  {
    id: 2,
    title: "Connect",
    description: "Mentors, projects",
    icon: Users,
    active: true,
  },
  {
    id: 3,
    title: "Upskill",
    description: "Train teachers, students",
    icon: GraduationCap,
    active: false,
  },
  {
    id: 4,
    title: "Place",
    description: "Jobs via CareerSync",
    icon: Briefcase,
    active: false,
  },
];