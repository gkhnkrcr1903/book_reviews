// Oliver Twist — Charles Dickens (1838)
// Sahneler data/scenes.js yardımcılarıyla çizilir; ileride image.src ile gerçek çizimlerle değiştirilebilir.
(() => {
  const { svg, glow, skyline, figure, seated, streaks, dots } = window.Scene;

  const boy = (x, y, s, c) => figure(x, y, s * .75, c, {});

  // 1 — Darülaceze ve “Biraz daha istiyorum”
  const workhouse = svg({
    sky: ['#2a2a2c', '#3a3a3c', '#2a2a2c'],
    vignette: .7, grain: .24,
    body: id => `
      ${[160, 400, 640].map(x => `<rect x="${x - 40}" y="40" width="80" height="120" fill="#6a6a6a" opacity=".6"/>`).join('')}
      <rect x="60" y="250" width="680" height="16" fill="#3a2a1e"/>
      ${Array.from({ length: 12 }, (_, i) => boy(90 + i * 56, 262, 1.4, '#1a1a1c')).join('')}
      ${Array.from({ length: 12 }, (_, i) => `<ellipse cx="${90 + i * 56}" cy="246" rx="12" ry="4" fill="#8a8a80"/>`).join('')}
      <rect y="300" width="800" height="100" fill="#1a1a1c"/>
      <g transform="translate(560 340)"><ellipse rx="50" ry="20" fill="#3a3a3a"/><rect x="-50" y="-60" width="100" height="60" fill="#4a4a4a"/></g>
      ${figure(640, 340, 2.2, '#0a0a0a', { hat: true })}
      ${boy(460, 340, 1.6, '#3a3a3a')}<path d="M466 290 L500 280" stroke="#3a3a3a" stroke-width="4"/><ellipse cx="506" cy="280" rx="10" ry="4" fill="#8a8a80"/>`
  });

  // 2 — Cenaze işleri ve kaçış yolu
  const road = svg({
    sky: ['#a8a8a0', '#c8c4b8', '#e8e0d0'],
    vignette: .4, grain: .16,
    body: id => `
      ${glow(id, 640, 100, 140, '#fff4d8', .5)}
      <path d="M0 240 Q400 220 800 240 V400 H0 Z" fill="#8a9a6a"/>
      <path d="M400 240 L340 400 H460 Z" fill="#a89878"/>
      <g transform="translate(420 236)"><rect x="-2" y="-30" width="4" height="30" fill="#4a3a2a"/><rect x="-24" y="-30" width="48" height="12" fill="#e8dcc4"/><text y="-21" text-anchor="middle" font-family="Lora,serif" font-size="8" fill="#3a2a1a">LONDRA 70</text></g>
      ${boy(400, 380, 2, '#3a3a40')}<rect x="388" y="296" width="20" height="14" fill="#6a5a4a"/>
      ${Array.from({ length: 6 }, (_, i) => `<g transform="translate(${40 + i * 140} 240)"><rect x="-3" y="-50" width="6" height="50" fill="#4a3a2a"/><circle cy="-60" r="20" fill="#5a7a4a"/></g>`).join('')}`
  });

  // 3 — Fagin’in ini
  const fagin = svg({
    sky: ['#140c08', '#22160e', '#140c08'],
    vignette: .75,
    body: id => `
      ${glow(id, 400, 220, 220, '#ff9a3a', .55)}
      <rect x="320" y="240" width="160" height="80" fill="#2a1408"/><rect x="340" y="260" width="120" height="50" fill="#ff8a2a" opacity=".85"/>
      <line x1="300" y1="200" x2="500" y2="200" stroke="#3a2a1a" stroke-width="3"/>${Array.from({ length: 6 }, (_, i) => `<path d="M${320 + i * 30} 200 v20 l6 6 l6 -6 v-20" fill="${['#a82a2a', '#2a4aa8', '#e8dcc4'][i % 3]}"/>`).join('')}
      ${figure(400, 320, 1.9, '#1a1208', { hat: true })}<line x1="420" y1="260" x2="450" y2="240" stroke="#3a3a3a" stroke-width="3"/>
      ${[200, 250, 560, 610].map((x, i) => boy(x, 330, 1.6, '#0a0604')).join('')}${boy(300, 340, 1.5, '#5a5a60')}
      <rect y="330" width="800" height="70" fill="#0a0604"/>`
  });

  // 4 — Kitapçı önünde yankesicilik
  const pickpocket = svg({
    sky: ['#8a8a8a', '#aaa8a4', '#c8c4bc'],
    vignette: .45, grain: .2,
    body: id => `
      ${skyline({ y: 280, color: '#4a4a4c', seed: 281, lit: .05, minH: 120, maxH: 240, dome: false })}
      <rect x="80" y="160" width="200" height="120" fill="#5a3a24"/>${Array.from({ length: 3 }, (_, r) => Array.from({ length: 8 }, (_, c) => `<rect x="${90 + c * 23}" y="${170 + r * 34}" width="18" height="28" fill="${['#8a2a1a', '#2a4a6a', '#5a5a2a'][(r + c) % 3]}"/>`).join('')).join('')}
      <rect y="280" width="800" height="120" fill="#5a5a58"/>
      ${figure(380, 340, 1.9, '#1a1a2a', { hat: true })}
      ${boy(330, 344, 1.5, '#2a1a10')}${boy(300, 346, 1.4, '#3a2a1a')}<rect x="346" y="290" width="14" height="10" fill="#e8dcc4"/>
      ${boy(520, 350, 1.5, '#5a5a60')}`
  });

  // 5 — Brownlow’un evinde
  const brownlow = svg({
    sky: ['#e8d8b8', '#f0e4c8', '#f8f0dc'],
    vignette: .35, grain: .12,
    body: id => `
      ${glow(id, 600, 140, 200, '#fff8e0', .6)}
      <rect x="520" y="60" width="160" height="200" fill="#c8dce8"/><line x1="600" y1="60" x2="600" y2="260" stroke="#8a7a6a" stroke-width="6"/>
      <rect x="140" y="80" width="140" height="160" fill="#8a6a4a"/><rect x="150" y="90" width="120" height="140" fill="#c8a888"/><g transform="translate(210 160)"><circle cy="-20" r="20" fill="#e8c8a8"/><path d="M-30 60 Q-30 0 0 -2 Q30 0 30 60 Z" fill="#5a3a5a"/></g>
      <path d="M160 300 H480 V330 H160 Z" fill="#f4ecdc"/><rect x="160" y="282" width="50" height="20" rx="6" fill="#fff"/>
      ${boy(250, 300, 1.2, '#e8e0d8')}
      ${seated(540, 340, 1.6, '#2a2a3a', true)}${figure(440, 340, 1.5, '#4a3a4a', { dress: true, shawl: '#e8dcc4' })}
      <rect y="340" width="800" height="60" fill="#8a6a4a"/>`
  });

  // 6 — Bill Sikes ve Nancy
  const sikes = svg({
    sky: ['#0e1016', '#181c24', '#0e1016'],
    vignette: .75,
    body: id => `
      ${skyline({ y: 300, color: '#06080c', seed: 291, lit: .1, light: '#ffc070', minH: 120, maxH: 240, dome: false })}
      <rect x="360" y="160" width="6" height="140" fill="#05060a"/>${glow(id, 363, 156, 100, '#ffd890', .55)}<path d="M350 156 h26 l-5 -20 h-16 z" fill="#05060a"/>
      <rect y="300" width="800" height="100" fill="#0a0c10"/>
      ${figure(300, 350, 2.2, '#000', { hat: true })}
      <g transform="translate(430 350) scale(2.1)"><path d="M-11 -48 Q0 -55 11 -48 L22 0 H-22 Z" fill="#6a1a2a"/><path d="M-13 -60 Q0 -72 13 -60 L16 -40 Q0 -34 -16 -40 Z" fill="#2a1a1a"/><circle cx="0" cy="-60" r="9" fill="#0a0a0a"/></g>
      <g transform="translate(240 360) scale(1.2)" fill="#000"><path d="M-22 -20 H14 L22 -32 L30 -30 L28 -22 L20 -14 V0 H15 V-10 H-14 V0 H-19 V-12 L-28 -22 Z"/></g>`
  });

  // 7 — London Köprüsü’nde gizli buluşma
  const bridge = svg({
    sky: ['#0a0e18', '#141c2c', '#1e2a3e'],
    vignette: .65,
    body: id => `
      ${dots(301, 70, '#fff', 1, .6, 0, 160)}
      <rect y="220" width="800" height="180" fill="#0e1828"/>
      ${Array.from({ length: 12 }, (_, i) => `<path d="M${(i * 71) % 800} ${240 + i * 12} q30 -8 60 0" stroke="#3a5070" stroke-width="2" fill="none" opacity=".6"/>`).join('')}
      <path d="M0 220 H800 V200 H0 Z" fill="#1a1e28"/>${[100, 300, 500, 700].map(x => `<path d="M${x - 80} 220 Q${x} 140 ${x + 80} 220 Z" fill="#0e1828"/><rect x="${x - 6}" y="140" width="12" height="80" fill="#1a1e28"/>`).join('')}
      <path d="M0 140 H800" stroke="#1a1e28" stroke-width="6"/>
      ${[200, 600].map(x => `${glow(x === 200 ? id : id, x, 112, 60, '#ffd890', .6)}<rect x="${x - 2}" y="112" width="4" height="30" fill="#05060a"/>`).join('')}
      ${figure(380, 200, 1.4, '#6a1a2a', { dress: true, shawl: '#2a1a1a' })}${figure(430, 200, 1.4, '#2a2a3a', { hat: true })}${figure(470, 200, 1.3, '#3a3a4a', { dress: true })}
      ${figure(560, 200, 1.4, '#000', { hat: true })}`
  });

  // 8 — Huzur: kırsalda yeni bir yuva
  const home = svg({
    sky: ['#9ac0e0', '#cfe0ec', '#f4f0e0'],
    vignette: .3, grain: .1,
    body: id => `
      ${glow(id, 620, 100, 180, '#fff8d8', .8)}
      <path d="M0 250 Q400 220 800 250 V400 H0 Z" fill="#8ab86a"/>
      <g transform="translate(420 280)"><rect x="-100" y="-80" width="200" height="80" fill="#f4e8d0"/><polygon points="-110,-80 0,-130 110,-80" fill="#8a5a3a"/>${[-70, 40].map(dx => `<rect x="${dx}" y="-60" width="30" height="30" fill="#c8dce8"/>`).join('')}<rect x="-16" y="-44" width="32" height="44" fill="#5a3a2a"/></g>
      ${Array.from({ length: 30 }, (_, i) => `<circle cx="${(i * 47) % 800}" cy="${300 + (i * 13) % 90}" r="3" fill="${['#e85a6a', '#f4d04a', '#fff'][i % 3]}"/>`).join('')}
      ${figure(280, 360, 1.5, '#2a2a3a', { hat: true })}${boy(330, 362, 1.5, '#3a5a8a')}${figure(380, 362, 1.4, '#6a3a5a', { dress: true, shawl: '#e8dcc4' })}`
  });

  window.SUMMARIES['oliver-twist'] = {
    pages: [
      {
        title: 'Biraz Daha İstiyorum',
        image: { svg: workhouse, caption: 'Darülacezenin soğuk yemekhanesi ve elinde boş kâsesiyle öne çıkan çocuk.' },
        text: [
          'Charles Dickens’ın romanı, İngiltere’de küçük bir kasabanın darülacezesinde, yani yoksulların barındırıldığı kurumda başlar. Bir gece, adı bilinmeyen genç bir kadın burada bir erkek çocuk doğurur ve hemen ardından ölür. Kasabanın gülünç derecede kibirli ve acımasız memuru Bay Bumble, çocuğa Oliver Twist adını verir. Oliver, ilk dokuz yılını, açlık ve ihmal içinde, kötü bir sütanneyle geçirir.',
          'Dokuz yaşına geldiğinde Oliver darülacezeye geri getirilir. Burada çocuklar, günde yalnızca bir kâse sulu yulaf lapasıyla beslenir. Bir gün açlıktan çıldıran çocuklar, kura çekerek içlerinden birinin daha fazla yemek istemesine karar verir. Kura Oliver’a çıkar. Yemekten sonra Oliver, elinde boş kâsesiyle aşçının önüne çıkar ve titreyen bir sesle şunu söyler: Lütfen efendim, biraz daha istiyorum.',
          'Bu basit istek, darülacezenin yöneticileri arasında büyük bir skandala yol açar. Oliver’ın bir gün mutlaka asılacağını söyleyen yöneticiler, onu bir hücreye kapatır ve onu alacak kişiye beş sterlin ödül vereceklerini ilan ederler. Dickens, bu sahneyle on dokuzuncu yüzyıl İngiltere’sindeki yoksullara karşı uygulanan acımasız yasaları ve toplumun ikiyüzlülüğünü keskin bir ironiyle eleştirir.'
        ]
      },
      {
        title: 'Londra Yolunda',
        image: { svg: road, caption: 'Tek başına Londra’ya doğru yürüyen küçük ve yorgun bir çocuk.' },
        text: [
          'Oliver, bir cenaze levazımatçısı olan Bay Sowerberry’nin yanına çırak olarak verilir. Sowerberry, Oliver’ın hüzünlü yüzünün çocuk cenazelerinde yas tutan bir çocuk olarak kullanılmasının işine yarayacağını düşünür. Ama evin diğer çırağı Noah Claypole, Oliver’ı kıskanır ve ona sürekli eziyet eder. Bir gün Noah, Oliver’ın ölen annesine hakaret eder.',
          'Oliver, hayatında ilk kez büyük bir öfkeyle Noah’ın üzerine atılır ve onu döver. Ev halkı Oliver’ı cezalandırır ve onu bodruma kapatır. O gece Oliver, gizlice evden kaçar ve yetmiş mil uzaklıktaki Londra’ya doğru yürümeye başlar. Yedi gün boyunca aç, yorgun ve ayakları kan içinde yürür.',
          'Londra’nın kenarındaki bir kasabaya vardığında, Oliver neredeyse ölmek üzeredir. Orada, yaşına göre fazla kendinden emin, kendini beğenmiş ve yetişkin kıyafetleri giymiş bir çocukla karşılaşır. Bu çocuk, Jack Dawkins’tir. Herkes ona “Becerikli Yankesici” der. Jack, Oliver’a yemek ısmarlar ve ona Londra’da kalabileceği, kendisini koruyacak yaşlı bir beyefendi tanıdığını söyler.'
        ]
      },
      {
        title: 'Fagin',
        image: { svg: fagin, caption: 'Londra’nın karanlık bir sokağındaki ev: ateşin başında mendil asan yaşlı adam ve çocuklar.' },
        text: [
          'Jack, Oliver’ı Londra’nın en sefil mahallelerinden birindeki karanlık bir eve götürür. Orada, Fagin adında yaşlı, kurnaz ve çirkin bir adam yaşar. Fagin’in etrafında, onunla birlikte yaşayan bir grup çocuk vardır. Hepsi, ateşin başında sosisler kızartırken Oliver’ı sıcak bir şekilde karşılarlar. Duvarlarda ise sayısız ipek mendil asılıdır.',
          'Oliver, bu çocukların ve Fagin’in aslında bir hırsız çetesi olduğunu fark etmez. Fagin, ona bir oyun öğretir. Cebinde mendil ve saat olan yaşlı bir beyefendi gibi odada dolaşır, çocuklar da fark ettirmeden cebinden bir şeyler almaya çalışır. Oliver, bunun eğlenceli bir oyun olduğunu düşünür. Bir sabah ise, Fagin’in gizli bir kutudan çıkardığı değerli mücevherlere ve saatlere bakarken onu yakalar.',
          'Fagin, Oliver’ı korkutarak susturur. Oliver, birkaç gün boyunca mendillerin üzerindeki işaretleri sökmeyi öğrenir. Fagin, bu sırada Oliver’ı nasıl çetesine katabileceğini düşünür. Dickens, Fagin karakteriyle Londra’nın suç dünyasının, kimsesiz çocukları nasıl sömürdüğünü ve yoksulluğun insanları nasıl suça ittiğini gösterir.'
        ]
      },
      {
        title: 'Kitapçının Önünde',
        image: { svg: pickpocket, caption: 'Bir kitapçının önünde kitap okuyan yaşlı bir beyefendi ve arkasındaki üç çocuk.' },
        text: [
          'Bir gün Fagin, Oliver’ı Jack ve Charley Bates ile birlikte “işe” gönderir. Bir kitapçının önünde, kitap okumaya dalmış yaşlı bir beyefendi görürler. Jack ve Charley, adamın cebinden ipek bir mendili çalar. Oliver, o an ne olduğunu anlar ve dehşetle kaçmaya başlar. Ama beyefendi mendilinin çalındığını fark ettiğinde, kaçan Oliver’ı görür ve “Hırsız var!” diye bağırır.',
          'Kalabalık, Oliver’ın peşine düşer ve onu yere serer. Oliver, polis tarafından yakalanarak sert ve keyfi kararlarıyla ünlü bir yargıcın karşısına çıkarılır. Oliver, korkudan bayılmak üzeredir ve kendini savunamaz. Yargıç, onu üç ay hapse mahkûm etmek üzereyken, kitapçının sahibi koşarak gelir ve hırsızların başka çocuklar olduğunu, Oliver’ın masum olduğunu anlatır.',
          'Mendili çalınan beyefendi, Bay Brownlow adında iyi kalpli ve varlıklı bir adamdır. Oliver’ın hasta ve perişan hâline acır ve onu evine götürür. Fagin ise Oliver’ın polise her şeyi anlatacağından korkar ve onu ne pahasına olursa olsun geri getirmeye karar verir.'
        ]
      },
      {
        title: 'Bay Brownlow’un Evinde',
        image: { svg: brownlow, caption: 'Güneşli bir odada, duvardaki bir kadın portresine bakan iyileşmiş çocuk.' },
        text: [
          'Oliver, Bay Brownlow’un evinde uzun süre ateşli bir hastalık geçirir. Evin iyi kalpli kahyası Bayan Bedwin, ona sevgiyle bakar. Oliver, hayatında ilk kez sıcak bir yatakta uyur, temiz giysiler giyer ve şefkatle karşılanır. Odanın duvarında asılı olan güzel bir kadının portresi dikkatini çeker. Oliver, bu yüze bakmaktan kendini alamaz.',
          'Bay Brownlow, Oliver’ın yüzünün bu portredeki kadına çok benzediğini fark eder. Bu benzerlik onu derinden etkiler. Oliver’a güvenir ve bir gün onu, bir kitapçıya geri götürmesi gereken bazı kitaplarla ve bir miktar parayla dışarı gönderir. Bay Brownlow’un arkadaşı Bay Grimwig, Oliver’ın parayla birlikte kaçacağını ve bir daha geri dönmeyeceğini iddia eder.',
          'Oliver, sokakta yürürken Fagin’in çetesinin üyeleri olan Nancy ve Bill Sikes tarafından yakalanır. Nancy, onun kaybolmuş kardeşi olduğunu söyleyerek bağırır ve sokaktaki insanlar Oliver’ın yardım çığlıklarına kulak asmaz. Oliver, yeniden Fagin’in inine götürülür. Bay Brownlow ise saatlerce Oliver’ın dönmesini bekler ve sonunda onun bir hırsız olduğuna inanmaya başlar.'
        ]
      },
      {
        title: 'Sikes ve Nancy',
        image: { svg: sikes, caption: 'Gece sokağında fener ışığı altında acımasız bir hırsız, köpeği ve onu seven kadın.' },
        text: [
          'Bill Sikes, Fagin’in çetesinin en tehlikeli ve en acımasız üyesidir. Kaba, şiddet dolu bir hırsızdır ve her yerde onu takip eden Bull’s-eye adında bir köpeği vardır. Nancy ise Sikes’ın sevgilisidir. Küçük yaşta Fagin’in çetesine katılmış, sokaklarda büyümüş bir kadındır. Ama içinde hâlâ iyiliğe dair bir kıvılcım taşır. Oliver’ın masumiyeti, onun kalbine dokunur.',
          'Fagin ve Sikes, Oliver’ı bir hırsızlıkta kullanmaya karar verir. Bir gece onu, Londra’nın dışındaki büyük bir evi soymak için yanlarına alırlar. Oliver’ın küçük bedeni, evin küçük bir penceresinden içeri girmeye yetecektir. Sikes, Oliver’ı pencereden içeri sokar ve kapıyı açmasını emreder. Ama Oliver, içeri girer girmez evin sahiplerini uyandırmaya karar verir.',
          'Tam o sırada ev halkı uyanır ve hırsızlara ateş edilir. Oliver, kolundan yaralanır. Sikes, onu sırtına alarak kaçar, ama peşlerindeki insanlar yaklaşınca Oliver’ı bir hendeğe atarak kaçar. Oliver, ertesi sabah büyük bir çabayla aynı eve geri döner. Evin sahibi olan iyi kalpli Bayan Maylie ve evlatlığı genç Rose, ona acır ve onu koruma altına alırlar.'
        ]
      },
      {
        title: 'London Köprüsü’nde',
        image: { svg: bridge, caption: 'Gece yarısı London Köprüsü’nün basamaklarında gizli bir buluşma.' },
        text: [
          'Bu sırada Fagin’in, Monks adında esrarengiz bir adamla gizli bir anlaşma yaptığı ortaya çıkar. Monks, Oliver’ın üvey ağabeyidir. Babalarının servetinin Oliver’a kalmasını istemez ve Oliver’ı bir suçlu yaparak mirastan mahrum bırakmak için Fagin’e para vermiştir. Nancy, bu konuşmaya gizlice kulak misafiri olur.',
          'Nancy, büyük bir cesaret göstererek Rose Maylie’ye gider ve ona her şeyi anlatır. Sonra Rose ve Bay Brownlow ile London Köprüsü’nde gece yarısı gizlice buluşur. Onlara Monks’u nasıl bulabileceklerini anlatır. Rose, Nancy’ye hayatını değiştirmesi ve suç dünyasından kurtulması için yardım teklif eder. Ama Nancy, Sikes’ı sevdiği için onu terk etmeyi reddeder.',
          'Ne yazık ki Fagin, Nancy’den şüphelenmiş ve onu takip ettirmiştir. Fagin, duyduklarını Sikes’a çarpıtarak anlatır. Sikes, öfkeden çılgına döner, eve gider ve Nancy’yi vahşice öldürür. Nancy, son anda bile ona dua eder ve onu bağışlamasını ister. Bu korkunç cinayet, romanın en karanlık sahnesidir.'
        ]
      },
      {
        title: 'Yeni Bir Yuva',
        image: { svg: home, caption: 'Kırsalda çiçekli bir bahçenin önünde, sonunda bir aileye kavuşan Oliver.' },
        text: [
          'Nancy’nin öldürülmesi bütün Londra’yı ayağa kaldırır. Sikes, köpeğiyle birlikte kaçmaya çalışır, ama vicdanı ve Nancy’nin hayali onu rahat bırakmaz. Sonunda bir çatıda halk tarafından sıkıştırılır. Kaçmak için beline bağladığı bir iple aşağı inmeye çalışırken, Nancy’nin gözlerini gördüğünü sanır, ayağı kayar ve ip boynuna dolanarak asılı kalır. Köpeği de onunla birlikte düşerek ölür.',
          'Fagin yakalanır ve idama mahkûm edilir. Oliver, onu idamdan önceki gece hücresinde ziyaret eder. Fagin, korku ve delilik içindedir. Monks ise yakalanır ve Bay Brownlow’a her şeyi itiraf eder. Oliver’ın annesinin adı Agnes Fleming’dir ve duvardaki portredeki kadın odur. Rose Maylie ise Agnes’in kız kardeşidir, yani Oliver’ın teyzesidir.',
          'Oliver, babasından kalan mirasın bir kısmına kavuşur. Bay Brownlow, Oliver’ı evlat edinir ve onlar, Bayan Maylie ve Rose’un yaşadığı huzurlu köyün yakınına yerleşirler. Oliver, hayatında ilk kez sevgi dolu bir aileye kavuşur. Oliver Twist, yoksulluğun, çocuk istismarının ve toplumun acımasızlığının karşısında, iyiliğin ve masumiyetin sonunda galip gelebileceğini anlatan, Dickens’ın en sevilen romanlarından biridir.'
        ]
      }
    ]
  };
})();
