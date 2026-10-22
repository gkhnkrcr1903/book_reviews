// Fareler ve İnsanlar — John Steinbeck (1937)
// Sahneler data/scenes.js yardımcılarıyla çizilir; ileride image.src ile gerçek çizimlerle değiştirilebilir.
(() => {
  const { svg, glow, skyline, figure, seated, streaks, dots } = window.Scene;

  const big = (x, y, s, c) => figure(x, y, s * 1.25, c, { hat: true });
  const small = (x, y, s, c) => figure(x, y, s * .9, c, { hat: true });
  const barn = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-110" y="-90" width="220" height="90" fill="${c}"/><polygon points="-124,-90 0,-150 124,-90" fill="${c}"/><rect x="-30" y="-64" width="60" height="64" fill="#1a0e06"/></g>`;

  // 1 — Salinas Nehri kıyısı
  const river = svg({
    sky: ['#e8a860', '#f4c88a', '#f8e0b0'],
    vignette: .4, grain: .14,
    body: id => `
      ${glow(id, 640, 160, 200, '#fff0c0', .7)}
      <path d="M0 220 L140 150 L280 200 L420 130 L560 190 L700 140 L800 180 V250 H0 Z" fill="#a87a5a"/>
      <rect y="240" width="800" height="70" fill="#5a8a9a"/>${Array.from({ length: 10 }, (_, i) => `<path d="M${(i * 83) % 800} ${256 + i * 5} q20 -4 40 0" stroke="#e8f0f0" stroke-width="2" fill="none" opacity=".5"/>`).join('')}
      <path d="M0 300 Q400 280 800 300 V400 H0 Z" fill="#8a7a4a"/>
      ${Array.from({ length: 6 }, (_, i) => `<g transform="translate(${40 + i * 150} 300)"><rect x="-6" y="-120" width="12" height="120" fill="#e8dcc8"/><ellipse cy="-140" rx="44" ry="40" fill="#6a8a3a"/></g>`).join('')}
      ${small(330, 360, 1.5, '#2a2a3a')}${big(400, 360, 1.5, '#3a2a1a')}
      ${dots(221, 30, '#fff4d0', 1.2, .5, 100, 230)}`
  });

  // 2 — Çiftlik ve barakalar
  const ranch = svg({
    sky: ['#9ab8d0', '#cfdce4', '#f0e8d0'],
    vignette: .35, grain: .14,
    body: id => `
      ${glow(id, 640, 80, 150, '#fff8d8', .7)}
      <path d="M0 250 Q400 230 800 250 V400 H0 Z" fill="#c8b070"/>
      ${barn(560, 260, 1.1, '#8a3a2a')}
      <g transform="translate(220 270)"><rect x="-120" y="-60" width="240" height="60" fill="#8a7a5a"/><polygon points="-130,-60 0,-90 130,-60" fill="#6a5a3a"/>${[-90, -40, 10, 60].map(dx => `<rect x="${dx}" y="-44" width="24" height="20" fill="#3a3a3a"/>`).join('')}</g>
      ${Array.from({ length: 6 }, (_, i) => `<line x1="${380 + i * 20}" y1="270" x2="${380 + i * 20}" y2="300" stroke="#5a4a3a" stroke-width="3"/>`).join('')}<line x1="380" y1="280" x2="480" y2="280" stroke="#5a4a3a" stroke-width="3"/>
      ${small(300, 350, 1.4, '#2a2a3a')}${big(360, 350, 1.4, '#3a2a1a')}${figure(460, 350, 1.4, '#5a3a2a', { hat: true })}`
  });

  // 3 — Barakanın içi, Candy ve yaşlı köpeği
  const bunkhouse = svg({
    sky: ['#3a2a1a', '#4a3624', '#2a1e12'],
    vignette: .6,
    body: id => `
      ${glow(id, 400, 60, 260, '#ffd090', .5)}<line x1="400" y1="0" x2="400" y2="50" stroke="#000"/><circle cx="400" cy="56" r="8" fill="#fff4c0"/>
      ${[100, 220, 580, 700].map(x => `<rect x="${x - 50}" y="220" width="100" height="16" fill="#5a3a24"/><rect x="${x - 50}" y="170" width="100" height="12" fill="#5a3a24"/>`).join('')}
      <path d="M280 270 H520 L540 290 H260 Z" fill="#4a3020"/>
      ${seated(320, 272, 1.4, '#1a1410')}${seated(480, 272, 1.4, '#1a1410', true)}
      <rect y="300" width="800" height="100" fill="#2a1a0e"/>
      ${figure(160, 340, 1.5, '#3a3020', { hat: true })}
      <g transform="translate(220 340) scale(1.2)" fill="#5a4a3a"><path d="M-22 -16 H14 L20 -24 L26 -22 L24 -16 L18 -10 V0 H14 V-6 H-14 V0 H-18 V-8 Z"/></g>`
  });

  // 4 — Hayal: küçük bir çiftlik ve tavşanlar
  const dream = svg({
    sky: ['#f4c8a0', '#f8dcb8', '#fcecd8'],
    vignette: .3, grain: .1,
    body: id => `
      ${glow(id, 400, 220, 300, '#fff4d8', .8)}
      <path d="M0 260 Q400 220 800 260 V400 H0 Z" fill="#9ab86a"/>
      <g transform="translate(400 280)"><rect x="-70" y="-60" width="140" height="60" fill="#f4e8d0"/><polygon points="-80,-60 0,-100 80,-60" fill="#a8543a"/><rect x="-12" y="-36" width="24" height="36" fill="#5a3a2a"/><rect x="-54" y="-48" width="22" height="18" fill="#ffd88a"/><rect x="32" y="-48" width="22" height="18" fill="#ffd88a"/></g>
      ${Array.from({ length: 6 }, (_, i) => `<g transform="translate(${180 + i * 90} ${330 + (i % 2) * 18})" fill="${i % 2 ? '#e8dcc4' : '#a88a6a'}"><ellipse cx="0" cy="-8" rx="12" ry="8"/><circle cx="10" cy="-14" r="6"/><ellipse cx="12" cy="-24" rx="2" ry="7"/><ellipse cx="8" cy="-24" rx="2" ry="7"/></g>`).join('')}
      ${Array.from({ length: 30 }, (_, i) => `<circle cx="${(i * 47) % 800}" cy="${290 + (i * 13) % 100}" r="2.5" fill="${i % 2 ? '#f4e04a' : '#fff'}"/>`).join('')}
      <g opacity=".85">${Array.from({ length: 4 }, (_, i) => `<g transform="translate(${560 + i * 30} 260)"><rect x="-3" y="-40" width="6" height="40" fill="#5a4a3a"/><circle cy="-50" r="16" fill="#7aa85a"/><circle cx="-6" cy="-52" r="3" fill="#c83a2a"/><circle cx="6" cy="-46" r="3" fill="#c83a2a"/></g>`).join('')}</g>`
  });

  // 5 — Curley ve ezilen el
  const curley = svg({
    sky: ['#2a1a10', '#3a2416', '#2a1a10'],
    vignette: .7,
    body: id => `
      ${glow(id, 400, 60, 260, '#ffd090', .4)}<line x1="400" y1="0" x2="400" y2="50" stroke="#000"/><circle cx="400" cy="56" r="8" fill="#fff4c0"/>
      <rect y="300" width="800" height="100" fill="#1a0e06"/>
      ${small(320, 320, 1.6, '#3a1a1a')}<path d="M330 236 L380 230" stroke="#3a1a1a" stroke-width="6"/>
      ${big(420, 320, 1.6, '#3a2a1a')}
      ${[160, 220, 580, 640].map(x => figure(x, 320, 1.3, '#0a0604', { hat: true })).join('')}`
  });

  // 6 — Crooks’un odası
  const crooks = svg({
    sky: ['#1a1410', '#2a2018', '#1a1410'],
    vignette: .75,
    body: id => `
      ${glow(id, 300, 160, 160, '#ffc070', .5)}<line x1="300" y1="0" x2="300" y2="140" stroke="#000"/><circle cx="300" cy="146" r="7" fill="#fff4c0"/>
      ${Array.from({ length: 8 }, (_, i) => `<rect x="${500 + (i % 4) * 40}" y="${100 + Math.floor(i / 4) * 50}" width="30" height="40" fill="${['#6a2a1a', '#2a4a5a', '#5a5a2a'][i % 3]}" opacity=".7"/>`).join('')}
      ${Array.from({ length: 5 }, (_, i) => `<path d="M${120 + i * 40} 80 q10 30 0 60" stroke="#5a4a3a" stroke-width="4" fill="none"/>`).join('')}
      <rect x="140" y="260" width="200" height="16" fill="#4a3020"/>
      ${seated(260, 262, 1.6, '#0a0604')}
      ${figure(460, 320, 1.9, '#3a2a1a', { hat: true })}
      <rect y="320" width="800" height="80" fill="#140c06"/>`
  });

  // 7 — Ahırda, saman yığınında
  const hay = svg({
    sky: ['#3a2a14', '#5a401e', '#3a2a14'],
    vignette: .65,
    body: id => `
      ${Array.from({ length: 5 }, (_, i) => `<polygon points="${120 + i * 140},0 ${150 + i * 140},0 ${220 + i * 140},400 ${160 + i * 140},400" fill="#ffd890" opacity=".1"/>`).join('')}
      <path d="M0 260 Q200 200 400 240 Q600 200 800 250 V400 H0 Z" fill="#c8a04a"/>
      ${Array.from({ length: 80 }, (_, i) => `<line x1="${(i * 23) % 800}" y1="${250 + (i * 7) % 60}" x2="${(i * 23) % 800 + 10}" y2="${240 + (i * 7) % 60}" stroke="#e8c870" stroke-width="2"/>`).join('')}
      ${seated(380, 300, 1.9, '#3a2a1a')}
      <g transform="translate(470 300) rotate(80)" opacity=".85"><path d="M-14 -50 Q0 -56 14 -50 L30 0 H-30 Z" fill="#a83a3a"/><circle cy="-62" r="9" fill="#d8b878"/></g>
      <g transform="translate(330 300)" fill="#8a6a4a" opacity=".7"><ellipse cx="0" cy="-6" rx="16" ry="6"/><circle cx="14" cy="-10" r="5"/></g>`
  });

  // 8 — Nehir kıyısında son akşam
  const ending = svg({
    sky: ['#3a2a4a', '#a8604a', '#f4a86a'],
    vignette: .5,
    body: id => `
      ${glow(id, 600, 200, 220, '#ffd8a0', .6)}<circle cx="600" cy="200" r="34" fill="#fff0d0"/>
      <path d="M0 210 L140 150 L280 190 L420 130 L560 180 L700 140 L800 170 V240 H0 Z" fill="#4a2a3a"/>
      <rect y="230" width="800" height="70" fill="#5a6a8a"/>${Array.from({ length: 10 }, (_, i) => `<line x1="${540 + (i * 37) % 140}" y1="${240 + i * 6}" x2="${580 + (i * 37) % 140}" y2="${240 + i * 6}" stroke="#ffd8a0" stroke-width="2" opacity="${.7 - i * .06}"/>`).join('')}
      <path d="M0 290 Q400 270 800 290 V400 H0 Z" fill="#2a1a14"/>
      ${Array.from({ length: 4 }, (_, i) => `<g transform="translate(${60 + i * 220} 290)"><rect x="-6" y="-120" width="12" height="120" fill="#140a08"/><ellipse cy="-140" rx="44" ry="40" fill="#1a1010"/></g>`).join('')}
      ${seated(360, 340, 1.8, '#0a0604')}${small(430, 352, 1.5, '#0a0604')}`
  });

  window.SUMMARIES['fareler-ve-insanlar'] = {
    pages: [
      {
        title: 'Nehir Kıyısında İki Adam',
        image: { svg: river, caption: 'Salinas Nehri’nin kıyısında akşam: küçük yapılı George ve dev cüsseli Lennie.' },
        text: [
          'John Steinbeck’in kısa romanı, 1930’ların Büyük Buhran döneminde, Kaliforniya’nın Salinas Vadisi’nde geçer. Bir akşam, Salinas Nehri’nin kıyısındaki söğütlerin altında iki gezgin tarım işçisi belirir. Biri George Milton’dır. Küçük yapılı, zeki, keskin bakışlı ve çabuk sinirlenen bir adamdır. Diğeri ise Lennie Small’dır. Adının tersine dev cüsseli, inanılmaz derecede güçlü, ama zihinsel olarak bir çocuk kadar saf bir adamdır.',
          'Lennie, yumuşak şeylere dokunmayı çok sever. Cebinde ölü bir fare taşımaktadır ve onu okşamaktan büyük bir zevk alır. Ama gücünü kontrol edemediği için, sevdiği küçük hayvanları farkında olmadan öldürür. George, fareyi elinden alır ve atar. Lennie ağlar. George, onunla sık sık kavga eder ve onun yükünden kurtulursa ne kadar rahat bir hayat yaşayabileceğini söyler. Ama ardından her zaman ona şefkatle yaklaşır.',
          'İkisi, kuzeydeki Weed kasabasından kaçmak zorunda kalmışlardır. Orada Lennie, kırmızı elbiseli bir kızın elbisesine dokunmak istemiş, kız korkup bağırınca da elbiseyi bırakamamıştır. Kız onu tecavüzle suçlamış ve ikisi kaçmak zorunda kalmıştır. George, Lennie’ye, yeni çiftlikte başı belaya girerse bu nehir kıyısına gelip saklanmasını ve onu beklemesini söyler.'
        ]
      },
      {
        title: 'Yeni Çiftlik',
        image: { svg: ranch, caption: 'Salinas Vadisi’nde güneşin altında kırmızı bir ahır ve işçilerin barakası.' },
        text: [
          'Ertesi gün George ve Lennie, bir çiftlikte işe başlarlar. George, Lennie’ye patronun yanında hiç konuşmamasını, sadece onun konuşmasına izin vermesini tembihler. Çiftliğin patronu, Lennie’nin neden hiç konuşmadığından şüphelenir, ama George onun kendi kuzeni olduğunu, biraz saf ama çok güçlü bir işçi olduğunu söyleyerek onu ikna eder.',
          'Çiftlikte farklı karakterlerle tanışırlar. Patronun oğlu Curley, kısa boylu, kavgacı ve kendinden büyük adamlara sataşmaktan hoşlanan bir eski boksördür. Kısa süre önce evlenmiştir ve karısını çok kıskanır. Curley’nin karısı ise güzel, yalnız ve çiftlikteki erkeklerle sohbet etmek için sürekli bahaneler arayan genç bir kadındır. Romanda bir adı bile yoktur.',
          'George, Lennie’ye Curley’den ve karısından uzak durmasını defalarca söyler. Çiftliğin en saygın işçisi ise katırcı Slim’dir. Slim, sakin, bilge ve herkesin saygı duyduğu bir adamdır. George ve Lennie arasındaki tuhaf dostluğu ilk anlayan da Slim olur. Gezgin işçilerin çoğunun yalnız dolaştığını, ama bu ikisinin birbirine bağlı olduğunu görür.'
        ]
      },
      {
        title: 'Candy’nin Köpeği',
        image: { svg: bunkhouse, caption: 'Lamba ışığında işçilerin barakası ve sahibinin yanından ayrılmayan yaşlı köpek.' },
        text: [
          'Barakada, çiftliğin yaşlı temizlik işçisi Candy de yaşar. Candy, yıllar önce bir kazada elini kaybetmiştir ve çiftliğin sahibi ona sadece acıdığı için iş vermektedir. Candy’nin, gençliğinden beri yanında olan yaşlı, kör ve kötü kokan bir çoban köpeği vardır. Candy, bu köpeği bütün kalbiyle sever.',
          'İşçilerden Carlson, köpeğin kokusundan şikâyet eder ve Candy’den onu vurmasına izin vermesini ister. Köpeğin artık çok yaşlı ve acı içinde olduğunu, onun için en iyisinin bu olduğunu söyler. Candy direnir, ama barakadaki herkes sessizce Carlson’un tarafını tutar. Slim de köpeğin vurulmasının bir iyilik olacağını söyleyince, Candy çaresizce kabul eder.',
          'Carlson, köpeği dışarı çıkarır. Barakada herkes sessizlik içinde silah sesini bekler. Silah sesi duyulduğunda Candy, yatağına uzanır ve duvara döner. Sonra George’a, köpeğini başkasının değil, kendisinin vurması gerektiğini söyler. Steinbeck, bu sahneyle, işe yaramaz hâle gelen canlıların acımasızca bir kenara atıldığı bir dünyayı ve romanın sonunda yaşanacak trajediyi önceden haber verir.'
        ]
      },
      {
        title: 'Küçük Bir Toprak Parçası',
        image: { svg: dream, caption: 'Hayallerdeki küçük çiftlik: tavşanlar, meyve ağaçları ve kimsenin kovamayacağı bir ev.' },
        text: [
          'George ve Lennie’nin ortak bir hayali vardır. Bir gün yeterince para biriktirip kendilerine ait küçük bir çiftlik alacaklardır. Orada birkaç dönüm toprak, bir inek, birkaç domuz, meyve ağaçları ve tavşanlar olacaktır. Lennie, tavşanlara bakacaktır. Kimseye boyun eğmek zorunda kalmayacaklar, istedikleri zaman çalışıp istedikleri zaman dinleneceklerdir.',
          'Lennie, bu hayali sürekli George’dan dinlemek ister. Her seferinde George, aynı hikâyeyi bir masal gibi anlatır ve Lennie heyecanla “tavşanları” hatırlatır. George, gezgin işçilerin dünyanın en yalnız insanları olduğunu, ama kendilerinin farklı olduğunu söyler, çünkü onların birbirleri vardır. Bu hayal, ikisinin de umutsuz hayatlarına anlam katar.',
          'Candy, onların bu konuşmasını duyar ve kendisinin de hayallerine katılmak istediğini söyler. Elini kaybettiği için aldığı tazminat ve birikimiyle büyük bir para vardır. Bu parayla, birkaç ay içinde küçük çiftliği satın alabileceklerdir. George ilk kez, bu hayalin gerçek olabileceğine inanmaya başlar. Üç adam, kimseye söylemeyeceklerine dair aralarında söz verirler.'
        ]
      },
      {
        title: 'Ezilen El',
        image: { svg: curley, caption: 'Barakada Curley’nin saldırısı ve korkuyla donakalmış dev bir adam.' },
        text: [
          'Bir akşam Curley, karısını ararken barakaya gelir ve Slim’le karısının birlikte olduğundan şüphelenir. Diğer işçiler onunla alay edince, öfkesini Lennie’den çıkarmaya karar verir. Lennie, hayalindeki çiftliği düşünerek gülümsemektedir. Curley, onun kendisine güldüğünü sanır ve Lennie’ye yumruk atmaya başlar.',
          'Lennie, korkudan karşılık veremez ve yüzü kan içinde kalır. George’a bakarak yardım ister. George, ona kendini savunmasını bağırır. Lennie, Curley’nin elini yakalar ve kendi devasa eliyle sıkmaya başlar. Curley’nin elindeki bütün kemikler kırılır. Lennie, George’un sesini duyana kadar eli bırakmaz.',
          'Slim, Curley’ye bu olayın bir makineye elini kaptırmış gibi anlatılması gerektiğini, yoksa herkesin onunla alay edeceğini söyler. Curley, utanç içinde kabul eder ve Lennie’yi işten kovdurmaz. Ama Lennie’nin bilmeden gösterdiği bu muazzam güç, okura onun ne kadar tehlikeli olabileceğini bir kez daha hatırlatır.'
        ]
      },
      {
        title: 'Crooks',
        image: { svg: crooks, caption: 'Ahırın yanındaki küçük odada kitaplarıyla yalnız yaşayan Crooks.' },
        text: [
          'Bir cumartesi akşamı, diğer işçiler kasabaya eğlenmeye gittiğinde, Lennie, çiftliğin seyisi olan siyahi Crooks’un odasına gider. Crooks, ırkı nedeniyle diğer işçilerle birlikte barakada kalamaz. Ahırın yanındaki küçük bir odada, kitapları ve yalnızlığıyla yaşar. Sırtındaki bir sakatlık yüzünden kamburdur ve hayatının büyük kısmında dışlanmıştır.',
          'Crooks, başta Lennie’yi odasından kovmak ister, ama sonra onunla konuşmaya başlar. Lennie’ye, George bir gün geri gelmezse ne yapacağını sorarak onu korkutur. Ama ardından kendi yalnızlığını anlatır. İnsanın, konuşabileceği, yanında olacak birine ihtiyacı olduğunu, aksi halde yalnızlığın onu hasta edeceğini söyler. Lennie’nin anlattığı hayali duyunca, kendisinin de o çiftlikte çalışabileceğini sorar.',
          'Ama Curley’nin karısı odaya gelir ve Crooks’u, siyahi olduğu için kolayca linç ettirebileceğini söyleyerek korkunç bir şekilde aşağılar. Crooks, bir anda içindeki o küçük umudu kaybeder. Steinbeck, bu sahneyle romanın bütün yalnız karakterlerini bir araya getirir: yaşlı, sakat, siyahi ve kadın. Hepsi, kendi hayallerine sıkıca tutunmaya çalışan, ama dünyanın acımasızlığı tarafından ezilen insanlardır.'
        ]
      },
      {
        title: 'Ahırda',
        image: { svg: hay, caption: 'Pazar öğleden sonrası, saman yığınının üzerinde güneşin vurduğu sessiz bir ahır.' },
        text: [
          'Bir pazar öğleden sonra, diğer işçiler dışarıda at nalı oyunu oynarken, Lennie ahırda tek başına oturmaktadır. Elinde, Slim’in ona verdiği yavru köpeğin cansız bedeni vardır. Köpeği okşarken, yanlışlıkla çok sert vurmuş ve onu öldürmüştür. Lennie, George’un bunu öğrenirse kendisini tavşanlara bakmaktan mahrum bırakacağından korkar.',
          'Tam o sırada Curley’nin karısı ahıra gelir ve onunla konuşmaya başlar. Ona, aslında bir film yıldızı olmak istediğini, bir adamın ona Hollywood’a götüreceğini vaat ettiğini, ama annesinin buna izin vermediğini anlatır. Curley ile sadece o evden kaçmak için evlendiğini, onu sevmediğini söyler. Lennie ise sadece yumuşak şeyleri okşamayı sevdiğini anlatır.',
          'Curley’nin karısı, Lennie’ye kendi yumuşak saçlarına dokunmasını teklif eder. Lennie, saçlarını okşamaya başlar ama çok sert tutar. Kadın korkup çığlık atınca, Lennie paniğe kapılır ve onu susturmak için ağzını kapatır. Kadını sarsar ve farkında olmadan boynunu kırar. Lennie, korku içinde George’un söylediğini hatırlar ve nehir kıyısındaki o yere doğru kaçar.'
        ]
      },
      {
        title: 'Nehir Kıyısına Dönüş',
        image: { svg: ending, caption: 'Günbatımında Salinas Nehri’nin kıyısı ve yan yana oturan iki adam.' },
        text: [
          'Candy, Curley’nin karısının cesedini bulur ve George’a haber verir. George, bunu Lennie’nin yaptığını hemen anlar. Küçük çiftlik hayalinin de o an öldüğünü bilir. Candy, George’a hâlâ ikisinin birlikte o çiftliği alabileceğini söyler, ama George bu hayalin aslında sadece Lennie sayesinde var olduğunu anlar. Curley, öfkeyle bir av tüfeği alır ve işçilerle birlikte Lennie’yi öldürmek için yola çıkar.',
          'George, kimseye söylemeden, Carlson’un tabancasını alır ve diğerlerinden önce nehir kıyısına gider. Lennie’yi orada, söylediği gibi onu beklerken bulur. Lennie, George’un ona kızmasını bekler. Ama George ona kızmaz. Onunla yan yana oturur ve ona son bir kez, nehrin karşısına bakmasını söyleyerek, hayalindeki küçük çiftliği, tavşanları ve özgür hayatı anlatır.',
          'Lennie, mutlulukla “tavşanları” hayal ederken, George tabancayı onun başının arkasına dayar ve tetiği çeker. Tıpkı Candy’nin köpeği gibi, Lennie de acı çekmeden, sevdiği birinin elinde ölür. Diğer işçiler geldiğinde, Slim George’un yanına gider ve ona yapması gerekeni yaptığını söyler. Fareler ve İnsanlar, adını en iyi planların bile çoğu zaman ters gittiğini anlatan eski bir şiirden alır. Steinbeck, bu kısa ama sarsıcı romanında yalnızlığı, dostluğu ve gerçekleşmeyen hayalleri unutulmaz bir şekilde anlatır.'
        ]
      }
    ]
  };
})();
