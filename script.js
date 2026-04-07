/**
 * Santoo 结构系统 - 进场控制逻辑
 */

(function initSantooIntro() {
  // 获取 DOM 元素
  const layer = document.getElementById("introSequence");
  const mark = document.getElementById("introSantoo");
  const videoWrap = layer?.querySelector(".intro-video-wrap");
  const video = document.getElementById("introVideo");
  const still8k = layer?.querySelector(".intro-hero8k");
  const mainPage = document.getElementById("mainPage");
  const structure = document.getElementById("structureContainer");
  const content = document.getElementById("systemLabel");

  // 视频配置
  const VIDEO_DURATION = 11; // 对应你的 intro.mp4 时长

  function finishIntro() {
    // 1. 设置主页面背景
    structure.classList.add("has-hero8k");
    // 2. 显示主页面内容
    mainPage.classList.remove("page--behind-intro");
    mainPage.style.visibility = "visible";
    mainPage.setAttribute("aria-hidden", "false");
    
    // 3. 移除进场动画层
    if (layer) layer.remove();

    // 4. 直接触发内容淡入（取代原本的滚动触发）
    gsap.to(content, { opacity: 1, y: -20, duration: 1.2, ease: "power2.out" });
  }

  function startSequence() {
    // 立即隐藏按钮，防止重复点击
    mark.style.pointerEvents = "none";

    // 创建 GSAP 时间轴
    const tl = gsap.timeline({
      onComplete: finishIntro
    });

    // 步骤 1: 按钮淡出 (0s - 0.5s)
    tl.to(mark, { autoAlpha: 0, duration: 0.5 });

    // 步骤 2: 视频准备并播放 (0.5s 时启动)
    tl.call(() => {
      videoWrap.style.visibility = "visible";
      video.play().catch(e => console.warn("播放被拦截:", e));
    }, null, 0.5);

    // 步骤 3: 白底淡出，露出视频 (0.5s - 1.2s)
    tl.to(".intro-white", { autoAlpha: 0, duration: 0.7 }, 0.5);
    tl.to(videoWrap, { opacity: 1, duration: 0.7 }, 0.5);

    // 步骤 4: 视频播放期间保持 (持续 VIDEO_DURATION)
    const fadeOutStart = 0.5 + VIDEO_DURATION;

    // 步骤 5: 视频淡出，8K 静态图淡入 (视频结束前 0.8s 开始叠化)
    tl.to(videoWrap, { autoAlpha: 0, duration: 0.8 }, fadeOutStart);
    tl.to(still8k, { autoAlpha: 1, duration: 0.8 }, fadeOutStart);
  }

  // 绑定点击事件
  if (mark && video) {
    // 预加载视频
    video.load();
    mark.addEventListener("click", startSequence, { once: true });
  } else {
    finishIntro();
  }
})();
