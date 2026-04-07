(function initSantoo() {
  const layer = document.getElementById("introSequence");
  const mark = document.getElementById("introSantoo");
  const video = document.getElementById("introVideo");
  const mainPage = document.getElementById("mainPage");
  const content = document.getElementById("systemLabel");
  const backBtn = document.querySelector(".back-btn");

  const hasSeenIntro = sessionStorage.getItem('santoo-visited');

  // 1. 优雅的呼吸感语言切换
  window.switchLang = function(lang) {
    const targets = document.querySelectorAll('[data-en], #current-lang');
    const tl = gsap.timeline();
    tl.to(targets, { opacity: 0, duration: 1.0, ease: "power2.inOut" })
      .to({}, { duration: 0.4 }) // 优雅的空白停顿
      .call(() => {
        document.querySelectorAll('[data-en]').forEach(el => {
          const text = el.getAttribute(`data-${lang}`);
          if (text) el.innerText = text;
        });
        const langNames = { en: 'LANGUAGE', zh: '语言', ja: '言語' };
        document.getElementById('current-lang').innerText = langNames[lang];
      })
      .to(targets, { opacity: 1, duration: 1.5, ease: "power2.out" });
    localStorage.setItem('santoo-lang', lang);
  };

  // 2. 显示主页面逻辑
  function showMain(isFast = false) {
    if (!mainPage) return;
    mainPage.style.visibility = "visible";
    // 只有在非首页（或根据需要）显示返回按钮
    if(backBtn && window.location.pathname.includes('index.html') === false) {
        backBtn.style.display = "block";
    }

    if (isFast) {
      if (layer) layer.remove();
      gsap.set(mainPage, { opacity: 1 });
      gsap.set(content, { opacity: 1, y: 0 });
    } else {
      const tl = gsap.timeline();
      tl.to(mainPage, { opacity: 1, duration: 1.5 })
        .to(layer, { opacity: 0, duration: 2, onComplete: () => layer?.remove() }, "-=0.5")
        .to(content, { opacity: 1, y: 0, duration: 2.5, ease: "expo.out" }, "-=1");
    }
    sessionStorage.setItem('santoo-visited', 'true');
  }

  // 3. 初始状态判断：修复 SANTOO 图标不显示问题
  if (layer && !hasSeenIntro) {
    // 第一次访问：显示按钮等待点击
    gsap.set(mark, { opacity: 1 }); 
    mark.addEventListener("click", () => {
      if(video) video.play();
      gsap.to(mark, { opacity: 0, duration: 1 });
      gsap.to(".intro-white", { opacity: 0, duration: 2 });
      gsap.delayedCall(9, showMain); 
    }, { once: true });
  } else {
    // 已访问过：直接显示
    showMain(true);
  }

  // 语言初始化
  const saved = localStorage.getItem('santoo-lang') || 'en';
  document.querySelectorAll('[data-en]').forEach(el => {
    el.innerText = el.getAttribute(`data-${saved}`);
  });
})();
