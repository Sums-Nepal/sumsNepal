
import { CityHeroSection } from "../../sections/CityHeroSection/CityHeroSection";
import { ProblemsSection } from "../../sections/ProblemsSection/ProblemsSection";
import { SolutionsSection } from "../../sections/SolutionsSection/SolutionsSection";
import { FeaturedProjectsSection } from "../../sections/FeaturedProjectsSection/FeaturedProjectsSection";
import { CityRoleSection } from "../../sections/CityRoleSection/CityRoleSection";
import { CityPartnershipSection } from "../../sections/CityPartnershipSection/CityPartnershipSection";
import { GetInvolvedSection } from "../../sections/GetInvolvedSection/GetInvolvedSection";
import { ContactSection } from "../../sections/ContactSection/ContactSection";

const City = () => {
  return (
    <>
      <main>
        <CityHeroSection />
        <ProblemsSection />
        <SolutionsSection />
        {/* <FeaturedProjectsSection /> */}
        {/* <CityRoleSection /> */}
        <CityPartnershipSection />
        <GetInvolvedSection />
        <ContactSection />
      </main>
    </>
  );
};

export default City;
