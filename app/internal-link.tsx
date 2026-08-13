"use client";

import type { AnchorHTMLAttributes } from "react";
import { localizedPath } from "./locale";
import { useSitePreferences } from "./site-preferences";

type InternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

/**
 * Use the browser's native navigation for internal links.
 * This keeps links reliable inside the Sites embedded preview as well as in a
 * normal browser, where framework-level client navigation may be unavailable.
 */
export default function InternalLink({ href, children, ...props }: InternalLinkProps) {
  const { lang } = useSitePreferences();
  return <a href={localizedPath(href, lang)} {...props}>{children}</a>;
}
