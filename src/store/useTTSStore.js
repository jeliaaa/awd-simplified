// store/ttsStore.ts
import { create } from "zustand";
import axios from "axios";
import i18n from "../i18n";

export const useTTSStore = create((set, get) => ({
  loading: false,
  audio: null,
  activeText: null,
  audioDuration: 0, // in seconds

  playTTS: async (text, voiceSpeed = 0) => {
    const { audio } = get();

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    set({ loading: true, activeText: text, audioDuration: 0 });

    try {
      const voiceID = i18n.language === "en" ? "en-US" : "ka-GE";

      const response = await axios.post(
        "https://ttsfree.com/api/v1/tts",
        {
          text,
          voiceService: "servicebin",
          voiceID,
          voiceSpeed: voiceSpeed.toString(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_TTS_API_KEY,
          },
        }
      );

      const base64Audio = response.data.audioData;
      const audioUrl = `data:audio/mpeg;base64,${base64Audio}`;
      const newAudio = new Audio(audioUrl);

      // Set duration after metadata is loaded
      newAudio.onloadedmetadata = () => {
        set({ audioDuration: newAudio.duration });
      };

      set({ audio: newAudio, loading: false });

      newAudio.play();

      newAudio.onended = () => {
        set({ loading: false, audio: null, activeText: null, audioDuration: 0 });
      };
    } catch (error) {
      console.error("TTS Error:", error);
      set({ loading: false });
    }
  },

  stop: () => {
    const { audio } = get();
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      set({ audio: null, loading: false, activeText: null, audioDuration: 0 });
    }
  },
}));
