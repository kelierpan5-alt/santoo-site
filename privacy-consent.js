(() => {
  'use strict';
  if (window.self !== window.top || document.querySelector('[data-privacy-banner]')) return;
  const VERSION = '2026-11-11';
  const KEY = 'santoo-privacy-choice';
  const SESSION_KEY = 'santoo-analytics-session';
  const MAX_AGE = 180 * 86400000;
  const words = {
    en:{title:'Your privacy choices',body:'We use necessary storage for language and privacy preferences. With your permission, visit analytics records your IP address, device/browser type, pages, time, and artwork views to understand visits and improve the website.',allow:'Allow visit analytics',reject:'Necessary only',custom:'Customize',settings:'Privacy settings',policy:'Legal & Privacy',necessary:'Necessary functions',necessaryText:'Language, privacy choices, and page transitions. Always available.',analytics:'Optional visit analytics',analyticsText:'IP address, device/browser and operating system, language, country when available, referral site, pages, time, and artwork opens. Raw records: 30 days. Aggregated counts: 12 months.',save:'Save choices',close:'Close settings',saved:'Your choices have been saved.',unavailable:'Your choices are saved. Visit analytics is unavailable; no analytics record was sent.',changed:'You can change these choices at any time using Privacy settings.',read:'Read our ',ending:'.'},
    zh:{title:"隱私與訪問統計",body:"我們使用必要存儲保存語言和隱私偏好。經您同意，訪問統計會記錄IP地址、設備與瀏覽器類型、訪問頁面、時間及作品打開情況，用於瞭解訪問情況和改進網站。",allow:"允許訪問統計",reject:"僅使用必要功能",custom:"自定義設置",settings:"隱私設置",policy:"法律與隱私",necessary:'必要功能',necessaryText:"語言、隱私選擇和頁面過渡。始終可用。",analytics:"可選訪問統計",analyticsText:"IP地址、設備與瀏覽器和操作系統、語言、可用時的國家信息、來源網站、頁面、時間及作品打開情況。原始記錄保留30天，彙總計數保留12個月。",save:"保存選擇",close:"關閉設置",saved:"隱私選擇已保存。",unavailable:"偏好已保存。訪問統計服務暫不可用，未發送統計記錄。",changed:"您可以隨時通過“隱私設置”更改選擇。",read:'查看',ending:'。'},
    ja:{title:'プライバシーの選択',body:'言語とプライバシー設定の保存に必要なストレージを使用します。同意いただいた場合、IPアドレス、端末・ブラウザーの種類、閲覧ページ、時刻、作品の閲覧を訪問分析に利用します。',allow:'訪問分析を許可',reject:'必要な機能のみ',custom:'設定を選択',settings:'プライバシー設定',policy:'法務・プライバシー',necessary:'必要な機能',necessaryText:'言語、プライバシー設定、ページ遷移に使用。常に利用可能です。',analytics:'任意の訪問分析',analyticsText:'IPアドレス、端末・ブラウザー・OS、言語、取得可能な国情報、参照元サイト、ページ、時刻、作品閲覧。生データは30日間、集計数は12か月間保持します。',save:'選択を保存',close:'設定を閉じる',saved:'選択を保存しました。',unavailable:'選択を保存しました。訪問分析を利用できないため、分析記録は送信されませんでした。',changed:'プライバシー設定からいつでも変更できます。',read:'',ending:'をご覧ください。'}
  };
  const lang = () => document.documentElement.lang.startsWith('zh') ? 'zh' : document.documentElement.lang.startsWith('ja') ? 'ja' : 'en';
  const copy = () => words[lang()];
  const get = (storage,key) => { try { return storage.getItem(key); } catch { return null; } };
  const put = (storage,key,value) => { try { storage.setItem(key,value); } catch {} };
  const remove = (storage,key) => { try { storage.removeItem(key); } catch {} };
  let choice = null;
  try { const value = JSON.parse(get(localStorage,KEY)); if (value?.version === VERSION && typeof value.analytics === 'boolean' && Number.isFinite(value.savedAt) && Date.now() >= value.savedAt && Date.now()-value.savedAt < MAX_AGE) choice=value; } catch {}
  let pageSent = false;
  let configPromise;
  let lastFocus;
  let toastTimer;

  const banner = document.createElement('aside');
  banner.className = 'privacy-banner';
  banner.dataset.privacyBanner = '';
  banner.setAttribute('aria-labelledby','privacy-banner-title');
  banner.innerHTML = '<h2 id="privacy-banner-title"></h2><p data-privacy-body></p><p><span data-read></span><a href="legal.html" data-policy></a><span data-ending></span></p><div class="privacy-actions"><button type="button" data-action="allow"></button><button type="button" data-action="reject"></button><button type="button" data-action="custom"></button></div>';
  banner.hidden = !!choice;
  const toggle = document.createElement('button');
  toggle.className='privacy-toggle'; toggle.type='button'; toggle.setAttribute('aria-haspopup','dialog');
  toggle.hidden=!choice;
  const dialog = document.createElement('dialog');
  dialog.className='privacy-dialog'; dialog.setAttribute('aria-labelledby','privacy-settings-title');
  dialog.innerHTML='<div class="privacy-dialog-top"><h2 id="privacy-settings-title"></h2><button type="button" class="privacy-dialog-close">×</button></div><p data-changed></p><div class="privacy-option"><div><label for="privacy-necessary"></label><p data-necessary-text></p></div><input id="privacy-necessary" type="checkbox" checked disabled></div><div class="privacy-option"><div><label for="privacy-analytics"></label><p data-analytics-text></p></div><input id="privacy-analytics" type="checkbox"></div><p><a href="legal.html" data-policy></a></p><div class="privacy-actions"><button type="button" data-action="save"></button><button type="button" data-action="reject"></button></div>';
  const toast = document.createElement('div'); toast.className='privacy-toast'; toast.hidden=true; toast.setAttribute('role','status');
  document.body.append(banner,toggle,dialog,toast);
  const checkbox = dialog.querySelector('#privacy-analytics');
  function render() {
    const c=copy();
    banner.querySelector('h2').textContent=c.title;
    banner.querySelector('[data-privacy-body]').textContent=c.body;
    banner.querySelector('[data-read]').textContent=c.read;
    banner.querySelector('[data-ending]').textContent=c.ending;
    dialog.querySelector('h2').textContent=c.settings;
    dialog.querySelector('[data-changed]').textContent=c.changed;
    dialog.querySelector('[for="privacy-necessary"]').textContent=c.necessary;
    dialog.querySelector('[data-necessary-text]').textContent=c.necessaryText;
    dialog.querySelector('[for="privacy-analytics"]').textContent=c.analytics;
    dialog.querySelector('[data-analytics-text]').textContent=c.analyticsText;
    dialog.querySelector('.privacy-dialog-close').setAttribute('aria-label',c.close);
    document.querySelectorAll('.privacy-banner [data-action],.privacy-dialog [data-action]').forEach(button=>button.textContent=c[button.dataset.action]);
    document.querySelectorAll('.privacy-banner [data-policy],.privacy-dialog [data-policy]').forEach(link=>link.textContent=c.policy);
    toggle.textContent=c.settings;
  }
  function showSettings() { lastFocus=document.activeElement; checkbox.checked=choice?.analytics===true; dialog.showModal(); }
  function closeSettings() { dialog.close(); if(lastFocus?.isConnected && !lastFocus.closest('[hidden]')) lastFocus.focus({preventScroll:true}); }
  function notify(message) { clearTimeout(toastTimer); toast.textContent=message; toast.hidden=false; toastTimer=setTimeout(()=>toast.hidden=true,6500); }
  function configuration() {
    if(!configPromise) configPromise=fetch('/api/analytics/status',{credentials:'omit',cache:'no-store',referrerPolicy:'no-referrer'}).then(response=>response.ok?response.json():null).catch(()=>null);
    return configPromise;
  }
  function session() {
    let id=get(sessionStorage,SESSION_KEY);
    if(!id) { id=crypto.randomUUID(); put(sessionStorage,SESSION_KEY,id); }
    return id;
  }
  async function record(type,artwork='') {
    if(!choice?.analytics) return false;
    if(type==='page_view' && pageSent) return true;
    const config=await configuration();
    if(!choice?.analytics || !config?.enabled || config.version!==VERSION) return false;
    let referrer='';try{referrer=new URL(document.referrer).origin;}catch{}
    const payload={version:VERSION,consent:true,type,page:location.pathname==='/'?'/index.html':location.pathname,artwork,language:lang(),session:session(),referrer};
    try {
      const response=await fetch('/api/analytics/collect',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),credentials:'omit',cache:'no-store',referrerPolicy:'no-referrer'});
      if(response.ok && type==='page_view') pageSent=true;
      return response.ok;
    } catch { return false; }
  }
  async function save(analytics) {
    choice={version:VERSION,analytics,savedAt:Date.now()};
    put(localStorage,KEY,JSON.stringify(choice));
    if(!analytics) { remove(sessionStorage,SESSION_KEY); pageSent=false; }
    banner.hidden=true; toggle.hidden=false;
    if(dialog.open) closeSettings();
    if(analytics) { configPromise=null; notify(await record('page_view')?copy().saved:copy().unavailable); }
    else notify(copy().saved);
    window.dispatchEvent(new CustomEvent('santoo:privacy-change',{detail:{analytics}}));
  }
  banner.addEventListener('click',event=>{const action=event.target.closest('[data-action]')?.dataset.action;if(action==='allow')save(true);if(action==='reject')save(false);if(action==='custom')showSettings();});
  dialog.addEventListener('click',event=>{const action=event.target.closest('[data-action]')?.dataset.action;if(action==='save')save(checkbox.checked);if(action==='reject')save(false);});
  toggle.addEventListener('click',showSettings);
  document.addEventListener('click',event=>{if(event.target.closest?.('[data-open-privacy]'))showSettings();});
  dialog.querySelector('.privacy-dialog-close').addEventListener('click',closeSettings);
  window.addEventListener('keydown',event=>{if(dialog.open && event.key==='Escape'){event.preventDefault();event.stopImmediatePropagation();closeSettings();}},true);
  dialog.addEventListener('cancel',event=>{event.preventDefault();closeSettings();});
  document.addEventListener('click',event=>{const media=event.target.closest?.('.artwork-media');if(media)record('artwork_open',media.closest('.artwork-card')?.querySelector('figcaption span')?.textContent.trim()||'');});
  window.addEventListener('storage',event=>{if(event.key!==KEY)return;try{const value=JSON.parse(event.newValue);choice=value?.version===VERSION?value:null;}catch{choice=null;}if(!choice?.analytics){remove(sessionStorage,SESSION_KEY);pageSent=false;}banner.hidden=!!choice;toggle.hidden=!choice;});
  new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  render();
  if(choice?.analytics) record('page_view');
})();
