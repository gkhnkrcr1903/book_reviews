// Dakikalar İçinde Kuantum Fiziği — Gemma Lavender (2017)
// Sahneler data/scenes.js yardımcılarıyla çizilir; ileride image.src ile gerçek çizimlerle değiştirilebilir.
(() => {
  const { svg, glow, skyline, figure, seated, streaks, dots } = window.Scene;

  // Atom: çekirdek ve elektron yörüngeleri
  const atom = (x, y, r, c, id) => `<g transform="translate(${x} ${y})">
    ${[0, 60, 120].map(a => `<ellipse rx="${r}" ry="${r * .34}" fill="none" stroke="${c}" stroke-width="2" transform="rotate(${a})" opacity=".8"/>`).join('')}
    ${[0, 60, 120].map((a, i) => { const t = (i * 2.1) + 1; return `<circle cx="${Math.cos(t) * r}" cy="${Math.sin(t) * r * .34}" r="5" fill="${c}" transform="rotate(${a})"/>`; }).join('')}
    <circle r="${r * .14}" fill="#ff8a5a"/><circle r="${r * .3}" fill="#ff8a5a" opacity=".25"/></g>`;
  // Dalga
  const wave = (y, amp, len, c, w = 3, op = .9, x0 = 0, x1 = 800) => {
    let d = `M${x0} ${y}`;
    for (let x = x0; x <= x1; x += 8) d += ` L${x} ${(y + Math.sin((x - x0) / len * Math.PI * 2) * amp).toFixed(1)}`;
    return `<path d="${d}" stroke="${c}" stroke-width="${w}" fill="none" opacity="${op}"/>`;
  };

  // 1 — Klasik fizikten kuantuma: sıcak cismin ışıması
  const classical = svg({
    sky: ['#0a0a14', '#14142a', '#1e1a30'],
    vignette: .6,
    body: id => `
      ${glow(id, 220, 220, 180, '#ff7a2a', .7)}
      <rect x="180" y="150" width="80" height="140" rx="6" fill="#2a1a14"/><rect x="192" y="164" width="56" height="112" fill="#ff9a3a"/>${glow(id, 220, 220, 60, '#fff0a0', .9)}
      ${[['#ff3a3a', 0], ['#ff9a2a', 1], ['#ffe04a', 2], ['#5ad870', 3], ['#3a9aff', 4], ['#9a5aff', 5]].map(([c, i]) => `<path d="M270 ${200 + i * 6} L780 ${100 + i * 40}" stroke="${c}" stroke-width="5" opacity=".7"/>`).join('')}
      <polygon points="430,120 500,260 360,260" fill="#e8f0ff" opacity=".25" stroke="#e8f0ff" stroke-width="2"/>
      ${Array.from({ length: 10 }, (_, i) => `<rect x="${560 + i * 22}" y="${300 - [20, 60, 110, 140, 130, 100, 70, 45, 28, 16][i]}" width="16" height="${[20, 60, 110, 140, 130, 100, 70, 45, 28, 16][i]}" fill="#ffd04a" opacity=".55"/>`).join('')}
      <rect y="320" width="800" height="80" fill="#08080e"/>`
  });

  // 2 — Işık: dalga mı parçacık mı? Çift yarık deneyi
  const doubleSlit = svg({
    sky: ['#04060e', '#0a1020', '#0e1428'],
    vignette: .6,
    body: id => `
      ${glow(id, 80, 200, 90, '#9af0ff', .8)}<circle cx="80" cy="200" r="14" fill="#e8ffff"/>
      ${Array.from({ length: 8 }, (_, i) => `<path d="M${120 + i * 26} ${200 - 60 - i * 6} Q${140 + i * 26} 200 ${120 + i * 26} ${200 + 60 + i * 6}" stroke="#9af0ff" stroke-width="2" fill="none" opacity="${.8 - i * .08}"/>`).join('')}
      <rect x="340" y="40" width="16" height="320" fill="#3a4a60"/><rect x="340" y="160" width="16" height="22" fill="#04060e"/><rect x="340" y="218" width="16" height="22" fill="#04060e"/>
      ${[171, 229].map(cy => Array.from({ length: 9 }, (_, i) => `<path d="M${356 + i * 34} ${cy - 10 - i * 18} A ${14 + i * 34} ${14 + i * 34} 0 0 1 ${356 + i * 34} ${cy + 10 + i * 18}" stroke="#9af0ff" stroke-width="1.5" fill="none" opacity="${.6 - i * .05}"/>`).join('')).join('')}
      <rect x="690" y="40" width="20" height="320" fill="#141c2c"/>
      ${Array.from({ length: 13 }, (_, i) => { const y = 60 + i * 23, k = Math.cos((i - 6) * .9) ** 2 * (1 - Math.abs(i - 6) / 8); return `<rect x="690" y="${y}" width="20" height="16" fill="#e8ffff" opacity="${(k * .95).toFixed(2)}"/>`; }).join('')}
      ${dots(3, 90, '#e8ffff', 1, .8, 40, 360).replace(/cx="(\d+)"/g, (m, v) => `cx="${692 + (+v % 16)}"`)}`
  });

  // 3 — Atomun içi: Bohr modeli ve enerji düzeyleri
  const atomScene = svg({
    sky: ['#0a0614', '#140a24', '#1a0e2a'],
    vignette: .6,
    body: id => `
      ${glow(id, 300, 200, 220, '#9a5aff', .3)}
      <g transform="translate(300 200)">${[50, 90, 130, 170].map(r => `<circle r="${r}" fill="none" stroke="#c8a8ff" stroke-width="1.5" opacity=".6" stroke-dasharray="4 6"/>`).join('')}
        <circle r="18" fill="#ff8a5a"/>${glow(id, 0, 0, 40, '#ff8a5a', .6)}
        <circle cx="90" cy="0" r="7" fill="#9af0ff"/><circle cx="-36" cy="-120" r="7" fill="#9af0ff"/>
        <path d="M-36 -120 Q-10 -60 0 -88" stroke="#ffe04a" stroke-width="2" fill="none" stroke-dasharray="3 3"/>
      </g>
      ${wave(180, 10, 30, '#ffe04a', 3, .9, 480, 700)}<polygon points="700,170 720,180 700,190" fill="#ffe04a"/>
      ${['#ff3a3a', '#5ad870', '#3a9aff', '#9a5aff'].map((c, i) => `<rect x="${560 + i * 40}" y="280" width="8" height="70" fill="${c}"/>`).join('')}
      <rect x="540" y="270" width="190" height="90" fill="none" stroke="#3a3050" stroke-width="2"/>`
  });

  // 4 — Belirsizlik: bulanık konum, olasılık bulutu
  const uncertainty = svg({
    sky: ['#06080e', '#0c1220', '#121a2a'],
    vignette: .65,
    body: id => `
      ${Array.from({ length: 220 }, (_, i) => { const a = i * 2.39996, r = Math.sqrt(i) * 9; return `<circle cx="${(400 + Math.cos(a) * r * 1.4).toFixed(0)}" cy="${(200 + Math.sin(a) * r * .8).toFixed(0)}" r="${(3 - r / 70).toFixed(1)}" fill="#9af0ff" opacity="${Math.max(.05, .9 - r / 140).toFixed(2)}"/>`; }).join('')}
      ${glow(id, 400, 200, 120, '#9af0ff', .3)}
      <g stroke="#ffe04a" stroke-width="2" fill="none" opacity=".8">
        <circle cx="400" cy="200" r="40" stroke-dasharray="6 6"/><line x1="360" y1="200" x2="440" y2="200"/><line x1="400" y1="160" x2="400" y2="240"/>
      </g>
      <path d="M560 300 h120" stroke="#ff8a5a" stroke-width="4"/><polygon points="680,290 700,300 680,310" fill="#ff8a5a"/>
      <text x="120" y="340" font-family="Lora,serif" font-size="30" fill="#e8f0ff" opacity=".8">Δx · Δp ≥ ħ/2</text>`
  });

  // 5 — Schrödinger’in kedisi
  const cat = svg({
    sky: ['#0e0a06', '#1a120a', '#0e0a06'],
    vignette: .7,
    body: id => `
      ${glow(id, 400, 200, 260, '#ffc070', .35)}
      <g transform="translate(400 300)">
        <polygon points="-170,0 170,0 200,-30 -140,-30" fill="#5a3a20"/><rect x="-170" y="-170" width="340" height="170" fill="#7a5030"/>
        <polygon points="170,0 200,-30 200,-200 170,-170" fill="#4a2e18"/><polygon points="-170,-170 170,-170 200,-200 -140,-200" fill="#8a6038"/>
        <rect x="-170" y="-170" width="340" height="170" fill="none" stroke="#3a2414" stroke-width="4"/>
      </g>
      <g transform="translate(400 280)" opacity=".55"><path d="M-40 0 Q-50 -50 -10 -60 L-20 -86 L0 -70 L20 -86 L14 -58 Q50 -50 40 0 Z" fill="#1a1a1a"/><path d="M40 -10 Q80 -20 70 -70" stroke="#1a1a1a" stroke-width="8" fill="none"/></g>
      <g transform="translate(400 280)" opacity=".3"><path d="M-70 0 Q-60 -26 0 -26 Q60 -26 70 0 Z" fill="#e8dcc4"/></g>
      <text x="400" y="80" text-anchor="middle" font-family="Lora,serif" font-size="40" fill="#f4ecd8" opacity=".7">?</text>`
  });

  // 6 — Dolanıklık: uzak iki parçacık
  const entangle = svg({
    sky: ['#000', '#050814', '#0a0e22'],
    vignette: .6,
    body: id => `
      ${dots(11, 160, '#fff', 1.2, .8)}
      ${glow(id, 160, 200, 120, '#ff6ad8', .5)}${glow(id, 640, 200, 120, '#3ad8ff', .5)}
      <circle cx="160" cy="200" r="22" fill="#ff6ad8"/><circle cx="640" cy="200" r="22" fill="#3ad8ff"/>
      <path d="M160 180 L160 150" stroke="#fff" stroke-width="4"/><polygon points="152,152 160,136 168,152" fill="#fff"/>
      <path d="M640 220 L640 250" stroke="#fff" stroke-width="4"/><polygon points="632,248 640,264 648,248" fill="#fff"/>
      ${wave(200, 18, 60, '#e8e0ff', 1.5, .5, 190, 610)}${wave(200, 18, 60, '#e8e0ff', 1.5, .3, 190, 610).replace(/L(\d+) ([\d.]+)/g, (m, x, y) => `L${x} ${(400 - +y).toFixed(1)}`)}`
  });

  // 7 — Standart Model ve hızlandırıcı
  const standard = svg({
    sky: ['#06080e', '#0c121e', '#121a28'],
    vignette: .55,
    body: id => `
      <g transform="translate(220 200)">${glow(id, 0, 0, 160, '#ffd04a', .25)}
        <circle r="150" fill="none" stroke="#5a6a8a" stroke-width="18"/><circle r="150" fill="none" stroke="#9ab8e0" stroke-width="2" stroke-dasharray="10 10"/>
        ${glow(id, 106, -106, 40, '#fff0a0', .9)}${Array.from({ length: 14 }, (_, k) => `<line x1="106" y1="-106" x2="${106 + Math.cos(k * .45) * (30 + k * 3)}" y2="${-106 + Math.sin(k * .45) * (30 + k * 3)}" stroke="#ffe04a" stroke-width="1.5"/>`).join('')}
      </g>
      ${Array.from({ length: 4 }, (_, r) => Array.from({ length: 4 }, (_, c) => `<rect x="${470 + c * 66}" y="${70 + r * 66}" width="58" height="58" rx="8" fill="${['#a83a6a', '#3a6aa8', '#3a8a5a', '#a8743a'][c]}" opacity=".75"/>`).join('')).join('')}
      <rect x="470" y="340" width="58" height="0" fill="none"/>
      <circle cx="736" cy="170" r="30" fill="#e8c83a" opacity=".85"/>`
  });

  // 8 — Kuantum bilgisayar ve geleceğin teknolojileri
  const computer = svg({
    sky: ['#04040a', '#0a0a18', '#101024'],
    vignette: .6,
    body: id => `
      ${glow(id, 400, 160, 260, '#9ad8ff', .35)}
      ${[0, 1, 2, 3, 4].map(i => `<ellipse cx="400" cy="${70 + i * 44}" rx="${170 - i * 26}" ry="16" fill="#c89a5a" opacity="${.9 - i * .1}"/><ellipse cx="400" cy="${70 + i * 44}" rx="${170 - i * 26}" ry="16" fill="none" stroke="#f4d08a" stroke-width="2"/>`).join('')}
      ${[0, 1, 2, 3].map(i => Array.from({ length: 6 }, (_, k) => `<line x1="${400 - 140 + i * 26 + k * (2 * (140 - i * 26)) / 5}" y1="${70 + i * 44}" x2="${400 - 114 + (i + 1) * 0 + k * (2 * (114 - i * 26)) / 5}" y2="${114 + i * 44}" stroke="#f4d08a" stroke-width="1.5" opacity=".7"/>`).join('')).join('')}
      <circle cx="400" cy="290" r="16" fill="#9ad8ff"/>${glow(id, 400, 290, 50, '#9ad8ff', .7)}
      <rect y="330" width="800" height="70" fill="#06060c"/>
      ${figure(220, 360, 1.4, '#000')}${figure(590, 360, 1.4, '#000', { dress: true })}`
  });

  window.SUMMARIES['dakikalar-icinde-kuantum-fizigi'] = {
    pages: [
      {
        title: 'Küçük Parçalarla Büyük Bir Bilim',
        image: { svg: classical, caption: 'Kızgın bir fırının ışığı ve fizikçileri şaşırtan renk dağılımı.' },
        text: [
          'Gemma Lavender, astrofizikçi ve bilim yazarıdır. Dakikalar İçinde Kuantum Fiziği, Quercus yayınevinin “Dakikalar İçinde” dizisinin bir parçasıdır ve kuantum dünyasının en önemli kavramlarını, her biri birkaç dakikada okunabilecek kısa ve görsel bölümler hâlinde anlatır. Kitap bir roman gibi baştan sona okunmak zorunda değildir. Her sayfa tek bir fikri, bir deneyi ya da bir kavramı açıklar ve okur dilediği yerden başlayabilir.',
          'Kitabın başlangıç noktası, on dokuzuncu yüzyılın sonundaki büyük bir güvendir. O dönemde fizikçiler, Newton’ın hareket yasaları, Maxwell’in elektrik ve manyetizma denklemleri ve termodinamik sayesinde doğanın neredeyse bütün sırlarını çözdüklerine inanıyordu. Geriye yalnızca birkaç küçük problem kalmıştı. Ama bu küçük problemler, kısa süre içinde bütün fiziği yerinden oynatacaktı.',
          'Bu sorunlardan ilki, sıcak cisimlerin yaydığı ışıktı. Klasik fiziğe göre ısıtılan bir cisim, mor ötesi ışınları sonsuz miktarda yaymalıydı. Bu açıkça saçmaydı ve “mor ötesi felaketi” olarak anıldı. 1900’de Alman fizikçi Max Planck, enerjinin sürekli değil, “kuanta” adını verdiği küçük paketler hâlinde yayıldığını varsayarak bu sorunu çözdü. Planck bu fikri başta bir matematik hilesi olarak görmüştü, ama farkında olmadan kuantum fiziğini başlatmıştı.'
        ]
      },
      {
        title: 'Işık: Dalga mı, Parçacık mı?',
        image: { svg: doubleSlit, caption: 'Çift yarık deneyi: tek tek gönderilen parçacıklar bile girişim deseni oluşturur.' },
        text: [
          'Işığın doğası, yüzyıllar boyunca bilim insanlarını ikiye bölmüştür. Newton ışığın küçük parçacıklardan oluştuğunu düşünmüştü. 1801’de ise Thomas Young, ışığı iki dar yarıktan geçirerek ekranda aydınlık ve karanlık çizgiler elde etti. Bu desen, iki su dalgasının birbirine karışmasıyla oluşan girişime benziyordu ve ışığın bir dalga olduğunu kanıtlıyor gibiydi.',
          'Ama 1905’te Albert Einstein, metal bir yüzeye ışık düştüğünde elektron koparılmasını, yani fotoelektrik olayını açıklamak için Planck’ın fikrini kullandı. Einstein’a göre ışık, “foton” adı verilen enerji paketlerinden oluşuyordu. Bir fotonun enerjisi ışığın rengine bağlıydı ve elektronu koparabilmek için yeterli enerjiye sahip olmalıydı. Einstein, Nobel Ödülü’nü görelilik için değil, bu çalışma için aldı.',
          'Peki ışık dalga mı, parçacık mı? Kuantum fiziğinin şaşırtıcı cevabı, ikisi birden olduğudur. Bu “dalga-parçacık ikiliği” yalnızca ışığa özgü değildir. 1924’te Louis de Broglie, elektronlar gibi madde parçacıklarının da dalga gibi davranabileceğini öne sürdü. Kısa süre sonra yapılan deneyler onu haklı çıkardı. Elektronlar tek tek çift yarıktan gönderildiğinde bile, ekranda yavaş yavaş girişim deseni oluşur. Sanki her elektron aynı anda iki yarıktan da geçmektedir.'
        ]
      },
      {
        title: 'Atomun İçinde',
        image: { svg: atomScene, caption: 'Enerji düzeyleri arasında atlayan bir elektron ve yaydığı renkli çizgiler.' },
        text: [
          'Yirminci yüzyılın başında Ernest Rutherford, atomun merkezinde çok küçük ama son derece yoğun bir çekirdek olduğunu, elektronların ise onun etrafında döndüğünü keşfetti. Ama klasik fiziğe göre dönen bir elektron sürekli enerji kaybetmeli ve bir saniyeden kısa bir sürede çekirdeğin içine düşmeliydi. Atomlar ise açıkça kararlıdır.',
          '1913’te Danimarkalı fizikçi Niels Bohr bu sorunu kuantum fikriyle çözdü. Bohr’a göre elektronlar çekirdeğin etrafında yalnızca belirli enerji düzeylerinde bulunabilir. Bir elektron, bir düzeyden diğerine “kuantum sıçraması” denen ani bir geçişle atlar ve bu sırada belirli bir renkte ışık yayar ya da soğurur. Bu da her elementin kendine özgü bir renk “parmak izi”, yani spektrumu olmasını açıklar. Gökbilimciler, uzak yıldızların neyden yapıldığını bu çizgilere bakarak anlar.',
          'Lavender, kitapta atomun yapıtaşlarını da tek tek anlatır: pozitif yüklü protonlar, yüksüz nötronlar ve negatif yüklü elektronlar. Elektronların atom içindeki yerleşimini belirleyen Pauli dışarlama ilkesi, iki elektronun aynı anda aynı kuantum durumunda bulunamayacağını söyler. Bu basit kural, periyodik tablonun düzenini, kimyasal bağları ve dolayısıyla etrafımızdaki bütün maddenin yapısını açıklar.'
        ]
      },
      {
        title: 'Belirsizlik ve Dalga Fonksiyonu',
        image: { svg: uncertainty, caption: 'Bir elektronun “nerede” olduğu yerine, nerede bulunabileceğini gösteren olasılık bulutu.' },
        text: [
          '1920’lerde kuantum fiziği, iki büyük matematiksel çerçeveyle olgunlaştı. Werner Heisenberg matrislerle çalışan bir yöntem geliştirdi. Erwin Schrödinger ise bir parçacığın davranışını “dalga fonksiyonu” adı verilen bir denklemle tanımladı. Max Born, bu dalga fonksiyonunun bir parçacığın belirli bir yerde bulunma olasılığını verdiğini gösterdi. Kuantum dünyasında artık kesinlik yerine olasılıklar konuşuluyordu.',
          'Heisenberg’in en ünlü katkısı, belirsizlik ilkesidir. Bu ilkeye göre bir parçacığın konumunu ve momentumunu, yani hızını ve yönünü, aynı anda sınırsız bir kesinlikle bilmek imkânsızdır. Konumu ne kadar kesin ölçerseniz, momentum o kadar belirsizleşir. Bu, ölçüm aletlerimizin kusurlu olmasından değil, doğanın kendi yapısından kaynaklanır.',
          'Belirsizlik ilkesinin şaşırtıcı sonuçlarından biri de “kuantum tünellemesi”dir. Bir parçacık, klasik fiziğe göre aşamayacağı bir enerji engelinin öbür tarafına bazen geçebilir. Bu, sanki bir topun duvarın içinden geçip öbür tarafa çıkması gibidir. Kulağa bilim kurgu gibi gelse de, Güneş’in içindeki nükleer füzyonun ve bugün kullandığımız pek çok elektronik cihazın çalışması bu olaya dayanır.'
        ]
      },
      {
        title: 'Schrödinger’in Kedisi',
        image: { svg: cat, caption: 'Kapalı bir kutu ve içinde hem canlı hem ölü olduğu söylenen bir kedi.' },
        text: [
          'Kuantum fiziğinin belki de en tuhaf fikri, “süperpozisyon”dur. Bir kuantum parçacığı, ölçülmeden önce aynı anda birden fazla durumda bulunabilir. Örneğin bir elektron aynı anda hem saat yönünde hem de saat yönünün tersine dönebilir. Ancak biri onu ölçtüğünde, bu olasılıklardan yalnızca biri gerçekleşir. Fizikçiler buna dalga fonksiyonunun “çökmesi” der.',
          'Schrödinger, bu fikrin ne kadar garip olduğunu göstermek için 1935’te ünlü bir düşünce deneyi tasarladı. Kapalı bir kutunun içine bir kedi, bir miktar radyoaktif madde, bir dedektör ve bir zehir şişesi konur. Radyoaktif atom bozunursa dedektör zehri serbest bırakır ve kedi ölür. Kuantum fiziğine göre kutu açılmadan önce atom hem bozunmuş hem de bozunmamış durumdadır. O hâlde kedi de aynı anda hem canlı hem de ölü olmalıdır.',
          'Schrödinger bu örneği kuantum fiziğini savunmak için değil, onun gündelik dünyaya uygulanmasının ne kadar saçma sonuçlar doğurduğunu göstermek için ortaya atmıştı. Bugün bile fizikçiler bu sorunun cevabını tartışır. Kopenhag yorumuna göre ölçüm gerçekliği belirler. Çoklu evrenler yorumuna göre ise her olasılık ayrı bir evrende gerçekleşir. Lavender, bu farklı yorumları da kitabında kısa ve anlaşılır bir dille özetler.'
        ]
      },
      {
        title: 'Uzaktan Ürkütücü Etki',
        image: { svg: entangle, caption: 'Evrenin iki ucundaki dolanık parçacıklar: biri ölçüldüğünde diğeri anında “cevap verir”.' },
        text: [
          'Kuantum dolanıklığı, iki ya da daha fazla parçacığın birbirine öyle bağlanmasıdır ki, aralarındaki mesafe ne kadar büyük olursa olsun, birinin durumu ölçüldüğünde diğerinin durumu da anında belirlenir. Örneğin dolanık iki parçacıktan biri “yukarı” dönüyorsa, diğeri kesinlikle “aşağı” dönüyor olacaktır. Bu bağlantı, sanki ışıktan hızlı bir mesaj gönderiliyormuş gibi anında gerçekleşir.',
          'Einstein bu fikirden hiç hoşlanmamıştı ve ona “uzaktan ürkütücü etki” adını vermişti. 1935’te Boris Podolsky ve Nathan Rosen ile birlikte yazdığı bir makalede, kuantum fiziğinin eksik olduğunu, parçacıkların aslında baştan belirlenmiş gizli özellikleri olması gerektiğini savundu. Bu tartışma, onlarca yıl boyunca yalnızca bir felsefe sorusu olarak kaldı.',
          '1964’te fizikçi John Bell, bu tartışmayı deneyle sınayabilecek bir yöntem geliştirdi. Sonraki yıllarda yapılan pek çok deney, Einstein’ın değil kuantum fiziğinin haklı olduğunu gösterdi. Dolanıklık gerçekti. Bugün bu tuhaf olay, kırılması imkânsız şifreleme sistemlerinin, kuantum iletişiminin ve kuantum ışınlanmasının temelini oluşturur. Ancak dolanıklık, ışıktan hızlı bilgi göndermeye izin vermez, bu yüzden Einstein’ın görelilik kuramıyla da çelişmez.'
        ]
      },
      {
        title: 'Parçacıklar Hayvanat Bahçesi',
        image: { svg: standard, caption: 'Dev bir parçacık hızlandırıcı ve maddenin temel yapıtaşlarını gösteren tablo.' },
        text: [
          'Kuantum fiziği, atomun yapısıyla sınırlı kalmadı. Yirminci yüzyıl boyunca fizikçiler, protonların ve nötronların da daha küçük parçacıklardan, yani kuarklardan oluştuğunu keşfetti. Elektron, nötrino gibi parçacıklar ise leptonlar ailesine aittir. Bu parçacıklar arasındaki kuvvetler de kuantum alan kuramıyla açıklanır. Bu kurama göre her kuvvet, aracı bir parçacık tarafından taşınır. Elektromanyetik kuvveti foton, güçlü nükleer kuvveti gluonlar, zayıf nükleer kuvveti ise W ve Z bozonları taşır.',
          'Bu parçacıkların ve kuvvetlerin hepsi, fizikçilerin “Standart Model” dediği tek bir kuramda bir araya getirilir. Standart Model, insanlık tarihinin en başarılı bilimsel kuramlarından biridir ve yapılan deneylerin sonuçlarını olağanüstü bir doğrulukla tahmin eder. Kuramın son eksik parçası olan Higgs bozonu, 2012’de İsviçre’deki Büyük Hadron Çarpıştırıcısı’nda keşfedildi. Higgs alanı, diğer parçacıklara kütle kazandıran görünmez bir alan olarak tanımlanır.',
          'Lavender, Standart Model’in hâlâ çözemediği büyük soruları da anlatır. Evrendeki maddenin büyük kısmını oluşturduğu düşünülen karanlık madde ve evrenin genişlemesini hızlandıran karanlık enerji, bu modelde yer almaz. Ayrıca kuantum fiziği ile Einstein’ın kütle çekimini açıklayan genel görelilik kuramı hâlâ birleştirilememiştir.'
        ]
      },
      {
        title: 'Kuantum Dünyası ve Gelecek',
        image: { svg: computer, caption: 'Altın renkli katmanlarıyla bir kuantum bilgisayar.' },
        text: [
          'Kitabın son bölümleri kuantum fiziğinin hem evrenin en büyük sorularıyla hem de günlük hayatımızla olan bağlantısını anlatır. Kara deliklerin kenarında kuantum etkileri nedeniyle çok zayıf bir ışıma yayıldığını öne süren Hawking ışıması, kuantum fiziği ile kütle çekiminin buluştuğu nadir noktalardan biridir. Sicim kuramı ve döngü kuantum kütle çekimi gibi kuramlar ise bu iki büyük kuramı birleştirmeye çalışan cesur ama henüz kanıtlanmamış girişimlerdir.',
          'Kuantum fiziği soyut görünse de, aslında etrafımızdaki teknolojinin büyük kısmı ona dayanır. Bilgisayarlardaki transistörler, lazerler, LED lambalar, hastanelerdeki MR cihazları ve GPS uydularındaki atom saatleri kuantum fiziği sayesinde çalışır. Bugün bilim insanları, süperpozisyon ve dolanıklığı kullanarak klasik bilgisayarlardan çok daha hızlı hesap yapabilecek kuantum bilgisayarlar geliştirmeye çalışıyor.',
          'Lavender, kitabını kuantum fiziğinin yaşam ve bilinçle ilişkisini araştıran yeni alanlara da değinerek bitirir. Kuşların göç ederken yönlerini bulmasında ya da bitkilerin fotosentezinde kuantum etkilerinin rol oynayabileceği düşünülmektedir. Dakikalar İçinde Kuantum Fiziği, bu karmaşık ve şaşırtıcı bilimi korkutucu olmaktan çıkarıp, merak eden herkesin adım adım keşfedebileceği bir yolculuğa dönüştürür.'
        ]
      }
    ]
  };
})();
