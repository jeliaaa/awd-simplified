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

    let text = html ? new DOMParser().parseFromString(content, "text/html").body.textContent || "" : content;

    const rawParagraphs = text
      .split(/\r?\n\s*\r?\n/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    return splitTextIntoChunks(rawParagraphs);
  }, [content, html]);

  function splitTextIntoChunks(rawParagraphs, maxLen = 500) {
    const abbreviations = ["e.g", "i.e", "etc", "mr", "mrs", "dr", "sr", "jr", "st", "a.m", "p.m", "vs", "ა.შ", "ბმ", "გა"];

    const isAbbreviation = (word) => abbreviations.some(abbr => abbr.toLowerCase() === word.toLowerCase().replace(/[.!?]*$/, ""));

    const splitIntoSentences = (text) => {
      const sentences = [];
      let buffer = "";
      const tokens = text.match(/[^.!?]+[.!?]*|\s+/g) || [];

      for (let token of tokens) {
        buffer += token;
        if (/[.!?]/.test(token.trim().slice(-1))) {
          const words = buffer.trim().split(/\s+/);
          if (!isAbbreviation(words[words.length - 1])) {
            sentences.push(buffer.trim());
            buffer = "";
          }
        }
      }
      if (buffer.trim()) sentences.push(buffer.trim());
      return sentences;
    };

    const result = [];
    let currentChunk = "";

    rawParagraphs.forEach((para) => {
      const sentences = splitIntoSentences(para);
      sentences.forEach((sentence) => {
        const trimmed = sentence.trim();
        if (!trimmed) return;

        if ((currentChunk + " " + trimmed).trim().length <= maxLen) {
          currentChunk = (currentChunk ? currentChunk + " " : "") + trimmed;
        } else {
          if (currentChunk) result.push(currentChunk.trim());
          if (trimmed.length > maxLen) {
            const words = trimmed.split(" ");
            let temp = "";
            words.forEach((word) => {
              if ((temp + " " + word).trim().length <= maxLen) {
                temp = (temp ? temp + " " : "") + word;
              } else {
                if (temp) result.push(temp.trim());
                temp = word;
              }
            });
            if (temp) result.push(temp.trim());
            currentChunk = "";
          } else {
            currentChunk = trimmed;
          }
        }
      });
    });
    if (currentChunk) result.push(currentChunk.trim());
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
          <div ref={paraRef} key={index} className="mb-6">
            <button
              onMouseDown={() => !loading && handleSpeech(para)}
              onClick={handleClick}
              className={clsx("cursor-pointer transition-colors duration-200 relative", className)}
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