(function initSantoo() {
  const layer = document.getElementById("introSequence");
  const mark = document.getElementById("introSantoo");
  const video = document.getElementById("introVideo");
  const mainPage = document.getElementById("mainPage");
  const content = document.getElementById("systemLabel");
  const structure = document.getElementById("structureContainer");

  // 多语言切换
  window.switchLang = function(lang) {
    const targets = document.querySelectorAll('[data-en], #current-lang');
    gsap.to(targets, { opacity: 0, duration: 0.6, onComplete: () => {
      document.querySelectorAll('[data-en]').forEach(el => {
        el.innerText = el.getAttribute(`data-${lang}`);
      });
      const langNames = {en:'LANGUAGE', zh:'语言', ja:'言語'};
      document.getElementById('current-lang').innerText = langNames[lang];
      gsap.to(targets, { opacity: 1, duration: 1 });
    }});
    localStorage.setItem('santoo-lang', lang);
  };

  // 核心：显示主页面逻辑
  function showMain() {
    if (!mainPage) return;
    
    // 强制显示主容器
    mainPage.style.visibility = "visible";
    if (structure) structure.classList.add("has-hero8k");

    const tl = gsap.timeline();
    tl.to(mainPage, { opacity: 1, duration: 1 })
      .to(layer, { opacity: 0, duration: 2, ease: "power2.inOut", onComplete: () => layer?.remove() }, "-=0.5")
      .to(content, { opacity: 1, y: -5, duration: 2, ease: "expo.out" }, "-=1");
  }

  // 交互逻辑
  if (mark && layer) {
    mark.addEventListener("click", () => {
      if(video) {
        video.play().catch(() => {});
        gsap.to(".intro-video-wrap", { opacity: 1, duration: 1 });
      }
      gsap.to(mark, { opacity: 0, duration: 0.8 });
      gsap.to(".intro-white", { opacity: 0, duration: 1.5 });

      // 视频播放约 9 秒后自动进入主页
      gsap.delayedCall(9, showMain);
    }, { once: true });

    // 容错：如果用户 15 秒没点，自动进入，防止白屏
    gsap.delayedCall(15, () => {
        if (layer.parentNode) showMain();
    });
  } else {
    // 子页面直接显示
    showMain();
  }

  // 初始化语言
  const saved = localStorage.getItem('santoo-lang') || 'en';
  document.querySelectorAll('[data-en]').forEach(el => {
    el.innerText = el.getAttribute(`data-${saved}`);
  });
})();
