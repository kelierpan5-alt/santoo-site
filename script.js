(function initSantoo() {
  // --- 核心变量声明 ---
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
      duration: 1.8, // 缓慢浮现
      ease: "power2.out" 
    });

    localStorage.setItem('santoo-lang', lang);
  };

  // 2. 激活主页面逻辑 
  function showMain(isFast = false) {
    if (!mainPage) return;
    mainPage.style.visibility = "visible";
    if (structure) structure.classList.add("has-hero8k");

    if (isFast) {
      if (layer) layer.remove();
      // 即便是快速进入，也给一个 1.5秒的渐显，保持优雅
      gsap.fromTo(mainPage, { opacity: 0 }, { opacity: 1, duration: 1.5 });
      gsap.set(content, { opacity: 1, y: 0 });
    } else {
      gsap.timeline()
        .to(mainPage, { opacity: 1, duration: 1.5 })
        .to(layer, { opacity: 0, duration: 2, onComplete: () => layer?.remove() }, "-=0.5")
        .to(content, { opacity: 1, duration: 2.5, ease: "expo.out" }, "-=1");
    }
    sessionStorage.setItem('santoo-visited', 'true');
  }

  // 3. 初始进入判定逻辑 
  // 判断当前是否是首页 (如果是 index.html 或 根目录)
  const isIndex = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';

  if (isIndex && !hasSeenIntro) {
    // 首页初次访问：启动 SANTOO 点击监听
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
  // --- 5. 页面平滑跳转过渡 (渐隐-黑色-渐显) ---
  const allLinks = document.querySelectorAll('a.nav-anchor, a.back-btn');

  allLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // 只有站内跳转才执行动画
      const targetUrl = this.getAttribute('href');
      if (targetUrl && targetUrl.includes('.html')) {
        e.preventDefault(); // 拦截默认跳转

        // 执行优雅的渐隐到黑色
        gsap.to(mainPage, {
          opacity: 0,
          duration: 1.2, // 你要求的缓慢态度
          ease: "power2.inOut",
          onComplete: () => {
            // 动画完成后，执行真正的页面跳转
            window.location.href = targetUrl;
          }
        });
      }
    });
  });

  // 页面加载时的渐显逻辑
  window.addEventListener('pageshow', () => {
    gsap.fromTo(mainPage, 
      { opacity: 0 }, 
      { opacity: 1, duration: 1.5, ease: "power2.out" }
    );
  });
})();
