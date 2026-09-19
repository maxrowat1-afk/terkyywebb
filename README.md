# Dneskoučuju.cz

Marketingový one-pager pro koučink Terezy Navrátilové. Landing je static HTML v `public/index.html`. Next.js ho servíruje z `app/route.ts`.

## Příkazy

```bash
npm install
npm run dev
```

- `npm run dev` — Tailwind watch + `next dev`
- `npm run css` — jednorázový build `public/app.css`
- `npm run optimize-images` — WebP/JPEG varianty ze `assets/source/`
- `npm run build` / `npm start` — produkční build
- `npm run lint` — ESLint

Otevřete [http://localhost:3000](http://localhost:3000).

## Struktura

- `public/index.html` — celá homepage (markup, CSS, JS)
- `public/obchodni-podminky.html`, `public/ochrana-soukromi.html` — právní stránky
- `assets/source/` — originály fotek (nejsou v deployi)
- `app/route.ts` — `GET /` vrací homepage
- `app/robots.ts`, `app/sitemap.ts` — SEO soubory

Poptávkový formulář po validaci otevře `mailto:dneskoucuju@gmail.com`.
