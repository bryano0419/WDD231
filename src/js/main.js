import { getParkData, parkInfoLinks } from "./parkService.mjs"; // ADDED parkInfoLinks
import setHeaderFooter from "./setHeaderFooter.mjs"; // NEW Import for default export
import { mediaCardTemplate } from "./templates.mjs"; // NEW Import for template

const parkData = getParkData();

// setParkIntro remains in main.js
function setParkIntro(data) {
  const introEl = document.querySelector(".intro");
  introEl.innerHTML = `<h1>${parkData.fullName}</h1>
  <p>${parkData.description}</p>`;
}

// setParkInfoLinks remains in main.js, but uses the imported template and the better method
function setParkInfoLinks(data) {
  const infoEl = document.querySelector(".info");
  // we have multiple links to build...so we map to transform the array of objects into an array of HTML strings.
  const html = data.map(mediaCardTemplate);
  // join the array of strings into one string and insert it into the section
  infoEl.insertAdjacentHTML("afterbegin", html.join("")); // Refactored to use insertAdjacentHTML
}

// ---------- RUN FUNCTIONS ----------

setHeaderFooter(parkData); // Uses the new default exported function
setParkIntro(parkData);
setParkInfoLinks(parkInfoLinks); // Uses the new imported data
