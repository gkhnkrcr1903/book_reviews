// Gece Yarısı Kütüphanesi — Matt Haig (2020)
// Sahneler data/scenes.js yardımcılarıyla çizilir; ileride image.src ile gerçek çizimlerle değiştirilebilir.
(() => {
  const { svg, glow, skyline, figure, seated, streaks, dots } = window.Scene;

  // Sonsuz raflar
  const shelves = (id, tint = '#2a3a6a') => Array.from({ length: 6 }, (_, r) =>
    `<g opacity="${1 - r * .14}">${Array.from({ length: 2 }, (_, side) => {
      const x0 = side ? 420 + r * 34 : 380 - r * 34, w = 60 - r * 6, dir = side ? 1 : -1;
      return Array.from({ length: 8 }, (_, k) => `<rect x="${side ? x0 + k * 0 : x0 - w}" y="${40 + k * 40 + r * 4}" width="${w}" height="${36 - r * 3}" fill="${tint}"/>
        ${Array.from({ length: 6 }, (_, b) => `<rect x="${(side ? x0 : x0 - w) + 3 + b * (w / 6)}" y="${44 + k * 40 + r * 4}" width="${w / 6 - 2}" height="${30 - r * 3}" fill="${['#8ab0e8', '#e8c88a', '#a8e0c8', '#e8a8c8'][(b + k + r) % 4]}" opacity=".55"/>`).join('')}`).join('');
    }).join('')}</g>`).join('');
  const clock = (x, y, r, c) => `<g transform="translate(${x} ${y})"><circle r="${r}" fill="none" stroke="${c}" stroke-width="3"/>
    ${Array.from({ length: 12 }, (_, k) => `<line x1="${Math.cos(k * .5236) * r * .82}" y1="${Math.sin(k * .5236) * r * .82}" x2="${Math.cos(k * .5236) * r * .95}" y2="${Math.sin(k * .5236) * r * .95}" stroke="${c}" stroke-width="2"/>`).join('')}
    <line x1="0" y1="0" x2="0" y2="${-r * .7}" stroke="${c}" stroke-width="3"/><line x1="0" y1="0" x2="0" y2="${-r * .55}" stroke="${c}" stroke-width="4"/></g>`;

  // 1 — Bedford’da yağmurlu bir gece, pencerede yalnız Nora
  const bedford = svg({
    sky: ['#0e1420', '#1a2232', '#242a3a'],
    vignette: .65,
    body: id => `
      ${skyline({ y: 300, color: '#0a0e18', seed: 12, lit: .12, minH: 80, maxH: 160, dome: false })}
      <rect y="300" width="800" height="100" fill="#0c1220"/>
      <rect x="330" y="130" width="140" height="130" fill="#e8b86a" opacity=".85"/>${glow(id, 400, 195, 120, '#ffd08a', .5)}
      <line x1="400" y1="130" x2="400" y2="260" stroke="#0a0e18" stroke-width="5"/><line x1="330" y1="195" x2="470" y2="195" stroke="#0a0e18" stroke-width="5"/>
      ${figure(380, 258, 1.2, '#2a1a10', { dress: true })}
      <g transform="translate(440 258)" fill="#2a1a10"><ellipse cx="0" cy="-6" rx="12" ry="7"/><circle cx="10" cy="-14" r="5"/><path d="M8 -18 l2 -6 l3 5 z"/></g>
      ${streaks(14, 220, '#9ab0d0', 26, -6, .35)}`
  });

  // 2 — Gece yarısı kütüphanesi: sonsuz raflar
  const library = svg({
    sky: ['#0a0e20', '#14183a', '#1a1e44'],
    vignette: .6,
    body: id => `
      ${shelves(id)}
      ${glow(id, 400, 200, 160, '#c8e0ff', .55)}
      <rect y="360" width="800" height="40" fill="#0a0c1a"/>
      <path d="M360 360 L400 200 L440 360 Z" fill="#c8e0ff" opacity=".08"/>
      ${clock(400, 80, 30, '#e8e0c8')}
      ${figure(400, 362, 1.6, '#1a1a2a', { dress: true })}
      ${dots(22, 60, '#e8f0ff', 1, .6)}`
  });

  // 3 — Pişmanlıklar kitabı ve Bayan Elm
  const regrets = svg({
    sky: ['#14102a', '#241a3a', '#140e24'],
    body: id => `
      ${glow(id, 400, 220, 260, '#ffd08a', .4)}
      <path d="M160 300 H640 L660 320 H140 Z" fill="#3a2a20"/>
      <g transform="translate(400 280)">
        <path d="M-140 0 Q-70 -16 0 0 Q70 -16 140 0 L140 -110 Q70 -126 0 -110 Q-70 -126 -140 -110 Z" fill="#e8dcc4"/>
        <line x1="0" y1="-110" x2="0" y2="0" stroke="#a89a80" stroke-width="2"/>
        ${Array.from({ length: 9 }, (_, i) => `<rect x="-126" y="${-98 + i * 10}" width="${100 - (i * 17) % 40}" height="3" fill="#5a4a3a" opacity=".6"/><rect x="14" y="${-98 + i * 10}" width="${110 - (i * 23) % 50}" height="3" fill="#5a4a3a" opacity=".6"/>`).join('')}
      </g>
      ${seated(200, 300, 1.7, '#100c18')}${figure(620, 320, 1.7, '#3a3a4a', { dress: true, shawl: '#6a5a8a' })}
      ${dots(33, 30, '#ffe0a0', 1.4, .7, 80, 200)}`
  });

  // 4 — Kutup buzulları: Svalbard’da bir hayat
  const arctic = svg({
    sky: ['#2a3a5a', '#7a9ac0', '#d8e8f4'],
    vignette: .4, grain: .12,
    body: id => `
      ${glow(id, 600, 180, 220, '#fff', .6)}
      <path d="M0 230 L80 160 L140 200 L220 120 L300 210 L400 150 L470 220 L560 170 L640 230 L720 180 L800 220 V260 H0 Z" fill="#e8f0f8"/>
      <path d="M0 260 H800 V400 H0 Z" fill="#a8c8e0"/>
      ${Array.from({ length: 6 }, (_, i) => `<path d="M${60 + i * 130} ${300 + (i % 2) * 30} l40 -16 l50 6 l20 20 l-60 12 z" fill="#f4f8fc"/>`).join('')}
      <g transform="translate(560 300) scale(1.4)" fill="#f4f0e4"><path d="M-40 0 Q-46 -30 -10 -34 Q20 -40 40 -24 Q56 -20 58 -10 L50 -6 Q40 -10 34 -6 L34 0 H26 V-8 H-20 V0 H-28 Z"/></g>
      ${figure(260, 320, 1.5, '#a83a2a', { hat: true })}`
  });

  // 5 — Konser sahnesi: rock yıldızı hayatı
  const stage = svg({
    sky: ['#0a0414', '#1a0828', '#2a0a2a'],
    vignette: .6,
    body: id => `
      ${[[200, '#ff4ad8'], [400, '#4ad8ff'], [600, '#ffd84a']].map(([x, c]) => `<polygon points="${x - 10},0 ${x + 10},0 ${x + 120},300 ${x - 120},300" fill="${c}" opacity=".12" filter="url(#${id}soft)"/>`).join('')}
      <rect x="120" y="280" width="560" height="20" fill="#1a1020"/>
      ${figure(400, 280, 1.8, '#000', { dress: true })}<line x1="420" y1="230" x2="420" y2="280" stroke="#000" stroke-width="3"/>
      ${figure(270, 280, 1.5, '#000')}${figure(530, 280, 1.5, '#000')}
      <rect y="300" width="800" height="100" fill="#05020a"/>
      ${Array.from({ length: 30 }, (_, i) => `<g transform="translate(${10 + i * 27} ${360 + (i % 3) * 10}) scale(1.1)" fill="#000"><circle cy="-30" r="8"/><rect x="-10" y="-22" width="20" height="40"/><line x1="${i % 2 ? 6 : -6}" y1="-20" x2="${i % 2 ? 14 : -14}" y2="-48" stroke="#000" stroke-width="4"/></g>`).join('')}
      ${dots(44, 70, '#fff', 1.2, .6, 0, 260)}`
  });

  // 6 — Mükemmel görünen hayat: bahçeli ev, çocuk ve köpek
  const perfect = svg({
    sky: ['#8ab8e0', '#c8e0f0', '#f4ecd8'],
    vignette: .35, grain: .1,
    body: id => `
      ${glow(id, 640, 100, 160, '#fff8d8', .7)}
      <rect y="260" width="800" height="140" fill="#7aa85a"/>
      <g transform="translate(300 260)"><rect x="-110" y="-110" width="220" height="110" fill="#f4e8d0"/><polygon points="-130,-110 0,-190 130,-110" fill="#a8543a"/>
        <rect x="-20" y="-60" width="40" height="60" fill="#5a3a2a"/><rect x="-90" y="-90" width="44" height="36" fill="#ffd88a"/><rect x="46" y="-90" width="44" height="36" fill="#ffd88a"/></g>
      ${Array.from({ length: 16 }, (_, i) => `<circle cx="${480 + (i % 8) * 36}" cy="${290 + Math.floor(i / 8) * 24}" r="${5 + (i % 3)}" fill="${['#e85a6a', '#f4d04a', '#e8e0f0'][i % 3]}"/>`).join('')}
      ${figure(560, 340, 1.5, '#2a3a5a', { dress: true })}${figure(600, 344, .9, '#e85a6a', { dress: true })}
      <g transform="translate(650 344)" fill="#8a5a2a"><ellipse cx="0" cy="-10" rx="16" ry="8"/><circle cx="16" cy="-16" r="6"/><rect x="-12" y="-4" width="3" height="6"/><rect x="8" y="-4" width="3" height="6"/></g>`
  });

  // 7 — Çöken kütüphane
  const collapse = svg({
    sky: ['#14081a', '#2a0e20', '#3a1418'],
    vignette: .7,
    body: id => `
      <g transform="rotate(-6 400 200)">${shelves(id, '#3a1e2a')}</g>
      ${Array.from({ length: 24 }, (_, i) => `<rect x="${(i * 67) % 780}" y="${(i * 41) % 300 + 40}" width="16" height="24" fill="${['#8ab0e8', '#e8c88a', '#a8e0c8', '#e8a8c8'][i % 4]}" opacity=".8" transform="rotate(${(i * 37) % 90 - 45} ${(i * 67) % 780 + 8} ${(i * 41) % 300 + 52})"/>`).join('')}
      ${glow(id, 400, 260, 200, '#ff7a3a', .4)}
      <path d="M380 0 L360 80 L400 120 L370 220" stroke="#ffd08a" stroke-width="3" fill="none" opacity=".7"/>
      <rect y="360" width="800" height="40" fill="#0a0408"/>
      ${figure(400, 362, 1.6, '#0a0408', { dress: true })}`
  });

  // 8 — Sabah: yeniden yaşama dönüş
  const morning = svg({
    sky: ['#f4c8a0', '#f8dcb8', '#fcecd8'],
    vignette: .3, grain: .1,
    body: id => `
      ${glow(id, 400, 260, 320, '#fff4d8', .9)}
      <circle cx="400" cy="250" r="50" fill="#fff8e8"/>
      ${skyline({ y: 300, color: '#c89a7a', seed: 12, lit: 0, minH: 50, maxH: 120, dome: false })}
      <rect y="300" width="800" height="100" fill="#b88a6a"/>
      <g transform="translate(400 330)"><rect x="-60" y="-14" width="120" height="14" fill="#2a1a10"/><rect x="-56" y="-12" width="112" height="6" fill="#f4ecd8"/>${Array.from({ length: 8 }, (_, k) => `<rect x="${-52 + k * 14}" y="-12" width="6" height="4" fill="#2a1a10"/>`).join('')}</g>
      ${seated(330, 330, 1.4, '#3a2418')}
      ${figure(500, 340, 1.4, '#5a4a3a')}${figure(560, 340, 1.2, '#7a5a4a', { dress: true })}
      ${dots(55, 40, '#fff', 1.2, .6, 40, 240)}`
  });

  window.SUMMARIES['gece-yarisi-kutuphanesi'] = {
    pages: [
      {
        title: 'Her Şeyin Ters Gittiği Bir Gün',
        image: { svg: bedford, caption: 'Bedford’da yağmurlu bir gece ve penceresinde yalnız bir kadın.' },
        text: [
          'Nora Seed, İngiltere’nin küçük şehri Bedford’da yaşayan otuz beş yaşında bir kadındır. Hayatı, gerçekleşmeyen hayallerle ve verilmemiş kararlarla doludur. Gençken başarılı bir yüzücüydü, felsefe okumuştu, kardeşiyle birlikte kurduğu bir rock grubunda şarkı söylemişti ve düğününe sadece birkaç gün kala nişanlısından ayrılmıştı. Şimdi ise küçük bir müzik dükkânında çalışıyor, birkaç öğrenciye piyano dersi veriyor ve çoğu zaman yalnız, kendini değersiz hissederek yaşıyordur.',
          'Bir gün her şey üst üste gelir. Sevgili kedisi Voltaire bir arabanın altında kalarak ölür. Yıllardır çalıştığı müzik dükkânından kovulur. Tek piyano öğrencisi derslerini bırakır. Yaşlı komşusu artık ilaçlarını almak için onun yardımına ihtiyaç duymadığını söyler. Ağabeyi Joe ile yıllardır küstür ve en yakın arkadaşı Izzy Avustralya’dadır. Nora, hiç kimsenin artık ona ihtiyaç duymadığını, dünyada hiçbir yere ait olmadığını hisseder.',
          'O gece, büyük bir umutsuzluk içinde, yaşamına son vermeye karar verir. Roman, bu karanlık başlangıcın ardından okuru sıra dışı bir yolculuğa çıkarır. Matt Haig, kendi yaşadığı ağır depresyon dönemlerinden de beslenerek, ölümle yaşam arasındaki o ince çizgiyi, umutla dolu ve şefkatli bir hikâyeye dönüştürür.'
        ]
      },
      {
        title: 'Yaşamla Ölüm Arasında',
        image: { svg: library, caption: 'Gece yarısı kütüphanesi: her kitabın ayrı bir hayat olduğu sonsuz raflar.' },
        text: [
          'Nora gözlerini açtığında kendini sisli bir boşlukta, ardından devasa bir kütüphanenin içinde bulur. Raflar her yöne doğru sonsuza kadar uzanır ve hepsi aynı yeşil tonlardaki, birbirine benzeyen kitaplarla doludur. Duvardaki saat tam gece yarısını, 00.00’ı gösterir ve hiç ilerlemez. Burada zaman durmuştur.',
          'Kütüphanenin görevlisi, Nora’nın çocukluğunda okulun kütüphanecisi olan, ona satranç öğreten ve babasının öldüğü gün onu teselli eden yaşlı Bayan Elm’dir. Bayan Elm ona burasının yaşamla ölüm arasında bir yer olduğunu açıklar. Raflardaki her kitap, Nora’nın yaşayabileceği farklı bir hayatı anlatır. Her kitap, geçmişte farklı bir karar vermiş olsaydı hayatının nasıl olacağını gösteren paralel bir evrendir.',
          'Nora dilediği kitabı açıp o hayatın içine girebilir. Eğer orada mutlu olursa, o hayatta kalabilir. Ama hayal kırıklığına uğrarsa, kendini tekrar kütüphanede bulacaktır. Kural basittir, ama sınavı zorludur. Nora, hangi hayatın onu gerçekten mutlu edeceğini bulmak zorundadır, çünkü kütüphanede kaldığı her an, gerçek dünyadaki hayatı biraz daha sönmektedir.'
        ]
      },
      {
        title: 'Pişmanlıklar Kitabı',
        image: { svg: regrets, caption: 'Bayan Elm ve Nora’nın bütün pişmanlıklarının yazılı olduğu ağır kitap.' },
        text: [
          'Bayan Elm, yolculuğa başlamadan önce Nora’ya ağır, toz kaplı bir kitap uzatır: Pişmanlıklar Kitabı. Bu kitapta, Nora’nın hayatı boyunca yaptığı ya da yapmadığı her şeyden duyduğu pişmanlıklar tek tek yazılıdır. Bazıları büyüktür, örneğin yüzmeyi bırakmak, grubu dağıtmak ya da nişanlısı Dan’ı terk etmek. Bazıları ise küçük ama acı vericidir, örneğin bir dersi asmak ya da bir arkadaşa yanlış bir söz söylemek.',
          'Nora kitabı okurken pişmanlıkların ağırlığı altında ezildiğini hisseder. Bu sayfalar ona, hayatının yanlış kararlarla dolu bir başarısızlıklar zinciri olduğunu düşündürür. Ama Bayan Elm ona önemli bir şey hatırlatır: Pişmanlıklar bize yalnızca neyi kaybettiğimizi gösterir, neyi kazandığımızı ise hiç göstermez. Her vazgeçtiğimiz yolun da kendine göre zorlukları olabilir.',
          'Böylece Nora, pişmanlıklarının her birini sınamaya karar verir. Hayatının dönüm noktalarında farklı bir karar vermiş olsaydı neler olacağını görmek için ilk kitabını açar. Roman, bu noktadan sonra, bir yandan bir dizi farklı hayatın büyüleyici macerasını, bir yandan da bir insanın kendisiyle barışma sürecini anlatır.'
        ]
      },
      {
        title: 'Denenmiş Hayatlar',
        image: { svg: arctic, caption: 'Svalbard’ın buzulları: bir buzul bilimcinin vahşi doğadaki hayatı.' },
        text: [
          'Nora ilk olarak nişanlısı Dan’la evlenip birlikte bir kır meyhanesi işlettiği hayata girer. Bu, onun yıllardır pişmanlık duyduğu karardır. Ama kısa sürede bu hayatın hayal ettiği gibi olmadığını görür. Dan çok içmektedir, evlilikleri soğuktur ve meyhane battıkça batmaktadır. Nora, o düğünü iptal etmekle aslında kendini mutsuz bir evlilikten kurtardığını anlar ve kendini yeniden kütüphanede bulur.',
          'Ardından başka hayatları dener. Bir hayatta, babasının hayalini gerçekleştirerek olimpiyat madalyası kazanmış ünlü bir yüzücüdür, ama bu hayatta da kendini boş hisseder. Başka bir hayatta Norveç’in kuzeyindeki Svalbard Adası’nda buzulları inceleyen bir bilim insanıdır. Orada bir kutup ayısıyla karşı karşıya kalır ve ölümün eşiğinde, yaşamak istediğini ilk kez bütün bedeniyle hisseder. Bu hayatta, kendisi gibi farklı hayatlar arasında gezinen Hugo adında bir adamla tanışır.',
          'Hugo, Nora’ya bu deneyimin yalnızca ona özgü olmadığını, farklı insanların farklı “ara mekânlar” gördüğünü anlatır. Kimi bir video dükkânında, kimi bir manastırda, Nora ise bir kütüphanede hayatlar arasında gidip gelmektedir. Bu konuşma Nora’ya, hayatın tek bir doğru cevabı olan bir sınav olmadığını, her insanın kendi anlamını bulmak zorunda olduğunu düşündürür.'
        ]
      },
      {
        title: 'Şöhret ve Kayıplar',
        image: { svg: stage, caption: 'Binlerce kişinin önünde şarkı söyleyen bir rock yıldızı.' },
        text: [
          'Nora’nın en büyük pişmanlıklarından biri, ağabeyi Joe ile kurdukları The Labyrinths grubundan, büyük bir plak anlaşması imzalamak üzereyken ayrılmasıdır. Bu hayatı açtığında kendini Brezilya’da, binlerce hayranın önünde şarkı söyleyen dünyaca ünlü bir rock yıldızı olarak bulur. Kalabalıklar onun adını haykırır, şarkıları her yerde çalınır ve parası sayılamayacak kadar çoktur.',
          'Ama bu parlak hayatın içinde korkunç bir boşluk vardır. Nora, ağabeyi Joe’nun bu hayatta aşırı dozdan öldüğünü öğrenir. Şöhret, Nora’yı sevdiklerinden ve kendinden uzaklaştırmıştır. Etrafı onu tanımayan ama ondan bir şeyler isteyen insanlarla doludur. Nora, bu hayatın gerçek değil, yalnızca bir sahne olduğunu hisseder.',
          'Başka hayatlarda ise sevdiği insanların kaderlerinin de değiştiğini görür. Kendi gerçek hayatında hâlâ yaşayan en yakın arkadaşı Izzy’nin, paralel evrenlerden birinde bir trafik kazasında öldüğünü öğrenir. Nora yavaş yavaş, kendi sıradan hayatında verdiği kararların bile başkalarının hayatlarında görünmez ama derin izler bıraktığını anlamaya başlar.'
        ]
      },
      {
        title: 'Neredeyse Mükemmel Bir Hayat',
        image: { svg: perfect, caption: 'Çiçekli bir bahçe, sevgi dolu bir aile ve bir köpek.' },
        text: [
          'Sonunda Nora, aradığı mükemmel hayatı bulduğunu düşünür. Bu hayatta, bir zamanlar müzik dükkânında ona kahve teklif eden cerrah Ash ile evlenmiştir. Felsefe alanında akademik bir kariyer yapmıştır. Molly adında harika bir kızları, büyük bir köpekleri ve güzel bir bahçeli evleri vardır. Annesinin ölümüne üzülmüştür, ama kendi kızının sevgisi bu acıyı hafifletmiştir.',
          'Nora, Molly’yi yatağına yatırırken ona hikâyeler anlatır, onunla oynar ve kalbinin sıcacık bir sevgiyle dolduğunu hisseder. Hayatında ilk kez gerçekten bir yere ait olduğunu düşünür. Ama aynı zamanda tuhaf bir huzursuzluk duyar. Bu hayatın anılarına sahip değildir, Molly’nin doğumunu, Ash’le tanışmalarını ya da evlerini satın aldıkları günü hatırlamaz. Bu hayat, başka bir Nora tarafından inşa edilmiştir.',
          'Nora burada kalmak ister, ama bu hayatın aslında ona ait olmadığını da bilir. Kendisinin başka bir hayattan gelen bir yabancı olduğunu, bu sevgi dolu ailenin içinde kalıcı bir yeri olmadığını hisseder. Bu farkındalık, onu en derin pişmanlıkla değil, en derin sevgiyle yüz yüze getirir: Yaşamak istediği bir hayat aslında mümkündür, ama o hayatı başkasının hikâyesini çalarak değil, kendi hayatında inşa etmek zorundadır.'
        ]
      },
      {
        title: 'Kütüphane Çöküyor',
        image: { svg: collapse, caption: 'Rafların sallandığı, kitapların havada uçuştuğu son an.' },
        text: [
          'Nora kendini yeniden kütüphanede bulduğunda her şey değişmiştir. Raflar sallanmakta, kitaplar yere düşmekte, ışıklar titremektedir. Kütüphane bir deprem yaşıyormuş gibi çökmeye başlar. Bayan Elm, bunun Nora’nın gerçek dünyadaki hayatının sona yaklaştığı anlamına geldiğini anlatır. Artık deneyecek başka bir hayatı kalmamıştır.',
          'Bu karmaşanın ortasında Nora, kendi orijinal hayatını anlatan kitabı bulur. Kitabın sayfaları boştur, çünkü bu hayatın geleceği henüz yazılmamıştır. Nora birden fark eder ki o, hayatını bitirmek istememiştir. Aslında istediği şey, acı çekmeyi bitirmektir. Dünyayı ve kendi hayatını, bir başarı ya da başarısızlık olarak değil, olasılıklarla dolu bir yer olarak görmeye başlar.',
          'Nora, kütüphanenin yıkıntıları arasında, kendi kitabına bir cümle yazar: Yaşamak istiyorum. Bu sözler, kütüphanenin derinliklerinde yankılanır. O an, bütün yaşamlarında aradığı anlamın, aslında kendi sıradan, kusurlu ve küçük hayatının içinde olduğunu anlar.'
        ]
      },
      {
        title: 'Yeniden Başlamak',
        image: { svg: morning, caption: 'Yeni bir sabah, bir satranç tahtası ve yeniden kurulan bağlar.' },
        text: [
          'Nora, kendi yatağında, kendi odasında uyanır. Bedeni zayıftır, ama hayattadır. Telefonuna uzanır ve yardım ister. Kurtulduktan sonra, hayatına çok farklı gözlerle bakmaya başlar. Dış koşulları neredeyse hiç değişmemiştir: Hâlâ küçük bir dairede yaşamaktadır, işsizdir ve pek çok pişmanlığı vardır. Ama artık hayatın kendisini bir yük olarak değil, bir fırsat olarak görmektedir.',
          'Nora, yıllardır görüşmediği ağabeyi Joe’yu arar ve onunla barışır. Ders vermeyi bıraktığı genç öğrencisi Leo’yu cesaretlendirir ve onun müziğe olan sevgisini yeniden canlandırır. Yaşlı komşusuyla daha çok vakit geçirir. Bir huzurevinde, artık çok yaşlanmış olan gerçek Bayan Elm’i bulur ve onunla eskisi gibi satranç oynamaya başlar.',
          'Gece Yarısı Kütüphanesi, mükemmel hayatın bir yerlerde bizi beklemediğini, asıl önemli olanın şu an yaşadığımız hayatın kıymetini bilmek olduğunu anlatır. Matt Haig, okura sıcak bir umutla seslenir: Hayatın değeri, ulaştığımız başarılarda değil, küçük anlarda, başkalarına dokunduğumuz yerlerde ve her yeni sabahın sunduğu sonsuz olasılıklarda gizlidir.'
        ]
      }
    ]
  };
})();
