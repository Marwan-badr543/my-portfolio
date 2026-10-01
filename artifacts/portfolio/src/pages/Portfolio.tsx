import { useState, useEffect, useRef } from "react";
import type { MouseEvent as ReactMouseEvent, ReactNode, ElementType } from "react";
import { translations } from "@/lib/i18n";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useScroll,
  useSpring,
} from "framer-motion";
import {
  Github,
  Linkedin,
  ExternalLink,
  Play,
  Menu,
  X,
  ChevronDown,
  Mail,
  MapPin,
  Code2,
  Database,
  Cpu,
  Plug,
  Calculator,
  BarChart2,
  Link2,
  MessageSquare,
  Briefcase,
  Calendar,
  FileText,
  Download,
  Eye,
  Wrench,
  ArrowRight,
  ArrowUpRight,
  Network,
  BookOpenText,
  Globe,
  Webhook,
  Sparkles,
  Clapperboard,
} from "lucide-react";
import {
  SiPython,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiLanggraph,
  SiLangchain,
  SiDjango,
  SiFastapi,
  SiPostgresql,
  SiMysql,
  SiMariadb,
  SiRedis,
  SiFrappe,
  SiOdoo,
  SiDocker,
  SiGit,
  SiGithub,
  SiQt,
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
} from "react-icons/si";

const EASE = [0.16, 1, 0.3, 1] as const;

// Brand icon + colour for every skill name (names come from i18n untouched)
const skillIcons: Record<string, { icon: ElementType; color: string }> = {
  Python: { icon: SiPython, color: "#3776AB" },
  JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
  HTML: { icon: SiHtml5, color: "#E34F26" },
  CSS: { icon: SiCss, color: "#2965F1" },
  LangGraph: { icon: SiLanggraph, color: "#7FC8FF" },
  LangChain: { icon: SiLangchain, color: "#1C9C7C" },
  "Tool Calling": { icon: Wrench, color: "#38BDF8" },
  "Multi-Agent Architecture": { icon: Network, color: "#818CF8" },
  RAG: { icon: BookOpenText, color: "#22D3EE" },
  Django: { icon: SiDjango, color: "#44B78B" },
  "Django REST Framework (DRF)": { icon: SiDjango, color: "#C93A3A" },
  FastAPI: { icon: SiFastapi, color: "#009688" },
  "RESTful APIs": { icon: Globe, color: "#38BDF8" },
  Webhooks: { icon: Webhook, color: "#F472B6" },
  PostgreSQL: { icon: SiPostgresql, color: "#4169E1" },
  MySQL: { icon: SiMysql, color: "#4479A1" },
  MariaDB: { icon: SiMariadb, color: "#C49A6C" },
  "Redis (Caching)": { icon: SiRedis, color: "#FF4438" },
  "Frappe Framework / ERPNext": { icon: SiFrappe, color: "#0089FF" },
  "Odoo Development": { icon: SiOdoo, color: "#A24689" },
  Docker: { icon: SiDocker, color: "#2496ED" },
  Git: { icon: SiGit, color: "#F05032" },
  GitHub: { icon: SiGithub, color: "#FFFFFF" },
  "Professional Financial Accounting (PFA)": { icon: Calculator, color: "#34D399" },
  PyQt5: { icon: SiQt, color: "#41CD52" },
  "Prompt Engineering": { icon: Sparkles, color: "#FBBF24" },
  "Technical Content Creation": { icon: Clapperboard, color: "#F87171" },
};

// Decorative, logo-only strip (no text)
const marqueeLogos: { icon: ElementType; color: string }[] = [
  { icon: SiPython, color: "#3776AB" },
  { icon: SiFastapi, color: "#009688" },
  { icon: SiLanggraph, color: "#7FC8FF" },
  { icon: SiLangchain, color: "#1C9C7C" },
  { icon: SiDjango, color: "#44B78B" },
  { icon: SiFrappe, color: "#0089FF" },
  { icon: SiOdoo, color: "#A24689" },
  { icon: SiPostgresql, color: "#4169E1" },
  { icon: SiRedis, color: "#FF4438" },
  { icon: SiMariadb, color: "#C49A6C" },
  { icon: SiDocker, color: "#2496ED" },
  { icon: SiReact, color: "#61DAFB" },
  { icon: SiTypescript, color: "#3178C6" },
  { icon: SiNextdotjs, color: "#FFFFFF" },
  { icon: SiTailwindcss, color: "#38BDF8" },
  { icon: SiJavascript, color: "#F7DF1E" },
  { icon: SiGit, color: "#F05032" },
  { icon: SiGithub, color: "#FFFFFF" },
];

function handleSpotlight(e: ReactMouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  el.style.setProperty("--my", `${e.clientY - rect.top}px`);
}

interface SectionHeadingProps {
  badge: string;
  title: string;
  subtitle: string;
  large?: boolean;
}

function SectionHeading({ badge, title, subtitle, large }: SectionHeadingProps) {
  return (
    <motion.div
      className="mb-14 max-w-3xl"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <div className="inline-flex items-center gap-2.5 mb-5 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.03]">
        <span className="eyebrow-dot" />
        <span className="text-[11px] font-mono text-zinc-300 tracking-[0.18em] uppercase">
          {badge}
        </span>
      </div>
      <h2 className="text-4xl sm:text-5xl font-semibold tracking-[-0.035em] leading-[1.05] mb-4 text-gradient">
        {title}
      </h2>
      <p className={`text-zinc-400 leading-relaxed ${large ? "text-lg" : "text-base sm:text-lg"}`}>
        {subtitle}
      </p>
    </motion.div>
  );
}

function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const t = translations.en;

  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 55%"],
  });
  const timelineScale = useSpring(timelineProgress, { stiffness: 120, damping: 30 });

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    document.documentElement.setAttribute("dir", "ltr");
    document.documentElement.setAttribute("lang", "en");
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["home", "about", "experience", "projects", "skills", "resume", "contact"];
    // A thin band around the viewport centre decides the active section,
    // so sections taller than the viewport are still detected.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  }

  const navItems = [
    { id: "home", label: t.nav.home },
    { id: "about", label: t.nav.about },
    { id: "experience", label: t.nav.experience },
    { id: "projects", label: t.nav.projects },
    { id: "skills", label: t.nav.skills },
    { id: "resume", label: t.nav.resume },
    { id: "contact", label: t.nav.contact },
  ];

  const iconMap: Record<string, ElementType> = {
    erp: Cpu,
    backend: Code2,
    integration: Plug,
    db: Database,
    calculator: Calculator,
    chart: BarChart2,
    bridge: Link2,
    tools: Wrench,
  };

  const headlineWords = "I Build Systems That Speak the ".split(" ").filter(Boolean);

  const iconLinkClass =
    "w-9 h-9 rounded-full border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/20 hover:bg-white/[0.06] transition-all duration-200";
  const ctaLinkClass =
    "group/cta inline-flex items-center gap-2 text-sm text-zinc-200 hover:text-cyan-300 font-medium transition-colors";

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-[#05060a] text-zinc-100 overflow-x-hidden">
        <div className="grain" aria-hidden />

        {/* Scroll progress */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[2px] z-[70] origin-left bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400"
          style={{ scaleX: progress }}
          aria-hidden
        />

        {/* NAV */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
          <div
            className={`mx-auto max-w-5xl flex items-center justify-between rounded-full ps-5 pe-2 h-14 transition-all duration-500 ${scrolled || mobileMenuOpen ? "nav-glass" : "border border-transparent"
              }`}
          >
            <button
              onClick={() => scrollTo("home")}
              className="font-mono text-base font-semibold tracking-wider text-white hover:text-cyan-300 transition-colors"
              data-testid="nav-logo"
            >
              MB<span className="text-cyan-400">.</span>
            </button>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const active = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`relative px-3.5 py-2 text-[13px] font-medium rounded-full transition-colors duration-300 ${active ? "text-white" : "text-zinc-400 hover:text-zinc-100"
                      }`}
                    data-testid={`nav-${item.id}`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/[0.08]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-colors"
              onClick={() => setMobileMenuOpen((v) => !v)}
              data-testid="btn-mobile-menu"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                className="md:hidden mx-auto max-w-5xl mt-2 nav-glass rounded-3xl p-2 flex flex-col"
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.25, ease: EASE }}
              >
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`text-[15px] px-4 py-3 rounded-2xl font-medium w-full text-left transition-colors ${activeSection === item.id
                        ? "text-white bg-white/[0.06]"
                        : "text-zinc-400 hover:text-white"
                      }`}
                    data-testid={`mobile-nav-${item.id}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* HERO */}
        <section
          id="home"
          className="relative min-h-[100svh] flex items-center pt-24 overflow-hidden"
          onMouseMove={handleSpotlight}
        >
          <div className="absolute inset-0 dot-grid" aria-hidden />
          <div className="aurora aurora-1" aria-hidden />
          <div className="aurora aurora-2" aria-hidden />
          <div className="aurora aurora-3" aria-hidden />
          <div
            className="absolute inset-0 pointer-events-none hidden md:block"
            style={{
              background:
                "radial-gradient(600px circle at var(--mx, 50%) var(--my, 40%), rgba(56,189,248,0.07), transparent 45%)",
            }}
            aria-hidden
          />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#05060a]" aria-hidden />

          <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 py-20">
            <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
              <motion.h1
                className="text-[3.25rem] leading-[1] sm:text-7xl lg:text-[6.5rem] font-semibold tracking-[-0.05em] mb-7 text-gradient pb-2"
                data-testid="hero-name"
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.1, ease: EASE }}
              >
                Marwan Badr
              </motion.h1>

              <motion.div
                className="inline-flex items-center gap-2.5 mb-8 ps-3 pe-4 py-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.8, ease: EASE }}
              >
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 status-dot" />
                <span className="text-[11px] font-mono text-emerald-300 tracking-[0.2em] uppercase">
                  {t.hero.badge}
                </span>
              </motion.div>

              <h2
                className="text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] leading-[1.15] mb-6"
                data-testid="hero-headline"
              >
                {headlineWords.map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block text-zinc-300"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + i * 0.06, duration: 0.7, ease: EASE }}
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
                <motion.span
                  className="inline-block text-accent-gradient"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + headlineWords.length * 0.06, duration: 0.8, ease: EASE }}
                >
                  Language of Business.
                </motion.span>
              </h2>

              <motion.p
                className="text-sm sm:text-base text-zinc-400 font-mono mb-6 tracking-tight"
                data-testid="hero-subheadline"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8, ease: EASE }}
              >
                {t.hero.subheadline}
              </motion.p>

              <motion.p
                className="text-zinc-400/90 max-w-2xl leading-relaxed mb-11 mx-auto text-[15px] sm:text-base"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8, ease: EASE }}
              >
                {t.hero.description}
              </motion.p>

              <motion.div
                className="flex flex-wrap justify-center gap-3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8, ease: EASE }}
              >
                <button
                  onClick={() => scrollTo("projects")}
                  className="btn-primary group px-7 py-3.5 text-sm"
                  data-testid="btn-hero-cta"
                >
                  <span className="relative">{t.hero.cta}</span>
                  <ArrowRight size={16} className="relative transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => scrollTo("contact")}
                  className="btn-ghost px-7 py-3.5 text-sm font-medium"
                  data-testid="btn-hero-contact"
                >
                  {t.hero.ctaContact}
                </button>
              </motion.div>
            </div>
          </div>

          <motion.button
            onClick={() => scrollTo("about")}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors"
            data-testid="btn-scroll-down"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
          >
            <span className="text-[11px] font-mono tracking-widest uppercase">{t.hero.scrollDown}</span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown size={16} />
            </motion.span>
          </motion.button>
        </section>

        {/* ACCOUNTANT EDGE */}
        <section id="about" className="py-28 sm:py-32 relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <SectionHeading badge={t.edge.badge} title={t.edge.title} subtitle={t.edge.subtitle} large />

            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
              <Reveal className="lg:col-span-3 space-y-6 text-zinc-300/90 leading-[1.8] text-[15px] sm:text-base" delay={0.05}>
                <p>{t.edge.p1}</p>
                <p>{t.edge.p2}</p>
                <p className="relative text-lg sm:text-xl font-medium text-white ps-5 py-1">
                  <span className="absolute start-0 top-0 bottom-0 w-[3px] rounded-full bg-gradient-to-b from-cyan-400 to-indigo-400" />
                  {t.edge.p3}
                </p>
              </Reveal>

              <Reveal className="lg:col-span-2" delay={0.15}>
                <div className="surface overflow-hidden lg:sticky lg:top-28">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f57]/80" />
                    <span className="w-3 h-3 rounded-full bg-[#febc2e]/80" />
                    <span className="w-3 h-3 rounded-full bg-[#28c840]/80" />
                  </div>
                  <div className="code-lines p-5 font-mono text-[13px] leading-7 text-zinc-500 overflow-x-auto">
                    <div className="text-zinc-500 italic">// Marwan's approach</div>
                    <div>
                      <span className="text-fuchsia-400">class</span>{" "}
                      <span className="text-amber-300">ERPSolutionArchitect</span>
                      <span className="text-zinc-400">:</span>
                    </div>
                    <div>
                      <span className="ps-4">
                        <span className="text-fuchsia-400">def </span>
                        <span className="text-sky-400">solve</span>
                        <span className="text-zinc-400">(self, problem):</span>
                      </span>
                    </div>
                    <div><span className="ps-8 inline-block text-zinc-300">understand_business_first()</span></div>
                    <div><span className="ps-8 inline-block text-zinc-300">identify_root_cause()</span></div>
                    <div><span className="ps-8 inline-block text-zinc-300">implement_solution()</span></div>
                    <div>
                      <span className="ps-8 inline-block text-cyan-300">return business_value</span>
                      <span className="caret" aria-hidden />
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-6"><div className="divider-glow" /></div>

        {/* EXPERIENCE */}
        <section id="experience" className="py-28 sm:py-32 relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <SectionHeading badge={t.experience.badge} title={t.experience.title} subtitle={t.experience.subtitle} large />

            <div ref={timelineRef} className="relative ms-2 sm:ms-4">
              <div className="absolute start-[7px] top-2 bottom-2 w-px bg-white/[0.08]" aria-hidden />
              <motion.div
                className="absolute start-[7px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-cyan-400 via-sky-400 to-indigo-400"
                style={{ scaleY: timelineScale }}
                aria-hidden
              />

              <div className="space-y-8 sm:space-y-10">
                {t.experience.items.map((item, i) => (
                  <motion.div
                    key={i}
                    className="relative ps-10 sm:ps-14 group"
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: EASE }}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute start-0 top-7 w-[15px] h-[15px] rounded-full bg-[#05060a] border border-cyan-400/70 flex items-center justify-center shadow-[0_0_16px_rgba(56,189,248,0.5)]">
                      <div className="w-[5px] h-[5px] rounded-full bg-cyan-300 group-hover:scale-150 transition-transform" />
                    </div>

                    <div
                      className="surface spotlight p-6 sm:p-8 group-hover:-translate-y-1"
                      onMouseMove={handleSpotlight}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-xl font-semibold tracking-tight text-white mb-2">
                            {item.role}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 text-sm text-cyan-300/90 font-medium">
                            <Briefcase size={14} className="text-zinc-500" />
                            <span>{item.company}</span>
                            <span className="text-zinc-700">•</span>
                            <span className="chip px-2.5 py-0.5 text-[11px]">
                              {item.location}
                            </span>
                          </div>
                        </div>
                        <div className="shrink-0 inline-flex items-center gap-2 text-xs font-mono text-zinc-400 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] sm:self-start w-fit">
                          <Calendar size={12} className="text-zinc-500" />
                          {item.period}
                        </div>
                      </div>
                      <p className="text-[15px] text-zinc-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-6"><div className="divider-glow" /></div>

        {/* PROJECTS */}
        <section id="projects" className="py-28 sm:py-32 relative">
          <div className="absolute inset-x-0 top-0 h-[600px] line-grid pointer-events-none" aria-hidden />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <SectionHeading badge={t.projects.badge} title={t.projects.title} subtitle={t.projects.subtitle} />

            <div className="grid lg:grid-cols-2 gap-5">
              {t.projects.items.map((project, pi) => {
                const featured = pi === 0;
                const p = project as typeof project & {
                  link?: string;
                  linkLabel?: string;
                  secondaryLink?: string;
                  secondaryLinkLabel?: string;
                  videoLink?: string;
                  videoLabel?: string;
                  date?: string;
                };
                return (
                  <motion.div
                    key={project.id}
                    className={`group surface spotlight flex flex-col p-6 sm:p-8 hover:-translate-y-1 ${featured ? "lg:col-span-2 bg-gradient-to-br from-sky-500/[0.06] via-transparent to-indigo-500/[0.05]" : ""
                      }`}
                    data-testid={`card-project-${project.id}`}
                    onMouseMove={handleSpotlight}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.8, delay: featured ? 0 : (pi % 2) * 0.08, ease: EASE }}
                  >
                    {featured && <div className="ring-glow" aria-hidden />}

                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-mono text-cyan-300 bg-cyan-400/[0.08] border border-cyan-400/20 px-2.5 py-1 rounded-full">
                          {project.tag}
                        </span>
                        {p.date && (
                          <span className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500 border border-white/[0.07] px-2.5 py-1 rounded-full">
                            <Calendar size={11} />
                            {p.date}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2 shrink-0">
                        {p.link && (
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={iconLinkClass}
                            data-testid={`link-project-${project.id}-external`}
                            title={p.linkLabel || "Link"}
                          >
                            {p.link.includes("github.com") ? <Github size={15} /> : <ArrowUpRight size={15} />}
                          </a>
                        )}
                        {p.secondaryLink && (
                          <a
                            href={p.secondaryLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={iconLinkClass}
                            data-testid={`link-project-${project.id}-secondary`}
                            title={p.secondaryLinkLabel || "GitHub Repo"}
                          >
                            <Github size={15} />
                          </a>
                        )}
                        {p.videoLink && (
                          <a
                            href={p.videoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={iconLinkClass}
                            data-testid={`link-project-${project.id}-video`}
                          >
                            <Play size={14} />
                          </a>
                        )}
                      </div>
                    </div>

                    <h3
                      className={`font-semibold tracking-tight text-white mb-3 transition-colors group-hover:text-cyan-100 ${featured ? "text-2xl sm:text-3xl tracking-[-0.02em]" : "text-xl"
                        }`}
                    >
                      {project.title}
                    </h3>
                    <p className={`text-zinc-400 leading-relaxed mb-6 ${featured ? "text-base max-w-4xl" : "text-[15px]"}`}>
                      {project.description}
                    </p>

                    <ul className={`mb-7 flex-1 gap-x-8 gap-y-3 ${featured ? "grid md:grid-cols-2" : "grid"}`}>
                      {project.highlights.map((h, hi) => (
                        <li key={hi} className="flex items-start gap-3 text-sm text-zinc-400 leading-relaxed">
                          <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-gradient-to-br from-cyan-300 to-indigo-400 shrink-0 shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tech.map((tech) => (
                        <span key={tech} className="chip text-[11px] px-2.5 py-1">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {(p.link || p.secondaryLink || p.videoLink) && (
                      <div className="flex flex-wrap gap-x-6 gap-y-3 pt-5 border-t border-white/[0.06]">
                        {p.link && (
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={ctaLinkClass}
                            data-testid={`link-project-${project.id}-cta`}
                          >
                            {p.link.includes("github.com") ? <Github size={15} /> : <ExternalLink size={15} />}
                            {p.linkLabel}
                            <ArrowUpRight size={14} className="opacity-50 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                          </a>
                        )}
                        {p.secondaryLink && (
                          <a
                            href={p.secondaryLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={ctaLinkClass}
                            data-testid={`link-project-${project.id}-secondary-cta`}
                          >
                            <Github size={15} />
                            {p.secondaryLinkLabel}
                            <ArrowUpRight size={14} className="opacity-50 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                          </a>
                        )}
                        {p.videoLink && (
                          <a
                            href={p.videoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={ctaLinkClass}
                            data-testid={`link-project-${project.id}-video-cta`}
                          >
                            <Play size={14} />
                            {p.videoLabel}
                            <ArrowUpRight size={14} className="opacity-50 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                          </a>
                        )}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="py-28 sm:py-32 relative bg-gradient-to-b from-transparent via-white/[0.015] to-transparent">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <SectionHeading badge={t.skills.badge} title={t.skills.title} subtitle={t.skills.subtitle} />

            <Reveal className="marquee overflow-hidden mb-12 py-2">
              <div className="marquee-track gap-4" aria-hidden>
                {[...marqueeLogos, ...marqueeLogos].map((logo, i) => {
                  const Logo = logo.icon;
                  return (
                    <div
                      key={i}
                      className="skill-row shrink-0"
                      style={{ ["--brand" as string]: logo.color }}
                    >
                      <div className="skill-icon w-14 h-14 rounded-2xl border border-white/[0.07] bg-white/[0.02] flex items-center justify-center">
                        <Logo size={24} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {t.skills.categories.map((cat, ci) => {
                const CatIcon = iconMap[cat.icon] || Cpu;
                return (
                  <motion.div
                    key={ci}
                    className="group surface spotlight p-6 overflow-hidden"
                    data-testid={`card-skill-category-${ci}`}
                    onMouseMove={handleSpotlight}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.7, delay: (ci % 3) * 0.08, ease: EASE }}
                  >
                    <CatIcon
                      size={140}
                      strokeWidth={1}
                      className="absolute -end-8 -top-8 text-white/[0.025] group-hover:text-cyan-300/[0.06] transition-colors duration-500 pointer-events-none"
                      aria-hidden
                    />
                    <div className="relative flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400/15 to-indigo-400/10 border border-cyan-300/20 flex items-center justify-center shadow-[0_0_20px_-6px_rgba(56,189,248,0.5)]">
                        <CatIcon size={17} className="text-cyan-300" />
                      </div>
                      <h3 className="font-semibold text-white text-[15px] tracking-tight">{cat.name}</h3>
                    </div>
                    <ul className="relative space-y-1">
                      {cat.items.map((item, ii) => {
                        const meta = skillIcons[item.name];
                        const SkillIcon = meta?.icon || Code2;
                        return (
                          <motion.li
                            key={ii}
                            className="skill-row skill-colored flex items-center gap-3 -mx-2 px-2 py-1.5 rounded-xl hover:bg-white/[0.03] transition-colors"
                            style={{ ["--brand" as string]: meta?.color }}
                            initial={{ opacity: 0, x: -8 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.15 + ii * 0.06, ease: EASE }}
                          >
                            <span className="skill-icon w-8 h-8 shrink-0 rounded-lg border border-white/[0.07] bg-white/[0.02] flex items-center justify-center">
                              <SkillIcon size={15} />
                            </span>
                            <span className="text-sm text-zinc-300">{item.name}</span>
                          </motion.li>
                        );
                      })}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* RESUME */}
        <section id="resume" className="py-28 sm:py-32 relative overflow-hidden">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] max-w-full h-[500px] rounded-full bg-sky-500/[0.05] blur-3xl pointer-events-none" aria-hidden />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
            <SectionHeading badge={t.resume.badge} title={t.resume.title} subtitle={t.resume.subtitle} large />

            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-start">
              {/* Left: PDF Preview (larger) */}
              <Reveal className="lg:col-span-2">
                <div className="surface overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="flex gap-1.5 shrink-0">
                        <span className="w-3 h-3 rounded-full bg-[#ff5f57]/80" />
                        <span className="w-3 h-3 rounded-full bg-[#febc2e]/80" />
                        <span className="w-3 h-3 rounded-full bg-[#28c840]/80" />
                      </div>
                      <span className="text-xs font-mono text-zinc-500 ms-3 truncate">Marwan_Badr_CV.pdf</span>
                    </div>
                    <a
                      href="/Marwan_Badr_CV.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/[0.08] hover:border-white/20"
                    >
                      <ExternalLink size={12} />
                      Open
                    </a>
                  </div>
                  <div className="relative h-[560px] sm:h-[800px]">
                    <iframe
                      src="/Marwan_Badr_CV.pdf"
                      className="w-full h-full border-0"
                      title="Marwan Badr CV Preview"
                      style={{ background: "#0b0d12" }}
                    />
                  </div>
                </div>
              </Reveal>

              {/* Right: Info card */}
              <Reveal className="lg:col-span-1 space-y-4 lg:sticky lg:top-28" delay={0.15}>
                <div className="surface spotlight p-7" onMouseMove={handleSpotlight}>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400/15 to-indigo-400/10 border border-cyan-300/20 flex items-center justify-center mb-6 shadow-[0_0_30px_-8px_rgba(56,189,248,0.6)]">
                    <FileText size={24} className="text-cyan-300" />
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight text-white mb-3">Marwan Badr</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-7">
                    {t.resume.description}
                  </p>

                  <div className="space-y-3">
                    <a
                      href="/Marwan_Badr_CV.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full px-5 py-3.5 text-sm"
                      data-testid="btn-view-resume"
                    >
                      <Eye size={17} className="relative" />
                      <span className="relative">{t.resume.viewBtn}</span>
                    </a>
                    <a
                      href="/Marwan_Badr_CV.pdf"
                      download="Marwan_Badr_CV.pdf"
                      className="btn-ghost w-full px-5 py-3.5 text-sm font-medium"
                      data-testid="btn-download-resume"
                    >
                      <Download size={17} />
                      {t.resume.downloadBtn}
                    </a>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-cyan-400/15 bg-cyan-400/[0.04]">
                  <div className="flex items-start gap-3">
                    <FileText size={16} className="text-cyan-300 mt-0.5 shrink-0" />
                    <p className="text-sm text-cyan-200/80">
                      PDF format · Compatible with all devices and ATS systems
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-28 sm:py-32 relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <SectionHeading badge={t.contact.badge} title={t.contact.title} subtitle={t.contact.subtitle} />

            <div className="grid lg:grid-cols-2 gap-5">
              <Reveal>
                <div className="surface overflow-hidden p-8 sm:p-10 h-full flex flex-col justify-between gap-10">
                  <div className="absolute -top-24 -start-24 w-72 h-72 rounded-full bg-sky-500/15 blur-3xl pointer-events-none" aria-hidden />
                  <div className="absolute -bottom-24 -end-16 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" aria-hidden />
                  <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" aria-hidden />
                  <div className="relative">
                    <h3 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] leading-tight text-gradient mb-5">
                      Let's build something great together.
                    </h3>
                    <p className="text-zinc-400 leading-relaxed">
                      {t.contact.subtitle_2}
                    </p>
                  </div>
                  <div className="relative flex items-start gap-3 p-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.05]">
                    <span className="mt-1.5 inline-block w-2 h-2 shrink-0 rounded-full bg-emerald-400 status-dot" />
                    <p className="text-sm text-emerald-200/90 font-medium">{t.contact.availability}</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="surface p-6 sm:p-8 h-full flex flex-col gap-6">
                  <div className="space-y-3">
                    <a
                      href="mailto:marwanbadr514@gmail.com"
                      className="group flex items-center gap-4 p-3 -m-0 rounded-2xl border border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all"
                    >
                      <div className="w-11 h-11 shrink-0 rounded-xl bg-cyan-400/10 border border-cyan-300/20 flex items-center justify-center">
                        <Mail size={17} className="text-cyan-300" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[11px] text-zinc-500 font-mono">// Email</div>
                        <span className="text-sm font-medium text-zinc-200 break-all">marwanbadr514@gmail.com</span>
                      </div>
                      <ArrowUpRight size={16} className="text-zinc-600 group-hover:text-white transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                    </a>

                    <a
                      href="https://wa.me/201007258086"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 p-3 rounded-2xl border border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all"
                    >
                      <div className="w-11 h-11 shrink-0 rounded-xl bg-emerald-400/10 border border-emerald-300/20 flex items-center justify-center">
                        <MessageSquare size={17} className="text-emerald-300" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[11px] text-zinc-500 font-mono">// WhatsApp</div>
                        <span className="text-sm font-medium text-zinc-200">+201007258086</span>
                      </div>
                      <ArrowUpRight size={16} className="text-zinc-600 group-hover:text-white transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                    </a>

                    <div className="flex items-center gap-4 p-3 rounded-2xl border border-white/[0.06] bg-white/[0.015]">
                      <div className="w-11 h-11 shrink-0 rounded-xl bg-indigo-400/10 border border-indigo-300/20 flex items-center justify-center">
                        <MapPin size={17} className="text-indigo-300" />
                      </div>
                      <div>
                        <div className="text-[11px] text-zinc-500 font-mono">// Location</div>
                        <span className="text-sm font-medium text-zinc-200">Egypt</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-auto border-t border-white/[0.06]">
                    <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-[0.2em] mb-4">
                      Find me on
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="https://github.com/Marwan-badr543"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost px-5 py-2.5 text-sm"
                        data-testid="link-github"
                      >
                        <Github size={16} />
                        {t.contact.links.github}
                      </a>
                      <a
                        href="https://linkedin.com/in/marwan-badr-4553a42bb"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost px-5 py-2.5 text-sm"
                        data-testid="link-linkedin"
                      >
                        <Linkedin size={16} />
                        {t.contact.links.linkedin}
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="relative border-t border-white/[0.06] py-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
            <div className="flex items-center gap-1">
              <span>{t.footer.built}</span>
              <span className="text-white font-semibold mx-1">Marwan Badr</span>
            </div>
            <div className="font-mono text-xs">
              © {new Date().getFullYear()} · {t.footer.rights}
            </div>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}
