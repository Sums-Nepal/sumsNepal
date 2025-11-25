import {
  BusniessHeroSection,
  HowWeSupport,
  OurProcess,
  PostYourOffer,
  WhoCanJoin,
} from "../../sections";
import BusinessCompaniesTrust from "../../sections/BusinessCompaniesTrustList/BusinessCompaniesTrust";

export default function CollaborationPlatform() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* <div className="min-h-screen bg-white"> */}
      <BusniessHeroSection />
      <BusinessCompaniesTrust/>
      <WhoCanJoin />
      <HowWeSupport />
      <OurProcess />
      <PostYourOffer />
      {/* <CTASection /> */}
      {/* </div> */}
    </main>
  );
}
