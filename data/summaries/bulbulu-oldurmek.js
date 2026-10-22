// Bülbülü Öldürmek — Harper Lee (1960)
// Sahneler data/scenes.js yardımcılarıyla çizilir; ileride image.src ile gerçek çizimlerle değiştirilebilir.
(() => {
  const { svg, glow, skyline, figure, seated, streaks, dots } = window.Scene;

  const house = (x, y, s, c, porch = true, lit) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-80" y="-70" width="160" height="70" fill="${c}"/><polygon points="-90,-70 0,-110 90,-70" fill="${c}"/>
    ${porch ? `<rect x="-90" y="-36" width="180" height="6" fill="${c}"/>${[-80, -40, 0, 40, 80].map(dx => `<rect x="${dx - 2}" y="-36" width="4" height="36" fill="${c}"/>`).join('')}` : ''}
    ${[-50, 30].map(dx => `<rect x="${dx}" y="-60" width="20" height="18" fill="${lit || '#1a1a1a'}" opacity=".85"/>`).join('')}</g>`;
  const oak = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-10" y="-120" width="20" height="120" fill="${c}"/><circle cx="-30" cy="-140" r="50" fill="${c}"/><circle cx="30" cy="-150" r="56" fill="${c}"/><circle cx="0" cy="-180" r="44" fill="${c}"/><circle cx="6" cy="-80" r="6" fill="#0a0a0a"/></g>`;

  // 1 — Maycomb yazı
  const maycomb = svg({
    sky: ['#e8c890', '#f4dcb0', '#f8ecd0'],
    vignette: .4, grain: .16,
    body: id => `
      ${glow(id, 640, 90, 160, '#fff4d0', .8)}
      <rect y="250" width="800" height="150" fill="#c8a870"/>
      ${house(200, 260, 1.1, '#e8dcc4', true, '#5a6a7a')}${house(600, 256, 1, '#6a5a4a', true, '#1a1a1a')}
      ${oak(420, 290, .9, '#4a6a3a')}
      <path d="M0 300 H800" stroke="#a8885a" stroke-width="30"/>
      ${figure(300, 330, 1.1, '#6a8ab0', { dress: false })}${figure(340, 330, 1.3, '#3a3a3a')}${figure(380, 330, 1.05, '#c8a870', {})}
      ${dots(7, 40, '#fff4d0', 1.2, .4, 40, 240)}`
  });

  // 2 — Radley evi ve ağaçtaki hediyeler
  const radley = svg({
    sky: ['#4a4a3a', '#6a6a52', '#8a8468'],
    vignette: .65, grain: .2,
    body: id => `
      <rect y="250" width="800" height="150" fill="#5a5a3a"/>
      ${house(520, 260, 1.4, '#2a2620', true, '#0a0a0a')}
      ${Array.from({ length: 6 }, (_, i) => `<rect x="${360 + i * 60}" y="${232 + (i % 2) * 4}" width="40" height="${4}" fill="#1a1a14"/>`).join('')}
      ${oak(200, 300, 1.1, '#2a3a20')}
      <g transform="translate(206 210)"><rect x="-6" y="-6" width="12" height="10" fill="#c8a84a"/><circle cx="12" cy="0" r="3" fill="#a8a8a8"/></g>
      ${figure(120, 340, 1.1, '#6a8ab0')}${figure(90, 342, 1.3, '#3a3a3a')}
      <rect x="628" y="214" width="14" height="22" fill="#e8dcc4" opacity=".4"/>`
  });

  // 3 — Atticus ve kızgın köpek
  const dog = svg({
    sky: ['#f4dcb0', '#f8e8c8', '#fcf4e0'],
    vignette: .45, grain: .16,
    body: id => `
      <rect y="250" width="800" height="150" fill="#d8b880"/>
      <path d="M0 300 H800" stroke="#c8a870" stroke-width="40"/>
      ${house(120, 250, .9, '#e8dcc4', true, '#5a6a7a')}${house(700, 250, .9, '#d8c8a8', true, '#5a6a7a')}
      ${figure(300, 320, 1.9, '#2a2a2a', { hat: false })}
      <line x1="300" y1="250" x2="380" y2="244" stroke="#2a2a2a" stroke-width="4"/>
      <g transform="translate(560 320) scale(1.6)" fill="#5a3a2a"><path d="M-22 -20 H14 L22 -32 L30 -30 L28 -22 L20 -14 V0 H15 V-10 H-14 V0 H-19 V-12 L-28 -22 Z"/></g>
      ${figure(150, 340, 1, '#6a8ab0')}${figure(180, 342, 1.2, '#3a3a3a')}`
  });

  // 4 — Hapishane önünde gece
  const jail = svg({
    sky: ['#0a0c14', '#141824', '#1a1e2a'],
    vignette: .7,
    body: id => `
      ${dots(9, 60, '#fff', 1, .7, 0, 140)}
      <rect x="300" y="140" width="200" height="160" fill="#2a2a30"/>${[330, 390, 450].map(x => `<rect x="${x}" y="170" width="24" height="34" fill="#141418"/>${[0, 1, 2].map(k => `<line x1="${x + 4 + k * 8}" y1="170" x2="${x + 4 + k * 8}" y2="204" stroke="#3a3a40" stroke-width="2"/>`).join('')}`).join('')}
      <rect x="390" y="230" width="6" height="70" fill="#2a2018"/>${glow(id, 393, 226, 90, '#ffd890', .7)}<circle cx="393" cy="226" r="8" fill="#fff4c0"/>
      ${seated(420, 300, 1.4, '#1a1a1a')}
      <rect y="300" width="800" height="100" fill="#0e1016"/>
      ${Array.from({ length: 8 }, (_, i) => figure(80 + i * 26, 350, 1.4, '#05060a', { hat: true })).join('')}
      ${figure(470, 340, .95, '#6a8ab0')}${figure(500, 342, 1.2, '#3a3a3a')}`
  });

  // 5 — Mahkeme salonu
  const court = svg({
    sky: ['#3a2a1a', '#5a4028', '#3a2a1a'],
    vignette: .6,
    body: id => `
      ${[160, 320, 480, 640].map(x => `<rect x="${x - 30}" y="40" width="60" height="140" fill="#e8d8a8" opacity=".55"/>`).join('')}
      ${glow(id, 400, 100, 300, '#fff0c0', .35)}
      <rect x="320" y="160" width="160" height="70" fill="#5a3a22"/>${figure(400, 170, 1.3, '#0a0a0a')}
      <rect x="0" y="40" width="800" height="12" fill="#3a2414"/>${Array.from({ length: 14 }, (_, i) => figure(30 + i * 56, 40, .9, '#1a0e08', { hat: i % 3 === 0 })).join('')}
      <rect y="300" width="800" height="100" fill="#2a1a0e"/>
      ${Array.from({ length: 3 }, (_, r) => Array.from({ length: 10 }, (_, i) => figure(60 + i * 72 + r * 12, 340 + r * 24, 1.1, '#140c06', { hat: (i + r) % 3 === 0 })).join('')).join('')}
      ${figure(240, 300, 1.7, '#2a2a3a')}${seated(560, 300, 1.5, '#0a0806')}`
  });

  // 6 — Atticus’un savunması ve karar
  const verdict = svg({
    sky: ['#2a1a10', '#3a2618', '#2a1a10'],
    vignette: .7,
    body: id => `
      ${glow(id, 400, 200, 240, '#ffc070', .35)}
      <rect x="120" y="230" width="560" height="20" fill="#5a3a22"/>
      ${Array.from({ length: 12 }, (_, i) => seated(160 + (i % 6) * 90, 230 + Math.floor(i / 6) * 0, 1.2, '#1a0e08', false)).join('')}
      ${figure(400, 340, 2.1, '#2a2a3a')}
      <rect y="340" width="800" height="60" fill="#140a04"/>
      ${Array.from({ length: 6 }, (_, i) => `<g transform="translate(${90 + i * 26} 80)">${figure(0, 0, 1, '#0a0604')}</g>`).join('')}
      <rect x="60" y="80" width="200" height="8" fill="#3a2414"/>`
  });

  // 7 — Cadılar Bayramı gecesi saldırı
  const halloween = svg({
    sky: ['#04060a', '#0a0e16', '#0e121c'],
    vignette: .8,
    body: id => `
      ${oak(560, 320, 1.4, '#05070a')}${oak(240, 330, 1.1, '#05070a')}
      <rect y="320" width="800" height="80" fill="#0a0c10"/>
      <g transform="translate(400 330) scale(2)"><path d="M-14 -10 Q-16 -40 0 -46 Q16 -40 14 -10 Q12 0 0 0 Q-12 0 -14 -10 Z" fill="#a86a2a" opacity=".7"/><rect x="-2" y="-52" width="4" height="8" fill="#3a5a2a"/></g>
      ${figure(470, 340, 1.7, '#000', {})}${figure(320, 342, 1.3, '#000')}
      ${glow(id, 640, 300, 30, '#ffd890', .5)}`
  });

  // 8 — Radley verandasından bakış
  const porch = svg({
    sky: ['#e8a870', '#f4c890', '#fcdcb0'],
    vignette: .45, grain: .14,
    body: id => `
      ${glow(id, 400, 260, 300, '#fff0c0', .7)}
      <rect x="0" y="0" width="800" height="40" fill="#3a2a1a"/><rect x="0" y="40" width="20" height="300" fill="#3a2a1a"/><rect x="780" y="40" width="20" height="300" fill="#3a2a1a"/>
      ${[200, 400, 600].map(x => `<rect x="${x - 8}" y="40" width="16" height="300" fill="#3a2a1a"/>`).join('')}
      <rect y="300" width="800" height="100" fill="#4a3a2a"/>
      <rect y="300" width="800" height="12" fill="#2a1a10"/>
      ${skyline({ y: 300, color: '#a8886a', seed: 55, lit: 0, minH: 30, maxH: 80, dome: false }).replace(/<rect/g, '<rect opacity=".55"')}
      ${figure(370, 300, 1.1, '#6a8ab0')}${figure(430, 300, 1.8, '#3a3a40')}`
  });

  window.SUMMARIES['bulbulu-oldurmek'] = {
    pages: [
      {
        title: 'Maycomb’da Bir Yaz',
        image: { svg: maycomb, caption: '1930’ların Alabama’sında sıcak ve tozlu bir kasaba sokağı.' },
        text: [
          'Harper Lee’nin romanı, 1930’ların Büyük Buhran yıllarında, Alabama eyaletindeki küçük ve uykulu Maycomb kasabasında geçer. Hikâyeyi, olaylar başladığında altı yaşında olan Jean Louise Finch, herkesin deyişiyle Scout anlatır. Scout, yıllar sonra çocukluğuna geri dönerek, kasabasında yaşanan ve hayatını sonsuza kadar değiştiren olayları hatırlar.',
          'Scout, ağabeyi Jem ve babaları Atticus ile birlikte yaşar. Anneleri, Scout iki yaşındayken ölmüştür. Atticus, kasabanın saygın avukatıdır. Sakin, adil, kitap okumayı seven ve çocuklarına her zaman dürüst davranan bir babadır. Evin işlerini, çocuklara karşı sert ama sevgi dolu olan siyahi aşçı Calpurnia yönetir.',
          'Bir yaz, Maycomb’a teyzesinin yanında tatil geçirmek için Dill adında küçük, hayal gücü geniş bir çocuk gelir. Scout, Jem ve Dill, yazın uzun günlerini oyunlar oynayarak, maceralar hayal ederek ve kasabanın en gizemli evini gözetleyerek geçirirler. Harper Lee, bu çocuksu masumiyetin içinden, Amerika’nın güneyindeki ırkçılığın, önyargının ve adaletsizliğin karanlık yüzünü yavaş yavaş gösterir.'
        ]
      },
      {
        title: 'Boo Radley’nin Gizemi',
        image: { svg: radley, caption: 'Kepenkleri hep kapalı Radley evi ve kovuğunda gizemli hediyeler bırakılan meşe ağacı.' },
        text: [
          'Finch’lerin evinin birkaç kapı ötesinde, kepenkleri hiç açılmayan, karanlık ve korkutucu bir ev vardır: Radley evi. Bu evde, yıllar önce gençken başı belaya girdiği için babası tarafından eve kapatılan ve o günden beri kimsenin görmediği Arthur Radley, kasabalıların deyişiyle Boo Radley yaşar. Kasabada onunla ilgili korkunç hikâyeler anlatılır. Geceleri pencerelerden içeri baktığı, kedileri ve sincapları yediği söylenir.',
          'Çocuklar, Boo Radley’yi evinden dışarı çıkarmaya kafayı takarlar. Ona mektuplar bırakmaya, evin etrafında gizlice dolaşmaya ve onun hayatını canlandıran oyunlar oynamaya başlarlar. Bir gece Jem, Radley evinin bahçesine gizlice girdiğinde pantolonunu bir çite takılı bırakmak zorunda kalır. Geri dönüp aldığında, pantolonunun dikilmiş ve katlanmış olarak orada beklediğini görür.',
          'Bir süre sonra, Radley evinin önündeki meşe ağacının kovuğunda küçük hediyeler bulmaya başlarlar: sakız, eski bozuk paralar, sabundan oyulmuş iki küçük heykelcik ve bozuk bir saat. Bir kış gecesi bir komşunun evi yanarken, Scout soğuk havada dışarıda beklerken, birinin omzuna sessizce bir battaniye örttüğünü fark etmez. Bu kişi Boo Radley’dir. Çocuklar, bu gizemli adamın aslında kendilerine dostça yaklaştığını yavaş yavaş anlamaya başlar.'
        ]
      },
      {
        title: 'Cesaret Nedir?',
        image: { svg: dog, caption: 'Sıcak bir öğle sonrası sokakta Atticus ve kuduz bir köpek.' },
        text: [
          'Bir gün Atticus, kasabanın en tartışmalı davasını üstlendiğini açıklar. Tom Robinson adında genç bir siyahi adam, beyaz bir kadın olan Mayella Ewell’e tecavüz etmekle suçlanmaktadır. Irkçılığın derinden kök saldığı bu kasabada, bir beyazın bir siyahiyi savunması, pek çok kişinin gözünde kabul edilemez bir ihanettir. Scout ve Jem, okulda ve sokakta, babalarının “zencileri savunduğu” için sürekli alay ve hakaretle karşılaşır.',
          'Atticus, çocuklarına, kavga etmek yerine başkalarının yerine kendini koymayı ve onları anlamaya çalışmayı öğretir. Ona göre bir insanı gerçekten anlamak için, onun derisinin içine girip dünyayı onun gözünden görmek gerekir. Çocuklarına bir hava tüfeği hediye ettiğinde, onlara istedikleri kadar karga vurabileceklerini, ama asla bir bülbülü öldürmemeleri gerektiğini söyler. Çünkü bülbül hiçbir zarar vermez, sadece güzel şarkılar söyler.',
          'Bir gün sokakta kuduz bir köpek belirir. Kasabanın şerifi, Atticus’a tüfeği uzatır. Çocuklar, babalarının kasabanın en iyi nişancısı olduğunu o gün ilk kez öğrenirler. Atticus, tek bir kurşunla köpeği vurur. Ama Jem’e, gerçek cesaretin elinde silah olan bir adamın cesareti olmadığını öğretir. Gerçek cesaret, daha başlamadan yenileceğini bildiğin hâlde bir işe girişmek ve ne olursa olsun sonuna kadar devam etmektir. Tom Robinson’ın davası da tam olarak böyle bir davadır.'
        ]
      },
      {
        title: 'Hapishane Önünde Bir Gece',
        image: { svg: jail, caption: 'Hapishanenin önünde lamba ışığında kitap okuyan Atticus ve yaklaşan kalabalık.' },
        text: [
          'Duruşmadan bir gece önce Tom Robinson, kasabanın küçük hapishanesine getirilir. Atticus, Tom’u linç edilmekten korumak için, hapishanenin kapısının önüne bir sandalye ve bir lamba koyar ve gece boyunca orada oturup kitap okumaya başlar. Gece yarısı, arabalarla gelen bir grup öfkeli adam hapishanenin önünde toplanır ve Atticus’tan kenara çekilmesini ister.',
          'Tam o sırada Scout, Jem ve Dill, babalarını merak edip gizlice evden kaçmış ve oraya gelmişlerdir. Scout, kalabalığın arasından koşarak babasının yanına gider. Kalabalığın içinde, okul arkadaşı Walter’ın babası Bay Cunningham’ı tanır. Masum bir çocukluk neşesiyle onunla konuşmaya, oğlunu sormaya ve babasının onun hukuki işlerine nasıl yardım ettiğini anlatmaya başlar.',
          'Scout’un bu basit ve içten sözleri, Bay Cunningham’ı derinden utandırır. Adam, çömelip Scout’un omzunu tutar, ona oğluna selam söyleyeceğini söyler ve kalabalığa dağılmalarını işaret eder. Adamlar sessizce arabalarına binip giderler. Harper Lee bu sahnede, bir kalabalığın içinde kaybolan insanların, onları tek tek insan olarak gören bir çocuğun bakışı karşısında nasıl yeniden insanlığını hatırlayabildiğini gösterir.'
        ]
      },
      {
        title: 'Duruşma',
        image: { svg: court, caption: 'Kalabalık mahkeme salonu: aşağıda beyazlar, yukarıdaki balkonda siyahiler.' },
        text: [
          'Duruşma günü bütün kasaba mahkeme salonunu doldurur. Beyazlar salonun alt katında, siyahiler ise üst kattaki balkonda oturur. Scout, Jem ve Dill, babalarının izni olmadan gizlice gelir ve rahip Sykes’in yanında, siyahilerin oturduğu balkona otururlar. Buradan, Atticus’un davayı nasıl ustalıkla yürüttüğünü izlerler.',
          'Mayella’nın babası Bob Ewell, kasabanın en sefil, en tembel ve en kötü şöhretli adamıdır. Atticus, onu sorgularken, Bob Ewell’in solak olduğunu ortaya çıkarır. Mayella’nın yüzündeki morlukların sağ tarafta olduğu, yani ona vuran kişinin büyük olasılıkla solak olduğu anlaşılır. Tom Robinson ise çocukken geçirdiği bir kazada sol kolunu tamamen kullanamaz hâle gelmiştir.',
          'Tom, kürsüye çıktığında gerçeği anlatır. Yıllardır, Mayella’nın ricası üzerine, karşılığında hiçbir şey almadan onun evindeki küçük işlere yardım etmiştir, çünkü ona acımıştır. O gün Mayella, onu evine çağırmış ve onu öpmeye çalışmıştır. Babası pencereden onları görünce, Mayella’yı dövmüştür. Tom, korkuyla kaçmıştır. Ama Tom, ifadesinde Mayella’ya “acıdığını” söylediğinde, salondaki beyazlar bir siyahinin bir beyaza acımasını büyük bir saygısızlık olarak görür.'
        ]
      },
      {
        title: 'Karar',
        image: { svg: verdict, caption: 'Jürinin kararından sonra salon boşalırken balkonda ayağa kalkan insanlar.' },
        text: [
          'Atticus, jüriye yaptığı unutulmaz kapanış konuşmasında, davada hiçbir kanıt olmadığını, Tom’un sadece siyahi olduğu için suçlandığını söyler. Mayella’nın, toplumun kurallarını çiğneyip bir siyahiyi arzuladığı için duyduğu utancı örtmek amacıyla Tom’u suçladığını anlatır. Ona göre mahkemeler, bütün insanların eşit olduğu tek yerdir. Jüriden, vicdanlarını dinlemelerini ve görevlerini yapmalarını ister.',
          'Ama jüri, saatlerce süren bir tartışmanın ardından, Tom Robinson’ı suçlu bulur. Jem, bu karar karşısında yıkılır. Dünyanın adil bir yer olduğuna olan inancı paramparça olur. Atticus salonu terk ederken, balkonda oturan bütün siyahiler sessizce ayağa kalkar. Rahip Sykes, Scout’a ayağa kalkmasını, çünkü babasının geçtiğini söyler.',
          'Atticus, kararı temyize götürmeyi umut eder. Ama Tom, adalete olan umudunu kaybetmiştir. Hapishaneden kaçmaya çalışırken gardiyanlar tarafından on yedi kurşunla vurularak öldürülür. Kasabanın gazetecisi, Tom’un ölümünü, avcıların ve çocukların bir şarkı kuşunu öldürmesine benzeten bir yazı yazar. Bob Ewell ise duruşmada aşağılandığı için Atticus’tan intikam almaya yemin eder ve onun yüzüne tükürür.'
        ]
      },
      {
        title: 'Cadılar Bayramı Gecesi',
        image: { svg: halloween, caption: 'Okul gösterisinden dönerken karanlık meşe ağaçlarının altında bir saldırı.' },
        text: [
          'Sonbaharda, okulda bir Cadılar Bayramı gösterisi düzenlenir. Scout, gösteride bir jambon kostümü giyer. Jem ile birlikte karanlıkta eve dönerken, ağaçların arasından birinin onları takip ettiğini fark ederler. Birden biri onlara saldırır. Scout, kalın kostümünün içinde ne olduğunu göremez. Jem’in bağırdığını, yere düştüğünü ve kolunun kırıldığını duyar.',
          'Karanlığın içinde bir boğuşma yaşanır. Ardından her şey sessizleşir. Scout, kostümünden kurtulup gördüğünde, yabancı bir adamın baygın Jem’i kucaklayarak evlerine taşıdığını görür. Saldırgan Bob Ewell’dir ve olay yerinde, kendi bıçağıyla bıçaklanmış olarak ölü bulunur.',
          'Scout, evde Jem’in yatağının yanında duran solgun, utangaç ve ince yapılı adama bakar ve onun kim olduğunu birden anlar. Bu adam, çocukları kurtaran Boo Radley’dir. Scout, yıllardır korktuğu ve hayalini kurduğu bu adama gülümseyerek “Merhaba Boo” der. Boo, çocukluğundan beri hayatını kapalı bir evde geçirmiş, ama bu çocukları uzaktan sevgiyle izlemiştir.'
        ]
      },
      {
        title: 'Radley Verandasından',
        image: { svg: porch, caption: 'Radley evinin verandasından mahalleye bakan küçük bir kız.' },
        text: [
          'Şerif Tate, Bob Ewell’in kendi bıçağının üzerine düşerek öldüğünü açıklar. Atticus, ilk başta Jem’in onu öldürdüğünü düşünür ve oğlunun bunun hesabını vermesi gerektiğini söyler. Ama şerif, gerçeği bilir: Bob Ewell’i öldüren Boo Radley’dir. Ve şerife göre, utangaç ve kırılgan Boo’yu bütün kasabanın gözü önüne bir kahraman olarak çıkarmak, onu öldürmekle aynı şeydir.',
          'Atticus, sonunda şerifin haklı olduğunu kabul eder. Scout da babasına, bunun bir bülbülü öldürmek gibi bir şey olacağını söyler. Boo Radley, tıpkı Tom Robinson gibi, hiçbir zarar vermeyen ve sadece iyilik yapan bir insandır. Onu korumak, Atticus’un çocuklarına öğrettiği adaletin ve merhametin ta kendisidir.',
          'Scout, Boo’yu evine kadar götürür. Boo, kapıdan içeri girer ve bir daha görünmez. Scout, Radley evinin verandasında durur ve mahalleye, onun gözünden bakar. Bütün o yaz, kış ve bahar boyunca, Boo’nun penceresinden kendilerini nasıl izlediğini, onlara nasıl hediyeler bıraktığını hayal eder. O an, babasının öğrettiği şeyi gerçekten anlar: Bir insanı tanımak için, onun yerinde durmak gerekir. Bülbülü Öldürmek, masumiyetin kaybını, önyargının yıkıcılığını ve sıradan bir insanın gösterebileceği büyük cesareti anlatan, Amerikan edebiyatının en sevilen romanlarından biridir.'
        ]
      }
    ]
  };
})();
