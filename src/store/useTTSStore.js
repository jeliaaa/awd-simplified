// store/ttsStore.ts
import { create } from "zustand";
import axios from "axios";
import i18n from "../i18n";

export const useTTSStore = create((set) => ({
  loading: false,

  playTTS: async (text, voiceSpeed = 0) => {
    const API_KEY = import.meta.env.VITE_TTS_API_KEY;
    set({ loading: true });

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
            apikey: API_KEY,
          },
        }
      );

      const base64Audio = response.data.audioData;
      const audioUrl = `data:audio/mpeg;base64,${base64Audio}`;

      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error("TTS Error:", error);
    } finally {
      set({ loading: false });
    }
  },
}));
