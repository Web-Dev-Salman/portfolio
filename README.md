# Salman — Developer Portfolio

A fast, interactive portfolio site built with **plain HTML, CSS and JavaScript**. There's no framework and no build step, and the only external requests are Google Fonts and live screenshots.

It's built around **207 real client projects** (98 WordPress/other projects plus 109 Shopify stores), organised so visitors can quickly answer:

- *"What type of websites can this developer build?"*
- *"Has this developer worked on projects similar to mine?"*

## Features

- **Hero**: an animated code editor types WordPress PHP, Shopify Liquid, React or Next.js code while a browser preview builds the matching site. It tilts in 3D with the mouse.
- **Portfolio**:
  - Filter tabs for platform and type (WordPress, Elementor, WooCommerce, Shopify, E-commerce, Business, Corporate, Agencies, Landing Pages, Web Apps, Multilingual). Each tab shows a live count.
  - An industry dropdown and instant search. Search looks at name, country, tech, features and industry; press `/` to focus it.
  - Cards load in pages of 12 with "Show more", so it stays fast as the list grows.
  - Cards show a screenshot, type, badges, **View Website** and **View Details**. On hover they zoom, tilt and show an overlay with tech badges.
- **Project detail modal**:
  - A gallery with desktop, mobile and extra-site views. It supports arrows, keyboard and swipe.
  - Description, category, industry, location, role, technologies and key features.
  - Previous/next project links and a "Start a similar project" button.
  - Each project has a shareable deep link (`/#project/<id>`).
- **Skills**: interactive cards grouped into Frontend, CMS & E-commerce, Backend, and Care & Quality. There are no fake percentages.
- **Services**: a bento grid. Clicking a service jumps to matching portfolio projects, and the counts come from the data.
- **Contact**: a validated form with project-type chips, plus Email, WhatsApp, LinkedIn, GitHub and Upwork links. These are placeholders until you fill them in.
- **Everywhere**:
  - Dark and light themes.
  - A sticky nav that shrinks on scroll, a mobile menu and a scroll progress bar.
  - Reveal-on-scroll, animated counters, magnetic buttons, a subtle custom cursor (mouse only) and a spotlight hover on cards.
  - `prefers-reduced-motion` support, focus-trapped modal, keyboard navigation and semantic HTML.

## Project structure

```
index.html                    Page markup (sections, SEO meta, JSON-LD)
assets/css/styles.css         All styles (tokens → components → responsive)
assets/js/projects.js         ★ Your data: site config + WordPress & other projects
assets/js/projects-shopify.js ★ Your Shopify stores (one line per store)
assets/js/screenshots.js      Local screenshot map (generated, optional)
assets/js/main.js             Interactions, filtering, modal, form
assets/img/favicon.svg
scripts/capture-screenshots.mjs  Optional: capture real screenshots locally
```

## Before publishing: fill these in

1. **Contact details**: edit `window.SITE.contact` at the top of `assets/js/projects.js` (email, WhatsApp, LinkedIn, GitHub, Upwork). Until then, the links show as placeholders.
2. **Contact form**: by default the form opens the visitor's email app with the message pre-filled. To receive submissions directly, create a free form endpoint (Formspree, Getform, Basin…) and paste its URL into `SITE.contact.formEndpoint`.
3. **Your role per project**: each project falls back to `SITE.defaultRole`. Add `role: "…"` to a project to be specific, for example "Custom WooCommerce development and speed optimization".
4. **Check the tech tags** (see below).

## How projects were categorized

Direct access to the sites was blocked from the build environment, so each project was researched with web search: the business, what the site does, languages and notable features. Descriptions only use facts found there.

The **platform / stack could not be confirmed for most sites**, so those projects carry `verify: true` in `projects.js`:

- Most sites are tagged **WordPress + Elementor**. The list matches the style of sites in the Elementor showcase.
- Only **IluminaShop** (listed in the official WooCommerce showcase) and **La Viajera Interior** (WordPress + Elementor forms) were confirmed.
- **WooCommerce** was inferred where the site has shop or product URLs: Gutman Museum, A & T Global IT, Bury Skip Hire, Groomzo, and others.
- **Shopify** was inferred for Rotimatic, KSport USA, Douzle and A & T Footwear.

Please correct any tags that are wrong. The filters rebuild automatically.

| Filter | Projects | | Industry | Projects |
|---|---|---|---|---|
| E-commerce | 125 | | Fashion & Accessories | 25 |
| Shopify | 113 | | Creative & Design | 22 |
| WordPress | 94 | | Retail & Products | 21 |
| Elementor | 74 | | Food, Drink & Restaurants | 13 |
| Business | 47 | | Beauty & Cosmetics | 12 |
| Landing Pages | 31 | | Art & Prints | 12 |
| Dropshipping | 22 | | Education & Coaching | 12 |
| PageFly | 17 | | Local & Professional Services | 11 |
| Corporate | 17 | | Home & Decor | 10 |
| Agencies & Studios | 16 | | Electronics & Gadgets | 10 |
| Multilingual / RTL | 15 | | SaaS & Technology | 10 |
| WooCommerce | 10 | | Health & Wellness | 8 |
| One-Product Stores | 3 | | Merchandise & Entertainment | 7 |
| Collection Pages | 3 | | Real Estate & Construction | 7 |
| Web Apps | 2 | | Hospitality & Travel · Pets · Nonprofit · others | 2–6 each |

Some sites were grouped or merged:

- The **11 San Francisco appliance-repair sites** (Sub-Zero, Wolf, Viking, Thermador, Miele, Bosch, Dacor, DCS, BlueStar, Bertazzoni, Asko) are one project. The modal links to all 11 and shows a screenshot of each.
- **CamperBoys** and **Off Campers** are the same business (rebranded, later acquired), so they're one project.
- Duplicate URLs in the original list were removed.

**Hidden projects** (`hidden: true`): during research these domains were for sale, parked, redirecting elsewhere, or appeared to serve unrelated or spam content. Check them and set `hidden: false` if they're fine:

- 15historii.pl
- leedsmag.co.uk/PPP/uk
- darps.nl
- epicongroup.com
- kenvadesign.fr
- farbr.co
- absolutelyplumbhappy.com

## Adding a project

**Shopify store:** open `assets/js/projects-shopify.js`, copy a line inside the right group (PageFly, Dropshipping, One-product, Collection page or regular store) and edit it:

```js
["https://mystore.com/", "My Store", "fashion", "One-line description.", "London, UK"],
```

**Any other project:** copy any object in `projects` inside `assets/js/projects.js`:

```js
{
  id: "my-new-store",                // unique, used in /#project/my-new-store
  name: "My New Store",
  url: "https://example.com",
  summary: "One line for the card.",
  description: "Longer text for the detail view.",
  type: "E-commerce store",
  tags: ["shopify", "ecommerce"],    // any keys from `filters`
  industry: "retail",                // a key from `industries`
  tech: ["Shopify", "Liquid"],
  features: ["Custom product builder", "Subscriptions"],
  role: "Theme customization & app integration",
  location: "London, UK",
  featured: false
}
```

Tabs, counts, search, stats and services update automatically. Tabs with no projects stay hidden, so the **React**, **Next.js** and **CRM / Dashboard** tabs appear as soon as you add a project with that tag.

## Screenshots

By default, cards and the modal use **live screenshots** from the free WordPress.com mShots service (no API key). The first request for a site can take a few seconds, and a branded placeholder shows in the meantime.

For faster, fully self-hosted images, capture them once on your machine:

```bash
npm i -D playwright && npx playwright install chromium
node scripts/capture-screenshots.mjs          # or: node scripts/capture-screenshots.mjs awaque wint
```

This saves desktop and mobile JPEGs to `assets/img/projects/` and registers them in `assets/js/screenshots.js`. The site then uses them automatically. You can also set `images: [...]` on any project manually.

## Run locally / deploy

It's a static site. Open `index.html`, or serve the folder:

```bash
python3 -m http.server 8080   # then visit http://localhost:8080
```

To deploy, upload the folder to any static host: GitHub Pages, Netlify, Vercel, Cloudflare Pages or regular hosting.
