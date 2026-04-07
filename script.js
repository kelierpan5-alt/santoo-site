/**
 * SANTOO 核心脚本 - 修复视频播放与页面锁定
 */

(function initSantooSystem() {
  const layer = document.getElementById("introSequence");
  const mark = document.getElementById("introSantoo");
  const videoWrap = document.querySelector(".intro-video-wrap");
  const video = document.getElementById("introVideo");
  const still8k = document.querySelector(".intro-hero8k");
  const mainPage = document.getElementById("mainPage");
  const structure = document.getElementById("structureContainer");
  const content = document.getElementById("systemLabel");

  const VIDEO_DURATION = 11; // 视频时长（秒）

  function finishEverything() {
    structure.classList.add("has-hero8k");
    mainPage.style.visibility = "visible";
    
    // 移除动画层并显示内容
    if (layer) layer.remove();
    gsap.to(content, { opacity: 1, y: -20, duration: 1, ease: "power2.out" });
  }

  function handleStart() {
    // 关键修复 1：在点击的一瞬间立即触发播放，获取浏览器授权
    video.play().catch(err => {
      console.error("视频启动失败:", err);
      // 如果视频真的加载不出来，3秒后强制跳过
      setTimeout(finishEverything, 3000);
    });

    // 关键修复 2：立即将视频层提升到白底之上
    gsap.set(videoWrap, { zIndex: 15 });

    const tl = gsap.timeline({
      onComplete: finishEverything
    });

    // 动画序列
    tl.to(mark, { opacity: 0, duration: 0.4, ease: "power2.in" })
      .to(".intro-white", { opacity: 0, duration: 0.8 }, 0.2)
      .to(videoWrap, { opacity: 1, duration: 0.8 }, 0.2);

    // 视频结束前的叠化
    const fadeOutTime = 0.2 + VIDEO_DURATION - 0.8;
    tl.to(videoWrap, { opacity: 0, duration: 0.8 }, fadeOutTime)
      .to(still8k, { opacity: 1, duration: 0.8 }, fadeOutTime);
  }

  if (mark && video) {
    // 预热视频
    video.load();
    mark.addEventListener("click", handleStart, { once: true });
  } else {
    finishEverything();
  }
})();
