(function initSantoo() {
  const layer = document.getElementById("introSequence");
  const mark = document.getElementById("introSantoo");
  const video = document.getElementById("introVideo");
  const mainPage = document.getElementById("mainPage");
  const content = document.getElementById("systemLabel");

  window.switchLang = function(lang) {
    const targets = document.querySelectorAll('[data-en], #current-lang');
    gsap.to(targets, { opacity: 0, duration: 0.8, onComplete: () => {
      document.querySelectorAll('[data-en]').forEach(el => {
        el.innerText = el.getAttribute(`data-${lang}`);
      });
      document.getElementById('current-lang').innerText = {en:'LANGUAGE', zh:'语言', ja:'言語'}[lang];
      gsap.to(targets, { opacity: 1, duration: 1.2 });
    }});
    localStorage.setItem('santoo-lang', lang);
  };

  function showMain() {
    if (mainPage) mainPage.style.visibility = "visible";
    if (layer) {
      gsap.to(layer, { opacity: 0, duration: 2, onComplete: () => {
        layer.remove();
        gsap.to(content, { opacity: 1, y: -5, duration: 2 });
      }});
    } else {
      gsap.set(content, { opacity: 1 });
    }
  }

  if (mark && layer) {
    mark.addEventListener("click", () => {
      if(video) video.play();
      gsap.to(mark, { opacity: 0 });
      gsap.delayedCall(9, showMain); // 根据视频长度调整
    }, { once: true });
  } else {
    showMain();
  }

  const saved = localStorage.getItem('santoo-lang') || 'en';
  document.querySelectorAll('[data-en]').forEach(el => {
    el.innerText = el.getAttribute(`data-${saved}`);
  });
})();
