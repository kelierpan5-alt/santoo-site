(function initSantooSystem() {
  const layer = document.getElementById("introSequence");
  const mark = document.getElementById("introSantoo");
  const video = document.getElementById("introVideo");
  const mainPage = document.getElementById("mainPage");
  const structure = document.getElementById("structureContainer");
  const content = document.getElementById("systemLabel");

  const VIDEO_DURATION = 11; 

  window.switchLang = function(lang) {
    const targets = document.querySelectorAll('[data-en], #current-lang');
    const tl = gsap.timeline();
    tl.to(targets, { opacity: 0, duration: 1.0, ease: "power2.inOut" })
      .to({}, { duration: 0.5 }) 
      .call(() => {
        document.querySelectorAll('[data-en]').forEach(el => {
          const text = el.getAttribute(`data-${lang}`);
          if (text) el.innerText = text;
        });
        const langNames = { 'en': 'LANGUAGE', 'zh': '语言', 'ja': '言語' };
        const btn = document.getElementById('current-lang');
        if(btn) btn.innerText = langNames[lang];
      })
      .to(targets, { opacity: 1, duration: 1.5, ease: "power2.out" });
    localStorage.setItem('santoo-lang', lang);
  }

  function finishEverything() {
    // 修复白屏：强制显示主页面
    if (mainPage) {
      mainPage.style.visibility = "visible";
      gsap.set(mainPage, { autoAlpha: 1 });
    }
    if (structure) structure.classList.add("has-hero8k");
    
    if (layer) {
      gsap.to(layer, { 
        opacity: 0, duration: 2.5, ease: "power2.inOut", 
        onComplete: () => {
          layer.remove();
          gsap.to(content, { opacity: 1, y: -5, duration: 2.5, ease: "expo.out" });
        }
      });
    } else {
       gsap.to(content, { opacity: 1, duration: 1 });
    }
  }

  function handleStart() {
    if(video) video.play().then(() => gsap.set(".intro-video-wrap", { opacity: 1, zIndex: 15 })).catch(() => finishEverything());
    gsap.timeline().to(mark, { opacity: 0, duration: 1.0 }).to(".intro-white", { opacity: 0, duration: 1.8 }, 0.4);
    gsap.delayedCall(VIDEO_DURATION - 2, () => {
      gsap.to(".intro-hero8k", { opacity: 1, duration: 2 });
      gsap.to(".intro-video-wrap", { opacity: 0, duration: 2, onComplete: finishEverything });
    });
  }

  // 初始语言设置
  const savedLang = localStorage.getItem('santoo-lang') || 'en';
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute(`data-${savedLang}`);
    if (text) el.innerText = text;
  });

  // 逻辑入口：如果有按钮则等待点击，否则直接显示（子页面逻辑）
  if (mark && layer) {
    mark.addEventListener("click", handleStart, { once: true });
  } else {
    finishEverything();
  }
})();
