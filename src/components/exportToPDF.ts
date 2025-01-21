
import { RefObject } from 'react';
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';

const exportToPDF = async (markdownRef: RefObject<HTMLDivElement>) => {
  if (!markdownRef.current) return;
  // 캔버스 생성
  const canvas = await html2canvas(markdownRef.current);
  const imageData = canvas.toDataURL("image/png");
  // PDF 객체 생성
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  // 이미지 크기 계산
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * pageWidth) / canvas.width;

  // PDF 페이지 크기에 맞춰 이미지 추가
  if (imgHeight > pageHeight) {
    pdf.addImage(imageData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.addPage();
  } else {
    pdf.addImage(imageData, "PNG", 0, 0, imgWidth, imgHeight);
  }

  pdf.save("markdown_with_mermaid.pdf");
};

export default exportToPDF;