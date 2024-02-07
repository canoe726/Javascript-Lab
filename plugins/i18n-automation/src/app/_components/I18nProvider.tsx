"use client";

import { i18nC, initI18nextConfig } from "@/common/i18n/i18n.client";
import { i18nS } from "@/common/i18n/i18n.server";
import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

export default function I18nProvider({
  children,
  lang: defaultLang,
}: PropsWithChildren & { lang: "en" | "ko" }) {
  const pathname = usePathname();
  const lang = pathname?.split("/")[1];
  const router = useRouter();

  initI18nextConfig(defaultLang);

  useEffect(() => {
    const setLanguage = async () => {
      await i18nC.changeLanguage(lang);
      await i18nS.changeLanguage(lang);

      router.refresh();
    };

    setLanguage();
  }, [router, lang]);

  return <>{children}</>;
}
