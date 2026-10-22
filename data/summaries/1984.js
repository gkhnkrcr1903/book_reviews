// 1984 — George Orwell (1949)
// Sahneler data/scenes.js yardımcılarıyla çizilir; ileride image.src ile gerçek çizimlerle değiştirilebilir.
(() => {
  const { svg, glow, skyline, figure, seated, streaks, dots } = window.Scene;

  // Büyük Birader posteri / tele-ekranda bakan göz
  const eye = (x, y, s, c = '#e8e0cc', iris = '#1a1a1a') => `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-60 0 Q0 -44 60 0 Q0 44 -60 0 Z" fill="${c}"/><circle r="22" fill="${iris}"/><circle r="9" fill="#000"/><circle cx="-6" cy="-6" r="4" fill="#fff" opacity=".7"/></g>`;
  const screen = (x, y, w, h, id) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="#0a1410" stroke="#2a3a30" stroke-width="5"/>
    <rect x="${x + 6}" y="${y + 6}" width="${w - 12}" height="${h - 12}" fill="#3a6a4a" opacity=".5"/>${eye(x + w / 2, y + h / 2, w / 200, '#c8e8c8', '#0a1410')}`;

  // 1 — Londra: harabeler ve Hakikat Bakanlığı’nın piramidi
  const london = svg({
    sky: ['#3a3a3a', '#5a5a52', '#7a7466'],
    vignette: .65, grain: .24,
    body: id => `
      <polygon points="400,40 560,300 240,300" fill="#d8d4c8"/>
      ${Array.from({ length: 10 }, (_, i) => `<line x1="${400 - (i + 1) * 16}" y1="${40 + (i + 1) * 26}" x2="${400 + (i + 1) * 16}" y2="${40 + (i + 1) * 26}" stroke="#a8a498" stroke-width="2"/>`).join('')}
      ${skyline({ y: 320, color: '#2a2a28', seed: 84, lit: .04, minH: 40, maxH: 130, dome: false })}
      <rect y="320" width="800" height="80" fill="#1a1a18"/>
      <rect x="80" y="120" width="120" height="160" fill="#c8c0a8"/>${eye(140, 180, .8, '#e8e0cc')}<rect x="88" y="250" width="104" height="18" fill="#1a1a1a"/>
      ${figure(560, 340, 1.3, '#3a4a5a')}
      ${streaks(84, 80, '#c8c0b0', 12, 20, .25)}`
  });

  // 2 — Hakikat Bakanlığı’nda geçmişi yeniden yazmak
  const ministry = svg({
    sky: ['#1a1e1a', '#2a2e28', '#1a1e1a'],
    vignette: .7,
    body: id => `
      ${screen(500, 60, 200, 140, id)}${glow(id, 600, 130, 160, '#8ae8a8', .25)}
      <path d="M100 260 H560 L580 280 H80 Z" fill="#3a3428"/><rect x="100" y="280" width="460" height="80" fill="#2a2418"/>
      <rect x="140" y="160" width="40" height="100" fill="#4a4438"/><circle cx="160" cy="160" r="24" fill="#4a4438"/>
      <rect x="150" y="100" width="20" height="40" fill="#1a1a14"/>
      <path d="M150 160 L170 160 L160 180 Z" fill="#ff8a3a" opacity=".7"/>${glow(id, 160, 170, 60, '#ff8a3a', .5)}
      ${Array.from({ length: 8 }, (_, i) => `<rect x="${230 + (i % 4) * 60}" y="${236 + Math.floor(i / 4) * 8}" width="50" height="6" fill="#e8dcc4" transform="rotate(${(i % 3) * 4 - 4} ${255 + (i % 4) * 60} 240)"/>`).join('')}
      ${seated(330, 262, 1.6, '#3a4a5a')}`
  });

  // 3 — İki Dakika Nefret
  const hate = svg({
    sky: ['#2a0a0a', '#4a1414', '#2a0a0a'],
    vignette: .7,
    body: id => `
      <rect x="220" y="40" width="360" height="220" fill="#0a0a0a" stroke="#3a1a1a" stroke-width="6"/>
      ${glow(id, 400, 150, 200, '#ff4a3a', .4)}
      <g transform="translate(400 160) scale(1.6)" fill="#c8c0b0" opacity=".8"><circle cy="-26" r="22"/><path d="M-30 40 Q-30 0 0 0 Q30 0 30 40 Z"/><path d="M-12 -10 q12 14 24 0" stroke="#0a0a0a" stroke-width="3" fill="none"/></g>
      <rect y="260" width="800" height="140" fill="#140606"/>
      ${Array.from({ length: 24 }, (_, i) => `<g transform="translate(${20 + i * 33} ${330 + (i % 2) * 14}) scale(1.2)" fill="#000"><circle cy="-30" r="8"/><rect x="-10" y="-22" width="20" height="40"/><line x1="0" y1="-20" x2="${i % 2 ? 10 : -10}" y2="-50" stroke="#000" stroke-width="4"/><circle cx="${i % 2 ? 10 : -10}" cy="-52" r="4"/></g>`).join('')}`
  });

  // 4 — Kır: Julia ile ilk buluşma
  const country = svg({
    sky: ['#6a9ac0', '#a8c8d8', '#e8ecd8'],
    vignette: .4, grain: .14,
    body: id => `
      ${glow(id, 620, 100, 180, '#fff8d8', .7)}
      <path d="M0 240 Q200 200 400 230 T800 220 V400 H0 Z" fill="#6a9a4a"/>
      <path d="M0 290 Q300 270 800 300 V400 H0 Z" fill="#4a7a3a"/>
      ${Array.from({ length: 7 }, (_, i) => `<g transform="translate(${60 + i * 110} ${250 + (i % 2) * 20})"><rect x="-4" y="-50" width="8" height="50" fill="#3a2a1a"/><circle cy="-70" r="${34 + (i % 3) * 6}" fill="#3a6a2a"/></g>`).join('')}
      ${Array.from({ length: 30 }, (_, i) => `<circle cx="${(i * 47) % 800}" cy="${320 + (i * 13) % 70}" r="3" fill="${i % 2 ? '#e8d84a' : '#e8e0f0'}"/>`).join('')}
      ${figure(370, 330, 1.6, '#3a4a5a')}${figure(420, 332, 1.5, '#2a2a2a', { dress: true, shawl: '#a83a2a' })}
      <g transform="translate(520 160)" fill="#2a2a2a"><path d="M0 0 q8 -8 16 0 q-8 4 -16 0z"/></g>`
  });

  // 5 — Bay Charrington’ın dükkânının üstündeki oda
  const room = svg({
    sky: ['#3a2a1a', '#5a4028', '#3a2a1a'],
    vignette: .6,
    body: id => `
      ${glow(id, 400, 180, 260, '#ffc070', .45)}
      <rect x="520" y="70" width="140" height="140" fill="#8aa8c0" opacity=".6"/><line x1="590" y1="70" x2="590" y2="210" stroke="#3a2a1a" stroke-width="5"/><line x1="520" y1="140" x2="660" y2="140" stroke="#3a2a1a" stroke-width="5"/>
      <rect x="120" y="110" width="90" height="110" fill="#6a5030"/><rect x="128" y="118" width="74" height="94" fill="#c8a878" opacity=".5"/>
      <path d="M220 270 H540 V300 H220 Z" fill="#e8dcc4"/><rect x="220" y="250" width="60" height="22" rx="6" fill="#fff4e4"/>
      <rect x="220" y="300" width="10" height="40" fill="#3a2a1a"/><rect x="530" y="300" width="10" height="40" fill="#3a2a1a"/>
      <g transform="translate(400 230)"><path d="M-14 0 Q-14 -20 0 -24 Q14 -20 14 0 Z" fill="#e8f0f4" opacity=".85"/><ellipse cy="0" rx="16" ry="4" fill="#c8d8e0"/><circle cy="-10" r="5" fill="#e88a8a" opacity=".7"/></g>
      <rect x="390" y="230" width="20" height="40" fill="#5a4028"/>
      ${seated(470, 272, 1.3, '#2a2a2a', true)}${seated(320, 272, 1.3, '#3a4a5a')}`
  });

  // 6 — O’Brien ve Kardeşlik’in kitabı
  const obrien = svg({
    sky: ['#14161e', '#1e222e', '#14161e'],
    vignette: .65,
    body: id => `
      ${screen(560, 60, 160, 110, id)}
      <line x1="610" y1="170" x2="680" y2="90" stroke="#a83a2a" stroke-width="6"/>
      ${glow(id, 300, 200, 220, '#d8c8a8', .3)}
      <path d="M120 270 H520 L540 290 H100 Z" fill="#2a2a32"/>
      <rect x="260" y="246" width="80" height="24" fill="#2a2018"/><rect x="264" y="248" width="72" height="4" fill="#8a7a5a"/>
      ${[[180, '#3a4a5a'], [420, '#3a4a5a']].map(([x, c]) => seated(x, 272, 1.6, c, x > 300)).join('')}
      ${figure(520, 300, 2, '#0a0a0e', {})}`
  });

  // 7 — Sevgi Bakanlığı ve 101 numaralı oda
  const room101 = svg({
    sky: ['#c8ccd0', '#a8acb0', '#7a7e82'],
    vignette: .8, grain: .25,
    body: id => `
      <polygon points="0,0 200,80 200,320 0,400" fill="#9a9ea2"/><polygon points="800,0 600,80 600,320 800,400" fill="#9a9ea2"/>
      <polygon points="200,320 600,320 800,400 0,400" fill="#6a6e72"/>
      <rect x="200" y="80" width="400" height="240" fill="#b8bcc0"/>
      <rect x="370" y="90" width="60" height="20" fill="#fff"/>${glow(id, 400, 100, 200, '#ffffff', .8)}
      <polygon points="370,110 430,110 560,320 240,320" fill="#fff" opacity=".18"/>
      <rect x="370" y="240" width="60" height="80" fill="#3a3e42"/><rect x="350" y="200" width="100" height="60" fill="#5a5e62"/>
      ${seated(400, 210, 1.6, '#2a2e32')}
      <rect x="470" y="260" width="50" height="40" fill="none" stroke="#2a2e32" stroke-width="3"/>${Array.from({ length: 4 }, (_, k) => `<line x1="${478 + k * 11}" y1="260" x2="${478 + k * 11}" y2="300" stroke="#2a2e32" stroke-width="2"/>`).join('')}`
  });

  // 8 — Kestane Ağacı Kahvesi
  const cafe = svg({
    sky: ['#2a2a24', '#3a3a30', '#2a2a24'],
    vignette: .7, grain: .22,
    body: id => `
      ${screen(300, 40, 200, 130, id)}${glow(id, 400, 110, 200, '#8ae8a8', .2)}
      <path d="M200 270 H600 L620 290 H180 Z" fill="#4a4030"/><rect x="390" y="290" width="20" height="70" fill="#2a2418"/>
      <g transform="translate(450 250)"><path d="M-10 0 L-8 20 H8 L10 0 Z" fill="#c8d8c0" opacity=".6"/></g>
      <g transform="translate(330 262)">${Array.from({ length: 8 }, (_, i) => `<rect x="${(i % 4) * 10}" y="${Math.floor(i / 4) * 10}" width="10" height="10" fill="${(i + Math.floor(i / 4)) % 2 ? '#1a1a14' : '#e8e0cc'}"/>`).join('')}</g>
      ${seated(260, 272, 1.7, '#3a4a5a')}`
  });

  window.SUMMARIES['1984'] = {
    pages: [
      {
        title: 'Büyük Birader Seni İzliyor',
        image: { svg: london, caption: 'Okyanusya’nın başkenti Londra: harabeler, posterler ve devasa bakanlıklar.' },
        text: [
          'Nisan ayında, saatlerin on üçü vurduğu soğuk ve aydınlık bir günde, Winston Smith rüzgârdan korunmak için başını eğerek Zafer Konakları’na girer. Yıl 1984’tür, ya da öyle olduğu sanılmaktadır, çünkü kimse artık tarihten emin değildir. Dünya, birbiriyle sürekli savaş hâlinde olan üç dev süper devlete bölünmüştür: Okyanusya, Avrasya ve Doğu Asya. Winston, Okyanusya’nın bir eyaleti olan Birinci Hava Pisti’nin, yani eskiden İngiltere denen yerin başkenti Londra’da yaşar.',
          'Her yer, bıyıklı ve güçlü bir adamın yüzünün yer aldığı devasa posterlerle kaplıdır. Posterlerin altında aynı uyarı yazılıdır: “Büyük Birader seni izliyor.” Bu sadece bir slogan değildir. Her evde, her işyerinde ve her sokakta “tele-ekran” adı verilen cihazlar vardır. Bu ekranlar bir yandan sürekli propaganda yayını yaparken, bir yandan da insanların her hareketini, her sözünü ve hatta yüz ifadelerini izler.',
          'Okyanusya, Parti tarafından yönetilmektedir. Partinin üç büyük sloganı her yerde yazılıdır: Savaş barıştır, özgürlük köleliktir, cehalet güçtür. Ülkede dört büyük bakanlık vardır, ama her birinin adı, yaptığı işin tam tersini anlatır. Barış Bakanlığı savaşı, Bolluk Bakanlığı kıtlığı, Sevgi Bakanlığı işkenceyi, Hakikat Bakanlığı ise yalanları yönetir. Orwell, daha ilk sayfalarda okuru, dilin bile tersine çevrildiği bu korkunç dünyanın içine sokar.'
        ]
      },
      {
        title: 'Geçmişi Yeniden Yazmak',
        image: { svg: ministry, caption: 'Hakikat Bakanlığı’nda bir masa, tele-ekran ve “bellek deliği”.' },
        text: [
          'Winston, Hakikat Bakanlığı’nın Kayıtlar Dairesi’nde çalışır. İşi, geçmişi yeniden yazmaktır. Eski gazeteleri, kitapları ve belgeleri, Partinin o günkü çizgisine uyacak şekilde değiştirir. Eğer Büyük Birader bir zamanlar yanlış bir tahminde bulunduysa, Winston o eski haberi düzeltir ve tahmini doğru gösterir. Eğer bir kişi Partinin gözünden düşmüşse, onun adı bütün kayıtlardan silinir ve o kişi hiç var olmamış gibi olur.',
          'Değiştirilen eski belgeler, “bellek deliği” denen bir boruya atılarak yakılır. Böylece Parti geçmiş üzerinde mutlak bir kontrol kurar. Partinin bir başka sloganı bunu açıkça ifade eder: Geçmişi kontrol eden geleceği, bugünü kontrol eden geçmişi kontrol eder. Okyanusya bir gün Avrasya ile savaştaysa, her zaman Avrasya ile savaşmış olduğu kabul edilir. Ertesi gün düşman değişirse, bütün kayıtlar da değişir.',
          'Parti, insanların düşünme biçimini de kontrol etmek için “Yenisöylem” adında yeni bir dil geliştirmektedir. Bu dilin amacı, kelime sayısını sürekli azaltarak, insanların Partiye karşı düşünce üretmesini imkânsız hâle getirmektir. Eğer “özgürlük” ya da “isyan” gibi kelimeler ortadan kalkarsa, bu kavramlar da zamanla insanların zihninden silinecektir. Parti, insanlardan aynı anda birbirine zıt iki fikre inanmayı, yani “çiftdüşün” denen zihinsel bir disiplini de bekler.'
        ]
      },
      {
        title: 'Gizli Bir Günlük',
        image: { svg: hate, caption: 'İki Dakika Nefret: ekrandaki düşmana bağıran kalabalık.' },
        text: [
          'Winston, içten içe Partiden nefret etmektedir. Bir gün, evindeki tele-ekranın göremeyeceği küçük bir köşeye oturur ve eski bir dükkândan satın aldığı boş bir deftere günlük yazmaya başlar. Bu, Okyanusya’da ölümle cezalandırılabilecek bir suçtur. Winston, kendini tutamadan defterin sayfalarına defalarca aynı cümleyi yazar: “Kahrolsun Büyük Birader.” Artık geri dönüşü olmadığını, er ya da geç Düşünce Polisi tarafından yakalanacağını bilmektedir.',
          'Her gün, bütün çalışanlar işlerini bırakıp “İki Dakika Nefret” denen törene katılmak zorundadır. Tele-ekranda halkın baş düşmanı Emmanuel Goldstein’ın yüzü belirir ve kalabalık ona bağırarak, nefret kusarak çılgınca tepki verir. Winston bile kendini bu toplu histeriye kapılmaktan alamaz. Ama aynı zamanda bu nefretin ne kadar kolay yönlendirilebildiğini fark eder.',
          'Bu törenlerden birinde Winston, iki kişinin dikkatini çeker. Biri, Partinin iç çemberinden, kendisine sanki gizlice anlayış gösteren bir bakış fırlatan O’Brien adında yüksek rütbeli bir yöneticidir. Diğeri ise koyu saçlı, genç bir kadındır. Winston bu kadından hem korkar hem de hoşlanır, çünkü onun Düşünce Polisi için çalışan bir casus olduğundan şüphelenir.'
        ]
      },
      {
        title: 'Julia',
        image: { svg: country, caption: 'Londra’nın dışında, tele-ekranların ulaşamadığı yeşil bir korulukta ilk buluşma.' },
        text: [
          'Bir gün koridorda yürürken, koyu saçlı genç kadın Winston’ın önünde düşer. Winston ona yardım etmek için elini uzattığında, kadın avucuna gizlice küçük bir kâğıt parçası bırakır. Winston kâğıdı tele-ekranın göremeyeceği bir anda açar ve şaşkınlıkla üzerindeki üç kelimeyi okur: “Seni seviyorum.” Kadının adı Julia’dır ve o da Partiden nefret etmektedir.',
          'Julia, Winston’dan farklı bir isyankârdır. Partinin büyük ideolojik meseleleriyle değil, kendi küçük özgürlükleriyle ilgilenir. Kuralları kırmaktan, yasak şeylerin tadını çıkarmaktan ve hayatın küçük zevklerinden hoşlanır. Ona göre insanın bu sistemi yenmesinin yolu, gizlice de olsa kendi hayatını yaşamaktır.',
          'Winston ve Julia, Londra’nın dışında, tele-ekranların ve mikrofonların ulaşamadığı yeşil bir korulukta buluşurlar. Kuşların öttüğü bu yerde, Winston uzun zamandır ilk kez kendini özgür hisseder. Parti, insanların aşkını ve cinselliğini bile kontrol etmeye çalıştığı için, onların bu ilişkisi kendi başına bir siyasi başkaldırıdır.'
        ]
      },
      {
        title: 'Dükkânın Üstündeki Oda',
        image: { svg: room, caption: 'Bay Charrington’ın antika dükkânının üstünde, tele-ekransız küçük bir oda.' },
        text: [
          'Winston ve Julia’nın buluşmaları zamanla daha sık ve daha tehlikeli hâle gelir. Winston, günlüğünü satın aldığı eski antika dükkânının sahibi olan yaşlı Bay Charrington’dan, dükkânın üstündeki küçük odayı kiralar. Odada eski mobilyalar, bir şömine ve Winston’ın büyük bir merakla baktığı cam bir kâğıt ağırlığı vardır. Bu odada tele-ekran yoktur, ya da öyle olduğuna inanırlar.',
          'Bu küçük oda, onlar için kendi küçük dünyalarıdır. Burada gerçek kahve içer, gerçek çikolata yer ve Partinin yasakladığı şeyleri konuşurlar. Julia, yasak bir şekilde makyaj yapar ve güzel bir elbise giyer. Pencerenin önünde çamaşır asan iri yapılı bir proleter kadının şarkısını dinlerler. Winston, eğer bir umut varsa, bunun nüfusun büyük çoğunluğunu oluşturan ama Partinin önemsemediği bu “proleterlerde” olduğunu düşünür.',
          'Ama Winston, bu mutluluğun uzun sürmeyeceğini içten içe bilir. İkisi de bir gün yakalanacaklarını, ayrılacaklarını ve birbirlerine ihanet etmeye zorlanacaklarını konuşurlar. Julia, Partinin onlara her şeyi yaptırabileceğini, ama kalplerinin içindekini değiştiremeyeceğini söyler. Bu inanç, romanın en acı sınavına dönüşecektir.'
        ]
      },
      {
        title: 'Kardeşlik ve Yakalanma',
        image: { svg: obrien, caption: 'O’Brien’ın dairesi: kapatılabilen bir tele-ekran ve yasak bir kitap.' },
        text: [
          'Bir gün O’Brien, Winston’a yaklaşır ve onu evine davet eder. Winston ve Julia, O’Brien’ın lüks dairesine gittiklerinde, onun tele-ekranı kapatabildiğini görünce şaşırırlar. O’Brien, Partiye karşı mücadele eden gizli bir örgüt olan Kardeşlik’in üyesi olduğunu söyler. Winston ve Julia, Partiyi yıkmak için her şeyi yapmaya, hatta hayatlarını vermeye hazır olduklarına yemin ederler. Ama birbirlerinden ayrılmayı kabul etmezler.',
          'O’Brien, Winston’a Emmanuel Goldstein’ın yazdığı söylenen yasak bir kitap verir. Winston, dükkânın üstündeki odada bu kitabı okumaya başlar. Kitap, Partinin gücünü nasıl koruduğunu, sürekli savaşın ekonomik kaynakları tüketerek halkı yoksul ve itaatkâr tutmaya nasıl yaradığını ve toplumun neden her zaman üst, orta ve alt sınıflara bölündüğünü açıklar.',
          'Ama bir akşam, odada Julia ile birlikteyken, duvardaki eski resmin arkasından bir ses yükselir. Resmin arkasında gizli bir tele-ekran vardır. Oda bir anda Düşünce Polisi’nin askerleriyle dolar. Winston, dükkân sahibi Bay Charrington’ın aslında Düşünce Polisi’nin bir ajanı olduğunu dehşetle fark eder. Cam kâğıt ağırlığı yere düşüp paramparça olur. Winston ve Julia birbirlerinden koparılarak götürülür.'
        ]
      },
      {
        title: 'Sevgi Bakanlığı',
        image: { svg: room101, caption: 'Hiç sönmeyen ışıkların yandığı, karanlığın olmadığı yer.' },
        text: [
          'Winston, penceresiz, ışıkların asla sönmediği Sevgi Bakanlığı’nda haftalarca, belki de aylarca sorguya çekilir. Ona işkence yapan kişi, güvendiği O’Brien’dan başkası değildir. O’Brien, aslında Kardeşlik’in hiçbir zaman bu şekilde var olmadığını ya da onun bir parçası olmadığını, Winston’ı yıllardır izlediklerini anlatır. Goldstein’ın kitabını bile kendisinin yazdığını söyler.',
          'O’Brien’ın amacı, Winston’ı sadece itiraf ettirmek değil, onun zihnini tamamen değiştirmektir. Elektrik şoklarıyla ona işkence yaparken, dört parmağını gösterip Winston’dan beş parmak gördüğüne gerçekten inanmasını ister. Parti eğer ikiyle ikinin beş ettiğini söylüyorsa, Winston da buna yürekten inanmak zorundadır. O’Brien, Partinin iktidarı başka bir amaç için değil, sadece iktidar için istediğini, geleceğin bir insan yüzünü sonsuza dek ezen bir çizme olduğunu açıklar.',
          'Winston yavaş yavaş direncini kaybeder. Ama içinde hâlâ teslim olmayan bir şey kalmıştır: Julia’ya olan sevgisi. Bu yüzden O’Brien onu, en büyük korkusuyla yüz yüze geldiği yer olan 101 numaralı odaya götürür. Winston’ın en büyük korkusu farelerdir. Yüzüne fareler dolu bir kafes yaklaştırıldığında, Winston son direncini de kaybeder ve bu işkencenin Julia’ya yapılması için bağırır. Böylece Parti, onun içindeki son özgür parçayı da yok etmiş olur.'
        ]
      },
      {
        title: 'Kestane Ağacı Kahvesi',
        image: { svg: cafe, caption: 'Tele-ekranın altında, yalnız bir masada bir satranç tahtası.' },
        text: [
          'Winston serbest bırakılır. Artık zararsız biridir. Günlerini, gözden düşmüş Parti üyelerinin gittiği Kestane Ağacı Kahvesi’nde, tek başına cin içerek ve satranç problemleri çözerek geçirir. Partide önemsiz bir işe verilmiştir. Bedeni yorgun, yüzü yaşlanmış, zihni ise boşalmıştır.',
          'Bir gün parkta Julia ile karşılaşır. İkisi de değişmiştir. Birbirlerine ihanet ettiklerini itiraf ederler ve aralarındaki sevginin artık yok olduğunu sessizce kabul ederler. Bir daha görüşmek için sözde bir istek dile getirirler, ama ikisi de bunun gerçekleşmeyeceğini bilir. Parti, onların kalplerindeki duyguyu da sonunda değiştirmeyi başarmıştır.',
          'Romanın son sahnesinde, tele-ekrandan Okyanusya’nın büyük bir zafer kazandığı haberi yükselir. Winston, Büyük Birader’in yüzüne bakar ve gözlerinden yaşlar süzülür. Mücadele bitmiştir. Orwell’ın unutulmaz son cümlesinde anlatıldığı gibi, Winston artık Büyük Birader’i sevmektedir. 1984, totaliter iktidarın yalnızca bedenleri değil, zihinleri ve kalpleri de ele geçirebileceğine dair yazılmış en güçlü uyarılardan biri olarak bugün de geçerliliğini korur.'
        ]
      }
    ]
  };
})();
