(() => {
  const config = window.ITANTRA_CONFIG || {};
  const viewVideoBtn = document.getElementById("viewVideoBtn");
  const downloadBtn = document.getElementById("downloadBtn");
  const modal = document.getElementById("videoModal");
  const frame = document.getElementById("videoFrame");
  const closeBtn = document.getElementById("closeVideoBtn");
  const backdrop = document.getElementById("modalBackdrop");
  const openDriveBtn = document.getElementById("openDriveBtn");

  function getDriveFileId(url) {
    if (!url || url.includes("PASTE_YOUR")) return null;
    for (const pattern of [/\/file\/d\/([a-zA-Z0-9_-]+)/, /[?&]id=([a-zA-Z0-9_-]+)/]) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  }

  const driveUrl = config.videoDriveUrl || "";
  const driveFileId = getDriveFileId(driveUrl);

  if (config.apkUrl && !config.apkUrl.includes("YOUR_USERNAME")) {
    downloadBtn.href = config.apkUrl;
  } else {
    downloadBtn.addEventListener("click", (e) => {
      e.preventDefault();
      alert("APK download is not configured yet. Update apkUrl in config.js.");
    });
  }

  function openVideo() {
    if (!driveFileId) {
      if (driveUrl) window.open(driveUrl, "_blank", "noopener,noreferrer");
      else alert("Video is not configured yet. Add your Google Drive link in config.js.");
      return;
    }
    frame.src = `https://drive.google.com/file/d/${driveFileId}/preview`;
    openDriveBtn.href = driveUrl;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function closeVideo() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    frame.src = "";
    document.body.style.overflow = "";
  }

  viewVideoBtn.addEventListener("click", openVideo);
  closeBtn.addEventListener("click", closeVideo);
  backdrop.addEventListener("click", closeVideo);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeVideo();
  });
})();
