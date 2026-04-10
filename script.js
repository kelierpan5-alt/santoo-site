(function initSantoo() {
  // --- 1. 核心变量声明 ---
  const layer = document.getElementById("introSequence");
  const mark = document.getElementById("introSantoo");
  const video = document.getElementById("introVideo");
  const mainPage = document.getElementById("mainPage");
  const content = document.getElementById("systemLabel");
  const structure = document.getElementById("structureContainer");
  // 新增：获取底部元素
  const footer = document.querySelector(".site-footer");

  const hasSeenIntro = sessionStorage.getItem('santoo-visited');

  // --- 2. 优雅呼吸感语言切换 ---
  window.switchLang = function(lang) {
    // 选取所有带有翻译属性的元素（包含主内容和底部）
    const targets = document.querySelectorAll('[data-en], #current-lang');
    const tl = gsap.timeline();

    tl.to(targets, { 
      opacity: 0, 
      duration: 1.0, 
      ease: "power2.inOut" 
    })
    .to({}, { duration: 0.4 }) // 呼吸停顿期
    .call(() => {
      // 执行所有元素的语言替换
      document.querySelectorAll('[data-en]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) el.innerText = text;
      });
      // 更新语言按钮文字
      const names = { en: 'LANGUAGE', zh: '语言', ja: '言語' };
      const langBtn = document.getElementById('current-lang');
      if (langBtn) langBtn.innerText = names[lang];
    })
    .to(targets, { 
      opacity: 1, 
      duration: 1.8, 
      ease: "power2.out" 
    });

    localStorage.setItem('santoo-lang', lang);
  };

  // --- 3. 激活主页面逻辑 ---
  function showMain(isFast = false) {
    if (!mainPage) return;
    
    mainPage.style.visibility = "visible";
    // 确保底部在进场前是可见的（由 GSAP 控制透明度）
    if (footer) footer.style.visibility = "visible";
    if (structure) structure.classList.add("has-hero8k");

    if (isFast) {
      if (layer) layer.remove();
      // 快速进入时，主页和底部同时渐显
      gsap.fromTo([mainPage, footer], { opacity: 0 }, { opacity: 1, duration: 1.5 });
      gsap.set(content, { opacity: 1, y: 0 });
    } else {
      // 标准进场动画序列
      gsap.timeline()
        .to([mainPage, footer], { opacity: 1, duration: 1.5 })
        .to(layer, { 
          opacity: 0, 
          duration: 2, 
          onComplete: () => { if(layer) layer.remove(); } 
        }, "-=0.5")
        .to(content, { 
          opacity: 1, 
          duration: 2.5, 
          ease: "expo.out" 
        }, "-=1");
    }
    sessionStorage.setItem('santoo-visited', 'true');
  }

  // --- 4. 初始进入判定逻辑 ---
  const isIndex = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '';

  if (isIndex && !hasSeenIntro) {
    gsap.set(mark, { opacity: 1 });
    mark.addEventListener("click", () => {
      mark.classList.add('is-hidden'); 
      gsap.to(mark, { opacity: 0, duration: 0.8 });

      if(video) {
        video.play();
        gsap.to(".intro-video-wrap", { opacity: 1, duration: 1 });
      }
      gsap.to(".intro-white", { opacity: 0, duration: 1.5 });

      // 在视频播放接近尾声时（4.5秒）切换到主页
      gsap.delayedCall(4.5, showMain);
    }, { once: true });
  } else {
    showMain(true);
  }

  // --- 5. 语言初始化 ---
  const savedLang = localStorage.getItem('santoo-lang') || 'en';
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute(`data-${savedLang}`);
    if (text) el.innerText = text;
  });
  const langBtnInit = document.getElementById('current-lang');
  if (langBtnInit) {
    const names = { en: 'LANGUAGE', zh: '语言', ja: '言語' };
    langBtnInit.innerText = names[savedLang];
  }

  // --- 6. 资源预加载逻辑 ---
  const preloadConfig = {
    'member.html': 'assets/member-bg.jpg',
    'project.html': 'assets/project-bg.jpg',
    'research.html': 'assets/research-bg.jpg',
    'works.html': 'assets/works-bg.jpg'
  };

  document.querySelectorAll('a.nav-anchor').forEach(link => {
    link.addEventListener('mouseenter', function() {
      const href = this.getAttribute('href');
      const imgSrc = preloadConfig[href];
      if (imgSrc) {
        const img = new Image();
        img.src = imgSrc;
      }
    }, { once: true });
  });

  // --- 7. 页面平滑跳转过渡 ---
  document.querySelectorAll('a.nav-anchor, a.back-btn').forEach(link => {
    link.addEventListener('click', function(e) {
      const targetUrl = this.getAttribute('href');
      if (targetUrl && targetUrl.includes('.html')) {
        e.preventDefault(); 
        // 连同底部一起淡出
        gsap.to([mainPage, footer], {
          opacity: 0,
          duration: 1.2,
          ease: "power2.inOut",
          onComplete: () => {
            window.location.href = targetUrl;
          }
        });
      }
    });
  });

  // 处理浏览器后退时的显示
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      gsap.fromTo([mainPage, footer], 
        { opacity: 0 }, 
        { opacity: 1, duration: 1.5, ease: "power2.out" }
      );
    }
  });
})();
