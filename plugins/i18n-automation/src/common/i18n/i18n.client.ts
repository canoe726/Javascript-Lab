import { Language } from "@/app/layout";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { i18nInit } from "./i18nInit";

const initI18nextConfig = (language?: Language) => {
  i18next.use(initReactI18next).init(i18nInit(language ?? "en"));
};

export { i18next as i18nC, initI18nextConfig };
