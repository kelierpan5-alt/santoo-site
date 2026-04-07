(function initSantooSystem() {
  // ... 前面变量定义保持不变 ...
  const layer = document.getElementById("introSequence");
  const mark = document.getElementById("introSantoo");
  const videoWrap = document.querySelector(".intro-video-wrap");
  const video = document.getElementById("introVideo");
  const still8k = document.querySelector(".intro-hero8k");
  const mainPage = document.getElementById("mainPage");
  const structure = document.getElementById("structureContainer");
  const content = document.getElementById("systemLabel");

  const VIDEO_DURATION = 11; 

  // 强化版多语言切换：渐隐渐显 + 位置固定
  window.switchLang = function(lang) {
    const targets = document.querySelectorAll('[data-en]');
    
    // 1. 整体开始渐隐
    gsap.to(targets, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        // 2. 隐去时更换文本
        targets.forEach(el => {
          const text = el.getAttribute(`data-${lang}`);
          if (text) el.innerText = text;
        });

        // 更新按钮显示的文字
        const langNames = { 'en': 'LANGUAGE', 'zh': '语言', 'ja': '言語' };
        const btn = document.getElementById('current-lang');
        if(btn) btn.innerText = langNames[lang];

        // 3. 换好后渐显
        gsap.to(targets, {
          opacity: 1,
          duration: 0.4,
          ease: "power1.out"
        });
      }
    });

    localStorage.setItem('santoo-lang', lang);
  }

  // --- 进场动画与初始化逻辑保持不变 ---
  function finishEverything() {
    if (structure) structure.classList.add("has-hero8k");
    if (mainPage) mainPage.style.visibility = "visible";
    requestAnimationFrame(() => {
      gsap.to(layer, { opacity: 0, duration: 1, onComplete: () => {
        if (layer) layer.remove();
        gsap.to(content, { opacity: 1, y: -20, duration: 1.2 });
      }});
    });
  }

  function handleStart() {
    if(video) video.play().catch(() => finishEverything());
    gsap.set(videoWrap, { opacity: 1, zIndex: 15 });
    const tl = gsap.timeline();
    tl.to(mark, { opacity: 0, duration: 0.4 }).to(".intro-white", { opacity: 0, duration: 0.8 }, 0.2);
    gsap.delayedCall(VIDEO_DURATION - 1.2, () => {
      gsap.to(still8k, { opacity: 1, duration: 1.2 });
      gsap.to(videoWrap, { opacity: 0, duration: 1.2, onComplete: finishEverything });
    });
  }

  const savedLang = localStorage.getItem('santoo-lang') || 'en';
  // 初始化不需要动画，直接显示
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute(`data-${savedLang}`);
    if (text) el.innerText = text;
  });

  if (mark && video) {
    mark.addEventListener("click", handleStart, { once: true });
  } else {
    if (structure) structure.classList.add("has-hero8k");
    if (mainPage) mainPage.style.visibility = "visible";
    if (content) gsap.set(content, { opacity: 1 });
  }
})();
