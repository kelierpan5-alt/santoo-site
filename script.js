}

      // 3. 双保险进入机制
      const timer = gsap.delayedCall(9, () => showMain());

      if (video) {
        video.onended = () => {
          timer.kill();
          showMain();
        };
      }
    }, { once: true });
  } else {
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
