(() => {
  'use strict';
  document.addEventListener('click', event => {
    const control = event.target.closest?.('[data-studio-open], [data-studio-back]');
    const browser = control?.closest('[data-studio-browser]');
    if (!browser) return;
    const selector = browser.querySelector('[data-studio-selector]');
    const panels = [...browser.querySelectorAll('[data-studio-detail]')];
    const choices = [...browser.querySelectorAll('[data-studio-open]')];
    const dialog = browser.closest('.immersive-dialog');
    if (control.hasAttribute('data-studio-back')) {
      const previous = browser.dataset.activeStudio;
      panels.forEach(panel => { panel.hidden = true; });
      selector.hidden = false;
      choices.forEach(choice => choice.setAttribute('aria-expanded', 'false'));
      delete browser.dataset.activeStudio;
      if (dialog) dialog.scrollTop = 0;
      choices.find(choice => choice.dataset.studioOpen === previous)?.focus({preventScroll:true});
      return;
    }
    const id = control.dataset.studioOpen;
    const selected = panels.find(panel => panel.dataset.studioDetail === id);
    if (!selected) return;
    selector.hidden = true;
    panels.forEach(panel => { panel.hidden = panel !== selected; });
    choices.forEach(choice => choice.setAttribute('aria-expanded', String(choice === control)));
    browser.dataset.activeStudio = id;
    if (dialog) dialog.scrollTop = 0;
    selected.querySelector('.studio-detail-title')?.focus({preventScroll:true});
  });
})();
