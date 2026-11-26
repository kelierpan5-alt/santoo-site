(() => {
  'use strict';
  const filters = [...document.querySelectorAll('[data-chai-filter]')];
  const cards = [...document.querySelectorAll('.artwork-card')];
  function select(value) {
    if (!filters.some(button => button.dataset.chaiFilter === value)) value = 'selected';
    cards.forEach(card => { card.hidden = value === 'selected' ? card.dataset.series === 'study' : card.dataset.series !== value; });
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.chaiFilter === value)));
    document.querySelector('[data-gallery-count]').textContent = String(cards.filter(card => !card.hidden).length).padStart(2, '0');
    const url = new URL(location.href);
    url.searchParams.set('series', value);
    history.replaceState(null, '', url);
    window.dispatchEvent(new Event('santoo:gallery-filter'));
  }
  filters.forEach(button => button.addEventListener('click', () => select(button.dataset.chaiFilter)));
  select(new URLSearchParams(location.search).get('series') || 'selected');
})();
