// Hayvan Çiftliği — George Orwell (1945)
// Sahneler data/scenes.js yardımcılarıyla çizilir; ileride image.src ile gerçek çizimlerle değiştirilebilir.
(() => {
  const { svg, glow, skyline, figure, seated, streaks, dots } = window.Scene;

  // Hayvan siluetleri
  const pig = (x, y, s, c, upright = false) => upright
    ? `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}"><ellipse cx="0" cy="-34" rx="16" ry="24"/><circle cx="0" cy="-66" r="13"/><ellipse cx="0" cy="-62" rx="6" ry="4" fill="#e8a8a8"/><path d="M-10 -78 l-4 -8 l8 4 z M10 -78 l4 -8 l-8 4 z"/><rect x="-10" y="-12" width="6" height="12"/><rect x="4" y="-12" width="6" height="12"/></g>`
    : `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}"><ellipse cx="0" cy="-16" rx="26" ry="15"/><circle cx="24" cy="-20" r="10"/><ellipse cx="33" cy="-18" rx="4" ry="3.4" fill="#e8a8a8"/><path d="M20 -30 l2 -8 l5 6 z"/><rect x="-18" y="-6" width="5" height="6"/><rect x="12" y="-6" width="5" height="6"/><path d="M-26 -18 q-8 -4 -6 4" stroke="${c}" stroke-width="2" fill="none"/></g>`;
  const horse = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}">
    <path d="M-30 -40 Q-10 -50 20 -44 L34 -62 Q40 -70 46 -62 L44 -54 L38 -48 L30 -30 L28 0 H23 L22 -28 L-18 -28 L-20 0 H-25 L-27 -30 Q-36 -32 -40 -22 L-44 -24 Q-40 -38 -30 -40 Z"/></g>`;
  const sheep = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}"><ellipse cx="0" cy="-14" rx="16" ry="10"/><ellipse cx="16" cy="-18" rx="6" ry="5"/><rect x="-10" y="-6" width="3" height="6"/><rect x="7" y="-6" width="3" height="6"/></g>`;
  const dog = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}"><path d="M-22 -20 H14 L22 -32 L30 -30 L28 -22 L20 -14 V0 H15 V-10 H-14 V0 H-19 V-12 L-28 -22 Z"/><path d="M22 -32 l2 -8 l4 6 z"/></g>`;
  const barn = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-90" y="-90" width="180" height="90" fill="${c}"/><polygon points="-104,-90 0,-150 104,-90" fill="${c}"/><rect x="-30" y="-60" width="60" height="60" fill="#2a1408"/><path d="M-30 -60 L30 0 M30 -60 L-30 0" stroke="${c}" stroke-width="4"/></g>`;

  // 1 — Gece ahırda Koca Reis’in rüyası
  const major = svg({
    sky: ['#0a0806', '#1a120a', '#2a1a0e'],
    vignette: .7,
    body: id => `
      ${glow(id, 400, 120, 280, '#ffb050', .5)}
      <path d="M392 70 h16 l-4 -20 h-8 z" fill="#3a2414"/><circle cx="400" cy="80" r="10" fill="#fff0c0"/>
      <g stroke="#2a1a0e" stroke-width="12">${[0, 200, 600, 800].map(x => `<line x1="${x}" y1="0" x2="${x}" y2="400"/>`).join('')}<line x1="0" y1="40" x2="800" y2="40"/></g>
      <rect x="300" y="200" width="200" height="40" fill="#8a6a3a"/>${Array.from({ length: 30 }, (_, i) => `<line x1="${300 + (i * 7) % 200}" y1="200" x2="${304 + (i * 13) % 200}" y2="190" stroke="#c8a85a" stroke-width="2"/>`).join('')}
      ${pig(400, 206, 2.4, '#d8a898')}
      <rect y="300" width="800" height="100" fill="#140c06"/>
      ${horse(120, 330, 1.6, '#0a0604')}${horse(680, 330, 1.4, '#0a0604')}
      ${[220, 270, 520, 570].map((x, i) => sheep(x, 340 + (i % 2) * 6, 1.4, '#0a0604')).join('')}
      ${pig(340, 340, 1.3, '#0a0604')}${pig(460, 340, 1.3, '#0a0604')}${dog(620, 350, 1.3, '#0a0604')}`
  });

  // 2 — İsyan: Bay Jones çiftlikten kovuluyor
  const rebellion = svg({
    sky: ['#e88a4a', '#f4b46a', '#f8d898'],
    vignette: .45, grain: .14,
    body: id => `
      ${glow(id, 640, 120, 160, '#fff4d8', .7)}
      ${barn(560, 270, 1.3, '#a83a2a')}
      <path d="M0 270 Q400 250 800 270 V400 H0 Z" fill="#8a7a3a"/>
      <g stroke="#5a3a1a" stroke-width="4">${Array.from({ length: 16 }, (_, i) => `<line x1="${i * 50}" y1="270" x2="${i * 50}" y2="240"/>`).join('')}<line x1="0" y1="250" x2="800" y2="250"/></g>
      ${figure(120, 330, 1.7, '#2a1a10', { hat: true })}${figure(60, 340, 1.5, '#2a1a10', { hat: true })}
      ${horse(320, 350, 1.8, '#3a2414')}${pig(450, 360, 1.6, '#c88a7a')}${pig(520, 356, 1.4, '#c88a7a')}
      ${[600, 650, 700].map(x => sheep(x, 364, 1.5, '#e8e0cc')).join('')}${dog(260, 366, 1.2, '#2a1a10')}`
  });

  // 3 — Yedi Emir ahır duvarında
  const commandments = svg({
    sky: ['#3a2a1a', '#5a3a24', '#3a2a1a'],
    vignette: .55, grain: .18,
    body: id => `
      <rect x="0" y="0" width="800" height="400" fill="#4a2a1a"/>
      ${Array.from({ length: 16 }, (_, i) => `<line x1="${i * 52}" y1="0" x2="${i * 52}" y2="400" stroke="#3a1e10" stroke-width="3"/>`).join('')}
      <rect x="180" y="30" width="440" height="260" fill="#3a2214"/>
      <text x="400" y="66" text-anchor="middle" font-family="Lora,serif" font-size="22" fill="#f4ecd8">YEDİ EMİR</text>
      ${['İki ayaklı her şey düşmandır.', 'Dört ayaklı ya da kanatlı her şey dosttur.', 'Hiçbir hayvan giysi giymeyecek.', 'Hiçbir hayvan yatakta uyumayacak.', 'Hiçbir hayvan alkol almayacak.', 'Hiçbir hayvan başka bir hayvanı öldürmeyecek.', 'Bütün hayvanlar eşittir.'].map((t, i) => `<text x="210" y="${100 + i * 26}" font-family="Lora,serif" font-size="15" fill="#f4ecd8">${i + 1}. ${t}</text>`).join('')}
      <rect x="640" y="160" width="10" height="200" fill="#6a4a2a"/>${Array.from({ length: 6 }, (_, k) => `<rect x="626" y="${180 + k * 30}" width="38" height="6" fill="#6a4a2a"/>`).join('')}
      <rect y="320" width="800" height="80" fill="#2a1a0e"/>
      ${pig(560, 330, 1.6, '#d8a898')}${horse(300, 360, 1.5, '#1a0e08')}${sheep(160, 364, 1.4, '#1a0e08')}`
  });

  // 4 — Ahır Savaşı
  const battle = svg({
    sky: ['#7a8a9a', '#a8b0b0', '#d8d0b8'],
    vignette: .5, grain: .16,
    body: id => `
      ${barn(620, 260, 1.1, '#8a3a2a')}
      <path d="M0 260 Q400 240 800 260 V400 H0 Z" fill="#6a6a3a"/>
      ${figure(140, 330, 1.7, '#2a2a2a', { hat: true })}${figure(200, 336, 1.6, '#2a2a2a', { hat: true })}${figure(90, 340, 1.5, '#2a2a2a', { hat: true })}
      <line x1="150" y1="260" x2="190" y2="240" stroke="#2a2a2a" stroke-width="4"/>${glow(id, 196, 238, 30, '#ffd08a', .8)}
      ${horse(360, 340, 2, '#3a2414')}
      ${[[480, 300], [520, 280], [560, 310], [440, 270]].map(([x, y]) => `<path d="M${x} ${y} q10 -10 20 0 q-10 4 -20 0 z" fill="#e8e0cc"/>`).join('')}
      ${pig(470, 360, 1.5, '#c88a7a')}${pig(260, 370, 1.3, '#c88a7a')}${sheep(560, 368, 1.4, '#e8e0cc')}
      ${dots(5, 30, '#c8b89a', 2, .5, 250, 360)}`
  });

  // 5 — Yel değirmeni ve köpeklerin kovaladığı Snowball
  const windmill = svg({
    sky: ['#4a5a7a', '#8a9ab0', '#c8c8c0'],
    vignette: .5,
    body: id => `
      <path d="M0 270 Q400 240 800 270 V400 H0 Z" fill="#5a6a3a"/>
      <g transform="translate(560 270)"><polygon points="-40,0 40,0 26,-150 -26,-150" fill="#c8b89a"/><circle cx="0" cy="-150" r="10" fill="#5a4a3a"/>
        ${[0, 1.5708, 3.1416, 4.712].map(a => `<g transform="rotate(${a * 57.3 + 20} 0 -150)"><rect x="-6" y="-270" width="12" height="120" fill="#6a5a4a"/><rect x="6" y="-266" width="30" height="100" fill="#e8dcc4" opacity=".8"/></g>`).join('')}</g>
      ${pig(200, 340, 1.6, '#e8c8b8')}
      ${dog(300, 350, 1.8, '#1a1410')}${dog(360, 356, 1.7, '#1a1410')}${dog(420, 352, 1.6, '#1a1410')}
      ${streaks(55, 30, '#e8dcc4', 0, -30, .5, 2).replace(/y1="(\d+)"/g, (m, v) => `y1="${320 + +v % 40}"`).replace(/y2="(\d+)"/g, (m, v) => `y2="${320 + +v % 40}"`)}`
  });

  // 6 — Boxer ve çalışma
  const boxer = svg({
    sky: ['#c8a870', '#e8c890', '#f4dcb0'],
    vignette: .45, grain: .16,
    body: id => `
      ${glow(id, 160, 120, 160, '#fff4d8', .7)}
      <path d="M0 270 Q400 250 800 270 V400 H0 Z" fill="#9a8a5a"/>
      <g transform="translate(600 270)"><polygon points="-40,0 40,0 30,-110 -30,-110" fill="#b8a88a"/>${Array.from({ length: 6 }, (_, k) => `<line x1="-40" y1="${-k * 18}" x2="40" y2="${-k * 18}" stroke="#8a7a5a" stroke-width="2"/>`).join('')}</g>
      ${horse(350, 340, 2.2, '#5a3a1a')}
      <path d="M220 320 L310 300" stroke="#3a2414" stroke-width="3"/><rect x="160" y="300" width="70" height="30" fill="#8a8a8a"/><rect x="150" y="320" width="90" height="10" fill="#5a4a3a"/>
      ${pig(520, 360, 1.3, '#d8a898', true)}
      ${dots(15, 30, '#c8b89a', 2, .5, 300, 380)}`
  });

  // 7 — Kasap arabası ve Benjamin
  const knacker = svg({
    sky: ['#4a4a4a', '#6a6a62', '#8a8478'],
    vignette: .6, grain: .2,
    body: id => `
      <path d="M0 270 Q400 250 800 270 V400 H0 Z" fill="#4a4a3a"/>
      <g transform="translate(480 300)"><rect x="-100" y="-80" width="200" height="80" fill="#2a2a2a"/><rect x="-90" y="-72" width="180" height="20" fill="#4a4a4a"/>
        <circle cx="-60" cy="10" r="20" fill="#1a1a1a"/><circle cx="60" cy="10" r="20" fill="#1a1a1a"/></g>
      ${horse(680, 320, 1.4, '#1a1a1a')}
      <g transform="translate(240 340) scale(1.6)" fill="#3a3a3a"><path d="M-24 -20 H16 L22 -36 L30 -34 L26 -20 V0 H20 V-10 H-18 V0 H-24 Z"/><path d="M22 -36 l-2 -14 l6 12 z M28 -34 l4 -14 l0 14 z"/></g>
      ${[100, 140, 160].map((x, i) => horse(x, 350 + i * 4, .9, '#2a2a2a')).join('')}`
  });

  // 8 — Pencereden bakan hayvanlar: domuz mu, insan mı?
  const window8 = svg({
    sky: ['#0a0a14', '#14141e', '#1e1e2a'],
    vignette: .65,
    body: id => `
      ${dots(8, 80, '#fff', 1, .7, 0, 120)}
      <rect x="160" y="60" width="480" height="260" fill="#2a1a10"/>
      <rect x="200" y="90" width="400" height="200" fill="#ffc070" opacity=".9"/>${glow(id, 400, 190, 260, '#ffc070', .5)}
      <line x1="400" y1="90" x2="400" y2="290" stroke="#2a1a10" stroke-width="8"/><line x1="200" y1="190" x2="600" y2="190" stroke="#2a1a10" stroke-width="8"/>
      <path d="M220 270 H580 L590 290 H210 Z" fill="#5a3a1a"/>
      ${pig(270, 274, 1.4, '#2a1408', true)}${figure(340, 276, 1.7, '#2a1408', { hat: true })}${pig(460, 274, 1.4, '#2a1408', true)}${figure(530, 276, 1.7, '#2a1408', { hat: true })}
      <rect y="320" width="800" height="80" fill="#0a0806"/>
      ${horse(120, 380, 1.2, '#000')}${sheep(220, 384, 1.3, '#000')}${sheep(620, 384, 1.3, '#000')}<g transform="translate(700 384) scale(1.2)" fill="#000"><path d="M-24 -20 H16 L22 -36 L30 -34 L26 -20 V0 H20 V-10 H-18 V0 H-24 Z"/></g>`
  });

  window.SUMMARIES['hayvan-ciftligi'] = {
    pages: [
      {
        title: 'Koca Reis’in Rüyası',
        image: { svg: major, caption: 'Gece yarısı ahırda toplanan hayvanlar ve onlara seslenen yaşlı domuz.' },
        text: [
          'İngiltere’nin kırsalında, Bay Jones adında sarhoş ve ihmalkâr bir çiftçinin işlettiği Malikâne Çiftliği’nde, bir gece bütün hayvanlar ahırda gizlice toplanır. Onları çağıran, çiftliğin en saygın hayvanı olan yaşlı domuz Koca Reis’tir. Koca Reis, ölümünün yaklaştığını hissetmektedir ve hayatı boyunca edindiği bilgeliği, gördüğü garip bir rüyayla birlikte diğer hayvanlarla paylaşmak ister.',
          'Koca Reis, hayvanların hayatının sefil, yorucu ve kısa olduğunu anlatır. Doğarlar, ancak yaşamaya yetecek kadar beslenirler, son güçlerine kadar çalıştırılırlar ve artık işe yaramaz hâle geldiklerinde acımasızca kesilirler. Ona göre bütün bu acıların tek bir nedeni vardır: İnsan. İnsan, hiçbir şey üretmeden tüketen tek canlıdır. Süt vermez, yumurta yumurtlamaz, sabanı çekecek gücü yoktur, ama bütün hayvanların efendisidir.',
          'Koca Reis, rüyasında insanların olmadığı, hayvanların özgürce yaşadığı bir dünya gördüğünü söyler ve onlara çocukluğunda duyduğu eski bir şarkıyı, “İngiltere’nin Hayvanları”nı öğretir. Birkaç gün sonra uykusunda ölür. Ama sözleri, çiftlikteki hayvanların, özellikle de en zeki olarak kabul edilen domuzların zihninde bir isyan tohumu olarak kalır.'
        ]
      },
      {
        title: 'İsyan',
        image: { svg: rebellion, caption: 'Aç bırakılan hayvanlar ayaklanır ve Bay Jones çiftlikten kaçar.' },
        text: [
          'Koca Reis’in ölümünden sonra, eğitim ve örgütlenme görevini domuzlar üstlenir. Aralarında en çok öne çıkan üç domuz vardır: Hayvanların ilkelerini sistemli bir öğreti hâline getiren zeki ve hareketli Snowball, sessiz ama kararlı ve kurnaz Napoleon ve her şeyi ikna edici sözlerle açıklamayı başaran, siyahı beyaz gösterebilecek kadar konuşkan Squealer. Bu öğretinin adı “Hayvancılık”tır.',
          'Bir yaz günü, Bay Jones ve adamları sarhoş olup hayvanları beslemeyi unuturlar. Günlerce aç kalan hayvanlardan biri depo kapısını kırar ve hepsi yiyeceklere saldırır. Jones ve çiftlik işçileri kırbaçlarla onları durdurmaya çalışınca, öfkeli hayvanlar insanların üzerine çullanır. Şaşkınlık içinde kalan Jones ve adamları kaçmak zorunda kalır. İsyan, neredeyse kendiliğinden, beklenmedik bir kolaylıkla gerçekleşir.',
          'Hayvanlar sevinçle çiftliğin her köşesini dolaşır. Kırbaçları, burun halkalarını ve dizginleri yakarlar. Çiftliğin adını “Hayvan Çiftliği” olarak değiştirirler. Jones’un evini bir müze olarak korumaya, hiçbir hayvanın orada yaşamamasına karar verirler. Orwell, isyanın bu ilk günlerini umutla ve coşkuyla anlatır, ama okur çok geçmeden bu umudun nasıl yozlaşacağını görecektir.'
        ]
      },
      {
        title: 'Yedi Emir',
        image: { svg: commandments, caption: 'Ahırın duvarına beyaz boyayla yazılan yedi ilke.' },
        text: [
          'Domuzlar, Jones’un çocuklarının eski kitaplarından okumayı öğrenmiştir. Hayvancılığın ilkelerini yedi temel emre indirir ve bunları ahırın büyük duvarına beyaz boyayla yazarlar. Bu emirler, iki ayaklı her şeyin düşman, dört ayaklı ya da kanatlı her şeyin dost olduğunu söyler. Hiçbir hayvan giysi giymeyecek, yatakta uyumayacak, alkol almayacak ve başka bir hayvanı öldürmeyecektir. Son ve en önemli emir ise şudur: Bütün hayvanlar eşittir.',
          'İlk hasat, hayvanların hayal ettiğinden de iyi geçer. Herkes yeteneğine göre çalışır. En büyük yükü, çiftliğin en güçlü atı olan Boxer üstlenir. Boxer çok zeki değildir, ama sadık, iyi kalpli ve inanılmaz derecede çalışkandır. Her sorunla karşılaştığında aynı cümleyi tekrarlar: “Daha çok çalışacağım.” Yaşlı ve alaycı eşek Benjamin ise hiçbir şeyin gerçekten değişmeyeceğini düşünür ve pek konuşmaz.',
          'Ama daha bu ilk günlerde küçük işaretler belirmeye başlar. Ortadan kaybolan süt ve elmaların domuzlar tarafından yendiği anlaşılır. Squealer, bunun domuzların beyin işçisi oldukları ve çiftliği yönetmek için bu gıdalara ihtiyaç duydukları için olduğunu açıklar. Eğer domuzlar görevlerini yapamazsa Jones geri gelebilir. Bu tehdit, ilerleyen yıllarda domuzların her ayrıcalığını meşrulaştırmak için defalarca kullanılacaktır.'
        ]
      },
      {
        title: 'Ahır Savaşı',
        image: { svg: battle, caption: 'Çiftliği geri almaya gelen insanlara karşı savaşan hayvanlar.' },
        text: [
          'Sonbaharda Bay Jones, komşu çiftliklerin adamlarıyla birlikte çiftliği geri almak için bir saldırı düzenler. Ama Snowball, eski bir askerî kitaptan öğrendiği taktiklerle hayvanları önceden hazırlamıştır. Kazlar ve güvercinler insanların üzerine saldırır, koyunlar onları yanlara doğru iter ve sonunda Boxer’ın güçlü nalları, insanları kaçmaya mecbur bırakır.',
          'Bu çatışma, “Ahır Savaşı” olarak tarihe geçer. Snowball, cesaretiyle yaralanmasına rağmen savaşa önderlik ettiği için kahraman ilan edilir ve “Birinci Sınıf Hayvan Kahramanı” nişanını alır. Boxer da bu nişanla ödüllendirilir. Ama Boxer, yanlışlıkla bir çiftlik çocuğunu öldürdüğünü düşünerek büyük bir üzüntü duyar, çünkü hiçbir canlının ölmesini istememektedir.',
          'Savaştan sonra Snowball ile Napoleon arasındaki gerilim giderek artar. Snowball, çiftliğin geleceği için büyük planlar yapar. En büyük hayali, çiftlikte elektrik üretecek bir yel değirmeni inşa etmektir. Ona göre bu değirmen hayvanların iş yükünü hafifletecek ve onlara daha rahat bir hayat sunacaktır. Napoleon ise bu projeye baştan karşı çıkar ve hayvanların önce yiyecek üretimini artırması gerektiğini savunur.'
        ]
      },
      {
        title: 'Snowball’un Kovulması',
        image: { svg: windmill, caption: 'Yel değirmeni planları ve Napoleon’un köpeklerinden kaçan Snowball.' },
        text: [
          'Yel değirmeni konusunda yapılacak büyük oylamanın günü gelir. Snowball, coşkulu bir konuşmayla hayvanların çoğunu ikna etmek üzeredir. Tam o sırada Napoleon garip bir ses çıkarır ve ahırın kapısından dokuz iri köpek fırlar. Bu köpekler, Napoleon’un yavruyken annelerinden alıp gizlice büyüttüğü yavrulardır. Köpekler Snowball’a saldırır ve onu çiftlikten kovar. Snowball bir daha asla geri dönmez.',
          'Napoleon, artık çiftliğin tek hâkimidir. Pazar toplantılarını kaldırır ve bütün kararların domuzlardan oluşan bir komite tarafından alınacağını duyurur. Birkaç hayvan itiraz etmeye çalışır, ama köpeklerin homurtusu onları susturur. Squealer ise her zamanki gibi hayvanları ikna eder: Napoleon bu ağır yükü sadece onların iyiliği için üstlenmiştir ve hayvanlar yanlış kararlar verebilirdi.',
          'Kısa bir süre sonra Napoleon, şaşırtıcı bir şekilde yel değirmeninin yapılacağını açıklar. Squealer, bu planın aslında en başından beri Napoleon’a ait olduğunu, Snowball’un onu çaldığını söyler. Snowball ise artık her kötülüğün sorumlusu olarak gösterilen bir hain hâline gelir. Bir şey kırıldığında, tohumlar çalındığında ya da bir fırtına değirmeni yıktığında, suç hep geceleri çiftliğe gizlice girdiği söylenen Snowball’a atılır.'
        ]
      },
      {
        title: 'Değişen Emirler',
        image: { svg: boxer, caption: 'Yel değirmeni için taş taşıyan Boxer ve iki ayağı üzerinde yürüyen bir domuz.' },
        text: [
          'Yel değirmeninin yapımı, hayvanlar için yorucu ve acımasız bir işe dönüşür. Haftalık çalışma saatleri artar, yiyecek tayınları azalır. Boxer, her sabah diğerlerinden önce kalkarak dev taşları taşır. Ama hayvanlar, Jones’un zamanında da bundan daha kötü yaşamadıklarını düşünmeye cesaret edemezler, çünkü Squealer onlara sürekli olarak üretimin arttığını, hayatlarının her zamankinden daha iyi olduğunu gösteren rakamlar okumaktadır.',
          'Bu arada domuzlar Jones’un evine taşınır ve yataklarda uyumaya başlar. Hayvanlar duvara baktıklarında, dördüncü emrin değiştiğini fark eder: Hiçbir hayvan çarşaflı yatakta uyumayacak. Domuzlar viski içmeye başlar ve beşinci emir de değişir: Hiçbir hayvan aşırı alkol almayacak. Hayvanlar, kendi hafızalarının mı yanıldığını yoksa emirlerin mi değiştiğini bir türlü çözemezler.',
          'En korkunç değişiklik ise Napoleon’un düzenlediği bir toplantıda yaşanır. Napoleon, Snowball ile gizlice iş birliği yaptıklarını itiraf eden hayvanları köpeklerine öldürtür. Dört domuz, birkaç tavuk, bir kaz ve üç koyun kanlar içinde can verir. Hayvanlar dehşet içindedir. Ama duvara baktıklarında altıncı emir de değişmiştir: Hiçbir hayvan sebepsiz yere başka bir hayvanı öldürmeyecek.'
        ]
      },
      {
        title: 'Boxer’ın Sonu',
        image: { svg: knacker, caption: 'Boxer’ı götüren kapalı araba ve onu durdurmaya çalışan hayvanlar.' },
        text: [
          'Yıllar geçer. Yel değirmeni bir kez fırtınayla yıkılır, bir kez de komşu çiftçi Frederick’in saldırısıyla havaya uçurulur. Her seferinde hayvanlar daha da çok çalışarak yeniden inşa eder. Boxer artık yaşlanmıştır, ama emeklilik yaşına gelmeden önce değirmenin tamamlanmasını görmek için çalışmaya devam eder. Bir gün taş taşırken yere yığılır ve bir daha kalkamaz.',
          'Squealer, Boxer’ın en iyi tedaviyi görmesi için kasabadaki bir hastaneye gönderileceğini duyurur. Ama Boxer’ı almaya gelen arabanın üzerinde yazanları okuyan Benjamin, ilk kez büyük bir öfkeyle bağırır. Araba, ölü hayvanları kesip tutkal yapan bir kasaba aittir. Hayvanlar Boxer’ı kurtarmaya çalışır, ama artık çok güçsüz olan Boxer arabanın kapılarını kıramaz ve götürülür.',
          'Birkaç gün sonra Squealer, Boxer’ın hastanede huzur içinde öldüğünü ve son sözlerinin “Yaşasın Napoleon, Napoleon her zaman haklıdır” olduğunu anlatır. Arabadaki yazının ise, eski bir kasap arabasını satın alan veterinerin henüz değiştirmediği bir tabela olduğunu açıklar. Aynı günlerde domuzlar, bir kasa viski satın almak için para bulur. Orwell, bu sahneyle sistemin en sadık çalışanına bile nasıl acımasızca ihanet ettiğini gösterir.'
        ]
      },
      {
        title: 'Domuz mu, İnsan mı?',
        image: { svg: window8, caption: 'Pencerenin dışından bakan hayvanlar ve içerideki şölen.' },
        text: [
          'Yıllar geçer, isyanı hatırlayan hayvanların çoğu ölmüştür. Çiftlik zenginleşmiştir, ama bu zenginlik sadece domuzlara ve köpeklere yaramaktadır. Diğer hayvanların hayatı her zamanki gibi açlık, yorgunluk ve sefalet içinde geçer. Bir gün hayvanlar, domuz Squealer’ın arka ayakları üzerinde yürüdüğünü görür. Ardından Napoleon’un elinde bir kırbaçla evden çıktığını görürler.',
          'Koyunlar, domuzların öğrettiği yeni bir slogan tekrarlamaya başlar: Dört ayak iyidir, iki ayak daha iyidir. Hayvanlar ahırın duvarına baktıklarında yedi emrin hepsinin silindiğini, yerine tek bir cümlenin yazıldığını görür: Bütün hayvanlar eşittir, ama bazı hayvanlar diğerlerinden daha eşittir. Domuzlar artık giysi giyer, gazete okur ve komşu çiftlik sahipleriyle iş yapar.',
          'Romanın son sahnesinde Napoleon, komşu çiftçileri bir şölene davet eder. Diğer hayvanlar pencereden içeriyi izler. Domuzlar ve insanlar birlikte içer, kart oynar ve birbirlerinin başarılarını överler. Sonra bir kavga çıkar, çünkü iki taraf da aynı anda hile yapmıştır. Dışarıdaki hayvanlar bir domuza, bir insana bakarlar ve artık hangisinin hangisi olduğunu ayırt edemezler. Orwell’ın bu kısa ve sarsıcı masalı, devrimlerin nasıl yozlaşabileceğini ve gücün insanı nasıl dönüştürdüğünü anlatan en güçlü siyasi alegorilerden biridir.'
        ]
      }
    ]
  };
})();
