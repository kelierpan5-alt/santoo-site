(() => {
  'use strict';
  // Keep links to the former flat About sections working within the new hierarchy.
  function normalizeLegacyLink() {
    if (document.body.dataset.page !== 'about' || !['#cv', '#profiles', '#collaborators'].includes(location.hash)) return false;
    const url = new URL(location.href);
    url.searchParams.set('artist', location.hash === '#collaborators' ? 'chang-bin' : 'pan-yao');
    url.searchParams.set('view', location.hash === '#cv' ? 'cv' : location.hash === '#profiles' ? 'profiles' : 'bio');
    url.hash = 'artist';
    history.replaceState(null, '', url);
    return true;
  }
  normalizeLegacyLink();

  const scrollTop = browser => {
    const dialog = browser.closest('.immersive-dialog');
    if (dialog) dialog.scrollTop = 0;
  };
  function selectView(panel, view, focus = false) {
    const content = [...panel.querySelectorAll('[data-artist-content]')];
    if (!content.some(item => item.dataset.artistContent === view)) return;
    content.forEach(item => { item.hidden = item.dataset.artistContent !== view; });
    panel.querySelectorAll('[data-artist-view]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.artistView === view));
    });
    if (focus) scrollTop(panel);
  }
  function selectArtist(browser, artist, view = 'bio', focus = true) {
    const panels = [...browser.querySelectorAll('[data-artist-panel]')];
    const selected = panels.find(panel => panel.dataset.artistPanel === artist);
    if (!selected) return;
    browser.querySelector('[data-artist-selector]').hidden = true;
    panels.forEach(panel => { panel.hidden = panel !== selected; });
    browser.querySelectorAll('[data-artist-open]').forEach(button => {
      button.setAttribute('aria-expanded', String(button.dataset.artistOpen === artist));
    });
    browser.dataset.activeArtist = artist;
    selectView(selected, view);
    scrollTop(browser);
    if (focus) selected.querySelector('[data-artist-title]')?.focus({preventScroll:true});
  }

  document.addEventListener('click', event => {
    const control = event.target.closest?.('[data-artist-open], [data-artist-back], [data-artist-view]');
    const browser = control?.closest('[data-artist-browser]');
    if (!browser) return;
    if (control.hasAttribute('data-artist-view')) {
      selectView(control.closest('[data-artist-panel]'), control.dataset.artistView, true);
    } else if (control.hasAttribute('data-artist-back')) {
      const previous = browser.dataset.activeArtist;
      browser.querySelectorAll('[data-artist-panel]').forEach(panel => { panel.hidden = true; });
      browser.querySelector('[data-artist-selector]').hidden = false;
      browser.querySelectorAll('[data-artist-open]').forEach(button => button.setAttribute('aria-expanded', 'false'));
      delete browser.dataset.activeArtist;
      scrollTop(browser);
      browser.querySelector(`[data-artist-open="${previous}"]`)?.focus({preventScroll:true});
    } else {
      selectArtist(browser, control.dataset.artistOpen);
    }
  });

  // Read an explicit artist link once; closing and reopening returns to the chooser.
  let initialLink = true;
  window.addEventListener('hashchange', () => {
    if (normalizeLegacyLink()) initialLink = true;
  });
  window.addEventListener('santoo:section-open', event => {
    if (event.detail.id !== 'artist' || !initialLink) return;
    initialLink = false;
    const params = new URLSearchParams(location.search);
    const browser = event.detail.content.querySelector('[data-artist-browser]');
    if (browser && params.has('artist')) selectArtist(browser, params.get('artist'), params.get('view') || 'bio');
  });
})();
