import fs from 'fs';
import path from 'path';

const attractionsDir = path.join(process.cwd(), 'public', 'images', 'attractions');

if (!fs.existsSync(attractionsDir)) {
  fs.mkdirSync(attractionsDir, { recursive: true });
}

// 1. Beaches SVG
const beachesSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fdba74" />
      <stop offset="40%" stop-color="#f97316" />
      <stop offset="80%" stop-color="#ea580c" />
      <stop offset="100%" stop-color="#c2410c" />
    </linearGradient>
    <linearGradient id="ocean" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#06b6d4" />
      <stop offset="50%" stop-color="#0891b2" />
      <stop offset="100%" stop-color="#0e7490" />
    </linearGradient>
    <linearGradient id="sand" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="100%" stop-color="#fde047" />
    </linearGradient>
  </defs>

  <!-- Sky -->
  <rect width="800" height="350" fill="url(#sky)" />
  
  <!-- Glowing Sun -->
  <circle cx="500" cy="220" r="60" fill="#fff" opacity="0.9" />
  <circle cx="500" cy="220" r="90" fill="#fef08a" opacity="0.4" />

  <!-- Ocean Waves -->
  <path d="M 0 320 Q 200 300, 400 325 T 800 310 L 800 440 L 0 440 Z" fill="url(#ocean)" />
  <path d="M 0 350 Q 250 335, 500 355 T 800 345 L 800 440 L 0 440 Z" fill="#22d3ee" opacity="0.5" />
  
  <!-- Wave foam -->
  <path d="M 0 365 Q 200 360, 400 370 T 800 360" stroke="#ffffff" stroke-width="4" fill="none" opacity="0.8" />
  <path d="M 0 395 Q 250 390, 500 400 T 800 390" stroke="#ffffff" stroke-width="6" fill="none" opacity="0.6" />

  <!-- Golden Beach Sand -->
  <path d="M 0 410 Q 300 390, 800 420 L 800 600 L 0 600 Z" fill="url(#sand)" />

  <!-- Palm Tree Silhouettes -->
  <g fill="#1e293b">
    <!-- Trunk 1 -->
    <path d="M 720 600 Q 700 450 670 300 L 685 300 Q 715 450 735 600 Z" />
    <!-- Fronds 1 -->
    <path d="M 675 300 Q 600 240 550 270 Q 620 280 675 300 Z" />
    <path d="M 675 300 Q 640 210 590 200 Q 640 240 675 300 Z" />
    <path d="M 675 300 Q 720 200 770 210 Q 730 250 675 300 Z" />
    <path d="M 675 300 Q 760 250 800 280 Q 740 300 675 300 Z" />

    <!-- Trunk 2 -->
    <path d="M 100 600 Q 120 480 150 350 L 163 350 Q 133 480 115 600 Z" />
    <!-- Fronds 2 -->
    <path d="M 155 350 Q 80 300 30 320 Q 100 330 155 350 Z" />
    <path d="M 155 350 Q 110 260 60 270 Q 110 300 155 350 Z" />
    <path d="M 155 350 Q 190 260 240 270 Q 190 310 155 350 Z" />
    <path d="M 155 350 Q 230 310 270 340 Q 200 350 155 350 Z" />
  </g>

  <!-- Overlay Text Badge -->
  <rect x="40" y="40" width="320" height="70" rx="16" fill="rgba(15, 23, 42, 0.75)" stroke="rgba(255,255,255,0.2)" />
  <text x="65" y="70" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff">Pristine Atlantic Coast</text>
  <text x="65" y="93" font-family="sans-serif" font-size="13" fill="#cbd5e1">Kotu &amp; Kololi Golden Beaches</text>
</svg>`;

// 2. Parks SVG
const parksSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="jungle" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#064e3b" />
      <stop offset="50%" stop-color="#047857" />
      <stop offset="100%" stop-color="#022c22" />
    </linearGradient>
    <linearGradient id="sunbeam" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fef08a" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#fef08a" stop-opacity="0" />
    </linearGradient>
  </defs>

  <rect width="800" height="600" fill="url(#jungle)" />

  <!-- Sunbeams -->
  <polygon points="100,0 250,0 600,600 350,600" fill="url(#sunbeam)" />
  <polygon points="300,0 450,0 800,500 600,500" fill="url(#sunbeam)" />

  <!-- Foliage Canopy Layers -->
  <path d="M -50 -50 Q 200 150 450 -50 Z" fill="#065f46" opacity="0.8" />
  <path d="M 350 -50 Q 600 180 850 -50 Z" fill="#047857" opacity="0.9" />
  
  <!-- Tree Trunks -->
  <path d="M 120 600 Q 150 300 130 0 L 170 0 Q 190 300 160 600 Z" fill="#14532d" />
  <path d="M 640 600 Q 620 250 650 0 L 690 0 Q 660 250 680 600 Z" fill="#14532d" />

  <!-- Vines -->
  <path d="M 140 0 Q 250 200 160 400 T 200 600" stroke="#15803d" stroke-width="8" fill="none" />
  <path d="M 660 0 Q 550 220 640 450" stroke="#15803d" stroke-width="6" fill="none" />

  <!-- Kingfisher Bird Silhouette & Colors -->
  <g transform="translate(420, 220)">
    <!-- Branch -->
    <path d="M -100 40 Q 0 30 100 50" stroke="#3b2712" stroke-width="12" stroke-linecap="round" fill="none" />
    <!-- Bird Body -->
    <ellipse cx="0" cy="15" rx="20" ry="28" fill="#0284c7" />
    <!-- Chest -->
    <ellipse cx="-6" cy="18" rx="12" ry="18" fill="#ea580c" />
    <!-- Head -->
    <circle cx="8" cy="-12" r="14" fill="#0369a1" />
    <!-- Beak -->
    <polygon points="18,-14 45,-10 18,-6" fill="#0f172a" />
    <!-- Eye -->
    <circle cx="14" cy="-14" r="3" fill="#fff" />
    <circle cx="15" cy="-14" r="1.5" fill="#000" />
    <!-- Tail -->
    <polygon points="-12,35 -20,65 -5,40" fill="#0284c7" />
  </g>

  <!-- Leaves overlay -->
  <circle cx="50" cy="550" r="120" fill="#166534" />
  <circle cx="750" cy="520" r="140" fill="#15803d" />

  <!-- Overlay Text Badge -->
  <rect x="40" y="40" width="340" height="70" rx="16" fill="rgba(15, 23, 42, 0.75)" stroke="rgba(255,255,255,0.2)" />
  <text x="65" y="70" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff">Lush Natural Reserves</text>
  <text x="65" y="93" font-family="sans-serif" font-size="13" fill="#a7f3d0">Bijilo &amp; Abuko Wildlife Sanctuaries</text>
</svg>`;

// 3. Cuisine SVG
const cuisineSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="table" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#451a03" />
      <stop offset="100%" stop-color="#1c1917" />
    </linearGradient>
    <linearGradient id="stew" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#d97706" />
      <stop offset="50%" stop-color="#b45309" />
      <stop offset="100%" stop-color="#78350f" />
    </linearGradient>
  </defs>

  <!-- Wooden Table Background -->
  <rect width="800" height="600" fill="url(#table)" />

  <!-- Woven Mat -->
  <circle cx="400" cy="320" r="230" fill="#78350f" stroke="#92400e" stroke-width="8" stroke-dasharray="12 6" />
  <circle cx="400" cy="320" r="215" fill="#a16207" />

  <!-- Stew Ceramic Bowl -->
  <circle cx="400" cy="320" r="180" fill="#fef3c7" stroke="#d97706" stroke-width="12" />
  <circle cx="400" cy="320" r="160" fill="url(#stew)" />

  <!-- Grilled Fish Pieces -->
  <g fill="#9a3412" stroke="#431407" stroke-width="3">
    <rect x="330" y="270" width="120" height="50" rx="10" transform="rotate(-10 390 295)" />
    <line x1="345" y1="275" x2="360" y2="315" stroke="#78350f" stroke-width="4" />
    <line x1="375" y1="273" x2="390" y2="313" stroke="#78350f" stroke-width="4" />
    <line x1="405" y1="270" x2="420" y2="310" stroke="#78350f" stroke-width="4" />

    <rect x="340" y="330" width="110" height="45" rx="10" transform="rotate(15 395 352)" />
    <line x1="355" y1="335" x2="370" y2="370" stroke="#78350f" stroke-width="4" />
    <line x1="385" y1="335" x2="400" y2="370" stroke="#78350f" stroke-width="4" />
  </g>

  <!-- Rice & Garnish -->
  <circle cx="470" cy="250" r="30" fill="#fef08a" opacity="0.9" />
  <circle cx="310" cy="370" r="25" fill="#fef08a" opacity="0.9" />

  <!-- Chili Peppers -->
  <path d="M 280 260 Q 250 240 265 220 Q 290 250 280 260 Z" fill="#dc2626" />
  <path d="M 520 360 Q 550 380 535 400 Q 510 370 520 360 Z" fill="#dc2626" />

  <!-- Lime Slices -->
  <circle cx="260" cy="340" r="22" fill="#84cc16" />
  <circle cx="260" cy="340" r="17" fill="#ecfccb" />
  
  <circle cx="530" cy="270" r="22" fill="#84cc16" />
  <circle cx="530" cy="270" r="17" fill="#ecfccb" />

  <!-- Overlay Text Badge -->
  <rect x="40" y="40" width="340" height="70" rx="16" fill="rgba(15, 23, 42, 0.75)" stroke="rgba(255,255,255,0.2)" />
  <text x="65" y="70" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff">Authentic Gambian Cuisine</text>
  <text x="65" y="93" font-family="sans-serif" font-size="13" fill="#fde047">Domoda Peanut Stew &amp; Fresh Seafood</text>
</svg>`;

// 4. Culture SVG
const cultureSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#312e81" />
      <stop offset="50%" stop-color="#1e1b4b" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="800" height="600" fill="url(#bg)" />

  <!-- African Pattern Background Accents -->
  <g stroke="#4338ca" stroke-width="3" fill="none" opacity="0.3">
    <polygon points="100,50 150,150 50,150" />
    <polygon points="250,50 300,150 200,150" />
    <polygon points="400,50 450,150 350,150" />
    <polygon points="550,50 600,150 500,150" />
    <polygon points="700,50 750,150 650,150" />

    <polygon points="100,450 150,550 50,550" />
    <polygon points="250,450 300,550 200,550" />
    <polygon points="400,450 450,550 350,550" />
    <polygon points="550,450 600,550 500,550" />
    <polygon points="700,450 750,550 650,550" />
  </g>

  <!-- Kora Instrument Centerpiece -->
  <g transform="translate(400, 310)">
    <!-- Calabash Gourd -->
    <circle cx="0" cy="60" r="130" fill="#a16207" stroke="#78350f" stroke-width="8" />
    <circle cx="0" cy="60" r="115" fill="#ca8a04" />
    <!-- Soundhole -->
    <circle cx="45" cy="30" r="25" fill="#451a03" />

    <!-- Long Wooden Neck -->
    <rect x="-12" y="-240" width="24" height="320" rx="8" fill="#78350f" stroke="#451a03" stroke-width="3" />

    <!-- Wooden Bridge -->
    <rect x="-8" y="40" width="16" height="60" fill="#451a03" />

    <!-- Kora Strings -->
    <line x1="-30" y1="-200" x2="-6" y2="70" stroke="#fef08a" stroke-width="2" opacity="0.9" />
    <line x1="-22" y1="-180" x2="-4" y2="70" stroke="#fef08a" stroke-width="2" opacity="0.9" />
    <line x1="-15" y1="-160" x2="-2" y2="70" stroke="#fef08a" stroke-width="2" opacity="0.9" />
    <line x1="-8" y1="-140" x2="0" y2="70" stroke="#fef08a" stroke-width="2" opacity="0.9" />

    <line x1="30" y1="-200" x2="6" y2="70" stroke="#fef08a" stroke-width="2" opacity="0.9" />
    <line x1="22" y1="-180" x2="4" y2="70" stroke="#fef08a" stroke-width="2" opacity="0.9" />
    <line x1="15" y1="-160" x2="2" y2="70" stroke="#fef08a" stroke-width="2" opacity="0.9" />
    <line x1="8" y1="-140" x2="0" y2="70" stroke="#fef08a" stroke-width="2" opacity="0.9" />
  </g>

  <!-- Woven Baskets & Wood Carving Statues Side Accents -->
  <g fill="#78350f">
    <ellipse cx="140" cy="380" rx="50" ry="80" />
    <ellipse cx="140" cy="320" r="30" />
    
    <ellipse cx="660" cy="380" rx="50" ry="80" />
    <ellipse cx="660" cy="320" r="30" />
  </g>

  <!-- Overlay Text Badge -->
  <rect x="40" y="40" width="340" height="70" rx="16" fill="rgba(15, 23, 42, 0.75)" stroke="rgba(255,255,255,0.2)" />
  <text x="65" y="70" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff">Vibrant Cultural Heritage</text>
  <text x="65" y="93" font-family="sans-serif" font-size="13" fill="#c7d2fe">Kora Music &amp; Serrekunda Crafts</text>
</svg>`;

// Write all SVG image files to public/images/attractions/
fs.writeFileSync(path.join(attractionsDir, 'beaches.svg'), beachesSvg);
fs.writeFileSync(path.join(attractionsDir, 'parks.svg'), parksSvg);
fs.writeFileSync(path.join(attractionsDir, 'cuisine.svg'), cuisineSvg);
fs.writeFileSync(path.join(attractionsDir, 'culture.svg'), cultureSvg);

console.log('Attraction SVG images created successfully in public/images/attractions/!');
