(() => {
  "use strict";
  if (document.body.dataset.artworkViewer !== "detail") return;

  const copy = {
    en: {
      heading: "Selected Works", eyebrow: "PAN YAO / PAINTING", practice: "Practice ↗",
      close: "Close ×", index: "SELECTED WORKS", full: "01 / Full view", detail: "02 / Surface detail",
      hint: "Move over the painting to explore its surface.", touch: "Touch or drag on the painting to explore its surface.",
      overview: "Explore painting details. Use the arrow keys to move the viewing area.",
      open: "View artwork: ", error: "The image could not be loaded. Close and try again.",
      early: "Early studies in line, observation, materials, and composition, preceding the transition to abstract painting.",
      ming: "Part of the Ming series, a continuing group of abstract paintings concerned with visual balance, density, fracture, spatial tension, and attentional movement.",
      transition: "From representation toward the visual field: color, density, boundary, rhythm, and negative space become the elements of the composition."
    },
    zh: {
      heading: "精選作品", eyebrow: "潘垚 / 繪畫", practice: "創作 ↗",
      close: "關閉 ×", index: "精選作品", full: "01 / 完整作品", detail: "02 / 畫面細節",
      hint: "在完整作品上移動鼠標，探索畫面細節。", touch: "觸摸或拖動畫面，探索作品細節。",
      overview: "探索作品細節，也可使用方向鍵移動取景範圍。", open: "查看作品：",
      error: "圖片暫時無法加載，請關閉後重試。",
      early: "轉向抽象繪畫之前，圍繞線條、觀察、材料與構圖展開的早期習作。",
      ming: "《明》系列作品。這個持續發展的抽象繪畫系列，關注視覺平衡、密度、斷裂、空間張力與注意力的移動。",
      transition: "從具象再現走向視覺場域：色彩、密度、邊界、節奏與留白，成爲組織畫面的要素。"
    },
    ja: {
      heading: "作品選集", eyebrow: "潘垚 / 絵画", practice: "制作 ↗",
      close: "閉じる ×", index: "作品選集", full: "01 / 作品全体", detail: "02 / 画面の細部",
      hint: "作品の上でカーソルを動かすと、細部をご覧いただけます。", touch: "作品に触れたりドラッグしたりして、細部をご覧ください。",
      overview: "作品の細部を探索。矢印キーで表示範囲を移動できます。", open: "作品を表示：",
      error: "画像を読み込めませんでした。閉じて再度お試しください。",
      early: "抽象絵画への移行に先立つ、線、観察、素材、構成をめぐる初期の習作。",
      ming: "視覚的な均衡、密度、断裂、空間的緊張、注意の移動を探る、継続的な抽象絵画シリーズ「明」の作品。",
      transition: "再現から視覚の場へ。色彩、密度、境界、リズム、余白が画面を構成する要素となる。"
    }
  };
  const language = () => document.documentElement.lang.startsWith("zh") ? "zh" : document.documentElement.lang.startsWith("ja") ? "ja" : "en";
  const text = () => copy[language()];
  const isChang = document.body.dataset.artist === "chang-bin";
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const images = [...document.querySelectorAll(".artwork-card > img")];
  images.forEach((image) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "artwork-media";
    button.setAttribute("aria-haspopup", "dialog");
    image.before(button);
    button.append(image);
  });

  const inspector = document.createElement("dialog");
  inspector.className = "artwork-inspector";
  inspector.setAttribute("aria-labelledby", "inspector-title");
  inspector.setAttribute("aria-describedby", "inspector-metadata");
  inspector.innerHTML = `
    <header class="inspector-header">
      <span class="inspector-index"></span>
      <button type="button" class="inspector-close" autofocus></button>
    </header>
    <div class="inspector-viewing">
      <section>
        <p class="inspector-label" data-label="full"></p>
        <button type="button" class="inspector-overview" aria-describedby="inspector-hint">
          <img alt="" draggable="false">
          <span class="inspector-selection" aria-hidden="true" hidden></span>
        </button>
      </section>
      <section>
        <p class="inspector-label" data-label="detail"></p>
        <div class="inspector-detail" data-loading="true" aria-label="Painting detail">
          <img alt="" draggable="false">
        </div>
      </section>
    </div>
    <div class="inspector-description">
      <div><p class="inspector-artist">PAN YAO / 潘垚</p><h2 class="inspector-title" id="inspector-title"></h2></div>
      <div>
        <p class="inspector-metadata" id="inspector-metadata"></p>
        <p class="inspector-text"></p>
        <p class="inspector-hint" id="inspector-hint"></p>
      </div>
    </div>`;
  document.body.append(inspector);

  const overview = inspector.querySelector(".inspector-overview");
  const overviewImage = overview.querySelector("img");
  const selection = overview.querySelector(".inspector-selection");
  const detail = inspector.querySelector(".inspector-detail");
  const detailImage = detail.querySelector("img");
  const closeButton = inspector.querySelector(".inspector-close");
  let currentCard = null;
  let lastTrigger = null;
  let position = { x: .5, y: .5 };
  let frame = 0;
  let serial = 0;
  let failed = false;

  function renderCopy() {
    const c = text();
    document.querySelectorAll("[data-copy]").forEach((node) => {
      if (node.dataset.copy === 'heading') {
        if (isChang) {
          const active = document.querySelector('[data-chang-filter][aria-pressed="true"] [data-l10n]');
          node.textContent = active?.dataset[language()] || c.heading;
          return;
        }
        const series=document.querySelector('[data-art-filter][aria-pressed="true"]')?.dataset.artFilter;
        node.textContent=series==='ming'?({en:'Ming Series',zh:'明系列',ja:'明シリーズ'})[language()]:series==='early'?({en:'Early Studies',zh:"早期習作",ja:'初期習作'})[language()]:c.heading;
      } else if (isChang && node.dataset.copy === 'eyebrow') {
        node.textContent = {en:'CHANG BIN / PAINTING',zh:'常斌 / 繪畫',ja:'常斌 / 絵画'}[language()];
      } else if (c[node.dataset.copy]) node.textContent = c[node.dataset.copy];
    });
    document.querySelectorAll(".artwork-media").forEach((button) => button.setAttribute("aria-label", c.open + (button.querySelector("img")?.alt || "")));
    closeButton.textContent = c.close;
    overview.setAttribute("aria-label", c.overview);
    detail.setAttribute("aria-label", c.detail.replace(/^02 \/ /, ""));
    inspector.querySelectorAll("[data-label]").forEach((node) => node.textContent = c[node.dataset.label]);
    const hint = inspector.querySelector(".inspector-hint");
    hint.textContent = failed ? c.error : matchMedia("(hover: none)").matches ? c.touch : c.hint;
    if (!currentCard) return;
    const allCards = [...document.querySelectorAll("main .artwork-card")].filter(card => !card.hidden);
    const source = allCards.findIndex((card) => card.querySelector("img")?.getAttribute("src") === currentCard.querySelector("img")?.getAttribute("src"));
    inspector.querySelector(".inspector-index").textContent = `${c.index} / ${String(source + 1).padStart(2, "0")} — ${String(allCards.length).padStart(2, "0")}`;
    const caption = [...currentCard.querySelectorAll("figcaption span")];
    inspector.querySelector(".inspector-title").textContent = caption[0]?.textContent.trim() || currentCard.querySelector("img").alt;
    let metadata = caption[1]?.textContent.trim() || "";
    if (language() === "zh") metadata = metadata.replace("Mixed media on canvas", "布面综合材料");
    if (language() === "ja") metadata = metadata.replace("Mixed media on canvas", "キャンバスにミクストメディア");
    inspector.querySelector(".inspector-metadata").textContent = metadata;
    inspector.querySelector(".inspector-artist").textContent = isChang ? "CHANG BIN / 常斌" : "PAN YAO / 潘垚";
    const series = currentCard.dataset.series || (currentCard.closest(".ming-series") ? "ming" : currentCard.closest(".transition-abstraction") ? "transition" : "");
    const description = isChang ? {
      en:'Chang Bin’s abstract painting explores the relationship between the individual and systems through color, material, and divided compositions.',
      zh:'常斌的抽象繪畫透過色彩、物質與分割構圖，探索個體與系統之間的關係。',
      ja:'常斌の抽象絵画は、色彩、物質、分割された構図を通して、個体とシステムの関係を探る。'
    }[language()] : series ? c[series] : currentCard.closest(".section-body")?.querySelector("p:not(.lead)")?.textContent.trim();
    inspector.querySelector(".inspector-text").textContent = currentCard.getAttribute(`data-description-${language()}`) || description || "";
  }

  function renderDetail() {
    frame = 0;
    if (!inspector.open || failed || !overviewImage.naturalWidth) return;
    const imageRect = overviewImage.getBoundingClientRect();
    const overviewRect = overview.getBoundingClientRect();
    const width = detail.clientWidth;
    const height = detail.clientHeight;
    if (!imageRect.width || !imageRect.height || !width || !height) return;
    // A narrower source window gives the detail pane a closer surface view.
    // Allow up to 2x original pixels for smaller supplied images as well.
    const scale = Math.min(Math.max(5, width / imageRect.width * 2.2), 2 * overviewImage.naturalWidth / imageRect.width);
    const imageWidth = imageRect.width * scale;
    const imageHeight = imageRect.height * scale;
    const sourceX = clamp(position.x * imageWidth - width / 2, 0, Math.max(0, imageWidth - width));
    const sourceY = clamp(position.y * imageHeight - height / 2, 0, Math.max(0, imageHeight - height));
    detailImage.style.width = `${imageWidth}px`;
    detailImage.style.height = `${imageHeight}px`;
    detailImage.style.transform = `translate(${Math.max(0, (width - imageWidth) / 2) - sourceX}px, ${Math.max(0, (height - imageHeight) / 2) - sourceY}px)`;
    selection.style.width = `${Math.min(imageRect.width, width / scale)}px`;
    selection.style.height = `${Math.min(imageRect.height, height / scale)}px`;
    selection.style.left = `${imageRect.left - overviewRect.left + sourceX / scale}px`;
    selection.style.top = `${imageRect.top - overviewRect.top + sourceY / scale}px`;
    selection.hidden = false;
  }
  function scheduleDetail() { if (!frame) frame = requestAnimationFrame(renderDetail); }

  function close() {
    serial++;
    inspector.close();
    selection.hidden = true;
    document.body.classList.remove("artwork-inspector-open");
    if (lastTrigger?.isConnected) lastTrigger.focus({ preventScroll: true });
  }
  async function open(button) {
    const image = button.querySelector("img");
    if (!image) return;
    const request = ++serial;
    lastTrigger = button;
    currentCard = button.closest(".artwork-card");
    position = { x: .5, y: .5 };
    failed = false;
    selection.hidden = true;
    detail.dataset.loading = "true";
    overviewImage.src = image.dataset.fullSrc || image.currentSrc || image.src;
    overviewImage.alt = image.alt;
    detailImage.src = overviewImage.src;
    detailImage.alt = `${image.alt} — detail`;
    renderCopy();
    inspector.showModal();
    inspector.scrollTop = 0;
    document.body.classList.add("artwork-inspector-open");
    closeButton.focus({ preventScroll: true });
    try {
      await Promise.all([overviewImage.decode(), detailImage.decode()]);
      if (request !== serial || !inspector.open) return;
      detail.dataset.loading = "false";
      scheduleDetail();
    } catch (_) {
      if (request !== serial || !inspector.open) return;
      failed = true;
      renderCopy();
    }
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest?.(".artwork-media");
    if (button && !inspector.open) open(button);
  });
  closeButton.addEventListener("click", close);
  inspector.addEventListener("cancel", (event) => { event.preventDefault(); close(); });
  // Keep Escape from also closing an existing Art Practice section behind this dialog.
  window.addEventListener("keydown", (event) => {
    if (inspector.open && event.key === "Escape") {
      event.preventDefault();
      event.stopImmediatePropagation();
      close();
    }
  }, true);
  let backdropDown = false;
  const outside = (event) => {
    const rect = inspector.getBoundingClientRect();
    return event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
  };
  inspector.addEventListener("pointerdown", (event) => { backdropDown = event.target === inspector && outside(event); });
  inspector.addEventListener("click", (event) => { if (backdropDown && event.target === inspector && outside(event)) close(); backdropDown = false; });

  function move(event) {
    const rect = overviewImage.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    position = { x: clamp((event.clientX - rect.left) / rect.width, 0, 1), y: clamp((event.clientY - rect.top) / rect.height, 0, 1) };
    scheduleDetail();
  }
  overview.addEventListener("pointermove", (event) => { if (event.pointerType === "mouse" || event.buttons) move(event); });
  overview.addEventListener("pointerdown", (event) => { overview.setPointerCapture(event.pointerId); move(event); });
  overview.addEventListener("keydown", (event) => {
    const delta = { ArrowLeft: [-.05, 0], ArrowRight: [.05, 0], ArrowUp: [0, -.05], ArrowDown: [0, .05] }[event.key];
    if (!delta) return;
    event.preventDefault();
    position.x = clamp(position.x + delta[0], 0, 1);
    position.y = clamp(position.y + delta[1], 0, 1);
    scheduleDetail();
  });
  new ResizeObserver(scheduleDetail).observe(detail);
  new MutationObserver(renderCopy).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  renderCopy();
  window.addEventListener('santoo:gallery-filter',renderCopy);
})();
