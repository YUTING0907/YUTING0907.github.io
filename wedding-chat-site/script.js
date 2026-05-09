const topButton = document.querySelector(".top-button");
const progress = document.querySelector(".scroll-progress");
const counters = [...document.querySelectorAll("[data-count]")];
const revealTargets = [
  ...document.querySelectorAll(".section, .band, .chat-replay, .closing"),
];
const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxClose = document.querySelector(".lightbox-close");

function updateTopButton() {
  if (window.scrollY > 520) {
    topButton.classList.add("is-visible");
  } else {
    topButton.classList.remove("is-visible");
  }
}

function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
  progress.style.width = `${pct}%`;
}

function formatNumber(value) {
  return Math.round(value).toLocaleString("en-US");
}

function animateCounter(element) {
  const target = Number(element.dataset.count);
  const duration = 1300;
  const start = performance.now();

  function tick(now) {
    const elapsed = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - elapsed, 3);
    element.textContent = formatNumber(target * eased);
    if (elapsed < 1) {
      requestAnimationFrame(tick);
    } else {
      element.textContent = formatNumber(target);
    }
  }

  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.dataset.done) {
        entry.target.dataset.done = "true";
        animateCounter(entry.target);
      }
    });
  },
  { threshold: 0.6 },
);

counters.forEach((counter) => counterObserver.observe(counter));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.12 },
);

revealTargets.forEach((target) => {
  target.classList.add("reveal");
  revealObserver.observe(target);
});

document.querySelectorAll("figure img").forEach((image) => {
  image.addEventListener("click", () => {
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.classList.add("is-open");
    document.body.classList.add("is-locked");
  });
});

function closeLightbox() {
  lightbox.classList.remove("is-open");
  document.body.classList.remove("is-locked");
  lightboxImage.removeAttribute("src");
}

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

lightboxClose.addEventListener("click", closeLightbox);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
    closeLightbox();
  }
});

topButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener(
  "scroll",
  () => {
    updateTopButton();
    updateProgress();
  },
  { passive: true },
);
updateTopButton();
updateProgress();
