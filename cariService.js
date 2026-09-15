/**
 * cariService.js
 *
 * Cari listeleme servisinin genel çalışma mantığı:
 * kullanıcının verdiği arama kriterlerine göre (isim ve/veya cari kodu)
 * ilgili kayıtlar filtrelenip listelenir. Gereksiz veri getirmemek için
 * sadece kritere uyan kayıtlar döndürülür.
 *
 * Ayrıca, sipariş oluşturulmadan önce yapılan bakiye/limit kontrolü de
 * burada yer alır: cari, tanımlı kredi limitini aşmışsa kullanıcı
 * uyarılır.
 */

const { getAll, findByCode } = require("./cariRepository");

/**
 * Cari kartları isim ve/veya cari koduna göre filtreleyerek listeler.
 * criteria: { name?: string, code?: string }
 */
function listCariler(criteria = {}) {
  const nameFilter = (criteria.name || "").trim().toLocaleLowerCase("tr-TR");
  const codeFilter = (criteria.code || "").trim().toLocaleLowerCase("tr-TR");

  return getAll().filter((c) => {
    const matchesName = !nameFilter || c.name.toLocaleLowerCase("tr-TR").includes(nameFilter);
    const matchesCode = !codeFilter || c.code.toLocaleLowerCase("tr-TR").includes(codeFilter);
    return matchesName && matchesCode;
  });
}

/**
 * Bir carinin detayını, bakiye/limit durumu değerlendirmesiyle birlikte döner.
 * Cari bulunamazsa null döner.
 */
function getCariDetail(code) {
  const cari = findByCode(code);
  if (!cari) return null;

  const remaining = Number((cari.creditLimit - cari.balance).toFixed(2));
  const overLimit = cari.balance > cari.creditLimit;

  return {
    ...cari,
    remainingLimit: remaining,
    overLimit,
    warning: overLimit
      ? `Dikkat: ${cari.name} tanımlı kredi limitini aştı (bakiye: ${cari.balance} TL, limit: ${cari.creditLimit} TL).`
      : null,
  };
}

module.exports = { listCariler, getCariDetail };
