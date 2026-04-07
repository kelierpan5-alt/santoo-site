(function initSantoo() {
  const layer = document.getElementById("introSequence");
  const mark = document.getElementById("introSantoo");
  const video = document.getElementById("introVideo");
  const mainPage = document.getElementById("mainPage");
  const content = document.getElementById("systemLabel");
  const structure = document.getElementById("structureContainer");

  const hasSeenIntro = sessionStorage.getItem('santoo-visited');

  // 1. 优雅呼吸感语言切换
  window.switchLang = function(lang) {
    const targets = document.querySelectorAll('[data-en], #current-lang');
    gsap.timeline()
      .to(targets, { opacity: 0, duration: 1.0, ease: "power2.inOut" })
      .to({}, { duration: 0.4 }) // 优雅停顿
      .call(() => {
        document.querySelectorAll('[data-en]').forEach(el => {
          el.innerText = el.getAttribute(`data-${lang}`);
        });
        const names = {en:'LANGUAGE', zh:'语言', ja:'言語'};
        document.getElementById('current-lang').innerText = names[lang];
      })
      .to(targets, { opacity: 1, duration: 1.5, ease: "power2.out" });
    localStorage.setItem('santoo-lang', lang);
  };

  // 2. 唤醒主页面
  function showMain(isFast = false) {
    if (!mainPage) return;
    mainPage.style.visibility = "visible";
    if (structure) structure.classList.add("has-hero8k");

    if (isFast) {
      if (layer) layer.remove();
      gsap.set(mainPage, { opacity: 1 });
      gsap.set(content, { opacity: 1 });
    } else {
      gsap.timeline()
        .to(mainPage, { opacity: 1, duration: 1.5 })
        .to(layer, { opacity: 0, duration: 2, onComplete: () => layer?.remove() }, "-=0.5")
        .to(content, { opacity: 1, duration: 2.5, ease: "expo.out" }, "-=1");
    }
    sessionStorage.setItem('santoo-visited', 'true');
  }

  // 3. 初始逻辑：首页 vs 子页面
  // 判断当前是否是首页 (如果是 index.html 或 根目录)
  const isIndex = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';

  if (isIndex && !hasSeenIntro) {
    gsap.set(mark, { opacity: 1 });
    mark.addEventListener("click", () => {
      // 1. 立即处理图标消失
      mark.classList.add('is-hidden'); 
      gsap.to(mark, { opacity: 0, duration: 0.8 });

      // 2. 视频与背景处理
      if(video) {
        video.play();
        gsap.to(".intro-video-wrap", { opacity: 1, duration: 1.5 });
      }
      gsap.to(".intro-white", { opacity: 0, duration: 2 });

      // 3. 优雅进入主页 (根据你的视频时长 11s，设定在 9s 时触发主页渐显)
      gsap.delayedCall(9, showMain);
    }, { once: true });
  } else {
    showMain(true);
  }

  // 4. 语言初始化
  const saved = localStorage.getItem('santoo-lang') || 'en';
  document.querySelectorAll('[data-en]').forEach(el => {
    el.innerText = el.getAttribute(`data-${saved}`);
  });
})();
