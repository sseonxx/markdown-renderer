import { RefObject } from "react";

export const exportOfPuppeteer = async (markdownRef: RefObject<HTMLDivElement>) => {
  if (markdownRef.current) {
    const content = markdownRef.current.innerHTML;

    try {
      const response = await fetch("/api/export-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ htmlContent:content }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      const pdfBlob = await response.blob();

      // PDF 파일 다운로드
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "output.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("PDF 다운로드 실패:", error);
    }
  } else {
    console.error("Markdown preview reference is null.");
  }
};