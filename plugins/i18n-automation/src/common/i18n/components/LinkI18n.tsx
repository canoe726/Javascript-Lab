"use client";

import Link, { LinkProps } from "next/link";
import { HTMLAttributes } from "react";
import { i18nC } from "../i18n.client";

export default function LinkI18n(
  props: LinkProps & HTMLAttributes<HTMLAnchorElement>
) {
  const lang = i18nC.language;

  return <Link {...props} href={`/${lang}${props.href}`} />;
}
