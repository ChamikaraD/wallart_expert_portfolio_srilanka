# Wall Art Expert — Website

Homepage and portfolio for **Wall Art Expert (Pvt) Ltd**, Sri Lanka.

Built with Next.js 16 (App Router, Cache Components), React 19, TypeScript (strict), Tailwind CSS v4, Motion for React, Lucide icons, `next/image` and `next/font`.

## Running locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build (also type-checks)
npm run start      # serve the production build
npm run lint       # ESLint
npx tsc --noEmit   # type-check only
```

Before deploying, set `NEXT_PUBLIC_SITE_URL` to the live domain (see `.env.example`). It drives canonical URLs, Open Graph tags, `robots.txt` and `sitemap.xml`.

## Where content lives

All editable content is centralised; components never hard-code copy, contact details or image URLs.

| What | File |
| --- | --- |
| Brand name, SEO, announcement strip, hero copy, navigation, social links, contact details, colour tokens | `src/config/site.ts` |
| Every image (source, alt text, placeholder flag) | `src/content/images.ts` |
| Projects, spaces (room categories), before/after pair | `src/content/projects.ts` |
| Services and process steps | `src/content/services.ts` |
| CSS design tokens and type scale | `src/app/globals.css` |
| Wordmark (swap for the official logo) | `src/components/layout/Logo.tsx` |

### Replacing placeholder images

Every image is currently a **stock placeholder** from Unsplash, and is labelled "Placeholder image" on the page. To replace one:

1. Add the photo to `public/images/…`. Use WebP or AVIF, about 2400px on the long edge for full-width images.
2. In `src/content/images.ts`, set `src` to the local path, write accurate `alt` text, and set `placeholder: false`. The label disappears automatically.
3. Once no Unsplash images remain, remove the `remotePatterns` entry in `next.config.ts`.

### WhatsApp buttons

`contactConfig.whatsappNumber` in `src/config/site.ts` (international format, digits only) makes every "Discuss Your Project" button open WhatsApp with a prefilled message. Without a number, these buttons go to the on-page contact form.

### Contact form notifications

When a visitor submits the contact form, the server sends the project details to the company by **email** and **WhatsApp** (`src/app/actions/inquiry.ts`, `src/lib/notify.ts`). The visitor sees a thank-you message once at least one of the two is delivered. Configure both channels with environment variables: copy `.env.example` to `.env.local` for local testing, and add the same variables to your hosting provider (e.g. Vercel → Project → Settings → Environment Variables).

**Email (Gmail):**
1. Sign in to the company Gmail account and turn on 2-Step Verification (Google Account → Security).
2. Go to Google Account → Security → App passwords, create one named "Website", and copy the 16-character password.
3. Set `GMAIL_USER` to the Gmail address and `GMAIL_APP_PASSWORD` to that app password.

**WhatsApp (official WhatsApp Business Cloud API by Meta):**
1. Go to [developers.facebook.com](https://developers.facebook.com), create an app of type **Business**, and add the **WhatsApp** product. Meta gives you a free test sender number.
2. In WhatsApp → API Setup, add `+94 70 234 1274` as a recipient and confirm the code it receives. You can add up to five recipients on the test number.
3. Copy the **Phone number ID** into `WHATSAPP_PHONE_NUMBER_ID`, and set `WHATSAPP_TO=94702341274`.
4. Create a permanent token: Business Settings → System users → add a user → Generate token, with the `whatsapp_business_messaging` permission. Put it in `WHATSAPP_TOKEN`. The temporary token on the API Setup page expires after 24 hours.
5. In WhatsApp Manager → Message templates, create a **Utility** template named `new_website_inquiry`, in English, with this body:
   `New website inquiry from {{1}} (contact: {{2}}). Space: {{3}}. Service: {{4}}. Message: {{5}}`
   Once Meta approves it (usually within minutes), set `WHATSAPP_TEMPLATE=new_website_inquiry`.

Meta may charge a small per-message fee for template messages, depending on country and volume; check WhatsApp's current pricing. Later you can register the company's own business number instead of the test number.

**Fallback, CallMeBot:** a free service for personal alerts. Set `CALLMEBOT_PHONE` and `CALLMEBOT_APIKEY` and leave the `WHATSAPP_*` variables empty. Sign-up instructions are at [callmebot.com](https://www.callmebot.com/blog/free-api-whatsapp-messages/). New sign-ups were paused when this was written.

If neither channel is configured, or both fail, the form shows the visitor the WhatsApp number and hotline instead, and the server logs the reason.

### Before/after slider

Once the company has a genuine before/after photo pair of the same wall, set `transformation` in `src/content/projects.ts`. The homepage then shows the interactive comparison slider in place of the craftsmanship section.

### Approval flags

Proposed content shows a small "Awaiting approval" tag on the page. To remove a tag once the owner confirms the content, set `approved: true` on that service, or `processApproved = true`, in `src/content/services.ts`. Projects with `placeholder: true` (draft details) are kept out of the sitemap and marked `noindex`.

## Structure

```
src/
  app/                 routes: home, /portfolio, /portfolio/[slug], sitemap, robots, 404
  components/
    layout/            announcement bar, header (client), footer, logo, motion provider
    sections/          homepage sections (server components unless interactive)
    portfolio/         reusable ProjectCard
    ui/                ArtImage, ButtonLink, Reveal (motion), SectionHeading, ParallaxImage, icons
  config/site.ts       site-wide configuration
  content/             images, projects, services
  lib/contact.ts       WhatsApp / inquiry link helpers
```

Pages are server-rendered by default. Client components are used only for the header and menu, scroll reveals, parallax, the process animation, the contact form and the before/after slider. The hero's entrance animation is pure CSS, so it appears without waiting for JavaScript. All motion respects `prefers-reduced-motion`.
