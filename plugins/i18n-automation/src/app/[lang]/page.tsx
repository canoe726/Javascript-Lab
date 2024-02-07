"use client";

import LinkI18n from "@/common/i18n/components/LinkI18n";
import { i18nC } from "@/common/i18n/i18n.client";
import { useI18n } from "@/common/i18n/i18n.utils";
import { i18nDev } from "@/common/i18n/i18nInit";

export default function MainPage() {
  const { changeLanguage } = useI18n();

  return (
    <main className="flex flex-col">
      <h1>{i18nC.t("안녕하세요2")}</h1>

      <LinkI18n href={"/home"}>
        {i18nC.t("만료 %{days}", {
          days: "456",
        })}
      </LinkI18n>

      {i18nDev.t("안녕")}

      {i18nC.t("%{count} 번째", {
        count: 0,
      })}
      {i18nC.t("%{count} 번째", {
        count: 12,
      })}

      <button
        className="bg-slate-400"
        onClick={() => {
          const language = i18nC.language === "en" ? "ko" : "en";

          changeLanguage(language, "/");
        }}
      >
        {i18nC.t("안녕하세요2")}
      </button>
    </main>
  );
}
