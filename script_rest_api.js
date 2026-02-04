const SUPABASE_URL = "https://psimaoheadjgoxhpwxrn.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzaW1hb2hlYWRqZ294aHB3eHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwNTc3MTAsImV4cCI6MjA4NDYzMzcxMH0.vzAlZl22Uqr02WhFpEC98Ud5F4cwA7Qwuj_tDpuj4O4";

const tbody = document.getElementById("data-siswa");

// contoh mapping kelas
const classMap = {
  "dbd0c540-31d4-4d26-9650-81d2327b8b00": "XI-C1",
  "281a8307-2387-4e3a-aea3-d60e01c9ae0d": "XI-C2"
};

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
      <td>${student.nis}</td>
      <td>✅ ${capitalize(student.name)}</td>
      <td>${classMap[student.class_id] || "Tidak diketahui"}</td>
      <td>${student.created_at}</td>
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



