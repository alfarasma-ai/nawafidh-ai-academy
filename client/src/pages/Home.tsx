import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpLeft,
  BarChart3,
  BookOpen,
  Bot,
  BrainCircuit,
  Check,
  ChevronDown,
  CirclePlay,
  Clock3,
  Code2,
  GraduationCap,
  Layers3,
  Linkedin,
  Menu,
  MessageCircle,
  Mic2,
  MousePointer2,
  Play,
  Quote,
  Send,
  Sparkles,
  Star,
  Target,
  Twitter,
  Users,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

type Track = "الكل" | "للمبتدئين" | "متقدم" | "للمحترفين";

type Course = {
  id: string;
  title: string;
  description: string;
  track: Exclude<Track, "الكل">;
  duration: string;
  lessons: string;
  students: string;
  color: "purple" | "cyan" | "pink";
  icon: typeof BrainCircuit;
  level: string;
};

const courses: Course[] = [
  {
    id: "generative-ai",
    title: "هندسة الذكاء التوليدي",
    description: "ابنِ قدرات عملية في النماذج اللغوية، هندسة الأوامر، وتطبيقات الذكاء التي تصنع الفرق.",
    track: "للمحترفين",
    duration: "8 أسابيع",
    lessons: "32 درسًا",
    students: "2.4k",
    color: "purple",
    icon: Sparkles,
    level: "متوسط → متقدم",
  },
  {
    id: "python-ml",
    title: "Python للذكاء الاصطناعي",
    description: "من أول سطر كود إلى نموذج تعلم آلي يعمل بكفاءة ويحل مشكلة حقيقية.",
    track: "للمبتدئين",
    duration: "6 أسابيع",
    lessons: "24 درسًا",
    students: "4.8k",
    color: "cyan",
    icon: Code2,
    level: "مبتدئ",
  },
  {
    id: "ai-product",
    title: "منتجك المدعوم بالـ AI",
    description: "حوّل فكرتك إلى تجربة ذكية قابلة للإطلاق عبر منهجية واضحة وفريق من المرشدين.",
    track: "متقدم",
    duration: "10 أسابيع",
    lessons: "40 درسًا",
    students: "1.6k",
    color: "pink",
    icon: Layers3,
    level: "متقدم",
  },
  {
    id: "data-storytelling",
    title: "سرد البيانات الذكي",
    description: "استخدم البيانات والنماذج التنبؤية لتكتشف القصة التي لا تظهر في الأرقام.",
    track: "متقدم",
    duration: "5 أسابيع",
    lessons: "18 درسًا",
    students: "1.9k",
    color: "cyan",
    icon: BarChart3,
    level: "متوسط",
  },
  {
    id: "ai-automation",
    title: "أتمتة العملاء بالذكاء",
    description: "صمّم أنظمة ذكية تختصر وقت فريقك وتمنح العملاء تجربة أكثر سرعة وذكاء.",
    track: "للمحترفين",
    duration: "7 أسابيع",
    lessons: "28 درسًا",
    students: "980",
    color: "purple",
    icon: Bot,
    level: "متوسط → متقدم",
  },
  {
    id: "voice-ai",
    title: "بناء تجارب صوتية",
    description: "ابتكر مساعدًا صوتيًا يتحدث، يفهم، ويتعلم من السياق كما يفعل الإنسان.",
    track: "متقدم",
    duration: "4 أسابيع",
    lessons: "16 درسًا",
    students: "740",
    color: "pink",
    icon: Mic2,
    level: "متقدم",
  },
];

const faqs = [
  ["هل أحتاج إلى خبرة برمجية سابقة؟", "ليس بالضرورة. تبدأ مساراتنا من الصفر، وتجد داخل كل دورة خريطة واضحة لمتطلبات البداية والمهارات التي ستكتسبها."],
  ["كيف أختار المسار المناسب لي؟", "ابدأ باختبار المسار المجاني، أو تحدث مع فريق الإرشاد ليقترح عليك أقصر طريق يناسب هدفك ووقتك الحالي."],
  ["هل أحصل على شهادة بعد إكمال الدورة؟", "نعم، تحصل على شهادة رقمية موثقة ومشروع نهائي قابل للإضافة إلى ملفك المهني بعد اجتياز متطلبات المسار."],
  ["هل يمكنني الدراسة بجانب عملي؟", "صُممت التجربة لتناسب الجداول المزدحمة: دروس قصيرة، تسجيلات متاحة دائمًا، وخطة أسبوعية مرنة مع جلسات مباشرة اختيارية."],
];

const navItems = [
  ["اكتشف الأكاديمية", "about"],
  ["المسارات", "courses"],
  ["كيف نتعلم؟", "method"],
  ["آراء المتعلمين", "stories"],
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [activeTrack, setActiveTrack] = useState<Track>("الكل");
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(0);
  const [modalCourse, setModalCourse] = useState<Course | null>(null);
  const [showTop, setShowTop] = useState(false);
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 560);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filteredCourses = useMemo(
    () => activeTrack === "الكل" ? courses : courses.filter((course) => course.track === activeTrack),
    [activeTrack],
  );

  const handleJoin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setJoined(true);
    toast.success("تم التسجيل بنجاح", { description: "سنرسل لك اختبار المسار المجاني خلال دقائق." });
  };

  const openComingSoon = () => toast("هذه الميزة قادمة قريبًا", { description: "نحن نجهّز لك تجربة أكثر ذكاءً." });

  return (
    <div dir="rtl" className="min-h-screen overflow-x-hidden bg-[#05030e] text-white selection:bg-fuchsia-400/30 selection:text-fuchsia-100">
      <div className="aurora aurora-one" />
      <div className="aurora aurora-two" />
      <header className={`site-header ${showTop ? "site-header-scrolled" : ""}`}>
        <div className="container flex items-center justify-between gap-5 py-4">
          <button onClick={() => scrollToId("top")} className="brand-mark group" aria-label="العودة إلى الرئيسية">
            <span className="brand-orbit"><BrainCircuit size={20} strokeWidth={2.4} /></span>
            <span className="brand-name">نوافذ <b>AI</b></span>
          </button>
          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map(([label, id]) => (
              <button key={id} onClick={() => scrollToId(id)} className="nav-link">{label}</button>
            ))}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <button onClick={() => scrollToId("newsletter")} className="nav-login">تسجيل الدخول</button>
            <button onClick={() => scrollToId("courses")} className="button-primary nav-cta">ابدأ رحلتك <ArrowUpLeft size={16} /></button>
          </div>
          <button className="mobile-menu-button lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="فتح القائمة">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <div className="mobile-menu lg:hidden">
            {navItems.map(([label, id]) => <button key={id} onClick={() => { scrollToId(id); setMenuOpen(false); }}>{label}</button>)}
            <button className="button-primary mt-2 w-full" onClick={() => { scrollToId("courses"); setMenuOpen(false); }}>ابدأ رحلتك <ArrowUpLeft size={16} /></button>
          </div>
        )}
      </header>

      <main id="top">
        <section className="hero-section relative">
          <div className="hero-grid" />
          <div className="hero-image" aria-hidden="true" style={{ backgroundImage: `linear-gradient(90deg, rgba(5,3,14,.12) 0%, rgba(5,3,14,.28) 45%, #05030e 80%), url('${import.meta.env.BASE_URL}assets/nawafidh-ai-orbit.webp')` }} />
          <div className="container relative z-10 grid min-h-[710px] items-center gap-12 pb-20 pt-20 lg:grid-cols-[1.02fr_.98fr] lg:pt-28">
            <div className="hero-copy">
              <div className="eyebrow animate-in-up"><span className="eyebrow-dot" /> المستقبل لا ينتظر، اصنعه الآن</div>
              <h1 className="hero-title animate-in-up delay-1">تعلم الذكاء<br /><span className="gradient-text">الذي يصنع الفرق.</span></h1>
              <p className="hero-description animate-in-up delay-2">أكاديمية عربية للجيل القادم من صُنّاع التكنولوجيا. مسارات تطبيقية، مرشدون من قلب الصناعة، ومجتمع يرفعك إلى أبعد مما تتوقع.</p>
              <div className="hero-actions animate-in-up delay-3">
                <button className="button-primary button-large" onClick={() => scrollToId("courses")}>استكشف المسارات <ArrowLeft size={18} /></button>
                <button className="button-ghost button-large" onClick={() => scrollToId("method")}><span className="play-icon"><Play size={12} fill="currentColor" /></span> شاهد كيف نتعلم</button>
              </div>
              <div className="hero-proof animate-in-up delay-4">
                <div className="avatar-stack" aria-hidden="true"><span>س</span><span>م</span><span>ل</span><span>ر</span></div>
                <div><div className="stars"><Star size={14} fill="currentColor" /> <Star size={14} fill="currentColor" /> <Star size={14} fill="currentColor" /> <Star size={14} fill="currentColor" /> <Star size={14} fill="currentColor" /></div><span>انضم إلى +12,000 متعلم يغيّرون مستقبلهم</span></div>
              </div>
            </div>
            <div className="hero-visual-wrap" aria-hidden="true">
              <div className="orbit orbit-main"><span className="orbit-node node-a" /><span className="orbit-node node-b" /><span className="orbit-node node-c" /></div>
              <div className="hero-float-card float-card-top"><span className="float-icon cyan-icon"><Zap size={17} fill="currentColor" /></span><span><b>مهارة جديدة</b><small>تم فتحها الآن</small></span><Check size={17} className="text-cyan-300" /></div>
              <div className="hero-float-card float-card-bottom"><span className="mini-bars"><i /><i /><i /><i /><i /></span><span><b>تقدمك اليوم</b><small>+34% هذا الأسبوع</small></span><ArrowUpLeft size={18} className="text-fuchsia-300" /></div>
              <div className="hero-pill pill-left"><Target size={15} /> مشروع حقيقي</div>
              <div className="hero-pill pill-right"><Users size={15} /> مجتمعك الذكي</div>
            </div>
          </div>
          <div className="scroll-cue"><MousePointer2 size={15} /><span>اكتشف أكثر</span><div className="scroll-line" /></div>
        </section>

        <section className="signal-strip" id="about">
          <div className="container grid gap-8 py-7 sm:grid-cols-3">
            {[['12,000+', 'متعلم يطوّر مستقبله'], ['4.9 / 5', 'متوسط تقييم التجربة'], ['92%', 'يطبقون ما تعلموه']].map(([number, label]) => <div className="signal-item" key={label}><strong>{number}</strong><span>{label}</span></div>)}
          </div>
        </section>

        <section className="section-space relative" id="courses">
          <div className="container">
            <div className="section-heading-row">
              <div><div className="section-kicker">مكتبة المعرفة</div><h2 className="section-title">مسار واضح.<br /><span className="gradient-text">نتيجة ملموسة.</span></h2></div>
              <div className="section-heading-side"><p>لا نؤمن بالمحتوى المحشو. كل مسار هنا صُمم ليمنحك مهارة قابلة للاستخدام ومشروعًا يثبتها.</p><button className="text-link" onClick={openComingSoon}>تصفح جميع الدورات <ArrowLeft size={16} /></button></div>
            </div>
            <div className="filter-row" role="tablist" aria-label="فلترة الدورات">
              {(["الكل", "للمبتدئين", "متقدم", "للمحترفين"] as Track[]).map((track) => <button key={track} onClick={() => setActiveTrack(track)} className={`filter-pill ${activeTrack === track ? "active" : ""}`}>{track}</button>)}
              <span className="filter-count">{filteredCourses.length} مسارات متاحة</span>
            </div>
            <div className="course-grid">
              {filteredCourses.map((course, index) => {
                const Icon = course.icon;
                return <article className={`course-card card-${course.color}`} key={course.id} style={{ animationDelay: `${index * 50}ms` }}>
                  <div className="card-topline"><span className="course-icon"><Icon size={22} /></span><span className="course-level">{course.level}</span></div>
                  <h3>{course.title}</h3><p>{course.description}</p>
                  <div className="course-meta"><span><Clock3 size={14} /> {course.duration}</span><span><BookOpen size={14} /> {course.lessons}</span><span><Users size={14} /> {course.students}</span></div>
                  <button className="course-link" onClick={() => setModalCourse(course)}>اكتشف المسار <ArrowLeft size={16} /></button>
                </article>;
              })}
            </div>
          </div>
        </section>

        <section className="method-section section-space" id="method">
          <div className="container">
            <div className="method-panel">
              <div className="method-copy"><div className="section-kicker">منهجية نوافذ</div><h2 className="section-title">لا تكتفِ<br /><span className="gradient-text">بالمعرفة.</span></h2><p>تتغير التكنولوجيا كل يوم. لذلك صممنا تجربة لا تعلمك “ماذا”، بل تدربك على “كيف تفكر” لتبقى متقدمًا مهما تغيرت الأدوات.</p><button className="button-primary" onClick={() => scrollToId("newsletter")}>احجز مقعدك المجاني <ArrowUpLeft size={17} /></button></div>
              <div className="method-steps">
                {[['01', 'تعلّم بذكاء', 'محتوى مختصر وعميق، مبني على ما تحتاجه فعلًا.'], ['02', 'طبّق فورًا', 'مشاريع حقيقية تحوّل المفاهيم إلى خبرة تثق بها.'], ['03', 'تقدّم مع مجتمعك', 'مرشدون وأصدقاء يشاركونك الطريق ويحتفلون بإنجازك.']].map(([n, title, desc], index) => <div className="method-step" key={n}><span className="step-number">{n}</span><div><h3>{title}</h3><p>{desc}</p></div>{index === 0 ? <Sparkles className="step-art" size={23} /> : index === 1 ? <Zap className="step-art" size={23} /> : <Users className="step-art" size={23} />}</div>)}
              </div>
            </div>
          </div>
        </section>

        <section className="section-space stories-section" id="stories">
          <div className="container">
            <div className="section-heading-row compact"><div><div className="section-kicker">أصوات من المستقبل</div><h2 className="section-title">هم بدأوا من هنا.</h2></div><div className="stories-controls"><button onClick={openComingSoon} aria-label="القصة السابقة"><ArrowRight size={18} /></button><button onClick={openComingSoon} aria-label="القصة التالية"><ArrowLeft size={18} /></button></div></div>
            <div className="stories-grid">
              <article className="story-card story-featured"><Quote className="quote-mark" size={38} fill="currentColor" /><p>“في نوافذ، لم أتعلم كيف أستخدم أداة جديدة فقط. تعلمت كيف أرى الفرص التي لم أكن أراها من قبل.”</p><div className="story-person"><div className="person-avatar avatar-purple">ن</div><div><b>ندى الحربي</b><small>قائدة منتج — الرياض</small></div><span className="story-rating"><Star size={14} fill="currentColor" /> 5.0</span></div></article>
              <article className="story-card story-secondary"><div className="story-top"><span className="story-tag">من متعلمينا</span><span className="story-progress">+ 3.5x</span></div><p>“بعد مسار الذكاء التوليدي، أطلقت أول منتج جانبي لي ووصل إلى ١٠٠٠ مستخدم في شهره الأول.”</p><div className="story-person"><div className="person-avatar avatar-cyan">ع</div><div><b>عمر العتيبي</b><small>مؤسس — جدة</small></div></div></article>
              <div className="story-stat-card"><div className="stat-icon"><GraduationCap size={23} /></div><strong>+87%</strong><span>من متعلمينا<br />بدأوا مشروعًا جديدًا</span><div className="stat-sparkline"><i /><i /><i /><i /><i /><i /><i /></div></div>
            </div>
          </div>
        </section>

        <section className="faq-section section-space">
          <div className="container grid gap-14 lg:grid-cols-[.78fr_1.22fr]">
            <div><div className="section-kicker">أسئلة ذكية</div><h2 className="section-title">فضولك<br /><span className="gradient-text">له إجابة.</span></h2><p className="faq-intro">إذا لم تجد إجابتك هنا، فريقنا على بعد رسالة واحدة.</p><button onClick={openComingSoon} className="text-link">تحدث مع مرشد <MessageCircle size={16} /></button></div>
            <div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${faqOpen === index ? "open" : ""}`} key={question}><button onClick={() => setFaqOpen(faqOpen === index ? -1 : index)}><span>{question}</span><ChevronDown size={19} /></button>{faqOpen === index && <p>{answer}</p>}</div>)}</div>
          </div>
        </section>

        <section className="newsletter-section" id="newsletter">
          <div className="container"><div className="newsletter-card"><div className="newsletter-glow" /><div className="newsletter-content"><span className="newsletter-icon"><Send size={21} /></span><div><div className="section-kicker">خطوتك الأولى مجانية</div><h2>جاهز تفتح نافذتك؟</h2><p>اختبار قصير يساعدك على اختيار مسارك المثالي. بدون التزام، فقط وضوح أكثر.</p></div><form onSubmit={handleJoin} className="newsletter-form">{joined ? <div className="joined-state"><Check size={18} /> تم تسجيلك — تفقد بريدك الآن</div> : <><input aria-label="البريد الإلكتروني" type="email" placeholder="بريدك الإلكتروني" value={email} onChange={(event) => setEmail(event.target.value)} required /><button className="button-primary" type="submit">ابدأ الاختبار <ArrowUpLeft size={16} /></button></>}</form></div></div></div>
        </section>
      </main>

      <footer className="site-footer"><div className="container flex flex-col gap-8 py-10 lg:flex-row lg:items-center lg:justify-between"><div><button className="brand-mark" onClick={() => scrollToId("top")}><span className="brand-orbit"><BrainCircuit size={20} /></span><span className="brand-name">نوافذ <b>AI</b></span></button><p className="footer-note">نتعلم اليوم لنصنع غدًا أكثر ذكاءً.</p></div><div className="footer-links"><button onClick={() => scrollToId("courses")}>المسارات</button><button onClick={() => scrollToId("method")}>منهجيتنا</button><button onClick={() => scrollToId("stories")}>قصص المتعلمين</button><button onClick={openComingSoon}>تواصل معنا</button></div><div className="footer-socials"><button onClick={openComingSoon} aria-label="LinkedIn"><Linkedin size={17} /></button><button onClick={openComingSoon} aria-label="Twitter"><Twitter size={17} /></button><button onClick={openComingSoon} aria-label="البريد الإلكتروني"><Send size={17} /></button></div></div><div className="container footer-bottom"><span>© 2025 نوافذ AI — نصنع قادة المستقبل.</span><span>مصمم بشغف في المنطقة العربية</span></div></footer>

      {showTop && <button className="back-top" onClick={() => scrollToId("top")} aria-label="العودة للأعلى"><ArrowUpLeft size={18} /></button>}
      {modalCourse && <div className="modal-backdrop" onClick={() => setModalCourse(null)}><div className="course-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setModalCourse(null)} aria-label="إغلاق"><X size={18} /></button><div className={`course-icon modal-icon ${modalCourse.color}`}><modalCourse.icon size={25} /></div><span className="section-kicker">مسار نوافذ</span><h2>{modalCourse.title}</h2><p>{modalCourse.description}</p><div className="modal-details"><span><Clock3 size={15} /> {modalCourse.duration}</span><span><BookOpen size={15} /> {modalCourse.lessons}</span><span><Users size={15} /> {modalCourse.students} متعلم</span></div><button className="button-primary w-full" onClick={() => { setModalCourse(null); scrollToId("newsletter"); }}>أرسل لي تفاصيل المسار <ArrowUpLeft size={17} /></button></div></div>}
    </div>
  );
}
