import { SITE_URL } from "./locale";

const link = (path: string) => `${SITE_URL}${path}`;

export const llmsText = `# SmartBill

> SmartBill is a privacy-first personal finance app that helps people capture receipts, review editable drafts, and understand spending through clear reports. Local processing, explicit review, Arabic RTL, and English support are central product principles.

## Product

- [SmartBill home](${link("/en")}) — Product overview, early-access status, and the Capture → Review → Understand flow.
- [About SmartBill](${link("/en/about")}) — Product principles, current availability, and project context.
- [FAQ](${link("/en/faq")}) — Answers about local OCR, privacy, sync, the assistant, and availability.

## Trust and privacy

- [Privacy policy](${link("/en/privacy-policy")}) — Current data handling, retention, deletion, and optional sync details.
- [Terms of use](${link("/en/terms")}) — Current product boundaries and use terms.
- [Contact SmartBill](${link("/en/contact")}) — Questions about early access, data requests, privacy, or technical support.

## Guides

- [Audience response systems](${link("/en/guides/audience-response-systems")}) — A practical editable guide to participation, privacy, accessibility, and responsible interpretation.

## Language versions

- [Arabic home](${link("/ar")}) — Arabic RTL product overview.
- [English home](${link("/en")}) — English product overview.
`;

export const llmsFullText = `# SmartBill — full site summary

## What SmartBill is

SmartBill is a mobile personal-finance app in early access. It is designed for people who want a clearer view of everyday spending without handing every financial detail to a general-purpose AI service. The product flow is Capture → Review → Understand: receipt information is extracted, shown as an editable draft, and then used in reports or bounded assistant responses after the user decides what to save.

## Current product status

SmartBill is not yet available in Google Play or the App Store. The public waitlist provides launch and status updates only; it does not promise an invite date, discount, or beta access. The product site describes current behavior and avoids invented usage numbers or testimonials.

## Privacy model

Receipt reading and local calculations are intended to stay on the device. Sign-in, optional backup or sync, and Gmail import are separate choices rather than prerequisites for the basic local workflow. Extracted values remain reviewable before they become saved transactions. Visitors should read the [privacy policy](${link("/en/privacy-policy")}) for the current implementation and retention details.

## Main pages

### Home

The [home page](${link("/en")}) explains the product, shows a real app view alongside clearly labeled flow illustrations, and provides the early-access waitlist. The page supports Arabic RTL at [${link("/ar")}].

### About

The [About page](${link("/en/about")}) explains the device-first, user-controlled, bilingual design approach and states what is and is not available during early access.

### FAQ

The [FAQ](${link("/en/faq")}) answers whether the app is available, whether scanning needs an account, whether receipt images are uploaded for OCR, how sync works, whether the assistant is financial advice, and how Arabic and English are supported.

### Contact

The [Contact page](${link("/en/contact")}) accepts questions about early access, privacy, data, and technical issues. It asks visitors not to submit passwords, card numbers, or sensitive financial details.

## Editorial guide

The [Audience response systems guide](${link("/en/guides/audience-response-systems")}) is an editable draft about live polls, feedback loops, question design, privacy, accessibility, result interpretation, and implementation checklists. It is informational and should be reviewed before final publication.
`;
