import type { AnchorHTMLAttributes } from "react";

type InternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

/**
 * Use the browser's native navigation for internal links.
 * This keeps links reliable inside the Sites embedded preview as well as in a
 * normal browser, where framework-level client navigation may be unavailable.
 */
export default function InternalLink({ href, children, ...props }: InternalLinkProps) {
  return <a href={href} {...props}>{children}</a>;
}
