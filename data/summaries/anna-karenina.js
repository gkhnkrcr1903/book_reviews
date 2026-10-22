// Anna Karenina — Lev Tolstoy (1877)
// Sahneler data/scenes.js yardımcılarıyla çizilir; ileride image.src ile gerçek çizimlerle değiştirilebilir.
(() => {
  const { svg, glow, skyline, figure, seated, streaks, dots } = window.Scene;

  const train = (x, y, s, c, id, lamp = true) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}">
    <rect x="0" y="-60" width="120" height="60"/><rect x="90" y="-90" width="30" height="30"/><rect x="10" y="-80" width="16" height="22"/>
    <path d="M120 -40 L150 0 H120 Z"/>${[20, 60, 100].map(cx => `<circle cx="${cx}" cy="4" r="12"/>`).join('')}
    ${Array.from({ length: 3 }, (_, k) => `<rect x="${-130 - k * 130}" y="-50" width="120" height="50"/>${Array.from({ length: 4 }, (_, w) => `<rect x="${-120 - k * 130 + w * 28}" y="-40" width="18" height="16" fill="#ffd88a" opacity=".8"/>`).join('')}<circle cx="${-110 - k * 130}" cy="4" r="10"/><circle cx="${-30 - k * 130}" cy="4" r="10"/>`).join('')}
    </g>${lamp ? glow(id, x + 150 * s, y - 30 * s, 80 * s, '#fff0b0', .8) : ''}`;

  // 1 — Moskova istasyonu, karlı bir sabah
  const station = svg({
    sky: ['#3a4048', '#6a7078', '#9aa0a8'],
    vignette: .55, grain: .18,
    body: id => `
      <rect x="0" y="40" width="800" height="16" fill="#1a1c20"/>${Array.from({ length: 9 }, (_, i) => `<rect x="${i * 100}" y="56" width="10" height="210" fill="#1a1c20"/>`).join('')}
      ${train(600, 290, 1.2, '#0e1014', id)}
      <path d="M690 180 q-40 -60 20 -110 q60 -40 0 -80" stroke="#e8ecf0" stroke-width="40" fill="none" opacity=".35" filter="url(#${id}blur)"/>
      <rect y="300" width="800" height="100" fill="#2a2c30"/>
      <line x1="0" y1="310" x2="800" y2="310" stroke="#5a5c60" stroke-width="3"/>
      ${figure(240, 360, 1.8, '#1a1014', { dress: true, shawl: '#3a1a2a' })}${figure(300, 360, 1.9, '#0a0a0e', { hat: true })}
      ${streaks(7, 180, '#fff', 6, -3, .6, 2)}`
  });

  // 2 — Kitty’nin balosu ve Vronski
  const ball = svg({
    sky: ['#2a1a2a', '#4a2a3a', '#2a1a2a'],
    vignette: .5,
    body: id => `
      ${glow(id, 400, 80, 300, '#ffe0a0', .5)}
      ${[200, 400, 600].map(x => `<line x1="${x}" y1="0" x2="${x}" y2="50" stroke="#d9a83a"/>${glow(id, x, 60, 70, '#fff4c0', .7)}<circle cx="${x}" cy="60" r="8" fill="#fff4c0"/>`).join('')}
      <rect y="290" width="800" height="110" fill="#4a2a24"/>
      <g transform="translate(360 330)"><path d="M-14 -50 Q0 -56 14 -50 L32 0 H-32 Z" fill="#1a0e14"/><circle cy="-62" r="9" fill="#1a0e14"/></g>
      ${figure(410, 330, 1.9, '#0a0a0a')}
      <g transform="translate(150 330)"><path d="M-14 -50 Q0 -56 14 -50 L32 0 H-32 Z" fill="#f4d8e0"/><circle cy="-62" r="9" fill="#f4d8e0"/></g>
      ${[560, 620, 680].map((x, i) => figure(x, 320, 1.3, i % 2 ? '#4a1a2a' : '#0a0a0a', i % 2 ? { dress: true } : {})).join('')}`
  });

  // 3 — Levin ve tırpancılar
  const mowing = svg({
    sky: ['#8ab0d0', '#c8dce8', '#f4ecc8'],
    vignette: .35, grain: .12,
    body: id => `
      ${glow(id, 600, 100, 180, '#fff8d8', .7)}
      <path d="M0 220 Q400 200 800 220 V400 H0 Z" fill="#c8b860"/>
      ${Array.from({ length: 10 }, (_, i) => `<path d="M0 ${240 + i * 16} Q400 ${232 + i * 16} 800 ${242 + i * 16}" stroke="#a8983a" stroke-width="2" fill="none" opacity=".6"/>`).join('')}
      ${[180, 280, 380, 480, 580].map((x, i) => `${figure(x, 330 - i * 6, 1.4 - i * .06, i === 2 ? '#e8e0d0' : '#3a2a1a', { hat: i !== 2 })}<path d="M${x + 8} ${290 - i * 6} L${x + 40} ${330 - i * 6} Q${x + 70} ${334 - i * 6} ${x + 80} ${322 - i * 6}" stroke="#3a2a1a" stroke-width="2.5" fill="none"/>`).join('')}
      ${Array.from({ length: 8 }, (_, i) => `<g transform="translate(${80 + i * 100} 216)"><rect x="-3" y="-40" width="6" height="40" fill="#e8e4dc"/><ellipse cy="-56" rx="24" ry="28" fill="#6a9a4a"/></g>`).join('')}`
  });

  // 4 — At yarışı
  const race = svg({
    sky: ['#a8b8c8', '#d0d8e0', '#ece8e0'],
    vignette: .4, grain: .14,
    body: id => `
      <rect x="0" y="120" width="800" height="70" fill="#4a3a3a"/>${Array.from({ length: 30 }, (_, i) => `<circle cx="${10 + i * 27}" cy="${140 + (i % 3) * 12}" r="7" fill="#2a1a1a"/>`).join('')}
      <rect y="190" width="800" height="210" fill="#6a9a4a"/>
      <g stroke="#f4f4f4" stroke-width="5">${Array.from({ length: 20 }, (_, i) => `<line x1="${i * 42}" y1="200" x2="${i * 42}" y2="230"/>`).join('')}<line x1="0" y1="206" x2="800" y2="206"/></g>
      <rect x="360" y="270" width="80" height="40" fill="#5a3a2a"/>${Array.from({ length: 8 }, (_, k) => `<line x1="${364 + k * 10}" y1="270" x2="${364 + k * 10}" y2="252" stroke="#3a5a2a" stroke-width="3"/>`).join('')}
      <g transform="translate(400 260) scale(2) rotate(-12)" fill="#1a1010"><path d="M-30 -10 Q-10 -20 20 -14 L36 -30 Q44 -36 48 -28 L44 -20 L34 -14 L40 4 L34 6 L26 -6 L-16 -6 L-30 10 L-36 6 L-26 -8 Q-38 -8 -44 -2 L-46 -6 Q-42 -14 -30 -10 Z"/></g>
      ${figure(392, 222, 1, '#a82a2a', { hat: true })}`
  });

  // 5 — İtalya’da kaçış
  const italy = svg({
    sky: ['#e88a5a', '#f4b47a', '#f8d8a8'],
    vignette: .4, grain: .12,
    body: id => `
      ${glow(id, 400, 260, 300, '#fff0c0', .8)}<circle cx="400" cy="260" r="50" fill="#fff4d8"/>
      <rect y="270" width="800" height="130" fill="#3a6a8a"/>${Array.from({ length: 10 }, (_, i) => `<line x1="${330 + (i * 47) % 140}" y1="${280 + i * 10}" x2="${370 + (i * 47) % 140}" y2="${280 + i * 10}" stroke="#fff4d8" stroke-width="2" opacity="${.7 - i * .06}"/>`).join('')}
      <g fill="#5a3a2a">${[60, 120, 180].map((x, i) => `<rect x="${x}" y="${160 + i * 20}" width="50" height="${110 - i * 20}"/>`).join('')}<rect x="600" y="140" width="60" height="130"/><rect x="670" y="180" width="60" height="90"/></g>
      ${Array.from({ length: 4 }, (_, i) => `<g transform="translate(${260 + i * 26} 270)"><rect x="-2" y="-90" width="4" height="90" fill="#2a3a1a"/><ellipse cy="-96" rx="8" ry="22" fill="#2a4a1a"/></g>`).join('')}
      <rect x="0" y="330" width="800" height="70" fill="#8a6a4a"/>
      ${figure(500, 350, 1.6, '#2a1418', { dress: true, shawl: '#e8dcc4' })}${figure(550, 350, 1.7, '#1a1414', { hat: true })}`
  });

  // 6 — Oğluna gizli ziyaret
  const seryozha = svg({
    sky: ['#2a2a34', '#3a3a46', '#2a2a34'],
    vignette: .65,
    body: id => `
      <rect x="520" y="60" width="160" height="200" fill="#8aa0c0" opacity=".45"/><line x1="600" y1="60" x2="600" y2="260" stroke="#2a2a34" stroke-width="6"/>
      ${glow(id, 600, 160, 160, '#c8d8f0', .3)}
      <path d="M120 270 H380 V300 H120 Z" fill="#e8e0d8"/><rect x="120" y="250" width="50" height="22" rx="6" fill="#fff"/>
      <rect y="320" width="800" height="80" fill="#1a1a22"/>
      ${figure(300, 300, 1.1, '#3a4a6a')}
      <g transform="translate(330 300) scale(1.9)"><path d="M-14 -50 Q0 -56 14 -50 L30 0 H-30 Z" fill="#1a0e14"/><circle cy="-62" r="9" fill="#1a0e14"/><path d="M-14 -46 Q-30 -36 -26 -20" stroke="#1a0e14" stroke-width="4" fill="none"/></g>`
  });

  // 7 — Opera ve dışlanma
  const opera = svg({
    sky: ['#1a0a10', '#2a0e18', '#1a0a10'],
    vignette: .6,
    body: id => `
      ${glow(id, 400, 60, 260, '#ffd08a', .45)}
      ${Array.from({ length: 3 }, (_, r) => Array.from({ length: 8 }, (_, c) => `<path d="M${40 + c * 96} ${80 + r * 90} h80 v60 h-80 z" fill="#3a0e18"/><path d="M${40 + c * 96} ${80 + r * 90} q40 30 80 0" fill="#d9a83a" opacity=".5"/>`).join('')).join('')}
      ${Array.from({ length: 3 }, (_, r) => Array.from({ length: 8 }, (_, c) => (r + c) % 3 === 0 ? `<circle cx="${70 + c * 96}" cy="${122 + r * 90}" r="7" fill="#0a0406"/><circle cx="${96 + c * 96}" cy="${124 + r * 90}" r="7" fill="#0a0406"/>` : '').join('')).join('')}
      <rect x="328" y="170" width="80" height="60" fill="#5a1a2a"/>${glow(id, 368, 200, 60, '#fff0d0', .45)}
      <g transform="translate(368 228) scale(1.2)"><path d="M-14 -50 Q0 -56 14 -50 L30 0 H-30 Z" fill="#f4ecf0"/><circle cy="-62" r="9" fill="#f4ecf0"/></g>`
  });

  // 8 — Son istasyon ve Levin’in yıldızlı gecesi
  const ending = svg({
    sky: ['#04060e', '#0a1224', '#141e34'],
    vignette: .6,
    body: id => `
      ${dots(9, 200, '#fff', 1.3, .9, 0, 230)}
      <path d="M0 260 Q400 240 800 260 V400 H0 Z" fill="#0a0e18"/>
      <line x1="0" y1="300" x2="800" y2="300" stroke="#3a3e48" stroke-width="4"/><line x1="0" y1="316" x2="800" y2="316" stroke="#3a3e48" stroke-width="4"/>
      ${Array.from({ length: 20 }, (_, i) => `<rect x="${i * 42}" y="296" width="8" height="24" fill="#2a2e38"/>`).join('')}
      ${glow(id, 120, 290, 80, '#ffd88a', .6)}<circle cx="120" cy="290" r="8" fill="#fff4c0"/>
      <g transform="translate(560 260)"><rect x="-40" y="-40" width="80" height="40" fill="#0a0e18"/><polygon points="-46,-40 0,-66 46,-40" fill="#0a0e18"/><rect x="-8" y="-30" width="16" height="16" fill="#ffd88a"/></g>
      ${figure(640, 262, 1.4, '#000', { hat: true })}`
  });

  window.SUMMARIES['anna-karenina'] = {
    pages: [
      {
        title: 'Moskova’ya Gelen Kadın',
        image: { svg: station, caption: 'Moskova istasyonu: buhar, kar ve trenden inen bir kadın.' },
        text: [
          'Tolstoy, romanına dünya edebiyatının en ünlü cümlelerinden biriyle başlar: Bütün mutlu aileler birbirine benzer, her mutsuz ailenin ise kendine göre bir mutsuzluğu vardır. Moskova’daki Oblonski ailesinin evi tam bir karmaşa içindedir. Neşeli ve sorumsuz Stepan Arkadyeviç Oblonski, çocuklarının mürebbiyesiyle karısını aldatmış, karısı Dolly ise onu terk etmeye karar vermiştir. Stepan, Petersburg’da yaşayan kız kardeşi Anna’dan yardım ister.',
          'Anna Karenina, Petersburg’un en saygın kadınlarından biridir. Kendisinden yaşça çok büyük, soğuk ama güçlü bir devlet adamı olan Aleksey Aleksandroviç Karenin ile evlidir ve sekiz yaşındaki oğlu Seryoja’ya tapar. Zarif, zeki ve son derece çekici bir kadındır. Moskova’ya geldiği gün istasyonda trenden inerken, genç ve yakışıklı bir subay olan Kont Aleksey Vronski ile göz göze gelir.',
          'Tam o sırada istasyonda korkunç bir kaza olur. Bir demiryolu işçisi trenin altında kalarak ölür. Anna bu olayı kötü bir işaret olarak görür. Ardından Dolly ile konuşur ve onu kocasını affetmeye ikna ederek ailenin dağılmasını engeller. Ama kendi hayatında yeni bir kriz başlamak üzeredir. Tolstoy, daha bu ilk sayfalarda, romanın sonunu da gölgeleyecek olan trenin karanlık simgesini okura gösterir.'
        ]
      },
      {
        title: 'Bir Balo ve İki Aşk',
        image: { svg: ball, caption: 'Moskova’daki büyük balo: Anna’yla dans eden Vronski ve kenarda kalan Kitty.' },
        text: [
          'Romanın ikinci büyük hikâyesi, Konstantin Levin’in hikâyesidir. Levin, kırsalda kendi topraklarını işleten, şehir hayatından hoşlanmayan, dürüst, utangaç ve sürekli hayatın anlamını sorgulayan bir toprak sahibidir. Dolly’nin küçük kız kardeşi, on sekiz yaşındaki Kitty Şçerbatski’ye çocukluğundan beri âşıktır ve ona evlenme teklif etmek için Moskova’ya gelmiştir.',
          'Ama Kitty, Levin’i reddeder. Çünkü genç kız, kendisine kur yapan Vronski’nin kısa süre içinde evlenme teklif edeceğine inanmaktadır. Levin, kalbi kırık bir hâlde köyüne döner. O gece büyük bir balo verilir. Kitty, Vronski ile dans etmeyi beklerken, Vronski’nin bütün gece Anna’nın yanından ayrılmadığını görür. Anna’nın gözlerindeki o yasak ışığı ve Vronski’nin hayranlık dolu bakışlarını fark eden Kitty, büyük bir hayal kırıklığına uğrar.',
          'Anna, bu duyguların tehlikeli olduğunu bilir ve hemen Petersburg’a dönmeye karar verir. Ama trende yolculuk ederken, bir istasyonda Vronski’nin de aynı trende olduğunu görür. Vronski, onu takip ettiğini ve onu her yerde göreceğini açıkça söyler. Anna, Petersburg’a vardığında kocasına baktığında, onun kulaklarının daha önce hiç fark etmediği kadar büyük ve çirkin olduğunu düşünür. Bu küçük ayrıntı, aşkın ve hayal kırıklığının ilk işaretidir.'
        ]
      },
      {
        title: 'Levin ve Toprak',
        image: { svg: mowing, caption: 'Yaz sabahında köylülerle birlikte tırpan sallayan Levin.' },
        text: [
          'Kitty, Vronski’nin onu terk etmesinden sonra ağır bir şekilde hastalanır ve ailesi onu iyileşmesi için Almanya’daki bir kaplıcaya götürür. Levin ise reddedilmenin acısını unutmak için kendini çiftliğinin işlerine verir. Köylülerin geleneksel çalışma yöntemlerini, toprağın ve tarımın sorunlarını inceler ve Rus köylüsünün hayatını iyileştirmek için kitap yazmaya karar verir.',
          'Romanın en güzel sahnelerinden birinde Levin, bir yaz günü köylülerle birlikte bütün gün tırpan sallar. Başta zorlanır, ama zamanla kendini işin ritmine kaptırır. Kollarının sanki kendiliğinden hareket ettiği, düşüncelerinin sustuğu ve kendini doğanın bir parçası gibi hissettiği anlar yaşar. Levin için bu, şehirdeki entrikaların ve boş sohbetlerin tam tersidir. Gerçek mutluluğun bu basit, dürüst çalışmada olduğunu düşünür.',
          'Tolstoy, Levin karakterine kendi düşüncelerini, kuşkularını ve arayışlarını yükler. Levin’in hikâyesi, Anna’nın tutkulu ve trajik hikâyesine bir karşı ağırlık oluşturur. Romanın iki ayrı yolu, iki farklı aşk anlayışını ve iki farklı yaşam biçimini temsil eder: biri tutkuyla yanıp tükenen, diğeri ise sabırla ve sorgulamayla filizlenen.'
        ]
      },
      {
        title: 'At Yarışı',
        image: { svg: race, caption: 'Subayların at yarışı: Vronski’nin atı Frou-Frou engeli aşarken.' },
        text: [
          'Petersburg’da Anna ve Vronski’nin ilişkisi, kısa sürede tutkulu bir aşk ilişkisine dönüşür. Sosyete onlar hakkında dedikodu yapmaya başlar. Karenin ise ilk başta karısının davranışlarını görmezden gelir. Onun için önemli olan, aile içinde yaşananlardan çok, toplumun gözündeki itibarıdır. Anna’ya yalnızca dikkatli olmasını ve dedikodulara mahal vermemesini söyler.',
          'Bir gün subaylar arasında büyük bir at yarışı düzenlenir. Bütün sosyete, Karenin ve Anna da dahil, yarışı izlemeye gelir. Vronski, sevgili atı Frou-Frou ile yarışa katılır. Yarışın sonlarına doğru bir engelden atlarken yaptığı küçük bir hata yüzünden at yere düşer ve sırtı kırılır. Vronski, atını kendi eliyle vurmak zorunda kalır.',
          'Vronski düştüğü anda Anna, tribünde herkesin önünde kendini kaybeder ve dehşetle ağlamaya başlar. Eve dönerken arabada Karenin ona davranışının ne kadar uygunsuz olduğunu söyler. Anna ise artık bir şey saklamaz ve kocasına Vronski’yi sevdiğini, onun metresi olduğunu itiraf eder. Ayrıca Vronski’den bir çocuk beklemektedir. Karenin, boşanmayı reddeder ve Anna’dan dışarıdan bakıldığında hiçbir şey olmamış gibi davranmasını ister.'
        ]
      },
      {
        title: 'Ölümün Eşiğinde',
        image: { svg: italy, caption: 'İtalya’da gün batımı: toplumdan kaçan iki sevgili.' },
        text: [
          'Anna, kızını doğururken ateşli bir hastalığa yakalanır ve ölümün eşiğine gelir. Sayıklamaları sırasında Karenin’den af diler. Karenin, karısının bu hâlini görünce, hayatında ilk kez derin bir merhamet duyar. Hem Anna’yı hem de Vronski’yi bağışlar ve yeni doğan kızı bile kendi çocuğu gibi sahiplenir. Vronski ise bu büyüklük karşısında kendini aşağılanmış ve utanmış hisseder ve kendini vurmaya çalışır, ama ölmez.',
          'Anna iyileşince Karenin’in bu cömertliğine katlanamaz. Onun iyiliği bile ona boğucu gelir. Karenin’den boşanmadan, oğlu Seryoja’yı da arkasında bırakarak, Vronski ve küçük kızlarıyla birlikte yurt dışına, İtalya’ya kaçar. Vronski, Anna için askerlik kariyerinden vazgeçmiştir.',
          'İtalya’da Anna ve Vronski bir süre mutlu olurlar. Güneşli şehirlerde dolaşır, eski sarayları gezer, sanatla ilgilenirler. Vronski resim yapmaya başlar. Ama zamanla ikisi de sıkılmaya başlar. Anna, oğlundan ayrı kalmanın acısını derinden hisseder. Vronski ise hayatının anlamını yitirdiğini, sadece Anna’nın sevgisinden ibaret bir hayatın kendisine yetmediğini fark eder.'
        ]
      },
      {
        title: 'Seryoja ve Kitty',
        image: { svg: seryozha, caption: 'Doğum günü sabahı oğlunun odasına gizlice giren bir anne.' },
        text: [
          'Petersburg’a döndüklerinde Anna, toplum tarafından tamamen dışlandığını görür. Bir zamanlar evinde ağırladığı kadınlar artık onunla konuşmaz. Vronski ise erkek olduğu için toplumda kabul görmeye devam eder. Anna, oğlu Seryoja’yı görmek için Karenin’den izin ister, ama Karenin artık dindar ve sert bir dostunun etkisi altındadır ve buna izin vermez.',
          'Anna, Seryoja’nın doğum günü sabahı, hizmetçilere rüşvet vererek gizlice evine girer. Oğlunu uyandırır, onu kucaklar ve ağlar. Seryoja, annesinin öldüğünü söyleyen herkese inanmadığını, onu her zaman beklediğini söyler. Ama tam o sırada Karenin içeri girer ve Anna kaçmak zorunda kalır. Bu sahne, Anna’nın hayatındaki en büyük acının, oğlundan ayrılmak olduğunu gösterir.',
          'Bu arada Levin’in hayatı tam tersi bir yöne gider. Kitty iyileşmiş ve Vronski’ye olan duygularının bir yanılsama olduğunu anlamıştır. Levin ile yeniden karşılaştıklarında, Levin bir masanın üzerine tebeşirle sadece kelimelerin baş harflerini yazarak ona duygularını anlatmaya çalışır. Kitty, bu harflerden ne demek istediğini hemen anlar ve aynı yöntemle cevap verir. Kısa süre sonra evlenirler ve Levin’in köyüne yerleşirler.'
        ]
      },
      {
        title: 'Bir Opera Gecesi',
        image: { svg: opera, caption: 'Locasında yalnız oturan Anna ve ona dönen yüzlerce dürbün.' },
        text: [
          'Anna, toplumun kendisini nasıl dışladığını görmek için cesur ama yıkıcı bir karar verir ve tek başına operaya gider. Locasına oturduğu anda bütün salonun gözleri ona döner. Yan locadaki bir kadın, Anna’nın yanında oturmayı onur kırıcı bularak yüksek sesle hakaret eder ve salonu terk eder. Anna büyük bir aşağılanma yaşar, ama başını dik tutar.',
          'Bu olaydan sonra Anna ve Vronski, Vronski’nin kırsaldaki büyük malikânesine yerleşirler. Vronski, çiftliğini modernleştirmek, hastane yapmak ve yerel siyasetle uğraşmak için büyük çaba gösterir. Anna ise kendini kitaplara, hayvanlara ve misafirlerine verir. Ama ikisi arasındaki gerilim giderek artar. Anna, Vronski’nin kendisinden sıkıldığına, onu artık sevmediğine ve başka bir kadınla evlenmek istediğine inanmaya başlar.',
          'Anna’nın kıskançlığı, bir saplantıya dönüşür. Vronski’nin her gidişini, her mektubunu ve her gecikmesini şüpheyle karşılar. Uyumak için morfin kullanmaya başlar. Vronski ise kendini giderek daha çok sıkışmış hisseder. Karenin hâlâ boşanmayı kabul etmediği için Anna’nın durumu hiçbir zaman düzelemez. Tolstoy, toplumun ikiyüzlülüğünün ve bir insanın yalnızlaşmasının, bir aşkı nasıl yavaş yavaş zehirlediğini acı bir dürüstlükle anlatır.'
        ]
      },
      {
        title: 'Tren ve Yıldızlar',
        image: { svg: ending, caption: 'Gece istasyonu ve uzakta yıldızlara bakan bir adam.' },
        text: [
          'Bir gün Anna ve Vronski şiddetli bir kavga eder. Vronski evden ayrılıp annesinin yanına gittiğinde, Anna onun peşinden gitmeye karar verir. Arabanın içinde, sonra trende, etrafındaki herkesi sahte, bencil ve nefret dolu olarak görür. Hayatını, sevgisini ve geleceğini düşündükçe, bütün yolların kapandığına inanır. Vronski’yi cezalandırmak ve kendi acısından kurtulmak için korkunç bir karar verir.',
          'Bir tren istasyonunda inen Anna, raylar boyunca yürür ve yaklaşan bir yük treninin altına atılır. Son anda neden bunu yaptığını sorgular, ama artık çok geçtir. Romanın başında istasyonda gördüğü o ölüm, onun da sonu olur. Vronski, yaşadığı derin acı ve suçlulukla, ölmek için gönüllü olarak Sırbistan’daki savaşa gider.',
          'Romanın son bölümünde Levin, Kitty ve yeni doğan oğluyla birlikte köyündedir. Hayatın anlamı ve inanç üzerine düşünmekten bunalmıştır. Bir gün basit bir köylünün, insanın kendisi için değil, Tanrı için ve ruhu için yaşaması gerektiğini söylemesi onu derinden etkiler. Bir gece yıldızlı gökyüzüne bakarken, iyiliğin ve sevginin aklın ötesinde bir anlam taşıdığını hisseder. Tolstoy, iki farklı hikâyeyi bu iki son üzerinden birbirine bağlar: biri tutkunun yıkımıyla, diğeri ise sabrın ve sevginin yavaş yavaş açtığı bir yolla biter.'
        ]
      }
    ]
  };
})();
