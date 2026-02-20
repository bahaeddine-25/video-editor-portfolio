document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("video-modal");
  const video = document.getElementById("portfolio-video");
  const closeBtn = document.getElementById("close-video");

  document.querySelectorAll(".watch-btn").forEach(button => {
    button.addEventListener("click", function () {
      const videoSrc = this.getAttribute("data-video");
      video.src = videoSrc;
      modal.style.display = "flex";
      video.play();
    });
  });

  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
    video.pause();
    video.src = "";
  });

  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
      video.pause();
      video.src = "";
    }
  });
});
