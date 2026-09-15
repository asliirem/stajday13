/**
 * index.js
 *
 * Cari listeleme servisinin farklı arama kriterleriyle ve bakiye/limit
 * kontrolüyle nasıl çalıştığını gösteren demo çalıştırıcı.
 *
 * Çalıştırmak için: node index.js
 */

const { listCariler, getCariDetail } = require("./cariService");

function printList(title, results) {
  console.log(`\n${title} (${results.length} kayıt)`);
  results.forEach((c) => console.log(`  ${c.code} - ${c.name}`));
}

// 1) İsme göre arama
printList('İsim araması: "market"', listCariler({ name: "market" }));

// 2) Cari koduna göre arama
printList('Kod araması: "CR-00"', listCariler({ code: "CR-00" }));

// 3) Kriter verilmeden tüm liste
printList("Tüm cariler", listCariler());

// 4) Bakiye/limit kontrolü
console.log("\n--- Cari Detay ve Limit Kontrolü ---");
["CR-001", "CR-002", "CR-099"].forEach((code) => {
  const detail = getCariDetail(code);
  if (!detail) {
    console.log(`\n${code}: Cari bulunamadı.`);
    return;
  }
  console.log(`\n${detail.code} - ${detail.name}`);
  console.log(`  Yetkili: ${detail.contactPerson} | Tel: ${detail.phone}`);
  console.log(`  Bakiye: ${detail.balance} TL | Limit: ${detail.creditLimit} TL`);
  console.log(`  Kalan Limit: ${detail.remainingLimit} TL`);
  if (detail.warning) {
    console.log(`  UYARI: ${detail.warning}`);
  } else {
    console.log("  Durum: Limit dahilinde.");
  }
});
