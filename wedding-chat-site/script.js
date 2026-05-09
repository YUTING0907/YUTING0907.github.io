const topButton = document.querySelector(".top-button");

function updateTopButton() {
  if (window.scrollY > 520) {
    topButton.classList.add("is-visible");
  } else {
    topButton.classList.remove("is-visible");
  }
}

topButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", updateTopButton, { passive: true });
updateTopButton();
