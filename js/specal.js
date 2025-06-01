// Function to scroll to a section
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  } else {
    console.error(`Section with ID ${sectionId} not found.`);
  }
}

// Fungsi untuk menampilkan atau menyembunyikan tombol scroll-up
window.addEventListener("scroll", function () {
  const scrollUpButton = document.getElementById("scroll-up");
  if (window.scrollY > 300) {
    // Muncul setelah scroll lebih dari 300px
    scrollUpButton.style.display = "flex";
  } else {
    scrollUpButton.style.display = "none";
  }
});

// Cek posisi scroll saat halaman pertama kali dimuat
window.addEventListener("DOMContentLoaded", function () {
  const scrollUpButton = document.getElementById("scroll-up");
  if (window.scrollY > 300) {
    // Jika halaman sudah di-scroll sebelum di-reload
    scrollUpButton.style.display = "flex";
  } else {
    scrollUpButton.style.display = "none";
  }
});

// Fungsi untuk kembali ke atas halaman saat tombol diklik
document.getElementById("scroll-up").addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Gulir halus ke bagian atas
  });
});

// Function to update dates in the table
document.addEventListener("DOMContentLoaded", () => {
  const rows = document.querySelectorAll(".volume-container tbody tr");

  rows.forEach((row) => {
    const dateCell = row.querySelector("td:nth-child(3)");
    const date = row.dataset.date;

    const updateTime = () => {
      const now = new Date();
      const chapterDate = new Date(date);
      const timeDiff = now - chapterDate;

      const secondsDiff = Math.floor(timeDiff / 1000);
      const minutesDiff = Math.floor(secondsDiff / 60);
      const hoursDiff = Math.floor(minutesDiff / 60);
      const daysDiff = Math.floor(hoursDiff / 24);
      const monthsDiff = Math.floor(daysDiff / 30); // Approximate month length
      const yearsDiff = Math.floor(daysDiff / 365); // Approximate year length

      let displayText;

      if (yearsDiff > 0) {
        displayText = `${yearsDiff} years ago`;
      } else if (monthsDiff > 0) {
        displayText = `${monthsDiff} months ago`;
      } else if (daysDiff > 0) {
        displayText = `${daysDiff} days ago`;
      } else if (hoursDiff > 0) {
        displayText = `${hoursDiff} hours ago`;
      } else if (minutesDiff > 0) {
        displayText = `${minutesDiff} minutes ago`;
      } else if (secondsDiff > 0) {
        displayText = `${secondsDiff} seconds ago`;
      }

      // Get current time in the Indonesian timezone (WIB)
      const currentTime = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Jakarta",
      });
      displayText;
      //  += ` at ${currentTime} WIB`
      dateCell.textContent = displayText;
    };

    if (date) {
      updateTime();
      // Update the time every second to keep it live
      setInterval(updateTime, 1000);
    } else {
      dateCell.textContent = "Date not available";
    }
  });
});

// Function tombol baca selengkapnya
function toggleSynopsis() {
  const synopsisText = document.getElementById("synopsis-text");
  const toggleButton = document.getElementById("toggle-synopsis");

  if (synopsisText.classList.contains("expanded")) {
    synopsisText.classList.remove("expanded");
    toggleButton.textContent = "...Baca Selengkapnya";
  } else {
    synopsisText.classList.add("expanded");
    toggleButton.textContent = "Tampilkan Lebih Sedikit";
  }
}

// Function pagination volume 1
document.addEventListener("DOMContentLoaded", () => {
  const rowsPerPage = 8;
  const tableBody = document.querySelector(".volume-container tbody");
  const rows = Array.from(tableBody.querySelectorAll("tr"));
  const totalPages = Math.ceil(rows.length / rowsPerPage);
  let currentPage = 1;

  function showPage(page) {
    // Ensure the page number is within the valid range
    if (page < 1 || page > totalPages) return;

    currentPage = page;
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    // Hide all rows and then show only those for the current page
    rows.forEach((row, index) => {
      row.style.display = index >= startIndex && index < endIndex ? "" : "none";
    });

    // Update page number display
    document.getElementById("page-number").textContent = `Page ${currentPage}`;

    // Update visibility of pagination controls
    updatePaginationControls();
  }

  function updatePaginationControls() {
    const prevPageButton = document.getElementById("prev-page");
    const nextPageButton = document.getElementById("next-page");

    // Show or hide the Previous button
    prevPageButton.style.display = currentPage > 1 ? "inline-block" : "none";

    // Show or hide the Next button
    nextPageButton.style.display =
      currentPage < totalPages ? "inline-block" : "none";
  }

  function setupPagination() {
    document.getElementById("prev-page").addEventListener("click", () => {
      if (currentPage > 1) showPage(currentPage - 1);
    });

    document.getElementById("next-page").addEventListener("click", () => {
      if (currentPage < totalPages) showPage(currentPage + 1);
    });

    // Initial page display
    showPage(currentPage);
  }

  setupPagination();
});

// function alerts author
document.getElementById("author-link").addEventListener("click", function (e) {
  e.preventDefault(); // Mencegah aksi default dari href
  Swal.fire({
    title: "Oops!",
    text: "Mohon Maaf, Sang author tidak ingin menampilkan informasi pribadi ataupun social media.",
    icon: "error",
    confirmButtonText: "Back",
    customClass: {
      container: "swal-container",
    },
  });
});

// Url Function
// Mendapatkan path dari URL saat ini
let currentPath = window.location.pathname;

// Mengecek apakah path diakhiri dengan ".html"
if (currentPath.endsWith(".html")) {
  // Menghapus ".html" dari akhir path
  let newPath = currentPath.slice(0, -5);

  // Mengubah URL tanpa memuat ulang halaman
  window.history.replaceState(null, "", newPath);
}
