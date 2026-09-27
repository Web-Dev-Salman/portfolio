/* ==========================================================================
   Salman — Portfolio interactions (vanilla JS, no dependencies)
   ========================================================================== */
(() => {
  "use strict";

  const SITE = window.SITE || {};
  const DATA = window.PORTFOLIO || { filters: [], industries: {}, projects: [] };
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const escapeHTML = (s = "") => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* storage unavailable */ } }
  };

  const projects = DATA.projects.filter((p) => !p.hidden);
  // Local screenshots (from scripts/capture-screenshots.mjs) take priority over live ones.
  const imagesOf = (p) => (p.images?.length ? p.images : (window.SCREENSHOTS || {})[p.id] || []);
  const filterLabel = Object.fromEntries(DATA.filters.map((f) => [f.key, f.label]));

  /* ------------------------------------------------------------------ Theme */
  $(".theme-toggle")?.addEventListener("click", () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    store.set("theme", next);
  });

  /* -------------------------------------------------------------------- Nav */
  const nav = $("#nav");
  const progress = $(".scroll-progress");
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      nav.classList.toggle("is-scrolled", y > 30);
      const max = document.documentElement.scrollHeight - innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      ticking = false;
    });
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const navLinks = $$("[data-nav]");
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${e.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  $$("main section[id]").forEach((s) => sectionObserver.observe(s));

  // Mobile menu
  const burger = $(".nav__burger");
  const menu = $("#mobile-menu");
  const setMenu = (open) => {
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      menu.hidden = false;
      requestAnimationFrame(() => menu.classList.add("is-open"));
    } else {
      menu.classList.remove("is-open");
      menu.hidden = true;
    }
  };
  burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
  $$("a", menu).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  addEventListener("keydown", (e) => { if (e.key === "Escape" && !menu.hidden) setMenu(false); });
  matchMedia("(min-width: 961px)").addEventListener("change", (e) => { if (e.matches) setMenu(false); });

  $("#year").textContent = new Date().getFullYear();

  /* --------------------------------------------------------- Reveal on view */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-visible");
      revealObserver.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  const observeReveal = (root = document) => {
    $$(".reveal:not(.is-visible), .process li:not(.is-visible)", root).forEach((el, i) => {
      el.style.transitionDelay = el.closest(".hero") ? `${i * 80}ms` : "";
      revealObserver.observe(el);
    });
  };
  observeReveal();

  /* --------------------------------------------------------------- Counters */
  const countries = new Set();
  projects.forEach((p) => {
    (p.location || "").split("/").forEach((part) => {
      const c = part.split(",").pop().trim();
      if (c && !["—", "Global", "Asia", "Europe"].includes(c)) countries.add(c);
    });
  });
  const stats = {
    projects: projects.reduce((n, p) => n + Math.max(1, (p.links || []).length), 0),
    countries: countries.size,
    industries: new Set(projects.map((p) => p.industry)).size,
    ecommerce: projects.filter((p) => p.tags.includes("ecommerce")).length,
    multilingual: projects.filter((p) => p.tags.includes("multilingual")).length
  };
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      counterObserver.unobserve(e.target);
      const target = stats[e.target.dataset.count] || 0;
      if (reduceMotion) { e.target.textContent = target; return; }
      const start = performance.now();
      const dur = 1400;
      const step = (t) => {
        const k = Math.min(1, (t - start) / dur);
        e.target.textContent = Math.round(target * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.6 });
  $$("[data-count]").forEach((el) => counterObserver.observe(el));

  /* ------------------------------------------------------ Hero code visual */
  const STACKS = {
    wp: {
      url: "law-firm.com",
      lang: "php",
      code: `<?php
// Register a custom "Case Study" post type
add_action( 'init', function () {
  register_post_type( 'case_study', [
    'label'        => 'Case Studies',
    'public'       => true,
    'show_in_rest' => true,
    'supports'     => [ 'title', 'editor', 'thumbnail' ],
  ] );
} );`,
      preview: [
        '<div class="pv pv-nav"><b></b><i><em></em></i></div>',
        '<div class="pv pv-hero" style="background:linear-gradient(120deg,#1e3a8a,#0f172a)">Trusted family lawyers</div>',
        '<div class="pv pv-row"><div class="pv-card"></div><div class="pv-card"></div><div class="pv-card"></div></div>',
        '<div class="pv pv-btn" style="background:#1e3a8a"></div>'
      ]
    },
    shopify: {
      url: "store.com/collections/all",
      lang: "liquid",
      code: `{% for product in collection.products %}
  <article class="product-card">
    <img src="{{ product.featured_image | image_url: width: 600 }}"
         alt="{{ product.title | escape }}" loading="lazy">
    <h3>{{ product.title }}</h3>
    <span>{{ product.price | money }}</span>
    {% if product.available %}
      <button>Add to cart</button>
    {% endif %}
  </article>
{% endfor %}`,
      preview: [
        '<div class="pv pv-nav"><b></b><i><em></em></i></div>',
        '<div class="pv pv-row"><div class="pv-card" style="height:70px;background:#fde68a"></div><div class="pv-card" style="height:70px;background:#bfdbfe"></div><div class="pv-card" style="height:70px;background:#fbcfe8"></div></div>',
        '<div class="pv pv-row"><div class="pv-card"></div><div class="pv-card"></div><div class="pv-card"></div></div>',
        '<div class="pv pv-btn" style="background:#16a34a"></div>'
      ]
    },
    react: {
      url: "app.client.com/crm",
      lang: "js",
      code: `export default function Dashboard({ leads }) {
  const [stage, setStage] = useState('all');
  const visible = leads.filter(
    (lead) => stage === 'all' || lead.stage === stage
  );

  return (
    <Layout title="CRM">
      <Stats data={visible} />
      <PipelineChart leads={visible} />
    </Layout>
  );
}`,
      preview: [
        '<div class="pv pv-nav"><b></b><i><em></em></i></div>',
        '<div class="pv pv-row"><div class="pv-card" style="background:#ede9fe"></div><div class="pv-card" style="background:#cffafe"></div><div class="pv-card" style="background:#ecfccb"></div></div>',
        '<div class="pv pv-chart"><span style="height:40%;background:#7c5cff"></span><span style="height:70%;background:#22d3ee"></span><span style="height:55%;background:#7c5cff"></span><span style="height:90%;background:#c6f432"></span><span style="height:65%;background:#22d3ee"></span><span style="height:80%;background:#7c5cff"></span></div>'
      ]
    },
    next: {
      url: "brand.com",
      lang: "js",
      code: `// app/page.tsx — rendered on the server
export const revalidate = 3600;

export default async function Home() {
  const projects = await db.collection('projects')
    .find({ featured: true })
    .limit(6)
    .toArray();

  return <Showcase items={projects} />;
}`,
      preview: [
        '<div class="pv pv-nav"><b></b><i><em></em></i></div>',
        '<div class="pv pv-hero" style="background:linear-gradient(120deg,#111,#3f3f46)">Fast by design.</div>',
        '<div class="pv pv-row"><div class="pv-card"></div><div class="pv-card"></div><div class="pv-card"></div></div>',
        '<div class="pv pv-row"><div class="pv-card"></div><div class="pv-card"></div><div class="pv-card"></div></div>'
      ]
    }
  };

  const highlight = (src, lang) => {
    const rules = [
      ["tok-c", /\/\/[^\n]*/y],
      ["tok-c", /\{%-?[\s\S]*?(?:-?%\}|$)/y],
      ["tok-s", /'(?:[^'\\\n]|\\.)*'?|"(?:[^"\\\n]|\\.)*"?/y],
      ["tok-t", /<\/?[A-Za-z][\w.-]*|\/>/y],
      ["tok-k", /\b(?:function|return|const|let|export|default|async|await|for|in|if|endif|endfor|true|false|php)\b/y],
      ["tok-n", /\b\d+\b/y],
      ["tok-f", /\b[A-Za-z_]\w*(?=\s*\()/y]
    ];
    let out = "";
    let i = 0;
    let plain = "";
    while (i < src.length) {
      let matched = false;
      for (const [cls, re] of rules) {
        if (cls === "tok-c" && re.source.startsWith("\\{") && lang !== "liquid") continue;
        re.lastIndex = i;
        const m = re.exec(src);
        if (m && m[0].length) {
          out += escapeHTML(plain) + `<span class="${cls}">${escapeHTML(m[0])}</span>`;
          plain = "";
          i += m[0].length;
          matched = true;
          break;
        }
      }
      if (!matched) plain += src[i++];
    }
    return out + escapeHTML(plain);
  };

  const codeEl = $("#code-output");
  const previewBody = $("#preview-body");
  const previewUrl = $("#preview-url");
  const tabs = $$(".editor__tabs .tab");
  const stackOrder = Object.keys(STACKS);
  let typingTimer = null;
  let currentStack = 0;

  const playStack = (key) => {
    clearTimeout(typingTimer);
    const s = STACKS[key];
    currentStack = stackOrder.indexOf(key);
    tabs.forEach((t) => {
      const on = t.dataset.stack === key;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", String(on));
    });
    previewUrl.textContent = s.url;
    previewBody.innerHTML = s.preview.join("");
    const blocks = $$(".pv", previewBody);
    if (reduceMotion) {
      codeEl.innerHTML = highlight(s.code, s.lang);
      blocks.forEach((b) => b.classList.add("in"));
      return;
    }
    let i = 0;
    const tick = () => {
      i = Math.min(s.code.length, i + (s.code[i] === " " ? 3 : 1));
      codeEl.innerHTML = highlight(s.code.slice(0, i), s.lang);
      const shown = Math.ceil((i / s.code.length) * blocks.length);
      blocks.forEach((b, n) => b.classList.toggle("in", n < shown));
      if (i < s.code.length) typingTimer = setTimeout(tick, 18 + Math.random() * 30);
      else typingTimer = setTimeout(() => playStack(stackOrder[(currentStack + 1) % stackOrder.length]), 3200);
    };
    tick();
  };
  tabs.forEach((t) => t.addEventListener("click", () => playStack(t.dataset.stack)));

  // Start typing when the hero is visible; pause when it scrolls away.
  const heroObserver = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) playStack(stackOrder[currentStack]);
    else clearTimeout(typingTimer);
  }, { threshold: 0.2 });
  heroObserver.observe($(".hero__visual"));

  // 3D tilt of the dev box following the mouse
  const devbox = $(".devbox");
  if (finePointer && !reduceMotion) {
    $(".hero").addEventListener("pointermove", (e) => {
      const r = devbox.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / innerWidth;
      const y = (e.clientY - (r.top + r.height / 2)) / innerHeight;
      devbox.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 10}deg)`;
    });
    $(".hero").addEventListener("pointerleave", () => { devbox.style.transform = ""; });
  }

  /* ---------------------------------------------- Pointer micro-interactions */
  document.addEventListener("pointermove", (e) => {
    const el = e.target.closest?.(".spotlight");
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, { passive: true });

  if (finePointer && !reduceMotion) {
    // Magnetic buttons
    document.addEventListener("pointermove", (e) => {
      const btn = e.target.closest?.(".magnetic");
      $$(".magnetic.is-magnet").forEach((b) => { if (b !== btn) { b.style.transform = ""; b.classList.remove("is-magnet"); } });
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      btn.classList.add("is-magnet");
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`;
    }, { passive: true });

    // Custom cursor
    document.documentElement.classList.add("has-cursor");
    const cursor = $(".cursor");
    const dot = $(".cursor__dot");
    const ring = $(".cursor__ring");
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    addEventListener("pointermove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
      const t = e.target;
      cursor.classList.toggle("is-view", !!t.closest?.(".card__media"));
      cursor.classList.toggle("is-hover", !t.closest?.(".card__media") && !!t.closest?.("a, button, input, select, textarea, label, [role=tab]"));
    }, { passive: true });
    document.addEventListener("pointerleave", () => cursor.classList.add("is-hidden"));
    document.addEventListener("pointerenter", () => cursor.classList.remove("is-hidden"));
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(loop);
    };
    loop();
  }

  /* ============================================================ PORTFOLIO */
  const PAGE_SIZE = 12;
  const state = { filter: "all", industry: "all", query: "", limit: PAGE_SIZE };
  let currentList = [];

  const grid = $("#project-grid");
  const filtersEl = $("#filters");
  const searchInput = $("#project-search");
  const industrySelect = $("#industry-filter");
  const countEl = $("#result-count");
  const emptyEl = $("#empty-state");
  const loadMoreBtn = $("#load-more");
  const activeFiltersEl = $("#active-filters");

  // Live screenshots via WordPress.com mShots (free, no key). Replace with
  // local images by filling `images` on a project (see projects.js).
  const shot = (url, { w = 640, h = 420, vpw = 1280, vph = 840 } = {}) =>
    `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=${w}&h=${h}&vpw=${vpw}&vph=${vph}`;

  // mShots returns a 400×300 "generating" placeholder the first time a URL is
  // requested; retry a few times so the real screenshot appears.
  const attachShotRetry = (img, wrap, expectedW) => {
    let tries = 0;
    img.addEventListener("load", () => {
      const isPlaceholder = expectedW && expectedW !== 400 && img.naturalWidth === 400 && img.naturalHeight === 300;
      if (isPlaceholder && tries < 4) {
        tries++;
        setTimeout(() => { img.src = img.src.replace(/&r=\d+$/, "") + `&r=${tries}`; }, 3500 * tries);
        return;
      }
      (wrap || img).classList.add("is-loaded");
      img.classList.add("is-loaded");
    });
    img.addEventListener("error", () => { img.remove(); });
  };

  const hue = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 360, 7);
  const initials = (name) => name.replace(/[^\p{L}\p{N} ]/gu, "").split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  const techClass = (t) => {
    const k = t.toLowerCase();
    if (k.includes("woocommerce")) return "badge--woocommerce";
    if (k.includes("wordpress")) return "badge--wordpress";
    if (k.includes("shopify")) return "badge--shopify";
    if (k.includes("elementor")) return "badge--elementor";
    if (k.includes("react")) return "badge--react";
    if (k.includes("next")) return "badge--next";
    return "";
  };
  const hostOf = (url) => { try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return url; } };

  const searchText = (p) => [
    p.name, p.summary, p.description, p.type, p.location, hostOf(p.url),
    ...(p.tech || []), ...(p.features || []), ...p.tags.map((t) => filterLabel[t] || t),
    DATA.industries[p.industry], ...(p.links || []).map((l) => l.label)
  ].join(" ").toLowerCase();
  const index = new Map(projects.map((p) => [p.id, searchText(p)]));

  const matches = (p, { filter = state.filter, industry = state.industry, query = state.query } = {}) => {
    if (filter !== "all" && !p.tags.includes(filter)) return false;
    if (industry !== "all" && p.industry !== industry) return false;
    if (query) {
      const text = index.get(p.id);
      return query.toLowerCase().split(/\s+/).filter(Boolean).every((w) => text.includes(w));
    }
    return true;
  };

  const sorted = (list) => [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  const renderFilters = () => {
    const base = { industry: state.industry, query: state.query };
    const all = projects.filter((p) => matches(p, { ...base, filter: "all" })).length;
    const tabsHTML = [{ key: "all", label: "All" }, ...DATA.filters]
      .map((f) => ({ ...f, total: f.key === "all" ? projects.length : projects.filter((p) => p.tags.includes(f.key)).length }))
      .filter((f) => f.total > 0)
      .map((f) => {
        const n = f.key === "all" ? all : projects.filter((p) => matches(p, { ...base, filter: f.key })).length;
        const sel = state.filter === f.key;
        return `<button type="button" class="filter" role="tab" aria-selected="${sel}" tabindex="${sel ? 0 : -1}" data-filter="${f.key}">${escapeHTML(f.label)} <small>${n}</small></button>`;
      }).join("");
    filtersEl.innerHTML = tabsHTML;
  };

  const renderIndustries = () => {
    const used = new Set(projects.map((p) => p.industry));
    industrySelect.innerHTML = '<option value="all">All industries</option>' +
      Object.entries(DATA.industries)
        .filter(([k]) => used.has(k))
        .map(([k, label]) => `<option value="${k}">${escapeHTML(label)} (${projects.filter((p) => p.industry === k).length})</option>`)
        .join("");
  };

  const cardHTML = (p) => {
    const tech = (p.tech || []).slice(0, 3);
    const media = imagesOf(p)[0] || shot(p.url);
    const extra = p.links?.length ? ` · ${p.links.length} sites` : "";
    return `
      <article class="card" data-id="${p.id}">
        <div class="card__media" data-open="${p.id}" role="button" tabindex="-1" aria-label="View details for ${escapeHTML(p.name)}">
          <div class="card__ph" style="--h:${hue(p.name)}"><span>${escapeHTML(initials(p.name))}</span></div>
          <img src="${media}" alt="Screenshot of the ${escapeHTML(p.name)} website" loading="lazy" decoding="async" width="640" height="420">
          <span class="card__type">${escapeHTML(p.type)}</span>
          ${p.featured ? '<span class="card__feat">Featured</span>' : ""}
          <div class="card__overlay" aria-hidden="true">
            <div class="badges">${(p.tech || []).map((t) => `<span class="badge">${escapeHTML(t)}</span>`).join("")}</div>
          </div>
        </div>
        <div class="card__body">
          <div class="card__meta"><span>${escapeHTML(DATA.industries[p.industry] || "")}</span><span>${escapeHTML(p.location && p.location !== "—" ? p.location : hostOf(p.url))}${extra}</span></div>
          <h3 class="card__title"><button type="button" data-open="${p.id}">${escapeHTML(p.name)}</button></h3>
          <p class="card__desc">${escapeHTML(p.summary)}</p>
          <div class="badges">${tech.map((t) => `<span class="badge ${techClass(t)}">${escapeHTML(t)}</span>`).join("")}</div>
          <div class="card__actions">
            <a class="btn btn--primary" href="${p.url}" target="_blank" rel="noopener noreferrer">View Website
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg></a>
            <button type="button" class="btn btn--ghost" data-open="${p.id}">View Details</button>
          </div>
        </div>
      </article>`;
  };

  const hydrateCards = (cards) => {
    cards.forEach((card, i) => {
      const img = $("img", card);
      const media = $(".card__media", card);
      const p = projects.find((x) => x.id === card.dataset.id);
      if (img) attachShotRetry(img, media, imagesOf(p).length ? null : 640);
      if (!reduceMotion) {
        card.classList.add("is-entering");
        setTimeout(() => card.classList.remove("is-entering"), 40 + Math.min(i, 12) * 45);
      }
    });
  };

  const renderGrid = ({ append = false } = {}) => {
    currentList = sorted(projects.filter((p) => matches(p)));
    const visible = currentList.slice(0, state.limit);

    if (append) {
      const existing = grid.children.length;
      grid.insertAdjacentHTML("beforeend", visible.slice(existing).map(cardHTML).join(""));
      hydrateCards([...grid.children].slice(existing));
    } else {
      grid.innerHTML = visible.map(cardHTML).join("");
      hydrateCards([...grid.children]);
    }

    emptyEl.hidden = currentList.length > 0;
    loadMoreBtn.hidden = currentList.length <= state.limit;
    loadMoreBtn.textContent = `Show more projects (${currentList.length - visible.length} left)`;
    countEl.textContent = `${Math.min(visible.length, currentList.length)} of ${currentList.length} project${currentList.length === 1 ? "" : "s"}`;

    // Active filter chips (industry + search)
    const chips = [];
    if (state.industry !== "all") chips.push(`<button type="button" class="chip-x" data-clear="industry">${escapeHTML(DATA.industries[state.industry])}<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button>`);
    if (state.query) chips.push(`<button type="button" class="chip-x" data-clear="query">“${escapeHTML(state.query)}”<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button>`);
    activeFiltersEl.innerHTML = chips.join("");
    activeFiltersEl.hidden = !chips.length;
  };

  const update = ({ animate = true } = {}) => {
    state.limit = PAGE_SIZE;
    renderFilters();
    if (!animate || reduceMotion) return renderGrid();
    grid.style.transition = "opacity .18s";
    grid.style.opacity = "0";
    setTimeout(() => { renderGrid(); grid.style.opacity = "1"; }, 160);
  };

  const setFilter = (key, { scroll = false } = {}) => {
    state.filter = key;
    update();
    const btn = $(`[data-filter="${key}"]`, filtersEl);
    btn?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest", inline: "center" });
    if (scroll) $("#portfolio").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };

  filtersEl.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (btn && btn.dataset.filter !== state.filter) setFilter(btn.dataset.filter);
  });
  filtersEl.addEventListener("keydown", (e) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) return;
    const btns = $$("[data-filter]", filtersEl);
    let i = btns.indexOf(document.activeElement);
    if (e.key === "ArrowRight") i = (i + 1) % btns.length;
    if (e.key === "ArrowLeft") i = (i - 1 + btns.length) % btns.length;
    if (e.key === "Home") i = 0;
    if (e.key === "End") i = btns.length - 1;
    e.preventDefault();
    setFilter(btns[i].dataset.filter);
    $(`[data-filter="${btns[i].dataset.filter}"]`, filtersEl)?.focus();
  });

  let searchTimer;
  searchInput.addEventListener("input", () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => { state.query = searchInput.value.trim(); update({ animate: false }); }, 140);
  });
  addEventListener("keydown", (e) => {
    if (e.key === "/" && !/input|textarea|select/i.test(document.activeElement.tagName) && $("#project-modal").hidden) {
      e.preventDefault();
      searchInput.focus();
      searchInput.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    }
  });
  industrySelect.addEventListener("change", () => { state.industry = industrySelect.value; update(); });
  activeFiltersEl.addEventListener("click", (e) => {
    const b = e.target.closest("[data-clear]");
    if (!b) return;
    if (b.dataset.clear === "industry") { state.industry = "all"; industrySelect.value = "all"; }
    if (b.dataset.clear === "query") { state.query = ""; searchInput.value = ""; }
    update();
  });
  $("#reset-filters").addEventListener("click", () => {
    Object.assign(state, { filter: "all", industry: "all", query: "" });
    searchInput.value = "";
    industrySelect.value = "all";
    update();
  });
  loadMoreBtn.addEventListener("click", () => { state.limit += PAGE_SIZE; renderGrid({ append: true }); });

  // Subtle 3D tilt on project cards
  if (finePointer && !reduceMotion) {
    grid.addEventListener("pointermove", (e) => {
      const card = e.target.closest(".card");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--tilt-y", `${((e.clientX - r.left) / r.width - 0.5) * 5}deg`);
      card.style.setProperty("--tilt-x", `${-((e.clientY - r.top) / r.height - 0.5) * 5}deg`);
    });
    grid.addEventListener("pointerout", (e) => {
      const card = e.target.closest(".card");
      if (card && !card.contains(e.relatedTarget)) { card.style.setProperty("--tilt-x", "0deg"); card.style.setProperty("--tilt-y", "0deg"); }
    });
  }

  grid.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-open]");
    if (trigger) openModal(trigger.dataset.open, trigger);
  });

  // Services → jump to matching projects
  $$("[data-jump]").forEach((el) => {
    const n = projects.filter((p) => p.tags.includes(el.dataset.jump)).length;
    const count = $("[data-service-count]", el);
    if (count) count.textContent = n ? `${n} project${n === 1 ? "" : "s"} →` : "";
    el.addEventListener("click", (e) => {
      if (!n) return;
      e.preventDefault();
      Object.assign(state, { industry: "all", query: "" });
      searchInput.value = "";
      industrySelect.value = "all";
      setFilter(el.dataset.jump, { scroll: true });
    });
  });
  // Services without portfolio matches → preselect project type in the form
  $$("[data-service]").forEach((el) => el.addEventListener("click", () => {
    const radio = $$('#project-type-chips input').find((r) => r.value === el.dataset.service);
    if (radio) radio.checked = true;
  }));

  /* ================================================================= MODAL */
  const modal = $("#project-modal");
  const modalContent = $("#modal-content");
  const panel = $(".modal__panel", modal);
  let lastFocus = null;
  let modalList = [];
  let galleryIndex = 0;

  const slidesFor = (p) => {
    const local = imagesOf(p);
    if (local.length) return local.map((src, i) => ({ label: /mobile/i.test(src) ? "Mobile" : i === 0 ? "Desktop" : `Screen ${i + 1}`, src, mobile: /mobile/i.test(src) }));
    const slides = [
      { label: "Desktop", src: shot(p.url, { w: 1200, h: 825, vpw: 1440, vph: 990 }), w: 1200 },
      { label: "Mobile", src: shot(p.url, { w: 390, h: 844, vpw: 390, vph: 844 }), w: 390, mobile: true }
    ];
    (p.links || []).filter((l) => l.url !== p.url).slice(0, 6).forEach((l) => {
      slides.push({ label: l.label, src: shot(l.url, { w: 1200, h: 825, vpw: 1440, vph: 990 }), w: 1200 });
    });
    return slides;
  };

  const renderSlide = (p, slides) => {
    const s = slides[galleryIndex];
    const stage = $(".gallery__stage", modalContent);
    stage.classList.toggle("is-mobile", !!s.mobile);
    stage.innerHTML = `<div class="card__ph" style="--h:${hue(p.name)}"><span>${escapeHTML(initials(p.name))}</span></div>
      <img src="${s.src}" alt="${escapeHTML(p.name)} — ${escapeHTML(s.label)} view" decoding="async">
      ${slides.length > 1 ? `<button class="gallery__nav gallery__nav--prev" type="button" aria-label="Previous screenshot"><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></button>
      <button class="gallery__nav gallery__nav--next" type="button" aria-label="Next screenshot"><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></button>` : ""}`;
    attachShotRetry($("img", stage), stage, s.w);
    $$(".gallery__thumb", modalContent).forEach((t, i) => t.setAttribute("aria-current", String(i === galleryIndex)));
  };

  const openModal = (id, trigger) => {
    const idx = currentList.findIndex((p) => p.id === id);
    modalList = idx >= 0 ? currentList : projects;
    const p = modalList.find((x) => x.id === id);
    if (!p) return;
    if (modal.hidden) lastFocus = trigger || document.activeElement;
    galleryIndex = 0;
    const slides = slidesFor(p);
    const pos = modalList.indexOf(p);
    const prev = modalList[(pos - 1 + modalList.length) % modalList.length];
    const next = modalList[(pos + 1) % modalList.length];
    const categories = p.tags.map((t) => filterLabel[t]).filter(Boolean);

    modalContent.innerHTML = `
      <div class="gallery">
        <div class="gallery__stage"></div>
        ${slides.length > 1 ? `<div class="gallery__thumbs" role="group" aria-label="Screenshots">${slides.map((s, i) => `<button type="button" class="gallery__thumb" data-slide="${i}">${escapeHTML(s.label)}</button>`).join("")}</div>` : ""}
      </div>
      <div class="detail">
        <p class="detail__type">${escapeHTML(p.type)}</p>
        <h2 id="modal-title">${escapeHTML(p.name)}</h2>
        <p class="detail__desc">${escapeHTML(p.description || p.summary)}</p>
        <dl class="detail__facts">
          <div><dt>Category</dt><dd>${escapeHTML(categories.join(", "))}</dd></div>
          <div><dt>Industry</dt><dd>${escapeHTML(DATA.industries[p.industry] || "—")}</dd></div>
          <div><dt>Client location</dt><dd>${escapeHTML(p.location || "—")}</dd></div>
          <div><dt>My role</dt><dd>${escapeHTML(p.role || SITE.defaultRole || "Web development")}</dd></div>
        </dl>
        <h3>Technologies</h3>
        <div class="badges">${(p.tech || []).map((t) => `<span class="badge ${techClass(t)}">${escapeHTML(t)}</span>`).join("")}</div>
        ${p.features?.length ? `<h3>Key features</h3><ul class="features">${p.features.map((f) => `<li>${escapeHTML(f)}</li>`).join("")}</ul>` : ""}
        ${p.links?.length ? `<h3>Sites in this project</h3><div class="detail__links">${p.links.map((l) => `<a href="${l.url}" target="_blank" rel="noopener noreferrer">${escapeHTML(l.label)} ↗</a>`).join("")}</div>` : ""}
        <div class="detail__actions">
          <a class="btn btn--primary" href="${p.url}" target="_blank" rel="noopener noreferrer">Visit Live Website <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg></a>
          <a class="btn btn--ghost" href="#contact" data-close-to-contact>Start a similar project</a>
        </div>
        ${modalList.length > 1 ? `<div class="detail__pager">
          <button type="button" data-goto="${prev.id}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg><span>${escapeHTML(prev.name)}</span></button>
          <button type="button" data-goto="${next.id}"><span>${escapeHTML(next.name)}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg></button>
        </div>` : ""}
      </div>`;
    renderSlide(p, slides);
    modalContent._project = p;
    modalContent._slides = slides;

    if (modal.hidden) {
      modal.hidden = false;
      modal.classList.remove("is-closing");
      document.body.classList.add("modal-open");
    }
    panel.scrollTop = 0;
    panel.focus();
    history.replaceState(null, "", `#project/${p.id}`);
  };

  const closeModal = ({ toContact = false } = {}) => {
    if (modal.hidden) return;
    const finish = () => {
      modal.hidden = true;
      modal.classList.remove("is-closing");
      document.body.classList.remove("modal-open");
      if (toContact) $("#contact").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      else lastFocus?.focus?.({ preventScroll: true });
    };
    history.replaceState(null, "", toContact ? "#contact" : "#portfolio");
    if (reduceMotion) return finish();
    modal.classList.add("is-closing");
    setTimeout(finish, 280);
  };

  const stepGallery = (dir) => {
    const slides = modalContent._slides;
    if (!slides || slides.length < 2) return;
    galleryIndex = (galleryIndex + dir + slides.length) % slides.length;
    renderSlide(modalContent._project, slides);
  };

  modal.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) return closeModal();
    if (e.target.closest("[data-close-to-contact]")) {
      e.preventDefault();
      const radio = $$("#project-type-chips input").find((r) => modalContent._project.tags.includes("ecommerce") ? r.value === "E-commerce store" : r.value === "Business website");
      if (radio) radio.checked = true;
      return closeModal({ toContact: true });
    }
    const go = e.target.closest("[data-goto]");
    if (go) return openModal(go.dataset.goto);
    const thumb = e.target.closest("[data-slide]");
    if (thumb) { galleryIndex = Number(thumb.dataset.slide); return renderSlide(modalContent._project, modalContent._slides); }
    if (e.target.closest(".gallery__nav--prev")) return stepGallery(-1);
    if (e.target.closest(".gallery__nav--next")) return stepGallery(1);
  });

  modal.addEventListener("keydown", (e) => {
    if (e.key === "Escape") return closeModal();
    if (e.key === "ArrowRight" && !e.target.closest("input, textarea")) stepGallery(1);
    if (e.key === "ArrowLeft" && !e.target.closest("input, textarea")) stepGallery(-1);
    if (e.key === "Tab") {
      const focusables = $$('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])', panel).filter((el) => el.offsetParent !== null);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === panel)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // Swipe between screenshots on touch devices
  let touchX = null;
  modal.addEventListener("touchstart", (e) => { if (e.target.closest(".gallery__stage")) touchX = e.touches[0].clientX; }, { passive: true });
  modal.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) stepGallery(dx < 0 ? 1 : -1);
    touchX = null;
  });

  /* ================================================================ CONTACT */
  const isPlaceholder = (v = "") => /example\.com|your-|0000000000/.test(v);
  const contact = SITE.contact || {};
  $$("[data-contact]").forEach((a) => {
    const key = a.dataset.contact;
    const val = contact[key];
    if (!val || isPlaceholder(val)) {
      a.dataset.placeholder = "";
      a.href = "#contact";
      a.removeAttribute("target");
      return;
    }
    a.href = key === "email" ? `mailto:${val}` : val;
    const label = $("b", a);
    if (label) label.textContent = key === "email" ? val : contact[`${key}Label`] || hostOf(val) + new URL(val).pathname.replace(/\/$/, "");
  });

  const form = $("#contact-form");
  const status = $("#form-status");
  const validators = {
    name: (v) => v.trim().length >= 2 || "Please enter your name.",
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || "Please enter a valid email address.",
    message: (v) => v.trim().length >= 10 || "Tell me a little more (at least 10 characters)."
  };
  const validateField = (input) => {
    const rule = validators[input.name];
    if (!rule) return true;
    const res = rule(input.value);
    const field = input.closest(".field");
    field.classList.toggle("is-invalid", res !== true);
    input.setAttribute("aria-invalid", String(res !== true));
    $(".field__error", field).textContent = res === true ? "" : res;
    return res === true;
  };
  $$("input[name], textarea[name]", form).forEach((el) => {
    el.addEventListener("blur", () => validateField(el));
    el.addEventListener("input", () => { if (el.closest(".field")?.classList.contains("is-invalid")) validateField(el); });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fields = $$("#cf-name, #cf-email, #cf-message", form);
    const ok = fields.map(validateField).every(Boolean);
    if (!ok) { fields.find((f) => f.getAttribute("aria-invalid") === "true")?.focus(); return; }

    const data = Object.fromEntries(new FormData(form));
    const btn = $("button[type=submit]", form);
    status.className = "form-status";

    if (contact.formEndpoint) {
      btn.disabled = true;
      $(".btn__label", btn).textContent = "Sending…";
      try {
        const res = await fetch(contact.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) });
        if (!res.ok) throw new Error(res.statusText);
        form.reset();
        status.textContent = "Thanks! Your message is on its way — I'll reply soon.";
        status.classList.add("is-success");
      } catch {
        status.textContent = "Something went wrong sending your message. Please try email instead.";
        status.classList.add("is-error");
      } finally {
        btn.disabled = false;
        $(".btn__label", btn).textContent = "Send message";
      }
      return;
    }

    if (!contact.email || isPlaceholder(contact.email)) {
      status.textContent = "Contact details haven't been set up yet — add your email in assets/js/projects.js.";
      status.classList.add("is-error");
      return;
    }
    const subject = `New project enquiry: ${data.type}`;
    const body = `Name: ${data.name}\nEmail: ${data.email}\nProject type: ${data.type}\n\n${data.message}`;
    location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.textContent = "Opening your email app with the message ready to send…";
    status.classList.add("is-success");
  });

  /* ================================================================== INIT */
  renderIndustries();
  update({ animate: false });

  const openFromHash = () => {
    const m = location.hash.match(/^#project\/([\w-]+)/);
    if (m && projects.some((p) => p.id === m[1])) {
      $("#portfolio").scrollIntoView();
      openModal(m[1]);
    }
  };
  openFromHash();
  addEventListener("hashchange", openFromHash);
})();
