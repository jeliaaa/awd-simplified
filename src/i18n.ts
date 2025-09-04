import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from './locales/en.json';
import kaTranslation from './locales/ka.json';

// Configure i18n
i18n
  .use(LanguageDetector) // Use language detector
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      ka: {
        translation: kaTranslation,
      }
    },
    fallbackLng: 'en', // Default language
    debug: true, // Optional: For debugging language switching
    interpolation: {
      escapeValue: false, // React already escapes values to prevent XSS
    },
    detection: {
      // Custom detection options
      order: ['path', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['cookie'], // Cache the user's language preference
    },
  });


export const resources = {
  en: {
    translation: enTranslation,
  },
  ka: {
    translation: kaTranslation,
  }
}
export const defaultNS = enTranslation;

export default i18n;