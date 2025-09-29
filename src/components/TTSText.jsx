import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useTTSStore } from "../store/useTTSStore";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

const TTSText = ({ 
  link, 
  func, 
  content, 
  html = false, 
  className, 
  children = null 
}) => {
  const { playTTS, activeText, audioDuration, loading, stopTTS } = useTTSStore();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const paraRef = React.useRef(null);
  const [height, setHeight] = useState(0);

  const handleGetHeight = () => {
    if (paraRef.current) {
      const rect = paraRef.current.getBoundingClientRect();
      rect.height && setHeight(rect.height);
    }
  };

  const paragraphs = useMemo(() => {
    if (!content) return [];

    // If HTML, parse textContent
    let text = html
      ? new DOMParser().parseFromString(content, "text/html").body.textContent || ""
      : content;

    return splitParagraphs(text);
  }, [content, html]);

  function splitParagraphs(text, maxLen = 400) {
    const rawParagraphs = text
      .split(/\r?\n\s*\r?\n/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const result = [];

    rawParagraphs.forEach((para) => {
      if (para.length <= maxLen) {
        result.push(para);
      } else {
        const words = para.split(" ");
        let currentChunk = "";

        words.forEach((word) => {
          if ((currentChunk + " " + word).trim().length <= maxLen) {
            currentChunk = (currentChunk ? currentChunk + " " : "") + word;
          } else {
            if (currentChunk) result.push(currentChunk.trim());
            currentChunk = word;
          }
        });

        if (currentChunk) result.push(currentChunk.trim());
      }
    });

    return result;
  }

  const handleSpeech = (para) => {
    playTTS(para, 0);
    handleGetHeight();
  };

  const handleClick = () => {
    stopTTS();
    if (link) navigate(link);
    if (func) func();
  };

  if (children) {
    return (
      <div onMouseDown={() => !loading && handleSpeech(content)} onClick={handleClick} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div>
      {paragraphs.map((para, index) => {
        const isActive = activeText === para;

        return (
          <div ref={paraRef} key={index} className={clsx("mb-6 !p-0", html && "text-left")}>
            <button
              onMouseDown={() => !loading && handleSpeech(para)}
              onClick={handleClick}
              className={clsx("cursor-pointer transition-colors duration-200 relative", className, html && "text-left")}
              style={{
                backgroundColor: isActive ? "rgba(138, 43, 226, 0.1)" : "transparent",
                padding: "4px",
                borderRadius: "4px",
              }}
            >
              {/* {loading && activeText === para && height ? t("loading") : para} */}
              {para}
            </button>
            {isActive && audioDuration > 0 && (
              <motion.div
                layoutId="underline"
                className="h-1 bg-violet-500"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: audioDuration, ease: "linear" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TTSText;