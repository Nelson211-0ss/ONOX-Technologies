// Shared layout pieces used by every page
const site = require("./content/site");
const services = require("./content/services");

const { serviceGroups } = require("./content/menu");
const industries = require("./content/industries");
const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s]));

const NAV = [
  { key: "home", label: "Home", href: "" },
  { key: "about", label: "About", href: "about/", mega: "about", children: ["about", "how-we-work", "careers", "faq"] },
  { key: "services", label: "Services", href: "services/", mega: "services" },
  { key: "industries", label: "Industries", href: "industries/", mega: "industries" },
  { key: "contact", label: "Contact", href: "contact/" },
];

// Pages listed in the "About" dropdown
const ABOUT_MENU = [
  { href: "about/", icon: "fa-building", title: "About Us", desc: "Our story, mission &amp; values" },
  { href: "how-we-work/", icon: "fa-diagram-project", title: "How We Work", desc: "Our process &amp; support levels" },
  { href: "careers/", icon: "fa-briefcase", title: "Careers", desc: "Join the ONOX team" },
  { href: "faq/", icon: "fa-circle-question", title: "FAQ", desc: "Answers to common questions" },
];

const socialIcons = {
  facebook: "fa-facebook-f",
  instagram: "fa-instagram",
  linkedin: "fa-linkedin-in",
  x: "fa-x-twitter",
  youtube: "fa-youtube",
};

const socialLinks = () =>
  Object.entries(site.social)
    .map(([k, url]) => `<a href="${url}" aria-label="${k}" target="_blank" rel="noopener"><i class="fa-brands ${socialIcons[k]}"></i></a>`)
    .join("");

const logo = (u, light = false) => `
      <a href="${u("")}" class="logo${light ? " logo--light" : ""}" aria-label="${site.name} home">
        <span class="logo__mark"><i class="fa-solid fa-microchip"></i></span>
        <span class="logo__text"><span class="logo__word">ON<span>O</span>X</span><small aria-hidden="true">${"TECHNOLOGIES".split("").map((ch) => `<span>${ch}</span>`).join("")}</small></span>
      </a>`;

// Mega menu panels
const megaLink = (href, icon, title, desc) => `
                <a href="${href}" class="mega__link">
                  <span class="mega__icon"><i class="fa-solid ${icon}"></i></span>
                  <span><strong>${title}</strong><small>${desc}</small></span>
                </a>`;

function servicesMega(u) {
  const cols = serviceGroups.map((g) => `
              <div class="mega__col">
                <h5>${g.title.replace("&", "&amp;")}</h5>${g.items.map((it) => {
                  const s = serviceBySlug[it.slug];
                  return megaLink(u("services/" + s.slug + "/"), s.icon, s.title, it.desc);
                }).join("")}
              </div>`).join("");
  return `
          <div class="mega" id="mega-services">
            <div class="mega__inner">
              <div class="mega__cols mega__cols--4">${cols}
              </div>
              <div class="mega__promo">
                <span class="pill">FREE</span>
                <h4>On-site IT Assessment</h4>
                <p>Not sure what you need? Our engineers will review your systems in Juba and recommend the right solution.</p>
                <a href="tel:${site.phoneLink}" class="mega__phone"><i class="fa-solid fa-phone"></i> ${site.phone}</a>
                <a href="${u("contact/")}" class="btn btn--primary btn--block">Book Assessment</a>
              </div>
            </div>
            <div class="mega__bar">
              <span><i class="fa-solid fa-circle-check"></i> 10 specialist services, one accountable partner</span>
              <a href="${u("services/")}">View all services <i class="fa-solid fa-arrow-right"></i></a>
            </div>
          </div>`;
}

function industriesMega(u) {
  return `
          <div class="mega mega--narrow" id="mega-industries">
            <div class="mega__inner">
              <div class="mega__cols mega__cols--2">
                <div class="mega__col">
                  <h5>Industries We Serve</h5>${industries.slice(0, 4).map((i) => megaLink(u("industries/") + "#" + i.slug, i.icon, i.title, i.desc)).join("")}
                </div>
                <div class="mega__col">
                  <h5>&nbsp;</h5>${industries.slice(4).map((i) => megaLink(u("industries/") + "#" + i.slug, i.icon, i.title, i.desc)).join("")}
                </div>
              </div>
            </div>
            <div class="mega__bar">
              <span><i class="fa-solid fa-circle-check"></i> Tailored IT for every sector in South Sudan</span>
              <a href="${u("industries/")}">All industries <i class="fa-solid fa-arrow-right"></i></a>
            </div>
          </div>`;
}

function aboutMenu(u) {
  return `
          <div class="mega mega--small" id="mega-about">
            <div class="mega__inner">
              <div class="mega__cols">${ABOUT_MENU.map((m) => megaLink(u(m.href), m.icon, m.title, m.desc)).join("")}
              </div>
            </div>
          </div>`;
}

function header(u, active) {
  const panels = { services: servicesMega, industries: industriesMega, about: aboutMenu };
  const items = NAV.map((n) => {
    const isActive = n.key === active || (n.children || []).includes(active);
    const cls = `nav__link${isActive ? " active" : ""}`;
    if (!n.mega) return `<a href="${u(n.href)}" class="${cls}">${n.label}</a>`;
    const panel = panels[n.mega](u);
    return `
        <div class="nav__item nav__item--mega${n.mega === "about" ? " nav__item--small" : ""}">
          <a href="${u(n.href)}" class="${cls}" aria-haspopup="true">${n.label} <i class="fa-solid fa-angle-down nav__caret"></i></a>
          <button class="nav__toggle" aria-label="Show ${n.label.toLowerCase()} menu" aria-expanded="false" aria-controls="mega-${n.mega}"><i class="fa-solid fa-angle-down"></i></button>${panel}
        </div>`;
  }).join("\n        ");

  return `
  <div class="topbar">
    <div class="container topbar__inner">
      <p class="topbar__item"><i class="fa-regular fa-clock"></i> <strong>Office Hours:</strong> ${site.hoursShort}</p>
      <p class="topbar__item topbar__item--mid"><i class="fa-solid fa-location-dot"></i> <strong>Head Office:</strong> <a href="${u("contact/")}">${site.city} <i class="fa-solid fa-angle-right"></i></a></p>
      <div class="topbar__social"><span>FOLLOW US:</span>${socialLinks()}</div>
    </div>
  </div>

  <header class="header" id="header">
    <div class="container header__inner">${logo(u)}

      <nav class="nav" id="nav" aria-label="Main">
        ${items}
      </nav>

      <div class="header__call">
        <span class="header__call-icon"><i class="fa-solid fa-headset"></i></span>
        <div><small>Call Us Anytime</small><a href="tel:${site.phoneLink}">${site.phone}</a></div>
      </div>

      <a href="${u("contact/")}" class="btn btn--dark header__cta">Request a Quote</a>
      <button class="burger" id="burger" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
    </div>
  </header>`;
}

function footer(u) {
  return `
  <footer class="footer">
    <div class="container footer__grid">
      <div class="footer__brand">${logo(u, true)}
        <p>${site.name} is a South Sudanese IT company in Juba delivering reliable, secure and scalable IT services to organizations across South Sudan and East Africa.</p>
        <div class="footer__social">${socialLinks()}</div>
      </div>
      <div>
        <h4>Company</h4>
        <ul>
          <li><a href="${u("about/")}">About Us</a></li>
          <li><a href="${u("industries/")}">Industries</a></li>
          <li><a href="${u("how-we-work/")}">How We Work</a></li>
          <li><a href="${u("careers/")}">Careers</a></li>
          <li><a href="${u("faq/")}">FAQ</a></li>
          <li><a href="${u("contact/")}">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4>Services</h4>
        <ul>
          ${services.slice(0, 6).map((s) => `<li><a href="${u("services/" + s.slug + "/")}">${s.title}</a></li>`).join("\n          ")}
          <li><a href="${u("services/")}">View All Services</a></li>
        </ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul class="footer__contact">
          <li><i class="fa-solid fa-location-dot"></i> ${site.address}</li>
          <li><i class="fa-solid fa-phone"></i> <a href="tel:${site.phoneLink}">${site.phone}</a></li>
          <li><i class="fa-solid fa-envelope"></i> <a href="mailto:${site.email}">${site.email}</a></li>
          <li><i class="fa-regular fa-clock"></i> ${site.hours}</li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <div class="container">
        <p>&copy; <span id="year">2026</span> ${site.name}. All rights reserved.</p>
        <p><a href="${u("privacy-policy/")}">Privacy Policy</a> · <a href="${u("terms/")}">Terms of Service</a></p>
      </div>
    </div>
  </footer>

  <a href="https://wa.me/${site.whatsapp}" class="whatsapp" target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
  <button class="to-top" id="toTop" aria-label="Back to top"><i class="fa-solid fa-arrow-up"></i></button>`;
}

// Inner-page banner with breadcrumb
function banner(u, title, crumbs = [], lead = "") {
  const trail = [`<a href="${u("")}">Home</a>`]
    .concat(crumbs.map((c) => (c.href !== undefined ? `<a href="${u(c.href)}">${c.label}</a>` : `<span>${c.label}</span>`)))
    .join(' <i class="fa-solid fa-angle-right"></i> ');
  return `
  <section class="banner">
    <div class="container banner__inner">
      <nav class="breadcrumb" aria-label="Breadcrumb">${trail}</nav>
      <h1>${title}</h1>
      ${lead ? `<p>${lead}</p>` : ""}
    </div>
    <span class="banner__strip"></span>
  </section>`;
}

function cta(u, title = "Ready to upgrade your IT?", text = "Book a free on-site IT assessment anywhere in Juba and get a clear plan to make your technology faster, safer and more reliable.") {
  return `
  <section class="cta">
    <div class="container cta__inner">
      <div>
        <h2>${title}</h2>
        <p>${text}</p>
      </div>
      <a href="${u("contact/")}" class="btn btn--light">Book Free Assessment <span class="btn__icon"><i class="fa-solid fa-arrow-right"></i></span></a>
    </div>
  </section>`;
}

// Full HTML document
function layout({ route, title, description, active, body, absolute = false }) {
  const depth = route.split("/").filter(Boolean).length;
  const prefix = absolute ? "/" : "../".repeat(depth);
  const u = (href) => prefix + href || "./";
  const fullTitle = active === "home" ?`${site.name} | IT Services Company in Juba, South Sudan` : `${title} | ${site.name}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script>document.documentElement.classList.add("js")</script>
  <title>${fullTitle}</title>
  <meta name="description" content="${description}" />
  <meta property="og:title" content="${fullTitle}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:type" content="website" />
  <link rel="icon" href="${u("assets/img/favicon.svg")}" type="image/svg+xml" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
  <link rel="stylesheet" href="${u("assets/css/style.css")}" />
</head>
<body>
${header(u, active)}

  <main>
${body(u)}
  </main>
${footer(u)}

  <script src="${u("assets/js/main.js")}"></script>
</body>
</html>
`;
}

module.exports = { layout, banner, cta, site, services };
