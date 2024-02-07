import { i18nS } from "@/common/i18n/i18n.server";
import { redirect } from "next/navigation";

export default function Home() {
  return redirect(`/${i18nS.language}`);
}
