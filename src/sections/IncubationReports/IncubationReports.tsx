"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, FileText, Download, Eye, Sparkles } from "lucide-react"
import { Button } from "../../components"
import PdfViewer from "../../components/PDFViewer/PDFViewer"

const reportsData = [
  {
    title: "Texas College",
    logo: "texas-mgmt-id.png",
    report: "/files/ilovepdf_compressed_2/SUMS X Texas pre-incubation Public Report -2_compressed.pdf",
  },
  {
    title: "St. Xaviers",
    logo: "st-x.png",
    report: "/files/ilovepdf_compressed_2/St.Xaviers Mid Term Report-4_compressed.pdf",
  },
  {
    title: "School of Management",
    logo: "somtu.png",
    report: "/files/ilovepdf_compressed/School of Management - Public  Report _compressed.pdf",
  },
  {
    title: "Samarpan College",
    logo: "icms.jpeg",
    report: "/files/ilovepdf_compressed/Samarpan Final Public Report_compressed.pdf",
  },
]

const IncubationReports = () => {
  const [pdfURL, setPDFURL] = useState<string>("")

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-900/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-6"
          >
            Institutional Transparency
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-7xl font-black text-foreground tracking-tighter uppercase mb-6"
          >
            INCUBATION <span className="text-primary italic">REPORTS</span>
          </motion.h2>
          <p className="text-muted-foreground text-lg lg:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            Our Pre-Incubation Reports summarize the key activities and outcomes
            from programs conducted in different partner colleges under the SUMS Innovator Program (SIP).
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
        >
          {reportsData.map((report, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="relative h-full bg-white dark:bg-slate-900 border border-border rounded-[2.5rem] p-8 shadow-sm transition-all duration-500 hover:shadow-2xl hover:border-primary/50 overflow-hidden">
                <div className="flex flex-col items-center text-center h-full">
                  <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors p-4">
                    <img
                      src={`/images/logos/${report.logo}`}
                      alt={report.title}
                      className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500 dark:invert"
                    />
                  </div>

                  <h3 className="text-xl font-black text-foreground mb-8 uppercase tracking-tighter group-hover:text-primary transition-colors">
                    {report.title}
                  </h3>

                  <div className="mt-auto w-full space-y-3">
                    <Button
                      onClick={() => window.open(report.report, "_blank")}
                      className="w-full bg-primary text-white hover:bg-primary/90 rounded-xl py-3 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      View PDF
                    </Button>

                    <a
                      href={report.report}
                      download
                      className="w-full flex items-center justify-center gap-2 py-3 border border-border rounded-xl text-xs font-black uppercase tracking-widest text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* PDF Modal Viewer */}
      <AnimatePresence>
        {pdfURL && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white dark:bg-slate-950 z-[9999] flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-xl font-black uppercase tracking-tighter">Report Viewer</h3>
              <button
                onClick={() => setPDFURL("")}
                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-auto bg-slate-200 dark:bg-slate-900 p-4">
              <PdfViewer pdfUrl={pdfURL} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default IncubationReports
