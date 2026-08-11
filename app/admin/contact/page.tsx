import { desc } from "drizzle-orm";
import { getDb } from "../../../db";
import { contactMessages } from "../../../db/schema";
import { requireWaitlistAdmin } from "../../lib/waitlist-admin";

export const dynamic = "force-dynamic";

function replyHref(name: string, email: string, topic: string): string {
  const subject = `Re: ${topic.replace(/[\r\n]+/g, " ")}`;
  const body = `Hi ${name},\n\n`;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default async function ContactAdminPage() {
  await requireWaitlistAdmin();
  const messages = await getDb().select().from(contactMessages).orderBy(desc(contactMessages.createdAt));

  return <main className="admin-page content-page">
    <section className="page-hero shell admin-hero">
      <span className="section-kicker">SmartBill Admin</span>
      <h1>Contact inbox</h1>
      <p>Messages from the public contact form are saved here. Select Reply to open your email app with the sender already addressed.</p>
    </section>
    <section className="admin-contact-list shell" aria-label="Contact messages">
      <div className="admin-contact-heading"><strong>{messages.length} {messages.length === 1 ? "message" : "messages"}</strong><a href="/admin/waitlist">Open waitlist</a></div>
      {messages.length ? messages.map((entry) => <article className={`admin-contact-card ${entry.status === "closed" ? "is-closed" : ""}`} key={entry.id}>
        <div className="admin-contact-card-header">
          <div><h2>{entry.topic}</h2><p className="admin-contact-meta"><strong>{entry.name}</strong><a href={`mailto:${entry.email}`}>{entry.email}</a></p></div>
          <span className={`admin-contact-status ${entry.status}`}>{entry.status === "new" ? "New" : "Closed"}</span>
        </div>
        <p className="admin-contact-message" dir={entry.language === "ar" ? "rtl" : "ltr"}>{entry.message}</p>
        <div className="admin-contact-footer"><time dateTime={entry.createdAt.toISOString()}>{entry.createdAt.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}</time><a className="admin-reply-link" href={replyHref(entry.name, entry.email, entry.topic)}>Reply to {entry.name}</a></div>
      </article>) : <div className="admin-empty-state"><h2>No messages yet</h2><p>New contact form submissions will appear here.</p></div>}
    </section>
  </main>;
}
