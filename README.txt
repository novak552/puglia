APULIE + MATERA 2026 — aktualizace 21. 9. 2026

Nahrajte obsah ZIPu přímo do kořenové složky webu puglia.inovak.cz.
index.html musí ležet přímo v kořeni, nikoli uvnitř další složky.
Nahraďte všechny dodané soubory společně, aby se obsah a mapa shodovaly.
Balíček nevyžaduje sestavení, databázi ani API klíč.
CNAME obsahuje puglia.inovak.cz pro stávající GitHub Pages.
Samotná příprava balíčku web nepublikuje ani nemění DNS.

SOUBORY
index.html — kompletní statický přehled, denní karty a ubytování
styles.css — původní vzhled doplněný o tabulky, tisk a mobilní úpravy
trip-data.js — aktuální zastávky, ubytování a denní trasy pro mapu
script.js — Leaflet mapa a přepínání dní
favicon.svg — ikona původního webu
itinerar.md — samostatný český itinerář s klikacími odkazy
CNAME — vlastní doména
README.txt — tento návod

Text itineráře je dostupný i bez JavaScriptu. Mapa potřebuje připojení:
Leaflet 1.9.4 se načítá z unpkg.com, podklad z OpenStreetMap.
Čáry jsou přehledové spojnice, ne silniční trasy. Orientační polohy
některých ubytování jsou označené v detailu markeru. Pro příjezd použijte
Google Maps odkazy podle názvu ubytování a potvrzení rezervace.
Delší denní trasy jsou rozdělené do návazných částí s nejvýše třemi
mezizastávkami pro mobilní Google Maps. Pěší úseky na pláže nejsou jízdou.

Původní soubory převzaty z veřejného novak552/puglia (větev main).
Potvrzené rezervace a snídaně vycházejí ze zadání. Časový plán je návrh,
nikoli ověřený provozní rozpis. Zdroje poloh a přístupů jsou na webu
v části Podklady a praktické poznámky a v itinerar.md.
