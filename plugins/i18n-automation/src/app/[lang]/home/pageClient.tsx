"use client";

import { i18nC } from "@/common/i18n/i18n.client";
import { useI18n } from "@/common/i18n/i18n.utils";

export default function HomePageClient() {
  console.log("render homepage client : ", i18nC.language);
  const { changeLanguage } = useI18n();

  return (
    <main>
      <div>------------------------</div>
      <h1>{i18nC.t("")}</h1>

      <h1>{i18nC.t("")}</h1>

      <h1>{i18nC.t("", { count: 12 })}</h1>

      <br />

      <button
        onClick={() => {
          const language = i18nC.language === "en" ? "ko" : "en";

          changeLanguage(language, "/home");
        }}
      >
        언어 변경
      </button>
    </main>
  );
}
