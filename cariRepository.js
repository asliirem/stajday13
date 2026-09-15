/**
 * cariRepository.js
 *
 * Cari kartlarını tutan basit bir mock veri kaynağı.
 * Gerçek sistemde bu bilgiler veritabanından okunur, örn:
 *
 *   SELECT cari_kodu, unvan, yetkili, telefon, adres, vergi_no,
 *          bakiye, limit
 *   FROM cari_kartlar
 *   WHERE unvan LIKE '%...%' OR cari_kodu LIKE '%...%';
 *
 * Her satış ve tahsilat işlemi, ilgili cari kart ile ilişkilendirilir.
 */

const cariler = [
  {
    code: "CR-001",
    name: "Aydın Gıda Ltd. Şti.",
    contactPerson: "Serkan Aydın",
    phone: "0532 111 22 33",
    address: "Organize Sanayi Bölgesi, Kayseri",
    taxId: "8451029384",
    balance: 24500.0,
    creditLimit: 50000.0,
  },
  {
    code: "CR-002",
    name: "Merkez Market A.Ş.",
    contactPerson: "Elif Kaya",
    phone: "0533 222 33 44",
    address: "Cumhuriyet Cad. No:12, Kayseri",
    taxId: "7123048512",
    balance: 61200.0,
    creditLimit: 60000.0,
  },
  {
    code: "CR-003",
    name: "Karataş Toptan Gıda",
    contactPerson: "Murat Karataş",
    phone: "0534 333 44 55",
    address: "Sanayi Mah. 5. Sk., Kayseri",
    taxId: "6598321045",
    balance: 8300.0,
    creditLimit: 40000.0,
  },
  {
    code: "CR-004",
    name: "Yeşilova Market Zinciri",
    contactPerson: "Derya Yeşilova",
    phone: "0535 444 55 66",
    address: "Talas, Kayseri",
    taxId: "5501298734",
    balance: 15750.0,
    creditLimit: 30000.0,
  },
];

function getAll() {
  return [...cariler];
}

function findByCode(code) {
  return cariler.find((c) => c.code === code) || null;
}

module.exports = { getAll, findByCode };
