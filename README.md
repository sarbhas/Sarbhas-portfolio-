# Mohammed Sarbhas — Portfolio

A modern, responsive, accessible and SEO-friendly portfolio for a final-year
**Artificial Intelligence and Machine Learning** engineering student.

Built with **React + Vite + TypeScript + Tailwind CSS v4 + Lucide icons**.

---

## 1. Requirements

| Tool   | Version |
| ------ | ------- |
| Node.js | 20.19+ (24 LTS recommended) |
| npm     | 10+     |

Check with `node -v` and `npm -v`.

---

## 2. Install & run locally

```bash
# 1. install dependencies
npm install

# 2. start the dev server (hot reload)
npm run dev
```

Open the URL printed in the terminal (usually `http://localhost:5173`).

### Other commands

```bash
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build locally
npm run typecheck  # TypeScript only, no build output
```

---

## 3. Project structure

```
├─ index.html                 SEO metadata, fonts, JSON-LD structured data
├─ public/
│  ├─ favicon.svg
│  ├─ robots.txt              update the domain after deploying
│  ├─ sitemap.xml             update the domain after deploying
│  ├─ resume.pdf              ← ADD YOUR RESUME HERE (see §5)
│  └─ images/
│     └─ profile.jpg          ← ADD YOUR PHOTO HERE (see §4)
└─ src/
   ├─ App.tsx                 page composition + skip link
   ├─ index.css               design tokens (colours), card/reveal styles
   ├─ data/profile.ts         ★ ALL EDITABLE CONTENT LIVES HERE
   ├─ hooks/useActiveSection.ts   scroll-spy for the navbar
   ├─ hooks/useSmoothScroll.ts    smooth anchor scrolling (reduced-motion aware)
   └─ components/
      ├─ Navbar.tsx  Hero.tsx  About.tsx  Education.tsx
      ├─ Skills.tsx  Projects.tsx  Coursework.tsx
      ├─ Languages.tsx  Contact.tsx  Footer.tsx
      └─ ui/          Section, Reveal, Avatar,
                      DownloadResumeButton, SocialLinks, TechBackground
```

**Almost every text change is a single edit in [`src/data/profile.ts`](src/data/profile.ts).**

---

## 4. Replacing the profile photo

1. Prepare a **square (1:1)** photo — `800×800 px` JPEG or PNG works well.
2. Save it as exactly:

   ```
   public/images/profile.jpg
   ```

3. Refresh the page. Done — the hero picks it up automatically.

Until the file exists (and if it is ever removed), the site renders a designed
**"MS" initials avatar** instead, so a broken image is never shown.

If you want a different file name or location, change `photoPath` in
`src/data/profile.ts`.

---

## 5. Adding your actual resume PDF

1. Put your real PDF at:

   ```
   public/resume.pdf
   ```

2. The **Download Resume** button in the navigation bar, the hero section and
   the footer starts downloading it immediately.

The button never points at a fake file: if the PDF has not been uploaded yet,
clicking it shows the message *"Resume PDF not uploaded yet — add it at
public/resume.pdf"* instead of opening a dead link.

Optionally update `resumePath` / `resumeFileName` in `src/data/profile.ts`.

---

## 6. Connecting GitHub and LinkedIn

Open [`src/data/profile.ts`](src/data/profile.ts) and fill in the two fields:

```ts
githubUrl:  'https://github.com/your-username',
linkedinUrl: 'https://www.linkedin.com/in/your-handle/',
```

While they are empty strings the buttons render as **disabled, labelled
placeholders** ("add link") — no invented URLs, no dead links.

---

## 7. Adding your project links and technology tags

Still in `src/data/profile.ts`, inside `projects`:

```ts
tags: ['Python', 'OpenCV'],          // ONLY technologies actually used
liveUrl: 'https://your-demo.com',    // "View Project"
repoUrl: 'https://github.com/…',     // "View Source Code"
```

Empty `tags` renders *"Technology stack — to be added once confirmed"*.
Empty `liveUrl` / `repoUrl` renders a disabled placeholder button.

> Nothing on this site is fabricated: no grades, no awards, no experience,
> no statistics, no social URLs. Only information you supply appears.

---

## 8. Contact form — how it behaves

The form validates **name, email, subject and message** inline
(`aria-invalid`, `role="alert"`, focus jumps to the first bad field).

There is **no backend or email service configured**, so the site never claims a
message was delivered and stores nothing — no local storage, no third-party
scripts. On a valid submit it opens the visitor's own mail client with the
message pre-filled and tells them so.

**To collect messages server-side instead**, pick one and wire it into
`handleSubmit` in `src/components/Contact.tsx`:

- Formspree — add `<form action="https://formspree.io/f/xxxx" method="POST">`
- EmailJS — client-side SDK
- Web3Forms — access-key based
- Your own API route (requires a backend/host with server functions)

---

## 9. Deploying online

The build output is a **static site** — any static host works.

### Option A — Netlify (drag & drop)

1. `npm run build`
2. Go to <https://app.netlify.com/drop> and drop the `dist/` folder.
3. Later: connect the repo, build command `npm run build`, publish dir `dist`.

### Option B — Vercel

1. Push the project to GitHub.
2. Import it at <https://vercel.com/new> — framework preset **Vite**,
   build `npm run build`, output `dist`.
3. Deploy.

### Option C — GitHub Pages

1. Push to GitHub.
2. In **Settings → Pages**, set Source to *GitHub Actions*.
3. Add a workflow that runs `npm run build` and publishes `dist/`.
4. Because the app uses in-page anchors only, no `base` path is required
   unless the repo is served from `https://user.github.io/repo/` — in that case
   add `base: '/repo/'` to `vite.config.ts`.

### After deploying

Update the real domain in **four** places:

- `index.html` → `canonical`, `og:url`, `og:image`, `twitter` tags and the
  JSON-LD `url`
- `public/robots.txt` → `Sitemap:` line
- `public/sitemap.xml` → `<loc>`
- `src/data/profile.ts` → your GitHub/LinkedIn URLs

---

## 10. Redesigning the colours

All tokens are at the top of [`src/index.css`](src/index.css):

```css
@theme {
  --color-ink: #05070f;    /* page background (near-black navy) */
  --color-brand: #3b82f6;  /* blue accent   */
  --color-violet: #8b5cf6; /* purple accent */
  ...
}
```

Change a value there and the whole site follows.

---

## 11. Accessibility & performance notes

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`) with
  `aria-labelledby` on every section.
- "Skip to main content" link, visible on keyboard focus.
- Mobile menu: `aria-expanded` / `aria-controls`, closes on **Escape** and on
  link tap, locks background scroll.
- All motion respects `prefers-reduced-motion`; the canvas background renders a
  single static frame and pauses when the tab is hidden.
- Smooth scrolling is implemented once, in `src/hooks/useSmoothScroll.ts`: a
  single delegated click handler animates every same-page anchor, updates the
  hash, moves focus to the target for keyboard/screen-reader users, and jumps
  instantly when `prefers-reduced-motion` is set.
- Form errors are announced with `role="alert"`; status updates use
  `role="status"`.
- No analytics, no trackers, no local storage.
- Production bundle: 84.5 kB gzipped JavaScript + 8.4 kB gzipped CSS.
