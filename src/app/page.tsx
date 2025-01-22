'use client';

import { exportOfPuppeteer } from '@/components/exportOfPuppeteer';
import exportToPDF from '@/components/exportToPDF';
import exportToPDFHTML from '@/components/exportToPDFHTML';
import MarkdownWithMermaid from '@/components/MarkdownWithMermaid';
import { useState, useRef, RefObject } from 'react';


const Home = () => {
  const markdownRef = useRef<HTMLDivElement>(null);
  const [markdown, setMarkdown] = useState<string>('');

  const handleMarkdownChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(event.target.value);

  };

  const exportButtonHandler = async () => {
    // null 체크를 통해 안정성 확보
    if (markdownRef.current) {
      await exportToPDF(markdownRef as RefObject<HTMLDivElement>); // PDF 변환
    } else {
      console.error('Markdown preview reference is null.');
    }
  };

  const exportButtonHandlerHTML = async () => {
    if (markdownRef.current) {
      // await exportToPDFHTML(markdownRef as RefObject<HTMLDivElement>); // PDF 변환

      await exportOfPuppeteer(markdownRef as RefObject<HTMLDivElement>)
    } else {
      console.error('Markdown preview reference is null.');
    }
  }

  const handleDrop = async (event: React.DragEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];

      if (file.type === 'text/markdown' || file.name.endsWith('.md')) {
        const fileContent = await file.text();
        setMarkdown(fileContent);
      } else {
        alert('Only .md file are supported.');
      }

      event.dataTransfer.clearData();
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
  }

  return (
    <div className="container">
      <button onClick={exportButtonHandler}>export</button>
      <button onClick={exportButtonHandlerHTML}>html export</button>
      <main>
        <div className="editor">
          <textarea
            value={markdown}
            onChange={handleMarkdownChange}
            placeholder="Write your markdown here or drag & drop a .md file..."
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          />
        </div>

        <div className="preview" ref={markdownRef}>
          <MarkdownWithMermaid content={markdown} />
        </div>
      </main>
    </div>
  );
};

export default Home;