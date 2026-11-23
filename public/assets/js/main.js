// ONOX Technologies – site interactions
document.addEventListener("DOMContentLoaded", () => {
  const $ = (s) => document.querySelector(s);
  const burger = $("#burger");
  const nav = $("#nav");
  const toTop = $("#toTop");

  // Footer year
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  // Mobile menu
  if (burger && nav) {
    burger.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open);
    });
  }

  // Services dropdown toggle (mobile)
  document.querySelectorAll(".nav__toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const dd = btn.nextElementSibling;
      const open = dd.classList.toggle("open");
      btn.setAttribute("aria-expanded", open);
    });
  });

  // Back to top
  if (toTop) {
    const onScroll = () => toTop.classList.toggle("show", window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    toTop.addEventListener("click", () => window.scrollTo({ top: 0 }));
  }

  // Reveal on scroll
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            revealObs.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    reveals.forEach((el) => revealObs.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
  }

  // Animated counters
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    const countObs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target;
          const target = +el.dataset.count;
          const suffix = el.dataset.suffix || "";
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min((now - start) / 1600, 1);
            el.textContent = Math.floor(target * (1 - Math.pow(1 - p, 3))) + suffix;
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          countObs.unobserve(el);
        }),
      { threshold: 0.5 }
    );
    counters.forEach((el) => countObs.observe(el));
  }

  // Services slider (home page)
  const track = $("#servicesTrack");
  const prev = $("#prevBtn");
  const next = $("#nextBtn");
  if (track && prev && next) {
    const step = () => track.querySelector(".service-card").offsetWidth + 28;
    prev.addEventListener("click", () => track.scrollBy({ left: -step() }));
    next.addEventListener("click", () => track.scrollBy({ left: step() }));
    track.addEventListener("scroll", () => {
      prev.classList.toggle("active", track.scrollLeft > 10);
      next.classList.toggle("active", track.scrollLeft + track.clientWidth < track.scrollWidth - 10);
    });
  }

  // Portfolio filter (Websites We've Built)
  const filterBtns = document.querySelectorAll(".filters__btn");
  const clients = document.querySelectorAll(".client");
  filterBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      const f = btn.dataset.filter;
      filterBtns.forEach((b) => b.classList.toggle("is-active", b === btn));
      clients.forEach((c) => (c.hidden = f !== "all" && c.dataset.type !== f));
    })
  );

  // Client logo tiles: tap to show details on touch screens (hover handles desktop)
  clients.forEach((tile) =>
    tile.addEventListener("click", (e) => {
      if (e.target.closest("a")) return; // let "Visit website" work normally
      const open = !tile.classList.contains("is-open");
      clients.forEach((t) => t.classList.remove("is-open"));
      tile.classList.toggle("is-open", open);
    })
  );

  // Contact form (front-end only – connect to a form service or backend to receive emails)
  const form = $("#contactForm");
  const note = $("#formNote");
  if (form && note) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.elements["name"].value.trim().split(" ")[0];
      note.textContent = `Thank you ${name}! Your request has been received. Our team will contact you shortly.`;
      form.reset();
    });
  }
});
