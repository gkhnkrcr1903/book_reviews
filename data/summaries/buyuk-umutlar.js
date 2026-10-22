// Büyük Umutlar — Charles Dickens (1861)
// Sahneler data/scenes.js yardımcılarıyla çizilir; ileride image.src ile gerçek çizimlerle değiştirilebilir.
(() => {
  const { svg, glow, skyline, figure, seated, streaks, dots } = window.Scene;

  const marsh = (y, c) => `<path d="M0 ${y} Q200 ${y - 10} 400 ${y} T800 ${y - 6} V400 H0 Z" fill="${c}"/>`;
  const reeds = (seed, n, y, c) => Array.from({ length: n }, (_, i) => `<line x1="${(i * 37 + seed) % 800}" y1="${y + (i % 4) * 10}" x2="${(i * 37 + seed) % 800 + (i % 3) - 1}" y2="${y - 20 - (i % 5) * 6 + (i % 4) * 10}" stroke="${c}" stroke-width="2"/>`).join('');

  // 1 — Bataklık mezarlığı ve kaçak mahkûm
  const graveyard = svg({
    sky: ['#3a3a40', '#5a5a60', '#8a8880'],
    vignette: .65, grain: .22,
    body: id => `
      ${marsh(250, '#3a4030')}
      ${reeds(3, 90, 250, '#2a3020')}
      <g transform="translate(640 230)" fill="#1a1a1e"><rect x="-30" y="-80" width="60" height="80"/><polygon points="-34,-80 0,-120 34,-80"/></g>
      ${[[180, 1], [240, .9], [300, 1.1], [360, .8]].map(([x, s]) => `<g transform="translate(${x} 320) scale(${s})"><path d="M-14 0 V-40 Q0 -54 14 -40 V0 Z" fill="#5a5a5e"/></g>`).join('')}
      ${figure(240, 360, 1, '#3a3a40')}
      ${figure(320, 360, 2.1, '#0a0a0e', {})}<line x1="306" y1="350" x2="334" y2="350" stroke="#5a5a5a" stroke-width="3"/>
      <rect y="360" width="800" height="40" fill="#1a1e16"/>`
  });

  // 2 — Satis House ve durmuş saatler
  const satis = svg({
    sky: ['#0e0a08', '#1a1410', '#0e0a08'],
    vignette: .8, grain: .22,
    body: id => `
      ${glow(id, 400, 200, 260, '#ffc070', .35)}
      <rect x="200" y="200" width="400" height="20" fill="#e8dcc4"/>
      <g transform="translate(400 200)" opacity=".85"><path d="M-80 0 Q-80 -60 0 -70 Q80 -60 80 0 Z" fill="#c8bca0"/>${Array.from({ length: 12 }, (_, i) => `<path d="M${-70 + i * 12} -10 q4 -12 8 0" stroke="#5a4a3a" stroke-width="1" fill="none" opacity=".6"/>`).join('')}</g>
      ${Array.from({ length: 14 }, (_, i) => `<path d="M${180 + i * 32} 0 Q${190 + i * 32} ${80 + (i % 4) * 20} ${200 + i * 32} 0" stroke="#d8d0c0" stroke-width="1" fill="none" opacity=".35"/>`).join('')}
      <g transform="translate(690 120)"><circle r="30" fill="#e8dcc4"/><line x1="0" y1="0" x2="-16" y2="-10" stroke="#1a1410" stroke-width="3"/><line x1="0" y1="0" x2="0" y2="-22" stroke="#1a1410" stroke-width="2"/></g>
      ${figure(560, 330, 1.9, '#e8e0d0', { dress: true, shawl: '#f4ecdc' })}
      ${figure(260, 330, 1.2, '#2a2a3a')}${figure(320, 330, 1.25, '#5a4a6a', { dress: true })}
      <rect y="330" width="800" height="70" fill="#0a0806"/>`
  });

  // 3 — Demirhane ve Joe
  const forge = svg({
    sky: ['#1a0a04', '#2a1408', '#1a0a04'],
    vignette: .65,
    body: id => `
      ${glow(id, 300, 260, 240, '#ff7a2a', .65)}
      <rect x="220" y="250" width="160" height="80" fill="#2a1408"/><rect x="240" y="260" width="120" height="50" fill="#ff8a2a"/>
      ${Array.from({ length: 30 }, (_, i) => `<circle cx="${300 + Math.cos(i) * (20 + i * 3)}" cy="${240 - i * 5}" r="${1 + (i % 3)}" fill="#ffd04a" opacity="${.9 - i * .025}"/>`).join('')}
      <rect x="460" y="290" width="80" height="20" fill="#3a3a3a"/><rect x="480" y="310" width="40" height="30" fill="#2a2a2a"/>
      ${figure(420, 340, 2.1, '#0a0604', {})}<line x1="430" y1="240" x2="480" y2="270" stroke="#3a3a3a" stroke-width="6"/>
      ${figure(620, 340, 1.4, '#0a0604')}
      <rect y="340" width="800" height="60" fill="#0a0402"/>`
  });

  // 4 — Londra’ya giden posta arabası
  const london = svg({
    sky: ['#3a3a44', '#5a5a64', '#7a7880'],
    vignette: .6, grain: .2,
    body: id => `
      ${skyline({ y: 300, color: '#1a1a20', seed: 111, lit: .25, light: '#ffd890', minH: 90, maxH: 200 })}
      ${Array.from({ length: 5 }, (_, i) => `<path d="M${80 + i * 160} 140 q-30 -40 10 -80" stroke="#c8c0b8" stroke-width="26" fill="none" opacity=".15" filter="url(#${id}blur)"/>`).join('')}
      <rect y="300" width="800" height="100" fill="#2a2a2e"/>
      <g transform="translate(400 350)"><rect x="-80" y="-70" width="160" height="60" rx="8" fill="#5a1a1a"/><rect x="-66" y="-60" width="40" height="28" fill="#ffd88a" opacity=".5"/><rect x="26" y="-60" width="40" height="28" fill="#ffd88a" opacity=".5"/><circle cx="-50" cy="0" r="18" fill="none" stroke="#1a1a1a" stroke-width="5"/><circle cx="50" cy="0" r="18" fill="none" stroke="#1a1a1a" stroke-width="5"/></g>
      ${figure(200, 360, 1.6, '#1a1a1a', { hat: true })}${figure(620, 360, 1.5, '#1a1a1a', { hat: true })}
      ${streaks(111, 100, '#c8ccd0', 18, -4, .25)}`
  });

  // 5 — Estella ile balo / Richmond
  const estella = svg({
    sky: ['#2a1a2a', '#4a2a3a', '#2a1a2a'],
    vignette: .55,
    body: id => `
      ${[200, 400, 600].map(x => `<line x1="${x}" y1="0" x2="${x}" y2="40" stroke="#d9a83a"/>${glow(id, x, 52, 70, '#fff4c0', .7)}<circle cx="${x}" cy="52" r="7" fill="#fff4c0"/>`).join('')}
      <rect y="290" width="800" height="110" fill="#4a2a24"/>
      <g transform="translate(400 330)"><path d="M-14 -50 Q0 -56 14 -50 L34 0 H-34 Z" fill="#e8e0f0"/><circle cy="-62" r="9" fill="#e8e0f0"/></g>
      ${figure(300, 330, 1.9, '#0a0a0a', { hat: false })}
      ${figure(520, 330, 1.8, '#1a1010', {})}
      ${[120, 170, 640, 700].map((x, i) => figure(x, 320, 1.3, i % 2 ? '#4a1a2a' : '#0a0a0a', i % 2 ? { dress: true } : {})).join('')}`
  });

  // 6 — Fırtınalı gece: gerçek velinimet
  const benefactor = svg({
    sky: ['#0a0c12', '#141820', '#0a0c12'],
    vignette: .75,
    body: id => `
      ${streaks(121, 220, '#9ab0c8', 30, -14, .45)}
      <rect x="0" y="0" width="800" height="400" fill="#0a0c12" opacity=".3"/>
      ${glow(id, 300, 200, 200, '#ffc070', .45)}
      <rect x="220" y="140" width="40" height="100" fill="#e8dcc4"/><path d="M240 140 q-6 -14 0 -24 q6 10 0 24" fill="#ffd070"/>
      <rect y="300" width="800" height="100" fill="#140e0a"/>
      ${figure(400, 320, 1.9, '#2a2a3a', {})}
      ${figure(540, 320, 2.2, '#0a0806', { hat: true })}`
  });

  // 7 — Thames’te kaçış
  const thames = svg({
    sky: ['#4a5a6a', '#7a8a96', '#a8b0b4'],
    vignette: .5, grain: .18,
    body: id => `
      ${skyline({ y: 200, color: '#3a4048', seed: 131, lit: .02, minH: 30, maxH: 100, dome: false })}
      <rect y="200" width="800" height="200" fill="#3a4a58"/>
      ${Array.from({ length: 14 }, (_, i) => `<path d="M${(i * 61) % 800} ${220 + i * 12} q30 -6 60 0" stroke="#8a9aa8" stroke-width="2" fill="none" opacity=".5"/>`).join('')}
      <g transform="translate(620 250)" fill="#1a1a1e"><path d="M-120 0 H120 L100 20 H-100 Z"/><rect x="-30" y="-40" width="60" height="40"/><rect x="-10" y="-80" width="16" height="40"/></g>
      <path d="M610 170 q-30 -40 20 -70" stroke="#3a3a3a" stroke-width="20" fill="none" opacity=".3" filter="url(#${id}blur)"/>
      <g transform="translate(300 320)"><path d="M-70 0 Q0 20 70 0 L60 -12 H-60 Z" fill="#2a1a10"/>${figure(-30, -12, 1, '#0a0a0a', { hat: true })}${figure(0, -12, 1, '#0a0a0a')}${figure(30, -12, 1, '#0a0a0a')}<line x1="-60" y1="-6" x2="-90" y2="16" stroke="#2a1a10" stroke-width="3"/><line x1="60" y1="-6" x2="90" y2="16" stroke="#2a1a10" stroke-width="3"/></g>`
  });

  // 8 — Satis House harabelerinde son buluşma
  const ruins = svg({
    sky: ['#3a3a50', '#7a7090', '#c8a8a0'],
    vignette: .5, grain: .16,
    body: id => `
      ${glow(id, 600, 220, 200, '#fff0d0', .5)}
      <g fill="#2a2830"><rect x="100" y="140" width="40" height="160"/><rect x="200" y="180" width="30" height="120"/><path d="M100 140 L120 110 L140 140 Z"/><rect x="560" y="160" width="40" height="140"/></g>
      <path d="M0 290 Q400 270 800 290 V400 H0 Z" fill="#3a4038"/>
      ${Array.from({ length: 30 }, (_, i) => `<rect x="${(i * 43) % 800}" y="${296 + (i * 17) % 80}" width="${16 + (i % 3) * 6}" height="8" fill="#4a4a48"/>`).join('')}
      ${dots(141, 60, '#e8e0f0', 1.6, .5, 0, 260)}
      <rect x="0" y="200" width="800" height="100" fill="#c8c0d0" opacity=".15" filter="url(#${id}blur)"/>
      ${figure(380, 340, 1.8, '#1a1a2a')}${figure(430, 340, 1.7, '#3a2a3a', { dress: true, shawl: '#e8dcc4' })}`
  });

  window.SUMMARIES['buyuk-umutlar'] = {
    pages: [
      {
        title: 'Bataklıktaki Mahkûm',
        image: { svg: graveyard, caption: 'Kent bataklıklarının kenarındaki kilise mezarlığı ve aniden ortaya çıkan bir yabancı.' },
        text: [
          'Charles Dickens’ın romanı, anlatıcısı olan küçük bir çocuğun, Philip Pirrip’in, herkesin deyişiyle Pip’in hikâyesidir. Pip, İngiltere’nin Kent bölgesindeki bataklıkların kenarında, kendisinden yaşça çok büyük, sert ve huysuz ablası ile ablasının kocası, demirci Joe Gargery’nin yanında büyür. Anne ve babası ölmüştür. Pip, onların yüzlerini hiç görmemiştir ve onları yalnızca mezar taşlarındaki harflerden hayal eder.',
          'Bir Noel arifesi, Pip ailesinin mezarlarının başında dururken, birden korkunç görünüşlü bir adam ortaya çıkar. Bacağında zinciri olan, ıslak ve çamurlu bu adam, yakındaki hapishane gemisinden kaçmış bir mahkûmdur. Adam, Pip’i baş aşağı tutarak ona korkunç tehditler savurur ve ertesi sabah kendisine bir eğe ve yiyecek getirmesini emreder.',
          'Korkudan titreyen Pip, ertesi sabah ablasının kilerinden bir parça ekmek, peynir, bir domuz eti turtası ve bir şişe brendi çalar. Joe’nun demirhanesinden de bir eğe alarak bataklığa koşar. Mahkûm, yiyecekleri bir hayvan gibi açgözlülükle yer. Pip, ona acır. Bir süre sonra askerler mahkûmu yakalar. Mahkûm, Pip’i korumak için, yiyecekleri kendisinin çaldığını söyler. Bu küçük iyilik ve sessiz anlaşma, yıllar sonra Pip’in hayatını tamamen değiştirecektir.'
        ]
      },
      {
        title: 'Miss Havisham ve Estella',
        image: { svg: satis, caption: 'Satis House: durmuş saatler, örümcek ağlarıyla kaplı bir düğün pastası ve gelinliğiyle yaşayan bir kadın.' },
        text: [
          'Bir gün Pip, kasabanın en zengin ve en tuhaf kadını olan Miss Havisham’ın Satis House adlı malikânesine, onu eğlendirmek için oynamaya çağrılır. Bu ev karanlık, tozlu ve ürkütücüdür. Miss Havisham, yıllar önce düğün gününde, düğüne yirmi dakika kala nişanlısı tarafından terk edilmiştir. O günden beri evdeki bütün saatleri durdurmuş, gelinliğini çıkarmamış ve düğün pastasını masanın üzerinde çürümeye bırakmıştır.',
          'Miss Havisham’ın yanında, evlat edindiği güzel, soğuk ve kibirli bir kız olan Estella yaşar. Miss Havisham, Estella’yı, erkeklerin kalbini kırmak ve kendisinin uğradığı ihanetin intikamını almak için yetiştirmiştir. Estella, Pip ile kart oynar ve onun kaba ellerini, kalın çizmelerini ve sıradan bir köylü çocuğu olmasını aşağılar. Pip, ilk kez kendi yoksulluğundan ve cahilliğinden utanır.',
          'Pip, Estella’ya umutsuzca âşık olur. Satis House’a yaptığı her ziyarette, kendi hayatının ne kadar sıradan olduğunu daha çok hisseder. Bir gün Joe’nun demirhanesinde çırak olarak çalışmaya başladığında, artık eskisi gibi mutlu değildir. Hayalinde, bir beyefendi olmak, Estella’ya layık biri olmak ve bataklıklardan, demirhaneden ve sıradan hayatından kurtulmak vardır.'
        ]
      },
      {
        title: 'Demirhane',
        image: { svg: forge, caption: 'Joe Gargery’nin demirhanesi: kıvılcımlar, örs ve iyi kalpli bir demirci.' },
        text: [
          'Joe Gargery, romanın en iyi kalpli ve en sevimli karakterlerinden biridir. Okuma yazmayı zar zor bilen, sade ve basit bir adamdır. Ama Pip’i kendi oğlu gibi sever ve karısının sertliğinden onu korumaya çalışır. Pip için demirhanede çıraklık yapmak, Joe için en büyük gurur kaynağıdır. Ama Pip, Estella’nın aşağılayıcı sözlerinden sonra, Joe’nun bu sade hayatından utanmaya başlar.',
          'Bu yıllarda Pip’in ablası, gizemli bir saldırgan tarafından başına aldığı bir darbeyle ağır yaralanır ve konuşma yeteneğini kaybeder. Joe’nun yanında çalışan kıskanç ve kaba işçi Orlick, bu saldırıdan şüphelenilen kişidir, ama hiçbir şey kanıtlanamaz. Ablasına bakmak için eve Biddy adında, zeki, iyi kalpli ve dürüst bir genç kız gelir.',
          'Biddy, Pip’in en yakın sırdaşı olur. Pip, ona Estella’ya olan aşkını ve bir beyefendi olma hayallerini anlatır. Biddy, Pip’e Estella’nın onu mutlu edemeyeceğini, gerçek değerin unvanlarda değil, kalpte olduğunu nazikçe söyler. Ama Pip, bu sözleri duymak istemez. Okur, Pip’in kendi mutluluğunu, hayallerinin peşinden koşarken nasıl gözden kaçırdığını acıyla izler.'
        ]
      },
      {
        title: 'Büyük Umutlar',
        image: { svg: london, caption: 'Londra’ya giden posta arabası ve sisli, dumanlı bir şehir.' },
        text: [
          'Bir gün demirhaneye Londra’dan ünlü avukat Bay Jaggers gelir. Jaggers, Pip’e büyük bir müjde verir: Kimliğini açıklamak istemeyen bir velinimet, Pip’e büyük bir servet bırakmıştır. Pip, Londra’ya gidip bir beyefendi olarak eğitim görecek ve ileride bu servete kavuşacaktır. Romanın adındaki “büyük umutlar” bu mirastır. Tek şart, velinimetinin kim olduğunu asla sormamasıdır.',
          'Pip, bu velinimetin Miss Havisham olduğundan emindir. Onun kendisini Estella ile evlendirmek için bir beyefendiye dönüştürmek istediğini düşünür. Joe ve Biddy’ye veda eder ve büyük bir heyecanla Londra’ya gider. Ama gitmeden önce Joe’ya karşı soğuk ve kibirli davranır. Joe, onun bu değişimini sessizce kabullenir.',
          'Londra’da Pip, neşeli ve iyi kalpli Herbert Pocket ile aynı evi paylaşmaya başlar. Herbert, Pip’e bir beyefendi gibi nasıl giyineceğini, nasıl konuşacağını ve nasıl davranacağını öğretir. Pip, pahalı kıyafetler giyer, kulüplere gider ve borç içinde yaşamaya başlar. Bir gün Joe onu ziyarete geldiğinde, Pip onun kaba tavırlarından utanır. Joe, Pip’in kendisinden utandığını fark eder ve sessizce geri döner.'
        ]
      },
      {
        title: 'Estella’nın Soğukluğu',
        image: { svg: estella, caption: 'Londra’nın parıltılı bir balosunda, herkesin hayran olduğu soğuk bir güzellik.' },
        text: [
          'Estella da Londra’ya gelir. Miss Havisham’ın isteği üzerine, Pip ona eşlik etmekle görevlendirilir. Estella, Pip’e karşı bazen dostça, bazen ise son derece soğuk davranır. Pip’e, onun kalbini kırabileceğini, çünkü kendisinin bir kalbi olmadığını, Miss Havisham tarafından sevmemek için yetiştirildiğini açıkça söyler. Pip, bu sözlere rağmen onu sevmeye devam eder.',
          'Estella, Bentley Drummle adında kaba, zengin ve aptal bir adamla ilgilenmeye başlar. Pip, buna büyük bir acı ve kıskançlıkla tanık olur. Miss Havisham ise, Estella’nın Pip’i ne kadar acıttığını gördükçe garip bir zevk duyar. Bir gün Estella, kendisini sevmemesi için Pip’i bile uyardığını, ama Miss Havisham’ın ondan istediği soğukluğun artık onun kendi doğası olduğunu söyler.',
          'Pip, bu yıllarda Joe’nun karısının, yani ablasının öldüğünü öğrenir ve cenaze için köyüne döner. Biddy ile konuşurken, ona Joe’yu daha sık ziyaret edeceğine söz verir, ama Biddy bu sözün tutulacağından emin değildir. Pip, içten içe Joe’ya ve Biddy’ye karşı ne kadar nankör davrandığını bilir, ama Londra’daki hayatından ve hayallerinden vazgeçemez.'
        ]
      },
      {
        title: 'Fırtınalı Bir Gece',
        image: { svg: benefactor, caption: 'Yağmurlu bir gecede Pip’in kapısına gelen yaşlı ve yorgun bir yabancı.' },
        text: [
          'Pip yirmi üç yaşındayken, fırtınalı ve yağmurlu bir gece, Londra’daki evinin kapısı çalınır. Kapıda yaşlı, sert yüzlü ve tuhaf bir adam durmaktadır. Pip, ilk başta onu tanımaz. Ama adam kendini tanıttığında, Pip dehşete düşer. Bu adam, çocukken bataklıkta yardım ettiği kaçak mahkûm, Abel Magwitch’tir.',
          'Magwitch, Pip’e gerçeği anlatır. Pip’in servetinin kaynağı Miss Havisham değil, kendisidir. Avustralya’ya sürgün edildikten sonra koyun yetiştirerek zengin olmuş ve kazandığı bütün parayı, bir zamanlar kendisine acıyan o küçük çocuğu bir beyefendi yapmak için harcamıştır. Ama Magwitch, ölüm cezası tehdidi altında İngiltere’ye geri dönmüştür, çünkü yarattığı beyefendiyi kendi gözleriyle görmek istemektedir.',
          'Pip, bu haberle yıkılır. Estella ile evlenme umudu ve Miss Havisham’ın velinimeti olduğu hayali bir anda yok olur. Kendisini bir beyefendi yapan paranın, nefret ettiği bir suçludan geldiğini öğrenmek, onu derinden sarsar. Ama zamanla, Magwitch’in kendisine olan derin sevgisini ve fedakârlığını fark eder. Magwitch’in hayatını kurtarmak için onu yeniden yurt dışına kaçırmaya karar verir.'
        ]
      },
      {
        title: 'Thames’te Kaçış',
        image: { svg: thames, caption: 'Thames Nehri’nde sisli bir sabah ve bir buharlı gemiye yetişmeye çalışan küçük bir kayık.' },
        text: [
          'Pip, Magwitch’in geçmişini araştırdıkça şaşırtıcı gerçeklerle karşılaşır. Magwitch’in eski ortağı ve can düşmanı Compeyson, Miss Havisham’ı düğün gününde terk eden nişanlıdır. Ayrıca Pip, Bay Jaggers’ın hizmetçisi Molly’nin Estella’nın annesi, Magwitch’in de Estella’nın babası olduğunu keşfeder. Estella, aslında Pip’in kendi velinimetinin kızıdır.',
          'Pip, son bir kez Satis House’a gider. Estella, Bentley Drummle ile evlenmeye karar vermiştir. Miss Havisham, sonunda Estella’yı bir kalp kırıcıya dönüştürerek ne büyük bir hata yaptığını anlar ve Pip’ten af diler. Pip, onu bağışlar. Ama giderken, Miss Havisham’ın gelinliği şömineden alev alır. Pip, ellerini yakarak onu kurtarmaya çalışır. Miss Havisham, bir süre sonra bu yaralar yüzünden ölür.',
          'Pip, Herbert ve onların arkadaşı Startop, Magwitch’i bir kayıkla Thames Nehri’nden aşağıya, yurt dışına gidecek bir buharlı gemiye götürmeye çalışırlar. Ama Compeyson onları polise ihbar etmiştir. Polis kayığı onlara yaklaştığında Magwitch, Compeyson’a saldırır. İkisi birlikte suya düşer. Compeyson boğulur. Magwitch ise ağır yaralanarak yakalanır ve idama mahkûm edilir.'
        ]
      },
      {
        title: 'Harabelerin Ötesinde',
        image: { svg: ruins, caption: 'Yıllar sonra, Satis House’un yıkıntıları arasında sisli bir akşam.' },
        text: [
          'Magwitch, idam edilmeden önce hapishane hastanesinde ölür. Pip, son günlerinde onun yanından hiç ayrılmaz ve elini tutar. Ölmeden önce ona, kızı Estella’nın hayatta olduğunu, güzel bir hanım olduğunu ve Pip’in onu sevdiğini söyler. Magwitch, mutlu bir şekilde gözlerini yumar. Pip, bir zamanlar nefret ettiği bu adamın, hayatında tanıdığı en iyi insanlardan biri olduğunu anlar.',
          'Magwitch’in serveti devlete geçer ve Pip borç içinde yapayalnız kalır. Ağır bir şekilde hastalanır. Uyandığında, başında yıllardır ihmal ettiği Joe’yu bulur. Joe, ona hiçbir sitem etmeden haftalarca bakmış, hatta Pip’in borçlarını da ödemiştir. Pip, utanç ve minnet duygusuyla Biddy’ye evlenme teklif etmek için köyüne döner. Ama tam o gün Joe ile Biddy’nin evlendiğini öğrenir. Pip, onların mutluluğu için sevinir.',
          'Pip, Herbert ile birlikte yurt dışına giderek bir ticaret şirketinde çalışmaya başlar ve on bir yıl sonra İngiltere’ye döner. Bir akşam, Satis House’un harabelerini ziyaret ederken, orada dul kalmış, acılarla olgunlaşmış ve yumuşamış Estella ile karşılaşır. Estella, acının kendisine Pip’in kalbini anlamayı öğrettiğini söyler. İkisi el ele, sisin içinden birlikte yürürler. Pip, bir daha ayrılmayacaklarına dair hiçbir gölge görmediğini söyler. Büyük Umutlar, sahte değerlerin peşinde koşmanın, nankörlüğün ve gerçek sevginin ve sadakatin değerinin hikâyesidir.'
        ]
      }
    ]
  };
})();
