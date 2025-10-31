# 🚗 Araç Görseli İndirme Sistemi

Otomatik olarak araç görsellerini Google'dan indirip **1920×1080 WebP** formatına dönüştüren sistem.

## ✨ Özellikler

- ✅ **Gerçek arka planlar** (yol, şehir, doğa)
- ✅ **WebP formatı** (küçük boyut, yüksek kalite)
- ✅ **1920×1080 çözünürlük**
- ✅ **Otomatik optimizasyon**
- ✅ **Toplu indirme** (JSON listesinden)

## 📦 Gereksinimler

Önce gerekli kütüphaneleri yükle:

```bash
pip3 install icrawler pillow
```

## 🚀 Kullanım

1. **Script'i çalıştır:**
   ```bash
   python3 download_cars_from_json.py
   ```

2. **Sonuç:**
   - `car_images_webp/` klasöründe her araç için klasör oluşur
   - Her klasörde 1920×1080 WebP formatında görseller bulunur
   - Görseller gerçek arka planlarla (yol, şehir, doğa)

## 📁 Klasör Yapısı

```
araç-görsel/
├── cars.json                    # Araç listesi
├── download_cars_from_json.py   # Ana script
├── temp/                        # Geçici indirme klasörü
└── car_images_webp/             # Optimize edilmiş görseller
    ├── Toyota_Corolla_2024/
    │   └── 000001.webp (81KB, 1920×1080)
    ├── BMW_3_Series_2024/
    │   └── 000001.webp (45KB, 1920×1080)
    └── ...
```

## 🎯 Arama Stratejisi

Her araç için 3 farklı anahtar kelime ile arama yapılır:
1. `{araç} side view on road` - Yolda yan görünüm
2. `{araç} outdoor photography` - Açık havada profesyonel fotoğraf
3. `{araç} city street view` - Şehir sokağında görünüm

## ⚙️ Özelleştirme

### Araç Listesini Genişlet
`cars.json` dosyasına yeni araçlar ekle:
```json
{
  "cars": [
    "Tesla Model 3 2024",
    "Audi A4 2024"
  ]
}
```

### Daha Fazla Görsel İndir
`download_cars_from_json.py` içinde `max_num` değerini değiştir:
```python
crawler.crawl(keyword=keyword, max_num=5)  # 5 görsel
```

### WebP Kalitesini Ayarla
```python
img.save(out_path, "WEBP", quality=90, method=6)  # Daha yüksek kalite
```

## 📊 Performans

- **Dosya boyutu:** 45-150KB (ortalama 80KB)
- **Çözünürlük:** 1920×1080 (Full HD)
- **Format:** WebP (modern tarayıcılarda %30 daha küçük)
- **İndirme süresi:** ~10-15 saniye/araç

