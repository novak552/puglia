(function(){
const data=window.TRIP_DATA||[],map=L.map('map');
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; OpenStreetMap contributors'}).addTo(map);
const colors=['#2563eb','#dc2626','#16a34a','#9333ea','#ea580c','#0891b2','#be123c','#4f46e5','#65a30d','#475569'],layers=[],bounds=[];
data.forEach((day,i)=>{const g=L.layerGroup().addTo(map),pts=day.stops.map(s=>[s.lat,s.lon]);pts.forEach(p=>bounds.push(p));L.polyline(pts,{color:colors[i],weight:4,opacity:.82,dashArray:day.day===6?'8 7':null}).addTo(g);
day.stops.forEach((s,j)=>{const ic=L.divIcon({className:'',html:`<div class="stop-icon ${s.type}">${day.day}</div>`,iconSize:[28,28],iconAnchor:[14,14]});L.marker([s.lat,s.lon],{icon:ic}).bindPopup(`<strong>${s.name}</strong><br>Den ${day.day} • ${day.date}<br><a href="${day.mapsUrl}" target="_blank" rel="noopener">Google Maps ↗</a>`).addTo(g)});layers.push(g)});
map.fitBounds(L.latLngBounds(bounds),{padding:[25,25]});
const f=document.getElementById('dayFilters'),all=document.createElement('button');all.textContent='Vše';all.className='active';f.appendChild(all);const bs=[];
data.forEach((d,i)=>{const b=document.createElement('button');b.textContent=`Den ${d.day}`;b.className='active';f.appendChild(b);bs.push(b);b.onclick=()=>{map.hasLayer(layers[i])?map.removeLayer(layers[i]):layers[i].addTo(map);b.classList.toggle('active');all.classList.toggle('active',bs.every(x=>x.classList.contains('active')))}});
all.onclick=()=>{const show=!bs.every(x=>x.classList.contains('active'));layers.forEach((l,i)=>{if(show&&!map.hasLayer(l))l.addTo(map);if(!show&&map.hasLayer(l))map.removeLayer(l);bs[i].classList.toggle('active',show)});all.classList.toggle('active',show)};
})();