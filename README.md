# Souhail Mbarki — AI Engineer Portfolio

A responsive, single-page portfolio built with React, Vite, Tailwind CSS v4, and Lucide icons. Includes light/dark mode, reduced-motion-aware reveal animations, project data, an experience timeline, and the original downloadable resume.

## Run locally

Use Node.js 22 or newer.

```bash
npm install
npm run dev
```

Create and preview a production build:

```bash
npm run build
npm run preview
```

## Customize

- `src/data/profile.js`: bio, contact links, skills, education, and experience.
- `src/data/projects.json`: add or edit projects without changing layout code. Each project has `id`, `number`, `title`, `category`, `description`, `details`, `tech`, `github`, `demo`, `image`, `imageAlt`, `featured`, `previewTitle`, and `previewLabel`.
- Put project screenshots in `public/`, then set `image` to `./filename.webp`. Use descriptive `imageAlt` text. The existing typographic overview panels are placeholders, not actual application screenshots.
- Set a missing GitHub or demo URL to `null`; unavailable links stay hidden. No live demo links were supplied in the resume.
- Add your photo to `public/` and set `profile.photo` to `./photo.webp`. Until then, the site displays an intentional initials placeholder.
- Replace `public/Resume.pdf` when your resume changes. The current file is the supplied original.
- `src/styles.css`: shared theme tokens, component styles, responsive rules, and motion settings. Tailwind is available throughout JSX (see the expertise strip).
- `index.html`: title, description, Open Graph metadata, and favicon. After public deployment, add `og:url` and a canonical URL for your actual domain. You can add an absolute `og:image` URL after supplying a social sharing image.

## Contact behavior

The form uses browser validation and opens a prefilled `mailto:` draft. It does **not** send or store messages on a server. Visitors must send the draft in their email app. Direct email, LinkedIn, GitHub, and phone links are also provided. To send directly from the site, integrate a form service or serverless endpoint and add appropriate success/error handling; never put secret API keys in frontend code.

## Deploy

The static production output is `dist/`. No server or environment variables are required. Relative Vite asset URLs support hosting at a repository subpath.

### Vercel

Import your repository, choose Vite, use `npm run build` as the build command and `dist` as the output directory. Deploy.

### Netlify

Import the repository. The included `netlify.toml` sets the build command and output directory. Alternatively, run the build locally and upload `dist/`.

### GitHub Pages

Push this project to a GitHub repository. In Settings → Pages, choose GitHub Actions as the source. The included `.github/workflows/deploy.yml` builds and publishes on pushes to `main`, or via manual workflow dispatch. Enable Actions if necessary.

## Accessibility and performance

Semantic landmarks, a skip link, labeled controls, keyboard focus indicators, responsive navigation, meaningful image alternatives, and reduced-motion support are included. Theme preferences persist on the visitor's device. The site uses system fonts and loads no external tracking scripts. Project images load lazily. A production build was verified; browser interaction and visual tests were not run.

## Source content

Experience, skills, education, project repositories, and contact links are based on the supplied resume. There are no invented project impact metrics. The notebook in the hero is illustrative text.
