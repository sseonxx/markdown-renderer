import mermaid from 'mermaid';
import React, { useEffect, useRef } from 'react';
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialOceanic } from "react-syntax-highlighter/dist/cjs/styles/prism";

type MarkdownWithMermaidProps = {
  content: string;
};

const MarkdownWithMermaid: React.FC<MarkdownWithMermaidProps> = ({ content }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false });

    const renderMermaidCharts = async () => {
      if (!containerRef.current) return;

      const mermaidElements = containerRef.current.querySelectorAll(".mermaid");
      for (let index = 0; index < mermaidElements.length; index++) {
        const el = mermaidElements[index];
        const mermaidCode = el.textContent || "";
        try {
          const { svg } = await mermaid.render(`mermaid-${index}`, mermaidCode);
          el.innerHTML = svg;
        } catch (error) {
          console.error("Mermaid render error:", error);
          el.innerHTML = `<pre style="color: red;">Mermaid render error: ${error}</pre>`;
        }
      }
    };

    renderMermaidCharts();
  }, [content]);

  return (
    <div ref={containerRef}>
      <ReactMarkdown
        components={{
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");

            // Mermaid 처리
            if (match && match[1] === "mermaid") {
              return (
                <div className="mermaid">
                  {String(children).replace(/\n$/, "")}
                </div>
              );
            }

            // 일반 코드 블록 처리
            return !inline && match ? (
              <SyntaxHighlighter
                style={materialOceanic}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          img: ({ src, alt }) => (
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <img
                src={src}
                alt={alt}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownWithMermaid;
