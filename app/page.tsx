const features = [
  {
    number: "01",
    eyebrow: "OCR على الجهاز",
    title: "فاتورة مصوّرة، معاملة جاهزة",
    description:
      "وجّه الكاميرا نحو الفاتورة أو البطاقة، ودع SmartBill يستخرج المتجر والمبلغ والتاريخ والبنود لتراجعها قبل الحفظ.",
    visual: "scan",
  },
  {
    number: "02",
    eyebrow: "مساعد مالي مدمج",
    title: "اسأل مصروفاتك، لا جدولاً معقداً",
    description:
      "راجع إنفاقك بلغة طبيعية، افهم تغيّر العادات، واحصل على إجابات مرتبطة ببياناتك المالية الفعلية.",
    visual: "assistant",
  },
  {
    number: "03",
    eyebrow: "Local-first",
    title: "بياناتك تبقى أقرب إليك",
    description:
      "يبدأ SmartBill من جهازك: خزنة محلية مشفّرة، وتحكّم واضح في ما تحفظه وما تزامنه.",
    visual: "privacy",
  },
  {
    number: "04",
    eyebrow: "تقارير واضحة",
    title: "الصورة الكاملة، من دون ضوضاء",
    description:
      "تابع الاتجاهات والميزانيات والفئات برسوم بسيطة تساعدك على اتخاذ قرار أسرع وأهدأ.",
    visual: "reports",
  },
] as const;

function FeatureVisual({ type }: { type: (typeof features)[number]["visual"] }) {
  if (type === "scan") {
    return (
      <div className="feature-visual scan-visual" aria-hidden="true">
        <div className="receipt-paper">
          <span className="receipt-head" />
          <span />
          <span />
          <span className="receipt-short" />
          <b>268.80</b>
        </div>
        <div className="scan-corners"><i /><i /><i /><i /></div>
        <div className="scan-beam" />
        <div className="accuracy-pill">دقة 98%</div>
      </div>
    );
  }

  if (type === "assistant") {
    return (
      <div className="feature-visual assistant-visual" aria-hidden="true">
        <div className="assistant-orb"><span /><span /><span /></div>
        <div className="chat-line question">أين زاد إنفاقي؟</div>
        <div className="chat-line answer">
          <i /> المطاعم أعلى بـ 12%
        </div>
      </div>
    );
  }

  if (type === "privacy") {
    return (
      <div className="feature-visual privacy-visual" aria-hidden="true">
        <div className="device-vault">
          <div className="lock-shackle" />
          <div className="lock-body"><i /></div>
          <span>على جهازك</span>
        </div>
        <div className="local-dot dot-one" />
        <div className="local-dot dot-two" />
        <div className="local-dot dot-three" />
      </div>
    );
  }

  return (
    <div className="feature-visual reports-visual" aria-hidden="true">
      <div className="mini-bars">
        <i style={{ height: "34%" }} />
        <i style={{ height: "58%" }} />
        <i style={{ height: "47%" }} />
        <i style={{ height: "82%" }} />
        <i style={{ height: "68%" }} />
      </div>
      <div className="report-badge"><b>−12%</b><span>هذا الشهر</span></div>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <section className="hero" id="top">
        <nav className="nav shell" aria-label="التنقل الرئيسي">
          <a className="brand" href="#top" aria-label="SmartBill — الصفحة الرئيسية">
            <img src="/app-icon.png" alt="" width="44" height="44" />
            <span><b>SmartBill</b><small>سمارت بِل</small></span>
          </a>
          <div className="nav-links">
            <a href="#features">المزايا</a>
            <a href="#privacy">الخصوصية</a>
            <a className="nav-cta" href="#download">حمّل التطبيق</a>
          </div>
        </nav>

        <div className="hero-grid shell">
          <div className="hero-copy">
            <div className="eyebrow-pill"><span /> إدارة مالية تبدأ من جهازك</div>
            <h1>مصروفاتك أوضح.<br /><em>وخصوصيتك لك.</em></h1>
            <p className="hero-lead">
              SmartBill يحوّل فواتيرك إلى صورة مالية مفهومة — بمسح ذكي،
              مساعد مدمج، وتقارير هادئة تساعدك على القرار.
            </p>
            <div className="hero-actions">
              <a className="button primary-button" href="#download">
                <span>حمّل SmartBill</span><i aria-hidden="true">←</i>
              </a>
              <a className="button secondary-button" href="#features">استكشف المزايا</a>
            </div>
            <div className="hero-notes" aria-label="أهم مزايا الخصوصية">
              <span><i>✓</i> قراءة محلية للفواتير</span>
              <span><i>✓</i> تحكّم كامل قبل الحفظ</span>
            </div>
          </div>

          <div className="hero-product" aria-label="معاينة شاشة تطبيق SmartBill">
            <div className="product-halo halo-one" />
            <div className="product-halo halo-two" />
            <div className="floating-note note-security"><i>✓</i><span>محفوظ محلياً<small>Local-first</small></span></div>
            <div className="floating-note note-ocr"><b>98%</b><span>دقة القراءة<small>OCR</small></span></div>
            <div className="phone">
              <div className="phone-frame">
                <div className="phone-notch" />
                <div className="phone-screen">
                  <div className="phone-status"><b>9:41</b><span>● ◒ 〽</span></div>
                  <div className="app-head">
                    <div><small>مساء الخير،</small><b>أحمد 👋</b></div>
                    <div className="app-avatar">أ</div>
                  </div>
                  <div className="balance-card">
                    <small>إجمالي الرصيد</small>
                    <strong>24,750 <i>ر.ق</i></strong>
                    <div className="balance-stats">
                      <span><i className="income-dot" />الدخل<b>+15,200</b></span>
                      <span><i className="spent-dot" />المصروف<b>−8,420</b></span>
                    </div>
                  </div>
                  <div className="overview-head"><b>نظرة سريعة</b><small>يوليو 2026</small></div>
                  <div className="overview-card">
                    <div className="spend-ring"><span><small>أنفقت</small><b>8,420</b></span></div>
                    <div className="category-list">
                      <span><i className="cat-blue" /><b>التسوق</b><small>26%</small></span>
                      <span><i className="cat-green" /><b>الطعام</b><small>19%</small></span>
                      <span><i className="cat-purple" /><b>الفواتير</b><small>17%</small></span>
                    </div>
                  </div>
                  <div className="overview-head recent-head"><b>أحدث المعاملات</b><small>عرض الكل</small></div>
                  <div className="transaction-row">
                    <div className="tx-icon">ج</div><span><b>مكتبة جرير</b><small>تسوق · اليوم</small></span><strong>−268.80</strong>
                  </div>
                  <div className="transaction-row">
                    <div className="tx-icon green">ك</div><span><b>كارفور</b><small>طعام · أمس</small></span><strong>−215.00</strong>
                  </div>
                  <div className="app-dock"><i>⌂</i><i>⇄</i><button aria-label="المسح الضوئي">⌗</button><i>▥</i><i>●</i></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-bottom shell">
          <span>مسح ذكي</span><i /> <span>مساعد مدمج</span><i /> <span>تقارير مفهومة</span><i /> <span>خصوصية أولاً</span>
        </div>
      </section>

      <section className="features-section" id="features">
        <div className="shell">
          <div className="section-heading">
            <div><span className="section-kicker">كل ما تحتاجه، بلا تعقيد</span><h2>أربع أدوات.<br />صورة مالية واحدة.</h2></div>
            <p>من لحظة تصوير الفاتورة حتى فهم اتجاهات الإنفاق، يعمل كل جزء في SmartBill ليقلّل الخطوات ويزيد وضوح القرار.</p>
          </div>
          <div className="features-grid">
            {features.map((feature) => (
              <article className={`feature-card card-${feature.visual}`} key={feature.number}>
                <div className="feature-meta"><span>{feature.eyebrow}</span><b>{feature.number}</b></div>
                <FeatureVisual type={feature.visual} />
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="privacy-section" id="privacy">
        <div className="privacy-grid shell">
          <div className="privacy-copy">
            <span className="section-kicker light-kicker">الخصوصية ليست إعداداً إضافياً</span>
            <h2>ذكاء مالي<br />لا يطلب منك التنازل.</h2>
            <p>بنية Local-first تعني أن تجربتك تبدأ من خزنة مشفّرة على جهازك. أنت تراجع البيانات المستخرجة، وأنت تقرر متى تحفظ أو تزامن.</p>
            <div className="privacy-points">
              <span><i>01</i><b>المعالجة قريبة</b><small>قراءة الفاتورة والمساعدة المالية على الجهاز.</small></span>
              <span><i>02</i><b>القرار واضح</b><small>لا تعديل مالي من دون مراجعتك وموافقتك.</small></span>
              <span><i>03</i><b>المزامنة باختيارك</b><small>تحكّم في النسخ الآمن بين أجهزتك.</small></span>
            </div>
          </div>
          <div className="privacy-art" aria-hidden="true">
            <div className="vault-ring ring-outer"><span>بياناتك</span></div>
            <div className="vault-ring ring-middle" />
            <div className="vault-core"><div className="lock-shackle" /><div className="lock-body"><i /></div><b>Local-first</b><small>خزنة مشفّرة</small></div>
            <span className="orbit-label orbit-ocr">OCR</span>
            <span className="orbit-label orbit-ai">AI</span>
            <span className="orbit-label orbit-sync">SYNC</span>
          </div>
        </div>
      </section>

      <section className="download-section" id="download">
        <div className="download-card shell">
          <div className="download-copy">
            <span className="section-kicker light-kicker">الخطوة التالية أوضح</span>
            <h2>ابدأ بعلاقة أهدأ<br />مع أموالك.</h2>
            <p>SmartBill قادم إلى iPhone وAndroid. كن من أوائل من يجرّبون إدارة مالية أذكى وأكثر خصوصية.</p>
            <div className="store-buttons">
              <a href="#top" className="store-button" aria-label="Google Play — قريباً">
                <span className="store-mark play-mark">▶</span><span><small>قريباً على</small><b>Google Play</b></span>
              </a>
              <a href="#top" className="store-button" aria-label="App Store — قريباً">
                <span className="store-mark apple-mark">●</span><span><small>قريباً على</small><b>App Store</b></span>
              </a>
            </div>
          </div>
          <div className="download-brand">
            <img src="/app-icon.png" alt="أيقونة تطبيق SmartBill" width="132" height="132" />
            <span>SmartBill</span><small>وضوح أكثر. ضوضاء أقل.</small>
          </div>
        </div>
      </section>

      <footer className="footer shell">
        <a className="brand footer-brand" href="#top">
          <img src="/app-icon.png" alt="" width="36" height="36" />
          <span><b>SmartBill</b><small>سمارت بِل</small></span>
        </a>
        <p>© 2026 SmartBill. صُمّم لخصوصيتك ووضوحك المالي.</p>
        <a href="#top" className="back-top">إلى الأعلى ↑</a>
      </footer>
    </main>
  );
}
