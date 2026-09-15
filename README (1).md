# Cari Listeleme Servisi (Demo)

Bu proje, staj günlüğünde (13. gün) anlatılan **cari hesap yapısı** ve
**cari listeleme servisinin** basit bir örneğidir. Müşteri/tedarikçi
kayıtlarının (cari kartların) isim veya cari koduna göre nasıl aranıp
listelendiğini, ayrıca bakiye/kredi limiti kontrolünün nasıl yapıldığını
gösterir.

Gerçek bir ERP bağlantısı yoktur; cari kayıtları mock (sahte) bir veri
kaynağından okunur. Amaç, staj sürecinde gözlemlenen cari hesap mantığını
göstermektir.

## Cari Kart İçeriği

Her cari kart için şu bilgiler tutulur (günlükte belirtildiği gibi):

- Cari kodu
- Firma adı
- Yetkili kişi
- Telefon
- Adres
- Vergi numarası
- Bakiye
- Kredi limiti

## Servis Özellikleri

- **`listCariler(criteria)`**: İsim ve/veya cari koduna göre filtreleme
  yapar; kriter verilmezse tüm cariler listelenir. Gereksiz veri
  getirmemek için sadece kritere uyan kayıtlar döner.
- **`getCariDetail(code)`**: Bir carinin detayını, bakiye ile kredi
  limitinin karşılaştırıldığı bir değerlendirmeyle birlikte döner.
  Bakiye limiti aşıyorsa kullanıcıya gösterilecek bir uyarı metni
  üretilir — günlükte anlatılan "limit üzerine çıkılması durumunda
  uyarı" senaryosunu temsil eder.

## Dosya Yapısı

```
cari-listeleme-servisi/
├── cariRepository.js   # Cari kartları (mock veri kaynağı)
├── cariService.js        # Listeleme + bakiye/limit kontrolü
├── index.js                # Örnek aramalarla demo çalıştırıcı
└── README.md
```

## Nasıl Çalıştırılır

Node.js (v14+) yüklü olması yeterlidir, ek bir paket gerekmez.

```bash
node index.js
```

Çalıştırıldığında şu senaryolar gösterilir:

- İsme göre arama (örn. "market" geçen cariler)
- Cari koduna göre arama
- Kriter verilmeden tüm carilerin listelenmesi
- Limit dahilinde bir cari ve limitini aşmış bir cari için detay/uyarı
  gösterimi
- Var olmayan bir cari kodu için "bulunamadı" sonucu

## Not

Bu, gerçek bir üretim sistemi değil, eğitim/staj amaçlı hazırlanmış bir
demo çalışmasıdır. `cariRepository.js` içindeki yorum satırında, gerçek
sistemde bu verinin nasıl bir SQL sorgusuyla okunabileceğine dair örnek
de yer almaktadır. Bu servis, önceki günlerde hazırlanan
`siparis-olusturma-servisi` projesindeki cari seçimi adımıyla doğrudan
ilişkilidir.
