// Mock data for PG listings
const listings = [
  {
    id:1,
    name:"Shanti Girls PG",
    city:"Jaipur",
    locality:"Malviya Nagar",
    rent:6000,
    type:"Female-only",
    rooms:"Single/Double",
    contact:"+91-9000000001",
    desc:"Safe and hygienic girls PG with WiFi, meals included and laundry facility."
  },
  {
    id:2,
    name:"Savera Boys PG",
    city:"Jaipur",
    locality:"C Scheme",
    rent:5500,
    type:"Male-only",
    rooms:"Double",
    contact:"+91-9000000002",
    desc:"Affordable boys PG near Bani Park, 24x7 security and water supply."
  },
  {
    id:3,
    name:"CoLive Hub",
    city:"Delhi",
    locality:"Lajpat Nagar",
    rent:9000,
    type:"Co-living",
    rooms:"Single/Double",
    contact:"+91-9000000003",
    desc:"Modern co-living space with workspace, AC rooms and community events."
  },
  {
    id:4,
    name:"Sakshi PG",
    city:"Jaipur",
    locality:"Mansarovar",
    rent:4500,
    type:"Female-only",
    rooms:"Triple sharing",
    contact:"+91-9000000004",
    desc:"Budget-friendly PG with basic facilities and friendly environment."
  },
  {
    id:5,
    name:"Corporate Stay",
    city:"Bengaluru",
    locality:"Koramangala",
    rent:14000,
    type:"Co-living",
    rooms:"Single",
    contact:"+91-9000000005",
    desc:"Premium PG suitable for corporate employees. Close to offices and cafes."
  }, 
  {
    id:6,
    name:"Urban Nest PG",
    city:"Delhi",
    locality:"Dwarka",
    rent:7000,
    type:"Male-only",
    rooms:"Single/Double",
    contact:"+91-9000000006",
    desc:"Comfortable PG with modern amenities, gym access and power backup."
  }
];

function $(id){ return document.getElementById(id); }

function renderListings(data){
  const container = $('results');
  container.innerHTML = '';
  if(data.length===0){
    container.innerHTML = '<p>No PGs found. Try changing filters.</p>';
    return;
  }
  data.forEach(item=>{
    const card = document.createElement('div');
    card.className='card';
    card.innerHTML = `
      <h3>${item.name}</h3>
      <div class="meta">${item.locality}, ${item.city} • ${item.type}</div>
      <div class="price">₹ ${item.rent}/month</div>
      <div class="meta">Rooms: ${item.rooms}</div>
      <button onclick="openDetail(${item.id})" class="btn">View Details</button>
    `;
    container.appendChild(card);
  });
}

function openDetail(id){
  const item = listings.find(l=>l.id===id);
  const body = $('modal-body');
  body.innerHTML = `
    <h2>${item.name}</h2>
    <p class="meta">${item.locality}, ${item.city} • ${item.type}</p>
    <p><strong>Rent:</strong> ₹ ${item.rent}/month</p>
    <p><strong>Rooms:</strong> ${item.rooms}</p>
    <p><strong>Contact:</strong> ${item.contact}</p>
    <p>${item.desc}</p>
    <p><button class="btn" onclick="bookDemo(${item.id})">Book / Enquire</button></p>
  `;
  $('detail-modal').classList.remove('hidden');
  $('detail-modal').setAttribute('aria-hidden','false');
}

function bookDemo(id){
  alert('This is a frontend prototype. Booking action would call backend API in a full app. (Listing ID:' + id +')');
}

function closeModal(){
  $('detail-modal').classList.add('hidden');
  $('detail-modal').setAttribute('aria-hidden','true');
}

function doSearch(){
  const q = $('search-input').value.trim().toLowerCase();
  const sort = $('sort-by').value;
  let result = listings.filter(l=>{
    return l.city.toLowerCase().includes(q) ||
           l.locality.toLowerCase().includes(q) ||
           l.name.toLowerCase().includes(q);
  });
  if(sort==='low-high') result.sort((a,b)=>a.rent-b.rent);
  if(sort==='high-low') result.sort((a,b)=>b.rent-a.rent);
  renderListings(result);
}

// Quick search
$('qs-btn')?.addEventListener('click', function(){
  const city = $('qs-city').value.trim();
  const budget = parseInt($('qs-budget').value) || 999999;
  const type = $('qs-type').value;
  let result = listings.filter(l=>{
    return (!city || l.city.toLowerCase().includes(city.toLowerCase()))
      && l.rent <= budget
      && (!type || l.type===type);
  });
  renderListings(result);
  location.hash = '#search';
});

// Main search events
$('search-input')?.addEventListener('input', doSearch);
$('sort-by')?.addEventListener('change', doSearch);
$('startSearch')?.addEventListener('click', ()=>{ location.hash='#search' });

// Modal close
$('modal-close')?.addEventListener('click', closeModal);
$('detail-modal')?.addEventListener('click', function(e){
  if(e.target.id==='detail-modal') closeModal();
});

// Contact form (frontend-only)
$('contact-form')?.addEventListener('submit', function(e){
  e.preventDefault();
  alert('Thank you! This is a demo. Message would be sent to backend in a full application.');
  $('contact-form').reset();
});

// On load render all
document.addEventListener('DOMContentLoaded', function(){
  renderListings(listings);
});
