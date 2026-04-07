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

  // 多语言切换函数：缓慢、优雅的渐隐渐显
  window.switchLang = function(lang) {
    const targets = document.querySelectorAll('[data-en]');
    
    // 1. 缓慢渐隐 (0.8s)
    gsap.to(targets, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        // 2. 替换文本
        targets.forEach(el => {
          const text = el.getAttribute(`data-${lang}`);
          if (text) el.innerText = text;
        });
        
        // 更新 Language 按钮文字
        const langNames = { 'en': 'LANGUAGE', 'zh': '语言', 'ja': '言語' };
        const btn = document.getElementById('current-lang');
        if(btn) btn.innerText = langNames[lang];

        // 3. 缓慢渐显 (0.8s)
        gsap.to(targets, { 
          opacity: 1, 
          duration: 0.8, 
          ease: "power2.inOut" 
        });
      }
    });

    localStorage.setItem('santoo-lang', lang);
  }

  function finishEverything() {
    if (structure) structure.classList.add("has-hero8k");
    if (mainPage) mainPage.style.visibility = "visible";
    
    requestAnimationFrame(() => {
      gsap.to(layer, { opacity: 0, duration: 1.5, ease: "power2.inOut", onComplete: () => {
        if (layer) layer.remove();
        // 主内容文字出现的优雅动画
        gsap.to(content, { opacity: 1, y: -10, duration: 2, ease: "expo.out" });
      }});
    });
  }

  function handleStart() {
    if(video) {
      video.play().then(() => {
        gsap.set(videoWrap, { opacity: 1, zIndex: 15 });
      }).catch(() => finishEverything());
    }
    
    const tl = gsap.timeline();
    tl.to(mark, { opacity: 0, duration: 0.6 })
      .to(".intro-white", { opacity: 0, duration: 1.2 }, 0.2);

    gsap.delayedCall(VIDEO_DURATION - 1.5, () => {
      gsap.to(still8k, { opacity: 1, duration: 1.5 });
      gsap.to(videoWrap, { opacity: 0, duration: 1.5, onComplete: finishEverything });
    });
  }

  // 1. 初始化加载逻辑 (不使用动画，直接呈现保存的语言)
  const savedLang = localStorage.getItem('santoo-lang') || 'en';
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute(`data-${savedLang}`);
    if (text) el.innerText = text;
  });
  const langNames = { 'en': 'LANGUAGE', 'zh': '语言', 'ja': '言語' };
  const btn = document.getElementById('current-lang');
  if(btn) btn.innerText = langNames[savedLang];

  // 2. 绑定点击事件
  if (mark && video) {
    mark.addEventListener("click", handleStart, { once: true });
  } else {
    // 子页面处理
    if (structure) structure.classList.add("has-hero8k");
    if (mainPage) mainPage.style.visibility = "visible";
    if (content) gsap.set(content, { opacity: 1 });
  }
})();
