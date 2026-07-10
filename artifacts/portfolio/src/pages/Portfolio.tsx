import { useState, useEffect, useRef } from "react";
import { translations } from "@/lib/i18n";
import { motion } from "framer-motion";
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
  MessageSquare,
  Briefcase,
  Calendar,
  FileText,
  Download,
  Eye,
  Wrench,
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
  isVisible: boolean;
  delay?: number;
}

function SkillBar({ name, isVisible, delay = 0 }: SkillBarProps) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span className="text-sm text-slate-300">{name}</span>
      </div>
      <div className="skill-bar">
        <div
          className="skill-bar-fill"
          style={{
            width: isVisible ? "100%" : "0%",
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const t = translations.en;

  const skillsSection = useIntersectionObserver(0.2);

  useEffect(() => {
    document.documentElement.setAttribute("dir", "ltr");
    document.documentElement.setAttribute("lang", "en");
  }, []);

  useEffect(() => {
    const sections = ["home", "about", "experience", "skills", "projects", "resume", "contact"];
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



  const navItems = [
    { id: "home", label: t.nav.home },
    { id: "about", label: t.nav.about },
    { id: "experience", label: t.nav.experience },
    { id: "skills", label: t.nav.skills },
    { id: "projects", label: t.nav.projects },
    { id: "resume", label: t.nav.resume },
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
    tools: Wrench,
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
                className={`nav-link text-sm font-medium transition-colors ${activeSection === item.id
                    ? "text-cyan-400"
                    : "text-slate-400 hover:text-slate-100"
                  }`}
                data-testid={`nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
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
                className={`text-sm py-2 font-medium w-full text-left ${activeSection === item.id ? "text-cyan-400" : "text-slate-400"
                  }`}
                data-testid={`mobile-nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
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
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">

            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4 text-slate-100"
              data-testid="hero-name"
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Marwan Badr
            </motion.h1>

            <motion.div
              className="flex items-center justify-center gap-2 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 status-dot" />
              <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
                {t.hero.badge}
              </span>
            </motion.div>

            <motion.h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-6"
              data-testid="hero-headline"
              initial={{ opacity: 0, scale: 0.95, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            >
              <span className="text-slate-300">I Build Systems That Speak the </span>
              <span className="text-cyan-400 cyan-glow-text">Language of Business.</span>
            </motion.h2>

            <motion.p
              className="text-base sm:text-lg text-slate-400 font-mono mb-4"
              data-testid="hero-subheadline"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {t.hero.subheadline}
            </motion.p>

            <motion.p
              className="text-slate-400 max-w-2xl leading-relaxed mb-10 mx-auto"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {t.hero.description}
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
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
            </motion.div>
          </div>

          <button
            onClick={() => scrollTo("about")}
            className="absolute bottom-8 start-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600 hover:text-slate-400 transition-colors animate-bounce"
            data-testid="btn-scroll-down"
            style={{ transform: "translateX(-50%)" }}
          >
            <span className="text-xs font-mono">{t.hero.scrollDown}</span>
            <ChevronDown size={16} />
          </button>
        </div>
      </section>

      {/* ACCOUNTANT EDGE */}
      <section id="about" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="section-line" />
              <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
                {t.edge.badge}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">{t.edge.title}</h2>
            <p className="text-slate-400 text-lg">{t.edge.subtitle}</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              className="space-y-5 text-slate-300 leading-relaxed"
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
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
            </motion.div>

            <div className="grid gap-4">
              {t.edge.pillars.map((pillar, i) => {
                const Icon = iconMap[pillar.icon] || Cpu;
                return (
                  <motion.div
                    key={i}
                    className="p-5 rounded border border-slate-700/50 bg-slate-800/30 card-hover group"
                    data-testid={`card-pillar-${i}`}
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: i * 0.2 }}
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
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-3">
              <div className="section-line" />
              <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
                {t.experience.badge}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">{t.experience.title}</h2>
            <p className="text-slate-400 text-lg">{t.experience.subtitle}</p>
          </div>

          <div className="relative border-s border-slate-700/60 ml-4 sm:ml-6 space-y-12">
            {t.experience.items.map((item, i) => (
              <motion.div
                key={i}
                className="relative ps-8 sm:ps-10 group"
                initial={{ opacity: 0, y: 50, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-cyan-500 group-hover:bg-cyan-400 transition-colors flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:bg-slate-900 transition-colors" />
                </div>

                <div className="p-6 rounded border border-slate-700/50 bg-slate-800/20 backdrop-blur-sm card-hover">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                        {item.role}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-cyan-500 font-medium">
                        <Briefcase size={14} />
                        <span>{item.company}</span>
                        <span className="text-slate-600">•</span>
                        <span className="px-2 py-0.5 text-xs rounded bg-slate-700/50 text-slate-300 border border-slate-600/30">
                          {item.location}
                        </span>
                      </div>
                    </div>
                    <div className="shrink-0 text-sm font-mono text-slate-400 bg-slate-800 px-3 py-1 rounded border border-slate-700/60 sm:self-start">
                      {item.period}
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
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
                <motion.div
                  key={ci}
                  className="p-5 rounded border border-slate-700/50 bg-slate-800/30 card-hover"
                  data-testid={`card-skill-category-${ci}`}
                  initial={{ opacity: 0, scale: 0.9, y: 40 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: ci * 0.15, ease: [0.16, 1, 0.3, 1] }}
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
                      isVisible={skillsSection.isVisible}
                      delay={ci * 100 + ii * 80}
                    />
                  ))}
                </motion.div>
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
              <motion.div
                key={project.id}
                className="group p-6 rounded border border-slate-700/50 bg-slate-800/30 card-hover flex flex-col"
                data-testid={`card-project-${project.id}`}
                initial={{ opacity: 0, x: pi % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-1 rounded">
                      {project.tag}
                    </span>
                    {"date" in project && project.date && (
                      <span className="flex items-center gap-1 text-xs font-mono text-slate-500 bg-slate-800 border border-slate-700/50 px-2 py-1 rounded">
                        <Calendar size={10} />
                        {project.date}
                      </span>
                    )}
                  </div>
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RESUME */}
      <section id="resume" className="py-24 bg-slate-900/40 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/3 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-3">
              <div className="section-line" />
              <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
                {t.resume.badge}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">{t.resume.title}</h2>
            <p className="text-slate-400 text-lg">{t.resume.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Left: PDF Preview (larger) */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="resume-preview-card rounded border border-slate-700/50 bg-slate-800/20 backdrop-blur-sm overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/50 bg-slate-800/40">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-500/60" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                      <span className="w-3 h-3 rounded-full bg-green-500/60" />
                    </div>
                    <span className="text-xs font-mono text-slate-500 ml-2">Marwan_Badr_CV.pdf</span>
                  </div>
                  <a
                    href="/Marwan_Badr_CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-500 hover:text-cyan-400 transition-colors flex items-center gap-1"
                  >
                    <ExternalLink size={12} />
                    Open
                  </a>
                </div>
                <div className="relative" style={{ height: '800px' }}>
                  <iframe
                    src="/Marwan_Badr_CV.pdf"
                    className="w-full h-full border-0"
                    title="Marwan Badr CV Preview"
                    style={{ background: '#1e293b' }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Right: Info card */}
            <motion.div
              className="lg:col-span-1 space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="p-6 rounded border border-slate-700/50 bg-slate-800/20 backdrop-blur-sm">
                <div className="w-14 h-14 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-5">
                  <FileText size={24} className="text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-3">Marwan Badr</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {t.resume.description}
                </p>

                <div className="space-y-3">
                  <a
                    href="/Marwan_Badr_CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-[#0f172a] font-semibold rounded transition-all duration-200 cyan-glow hover:scale-[1.02]"
                    data-testid="btn-view-resume"
                  >
                    <Eye size={18} />
                    {t.resume.viewBtn}
                  </a>
                  <a
                    href="/Marwan_Badr_CV.pdf"
                    download="Marwan_Badr_CV.pdf"
                    className="flex items-center justify-center gap-2 w-full px-5 py-3 border border-slate-700 hover:border-cyan-500/60 text-slate-300 hover:text-cyan-400 font-medium rounded transition-all duration-200 hover:scale-[1.02]"
                    data-testid="btn-download-resume"
                  >
                    <Download size={18} />
                    {t.resume.downloadBtn}
                  </a>
                </div>
              </div>

              <div className="p-4 rounded border border-cyan-500/20 bg-cyan-500/5">
                <div className="flex items-start gap-3">
                  <FileText size={16} className="text-cyan-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-cyan-400/80">
                    PDF format · Compatible with all devices and ATS systems
                  </p>
                </div>
              </div>
            </motion.div>
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
            <motion.div
              className="p-8 rounded border border-slate-700/50 bg-slate-800/20 backdrop-blur-sm flex flex-col justify-between"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <h3 className="text-xl font-bold text-slate-100 mb-4">
                  Let's build something great together.
                </h3>
                <p className="text-slate-400 leading-relaxed mb-8">
                  {t.contact.subtitle_2}
                </p>
              </div>
              <div className="p-4 rounded border border-cyan-500/20 bg-cyan-500/5">
                <p className="text-sm text-cyan-400 font-medium">{t.contact.availability}</p>
              </div>
            </motion.div>

            <motion.div
              className="p-8 rounded border border-slate-700/50 bg-slate-800/20 backdrop-blur-sm space-y-6"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-4">
                <a
                  href="mailto:marwanbadr514@gmail.com"
                  className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition-colors group"
                >
                  <div className="w-10 h-10 rounded bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                    <Mail size={16} className="text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-mono">// Email</div>
                    <span className="text-sm font-medium">marwanbadr514@gmail.com</span>
                  </div>
                </a>

                <a
                  href="https://wa.me/201007258086"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition-colors group"
                >
                  <div className="w-10 h-10 rounded bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                    <MessageSquare size={16} className="text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-mono">// WhatsApp</div>
                    <span className="text-sm font-medium">+201007258086</span>
                  </div>
                </a>

                <div className="flex items-center gap-3 text-slate-300">
                  <div className="w-10 h-10 rounded bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    <MapPin size={16} className="text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-mono">// Location</div>
                    <span className="text-sm font-medium">Egypt</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">
                  Find me on
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://github.com/Marwan-badr543"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 border border-slate-700 hover:border-cyan-500/40 rounded text-slate-400 hover:text-cyan-400 transition-all duration-200 text-sm"
                    data-testid="link-github"
                  >
                    <Github size={16} />
                    {t.contact.links.github}
                  </a>
                  <a
                    href="https://linkedin.com/in/marwan-badr-4553a42bb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 border border-slate-700 hover:border-cyan-500/40 rounded text-slate-400 hover:text-cyan-400 transition-all duration-200 text-sm"
                    data-testid="link-linkedin"
                  >
                    <Linkedin size={16} />
                    {t.contact.links.linkedin}
                  </a>
                </div>
              </div>
            </motion.div>
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
