import  { useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

const PdfViewer = ({ pdfUrl, pageNumbers }: any) => {
  const [htmlContent, setHtmlContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
    const loadPdf = async () => {
      const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
      const numOfPages = pageNumbers || pdf.numPages;
      const htmlOutput = [];
      for (let i = 1; i <= numOfPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.0 });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        // @ts-ignore
        await page.render(renderContext).promise;

        // Convert canvas to HTML (img) element
        const img = `<img src="${canvas.toDataURL()}" alt="pdf-page-${i}" />`;
        htmlOutput.push(img);
      }

      setHtmlContent(htmlOutput.join(""));
      setIsLoading(false);
    };

    loadPdf();
  }, [pdfUrl, setIsLoading]);

  if (isLoading) {
    return <div className="flex flex-col items-center justify-center h-48 space-y-4">
  {/* Spinner */}
  <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>

{/* Loading Text */}

  <div className="text-gray-700 font-medium text-lg animate-pulse">
    Loading PDF...
  </div>
</div>

  }

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default PdfViewer;
