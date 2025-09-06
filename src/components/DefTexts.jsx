import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";


const AudioText = ({
    fileEn,      // mp3 file from assets
    fileGe,
    link,
    func,
    content,   // the text to display
    className,
    children = null
}) => {
    const navigate = useNavigate();
    const paraRef = useRef(null);
    const audioRef = useRef(null);

    const [activeText, setActiveText] = useState(null);
    const [audioDuration, setAudioDuration] = useState(0);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(fileEn);
    const { t } = useTranslation();
    // eslint-disable-next-line no-unused-vars
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (i18next.language === "en") {
            setFile(fileEn);
        } else {
            setFile(fileGe);
        }
    }, [fileEn, fileGe]);

    const handleGetHeight = () => {
        if (paraRef.current) {
            const rect = paraRef.current.getBoundingClientRect();
            rect.height && setHeight(rect.height);
        }
    };

    const handlePlay = (para) => {
        if (!audioRef.current) return;

        if (activeText === para) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setActiveText(null);
            return;
        }

        audioRef.current.currentTime = 0;
        setLoading(true);
        audioRef.current.play()
            .then(() => {
                setActiveText(para);
                setLoading(false);
                handleGetHeight();
            })
            .catch(() => setLoading(false));

        audioRef.current.onloadedmetadata = () => {
            setAudioDuration(audioRef.current.duration);
        };

        audioRef.current.onended = () => {
            setActiveText(null);
        };
    };

    const handleClick = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setActiveText(null);
        }
        if (link) navigate(link);
        if (func) func();
    };

    if (children) {
        return (
            <div
                onMouseDown={() => !loading && handlePlay(content)}
                onClick={handleClick}
                className={className}
            >
                {children}
                <audio ref={audioRef} src={file} preload="auto" />
            </div>
        );
    }

    return (
        <div>
            <div ref={paraRef} className="mb-6">
                <button
                    onMouseDown={() => !loading && handlePlay(content)}
                    onClick={handleClick}
                    className={clsx(
                        "cursor-pointer transition-colors duration-200 relative",
                        className
                    )}
                    style={{
                        backgroundColor: activeText === content ? "rgba(138, 43, 226, 0.1)" : "transparent",
                        padding: "4px",
                        borderRadius: "4px",
                    }}
                >
                    {t(`${content}`)}
                </button>

                {activeText === content && audioDuration > 0 && (
                    <motion.div
                        layoutId="underline"
                        className="h-1 bg-violet-500"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: audioDuration, ease: "linear" }}
                    />
                )}

                <audio ref={audioRef} src={file} preload="auto" />
            </div>
        </div>
    );
};

export default AudioText;
