// Notre Dame’ın Kamburu — Victor Hugo (1831)
// Sahneler data/scenes.js yardımcılarıyla çizilir; ileride image.src ile gerçek çizimlerle değiştirilebilir.
(() => {
  const { svg, glow, skyline, figure, seated, streaks, dots } = window.Scene;

  // Notre Dame cephesi: iki kule ve gül pencere
  const cathedral = (x, y, s, c, rose = '#a83a6a') => `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}">
    <rect x="-150" y="-200" width="300" height="200"/><rect x="-150" y="-290" width="90" height="100"/><rect x="60" y="-290" width="90" height="100"/>
    ${[-150, -130, -110, -90, -70, 60, 80, 100, 120, 140].map(dx => `<rect x="${dx}" y="-300" width="10" height="12"/>`).join('')}
    <circle cx="0" cy="-130" r="40" fill="${rose}" opacity=".85"/>${Array.from({ length: 12 }, (_, k) => `<line x1="0" y1="-130" x2="${Math.cos(k * .5236) * 40}" y2="${-130 + Math.sin(k * .5236) * 40}" stroke="${c}" stroke-width="3"/>`).join('')}
    ${[-90, 0, 90].map(dx => `<path d="M${dx - 26} 0 V-50 Q${dx} -86 ${dx + 26} -50 V0 Z" fill="#0a0a0a" opacity=".6"/>`).join('')}
    ${Array.from({ length: 14 }, (_, k) => `<rect x="${-140 + k * 20}" y="-196" width="10" height="26" fill="#000" opacity=".3"/>`).join('')}</g>`;
  const bell = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}"><path d="M-40 0 Q-40 -60 0 -70 Q40 -60 40 0 L50 12 H-50 Z"/><rect x="-8" y="-84" width="16" height="16"/><circle cy="18" r="8"/></g>`;
  const hunch = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}"><path d="M-16 -44 Q-24 -70 0 -72 Q20 -68 18 -44 L20 -10 H-18 Z"/><circle cx="-6" cy="-62" r="9"/><ellipse cx="6" cy="-60" rx="12" ry="10"/><rect x="-14" y="-12" width="9" height="12"/><rect x="5" y="-12" width="9" height="12"/><path d="M-18 -40 L-34 -14 M18 -40 L34 -18" stroke="${c}" stroke-width="7"/></g>`;

  // 1 — Soytarılar Bayramı
  const fools = svg({
    sky: ['#3a2a3a', '#7a4a4a', '#c8805a'],
    vignette: .5,
    body: id => `
      ${glow(id, 400, 140, 260, '#ffd08a', .45)}
      ${cathedral(400, 300, .9, '#3a3038')}
      <rect y="300" width="800" height="100" fill="#2a1e1a"/>
      ${Array.from({ length: 3 }, (_, r) => Array.from({ length: 16 }, (_, i) => figure(20 + i * 50 + r * 14, 340 + r * 22, 1 + r * .1, '#140c0a', { hat: (i + r) % 3 === 0 })).join('')).join('')}
      <g transform="translate(400 300)">${hunch(0, 0, 1.6, '#4a2a1a')}<path d="M-20 -122 L-14 -136 L-4 -126 L6 -138 L14 -124 L22 -134 L20 -116 Z" fill="#d9a83a"/></g>
      ${Array.from({ length: 20 }, (_, i) => `<rect x="${(i * 41) % 800}" y="${60 + (i * 23) % 150}" width="6" height="10" fill="${['#e85a5a', '#f4d04a', '#5ad8ff'][i % 3]}" transform="rotate(${i * 23} ${(i * 41) % 800} ${60 + (i * 23) % 150})"/>`).join('')}`
  });

  // 2 — Esmeralda ve keçisi Djali
  const esmeralda = svg({
    sky: ['#2a1a2a', '#5a2a3a', '#a84a3a'],
    vignette: .5,
    body: id => `
      ${glow(id, 400, 280, 220, '#ff9a4a', .55)}
      ${skyline({ y: 280, color: '#1a1018', seed: 181, lit: .2, light: '#ffc070', minH: 80, maxH: 170, dome: false })}
      <rect y="280" width="800" height="120" fill="#2a1814"/>
      <path d="M380 330 l20 -40 l20 40 z" fill="#ffb04a"/>${glow(id, 400, 310, 70, '#ffd04a', .8)}
      <g transform="translate(470 330) rotate(-6)"><path d="M-14 -50 Q0 -56 14 -50 L40 0 H-40 Z" fill="#c82a3a"/><circle cy="-62" r="9" fill="#3a1a14"/><path d="M-14 -46 Q-34 -66 -24 -86" stroke="#3a1a14" stroke-width="4" fill="none"/><path d="M14 -46 Q34 -60 40 -40" stroke="#3a1a14" stroke-width="4" fill="none"/></g>
      <g transform="translate(560 340)" fill="#f4ecd8"><path d="M-18 -16 H10 L16 -26 L22 -24 L20 -16 L14 -10 V0 H10 V-6 H-12 V0 H-16 V-8 Z"/><path d="M16 -26 q-4 -10 2 -14 M20 -24 q4 -10 10 -10" stroke="#f4ecd8" stroke-width="2" fill="none"/></g>
      ${Array.from({ length: 12 }, (_, i) => figure(60 + i * 26 + (i > 5 ? 380 : 0), 360, 1.2, '#0a0606', { hat: i % 3 === 0 })).join('')}`
  });

  // 3 — Frollo’nun hücresi
  const frollo = svg({
    sky: ['#0e0a08', '#1a140e', '#0e0a08'],
    vignette: .8,
    body: id => `
      ${glow(id, 300, 220, 200, '#ffb050', .45)}
      <rect x="520" y="80" width="80" height="140" fill="#2a3a5a"/><path d="M520 80 Q560 40 600 80 Z" fill="#2a3a5a"/>
      ${dots(191, 20, '#fff', 1, .7, 90, 210).replace(/cx="(\d+)"/g, (m, v) => `cx="${524 + (+v % 72)}"`)}
      <path d="M140 260 H460 L480 280 H120 Z" fill="#3a2414"/>
      ${Array.from({ length: 6 }, (_, i) => `<rect x="${170 + i * 44}" y="${240 - (i % 2) * 8}" width="34" height="${20 + (i % 2) * 8}" fill="${['#6a2a1a', '#3a4a2a', '#5a4a2a'][i % 3]}"/>`).join('')}
      <g transform="translate(420 236)"><path d="M-8 0 Q-12 -20 0 -24 Q12 -20 8 0 Z" fill="#7aa86a" opacity=".7"/></g>
      ${figure(260, 300, 2, '#000', { dress: true })}<path d="M248 166 q12 -14 24 0" fill="#000"/>
      <rect y="300" width="800" height="100" fill="#0a0604"/>`
  });

  // 4 — Teşhir direğindeki Quasimodo ve su veren Esmeralda
  const pillory = svg({
    sky: ['#c8a060', '#e8c890', '#f4e0b8'],
    vignette: .5, grain: .16,
    body: id => `
      ${glow(id, 640, 70, 160, '#fffbe8', .8)}
      ${cathedral(620, 300, .6, '#8a7a6a', '#6a3a5a')}
      <rect y="300" width="800" height="100" fill="#a8885a"/>
      <g transform="translate(320 300)"><rect x="-60" y="-80" width="120" height="80" fill="#5a3a2a"/><rect x="-10" y="-200" width="20" height="120" fill="#3a2414"/><rect x="-50" y="-170" width="100" height="16" fill="#3a2414"/></g>
      ${hunch(320, 220, 1.3, '#3a2414')}
      <g transform="translate(400 220) rotate(-8)"><path d="M-14 -50 Q0 -56 14 -50 L34 0 H-34 Z" fill="#c82a3a"/><circle cy="-62" r="9" fill="#3a1a14"/></g>
      <path d="M386 170 l-30 6" stroke="#c8a888" stroke-width="4"/><rect x="346" y="168" width="12" height="16" fill="#8a6a4a"/>
      ${Array.from({ length: 16 }, (_, i) => figure(30 + i * 48 + (i > 7 ? 120 : 0), 370, 1.2, '#2a1a10', { hat: i % 3 === 0 })).join('')}`
  });

  // 5 — Febüs ve hançer
  const phoebus = svg({
    sky: ['#0a0810', '#14101c', '#0a0810'],
    vignette: .8,
    body: id => `
      ${glow(id, 400, 200, 200, '#ffb070', .4)}
      <rect x="300" y="240" width="200" height="40" fill="#5a3a2a"/>
      <g transform="translate(360 280)"><path d="M-14 -50 Q0 -56 14 -50 L34 0 H-34 Z" fill="#c82a3a"/><circle cy="-62" r="9" fill="#3a1a14"/></g>
      ${figure(440, 280, 1.9, '#6a1a1a', { hat: true })}<rect x="410" y="200" width="60" height="6" fill="#d9a83a"/>
      ${figure(620, 300, 2.2, '#000', { dress: true })}<line x1="604" y1="210" x2="560" y2="200" stroke="#c8c8c8" stroke-width="4"/>${glow(id, 558, 200, 20, '#ffffff', .8)}
      <rect y="300" width="800" height="100" fill="#050408"/>`
  });

  // 6 — Kurtarma: “Sığınak!”
  const sanctuary = svg({
    sky: ['#2a2a30', '#5a5a60', '#8a8a8a'],
    vignette: .55, grain: .18,
    body: id => `
      ${cathedral(400, 360, 1.15, '#4a4248', '#8a3a5a')}
      <path d="M400 110 Q300 160 300 360" stroke="#2a2a2a" stroke-width="3" fill="none"/>
      ${hunch(330, 220, 1.4, '#1a1410')}
      <g transform="translate(350 224) rotate(30)"><path d="M-10 -36 Q0 -40 10 -36 L22 0 H-22 Z" fill="#e8e0d8"/><circle cy="-44" r="7" fill="#3a1a14"/></g>
      ${Array.from({ length: 14 }, (_, i) => figure(30 + i * 56, 400, 1.3, '#0a0a0a', { hat: i % 3 === 0 })).join('')}`
  });

  // 7 — Çan kulesinde
  const bells = svg({
    sky: ['#4a5a7a', '#8a9ab0', '#c8c8c8'],
    vignette: .5, grain: .16,
    body: id => `
      ${skyline({ y: 360, color: '#5a5a68', seed: 201, lit: 0, minH: 30, maxH: 100, dome: false })}
      <rect x="0" y="0" width="140" height="400" fill="#2a2630"/><rect x="660" y="0" width="140" height="400" fill="#2a2630"/>
      <rect x="140" y="0" width="520" height="40" fill="#2a2630"/>
      ${bell(300, 160, 1.6, '#8a6a2a')}${bell(520, 180, 1.2, '#7a5a2a')}
      <line x1="300" y1="40" x2="300" y2="64" stroke="#3a2a1a" stroke-width="6"/><line x1="520" y1="40" x2="520" y2="86" stroke="#3a2a1a" stroke-width="6"/>
      ${hunch(400, 300, 1.8, '#1a1410')}<line x1="380" y1="230" x2="320" y2="170" stroke="#5a4a3a" stroke-width="3"/>
      <rect x="140" y="300" width="520" height="16" fill="#2a2630"/>
      ${Array.from({ length: 6 }, (_, i) => `<path d="M${240 + i * 50} ${120 - (i % 2) * 10} q10 -10 20 0" stroke="#e8e0d0" stroke-width="2" fill="none" opacity=".6"/>`).join('')}`
  });

  // 8 — Mahzende iki iskelet
  const vault = svg({
    sky: ['#0a0a0c', '#141416', '#0a0a0c'],
    vignette: .85, grain: .25,
    body: id => `
      <path d="M100 400 V140 Q400 -20 700 140 V400 Z" fill="#1e1c1e"/>
      <path d="M160 400 V170 Q400 40 640 170 V400 Z" fill="#0e0d0e"/>
      ${glow(id, 400, 80, 120, '#c8c8d8', .3)}<rect x="384" y="70" width="32" height="12" fill="#6a6a72" opacity=".5"/>
      <polygon points="384,82 416,82 470,400 330,400" fill="#c8c8d8" opacity=".05"/>
      <g transform="translate(400 340)" stroke="#d8d0c0" stroke-width="3" fill="none" opacity=".75">
        <circle cx="-40" cy="-40" r="10"/><path d="M-40 -30 V0 M-52 -20 H-28 M-40 0 L-50 20 M-40 0 L-30 20"/>
        <circle cx="34" cy="-36" r="10"/><path d="M34 -26 Q40 -10 30 4 M22 -16 L-34 -20 M30 4 L22 22 M30 4 L42 20"/>
      </g>
      ${dots(211, 30, '#e8e0d0', 1, .4, 200, 380)}`
  });

  window.SUMMARIES['notre-dame-in-kamburu'] = {
    pages: [
      {
        title: 'Soytarılar Bayramı',
        image: { svg: fools, caption: 'Paris, 1482: Notre Dame’ın önünde “soytarıların papası” seçilen kambur zangoç.' },
        text: [
          'Victor Hugo’nun romanı, 6 Ocak 1482’de, ortaçağ Paris’inde, Soytarılar Bayramı gününde başlar. Bu bayramda halk, bütün kuralların bir günlüğüne tersine döndüğü çılgın bir eğlence düzenler. Adalet Sarayı’nda, genç şair Pierre Gringoire’ın yazdığı bir oyun sahnelenmektedir, ama kalabalık sıkılır ve onun yerine “soytarıların papası”nı seçmek için bir yarışma başlatır. Yarışmayı kazanan, en çirkin yüz ifadesini yapan kişi olacaktır.',
          'Yarışmanın galibi hiç yüz buruşturmak zorunda kalmaz. Bu kişi, Notre Dame Katedrali’nin kambur, tek gözlü, yüzü biçimsiz zangocu Quasimodo’dur. Quasimodo, yıllarca katedralin devasa çanlarını çaldığı için sağır olmuştur. Halk onu bir kral gibi giydirir, omuzlarına alır ve sokaklarda dolaştırır. Quasimodo, hayatında ilk kez insanların ilgisini çekmekten belli belirsiz bir mutluluk duyar.',
          'Ama bu eğlence, siyah cüppeli, sert yüzlü bir adamın ortaya çıkmasıyla birden sona erer. Bu adam, Notre Dame’ın başdiyakozu Claude Frollo’dur. Frollo, Quasimodo’yu yıllar önce bebekken katedralin kapısında bulmuş, onu evlat edinmiş ve büyütmüştür. Quasimodo, Frollo’ya bir köpek gibi bağlıdır. Frollo’nun tek bir işaretiyle, başındaki sahte tacı çıkarır ve onun peşinden itaatkâr bir şekilde gider.'
        ]
      },
      {
        title: 'Esmeralda',
        image: { svg: esmeralda, caption: 'Ateşin başında dans eden çingene kızı ve altın boynuzlu keçisi Djali.' },
        text: [
          'Aynı gün, Paris’in Grève Meydanı’nda, bir ateşin etrafında güzel bir çingene kızı dans etmektedir. Adı Esmeralda’dır. On altı yaşındadır, son derece güzeldir ve keçisi Djali ile birlikte gösteriler yaparak geçimini sağlar. Djali, harflerle kelimeler yazabilen, takvimi gösterebilen akıllı bir keçidir. Halk, Esmeralda’ya hayranlıkla bakar.',
          'Ama Esmeralda’yı izleyen kalabalığın içinde, onu bambaşka gözlerle izleyen iki kişi vardır. Biri Claude Frollo’dur. Hayatını bilime, simyaya ve dine adamış olan bu soğuk adam, Esmeralda’yı gördüğü anda içinde karanlık ve yasak bir tutkunun uyandığını hisseder. Bu tutkuya engel olamaz, ama aynı zamanda bundan nefret eder ve Esmeralda’yı bir cadı olarak görmeye başlar.',
          'O gece, Frollo, Quasimodo’ya Esmeralda’yı kaçırmasını emreder. Ama tam Quasimodo kızı yakalamışken, kralın okçularından oluşan bir devriye gelir ve Esmeralda’yı kurtarır. Devriyenin başında, yakışıklı ve parlak üniformalı Yüzbaşı Febüs de Châteaupers vardır. Esmeralda, kendisini kurtaran bu adama hemen âşık olur. Quasimodo ise yakalanır. Frollo ise karanlıkta kaybolur.'
        ]
      },
      {
        title: 'Mucizeler Avlusu',
        image: { svg: frollo, caption: 'Başdiyakoz Frollo’nun kitaplar ve simya şişeleriyle dolu karanlık hücresi.' },
        text: [
          'Aynı gece şair Gringoire, kaybolduğu Paris sokaklarında, dilencilerin, hırsızların ve çingenelerin yaşadığı gizli mahalleye, Mucizeler Avlusu’na düşer. Burada gündüzleri kör ya da sakat gibi görünen dilenciler, gece mucizevi bir şekilde iyileşir. Avlunun kralı Clopin, Gringoire’ı casus sanarak asmak ister. Ancak oradaki geleneğe göre, bir kadın onunla evlenmeyi kabul ederse hayatı bağışlanacaktır.',
          'Esmeralda, Gringoire’a acır ve sadece onu kurtarmak için onunla evlenmeyi kabul eder. Bir testi kırılarak, dört yıl sürecek bir evlilik yapılır. Ama Esmeralda, Gringoire’a dokunmasına bile izin vermez ve onun sadece kardeşi olacağını söyler. Esmeralda’nın kalbi, Febüs’e aittir.',
          'Frollo ise katedralin kulesindeki gizli hücresinde, simya ve büyü kitaplarının arasında giderek bir saplantıya kapılır. Bir zamanlar son derece bilgili ve dindar olan bu adam, Esmeralda’ya karşı duyduğu tutku yüzünden ruhunu kaybettiğini hisseder. Hugo, Frollo karakteriyle, bastırılmış duyguların ve katı dogmaların bir insanı nasıl bir canavara dönüştürebileceğini anlatır.'
        ]
      },
      {
        title: 'Bir Yudum Su',
        image: { svg: pillory, caption: 'Teşhir direğinde kırbaçlanan Quasimodo ve ona su veren Esmeralda.' },
        text: [
          'Quasimodo, Esmeralda’yı kaçırmaya çalıştığı için yargılanır. Sağır olan Quasimodo, sağır bir yargıç tarafından sorgulanır. İkisi de birbirini duyamaz ve duruşma gülünç bir oyuna dönüşür. Sonunda Quasimodo, Grève Meydanı’ndaki teşhir direğine bağlanarak halkın önünde kırbaçlanmaya mahkûm edilir.',
          'Kırbaçlama sırasında halk, Quasimodo’ya taşlar, çürük sebzeler ve hakaretler yağdırır. Saatlerce güneşin altında kalan Quasimodo, susuzluktan kıvranarak su ister. Ama kimse ona yardım etmez, herkes güler. Frollo da meydandan geçer, ama evlatlığına bakmadan yoluna devam eder. Tam o sırada, kalabalığı yararak Esmeralda gelir.',
          'Esmeralda, kendisini kaçırmaya çalışan bu adama hiçbir şey söylemeden, matarasındaki suyu nazikçe Quasimodo’nun dudaklarına uzatır. Quasimodo’nun tek gözünden bir damla yaş süzülür. Hayatında ilk kez biri ona merhamet göstermiştir. O andan itibaren Quasimodo, Esmeralda’ya bütün kalbiyle, saf ve karşılıksız bir sevgiyle bağlanır.'
        ]
      },
      {
        title: 'Hançer',
        image: { svg: phoebus, caption: 'Karanlık bir odada iki sevgili ve gölgelerin arasından uzanan bir hançer.' },
        text: [
          'Febüs, aslında zengin ve soylu bir kız olan Fleur-de-Lys ile nişanlıdır. Ama Esmeralda’nın güzelliğinden etkilenir ve onunla gizlice buluşmayı ayarlar. Esmeralda için bu buluşma, büyük aşkının gerçekleşmesidir. Febüs ise onu yalnızca geçici bir eğlence olarak görür.',
          'Frollo, bu buluşmayı öğrenir ve kıskançlıktan çılgına döner. Febüs’ü takip eder ve buluşmanın yapılacağı odanın yanındaki bir köşede saklanır. Febüs, Esmeralda’yı kollarına aldığı anda Frollo, karanlıktan çıkarak onu hançerle sırtından bıçaklar ve pencereden kaçar. Esmeralda, kendinden geçer.',
          'Esmeralda, Febüs’ü öldürmeye teşebbüs etmek ve büyücülükle suçlanır. Keçisi Djali’nin yaptığı numaralar bile büyücülük kanıtı olarak gösterilir. İşkence altında, yapmadığı suçları itiraf etmek zorunda kalır ve idama mahkûm edilir. Febüs ise yarasından iyileşmiştir, ama itibarını korumak için mahkemede sessiz kalır. Frollo, idamdan önceki gece Esmeralda’nın hücresine gelir ve ona, eğer kendisini severse onu kurtaracağını söyler. Esmeralda, onu dehşetle reddeder.'
        ]
      },
      {
        title: 'Sığınak!',
        image: { svg: sanctuary, caption: 'Katedralin cephesinden iple aşağı inerek Esmeralda’yı kurtaran Quasimodo.' },
        text: [
          'İdam günü Esmeralda, Notre Dame’ın önüne, kefaret dilemesi için getirilir. Tam o sırada, balkonda Febüs’ü nişanlısıyla birlikte görür ve kalbi kırılır. Ama birden, katedralin galerisinden bir iple aşağı inen Quasimodo, askerlerin arasına dalar, Esmeralda’yı kucağına alır ve onu katedralin içine taşır. Kollarını havaya kaldırarak bağırır: Sığınak!',
          'Ortaçağ yasalarına göre, kilisenin içine sığınan bir kişiye dokunulamaz. Halk, Quasimodo’nun bu cesur hareketini büyük bir coşkuyla alkışlar. Quasimodo, Esmeralda’yı katedralin kulesindeki küçük bir odaya yerleştirir. Ona yiyecek, giysi ve yatacak bir yer verir. Ama onu korkutmamak için, yüzünü göstermemeye ve sadece uzaktan onu izlemeye özen gösterir.',
          'Esmeralda, başta bu çirkin adamdan korkar. Ama zamanla onun iyi kalbini, nazikliğini ve sessiz fedakârlığını fark eder. Quasimodo, Esmeralda’ya, eğer onu görmek isterse çalabileceği bir düdük verir. İkisi arasında, sözlerin çoğu zaman yetmediği ama son derece dokunaklı bir dostluk başlar. Hugo, bu bölümde gerçek güzelliğin dış görünüşte değil, ruhta olduğunu anlatır.'
        ]
      },
      {
        title: 'Katedralin Kuşatılması',
        image: { svg: bells, caption: 'Çan kulesinde, sevdiği çanlarla yalnız kalan Quasimodo.' },
        text: [
          'Parlement, sığınak hakkını kaldırarak Esmeralda’nın yeniden yakalanmasına karar verir. Bunu öğrenen Mucizeler Avlusu’nun dilencileri ve hırsızları, Clopin’in önderliğinde, Esmeralda’yı kurtarmak için gece yarısı katedrale saldırır. Ama Quasimodo, onların Esmeralda’yı öldürmeye geldiğini sanır. Tek başına, kulelerin tepesinden taşlar, kalaslar ve erimiş kurşun dökerek katedrali savunur.',
          'Bu karmaşanın ortasında Frollo, Gringoire ile birlikte Esmeralda’yı gizlice katedralden kaçırır. Gringoire, Esmeralda yerine keçisi Djali’yi kurtarmayı tercih eder. Frollo, Esmeralda’yı Grève Meydanı’na, darağacının önüne götürür ve ona son bir kez seçim yapmasını söyler: Ya onu sevecek ya da darağacına çıkacaktır. Esmeralda, darağacını seçer.',
          'Frollo, Esmeralda’yı, yıllardır bir hücrede yaşayan ve çingenelerden nefret eden yaşlı bir kadının yanına bırakır. Bu kadın, yıllar önce bebeği çingeneler tarafından kaçırılan Paquette’tir. Kadın, Esmeralda’nın boynundaki küçük ayakkabıyı görünce onun kayıp kızı olduğunu anlar. Ama mutlu kavuşma çok kısa sürer. Askerler gelir, Esmeralda’yı annesinin kollarından koparır ve onu darağacına götürür.'
        ]
      },
      {
        title: 'Mahzende Bir Kucaklaşma',
        image: { svg: vault, caption: 'Montfaucon mahzeninde yıllar sonra bulunan, birbirine sarılmış iki iskelet.' },
        text: [
          'Quasimodo, Esmeralda’yı kulede bulamayınca onu deliler gibi arar. Sonunda Frollo’yu katedralin kulesinde, aşağıdaki meydanı izlerken bulur. Frollo’nun baktığı yöne bakar ve Esmeralda’nın darağacında asıldığını görür. Frollo ise bu manzara karşısında şeytani bir kahkaha atar.',
          'Bu kahkaha, Quasimodo’nun içindeki bütün sadakati yok eder. Hayatı boyunca babası gibi sevdiği ve itaat ettiği bu adamı, kulenin tepesinden aşağı iter. Frollo, katedralin olukları arasında bir süre asılı kalır ve sonra meydanın taşlarına düşerek ölür. Quasimodo, Esmeralda’nın ve Frollo’nun cesetlerine bakarak ağlar: İşte sevdiğim her şey.',
          'Quasimodo, o günden sonra ortadan kaybolur. Yıllar sonra, idam edilenlerin cesetlerinin atıldığı Montfaucon mahzeninde iki iskelet bulunur. Biri bir kadının iskeletidir. Diğeri ise eğri bir omurgaya sahip, ona sıkıca sarılmış bir adamın iskeletidir. İki iskeleti birbirinden ayırmaya çalıştıklarında, adamın iskeleti toz olur. Notre Dame’ın Kamburu, dış görünüşün ardındaki güzelliği, toplumun önyargılarını ve karşılıksız sevginin gücünü anlatan, Hugo’nun en etkileyici romanlarından biridir.'
        ]
      }
    ]
  };
})();
