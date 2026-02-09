"use client"

import {
  BusniessHeroSection,
  HowWeSupport,
  OurProcess,
  PostYourOffer,
  WhoCanJoin,
} from "../../sections"
import BusinessCompaniesTrust from "../../sections/BusinessCompaniesTrustList/BusinessCompaniesTrust"
import { motion } from "framer-motion"

export default function CollaborationPlatform() {
  return (
    <main className="min-h-screen bg-background transition-colors duration-500 overflow-x-hidden">
      {/* Dynamic Background Accents */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/2 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/2 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <BusniessHeroSection />

        <div className="space-y-0.5">
          <BusinessCompaniesTrust />
          <WhoCanJoin />
          <HowWeSupport />
          <OurProcess />
          <PostYourOffer />
        </div>
      </motion.div>
    </main>
  )
}
