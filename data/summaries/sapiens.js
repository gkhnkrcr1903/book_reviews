// Sapiens — Yuval Noah Harari (2011)
// Sahneler data/scenes.js yardımcılarıyla çizilir; ileride image.src ile gerçek çizimlerle değiştirilebilir.
(() => {
  const { svg, glow, skyline, figure, seated, streaks, dots } = window.Scene;

  const tree = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}">
    <rect x="-3" y="-60" width="6" height="60"/><ellipse cx="0" cy="-66" rx="46" ry="12"/><ellipse cx="-10" cy="-74" rx="30" ry="8"/></g>`;

  // 1 — Savanada farklı insan türleri
  const species = svg({
    sky: ['#e8a85a', '#f4c88a', '#f8e0b0'],
    vignette: .4, grain: .12,
    body: id => `
      ${glow(id, 600, 200, 240, '#fff0c0', .8)}<circle cx="600" cy="200" r="44" fill="#fff4d8"/>
      <path d="M0 240 Q200 220 400 236 T800 228 V400 H0 Z" fill="#c89a5a"/>
      <path d="M0 290 Q300 270 800 292 V400 H0 Z" fill="#a8783a"/>
      ${tree(140, 250, 1.4, '#3a2410')}${tree(720, 246, 1, '#4a3018')}
      ${[[260, 1.7, '#2a1a0c'], [330, 1.5, '#3a2414'], [400, 1.9, '#1a0e06'], [470, .95, '#3a2414'], [530, 1.6, '#2a1a0c']].map(([x, s, c]) => figure(x, 330, s, c)).join('')}`
  });

  // 2 — Ateş başında hikâye ve mağara resimleri
  const fire = svg({
    sky: ['#0a0604', '#1a0e08', '#2a1408'],
    vignette: .75,
    body: id => `
      <path d="M0 0 H800 V80 Q600 40 400 60 Q200 80 0 40 Z" fill="#050302"/>
      ${glow(id, 400, 300, 300, '#ff9a3a', .55)}
      <g fill="#a8542a" opacity=".7">
        ${[[120, 140], [220, 120], [580, 130], [680, 150]].map(([x, y], i) => i % 2
          ? `<path d="M${x - 40} ${y} q20 -26 50 -14 q20 -14 30 6 l-6 6 v18 h-6 v-14 h-46 v14 h-6 v-18 z"/>`
          : `<path d="M${x - 34} ${y} q14 -20 44 -12 l12 -10 l4 8 l-6 10 v22 h-6 v-16 h-36 v16 h-6 z"/>`).join('')}
        <g fill="#c86a3a">${Array.from({ length: 8 }, (_, i) => `<path d="M${330 + i * 18} 110 h10 l-5 -14 z" opacity=".8"/>`).join('')}</g>
      </g>
      <path d="M370 330 l30 -70 l30 70 z" fill="#ffb84a"/><path d="M385 330 l15 -40 l15 40 z" fill="#fff0a0"/>
      <rect x="350" y="330" width="100" height="8" rx="4" fill="#3a1a0a"/>
      ${seated(250, 340, 1.6, '#0a0503')}${seated(550, 340, 1.6, '#0a0503', true)}
      ${figure(180, 360, 1.4, '#0a0503')}${figure(630, 360, 1.5, '#0a0503')}
      ${dots(31, 40, '#ffc070', 1.4, .8, 140, 300)}`
  });

  // 3 — Buğday tarlasında bükülmüş çiftçi
  const farmer = svg({
    sky: ['#d8a060', '#e8c08a', '#f4dcb0'],
    vignette: .45, grain: .14,
    body: id => `
      ${glow(id, 160, 120, 180, '#fff0c0', .6)}
      <rect y="220" width="800" height="180" fill="#c8963a"/>
      ${Array.from({ length: 12 }, (_, i) => `<path d="M0 ${230 + i * 15} Q400 ${222 + i * 15} 800 ${232 + i * 15}" stroke="#8a5a1a" stroke-width="2" fill="none" opacity=".6"/>`).join('')}
      <g transform="translate(400 330) scale(2.2)" fill="#2a1a0c">
        <path d="M-20 -6 Q-16 -36 10 -40 L18 -36 L10 -26 Q-4 -24 -8 -6 Z"/><circle cx="18" cy="-42" r="7"/>
        <rect x="-18" y="-8" width="6" height="16"/><rect x="-6" y="-8" width="6" height="16"/>
        <line x1="14" y1="-30" x2="34" y2="0" stroke="#2a1a0c" stroke-width="2.5"/>
      </g>
      <path d="M620 220 h80 v-30 l-40 -30 l-40 30 z" fill="#7a5030"/>
      ${figure(560, 260, .8, '#3a2414', { dress: true })}${figure(590, 262, .5, '#3a2414')}`
  });

  // 4 — Para, imparatorluk ve din: hayali düzenler
  const orders = svg({
    sky: ['#2a1e3a', '#5a3a4a', '#a8644a'],
    body: id => `
      ${glow(id, 400, 160, 260, '#ffd08a', .5)}
      <g fill="#140c14">
        <rect x="80" y="160" width="160" height="200"/><polygon points="70,160 160,110 250,160"/>
        ${[95, 125, 155, 185, 215].map(x => `<rect x="${x}" y="170" width="10" height="190" fill="#2a1a24"/>`).join('')}
        <rect x="560" y="140" width="150" height="220"/><path d="M560 140 q75 -80 150 0 z"/><rect x="630" y="40" width="10" height="60"/><rect x="620" y="56" width="30" height="8"/>
      </g>
      <circle cx="400" cy="170" r="70" fill="#d9a83a"/><circle cx="400" cy="170" r="58" fill="none" stroke="#a8741e" stroke-width="4"/>
      <text x="400" y="190" font-family="Lora,serif" font-size="54" text-anchor="middle" fill="#a8741e">$</text>
      <rect y="360" width="800" height="40" fill="#0a0608"/>
      ${Array.from({ length: 14 }, (_, i) => figure(40 + i * 55, 372, 1 + (i % 3) * .1, '#0a0608', { hat: i % 4 === 0, dress: i % 3 === 1 })).join('')}`
  });

  // 5 — Bilim devrimi: haritasız denizlere yelken açan gemi
  const science = svg({
    sky: ['#0e1a30', '#1c3050', '#3a5070'],
    body: id => `
      ${dots(41, 160, '#ffffff', 1.2, .9, 0, 220)}
      <g stroke="#9ab8e0" stroke-width="1" opacity=".4" fill="none">
        <circle cx="400" cy="120" r="90"/><ellipse cx="400" cy="120" rx="90" ry="30"/><ellipse cx="400" cy="120" rx="30" ry="90"/>
        <line x1="310" y1="120" x2="490" y2="120"/>
      </g>
      <rect y="260" width="800" height="140" fill="#0c1828"/>
      ${Array.from({ length: 8 }, (_, i) => `<path d="M${i * 110} ${280 + (i % 3) * 30} q30 -6 60 0" stroke="#4a6a90" stroke-width="2" fill="none" opacity=".6"/>`).join('')}
      <g transform="translate(400 290) scale(1.4)" fill="#05080e">
        <path d="M-90 0 H90 L70 24 H-70 Z"/>
        ${[-50, 0, 50].map((x, i) => `<line x1="${x}" y1="0" x2="${x}" y2="${-110 + Math.abs(i - 1) * 20}" stroke="#05080e" stroke-width="3"/>
          <path d="M${x - 26} ${-96 + Math.abs(i - 1) * 20} H${x + 26} Q${x + 30} ${-60 + Math.abs(i - 1) * 20} ${x + 26} ${-30} H${x - 26} Q${x - 30} -60 ${x - 26} ${-96 + Math.abs(i - 1) * 20} Z" fill="#d8d0c0"/>`).join('')}
      </g>`
  });

  // 6 — Kapitalizm ve sanayi: fabrikalar ve büyüme
  const industry = svg({
    sky: ['#4a4a52', '#7a6a62', '#a8886a'],
    vignette: .5,
    body: id => `
      ${Array.from({ length: 5 }, (_, i) => `<path d="M${120 + i * 140} 140 q-30 -40 10 -80 q40 -30 0 -60" stroke="#c8c0b8" stroke-width="26" fill="none" opacity=".15" filter="url(#${id}blur)"/>`).join('')}
      <g fill="#1a1618">${[120, 260, 400, 540, 680].map(x => `<rect x="${x - 12}" y="130" width="24" height="140"/>`).join('')}
        <path d="M40 270 L40 230 L120 200 L120 230 L200 200 L200 230 L280 200 L280 230 L360 200 L360 230 L440 200 L440 230 L520 200 L520 230 L600 200 L600 230 L680 200 L680 230 L760 200 V270 Z"/></g>
      <rect x="40" y="270" width="720" height="60" fill="#1a1618"/>
      ${Array.from({ length: 24 }, (_, i) => `<rect x="${60 + i * 29}" y="${284 + (i % 2) * 18}" width="12" height="10" fill="#f4b04a" opacity="${.5 + (i % 3) * .2}"/>`).join('')}
      <rect y="330" width="800" height="70" fill="#100e10"/>
      <polyline points="80,250 200,230 320,210 440,170 560,120 680,60" stroke="#e8c070" stroke-width="4" fill="none" opacity=".8"/>`
  });

  // 7 — Mutluluk: kalabalık şehir ve yalnız bir yüz
  const happiness = svg({
    sky: ['#1a1a2e', '#2a2a4a', '#3a3a5a'],
    body: id => `
      ${skyline({ y: 300, color: '#0c0c18', seed: 77, lit: .45, light: '#9ad8ff', minH: 120, maxH: 260, dome: false })}
      <rect y="300" width="800" height="100" fill="#0a0a14"/>
      ${Array.from({ length: 22 }, (_, i) => figure(20 + i * 37, 350 + (i % 3) * 8, 1.1, '#05050a', { hat: i % 5 === 0 })).join('')}
      ${glow(id, 400, 300, 70, '#ffd08a', .6)}
      ${figure(400, 360, 1.6, '#2a1a10', {})}`
  });

  // 8 — Tanrı olan hayvan: biyoloji ve teknolojinin birleşimi
  const future = svg({
    sky: ['#050a14', '#0a1a2a', '#0e2a3a'],
    vignette: .7,
    body: id => `
      ${glow(id, 400, 200, 260, '#3ad8ff', .3)}
      <g stroke="#3ad8ff" stroke-width="1.5" fill="none" opacity=".6">
        ${Array.from({ length: 12 }, (_, i) => `<path d="M${330 + i * 12} 40 Q${400 + Math.sin(i) * 60} 200 ${330 + i * 12} 360"/>`).join('')}
      </g>
      <g transform="translate(400 330) scale(3.2)">
        <path d="M-12 -48 Q0 -54 12 -48 L14 -12 H-14 Z" fill="#0a1a2a"/><circle cx="0" cy="-60" r="9" fill="#0a1a2a"/>
        <path d="M0 -69 A9 9 0 0 1 9 -60 L0 -60 Z" fill="#3ad8ff" opacity=".7"/>
        <line x1="0" y1="-48" x2="0" y2="-14" stroke="#3ad8ff" stroke-width=".8"/>
        ${[-40, -32, -24].map(y => `<line x1="-12" y1="${y}" x2="12" y2="${y}" stroke="#3ad8ff" stroke-width=".5"/>`).join('')}
      </g>
      ${dots(91, 120, '#9af0ff', 1.2, .7)}`
  });

  window.SUMMARIES['sapiens'] = {
    pages: [
      {
        title: 'Önemsiz Bir Hayvan',
        image: { svg: species, caption: 'Yüz bin yıl önce dünyada birden fazla insan türü yaşıyordu.' },
        text: [
          'Yuval Noah Harari, insanlık tarihini anlatmaya bizi şaşırtacak bir hatırlatmayla başlar: Bundan yaklaşık yüz bin yıl önce dünyada tek bir insan türü değil, en az altı farklı insan türü yaşıyordu. Avrupa’da ve Batı Asya’da iri yapılı Neandertaller, Doğu Asya’da Homo erectus, Endonezya’nın Flores Adası’nda boyları bir metreyi bile bulmayan küçük insanlar ve Doğu Afrika’da biz, Homo sapiens. Tıpkı bugün farklı ayı ya da kedi türleri olduğu gibi, o zamanlar da farklı insan türleri vardı.',
          'Bu insanlar beyin büyüklüğü, alet kullanımı ve ateşi kontrol etme gibi yeteneklerle diğer hayvanlardan ayrılıyordu. Ama milyonlarca yıl boyunca besin zincirinin ortasında kalan, aslanlardan kaçan ve leşlerden geriye kalan kemiklerin iliğini emerek beslenen sıradan canlılardı. Harari’nin deyişiyle, insan o dönemde dünyanın geri kalanı üzerinde bir denizanasından ya da ağaçkakandan daha fazla etkisi olmayan önemsiz bir hayvandı.',
          'Peki bu önemsiz hayvan nasıl oldu da bütün gezegenin efendisi hâline geldi? Diğer insan türleri neden ortadan kayboldu? Harari, kitabın tamamında insanlık tarihini değiştiren üç büyük devrimin peşine düşer: yaklaşık yetmiş bin yıl önce başlayan Bilişsel Devrim, on iki bin yıl önce başlayan Tarım Devrimi ve sadece beş yüz yıl önce başlayan Bilimsel Devrim. Bu üç devrim, bizi bugünkü dünyaya getiren yolun dönüm noktalarıdır.'
        ]
      },
      {
        title: 'Bilişsel Devrim: Kurgunun Gücü',
        image: { svg: fire, caption: 'Ateş başında anlatılan hikâyeler ve mağara duvarlarındaki resimler.' },
        text: [
          'Yaklaşık yetmiş bin yıl önce Homo sapiens’in zihninde bir şeyler değişir. Harari buna Bilişsel Devrim adını verir. Sapiens bu dönemde tekneler, yağ lambaları, iğneler ve oklar yapmaya başlar, mağara duvarlarına resimler çizer ve kısa sürede Afrika’dan dünyanın dört bir yanına yayılır. Bu değişimin kalbinde ise yepyeni bir dil yeteneği vardır.',
          'Pek çok hayvan iletişim kurabilir. Bir maymun arkadaşlarına “Dikkat, aslan!” diye seslenebilir. Ama Sapiens’in dili çok daha esnektir. Önce dedikodu yapmayı, yani kimin kime güvenebileceğini, kimin hile yaptığını konuşmayı öğrenir. Bu, birkaç düzine kişilik grupların bir arada kalmasını sağlar. Asıl büyük sıçrama ise başka bir şeydir: Sapiens, hiç var olmayan şeyler hakkında konuşabilen ilk canlıdır. Kabilenin koruyucu ruhu, tanrılar, efsaneler ve mitler bu yetenekle doğar.',
          'Harari’ye göre kurgu yaratma yeteneği, Sapiens’in en büyük gücüdür. Ortak bir hikâyeye inanan binlerce, hatta milyonlarca yabancı insan birlikte çalışabilir. Bir şempanze sürüsü en fazla birkaç düzine bireyden oluşur, ama bir milletin, bir dinin ya da bir şirketin üyeleri birbirini hiç tanımadan iş birliği yapabilir. Tanrılar, uluslar, para, insan hakları ve şirketler; hepsi insanların ortak hayal gücünde var olan, Harari’nin “hayali düzenler” dediği kurgulardır.',
          'Bu güç, ne yazık ki doğa için felaket olur. Sapiens nereye ayak basarsa orada büyük hayvanlar hızla yok olur. Avustralya’nın dev keseli hayvanları, Amerika’nın mamutları ve dev tembel hayvanları, insanların gelişinden kısa bir süre sonra ortadan kaybolur. Neandertaller ve diğer insan türleri de muhtemelen ya Sapiens’le rekabet edemeyip yok olur ya da onunla karışarak tarihe karışır.'
        ]
      },
      {
        title: 'Tarih’in En Büyük Aldatmacası',
        image: { svg: farmer, caption: 'Tarlada sırtı bükülmüş bir çiftçi: insan buğdayı mı evcilleştirdi, buğday insanı mı?' },
        text: [
          'Yaklaşık on iki bin yıl önce Sapiens, avcılık ve toplayıcılığı bırakarak birkaç bitki ve hayvanı yetiştirmeye başlar. Okulda öğretilen tarihe göre bu büyük bir ilerlemedir: İnsanlar daha akıllı hâle gelmiş, doğanın sırlarını çözmüş ve daha rahat bir hayata kavuşmuştur. Harari ise bu görüşe tamamen karşı çıkar. Ona göre Tarım Devrimi, tarihin en büyük aldatmacasıdır.',
          'Avcı toplayıcılar çeşitli bir beslenmeye sahipti, günde birkaç saat çalışıyor ve geniş topraklarda özgürce dolaşıyordu. İlk çiftçiler ise sabahtan akşama kadar tarlada eğilip bükülüyor, taşları temizliyor, su taşıyor ve ekinlerini korumak için uğraşıyordu. Beslenmeleri buğday ya da pirinç gibi tek bir ürüne bağlı kaldı. Kuraklık ya da hastalık geldiğinde açlıkla yüz yüze geliyorlardı. İskeletleri bel fıtığı, artrit ve diş çürükleriyle doluydu.',
          'Harari bu durumu kışkırtıcı bir soruyla özetler: Biz mi buğdayı evcilleştirdik, yoksa buğday mı bizi? Birkaç bin yıl içinde Orta Doğu’da küçük bir ot olan buğday, dünyanın dört bir yanına yayılmış, insanlar ise onun için köy köy yerleşip ömürlerini tarlada geçirmeye başlamıştı. Tarım, insan türünün sayısını artırdı, ama bireysel insanın hayatını çoğu zaman zorlaştırdı. Evcilleştirilmiş hayvanlar için ise tarih çok daha karanlıktı: Küçük ahırlara kapatılan, yalnızca et ve süt için yaşatılan milyarlarca canlı.',
          'Peki insanlar neden bu tuzağa düştü? Harari’ye göre kimse bilerek bu yola girmedi. Her adım, o an için biraz daha fazla yiyecek ve biraz daha fazla güvenlik vaat ediyordu. Ama nüfus arttıkça geri dönüş imkânsız hâle geldi. Bir lüks zamanla bir zorunluluğa dönüştü. Harari bunu tarihin en önemli derslerinden biri olarak görür: Daha kolay bir hayat arayışı, çoğu zaman beklenmedik zorluklar doğurur.'
        ]
      },
      {
        title: 'İnsanlığın Birleşmesi',
        image: { svg: orders, caption: 'Para, imparatorluklar ve dinler: milyonları bir araya getiren üç büyük kurgu.' },
        text: [
          'Tarımla birlikte köyler kasabalara, kasabalar şehirlere, şehirler krallıklara dönüşür. Bu büyük toplulukları bir arada tutmak için yazı, kanunlar ve hiyerarşiler icat edilir. Babil’in Hammurabi Kanunları da Amerikan Bağımsızlık Bildirgesi de Harari’ye göre aynı işi görür: İkisi de insanların ortak hayal gücüne dayanan ve milyonların uyum içinde yaşamasını sağlayan hayali düzenlerdir. Biri insanları eşitsiz sınıflara ayırır, diğeri herkesin eşit olduğunu söyler, ama ikisi de doğada değil, insan zihninde var olur.',
          'Harari, insanlığı tek bir küresel topluma doğru iten üç büyük güç görür. Bunlardan ilki paradır. Para, şimdiye kadar icat edilmiş en evrensel ve en etkili güven sistemidir. Birbirine hiç benzemeyen dinlere, dillere ve kültürlere sahip insanlar bile, aynı altın paraya ya da aynı dolara inanır. Ne tanrılarda ne de krallarda anlaşamayan insanlar, parada anlaşabilir.',
          'İkinci büyük güç imparatorluklardır. İmparatorluklar zulüm ve sömürü üzerine kurulmuştur, ama aynı zamanda farklı halkları tek bir dil, tek bir kanun ve ortak bir kültür altında birleştirmiştir. Bugün konuştuğumuz dillerin, kullandığımız alfabenin ve yaşadığımız şehirlerin çoğu bir imparatorluğun mirasıdır. Üçüncü güç ise evrensel dinlerdir. Budizm, Hristiyanlık ve İslam, belirli bir kabileye değil bütün insanlığa seslenen ilk inanç sistemleri olarak, birbirini tanımayan milyonlarca insanı aynı değerlerde buluşturur.'
        ]
      },
      {
        title: 'Bilimsel Devrim: Cehaletin Keşfi',
        image: { svg: science, caption: 'Haritaların boş bıraktığı denizlere yelken açan Avrupa gemileri.' },
        text: [
          'Yaklaşık beş yüz yıl önce, insanlık tarihinin en hızlı ve en büyük değişimi başlar: Bilimsel Devrim. Harari’ye göre bu devrimin özü, yeni bir şey bilmek değil, bilmediğini kabul etmektir. Daha önceki kültürler, önemli olan her şeyin kutsal kitaplarda ya da atalarının bilgeliğinde zaten yazılı olduğuna inanıyordu. Modern bilim ise “bilmiyoruz” diyerek işe başlar, gözleme ve deneye dayanır ve yeni bilgiyi yeni güçlere dönüştürmeyi amaçlar.',
          'Harari bunu eski ve yeni dünya haritaları üzerinden güzel bir örnekle anlatır. Orta Çağ haritaları bilinmeyen bölgeleri bile hayali canavarlarla ve şehirlerle doldururdu. 16. yüzyıldan itibaren ise Avrupalılar haritalarda boş alanlar bırakmaya başlar. Bu boşluklar, keşfedilmeyi bekleyen bilinmeyeni simgeler. Kolomb’un ve onu izleyen kâşiflerin yolculukları da bu merakın ve fethetme arzusunun ürünüdür.',
          'Harari’ye göre bilim tek başına gelişmemiştir. Onu büyüten iki büyük ortağı vardır: imparatorluklar ve kapitalizm. Avrupa devletleri kâşifleri, botanikçileri ve haritacıları, yeni topraklar fethetmek için desteklemiştir. Bilim insanları da topladıkları bilgilerle bu imparatorlukların hem yönetimini hem de sömürüsünü kolaylaştırmıştır. Bu kısır döngü, Avrupa’nın birkaç yüzyıl içinde dünyanın büyük kısmına hâkim olmasını sağlamıştır.'
        ]
      },
      {
        title: 'Kapitalizmin Ruhu',
        image: { svg: industry, caption: 'Sanayi Devrimi’nin bacaları ve hiç durmayan büyüme eğrisi.' },
        text: [
          'Modern ekonominin temelinde Harari’nin dediği gibi şaşırtıcı bir inanç yatar: geleceğe duyulan güven. Eskiden insanlar ekonominin büyüyebileceğine inanmaz, pastanın büyüklüğünün sabit olduğunu düşünürdü. Bilimsel ilerleme ise insanlara yarının bugünden daha iyi olacağı inancını verdi. Bu inanç, “kredi” denen sihirli mekanizmayı mümkün kıldı. Bankalar henüz var olmayan bir gelecek adına bugün para verdi, girişimciler bu parayla yeni işler kurdu ve ekonomi gerçekten büyüdü.',
          'Sanayi Devrimi ise bu büyümeye inanılmaz bir enerji kazandırdı. Kömür, petrol ve elektrik; insanlığın kullanabildiği enerji miktarını, kas gücüyle karşılaştırılamayacak kadar artırdı. Fabrikalar, trenler ve buharlı gemiler, üretimi binlerce kat hızlandırdı. Ama bu üretimi satabilmek için yeni bir ahlak gerekiyordu: tüketicilik. Eskiden tutumluluk bir erdem sayılırken, artık daha fazla satın almak, kendini şımartmak ve mutluluğu alışverişte aramak teşvik edilmeye başlandı.',
          'Harari bu süreçte ailenin ve yerel topluluğun çözüldüğünü de vurgular. Binlerce yıl boyunca insanların hayatını belirleyen aile ve köy, yerini devlete ve piyasaya bıraktı. Artık eğitim, sağlık, güvenlik ve emeklilik gibi ihtiyaçları devlet ve şirketler karşılıyordu. İnsanlar daha özgür, ama aynı zamanda daha yalnız bireylere dönüştü.'
        ]
      },
      {
        title: 'Daha Mutlu muyuz?',
        image: { svg: happiness, caption: 'Işıklı bir şehrin kalabalığı içinde yalnız bir insan.' },
        text: [
          'Bütün bu devrimler bizi daha mutlu yaptı mı? Harari’ye göre bu soru, tarihçilerin pek sormadığı ama belki de en önemli sorudur. Bugün dünyada, tarihin hiçbir döneminde olmadığı kadar çok yiyecek, ilaç ve konfor var. Kıtlıklar, salgınlar ve savaşlar eskiye göre çok daha az insan öldürüyor. Ama bir ortaçağ köylüsünün, bugünkü bir şehirliden daha mutsuz olduğunu kesin olarak söylemek zor.',
          'Psikoloji ve biyoloji, mutluluğun büyük ölçüde beynimizdeki kimyasallara ve beklentilerimize bağlı olduğunu gösteriyor. Koşullarımız iyileştikçe beklentilerimiz de yükseliyor ve kısa süre sonra yeni duruma alışıyoruz. Bir piyango talihlisi birkaç yıl sonra eskisi kadar mutlu ya da mutsuz hâle geliyor. Budizm ise binlerce yıl önce bambaşka bir cevap vermişti: Asıl mutluluk, hoş duyguların peşinden koşmaktan değil, onların gelip geçici olduğunu kabul etmekten doğar.',
          'Harari, tarihin bize kesin bir cevap sunmadığını kabul eder. Ama bir şey açıktır: Biz daha güçlü hâle geldik, fakat bu gücü nasıl kullanacağımızı ve bizi gerçekten neyin mutlu edeceğini hâlâ bilmiyoruz. Üstelik bu gücün bedelini başka canlılar ve gezegenin kendisi ödüyor.'
        ]
      },
      {
        title: 'Homo Sapiens’in Sonu',
        image: { svg: future, caption: 'Biyoloji ile teknolojinin birleştiği yeni bir insan.' },
        text: [
          'Kitabın son bölümünde Harari, geleceğe dair ürpertici bir öngörüde bulunur. Dört milyar yıl boyunca canlılar yalnızca doğal seçilim yoluyla değişti. Ama artık Sapiens, bu yasaları aşmaya başladı. Genetik mühendisliğiyle bitkileri ve hayvanları yeniden tasarlıyor, biyonik organlarla bedenlerini güçlendiriyor ve yapay zekâ ile kendi zihnine benzeyen sistemler yaratıyor.',
          'Harari’ye göre bu gelişmeler, Homo sapiens’in sonunu getirebilir. Bu bir felaket ya da savaşla değil, insanın kendini yavaş yavaş yeniden tasarlamasıyla gerçekleşebilir. Gelecekte yaşayacak varlıklar bizden, bizim Neandertallerden farklı olduğumuzdan çok daha farklı olabilir. Bu varlıkların değerleri, arzuları ve kimlikleri hakkında bugün hiçbir şey bilemeyiz.',
          'Harari kitabı sert bir uyarıyla kapatır. Ona göre Sapiens yetmiş bin yıl önce önemsiz bir hayvandı, bugün ise neredeyse tanrılara benzeyen güçlere sahip. Ama hâlâ ne istediğini bilmiyor, sorumsuzca davranıyor ve kendi rahatından başka pek az şeyi düşünüyor. Kitabın son sorusu hepimize yöneliktir: Ne istediğini bilmeyen, kendinden memnun olmayan ve sorumsuz tanrılardan daha tehlikeli bir şey olabilir mi?'
        ]
      }
    ]
  };
})();
