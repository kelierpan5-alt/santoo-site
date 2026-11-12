/* Language preference first, then coarse hosting-region hint, then browser language. */
(() => {
  'use strict';
  const KEY = 'santoo-lang';
  const CACHE = 'santoo-region-language';
  const normalize = value => /^(zh)(-|$)/i.test(value || '') ? 'zh' : /^(ja)(-|$)/i.test(value || '') ? 'ja' : /^(en)(-|$)/i.test(value || '') ? 'en' : null;
  const read = (kind, key) => { try { return window[kind].getItem(key); } catch { return null; } };
  const write = (kind, key, value) => { try { window[kind].setItem(key, value); } catch {} };
  const browserLanguage = () => {
    for (const value of navigator.languages || [navigator.language]) {
      const match = normalize(value);
      if (match) return match;
    }
    return 'en';
  };
  let manual = normalize(read('localStorage', KEY));
  let cached = null;
  try {
    const entry = JSON.parse(read('sessionStorage', CACHE));
    if (entry && entry.expiresAt > Date.now() && entry.expiresAt <= Date.now() + 21600000) cached = normalize(entry.language);
  } catch {}
  let language = manual || cached || browserLanguage();
  const publish = value => {
    language = value;
    document.documentElement.lang = value === 'zh' ? 'zh-Hant' : value;
    window.dispatchEvent(new CustomEvent('santoo:language-change', {detail:{language:value}}));
  };
  const select = value => {
    const next = normalize(value);
    if (!next) return;
    manual = next;
    write('localStorage', KEY, next);
    publish(next);
  };
  const api = {get language() { return language; }, select};
  window.SantooLocale = api;
  publish(language);
  window.addEventListener('storage', event => {
    if (event.key !== KEY) return;
    manual = normalize(event.newValue);
    publish(manual || cached || browserLanguage());
  });
  api.ready = (async () => {
    if (manual || cached || window.self !== window.top) return language;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1800);
    try {
      const response = await fetch('/api/locale', {credentials:'omit',cache:'no-store',referrerPolicy:'no-referrer',signal:controller.signal});
      if (!response.ok) return language;
      const result = await response.json();
      const country = typeof result.country === 'string' ? result.country.toUpperCase() : '';
      if (!/^[A-Z]{2}$/.test(country) || country === 'XX') return language;
      const next = country === 'JP' ? 'ja' : ['CN','TW','HK','MO'].includes(country) ? 'zh' : 'en';
      if (!manual) {
        cached = next;
        write('sessionStorage', CACHE, JSON.stringify({language:next,expiresAt:Date.now()+21600000}));
        publish(next);
      }
    } catch {} finally { clearTimeout(timeout); }
    return language;
  })();
})();
