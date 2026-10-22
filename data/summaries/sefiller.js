// Sefiller — Victor Hugo (1862)
// Sahneler data/scenes.js yardımcılarıyla çizilir; ileride image.src ile gerçek çizimlerle değiştirilebilir.
(() => {
  const { svg, glow, skyline, figure, seated, streaks, dots } = window.Scene;

  const candle = (x, y, s, id) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-10" y="0" width="20" height="8" fill="#c8a84a"/><rect x="-5" y="-40" width="10" height="40" fill="#f4ecd8"/><path d="M0 -40 q-6 -12 0 -22 q6 10 0 22" fill="#ffd070"/></g>${glow(id, x, y - 48 * s, 60 * s, '#fff0b0', .9)}`;
  const barricade = (x, y, w, c) => `<g fill="${c}">${Array.from({ length: 14 }, (_, i) => `<rect x="${x + (i * 37) % w}" y="${y - 20 - (i * 23) % 90}" width="${40 + (i * 13) % 40}" height="${16 + (i * 7) % 20}" transform="rotate(${(i * 29) % 40 - 20} ${x + (i * 37) % w + 20} ${y - 20 - (i * 23) % 90})"/>`).join('')}
    <circle cx="${x + w * .3}" cy="${y - 20}" r="30" fill="none" stroke="${c}" stroke-width="6"/><rect x="${x}" y="${y - 30}" width="${w}" height="30"/></g>`;

  // 1 — Valjean ve piskoposun gümüş şamdanları
  const bishop = svg({
    sky: ['#140c08', '#22160e', '#140c08'],
    vignette: .7,
    body: id => `
      ${glow(id, 400, 180, 280, '#ffb050', .45)}
      <path d="M200 260 H600 L620 280 H180 Z" fill="#4a2e1a"/><rect x="210" y="280" width="380" height="80" fill="#2a1a0e"/>
      ${candle(340, 252, 1.4, id)}${candle(460, 252, 1.4, id)}
      ${figure(250, 300, 2, '#0a0604', { hat: false })}
      ${figure(560, 300, 1.9, '#3a2a3a', { dress: true })}`
  });

  // 2 — Fantine ve fabrika kasabası
  const fantine = svg({
    sky: ['#4a4a52', '#7a7470', '#a89a88'],
    vignette: .6, grain: .2,
    body: id => `
      ${skyline({ y: 280, color: '#2a2622', seed: 62, lit: .08, minH: 70, maxH: 150, dome: false })}
      ${[180, 420, 640].map(x => `<rect x="${x}" y="120" width="20" height="160" fill="#2a2622"/><path d="M${x + 10} 120 q-30 -40 10 -80" stroke="#c8c0b8" stroke-width="20" fill="none" opacity=".2" filter="url(#${id}blur)"/>`).join('')}
      <rect y="280" width="800" height="120" fill="#3a3632"/>
      ${streaks(62, 160, '#d8d4d0', 24, -6, .3)}
      ${figure(400, 340, 1.8, '#1a1418', { dress: true, shawl: '#6a3a4a' })}`
  });

  // 3 — Thénardier’lerin hanı ve küçük Cosette
  const cosette = svg({
    sky: ['#0a1020', '#141c30', '#1a2236'],
    vignette: .6,
    body: id => `
      ${dots(4, 100, '#fff', 1.1, .8, 0, 180)}
      <path d="M0 260 Q400 240 800 260 V400 H0 Z" fill="#dfe6ee"/>
      ${Array.from({ length: 10 }, (_, i) => `<g transform="translate(${30 + i * 80} 250)"><rect x="-4" y="-70" width="8" height="70" fill="#0a1020"/><path d="M0 -110 l-34 50 h68 z" fill="#0e1424"/></g>`).join('')}
      <rect x="140" y="160" width="160" height="100" fill="#1a1410"/><polygon points="130,160 220,110 310,160" fill="#140e0a"/><rect x="170" y="190" width="40" height="30" fill="#ffc070"/>${glow(id, 190, 205, 60, '#ffc070', .5)}
      ${figure(460, 320, .95, '#2a2a3a', { dress: true })}<rect x="476" y="300" width="16" height="22" fill="#3a3a4a"/>
      ${figure(530, 320, 1.8, '#0a0e18', { hat: true })}
      ${dots(14, 140, '#ffffff', 1.4, .7)}`
  });

  // 4 — Paris sokakları ve Marius
  const paris = svg({
    sky: ['#2a1e30', '#6a4a5a', '#c8906a'],
    vignette: .45,
    body: id => `
      ${glow(id, 600, 220, 200, '#ffd8a0', .6)}
      <g fill="#2a1a24"><rect x="340" y="120" width="40" height="180"/><rect x="420" y="120" width="40" height="180"/><path d="M330 120 L400 60 L470 120 Z"/><rect x="380" y="150" width="40" height="150"/></g>
      ${skyline({ y: 300, color: '#1a1018', seed: 72, lit: .15, minH: 60, maxH: 130, dome: false })}
      <rect y="300" width="800" height="100" fill="#140c12"/>
      <path d="M0 330 Q400 310 800 330" stroke="#3a4a6a" stroke-width="22" fill="none" opacity=".7"/>
      ${figure(300, 360, 1.6, '#0a0608', { hat: true })}${figure(360, 362, 1.4, '#3a2a3a', { dress: true, shawl: '#e8dcc4' })}`
  });

  // 5 — Javert’in takibi
  const javert = svg({
    sky: ['#0a0c12', '#141820', '#1a1e28'],
    vignette: .7,
    body: id => `
      <rect x="0" y="0" width="200" height="400" fill="#0a0c10"/><rect x="600" y="0" width="200" height="400" fill="#0a0c10"/>
      <rect x="380" y="120" width="6" height="200" fill="#05060a"/>${glow(id, 383, 116, 120, '#ffd890', .6)}<path d="M370 116 h26 l-5 -20 h-16 z" fill="#05060a"/>
      <rect y="320" width="800" height="80" fill="#0e1016"/>
      <ellipse cx="383" cy="330" rx="120" ry="16" fill="#ffd890" opacity=".15"/>
      ${figure(500, 330, 1.8, '#000', { hat: true })}<path d="M500 330 L700 400 L580 400 Z" fill="#000" opacity=".4"/>
      ${figure(260, 330, 1.6, '#05060a', { hat: false })}${figure(230, 330, .9, '#05060a', { dress: true })}`
  });

  // 6 — 1832 barikatları
  const barricades = svg({
    sky: ['#1a0e0a', '#3a1a10', '#6a2a14'],
    vignette: .6,
    body: id => `
      ${skyline({ y: 300, color: '#120806', seed: 82, lit: .05, minH: 140, maxH: 240, dome: false })}
      ${glow(id, 400, 280, 260, '#ff7a3a', .45)}
      ${barricade(140, 330, 520, '#0a0504')}
      <line x1="440" y1="230" x2="440" y2="120" stroke="#0a0504" stroke-width="4"/><path d="M442 122 L520 140 L442 160 Z" fill="#a82a2a"/>
      ${[220, 300, 520, 590].map((x, i) => figure(x, 300 - (i % 2) * 10, 1.4, '#0a0504', { hat: i % 2 === 0 })).join('')}
      <path d="M300 200 q30 -60 -10 -120" stroke="#5a4a4a" stroke-width="30" fill="none" opacity=".3" filter="url(#${id}blur)"/>
      <rect y="330" width="800" height="70" fill="#0a0504"/>`
  });

  // 7 — Lağımlarda kaçış
  const sewers = svg({
    sky: ['#0a0e0a', '#141a12', '#0a0e0a'],
    vignette: .8,
    body: id => `
      <path d="M100 400 V160 Q400 -40 700 160 V400 Z" fill="#1a2018"/>
      <path d="M160 400 V180 Q400 10 640 180 V400 Z" fill="#0c100a"/>
      ${Array.from({ length: 8 }, (_, i) => `<path d="M${160 + i * 60} 180 v-30" stroke="#2a3226" stroke-width="2"/>`).join('')}
      <rect x="160" y="320" width="480" height="80" fill="#2a3a2a"/>
      ${Array.from({ length: 6 }, (_, i) => `<path d="M${180 + i * 80} 340 q20 -6 40 0" stroke="#5a7a5a" stroke-width="2" fill="none"/>`).join('')}
      ${glow(id, 400, 60, 80, '#c8e0b0', .5)}<rect x="380" y="40" width="40" height="10" fill="#8aa88a" opacity=".6"/>
      <g transform="translate(400 330) scale(1.8)" fill="#000"><path d="M-12 -48 Q0 -54 12 -48 L14 -12 H-14 Z"/><circle cx="0" cy="-60" r="9"/><path d="M-14 -48 Q-34 -50 -36 -36 L14 -40 Z"/></g>`
  });

  // 8 — Valjean’ın son anları
  const farewell = svg({
    sky: ['#1a120a', '#2a1c10', '#1a120a'],
    vignette: .65,
    body: id => `
      ${glow(id, 400, 200, 300, '#ffc070', .45)}
      ${candle(330, 150, 1.5, id)}${candle(470, 150, 1.5, id)}
      <rect x="280" y="160" width="240" height="10" fill="#4a2e1a"/>
      <path d="M180 270 H620 V300 H180 Z" fill="#e8dcc4"/><rect x="180" y="250" width="60" height="24" rx="6" fill="#fff4e4"/>
      <ellipse cx="226" cy="252" rx="22" ry="10" fill="#1a1410"/>
      ${figure(520, 300, 1.6, '#2a2a3a', { dress: true })}${figure(570, 300, 1.7, '#1a1410', {})}`
  });

  window.SUMMARIES['sefiller'] = {
    pages: [
      {
        title: 'Piskoposun Şamdanları',
        image: { svg: bishop, caption: 'Piskopos Myriel’in evinde mum ışığında bir akşam yemeği.' },
        text: [
          'Victor Hugo’nun büyük romanı, 1815 yılının Ekim ayında, Fransa’nın güneyindeki küçük Digne kasabasında başlar. Kasabaya, sırtında çantası, yüzünde yorgunluk ve öfke taşıyan bir adam gelir. Adı Jean Valjean’dır. Açlıktan ölmek üzere olan kız kardeşinin çocuklarını doyurmak için bir somun ekmek çaldığı için kürek cezasına çarptırılmış, kaçma girişimleri yüzünden cezası uzamış ve toplam on dokuz yıl hapis yatmıştır. Elindeki sarı kâğıt, onun eski bir mahkûm olduğunu herkese söyler ve hiçbir han ona kapısını açmaz.',
          'Sonunda kapısını çaldığı tek ev, kasabanın yaşlı ve iyi kalpli piskoposu Myriel’in evidir. Piskopos onu sofrasına oturtur, en güzel gümüş takımlarını çıkarır ve ona “Bayım” diye hitap eder. Ama hayatı boyunca ezilmiş ve nefretle dolmuş Valjean, gece yarısı uyanır, gümüş takımları çalar ve kaçar. Ertesi sabah jandarmalar onu yakalayıp piskoposun huzuruna getirir.',
          'Piskopos, jandarmalara gümüşleri Valjean’a kendisinin hediye ettiğini söyler. Üstelik ona, gümüş şamdanları da yanına almayı unuttuğunu hatırlatarak onları da verir. Jandarmalar gittikten sonra Valjean’a sessizce, bu gümüşleri dürüst bir adam olmak için kullanacağına söz verdiğini fısıldar. Bu beklenmedik merhamet, Valjean’ın kalbindeki buzları çözer. O andan itibaren bütün hayatını, bir zamanlar kendisine gösterilen bu iyiliğe layık olmaya adayacaktır.'
        ]
      },
      {
        title: 'Fantine',
        image: { svg: fantine, caption: 'Montreuil-sur-Mer’in fabrika bacaları ve yağmur altında yalnız bir kadın.' },
        text: [
          'Aradan birkaç yıl geçer. Valjean, Madeleine adını alarak kuzeydeki Montreuil-sur-Mer kasabasına yerleşmiştir. Siyah cam boncuk üretiminde geliştirdiği yeni bir yöntem sayesinde zengin olmuş, bir fabrika açmış ve kasabanın bütün yoksullarına iş vermiştir. Halk onu öylesine sever ki, sonunda belediye başkanı seçilir. Kimse, bu cömert ve sessiz adamın eski bir kürek mahkûmu olduğunu bilmez.',
          'Madeleine’in fabrikasında çalışan işçilerden biri, Fantine adında genç ve güzel bir kadındır. Fantine, Paris’te kendisini terk eden bir öğrenciden bir kız çocuğu, Cosette, doğurmuştur. İş bulabilmek için kızını yolda karşılaştığı Thénardier adındaki bir hancı ailesine bırakmış ve onlara her ay para göndermeye söz vermiştir. Ama fabrikadaki dedikoducu kadınlar onun gayrimeşru bir çocuğu olduğunu öğrenince, fabrika yöneticisi Fantine’i işten çıkarır. Madeleine’in bundan haberi olmaz.',
          'Thénardier’ler, Cosette’in hasta olduğunu söyleyerek Fantine’den sürekli daha fazla para ister. Fantine önce güzel saçlarını, sonra ön dişlerini satar ve sonunda sokağa düşer. Bir gece kendisine sataşan bir adama karşılık verdiği için tutuklanmak üzereyken, Madeleine olaya müdahale eder. Fantine’in başına gelenleri öğrendiğinde dehşete düşer, onu hastaneye yatırır ve kızını ona getireceğine söz verir.'
        ]
      },
      {
        title: 'Javert ve Bir Vicdan Fırtınası',
        image: { svg: cosette, caption: 'Karlı bir gecede, elindeki ağır kovayla ormandan dönen küçük Cosette.' },
        text: [
          'Kasabanın polis müfettişi Javert, kanuna tutkuyla bağlı, merhametten yoksun ama son derece dürüst bir adamdır. Bir hapishanede doğmuş ve kanunu tek gerçek iyilik olarak görmüştür. Javert, Madeleine’in fazla güçlü olduğunu, bir zamanlar kürek mahkûmu olarak tanıdığı Jean Valjean’a benzediğini fark eder. Ama bir gün Madeleine’e, gerçek Valjean’ın yakalandığını ve yakında mahkemeye çıkacağını söyleyerek ondan özür diler.',
          'Valjean, korkunç bir vicdan muhasebesiyle bütün geceyi geçirir. Eğer susarsa, masum bir adam onun yerine ömür boyu kürek cezasına çarptırılacak, ama o da zengin, saygın ve özgür kalacak, kasabadaki yüzlerce işçiyi korumaya devam edebilecektir. Konuşursa ise her şeyini kaybedecektir. Sonunda mahkemeye gider ve herkesin önünde kendisinin Jean Valjean olduğunu itiraf eder. Ardından Javert tarafından tutuklanır. Fantine, bu haberi duyduğu anda şoktan ölür.',
          'Valjean, kısa süre sonra hapisten kaçar. Fantine’e verdiği sözü tutmak için Thénardier’lerin hanının bulunduğu Montfermeil köyüne gider. Bir Noel gecesi, ormanın karanlığında, kendisinden ağır bir su kovasını taşıyan küçük ve korkmuş bir kız çocuğuyla karşılaşır. Bu, yıllardır Thénardier’ler tarafından hizmetçi gibi çalıştırılan, dövülen ve aç bırakılan Cosette’tir. Valjean, Thénardier’lere büyük bir para ödeyerek onu satın alır ve Paris’e götürür.'
        ]
      },
      {
        title: 'Paris ve Marius',
        image: { svg: paris, caption: 'Notre Dame’ın siluetinin önünde Lüksemburg Bahçesi’nde yürüyen iki genç.' },
        text: [
          'Valjean ve Cosette, Paris’te önce eski ve harap bir evde, ardından bir manastırda saklanarak yaşarlar. Valjean, Cosette’i kendi kızı gibi sever. Cosette ise onu babası olarak bilir ve yıllar içinde güzel, iyi kalpli bir genç kıza dönüşür. Javert ise Paris’e tayin edilmiştir ve Valjean’ın izini hâlâ sürmektedir.',
          'Roman bu noktada yeni bir kahramanla tanıştırır: Marius Pontmercy. Marius, Napoleon’un ordusunda savaşmış bir albayın oğludur, ama kralcı ve katı büyükbabası tarafından büyütülmüştür. Babasının kim olduğunu öğrendiğinde büyükbabasıyla kavga eder, evi terk eder ve Paris’in yoksul bir mahallesinde, hukuk öğrenimine devam ederken sefalet içinde yaşamaya başlar. Orada, cumhuriyet için mücadele eden idealist öğrencilerden oluşan bir gruba, “ABC Dostları”na katılır.',
          'Marius, Lüksemburg Bahçesi’nde her gün yaşlı bir adamla yürüyen genç bir kız görür ve ona ilk görüşte âşık olur. Bu kız Cosette’tir. Bu arada Marius’un yan dairesinde yaşayan sefil aile, adını değiştirmiş olan Thénardier’lerdir. Thénardier, Valjean’ı tuzağa düşürüp soymaya çalışır. Ama Javert baskın yapınca Valjean bir kez daha kaçmayı başarır. Thénardier’lerin kızı Éponine ise Marius’a umutsuzca âşıktır.'
        ]
      },
      {
        title: 'Takip',
        image: { svg: javert, caption: 'Gece sokağında fener ışığı altında bir müfettişin gölgesi.' },
        text: [
          'Hugo, romanın büyük bölümlerinde ana hikâyeyi bırakarak Paris’in tarihine, Waterloo Savaşı’na, manastırların hayatına ve şehrin lağımlarına dair uzun ve ayrıntılı bölümler yazar. Bu bölümler, romanı yalnızca bir aşk ve kurtuluş hikâyesi olmaktan çıkarıp on dokuzuncu yüzyıl Fransa’sının devasa bir panoramasına dönüştürür. Hugo’nun asıl derdi, yoksulluğun, cehaletin ve adaletsizliğin insanları nasıl “sefil” hâle getirdiğini göstermektir.',
          'Marius ve Cosette, Valjean’ın Plumet Sokağı’ndaki evinin bahçesinde gizlice buluşmaya başlar. Ama Valjean, Thénardier’in ve Javert’in kendisine yaklaştığını hisseder ve Cosette’i alıp İngiltere’ye kaçmaya karar verir. Cosette, Marius’a nereye gideceklerini bildiren bir mektup bırakır, ama mektubu Éponine saklar. Marius, Cosette’i kaybettiğini düşünerek umutsuzluğa kapılır.',
          'Javert’in Valjean’a olan takıntısı, romanın en önemli çatışmalarından biridir. Javert için insanlar ya iyi ya kötüdür ve bir suçlu asla değişemez. Valjean ise insanın merhametle değişebileceğinin canlı kanıtıdır. Hugo, bu iki adam arasındaki mücadeleyi, kanun ile vicdan, ceza ile bağışlama arasındaki büyük bir felsefi çatışma olarak anlatır.'
        ]
      },
      {
        title: 'Barikatlar',
        image: { svg: barricades, caption: 'Haziran 1832: Paris sokaklarında yükselen barikatlar ve kırmızı bayrak.' },
        text: [
          'Haziran 1832’de, cumhuriyetçi bir generalin cenazesi Paris’te bir ayaklanmaya dönüşür. Marius’un arkadaşları, karizmatik lider Enjolras’ın önderliğinde sokaklarda barikatlar kurar. Cosette’i kaybettiğini düşünen ve hayattan umudunu kesen Marius da onlara katılır. Barikatta, yaramaz ama cesur sokak çocuğu Gavroche da vardır. Javert ise isyancıların arasına casus olarak sızmış, ama yakalanıp barikatın arkasında bağlanmıştır.',
          'Erkek kılığına girerek barikata gelen Éponine, Marius’a doğrultulan bir kurşunu kendi bedeniyle karşılar. Ölmeden önce ona Cosette’in mektubunu verir ve ona olan aşkını itiraf eder. Marius, Cosette’e bir veda mektubu yazar. Mektup Valjean’ın eline geçer. Valjean, Cosette’in Marius’u sevdiğini anlayınca, kalbi kırılsa da onu korumak için barikata gider.',
          'Barikatta Valjean, isyancılardan Javert’i kendisinin infaz etmesine izin vermelerini ister. Ama onu bir köşeye götürdüğünde, ipini keser ve serbest bırakır. Javert şaşkınlık içinde uzaklaşır. Ertesi sabah askerler barikata saldırır. Gavroche, cesaretle kurşunların arasında dolaşarak fişek toplarken vurulur. Enjolras ve bütün arkadaşları ölür. Marius ise ağır yaralanarak bilincini kaybeder.'
        ]
      },
      {
        title: 'Lağımların Karanlığında',
        image: { svg: sewers, caption: 'Paris’in lağımları: sırtında yaralı Marius’u taşıyan Valjean.' },
        text: [
          'Valjean, baygın Marius’u sırtına alır ve askerlerden kaçmak için bir lağım kapağından aşağı, Paris’in karanlık ve pis kokulu yer altı tünellerine iner. Saatlerce, bazen göğsüne kadar çamura gömülerek, yolunu bulmaya çalışır. Sonunda bir çıkışa ulaştığında, kapının kilitli olduğunu görür. Orada karşısına Thénardier çıkar ve Valjean’ı tanımadan, ona kapıyı açmak için para ister.',
          'Valjean lağımdan çıktığında, onu bekleyen Javert ile yüz yüze gelir. Valjean, Marius’u büyükbabasının evine götürmek için ondan izin ister ve ardından teslim olacağını söyler. Javert kabul eder. Ama Marius’u bıraktıktan sonra, Valjean’ı tutuklamak yerine onu serbest bırakır ve uzaklaşır.',
          'Javert, hayatı boyunca kanunun mutlak doğruluğuna inanmıştır. Ama şimdi, hayatını bağışlayan bir suçluya borçludur ve onu yakalamak yerine serbest bırakmıştır. Bu çelişki, onun bütün dünyasını yıkar. Kanunla merhamet arasında sıkışıp kalan Javert, bu yükü taşıyamaz ve Seine Nehri’ne atlayarak hayatına son verir.'
        ]
      },
      {
        title: 'Işığa Dönüş',
        image: { svg: farewell, caption: 'Piskoposun gümüş şamdanlarının ışığında son bir veda.' },
        text: [
          'Marius iyileşir ve büyükbabasıyla barışır. Cosette ile evlenirler. Düğünden sonra Valjean, Marius’a geçmişini, yani eski bir kürek mahkûmu olduğunu itiraf eder. Marius bu itiraftan rahatsız olur ve Valjean’ın Cosette’i görmesini yavaş yavaş engeller. Valjean ise Cosette’in mutluluğunu bozmamak için sessizce geri çekilir ve yalnızlık içinde günden güne erimeye başlar.',
          'Bir gün Thénardier, Valjean hakkında bir sır satmak için Marius’a gelir. Ama anlattığı hikâye, Marius’un gözlerini açar. Thénardier, Valjean’ın bir adamı öldürüp lağımlarda taşıdığını iddia ederken, Marius o adamın kendisi olduğunu ve onu barikattan kurtaranın Valjean olduğunu anlar. Utanç ve minnet duygusuyla dolan Marius, Cosette’i alıp hemen Valjean’ın evine koşar.',
          'Valjean’ı ölüm döşeğinde bulurlar. Valjean, son nefesinde Cosette’e annesi Fantine’den söz eder ve piskoposun ona verdiği gümüş şamdanları Cosette’e bırakır. Şamdanların ışığında, sevdiklerinin kollarında huzur içinde ölür. Sefiller, bir insanın sevgi ve merhametle nasıl yeniden doğabileceğini, adaletsiz bir toplumda bile iyiliğin nasıl ışık saçabileceğini anlatan, dünya edebiyatının en büyük romanlarından biridir.'
        ]
      }
    ]
  };
})();
