"use client";

import { useRouter } from "next/navigation";

// export const I18nServer = {
//   changeLanguage: () => {},
// };

export const useI18n = () => {
  const router = useRouter();

  const changeLanguage = (language: string, pathname: string) => {
    router.push(`/${language}${pathname}`);
    router.refresh();
  };

  return {
    changeLanguage,
  };
};
