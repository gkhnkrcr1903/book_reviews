// Simyacı — Paulo Coelho (1988)
// Sahneler data/scenes.js yardımcılarıyla çizilir; ileride image.src ile gerçek çizimlerle değiştirilebilir.
(() => {
  const { svg, glow, skyline, figure, seated, streaks, dots } = window.Scene;

  const sheep = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}"><ellipse cx="0" cy="-14" rx="16" ry="10"/><ellipse cx="16" cy="-18" rx="6" ry="5"/><rect x="-10" y="-6" width="3" height="6"/><rect x="7" y="-6" width="3" height="6"/></g>`;
  const camel = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}"><path d="M-40 -30 Q-30 -60 -14 -40 Q0 -64 16 -40 Q24 -36 28 -40 L40 -64 L48 -60 L40 -36 Q36 -24 26 -24 V0 H20 V-20 H-28 V0 H-34 V-24 Q-44 -26 -40 -30 Z"/></g>`;
  const dunes = (y, c1, c2) => `<path d="M0 ${y} Q150 ${y - 50} 300 ${y - 10} T600 ${y - 20} T800 ${y - 10} V400 H0 Z" fill="${c1}"/><path d="M0 ${y + 50} Q200 ${y + 10} 400 ${y + 40} T800 ${y + 30} V400 H0 Z" fill="${c2}"/>`;

  // 1 — Endülüs’te harap kilise ve çınar ağacı
  const church = svg({
    sky: ['#0a0e20', '#1a2244', '#3a3a5a'],
    vignette: .55,
    body: id => `
      ${dots(311, 200, '#fff', 1.3, .9, 0, 220)}
      <path d="M0 270 Q400 240 800 270 V400 H0 Z" fill="#3a3a2a"/>
      <g transform="translate(400 280)" fill="#2a2420"><rect x="-120" y="-100" width="240" height="100"/><path d="M-130 -100 L-80 -140 L-40 -110 L0 -150 L40 -120 L60 -130 L130 -100 Z"/><rect x="-40" y="-70" width="40" height="70" fill="#0a0a14"/></g>
      <g transform="translate(420 260)"><rect x="-8" y="-150" width="16" height="150" fill="#1a1410"/><circle cx="-30" cy="-160" r="50" fill="#2a3a1a"/><circle cx="34" cy="-170" r="54" fill="#2a3a1a"/><circle cx="0" cy="-200" r="44" fill="#3a4a2a"/></g>
      ${Array.from({ length: 10 }, (_, i) => sheep(180 + (i % 5) * 34 + Math.floor(i / 5) * 280, 330 + (i % 2) * 10, 1.1, '#d8d0c0')).join('')}
      ${seated(330, 300, 1.4, '#0a0806')}`
  });

  // 2 — Tarifa’da yaşlı kral
  const king = svg({
    sky: ['#e8a860', '#f4c890', '#f8e0b8'],
    vignette: .4, grain: .14,
    body: id => `
      ${glow(id, 600, 160, 200, '#fff0c0', .7)}
      ${skyline({ y: 260, color: '#e8dcc4', seed: 321, lit: 0, minH: 50, maxH: 130 })}
      <rect y="260" width="800" height="140" fill="#c8a870"/>
      <rect x="300" y="300" width="200" height="12" fill="#5a3a24"/>
      ${seated(340, 300, 1.5, '#5a3a2a')}${seated(460, 300, 1.5, '#e8dcc4', true)}
      <g transform="translate(468 236)"><rect x="-14" y="-6" width="28" height="12" fill="#d9a83a"/>${glow(id, 468, 236, 30, '#ffd04a', .8)}<circle cx="-6" cy="0" r="4" fill="#fff"/><circle cx="6" cy="0" r="4" fill="#1a1a1a"/></g>`
  });

  // 3 — Tanca çarşısı
  const tangier = svg({
    sky: ['#c86a3a', '#e89a5a', '#f4c890'],
    vignette: .45, grain: .16,
    body: id => `
      ${skyline({ y: 260, color: '#a8805a', seed: 331, lit: 0, minH: 60, maxH: 160 })}
      <g fill="#8a5a3a"><rect x="560" y="80" width="30" height="180"/><path d="M552 80 h46 l-8 -20 h-30 z"/><circle cx="575" cy="52" r="8"/></g>
      <rect y="260" width="800" height="140" fill="#b88a5a"/>
      ${[100, 260, 420, 580].map((x, i) => `<path d="M${x - 60} 240 H${x + 60} L${x + 70} 270 H${x - 70} Z" fill="${['#a83a2a', '#2a6a8a', '#d8a83a', '#5a8a3a'][i]}" opacity=".85"/><rect x="${x - 56}" y="270" width="112" height="30" fill="#6a4a2a"/>${Array.from({ length: 6 }, (_, k) => `<circle cx="${x - 44 + k * 18}" cy="284" r="6" fill="${['#e8c83a', '#c83a2a', '#e8e0d0'][k % 3]}"/>`).join('')}`).join('')}
      ${Array.from({ length: 12 }, (_, i) => figure(40 + i * 64, 360 + (i % 2) * 8, 1.3, '#2a1a10', { hat: i % 3 === 0, dress: i % 4 === 1 })).join('')}`
  });

  // 4 — Kristal dükkânı
  const crystal = svg({
    sky: ['#1a2a3a', '#2a3a4a', '#1a2a3a'],
    vignette: .55,
    body: id => `
      ${glow(id, 400, 200, 260, '#c8f0ff', .35)}
      ${Array.from({ length: 4 }, (_, r) => `<rect x="80" y="${80 + r * 60}" width="640" height="8" fill="#5a4a3a"/>${Array.from({ length: 14 }, (_, c) => `<path d="M${100 + c * 44} ${80 + r * 60} q-10 -30 0 -40 h12 q10 10 0 40 z" fill="#c8ecf8" opacity="${.5 + ((r + c) % 3) * .15}"/>${(r + c) % 4 === 0 ? glow(id, 106 + c * 44, 60 + r * 60, 16, '#ffffff', .8) : ''}`).join('')}`).join('')}
      <rect y="320" width="800" height="80" fill="#2a2018"/>
      ${figure(300, 340, 1.6, '#5a3a2a')}${figure(500, 340, 1.6, '#e8dcc4', { hat: true })}
      <rect x="370" y="300" width="60" height="20" fill="#5a4a3a"/>`
  });

  // 5 — Kervan ve çöl
  const caravan = svg({
    sky: ['#e8a050', '#f4c07a', '#f8dca8'],
    vignette: .45, grain: .14,
    body: id => `
      ${glow(id, 400, 160, 280, '#fff0c0', .7)}<circle cx="400" cy="160" r="40" fill="#fff4d8"/>
      ${dunes(260, '#d89a50', '#c08038')}
      ${Array.from({ length: 9 }, (_, i) => `${camel(120 + i * 70, 300 - Math.sin(i / 2) * 6, 1, '#3a2010')}${figure(120 + i * 70, 254 - Math.sin(i / 2) * 6, .7, '#3a2010', { hat: i % 2 === 0 })}`).join('')}
      ${Array.from({ length: 12 }, (_, i) => `<path d="M${(i * 71) % 800} ${330 + (i % 4) * 14} q20 -6 40 0" stroke="#f4d098" stroke-width="2" fill="none" opacity=".6"/>`).join('')}`
  });

  // 6 — Vaha ve Fatima
  const oasis = svg({
    sky: ['#4a8ab0', '#9ac0d0', '#f0e4c0'],
    vignette: .4, grain: .12,
    body: id => `
      ${glow(id, 640, 80, 140, '#fff8d8', .7)}
      ${dunes(240, '#e0b070', '#d0a060')}
      <ellipse cx="400" cy="320" rx="180" ry="30" fill="#3a8ab0"/><ellipse cx="400" cy="316" rx="160" ry="20" fill="#5aaacc"/>
      ${Array.from({ length: 9 }, (_, i) => { const x = 180 + i * 56; return `<g transform="translate(${x} ${300 - (i % 2) * 12})" stroke="#2a5a2a" fill="none" stroke-linecap="round"><path d="M0 0 Q6 -60 0 -110" stroke="#5a4a2a" stroke-width="6"/>${[-60, -20, 20, 60].map(a => `<path d="M0 -110 q${a / 2} -14 ${a} 4" stroke-width="5"/>`).join('')}</g>`; }).join('')}
      ${figure(560, 340, 1.6, '#e8dcc4', { hat: true })}<g transform="translate(610 340) scale(1.6)"><path d="M-11 -48 Q0 -55 11 -48 L22 0 H-22 Z" fill="#2a3a6a"/><path d="M-13 -60 Q0 -72 13 -60 L16 -40 Q0 -34 -16 -40 Z" fill="#1a2a4a"/><circle cx="0" cy="-60" r="9" fill="#5a3a2a"/></g>
      <g transform="translate(640 300)"><path d="M-8 0 Q-12 -20 0 -24 Q12 -20 8 0 Z" fill="#8a5a3a"/></g>`
  });

  // 7 — Simyacı ve rüzgâra dönüşmek
  const alchemist = svg({
    sky: ['#3a1a10', '#8a4a20', '#e8904a'],
    vignette: .55,
    body: id => `
      ${glow(id, 400, 180, 300, '#ffd08a', .55)}
      ${Array.from({ length: 14 }, (_, i) => `<path d="M${i * 60} ${200 + (i % 3) * 30} Q${i * 60 + 80} ${150 + (i % 2) * 30} ${i * 60 + 160} ${210 + (i % 3) * 20}" stroke="#f4c88a" stroke-width="${2 + (i % 3)}" fill="none" opacity=".45"/>`).join('')}
      ${dunes(270, '#a8602a', '#8a4a1a')}
      <g transform="translate(260 330) scale(1.6)" fill="#0a0604"><path d="M-30 -40 Q-10 -50 20 -44 L34 -62 Q40 -70 46 -62 L44 -54 L38 -48 L30 -30 L28 0 H23 L22 -28 L-18 -28 L-20 0 H-25 L-27 -30 Q-36 -32 -40 -22 L-44 -24 Q-40 -38 -30 -40 Z"/></g>${figure(266, 266, 1.1, '#0a0604', { hat: true })}
      <g transform="translate(270 220)"><circle r="8" fill="#1a1a1a"/><path d="M0 -8 l-20 -16 M0 -8 l20 -16" stroke="#1a1a1a" stroke-width="3"/></g>
      ${figure(500, 350, 1.8, '#0a0604', {})}
      ${dots(341, 60, '#f4d098', 1.6, .6, 150, 330)}`
  });

  // 8 — Piramitler ve eve dönüş
  const pyramids = svg({
    sky: ['#2a1a3a', '#a85a4a', '#f4b06a'],
    vignette: .45,
    body: id => `
      ${glow(id, 600, 230, 220, '#fff0c0', .7)}<circle cx="600" cy="230" r="40" fill="#fff4d8"/>
      <polygon points="180,280 320,120 460,280" fill="#c8904a"/><polygon points="320,120 460,280 380,280" fill="#a8703a"/>
      <polygon points="420,280 520,170 620,280" fill="#b8803a"/><polygon points="520,170 620,280 560,280" fill="#986030"/>
      ${dunes(280, '#d8a060', '#c08848')}
      ${figure(300, 360, 1.7, '#2a1a10')}<path d="M310 350 q16 -10 28 4" stroke="#2a1a10" stroke-width="3" fill="none"/>
      ${Array.from({ length: 8 }, (_, i) => `<circle cx="${280 + i * 12}" cy="${370 + (i % 2) * 4}" r="2" fill="#d9a83a"/>`).join('')}
      ${dots(351, 50, '#fff', 1.2, .7, 0, 120)}`
  });

  window.SUMMARIES['simyaci'] = {
    pages: [
      {
        title: 'Tekrarlanan Bir Rüya',
        image: { svg: church, caption: 'Endülüs’te yıldızlı bir gece: harap bir kilisenin içinde büyüyen çınar ve uyuyan sürü.' },
        text: [
          'Paulo Coelho’nun romanı, İspanya’nın Endülüs bölgesinde yaşayan genç bir çobanın, Santiago’nun hikâyesidir. Santiago, ailesinin onu rahip yapma isteğine karşı çıkmış ve dünyayı gezebilmek için çoban olmayı seçmiştir. Koyunlarıyla birlikte Endülüs’ün kırlarında dolaşır, kitaplar okur ve kendini özgür hisseder. Bir gece, çatısı çökmüş eski bir kilisede, sunağın bulunduğu yerde büyüyen bir çınar ağacının altında uyur.',
          'O gece, daha önce de gördüğü aynı rüyayı tekrar görür. Rüyasında bir çocuk, onu elinden tutar ve Mısır piramitlerine götürür. Çocuk, ona piramitlerin dibinde gömülü bir hazine olduğunu söyler. Ama tam hazinenin yerini gösterecekken, Santiago uyanır. Bu rüya, onun aklından bir türlü çıkmaz.',
          'Santiago, bir sonraki kasabada rüyaları yorumlayan yaşlı bir çingene kadına gider. Kadın, ona rüyanın açık olduğunu, Mısır’a gidip piramitlerde hazinesini araması gerektiğini söyler. Karşılığında, bulacağı hazinenin onda birini ister. Santiago, bu yorumu saçma bulur ve büyük bir hayal kırıklığıyla kadının evinden ayrılır.'
        ]
      },
      {
        title: 'Yaşlı Kral',
        image: { svg: king, caption: 'Tarifa’da bir meydan: göğsünde altın bir zırhla yaşlı bir adam ve iki taş.' },
        text: [
          'Tarifa kasabasında bir bankta otururken, Santiago’nun yanına garip, yaşlı bir adam gelir. Adam, kendini Melkisedek, Salem Kralı olarak tanıtır. Santiago’nun geçmişini, ailesini ve rüyasını, ona anlatmadan bilir. Ona, her insanın hayatında gerçekleştirmesi gereken bir “kişisel efsane” olduğunu, yani asıl kaderinin, yüreğinin derinlerinde gerçekleştirmek istediği şey olduğunu anlatır.',
          'Yaşlı kral, ona romanın en ünlü fikrini söyler: Bir şeyi gerçekten istediğinde, bütün evren onu gerçekleştirmen için iş birliği yapar. Ama insanlar büyüdükçe, kişisel efsanelerini unutur, korkularına ve başkalarının beklentilerine boyun eğerler. Bir zamanlar her şeyin mümkün olduğuna inanan çocuklar, büyüyünce hayallerinden vazgeçer.',
          'Kral, Santiago’ya yolculuğu boyunca kendisine yol gösterecek iki küçük taş verir: Urim ve Tummim. Biri beyaz, biri siyahtır. Santiago, bir soruya cevap bulamadığında bu taşlara sorabilir. Karşılığında, koyunlarının onda birini ister. Santiago, uzun bir tereddütün ardından koyunlarını satar ve Afrika’ya, Tanca’ya gitmek üzere gemiye biner.'
        ]
      },
      {
        title: 'Tanca Çarşısı',
        image: { svg: tangier, caption: 'Tanca’nın kalabalık çarşısı, minareler ve rengârenk tezgâhlar.' },
        text: [
          'Santiago, Afrika kıtasının ilk durağı olan Tanca’ya varır. Burası, dilini bilmediği, geleneklerini tanımadığı ve kendini tamamen yabancı hissettiği bir şehirdir. Bir meyhanede, İspanyolca konuşan genç bir adamla tanışır. Adam, ona Mısır’a gitmesine yardım edebileceğini, ama bunun için paraya ihtiyaçları olduğunu söyler. Santiago, ona bütün parasını verir.',
          'Çarşıda dolaşırken, Santiago bir an bir kılıcın güzelliğine dalar. Döndüğünde, genç adamın ortadan kaybolduğunu görür. Bütün parasını çalmıştır. Santiago, yabancı bir şehirde, parasız ve yalnız kalmıştır. Bir gün önce, koyunları olan, gideceği yeri bilen bir çobandı. Şimdi ise hiçbir şeyi yoktur. Ağlamaya başlar.',
          'Ama Santiago, kendini toparlar. Dünyaya iki şekilde bakabileceğini fark eder. Ya kendini bir hırsızın kurbanı olarak görecek ya da hazinesini arayan bir maceracı olarak. İkinci yolu seçer. Cebindeki Urim ve Tummim taşlarını çıkarır ve onlara hâlâ yaşlı kralın desteğine sahip olup olmadığını sorar. Taşların cevabı olumludur. Santiago, yolculuğuna devam etmeye karar verir.'
        ]
      },
      {
        title: 'Kristal Tüccarı',
        image: { svg: crystal, caption: 'Tepenin üzerindeki küçük kristal dükkânı ve raflarda parlayan bardaklar.' },
        text: [
          'Santiago, bir tepenin üzerinde, kimsenin uğramadığı tozlu bir kristal dükkânına girer ve vitrini temizlemeyi teklif eder. Dükkânın sahibi olan yaşlı kristal tüccarı, onu işe alır. Santiago, dükkânın yenilenmesi için birçok fikir ortaya atar. Tepeye çıkan yorgun insanlara kristal bardaklarda çay satmaya başlar. Kısa sürede dükkân, bütün Tanca’nın uğrak yerlerinden biri olur.',
          'Kristal tüccarının bir hayali vardır: Bir gün Mekke’ye hacca gitmek. Ama hiçbir zaman gitmemiştir, çünkü hayalini gerçekleştirdiğinde yaşamak için başka bir sebebi kalmayacağından korkar. Santiago, onun bu korkusunu anlar, ama kendi hayalinden vazgeçmeye niyeti yoktur. Tüccar ona, her şeyin önceden yazıldığını anlatan bir Arapça kelimeyi öğretir: Mektub.',
          'Bir yıl sonra Santiago, koyunlarını yeniden almaya ve İspanya’ya dönmeye yetecek kadar para biriktirmiştir. Ama dükkândan çıkarken, Mısır’a gitmenin piramitlere bu kadar yakın olduğunu fark eder. Çobanlığa her zaman dönebileceğini, ama piramitleri görme fırsatının bir daha gelmeyebileceğini düşünür. Kişisel efsanesinin peşinden gitmeye karar verir ve çölü geçecek bir kervana katılır.'
        ]
      },
      {
        title: 'Kervan',
        image: { svg: caravan, caption: 'Sahra’nın sonsuz kumulları arasında ilerleyen deve kervanı.' },
        text: [
          'Santiago, kervanda Simya’yı öğrenmek için yolculuk yapan bir İngiliz’le tanışır. İngiliz, yıllarını kitaplarda simyanın sırlarını, yani kurşunu altına çevirmenin ve ölümsüzlük iksirini bulmanın yolunu arayarak geçirmiştir. Şimdi de çölün ortasındaki El Fayum vahasında yaşadığı söylenen, iki yüz yaşındaki büyük bir simyacıyı bulmaya gitmektedir.',
          'İngiliz, Santiago’ya kitaplarını okutur. Ama Santiago, kitaplardaki karmaşık formülleri ve sembolleri anlamakta zorlanır. Onun yerine, çölü dinlemeyi, rüzgârın sesini, develerin davranışlarını ve yıldızların konumunu gözlemlemeyi tercih eder. İngiliz ise, çölün sessizliğinden hiçbir şey öğrenemeyeceğini düşünür. Santiago, kitaplarda değil, dünyanın kendisinde, Coelho’nun deyişiyle “Dünyanın Ruhu”nda okumayı öğrenmeye başlar.',
          'Kervan, kabileler arasındaki savaşlar yüzünden tehlikeli bir yolculuk yapar. Geceleri ateş yakmak bile yasaklanır. Santiago, kervandaki deveciden, geçmişin ya da geleceğin değil, sadece şimdinin önemli olduğunu öğrenir. Aylar süren yolculuğun ardından kervan, büyük El Fayum vahasına ulaşır.'
        ]
      },
      {
        title: 'Vaha ve Fatima',
        image: { svg: oasis, caption: 'Hurma ağaçlarıyla çevrili vaha ve kuyunun başında buluşan iki genç.' },
        text: [
          'El Fayum vahası, yüzlerce hurma ağacı, kuyular ve çadırlarla dolu bir cennettir. Savaşlar nedeniyle kervan, vahada beklemek zorunda kalır. Santiago, İngiliz’e simyacıyı bulmasında yardım ederken, bir kuyunun başında su doldurmaya gelen genç bir kızla karşılaşır. Kızın adı Fatima’dır. Santiago, onu gördüğü an âşık olur. Bu, sözlere ihtiyaç duymayan, evrenin dili olan bir aşktır.',
          'Santiago, Fatima ile evlenmek ve vahada kalmak ister. Ama Fatima, onu kişisel efsanesinden vazgeçirmek istemez. Kendisinin bir çöl kadını olduğunu, çöl kadınlarının erkeklerinin yolculuğa çıkmasını beklemeyi bildiğini söyler. Santiago, hazinesini bulduktan sonra mutlaka dönmesini ister. Gerçek aşk, sevdiğini kendi yolundan alıkoymaz.',
          'Bir gün Santiago, çölde iki atmacanın birbirine saldırdığını görür ve bir anlığına, vahaya saldıran bir ordunun hayalini görür. Vaha liderlerine bunu anlattığında, başlangıçta ona inanmazlar. Ama ertesi gün gerçekten de silahlı bir ordu vahaya saldırır. Vahanın savaşçıları, Santiago’nun uyarısı sayesinde hazırlıklıdır ve saldırıyı püskürtürler. Santiago, vahanın danışmanı olur.'
        ]
      },
      {
        title: 'Simyacı',
        image: { svg: alchemist, caption: 'Kızıl bir çölde atlı bir simyacı, kolundaki atmaca ve rüzgârla konuşan bir çoban.' },
        text: [
          'Aynı gece, Santiago’nun karşısına siyahlar giymiş, atının üzerinde, kolunda bir atmaca taşıyan bir adam çıkar. Bu, büyük simyacıdır. İngiliz’in yıllardır aradığı adam, Santiago’yu aramaktadır. Simyacı, Santiago’ya kişisel efsanesini gerçekleştirmesi için yardım edeceğini ve onu piramitlere kadar götüreceğini söyler.',
          'Simyacı, Santiago’ya yolculuk boyunca çok şey öğretir. Ona yüreğini dinlemesini söyler, çünkü yüreği, hazinesinin olduğu yeri bilir. Korkunun, insanın hayallerinin peşinden gitmesini engelleyen en büyük düşman olduğunu anlatır. Ona göre insan, kendi hazinesini aramaktan vazgeçmezse, bütün evren ona yardım eder. Başarısızlık korkusu ise, başarısızlığın kendisinden çok daha büyük bir engeldir.',
          'Yolculuk sırasında savaşan bir kabilenin askerleri onları yakalar. Simyacı, askerlere Santiago’nun kendini rüzgâra dönüştürebileceğini söyler ve bunu kanıtlamak için üç gün süre ister. Santiago, üç gün boyunca çölle, rüzgârla, güneşle ve sonunda bütün evrenin dilini yazan elle konuşur. Üçüncü gün, büyük bir kum fırtınası çıkar ve Santiago, kampın öbür ucunda belirir. Askerler onları serbest bırakır. Simyacı, onu manastırda kurşunu altına çevirerek ödüllendirir ve yolun geri kalanını tek başına gitmesi için onu yalnız bırakır.'
        ]
      },
      {
        title: 'Hazine',
        image: { svg: pyramids, caption: 'Gün batımında Mısır piramitleri ve kumları kazan genç bir çoban.' },
        text: [
          'Santiago, sonunda Mısır piramitlerine ulaşır. Piramitleri gördüğü anda gözyaşlarına boğulur. Bir kum tepesinin üzerinde ağladığı yerde gözyaşlarının düştüğü noktayı kazmaya başlar. Ama saatlerce kazmasına rağmen hiçbir şey bulamaz. Tam o sırada, savaştan kaçan birkaç mülteci onu yakalar, parasını alır ve hazine aradığını öğrenince onu döverler.',
          'Santiago, artık dayanamaz ve rüyasını anlatır. Haydutların lideri ona güler. Kendisinin de iki yıl önce aynı yerde bir rüya gördüğünü söyler. Rüyasında, İspanya’da, harap bir kilisenin içinde, sunağın bulunduğu yerde büyüyen bir çınar ağacının altında bir hazine olduğunu görmüştür. Ama bir rüya yüzünden çölü geçecek kadar aptal olmadığını söyleyerek Santiago’yu orada bırakır.',
          'Santiago, bu sözleri duyduğunda gülmeye başlar. Hazinesinin, yolculuğunun başladığı yerde, eski kilisedeki çınar ağacının altında olduğunu anlamıştır. İspanya’ya döner, ağacın altını kazar ve altın paralar ve mücevherlerle dolu bir sandık bulur. Ama asıl hazinesinin, yolculuk boyunca öğrendikleri olduğunu bilir. Rüzgârın getirdiği Fatima’nın kokusunu hisseder ve ona döneceğini fısıldar. Simyacı, hayallerin peşinden gitmenin, yolculuğun kendisinin bir hazine olduğunu anlatan, dünyada milyonlarca okura ilham veren bir masaldır.'
        ]
      }
    ]
  };
})();
