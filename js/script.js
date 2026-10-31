document.addEventListener("DOMContentLoaded", () => {
  // Menu mobile
  const toggle = document.getElementById("menuToggle");
  const links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const opened = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(opened));
      toggle.setAttribute("aria-label", opened ? "Fermer le menu" : "Ouvrir le menu");
      toggle.textContent = opened ? "×" : "☰";
    });
    links.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Ouvrir le menu");
      toggle.textContent = "☰";
    }));
    document.addEventListener("click", event => {
      if (!links.contains(event.target) && !toggle.contains(event.target)) {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "☰";
      }
    });
  }

  // Apparition progressive des éléments
  const revealTargets = document.querySelectorAll(
    ".section-heading, .about-aside, .about-content, .dept-card, .product-card, .service, .innovation-art, .innovation-content, .cta-panel, .contact-info, .contact-form"
  );
  revealTargets.forEach(element => element.classList.add("reveal"));
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(element => revealObserver.observe(element));
  } else {
    revealTargets.forEach(element => element.classList.add("visible"));
  }

  // Lien actif selon la section visible
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.toggle(
            "active", link.getAttribute("href") === `#${entry.target.id}`
          ));
        }
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    sections.forEach(section => sectionObserver.observe(section));
  }

  // Bouton retour en haut
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    const updateBackToTop = () => backToTop.classList.toggle("show", window.scrollY > 450);
    window.addEventListener("scroll", updateBackToTop, { passive: true });
    updateBackToTop();
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  // Année automatique
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Validation du formulaire (démo locale uniquement)
  const form = document.getElementById("contactForm");
  const success = document.getElementById("formSuccess");
  if (form) form.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    if (success) {
      success.style.display = "block";
      success.textContent = "Merci ! Le formulaire est validé. Il reste à connecter un service d'envoi pour transmettre votre message.";
      success.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    form.reset();
  });
});
