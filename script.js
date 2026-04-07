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
    // 1. 确保主页面可见并挂载背景
    if (mainPage) {
        mainPage.style.visibility = "visible";
        structure.classList.add("has-hero8k");
    }
    
    // 2. 动画移除进场层，防止瞬间闪白
    gsap.to(layer, {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        if (layer) layer.remove();
        // 3. 背景稳固后淡入文字
        gsap.to(content, { opacity: 1, y: -20, duration: 1.2 });
      }
    });
  }

  function handleStart() {
    // 解决黑屏：立即执行 load 并 play
    video.load();
    const playPromise = video.play();

    // 提升视频层级并显示
    gsap.set(videoWrap, { opacity: 1, zIndex: 15 });

    const tl = gsap.timeline();

    // 步骤 A: 按钮消失
    tl.to(mark, { opacity: 0, duration: 0.4 });
    
    // 步骤 B: 白底消失，此时视频应已在下方播放
    tl.to(".intro-white", { opacity: 0, duration: 0.8 }, 0.2);

    if (playPromise !== undefined) {
      playPromise.then(() => {
        // 视频正常播放，设定在结束前 1秒 进行叠化
        gsap.delayedCall(VIDEO_DURATION - 1, () => {
          gsap.to(still8k, { opacity: 1, duration: 1 });
          gsap.to(videoWrap, { opacity: 0, duration: 1, onComplete: finishEverything });
        });
      }).catch(err => {
        console.warn("视频播放受阻:", err);
        finishEverything();
      });
    } else {
      finishEverything();
    }
  }

  if (mark && video) {
    mark.addEventListener("click", handleStart, { once: true });
  } else {
    // 处于子页面或异常状态，直接显示主内容
    if (structure) structure.classList.add("has-hero8k");
    if (mainPage) mainPage.style.visibility = "visible";
    if (content) gsap.set(content, { opacity: 1 });
  }
})();
