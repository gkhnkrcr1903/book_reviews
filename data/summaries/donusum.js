// Dönüşüm — Franz Kafka (1915)
// Sahneler data/scenes.js yardımcılarıyla çizilir; ileride image.src ile gerçek çizimlerle değiştirilebilir.
(() => {
  const { svg, glow, skyline, figure, seated, streaks, dots } = window.Scene;

  // Dev böcek: sırtüstü ya da yüzüstü
  const bug = (x, y, s, c, back = false) => `<g transform="translate(${x} ${y}) scale(${s})">
    <ellipse cx="0" cy="0" rx="70" ry="${back ? 34 : 28}" fill="${c}"/>
    ${[-40, -14, 12, 38].map(dx => `<path d="M${dx} ${back ? -24 : 20} q${back ? -8 : 6} ${back ? -26 : 20} ${back ? -20 : 14} ${back ? -34 : 26}" stroke="${c}" stroke-width="4" fill="none"/>`).join('')}
    ${[-40, -14, 12, 38].map(dx => `<line x1="${dx}" y1="${back ? 30 : -24}" x2="${dx}" y2="${back ? 34 : -28}" stroke="#000" stroke-width="2" opacity=".4"/>`).join('')}
    ${Array.from({ length: 5 }, (_, k) => `<path d="M${-56 + k * 26} ${back ? 10 : -10} q13 ${back ? 10 : -10} 26 0" stroke="#000" stroke-width="2" fill="none" opacity=".35"/>`).join('')}
    <ellipse cx="74" cy="${back ? -2 : 0}" rx="16" ry="14" fill="${c}"/><path d="M84 -10 q20 -20 30 -10 M84 8 q20 20 30 10" stroke="${c}" stroke-width="2.5" fill="none"/></g>`;
  const room = (id, wall = '#5a5448', floor = '#3a342c') => `
    <polygon points="0,0 160,70 160,320 0,400" fill="${wall}" opacity=".85"/><polygon points="800,0 640,70 640,320 800,400" fill="${wall}" opacity=".85"/>
    <polygon points="160,320 640,320 800,400 0,400" fill="${floor}"/><rect x="160" y="70" width="480" height="250" fill="${wall}"/>`;

  // 1 — Uyanış
  const waking = svg({
    sky: ['#4a463c', '#5a5448', '#3a342c'],
    vignette: .7, grain: .22,
    body: id => `
      ${room(id)}
      <rect x="470" y="110" width="120" height="140" fill="#8a9aa8" opacity=".6"/>${streaks(2, 60, '#c8d0d8', 20, -4, .5).replace(/x1="(\d+)"/g, (m, v) => `x1="${470 + (+v % 120)}"`).replace(/x2="(-?\d+)"/g, (m, v) => `x2="${466 + (Math.abs(+v) % 120)}"`).replace(/y1="(\d+)"/g, (m, v) => `y1="${110 + (+v % 120)}"`).replace(/y2="(\d+)"/g, (m, v) => `y2="${130 + (+v % 120)}"`)}
      <rect x="230" y="110" width="110" height="80" fill="#6a5a4a"/><rect x="240" y="120" width="90" height="60" fill="#c8b8a0"/>
      <path d="M190 270 H560 V300 H190 Z" fill="#c8c0b0"/><rect x="186" y="300" width="10" height="20" fill="#2a2420"/><rect x="552" y="300" width="10" height="20" fill="#2a2420"/>
      ${bug(370, 254, 1.4, '#3a2a14', true)}`
  });

  // 2 — Kapıdaki müdür ve ailenin dehşeti
  const door = svg({
    sky: ['#3a3630', '#4a443a', '#2a2620'],
    vignette: .7, grain: .22,
    body: id => `
      ${room(id, '#6a6454', '#4a443a')}
      <rect x="320" y="90" width="160" height="230" fill="#2a2420"/><rect x="330" y="100" width="140" height="220" fill="#d8c8a0" opacity=".9"/>${glow(id, 400, 210, 160, '#ffe0a0', .4)}
      ${figure(360, 320, 2, '#1a1a1a', { hat: true })}${figure(430, 320, 1.8, '#3a2a3a', { dress: true })}
      <g transform="translate(400 330) scale(1.1)">${bug(0, 0, 1, '#3a2a14')}</g>`
  });

  // 3 — Grete ve süt kâsesi
  const grete = svg({
    sky: ['#3a342a', '#4a4236', '#2a241c'],
    vignette: .7, grain: .22,
    body: id => `
      ${room(id, '#5a5040', '#3a3226')}
      <path d="M200 330 H520 V340 H200 Z" fill="#2a2018"/>
      <rect x="180" y="250" width="200" height="70" fill="#2a2018"/><rect x="190" y="320" width="180" height="0"/>
      ${bug(280, 306, .9, '#3a2a14')}
      <g transform="translate(520 330)"><ellipse rx="28" ry="8" fill="#e8e0d0"/><ellipse cy="-4" rx="22" ry="5" fill="#fff"/></g>
      ${Array.from({ length: 5 }, (_, i) => `<rect x="${560 + i * 18}" y="${326 - (i % 2) * 4}" width="12" height="6" fill="#8a6a3a"/>`).join('')}
      ${figure(640, 330, 1.7, '#5a4a6a', { dress: true, shawl: '#c8b8a8' })}`
  });

  // 4 — Duvarlarda gezinti ve resim
  const walls = svg({
    sky: ['#2a2620', '#3a342a', '#2a2620'],
    vignette: .7, grain: .22,
    body: id => `
      ${room(id, '#4a443a', '#2a241c')}
      <rect x="380" y="110" width="110" height="140" fill="#6a5a3a"/><rect x="390" y="120" width="90" height="120" fill="#c8a888"/>
      <g transform="translate(435 180)"><circle cy="-30" r="12" fill="#5a3a2a"/><path d="M-20 30 Q-20 -14 0 -16 Q20 -14 20 30 Z" fill="#8a5a3a"/></g>
      <g transform="translate(440 190) rotate(90)">${bug(0, 0, .9, '#3a2a14')}</g>
      ${Array.from({ length: 12 }, (_, i) => `<path d="M${200 + i * 30} ${120 + (i % 3) * 40} q10 6 20 0" stroke="#2a2018" stroke-width="2" fill="none" opacity=".5"/>`).join('')}`
  });

  // 5 — Babanın fırlattığı elmalar
  const apples = svg({
    sky: ['#3a2a20', '#4a3626', '#2a1e14'],
    vignette: .7, grain: .2,
    body: id => `
      ${room(id, '#5a4434', '#3a2a1e')}
      ${glow(id, 400, 200, 200, '#ffc070', .3)}
      ${figure(600, 330, 2.1, '#1a2a4a', { hat: true })}
      ${bug(330, 320, 1.1, '#3a2a14')}
      <circle cx="350" cy="296" r="9" fill="#a82a1a"/>
      ${[[420, 250], [470, 210], [520, 270], [380, 340], [270, 350]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="8" fill="#c83a2a"/><line x1="${x}" y1="${y - 8}" x2="${x + 2}" y2="${y - 13}" stroke="#3a2a14" stroke-width="2"/>`).join('')}`
  });

  // 6 — Kiracılar ve keman
  const violin = svg({
    sky: ['#2a2018', '#3a2c20', '#2a2018'],
    vignette: .65,
    body: id => `
      ${glow(id, 400, 160, 260, '#ffd090', .45)}
      <path d="M200 240 H600 L620 260 H180 Z" fill="#4a3020"/>
      ${seated(260, 242, 1.5, '#0a0a0a')}${seated(400, 242, 1.5, '#0a0a0a')}${seated(540, 242, 1.5, '#0a0a0a', true)}
      ${figure(680, 330, 1.7, '#5a4a6a', { dress: true })}<path d="M690 230 l40 -30 M688 238 l46 -14" stroke="#6a3a1a" stroke-width="4"/>
      <rect x="0" y="300" width="800" height="100" fill="#1a120a"/>
      <g transform="translate(110 360)">${bug(0, 0, .8, '#2a1e0e')}</g>
      ${Array.from({ length: 6 }, (_, i) => `<path d="M${640 - i * 70} ${180 - (i % 2) * 20} q8 -10 16 0" stroke="#ffe0a0" stroke-width="2" fill="none" opacity=".7"/>`).join('')}`
  });

  // 7 — Son: karanlık oda, solan böcek
  const end = svg({
    sky: ['#14120e', '#1e1a14', '#14120e'],
    vignette: .85, grain: .25,
    body: id => `
      ${room(id, '#2a2620', '#1a1612')}
      <rect x="470" y="110" width="120" height="140" fill="#6a7a8a" opacity=".55"/>${glow(id, 530, 180, 120, '#c8d8e8', .3)}
      <polygon points="470,110 590,110 520,400 300,400" fill="#c8d8e8" opacity=".06"/>
      ${Array.from({ length: 30 }, (_, i) => `<rect x="${170 + (i * 47) % 440}" y="${330 + (i * 13) % 60}" width="${10 + (i % 3) * 6}" height="5" fill="#3a3226" opacity=".7"/>`).join('')}
      <g opacity=".75">${bug(380, 350, .9, '#2a2216', true)}</g>`
  });

  // 8 — Tramvayla kırlara gezi
  const tram = svg({
    sky: ['#9ac0e0', '#cfe0ec', '#f4f0e0'],
    vignette: .3, grain: .1,
    body: id => `
      ${glow(id, 640, 100, 180, '#fff8d8', .8)}
      <path d="M0 250 Q400 220 800 250 V400 H0 Z" fill="#9ac07a"/>
      ${Array.from({ length: 7 }, (_, i) => `<g transform="translate(${50 + i * 120} 250)"><rect x="-4" y="-56" width="8" height="56" fill="#5a4a3a"/><circle cy="-74" r="${26 + (i % 3) * 5}" fill="#7aa85a"/></g>`).join('')}
      <line x1="0" y1="130" x2="800" y2="130" stroke="#3a3a3a" stroke-width="2"/>
      <g transform="translate(400 320)"><rect x="-180" y="-120" width="360" height="110" rx="12" fill="#d8b84a"/><rect x="-180" y="-60" width="360" height="12" fill="#a83a2a"/>
        ${Array.from({ length: 6 }, (_, k) => `<rect x="${-164 + k * 56}" y="-108" width="44" height="40" fill="#e8f0f8" opacity=".85"/>`).join('')}
        <circle cx="-120" cy="-6" r="14" fill="#2a2a2a"/><circle cx="120" cy="-6" r="14" fill="#2a2a2a"/><line x1="0" y1="-120" x2="20" y2="-190" stroke="#3a3a3a" stroke-width="3"/></g>
      ${figure(-0 + 300, 260, .85, '#3a3a5a', { hat: true })}${figure(356, 260, .85, '#5a3a4a', { dress: true })}${figure(412, 260, .85, '#e8b8a8', { dress: true })}`
  });

  window.SUMMARIES['donusum'] = {
    pages: [
      {
        title: 'Bir Sabah',
        image: { svg: waking, caption: 'Prag’da küçük bir oda, pencereye vuran yağmur ve yatakta sırtüstü yatan dev bir böcek.' },
        text: [
          'Franz Kafka’nın kısa romanı, edebiyat tarihinin en çarpıcı açılışlarından biriyle başlar. Gezici bir kumaş pazarlamacısı olan Gregor Samsa, bir sabah huzursuz rüyalardan uyandığında, kendini yatağında dev bir böceğe dönüşmüş olarak bulur. Sırtüstü yatmaktadır. Sırtı zırh gibi sertleşmiş, karnı kahverengi ve kubbe şeklinde kabarmıştır. Gövdesine kıyasla acınacak kadar ince olan sayısız bacağı, gözlerinin önünde çaresizce kıpırdamaktadır.',
          'Ama Gregor’un aklına ilk gelen şey, bu korkunç dönüşüm değildir. Asıl düşündüğü şey işe geç kalmaktır. Saat çoktan altıyı geçmiştir ve beşteki treni kaçırmıştır. Gregor, sevmediği bu işte yıllardır yalnızca ailesinin borçlarını ödemek için çalışmaktadır. Her gün erken kalkmak, trenleri yakalamak, kötü yemekler yemek ve hiçbir zaman gerçek bir dostluğa dönüşmeyen insan ilişkilerine katlanmak zorundadır.',
          'Kafka, bu absürt durumu sanki son derece sıradan bir olaymış gibi, sakin ve gerçekçi bir dille anlatır. Gregor’un neden böceğe dönüştüğü hiçbir zaman açıklanmaz. Bu dönüşüm, okura modern insanın yalnızlığını, işine ve ailesine karşı hissettiği ağır yükü ve kendi bedenine bile yabancılaşmasını anlatan güçlü bir simge olarak sunulur.'
        ]
      },
      {
        title: 'Kapının Ardında',
        image: { svg: door, caption: 'Kapı açıldığında dehşetle geri çekilen şef ve bayılmak üzere olan anne.' },
        text: [
          'Gregor’un ailesi, yani annesi, babası ve on yedi yaşındaki kız kardeşi Grete, oğullarının hâlâ odasından çıkmadığını fark ederek kapıyı çalmaya başlar. Gregor onlara cevap vermeye çalışır, ama sesinin değiştiğini, ağzından insan sesine benzemeyen tuhaf bir cıyaklamanın çıktığını fark eder. Bu sırada, işyerindeki şefi, Gregor’un neden işe gelmediğini öğrenmek için bizzat eve gelir.',
          'Şef, kapının dışından Gregor’u tembellikle ve hatta parayı zimmetine geçirmekle suçlamaya başlar. Gregor, büyük bir çabayla yataktan kendini yere atar ve çenesiyle anahtarı çevirerek kapıyı açmayı başarır. İşini kaybetmemek için şefe açıklama yapmak ister. Ama kapı açıldığında, şef onu görünce dehşet içinde geri geri çekilir ve kaçarcasına evden çıkar. Annesi bayılır.',
          'Gregor, şefin peşinden gitmeye çalışırken, babası elinde bir baston ve bir gazeteyle, onu tıslayarak odasına geri sürer. Gregor, kapıdan geçmeye çalışırken yan tarafından yaralanır. Babası onu arkasından iterek odaya sokar ve kapıyı sertçe kapatır. O andan itibaren, ailesini yıllardır geçindiren Gregor, kendi evinde bir yük ve bir utanç kaynağına dönüşür.'
        ]
      },
      {
        title: 'Grete',
        image: { svg: grete, caption: 'Kanepenin altına saklanan Gregor ve ona yiyecek getiren kız kardeşi.' },
        text: [
          'İlk günlerde Gregor’la ilgilenen tek kişi kız kardeşi Grete’dir. Gregor, kız kardeşini çok sever. Hatta onun çok sevdiği keman eğitimi için, Noel’de ailesine sürpriz yaparak onu konservatuvara göndermeyi planlamıştır. Grete, Gregor’un odasına her gün yiyecek getirir. Önce sevdiği yiyecekleri, yani süt ve ekmek getirir, ama Gregor artık bunlardan hoşlanmaz. Bunun yerine bayat peynir, çürümüş sebzeler ve artık yemekler yemeye başlar.',
          'Gregor, ailesini korkutmamak için, kız kardeşi odaya girdiğinde kanepenin altına saklanır. Hatta onu görmemesi için kanepenin üzerine bir çarşaf örter. Bütün gününü, kapının arkasından ailesinin konuşmalarını dinleyerek geçirir. Bu konuşmalardan, babasının aslında beş yıl önceki iflasından kalan bir miktar parayı gizlice biriktirdiğini öğrenir. Yani yıllarca çalışarak ödediği borçların bir kısmını aslında ödemek zorunda değilmiş. Ama Gregor buna öfkelenmez, sadece ailesinin geleceğini düşünür.',
          'Aile artık para kazanmak zorundadır. Yıllardır emekli gibi yaşayan baba, bir bankada odacı olarak işe başlar ve gece gündüz üniformasını çıkarmaz. Annesi dikiş işleri yapar. Grete ise bir tezgâhtar olarak çalışmaya başlar ve akşamları stenografi ve Fransızca öğrenir. Gregor, ailesinin onun yokluğunda nasıl değiştiğini, güçlendiğini ve kendisine giderek daha az ihtiyaç duyduğunu acıyla izler.'
        ]
      },
      {
        title: 'Duvardaki Resim',
        image: { svg: walls, caption: 'Kürklü kadın resminin üzerine yapışarak onu korumaya çalışan Gregor.' },
        text: [
          'Gregor, zamanla yeni bedenine alışır. Duvarlarda ve tavanda dolaşmaktan, tavandan sarkarak sallanmaktan zevk almaya başlar. Grete, onun daha rahat hareket edebilmesi için odasındaki mobilyaları dışarı çıkarmaya karar verir. Annesini de yardım için çağırır. Ama anne, odanın boşaltılmasının, Gregor’un bir gün insan olarak geri dönme umudunu yok etmek anlamına geleceğinden endişe eder.',
          'Gregor, kadınlar mobilyaları taşırken, kendi geçmişinin, insan olarak yaşadığı hayatın da onlarla birlikte gittiğini hisseder. Masası, çalışma çekmecesi ve dolabı birer birer odadan çıkarılırken, son bir şeyi kurtarmak için duvara tırmanır. Duvarda, bir dergiden kesip kendi yaptığı bir çerçeveye koyduğu, kürk şapkalı ve kürk şallı bir kadının resmi vardır. Gregor, bu resmin camına yapışır ve onu bırakmaz.',
          'Annesi, odaya girip duvardaki resmin üzerindeki o dev kahverengi lekeyi görünce bayılır. Grete, annesini ayıltmak için bir ilaç şişesi getirmeye gider. Gregor da yardım etmek isteyerek onun arkasından gider, ama Grete ona dönünce şişeyi düşürür ve şişenin bir parçası Gregor’un yüzünü keser. Kafka, bu sahnede Gregor’un insan olarak son kalıntılarına tutunma çabasını ve ailesiyle arasındaki iletişimin artık tamamen kopmuş olduğunu gösterir.'
        ]
      },
      {
        title: 'Elma',
        image: { svg: apples, caption: 'Odacı üniformalı babanın oğluna fırlattığı elmalar.' },
        text: [
          'Tam o sırada baba eve döner. Grete, annesinin bayıldığını ve Gregor’un odasından çıktığını söyler. Baba, Gregor’un anneye zarar verdiğini düşünerek büyük bir öfkeye kapılır. Gregor, babasından korkarak oda oda kaçar. Ama baba, masanın üzerindeki meyve kâsesinden aldığı elmaları ona fırlatmaya başlar.',
          'Elmalardan biri, Gregor’un sırtına saplanır ve orada kalır. Gregor, korkunç bir acıyla yerde kıvranır. Annesi, babasının kollarına atılır ve ondan Gregor’un hayatını bağışlamasını ister. Bu yaradan sonra Gregor, bir ay boyunca acılar içinde yatar. Kimse sırtındaki elmayı çıkarmaya cesaret edemez ve elma orada çürür.',
          'Bu yara, Gregor’un hareket yeteneğini büyük ölçüde azaltır. Odasında bir yaşlı gibi ağır ağır dolaşabilir. Ama ailesi, onun bu hâline biraz acımaya başlar. Akşamları, oturma odasına açılan kapıyı aralık bırakırlar ve Gregor, karanlık odasından ailesinin akşam sohbetlerini izleyebilir. Ama aile artık eskisinden çok daha yorgun, sessiz ve mutsuzdur.'
        ]
      },
      {
        title: 'Keman',
        image: { svg: violin, caption: 'Oturma odasında keman çalan Grete ve karanlıktan sürünerek gelen Gregor.' },
        text: [
          'Ailenin geliri yetmediği için, evin bir odası üç kiracıya kiralanır. Kiracılar sakallı, ciddi ve son derece titiz adamlardır. Aile onlara karşı çok saygılı davranır, en iyi yemekleri onlara verir ve kendi aralarında sessizce mutfakta yemek yerler. Gregor’un odası ise artık evin bütün eski ve kullanılmayan eşyalarının atıldığı bir depoya dönüşmüştür. Hizmetçi kadın, onu “yaşlı bok böceği” diye çağırır ve hiç korkmaz.',
          'Bir akşam Grete, kiracılar için oturma odasında keman çalar. Gregor, kız kardeşinin çaldığı müziğin büyüsüne kapılır ve kendini tutamayarak, toza ve kire bulanmış bir hâlde, sürünerek oturma odasına girer. Müziğin, uzun zamandır özlediği bilinmeyen bir besin gibi olduğunu düşünür. Kız kardeşini odasına götürüp ona sadece kendisi için keman çalmasını istemeyi hayal eder.',
          'Ama kiracılar, Gregor’u görünce büyük bir öfkeyle, bu evdeki iğrenç durum yüzünden hiçbir kira ödemeyeceklerini ve hatta tazminat isteyeceklerini söylerler. Grete ise artık dayanamaz. Ağlayarak ailesine bu yaratıktan kurtulmaları gerektiğini söyler. Ona göre bu böcek artık Gregor değildir, çünkü Gregor olsaydı ailesini bu kadar üzmemek için kendi isteğiyle çekip giderdi.'
        ]
      },
      {
        title: 'Son',
        image: { svg: end, caption: 'Karanlık ve tozlu odada, pencereden süzülen ilk sabah ışığı.' },
        text: [
          'Gregor, kız kardeşinin sözlerini duyar ve büyük bir zorlukla odasına geri döner. Arkasından kapı hemen kapatılır ve kilitlenir. Gregor, karanlıkta hareket edemez hâlde yatar. Sırtındaki çürük elma ve etrafındaki toz, artık fark etmeyeceği kadar uzak gelir. Ailesini sevgiyle ve şefkatle düşünür. Ortadan kaybolması gerektiğine dair inancı, kız kardeşininkinden bile daha kesindir.',
          'Kilise saati sabahın üçünü vurduğunda, pencerenin dışında her şeyin aydınlanmaya başladığını görür. Ardından başı kendiliğinden yere düşer ve son nefesi burnundan zayıfça çıkar. Ertesi sabah hizmetçi kadın, onun öldüğünü fark eder ve bir süpürgeyle onu bir kenara iter. Aile, Gregor’un ölü bedenine bakarken, bir an hüzünlenir. Baba, “Tanrı’ya şükür” der.',
          'Hizmetçi, Gregor’un cesedini attığını söyler. Aile, kiracıları evden kovar. Kafka, Gregor’un ölümünü bir trajedi gibi değil, ailenin hayatındaki büyük bir sorunun sessizce ortadan kalkması gibi anlatır. Bu soğukluk, romanın en ürpertici yanlarından biridir.'
        ]
      },
      {
        title: 'Yeni Bir Başlangıç',
        image: { svg: tram, caption: 'Bahar güneşinde kırlara giden bir tramvay ve içinde geleceğe bakan bir aile.' },
        text: [
          'Gregor’un ölümünden sonra aile, uzun zamandır ilk kez işlerinden izin alır ve birlikte kırlara bir tramvay gezisine çıkar. Bahar güneşi tramvayın camlarından içeri dolar. Anne ve baba, gelecekleri hakkında konuşurlar. Üçünün işlerinin aslında hiç de kötü olmadığını, daha küçük ve daha ucuz bir eve taşınarak çok daha rahat yaşayabileceklerini fark ederler.',
          'Konuşurken, anne ve baba, kızları Grete’nin son zamanlarda ne kadar güzelleştiğini ve olgunlaştığını görürler. Yaşadığı bütün zorluklara rağmen, Grete artık güzel ve hayat dolu bir genç kadın olmuştur. İkisi de, birbirlerine bakmadan, Grete için iyi bir koca bulmanın zamanının geldiğini düşünür. Yolculuğun sonunda Grete ayağa kalkar ve gençliğiyle dolu bedenini gerer.',
          'Dönüşüm, bu umut dolu ve aynı zamanda son derece ironik sahneyle biter. Gregor, ailesi için kendini feda etmiştir, ama onun ortadan kalkması aileyi özgürleştirmiştir. Kafka, bu kısa ama derin romanda, insanın değerinin yalnızca işe yararlığıyla ölçüldüğü bir dünyada, sevginin bile ne kadar kırılgan olabileceğini, yabancılaşmanın ve yalnızlığın insanı nasıl bir “böceğe” dönüştürebileceğini anlatır. Bu eser, modern edebiyatın en çok yorumlanan ve en etkileyici metinlerinden biridir.'
        ]
      }
    ]
  };
})();
