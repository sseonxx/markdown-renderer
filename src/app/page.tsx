'use client';

import mermaidDefinition from '@/components/example';
import MarkdownWithMermaid from '@/components/MarkdownWithMermaid';
import { useState, useEffect } from 'react';


const Home = () => {
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

  return (
    <div className="container">
      <main>
        <div className="editor">
          <textarea
            value={markdown}
            onChange={handleMarkdownChange}
            placeholder="Write your markdown here..."
          />
        </div>

        <div className="preview">
          <MarkdownWithMermaid content={markdown} />
        </div>
      </main>
    </div>
  );
};

export default Home;