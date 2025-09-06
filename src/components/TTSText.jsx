import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useTTSStore } from "../store/useTTSStore";
import { useTranslation } from "react-i18next";

const TTSText = ({ content, html = false }) => {
  const { playTTS, activeText, audioDuration, loading } = useTTSStore();
  const { t } = useTranslation();
  const paraRef = React.useRef(null);
  const [height, setHeight] = useState(0)

  const handleGetHeight = () => {
    if (paraRef.current) {
      const rect = paraRef.current.getBoundingClientRect();
      rect?.height && setHeight(rect?.height)
    }
  };

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

    // ორ ხაზზე დაშორებული პარაგრაფები
    const rawParagraphs = text
      .split(/\r?\n\s*\r?\n/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    return splitTextIntoChunks(rawParagraphs);
  }, [content, html]);

  function splitTextIntoChunks(rawParagraphs, maxLen = 500) {
    const abbreviations = [
      "e.g", "i.e", "etc", "mr", "mrs", "dr", "sr", "jr", "st",
      "a.m", "p.m", "vs", "etc", // დამატებითი ინგლისური
      "ა.შ", "ბმ", "გა" // ქართული
    ];

    // ამოწმებს არის თუ არა სიტყვა აბრევიატურა (მომავალი წერტილებით)
    function isAbbreviation(word) {
      const w = word.toLowerCase().replace(/[.!?]*$/, "");
      return abbreviations.some(abbr => abbr.toLowerCase() === w);
    }

    // ფუნქცია წინადადებების გაყოფისთვის
    function splitIntoSentences(text) {
      const sentences = [];
      let buffer = "";
      let tokens = text.match(/[^.!?]+[.!?]*|\s+/g) || [];

      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        buffer += token;

        // თუ ტოკენი სრულდება . ! ან ?
        if (/[.!?]/.test(token.trim().slice(-1))) {
          // ვეძებთ უკან სიტყვას, რომ შევამოწმოთ აბრევიატურა
          const words = buffer.trim().split(/\s+/);
          const lastWord = words[words.length - 1];

          if (!isAbbreviation(lastWord)) {
            sentences.push(buffer.trim());
            buffer = "";
          }
        }
      }
      if (buffer.trim()) sentences.push(buffer.trim());

      return sentences;
    }

    const result = [];
    let currentChunk = "";

    rawParagraphs.forEach((para) => {
      const sentences = splitIntoSentences(para);

      sentences.forEach((sentence) => {
        if (!sentence) return;

        const trimmedSentence = sentence.trim();

        // თუ შეგვიძლია დავამატოთ არსებული chunk-ში
        if ((currentChunk + " " + trimmedSentence).trim().length <= maxLen) {
          currentChunk = (currentChunk ? currentChunk + " " : "") + trimmedSentence;
        } else {
          if (currentChunk) {
            result.push(currentChunk.trim());
          }

          if (trimmedSentence.length > maxLen) {
            // ძალიან გრძელი წინადადების შემთხვევაში, სიტყვებად დავყოთ
            const words = trimmedSentence.split(" ");
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
            currentChunk = trimmedSentence;
          }
        }
      });
    });

    if (currentChunk) {
      result.push(currentChunk.trim());
    }

    return result;
  }

  const handleSpeech = (para) => {
    playTTS(para, 0);
    handleGetHeight()
  };

  return (
    <div>
      {paragraphs.map((para, index) => {
        const isActive = activeText === para;

        if (loading && activeText === para && height)
          return (
            <div 
              key={index} 
              className="mb-6"
              style={{
                background: "rgba(138, 43, 226, 0.1)",
                padding: "4px",
                borderRadius: "4px",
                height: height
              }}
            >
              {t("loading")}
            </div>
          );

        return (
          <div ref={paraRef} key={index} className="mb-6">
            <div
              onMouseDown={() => handleSpeech(para)}
              className="cursor-pointer transition-colors duration-200 relative"
              style={{
                backgroundColor: isActive ? "rgba(138, 43, 226, 0.1)" : "transparent",
                padding: "4px",
                borderRadius: "4px",
              }}
            >
              {para}
            </div>
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
