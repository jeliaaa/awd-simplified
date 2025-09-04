import React, { useState, useMemo } from "react";
import { useTTSStore } from "../store/useTTSStore";

const TSSText = ({ content, html = false }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { loading, playTTS } = useTTSStore();

  const paragraphs = useMemo(() => {
    if (!content) return [];

    let text = "";

    if (html) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, "text/html");
      text = doc.body.textContent || "";
    } else {
      text = content;
    }

    return text
      .split(/\r?\n\s*\r?\n/) 
      .map(p => p.trim())
      .filter(p => p.length > 0);
  }, [content, html]);

  const handleSpeech = (index, para) => {
    setActiveIndex(index);
    playTTS(para, 0)
    console.log(para);
    
  };

  return (
    <div>
      {paragraphs.map((para, index) => (
        <p
          key={index}
          onMouseDown={() => !loading && handleSpeech(index, para)}
          className="mb-4 cursor-pointer transition-colors duration-200"
          style={{
            backgroundColor: index === activeIndex ? "violet" : "transparent",
            padding: "4px",
            borderRadius: "4px",
          }}
        >
          {para}
        </p>
      ))}
    </div>
  );
};

export default TSSText;
