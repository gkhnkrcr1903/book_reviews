// Gurur ve Önyargı — Jane Austen (1813)
// Sahneler data/scenes.js yardımcılarıyla çizilir; ileride image.src ile gerçek çizimlerle değiştirilebilir.
(() => {
  const { svg, glow, skyline, figure, seated, streaks, dots } = window.Scene;

  const manor = (x, y, s, c, lit = '#ffd88a') => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-160" y="-110" width="320" height="110" fill="${c}"/><polygon points="-60,-110 0,-150 60,-110" fill="${c}"/>
    ${Array.from({ length: 2 }, (_, r) => Array.from({ length: 8 }, (_, k) => `<rect x="${-146 + k * 38}" y="${-96 + r * 46}" width="18" height="28" fill="${lit}" opacity=".8"/>`).join('')).join('')}
    ${[-40, -20, 0, 20, 40].map(dx => `<rect x="${dx - 3}" y="-60" width="6" height="60" fill="#f4ecd8"/>`).join('')}</g>`;
  const lady = (x, y, s, c, sh) => figure(x, y, s, c, { dress: true, shawl: sh });

  // 1 — Longbourn: Bennet ailesi
  const longbourn = svg({
    sky: ['#8ab0d0', '#c8dce4', '#f0ecd8'],
    vignette: .35, grain: .12,
    body: id => `
      <path d="M0 250 Q400 220 800 250 V400 H0 Z" fill="#8aa86a"/>
      ${manor(400, 270, .9, '#d8c8a8')}
      ${Array.from({ length: 6 }, (_, i) => `<g transform="translate(${60 + i * 140} 260)"><rect x="-4" y="-60" width="8" height="60" fill="#4a3a2a"/><ellipse cy="-80" rx="34" ry="38" fill="#6a9a4a"/></g>`).join('')}
      <path d="M0 320 Q400 300 800 320 V400 H0 Z" fill="#7a9a5a"/>
      ${[200, 250, 300, 350, 400].map((x, i) => lady(x, 360, 1.3, ['#e8c8c8', '#c8d8e8', '#f4ecd8', '#d8c8e8', '#e8d8c0'][i], null)).join('')}
      ${lady(470, 360, 1.4, '#6a4a5a', '#e8dcc4')}${figure(540, 360, 1.5, '#2a2a2a', { hat: true })}`
  });

  // 2 — Meryton balosu: Darcy’nin soğuk bakışı
  const ball = svg({
    sky: ['#3a2418', '#5a3a24', '#3a2418'],
    vignette: .5,
    body: id => `
      ${[200, 400, 600].map(x => `<line x1="${x}" y1="0" x2="${x}" y2="40" stroke="#d9a83a"/>${glow(id, x, 54, 70, '#fff0b0', .8)}<circle cx="${x}" cy="54" r="7" fill="#fff4c0"/>`).join('')}
      <rect y="290" width="800" height="110" fill="#5a3a22"/>
      ${[[180, 1], [230, 0], [300, 1], [350, 0], [450, 1], [500, 0]].map(([x, m]) => m ? figure(x, 320, 1.4, '#1a1410') : lady(x, 320, 1.4, '#e8d8c8', null)).join('')}
      ${figure(640, 340, 2, '#0a0a0a', {})}${lady(110, 340, 1.8, '#6a4a5a', '#e8dcc4')}
      <path d="M140 220 Q390 160 630 230" stroke="#e8dcc4" stroke-width="2" stroke-dasharray="6 8" fill="none" opacity=".6"/>`
  });

  // 3 — Netherfield’e yağmurda yürüyüş
  const walk = svg({
    sky: ['#7a8a9a', '#a8b4bc', '#c8ccc8'],
    vignette: .45, grain: .18,
    body: id => `
      ${manor(600, 240, .7, '#c8b898')}
      <path d="M0 240 Q300 210 500 240 T800 236 V400 H0 Z" fill="#6a8a4a"/>
      <path d="M0 340 Q200 300 400 330 T800 300" stroke="#8a6a4a" stroke-width="20" fill="none" opacity=".8"/>
      ${Array.from({ length: 30 }, (_, i) => `<ellipse cx="${(i * 47) % 800}" cy="${330 + (i * 11) % 60}" rx="12" ry="4" fill="#5a4a3a" opacity=".5"/>`).join('')}
      ${lady(260, 340, 1.8, '#5a4a5a', '#a8543a')}
      <path d="M244 336 q16 6 32 0" stroke="#4a3a2a" stroke-width="6" fill="none"/>
      ${streaks(23, 120, '#e8ecf0', 18, -6, .35)}`
  });

  // 4 — Wickham ve yalanları
  const wickham = svg({
    sky: ['#d8a870', '#e8c898', '#f4e4c4'],
    vignette: .4, grain: .14,
    body: id => `
      ${skyline({ y: 260, color: '#b89a7a', seed: 44, lit: 0, minH: 50, maxH: 110, dome: false })}
      <rect y="260" width="800" height="140" fill="#a8906a"/>
      ${[160, 220, 280].map(x => figure(x, 330, 1.5, '#a82a2a', { hat: true })).join('')}
      ${figure(470, 340, 1.8, '#a82a2a', { hat: true })}${lady(530, 342, 1.7, '#6a4a5a', '#e8dcc4')}
      ${lady(640, 336, 1.4, '#e8c8c8', null)}${lady(690, 336, 1.3, '#f4d8d8', null)}`
  });

  // 5 — Rosings ve ilk evlilik teklifi
  const proposal = svg({
    sky: ['#2a2a34', '#3a3a46', '#2a2a34'],
    vignette: .6,
    body: id => `
      <rect x="520" y="60" width="160" height="220" fill="#8aa0b8" opacity=".5"/><line x1="600" y1="60" x2="600" y2="280" stroke="#2a2a34" stroke-width="6"/>
      ${glow(id, 600, 170, 160, '#c8d8e8', .3)}
      <rect x="100" y="120" width="120" height="160" fill="#3a2a20"/><rect x="108" y="128" width="104" height="144" fill="#6a5a4a" opacity=".5"/>
      <rect y="300" width="800" height="100" fill="#2a2228"/>
      ${seated(320, 300, 1.8, '#5a4a5a')}${figure(470, 330, 2.1, '#0a0a0a')}
      <rect x="300" y="268" width="80" height="12" fill="#3a2a20"/>`
  });

  // 6 — Mektup: korulukta okunan gerçek
  const letter = svg({
    sky: ['#a8c8b8', '#d8e4d0', '#f4ecd8'],
    vignette: .4, grain: .12,
    body: id => `
      ${Array.from({ length: 12 }, (_, i) => `<g transform="translate(${(i * 71) % 800} 280)"><rect x="-6" y="-180" width="12" height="180" fill="#4a3a2a"/><circle cy="-190" r="${50 + (i % 3) * 10}" fill="${['#6a9a4a', '#8aaa5a', '#5a8a3a'][i % 3]}" opacity=".85"/></g>`).join('')}
      ${glow(id, 400, 200, 200, '#fff8d8', .5)}
      <rect y="280" width="800" height="120" fill="#7a9a4a"/>
      <path d="M0 330 Q400 310 800 330" stroke="#c8b888" stroke-width="30" fill="none"/>
      ${lady(400, 340, 1.8, '#5a4a5a', '#e8dcc4')}
      <g transform="translate(424 260) rotate(-8)"><rect x="0" y="0" width="34" height="44" fill="#fff8e8"/>${Array.from({ length: 6 }, (_, k) => `<line x1="4" y1="${6 + k * 6}" x2="30" y2="${6 + k * 6}" stroke="#5a4a3a" stroke-width="1"/>`).join('')}</g>`
  });

  // 7 — Pemberley
  const pemberley = svg({
    sky: ['#7aa0c8', '#b8d0e0', '#ece8d8'],
    vignette: .35, grain: .12,
    body: id => `
      ${glow(id, 640, 100, 160, '#fff8d8', .6)}
      <path d="M0 200 Q200 150 400 190 T800 170 V260 H0 Z" fill="#5a7a4a"/>
      ${manor(400, 230, 1.1, '#e8dcc4', '#c8d8e8')}
      <rect y="240" width="800" height="70" fill="#5a8aa8"/>
      <g transform="translate(400 248) scale(1.1 -.45)" opacity=".35">${manor(0, 0, 1, '#e8dcc4', '#c8d8e8')}</g>
      <path d="M0 310 Q400 290 800 310 V400 H0 Z" fill="#6a8a4a"/>
      ${lady(260, 360, 1.5, '#5a4a5a', '#e8dcc4')}${lady(310, 360, 1.4, '#6a5a3a', null)}${figure(360, 360, 1.5, '#3a3a3a', { hat: true })}
      ${figure(520, 356, 1.6, '#0a0a0a')}`
  });

  // 8 — İkinci teklif: sabah yürüyüşü
  const ending = svg({
    sky: ['#f4c8a0', '#f8dcb8', '#fcecd8'],
    vignette: .3, grain: .1,
    body: id => `
      ${glow(id, 400, 240, 300, '#fff4d8', .8)}<circle cx="400" cy="230" r="44" fill="#fff8e8"/>
      <path d="M0 250 Q400 220 800 250 V400 H0 Z" fill="#a8b87a"/>
      ${Array.from({ length: 50 }, (_, i) => `<circle cx="${(i * 41) % 800}" cy="${270 + (i * 13) % 120}" r="2.5" fill="${i % 2 ? '#f4e04a' : '#fff'}"/>`).join('')}
      <path d="M0 330 Q400 300 800 330" stroke="#d8c898" stroke-width="30" fill="none"/>
      ${lady(380, 340, 1.8, '#5a4a5a', '#e8dcc4')}${figure(430, 340, 1.9, '#1a1a2a')}
      <path d="M0 230 Q200 200 400 220" stroke="#c8b8a8" stroke-width="60" fill="none" opacity=".25" filter="url(#${id}blur)"/>`
  });

  window.SUMMARIES['gurur-ve-onyargi'] = {
    pages: [
      {
        title: 'Evlenecek Beş Kız',
        image: { svg: longbourn, caption: 'Longbourn’daki Bennet malikânesi ve evlenme çağındaki beş kız kardeş.' },
        text: [
          'Jane Austen’ın romanı, edebiyat tarihinin en ünlü ironik cümlelerinden biriyle açılır: Serveti yerinde olan bekâr bir erkeğin bir eşe ihtiyacı olduğu, herkesçe kabul edilen bir gerçektir. On dokuzuncu yüzyıl başında İngiltere’de, Hertfordshire’daki Longbourn malikânesinde yaşayan Bennet ailesi için bu cümle neredeyse bir hayat felsefesidir. Bay ve Bayan Bennet’in beş kızı vardır ve hiçbirinin erkek kardeşi yoktur.',
          'Bu durum ailenin geleceği için büyük bir tehlikedir. O dönemin miras yasalarına göre Bay Bennet öldüğünde malikâne kızlarına değil, en yakın erkek akrabası olan uzak bir kuzene kalacaktır. Bu yüzden Bayan Bennet’in hayattaki tek amacı, kızlarını zengin erkeklerle evlendirmektir. Gürültücü, aceleci ve kaygılı bir kadındır. Bay Bennet ise zeki ve alaycıdır, ama ailesinin sorunlarıyla ilgilenmek yerine kütüphanesine kapanmayı tercih eder.',
          'Kızların en büyüğü Jane, son derece güzel, iyi kalpli ve herkeste iyilik gören bir kızdır. İkinci kız Elizabeth, romanın kahramanıdır. Zeki, esprili, bağımsız düşünen ve keskin gözlemleriyle çevresindeki insanları çözümlemeyi seven bir genç kadındır. Diğer kız kardeşler ise kitap kurdu ve ciddi Mary, ablalarını taklit eden Kitty ve ailenin en küçüğü, en şımarık ve en düşüncesiz kızı olan Lydia’dır.'
        ]
      },
      {
        title: 'İlk Balo, İlk İzlenimler',
        image: { svg: ball, caption: 'Meryton’daki balo: kenarda duran kibirli bir beyefendi ve onu duyan genç bir kadın.' },
        text: [
          'Bir gün komşu malikâne Netherfield’in, yılda beş bin sterlin geliri olan genç ve bekâr bir beyefendi, Bay Bingley tarafından kiralandığı haberi gelir. Bayan Bennet büyük bir heyecana kapılır. Bay Bingley, yakın kasaba Meryton’da düzenlenen bir baloya kız kardeşleri ve yakın dostu Bay Darcy ile birlikte katılır. Bingley neşeli, sıcakkanlı ve sevimli bir gençtir. Bütün gece dans eder ve özellikle Jane’e büyük ilgi gösterir.',
          'Bay Darcy ise Bingley’den çok daha zengindir, yılda on bin sterlin geliri ve Derbyshire’da Pemberley adında görkemli bir malikânesi vardır. Ama bütün gece kimseyle konuşmaz, sadece iki kez dans eder ve herkesi küçümseyen bir tavırla salonu dolaşır. Bingley ona Elizabeth ile dans etmesini önerdiğinde, Darcy onun “fena olmadığını, ama kendisini cezbedecek kadar güzel olmadığını” söyler. Elizabeth bu sözleri duyar.',
          'Elizabeth bu olayı arkadaşlarına gülerek anlatır, ama gururu derinden yaralanmıştır. O andan itibaren Darcy’yi kibirli, kaba ve tahammül edilemez bir adam olarak görür. Darcy ise ilerleyen günlerde Elizabeth’in canlı gözlerinden, zekâsından ve esprili sohbetinden etkilenmeye başlar. Ama Elizabeth’in ailesinin düşük sosyal konumu ve görgüsüzlüğü yüzünden bu duygularını bastırır. Romanın adındaki iki kavram, gurur ve önyargı, bu ilk karşılaşmada doğar.'
        ]
      },
      {
        title: 'Netherfield ve Bay Collins',
        image: { svg: walk, caption: 'Hasta ablasını görmek için çamurlu tarlalardan yürüyen Elizabeth.' },
        text: [
          'Bir gün Jane, Bingley’nin kız kardeşleri tarafından Netherfield’e davet edilir. Bayan Bennet, Jane’in yağmura yakalanıp orada kalması için onu at arabası yerine at sırtında gönderir. Jane gerçekten de yağmurda ıslanır, hastalanır ve Netherfield’de kalmak zorunda kalır. Elizabeth, ablasını görmek için üç mil boyunca çamurlu tarlalardan yürüyerek Netherfield’e gider. Bingley’nin kibirli kız kardeşi Caroline, onun eteğindeki çamurla alay eder. Darcy ise yürüyüşün Elizabeth’in gözlerini daha da güzel gösterdiğini düşünür.',
          'Bu sırada Longbourn’a, malikânenin mirasçısı olan kuzenleri Bay Collins gelir. Collins, gülünç derecede kendini beğenmiş, dalkavuk bir din adamıdır. Hamisi olan zengin ve kibirli Leydi Catherine de Bourgh’u her fırsatta över. Bennet kızlarından biriyle evlenerek aileye bir iyilik yapacağını düşünür ve Elizabeth’e evlenme teklif eder.',
          'Elizabeth, bu teklifi kesin bir dille reddeder. Annesi çılgına döner ve Elizabeth’in kabul etmesi için ısrar eder. Ama babası, onun yanında yer alır ve Elizabeth Collins ile evlenirse onu bir daha görmek istemeyeceğini söyler. Birkaç gün sonra Collins, Elizabeth’in en yakın arkadaşı Charlotte Lucas’a teklif eder. Charlotte, romantik olmayan ama gerçekçi bir kadındır ve güvenli bir gelecek için teklifi kabul eder. Elizabeth bu karara şaşırır ve üzülür.'
        ]
      },
      {
        title: 'Wickham’ın Hikâyesi',
        image: { svg: wickham, caption: 'Meryton sokaklarında kırmızı üniformalı subaylar ve onlara hayran genç kızlar.' },
        text: [
          'Meryton’a yerleşen alayın subayları arasında, son derece yakışıklı ve çekici George Wickham da vardır. Wickham, Elizabeth ile hemen dostluk kurar. Bir akşam ona, çocukluğunu Darcy’nin babasının yanında geçirdiğini, yaşlı Bay Darcy’nin onu kendi oğlu gibi sevdiğini ve ona bir kilise görevi vaat ettiğini anlatır. Ama babası öldükten sonra Darcy’nin kıskançlıktan bu vaadi yerine getirmediğini ve onu yoksulluğa terk ettiğini iddia eder.',
          'Elizabeth, Darcy hakkındaki önyargısını doğrulayan bu hikâyeye hemen inanır. Wickham’ın hikâyesindeki tutarsızlıkları sorgulamaz bile. Darcy’ye olan öfkesi ve antipatisi giderek artar. Netherfield’de düzenlenen büyük baloda Darcy ile dans ettiğinde, ona Wickham’ı sorarak onu sıkıştırır. Darcy soğuk bir tavırla, Wickham’ın kolayca arkadaş edinebildiğini, ama bu arkadaşlıkları korumakta aynı derecede başarılı olmadığını söyler.',
          'Bu arada Bingley ve kız kardeşleri, beklenmedik bir şekilde Netherfield’den ayrılıp Londra’ya giderler. Caroline Bingley, Jane’e soğuk bir mektup yazarak kardeşinin büyük olasılıkla Darcy’nin kız kardeşi Georgiana ile evleneceğini ima eder. Jane büyük bir acı yaşar, ama bunu sessizce taşır. Elizabeth ise bu ayrılığın arkasında Darcy’nin parmağı olduğundan şüphelenir.'
        ]
      },
      {
        title: 'İlk Teklif',
        image: { svg: proposal, caption: 'Hunsford’daki küçük salonda, beklenmedik ve öfkeli bir evlilik teklifi.' },
        text: [
          'Bahar geldiğinde Elizabeth, evlenip Kent’e yerleşen arkadaşı Charlotte’u ziyarete gider. Charlotte ve Collins, Leydi Catherine de Bourgh’un Rosings Park adlı görkemli malikânesinin yakınında yaşamaktadır. Kısa süre sonra Leydi Catherine’in yeğeni olan Darcy de teyzesini ziyarete gelir. Darcy, Elizabeth’i sık sık ziyaret eder, onunla yürüyüşe çıkar, ama çok az konuşur.',
          'Bir gün Elizabeth, Darcy’nin kuzeni Albay Fitzwilliam’dan, Darcy’nin yakın zamanda bir arkadaşını “çok uygunsuz bir evlilikten” kurtardığını öğrenir. Bunun Bingley ve Jane olduğunu hemen anlar ve öfkeden kudurur. Tam o akşam Darcy, beklenmedik bir şekilde onun yanına gelir ve ona aşkını itiraf eder. Elizabeth’in düşük sosyal konumuna ve ailesinin görgüsüzlüğüne rağmen onu sevdiğini, bütün mantığına karşın bu duygularını yenemediğini söyler.',
          'Elizabeth, bu kibirli teklifi büyük bir öfkeyle reddeder. Darcy’yi, Jane’in mutluluğunu yok etmekle ve Wickham’a haksızlık etmekle suçlar. Ona, dünyadaki son erkek olsa bile onunla evlenmeyeceğini söyler. Darcy, şaşkınlık ve kırgınlık içinde salonu terk eder. Bu sahne, romanın dönüm noktasıdır: iki gururlu insan, birbirlerine ilk kez açıkça ne düşündüklerini söylemiştir.'
        ]
      },
      {
        title: 'Bir Mektup',
        image: { svg: letter, caption: 'Rosings’in korusunda, elinde Darcy’nin mektubunu tekrar tekrar okuyan Elizabeth.' },
        text: [
          'Ertesi sabah Darcy, korulukta yürüyen Elizabeth’e uzun bir mektup verir. Mektupta kendisine yöneltilen iki suçlamaya cevap verir. İlk olarak, Jane’in Bingley’ye karşı derin bir aşk beslediğine inanmadığını, onun sakin tavırlarını ilgisizlik olarak yorumladığını ve Bennet ailesinin uygunsuz davranışları nedeniyle arkadaşını bu evlilikten uzaklaştırdığını itiraf eder.',
          'İkinci olarak, Wickham hakkındaki gerçeği anlatır. Wickham, Darcy’nin babasının vaat ettiği kilise görevinden kendi isteğiyle vazgeçmiş, karşılığında büyük bir para almış ve bu parayı kumarla, eğlenceyle çarçur etmiştir. Daha da kötüsü, birkaç ay önce Darcy’nin henüz on beş yaşındaki kız kardeşi Georgiana’yı, onun büyük mirasına konmak için kaçırmaya çalışmıştır. Darcy, son anda bu planı fark ederek kız kardeşini kurtarmıştır.',
          'Elizabeth mektubu defalarca okur. İlk başta inanmak istemez, ama yavaş yavaş gerçeği görmeye başlar. Wickham’ın tutarsızlıklarını, Darcy’nin aslında hiç de kaba olmayan davranışlarını ve kendi önyargısının ona nasıl yanlış yargılarda bulundurduğunu fark eder. Kendi kendine şöyle der: Bu ana kadar kendimi hiç tanımamışım. Bu, romanın en önemli anıdır, çünkü Elizabeth kendi gururunun ve önyargısının da en az Darcy’ninki kadar büyük olduğunu anlar.'
        ]
      },
      {
        title: 'Pemberley',
        image: { svg: pemberley, caption: 'Derbyshire’ın tepeleri arasında, gölün kıyısındaki Pemberley malikânesi.' },
        text: [
          'Yaz geldiğinde Elizabeth, teyzesi ve eniştesi Bay ve Bayan Gardiner ile birlikte Derbyshire’a bir gezi yapar. Gardiner’ler, görgülü ve sevimli insanlardır. Gezileri sırasında Darcy’nin malikânesi Pemberley’yi ziyaret ederler. Darcy’nin orada olmadığını öğrenen Elizabeth, malikâneyi gezmeyi kabul eder. Pemberley, doğal güzelliği ve zarafetiyle Elizabeth’i büyüler.',
          'Malikânenin kahyası, Darcy’den büyük bir sevgiyle söz eder. Darcy’nin çocukluğundan beri iyi kalpli, hizmetkârlarına karşı cömert ve kız kardeşine karşı son derece şefkatli olduğunu anlatır. Tam o sırada Darcy, beklenmedik bir şekilde eve döner. İkisi de şaşkınlıktan donup kalır. Ama Darcy, Elizabeth’e ve onun akrabalarına son derece kibar ve sıcak bir şekilde davranır. Onları kız kardeşi Georgiana ile tanıştırır.',
          'Tam her şey yoluna giriyor gibiyken, Elizabeth Jane’den korkunç bir mektup alır. En küçük kız kardeşleri Lydia, Wickham ile birlikte kaçmıştır ve evlenip evlenmedikleri bilinmemektedir. O dönemde bu olay, bütün Bennet ailesinin itibarını yerle bir edecek bir skandaldır. Elizabeth, umutsuzluk içinde Darcy’ye her şeyi anlatır ve hemen eve döner.'
        ]
      },
      {
        title: 'Gururun ve Önyargının Sonu',
        image: { svg: ending, caption: 'Sisli bir sabah, tarlaların arasında birbirine doğru yürüyen iki kişi.' },
        text: [
          'Bir süre sonra Lydia ve Wickham bulunur ve evlenirler. Bütün aile, bu evliliği Gardiner’lerin ayarladığını düşünür. Ama Lydia, ağzından kaçırdığı bir sözle, düğünde Darcy’nin de bulunduğunu söyler. Elizabeth, teyzesine yazdığı bir mektupla gerçeği öğrenir. Wickham’ı bulan, borçlarını ödeyen ve onu Lydia ile evlenmeye ikna eden kişi Darcy’dir. Darcy bunu, Elizabeth’in ailesini skandaldan kurtarmak için, kimseye söylemeden yapmıştır.',
          'Kısa süre sonra Bingley Netherfield’e döner ve Jane’e evlenme teklif eder. Ardından beklenmedik bir misafir gelir: Leydi Catherine de Bourgh. Darcy ile Elizabeth’in nişanlanacağı dedikodusunu duymuş ve Elizabeth’ten asla Darcy ile evlenmeyeceğine dair söz vermesini istemeye gelmiştir. Elizabeth, bu sözü vermeyi kesinlikle reddeder. Leydi Catherine bu konuşmayı Darcy’ye anlattığında, Darcy’nin içinde yeniden umut doğar.',
          'Darcy Longbourn’a gelir ve bir sabah yürüyüşünde Elizabeth’e duygularının değişmediğini söyler. Elizabeth de artık onu sevdiğini itiraf eder. İkisi de birbirlerinin kendilerini nasıl değiştirdiğini konuşurlar. Darcy, Elizabeth’in kendisine kibrini nasıl gösterdiğini, Elizabeth ise Darcy’nin önyargılarını nasıl yıktığını anlatır. Gurur ve Önyargı, ilk izlenimlerin ne kadar yanıltıcı olabileceğini ve gerçek sevginin, insanın kendini dürüstçe sorgulamasıyla nasıl filizlendiğini anlatan, zamansız ve esprili bir aşk romanıdır.'
        ]
      }
    ]
  };
})();
