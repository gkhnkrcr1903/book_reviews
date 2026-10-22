// Don Kişot — Miguel de Cervantes (1605, 1615)
// Sahneler data/scenes.js yardımcılarıyla çizilir; ileride image.src ile gerçek çizimlerle değiştirilebilir.
(() => {
  const { svg, glow, skyline, figure, seated, streaks, dots } = window.Scene;

  // Sıska at üstünde mızraklı şövalye ve eşeğindeki tombul uşak
  const knight = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}">
    <path d="M-30 -40 Q-14 -46 18 -42 L30 -62 Q36 -70 42 -62 L40 -54 L34 -48 L28 -30 L27 0 H23 L22 -28 L-18 -28 L-21 0 H-25 L-27 -30 Q-34 -32 -38 -22 L-42 -24 Q-38 -38 -30 -40 Z"/>
    <path d="M-6 -44 L-4 -92 L4 -92 L6 -44 Z"/><circle cx="0" cy="-100" r="7"/><path d="M-9 -104 Q0 -118 9 -104 Z"/>
    <line x1="8" y1="-84" x2="80" y2="-110" stroke="${c}" stroke-width="3"/><circle cx="-10" cy="-70" r="10" fill="none" stroke="${c}" stroke-width="3"/></g>`;
  const squire = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}">
    <path d="M-22 -26 Q-8 -32 14 -28 L22 -40 L26 -50 L30 -40 L26 -28 L22 -18 V0 H18 V-16 H-14 V0 H-18 V-18 Q-26 -20 -22 -26 Z"/><path d="M22 -42 l-2 -14 l4 10 z"/>
    <ellipse cx="-2" cy="-42" rx="14" ry="14"/><circle cx="-2" cy="-64" r="8"/></g>`;
  const windmill = (x, y, s, c, rot = 20) => `<g transform="translate(${x} ${y}) scale(${s})"><polygon points="-26,0 26,0 18,-90 -18,-90" fill="${c}"/><polygon points="-22,-90 0,-110 22,-90" fill="${c}"/>
    ${[0, 90, 180, 270].map(a => `<g transform="rotate(${a + rot} 0 -84)"><rect x="-3" y="-180" width="6" height="96" fill="${c}"/><rect x="3" y="-176" width="22" height="80" fill="${c}" opacity=".7"/></g>`).join('')}</g>`;

  // 1 — Şövalye romanları arasında Alonso Quijano
  const library = svg({
    sky: ['#1a120a', '#2a1c10', '#1a120a'],
    vignette: .7,
    body: id => `
      ${glow(id, 400, 200, 280, '#ffb050', .45)}
      ${Array.from({ length: 5 }, (_, r) => Array.from({ length: 16 }, (_, c) => `<rect x="${40 + c * 46}" y="${40 + r * 50}" width="${36 + (c % 3) * 4}" height="44" fill="${['#6a2a1a', '#3a4a2a', '#5a4a2a', '#2a3a5a'][(r + c) % 4]}" opacity=".75"/>`).join('')).join('')}
      <rect y="300" width="800" height="100" fill="#140c06"/>
      ${Array.from({ length: 10 }, (_, i) => `<rect x="${200 + (i * 47) % 400}" y="${320 + (i % 3) * 12}" width="50" height="10" fill="${['#6a2a1a', '#3a4a2a', '#5a4a2a'][i % 3]}" transform="rotate(${(i * 19) % 30 - 15} ${225 + (i * 47) % 400} ${325 + (i % 3) * 12})"/>`).join('')}
      ${seated(400, 300, 2, '#0a0604')}<path d="M392 182 l10 -30 l10 30 z" fill="#0a0604" opacity="0"/>
      <rect x="430" y="210" width="40" height="30" fill="#e8dcc4" transform="rotate(-10 450 225)"/>`
  });

  // 2 — Han, şövalyeliğe atanma
  const inn = svg({
    sky: ['#2a2040', '#6a4a5a', '#c8805a'],
    vignette: .5,
    body: id => `
      ${glow(id, 640, 230, 200, '#ffd8a0', .6)}
      <path d="M0 260 Q400 240 800 260 V400 H0 Z" fill="#8a6a3a"/>
      <g transform="translate(260 270)"><rect x="-140" y="-90" width="280" height="90" fill="#c8a878"/><polygon points="-150,-90 0,-140 150,-90" fill="#8a4a2a"/><rect x="-24" y="-56" width="48" height="56" fill="#3a2414"/>${glow(id, 260, 230, 60, '#ffc070', .5)}<rect x="60" y="-70" width="34" height="26" fill="#ffc070"/></g>
      ${knight(520, 340, 1.6, '#1a1410')}
      ${figure(430, 340, 1.5, '#3a2a1a', { hat: true })}`
  });

  // 3 — Yel değirmenleri
  const mills = svg({
    sky: ['#6a9ac8', '#a8c8e0', '#f0e8d0'],
    vignette: .4, grain: .14,
    body: id => `
      ${glow(id, 120, 90, 140, '#fff8d8', .7)}
      <path d="M0 250 Q200 220 400 240 T800 230 V400 H0 Z" fill="#c8a860"/>
      ${windmill(520, 250, 1.3, '#e8dcc4', 10)}${windmill(680, 240, 1, '#d8ccb4', 50)}${windmill(380, 236, .8, '#d8ccb4', 30)}
      <path d="M0 320 Q400 300 800 320 V400 H0 Z" fill="#a8884a"/>
      ${knight(260, 350, 1.6, '#2a1a10')}${squire(120, 360, 1.4, '#3a2414')}
      ${dots(13, 24, '#c8a860', 2.4, .5, 300, 360)}`
  });

  // 4 — Koyun sürüleri ve “ordular”
  const sheep = svg({
    sky: ['#d8a860', '#e8c890', '#f4e0b8'],
    vignette: .4, grain: .14,
    body: id => `
      <path d="M0 260 Q400 240 800 260 V400 H0 Z" fill="#b8985a"/>
      ${Array.from({ length: 40 }, (_, i) => `<g transform="translate(${420 + (i % 10) * 34 + (Math.floor(i / 10) % 2) * 16} ${280 + Math.floor(i / 10) * 18})" fill="#f4ecd8"><ellipse cx="0" cy="-10" rx="13" ry="8"/><ellipse cx="13" cy="-13" rx="5" ry="4" fill="#5a4a3a"/></g>`).join('')}
      <ellipse cx="560" cy="240" rx="200" ry="30" fill="#e8d8b0" opacity=".6" filter="url(#${id}blur)"/>
      ${knight(240, 350, 1.6, '#2a1a10')}${squire(110, 360, 1.3, '#3a2414')}`
  });

  // 5 — İkinci kitap: dük sarayı
  const duke = svg({
    sky: ['#2a1a2a', '#4a2a3a', '#2a1a2a'],
    vignette: .55,
    body: id => `
      ${glow(id, 400, 100, 300, '#ffd090', .45)}
      ${[120, 280, 520, 680].map(x => `<rect x="${x - 20}" y="60" width="40" height="240" fill="#3a2028"/><rect x="${x - 26}" y="54" width="52" height="12" fill="#5a3038"/>`).join('')}
      <rect x="0" y="300" width="800" height="100" fill="#2a141a"/>
      <rect x="320" y="200" width="160" height="20" fill="#a8743a"/>${seated(360, 230, 1.5, '#5a1a2a')}${seated(440, 230, 1.5, '#1a0e14', true)}
      ${figure(200, 340, 1.9, '#0a0608', {})}<line x1="208" y1="260" x2="208" y2="170" stroke="#0a0608" stroke-width="3"/>
      ${figure(600, 340, 1.4, '#3a2a1a', { hat: true })}
      ${[100, 140, 660, 700].map(x => figure(x, 330, 1.2, '#1a0e14', { dress: x > 400 })).join('')}`
  });

  // 6 — Sancho’nun adası
  const island = svg({
    sky: ['#5a8ab0', '#9ac0d8', '#e8e8d0'],
    vignette: .35, grain: .12,
    body: id => `
      <path d="M0 250 Q400 230 800 250 V400 H0 Z" fill="#c8b070"/>
      ${skyline({ y: 260, color: '#b89a6a', seed: 33, lit: 0, minH: 40, maxH: 100, dome: false })}
      <rect y="260" width="800" height="140" fill="#c8b070"/>
      <path d="M300 300 H500 V330 H300 Z" fill="#7a4a2a"/><rect x="380" y="250" width="40" height="50" fill="#a82a2a"/>
      ${squire(400, 300, 1.2, '#3a2414').replace(/<path d="M-22 -26.*?z"\/>/, '')}
      <g transform="translate(400 250)"><ellipse cx="0" cy="-20" rx="18" ry="20" fill="#3a2414"/><circle cy="-48" r="10" fill="#3a2414"/>${''}</g>
      <path d="M388 194 L392 180 L400 190 L408 180 L412 194 Z" fill="#d9a83a"/>
      ${[200, 240, 560, 600].map((x, i) => figure(x, 340, 1.4, '#3a2a1a', { hat: i % 2 === 0 })).join('')}`
  });

  // 7 — Beyaz Ay Şövalyesi ile düello
  const duel = svg({
    sky: ['#e8a870', '#f4c890', '#b8c8d8'],
    vignette: .45,
    body: id => `
      ${glow(id, 400, 260, 260, '#fff0c0', .6)}
      <rect y="250" width="800" height="150" fill="#3a6a8a"/>${Array.from({ length: 8 }, (_, i) => `<path d="M${i * 110} ${270 + (i % 3) * 20} q30 -6 60 0" stroke="#d8e8f0" stroke-width="2" fill="none" opacity=".6"/>`).join('')}
      <path d="M0 300 Q400 290 800 300 V400 H0 Z" fill="#e8d4a8"/>
      ${knight(250, 360, 1.6, '#1a1410')}
      <g transform="translate(560 360) scale(-1.6 1.6)">${knight(0, 0, 1, '#f4f0e8').replace(/translate\(0 0\) scale\(1\)/, '')}</g>
      <circle cx="560" cy="250" r="16" fill="none" stroke="#f4f0e8" stroke-width="3"/><path d="M552 250 a10 10 0 1 0 14 -6" fill="#f4f0e8"/>`
  });

  // 8 — Eve dönüş ve ölüm döşeği
  const deathbed = svg({
    sky: ['#2a1e14', '#3a2a1c', '#2a1e14'],
    vignette: .65,
    body: id => `
      <rect x="560" y="60" width="140" height="160" fill="#e8c890" opacity=".7"/>${glow(id, 630, 140, 160, '#fff0c0', .5)}
      <polygon points="560,60 700,60 600,400 300,400" fill="#fff0c0" opacity=".1" filter="url(#${id}blur)"/>
      <path d="M160 270 H520 V300 H160 Z" fill="#e8dcc4"/><rect x="160" y="250" width="60" height="22" rx="6" fill="#fff4e4"/><ellipse cx="200" cy="250" rx="20" ry="9" fill="#3a2a1a"/>
      <rect y="320" width="800" height="80" fill="#140e08"/>
      ${squire(560, 330, 1.4, '#140e08').replace(/<path d="M-22 -26.*?z"\/>/, '')}
      ${figure(440, 320, 1.6, '#1a1410', { dress: true })}${figure(380, 320, 1.6, '#1a1410', { hat: true })}`
  });

  window.SUMMARIES['don-kisot'] = {
    pages: [
      {
        title: 'Kitaplar Arasında Kaybolan Bir Adam',
        image: { svg: library, caption: 'Şövalye romanlarıyla dolu bir oda ve geceler boyu okuyan bir soylu.' },
        text: [
          'İspanya’nın La Mancha bölgesindeki küçük bir köyde, adını hatırlamak istemediğimiz bir yerde, elli yaşlarında, sıska ve uzun boylu bir soylu yaşar. Adı Alonso Quijano’dur. Az bir geliri, eski bir mızrağı, sıska bir atı ve bir tazısı vardır. Hayatı, okuduğu şövalye romanlarıyla doludur. Gecelerini sabaha kadar, günlerini akşama kadar bu kitapları okuyarak geçirir. Hatta onları satın alabilmek için topraklarının bir kısmını bile satmıştır.',
          'Okudukça okur, uykusuzluktan ve kitaplardan beyni kurur ve sonunda aklını yitirir. Kitaplarda okuduğu dev, büyücü, prenses ve şövalye hikâyelerinin hepsinin gerçek olduğuna inanmaya başlar. Ve garip bir karar verir: Kendisi de gezgin bir şövalye olacak, dünyayı dolaşarak haksızlıklarla savaşacak, zayıfları koruyacak ve adını sonsuza kadar tarihe yazdıracaktır.',
          'Büyük dedesinden kalma paslı bir zırhı temizler, karton bir miğfer yapar. Sıska atına “Rocinante” adını verir. Kendine de “La Manchalı Don Kişot” adını koyar. Her şövalyenin bir sevgilisi olması gerektiği için, komşu köyde yaşayan ve onu hiç tanımayan bir köylü kızını hayalinde “Tobosolu Dulcinea” adlı eşsiz bir prensese dönüştürür. Cervantes, böylece edebiyat tarihinin en unutulmaz kahramanlarından birini yaratır: gerçeklikle hayal arasında sıkışmış, gülünç ama aynı zamanda soylu bir adam.'
        ]
      },
      {
        title: 'Handa Şövalye Olmak',
        image: { svg: inn, caption: 'Don Kişot’un şato sandığı yol kenarındaki bir han.' },
        text: [
          'Don Kişot, bir sabah kimseye haber vermeden köyünden ayrılır. Ama kısa süre sonra, aslında resmî olarak şövalye ilan edilmediğini fark eder. Akşam olunca yol kenarındaki eski bir hana varır. Onun gözünde bu han, kuleleri ve asma köprüsüyle görkemli bir şatodur. Hancı bir şato beyi, oradaki iki kadın ise soylu hanımlardır.',
          'Hancı, karşısındaki tuhaf adamın aklının yerinde olmadığını anlar ve onunla eğlenmeye karar verir. Don Kişot, bütün gece silahlarının başında nöbet tuttuktan sonra, hancı ona bir hesap defterinden dua okur gibi yaparak ve kılıcıyla omzuna vurarak onu şövalye ilan eder. Don Kişot artık resmî bir şövalyedir ve maceralarına başlamaya hazırdır.',
          'Ama ilk maceraları felaketle sonuçlanır. Bir çobanın, hizmetindeki bir çocuğu dövdüğünü görünce müdahale eder, ama o gittikten sonra çoban çocuğu daha da çok döver. Ardından yolda karşılaştığı tüccarlardan Dulcinea’nın dünyanın en güzel kadını olduğunu kabul etmelerini ister. Tüccarlardan biri onu atından düşürüp sopayla döver. Bir köylü onu yerde perişan bir hâlde bulur ve köyüne geri götürür. Arkadaşları papaz ve berber, aklını kaçırmasına neden olan kitapların çoğunu yakar.'
        ]
      },
      {
        title: 'Yel Değirmenleri',
        image: { svg: mills, caption: 'La Mancha ovasında devlere benzeyen yel değirmenleri.' },
        text: [
          'Don Kişot iyileşir iyileşmez ikinci yolculuğuna hazırlanır. Bu kez yanına bir uşak alır: Sancho Panza. Sancho, köyün fakir, cahil ama pratik zekâlı ve iyi kalpli bir köylüsüdür. Don Kişot ona, maceraları sırasında fethedecekleri bir adanın valisi yapacağını vaat eder. Sancho, bu vaade inanarak karısını ve çocuklarını bırakır ve eşeğine binerek efendisinin peşine takılır.',
          'Ovada ilerlerken karşılarına otuz kırk tane yel değirmeni çıkar. Don Kişot, onları uzun kollu devler olarak görür. Sancho onlara devler değil, yel değirmenleri olduğunu söyler. Ama Don Kişot dinlemez, mızrağını uzatır ve Rocinante’yi değirmenlerin üzerine sürer. Tam o sırada rüzgâr çıkar ve değirmenin kanatları dönerek hem Don Kişot’u hem de atını yerlere fırlatır.',
          'Don Kişot, yerde yatarken bile yenilgisini kabul etmez. Kitaplarını yakan kötü büyücünün, onu zaferden yoksun bırakmak için devleri son anda yel değirmenine dönüştürdüğünü söyler. Bu sahne, romanın ve belki de dünya edebiyatının en ünlü sahnesidir. Bugün bile “yel değirmenleriyle savaşmak” deyimi, hayalî düşmanlarla ya da kazanılması imkânsız bir mücadeleye girişmek anlamında kullanılır.'
        ]
      },
      {
        title: 'Hüzünlü Yüzlü Şövalye',
        image: { svg: sheep, caption: 'Toz bulutunun içinden gelen koyun sürüleri: Don Kişot’un gözünde iki büyük ordu.' },
        text: [
          'Don Kişot ve Sancho’nun maceraları, bir dizi gülünç ve acı olayla devam eder. Bir gün uzaktan yükselen toz bulutlarını görünce, Don Kişot bunların savaşmak üzere olan iki büyük ordu olduğunu sanır. Ordulardaki şövalyelerin adlarını, armalarını ve krallıklarını tek tek sayar. Aslında bunlar iki koyun sürüsüdür. Don Kişot sürülerin arasına dalar ve koyunları kılıcıyla keser. Çobanlar da onu taşlarla döverek birkaç dişini kırarlar.',
          'Sancho, bu maceralardan sonra efendisine “Hüzünlü Yüzlü Şövalye” adını verir. Don Kişot bu adı çok beğenir. Başka bir macerada, bir berberin başına güneşten korunmak için taktığı pirinç leğeni, efsanevi şövalyelerin altın miğferi sanar ve onu adamdan zorla alır. Kürek mahkûmlarını özgürlüklerine kavuşturur, ama mahkûmlar ona teşekkür etmek yerine onu taşlarla döverek kaçarlar.',
          'Bütün bu maceralar sırasında Don Kişot ve Sancho arasında eşsiz bir dostluk gelişir. Don Kişot yüksek ideallerden, şövalyelik onurundan ve adaletten söz eder. Sancho ise atasözleriyle, sağduyusuyla ve yemeğe olan düşkünlüğüyle onu sürekli gerçek dünyaya çekmeye çalışır. İkisi, insanın iki yüzünü temsil eder: biri hayal ve idealizm, diğeri ise gerçekçilik ve maddi dünya. Birinci kitabın sonunda Don Kişot, papaz ve berber tarafından bir kafese konularak büyülendiğine inandırılır ve köyüne geri getirilir.'
        ]
      },
      {
        title: 'İkinci Kitap ve Dükün Sarayı',
        image: { svg: duke, caption: 'Dükün sarayında eğlencenin konusu olan Don Kişot ve Sancho.' },
        text: [
          'Cervantes, romanın ikinci kitabını ilk kitaptan on yıl sonra, 1615’te yayımlar. Bu arada başka bir yazar, onun izni olmadan sahte bir devam kitabı yayımlamıştır. Cervantes bu durumu romanın içine ustalıkla yerleştirir. İkinci kitapta karakterler, birinci kitabın yayımlandığını ve okunduğunu bilir. İnsanlar Don Kişot ve Sancho’yu kitaplardan tanır ve onları görünce hemen tanırlar. Bu, edebiyat tarihinde gerçekle kurgunun iç içe geçtiği ilk büyük denemelerden biridir.',
          'Don Kişot ve Sancho, üçüncü yolculuklarına çıktıklarında, bir gün avlanmakta olan bir dük ve düşesle karşılaşırlar. Dük ve düşes, Don Kişot’un maceralarını okumuşlardır ve onları saraylarına davet ederler. Ama onları gerçekten ağırlamak için değil, onlarla eğlenmek için davet etmişlerdir. Don Kişot’u sanki gerçek bir şövalyeymiş gibi karşılarlar, ona sahte prensesler, büyücüler ve devler hazırlarlar.',
          'Bu bölümlerde, okurun sempatisi giderek Don Kişot’a ve Sancho’ya kayar. Onlarla alay eden soylular, aslında onlardan çok daha küçük ve acımasız insanlardır. Don Kişot deliliğine rağmen soylu bir ruha, cesarete ve iyi bir kalbe sahiptir. Sancho ise sadeliği ve dürüstlüğüyle herkesi şaşırtır.'
        ]
      },
      {
        title: 'Sancho’nun Adası',
        image: { svg: island, caption: 'Barataria Adası’nın “valisi” Sancho, halkın davalarını dinlerken.' },
        text: [
          'Dük, şaka olsun diye, Sancho’yu Barataria adında bir “adaya”, aslında kendi topraklarındaki küçük bir kasabaya vali olarak atar. Herkes Sancho’nun gülünç duruma düşmesini beklemektedir. Ama Sancho, okuma yazma bilmemesine rağmen, kendisine getirilen davaları sağduyusu ve pratik zekâsıyla öylesine adil bir şekilde çözer ki, herkes hayran kalır.',
          'Bununla birlikte, Sancho valiliğin hiç de sandığı gibi bir hayat olmadığını kısa sürede anlar. Bir doktor, sağlığını korumak gerekçesiyle onu sürekli aç bırakır. Her gün yeni sorunlar, yeni davalar ve yeni sorumluluklarla uğraşır. Sonunda kasabaya düşmanların saldırdığına dair sahte bir oyunla dövülüp yere serilir. Sancho, bu deneyimin ardından valilikten istifa eder.',
          'Sancho, eşeğine sarılarak eski, basit hayatına geri dönmek istediğini söyler. Ona göre insan doğduğu gibi yaşamalı, kendine ait olmayan bir hayatın peşinden koşmamalıdır. Cervantes, bu bölümde iktidarın ve şöhretin ağırlığını, basit bir köylünün ağzından dile getirdiği bilgece sözlerle anlatır.'
        ]
      },
      {
        title: 'Beyaz Ay Şövalyesi',
        image: { svg: duel, caption: 'Barselona sahili: Don Kişot’un son düellosu.' },
        text: [
          'Don Kişot ve Sancho, maceralarına devam ederek Barselona’ya ulaşırlar. Bir sabah, sahilde dolaşırken karşılarına parlak bir zırh giymiş, kalkanında beyaz bir ay resmi olan bir şövalye çıkar. Kendini “Beyaz Ay Şövalyesi” olarak tanıtan bu adam, Don Kişot’a meydan okur. Kendi sevgilisinin Dulcinea’dan daha güzel olduğunu iddia eder ve eğer düelloyu kazanırsa, Don Kişot’un bir yıl boyunca silahlarını bırakıp köyüne döneceğine yemin etmesini ister.',
          'Don Kişot meydan okumayı kabul eder. Ama Beyaz Ay Şövalyesi, aslında Don Kişot’un köyünden bir genç olan Sansón Carrasco’dur. Sansón, Don Kişot’u bu yolla eve döndürmek ve onu deliliğinden kurtarmak istemektedir. Düelloda Don Kişot atından düşer. Yerde yatarken bile Dulcinea’nın dünyanın en güzel kadını olduğunu söylemeye devam eder, ama yenilgisini kabul eder ve köyüne dönmeye söz verir.',
          'Eve dönüş yolculuğu, Don Kişot için hüzünlü bir yolculuktur. Artık maceralara atılamayacağı için, bir yıl boyunca çoban olup kırlarda şiir yazarak yaşamayı düşünür. Sancho ise onu teselli etmeye çalışır. İkisi arasındaki dostluk, bu son yolculukta her zamankinden daha derin ve dokunaklıdır.'
        ]
      },
      {
        title: 'Akıllı Alonso Quijano',
        image: { svg: deathbed, caption: 'Köydeki evinde, dostlarının yanında son günlerini yaşayan Alonso Quijano.' },
        text: [
          'Köyüne dönen Don Kişot, kısa süre sonra ağır bir ateşe yakalanır ve günlerce yatağından kalkamaz. Bir gün uzun bir uykudan uyandığında, aklının yerine geldiğini söyler. Artık Don Kişot değil, iyi huylu Alonso Quijano olduğunu, şövalye romanlarının yalnızca yalan ve saçmalıklardan ibaret olduğunu anladığını açıklar.',
          'Sancho, efendisinin yatağının başında ağlar. Ona ayağa kalkmasını, birlikte çoban olup kırlarda yeni maceralara atılmalarını, belki de Dulcinea’yı büyüden kurtarabileceklerini söyler. Ama Alonso Quijano, vasiyetini yazdırır, Sancho’ya bir miktar para bırakır ve kendisinin onu yanlış yollara sürüklediği için ondan af diler. Kısa süre sonra, dostlarının arasında huzur içinde ölür.',
          'Don Kişot, şövalye romanlarıyla alay etmek için yazılmış bir parodi olarak başlar. Ama Cervantes’in elinde, idealizm ile gerçeklik, hayal ile akıl arasındaki çatışmayı anlatan derin ve insancıl bir esere dönüşür. Pek çok edebiyat tarihçisi onu ilk modern roman olarak kabul eder. Don Kişot’un deliliği gülünçtür, ama aynı zamanda adalet ve güzellik için savaşma cesaretinin, sıradan bir dünyada ne kadar değerli olduğunu da hatırlatır.'
        ]
      }
    ]
  };
})();
