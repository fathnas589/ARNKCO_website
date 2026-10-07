document.getElementById("year").textContent = new Date().getFullYear();

const menu = document.getElementById("menu");
const nav = document.getElementById("nav");

menu.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("brief").addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(event.target);
  const output = document.getElementById("output");

  output.value = [
    "ARNKCO project enquiry",
    `Company: ${data.get("company")}`,
    `Contact: ${data.get("contact")}`,
    `Email: ${data.get("email")}`,
    `Service: ${data.get("service")}`,
    `Location: ${data.get("location")}`,
    `Team size: ${data.get("team") || "To be discussed"}`,
    `Requirements: ${data.get("details")}`
  ].join("\n");

  const whatsapp = document.getElementById("send-whatsapp");

  if (whatsapp) {
    whatsapp.href =
      "https://wa.me/971508811542?text=" +
      encodeURIComponent(output.value);
  }

  document.getElementById("result").hidden = false;
  document.getElementById("status").textContent =
    "Brief prepared. No enquiry has been sent.";
});

document.getElementById("copy").addEventListener("click", async () => {
  const output = document.getElementById("output");
  const status = document.getElementById("status");

  try {
    await navigator.clipboard.writeText(output.value);
    status.textContent =
      "Copied. Share this brief with your ARNKCO contact.";
  } catch {
    output.focus();
    output.select();
    status.textContent = "Select and copy the brief manually.";
  }
});
// Open gallery photos with their captions.
(() => {
  const viewer = document.getElementById('photo-viewer');
  if (!viewer) return;

  const fullImage = document.getElementById('photo-full');
  const title = document.getElementById('photo-title');
  const caption = document.getElementById('photo-caption');
  const closeButton = viewer.querySelector('.photo-close');
  let lastPhotoLink;

  document.querySelectorAll('.gallery-card > a').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();

      const card = link.closest('.gallery-card');
      const thumbnail = link.querySelector('img');

      fullImage.src = link.href;
      fullImage.alt = thumbnail.alt;
      title.textContent = card.querySelector('h3').textContent;
      caption.textContent = card.querySelector('figcaption p').textContent;

      lastPhotoLink = link;
      viewer.showModal();
    });
  });

  closeButton.addEventListener('click', () => viewer.close());

  // Clicking outside the popup closes it.
  viewer.addEventListener('click', event => {
    if (event.target !== viewer) return;

    const bounds = viewer.getBoundingClientRect();
    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    ) {
      viewer.close();
    }
  });

  viewer.addEventListener('close', () => {
    fullImage.removeAttribute('src');
    lastPhotoLink?.focus();
  });
})();