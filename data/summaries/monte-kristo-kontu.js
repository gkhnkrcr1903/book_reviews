// Monte Kristo Kontu — Alexandre Dumas (1844)
// Sahneler data/scenes.js yardımcılarıyla çizilir; ileride image.src ile gerçek çizimlerle değiştirilebilir.
(() => {
  const { svg, glow, skyline, figure, seated, streaks, dots } = window.Scene;

  const ship = (x, y, s, c, sail = '#e8dcc4') => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-80 0 H80 L64 18 H-64 Z" fill="${c}"/>
    ${[-40, 10, 50].map((dx, i) => `<line x1="${dx}" y1="0" x2="${dx}" y2="${-110 + Math.abs(i - 1) * 20}" stroke="${c}" stroke-width="3"/><path d="M${dx - 26} ${-100 + Math.abs(i - 1) * 20} H${dx + 26} Q${dx + 30} ${-60 + Math.abs(i - 1) * 20} ${dx + 26} -16 H${dx - 26} Q${dx - 30} -60 ${dx - 26} ${-100 + Math.abs(i - 1) * 20} Z" fill="${sail}"/>`).join('')}</g>`;
  const fortress = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}"><path d="M-140 0 L-120 -60 L120 -60 L140 0 Z"/><rect x="-100" y="-120" width="200" height="60"/>${[-100, -60, -20, 20, 60].map(dx => `<rect x="${dx}" y="-132" width="20" height="12"/>`).join('')}<rect x="60" y="-170" width="40" height="60"/><circle cx="-60" cy="-90" r="0"/></g>`;

  // 1 — Marsilya limanı, Firavun gemisi
  const marseille = svg({
    sky: ['#4a8ac0', '#8ab8d8', '#e8e0c8'],
    vignette: .35, grain: .12,
    body: id => `
      ${glow(id, 640, 90, 160, '#fff8d8', .7)}
      ${skyline({ y: 230, color: '#c8a880', seed: 151, lit: 0, minH: 40, maxH: 110 })}
      <rect y="230" width="800" height="170" fill="#2a6a9a"/>
      ${Array.from({ length: 12 }, (_, i) => `<path d="M${(i * 71) % 800} ${250 + i * 10} q20 -5 40 0" stroke="#d8ecf4" stroke-width="2" fill="none" opacity=".6"/>`).join('')}
      ${ship(420, 280, 1.3, '#3a2414')}
      <rect y="340" width="800" height="60" fill="#a8885a"/>
      ${figure(200, 370, 1.5, '#1a2a4a', { hat: true })}${figure(250, 372, 1.4, '#a83a3a', { dress: true, shawl: '#f4ecd8' })}
      ${[580, 620, 680].map(x => figure(x, 370, 1.2, '#3a2a1a', { hat: true })).join('')}`
  });

  // 2 — Château d’If
  const chateau = svg({
    sky: ['#1a2030', '#2a3448', '#3a4458'],
    vignette: .7, grain: .2,
    body: id => `
      ${streaks(161, 100, '#9ab0c8', 24, -12, .3)}
      <rect y="250" width="800" height="150" fill="#1a2838"/>
      ${Array.from({ length: 10 }, (_, i) => `<path d="M${(i * 83) % 800} ${270 + i * 12} q30 -8 60 0" stroke="#5a7a9a" stroke-width="2" fill="none" opacity=".6"/>`).join('')}
      <path d="M220 260 Q400 200 580 260 Z" fill="#2a2a30"/>
      ${fortress(400, 236, 1.1, '#3a3a42')}
      <rect x="470" y="90" width="10" height="14" fill="#ffc070"/>${glow(id, 475, 97, 30, '#ffc070', .7)}`
  });

  // 3 — Hücrede Faria rahip
  const faria = svg({
    sky: ['#14120e', '#1e1a14', '#14120e'],
    vignette: .8, grain: .24,
    body: id => `
      <rect x="0" y="0" width="800" height="400" fill="#2a2620"/>
      ${Array.from({ length: 8 }, (_, r) => Array.from({ length: 12 }, (_, c) => `<rect x="${c * 68 + (r % 2) * 34}" y="${r * 50}" width="64" height="46" fill="#34302a" opacity=".7"/>`).join('')).join('')}
      <rect x="360" y="40" width="80" height="50" fill="#5a7a9a"/>${[0, 1, 2].map(k => `<rect x="${366 + k * 26}" y="40" width="6" height="50" fill="#14120e"/>`).join('')}
      <path d="M280 330 Q300 300 340 300 Q380 300 400 330 Z" fill="#0a0806"/>
      ${glow(id, 400, 260, 160, '#ffc070', .4)}<rect x="396" y="270" width="8" height="18" fill="#e8dcc4"/><path d="M400 270 q-4 -8 0 -14 q4 6 0 14" fill="#ffd070"/>
      ${seated(320, 320, 1.5, '#0a0806')}${seated(480, 320, 1.5, '#3a3a3a', true)}
      <path d="M440 300 H520" stroke="#e8dcc4" stroke-width="2"/>
      <rect y="330" width="800" height="70" fill="#14120e"/>`
  });

  // 4 — Denize atılan çuval ve kaçış
  const escape = svg({
    sky: ['#04060c', '#0a0e1a', '#121828'],
    vignette: .7,
    body: id => `
      ${dots(171, 80, '#fff', 1.1, .7, 0, 180)}
      ${streaks(171, 160, '#9ab0d0', 30, -14, .4)}
      <path d="M0 0 L80 0 L180 400 L0 400 Z" fill="#14161c"/>${fortress(60, 120, .6, '#1a1c22')}
      <rect y="250" width="800" height="150" fill="#0a1424"/>
      ${Array.from({ length: 12 }, (_, i) => `<path d="M${(i * 71) % 800} ${270 + i * 10} q30 -8 60 0" stroke="#3a5a80" stroke-width="2" fill="none" opacity=".6"/>`).join('')}
      <g transform="translate(400 300)"><ellipse rx="40" ry="10" fill="#5a4a3a"/><circle cx="-30" cy="-6" r="10" fill="#0a0e18"/><path d="M-20 -10 l-20 -30" stroke="#0a0e18" stroke-width="4"/></g>
      ${[[350, 320], [460, 300], [420, 340]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="20" fill="none" stroke="#c8d8e8" stroke-width="1.5" opacity=".5"/>`).join('')}`
  });

  // 5 — Monte Kristo adasının hazinesi
  const treasure = svg({
    sky: ['#0a0604', '#1a1008', '#0a0604'],
    vignette: .75,
    body: id => `
      <path d="M0 0 H800 V120 Q600 80 400 100 Q200 120 0 80 Z" fill="#050302"/>
      <path d="M0 400 V300 Q200 280 400 300 Q600 320 800 290 V400 Z" fill="#140c06"/>
      ${glow(id, 400, 270, 260, '#ffd04a', .6)}
      <g transform="translate(400 300)"><rect x="-90" y="-60" width="180" height="60" fill="#5a3a1a"/><path d="M-90 -60 Q0 -110 90 -60" fill="#6a4a2a"/>
        ${Array.from({ length: 40 }, (_, i) => `<circle cx="${-80 + (i * 37) % 160}" cy="${-56 + (i % 4) * 4 - (i % 7)}" r="${4 + (i % 3)}" fill="${i % 5 ? '#d9a83a' : '#e85a5a'}"/>`).join('')}</g>
      ${Array.from({ length: 30 }, (_, i) => `<circle cx="${280 + (i * 41) % 240}" cy="${310 + (i * 13) % 40}" r="${3 + (i % 3)}" fill="${i % 6 ? '#d9a83a' : '#5ad8ff'}"/>`).join('')}
      ${figure(560, 330, 1.8, '#0a0604')}`
  });

  // 6 — Paris’te kontun salonu
  const paris = svg({
    sky: ['#2a1a20', '#4a2a30', '#2a1a20'],
    vignette: .55,
    body: id => `
      ${[200, 400, 600].map(x => `<line x1="${x}" y1="0" x2="${x}" y2="40" stroke="#d9a83a"/><path d="M${x - 40} 50 Q${x} 76 ${x + 40} 50" stroke="#d9a83a" stroke-width="3" fill="none"/>${glow(id, x, 54, 70, '#fff4c0', .75)}`).join('')}
      ${[80, 720].map(x => `<rect x="${x - 40}" y="100" width="80" height="180" fill="#140a10"/><rect x="${x - 34}" y="106" width="68" height="168" fill="#3a5a8a" opacity=".3"/>`).join('')}
      <rect y="290" width="800" height="110" fill="#4a2a1a"/>
      ${figure(400, 330, 2.1, '#05030a', {})}<path d="M384 198 h32 l4 -14 h-40 z" fill="#05030a"/>
      ${[[200, 0], [260, 1], [320, 0], [500, 1], [560, 0], [620, 1]].map(([x, d]) => figure(x, 320, 1.4, d ? '#5a1a2a' : '#1a1010', d ? { dress: true } : { hat: false })).join('')}`
  });

  // 7 — İntikamın tamamlanması
  const revenge = svg({
    sky: ['#14080a', '#2a0e12', '#14080a'],
    vignette: .75,
    body: id => `
      ${glow(id, 400, 200, 260, '#a8303a', .35)}
      <g transform="translate(170 200)" opacity=".85"><rect x="-60" y="-80" width="120" height="160" fill="#2a1418"/><rect x="-50" y="-70" width="100" height="140" fill="#5a2a2a"/><circle cy="-20" r="20" fill="#1a0a0a"/><path d="M-30 40 Q0 0 30 40 Z" fill="#1a0a0a"/></g>
      <g transform="translate(630 200)" opacity=".85"><rect x="-60" y="-80" width="120" height="160" fill="#2a1418"/><rect x="-50" y="-70" width="100" height="140" fill="#5a2a2a"/><circle cy="-20" r="20" fill="#1a0a0a"/><path d="M-30 40 Q0 0 30 40 Z" fill="#1a0a0a"/></g>
      <rect x="370" y="60" width="60" height="20" fill="#d9a83a"/><line x1="400" y1="80" x2="400" y2="180" stroke="#d9a83a" stroke-width="4"/>
      <path d="M340 180 Q400 150 460 180" stroke="#d9a83a" stroke-width="3" fill="none"/><path d="M330 180 h20 l-10 30 z M450 180 h20 l-10 30 z" fill="#d9a83a"/>
      <rect y="320" width="800" height="80" fill="#0a0406"/>
      ${figure(400, 340, 2, '#000', {})}`
  });

  // 8 — Denizde ufka giden bir yelkenli: bekle ve umut et
  const hope = svg({
    sky: ['#e8a070', '#f4c890', '#fae4c0'],
    vignette: .35, grain: .1,
    body: id => `
      ${glow(id, 400, 250, 320, '#fff4d8', .8)}<circle cx="400" cy="250" r="44" fill="#fff8e8"/>
      <rect y="260" width="800" height="140" fill="#4a7aa0"/>
      ${Array.from({ length: 12 }, (_, i) => `<line x1="${330 + (i * 47) % 140}" y1="${270 + i * 10}" x2="${370 + (i * 47) % 140}" y2="${270 + i * 10}" stroke="#fff4d8" stroke-width="2" opacity="${.7 - i * .05}"/>`).join('')}
      ${ship(560, 264, .6, '#2a1a1a', '#f4ecd8')}
      <path d="M0 320 Q100 300 200 320 L200 400 H0 Z" fill="#5a4a3a"/>
      ${figure(120, 320, 1.4, '#1a1a2a', {})}${figure(150, 320, 1.3, '#4a2a3a', { dress: true })}`
  });

  window.SUMMARIES['monte-kristo-kontu'] = {
    pages: [
      {
        title: 'Mutlu Bir Denizci',
        image: { svg: marseille, caption: 'Marsilya limanı, 1815: Firavun gemisi demir atarken iskelede bekleyen bir nişanlı.' },
        text: [
          'Alexandre Dumas’nın büyük macera romanı, 1815 yılının Şubat ayında, Marsilya limanında başlar. Firavun adlı ticaret gemisi limana yanaşırken, geminin on dokuz yaşındaki ikinci kaptanı Edmond Dantès, yolculuk sırasında ölen kaptanın yerine gemiyi yönetmektedir. Edmond dürüst, çalışkan ve herkes tarafından sevilen bir gençtir. Gemi sahibi Bay Morrel, onu yeni kaptan yapmaya karar verir.',
          'Edmond’un hayatı mutlulukla doludur. Yaşlı babasını çok sever ve güzel Katalan kızı Mercédès ile nişanlıdır. Ertesi gün nişan törenleri yapılacaktır. Ama bu mutluluk, çevresindeki bazı insanların kıskançlığını uyandırır. Geminin muhasebecisi Danglars, Edmond’un kaptan olmasını kıskanır. Mercédès’in kuzeni Fernand Mondego ise Mercédès’e âşıktır ve Edmond’dan nefret eder.',
          'Danglars ve Fernand, bir meyhanede, sarhoş komşu Caderousse’un da gözü önünde bir komplo kurar. Ölen kaptan, Elba Adası’nda sürgünde olan Napoleon’un yandaşlarına iletilmesi için Edmond’a bir mektup vermişti. Danglars, Edmond’u Napoleon taraftarı bir hain olarak ihbar eden isimsiz bir mektup yazar. Fernand, bu mektubu postaya verir. Nişan sofrasında Edmond tutuklanır.'
        ]
      },
      {
        title: 'Château d’If',
        image: { svg: chateau, caption: 'Marsilya açıklarında bir kayalığın üzerinde yükselen ürkütücü kale hapishane.' },
        text: [
          'Edmond, kralın savcı yardımcısı Gérard de Villefort’un karşısına çıkarılır. Villefort, Edmond’un masum olduğunu hemen anlar ve onu serbest bırakmak üzeredir. Ama mektubu okuduğunda, onun kendi babası Noirtier’ye yazıldığını görür. Noirtier, ateşli bir Napoleon taraftarıdır. Eğer bu mektup ortaya çıkarsa, Villefort’un kariyeri mahvolacaktır.',
          'Villefort, mektubu yakar ve Edmond’a kendisinin yanında olduğunu söyler. Ama hemen ardından, onu hiçbir duruşma yapılmadan, Marsilya açıklarındaki korkunç kale hapishanesi Château d’If’e gönderir. Edmond, neden orada olduğunu bile bilmeden, yer altındaki karanlık bir hücreye kapatılır. Yıllar geçer. Babası açlık ve kederden ölür. Mercédès ise sonunda Fernand ile evlenir.',
          'Edmond, hücresinde umudunu yavaş yavaş kaybeder. Önce masumiyetini kanıtlamaya çalışır, sonra yalvarır, sonra öfkelenir ve sonunda açlıktan ölmeye karar verir. Tam ölümün eşiğindeyken, hücresinin duvarının ardından tuhaf kazıma sesleri duyar. Biri, duvarın öbür tarafından tünel kazmaktadır. Bu ses, Edmond’a yeniden yaşama isteği verir.'
        ]
      },
      {
        title: 'Faria Rahip',
        image: { svg: faria, caption: 'Taş hücrede mum ışığında ders veren yaşlı bir rahip ve dinleyen genç bir mahkûm.' },
        text: [
          'Tünel kazan kişi, yıllardır hapiste yatan İtalyan bir rahip olan Faria’dır. Faria, kaçmak için tünel kazarken yanlış hesap yapmış ve Edmond’un hücresine çıkmıştır. İkisi arasında derin bir dostluk başlar. Faria, olağanüstü bilgili bir adamdır. Hücresinde kendi yaptığı aletlerle kitaplar yazmış, mürekkep ve kalem üretmiştir.',
          'Faria, Edmond’a yıllarca ders verir. Ona tarih, matematik, felsefe, kimya ve birçok yabancı dil öğretir. Edmond, bu hapishane hücresinde, sıradan bir denizciden son derece bilgili, kültürlü ve keskin zekâlı bir adama dönüşür. Faria ayrıca, Edmond’un anlattıklarını dinleyerek, onu hapse kimin gönderdiğini mantık yoluyla çözer. Edmond, Danglars’ın, Fernand’ın ve Villefort’un ihanetini öğrendiğinde, içinde dinmeyecek bir intikam ateşi yanar.',
          'Faria, ölmeden önce Edmond’a büyük bir sır verir. Akdeniz’deki küçük, ıssız Monte Kristo Adası’nda, eski bir İtalyan soylu ailesinden kalma devasa bir hazine gömülüdür. Faria, bu hazinenin yerini gösteren haritayı Edmond’a bırakır. Kısa süre sonra Faria, geçirdiği bir felç kriziyle hücresinde ölür.'
        ]
      },
      {
        title: 'Denizden Doğan Adam',
        image: { svg: escape, caption: 'Fırtınalı bir gecede kaleden denize atılan çuval.' },
        text: [
          'Faria’nın cesedi, gardiyanlar tarafından bir çuvala konur. Edmond, kendisine bir fırsat geldiğini anlar. Tünelden geçerek Faria’nın hücresine girer, cesedi kendi yatağına yatırır ve kendisi çuvalın içine girer. Gardiyanlar, çuvalı mezarlığa götüreceklerini sanır, ama Château d’If’in mezarlığı denizin kendisidir. Gardiyanlar, ayaklarına bir gülle bağlanmış çuvalı yüksek kayalıklardan denize fırlatır.',
          'Edmond, suyun altında bıçağıyla çuvalı keser ve kendini kurtarır. Fırtınalı bir gecede saatlerce yüzerek yakındaki bir adaya ulaşır. Ertesi sabah, bir kaçakçı gemisi onu kurtarır. Edmond, on dört yıl hapiste kalmıştır. Hapse girdiğinde on dokuz yaşında saf bir gençtir, çıktığında ise otuz üç yaşında, sert, bilgili ve tek bir amacı olan bir adamdır.',
          'Kaçakçılarla birlikte çalışan Edmond, bir gün onları Monte Kristo Adası’na götürmeyi başarır. Bir kaza geçirmiş gibi yaparak adada yalnız kalır ve Faria’nın haritasını takip ederek hazineyi bulur. Mağaranın içinde altın, mücevher ve elmaslarla dolu sandıklar vardır. Edmond, artık dünyanın en zengin insanlarından biridir.'
        ]
      },
      {
        title: 'Hazine ve Bir Teşekkür',
        image: { svg: treasure, caption: 'Monte Kristo Adası’nın mağarasında ışıl ışıl parlayan hazine.' },
        text: [
          'Edmond, servetini kullanmaya başlamadan önce, kendisine iyilik edenlere teşekkür etmek ister. Bir din adamı kılığına girerek Caderousse’u bulur ve ondan geçmişte neler olduğunu öğrenir. Babasının ölümünü, Mercédès’in evliliğini ve kendisine ihanet edenlerin şimdi nasıl zengin ve güçlü insanlar olduklarını dinler.',
          'Edmond, eski patronu Bay Morrel’in, kendisini hapisten kurtarmak için defalarca uğraştığını ve babasına bakmaya çalıştığını öğrenir. Morrel şimdi iflasın eşiğindedir ve kendini öldürmeyi düşünmektedir. Edmond, gizli bir şekilde Morrel’in bütün borçlarını öder. Hatta batan Firavun gemisinin aynısını yaptırarak, son anda onu limana yollar. Morrel ve ailesi bu mucizeyi kimin yaptığını hiçbir zaman bilmez.',
          'Edmond, bu iyiliği tamamladıktan sonra, kendini Tanrı’nın adaletini yerine getirmekle görevli biri olarak görmeye başlar. Ödüllendirme bitmiştir, şimdi cezalandırma zamanıdır. Kendine yeni bir isim ve bir unvan seçer: Monte Kristo Kontu. Ve yıllarca süren titiz bir hazırlığın ardından Paris’e gider.'
        ]
      },
      {
        title: 'Paris’te Esrarengiz Bir Kont',
        image: { svg: paris, caption: 'Paris sosyetesinin herkesin konuştuğu esrarengiz ve zengin kont etrafında toplanması.' },
        text: [
          'Monte Kristo Kontu, Paris’te büyük bir ilgiyle karşılanır. Olağanüstü zengin, son derece kültürlü ve gizemli bir adamdır. Birçok dil konuşur, doğuya özgü tuhaf alışkanlıkları vardır ve herkesten farklı bir bilgeliğe sahiptir. Kont, eski düşmanlarının çevresine kendini ustalıkla sokar. Hiçbiri onun gerçekte kim olduğunu tanımaz.',
          'Danglars artık zengin bir banker ve baron olmuştur. Fernand, Kont de Morcerf unvanını almış bir general ve Mercédès’in kocasıdır. Villefort ise Paris’in en güçlü savcısıdır. Üçü de geçmişteki ihanetlerini çoktan unutmuş, kendi kazandıkları servetler ve itibarla övünen insanlardır. Kont, her biri için ayrı ayrı, son derece karmaşık ve sabırla kurulmuş bir intikam planı hazırlamıştır.',
          'Mercédès, Kont’u ilk gördüğü anda tanır. Ama bunu kimseye söylemez. Kont, Mercédès’in oğlu Albert ile dostluk kurar, ama Mercédès’in yaptığı evliliği hiçbir zaman affetmemiştir. Ona göre Mercédès de onu beklemeyerek bir tür ihanette bulunmuştur. Bu karşılaşmalar, romanın en dokunaklı ve en duygusal sahnelerinden bazılarını oluşturur.'
        ]
      },
      {
        title: 'Üç Düşmanın Düşüşü',
        image: { svg: revenge, caption: 'Adalet terazisi ve birer birer düşen portreler.' },
        text: [
          'Kont’un intikamı yavaş ama kesindir. Fernand’ın geçmişte Yunanistan’da, Yanya’da hizmet ettiği Ali Paşa’ya ihanet ettiği, onu Türklere sattığı ve ailesini köle olarak sattığı ortaya çıkar. Kont, Ali Paşa’nın kızı Haydée’yi esaretten kurtarmıştır ve Haydée, Fransız meclisinde Fernand’ın ihanetini herkesin önünde anlatır. Fernand’ın itibarı yerle bir olur. Karısı ve oğlu onu terk eder ve Fernand kendini vurur.',
          'Danglars’ın intikamı ise parası üzerinden gerçekleşir. Kont, sahte haberler yayarak borsada büyük kayıplar vermesini sağlar ve onu iflasın eşiğine getirir. Danglars, kaçarken İtalyan haydutlar tarafından yakalanır. Haydutlar, onu bir mağarada aç bırakır ve bir lokma ekmek için bile ondan servetinin büyük kısmını alırlar. Bu haydutlar, Kont’un adamlarıdır.',
          'Villefort’un düşüşü ise en korkunç olanıdır. Kont, onun yıllar önce gayrimeşru bir çocuğu diri diri gömmeye çalıştığını ortaya çıkarır. Bu çocuk hayatta kalmış ve büyüyüp bir suçlu olmuştur. Aynı dönemde Villefort’un ikinci karısı, servet uğruna aile üyelerini zehirlemeye başlamıştır. Villefort, karısının suçlarını öğrendiğinde, onu idam ettirmekle tehdit eder. Karısı, küçük oğluyla birlikte kendini zehirler. Villefort ise bu yıkım karşısında aklını yitirir.'
        ]
      },
      {
        title: 'Bekle ve Umut Et',
        image: { svg: hope, caption: 'Ufukta kaybolan bir yelkenli ve kıyıda bekleyen iki genç.' },
        text: [
          'Villefort’un ve küçük oğlunun başına gelenleri gören Kont, ilk kez intikamının ne kadar ileri gittiğini fark eder. Kendini Tanrı’nın adaletinin bir aracı olarak görmüştü, ama masum bir çocuğun ölümü onu derinden sarsar. Tanrı’nın rolünü üstlenmeye çalışmanın insanın haddini aşmak olduğunu anlar. İntikamını burada bitirir ve Danglars’ı serbest bırakır.',
          'Mercédès, oğlu Albert ile birlikte Marsilya’ya, Edmond’un eski evine döner ve sade bir hayat yaşamaya başlar. Kont ise Bay Morrel’in oğlu Maximilien ile ilgilenir. Maximilien, Villefort’un kızı Valentine’e âşıktır ve Valentine’in zehirlendiğini düşünerek umudunu kaybetmiştir. Ama Kont, Valentine’i aslında ölümden kurtarmış ve onu Monte Kristo Adası’nda saklamıştır. Sevgilileri burada yeniden bir araya getirir.',
          'Romanın sonunda Kont, Haydée ile birlikte bir yelkenliyle denize açılır ve ufukta kaybolur. Maximilien ve Valentine’e bıraktığı mektup, bütün insan bilgeliğinin iki kelimede saklı olduğunu söyler: Bekle ve umut et. Monte Kristo Kontu, ihanet, sabır, intikam ve bağışlama üzerine yazılmış, dünya edebiyatının en sürükleyici macera romanlarından biridir.'
        ]
      }
    ]
  };
})();
