import { llmsText } from "../llms-content";

export function GET() {
  return new Response(llmsText, { status: 200, headers: { "Content-Type": "text/markdown; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
