(() => {
  'use strict';
  const email = 'pan@santoo.org';
  const language = () => document.documentElement.lang.startsWith('zh') ? 'zh' : document.documentElement.lang.startsWith('ja') ? 'ja' : 'en';
  const messages = {
    copied: {en:'Email address copied.',zh:'郵箱地址已複製。',ja:'メールアドレスをコピーしました。'},
    selected: {en:'The address is selected. Copy it and paste it into your mailbox.',zh:'已選取郵箱地址，請複製後貼到你的郵箱。',ja:'アドレスを選択しました。コピーしてメール画面に貼り付けてください。'}
  };
  function render() {
    const lang = language();
    document.querySelectorAll('[data-contact-compose]').forEach(panel => {
      const subject = panel.getAttribute(`data-subject-${lang}`) || panel.dataset.subjectEn;
      const links = {
        gmail: 'https://mail.google.com/mail/?' + new URLSearchParams({view:'cm',fs:'1',to:email,su:subject}),
        outlook: 'https://outlook.live.com/mail/0/deeplink/compose?' + new URLSearchParams({to:email,subject}),
        native: 'mailto:' + email + '?subject=' + encodeURIComponent(subject)
      };
      panel.querySelectorAll('[data-contact-provider]').forEach(link => {
        const href = links[link.dataset.contactProvider];
        if (link.getAttribute('href') !== href) link.setAttribute('href', href);
      });
      const status = panel.querySelector('[data-contact-status]');
      const message = messages[status.dataset.state]?.[lang] || '';
      if (status.textContent !== message) status.textContent = message;
    });
  }
  document.addEventListener('click', async event => {
    const button = event.target.closest?.('[data-copy-contact]');
    const panel = button?.closest('[data-contact-compose]');
    if (!panel) return;
    const status = panel.querySelector('[data-contact-status]');
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(email);
      status.dataset.state = 'copied';
    } catch (_) {
      const range = document.createRange();
      range.selectNodeContents(panel.querySelector('[data-contact-address]'));
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      status.dataset.state = 'selected';
    }
    render();
  });
  new MutationObserver(render).observe(document.documentElement, {attributes:true,attributeFilter:['lang']});
  new MutationObserver(records => {
    if (records.some(record => [...record.addedNodes].some(node => node.nodeType === 1))) render();
  }).observe(document.body, {childList:true,subtree:true});
  render();
})();
