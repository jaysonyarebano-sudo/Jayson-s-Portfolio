/**
 * Single source of truth for everything shown on the portfolio.
 *
 * Accuracy rules (keep these when editing):
 * - Only verified figures. Never merge numbers from different campaigns.
 * - Pipeline is not revenue. Open rates are tracked opens, not reads.
 * - Make.com templates were designed by the Cymate team; Jayson configured,
 *   implemented and troubleshot them per client account.
 * - Client names stay confidential unless they were already published with permission
 *   (Beacon Mobile Media, Veteran Junk Removal). Image filenames are anonymized too,
 *   because they show up in image URLs.
 * - Swipe file templates and the case study drop email are samples, and are labeled as such.
 */

/* ------------------------------------------------------------------ */
/* Profile and links                                                   */
/* ------------------------------------------------------------------ */

export const profile = {
  name: "Jayson Bano",
  wordmark: "JAYSON BANO",
  title: "Cold Email and Outbound Specialist",
  titleLong: "Cold Email and Outbound Specialist | Lead Generation | Appointment Setting",
  heroHeadline: "I build signal-based B2B cold email systems that turn cold lists into booked meetings.",
  heroCopy:
    "Every campaign starts from a live reason to write, like an open job or an upcoming event, goes to the person who acts on it, and sends from infrastructure sized to what the campaign actually needs. I run the whole pipeline: research, lists, deliverability, copy, testing, and the reply that becomes a meeting.",
  headshot: { src: "/evidence/jayson-bano-headshot.jpg", width: 1174, height: 912 },
  location: "Plaridel, Bulacan, Philippines",
  workPreference: "Remote, with U.S. business hours overlap",
};

/**
 * Public links. Leave a value as an empty string to hide it everywhere.
 * TODO(Jayson): fill in LinkedIn, booking link and production URL.
 */
export const links = {
  resume: "https://drive.google.com/file/d/1Ni3l1QgLm6T2MGwtWu06orV-BhRaRCuS/view?usp=sharing",
  /** No "mailto:". Also receives the teardown form requests. */
  email: "jayson.yare.bano@gmail.com",
  /** e.g. "https://www.linkedin.com/in/your-handle" */
  linkedin: "",
  /** e.g. a Calendly or Cal.com URL */
  booking: "",
  /** Production URL, e.g. "https://jaysonbano.com". Enables canonical + absolute OG URLs. */
  siteUrl: "",
};

export const navItems = [
  { label: "Process", href: "#process" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Swipe File", href: "#swipe-file" },
  { label: "Tools", href: "#tools" },
] as const;

/* ------------------------------------------------------------------ */
/* Shared types                                                        */
/* ------------------------------------------------------------------ */

export type Metric = { value: string; label: string; detail?: string };

export type Shot = {
  /** Path under /public. */
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

/* ------------------------------------------------------------------ */
/* Hero metrics (Cymate, six client accounts)                          */
/* ------------------------------------------------------------------ */

export const heroScope = "Six B2B client accounts · Aug 2 to Oct 3, 2026";

export const heroMetrics: Metric[] = [
  { value: "169,665", label: "Emails sent" },
  { value: "3.5%", label: "Avg. reply rate", detail: "2,765 replies from 78,750 contacts" },
  { value: "455", label: "Positive replies" },
  { value: "177", label: "Meetings booked", detail: "39% of positive replies" },
  { value: "2.4%", label: "Bounce rate", detail: "across every email sent" },
];

export const heroInfra = "204 domains and 612 inboxes set up and managed";

export const resultsDisclaimer =
  "Figures are recorded historical performance from specific campaigns and periods. Results vary by offer, audience, list quality and market, and are not a guarantee of future outcomes.";

/* ------------------------------------------------------------------ */
/* Process                                                             */
/* ------------------------------------------------------------------ */

export type ProcessStep = {
  id: string;
  title: string;
  kicker: string;
  summary: string;
  /** Labeled points, rendered as a definition grid. */
  points?: { label: string; body: string }[];
  /** Ordered pipeline, rendered as numbered steps with the tool used. */
  pipeline?: { tool: string; title: string; body: string }[];
  bullets?: { title: string; items: string[] };
  callout?: { title: string; body: string };
  stats?: Metric[];
  shot?: Shot;
};

export const processIntro =
  "Most cold email fails before the first word is written: wrong list, no reason to write, burned domains. So I treat outbound as a technical and strategic pipeline, where every stage is measured and every stage feeds the next.";

export const processSteps: ProcessStep[] = [
  {
    id: "icp",
    title: "ICP research and segmentation",
    kicker: "Who to target, and why now",
    summary:
      "I start from the client's offer and its proof, then pick two or three segments where both fit. A segment is only worth emailing when there's a visible reason to write now.",
    points: [
      { label: "The companies", body: "Industry, size, and location." },
      {
        label: "The decision maker",
        body: "The person who acts on the problem, which changes with company size: the owner at a small firm, an operations or department lead at a larger one.",
      },
      {
        label: "The signal",
        body: "What qualifies a company now: an open job posting for a role the client fills, a recent funding round, or attendance at an upcoming event.",
      },
      {
        label: "The exclusions",
        body: "Size limits, a title check (for example, removing firms that already employ an in-house recruiter) and a manual review. Not broad keyword filters: a word like “hospital” also removes real small practices.",
      },
    ],
    callout: {
      title: "How I rank segments",
      body: "The segment closest to what the client already sells well goes first. A segment that needs proof the client doesn't have yet, such as case studies for senior-level work, waits until that proof exists.",
    },
  },
  {
    id: "lists",
    title: "List building from the signal",
    kicker: "Verified data, real pain points",
    summary:
      "The list starts from the signal, not the company, because the signal is the reason to write. Every row carries the evidence behind it.",
    pipeline: [
      {
        tool: "Apollo · AI Ark",
        title: "Find",
        body: "Companies that match the segment's filters, and the decision maker at each one.",
      },
      {
        tool: "Clay · Claygent",
        title: "Confirm the signal",
        body: "A research column checks the careers page, LinkedIn and Indeed, and returns the role, posting link, date posted and source in separate columns. It returns “none” rather than guessing.",
      },
      {
        tool: "Clay · AI column",
        title: "Clean the variables",
        body: "Raw titles become words an email can use: “Litigation Paralegal (In-person New York, NY)” becomes “litigation paralegal.”",
      },
      {
        tool: "MillionVerifier",
        title: "Verify every email",
        body: "Only “good” results are sent. Catch-all addresses go out in small test batches first.",
      },
      {
        tool: "Final check",
        title: "Recheck before sending",
        body: "Postings close quickly, so any signal older than 30 days, or no longer live, comes out of the list.",
      },
    ],
    callout: {
      title: "Cost awareness",
      body: "A Claygent check costs about 3 Clay credits per row, far more than an Apollo export (about $1.65 per 1,000 leads). So the expensive check only runs on companies that already passed the cheaper filters, and always on a small sample first.",
    },
    shot: {
      src: "/evidence/clay-lead-list-sample.png",
      alt: "Clay table of law firm decision makers with columns for title, company, verified email, employee count, the open job posting, date posted, posting URL and source.",
      caption: "Clay table from a real build: decision maker, verified email, and the live job posting that qualified each firm, with date and source.",
      width: 1917,
      height: 871,
    },
  },
  {
    id: "maths",
    title: "Market sizing and the maths",
    kicker: "Plan around the smaller number",
    summary:
      "Before anything sends, I compare how many people the inboxes can reach with how many companies actually have a reason to hear from us. Whichever number is smaller sets the plan.",
    points: [
      {
        label: "Sending capacity",
        body: "1,000 emails a day ÷ a 3-step sequence = about 333 new contacts a day, or about 7,300 a month over 22 sending days.",
      },
      {
        label: "Market size",
        body: "Two counts per segment, with screenshots of the filters: every company that fits, and the companies showing the signal right now. In one recent analysis, 43,100 companies fit but only 713 (1.7%) had a live posting.",
      },
      {
        label: "Expected results",
        body: "A range, not one number, from my own data: 3.5% reply and 0.6% interested on average across six B2B accounts, up to 16.9% reply and 8.4% interested on my strongest signal-based campaign.",
      },
      {
        label: "Test before scaling",
        body: "When a list depends on an expensive check, I run a few hundred companies per segment first, measure the real hit rate, and only then decide if the full list is worth the spend.",
      },
    ],
  },
  {
    id: "infrastructure",
    title: "Infrastructure and deliverability",
    kicker: "Inbox placement is engineered, not hoped for",
    summary:
      "I size domains and inboxes to the campaigns that are running, not to an eventual volume goal, and add more only when a campaign has proven it deserves the volume.",
    bullets: {
      title: "The setup",
      items: [
        "Secondary domains only, close to the client's brand and forwarding to the main site. The primary domain never sends cold email.",
        "3 inboxes per domain, bought through providers like InboxKit or Zapmail.",
        "SPF, DKIM and DMARC on every domain before warmup, plus a custom tracking domain.",
        "About 2 weeks of warmup, then a slow ramp: around 8 cold emails per inbox a day in week one, rising to about 15.",
        "Backup domains warming at all times, so a flagged domain is replaced the same day.",
        "Any campaign over a 4% bounce rate pauses for an audit: inbox health, then blocklists, then the list itself.",
      ],
    },
    callout: {
      title: "Example: bounces that weren't the inboxes' fault",
      body: "In one campaign the inboxes and domains were clean; the bounces came from contacts behind security gateways like Mimecast. I tagged every lead by email provider with an MX lookup and moved gateway contacts into a separate plain-text campaign with no links or tracking, sent from inboxes matched to the recipient's provider.",
    },
    stats: [
      { value: "204", label: "Domains configured" },
      { value: "612", label: "Inboxes configured" },
      { value: "2.4%", label: "Bounce rate on 169,665 emails" },
    ],
    shot: {
      src: "/evidence/deliverability-audit.png",
      alt: "Written Smartlead audit of a paused campaign: settings, bounce rate of 0.72%, reply breakdown showing most replies were out of office, and mailbox health across 45 inboxes.",
      caption: "A campaign audit: the 4.3% reply rate looked healthy, but 31 of 42 replies were out-of-office. Reading the replies, not the dashboard, decides the next move.",
      width: 1087,
      height: 870,
    },
  },
  {
    id: "copy",
    title: "Copywriting frameworks",
    kicker: "Short, specific, easy to answer",
    summary:
      "Every first email opens with the signal, so the prospect knows in one line why they're hearing from me. The rest stays short: the problem the signal points to, what the client does about it, and one easy question.",
    points: [
      {
        label: "Signal → Problem → Fix → Ask",
        body: "First touches. My version of Problem-Impact-Next Step: the trigger, the problem it creates, one line on the mechanism, one low-commitment question.",
      },
      {
        label: "Insight → Mechanism → Ask",
        body: "Follow-ups. Each one gives a new reason to reply, like a practical point about the prospect's process. Never “just bumping this.”",
      },
      {
        label: "Proof → Mechanism → Ask",
        body: "The case study drop, for offers with a verified win: one specific metric, one sentence on how, and a CTA that asks for a look, not a meeting.",
      },
    ],
    bullets: {
      title: "Rules I write by",
      items: [
        "Plain text, with no links or images in the first email.",
        "Under 120 words, with no more than two sentences per paragraph.",
        "Spintax on the greeting and key phrases, so emails vary.",
        "A fallback for every variable, so a missing first name reads “Hi there” and not “Hi ,”.",
        "Phrasing that works for every value: “hiring for the {{role}} role,” not “a {{role}},” which breaks on titles that start with a vowel.",
        "Nothing the client can't back up: no invented results, prices or timelines.",
      ],
    },
  },
  {
    id: "testing",
    title: "Testing and iteration",
    kicker: "Find the problem that makes them reply",
    summary:
      "I pick the audience's two or three biggest pain points and write a separate subject line and email for each, so each version answers one question: which problem makes this audience reply?",
    bullets: {
      title: "How a test runs",
      items: [
        "Each variant gets 200 to 300+ sends before I call it, so one lucky day doesn't pick the winner.",
        "The winner gets the volume. The losing angle becomes a follow-up instead of being thrown away.",
        "The call to action gets tested too: a direct ask for a call against a lighter question, since a smaller ask is often easier to answer.",
        "Week one is about deliverability and list accuracy. Copy changes wait until there's enough reply data to judge them.",
        "Every week ends with a short report: what was sent, what came back, what I changed, and what I'll test next.",
      ],
    },
    points: [
      { label: "High bounces", body: "Fix the list, not the copy. Tighten verification and remove catch-all addresses." },
      {
        label: "Delivered, few replies",
        body: "Test the subject line, opening line and CTA. If that doesn't move replies, try a different segment or signal.",
      },
      { label: "Replies, few interested", body: "Change the offer and the angle by testing a different pain point." },
      {
        label: "Interested, not booking",
        body: "Fix reply speed and the next step offered, before anything in the sequence changes.",
      },
    ],
  },
  {
    id: "replies",
    title: "From reply to booked meeting",
    kicker: "A positive reply is only worth something if it books",
    summary:
      "I own the conversation from the first “interested” until the lead books or says no. Automation logs every positive reply, so nobody has to watch the inbox all day.",
    pipeline: [
      { tool: "Smartlead", title: "Tag", body: "Tag the reply as interested, which stops the sequence for that lead." },
      { tool: "Make.com → CRM", title: "Log", body: "Log it in the CRM with the signal, the link, and what they said, and send an alert." },
      { tool: "Within the hour", title: "Reply", body: "Answer only what they asked, and offer two times or a booking link." },
      { tool: "Two working days", title: "Follow up", body: "If they haven't booked, follow up once in the same thread." },
    ],
    callout: {
      title: "Example: interested leads who went quiet",
      body: "On one account, leads kept saying they were interested and then stopped replying before booking. I set up a separate follow-up track just for positive replies that ran until each one booked or declined, and 24 of 63 interested leads became meetings.",
    },
    stats: [
      { value: "177", label: "Meetings booked" },
      { value: "39%", label: "Of positive replies became meetings" },
    ],
    shot: {
      src: "/evidence/make-reply-automation.png",
      alt: "Make.com scenario: a webhook for interested replies, a Google Sheets lookup, a router that updates or adds the lead row, and Slack alerts on both paths.",
      caption: "Positive reply automation in Make.com: webhook → CRM lookup → update or add the lead → Slack alert. Template by the Cymate team; configured and maintained by me per client.",
      width: 1917,
      height: 866,
    },
  },
];

/* ------------------------------------------------------------------ */
/* Case studies                                                        */
/* ------------------------------------------------------------------ */

/** A line of an email. `note` points at an entry in the template's notes (1-based). */
export type EmailLine = { text: string; note?: number };

export type EmailSample = {
  label: string;
  subject: string;
  /** Paragraphs; each paragraph is one or more annotated lines. */
  body: EmailLine[][];
  notes: string[];
  /** Shown as a small tag, e.g. "Real copy" or "Sample". */
  source: string;
};

export const triggerCase = {
  number: "01",
  name: "The “Trigger Event” Campaign",
  angle: "Reach out because something just changed at the prospect's company, and say so in the first line.",
  signals: [
    { title: "Attending an event", body: "Executives registered for a trade show, emailed before it with a reason to meet there." },
    { title: "Hiring for a role", body: "A live job posting from the last 30 days for a role the client can fill or support." },
    { title: "A new round or new tech", body: "A recent funding round, or a switch to a competitor's technology, confirmed per row in Clay." },
  ],
  proof: {
    client: "Large North American media company",
    audience: "TV and streaming executives attending MIPCOM in Cannes",
    platform: "Smartlead",
    approach:
      "The signal was attendance itself. Each email asked the executive to meet during the event, so the reason to write and the ask were the same thing: we'll both be in Cannes, so let's meet there.",
    metrics: [
      { value: "2,141", label: "Executives contacted" },
      { value: "16.9%", label: "Replied (362)" },
      { value: "8.4%", label: "Interested (179)" },
      { value: "1.1%", label: "Bounce rate" },
    ] satisfies Metric[],
    accountNote: "131 meetings booked across the account in two months.",
    shots: [
      {
        src: "/evidence/smartlead-event-campaign.png",
        alt: "Smartlead campaign analytics: 2,141 leads contacted, 179 positive replies, 362 unique replies, 63 bounces at a 1.1% bounce rate, campaign completed.",
        caption: "The event campaign in Smartlead: 179 positive replies from 2,141 contacts, 1.1% bounce rate.",
        width: 1912,
        height: 985,
      },
      {
        src: "/evidence/media-company-dashboard.png",
        alt: "Account dashboard for August 2 to October 3, 2026: 27,862 emails sent, 11,460 leads reached, 895 replies, 305 positive replies and 131 meetings booked.",
        caption: "The whole account for the same period: 27,862 emails, 305 positive replies, 131 meetings booked.",
        width: 1017,
        height: 490,
      },
    ] satisfies Shot[],
  },
  listBuild: [
    "Filter the market down to companies showing the signal: Apollo's job postings filter for the roles, posted in the last 30 days.",
    "Confirm every signal in Clay: the exact role, the posting link, and the date it went up. No posting found means the row is removed.",
    "Rewrite the role into a clean variable so the first line reads naturally.",
    "Recheck right before sending. A closed posting is a wrong reason to write.",
  ],
  email: {
    label: "Signal email · law and accounting firms",
    source: "Real copy from a client strategy",
    subject: "Your {{job_title}} opening",
    body: [
      [{ text: "Hi {{first_name | default: \"there\"}},", note: 1 }],
      [
        { text: "I noticed {{company_name}} is hiring for the {{job_title}} role.", note: 2 },
        { text: "Finding the right person while keeping client work moving can pull your team away from client work.", note: 3 },
      ],
      [
        { text: "We help law and accounting firms find qualified local candidates for permanent support roles." },
        { text: "Every search includes recorded first interviews and candidate summaries, so you can review candidates before meeting them.", note: 4 },
      ],
      [{ text: "Are you open to a brief conversation about the role?", note: 5 }],
    ],
    notes: [
      "A fallback on every variable: a missing name reads “Hi there,” never “Hi ,”.",
      "The signal is the first sentence. The prospect knows exactly why they're hearing from me.",
      "The problem the signal points to, in their words, not ours.",
      "One differentiator most competitors can't claim, with no fees, timelines or results the client can't back up.",
      "One soft question. Easy to say yes to without opening a calendar.",
    ],
  } satisfies EmailSample,
};

export const caseDropCase = {
  number: "02",
  name: "The “Case Study Drop” Campaign",
  angle: "Lead with a real win for a similar company, so authority is established before the prospect finishes the first line.",
  formula: "We recently helped [similar company] achieve [specific metric] by [one-sentence mechanism].",
  proof: {
    client: "Veteran Junk Removal",
    audience: "Property managers, realtors and commercial accounts",
    platform: "Instantly · Dec 15 to May 30",
    approach:
      "I built the infrastructure and sent about 1,000 emails a day to people who need properties cleared again and again, not one-off homeowners. That repeat demand is the mechanism the drop email names.",
    metrics: [
      { value: "130", label: "Qualified opportunities" },
      { value: "$130K", label: "Pipeline (not closed revenue)" },
      { value: "2.44%", label: "Reply rate" },
      { value: "43.3K", label: "Emails sent" },
    ] satisfies Metric[],
    shot: {
      src: "/evidence/junk-removal-instantly-analytics.png",
      alt: "Instantly analytics from December 15 to May 30: 43.3K emails sent, 73.29% open rate, 2.44% reply rate, 130 opportunities worth $130,000.",
      caption: "The win being dropped: 130 opportunities and $130,000 in pipeline in Instantly. Open rate shown is tracked opens.",
      width: 1077,
      height: 497,
    } satisfies Shot,
  },
  email: {
    label: "Case study drop · home services owners",
    source: "Sample built from the verified result above",
    subject: "property managers",
    body: [
      [{ text: "Hi {{first_name | default: \"there\"}},", note: 1 }],
      [
        {
          text: "We recently helped a U.S. junk removal company generate 130 qualified opportunities by emailing the property managers and realtors who need clear-outs every month.",
          note: 2,
        },
      ],
      [{ text: "{{company_name}} serves the same kind of buyer, so the same play could fit.", note: 3 }],
      [{ text: "Worth a quick look at the 2-page breakdown?", note: 4 }],
    ],
    notes: [
      "Two-word, lowercase subject. Reads like an internal note, not a campaign.",
      "The formula in one sentence: similar company, one specific metric, one-line mechanism. Verified, and labeled as opportunities, not revenue.",
      "One line of relevance, so the proof feels like it's about them.",
      "A low-friction CTA: asks for a look at an asset, not 30 minutes of their calendar.",
    ],
  } satisfies EmailSample,
  ctaCompare: {
    high: "Are you free for a 30-minute call next Tuesday?",
    low: "Worth a quick look at the 2-page breakdown?",
    why: "The first asks for a meeting from a stranger. The second asks for a yes that costs nothing, and the breakdown, sent on reply, does the selling.",
  },
};

/* ------------------------------------------------------------------ */
/* Strategy deep dive: recruitment agency                              */
/* ------------------------------------------------------------------ */

export const strategyDive = {
  title: "Inside a real strategy: recruitment agency",
  intro:
    "The research and plan I delivered to a U.S. recruitment agency before a single email went out. This is what “hiring signal” targeting looks like in practice, from segment choice to the reply drafts.",
  segments: [
    {
      rank: 1,
      name: "Law and accounting firms",
      size: "11 to 200 employees",
      deciders: "Managing Partner, Founding Partner, Firm Administrator, Office Manager, Director of Operations, COO",
      signal: "Legal Assistant, Paralegal, Client Intake, Receptionist, Executive Assistant, Billing Specialist posted in the last 30 days",
      exclude: "In-house recruiter or talent team, firms over 200 staff, staffing firms",
    },
    {
      rank: 2,
      name: "Dental and medical practices",
      size: "1 to 100 employees",
      deciders: "Practice Owner, Dentist, Physician Owner, Practice Manager, Office Manager",
      signal: "Front Desk, Patient Coordinator, Treatment Coordinator, Insurance Coordinator, Medical Biller posted in the last 30 days",
      exclude: "Hospitals, health systems, large DSOs, practices already hiring through an agency",
    },
    {
      rank: 3,
      name: "Marketing and creative agencies",
      size: "11 to 150 employees",
      deciders: "Founder, CEO, Managing Director, COO, Head of Operations",
      signal: "Project, Client or Account Coordinator, Executive Assistant, Operations Coordinator posted in the last 30 days",
      exclude: "In-house recruiter, agencies over 150 staff, agencies selling recruitment marketing",
    },
  ],
  whyFirst: [
    "Support roles match the client's own intake form, so the client already knows how to fill them.",
    "Small firms hire these roles often, and the owner or office manager usually decides alone: a shorter sales cycle.",
    "The client's proof, six testimonials from small business founders, fits these buyers. Senior searches need case studies the client doesn't have yet.",
  ],
  market: [
    { segment: "Law and accounting firms", fit: "14,800", hiring: "474", share: "3.2%" },
    { segment: "Dental and medical practices", fit: "9,300", hiring: "96", share: "1.0%" },
    { segment: "Marketing and creative agencies", fit: "19,000", hiring: "143", share: "0.8%" },
    { segment: "Total", fit: "43,100", hiring: "713", share: "1.7%" },
  ],
  maths: {
    capacity: "≈7,300 new contacts a month",
    capacityNote: "1,000 emails a day across a 3-email sequence, 22 sending days",
    market: "713 firms hiring now",
    marketNote: "Apollo, all three segments, a matching job posted in the last 30 days",
    conclusion:
      "Hiring signals, not sending capacity, are the limit. So the plan was to find more hiring firms with Clay before adding volume, and to keep daily volume lower rather than fill it with firms that have no reason to hear from us.",
  },
  forecast: [
    { scenario: "Average of my last 6 B2B accounts", reply: "3.5%", interested: "0.6%", perMonth: "≈25 replies · ≈4 interested" },
    { scenario: "My strongest signal-based campaign", reply: "16.9%", interested: "8.4%", perMonth: "≈120 replies · ≈60 interested" },
  ],
  costs: [
    { item: "Claygent role check (≈3 credits per row)", cost: "≈$220" },
    { item: "Apollo contact export", cost: "$1.65" },
    { item: "Email verification", cost: "$3.40" },
  ],
  testPlan: {
    full: "≈$9,500 to run Claygent on all 43,100 companies",
    test: "≈$330 to test 500 random companies per segment first",
    body: "Measure the real hiring rate against Apollo's count, then run the full list only where the test pays off.",
  },
  sampleNote:
    "25 real leads from segment 1, each with a posting live in the last 30 days, a verified email, and no in-house recruiter. Nobody on the list had been contacted.",
  sequence: [
    {
      step: "Email 1 · Day 1",
      purpose: "First touch: the signal, the problem, the differentiator, one question.",
      excerpt: "I noticed {{company_name}} is hiring for the {{job_title}} role…",
    },
    {
      step: "Email 2 · Day 3",
      purpose: "Add a practical insight, not a bump.",
      excerpt: "One thing worth considering when hiring for a support role is how much time your team spends interviewing candidates who may not be the right fit…",
    },
    {
      step: "Email 3 · Day 5",
      purpose: "Close the loop, and offer to reach the right person.",
      excerpt: "If someone else handles hiring at {{company_name}}, I'm happy to reach out to the appropriate person instead.",
    },
  ],
  replies: [
    {
      objection: "“What do you charge?”",
      reply: "Good question. Our fee depends on the role and the salary, so we set it on a short call where it can be specific to your search. Would Tuesday or Wednesday afternoon work?",
    },
    {
      objection: "“Send me some candidates.”",
      reply: "Happy to. So the people we send actually fit, I'd need 15 minutes on the role, the salary range, and your must-haves. Would Tuesday or Wednesday work for a quick call?",
    },
    {
      objection: "“Not hiring right now.”",
      reply: "Thanks for letting me know. I saw the {{role}} posting, so I assumed the search was still open. Would it be all right if I checked back in a few months?",
    },
    {
      objection: "“We already use a recruiter.”",
      reply: "That makes sense. Some firms keep a second option for roles their main recruiter isn't focused on. If that's ever useful, we'd be glad to take one search.",
    },
  ],
  clientQuestion:
    "The most important question I raised: the sending domains resembled the client's sister company, which places offshore assistants. A prospect looking up the sender could connect the two brands, which the client wanted kept separate, so I asked for new domains before anything sent.",
};

/* ------------------------------------------------------------------ */
/* More campaigns and raw dashboards                                   */
/* ------------------------------------------------------------------ */

export type Campaign = {
  client: string;
  what: string;
  metrics: Metric[];
  shot?: Shot;
};

export const moreCampaigns: Campaign[] = [
  {
    client: "Beacon Mobile Media · emailing U.S. event organizers",
    what: "Added a dedicated follow-up track for interested leads who went quiet before booking.",
    metrics: [
      { value: "18,115", label: "Contacted" },
      { value: "794", label: "Replies" },
      { value: "63", label: "Interested" },
      { value: "24", label: "Meetings" },
    ],
    shot: {
      src: "/evidence/mobile-advertising-dashboard.png",
      alt: "Account dashboard for August 2 to October 3, 2026: 31,758 emails sent, 18,115 leads reached, 794 replies, 63 positive replies, 24 meetings booked.",
      caption: "Beacon Mobile Media, Aug 2 to Oct 3, 2026.",
      width: 1020,
      height: 492,
    },
  },
  {
    client: "AI fulfillment platform for e-commerce brands",
    what: "Built the list and outreach for e-commerce founders and operators.",
    metrics: [
      { value: "26,459", label: "Emails sent" },
      { value: "344", label: "Replies" },
      { value: "0.8%", label: "Bounce rate" },
    ],
    shot: {
      src: "/evidence/ai-fulfillment-dashboard.png",
      alt: "Account dashboard for August 2 to October 3, 2026: 26,459 emails sent, 8,997 leads reached, 211 bounces, 344 replies, 23 positive replies, 3 meetings booked.",
      caption: "AI fulfillment platform, Aug 2 to Oct 3, 2026.",
      width: 1017,
      height: 492,
    },
  },
  {
    client: "Digital product agency · email plus LinkedIn",
    what: "Ran cold email alongside a LinkedIn track in HeyReach, with interested LinkedIn replies auto-tagged.",
    metrics: [
      { value: "20,121", label: "Emails sent" },
      { value: "273", label: "Replies" },
      { value: "23", label: "Interested" },
      { value: "11", label: "Meetings" },
    ],
    shot: {
      src: "/evidence/digital-product-dashboard.png",
      alt: "Account dashboard for August 2 to October 3, 2026: 20,121 emails sent, 273 replies, 23 positive replies, 11 meetings booked, plus LinkedIn: 480 connection requests, 74 accepted, 6 interested.",
      caption: "Digital product agency, Aug 2 to Oct 3, 2026.",
      width: 1017,
      height: 687,
    },
  },
  {
    client: "TCC Junk Removal · freelance",
    what: "Cold email in Instantly for a U.S. junk removal company.",
    metrics: [
      { value: "60", label: "Opportunities" },
      { value: "71.5%", label: "Open rate (tracked)" },
    ],
  },
];

/** Account 5 and 6 dashboards, shown so every account behind the totals is visible. */
export const otherDashboards: Shot[] = [
  {
    src: "/evidence/account-5-dashboard.png",
    alt: "Account dashboard for September 2 to October 3, 2026: 16,285 emails sent, 82 replies, 8 positive replies, 2 meetings, plus LinkedIn: 503 connection requests, 216 accepted, 48 interested.",
    caption: "B2B account 5, Sep 2 to Oct 3, 2026: most interest came from LinkedIn (48 interested).",
    width: 1016,
    height: 690,
  },
  {
    src: "/evidence/account-6-dashboard.png",
    alt: "Account dashboard for September 2 to October 3, 2026: 16,922 emails sent, 116 replies, 2 positive replies, 0 meetings, plus LinkedIn: 359 connection requests, 55 accepted, 5 interested.",
    caption: "B2B account 6, Sep 2 to Oct 3, 2026: a weak segment, and the reason testing comes before volume.",
    width: 1017,
    height: 686,
  },
];

export const replyProof: Shot = {
  src: "/evidence/reply-to-meeting-thread.png",
  alt: "Redacted email thread: a media strategy director replies that they scheduled a call for next Wednesday after receiving a media deck and booking link. The lead is tagged Meeting Request.",
  caption: "What the end of the pipeline looks like: a prospect books after getting the deck and a booking link in the same reply.",
  width: 1396,
  height: 931,
};

/* ------------------------------------------------------------------ */
/* Swipe file                                                          */
/* ------------------------------------------------------------------ */

export const swipeIntro =
  "Four more templates I reach for, by scenario, on top of the two in the case studies. The numbered notes explain why each line is there. Variables in {{braces}} come from the enriched list.";

export const swipeFile: (EmailSample & { scenario: string; when: string })[] = [
  {
    scenario: "The Signal / Trigger Email",
    when: "A company just did something that creates the problem your client solves.",
    label: "Signal email · dental and medical practices",
    source: "Real copy from a client strategy",
    subject: "Your front desk opening",
    body: [
      [{ text: "Hi {{first_name | default: \"there\"}},", note: 1 }],
      [
        { text: "I noticed {{company_name}} is hiring for the {{job_title}} role.", note: 2 },
        {
          text: "When front desk or patient coordination roles are open, keeping appointments, communicating with patients, and handling daily office tasks can stretch the existing team.",
          note: 3,
        },
      ],
      [
        {
          text: "We help dental and medical practices find qualified local candidates for permanent support roles, including front desk and patient coordination positions.",
        },
      ],
      [{ text: "Would you be open to a brief conversation about your hiring needs?", note: 4 }],
    ],
    notes: [
      "Three words of subject, naming their opening. Short enough to read in full on a phone.",
      "The trigger, stated plainly in sentence one.",
      "The day-to-day pain, in the practice's own vocabulary: appointments, patients, the front desk.",
      "A low-commitment question about their needs, not a request for a calendar slot.",
    ],
  },
  {
    scenario: "The Straight-to-Value Follow-up",
    when: "Day 3. The prospect didn't reply to the signal email, so give them something useful.",
    label: "Follow-up · practical insight",
    source: "Real copy from a client strategy",
    subject: "Re: Your {{job_title}} opening",
    body: [
      [{ text: "Hi {{first_name | default: \"there\"}},", note: 1 }],
      [
        {
          text: "One thing worth considering when hiring for a support role is how much time your team spends interviewing candidates who may not be the right fit.",
          note: 2,
        },
      ],
      [
        {
          text: "Our process includes an initial recorded interview and a one page candidate summary, giving you a clearer picture before deciding whom to meet.",
          note: 3,
        },
      ],
      [{ text: "Could that be useful for your {{job_title}} search?", note: 4 }],
    ],
    notes: [
      "Same thread, so the original signal is still one scroll away.",
      "Leads with an insight about their hiring process, not a reminder that I emailed.",
      "The mechanism, tied directly to the pain the insight just named.",
      "Asks if it's useful, not for a meeting. The role variable keeps it specific.",
    ],
  },
  {
    scenario: "The Peer Referral",
    when: "Unsure who owns the problem, or the first contact went quiet.",
    label: "Referral · right person",
    source: "Sample template",
    subject: "right person?",
    body: [
      [{ text: "Hi {{first_name | default: \"there\"}},", note: 1 }],
      [
        { text: "I saw {{company_name}} is hiring for the {{job_title}} role.", note: 2 },
        { text: "Are you the right person to talk to about filling it, or does someone else handle hiring?", note: 3 },
      ],
      [{ text: "If it's someone else, I'm happy to reach out to them directly instead.", note: 4 }],
    ],
    notes: [
      "Two-word subject that reads like a question from a colleague.",
      "The signal still opens the email, so it never reads as a generic blast.",
      "A question anyone can answer, even if the answer is “not me.”",
      "Makes forwarding effortless. Referrals from inside the company carry weight.",
    ],
  },
  {
    scenario: "The Close-the-Loop Email",
    when: "Day 5. The last email in the sequence: leave the door open and offer to find the right person.",
    label: "Follow-up · close the loop",
    source: "Real copy from a client strategy",
    subject: "Re: Your {{job_title}} opening",
    body: [
      [{ text: "Hi {{first_name | default: \"there\"}},", note: 1 }],
      [{ text: "I wanted to close the loop on your {{job_title}} opening.", note: 2 }],
      [
        { text: "If you're still considering candidates, we can discuss the role and the experience your firm needs." },
        {
          text: "If someone else handles hiring at {{company_name}}, I'm happy to reach out to the appropriate person instead.",
          note: 3,
        },
      ],
      [{ text: "Just reply here whenever it's useful.", note: 4 }],
    ],
    notes: [
      "Still in the original thread, so the signal and the offer are right there.",
      "Signals this is the last email. A clear ending often prompts the reply the first two didn't.",
      "Two easy outs: talk about the role, or point me to the right person.",
      "No pressure and no new ask. It keeps the relationship warm for the next opening.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Tool stack                                                          */
/* ------------------------------------------------------------------ */

/** `domain` is used to load the platform's own logo. */
export type Tool = { name: string; domain: string };

export const toolGroups: { category: string; tools: Tool[] }[] = [
  {
    category: "Lead data and enrichment",
    tools: [
      { name: "Apollo", domain: "apollo.io" },
      { name: "Clay", domain: "clay.com" },
      { name: "AI Ark", domain: "ai-ark.com" },
      { name: "Sales Navigator", domain: "linkedin.com" },
    ],
  },
  {
    category: "Verification",
    tools: [
      { name: "MillionVerifier", domain: "millionverifier.com" },
      { name: "Bounce Ban", domain: "bounceban.com" },
    ],
  },
  {
    category: "Domains and inboxes",
    tools: [
      { name: "InboxKit", domain: "inboxkit.com" },
      { name: "Zapmail", domain: "zapmail.ai" },
      { name: "Google Workspace", domain: "workspace.google.com" },
    ],
  },
  {
    category: "Sending and LinkedIn",
    tools: [
      { name: "Smartlead", domain: "smartlead.ai" },
      { name: "Instantly", domain: "instantly.ai" },
      { name: "EmailBison", domain: "emailbison.com" },
      { name: "HeyReach", domain: "heyreach.io" },
    ],
  },
  {
    category: "Deliverability monitoring",
    tools: [
      { name: "Postmaster Tools", domain: "gmail.com" },
      { name: "MXToolbox", domain: "mxtoolbox.com" },
    ],
  },
  {
    category: "Automation and CRM",
    tools: [
      { name: "Make.com", domain: "make.com" },
      { name: "Zapier", domain: "zapier.com" },
      { name: "HubSpot", domain: "hubspot.com" },
      { name: "Airtable", domain: "airtable.com" },
      { name: "Google Sheets", domain: "sheets.google.com" },
      { name: "Slack", domain: "slack.com" },
      { name: "Claude", domain: "claude.ai" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Closing CTA                                                         */
/* ------------------------------------------------------------------ */

export const teardownCopy = {
  eyebrow: "Free teardown",
  headline: "Want a free 5-minute teardown of your current cold email sequence?",
  body: "Drop your email below and paste your first email if you have it handy. I'll reply with what I'd change in the targeting, subject line, opener and CTA. No call needed.",
};
