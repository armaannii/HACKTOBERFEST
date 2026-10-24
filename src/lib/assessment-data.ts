import {
  QuizQuestion,
  InterviewQuestion,
  InterviewFeedback,
  RecommendedProject,
} from "@/types/career";

/**
 * Curated Question Bank for the Skill Assessment Lab across CSE, EEE, BBA, and Pharmacy.
 */
export const ASSESSMENT_QUESTION_BANK: Record<string, QuizQuestion[]> = {
  // CSE / Software
  docker: [
    {
      id: "q-docker-1",
      skill: "Docker & Containerization",
      scenario: "Your team is deploying a Next.js application with PostgreSQL. The developer wants to ensure the database container starts and finishes running health checks before the web server container attempts connection.",
      question: "Which Docker Compose directive and approach best ensures the Next.js service waits for PostgreSQL to be genuinely ready?",
      options: [
        "Use 'depends_on' with condition: service_healthy and a pg_isready healthcheck",
        "Just use 'depends_on: [db]' because it automatically waits for the database socket",
        "Add a 60-second sleep command inside the Next.js package.json start script",
        "Run the database and frontend in the same container using a supervisord script",
      ],
      correctAnswerIndex: 0,
      explanation:
        "By default, 'depends_on' only waits for the container to start, not for PostgreSQL to accept TCP connections. Defining a healthcheck (e.g. `pg_isready -U user`) and using `condition: service_healthy` ensures true readiness.",
      recommendedResource: {
        title: "Docker Compose Healthcheck Specification",
        url: "https://docs.docker.com/compose/compose-file/compose-file-v3/#healthcheck",
      },
    },
    {
      id: "q-docker-2",
      skill: "Docker & Containerization",
      question: "Why are multi-stage Docker builds recommended for production Node.js and Next.js applications?",
      options: [
        "They make container runtime 10x faster by bypassing Linux namespaces",
        "They separate build dependencies (compilers, devDependencies) from the final minimal production image",
        "They allow running both Windows and Linux binaries simultaneously",
        "They automatically encrypt database credentials inside the container layers",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Multi-stage builds leave behind bulky build tooling (node_modules devDependencies, TypeScript compiler, package managers) in intermediary stages, producing a lightweight, secure production image of minimal size.",
      recommendedResource: {
        title: "Multi-stage builds in Docker",
        url: "https://docs.docker.com/build/building/multi-stage/",
      },
    },
  ],
  testing: [
    {
      id: "q-test-1",
      skill: "Automated Testing (Jest / Playwright)",
      scenario: "You are testing an asynchronous API route handler that queries an external payment provider (bKash/Stripe) sandbox.",
      question: "In unit testing with Jest, what is the best practice for handling this third-party HTTP call?",
      options: [
        "Call the live sandbox API during every automated test run",
        "Mock the HTTP client module (e.g., jest.mock('axios')) to return deterministic responses without making live network calls",
        "Disable tests in CI/CD pipeline and run them only manually on staging",
        "Wrap the test in a try-catch block and ignore errors if network fails",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Unit tests must be fast, deterministic, and isolated from network volatility. Mocking HTTP boundaries ensures tests verify business logic without external dependencies or sandbox rate limits.",
      recommendedResource: {
        title: "Jest Mock Functions & Modules",
        url: "https://jestjs.io/docs/mock-functions",
      },
    },
  ],
  redis: [
    {
      id: "q-redis-1",
      skill: "Redis Caching & Async Jobs",
      question: "Which Redis data structure and command is most suitable for implementing an API rate-limiter that allows 60 requests per IP per minute?",
      options: [
        "Redis Hash with HSET and HGETALL",
        "Redis String with INCR and EXPIRE (or EXAT)",
        "Redis Pub/Sub channels with PUBLISH",
        "Redis Stream with XADD and XREAD",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Atomic `INCR` incrementing a key (e.g. `rate:ip:minute`) followed by `EXPIRE key 60` on the first hit is the classic, high-performance pattern for sliding/fixed-window rate limiting.",
      recommendedResource: {
        title: "Redis Pattern: Rate Limiting",
        url: "https://redis.io/glossary/rate-limiting/",
      },
    },
  ],

  // EEE / Embedded
  freertos: [
    {
      id: "q-rtos-1",
      skill: "FreeRTOS & Embedded Systems",
      scenario: "In an STM32 FreeRTOS project, a low-priority telemetry task holds a mutex while a high-priority motor control task requests the same mutex. Meanwhile, a medium-priority logging task keeps preempting the low-priority task.",
      question: "What phenomenon is occurring, and how does FreeRTOS mitigate it?",
      options: [
        "Stack Overflow; mitigated by increasing configMINIMAL_STACK_SIZE",
        "Priority Inversion; mitigated by Priority Inheritance built into FreeRTOS mutexes",
        "Memory Fragmentation; mitigated by heap_4.c dynamic allocation",
        "Race Condition; mitigated by disabling interrupts with taskENTER_CRITICAL()",
      ],
      correctAnswerIndex: 1,
      explanation:
        "This classic problem is Priority Inversion. FreeRTOS mutexes automatically implement Priority Inheritance, temporarily boosting the low-priority holder's priority to match the high-priority requester.",
      recommendedResource: {
        title: "FreeRTOS Mutexes & Priority Inheritance",
        url: "https://www.freertos.org/Documentation/RTOS_book.html",
      },
    },
    {
      id: "q-rtos-2",
      skill: "FreeRTOS & Embedded Systems",
      question: "Why should you NEVER call `xQueueSend()` inside an Interrupt Service Routine (ISR) in FreeRTOS?",
      options: [
        "Because queues cannot hold binary data",
        "Because standard queue functions can block/yield, which is illegal in an interrupt context; `xQueueSendFromISR()` must be used instead",
        "Because interrupts run at lower clock frequencies than FreeRTOS tasks",
        "Because queues consume flash memory rather than RAM in ARM Cortex-M",
      ],
      correctAnswerIndex: 1,
      explanation:
        "ISRs have no task context and cannot block. FreeRTOS provides dedicated `...FromISR` APIs that never block and safely communicate whether a context switch is required upon interrupt exit.",
      recommendedResource: {
        title: "FreeRTOS Queues from ISR",
        url: "https://www.freertos.org/Documentation/RTOS_book.html",
      },
    },
  ],
  kicad: [
    {
      id: "q-kicad-1",
      skill: "KiCad PCB Design",
      question: "When routing a 2-layer PCB in KiCad with mixed digital and analog circuits, what is the best practice for the bottom layer?",
      options: [
        "Route high-speed clock traces exclusively on the bottom layer with no ground reference",
        "Maintain a continuous, unbroken ground plane to provide low-impedance return paths and shield electromagnetic interference",
        "Remove copper completely on the bottom layer to reduce board capacitance",
        "Fill the entire bottom layer with +5V power plane traces",
      ],
      correctAnswerIndex: 1,
      explanation:
        "A continuous ground plane minimizes ground loops, provides direct return current paths beneath signal traces, and suppresses EMI and crosstalk.",
      recommendedResource: {
        title: "KiCad PCB Design Best Practices",
        url: "https://docs.kicad.org/8.0/en/getting_started_in_kicad/getting_started_in_kicad.html",
      },
    },
  ],

  // BBA / Finance
  financial_modeling: [
    {
      id: "q-fin-1",
      skill: "3-Statement Financial Modeling",
      scenario: "A company purchases a new delivery truck for 1,000,000 BDT in cash with a 5-year useful life and zero salvage value using straight-line depreciation (tax rate 25%).",
      question: "How does the first year's 200,000 BDT depreciation expense affect the 3 financial statements?",
      options: [
        "Income Statement: Net Income down 150,000 BDT; Cash Flow Statement: Operating Cash Flow up 50,000 BDT (tax shield); Balance Sheet: Cash up 50k, PP&E down 200k, Retained Earnings down 150k",
        "Income Statement: Net Income down 200,000 BDT; Cash Flow: Cash down 200,000 BDT",
        "Income Statement: No change; Cash Flow: Investing Cash Flow down 200,000 BDT",
        "Balance Sheet: PP&E increases by 200,000 BDT due to capital appreciation",
      ],
      correctAnswerIndex: 0,
      explanation:
        "Depreciation of 200k reduces pre-tax income by 200k. At 25% tax, taxes decrease by 50k, so Net Income falls by 150k. On the Cash Flow Statement, non-cash depreciation (+200k) is added back to Net Income (-150k), yielding a net +50k cash inflow from the tax shield.",
      recommendedResource: {
        title: "CFI 3-Statement Linking Guide",
        url: "https://corporatefinanceinstitute.com/resources/excel/free-financial-modeling-guide/",
      },
    },
    {
      id: "q-fin-2",
      skill: "Financial Valuation & DCF",
      question: "In a Discounted Cash Flow (DCF) model, what is the difference between Unlevered Free Cash Flow (FCFF) and Levered Free Cash Flow (FCFE)?",
      options: [
        "FCFF is cash available to both equity holders and debt holders before interest; FCFE is cash available exclusively to equity holders after debt service",
        "FCFF includes inventory while FCFE only counts accounts receivable",
        "FCFE is discounted using WACC, whereas FCFF is discounted using Cost of Equity",
        "There is no difference; they are interchangeable terms across international accounting",
      ],
      correctAnswerIndex: 0,
      explanation:
        "Free Cash Flow to Firm (FCFF) represents cash before debt payments and is discounted at WACC to obtain Enterprise Value. Free Cash Flow to Equity (FCFE) is net of interest and debt repayments, discounted at Cost of Equity to find Equity Value directly.",
      recommendedResource: {
        title: "Aswath Damodaran Valuation Lectures",
        url: "https://pages.stern.nyu.edu/~adamodar/New_Home_Page/webcastcfspr24.htm",
      },
    },
  ],

  // Pharmacy / Regulatory
  pharmacy_reg: [
    {
      id: "q-pharm-1",
      skill: "ICH Guidelines & Regulatory Affairs",
      scenario: "A pharmaceutical manufacturer in Dhaka is preparing export registration for a generic oral solid tablet to be marketed in Southeast Asia (Zone IVb: 30°C / 75% RH).",
      question: "According to ICH Q1A(R2) guidelines, what are the standard accelerated stability testing storage conditions and minimum duration?",
      options: [
        "25°C ± 2°C / 60% RH ± 5% RH for 12 months",
        "40°C ± 2°C / 75% RH ± 5% RH for 6 months with testing at 0, 3, and 6 months",
        "50°C ± 2°C / 80% RH ± 5% RH for 24 months",
        "Refrigerated conditions at 5°C ± 3°C for 3 months",
      ],
      correctAnswerIndex: 1,
      explanation:
        "ICH Q1A(R2) defines accelerated stability conditions as 40°C ± 2°C with 75% RH ± 5% RH for a minimum of 6 months. For hot & humid Zone IVb countries, long-term testing is performed at 30°C ± 2°C / 75% RH.",
      recommendedResource: {
        title: "ICH Q1A(R2) Stability Guideline",
        url: "https://www.ich.org/page/quality-guidelines",
      },
    },
    {
      id: "q-pharm-2",
      skill: "Common Technical Document (CTD)",
      question: "In the 5-module ICH CTD dossier structure, in which module does the Chemical, Manufacturing, and Quality Controls (CMC) documentation reside?",
      options: [
        "Module 1 (Regional Administrative Information)",
        "Module 2 (Common Technical Document Summaries)",
        "Module 3 (Quality)",
        "Module 5 (Clinical Study Reports)",
      ],
      correctAnswerIndex: 2,
      explanation:
        "Module 3 is dedicated to Quality (CMC data covering Drug Substance 3.2.S and Drug Product 3.2.P, including batch analysis, process validation, and stability reports).",
      recommendedResource: {
        title: "US FDA CTD Guidance for Industry",
        url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/m4-common-technical-document-registration-pharmaceuticals-human-use",
      },
    },
  ],
};

/**
 * Returns assessment questions tailored to the student's department and missing skills.
 */
export function getQuizForDepartment(department: string, missingSkills: string[]): QuizQuestion[] {
  const normDept = (department || "").toUpperCase();
  const questions: QuizQuestion[] = [];

  if (normDept === "CSE") {
    questions.push(...ASSESSMENT_QUESTION_BANK.docker);
    questions.push(...ASSESSMENT_QUESTION_BANK.testing);
    questions.push(...ASSESSMENT_QUESTION_BANK.redis);
  } else if (normDept === "EEE") {
    questions.push(...ASSESSMENT_QUESTION_BANK.freertos);
    questions.push(...ASSESSMENT_QUESTION_BANK.kicad);
  } else if (normDept === "BBA") {
    questions.push(...ASSESSMENT_QUESTION_BANK.financial_modeling);
  } else if (normDept === "PHARMACY") {
    questions.push(...ASSESSMENT_QUESTION_BANK.pharmacy_reg);
  } else {
    // Interdisciplinary / Other
    questions.push(...ASSESSMENT_QUESTION_BANK.docker.slice(0, 1));
    questions.push(...ASSESSMENT_QUESTION_BANK.financial_modeling.slice(0, 1));
    questions.push(...ASSESSMENT_QUESTION_BANK.testing.slice(0, 1));
  }

  return questions;
}

/**
 * Curated Mock Interview Questions Bank
 */
export const MOCK_INTERVIEW_BANK: Record<string, Record<string, InterviewQuestion[]>> = {
  CSE: {
    Technical: [
      {
        id: "cse-t-1",
        role: "Full-Stack Developer",
        type: "Technical",
        question: "Explain the difference between client-side rendering (CSR) and server-side rendering (SSR) in Next.js. When would you choose one over the other?",
        context: "Common architectural screening question for entry-level React/Next.js roles.",
        evaluationCriteria: [
          "Mentions initial page load performance and TTFB (Time to First Byte)",
          "Highlights SEO advantages of SSR for search engine crawlers",
          "Mentions dynamic interactivity and client state management for CSR",
          "Gives practical examples (e.g. blog/e-commerce catalog for SSR, user dashboard/canvas for CSR)",
        ],
        sampleAnswer:
          "In Next.js, Server-Side Rendering (SSR) generates the HTML for each request on the server, providing fast First Contentful Paint and optimal SEO because search engines receive fully populated content. In contrast, Client-Side Rendering (CSR) serves a bare HTML shell and executes JavaScript in the browser to fetch data. I would choose SSR for public, content-heavy, or SEO-critical pages (like e-commerce product catalogs or news articles), and CSR for private, dynamic, highly interactive dashboards where SEO is irrelevant and fast in-app transitions matter.",
        followUpQuestion: "How do React Server Components (RSC) in Next.js App Router bridge the gap between traditional SSR and client interactivity?",
      },
      {
        id: "cse-t-2",
        role: "Full-Stack Developer",
        type: "Technical",
        question: "How do you protect a REST API against SQL Injection and Cross-Site Scripting (XSS)?",
        context: "Essential security qualification question for junior backend developers.",
        evaluationCriteria: [
          "Mentions parameterized queries / prepared statements for SQL injection",
          "Explains input sanitization and output escaping for XSS",
          "Mentions using ORMs/query builders safely (Prisma, TypeORM, parameterized pg queries)",
          "Mentions Content Security Policy (CSP) headers and HttpOnly cookies for JWT tokens",
        ],
        sampleAnswer:
          "To prevent SQL injection, never concatenate untrusted user input directly into SQL strings. Instead, use parameterized queries or prepared statements through an ORM like Prisma or PostgreSQL parameterized placeholders ($1, $2), which separate query structure from user data. To mitigate XSS, sanitize and HTML-encode any user data rendered in the DOM, implement a strong Content Security Policy (CSP) header, and store sensitive authentication tokens (like refresh tokens) in HttpOnly, Secure cookies rather than accessible localStorage.",
        followUpQuestion: "What is the difference between Reflected XSS and Stored XSS?",
      },
    ],
    Behavioral: [
      {
        id: "cse-b-1",
        role: "Software Engineering Intern",
        type: "Behavioral",
        question: "Tell me about a time when you encountered a frustrating technical bug or roadblock during a university project. How did you diagnose and resolve it?",
        context: "Behavioral evaluation using the STAR framework (Situation, Task, Action, Result).",
        evaluationCriteria: [
          "Follows STAR framework clearly",
          "Demonstrates systematic debugging (logs, breakpoints, isolating variables) rather than random trial-and-error",
          "Shows collaboration or asking senior mentors/documentation after initial research",
          "Mentions post-resolution reflection (e.g. adding a test case to prevent regression)",
        ],
        sampleAnswer:
          "During my DhakaCart e-commerce project (Situation), our checkout failed intermittently with 500 errors when users updated quantities during bKash sandbox payment initiation (Task). Instead of guessing, I enabled verbose server logging and simulated concurrent requests with Postman to isolate the issue. I discovered a race condition in our PostgreSQL transaction where simultaneous updates read stale inventory (Action). I wrapped the checkout in a database transaction with row-level locking (SELECT FOR UPDATE) and added an automated Jest integration test to simulate concurrency. As a result, checkout errors dropped to zero and the project was successfully defended (Result).",
        followUpQuestion: "What did that experience teach you about designing concurrent backend systems?",
      },
    ],
    "Role-specific": [
      {
        id: "cse-r-1",
        role: "Full-Stack Developer",
        type: "Role-specific",
        question: "If our web application experiences a sudden 10x traffic spike from a social media promotion in Bangladesh, what are the first three architectural bottlenecks you would inspect?",
        context: "Real-world scalability intuition test for junior full-stack developers.",
        evaluationCriteria: [
          "Database connection pool exhaustion and unindexed query bottlenecks",
          "Static asset delivery and lack of CDN/edge caching",
          "Synchronous external API calls (e.g. SMS gateways or payment APIs) blocking Node.js event loop",
        ],
        sampleAnswer:
          "First, I would inspect the database connection pool and slow query log: unindexed queries or connection pool exhaustion are the most common failure points. Second, I would check static asset caching: ensuring images and JS bundles are served through a CDN (like Cloudflare) rather than directly from the Node server. Third, I would check synchronous I/O operations blocking the event loop, offloading time-consuming tasks like confirmation emails or SMS notifications to an asynchronous background worker queue like BullMQ backed by Redis.",
      },
    ],
  },
  EEE: {
    Technical: [
      {
        id: "eee-t-1",
        role: "Embedded Systems Engineer",
        type: "Technical",
        question: "Explain the difference between I2C and SPI communication protocols. Under what circumstances would you choose SPI over I2C?",
        context: "Core hardware communication protocol interview question.",
        evaluationCriteria: [
          "Identifies wire count: I2C (2 wires: SDA, SCL) vs SPI (4 wires: MOSI, MISO, SCK, CS)",
          "Compares speed: SPI is full-duplex and significantly faster (20-50MHz+) vs I2C (100kHz-3.4MHz)",
          "Compares complexity: I2C supports multi-master and addressing; SPI uses separate Chip Select pins",
          "Recommends SPI for high-bandwidth displays, SD cards, and high-speed ADCs",
        ],
        sampleAnswer:
          "I2C is a 2-wire half-duplex bus using SDA and SCL with software addressing, making it pin-efficient when connecting many low-speed sensors (accelerometers, temperature sensors). SPI is a 4-wire full-duplex protocol (MOSI, MISO, SCK, and dedicated Chip Select lines per slave) capable of much higher data rates (up to 50MHz+). I would choose SPI when high throughput is mandatory—such as driving color graphic TFT displays, recording to SD cards, or sampling high-speed audio ADCs.",
        followUpQuestion: "What hardware component is required on both I2C bus lines for reliable signaling?",
      },
    ],
    Behavioral: [
      {
        id: "eee-b-1",
        role: "Hardware R&D Intern",
        type: "Behavioral",
        question: "Describe a project where you had to work with limited hardware resources or budget constraints. How did you prioritize components?",
        context: "Resourcefulness and practical engineering trade-off assessment.",
        evaluationCriteria: [
          "Demonstrates BOM (Bill of Materials) cost consciousness",
          "Explains component sourcing in Bangladesh (local markets vs international orders)",
          "Shows practical testing and validation on breadboard or prototype PCB",
        ],
        sampleAnswer:
          "For our university solar telemetry project, we needed a microcontroller with multiple ADCs and low sleep current under a strict 2,500 BDT budget. Rather than purchasing an expensive development kit, I selected an ESP32 module sourced locally in Dhaka, paired it with passive components hand-soldered onto a custom 2-layer PCB designed in KiCad. By leveraging deep-sleep mode and batching LoRa transmissions, we achieved 6 months of battery life on a recycled lithium cell.",
      },
    ],
  },
  BBA: {
    Technical: [
      {
        id: "bba-t-1",
        role: "Financial Analyst",
        type: "Technical",
        question: "Walk me through how a 10% increase in accounts receivable affects working capital and operating cash flow.",
        context: "Core corporate finance and financial statement intuition test.",
        evaluationCriteria: [
          "Identifies that higher accounts receivable increases non-cash working capital",
          "Explains that cash has not yet been collected from customers",
          "Concludes that Operating Cash Flow decreases by the same amount on the cash flow statement",
        ],
        sampleAnswer:
          "An increase in Accounts Receivable means the company made sales on credit but has not yet collected the cash from customers. Therefore, while revenue increases on the Income Statement, non-cash working capital increases. On the Cash Flow Statement under the Indirect Method, an increase in current assets is subtracted from Net Income, causing Operating Cash Flow to decrease by the net change in accounts receivable.",
        followUpQuestion: "What metric would you calculate to assess whether receivables are aging dangerously?",
      },
    ],
    Behavioral: [
      {
        id: "bba-b-1",
        role: "Finance Management Trainee",
        type: "Behavioral",
        question: "Tell me about a time when you presented data-driven recommendations to teammates or stakeholders who initially disagreed with your perspective.",
        context: "Commercial persuasion, stakeholder communication, and analytical conviction.",
        evaluationCriteria: [
          "Uses objective data, charts, and financial models to ground the discussion",
          "Listens empathetically to counter-arguments and commercial concerns",
          "Achieves team consensus or delivers measurable impact",
        ],
        sampleAnswer:
          "During a national business case competition, my team initially wanted to recommend a high-budget national TV ad campaign. I built a dynamic sensitivity model in Excel showing that given the brand's low gross margins in Tier-2 cities, the customer acquisition cost (CAC) would result in a negative ROI over 18 months. I presented a comparative waterfall chart demonstrating that shifting 60% of budget into targeted regional activations and retail trade promotions lowered payback time to 7 months. The team unanimously adopted the data-backed strategy, and we advanced to the semi-finals.",
      },
    ],
  },
  Pharmacy: {
    Technical: [
      {
        id: "pharm-t-1",
        role: "Regulatory Affairs Associate",
        type: "Technical",
        question: "What is the regulatory difference between a Variation filing and a New Drug Application (NDA) at the DGDA?",
        context: "Regulatory filing procedure and lifecycle management qualification.",
        evaluationCriteria: [
          "Defines NDA as initial marketing authorization for a new formulation or active entity",
          "Defines Variation as an approved post-marketing change (Major vs Minor)",
          "Gives examples of variations (change of manufacturing site, shelf-life extension, packaging material)",
        ],
        sampleAnswer:
          "A New Drug Application (NDA) is submitted to obtain initial regulatory marketing authorization for a drug product that has never been registered in Bangladesh, requiring full preclinical, clinical, and CMC dossiers. A Variation is a post-marketing approval request submitted to DGDA for changes to an already licensed pharmaceutical product. Variations are categorized as Minor (Type IA/IB like routine analytical updates or shelf-life extensions) or Major (Type II like changing the active pharmaceutical ingredient synthesis route or primary manufacturing site).",
        followUpQuestion: "What documentation must accompany a shelf-life extension variation filing?",
      },
    ],
    Behavioral: [
      {
        id: "pharm-b-1",
        role: "Quality Assurance Executive",
        type: "Behavioral",
        question: "If an in-process batch of tablets fails a hardness test on the manufacturing floor, what immediate actions do you take according to cGMP protocol?",
        context: "Data integrity, deviation management, and cGMP compliance mindset.",
        evaluationCriteria: [
          "Immediately halts compression machine to prevent defective units from multiplying",
          "Quarantines affected batch and logs formal Out-of-Specification (OOS) / Deviation report",
          "Conducts root cause analysis (granulation moisture, punch wear, compression force)",
          "Never alters records or blends defective tablets without formal investigation approval",
        ],
        sampleAnswer:
          "According to cGMP, I would immediately instruct the operator to halt the tablet press to prevent producing further non-conforming units. The affected containers are quarantined with clear rejection/hold labeling. I would immediately log a formal Deviation and Out-of-Specification (OOS) investigation report with QA management. Together with production and formulation engineers, we would investigate root causes—inspecting granulation moisture content, binder distribution, and punch pressure calibration—ensuring no corrective blending occurs without QA approval.",
      },
    ],
  },
};

/**
 * Returns interview questions matching role and interview category.
 */
export function getInterviewQuestionsForRole(
  role: string,
  category: "Technical" | "Behavioral" | "Role-specific" = "Technical"
): InterviewQuestion[] {
  const normRole = (role || "").toLowerCase();

  if (normRole.includes("full-stack") || normRole.includes("developer") || normRole.includes("software") || normRole.includes("frontend") || normRole.includes("backend")) {
    return MOCK_INTERVIEW_BANK.CSE[category] || MOCK_INTERVIEW_BANK.CSE.Technical;
  }
  if (normRole.includes("embedded") || normRole.includes("hardware") || normRole.includes("electronic") || normRole.includes("electrical")) {
    return MOCK_INTERVIEW_BANK.EEE[category] || MOCK_INTERVIEW_BANK.EEE.Technical;
  }
  if (normRole.includes("financial") || normRole.includes("analyst") || normRole.includes("business") || normRole.includes("trainee")) {
    return MOCK_INTERVIEW_BANK.BBA[category] || MOCK_INTERVIEW_BANK.BBA.Technical;
  }
  if (normRole.includes("pharmacist") || normRole.includes("regulatory") || normRole.includes("quality") || normRole.includes("pharma")) {
    return MOCK_INTERVIEW_BANK.Pharmacy[category] || MOCK_INTERVIEW_BANK.Pharmacy.Technical;
  }

  // Fallback
  return MOCK_INTERVIEW_BANK.CSE[category] || MOCK_INTERVIEW_BANK.CSE.Technical;
}

/**
 * Instant local AI answer evaluation logic.
 */
export function evaluateMockAnswer(question: InterviewQuestion, answer: string): InterviewFeedback {
  const clean = (answer || "").trim();
  const wordCount = clean.split(/\s+/).filter(Boolean).length;

  if (wordCount < 10) {
    return {
      score: 35,
      strengths: ["Attempted to answer the question."],
      weaknesses: [
        "Answer is too brief. Technical and behavioral interviewers look for structured explanations with real examples.",
      ],
      improvedAnswer: question.sampleAnswer,
      keyConcepts: question.evaluationCriteria,
      followUpQuestion: question.followUpQuestion || "Can you elaborate on a practical scenario where you applied this?",
    };
  }

  // Count matched keywords from evaluation criteria
  let criteriaMatches = 0;
  question.evaluationCriteria.forEach((crit) => {
    const keywords = crit.toLowerCase().split(/\s+/).filter((w) => w.length > 4);
    const hasMatch = keywords.some((kw) => clean.toLowerCase().includes(kw));
    if (hasMatch) criteriaMatches++;
  });

  const baseScore = Math.min(95, Math.max(55, Math.round(50 + (criteriaMatches / question.evaluationCriteria.length) * 35 + (wordCount > 40 ? 10 : 0))));

  return {
    score: baseScore,
    strengths: [
      wordCount >= 40 ? "Good depth and structured response length." : "Addressed core premise of the question directly.",
      criteriaMatches > 0 ? "Demonstrated technical vocabulary and domain relevance." : "Clear communication flow.",
    ],
    weaknesses: [
      criteriaMatches < question.evaluationCriteria.length ? "Could deepen focus on edge cases and measurable project impact." : "Consider adding quantifiable metrics to heighten credibility.",
    ],
    improvedAnswer: question.sampleAnswer,
    keyConcepts: question.evaluationCriteria,
    followUpQuestion: question.followUpQuestion,
  };
}

/**
 * AI Portfolio Project Blueprints with structured architecture, milestones, testing checklists, and README templates.
 */
export const DEPARTMENT_PROJECT_BLUEPRINTS: Record<string, RecommendedProject[]> = {
  CSE: [
    {
      title: "DhakaMart — High-Concurrency E-Commerce Microservice with bKash Sandbox & Redis",
      difficulty: "Advanced",
      skills_demonstrated: [
        "Next.js 16 App Router",
        "TypeScript",
        "PostgreSQL (Prisma ORM)",
        "Redis Caching",
        "Docker Compose",
        "bKash Sandbox API",
        "Jest & Supertest",
      ],
      deliverables: [
        "Production-ready Dockerized Next.js web application",
        "RESTful API with JWT authentication & rate limiting",
        "bKash Checkout payment callback integration",
        "Redis caching layer achieving <50ms response times",
        "Comprehensive Jest & Playwright test suite with >80% code coverage",
        "Professional GitHub README with architecture diagram",
      ],
      problem_statement:
        "High-traffic flash sales in Bangladesh often crash local e-commerce sites due to database locking, unthrottled payment callbacks, and lack of caching. Build an inventory-consistent, resilient checkout engine with Redis queues.",
      tools: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Redis", "Docker", "bKash API", "TailwindCSS"],
      implementation_phases: [
        "Phase 1: Architecture & Data Modeling (Design ER diagrams, schema migrations, and Docker Compose environment)",
        "Phase 2: Core Development & Payment Gateway (Build catalog API, Redis inventory counter, and bKash webhook verification)",
        "Phase 3: Integration & Stress Testing (Write concurrency unit tests with Jest and simulate 100 concurrent checkouts with k6)",
        "Phase 4: Deployment & CI/CD (Configure GitHub Actions workflow, build multi-stage Docker image, deploy to VPS/Vercel)",
      ],
      testing_checklist: [
        "Verify concurrent stock reservation prevents negative inventory (race conditions)",
        "Ensure bKash IPN callback validates signature tokens before marking orders paid",
        "Verify Redis cache invalidation triggers immediately upon product stock changes",
        "Check that API rate limiter throttles clients exceeding 60 requests/minute with HTTP 429",
      ],
      readme_template: `# DhakaMart E-Commerce Engine 🚀

A production-grade, containerized e-commerce backend built with Next.js 16, PostgreSQL, and Redis.

## Features
- **Concurrent Checkout Protection**: Row-level locking and atomic Redis inventory decrement.
- **bKash Payment Gateway**: Secure sandbox integration with webhook verification.
- **Microservice Architecture**: Fully containerized with Docker Compose.
- **Automated Testing**: >80% test coverage with Jest and Supertest.

## Tech Stack
- Frontend & API: Next.js 16, TypeScript, TailwindCSS
- Database & Cache: PostgreSQL, Prisma, Redis
- Infrastructure: Docker Compose, GitHub Actions CI

## Quick Start
\`\`\`bash
git clone https://github.com/your-username/dhakamart.git
cd dhakamart
cp .env.example .env.local
docker compose up -d
npm install
npm run dev
\`\`\`
`,
    },
    {
      title: "Real-Time Collaborative Code & Markdown Editor with WebSockets",
      difficulty: "Intermediate",
      skills_demonstrated: ["React", "Node.js", "WebSockets / Socket.io", "OT / CRDT Algorithm", "TailwindCSS"],
      deliverables: [
        "Real-time synchronized editor supporting concurrent users",
        "Operational Transformation or CRDT conflict resolution engine",
        "Syntax highlighting for JavaScript, Python, and C++",
        "Active user presence cursors and avatar indicators",
      ],
      problem_statement:
        "Engineering teams need lightweight, low-latency shared editors for technical interviews and remote pair-programming without third-party vendor lock-in.",
      tools: ["Next.js", "Socket.io", "Monaco Editor", "Express", "Node.js"],
      implementation_phases: [
        "Phase 1: WebSocket server setup and room connection management",
        "Phase 2: Integration of Monaco editor and cursor position broadcasting",
        "Phase 3: Conflict resolution handling using delta patches",
        "Phase 4: Export to GitHub Gist and deployment",
      ],
      testing_checklist: [
        "Verify concurrent keystrokes from two browsers resolve without character loss",
        "Verify disconnection handling cleanly cleans up room participant list",
      ],
      readme_template: `# Real-Time Collab Editor ⚡

Low-latency peer-to-peer collaborative editor powered by Next.js and WebSockets.
`,
    },
  ],
  EEE: [
    {
      title: "Smart Energy & Power Quality Telemetry Node with ESP32 & Modbus",
      difficulty: "Advanced",
      skills_demonstrated: ["ESP32 / C++", "FreeRTOS", "Modbus RTU / RS485", "KiCad PCB Design", "MQTT / InfluxDB"],
      deliverables: [
        "Custom 2-layer schematic and PCB Gerber files designed in KiCad",
        "Firmware running FreeRTOS with separate telemetry and network tasks",
        "RS485 Modbus interface sampling voltage, current, power factor, and harmonics",
        "MQTT broker client publishing real-time metrics to Grafana dashboard",
      ],
      problem_statement:
        "Industrial manufacturing plants in Bangladesh suffer frequent power dips and high reactive penalties without real-time power factor telemetry.",
      tools: ["ESP32", "FreeRTOS", "KiCad", "RS485 Transceiver", "MQTT", "Grafana"],
      implementation_phases: [
        "Phase 1: Schematic design and component selection in KiCad with isolated power supply",
        "Phase 2: FreeRTOS firmware with RTOS queues to isolate Modbus polling from WiFi stack",
        "Phase 3: Calibration against calibrated reference multimeter and stress testing",
        "Phase 4: Cloud MQTT bridging and Grafana telemetry alert setup",
      ],
      testing_checklist: [
        "Verify optical isolation protects microcontroller during inductive load spikes",
        "Ensure watchdog timer restarts firmware gracefully on network dropouts",
        "Verify voltage sampling error is under 1% against standard lab multimeter",
      ],
      readme_template: `# Industrial Energy Telemetry Node ⚡

ESP32-based FreeRTOS industrial energy telemetry node with RS485 Modbus and KiCad PCB designs.
`,
    },
  ],
  BBA: [
    {
      title: "3-Statement Financial Valuation Model & Automated Equity Research Dashboard",
      difficulty: "Advanced",
      skills_demonstrated: [
        "Financial Statement Analysis",
        "Discounted Cash Flow (DCF)",
        "WACC Calculation",
        "Excel & Power BI",
        "Python (Pandas / Yahoo Finance)",
      ],
      deliverables: [
        "Dynamic 3-statement integrated financial model (IS, BS, CFS)",
        "Interactive DCF valuation model with Monte Carlo sensitivity analysis",
        "Power BI interactive dashboard benchmarking peer valuation multiples",
        "Comprehensive 10-page Equity Research Report formatted to institutional standards",
      ],
      problem_statement:
        "Equity analysts require robust, audited financial forecast models that accommodate inflation, currency depreciation, and interest rate volatility in emerging markets.",
      tools: ["Microsoft Excel", "Power BI", "Python / Pandas", "Capital IQ / Yahoo Finance API"],
      implementation_phases: [
        "Phase 1: Historical financial statement normalization and audit adjustments",
        "Phase 2: Revenue driver modeling, working capital schedule, and debt amortization",
        "Phase 3: WACC estimation using Damodaran emerging market risk premiums",
        "Phase 4: DCF calculation, scenario sensitivity tables, and executive presentation",
      ],
      testing_checklist: [
        "Verify Balance Sheet reconciles to 0 difference across all forecast years",
        "Ensure Cash Flow Statement cash balance ties cleanly with Balance Sheet cash",
        "Validate sensitivity table recalculations under ±15% WACC and terminal growth shifts",
      ],
      readme_template: `# 3-Statement Valuation Model & Research 📈

Institutional-grade 3-statement financial forecast and DCF valuation engine for emerging market equities.
`,
    },
  ],
  Pharmacy: [
    {
      title: "Regulatory Dossier Management & Accelerated Stability Predictor (ICH Q1A)",
      difficulty: "Advanced",
      skills_demonstrated: [
        "ICH Q1A / Q1B Guidelines",
        "Common Technical Document (CTD Module 3)",
        "Stability Kinetics & Arrhenius Equation",
        "Excel / Python Data Modeling",
        "cGMP Compliance Documentation",
      ],
      deliverables: [
        "Complete Module 3 (CMC) Regulatory Submission Dossier template for DGDA & Southeast Asia",
        "Automated Arrhenius shelf-life degradation predictor tool using Excel/Python",
        "Standard Operating Procedure (SOP) suite for Out-of-Specification (OOS) investigations",
        "Analytical method validation report compliant with ICH Q2(R1)",
      ],
      problem_statement:
        "Export-oriented pharmaceutical formulations require standardized stability dossiers meeting ICH Zone IVb guidelines to secure marketing authorization in global markets.",
      tools: ["ICH Guidelines", "DGDA Regulatory Portal", "Python / Excel", "GraphPad Prism"],
      implementation_phases: [
        "Phase 1: Dossier structure mapping for Drug Substance (3.2.S) and Drug Product (3.2.P)",
        "Phase 2: Formulation stability regression modeling across 25°C, 30°C, and 40°C chambers",
        "Phase 3: Analytical validation protocol design (Linearity, Precision, Accuracy, LOD/LOQ)",
        "Phase 4: Mock DGDA submission package and validation review",
      ],
      testing_checklist: [
        "Verify stability shelf-life extrapolation complies with 95% one-sided confidence limits",
        "Ensure all validation parameters meet ICH Q2 acceptance thresholds",
        "Confirm CTD numbering matches international ICH M4 specification exactly",
      ],
      readme_template: `# Pharma Stability Predictor & CTD Dossier 💊

ICH Q1A-compliant pharmaceutical stability degradation model and CTD Module 3 dossier system.
`,
    },
  ],
  Other: [
    {
      title: "Data-Driven University Operations & Career Readiness Platform",
      difficulty: "Intermediate",
      skills_demonstrated: ["Full-Stack Development", "Data Analytics", "Workflow Automation", "API Integration"],
      deliverables: [
        "Interactive dashboard tracking student academic progression and skills",
        "Automated PDF report generator for academic advisors",
        "SQL database tracking career milestones and alumni placement",
      ],
      problem_statement:
        "Universities need unified digital dashboards to track student skill acquisition and connect graduates with employers efficiently.",
      tools: ["React", "Node.js", "PostgreSQL", "TailwindCSS"],
      implementation_phases: [
        "Phase 1: User requirements gathering and data schema definition",
        "Phase 2: API development and analytics pipeline",
        "Phase 3: Frontend dashboard and report generation",
        "Phase 4: User acceptance testing and documentation",
      ],
      testing_checklist: [
        "Verify data export generates clean, valid PDF documents",
        "Ensure role-based access control prevents unauthorized profile edits",
      ],
      readme_template: `# University Career & Skill Tracking Platform 🎓

Full-stack academic progress and career readiness tracker for higher-education departments.
`,
    },
  ],
};

/**
 * Returns project blueprints tailored to the student's department and target role.
 */
export function getDepartmentProjectBlueprints(department: string, targetRole?: string): RecommendedProject[] {
  const normDept = (department || "").toUpperCase();

  if (normDept === "CSE" || normDept.includes("COMPUTER") || normDept.includes("SOFTWARE")) {
    return DEPARTMENT_PROJECT_BLUEPRINTS.CSE;
  }
  if (normDept === "EEE" || normDept.includes("ELECTRICAL") || normDept.includes("ELECTRONIC")) {
    return DEPARTMENT_PROJECT_BLUEPRINTS.EEE;
  }
  if (normDept === "BBA" || normDept.includes("BUSINESS") || normDept.includes("FINANCE") || normDept.includes("MARKETING")) {
    return DEPARTMENT_PROJECT_BLUEPRINTS.BBA;
  }
  if (normDept === "PHARMACY" || normDept.includes("PHARM")) {
    return DEPARTMENT_PROJECT_BLUEPRINTS.Pharmacy;
  }

  return DEPARTMENT_PROJECT_BLUEPRINTS.Other;
}
