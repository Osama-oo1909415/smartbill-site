import { llmsFullText } from "../llms-content";

export function GET() {
  return new Response(llmsFullText, { status: 200, headers: { "Content-Type": "text/markdown; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
