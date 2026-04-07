(function initSantoo() {
  const layer = document.getElementById("introSequence");
  const mark = document.getElementById("introSantoo");
  const video = document.getElementById("introVideo");
  const mainPage = document.getElementById("mainPage");
  const content = document.getElementById("systemLabel");
  const structure = document.getElementById("structureContainer");

  const hasSeenIntro = sessionStorage.getItem('santoo-visited');

  window.switchLang = function(lang) {
    const targets = document.querySelectorAll('[data-en], #current-lang');
    const tl = gsap.timeline();

    tl.to(targets, { 
      opacity: 0, 
      duration: 1.2, // 缓慢渐隐
      ease: "power2.inOut" 
    })
    .to({}, { duration: 0.5 }) // 关键：优雅的空白停顿期
    .call(() => {
      document.querySelectorAll('[data-en]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) el.innerText = text;
      });
      const langNames = { en: 'LANGUAGE', zh: '语言', ja: '言語' };
      document.getElementById('current-lang').innerText = langNames[lang];
    })
    .to(targets, { 
      opacity: 1, 
      duration: 1.8, // 更缓慢的渐显
      ease: "power2.out" 
    });

    localStorage.setItem('santoo-lang', lang);
  };

  function showMain(isFast = false) {
    if (!mainPage) return;
    mainPage.style.visibility = "visible";
    if (structure) structure.classList.add("has-hero8k");

    if (isFast) {
      if (layer) layer.remove();
      gsap.set(mainPage, { opacity: 1 });
      gsap.set(content, { opacity: 1, y: 0 });
    } else {
      // 正常进场：态度从容
      const tl = gsap.timeline();
      tl.to(mainPage, { opacity: 1, duration: 1.5 })
        .to(layer, { 
          opacity: 0, 
          duration: 2.5, 
          ease: "power2.inOut", 
          onComplete: () => layer?.remove() 
        }, "-=0.5")
        .to(content, { 
          opacity: 1, 
          y: 0, 
          duration: 3, // 极缓慢的升起
          ease: "expo.out" 
        }, "-=1.5");
    }
    sessionStorage.setItem('santoo-visited', 'true');
  }

  if (mark && layer && !hasSeenIntro) {
    mark.addEventListener("click", () => {
      if(video) {
        video.play().catch(() => {});
        gsap.to(".intro-video-wrap", { opacity: 1, duration: 1 });
      }
      gsap.to(mark, { opacity: 0, duration: 0.8 });
      gsap.to(".intro-white", { opacity: 0, duration: 1.5 });
      gsap.delayedCall(9, showMain); 
    }, { once: true });
    gsap.delayedCall(15, () => { if (layer && layer.parentNode) showMain(); });
  } else {
    showMain(true);
  }

  const saved = localStorage.getItem('santoo-lang') || 'en';
  document.querySelectorAll('[data-en]').forEach(el => {
    el.innerText = el.getAttribute(`data-${saved}`);
  });
})();
