// Toggle language dropdown
document.querySelector(".lang-flag").addEventListener("click", function () {
  document.querySelector(".language-dropdown").classList.toggle("open");
});

// Update flag and close dropdown on selection
document.querySelectorAll(".lang-list .lang").forEach(function (langItem) {
  langItem.addEventListener("click", function () {
      const selectedFlag = langItem.querySelector("img").src;
      document.querySelector(".lang-flag img").src = selectedFlag;
      document.querySelector(".language-dropdown").classList.remove("open");
  });
});
