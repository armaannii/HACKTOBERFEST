import { LearningResource, MissingSkill, AnalysisResult } from "@/types/career";

/**
 * Curated, verified library of high-quality learning resources across CSE, EEE, BBA, Pharmacy, and Interdisciplinary faculties.
 * All URLs point to established, non-hallucinated platforms with direct access.
 */
export const VERIFIED_RESOURCE_CATALOG: Record<string, LearningResource[]> = {
  // === CSE & SOFTWARE ===
  docker: [
    {
      title: "Docker Getting Started & Container Foundations",
      provider: "Docker Official Docs",
      url: "https://docs.docker.com/get-started/",
      type: "Documentation",
      difficulty: "Beginner",
      duration: "6 hours",
      cost: "Free",
      why_recommended: "Official, interactive introduction to writing Dockerfiles, multi-stage builds, and container networking.",
      practical_exercise: "Containerize a sample Next.js or Node.js web app and PostgreSQL database with a working docker-compose.yml file.",
    },
    {
      title: "Play with Docker Interactive Lab",
      provider: "Docker Community",
      url: "https://labs.playwithdocker.com/",
      type: "Practice",
      difficulty: "Beginner",
      duration: "4 hours",
      cost: "Free",
      why_recommended: "Free browser-based terminal environment to practice clustering, volume mounts, and container commands without installing Docker locally.",
      practical_exercise: "Launch a 3-node container swarm in the browser and deploy a load-balanced Nginx service.",
    },
  ],
  testing: [
    {
      title: "JavaScript and React Testing Guide",
      provider: "Jest & Testing Library Docs",
      url: "https://jestjs.io/docs/getting-started",
      type: "Documentation",
      difficulty: "Intermediate",
      duration: "8 hours",
      cost: "Free",
      why_recommended: "Industry-standard unit and integration testing framework for modern web and backend developers.",
      practical_exercise: "Write 10 automated unit tests for an authentication validator and shopping cart calculation service.",
    },
    {
      title: "Playwright End-to-End Browser Testing",
      provider: "Microsoft Playwright",
      url: "https://playwright.dev/docs/intro",
      type: "Documentation",
      difficulty: "Intermediate",
      duration: "6 hours",
      cost: "Free",
      why_recommended: "Modern, reliable end-to-end testing across Chromium, Firefox, and WebKit with zero flakiness.",
      practical_exercise: "Automate a complete user login flow, navigation sequence, and form submission test in headless browser mode.",
    },
  ],
  redis: [
    {
      title: "Redis for Beginners & Data Structures",
      provider: "Redis University",
      url: "https://university.redis.com/",
      type: "Course",
      difficulty: "Beginner",
      duration: "10 hours",
      cost: "Free",
      why_recommended: "Direct training from Redis creators covering caching patterns, pub/sub messaging, and rate-limiting.",
      practical_exercise: "Build an API rate-limiter that throttles users to 60 requests per minute using Redis keys with TTL expiration.",
    },
  ],
  api_docs: [
    {
      title: "RESTful API Design & OpenAPI Specification",
      provider: "Swagger & OpenAPI",
      url: "https://swagger.io/specification/",
      type: "Documentation",
      difficulty: "Beginner",
      duration: "5 hours",
      cost: "Free",
      why_recommended: "Standard API specification format expected by cross-functional mobile, frontend, and backend engineering teams.",
      practical_exercise: "Create an OpenAPI 3.0 YAML schema documenting request bodies, path parameters, and 200/400/500 responses.",
    },
  ],
  typescript: [
    {
      title: "TypeScript Handbook for Developers",
      provider: "TypeScript Official",
      url: "https://www.typescriptlang.org/docs/handbook/intro.html",
      type: "Documentation",
      difficulty: "Intermediate",
      duration: "12 hours",
      cost: "Free",
      why_recommended: "Complete authoritative guide to static typing, generics, utility types, and strict compiler configs.",
      practical_exercise: "Refactor a vanilla JavaScript utility library to strict TypeScript with zero 'any' casts.",
    },
  ],
  sql: [
    {
      title: "SQLBolt: Learn SQL with Interactive Lessons",
      provider: "SQLBolt",
      url: "https://sqlbolt.com/",
      type: "Practice",
      difficulty: "Beginner",
      duration: "6 hours",
      cost: "Free",
      why_recommended: "Interactive in-browser queries covering SELECT, joins, aggregate functions, and table constraints.",
      practical_exercise: "Complete all 18 interactive SQL queries analyzing multi-table movies and box office datasets.",
    },
  ],

  // === EEE & HARDWARE / EMBEDDED ===
  freertos: [
    {
      title: "Mastering the FreeRTOS Real Time Kernel",
      provider: "FreeRTOS.org Official Guide",
      url: "https://www.freertos.org/Documentation/RTOS_book.html",
      type: "Documentation",
      difficulty: "Intermediate",
      duration: "14 hours",
      cost: "Free",
      why_recommended: "Free open-source textbook by Richard Barry detailing task scheduling, semaphores, queues, and mutexes.",
      practical_exercise: "Simulate 3 FreeRTOS tasks (sensor reader, data logger, display updater) with queue communication and zero deadlock.",
    },
    {
      title: "Introduction to RTOS Video Series",
      provider: "DigiKey & Shawn Hymel",
      url: "https://www.youtube.com/playlist?list=PLEBQazB0HUyQ4hAPU1cJED6t3DU0h34bz",
      type: "Video",
      difficulty: "Beginner",
      duration: "8 hours",
      cost: "Free",
      why_recommended: "Clear, visual explanations of multitasking, priority inversion, and memory management for microcontrollers.",
      practical_exercise: "Create an ESP32 or STM32 firmware task that toggles LEDs based on inter-task queue messages.",
    },
  ],
  kicad: [
    {
      title: "KiCad Getting Started & PCB Layout Guide",
      provider: "KiCad Official Documentation",
      url: "https://docs.kicad.org/8.0/en/getting_started_in_kicad/getting_started_in_kicad.html",
      type: "Documentation",
      difficulty: "Beginner",
      duration: "10 hours",
      cost: "Free",
      why_recommended: "Comprehensive guide to schematic capture, footprint assignment, PCB routing, and Gerber manufacturing files.",
      practical_exercise: "Design a 2-layer power regulator PCB (5V to 3.3V) with ground planes, decoupling capacitors, and DRC verification.",
    },
  ],
  embedded_c: [
    {
      title: "Embedded C Coding Standard & Best Practices",
      provider: "Barr Group",
      url: "https://barrgroup.com/embedded-systems/books-embedded-c-coding-standard",
      type: "Documentation",
      difficulty: "Intermediate",
      duration: "8 hours",
      cost: "Free",
      why_recommended: "The definitive safety-critical C standards used across medical, automotive, and industrial firmware engineering.",
      practical_exercise: "Audit 200 lines of microcontroller code and resolve volatile keyword omissions and buffer overflow risks.",
    },
  ],
  can_bus: [
    {
      title: "Controller Area Network (CAN) Protocol Tutorial",
      provider: "Kvaser Academy",
      url: "https://www.kvaser.com/can-protocol-tutorial/",
      type: "Course",
      difficulty: "Intermediate",
      duration: "6 hours",
      cost: "Free",
      why_recommended: "In-depth breakdown of standard CAN 2.0A/B, arbitration, differential physical signaling, and error frames.",
      practical_exercise: "Configure two microcontroller nodes with MCP2515 CAN transceivers to transmit telemetry packets at 500kbps.",
    },
  ],
  circuits: [
    {
      title: "All About Circuits: Lessons In Electric Circuits",
      provider: "All About Circuits Textbook",
      url: "https://www.allaboutcircuits.com/textbook/",
      type: "Documentation",
      difficulty: "Beginner",
      duration: "20 hours",
      cost: "Free",
      why_recommended: "Rigorous free open textbooks covering DC, AC, semiconductor devices, and digital systems.",
      practical_exercise: "Simulate an active op-amp low-pass Butterworth filter in Falstad or LTspice and plot its frequency response.",
    },
  ],

  // === BBA & BUSINESS / FINANCE ===
  financial_modeling: [
    {
      title: "Free Financial Modeling & Valuation Guide",
      provider: "Corporate Finance Institute (CFI)",
      url: "https://corporatefinanceinstitute.com/resources/excel/free-financial-modeling-guide/",
      type: "Course",
      difficulty: "Intermediate",
      duration: "16 hours",
      cost: "Free",
      why_recommended: "Step-by-step instructions for dynamic 3-statement linking, debt schedules, working capital waterfalls, and DCF.",
      practical_exercise: "Build an Excel model dynamically linking Income Statement, Balance Sheet, and Cash Flow for a 3-year historical period.",
    },
  ],
  power_bi: [
    {
      title: "Microsoft Power BI Data Analyst Training Path",
      provider: "Microsoft Learn",
      url: "https://learn.microsoft.com/en-us/training/paths/data-analytics-microsoft/",
      type: "Course",
      difficulty: "Beginner",
      duration: "18 hours",
      cost: "Free",
      why_recommended: "Official certification curriculum covering data transformation in Power Query, star schema modeling, and DAX measures.",
      practical_exercise: "Build an executive sales dashboard tracking Gross Margin, YoY growth, and regional variances across 12 months.",
    },
  ],
  advanced_sql: [
    {
      title: "SQL for Data Analysis & Business Intelligence",
      provider: "Mode Analytics",
      url: "https://mode.com/sql-tutorial/",
      type: "Practice",
      difficulty: "Intermediate",
      duration: "12 hours",
      cost: "Free",
      why_recommended: "Applied exercises covering SQL window functions (ROW_NUMBER, LAG, LEAD), cohort analysis, and funnel drop-offs.",
      practical_exercise: "Write SQL queries calculating rolling 30-day customer retention and average revenue per user (ARPU).",
    },
  ],
  valuation: [
    {
      title: "Corporate Finance & Valuation Webcasts",
      provider: "Prof. Aswath Damodaran (NYU Stern)",
      url: "https://pages.stern.nyu.edu/~adamodar/New_Home_Page/webcastcfspr24.htm",
      type: "Video",
      difficulty: "Advanced",
      duration: "24 hours",
      cost: "Free",
      why_recommended: "World-renowned lectures from the 'Dean of Valuation' covering cost of capital, cash flow forecasting, and equity value.",
      practical_exercise: "Estimate the Weighted Average Cost of Capital (WACC) and intrinsic value per share for a public listed firm.",
    },
  ],

  // === PHARMACY & LIFE SCIENCES ===
  cgmp: [
    {
      title: "WHO Good Manufacturing Practices (cGMP) for Pharmaceuticals",
      provider: "World Health Organization (WHO)",
      url: "https://www.who.int/teams/health-product-policy-and-standards/standards-and-specifications/gmp",
      type: "Documentation",
      difficulty: "Beginner",
      duration: "12 hours",
      cost: "Free",
      why_recommended: "International benchmark standards for sterile/non-sterile production, HVAC cleanrooms, validation, and batch records.",
      practical_exercise: "Draft an SOP (Standard Operating Procedure) for cleaning validation and environmental monitoring in a solid dosage facility.",
    },
  ],
  ich_guidelines: [
    {
      title: "ICH Quality Guidelines Official Library (Q1 to Q14)",
      provider: "International Council for Harmonisation (ICH)",
      url: "https://www.ich.org/page/quality-guidelines",
      type: "Documentation",
      difficulty: "Intermediate",
      duration: "15 hours",
      cost: "Free",
      why_recommended: "Globally accepted regulatory harmonisation guidelines for stability (Q1), analytical validation (Q2), and impurities (Q3).",
      practical_exercise: "Design an accelerated and long-term stability testing protocol for Climatic Zone IVb (hot and humid) under ICH Q1A(R2).",
    },
  ],
  ectd: [
    {
      title: "Common Technical Document (CTD / eCTD) Specifications",
      provider: "US FDA Guidance & EMA",
      url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/m4-common-technical-document-registration-pharmaceuticals-human-use",
      type: "Documentation",
      difficulty: "Intermediate",
      duration: "10 hours",
      cost: "Free",
      why_recommended: "Official structure for Module 1 through Module 5 filings required by DGDA Bangladesh and international export authorities.",
      practical_exercise: "Structure an outline for CTD Module 3 (Quality) for an oral solid generic product including container-closure controls.",
    },
  ],
  pharmacovigilance: [
    {
      title: "Pharmacovigilance Fundamentals & ADR Monitoring",
      provider: "Uppsala Monitoring Centre & WHO",
      url: "https://who-umc.org/",
      type: "Course",
      difficulty: "Intermediate",
      duration: "12 hours",
      cost: "Free",
      why_recommended: "Essential training on adverse drug reaction (ADR) detection, causality assessment, and Periodic Safety Update Reports (PSUR).",
      practical_exercise: "Complete a mock CIOMS-I adverse reaction form and evaluate causality using Naranjo algorithm scoring.",
    },
  ],
  chromatography: [
    {
      title: "HPLC Technical Learning & Column Troubleshooting",
      provider: "Shimadzu & Waters Learning Hubs",
      url: "https://www.waters.com/waters/en_US/Beginner%27s-Guide-to-Liquid-Chromatography/nav.htm?cid=10068323",
      type: "Documentation",
      difficulty: "Beginner",
      duration: "8 hours",
      cost: "Free",
      why_recommended: "Clear interactive guide to mobile phase selection, retention factors, resolution calculations, and peak tailing.",
      practical_exercise: "Calculate theoretical plates (N) and resolution (Rs) from a sample paracetamol chromatogram.",
    },
  ],

  // === INTERDISCIPLINARY / PRODUCT / UI ===
  product_management: [
    {
      title: "Product Discovery & PRD Mastery",
      provider: "Product School & Atlassian Agile",
      url: "https://productschool.com/free-resources",
      type: "Documentation",
      difficulty: "Beginner",
      duration: "8 hours",
      cost: "Free",
      why_recommended: "Practical templates for authoring Product Requirement Documents (PRDs), user journeys, and MVP scopes.",
      practical_exercise: "Author a 4-page PRD for a mobile application including problem definition, metrics, and acceptance criteria.",
    },
  ],
  ui_design: [
    {
      title: "Figma Design & Wireframing Essentials",
      provider: "Figma Official Learning Hub",
      url: "https://help.figma.com/hc/en-us/categories/360002042553-Figma-design",
      type: "Documentation",
      difficulty: "Beginner",
      duration: "8 hours",
      cost: "Free",
      why_recommended: "Industry standard for UI design, components, auto-layout, and interactive clickable prototypes.",
      practical_exercise: "Design a responsive 3-screen mobile checkout flow using Figma auto-layout and variant states.",
    },
  ],
};

/**
 * Intelligently matches a skill name and department to verified learning resources.
 */
export function getResourcesForSkill(skillName: string, department?: string): LearningResource[] {
  const norm = (skillName || "").toLowerCase();

  // Match CSE
  if (norm.includes("docker") || norm.includes("container") || norm.includes("kubernetes")) {
    return VERIFIED_RESOURCE_CATALOG.docker;
  }
  if (norm.includes("test") || norm.includes("jest") || norm.includes("playwright") || norm.includes("unit")) {
    return VERIFIED_RESOURCE_CATALOG.testing;
  }
  if (norm.includes("redis") || norm.includes("cache") || norm.includes("queue")) {
    return VERIFIED_RESOURCE_CATALOG.redis;
  }
  if (norm.includes("api") || norm.includes("swagger") || norm.includes("openapi") || norm.includes("rest")) {
    return VERIFIED_RESOURCE_CATALOG.api_docs;
  }
  if (norm.includes("typescript") || norm.includes("javascript") || norm.includes("type")) {
    return VERIFIED_RESOURCE_CATALOG.typescript;
  }
  if (norm.includes("sql") || norm.includes("database") || norm.includes("postgres") || norm.includes("mongo")) {
    return VERIFIED_RESOURCE_CATALOG.sql;
  }

  // Match EEE
  if (norm.includes("freertos") || norm.includes("rtos") || norm.includes("real-time") || norm.includes("multitask")) {
    return VERIFIED_RESOURCE_CATALOG.freertos;
  }
  if (norm.includes("kicad") || norm.includes("pcb") || norm.includes("schematic") || norm.includes("routing")) {
    return VERIFIED_RESOURCE_CATALOG.kicad;
  }
  if (norm.includes("embedded") || norm.includes("firmware") || norm.includes("microcontroller") || norm.includes("stm32")) {
    return VERIFIED_RESOURCE_CATALOG.embedded_c;
  }
  if (norm.includes("can") || norm.includes("protocol") || norm.includes("spi") || norm.includes("i2c")) {
    return VERIFIED_RESOURCE_CATALOG.can_bus;
  }
  if (norm.includes("circuit") || norm.includes("analog") || norm.includes("power") || norm.includes("op-amp")) {
    return VERIFIED_RESOURCE_CATALOG.circuits;
  }

  // Match BBA
  if (norm.includes("model") || norm.includes("financial") || norm.includes("dcf") || norm.includes("excel")) {
    return VERIFIED_RESOURCE_CATALOG.financial_modeling;
  }
  if (norm.includes("power bi") || norm.includes("bi") || norm.includes("dashboard") || norm.includes("tableau")) {
    return VERIFIED_RESOURCE_CATALOG.power_bi;
  }
  if (norm.includes("valuation") || norm.includes("equity") || norm.includes("ratio") || norm.includes("cfa")) {
    return VERIFIED_RESOURCE_CATALOG.valuation;
  }
  if (norm.includes("analytics") || norm.includes("window") || norm.includes("data query")) {
    return VERIFIED_RESOURCE_CATALOG.advanced_sql;
  }

  // Match Pharmacy
  if (norm.includes("cgmp") || norm.includes("gmp") || norm.includes("quality assurance") || norm.includes("sop")) {
    return VERIFIED_RESOURCE_CATALOG.cgmp;
  }
  if (norm.includes("ich") || norm.includes("guideline") || norm.includes("stability") || norm.includes("dgda")) {
    return VERIFIED_RESOURCE_CATALOG.ich_guidelines;
  }
  if (norm.includes("ctd") || norm.includes("ectd") || norm.includes("dossier") || norm.includes("regulatory")) {
    return VERIFIED_RESOURCE_CATALOG.ectd;
  }
  if (norm.includes("pharmacovigilance") || norm.includes("safety") || norm.includes("adr") || norm.includes("psur")) {
    return VERIFIED_RESOURCE_CATALOG.pharmacovigilance;
  }
  if (norm.includes("hplc") || norm.includes("chromatograph") || norm.includes("spectro") || norm.includes("analytical")) {
    return VERIFIED_RESOURCE_CATALOG.chromatography;
  }

  // Interdisciplinary fallback
  if (norm.includes("product") || norm.includes("prd") || norm.includes("agile") || norm.includes("scrum")) {
    return VERIFIED_RESOURCE_CATALOG.product_management;
  }
  if (norm.includes("ui") || norm.includes("ux") || norm.includes("figma") || norm.includes("design")) {
    return VERIFIED_RESOURCE_CATALOG.ui_design;
  }

  // Department-aware default fallback
  if (department === "EEE") return VERIFIED_RESOURCE_CATALOG.embedded_c;
  if (department === "BBA") return VERIFIED_RESOURCE_CATALOG.financial_modeling;
  if (department === "Pharmacy") return VERIFIED_RESOURCE_CATALOG.ich_guidelines;
  return VERIFIED_RESOURCE_CATALOG.docker;
}

/**
 * Enriches an AnalysisResult to ensure every missing skill has populated, verified learning resources
 * with practical exercises and direct URLs.
 */
export function enrichAnalysisWithResources(
  result: AnalysisResult,
  department: string
): AnalysisResult {
  const enrichedSkills: MissingSkill[] = result.missing_skills.map((skill) => {
    const existing = skill.learning_resources || [];
    if (existing.length > 0) {
      return skill;
    }
    const matched = getResourcesForSkill(skill.skill, department);
    return {
      ...skill,
      learning_resources: matched,
    };
  });

  // Also enrich the 30-day plan weeks with resources if missing
  const enrichedWeeks = result.next_30_days.map((week, idx) => {
    const existingRes = week.recommended_resources || [];
    let weekResources = existingRes;
    if (weekResources.length === 0 && enrichedSkills.length > 0) {
      const targetSkill = enrichedSkills[idx % enrichedSkills.length];
      weekResources = targetSkill?.learning_resources ? targetSkill.learning_resources.slice(0, 1) : [];
    }
    return {
      ...week,
      recommended_resources: weekResources,
      mini_project: week.mini_project || `Week ${week.week} Portfolio Deliverable: Implement verified practice exercise.`,
      estimated_study_hours: week.estimated_study_hours || 15,
    };
  });

  return {
    ...result,
    missing_skills: enrichedSkills,
    next_30_days: enrichedWeeks,
  };
}
