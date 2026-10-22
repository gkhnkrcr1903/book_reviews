// Karamazov Kardeşler — Fyodor Dostoyevski (1880)
// Sahneler data/scenes.js yardımcılarıyla çizilir; ileride image.src ile gerçek çizimlerle değiştirilebilir.
(() => {
  const { svg, glow, skyline, figure, seated, streaks, dots } = window.Scene;

  const monastery = (x, y, s, c, lit) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}">
    <rect x="-140" y="-80" width="280" height="80"/>${[-100, 0, 100].map((dx, i) => `<rect x="${dx - 22}" y="${-130 - (i === 1 ? 30 : 0)}" width="44" height="${50 + (i === 1 ? 30 : 0)}"/><path d="M${dx - 26} ${-130 - (i === 1 ? 30 : 0)} Q${dx - 30} ${-160 - (i === 1 ? 30 : 0)} ${dx} ${-176 - (i === 1 ? 30 : 0)} Q${dx + 30} ${-160 - (i === 1 ? 30 : 0)} ${dx + 26} ${-130 - (i === 1 ? 30 : 0)} Z"/><rect x="${dx - 2}" y="${-200 - (i === 1 ? 30 : 0)}" width="4" height="26"/><rect x="${dx - 8}" y="${-192 - (i === 1 ? 30 : 0)}" width="16" height="3"/>`).join('')}
    ${Array.from({ length: 6 }, (_, k) => `<rect x="${-120 + k * 44}" y="-60" width="16" height="26" fill="${lit || '#0a0a0a'}" opacity=".85"/>`).join('')}</g>`;
  const icon = (x, y, id) => `<rect x="${x - 22}" y="${y - 30}" width="44" height="60" fill="#8a6a2a"/><rect x="${x - 18}" y="${y - 26}" width="36" height="52" fill="#d9a83a"/><circle cx="${x}" cy="${y - 8}" r="10" fill="#3a2414"/>${glow(id, x, y - 8, 14, '#fff0a0', .9)}<path d="M${x - 12} ${y + 22} Q${x} ${y} ${x + 12} ${y + 22} Z" fill="#6a2a1a"/>`;

  // 1 — Fyodor Karamazov ve oğulları
  const family = svg({
    sky: ['#2a1a10', '#3a2416', '#2a1a10'],
    vignette: .65,
    body: id => `
      ${glow(id, 400, 160, 260, '#ffb050', .45)}
      <path d="M140 250 H660 L680 270 H120 Z" fill="#4a2a18"/>
      ${Array.from({ length: 6 }, (_, i) => `<rect x="${220 + i * 66}" y="${226 - (i % 2) * 6}" width="10" height="${24 + (i % 2) * 6}" rx="3" fill="${i % 2 ? '#6a2a2a' : '#2a4a2a'}" opacity=".85"/>`).join('')}
      ${seated(400, 252, 2, '#1a0e08')}
      ${figure(170, 330, 1.9, '#3a1a1a', { hat: false })}${figure(560, 330, 1.8, '#1a1a2a', {})}${figure(650, 330, 1.7, '#2a2a3a', { dress: true, shawl: null })}
      <rect y="330" width="800" height="70" fill="#140a06"/>`
  });

  // 2 — Manastır ve Zosima’nın hücresi
  const zosima = svg({
    sky: ['#6a8ab0', '#b8c8d8', '#f0e8d8'],
    vignette: .4, grain: .14,
    body: id => `
      ${glow(id, 640, 90, 160, '#fff8d8', .7)}
      <path d="M0 270 Q400 240 800 270 V400 H0 Z" fill="#8aa06a"/>
      ${monastery(400, 270, 1.1, '#e8e0d0', '#5a6a7a')}
      ${[290, 400, 510].map(dx => `<path d="M${dx - 29} ${dx === 400 ? 78 : 113} Q${dx - 33} ${dx === 400 ? 45 : 80} ${dx} ${dx === 400 ? 28 : 63} Q${dx + 33} ${dx === 400 ? 45 : 80} ${dx + 29} ${dx === 400 ? 78 : 113} Z" fill="#3a6aa8" opacity=".85"/>`).join('')}
      ${Array.from({ length: 6 }, (_, i) => `<g transform="translate(${60 + i * 140} 270)"><rect x="-3" y="-60" width="6" height="60" fill="#4a3a2a"/><ellipse cy="-80" rx="22" ry="30" fill="#5a7a4a"/></g>`).join('')}
      ${figure(300, 340, 1.6, '#0a0a0a', { dress: true })}${figure(360, 342, 1.5, '#2a2a3a', {})}`
  });

  // 3 — Dmitri, Grushenka ve Katerina: tutku
  const passion = svg({
    sky: ['#2a0a14', '#4a1424', '#2a0a14'],
    vignette: .6,
    body: id => `
      ${glow(id, 400, 200, 260, '#ff6a5a', .35)}
      <rect x="560" y="80" width="140" height="180" fill="#3a1424"/><rect x="570" y="90" width="120" height="160" fill="#8a3a4a" opacity=".5"/>
      <path d="M200 290 H600 L620 310 H180 Z" fill="#4a2418"/>
      ${figure(280, 300, 1.9, '#1a0808', {})}<path d="M290 220 l40 -20" stroke="#1a0808" stroke-width="5"/>
      ${figure(420, 300, 1.8, '#8a2a3a', { dress: true, shawl: '#2a0a14' })}${figure(600, 300, 1.7, '#1a1a2a', { dress: true, shawl: '#e8dcc4' })}
      ${Array.from({ length: 12 }, (_, i) => `<rect x="${200 + (i * 37) % 400}" y="${280 + (i % 3) * 4}" width="20" height="10" fill="#c8a85a" opacity=".7"/>`).join('')}
      <rect y="310" width="800" height="90" fill="#140608"/>`
  });

  // 4 — İvan ve “Büyük Engizisyoncu”
  const inquisitor = svg({
    sky: ['#1a1410', '#2a2018', '#1a1410'],
    vignette: .75,
    body: id => `
      <g transform="translate(400 140)"><rect x="-110" y="-120" width="220" height="200" fill="#2a2018"/><rect x="-20" y="-160" width="40" height="60" fill="#2a2018"/><rect x="-6" y="-196" width="12" height="40" fill="#2a2018"/><rect x="-20" y="-184" width="40" height="10" fill="#2a2018"/></g>
      <rect y="220" width="800" height="180" fill="#3a2a1a"/>
      ${glow(id, 380, 300, 200, '#ff7a2a', .5)}
      ${Array.from({ length: 6 }, (_, i) => `<path d="M${340 + i * 14} 340 l7 -${30 + (i % 3) * 14} l7 ${30 + (i % 3) * 14} z" fill="${i % 2 ? '#ffb04a' : '#ff7a2a'}"/>`).join('')}
      ${figure(240, 330, 2, '#0a0a0e', { dress: true })}<path d="M232 196 q8 -18 16 0" fill="#0a0a0e"/>
      ${figure(540, 330, 1.9, '#e8e0d0', {})}${glow(id, 540, 220, 60, '#fff4d8', .5)}
      ${Array.from({ length: 14 }, (_, i) => figure(40 + i * 56, 400, 1.2, '#140c06', { hat: i % 3 === 0 })).join('')}`
  });

  // 5 — Zosima’nın ölümü ve Kana düğünü rüyası
  const cana = svg({
    sky: ['#0a0e1a', '#141e34', '#1e2a44'],
    vignette: .6,
    body: id => `
      ${dots(15, 260, '#fff', 1.4, .95, 0, 260)}
      ${glow(id, 400, 120, 260, '#c8d8ff', .25)}
      ${monastery(400, 300, .9, '#0a0e18', '#ffd88a')}
      <rect y="300" width="800" height="100" fill="#0a0e14"/>
      <g transform="translate(400 360) rotate(-4)"><rect x="-60" y="-10" width="120" height="14" rx="6" fill="#2a2a3a"/><circle cx="-66" cy="-4" r="10" fill="#2a2a3a"/><path d="M-50 -10 l20 -14 l20 14" stroke="#2a2a3a" stroke-width="4" fill="none"/></g>`
  });

  // 6 — Babanın öldürüldüğü gece
  const murder = svg({
    sky: ['#04060a', '#0a0e16', '#0e121c'],
    vignette: .8,
    body: id => `
      ${dots(25, 60, '#fff', 1, .6, 0, 140)}
      <g transform="translate(500 290)"><rect x="-120" y="-120" width="240" height="120" fill="#141418"/><polygon points="-130,-120 0,-170 130,-120" fill="#0e0e12"/><rect x="40" y="-90" width="40" height="40" fill="#ffc070"/>${glow(id, 560, 220, 70, '#ffc070', .55)}</g>
      <rect x="0" y="230" width="380" height="16" fill="#1a1a1e"/>${Array.from({ length: 12 }, (_, i) => `<rect x="${i * 32}" y="230" width="6" height="70" fill="#1a1a1e"/>`).join('')}
      <rect y="300" width="800" height="100" fill="#0a0c10"/>
      ${figure(300, 300, 1.7, '#000', { hat: true })}<line x1="308" y1="240" x2="330" y2="214" stroke="#3a3a3a" stroke-width="5"/>
      ${figure(120, 320, 1.4, '#05060a', {})}`
  });

  // 7 — Mokroye’de şölen ve tutuklama
  const mokroye = svg({
    sky: ['#2a1408', '#4a240e', '#2a1408'],
    vignette: .6,
    body: id => `
      ${glow(id, 400, 180, 300, '#ffb040', .55)}
      <path d="M120 270 H680 L700 290 H100 Z" fill="#5a3418"/>
      ${Array.from({ length: 10 }, (_, i) => `<rect x="${160 + i * 50}" y="${246 - (i % 2) * 6}" width="10" height="${24 + (i % 2) * 6}" rx="3" fill="${i % 3 ? '#6a2a2a' : '#d9a83a'}"/>`).join('')}
      ${figure(280, 300, 1.9, '#1a0808', {})}${figure(340, 300, 1.7, '#8a2a3a', { dress: true, shawl: '#2a0a14' })}
      ${Array.from({ length: 4 }, (_, i) => figure(460 + i * 50, 296, 1.4, '#2a1a10', { hat: i % 2 === 0 })).join('')}
      ${figure(700, 320, 2, '#0a0a14', { hat: true })}${figure(750, 322, 1.9, '#0a0a14', { hat: true })}
      <rect y="320" width="800" height="80" fill="#140a04"/>`
  });

  // 8 — İlyuşa’nın taşı ve çocukların sözü
  const stone = svg({
    sky: ['#9ab0c8', '#c8d4dc', '#ece8e0'],
    vignette: .4, grain: .14,
    body: id => `
      ${glow(id, 600, 90, 180, '#fff8e0', .6)}
      <path d="M0 260 Q400 230 800 260 V400 H0 Z" fill="#c8ccc8"/>
      <g transform="translate(400 320)"><ellipse rx="60" ry="22" fill="#8a8a88"/><ellipse cy="-8" rx="52" ry="16" fill="#a8a8a4"/></g>
      ${Array.from({ length: 12 }, (_, i) => { const a = Math.PI + (i / 11) * Math.PI, x = 400 + Math.cos(a) * 220, y = 330 + Math.sin(a) * 50 + 60; return figure(x, y, 1 + (i % 3) * .08, '#2a2a3a', { hat: i % 4 === 0 }); }).join('')}
      ${figure(400, 380, 1.6, '#1a1a2a', {})}
      ${streaks(91, 60, '#fff', 6, -2, .4, 1.5)}`
  });

  window.SUMMARIES['karamazov-kardesler'] = {
    pages: [
      {
        title: 'Bir Baba ve Üç Oğul',
        image: { svg: family, caption: 'Masanın başında kadeh kaldıran yaşlı Fyodor Karamazov ve birbirine hiç benzemeyen oğulları.' },
        text: [
          'Dostoyevski’nin son ve en büyük romanı, Rusya’nın küçük bir taşra kasabası olan Skotoprigonyevsk’te geçer. Hikâyenin merkezinde Fyodor Pavloviç Karamazov ve oğulları vardır. Fyodor, zengin ama son derece ahlaksız, açgözlü, şehvet düşkünü ve palyaçoyu andıran bir toprak sahibidir. İki evlilik yapmış, her iki karısını da mutsuz etmiş ve çocuklarını küçük yaşta terk ederek akrabalarının ve hizmetçilerinin yanına bırakmıştır.',
          'İlk evliliğinden olan büyük oğlu Dmitri, tutkulu, dürüst ama kontrolsüz ve aşırı duygusal bir eski subaydır. İkinci evliliğinden olan İvan, soğukkanlı, son derece zeki ve şüpheci bir aydındır. Tanrı’nın varlığını sorgular ve keskin felsefi fikirleriyle tanınır. En küçük oğul Aleksey, herkesin deyişiyle Alyoşa ise, kasabadaki manastırda bir rahip adayı olarak yaşayan, saf, iyi kalpli ve herkes tarafından sevilen bir gençtir.',
          'Ailenin bir de gizli bir üyesi vardır: Fyodor’un, kasabanın deli olarak bilinen bir kadınından olduğu söylenen ve evinde aşçı olarak çalışan Smerdyakov. Smerdyakov, sara hastası, içine kapanık, kibirli ve aşağılanmış bir gençtir. Dostoyevski, bu dört kardeşi insan ruhunun farklı yüzleri olarak kurgular: tutku, akıl, inanç ve karanlık. Roman, bu ailenin içinde işlenecek korkunç bir cinayet etrafında gelişir.'
        ]
      },
      {
        title: 'Manastırda Bir Toplantı',
        image: { svg: zosima, caption: 'Kasabanın manastırı ve bilge rahip Zosima’nın hücresine giden yol.' },
        text: [
          'Fyodor ile Dmitri arasında, Dmitri’nin annesinden kalan miras konusunda büyük bir anlaşmazlık vardır. Dmitri, babasının kendisini dolandırdığını ve mirasının bir kısmını gasp ettiğini düşünmektedir. Bu kavgayı çözmek için aile, Alyoşa’nın manastırdaki ruhani öğretmeni olan yaşlı ve bilge rahip Zosima’nın hücresinde bir araya gelir. Zosima, insanlara yalnızca sevgiyi ve bağışlamayı öğütleyen, herkesin saygı duyduğu bir ermiştir.',
          'Ama toplantı bir felakete dönüşür. Fyodor, her zamanki gibi soytarılık yaparak herkesi utandırır. Dmitri geç gelir ve babasıyla şiddetli bir kavgaya tutuşur. Fyodor, Dmitri’yi kendi sevgilisini elinden almakla suçlar. Dmitri ise öfkeyle, böyle bir adamın neden yaşadığını yüksek sesle sorar. Tam o sırada, yaşlı Zosima ayağa kalkar ve beklenmedik bir şekilde Dmitri’nin önünde yere kadar eğilir.',
          'Zosima, bu hareketiyle Dmitri’nin gelecekte büyük bir acı çekeceğini önceden sezdiğini gösterir. Daha sonra Alyoşa’ya, manastırı terk etmesini, dünyaya dönerek kardeşlerinin yanında olmasını öğütler. Ona, gerçek inancın dünyadan kaçmakta değil, insanların arasında, onların acılarını paylaşarak yaşanması gerektiğini söyler. Alyoşa, bu öğüdü kalbinde taşıyarak, kardeşlerinin arasında bir arabulucu ve bir vicdan olacaktır.'
        ]
      },
      {
        title: 'Grushenka ve Katerina',
        image: { svg: passion, caption: 'Tutkunun ve kıskançlığın ortasında Dmitri, Grushenka ve Katerina.' },
        text: [
          'Dmitri, Katerina İvanovna adında gururlu ve soylu bir genç kızla nişanlıdır. Katerina, yıllar önce babasının zimmet borcunu ödemek için Dmitri’den yardım istemiş ve Dmitri, ona hiçbir karşılık beklemeden büyük bir para vermiştir. Katerina ona minnet duyar ve bu minneti aşk sanır. Ama Dmitri artık kasabanın en çekici ve en tehlikeli kadını olan Grushenka’ya tutkuyla âşıktır.',
          'İşin en karmaşık yanı, Fyodor’un da Grushenka’ya âşık olmasıdır. Yaşlı adam, Grushenka eğer kendisine gelirse ona vermek için bir zarfın içine üç bin ruble koymuş ve bu zarfı yastığının altında saklamaktadır. Baba ile oğul, aynı kadın için birbirlerinin can düşmanı olurlar. Dmitri, Katerina’nın kendisine postaya vermesi için emanet ettiği üç bin rubleyi Grushenka ile yaptığı bir eğlencede harcamıştır ve bu utanç onu delirtmektedir.',
          'İvan ise, kardeşinin nişanlısı Katerina’ya sessizce âşıktır. Katerina da İvan’a ilgi duyar, ama gururundan ve Dmitri’ye olan bağlılığından vazgeçemez. Alyoşa, bütün bu tutkuların ve kıskançlıkların ortasında, herkesin dertlerini dinleyen ve herkesi anlamaya çalışan tek insandır. Dostoyevski, bu karmaşık ilişkiler ağında insan kalbinin ne kadar çelişkili ve karanlık olabileceğini gösterir.'
        ]
      },
      {
        title: 'Büyük Engizisyoncu',
        image: { svg: inquisitor, caption: 'Sevilla’da yanan odunlar, yaşlı bir engizisyoncu ve sessiz bir yabancı.' },
        text: [
          'Romanın en ünlü bölümlerinden biri, İvan ile Alyoşa’nın bir meyhanede yaptıkları uzun sohbettir. İvan, kardeşine Tanrı’ya inandığını, ama Tanrı’nın yarattığı bu dünyayı kabul edemediğini söyler. Masum çocukların acı çektiği, işkence gördüğü ve öldürüldüğü bir dünyada, hiçbir ilahi uyumun bu acıları haklı çıkaramayacağını savunur. Bu yüzden Tanrı’ya cennete giriş biletini saygıyla geri verdiğini söyler.',
          'Ardından İvan, yazdığı bir şiiri, “Büyük Engizisyoncu”yu anlatır. On altıncı yüzyılda, engizisyonun en korkunç döneminde, İsa Sevilla sokaklarında yeniden belirir. Halk onu tanır ve etrafında toplanır. Ama doksan yaşındaki Büyük Engizisyoncu, onu tutuklatır. Gece hücresinde İsa’yı ziyaret eder ve ona, insanlara özgürlük vererek büyük bir hata yaptığını söyler. Ona göre insanlar özgürlüğü kaldıramaz. Onlar ekmek, mucize ve kendilerini yönetecek bir otorite isterler.',
          'İsa, Engizisyoncu’nun bütün suçlamalarını sessizce dinler. Sonunda hiçbir şey söylemeden, yaşlı adamın kansız dudaklarını öper. Engizisyoncu titrer, kapıyı açar ve ona bir daha asla geri gelmemesini söyler. Alyoşa da hikâyeyi dinledikten sonra İvan’ı aynı şekilde öper. Bu bölüm, Dostoyevski’nin inanç, özgürlük ve insanın doğası üzerine yazdığı en derin sayfalardan biri olarak kabul edilir.'
        ]
      },
      {
        title: 'Zosima’nın Ölümü',
        image: { svg: cana, caption: 'Yıldızlı bir gecede manastırın bahçesinde toprağı öpen Alyoşa.' },
        text: [
          'Yaşlı Zosima, ölmeden önce son öğütlerini verir. Ona göre her insan, herkesin ve her şeyin karşısında sorumludur. Cehennem, sevememenin acısıdır. İnsan, yeryüzünü sevmeli, toprağı öpmeli ve bütün canlıları kucaklamalıdır. Zosima öldüğünde, halk onun cesedinin bir ermişin cesedi gibi kokmayacağını, hatta mucizeler göstereceğini bekler. Ama beklenenin tersine, ceset hızla kokmaya başlar.',
          'Bu olay, kasabada büyük bir skandala dönüşür. Zosima’yı kıskanan rahipler bile onu küçük düşüren sözler söylemeye başlar. Alyoşa, inancını sarsan bu olaydan derinden etkilenir ve öfkeyle manastırı terk eder. Arkadaşı Rakitin, onu Grushenka’nın evine götürür. Grushenka, Alyoşa’yı baştan çıkarmak ister, ama Zosima’nın öldüğünü öğrenince ona şefkatle davranır. İki yaralı ruh, birbirlerine teselli olur.',
          'Alyoşa, o gece manastıra döner ve Zosima’nın tabutunun başında, bir rahibin okuduğu İncil’deki Kana düğünü hikâyesini dinlerken uykuya dalar. Rüyasında, Zosima’nın düğün sofrasında neşe içinde olduğunu görür. Uyandığında bahçeye çıkar, yıldızlı gökyüzünün altında kendini toprağa atar, onu öper ve gözyaşları içinde yeryüzüne ve bütün insanlığa sonsuza kadar bağlı kalacağına yemin eder. Ertesi gün, Zosima’nın öğüdüne uyarak dünyaya, insanların arasına döner.'
        ]
      },
      {
        title: 'Cinayet Gecesi',
        image: { svg: murder, caption: 'Karanlık bahçe, aydınlık bir pencere ve elinde havanelini tutan bir gölge.' },
        text: [
          'Dmitri, Grushenka’nın o gece babasına gidip gitmeyeceğinden şüphelenerek deliye döner. Katerina’ya olan borcunu ödemek ve Grushenka ile yeni bir hayata başlamak için umutsuzca üç bin ruble aramaktadır. Herkesten borç ister, ama kimse ona yardım etmez. Gece, elinde bir pirinç havanelini ile babasının bahçesine girer ve pencerenin altında bekler.',
          'Pencereden, babasının Grushenka’yı umutla beklediğini görür. Grushenka’nın orada olmadığını anlar. Babasının yüzüne baktığında içinde korkunç bir nefret yükselir. Ama son anda, kendi sözleriyle, sanki bir şeytan ya da annesinin duası onu durdurmuş gibi, geri çekilir. Kaçarken, bahçe duvarında onu yakalamaya çalışan yaşlı uşak Grigori’nin başına havaneliyle vurur ve onu kanlar içinde bırakarak kaçar.',
          'O gece Fyodor Karamazov, kafası ezilmiş olarak evinde ölü bulunur. Yastığının altındaki, Grushenka için hazırlanmış üç bin rublelik zarf da yerinde değildir. Zarf, boş bir hâlde yerde yatmaktadır. Herkes, bu cinayeti babasını defalarca tehdit eden, aynı gece elinde bir havaneliyle oraya giden ve birdenbire büyük bir paraya kavuşan Dmitri’nin işlediğine inanır.'
        ]
      },
      {
        title: 'Smerdyakov’un İtirafı',
        image: { svg: mokroye, caption: 'Mokroye’deki çılgın şölen ve kapıda beliren polisler.' },
        text: [
          'Dmitri, o gece kanlı elleri ve ceplerinde parayla Mokroye köyüne gider. Grushenka, eski Polonyalı sevgilisiyle orada buluşmaktadır. Dmitri, onu son bir kez görmek ve sonra kendini vurmak niyetindedir. Ama Grushenka, Polonyalının ne kadar sefil bir adam olduğunu anlar ve aslında Dmitri’yi sevdiğini itiraf eder. Bütün gece süren çılgın bir şölenin ortasında, sabaha karşı polisler gelir ve Dmitri babasını öldürmekten tutuklanır.',
          'Dmitri, sorgu sırasında babasını öldürmediğini, harcadığı paranın aslında Katerina’nın emanet ettiği paranın yarısı olduğunu, diğer yarısını bir keseye dikip boynunda taşıdığını söyler. Ama kimse ona inanmaz. Bu sırada İvan, cinayetin arkasında kendisinin de bir sorumluluğu olup olmadığını düşünerek kıvranmaktadır. Smerdyakov ile üç kez görüşür.',
          'Üçüncü görüşmede Smerdyakov, babayı kendisinin öldürdüğünü itiraf eder. Sara krizi geçiriyormuş gibi yaptığını, Dmitri gittikten sonra Fyodor’u öldürüp parayı aldığını anlatır. Ama asıl katilin İvan olduğunu söyler. Çünkü İvan’ın “Tanrı yoksa her şey mubahtır” fikrinden ilham almış ve İvan’ın gizli arzusunu gerçekleştirdiğini düşünmüştür. Smerdyakov, parayı İvan’a verir ve o gece kendini asar. İvan ise bu yükü taşıyamayarak delirmeye başlar ve odasında şeytanla konuştuğu hayaller görür.'
        ]
      },
      {
        title: 'İlyuşa’nın Taşı',
        image: { svg: stone, caption: 'Küçük İlyuşa’nın sevdiği büyük taşın etrafında toplanan çocuklar.' },
        text: [
          'Dmitri’nin duruşması, bütün Rusya’nın dikkatini çeken bir olaya dönüşür. İvan, mahkemede Smerdyakov’un itirafını anlatır ve parayı gösterir, ama yüksek ateş içinde sayıklamaya başladığı için kimse ona inanmaz. Katerina ise İvan’ı kurtarmak için Dmitri’nin babasını öldürmekle tehdit ettiği bir mektubu mahkemeye sunar. Jüri, Dmitri’yi suçlu bulur ve onu Sibirya’da yirmi yıl kürek cezasına çarptırır. Kardeşleri, onu Amerika’ya kaçırmayı planlar.',
          'Dmitri, cezasını bir tür arınma olarak kabul eder. Babasını öldürmemiş olsa bile, onu öldürmeyi arzuladığı için suçlu olduğunu düşünür. Zosima’nın öğrettiği gibi, herkesin herkes için sorumlu olduğuna inanmaya başlar. Grushenka, onunla birlikte Sibirya’ya gitmeye karar verir. Aralarındaki tutku, gerçek bir sevgiye dönüşür.',
          'Romanın son sahnesinde Alyoşa, yoksul bir ailenin hasta çocuğu olan küçük İlyuşa’nın cenazesindedir. İlyuşa’nın babası, bir zamanlar Dmitri tarafından aşağılanmıştı. Alyoşa, bu çocukla arkadaşlık eden okul çocuklarını, İlyuşa’nın sevdiği büyük bir taşın etrafında toplar. Onlara, birbirlerini ve bu anı hayatları boyunca unutmamalarını, iyi ve dürüst olmalarını söyler. Çocuklar hep bir ağızdan “Yaşasın Karamazov!” diye bağırır. Karamazov Kardeşler, inanç, şüphe, özgürlük ve sevgi üzerine yazılmış en büyük romanlardan biri olarak, umut dolu bu sahneyle biter.'
        ]
      }
    ]
  };
})();
