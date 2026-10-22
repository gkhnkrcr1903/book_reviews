// Savaş ve Barış — Lev Tolstoy (1869)
// Sahneler data/scenes.js yardımcılarıyla çizilir; ileride image.src ile gerçek çizimlerle değiştirilebilir.
(() => {
  const { svg, glow, skyline, figure, seated, streaks, dots } = window.Scene;

  const chandelier = (x, y, id) => `<line x1="${x}" y1="0" x2="${x}" y2="${y - 20}" stroke="#d9a83a" stroke-width="2"/>
    <path d="M${x - 50} ${y} Q${x} ${y + 30} ${x + 50} ${y}" stroke="#d9a83a" stroke-width="3" fill="none"/>
    ${[-50, -25, 0, 25, 50].map(dx => `<circle cx="${x + dx}" cy="${y + (dx === 0 ? 10 : Math.abs(dx) === 25 ? 7 : 0) - 6}" r="4" fill="#fff4c0"/>`).join('')}${glow(id, x, y, 100, '#ffe0a0', .55)}`;
  const onion = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}"><rect x="-14" y="-60" width="28" height="60"/><path d="M-18 -60 Q-22 -86 0 -100 Q22 -86 18 -60 Z"/><rect x="-2" y="-120" width="4" height="22"/><rect x="-8" y="-114" width="16" height="3"/></g>`;
  const cannon = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}"><rect x="-10" y="-22" width="60" height="12" rx="5" transform="rotate(-10)"/><circle cx="0" cy="-4" r="14" fill="none" stroke="${c}" stroke-width="4"/><rect x="-24" y="-10" width="30" height="8"/></g>`;

  // 1 — Petersburg salonu
  const salon = svg({
    sky: ['#3a2418', '#5a3a24', '#3a2418'],
    vignette: .55,
    body: id => `
      ${chandelier(250, 80, id)}${chandelier(550, 80, id)}
      ${[100, 300, 500, 700].map(x => `<rect x="${x - 40}" y="140" width="80" height="140" fill="#2a1a10"/><rect x="${x - 34}" y="146" width="68" height="128" fill="#6a8ab0" opacity=".25"/>`).join('')}
      <rect y="300" width="800" height="100" fill="#4a2e1a"/>
      ${[[150, 1, 1], [220, 0, 1], [330, 1, 0], [400, 0, 1], [470, 1, 0], [580, 0, 1], [650, 1, 1]].map(([x, d, h]) => figure(x, 330, 1.6, d ? '#1a0e0a' : '#5a1a2a', d ? { hat: false } : { dress: true })).join('')}`
  });

  // 2 — Austerlitz’in sisli tepeleri ve gökyüzüne bakan Andrey
  const austerlitz = svg({
    sky: ['#6a8ab0', '#a8c0d8', '#dfe6ee'],
    vignette: .4, grain: .14,
    body: id => `
      ${Array.from({ length: 6 }, (_, i) => `<ellipse cx="${100 + i * 130}" cy="${70 + (i % 2) * 30}" rx="90" ry="22" fill="#fff" opacity=".7" filter="url(#${id}blur)"/>`).join('')}
      <path d="M0 260 Q200 210 400 250 T800 230 V400 H0 Z" fill="#7a8a6a"/>
      <rect y="250" width="800" height="50" fill="#e8ecf0" opacity=".6" filter="url(#${id}blur)"/>
      <path d="M0 320 Q400 290 800 320 V400 H0 Z" fill="#5a6a4a"/>
      ${cannon(600, 300, 1.4, '#2a2a2a')}${cannon(680, 300, 1.2, '#2a2a2a')}
      <g transform="translate(360 340)"><rect x="-50" y="-10" width="100" height="14" rx="6" fill="#2a2a3a"/><circle cx="-56" cy="-4" r="10" fill="#2a2a3a"/></g>
      <line x1="300" y1="336" x2="230" y2="300" stroke="#2a2a3a" stroke-width="3"/><path d="M230 300 L190 280 L232 296 Z" fill="#e8e0d0"/>
      ${dots(31, 30, '#4a4a4a', 2, .4, 230, 280)}`
  });

  // 3 — Natasha’nın ilk balosu
  const ball = svg({
    sky: ['#2a1a2a', '#4a2a3a', '#2a1a2a'],
    vignette: .5,
    body: id => `
      ${chandelier(400, 70, id)}${chandelier(160, 90, id)}${chandelier(640, 90, id)}
      <rect y="290" width="800" height="110" fill="#5a3a2a"/>
      ${Array.from({ length: 10 }, (_, i) => `<line x1="${i * 90}" y1="290" x2="${i * 90 - 60}" y2="400" stroke="#4a2a1a" stroke-width="2"/>`).join('')}
      <g transform="translate(400 330) rotate(-6)"><path d="M-14 -50 Q0 -56 14 -50 L34 0 H-34 Z" fill="#f4ecf0"/><circle cy="-62" r="9" fill="#f4ecf0"/></g>
      ${figure(440, 330, 1.9, '#0a0a0a')}
      ${[120, 180, 620, 690].map((x, i) => figure(x, 320, 1.4, i % 2 ? '#3a1a2a' : '#0a0a0a', i % 2 ? { dress: true } : {})).join('')}
      ${dots(41, 40, '#ffe0a0', 1.4, .6, 60, 280)}`
  });

  // 4 — Kır malikânesi ve kış avı
  const estate = svg({
    sky: ['#8aa0b8', '#c8d0d8', '#f0ece4'],
    vignette: .35, grain: .12,
    body: id => `
      <path d="M0 240 Q400 220 800 240 V400 H0 Z" fill="#f4f6f8"/>
      ${Array.from({ length: 12 }, (_, i) => `<g transform="translate(${30 + i * 70} ${236 + (i % 3) * 4})"><rect x="-3" y="-50" width="6" height="50" fill="#4a4a4a"/>${Array.from({ length: 5 }, (_, k) => `<line x1="0" y1="${-20 - k * 6}" x2="${(k % 2 ? 1 : -1) * (16 - k * 2)}" y2="${-30 - k * 6}" stroke="#4a4a4a" stroke-width="2"/>`).join('')}</g>`).join('')}
      <g transform="translate(300 300)"><rect x="-110" y="-60" width="220" height="60" fill="#e8dcc4"/><polygon points="-120,-60 0,-96 120,-60" fill="#5a6a7a"/>${[-80, -40, 40, 80].map(x => `<rect x="${x - 8}" y="-46" width="16" height="22" fill="#ffd88a"/>`).join('')}<rect x="-14" y="-40" width="28" height="40" fill="#5a3a2a"/>${[-100, -60, 60, 100].map(x => `<rect x="${x - 3}" y="-60" width="6" height="60" fill="#fff"/>`).join('')}</g>
      <g transform="translate(600 340)" fill="#2a1a10"><path d="M-30 -24 Q-10 -30 20 -26 L30 -40 L36 -34 L28 -20 V0 H24 V-16 H-20 V0 H-24 V-18 Q-34 -20 -30 -24 Z"/></g>
      ${figure(600, 316, .9, '#2a1a10', { hat: true })}
      ${[680, 710, 740].map(x => `<g transform="translate(${x} 350)" fill="#3a2a1a"><path d="M-18 -14 H10 L16 -22 L20 -20 L18 -14 L12 -10 V0 H8 V-6 H-12 V0 H-16 V-8 L-22 -14 Z"/></g>`).join('')}`
  });

  // 5 — Borodino savaşı
  const borodino = svg({
    sky: ['#3a3030', '#7a5a4a', '#c8905a'],
    vignette: .6,
    body: id => `
      ${glow(id, 500, 200, 260, '#ffb060', .5)}
      ${Array.from({ length: 7 }, (_, i) => `<ellipse cx="${80 + i * 110}" cy="${200 + (i % 3) * 20}" rx="90" ry="40" fill="#8a7a6a" opacity=".4" filter="url(#${id}blur)"/>`).join('')}
      <path d="M0 270 Q300 240 500 260 T800 250 V400 H0 Z" fill="#3a3020"/>
      ${cannon(140, 300, 1.6, '#0a0806')}${cannon(260, 310, 1.4, '#0a0806')}
      ${glow(id, 330, 290, 40, '#fff0a0', .9)}
      ${Array.from({ length: 3 }, (_, r) => Array.from({ length: 10 }, (_, i) => figure(430 + i * 34 + r * 10, 320 + r * 20, 1 + r * .1, '#0a0806', { hat: true })).join('')).join('')}
      ${figure(110, 260, 1.4, '#1a1a1a', { hat: true })}
      <rect y="360" width="800" height="40" fill="#1a140c"/>`
  });

  // 6 — Yanan Moskova
  const moscow = svg({
    sky: ['#1a0604', '#4a1408', '#8a2a0a'],
    vignette: .6,
    body: id => `
      ${glow(id, 400, 260, 360, '#ff6a1a', .55)}
      ${[120, 220, 320, 420, 520, 620].map((x, i) => onion(x, 280, 1 + (i % 3) * .2, '#0a0302')).join('')}
      ${skyline({ y: 300, color: '#0a0302', seed: 91, lit: .3, light: '#ff8a2a', minH: 50, maxH: 120, dome: false })}
      ${Array.from({ length: 8 }, (_, i) => `<path d="M${60 + i * 100} 300 q-20 -80 10 -160 q30 -70 -10 -140" stroke="#2a1a14" stroke-width="${30 + (i % 3) * 10}" fill="none" opacity=".35" filter="url(#${id}blur)"/>`).join('')}
      <rect y="300" width="800" height="100" fill="#0a0302"/>
      ${figure(400, 360, 1.5, '#000', { hat: true })}
      ${dots(51, 120, '#ffb04a', 1.6, .9, 60, 300)}`
  });

  // 7 — Esirler ve Platon Karatayev: karlı yolda geri çekilme
  const retreat = svg({
    sky: ['#6a7080', '#9aa0a8', '#c8ccd0'],
    vignette: .5, grain: .18,
    body: id => `
      <path d="M0 240 Q400 220 800 240 V400 H0 Z" fill="#e8ecf0"/>
      <path d="M0 300 Q400 270 800 300" stroke="#b8c0c8" stroke-width="40" fill="none"/>
      ${Array.from({ length: 22 }, (_, i) => figure(20 + i * 37, 300 - Math.sin(i / 3) * 4, .9 + (i % 3) * .1, '#2a2a30', { hat: i % 4 === 0 })).join('')}
      ${figure(380, 350, 1.6, '#2a2a30', { hat: false })}${figure(430, 352, 1.4, '#3a3a40', { hat: false })}
      ${streaks(61, 220, '#ffffff', 8, -4, .7, 2)}`
  });

  // 8 — Bahar: yeniden kurulan aileler
  const spring = svg({
    sky: ['#9ac0e0', '#cfe0ec', '#f4f0e0'],
    vignette: .3, grain: .1,
    body: id => `
      ${glow(id, 620, 100, 180, '#fff8d8', .7)}
      <path d="M0 250 Q400 220 800 250 V400 H0 Z" fill="#8ab86a"/>
      ${Array.from({ length: 6 }, (_, i) => `<g transform="translate(${60 + i * 140} 250)"><rect x="-4" y="-60" width="8" height="60" fill="#e8e4dc"/><ellipse cy="-80" rx="32" ry="38" fill="#a8d08a"/></g>`).join('')}
      <path d="M200 330 H600 L620 345 H180 Z" fill="#e8dcc4"/>
      ${seated(260, 332, 1.3, '#2a3a4a')}${seated(540, 332, 1.3, '#5a3a4a', true)}
      ${figure(340, 360, 1.5, '#2a2a3a')}${figure(390, 360, 1.4, '#6a3a4a', { dress: true })}${figure(430, 360, .8, '#6a5a3a')}${figure(470, 360, .9, '#3a5a6a', { dress: true })}
      ${Array.from({ length: 24 }, (_, i) => `<circle cx="${(i * 37) % 800}" cy="${300 + (i * 17) % 90}" r="3" fill="${i % 2 ? '#f4e04a' : '#fff'}"/>`).join('')}`
  });

  window.SUMMARIES['savas-ve-baris'] = {
    pages: [
      {
        title: 'Petersburg’da Bir Salon',
        image: { svg: salon, caption: 'Temmuz 1805: Anna Pavlovna Şerer’in ışıltılı salonunda toplanan Petersburg sosyetesi.' },
        text: [
          'Tolstoy’un dev romanı, 1805 yazında, Petersburg’un en seçkin salonlarından birinde başlar. Saray nedimesi Anna Pavlovna Şerer’in verdiği davette aristokratlar, Fransızca konuşarak Avrupa’yı sarsan Napoleon’u ve yaklaşan savaşı tartışırlar. Bu parıltılı kalabalığın içinde, romanın iki büyük kahramanı da vardır: Pierre Bezuhov ve Prens Andrey Bolkonski.',
          'Pierre, zengin bir kontun gayrimeşru oğludur. İri yapılı, sakar, iyi kalpli ama kararsız bir gençtir. Yurt dışında eğitim görmüş, Napoleon’a hayranlık duyan fikirleriyle salondakileri şaşırtır. Kısa süre sonra babası ölür ve Pierre, Rusya’nın en büyük servetlerinden birini miras alır. Bir gecede herkesin peşinden koştuğu bir adam olur ve bu servetin peşindeki ailelerin entrikalarıyla, güzel ama boş ve sadakatsiz Helene ile evlenir.',
          'Prens Andrey ise zeki, gururlu ve soğuk bir adamdır. Sosyetenin sahte hayatından ve hamile karısı Liza’yla sürdürdüğü mutsuz evlilikten bıkmıştır. Hayatına bir anlam katmak, belki de Napoleon gibi şan kazanmak için orduya katılır. Tolstoy, bu iki karakterin hayatları boyunca anlam arayışını, Rusya’nın Napoleon’a karşı verdiği büyük savaşın arka planında anlatacaktır.'
        ]
      },
      {
        title: 'Austerlitz’in Gökyüzü',
        image: { svg: austerlitz, caption: 'Austerlitz, 1805: yaralı bir prens ve üzerindeki sonsuz gökyüzü.' },
        text: [
          'Moskova’da ise romanın kalbini oluşturan Rostov ailesiyle tanışırız. Kont İlya Rostov cömert, neşeli ve savurgan bir adamdır. Evleri her zaman misafirlerle, kahkahalarla ve dans eden gençlerle doludur. Ailenin büyük oğlu Nikolay, coşkulu bir vatanseverlikle süvari olarak orduya katılır. Küçük kızları Natasha ise hayat dolu, neşeli ve son derece duygusal on üç yaşında bir kızdır.',
          'Andrey ve Nikolay, 1805 Kasımı’nda Avusturya’daki Austerlitz Savaşı’na katılırlar. Rus ve Avusturya orduları, Napoleon’un dâhiyane taktikleri karşısında büyük bir yenilgiye uğrar. Andrey, kaçan askerleri toparlamak için elinde bayrakla öne atılır ve ağır yaralanarak yere düşer. Sırtüstü yatarken, üzerinde uzanan yüksek, sonsuz ve sakin gökyüzünü görür.',
          'Bu an, Andrey’in hayatında bir dönüm noktasıdır. Bütün hayatı boyunca peşinden koştuğu şan, şeref ve hırs, bu sonsuz gökyüzünün yanında ona anlamsız ve küçük görünür. Bir süre sonra savaş alanını gezen Napoleon, yanına gelip onu över. Ama bir zamanlar idolü olan bu adam, artık Andrey’in gözünde sıradan ve önemsiz bir insandır. Andrey eve döndüğünde ise karısı Liza’nın doğum sırasında öldüğünü öğrenir.'
        ]
      },
      {
        title: 'Natasha',
        image: { svg: ball, caption: 'Natasha’nın ilk büyük balosu ve Prens Andrey’le dansı.' },
        text: [
          'Pierre, karısı Helene’in kendisini aldattığını öğrenir. Kıskançlık içinde, Helene’in sevgilisi olduğundan şüphelendiği Dolohov’u düelloya davet eder ve hiç silah kullanmamış olmasına rağmen onu yaralar. Ardından karısından ayrılır ve hayatın anlamını aramaya başlar. Masonlara katılır, köylülerinin hayatını iyileştirmek için reformlar yapmaya çalışır, ama her girişimi bir hayal kırıklığıyla sonuçlanır.',
          'Karısının ölümünden sonra kendini kırsaldaki malikânesine kapatan Andrey, bir gün Rostov’ların malikânesine gider. Orada, gece penceresinin önünde ay ışığının güzelliği karşısında coşkuyla konuşan Natasha’yı duyar. Bu genç kızın hayat dolu sesi, Andrey’in içinde ölü sandığı duyguları uyandırır. Bir süre sonra Petersburg’daki büyük bir baloda Natasha ile dans eder ve ona âşık olur.',
          'Andrey, Natasha’ya evlenme teklif eder ve Natasha kabul eder. Ama Andrey’in katı ve huysuz babası Prens Bolkonski bu evliliğe karşı çıkar ve bir yıl beklemelerini şart koşar. Andrey, bu bir yılı yurt dışında geçirmek üzere yola çıkar. Natasha ise sevgilisinin yokluğunda sabırsızlık ve yalnızlık içinde günleri saymaya başlar.'
        ]
      },
      {
        title: 'Bir Hata ve Bir Yara',
        image: { svg: estate, caption: 'Rostov’ların karla kaplı kır malikânesi ve kış avından dönen atlılar.' },
        text: [
          'Rostov’ların kır malikânesinde geçen kış günleri, romanın en güzel sahneleri arasındadır. Gençler avlanır, kızaklarla kayar, eski Rus şarkılarıyla dans ederler. Natasha, köylü dansları yapan bir amcanın yanında, hiç öğrenmediği halde Rus halk dansını büyük bir doğallıkla oynar. Tolstoy, bu sahneyle Natasha’nın Rus ruhuyla olan derin bağını anlatır.',
          'Ama Moskova’ya döndüklerinde, Natasha bir operada Helene’in kardeşi olan yakışıklı ve ahlaksız Anatol Kuragin ile tanışır. Anatol, aslında gizlice evli olmasına rağmen Natasha’ya kur yapar ve onu kendisiyle kaçmaya ikna eder. Andrey’in yokluğu ve sabırsızlığı Natasha’yı savunmasız bırakmıştır. Son anda kaçış planı ortaya çıkar ve Natasha, Andrey’le olan nişanını bozar.',
          'Natasha büyük bir utanç ve pişmanlık içinde hastalanır ve neredeyse ölümün eşiğine gelir. Bu karanlık günlerde ona en çok destek olan kişi Pierre’dir. Pierre, ona sessizce, eğer kendisi özgür ve daha iyi bir insan olsaydı, hemen onunla evlenmek isteyeceğini söyler. Bu sözler, Natasha’ya yeniden yaşama gücü verir. Andrey ise yurt dışından döndüğünde Natasha’yı affedemez.'
        ]
      },
      {
        title: 'Borodino',
        image: { svg: borodino, caption: 'Eylül 1812: Borodino’nun dumanla kaplı tepeleri.' },
        text: [
          '1812 yazında Napoleon, altı yüz bin kişilik dev bir orduyla Rusya’yı işgal eder. Bütün ülke bir vatanseverlik coşkusuyla ayağa kalkar. Rus ordusunun başına, yaşlı ve tek gözlü, ama halkın büyük sevgisini kazanmış olan General Kutuzov getirilir. Kutuzov, büyük savaş planlarından çok, askerlerinin ruhuna ve zamanın akışına güvenen bilge bir komutandır.',
          'Moskova’nın yakınındaki Borodino köyünde, tarihin en kanlı savaşlarından biri yaşanır. Pierre, savaşı kendi gözleriyle görmek için cepheye gider. Beyaz şapkası ve sivil kıyafetleriyle, topçuların arasında dolaşır ve savaşın bütün korkunçluğuna tanık olur. Andrey ise kendi alayının başındadır. Bir top mermisi ayaklarının dibine düştüğünde kımıldamaz ve ağır yaralanır.',
          'Andrey, sahra hastanesinde yatarken, yan sedyede bacağı kesilen adamın Natasha’yı baştan çıkaran Anatol Kuragin olduğunu görür. Onun acı içinde ağladığını görünce, içindeki bütün nefretin yerini derin bir merhamet alır. Tolstoy’a göre Borodino, Rusların kazanmadığı ama ruhen yenilmediği bir savaştır. Napoleon’un ordusu bu savaştan zafer kazanmış gibi çıkar, ama aslında yıkılmanın ilk adımını atmıştır.'
        ]
      },
      {
        title: 'Yanan Moskova',
        image: { svg: moscow, caption: 'Fransızların girdiği gün alevler içinde kalan Moskova.' },
        text: [
          'Kutuzov, ordusunu korumak için savaşmadan Moskova’yı terk etme kararı alır. Halk da şehri boşaltmaya başlar. Rostov ailesi, eşyalarını arabalara yüklemiş, yola çıkmaya hazırlanırken, Natasha yaralı askerlerin şehirde bırakılacağını öğrenir. Annesini ikna eder ve aile, eşyalarını boşaltıp arabalarını yaralılara verir. Bu yaralılardan biri de, Natasha’nın bilmediği Andrey’dir.',
          'Yolculuk sırasında Natasha, Andrey’in kendi kafilelerinde olduğunu öğrenir. Gece gizlice onun yanına gider ve ondan af diler. Andrey ise artık kimseye kin duymamaktadır. Natasha’yı her zamankinden daha çok sevdiğini söyler. Natasha, onun yanından bir an bile ayrılmaz. Ama Andrey’in yarası ağırdır. Ölümü bir son değil, bir uyanış olarak görerek, huzur içinde hayata gözlerini yumar.',
          'Fransızlar boş Moskova’ya girdiğinde şehir alevler içinde kalır. Napoleon’u öldürmeye karar vererek şehirde kalan Pierre, yangınlar arasında bir çocuğu kurtarır ve bir kadını korumaya çalışırken Fransızlar tarafından yakalanır. Kundakçılıkla suçlanır ve gözlerinin önünde birkaç Rus esirin kurşuna dizildiğini görür. Kendisi son anda bağışlanır, ama bu korkunç deneyim onun dünyaya olan inancını tamamen sarsar.'
        ]
      },
      {
        title: 'Esaret ve Platon Karatayev',
        image: { svg: retreat, caption: 'Karlı Rus yollarında geri çekilen Fransız ordusu ve esirler.' },
        text: [
          'Esir kampında Pierre, Platon Karatayev adında yaşlı ve basit bir köylü askerle tanışır. Platon, okuma yazma bilmez, ama hayatı olduğu gibi kabul eden, her şeyi seven ve her olaydan bir anlam çıkaran bir bilgedir. Ona göre insan mutlu olmak için dünyayı değiştirmek zorunda değildir. Mutluluk, hayatın kendisinde, en basit anlarda saklıdır. Pierre, hayatı boyunca kitaplarda aradığı cevabı, bu yaşlı köylünün sessiz bilgeliğinde bulur.',
          'Ekim ayında Napoleon, yiyecek ve barınak bulamadığı Moskova’dan çekilmek zorunda kalır. Fransız ordusu, esirleriyle birlikte, Rus kışının amansız soğuğunda, aç ve perişan bir hâlde batıya doğru yürür. Yolda dermansız kalan esirler kurşuna dizilir. Bir gün Platon da hastalanır ve yolun kenarında vurulur.',
          'Pierre, sonunda Rus partizanlarının, aralarında Nikolay’ın küçük kardeşi Petya Rostov’un da bulunduğu bir baskınla kurtarılır. Ama genç ve cesur Petya bu baskında hayatını kaybeder. Tolstoy, Napoleon’un çöküşünü bir dâhinin yenilgisi olarak değil, tarihin büyük ve görünmez akışının bir sonucu olarak anlatır. Ona göre tarihi büyük adamlar değil, milyonlarca sıradan insanın küçük kararları yapar.'
        ]
      },
      {
        title: 'Barış',
        image: { svg: spring, caption: 'Yıllar sonra, kır malikânesinde yeniden kurulan aileler.' },
        text: [
          'Savaş bittiğinde Pierre, karısı Helene’in öldüğünü öğrenir. Moskova’ya döner ve Natasha ile yeniden karşılaşır. Natasha, Andrey’in ve kardeşi Petya’nın ölümünün acısıyla yaşlanmış, sessizleşmiştir. Ama Pierre’le konuştukça yüzünde yeniden o eski ışık belirmeye başlar. İkisi, yaşadıkları acıların ardından birbirlerinde huzuru ve yeniden yaşama gücünü bulurlar ve evlenirler.',
          'Nikolay Rostov ise babasının ölümüyle iflasın eşiğine gelen ailesini kurtarmak için çok çalışır. Andrey’in kız kardeşi, sessiz, dindar ve iyi kalpli Prenses Marya ile evlenir. Marya’nın sevgisi ve sabrı, Nikolay’ın sert huyunu yumuşatır. İki aile, kırsaldaki malikânede, çocuklarıyla birlikte huzurlu bir hayat kurar.',
          'Romanın sonunda, Pierre’in yeni fikirlerle dolu olduğunu, bir kez daha toplumu değiştirmek için gizli bir siyasi gruba katıldığını görürüz. Andrey’in oğlu küçük Nikolenka, onu hayranlıkla dinler ve babası gibi büyük bir insan olmayı hayal eder. Tolstoy, Savaş ve Barış’ı tarih felsefesine dair uzun bir sonsözle bitirir. Bu muazzam roman, savaşın yıkımı içinde bile sevginin, ailenin ve hayatın basit güzelliklerinin nasıl ayakta kalabileceğini anlatır.'
        ]
      }
    ]
  };
})();
