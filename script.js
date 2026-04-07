(function initSantoo() {
  const layer = document.getElementById("introSequence");
  const mark = document.getElementById("introSantoo");
  const video = document.getElementById("introVideo");
  const mainPage = document.getElementById("mainPage");
  const content = document.getElementById("systemLabel");
  const structure = document.getElementById("structureContainer");

  // 检查是否已经看过动画
  const hasSeenIntro = sessionStorage.getItem('santoo-visited');

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

  // 核心：显示主页面逻辑。isFast 表示是否跳过所有动画
  function showMain(isFast = false) {
    if (!mainPage) return;
    
    mainPage.style.visibility = "visible";
    if (structure) structure.classList.add("has-hero8k");

    if (isFast) {
      // 瞬间切换，无等待
      if (layer) layer.remove();
      gsap.set(mainPage, { opacity: 1 });
      gsap.set(content, { opacity: 1, y: 0 });
    } else {
      // 正常渐显逻辑
      const tl = gsap.timeline();
      tl.to(mainPage, { opacity: 1, duration: 1 })
        .to(layer, { opacity: 0, duration: 2, ease: "power2.inOut", onComplete: () => layer?.remove() }, "-=0.5")
        .to(content, { opacity: 1, y: -5, duration: 2, ease: "expo.out" }, "-=1");
    }
    // 标记为已访问
    sessionStorage.setItem('santoo-visited', 'true');
  }

  // 交互逻辑
  if (mark && layer && !hasSeenIntro) {
    // 只有第一次进入且存在动画层时才需要点击
    mark.addEventListener("click", () => {
      if(video) {
        video.play().catch(() => {});
        gsap.to(".intro-video-wrap", { opacity: 1, duration: 1 });
      }
      gsap.to(mark, { opacity: 0, duration: 0.8 });
      gsap.to(".intro-white", { opacity: 0, duration: 1.5 });
      gsap.delayedCall(9, showMain); 
    }, { once: true });

    // 超时备份
    gsap.delayedCall(15, () => {
        if (layer && layer.parentNode) showMain();
    });
  } else {
    // 如果已经看过动画（从子页面返回），或者是子页面本身，直接显示
    showMain(true);
  }

  // 初始化语言
  const saved = localStorage.getItem('santoo-lang') || 'en';
  document.querySelectorAll('[data-en]').forEach(el => {
    el.innerText = el.getAttribute(`data-${saved}`);
  });
})();
