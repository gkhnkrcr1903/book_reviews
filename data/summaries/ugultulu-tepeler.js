// Uğultulu Tepeler — Emily Brontë (1847)
// Sahneler data/scenes.js yardımcılarıyla çizilir; ileride image.src ile gerçek çizimlerle değiştirilebilir.
(() => {
  const { svg, glow, skyline, figure, seated, streaks, dots } = window.Scene;

  const heights = (x, y, s, c, lit) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-90" y="-70" width="180" height="70" fill="${c}"/><polygon points="-100,-70 0,-110 100,-70" fill="${c}"/><rect x="50" y="-130" width="20" height="40" fill="${c}"/>
    ${[-60, -20, 30].map(dx => `<rect x="${dx}" y="-52" width="18" height="24" fill="${lit || '#1a1a1a'}" opacity="${lit ? .85 : 1}"/>`).join('')}</g>`;
  const bentTree = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})" stroke="${c}" fill="none" stroke-linecap="round"><path d="M0 0 Q10 -40 40 -70" stroke-width="10"/><path d="M30 -60 Q60 -70 90 -66" stroke-width="5"/><path d="M36 -66 Q60 -90 84 -94" stroke-width="4"/><path d="M20 -44 Q50 -46 70 -40" stroke-width="4"/></g>`;
  const moor = (y, c) => `<path d="M0 ${y} Q120 ${y - 30} 260 ${y - 10} Q400 ${y - 40} 540 ${y - 12} Q680 ${y - 34} 800 ${y - 8} V400 H0 Z" fill="${c}"/>`;

  // 1 — Fırtınalı tepelerde bir ev
  const arrival = svg({
    sky: ['#2a3038', '#4a5058', '#6a6e70'],
    vignette: .6, grain: .2,
    body: id => `
      ${Array.from({ length: 6 }, (_, i) => `<ellipse cx="${80 + i * 140}" cy="${60 + (i % 2) * 30}" rx="140" ry="34" fill="#1a1e24" opacity=".6" filter="url(#${id}blur)"/>`).join('')}
      ${moor(260, '#3a3a2a')}
      ${heights(460, 240, 1.2, '#14161a', '#ffc070')}${glow(id, 460, 200, 80, '#ffc070', .4)}
      ${bentTree(600, 250, 1.2, '#14161a')}${bentTree(660, 250, .9, '#14161a')}
      ${moor(320, '#2a2a1e')}
      ${figure(200, 350, 1.6, '#0a0a0a', { hat: true })}
      ${streaks(37, 180, '#d8dce0', 14, 30, .3)}`
  });

  // 2 — Pencereye vuran el: Catherine’in hayaleti
  const ghost = svg({
    sky: ['#0a0e14', '#141a22', '#0a0e14'],
    vignette: .8,
    body: id => `
      <rect x="260" y="60" width="280" height="260" fill="#1a2230"/>
      <rect x="270" y="70" width="260" height="240" fill="#2a3a4a" opacity=".6"/>
      <line x1="400" y1="70" x2="400" y2="310" stroke="#0a0e14" stroke-width="8"/><line x1="270" y1="190" x2="530" y2="190" stroke="#0a0e14" stroke-width="8"/>
      ${glow(id, 460, 150, 120, '#c8e0ff', .45)}
      <g transform="translate(460 150)" fill="#e8f0ff" opacity=".75"><ellipse cx="0" cy="0" rx="14" ry="22"/>${[-10, -4, 2, 8].map(x => `<rect x="${x}" y="-44" width="5" height="26" rx="2"/>`).join('')}</g>
      <g fill="#c8d8e8" opacity=".35" transform="translate(470 250)"><circle cy="-40" r="20"/><path d="M-26 0 Q-20 -24 0 -24 Q20 -24 26 0 L30 60 H-30 Z"/></g>
      ${streaks(47, 140, '#c8d8e8', 26, -10, .45)}
      ${dots(47, 60, '#fff', 1.2, .5, 70, 310).replace(/cx="(\d+)"/g, (m, v) => `cx="${270 + (+v % 260)}"`)}`
  });

  // 3 — Çocukluk: kırlarda koşan iki çocuk
  const childhood = svg({
    sky: ['#7a8ab0', '#b8b0c8', '#e8c8b0'],
    vignette: .4, grain: .14,
    body: id => `
      ${glow(id, 600, 220, 220, '#fff0d0', .6)}
      ${moor(240, '#7a5a7a')}${moor(290, '#6a4a5a')}
      ${Array.from({ length: 70 }, (_, i) => `<circle cx="${(i * 37) % 800}" cy="${260 + (i * 19) % 140}" r="${2 + (i % 3)}" fill="#a86aa8" opacity=".7"/>`).join('')}
      <g transform="translate(330 330) rotate(-8)">${figure(0, 0, 1.4, '#2a1a1a', { dress: true, shawl: null })}</g>
      <g transform="translate(400 334) rotate(-8)">${figure(0, 0, 1.5, '#1a0e0a', {})}</g>
      ${bentTree(140, 260, 1, '#3a2a3a')}`
  });

  // 4 — Thrushcross Grange ve Linton’ların ışıklı salonu
  const grange = svg({
    sky: ['#0e1420', '#1a2234', '#24304a'],
    vignette: .6,
    body: id => `
      ${dots(5, 60, '#fff', 1, .7, 0, 160)}
      <path d="M0 260 Q400 240 800 260 V400 H0 Z" fill="#1a2a1a"/>
      <g transform="translate(450 270)"><rect x="-200" y="-140" width="400" height="140" fill="#2a2a34"/><polygon points="-210,-140 0,-180 210,-140" fill="#20202a"/>
        ${Array.from({ length: 2 }, (_, r) => Array.from({ length: 7 }, (_, k) => `<rect x="${-180 + k * 54}" y="${-120 + r * 60}" width="30" height="40" fill="#ffd090" opacity=".9"/>`).join('')).join('')}</g>
      ${glow(id, 450, 190, 220, '#ffd090', .35)}
      ${Array.from({ length: 6 }, (_, i) => `<g transform="translate(${30 + i * 40} 270)"><rect x="-3" y="-60" width="6" height="60" fill="#0a0e0a"/><circle cy="-76" r="24" fill="#0e140e"/></g>`).join('')}
      ${figure(150, 330, 1.3, '#05070a', {})}${figure(190, 330, 1.2, '#05070a', { dress: true })}
      <g transform="translate(220 340)" fill="#05070a"><path d="M-22 -20 H14 L22 -32 L30 -30 L28 -22 L20 -14 V0 H15 V-10 H-14 V0 H-19 V-12 L-28 -22 Z"/></g>`
  });

  // 5 — Mutfakta itiraf: “Ben Heathcliff’im”
  const kitchen = svg({
    sky: ['#1a0e08', '#2a180c', '#1a0e08'],
    vignette: .7,
    body: id => `
      ${glow(id, 220, 260, 220, '#ff9a3a', .55)}
      <rect x="140" y="200" width="160" height="140" fill="#2a1408"/><rect x="160" y="230" width="120" height="100" fill="#ff8a2a" opacity=".8"/>
      <path d="M180 330 l20 -40 l20 40 z M220 330 l20 -50 l20 50 z" fill="#ffd04a"/>
      <rect y="340" width="800" height="60" fill="#140a04"/>
      ${seated(420, 340, 1.8, '#3a1a1a')}${seated(520, 340, 1.6, '#4a3a2a', true)}
      <g transform="translate(700 340)"><rect x="-6" y="-200" width="12" height="200" fill="#2a1408"/><rect x="-40" y="-200" width="80" height="200" fill="#0a0604" opacity=".9"/></g>
      ${figure(690, 340, 1.8, '#000', {})}`
  });

  // 6 — Heathcliff’in dönüşü ve intikam
  const revenge = svg({
    sky: ['#14100e', '#2a201a', '#3a2a20'],
    vignette: .7, grain: .2,
    body: id => `
      ${moor(270, '#1a1410')}
      ${heights(400, 260, 1.4, '#0a0806', null)}
      <rect x="320" y="200" width="30" height="40" fill="#a83a1a" opacity=".8"/>${glow(id, 335, 220, 40, '#ff7a3a', .5)}
      ${figure(560, 350, 2.2, '#000', { hat: true })}
      <path d="M560 350 L800 400 L640 400 Z" fill="#000" opacity=".45"/>
      ${streaks(57, 90, '#a8a0a0', 30, 40, .25)}`
  });

  // 7 — Catherine’in ölümü ve mezar
  const grave = svg({
    sky: ['#3a4048', '#6a7078', '#9aa0a0'],
    vignette: .55, grain: .2,
    body: id => `
      ${moor(260, '#4a4a3a')}
      <g transform="translate(560 200)" fill="#2a2a30"><rect x="-30" y="-80" width="60" height="80"/><polygon points="-36,-80 0,-120 36,-80"/><rect x="-6" y="-140" width="12" height="24"/></g>
      ${[[300, 1], [380, 1.1], [460, .9]].map(([x, s]) => `<g transform="translate(${x} 320) scale(${s})"><path d="M-20 0 V-50 Q0 -70 20 -50 V0 Z" fill="#6a6a70"/></g>`).join('')}
      ${Array.from({ length: 40 }, (_, i) => `<line x1="${200 + (i * 13) % 360}" y1="330" x2="${204 + (i * 13) % 360}" y2="${316 - (i % 4) * 3}" stroke="#5a6a3a" stroke-width="2"/>`).join('')}
      ${figure(220, 350, 1.8, '#0a0a0a', {})}
      ${bentTree(680, 270, 1.1, '#2a2a28')}`
  });

  // 8 — Yeni kuşak: Cathy ve Hareton, bahar
  const spring = svg({
    sky: ['#9ab8d8', '#c8d8e4', '#f4ecd8'],
    vignette: .35, grain: .12,
    body: id => `
      ${glow(id, 640, 100, 160, '#fff8d8', .7)}
      ${moor(260, '#8a9a5a')}
      ${heights(560, 250, 1, '#5a5048', '#ffe0a0')}
      ${Array.from({ length: 40 }, (_, i) => `<circle cx="${(i * 43) % 800}" cy="${290 + (i * 17) % 100}" r="3" fill="${i % 2 ? '#f4e04a' : '#fff'}"/>`).join('')}
      <rect x="220" y="320" width="120" height="10" fill="#5a3a2a"/>${seated(250, 320, 1.3, '#3a2a1a')}${seated(310, 320, 1.3, '#5a3a4a', true)}
      <rect x="268" y="290" width="26" height="18" fill="#e8dcc4"/>`
  });

  window.SUMMARIES['ugultulu-tepeler'] = {
    pages: [
      {
        title: 'Rüzgârın Evi',
        image: { svg: arrival, caption: 'Yorkshire’ın fırtınalı tepelerinde yalnız bir ev ve rüzgârın büktüğü ağaçlar.' },
        text: [
          'Emily Brontë’nin tek romanı, 1801 yılında, Bay Lockwood adında bir beyefendinin günlüğüyle başlar. Lockwood, İngiltere’nin kuzeyindeki Yorkshire kırlarında, Thrushcross Grange adlı bir malikâneyi kiralamıştır. Ev sahibine nezaket ziyareti yapmak için birkaç mil ötedeki Uğultulu Tepeler’e, yani Wuthering Heights’a gider. Bu ev, adını tepelerin üzerinde hiç dinmeyen rüzgârlardan alır. Evin çevresindeki ağaçlar bile rüzgârın etkisiyle tek bir yöne doğru eğilmiştir.',
          'Evin sahibi Heathcliff, esmer, uzun boylu, sert ve son derece kaba bir adamdır. Evde onunla birlikte, genç ve güzel ama mutsuz bir dul olan Cathy ve kaba, okuma yazma bilmeyen bir genç olan Hareton yaşar. Hepsi birbirine düşmanca davranır. Ev, karanlık, soğuk ve tehdit dolu bir havaya sahiptir. Lockwood, ikinci ziyaretinde kar fırtınası yüzünden geceyi orada geçirmek zorunda kalır.',
          'Brontë, bu gizemli ve kasvetli başlangıçla okuru büyük bir sırrın kapısına getirir. Bu insanlar kimdir, aralarında neler yaşanmıştır ve Heathcliff neden bu kadar nefret doludur? Romanın büyük bölümü, bu soruların cevabını, ailenin eski hizmetçisi Nelly Dean’in ağzından, yıllar öncesine uzanan bir hikâye olarak anlatır.'
        ]
      },
      {
        title: 'Penceredeki El',
        image: { svg: ghost, caption: 'Kar fırtınası gecesi pencereye vuran soğuk bir el.' },
        text: [
          'Lockwood, Uğultulu Tepeler’de kendisine verilen eski bir odada uyumaya çalışır. Odadaki pencere pervazında, tahtaya kazınmış üç isim görür: Catherine Earnshaw, Catherine Heathcliff ve Catherine Linton. Rafta bulduğu eski kitapların kenarlarında ise yıllar önce bir kız çocuğu tarafından yazılmış notlar vardır. Bu notlar, çocukluğunda Heathcliff ile birlikte yaşadığı mutsuz günleri ve ağabeyi Hindley’nin zulmünü anlatır.',
          'O gece Lockwood korkunç bir kâbus görür. Rüzgârda sürekli pencereye vuran bir dalı durdurmak için camı kırar ve elini dışarı uzatır. Ama tuttuğu şey bir dal değil, buz gibi küçük bir eldir. Dışarıdaki ağlayan ses, kendisinin Catherine Linton olduğunu, yirmi yıldır kayıp olduğunu ve içeri girmek istediğini söyler. Lockwood dehşet içinde bağırır.',
          'Heathcliff bu çığlığı duyar ve odaya gelir. Lockwood’u dışarı çıkarır, sonra pencereyi açar ve gözyaşları içinde, sanki gerçekten oradaymış gibi Catherine’i içeri çağırır. Hiç gelmeyen birine yalvarır. Bu sahne, okura Heathcliff’in sertliğinin ardında ne kadar derin ve korkunç bir acı yattığını ilk kez gösterir. Ertesi gün Lockwood, Thrushcross Grange’a döner ve hastalanır. Nelly Dean, onun başında oturarak hikâyeyi anlatmaya başlar.'
        ]
      },
      {
        title: 'Kırlarda İki Çocuk',
        image: { svg: childhood, caption: 'Funda kaplı kırlarda özgürce koşan Catherine ve Heathcliff.' },
        text: [
          'Yıllar önce Uğultulu Tepeler’in sahibi Bay Earnshaw, bir iş gezisinden döndüğünde paltosunun altında Liverpool sokaklarında bulduğu esmer, kimsesiz bir çocuk getirir. Çocuğa, ölen oğullarından birinin adını, Heathcliff adını verir. Bay Earnshaw, bu çocuğu kendi çocuklarından bile daha çok sever. Bu durum, oğlu Hindley’nin büyük bir kıskançlık duymasına neden olur. Hindley, Heathcliff’e sürekli eziyet eder.',
          'Ama Bay Earnshaw’ın kızı Catherine, Heathcliff ile kısa sürede ayrılmaz iki dost olur. İkisi de vahşi, inatçı ve özgür ruhlu çocuklardır. Günlerini funda kaplı kırlarda koşarak, kayalıklara tırmanarak ve evdeki baskıdan kaçarak geçirirler. Aralarında, sıradan bir dostluğun ya da aşkın çok ötesinde, sanki tek bir ruhu paylaşıyormuş gibi derin bir bağ kurulur.',
          'Bay Earnshaw öldükten sonra Hindley, karısıyla birlikte eve döner ve malikânenin efendisi olur. İlk işi, Heathcliff’i aşağılamak, onu eğitimden mahrum bırakmak ve bir hizmetçi gibi tarlada çalıştırmaktır. Heathcliff, bütün bu acıları Catherine’in sevgisi sayesinde katlanılabilir bulur. Ama içinde büyüyen nefret ve intikam arzusu, gelecekte hepsinin hayatını karartacaktır.'
        ]
      },
      {
        title: 'Thrushcross Grange',
        image: { svg: grange, caption: 'Linton’ların ışıklı malikânesine pencereden bakan iki çocuk.' },
        text: [
          'Bir gece Catherine ve Heathcliff, kırlarda dolaşırken komşu malikâne Thrushcross Grange’a kadar giderler ve pencereden zengin Linton ailesinin ışıklı salonunu gözetlerler. İçeride, Linton’ların şımarık çocukları Edgar ve Isabella, küçük bir köpek için kavga etmektedir. Catherine ve Heathcliff onlara gülerler. Ama tam o sırada Linton’ların köpeği Catherine’in bileğini ısırır.',
          'Linton ailesi yaralı Catherine’i içeri alır ve ona beş hafta boyunca bakar. Heathcliff ise “kaba bir çingene çocuğu” olarak kovulur. Catherine, Uğultulu Tepeler’e döndüğünde bambaşka bir insan olmuştur. İpek elbiseler giyer, kibar konuşur ve bir soylu hanım gibi davranır. Heathcliff’in kirli kıyafetlerini ve kaba tavırlarını görünce gülmekten kendini alamaz. Heathcliff büyük bir aşağılanma hisseder.',
          'Catherine, zamanla iki dünya arasında sıkışıp kalır. Bir yanda kalbinin ait olduğu vahşi kırlar ve Heathcliff, diğer yanda Edgar Linton’ın sunduğu zengin, kibar ve güvenli bir hayat vardır. Edgar, Catherine’e âşık olur ve ona evlenme teklif eder. Catherine, bu teklifi kabul eder.'
        ]
      },
      {
        title: 'Ben Heathcliff’im',
        image: { svg: kitchen, caption: 'Mutfak ateşinin başında Nelly’ye içini döken Catherine ve kapının ardında bir gölge.' },
        text: [
          'Edgar’ın teklifini kabul ettiği gece Catherine, mutfakta Nelly Dean’e kalbini açar. Edgar’ı yakışıklı, zengin ve kibar olduğu için sevdiğini, onunla evlenerek bölgenin en saygın kadını olacağını söyler. Ama bu evliliğin yanlış olduğunu da içten içe bilir. Heathcliff ile evlenmenin ise onu alçaltacağını söyler. Heathcliff, kapının arkasından bu sözleri duyar ve sessizce evi terk eder.',
          'Heathcliff’in cümlenin geri kalanını duymadığını bilmeyen Catherine, konuşmaya devam eder. Heathcliff’i yakışıklı olduğu için değil, kendisinden daha çok kendisi olduğu için sevdiğini, ruhları neyden yapılmışsa ikisinin de aynı şeyden yapıldığını söyler. Edgar’a olan sevgisinin ağaçların yaprakları gibi zamanla değişeceğini, Heathcliff’e olan sevgisinin ise yerin altındaki sonsuz kayalar gibi olduğunu anlatır. Sonunda ise romanın en ünlü cümlesini söyler: Nelly, ben Heathcliff’im.',
          'Catherine, Heathcliff’in gittiğini öğrendiğinde bütün gece yağmurda onu arar ve ağır bir şekilde hastalanır. Heathcliff ise yıllarca ortadan kaybolur. Catherine iyileştikten sonra Edgar Linton ile evlenir ve Thrushcross Grange’a yerleşir. Bir süre sessiz ve sakin bir hayat yaşar, ama içinde kalan boşluk hiçbir zaman dolmaz.'
        ]
      },
      {
        title: 'Dönüş ve İntikam',
        image: { svg: revenge, caption: 'Yıllar sonra zengin ve tehlikeli bir adam olarak tepelere dönen Heathcliff.' },
        text: [
          'Üç yıl sonra Heathcliff, kimsenin nasıl kazandığını bilmediği büyük bir servetle, zarif bir beyefendi olarak geri döner. Ama içindeki nefret hiç azalmamıştır. Hayatını, kendisine acı çektiren herkesten intikam almaya adar. Önce, karısını kaybettikten sonra kendini içkiye ve kumara veren Hindley’nin yanına yerleşir. Onunla kumar oynayarak bütün servetini, hatta Uğultulu Tepeler’in kendisini bile ele geçirir.',
          'Ardından Edgar’dan intikam almak için onun kız kardeşi Isabella’yı baştan çıkarır. Isabella, Heathcliff’in romantik bir kahraman olduğuna inanır ve onunla kaçar. Ama Heathcliff, ona en başından beri nefret ve zulümle davranır. Isabella, kısa süre sonra yaptığı hatayı anlar, ama artık geri dönüşü yoktur. Sonunda Heathcliff’ten kaçarak güneye gider ve orada Linton adında hasta bir oğlan çocuğu doğurur.',
          'Hindley’nin küçük oğlu Hareton da Heathcliff’in intikamının kurbanıdır. Heathcliff, babasının bir zamanlar kendisine yaptığı gibi, Hareton’u eğitimden mahrum bırakır, onu bir hizmetçi gibi büyütür ve onu kaba, cahil bir adama dönüştürür. Ama tuhaf bir şekilde Hareton, Heathcliff’i sever. Brontë, intikamın kuşaktan kuşağa nasıl aktarıldığını ve sevginin bile acıyla nasıl zehirlenebildiğini sarsıcı bir şekilde anlatır.'
        ]
      },
      {
        title: 'Ölümün Ötesinde',
        image: { svg: grave, caption: 'Kırların kenarındaki küçük kilise mezarlığı ve başında bekleyen bir adam.' },
        text: [
          'Heathcliff’in dönüşü, Catherine’in hayatını altüst eder. Edgar ile Heathcliff arasında sıkışır, ikisinden de vazgeçemez. Edgar, Heathcliff’in evlerine gelmesini yasaklayınca, Catherine kendini odasına kapatır, günlerce yemek yemez ve hem ruhen hem bedenen hastalanır. Heathcliff, Catherine’in ölmek üzere olduğunu öğrenince, Nelly’nin yardımıyla gizlice onun odasına girer.',
          'İkisi son kez kucaklaşır. Birbirlerini, sevgilerini ve hayatlarını mahvetmekle suçlarlar. Ama aynı zamanda birbirlerine bütün kalpleriyle sarılırlar. O gece Catherine, Edgar’ın kızı olan küçük Cathy’yi dünyaya getirir ve birkaç saat sonra ölür. Heathcliff, bahçede bir ağaca yaslanarak sabaha kadar bekler. Catherine’in öldüğünü öğrendiğinde, ona kendisinin rahat etmesine izin vermemesi, hayatı boyunca onu takip etmesi için yalvarır.',
          'Catherine, kilise mezarlığının bir köşesine, kırlara bakan bir yere gömülür. Heathcliff, onun mezarını bir gece açar ve yüzünü son bir kez görür. Mezarcıya, kendisi öldüğünde, aralarındaki tabutların yan taraflarının açılmasını, böylece ölümde bile birbirlerine karışmalarını ister. Bundan sonraki on sekiz yıl boyunca, Heathcliff’in tek amacı, yaşayan herkese karşı intikamını tamamlamak olur.'
        ]
      },
      {
        title: 'Rüzgâr Diner',
        image: { svg: spring, caption: 'Baharda, tepelerin üzerindeki evin önünde birlikte kitap okuyan iki genç.' },
        text: [
          'Yıllar sonra Heathcliff, intikamının son aşamasını gerçekleştirir. Edgar’ın kızı Cathy’yi, kendi hasta oğlu Linton ile zorla evlendirir. Böylece Edgar öldükten sonra Thrushcross Grange da Heathcliff’in eline geçer. Kısa süre sonra Linton da ölür. Cathy, Uğultulu Tepeler’de, Heathcliff ve kaba kuzeni Hareton ile birlikte, yalnız ve öfkeli bir dul olarak yaşamaya başlar. Lockwood’un hikâyenin başında gördüğü manzara budur.',
          'Ama zamanla Cathy ve Hareton arasında yavaş yavaş bir dostluk filizlenir. Cathy, başta alay ettiği Hareton’a okuma yazma öğretmeye başlar. Hareton ise ona karşı nazik ve sabırlı davranır. İkisi, aralarındaki bütün kin ve acıya rağmen birbirlerine âşık olurlar. Heathcliff, bu iki genci gördüğünde, onların yüzlerinde Catherine’in gözlerini görür ve içindeki intikam arzusu birden söner.',
          'Heathcliff, son günlerinde yemek yemeyi bırakır ve Catherine’in hayaletini her yerde görmeye başlar. Bir sabah, açık bir pencerenin önünde, yağmurda ıslanmış bir hâlde ölü bulunur. Catherine’in yanına gömülür. Köylüler, ikisinin hayaletlerinin kırlarda birlikte dolaştığını anlatır. Lockwood ise mezarların başında, ılık bir rüzgârın estiği huzurlu bir akşamda, bu insanların artık rahat uyuduğunu düşünür. Uğultulu Tepeler, tutkunun, intikamın ve ölümün ötesine geçen bir aşkın unutulmaz hikâyesidir.'
        ]
      }
    ]
  };
})();
