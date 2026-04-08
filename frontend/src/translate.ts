import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";

import es from "./lang/es.json";
import en from "./lang/en.json";
import cat from "./lang/cat.json";

export const translator = i18n
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
      en: { translation: en },
      cat: { tranlatin: cat },
    },
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
  });
