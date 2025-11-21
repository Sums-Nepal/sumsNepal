import {
  Building2,
  Users,
  Heart,
  Handshake,
  Globe,
  UserCheck,
  Briefcase,
  Zap,
  Upload,
} from "lucide-react";
import { Button } from "../../components";
import {
  BusniessHeroSection,
  CTASection,
  HowWeSupport,
  OurProcess,
  PostYourOffer,
  WhoCanJoin,
} from "../../sections";

export default function CollaborationPlatform() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* <div className="min-h-screen bg-white"> */}
      <BusniessHeroSection />
      <WhoCanJoin />
      <HowWeSupport />
      <OurProcess />
      <PostYourOffer />
      {/* <CTASection /> */}
      {/* </div> */}
    </main>
  );
}
