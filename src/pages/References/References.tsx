import {
  Download,
  ExternalLink,
  MapPin,
  FileText,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

import { useState } from "react";
import YouTube from "react-youtube";
import { Document, Page, pdfjs } from "react-pdf";
import PdfViewer from "../../components/PDFViewer/PDFViewer";
import { Button } from "../../components";
import { useNavigate } from "react-router-dom";
import { refrencesData } from "./RefrencesData";

// import "react-pdf/dist/Page/TextLayer.css";
// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function getYouTubeId(url: string) {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export default function ReferencesPage() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [projects, setProjects] = useState<Record<string, any>[]>([
    ...refrencesData,
  ]);
  const [filter, setFilter] = useState<string>("All");
  const navigate = useNavigate();

  const [filterProjects, setFilterProject] = useState<Record<string, any>[]>([
    ...refrencesData,
  ]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const navsFilters = ["All", "National", "International"];

  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-16">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-orange-500 text-sm font-semibold tracking-widest uppercase">
              SumsNepal Work
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-orange-500 to-transparent"></div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 text-balance">
            References & <span className="text-orange-500">Portfolio</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A collection of academic partnerships and professional projects
            spanning international institutions and innovative research
            initiatives.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:gap-8 mb-12">
          {/* Navs filters */}
          <div className="grid gap-6 md:gap-8 mb-12 sticky top-17 bg-white z-50 rounded-4xl">
            {/* Nav Filters */}
            <div
              className="
      flex gap-4 md:gap-8 
      sticky top-16 
      z-50 
      rounded-2xl 
      p-3 md:p-4 

    "
            >
              {navsFilters.map((currentNav, index) => {
                const isActive = filter === currentNav;

                return (
                  <Button
                    key={index}
                    onClick={() => {
                      if (currentNav === "All") {
                        setFilterProject(projects || []);
                      } else if (currentNav === "International") {
                        setFilterProject(
                          (projects || []).filter(
                            (currentProject) => currentProject.filter === "In"
                          )
                        );
                      } else {
                        setFilterProject(
                          (projects || []).filter(
                            (currentProject) => currentProject.filter === "Na"
                          )
                        );
                      }
                      setFilter(currentNav);
                    }}
                    style={{ fontWeight: "500" }}
                    className={`
            px-5 py-2 h-10 w-fit  
            rounded-full transition-all duration-300 
            text-sm md:text-base
            ${
              isActive
                ? "bg-orange-500 text-white shadow-md scale-105"
                : "bg-orange-100 text-orange-600 hover:bg-orange-200 hover:shadow"
            }
          `}
                  >
                    {currentNav}
                  </Button>
                );
              })}
            </div>
          </div>

          {filterProjects.map((project: Record<string, any>, index: number) => (
            <div
              key={project.id}
              onClick={() => {
                navigate(`/references/${project.title}`);
              }}
              className="group relative md:shadow-2xl md:shadow-black-200 rounded-2xl cursor-pointer"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/5 group-hover:to-orange-500/10 transition-all duration-300"></div>

              {project.video && (
                <div className="absolute bottom-6 right-6 z-20 rounded-2xl overflow-hidden hidden md:block">
                  <YouTube
                    videoId={getYouTubeId(project.video)!}
                    opts={{ width: "100%", height: "160" }}
                    className="rounded-2xl"
                  />
                </div>
              )}
              <div className="relative p-8 md:p-10">
                {/* Top Section with Logo and Links */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                  <div className="flex gap-6 flex-1">
                    {/* University Logo */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 p-1 flex items-center justify-center shadow-lg">
                        <img
                          src={project.logo || "/placeholder.svg"}
                          alt={`${project.institution} logo`}
                          className="w-full h-full object-contain rounded-md bg-white/10"
                        />
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="flex-1">
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 group-hover:text-orange-600 transition-colors">
                        {project.title}
                      </h2>
                      <div className="flex flex-col gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-orange-500" />
                          <span className="font-semibold text-orange-600 dark:text-orange-400">
                            {project.institution}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4 text-orange-500" />
                          <span>{project.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 flex-wrap">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-600 dark:text-orange-400 font-medium transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="hidden sm:inline">View</span>
                      </a>
                    )}
                    {project.pdfUrl ? (
                      <button
                        onClick={() => setSelectedProject(project.id)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium transition-colors"
                      >
                        <FileText className="w-4 h-4" />
                        <span className="hidden sm:inline">PDF</span>
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Highlights/Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.highlights.map((highlight: string) => (
                    <span
                      key={highlight}
                      className="px-3 py-1 rounded-full  text-orange-500 text-xs font-medium"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PDF Preview Modal with Viewer */}
      <Dialog
        open={selectedProject !== null}
        onOpenChange={(open) => !open && setSelectedProject(null)}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white border-0">
          <DialogHeader>
            <DialogTitle className="text-orange-600 dark:text-orange-400">
              {
                projects.find(
                  (p: Record<string, any>) => p.id === selectedProject
                )?.title
              }
            </DialogTitle>
            <DialogDescription>
              Document for{" "}
              {
                projects.find(
                  (p: Record<string, any>) => p.id === selectedProject
                )?.institution
              }
            </DialogDescription>
          </DialogHeader>

          <div className="bg-muted/50 rounded-lg p-4 md:p-6 flex flex-col items-center gap-4">
            <div className="w-full bg-white text-white dark:bg-slate-900 rounded-lg overflow-auto max-h-96 flex items-center justify-center">
              {projects.find(
                (p: Record<string, any>) => p.id === selectedProject
              )?.pdfUrl &&
              projects.find(
                (p: Record<string, any>) => p.id === selectedProject
              )?.pdfUrl !== "#" ? (
                <PdfViewer
                  pdfUrl={
                    projects.find(
                      (p: Record<string, any>) => p.id === selectedProject
                    )?.pdfUrl
                  }
                />
              ) : (
                <div className="p-8 text-center">
                  <FileText className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                  <p className="font-semibold text-foreground mb-2">
                    {
                      projects.find(
                        (p: Record<string, any>) => p.id === selectedProject
                      )?.title
                    }
                    .pdf
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Add a PDF URL to preview documents
                  </p>
                </div>
              )}
            </div>

            {/* Page Navigation */}
            {numPages > 0 && (
              <div className="flex items-center gap-4 justify-center w-full">
                <button
                  onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
                  disabled={pageNumber <= 1}
                  className="p-2 rounded-lg hover:bg-orange-500/20 text-orange-600 dark:text-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm font-medium text-foreground">
                  Page {pageNumber} of {numPages}
                </span>
                <button
                  onClick={() =>
                    setPageNumber(Math.min(numPages, pageNumber + 1))
                  }
                  disabled={pageNumber >= numPages}
                  className="p-2 rounded-lg hover:bg-orange-500/20 text-orange-600 dark:text-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Download Button */}
            <a
              href={
                projects.find(
                  (p: Record<string, any>) => p.id === selectedProject
                )?.pdfUrl
              }
              download
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
