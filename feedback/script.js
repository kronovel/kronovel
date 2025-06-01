// Mengecek apakah URL berakhir dengan index.html
if (window.location.pathname.endsWith("index.html")) {
  // Mengganti URL di address bar, tanpa melakukan reload halaman
  var newUrl = window.location.pathname.replace("index.html", "");
  window.history.pushState({}, "", newUrl);
}
