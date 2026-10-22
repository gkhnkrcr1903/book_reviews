// Yabancı — Albert Camus (1942)
// Sahneler data/scenes.js yardımcılarıyla çizilir; ileride image.src ile gerçek çizimlerle değiştirilebilir.
(() => {
  const { svg, glow, skyline, figure, seated, streaks, dots } = window.Scene;

  const sun = (id, x, y, r, op = .9) => `${glow(id, x, y, r * 4, '#fff4c0', op)}<circle cx="${x}" cy="${y}" r="${r}" fill="#fffbe8"/>`;
  const whiteTown = (y, c) => Array.from({ length: 14 }, (_, i) => `<rect x="${i * 60 - 10}" y="${y - 30 - (i * 23) % 60}" width="56" height="${30 + (i * 23) % 60 + 200}" fill="${c}"/><rect x="${i * 60 + 6}" y="${y - 18 - (i * 23) % 60}" width="10" height="12" fill="#3a6a8a" opacity=".6"/>`).join('');

  // 1 — Huzurevinde gece nöbeti
  const vigil = svg({
    sky: ['#e8e4d8', '#d8d4c4', '#c8c0b0'],
    vignette: .5, grain: .18,
    body: id => `
      <rect x="0" y="0" width="800" height="400" fill="#f4f0e8" opacity=".5"/>
      <rect x="120" y="40" width="560" height="10" fill="#fff"/>${glow(id, 400, 46, 300, '#ffffff', .6)}
      <rect x="300" y="230" width="200" height="50" fill="#5a3a24"/><rect x="290" y="224" width="220" height="12" fill="#6a4a2a"/>
      <rect x="320" y="280" width="10" height="40" fill="#3a2414"/><rect x="470" y="280" width="10" height="40" fill="#3a2414"/>
      ${Array.from({ length: 8 }, (_, i) => seated(140 + (i % 4) * 40 + (i > 3 ? 420 : 0), 330, 1.2, '#2a2a2a', i > 3)).join('')}
      ${seated(250, 320, 1.4, '#0a0a0a')}
      <rect y="330" width="800" height="70" fill="#d8d0c0"/>`
  });

  // 2 — Cenaze yolunda kavurucu güneş
  const funeral = svg({
    sky: ['#f4dca0', '#f8e8c0', '#fff4dc'],
    vignette: .4, grain: .16,
    body: id => `
      ${sun(id, 600, 70, 34)}
      <path d="M0 250 Q200 230 400 250 T800 240 V400 H0 Z" fill="#d8b878"/>
      ${Array.from({ length: 12 }, (_, i) => `<g transform="translate(${30 + i * 70} 244)"><rect x="-3" y="-50" width="6" height="50" fill="#5a6a3a"/><ellipse cy="-64" rx="14" ry="22" fill="#4a5a2a"/></g>`).join('')}
      <path d="M0 330 Q400 300 800 330" stroke="#a8885a" stroke-width="34" fill="none"/>
      <g transform="translate(300 330)"><rect x="-60" y="-40" width="120" height="34" fill="#1a1a1a"/><circle cx="-36" cy="0" r="12" fill="#1a1a1a"/><circle cx="36" cy="0" r="12" fill="#1a1a1a"/></g>
      ${[420, 470, 520, 570].map((x, i) => figure(x, 334, 1.3, '#1a1a1a', { hat: i % 2 === 0 })).join('')}
      ${Array.from({ length: 20 }, (_, i) => `<path d="M${(i * 41) % 800} ${180 + (i % 4) * 14} q6 -4 12 0 q6 4 12 0" stroke="#fff4c0" stroke-width="1" fill="none" opacity=".5"/>`).join('')}`
  });

  // 3 — Cezayir’de yüzme ve Marie
  const beach = svg({
    sky: ['#4a9ac8', '#8ac0e0', '#d8ecf4'],
    vignette: .35, grain: .12,
    body: id => `
      ${sun(id, 640, 70, 28, .7)}
      <rect y="200" width="800" height="120" fill="#2a7ab0"/>
      ${Array.from({ length: 12 }, (_, i) => `<path d="M${(i * 71) % 800} ${220 + i * 8} q20 -5 40 0" stroke="#e8f4f8" stroke-width="2" fill="none" opacity=".6"/>`).join('')}
      <path d="M0 300 Q400 280 800 300 V400 H0 Z" fill="#f4e0b0"/>
      <g transform="translate(360 250)" fill="#5a3a2a"><circle r="9"/><path d="M-16 6 q16 -6 32 0" stroke="#5a3a2a" stroke-width="3" fill="none"/></g>
      <g transform="translate(410 254)" fill="#3a2a1a"><circle r="9"/><path d="M-16 6 q16 -6 32 0" stroke="#3a2a1a" stroke-width="3" fill="none"/></g>
      <rect x="560" y="330" width="80" height="10" fill="#e85a4a"/>`
  });

  // 4 — Komşular: Raymond ve Salamano’nun köpeği
  const neighbors = svg({
    sky: ['#e8c890', '#f0d8a8', '#f8e8c8'],
    vignette: .45, grain: .16,
    body: id => `
      ${whiteTown(300, '#f4ecdc')}
      <rect y="300" width="800" height="100" fill="#c8b090"/>
      ${figure(200, 360, 1.6, '#3a3a3a', { hat: true })}
      <g transform="translate(150 362) scale(1.1)" fill="#6a4a2a"><path d="M-22 -20 H14 L22 -32 L30 -30 L28 -22 L20 -14 V0 H15 V-10 H-14 V0 H-19 V-12 L-28 -22 Z"/></g><line x1="188" y1="300" x2="166" y2="336" stroke="#3a3a3a" stroke-width="2"/>
      ${figure(500, 360, 1.7, '#1a1a1a', {})}${figure(560, 362, 1.8, '#3a2a2a', { hat: true })}`
  });

  // 5 — Kumsalda öğle: kayalık, kaynak, bıçağın parıltısı
  const shot = svg({
    sky: ['#fff4dc', '#ffe8b8', '#f8d898'],
    vignette: .55, grain: .2,
    body: id => `
      ${sun(id, 400, 40, 46, 1)}
      <rect y="200" width="800" height="80" fill="#5a9ac0"/>
      <path d="M0 260 Q400 240 800 260 V400 H0 Z" fill="#f8e0a8"/>
      <path d="M520 280 L560 200 L640 210 L700 290 Z" fill="#c89a6a"/>
      ${figure(560, 300, 1.4, '#3a2a1a', {})}<line x1="566" y1="262" x2="600" y2="250" stroke="#fffbe8" stroke-width="4"/>${glow(id, 600, 250, 50, '#ffffff', 1)}
      ${figure(240, 340, 2, '#1a1a1a', {})}<line x1="252" y1="260" x2="290" y2="264" stroke="#1a1a1a" stroke-width="4"/>
      ${Array.from({ length: 16 }, (_, i) => `<path d="M${(i * 53) % 800} ${120 + (i % 5) * 20} q10 -6 20 0 q10 6 20 0" stroke="#ffffff" stroke-width="1.5" fill="none" opacity=".45"/>`).join('')}`
  });

  // 6 — Hapishane: pencerede bir gökyüzü parçası
  const prison = svg({
    sky: ['#2a2a2e', '#3a3a40', '#2a2a2e'],
    vignette: .75, grain: .24,
    body: id => `
      <rect x="330" y="60" width="140" height="100" fill="#6aa0d0"/>${glow(id, 400, 110, 140, '#aad0f0', .45)}
      ${[0, 1, 2, 3, 4].map(k => `<rect x="${336 + k * 28}" y="60" width="6" height="100" fill="#1a1a1e"/>`).join('')}
      <polygon points="330,160 470,160 560,400 240,400" fill="#aad0f0" opacity=".08"/>
      <rect x="120" y="270" width="200" height="20" fill="#4a4a50"/>
      ${seated(420, 320, 1.6, '#0a0a0e')}
      <rect y="320" width="800" height="80" fill="#1a1a1e"/>`
  });

  // 7 — Mahkeme: annesinin cenazesinde ağlamayan adam
  const trial = svg({
    sky: ['#d8d0c0', '#c8c0b0', '#a8a090'],
    vignette: .6, grain: .2,
    body: id => `
      ${[140, 320, 480, 660].map(x => `<rect x="${x - 30}" y="30" width="60" height="140" fill="#fff8e0" opacity=".6"/>`).join('')}
      <rect x="300" y="150" width="200" height="70" fill="#4a2e1a"/>${[340, 400, 460].map(x => figure(x, 160, 1.2, '#1a1010')).join('')}
      <rect x="40" y="220" width="160" height="100" fill="#3a2414"/>${Array.from({ length: 6 }, (_, i) => figure(60 + (i % 3) * 50, 240 + Math.floor(i / 3) * 40, .9, '#1a1010', { hat: i % 2 === 0 })).join('')}
      <rect y="320" width="800" height="80" fill="#3a2a1e"/>
      ${figure(600, 330, 1.6, '#0a0a0a', {})}<rect x="570" y="260" width="60" height="70" fill="none" stroke="#3a2414" stroke-width="4"/>
      ${figure(300, 340, 1.8, '#1a1a1a', {})}<line x1="300" y1="270" x2="360" y2="250" stroke="#1a1a1a" stroke-width="4"/>
      ${Array.from({ length: 16 }, (_, i) => figure(30 + i * 50, 400, 1.3, '#1a1010', { hat: i % 2 === 0 })).join('')}`
  });

  // 8 — Yıldızlı gece: dünyanın tatlı kayıtsızlığı
  const stars = svg({
    sky: ['#02040c', '#060c1e', '#0e1630'],
    vignette: .6,
    body: id => `
      ${dots(3, 300, '#ffffff', 1.4, .95, 0, 260)}
      ${glow(id, 400, 140, 260, '#9ab8ff', .15)}
      <rect x="0" y="230" width="800" height="170" fill="#0a0c14"/>
      <rect x="320" y="150" width="160" height="110" fill="#0e1630"/>
      ${[0, 1, 2, 3, 4, 5].map(k => `<rect x="${324 + k * 28}" y="150" width="6" height="110" fill="#05060a"/>`).join('')}
      ${seated(400, 300, 1.6, '#000')}`
  });

  window.SUMMARIES['yabanci'] = {
    pages: [
      {
        title: 'Bugün Annem Öldü',
        image: { svg: vigil, caption: 'Huzurevinin bembeyaz odasında, tabutun başında geçen sessiz bir gece.' },
        text: [
          'Albert Camus’nün romanı, edebiyatın en ünlü ve en soğuk açılış cümlelerinden biriyle başlar: Bugün annem öldü. Ya da belki dün, bilmiyorum. Romanın anlatıcısı Meursault, Fransız sömürgesi Cezayir’in başkenti Cezayir şehrinde yaşayan, bir şirkette memur olarak çalışan genç bir adamdır. Annesinin ölüm haberini bir telgrafla alır ve cenaze için şehirden seksen kilometre uzaktaki Marengo huzurevine gider.',
          'Meursault, olayları duygusuz ve son derece sade bir dille anlatır. Annesini, ona bakacak parası olmadığı için üç yıl önce huzurevine yerleştirmiştir. Huzurevinde, annesinin tabutunun başında bütün gece nöbet tutar. Tabutu açıp annesinin yüzünü son bir kez görmeyi reddeder. Nöbet sırasında sütlü kahve içer, sigara içer ve uyuklar. Annesinin yaşlı arkadaşları etrafında sessizce otururken, o sadece yorgunluğu ve odanın göz kamaştıran beyaz ışığını düşünür.',
          'Meursault, okura ne üzüntüsünden ne de annesiyle olan ilişkisinden söz eder. Yaşamın akışını sadece gözlemler ve kendi duygularını bile dışarıdan bakan bir yabancı gibi aktarır. Camus, bu karakterle, toplumun kurallarına ve beklentilerine uymayan, ama kendi içinde son derece dürüst olan bir insanın portresini çizmeye başlar.'
        ]
      },
      {
        title: 'Güneşin Altında Bir Cenaze',
        image: { svg: funeral, caption: 'Kavurucu Cezayir güneşi altında, köy kilisesine giden cenaze alayı.' },
        text: [
          'Ertesi sabah cenaze töreni yapılır. Cenaze alayı, huzurevinden köydeki kiliseye doğru, kavurucu bir güneşin altında yürür. Meursault, cenazenin hüznünden çok sıcağın bunaltıcılığını, terlemeyi, yolun asfaltının ayakkabılarına yapışmasını ve gözlerini kör eden ışığı düşünür. Annesinin yaşlı dostu Thomas Pérez, yaşlılığına rağmen alayı takip etmeye çalışır ve sonunda ağlayarak bayılır.',
          'Meursault, cenazenin sonunda tek düşündüğü şeyin eve dönüp on iki saat uyumak olduğunu itiraf eder. Ağlamaz, üzüntüsünü göstermez ve törenin bir an önce bitmesini bekler. Bu tavrı, huzurevi müdürü ve kapıcı gibi tanıkların dikkatini çeker. O sırada önemsiz görünen bu ayrıntılar, romanın ikinci bölümünde Meursault’nun kaderini belirleyecektir.',
          'Camus, bu sahnede doğanın, özellikle de güneşin, romanın asıl karakterlerinden biri olduğunu gösterir. Güneş, Meursault için hem bir zevk kaynağı hem de dayanılmaz bir baskıdır. İnsanların sahte gözyaşlarına ve geleneklerine karşılık, güneş acımasızca gerçek ve kayıtsızdır.'
        ]
      },
      {
        title: 'Marie',
        image: { svg: beach, caption: 'Akdeniz’in parlak sularında yüzen iki genç.' },
        text: [
          'Cenazenin ertesi günü, Cumartesi, Meursault limandaki yüzme havuzuna gider. Orada, eskiden aynı işyerinde daktilo olarak çalışan Marie Cardona ile karşılaşır. Birlikte yüzerler, güneşlenirler ve akşam bir komedi filmine giderler. O gece Marie, Meursault’nun evinde kalır. Marie, Meursault’nun annesinin bir gün önce gömüldüğünü öğrendiğinde şaşırır, ama bir şey söylemez.',
          'Meursault, Pazar gününü balkonunda, sokaktan geçen insanları izleyerek geçirir. Yürüyüşe çıkan aileleri, sinemadan dönen gençleri ve tramvayları seyreder. Akşam olduğunda, annesinin ölümüne rağmen hayatında hiçbir şeyin değişmediğini, yine işe gideceğini düşünür. Bu duygusuz ama dürüst gözlem, onun dünyaya bakışının özüdür.',
          'Birkaç hafta sonra Marie, Meursault’ya onu sevip sevmediğini sorar. Meursault, bu sorunun bir anlamı olmadığını, ama büyük olasılıkla onu sevmediğini söyler. Marie ondan kendisiyle evlenmesini istediğinde ise, bunun kendisi için fark etmeyeceğini, eğer Marie istiyorsa evlenebileceklerini söyler. Meursault, insanların önemli bulduğu duyguları ve kurumları, gerçek hayatın yanında anlamsız ve keyfi olarak görür.'
        ]
      },
      {
        title: 'Komşular',
        image: { svg: neighbors, caption: 'Cezayir’in beyaz sokaklarında köpeğiyle yürüyen yaşlı Salamano.' },
        text: [
          'Meursault’nun apartmanında iki tuhaf komşusu vardır. Biri, yaşlı Salamano’dur. Salamano, uyuz ve çirkin köpeğini sekiz yıldır her gün aynı saatte gezdirir, ama ona sürekli bağırır, küfreder ve onu döver. Bir gün köpek kaybolduğunda, Salamano yıkılır ve gece boyunca köpeği için ağlar. Meursault, bu ilişkinin bir tür nefret ve sevgi karışımı olduğunu gözlemler.',
          'Diğer komşusu Raymond Sintès ise, kendini depo bekçisi olarak tanıtan, ama aslında kadınları sömüren şüpheli bir adamdır. Raymond, sevgilisinin kendisini aldattığını düşünür ve ondan intikam almak ister. Meursault’dan, kadını aşağılayacak ve onu kendisine geri döndürecek bir mektup yazmasını ister. Meursault, hiçbir ahlaki kaygı duymadan, sadece Raymond’u memnun etmek için bu mektubu yazar.',
          'Raymond, kadını evine çağırır ve onu döver. Komşular polis çağırır. Meursault, polise Raymond lehine ifade verir. Bu sırada, kadının kardeşi olan bir Arap genç ve arkadaşları, Raymond’u takip etmeye başlar. Raymond, Meursault ve Marie’yi bir Pazar günü, bir arkadaşının deniz kenarındaki evine davet eder. Meursault, bu davetin hayatını sonsuza kadar değiştireceğinden habersizdir.'
        ]
      },
      {
        title: 'Kumsalda Dört Kurşun',
        image: { svg: shot, caption: 'Öğle güneşi, kayaların gölgesi ve bir bıçağın kör edici parıltısı.' },
        text: [
          'Pazar günü kumsalda, Raymond ve arkadaşı Masson ile yürürken, Raymond’u takip eden iki Arap’la karşılaşırlar. Kısa bir kavga çıkar ve Araplardan biri bıçağıyla Raymond’u yaralar. Raymond, yarası sarıldıktan sonra yanına bir tabanca alarak tekrar kumsala gider. Meursault, onun birini öldürmesini engellemek için tabancayı ondan alır. Ama Araplar o sırada çekip gider ve olay yatışır.',
          'Bir süre sonra Meursault, sıcaktan ve güneşten bunalarak, tek başına kumsala geri döner. Kayalıkların ardındaki küçük kaynağa yürür. Orada, kaynağın gölgesinde yatan Araplardan birini görür. Güneş, Meursault’yu adeta boğmaktadır. Başı zonklar, alnından terler akar ve gözleri yanar. Arap, bıçağını çeker ve bıçağın üzerinde parlayan güneş ışığı, Meursault’nun gözlerine bir kılıç gibi saplanır.',
          'O an, Meursault’nun bütün bedeni gerilir ve eli tabancanın tetiğine kenetlenir. Tetiği çeker. Arap yere düşer. Ardından, hareketsiz bedene dört kurşun daha sıkar. Camus, bu anı Meursault’nun bilinçli bir kararı olarak değil, güneşin, sıcağın ve rastlantının bir sonucu olarak anlatır. Meursault, daha sonra bu dört kurşunun, sanki mutsuzluğun kapısına vurulan dört kısa darbe gibi olduğunu düşünür. Romanın ilk bölümü burada biter.'
        ]
      },
      {
        title: 'Hapishane',
        image: { svg: prison, caption: 'Hücrenin parmaklıklı penceresinden görünen küçük bir gökyüzü parçası.' },
        text: [
          'Meursault tutuklanır ve sorguya çekilir. Avukatı ve sorgu yargıcı, cinayetten çok onun annesinin cenazesinde nasıl davrandığıyla ilgilenir. Sorgu yargıcı, elinde bir haçla ona Tanrı’ya inanıp inanmadığını sorar. Meursault inanmadığını söylediğinde, yargıç dehşete düşer ve ona “Deccal Bey” diye hitap etmeye başlar. Meursault, cinayetten dolayı gerçek bir pişmanlık duymadığını, yalnızca bir tür sıkıntı hissettiğini söyler.',
          'Aylar boyunca hapiste kalan Meursault, zamanla bu hayata alışır. Başlangıçta özgür bir insan gibi düşünür. Denize gitmek, sigara içmek ve Marie ile birlikte olmak ister. Ama zamanla, düşünceleriyle ve anılarıyla oyalanmayı öğrenir. Eski odasındaki her eşyayı, en küçük ayrıntısına kadar hatırlamaya çalışarak saatlerce vakit geçirir.',
          'Marie bir kez ziyarete gelir, ama ziyaretçi odasındaki gürültü ve kalabalık yüzünden doğru dürüst konuşamazlar. Meursault, hücresinde bulduğu eski bir gazete parçasında, uzun yıllar sonra evine dönen ve annesi ile kız kardeşi tarafından tanınmadan öldürülen bir adamın hikâyesini tekrar tekrar okur. Ona göre bu hikâye hem inanılmaz hem de son derece doğaldır.'
        ]
      },
      {
        title: 'Mahkeme',
        image: { svg: trial, caption: 'Kalabalık ve sıcak bir mahkeme salonu, ve sanık sandalyesinde kayıtsız bir adam.' },
        text: [
          'Bir yıl sonra Meursault mahkemeye çıkar. Mahkeme salonu sıcak ve kalabalıktır. Meursault, kendi davasını sanki başkasının davasıymış gibi ilgisizlikle izler. Savcı, Meursault’nun suçundan çok onun ruhunu yargılamaya başlar. Huzurevi müdürü ve kapıcı, onun annesinin cenazesinde ağlamadığını, tabutun başında kahve ve sigara içtiğini anlatır.',
          'Savcı, Meursault’nun annesinin cenazesinin ertesi günü Marie ile yüzmeye gittiğini, bir komedi filmi izlediğini ve onunla birlikte olduğunu vurgular. Raymond’un ahlaksız bir adam olduğunu ve Meursault’nun onun suç ortağı olduğunu iddia eder. Savcıya göre Meursault, ruhu olmayan, insanlıktan yoksun, topluma tehdit oluşturan bir canavardır. Annesinin cenazesinde ağlamayan bir adam, bir insanı soğukkanlılıkla öldürebilir.',
          'Meursault, kendini savunmak için söz aldığında, cinayeti güneş yüzünden işlediğini söyler. Salonda kahkahalar yükselir. Avukatı, onun dürüst ve çalışkan bir adam olduğunu savunsa da, jüri Meursault’yu suçlu bulur. Mahkeme, onun Fransız halkı adına, bir meydanda başı kesilerek idam edilmesine karar verir. Camus, bu sahnede toplumun bir insanı, işlediği suçtan çok, kurallarına uymadığı için cezalandırdığını gösterir.'
        ]
      },
      {
        title: 'Dünyanın Tatlı Kayıtsızlığı',
        image: { svg: stars, caption: 'İdamdan önceki son gece, hücrenin penceresinden görünen yıldızlar.' },
        text: [
          'Meursault, idam cezasını beklerken, temyiz başvurusunun sonucunu ve idamın gerçekleşeceği şafağı düşünür. Kaçmanın bir yolunu, idam mekanizmasının bir aksaklığını hayal eder. Hapishane papazı, defalarca onu ziyaret etmek ister ve Meursault her seferinde reddeder. Sonunda papaz, izin almadan hücresine girer ve onu Tanrı’ya ve ahirete inanmaya ikna etmeye çalışır.',
          'Meursault, papazın teselli sözlerine karşı birden büyük bir öfkeyle patlar. Onun yakasına yapışır ve bağırır. Papazın bütün kesinliklerinin, bir kadının tek bir saç teli kadar bile değerli olmadığını söyler. Herkesin bir gün öleceğini, hiçbir şeyin önemli olmadığını, kendisinin her zaman haklı olduğunu ve hayatını istediği gibi yaşadığını haykırır. Gardiyanlar papazı kurtarır.',
          'Papaz gittikten sonra Meursault, uzun zamandır ilk kez huzur bulur. Hücresinin penceresinden yıldızları ve geceyi seyreder. Dünyanın tatlı kayıtsızlığına ilk kez kalbini açtığını hisseder. Evrenin kendisine benzediğini, mutlu olduğunu ve her zaman mutlu olduğunu fark eder. Son dileği, idam günü büyük bir kalabalığın kendisini nefret çığlıklarıyla karşılamasıdır. Yabancı, Camus’nün “absürt” felsefesinin en güçlü edebi ifadesidir: Anlamsız bir evrende, insanın kendi hayatını dürüstçe ve sahte umutlara kapılmadan kabullenmesinin hikâyesi.'
        ]
      }
    ]
  };
})();
