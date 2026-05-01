export type Lang = "en" | "ar";

export const translations = {
  en: {
    dir: "ltr",
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
      toggleLang: "العربية",
    },
    hero: {
      badge: "Available for Hire",
      headline: "I Build Systems That Speak the Language of Business.",
      subheadline: "ERP Technical Engineer | Odoo & ERPNext Expert | Backend Architect (FastAPI)",
      description:
        "Combining a Bachelor of Commerce (Accounting) with full-stack engineering expertise to deliver ERP solutions that are technically sound and business-intelligent.",
      cta: "View My Work",
      ctaContact: "Get in Touch",
      scrollDown: "Scroll to explore",
    },
    edge: {
      badge: "The Accountant Edge",
      title: "Where Finance Meets Technology",
      subtitle: "Most developers implement what they're told. I understand why.",
      p1: "With a Bachelor of Commerce (Accounting), I don't just configure Odoo or ERPNext—I understand the underlying business logic. I know how a Chart of Accounts is structured, how Journal Entries flow into Financial Statements, and why a misconfigured costing method can corrupt your entire inventory valuation.",
      p2: "When a client says \"invoices aren't matching the delivery notes\", a standard developer searches for a bug. I identify whether it's a fiscal period issue, a journal entry misconfiguration, or a workflow gap—then I fix the root cause.",
      p3: "I am not just a coder; I am a solution architect.",
      pillars: [
        {
          icon: "calculator",
          title: "Business Logic First",
          desc: "I understand the business problem before writing a single line of code.",
        },
        {
          icon: "chart",
          title: "Financial Integrity",
          desc: "I ensure ERP configurations align with accounting standards and GL integrity.",
        },
        {
          icon: "bridge",
          title: "Finance–Tech Bridge",
          desc: "I translate between accountants and engineers, eliminating costly misunderstandings.",
        },
      ],
    },
    skills: {
      badge: "Technical Expertise",
      title: "Skill Matrix",
      subtitle: "A cross-domain toolkit built for enterprise-grade solutions.",
      categories: [
        {
          name: "ERP Platforms",
          icon: "erp",
          items: [
            { name: "Odoo (Dev & Business Logic)", level: 95 },
            { name: "ERPNext / Frappe", level: 88 },
            { name: "Accounting & GL Config", level: 90 },
            { name: "ERP Customization", level: 92 },
          ],
        },
        {
          name: "Backend Development",
          icon: "backend",
          items: [
            { name: "Python", level: 90 },
            { name: "FastAPI", level: 88 },
            { name: "REST APIs", level: 92 },
            { name: "RPC / Odoo XML-RPC", level: 85 },
          ],
        },
        {
          name: "Integrations",
          icon: "integration",
          items: [
            { name: "OpenCart E-commerce", level: 88 },
            { name: "Google Sheets API", level: 82 },
            { name: "Telegram Bot API", level: 90 },
            { name: "WhatsApp Business API", level: 85 },
          ],
        },
        {
          name: "Database",
          icon: "db",
          items: [
            { name: "PostgreSQL", level: 88 },
            { name: "MySQL", level: 82 },
            { name: "Database Design", level: 85 },
            { name: "Query Optimization", level: 78 },
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
          id: "ecommerce-gateway",
          tag: "ERPNext Integration",
          title: "Integrated E-Commerce Order Gateway",
          description:
            "A production-grade integration system connecting an OpenCart e-commerce store with ERPNext, automating the full order lifecycle from placement to delivery.",
          highlights: [
            "Automated Sales Orders, Invoices & Delivery Notes",
            "Real-time inventory synchronization",
            "Telegram notifications for operations team",
            "WhatsApp order confirmations for customers",
            "Zero-manual-entry order fulfillment pipeline",
          ],
          tech: ["ERPNext", "Python", "FastAPI", "Telegram API", "WhatsApp API", "OpenCart"],
          link: "https://order.showsatellite.net/",
          linkLabel: "Live Demo",
        },
        {
          id: "erp-opencart-sync",
          tag: "ERP Sync Engine",
          title: "ERPNext–OpenCart Sync Engine",
          description:
            "A full bidirectional synchronization engine that keeps product catalogs, pricing, images, and stock levels in perfect sync between ERPNext and an OpenCart web store.",
          highlights: [
            "Full product catalog sync (names, descriptions, categories)",
            "Real-time price & discount propagation",
            "Image upload & media synchronization",
            "Stock quantity live sync with safety thresholds",
            "Scheduled auto-sync with conflict resolution",
          ],
          tech: ["ERPNext", "Python", "OpenCart API", "PostgreSQL", "REST"],
          videoLink: "https://youtu.be/dLG_WjKm_7c",
          videoLabel: "Watch Demo",
        },
      ],
    },
    contact: {
      badge: "Let's Connect",
      title: "Get In Touch",
      subtitle: "Looking for an ERP engineer who speaks both Python and accounting? Let's talk.",
      form: {
        name: "Your Name",
        email: "Your Email",
        subject: "Subject",
        message: "Your Message",
        send: "Send Message",
        sending: "Sending...",
        success: "Message sent successfully!",
        error: "Something went wrong. Please try again.",
        placeholder: {
          name: "John Smith",
          email: "john@company.com",
          subject: "ERP Project Consultation",
          message: "Hi Marwan, I'm looking for an ERP engineer who...",
        },
      },
      links: {
        github: "GitHub",
        linkedin: "LinkedIn",
        youtube: "YouTube",
      },
      availability: "Open to full-time, contract & consulting opportunities.",
    },
    footer: {
      built: "Built with precision by",
      rights: "All rights reserved.",
    },
  },
  ar: {
    dir: "rtl",
    nav: {
      home: "الرئيسية",
      about: "من أنا",
      skills: "المهارات",
      projects: "المشاريع",
      contact: "التواصل",
      toggleLang: "English",
    },
    hero: {
      badge: "متاح للعمل",
      headline: "أبني أنظمة تتحدث لغة الأعمال.",
      subheadline: "مهندس تقني ERP | خبير Odoo وERPNext | مهندس خلفية (FastAPI)",
      description:
        "أجمع بين بكالوريوس التجارة (محاسبة) وخبرة هندسة البرمجيات لتقديم حلول ERP متكاملة—صحيحة تقنياً وذكية تجارياً.",
      cta: "استعرض أعمالي",
      ctaContact: "تواصل معي",
      scrollDown: "مرر للاستكشاف",
    },
    edge: {
      badge: "الميزة المحاسبية",
      title: "حيث تلتقي المالية بالتكنولوجيا",
      subtitle: "معظم المطورين ينفذون ما يُطلب منهم. أنا أفهم السبب.",
      p1: "بفضل بكالوريوس التجارة (محاسبة)، لا أكتفي بضبط Odoo أو ERPNext—بل أفهم منطق الأعمال الكامن وراءها. أعرف كيف يُبنى دليل الحسابات، وكيف تتدفق قيود اليومية إلى القوائم المالية، ولماذا قد يُفسد خطأ في طريقة التكلفة كامل تقييم المخزون.",
      p2: "حين يقول عميل \"الفواتير لا تتطابق مع إذونات التسليم\"، يبحث المطور العادي عن خطأ برمجي. أما أنا، فأحدد أولاً إن كانت المشكلة في الفترة المالية، أو في قيد محاسبي خاطئ، أو في فجوة في سير العمل—ثم أعالج الجذر الحقيقي للمشكلة.",
      p3: "أنا لست مجرد مبرمج؛ أنا مهندس حلول.",
      pillars: [
        {
          icon: "calculator",
          title: "منطق الأعمال أولاً",
          desc: "أفهم المشكلة التجارية قبل كتابة سطر واحد من الكود.",
        },
        {
          icon: "chart",
          title: "السلامة المالية",
          desc: "أضمن توافق إعدادات ERP مع المعايير المحاسبية وسلامة دفتر الأستاذ العام.",
        },
        {
          icon: "bridge",
          title: "جسر بين المالية والتقنية",
          desc: "أترجم بين المحاسبين والمهندسين، وأقضي على سوء الفهم المكلف.",
        },
      ],
    },
    skills: {
      badge: "الخبرة التقنية",
      title: "مصفوفة المهارات",
      subtitle: "مجموعة أدوات متعددة التخصصات لحلول على مستوى المؤسسات.",
      categories: [
        {
          name: "منصات ERP",
          icon: "erp",
          items: [
            { name: "Odoo (التطوير ومنطق الأعمال)", level: 95 },
            { name: "ERPNext / Frappe", level: 88 },
            { name: "إعداد المحاسبة ودفتر الأستاذ", level: 90 },
            { name: "تخصيص ERP", level: 92 },
          ],
        },
        {
          name: "تطوير الخلفية",
          icon: "backend",
          items: [
            { name: "Python", level: 90 },
            { name: "FastAPI", level: 88 },
            { name: "REST APIs", level: 92 },
            { name: "RPC / Odoo XML-RPC", level: 85 },
          ],
        },
        {
          name: "التكاملات",
          icon: "integration",
          items: [
            { name: "OpenCart للتجارة الإلكترونية", level: 88 },
            { name: "Google Sheets API", level: 82 },
            { name: "Telegram Bot API", level: 90 },
            { name: "WhatsApp Business API", level: 85 },
          ],
        },
        {
          name: "قواعد البيانات",
          icon: "db",
          items: [
            { name: "PostgreSQL", level: 88 },
            { name: "MySQL", level: 82 },
            { name: "تصميم قواعد البيانات", level: 85 },
            { name: "تحسين الاستعلامات", level: 78 },
          ],
        },
      ],
    },
    projects: {
      badge: "أبرز الأعمال",
      title: "المشاريع",
      subtitle: "أنظمة حقيقية بُنيت لحل مشاكل تجارية حقيقية.",
      items: [
        {
          id: "ecommerce-gateway",
          tag: "تكامل ERPNext",
          title: "بوابة طلبات التجارة الإلكترونية المتكاملة",
          description:
            "نظام تكامل متكامل يربط متجر OpenCart الإلكتروني بـ ERPNext، يُؤتمت دورة حياة الطلب بالكامل من التقديم حتى التسليم.",
          highlights: [
            "أتمتة أوامر البيع والفواتير وأذونات التسليم",
            "مزامنة المخزون الفورية",
            "إشعارات تيليجرام للفريق التشغيلي",
            "تأكيدات الطلب عبر واتساب للعملاء",
            "خط سير تنفيذ الطلبات بلا إدخال يدوي",
          ],
          tech: ["ERPNext", "Python", "FastAPI", "Telegram API", "WhatsApp API", "OpenCart"],
          link: "https://order.showsatellite.net/",
          linkLabel: "عرض مباشر",
        },
        {
          id: "erp-opencart-sync",
          tag: "محرك مزامنة ERP",
          title: "محرك مزامنة ERPNext–OpenCart",
          description:
            "محرك مزامنة ثنائي الاتجاه يُبقي كتالوجات المنتجات والأسعار والصور ومستويات المخزون متزامنة تماماً بين ERPNext ومتجر OpenCart.",
          highlights: [
            "مزامنة كاملة لكتالوج المنتجات (الأسماء والأوصاف والفئات)",
            "نشر فوري للأسعار والخصومات",
            "رفع وصور ومزامنة الوسائط",
            "مزامنة فورية للمخزون مع حدود أمان",
            "مزامنة تلقائية مجدولة مع حل تعارضات",
          ],
          tech: ["ERPNext", "Python", "OpenCart API", "PostgreSQL", "REST"],
          videoLink: "https://youtu.be/dLG_WjKm_7c",
          videoLabel: "مشاهدة العرض",
        },
      ],
    },
    contact: {
      badge: "لنتواصل",
      title: "تواصل معي",
      subtitle: "تبحث عن مهندس ERP يتقن Python والمحاسبة؟ دعنا نتحدث.",
      form: {
        name: "اسمك",
        email: "بريدك الإلكتروني",
        subject: "الموضوع",
        message: "رسالتك",
        send: "إرسال الرسالة",
        sending: "جاري الإرسال...",
        success: "تم إرسال الرسالة بنجاح!",
        error: "حدث خطأ. يرجى المحاولة مجدداً.",
        placeholder: {
          name: "أحمد محمد",
          email: "ahmed@company.com",
          subject: "استشارة مشروع ERP",
          message: "مرحباً مروان، أبحث عن مهندس ERP...",
        },
      },
      links: {
        github: "GitHub",
        linkedin: "LinkedIn",
        youtube: "YouTube",
      },
      availability: "متاح للعمل الكامل، العقود، والاستشارات.",
    },
    footer: {
      built: "صُمّم بعناية بواسطة",
      rights: "جميع الحقوق محفوظة.",
    },
  },
};

export type Translations = typeof translations.en;
