// Change import: parkInfoLinks -> getInfoLinks
import { getParkData, getInfoLinks } from "./parkService.mjs"; 
import setHeaderFooter from "./setHeaderFooter.mjs";
import { mediaCardTemplate } from "./templates.mjs";

// setParkIntro remains in main.js
function setParkIntro(data) {
  const introEl = document.querySelector(".intro");
  // Ensure we use the parameter 'data'
  introEl.innerHTML = `<h1>${data.fullName}</h1>
  <p>${data.description}</p>`;
}

// setParkInfoLinks remains in main.js
function setParkInfoLinks(data) {
  const infoEl = document.querySelector(".info");
  const html = data.map(mediaCardTemplate);
  infoEl.insertAdjacentHTML("afterbegin", html.join(""));
}

// ---------- RUN FUNCTIONS (Updated) ----------

async function init() {
  // 1. Fetch the park data (change 'yell' to 'glac' if you updated getParkData)
  const parkData = await getParkData('glac'); 

  // 2. Generate the dynamic links by passing the API's image array
  const links = getInfoLinks(parkData.images); 

  // 3. Use the fetched data
  setHeaderFooter(parkData);
  setParkIntro(parkData);
  
  // 4. Use the dynamically updated links
  setParkInfoLinks(links); 
}

init();