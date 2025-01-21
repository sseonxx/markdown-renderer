'use client';

import { useState } from 'react';

import mermaid from 'mermaid';
import { useEffect } from 'react';

const Home = () => {
  const [markdown, setMarkdown] = useState<string>('');

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true });
  }, []);

  const handleMarkdownChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(event.target.value);
    mermaid.contentLoaded(); // Re-render Mermaid diagrams
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


          {markdown}

        </div>
      </main>
    </div>
  );
};

export default Home;