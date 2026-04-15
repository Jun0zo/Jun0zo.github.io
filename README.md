This is a [Next.js](https://nextjs.org) portfolio built for static export and GitHub Pages.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) and exports to a static `out/` folder.

## GitHub Pages

The repository is configured for GitHub Pages via [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml).

For repository-based Pages deployments, set `NEXT_PUBLIC_SITE_PATH` to `/<repo-name>` during build. The included workflow does this automatically from the current repository name.

The public site excludes the local JunOS control panel and API routes so it can stay fully static.

## Learn More

To learn more about Next.js, take a look at these resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [GitHub Pages Documentation](https://docs.github.com/pages)
