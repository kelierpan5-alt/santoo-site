(() => {
  const language = () => document.documentElement.lang.startsWith('zh') ? 'zh' : document.documentElement.lang.startsWith('ja') ? 'ja' : 'en';
  const filters = [...document.querySelectorAll('[data-art-filter]')];
  let selected = 'selected';
  function applyCopy() {
    const lang = language();
    document.querySelectorAll('[data-l10n]').forEach(node => {
      const value = node.dataset[lang] || node.dataset.en;
      if (value && node.textContent !== value) node.textContent = value;
    });
    document.querySelectorAll('[data-alt-en]').forEach(image => {
      const value = image.getAttribute('data-alt-' + lang) || image.getAttribute('data-alt-en');
      if (image.alt !== value) image.alt = value;
    });
    const musicLinks = {en:'https://music.apple.com/us/artist/clrpan/1839608535',zh:'https://music.apple.com/cn/artist/clrpan/1839608535',ja:'https://music.apple.com/jp/artist/clrpan/1839608535'};
    const musicLabels = {en:'Listen to Clrpan on Apple Music ↗',zh:'前往 Apple Music 聆聽 Clrpan ↗',ja:'Apple MusicでClrpanを聴く ↗'};
    document.querySelectorAll('[data-music-store]').forEach(link => {
      link.href = musicLinks[lang];
      if (link.textContent !== musicLabels[lang]) link.textContent = musicLabels[lang];
    });
    const coverLabels = {en:'Bone, Emptiness, Fire, Extinction, Heart — English edition cover',zh:'《骨空火滅心》繁體中文版封面',ja:'『骨・空・火・滅・心』日本語版の表紙'};
    document.querySelectorAll('[data-book-cover]').forEach(image => {
      const source = 'assets/books/bone-cover-' + lang + '.jpg';
      if (image.getAttribute('src') !== source) image.setAttribute('src', source);
      image.alt = coverLabels[lang];
    });
    const bookLinks = {en:'https://www.amazon.co.uk/dp/B0HDLWLZDM',zh:'https://www.amazon.com/dp/B0HDT3P2T5',ja:'https://www.amazon.co.jp/dp/B0HDPLV5F9'};
    const bookLabels = {en:'Read the English edition on Amazon Kindle ↗',zh:'在 Amazon Kindle 閱讀繁體中文版 ↗',ja:'Amazon Kindleで日本語版を読む ↗'};
    document.querySelectorAll('[data-book-store]').forEach(link => {
      link.href = bookLinks[lang];
      if (link.textContent !== bookLabels[lang]) link.textContent = bookLabels[lang];
    });
  }
  function filterWorks(value) {
    selected = value;
    let count = 0;
    document.querySelectorAll('.artwork-collection .artwork-card').forEach(card => {
      card.hidden = value === 'selected' ? card.dataset.series === 'early' : card.dataset.series !== value;
      if (!card.hidden) count++;
    });
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.artFilter === value)));
    const countNode = document.querySelector('[data-gallery-count]');
    const years = document.querySelector('[data-gallery-years]');
    if (countNode) countNode.textContent = String(count).padStart(2, '0');
    if (years) years.textContent = value === 'early' ? '2010–2022' : value === 'ming' ? '2025' : '2023–2025';
    window.dispatchEvent(new Event('santoo:gallery-filter'));
  }
  filters.forEach(button => button.addEventListener('click', () => filterWorks(button.dataset.artFilter)));
  if (filters.length) { const series=new URLSearchParams(location.search).get('series'); filterWorks(['early','ming'].includes(series)?series:'selected'); }
  new MutationObserver(applyCopy).observe(document.documentElement, {attributes:true,attributeFilter:['lang']});
  new MutationObserver(records => { if(records.some(record => [...record.addedNodes].some(node => node.nodeType === 1))) applyCopy(); }).observe(document.body, {childList:true,subtree:true});
  applyCopy();
})();
