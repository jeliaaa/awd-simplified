// store/ttsStore.ts
import { create } from "zustand";
import axios from "axios";
import i18n from "../i18n";


export const useTTSStore = create((set, get) => {
  const cleanupAudio = (audio) => {
    if (!audio) return;
    try {
      audio.pause();
      audio.currentTime = 0;
      audio.src = "";
      audio.load();
    } catch {}
  };

  return {
    loading: false,
    audio: null,
    activeText: null,
    audioDuration: 0,
    abortController: null,

    playTTS: async (text, voiceSpeed = 0) => {
      const { audio, abortController } = get();

      if (abortController) {
        abortController.abort();
        set({ abortController: null });
      }

      cleanupAudio(audio);
      set({ loading: true, activeText: text, audio: null, audioDuration: 0 });

      const controller = new AbortController();
      set({ abortController: controller });

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
            signal: controller.signal,
          }
        );

        set({ abortController: null });

        const audioUrl = `data:audio/mpeg;base64,${response.data.audioData}`;
        const newAudio = new Audio(audioUrl);

        newAudio.addEventListener(
          "loadedmetadata",
          () => set({ audioDuration: newAudio.duration || 0 }),
          { once: true }
        );

        newAudio.addEventListener(
          "ended",
          () => {
            cleanupAudio(newAudio);
            set({ loading: false, audio: null, activeText: null, audioDuration: 0 });
          },
          { once: true }
        );

        set({ audio: newAudio, loading: false });
        await newAudio.play().catch((err) => console.error("TTS play error:", err));
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("TTS request cancelled");
        } else {
          console.error("TTS Error:", error);
        }
        cleanupAudio(get().audio);
        set({ loading: false, audio: null, activeText: null, audioDuration: 0, abortController: null });
      }
    },

    stop: () => {
      const { audio, abortController } = get();
      if (abortController) abortController.abort();
      cleanupAudio(audio);
      set({ audio: null, loading: false, activeText: null, audioDuration: 0, abortController: null });
    },

    stopTTS: () => get().stop(),
  };
});
