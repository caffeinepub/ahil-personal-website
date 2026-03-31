import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  ChevronDown,
  Code2,
  ExternalLink,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Mic2,
  Monitor,
  Radio,
  Send,
  Server,
  Twitter,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ─── Nav Links ──────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

// ─── Skills Data ─────────────────────────────────────────────────────────────
const SKILLS = [
  {
    icon: <Code2 size={28} />,
    title: "Web Development",
    color: "#2D7DFF",
    pills: ["React", "Node.js", "PHP", "JavaScript", "HTML/CSS", "MySQL"],
    desc: "Building modern, responsive, and performant web applications from frontend to backend.",
  },
  {
    icon: <Monitor size={28} />,
    title: "IT Expert",
    color: "#22D3EE",
    pills: [
      "Networking",
      "AWS",
      "Cisco",
      "Linux",
      "Cybersecurity",
      "Windows Server",
    ],
    desc: "Designing and managing complex IT infrastructure, networks, and security systems.",
  },
  {
    icon: <Mic2 size={28} />,
    title: "Broadcast Expert",
    color: "#A855F7",
    pills: [
      "Video Production",
      "Audio Engineering",
      "Live Streaming",
      "OBS Studio",
      "Adobe Premiere",
      "Content Creation",
    ],
    desc: "Creating professional broadcast content, managing live streaming productions and media.",
  },
];

// ─── Services Data ───────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: <Globe size={32} />,
    title: "Web Development",
    color: "#2D7DFF",
    items: [
      "Full-stack web applications",
      "Responsive & mobile-first design",
      "E-commerce solutions",
      "CMS development & integration",
    ],
  },
  {
    icon: <Server size={32} />,
    title: "IT Solutions",
    color: "#22D3EE",
    items: [
      "Network setup & management",
      "IT consulting & strategy",
      "System administration",
      "Cybersecurity & data protection",
    ],
  },
  {
    icon: <Radio size={32} />,
    title: "Broadcast & Media",
    color: "#A855F7",
    items: [
      "Live streaming setup & management",
      "Video & audio production",
      "Broadcast engineering",
      "Content strategy & creation",
    ],
  },
];

// ─── Projects Data ───────────────────────────────────────────────────────────
const PROJECTS = [
  {
    title: "E-Commerce Platform",
    desc: "Full-stack online store with product management, payment gateway integration, and real-time inventory tracking.",
    tech: ["React", "Node.js", "MySQL"],
    gradient: "from-blue-900/60 to-blue-700/30",
    accent: "#2D7DFF",
  },
  {
    title: "Corporate Network Setup",
    desc: "Enterprise networking infrastructure for a 200+ employee office including VLANs, firewall configuration, and cloud integration.",
    tech: ["Cisco", "AWS", "Linux"],
    gradient: "from-cyan-900/60 to-cyan-700/30",
    accent: "#22D3EE",
  },
  {
    title: "Live Broadcast Studio",
    desc: "End-to-end professional live streaming studio setup with multi-camera switching, audio mixing, and real-time encoding.",
    tech: ["OBS Studio", "Video Production", "Audio"],
    gradient: "from-purple-900/60 to-purple-700/30",
    accent: "#A855F7",
  },
  {
    title: "Company Portfolio Website",
    desc: "Modern, performant responsive company website with CMS integration, SEO optimization, and custom animations.",
    tech: ["React", "Tailwind", "PHP"],
    gradient: "from-emerald-900/60 to-emerald-700/30",
    accent: "#10B981",
  },
];

// ─── Scroll Utility ──────────────────────────────────────────────────────────
function scrollToSection(href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// ─── Section Wrapper with Fade-in ────────────────────────────────────────────
function Section({
  id,
  className = "",
  children,
}: { id: string; className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <section
      ref={ref}
      id={id}
      className={`py-16 sm:py-20 px-4 md:px-8 lg:px-16 ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
}

// ─── Section Heading ─────────────────────────────────────────────────────────
function SectionHeading({
  title,
  subtitle,
}: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-10 sm:mb-14">
      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="mt-4 mx-auto h-1 w-16 rounded-full bg-blue-accent" />
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleNav(href: string) {
    scrollToSection(href);
    setMenuOpen(false);
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    toast.success("Message sent! Ahil will get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0B1118" }}>
      <Toaster position="top-right" />

      {/* ── NAVBAR ─────────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0B1118]/95 backdrop-blur-md shadow-lg shadow-black/30 border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNav("#home")}
            className="font-display text-2xl font-bold text-blue-accent tracking-widest cursor-pointer"
            data-ocid="nav.link"
          >
            AHIL
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  type="button"
                  onClick={() => handleNav(link.href)}
                  className="px-3 py-2 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-white/5"
                  data-ocid="nav.link"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Resume + hamburger */}
          <div className="flex items-center gap-3">
            <Button
              type="button"
              size="sm"
              className="hidden md:flex rounded-full text-white hover:opacity-90 border-0 px-5 text-sm font-semibold"
              style={{ backgroundColor: "#2D7DFF" }}
              data-ocid="nav.primary_button"
            >
              Resume
            </Button>
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              data-ocid="nav.toggle"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden bg-[#0F1720] border-b border-white/5"
            >
              <ul className="px-4 py-3 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <button
                      type="button"
                      onClick={() => handleNav(link.href)}
                      className="w-full text-left px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-white/5"
                      data-ocid="nav.link"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
                <li className="pt-2">
                  <Button
                    type="button"
                    size="sm"
                    className="w-full rounded-full text-white font-semibold"
                    style={{ backgroundColor: "#2D7DFF" }}
                    data-ocid="nav.primary_button"
                  >
                    Resume
                  </Button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden hero-grid"
        style={{
          background:
            "linear-gradient(135deg, #0B1118 0%, #0F1A2E 40%, #0B1118 100%)",
        }}
      >
        {/* Blue glow orbs */}
        <div
          className="absolute top-1/3 left-1/4 w-64 sm:w-96 h-64 sm:h-96 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #2D7DFF 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-48 sm:w-64 h-48 sm:h-64 rounded-full"
          style={{
            background: "radial-gradient(circle, #22D3EE 0%, transparent 70%)",
            opacity: 0.08,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full pt-24 pb-16">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-accent/30 bg-blue-accent/10 text-blue-accent text-xs sm:text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-blue-accent animate-pulse" />
                Available for freelance &amp; full-time
              </div>

              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                Hi, I&apos;m <span className="text-gradient-blue">Ahil</span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground/80 mb-4">
                Web Developer &middot; IT Expert &middot; Broadcast Expert
              </p>

              <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed mb-8 sm:mb-10 max-w-2xl">
                Building digital experiences, solving tech challenges, and
                bringing stories to life through broadcast media.
              </p>

              <div className="flex flex-wrap gap-3 sm:gap-4">
                <Button
                  type="button"
                  size="lg"
                  className="rounded-full text-white font-semibold px-6 sm:px-8 shadow-blue-glow text-sm sm:text-base"
                  style={{ backgroundColor: "#2D7DFF" }}
                  onClick={() => scrollToSection("#portfolio")}
                  data-ocid="hero.primary_button"
                >
                  View My Work <ArrowRight size={16} className="ml-1" />
                </Button>
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  className="rounded-full font-semibold px-6 sm:px-8 border-white/20 text-foreground hover:bg-white/5 text-sm sm:text-base"
                  onClick={() => scrollToSection("#contact")}
                  data-ocid="hero.secondary_button"
                >
                  Let&apos;s Talk
                </Button>
              </div>

              {/* Stats row */}
              <div className="mt-10 sm:mt-14 flex flex-wrap gap-6 sm:gap-8">
                {[
                  { value: "5+", label: "Years Experience" },
                  { value: "40+", label: "Projects Delivered" },
                  { value: "3", label: "Core Specializations" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="font-display text-2xl sm:text-3xl font-bold text-blue-accent">
                      {s.value}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Anime Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Glow ring behind avatar */}
                <div
                  className="absolute inset-0 rounded-full blur-3xl opacity-30"
                  style={{
                    background:
                      "radial-gradient(circle, #2D7DFF 0%, transparent 70%)",
                  }}
                />
                <div
                  className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 border-blue-accent/30"
                  style={{
                    boxShadow:
                      "0 0 60px rgba(45,125,255,0.25), 0 20px 60px rgba(0,0,0,0.5)",
                  }}
                >
                  <img
                    src="/assets/generated/ahil-anime-transparent.dim_400x400.png"
                    alt="Ahil - Web Developer, IT Expert & Broadcast Expert"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating badges */}
                <div className="absolute -bottom-3 -left-4 sm:-bottom-4 sm:-left-6 bg-[#141E28] border border-white/10 rounded-xl px-3 py-2 sm:px-4 sm:py-3 shadow-card">
                  <div className="text-[10px] sm:text-xs text-muted-foreground">
                    Status
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-foreground mt-0.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    Open to Work
                  </div>
                </div>
                <div className="absolute -top-3 -right-4 sm:-top-4 sm:-right-6 bg-[#141E28] border border-white/10 rounded-xl px-3 py-2 sm:px-4 sm:py-3 shadow-card">
                  <div className="text-[10px] sm:text-xs text-muted-foreground">
                    Experience
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-blue-accent mt-0.5">
                    5+ Years
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll hint */}
        <button
          type="button"
          onClick={() => scrollToSection("#about")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="text-xs">Scroll</span>
          <ChevronDown size={18} className="animate-bounce" />
        </button>
      </section>

      {/* ── ABOUT ──────────────────────────────────────────────────────────── */}
      <Section id="about" className="max-w-7xl mx-auto">
        <SectionHeading
          title="About Me"
          subtitle="A passionate technologist with multi-domain expertise"
        />
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Bio */}
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-4">
              Hello! I&apos;m <span className="text-blue-accent">Ahil</span>
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4">
              I&apos;m a passionate Web Developer, IT Expert, and Broadcast
              Expert with years of hands-on experience delivering innovative
              digital solutions. I specialize in building modern web
              applications, managing complex IT infrastructure, and producing
              high-quality broadcast content.
            </p>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
              I believe in combining technical expertise with creative thinking
              to deliver results that exceed expectations. Whether you need a
              cutting-edge web application, a robust IT infrastructure, or a
              professional broadcast production &mdash; I bring the same
              dedication and craftsmanship to every project.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {[
                { label: "Name", value: "Ahil" },
                { label: "Role", value: "Multi-domain Expert" },
                { label: "Email", value: "ahil.contact@gmail.com" },
                { label: "WhatsApp", value: "+8801976842401" },
                { label: "Location", value: "Available Worldwide" },
                { label: "Experience", value: "5+ Years" },
                { label: "Status", value: "Open to Work" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col">
                  <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mb-0.5">
                    {item.label}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-foreground">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
            <Button
              type="button"
              className="rounded-full text-white font-semibold text-sm"
              style={{ backgroundColor: "#2D7DFF" }}
              onClick={() => scrollToSection("#contact")}
              data-ocid="about.primary_button"
            >
              Get In Touch <ArrowRight size={14} className="ml-1" />
            </Button>
          </div>

          {/* Avatar card */}
          <div className="flex justify-center md:justify-end order-first md:order-last">
            <div className="relative">
              <div
                className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden border border-white/10"
                style={{
                  boxShadow:
                    "0 0 40px rgba(45,125,255,0.2), 0 20px 60px rgba(0,0,0,0.4)",
                }}
              >
                <img
                  src="/assets/generated/ahil-anime-transparent.dim_400x400.png"
                  alt="Ahil - Web Developer, IT Expert & Broadcast Expert"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-navy-card border border-white/10 rounded-xl px-3 py-2 sm:px-4 sm:py-3 shadow-card">
                <div className="text-[10px] sm:text-xs text-muted-foreground">
                  Core Expertise
                </div>
                <div className="text-xs sm:text-sm font-bold text-foreground mt-0.5">
                  Web &middot; IT &middot; Broadcast
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-accent/20 border border-blue-accent/40 flex items-center justify-center">
                <Code2 size={14} className="text-blue-accent" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── SKILLS ─────────────────────────────────────────────────────────── */}
      <Section id="skills" className="max-w-7xl mx-auto">
        <SectionHeading
          title="Skills &amp; Expertise"
          subtitle="Technologies and tools I work with across three domains"
        />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
          {SKILLS.map((skill, i) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-2xl border border-white/6 p-5 sm:p-6 hover:border-white/12 transition-all duration-300"
              style={{ backgroundColor: "#141E28" }}
              data-ocid="skills.card"
            >
              <div
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-4"
                style={{
                  backgroundColor: `${skill.color}20`,
                  color: skill.color,
                }}
              >
                {skill.icon}
              </div>
              <h3 className="font-display text-base sm:text-lg font-bold text-foreground mb-2">
                {skill.title}
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm mb-4 leading-relaxed">
                {skill.desc}
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {skill.pills.map((pill) => (
                  <span
                    key={pill}
                    className="text-[10px] sm:text-xs px-2 sm:px-2.5 py-1 rounded-full font-medium"
                    style={{
                      backgroundColor: `${skill.color}18`,
                      color: skill.color,
                      border: `1px solid ${skill.color}30`,
                    }}
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── SERVICES ───────────────────────────────────────────────────────── */}
      <Section id="services" className="max-w-7xl mx-auto">
        <SectionHeading
          title="My Services"
          subtitle="Comprehensive solutions across web, IT, and broadcast domains"
        />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-2xl border border-white/6 p-5 sm:p-7 hover:border-white/12 transition-all duration-300 hover:-translate-y-1"
              style={{ backgroundColor: "#141E28" }}
              data-ocid="services.card"
            >
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-4 sm:mb-5"
                style={{ backgroundColor: `${svc.color}15`, color: svc.color }}
              >
                {svc.icon}
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">
                {svc.title}
              </h3>
              <ul className="space-y-2 sm:space-y-2.5">
                {svc.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 sm:gap-2.5 text-muted-foreground text-xs sm:text-sm"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                      style={{ backgroundColor: svc.color }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 sm:mt-6 pt-4 border-t border-white/5">
                <button
                  type="button"
                  className="text-xs sm:text-sm font-semibold flex items-center gap-1 transition-colors"
                  style={{ color: svc.color }}
                  onClick={() => scrollToSection("#contact")}
                  data-ocid="services.link"
                >
                  Learn More <ExternalLink size={12} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── PORTFOLIO ──────────────────────────────────────────────────────── */}
      <Section id="portfolio" className="max-w-7xl mx-auto">
        <SectionHeading
          title="Featured Projects"
          subtitle="A selection of projects that showcase my technical breadth"
        />
        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          {PROJECTS.map((proj, i) => (
            <motion.div
              key={proj.title}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group rounded-2xl border border-white/6 overflow-hidden hover:border-white/12 transition-all duration-300 hover:-translate-y-1"
              style={{ backgroundColor: "#141E28" }}
              data-ocid={`portfolio.item.${i + 1}`}
            >
              {/* Card header gradient */}
              <div
                className={`h-28 sm:h-36 bg-gradient-to-br ${proj.gradient} flex items-center justify-center relative overflow-hidden`}
              >
                <div
                  className="absolute inset-0 opacity-20 hero-grid"
                  style={{ backgroundSize: "30px 30px" }}
                />
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border flex items-center justify-center relative z-10"
                  style={{
                    backgroundColor: `${proj.accent}20`,
                    borderColor: `${proj.accent}40`,
                  }}
                >
                  <ExternalLink size={20} style={{ color: proj.accent }} />
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="font-display text-base sm:text-lg font-bold text-foreground mb-2">
                  {proj.title}
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                  {proj.desc}
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {proj.tech.map((t) => (
                    <Badge
                      key={t}
                      variant="outline"
                      className="text-[10px] sm:text-xs border-white/10 text-muted-foreground"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── CONTACT ────────────────────────────────────────────────────────── */}
      <Section id="contact" className="max-w-7xl mx-auto">
        <SectionHeading
          title="Get In Touch"
          subtitle="Have a project in mind? Let&#39;s build something great together."
        />
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {/* Form */}
          <div
            className="rounded-2xl border border-white/6 p-5 sm:p-8"
            style={{ backgroundColor: "#141E28" }}
            data-ocid="contact.panel"
          >
            <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mb-5 sm:mb-6">
              Send a Message
            </h3>
            <form onSubmit={handleSend} className="space-y-4">
              <div>
                <label
                  className="text-xs sm:text-sm font-medium text-muted-foreground mb-1.5 block"
                  htmlFor="c-name"
                >
                  Name
                </label>
                <Input
                  id="c-name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  required
                  className="border-white/10 focus:border-blue-accent/50 text-sm"
                  style={{ backgroundColor: "#111A23" }}
                  data-ocid="contact.input"
                />
              </div>
              <div>
                <label
                  className="text-xs sm:text-sm font-medium text-muted-foreground mb-1.5 block"
                  htmlFor="c-email"
                >
                  Email
                </label>
                <Input
                  id="c-email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  required
                  className="border-white/10 focus:border-blue-accent/50 text-sm"
                  style={{ backgroundColor: "#111A23" }}
                  data-ocid="contact.input"
                />
              </div>
              <div>
                <label
                  className="text-xs sm:text-sm font-medium text-muted-foreground mb-1.5 block"
                  htmlFor="c-msg"
                >
                  Message
                </label>
                <Textarea
                  id="c-msg"
                  placeholder="Tell me about your project..."
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  required
                  className="border-white/10 focus:border-blue-accent/50 text-sm resize-none"
                  style={{ backgroundColor: "#111A23" }}
                  data-ocid="contact.textarea"
                />
              </div>
              <Button
                type="submit"
                disabled={sending}
                className="w-full rounded-full text-white font-semibold"
                style={{ backgroundColor: "#2D7DFF" }}
                data-ocid="contact.submit_button"
              >
                {sending ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send size={15} /> Send Message
                  </span>
                )}
              </Button>
            </form>
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-5 sm:gap-6 justify-center">
            <div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mb-2">
                Let&apos;s Connect
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                Whether you&apos;re looking for a web developer, IT consultant,
                or broadcast professional, I&apos;m here to help bring your
                vision to life.
              </p>
            </div>

            {[
              {
                icon: <Mail size={18} />,
                label: "Email",
                value: "ahil.contact@gmail.com",
                href: "mailto:ahil.contact@gmail.com",
              },
              {
                icon: <MessageCircle size={18} />,
                label: "WhatsApp",
                value: "+8801976842401",
                href: "https://wa.me/8801976842401",
              },
              {
                icon: <Linkedin size={18} />,
                label: "LinkedIn",
                value: "linkedin.com/in/ahil",
                href: "https://linkedin.com/in/ahil",
              },
              {
                icon: <MapPin size={18} />,
                label: "Location",
                value: "Available Worldwide",
                href: undefined,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-white/6"
                style={{ backgroundColor: "#141E28" }}
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-accent/10 border border-blue-accent/20 flex items-center justify-center text-blue-accent flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground mb-0.5">
                    {item.label}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-xs sm:text-sm font-medium text-foreground hover:text-blue-accent transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <div className="text-xs sm:text-sm font-medium text-foreground">
                      {item.value}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Social links */}
            <div className="flex gap-3 mt-2">
              {[
                {
                  icon: <Linkedin size={18} />,
                  href: "https://linkedin.com/in/ahil",
                  label: "LinkedIn",
                },
                {
                  icon: <MessageCircle size={18} />,
                  href: "https://wa.me/8801976842401",
                  label: "WhatsApp",
                },
                {
                  icon: <Github size={18} />,
                  href: "https://github.com/ahil",
                  label: "GitHub",
                },
                {
                  icon: <Twitter size={18} />,
                  href: "https://twitter.com/ahil",
                  label: "Twitter",
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-white/20 hover:bg-white/5 transition-all"
                  data-ocid="contact.link"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer
        className="border-t border-white/5 mt-8"
        style={{ backgroundColor: "#08101A" }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 sm:py-12">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 mb-8 sm:mb-10">
            {/* Brand */}
            <div>
              <div className="font-display text-2xl font-bold text-blue-accent tracking-widest mb-3">
                AHIL
              </div>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed max-w-xs">
                Web Developer &middot; IT Expert &middot; Broadcast Expert.
                Building digital experiences that make a difference.
              </p>
            </div>
            {/* Quick links */}
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-3 sm:mb-4 uppercase tracking-wider">
                Quick Links
              </h4>
              <ul className="space-y-1.5 sm:space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <button
                      type="button"
                      onClick={() => handleNav(link.href)}
                      className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                      data-ocid="footer.link"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {/* Social */}
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-3 sm:mb-4 uppercase tracking-wider">
                Connect
              </h4>
              <div className="flex gap-3">
                {[
                  {
                    icon: <Linkedin size={17} />,
                    href: "https://linkedin.com/in/ahil",
                    label: "LinkedIn",
                  },
                  {
                    icon: <MessageCircle size={17} />,
                    href: "https://wa.me/8801976842401",
                    label: "WhatsApp",
                  },
                  {
                    icon: <Github size={17} />,
                    href: "https://github.com/ahil",
                    label: "GitHub",
                  },
                  {
                    icon: <Twitter size={17} />,
                    href: "https://twitter.com/ahil",
                    label: "Twitter",
                  },
                  {
                    icon: <Mail size={17} />,
                    href: "mailto:ahil.contact@gmail.com",
                    label: "Email",
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-white/20 hover:bg-white/5 transition-all"
                    data-ocid="footer.link"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-5 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] sm:text-xs text-muted-foreground">
            <span>
              &copy; {new Date().getFullYear()} Ahil. All rights reserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
