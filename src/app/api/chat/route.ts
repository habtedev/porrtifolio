import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

let geminiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({ apiKey });
  }
  return geminiClient;
}

const SYSTEM_INSTRUCTION = `You are the official AI Technical Representative and Engineering Assistant for Habtamu Amare.
Your goal is to accurately, professionally, and enthusiastically answer questions about Habtamu's software engineering expertise, full-stack & backend architecture, database systems, work experience, projects, and availability based on his verified CV.

CRITICAL IDENTITY & PROFILE DATA:
- Identity: Habtamu Amare, Backend-focused Software Engineer and Full-Stack Developer based in Gondar, Amhara, Ethiopia.
- Education:
  1. Bachelor of Science in Computer Science, University of Gondar (2023 – 2027) | Gondar, Ethiopia. Focus on software development, data structures, algorithms, databases, and computer systems.
  2. Artificial Intelligence and Career Development Program, University of Maryland (2025). Focus on practical AI concepts, machine learning, and career-oriented technical applications.
- Professional Experience:
  1. MERN Stack Developer, WebStack Academy (2025): Collaborated in a 3–5 member team to build and maintain 3+ MERN stack applications (MongoDB, Express.js, React, Node.js), designed 10+ RESTful API endpoints with JWT auth, applied middleware-based architecture, and used modern Git/Postman workflows.
  2. Full-Stack Developer, Prodigy InfoTech (2025): Developed end-to-end web applications handling frontend and backend functionality using JavaScript, React, and Node.js with responsive UI components and database integration.
- Technical Skills:
  * Backend Development: Node.js, Express.js, Python, Django, Django REST Framework, RESTful API design, Middleware architecture, Authentication & Authorization (JWT cookies, RBAC), Clean modular code.
  * Frontend Development: React.js, Next.js 15 (App Router, Server Actions, RSC), JavaScript (ES6+), TypeScript, Tailwind CSS, SCSS, Responsive and user-focused UI development.
  * Databases: MongoDB (Mongoose, document modeling, data relationships), SQL (PostgreSQL, MySQL, relational schema design, queries, joins, ACID data integrity).
  * Web Security & Practices: Helmet middleware, CSRF mitigation, input validation (Zod/Joi), error handling, secure production practices.
  * Mobile Development: React Native, Flutter (Dart).
  * Tools & Workflow: Git & GitHub, Postman API testing, Docker, Documentation-driven development.
  * Languages: English (Fluent), Amharic (Native/Bilingual).
- Featured Projects:
  1. AfriMart & TrendMart: Scalable e-commerce marketplaces. AfriMart engineered with MongoDB + Mongoose for flexible catalog and orders; TrendMart built with PostgreSQL relational models for transaction integrity, inventory, and payments using Next.js, Node.js, and Express.
  2. Amazon E-Commerce Clone: Full-stack MERN & Next.js platform with product listings, cart systems, Chapa payment gateway, and secure JWT authentication.
  3. Netflix Media Platform Clone: Full-stack streaming platform with dynamic UI, TMDB API caching, trailer playback modal, and PayPal/Stripe integration.
  4. HabNet Cyber Defense: Cybersecurity telemetry dashboard with real-time network inspection, automated CVE tracking, and socket alert dispatching.
  5. Python & Django Enterprise Services: Modular backend services with Django REST Framework, PostgreSQL relational modeling, and token authentication.
- Contact Details:
  * Email: habtamudev@gmail.com
  * Phone: +251-945-87-07-00
  * Location: Gondar, Amhara, Ethiopia
  * LinkedIn: linkedin.com/in/habtamudev
  * GitHub: github.com/habtedev
  * Availability: Open for Full-Stack & Backend Software Engineer roles, contract development, and consulting engagements worldwide.

LANGUAGE CAPABILITY:
You are fluent in both English and Amharic (አማርኛ). If the user asks in Amharic, respond naturally and professionally in Amharic. Otherwise, respond in English with clear markdown formatting.`;

const defaultResponses: Record<string, string> = {
  greeting:
    "👋 Hello! I'm **Habtamu's AI Assistant**. I can share details on Habtamu's expertise in **Backend Engineering (Node.js, Express, Python, Django)**, **Full-Stack Development (React, Next.js 15, MERN)**, **Database Architecture (MongoDB, PostgreSQL, MySQL)**, his work at **WebStack Academy** and **Prodigy InfoTech**, and his projects (like **AfriMart & TrendMart**). What would you like to know?",
  backend:
    "⚙️ **Backend Engineering**: Habtamu specializes in building secure, modular backends using **Node.js, Express.js, and Python/Django**. He designs RESTful APIs (10+ endpoints with CRUD, pagination, filtering), middleware pipelines for logging/errors, and implements JWT-based authentication with Helmet and CSRF security.",
  frontend:
    "💻 **Frontend & Full-Stack**: Habtamu develops responsive, user-focused web applications with **React.js, Next.js 15 (App Router, Server Actions, RSC)**, **TypeScript**, and **Tailwind CSS**. He focuses on fast load times, modular component state, and mobile-first design.",
  database:
    "🗄️ **Dual-Engine Database Architecture**: Habtamu is experienced in both SQL and NoSQL:\n- **MongoDB & Mongoose**: Document schema modeling, data relationships, and high-growth catalog indexing (e.g. AfriMart).\n- **PostgreSQL & MySQL**: Relational schema design, SQL joins, ACID transaction management for payments and inventory balance (e.g. TrendMart).",
  experience:
    "💼 **Professional Experience**:\n1. **MERN Stack Developer @ WebStack Academy (2025)**: Built and maintained 3+ MERN applications, engineered 10+ REST API endpoints, and applied middleware architecture.\n2. **Full-Stack Developer @ Prodigy InfoTech (2025)**: Built full-stack web applications with React and Node.js with database integration and responsive UI.",
  education:
    "🎓 **Education & Academic Background**:\n- **B.Sc. in Computer Science, University of Gondar (2023 – 2027)**: Core coursework in algorithms, databases, data structures, and software engineering.\n- **Artificial Intelligence & Career Development Program, University of Maryland (2025)**: Specialized in practical AI applications and machine learning concepts.",
  projects:
    "🚀 **Key Featured Projects**:\n1. **AfriMart & TrendMart**: Production marketplaces engineered with MongoDB (AfriMart) and PostgreSQL (TrendMart) + Next.js/Node.js.\n2. **Amazon E-Commerce Clone**: MERN & Next.js platform with cart system and Chapa payment gateway.\n3. **Netflix Streaming Clone**: Full-stack streaming platform with TMDB caching and trailer player.\n4. **HabNet Cyber Defense**: Security telemetry and CVE tracking dashboard.",
  contact:
    "📩 **Contact Information**:\n- **Email**: habtamudev@gmail.com\n- **Phone**: +251-945-87-07-00\n- **Location**: Gondar, Amhara, Ethiopia\n- **GitHub**: [github.com/habtedev](https://github.com/habtedev)\n- **LinkedIn**: [linkedin.com/in/habtamudev](https://linkedin.com/in/habtamudev)",
};

function getFallbackResponse(query: string): string {
  const q = query.toLowerCase();
  if (q.includes("hi") || q.includes("hello") || q.includes("hey") || q.includes("ሰላም")) {
    return defaultResponses.greeting;
  }
  if (q.includes("backend") || q.includes("node") || q.includes("express") || q.includes("django") || q.includes("python") || q.includes("api")) {
    return defaultResponses.backend;
  }
  if (q.includes("frontend") || q.includes("react") || q.includes("next") || q.includes("ui") || q.includes("tailwind")) {
    return defaultResponses.frontend;
  }
  if (q.includes("database") || q.includes("mongo") || q.includes("postgres") || q.includes("sql") || q.includes("data")) {
    return defaultResponses.database;
  }
  if (q.includes("experience") || q.includes("work") || q.includes("job") || q.includes("webstack") || q.includes("prodigy")) {
    return defaultResponses.experience;
  }
  if (q.includes("education") || q.includes("degree") || q.includes("university") || q.includes("gondar") || q.includes("maryland")) {
    return defaultResponses.education;
  }
  if (q.includes("project") || q.includes("afrimart") || q.includes("amazon") || q.includes("netflix") || q.includes("habnet")) {
    return defaultResponses.projects;
  }
  if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("hire") || q.includes("reach")) {
    return defaultResponses.contact;
  }
  return `Habtamu Amare is a **Backend-focused Software Engineer and Full-Stack Developer** (University of Gondar CS scholar). He specializes in **Node.js, Express, Python, Django, React, Next.js 15, MongoDB, and PostgreSQL**. For direct inquiries, email **habtamudev@gmail.com** or call **+251-945-87-07-00**.`;
}

export async function POST(request: NextRequest) {
  try {
    const { message, messages = [] } = await request.json();

    if (!message && (!messages || messages.length === 0)) {
      return NextResponse.json(
        { error: "Message content is required" },
        { status: 400 }
      );
    }

    const lastMessage = message || (messages.length > 0 ? messages[messages.length - 1].content : "");
    const client = getGeminiClient();

    if (!client) {
      const fallback = getFallbackResponse(lastMessage);
      return NextResponse.json({
        response: fallback,
        model: "offline-knowledge-base",
      });
    }

    // Call Gemini 2.5 Flash model
    const promptHistory = messages.map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    if (promptHistory.length === 0 && lastMessage) {
      promptHistory.push({
        role: "user",
        parts: [{ text: lastMessage }],
      });
    }

    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: promptHistory,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        maxOutputTokens: 800,
      },
    });

    const replyText = response.text || getFallbackResponse(lastMessage);

    return NextResponse.json({
      response: replyText,
      model: "gemini-2.5-flash",
    });
  } catch (error: unknown) {
    console.error("AI Chat API error:", error);
    const fallback = getFallbackResponse("");
    return NextResponse.json({
      response: fallback,
      model: "offline-knowledge-base",
    });
  }
}
