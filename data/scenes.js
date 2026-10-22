// Ortak sahne çizim araçları: katmanlı, ışıklı SVG illüstrasyonlar üretir.
// Her özet dosyası window.Scene yardımcılarını kullanarak kendi sahnelerini kurar.
window.Scene = (() => {
  let uid = 0;

  // Basit deterministik rastgele sayı üreteci (her yenilemede aynı sahne)
  const rng = seed => () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);

  // Bir sahne: gökyüzü degradesi + gövde + film greni + kenar kararması
  function svg({ sky, body, grain = .18, vignette = .55 }) {
    const id = 's' + (++uid);
    const stops = sky.map((c, i) => `<stop offset="${i / (sky.length - 1)}" stop-color="${c}"/>`).join('');
    return `<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" role="img" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="${id}sky" x1="0" y1="0" x2="0" y2="1">${stops}</linearGradient>
        <radialGradient id="${id}vig" cx=".5" cy=".5" r=".75">
          <stop offset=".55" stop-color="#000" stop-opacity="0"/>
          <stop offset="1" stop-color="#000" stop-opacity="${vignette}"/>
        </radialGradient>
        <filter id="${id}grain"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/>
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 ${grain} 0"/></filter>
        <filter id="${id}blur"><feGaussianBlur stdDeviation="6"/></filter>
        <filter id="${id}soft"><feGaussianBlur stdDeviation="2"/></filter>
      </defs>
      <rect width="800" height="400" fill="url(#${id}sky)"/>
      ${body(id)}
      <rect width="800" height="400" fill="url(#${id}vig)"/>
      <rect width="800" height="400" filter="url(#${id}grain)"/>
    </svg>`;
  }

  // Yumuşak ışık halesi
  const glow = (id, x, y, r, color, op = .8) => `
    <radialGradient id="${id}g${x}_${y}" cx="${x}" cy="${y}" r="${r}" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${color}" stop-opacity="${op}"/>
      <stop offset="1" stop-color="${color}" stop-opacity="0"/>
    </radialGradient>
    <circle cx="${x}" cy="${y}" r="${r}" fill="url(#${id}g${x}_${y})"/>`;

  // Şehir silueti: bina sırası + rastgele yanan pencereler
  function skyline({ y, color, seed, lit = .25, light = '#f4c76a', minH = 60, maxH = 180, dome = true }) {
    const r = rng(seed);
    let x = -10, out = '';
    while (x < 810) {
      const w = 40 + r() * 70, h = minH + r() * (maxH - minH);
      out += `<rect x="${x.toFixed(0)}" y="${(y - h).toFixed(0)}" width="${w.toFixed(0)}" height="${(h + 400).toFixed(0)}" fill="${color}"/>`;
      if (r() < .3) out += `<polygon points="${x},${y - h} ${x + w / 2},${y - h - 18} ${x + w},${y - h}" fill="${color}"/>`;
      for (let wy = y - h + 14; wy < y - 10; wy += 22)
        for (let wx = x + 8; wx < x + w - 10; wx += 16)
          if (r() < lit) out += `<rect x="${wx.toFixed(0)}" y="${wy.toFixed(0)}" width="7" height="11" fill="${light}" opacity="${(.5 + r() * .5).toFixed(2)}"/>`;
      x += w + 2;
    }
    if (dome) out += `<path d="M380 ${y - 150} q30 -70 60 0 z M405 ${y - 205} v-30" stroke="${color}" stroke-width="4" fill="${color}"/>
      <rect x="370" y="${y - 150}" width="80" height="160" fill="${color}"/>`;
    return out;
  }

  // İnsan silueti (ayakta). coat: palto rengi, s: ölçek
  const figure = (x, y, s = 1, coat = '#111', opts = {}) => {
    const hat = opts.hat ? `<rect x="-9" y="-78" width="18" height="10" rx="2" fill="${coat}"/><rect x="-13" y="-69" width="26" height="3" fill="${coat}"/>` : '';
    const dress = opts.dress
      ? `<path d="M-11 -48 Q0 -55 11 -48 L22 0 H-22 Z" fill="${coat}"/>`
      : `<path d="M-12 -48 Q0 -54 12 -48 L14 -12 H-14 Z" fill="${coat}"/><rect x="-10" y="-14" width="7" height="14" fill="${coat}"/><rect x="3" y="-14" width="7" height="14" fill="${coat}"/>`;
    const shawl = opts.shawl ? `<path d="M-13 -60 Q0 -72 13 -60 L16 -40 Q0 -34 -16 -40 Z" fill="${opts.shawl}"/>` : '';
    return `<g transform="translate(${x} ${y}) scale(${s})">${dress}${shawl}<circle cx="0" cy="-60" r="9" fill="${coat}"/>${hat}</g>`;
  };

  // Oturan figür
  const seated = (x, y, s = 1, coat = '#111', flip = false) =>
    `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
      <path d="M-10 -40 Q0 -46 12 -40 L14 -6 H-10 Z" fill="${coat}"/>
      <path d="M-8 -8 H26 V0 H-8 Z M20 -8 H28 V22 H20 Z" fill="${coat}"/>
      <circle cx="2" cy="-52" r="9" fill="${coat}"/></g>`;

  // Yağmur, kar gibi parçacık çizgileri
  function streaks(seed, n, color, len, slant, op = .4, w = 1.2) {
    const r = rng(seed);
    let out = '';
    for (let i = 0; i < n; i++) {
      const x = r() * 820, y = r() * 400;
      out += `<line x1="${x.toFixed(0)}" y1="${y.toFixed(0)}" x2="${(x + slant).toFixed(0)}" y2="${(y + len).toFixed(0)}" stroke="${color}" stroke-width="${w}" opacity="${(op * (.4 + r() * .6)).toFixed(2)}"/>`;
    }
    return out;
  }

  function dots(seed, n, color, rmax, op = .7, yMin = 0, yMax = 400) {
    const r = rng(seed);
    let out = '';
    for (let i = 0; i < n; i++)
      out += `<circle cx="${(r() * 800).toFixed(0)}" cy="${(yMin + r() * (yMax - yMin)).toFixed(0)}" r="${(.4 + r() * rmax).toFixed(1)}" fill="${color}" opacity="${(op * (.3 + r() * .7)).toFixed(2)}"/>`;
    return out;
  }

  return { svg, glow, skyline, figure, seated, streaks, dots, rng };
})();
