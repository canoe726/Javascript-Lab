import { Language } from "@/app/layout";
import { i18nS } from "@/common/i18n/i18n.server";
import HomePageClient from "./pageClient";

export default function HomePage(props: { params: { lang: Language } }) {
  return (
    <main>
      <h1>{i18nS.t("")}</h1>

      <HomePageClient />
    </main>
  );
}
