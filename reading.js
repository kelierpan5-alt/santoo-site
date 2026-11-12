(() => {
  function render() {
    const lang = document.documentElement.lang.slice(0,2);
    const edition = window.SantooReading[lang] || window.SantooReading.en;
    document.querySelector('[data-reader-book]').textContent = edition.book;
    document.querySelector('[data-reader-title]').textContent = edition.title;
    document.title = edition.title + ' — Pan Yao / SANTOO';
    const prose = document.querySelector('[data-reader-prose]');
    prose.setAttribute('aria-label',lang === 'zh' ? '章節正文' : lang === 'ja' ? '本文' : 'Chapter text');
    prose.replaceChildren(...edition.paragraphs.map(unit => {
      const p = document.createElement('p');
      if (unit.pause) { p.className = 'pause-unit'; p.setAttribute('aria-hidden','true'); }
      else p.textContent = unit.text;
      return p;
    }));
    document.querySelectorAll('[data-reader-store]').forEach(link => {
      link.href = edition.store;
      link.textContent = lang === 'zh' ? '在 Amazon Kindle 閱讀繁體中文版 ↗' : lang === 'ja' ? 'Amazon Kindleで日本語版を読む ↗' : 'Read the English edition on Amazon Kindle ↗';
    });
  }
  new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  render();
})();
