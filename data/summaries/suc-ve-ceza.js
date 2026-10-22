// Suç ve Ceza — Fyodor Dostoyevski (1866)
// Sahneler data/scenes.js yardımcılarıyla çizilir; ileride image.src ile gerçek çizimlerle değiştirilebilir.
(() => {
  const { svg, glow, skyline, figure, seated, streaks, dots } = window.Scene;

  // 1 — Gün batımında Petersburg ve köprüdeki yalnız figür
  const petersburg = svg({
    sky: ['#2b1d3a', '#7a3b4a', '#d9784a', '#f2b36b'],
    body: id => `
      ${glow(id, 560, 140, 240, '#ffd08a', .7)}
      <circle cx="560" cy="140" r="34" fill="#ffe2a8"/>
      ${skyline({ y: 270, color: '#5a3346', seed: 3, lit: .08, minH: 90, maxH: 200, dome: false })}
      ${skyline({ y: 290, color: '#2a1a28', seed: 11, lit: .22, minH: 60, maxH: 160 })}
      <rect y="290" width="800" height="110" fill="#1f1622"/>
      <rect x="520" y="292" width="80" height="108" fill="#f2b36b" opacity=".25" filter="url(#${id}soft)"/>
      ${Array.from({ length: 14 }, (_, i) => `<line x1="${490 + (i * 37) % 140}" y1="${300 + i * 7}" x2="${520 + (i * 37) % 140}" y2="${300 + i * 7}" stroke="#ffd08a" stroke-width="2" opacity="${.6 - i * .035}"/>`).join('')}
      <path d="M140 300 Q400 240 660 300 L660 312 Q400 254 140 312 Z" fill="#120c12"/>
      <g stroke="#120c12" stroke-width="3">${Array.from({ length: 12 }, (_, i) => `<line x1="${180 + i * 40}" y1="${288 - Math.sin((i + 1) / 13 * Math.PI) * 44}" x2="${180 + i * 40}" y2="${270 - Math.sin((i + 1) / 13 * Math.PI) * 44}"/>`).join('')}</g>
      ${figure(400, 256, .9, '#0b080b', { hat: true })}`
  });

  // 2 — Meyhanede lamba ışığı altında iki adam
  const tavern = svg({
    sky: ['#120b08', '#2a170e', '#3b2214'],
    body: id => `
      ${glow(id, 400, 90, 320, '#ffb35a', .55)}
      <line x1="400" y1="0" x2="400" y2="70" stroke="#000" stroke-width="2"/>
      <path d="M385 70 h30 l-6 28 h-18 z" fill="#2a1a10"/><circle cx="400" cy="92" r="9" fill="#fff1c2"/>
      ${glow(id, 400, 92, 60, '#fff1c2', .9)}
      <g fill="#1a0f09" opacity=".9">
        <rect x="40" y="60" width="140" height="10"/><rect x="620" y="60" width="140" height="10"/>
        ${[50, 75, 100, 130, 155, 630, 660, 690, 720, 745].map((x, i) => `<rect x="${x}" y="${30 + (i % 3) * 4}" width="12" height="${30 - (i % 3) * 4}" rx="3"/>`).join('')}
      </g>
      <rect y="300" width="800" height="100" fill="#140b07"/>
      <path d="M230 250 H570 L590 270 H210 Z" fill="#5a3a22"/><rect x="230" y="270" width="12" height="80" fill="#3a2414"/><rect x="558" y="270" width="12" height="80" fill="#3a2414"/>
      ${seated(300, 252, 1.6, '#0c0705')}
      ${seated(510, 252, 1.6, '#0c0705', true)}
      <rect x="380" y="226" width="12" height="26" rx="3" fill="#6fa36a" opacity=".8"/><rect x="410" y="236" width="14" height="16" rx="2" fill="#d9a35a" opacity=".7"/>
      <path d="M330 150 q20 -30 0 -60 q-20 -30 10 -60" stroke="#e8d4b0" stroke-width="5" fill="none" opacity=".12" filter="url(#${id}soft)"/>
      ${dots(9, 50, '#ffd9a0', 1.2, .4, 40, 260)}`
  });

  // 3 — Karanlık merdivenler, kapı aralığından sızan ışık
  const stairs = svg({
    sky: ['#0b0a0c', '#16131a', '#0d0b0e'],
    vignette: .8,
    body: id => `
      <polygon points="560,60 680,60 800,400 470,400" fill="#d9a35a" opacity=".12" filter="url(#${id}blur)"/>
      <rect x="560" y="40" width="120" height="260" fill="#241a14"/>
      <rect x="600" y="40" width="80" height="260" fill="#3a2a1e"/>
      <rect x="592" y="40" width="10" height="260" fill="#ffcf7a"/>
      ${glow(id, 597, 170, 120, '#ffcf7a', .45)}
      <g fill="#1c1716">${Array.from({ length: 8 }, (_, i) => `<rect x="${60 + i * 60}" y="${380 - i * 34}" width="${560 - i * 60}" height="34" fill="${i % 2 ? '#1c1716' : '#211b19'}"/>`).join('')}</g>
      <path d="M40 400 L520 120" stroke="#3a302a" stroke-width="5"/>
      ${Array.from({ length: 9 }, (_, i) => `<line x1="${60 + i * 56}" y1="${388 - i * 32}" x2="${60 + i * 56}" y2="${340 - i * 32}" stroke="#3a302a" stroke-width="3"/>`).join('')}
      ${figure(470, 160, 1.5, '#050405', { hat: false })}
      <path d="M470 160 L140 400 L260 400 Z" fill="#000" opacity=".35" filter="url(#${id}soft)"/>`
  });

  // 4 — Tavan arası, ay ışığı ve ateşli rüya
  const fever = svg({
    sky: ['#121826', '#1c2335', '#2a2a3a'],
    body: id => `
      <polygon points="0,0 800,0 800,60 0,150" fill="#0c101a"/>
      <rect x="100" y="70" width="110" height="130" fill="#7fa0c8" opacity=".55"/>
      <line x1="155" y1="70" x2="155" y2="200" stroke="#121826" stroke-width="6"/><line x1="100" y1="135" x2="210" y2="135" stroke="#121826" stroke-width="6"/>
      <polygon points="100,70 210,70 560,400 280,400" fill="#9fbbe0" opacity=".14" filter="url(#${id}blur)"/>
      <path d="M260 290 H640 V320 H260 Z" fill="#d6d0c4"/><path d="M260 280 Q450 250 640 282 V292 H260 Z" fill="#ebe6dc"/>
      <rect x="250" y="270" width="12" height="90" fill="#3a2e26"/><rect x="636" y="290" width="12" height="70" fill="#3a2e26"/>
      <ellipse cx="300" cy="268" rx="30" ry="12" fill="#fff"/><circle cx="305" cy="258" r="13" fill="#2a2420"/>
      <g fill="none" stroke="#e76f51" stroke-width="2.5" opacity=".35" filter="url(#${id}soft)">
        <path d="M330 220 C400 140 480 260 560 160 S700 140 720 80"/>
        <path d="M340 240 C430 180 500 290 600 200"/>
      </g>
      ${figure(700, 300, 1.2, '#0a0c12', {})}
      ${dots(4, 70, '#c8d8f0', 1.1, .45, 80, 380)}`
  });

  // 5 — Gece sokağı, fener altında Sonya
  const street = svg({
    sky: ['#0d1220', '#1a2238', '#2c2b3a'],
    body: id => `
      ${skyline({ y: 290, color: '#0a0d17', seed: 21, lit: .18 })}
      <rect y="290" width="800" height="110" fill="#0f1320"/>
      <path d="M0 330 H800" stroke="#1d2436" stroke-width="40" opacity=".6"/>
      <rect x="560" y="120" width="6" height="190" fill="#05070c"/><path d="M548 112 h30 l-6 -24 h-18 z" fill="#05070c"/>
      ${glow(id, 563, 108, 150, '#ffd28a', .6)}
      <ellipse cx="563" cy="318" rx="120" ry="18" fill="#ffd28a" opacity=".18"/>
      ${figure(600, 320, 1.7, '#140a10', { dress: true, shawl: '#6a2a3a' })}
      <g fill="#05070c">${[120, 160, 190, 230, 270].map((x, i) => figure(x, 320 + (i % 2) * 6, 1.1 + (i % 3) * .1, '#05070c', { hat: i % 2 === 0 })).join('')}</g>
      <circle cx="350" cy="300" r="24" fill="none" stroke="#05070c" stroke-width="5"/><rect x="320" y="270" width="80" height="22" fill="#05070c"/>`
  });

  // 6 — Sorgu yargıcının odası, pencereden vuran öğle ışığı
  const office = svg({
    sky: ['#3a2c20', '#4e3b2a', '#2a1f16'],
    body: id => `
      <rect x="520" y="40" width="200" height="190" fill="#f4e1b0" opacity=".85"/>
      <line x1="620" y1="40" x2="620" y2="230" stroke="#3a2c20" stroke-width="8"/><line x1="520" y1="135" x2="720" y2="135" stroke="#3a2c20" stroke-width="8"/>
      <polygon points="520,40 720,40 520,400 160,400" fill="#f4e1b0" opacity=".14" filter="url(#${id}blur)"/>
      <rect x="40" y="60" width="140" height="240" fill="#2a1f16"/>
      ${Array.from({ length: 5 }, (_, r) => Array.from({ length: 6 }, (_, c) => `<rect x="${48 + c * 21}" y="${70 + r * 46}" width="16" height="36" fill="${['#5a2a22', '#2a3a4a', '#4a4a2a', '#3a2a3a'][(r + c) % 4]}"/>`).join('')).join('')}
      <path d="M220 260 H600 L620 280 H200 Z" fill="#5a3e28"/><rect x="215" y="280" width="390" height="70" fill="#3a2818"/>
      <rect x="340" y="246" width="70" height="12" fill="#efe6d2" transform="rotate(-6 375 252)"/>
      ${seated(300, 262, 1.7, '#16120e')}
      ${seated(530, 262, 1.7, '#0a0a0c', true)}
      <path d="M290 160 q-12 -30 8 -55 q18 -24 0 -50" stroke="#efe6d2" stroke-width="4" fill="none" opacity=".25" filter="url(#${id}soft)"/>
      ${dots(13, 60, '#fff3d0', 1, .5, 40, 380)}`
  });

  // 7 — Neva üzerinde fırtına
  const storm = svg({
    sky: ['#0a0e16', '#1a2433', '#2a3646'],
    vignette: .7,
    body: id => `
      ${glow(id, 330, 60, 260, '#c8d8ff', .35)}
      <path d="M330 0 L300 90 L330 90 L290 200" stroke="#f1f6ff" stroke-width="4" fill="none"/>
      <path d="M330 0 L300 90 L330 90 L290 200" stroke="#9fb8ff" stroke-width="14" fill="none" opacity=".25" filter="url(#${id}soft)"/>
      ${skyline({ y: 260, color: '#070a10', seed: 31, lit: .1, light: '#d9c48a' })}
      <rect y="260" width="800" height="140" fill="#162232"/>
      <path d="M0 300 Q100 290 200 300 T400 300 T600 300 T800 300" stroke="#2c4058" stroke-width="3" fill="none"/>
      <path d="M0 340 Q100 330 200 340 T400 340 T600 340 T800 340" stroke="#2c4058" stroke-width="3" fill="none"/>
      <path d="M380 260 Q560 200 800 250 V262 Q560 214 380 272 Z" fill="#05070a"/>
      ${figure(600, 228, 1, '#000', { hat: true })}
      ${streaks(17, 260, '#b8c8e0', 34, -10, .45)}`
  });

  // 8 — Sibirya’da şafak, nehir kıyısında iki figür
  const siberia = svg({
    sky: ['#4a5a7a', '#c9a0a0', '#f6d3a0', '#fbe8c8'],
    vignette: .35,
    grain: .12,
    body: id => `
      ${glow(id, 620, 250, 260, '#fff0c0', .8)}
      <circle cx="620" cy="250" r="40" fill="#fff6dc"/>
      <path d="M0 250 Q160 210 320 240 T640 230 T800 240 V400 H0 Z" fill="#b8c4d6"/>
      <path d="M0 275 Q200 255 400 275 T800 268 V400 H0 Z" fill="#e8eef4"/>
      <path d="M0 320 Q300 300 800 330 V360 Q300 330 0 350 Z" fill="#8fa8c0"/>
      <path d="M520 323 Q620 318 720 328" stroke="#fff6dc" stroke-width="3" opacity=".7"/>
      <g fill="#6a7a8a">${[60, 90, 110, 730, 760].map((x, i) => `<path d="M${x} ${250 + (i % 2) * 6} l12 -46 l12 46 z"/>`).join('')}</g>
      <rect x="250" y="300" width="130" height="12" rx="6" fill="#4a3a2e"/>
      ${seated(285, 300, 1.2, '#2a2a30')}
      ${figure(345, 312, 1.15, '#3a2630', { dress: true, shawl: '#8a4a5a' })}
      ${dots(23, 90, '#ffffff', 1.4, .8)}`
  });

  window.SUMMARIES['suc-ve-ceza'] = {
    pages: [
      {
        title: 'Petersburg’da Bir Tavan Arası',
        image: { svg: petersburg, caption: 'Temmuz akşamı Petersburg: kızıl bir gökyüzünün altında yalnız bir genç.' },
        text: [
          '1865 yazında Petersburg, tozun, kireç kokusunun ve meyhanelerden taşan sarhoş seslerin birbirine karıştığı bunaltıcı bir şehirdir. Samanpazarı’nın dar sokaklarından birinde, beş katlı bir binanın tam çatısının altında, tabuttan farksız küçük bir odada Rodion Romanoviç Raskolnikov yaşar. Yirmi üç yaşındadır, yakışıklı ve zekidir, ama parasızlık yüzünden hukuk fakültesini bırakmış, yavaş yavaş insanlardan da kendinden de uzaklaşmıştır. Ev sahibesine kira borcu o kadar birikmiştir ki merdivenlerden onunla karşılaşmamak için sessizce, neredeyse nefesini tutarak iner.',
          'Raskolnikov’un aklında haftalardır kimseye açamadığı bir düşünce dolaşmaktadır. Şehrin öbür ucunda, öğrencilerin ve yoksulların değerli eşyalarını rehin alıp onlara ağır faizle para veren yaşlı bir tefeci, Alyona İvanovna yaşar. Raskolnikov, bu cimri ve acımasız kadının ölümüyle dünyanın daha iyi bir yer olacağına, onun sandığında çürüyen parayla yüzlerce gencin kurtarılabileceğine kendini inandırmaya çalışır. Kendi gözünde bu kadın, ezilmesi gereken bir bitten farksızdır.',
          'Romanın ilk adımı, bu düşüncenin bir tür provasıdır. Raskolnikov, babasından kalan eski gümüş saati rehin bırakmak bahanesiyle tefecinin evine gider. Kadın kapıyı aralayıp şüpheyle yüzüne bakarken o, odaların yerini, sandığın durduğu köşeyi ve anahtarların nerede saklandığını tek tek aklına kazır. Sokağa çıktığında ise kendinden öylesine tiksinir ki az kalsın her şeyden vazgeçecektir. Ama içindeki ses susmaz ve Dostoyevski, okuru daha ilk sayfalarda bu sesin içine, ateşli ve tutarsız bir vicdanın tam ortasına yerleştirir.'
        ]
      },
      {
        title: 'Meyhanedeki Adam ve Bir Mektup',
        image: { svg: tavern, caption: 'Lambanın sarı ışığı altında Marmeladov, hayatını bir yabancıya anlatır.' },
        text: [
          'Tefecinin evinden dönerken Raskolnikov, kendini neredeyse farkında olmadan bir meyhanenin loş kalabalığında bulur. Orada, yüzü içkiden şişmiş ama gözlerinde tuhaf bir ağırbaşlılık taşıyan eski bir memur, Semyon Zaharoviç Marmeladov, ona sanki yıllardır tanışıyorlarmış gibi derdini açar. İşini içki yüzünden kaybettiğini, karısı Katerina İvanovna’nın veremden kıvrandığını, küçük çocuklarının aç uyuduğunu anlatır. En acısını da en sona saklar: Ailesini açlıktan kurtarmak için ilk evliliğinden olan kızı Sonya, sokağa düşmek zorunda kalmıştır.',
          'Marmeladov kendini bağışlamaz, ama yine de bir gün Tanrı’nın kendisi gibi düşkünleri de kucaklayacağına inanır. Raskolnikov onu kolundan tutup rutubetli evine kadar götürür ve oradan çıkarken, kimse görmesin diye, cebindeki son bozuklukları sessizce pencerenin kenarına bırakır. Bu küçük iyilik, birkaç gün sonra işleyeceği korkunç suçun yanında garip bir tezat gibi durur. Dostoyevski’nin kahramanı ne bütünüyle kötüdür ne de iyi, ikisi aynı anda onun içinde yaşar.',
          'Ertesi sabah taşradaki annesinden uzun bir mektup gelir. Pulheriya Aleksandrovna sevgi dolu ama endişeli satırlarla, kızı Dunya’nın Pyotr Petroviç Lujin adında, yaşça büyük ve hesapçı bir avukatla nişanlandığını yazar. Raskolnikov satırların arasındaki gerçeği hemen sezer. Kız kardeşi bu evliliği sevdiği için değil, ağabeyinin geleceğini kurtarmak için kabul etmiştir. Ona göre Dunya da tıpkı Sonya gibi ailesi uğruna kendini satmaktadır ve bu düşünce, içindeki öfkeyi dayanılmaz bir noktaya taşır.',
          'O gece gördüğü kâbusta, sarhoş bir köylü, arabasına koşulu zayıf bir atı kalabalığın kahkahaları arasında döve döve öldürür. Raskolnikov ter içinde uyanır ve planından vazgeçtiğine yemin eder. Ama aynı akşam pazarda kulağına çalınan bir konuşma, tefecinin kız kardeşi Lizaveta’nın ertesi gün saat yedide evde olmayacağını haber verir. Sanki kader, onu kararından geri döndürmemek için her şeyi hazırlamıştır.'
        ]
      },
      {
        title: 'Suç',
        image: { svg: stairs, caption: 'Karanlık merdivenler ve aralık bir kapıdan sızan ışık.' },
        text: [
          'Ertesi akşam Raskolnikov, paltosunun iç astarına diktiği bir ilmeğe kapıcının odasından aldığı baltayı asar ve titreyen elleriyle, içine kâğıt sardığı tahta bir parçayı sahte bir rehin gibi paketler. Merdivenleri çıkarken kalbinin sesini duyar gibidir. Alyona İvanovna paketi açmak için ışığa döndüğü anda balta kadının başına iner. Raskolnikov sanki kendi bedenini uzaktan izleyen bir yabancı gibi, kadının boynundaki anahtarları çeker, sandığı karıştırır ve birkaç mücevherle küçük bir keseyi ceplerine doldurur.',
          'Tam o sırada, hiç beklemediği bir anda, evde olmaması gereken Lizaveta kapıdan girer. Uysal, kimseye kötülüğü dokunmamış bu kadın, korkudan elini bile kaldıramadan donup kalır. Raskolnikov onu da öldürür. Planında olmayan bu ikinci cinayet, kendini ilkeleri uğruna sınırı aşan “olağanüstü” bir insan olarak görme hayalini daha o anda paramparça eder. Artık o yalnızca korkmuş bir katildir.',
          'Kaçmaya hazırlanırken merdivenlerden ayak sesleri yükselir. İki adam kapıya dayanır, içeriden sürgülenmiş kapıyı zorlar, şüphelenip kapıcıyı çağırmak için aşağı inerler. Raskolnikov bu birkaç dakikalık boşlukta merdivenlerden süzülür, alt kattaki boyacıların bıraktığı boş daireye saklanır ve ardından, kalabalık sokağa karışarak kimseye görünmeden evine döner. Baltayı da yerine bırakmayı unutmaz.',
          'Kusursuz sandığı suç işlenmiştir, ama Raskolnikov ne parayı kullanmaya cesaret edebilir ne de kendini büyük bir insan gibi hissedebilir. Çaldığı eşyaları birkaç gün sonra ıssız bir avluda bir taşın altına gömer ve bir daha onlara bakmaz bile. Romanın geri kalanı suçun değil cezanın hikâyesidir ve bu ceza, mahkemeden çok önce, Raskolnikov’un kendi zihninde başlar.'
        ]
      },
      {
        title: 'Ateş ve Korku',
        image: { svg: fever, caption: 'Tavan arasındaki odada ay ışığı ve sayıklamalarla geçen günler.' },
        text: [
          'Cinayetin ertesi sabahı kapısına gelen bir karakol çağrısı, Raskolnikov’un yüreğini ağzına getirir. Oysa çağrı yalnızca ödenmemiş kira borcu içindir. Ne var ki memurlar onun yanında bir önceki akşamki cinayeti konuşmaya başlayınca bayılıp yere yığılır. Bu küçük olay, polis memurlarının zihninde fark edilmeden büyüyecek ilk şüphe tohumunu eker.',
          'Sonraki günleri ateşler içinde, gerçekle sayıklama arasında gidip gelerek geçirir. Başında, onu bir an bile yalnız bırakmayan eski okul arkadaşı Dmitri Razumihin vardır. Razumihin gürültücü, neşeli, yoksul ama hayata inatla tutunan bir gençtir. Ona doktor getirir, yeni elbiseler alır, bir yandan da şehirde konuşulanları anlatır: Cinayet herkesin dilindedir ve aynı binada çalışan genç bir boyacı, Mikolka, şüpheli olarak gözaltına alınmıştır.',
          'Bu sırada Dunya’nın nişanlısı Lujin, Raskolnikov’la tanışmak için odaya gelir. Kibirli tavırlarıyla, yoksul bir kızla evlenmenin bir erkeğe sağlayacağı avantajlardan söz eder. Raskolnikov onun bu sözlerini yüzüne vurur ve adamı kapı dışarı eder. Lujin’e duyduğu nefret, aslında yoksulluğu kendi çıkarına kullanan bütün dünyaya duyduğu öfkenin bir yansımasıdır.',
          'İyileşir iyileşmez Raskolnikov tehlikeli bir oyunun içine düşer. Bir kahvehanede rastladığı polis kâtibi Zamyotov’a, sanki şaka yapıyormuş gibi, “Ya o kadınları ben öldürdüysem?” diye sorar. Ardından suç mahalline geri döner, kapı zilini çalar ve boyacılara kan lekelerini sorar. Bir yanı suçunu saklamaya çalışırken öbür yanı onu bağırarak itiraf etmek ister ve bu çelişki romanın sonuna kadar içini kemirir.'
        ]
      },
      {
        title: 'Sonya',
        image: { svg: street, caption: 'Fener ışığının altında, omzunda solgun bir şalla Sonya.' },
        text: [
          'Bir akşam sokakta toplanmış bir kalabalık görür. Bir arabanın tekerlekleri altında kalan adam Marmeladov’dur. Raskolnikov onu evine taşıtır, doktor çağırır ve masrafları üstlenir. Marmeladov, karısının çaresiz çığlıkları ve çocuklarının şaşkın bakışları arasında, son anda koşup gelen kızı Sonya’nın kollarında can verir. Raskolnikov, annesinin büyük fedakârlıklarla gönderdiği son parayı hiç düşünmeden cenaze için Katerina İvanovna’ya bırakır.',
          'Sonya Semyonovna Marmeladova, romanın sessiz vicdanıdır. Düştüğü hayatın bütün karanlığına rağmen ruhu temiz kalmış, utangaç, ince ve derin bir inanca sahip bir genç kızdır. Raskolnikov onda kendisi gibi “sınırı aşmış” birini görür. Ama aralarında büyük bir fark vardır: Sonya başkaları için kendi hayatını feda etmiş, Raskolnikov ise kendi fikri uğruna başkasının hayatına son vermiştir.',
          'Aynı günlerde annesi ve kız kardeşi Petersburg’a gelir. Raskolnikov onları yıllardır özlemiş olmasına rağmen sevinemez, çünkü onların koşulsuz sevgisi ona taşıyamayacağı bir yük gibi gelir. Dunya’dan Lujin’le evlenmemesini ister. Razumihin ise Dunya’yı görür görmez ona âşık olur ve kısa sürede ailenin en güvenilir dayanağına dönüşür.',
          'Bir gece Raskolnikov, Sonya’nın kenar mahalledeki küçük odasına gider ve ona İncil’den Lazarus’un dirilişini okumasını ister. Sonya, mum ışığında titreyen sesiyle, dört gün mezarda yattıktan sonra yeniden hayata dönen adamın hikâyesini okur. Bu sahne romanın kalbidir, çünkü bütün kitap aynı soruya doğru akar: Ruhu ölmüş bir insan yeniden dirilebilir mi?'
        ]
      },
      {
        title: 'Porfiri ile Kedi-Fare Oyunu',
        image: { svg: office, caption: 'Sorgu yargıcı Porfiri Petroviç’in güneşli ama tekinsiz odası.' },
        text: [
          'Cinayet soruşturmasını yürüten sorgu yargıcı Porfiri Petroviç, Razumihin’in uzaktan akrabasıdır. Raskolnikov, tefeciye rehin bıraktığı eşyaları sorma bahanesiyle onu ziyaret eder. Porfiri tombul, güler yüzlü ve biraz dağınık bir adamdır. Bitmek bilmeyen şakaları ve dolambaçlı konuşmasıyla zararsız görünür, ama bu görünüşün ardında insan ruhunu bir kitap gibi okuyan keskin bir zekâ saklıdır.',
          'Porfiri, Raskolnikov’un birkaç ay önce bir dergide yayımlanan makalesini açar. Bu yazıya göre insanlar iki gruba ayrılır. Bir yanda kanunlara uyan, sadece çoğalan sıradan insanlar vardır. Öbür yanda ise Napolyon gibi, insanlığa yeni bir söz söylemek için gerekirse kan dökme hakkını kendinde bulan olağanüstü insanlar. Porfiri gülümseyerek sorar: “Peki siz kendinizi hangisinden sayıyorsunuz?” Bu masum görünen soru, ikisi arasındaki sessiz düellonun ilk hamlesidir.',
          'Porfiri elinde hiçbir somut kanıt olmadan, yalnızca sorular, imalar ve beklenmedik dönüşlerle Raskolnikov’un sinirlerini yavaş yavaş yıpratır. Ona göre böyle bir suçlu er ya da geç kendi ayağıyla gelecektir, tıpkı mumun etrafında dönüp duran ve sonunda kanatlarını yakan bir pervane gibi. İkinci görüşmelerinde gerilim öyle bir noktaya ulaşır ki Raskolnikov bağırarak kendini ele vermek üzeredir. Tam o anda kapı açılır, boyacı Mikolka içeri dalar ve cinayetleri kendisinin işlediğini itiraf eder. Porfiri bu itirafın sahte olduğunu bilir, ama Raskolnikov kısa bir süreliğine de olsa nefes alır.'
        ]
      },
      {
        title: 'İtiraf Gecesi',
        image: { svg: storm, caption: 'Neva Nehri üzerinde şimşekler çakan, yağmurlu bir gece.' },
        text: [
          'Romanın en karanlık yüzü Arkadi İvanoviç Svidrigaylov’dur. Dunya bir zamanlar onun malikânesinde mürebbiye olarak çalışmış ve onun ahlaksız tekliflerinden zor kurtulmuştur. Karısının şüpheli ölümünün ardından Svidrigaylov da Petersburg’a gelir ve Raskolnikov’a sinsi bir yakınlıkla “Biz aynı türden insanlarız” der. Bu söz, Raskolnikov’un en çok korktuğu şeyi, yani fikirleriyle bir ahlaksızın arasında aslında pek fark olmayabileceğini yüzüne çarpar.',
          'Bu arada Dunya’nın ailesi tarafından reddedilen Lujin intikam peşine düşer. Marmeladov’un cenaze yemeğinde Sonya’nın cebine gizlice yüz ruble koyar ve ardından herkesin önünde onu hırsızlıkla suçlar. Olayı yan odadan gören genç Lebezyatnikov gerçeği açıklayınca Lujin rezil olur, ama yaşanan kargaşa Katerina İvanovna’nın evden kovulmasına yol açar. Zavallı kadın birkaç saat sonra, çocuklarını sokakta dans ettirip dilenirken, kanlar içinde öksürerek ölür.',
          'O gece Raskolnikov, Sonya’ya her şeyi anlatır. Önce ailesine yardım etmek için öldürdüğünü söyler, sonra Napolyon gibi olup olamayacağını görmek istediğini, en sonunda da asıl gerçeği itiraf eder: “Ben o yaşlı kadını değil, kendimi öldürdüm.” Sonya dehşetle sarsılır ama onu terk etmez. Ona meydana çıkıp diz çökmesini, kirlettiği toprağı öpmesini ve herkesin önünde suçunu söylemesini fısıldar.',
          'Ne var ki Svidrigaylov bu konuşmayı duvarın ardından dinlemiştir. Sırrı bir koz gibi kullanarak Dunya’yı tenha bir odaya çeker ve ondan sevgi koparmaya çalışır. Dunya tabancasını çeker ve ateş eder, kurşun adamı sıyırıp geçer. Svidrigaylov o an Dunya’nın kendisini asla sevmeyeceğini anlar ve kapıyı açıp onu serbest bırakır. Servetinin bir kısmını Sonya’ya ve Katerina’nın yetim çocuklarına bırakır ve o yağmurlu gecenin sabahında kendi hayatına son verir.'
        ]
      },
      {
        title: 'Sibirya’da Bir Şafak',
        image: { svg: siberia, caption: 'Sibirya’da donmuş nehrin kıyısında, yeni bir günün ilk ışıkları.' },
        text: [
          'Porfiri, Raskolnikov’u son bir kez ziyaret eder ve bu sefer her şeyi bildiğini açıkça söyler. Onu tutuklamak yerine kendiliğinden teslim olmasını önerir, çünkü bunun hem cezasını hafifleteceğine hem de ruhunu kurtaracağına inanır. Raskolnikov annesiyle vedalaşır, Dunya’ya gerçeği anlatır ve Sonya’nın verdiği tahta haçı boynuna takar. Samanpazarı meydanında, kalabalığın alaycı bakışları arasında diz çöker ve toprağı öper. Ardından karakola gider ve bir an tereddüt etse de, kapının önünde bekleyen Sonya’nın yüzünü görünce geri döner ve suçunu itiraf eder.',
          'Mahkeme, kendiliğinden teslim olmasını, hastalığını ve geçmişte yaptığı iyilikleri göz önünde bulundurarak ona sekiz yıl Sibirya’da kürek cezası verir. Annesi oğlunun başına gelenleri kabullenemeden hastalanır ve ölür. Dunya ile Razumihin evlenir ve geleceğe dair umutlu planlar kurar. Sonya ise Svidrigaylov’un bıraktığı parayla Raskolnikov’un peşinden Sibirya’ya gider, hapishanenin yakınına yerleşir ve kısa sürede bütün mahkûmların sevgisini kazanır.',
          'Raskolnikov ilk aylarda hâlâ gerçek bir pişmanlık duymaz. Başarısızlığını ahlaki bir hatadan çok, yeterince güçlü olamamasına bağlar. Ama bir bahar sabahı, nehrin kıyısında Sonya’yla yan yana otururken, nedenini kendisinin de bilmediği bir duyguyla birden onun ayaklarına kapanır ve ağlamaya başlar. İkisi de o anda her şeyin değiştiğini anlar. Önlerinde daha yedi uzun yıl vardır, ama artık bu yıllar karanlık bir bekleyiş değil, yavaş yavaş yeniden doğmanın vaadidir.',
          'Dostoyevski romanı, bir insanın adım adım yenilenmesinin “başka bir hikâye” olduğunu söyleyerek kapatır. Suç ve Ceza, aklın tek başına ahlakın yerini tutamayacağını ve insanın başkalarından koparak değil, sevgi ve acı yoluyla kurtulabileceğini anlatan, dünya edebiyatının en güçlü psikolojik romanlarından biri olarak bugün de okurunu sarsmaya devam eder.'
        ]
      }
    ]
  };
})();
