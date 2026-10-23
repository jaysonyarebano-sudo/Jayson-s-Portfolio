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

Everything on the page comes from **`src/data/portfolio.ts`**: hero metrics, the seven process steps,
both case studies, the recruitment strategy deep dive, other campaigns, the swipe file, tools and the teardown CTA.
Components never hard code figures.

Page order: Hero (headshot + metrics) → Process → Case studies → Swipe file → Tool stack → Teardown CTA.

### Still needed from Jayson

| Item | Where | Behavior until set |
| --- | --- | --- |
| LinkedIn URL | `links.linkedin` | LinkedIn button hidden |
| Booking link (Calendly, Cal.com) | `links.booking` | Not shown |
| Production domain | `links.siteUrl` | No canonical tag; OG image URL falls back to the host |

The teardown form has no backend: it opens the visitor's email app addressed to `links.email`.
Tool logos load from Google's favicon service using each tool's `domain`.

### Evidence images

All screenshots live in `public/evidence/` with anonymized filenames (filenames appear in image URLs).
Redact client names, prospect data and private domains before adding a new one, then reference it as a
`Shot` (`src`, `alt`, `caption`, `width`, `height`) in `portfolio.ts`. Every screenshot opens full size on click.

## Accuracy rules

- Use verified figures only, and never combine numbers from different clients or campaigns.
- Pipeline is not revenue. Open rates are tracked opens.
- The Make.com templates were designed by the Cymate team. Jayson configured, implemented and troubleshot them.
- No testimonials, client logos or simulated screenshots.
- Swipe file samples that were not sent as-is are labeled "Sample".
