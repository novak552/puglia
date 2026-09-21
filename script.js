(() => {
  'use strict';
  const data = window.TRIP_DATA || [];
  const container = document.getElementById('map');
  if (!window.L || !data.length) return;
  container.replaceChildren();
  const map = L.map(container, {scrollWheelZoom: false});
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  const colors = ['#2563eb','#dc2626','#16803a','#9333ea','#c64c05','#078394','#be123c','#4f46e5','#568510','#475569'];
  const layers = [], bounds = [], buttons = [];
  const filters = document.getElementById('dayFilters');
  const all = document.createElement('button');
  all.type = 'button'; all.textContent = 'Vše'; all.className = 'active';
  all.setAttribute('aria-pressed', 'true'); filters.append(all);
  let number = 0;
  const escape = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  data.forEach((day, i) => {
    const layer = L.layerGroup().addTo(map);
    const pts = day.stops.map(s => [s.lat, s.lon]);
    bounds.push(...pts);
    L.polyline(pts, {color: colors[i], weight: 4, opacity: .8}).addTo(layer);
    // Each day has its own start marker, so filtering never hides its origin.
    const seen = new Set();
    day.stops.forEach(s => {
      if (seen.has(s.name)) return;
      seen.add(s.name); number++;
      const icon = L.divIcon({className: '', html: `<div class="stop-icon ${escape(s.type)}" style="border-color:${colors[i]}">${number}</div>`, iconSize:[28,28],iconAnchor:[14,14]});
      const url = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(s.query || s.name + ', Italy');
      const info = s.type === 'hotel' ? `<br>${escape(s.dates)} · ${escape(s.breakfast)}` : '';
      const note = s.note ? `<br><small>${escape(s.note)}</small>` : '';
      L.marker([s.lat,s.lon], {icon, title:s.name}).bindPopup(`<strong>${number}. ${escape(s.name)}</strong><br>${escape(day.date)}${info}${note}<br><a href="${escape(url)}" target="_blank" rel="noopener">Místo v Google Maps ↗</a><br><a href="#den-${day.day}">Denní plán</a>`).addTo(layer);
    });
    layers.push(layer);
    const button = document.createElement('button');
    button.type = 'button'; button.textContent = day.date;
    button.className = 'active'; button.style.setProperty('--day-color',colors[i]);
    button.setAttribute('aria-pressed','true'); filters.append(button); buttons.push(button);
    button.addEventListener('click', () => {
      const visible = !map.hasLayer(layer);
      if (visible) layer.addTo(map); else map.removeLayer(layer);
      button.classList.toggle('active',visible); button.setAttribute('aria-pressed',String(visible));
      const every = layers.every(l => map.hasLayer(l));
      all.classList.toggle('active',every); all.setAttribute('aria-pressed',String(every));
    });
  });
  map.fitBounds(bounds, {padding:[25,25]});
  all.addEventListener('click', () => {
    const show = !layers.every(l => map.hasLayer(l));
    layers.forEach((layer,i) => {
      if (show) layer.addTo(map); else map.removeLayer(layer);
      buttons[i].classList.toggle('active',show); buttons[i].setAttribute('aria-pressed',String(show));
    });
    all.classList.toggle('active',show); all.setAttribute('aria-pressed',String(show));
    if (show) map.fitBounds(bounds,{padding:[25,25]});
  });
})();
