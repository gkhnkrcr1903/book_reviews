// Dünyayı Değiştiren Kararlar — Ian Kershaw (2007)
// Sahneler data/scenes.js yardımcılarıyla çizilir; ileride image.src ile gerçek çizimlerle değiştirilebilir.
(() => {
  const { svg, glow, skyline, figure, seated, streaks, dots } = window.Scene;

  // Uzun masa etrafında toplantı
  const cabinet = (seed, n, coat) => `
    <path d="M140 270 H660 L690 300 H110 Z" fill="#3a2414"/>
    ${Array.from({ length: n }, (_, i) => seated(170 + i * (460 / (n - 1)), 272 - (i % 2) * 2, 1.3, coat, i >= n / 2)).join('')}`;
  const plane = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}">
    <path d="M-30 0 L30 -2 L36 0 L30 2 Z"/><path d="M-4 0 L-14 -22 L-6 -22 L8 0 Z"/><path d="M-4 0 L-14 22 L-6 22 L8 0 Z"/><path d="M-26 0 L-32 -9 L-28 -9 L-22 0 Z"/></g>`;

  // 1 — Londra, Mayıs 1940: Savaş Kabinesi
  const london = svg({
    sky: ['#1a1a20', '#2a2a32', '#1a1a20'],
    vignette: .7,
    body: id => `
      <rect x="560" y="50" width="160" height="170" fill="#3a4a5a" opacity=".6"/>
      ${skyline({ y: 220, color: '#141418', seed: 7, lit: .05, minH: 40, maxH: 110 }).replace(/<rect x="(-?\d+)"/g, (m, x) => +x < 560 || +x > 720 ? '<rect x="-9999"' : m)}
      <line x1="640" y1="50" x2="640" y2="220" stroke="#1a1a20" stroke-width="6"/><line x1="560" y1="135" x2="720" y2="135" stroke="#1a1a20" stroke-width="6"/>
      ${glow(id, 400, 200, 260, '#ffc070', .4)}
      ${cabinet(1, 6, '#0a0a0c')}
      <path d="M396 150 q-10 -30 6 -50 q14 -20 0 -40" stroke="#e8dcc4" stroke-width="5" fill="none" opacity=".18" filter="url(#${id}soft)"/>
      <circle cx="400" cy="190" r="6" fill="#ff8a3a"/>`
  });

  // 2 — Berlin, 1940: harita masasında Doğu’ya uzanan oklar
  const berlin = svg({
    sky: ['#1a1410', '#2a2018', '#1a1410'],
    vignette: .7,
    body: id => `
      ${glow(id, 400, 200, 260, '#ffd090', .45)}
      <path d="M120 240 H680 L720 320 H80 Z" fill="#c8b48a"/>
      <g fill="none" stroke="#5a4a30" stroke-width="2" opacity=".7">
        <path d="M150 300 Q260 260 340 280 Q420 250 520 270 Q620 250 700 290"/><path d="M200 250 Q300 270 380 245"/>
      </g>
      ${[[300, 290, 560, 260], [310, 270, 600, 245], [320, 305, 580, 300]].map(([x1, y1, x2, y2]) => `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="#a82a2a" stroke-width="6"/><polygon points="${x2},${y2 - 9} ${x2 + 18},${y2} ${x2},${y2 + 9}" fill="#a82a2a"/>`).join('')}
      ${figure(240, 240, 1.7, '#0c0a08', {})}${figure(380, 236, 1.6, '#1a1a14', { hat: true })}${figure(470, 236, 1.6, '#1a1a14', { hat: true })}`
  });

  // 3 — Tokyo ve Roma: fırsat kollayan iki rejim
  const tokyoRome = svg({
    sky: ['#3a1a1a', '#7a3a2a', '#c87a4a'],
    body: id => `
      ${glow(id, 220, 160, 160, '#ffe0b0', .7)}<circle cx="220" cy="160" r="50" fill="#c83a2a"/>
      <g fill="#1a0e0a">
        <path d="M100 300 H340 V290 H330 L300 240 H140 L110 290 H100 Z"/><path d="M130 240 H310 L280 210 H160 Z"/><path d="M150 210 H290 L260 186 H180 Z"/>
        <rect x="500" y="180" width="220" height="120"/>${Array.from({ length: 8 }, (_, i) => `<path d="M${510 + i * 26} 300 V220 Q${520 + i * 26} 200 ${530 + i * 26} 220 V300" fill="#3a2418"/>`).join('')}
        <rect x="490" y="168" width="240" height="14"/>
      </g>
      <rect y="300" width="800" height="100" fill="#140a06"/>
      <line x1="400" y1="0" x2="400" y2="400" stroke="#000" stroke-width="2" opacity=".5"/>`
  });

  // 4 — Washington: Atlantik’i aşan yardım gemileri
  const lend = svg({
    sky: ['#3a4a6a', '#6a7a9a', '#a8b0c0'],
    vignette: .45, grain: .14,
    body: id => `
      <rect y="230" width="800" height="170" fill="#2a3a5a"/>
      ${Array.from({ length: 10 }, (_, i) => `<path d="M${(i * 83) % 800} ${250 + i * 14} q30 -6 60 0" stroke="#8a9ab8" stroke-width="2" fill="none" opacity=".5"/>`).join('')}
      ${[[150, 270, 1], [330, 300, 1.3], [540, 280, 1.1], [690, 310, 1.4]].map(([x, y, s]) => `<g transform="translate(${x} ${y}) scale(${s})" fill="#141a24"><path d="M-60 0 H60 L50 14 H-50 Z"/><rect x="-36" y="-14" width="40" height="14"/><rect x="10" y="-10" width="30" height="10"/><rect x="-14" y="-30" width="8" height="16"/></g>`).join('')}
      ${plane(260, 120, 1.3, '#141a24')}${plane(460, 90, 1, '#141a24')}`
  });

  // 5 — Moskova, Haziran 1941: Kremlin ve gelen uyarılar
  const moscow = svg({
    sky: ['#0e1420', '#1a2234', '#2a2a3a'],
    vignette: .6,
    body: id => `
      <g fill="#0a0c14">
        <rect x="0" y="260" width="800" height="140"/>
        ${[120, 260, 540, 680].map(x => `<rect x="${x - 20}" y="160" width="40" height="110"/><polygon points="${x - 24},160 ${x},100 ${x + 24},160"/>`).join('')}
        <rect x="300" y="200" width="200" height="70"/>
        ${[340, 400, 460].map((x, i) => `<rect x="${x - 14}" y="${150 - i % 2 * 20}" width="28" height="60"/><path d="M${x - 18} ${150 - i % 2 * 20} q18 -40 36 0z"/>`).join('')}
      </g>
      ${[120, 260, 540, 680].map(x => `<polygon points="${x},88 ${x + 5},98 ${x - 5},98" fill="#c83a2a"/>`).join('')}
      <rect x="380" y="226" width="40" height="22" fill="#ffd08a"/>${glow(id, 400, 236, 60, '#ffd08a', .7)}
      ${[[120, 60], [640, 50], [700, 120], [80, 130]].map(([x, y]) => `<g transform="translate(${x} ${y})"><rect x="-22" y="-14" width="44" height="28" fill="#e8dcc4" opacity=".75"/><path d="M-22 -14 L0 4 L22 -14" stroke="#8a7a6a" fill="none"/></g>`).join('')}`
  });

  // 6 — Pearl Harbor, 7 Aralık 1941
  const pearl = svg({
    sky: ['#e8a86a', '#f4c890', '#b8c8d8'],
    vignette: .5,
    body: id => `
      <rect y="250" width="800" height="150" fill="#3a5a7a"/>
      <path d="M0 250 Q100 220 220 240 L260 250 Z" fill="#3a4a2a"/>
      ${[[200, 290], [380, 280], [560, 300]].map(([x, y], i) => `<g transform="translate(${x} ${y})" fill="#1a1a1a"><path d="M-80 0 H80 L70 14 H-70 Z"/><rect x="-40" y="-20" width="70" height="20"/><rect x="-16" y="-44" width="14" height="24"/><rect x="10" y="-36" width="6" height="16"/></g>
        <path d="M${x} ${y - 40} q-40 -60 10 -110 q50 -40 -10 -90" stroke="#2a2a2a" stroke-width="${40 - i * 6}" fill="none" opacity=".45" filter="url(#${id}blur)"/>
        ${glow(id, x, y - 20, 60, '#ff7a3a', .7)}`).join('')}
      ${plane(640, 80, 1.1, '#1a1a1a')}${plane(700, 120, .9, '#1a1a1a')}${plane(560, 60, .8, '#1a1a1a')}`
  });

  // 7 — Hitler’in Amerika’ya savaş ilanı: Reichstag ve küresel savaş
  const globalWar = svg({
    sky: ['#0a0a10', '#18181e', '#24242a'],
    vignette: .65,
    body: id => `
      ${glow(id, 400, 200, 230, '#c8d0e0', .25)}
      <circle cx="400" cy="200" r="130" fill="#141820" stroke="#3a4050" stroke-width="2"/>
      <g fill="none" stroke="#3a4050" stroke-width="1.5"><ellipse cx="400" cy="200" rx="130" ry="44"/><ellipse cx="400" cy="200" rx="60" ry="130"/><line x1="270" y1="200" x2="530" y2="200"/></g>
      <path d="M320 150 Q350 130 380 150 Q390 190 360 210 Q330 200 320 150 Z M430 140 Q480 120 510 160 Q500 200 470 190 Q440 180 430 140 Z" fill="#3a3a44"/>
      ${[[330, 170, 460, 160], [460, 160, 330, 240], [480, 230, 360, 260]].map(([x1, y1, x2, y2]) => `<path d="M${x1} ${y1} Q400 ${Math.min(y1, y2) - 60} ${x2} ${y2}" stroke="#c83a2a" stroke-width="3" fill="none" stroke-dasharray="8 6"/>`).join('')}
      <rect y="340" width="800" height="60" fill="#0a0a0e"/>
      ${Array.from({ length: 18 }, (_, i) => figure(30 + i * 44, 360, 1, '#000', { hat: i % 3 === 0 })).join('')}`
  });

  // 8 — Raylar ve sis: hatırlama
  const memory = svg({
    sky: ['#6a6a6a', '#8a8a8a', '#a8a8a8'],
    vignette: .6, grain: .22,
    body: id => `
      <rect y="200" width="800" height="200" fill="#5a5a5a"/>
      <path d="M380 200 L180 400 M420 200 L620 400" stroke="#2a2a2a" stroke-width="6"/>
      ${Array.from({ length: 12 }, (_, i) => { const t = i / 11, y = 205 + t * t * 195, w = 40 + t * 420; return `<rect x="${400 - w / 2}" y="${y}" width="${w}" height="${2 + t * 8}" fill="#3a3a3a"/>`; }).join('')}
      <rect y="150" width="800" height="120" fill="#c8c8c8" opacity=".55" filter="url(#${id}blur)"/>
      <g fill="#3a3a3a" opacity=".6"><rect x="360" y="150" width="80" height="50"/><rect x="390" y="120" width="20" height="30"/></g>
      ${Array.from({ length: 14 }, (_, i) => `<g opacity=".9"><path d="M${120 + i * 40} 400 l0 -${8 + (i % 3) * 3}" stroke="#e8e0cc" stroke-width="3"/><circle cx="${120 + i * 40}" cy="${390 - (i % 3) * 3}" r="4" fill="#ffd08a"/></g>`).join('').replace(/<g opacity=".9"><path d="M(\d+)/g, (m, x) => +x > 260 && +x < 540 ? m.replace('opacity=".9"', 'opacity="0"') : m)}`
  });

  window.SUMMARIES['dunyayi-degistiren-kararlar'] = {
    pages: [
      {
        title: 'Britanya Savaşmaya Karar Veriyor',
        image: { svg: london, caption: 'Londra, Mayıs 1940: Savaş Kabinesi’nin dumanlı toplantı odası.' },
        text: [
          'Ünlü tarihçi Ian Kershaw, bu kitapta İkinci Dünya Savaşı’nın seyrini belirleyen on kritik kararı ele alır. Bu kararların hepsi, Mayıs 1940 ile Aralık 1941 arasındaki kısa ama son derece yoğun bir dönemde, altı ülkenin liderleri tarafından verilmiştir. Kershaw’a göre bu on sekiz ay, yalnızca savaşın değil, yirminci yüzyılın geri kalanının da şekillendiği dönemdir. Kitabın asıl merakı da şudur: Bu kararlar neden alındı, başka seçenekler var mıydı ve liderler ne kadar özgür hareket edebildi?',
          'İlk karar Londra’da verilir. Mayıs 1940’ın sonunda Alman orduları Fransa’yı ezmiş, İngiliz ordusu Dunkirk sahillerinde denize sıkıştırılmıştır. Yeni Başbakan Winston Churchill’in hükümeti büyük bir baskı altındadır. Dışişleri Bakanı Lord Halifax, Mussolini aracılığıyla Hitler’le barış şartlarını yoklamayı önerir. Bu, o koşullarda son derece mantıklı görünen bir seçenektir, çünkü Britanya yalnız kalmıştır ve savaşı kazanma umudu çok zayıftır.',
          'Savaş Kabinesi’nde günlerce süren gergin tartışmalar yaşanır. Churchill, müzakereye bir kez başlanırsa geri dönüşün olmayacağını, Britanya’nın Hitler’in şartlarına boyun eğmek zorunda kalacağını savunur. Sonunda kabinenin geniş kadrosundan aldığı güçlü destekle Halifax’ın önerisini reddeder ve Britanya savaşmaya devam eder. Kershaw’a göre bu karar, Hitler’in Batı’da hızlı bir zafer kazanma planını bozmuş ve onu ilerleyen aylarda çok daha riskli kararlar almaya itmiştir.'
        ]
      },
      {
        title: 'Hitler Doğu’ya Yöneliyor',
        image: { svg: berlin, caption: 'Berlin, 1940: harita masası üzerinde Doğu’ya uzanan kırmızı oklar.' },
        text: [
          'Britanya’nın teslim olmayı reddetmesi, Hitler’i ciddi bir açmaza sokar. İngiltere’yi hava saldırılarıyla dize getirme girişimi başarısız olmuş, adaya bir çıkarma yapmak da fazla riskli görünmektedir. Üstelik arka planda büyük bir tehdit belirmektedir: Amerika Birleşik Devletleri’nin er ya da geç savaşa Britanya’nın yanında katılması. Hitler, zaman kendi aleyhine işlemeden önce büyük bir hamle yapması gerektiğine inanır.',
          '1940 yazında Hitler, generallerine Sovyetler Birliği’ni işgal etme kararını bildirir. Bu karar ona göre birçok sorunu aynı anda çözecektir. Sovyetler’in yenilmesi Britanya’nın son umudunu yok edecek, Almanya’ya Doğu’nun sonsuz tahıl ve petrol kaynaklarını kazandıracak ve Hitler’in yıllardır hayalini kurduğu “yaşam alanı”nı sağlayacaktır. Bu, aynı zamanda onun ırkçı dünya görüşünün merkezindeki “Yahudi-Bolşevik” düşmana karşı bir yok etme savaşıdır.',
          'Kershaw, bu kararın yalnızca Hitler’in kişisel takıntısının ürünü olmadığını vurgular. Alman generalleri de kampanyanın birkaç ay içinde kazanılacağına inanmış, hatta bu planı coşkuyla benimsemiştir. Ama Barbarossa adı verilen operasyon, Haziran 1941’de başladığında Almanya’yı kazanamayacağı uzun ve yıkıcı bir savaşın içine sürükler. Kershaw’a göre bu, savaşın en belirleyici kararlarından biridir.'
        ]
      },
      {
        title: 'Japonya ve İtalya Fırsat Kolluyor',
        image: { svg: tokyoRome, caption: 'Tokyo ve Roma: Avrupa’daki çöküşü kendi hesaplarına fırsat gören iki rejim.' },
        text: [
          '1940 yazında Fransa’nın ve Hollanda’nın Almanya’ya yenilmesi, Asya’daki sömürgelerini savunmasız bırakır. Japonya’nın liderleri bu durumu tarihî bir fırsat olarak görür. Uzun süredir Çin’de bataklığa saplanmış olan Japon ordusu, petrol, kauçuk ve diğer hammaddeler açısından zengin Güneydoğu Asya’ya yönelmeyi düşünmeye başlar. Japonya, Almanya ve İtalya ile Üçlü Pakt’ı imzalar ve Fransız Çinhindi’nin kuzeyine asker gönderir.',
          'Kershaw, Japon karar alma sürecinin Batılı demokrasilerden çok farklı olduğunu anlatır. Japonya’da tek bir liderin kesin kararı yoktur. Kararlar ordu, donanma ve hükümet arasındaki uzun pazarlıklarla, uzlaşma arayan toplantılarla alınır. İmparator ise çoğu zaman sessiz kalır. Bu yapı, sorumluluğun dağılmasına ve kimsenin geri adım atmaya cesaret edemediği bir sürüklenmeye yol açar.',
          'Aynı yaz İtalya’da Mussolini de fırsatçı bir karar verir. Fransa çökmek üzereyken, savaşın birkaç hafta içinde biteceğine inanarak Haziran 1940’ta İtalya’yı savaşa sokar. Payına düşeni almak için acele eder. Ekim 1940’ta ise Hitler’e haber vermeden Yunanistan’a saldırır. Ama hazırlıksız İtalyan ordusu, Yunanların ve ardından İngilizlerin karşısında büyük yenilgiler alır. Kershaw’a göre Mussolini’nin kararları İtalya’yı Almanya’nın bağımlı bir ortağına dönüştürür ve Hitler’i Balkanlar’a müdahale etmek zorunda bırakır.'
        ]
      },
      {
        title: 'Roosevelt Yardım Elini Uzatıyor',
        image: { svg: lend, caption: 'Atlantik’i aşan konvoylar ve “Ödünç Verme ve Kiralama” yasası.' },
        text: [
          'Amerika Birleşik Devletleri, 1940’ta savaşın dışında kalmak isteyen, güçlü bir yalnızcılık eğilimine sahip bir ülkedir. Başkan Franklin D. Roosevelt ise Hitler’in kazanmasının Amerika için de büyük bir tehdit olacağına inanır. Ama halkını ve Kongre’yi savaşa sokmaya ikna etmesi neredeyse imkânsızdır. Üstelik 1940 yılı bir seçim yılıdır ve Roosevelt üçüncü kez aday olmaktadır.',
          'Roosevelt bu nedenle adım adım ilerlemeyi seçer. Önce Eylül 1940’ta Britanya’ya elli eski muhripi, bazı İngiliz üslerinin kiralanması karşılığında verir. Seçimleri kazandıktan sonra ise çok daha büyük bir adım atar. Mart 1941’de Kongre’den geçen “Ödünç Verme ve Kiralama” yasasıyla, ödeme gücü kalmayan Britanya’ya silah, uçak, gemi ve yiyecek gönderilmesinin yolu açılır.',
          'Roosevelt, bu yasayı halka basit bir benzetmeyle anlatır: Komşunuzun evi yanıyorsa ona hortumunuzu ödünç verirsiniz ve parasını sonra konuşursunuz. Kershaw’a göre bu karar, Amerika’yı resmen savaşa sokmamakla birlikte, onu Britanya’nın yanında açıkça taraf hâline getirir. Amerika artık Roosevelt’in deyişiyle “demokrasinin cephaneliği”dir.'
        ]
      },
      {
        title: 'Stalin Her Şeyi Bildiğini Sanıyor',
        image: { svg: moscow, caption: 'Kremlin’in ışığı yanan odası ve görmezden gelinen uyarılar.' },
        text: [
          '1941 baharında Sovyet lideri Josef Stalin’in masasına, birbiri ardına uyarılar ulaşır. Sovyet casusları, İngiliz hükümeti ve hatta bazı Alman kaçaklar, Almanya’nın Sovyetler Birliği’ne saldırmak üzere olduğunu bildirir. Sınırda üç milyondan fazla Alman askeri toplanmaktadır. Ama Stalin bu uyarıların hepsini, Sovyetleri Almanya ile savaşa sokmak isteyen İngilizlerin bir oyunu olarak görür.',
          'Kershaw, Stalin’in bu kararını yalnızca bir yanılgı olarak değil, onun kurduğu sistemin bir ürünü olarak inceler. Stalin, ordunun en deneyimli komutanlarını birkaç yıl önce yaptığı tasfiyelerle öldürtmüş ya da sürgüne göndermiştir. Etrafındaki herkes ondan korkmaktadır ve kimse onun görüşüne karşı çıkmaya cesaret edemez. Stalin, Hitler’in Britanya’yı yenmeden önce doğuda ikinci bir cephe açmayacağına inanmış ve buna kendini de inandırmıştır.',
          'Saldırıyı kışkırtmamak için Sovyet ordusunun hazırlık yapması bile yasaklanır. 22 Haziran 1941 sabahı Alman orduları sınırı geçtiğinde, Sovyet birlikleri tamamen hazırlıksız yakalanır. İlk birkaç ay içinde milyonlarca asker ölür ya da esir düşer. Kershaw’a göre Stalin’in bu kararı, Sovyet halkına ağır bir bedel ödetmiş, ama yine de ülke çökmemiş ve sonunda savaşın kaderini Doğu Cephesi belirlemiştir.'
        ]
      },
      {
        title: 'Japonya Savaşa Gidiyor',
        image: { svg: pearl, caption: 'Pearl Harbor, 7 Aralık 1941: sabah gökyüzünü kaplayan duman.' },
        text: [
          'Temmuz 1941’de Japonya, Fransız Çinhindi’nin güneyini de işgal eder. Bunun üzerine Amerika, Britanya ve Hollanda, Japonya’ya petrol ambargosu uygular. Petrolünün büyük kısmını ithal eden Japonya için bu, ordusunun ve donanmasının birkaç ay içinde felç olması anlamına gelir. Japon liderler önünde iki seçenek görür: Ya Çin’den çekilerek Amerika’nın şartlarını kabul etmek ya da petrol kaynaklarını zorla ele geçirmek.',
          'Çin’den çekilmek, orada yıllardır savaşan ve büyük kayıplar veren ordu için kabul edilemez bir aşağılanmadır. Japon liderler, Amerika ile uzun bir savaşı kazanamayacaklarını aslında bilmektedir. Ama hızlı ve şaşırtıcı bir darbeyle Amerikan donanmasını felç edip, Güneydoğu Asya’yı ele geçirerek güçlü bir pazarlık konumuna geleceklerini umarlar. Kershaw, bu kararın bir tür kumar olduğunu, ama Japon liderlerin gözünde başka hiçbir seçeneğin kalmadığını anlatır.',
          '7 Aralık 1941 sabahı Japon uçakları, Hawaii’deki Pearl Harbor üssüne saldırır. Birkaç saat içinde Amerikan Pasifik Filosu’nun savaş gemilerinin önemli bir kısmı batırılır ya da ağır hasar görür. Ama uçak gemileri o gün limanda değildir ve Amerika’nın sanayi gücü sağlam kalmıştır. Saldırı, yalnızcılığı bir gecede sona erdirir ve Amerikan halkını savaşa tamamen kenetler.'
        ]
      },
      {
        title: 'Okyanusta İlan Edilmemiş Savaş',
        image: { svg: globalWar, caption: 'Aralık 1941: Avrupa’daki savaş bir dünya savaşına dönüşüyor.' },
        text: [
          'Pearl Harbor’dan önce bile Roosevelt, Atlantik’te fiilen ilan edilmemiş bir savaş yürütmektedir. 1941 yazında Amerikan donanması, Britanya’ya giden konvoyları korumaya başlar. Alman denizaltılarıyla Amerikan muhripleri arasında çatışmalar yaşanır. Eylül 1941’de Roosevelt, Amerikan savaş gemilerine, Amerikan sularında karşılaştıkları Alman denizaltılarına önceden ateş açma emri verir. Ama yine de Kongre’den resmî bir savaş ilanı istemekten kaçınır, çünkü kamuoyunun buna hazır olmadığını bilir.',
          'Bu sorunu Roosevelt değil, Hitler çözer. Pearl Harbor’dan dört gün sonra, 11 Aralık 1941’de, Hitler Reichstag’da yaptığı bir konuşmayla Amerika Birleşik Devletleri’ne savaş ilan eder. Kershaw, bu kararın dışarıdan bakıldığında akıl almaz göründüğünü söyler. Almanya Sovyetler Birliği’ne karşı Moskova önlerinde ağır bir duruma düşmüşken, dünyanın en büyük sanayi gücüyle de savaşa girmektedir.',
          'Ama Kershaw’a göre Hitler’in gözünde bu karar mantıklıdır. Amerika zaten Britanya’ya yardım ediyor ve Atlantik’te Alman denizaltılarıyla çatışıyordur. Hitler, Amerika’nın er ya da geç savaşa gireceğine inanır ve inisiyatifi kendisi almak ister. Japonya’nın Amerikan donanmasını meşgul edeceğini, böylece Almanya’nın denizaltı savaşını sınırsızca yürütebileceğini hesaplar. Bu karar, Avrupa ve Asya’daki iki ayrı savaşı tek bir dünya savaşına dönüştürür ve Almanya’nın kaderini de büyük ölçüde belirler.'
        ]
      },
      {
        title: 'En Karanlık Karar',
        image: { svg: memory, caption: 'Sise karışan raylar ve hatırlamak için yakılan mumlar.' },
        text: [
          'Kitabın son ve en ağır bölümü, Hitler’in Avrupa Yahudilerini yok etme kararını ele alır. Kershaw, bu kararın tek bir günde, tek bir yazılı emirle alınmadığını anlatır. Sovyetler Birliği’nin işgaliyle birlikte, 1941 yazında, Alman özel birlikleri işgal edilen bölgelerde Yahudi erkekleri, ardından kadınları ve çocukları toplu olarak öldürmeye başlar. Şiddet adım adım tırmanır.',
          '1941 sonbaharında, Doğu’daki savaşın beklendiği gibi hızla bitmeyeceği anlaşıldığında, Avrupa’nın dört bir yanındaki Yahudilerin sürgün edilmesi ve öldürülmesi için sistematik bir plan şekillenmeye başlar. Kershaw, Hitler’in nefret dolu ideolojisinin bu sürecin merkezinde olduğunu, ama onun etrafındaki Nazi yöneticilerinin ve bürokratların da kendi inisiyatifleriyle bu süreci hızlandırdığını vurgular. Bu, insanlık tarihinin en büyük suçlarından biri olan Holokost’un başlangıcıdır.',
          'Kitabın sonuç bölümünde Kershaw, on kararın birbirine nasıl bağlandığını gösterir. Britanya’nın savaşmaya devam etmesi, Hitler’i Doğu’ya yöneltmiş, bu da Japonya’yı ve Amerika’yı farklı hesaplara itmiştir. Demokrasilerde kararlar uzun tartışmalar ve kamuoyu baskısıyla, diktatörlüklerde ise tek bir liderin iradesiyle ve çevresindekilerin sessizliğiyle alınmıştır. Kershaw’a göre bu dönemde alınan kararlar, savaşın sonucunu henüz belirlemese de, onun hangi yönde ilerleyeceğini ve milyonlarca insanın kaderini belirlemiştir.'
        ]
      }
    ]
  };
})();
