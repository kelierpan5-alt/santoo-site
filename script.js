(function initSantoo() {
  // ===============================
  // 1. 核心变量声明
  // ===============================
  const layer = document.getElementById("introSequence");
  const mark = document.getElementById("introSantoo");
  const video = document.getElementById("introVideo");
  const mainPage = document.getElementById("mainPage");
  const content = document.getElementById("systemLabel");
  const structure = document.getElementById("structureContainer");
  const footer = document.querySelector(".site-footer");

  const hasSeenIntro = sessionStorage.getItem("santoo-visited");
// --- 新增项目模态框变量 ---
const projectOverlay = document.getElementById("projectOverlay");
const yearModal = document.getElementById("yearModal");
const projectModal = document.getElementById("projectModal");
const projectContent = document.getElementById("projectContent");
const jumpBtn = document.getElementById("jumpUpBtn");
const openYearBtn = document.getElementById("openYearModal");

let currentProjectKey = null; // 追踪当前打开的项目

const projectData = {
  asam: {
    en: `
      <h1>ASAM × NPF</h1>
      <p><strong>Adaptive Structural Awareness Module × Neurocognitive Perception Framework</strong></p>
      <div class="section-divider"></div>
      <h2>Overview</h2>
      <p>ASAM × NPF is a structure-based artistic project focusing on how visual configurations are perceived and navigated.</p>
      <p>It explores:</p>
      <ul>
        <li>where attention begins</li>
        <li>how it moves</li>
        <li>when it disengages</li>
      </ul>
      <h2>Project Format</h2>
      <ul>
        <li><strong>Spatial Installation</strong> — Abstract works forming a structured visual field</li>
        <li><strong>Workshops</strong> — Observation of viewing behavior</li>
      </ul>
      <p class="project-footer">Detailed proposal available upon request.</p>
    `,
    zh: `
      <h1>ASAM × NPF</h1>
      <p><strong>适应性结构感知模块 × 神经认知感知框架</strong></p>
      <div class="section-divider"></div>
      <h2>项目概述</h2>
      <p>ASAM × NPF 是一个基于结构的艺术项目，专注于视觉配置如何被感知和导航。</p>
      <p>它探索：</p>
      <ul>
        <li>注意力从何处开始</li>
        <li>它如何移动</li>
        <li>它何时脱离</li>
      </ul>
      <h2>项目形式</h2>
      <ul>
        <li><strong>空间装置</strong> — 形成结构化视觉场的抽象作品</li>
        <li><strong>工作坊</strong> — 观看行为的观察</li>
      </ul>
      <p class="project-footer">可根据要求提供详细提案。</p>
    `,
    ja: `
      <h1>ASAM × NPF</h1>
      <p><strong>適応型構造認知モジュール × 神経認知知覚フレームワーク</strong></p>
      <div class="section-divider"></div>
      <h2>プロジェクト概要</h2>
      <p>ASAM × NPFは、視覚的配置がどのように認識され、ナビゲートされるかに焦点を当てた構造ベースのアートプロジェクトです。</p>
      <p>以下の点を探求します：</p>
      <ul>
        <li>注意がどこから始まるか</li>
        <li>どのように移動するか</li>
        <li>いつ離れるか</li>
      </ul>
      <h2>プロジェクト形式</h2>
      <ul>
        <li><strong>空間インスタレーション</strong> — 構造化された視覚場を形成する抽象作品</li>
        <li><strong>ワークショップ</strong> — 視聴行動の観察</li>
      </ul>
      <p class="project-footer">詳細な提案書はリクエストに応じて提供可能です。</p>
    `
  }
};

  // ===============================
  // 2. 全局语言切换
  // ===============================
  window.switchLang = function (lang) {
    const targets = document.querySelectorAll("[data-en], #current-lang");
    const tl = gsap.timeline();

    tl.to(targets, { opacity: 0, duration: 0.5, ease: "power2.inOut" })
      .call(() => {
        // 1. 执行原有的文本切换逻辑
        document.querySelectorAll("[data-en]").forEach(el => {
          const text = el.getAttribute(`data-${lang}`);
          if (text) el.innerText = text;
        });

        // 2. 新增：更新项目模态框内的 UI 状态
        updateModalLangUI(lang);

        // 3. 新增：如果项目详情页是打开的，重新渲染内容
        if (currentProjectKey) {
          renderProjectDetail(currentProjectKey, lang);
        }

        // 4. 更新语言按钮显示并保存状态
        const names = {
          en: "LANGUAGE",
          zh: "语言",
          ja: "言語"
        };
        const langBtn = document.getElementById("current-lang");
        if (langBtn) langBtn.innerText = names[lang];
        localStorage.setItem("santoo-lang", lang);

      }) // <--- 关键修复：这里之前缺少了 }) 导致语法错误
      .to(targets, { opacity: 1, duration: 0.5 });
  };

// 辅助函数：更新模态框按钮高亮
function updateModalLangUI(lang) {
  document.querySelectorAll('.modal-lang span').forEach(s => s.classList.remove('active'));
  ['proj-lang-', 'proj-detail-lang-'].forEach(prefix => {
    const btn = document.getElementById(prefix + lang);
    if (btn) btn.classList.add('active');
  });
}

// 辅助函数：渲染项目详情内容
function renderProjectDetail(key, lang) {
  if (projectContent && projectData[key]) {
    projectContent.innerHTML = projectData[key][lang] || projectData[key]['en'];
  }
}

  // ===============================
  // 3. Evidence 多语言数据
  // ===============================
  const evidenceData = {
    "evidence-music": {
      en: `
        <h2>Music Distribution & Copyright</h2>
        <p><strong>Category:</strong> Commercial Activity</p>
        <p>Over 180 original tracks distributed across global platforms.</p>
        <ul>
          <li>Platform dashboard screenshots</li>
          <li>Track lists and metadata</li>
          <li>Engagement data (10K+ streams)</li>
        </ul>
      `,
      zh: `
        <h2>音乐发行与版权系统</h2>
        <p><strong>类别：</strong>商业活动</p>
        <p>超过180首原创音乐已在全球平台发行。</p>
        <ul>
          <li>平台后台截图</li>
          <li>曲目列表与元数据</li>
          <li>互动数据（1万+播放量）</li>
        </ul>
      `,
      ja: `
        <h2>音楽配信および著作権システム</h2>
        <p><strong>分類：</strong>商業活動</p>
        <p>180曲以上のオリジナル楽曲を世界中で配信。</p>
        <ul>
          <li>プラットフォーム管理画面</li>
          <li>トラックリスト</li>
          <li>再生データ（1万回以上）</li>
        </ul>
      `
    },

    "evidence-paper": {
      en: `<h2>Paper Republic (UK Publication)</h2>`,
      zh: `<h2>Paper Republic（英国出版）</h2>`,
      ja: `<h2>Paper Republic（英国出版）</h2>`
    },

    "evidence-association": {
      en: `<h2>Vice Chairman, Calligraphers Association</h2>`,
      zh: `<h2>书法家协会副主席</h2>`,
      ja: `<h2>書道家協会 副会長</h2>`
    },

    "evidence-kyoto": {
      en: `<h2>Kyoto International Exhibition (Award)</h2>`,
      zh: `<h2>京都国际展览（获奖）</h2>`,
      ja: `<h2>京都国際展覧会（受賞）</h2>`
    },

    "evidence-busan": {
      en: `<h2>China–Korea Exhibition (Busan)</h2>`,
      zh: `<h2>中韩交流展（釜山）</h2>`,
      ja: `<h2>中韓交流展（釜山）</h2>`
    },

    "evidence-france": {
      en: `<h2>China–France Abstract Exhibition</h2>`,
      zh: `<h2>中法抽象艺术展</h2>`,
      ja: `<h2>中仏抽象芸術展</h2>`
    },

    "evidence-practice": {
      en: `<h2>Long-term Visual & Tattoo Practice</h2>`,
      zh: `<h2>长期视觉艺术与纹身实践</h2>`,
      ja: `<h2>長期にわたるビジュアルおよびタトゥー実践</h2>`
    }
  };

  function updateEvidenceLanguage(lang) {
    const contentDiv = document.getElementById("evidenceContent");
    if (!contentDiv || !contentDiv.dataset.key) return;

    const key = contentDiv.dataset.key;
    contentDiv.innerHTML =
      evidenceData[key][lang] || evidenceData[key]["en"];
  }

  // ===============================
  // 4. Evidence 模态框逻辑
  // ===============================
  document.querySelectorAll(".open-evidence").forEach(el => {
    el.addEventListener("click", () => {
      const key = el.getAttribute("data-target");
      const lang = localStorage.getItem("santoo-lang") || "en";

      const contentDiv = document.getElementById("evidenceContent");
      const modal = document.getElementById("evidenceModal");
      const overlay = document.getElementById("evidenceOverlay");
      const memberModal = document.getElementById("memberModal");

      if (!contentDiv || !modal || !overlay) return;

      contentDiv.dataset.key = key;
      contentDiv.innerHTML =
        evidenceData[key][lang] || evidenceData[key]["en"];

      if (memberModal) memberModal.classList.remove("active");

      modal.classList.add("active");
      overlay.classList.add("active");
    });
  });

  window.closeEvidence = function () {
    const modal = document.getElementById("evidenceModal");
    const overlay = document.getElementById("evidenceOverlay");
    const memberModal = document.getElementById("memberModal");
    const memberOverlay = document.getElementById("memberOverlay");

    if (modal) modal.classList.remove("active");
    if (overlay) overlay.classList.remove("active");

    if (memberModal && memberOverlay) {
      memberModal.classList.add("active");
      memberOverlay.classList.add("active");
    }
  };

  const overlayEl = document.getElementById("evidenceOverlay");
  if (overlayEl) {
    overlayEl.addEventListener("click", closeEvidence);
  }

  // ===============================
  // 5. 主页面逻辑
  // ===============================
  function showMain(isFast = false) {
    if (!mainPage) return;

    mainPage.style.visibility = "visible";
    if (footer) footer.style.visibility = "visible";
    if (structure) structure.classList.add("has-hero8k");

    if (isFast) {
      if (layer) layer.remove();
      gsap.fromTo(
        [mainPage, footer],
        { opacity: 0 },
        { opacity: 1, duration: 1.2 }
      );
      if (content) gsap.set(content, { opacity: 1 });
    } else {
      gsap.timeline()
        .to([mainPage, footer], { opacity: 1, duration: 1.5 })
        .to(layer, {
          opacity: 0,
          duration: 1.5,
          onComplete: () => {
            if (layer) layer.remove();
          }
        });
    }

    sessionStorage.setItem("santoo-visited", "true");
  }

  const isIndex =
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname === "/" ||
    window.location.pathname === "";

  if (isIndex && !hasSeenIntro) {
    if (mark) {
      gsap.set(mark, { opacity: 1 });
      mark.addEventListener(
        "click",
        () => {
          mark.classList.add("is-hidden");
          gsap.to(mark, { opacity: 0, duration: 0.8 });

          if (video) {
            video.play();
            gsap.to(".intro-video-wrap", { opacity: 1, duration: 1 });
          }

          gsap.to(".intro-white", { opacity: 0, duration: 1.5 });
          gsap.delayedCall(4.5, showMain);
        },
        { once: true }
      );
    }
  } else {
    showMain(true);
  }

  // ===============================
  // 6. 初始化语言
  // ===============================
  const savedLang = localStorage.getItem("santoo-lang") || "en"; // 这里已经声明过了
  document.querySelectorAll("[data-en]").forEach(el => {
    const text = el.getAttribute(`data-${savedLang}`);
    if (text) el.innerText = text;
  });

  const langBtnInit = document.getElementById("current-lang");
  if (langBtnInit) {
    const names = { en: "LANGUAGE", zh: "语言", ja: "言語" };
    langBtnInit.innerText = names[savedLang];
  }

  // ===============================
  // 强制更新模态框中的多语言文本
  // ===============================
  // ✅ 直接使用上面的 savedLang 变量，不要重新声明
  document.querySelectorAll("#memberModal [data-en]").forEach(el => {
    const text = el.getAttribute(`data-${savedLang}`);
    if (text) el.innerText = text;
  });
// ===============================
// 7. 背景资源预加载系统（最终版）
// 悬停触发 + 页面加载后智能预加载
// ===============================

// 页面与背景资源映射
const preloadConfig = {
  "member.html": "assets/member-bg.jpg",
  "project.html": "assets/project-bg.jpg",
  "research.html": "assets/research-bg.jpg",
  "works.html": "assets/works-bg.jpg"
};

// 记录已预加载资源，防止重复请求
const preloadedImages = new Set();

// 通用预加载函数
function preloadImage(src) {
  if (!src || preloadedImages.has(src)) return;

  const img = new Image();
  img.src = src;
  preloadedImages.add(src);
}

// ===============================
// 7.1 鼠标悬停时预加载
// ===============================
document.querySelectorAll("a.nav-anchor").forEach(link => {
  link.addEventListener(
    "mouseenter",
    function () {
      const href = this.getAttribute("href");
      const imgSrc = preloadConfig[href];
      preloadImage(imgSrc);
    },
    { once: true } // 每个导航项仅触发一次
  );
});

// ===============================
// 7.2 页面加载后自动预加载
// 当前页面之外的背景资源
// ===============================
window.addEventListener("load", () => {
  const currentPage = window.location.pathname.split("/").pop();

  Object.entries(preloadConfig).forEach(([page, src]) => {
    if (page !== currentPage) {
      preloadImage(src);
    }
  });
});
  // ===============================
  // 8. 页面过渡动画
  // ===============================
  document.querySelectorAll("a.nav-anchor, a.back-btn").forEach(link => {
    link.addEventListener("click", function (e) {
      const targetUrl = this.getAttribute("href");
      if (targetUrl && targetUrl.includes(".html")) {
        e.preventDefault();
        gsap.to([mainPage, footer], {
          opacity: 0,
          duration: 1.0,
          ease: "power2.inOut",
          onComplete: () => {
            window.location.href = targetUrl;
          }
        });
      }
    });
  });

// ===============================
// 9. 项目模态框交互逻辑
// ===============================

// 暴露给 HTML onclick 使用的全局函数：打开年份模态框
window.openYearModal = function() {
  const savedLang = localStorage.getItem('santoo-lang') || 'en';
  // 同步更新模态框内部语言按钮的样式
  if (typeof updateModalLangUI === 'function') {
    updateModalLangUI(savedLang);
  }
  // 确保全局变量有效后触发 CSS 类
  if (yearModal) yearModal.classList.add("active");
  if (projectOverlay) projectOverlay.classList.add("active");
};

// 暴露给 HTML onclick 使用的全局函数：关闭年份模态框
window.closeYearModal = function() {
  if (yearModal) yearModal.classList.remove("active");
  if (projectOverlay) projectOverlay.classList.remove("active");
};

// 👇 以下必须保留，用于打开具体的项目详情（如 ASAM × NPF）
window.openProjectModal = function(key) {
  currentProjectKey = key;
  const savedLang = localStorage.getItem('santoo-lang') || 'en';
  renderProjectDetail(key, savedLang);
  updateModalLangUI(savedLang);

  if (yearModal) yearModal.classList.remove("active");
  if (projectModal) projectModal.classList.add("active");
  if (projectOverlay) projectOverlay.classList.add("active");
  if (projectModal) projectModal.scrollTo(0, 0);
};

// 👇 以下必须保留，用于关闭具体的项目详情
window.closeProjectModal = function() {
  if (projectModal) projectModal.classList.remove("active");
  if (projectOverlay) projectOverlay.classList.remove("active");
  currentProjectKey = null;
  if (jumpBtn) jumpBtn.classList.remove("show");
};

// 点击遮罩层关闭所有
if (projectOverlay) {
  projectOverlay.onclick = () => {
    window.closeYearModal();
    window.closeProjectModal();
  };
}

// ===============================
// 10. 滚动监听与 JUMP UP
// ===============================
if (projectModal) {
  projectModal.addEventListener("scroll", () => {
    if (projectModal.scrollTop > 300) {
      jumpBtn.classList.add("show");
    } else {
      jumpBtn.classList.remove("show");
    }
  });
}

window.scrollToTop = function() {
  if (projectModal) {
    projectModal.scrollTo({ top: 0, behavior: "smooth" });
  }
};

// 暴露语言切换给模态框内部按钮
window.switchProjectModalLang = function(lang) {
  window.switchLang(lang); // 直接调用全局的 switchLang，实现同步
};

  // ===============================
  // 11. 浏览器返回修复
  // ===============================
  window.addEventListener("pageshow", event => {
    if (event.persisted) {
      gsap.fromTo(
        [mainPage, footer],
        { opacity: 0 },
        { opacity: 1, duration: 1.2 }
      );
    }
  });
})();
