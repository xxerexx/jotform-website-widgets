// Apex-only page behavior.
// Deliberately avoids generic selectors/classes so it does not touch Jotform widget DOM.
(function () {
  const apexProgress = document.getElementById("apex-scroll-progress");

  function apexUpdateProgress() {
    if (!apexProgress) return;
    const apexDocument = document.documentElement;
    const apexScrollable = apexDocument.scrollHeight - apexDocument.clientHeight;
    const apexPercent = apexScrollable > 0 ? (apexDocument.scrollTop / apexScrollable) * 100 : 0;
    apexProgress.style.width = apexPercent + "%";
  }

  window.addEventListener("scroll", apexUpdateProgress, { passive: true });
  apexUpdateProgress();
})();
