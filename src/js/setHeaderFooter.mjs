// setHeaderFooter.mjs
import { parkInfoTemplate, footerTemplate } from "./templates.mjs";

// Set header info
function setHeaderInfo(data) {
  // Disclaimer
  const disclaimer = document.querySelector(".disclaimer > a");
  disclaimer.href = data.url;
  disclaimer.innerHTML = data.fullName;

  // Update <title>
  document.querySelector("head > title").textContent = data.fullName;

  // Banner image
  const heroImg = document.querySelector(".hero-banner > img");
  heroImg.src = data.images[0].url;
  heroImg.alt = data.images[0].altText || data.fullName;

  // Banner content
  document.querySelector(".hero-banner__content").innerHTML =
    parkInfoTemplate(data);
}

// Set footer
function setFooter(data) {
  const footerEl = document.querySelector("#park-footer");
  footerEl.innerHTML = footerTemplate(data);
}

// Combine and export as default
export default function setHeaderFooter(data) {
  setHeaderInfo(data);
  setFooter(data);
}