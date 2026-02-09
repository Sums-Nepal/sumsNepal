import { StudentSuccessStories, StudentVideoShowcase, StundetHero } from "../../sections";

export default function Student() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <StundetHero />

      <div className="relative">
        <StudentVideoShowcase />
        <StudentSuccessStories />
      </div>
    </main>
  );
}
