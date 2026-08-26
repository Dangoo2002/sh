'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Mail, ArrowRight, BarChart, Database,
  LineChart, PieChart, Brain, FileSpreadsheet, Code,
  MessageCircle, ExternalLink, MapPin, Download
} from 'lucide-react';
import Image from 'next/image';

// ─── CUSTOM SVG ICONS ──────────────────────────────────────────────────────

const XIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const GithubIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

// ─── PROJECTS DATA ─────────────────────────────────────────────────────────
const projects = [
  {
    id: 1,
    title: 'Superstore Data Cleaning & Analysis',
    category: 'Excel / Data Analysis',
    description: 'Analysing e-commerce sales data to evaluate sales performance, identify important trends, and uncover patterns across countries, regions, stores, and time periods. Transforms raw transactional data into meaningful findings for marketing, inventory, and pricing decisions.',
    image: '/superstore.jpeg',
    tags: ['Excel', 'Data Cleaning', 'Dashboards', 'Business Insights'],
    link: 'https://github.com/ianshikami39/Superstore-Data-cleaning-and-Analysis'
  },
  {
    id: 2,
    title: 'Larry Jay Supermarket Sales Analysis',
    category: 'Business Intelligence',
    description: 'Analyses supermarket sales data to evaluate revenue, profitability, customer segments, product performance, and market trends. Explores discount levels and their relationship with sales, concluding with data-driven recommendations for seasonal marketing and pricing strategy.',
    image: '/larryjay.jpeg',
    tags: ['Sales Analysis', 'Customer Segmentation', 'Profitability'],
    link: 'https://github.com/ianshikami39/Larry-Jay-Supermarket-sales-data-Project'
  },
  {
    id: 3,
    title: 'Customer, Orders & Membership Analysis',
    category: 'PostgreSQL / SQL',
    description: 'Analyses a relational database containing customers, products, orders, and membership records. Examines purchasing behaviour, product performance, payment methods, and membership activity using joins, aggregation, filtering, CTEs, and advanced date functions.',
    image: '/postgres-customer.jpeg',
    tags: ['PostgreSQL', 'CTEs', 'Relational Data', 'Advanced SQL'],
    link: 'https://github.com/ianshikami39/Customer-Sales-Membership-Analysis-PostgreSQL'
  },
  {
    id: 4,
    title: 'Beverage Sales Performance Analysis',
    category: 'Power BI',
    description: 'Analyses sales performance, profitability, and operational efficiency within a beverage distribution business. Using Power Query, DAX, data modelling, and interactive visualisations to evaluate revenue, expenses, profit margins, brands, and regional sales trends.',
    image: '/beverage-powerbi.jpeg',
    tags: ['Power BI', 'DAX', 'Data Modelling', 'Interactive Dashboards'],
    link: 'https://github.com/ianshikami39/-Beverage-Sales-Performance-Analysis-Power-BI-'
  },
  {
    id: 5,
    title: 'Employee & Department SQL Analysis',
    category: 'PostgreSQL / HR Analytics',
    description: 'Analyses employee, department, and project data within a relational database. Focuses on compensation, departmental structure, employee tenure, project allocation, and workload distribution using correlated subqueries, GROUP BY, and conditional filtering.',
    image: '/employee-sql.jpeg',
    tags: ['PostgreSQL', 'HR Analytics', 'Subqueries', 'Workforce Insights'],
    link: 'https://github.com/ianshikami39/Employee-Department-Project-Analytics'
  },
  {
    id: 6,
    title: 'Cafe Sales Data Cleaning & Analysis',
    category: 'Excel & PostgreSQL',
    description: 'Demonstrates the complete data analyst workflow, beginning with a messy cafe sales dataset containing missing, inconsistent, and erroneous records. The cleaned data was analysed using SQL to examine product demand, customer spending, and location performance.',
    image: '/cafe-sales.jpeg',
    tags: ['Data Cleaning', 'PostgreSQL', 'Excel', 'Data Validation'],
    link: 'https://github.com/ianshikami39/Cafe-Sales'
  }
];

// ─── SKILLS DATA ───────────────────────────────────────────────────────────
const skills = [
  {
    name: 'Microsoft Excel',
    icon: <FileSpreadsheet className="w-6 h-6" />,
    desc: 'Data cleaning, spreadsheet analysis, formulas, calculated fields, data validation, exploratory analysis, and business reporting.'
  },
  {
    name: 'SQL & PostgreSQL',
    icon: <Database className="w-6 h-6" />,
    desc: 'Relational database analysis, joins, aggregation, filtering, CTEs, subqueries, date functions, and business-focused SQL queries.'
  },
  {
    name: 'Power BI',
    icon: <BarChart className="w-6 h-6" />,
    desc: 'Interactive dashboards, Power Query, DAX, KPI development, data modelling, visualisation, and business intelligence.'
  },
  {
    name: 'Tableau',
    icon: <PieChart className="w-6 h-6" />,
    desc: 'Data visualisation, dashboard development, trend analysis, and communicating analytical findings through interactive visual storytelling.'
  },
  {
    name: 'Python',
    icon: <Code className="w-6 h-6" />,
    desc: 'Data analysis, data manipulation, exploratory analysis, and developing practical analytical solutions using Python libraries.'
  },
  {
    name: 'AI Agent Creation',
    icon: <Brain className="w-6 h-6" />,
    desc: 'Years of professional experience at VA Hub Studios working with AI-driven workflows and agent development, combining analytical thinking with emerging AI technologies.'
  }
];

// ─── NAV ITEMS ─────────────────────────────────────────────────────────────
const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
];

const HEADER_HEIGHT = 72;

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────
export default function DataAnalystPortfolio() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);

      const sections = ['about', 'skills', 'projects', 'certifications', 'contact'];
      let current = 'about';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= HEADER_HEIGHT + 100 && rect.bottom >= HEADER_HEIGHT + 100) {
          current = section;
          break;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const scrollToSection = useCallback((e, href) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const section = document.getElementById(id);
    if (section) {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
      window.scrollTo({ top: sectionTop, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#222222] text-white selection:bg-neutral-700 selection:text-white font-sans antialiased">

      {/* ─── HEADER ────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${scrolled ? 'bg-[#222222]/90 backdrop-blur-md border-white/10' : 'bg-transparent border-transparent'
          }`}
        style={{ height: HEADER_HEIGHT }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white text-[#222222] flex items-center justify-center font-bold text-sm rounded">
                IS
              </div>
              <span className="text-base font-semibold tracking-tight text-white">
                Ian Shikami
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`text-sm font-medium transition-colors ${activeSection === item.href.replace('#', '') ? 'text-white' : 'text-gray-400 hover:text-white'
                    }`}
                >
                  {item.name}
                </a>
              ))}
              <a
                href="/IAN_SHIKAMI.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white text-[#222222] rounded hover:bg-neutral-200 transition-colors"
              >
                <Download className="w-4 h-4" />
                Resume
              </a>
            </nav>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-white hover:bg-white/10 rounded transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* ─── MOBILE MENU ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-[#222222]/95 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-[#2a2a2a] border-l border-white/10 md:hidden"
            >
              <div className="flex justify-end p-4">
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex flex-col px-6 py-4 gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className="py-3 text-lg font-medium text-white border-b border-white/10"
                  >
                    {item.name}
                  </a>
                ))}
                <a
                  href="/IAN_SHIKAMI.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 mt-4 py-3 px-4 bg-white text-[#222222] font-medium rounded"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="pt-[72px]">
<section id="home" className="relative min-h-[calc(100vh-72px)] flex items-center overflow-hidden">
  {/* Background Image & Overlays */}
  <div className="absolute inset-0 z-0">
    <Image
      src="/ian-hero.jpeg"
      alt="Ian Shikami"
      fill
      className="object-cover"
      style={{ objectPosition: 'center 20%' }}
      priority
    />
    {/* Data Grid Overlay */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
    {/* Gradient for Readability */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#222222] via-[#222222]/90 to-[#222222]/60 md:to-[#222222]/20" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#222222] via-[#222222]/50 to-transparent md:hidden" />
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-12 md:pt-0">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl"
    >
      {/* Plain Text Status */}
      <p className="text-sm font-mono text-white/80 mb-6 uppercase tracking-widest">
        Available for Data Analysis Projects
      </p>

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
        Turning Data Into <br />
        <span className="text-white">Meaningful Business Insights</span>
      </h1>

      <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-xl">
        Data Analyst skilled in SQL, PostgreSQL, Microsoft Excel, Power BI, Tableau, and Python.
        I specialize in transforming raw, complex datasets into clear, actionable insights
        that support informed business decision-making.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="#projects"
          onClick={(e) => scrollToSection(e, '#projects')}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#222222] font-semibold rounded hover:bg-neutral-200 transition-colors"
        >
          Explore My Work
          <ArrowRight className="w-4 h-4" />
        </a>
        <a
          href="#about"
          onClick={(e) => scrollToSection(e, '#about')}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 text-white font-medium rounded hover:bg-white/5 transition-colors"
        >
          Learn More
        </a>
      </div>
    </motion.div>
  </div>
</section>

        {/* ─── ABOUT ───────────────────────────────────────────────────── */}
        <section id="about" className="py-20 md:py-28 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-12 gap-12">
              <div className="md:col-span-4">
                <h2 className="text-sm font-mono text-gray-500 mb-2">ABOUT ME</h2>
                <h3 className="text-3xl md:text-4xl font-bold text-white">Analytical Thinking Meets Business Strategy</h3>
              </div>
              <div className="md:col-span-8 space-y-6">
                <p className="text-lg text-gray-300 leading-relaxed">
                  I approach data analysis from both a technical and business perspective, combining data preparation, statistical thinking, SQL querying, and visualisation to understand what the data is communicating and why it matters.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  My portfolio demonstrates practical experience working with sales, customer, workforce, product, and operational datasets, from initial data cleaning and validation through to analysis, visualisation, and actionable recommendations.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Additionally, I bring years of professional experience as an <span className="text-blue-400 font-medium">AI Agent Creator at VA Hub</span>, where I worked with AI-driven workflows and agent development. This experience strengthened my ability to combine analytical thinking with emerging AI technologies to solve practical problems and improve workflows.
                </p>

                <div className="grid sm:grid-cols-3 gap-4 pt-4">
                  <div className="p-4 bg-[#2a2a2a] border border-white/10 rounded-lg">
                    <LineChart className="w-6 h-6 text-white mb-3" />
                    <h4 className="text-sm font-semibold text-white mb-1">Data Analysis</h4>
                    <p className="text-xs text-gray-400">Transforming raw data into strategic business insights.</p>
                  </div>
                  <div className="p-4 bg-[#2a2a2a] border border-white/10 rounded-lg">
                    <Database className="w-6 h-6 text-white mb-3" />
                    <h4 className="text-sm font-semibold text-white mb-1">Database Management</h4>
                    <p className="text-xs text-gray-400">Advanced SQL querying and relational database design.</p>
                  </div>
                  <div className="p-4 bg-[#2a2a2a] border border-white/10 rounded-lg">
                    <Brain className="w-6 h-6 text-white mb-3" />
                    <h4 className="text-sm font-semibold text-white mb-1">AI Integration</h4>
                    <p className="text-xs text-gray-400">Leveraging AI agents to automate and enhance workflows.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SKILLS ──────────────────────────────────────────────────── */}
        <section id="skills" className="py-20 md:py-28 bg-[#2a2a2a]/30 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-sm font-mono text-gray-500 mb-2">CAPABILITIES</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white">Technical Skills & Analytical Capabilities</h3>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                My skill set combines data analysis, database querying, spreadsheet modelling, business intelligence, visualisation, and programming to support the complete analytical workflow.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, idx) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                  className="p-6 bg-[#2a2a2a] border border-white/10 rounded-lg hover:border-white/30 transition-colors group"
                >
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-white mb-4 group-hover:bg-white/20 transition-colors">
                    {skill.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">{skill.name}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{skill.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PROJECTS ────────────────────────────────────────────────── */}
        <section id="projects" className="py-20 md:py-28 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-sm font-mono text-gray-500 mb-2">PORTFOLIO</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white">Featured Data Projects</h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group bg-[#2a2a2a] border border-white/10 rounded-xl overflow-hidden hover:border-white/30 transition-all duration-300 flex flex-col"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-[#222222]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2a2a2a] to-transparent opacity-60" />
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-3">
                      <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">{project.category}</span>
                      <h4 className="text-xl font-bold text-white mt-1 group-hover:text-white transition-colors">
                        {project.title}
                      </h4>
                    </div>

                    <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-grow">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-white/5 text-gray-300 rounded border border-white/10">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-white/5 border border-white/10 text-white text-sm font-medium rounded hover:bg-white hover:text-[#222222] hover:border-white transition-all"
                    >
                      View Project
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CERTIFICATIONS ──────────────────────────────────────────── */}
        <section id="certifications" className="py-20 md:py-28 bg-[#2a2a2a]/30 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-sm font-mono text-gray-500 mb-2">CREDENTIALS</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white">Professional Certifications</h3>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                Professional certifications and credentials supporting my technical skills and continued development in data analytics, business intelligence, and technology.
              </p>
            </div>

            <div className="relative max-w-4xl mx-auto rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-black/20 group">
              <Image
                src="/cert.jpeg"
                alt="Ian Shikami Certifications"
                width={800}
                height={600}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1589330694653-4d5c953211b9?w=800&h=600&fit=crop';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#222222] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-bold text-xl">Ian Shikami Certifications</p>
                <p className="text-gray-300 text-sm mt-1">Verified credentials in Data Analytics and Business Intelligence</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── CONTACT ─────────────────────────────────────────────────── */}
        <section id="contact" className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <h2 className="text-sm font-mono text-gray-500 mb-2">GET IN TOUCH</h2>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Let's Work With Data</h3>
                <p className="text-gray-300 mb-10 leading-relaxed">
                  Whether the goal is to understand business performance, identify trends, improve reporting, or turn complex datasets into actionable insights, I bring a structured and business-focused approach to data analysis.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#2a2a2a] border border-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-gray-500 mb-1 uppercase tracking-wider">Email</p>
                      <a href="mailto:ianshikami39@gmail.com" className="text-white hover:text-gray-300 transition-colors">
                        ianshikami39@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#2a2a2a] border border-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-gray-500 mb-1 uppercase tracking-wider">Location</p>
                      <p className="text-white">Nairobi, Kenya</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <p className="text-xs font-mono text-gray-500 mb-4 uppercase tracking-wider">Connect With Me</p>
                  <div className="flex flex-wrap gap-3">
                    <a href="https://github.com/ianshikami39" target="_blank" rel="noopener noreferrer" className="p-3 bg-[#2a2a2a] border border-white/10 rounded-lg text-gray-400 hover:text-white hover:border-white/50 transition-all">
                      <GithubIcon className="w-5 h-5" />
                    </a>
                    <a href="https://www.linkedin.com/in/ian-shik-01096326a" target="_blank" rel="noopener noreferrer" className="p-3 bg-[#2a2a2a] border border-white/10 rounded-lg text-gray-400 hover:text-white hover:border-white/50 transition-all">
                      <LinkedinIcon className="w-5 h-5" />
                    </a>
                    <a href="https://www.instagram.com/ianshik39/" target="_blank" rel="noopener noreferrer" className="p-3 bg-[#2a2a2a] border border-white/10 rounded-lg text-gray-400 hover:text-white hover:border-white/50 transition-all">
                      <InstagramIcon className="w-5 h-5" />
                    </a>
                    <a href="https://x.com/Ianshikami" target="_blank" rel="noopener noreferrer" className="p-3 bg-[#2a2a2a] border border-white/10 rounded-lg text-gray-400 hover:text-white hover:border-white/50 transition-all">
                      <XIcon className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-[#2a2a2a] border border-white/10 rounded-xl p-6 md:p-8">
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider">Full Name</label>
                    <input
                      type="text"
                      className="w-full bg-[#222222] border border-white/10 text-white py-3 px-4 rounded-lg text-sm focus:outline-none focus:border-white transition-colors placeholder:text-gray-600"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      className="w-full bg-[#222222] border border-white/10 text-white py-3 px-4 rounded-lg text-sm focus:outline-none focus:border-white transition-colors placeholder:text-gray-600"
                      placeholder="john@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider">Project Details</label>
                    <textarea
                      rows={4}
                      className="w-full bg-[#222222] border border-white/10 text-white py-3 px-4 rounded-lg text-sm focus:outline-none focus:border-white transition-colors placeholder:text-gray-600 resize-none"
                      placeholder="Tell me about your data, goals, and timeline..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-white text-[#222222] font-semibold rounded-lg hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                  >
                    Send Inquiry
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ─── FOOTER ────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/5 bg-[#1e1e1e] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white text-[#222222] flex items-center justify-center font-bold text-xs rounded">
              IS
            </div>
            <span className="text-sm text-gray-400">© {new Date().getFullYear()} Ian Shikami. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <a href="mailto:ianshikami39@gmail.com" className="text-gray-500 hover:text-white transition-colors">
              <Mail className="w-4 h-4" />
            </a>
            <a href="https://x.com/Ianshikami" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
              <XIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>

      {/* ─── WHATSAPP FLOATING BUTTON ──────────────────────────────────── */}
      <a
        href="https://wa.me/254798984772?text=Hello%20Ian%20I%20would%20want%20to%20inquire%20about%20your%20data%20analysis%20services"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#1ebe5c] hover:scale-105 transition-all"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
}