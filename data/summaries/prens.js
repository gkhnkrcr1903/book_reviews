// Prens — Niccolò Machiavelli (1532)
// Sahneler data/scenes.js yardımcılarıyla çizilir; ileride image.src ile gerçek çizimlerle değiştirilebilir.
(() => {
  const { svg, glow, skyline, figure, seated, streaks, dots } = window.Scene;

  // Floransa silueti: Duomo kubbesi ve Palazzo Vecchio kulesi
  const florence = (y, c) => `
    <g fill="${c}">
      ${Array.from({ length: 16 }, (_, i) => `<rect x="${i * 52 - 10}" y="${y - 40 - (i * 17) % 50}" width="50" height="${120 + (i * 17) % 50}"/><polygon points="${i * 52 - 14},${y - 40 - (i * 17) % 50} ${i * 52 + 15},${y - 56 - (i * 17) % 50} ${i * 52 + 44},${y - 40 - (i * 17) % 50}"/>`).join('')}
      <path d="M300 ${y - 70} Q300 ${y - 170} 380 ${y - 175} Q460 ${y - 170} 460 ${y - 70} Z"/><rect x="372" y="${y - 200}" width="16" height="28"/><circle cx="380" cy="${y - 205}" r="6"/>
      <rect x="520" y="${y - 230}" width="34" height="200"/><rect x="514" y="${y - 240}" width="46" height="16"/><rect x="530" y="${y - 270}" width="14" height="30"/>
      <rect x="230" y="${y - 140}" width="20" height="100"/>
    </g>`;
  const crown = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}"><path d="M-40 0 L-44 -40 L-22 -18 L0 -50 L22 -18 L44 -40 L40 0 Z"/><rect x="-42" y="0" width="84" height="12"/>
    ${[-30, 0, 30].map(cx => `<circle cx="${cx}" cy="6" r="4" fill="#a82a2a"/>`).join('')}</g>`;

  // 1 — Sürgündeki Machiavelli: mum ışığında yazı masası
  const study = svg({
    sky: ['#140c08', '#24160c', '#140c08'],
    vignette: .7,
    body: id => `
      ${glow(id, 340, 200, 260, '#ffb050', .5)}
      <rect x="560" y="60" width="170" height="200" fill="#1a2a40"/>${dots(7, 30, '#fff', 1, .8, 66, 254).replace(/cx="(\d+)"/g, (m, v) => `cx="${566 + (+v % 160)}"`)}
      <line x1="645" y1="60" x2="645" y2="260" stroke="#140c08" stroke-width="6"/>
      <path d="M140 260 H560 L580 280 H120 Z" fill="#4a2e1a"/><rect x="150" y="280" width="420" height="80" fill="#2a1a0e"/>
      <rect x="380" y="236" width="12" height="24" fill="#e8dcc4"/><path d="M386 236 q-4 -12 0 -20 q4 8 0 20" fill="#ffd070"/>${glow(id, 386, 226, 60, '#fff0b0', .9)}
      <path d="M260 250 Q300 240 340 250 L340 258 Q300 248 260 258 Z" fill="#e8dcc4"/>
      <line x1="320" y1="220" x2="345" y2="254" stroke="#e8dcc4" stroke-width="2"/>
      ${seated(250, 262, 1.8, '#0a0604')}`
  });

  // 2 — Floransa ve Medici’ler
  const medici = svg({
    sky: ['#3a2a4a', '#a8644a', '#f4b46a'],
    vignette: .45,
    body: id => `
      ${glow(id, 640, 200, 200, '#fff0c0', .7)}<circle cx="640" cy="200" r="36" fill="#fff4d8"/>
      ${florence(320, '#2a1a20')}
      <rect y="320" width="800" height="80" fill="#1a1014"/>
      <path d="M0 340 Q400 330 800 342" stroke="#3a4a6a" stroke-width="18" fill="none" opacity=".7"/>
      <g transform="translate(140 110)"><circle r="40" fill="#d9a83a"/>${[[-14, -14], [14, -14], [-18, 6], [18, 6], [0, 20], [0, -24]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="7" fill="${i === 5 ? '#2a4aa8' : '#a82a2a'}"/>`).join('')}</g>`
  });

  // 3 — Prenslik türleri: kale, saray ve fethedilen şehir
  const principalities = svg({
    sky: ['#6a8ab0', '#a8c0d0', '#e8dcc0'],
    vignette: .4, grain: .14,
    body: id => `
      <path d="M0 260 L100 180 L220 230 L340 160 L480 230 L600 170 L800 250 V400 H0 Z" fill="#7a8a5a"/>
      <g transform="translate(180 260)" fill="#5a4a3a"><rect x="-60" y="-80" width="120" height="80"/>${[-60, -30, 0, 30].map(x => `<rect x="${x}" y="-92" width="16" height="12"/>`).join('')}<rect x="-80" y="-120" width="30" height="120"/><rect x="50" y="-120" width="30" height="120"/>${crown(0, -132, .5, '#d9a83a')}</g>
      <g transform="translate(420 270)" fill="#8a6a4a"><rect x="-70" y="-60" width="140" height="60"/><polygon points="-80,-60 0,-100 80,-60"/>${Array.from({ length: 5 }, (_, k) => `<rect x="${-56 + k * 26}" y="-44" width="12" height="30" fill="#3a2a1a"/>`).join('')}</g>
      <g transform="translate(640 270)"><rect x="-60" y="-70" width="120" height="70" fill="#4a3a2a"/>${glow(id, 640, 210, 60, '#ff7a3a', .6)}<path d="M-20 -70 q20 -40 0 -80" stroke="#3a3a3a" stroke-width="16" fill="none" opacity=".4" filter="url(#${id}blur)"/></g>
      <rect y="300" width="800" height="100" fill="#5a6a3a"/>
      ${[100, 300, 520, 720].map((x, i) => figure(x, 340, 1.2, '#2a2014', { hat: i % 2 === 0 })).join('')}`
  });

  // 4 — Cesare Borgia ve talihin çarkı
  const borgia = svg({
    sky: ['#1a0a0a', '#3a1414', '#5a2a1a'],
    vignette: .6,
    body: id => `
      <g transform="translate(560 170)" opacity=".7">
        <circle r="130" fill="none" stroke="#d9a83a" stroke-width="6"/><circle r="20" fill="#d9a83a"/>
        ${Array.from({ length: 8 }, (_, k) => `<line x1="0" y1="0" x2="${Math.cos(k * .785) * 130}" y2="${Math.sin(k * .785) * 130}" stroke="#d9a83a" stroke-width="4"/>`).join('')}
      </g>
      ${glow(id, 560, 170, 220, '#d9a83a', .25)}
      <rect y="320" width="800" height="80" fill="#0e0606"/>
      <g transform="translate(240 330) scale(2)" fill="#050202">
        <path d="M-30 -40 Q-10 -50 20 -44 L34 -62 Q40 -70 46 -62 L44 -54 L38 -48 L30 -30 L28 0 H23 L22 -28 L-18 -28 L-20 0 H-25 L-27 -30 Q-36 -32 -40 -22 L-44 -24 Q-40 -38 -30 -40 Z"/>
        <path d="M-6 -46 Q0 -70 6 -46 Z"/><circle cx="0" cy="-72" r="6"/><path d="M-10 -78 L-6 -84 L6 -84 L10 -78 Z"/>
      </g>
      <line x1="270" y1="200" x2="300" y2="100" stroke="#c8c8c8" stroke-width="3"/>`
  });

  // 5 — Paralı askerler ve kendi ordusu
  const armies = svg({
    sky: ['#4a4a52', '#7a7a7a', '#a8a090'],
    vignette: .5, grain: .16,
    body: id => `
      <path d="M0 250 Q400 220 800 250 V400 H0 Z" fill="#6a6a4a"/>
      ${Array.from({ length: 3 }, (_, row) => Array.from({ length: 12 }, (_, i) => `${figure(380 + i * 34, 290 + row * 26, 1 + row * .15, '#2a2a2a', { hat: true })}<line x1="${386 + i * 34}" y1="${230 + row * 26}" x2="${386 + i * 34}" y2="${170 + row * 26}" stroke="#2a2a2a" stroke-width="2"/>`).join('')).join('')}
      ${Array.from({ length: 4 }, (_, i) => figure(80 + i * 60, 320, 1.3, '#6a4a3a', { hat: true })).join('')}
      <g transform="translate(150 230)"><rect x="-30" y="-20" width="60" height="20" fill="#d9a83a"/><circle cx="-16" cy="-24" r="8" fill="#d9a83a"/><circle cx="0" cy="-26" r="8" fill="#d9a83a"/><circle cx="16" cy="-24" r="8" fill="#d9a83a"/></g>
      ${Array.from({ length: 6 }, (_, i) => `<rect x="${560 + (i % 3) * 30}" y="${100 + Math.floor(i / 3) * 18}" width="${20}" height="12" fill="${['#2a4aa8', '#a82a2a', '#e8dcc4'][i % 3]}"/>`).join('')}<line x1="560" y1="100" x2="560" y2="200" stroke="#2a2a2a" stroke-width="3"/>`
  });

  // 6 — Sevilmek mi, korkulmak mı?
  const fearLove = svg({
    sky: ['#14101a', '#241a2a', '#14101a'],
    vignette: .65,
    body: id => `
      ${glow(id, 400, 160, 240, '#d9a83a', .35)}
      <rect x="320" y="120" width="160" height="200" fill="#3a1a1a"/><rect x="330" y="80" width="140" height="50" fill="#3a1a1a"/>
      ${crown(400, 76, .7, '#d9a83a')}
      <g transform="translate(400 300) scale(2.4)" fill="#0a0608"><path d="M-12 -48 Q0 -54 12 -48 L16 -6 H-16 Z"/><circle cx="0" cy="-60" r="9"/></g>
      <rect y="320" width="800" height="80" fill="#0a0608"/>
      ${Array.from({ length: 8 }, (_, i) => `<g transform="translate(${60 + i * 34} 360) scale(1.1)">${figure(0, 0, 1, '#1a1014', {})}</g>`).join('')}
      ${Array.from({ length: 8 }, (_, i) => `<g transform="translate(${500 + i * 34} 366)" opacity=".85"><path d="M-10 0 Q-10 -20 0 -24 Q10 -20 10 0 Z" fill="#1a1014"/><circle cy="-30" r="7" fill="#1a1014"/></g>`).join('')}`
  });

  // 7 — Tilki ve aslan
  const foxLion = svg({
    sky: ['#2a1a0a', '#6a3a14', '#c87a2a'],
    vignette: .5,
    body: id => `
      ${glow(id, 400, 260, 260, '#ffd08a', .6)}
      <path d="M0 290 Q400 260 800 290 V400 H0 Z" fill="#2a1a0a"/>
      <g transform="translate(250 290) scale(2.4)" fill="#c85a1a">
        <path d="M-30 -10 Q-26 -26 0 -26 Q18 -26 24 -30 L32 -40 L34 -30 L40 -26 L30 -20 Q26 -10 20 -10 V0 H16 V-8 H-16 V0 H-20 V-10 Z"/>
        <path d="M-30 -14 Q-50 -10 -56 4 Q-40 -2 -30 -6 Z" fill="#c85a1a"/><path d="M-56 4 l6 -6 l2 6 z" fill="#f4ecd8"/>
      </g>
      <g transform="translate(560 290) scale(2.4)" fill="#d9a83a">
        <path d="M-34 -16 Q-30 -30 0 -30 Q20 -30 26 -30 L26 0 H20 V-12 H-18 V0 H-24 V-14 Z"/>
        <circle cx="30" cy="-34" r="14" fill="#8a5a1a"/><circle cx="32" cy="-34" r="9"/>
        <path d="M-34 -18 Q-46 -20 -48 -34" stroke="#d9a83a" stroke-width="2" fill="none"/><circle cx="-48" cy="-36" r="3" fill="#8a5a1a"/>
      </g>`
  });

  // 8 — Talih bir nehirdir: setler ve İtalya’ya çağrı
  const fortune = svg({
    sky: ['#1a2a3a', '#3a4a5a', '#6a6a6a'],
    vignette: .55,
    body: id => `
      ${streaks(17, 160, '#9ab0c8', 30, -8, .35)}
      <path d="M0 230 Q200 200 400 240 T800 220 V400 H0 Z" fill="#1a2a3a"/>
      <path d="M0 300 Q200 250 400 300 T800 280" stroke="#5a7aa0" stroke-width="40" fill="none" opacity=".9"/>
      ${Array.from({ length: 10 }, (_, i) => `<path d="M${i * 90} ${290 + (i % 2) * 10} q20 -10 40 0" stroke="#c8d8e8" stroke-width="2" fill="none" opacity=".7"/>`).join('')}
      <path d="M440 220 L460 360 L480 220 Z" fill="#5a4a3a"/>
      <rect x="430" y="210" width="60" height="20" fill="#5a4a3a"/>${Array.from({ length: 5 }, (_, k) => `<rect x="${500 + k * 40}" y="${250 + k * 4}" width="30" height="14" fill="#6a5a4a"/>`).join('')}
      ${figure(300, 260, 1.6, '#0a0e14', {})}${figure(340, 262, 1.5, '#0a0e14', { hat: true })}
      ${florence(220, '#141c28').replace(/<g fill/, '<g opacity=".5" fill')}`
  });

  window.SUMMARIES['prens'] = {
    pages: [
      {
        title: 'Sürgündeki Diplomat',
        image: { svg: study, caption: 'San Casciano’da bir çiftlik evi: gündüz köylülerle kumar, gece kitaplarla sohbet.' },
        text: [
          'Niccolò Machiavelli, on dört yıl boyunca Floransa Cumhuriyeti’nin önemli bir diplomatı ve devlet adamı olarak çalışmıştır. Fransa kralının, papanın ve İtalya’nın güçlü prenslerinin saraylarında bulunmuş, savaşları ve entrikaları yakından izlemiştir. Ama 1512’de Medici ailesi Floransa’ya geri dönüp cumhuriyeti yıkınca, Machiavelli görevinden alınır. Bir komploya karıştığı şüphesiyle hapse atılır, işkence görür ve sonunda şehrin dışındaki küçük bir çiftlik evine sürgüne gönderilir.',
          'Machiavelli, bir arkadaşına yazdığı ünlü bir mektupta bu dönemdeki günlerini anlatır. Gündüzleri köylülerle kumar oynar, meyhanelerde vakit geçirir ve kendini sıradan bir hayatın içinde kaybeder. Akşam olunca ise çamurlu giysilerini çıkarır, saray elbiselerini giyer ve kitaplarının başına geçer. Orada antik çağın büyük adamlarıyla, yani okuduğu tarihçilerin ve devlet adamlarının düşünceleriyle sohbet eder.',
          'Prens, bu sohbetlerin ürünüdür. Machiavelli, kitabı Floransa’nın yeni hükümdarı Lorenzo de’ Medici’ye ithaf eder. Amacı hem yeniden bir göreve dönmek hem de yıllarca edindiği siyaset deneyimini paylaşmaktır. Kitap, onun ölümünden beş yıl sonra, 1532’de yayımlanır ve kısa sürede siyaset tarihinin en çok tartışılan eserlerinden biri hâline gelir.'
        ]
      },
      {
        title: 'Parçalanmış Bir İtalya',
        image: { svg: medici, caption: 'Floransa’nın kubbeleri ve kuleleri, üzerinde Medici ailesinin arması.' },
        text: [
          'Machiavelli’nin yaşadığı İtalya, birbiriyle sürekli savaşan küçük devletlerden oluşur. Floransa, Venedik, Milano, Napoli ve Papalık Devleti, İtalya’nın en güçlü yönetimleridir, ama hiçbiri tek başına yarımadayı birleştirecek kadar güçlü değildir. Bu bölünmüşlükten yararlanan Fransa ve İspanya gibi büyük krallıklar, İtalya’yı sürekli işgal etmekte ve şehirlerini yağmalamaktadır.',
          'Machiavelli, bu kaotik dünyada bir yöneticinin nasıl ayakta kalabileceğini ve gücünü nasıl koruyabileceğini anlatmak ister. Ama onun yaklaşımı, kendisinden önceki yazarlardan çok farklıdır. Orta Çağ boyunca yazılan “prenslere öğütler” kitapları, iyi bir hükümdarın nasıl adil, cömert ve dindar olması gerektiğini anlatırdı. Machiavelli ise insanların nasıl yaşaması gerektiğini değil, gerçekte nasıl yaşadığını anlatmayı tercih eder.',
          'Machiavelli, kitabının başında bu tercihini açıkça ortaya koyar. Ona göre insanın nasıl yaşadığı ile nasıl yaşaması gerektiği arasında öyle büyük bir fark vardır ki, sadece olması gerekeni yapan bir hükümdar, kendini korumak yerine yıkıma sürükler. Bu cesur ve gerçekçi bakış açısı, Prens’i modern siyaset biliminin başlangıcı hâline getirir.'
        ]
      },
      {
        title: 'Prenslik Türleri',
        image: { svg: principalities, caption: 'Kalıtsal krallıklar, yeni kurulan saraylar ve yeni fethedilmiş şehirler.' },
        text: [
          'Machiavelli, bütün devletlerin ya cumhuriyet ya da prenslik olduğunu söyler. Kitabında yalnızca prenslikleri ele alır ve onları farklı türlere ayırır. En kolay yönetilen prenslik, kalıtsal olanıdır. Halk uzun zamandır aynı aileye alışmış olduğu için, böyle bir prensin sadece atalarının düzenini bozmaması ve olağanüstü bir hata yapmaması yeterlidir.',
          'Asıl zorluk, yeni bir prenslikte başlar. Özellikle bir prens yeni topraklar fethettiğinde, bir yandan eski yönetimin taraftarlarıyla, diğer yandan da kendisinden beklentileri karşılanmayan yeni taraftarlarıyla uğraşmak zorunda kalır. Machiavelli, bu tür topraklarda kalıcı olabilmek için prensin ya oraya bizzat yerleşmesini ya da koloniler kurmasını öğütler. Ayrıca güçlü komşulara karşı zayıf olanları koruması, ama onları fazla güçlendirmemesi gerektiğini söyler.',
          'Machiavelli, kendi geleneklerine ve yasalarına göre yaşamaya alışmış özgür bir şehri yönetmenin en zor iş olduğunu da vurgular. Böyle bir şehrin halkı, özgürlüklerini asla unutmaz ve ilk fırsatta yeniden ayaklanır. Ona göre bu şehirleri elde tutmanın en kesin yolu, ne kadar acımasız olsa da, onları yıkmak ya da halkı başka yerlere dağıtmaktır.'
        ]
      },
      {
        title: 'Erdem ve Talih',
        image: { svg: borgia, caption: 'Talihin çarkının önünde atlı bir hükümdar: Cesare Borgia.' },
        text: [
          'Machiavelli’nin düşüncesinde iki kavram merkezi bir yer tutar: “virtù” ve “fortuna”. Virtù, genellikle “erdem” diye çevrilse de ahlaki iyilikten çok cesareti, kararlılığı, zekâyı ve fırsatları değerlendirme yeteneğini anlatır. Fortuna ise talih, yani insanın kontrolü dışındaki şans ve koşullardır. Machiavelli’ye göre en büyük hükümdarlar, Musa, Kiros, Romulus ve Theseus gibi, talihten çok kendi virtù’larıyla yükselen insanlardır.',
          'Talihle iktidara gelenler ise çok daha zor durumdadır, çünkü kendilerine bu gücü veren kişilere ve koşullara bağımlıdırlar. Machiavelli, bu durumun en çarpıcı örneği olarak Cesare Borgia’yı anlatır. Babası Papa VI. Aleksandr’ın desteğiyle orta İtalya’da güçlü bir devlet kuran Cesare, son derece zeki ve acımasız bir yöneticidir. Düşmanlarını tuzağa düşürür, halkın gözünde sevilmek için kendi sert valisini bile idam ettirir.',
          'Machiavelli, Cesare’nin neredeyse her şeyi doğru yaptığını söyler. Ama babası beklenmedik bir şekilde ölünce ve kendisi de aynı anda ağır bir hastalığa yakalanınca, Cesare’nin kurduğu bütün düzen çöker. Bu, Machiavelli’nin kitabın sonunda tekrar döneceği bir derstir: En yetenekli insan bile talihin bir anda değişebileceğini hesaba katmak zorundadır.'
        ]
      },
      {
        title: 'Kendi Silahların',
        image: { svg: armies, caption: 'Para için savaşan kiralık askerler ve vatanı için savaşan bir ordu.' },
        text: [
          'Machiavelli’ye göre bir devletin temeli iyi yasalar ve iyi ordulardır. Ama iyi ordular olmadan iyi yasalar da olamaz. Bu yüzden kitabın önemli bir bölümünü askerî konulara ayırır. O dönemde İtalyan devletleri, savaşlarını büyük ölçüde parayla tutulan paralı askerlerle, yani “condottieri” denen komutanların ordularıyla yaparlardı. Machiavelli, bu askerleri sert bir dille eleştirir.',
          'Ona göre paralı askerler işe yaramaz ve tehlikelidir. Birbirleriyle çekişir, disiplinsizdir, sadık değildir ve dostlarına karşı cesur, düşmanlarına karşı korkaktırlar. Barış zamanında sizi soyarlar, savaş zamanında ise düşman tarafından yağmalanmanıza göz yumarlar. Çünkü onları savaş alanında tutan tek şey küçük bir maaştır ve bu maaş, sizin için ölmelerine yetecek bir neden değildir.',
          'Machiavelli, başka bir devletten yardım olarak gelen askerlerin de aynı derecede tehlikeli olduğunu söyler. Bu askerler kazanırsa, prens onların sahibine bağımlı hâle gelir. Kaybederse, zaten yıkılır. Bu yüzden bilge bir prens, kendi vatandaşlarından oluşan kendi ordusunu kurmalıdır. Machiavelli, prensin en önemli görevinin savaşı ve savaş sanatını öğrenmek olduğunu, barış zamanında bile bunu asla ihmal etmemesi gerektiğini vurgular.'
        ]
      },
      {
        title: 'Sevilmek mi, Korkulmak mı?',
        image: { svg: fearLove, caption: 'Tahtında oturan bir hükümdar ve ona bakan halkının iki farklı yüzü.' },
        text: [
          'Prens’in en ünlü bölümü, bir hükümdarın hangi niteliklere sahip olması gerektiğini anlatır. Machiavelli, prensin iyi görünen bütün erdemlere sahip olmasının hem imkânsız hem de tehlikeli olduğunu söyler. Bir prens gerektiğinde iyi olmamayı bilmeli ve bu yeteneğini koşullara göre kullanmalıdır. Örneğin çok cömert bir prens, halkının parasını israf ederek sonunda vergileri artırmak zorunda kalır ve nefret toplar. Bu yüzden biraz cimri olmak, uzun vadede halkı korur.',
          'Machiavelli, ardından ünlü sorusunu sorar: Bir prensin sevilmesi mi daha iyidir, yoksa korkulması mı? Cevabı, en ideal olanın ikisinin birden olması, ama ikisinden birini seçmek gerekirse korkulmanın daha güvenli olduğudur. Çünkü insanlar genellikle nankör, dönek, yalancı ve çıkarcıdır. Siz onlara iyilik yaptığınız sürece sizin yanınızdadırlar, ama tehlike geldiğinde sırtlarını dönerler. Sevgi kolayca kırılabilen bir bağdır, korku ise cezalandırılma kaygısıyla sürekli canlı kalır.',
          'Ama Machiavelli, korkunun asla nefrete dönüşmemesi gerektiği konusunda çok nettir. Nefret edilen bir prens, er ya da geç bir komploya kurban gider. Prensin nefretten kaçınmanın en kolay yolu da halkının mülküne ve ailelerine dokunmamaktır. Machiavelli bunu çarpıcı bir gözlemle anlatır: İnsanlar babalarının ölümünü, miraslarının kaybından daha çabuk unutur.'
        ]
      },
      {
        title: 'Tilki ve Aslan',
        image: { svg: foxLion, caption: 'Kurnaz tilki ve güçlü aslan: her prensin içinde taşıması gereken iki hayvan.' },
        text: [
          'Machiavelli, bir prensin sözünü tutmasının övgüye değer olduğunu kabul eder. Ama tarihin ona öğrettiği gerçek, sözünü tutmayan ve insanları kurnazlıkla aldatmayı bilen prenslerin büyük işler başardığıdır. Ona göre mücadele etmenin iki yolu vardır: yasalarla ve güçle. Birincisi insana, ikincisi hayvana özgüdür. Ama birincisi çoğu zaman yetmediği için, prens ikincisine de başvurmak zorundadır.',
          'Bu noktada Machiavelli, ünlü benzetmesini yapar. Prens, hem tilki hem de aslan olmayı bilmelidir. Aslan tuzaklardan kendini koruyamaz, tilki ise kurtlara karşı kendini savunamaz. Bu yüzden prens, tuzakları fark etmek için tilki, kurtları korkutmak için aslan olmalıdır. Sadece aslan olmayı bilenler bu işi anlamamıştır.',
          'Machiavelli’ye göre en önemli şey görünüştür. Prens, merhametli, sözüne sadık, dürüst, insancıl ve dindar görünmelidir. Hatta gerçekten de öyle olmalıdır, ama gerektiğinde bunun tam tersini yapabilecek esnekliğe sahip olmalıdır. Çünkü insanların çoğu gözleriyle yargılar, ellerini sürerek yargılayanlar çok azdır. Herkes sizin ne göründüğünüzü görür, ama çok azı gerçekte ne olduğunuzu bilir. Sonunda insanlar sonuçlara bakar. Prens devletini korumayı başarırsa, kullandığı yöntemler her zaman onurlu sayılacak ve herkes tarafından övülecektir.'
        ]
      },
      {
        title: 'Talihin Nehri',
        image: { svg: fortune, caption: 'Taşan bir nehir ve önüne zamanında kurulan setler.' },
        text: [
          'Machiavelli, kitabın sonuna doğru prensin yanındaki insanları seçmesinin ne kadar önemli olduğunu anlatır. Bir prensin zekâsı, ilk önce etrafındaki insanlara bakarak anlaşılır. Akıllı bir prens, dalkavuklardan uzak durmalı, ama herkesin ona istediği zaman gerçeği söylemesine de izin vermemelidir. Sadece seçtiği bilge danışmanlara, sadece sorduğu konularda dürüstçe konuşma hakkı vermeli ve kararı her zaman kendisi vermelidir.',
          'Ardından Machiavelli, kitabın başından beri değindiği talih sorusuna geri döner. İnsanların hayatının yarısını talihin, diğer yarısını ise kendi iradelerinin yönettiğini söyler. Talihi, taştığında ovaları sular altında bırakan, ağaçları söken ve evleri yıkan azgın bir nehre benzetir. Bu nehrin taşmasını kimse durduramaz, ama sakin zamanlarda setler ve bentler kurarak onun yıkıcı etkisini azaltmak mümkündür. Talih, ancak insanın kendini hazırlamadığı yerlerde gücünü gösterir.',
          'Kitabın son bölümü ise tutkulu bir çağrıdır. Machiavelli, Medici ailesini, yabancı işgalciler tarafından parçalanan, aşağılanan ve yağmalanan İtalya’yı kurtarmaya ve birleştirmeye davet eder. Bunun için gereken bütün koşulların hazır olduğunu, İtalya’nın onu kurtaracak bir lideri beklediğini söyler. Prens, yüzyıllar boyunca acımasız bir iktidar kılavuzu olarak eleştirilmiş, “makyavelist” kelimesi entrikacılığın eş anlamlısı olmuştur. Ama bugün aynı zamanda, siyaseti ahlak kurallarından ayırarak gerçekçi bir şekilde inceleyen ilk modern eser olarak kabul edilir.'
        ]
      }
    ]
  };
})();
