gsap.registerPlugin(ScrollTrigger);

function initHeroMotion() {
  if (initHeroMotion.done) return;
  initHeroMotion.done = true;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom bottom",
      scrub: true
    }
  });

  tl.to(".content", { autoAlpha: 1, duration: 0.2 }, 0.75)
    .to("#label2", { opacity: 1, duration: 0.15 }, 0.82)
    .to("#label3", { opacity: 1, duration: 0.15 }, 0.9);

  gsap.to(".logo-full", {
    opacity: 0,
    scrollTrigger: { trigger: ".hero", start: "top top", end: "70% top", scrub: true }
  });
  gsap.to(".logo-mark", {
    opacity: 1,
    scrollTrigger: { trigger: ".hero", start: "40% top", end: "90% top", scrub: true }
  });
  gsap.to("#logo", {
    scale: 0.72,
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
  });
}

/**
 * 進場時間軸（相對「點擊 Santoo 標識」t=0；白底與標識為靜止狀態，僅點擊標識後啟動）
 * 0.0–0.5s 標識淡出 | 0.5–1.0s 白底↔影片疊化 | 1.0s 起播放影片（長度見 VIDEO_DURATION_SEC）
 * | 影片結束時刻起 0.5s 影片↔8K 疊化 | 疊化結束後主頁穩定
 */
(function initIntroTimeline() {
  function finishIntroSkip() {
    document.body.classList.remove("intro-active");
    const elStructure = document.getElementById("structureContainer");
    const elMain = document.getElementById("mainPage");
    const elLayer = document.getElementById("introSequence");
    if (elStructure) elStructure.classList.add("has-hero8k");
    if (elMain) {
      elMain.classList.remove("page--behind-intro");
      elMain.removeAttribute("aria-hidden");
    }
    if (elLayer) elLayer.remove();
    initHeroMotion();
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }

  const layer = document.getElementById("introSequence");
  const main = document.getElementById("mainPage");
  const structure = document.getElementById("structureContainer");
  const mark = document.getElementById("introSantoo");
  const white = layer?.querySelector(".intro-white");
  const videoWrap = layer?.querySelector(".intro-video-wrap");
  const still8k = layer?.querySelector(".intro-hero8k");
  const video = document.getElementById("introVideo");

  if (!layer || !main || !structure || !mark || !white || !videoWrap || !still8k || !video) {
    finishIntroSkip();
    return;
  }

  document.body.classList.add("intro-active");

  let started = false;

  function teardownIntro() {
    document.body.classList.remove("intro-active");
    structure.classList.add("has-hero8k");
    main.classList.remove("page--behind-intro");
    main.removeAttribute("aria-hidden");
    layer.remove();
    initHeroMotion();
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }

  function onFirstActivate() {
    if (started) return;
    started = true;
    layer.style.pointerEvents = "none";

    gsap.set(videoWrap, { opacity: 0 });
    gsap.set(still8k, { opacity: 0 });
    gsap.set(white, { opacity: 1 });
    gsap.set(mark, { opacity: 1 });

    /**
     * 必須在「點擊」同一使用者啟動鏈內先請求播放，否則約 1s 後 timeline 裡的 play()
     * 會因手勢過期被瀏覽器拒絕（靜音影片亦常如此）。
     */
    video.muted = true;
    const kick = video.play();
    if (kick !== undefined) {
      kick
        .then(() => {
          video.pause();
          video.currentTime = 0;
        })
        .catch(() => {});
    }

    /** 與 `assets/intro.mp4` 實際時長一致（秒） */
    const VIDEO_DURATION_SEC = 11;
    const VIDEO_PLAY_AT = 1;
    const CROSSFADE_START = VIDEO_PLAY_AT + VIDEO_DURATION_SEC;

    const master = gsap.timeline({
      defaults: { ease: "none" },
      onComplete: teardownIntro
    });

    master.to(mark, { opacity: 0, duration: 0.5, ease: "power2.out" }, 0);
    master.to(white, { opacity: 0, duration: 0.5 }, 0.5);
    master.to(videoWrap, { opacity: 1, duration: 0.5 }, 0.5);
    master.call(
      () => {
        video.currentTime = 0;
        video.play().catch(() => {});
      },
      null,
      VIDEO_PLAY_AT
    );
    master.call(() => structure.classList.add("has-hero8k"), null, CROSSFADE_START);
    master.call(() => video.pause(), null, CROSSFADE_START);
    master.to(videoWrap, { opacity: 0, duration: 0.5 }, CROSSFADE_START);
    master.to(still8k, { opacity: 1, duration: 0.5 }, CROSSFADE_START);
  }

  mark.addEventListener("click", onFirstActivate, { once: true });
})();
