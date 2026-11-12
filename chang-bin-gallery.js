(() => {
  'use strict';
  const filters = [...document.querySelectorAll('[data-chang-filter]')];
  const cards = [...document.querySelectorAll('.artwork-card')];
  function select(value) {
    if (!filters.some(button => button.dataset.changFilter === value)) value = 'selected';
    cards.forEach(card => { card.hidden = value !== 'selected' && card.dataset.series !== value; });
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.changFilter === value)));
    const visible = cards.filter(card => !card.hidden);
    const years = visible.map(card => Number(card.dataset.year));
    const first = Math.min(...years), last = Math.max(...years);
    document.querySelector('[data-gallery-count]').textContent = String(visible.length).padStart(2, '0');
    document.querySelector('[data-gallery-years]').textContent = first === last ? String(first) : `${first}–${last}`;
    const url = new URL(location.href);
    url.searchParams.set('series', value);
    history.replaceState(null, '', url);
    window.dispatchEvent(new Event('santoo:gallery-filter'));
  }
  filters.forEach(button => button.addEventListener('click', () => select(button.dataset.changFilter)));
  select(new URLSearchParams(location.search).get('series') || 'selected');
})();
