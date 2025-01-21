'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const Home = () => {
  const [markdown, setMarkdown] = useState<string>('');

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
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </main>
    </div>
  );
};

export default Home;
