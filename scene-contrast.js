/* Choose a native ink and the opposite hairline from the local scene. No text panels. */
(() => {
  'use strict';
  const body = document.body;
  if (!body || body.classList.contains('artwork-gallery-page') ||
      !(body.dataset.page === 'home' || body.classList.contains('immersive-page'))) return;
  const selector = '.home-copy h1,.home-copy h2,.home-copy p,.home-practice-link,' +
    '.intro-copy h1,.intro-question,.intro-note,.immersive-directory-primary,' +
    '.home-nav > a,.home-nav > .language-menu > .language-toggle,' +
    '.site-nav > a,.site-nav > .language-menu > .language-toggle,' +
    '.immersive-back,.home-brand > span,.brand,.home-legal,.site-utility';
  const sourceCache = new Map();
  const field = document.createElement('canvas');
  const fieldContext = field.getContext('2d', { willReadFrequently: true });
  const ink = document.createElement('canvas');
  const inkContext = ink.getContext('2d');
  field.className = 'scene-field';
  field.setAttribute('aria-hidden', 'true');
  if (!fieldContext || !inkContext || !CSS.supports('background-clip', 'text')) return;
  const load = url => {
    if (!sourceCache.has(url)) sourceCache.set(url, new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = url;
    }));
    return sourceCache.get(url);
  };
  const length = (value, basis) => value.endsWith('%') ? parseFloat(value) * basis / 100 : parseFloat(value) || 0;
  const linear = Float32Array.from({ length: 256 }, (_, value) => {
    value /= 255;
    return value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4;
  });
  let frame = 0, revision = 0;
  const segmenter = typeof Intl.Segmenter === 'function' ? new Intl.Segmenter(undefined, { granularity: 'grapheme' }) : null;
  async function update() {
    frame = 0;
    const current = ++revision;
    try {
      const home = body.dataset.page === 'home';
      const hero = home && document.querySelector('.home-hero');
      const pseudo = home && getComputedStyle(hero, '::before');
      const isPortrait = home && pseudo.content !== 'none' && pseudo.backgroundImage !== 'none';
      const style = home ? (isPortrait ? pseudo : getComputedStyle(hero)) : getComputedStyle(body, '::before');
      const match = style.backgroundImage.match(/url\(["']?([^"')]+)["']?\)/);
      if (!match) return;
      const image = await load(new URL(match[1], location.href).href);
      if (current !== revision) return;
      const base = home ? hero.getBoundingClientRect() : { left: 0, top: 0, width: innerWidth, height: innerHeight };
      const rect = home && !isPortrait ? base : {
        left: base.left + (parseFloat(style.left) || 0),
        top: base.top + (parseFloat(style.top) || 0),
        width: parseFloat(style.width) || base.width,
        height: parseFloat(style.height) || base.height
      };
      if (!rect.width || !rect.height) return;
      const scale = style.backgroundSize === 'contain'
        ? Math.min(rect.width / image.naturalWidth, rect.height / image.naturalHeight)
        : Math.max(rect.width / image.naturalWidth, rect.height / image.naturalHeight);
      const imageWidth = image.naturalWidth * scale, imageHeight = image.naturalHeight * scale;
      const position = style.backgroundPosition.split(/\s+/);
      const imageX = length(position[0], rect.width - imageWidth);
      const imageY = length(position[1] || '50%', rect.height - imageHeight);
      const rasterScale = 1;
      field.width = Math.ceil(rect.width * rasterScale);
      field.height = Math.ceil(rect.height * rasterScale);
      fieldContext.setTransform(rasterScale, 0, 0, rasterScale, 0, 0);
      fieldContext.fillStyle = '#f7f7f7';
      fieldContext.fillRect(0, 0, field.width, field.height);
      // This blur is only for stable background classification; it is never displayed.
      fieldContext.filter = 'blur(3px)';
      fieldContext.drawImage(image, imageX, imageY, imageWidth, imageHeight);
      fieldContext.filter = 'none';
      const pixels = fieldContext.getImageData(0, 0, field.width, field.height).data;
      const luminanceAt = (x, y) => {
        const fx = Math.floor((x - rect.left) * rasterScale), fy = Math.floor((y - rect.top) * rasterScale);
        if (fx < 0 || fy < 0 || fx >= field.width || fy >= field.height) return .93;
        const index = (fy * field.width + fx) * 4;
        let value = .2126 * linear[pixels[index]] + .7152 * linear[pixels[index + 1]] + .0722 * linear[pixels[index + 2]];
        if (style.maskImage !== 'none') {
          const opacity = Math.min(1, fy / (field.height * .08), (field.height - fy) / (field.height * .12));
          value = value * opacity + .93 * (1 - opacity);
        }
        return value;
      };
      for (const element of document.querySelectorAll(selector)) {
        const box = element.getBoundingClientRect();
        if (!box.width || !box.height || !element.getClientRects().length) continue;
        ink.width = Math.max(1, Math.ceil(box.width));
        ink.height = Math.max(1, Math.ceil(box.height));
        inkContext.fillStyle = '#111';
        inkContext.fillRect(0, 0, ink.width, ink.height);
        let lightCount = 0, solidLightCount = 0, glyphCount = 0, mixedGlyphs = 0;
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
        const range = document.createRange();
        while (walker.nextNode()) {
          const node = walker.currentNode;
          const segments = segmenter ? [...segmenter.segment(node.data)].map(item => item.segment) : Array.from(node.data);
          let offset = 0;
          for (const segment of segments) {
            range.setStart(node, offset);
            offset += segment.length;
            range.setEnd(node, offset);
            if (!segment.trim()) continue;
            for (const glyph of range.getClientRects()) {
              if (!glyph.width || !glyph.height) continue;
              const samples = [];
              for (const py of [.1,.5,.9]) for (const px of [.1,.5,.9])
                samples.push(luminanceAt(glyph.left + glyph.width * px, glyph.top + glyph.height * py));
              samples.sort((a, b) => a - b);
              const mixed = samples[0] < .16 && samples[8] > .5;
              const light = mixed || samples[4] < .18;
              if (samples[4] < .18) solidLightCount++;
              if (mixed) mixedGlyphs++;
              glyphCount++;
              if (light) lightCount++;
              // Retain a per-grapheme sampling map for local diagnostics; visible type uses native fill.
              inkContext.fillStyle = light ? '#fafaf7' : '#111';
              inkContext.fillRect(Math.floor(glyph.left - box.left) - 1, Math.floor(glyph.top - box.top) - 1,
                Math.ceil(glyph.width) + 2, Math.ceil(glyph.height) + 2);
            }
          }
        }
        element.style.setProperty('--scene-ink-map', `url("${ink.toDataURL()}")`);
        const mostlyLight = solidLightCount > 0 && solidLightCount >= glyphCount / 2;
        element.style.setProperty('--scene-solid-ink', mostlyLight ? '#f2f2ef' : '#111');
        element.style.setProperty('--scene-outline', mostlyLight ? '#fafaf7' : '#111');
        element.style.setProperty('--scene-edge-ink', mostlyLight ? '#111' : '#fff');
        element.classList.add('scene-ink');
        element.classList.toggle('scene-edge', mixedGlyphs > 0);
      }
      body.dataset.sceneInkReady = 'true';
      body.dataset.sceneField = 'original';
      body.dataset.sceneImageWidth = imageWidth.toFixed(3);
      body.dataset.sceneImageHeight = imageHeight.toFixed(3);
    } catch (_) {
      // The CSS supplies a crisp outline if canvas or the local image is unavailable.
      document.querySelectorAll('.scene-ink').forEach(element => {
        element.classList.remove('scene-ink', 'scene-edge');
        element.style.removeProperty('--scene-ink-map');
        element.style.removeProperty('--scene-outline');
        element.style.removeProperty('--scene-edge-ink');
        element.style.removeProperty('--scene-solid-ink');
      });
      body.dataset.sceneInkReady = 'fallback';
      field.remove();
    }
  }
  function schedule() {
    if (!frame) frame = requestAnimationFrame(update);
  }
  new MutationObserver(schedule).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  const observer = new ResizeObserver(schedule);
  document.querySelectorAll('.home-hero,.home-copy,.page-intro,.immersive-directory').forEach(element => observer.observe(element));
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('scroll', schedule, { passive: true });
  document.fonts?.ready.then(schedule);
  schedule();
})();
