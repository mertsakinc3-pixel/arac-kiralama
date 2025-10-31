import json
import os
import time
import glob
from icrawler.builtin import GoogleImageCrawler
from PIL import Image

# 1️⃣ JSON dosyasını oku
with open("cars.json", "r", encoding="utf-8") as f:
    data = json.load(f)

cars = data["cars"]

# 2️⃣ Klasörleri hazırla
os.makedirs("car_images_webp", exist_ok=True)
os.makedirs("temp", exist_ok=True)

# 3️⃣ Her araç için işlemler
for car in cars:
    folder_name = car.replace(" ", "_").replace("/", "_")
    temp_path = os.path.join("temp", folder_name)
    final_path = os.path.join("car_images_webp", folder_name)
    
    os.makedirs(temp_path, exist_ok=True)
    os.makedirs(final_path, exist_ok=True)
    
    print(f"📸 {car} indiriliyor...")
    
    # Gerçek arka planlarla arama
    search_keywords = [
        f"{car} side view on road",
        f"{car} outdoor photography",
        f"{car} city street view"
    ]
    
    crawler = GoogleImageCrawler(storage={"root_dir": temp_path})
    # Her anahtar kelime için 1 görsel (toplam 3)
    for idx, keyword in enumerate(search_keywords):
        crawler.crawl(keyword=keyword, max_num=1, offset=idx)
    
    time.sleep(1)
    
    for img_path in glob.glob(f"{temp_path}/*"):
        try:
            img = Image.open(img_path).convert("RGB")
            img = img.resize((1920, 1080))
            out_path = os.path.join(final_path, os.path.basename(img_path).split('.')[0] + ".webp")
            img.save(out_path, "WEBP", quality=80, method=6)
            print(f"  ✅ {os.path.basename(out_path)} oluşturuldu")
        except Exception as e:
            print(f"  ⚠️ {img_path} işlenemedi: {e}")

print("\n✅ Tüm araç resimleri indirildi ve optimize edildi!")
print(f"📁 Toplam {len(cars)} araç klasörü oluşturuldu: car_images_webp/")

