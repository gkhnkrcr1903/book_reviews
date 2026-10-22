// Homo Deus — Yuval Noah Harari (2015)
// Sahneler data/scenes.js yardımcılarıyla çizilir; ileride image.src ile gerçek çizimlerle değiştirilebilir.
(() => {
  const { svg, glow, skyline, figure, seated, streaks, dots } = window.Scene;

  // Ağ: düğümler ve bağlantılar
  const network = (seed, n, color, op = .5) => {
    const pts = Array.from({ length: n }, (_, i) => [((i * 137 + seed * 31) % 780) + 10, ((i * 89 + seed * 17) % 360) + 20]);
    let out = '';
    pts.forEach(([x, y], i) => {
      const [x2, y2] = pts[(i * 7 + 3) % n], [x3, y3] = pts[(i * 3 + 1) % n];
      out += `<line x1="${x}" y1="${y}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width=".8" opacity="${op * .6}"/><line x1="${x}" y1="${y}" x2="${x3}" y2="${y3}" stroke="${color}" stroke-width=".8" opacity="${op * .4}"/>`;
    });
    return out + pts.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${1.5 + (i % 3)}" fill="${color}" opacity="${op + .3}"/>`).join('');
  };

  // 1 — Kıtlık, salgın ve savaşın geride kaldığı bir dünya
  const agenda = svg({
    sky: ['#f4dcb0', '#e8c890', '#c8a870'],
    vignette: .35, grain: .12,
    body: id => `
      ${glow(id, 400, 240, 300, '#fff6d8', .9)}
      <path d="M0 260 Q400 230 800 260 V400 H0 Z" fill="#a8884a"/>
      <g opacity=".85">
        <g transform="translate(160 190)"><rect x="-40" y="-40" width="80" height="80" rx="12" fill="none" stroke="#5a3a1a" stroke-width="4"/><path d="M-20 10 q20 -40 40 0" stroke="#5a3a1a" stroke-width="4" fill="none"/><line x1="-44" y1="44" x2="44" y2="-44" stroke="#a83a2a" stroke-width="6"/></g>
        <g transform="translate(400 160)"><circle r="34" fill="none" stroke="#5a3a1a" stroke-width="4"/>${Array.from({ length: 8 }, (_, k) => `<line x1="${Math.cos(k * .785) * 34}" y1="${Math.sin(k * .785) * 34}" x2="${Math.cos(k * .785) * 46}" y2="${Math.sin(k * .785) * 46}" stroke="#5a3a1a" stroke-width="4"/>`).join('')}<line x1="-50" y1="50" x2="50" y2="-50" stroke="#a83a2a" stroke-width="6"/></g>
        <g transform="translate(640 190)"><path d="M-30 30 L30 -30 M-30 -30 L30 30" stroke="#5a3a1a" stroke-width="6"/><line x1="-44" y1="44" x2="44" y2="-44" stroke="#a83a2a" stroke-width="6"/></g>
      </g>
      ${figure(400, 340, 1.8, '#3a2410')}`
  });

  // 2 — Ölümsüzlük, mutluluk, tanrısallık
  const goals = svg({
    sky: ['#1a0e2a', '#3a1a4a', '#6a2a5a'],
    body: id => `
      ${glow(id, 400, 140, 260, '#ffd0ff', .45)}
      <path d="M400 40 L430 120 L510 120 L446 168 L470 248 L400 200 L330 248 L354 168 L290 120 L370 120 Z" fill="none" stroke="#ffe0ff" stroke-width="2" opacity=".6"/>
      <rect y="300" width="800" height="100" fill="#0e0818"/>
      ${[200, 300, 400, 500, 600].map((x, i) => `<rect x="${x - 6}" y="${300 - i * 20 - 40}" width="12" height="${i * 20 + 40}" fill="#0e0818"/>`).join('')}
      <path d="M200 260 L600 140" stroke="#0e0818" stroke-width="12"/>
      ${figure(560, 170, 1.4, '#05030a', {})}
      ${dots(13, 120, '#ffe0ff', 1.2, .8)}`
  });

  // 3 — Hayvanlar ve insanlar: endüstriyel çiftlik
  const animals = svg({
    sky: ['#3a3a42', '#5a5a62', '#7a7a7a'],
    vignette: .6, grain: .2,
    body: id => `
      <rect x="40" y="120" width="720" height="240" fill="#2a2a30"/>
      ${Array.from({ length: 9 }, (_, i) => `<rect x="${60 + i * 78}" y="140" width="66" height="200" fill="#3a3a40"/>
        <g transform="translate(${93 + i * 78} 300) scale(.8)" fill="#c8b8a8"><path d="M-30 -30 H18 Q26 -34 32 -30 L38 -32 L36 -24 Q34 -14 26 -12 V0 H20 V-10 H-20 V0 H-26 V-14 Q-34 -16 -34 -26 Z"/></g>
        ${Array.from({ length: 5 }, (_, k) => `<line x1="${60 + i * 78 + k * 16}" y1="140" x2="${60 + i * 78 + k * 16}" y2="340" stroke="#1a1a20" stroke-width="3"/>`).join('')}`).join('')}
      <polygon points="0,0 300,0 200,120 0,120" fill="#fff" opacity=".06"/>`
  });

  // 4 — Hümanizm: insanın kendine dönen bakışı
  const humanism = svg({
    sky: ['#2a1e14', '#4a3420', '#2a1e14'],
    body: id => `
      ${glow(id, 400, 200, 280, '#ffc070', .5)}
      <g transform="translate(400 200)" fill="none" stroke="#e8c88a" stroke-width="2" opacity=".75">
        <circle r="140"/><rect x="-100" y="-100" width="200" height="200"/>
        <line x1="-140" y1="0" x2="140" y2="0"/><line x1="0" y1="-140" x2="0" y2="140"/>
      </g>
      <g transform="translate(400 300) scale(3)" fill="#1a0e06">
        <path d="M-12 -48 Q0 -54 12 -48 L14 -12 H-14 Z"/><circle cx="0" cy="-60" r="9"/>
        <path d="M-12 -44 L-40 -64 M12 -44 L40 -64" stroke="#1a0e06" stroke-width="4"/>
        <rect x="-10" y="-14" width="7" height="14"/><rect x="3" y="-14" width="7" height="14"/>
      </g>`
  });

  // 5 — Özgür irade ve beyin: parçalanan benlik
  const brain = svg({
    sky: ['#0a1020', '#141e34', '#1a2440'],
    vignette: .65,
    body: id => `
      ${glow(id, 400, 190, 220, '#5ad0ff', .3)}
      <g transform="translate(400 190)">
        <path d="M-110 0 Q-120 -90 -30 -100 Q0 -130 40 -100 Q120 -100 120 -10 Q130 60 60 80 Q0 110 -60 80 Q-130 60 -110 0 Z" fill="#1e3050" stroke="#5ad0ff" stroke-width="2"/>
        <path d="M0 -110 Q-10 -40 10 0 Q-10 50 0 100" stroke="#5ad0ff" stroke-width="2" fill="none"/>
        ${Array.from({ length: 10 }, (_, i) => `<path d="M${-100 + i * 20} ${-40 + (i % 3) * 20} q15 -15 30 0" stroke="#5ad0ff" stroke-width="1.5" fill="none" opacity=".6"/>`).join('')}
      </g>
      <g stroke="#ff8a5a" stroke-width="2" opacity=".7">${Array.from({ length: 6 }, (_, i) => `<line x1="${280 + i * 48}" y1="300" x2="${300 + i * 40}" y2="360"/>`).join('')}</g>
      ${figure(220, 380, 1.4, '#05080e')}${figure(580, 380, 1.4, '#05080e')}`
  });

  // 6 — Zekâ ile bilincin ayrılması: algoritmalar
  const algorithms = svg({
    sky: ['#04080e', '#081420', '#0c1c2c'],
    vignette: .6,
    body: id => `
      ${network(5, 70, '#3ad8ff', .45)}
      ${glow(id, 400, 200, 160, '#3ad8ff', .25)}
      <rect x="300" y="120" width="200" height="150" rx="8" fill="#0a1824" stroke="#3ad8ff" stroke-width="2"/>
      ${Array.from({ length: 7 }, (_, i) => `<rect x="320" y="${140 + i * 17}" width="${60 + (i * 37) % 120}" height="6" fill="#3ad8ff" opacity=".6"/>`).join('')}
      ${figure(400, 360, 1.5, '#000', {})}`
  });

  // 7 — İşe yaramaz sınıf
  const useless = svg({
    sky: ['#2a2a30', '#4a4a50', '#6a6a6a'],
    vignette: .55,
    body: id => `
      ${skyline({ y: 240, color: '#1a1a1e', seed: 81, lit: .3, light: '#9ad8ff', dome: false })}
      <rect y="240" width="800" height="160" fill="#2a2a2e"/>
      ${[120, 280, 440, 600].map(x => `<g transform="translate(${x} 320)"><rect x="-26" y="-60" width="52" height="60" rx="6" fill="#4a4a52"/><circle cx="0" cy="-74" r="14" fill="#4a4a52"/><rect x="-8" y="-80" width="16" height="4" fill="#3ad8ff"/><rect x="-36" y="-50" width="10" height="34" fill="#4a4a52"/><rect x="26" y="-50" width="10" height="34" fill="#4a4a52"/></g>`).join('')}
      ${seated(700, 360, 1.5, '#0e0e12', true)}${seated(60, 362, 1.4, '#0e0e12')}
      ${streaks(91, 60, '#9aa0b0', 18, -4, .2)}`
  });

  // 8 — Veri dini: her şey akış
  const dataism = svg({
    sky: ['#000', '#04060c', '#0a0e1a'],
    vignette: .7,
    body: id => `
      ${Array.from({ length: 40 }, (_, i) => `<path d="M${(i * 41) % 800} 400 Q${400 + Math.sin(i) * 200} ${200 + Math.cos(i) * 60} ${(i * 73) % 800} 0" stroke="${i % 3 ? '#3ad8ff' : '#ff6ad8'}" stroke-width="1" fill="none" opacity=".25"/>`).join('')}
      ${glow(id, 400, 200, 200, '#ffffff', .35)}
      ${figure(400, 280, 1.8, '#000', {})}
      ${dots(101, 200, '#9af0ff', 1.2, .8)}`
  });

  window.SUMMARIES['homo-deus'] = {
    pages: [
      {
        title: 'İnsanlığın Yeni Gündemi',
        image: { svg: agenda, caption: 'Kıtlık, salgın ve savaş: binlerce yıllık üç düşman geri çekiliyor.' },
        text: [
          'Sapiens’te insanlığın geçmişini anlatan Yuval Noah Harari, Homo Deus’ta yüzünü geleceğe çevirir. Kitap, insanlık tarihinin büyük bir kısmında üç büyük düşmanla, yani kıtlıkla, salgınlarla ve savaşla mücadele edildiğini hatırlatarak başlar. Binlerce yıl boyunca insanlar bu üç belaya karşı dua etmiş, kurban adamış ve çoğu zaman çaresizce kaderlerine boyun eğmişlerdir.',
          'Yirmi birinci yüzyılın başında ise tablo tamamen değişmiştir. Harari, bugün dünyada açlıktan ölenlerden çok aşırı yemekten kaynaklanan hastalıklarla ölen insan olduğunu, salgın hastalıkların artık bulaşıcı hastalıklardan çok yaşlılıkla ilgili sorunlara dönüştüğünü ve savaşlarda ölenlerin sayısının intiharlardan bile az olduğunu belirtir. Bu sorunlar tamamen ortadan kalkmamıştır, ama artık kaçınılmaz kader değil, yönetilebilir sorunlar olarak görülür.',
          'Peki insanlık bu eski düşmanları büyük ölçüde yendikten sonra neyin peşine düşecek? Harari’ye göre yeni gündemin üç büyük hedefi vardır: ölümsüzlük, mutluluk ve tanrısallık. İnsan, yaşlanmayı ve ölümü bir teknik sorun olarak görmeye, mutluluğu kimyasal süreçlerle kontrol etmeye ve kendi bedenini ve zihnini yeniden tasarlayarak tanrılara benzer güçler kazanmaya çalışacaktır. Kitabın adı da buradan gelir: Homo Deus, yani “tanrı insan”.'
        ]
      },
      {
        title: 'Ölümsüzlük, Mutluluk ve Tanrısallık',
        image: { svg: goals, caption: 'Bir merdivenin tepesinde yıldızlara uzanan insan.' },
        text: [
          'Modern bilim, ölümü artık doğanın değişmez bir yasası olarak değil, çözülmesi gereken teknik bir arıza olarak görür. Kalp durursa, damar tıkanırsa ya da hücreler kanserleşirse, bunların hepsi bilimsel olarak anlaşılabilen ve tedavi edilebilecek süreçlerdir. Harari’ye göre zenginler ve güçlüler, önümüzdeki on yıllarda ömrü uzatmaya ve ölümü geciktirmeye yönelik araştırmalara büyük paralar yatıracaktır.',
          'İkinci hedef mutluluktur. Ama mutluluk peşinde koşmak kolay değildir, çünkü biyolojik olarak mutluluk kalıcı değil geçici bir duygudur. Evrim, bizi sürekli daha fazlasını istemeye programlamıştır. Bir hedefe ulaştığımızda kısa süre sevinir, sonra yeni bir hedef ararız. Harari, insanlığın bu döngüyü kırmak için ilaçlara, beyin müdahalelerine ve genetik mühendisliğine başvuracağını öngörür.',
          'Son ve en iddialı hedef ise tanrısallıktır. Bu, Harari için mecazi bir anlam taşır: İnsanlar, eski mitolojilerdeki tanrıların sahip olduğu güçleri, yani yaşamı yaratma, bedenleri dönüştürme ve doğayı yönetme yeteneğini kazanmaya çalışacaktır. Bunu üç yolla yapabiliriz: biyoloji mühendisliği, siborg mühendisliği ve organik olmayan varlıklar yaratmak. Harari, bu hedeflerin bir kehanet değil, olası bir yol olarak düşünülmesi gerektiğini vurgular.'
        ]
      },
      {
        title: 'Sapiens Dünyayı Nasıl Ele Geçirdi?',
        image: { svg: animals, caption: 'Endüstriyel çiftlikler: insanın diğer canlılar üzerindeki gücünün karanlık yüzü.' },
        text: [
          'İnsanların geleceğe nasıl davranacağını anlamak için önce diğer canlılara nasıl davrandığımıza bakmak gerekir. Harari, insanların hayvanlarla ilişkisini acı bir dürüstlükle anlatır. Bugün dünyadaki büyük hayvanların büyük çoğunluğu, insanların evcilleştirip endüstriyel çiftliklerde yetiştirdiği inek, domuz ve tavuklardır. Bu hayvanlar duygusal ve toplumsal ihtiyaçları olan canlılardır, ama hayatlarını dar kafeslerde, yalnızca et, süt ve yumurta için yaşatılarak geçirirler.',
          'İnsanlar bu davranışı, kendilerinin özel olduğuna inanarak meşrulaştırmıştır. Dinler insanın ölümsüz bir ruhu olduğunu söylemiştir. Modern bilim ise insan beyninde ruh diye bir şey bulamamış, ama aynı zamanda hayvanların da hisleri, korkuları ve acıları olduğunu kanıtlamıştır. Harari’ye göre insanın diğer canlılardan asıl farkı ruhu ya da bilinci değil, çok sayıda yabancıyla esnek bir şekilde iş birliği yapabilmesidir.',
          'Bu iş birliğini mümkün kılan şey de, Sapiens’te anlattığı gibi, ortak inandığımız kurgulardır. Para, uluslar, şirketler ve tanrılar, Harari’nin “özneler arası gerçeklik” dediği alanda var olur. Bunlar ne nesnel olarak ne de yalnızca bir kişinin zihninde var olur. Milyonlarca insan aynı anda inandığı sürece gerçektir. Bu kurgular insanlara dünyayı ele geçirme gücü vermiştir, ama aynı zamanda gerçek acıların görmezden gelinmesine de neden olmuştur.'
        ]
      },
      {
        title: 'Hümanizm Devrimi',
        image: { svg: humanism, caption: 'Anlamı gökyüzünde değil, insanın kendi içinde arayan modern çağ.' },
        text: [
          'Harari’ye göre modern dünya bir anlaşmayla başlamıştır: İnsanlar güç karşılığında anlamdan vazgeçmeyi kabul etmiştir. Eski dinler, dünyanın büyük bir kozmik planın parçası olduğunu ve insanın hayatının bu plan içinde bir anlam taşıdığını söylerdi. Modern bilim ise evrende böyle bir plan olmadığını, olayların kör yasalara göre gerçekleştiğini öne sürdü. Bu, insanları anlamdan yoksun bıraktı, ama karşılığında onlara dünyayı değiştirecek muazzam bir güç verdi.',
          'Peki anlamsız bir evrende insanlar nasıl yaşamaya devam etti? Cevap, Harari’nin “hümanizm” dediği yeni bir dinde yatar. Hümanizm, anlamın kaynağını Tanrı’da değil, insanın kendi duygularında ve deneyimlerinde arar. Artık neyin iyi neyin kötü olduğuna kutsal kitaplar değil, insanların kendi hisleri karar verir. Seçimlerde seçmen haklıdır, pazarda müşteri haklıdır, sanatta güzellik bakanın gözündedir, eğitimde öğrenciye kendi başına düşünmesi öğretilir.',
          'Harari, hümanizmin üç farklı kolu olduğunu söyler. Liberal hümanizm, her bireyin duygularının ve özgürlüğünün kutsal olduğunu savunur. Sosyalist hümanizm, bireyden çok toplumun ve diğer insanların duygularına önem verir. Evrimci hümanizm ise bazı insanların diğerlerinden daha üstün olduğunu ve insanlığın güçlülerin seçilmesiyle ilerleyeceğini öne sürer. Bu son akım, yirminci yüzyılda faşizm ve Nazizmle korkunç sonuçlar doğurmuştur. Yüzyılın sonunda ise liberal hümanizm galip gelmiştir.'
        ]
      },
      {
        title: 'Özgür İrade Bir Masal mı?',
        image: { svg: brain, caption: 'Beynin elektriksel ve kimyasal süreçleri: “ben” denen şeyin perde arkası.' },
        text: [
          'Liberal hümanizm, insanın özgür iradeye sahip, bölünmez ve kendine özgü bir birey olduğu inancına dayanır. Ama Harari’ye göre yaşam bilimleri tam da bu inancı sarsmaktadır. Beyin üzerinde yapılan deneyler, kararlarımızın bilinçli olarak farkına varmadan önce beynimizde oluştuğunu gösteriyor. Duygularımız ve arzularımız, binlerce yıllık evrim sürecinde şekillenmiş biyokimyasal algoritmaların ürünü olarak görülebilir.',
          'Harari bunu, psikolog Daniel Kahneman’ın ünlü deneyiyle de örnekler. Deneyde katılımcılar elini önce bir dakika boyunca çok soğuk suya, ardından başka bir denemede bir buçuk dakika boyunca, son yarım dakikası biraz daha ılık olan suya sokar. Mantıken ikinci deneme daha uzun ve daha acı vericidir. Ama katılımcıların çoğu, tekrar yapmaları gerekirse ikinci deneyi seçer. Çünkü insanın iki farklı “benliği” vardır: Anı anına yaşayan “deneyimleyen benlik” ve sonradan hikâye kuran “anlatan benlik”. Kararlarımızı çoğu zaman anlatan benlik verir.',
          'Bu bulgular, hümanizmin temel varsayımlarını tehdit eder. Eğer bölünmez bir “ben” yoksa, eğer kararlarımız aslında beynimizdeki kimyasal süreçlerden ibaretse, o zaman seçmenin, müşterinin ya da bireyin her zaman haklı olduğu fikri de sorgulanmaya başlar. Harari’ye göre bilim, insanı merkeze koyan modern dünyanın temellerini sessizce oyar.'
        ]
      },
      {
        title: 'Zekâ ile Bilincin Ayrılması',
        image: { svg: algorithms, caption: 'Hiçbir şey hissetmeden her şeyi hesaplayan algoritmalar.' },
        text: [
          'Harari, insanlık tarihinde zekâ ile bilincin hep birlikte var olduğunu hatırlatır. Satranç oynayan, araba kullanan, hastalık teşhis eden ve şiir yazan varlıklar, şimdiye kadar hep bir şeyler hisseden varlıklardı. Ama yapay zekâ ile birlikte ilk kez bu ikisi birbirinden ayrılıyor. Bilgisayarlar hiçbir şey hissetmeden, son derece karmaşık işleri insanlardan çok daha iyi yapmaya başladı.',
          'Bu durumun en çarpıcı sonucu, algoritmaların bizi kendimizden daha iyi tanımaya başlamasıdır. Arama motorları, sosyal medya ve akıllı cihazlar; ne aradığımızı, neyi beğendiğimizi, nereye gittiğimizi ve kimlerle konuştuğumuzu her an kaydediyor. Harari, birkaç yüz beğeni üzerinden bir kişinin karakterini, eşinden ya da annesinden daha doğru tahmin edebilen çalışmaları örnek gösterir.',
          'Algoritmalar bizi bu kadar iyi tanıdığında, neden kendi kararlarımıza güvenelim? Hangi okulu seçeceğimize, kiminle evleneceğimize ve kime oy vereceğimize, bizi bizden iyi tanıyan sistemler karar verebilir. Harari’ye göre otorite yavaş yavaş insandan algoritmalara geçebilir. Bu geçiş zorla değil, kendi rızamızla gerçekleşir, çünkü algoritmalar bize daha iyi sonuçlar vaat eder.'
        ]
      },
      {
        title: 'İşe Yaramaz Sınıf',
        image: { svg: useless, caption: 'Makinelerin çalıştığı, insanların izlediği bir şehir.' },
        text: [
          'Sanayi Devrimi’nden bu yana makineler insan kas gücünün yerini aldı, ama insanlar yeni işlere, özellikle zihinsel ve duygusal yetenek gerektiren işlere geçebildi. Harari, yapay zekânın bu kez farklı olabileceğini söyler. Algoritmalar yalnızca fiziksel değil, zihinsel işlerde de insanlardan daha iyi hâle geliyor. Taksi şoförlerinden doktorlara, avukatlardan finans uzmanlarına kadar pek çok meslek tehlike altında.',
          'Bu da Harari’nin “işe yaramaz sınıf” dediği yeni bir toplumsal grubun ortaya çıkmasına yol açabilir. Bu insanlar tembel ya da yeteneksiz oldukları için değil, ekonomik açıdan makinelerle rekabet edemedikleri için iş bulamayacaklardır. Devlet onları besleyebilir, ama asıl soru şudur: Bu insanlar hayatlarına nasıl anlam katacak? Harari, belki de sanal gerçeklik oyunlarının ve ilaçların bu boşluğu dolduracağını tahmin eder.',
          'Daha da tehlikelisi, eşitsizliğin biyolojik bir boyut kazanmasıdır. Zenginler genetik mühendislik ve tıbbi teknolojiler sayesinde kendilerini ve çocuklarını daha zeki, daha sağlıklı ve daha uzun ömürlü hâle getirebilir. Böylece tarihte ilk kez ekonomik eşitsizlik, biyolojik bir kast sistemine dönüşebilir. Harari’ye göre bu, liberal hümanizmin eşitlik idealine indirilen son darbe olabilir.'
        ]
      },
      {
        title: 'Veri Dini',
        image: { svg: dataism, caption: 'Her şeyin bir veri akışı olarak görüldüğü yeni bir inanç.' },
        text: [
          'Harari, hümanizmin yerini alabilecek yeni bir inanç sistemi öngörür: Dataizm, yani veri dini. Bu görüşe göre evren veri akışlarından oluşur ve her olgunun ya da varlığın değeri, veri işlemeye ne kadar katkıda bulunduğuyla ölçülür. Biyoloji organizmaları biyokimyasal algoritmalar olarak görür, bilgisayar bilimi ise elektronik algoritmalar yaratır. Dataizm bu ikisini birleştirir ve aralarında temel bir fark olmadığını öne sürer.',
          'Dataizmin en büyük emri, her şeyi birbirine bağlamak ve bilgi akışını sonsuza kadar artırmaktır. Eskiden insanlar “Tanrı’yı dinle” ya da “kalbini dinle” derdi. Dataizm ise “algoritmaları dinle” der. Bugün yaşadığımız her şeyi fotoğraflayıp paylaşmamız, adımlarımızı ve kalp atışlarımızı ölçen cihazlar kullanmamız, Harari’ye göre bu yeni dinin ilk ritüelleridir.',
          'Harari kitabını bir kehanetle değil, üç soruyla bitirir. Organizmalar gerçekten sadece algoritmalar mı ve yaşam gerçekten sadece veri işlemekten mi ibaret? Hangisi daha değerli, zekâ mı yoksa bilinç mi? Bizi kendimizden daha iyi tanıyan, bilinçsiz ama son derece zeki algoritmalar ortaya çıktığında toplumlara, siyasete ve günlük hayata ne olacak? Harari’ye göre geleceği tahmin etmek mümkün değildir, ama bu soruları şimdiden düşünmek, bize hâlâ farklı bir gelecek seçme şansı verebilir.'
        ]
      }
    ]
  };
})();
