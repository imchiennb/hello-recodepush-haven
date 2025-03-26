
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import enCommon from './locales/en/common.json';
import viCommon from './locales/vi/common.json';
import jaCommon from './locales/ja/common.json';
import zhCommon from './locales/zh/common.json';

// Define language code mapping for URL path segments
export const supportedLanguages = {
  en: 'English',
  vi: 'Vietnamese',
  ja: 'Japanese',
  zh: 'Chinese',
};

// Setup i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
      },
      vi: {
        common: viCommon,
      },
      ja: {
        common: jaCommon,
      },
      zh: {
        common: zhCommon,
      },
    },
    fallbackLng: 'en',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ['path', 'navigator', 'htmlTag'],
      lookupFromPathIndex: 0,
      caches: ['localStorage'],
    },
  });

// Function to get and format current language
export const getCurrentLanguageCode = () => {
  return i18n.language.split('-')[0]; // Handle cases like 'en-US' -> 'en'
};

// Function to get language name from code
export const getLanguageName = (code: string) => {
  return supportedLanguages[code as keyof typeof supportedLanguages] || 'Unknown';
};

export default i18n;
