# Kurs Uygulaması

Bu, React'in ileri düzey kavramlarını ve özelliklerini (durum yönetimi, yönlendirme ve bileşen mimarisi gibi) göstermek için oluşturulmuş bir **React** projesidir. Bu kurs React Router ile ileri seviye React öğrenimi için kullanılmıştır.

## Özellikler

- **Dinamik Yönlendirme**: Sayfalar arasında sorunsuz gezinme.
- **Durum Yönetimi**: Uygulama durumunu verimli bir şekilde yönetme.
- **Yeniden Kullanılabilir Bileşenler**: Modüler ve yeniden kullanılabilir UI bileşenleri.
- **Duyarlı Tasarım**: Farklı ekran boyutları için optimize edilmiştir.

## Kurulum

1. Depoyu klonlayın:
   ```bash
   git clone https://github.com/your-username/course-app.git
   ```
2. Proje dizinine gidin:
   ```bash
   cd course-app
   ```
3. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

## Kullanım

Geliştirme sunucusunu başlatın:

```bash
npm start
```

Uygulama `http://localhost:3000` adresinde kullanılabilir olacaktır.

## Komutlar

- `npm start`: Geliştirme sunucusunu başlatır.
- `npm run build`: Projeyi üretim için derler.
- `npm test`: Testleri çalıştırır.

## Kullanılan Teknolojiler

- **React**: Frontend kütüphanesi.
- **React Router**: Yönlendirme için.
- **CSS Modülleri**: Scoped stil yönetimi.
- **Node.js**: Backend çalışma zamanı.

## Klasör Yapısı

```
course-app/
├── public/         # Statik varlıklar
├── src/
│   ├── components/ # Yeniden kullanılabilir bileşenler
│   ├── pages/      # Sayfa bileşenleri
│   ├── styles/     # CSS dosyaları
│   └── App.js      # Ana uygulama bileşeni
├── package.json    # Proje meta verileri
└── README.md       # Proje dokümantasyonu
```

## Lisans

Bu proje [MIT Lisansı](LICENSE) ile lisanslanmıştır.
