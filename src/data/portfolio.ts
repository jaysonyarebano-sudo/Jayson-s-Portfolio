/**
 * Single source of truth for everything shown on the portfolio.
 *
 * Accuracy rules (keep these when editing):
 * - Only verified figures. Never merge numbers from different campaigns.
 * - Pipeline is not revenue. Open rates are tracked opens, not reads.
 * - Make.com templates were designed by the Cymate team; Jayson configured,
 *   implemented and troubleshot them per client account.
 * - Stingray stays anonymized until the client gives permission to be named.
 */

/* ------------------------------------------------------------------ */
/* Profile and links                                                   */
/* ------------------------------------------------------------------ */

export const profile = {
  name: "Jayson Bano",
  wordmark: "JAYSON BANO",
  title: "Cold Email and Outbound Specialist",
  titleLong: "Cold Email and Outbound Specialist | Lead Generation | Appointment Setting",
  positioning: "I build outbound systems that turn targeted prospects into qualified sales conversations.",
  heroHeadline: "I build outbound systems that turn targeted prospects into sales conversations.",
  heroCopy:
    "Cold email, lead generation, deliverability, and appointment setting for U.S. B2B businesses. Two years of hands on experience managing campaigns from prospect research through qualified replies and booked meetings.",
  supporting:
    "I combine prospect research, personalized cold email, deliverability management, reply qualification, appointment setting, and automation to help B2B businesses generate measurable outbound opportunities.",
  experience: "Two years of cold email and outbound experience",
  education: { degree: "BS Information Technology", school: "Bulacan State University" },
  location: "Plaridel, Bulacan, Philippines",
  workPreference: "Remote, with U.S. business hours overlap",
};

/**
 * Public links. Leave a value as an empty string to hide it everywhere.
 * TODO(Jayson): fill in email, LinkedIn, booking link and production URL.
 */
export const links = {
  resume: "https://drive.google.com/file/d/1Ni3l1QgLm6T2MGwtWu06orV-BhRaRCuS/view?usp=sharing",
  /** e.g. "jayson@yourdomain.com" (no "mailto:") */
  email: "",
  /** e.g. "https://www.linkedin.com/in/your-handle" */
  linkedin: "",
  /** e.g. a Calendly or Cal.com URL */
  booking: "",
  /** Production URL, e.g. "https://jaysonbano.com". Enables canonical + absolute OG URLs. */
  siteUrl: "",
};

export const navItems = [
  { label: "Work", href: "#work" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

/* ------------------------------------------------------------------ */
/* Headline metrics (Cymate, six client accounts)                      */
/* ------------------------------------------------------------------ */

export type Metric = { value: string; label: string; detail?: string };

export const cymateTotals = {
  scope: "Six B2B client accounts at Cymate",
  period: "August 2 to October 3, 2026",
  metrics: [
    { value: "169,665", label: "Emails sent" },
    { value: "78,750", label: "Leads contacted" },
    { value: "2,765", label: "Total replies" },
    { value: "455", label: "Positive replies" },
    { value: "177", label: "Meetings booked" },
    { value: "2.4%", label: "Overall bounce rate" },
  ] satisfies Metric[],
  infrastructure: [
    { value: "204", label: "Domains configured" },
    { value: "612", label: "Mailboxes configured" },
  ] satisfies Metric[],
};

export const heroProof: Metric[] = [
  { value: "177", label: "Meetings booked", detail: "across six Cymate client accounts" },
  { value: "455", label: "Positive replies", detail: "across those same accounts" },
  { value: "2.4%", label: "Overall bounce rate", detail: "across those same accounts" },
];

export const heroTools = ["Smartlead", "Clay", "Instantly", "Apollo", "Make.com"];

export const resultsDisclaimer =
  "Figures are recorded historical performance from specific campaigns and periods. Results vary by offer, audience, list quality and market, and are not a guarantee of future outcomes.";

/** Smaller, separately scoped results. Each row is one campaign; never add them together. */
export const otherResults: { label: string; platform?: string; metrics: Metric[] }[] = [
  {
    label: "Veteran Junk Removal",
    platform: "Instantly",
    metrics: [
      { value: "130", label: "Qualified opportunities" },
      { value: "$130K", label: "Pipeline (not closed revenue)" },
    ],
  },
  {
    label: "North American media and music company",
    metrics: [
      { value: "131", label: "Meetings booked" },
      { value: "313", label: "Positive replies" },
    ],
  },
  {
    label: "Beacon Mobile Media",
    metrics: [
      { value: "24", label: "Meetings booked" },
      { value: "63", label: "Positive replies" },
    ],
  },
  {
    label: "TCC Junk Removal",
    platform: "Instantly",
    metrics: [
      { value: "60", label: "Opportunities" },
      { value: "71.5%", label: "Open rate (tracked)" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Case studies                                                        */
/* ------------------------------------------------------------------ */

export type EvidenceItem = {
  title: string;
  /** Path under /public (e.g. "/evidence/cymate-report.png"). Empty = placeholder. */
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type CaseStudy = {
  slug: string;
  featured: boolean;
  client: string;
  /** True when the client label is deliberately anonymized. */
  anonymized?: boolean;
  industry: string;
  platform?: string;
  period?: string;
  summary: string;
  context: string;
  challenge: string;
  responsibilities: string[];
  execution: string[];
  results: Metric[];
  /** Labels of the results to show on the collapsed card. Defaults to the first three. */
  highlight?: string[];
  resultsNote?: string;
  lessons: string[];
  evidence: EvidenceItem[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "cymate-multi-account-outbound",
    featured: true,
    client: "Cymate, six B2B client accounts",
    industry: "Outbound agency, multiple B2B clients",
    platform: "Smartlead",
    period: "August 2 to October 3, 2026",
    summary:
      "Ran outbound campaigns and reply inboxes for six client accounts at once, from lead sourcing through qualified handoff to each client's sales team.",
    context:
      "As Campaign Manager and SDR at Cymate, Jayson managed outbound campaigns and reply inboxes for six B2B client accounts in parallel.",
    challenge:
      "Keep six accounts sending at volume while protecting sender reputation across a large mailbox footprint, and make sure interested replies were qualified and handed off to client sales teams.",
    responsibilities: [
      "Managed campaigns and reply inboxes for six B2B client accounts.",
      "Qualified interested leads, booked calls and handed them off to client sales teams.",
      "Configured sending infrastructure across 204 domains and 612 mailboxes, including SPF, DKIM, DMARC, warmup and inbox rotation.",
      "Configured, implemented and troubleshot team designed Make.com automation templates for individual client accounts.",
      "Maintained campaign reporting dashboards.",
    ],
    execution: [
      "Sourced and enriched leads with Clay and AI Ark, and verified lists with MillionVerifier before launch.",
      "Ran sequences in Smartlead and used the Smartlead API, webhooks, Make.com, Airtable and Slack for automation and reporting.",
      "Paused and audited any campaign that exceeded a 4% bounce rate, checking mailbox health, blocklists and lead list quality.",
      "Isolated recipients behind security gateways such as Mimecast when necessary.",
    ],
    results: [
      { value: "169,665", label: "Emails sent" },
      { value: "78,750", label: "Leads contacted" },
      { value: "2,765", label: "Total replies" },
      { value: "455", label: "Positive replies" },
      { value: "177", label: "Meetings booked" },
      { value: "2.4%", label: "Overall bounce rate" },
    ],
    highlight: ["Meetings booked", "Positive replies", "Overall bounce rate"],
    resultsNote: "Totals across all six accounts for the reporting period.",
    lessons: [
      "A fixed bounce threshold with a pause and audit routine keeps one weak list from damaging shared infrastructure.",
      "Next step: break results down by account and segment to show which audiences converted best.",
    ],
    evidence: [{ title: "Redacted multi account report", src: "", alt: "" }],
  },
  {
    slug: "veteran-junk-removal",
    featured: true,
    client: "Veteran Junk Removal",
    industry: "U.S. junk removal and home services",
    platform: "Instantly",
    summary:
      "Cold email to property managers, realtors and commercial accounts that produced 130 qualified opportunities and $130,000 in pipeline.",
    context:
      "A U.S. junk removal and home services company looking for recurring business from people who regularly need properties cleared.",
    challenge:
      "Reach decision makers who control repeat junk removal work, rather than one off homeowner jobs, and turn replies into qualified opportunities.",
    responsibilities: [
      "Managed the cold email campaign in Instantly.",
      "Targeted property managers, realtors and commercial accounts.",
      "Tracked replies and qualified opportunities.",
    ],
    execution: [
      "Built the audience around property managers, realtors and commercial accounts.",
      "Ran and monitored the campaign in Instantly.",
    ],
    results: [
      { value: "130", label: "Qualified opportunities" },
      { value: "$130,000", label: "Pipeline" },
      { value: "2.44%", label: "Reply rate" },
      { value: "73.29%", label: "Open rate (tracked)" },
    ],
    resultsNote:
      "Pipeline is the estimated value of qualified opportunities, not closed revenue. Open rates are tracked opens and can be inflated by privacy and security tools.",
    lessons: [
      "Audiences with repeat demand, such as property managers, are a better fit for a local service business than one time buyers.",
      "Next step: track how much of the pipeline converted to closed jobs.",
    ],
    evidence: [{ title: "Redacted Instantly campaign summary", src: "", alt: "" }],
  },
  {
    slug: "deliverability-gateway-investigation",
    featured: true,
    client: "Client campaign (anonymized)",
    anonymized: true,
    industry: "Withheld for client privacy",
    summary:
      "Investigated security gateway rejections involving Mimecast and traced them to security and sender reputation patterns.",
    context:
      "A live campaign began seeing rejections from recipients protected by the Mimecast security gateway.",
    challenge:
      "Find out why messages were being rejected and which domains and recipients were affected, without guessing or simply sending more volume.",
    responsibilities: [
      "Investigated security gateway rejections on the campaign.",
      "Audited mailbox health, blocklists and lead list quality.",
      "Investigated the affected domains and recipients.",
    ],
    execution: [
      "Audited the campaign and identified security and sender reputation related rejection patterns.",
      "Used those patterns to focus the investigation on the affected domains and recipients.",
      "Isolated gateway protected recipients where necessary, a standard practice in Jayson's deliverability work.",
    ],
    results: [
      { value: "Identified", label: "Security and reputation rejection patterns" },
      { value: "Scoped", label: "Affected domains and recipients for investigation" },
    ],
    resultsNote:
      "This is a diagnostic case study. No recovery percentage is claimed. Private domains, mailboxes and dashboards are intentionally left out.",
    lessons: [
      "Gateway rejections need their own diagnosis. Treating them as ordinary bounces hides the real cause.",
      "Next step: document recovery measurements once they can be shared.",
    ],
    evidence: [{ title: "Redacted investigation summary", src: "", alt: "" }],
  },
  {
    slug: "media-music-company",
    featured: false,
    client: "North American media and music company",
    anonymized: true,
    industry: "Media and music",
    summary:
      "Every email opened with a researched detail about the prospect's business. 313 positive replies and 131 meetings from 27,862 emails.",
    context: "A large North American media and music company. The client name is withheld pending permission.",
    challenge: "Keep outreach relevant to each prospect at volume, and convert interest into booked meetings.",
    responsibilities: [
      "Ran the cold email campaign.",
      "Researched prospects so each email could open with a relevant detail.",
      "Managed replies and meetings booked.",
    ],
    execution: ["Opened every email with a researched detail about the prospect's business."],
    results: [
      { value: "11,460", label: "Leads" },
      { value: "27,862", label: "Emails sent" },
      { value: "895", label: "Total replies" },
      { value: "313", label: "Positive replies" },
      { value: "131", label: "Meetings booked" },
      { value: "≈3.21%", label: "Reply rate (of emails sent)" },
      { value: "≈1.12%", label: "Positive reply rate (of emails sent)" },
      { value: "≈35.0%", label: "Of replies were positive" },
      { value: "≈41.9%", label: "Of positive replies became meetings" },
    ],
    highlight: ["Meetings booked", "Positive replies", "Reply rate (of emails sent)"],
    resultsNote: "Rates are calculated from the recorded totals above.",
    lessons: [
      "Researched openers held up at volume: about 35% of replies were positive.",
      "Next step: compare research depth against reply quality across segments.",
    ],
    evidence: [{ title: "Redacted campaign summary", src: "", alt: "" }],
  },
  {
    slug: "beacon-mobile-media",
    featured: false,
    client: "Beacon Mobile Media",
    industry: "Out of home advertising",
    summary:
      "Outbound to event organizers, with a dedicated follow up track for positive replies. 63 positive replies and 24 meetings.",
    context: "An out of home advertising company targeting event organizers.",
    challenge: "Turn interest from event organizers into booked meetings instead of letting warm replies go cold.",
    responsibilities: ["Ran the cold email campaign.", "Managed positive replies through a dedicated follow up track."],
    execution: ["Targeted event organizers.", "Moved positive replies into a dedicated follow up track."],
    results: [
      { value: "18,115", label: "Leads" },
      { value: "31,758", label: "Emails sent" },
      { value: "794", label: "Total replies" },
      { value: "63", label: "Positive replies" },
      { value: "24", label: "Meetings booked" },
    ],
    highlight: ["Meetings booked", "Positive replies", "Total replies"],
    lessons: [
      "A separate follow up track for interested prospects keeps them from getting lost in the main sequence.",
      "Next step: test messaging variants to raise the share of replies that are positive.",
    ],
    evidence: [{ title: "Redacted campaign summary", src: "", alt: "" }],
  },
];

/* ------------------------------------------------------------------ */
/* Capabilities, process, tools                                        */
/* ------------------------------------------------------------------ */

export type CapabilityIcon = "search" | "pen" | "shield" | "messages" | "workflow" | "chart";

export const capabilities: { icon: CapabilityIcon; title: string; body: string; value: string }[] = [
  {
    icon: "search",
    title: "Lead generation and prospect research",
    body: "Define the ICP, then build, enrich, segment, deduplicate and verify lists with Apollo, Clay, AI Ark and Sales Navigator.",
    value: "Fewer bounces and more conversations with people who can actually buy.",
  },
  {
    icon: "pen",
    title: "Cold email copywriting and campaign management",
    body: "Write personalized sequences that open with researched details, launch controlled tests and manage live campaigns in Smartlead and Instantly.",
    value: "Messaging that earns replies without burning the list.",
  },
  {
    icon: "shield",
    title: "Deliverability and sending infrastructure",
    body: "Configure domains and mailboxes with SPF, DKIM, DMARC, warmup and inbox rotation. Monitor bounces, blocklists and gateway rejections.",
    value: "A protected sender reputation, so campaigns keep reaching inboxes.",
  },
  {
    icon: "messages",
    title: "Reply management and appointment setting",
    body: "Work reply inboxes, separate real interest from noise, qualify leads, book calls and hand off to the sales team with context.",
    value: "Interested prospects become meetings instead of unanswered threads.",
  },
  {
    icon: "workflow",
    title: "Automation and reporting",
    body: "Configure Make.com scenarios, Smartlead API and webhook integrations, and Airtable and Slack workflows. Keep reporting dashboards current.",
    value: "Less manual work, faster handoffs and numbers stakeholders can trust.",
  },
  {
    icon: "chart",
    title: "Campaign analysis and optimization",
    body: "Read results by stage, from sent to replies, positive replies and meetings, find where the drop-off is, and fix the list, copy or infrastructure.",
    value: "Each campaign informs the next, instead of repeating what did not work.",
  },
];

export const processSteps: { title: string; body: string }[] = [
  { title: "Research", body: "Research the offer, ICP, buyer and trigger." },
  { title: "Build lists", body: "Build, enrich, segment, deduplicate and verify leads." },
  { title: "Infrastructure", body: "Configure infrastructure, sending limits and suppression rules." },
  { title: "Write and test", body: "Write personalized sequences and launch controlled tests." },
  { title: "Replies and meetings", body: "Handle replies, qualify interested leads, and book or hand off meetings." },
  { title: "Analyze and optimize", body: "Analyze results, document lessons and optimize the next campaign." },
];

export const toolGroups: { category: string; tools: string[] }[] = [
  { category: "Campaign management", tools: ["Smartlead", "Instantly", "EmailBison", "Lemlist"] },
  {
    category: "Lead sourcing and enrichment",
    tools: ["Apollo", "Clay", "AI Ark", "LinkedIn Sales Navigator", "Dripify", "HeyReach", "Prosp"],
  },
  { category: "Email verification", tools: ["MillionVerifier", "NeverBounce"] },
  {
    category: "Infrastructure and DNS",
    tools: ["DreamHost", "GoDaddy", "CheapInboxes", "Google Workspace", "SPF", "DKIM", "DMARC", "Warmup", "Inbox rotation"],
  },
  {
    category: "Deliverability monitoring",
    tools: ["MXToolbox", "Google Postmaster Tools", "Mail-Tester", "Sender Score"],
  },
  { category: "Automation", tools: ["Make.com", "Zapier", "Smartlead API", "Webhooks"] },
  {
    category: "CRM and operations",
    tools: ["HubSpot", "Airtable", "Zoho (familiar)", "Jobber", "ClickUp", "Slack", "Trello"],
  },
  {
    category: "Additional",
    tools: [
      "Omnisend",
      "Beehiiv",
      "Google Ads",
      "Meta Business Suite",
      "Canva",
      "CapCut",
      "Excel",
      "Microsoft Office",
      "ChatGPT",
      "Claude",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Work samples (placeholders until real, redacted assets exist)       */
/* ------------------------------------------------------------------ */

export type WorkSample = {
  title: string;
  description: string;
  /** Path under /public once a redacted asset exists. Empty = placeholder. */
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export const workSamples: WorkSample[] = [
  {
    title: "Smartlead campaign screenshots",
    description: "Redacted campaign views showing sequence structure and stage metrics.",
    src: "",
    alt: "",
  },
  {
    title: "Cold email and follow up examples",
    description: "Anonymized first touch and follow up emails with the reasoning behind them.",
    src: "",
    alt: "",
  },
  {
    title: "Anonymized lead list sample",
    description: "Sample rows showing segmentation, enrichment fields and verification status.",
    src: "",
    alt: "",
  },
  {
    title: "Weekly campaign report",
    description: "The format used to report sends, replies, positive replies and meetings to stakeholders.",
    src: "",
    alt: "",
  },
  {
    title: "Automation workflow diagram",
    description: "How reply and reporting automation connects across tools, with private details removed.",
    src: "",
    alt: "",
  },
  {
    title: "Deliverability investigation summary",
    description: "A redacted write up of a gateway rejection investigation and its findings.",
    src: "",
    alt: "",
  },
];

/* ------------------------------------------------------------------ */
/* About and timeline                                                  */
/* ------------------------------------------------------------------ */

export const aboutParagraphs = [
  "I'm Jayson Bano, a Cold Email and Outbound Specialist with two years of experience supporting U.S. B2B clients. My work combines prospect research, lead generation, cold email execution, deliverability monitoring, reply qualification, appointment setting, and automation.",
  "I approach outbound as a complete system. The goal is not simply to send more emails, but to reach relevant prospects, protect sending reputation, and create measurable sales opportunities.",
  "My background in administration and procurement also strengthened my organization, documentation, and coordination skills.",
];

export const timeline: { period: string; role: string; org: string; body: string; secondary?: boolean }[] = [
  {
    period: "Aug 2026 to Oct 2026",
    role: "Campaign Manager and SDR",
    org: "Cymate",
    body: "Managed outbound campaigns and reply inboxes for six B2B client accounts. Configured 204 domains and 612 mailboxes.",
  },
  {
    period: "Jan 2025 to Jul 2026",
    role: "Cold Email Specialist, Freelance",
    org: "Eight U.S. clients",
    body: "Cold email programs across junk removal, business funding, land use consulting, commercial cleaning, digital marketing and employee benefits. Built sending infrastructure and ran campaigns at up to 1,000 emails per day.",
  },
  {
    period: "Dec 2019 to Dec 2024",
    role: "Administration and Procurement",
    org: "MJMI Construction and Trading",
    body: "Won three consecutive large bids through SAP Ariba, including a P500 million plus contract with Manila Water, the company's first major bid win in 24 years. Prepared three to five tenders a month.",
    secondary: true,
  },
];

export const contactCopy = {
  headline: "Let's build a better outbound pipeline.",
  body: "If you need someone who can research prospects, manage cold email campaigns, protect deliverability, and turn interested leads into sales conversations, let's talk.",
};
