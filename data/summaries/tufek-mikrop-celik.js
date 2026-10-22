// Tüfek, Mikrop ve Çelik — Jared Diamond (1997)
// Sahneler data/scenes.js yardımcılarıyla çizilir; ileride image.src ile gerçek çizimlerle değiştirilebilir.
(() => {
  const { svg, glow, skyline, figure, seated, streaks, dots } = window.Scene;

  // Hayvan siluetleri (x,y: ayakların zemine bastığı nokta)
  const horse = (x, y, s, c, flip = false) => `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})" fill="${c}">
    <path d="M-30 -40 Q-10 -50 20 -44 L34 -62 Q40 -70 46 -62 L44 -54 L38 -48 L30 -30 L28 0 H23 L22 -28 L-18 -28 L-20 0 H-25 L-27 -30 Q-36 -32 -40 -22 L-44 -24 Q-40 -38 -30 -40 Z"/></g>`;
  const cow = (x, y, s, c, flip = false) => `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})" fill="${c}">
    <path d="M-34 -40 H22 Q30 -44 36 -40 L44 -42 L42 -34 Q40 -24 32 -22 L28 -18 V0 H22 V-16 H-22 V0 H-28 V-20 Q-38 -22 -38 -32 Z"/><path d="M34 -42 l-4 -8 M40 -42 l4 -8" stroke="${c}" stroke-width="3"/></g>`;
  const sheep = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}">
    <ellipse cx="0" cy="-22" rx="22" ry="14"/><ellipse cx="22" cy="-26" rx="8" ry="6"/><rect x="-14" y="-12" width="4" height="12"/><rect x="10" y="-12" width="4" height="12"/></g>`;
  // Başak
  const wheat = (x, y, h, c) => `<g stroke="${c}" fill="${c}"><line x1="${x}" y1="${y}" x2="${x + 3}" y2="${y - h}" stroke-width="1.5"/>
    ${[0, 1, 2, 3].map(i => `<ellipse cx="${x + 3 + (i % 2 ? 3 : -3)}" cy="${y - h + 4 + i * 5}" rx="2.2" ry="4" transform="rotate(${i % 2 ? 25 : -25} ${x + 3} ${y - h + 4 + i * 5})"/>`).join('')}</g>`;
  // Yelkenli
  const sail = (x, y, s, c, sailC = c) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-40 0 H40 L30 14 H-30 Z" fill="${c}"/><line x1="0" y1="0" x2="0" y2="-70" stroke="${c}" stroke-width="3"/>
    <path d="M2 -66 Q30 -40 4 -8 Z" fill="${sailC}"/><path d="M-2 -60 Q-26 -36 -2 -10 Z" fill="${sailC}" opacity=".85"/></g>`;

  // 1 — Yeni Gine sahili, Yali’nin sorusu
  const beach = svg({
    sky: ['#3a7aa8', '#8ac0d8', '#f4e4c0'],
    vignette: .35, grain: .12,
    body: id => `
      ${glow(id, 650, 150, 200, '#fff6d8', .7)}
      <path d="M0 200 Q100 150 220 190 Q330 140 460 185 L460 230 H0 Z" fill="#2a5a4a" opacity=".7"/>
      <rect y="220" width="800" height="70" fill="#3a8aa8"/>
      ${Array.from({ length: 8 }, (_, i) => `<path d="M${i * 110} ${240 + (i % 3) * 12} q20 -5 40 0" stroke="#d8f0f8" stroke-width="2" fill="none" opacity=".6"/>`).join('')}
      <path d="M0 290 Q400 260 800 285 V400 H0 Z" fill="#e8d4a8"/>
      ${sail(560, 228, .9, '#2a2a2a', '#f2ece0')}
      <g stroke="#2a4a2a" stroke-width="7" fill="none"><path d="M110 380 Q100 280 140 190"/></g>
      ${[0, 1, 2, 3, 4, 5].map(i => `<path d="M140 190 q${-60 + i * 25} ${-10 + Math.abs(i - 2.5) * 10} ${-80 + i * 32} ${30 + Math.abs(i - 2.5) * 6}" stroke="#2a5a2a" stroke-width="9" fill="none" stroke-linecap="round"/>`).join('')}
      <path d="M260 300 h140 l-10 26 h-120 z" fill="#8a6a4a"/><rect x="290" y="270" width="40" height="30" fill="#b08a5a"/><rect x="335" y="280" width="34" height="20" fill="#7a5a3a"/>
      ${figure(440, 340, 1.9, '#3a2418')}
      ${figure(500, 342, 1.9, '#5a5a6a', { hat: true })}`
  });

  // 2 — Cajamarca, 1532: atlı İspanyollar ve İnka kalabalığı
  const cajamarca = svg({
    sky: ['#4a2a2a', '#a8542a', '#e8a85a'],
    vignette: .6,
    body: id => `
      ${glow(id, 200, 240, 220, '#ffd08a', .6)}
      <path d="M0 230 L120 140 L220 200 L340 110 L470 210 L600 130 L800 220 V260 H0 Z" fill="#5a3a3a"/>
      <path d="M0 260 L160 200 L300 240 L520 180 L800 250 V290 H0 Z" fill="#3a2424"/>
      <rect y="285" width="800" height="115" fill="#2a1a14"/>
      <g fill="#1a0e0a">${Array.from({ length: 40 }, (_, i) => figure(430 + (i % 14) * 27 + (i % 3) * 5, 300 + Math.floor(i / 14) * 18, 1 + Math.floor(i / 14) * .15, '#1a0e0a')).join('')}</g>
      <rect x="560" y="200" width="70" height="20" fill="#d9a83a"/><rect x="575" y="180" width="40" height="22" fill="#d9a83a"/>
      ${figure(595, 182, .9, '#1a0e0a', {})}
      ${horse(140, 330, 1.6, '#0a0605')}${horse(250, 340, 1.8, '#0a0605')}${horse(70, 350, 1.4, '#0a0605')}
      ${figure(150, 270, 1, '#0a0605', { hat: true })}${figure(262, 274, 1.1, '#0a0605', { hat: true })}
      <line x1="270" y1="220" x2="300" y2="150" stroke="#c8c8c8" stroke-width="3"/>
      ${glow(id, 330, 250, 50, '#fff0c0', .7)}
      <path d="M320 240 q30 -30 0 -60 q-20 -20 10 -40" stroke="#c8c0b0" stroke-width="10" fill="none" opacity=".2" filter="url(#${id}blur)"/>`
  });

  // 3 — Bereketli Hilal’de altın başaklar
  const crescent = svg({
    sky: ['#6a8ab8', '#e8b88a', '#f8dca0'],
    vignette: .4, grain: .12,
    body: id => `
      ${glow(id, 400, 230, 260, '#fff0c0', .8)}<circle cx="400" cy="230" r="38" fill="#fff4d0"/>
      <path d="M0 230 Q200 200 400 225 T800 215 V260 H0 Z" fill="#b89a6a"/>
      <path d="M0 250 Q300 235 800 255 V400 H0 Z" fill="#d8a84a"/>
      ${Array.from({ length: 160 }, (_, i) => {
        const r = ((i * 9301 + 49297) % 233280) / 233280, x = (i * 53) % 820, y = 270 + r * 130;
        return wheat(x, y, 30 + (y - 270) * .5, y > 340 ? '#7a5014' : '#a8741e');
      }).join('')}
      ${figure(240, 300, 1.4, '#3a2410', {})}
      <path d="M230 260 q-30 10 -40 40" stroke="#3a2410" stroke-width="3" fill="none"/>
      <path d="M560 250 h40 v-20 h-40 z M555 230 l25 -16 l25 16z" fill="#7a5a3a"/>`
  });

  // 4 — Evcilleştirilen büyük memeliler
  const animals = svg({
    sky: ['#8aa8b8', '#c8d0b8', '#e8dcb0'],
    vignette: .35, grain: .12,
    body: id => `
      ${glow(id, 640, 120, 180, '#fff6d8', .6)}
      <path d="M0 220 Q200 180 420 210 T800 200 V400 H0 Z" fill="#9aa86a"/>
      <path d="M0 270 Q300 240 800 270 V400 H0 Z" fill="#7a8a4a"/>
      ${horse(160, 330, 1.7, '#3a2a1a')}
      ${cow(360, 345, 1.6, '#2a1e14')}
      ${cow(470, 300, 1, '#4a3a24', true)}
      ${[580, 620, 655, 690, 600, 640].map((x, i) => sheep(x, 330 + (i > 3 ? 30 : 0), 1 + (i > 3 ? .2 : 0), i % 2 ? '#e8e0cc' : '#d8ceb4')).join('')}
      ${figure(740, 360, 1.6, '#3a2410', {})}<line x1="752" y1="370" x2="764" y2="270" stroke="#3a2410" stroke-width="3"/>`
  });

  // 5 — Kıtaların ekseni: doğu-batı uzanan Avrasya, kuzey-güney uzanan Amerika ve Afrika
  const axes = svg({
    sky: ['#0e1a2a', '#16263a', '#0e1a2a'],
    vignette: .5,
    body: id => `
      <g stroke="#2a3e58" stroke-width="1" opacity=".6">${Array.from({ length: 9 }, (_, i) => `<line x1="0" y1="${i * 50}" x2="800" y2="${i * 50}"/>`).join('')}${Array.from({ length: 17 }, (_, i) => `<line x1="${i * 50}" y1="0" x2="${i * 50}" y2="400"/>`).join('')}</g>
      <path d="M90 60 Q160 40 200 80 Q230 120 200 150 Q180 180 210 200 Q240 230 230 270 Q220 320 190 350 Q175 370 165 340 Q170 300 150 260 Q120 220 110 170 Q70 120 90 60 Z" fill="#c8a86a"/>
      <path d="M400 70 Q480 40 600 50 Q700 55 740 100 Q760 140 700 160 Q640 170 600 150 Q560 160 520 150 Q470 150 430 140 Q390 120 400 70 Z" fill="#c8a86a"/>
      <path d="M420 160 Q470 150 500 175 Q530 210 510 260 Q490 320 465 340 Q445 300 440 260 Q420 230 405 200 Z" fill="#c8a86a"/>
      <path d="M660 250 Q700 240 720 270 Q710 300 680 300 Q650 285 660 250 Z" fill="#c8a86a"/>
      <line x1="410" y1="100" x2="740" y2="100" stroke="#f4d070" stroke-width="5"/><polygon points="740,90 760,100 740,110" fill="#f4d070"/><polygon points="410,90 390,100 410,110" fill="#f4d070"/>
      <line x1="160" y1="70" x2="185" y2="340" stroke="#e8705a" stroke-width="5" stroke-dasharray="10 8"/>
      <line x1="460" y1="165" x2="470" y2="330" stroke="#e8705a" stroke-width="5" stroke-dasharray="10 8"/>
      ${glow(id, 560, 100, 140, '#f4d070', .25)}
      ${dots(71, 40, '#9ac0e8', 1, .5)}`
  });

  // 6 — Mikroplar: kalabalık köyleri saran görünmez sis
  const germs = svg({
    sky: ['#1a2a1a', '#2a3a26', '#3a3a2a'],
    vignette: .7,
    body: id => `
      <path d="M0 260 Q200 230 400 255 T800 245 V400 H0 Z" fill="#1e261a"/>
      ${[80, 180, 300, 420, 540, 660].map((x, i) => `<path d="M${x} 280 l40 -40 l40 40 v40 h-80 z" fill="#14180f"/><rect x="${x + 32}" y="${296}" width="14" height="24" fill="${i % 2 ? '#d98a3a' : '#2a2a1a'}" opacity=".7"/>`).join('')}
      ${Array.from({ length: 14 }, (_, i) => `<ellipse cx="${(i * 67) % 800}" cy="${180 + (i % 4) * 30}" rx="${90 + (i % 3) * 40}" ry="${24 + (i % 2) * 10}" fill="#8aa86a" opacity=".12" filter="url(#${id}blur)"/>`).join('')}
      ${Array.from({ length: 28 }, (_, i) => {
        const x = (i * 97) % 780 + 10, y = 40 + (i * 53) % 200, r = 5 + (i % 4) * 3;
        return `<g opacity=".55"><circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#b8d88a" stroke-width="1.5"/>${Array.from({ length: 8 }, (_, k) => `<line x1="${x + Math.cos(k * .785) * r}" y1="${y + Math.sin(k * .785) * r}" x2="${x + Math.cos(k * .785) * (r + 4)}" y2="${y + Math.sin(k * .785) * (r + 4)}" stroke="#b8d88a" stroke-width="1.2"/>`).join('')}</g>`;
      }).join('')}
      ${cow(380, 340, 1.2, '#0c0f08')}${figure(300, 350, 1.4, '#0c0f08')}${figure(470, 352, 1.3, '#0c0f08', { dress: true })}`
  });

  // 7 — Yazı ve teknoloji: kil tablet, matbaa ve gemi
  const writing = svg({
    sky: ['#3a2a1e', '#5a4030', '#2a1e14'],
    body: id => `
      ${glow(id, 260, 160, 220, '#ffc070', .5)}
      <rect x="140" y="80" width="230" height="170" rx="16" fill="#a8845a"/>
      <rect x="150" y="90" width="210" height="150" rx="12" fill="#b89468"/>
      ${Array.from({ length: 6 }, (_, r) => Array.from({ length: 9 }, (_, c) => `<path d="M${165 + c * 21} ${108 + r * 22} l8 4 l-8 4 z M${173 + c * 21} ${112 + r * 22} h6" stroke="#6a4a2a" fill="#6a4a2a" stroke-width="1.5"/>`).join('')).join('')}
      <rect y="290" width="800" height="110" fill="#1e140c"/>
      <path d="M100 290 H700 L720 310 H80 Z" fill="#4a3220"/>
      <g transform="translate(520 100)"><rect x="0" y="0" width="140" height="190" fill="#2a1e14"/><rect x="20" y="20" width="100" height="14" fill="#5a4030"/><rect x="60" y="34" width="20" height="80" fill="#5a4030"/><rect x="30" y="114" width="80" height="20" fill="#5a4030"/><rect x="10" y="150" width="120" height="10" fill="#e8dcc4"/></g>
      ${sail(400, 300, 1.2, '#140d08', '#e8dcc4')}
      <path d="M410 180 l20 -60 l6 2 l-20 60 z" fill="#d8c8a8"/>`
  });

  // 8 — Bölünmüş Avrupa, birleşik Çin: geri çağrılan hazine filosu
  const fleets = svg({
    sky: ['#2a3a5a', '#7a6a7a', '#e8a87a'],
    vignette: .45,
    body: id => `
      ${glow(id, 600, 210, 220, '#ffd8a0', .6)}
      <rect y="230" width="800" height="170" fill="#3a4a6a"/>
      ${Array.from({ length: 12 }, (_, i) => `<path d="M${(i * 71) % 800} ${250 + i * 12} q30 -6 60 0" stroke="#8a9ab8" stroke-width="2" fill="none" opacity=".5"/>`).join('')}
      <path d="M0 230 Q60 200 120 220 Q150 180 200 215 Q240 200 260 230 Z" fill="#2a2a3a"/>
      ${sail(90, 270, .6, '#14141e', '#d8d0c0')}${sail(170, 290, .7, '#14141e', '#d8d0c0')}${sail(240, 262, .5, '#14141e', '#d8d0c0')}
      <g transform="translate(560 300)">
        <path d="M-140 0 H140 L110 30 H-110 Z" fill="#1a0e0e"/>
        ${[-90, -40, 10, 60, 100].map((x, i) => `<line x1="${x}" y1="0" x2="${x}" y2="${-120 + Math.abs(i - 2) * 20}" stroke="#1a0e0e" stroke-width="4"/>
          <rect x="${x - 22}" y="${-112 + Math.abs(i - 2) * 20}" width="44" height="${90 - Math.abs(i - 2) * 16}" fill="#a83a2a" opacity=".85"/>
          ${[0, 1, 2, 3].map(k => `<line x1="${x - 22}" y1="${-100 + Math.abs(i - 2) * 20 + k * 20}" x2="${x + 22}" y2="${-100 + Math.abs(i - 2) * 20 + k * 20}" stroke="#1a0e0e" stroke-width="2"/>`).join('')}`).join('')}
      </g>
      <path d="M690 240 Q740 215 800 225 V245 Z" fill="#2a2a3a"/>`
  });

  window.SUMMARIES['tufek-mikrop-celik'] = {
    pages: [
      {
        title: 'Yali’nin Sorusu',
        image: { svg: beach, caption: 'Yeni Gine, 1972: Sahilde bir yürüyüş ve yıllarca cevap aranacak bir soru.' },
        text: [
          'Jared Diamond, kuş türlerini incelemek için yıllarca Yeni Gine’nin ormanlarında çalışmış bir biyolog ve coğrafyacıdır. 1972 yılında bir gün sahilde yürürken, yerel halkın sevilen ve meraklı bir siyasetçisi olan Yali ona çok basit görünen ama cevabı neredeyse imkânsız bir soru sorar: “Neden siz beyazlar bu kadar çok ‘kargo’ geliştirip buraya getirdiniz de biz siyahların kendimize ait bu kadar kargomuz olmadı?” Yali’nin “kargo” dediği şey çelik baltalar, kibritler, ilaçlar, giysiler, şemsiyeler, kısacası sömürgecilerin adaya taşıdığı bütün mallardır.',
          'Bu soru aslında insanlık tarihinin en büyük sorusudur. Bundan on üç bin yıl önce, son buzul çağı sona erdiğinde, bütün kıtalarda insanlar benzer bir yaşam sürüyordu: Avcılık ve toplayıcılıkla geçinen küçük gruplar hâlinde dolaşıyorlardı. Peki neden bazı toplumlar zamanla tarım, yazı, metal aletler ve güçlü devletler geliştirirken, diğerleri taş aletlerle yaşamaya devam etti? Neden Avrupalılar Amerika’yı, Afrika’yı ve Avustralya’yı fethetti de bunun tersi olmadı?',
          'Diamond, bu soruya verilen en yaygın ve en tehlikeli cevabı en baştan reddeder: Bazı halkların diğerlerinden daha zeki ya da daha yetenekli olduğu fikrini. Hatta Yeni Gine’de geçirdiği yıllara dayanarak, oradaki insanların ortalama bir Avrupalıdan daha uyanık ve çevresine daha meraklı olduğunu düşündüğünü söyler. Ona göre cevap insanların genlerinde değil, yaşadıkları kıtaların coğrafyasında aranmalıdır. Kitabın tamamı bu iddianın, adım adım ve kıta kıta ispatıdır.'
        ]
      },
      {
        title: 'Cajamarca’daki Karşılaşma',
        image: { svg: cajamarca, caption: 'Cajamarca, 1532: Pizarro’nun atlıları ve İnka İmparatoru Atahualpa’nın kalabalık ordusu.' },
        text: [
          'Diamond, kitabın kilit sahnesini 16 Kasım 1532’de Peru’nun yüksek dağlarında, Cajamarca kasabasında bulur. Bir yanda İspanyol fatih Francisco Pizarro ve yanındaki yalnızca 168 asker vardır. Öbür yanda ise milyonlarca kişilik İnka İmparatorluğu’nun mutlak hükümdarı Atahualpa ve onu koruyan seksen bin kişilik bir ordu. Buna rağmen Pizarro, birkaç saat içinde binlerce İnka’yı öldürür, Atahualpa’yı esir alır ve bu, koca bir imparatorluğun çöküşünün başlangıcı olur.',
          'Bu inanılmaz sonucu doğrudan açıklayan nedenler aslında ortadadır. İspanyolların çelik kılıçları, zırhları, tüfekleri ve en önemlisi savaşta İnkaların hiç görmediği atları vardır. İnkaların ise taş ve tahta silahları, pamuktan zırhları bulunur. Ayrıca Avrupalılardan önce kıtaya ulaşan çiçek hastalığı, İnka imparatorunu ve halkının önemli bir kısmını çoktan öldürmüş, ülkeyi bir iç savaşa sürüklemiştir. Pizarro’nun gemileri, yazıyla aktarılan bilgisi ve merkezi bir krallığın desteği de bu üstünlüğü tamamlar.',
          'Ama Diamond’a göre asıl soru şudur: Neden Atahualpa İspanya’ya gidip Kral Carlos’u esir almadı? Neden tüfekleri, çelikleri, atları ve okuma yazmayı Avrupalılar geliştirdi? Kitabın adı da işte bu üç “yakın nedenden” gelir: tüfek, mikrop ve çelik. Diamond’ın hedefi, bu yakın nedenlerin arkasında yatan çok daha derin ve çok daha eski nedenleri bulmaktır. Bu nedenlerin hepsi, ona göre, tek bir büyük olayla başlar: tarımın doğuşuyla.'
        ]
      },
      {
        title: 'Tarımın Doğuşu',
        image: { svg: crescent, caption: 'Bereketli Hilal: buğdayın ve arpanın ilk kez ekildiği topraklar.' },
        text: [
          'Avcı toplayıcılar yiyecek bulmak için sürekli hareket etmek zorundadır. Kalabalık nüfuslar, kalıcı köyler, kenti yöneten krallar ya da yalnızca bir işle uğraşan zanaatkârlar besleyemezler. Tarım ise her şeyi değiştirir. Aynı toprak parçasından on kat, yüz kat daha fazla yiyecek elde edilir. Artan ürün depolanabilir ve böylece yiyecek üretmeyen insanlar, yani askerler, rahipler, memurlar ve mucitler ortaya çıkabilir. Diamond’a göre tüfek, mikrop ve çeliğe giden yolun ilk adımı budur.',
          'Ancak tarım dünyanın her yerinde aynı zamanda ve aynı kolaylıkla başlamamıştır. Yaklaşık on bir bin yıl önce, bugünkü Irak, Suriye ve Güneydoğu Türkiye’yi kapsayan Bereketli Hilal bölgesinde insanlar buğday, arpa, mercimek ve nohut ekmeye başlar. Bu bitkilerin yabani ataları büyük tohumludur, kolay yetişir, kendi kendini döller ve uzun süre saklanabilir. Kısacası evcilleştirilmek için neredeyse hazır bekliyorlardır.',
          'Diğer bölgeler bu kadar şanslı değildir. Mezoamerika’nın en önemli bitkisi olan mısırın yabani atası teosinte, bugünkü koçanın küçük bir parçası bile değildir ve onu besleyici bir ürüne dönüştürmek binlerce yıl sürer. Yeni Gine’de ise tahıl yetiştirmeye uygun neredeyse hiçbir yabani tür yoktur. Avustralya’da ve Kaliforniya’da da durum benzerdir. Yani tarımı bazı halklar daha zeki olduğu için değil, doğa onlara daha uygun bitkiler sunduğu için daha erken keşfetmiştir.'
        ]
      },
      {
        title: 'Anna Karenina İlkesi',
        image: { svg: animals, caption: 'At, sığır ve koyun: Avrasya’nın en değerli armağanları.' },
        text: [
          'Bitkiler kadar önemli olan bir diğer konu da hayvanlardır. Büyük memeliler insanlara et, süt, deri ve yün verir, tarlaları sürer, yük taşır ve savaşta binek olur. Diamond, tarih boyunca evcilleştirilmiş on dört büyük memeli türünü sayar. Bunlardan on üçü, yani koyun, keçi, sığır, domuz, at, deve ve diğerleri, Avrasya’ya aittir. Güney Amerika’da yalnızca lama vardır. Afrika’nın sahra altı bölgesi, Kuzey Amerika ve Avustralya ise hiçbir büyük memeliyi evcilleştirememiştir.',
          'Peki neden zebralar, Afrika bufalosu ya da geyik ehlileştirilemedi? Diamond bu soruyu açıklamak için Tolstoy’un ünlü romanının ilk cümlesinden yola çıkar: “Bütün mutlu aileler birbirine benzer, her mutsuz ailenin ise kendine göre bir mutsuzluğu vardır.” Bir hayvanın evcilleştirilebilmesi için birçok şartı aynı anda sağlaması gerekir. Az yiyecekle hızlı büyümeli, esarette ürüyebilmeli, sakin ve uysal bir mizacı olmalı, kolay paniğe kapılmamalı ve sürü hâlinde bir lidere uyarak yaşamalıdır. Bu şartlardan tek birinin eksikliği bile o türü evcilleştirilemez kılar.',
          'Zebra huysuz ve ısırgandır, yakalandığında bırakmaz. Ceylanlar en ufak tehlikede kaçar ve bir çitin üzerinden kolayca atlar. Gergedan ve fil gibi devler ise ya çok yavaş büyür ya da esaret altında üremez. Avrasya’nın asıl şansı, bütün bu şartları sağlayan türlerin büyük kısmının bu kıtada yaşamasıdır. Bu da, Avrasya toplumlarına başka hiçbir kıtanın sahip olamadığı bir güç ve üretim avantajı kazandırmıştır.'
        ]
      },
      {
        title: 'Kıtaların Ekseni',
        image: { svg: axes, caption: 'Avrasya doğudan batıya, Amerika ve Afrika ise kuzeyden güneye uzanır.' },
        text: [
          'Diamond’ın en özgün fikirlerinden biri, kıtaların haritadaki şekliyle ilgilidir. Avrasya, doğudan batıya doğru uzun bir kuşak hâlinde uzanır. Bu kuşak boyunca enlemler, dolayısıyla günlerin uzunluğu, mevsimler ve iklim aşağı yukarı aynıdır. Bereketli Hilal’de ehlileştirilen buğday, aynı enlemdeki Mısır’da, Yunanistan’da, İran’da ve Hindistan’da da rahatlıkla yetişebilir. Bir yerde bulunan bitki, hayvan ya da yeni bir teknik hızla binlerce kilometre öteye yayılır.',
          'Amerika ve Afrika ise kuzeyden güneye doğru uzanır. Bu kıtalarda yol alan bir bitki ya da hayvan, sıcak ormanlardan kuru çöllere, ılıman vadilerden soğuk dağlara kadar birbirinden çok farklı iklimleri aşmak zorundadır. Meksika’da yetişen mısır, binlerce yıl boyunca And Dağları’na ve bugünkü Amerika Birleşik Devletleri’nin doğusuna ulaşamaz. Mezoamerika’da icat edilen tekerlek ve And Dağları’ndaki lama hiçbir zaman buluşamaz.',
          'Sonuç olarak Avrasya’da insanlar birbirlerinin buluşlarından sürekli yararlanır. Bir bölgede icat edilen bir şey kısa sürede başka bölgelerde de kullanılmaya başlanır. Böylece bir toplum her şeyi kendisi icat etmek zorunda kalmaz. Diğer kıtalarda ise her toplum adeta kendi başına, sıfırdan ilerlemeye çalışır. Diamond’a göre bu basit coğrafi gerçek, insanlık tarihinin akışını belirleyen en önemli etkenlerden biridir.'
        ]
      },
      {
        title: 'Ölümcül Armağan: Mikroplar',
        image: { svg: germs, caption: 'Hayvanlarla iç içe yaşayan kalabalık köylerde doğan salgınlar.' },
        text: [
          'Avrupalıların Amerika’yı fethinde en büyük silahları ne tüfekleri ne de kılıçlarıdır. En büyük silahları, farkında bile olmadan taşıdıkları mikroplardır. Çiçek, kızamık, grip, tifüs ve veba gibi hastalıklar, Amerika yerlilerinin yaklaşık yüzde doksan beşini öldürür. Avrupalı askerler savaş alanına ulaşmadan önce, salgınlar çoğu zaman bütün köyleri, kasabaları ve yönetici aileleri yok etmiş olur.',
          'Bu hastalıkların çoğu aslında hayvanlardan gelir. Kızamık sığır vebasından, çiçek hastalığı sığır çiçeğinden, grip ise domuzlardan ve ördeklerden insanlara geçmiştir. Avrasya’da insanlar binlerce yıl boyunca hayvanlarıyla iç içe, aynı çatı altında yaşamış ve bu mikroplar zamanla insan bedenine uyum sağlamıştır. Üstelik bu hastalıklar ancak kalabalık nüfuslarda yaşayabilen “kalabalık hastalıklarıdır”. Kentler büyüdükçe salgınlar da güçlenir.',
          'Avrasyalılar korkunç salgınlar yaşar, milyonlarca insan ölür. Ama hayatta kalanlar, kuşaklar boyunca bu hastalıklara karşı bağışıklık kazanır. Amerika’da ise evcil hayvan neredeyse olmadığı için bu tür hastalıklar da gelişmemiştir. Yerli halklar bu mikroplarla ilk kez karşılaştığında hiçbir savunmaları yoktur. İronik bir şekilde Avrupalılar, Amerika’dan geri dönerken yanlarında bu ölçüde öldürücü bir hastalık götürmezler. Mikroplar tarihin tek yönlü akan bir silahı olur.'
        ]
      },
      {
        title: 'Yazı, Teknoloji ve Devlet',
        image: { svg: writing, caption: 'Sümer’in kil tabletlerinden matbaaya ve okyanusu aşan gemilere.' },
        text: [
          'Tarımla birlikte gelen nüfus artışı ve yiyecek fazlası, karmaşık toplumların ortaya çıkmasını sağlar. Diamond, insan topluluklarını dört aşamada inceler: Birkaç düzine kişiden oluşan avcı toplayıcı grupları, birkaç yüz kişilik kabileleri, binlerce kişiyi yöneten şefliklere ve sonunda on binlerce, milyonlarca insanı yöneten devletleri. Devletler vergi toplar, ordular kurar, yollar yapar ve yeni topraklar fetheder. Ama aynı zamanda halkı sömüren bir “kleptokrasi”, yani soyguncular yönetimi de hâline gelebilirler.',
          'Yazı da bu toplumların bir ürünüdür. Dünya tarihinde yazı yalnızca birkaç kez, birbirinden bağımsız olarak icat edilmiştir: Önce Sümer’de, sonra muhtemelen Mezoamerika’da ve Çin’de. Diğer bütün halklar ya bu yazıları ödünç almış ya da onlardan esinlenerek kendi alfabelerini geliştirmiştir. Yazı; vergileri kaydetmeyi, emirleri uzak bölgelere iletmeyi ve bilgiyi kuşaktan kuşağa aktarmayı mümkün kılar. Pizarro’nun Amerika hakkında bildiği her şey de yazıyla taşınan bilgilerden gelmiştir.',
          'Teknoloji hakkında ise Diamond yaygın bir inancı ters yüz eder. Ona göre “ihtiyaç icadın anasıdır” sözü çoğu zaman yanlıştır. Asıl olan, icadın ihtiyacın anası olmasıdır. Pek çok buluş önce bir meraktan ya da tesadüften doğar, insanlar ona ancak sonradan bir kullanım alanı bulur. Bir buluşun yayılması ise toplumun büyüklüğüne, diğer toplumlarla ne kadar temas hâlinde olduğuna ve yeniliğe ne kadar açık olduğuna bağlıdır. Bu açıdan da büyük ve birbirine bağlı Avrasya, diğer kıtalara göre çok daha avantajlıdır.'
        ]
      },
      {
        title: 'Neden Çin Değil de Avrupa?',
        image: { svg: fleets, caption: 'Zheng He’nin dev hazine filosu ve Avrupa’nın küçük ama sayısız gemisi.' },
        text: [
          'Kitabın son bölümleri, Diamond’ın teorisini dünyanın farklı köşelerinde sınar. Avustralya’nın neden avcı toplayıcı kaldığını, Afrika’da Bantu halklarının tarım sayesinde kıtanın güneyine nasıl yayıldığını ve Pasifik adalarında aynı kökenden gelen halkların farklı adalarda nasıl bambaşka toplumlara dönüştüğünü anlatır. Bu son örnekte, Chatham Adaları’nda yaşayan barışçıl Moriori halkı, aynı Polinezya atalarından gelen ama tarımla güçlenen Maoriler tarafından 1835’te acımasızca yok edilir.',
          'Diamond’ın sorduğu son büyük soru şudur: Avrasya’nın en zengin ve en gelişmiş medeniyeti olan Çin, neden dünyayı fethedemedi? 15. yüzyılın başında Amiral Zheng He’nin dev hazine gemileri Hint Okyanusu’nu aşıp Afrika kıyılarına kadar ulaşmıştır. Bu gemiler, Kolomb’un gemilerinden onlarca kat büyüktür. Ama 1433’te saraydaki bir iktidar çatışması sonucunda imparator filoyu geri çağırır, tersaneler kapatılır ve okyanus yolculukları yasaklanır. Tek bir kararla, koca bir ülke denizden çekilir.',
          'Diamond’a göre bunun nedeni yine coğrafyadır. Çin’in düzgün kıyıları ve büyük nehirleri ülkenin erkenden tek bir devlet altında birleşmesini sağlamıştır. Bu birlik büyük bir güçtür, ama yanlış bir karar bütün ülkeyi etkiler. Avrupa ise dağlar, yarımadalar ve adalarla bölünmüş, birbirleriyle sürekli rekabet eden küçük devletlerden oluşur. Kolomb’un projesini bir kral reddettiğinde, bir başka kral destekleyebilir. Diamond, kitabını tarihin de bir bilim gibi incelenebileceğini, insan toplumlarının kaderinin genlerde değil, coğrafyanın sunduğu fırsatlarda yazılı olduğunu söyleyerek bitirir.'
        ]
      }
    ]
  };
})();
