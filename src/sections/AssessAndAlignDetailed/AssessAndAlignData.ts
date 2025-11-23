// src/pages/AssessAndAlign/AssessAndAlignData.ts
import { BookOpen, Lightbulb, Target, Users } from "lucide-react";

export const assessAndAlignData = [
  {
    id: 1,
    title: "Career Sync",
    description: "Match students to job role",
    image: "./images/hero_right.png",
    alt: "Career matching interface",
    icon: Target,
    highlight: false,
  },
  {
    id: 2,
    title: "Project Portal",
    description: "Solve company challenges",
    image: "./images/assign-and-align-2.jpg",
    alt: "Project collaboration",
    icon: Lightbulb,
    highlight: true, 
  },
  {
    id: 3,
    title: "Internship Connect",
    description: "Place student at partner Company",
    image: "./images/assign-and-align-3.jpg",
    alt: "Internship program",
    icon: Users,
    highlight: false,
  },
  {
    id: 4,
    title: "Curriculum Booster",
    description: "Align curriculum with market needs",
    image: "./images/assign-and-align-4.jpg",
    alt: "Curriculum development",
    icon: BookOpen,
    highlight: false,
  },

];
