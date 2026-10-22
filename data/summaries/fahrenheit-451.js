// Fahrenheit 451 — Ray Bradbury (1953)
// Sahneler data/scenes.js yardımcılarıyla çizilir; ileride image.src ile gerçek çizimlerle değiştirilebilir.
(() => {
  const { svg, glow, skyline, figure, seated, streaks, dots } = window.Scene;

  // Alevler
  const flames = (id, x, y, w, h, seed = 1) => `
    ${glow(id, x, y - h / 2, w, '#ff7a1a', .6)}
    ${Array.from({ length: 9 }, (_, i) => {
      const fx = x - w / 2 + (i + .5) * (w / 9), fh = h * (.5 + ((i * 7 + seed) % 5) / 8);
      return `<path d="M${fx - w / 14} ${y} Q${fx - w / 22} ${y - fh * .6} ${fx} ${y - fh} Q${fx + w / 22} ${y - fh * .6} ${fx + w / 14} ${y} Z" fill="${i % 2 ? '#ffb02a' : '#ff6a1a'}" opacity=".9"/>
        <path d="M${fx - w / 30} ${y} Q${fx} ${y - fh * .5} ${fx} ${y - fh * .6} Q${fx} ${y - fh * .5} ${fx + w / 30} ${y} Z" fill="#fff0a0"/>`;
    }).join('')}`;
  const bookPile = (x, y, n) => Array.from({ length: n }, (_, i) => `<rect x="${x - 40 + (i % 3) * 6}" y="${y - (i + 1) * 9}" width="${70 - (i % 4) * 6}" height="8" fill="${['#8a2a1a', '#2a4a6a', '#4a6a2a', '#6a4a2a'][i % 4]}" transform="rotate(${(i % 3) * 3 - 3} ${x} ${y - i * 9})"/>`).join('');

  // 1 — İtfaiyeci Montag ve yanan kitaplar
  const burning = svg({
    sky: ['#0a0604', '#1a0a04', '#2a1004'],
    vignette: .7,
    body: id => `
      ${skyline({ y: 260, color: '#0a0604', seed: 19, lit: .05, minH: 80, maxH: 160, dome: false })}
      <rect y="260" width="800" height="140" fill="#140804"/>
      ${bookPile(400, 330, 8)}
      ${flames(id, 400, 330, 260, 200, 3)}
      ${figure(220, 340, 2, '#050302', { hat: true })}<line x1="240" y1="270" x2="330" y2="300" stroke="#050302" stroke-width="7"/>
      ${dots(19, 80, '#ffb04a', 1.6, .9, 40, 300)}`
  });

  // 2 — Clarisse ile gece yürüyüşü
  const clarisse = svg({
    sky: ['#0e1426', '#1c2440', '#2a3050'],
    vignette: .55,
    body: id => `
      ${dots(9, 120, '#fff', 1.1, .8, 0, 200)}
      ${glow(id, 640, 70, 120, '#e8eeff', .5)}<circle cx="640" cy="70" r="24" fill="#f2f4ff"/>
      <path d="M0 260 Q400 240 800 260 V400 H0 Z" fill="#141a28"/>
      ${Array.from({ length: 5 }, (_, i) => `<g transform="translate(${80 + i * 170} 270)"><rect x="-4" y="-80" width="8" height="80" fill="#0a0e18"/><circle cy="-100" r="40" fill="#0e1420"/></g>`).join('')}
      <path d="M0 300 Q400 280 800 300" stroke="#2a3248" stroke-width="30" fill="none"/>
      ${figure(370, 310, 1.6, '#0a0e18', { hat: true })}${figure(420, 312, 1.4, '#e8e0f0', { dress: true })}
      ${Array.from({ length: 16 }, (_, i) => `<path d="M${(i * 53) % 800} ${(i * 29) % 200 + 60} l6 -4 l-2 8 z" fill="#c8a85a" opacity=".6"/>`).join('')}`
  });

  // 3 — Mildred ve oturma odası duvarları
  const parlour = svg({
    sky: ['#0a1a2a', '#0e2236', '#0a1a2a'],
    vignette: .6,
    body: id => `
      ${[[0, 60, 250, 260], [270, 40, 260, 260], [550, 60, 250, 260]].map(([x, y, w, h], i) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#3ad8ff" opacity=".2"/>
        ${Array.from({ length: 3 }, (_, k) => `<g transform="translate(${x + 40 + k * (w - 80) / 2} ${y + h - 40}) scale(1.3)" fill="#9af0ff" opacity=".55"><circle cy="-60" r="10"/><path d="M-12 -48 Q0 -54 12 -48 L14 0 H-14 Z"/></g>`).join('')}`).join('')}
      ${glow(id, 400, 180, 300, '#3ad8ff', .3)}
      <rect y="320" width="800" height="80" fill="#060e18"/>
      <path d="M300 330 H500 V350 H300 Z" fill="#14202e"/>
      ${seated(400, 330, 1.6, '#0a1420')}
      <circle cx="388" cy="276" r="3" fill="#3ad8ff"/>`
  });

  // 4 — Kitaplarıyla birlikte yanan yaşlı kadın
  const oldWoman = svg({
    sky: ['#1a0804', '#3a1008', '#5a1a0a'],
    vignette: .65,
    body: id => `
      <g transform="translate(400 300)"><rect x="-160" y="-200" width="320" height="200" fill="#1a0a06"/><polygon points="-180,-200 0,-280 180,-200" fill="#1a0a06"/>
        <rect x="-110" y="-150" width="70" height="80" fill="#ff8a2a"/><rect x="40" y="-150" width="70" height="80" fill="#ff8a2a"/><rect x="-30" y="-100" width="60" height="100" fill="#ffb04a"/></g>
      ${flames(id, 400, 300, 340, 160, 6)}
      ${figure(400, 300, 1.4, '#000', { dress: true })}
      <rect y="300" width="800" height="100" fill="#0a0402"/>
      ${figure(170, 360, 1.9, '#050302', { hat: true })}${figure(630, 360, 1.9, '#050302', { hat: true })}
      ${Array.from({ length: 14 }, (_, i) => `<rect x="${(i * 61) % 800}" y="${(i * 37) % 240 + 20}" width="14" height="10" fill="#e8dcc4" opacity=".6" transform="rotate(${(i * 41) % 60 - 30} ${(i * 61) % 800 + 7} ${(i * 37) % 240 + 25})"/>`).join('')}
      ${dots(29, 70, '#ffc070', 1.6, .9, 40, 300)}`
  });

  // 5 — Faber ve kulaklık
  const faber = svg({
    sky: ['#1a1410', '#2a2018', '#1a1410'],
    vignette: .6,
    body: id => `
      ${glow(id, 400, 160, 240, '#ffc070', .5)}
      <rect x="560" y="60" width="200" height="260" fill="#2a1e14"/>
      ${Array.from({ length: 6 }, (_, r) => Array.from({ length: 9 }, (_, c) => `<rect x="${568 + c * 21}" y="${70 + r * 42}" width="16" height="34" fill="${['#6a2a1a', '#2a4a5a', '#5a5a2a', '#4a2a4a'][(r + c) % 4]}"/>`).join('')).join('')}
      <path d="M120 270 H520 L540 290 H100 Z" fill="#3a2818"/>
      <path d="M260 250 Q300 236 340 250 L340 262 Q300 248 260 262 Z" fill="#e8dcc4"/>
      ${seated(200, 272, 1.6, '#0c0a08')}${seated(450, 272, 1.6, '#0c0a08', true)}
      <g transform="translate(320 150)"><ellipse rx="14" ry="10" fill="#3ad870"/><circle r="5" fill="#0a2a14"/></g>
      ${[16, 28, 40].map(r => `<path d="M${334 + r * .3} ${150 - r * .7} A ${r} ${r} 0 0 1 ${334 + r * .3} ${150 + r * .7}" stroke="#3ad870" stroke-width="2" fill="none" opacity=".6"/>`).join('')}`
  });

  // 6 — Beatty ile hesaplaşma
  const beatty = svg({
    sky: ['#2a0804', '#5a1408', '#8a2a0a'],
    vignette: .65,
    body: id => `
      <g transform="translate(400 300)"><rect x="-200" y="-180" width="400" height="180" fill="#140604"/><polygon points="-220,-180 0,-260 220,-180" fill="#140604"/></g>
      ${flames(id, 400, 300, 420, 220, 9)}
      <rect y="300" width="800" height="100" fill="#0a0302"/>
      ${figure(230, 350, 2, '#000', { hat: true })}
      <path d="M260 280 L380 290" stroke="#ffd04a" stroke-width="6"/><path d="M380 290 q40 -10 70 10 q-30 20 -70 -10" fill="#ffb02a" opacity=".85"/>
      ${figure(560, 350, 2, '#000', { hat: true })}
      ${dots(39, 80, '#ffc070', 1.6, .9, 40, 300)}`
  });

  // 7 — Mekanik Tazı ve nehirde kaçış
  const river = svg({
    sky: ['#06080e', '#0c1220', '#141a2a'],
    vignette: .6,
    body: id => `
      ${dots(49, 80, '#fff', 1, .7, 0, 160)}
      ${skyline({ y: 200, color: '#0a0e18', seed: 49, lit: .2, light: '#ff6a3a', minH: 40, maxH: 120, dome: false })}
      <rect y="200" width="800" height="200" fill="#0a1424"/>
      ${Array.from({ length: 12 }, (_, i) => `<path d="M${(i * 71) % 800} ${220 + i * 14} q30 -6 60 0" stroke="#3a5a80" stroke-width="2" fill="none" opacity=".5"/>`).join('')}
      <g transform="translate(150 196)" fill="#c8d0d8"><path d="M-30 0 L-20 -16 L16 -18 L30 -28 L36 -20 L28 -12 L24 0 L18 0 L16 -8 L-16 -8 L-20 0 Z"/><line x1="-30" y1="-4" x2="-44" y2="-10" stroke="#c8d0d8" stroke-width="2"/></g>
      ${glow(id, 182, 172, 30, '#ff3a3a', .9)}
      <polygon points="0,120 300,60 300,100 0,160" fill="#fff" opacity=".07"/>
      <g transform="translate(470 300)"><circle r="10" fill="#0a0e18"/><path d="M-26 6 q26 -10 52 0" stroke="#5a7a9a" stroke-width="2" fill="none"/></g>`
  });

  // 8 — Kitap insanları ve uzaktaki yıkılmış şehir
  const bookPeople = svg({
    sky: ['#3a2a3a', '#a86a5a', '#f4c88a'],
    vignette: .45, grain: .14,
    body: id => `
      ${glow(id, 620, 220, 240, '#fff0c0', .8)}
      <g fill="#3a2a2a" opacity=".7">${skyline({ y: 240, color: '#5a3a3a', seed: 59, lit: 0, minH: 30, maxH: 90, dome: false })}</g>
      <path d="M520 240 q30 -60 80 -70 q50 -10 70 -60" stroke="#5a4a4a" stroke-width="30" fill="none" opacity=".35" filter="url(#${id}blur)"/>
      <path d="M0 250 Q400 230 800 250 V400 H0 Z" fill="#4a3a2a"/>
      <path d="M0 300 Q400 270 800 300 V400 H0 Z" fill="#2a2018"/>
      ${Array.from({ length: 4 }, (_, i) => `<g transform="translate(${50 + i * 50} 300)"><rect x="-4" y="-70" width="8" height="70" fill="#1a1410"/><circle cy="-90" r="30" fill="#1a2014"/></g>`).join('')}
      ${glow(id, 300, 330, 70, '#ffb04a', .7)}<path d="M285 340 l15 -26 l15 26 z" fill="#ffb04a"/>
      ${[230, 270, 330, 370, 410, 460, 510].map((x, i) => figure(x, 350 + (i % 2) * 6, 1.5, '#0e0a08', { hat: i % 3 === 0, dress: i % 3 === 1 })).join('')}`
  });

  window.SUMMARIES['fahrenheit-451'] = {
    pages: [
      {
        title: 'Yakmak Bir Zevkti',
        image: { svg: burning, caption: 'Kitapların ateşe verildiği bir gece ve elinde gazyağı hortumu tutan itfaiyeci.' },
        text: [
          'Fahrenheit 451, kâğıdın tutuşup yanmaya başladığı sıcaklığın adını taşır. Ray Bradbury’nin romanı, kitapların yasaklandığı ve bulunduğu yerde yakıldığı bir gelecekte geçer. Bu dünyada itfaiyeciler yangın söndürmez, yangın çıkarır. Evlerin hepsi artık ateşe dayanıklı malzemelerden yapıldığı için itfaiyecilerin yeni görevi, gizlice kitap saklayan insanları bulmak ve kitapları yakmaktır.',
          'Romanın kahramanı Guy Montag, otuz yaşında, işini seven bir itfaiyecidir. Kask kafasında, elinde gazyağı püskürten hortumuyla kitapları alevler içinde izlemekten büyük bir zevk alır. Yanan sayfaların kuşlar gibi havada kanat çırpması onu büyüler. Her akşam eve döndüğünde yüzündeki o sabit gülümseme sanki hiç silinmeyecekmiş gibidir.',
          'Ama Montag’ın bu kusursuz görünen hayatı, birkaç tesadüfi karşılaşmayla sarsılmaya başlayacaktır. Bradbury, daha ilk sayfalarda okuru korkunç ama tanıdık bir dünyaya sokar: İnsanların düşünmediği, sorgulamadığı ve kendi mutluluklarını ekranların önünde aradığı bir toplum.'
        ]
      },
      {
        title: 'Clarisse',
        image: { svg: clarisse, caption: 'Ay ışığında yürüyen bir itfaiyeci ve onunla konuşan meraklı genç kız.' },
        text: [
          'Bir akşam işten eve dönerken Montag, yeni komşusu olan on yedi yaşındaki Clarisse McClellan ile karşılaşır. Clarisse, bu dünyanın insanlarına hiç benzemeyen bir kızdır. Yağmurun tadına bakar, çiçekleri koklar, ayın üstündeki gölgeleri izler ve insanlara “neden” diye sorar. Ailesiyle birlikte akşamları televizyon izlemek yerine konuşarak vakit geçirir. Bu yüzden toplumda tuhaf, hatta tehlikeli biri olarak görülür.',
          'Clarisse, Montag’a eskiden itfaiyecilerin yangın söndürdüğünü duyup duymadığını sorar. Montag buna güler, ama kızın sorusu aklından çıkmaz. Ardından Clarisse ona çok daha basit, ama daha sarsıcı bir soru sorar: “Mutlu musun?” Montag, mutlu olduğunu söylemek ister, ama o gece evine döndüğünde bu soruya içtenlikle cevap veremeyeceğini fark eder.',
          'Montag, sonraki günlerde Clarisse ile birkaç kez daha karşılaşır ve onun dünyaya bakışından derinden etkilenir. Ama bir gün Clarisse ortadan kaybolur. Montag daha sonra karısından onun bir araba kazasında öldüğünü ve ailesinin şehirden taşındığını öğrenir. Clarisse’in yokluğu, Montag’ın içinde açılan boşluğu daha da büyütür.'
        ]
      },
      {
        title: 'Duvar Ekranları',
        image: { svg: parlour, caption: 'Odanın üç duvarını kaplayan dev ekranlar ve kulaklarında radyo dinleyen Mildred.' },
        text: [
          'Montag’ın karısı Mildred, bu toplumun tipik bir insanıdır. Günlerini, oturma odasının duvarlarını kaplayan dev televizyon ekranlarının karşısında, “aile” dediği ekrandaki karakterlerle geçirir. Kulaklarında “deniz kabuğu” adı verilen küçük radyolar vardır ve uyurken bile onlardan gelen sesleri dinler. Tek hayali, dördüncü duvarı da ekranla kaplatmaktır.',
          'O gece Montag eve döndüğünde Mildred’i yatağında, bir kutu uyku hapını içmiş, baygın hâlde bulur. Acil yardım çağırır. Gelenler doktor değil, kanını temizleyen makineleri kullanan iki sıradan teknisyendir. Bu olayın o kadar sık yaşandığını söylerler ki artık bunun için doktor göndermeye gerek görülmemektedir. Ertesi sabah Mildred hiçbir şey hatırlamaz ve hayatına hiçbir şey olmamış gibi devam eder.',
          'Montag, karısıyla aralarında hiçbir gerçek bağ kalmadığını acıyla fark eder. Birbirleriyle nasıl tanıştıklarını bile hatırlamazlar. Bradbury bu sahnelerle, mutluluğu sürekli eğlencede, hızda ve uyuşmuşlukta arayan bir toplumun aslında ne kadar derin bir yalnızlık ve umutsuzluk içinde olduğunu gösterir.'
        ]
      },
      {
        title: 'Kitaplarıyla Yanan Kadın',
        image: { svg: oldWoman, caption: 'Kitaplarından ayrılmayı reddeden yaşlı kadının evinde yükselen alevler.' },
        text: [
          'Bir gün itfaiyeciler, gizlice kitap biriktiren yaşlı bir kadının evine baskın yapar. Ev tavana kadar kitapla doludur. İtfaiyeciler kitapların üzerine gazyağı dökerken, Montag elinin ona sanki kendi iradesi dışında bir kitabı kaptığını ve paltosunun altına sakladığını fark eder. Kadın evinden çıkmayı reddeder. Kitaplarıyla birlikte yanmayı seçer ve kibriti kendisi çakar.',
          'Bu olay, Montag’ı derinden sarsar. Bir insanın kitaplar uğruna ölmeyi seçebileceğini daha önce hiç düşünmemiştir. O gece eve döndüğünde, kitaplarda bir insanı böyle bir fedakârlığa itecek kadar değerli ne olabileceğini sorgulamaya başlar. Ertesi gün kendini hasta hisseder ve işe gitmez.',
          'Montag’ın amiri Yüzbaşı Beatty, onu ziyarete gelir. Beatty, son derece zeki ve çok okumuş bir adamdır. Montag’a, toplumun kitapları yasaklamaya nasıl geldiğini anlatır. Ona göre her şey devlet zoruyla değil, insanların kendi tercihiyle başlamıştır. Kitaplar kısaldı, özetlere dönüştü, insanları rahatsız eden fikirler kaldırıldı. Sonunda insanlar düşünmek yerine eğlenmeyi seçti. İtfaiyeciler, toplumun mutluluğunu korumak için çalışan bekçilerdir. Beatty ayrılmadan önce Montag’a, bazen bir itfaiyecinin merak edip bir kitabı eve götürebileceğini, ama bunu yirmi dört saat içinde yakması gerektiğini ima eder.'
        ]
      },
      {
        title: 'Faber',
        image: { svg: faber, caption: 'Eski profesör Faber’in kitaplarla dolu evi ve kulağa takılan yeşil kulaklık.' },
        text: [
          'Montag, Mildred’e yıllardır evlerinin havalandırma deliğinde gizlediği kitapları gösterir. Mildred dehşete düşer, ama Montag ona birlikte okumayı önerir. Okudukları satırları anlamakta zorlanırlar. Montag, bu kitapları anlamasına yardım edecek birine ihtiyaç duyduğunu fark eder ve bir zamanlar parkta tanıştığı yaşlı bir İngilizce profesörü olan Faber’i hatırlar.',
          'Faber, korkak ve yalnız bir adamdır. Kitapların yasaklanmasına, yıllar önce bir şey yapabilecekken sessiz kaldığı için kendini suçlamaktadır. Montag’a, kitapların kendi başlarına sihirli olmadığını açıklar. Önemli olan, kitapların içerdiği fikirlerin niteliği, insanlara bu fikirleri düşünmek için tanınan boş zaman ve bu fikirlere göre hareket etme özgürlüğüdür.',
          'Faber, Montag’a kulağına takabileceği, yeşil bir mermi şeklindeki küçük bir dinleme cihazı verir. Bu cihaz sayesinde Faber, Montag’ın duyduğu her şeyi duyabilecek ve ona ne yapması gerektiğini fısıldayabilecektir. Montag ve Faber, kitapları geri getirmek için gizlice birlikte çalışmaya karar verirler.'
        ]
      },
      {
        title: 'Hesaplaşma',
        image: { svg: beatty, caption: 'Montag’ın kendi evinin önünde Beatty’ye çevirdiği alev.' },
        text: [
          'Bir akşam Mildred’in arkadaşları duvar ekranlarını izlemek için evlerine gelir. Montag onların boş ve duyarsız sohbetlerine dayanamaz ve onlara Matthew Arnold’ın Dover Sahili adlı şiirini okur. Kadınlardan biri ağlamaya başlar, diğeri ise öfkeyle Montag’ı suçlar. Faber’in kulaklığından gelen uyarılara rağmen Montag kendini kaybeder ve kadınlar korkuyla evden kaçar.',
          'Montag işe döndüğünde, Beatty ona kitaplardan aldığı alıntılarla adeta bir söz düellosu yapar. Ardından alarm çalar ve itfaiyeciler yeni bir eve doğru yola çıkar. Montag, kamyon durduğunda evin kendi evi olduğunu dehşetle fark eder. Onu ihbar eden kişi, karısı Mildred’dir. Mildred, elinde bir bavulla evden çıkar ve bir taksiye binerek uzaklaşır.',
          'Beatty, Montag’a kendi evini ve kitaplarını kendi eliyle yakmasını emreder. Montag, alev püskürtücüyle evini yakar. Ama Beatty onu alay ederek kışkırtmaya ve kulağındaki kulaklığı bulmaya devam edince, Montag hortumu ona çevirir ve Beatty’yi yakar. Diğer itfaiyecileri de baygın bırakır ve elinde kalan birkaç kitapla birlikte kaçmaya başlar.'
        ]
      },
      {
        title: 'Kaçış',
        image: { svg: river, caption: 'Kırmızı gözlü Mekanik Tazı ve nehrin karanlık sularında süzülen bir adam.' },
        text: [
          'Montag artık bir kaçaktır. Şehrin bütün televizyon ekranları onun peşindeki canlı takibi yayınlar. Peşindeki en korkunç düşman, itfaiye istasyonunun Mekanik Tazı’sıdır. Sekiz ayaklı, kokuyu asla şaşırmayan, burnundaki iğneyle kurbanını felç eden bu robot köpek, Montag’ın kokusunu sokaktan sokağa izler.',
          'Montag, önce Faber’in evine sığınır. Faber ona, şehrin dışında, demiryolu raylarının boyunca yaşayan kaçak aydınlardan söz eder. Montag, kokusunu silmek için Faber’in eski giysilerini giyer ve nehre atlar. Akıntıya kapılarak şehirden uzaklaşır. Mekanik Tazı nehir kıyısında izini kaybeder.',
          'Ama televizyondaki canlı yayın, izleyicilerin hayal kırıklığına uğramaması için devam etmek zorundadır. Yetkililer, sokakta yürüyen masum bir adamı Montag diye yakalar ve kameraların önünde Tazı ona saldırır. Montag ise nehrin kıyısında, uzun zamandır ilk kez yıldızların altında, sessiz bir doğanın içinde yeniden doğmuş gibi hisseder.'
        ]
      },
      {
        title: 'Kitap İnsanları',
        image: { svg: bookPeople, caption: 'Ateşin başında toplanan kitap insanları ve ufukta yıkılmış şehir.' },
        text: [
          'Montag, nehrin kıyısından raylar boyunca ilerleyerek, bir ateşin etrafında oturan bir grup yaşlı adama ulaşır. Grubun lideri Granger’dır. Bu insanlar, bir zamanlar profesör, yazar ya da din adamı olan kaçaklardır. Her biri bütün bir kitabı ezberlemiştir ve kendi kafasında bir kütüphane taşır. Biri Platon’un Devlet’ini, bir diğeri Jonathan Swift’in Gulliver’in Gezileri’ni, bir başkası ise Darwin’i ya da Buda’yı “taşır”.',
          'Granger, onların kitapları kâğıda yazamayacaklarını, ama savaş ve yıkım bittiğinde bu kitapları yeniden insanlara aktarmak için yaşamaya devam edeceklerini anlatır. Montag da kaçarken yanına aldığı İncil’in Vaiz kitabını ezberlemeye başlar. Bu grubun bir parçası olur ve böylece, yıllarca kitap yakmış bir adam olarak, kitapları yaşatmanın görevini üstlenir.',
          'O sırada uzaktaki şehir, uzun süredir beklenen bir savaşın bombalarıyla birkaç saniye içinde yerle bir olur. Montag, Mildred’in de o şehirde olduğunu düşünür. Ertesi sabah Granger, küllerinden yeniden doğan efsanevi Anka kuşunu anlatır. İnsanlık da her seferinde kendini yakmış, ama sonra yeniden doğmuştur. Kitap insanları, şehrin kalıntılarına doğru yürümeye başlar. Bradbury, düşünmenin, okumanın ve hatırlamanın değerine dair yazdığı bu güçlü romanı, yıkımın ardından gelen umutla bitirir.'
        ]
      }
    ]
  };
})();
