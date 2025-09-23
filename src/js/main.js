import { getParkData } from "./parkService.mjs";

const parkData = getParkData();

document.title = parkData.fullName;
const heroImage = document.querySelector('.hero-banner img');
heroImage.src = parkData.images[0].url;
heroImage.alt = parkData.images[0].altText;
const heroInfoSection = document.querySelector('.hero-banner__text');
heroInfoSection.innerHTML = parkInfoTemplate({
    name: parkData.fullName,
    designation: parkData.designation,
    states: parkData.states
});