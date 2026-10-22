// Satranç — Stefan Zweig (1942)
// Sahneler data/scenes.js yardımcılarıyla çizilir; ileride image.src ile gerçek çizimlerle değiştirilebilir.
(() => {
  const { svg, glow, skyline, figure, seated, streaks, dots } = window.Scene;

  // Perspektifli satranç tahtası (x,y: ön kenarın ortası, w: genişlik)
  const board = (x, y, w, light = '#e8dcc4', dark = '#3a2a1e', tilt = .45) => {
    const n = 8, h = w * tilt, top = w * .62;
    let out = '';
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
      const y0 = y - h * (r / n), y1 = y - h * ((r + 1) / n);
      const w0 = w - (w - top) * (r / n), w1 = w - (w - top) * ((r + 1) / n);
      const xa = x - w0 / 2 + w0 * c / n, xb = x - w0 / 2 + w0 * (c + 1) / n;
      const xc = x - w1 / 2 + w1 * (c + 1) / n, xd = x - w1 / 2 + w1 * c / n;
      out += `<polygon points="${xa},${y0} ${xb},${y0} ${xc},${y1} ${xd},${y1}" fill="${(r + c) % 2 ? dark : light}"/>`;
    }
    return out;
  };

  // Piyon / şah silueti
  const pawn = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}">
    <ellipse cx="0" cy="0" rx="10" ry="3"/><path d="M-8 0 Q-4 -10 -4 -16 H4 Q4 -10 8 0 Z"/><circle cx="0" cy="-20" r="6"/></g>`;
  const king = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}">
    <ellipse cx="0" cy="0" rx="12" ry="3.5"/><path d="M-10 0 Q-5 -14 -6 -30 H6 Q5 -14 10 0 Z"/>
    <rect x="-8" y="-34" width="16" height="5" rx="2"/><rect x="-1.5" y="-46" width="3" height="12"/><rect x="-5" y="-42" width="10" height="3"/></g>`;

  // 1 — Gece okyanusunda giden yolcu gemisi
  const ship = svg({
    sky: ['#0b1426', '#1c2c4a', '#3a4a6a'],
    body: id => `
      ${dots(3, 120, '#fff', 1.1, .8, 0, 200)}
      ${glow(id, 650, 70, 120, '#e8eeff', .5)}<circle cx="650" cy="70" r="22" fill="#f2f4ff"/>
      <rect y="260" width="800" height="140" fill="#0c1a2e"/>
      ${Array.from({ length: 10 }, (_, i) => `<path d="M0 ${275 + i * 13} Q200 ${268 + i * 13} 400 ${275 + i * 13} T800 ${275 + i * 13}" stroke="#2a4466" stroke-width="2" fill="none" opacity="${.7 - i * .05}"/>`).join('')}
      <path d="M630 270 L600 400 L700 400 L670 270 Z" fill="#cfd8ff" opacity=".1" filter="url(#${id}soft)"/>
      <path d="M120 250 H600 L560 290 H160 Z" fill="#05080e"/>
      <rect x="190" y="215" width="330" height="36" fill="#0b0f18"/><rect x="230" y="190" width="230" height="26" fill="#0b0f18"/>
      ${Array.from({ length: 16 }, (_, i) => `<rect x="${200 + i * 20}" y="228" width="8" height="10" fill="#ffd28a" opacity="${.5 + (i % 3) * .2}"/>`).join('')}
      <rect x="300" y="140" width="34" height="52" fill="#1a1a1a"/><rect x="300" y="140" width="34" height="10" fill="#8a2a2a"/>
      <path d="M318 130 q-30 -40 10 -80 q40 -30 0 -60" stroke="#8090a8" stroke-width="18" fill="none" opacity=".18" filter="url(#${id}blur)"/>`
  });

  // 2 — Köy papazının odasında gaz lambası altında satranç
  const village = svg({
    sky: ['#1a120c', '#2a1c12', '#1a120c'],
    body: id => `
      ${glow(id, 400, 140, 300, '#ffb050', .5)}
      <rect x="560" y="60" width="120" height="140" fill="#24303f"/><line x1="620" y1="60" x2="620" y2="200" stroke="#1a120c" stroke-width="6"/><line x1="560" y1="130" x2="680" y2="130" stroke="#1a120c" stroke-width="6"/>
      ${dots(7, 30, '#fff', 1, .7, 70, 190).replace(/cx="(\d+)"/g, (m, v) => `cx="${565 + (+v % 110)}"`)}
      <path d="M392 150 h16 l6 -30 h-28 z" fill="#3a2414"/><ellipse cx="400" cy="112" rx="10" ry="14" fill="#fff0c0"/>
      ${glow(id, 400, 112, 50, '#fff0c0', .9)}
      <rect y="300" width="800" height="100" fill="#140d08"/>
      <path d="M200 240 H600 L620 262 H180 Z" fill="#5a3a22"/>
      ${board(400, 258, 160, '#e8d4a8', '#4a2e1a', .2)}
      ${pawn(370, 244, .5, '#111')}${king(430, 244, .5, '#f2e6cc')}
      ${seated(250, 248, 1.8, '#0c0806')}
      ${seated(560, 252, 1.3, '#0c0806', true)}
      <path d="M232 152 q-6 -10 0 -20 l10 4 z" fill="#0c0806"/>`
  });

  // 3 — Geminin sigara salonunda turnuva
  const salon = svg({
    sky: ['#2a1a12', '#3a2618', '#24160e'],
    body: id => `
      ${[200, 400, 600].map(x => `<line x1="${x}" y1="0" x2="${x}" y2="40" stroke="#000"/>${glow(id, x, 52, 110, '#ffcf80', .45)}<circle cx="${x}" cy="52" r="10" fill="#fff0c8"/>`).join('')}
      ${[100, 300, 500, 700].map(x => `<circle cx="${x}" cy="130" r="26" fill="#0e1622" stroke="#6a4a2a" stroke-width="5"/>`).join('')}
      <rect y="300" width="800" height="100" fill="#1a0f0a"/>
      <path d="M220 270 H580 L600 290 H200 Z" fill="#4a2e1c"/>
      ${board(400, 286, 220, '#efe2c8', '#5a3a26', .28)}
      ${king(370, 272, .7, '#f4ead4')}${king(440, 262, .6, '#111')}${pawn(410, 276, .55, '#f4ead4')}${pawn(355, 260, .5, '#111')}
      ${seated(200, 282, 1.9, '#0a0606')}
      ${figure(640, 300, 2, '#0a0606')}
      <g opacity=".85">${[90, 130, 720, 760].map((x, i) => figure(x, 310, 1.6 + (i % 2) * .2, '#120a08', { hat: i % 2 === 0 })).join('')}</g>
      <path d="M190 180 q20 -40 -5 -80 q-20 -30 10 -70" stroke="#e8dcc4" stroke-width="5" fill="none" opacity=".14" filter="url(#${id}soft)"/>`
  });

  // 4 — 1938 Viyana, gece ve Gestapo arabası
  const vienna = svg({
    sky: ['#0e0e14', '#1c1c26', '#2a2a32'],
    vignette: .75,
    body: id => `
      ${skyline({ y: 300, color: '#0a0a0e', seed: 41, lit: .06, light: '#d9c48a', minH: 120, maxH: 240 })}
      <rect y="300" width="800" height="100" fill="#121218"/>
      ${Array.from({ length: 6 }, (_, i) => `<rect x="${i * 140}" y="340" width="70" height="5" fill="#2a2a32"/>`).join('')}
      <rect x="120" y="140" width="6" height="170" fill="#050507"/>${glow(id, 123, 132, 110, '#e8d8a0', .5)}<circle cx="123" cy="132" r="7" fill="#fff4cc"/>
      <path d="M460 300 h220 q10 -40 -20 -46 h-60 q-20 -30 -60 -30 h-40 q-30 0 -40 30 z" fill="#050507"/>
      <circle cx="510" cy="306" r="16" fill="#050507"/><circle cx="640" cy="306" r="16" fill="#050507"/>
      <polygon points="680,276 800,250 800,320 680,290" fill="#fff2c0" opacity=".16" filter="url(#${id}soft)"/>
      ${figure(400, 310, 1.8, '#050507', { hat: true })}${figure(440, 310, 1.8, '#050507', { hat: true })}
      ${figure(340, 312, 1.7, '#0c0c10', {})}
      <rect x="330" y="70" width="140" height="90" fill="#5a1414" opacity=".85"/><circle cx="400" cy="115" r="26" fill="#d9d0c0" opacity=".9"/>
      ${streaks(51, 120, '#9aa0b0', 22, -4, .3)}`
  });

  // 5 — Otel odasında hücre hapsi
  const cell = svg({
    sky: ['#d6d2c6', '#c4bfb2', '#a8a294'],
    vignette: .65,
    grain: .22,
    body: id => `
      <polygon points="0,0 140,60 140,330 0,400" fill="#b2ac9e"/><polygon points="800,0 660,60 660,330 800,400" fill="#b2ac9e"/>
      <polygon points="140,330 660,330 800,400 0,400" fill="#8a8476"/>
      <rect x="140" y="60" width="520" height="270" fill="#cfcabe"/>
      <rect x="440" y="100" width="110" height="140" fill="#e8ecef"/>
      <rect x="440" y="100" width="110" height="140" fill="none" stroke="#7a7466" stroke-width="6"/><line x1="495" y1="100" x2="495" y2="240" stroke="#7a7466" stroke-width="4"/>
      <rect x="440" y="100" width="110" height="20" fill="#7a7466" opacity=".4"/>
      <path d="M180 270 H400 V300 H180 Z" fill="#efebe0"/><rect x="180" y="250" width="50" height="22" rx="6" fill="#fff"/>
      <rect x="176" y="300" width="10" height="30" fill="#5a5448"/><rect x="394" y="300" width="10" height="30" fill="#5a5448"/>
      <rect x="590" y="250" width="40" height="80" fill="#6a6456"/><rect x="584" y="244" width="52" height="8" fill="#5a5448"/>
      ${seated(330, 270, 1.5, '#2a2620')}
      <circle cx="640" cy="40" r="8" fill="#fffbe8"/>${glow(id, 640, 40, 80, '#fffbe8', .6)}`
  });

  // 6 — Yatak örtüsü üzerinde ekmek içi taşlar ve çalınan kitap
  const book = svg({
    sky: ['#3a3630', '#4a453c', '#2a2620'],
    body: id => `
      <polygon points="540,0 700,0 560,400 200,400" fill="#f4ecd4" opacity=".12" filter="url(#${id}blur)"/>
      <rect y="0" width="800" height="400" fill="#5a5448" opacity=".25"/>
      ${board(400, 380, 640, '#d8d0bc', '#7a6e5a', .5)}
      ${[[300, 330], [360, 300], [470, 340], [520, 290], [420, 270], [330, 260]].map(([x, y], i) => pawn(x, y, .9 + (y - 260) / 200, i % 2 ? '#f0e6d0' : '#4a3a2a')).join('')}
      ${king(560, 330, 1.2, '#f0e6d0')}${king(260, 300, 1, '#4a3a2a')}
      <g transform="rotate(-12 150 140)">
        <rect x="80" y="90" width="150" height="110" fill="#6a2a22"/><rect x="88" y="96" width="134" height="98" fill="#7a3a2a"/>
        <rect x="100" y="120" width="110" height="6" fill="#d9b46a"/><rect x="110" y="134" width="90" height="4" fill="#d9b46a" opacity=".7"/>
        <g transform="translate(155 175) scale(.7)" fill="#d9b46a"><path d="M-8 0 Q-4 -10 -4 -16 H4 Q4 -10 8 0 Z"/><circle cx="0" cy="-20" r="6"/></g>
      </g>`
  });

  // 7 — Zihinde kendine karşı oynanan sonsuz oyun, bölünen benlik
  const madness = svg({
    sky: ['#0a0610', '#1a0e22', '#2a0e1a'],
    vignette: .8,
    body: id => `
      ${glow(id, 400, 200, 300, '#a0306a', .35)}
      ${Array.from({ length: 5 }, (_, i) => `<g opacity="${.55 - i * .09}" transform="rotate(${i * 14 - 28} 400 220)">${board(400, 300 - i * 6, 520 - i * 70, '#f0e0ff', '#2a1030', .3)}</g>`).join('')}
      ${king(330, 230, 2, '#f4eaff')}${king(470, 230, 2, '#0a0610')}
      <g>${figure(250, 330, 2.6, '#000')}</g>
      <g opacity=".35" transform="translate(500 0) scale(-1 1)">${figure(-50, 330, 2.6, '#000')}</g>
      <path d="M260 150 Q400 60 540 150" stroke="#f4eaff" stroke-width="2" stroke-dasharray="4 8" fill="none" opacity=".5"/>
      ${dots(61, 80, '#f0c0ff', 1.2, .5)}`
  });

  // 8 — Son oyun: güvertede sabah, uzakta kıyı
  const finale = svg({
    sky: ['#6a8ab0', '#b8c8d8', '#f2dcc0'],
    vignette: .35,
    grain: .12,
    body: id => `
      ${glow(id, 640, 230, 220, '#fff0d0', .7)}
      <path d="M0 240 Q80 220 160 236 Q240 210 340 238 Q420 226 520 240 V250 H0 Z" fill="#7a8aa0" opacity=".8"/>
      <rect y="245" width="800" height="155" fill="#5a7a9a"/>
      ${Array.from({ length: 8 }, (_, i) => `<line x1="${560 + (i * 41) % 160}" y1="${255 + i * 10}" x2="${600 + (i * 41) % 160}" y2="${255 + i * 10}" stroke="#fff4d8" stroke-width="2" opacity="${.6 - i * .06}"/>`).join('')}
      <rect y="300" width="800" height="100" fill="#3a2a1e"/>
      ${Array.from({ length: 10 }, (_, i) => `<line x1="${i * 90}" y1="300" x2="${i * 90 - 30}" y2="400" stroke="#2a1c12" stroke-width="3"/>`).join('')}
      <rect y="250" width="800" height="6" fill="#2a1c12"/>${Array.from({ length: 20 }, (_, i) => `<rect x="${i * 42}" y="256" width="4" height="44" fill="#2a1c12"/>`).join('')}
      <rect x="300" y="300" width="200" height="12" fill="#4a3426"/>
      ${board(400, 302, 150, '#efe2c8', '#5a3a26', .22)}
      ${king(385, 294, .55, '#111')}
      ${seated(260, 304, 1.6, '#16120e')}
      ${figure(560, 340, 2.1, '#1a2230', {})}
      ${figure(640, 340, 1.9, '#2a2a2a', { hat: true })}`
  });

  window.SUMMARIES['satranc'] = {
    pages: [
      {
        title: 'Buenos Aires’e Giden Gemi',
        image: { svg: ship, caption: 'New York’tan Buenos Aires’e doğru yol alan büyük yolcu gemisi.' },
        text: [
          'Hikâye, New York limanından Buenos Aires’e doğru yola çıkmak üzere olan büyük bir yolcu gemisinde başlar. Avrupa’nın savaşın gölgesine girdiği yıllardır ve güvertedeki kalabalık arasında bir telaş, bir uğurlama heyecanı vardır. Adını hiç öğrenmediğimiz anlatıcı, yanındaki tanıdığından şaşırtıcı bir haber duyar: Az önce kalabalığı yararak gemiye binen genç adam, dünya satranç şampiyonu Mirko Czentovic’tir ve Arjantin’de bir turnuvaya gitmektedir.',
          'Anlatıcı, insan ruhunun tuhaflıklarına ve tek bir şeye saplantıyla bağlanmış zihinlere her zaman merak duymuş biridir. Bir insanın hayatını altmış dört kareden oluşan bir tahtaya adamasını, bütün dünyayı siyah ve beyaz taşların hareketlerine indirgemesini hem hayranlıkla hem de biraz ürpertiyle düşünür. Uzun yolculuk boyunca bu sıra dışı adamı yakından tanımaya, onun nasıl biri olduğunu çözmeye karar verir.',
          'Zweig, bu küçük romanı sürgündeyken, ölümünden kısa bir süre önce yazmıştır. Okyanusun ortasında, karadan ve dünyadan kopuk bir gemi, hikâyenin geçtiği yer olarak bilinçli bir seçimdir. Herkesin birbirine yakın ama aslında yabancı olduğu bu kapalı dünya, birazdan karşılaşacağımız iki adamın, iki farklı zihnin çarpışmasına sahne olacaktır.'
        ]
      },
      {
        title: 'Mirko Czentovic’in Hikâyesi',
        image: { svg: village, caption: 'Köy papazının odasında, gaz lambasının ışığı altında oynanan ilk oyunlar.' },
        text: [
          'Anlatıcının tanıdığı, şampiyonun geçmişini ayrıntılarıyla anlatır. Mirko, Tuna kıyısında yoksul bir kayıkçının oğludur. Babası bir kazada ölünce on iki yaşındaki çocuğu köyün iyi kalpli papazı yanına alır. Papaz ona okuma yazma öğretmek için yıllarca sabırla uğraşır, ama Mirko’nun kalın kafası hiçbir şeyi almaz. Sessiz, ağır, uyuşuk bir çocuktur. Ne bir soru sorar ne de bir şeye ilgi gösterir. Sadece kendisine söylenen işleri ağır ağır yapar.',
          'Her akşam papaz, köyün jandarma çavuşuyla bir parti satranç oynar. Bir gece çavuş acil bir işle çağrılınca yarım kalan oyunu Mirko şaşırtıcı bir ustalıkla bitirir. Hayretler içinde kalan papaz onunla oynamaya başlar ve birkaç gün içinde bu cahil çocuğa bir kez bile yenemez hâle gelir. Haber kasabaya, sonra şehre yayılır. Bir kont onun eğitimini üstlenir ve Mirko kısa sürede bütün büyük ustaları birer birer yener.',
          'Yirmi yaşına geldiğinde dünya şampiyonudur. Ama satranç tahtasının dışında hâlâ aynı köylü çocuktur. Tek bir cümleyi bile imla hatası yapmadan yazamaz, kitap okumaz, sohbet etmez. Hayal gücünden yoksun olduğu için gözü kapalı, yani tahtaya bakmadan oyun oynayamaz. Üstelik son derece açgözlüdür. Yeteneğini kimseye bedavaya göstermez ve her fırsatta para ister. Anlatıcı bu adamda dâhiliğin değil, akla yalnızca tek bir yönde çalışma izni verilmiş garip bir makinenin varlığını sezer.'
        ]
      },
      {
        title: 'Sigara Salonundaki Oyun',
        image: { svg: salon, caption: 'Geminin sigara salonunda, şampiyona karşı toplanmış amatörler.' },
        text: [
          'Czentovic’le yakınlaşmanın tek yolunun satranç olduğunu anlayan anlatıcı, sigara salonunda karısıyla oynamaya başlar ve şampiyonun ilgisini çekmeyi umar. Ama yemlenen Czentovic değil, McConnor adında, yenilmeye hiç tahammülü olmayan, kendini beğenmiş ve zengin bir İskoç maden mühendisi olur. McConnor, şampiyonla oynamak için parasının önemli olmadığını söyler ve Czentovic, oyun başına iki yüz elli dolar karşılığında onlarla oynamayı kabul eder.',
          'İlk oyun tam bir aşağılanmadır. Czentovic, salondaki bütün amatörler birlikte düşünüp tartışarak hamle yapmalarına rağmen masaya neredeyse bakmadan, hamlesini yapıp hemen yanlarından uzaklaşarak onları dakikalar içinde yener. Sonra paranın hesabını sorar. McConnor’ın gururu yaralanmıştır, hemen rövanş ister.',
          'İkinci oyunda amatörler bu kez daha temkinlidir. Uzun uzun tartışıp, önemli bir piyonu vezir yapmak üzere oldukları bir anda, arkalarında duran bir yabancı birden McConnor’ın kolunu tutar ve fısıldar: “Sakın! Bu hamle felakettir.” Ardından birkaç hamle sonra neler olacağını, şampiyonun hangi tuzağı kurduğunu sanki her şeyi önceden görmüş gibi anlatır. Onun önerdiği hamlelerle oyun, kimsenin beklemediği bir şekilde berabere biter. Czentovic ilk kez başını kaldırıp seyircilere dikkatle bakar.',
          'Gizemli yabancı, kırk beş yaşlarında, solgun yüzlü, sinirli ve ürkek tavırlı bir adamdır. Kimse ona bu kadar ustaca oynamayı nereden öğrendiğini soramadan, sanki kendinden utanmış gibi salondan çıkar. Amatörler hemen onunla şampiyon arasında bir maç ayarlamayı kafalarına koyarlar. Anlatıcı da bu adamın peşine düşmeye gönüllü olur.'
        ]
      },
      {
        title: 'Dr. B. ve 1938 Viyanası',
        image: { svg: vienna, caption: 'Mart 1938: Viyana sokaklarında Gestapo’nun gece baskınları.' },
        text: [
          'Anlatıcı, yabancıyı güvertede bulur ve onu Czentovic’le oynamaya ikna etmeye çalışır. Adam, kendisini Dr. B. olarak tanıtır ve yirmi beş yıldır, belki de daha uzun süredir, bir satranç tahtasının başına oturmadığını söyler. Ama anlatıcının merakla dolu bakışları karşısında, neden yıllardır satranç oynamadığı hâlde bu kadar iyi olduğunu açıklamak ister. Böylece romanın en etkileyici bölümü, Dr. B.’nin kendi ağzından anlattığı hikâye başlar.',
          'Dr. B., Viyana’da babasından kalan küçük ama itibarlı bir avukatlık bürosunu yönetmektedir. Büronun asıl işi, Avusturya’daki büyük manastırların ve imparatorluk ailesinin bazı üyelerinin servetini gizlice yönetmek, bu parayı yurt dışına güvenle aktarmaktır. Naziler iktidara gelmeden önce bile casuslarını her yere sızdırmıştır. Dr. B.’nin bürosu da uzun süredir izlenmektedir.',
          'Mart 1938’de Almanya Avusturya’yı ilhak ettiğinde, Hitler’in askerleri Viyana’ya girdiği gün Dr. B. Gestapo tarafından tutuklanır. Neyse ki en önemli belgeleri son anda yaşlı hizmetçisi aracılığıyla yok etmeyi başarmıştır. Naziler ise onun elindeki bilgileri istemektedir: hangi paranın nerede saklandığını, hangi hesabın kime ait olduğunu. Bunun için onu bir toplama kampına göndermezler. Ona çok daha sinsi bir işkence uygularlar.'
        ]
      },
      {
        title: 'Hiçliğin Odası',
        image: { svg: cell, caption: 'Metropol Oteli’nde bir oda: masa, yatak, lavabo ve hiç açılmayan bir pencere.' },
        text: [
          'Dr. B., Gestapo’nun karargâhı olarak kullandığı Metropol Oteli’nde tek kişilik bir odaya kapatılır. Oda temiz ve rahat gibi görünür: Bir yatak, bir masa, bir sandalye, bir lavabo ve buzlu camlı bir pencere vardır. Ama onun dışında hiçbir şey yoktur. Ne bir kitap, ne bir gazete, ne bir kâğıt parçası, ne de bir kalem. Saatini almışlardır, zamanı bile bilemez. Konuştuğu tek insan yemeğini getiren ve tek kelime etmeyen nöbetçidir.',
          'Naziler, bu yöntemle insanın zihnini kendi kendini yemeye zorlamaktadırlar. Çevresinde düşünecek hiçbir şey bulunmayan Dr. B., günlerce, haftalarca yalnızca kendi düşünceleriyle baş başa kalır. Zaman zaman sorguya çekilir ve her seferinde önceki ifadelerinde ne söylediğini, neyi saklayıp neyi açıkladığını hatırlamaya çalışarak, kendi zihninde tutarlı bir yalan inşa etmek zorunda kalır. Bu bekleyiş, onun için her türlü fiziksel işkenceden daha korkunçtur.',
          'Dört ay sonra kendini delirmenin eşiğinde hisseder. Hiç durmadan aynı düşünceler kafasında döner, gece gündüz birbirine karışır. Bir gün sorgu odasının önünde beklerken, asılı duran bir subay paltosunun cebinde dikdörtgen bir şekil fark eder. Bir kitap! Kalbi deli gibi çarparak, kimse görmeden onu alır ve pantolonunun içine saklar. Hücresine dönerken aklında tek bir şey vardır: Nihayet okuyacak bir şeyi olacaktır.'
        ]
      },
      {
        title: 'Çalınan Kitap',
        image: { svg: book, caption: 'Kareli yatak örtüsü bir satranç tahtasına, ekmek içi taşlara dönüşür.' },
        text: [
          'Odasına döner dönmez kitabı açar ve büyük bir hayal kırıklığına uğrar. Elindeki şey bir roman ya da şiir kitabı değil, ünlü ustaların oynadığı yüz elli satranç partisini anlatan bir derlemedir. Sayfalar, onun için hiçbir anlam taşımayan harf ve sayılarla, “e2-e4” gibi şifreli işaretlerle doludur. Öfkeyle kitabı bir kenara fırlatır. Ama birkaç gün sonra, başka hiçbir şeyi olmadığı için yeniden eline alır.',
          'Odasındaki yatak örtüsünün kareli olduğunu fark eder ve onu katlayarak sekize sekizlik bir tahta yapar. Ekmeğinin içinden taşlar yoğurur, bir kısmını toz ile karartarak siyah taşlar elde eder. Kitaptaki partileri sabırla, hamle hamle yeniden oynamaya başlar. Haftalar geçtikçe işaretlerin anlamı çözülür ve tahtaya gerek duymadan bütün oyunları zihninde canlandırabildiğini fark eder. Artık yatak örtüsü de ekmek içi taşlar da gereksizdir.',
          'Bu yeni uğraş, onu bir süreliğine kurtarır. Zihni yeniden çalışmaya, düşünceleri bir düzene girmeye başlar. Sorgularda daha soğukkanlı, daha dikkatli olur, sorgucuların kurduğu tuzakları fark edebilir hâle gelir. Ama yaklaşık üç ay sonra kitaptaki bütün partileri ezberlemiştir. Yüz elli oyunun her hamlesini, her taşın yerini bilmektedir ve önünde yine o korkunç boşluk açılır.'
        ]
      },
      {
        title: 'Satranç Zehirlenmesi',
        image: { svg: madness, caption: 'Kendine karşı oynanan sonsuz oyun: ikiye bölünen bir zihin.' },
        text: [
          'Oyunlar bitince Dr. B. imkânsız bir şey yapmaya karar verir: Kendine karşı satranç oynamak. Satrancın bütün güzelliği, rakibin ne yapacağını bilmemekte yatar. Kendisiyle oynayan biri ise hem beyazın hem de siyahın planlarını aynı anda bilmek zorundadır. Bu durum, Dr. B.’nin zihnini iki ayrı benliğe, “beyaz ben” ve “siyah ben” olarak bölmeye zorlar. İkisi de kazanmak ister, ikisi de diğerinin hamlesini sabırsızlıkla bekler.',
          'Çok geçmeden bu oyun bir saplantıya, kendi deyişiyle bir “satranç zehirlenmesine” dönüşür. Gece gündüz oynar, uyuyamaz, yemek yiyemez. Hamleleri giderek hızlanır, zihni durmaksızın bir taraftan diğerine savrulur. Odada bir aşağı bir yukarı yürür, kendi kendine bağırır, öfkeden titrer. Gerçekle oyunu birbirinden ayıramaz hâle gelir. Bir sabah ağzından köpükler gelerek nöbetçiye saldırır, pencereyi yumruklar ve elini kesip kan içinde yere yığılır.',
          'Gözlerini bir hastane yatağında açar. Ona bakan doktor iyi kalpli bir adamdır ve Nazilere karşı derin bir öfke taşır. Dr. B.’nin yaşadıklarını dinleyince, onu deli olduğuna dair bir raporla akıl hastanesine gönderilmekten kurtarır ve serbest bırakılmasını sağlar. Bunun tek şartı, Dr. B.’nin iki hafta içinde ülkeyi terk etmesidir. Doktor ona son bir uyarıda bulunur: Bir daha asla satranç oynamamalıdır, çünkü zehir yeniden uyanabilir.'
        ]
      },
      {
        title: 'Son Oyun',
        image: { svg: finale, caption: 'Güvertede bir sabah: tahta, iki rakip ve tutulan bir söz.' },
        text: [
          'Dr. B. hikâyesini bitirdikten sonra, gerçek bir rakibe karşı gerçek bir tahtada oynayıp oynayamayacağını merak ettiğini itiraf eder. Sadece bir oyun oynayacağına, sonra bir daha asla tahtanın başına geçmeyeceğine söz verir. Ertesi gün sigara salonu kalabalıktır. Czentovic her zamanki gibi umursamaz bir tavırla oturur. Ama oyun ilerledikçe şampiyonun yüzündeki o soğuk kayıtsızlık yavaş yavaş kaybolur. Dr. B. hamlelerini hiç düşünmeden, şaşırtıcı bir hızla yapar ve sonunda dünya şampiyonunu yener.',
          'Yenilgiyi hazmedemeyen Czentovic hemen bir rövanş ister. Bu sefer taktiğini değiştirir. Dr. B.’nin sabırsızlığını fark etmiştir ve her hamlesinde dakikalarca bekler, neredeyse kımıldamadan tahtaya bakar. Dr. B. ise bu bekleyişe dayanamaz. Masanın etrafında huzursuzca dolaşmaya, kendi kendine konuşmaya başlar. Anlatıcı onun gözlerinde, Metropol Oteli’ndeki o korkunç günlerin delice ışığını yeniden görür. Dr. B. artık önündeki oyunu değil, kafasındaki sayısız başka oyunu oynamaktadır.',
          'Sonunda tahtada olmayan bir şahı tehdit ettiğini sanarak “Şah!” diye bağırır. Herkes şaşkınlıkla susar. Anlatıcı hızla yanına gider ve kolunu sıkıca kavrayarak elindeki eski yara izine dokunur. Dr. B. bir anda kendine gelir, yüzü kıpkırmızı olur. Oyundan çekilir, herkesten tek tek özür diler ve bunun hayatındaki son satranç denemesi olduğunu söyleyerek salondan çıkar. Czentovic ise taşları toplarken soğuk bir sesle, bir amatöre göre fena olmadığını söylemekle yetinir.',
          'Satranç, Zweig’ın Nazi baskısının insan ruhunda açtığı yaraları anlatan son eseridir. Bir yanda duygusuz, yalnızca tek bir yetenekte uzmanlaşmış bir makine gibi Czentovic, diğer yanda kültürlü, hassas ve zihni zorla parçalanmış Dr. B. vardır. Zweig, yalnızlığın ve zihinsel işkencenin bir insanı nasıl dönüştürebileceğini, bir oyunun nasıl hem kurtuluş hem de yıkım olabileceğini unutulmaz bir yoğunlukla anlatır.'
        ]
      }
    ]
  };
})();
