import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

// POST 요청 핸들러
export async function POST(req: Request) {
  try {
    const { htmlContent } = await req.json();

    if (!htmlContent) {
      return NextResponse.json({ error: "No HTML content provided" }, { status: 400 });
    }

    // Puppeteer 브라우저 실행
    const browser = await puppeteer.launch({
      headless: "new", // 최신 Puppeteer API 사용 시 권장 옵션
    });
    const page = await browser.newPage();

    // HTML 설정
    await page.setContent(htmlContent, { waitUntil: "load" });

    // PDF 생성
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true, // 배경 스타일 포함
      scale:0.9,
      margin: {
        top: "20mm",
        bottom: "20mm",
        left: "20mm",
        right: "20mm",
      },
    });

    await browser.close();

    // PDF 반환
    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="output.pdf"',
      },
    });
  } catch (error) {
    console.error("PDF 생성 오류:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
