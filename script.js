(function initSantooSystem() {
  const layer = document.getElementById("introSequence");
  const mark = document.getElementById("introSantoo");
  const videoWrap = document.querySelector(".intro-video-wrap");
  const video = document.getElementById("introVideo");
  const still8k = document.querySelector(".intro-hero8k");
  const mainPage = document.getElementById("mainPage");
  const structure = document.getElementById("structureContainer");
  const content = document.getElementById("systemLabel");

  const VIDEO_DURATION = 11; 

  function finishEverything() {
    // 关键步骤：先给主容器上背景，再删掉动画层
    structure.classList.add("has-hero8k");
    mainPage.style.visibility = "visible";
    
    // 延迟一帧移除，防止闪白
    requestAnimationFrame(() => {
      if (layer) layer.remove();
      gsap.to(content, { opacity: 1, y: -20, duration: 1.2, ease: "power2.out" });
    });
  }

  function handleStart() {
    // 1. 立即尝试播放视频
    video.muted = true; // 确保静音以获得最高播放优先级
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log("视频播放受阻，直接进入底图:", error);
        finishEverything();
      });
    }

    // 2. 提升视频层级
    gsap.set(videoWrap, { zIndex: 15, opacity: 1, visibility: "visible" });

    const tl = gsap.timeline({ onComplete: finishEverything });

    // 动画序列
    tl.to(mark, { opacity: 0, duration: 0.4 })
      .to(".intro-white", { opacity: 0, duration: 0.8 }, 0.2);

    // 在视频结束前开始叠化到静态 8k 图
    const crossfadeTime = 0.2 + VIDEO_DURATION - 1.0;
    tl.to(still8k, { opacity: 1, duration: 1 }, crossfadeTime);
    tl.to(videoWrap, { opacity: 0, duration: 1 }, crossfadeTime);
  }

  if (mark && video) {
    mark.addEventListener("click", handleStart, { once: true });
  } else {
    finishEverything();
  }
})();
