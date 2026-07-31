(() => {
  const skillData = {
    html: {
      title: "HTML",
      body:
        "I structure pages with semantic tags so content is clear for people and screen readers. This resume is built with sections, headings, and accessible navigation.",
    },
    css: {
      title: "CSS",
      body:
        "I style layouts with modern CSS—flexbox, grid, custom properties, and responsive design. The black-and-gold theme on this page is pure CSS.",
    },
    js: {
      title: "JavaScript",
      body:
        "I use JavaScript for interactivity: navigation, skill panels, scroll effects, and the art lightbox. I am still learning and practising every week.",
    },
    python: {
      title: "Python",
      body:
        "I write Python for Computer Science exam work—problem solving, logic, and small programs. It strengthens how I think about algorithms and clean code.",
    },
  };

  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");
  const navLinks = document.querySelectorAll(".site-nav a");
  const sections = document.querySelectorAll("main section[id]");
  const skillButtons = document.querySelectorAll(".skill-btn");
  const skillPanel = document.getElementById("skill-panel");
  const skillTitle = skillPanel?.querySelector("[data-skill-title]");
  const skillBody = skillPanel?.querySelector("[data-skill-body]");
  const skillsSection = document.getElementById("skills");
  const revealEls = document.querySelectorAll("[data-reveal]");
  const artThumbs = document.querySelectorAll(".art-thumb");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox?.querySelector("img");
  const lightboxClose = lightbox?.querySelector(".lightbox-close");
  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* Sticky header border on scroll */
  const onScrollHeader = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  /* Mobile nav */
  const closeNav = () => {
    if (!siteNav || !navToggle) return;
    siteNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  };

  const openNav = () => {
    if (!siteNav || !navToggle) return;
    siteNav.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close menu");
  };

  navToggle?.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    if (expanded) closeNav();
    else openNav();
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => closeNav());
  });

  /* Active section highlight */
  const setActiveLink = () => {
    const offset = window.scrollY + 120;
    let current = "";

    sections.forEach((section) => {
      if (section.offsetTop <= offset) {
        current = section.id;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      const match = href === `#${current}`;
      link.classList.toggle("is-active", match);
    });
  };

  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();

  /* Skill bars — set CSS custom property from data-level */
  document.querySelectorAll(".skill-bar").forEach((bar) => {
    const level = Number(bar.getAttribute("data-level") || "0");
    bar.style.setProperty("--level", String(level));
    const fill = bar.querySelector(".skill-bar-fill");
    if (fill) fill.style.setProperty("--level", String(level));
  });

  /* Fix: width uses --level on .skill-bar-fill via parent — apply on fill */
  document.querySelectorAll(".skill-bar").forEach((bar) => {
    const level = Number(bar.getAttribute("data-level") || "0");
    const fill = bar.querySelector(".skill-bar-fill");
    if (fill) {
      fill.dataset.targetWidth = String(level);
    }
  });

  const activateSkill = (key) => {
    const data = skillData[key];
    if (!data || !skillTitle || !skillBody || !skillPanel) return;

    skillButtons.forEach((btn) => {
      const active = btn.dataset.skill === key;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });

    skillTitle.textContent = data.title;
    skillBody.textContent = data.body;
    skillPanel.setAttribute("aria-labelledby", `tab-${key}`);
  };

  skillButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      activateSkill(btn.dataset.skill);
    });
  });

  /* Scroll reveal + skill bars */
  const prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
    skillsSection?.classList.add("bars-ready");
    document.querySelectorAll(".skill-bar-fill").forEach((fill) => {
      fill.style.width = `${fill.dataset.targetWidth || 0}%`;
    });
  } else if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach((el) => revealObserver.observe(el));

    if (skillsSection) {
      const skillsObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              skillsSection.classList.add("bars-ready");
              document.querySelectorAll(".skill-bar-fill").forEach((fill) => {
                fill.style.width = `${fill.dataset.targetWidth || 0}%`;
              });
              skillsObserver.unobserve(skillsSection);
            }
          });
        },
        { threshold: 0.25 }
      );
      skillsObserver.observe(skillsSection);
    }
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
    skillsSection?.classList.add("bars-ready");
    document.querySelectorAll(".skill-bar-fill").forEach((fill) => {
      fill.style.width = `${fill.dataset.targetWidth || 0}%`;
    });
  }

  /* Lightbox */
  const openLightbox = (src, alt) => {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "Enlarged artwork";
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    lightboxClose?.focus();
  };

  const closeLightbox = () => {
    if (!lightbox || !lightboxImg) return;
    lightbox.hidden = true;
    lightboxImg.src = "";
    document.body.style.overflow = "";
  };

  artThumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const src = thumb.getAttribute("data-full");
      const img = thumb.querySelector("img");
      openLightbox(src, img?.alt);
    });
  });

  lightboxClose?.addEventListener("click", closeLightbox);

  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
      closeNav();
    }
  });
})();
