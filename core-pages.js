(() => {
  'use strict';
  // These pages have explicit language URLs. Do not replace their static text
  // from geolocation or a previously saved preference.
  const lang = document.documentElement.lang.startsWith('zh') ? 'zh' : document.documentElement.lang.startsWith('ja') ? 'ja' : 'en';
  document.addEventListener('click', event => {
    const anchor = event.target.closest?.('a[href]');
    if (!anchor) return;
    const url = new URL(anchor.href, location.href);
    if (url.origin !== location.origin) return;
    try { localStorage.setItem('santoo-lang', anchor.getAttribute('hreflang')?.slice(0, 2) || lang); } catch (_) {}
  });
})();
