# Jayson Bano: Cold Email and Outbound Portfolio

Single page portfolio built with Next.js 15 (App Router), TypeScript, Tailwind CSS 4 and lucide-react.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run lint
npm run build && npm start
```

## Edit content

Everything on the page comes from **`src/data/portfolio.ts`**: profile, links, metrics, case studies,
capabilities, process, tools, work samples, about copy and timeline. Components never hard code figures.

### Still needed from Jayson

| Item | Where | Behavior until set |
| --- | --- | --- |
| Email address | `links.email` | Email button hidden |
| LinkedIn URL | `links.linkedin` | LinkedIn button hidden |
| Booking link (Calendly, Cal.com) | `links.booking` | Booking button hidden |
| Production domain | `links.siteUrl` | No canonical tag; OG image URL falls back to the host |
| Redacted evidence images | `caseStudies[].evidence[].src`, `workSamples[].src` | "Evidence to be added" placeholder |
| Permission to name Stingray | `caseStudies` → `media-music-company` | Shown as "North American media and music company" |

In `npm run dev`, a dashed note in the Contact section lists unset links. It never renders in production builds.

### Adding evidence

1. Redact client names, prospect data, private domains and mailbox addresses.
2. Save the image in `public/evidence/`, e.g. `public/evidence/cymate-report.png`.
3. Set `src: "/evidence/cymate-report.png"`, a descriptive `alt`, and optionally `width` and `height`.

## Accuracy rules

- Use verified figures only, and never combine numbers from different clients or campaigns.
- Pipeline is not revenue. Open rates are tracked opens.
- The Make.com templates were designed by the Cymate team. Jayson configured, implemented and troubleshot them.
- No testimonials, client logos or simulated screenshots.
