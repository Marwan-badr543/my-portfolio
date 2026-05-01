import { useState, useEffect, useRef } from "react";
import { translations, type Lang } from "@/lib/i18n";
import {
  Github,
  Linkedin,
  Youtube,
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
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

function useIntersectionObserver(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

interface SkillBarProps {
  name: string;
  level: number;
  isVisible: boolean;
  delay?: number;
}

function SkillBar({ name, level, isVisible, delay = 0 }: SkillBarProps) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm text-slate-300">{name}</span>
        <span className="text-xs text-cyan-400 font-mono">{level}%</span>
      </div>
      <div className="skill-bar">
        <div
          className="skill-bar-fill"
          style={{
            width: isVisible ? `${level}%` : "0%",
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [lang, setLang] = useState<Lang>("en");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    status: "idle" as "idle" | "sending" | "success" | "error",
  });

  const t = translations[lang];

  const skillsSection = useIntersectionObserver(0.2);

  useEffect(() => {
    document.documentElement.setAttribute("dir", t.dir);
    document.documentElement.setAttribute("lang", lang);
  }, [lang, t.dir]);

  useEffect(() => {
    const sections = ["home", "about", "skills", "projects", "contact"];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState((s) => ({ ...s, status: "sending" }));
    await new Promise((r) => setTimeout(r, 1500));
    setFormState((s) => ({ ...s, status: "success" }));
    setTimeout(() => {
      setFormState({ name: "", email: "", subject: "", message: "", status: "idle" });
    }, 4000);
  }

  const navItems = [
    { id: "home", label: t.nav.home },
    { id: "about", label: t.nav.about },
    { id: "skills", label: t.nav.skills },
    { id: "projects", label: t.nav.projects },
    { id: "contact", label: t.nav.contact },
  ];

  const iconMap: Record<string, React.ElementType> = {
    erp: Cpu,
    backend: Code2,
    integration: Plug,
    db: Database,
    calculator: Calculator,
    chart: BarChart2,
    bridge: Link2,
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 overflow-x-hidden">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800 bg-[#0f172a]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo("home")}
            className="font-mono text-cyan-400 text-lg font-bold tracking-wider hover:text-cyan-300 transition-colors"
            data-testid="nav-logo"
          >
            MB<span className="text-slate-500">.</span>
          </button>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`nav-link text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? "text-cyan-400"
                    : "text-slate-400 hover:text-slate-100"
                }`}
                data-testid={`nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => setLang((l) => (l === "en" ? "ar" : "en"))}
              className="ml-2 px-3 py-1 text-xs font-medium border border-cyan-500/40 text-cyan-400 rounded hover:bg-cyan-500/10 transition-colors font-mono"
              data-testid="btn-lang-toggle"
            >
              {t.nav.toggleLang}
            </button>
          </div>

          <button
            className="md:hidden text-slate-400 hover:text-slate-100"
            onClick={() => setMobileMenuOpen((v) => !v)}
            data-testid="btn-mobile-menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-[#0f172a] px-4 pb-4 pt-2 flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-sm py-2 font-medium w-full text-left ${
                  activeSection === item.id ? "text-cyan-400" : "text-slate-400"
                }`}
                data-testid={`mobile-nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                setLang((l) => (l === "en" ? "ar" : "en"));
                setMobileMenuOpen(false);
              }}
              className="text-sm text-cyan-400 py-2 font-mono w-full text-left"
              data-testid="mobile-btn-lang"
            >
              {t.nav.toggleLang}
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        id="home"
        className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      >
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f172a]" />
        <div className="absolute top-1/4 start-1/4 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 end-1/4 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-6 animate-fade-in-up">
              <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 status-dot" />
              <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
                {t.hero.badge}
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in-up animate-delay-100"
              data-testid="hero-headline"
            >
              {lang === "en" ? (
                <>
                  <span className="text-slate-100">I Build Systems That Speak the </span>
                  <span className="text-cyan-400 cyan-glow-text">Language of Business.</span>
                </>
              ) : (
                <>
                  <span className="text-slate-100">أبني أنظمة تتحدث </span>
                  <span className="text-cyan-400 cyan-glow-text">لغة الأعمال.</span>
                </>
              )}
            </h1>

            <p
              className="text-base sm:text-lg text-slate-400 font-mono mb-4 animate-fade-in-up animate-delay-200"
              data-testid="hero-subheadline"
            >
              {t.hero.subheadline}
            </p>

            <p className="text-slate-400 max-w-2xl leading-relaxed mb-10 animate-fade-in-up animate-delay-300">
              {t.hero.description}
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in-up animate-delay-400">
              <button
                onClick={() => scrollTo("projects")}
                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-[#0f172a] font-semibold rounded transition-all duration-200 cyan-glow hover:scale-105"
                data-testid="btn-hero-cta"
              >
                {t.hero.cta}
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="px-6 py-3 border border-slate-700 hover:border-cyan-500/60 text-slate-300 hover:text-cyan-400 font-medium rounded transition-all duration-200"
                data-testid="btn-hero-contact"
              >
                {t.hero.ctaContact}
              </button>
            </div>
          </div>

          <button
            onClick={() => scrollTo("about")}
            className="absolute bottom-8 start-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600 hover:text-slate-400 transition-colors animate-bounce"
            data-testid="btn-scroll-down"
            style={{ transform: lang === "ar" ? "translateX(50%)" : "translateX(-50%)" }}
          >
            <span className="text-xs font-mono">{t.hero.scrollDown}</span>
            <ChevronDown size={16} />
          </button>
        </div>
      </section>

      {/* ACCOUNTANT EDGE */}
      <section id="about" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-3">
              <div className="section-line" />
              <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
                {t.edge.badge}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">{t.edge.title}</h2>
            <p className="text-slate-400 text-lg">{t.edge.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-5 text-slate-300 leading-relaxed">
              <p>{t.edge.p1}</p>
              <p>{t.edge.p2}</p>
              <p className="text-cyan-400 font-semibold text-lg border-s-2 border-cyan-500 ps-4">
                {t.edge.p3}
              </p>

              <div className="mt-8 p-4 rounded border border-slate-700/50 bg-slate-800/30 font-mono text-xs text-slate-500">
                <div className="text-cyan-400 mb-2">// Marwan's approach</div>
                <div>
                  <span className="text-purple-400">class</span>{" "}
                  <span className="text-yellow-300">ERPSolutionArchitect</span>:
                </div>
                <div className="ps-4">
                  <span className="text-slate-400">def </span>
                  <span className="text-blue-400">solve</span>
                  <span className="text-slate-400">(self, problem):</span>
                </div>
                <div className="ps-8 text-slate-500">
                  understand_business_first()
                </div>
                <div className="ps-8 text-slate-500">identify_root_cause()</div>
                <div className="ps-8 text-slate-500">implement_solution()</div>
                <div className="ps-8 text-cyan-400">return business_value</div>
              </div>
            </div>

            <div className="grid gap-4">
              {t.edge.pillars.map((pillar, i) => {
                const Icon = iconMap[pillar.icon] || Cpu;
                return (
                  <div
                    key={i}
                    className="p-5 rounded border border-slate-700/50 bg-slate-800/30 card-hover group"
                    data-testid={`card-pillar-${i}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 w-10 h-10 rounded bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                        <Icon size={18} className="text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-100 mb-1">{pillar.title}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">{pillar.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-24 bg-slate-900/40" ref={skillsSection.ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-3">
              <div className="section-line" />
              <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
                {t.skills.badge}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">{t.skills.title}</h2>
            <p className="text-slate-400">{t.skills.subtitle}</p>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {t.skills.categories.map((cat, ci) => {
              const CatIcon = iconMap[cat.icon] || Cpu;
              return (
                <div
                  key={ci}
                  className="p-5 rounded border border-slate-700/50 bg-slate-800/30 card-hover"
                  data-testid={`card-skill-category-${ci}`}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                      <CatIcon size={15} className="text-cyan-400" />
                    </div>
                    <h3 className="font-semibold text-slate-100 text-sm">{cat.name}</h3>
                  </div>
                  {cat.items.map((item, ii) => (
                    <SkillBar
                      key={ii}
                      name={item.name}
                      level={item.level}
                      isVisible={skillsSection.isVisible}
                      delay={ci * 100 + ii * 80}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-3">
              <div className="section-line" />
              <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
                {t.projects.badge}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">{t.projects.title}</h2>
            <p className="text-slate-400">{t.projects.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {t.projects.items.map((project, pi) => (
              <div
                key={project.id}
                className="group p-6 rounded border border-slate-700/50 bg-slate-800/30 card-hover flex flex-col"
                data-testid={`card-project-${project.id}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-1 rounded">
                    {project.tag}
                  </span>
                  <div className="flex gap-2">
                    {"link" in project && project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded border border-slate-700 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                        data-testid={`link-project-${project.id}-external`}
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                    {"videoLink" in project && project.videoLink && (
                      <a
                        href={project.videoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded border border-slate-700 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                        data-testid={`link-project-${project.id}-video`}
                      >
                        <Play size={14} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-100 mb-3 group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-5">{project.description}</p>

                <ul className="mb-6 space-y-1.5 flex-1">
                  {project.highlights.map((h, hi) => (
                    <li key={hi} className="flex items-start gap-2 text-sm text-slate-400">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-0.5 bg-slate-900/60 border border-slate-700 rounded font-mono text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  {"link" in project && project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                      data-testid={`link-project-${project.id}-cta`}
                    >
                      <ExternalLink size={14} />
                      {(project as { linkLabel?: string }).linkLabel}
                    </a>
                  )}
                  {"videoLink" in project && project.videoLink && (
                    <a
                      href={project.videoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                      data-testid={`link-project-${project.id}-video-cta`}
                    >
                      <Play size={14} />
                      {(project as { videoLabel?: string }).videoLabel}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-3">
              <div className="section-line" />
              <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
                {t.contact.badge}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">{t.contact.title}</h2>
            <p className="text-slate-400">{t.contact.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <form onSubmit={handleSubmit} className="space-y-4" data-testid="contact-form">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5">{t.contact.form.name}</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                    placeholder={t.contact.form.placeholder.name}
                    className="w-full px-3 py-2.5 bg-slate-800/50 border border-slate-700 rounded text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-colors text-sm"
                    data-testid="input-contact-name"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5">{t.contact.form.email}</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                    placeholder={t.contact.form.placeholder.email}
                    className="w-full px-3 py-2.5 bg-slate-800/50 border border-slate-700 rounded text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-colors text-sm"
                    data-testid="input-contact-email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1.5">{t.contact.form.subject}</label>
                <input
                  type="text"
                  required
                  value={formState.subject}
                  onChange={(e) => setFormState((s) => ({ ...s, subject: e.target.value }))}
                  placeholder={t.contact.form.placeholder.subject}
                  className="w-full px-3 py-2.5 bg-slate-800/50 border border-slate-700 rounded text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-colors text-sm"
                  data-testid="input-contact-subject"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1.5">{t.contact.form.message}</label>
                <textarea
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                  placeholder={t.contact.form.placeholder.message}
                  className="w-full px-3 py-2.5 bg-slate-800/50 border border-slate-700 rounded text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-colors text-sm resize-none"
                  data-testid="textarea-contact-message"
                />
              </div>

              {formState.status === "success" && (
                <div className="flex items-center gap-2 text-green-400 text-sm p-3 bg-green-500/10 border border-green-500/20 rounded" data-testid="msg-contact-success">
                  <CheckCircle size={16} />
                  {t.contact.form.success}
                </div>
              )}

              {formState.status === "error" && (
                <div className="flex items-center gap-2 text-red-400 text-sm p-3 bg-red-500/10 border border-red-500/20 rounded" data-testid="msg-contact-error">
                  <AlertCircle size={16} />
                  {t.contact.form.error}
                </div>
              )}

              <button
                type="submit"
                disabled={formState.status === "sending"}
                className="flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-60 disabled:cursor-not-allowed text-[#0f172a] font-semibold rounded transition-all duration-200 cyan-glow hover:scale-105"
                data-testid="btn-contact-submit"
              >
                <Send size={16} />
                {formState.status === "sending" ? t.contact.form.sending : t.contact.form.send}
              </button>
            </form>

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-400">
                  <div className="w-8 h-8 rounded bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    <Mail size={14} className="text-cyan-400" />
                  </div>
                  <span className="text-sm">marwan.badr@email.com</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <div className="w-8 h-8 rounded bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    <MapPin size={14} className="text-cyan-400" />
                  </div>
                  <span className="text-sm">Egypt · Remote Available</span>
                </div>
              </div>

              <div>
                <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">
                  {lang === "en" ? "Find me on" : "تجدني على"}
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://github.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 border border-slate-700 hover:border-cyan-500/40 rounded text-slate-400 hover:text-cyan-400 transition-all duration-200 text-sm"
                    data-testid="link-github"
                  >
                    <Github size={16} />
                    {t.contact.links.github}
                  </a>
                  <a
                    href="https://linkedin.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 border border-slate-700 hover:border-cyan-500/40 rounded text-slate-400 hover:text-cyan-400 transition-all duration-200 text-sm"
                    data-testid="link-linkedin"
                  >
                    <Linkedin size={16} />
                    {t.contact.links.linkedin}
                  </a>
                  <a
                    href="https://youtube.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 border border-slate-700 hover:border-cyan-500/40 rounded text-slate-400 hover:text-cyan-400 transition-all duration-200 text-sm"
                    data-testid="link-youtube"
                  >
                    <Youtube size={16} />
                    {t.contact.links.youtube}
                  </a>
                </div>
              </div>

              <div className="p-4 rounded border border-cyan-500/20 bg-cyan-500/5">
                <p className="text-sm text-cyan-400 font-medium">{t.contact.availability}</p>
              </div>

              <div className="p-4 rounded border border-slate-700/50 bg-slate-800/30">
                <p className="text-xs font-mono text-slate-500 mb-2">// Quick Stats</p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: lang === "en" ? "ERP Implementations" : "تطبيقات ERP", value: "15+" },
                    { label: lang === "en" ? "Integrations Built" : "تكاملات منجزة", value: "20+" },
                    { label: lang === "en" ? "Years Experience" : "سنوات خبرة", value: "5+" },
                    { label: lang === "en" ? "Uptime SLA" : "معدل التشغيل", value: "99.9%" },
                  ].map((stat, si) => (
                    <div key={si} data-testid={`stat-${si}`}>
                      <div className="text-xl font-bold text-cyan-400 font-mono">{stat.value}</div>
                      <div className="text-xs text-slate-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-1">
            <span>{t.footer.built}</span>
            <span className="text-cyan-400 font-semibold mx-1">Marwan Badr</span>
          </div>
          <div className="font-mono">
            © {new Date().getFullYear()} · {t.footer.rights}
          </div>
        </div>
      </footer>
    </div>
  );
}
