'use client';

import mermaidDefinition from '@/components/example';
import exportToPDF from '@/components/exportToPDF';
import MarkdownWithMermaid from '@/components/MarkdownWithMermaid';
import { useState, useEffect, useRef, RefObject } from 'react';


const Home = () => {
  const markdownRef = useRef<HTMLDivElement>(null);
  const [markdown, setMarkdown] = useState<string>('');

  useEffect(() => {
    const markdownContent = `
# Mermaid Example
\`\`\`mermaid
${mermaidDefinition}
\`\`\`
  `;
    setMarkdown(markdownContent);

  }, []);

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

  return (
    <div className="container">
      <button onClick={exportButtonHandler}>export</button>
      <main>
        <div className="editor">
          <textarea
            value={markdown}
            onChange={handleMarkdownChange}
            placeholder="Write your markdown here..."
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