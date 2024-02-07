import { Language } from "@/app/layout";
import { cache } from "react";
import EnDictionary from "./lang/en/en.json";
import KoDictionary from "./lang/ko/ko.json";

export const defaultLng = "en";
export const defaultNS = "translation";
export const resources = cache(() => ({
  en: {
    translation: EnDictionary,
  },
  ko: {
    translation: KoDictionary,
  },
}));

export const i18nInit = (lng?: Language) => ({
  lng: lng ?? defaultLng,
  defaultNS,
  resources: resources(),
  interpolation: {
    escapeValue: false,
    prefix: "%{",
    suffix: "}",
  },
});

/**
 * @description
 * 개발용 다국어 함수 입니다.
 */
export const i18nDev = {
  t: (input: string) => input,
};
