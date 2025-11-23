import { CTASection, EntrepreneurshipHero, OurProcess, StudentSuccessStories, UltimateLaunchpad } from "../../sections"


export default function Entrepreneurship() {
  return (
    <main className="min-h-screen bg-background">
     <EntrepreneurshipHero/>
     <UltimateLaunchpad/>
     <OurProcess/>
     {/* <StartupIdeaGenerator/> */}
     <StudentSuccessStories/>
     {/* <CTASection/> */}
    </main>
  )
}
