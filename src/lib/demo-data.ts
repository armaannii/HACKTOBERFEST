import { AnalysisResult } from "@/types/career";
import { enrichAnalysisWithResources } from "./learning-resources";

export interface DemoProfile {
  id: string;
  name: string;
  department: string;
  semester: number;
  graduationYear: string;
  careerLevel: "Internship" | "Entry-level" | "Career exploration";
  targetRole: string;
  weeklyHours: number;
  learningStyle: "Projects" | "Courses" | "Mixed";
  market: "Bangladesh" | "Global" | "Both";
  resumeText: string;
  sampleResult: AnalysisResult;
}

const RAW_DEMO_PROFILES: Record<string, DemoProfile> = {
  CSE: {
    id: "cse-fullstack",
    name: "Tanzim Ahmed (CSE, 5th Sem)",
    department: "CSE",
    semester: 5,
    graduationYear: "2026",
    careerLevel: "Internship",
    targetRole: "Full-Stack Developer",
    weeklyHours: 18,
    learningStyle: "Projects",
    market: "Both",
    resumeText: `Tanzim Ahmed
Dhaka, Bangladesh | github.com/tanzimahmed | linkedin.com/in/tanzim-cse
Email: tanzim.ahmed.cse@gmail.com | Phone: +880 1712-345678

EDUCATION
Bachelor of Science in Computer Science & Engineering
Brac University, Dhaka, Bangladesh
Expected Graduation: Dec 2026 | CGPA: 3.62 / 4.00
Relevant Coursework: Data Structures & Algorithms, Object-Oriented Programming (Java), Database Systems (SQL), Web Technologies, Operating Systems.

TECHNICAL SKILLS
- Languages: JavaScript (ES6+), TypeScript, Python, C++, Java, SQL
- Frontend: React.js, Tailwind CSS, HTML5, CSS3, Next.js basics
- Backend & Databases: Node.js, Express.js, PostgreSQL, MongoDB
- Tools & DevOps: Git, GitHub, Postman, Linux (Ubuntu), VS Code, Docker basics

PROJECTS
1. DhakaCart - Multi-Vendor E-Commerce Platform
- Built responsive storefront using React, Tailwind CSS, and Node.js REST API.
- Integrated JWT authentication and BKash Sandbox payment checkout simulation.
- Implemented PostgreSQL schema with relational product categories and order tracking.

2. BloodConnect BD - Emergency Blood Donor Finder
- Developed full-stack app matching donors across 64 districts in Bangladesh.
- Implemented real-time request notifications and distance filtering using Leaflet map API.
- Hosted on Vercel and Render with MongoDB Atlas database.

3. Student Result Management CLI (Java)
- Implemented OOP architecture for grade calculation and transcript generation.

EXPERIENCE & LEADERSHIP
- Executive Member, BRAC University Computer Club (BUCC) (2024 - Present): Organized intra-university programming contests and frontend workshops.
- Peer Tutor for OOP & Data Structures (Spring 2024).`,
    sampleResult: {
      overall_score: 74,
      score_breakdown: {
        technical_skills: 78,
        projects: 75,
        experience: 60,
        role_alignment: 82,
      },
      score_explanation:
        "The candidate shows a solid foundational grasp of JavaScript, React, Node.js, and SQL suitable for a 5th-semester internship candidate in Bangladesh. Gaps exist in automated unit/integration testing, cloud infrastructure (AWS/GCP), and production caching/queuing mechanisms.",
      key_strengths: [
        "Demonstrated full-stack project experience (DhakaCart) with local payment gateway integration (BKash Sandbox).",
        "Strong fundamental coursework in Data Structures, Algorithms, and Relational Databases (PostgreSQL).",
        "Active extracurricular peer tutoring and technical community leadership in BUCC.",
      ],
      missing_skills: [
        {
          skill: "Docker & Container Orchestration",
          importance: "High",
          job_market: "Global",
          reason:
            "Modern remote and enterprise teams expect developers to containerize full-stack services for reproducible staging and production builds.",
          recommended_action:
            "Containerize the DhakaCart frontend, backend, and PostgreSQL database using Docker Compose, adding health checks and volume persistence.",
          estimated_learning_hours: 22,
        },
        {
          skill: "Automated Testing (Jest & Playwright)",
          importance: "High",
          job_market: "Global",
          reason:
            "Writing unit and end-to-end tests distinguishes junior developers from self-taught hobbyists during technical interviews.",
          recommended_action:
            "Add Jest unit tests for backend route handlers and a Playwright test covering user login and checkout flows.",
          estimated_learning_hours: 25,
        },
        {
          skill: "Redis Caching & Async Jobs",
          importance: "Medium",
          job_market: "Bangladesh",
          reason:
            "High-traffic Bangladeshi e-commerce and fintech startups require Redis for rate limiting, session storage, and background processing.",
          recommended_action:
            "Implement Redis cache for product catalog queries and BullMQ for sending order confirmation emails.",
          estimated_learning_hours: 18,
        },
        {
          skill: "REST API Documentation (Swagger / OpenAPI)",
          importance: "Medium",
          job_market: "Bangladesh",
          reason:
            "Local software houses heavily value clean API documentation when onboarding interns into cross-functional frontend/mobile teams.",
          recommended_action:
            "Document all DhakaCart endpoints using swagger-ui-express with request and response schemas.",
          estimated_learning_hours: 12,
        },
      ],
      semester_roadmap: [
        {
          semester: "Semester 5 (Current)",
          focus_area: "Full-Stack Robustness & Production Testing",
          actionable_tasks: [
            "Refactor DhakaCart to TypeScript on both backend and frontend.",
            "Write 15+ automated Jest tests for authentication and cart business logic.",
            "Set up GitHub Actions CI pipeline to lint and run tests on every pull request.",
          ],
          recommended_courses_or_certifications: [
            "Full Stack Open (University of Helsinki) - Testing & CI/CD modules",
            "Testing JavaScript with Kent C. Dodds",
          ],
          portfolio_project:
            "Production-Grade Micro-SaaS with automated CI/CD and PostgreSQL migrations",
          milestones: [
            "Passing test suite in GitHub Actions on main branch",
            "Live Swagger documentation URL deployed to production",
          ],
        },
        {
          semester: "Semester 6",
          focus_area: "System Architecture, Redis & Cloud Deployment",
          actionable_tasks: [
            "Integrate Redis caching for frequently accessed database queries.",
            "Deploy a multi-container app on AWS EC2 or Railway with Docker Compose.",
            "Implement server-side pagination, database indexing, and query optimization.",
          ],
          recommended_courses_or_certifications: [
            "AWS Certified Cloud Practitioner or free AWS Skill Builder labs",
            "Pragmatic System Design fundamentals",
          ],
          portfolio_project:
            "High-Concurrency Real-Time Collaboration or Auction Tool using WebSockets and Redis",
          milestones: [
            "Load-tested API handling 200 req/sec with under 80ms p95 latency",
            "Completed 3 mock technical interviews on LeetCode Medium algorithms",
          ],
        },
        {
          semester: "Semester 7",
          focus_area: "Targeted Internship Applications & Advanced Patterns",
          actionable_tasks: [
            "Apply to 15+ top tech firms in Bangladesh (Pathao, bKash, Brain Station 23, Optimizely Dhaka).",
            "Contribute a merged PR to an established open-source TypeScript repository.",
            "Prepare a portfolio showcase website with interactive case studies.",
          ],
          recommended_courses_or_certifications: [
            "Meta Frontend / Backend Developer Professional Certificate (audit mode)",
          ],
          portfolio_project: "Open-Source Developer Tool or NPM Package with >50 weekly downloads",
          milestones: [
            "Secure an active Summer/Fall software engineering internship",
            "Polish technical LinkedIn profile with 500+ connections and project highlights",
          ],
        },
        {
          semester: "Semester 8",
          focus_area: "Capstone Project & Full-Time Placement Conversion",
          actionable_tasks: [
            "Execute undergraduate thesis/final project with demonstrable real-world deployment.",
            "Negotiate full-time return offer from internship or interview for remote junior roles.",
            "Publish a technical blog post detailing a complex architectural challenge solved.",
          ],
          recommended_courses_or_certifications: [
            "Advanced TypeScript & Clean Architecture by Robert C. Martin (reading)",
          ],
          portfolio_project:
            "Final Year Capstone Project with institutional or community deployment",
          milestones: [
            "Sign full-time software engineer contract prior to graduation ceremony",
            "Deliver capstone defense presentation with live product demo",
          ],
        },
      ],
      resume_formatting_tips: [
        "Include quantifiable metrics under projects (e.g., 'Reduced query response time by 40% using indexed PostgreSQL views').",
        "Place your Live Demo and GitHub links right under each project title for immediate reviewer access.",
        "Add a dedicated 'Key Technical Competencies' section categorized into Languages, Frameworks, and Cloud/DevOps.",
        "Ensure single-page format with consistent 0.5-inch margins and clear ATS-friendly headings.",
      ],
      recommended_projects: [
        {
          title: "Bengali Voice & Text Invoicing SaaS",
          difficulty: "Intermediate",
          skills_demonstrated: ["Next.js App Router", "PostgreSQL", "Docker", "Tailwind CSS", "PDF Generation"],
          deliverables: [
            "Live web application with localized UI for small Bangladeshi businesses",
            "Printable GST/VAT compliant PDF invoice generator",
            "GitHub repository with Dockerfile and GitHub Actions workflow",
          ],
        },
        {
          title: "Distributed Rate-Limited Task Scheduler",
          difficulty: "Advanced",
          skills_demonstrated: ["Node.js", "Redis", "BullMQ", "System Design", "Prometheus Metrics"],
          deliverables: [
            "Microservice handling asynchronous webhook processing and retry queues",
            "Benchmark report showing resilient processing under simulated traffic spikes",
          ],
        },
      ],
      next_30_days: [
        {
          week: 1,
          goal: "Upgrade DhakaCart to TypeScript & write first Jest test suite",
          tasks: [
            "Convert server routes from vanilla JS to TypeScript interfaces",
            "Configure Jest and Supertest for API endpoint testing",
            "Write 5 test cases verifying invalid login and payment edge cases",
          ],
          completion_criteria: "All 5 tests pass locally with `npm test` without type errors.",
        },
        {
          week: 2,
          goal: "Containerize application with Docker & Docker Compose",
          tasks: [
            "Write multi-stage Dockerfile for Next.js frontend and Express backend",
            "Create docker-compose.yml orchestrating app and PostgreSQL container",
            "Verify complete local startup with a single `docker compose up` command",
          ],
          completion_criteria: "Fresh clone runs successfully in a clean container environment.",
        },
        {
          week: 3,
          goal: "Set up CI pipeline & interactive API documentation",
          tasks: [
            "Create `.github/workflows/ci.yml` running linting and tests on pull requests",
            "Add Swagger / OpenAPI documentation for all public endpoints",
            "Deploy staging backend to Railway with managed PostgreSQL",
          ],
          completion_criteria: "Green CI badge on GitHub repository and live `/api-docs` link.",
        },
        {
          week: 4,
          goal: "Revise resume and initiate recruiter outreach for Summer internships",
          tasks: [
            "Implement recommended resume metric enhancements and ATS formatting",
            "Identify 10 tech leads / engineering managers in Dhaka on LinkedIn",
            "Send personalized connection requests highlighting DhakaCart case study",
          ],
          completion_criteria: "Polished 1-page PDF ready and 10 targeted outreach messages dispatched.",
        },
      ],
      market_insights: [
        {
          market: "Bangladesh",
          relevant_skills: ["React.js", "Next.js", "Node.js", "PostgreSQL", "bKash/Nagad APIs"],
          notes:
            "Bangladeshi tech companies (Pathao, Chaldal, ShopUp, bKash) prioritize candidates who understand relational databases, payment gateways, and clean RESTful API design over niche frontend libraries.",
        },
        {
          market: "Global",
          relevant_skills: ["TypeScript", "Docker", "CI/CD", "Automated Testing", "Async Architecture"],
          notes:
            "Global remote entry-level roles expect strict TypeScript proficiency, comprehensive automated test coverage, and clear asynchronous communication through PR descriptions and documentation.",
        },
      ],
    },
  },
  EEE: {
    id: "eee-embedded",
    name: "Nafis Fuad (EEE, 6th Sem)",
    department: "EEE",
    semester: 6,
    graduationYear: "2026",
    careerLevel: "Internship",
    targetRole: "Embedded Systems Engineer",
    weeklyHours: 16,
    learningStyle: "Projects",
    market: "Both",
    resumeText: `Nafis Fuad
Dhaka, Bangladesh | linkedin.com/in/nafis-eee | github.com/nafis-embedded
Email: nafis.eee.buet@gmail.com | Phone: +880 1819-234567

EDUCATION
Bachelor of Science in Electrical and Electronic Engineering
BUET, Dhaka, Bangladesh
Expected Graduation: 2026 | CGPA: 3.55 / 4.00
Relevant Coursework: Microprocessors & Microcontrollers, Signals & Systems, Digital Logic Design, Embedded Systems, Circuit Analysis, Power Electronics.

TECHNICAL SKILLS
- Hardware & MCU: STM32 (ARM Cortex-M), ESP32, Arduino, AVR ATMega32, Raspberry Pi
- Programming: Embedded C, C++, Python, MATLAB, Assembly (8086)
- Protocols: UART, SPI, I2C, CAN basics, MQTT
- Design Tools: KiCad, Proteus, MATLAB Simulink, LTspice, Saleae Logic Analyzer

PROJECTS
1. Smart Agricultural IoT Node (ESP32 & LoRa)
- Designed battery-powered soil moisture and temperature telemetry system for rural farms.
- Transmitted sensor packets over 2.5km using 433MHz LoRa module with deep-sleep power saving.
- Visualized sensor telemetry on MQTT dashboard hosted on cloud VPS.

2. Digital ECG Heart Rate Monitor (STM32 & Analog Front-End)
- Designed 3-lead analog bio-potential instrumentation amplifier using operational amplifiers.
- Filtered 50Hz mains power line interference using analog notch filter and digital FIR filter in C.
- Displayed real-time BPM waveform on 128x64 OLED display using I2C bus.

3. Custom 2-Layer PCB for Power Distribution (KiCad)
- Designed schematic and routing in KiCad with ground plane isolation and reverse polarity protection.
- Hand-soldered SMD components (0805 passives, SOT-23 regulators).

LEADERSHIP & AFFILIATIONS
- Student Member, IEEE BUET Student Branch (2023 - Present)
- Hardware Team Lead, University Robotics Society`,
    sampleResult: {
      overall_score: 72,
      score_breakdown: {
        technical_skills: 76,
        projects: 74,
        experience: 58,
        role_alignment: 80,
      },
      score_explanation:
        "Strong foundation in Embedded C, microcontrollers (STM32, ESP32), and basic communication protocols (I2C, SPI). To be competitive for top global firmware positions and local electronics firms, Nafis should master Real-Time Operating Systems (FreeRTOS) and RTOS-level debugging.",
      key_strengths: [
        "Practical hands-on experience designing 2-layer PCBs in KiCad and soldering surface mount components.",
        "Solid understanding of hardware protocols (UART, SPI, I2C, LoRa) and low-power microcontroller modes.",
        "Demonstrated biomedical and IoT telemetry application builds.",
      ],
      missing_skills: [
        {
          skill: "FreeRTOS (Real-Time Operating System)",
          importance: "High",
          job_market: "Global",
          reason:
            "Production firmware across automotive, medical, and aerospace industries relies heavily on RTOS multitasking, queues, and mutexes.",
          recommended_action:
            "Port the Smart IoT Node firmware from bare-metal loops to FreeRTOS tasks with semaphores and message queues on STM32.",
          estimated_learning_hours: 30,
        },
        {
          skill: "Firmware Testing & Unit Testing (Unity / CMock)",
          importance: "High",
          job_market: "Global",
          reason:
            "Automated test-driven embedded development is mandatory for safety-critical device development.",
          recommended_action:
            "Set up Ceedling or Unity framework to unit test sensor parsing algorithms on host PC.",
          estimated_learning_hours: 20,
        },
        {
          skill: "CAN Bus Protocol Implementation",
          importance: "Medium",
          job_market: "Bangladesh",
          reason:
            "Electric vehicle (EV) startups and automation companies in Bangladesh frequently require CAN bus integration for telemetry.",
          recommended_action:
            "Build a two-node CAN communication bench setup using MCP2515 CAN transceivers.",
          estimated_learning_hours: 18,
        },
      ],
      semester_roadmap: [
        {
          semester: "Semester 6 (Current)",
          focus_area: "RTOS Architecture & Bare-Metal STM32 HAL Mastery",
          actionable_tasks: [
            "Complete FreeRTOS course focusing on task scheduling, queues, and race conditions.",
            "Write register-level bare-metal drivers for STM32 timers, ADC, and DMA.",
            "Document KiCad PCB designs on GitHub with 3D renders, schematics, and BOM.",
          ],
          recommended_courses_or_certifications: [
            "Mastering RTOS: Hands on FreeRTOS with STM32 (FastBit Academy)",
            "Arm Cortex-M Architecture Programming",
          ],
          portfolio_project:
            "Dual-Core Industrial Data Logger running FreeRTOS with FATFS SD-card logging",
          milestones: [
            "Fully functioning FreeRTOS firmware running with zero deadlock errors",
            "Clean GitHub release containing Gerber files, schematic PDF, and demo video",
          ],
        },
        {
          semester: "Semester 7",
          focus_area: "Industrial Communication & Internship Placement",
          actionable_tasks: [
            "Implement CAN bus and Modbus RTU communication on RS485.",
            "Apply to R&D firms in Bangladesh (Walton Hi-Tech, Ulkasemi, Energypac, Neural Semiconductor).",
            "Participate in an IEEE hardware design competition or technical paper showcase.",
          ],
          recommended_courses_or_certifications: [
            "IPC PCB Design Guidelines / High-Speed Board Design basics",
          ],
          portfolio_project: "CAN-Connected Battery Management System (BMS) Monitor for Light EVs",
          milestones: [
            "Secure an R&D or Embedded Firmware Internship in Dhaka",
            "Present technical paper or poster at IEEE student conference",
          ],
        },
        {
          semester: "Semester 8",
          focus_area: "Undergraduate Final Project & Full-Time Conversion",
          actionable_tasks: [
            "Complete high-impact EEE capstone project with custom-fabricated PCB.",
            "Prepare for technical hardware interview loops (schematic review, firmware C pointers).",
            "Evaluate higher studies (MS in Microelectronics) vs direct industry roles.",
          ],
          recommended_courses_or_certifications: [
            "Embedded Linux Kernel and Driver Development (introductory)",
          ],
          portfolio_project:
            "Edge AI Microcontroller Inference Node using TensorFlow Lite for Microcontrollers",
          milestones: [
            "Final capstone evaluation completed with distinction",
            "Sign full-time embedded engineer offer letter",
          ],
        },
      ],
      resume_formatting_tips: [
        "Include links to GitHub repositories with well-annotated oscilloscope / logic analyzer captures.",
        "List specific microcontrollers and IDEs (STM32CubeIDE, Keil MDK) under technical skills.",
        "Highlight PCB design fabrication experience (JLCPCB/PCBWay turnaround, component sourcing).",
      ],
      recommended_projects: [
        {
          title: "FreeRTOS Smart Power Quality Analyzer",
          difficulty: "Intermediate",
          skills_demonstrated: ["STM32", "FreeRTOS", "ADC Sampling", "DMA", "SPI Display"],
          deliverables: [
            "RMS voltage, current, and power factor calculations in real-time firmware",
            "Custom 2-layer PCB schematic and board layout files in KiCad",
          ],
        },
        {
          title: "Edge TinyML Keyword Spotting Sensor",
          difficulty: "Advanced",
          skills_demonstrated: ["TensorFlow Lite for Microcontrollers", "Embedded C++", "I2S Audio"],
          deliverables: [
            "Firmware detecting wake-words running under 15KB RAM constraints on ARM Cortex-M4",
            "Benchmark document detailing latency, power consumption, and model accuracy",
          ],
        },
      ],
      next_30_days: [
        {
          week: 1,
          goal: "Master FreeRTOS fundamentals on STM32",
          tasks: [
            "Create FreeRTOS project with STM32CubeIDE managing 3 concurrent tasks",
            "Implement inter-task communication using FreeRTOS queues instead of global flags",
            "Simulate priority inversion and resolve it with priority inheritance mutexes",
          ],
          completion_criteria: "Stable multitasking firmware running for 2 hours with zero stack overflow.",
        },
        {
          week: 2,
          goal: "Refactor LoRa IoT Node to FreeRTOS",
          tasks: [
            "Break sensor acquisition, LoRa transmission, and power management into distinct tasks",
            "Implement low-power tickless idle mode to maximize battery longevity",
            "Measure current consumption with multimeter across active and sleep states",
          ],
          completion_criteria: "Measured sleep current under 15uA with verified wake-up cycle.",
        },
        {
          week: 3,
          goal: "Design PCB for Multi-Sensor Board in KiCad",
          tasks: [
            "Draw complete schematic with power regulation and decoupling capacitors",
            "Route 2-layer board observing 3W rule and continuous ground return paths",
            "Generate DRC verification report with zero design rule errors",
          ],
          completion_criteria: "Clean Gerber archive and 3D preview images uploaded to GitHub.",
        },
        {
          week: 4,
          goal: "Network with local embedded engineering teams in Dhaka",
          tasks: [
            "Reach out to engineers at Ulkasemi, Walton R&D, and local IoT device makers",
            "Share short 60-second video demo showing FreeRTOS task telemetry on logic analyzer",
            "Request informational chats regarding hardware internship hiring timelines",
          ],
          completion_criteria: "5 personalized outreach messages sent with portfolio video links.",
        },
      ],
      market_insights: [
        {
          market: "Bangladesh",
          relevant_skills: ["Microcontroller C", "KiCad PCB Design", "IoT Telemetry", "Power Supplies"],
          notes:
            "Bangladeshi demand is growing rapidly in electronics manufacturing (Walton), semiconductor layout (Ulkasemi), and IoT telemetry startups (Bondstein, Tracker). Demonstrable PCB layout skills give candidates an immediate edge.",
        },
        {
          market: "Global",
          relevant_skills: ["FreeRTOS", "Embedded Linux", "Automated C Testing", "CAN/Automotive"],
          notes:
            "International hardware and automotive companies prioritize solid RTOS fundamentals, memory-safe C/C++, and formal verification over simple hobbyist Arduino code.",
        },
      ],
    },
  },
  BBA: {
    id: "bba-analyst",
    name: "Samira Khan (BBA, 4th Sem)",
    department: "BBA",
    semester: 4,
    graduationYear: "2027",
    careerLevel: "Internship",
    targetRole: "Financial Analyst",
    weeklyHours: 15,
    learningStyle: "Mixed",
    market: "Both",
    resumeText: `Samira Khan
Dhaka, Bangladesh | linkedin.com/in/samirakhan-bba
Email: samira.khan.fin@gmail.com | Phone: +880 1678-901234

EDUCATION
Bachelor of Business Administration (BBA) - Major in Finance
IBA, University of Dhaka
Expected Graduation: 2027 | CGPA: 3.78 / 4.00
Relevant Coursework: Financial Accounting, Managerial Finance, Business Statistics, Macroeconomics, Financial Markets & Institutions.

SKILLS & CERTIFICATIONS
- Financial Analysis: Financial Statement Analysis, Ratio Analysis, Discounted Cash Flow (DCF) basics
- Tools: Microsoft Excel (VLOOKUP, INDEX/MATCH, Pivot Tables), Power BI basics, PowerPoint
- Data & Programming: SQL queries (beginner), Python for data analysis (enrolled)
- Soft Skills: Business Case Presentation, Cross-Functional Teamwork, Executive Writing

CASE COMPETITIONS & PROJECTS
1. National Business Case Competition 2024 - Semi-Finalist
- Formulated market-entry strategy for an international FMCG brand expanding into Tier-2 Bangladeshi cities.
- Modeled 3-year projected revenue forecast and break-even point analysis in Excel.

2. Comprehensive Financial Appraisal of Beximco Pharmaceuticals Ltd
- Conducted 5-year DuPont ratio analysis evaluating ROE drivers and leverage ratios.
- Compared valuation metrics (P/E, EV/EBITDA) against peer pharmaceutical companies listed on DSE.

LEADERSHIP & ACTIVITIES
- Senior Associate, Finance & Investment Club, IBA (2023 - Present)
- Organized annual investment symposium featuring portfolio managers from leading asset management firms.`,
    sampleResult: {
      overall_score: 70,
      score_breakdown: {
        technical_skills: 68,
        projects: 72,
        experience: 62,
        role_alignment: 78,
      },
      score_explanation:
        "Samira has demonstrated financial statement acumen and active business case presentation experience. To reach institutional finance caliber (private equity, corporate finance, FMCG finance management trainee), she needs to advance from descriptive Excel formulas to dynamic 3-statement financial modeling and SQL data querying.",
      key_strengths: [
        "Rigorous financial ratio and DuPont analysis conducted on Dhaka Stock Exchange (DSE) listed companies.",
        "Demonstrated success in national business case competitions with structured revenue forecasting.",
        "Strong academic standing (3.78 CGPA) at a premier business institution.",
      ],
      missing_skills: [
        {
          skill: "Dynamic 3-Statement Financial Modeling",
          importance: "High",
          job_market: "Global",
          reason:
            "Investment banks, asset management firms, and multinational corporations expect interns to dynamically link Income Statements, Balance Sheets, and Cash Flows with scenario toggles.",
          recommended_action:
            "Build a dynamic, integrated 3-statement model for a DSE-listed pharmaceutical company with bull/base/bear scenario switches in Excel.",
          estimated_learning_hours: 28,
        },
        {
          skill: "Advanced Financial SQL & Data Querying",
          importance: "High",
          job_market: "Global",
          reason:
            "Modern financial analysts work with multi-gigabyte transactional tables; SQL is essential to extract and aggregate financial data without crashing Excel.",
          recommended_action:
            "Complete an applied SQL for Finance bootcamp covering window functions, aggregations, and subqueries.",
          estimated_learning_hours: 24,
        },
        {
          skill: "Power BI / Tableau Financial Dashboards",
          importance: "Medium",
          job_market: "Bangladesh",
          reason:
            "Local telecom, banking, and FMCG companies rely on automated Power BI executive dashboards for weekly budget variance reporting.",
          recommended_action:
            "Build an interactive Power BI dashboard tracking working capital metrics and cash conversion cycles.",
          estimated_learning_hours: 18,
        },
      ],
      semester_roadmap: [
        {
          semester: "Semester 4 (Current)",
          focus_area: "Financial Modeling & Valuation Fundamentals",
          actionable_tasks: [
            "Complete an integrated 3-statement financial modeling course with debt schedules.",
            "Build an equity research report on Square Pharmaceuticals including a DCF and sensitivity matrix.",
            "Master keyboard-only Excel shortcuts for financial analyst workflows.",
          ],
          recommended_courses_or_certifications: [
            "Corporate Finance Institute (CFI) Financial Modeling & Valuation Analyst (FMVA)",
            "Wharton Business and Financial Modeling Specialization",
          ],
          portfolio_project:
            "Institutional-grade Equity Research Report & Valuation Model for Square Pharmaceuticals",
          milestones: [
            "Fully dynamic 3-statement model completed in Excel with zero circular reference errors",
            "Comprehensive 10-page PDF Equity Research Report completed",
          ],
        },
        {
          semester: "Semester 5",
          focus_area: "Data Analytics, SQL & Internship Applications",
          actionable_tasks: [
            "Learn SQL for transactional business analysis and query optimization.",
            "Apply for Summer Finance Internships at multinational banks (Standard Chartered, HSBC) and local leaders (BRAC Bank, IDLC).",
            "Compete in the CFA Institute Research Challenge university team.",
          ],
          recommended_courses_or_certifications: [
            "Google Data Analytics Certificate / Advanced SQL for Business",
          ],
          portfolio_project: "Interactive Power BI Corporate Budget Variance & KPI Dashboard",
          milestones: [
            "Pass technical finance screening tests at 3 premier institutions",
            "Qualify as finalist in regional case or research competition",
          ],
        },
        {
          semester: "Semester 6",
          focus_area: "Corporate Finance Internship & Advanced Valuation",
          actionable_tasks: [
            "Complete summer internship delivering demonstrable cost-saving or revenue analysis.",
            "Register for CFA Level 1 preparation or relevant professional milestone.",
            "Network with alumni in private equity, VC, and corporate M&A.",
          ],
          recommended_courses_or_certifications: [
            "CFA Level 1 Candidate curriculum",
          ],
          portfolio_project:
            "M&A Synergy & Accretion/Dilution Analysis Model for FMCG Acquisition",
          milestones: [
            "Successful internship completion with executive recommendation letter",
            "Completed 500+ CFA practice questions with >70% accuracy",
          ],
        },
        {
          semester: "Semester 7-8",
          focus_area: "Management Trainee Selection & Full-Time Placement",
          actionable_tasks: [
            "Prepare for rigorous assessment centers (BAT, Unilever, Marico, Grameenphone MTO).",
            "Conduct mock assessment rounds on analytical aptitude and commercial acumen.",
            "Defend undergraduate finance internship thesis.",
          ],
          recommended_courses_or_certifications: [
            "Strategic Corporate Finance by Harvard Business Publishing",
          ],
          portfolio_project: "Comprehensive Valuation & Strategic Acquisition Blueprint",
          milestones: [
            "Secure Management Trainee Officer (MTO) offer prior to graduation",
          ],
        },
      ],
      resume_formatting_tips: [
        "Quantify business impact under case competitions (e.g., 'Proposed pricing model projected 18% ROI with 14-month payback').",
        "List specific financial modeling competencies (DCF, LBO, 3-Statement, WACC calculations).",
        "Place academic achievements and club leadership prominently to highlight leadership capacity.",
      ],
      recommended_projects: [
        {
          title: "Pharmaceutical Sector Comparable Company Analysis (CCA)",
          difficulty: "Beginner",
          skills_demonstrated: ["Excel Financial Modeling", "Ratio Analysis", "Valuation Multiples"],
          deliverables: [
            "Automated Excel spreadsheet benchmarking 8 DSE-listed pharmaceutical firms",
            "Executive summary highlighting undervaluation / overvaluation signals",
          ],
        },
        {
          title: "Working Capital Optimization Dashboard in Power BI",
          difficulty: "Intermediate",
          skills_demonstrated: ["Power BI", "SQL", "Cash Flow Forecasting", "Data Modeling"],
          deliverables: [
            "Interactive dashboard tracking Days Sales Outstanding (DSO) and Inventory Turnover",
            "Walkthrough slide deck explaining cash conversion cycle reduction strategies",
          ],
        },
      ],
      next_30_days: [
        {
          week: 1,
          goal: "Build dynamic 3-statement link architecture in Excel",
          tasks: [
            "Input 3-year historical financial statements for Square Pharmaceuticals into clean Excel template",
            "Build working capital and depreciation waterfall schedules",
            "Dynamically link net income into retained earnings and operating cash flow",
          ],
          completion_criteria: "Balance sheet balances across all 3 historical years automatically.",
        },
        {
          week: 2,
          goal: "Implement 5-year revenue and expense forecast drivers",
          tasks: [
            "Model segment-wise revenue growth assumptions based on industry reports",
            "Create bull, base, and bear scenario selectors using Excel data validation and INDEX formulas",
            "Project future cash flows and compute terminal value using Gordon Growth method",
          ],
          completion_criteria: "Scenario dropdown updates valuation figures instantly with zero formula errors.",
        },
        {
          week: 3,
          goal: "Author equity research summary deck",
          tasks: [
            "Synthesize DCF findings, risks, and catalysts into a crisp 4-page equity memo",
            "Create clean valuation bridge chart and sensitivity table for WACC vs terminal growth",
            "Publish memo on LinkedIn and seek feedback from alumni investment bankers",
          ],
          completion_criteria: "Polished PDF memo ready for recruitment portfolio attachments.",
        },
        {
          week: 4,
          goal: "Initiate internship networking with finance managers",
          tasks: [
            "Identify 8 IBA alumni working in corporate finance at BAT, Unilever, and BRAC Bank",
            "Draft targeted cold emails attaching the equity research memo as sample work",
            "Schedule 2 informational coffee or phone chats",
          ],
          completion_criteria: "All 8 outreach messages dispatched with portfolio attachment.",
        },
      ],
      market_insights: [
        {
          market: "Bangladesh",
          relevant_skills: ["Advanced Excel", "Power BI", "Financial Modeling", "Corporate Tax & VAT basics"],
          notes:
            "Bangladeshi multinational corporations (MNCs) and banks prize candidates with impeccable Excel execution, business case presence, and understanding of local reporting standards (IFRS).",
        },
        {
          market: "Global",
          relevant_skills: ["SQL", "Python (Pandas)", "DCF/LBO Modeling", "CFA Candidate Status"],
          notes:
            "Global remote financial analyst roles increasingly require coding literacy (SQL/Python) to extract data from data warehouses rather than waiting on IT teams.",
        },
      ],
    },
  },
  Pharmacy: {
    id: "pharmacy-regulatory",
    name: "Farhana Yasmin (Pharmacy, 7th Sem)",
    department: "Pharmacy",
    semester: 7,
    graduationYear: "2025",
    careerLevel: "Entry-level",
    targetRole: "Regulatory Affairs Associate",
    weeklyHours: 14,
    learningStyle: "Mixed",
    market: "Both",
    resumeText: `Farhana Yasmin
Dhaka, Bangladesh | linkedin.com/in/farhanayasmin-pharmacy
Email: farhana.yasmin.pharm@gmail.com | Phone: +880 1912-876543

EDUCATION
Bachelor of Pharmacy (B.Pharm Professional)
University of Dhaka, Bangladesh
Expected Graduation: Dec 2025 | CGPA: 3.72 / 4.00
Relevant Coursework: Pharmaceutical Technology, Biopharmaceutics & Pharmacokinetics, Quality Assurance & QC, Medicinal Chemistry, Pharmacology, Pharmaceutical Regulatory Affairs.

TECHNICAL SKILLS & COMPETENCIES
- Regulatory & Guidelines: cGMP (WHO & US FDA guidelines), ICH Guidelines (Q1A-Q10), DGDA Bangladesh Drug Act, CTD/eCTD dossier structure
- Analytical Instruments: HPLC, UV-Vis Spectrophotometer, Dissolution Tester, Karl Fischer Titrator
- Documentation: Standard Operating Procedures (SOPs), Validation Protocols, Certificate of Analysis (CoA) review, Deviation Reports
- Digital Tools: ChemDraw, MS Office (Word, Excel, PowerPoint), Mendeley

ACADEMIC PROJECTS & RESEARCH
1. Comparative Dissolution Profile Study of Paracetamol Solid Dosage Forms
- Conducted in-vitro dissolution testing according to USP monograph on 5 leading commercial brands in Bangladesh.
- Calculated f1 (difference factor) and f2 (similarity factor) to evaluate bioequivalence compliance.

2. Comprehensive Common Technical Document (CTD) Module 3 Dossier Mock Preparation
- Compiled CTD Module 3 (Quality) documentation for an oral solid tablet formulation.
- Authored active pharmaceutical ingredient (API) characterization, stability protocol summary, and container-closure specs.

INTERNSHIP & WORKSHOPS
- In-Plant Industrial Trainee, Square Pharmaceuticals Ltd., Pabna (Summer 2024 - 4 Weeks): Rotated through Solid Dosage Formulation, Quality Control testing, and Quality Assurance batch record auditing.
- Workshop on Current Good Manufacturing Practice (cGMP) organized by Bangladesh Pharmaceutical Society.`,
    sampleResult: {
      overall_score: 77,
      score_breakdown: {
        technical_skills: 80,
        projects: 76,
        experience: 70,
        role_alignment: 83,
      },
      score_explanation:
        "Farhana possesses a strong foundational mastery of cGMP, ICH guidelines, and CTD dossier structures with direct in-plant industrial training at Square Pharmaceuticals. To excel in multinational regulatory positions and export compliance, she should develop depth in international filing submissions (US FDA ANDA, EU CTD) and pharmacovigilance adverse event reporting.",
      key_strengths: [
        "Direct industrial training experience at Square Pharmaceuticals with QA/QC rotation.",
        "Demonstrated hands-on experience authoring CTD Module 3 dossier documentation.",
        "Solid theoretical and practical laboratory command of USP monograph dissolution and chromatography.",
      ],
      missing_skills: [
        {
          skill: "eCTD (Electronic Common Technical Document) Publishing",
          importance: "High",
          job_market: "Global",
          reason:
            "Global pharmaceutical export submissions require digital eCTD formatting, XML backbone validation, and life-cycle management.",
          recommended_action:
            "Study eCTD 3.2.2 specifications and practice compiling compliant digital dossiers using open tools or regulatory templates.",
          estimated_learning_hours: 25,
        },
        {
          skill: "Post-Marketing Pharmacovigilance (PV) Reporting",
          importance: "High",
          job_market: "Bangladesh",
          reason:
            "Bangladeshi Directorate General of Drug Administration (DGDA) is enforcing strict post-market adverse drug reaction (ADR) reporting for all licensed manufacturers.",
          recommended_action:
            "Complete a certified Pharmacovigilance and Periodic Safety Update Report (PSUR) workflow training.",
          estimated_learning_hours: 20,
        },
        {
          skill: "Regulatory Strategy for ROW (Rest of World) & ASEAN Markets",
          importance: "Medium",
          job_market: "Bangladesh",
          reason:
            "Bangladeshi pharma export leaders (Beximco, Incepta, Square) export heavily to ASEAN and African markets with distinct ACTD dossier requirements.",
          recommended_action:
            "Review ASEAN Common Technical Dossier (ACTD) differences compared to standard ICH CTD guidelines.",
          estimated_learning_hours: 16,
        },
      ],
      semester_roadmap: [
        {
          semester: "Semester 7 (Current)",
          focus_area: "Dossier Compilation & International Guidelines",
          actionable_tasks: [
            "Master ICH guidelines Q1 (Stability Testing) through Q10 (Pharmaceutical Quality System).",
            "Prepare a complete sample Module 1 and Module 2 CTD dossier for export submission.",
            "Conduct mock stability study data analysis and shelf-life extrapolation in Excel.",
          ],
          recommended_courses_or_certifications: [
            "Regulatory Affairs Professionals Society (RAPS) Certificate modules (audit)",
            "WHO cGMP & Quality Assurance in Pharmaceuticals",
          ],
          portfolio_project:
            "Full Sample CTD Dossier (Modules 1-3) for a Fixed-Dose Combination Generic Product",
          milestones: [
            "Completed 40-page mock dossier with valid documentation hierarchy",
            "Delivered departmental presentation on bioequivalence regulations in Bangladesh",
          ],
        },
        {
          semester: "Semester 8",
          focus_area: "Licensing Examination & Full-Time Regulatory Placement",
          actionable_tasks: [
            "Complete Pharmacy Council of Bangladesh registration exam preparations.",
            "Apply for Regulatory Affairs Executive roles at Beximco, Square, Incepta, Renata, and Eskayef.",
            "Prepare for technical interviews on drug registration processes and DGDA approvals.",
          ],
          recommended_courses_or_certifications: [
            "Good Laboratory Practice (GLP) and Good Clinical Practice (GCP) certification",
          ],
          portfolio_project: "Comparative Regulatory Filing Roadmap: DGDA (BD) vs US FDA ANDA vs EU EMA",
          milestones: [
            "Receive full Pharmacy Council registration license",
            "Secure full-time position as Regulatory Affairs or Quality Assurance Associate",
          ],
        },
      ],
      resume_formatting_tips: [
        "Explicitly list familiarity with DGDA Drug Policy, US FDA 21 CFR Part 210/211, and ICH guidelines.",
        "Emphasize the industrial plant training rotations with concrete audit and testing responsibilities.",
        "Highlight analytical instrumentation competencies (HPLC, UV-Vis, Dissolution testers) clearly.",
      ],
      recommended_projects: [
        {
          title: "Comprehensive CTD Quality Dossier (Module 3)",
          difficulty: "Intermediate",
          skills_demonstrated: ["ICH Q3A/B", "Stability Protocols", "Specification Sheets", "SOP Writing"],
          deliverables: [
            "Ready-to-inspect 35-page mock Module 3 submission for an oral generic tablet",
            "Standard Operating Procedure (SOP) for raw material release and batch deviation logging",
          ],
        },
        {
          title: "Pharmacovigilance Risk Management Plan (RMP)",
          difficulty: "Advanced",
          skills_demonstrated: ["ADR Monitoring", "CIOMS Form", "PSUR Preparation", "DGDA Compliance"],
          deliverables: [
            "Simulated Adverse Drug Reaction reporting workflow conforming to DGDA pharmacovigilance cell requirements",
          ],
        },
      ],
      next_30_days: [
        {
          week: 1,
          goal: "Deep dive into ICH Q1A Stability Testing guidelines",
          tasks: [
            "Read and annotate the complete ICH Q1A(R2) stability testing document",
            "Build an Excel model calculating activation energy and extrapolated shelf life from accelerated stability data",
            "Write a standard stability testing protocol for climatic Zone IVb (hot and humid - Bangladesh)",
          ],
          completion_criteria: "Finished stability protocol document conforming to DGDA requirements.",
        },
        {
          week: 2,
          goal: "Compile CTD Module 2 (Overall Quality Summary)",
          tasks: [
            "Draft the Quality Overall Summary (QOS) for an anti-diabetic generic formulation",
            "Include critical quality attributes (CQAs) and dissolution profile comparisons",
            "Review packaging integrity and stability specifications",
          ],
          completion_criteria: "Complete 12-page QOS document formatted according to ICH CTD guidelines.",
        },
        {
          week: 3,
          goal: "Prepare for industrial pharmaceutical regulatory interviews",
          tasks: [
            "Compile answers for common regulatory interview questions (dossier modules, DMF, variation filing)",
            "Review DGDA drug import/export registration guidelines and schedule",
            "Conduct mock interview with a working Regulatory Affairs Manager on LinkedIn",
          ],
          completion_criteria: "Structured interview prep document covering 25 technical regulatory scenarios.",
        },
        {
          week: 4,
          goal: "Submit targeted applications to top 5 pharmaceutical exporters in Bangladesh",
          tasks: [
            "Tailor resume for Regulatory Affairs Associate openings at Square, Beximco, Incepta, Renata, and Eskayef",
            "Attach the CTD Module 3 project sample as an evidence portfolio",
            "Follow up directly with HR and Regulatory team leads on LinkedIn",
          ],
          completion_criteria: "5 targeted job applications submitted with custom cover letters and portfolio samples.",
        },
      ],
      market_insights: [
        {
          market: "Bangladesh",
          relevant_skills: ["DGDA Guidelines", "cGMP Compliance", "CTD Dossiers", "In-Process Quality Control"],
          notes:
            "Bangladesh's pharmaceutical industry supplies 98% of domestic demand and exports to over 150 nations. Regulatory affairs specialists who understand DGDA approval timelines and export documentation are in constant demand.",
        },
        {
          market: "Global",
          relevant_skills: ["eCTD 3.2.2 / 4.0", "US FDA ANDA", "EU EMA CEP", "Pharmacovigilance (MedDRA)"],
          notes:
            "Multinational and global contract research organizations (CROs) require expertise in digital eCTD submissions, MedDRA coding for adverse events, and stringent data integrity protocols.",
        },
      ],
    },
  },
  Other: {
    id: "other-multidisciplinary",
    name: "Ayesha Siddiqua (Interdisciplinary, 5th Sem)",
    department: "Other",
    semester: 5,
    graduationYear: "2026",
    careerLevel: "Internship",
    targetRole: "Product Manager",
    weeklyHours: 15,
    learningStyle: "Mixed",
    market: "Both",
    resumeText: `Ayesha Siddiqua
Dhaka, Bangladesh | linkedin.com/in/ayesha-pm | github.com/ayesha-projects
Email: ayesha.siddiqua@gmail.com | Phone: +880 1711-987654

EDUCATION
Bachelor of Science in Industrial & Production Engineering / Interdisciplinary
University of Dhaka / BUET
Expected Graduation: Dec 2026 | CGPA: 3.65 / 4.00
Relevant Coursework: Project Management, Operations Research, Engineering Economy, Human-Computer Interaction, Statistics.

CORE SKILLS & TOOLS
- Product & Project Management: Product Discovery, User Story Mapping, Agile/Scrum, Jira, Trello, Figma wireframing
- Data & Analytics: SQL (aggregations, joins), Excel modeling, Google Analytics, Notion documentation
- Leadership: Cross-functional team communication, stakeholder presentations

PROJECTS
1. CampusRent BD - Student Rental Marketplace (Product Case Study)
- Conducted user interviews with 45 university students to identify rental search friction points.
- Created Figma low-fi and high-fi prototypes, PRD (Product Requirements Document), and MVP user stories.
- Prioritized backlog using RICE framework, leading a 4-person student engineering team.

2. Supply Chain Optimization Simulator (Python & Excel)
- Simulated factory inventory queues and safety stock buffers, reducing simulated idle time by 22%.`,
    sampleResult: {
      overall_score: 75,
      score_breakdown: {
        technical_skills: 72,
        projects: 78,
        experience: 68,
        role_alignment: 82,
      },
      score_explanation:
        "Ayesha demonstrates strong cross-functional product thinking, user research fundamentals, and documentation skills (PRD, wireframing). To strengthen candidacy for competitive tech associate product manager (APM) cohorts, she should deepen technical systems fluency (APIs, system design basics) and product analytics.",
      key_strengths: [
        "Practical PRD authorship and user research conducted across 45 student interviewees.",
        "Demonstrated understanding of prioritization frameworks (RICE, MoSCoW) and Agile sprint ceremonies.",
        "Solid quantitative modeling foundation from engineering coursework.",
      ],
      missing_skills: [
        {
          skill: "Technical Product Management (APIs & System Architecture)",
          importance: "High",
          job_market: "Global",
          reason:
            "Modern product managers must effectively communicate with engineers about REST/GraphQL APIs, microservices, and latency trade-offs.",
          recommended_action:
            "Complete a Technical PM course and document API endpoints in Postman for a mock application.",
          estimated_learning_hours: 24,
        },
        {
          skill: "Product Analytics (Mixpanel / PostHog & SQL Funnels)",
          importance: "High",
          job_market: "Bangladesh",
          reason:
            "Local tech scale-ups (Pathao, bKash, Chaldal) expect APMs to independently analyze user retention funnels and conversion drop-offs.",
          recommended_action:
            "Set up PostHog or Mixpanel event tracking for a sample web app and author an A/B test analysis report.",
          estimated_learning_hours: 20,
        },
        {
          skill: "Go-to-Market (GTM) Strategy & Unit Economics",
          importance: "Medium",
          job_market: "Bangladesh",
          reason:
            "Product success requires balancing customer acquisition costs (CAC) against lifetime value (LTV).",
          recommended_action:
            "Create a GTM launch memo and cohort retention model in Excel for a university campus tool.",
          estimated_learning_hours: 16,
        },
      ],
      semester_roadmap: [
        {
          semester: "Semester 5 (Current)",
          focus_area: "Technical Fluency & Product Analytics Mastery",
          actionable_tasks: [
            "Learn how RESTful APIs work by inspecting and documenting endpoints using Postman.",
            "Complete SQL funnel analysis challenges on Mode Analytics.",
            "Write a detailed teardown and improvement PRD for a popular Bangladeshi app (e.g., bKash or Pathao).",
          ],
          recommended_courses_or_certifications: [
            "Reforge Product Management Foundations (or audit Equivalent)",
            "SQL for Product Analytics",
          ],
          portfolio_project:
            "Comprehensive Product Teardown & Redesign PRD with interactive Figma prototypes",
          milestones: [
            "Published 15-page PRD with user flows, API specs, and success metrics on Notion/Substack",
            "100% completion of advanced SQL window functions course",
          ],
        },
        {
          semester: "Semester 6",
          focus_area: "APM Internship Applications & Real User Experiments",
          actionable_tasks: [
            "Apply to Associate Product Manager (APM) internships at Pathao, bKash, ShopUp, and remote startups.",
            "Launch a live micro-project (No-Code or web tool) and acquire first 50 active users.",
            "Conduct weekly product critique sessions with fellow students.",
          ],
          recommended_courses_or_certifications: [
            "Inspired: How to Create Tech Products Customers Love by Marty Cagan (reading)",
          ],
          portfolio_project: "Live Micro-Product launched on ProductHunt or campus with verified analytics",
          milestones: [
            "Secure an active Summer Product Management internship in Dhaka or remote",
            "Measure and report baseline activation and 7-day retention curves",
          ],
        },
        {
          semester: "Semester 7-8",
          focus_area: "Full-Time APM Placement & Capstone Defense",
          actionable_tasks: [
            "Prepare for PM case interview rounds (Product Design, Estimation, Metrics, Root Cause Analysis).",
            "Deliver undergraduate capstone project integrating product feasibility and technical design.",
            "Network with senior PMs and founders on LinkedIn.",
          ],
          recommended_courses_or_certifications: [
            "Cracking the PM Interview preparation guide",
          ],
          portfolio_project: "End-to-End Capstone Product Portfolio with demonstrable business impact",
          milestones: [
            "Secure full-time APM offer prior to graduation",
          ],
        },
      ],
      resume_formatting_tips: [
        "Lead with business impact and user metrics (e.g., 'Improved prototype task completion rate by 35%').",
        "Link directly to live Notion PRDs and interactive Figma prototypes in your project bullets.",
        "Highlight both technical understanding (APIs, SQL) and design/business capabilities.",
      ],
      recommended_projects: [
        {
          title: "Public Product Teardown & PRD Case Study",
          difficulty: "Beginner",
          skills_demonstrated: ["PRD Writing", "Figma Wireframing", "User Research", "Metrics Definition"],
          deliverables: [
            "Notion public PRD detailing feature rationale, user personas, and acceptance criteria",
            "Figma clickable prototype showcasing optimized user journey",
          ],
        },
        {
          title: "Product Funnel & Retention Analysis Dashboard",
          difficulty: "Intermediate",
          skills_demonstrated: ["SQL", "Product Analytics", "A/B Testing", "Cohort Retention"],
          deliverables: [
            "Interactive dashboard tracking conversion drop-offs across registration and checkout funnels",
            "Executive memo outlining high-leverage product interventions",
          ],
        },
      ],
      next_30_days: [
        {
          week: 1,
          goal: "Select target app and conduct user pain point research",
          tasks: [
            "Select a consumer app in Bangladesh (e.g. food delivery or student transport)",
            "Interview 5 frequent users and synthesize top friction themes",
            "Map current user journey with pain points and drop-off risks",
          ],
          completion_criteria: "Documented interview notes and journey map uploaded to Notion.",
        },
        {
          week: 2,
          goal: "Draft comprehensive Product Requirements Document (PRD)",
          tasks: [
            "Define problem statement, target personas, and success metrics (North Star & guardrails)",
            "Write detailed user stories with testable acceptance criteria",
            "Specify technical data requirements and sample API payloads",
          ],
          completion_criteria: "Complete draft PRD reviewed and formatted cleanly.",
        },
        {
          week: 3,
          goal: "Build interactive Figma prototype",
          tasks: [
            "Create high-fidelity wireframes addressing the identified user friction points",
            "Link screens into an interactive clickable prototype",
            "Conduct usability test with 3 users to validate the proposed UX flow",
          ],
          completion_criteria: "Clickable Figma link embedded in the public PRD.",
        },
        {
          week: 4,
          goal: "Publish case study and conduct recruiter outreach",
          tasks: [
            "Publish the complete teardown on LinkedIn and Medium/Substack",
            "Share case study link with 8 PM leads in Dhaka tech ecosystem",
            "Schedule 2 informational coffee chats to discuss hiring timelines",
          ],
          completion_criteria: "Public post live and 8 targeted outreach messages sent.",
        },
      ],
      market_insights: [
        {
          market: "Bangladesh",
          relevant_skills: ["Product Discovery", "PRD Writing", "Figma", "Local Market Intuition"],
          notes:
            "Bangladeshi tech startups heavily value product leaders who understand local consumer habits (mobile money, cash on delivery, informal commerce) and can execute pragmatically without over-engineering.",
        },
        {
          market: "Global",
          relevant_skills: ["Technical PM", "Data Analytics (SQL/PostHog)", "Async Communication", "System Architecture"],
          notes:
            "Global remote product roles demand exceptional written clarity in PRDs, strong technical systems comprehension, and data-driven prioritization over gut feeling.",
        },
      ],
    },
  },
};

export const DEMO_PROFILES: Record<string, DemoProfile> = Object.fromEntries(
  Object.entries(RAW_DEMO_PROFILES).map(([key, prof]) => [
    key,
    {
      ...prof,
      sampleResult: enrichAnalysisWithResources(prof.sampleResult, prof.department),
    },
  ])
);
