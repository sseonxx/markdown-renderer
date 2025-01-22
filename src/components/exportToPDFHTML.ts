import jsPDF from "jspdf";
import { RefObject } from "react"
import loadFontFromURL from "./loadFontFromURL";


const exportToPDFHTML = async (markdownRef: RefObject<HTMLDivElement>) => {
  if (!markdownRef.current) return;

  try {
    // PDF 객체 생성
    const pdf = new jsPDF("p", "mm", "a4");

    // 한글 폰트 추가
    const fontData = await loadFontFromURL('https://fastly.jsdelivr.net/gh/wanteddev/wanted-sans@v1.0.1/packages/wanted-sans/fonts/webfonts/variable/split/WantedSansVariable.min.css');
    pdf.addFileToVFS("WantedSans-Regular.ttf", fontData);
    pdf.addFont("WantedSans-Regular.ttf", "WantedSansKR", "normal");
    pdf.setFont("WantedSansKR");

    // PDF로 내보내기 전에 글씨 크기를 CSS로 조정
    const originalFontSize = markdownRef.current.style.fontSize;
    markdownRef.current.style.fontSize = "12px"; // 적절한 글씨 크기로 조정

    // HTML 내용을 PDF로 추가
    await pdf.html(markdownRef.current, {
      x: 10,
      y: 10,
      html2canvas: {
        scale: 0.8, // PDF 크기 조정을 위해 스케일 적용
      },
      callback: () => {
        // PDF 저장
        pdf.save("markdown_with_mermaid.pdf");

        // 글씨 크기를 원래대로 복원
        markdownRef.current.style.fontSize = originalFontSize || "";
      },
    });
  } catch (error) {
    console.error("Error exporting to PDF:", error);
  }
}

export default exportToPDFHTML