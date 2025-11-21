import { ArrowRight, Target, Users } from "lucide-react";

// Data
export const entrepreneurshipData = {
  tag: "ENTREPRENEURSHIP",
  image: "./images/Turn-students-into-founders.jpeg",
  imageAlt: "Startup team meeting in modern office",
  title: "Turn Students into",
  highlight: "Founders",
  description:
    "Empower the next generation of Nepali entrepreneurs. We provide the ecosystem, mentorship, and resources needed to transform innovative ideas into successful startups.",
  benefits: [
    {
      id: 1,
      text: "Solve real problems",
      icon: Target,
    },
    {
      id: 2,
      text: "Mentors, funding, growth",
      icon: Users,
    },
  ],
  impact: {
    title: "Impact",
    description:
      "Students launch startups that create jobs and solve local problems, contributing to Nepal's economic growth and innovation ecosystem.",
  },
  cta: {
    text: "Launch Startups",
    icon: ArrowRight,
  },
};