export type Lang = "en" | "ar";

export const translations = {
  en: {
    dir: "ltr",
    nav: {
      home: "Home",
      about: "About",
      experience: "Experience",
      skills: "Skills",
      projects: "Projects",
      resume: "Resume",
      contact: "Contact",
      toggleLang: "العربية",
    },
    hero: {
      badge: "Open to Work",
      headline: "I Build Systems That Speak the Language of Business.",
      subheadline: "Frappe Developer & Backend Engineer | Accountant",
      description:
        "I am a Software Engineer with an accounting background specializing in building custom Frappe/ERPNext applications and robust backend systems using Python and FastAPI.I design finance-aware software that ensures data integrity and seamless business workflows. Currently working remotely at Showsatellite and open to new opportunities.",
      cta: "View My Work",
      ctaContact: "Get in Touch",
      scrollDown: "Scroll to explore",
    },
    edge: {
      badge: "The Accountant Edge",
      title: "Where Finance Meets Technology",
      subtitle: "Translating complex accounting cycles into clean, maintainable code.",
      p1: "Graduated in 2025 from the Faculty of Commerce (English Section, Accounting Department). I don't just write code—I understand the underlying business logic. I know how a Chart of Accounts is structured, how journal entries flow into general ledgers, and how inventory movements connect directly to accounting and financial operations.",
      p2: "When building integrations and automating workflows, my financial background ensures that data flows securely and accurately. I specialize in bridging the gap between developers and accountants to ensure perfect data integrity.",
      p3: "Focused on high-quality, well-documented development.",
      pillars: [
        {
          icon: "calculator",
          title: "Accounting Cycle Expertise",
          desc: "Deep understanding of journal entries, ledger posting, bank reconciliations, and financial statements.",
        },
        {
          icon: "erp",
          title: "Frappe & Backend Architecture",
          desc: "Designing robust server scripts, custom DocTypes, and RESTful APIs using Python and FastAPI.",
        },
      ],
    },
    experience: {
      badge: "Professional Journey",
      title: "Work Experience",
      subtitle: "My career path bridging backend development and financial roles.",
      items: [
        {
          role: "Backend Developer",
          company: "Showsatellite",
          location: "Remote (Bahrain)",
          period: "March 2026 – Present",
          description: "Designing and implementing robust custom Frappe applications, developing RESTful APIs with Python/FastAPI, and automating system synchronization.",
        },
        {
          role: "Accountant",
          company: "Minicash Furniture Company",
          location: "Onsite",
          period: "February 2026 – March 2026",
          description: "Managed day-to-day accounts, general ledgers, accounts receivable/payable, and reconciled financial statements.",
        },
        {
          role: "Backend Developer",
          company: "Showsatellite",
          location: "Remote (Bahrain)",
          period: "April 2025 – September 2025",
          description: "Developed and maintained backend API integrations, custom ERPNext flows, and real-time data sync engines.",
        },
      ],
    },
    skills: {
      badge: "Technical Expertise",
      title: "Skill Matrix",
      subtitle: "A tailored toolkit bridging software development and accounting.",
      categories: [
        {
          name: "Frappe Framework & ERPNext",
          icon: "erp",
          items: [
            { name: "Frappe Framework (Custom apps, hooks, scripts)", level: 92 },
            { name: "ERPNext Customization & DocTypes", level: 90 },
            { name: "REST API Integration", level: 92 },
          ],
        },
        {
          name: "Backend Development",
          icon: "backend",
          items: [
            { name: "Python", level: 95 },
            { name: "FastAPI & SQLAlchemy", level: 90 },
            { name: "API Design & RESTful Services", level: 92 },
            { name: "Git & Version Control", level: 88 },
          ],
        },
        {
          name: "Database & Tools",
          icon: "db",
          items: [
            { name: "Relational Databases", level: 85 },
            { name: "SQLAlchemy ORM", level: 90 },
          ],
        },
        {
          name: "Accounting Skills",
          icon: "calculator",
          items: [
            { name: "Full Accounting Cycle & Reconciliations", level: 95 },
            { name: "Financial Statements (Income, Balance)", level: 92 },
            { name: "Inventory Control & Accounts Mgmt", level: 90 },
          ],
        },
        {
          name: "Prompt Engineering",
          icon: "chart",
          items: [
            { name: "Prompt Engineering (LearnPrompt.org, 2024)", level: 78 },
          ],
        },
        {
          name: "Odoo Development",
          icon: "erp",
          items: [
            { name: "Odoo Development (Prior background)", level: 30 },
          ],
        },
      ],
    },
    projects: {
      badge: "Featured Work",
      title: "Projects",
      subtitle: "Real systems built for real business problems.",
      items: [
        {
          id: "telegram-notification",
          tag: "Frappe Custom App",
          date: "June 2026",
          title: "Telegram Notification Frappe App",
          description: "A powerful custom Frappe app that triggers dynamic Telegram alerts with interactive inline keyboard buttons (like Submit/Cancel) for remote management decisions.",
          highlights: [
            "Select any DocType and event (e.g., after insert/update) to trigger notifications",
            "Configurable conditions and message templates with dynamic variable binding",
            "Interactive inline keyboard buttons allowing managers to submit or cancel documents from mobile",
          ],
          tech: ["Frappe Framework", "Python", "Telegram API", "REST APIs", "Git"],
          link: "https://github.com/Marwan-badr543/Telegram-Notification-Frappe-app",
          linkLabel: "View GitHub Repo",
        },
        {
          id: "support-management",
          tag: "Frappe Custom App",
          date: "May 2026",
          title: "Support Management Frappe App",
          description: "A comprehensive support management module for tracking tickets, allocating technicians, and scheduling maintenance.",
          highlights: [
            "Support ticket tracking and technician scheduling",
            "Maintenance visit appointments allocation",
            "Clean Frappe custom application architecture",
          ],
          tech: ["Frappe Framework", "Python", "Javascript", "Git"],
          link: "https://github.com/Marwan-badr543/support_management_frappe_app/tree/develop",
          linkLabel: "View GitHub Repo",
        },
        {
          id: "ecommerce-ops",
          tag: "Full-Stack System (In Dev)",
          date: "June 2026",
          title: "Integrated E-Commerce & Operations Management",
          description: "A scalable full-stack platform in development to streamline maintenance ticket tracking and logistics.",
          highlights: [
            "Support ticket tracking & technician scheduling",
            "Automation of Sales Invoices, Delivery Notes, and Expense Claims",
            "Unified control panel for all logistics operations",
          ],
          tech: ["Frappe Framework", "Python", "FastAPI", "REST APIs"],
        },
        {
          id: "sync-engine",
          tag: "Real-Time Sync Engine",
          date: "March 2026",
          title: "Real-Time Synchronization Engine: ERPNext ↔ OpenCart",
          description: "A secure bidirectional sync engine automating product catalogs, prices, inventory, and images.",
          highlights: [
            "Auto transfers prices, stock, and categories",
            "Custom image synchronization feature",
            "Reduced manual inventory effort by 100%",
          ],
          tech: ["Python", "REST APIs", "ERPNext", "OpenCart"],
          videoLink: "https://youtu.be/dLG_WjKm_7c",
          videoLabel: "Watch Demo Video",
        },
        {
          id: "ecommerce-erpnext",
          tag: "ERPNext Integration",
          date: "May 2025",
          title: "Integrated E-Commerce Platform with ERPNext",
          description: "A customer ordering platform with real-time integration to ERPNext, automating sales workflows and notification delivery.",
          highlights: [
            "Real-time Sales Orders, Invoices, & Delivery Notes",
            "Telegram notifications & Google Sheets sync",
            "Admin dashboard & time-slot logistics management",
          ],
          tech: ["Python", "FastAPI", "ERPNext", "REST APIs", "Telegram API", "Google Sheets"],
          link: "https://order.showsatellite.net/",
          linkLabel: "Live Website",
        },
        {
          id: "fast-account",
          tag: "Desktop Application",
          date: "September 2024",
          title: "\"Fast Account 2\" — Sales & Accounting App",
          description: "A cashier sales and financial reporting desktop application with a bilingual UI.",
          highlights: [
            "Cashier sales system with ingredient cost tracking",
            "Financial Reporting engine generating Income Statements",
            "Payroll & HR module with automated salary calculation",
          ],
          tech: ["Python", "Bilingual UI", "Financial Reporting"],
          videoLink: "https://youtube.com/playlist?list=PL3KODZISjp1S4kRxaW0lyQ4OqbGWUECcH",
          videoLabel: "Watch Playlist",
        },
      ],
    },
    resume: {
      badge: "My Resume",
      title: "Curriculum Vitae",
      subtitle: "Download or preview my full resume below.",
      viewBtn: "View Resume",
      downloadBtn: "Download PDF",
      description: "A comprehensive overview of my professional experience, technical skills, education, and projects — all in one document.",
    },
    contact: {
      badge: "Let's Connect",
      title: "Get In Touch",
      subtitle: "Looking for a Frappe developer & backend engineer who understands accounting? Let's talk.",
      subtitle_2: "Have an ERP project that needs solid architecture and accurate business logic? Drop me a message or schedule a call.",
      links: {
        github: "GitHub",
        linkedin: "LinkedIn",
      },
      availability: "Currently working remotely as a Backend Developer at Showsatellite (Bahrain) · Open to new full-time, remote & contract opportunities.",
    },
    footer: {
      built: "Built with precision by",
      rights: "All rights reserved.",
    },
  },

};

export type Translations = typeof translations.en;
