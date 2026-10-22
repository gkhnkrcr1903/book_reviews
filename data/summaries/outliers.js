// Outliers (Çizginin Dışındakiler) — Malcolm Gladwell (2008)
// Sahneler data/scenes.js yardımcılarıyla çizilir; ileride image.src ile gerçek çizimlerle değiştirilebilir.
(() => {
  const { svg, glow, skyline, figure, seated, streaks, dots } = window.Scene;

  // Basit çubuk grafik
  const bars = (x, y, vals, w, color, max) => vals.map((v, i) => `<rect x="${x + i * (w + 6)}" y="${y - v / max * 140}" width="${w}" height="${v / max * 140}" fill="${color}" opacity="${.55 + i / vals.length * .45}"/>`).join('');

  // 1 — Roseto: İtalyan kasabası ve uzun ömür
  const roseto = svg({
    sky: ['#8ab0d0', '#c8d8e0', '#f4e4c8'],
    vignette: .35, grain: .12,
    body: id => `
      ${glow(id, 600, 140, 180, '#fff4d8', .6)}
      <path d="M0 260 Q200 200 400 240 T800 220 V400 H0 Z" fill="#8a9a5a"/>
      ${[[150, 240], [230, 230], [310, 236], [480, 226], [560, 232], [640, 222]].map(([x, y], i) => `<g transform="translate(${x} ${y})"><rect x="-30" y="-40" width="60" height="40" fill="${['#e8d0a8', '#d8b888', '#f0dcb8'][i % 3]}"/><polygon points="-36,-40 0,-62 36,-40" fill="#a8543a"/><rect x="-6" y="-20" width="12" height="20" fill="#5a3a2a"/></g>`).join('')}
      <g transform="translate(400 230)"><rect x="-20" y="-90" width="40" height="90" fill="#e8dcc4"/><polygon points="-24,-90 0,-120 24,-90" fill="#a8543a"/><rect x="-4" y="-116" width="8" height="12" fill="#5a3a2a"/></g>
      <path d="M200 330 H600 L620 345 H180 Z" fill="#7a5a3a"/>
      ${[230, 290, 350, 450, 510, 570].map((x, i) => seated(x, 332, 1.2, '#3a2a1a', i > 2)).join('')}
      ${Array.from({ length: 6 }, (_, i) => `<circle cx="${260 + i * 56}" cy="322" r="5" fill="#a83a2a"/>`).join('')}`
  });

  // 2 — Kanada hokeyi ve doğum ayları
  const hockey = svg({
    sky: ['#0e1a2e', '#1c2e48', '#2a3e5a'],
    vignette: .5,
    body: id => `
      ${glow(id, 400, 60, 300, '#e8f0ff', .4)}
      <ellipse cx="400" cy="320" rx="420" ry="110" fill="#d8e8f4"/>
      <ellipse cx="400" cy="320" rx="380" ry="90" fill="none" stroke="#a83a3a" stroke-width="3" opacity=".5"/>
      <line x1="400" y1="232" x2="400" y2="408" stroke="#3a6ab8" stroke-width="4" opacity=".6"/>
      ${bars(80, 200, [14, 12, 11, 9, 8, 7, 6, 5, 4, 3, 2, 2], 22, '#e8c070', 14)}
      ${['O', 'Ş', 'M', 'N', 'M', 'H', 'T', 'A', 'E', 'E', 'K', 'A'].map((m, i) => `<text x="${91 + i * 28}" y="218" fill="#c8d8e8" font-family="Inter,sans-serif" font-size="11" text-anchor="middle">${m}</text>`).join('')}
      ${[300, 420, 520].map((x, i) => `<g transform="translate(${x} ${330 + (i % 2) * 10})">${figure(0, 0, 1.6, '#1a2a4a', { hat: false })}<line x1="8" y1="-30" x2="30" y2="2" stroke="#3a2a1a" stroke-width="3"/></g>`).join('')}`
  });

  // 3 — 10.000 saat: Hamburg kulübü ve bilgisayar odası
  const tenThousand = svg({
    sky: ['#14081e', '#24102e', '#14081e'],
    vignette: .65,
    body: id => `
      <rect x="0" y="0" width="400" height="400" fill="#1a0a24"/>
      ${[100, 200, 300].map(x => `<polygon points="${x - 8},0 ${x + 8},0 ${x + 60},260 ${x - 60},260" fill="#ffd04a" opacity=".1"/>`).join('')}
      <rect x="40" y="260" width="320" height="16" fill="#2a1430"/>
      ${[100, 170, 240, 310].map((x, i) => figure(x, 260, 1.4, '#000')).join('')}
      <rect x="400" y="0" width="400" height="400" fill="#0a141e"/>
      <rect x="480" y="120" width="140" height="120" rx="6" fill="#1a2a3a"/><rect x="490" y="130" width="120" height="90" fill="#3ad870" opacity=".3"/>
      ${Array.from({ length: 6 }, (_, i) => `<rect x="500" y="${140 + i * 12}" width="${40 + (i * 23) % 60}" height="4" fill="#3ad870" opacity=".8"/>`).join('')}
      <path d="M460 260 H660 L680 280 H440 Z" fill="#2a3a4a"/>
      ${seated(560, 262, 1.5, '#000')}
      <g transform="translate(700 80)"><circle r="40" fill="none" stroke="#c8d8e8" stroke-width="3"/><line x1="0" y1="0" x2="0" y2="-30" stroke="#c8d8e8" stroke-width="3"/><line x1="0" y1="0" x2="22" y2="8" stroke="#c8d8e8" stroke-width="3"/></g>
      <line x1="400" y1="0" x2="400" y2="400" stroke="#000" stroke-width="3"/>`
  });

  // 4 — Dâhilerin sorunu: iki farklı çocukluk
  const geniuses = svg({
    sky: ['#2a2a32', '#4a4a52', '#2a2a32'],
    body: id => `
      <rect x="0" y="0" width="400" height="400" fill="#3a3a3a" opacity=".7"/>
      <path d="M60 300 L80 220 L140 210 L170 300 Z" fill="#2a2a2a"/><rect x="200" y="200" width="140" height="100" fill="#4a3a2a"/><polygon points="190,200 270,160 350,200" fill="#3a2a1a"/>
      ${figure(130, 320, 1.6, '#1a1a1a')}
      <rect x="400" y="0" width="400" height="400" fill="#e8dcc4" opacity=".25"/>
      ${glow(id, 600, 160, 200, '#ffd88a', .4)}
      <rect x="460" y="120" width="280" height="180" fill="#5a3a2a"/>${Array.from({ length: 4 }, (_, r) => Array.from({ length: 12 }, (_, c) => `<rect x="${468 + c * 22}" y="${128 + r * 42}" width="16" height="34" fill="${['#8a2a1a', '#2a4a6a', '#6a6a2a', '#4a2a4a'][(r + c) % 4]}"/>`).join('')).join('')}
      ${figure(560, 330, 1.6, '#2a3a5a', { dress: true })}${figure(620, 330, 1, '#2a3a5a')}
      <rect y="320" width="800" height="80" fill="#1a1a1e"/>
      <line x1="400" y1="0" x2="400" y2="400" stroke="#000" stroke-width="3"/>`
  });

  // 5 — Doğru zamanda doğmak: New York’un hukuk büroları
  const timing = svg({
    sky: ['#1a2a3a', '#3a4a5a', '#6a7080'],
    vignette: .5,
    body: id => `
      ${skyline({ y: 300, color: '#0e141c', seed: 95, lit: .4, light: '#ffd88a', minH: 140, maxH: 280, dome: false })}
      <rect y="300" width="800" height="100" fill="#0a0e14"/>
      ${Array.from({ length: 16 }, (_, i) => figure(30 + i * 50, 350 + (i % 2) * 6, 1.2, '#05070a', { hat: i % 2 === 0 })).join('')}
      <g transform="translate(680 60)"><rect x="-50" y="-30" width="100" height="60" fill="#e8dcc4" opacity=".85"/><text y="8" text-anchor="middle" font-family="Lora,serif" font-size="26" fill="#3a2a1a">1930</text></g>`
  });

  // 6 — Kentucky dağları: onur kültürü
  const honor = svg({
    sky: ['#3a3a4a', '#6a6a72', '#a89a8a'],
    vignette: .55, grain: .16,
    body: id => `
      <path d="M0 220 L120 140 L240 200 L380 110 L520 190 L660 130 L800 200 V400 H0 Z" fill="#3a4a3a"/>
      <path d="M0 270 L160 210 L320 250 L500 200 L800 260 V400 H0 Z" fill="#2a3a2a"/>
      ${Array.from({ length: 40 }, (_, i) => `<path d="M${(i * 41) % 800} ${240 + (i * 17) % 60} l8 -24 l8 24 z" fill="#1a2a1a"/>`).join('')}
      <g transform="translate(250 330)"><rect x="-50" y="-50" width="100" height="50" fill="#5a3a2a"/><polygon points="-60,-50 0,-80 60,-50" fill="#3a2a1a"/></g>
      <g transform="translate(560 330)"><rect x="-50" y="-50" width="100" height="50" fill="#5a3a2a"/><polygon points="-60,-50 0,-80 60,-50" fill="#3a2a1a"/></g>
      <rect y="330" width="800" height="70" fill="#1a1a14"/>
      ${figure(330, 350, 1.6, '#0a0a08', { hat: true })}${figure(480, 350, 1.6, '#0a0a08', { hat: true })}
      <path d="M340 300 L470 300" stroke="#a83a2a" stroke-width="2" stroke-dasharray="6 6"/>`
  });

  // 7 — Kokpit: güç mesafesi
  const cockpit = svg({
    sky: ['#04060c', '#0a0e1a', '#141a2a'],
    vignette: .65,
    body: id => `
      <path d="M100 40 L700 40 L780 220 L20 220 Z" fill="#0e1828"/>
      ${streaks(105, 120, '#8aa8d0', 30, 16, .35)}
      <line x1="400" y1="40" x2="400" y2="220" stroke="#1a1a20" stroke-width="10"/>
      <rect y="220" width="800" height="180" fill="#1a1c22"/>
      ${Array.from({ length: 18 }, (_, i) => `<circle cx="${140 + (i % 9) * 66}" cy="${260 + Math.floor(i / 9) * 40}" r="12" fill="#0a0c10" stroke="${i % 5 ? '#3ad8a8' : '#ff6a3a'}" stroke-width="2"/>`).join('')}
      ${glow(id, 400, 280, 200, '#3ad8a8', .2)}
      ${seated(240, 360, 1.6, '#000')}${seated(560, 360, 1.6, '#000', true)}`
  });

  // 8 — Pirinç tarlaları ve matematik
  const rice = svg({
    sky: ['#c8d8b0', '#e8e4c0', '#f8ecd0'],
    vignette: .35, grain: .12,
    body: id => `
      ${glow(id, 640, 100, 180, '#fff8d8', .7)}
      ${Array.from({ length: 7 }, (_, i) => `<path d="M0 ${180 + i * 32} Q200 ${168 + i * 32} 400 ${180 + i * 32} T800 ${178 + i * 32} V${212 + i * 32} Q600 ${200 + i * 32} 400 ${212 + i * 32} T0 ${210 + i * 32} Z" fill="${i % 2 ? '#7aa85a' : '#9ac87a'}"/>
        <path d="M0 ${208 + i * 32} Q400 ${198 + i * 32} 800 ${208 + i * 32}" stroke="#b8d8e8" stroke-width="3" fill="none" opacity=".6"/>`).join('')}
      ${[200, 300, 520].map((x, i) => `<g transform="translate(${x} ${300 + i * 20}) scale(1.4)" fill="#3a2a1a"><path d="M-16 -4 Q-12 -30 8 -32 L14 -28 L8 -20 Q-2 -18 -6 -4 Z"/><circle cx="14" cy="-36" r="6"/><polygon points="4,-40 14,-50 24,-40" fill="#c8a85a"/></g>`).join('')}
      <g transform="translate(120 80)" font-family="Inter,sans-serif" font-size="20" fill="#3a5a2a" opacity=".7"><text>一 二 三 四 五</text></g>`
  });

  window.SUMMARIES['outliers'] = {
    pages: [
      {
        title: 'Roseto Gizemi',
        image: { svg: roseto, caption: 'Pennsylvania’daki Roseto kasabası: kalp krizinin neredeyse uğramadığı bir topluluk.' },
        text: [
          'Malcolm Gladwell, Outliers’a, yani “Çizginin Dışındakiler”e, sıra dışı bir hikâyeyle başlar. 1950’lerde Amerika’da kalp hastalıkları salgın gibi yayılırken, Pennsylvania’daki küçük Roseto kasabasında yaşayan İtalyan göçmenlerde kalp krizi neredeyse hiç görülmemektedir. Doktorlar önce bunun beslenmeden, genlerden ya da iklimden kaynaklandığını düşünür. Ama Rosetolular yağlı yemekler yer, sigara içer ve genetik olarak İtalya’daki akrabalarından farklı değildir.',
          'Araştırmacılar sonunda sırrın kasabanın kendisinde olduğunu keşfeder. Rosetolular birbirlerini ziyaret eder, sokaklarda sohbet eder, birlikte yemek yer ve birden fazla kuşağın aynı çatı altında yaşadığı kalabalık aileler hâlinde yaşar. Kasabada zengini fakiri birbirinden ayıran gösterişli bir yaşam yoktur. Bu sıkı toplumsal bağlar, insanları dünyanın stresinden koruyan görünmez bir kalkan gibidir.',
          'Gladwell bu hikâyeyi bir anahtar olarak kullanır. Ona göre insanların sağlığını anlamak için yalnızca bireye bakmak yetmez, nasıl bir toplulukta yaşadığına da bakmak gerekir. Aynı şey başarı için de geçerlidir. Kitabın temel iddiası şudur: Olağanüstü başarılı insanlar, yani “çizginin dışındakiler”, sadece kendi yetenekleri ve çabalarıyla değil, içinde doğdukları kültür, zaman ve fırsatlar sayesinde yükselir.'
        ]
      },
      {
        title: 'Matta Etkisi',
        image: { svg: hockey, caption: 'Kanada’nın elit hokey takımlarında oyuncuların doğum aylarına göre dağılımı.' },
        text: [
          'Gladwell, başarının ne kadar tesadüfi koşullara bağlı olduğunu göstermek için Kanada’daki buz hokeyini örnek verir. Kanada’nın en iyi genç hokey takımlarının kadrolarına bakıldığında şaşırtıcı bir şey görülür: Oyuncuların büyük kısmı yılın ilk aylarında, yani ocak, şubat ve mart aylarında doğmuştur. Yılın son aylarında doğanlar ise neredeyse hiç yoktur.',
          'Bunun nedeni basittir. Kanada’da çocuk hokey liglerinde yaş sınırı 1 Ocak’a göre belirlenir. Böylece ocakta doğan bir çocuk, aynı yıl aralıkta doğan bir çocuktan neredeyse bir yaş büyük olarak aynı takımda oynar. Küçük yaşlarda bu fark, boyda, güçte ve koordinasyonda büyük bir avantaj demektir. Biraz daha iyi oynayan çocuk seçmelerde öne çıkar, daha iyi takımlara alınır, daha iyi antrenörlerle çalışır ve daha çok maç oynar. Böylece küçük başlangıç avantajı, yıllar içinde dev bir farka dönüşür.',
          'Gladwell bu olguyu, İncil’deki bir cümleden esinlenerek “Matta Etkisi” olarak adlandırır: Kimin varsa ona daha çok verilecektir. Başarı, sadece yetenekli olanı ödüllendirmez, küçük şanslarla öne geçeni de büyütür. Gladwell’e göre bu, eğitimde ve hayatın diğer alanlarında da geçerlidir ve toplumların bu küçük ama belirleyici adaletsizlikleri fark etmesi gerekir.'
        ]
      },
      {
        title: '10.000 Saat Kuralı',
        image: { svg: tenThousand, caption: 'Hamburg’un gece kulüplerinde çalan Beatles ve bir bilgisayar başında gece yarısını geçiren Bill Gates.' },
        text: [
          'Kitabın en çok bilinen fikri, “10.000 saat kuralı”dır. Gladwell, psikolog Anders Ericsson’un çalışmalarına dayanarak, bir alanda gerçek ustalığa ulaşmak için yaklaşık on bin saatlik bilinçli pratik gerektiğini söyler. Berlin’deki bir müzik akademisinde yapılan araştırma, en başarılı kemancıların yirmi yaşına geldiklerinde yaklaşık on bin saat çalıştığını, sıradan öğrencilerin ise bunun yarısına bile ulaşmadığını göstermiştir. Araştırmacılar, pratik yapmadan zirveye ulaşan “doğuştan dâhi”ye neredeyse hiç rastlamamıştır.',
          'Gladwell, bu kuralı Beatles ve Bill Gates örnekleriyle anlatır. Beatles, ünlü olmadan önce Almanya’nın Hamburg şehrinde, gece kulüplerinde haftanın yedi günü, gecede sekiz saate kadar çalmıştır. Bu deneyim onlara, dünyanın en ünlü grubu olmadan önce binlerce saatlik sahne tecrübesi kazandırmıştır. Bill Gates ise henüz bir lise öğrencisiyken, o dönem çok nadir bulunan gerçek zamanlı bir bilgisayara erişim imkânı bulmuş ve gecelerini programlama yaparak geçirmiştir.',
          'Ama Gladwell’in asıl vurgusu, bu on bin saati bir araya getirebilmenin de bir fırsat meselesi olduğudur. Beatles’ın Hamburg’a davet edilmesi, Gates’in okulunun bir bilgisayar kulübü kurması ve onun doğru zamanda, kişisel bilgisayar devrimi başlarken genç olması, bu insanların kendi seçimleri değildir. Yetenek ve çalışkanlık önemlidir, ama ancak doğru fırsatlarla birleştiğinde olağanüstü bir başarıya dönüşür.'
        ]
      },
      {
        title: 'Dâhilerin Sorunu',
        image: { svg: geniuses, caption: 'Yoksulluk içinde büyüyen bir dâhi ve kitaplarla dolu bir evde yetişen bir çocuk.' },
        text: [
          'Yüksek zekâ, başarının garantisi midir? Gladwell bu soruya, IQ’su Einstein’ınkinden bile yüksek olduğu söylenen Chris Langan’ın hikâyesiyle cevap verir. Langan, olağanüstü bir zekâya sahiptir, ama yoksul ve sorunlu bir ailede büyümüştür. Üniversitede bir burs sorunu yüzünden okulu bırakmak zorunda kalmış ve hayatını bir çiftlikte, büyük ölçüde fark edilmeden geçirmiştir.',
          'Gladwell, bunu atom bombasının babası olarak bilinen fizikçi Robert Oppenheimer ile karşılaştırır. Oppenheimer da gençken ciddi sorunlar yaşamış, hatta bir hocasını zehirlemeye teşebbüs etmiştir. Ama varlıklı ve eğitimli bir ailede büyüdüğü için, yetkililerle nasıl konuşacağını, kendi çıkarlarını nasıl savunacağını ve otoriteyi nasıl ikna edeceğini biliyordur. Bu “pratik zekâ”, onun hem üniversitede kalmasını hem de sonradan büyük bir projenin başına geçmesini sağlar.',
          'Gladwell, sosyolog Annette Lareau’nun araştırmalarına dayanarak, orta ve üst sınıf ailelerin çocuklarını “bilinçli bir şekilde yetiştirdiğini” anlatır. Bu çocuklar küçük yaştan itibaren yetişkinlerle konuşmayı, soru sormayı ve haklarını aramayı öğrenir. Yoksul ailelerin çocukları ise otoriteye karşı daha çekingen ve güvensiz büyür. Gladwell’e göre zekâ belli bir eşiği geçtikten sonra, başarıyı belirleyen şey zekâdan çok bu toplumsal becerilerdir.'
        ]
      },
      {
        title: 'Doğru Zamanda Doğmak',
        image: { svg: timing, caption: 'New York, 1930’lar: Büyük Buhran’ın ortasında küçük ama şanslı bir kuşak.' },
        text: [
          'Gladwell, başarının bir başka gizli unsurunun da doğduğumuz tarih olduğunu söyler. Örneğin tarihin en zengin insanları listesine bakıldığında, bu listenin önemli bir kısmının 1830’larda doğmuş Amerikalılardan oluştuğu görülür. Rockefeller ve Carnegie gibi isimler, Amerikan ekonomisinin demiryolları ve sanayiyle köklü bir dönüşüm geçirdiği tam o yıllarda genç yetişkin olmuşlardır.',
          'Aynı şekilde, kişisel bilgisayar devriminin en büyük isimleri olan Bill Gates, Steve Jobs ve diğerlerinin çoğu 1954-1955 yıllarında doğmuştur. Çok erken doğanlar zaten büyük şirketlerde kariyer yapmış, çok geç doğanlar ise bu devrimin başlangıcını kaçırmıştır. Doğru yaşta, doğru yerde olmak, bu insanlara büyük bir avantaj sağlamıştır.',
          'Gladwell, New York’un ünlü avukatı Joe Flom’un hikâyesiyle bu fikri derinleştirir. Flom gibi 1930’larda doğan Yahudi avukatlar, büyük hukuk bürolarına kabul edilmedikleri için kendi bürolarını kurmak ve diğer büroların reddettiği şirket satın alma davalarına bakmak zorunda kalmıştır. Ama 1970’lerde bu tür davalar patlama yaşayınca, bir zamanlar küçümsenen bu alan bir altın madenine dönüşmüştür. Ayrıca Büyük Buhran yıllarında doğum oranları düştüğü için, bu kuşak daha küçük sınıflarda okumuş ve iş hayatında daha az rekabetle karşılaşmıştır.'
        ]
      },
      {
        title: 'Kültürün Mirası',
        image: { svg: honor, caption: 'Kentucky’nin dağlık bölgeleri: nesiller boyu süren aile kavgaları.' },
        text: [
          'Kitabın ikinci bölümünde Gladwell, atalarımızdan devraldığımız kültürel mirasın davranışlarımızı nasıl etkilediğini inceler. İlk örnek, on dokuzuncu yüzyılda Kentucky’nin dağlık bölgelerindeki kasabalarda yaşanan kanlı aile kavgalarıdır. Bu bölgeye yerleşen insanlar, İskoçya ve İngiltere sınırlarındaki çoban toplumlarından gelir. Çobanlıkta bir adamın serveti, kolayca çalınabilecek hayvanlarıdır, bu yüzden onurunu ve itibarını en küçük bir hakarete karşı bile şiddetle savunmak zorundadır.',
          'Gladwell, bu “onur kültürü”nün yüzyıllar sonra bile yaşadığını gösteren bir deneyi anlatır. Araştırmacılar, bir koridorda öğrencilere kasten çarpıp onlara hakaret eder. Amerika’nın kuzeyinden gelen öğrenciler bu olaya genellikle gülüp geçer. Güneyden gelen öğrenciler ise öfkelenir, stres hormonları yükselir ve saldırgan davranmaya hazır hâle gelir. Atalarının yaşam koşulları ortadan kalkmış olsa da, bu kültürel davranış kalıpları kuşaktan kuşağa aktarılmıştır.',
          'Gladwell’e göre bu örnek, kültürün ne kadar güçlü ve kalıcı olduğunu gösterir. Biz kendimizi tamamen özgür bireyler olarak görürüz, ama aslında davranışlarımızın bir kısmı çoktan unutulmuş bir geçmişin izlerini taşır. Bunu fark etmek, kendimizi ve başkalarını anlamak için önemlidir.'
        ]
      },
      {
        title: 'Uçak Kazalarının Etnik Teorisi',
        image: { svg: cockpit, caption: 'Fırtınalı bir gecede kokpitte bir kaptan ve söz almaya çekinen yardımcı pilotu.' },
        text: [
          'Gladwell’in en çarpıcı örneklerinden biri, 1990’larda kötü bir güvenlik siciline sahip olan Kore Hava Yolları’dır. Uçak kazalarının çoğu tek bir büyük teknik arızadan değil, genellikle küçük hataların ve iletişim sorunlarının üst üste binmesinden kaynaklanır. Gladwell, kokpit kayıtlarını inceleyen uzmanların, bu kazalarda ortak bir sorun bulduğunu anlatır: Yardımcı pilotlar, kaptanın hatalı kararlarını açıkça uyarmakta zorlanmaktadır.',
          'Bunun nedeni, Hollandalı psikolog Geert Hofstede’nin “güç mesafesi” dediği kültürel bir özelliktir. Güç mesafesinin yüksek olduğu kültürlerde, insanlar otoriteye karşı derin bir saygı duyar ve üstlerine doğrudan itiraz etmekten kaçınır. Kokpitte bu, yardımcı pilotun hayati bir tehlikeyi bile sadece ima ederek, dolaylı bir dille anlatmasına neden olur. Bu ima ise yorgun ya da stresli bir kaptan tarafından kolayca kaçırılabilir.',
          'Kore Hava Yolları bu sorunu fark ettiğinde köklü bir değişiklik yapar. Pilotlarına, kokpitte yalnızca havacılığın ortak dili olan İngilizce konuşmayı ve hiyerarşiden bağımsız olarak açık ve net bir şekilde iletişim kurmayı öğretir. Kısa süre içinde hava yolu dünyanın en güvenli hava yollarından biri hâline gelir. Gladwell’e göre bu örnek, kültürün bir kader olmadığını, fark edildiğinde değiştirilebileceğini gösterir.'
        ]
      },
      {
        title: 'Pirinç Tarlaları ve Matematik',
        image: { svg: rice, caption: 'Asya’nın teraslı pirinç tarlaları: yüzyılların sabrı ve emeği.' },
        text: [
          'Gladwell, Asyalı öğrencilerin matematikte neden bu kadar başarılı olduğunu da kültürel bir mirasla açıklar. İlk neden dildir. Çince, Japonca ve Korece gibi dillerde sayıların adları kısa ve son derece mantıklıdır. Örneğin on bir “on bir”, yirmi dört ise “iki on dört” şeklinde söylenir. Bu yapı, çocukların saymayı ve hesap yapmayı çok daha kolay öğrenmesini sağlar.',
          'İkinci ve daha derin neden ise pirinç tarımıdır. Yüzyıllar boyunca Güney Çin’de pirinç yetiştiren köylüler, küçük tarlalarında yılın neredeyse her günü, güneş doğmadan önce kalkarak, son derece titiz ve sabırlı bir şekilde çalışmıştır. Bu emek, bir ailenin hayatta kalmasını doğrudan belirler. Çinli bir atasözü bu kültürü güzelce özetler: Yılın üç yüz altmış günü güneş doğmadan kalkan bir adam, ailesini zengin etmekte başarısız olamaz. Gladwell’e göre bu çalışma ahlakı, Asyalı öğrencilerin zor matematik problemlerine daha uzun süre sabırla odaklanmasında da kendini gösterir.',
          'Gladwell, Amerika’da düşük gelirli ailelerden gelen çocukların okuduğu KIPP okullarını örnek göstererek kitabını bitirir. Bu okullarda öğrenciler daha uzun saatler ve yaz tatillerinde de çalışır ve başarıları hızla artar. Son bölümde kendi annesinin Jamaika’daki hikâyesini, aldığı fırsatları ve şansları anlatır. Gladwell’in mesajı açıktır: Başarı bir bireyin tek başına kazandığı bir zafer değil, fırsatların, mirasın ve çabanın birleşimidir. Toplumlar bu fırsatları daha adil dağıtmayı başarırsa, çizginin dışındakilerin sayısı da artacaktır.'
        ]
      }
    ]
  };
})();
