import { RefObject } from 'react';
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';

const exportToPDF = async (markdownRef: RefObject<HTMLDivElement>) => {
  if (!markdownRef.current) return;

  // 고해상도 PDF를 위해 비율 설정
  const scale = 2; // 해상도를 두 배로 설정
  const canvas = await html2canvas(markdownRef.current, {
    scale, // 캔버스 크기 조정
    useCORS: true, // CORS 에러 방지
  });

  const imageData = canvas.toDataURL("image/png");

  // PDF 객체 생성
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // 이미지 크기 계산
  const imgWidth = pageWidth; // PDF 페이지 너비에 맞춤
  const imgHeight = (canvas.height * pageWidth) / canvas.width;

  // PDF에 이미지 추가
  if (imgHeight > pageHeight) {
    let remainingHeight = imgHeight;
    let position = 0;

    while (remainingHeight > 0) {
      pdf.addImage(imageData, "PNG", 0, position, imgWidth, imgHeight);
      remainingHeight -= pageHeight;
      position -= pageHeight;

      if (remainingHeight > 0) pdf.addPage();
    }
  } else {
    pdf.addImage(imageData, "PNG", 0, 0, imgWidth, imgHeight);
  }

  // PDF 저장
  pdf.save("markdown_with_mermaid.pdf");
};

export default exportToPDF;