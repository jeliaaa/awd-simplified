import React, { useEffect, useRef, useState } from "react";
import i18n from "i18next";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

const DefTexts = ({ fileGe, fileEn, className, label = "Play Sound", link }) => {
    const audioRef = useRef(null);
    const navigate = useNavigate();
    const [isPlaying, setIsPlaying] = useState(false);
    const [file, setFile] = useState(fileEn);

    useEffect(() => {
        if (i18n.language === "ka") {
            setFile(fileGe)
        } else {
            setFile(fileEn)
        }
    }, [fileEn, fileGe])

    const handlePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
            if(link){
                navigate(link)
            }
        } else {
            audioRef.current.play();
            setIsPlaying(true);
            audioRef.current.onended = () => {
                setIsPlaying(false);
            };
        }
    };

    return (
        <div className="flex items-center space-x-2">
            <button
                onClick={handlePlay}
                className={clsx(
                    "px-4 py-2 rounded-xl text-white font-medium transition-all duration-200",
                    isPlaying ? "bg-red-500 hover:bg-red-600" : "bg-violet-500 hover:bg-violet-600",
                    className
                )}
            >
                {isPlaying ? "Stop" : label}
            </button>
            <audio ref={audioRef} src={file} preload="auto" />
        </div>
    );
};

export default DefTexts;
