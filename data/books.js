// Kitap kataloğu. ready: true olanların data/summaries/<id>.js dosyası vardır.
// list: 'secki' → kullanıcının seçtiği kitaplar, 'klasik' → dünya klasikleri.
// Yeni kitap eklemek için buraya bir satır, summaries klasörüne bir dosya ekleyin.
const BOOKS = [
  // ---- Seçki ----
  { list: 'secki', id: 'tufek-mikrop-celik', title: 'Tüfek, Mikrop ve Çelik', author: 'Jared Diamond', year: 1997, category: 'Tarih', emoji: '🌍', color: '#6b4a2a', ready: true },
  { list: 'secki', id: 'sapiens', title: 'Sapiens', author: 'Yuval Noah Harari', year: 2011, category: 'Tarih', emoji: '🦴', color: '#8a5a2a', ready: true },
  { list: 'secki', id: 'homo-deus', title: 'Homo Deus', author: 'Yuval Noah Harari', year: 2015, category: 'Tarih', emoji: '🤖', color: '#2a4a6b', ready: true },
  { list: 'secki', id: 'dunyayi-degistiren-kararlar', title: 'Dünyayı Değiştiren Kararlar', author: 'Ian Kershaw', year: 2007, category: 'Tarih', emoji: '🗺️', color: '#4a4a3a', ready: true },
  { list: 'secki', id: 'gece-yarisi-kutuphanesi', title: 'Gece Yarısı Kütüphanesi', author: 'Matt Haig', year: 2020, category: 'Çağdaş Roman', emoji: '📖', color: '#2a3a6b', ready: true },
  { list: 'secki', id: '1984', title: '1984', author: 'George Orwell', year: 1949, category: 'Distopya', emoji: '👁️', color: '#3a3a3a', ready: true },
  { list: 'secki', id: 'fahrenheit-451', title: 'Fahrenheit 451', author: 'Ray Bradbury', year: 1953, category: 'Distopya', emoji: '🔥', color: '#a0401f', ready: true },
  { list: 'secki', id: 'outliers', title: 'Outliers (Çizginin Dışındakiler)', author: 'Malcolm Gladwell', year: 2008, category: 'Sosyoloji', emoji: '📈', color: '#2a6a5a', ready: true },
  { list: 'secki', id: 'prens', title: 'Prens', author: 'Niccolò Machiavelli', year: 1532, category: 'Siyaset Felsefesi', emoji: '👑', color: '#6b2a2a', ready: true },
  { list: 'secki', id: 'satranc', title: 'Satranç', author: 'Stefan Zweig', year: 1942, category: 'Avusturya Edebiyatı', emoji: '♟️', color: '#2a2a2a', ready: true },
  { list: 'secki', id: 'dakikalar-icinde-kuantum-fizigi', title: 'Dakikalar İçinde Kuantum Fiziği', author: 'Gemma Lavender', year: 2017, category: 'Bilim', emoji: '⚛️', color: '#2a3a7a', ready: true },
  { list: 'secki', id: 'hayvan-ciftligi', title: 'Hayvan Çiftliği', author: 'George Orwell', year: 1945, category: 'Distopya', emoji: '🐷', color: '#6b4a2a', ready: true },

  // ---- Dünya klasikleri ----
  { list: 'klasik', id: 'suc-ve-ceza', title: 'Suç ve Ceza', author: 'Fyodor Dostoyevski', year: 1866, category: 'Rus Edebiyatı', emoji: '🪓', color: '#7a2e24', ready: true },
  { list: 'klasik', id: 'sefiller', title: 'Sefiller', author: 'Victor Hugo', year: 1862, category: 'Fransız Edebiyatı', emoji: '🕯️', color: '#2f4a6b', ready: true },
  { list: 'klasik', id: 'savas-ve-baris', title: 'Savaş ve Barış', author: 'Lev Tolstoy', year: 1869, category: 'Rus Edebiyatı', emoji: '⚔️', color: '#5a4a2a', ready: true },
  { list: 'klasik', id: 'anna-karenina', title: 'Anna Karenina', author: 'Lev Tolstoy', year: 1877, category: 'Rus Edebiyatı', emoji: '🚂', color: '#6b2a4a', ready: true },
  { list: 'klasik', id: 'don-kisot', title: 'Don Kişot', author: 'Miguel de Cervantes', year: 1605, category: 'İspanyol Edebiyatı', emoji: '🐴', color: '#8a6a1f', ready: true },
  { list: 'klasik', id: 'madame-bovary', title: 'Madame Bovary', author: 'Gustave Flaubert', year: 1857, category: 'Fransız Edebiyatı', emoji: '🌹', color: '#7a3a5a', ready: true },
  { list: 'klasik', id: 'gurur-ve-onyargi', title: 'Gurur ve Önyargı', author: 'Jane Austen', year: 1813, category: 'İngiliz Edebiyatı', emoji: '💌', color: '#4a6b5a', ready: true },
  { list: 'klasik', id: 'ugultulu-tepeler', title: 'Uğultulu Tepeler', author: 'Emily Brontë', year: 1847, category: 'İngiliz Edebiyatı', emoji: '🌬️', color: '#3a4a5a', ready: true },
  { list: 'klasik', id: 'bulbulu-oldurmek', title: 'Bülbülü Öldürmek', author: 'Harper Lee', year: 1960, category: 'Amerikan Edebiyatı', emoji: '🐦', color: '#5a6a3a', ready: true },
  { list: 'klasik', id: 'donusum', title: 'Dönüşüm', author: 'Franz Kafka', year: 1915, category: 'Alman Edebiyatı', emoji: '🪲', color: '#3a4a2a', ready: true },
  { list: 'klasik', id: 'yabanci', title: 'Yabancı', author: 'Albert Camus', year: 1942, category: 'Fransız Edebiyatı', emoji: '☀️', color: '#a0702a', ready: true },
  { list: 'klasik', id: 'karamazov-kardesler', title: 'Karamazov Kardeşler', author: 'Fyodor Dostoyevski', year: 1880, category: 'Rus Edebiyatı', emoji: '⛪', color: '#4a2a2a', ready: true },
  { list: 'klasik', id: 'buyuk-umutlar', title: 'Büyük Umutlar', author: 'Charles Dickens', year: 1861, category: 'İngiliz Edebiyatı', emoji: '🎩', color: '#2a4a5a', ready: true },
  { list: 'klasik', id: 'monte-kristo-kontu', title: 'Monte Kristo Kontu', author: 'Alexandre Dumas', year: 1844, category: 'Fransız Edebiyatı', emoji: '🗝️', color: '#1f3a5a', ready: true },
  { list: 'klasik', id: 'notre-dame-in-kamburu', title: "Notre Dame'ın Kamburu", author: 'Victor Hugo', year: 1831, category: 'Fransız Edebiyatı', emoji: '🔔', color: '#4a3a5a', ready: true },
  { list: 'klasik', id: 'fareler-ve-insanlar', title: 'Fareler ve İnsanlar', author: 'John Steinbeck', year: 1937, category: 'Amerikan Edebiyatı', emoji: '🌾', color: '#7a6a2a', ready: true },
  { list: 'klasik', id: 'kucuk-prens', title: 'Küçük Prens', author: 'Antoine de Saint-Exupéry', year: 1943, category: 'Fransız Edebiyatı', emoji: '🌹', color: '#2a5a7a', ready: true },
  { list: 'klasik', id: 'yuzyillik-yalnizlik', title: 'Yüzyıllık Yalnızlık', author: 'Gabriel García Márquez', year: 1967, category: 'Latin Amerika Edebiyatı', emoji: '🦋', color: '#2a6a4a', ready: true },
  { list: 'klasik', id: 'oliver-twist', title: 'Oliver Twist', author: 'Charles Dickens', year: 1838, category: 'İngiliz Edebiyatı', emoji: '🥣', color: '#5a4a3a', ready: true },
  { list: 'klasik', id: 'simyaci', title: 'Simyacı', author: 'Paulo Coelho', year: 1988, category: 'Latin Amerika Edebiyatı', emoji: '🏜️', color: '#a0602a', ready: true },
];
