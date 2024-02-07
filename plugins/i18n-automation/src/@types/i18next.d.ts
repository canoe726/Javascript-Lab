import Resources from "./resources";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: Resources["en"];
    };
  }
}
