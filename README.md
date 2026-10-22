# Klasik Özetler

Dünya klasikleri ve seçkin kitapların resimli, sayfa sayfa okunan Türkçe özetleri. Telefonda, tablette ve bilgisayarda çalışan, ana ekrana eklenebilen ve çevrimdışı okunabilen bir web uygulamasıdır (PWA).

## Çalıştırma

Derleme adımı yoktur; düz HTML, CSS ve JavaScript'tir. Özetler ayrı dosyalardan yüklendiği için bir yerel sunucu gerekir:

```bash
python -m http.server 8080
```

Ardından tarayıcıda `http://localhost:8080` adresini açın.

## Yapı

| Yol | İçerik |
|---|---|
| `index.html`, `style.css`, `app.js` | Uygulama: kitap listesi, okuma ekranı, tema, yazı boyutu, kaydırarak sayfa çevirme |
| `data/books.js` | Kitap kataloğu (başlık, yazar, yıl, tür, bölüm) |
| `data/scenes.js` | Sahne çizimlerini üreten ortak SVG yardımcıları |
| `data/summaries/<id>.js` | Her kitabın sayfaları ve sahneleri |
| `sw.js`, `manifest.json`, `icons/` | Çevrimdışı okuma ve ana ekrana ekleme |

## Yeni kitap eklemek

1. `data/books.js` içine bir satır ekleyin (`id`, `title`, `author`, `year`, `category`, `list`, `ready: true`).
2. `data/summaries/<id>.js` dosyasını mevcut bir özeti örnek alarak oluşturun.
3. `sw.js` içindeki `VERSION` değerini artırın.

Bir kitaba gerçek bir kapak görseli vermek için `books.js` satırına `cover: 'covers/dosya.jpg'` ekleyin; verilmezse özetin ilk sahnesi kapak olarak kullanılır. Bir sayfadaki çizimi gerçek bir resimle değiştirmek için o sayfanın `image` alanına `{ src: 'yol/resim.jpg', caption: '…' }` yazın.
