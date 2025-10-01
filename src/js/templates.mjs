// Template for the hero banner info
export function parkInfoTemplate(data) {
  return `
    <a href="${data.url}" class="hero-banner__title">${data.fullName}</a>
    <p class="hero-banner__subtitle">
      <span>${data.designation}</span>
      <span>${data.states}</span>
    </p>
  `;
}

// Template for media cards (Current Conditions, Fees, Visitor Centers)
export function mediaCardTemplate(info) {
  return `
    <div class="media-card">
      <a href="${info.link}">
        <img src="${info.image}" alt="${info.name}" class="media-card__img">
        <h3 class="media-card__title">${info.name}</h3>
      </a>
      <p>${info.description}</p>
    </div>
  `;
}

// Get mailing address (Helper function)
export function getMailingAddress(addresses) {
  return addresses.find((address) => address.type === "Mailing");
}

// Get voice phone number (Helper function)
export function getVoicePhone(numbers) {
  return numbers.find((number) => number.type === "Voice").phoneNumber;
}

// Footer template
export function footerTemplate(info) {
  const mailing = getMailingAddress(info.addresses);
  const voice = getVoicePhone(info.contacts.phoneNumbers);

  return `
    <section class="contact">
      <h3>Contact Info</h3>
      <h4>Mailing Address:</h4>
      <div>
        <p>${mailing.line1}</p>
        <p>${mailing.city}, ${mailing.stateCode} ${mailing.postalCode}</p>
      </div>
      <h4>Phone:</h4>
      <p>${voice}</p>
    </section>
  `;
}
