(function initSantooSystem() {
  const layer = document.getElementById("introSequence");
  const mark = document.getElementById("introSantoo");
  const videoWrap = document.querySelector(".intro-video-wrap");
  const video = document.getElementById("introVideo");
  const still8k = document.querySelector(".intro-hero8k");
  const mainPage = document.getElementById("mainPage");
  const structure = document.getElementById("structureContainer");
  const content = document.getElementById("systemLabel");

  const VIDEO_DURATION = 11; 

  // 语言切换函数
  window.switchLang = function(lang) {
    document.querySelectorAll('[data-en]').forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (text) el.innerText = text;
    });
    document.querySelectorAll('.lang-switch span').forEach(s => s.classList.remove('active'));
    document.getElementById(`btn-${lang}`).classList.add('active');
    localStorage.setItem('santoo-lang', lang);
  }

  function finishEverything() {
    structure.classList.add("has-hero8k");
    mainPage.style.visibility = "visible";
    gsap.to(layer, { opacity: 0, duration: 1, onComplete: () => {
      if (layer) layer.remove();
      gsap.to(content, { opacity: 1, y: -20, duration: 1.2 });
    }});
  }

  function handleStart() {
    video.play().catch(() => finishEverything());
    gsap.set(videoWrap, { opacity: 1, zIndex: 15 });
    
    const tl = gsap.timeline();
    tl.to(mark, { opacity: 0, duration: 0.4 })
      .to(".intro-white", { opacity: 0, duration: 0.8 }, 0.2);

    gsap.delayedCall(VIDEO_DURATION - 1.2, () => {
      gsap.to(still8k, { opacity: 1, duration: 1.2 });
      gsap.to(videoWrap, { opacity: 0, duration: 1.2, onComplete: finishEverything });
    });
  }

  // 初始化状态
  const savedLang = localStorage.getItem('santoo-lang') || 'en';
  switchLang(savedLang);

  if (mark && video) {
    mark.addEventListener("click", handleStart, { once: true });
  } else {
    if (structure) structure.classList.add("has-hero8k");
    if (mainPage) mainPage.style.visibility = "visible";
    if (content) gsap.set(content, { opacity: 1 });
  }
})();
