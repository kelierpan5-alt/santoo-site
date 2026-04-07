document.addEventListener("DOMContentLoaded", () => { // 加上这一行
(function initSantoo() {
  // --- 核心变量声明 ---
  const layer = document.getElementById('santoo-layer');
  const mark = document.getElementById("introSantoo");
  const video = document.getElementById("introVideo");
  const mainPage = document.querySelector('.page');
  const content = document.querySelector('.content');
  const structure = document.getElementById("structureContainer");

  console.log("Mark element:", mark); // 调试用：如果控制台输出 null，说明 ID 错了

  if (mark) {
    // 显式添加一个简单的测试，看看点击是否生效
    mark.onclick = function() {
      console.log("SANTOO Clicked!"); // 如果控制台没印这行，说明点击被拦截了

      // 1. 立即禁用按钮并消失
      this.style.pointerEvents = "none";
      gsap.to(this, { opacity: 0, duration: 0.5, onComplete: () => this.remove() });

      // 2. 激活视频
      const videoWrap = document.querySelector('.intro-video-wrap');
      if (videoWrap) {
        gsap.set(videoWrap, { visibility: "visible", zIndex: 150 });
        gsap.to(videoWrap, { opacity: 1, duration: 1.2 });
      }

      if (video) {
        // 强制重置并播放
        video.muted = true;
        video.play().then(() => {
          // 视频播了再淡出白层
          gsap.to(".intro-white", { opacity: 0, duration: 1.5 });
        }).catch(err => {
          console.error("Play failed:", err);
          showMain(); // 播不动直接进
        });
      }

      // 3. 9秒后进站
      gsap.delayedCall(9, showMain);
    };
  }
      
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

    sessionStorage.setItem('santoo-visited', 'true');
  }
// 3. 初始进入判定逻辑 
  if (isIndex && !hasSeenIntro) {
    if (mark) { // 关键：必须包在 if (mark) 里
    // 初始状态
    gsap.set(".intro-white", { opacity: 1 });
    gsap.set("#introSantoo", { opacity: 1, visibility: "visible" });

    mark.addEventListener("click", () => {
      // 1. 按钮动画：变透明并禁用
      mark.style.pointerEvents = "none";
      gsap.to(mark, { opacity: 0, duration: 0.8 });

      // 2. 视频唤醒
      if (video) {
        // ！！修正点：直接使用 Raw 链接确保 GitHub 能播
        video.src = "assets/intro.mp4";
        video.muted = true; // 确保静音
        video.setAttribute('playsinline', ''); // 兼容 iOS
        video.load();
        // 尝试播放
        const playPromise = video.play();

        if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log("Video started playing");
            gsap.to(".intro-white", { opacity: 0, duration: 2.0 });
        }).catch(error => {
            console.warn("Playback failed, skipping to main site:", error);
            showMain(true); // 如果播放失败（被拦截），直接进入主站，防止卡死
        });
    }
}
        const videoWrap = document.querySelector('.intro-video-wrap');
        // 提升视频层级并显现
        if (videoWrap) {
        gsap.set(videoWrap, { visibility: "visible", zIndex: 150 }); 
        gsap.to(videoWrap, { opacity: 1, duration: 1.5 });
          }

        video.play().catch(e => {
          // 播成功了再让白层消失
           gsap.to(".intro-white", { opacity: 0, duration: 2.0 });
        }).catch(e => {
          console.warn("Autoplay blocked:", e);
          showMain(); // 播不动就跳过
        });
      }

      // 3. 白层消失
      gsap.to(".intro-white", { 
        opacity: 0, 
        duration: 2, 
        onComplete: () => document.querySelector('.intro-white')?.remove() 
      });

      // 4. 定时进入主站
      gsap.delayedCall(9, showMain);
    }, { once: true });
      } else {
        // 如果找不到进入按钮，直接进站，防止页面卡死在白屏
        showMain(true);
    }
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
}); // 加上这一行，对应开头的那个括号
