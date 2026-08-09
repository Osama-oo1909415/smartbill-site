import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

export default function WaitlistLoginPage() {
  return <main className="admin-page content-page"><style>{`.admin-login-card{max-width:560px;margin:0 auto 120px;padding:28px;border:1px solid var(--line);border-radius:28px;background:var(--surface);box-shadow:var(--shadow-1)}.admin-login-form{display:grid;gap:14px;margin-top:22px}.admin-login-form label{font-weight:700}.admin-login-form input{padding:14px 16px;border:1px solid var(--line);border-radius:14px;font:inherit}.admin-login-form p{margin:4px 0 0;color:var(--muted);font-size:14px}`}</style><section className="page-hero shell"><span className="section-kicker">SmartBill Admin</span><h1>دخول لوحة المسجلين</h1><p>أدخل بريد الإدارة، وسنرسل رابطاً آمناً للدخول إلى القائمة.</p></section><section className="shell"><div className="admin-login-card"><LoginForm /></div></section></main>;
}
