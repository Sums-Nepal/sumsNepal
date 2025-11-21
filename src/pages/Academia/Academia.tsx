import {
  Award,
  BarChart3,
  Building2,
  FileText,
  FlaskConical,
  Lightbulb,
  Monitor,
  Users,
} from "lucide-react";
import {
    AcademiaGrow,
  AcademiaHero,
  AcademiaInAction,
  GrowthFlywheel,
  OutcomesSection,
  Partner,
  PartnershipBenefits,
} from "../../sections";
import { Button } from "../../components";

export default function AcademicsPage() {
  return (
    <main className="min-h-screen bg-white">
      <AcademiaHero />
      <Partner />
      {/* <AcademiaInAction /> */}
      <PartnershipBenefits />
      <OutcomesSection/>
      <GrowthFlywheel/>
      <AcademiaGrow/>

     

    </main>
  );
}
