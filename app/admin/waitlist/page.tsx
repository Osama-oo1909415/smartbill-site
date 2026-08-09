import { desc } from "drizzle-orm";
import { getDb } from "../../../db";
import { waitlistEntries } from "../../../db/schema";
import { requireWaitlistAdmin } from "../../lib/waitlist-admin";

export const dynamic = "force-dynamic";

export default async function WaitlistAdminPage() {
  const user = await requireWaitlistAdmin();
  const entries = await getDb().select().from(waitlistEntries).orderBy(desc(waitlistEntries.createdAt));
  return <main className="admin-page content-page"><style>{`.admin-table-wrap{padding-bottom:120px}.admin-table-card{padding:24px;border:1px solid var(--line);border-radius:28px;background:var(--surface);box-shadow:var(--shadow-1)}.admin-table-heading{display:flex;justify-content:space-between;gap:20px;margin-bottom:18px}.admin-table-heading span{color:var(--muted);font-size:14px}.admin-table-scroll{overflow-x:auto}.admin-table-scroll table{width:100%;border-collapse:collapse;min-width:620px}.admin-table-scroll th,.admin-table-scroll td{padding:15px 12px;text-align:start;border-bottom:1px solid var(--line);font-size:14px}.admin-table-scroll th{color:var(--muted);font-size:12px}.admin-table-scroll td:first-child{color:var(--primary);font-weight:700}`}</style><section className="page-hero shell"><span className="section-kicker">SmartBill Admin</span><h1>قائمة المسجلين</h1><p>المسجلون في الوصول المبكر، مرّتبون من الأحدث إلى الأقدم. الحساب الحالي: {user.email}</p></section><section className="admin-table-wrap shell"><div className="admin-table-card"><div className="admin-table-heading"><strong>{entries.length} مسجل</strong><span>البيانات لا تظهر للعامة</span></div><div className="admin-table-scroll"><table><thead><tr><th>#</th><th>البريد الإلكتروني</th><th>اللغة</th><th>تاريخ التسجيل</th></tr></thead><tbody>{entries.map((entry) => <tr key={entry.id}><td>{entry.id}</td><td dir="ltr">{entry.email}</td><td>{entry.language === "ar" ? "العربية" : "English"}</td><td dir="ltr">{entry.createdAt.toISOString()}</td></tr>)}</tbody></table></div></div></section></main>;
}
