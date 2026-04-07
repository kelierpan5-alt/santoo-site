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

  // 多语言切换函数
  window.switchLang = function(lang) {
    document.querySelectorAll('[data-en]').forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (text) el.innerText = text;
    });
    const langNames = { 'en': 'LANGUAGE', 'zh': '语言', 'ja': '言語' };
    document.getElementById('current-lang').innerText = langNames[lang];
    localStorage.setItem('santoo-lang', lang);
  }

  function finishEverything() {
    // 关键：先让主容器挂载背景，再显示主页面
    if (structure) structure.classList.add("has-hero8k");
    if (mainPage) mainPage.style.visibility = "visible";
    
    // 强制等待一帧后再移除动画层，彻底解决白屏闪烁
    requestAnimationFrame(() => {
      gsap.to(layer, { opacity: 0, duration: 1, onComplete: () => {
        if (layer) layer.remove();
        gsap.to(content, { opacity: 1, y: -20, duration: 1.2, ease: "power2.out" });
      }});
    });
  }

  function handleStart() {
    // 强制播放逻辑
    video.play().then(() => {
      gsap.set(videoWrap, { opacity: 1, zIndex: 15 });
    }).catch(() => finishEverything());
    
    const tl = gsap.timeline();
    tl.to(mark, { opacity: 0, duration: 0.4 })
      .to(".intro-white", { opacity: 0, duration: 0.8 }, 0.2);

    // 视频结束前的叠化过渡
    gsap.delayedCall(VIDEO_DURATION - 1.2, () => {
      gsap.to(still8k, { opacity: 1, duration: 1.2 });
      gsap.to(videoWrap, { opacity: 0, duration: 1.2, onComplete: finishEverything });
    });
  }

  // 1. 初始化语言
  const savedLang = localStorage.getItem('santoo-lang') || 'en';
  switchLang(savedLang);

  // 2. 绑定事件
  if (mark && video) {
    mark.addEventListener("click", handleStart, { once: true });
  } else {
    // 处理无动画层的情况（如子页面或直接访问）
    if (structure) structure.classList.add("has-hero8k");
    if (mainPage) mainPage.style.visibility = "visible";
    if (content) gsap.set(content, { opacity: 1 });
  }
})();
