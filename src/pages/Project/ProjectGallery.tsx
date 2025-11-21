import {
  FeatureCards,
  FilterAndSearchProjects,
  InnovationMetrics,
  ProjectHero,
  Projects,
} from "../../sections";

export default function ProjectGallery() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <ProjectHero />
      <FeatureCards />
      <FilterAndSearchProjects />
      <Projects />
      <InnovationMetrics/>
    </main>
  );
}
