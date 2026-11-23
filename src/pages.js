// All pages of the ONOX Technologies website
const { banner, cta, site, services } = require("./layout");

const img = (id, w = 900) => `https://images.unsplash.com/${id}?w=${w}&q=80`;

/* ---------------------------------------------------------
   Shared data & sections
--------------------------------------------------------- */
const industries = require("./content/industries");

const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s]));

const statsSection = () => `
  <section class="stats">
    <div class="container stats__grid">
      ${site.stats.map((s) => `
      <div class="stat">
        <i class="fa-solid ${s.icon}"></i>
        <div><strong data-count="${s.value}" data-suffix="${s.suffix}">${s.value}${s.suffix}</strong><span>${s.label}</span></div>
      </div>`).join("")}
    </div>
  </section>`;

const serviceCard = (u, s, i) => `
        <article class="service-card">
          <a href="${u("services/" + s.slug + "/")}" class="service-card__img"><img src="${s.image.replace("w=900", "w=700")}" alt="${s.title}" loading="lazy" /></a>
          <div class="service-card__body">
            <span class="service-card__icon"><i class="fa-solid ${s.icon}"></i></span>
            <small>SERVICE ${String(i + 1).padStart(2, "0")}</small>
            <h3><a href="${u("services/" + s.slug + "/")}">${s.title}</a></h3>
            <p>${s.short}</p>
            <a href="${u("services/" + s.slug + "/")}" class="btn btn--soft">Read More</a>
          </div>
        </article>`;

const whySection = (u) => `
  <section class="why section">
    <div class="container why__grid">
      <div class="why__media reveal">
        <img src="${img("photo-1573496358961-3c82861ab8f4")}" alt="ONOX team working in the office" loading="lazy" />
        <div class="why__card">
          <i class="fa-solid fa-award"></i>
          <div><strong>Proudly South Sudanese</strong><small>building Africa's digital future</small></div>
        </div>
      </div>
      <div class="why__text reveal">
        <span class="pill">WHY CHOOSE ONOX</span>
        <h2>Built for the realities of South Sudan</h2>
        <p>International IT companies fly in and fly out. We're here every day, so we understand local conditions and stay accountable long after a project is finished.</p>
        <div class="why__list">
          <div class="why__item"><span><i class="fa-solid fa-people-group"></i></span><div><h4>Local Team, Fast Response</h4><p>Juba-based engineers who reach your office quickly and travel to field locations across the states.</p></div></div>
          <div class="why__item"><span><i class="fa-solid fa-plug-circle-bolt"></i></span><div><h4>Solutions That Survive Tough Conditions</h4><p>Systems designed for unstable power, heat, dust and limited bandwidth.</p></div></div>
          <div class="why__item"><span><i class="fa-solid fa-file-contract"></i></span><div><h4>NGO &amp; Donor-Ready</h4><p>Experienced with procurement rules, documentation and reporting required by NGOs, UN agencies and donor-funded projects.</p></div></div>
          <div class="why__item"><span><i class="fa-solid fa-hand-holding-dollar"></i></span><div><h4>Transparent Pricing in USD or SSP</h4><p>Clear quotations, flexible payment terms and support plans to fit your budget.</p></div></div>
        </div>
      </div>
    </div>
  </section>`;

const steps = [
  { icon: "fa-comments", title: "Consult", text: "We listen to your goals, challenges and budget, then assess your current setup." },
  { icon: "fa-pen-ruler", title: "Plan &amp; Design", text: "We propose a tailored solution with clear timelines, costs and deliverables." },
  { icon: "fa-gears", title: "Implement", text: "Our engineers deploy, configure and test with minimal disruption to your work." },
  { icon: "fa-life-ring", title: "Support &amp; Optimize", text: "We train your team, monitor performance and keep improving your systems." },
];

const processSection = (title = "A Simple, Proven 4-Step Process") => `
  <section class="process section">
    <div class="container">
      <div class="section__head section__head--light reveal">
        <span class="pill">HOW WE WORK</span>
        <h2>${title}</h2>
        <p>Every engagement follows a clear path from first conversation to ongoing support.</p>
      </div>
      <div class="process__grid">
        ${steps.map((s, i) => `<div class="step reveal"><span class="step__num">0${i + 1}</span><i class="fa-solid ${s.icon}"></i><h4>${s.title}</h4><p>${s.text}</p></div>`).join("\n        ")}
      </div>
    </div>
  </section>`;

const stars = '<div class="quote__stars"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>';

// SAMPLE testimonials – replace with real client feedback before publishing
const testimonials = [
  { initials: "OM", role: "Operations Manager", org: "Commercial Bank, Juba", text: "ONOX rebuilt our branch network and added solar backup to our server room. Even during power cuts in Juba, our systems stay online." },
  { initials: "HT", role: "Head Teacher", org: "Private School, Juba", text: "They built our school management system from scratch and trained our staff. Professional, patient and always available when we need them." },
  { initials: "CD", role: "Country Director", org: "International NGO, South Sudan", text: "ONOX connected our field offices in remote counties via VSAT and secured our data. Our teams can finally report in real time." },
];

const testimonialsSection = () => `
  <section class="testimonials section">
    <div class="container">
      <div class="section__head reveal">
        <span class="pill">TESTIMONIALS</span>
        <h2>What Our Clients Say</h2>
      </div>
      <div class="testimonials__grid">
        ${testimonials.map((t) => `
        <figure class="quote reveal">
          ${stars}
          <blockquote>"${t.text}"</blockquote>
          <figcaption><span class="quote__avatar">${t.initials}</span><div><strong>${t.role}</strong><small>${t.org}</small></div></figcaption>
        </figure>`).join("")}
      </div>
    </div>
  </section>`;

const faqList = (items) => `
        <div class="faq">
          ${items.map((f, i) => `
          <details class="faq__item"${i === 0 ? " open" : ""}>
            <summary>${f.q}<i class="fa-solid fa-plus"></i></summary>
            <p>${f.a}</p>
          </details>`).join("")}
        </div>`;

// Featured product: SSDACMIS
const p = site.product;
const productButtons = (u) => `
          <div class="product__actions">
            <a href="${p.url}" class="btn btn--primary" target="_blank" rel="noopener">Access ${p.name} <span class="btn__icon"><i class="fa-solid fa-arrow-up-right-from-square"></i></span></a>
            <a href="${u("contact/")}" class="btn btn--dark">Request a Demo</a>
          </div>`;

const productSection = (u, soft = true) => `
  <section class="product section${soft ? " section--soft" : ""}" id="ssdacmis">
    <div class="container product__grid">
      <div class="product__text reveal">
        <span class="pill">OUR PRODUCT</span>
        <h2>${p.name}: ${p.tagline}</h2>
        <p>${p.name} is a school management system built by ONOX Technologies for secondary schools. It brings school records and administration into one secure, web-based platform that school staff can access from any computer.</p>
        <ul class="product__list">
          <li><i class="fa-solid fa-user-graduate"></i> Student registration &amp; records</li>
          <li><i class="fa-solid fa-file-signature"></i> Examinations &amp; results</li>
          <li><i class="fa-solid fa-chalkboard-user"></i> Classes, subjects &amp; teachers</li>
          <li><i class="fa-solid fa-chart-column"></i> Reports for school leaders</li>
        </ul>${productButtons(u)}
      </div>

      <div class="product__visual reveal" aria-hidden="true">
        <div class="mock">
          <div class="mock__bar"><span></span><span></span><span></span><em>${p.name}</em></div>
          <div class="mock__body">
            <div class="mock__side">
              <b class="mock__logo"><i class="fa-solid fa-graduation-cap"></i></b>
              <i class="fa-solid fa-house is-on"></i><i class="fa-solid fa-users"></i><i class="fa-solid fa-book"></i><i class="fa-solid fa-file-lines"></i><i class="fa-solid fa-gear"></i>
            </div>
            <div class="mock__main">
              <div class="mock__tiles">
                <div><i class="fa-solid fa-user-graduate"></i><b></b><small></small></div>
                <div><i class="fa-solid fa-chalkboard-user"></i><b></b><small></small></div>
                <div><i class="fa-solid fa-school"></i><b></b><small></small></div>
              </div>
              <div class="mock__chart">
                <span style="height:45%"></span><span style="height:70%"></span><span style="height:55%"></span><span style="height:85%"></span><span style="height:62%"></span><span style="height:92%"></span><span style="height:74%"></span>
              </div>
              <div class="mock__rows"><span></span><span></span><span></span></div>
            </div>
          </div>
        </div>
        <div class="product__badge"><i class="fa-solid fa-school"></i><div><strong>For Secondary Schools</strong><small>Web-based · Secure</small></div></div>
      </div>
    </div>
  </section>`;

/* ---------------------------------------------------------
   HOME
--------------------------------------------------------- */
const home = {
  route: "",
  active: "home",
  title: "Home",
  description: "ONOX Technologies is a South Sudanese IT company in Juba providing managed IT support, internet &amp; VSAT connectivity, networking, solar power backup, software development, cloud and cybersecurity.",
  body: (u) => `
  <section class="hero">
    <div class="hero__bg"></div>
    <div class="container hero__content">
      <span class="pill pill--outline"><i class="fa-solid fa-circle-check"></i> Proudly South Sudanese · Serving East Africa</span>
      <h1>Reliable IT Solutions Powering<br />South Sudan &amp; Africa</h1>
      <p>From Juba to the field, ONOX Technologies keeps organizations connected, secure and productive with internet connectivity, networks, solar-backed IT systems, custom software and dependable local support.</p>
      <div class="hero__actions">
        <a href="${u("contact/")}" class="btn btn--primary">Talk to an Expert <span class="btn__icon"><i class="fa-solid fa-arrow-right"></i></span></a>
        <a href="${u("services/")}" class="btn btn--ghost">Explore Services</a>
      </div>
    </div>
    <div class="hero__shape"></div>
  </section>

  <section class="partners">
    <div class="container">
      <p class="partners__title">Technologies &amp; platforms we work with</p>
      <div class="partners__row">
        <span><i class="fa-brands fa-microsoft"></i> Microsoft 365</span>
        <span><i class="fa-brands fa-aws"></i> AWS</span>
        <span><i class="fa-brands fa-google"></i> Google Cloud</span>
        <span><i class="fa-solid fa-network-wired"></i> Cisco</span>
        <span><i class="fa-brands fa-linux"></i> Linux</span>
        <span><i class="fa-solid fa-satellite"></i> VSAT &amp; Satellite</span>
      </div>
    </div>
  </section>

  <section class="about section">
    <div class="container about__grid">
      <div class="about__text reveal">
        <span class="pill">ABOUT ONOX</span>
        <h2>Local expertise, world-class IT standards</h2>
        <p>ONOX Technologies is a South Sudanese IT company headquartered in Juba. We help government institutions, NGOs, UN agencies, banks, schools, hospitals and private businesses plan, build, secure and support their technology.</p>
        <p>We know the realities of working here: unreliable power, limited connectivity and remote field locations. That's why we design solutions that keep running in tough conditions.</p>
        <ul class="checklist">
          <li><i class="fa-solid fa-angles-right"></i> Managed IT Support</li>
          <li><i class="fa-solid fa-angles-right"></i> Internet &amp; VSAT</li>
          <li><i class="fa-solid fa-angles-right"></i> Networking &amp; CCTV</li>
          <li><i class="fa-solid fa-angles-right"></i> Solar Power for IT</li>
          <li><i class="fa-solid fa-angles-right"></i> Software Development</li>
          <li><i class="fa-solid fa-angles-right"></i> Cybersecurity</li>
        </ul>
        <div class="about__actions">
          <a href="${u("about/")}" class="btn btn--dark">More About Us <span class="btn__icon"><i class="fa-solid fa-arrow-right"></i></span></a>
          <div class="about__phone">
            <span><i class="fa-solid fa-phone"></i></span>
            <div><strong>Have Questions?</strong><a href="tel:${site.phoneLink}">${site.phone}</a></div>
          </div>
        </div>
      </div>
      <div class="about__media reveal">
        <span class="chevrons chevrons--about"><i class="fa-solid fa-angles-up"></i><i class="fa-solid fa-angles-up"></i></span>
        <div class="about__img about__img--main"><img src="${img("photo-1573497701240-345a300b8d36", 800)}" alt="ONOX team collaborating" /></div>
        <div class="about__img about__img--sub"><img src="${img("photo-1531482615713-2afd69097998", 700)}" alt="Engineers at work" /></div>
        <div class="about__badge">
          <strong>${site.yearsExperience}</strong>
          <span>Years of<br />Experience</span>
          <div class="about__badge-tag"><i class="fa-solid fa-location-dot"></i> Based in Juba</div>
        </div>
      </div>
    </div>
  </section>
${statsSection()}

  <section class="services section">
    <span class="chevrons chevrons--right"><i class="fa-solid fa-angles-down"></i><i class="fa-solid fa-angles-down"></i></span>
    <div class="container">
      <div class="section__head reveal">
        <span class="pill">OUR SERVICES</span>
        <h2>Complete IT Services Under One Roof</h2>
        <p>From a single laptop in Juba to a connected field office in a remote county, ONOX has a team ready to deliver.</p>
      </div>
      <div class="services__track" id="servicesTrack">
        ${services.map((s, i) => serviceCard(u, s, i)).join("")}
      </div>
      <div class="slider-nav">
        <button id="prevBtn" aria-label="Previous services"><i class="fa-solid fa-angle-left"></i></button>
        <button id="nextBtn" class="active" aria-label="Next services"><i class="fa-solid fa-angle-right"></i></button>
      </div>
    </div>
  </section>
${whySection(u)}
${productSection(u)}
${processSection()}

  <section class="industries section">
    <div class="container">
      <div class="section__head reveal">
        <span class="pill">INDUSTRIES WE SERVE</span>
        <h2>IT Expertise Across Every Sector</h2>
        <p>We support the institutions and businesses driving South Sudan's growth.</p>
      </div>
      <div class="industries__grid">
        ${industries.map((i) => `<a href="${u("industries/")}#${i.slug}" class="industry reveal"><i class="fa-solid ${i.icon}"></i><h4>${i.title}</h4></a>`).join("\n        ")}
      </div>
    </div>
  </section>
${testimonialsSection()}
${cta(u)}`,
};

/* ---------------------------------------------------------
   ABOUT
--------------------------------------------------------- */
const about = {
  route: "about/",
  active: "about",
  title: "About Us",
  description: "Learn about ONOX Technologies, a South Sudanese IT company in Juba helping organizations across South Sudan and East Africa with reliable IT services.",
  body: (u) => `
${banner(u, "About ONOX Technologies", [{ label: "About Us" }], "A South Sudanese IT company helping organizations connect, protect and grow through technology.")}

  <section class="section">
    <div class="container about__grid">
      <div class="about__media reveal">
        <div class="about__img about__img--main"><img src="${img("photo-1573497701240-345a300b8d36", 800)}" alt="ONOX team" /></div>
        <div class="about__img about__img--sub"><img src="${img("photo-1531482615713-2afd69097998", 700)}" alt="Engineers at work" /></div>
        <div class="about__badge">
          <strong>${site.yearsExperience}</strong>
          <span>Years of<br />Experience</span>
          <div class="about__badge-tag"><i class="fa-solid fa-location-dot"></i> Based in Juba</div>
        </div>
      </div>
      <div class="about__text reveal">
        <span class="pill">OUR STORY</span>
        <h2>Technology that works, here at home</h2>
        <p>ONOX Technologies was founded in Juba with a simple belief: organizations in South Sudan deserve the same reliable, secure and modern IT services found anywhere in the world, delivered by people who understand local conditions.</p>
        <p>Today we are a full-service IT company supporting government institutions, NGOs and UN agencies, banks, schools, hospitals, hotels and private businesses. Our team designs networks, connects remote field offices, builds software, secures data and keeps systems running through power cuts and connectivity challenges.</p>
        <p>We measure our success by our clients' success: fewer disruptions, safer data, lower costs and teams that can focus on their mission.</p>
      </div>
    </div>
  </section>

  <section class="section section--soft">
    <div class="container">
      <div class="section__head reveal">
        <span class="pill">WHAT DRIVES US</span>
        <h2>Our Mission, Vision &amp; Values</h2>
      </div>
      <div class="mvv">
        <div class="mvv__card reveal">
          <i class="fa-solid fa-bullseye"></i>
          <h3>Our Mission</h3>
          <p>To empower organizations in South Sudan and across Africa with reliable, secure and affordable technology that helps them work better and serve their communities.</p>
        </div>
        <div class="mvv__card reveal">
          <i class="fa-solid fa-eye"></i>
          <h3>Our Vision</h3>
          <p>To be South Sudan's most trusted technology partner and a leading African IT company building the region's digital future.</p>
        </div>
        <div class="mvv__card reveal">
          <i class="fa-solid fa-gem"></i>
          <h3>Our Values</h3>
          <ul class="values">
            <li><i class="fa-solid fa-check"></i> <strong>Integrity:</strong> honest advice and transparent pricing</li>
            <li><i class="fa-solid fa-check"></i> <strong>Reliability:</strong> we do what we promise</li>
            <li><i class="fa-solid fa-check"></i> <strong>Excellence:</strong> international standards in every job</li>
            <li><i class="fa-solid fa-check"></i> <strong>Local Commitment:</strong> developing South Sudanese talent</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
${statsSection()}
${whySection(u)}

  <section class="section section--soft">
    <div class="container">
      <div class="section__head reveal">
        <span class="pill">OUR COMMITMENT</span>
        <h2>Investing in South Sudanese Talent</h2>
        <p>We believe the future of technology in South Sudan will be built by South Sudanese professionals. We hire locally, train continuously and mentor young IT graduates through internships and attachments.</p>
      </div>
      <div class="commit">
        <div class="commit__item reveal"><i class="fa-solid fa-user-graduate"></i><h4>Internships</h4><p>Hands-on experience for IT students and graduates.</p></div>
        <div class="commit__item reveal"><i class="fa-solid fa-certificate"></i><h4>Certification</h4><p>Ongoing training in leading networking, cloud and security platforms.</p></div>
        <div class="commit__item reveal"><i class="fa-solid fa-people-arrows"></i><h4>Knowledge Transfer</h4><p>We train our clients' staff so they grow with their systems.</p></div>
      </div>
    </div>
  </section>
${cta(u, "Let's build something reliable together")}`,
};

/* ---------------------------------------------------------
   SERVICES (overview)
--------------------------------------------------------- */
const servicesPage = {
  route: "services/",
  active: "services",
  title: "IT Services",
  description: "Explore ONOX Technologies' IT services in South Sudan: managed IT support, software development, cloud, cybersecurity, networking, VSAT internet, solar power backup and more.",
  body: (u) => `
${banner(u, "Our IT Services", [{ label: "Services" }], "Ten specialist services, one accountable partner. Everything your organization needs to run on reliable technology.")}

  <section class="section section--soft">
    <div class="container">
      <div class="services__grid">
        ${services.map((s, i) => serviceCard(u, s, i)).join("")}
      </div>
    </div>
  </section>
${processSection("How Every Project Is Delivered")}

  <section class="section">
    <div class="container plans__wrap">
      <div class="section__head reveal">
        <span class="pill">FLEXIBLE ENGAGEMENT</span>
        <h2>Work With Us Your Way</h2>
        <p>Choose the engagement model that fits your organization and budget.</p>
      </div>
      <div class="plans">
        <div class="plan reveal">
          <i class="fa-solid fa-screwdriver-wrench"></i>
          <h3>Pay-Per-Job</h3>
          <p>Ideal for one-off repairs, installations and urgent support.</p>
          <ul><li><i class="fa-solid fa-check"></i> No contract required</li><li><i class="fa-solid fa-check"></i> Quoted before work begins</li><li><i class="fa-solid fa-check"></i> On-site or remote</li></ul>
        </div>
        <div class="plan plan--featured reveal">
          <span class="plan__tag">Most Popular</span>
          <i class="fa-solid fa-calendar-check"></i>
          <h3>Managed Monthly Plan</h3>
          <p>Complete IT support for a fixed monthly fee.</p>
          <ul><li><i class="fa-solid fa-check"></i> Helpdesk &amp; on-site visits</li><li><i class="fa-solid fa-check"></i> 24/7 monitoring</li><li><i class="fa-solid fa-check"></i> Monthly reports</li></ul>
        </div>
        <div class="plan reveal">
          <i class="fa-solid fa-diagram-project"></i>
          <h3>Project-Based</h3>
          <p>Fixed-scope projects with clear deliverables and timelines.</p>
          <ul><li><i class="fa-solid fa-check"></i> Detailed proposal &amp; budget</li><li><i class="fa-solid fa-check"></i> Dedicated project manager</li><li><i class="fa-solid fa-check"></i> Handover &amp; training</li></ul>
        </div>
      </div>
    </div>
  </section>
${cta(u, "Not sure which service you need?", "Tell us about your challenge and our specialists will recommend the right solution, free of charge.")}`,
};

/* ---------------------------------------------------------
   SERVICE DETAIL pages
--------------------------------------------------------- */
const servicePages = services.map((s, idx) => ({
  route: `services/${s.slug}/`,
  active: "services",
  title: s.title,
  description: `${s.title} in Juba and across South Sudan by ONOX Technologies. ${s.short.replace(/&amp;/g, "and")}`,
  body: (u) => `
${banner(u, s.title, [{ label: "Services", href: "services/" }, { label: s.title }], s.short)}

  <section class="section">
    <div class="container detail">
      <div class="detail__main">
        <img class="detail__img" src="${s.image.replace("w=900", "w=1200")}" alt="${s.title}" />
        <h2>${s.title} in South Sudan</h2>
        ${s.intro.map((x) => `<p>${x}</p>`).join("\n        ")}
${s.slug === "software-development" ? `
        <div class="product-callout">
          <span class="product-callout__icon"><i class="fa-solid fa-school"></i></span>
          <div>
            <small>FEATURED SYSTEM</small>
            <h4>${p.name}: ${p.tagline}</h4>
            <p>One of the systems we have built: a web-based platform that helps secondary schools manage students, classes, examinations and reports.</p>${productButtons(u)}
          </div>
        </div>` : ""}

        <h3>What's Included</h3>
        <ul class="detail__list">
          ${s.includes.map((x) => `<li><i class="fa-solid fa-circle-check"></i> ${x}</li>`).join("\n          ")}
        </ul>

        <h3>Key Benefits</h3>
        <div class="benefits">
          ${s.benefits.map((b) => `<div class="benefit"><span><i class="fa-solid ${b.icon}"></i></span><div><h4>${b.title}</h4><p>${b.text}</p></div></div>`).join("\n          ")}
        </div>

        <h3>Ideal For</h3>
        <div class="tags">${s.idealFor.map((t) => `<span>${t}</span>`).join("")}</div>

        <h3>Frequently Asked Questions</h3>
        ${faqList(s.faqs)}
      </div>

      <aside class="detail__side">
        <div class="side-box">
          <h4>All Services</h4>
          <ul class="side-links">
            ${services.map((o) => `<li><a href="${u("services/" + o.slug + "/")}"${o.slug === s.slug ? ' class="active"' : ""}><span><i class="fa-solid ${o.icon}"></i> ${o.title}</span><i class="fa-solid fa-angle-right"></i></a></li>`).join("\n            ")}
          </ul>
        </div>
        <div class="side-box side-box--dark">
          <i class="fa-solid fa-headset side-box__icon"></i>
          <h4>Need ${s.title}?</h4>
          <p>Speak to our specialists for a free assessment and quotation.</p>
          <a href="tel:${site.phoneLink}" class="side-box__phone">${site.phone}</a>
          <a href="${u("contact/")}" class="btn btn--primary btn--block">Request a Quote</a>
        </div>
      </aside>
    </div>
  </section>

  <section class="section section--soft">
    <div class="container">
      <div class="section__head reveal">
        <span class="pill">RELATED SERVICES</span>
        <h2>You May Also Need</h2>
      </div>
      <div class="services__grid">
        ${[1, 2, 3].map((n) => { const j = (idx + n) % services.length; return serviceCard(u, services[j], j); }).join("")}
      </div>
    </div>
  </section>
${cta(u)}`,
}));

/* ---------------------------------------------------------
   INDUSTRIES
--------------------------------------------------------- */
const industriesPage = {
  route: "industries/",
  active: "industries",
  title: "Industries We Serve",
  description: "ONOX Technologies provides IT solutions for government, NGOs, UN agencies, banks, oil and gas, telecom, education, healthcare and hospitality in South Sudan.",
  body: (u) => `
${banner(u, "Industries We Serve", [{ label: "Industries" }], "Tailored IT solutions for the sectors driving South Sudan's development.")}

  <section class="section">
    <div class="container">
      <div class="section__head reveal">
        <span class="pill">SECTOR EXPERTISE</span>
        <h2>We Understand Your Sector</h2>
        <p>Every industry has different priorities, from data security in banking to connectivity in humanitarian field work. We shape our solutions around yours.</p>
      </div>
      <div class="ind-list">
        ${industries.map((i) => `
        <article class="ind-card reveal" id="${i.slug}">
          <span class="ind-card__icon"><i class="fa-solid ${i.icon}"></i></span>
          <div>
            <h3>${i.title}</h3>
            <p>${i.text}</p>
            <div class="ind-card__links">
              ${i.slug === "education" ? `<a href="${u("")}#ssdacmis"><i class="fa-solid fa-school"></i> ${p.name} School System</a>` : ""}
              ${i.services.map((sl) => `<a href="${u("services/" + sl + "/")}"><i class="fa-solid ${serviceBySlug[sl].icon}"></i> ${serviceBySlug[sl].title}</a>`).join("\n              ")}
            </div>
          </div>
        </article>`).join("")}
      </div>
    </div>
  </section>
${testimonialsSection()}
${cta(u, "Don't see your industry?", "We work with organizations of every type. Tell us about yours and we'll design the right solution.")}`,
};

/* ---------------------------------------------------------
   HOW WE WORK
--------------------------------------------------------- */
const detailedSteps = [
  { icon: "fa-phone-volume", title: "Free Consultation", text: "Call, email or WhatsApp us. We discuss your needs, challenges and budget, with no obligation." },
  { icon: "fa-magnifying-glass-chart", title: "Site Visit &amp; Assessment", text: "Our engineers visit your premises (or review remotely) to assess your current systems, power and connectivity." },
  { icon: "fa-file-signature", title: "Proposal &amp; Quotation", text: "You receive a clear written proposal with recommended solution, timeline and transparent pricing in USD or SSP." },
  { icon: "fa-gears", title: "Implementation", text: "Our certified team installs, configures and tests everything, working around your schedule to minimize disruption." },
  { icon: "fa-chalkboard-user", title: "Handover &amp; Training", text: "We document the solution, hand over credentials and train your staff to use their new systems confidently." },
  { icon: "fa-life-ring", title: "Ongoing Support", text: "We remain your partner with support plans, monitoring, maintenance and advice as your organization grows." },
];

const howWeWork = {
  route: "how-we-work/",
  active: "how-we-work",
  title: "How We Work",
  description: "See how ONOX Technologies delivers IT projects and support in South Sudan, from free consultation and site assessment to implementation, training and ongoing support.",
  body: (u) => `
${banner(u, "How We Work", [{ label: "How We Work" }], "A clear, proven process that delivers results on time and on budget.")}

  <section class="section">
    <div class="container">
      <div class="section__head reveal">
        <span class="pill">OUR PROCESS</span>
        <h2>From First Call to Long-Term Partnership</h2>
        <p>Whether it's a single repair or a nationwide rollout, every engagement follows the same disciplined steps.</p>
      </div>
      <div class="timeline">
        ${detailedSteps.map((s, i) => `
        <div class="timeline__item reveal">
          <span class="timeline__num">0${i + 1}</span>
          <div class="timeline__body">
            <i class="fa-solid ${s.icon}"></i>
            <h3>${s.title}</h3>
            <p>${s.text}</p>
          </div>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <section class="section section--soft">
    <div class="container">
      <div class="section__head reveal">
        <span class="pill">SUPPORT LEVELS</span>
        <h2>Support That Matches Your Needs</h2>
        <p>Managed clients choose a support level with agreed response times.</p>
      </div>
      <div class="table-wrap reveal">
        <table class="sla">
          <thead><tr><th>Feature</th><th>Essential</th><th>Business</th><th>Premium</th></tr></thead>
          <tbody>
            <tr><td>Helpdesk (phone, email, WhatsApp)</td><td>Business hours</td><td>Extended hours</td><td>24/7</td></tr>
            <tr><td>Remote monitoring</td><td><i class="fa-solid fa-check"></i></td><td><i class="fa-solid fa-check"></i></td><td><i class="fa-solid fa-check"></i></td></tr>
            <tr><td>On-site visits in Juba</td><td>On request</td><td>Scheduled monthly</td><td>Scheduled weekly</td></tr>
            <tr><td>Critical issue response</td><td>Next business day</td><td>Same day</td><td>Priority, within hours</td></tr>
            <tr><td>Field office support</td><td>Remote</td><td>Remote + planned visits</td><td>Remote + priority visits</td></tr>
            <tr><td>Monthly IT report</td><td><i class="fa-solid fa-minus"></i></td><td><i class="fa-solid fa-check"></i></td><td><i class="fa-solid fa-check"></i></td></tr>
            <tr><td>Dedicated account manager</td><td><i class="fa-solid fa-minus"></i></td><td><i class="fa-solid fa-minus"></i></td><td><i class="fa-solid fa-check"></i></td></tr>
          </tbody>
        </table>
      </div>
      <p class="note">Exact response times and pricing are confirmed in your service agreement. <a href="${u("contact/")}">Contact us</a> for a quotation.</p>
    </div>
  </section>
${whySection(u)}
${cta(u)}`,
};

/* ---------------------------------------------------------
   CAREERS
--------------------------------------------------------- */
const careers = {
  route: "careers/",
  active: "careers",
  title: "Careers",
  description: "Build your IT career with ONOX Technologies in Juba, South Sudan. Explore roles, internships and how to apply.",
  body: (u) => `
${banner(u, "Careers at ONOX", [{ label: "Careers" }], "Grow your technology career with a team building South Sudan's digital future.")}

  <section class="section">
    <div class="container about__grid">
      <div class="about__text reveal">
        <span class="pill">JOIN OUR TEAM</span>
        <h2>Do meaningful work with technology</h2>
        <p>At ONOX, you'll solve real problems for organizations that matter: connecting humanitarian field teams, securing banks, digitizing schools and hospitals, and keeping critical systems running.</p>
        <p>We are always looking for talented, curious and hardworking people, especially young South Sudanese professionals ready to learn and grow.</p>
        <a href="mailto:${site.careersEmail}" class="btn btn--dark">Send Your CV <span class="btn__icon"><i class="fa-solid fa-paper-plane"></i></span></a>
      </div>
      <div class="perks reveal">
        <div class="perk"><i class="fa-solid fa-graduation-cap"></i><h4>Training &amp; Certification</h4><p>Support to earn industry certifications.</p></div>
        <div class="perk"><i class="fa-solid fa-arrow-trend-up"></i><h4>Career Growth</h4><p>Clear paths from junior to senior roles.</p></div>
        <div class="perk"><i class="fa-solid fa-diagram-project"></i><h4>Real Projects</h4><p>Hands-on work on diverse, impactful projects.</p></div>
        <div class="perk"><i class="fa-solid fa-people-group"></i><h4>Great Team</h4><p>Supportive colleagues who share knowledge.</p></div>
      </div>
    </div>
  </section>

  <section class="section section--soft">
    <div class="container">
      <div class="section__head reveal">
        <span class="pill">ROLES WE HIRE FOR</span>
        <h2>Areas of Opportunity</h2>
        <p>Open vacancies are announced here and on our social media. You can also send a general application at any time.</p>
      </div>
      <div class="roles">
        <div class="role reveal"><i class="fa-solid fa-network-wired"></i><div><h4>Network &amp; Systems Engineers</h4><p>Design, install and maintain networks, servers and connectivity.</p></div></div>
        <div class="role reveal"><i class="fa-solid fa-headset"></i><div><h4>IT Support Technicians</h4><p>Provide helpdesk, on-site and remote support to clients.</p></div></div>
        <div class="role reveal"><i class="fa-solid fa-code"></i><div><h4>Software Developers</h4><p>Build web, mobile and business applications.</p></div></div>
        <div class="role reveal"><i class="fa-solid fa-shield-halved"></i><div><h4>Cybersecurity Specialists</h4><p>Protect client systems and data from threats.</p></div></div>
        <div class="role reveal"><i class="fa-solid fa-solar-panel"></i><div><h4>Solar &amp; Power Technicians</h4><p>Install and maintain solar and backup power systems.</p></div></div>
        <div class="role reveal"><i class="fa-solid fa-user-graduate"></i><div><h4>Interns &amp; Graduate Trainees</h4><p>Learn on the job alongside experienced engineers.</p></div></div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container apply reveal">
      <div>
        <h2>How to Apply</h2>
        <p>Email your CV and a short cover letter to <a href="mailto:${site.careersEmail}">${site.careersEmail}</a>. Mention the role you're interested in in the subject line. Shortlisted candidates will be contacted for an interview.</p>
      </div>
      <a href="mailto:${site.careersEmail}" class="btn btn--primary">Apply Now <span class="btn__icon"><i class="fa-solid fa-arrow-right"></i></span></a>
    </div>
  </section>`,
};

/* ---------------------------------------------------------
   FAQ
--------------------------------------------------------- */
const generalFaqs = [
  { q: "Where is ONOX Technologies located?", a: `Our head office is in ${site.city}. We serve clients across all states of South Sudan and the wider East African region.` },
  { q: "Do you work outside Juba?", a: "Yes. We provide remote support nationwide and travel to field locations for installations, connectivity projects and maintenance." },
  { q: "Do you offer free consultations?", a: "Yes. Initial consultations and assessments in Juba are free. We then provide a written proposal and quotation." },
  { q: "Which currencies do you accept?", a: "We quote and invoice in US Dollars (USD) or South Sudanese Pounds (SSP), and accept bank transfer and other agreed payment methods." },
  { q: "Can you meet NGO and donor procurement requirements?", a: "Yes. We provide formal quotations, pro-forma invoices, delivery notes, warranties and any documentation required for procurement and audits." },
  { q: "How quickly do you respond to support requests?", a: "Managed clients receive agreed response times based on their support level. Pay-per-job requests are handled as quickly as possible, usually the same or next business day in Juba." },
  { q: "Do you sell equipment as well as services?", a: "Yes. We supply genuine laptops, desktops, servers, printers, networking equipment, UPS units and solar power systems." },
  { q: "Can you take over IT support from our current provider?", a: "Yes. We carry out a smooth handover, document your systems and make sure nothing is lost during the transition." },
];

const faqPage = {
  route: "faq/",
  active: "faq",
  title: "Frequently Asked Questions",
  description: "Answers to common questions about ONOX Technologies' IT services, pricing, coverage and support in South Sudan.",
  body: (u) => `
${banner(u, "Frequently Asked Questions", [{ label: "FAQ" }], "Quick answers to the questions we hear most often.")}

  <section class="section">
    <div class="container faq-page">
      <div class="faq-page__main reveal">${faqList(generalFaqs)}</div>
      <aside class="side-box side-box--dark reveal">
        <i class="fa-solid fa-circle-question side-box__icon"></i>
        <h4>Still have questions?</h4>
        <p>Our team is happy to help. Reach us by phone, email or WhatsApp.</p>
        <a href="tel:${site.phoneLink}" class="side-box__phone">${site.phone}</a>
        <a href="${u("contact/")}" class="btn btn--primary btn--block">Contact Us</a>
      </aside>
    </div>
  </section>`,
};

/* ---------------------------------------------------------
   CONTACT
--------------------------------------------------------- */
const contact = {
  route: "contact/",
  active: "contact",
  title: "Contact Us",
  description: `Contact ONOX Technologies in ${site.city}. Call ${site.phone}, email ${site.email} or request a free IT consultation and quote.`,
  body: (u) => `
${banner(u, "Contact Us", [{ label: "Contact" }], "Let's talk about your project. We usually respond within one business day.")}

  <section class="section">
    <div class="container">
      <div class="contact-cards">
        <div class="contact-card reveal"><i class="fa-solid fa-location-dot"></i><h4>Visit Us</h4><p>${site.address}</p></div>
        <div class="contact-card reveal"><i class="fa-solid fa-phone"></i><h4>Call Us</h4><p><a href="tel:${site.phoneLink}">${site.phone}</a></p></div>
        <div class="contact-card reveal"><i class="fa-solid fa-envelope"></i><h4>Email Us</h4><p><a href="mailto:${site.email}">${site.email}</a></p></div>
        <div class="contact-card reveal"><i class="fa-brands fa-whatsapp"></i><h4>WhatsApp</h4><p><a href="https://wa.me/${site.whatsapp}" target="_blank" rel="noopener">Chat with us</a></p></div>
      </div>
    </div>
  </section>

  <section class="section section--soft">
    <div class="container contact__grid">
      <div class="contact__info reveal">
        <span class="pill">GET IN TOUCH</span>
        <h2>Request a free consultation</h2>
        <p>Tell us what you need and one of our IT specialists will get back to you within one business day.</p>
        <ul class="contact__list">
          <li><span><i class="fa-regular fa-clock"></i></span><div><strong>Working Hours</strong><small>${site.hours}</small></div></li>
          <li><span><i class="fa-solid fa-headset"></i></span><div><strong>Managed Clients</strong><small>24/7 support line as per your agreement</small></div></li>
          <li><span><i class="fa-solid fa-map-location-dot"></i></span><div><strong>Coverage</strong><small>Juba, all states of South Sudan &amp; East Africa</small></div></li>
        </ul>
      </div>

      <form class="contact__form reveal" id="contactForm">
        <h3>Request a Free Quote</h3>
        <div class="form__row">
          <input type="text" name="name" placeholder="Full Name" required />
          <input type="email" name="email" placeholder="Email Address" required />
        </div>
        <div class="form__row">
          <input type="tel" name="phone" placeholder="Phone Number (+211...)" />
          <input type="text" name="company" placeholder="Company / Organization" />
        </div>
        <select name="service" required>
          <option value="" disabled selected>Select a Service</option>
          ${services.map((s) => `<option>${s.title}</option>`).join("\n          ")}
          <option>Other</option>
        </select>
        <textarea name="message" rows="5" placeholder="Tell us about your project or IT challenge..." required></textarea>
        <button type="submit" class="btn btn--primary btn--block">Send Message <span class="btn__icon"><i class="fa-solid fa-paper-plane"></i></span></button>
        <p class="form__note" id="formNote" role="status"></p>
      </form>
    </div>
  </section>

  <section class="map">
    <iframe src="${site.mapEmbed}" title="ONOX Technologies location map" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  </section>`,
};

/* ---------------------------------------------------------
   LEGAL pages (templates – have them reviewed before publishing)
--------------------------------------------------------- */
const legal = (route, title, sections) => ({
  route,
  active: "",
  title,
  description: `${title} for the ${site.name} website.`,
  body: (u) => `
${banner(u, title, [{ label: title }])}
  <section class="section">
    <div class="container legal">
      <p class="legal__updated">Last updated: November 2026</p>
      ${sections.map(([h, p]) => `<h2>${h}</h2>\n      <p>${p}</p>`).join("\n      ")}
      <h2>Contact</h2>
      <p>Questions about this page can be sent to <a href="mailto:${site.email}">${site.email}</a> or ${site.address}.</p>
    </div>
  </section>`,
});

const privacy = legal("privacy-policy/", "Privacy Policy", [
  ["Introduction", `${site.name} ("we", "us") respects your privacy. This policy explains what information we collect through this website and how we use it.`],
  ["Information We Collect", "When you contact us or request a quote, we collect the details you provide, such as your name, email address, phone number, organization and message. We may also collect basic, anonymous website usage data."],
  ["How We Use Your Information", "We use your information only to respond to your enquiries, provide quotations and services, and send updates you have agreed to receive. We do not sell your personal information."],
  ["Sharing of Information", "We may share information with trusted service providers (such as email or hosting providers) only as needed to operate our website and services, or where required by law."],
  ["Data Security", "We take reasonable technical and organizational measures to protect your information from loss, misuse and unauthorized access."],
  ["Your Rights", "You may ask us to access, correct or delete the personal information we hold about you by contacting us using the details below."],
]);

const terms = legal("terms/", "Terms of Service", [
  ["Use of This Website", `By using this website you agree to these terms. The content is provided for general information about ${site.name} and its services.`],
  ["Services &amp; Quotations", "Information on this website does not form a contract. All services are provided under a written quotation or service agreement, which sets out scope, pricing and responsibilities."],
  ["Intellectual Property", `All content on this website, including text, logos and design, belongs to ${site.name} unless stated otherwise and may not be copied without permission.`],
  ["Limitation of Liability", "We work to keep this website accurate and available, but we do not guarantee that it will always be error-free or uninterrupted."],
  ["Governing Law", "These terms are governed by the laws of the Republic of South Sudan."],
]);

/* ---------------------------------------------------------
   404
--------------------------------------------------------- */
const notFound = {
  route: "",
  file: "404.html",
  absolute: true,
  active: "",
  title: "Page Not Found",
  description: "The page you are looking for could not be found.",
  body: (u) => `
  <section class="section notfound">
    <div class="container">
      <span class="notfound__code">404</span>
      <h1>Page not found</h1>
      <p>Sorry, the page you're looking for doesn't exist or has been moved.</p>
      <div class="hero__actions">
        <a href="${u("")}" class="btn btn--primary">Back to Home <span class="btn__icon"><i class="fa-solid fa-house"></i></span></a>
        <a href="${u("contact/")}" class="btn btn--dark">Contact Us</a>
      </div>
    </div>
  </section>`,
};

module.exports = [home, about, servicesPage, ...servicePages, industriesPage, howWeWork, careers, faqPage, contact, privacy, terms, notFound];
