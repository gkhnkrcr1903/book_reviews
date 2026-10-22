// Yüzyıllık Yalnızlık — Gabriel García Márquez (1967)
// Sahneler data/scenes.js yardımcılarıyla çizilir; ileride image.src ile gerçek çizimlerle değiştirilebilir.
(() => {
  const { svg, glow, skyline, figure, seated, streaks, dots } = window.Scene;

  const butterflies = (seed, n, c, yMin = 40, yMax = 260) => Array.from({ length: n }, (_, i) => {
    const x = (i * 97 + seed * 13) % 800, y = yMin + ((i * 53 + seed) % (yMax - yMin));
    return `<g transform="translate(${x} ${y}) rotate(${(i * 37) % 60 - 30})" fill="${c}"><path d="M0 0 Q-10 -10 -12 0 Q-10 8 0 2 Z"/><path d="M0 0 Q10 -10 12 0 Q10 8 0 2 Z"/></g>`;
  }).join('');
  const palm = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})" stroke="${c}" fill="none" stroke-linecap="round"><path d="M0 0 Q6 -60 0 -120" stroke-width="8"/>
    ${[-60, -30, 0, 30, 60, 90, -90].map(a => `<path d="M0 -120 q${Math.cos(a * Math.PI / 180) * 30} ${-10 + Math.abs(a) / 6} ${Math.cos(a * Math.PI / 180) * 60} ${20 + Math.abs(a) / 4}" stroke-width="5"/>`).join('')}</g>`;
  const house = (x, y, s, c, lit = '#ffd88a') => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-80" y="-60" width="160" height="60" fill="${c}"/><polygon points="-90,-60 0,-96 90,-60" fill="#8a4a2a"/>${[-60, -20, 40].map(dx => `<rect x="${dx}" y="-44" width="18" height="22" fill="${lit}" opacity=".8"/>`).join('')}<rect x="10" y="-36" width="20" height="36" fill="#3a2414"/></g>`;

  // 1 — Buz ve çingeneler
  const ice = svg({
    sky: ['#2a3a2a', '#4a5a3a', '#6a6a4a'],
    vignette: .55,
    body: id => `
      ${glow(id, 400, 220, 220, '#c8f0ff', .55)}
      <rect x="300" y="160" width="200" height="140" rx="10" fill="#c8ecf8" opacity=".85"/>${Array.from({ length: 6 }, (_, i) => `<line x1="${320 + i * 30}" y1="170" x2="${330 + i * 28}" y2="290" stroke="#ffffff" stroke-width="2" opacity=".7"/>`).join('')}
      <path d="M200 160 Q400 60 600 160 L600 300 H200 Z" fill="#5a2a1a" opacity=".6"/>
      ${palm(100, 320, 1.1, '#1a2a14')}${palm(720, 320, 1.2, '#1a2a14')}
      <rect y="300" width="800" height="100" fill="#2a2414"/>
      ${figure(240, 340, 1.6, '#1a0e06', { hat: true })}${figure(560, 340, 1.4, '#1a0e06')}${figure(600, 340, 1.1, '#1a0e06')}
      ${dots(231, 40, '#c8f0ff', 1.4, .6, 140, 300)}`
  });

  // 2 — Macondo’nun kuruluşu
  const macondo = svg({
    sky: ['#6a9ab0', '#a8c8c8', '#e8e0c0'],
    vignette: .35, grain: .14,
    body: id => `
      ${glow(id, 640, 90, 160, '#fff8d8', .7)}
      <path d="M0 220 L120 140 L240 190 L360 120 L480 180 L600 130 L800 200 V260 H0 Z" fill="#4a7a5a"/>
      <rect y="250" width="800" height="40" fill="#5a9ab0"/>${Array.from({ length: 6 }, (_, i) => `<ellipse cx="${80 + i * 130}" cy="${266}" rx="16" ry="6" fill="#e8f0f0" opacity=".8"/>`).join('')}
      <path d="M0 290 Q400 270 800 290 V400 H0 Z" fill="#8a9a5a"/>
      ${[[160, .8], [300, .9], [460, 1], [620, .85]].map(([x, s]) => house(x, 320, s, '#e8dcc4')).join('')}
      ${palm(60, 330, 1, '#2a4a2a')}${palm(740, 330, 1.1, '#2a4a2a')}`
  });

  // 3 — Kestane ağacına bağlı José Arcadio Buendía
  const chestnut = svg({
    sky: ['#4a5a3a', '#6a7a4a', '#8a8a5a'],
    vignette: .55, grain: .18,
    body: id => `
      <g transform="translate(400 330)"><rect x="-26" y="-240" width="52" height="240" fill="#3a2414"/>
        <circle cx="-80" cy="-250" r="90" fill="#2a4a1a"/><circle cx="80" cy="-260" r="100" fill="#2a4a1a"/><circle cx="0" cy="-300" r="90" fill="#3a5a2a"/></g>
      ${streaks(241, 220, '#c8d8c8', 24, -4, .35)}
      <rect y="330" width="800" height="70" fill="#2a2414"/>
      ${seated(430, 330, 1.7, '#5a4a3a', true)}<path d="M374 290 H426" stroke="#8a6a3a" stroke-width="3"/><path d="M374 300 H426" stroke="#8a6a3a" stroke-width="3"/>
      ${figure(220, 340, 1.5, '#1a1a14', { dress: true, shawl: '#5a5a4a' })}`
  });

  // 4 — Albay Aureliano Buendía ve otuz iki ayaklanma
  const colonel = svg({
    sky: ['#3a1a14', '#7a3a24', '#c8703a'],
    vignette: .55,
    body: id => `
      ${glow(id, 600, 220, 200, '#ffd090', .55)}
      <path d="M0 260 Q400 230 800 260 V400 H0 Z" fill="#3a2a1a"/>
      <rect x="40" y="200" width="300" height="20" fill="#e8dcc4"/><rect x="40" y="220" width="300" height="80" fill="#c8b8a0"/>
      ${figure(200, 330, 1.8, '#1a2a1a', { hat: true })}
      ${Array.from({ length: 6 }, (_, i) => `${figure(420 + i * 50, 330, 1.4, '#0a0604', { hat: true })}<line x1="${428 + i * 50}" y1="272" x2="${410 + i * 50}" y2="244" stroke="#0a0604" stroke-width="3"/>`).join('')}
      <g transform="translate(150 260)">${Array.from({ length: 6 }, (_, k) => `<path d="M${k * 16} 0 q4 -10 8 0 q-4 6 -8 0" fill="#d9a83a"/>`).join('')}</g>`
  });

  // 5 — Uykusuzluk salgını ve etiketler
  const insomnia = svg({
    sky: ['#1a1a2a', '#2a2a3a', '#1a1a2a'],
    vignette: .65,
    body: id => `
      ${glow(id, 400, 160, 240, '#ffd090', .35)}
      <rect y="300" width="800" height="100" fill="#140e0a"/>
      ${[[150, 'MASA'], [300, 'SANDALYE'], [450, 'SAAT'], [600, 'KAPI']].map(([x, t]) => `<g transform="translate(${x} 200)"><rect x="-44" y="-14" width="88" height="24" fill="#f4ecd8" transform="rotate(${(x % 7) - 3})"/><text y="4" text-anchor="middle" font-family="Lora,serif" font-size="13" fill="#3a2414">${t}</text></g>`).join('')}
      <g transform="translate(300 300)"><rect x="-30" y="-50" width="60" height="50" fill="#5a3a22"/><rect x="-30" y="-80" width="8" height="30" fill="#5a3a22"/></g>
      <g transform="translate(150 300)"><rect x="-50" y="-36" width="100" height="10" fill="#5a3a22"/><rect x="-46" y="-26" width="8" height="26" fill="#5a3a22"/><rect x="38" y="-26" width="8" height="26" fill="#5a3a22"/></g>
      <g transform="translate(450 260)"><circle r="20" fill="#e8dcc4"/><line x1="0" y1="0" x2="0" y2="-14" stroke="#3a2414" stroke-width="2"/></g>
      ${figure(560, 330, 1.6, '#0a0806', {})}<path d="M548 220 l-20 -12" stroke="#e8dcc4" stroke-width="2"/>
      ${dots(251, 40, '#ffe8b0', 1.3, .5, 60, 290)}`
  });

  // 6 — Muz şirketi ve tren
  const banana = svg({
    sky: ['#d8b070', '#e8c890', '#f4e0b0'],
    vignette: .45, grain: .16,
    body: id => `
      <path d="M0 250 Q400 230 800 250 V400 H0 Z" fill="#6a8a3a"/>
      ${Array.from({ length: 16 }, (_, i) => `<g transform="translate(${(i * 53) % 800} ${240 + (i % 3) * 8})"><rect x="-3" y="-50" width="6" height="50" fill="#4a5a2a"/>${[-40, 0, 40].map(a => `<path d="M0 -50 q${a / 2} -20 ${a} -10" stroke="#3a6a2a" stroke-width="10" fill="none" stroke-linecap="round"/>`).join('')}<path d="M0 -40 q6 6 0 14 q-6 -6 0 -14" fill="#e8c83a"/></g>`).join('')}
      <line x1="0" y1="320" x2="800" y2="320" stroke="#3a3a3a" stroke-width="4"/><line x1="0" y1="334" x2="800" y2="334" stroke="#3a3a3a" stroke-width="4"/>
      <g transform="translate(560 320)" fill="#1a1a1a"><rect x="0" y="-50" width="100" height="50"/><rect x="70" y="-76" width="26" height="26"/><rect x="10" y="-70" width="14" height="20"/>${[20, 50, 80].map(cx => `<circle cx="${cx}" cy="4" r="10"/>`).join('')}${Array.from({ length: 4 }, (_, k) => `<rect x="${-110 - k * 110}" y="-40" width="100" height="40" fill="#6a2a1a"/><circle cx="${-90 - k * 110}" cy="4" r="8"/><circle cx="${-30 - k * 110}" cy="4" r="8"/>`).join('')}</g>
      <path d="M570 240 q-30 -40 10 -80" stroke="#c8c0b8" stroke-width="26" fill="none" opacity=".35" filter="url(#${id}blur)"/>`
  });

  // 7 — Dört yıl, on bir ay, iki gün süren yağmur
  const rain = svg({
    sky: ['#2a3a3a', '#3a4a4a', '#4a5a5a'],
    vignette: .6, grain: .2,
    body: id => `
      ${house(400, 300, 1.5, '#8a8a7a', '#c8b88a')}
      <rect y="300" width="800" height="100" fill="#2a3a3a"/>
      ${Array.from({ length: 16 }, (_, i) => `<ellipse cx="${(i * 61) % 800}" cy="${320 + (i * 17) % 70}" rx="${20 + (i % 3) * 10}" ry="4" fill="#5a7a7a" opacity=".6"/>`).join('')}
      ${streaks(261, 380, '#c8d8d8', 30, -4, .5)}
      ${Array.from({ length: 6 }, (_, i) => `<path d="M${120 + i * 110} 330 q6 -10 12 0" stroke="#3a5a3a" stroke-width="2" fill="none"/>`).join('')}`
  });

  // 8 — Parşömenler ve kasırga
  const ending = svg({
    sky: ['#1a1408', '#3a2a14', '#5a4020'],
    vignette: .65,
    body: id => `
      ${glow(id, 400, 220, 260, '#ffc070', .45)}
      ${Array.from({ length: 12 }, (_, i) => `<path d="M${400 + Math.cos(i * .6) * (40 + i * 22)} ${220 + Math.sin(i * .6) * (20 + i * 10)} q20 -10 40 0" stroke="#c8a860" stroke-width="${8 - i * .4}" fill="none" opacity="${.6 - i * .03}"/>`).join('')}
      ${Array.from({ length: 18 }, (_, i) => `<rect x="${400 + Math.cos(i * .9) * (60 + i * 16)}" y="${220 + Math.sin(i * .9) * (30 + i * 8)}" width="22" height="30" fill="#e8d8a8" opacity=".8" transform="rotate(${i * 31} ${411 + Math.cos(i * .9) * (60 + i * 16)} ${235 + Math.sin(i * .9) * (30 + i * 8)})"/>`).join('')}
      <path d="M200 300 H600 L620 320 H180 Z" fill="#3a2414"/>
      <rect x="360" y="280" width="80" height="20" fill="#e8d8a8"/>${seated(300, 302, 1.6, '#0a0604')}
      ${butterflies(271, 30, '#f4d04a')}
      <rect y="320" width="800" height="80" fill="#140c04"/>`
  });

  window.SUMMARIES['yuzyillik-yalnizlik'] = {
    pages: [
      {
        title: 'Buzu Keşfettiği O Uzak Öğleden Sonra',
        image: { svg: ice, caption: 'Çingenelerin çadırında, ilk kez görülen parıldayan bir buz kalıbı.' },
        text: [
          'Gabriel García Márquez’in romanı, Latin Amerika edebiyatının en ünlü açılış cümlelerinden biriyle başlar. Albay Aureliano Buendía, yıllar sonra kurşuna dizilmek üzere duvarın önünde dururken, babasının onu buzu görmeye götürdüğü o uzak öğleden sonrayı hatırlayacaktır. Bu tek cümle, romanın zamanla oynayan, geçmişi, bugünü ve geleceği iç içe geçiren büyülü dilinin ilk örneğidir.',
          'Hikâye, Macondo adında, dünyanın geri kalanından kopuk, küçük bir köyde geçer. Köyün kurucusu José Arcadio Buendía, son derece meraklı, hayalperest ve tutkulu bir adamdır. Her yıl mart ayında köye gelen çingeneler, dünyadan yeni icatlar getirir: mıknatıslar, büyüteçler, pusulalar ve sonunda buz. José Arcadio, bu icatlara büyük bir hayranlıkla bakar ve onları kullanarak altın bulmaya, güneş ışığından silah yapmaya ve dünyanın yuvarlak olduğunu kanıtlamaya çalışır.',
          'Çingenelerin lideri Melquíades, José Arcadio’nun en yakın dostu olur. Melquíades, kendisi dışında kimsenin okuyamayacağı, sanskritçe yazılmış gizemli parşömenler bırakır. Bu parşömenlerde, Buendía ailesinin yüz yıllık kaderinin önceden yazılı olduğu, romanın sonunda anlaşılacaktır. Márquez, “büyülü gerçekçilik” denen tarzında, en olağanüstü olayları en sıradan olaylar gibi anlatır.'
        ]
      },
      {
        title: 'Macondo’nun Kuruluşu',
        image: { svg: macondo, caption: 'Berrak bir nehrin kıyısında, tarih öncesi yumurtalara benzeyen beyaz taşların yanında kurulan köy.' },
        text: [
          'José Arcadio Buendía, kuzeni Úrsula Iguarán ile evlidir. Akrabalar arasında yapılan evliliklerin domuz kuyruklu çocukların doğmasına yol açacağına dair eski bir korku vardır. Bu yüzden Úrsula, uzun süre kocasıyla birlikte olmayı reddeder. Bir gün horoz dövüşünde José Arcadio’nun yendiği Prudencio Aguilar, onunla bu yüzden alay eder. José Arcadio, onu bir mızrakla öldürür.',
          'Prudencio’nun hayaleti, José Arcadio ve Úrsula’yı rahat bırakmaz. Bu yüzden, birkaç aileyle birlikte köylerini terk ederler ve iki yıl süren bir yolculuğun ardından, bir nehrin kıyısında Macondo’yu kurarlar. Başta Macondo, yirmi kerpiç evden oluşan, herkesin mutlu ve eşit olduğu, kimsenin otuz yaşından önce ölmediği bir cennettir.',
          'José Arcadio ve Úrsula’nın üç çocuğu olur. Büyük oğulları José Arcadio, babası gibi güçlü ve tutkulu bir gençtir. İkinci oğulları Aureliano, sessiz, içine kapanık ve geleceği önceden görebilen bir çocuktur. Kızları Amaranta ise gururlu ve sevgisini hiçbir zaman açıkça gösteremeyen bir kadın olacaktır. Aile, yıllar boyunca aynı isimleri kuşaktan kuşağa aktararak büyür. Her José Arcadio dürtüsel ve güçlü, her Aureliano ise yalnız ve düşünceli olacaktır.'
        ]
      },
      {
        title: 'Kestane Ağacı',
        image: { svg: chestnut, caption: 'Avludaki kestane ağacına bağlı, yağmurun altında yaşlanan bir kurucu.' },
        text: [
          'Úrsula, ailenin gerçek direğidir. Uzun ömrü boyunca, kocasının çılgın deneylerine, oğullarının savaşlarına ve torunlarının tutkularına sabırla katlanır. Evi büyütür, şekerden hayvanlar yaparak para kazanır ve kuşaklar boyunca ailenin dağılmamasını sağlar. Úrsula, romanın sonuna kadar, yüz yaşını çoktan geçmiş olarak yaşayacaktır.',
          'José Arcadio Buendía ise yıllar içinde, bilimsel tutkularının içinde kaybolur. Zaman makinesinin bozulduğuna, her günün aynı gün olduğuna inanmaya başlar. Sonunda delirir ve evi yıkmaya kalkışır. Köylüler onu, evin avlusundaki büyük kestane ağacına bağlarlar. José Arcadio, yıllarca bu ağacın altında, güneşte ve yağmurda, Latince konuşarak yaşar. Sadece Prudencio Aguilar’ın hayaleti ve Úrsula onunla konuşur.',
          'José Arcadio öldüğünde, Macondo’nun üzerine küçük sarı çiçekler yağar. Bütün gece süren bu çiçek yağmuru, sokakları ve evlerin çatılarını örter. Ertesi sabah, cenaze alayının geçebilmesi için çiçeklerin kürekle temizlenmesi gerekir. Márquez, bu tür büyülü olayları sanki son derece doğal şeylermiş gibi anlatır ve okur, Macondo’da her şeyin mümkün olduğuna inanmaya başlar.'
        ]
      },
      {
        title: 'Albay Aureliano Buendía',
        image: { svg: colonel, caption: 'Kurşuna dizilmek üzere bir duvarın önünde duran albay.' },
        text: [
          'Yıllar geçtikçe Macondo, dış dünyanın etkisine açılır. Merkezi hükümet, köye bir yönetici gönderir. Ülkede liberaller ve muhafazakârlar arasında büyük bir iç savaş başlar. Muhafazakârların seçimlere hile karıştırdığını gören Aureliano, liberallerin saflarına katılır ve kısa sürede ünlü bir komutan olur.',
          'Albay Aureliano Buendía, otuz iki silahlı ayaklanma başlatır ve hepsini kaybeder. On yedi farklı kadından on yedi oğlu olur. Bu oğulların hepsi, bir gece içinde, alınlarında küllerle yapılmış birer haç işaretiyle öldürülür. Albay, on dört suikast girişiminden, yetmiş üç pusudan ve bir kurşuna dizilme cezasından sağ kurtulur. Ama savaşın sonunda, ruhu tamamen boşalmıştır.',
          'Savaş bittiğinde Albay, Macondo’ya döner ve kendini atölyesine kapatır. Hayatının geri kalanını, küçük altın balıklar yaparak geçirir. Her gün iki balık yapar, yirmi beş balık tamamlandığında onları eritir ve yeniden başlar. Bu anlamsız tekrar, onun için yalnızlığın ve iç huzurun tek yoludur. Márquez, Albay karakteriyle, savaşın ve iktidar hırsının bir insanı nasıl yalnızlığa mahkûm ettiğini anlatır.'
        ]
      },
      {
        title: 'Uykusuzluk Salgını',
        image: { svg: insomnia, caption: 'Unutmamak için her eşyanın üzerine adının yazıldığı bir ev.' },
        text: [
          'Macondo’nun ilk yıllarında köyde garip bir salgın başlar: uykusuzluk hastalığı. Bu hastalığa yakalananlar asla uyumazlar ve ilk başta bundan memnun olurlar, çünkü günler uzar ve daha çok iş yapabilirler. Ama hastalık ilerledikçe, insanlar yavaş yavaş hafızalarını kaybetmeye başlar. Önce çocukluklarını, sonra eşyaların isimlerini, sonra insanları ve sonunda kendi varlıklarını unuturlar.',
          'Aureliano, unutmayı önlemek için evdeki bütün eşyaların üzerine isimlerini yazmayı akıl eder. “Masa”, “sandalye”, “saat”, “kapı”. Sonra bunun yetmediğini görür ve eşyaların ne işe yaradığını da yazar. Köyün girişine büyük bir tabela asılır: Macondo. Bir başka tabelada ise “Tanrı vardır” yazar. Bütün köy, unutmamak için kelimelerle ve etiketlerle dolu bir hafıza makinesine dönüşür.',
          'Sonunda çingene Melquíades köye geri döner ve getirdiği bir iksirle köylüleri iyileştirir. Bu salgın, romanın en önemli temalarından birini, yani hafızanın ve unutmanın önemini simgeler. Márquez, bir toplumun kendi geçmişini unuttuğunda nasıl kimliğini ve anlamını yitirdiğini, bu büyülü ama acı dolu olayla anlatır.'
        ]
      },
      {
        title: 'Muz Şirketi',
        image: { svg: banana, caption: 'Muz plantasyonlarının ortasından geçen sarı tren.' },
        text: [
          'Yıllar sonra Macondo’ya tren gelir ve köy hızla değişir. Amerikalı bir muz şirketi, Macondo’nun çevresindeki topraklara büyük muz plantasyonları kurar. Köye yabancı işçiler, tüccarlar, maceracılar ve paralar akın eder. Macondo, birkaç yıl içinde gürültülü, kalabalık ve zengin bir kasabaya dönüşür. Ama bu zenginlik, köyün eski masumiyetini ve huzurunu yok eder.',
          'Muz şirketinin işçileri, ağır çalışma koşulları ve düşük ücretler yüzünden greve gider. Grevin liderlerinden biri, ailenin bir başka torunu olan José Arcadio Segundo’dur. Hükümet, grevi bastırmak için orduyu gönderir. İstasyonun önündeki meydanda toplanan üç bin işçi, askerler tarafından makineli tüfeklerle öldürülür. Cesetler, iki yüz vagonluk bir trene yüklenerek denize atılır.',
          'José Arcadio Segundo, cesetlerin arasında sağ kalan tek kişidir ve Macondo’ya döner. Ama kimse ona inanmaz. Hükümet, böyle bir katliamın hiç yaşanmadığını, işçilerin evlerine döndüğünü açıklar ve herkes buna inanır. José Arcadio Segundo, ömrünün geri kalanını Melquíades’in odasına kapanarak, kimsenin hatırlamadığı bu katliamı tekrar tekrar anlatarak geçirir. Márquez, bu bölümde Kolombiya tarihindeki gerçek bir olayı, 1928’deki muz işçileri katliamını anlatır.'
        ]
      },
      {
        title: 'Bitmeyen Yağmur',
        image: { svg: rain, caption: 'Dört yıl, on bir ay ve iki gün boyunca dinmeyen yağmur.' },
        text: [
          'Katliamın ardından Macondo’ya bir yağmur başlar. Bu yağmur, dört yıl, on bir ay ve iki gün boyunca hiç durmadan yağar. Evlerin duvarlarında yosunlar büyür, sokaklar çamura gömülür, balıklar kapıların arasından geçer. Muz şirketi bölgeyi terk eder ve Macondo, yavaş yavaş eski zenginliğini kaybeder.',
          'Yağmur durduğunda Macondo, harap ve yorgun bir köye dönüşmüştür. Úrsula, artık neredeyse kördür ve çocukluğuna dönmüş gibi davranır. Ama hâlâ evin her köşesini, kör olduğunu kimseye fark ettirmeden yönetmeye çalışır. Ailenin kadınları ve erkekleri, birbiri ardına yalnızlık içinde ölür. Her biri, kendi takıntılarının ve sevgisizliğinin içinde kaybolmuştur.',
          'Márquez’e göre Buendía ailesinin bütün üyelerinin ortak kaderi yalnızlıktır. Hepsi tutkuyla sever, ama sevgilerini ifade edemez. Hepsi bir şeyler yaratmaya, büyük işler yapmaya çalışır, ama sonunda kendi içlerine kapanırlar. Romanın adındaki yüzyıllık yalnızlık, bir ailenin olduğu kadar, Latin Amerika’nın da tarihine dair bir metafordur.'
        ]
      },
      {
        title: 'Parşömenlerin Sırrı',
        image: { svg: ending, caption: 'Kasırgaya kapılan bir oda ve parşömenleri sonunda okuyan son Buendía.' },
        text: [
          'Ailenin son kuşaklarından Aureliano Babilonia, Melquíades’in odasında yıllarını parşömenleri çözmeye çalışarak geçirir. Bu sırada, teyzesi olduğunu bilmediği Amaranta Úrsula ile tutkulu bir aşk yaşar. Aralarındaki akrabalık, Úrsula’nın yüzyıl önceki korkusunu gerçekleştirecektir. Amaranta Úrsula, bir oğlan çocuğu doğurur. Çocuğun bir domuz kuyruğu vardır. Amaranta Úrsula, doğumdan sonra kan kaybından ölür.',
          'Karısının ölümüyle sarsılan Aureliano, şehirde başıboş dolaşır ve eve döndüğünde, bebeğin karıncalar tarafından yenmiş olduğunu görür. Tam o anda, Melquíades’in parşömenlerinin şifresini çözer. Parşömenler, Buendía ailesinin yüz yıllık tarihini, olaylar daha yaşanmadan önce, en küçük ayrıntısına kadar anlatmaktadır. Aureliano, kendi hayatını, kendisinin okuduğu anda yaşanırken okur.',
          'Aureliano okudukça, Macondo’yu bir kasırga sarmaya başlar. Parşömenlerin son satırında, Macondo’nun, Aureliano parşömenleri okumayı bitirdiği anda rüzgârla silinip yok olacağı yazmaktadır. Çünkü yüz yıllık yalnızlığa mahkûm edilen soyların, yeryüzünde ikinci bir şansı yoktur. Yüzyıllık Yalnızlık, aşkın, savaşın, hafızanın ve unutmanın büyülü bir destanı olarak, dünya edebiyatının en etkileyici romanlarından biridir.'
        ]
      }
    ]
  };
})();
