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