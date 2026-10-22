// Klasik Özetler — basit hash tabanlı tek sayfa uygulama.
// Özetler data/summaries/<id>.js dosyalarından ihtiyaç anında yüklenir
// ve window.SUMMARIES[id] içine kaydolur.

window.SUMMARIES = window.SUMMARIES || {};
const app = document.getElementById('app');

// ---- Tema ----
const themeBtn = document.getElementById('themeBtn');
function applyTheme(t) { document.documentElement.dataset.theme = t; }
try { applyTheme(localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')); } catch { applyTheme('light'); }
themeBtn.onclick = () => {
  const t = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(t);
  try { localStorage.setItem('theme', t); } catch {}
};

// ---- Yardımcılar ----
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function loadSummary(id) {
  if (window.SUMMARIES[id]) return Promise.resolve(window.SUMMARIES[id]);
  return new Promise(resolve => {
    const s = document.createElement('script');
    s.src = `data/summaries/${id}.js`;
    s.onload = () => resolve(window.SUMMARIES[id] || null);
    s.onerror = () => resolve(null);
    document.body.appendChild(s);
  });
}

function savePos(id, p) { try { localStorage.setItem('pos:' + id, p); } catch {} }
function getPos(id) { try { return +localStorage.getItem('pos:' + id) || 0; } catch { return 0; } }

// Okuma yazı boyutu: 0 = cihaz varsayılanı, -2..+4 arası adım
let fontStep = 0;
try { fontStep = +localStorage.getItem('fontStep') || 0; } catch {}
function applyFont(el) { if (el) el.style.setProperty('--fs', fontStep ? `${1.05 + fontStep * .08}rem` : ''); }

// ---- Ana sayfa ----
let filter = { q: '', cat: '' };

function renderHome() {
  const cats = [...new Set(BOOKS.map(b => b.category))].sort((a, b) => a.localeCompare(b, 'tr'));
  app.innerHTML = `
    <section class="hero">
      <h1>Dünya Klasikleri Özetleri</h1>
      <p>Her biri 7–12 sayfalık, resimli kitap özetleri.</p>
    </section>
    <div class="filters">
      <input id="q" placeholder="Kitap veya yazar ara…" value="${esc(filter.q)}">
      <select id="cat">
        <option value="">Tüm türler</option>
        ${cats.map(c => `<option ${c === filter.cat ? 'selected' : ''}>${esc(c)}</option>`).join('')}
      </select>
    </div>
    <div id="grid"></div>`;
  const q = document.getElementById('q');
  q.oninput = e => { filter.q = e.target.value; drawGrid(); };
  document.getElementById('cat').onchange = e => { filter.cat = e.target.value; drawGrid(); };
  drawGrid();
}

function drawGrid() {
  const q = filter.q.toLocaleLowerCase('tr');
  const list = BOOKS.filter(b =>
    (!filter.cat || b.category === filter.cat) &&
    (!q || (b.title + ' ' + b.author).toLocaleLowerCase('tr').includes(q)));
  const grid = document.getElementById('grid');
  if (!list.length) { grid.innerHTML = `<div class="empty">Sonuç bulunamadı.</div>`; return; }
  const sections = [['secki', 'Seçki'], ['klasik', 'Dünya Klasikleri']];
  grid.innerHTML = sections.map(([key, name]) => {
    const items = list.filter(b => b.list === key);
    return items.length ? `<h2 class="section-title">${name}</h2><div class="grid">${cards(items)}</div>` : '';
  }).join('');
  observeCovers();
}

// Kapak görseli: b.cover verilmişse o resim, yoksa özetin ilk sahnesi.
// Sahneler kart ekrana yaklaştıkça yüklenir.
let coverObserver;
function observeCovers() {
  coverObserver?.disconnect();
  const fill = async el => {
    const book = BOOKS.find(b => b.id === el.dataset.id);
    const art = el.querySelector('.c-art');
    if (book.cover) { art.innerHTML = `<img src="${esc(book.cover)}" alt="" loading="lazy">`; }
    else {
      const sum = await loadSummary(book.id);
      const svg = sum?.pages[0]?.image?.svg;
      if (svg) art.innerHTML = svg;
    }
    el.classList.add('has-art');
  };
  const covers = [...document.querySelectorAll('.cover[data-id]')];
  if (!('IntersectionObserver' in window)) { covers.forEach(fill); return; }
  coverObserver = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { coverObserver.unobserve(e.target); fill(e.target); }
  }), { rootMargin: '300px' });
  covers.forEach(c => coverObserver.observe(c));
}

function cards(list) {
  return list.map(b => `
    <a class="card" href="#/kitap/${b.id}">
      <div class="cover" data-id="${b.id}" style="background:linear-gradient(160deg, ${b.color}, #1d1a16)">
        <div class="c-art" aria-hidden="true"></div>
        <div class="c-title">${esc(b.title)}</div>
        <div class="c-emoji">${b.emoji}</div>
        <div class="c-author">${esc(b.author)} · ${b.year}</div>
      </div>
      <div class="meta">
        <span>${esc(b.category)}</span>
        ${b.ready ? '<span class="badge ready">Hazır</span>' : '<span class="badge">Yakında</span>'}
      </div>
    </a>`).join('');
}

// ---- Okuma ekranı ----
async function renderReader(id, pageIdx) {
  const book = BOOKS.find(b => b.id === id);
  if (!book) { app.innerHTML = `<div class="empty">Kitap bulunamadı. <a class="back" href="#/">Ana sayfa</a></div>`; return; }

  const sum = await loadSummary(id);
  if (!sum) {
    app.innerHTML = `<div class="reader">
      <a class="back" href="#/">← Tüm kitaplar</a>
      <div class="empty"><h2>${esc(book.title)}</h2><p>Bu kitabın özeti hazırlanıyor.</p></div></div>`;
    return;
  }

  const pages = sum.pages;
  let i = Math.min(Math.max(pageIdx ?? getPos(id), 0), pages.length - 1);
  savePos(id, i);
  const p = pages[i];

  const illus = p.image ? `
    <figure class="illus">
      ${p.image.svg ? p.image.svg : `<img src="${esc(p.image.src)}" alt="${esc(p.image.caption || '')}">`}
      ${p.image.caption ? `<figcaption>${esc(p.image.caption)}</figcaption>` : ''}
    </figure>` : '';

  app.innerHTML = `
    <div class="reader">
      <a class="back" href="#/">← Tüm kitaplar</a>
      <div class="reader-head">
        <div>
          <h2>${esc(book.title)}</h2>
          <div class="sub">${esc(book.author)} · ${book.year}</div>
        </div>
        <div class="font-ctl">
          <button id="fsDown" aria-label="Yazıyı küçült">A−</button>
          <button id="fsUp" aria-label="Yazıyı büyüt">A+</button>
        </div>
      </div>
      <div class="progress"><div style="width:${((i + 1) / pages.length) * 100}%"></div></div>
      <article class="page">
        <h3>${esc(p.title)}</h3>
        <div class="pno">Sayfa ${i + 1} / ${pages.length}</div>
        ${illus}
        ${p.text.map(par => `<p>${esc(par)}</p>`).join('')}
      </article>
      <div class="nav">
        <button id="prev" ${i === 0 ? 'disabled' : ''}>← Önceki</button>
        <div class="dots">${pages.map((_, k) => `<span class="${k === i ? 'on' : ''}" data-k="${k}"></span>`).join('')}</div>
        <button id="next" class="primary" ${i === pages.length - 1 ? 'disabled' : ''}>Sonraki →</button>
      </div>
      <div class="swipe-hint">Sayfa çevirmek için sola veya sağa kaydırın</div>
    </div>`;

  const go = k => { location.hash = `#/kitap/${id}/${k + 1}`; scrollTo(0, 0); };

  const page = app.querySelector('.page');
  applyFont(page);
  const setFont = d => {
    fontStep = Math.max(-2, Math.min(4, fontStep + d));
    try { localStorage.setItem('fontStep', fontStep); } catch {}
    applyFont(page);
  };
  document.getElementById('fsDown').onclick = () => setFont(-1);
  document.getElementById('fsUp').onclick = () => setFont(1);

  // Dokunmatik kaydırma: yatay hareket dikeyden belirgin şekilde büyükse sayfa çevir
  let sx = 0, sy = 0;
  page.addEventListener('touchstart', e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
  page.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    if (dx < 0 && i < pages.length - 1) go(i + 1);
    if (dx > 0 && i > 0) go(i - 1);
  }, { passive: true });
  document.getElementById('prev').onclick = () => i > 0 && go(i - 1);
  document.getElementById('next').onclick = () => i < pages.length - 1 && go(i + 1);
  app.querySelectorAll('.dots span').forEach(d => d.onclick = () => go(+d.dataset.k));
  document.onkeydown = e => {
    if (e.key === 'ArrowRight' && i < pages.length - 1) go(i + 1);
    if (e.key === 'ArrowLeft' && i > 0) go(i - 1);
  };
}

// ---- Yönlendirme ----
function route() {
  document.onkeydown = null;
  const m = location.hash.match(/^#\/kitap\/([\w-]+)(?:\/(\d+))?/);
  if (m) renderReader(m[1], m[2] ? +m[2] - 1 : undefined);
  else renderHome();
}
addEventListener('hashchange', route);
route();

// Çevrimdışı okuma ve "ana ekrana ekle" için service worker
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
