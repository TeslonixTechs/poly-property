const opportunities = [
  {
    id: 'luxury-home',
    title: 'Luxury homes',
    type: 'Luxury home',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85',
    alt: 'Contemporary residence with a garden and clean architectural lines',
    transaction: ['Buy', 'Rent'],
    description: 'A considered search for distinctive homes in Ibadan. Ask our team about verified options suited to your preferred area, style and budget.'
  },
  {
    id: 'family-home',
    title: 'Family homes',
    type: 'House',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85',
    alt: 'Light-filled living room in a contemporary home',
    transaction: ['Buy', 'Rent'],
    description: 'Explore a home search shaped around the space, location and practical details that matter to your household.'
  },
  {
    id: 'land-plots',
    title: 'Land & plots',
    type: 'Land or plot',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=85',
    alt: 'Open landscape beneath a wide sky',
    transaction: ['Buy'],
    description: 'Discuss land opportunities with our team. Location, title information, asking price and availability are confirmed for each specific property.'
  },
  {
    id: 'investment',
    title: 'Investment property',
    type: 'Investment property',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=85',
    alt: 'Carefully finished interior in a modern property',
    transaction: ['Buy', 'Rent'],
    description: 'Tell us about your investment goals and we can help identify property opportunities in Ibadan for further consideration.'
  },
  {
    id: 'commercial',
    title: 'Commercial property',
    type: 'Commercial property',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85',
    alt: 'Modern, open commercial workspace',
    transaction: ['Buy', 'Rent'],
    description: 'Share your business requirements and our team can discuss relevant commercial property opportunities and arrange next steps.'
  }
];

const grid = document.querySelector('#property-grid');
const searchForm = document.querySelector('#property-search');
const searchNote = document.querySelector('#search-note');
const enquiryForm = document.querySelector('#enquiry-form');
const formNote = document.querySelector('#form-note');
const phoneNumber = '2349157754404';

function renderCards(items) {
  if (!grid) return;
  grid.innerHTML = items.map((property) => `
    <article class="property-card">
      <a class="property-card-image" href="?property=${encodeURIComponent(property.id)}" aria-label="View ${property.title} details">
        <img src="${property.image}" alt="${property.alt}" loading="lazy">
        <span>OPPORTUNITY BRIEF</span>
      </a>
      <div class="property-card-copy">
        <div class="property-card-title"><h3>${property.title}</h3><span>${property.type.toUpperCase()}</span></div>
        <p class="property-location">Ibadan, Oyo State · Specific area confirmed with agent</p>
        <p class="property-price">Price on request</p>
        <div class="property-specs"><span>Bedrooms: confirm per property</span><span>Bathrooms: confirm per property</span></div>
        <a class="property-card-link" href="?property=${encodeURIComponent(property.id)}">View property brief <span aria-hidden="true">↗</span></a>
      </div>
    </article>`).join('');
}

function openWhatsApp(message) {
  window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
}

function detailMarkup(property) {
  const galleryImages = [property.image,
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=85'];
  const message = `Hello Polyproperty, I would like information about ${property.title.toLowerCase()} opportunities in Ibadan.`;
  return `
    <div class="detail-gallery" aria-label="Representative property photography">
      ${galleryImages.map((image, index) => `<img src="${image}" alt="Representative ${property.title.toLowerCase()} photography, image ${index + 1}">`).join('')}
    </div>
    <section class="detail-content">
      <div class="detail-main">
        <p class="eyebrow">${property.type.toUpperCase()} · OPPORTUNITY BRIEF</p>
        <h1>${property.title}</h1>
        <p class="detail-place">Ibadan, Oyo State · Specific location shared after confirmation</p>
        <p class="detail-description">${property.description} The images on this page are representative photography and do not depict a confirmed listing. We share a property's verified address, asking price, specifications and availability directly before arranging an inspection.</p>
        <h2>Property information</h2>
        <div class="detail-features">
          <div><span>Asking price</span>Confirmed with agent</div>
          <div><span>Location</span>Confirmed per property</div>
          <div><span>Bedrooms</span>Confirmed per property</div>
          <div><span>Bathrooms</span>Confirmed per property</div>
          <div><span>Property type</span>${property.type}</div>
          <div><span>Availability</span>Ask our team</div>
        </div>
        <h2>Arrange an inspection</h2>
        <p class="detail-description">Speak with an agent to discuss current verified options, request property information and arrange an inspection when you are ready.</p>
      </div>
      <aside class="detail-aside">
        <span>POLYPROPERTY · IBADAN</span>
        <h2>Details on request</h2>
        <p>Ask us for verified current options, full property information and inspection availability.</p>
        <a class="button button-dark" href="https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}" target="_blank" rel="noreferrer">Enquire on WhatsApp <span aria-hidden="true">↗</span></a>
        <a class="whatsapp-link" href="index.html#contact">Send a property brief →</a>
      </aside>
    </section>`;
}

renderCards(opportunities);

const requestedProperty = new URLSearchParams(window.location.search).get('property');
if (requestedProperty) {
  const property = opportunities.find((item) => item.id === requestedProperty);
  if (property) {
    document.querySelector('#home-view').hidden = true;
    document.querySelector('#detail-view').hidden = false;
    document.querySelector('#property-detail').innerHTML = detailMarkup(property);
    document.querySelectorAll('.primary-navigation a[href^="#"]').forEach((link) => {
      link.href = `index.html${link.getAttribute('href')}`;
    });
    document.title = `${property.title} | Polyproperty`;
  }
}

searchForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(searchForm);
  const request = Object.fromEntries(formData.entries());
  const requestedType = request.type;
  const matches = opportunities.filter((property) => {
    const matchesType = !requestedType || property.type === requestedType;
    const matchesTransaction = !request.transaction || property.transaction.includes(request.transaction);
    return matchesType && matchesTransaction;
  });

  renderCards(matches);
  const brief = [request.transaction, requestedType, request.location, request.budget, request.bedrooms].filter(Boolean).join(' · ');
  searchNote.textContent = matches.length
    ? `${matches.length} relevant ${matches.length === 1 ? 'property brief' : 'property briefs'} shown. ${brief ? `Your search: ${brief}. ` : ''}Specific listings and details are confirmed with our team.`
    : 'No briefs match those filters yet. Send us your requirements and our team can help with a tailored search.';
  document.querySelector('#opportunities').scrollIntoView({ behavior: 'smooth' });
  if (brief) {
    document.querySelector('#interest').value = [request.type, request.location].filter(Boolean).join(' in ') || 'Property search';
    document.querySelector('#enquiry-budget').value = request.budget;
    document.querySelector('#message').value = [request.transaction && `Looking to ${request.transaction.toLowerCase()}`, request.bedrooms, request.location].filter(Boolean).join('. ');
  }
});

document.querySelectorAll('[data-category]').forEach((link) => {
  link.addEventListener('click', () => {
    const category = link.dataset.category;
    const typeSelect = searchForm.elements.type;
    typeSelect.value = category;
    renderCards(opportunities.filter((property) => property.type === category));
    searchNote.textContent = `${category} selected. Specific listings and verified details are confirmed with our team.`;
  });
});

enquiryForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!enquiryForm.reportValidity()) return;
  const details = Object.fromEntries(new FormData(enquiryForm).entries());
  const message = [
    'Hello Polyproperty, I would like to request property information.',
    `Name: ${details.name}`,
    `Phone / WhatsApp: ${details.phone}`,
    `Property interested in: ${details.interest}`,
    details.budget && `Budget: ${details.budget}`,
    details.message && `Message: ${details.message}`
  ].filter(Boolean).join('\n');
  openWhatsApp(message);
  formNote.textContent = 'Your message is ready in WhatsApp. Review it there and press send to reach our team.';
});

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-navigation');
menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navigation.classList.toggle('is-open', !isOpen);
  document.body.classList.toggle('nav-open', !isOpen);
});
navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('is-open');
  document.body.classList.remove('nav-open');
}));

document.querySelector('#year').textContent = new Date().getFullYear();