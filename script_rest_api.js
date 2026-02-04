const SUPABASE_URL = "https://vkcgirfabwquzumgsvgy.supabase.co";
//const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzaW1hb2hlYWRqZ294aHB3eHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwNTc3MTAsImV4cCI6MjA4NDYzMzcxMH0.vzAlZl22Uqr02WhFpEC98Ud5F4cwA7Qwuj_tDpuj4O4";
const SUPABASE_KEY = "sb_publishable_YSnSFpK1kgADoDDDBPjoCA_33V0lMlc";

const tbody = document.getElementById("data-siswa");

// contoh mapping kelas
const classMap = {
  "32152e9d-96d0-45b2-8dff-95eb184d0a69": "XI-B1",
  "186fcf0b-b8d6-44ce-8e4c-31dcbea5cd9c": "XI-B2"
};

function formatTanggal(isoString) {
  const date = new Date(isoString);
  // Menggunakan Intl.DateTimeFormat untuk format yang rapi
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false // Gunakan format 24 jam
  }).format(date).replace(/\./g, ':'); // Mengganti titik jadi titik dua jika perlu
}

// Contoh Penggunaan:
const created_at = "2026-02-04 01:53:28.14688+00";
console.log(formatTanggal(created_at)); // Hasil: 04 Feb 26 08:53 (WIB otomatis)
// helper kapitalisasi nama
function capitalize(text) {
  return text
    .split(" ")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

fetch(`${SUPABASE_URL}/rest/v1/students?select=*`, {
  method: "GET",
  headers: {
    "apikey": SUPABASE_KEY,
    "Authorization": `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json"
  }
})
.then(response => {
  if (!response.ok) {
    throw new Error("Gagal mengambil data dari Supabase");
  }
  return response.json();
})
.then(students => {
  tbody.innerHTML = "";

  students.forEach((student, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${student.nisn}</td>
      <td>${student.nis}</td>
      <td>✅ ${capitalize(student.name)}</td>
      <td>${classMap[student.class_id] || "Tidak diketahui"}</td>
      <td>${formatTanggal(student.created_at)}</td>
    `;

    tbody.appendChild(row);
  });
})
.catch(error => {
  console.error(error);
  tbody.innerHTML = `
    <tr>
      <td colspan="4">Data gagal dimuat</td>
    </tr>
  `;

});





