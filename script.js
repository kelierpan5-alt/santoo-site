(function initSantoo() {
  // --- 核心变量声明 ---
  const layer = document.getElementById('santoo-layer');
  const mark = document.getElementById("introSantoo");
  const video = document.getElementById("introVideo");
  const mainPage = document.querySelector('.page');
  const content = document.querySelector('.content');
  const structure = document.getElementById("structureContainer");

  // 获取当前文件名 (例如: member.html)
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const hasSeenIntro = sessionStorage.getItem('santoo-visited');
  const isIndex = currentPath === 'index.html' || currentPath === '';

  // --- 新增：处理当前页面标签的禁用逻辑 ---
  const navLinks = document.querySelectorAll('.nav-anchor, .back-btn');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('nav-active-link'); // 此类在 CSS 中需设置 pointer-events: none
      link.style.pointerEvents = "none";     // 脚本层面双重拦截
    }
  });

  // 1. 语言切换逻辑 (保持不变)
  window.switchLang = function(lang) {
    const targets = document.querySelectorAll('[data-en], #current-lang');
    const tl = gsap.timeline();
    tl.to(targets, { opacity: 0, duration: 1.0, ease: "power2.inOut" })
      .to({}, { duration: 0.4 })
      .call(() => {
        document.querySelectorAll('[data-en]').forEach(el => {
          const text = el.getAttribute(`data-${lang}`);
          if (text) el.innerText = text;
        });
        const names = { en: 'LANGUAGE', zh: '语言', ja: '言語' };
        document.getElementById('current-lang').innerText = names[lang];
      })
      .to(targets, { opacity: 1, duration: 1.8, ease: "power2.out" });
    localStorage.setItem('santoo-lang', lang);
  };

  // 2. 激活主页面逻辑
  function showMain(isFast = false) {
    if (!mainPage) return;

    // 确保主页面可见，但保持透明等待动画
    mainPage.style.visibility = "visible";
    if (structure) structure.classList.add("has-hero8k");

    // 检查 layer 和 content 是否存在，避免 GSAP 报错
    const hasLayer = !!document.getElementById('santoo-layer');
    const hasContent = !!document.querySelector('.content');

    if (isFast) {
      // --- 快速进入 ---
      if (hasLayer) document.getElementById('santoo-layer').remove();
      
      gsap.fromTo(mainPage, 
        { opacity: 0 }, 
        { opacity: 1, duration: 2.8, ease: "power2.inOut" }
      );
      
      if (hasContent) {
        gsap.fromTo(".content", 
          { opacity: 0, y: 10 }, 
          { opacity: 1, y: 0, duration: 2.5, delay: 0.5, ease: "power2.out" }
        );
      }
    } else {
      // --- 剧场式进入（视频结束后） ---
      const tl = gsap.timeline();
      
      // 1. 先处理主页面显现
      tl.to(mainPage, { opacity: 1, duration: 3.0, ease: "power2.inOut" });

      // 2. 如果有开场层，并排处理它的消失
      if (hasLayer) {
        tl.to("#santoo-layer", { 
          opacity: 0, 
          duration: 2.0, 
          onComplete: () => {
            const l = document.getElementById('santoo-layer');
            if (l) l.remove();
            // 额外清理视频层，防止遮挡点击
            const videoWrap = document.querySelector('.intro-video-wrap');
            if (videoWrap) videoWrap.remove();
          } 
        }, "-=2.5");
      }

      // 3. 如果有右下角文案，最后浮现
      if (hasContent) {
        tl.to(".content", { 
          opacity: 1, 
          duration: 2.5, 
          ease: "power2.out" 
        }, "-=1.0");
      }
    }
    .page {
  z-index: 2000 !important; /* 确保它在所有层之上 */
}

    sessionStorage.setItem('santoo-visited', 'true');
  }
  // 3. 初始进入判定逻辑 
  if (isIndex && !hasSeenIntro) {
    // 首页初次访问：启动 SANTOO 点击监听
    gsap.set(mark, { opacity: 1, visibility: "visible" });
    
    mark.addEventListener("click", () => {
      // 1. 立即处理图标消失
      mark.style.pointerEvents = "none"; // 防止重复点击
      gsap.to(mark, { opacity: 0, duration: 0.8, onComplete: () => mark.remove() });

      // 2. 视频处理
      if(video) {
        // 确保视频容器可见
        gsap.set(".intro-video-wrap", { visibility: "visible" });
        video.play().catch(err => {
          console.log("Video play failed, skipping to main:", err);
          showMain(); // 如果视频播放失败，直接进首页
        });
        gsap.to(".intro-video-wrap", { opacity: 1, duration: 1.5 });
      }

      // 3. 遮罩层处理
      gsap.to(".intro-white", { opacity: 0, duration: 2 });

      // 4. 【核心修复】增加双保险进入机制
      // 方案 A: 正常等待视频快结束时进入 (9秒)
      const timer = gsap.delayedCall(9, () => {
        showMain();
      });

      // 方案 B: 监听视频结束事件 (防止视频加载慢导致9秒时还没播完)
      if (video) {
        video.onended = () => {
          timer.kill(); // 如果视频先结束，杀掉定时器，立即进入
          showMain();
        };
      }
    }, { once: true });
  } else {
    // 只要不是首次进首页，全部走快速通道
    showMain(true);
  }
  // 4. 语言初始化
  const saved = localStorage.getItem('santoo-lang') || 'en';
  document.querySelectorAll('[data-en]').forEach(el => {
    el.innerText = el.getAttribute(`data-${saved}`);
  });

  // 5. 预加载与跳转拦截
  navLinks.forEach(link => {
    // 预加载
    link.addEventListener('mouseenter', function() {
      const href = this.getAttribute('href');
      const preloadConfig = {
        'member.html': 'assets/member-bg.jpg',
        'project.html': 'assets/project-bg.jpg',
        'research.html': 'assets/research-bg.jpg',
        'works.html': 'assets/works-bg.jpg'
      };
      if (preloadConfig[href]) {
        const img = new Image();
        img.src = preloadConfig[href];
      }
    }, { once: true });

    // 点击跳转拦截
    link.addEventListener('click', function(e) {
      const targetUrl = this.getAttribute('href');
      
      // 如果点击的是当前页链接，不执行任何动作
      if (targetUrl === currentPath) {
        e.preventDefault();
        return;
      }

      if (targetUrl && targetUrl.includes('.html')) {
        e.preventDefault();
        gsap.to(mainPage, {
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

  // 6. 处理浏览器后退/前进时的渐显
  window.addEventListener('pageshow', (event) => {
    // 如果是从缓存读取（即后退回来），强制重置透明度并渐显
    if (event.persisted) {
      gsap.fromTo(mainPage, { opacity: 0 }, { opacity: 1, duration: 2.8, ease: "power2.out" });
    }
  });
})();
