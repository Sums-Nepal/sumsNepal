import { EntrepreneurshipFrom } from "../../components"
import { CTASection, EntrepreneurshipHero, IncubationReports, OurProcess, StudentProjectShowcase, StudentSuccessStories, UltimateLaunchpad } from "../../sections"


export default function Entrepreneurship() {
  return (
    <main className="min-h-screen bg-background">
     <EntrepreneurshipHero/>
     <UltimateLaunchpad/>
     <OurProcess/>
     <IncubationReports/>
     <StudentProjectShowcase/>
     {/* <StartupIdeaGenerator/> */}
     <StudentSuccessStories/>
     {/* <CTASection/> */}
     <EntrepreneurshipFrom />
    </main>
  )
}
