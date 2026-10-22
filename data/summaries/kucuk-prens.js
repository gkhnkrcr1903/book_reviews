// Küçük Prens — Antoine de Saint-Exupéry (1943)
// Sahneler data/scenes.js yardımcılarıyla çizilir; ileride image.src ile gerçek çizimlerle değiştirilebilir.
(() => {
  const { svg, glow, skyline, figure, seated, streaks, dots } = window.Scene;

  // Küçük prens: sarı saçlı, uzun atkılı çocuk
  const prince = (x, y, s, scarf = '#e8c83a') => `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-10 -44 Q0 -48 10 -44 L14 -10 H-14 Z" fill="#5a9a5a"/><rect x="-9" y="-12" width="6" height="12" fill="#5a9a5a"/><rect x="3" y="-12" width="6" height="12" fill="#5a9a5a"/>
    <circle cx="0" cy="-54" r="9" fill="#f4d8b8"/><path d="M-10 -58 l4 -10 l3 7 l3 -9 l3 8 l4 -8 l2 10 z" fill="#f4c83a"/>
    <path d="M6 -44 Q30 -50 44 -36 Q30 -40 8 -38 Z" fill="${scarf}"/></g>`;
  const planet = (x, y, r, c, id) => `${glow(id, x, y, r * 1.6, c, .35)}<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/><path d="M${x - r * .7} ${y - r * .2} q${r * .3} -${r * .2} ${r * .6} 0" stroke="#000" stroke-width="2" fill="none" opacity=".15"/>`;
  const rose = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><line x1="0" y1="0" x2="0" y2="-30" stroke="#3a7a3a" stroke-width="3"/><path d="M0 -14 q-10 -4 -12 -12 q8 2 12 8" fill="#3a7a3a"/>
    <path d="M-9 -30 Q-12 -46 0 -48 Q12 -46 9 -30 Q0 -24 -9 -30 Z" fill="#d83a4a"/><path d="M-4 -40 Q0 -46 4 -40" stroke="#a82a3a" stroke-width="1.5" fill="none"/></g>`;

  // 1 — Fil yutan boa yılanı çizimi
  const drawing = svg({
    sky: ['#f4ecd8', '#f0e4cc', '#e8dcc0'],
    vignette: .25, grain: .14,
    body: id => `
      <rect x="0" y="0" width="800" height="400" fill="#fbf6e8"/>
      <g transform="translate(150 260)"><path d="M0 0 Q30 -80 120 -90 Q200 -94 240 -40 Q260 -10 300 0 Z" fill="#8a6a4a" stroke="#3a2a1a" stroke-width="3"/><path d="M270 -6 q10 -6 20 0" stroke="#3a2a1a" stroke-width="2" fill="none"/></g>
      <g transform="translate(510 260)"><path d="M0 0 Q30 -80 120 -90 Q200 -94 240 -40 Q260 -10 300 0 Z" fill="none" stroke="#3a2a1a" stroke-width="3" stroke-dasharray="6 4"/>
        <g fill="#a8a8b0"><ellipse cx="130" cy="-36" rx="70" ry="34"/><path d="M190 -46 q30 0 30 30 l-8 0 q0 -20 -24 -22 z"/><rect x="80" y="-10" width="18" height="10"/><rect x="160" y="-10" width="18" height="10"/><ellipse cx="96" cy="-48" rx="12" ry="18" fill="#c8c8d0"/></g></g>
      <rect y="300" width="800" height="100" fill="#e8dcc0"/>
      ${Array.from({ length: 6 }, (_, i) => `<path d="M${80 + i * 120} 340 q20 -8 40 0" stroke="#c8b898" stroke-width="2" fill="none"/>`).join('')}`
  });

  // 2 — Sahra’da düşen uçak ve küçük prens
  const desert = svg({
    sky: ['#04081a', '#0e1838', '#2a3060'],
    vignette: .55,
    body: id => `
      ${dots(7, 260, '#ffffff', 1.4, .95, 0, 240)}
      ${glow(id, 640, 70, 70, '#e8eeff', .5)}<path d="M630 50 a24 24 0 1 0 22 34 a20 20 0 1 1 -22 -34" fill="#f4f6ff"/>
      <path d="M0 270 Q200 230 400 260 T800 250 V400 H0 Z" fill="#c8a060"/><path d="M0 320 Q300 290 800 320 V400 H0 Z" fill="#a8803a"/>
      <g transform="translate(250 290) rotate(-8)" fill="#d8d0c0"><rect x="-70" y="-14" width="140" height="22" rx="10"/><rect x="-20" y="-30" width="60" height="6"/><rect x="-110" y="-4" width="60" height="8" transform="rotate(14 -80 0)"/><rect x="60" y="-24" width="12" height="20"/></g>
      ${figure(340, 330, 1.4, '#3a3a4a', {})}
      ${prince(460, 330, 1.4)}`
  });

  // 3 — Asteroit B-612: üç volkan, baobablar ve gül
  const asteroid = svg({
    sky: ['#0a0a24', '#16163a', '#1e2050'],
    vignette: .5,
    body: id => `
      ${dots(13, 240, '#fff', 1.3, .9)}
      ${planet(400, 330, 150, '#d8a86a', id)}
      <g transform="translate(400 330)">
        <path d="M-120 -88 l16 -30 l16 30 z" fill="#8a5a3a"/><path d="M-90 -110 l14 -26 l14 26 z" fill="#8a5a3a"/><path d="M110 -96 l16 -30 l16 30 z" fill="#6a4a3a"/>
        <path d="M-104 -118 q-4 -14 4 -22" stroke="#c8c8c8" stroke-width="3" fill="none" opacity=".6"/>
        <g transform="translate(60 -140)"><rect x="-4" y="-20" width="8" height="20" fill="#3a5a2a"/><circle cy="-26" r="14" fill="#4a7a3a"/></g>
        <g transform="translate(-40 -148)"><path d="M-16 0 Q-20 -20 0 -24 Q20 -20 16 0 Z" fill="none" stroke="#e8f0f8" stroke-width="2" opacity=".7"/></g>
      </g>
      ${rose(360, 182, 1.3)}${prince(430, 186, 1.3)}`
  });

  // 4 — Gezegenler: kral, kendini beğenmiş, ayyaş, iş adamı, fenerci
  const planets = svg({
    sky: ['#06061a', '#0e0e2e', '#16163e'],
    vignette: .5,
    body: id => `
      ${dots(23, 220, '#fff', 1.3, .9)}
      ${[[110, 170, 60, '#a86a8a'], [260, 270, 50, '#6a8ab0'], [400, 140, 46, '#8a7a5a'], [540, 270, 54, '#5a8a6a'], [690, 160, 58, '#c8a85a']].map(([x, y, r, c]) => planet(x, y, r, c, id)).join('')}
      <g transform="translate(110 112)"><path d="M-30 0 Q0 -40 30 0 Z" fill="#a82a3a"/><path d="M-10 -26 l4 -10 l6 6 l6 -6 l4 10 z" fill="#d9a83a"/></g>
      <g transform="translate(260 222)"><path d="M-10 0 V-24 H10 V0 Z" fill="#3a2a5a"/><rect x="-16" y="-30" width="32" height="6" fill="#3a2a5a"/></g>
      <g transform="translate(400 96)"><rect x="-12" y="-10" width="24" height="10" fill="#5a3a2a"/>${[-8, -2, 4].map(dx => `<rect x="${dx}" y="-24" width="5" height="14" rx="2" fill="#3a6a3a"/>`).join('')}</g>
      <g transform="translate(540 218)">${Array.from({ length: 8 }, (_, k) => `<rect x="${-20 + (k % 4) * 10}" y="${-8 - Math.floor(k / 4) * 6}" width="8" height="5" fill="#e8dcc4"/>`).join('')}</g>
      <g transform="translate(690 104)"><rect x="-2" y="-30" width="4" height="30" fill="#3a3a3a"/>${glow(id, 690, 70, 30, '#ffe08a', .9)}<circle cx="0" cy="-34" r="6" fill="#ffe08a"/></g>
      ${prince(400, 380, .9)}`
  });

  // 5 — Dünya’da gül bahçesi
  const roses = svg({
    sky: ['#f4dcc0', '#f8e8d4', '#fcf4e8'],
    vignette: .3, grain: .1,
    body: id => `
      ${glow(id, 640, 90, 160, '#fff8e8', .7)}
      <path d="M0 230 Q400 210 800 230 V400 H0 Z" fill="#8ab86a"/>
      ${Array.from({ length: 50 }, (_, i) => rose(20 + (i % 13) * 62, 250 + Math.floor(i / 13) * 40, .9 + Math.floor(i / 13) * .2)).join('')}
      ${prince(400, 380, 1.6)}`
  });

  // 6 — Tilki ve buğday tarlası
  const fox = svg({
    sky: ['#e8b870', '#f4d498', '#f8e8c0'],
    vignette: .4, grain: .14,
    body: id => `
      ${glow(id, 620, 120, 180, '#fff4d0', .7)}
      <rect y="210" width="800" height="190" fill="#d8a84a"/>
      ${Array.from({ length: 140 }, (_, i) => { const x = (i * 53) % 820, y = 220 + ((i * 37) % 160); return `<line x1="${x}" y1="${y}" x2="${x + 2}" y2="${y - 20 - (y - 220) * .2}" stroke="${y > 320 ? '#8a5a14' : '#b8801e'}" stroke-width="2"/><ellipse cx="${x + 2}" cy="${y - 22 - (y - 220) * .2}" rx="2" ry="5" fill="${y > 320 ? '#8a5a14' : '#c8902a'}"/>`; }).join('')}
      <g transform="translate(470 340) scale(1.8)" fill="#d86a2a"><path d="M-24 -12 Q-20 -24 0 -24 Q16 -24 20 -28 L28 -40 L30 -28 L36 -24 L26 -18 Q22 -8 16 -8 V0 H12 V-6 H-14 V0 H-18 V-8 Z"/><path d="M-24 -14 Q-44 -10 -48 6 Q-34 0 -24 -6 Z"/><path d="M-48 6 l6 -6 l2 6 z" fill="#f4ecd8"/></g>
      ${prince(330, 350, 1.6)}`
  });

  // 7 — Çölde kuyu
  const well = svg({
    sky: ['#f4c080', '#f8d8a8', '#fcecd0'],
    vignette: .4, grain: .12,
    body: id => `
      ${glow(id, 400, 140, 260, '#fff4d8', .7)}
      <path d="M0 250 Q200 210 400 240 T800 230 V400 H0 Z" fill="#d8a860"/><path d="M0 320 Q300 290 800 320 V400 H0 Z" fill="#c09048"/>
      <g transform="translate(400 300)"><ellipse rx="60" ry="16" fill="#8a7a6a"/><rect x="-60" y="-50" width="120" height="50" fill="#a89a88"/><ellipse cy="-50" rx="60" ry="16" fill="#6a5a4a"/>
        <rect x="-56" y="-120" width="8" height="70" fill="#5a3a2a"/><rect x="48" y="-120" width="8" height="70" fill="#5a3a2a"/><rect x="-60" y="-124" width="120" height="8" fill="#5a3a2a"/><line x1="0" y1="-116" x2="0" y2="-70" stroke="#3a2a1a" stroke-width="2"/><rect x="-10" y="-74" width="20" height="16" fill="#8a6a4a"/></g>
      ${figure(300, 330, 1.6, '#3a3a4a', {})}${prince(500, 330, 1.4)}`
  });

  // 8 — Yıldızlar gülüyor: veda
  const stars = svg({
    sky: ['#02040e', '#08102a', '#141e44'],
    vignette: .5,
    body: id => `
      ${Array.from({ length: 90 }, (_, i) => { const x = (i * 97) % 800, y = (i * 53) % 230, r = .8 + (i % 4) * .6; return `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity="${.5 + (i % 3) * .2}"/>${i % 9 === 0 ? glow(id, x, y, 14, '#fff4c0', .8) : ''}`; }).join('')}
      <g transform="translate(400 80)"><circle r="10" fill="#fff8d8"/>${glow(id, 400, 80, 60, '#fff4c0', .7)}</g>
      <path d="M0 290 Q200 250 400 280 T800 270 V400 H0 Z" fill="#1a1a2a"/>
      <path d="M0 330 Q300 300 800 330 V400 H0 Z" fill="#12121e"/>
      <g transform="translate(400 296) rotate(-12)">${prince(0, 0, 1.4)}</g>
      <path d="M376 300 q10 -6 18 0" stroke="#e8c83a" stroke-width="3" fill="none"/>`
  });

  window.SUMMARIES['kucuk-prens'] = {
    pages: [
      {
        title: 'Altı Yaşında Bir Ressam',
        image: { svg: drawing, caption: 'Büyüklerin şapka sandığı çizim: bir fili yutmuş boa yılanı.' },
        text: [
          'Küçük Prens’in anlatıcısı, altı yaşındayken vahşi doğayı anlatan bir kitapta, avını bütün olarak yutan boa yılanlarının resmini görür. Bundan çok etkilenir ve ilk resmini çizer: bir fili yutmuş boa yılanı. Resmini büyüklere gösterip korkup korkmadıklarını sorar. Büyükler, bir şapkadan neden korksunlar ki, diye cevap verir.',
          'Küçük çocuk, büyüklerin anlaması için ikinci bir resim çizer ve bu kez boa yılanının içini, yani fili de gösterir. Ama büyükler ona resim yapmayı bırakıp coğrafyayla, tarihle, matematikle ve dilbilgisiyle ilgilenmesini öğütler. Böylece anlatıcı, ressamlık hayallerinden vazgeçer ve büyüyüp bir pilot olur. Hayatı boyunca, karşılaştığı her büyüğe o ilk resmini gösterir. Hepsi aynı cevabı verir: Bu bir şapka.',
          'Antoine de Saint-Exupéry, kitabın daha bu ilk sayfalarında temel bir fikri ortaya koyar. Büyükler, her şeyi rakamlarla, görünüşlerle ve pratik işlerle anlamaya çalışır. Çocuklar ise hayal gücüyle, kalpleriyle görürler. Küçük Prens, çocuklar için yazılmış gibi görünen, ama aslında içindeki çocuğu unutmuş bütün büyüklere seslenen bir masaldır.'
        ]
      },
      {
        title: 'Bana Bir Koyun Çiz',
        image: { svg: desert, caption: 'Sahra Çölü’nde düşen bir uçak, yıldızlı bir gece ve sarı saçlı küçük bir çocuk.' },
        text: [
          'Yıllar sonra anlatıcının uçağı, bir motor arızası yüzünden Sahra Çölü’nün ortasına düşer. Etrafında bin mil boyunca tek bir insan yoktur. Sadece bir haftalık içme suyu vardır ve uçağını tamir etmeye çalışır. İlk gece kumların üzerinde uyur. Sabah gün doğarken, ince bir sesin kendisine seslendiğini duyar: Lütfen, bana bir koyun çizer misin?',
          'Anlatıcı, karşısında altın sarısı saçları, uzun bir atkısı ve tuhaf bir ciddiyeti olan küçük bir çocuk görür. Bu, küçük prenstir. Anlatıcı, çocuğa koyun çizmeyi bilmediğini söyler ve ona tek bildiği resmi, fili yutmuş boa yılanını çizer. Çocuk, hiç düşünmeden onun bir fili yutmuş boa yılanı olduğunu söyler. Anlatıcı, hayatında ilk kez kendisini anlayan biriyle karşılaşmıştır.',
          'Küçük prens, anlatıcının çizdiği hiçbir koyunu beğenmez. Biri çok hastadır, diğeri bir koçtur, öbürü çok yaşlıdır. Sonunda anlatıcı, sabırsızlıkla üzerinde üç delik olan bir kutu çizer ve koyunun bu kutunun içinde olduğunu söyler. Küçük prensin yüzü aydınlanır. Tam istediği koyun budur. Anlatıcı, bu tuhaf çocuğun nereden geldiğini merak etmeye başlar.'
        ]
      },
      {
        title: 'B-612 Asteroiti ve Gül',
        image: { svg: asteroid, caption: 'Üç küçük volkan, filizlenen baobablar ve tek bir gül: küçük prensin gezegeni.' },
        text: [
          'Küçük prens, bir evden biraz daha büyük, küçücük bir gezegende yaşamaktadır. Anlatıcı, bu gezegenin B-612 adlı asteroit olduğunu düşünür. Bu asteroiti bir Türk gökbilimci keşfetmiş, ama geleneksel kıyafetleri içinde verdiği konferansta kimse ona inanmamıştır. Yıllar sonra aynı gökbilimci, Avrupa usulü bir takım elbiseyle aynı konferansı verdiğinde, herkes ona inanır.',
          'Küçük prensin gezegeninde üç küçük volkan vardır. İkisi faaldir ve sabah kahvaltısını ısıtmak için kullanışlıdır. Biri ise sönmüştür. Küçük prens her sabah volkanlarını temizler. Gezegeni korkunç bir tehlikeyle de karşı karşıyadır: baobab ağaçları. Bu ağaçların tohumları toprağın altında gizlenir ve fark edilmezse büyüyerek gezegeni parçalayabilir. Küçük prens, her gün baobab filizlerini özenle söker.',
          'Bir gün gezegenine, nereden geldiği bilinmeyen bir tohumdan güzel bir gül açar. Gül, son derece güzeldir, ama aynı zamanda kibirli, kaprisli ve talepkârdır. Küçük prens ona su verir, onu cam bir fanusla korur ve rüzgârdan saklar. Ama gülün sözleri ve kaprisleri onu yorar ve üzer. Sonunda gezegenini terk etmeye karar verir. Giderken gül, onu sevdiğini itiraf eder, ama gururu yüzünden ağladığını göstermez.'
        ]
      },
      {
        title: 'Büyüklerin Gezegenleri',
        image: { svg: planets, caption: 'Bir kral, bir kendini beğenmiş, bir ayyaş, bir iş adamı ve bir fenerci.' },
        text: [
          'Küçük prens, yolculuğu sırasında altı küçük gezegeni ziyaret eder. Her birinde, büyüklerin tuhaflıklarını temsil eden bir insanla karşılaşır. İlk gezegende, her şeye hükmettiğini sanan, ama tek bir tebaası bile olmayan bir kral vardır. Kral, ona sadece gerçekleştirilebilecek emirler verdiğini söyler. Örneğin güneşe, zaten batacağı saatte batmasını emreder.',
          'İkinci gezegende, herkesin kendisine hayran olmasını isteyen kendini beğenmiş bir adam yaşar. Üçüncü gezegende ise bir ayyaş vardır. Küçük prens ona neden içtiğini sorar. Ayyaş, utandığı için içtiğini söyler. Neden utandığını sorduğunda, içtiği için utandığını söyler. Dördüncü gezegende ise yıldızları sayan bir iş adamı vardır. Yıldızlara sahip olduğunu düşünür ve onları bir bankaya yatırmak için sayar, ama onlardan hiç keyif almaz.',
          'Beşinci gezegen, küçük prensin en çok sevdiği gezegendir. Bu gezegen o kadar küçüktür ki, bir fener ve bir fenerci zor sığar. Gezegen her dakika döndüğü için fenerci, her dakika feneri yakıp söndürmek zorundadır. Küçük prens, onun gülünç olduğunu, ama kendisinden başka bir şeyle ilgilendiği için diğerlerinden daha az saçma olduğunu düşünür. Altıncı gezegende ise hiç gezmediği yerlerin haritalarını yapan bir coğrafyacı vardır. Coğrafyacı ona, çiçeklerin “geçici” olduğunu söyler. Küçük prens, gülünü yalnız bıraktığı için ilk kez pişmanlık duyar.'
        ]
      },
      {
        title: 'Beş Bin Gül',
        image: { svg: roses, caption: 'Dünya’da bir bahçe dolusu gül ve şaşkınlık içindeki küçük prens.' },
        text: [
          'Coğrafyacının tavsiyesiyle küçük prens, yedinci gezegen olarak Dünya’ya gelir. Afrika çölüne düşer ve ilk olarak, altın renkli bir yılanla karşılaşır. Yılan, ona kendisinin herkesi geldiği yere gönderebileceğini söyler. Eğer bir gün kendi gezegenini çok özlerse, ona yardım edebileceğini ima eder.',
          'Küçük prens, çölde yürürken yüksek bir dağa tırmanır ve insanları arar, ama sadece kendi sesinin yankısını duyar. Bir gün, karşısına çiçekleri açmış koca bir gül bahçesi çıkar. Bahçede, tıpkı kendi gülüne benzeyen beş bin gül vardır. Küçük prens, büyük bir hayal kırıklığına uğrar. Gülü ona, kendisinin evrende tek olduğunu söylemişti.',
          'Küçük prens, çimenlerin üzerine uzanır ve ağlamaya başlar. Kendisinin sıradan bir gülü, üç küçük volkanı ve bir tanesi belki de sonsuza kadar sönmüş bir gezegeni olduğunu, bunların onu büyük bir prens yapmadığını düşünür. Ama bu hayal kırıklığı, onu kitabın en önemli dersine hazırlayacaktır.'
        ]
      },
      {
        title: 'Tilki',
        image: { svg: fox, caption: 'Altın renkli buğday tarlasında küçük prens ve evcilleştirilmek isteyen tilki.' },
        text: [
          'Küçük prens ağlarken, bir elma ağacının altında bir tilki belirir. Küçük prens, ondan kendisiyle oynamasını ister. Ama tilki, evcilleştirilmediği için onunla oynayamayacağını söyler. Küçük prens, evcilleştirmenin ne demek olduğunu sorar. Tilki, bunun bağ kurmak demek olduğunu açıklar. Şu an küçük prens onun için yüz bin çocuktan farksız bir çocuktur, kendisi de onun için yüz bin tilkiden farksız bir tilki. Ama eğer onu evcilleştirirse, birbirlerine ihtiyaç duyacaklar ve birbirleri için dünyada tek olacaklardır.',
          'Tilki, küçük prense evcilleştirmenin sabır istediğini öğretir. Her gün aynı saatte gelmesini, önce uzağına oturmasını ve her gün biraz daha yakına yaklaşmasını ister. Tilki, buğday yemediğini, bu yüzden buğday tarlalarının ona hiçbir şey ifade etmediğini söyler. Ama küçük prensin saçları altın renginde olduğu için, eğer onu evcilleştirirse, altın sarısı buğdaylar ona hep onu hatırlatacak ve tarlalardaki rüzgârın sesini sevecektir.',
          'Küçük prens, tilkiyi evcilleştirir. Ayrılık zamanı geldiğinde tilki ağlar, ama pişman olmadığını söyler. Küçük prense, bahçedeki gülleri tekrar görmesini öğütler. Küçük prens, güllerin hiçbirinin kendi gülüne benzemediğini anlar, çünkü kendi gülüne zaman ayırmış, onu sevmiş ve ona bakmıştır. Tilki ona, kitabın en ünlü sırrını verir: İnsan ancak kalbiyle iyi görür, asıl önemli olan gözle görünmez.'
        ]
      },
      {
        title: 'Çölde Bir Kuyu',
        image: { svg: well, caption: 'Kumların ortasında, gün doğarken bulunan eski bir kuyu.' },
        text: [
          'Anlatıcı, küçük prensin hikâyesini dinlerken, uçağının tamiri bir türlü bitmez ve suyu da tükenir. Küçük prens, ona birlikte bir kuyu aramalarını önerir. Anlatıcı, uçsuz bucaksız çölde bir kuyu bulmanın saçma olduğunu düşünür, ama küçük prensle birlikte yürümeye başlar. Saatlerce yürürler. Küçük prens yorulunca anlatıcı onu kucağına alır.',
          'Yürürken küçük prens, çölü güzelleştiren şeyin bir yerlerde gizli bir kuyu olduğunu söyler. Anlatıcı, bir evi, bir yıldızı ya da bir çölü güzel yapan şeyin göze görünmeyen bir şey olduğunu anlar. Kucağında uyuyan küçük prensin, kırılgan bir hazine gibi olduğunu, onu en çok etkileyen şeyin de bir çiçeğe olan sadakati olduğunu düşünür.',
          'Gün doğarken, sanki bir köydeymiş gibi, makarası ve kovasıyla eski bir kuyu bulurlar. Anlatıcı kovayı çeker ve küçük prense su verir. Bu su, sıradan bir su değildir. Yıldızların altında yapılan yürüyüşten, makaranın şarkısından ve kollarının çabasından doğmuştur. Küçük prens, insanların bir bahçede beş bin gül yetiştirdiğini, ama aradıklarını bulamadığını, oysa aradıkları şeyin tek bir gülde ya da biraz suda bulunabileceğini söyler.'
        ]
      },
      {
        title: 'Yıldızların Kahkahası',
        image: { svg: stars, caption: 'Çölde, yıldızların altında, kumların üzerine yavaşça düşen küçük prens.' },
        text: [
          'Küçük prens, Dünya’ya gelişinin birinci yıl dönümünde, ilk geldiği yere dönmek istediğini söyler. Anlatıcı, onun altın renkli yılanla konuştuğunu duyar ve dehşete düşer. Küçük prens, gülüne karşı sorumlu olduğunu ve gezegenine dönmek zorunda olduğunu söyler. Ama bedeni bu yolculuk için çok ağırdır. Bu yüzden yılanın yardımına ihtiyacı vardır.',
          'Küçük prens, anlatıcıya bir hediye bırakmak ister. Ona, geceleri gökyüzüne baktığında, yıldızlardan birinde kendisinin yaşadığını ve güldüğünü hayal etmesini söyler. Böylece bütün yıldızlar, anlatıcı için gülen yıldızlar olacaktır. Anlatıcı, onu bu yolculuktan vazgeçirmeye çalışır, ama küçük prens kararlıdır.',
          'O gece, ayın ışığında, yılan küçük prensin bileğini ısırır. Küçük prens, bir ağaç gibi, sessizce kumların üzerine düşer. Ertesi sabah anlatıcı, onun bedenini bulamaz. Uçağını tamir eder ve evine döner. Yıllar sonra bile geceleri yıldızlara bakar ve küçük prensin gülüne bakıp bakmadığını, koyunun gülü yiyip yemediğini düşünür. Kitabın sonunda okurlara bir ricada bulunur: Eğer bir gün çölde sarı saçlı, gülen bir çocukla karşılaşırlarsa, ona hemen haber vermelerini ister. Küçük Prens, sevginin, dostluğun ve sorumluluğun anlamını sade ama derin bir dille anlatan, dünyada en çok okunan kitaplardan biridir.'
        ]
      }
    ]
  };
})();
