(function initSantoo() {
  // --- 核心变量声明 ---
  const layer = document.getElementById("introSequence");
  const mark = document.getElementById("introSantoo");
  const video = document.getElementById("introVideo");
  const mainPage = document.getElementById("mainPage");
  const content = document.getElementById("systemLabel");
  const structure = document.getElementById("structureContainer");

  // --- 1. 优雅呼吸感语言切换 ---
  window.switchLang = function(lang) {
    const targets = document.querySelectorAll('[data-en], #current-lang');
    const tl = gsap.timeline();

    tl.to(targets, { 
      opacity: 0, 
      duration: 1.0, 
      ease: "power2.inOut" 
    })
    .to({}, { duration: 0.4 }) // 关键：空白呼吸停顿期
    .call(() => {
      // 执行语言替换
      document.querySelectorAll('[data-en]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) el.innerText = text;
      });
      // 更新语言按钮文字
      const names = { en: 'LANGUAGE', zh: '语言', ja: '言語' };
      document.getElementById('current-lang').innerText = names[lang];
    })
    .to(targets, { 
      opacity: 1, 
      duration: 1.8, 
      ease: "power2.out" 
    });

    localStorage.setItem('santoo-lang', lang);
  };

  // --- 2. 激活主页面逻辑 ---
  function showMain(isFast = false) {
    if (!mainPage) return;
    mainPage.style.visibility = "visible";
    if (structure) structure.classList.add("has-hero8k");

    if (isFast) {
      // 快速进入 (返回页面时使用)
      if (layer) layer.remove();
      gsap.set(mainPage, { opacity: 1 });
      gsap.set(content, { opacity: 1, y: 0 });
    } else {
      // 优雅进入 (初次点击 SANTOO 使用)
      const tl = gsap.timeline();
      tl.to(mainPage, { opacity: 1, duration: 1.5 })
        .to(layer, { 
          opacity: 0, 
          duration: 2.5, 
          onComplete: () => layer?.remove() 
        }, "-=0.5")
        .to(content, { 
          opacity: 1, 
          y: 0, 
          duration: 3, 
          ease: "expo.out" 
        }, "-=1.5");
    }
    sessionStorage.setItem('santoo-visited', 'true');
  }

  // --- 3. 初始进入判定逻辑 ---
  const hasSeenIntro = sessionStorage.getItem('santoo-visited');
  const isIndex = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';

  if (isIndex && !hasSeenIntro) {
    // 首页初次访问：启动 SANTOO 点击监听
    gsap.set(mark, { opacity: 1 });
    mark.addEventListener("click", () => {
      if(video) video.play();
      gsap.to(mark, { opacity: 0, duration: 1 });
      gsap.to(".intro-white", { opacity: 0, duration: 2 });
      gsap.delayedCall(9, showMain); 
    }, { once: true });
  } else {
    // 已访问或子页面：直接显示主内容
    showMain(true);
  }

  // --- 4. 语言偏好初始化 ---
  const saved = localStorage.getItem('santoo-lang') || 'en';
  document.querySelectorAll('[data-en]').forEach(el => {
    el.innerText = el.getAttribute(`data-${saved}`);
  });
})();
