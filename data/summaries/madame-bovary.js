// Madame Bovary — Gustave Flaubert (1857)
// Sahneler data/scenes.js yardımcılarıyla çizilir; ileride image.src ile gerçek çizimlerle değiştirilebilir.
(() => {
  const { svg, glow, skyline, figure, seated, streaks, dots } = window.Scene;

  const carriage = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}"><rect x="-50" y="-60" width="100" height="50" rx="10"/><rect x="-40" y="-52" width="30" height="24" fill="#ffd88a" opacity=".5"/><rect x="10" y="-52" width="30" height="24" fill="#ffd88a" opacity=".5"/><circle cx="-34" cy="0" r="14" fill="none" stroke="${c}" stroke-width="4"/><circle cx="34" cy="0" r="14" fill="none" stroke="${c}" stroke-width="4"/></g>`;

  // 1 — Normandiya çiftliği ve genç doktor
  const farm = svg({
    sky: ['#8aa8c0', '#c8d4d8', '#ece4d0'],
    vignette: .35, grain: .14,
    body: id => `
      <path d="M0 240 Q400 210 800 240 V400 H0 Z" fill="#8aa86a"/>
      ${Array.from({ length: 8 }, (_, i) => `<g transform="translate(${50 + i * 100} 240)"><rect x="-4" y="-50" width="8" height="50" fill="#4a3a2a"/><circle cy="-66" r="${26 + (i % 3) * 6}" fill="#e8d8e0"/></g>`).join('')}
      <g transform="translate(560 300)"><rect x="-90" y="-70" width="180" height="70" fill="#e8dcc4"/><polygon points="-100,-70 0,-110 100,-70" fill="#6a4a3a"/>${[-60, -20, 40].map(x => `<rect x="${x}" y="-54" width="20" height="24" fill="#5a6a7a"/>`).join('')}</g>
      <g transform="translate(220 350) scale(1.6)" fill="#2a1a10"><path d="M-30 -40 Q-10 -50 20 -44 L34 -62 Q40 -70 46 -62 L44 -54 L38 -48 L30 -30 L28 0 H23 L22 -28 L-18 -28 L-20 0 H-25 L-27 -30 Q-36 -32 -40 -22 L-44 -24 Q-40 -38 -30 -40 Z"/></g>
      ${figure(220, 288, 1.1, '#1a1410', { hat: true })}${figure(420, 350, 1.5, '#3a3a5a', { dress: true, shawl: '#e8dcc4' })}`
  });

  // 2 — Vaubyessard balosu
  const ball = svg({
    sky: ['#2a1420', '#4a2030', '#2a1420'],
    vignette: .5,
    body: id => `
      ${glow(id, 400, 70, 320, '#ffe0a0', .55)}
      ${[160, 400, 640].map(x => `<line x1="${x}" y1="0" x2="${x}" y2="50" stroke="#d9a83a"/><path d="M${x - 40} 60 Q${x} 86 ${x + 40} 60" stroke="#d9a83a" stroke-width="3" fill="none"/>${glow(id, x, 64, 60, '#fff4c0', .8)}`).join('')}
      ${[80, 240, 560, 720].map(x => `<rect x="${x - 40}" y="110" width="80" height="170" fill="#140a10"/><rect x="${x - 34}" y="116" width="68" height="158" fill="#3a5a8a" opacity=".3"/>`).join('')}
      <rect y="290" width="800" height="110" fill="#5a3a24"/>
      <g transform="translate(400 330) rotate(-8)"><path d="M-14 -50 Q0 -56 14 -50 L36 0 H-36 Z" fill="#d8b0c0"/><circle cy="-62" r="9" fill="#d8b0c0"/></g>${figure(446, 330, 1.9, '#0a0a0a')}
      ${[150, 210, 600, 660].map((x, i) => figure(x, 320, 1.3, i % 2 ? '#3a1a2a' : '#0a0a0a', i % 2 ? { dress: true } : {})).join('')}`
  });

  // 3 — Yonville taşra kasabası ve eczacı Homais
  const yonville = svg({
    sky: ['#8a9aaa', '#b8c0c4', '#d8d4c8'],
    vignette: .4, grain: .16,
    body: id => `
      <g transform="translate(400 280)"><rect x="-30" y="-150" width="60" height="150" fill="#9a9080"/><polygon points="-36,-150 0,-200 36,-150" fill="#5a5a6a"/><circle cy="-120" r="12" fill="#e8e0d0"/></g>
      ${[[140, 1], [250, 0], [550, 1], [660, 0]].map(([x, a]) => `<g transform="translate(${x} 280)"><rect x="-50" y="-80" width="100" height="80" fill="${a ? '#d8c8a8' : '#c8b898'}"/><polygon points="-56,-80 0,-110 56,-80" fill="#6a4a3a"/><rect x="-36" y="-60" width="22" height="26" fill="#5a6a7a"/><rect x="12" y="-60" width="22" height="26" fill="#5a6a7a"/></g>`).join('')}
      <rect x="500" y="200" width="100" height="22" fill="#2a5a3a"/><text x="550" y="216" text-anchor="middle" font-family="Lora,serif" font-size="13" fill="#f4ecd8">ECZANE</text>
      <rect y="280" width="800" height="120" fill="#8a8070"/>
      ${figure(560, 330, 1.6, '#1a1a1a', { hat: true })}${figure(300, 330, 1.5, '#3a2a3a', { dress: true })}${figure(350, 332, 1.4, '#2a2a2a')}`
  });

  // 4 — Tarım fuarı ve Rodolphe
  const fair = svg({
    sky: ['#9ab8d8', '#cfdce8', '#f4ecd8'],
    vignette: .35, grain: .12,
    body: id => `
      ${glow(id, 640, 90, 150, '#fff8d8', .7)}
      <path d="M0 260 Q400 240 800 260 V400 H0 Z" fill="#8aa85a"/>
      <g transform="translate(200 260)"><rect x="-110" y="-70" width="220" height="70" fill="#a83a2a" opacity=".8"/>${Array.from({ length: 6 }, (_, i) => `<rect x="${-110 + i * 40}" y="-80" width="20" height="10" fill="#f4ecd8"/>`).join('')}${Array.from({ length: 6 }, (_, i) => figure(-90 + i * 36, -4, 1, '#1a1a1a', { hat: i % 2 === 0 })).join('')}</g>
      ${Array.from({ length: 6 }, (_, i) => `<g transform="translate(${380 + i * 34} 300)" fill="#4a3a2a"><path d="M-22 -20 H16 Q22 -24 26 -20 L30 -22 L28 -16 Q26 -10 20 -8 V0 H16 V-6 H-16 V0 H-20 V-10 Q-26 -12 -26 -18 Z"/></g>`).join('')}
      <rect x="560" y="130" width="140" height="80" fill="#e8dcc4" opacity=".75"/><line x1="630" y1="130" x2="630" y2="210" stroke="#8a7a6a" stroke-width="4"/>
      ${figure(610, 200, 1, '#3a1a2a', { dress: true })}${figure(650, 200, 1.05, '#0a0a0a', { hat: true })}`
  });

  // 5 — Ormanda at gezintisi
  const forest = svg({
    sky: ['#c86a3a', '#e8a05a', '#f4cc8a'],
    vignette: .5, grain: .14,
    body: id => `
      ${Array.from({ length: 16 }, (_, i) => `<g transform="translate(${(i * 53) % 800} ${260 + (i % 3) * 10})"><rect x="-6" y="-200" width="12" height="200" fill="#3a2010"/><circle cy="-210" r="${50 + (i % 3) * 10}" fill="${['#a84a1a', '#c86a2a', '#8a3a1a'][i % 3]}" opacity=".85"/></g>`).join('')}
      <rect y="280" width="800" height="120" fill="#5a3a1a"/>
      ${Array.from({ length: 60 }, (_, i) => `<ellipse cx="${(i * 41) % 800}" cy="${290 + (i * 13) % 100}" rx="5" ry="3" fill="${['#e88a2a', '#c85a1a', '#f4b04a'][i % 3]}"/>`).join('')}
      <g transform="translate(330 340) scale(1.5)" fill="#1a0e08"><path d="M-30 -40 Q-10 -50 20 -44 L34 -62 Q40 -70 46 -62 L44 -54 L38 -48 L30 -30 L28 0 H23 L22 -28 L-18 -28 L-20 0 H-25 L-27 -30 Q-36 -32 -40 -22 L-44 -24 Q-40 -38 -30 -40 Z"/></g>
      <g transform="translate(480 344) scale(1.5)" fill="#1a0e08"><path d="M-30 -40 Q-10 -50 20 -44 L34 -62 Q40 -70 46 -62 L44 -54 L38 -48 L30 -30 L28 0 H23 L22 -28 L-18 -28 L-20 0 H-25 L-27 -30 Q-36 -32 -40 -22 L-44 -24 Q-40 -38 -30 -40 Z"/></g>
      ${figure(330, 282, 1, '#1a0e08', { dress: true })}${figure(480, 286, 1.05, '#1a0e08', { hat: true })}`
  });

  // 6 — Rouen katedrali ve kapalı fayton
  const rouen = svg({
    sky: ['#4a5a6a', '#7a8a96', '#a8b0b4'],
    vignette: .5, grain: .16,
    body: id => `
      <g fill="#2a2a30"><rect x="280" y="80" width="240" height="220"/><polygon points="270,80 400,20 530,80"/><rect x="300" y="20" width="30" height="80"/><polygon points="300,20 315,-40 330,20"/><rect x="470" y="20" width="30" height="80"/><polygon points="470,20 485,-40 500,20"/>
        <circle cx="400" cy="140" r="34" fill="#4a4a5a"/>${Array.from({ length: 8 }, (_, k) => `<line x1="400" y1="140" x2="${400 + Math.cos(k * .785) * 34}" y2="${140 + Math.sin(k * .785) * 34}" stroke="#2a2a30" stroke-width="2"/>`).join('')}
        <path d="M370 300 V220 Q400 190 430 220 V300 Z" fill="#1a1a20"/></g>
      ${skyline({ y: 300, color: '#1a1a20', seed: 101, lit: .05, minH: 40, maxH: 110, dome: false })}
      <rect y="300" width="800" height="100" fill="#3a3a40"/>
      ${carriage(600, 350, 1.3, '#0a0a0e')}
      <g transform="translate(700 352) scale(1.2)" fill="#0a0a0e"><path d="M-30 -40 Q-10 -50 20 -44 L34 -62 Q40 -70 46 -62 L44 -54 L38 -48 L30 -30 L28 0 H23 L22 -28 L-18 -28 L-20 0 H-25 L-27 -30 Q-36 -32 -40 -22 L-44 -24 Q-40 -38 -30 -40 Z"/></g>
      ${streaks(101, 140, '#c8d0d8', 22, -5, .3)}`
  });

  // 7 — Borçlar ve tefeci Lheureux
  const debt = svg({
    sky: ['#1a1410', '#2a2018', '#1a1410'],
    vignette: .7,
    body: id => `
      ${glow(id, 400, 180, 240, '#ffc070', .4)}
      <rect x="560" y="60" width="180" height="240" fill="#2a1e14"/>${Array.from({ length: 5 }, (_, r) => Array.from({ length: 4 }, (_, c) => `<rect x="${570 + c * 42}" y="${70 + r * 46}" width="34" height="36" fill="${['#a83a6a', '#3a6a8a', '#8a7a3a', '#6a3a8a'][(r + c) % 4]}" opacity=".7"/>`).join('')).join('')}
      <path d="M140 260 H520 L540 280 H120 Z" fill="#4a3020"/><rect x="150" y="280" width="370" height="80" fill="#2a1a10"/>
      ${Array.from({ length: 12 }, (_, i) => `<rect x="${200 + (i * 31) % 260}" y="${236 + (i % 3) * 6}" width="40" height="28" fill="#e8dcc4" transform="rotate(${(i * 23) % 30 - 15} ${220 + (i * 31) % 260} ${250 + (i % 3) * 6})"/>`).join('')}
      ${figure(250, 260, 1.8, '#3a1a2a', { dress: true })}${seated(450, 262, 1.6, '#0a0806', true)}
      <circle cx="380" cy="248" r="10" fill="#d9a83a"/><circle cx="398" cy="252" r="10" fill="#d9a83a"/>`
  });

  // 8 — Son: arsenik şişesi ve yalnız Charles
  const ending = svg({
    sky: ['#0e0e14', '#1a1a22', '#24242c'],
    vignette: .7,
    body: id => `
      <rect x="520" y="70" width="160" height="200" fill="#4a5a7a" opacity=".5"/><line x1="600" y1="70" x2="600" y2="270" stroke="#0e0e14" stroke-width="6"/>
      ${glow(id, 300, 220, 200, '#ffc070', .35)}
      <path d="M160 280 H460 L480 300 H140 Z" fill="#3a2818"/>
      <g transform="translate(260 276)"><path d="M-8 0 L-8 -30 Q-8 -40 -4 -42 L-4 -50 H4 L4 -42 Q8 -40 8 -30 L8 0 Z" fill="#5a8a6a" opacity=".85"/><rect x="-5" y="-56" width="10" height="6" fill="#3a2414"/></g>
      <rect x="320" y="260" width="60" height="16" fill="#e8dcc4"/>
      ${seated(420, 282, 1.8, '#0a0a0e', true)}
      ${Array.from({ length: 6 }, (_, i) => `<circle cx="${200 + i * 50}" cy="360" r="3" fill="#e8d8e0" opacity=".6"/>`).join('')}
      <rect y="320" width="800" height="80" fill="#0a0a0e"/>`
  });

  window.SUMMARIES['madame-bovary'] = {
    pages: [
      {
        title: 'Charles ve Emma',
        image: { svg: farm, caption: 'Normandiya’da elma ağaçları arasında bir çiftlik ve kapıda bekleyen genç kız.' },
        text: [
          'Gustave Flaubert’in romanı, Charles Bovary adında sıradan bir gencin hayatıyla başlar. Charles, okulda sınıf arkadaşlarının alay ettiği, sakar, utangaç ve hayal gücünden yoksun bir çocuktur. Annesinin hırsı sayesinde ikinci sınıf bir doktor olur ve Normandiya’nın küçük kasabası Tostes’ta muayenehane açar. Annesinin ayarladığı, kendisinden yaşça büyük ve hırçın bir dul kadınla evlenir.',
          'Bir gece Charles, bacağını kıran zengin bir çiftçiyi tedavi etmek için Bertaux çiftliğine çağrılır. Orada çiftçinin güzel ve zarif kızı Emma Rouault ile tanışır. Emma, gençliğini bir manastır okulunda geçirmiş, oradaki romanlardan, şiirlerden ve aşk hikâyelerinden büyük bir tutkuyla beslenmiştir. Hayatını, kitaplarda okuduğu büyük aşklar, lüks salonlar ve romantik maceralarla dolu bir rüya gibi hayal eder.',
          'Charles’ın karısı bir süre sonra ölür ve Charles, Emma ile evlenir. Emma, bu evliliğin kendisine romanlarda okuduğu o büyük tutkuyu getireceğini umar. Ama düğünden kısa süre sonra, Charles’ın iyi kalpli ama son derece sıkıcı, hiçbir şeye merak duymayan, sıradan bir adam olduğunu anlar. Charles ise karısına tapar ve onun mutsuzluğunu hiç fark etmez. Flaubert, romanın bütün trajedisini bu yanlış anlaşılmanın üzerine kurar.'
        ]
      },
      {
        title: 'Bir Gece Yarısı Balosu',
        image: { svg: ball, caption: 'Vaubyessard şatosundaki balo: Emma’nın hayatında gördüğü en büyük ihtişam.' },
        text: [
          'Bir gün Charles ve Emma, bir marki tarafından Vaubyessard şatosundaki büyük bir baloya davet edilirler. Emma için bu gece, hayatının en büyülü gecesidir. Altın varaklı salonlar, kristal avizeler, ipek elbiseli kadınlar, dans eden soylular ve sabaha kadar süren müzik, tam da kitaplarda okuduğu dünyayı ona yaşatır. Bir vikontla vals yapar ve kendini bir anlığına başka bir hayatın içinde hisseder.',
          'Ama balo biter ve Emma, sıkıcı Tostes’a ve sıradan kocasının yanına geri döner. Bu tek gece, onun içinde iyileşmeyecek bir yara açar. Haftalarca o geceyi düşünür, şatodan getirdiği bir puro kutusuna bakarak hayaller kurar. Paris’in haritasını alır, parmağıyla sokaklarını takip eder ve oradaki hayatın nasıl olduğunu hayal eder.',
          'Emma’nın sıkıntısı giderek bir hastalığa dönüşür. Uyuyamaz, yemek yiyemez ve sinir krizleri geçirmeye başlar. Charles, karısının bu hâlinin hava değişikliğiyle düzelebileceğini düşünür ve onun iyiliği için Tostes’taki muayenehanesini bırakarak, Rouen’a yakın Yonville-l’Abbaye kasabasına taşınmaya karar verir. Emma bu sırada hamiledir.'
        ]
      },
      {
        title: 'Yonville ve Léon',
        image: { svg: yonville, caption: 'Yonville-l’Abbaye: kilisesi, meydanı ve eczacı Homais’nin dükkânıyla bir taşra kasabası.' },
        text: [
          'Yonville, taşra hayatının bütün sıkıcılığını taşıyan küçük bir kasabadır. Kasabanın en göze batan insanı, eczacı Homais’dir. Homais, kendini çok bilgili, ilerici ve bilimsel düşünen bir adam olarak görür. Her konuda konuşur, gazetelere makaleler yazar ve kilise ile sürekli tartışır. Ama aslında boş ve kendini beğenmiş bir adamdır. Flaubert, Homais karakteriyle taşra burjuvazisinin kibrini ve sığlığını keskin bir ironiyle anlatır.',
          'Emma, Yonville’e geldikleri ilk gece, noterin yanında çalışan genç bir kâtip olan Léon Dupuis ile tanışır. Léon da Emma gibi şiiri, müziği ve romantik hayalleri seven, taşra hayatından sıkılan bir gençtir. İkisi arasında hemen sessiz bir anlaşma, yasak ama dile getirilmemiş bir yakınlık başlar. Ama ikisi de utangaçtır ve duygularını açıkça ifade etmeye cesaret edemezler.',
          'Emma bir kız çocuğu doğurur, ama erkek çocuk istediği için hayal kırıklığına uğrar ve kızı Berthe ile pek ilgilenmez. Léon’a duyduğu bastırılmış aşk, onu bir süreliğine erdemli bir eş ve anne gibi davranmaya iter. Ama bu erdemlilik, içinde büyüyen öfkeyi ve hayal kırıklığını daha da artırır. Sonunda Léon, umutsuz aşkından kurtulmak ve hukuk eğitimine devam etmek için Paris’e gider.'
        ]
      },
      {
        title: 'Tarım Fuarı',
        image: { svg: fair, caption: 'Yonville’deki tarım fuarı: kürsüde konuşmalar, aşağıda inekler, pencerede iki sevgili.' },
        text: [
          'Léon gittikten sonra Emma’nın hayatı yine boşluğa düşer. Bu sırada kasabaya yakın bir malikânenin sahibi olan Rodolphe Boulanger ortaya çıkar. Rodolphe, otuz dört yaşında, zengin, yakışıklı ve kadınları baştan çıkarmakta usta bir adamdır. Emma’yı ilk gördüğünde, onun sıkıntısını ve aşka olan açlığını hemen fark eder ve onu baştan çıkarmaya karar verir.',
          'Romanın en ünlü sahnelerinden biri, Yonville’de düzenlenen tarım fuarında geçer. Belediye binasının penceresinde oturan Rodolphe, Emma’ya romantik aşk sözleri fısıldar. Aynı anda aşağıda, kürsüde bir yetkili tarımın önemine dair sıkıcı bir konuşma yapar ve en iyi gübre, en iyi domuz ödüllerini dağıtır. Flaubert, bu iki konuşmayı iç içe geçirerek, Rodolphe’un yüce aşk sözlerini de aslında aynı derecede boş ve sahte olarak gösterir.',
          'Emma ise bu sözlerin sahteliğini görmez. Rodolphe’un ona sunduğu, okuduğu romanlardaki büyük aşkın ta kendisidir. Birkaç hafta sonra Rodolphe, Emma’yı ormanda bir at gezintisine davet eder ve Emma ona teslim olur. Eve döndüğünde aynaya bakar ve kendini her zamankinden daha güzel bulur. Sonunda kitaplardaki kadınlar gibi bir sevgilisi olduğunu düşünerek mutluluktan kendinden geçer.'
        ]
      },
      {
        title: 'Kaçış Hayali',
        image: { svg: forest, caption: 'Sonbahar ormanında at süren iki sevgili.' },
        text: [
          'Emma ve Rodolphe’un ilişkisi, gizli buluşmalar, aşk mektupları ve tutkulu sözlerle devam eder. Emma, giderek pervasızlaşır. Sabahın erken saatlerinde, kimse görmeden Rodolphe’un malikânesine gider ve gece yarısı bahçede onunla buluşur. Rodolphe ise zamanla bu tutkudan sıkılmaya başlar. Onun için Emma, diğer sevgililerinden farksız bir kadındır.',
          'Bu arada Homais, Charles’ı yeni bir ameliyat yöntemini denemeye ikna eder. Charles, kasabanın hanında çalışan, ayağı sakat Hippolyte’i ameliyat eder. Emma, kocasının ünlü bir doktor olacağını ve hayatlarının değişeceğini umarak bu ameliyatı destekler. Ama ameliyat felaketle sonuçlanır. Hippolyte’in bacağında kangren başlar ve bacağı kesilmek zorunda kalır. Emma, kocasının beceriksizliği karşısında ondan her zamankinden daha çok nefret eder.',
          'Emma, Rodolphe’a birlikte kaçmayı teklif eder. Hayalinde, kızı Berthe’yi de alarak İtalya’ya, deniz kenarındaki beyaz evlere, yeni bir hayata kaçacaklardır. Rodolphe kabul eder gibi görünür. Ama kaçış gününden bir gün önce, Emma’ya bir veda mektubu yazar. Mektubun dokunaklı görünmesi için üzerine bir damla su damlatır ve onu bir kayısı sepetinin altına saklayarak gönderir. Emma, mektubu okuduğunda yıkılır ve haftalarca ölümle pençeleşir.'
        ]
      },
      {
        title: 'Rouen ve Léon’la Yeniden Buluşma',
        image: { svg: rouen, caption: 'Rouen Katedrali ve şehrin sokaklarında saatlerce dolaşan perdeleri kapalı fayton.' },
        text: [
          'Emma uzun bir hastalığın ardından iyileşir ve bir süreliğine dine yönelir. Charles, onu oyalamak için Rouen’daki operaya götürür. Orada, hukuk eğitimini tamamlamış ve Rouen’da çalışmaya başlamış olan Léon ile karşılaşırlar. Léon artık eskisi gibi utangaç bir genç değildir. Paris’te yaşadıkları ona daha cesur ve deneyimli bir adam olmayı öğretmiştir.',
          'Charles, safça Emma’nın bir gün daha Rouen’da kalıp operayı tekrar izlemesini önerir. Léon, Emma’ya Rouen Katedrali’nde buluşmayı teklif eder. Ertesi gün katedralde buluştuklarında, Léon onu kapalı bir faytona bindirir. Faytoncu, perdeleri kapalı arabanın içindekilerin ne istediğini anlamadan, onu saatlerce Rouen’un sokaklarında gezdirir. Flaubert, bu sahneyi açıkça bir şey anlatmadan, sadece arabanın geçtiği sokakların adlarını sıralayarak yazar.',
          'Emma, kocasına piyano dersleri aldığını söyleyerek her hafta Rouen’a gitmeye başlar. Léon ile bir otel odasında buluşurlar. Emma, Léon’a karşı giderek daha baskın, daha talepkâr ve daha tutkulu hâle gelir. Ama bu ilişki de zamanla tıpkı evliliği gibi sıradanlaşır. Emma, zinada bile evliliğin bütün sıkıcılığını bulduğunu fark eder.'
        ]
      },
      {
        title: 'Borçların Ağı',
        image: { svg: debt, caption: 'Masanın üzerinde biriken senetler ve karşısında oturan kurnaz tüccar.' },
        text: [
          'Emma’nın asıl felaketi, yalnızca aşkta değil, parada başlar. Kasabanın kurnaz kumaş tüccarı ve tefecisi Lheureux, Emma’nın lüks eşyalara olan zaafını en başından fark etmiştir. Ona sürekli yeni kumaşlar, şallar, mobilyalar ve hediyeler satar. Emma, bunların parasını ödeyemediğinde, Lheureux ona kolayca senet imzalatır. Emma, Charles’tan aldığı bir vekâletname sayesinde ailenin bütün parası üzerinde söz sahibi olur.',
          'Emma, Léon’a pahalı hediyeler alır, Rouen’daki buluşmaların masraflarını öder ve kendi lüks zevklerini tatmin etmek için hiç durmadan harcar. Lheureux’ye olan borcu, yüksek faizlerle birlikte giderek büyür. Emma, eski senetleri ödemek için yenilerini imzalar ve borç ağı bir girdap gibi onu içine çeker. Charles ise hiçbir şeyden habersizdir.',
          'Sonunda Lheureux, borçların ödenmesini ister ve mahkemeye başvurur. Bovary ailesinin bütün eşyalarına haciz kararı çıkar. Emma, çaresizlik içinde herkesten yardım ister. Léon’a gider, ama Léon ona yardım edemez. Kasabanın noterine gider, noter ona yardım etmek karşılığında aşağılayıcı bir teklifte bulunur. Son olarak Rodolphe’a gider, ama Rodolphe ona parası olmadığını söyler.'
        ]
      },
      {
        title: 'Bir Hayalin Sonu',
        image: { svg: ending, caption: 'Karanlık bir odada, masanın üzerinde küçük bir şişe ve yalnız kalan Charles.' },
        text: [
          'Bütün kapılar yüzüne kapanan Emma, umutsuzluk içinde Homais’nin eczanesine gider. Eczanenin genç çırağı Justin’den, arsenik saklanan dolabın anahtarını alır ve avucuna doldurduğu bir miktar arseniği yutar. Eve döner ve yatağına uzanır. Ölümün romanlardaki gibi sessiz ve güzel olacağını düşünmüştür, ama günlerce korkunç acılar içinde kıvranır.',
          'Charles, karısının yatağının başında çaresizce ağlar. Emma, son anlarında kocasının iyi kalbini fark eder ve ona bir anlığına şefkatle bakar. Ölmeden hemen önce, pencerenin altından geçen kör bir dilencinin, onun gençlik hayallerini hatırlatan bir aşk şarkısını söylediğini duyar ve korkunç bir kahkahayla can verir.',
          'Charles, Emma’nın ölümünden sonra onun eşyalarının arasında Rodolphe’un ve Léon’un aşk mektuplarını bulur. Ama yine de karısına olan sevgisini kaybetmez. Borçlar yüzünden her şeyini kaybeder ve bir gün bahçede, elinde Emma’nın saçından bir tutamla ölü bulunur. Küçük Berthe yoksulluk içinde bir pamuk fabrikasında çalışmaya gönderilir. Eczacı Homais ise şeref nişanı alır. Flaubert, Madame Bovary ile hayal ile gerçek arasındaki uçurumu, taşra hayatının boğuculuğunu ve romantik hayallerin yıkıcı gücünü anlatan, modern romanın en önemli eserlerinden birini yazmıştır.'
        ]
      }
    ]
  };
})();
