(function initSantooSystem() {
  const layer = document.getElementById("introSequence");
  const mark = document.getElementById("introSantoo");
  const videoWrap = document.querySelector(".intro-video-wrap");
  const video = document.getElementById("introVideo");
  const still8k = document.querySelector(".intro-hero8k");
  const mainPage = document.getElementById("mainPage");
  const structure = document.getElementById("structureContainer");
  const content = document.getElementById("systemLabel");

  const VIDEO_DURATION = 11; // 视频总长度

  function finishSequence() {
    // 强制挂载背景图，防止删掉动画层后变白
    structure.classList.add("has-hero8k");
    mainPage.style.visibility = "visible";
    
    // 确保主内容可见
    gsap.to(content, { opacity: 1, y: -20, duration: 1.5, ease: "power2.out" });
    
    // 彻底移除动画层
    if (layer) {
      gsap.to(layer, { opacity: 0, duration: 1, onComplete: () => layer.remove() });
    }
  }

  function handleStart() {
    // 关键：点击瞬间唤醒视频，防止黑屏
    video.load();
    video.play().then(() => {
      // 成功播放后立即提升层级
      gsap.set(videoWrap, { visibility: "visible", opacity: 1, zIndex: 15 });
    }).catch(e => {
      console.warn("Video blocked:", e);
      finishSequence(); // 失败则直接进入
    });

    const tl = gsap.timeline({ onComplete: finishSequence });

    // 1. 标示消失
    tl.to(mark, { opacity: 0, duration: 0.5, ease: "power2.in" });
    
    // 2. 白底消失，露出正在播放的视频
    tl.to(".intro-white", { opacity: 0, duration: 1 }, 0.5);

    // 3. 视频快结束时，叠化到静态 8K 图
    const crossfadeStart = 0.5 + VIDEO_DURATION - 1.5;
    tl.to(still8k, { opacity: 1, duration: 1.5 }, crossfadeStart);
    tl.to(videoWrap, { opacity: 0, duration: 1.5 }, crossfadeStart);
  }

  if (mark && video) {
    mark.addEventListener("click", handleStart, { once: true });
  } else if (mainPage) {
    // 如果没有动画层（子页面），直接初始化
    finishSequence();
  }
})();
