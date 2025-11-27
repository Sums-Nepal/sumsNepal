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
    return <div className="py-8 h-48">Loading PDF....</div>;
  }

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default PdfViewer;
