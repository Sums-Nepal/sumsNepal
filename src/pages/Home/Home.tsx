import {
  Colleges,
  Hero,
  Hub,
  Stakeholder,
  Companies,
  Cities,
  Entrepreneurship,
  HowItWorks,
  AssessAndAlignDetailed,
  UpcomingEvents,
  PlatformShowcase,
} from "../../sections";
import Innovation from "../../sections/Innovation/Innovation";

const Home = () => {
  return (
    <>
      <main>
        <Hero />
        <Innovation/>
        <Hub />
        <Stakeholder />
        <Colleges />
        <Companies />
        <Cities />
        <Entrepreneurship />
        <HowItWorks />
        {/* <AssessAndAlignDetailed/> */}
        {/* <UpcomingEvents/> */}
        {/* <PlatformShowcase/> */}
      </main>
    </>
  );
};

export default Home;
