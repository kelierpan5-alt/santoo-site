(function () {
  const body = document.body;
  const currentPage = body.dataset.page;
  const nav = document.getElementById("siteNav") || document.querySelector(".home-nav");
  const menuButton = document.getElementById("menuButton");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const routeBackgrounds = {
    "works.html": "assets/works-bg.jpg",
    "works-gallery.html": "assets/works-bg.jpg",
    "chang-bin-works.html": "assets/works-bg.jpg",
    "exhibitions.html": "assets/project-bg.jpg",
    "index_pc.html": "assets/hero-8k.jpg",
    "about.html": "assets/member-bg.jpg",
    "research-fields.html": "assets/research-bg.jpg",
    "publications.html": "assets/research-bg.jpg",
    "working-papers.html": "assets/project-bg.jpg",
    "methods.html": "assets/hero-8k.jpg",
    "fellows.html": "assets/member-bg.jpg",
    "contact.html": "assets/works-bg.jpg",
    "art-practice.html": "assets/works-bg.jpg",
    "writing-practice.html": "assets/member-bg.jpg",
    "sound-practice.html": "assets/works-bg.jpg",
    "legal.html": "assets/hero-8k.jpg"
  };
  const navLabels = {
    "works.html": { en: "Works", zh: "作品", ja: "作品" },
    "exhibitions.html": { en: "Exhibitions", zh: "展覽", ja: "展覧会" },
    "art-practice.html": { en: "Practice", zh: "創作", ja: "制作" },
    "about.html": { en: "About", zh: "關於", ja: "概要" },
    "research-fields.html": { en: "Research", zh: "研究", ja: "研究" },
    "publications.html": { en: "Publications", zh: "出版物", ja: "出版物" },
    "working-papers.html": { en: "Working Papers", zh: "工作論文", ja: "ワーキングペーパー" },
    "methods.html": { en: "Methods", zh: "方法", ja: "方法" },
    "fellows.html": { en: "Fellows", zh: "合作成員", ja: "フェロー" },
    "contact.html": { en: "Contact", zh: "聯繫", ja: "連絡" }
  };
  const pageTitles = {
    home: { en: "Santoo", zh: "Santoo", ja: "Santoo" },
    about: { en: "About", zh: "關於", ja: "概要" },
    research: { en: "Research", zh: "研究", ja: "研究" },
    practice: { en: "Practice", zh: "創作", ja: "制作" },
    works: { en: "Works", zh: "作品", ja: "作品" },
    exhibitions: { en: "Exhibitions", zh: "展覽", ja: "展覧会" },
    publications: { en: "Publications", zh: "出版物", ja: "出版物" },
    working: { en: "Research Notes", zh: "研究筆記", ja: "研究ノート" },
    methods: { en: "Methods", zh: "方法", ja: "方法" },
    fellows: { en: "Network & Recognition", zh: "網絡與認可", ja: "ネットワークと評価" },
    contact: { en: "Contact", zh: "聯繫", ja: "連絡" },
    art: { en: "Art Practice", zh: "藝術實踐", ja: "芸術実践" },
    writing: { en: "Writing Practice", zh: "寫作實踐", ja: "執筆実践" },
    sound: { en: "Sound Practice", zh: "聲音實踐", ja: "サウンド・プラクティス" }
  };
  const contentTranslations = {
    "Fiction, poetic prose, and long-duration narrative.": { zh: "小說、詩性散文與長篇敘事。", ja: "小説、詩的散文、長い時間を扱う物語。" },
    "Independent literary work alongside the visual practice, with selected projects, multilingual editions, and a public author profile.": { zh: "與視覺實踐並行的獨立文學創作，包括精選項目、多語言版本與公開作者檔案。", ja: "視覚実践と並行する独立した文学創作。主なプロジェクト、多言語版、公開作家プロフィール。" },
    "Ongoing notes from artistic practice.": { zh: "來自藝術實踐的持續筆記。", ja: "芸術実践から生まれる継続的なノート。" },
    "Interim reports and working drafts on visual structure, studio observation, and independent music-making.": { zh: "關於視覺結構、工作室觀察與獨立音樂創作的階段性報告和工作草稿。", ja: "視覚構造、制作の観察、独立した音楽制作に関する中間報告と草稿。" },
    "Art & Practice": { zh: "藝術實踐", ja: "芸術実践" },
    "A framework for observing structural stability across fields.": { zh: "一個用於觀察跨領域結構穩定性的研究框架。", ja: "領域横断的構造的安定性を観察するための研究フレームワーク。" },
    "Legal & Privacy": { zh: "法律與隱私", ja: "法務・プライバシー" },
    "Who is Pan Yao?": { zh: "潘垚是誰？", ja: "潘垚とは誰か。" },
    "Evidence is selected, organized, and translated into a concise public narrative of continuity, professional practice, and method evolution.": { zh: "證據經篩選、整理與轉譯，形成一份關於實踐連續性、專業工作與方法演進的剋制敘述。", ja: "資料を選別・整理・翻訳し、実践の継続性、専門的活動、方法の展開を簡潔な公開記述として提示する。" },
    "Pan Yao is a Chinese visual artist, abstract structural practitioner, and independent researcher working across visual systems, perceptual stability, and structural cognition.": { zh: "潘垚是中國視覺藝術家、抽象結構實踐者與獨立研究者，工作橫跨視覺系統、知覺穩定性與結構認知。", ja: "潘垚は中国の視覚芸術家、抽象構造の実践者、独立研究者であり、視覚システム、知覚の安定性、構造認知を横断して活動している。" },
    "His practice spans over sixteen years, integrating fine art, commercial production, theoretical research, and independent writing.": { zh: "其十六年以上的持續實踐，結合了純藝術、商業製作、理論研究與獨立寫作。", ja: "16年以上にわたる実践は、ファインアート、商業制作、理論研究、独立した執筆活動を統合している。" },
    "Founded as the first sustained studio structure.": { zh: "作爲首個持續運作的工作室體系成立。", ja: "最初の継続的なスタジオ体制として設立。" },
    "Mokpo Museum, South Korea.": { zh: "韓國木浦美術館。", ja: "韓国・木浦美術館。" },
    "Participated in Art Beijing.": { zh: "參加藝術北京。", ja: "アート北京に参加。" },
    "Special Selection Prize.": { zh: "特別選拔獎。", ja: "特別選考賞。" },
    "International Art Prize.": { zh: "國際藝術獎。", ja: "国際芸術賞。" },
    "Studio": { zh: "工作室", ja: "スタジオ" },
    "Exhibition": { zh: "展覽", ja: "展覧会" },
    "Award": { zh: "獎項", ja: "受賞" },
    "His visual practice is rooted in abstract structural systems, focusing on symbolic fields, perceptual coherence, and visual stability within complex compositions.": { zh: "其視覺實踐根植於抽象結構系統，關注複雜構圖中的符號場、知覺連貫性與視覺穩定性。", ja: "その視覚実践は抽象構造システムに根差し、複雑な構成における象徴場、知覚的一貫性、視覚的安定性を主題とする。" },
    "Recent work expands into structural cognition research, integrating artistic practice with theoretical frameworks.": { zh: "近期工作進一步延伸至結構認知研究，將藝術實踐與理論框架結合。", ja: "近年の活動は構造認知研究へと展開し、芸術実践と理論的枠組みを接続している。" },
    "The initial long-term studio structure supporting continuous artistic production.": { zh: "支撐持續藝術創作的早期長期工作室體系。", ja: "継続的な芸術制作を支えた初期の長期スタジオ体制。" },
    "An expanded working structure connecting visual production, commercial practice, writing, and research development.": { zh: "連接視覺製作、商業實踐、寫作與研究發展的擴展型工作體系。", ja: "視覚制作、商業実践、執筆、研究開発を接続する拡張型の活動体制。" },
    "Pan Yao currently leads the development of SANTOO.": { zh: "潘垚目前主導 SANTOO 的發展。", ja: "潘垚は現在、SANTOO の展開を主導している。" },
    "Santoo is a self-initiated structural research framework connecting art, structural theory, attentional systems, and symbolic cognition. It describes an independent research direction rather than a separate legal or staffed institution.": { zh: "Santoo 是一個自主發起的結構研究框架，連接藝術、結構理論、注意系統與符號認知。它指向一項獨立研究方向，而非具有獨立法律主體或固定人員編制的組織。", ja: "Santoo は、芸術、構造理論、注意システム、象徴認知を接続する自主的な構造研究フレームワークである。独立した研究の方向性を示すものであり、別個の法人や常設組織を意味しない。" },
    "Artist": { zh: "藝術家", ja: "芸術家" },
    "Structural Artist": { zh: "結構藝術家", ja: "構造芸術家" },
    "Independent Researcher": { zh: "獨立研究者", ja: "独立研究者" },
    "What does SANTOO study?": { zh: "SANTOO 研究什麼？", ja: "SANTOO は何を研究するのか。" },
    "A cumulative system moving from operational method to theoretical model, applied framework, research platform, and long-term goal: Method → Theory → Framework → Platform → Goal.": { zh: "從操作方法遞進至理論模型、應用框架、研究平臺與長期目標的累積系統：方法 → 理論 → 框架 → 平臺 → 目標。", ja: "運用方法から理論モデル、応用フレームワーク、研究基盤、長期目標へと進む累積的体系：方法 → 理論 → 枠組み → 基盤 → 目標。" },
    "The Ming Protocol is an original structural cognition methodology developed by Pan Yao, integrating artistic production, theoretical inquiry, writing practice, and strategic development.": { zh: "Ming Protocol 是潘垚提出的原創結構認知方法論，整合藝術創作、理論探究、寫作實踐與策略發展。", ja: "Ming Protocol は潘垚が開発した独自の構造認知方法論であり、芸術制作、理論的探究、執筆実践、戦略的展開を統合する。" },
    "It functions as the operational foundation for all SANTOO structural studies.": { zh: "它構成 SANTOO 全部結構研究的操作基礎。", ja: "SANTOO におけるすべての構造研究の運用基盤として機能する。" },
    "Adaptive Switching in Attention Allocation": { zh: "注意分配中的自適應切換", ja: "注意配分における適応的切替" },
    "ASAM is a structural attention model examining how perceptual systems dynamically redistribute attention across complex visual environments.": { zh: "ASAM 是一個結構性注意模型，用於考察知覺系統如何在複雜視覺環境中動態重分配注意。", ja: "ASAM は、知覚システムが複雑な視覚環境において注意をどのように動的再配分するかを検討する構造的注意モデルである。" },
    "Its primary focus is cognitive stability, adaptive switching, and attentional coherence.": { zh: "其核心關注認知穩定性、自適應切換與注意連貫性。", ja: "主な焦点は、認知的安定性、適応的切替、注意の一貫性にある。" },
    "Global Visual Stability Framework": { zh: "全球視覺穩定性框架", ja: "グローバル視覚安定性フレームワーク" },
    "A structural framework for understanding how visual fields maintain coherence under high-density symbolic complexity.": { zh: "一個用於理解視覺場如何在高密度符號複雜性中維持連貫性的結構框架。", ja: "高密度の象徴的複雑性のもとで、視覚場がいかに一貫性を保つかを理解するための構造的枠組み。" },
    "This framework extends ASAM into visual structural analysis.": { zh: "該框架將 ASAM 延伸至視覺結構分析。", ja: "この枠組みは ASAM を視覚構造分析へと拡張する。" },
    "Santoo is a self-initiated independent research framework dedicated to structural studies across visual systems, cognitive architectures, and symbolic fields.": { zh: "Santoo 是一個自主發起的獨立研究框架，致力於視覺系統、認知架構與符號場中的結構研究。", ja: "Santoo は、視覚システム、認知アーキテクチャ、象徴場を横断する構造研究のための自主的・独立した研究フレームワークである。" },
    "It serves as the long-term research platform for Pan Yao's structural investigations and does not represent a separate legal or staffed institution.": { zh: "它作爲潘垚結構研究的長期平臺存在，並不代表一個獨立法律主體或固定人員編制的組織。", ja: "潘垚の構造研究を支える長期的な研究基盤であり、別個の法人や常設組織を意味しない。" },
    "To build structural methodologies integrating art, cognition, and perceptual systems.": { zh: "建立整合藝術、認知與知覺系統的結構方法論。", ja: "芸術、認知、知覚システムを統合する構造的方法論を構築する。" },
    "Current focus: Visual Stability, Attention Systems, and Structural Art Theory.": { zh: "當前重點：視覺穩定性、注意系統與結構藝術理論。", ja: "現在の重点：視覚的安定性、注意システム、構造芸術理論。" },
    "Has the theory entered a public academic system?": { zh: "理論是否已進入公共學術體系？", ja: "理論は公開された学術体系に入ったか。" },
    "Registered Research Output": { zh: "已登記研究成果", ja: "登録済み研究成果" },
    "The core structural research paper is registered through Zenodo with an international DOI, establishing a persistent public record for academic traceability, citation, and archival access.": { zh: "核心結構研究論文已通過 Zenodo 登記並獲得國際 DOI，爲學術追溯、引用與檔案訪問建立持續有效的公開記錄。", ja: "構造研究の中核論文は Zenodo に登録され、国際 DOI を取得している。これにより、学術的追跡、引用、アーカイブ閲覧のための永続的な公開記録が確立される。" },
    "Repository": { zh: "存儲庫", ja: "リポジトリ" },
    "Record Type": { zh: "記錄類型", ja: "記録種別" },
    "Preprint / Open Access": { zh: "預印本／開放獲取", ja: "プレプリント／オープンアクセス" },
    "This paper establishes a foundational model for studying visual structural stability and attentional coherence in complex, dense, and functionally layered visual fields.": { zh: "該論文爲研究複雜、高密度且具有功能分層的視覺場中的結構穩定性與注意連貫性，建立了基礎模型。", ja: "本論文は、複雑で高密度かつ機能的に階層化された視覚場における構造的安定性と注意の一貫性を研究するための基礎モデルを提示する。" },
    "Author": { zh: "作者", ja: "著者" },
    "Date": { zh: "日期", ja: "日付" },
    "Status": { zh: "狀態", ja: "状態" },
    "Research Identity": { zh: "研究者身份", ja: "研究者識別" },
    "Pan Yao's ORCID provides persistent international researcher identification and supports long-term continuity across current and future publication records.": { zh: "潘垚的 ORCID 提供持續有效的國際研究者標識，並支持當前及未來出版記錄之間的長期連續性。", ja: "潘垚の ORCID は永続的な国際研究者識別子として、現在および将来の出版記録の長期的連続性を支える。" },
    "Citation Structure": { zh: "引用結構", ja: "引用構造" },
    "The research is being positioned through references across attention systems, structural cognition, and visual stability studies.": { zh: "該研究正通過注意系統、結構認知與視覺穩定性研究等領域的文獻關係確立其位置。", ja: "本研究は、注意システム、構造認知、視覚的安定性研究を横断する参照関係の中に位置づけられている。" },
    "This citation architecture connects the work to a broader interdisciplinary discourse while making its original propositions and source relationships explicit.": { zh: "這一引用架構將該工作連接至更廣泛的跨學科討論，同時明確其原創命題與來源關係。", ja: "この引用構造は、本研究をより広い学際的言説へ接続すると同時に、独自の命題と参照元との関係を明示する。" },
    "Submission Pipeline": { zh: "投稿流程", ja: "投稿準備工程" },
    "Current research is being prepared for formal academic journal submission and broader international dissemination.": { zh: "當前研究正在爲正式學術期刊投稿及更廣泛的國際傳播做準備。", ja: "現在の研究は、学術誌への正式投稿と、より広い国際発信に向けて準備中である。" },
    "Ongoing work includes theoretical refinement, research-context alignment, citation development, and peer-review preparation. Preparation does not imply submission, acceptance, or publication.": { zh: "持續工作包括理論細化、研究語境校準、引用體系建設與同行評審準備。處於準備階段並不意味着已經投稿、錄用或發表。", ja: "継続中の作業には、理論の精緻化、研究文脈との整合、引用の整備、査読準備が含まれる。準備中であることは、投稿・採択・刊行を意味しない。" }
  };
  Object.assign(contentTranslations, {
    "What will SANTOO build next?": { zh: "SANTOO 下一步將構建什麼？", ja: "SANTOO は次に何を構築するのか。" },
    "Physical-Grade Insulation and Hysteresis Compensation": { zh: "物理級隔離與遲滯補償", ja: "物理層級の隔離とヒステリシス補償" },
    "A Cognitive Firewall for Independent Music-Making in the Algorithmic Fog": { zh: "算法迷霧中的獨立音樂創作認知防火牆", ja: "アルゴリズムの霧における独立音楽制作のための認知的ファイアウォール" },
    "An interim autoethnographic report from an ongoing experiment examining aesthetic autonomy, algorithmic feedback, hysteresis compensation, and the aesthetic stopping point in independent music-making.": { zh: "一份來自持續實驗的階段性自我民族誌報告，考察獨立音樂創作中的審美自主性、算法反饋、遲滯補償與審美停止點。", ja: "独立音楽制作における美的自律性、アルゴリズム的フィードバック、ヒステリシス補償、美的停止点を検討する継続実験の中間的オートエスノグラフィー報告。" },
    "Interim report / Preprint in preparation": { zh: "階段報告／預印本準備中", ja: "中間報告／プレプリント準備中" },
    "Pending": { zh: "待定", ja: "未定" },
    "Institutional Draft": { zh: "框架草案", ja: "フレームワーク草案" },
    "An ongoing structural draft for Santoo, outlining its long-term research architecture, interdisciplinary scope, and future operational framework.": { zh: "一份持續完善中的 Santoo 結構草案，勾勒其長期研究架構、跨學科範圍與未來運作框架。", ja: "Santoo の長期的な研究構成、学際的範囲、将来の運用枠組みを示す、継続的に更新される構造草案。" },
    "Current Status": { zh: "當前狀態", ja: "現在の状態" },
    "Drafting / Development": { zh: "草擬／發展中", ja: "草案作成／開発中" },
    "Scope": { zh: "範圍", ja: "範囲" },
    "Independent research framework expansion": { zh: "獨立研究框架擴展", ja: "独立研究フレームワークの拡張" },
    "Methodological Expansion": { zh: "方法論擴展", ja: "方法論的拡張" },
    "Current development integrates ASAM, Ming Protocol, and structural cognition systems into a coherent methodological toolkit.": { zh: "當前工作將 ASAM、Ming Protocol 與結構認知系統整合爲一套連貫的方法工具。", ja: "現在の開発では、ASAM、Ming Protocol、構造認知システムを一貫した方法論的ツール群へ統合している。" },
    "These methods are being refined for future theoretical production, visual analysis, comparative observation, and writing systems.": { zh: "這些方法正面向未來的理論生產、視覺分析、比較觀察與寫作系統持續精煉。", ja: "これらの方法は、今後の理論構築、視覚分析、比較観察、執筆システムに向けて精緻化されている。" },
    "Japan Project": { zh: "日本項目", ja: "日本プロジェクト" },
    "A structured expansion plan for artistic practice and research development in Japan, focusing on prospective gallery collaboration, exhibition activity, research collaboration, and professional network development.": { zh: "一項面向日本藝術實踐與研究發展的結構化擴展計劃，重點關注潛在畫廊合作、展覽活動、研究協作與專業網絡建設。", ja: "日本における芸術実践と研究展開のための構造的拡張計画。将来的なギャラリー連携、展覧会活動、研究協力、専門ネットワークの形成を主眼とする。" },
    "Regions": { zh: "地區", ja: "地域" },
    "Timeline": { zh: "時間線", ja: "期間" },
    "Planning; no host or partnership is implied": { zh: "規劃中；不表示已有主辦方或合作關係", ja: "計画段階。受入先や提携関係の成立を示すものではない" },
    "International Expansion": { zh: "國際擴展", ja: "国際展開" },
    "A long-term strategic plan across Japan, Korea, Europe, and Southeast Asia, integrating art, research, publications, research collaboration, and independent research framework expansion.": { zh: "一項覆蓋日本、韓國、歐洲與東南亞的長期戰略計劃，整合藝術、研究、出版、研究協作與獨立研究框架的擴展。", ja: "日本、韓国、欧州、東南アジアを対象とし、芸術、研究、出版、研究協力、独立研究フレームワークの拡張を統合する長期戦略計画。" },
    "Focus": { zh: "重點", ja: "重点" },
    "Continuity / Professional network development / International dissemination": { zh: "連續性／專業網絡建設／國際傳播", ja: "継続性／専門ネットワーク形成／国際発信" },
    "Future planning": { zh: "未來規劃", ja: "将来計画" },
    "How does the system operate?": { zh: "這一系統如何運行？", ja: "このシステムはどのように作動するのか。" },
    "ASAM models how attention dynamically redistributes within complex visual environments, stabilizing perception under symbolic density.": { zh: "ASAM 描述注意如何在複雜視覺環境中動態重分配，並在高符號密度下穩定知覺。", ja: "ASAM は、複雑な視覚環境における注意の動的再配分をモデル化し、象徴密度の高い状況で知覚を安定させる。" },
    "A structural cognition protocol integrating artistic production, theoretical research, writing systems, and strategic development.": { zh: "一種整合藝術創作、理論研究、寫作系統與策略發展的結構認知協議。", ja: "芸術制作、理論研究、執筆システム、戦略的展開を統合する構造認知プロトコル。" },
    "It functions as the operational method for structural investigation.": { zh: "它作爲結構研究的操作方法發揮作用。", ja: "構造的探究のための運用方法として機能する。" },
    "Structural Cognition Model": { zh: "結構認知模型", ja: "構造認知モデル" },
    "A synthetic methodological system combining ASAM and Ming Protocol for theory-building, visual analysis, and interdisciplinary writing.": { zh: "一套結合 ASAM 與 Ming Protocol 的綜合方法系統，用於理論構建、視覺分析與跨學科寫作。", ja: "ASAM と Ming Protocol を組み合わせ、理論構築、視覚分析、学際的執筆に用いる統合的方法論システム。" },
    "Applied Systems": { zh: "應用系統", ja: "応用システム" },
    "Current applications include abstract painting, symbolic visual analysis, structural writing, sound composition, temporal structure, auditory attention, and interdisciplinary theory production.": { zh: "當前應用包括抽象繪畫、符號視覺分析、結構寫作、聲音創作、時間結構、聽覺注意與跨學科理論生產。", ja: "現在の応用領域には、抽象絵画、象徴的視覚分析、構造的執筆、音響構成、時間構造、聴覚的注意、学際的理論構築が含まれる。" },
    "Who supports, evaluates, collects, and connects with the work?": { zh: "誰在支持、評估、收藏並連接這些工作？", ja: "誰がこの活動を支援し、評価し、収集し、接続しているのか。" },
    "Founder Profile": { zh: "發起人檔案", ja: "創設者プロフィール" },
    "Pan Yao is the founding practitioner behind Santoo, with over sixteen years of continuous work across abstract painting, structural research, and interdisciplinary writing.": { zh: "潘垚是 Santoo 的發起實踐者，擁有十六年以上橫跨抽象繪畫、結構研究與跨學科寫作的持續工作經歷。", ja: "潘垚は Santoo の創設実践者であり、抽象絵画、構造研究、学際的執筆を横断する16年以上の継続的活動を行っている。" },
    "Primary Focus": { zh: "主要方向", ja: "主要領域" },
    "Visual Art / Structural Systems / Independent Research": { zh: "視覺藝術／結構系統／獨立研究", ja: "視覚芸術／構造システム／独立研究" },
    "Structural Network": { zh: "結構網絡", ja: "構造ネットワーク" },
    "The current Santoo framework consists of interconnected research domains: theory development, visual production, publication systems, and international collaboration.": { zh: "當前 Santoo 框架由相互連接的研究領域構成：理論發展、視覺生產、出版系統與國際協作。", ja: "現在の Santoo フレームワークは、理論開発、視覚制作、出版システム、国際協働という相互接続された研究領域から構成される。" },
    "Its research architecture remains founder-led and independently operated. It does not imply a staffed internal organization.": { zh: "其研究架構持續由發起人主導並獨立運作，不表示存在配備固定人員的內部組織。", ja: "研究構成は創設者主導で独立運営されており、常設スタッフを備えた内部組織を意味しない。" },
    "Founding Practitioner": { zh: "發起實踐者", ja: "創設実践者" },
    "Research direction, visual practice, theoretical development, and editorial responsibility.": { zh: "負責研究方向、視覺實踐、理論發展與編輯工作。", ja: "研究方針、視覚実践、理論開発、編集責任を担う。" },
    "Collaborating Artist & Partner": { zh: "合作藝術家與夥伴", ja: "協働芸術家・パートナー" },
    "Professional Recommendations": { zh: "專業推薦", ja: "専門家による推薦" },
    "Recommendation materials from galleries and curators in Japan are being prepared to support future exhibition activity and professional collaboration.": { zh: "來自日本畫廊與策展人的推薦材料正在準備中，用以支持未來的展覽活動與專業合作。", ja: "今後の展覧会活動と専門的協働を支えるため、日本のギャラリーおよびキュレーターによる推薦資料を準備している。" },
    "No gallery or curator is publicly attributed until the relevant recommendation and permission are confirmed.": { zh: "在相關推薦與授權得到確認前，不公開指認任何畫廊或策展人。", ja: "推薦内容と公開許可が確認されるまで、ギャラリー名やキュレーター名は公表しない。" },
    "Academic Evaluation": { zh: "學術評估", ja: "学術評価" },
    "Independent academic reviews are being assembled regarding the theoretical structures of ASAM and the Global Visual Stability Framework.": { zh: "正在彙集關於 ASAM 與全球視覺穩定性框架理論結構的獨立學術評議。", ja: "ASAM とグローバル視覚安定性フレームワークの理論構造に関する独立した学術評価を準備している。" },
    "Evaluation materials remain in preparation and are not presented as completed peer review.": { zh: "評估材料仍在準備中，不作爲已完成的同行評審呈現。", ja: "評価資料は準備段階にあり、完了した査読として提示するものではない。" },
    "Collector Recognition": { zh: "收藏認可", ja: "コレクター評価" },
    "Testimonial materials from collectors and private holders are being gathered to document market reception, acquisition logic, and long-term value recognition.": { zh: "正在收集收藏家與私人持有者的見證材料，以記錄市場接受度、收藏邏輯與長期價值認知。", ja: "市場での受容、取得の論理、長期的価値評価を記録するため、コレクターおよび個人所蔵者からの証言資料を収集している。" },
    "Testimonials will be published only with verified provenance and permission.": { zh: "相關見證僅在來源與授權覈實後發佈。", ja: "証言は、来歴と公開許可を確認した場合にのみ掲載する。" },
    "International Cooperation": { zh: "國際協作", ja: "国際協力" },
    "Future collaborations are under discussion across Japan, Korea, and Europe, including prospective exhibition partnerships, research cooperation, and publication exchange.": { zh: "正在討論覆蓋日本、韓國與歐洲的未來合作，包括潛在展覽夥伴關係、研究協作與出版交流。", ja: "日本、韓国、欧州を対象に、展覧会連携、研究協力、出版交流を含む将来的な協働を協議している。" },
    "Discussions and prospective directions do not imply confirmed partnerships or institutional affiliation.": { zh: "討論與意向性方向不表示合作關係或組織隸屬已經確認。", ja: "協議中の内容や将来的方向性は、提携や組織的所属の確定を意味しない。" }
  });
  Object.assign(contentTranslations, {
    "How can the public enter the SANTOO system?": { zh: "公衆如何進入 SANTOO 系統？", ja: "一般の人々はどのように SANTOO の体系へアクセスできるのか。" },
    "Official Contact": { zh: "正式聯繫方式", ja: "公式連絡先" },
    "Website": { zh: "網站", ja: "ウェブサイト" },
    "ORCID serves as the research identity layer for publications, academic registration, and long-term research continuity.": { zh: "ORCID 作爲出版、學術登記與長期研究連續性的研究者身份層。", ja: "ORCID は、出版、学術登録、長期的な研究継続性を支える研究者識別層として機能する。" },
    "Publication Channels": { zh: "出版渠道", ja: "出版経路" },
    "Public research outputs are maintained through Zenodo, preprint records, and independent publication channels, with ORCID providing a persistent researcher identity.": { zh: "公開研究成果通過 Zenodo、預印本記錄與獨立出版渠道持續維護，並由 ORCID 提供永久研究者標識。", ja: "公開研究成果は Zenodo、プレプリント記録、独立出版経路を通じて維持され、ORCID が永続的な研究者識別子を提供する。" },
    "Independent": { zh: "獨立出版", ja: "独立出版" },
    "Social Channels": { zh: "公共渠道", ja: "公開チャンネル" },
    "These channels support ongoing visual publication, public communication, and interdisciplinary documentation.": { zh: "這些渠道用於持續的視覺發布、公共交流與跨學科記錄。", ja: "これらのチャンネルは、継続的な視覚発信、公開コミュニケーション、学際的記録を支える。" },
    "Verified profile URLs have not yet been supplied; no account destinations are inferred.": { zh: "經覈實的個人主頁鏈接尚未提供；本站不會推定任何賬號地址。", ja: "確認済みの公式プロフィール URL は未提供であり、アカウントの所在を推測して掲載することはない。" },
    "Santoo Framework Access": { zh: "Santoo 框架入口", ja: "Santoo フレームワークへのアクセス" },
    "SANTOO operates as a self-initiated independent research framework for structural inquiry, visual systems, and interdisciplinary collaboration.": { zh: "SANTOO 作爲一個自主發起的獨立研究框架運行，面向結構探究、視覺系統與跨學科協作。", ja: "SANTOO は、構造的探究、視覚システム、学際的協働のための自主的・独立した研究フレームワークとして運用される。" },
    "Research collaboration, professional exchange, and publication inquiries can enter the framework through the official contact above. Santoo does not represent a separate legal or staffed institution.": { zh: "研究協作、專業交流與出版諮詢可通過上述正式聯繫方式進入該框架。Santoo 不代表獨立法律主體或具有固定人員編制的組織。", ja: "研究協力、専門交流、出版に関する問い合わせは、上記の公式連絡先から受け付ける。Santoo は別個の法人や常設組織を意味しない。" },
    "Sound Practice": { zh: "聲音實踐", ja: "サウンド・プラクティス" },
    "How does structural practice operate through time and sound?": { zh: "結構實踐如何通過時間與聲音運行？", ja: "構造的実践は、時間と音を通してどのように作動するのか。" },
    "Temporal Structure": { zh: "時間結構", ja: "時間構造" },
    "The sound practice examines duration, repetition, density, transition, and auditory attention as structural conditions unfolding through time.": { zh: "聲音實踐將時長、重複、密度、過渡與聽覺注意視爲隨時間展開的結構條件加以考察。", ja: "サウンド・プラクティスは、持続、反復、密度、移行、聴覚的注意を、時間の中で展開する構造条件として検討する。" },
    "It connects long-term music production with visual systems, writing practice, and research into perceptual coherence.": { zh: "它將長期音樂製作與視覺系統、寫作實踐及知覺連貫性研究連接起來。", ja: "長期的な音楽制作を、視覚システム、執筆実践、知覚的一貫性の研究へ接続する。" },
    "This ongoing autoethnographic study provides a research foundation for the sound practice, examining how independent music-making can preserve aesthetic autonomy under algorithmic feedback systems.": { zh: "這項持續進行的自我民族誌研究爲聲音實踐提供研究基礎，考察獨立音樂創作如何在算法反饋系統中保持審美自主性。", ja: "継続中のオートエスノグラフィー研究はサウンド・プラクティスの研究基盤となり、独立した音楽制作がアルゴリズム的フィードバックのもとで美的自律性をいかに保つかを検討する。" },
    "Selected Releases": { zh: "精選發行作品", ja: "選定リリース" },
    "A focused selection will present representative works by period, formal approach, and structural relevance rather than displaying the full catalog as an undifferentiated list.": { zh: "精選部分將按時期、形式方法與結構關聯呈現代表性作品，而非無差別羅列全部目錄。", ja: "全カタログを無差別に列挙するのではなく、時期、形式的アプローチ、構造的関連性に基づいて代表作を選定し提示する。" },
    "Release titles, cover assets, dates, credits, and verified listening links are awaiting curation.": { zh: "作品名稱、封面素材、日期、署名信息與經覈實的試聽鏈接尚待整理。", ja: "リリース名、カバー素材、日付、クレジット、確認済み試聴リンクは現在整理中である。" },
    "Distribution & Copyright": { zh: "發行與版權", ja: "配信・著作権" },
    "This section will document a curated record of original music, distribution history, authorship, and copyright information.": { zh: "本部分將整理記錄原創音樂、發行歷史、作者身份與版權信息。", ja: "本項では、オリジナル音楽、配信履歴、著作者情報、著作権情報を精選して記録する。" },
    "Platform dashboards, release metadata, authorship credits, and copyright records will be connected here when verified for public display.": { zh: "平臺後臺、發行元數據、作者署名與版權記錄經覈實可公開後，將在此關聯。", ja: "プラットフォーム管理画面、リリース・メタデータ、著作者クレジット、著作権記録は、公開可能であることを確認後に接続する。" },
    "Music as a Structural System": { zh: "作爲結構系統的音樂", ja: "構造システムとしての音楽" },
    "Sound composition provides a practical field for testing how attention moves, how coherence is sustained, and how complex elements remain perceptually navigable across time.": { zh: "聲音創作爲檢驗注意如何移動、連貫性如何維持，以及複雜元素如何在時間中保持可感知與可辨識，提供了實踐場域。", ja: "音響構成は、注意がどのように移動し、一貫性がどう維持され、複雑な要素が時間を通していかに知覚可能であり続けるかを検証する実践領域となる。" },
    "Visual Practice": { zh: "視覺實踐", ja: "視覚実践" },
    "Spatial density / Symbolic relation / Field stability": { zh: "空間密度／符號關係／場域穩定性", ja: "空間密度／象徴関係／場の安定性" },
    "Sound Practice": { zh: "聲音實踐", ja: "サウンド・プラクティス" },
    "Temporal density / Auditory transition / Attentional continuity": { zh: "時間密度／聽覺過渡／注意連續性", ja: "時間密度／聴覚的移行／注意の連続性" },
    "Listening & Documentation": { zh: "試聽與記錄", ja: "試聴・ドキュメンテーション" },
    "Verified platform profiles, selected listening links, video documentation, and release archives will provide direct access to the public music catalog.": { zh: "經覈實的平臺主頁、精選試聽鏈接、視頻記錄與發行檔案，將提供通往公開音樂目錄的直接入口。", ja: "確認済みの公式プロフィール、選定試聴リンク、映像記録、リリース・アーカイブを通じて、公開音楽カタログへ直接アクセスできるようにする。" },
    "No platform destination is published until the official profile URL and catalog ownership are confirmed.": { zh: "在官方主頁鏈接與目錄所有權確認前，不發佈任何平臺入口。", ja: "公式プロフィール URL とカタログの権利関係が確認されるまで、プラットフォームへのリンクは公開しない。" }
  });
  Object.assign(contentTranslations, {
    "Sound Practice extends this long-term interdisciplinary practice into temporal structure, auditory attention, and music production.": { zh: "聲音實踐將這一長期跨學科實踐延伸至時間結構、聽覺注意與音樂製作。", ja: "サウンド・プラクティスは、この長期的な学際実践を時間構造、聴覚的注意、音楽制作へと拡張する。" },
    "Explore the sound practice →": { zh: "進入聲音實踐 →", ja: "サウンド・プラクティスを見る →" },
    "A long-term path from research structure to methodological tools, regional entry, and international continuity: Structure → Tools → Regional Entry → Global Expansion.": { zh: "從研究結構走向方法工具、區域進入與國際連續性的長期路徑：結構 → 工具 → 區域進入 → 全球擴展。", ja: "研究構造から方法論的ツール、地域展開、国際的継続性へ至る長期的経路：構造 → ツール → 地域展開 → 国際展開。" },
    "A cumulative method moving from attention dynamics to operational protocol, methodological synthesis, and practical application: Attention → Method → Synthesis → Application.": { zh: "從注意動力學遞進至操作協議、方法綜合與實踐應用的累積方法：注意 → 方法 → 綜合 → 應用。", ja: "注意の動態から運用プロトコル、方法論的統合、実践的応用へ進む累積的方法：注意 → 方法 → 統合 → 応用。" },
    "Sound practice applies structural thinking to duration, rhythm, density, transition, and the distribution of attention over time.": { zh: "聲音實踐將結構思維應用於時長、節奏、密度、過渡以及注意在時間中的分配。", ja: "サウンド・プラクティスは、持続、リズム、密度、移行、時間に沿った注意配分に構造的思考を適用する。" },
    "View Sound Practice →": { zh: "查看聲音實踐 →", ja: "サウンド・プラクティスを見る →" },
    "The Fellows navigation label is retained, while this page records three distinct forms of external validation: professional legitimacy, academic legitimacy, and market legitimacy.": { zh: "導航中保留 Fellows 名稱；本頁記錄三種彼此區分的外部驗證：專業認可、學術認可與市場認可。", ja: "ナビゲーションでは Fellows の名称を維持し、本ページでは専門的正当性、学術的正当性、市場的正当性という三つの異なる外部評価を記録する。" },
    "Chang Bin leads the fine-art direction within the collaboration, with a focus on art-historical research and watercolor interpretations of classical painting.": { zh: "常斌負責合作中的純藝術方向，重點開展藝術史研究與古典繪畫的水彩闡釋。", ja: "常斌は協働におけるファインアートの方向性を担い、美術史研究と古典絵画の水彩による解釈に重点を置く。" },
    "Active": { zh: "進行中", ja: "活動中" },
    "A sequence for access, verification, reading, public connection, and framework entry: Reach → Verify → Read → Follow → Enter.": { zh: "面向聯繫、覈驗、閱讀、公共連接與框架進入的順序：聯繫 → 覈驗 → 閱讀 → 關注 → 進入。", ja: "連絡、確認、閲覧、公開接続、フレームワークへの参加に至る順序：連絡 → 確認 → 閲覧 → フォロー → 参加。" },
    "Music functions here as an applied temporal system within Pan Yao's broader structural practice—not as a separate institutional identity.": { zh: "音樂在此作爲潘垚更廣泛結構實踐中的應用型時間系統，而非獨立的組織身份。", ja: "ここで音楽は、潘垚の広範な構造的実践における応用的な時間システムとして機能し、独立した組織的アイデンティティを意味しない。" },
    "April 12, 2026": { zh: "2026年4月12日", ja: "2026年4月12日" },
    "Planning": { zh: "規劃中", ja: "計画中" },
    "Close ×": { zh: "關閉 ×", ja: "閉じる ×" },
    "Back": { zh: "返回", ja: "戻る" },
    "Index": { zh: "目錄", ja: "目次" }
  });
  Object.assign(contentTranslations, {
    "extends this long-term interdisciplinary practice into temporal structure, auditory attention, and music production.": { zh: "將這一長期跨學科實踐延伸至時間結構、聽覺注意與音樂製作。", ja: "は、この長期的な学際実践を時間構造、聴覚的注意、音楽制作へと拡張する。" },
    "A cumulative chain from public registration to academic object, research identity, intellectual lineage, and future dissemination: DOI → Preprint → ORCID → Citation Structure → Submission Pipeline.": { zh: "從公開登記遞進至學術對象、研究者身份、知識譜系與未來傳播的累積鏈條：DOI → 預印本 → ORCID → 引用結構 → 投稿流程。", ja: "公開登録から学術的対象、研究者識別、知的系譜、将来の発信へ至る累積的連鎖：DOI → プレプリント → ORCID → 引用構造 → 投稿準備工程。" },
    "P-01 / Zenodo DOI Registration": { zh: "P-01／Zenodo DOI 登記", ja: "P-01／Zenodo DOI 登録" },
    "P-02 / Core Preprint": { zh: "P-02／核心預印本", ja: "P-02／中核プレプリント" },
    "P-03 / ORCID Registration": { zh: "P-03／ORCID 登記", ja: "P-03／ORCID 登録" },
    "P-08 / Citation Structure": { zh: "P-08／引用結構", ja: "P-08／引用構造" },
    "P-09 / Research Submission Pipeline": { zh: "P-09／研究投稿流程", ja: "P-09／研究投稿準備工程" },
    "Interim Autoethnographic Report / DOI Pending": { zh: "階段性自我民族誌報告／DOI 待定", ja: "中間オートエスノグラフィー報告／DOI 未定" },
    "P-07 / Research Framework Development": { zh: "P-07／研究框架發展", ja: "P-07／研究フレームワーク開発" },
    "X-04 / Methodological Expansion": { zh: "X-04／方法論擴展", ja: "X-04／方法論的拡張" },
    "I-03 / Founder Profile": { zh: "I-03／發起人檔案", ja: "I-03／創設者プロフィール" },
    "X-02 / Research Architecture": { zh: "X-02／研究架構", ja: "X-02／研究構成" },
    "I-11 / Official Contact": { zh: "I-11／正式聯繫方式", ja: "I-11／公式連絡先" },
    "ORCID / Research Identity": { zh: "ORCID／研究者身份", ja: "ORCID／研究者識別" },
    "Public Research Outputs": { zh: "公開研究成果", ja: "公開研究成果" },
    "Public Communication": { zh: "公共傳播", ja: "公開コミュニケーション" },
    "SANTOO / Framework Access": { zh: "SANTOO／框架入口", ja: "SANTOO／フレームワークへのアクセス" },
    "Sound & Structure": { zh: "聲音與結構", ja: "音と構造" },
    "Curated Catalog": { zh: "精選目錄", ja: "選定カタログ" },
    "Catalog Record": { zh: "目錄記錄", ja: "カタログ記録" },
    "Applied Method": { zh: "應用方法", ja: "応用方法" },
    "Public Access": { zh: "公共入口", ja: "公開アクセス" },
    "Email": { zh: "電子郵件", ja: "メール" }
  });
  Object.assign(contentTranslations, {
    "Skip to content": { zh: "跳至正文", ja: "本文へ移動" },
    "SANTOO / Self-initiated research framework": { zh: "SANTOO／自主發起的研究框架", ja: "SANTOO／自主的研究フレームワーク" },
    "Research Fields / What is studied": { zh: "研究領域／研究對象", ja: "研究領域／研究対象" },
    "Publications / Formalized outputs": { zh: "出版物／正式研究成果", ja: "出版物／形式化された研究成果" },
    "Working Papers / Not final outputs": { zh: "工作論文／非最終成果", ja: "ワーキングペーパー／最終成果ではない" },
    "Methods / How research is conducted": { zh: "方法／研究如何開展", ja: "方法／研究の進め方" },
    "Fellows / Accurate current structure": { zh: "合作成員／當前實際結構", ja: "フェロー／現在の実態" },
    "Contact / Verified destinations only": { zh: "聯繫／僅列經覈實的入口", ja: "連絡／確認済みのリンクのみ" },
    "Sound Practice / Secondary interface": { zh: "聲音實踐／次級界面", ja: "サウンド・プラクティス／第二インターフェース" }
  });
  Object.assign(contentTranslations, {
    "Pan Yao is a visual artist and independent researcher. SANTOO is his self-initiated framework connecting artistic practice, visual structure, attention, writing, and sound.": { zh: "潘垚是視覺藝術家與獨立研究者。SANTOO 是他自主發起的框架，連接藝術實踐、視覺結構、注意、寫作與聲音。", ja: "潘垚は視覚芸術家・独立研究者である。SANTOO は、芸術実践、視覚構造、注意、執筆、音を接続する自主的な枠組みである。" },
    "Pan Yao is a visual artist working across painting, sound, and writing.": { zh: "潘垚是以繪畫為核心，延伸至聲音與寫作的視覺藝術家。", ja: "潘垚は絵画を軸に、音と執筆へと実践を広げる視覚芸術家である。" },
    "SANTOO brings together his artworks, exhibitions, and ongoing creative inquiry.": { zh: "SANTOO 呈現他的作品、展覽與持續發展的創作探索。", ja: "SANTOO は、その作品、展覧会、継続する創作の探究を紹介する。" },
    "View Art Practice →": { zh: "查看藝術實踐 →", ja: "芸術実践を見る →" },
    "Pan Yao is a Chinese visual artist, abstract structural practitioner, and independent researcher.": { zh: "潘垚是中國視覺藝術家、抽象結構實踐者與獨立研究者。", ja: "潘垚は中国の視覚芸術家、抽象構造の実践者、独立研究者である。" },
    "Active since 2010, his practice has developed from line-based and body-responsive image-making through realist study toward abstract painting and practice-based research into visual structure, attention, and perceptual stability.": { zh: "自2010年持續實踐以來，他從以線條和身體適應性爲基礎的圖像創作，經由寫實研究，發展至抽象繪畫以及對視覺結構、注意和知覺穩定性的實踐型研究。", ja: "2010年から継続する実践は、線と身体への応答を基盤とするイメージ制作から、写実研究を経て、抽象絵画と視覚構造・注意・知覚安定性の実践研究へ発展してきた。" },
    "Established as the first sustained studio structure for line-based practice and visual production.": { zh: "作爲支持線條實踐與視覺製作的首個持續工作室結構成立。", ja: "線を基盤とする実践と視覚制作を支える最初の継続的スタジオ体制として設立。" },
    "Beijing, China.": { zh: "中國北京。", ja: "中国・北京。" },
    "Art Beijing": { zh: "藝術北京", ja: "アート北京" },
    "Art Qingdao International Youth Art Season": { zh: "藝術青島·首屆國際青年藝術季", ja: "芸術青島・第1回国際青年芸術季" },
    "Jiyun Qinghua Youth Art Exhibition": { zh: "“冀韻青華”青年藝術展", ja: "「冀韵青華」青年芸術展" },
    "China–Korea Art Exchange Exhibition": { zh: "中韓藝術交流展", ja: "中韓芸術交流展" },
    "16th International Calligraphy and Painting Grand Prize Exhibition": { zh: "第16屆國際書畫大獎展", ja: "第16回国際書画大賞展" },
    "Tokyo Metropolitan Art Museum — Art Special Selection Award.": { zh: "東京都美術館——藝術特選獎。", ja: "東京都美術館——芸術特選賞。" },
    "19th International Art Grand Prize Exhibition": { zh: "第19屆國際藝術大獎展", ja: "第19回国際芸術大賞展" },
    "Tokyo Metropolitan Art Museum — International Art Award.": { zh: "東京都美術館——國際藝術獎。", ja: "東京都美術館——国際芸術賞。" },
    "Beginning with line drawing and body-responsive composition developed through long-term tattoo practice, his work moved through realist study toward abstract painting.": { zh: "其創作以長期紋身實踐中形成的線描與身體適應性構圖爲起點，經由寫實研究逐步轉向抽象繪畫。", ja: "長期のタトゥー実務で培った線描と身体に応答する構成を起点に、写実研究を経て抽象絵画へ移行した。" },
    "The current Ming series investigates how density, balance, boundary, color, and negative space organize attention across a visual field. Research, writing, and sound extend from this artistic practice rather than replacing it.": { zh: "當前的 Ming 系列考察密度、平衡、邊界、色彩與留白如何在視覺場中組織注意。研究、寫作與聲音由這項藝術實踐延伸而來，而不是取代它。", ja: "現在のMingシリーズは、密度、均衡、境界、色彩、余白が視覚場の注意をいかに組織するかを探究する。研究、執筆、音はこの芸術実践から派生するものであり、それに代わるものではない。" },
    "Primary Practice": { zh: "主要實踐", ja: "主要実践" },
    "Extended Practice": { zh: "延展實踐", ja: "拡張実践" },
    "Selected Works": { zh: "精選作品", ja: "主な作品" },
    "Public Profile": { zh: "公開檔案", ja: "公開プロフィール" },
    "Formation, abstract painting, the Ming series, and exhibition history.": { zh: "形成基礎、抽象繪畫、Ming 系列與展覽履歷。", ja: "形成基盤、抽象絵画、Mingシリーズ、展覧会歴。" },
    "Fiction, poetic prose, multilingual editions, and external publication records.": { zh: "小說、詩性散文、多語言版本與外部出版記錄。", ja: "小説、詩的散文、多言語版、外部出版記録。" },
    "Temporal structure, auditory attention, music production, and autoethnographic research.": { zh: "時間結構、聽覺注意、音樂製作與自我民族誌研究。", ja: "時間構造、聴覚的注意、音楽制作、オートエスノグラフィー研究。" },
    "View Writing Practice →": { zh: "查看寫作實踐 →", ja: "執筆実践を見る →" },
    "View Sound Practice →": { zh: "查看聲音實踐 →", ja: "サウンド・プラクティスを見る →" },
    "Established": { zh: "已建立", ja: "設立" },
    "Expanded": { zh: "已擴展", ja: "拡張" },
    "SANTOO is a self-initiated independent research framework connecting artistic practice, structural theory, attentional systems, writing, and sound. It describes Pan Yao's long-term research direction rather than a separate legal or staffed institution.": { zh: "SANTOO 是一個自主發起的獨立研究框架，連接藝術實踐、結構理論、注意系統、寫作與聲音。它描述潘垚的長期研究方向，而非獨立法人或配置固定人員的機構。", ja: "SANTOO は、芸術実践、構造理論、注意システム、執筆、音を接続する自主的・独立した研究フレームワークである。別個の法人や常設組織ではなく、潘垚の長期的な研究方向を示す。" },
    "Practice-Based Working Method": { zh: "實踐型工作方法", ja: "実践型ワーキングメソッド" },
    "Ming Working Method": { zh: "Ming 工作方法", ja: "Mingワーキングメソッド" },
    "Ming is an internal working term used by Pan Yao to organize visual consistency, observation, and decision-making during artistic production.": { zh: "Ming 是潘垚在藝術創作中用於組織視覺一致性、觀察與決策的內部工作用語。", ja: "Ming は、芸術制作における視覚的一貫性、観察、意思決定を整理するために潘垚が用いる内部的な作業用語である。" },
    "It is a practice-based operational framework rather than a doctrine, evaluation system, or standardized scientific method.": { zh: "它是基於實踐的操作框架，而不是教義、評價體系或標準化科學方法。", ja: "これは実践に基づく運用枠組みであり、教義、評価体系、標準化された科学的方法ではない。" },
    "Research Model": { zh: "研究模型", ja: "研究モデル" },
    "Published Research Framework": { zh: "已公開研究框架", ja: "公開研究フレームワーク" },
    "Self-Initiated Framework": { zh: "自主發起框架", ja: "自主的フレームワーク" },
    "Long-Term Direction": { zh: "長期方向", ja: "長期的方向" },
    "Studio Operation": { zh: "工作室操作", ja: "スタジオ運用" },
    "A practice-based working method for maintaining visual consistency, organizing observations, and clarifying decisions during artistic production.": { zh: "一種在藝術創作中維持視覺一致性、組織觀察並明確決策的實踐型工作方法。", ja: "芸術制作において視覚的一貫性を保ち、観察を整理し、判断を明確にするための実践型作業方法。" },
    "Ming remains an internal operational term; it is not presented as a doctrine or standardized scientific method.": { zh: "Ming 仍是內部操作用語；不作爲教義或標準化科學方法呈現。", ja: "Ming は内部的な運用用語であり、教義や標準化された科学的方法として提示しない。" },
    "Methodological Synthesis": { zh: "方法綜合", ja: "方法論的統合" },
    "A developing methodological synthesis connecting ASAM, studio observation, visual analysis, and interdisciplinary writing without treating artistic judgment as a standardized measurement system.": { zh: "一套正在發展的方法綜合，連接 ASAM、工作室觀察、視覺分析與跨學科寫作，同時不把藝術判斷當作標準化測量體系。", ja: "ASAM、スタジオ観察、視覚分析、学際的執筆を接続する発展途上の方法論的統合であり、芸術的判断を標準化された測定体系として扱わない。" },
    "Current applications include abstract painting, visual analysis, structural writing, sound composition, temporal structure, auditory attention, and interdisciplinary theory production.": { zh: "當前應用包括抽象繪畫、視覺分析、結構寫作、聲音創作、時間結構、聽覺注意與跨學科理論生產。", ja: "現在の応用には、抽象絵画、視覚分析、構造的執筆、音響構成、時間構造、聴覚的注意、学際的理論構築が含まれる。" },
    "Public Preprint / Open Access": { zh: "公開預印本／開放獲取", ja: "公開プレプリント／オープンアクセス" },
    "A Node–Path–Field Framework for Perceptual Organization in Visual Composition": { zh: "視覺構圖中知覺組織的節點—路徑—場框架", ja: "視覚構成における知覚組織のノード・パス・フィールド枠組み" },
    "Persistent Research Identity": { zh: "持續研究者身份", ja: "永続的研究者識別" },
    "Research Context": { zh: "研究語境", ja: "研究文脈" },
    "Status-Labeled Research Record": { zh: "狀態明確的研究記錄", ja: "状態を明示した研究記録" },
    "Journal": { zh: "期刊", ja: "学術誌" },
    "Submitted": { zh: "投稿日期", ja: "投稿日" },
    "March 16, 2026": { zh: "2026年3月16日", ja: "2026年3月16日" },
    "Editorial receipt confirmed / Review in progress": { zh: "編輯部收稿確認／審查進行中", ja: "編集部受領確認／審査進行中" },
    "Disclosure": { zh: "說明", ja: "注記" },
    "Submission does not imply acceptance or publication": { zh: "投稿不表示已採用或發表", ja: "投稿は採択・刊行を意味しない" },
    "Independent Research Framework": { zh: "獨立研究框架", ja: "独立研究フレームワーク" },
    "SANTOO Framework Draft": { zh: "SANTOO 框架草案", ja: "SANTOOフレームワーク草案" },
    "An ongoing structural draft for SANTOO, outlining its long-term research architecture, interdisciplinary scope, and future operational framework without implying a separate legal or staffed institution.": { zh: "一份持續完善的 SANTOO 結構草案，勾勒長期研究架構、跨學科範圍與未來操作框架，不表示存在獨立法人或固定人員機構。", ja: "SANTOOの長期的研究構成、学際的範囲、将来の運用枠組みを示す継続的な草案であり、別個の法人や常設組織を意味しない。" },
    "Research Tools / In Development": { zh: "研究工具／開發中", ja: "研究ツール／開発中" },
    "Current development connects ASAM, the Ming Working Method, studio observation, and structural cognition research within a coherent practice-based toolkit.": { zh: "當前工作將 ASAM、Ming 工作方法、工作室觀察與結構認知研究連接爲連貫的實踐型工具體系。", ja: "現在の開発では、ASAM、Mingワーキングメソッド、スタジオ観察、構造認知研究を一貫した実践型ツール群として接続している。" },
    "Current Public Activity / 2026–2028": { zh: "當前公共活動／2026–2028", ja: "現在の公開活動／2026–2028" },
    "A structured plan for artistic production, exhibition development, and professional exchange in Japan. Each activity is labeled by its actual status.": { zh: "一項面向日本藝術創作、展覽發展與專業交流的結構化計劃；每項活動均按真實狀態標註。", ja: "日本での芸術制作、展覧会展開、専門交流に向けた構造的計画であり、各活動を実際の状態に基づいて表示する。" },
    "Arts and culture support application submitted August 28, 2026 / Under review": { zh: "藝術文化支持申請於2026年8月28日提交／審查中", ja: "芸術文化支援申請を2026年8月28日に提出／審査中" },
    "Artist-in-residence application or coordination in progress / Host and dates not confirmed": { zh: "藝術家駐留申請或協調進行中／接收方與日期未確認", ja: "アーティスト・イン・レジデンスの申請・調整中／受入先と日程は未確定" },
    "Selected gallery responses received / Conditions and timing under discussion": { zh: "已收到部分畫廊回覆／條件與時間正在協商", ja: "一部ギャラリーから回答受領／条件と時期を協議中" },
    "No grant, residency, exhibition, or partnership is presented as confirmed": { zh: "不將資助、駐留、展覽或合作描述爲已經確認", ja: "助成、滞在制作、展覧会、提携のいずれも確定済みとして提示しない" },
    "View the artistic practice supporting this plan →": { zh: "查看支撐該計劃的藝術實踐 →", ja: "この計画を支える芸術実践を見る →" },
    "Long-Term Plan / 2026–2030": { zh: "長期計劃／2026–2030", ja: "長期計画／2026–2030" },
    "A long-term plan across Japan, Korea, Europe, and Southeast Asia, connecting artistic production, research publication, professional exchange, and independent framework development.": { zh: "一項覆蓋日本、韓國、歐洲與東南亞的長期計劃，連接藝術創作、研究發表、專業交流與獨立框架發展。", ja: "日本、韓国、欧州、東南アジアを対象に、芸術制作、研究発表、専門交流、独立フレームワークの展開を接続する長期計画。" },
    "Public Identity Records": { zh: "公共身份記錄", ja: "公開識別記録" },
    "Public Author Profile": { zh: "公開作者檔案", ja: "公開著者プロフィール" },
    "Public Work & Research": { zh: "公共作品與研究", ja: "公開作品・研究" },
    "Public work is organized by medium so that artistic practice, research publication, writing, and sound remain distinct but connected.": { zh: "公共作品按媒介組織，使藝術實踐、研究發表、寫作與聲音彼此區分又相互連接。", ja: "公開作品は媒体別に整理し、芸術実践、研究発表、執筆、音を区別しながら接続する。" },
    "Visual Art": { zh: "視覺藝術", ja: "視覚芸術" },
    "Writing": { zh: "寫作", ja: "執筆" },
    "Sound": { zh: "聲音", ja: "音" }
  });
  Object.assign(contentTranslations, {
    "Who is actively connected to the work?": { zh: "誰正在與這項實踐形成真實連接？", ja: "誰がこの実践と実際につながっているのか。" },
    "The Fellows navigation label is retained, while the page distinguishes active collaboration, public verification, professional dialogue, and research status without implying a staffed institution.": { zh: "導航保留 Fellows 名稱；頁面區分實際協作、公共驗證、專業對話與研究狀態，同時不暗示存在固定人員機構。", ja: "ナビゲーションではFellowsの名称を維持し、常設組織を示唆することなく、実際の協働、公開検証、専門的対話、研究状況を区別して示す。" },
    "Founder-Led / Independently Operated": { zh: "發起人主導／獨立運作", ja: "創設者主導／独立運用" },
    "Current Practitioners": { zh: "當前實踐者", ja: "現在の実践者" },
    "SANTOO remains a founder-led independent framework. Its current artistic collaboration is accurately represented by two active practitioners.": { zh: "SANTOO 仍是由發起人主導的獨立框架；當前藝術協作由兩位活躍實踐者準確構成。", ja: "SANTOOは創設者主導の独立した枠組みであり、現在の芸術的協働は二名の活動中の実践者によって正確に構成される。" },
    "Contemporary art, research direction, visual practice, theoretical development, writing, and editorial responsibility.": { zh: "當代藝術、研究方向、視覺實踐、理論發展、寫作與編輯責任。", ja: "現代美術、研究方針、視覚実践、理論展開、執筆、編集責任。" },
    "Art-historical research and watercolor interpretations of classical painting within the shared fine-art project.": { zh: "在共同純藝術項目中負責藝術史研究與古典繪畫的水彩闡釋。", ja: "共同ファインアート・プロジェクトにおける美術史研究と古典絵画の水彩解釈。" },
    "Pan Yao × Chang Bin": { zh: "潘垚 × 常斌", ja: "潘垚 × 常斌" },
    "The joint artistic project connects Pan Yao's abstract structural practice with Chang Bin's art-historical and watercolor-based approach to classical painting.": { zh: "該聯合藝術項目連接潘垚的抽象結構實踐與常斌基於藝術史和水彩的古典繪畫研究方法。", ja: "この共同芸術プロジェクトは、潘垚の抽象構造実践と、常斌の美術史・水彩に基づく古典絵画へのアプローチを接続する。" },
    "Current Activity": { zh: "當前活動", ja: "現在の活動" },
    "Kyoto arts and culture support application": { zh: "京都藝術文化支持申請", ja: "京都の芸術文化支援申請" },
    "August 28, 2026": { zh: "2026年8月28日", ja: "2026年8月28日" },
    "Under review / No award or funding is implied": { zh: "審查中／不表示已獲獎或獲得資助", ja: "審査中／採択・助成決定を意味しない" },
    "Third-Party Public Profile": { zh: "第三方公開檔案", ja: "第三者公開プロフィール" },
    "Paper Republic maintains a public author profile identifying Pan Yao as a writer and visual artist. It records literary activity and the accepted status of The Listener of Light.": { zh: "Paper Republic 維護一份公開作者檔案，將潘垚標識爲作家與視覺藝術家，並記錄其文學活動及《聽光的人》的採用狀態。", ja: "Paper Republicは潘垚を作家・視覚芸術家として示す公開著者プロフィールを掲載し、文学活動と『听光的人』の採用状況を記録している。" },
    "Publicly accessible third-party record": { zh: "可公開訪問的第三方記錄", ja: "公開アクセス可能な第三者記録" },
    "Gallery and Exhibition Development": { zh: "畫廊與展覽發展", ja: "ギャラリー・展覧会展開" },
    "Proposals have been sent to selected art spaces in Kyoto and Shiga. Responses concerning exhibition conditions, timing, pricing, framing, and internal review are recorded in the professional archive.": { zh: "已向京都與滋賀的部分藝術空間發送提案；有關展覽條件、時間、定價、裝裱與內部審議的回覆保存在專業檔案中。", ja: "京都・滋賀の一部アートスペースへ提案を送付し、展示条件、時期、価格、額装、内部審議に関する回答を専門資料として保存している。" },
    "The current status is discussion in progress. Private correspondence is not published, and no agreement or partnership is implied.": { zh: "當前狀態爲協商進行中；不公開私人通信，也不表示已達成協議或合作關係。", ja: "現在は協議中である。私信は公開せず、合意や提携の成立を意味しない。" },
    "Submission Status / Accurately Labeled": { zh: "投稿狀態／準確標註", ja: "投稿状況／正確な表示" },
    "Submission and review do not imply acceptance, publication, endorsement, or institutional affiliation.": { zh: "投稿與審查不表示已採用、發表、獲得認可或形成機構隸屬。", ja: "投稿・審査は、採択、刊行、推薦、組織的所属を意味しない。" },
    "View publication records →": { zh: "查看出版記錄 →", ja: "出版記録を見る →" },
    "How did Pan Yao's visual language develop?": { zh: "潘垚的視覺語言如何形成？", ja: "潘垚の視覚言語はいかに形成されたか。" },
    "A continuous movement from line and body-responsive composition through realist observation toward abstract painting, the Ming series, and current exhibition development.": { zh: "一條從線條與身體適應性構圖，經寫實觀察，走向抽象繪畫、Ming 系列與當前展覽發展的連續路徑。", ja: "線と身体に応答する構成から、写実的観察を経て、抽象絵画、Mingシリーズ、現在の展覧会展開へ至る連続的な道筋。" },
    "2010–2022 / Formative Practice": { zh: "2010–2022／形成實踐", ja: "2010–2022／形成期の実践" },
    "Line, Body, and Irreversible Decision": { zh: "線條、身體與不可逆決策", ja: "線、身体、不可逆的判断" },
    "Long-term tattoo practice provided a formative field for studying line, bodily curvature, repetition, placement, and decisions made on an irreversible surface.": { zh: "長期紋身實踐爲研究線條、身體曲面、重複、位置以及不可逆表面上的決策提供了形成場域。", ja: "長期のタトゥー実務は、線、身体の曲面、反復、配置、不可逆的な支持体上の判断を学ぶ形成領域となった。" },
    "This experience developed into a broader concern with how visual elements occupy space and how a composition directs attention.": { zh: "這一經驗進一步發展爲對視覺元素如何佔據空間、構圖如何引導注意的持續關注。", ja: "この経験は、視覚要素が空間をどう占め、構成が注意をどう導くかという広い関心へ発展した。" },
    "Early Line and Design Studies": { zh: "早期線描與設計研究", ja: "初期線描・デザイン研究" },
    "2010–2022 / Ink, pencil, and digital drawing": { zh: "2010–2022／墨、鉛筆與數字繪畫", ja: "2010–2022／インク、鉛筆、デジタル描画" },
    "Observation / Material / Composition": { zh: "觀察／材料／構圖", ja: "観察／素材／構成" },
    "Realist Training": { zh: "寫實訓練", ja: "写実訓練" },
    "Watercolor, oil, and colored-pencil studies developed observational precision, material awareness, spatial proportion, and compositional control before the transition to abstraction.": { zh: "在轉向抽象之前，水彩、油畫和彩色鉛筆研究發展了觀察精度、材料意識、空間比例與構圖控制。", ja: "抽象へ移行する以前、水彩、油彩、色鉛筆の研究を通して、観察精度、素材認識、空間比率、構成力を培った。" },
    "Watercolor Studies": { zh: "水彩研究", ja: "水彩研究" },
    "Oil Studies": { zh: "油畫研究", ja: "油彩研究" },
    "Colored-Pencil Studies": { zh: "彩色鉛筆研究", ja: "色鉛筆研究" },
    "2023 / Structural Turn": { zh: "2023／結構轉向", ja: "2023／構造的転換" },
    "From Representation to the Visual Field": { zh: "從再現走向視覺場", ja: "再現から視覚場へ" },
    "The practice gradually moved from representing external subjects toward organizing color, density, boundary, rhythm, and negative space as a unified visual field.": { zh: "實踐逐漸從再現外部對象，轉向把色彩、密度、邊界、節奏與留白組織爲統一視覺場。", ja: "実践は外的対象の再現から、色彩、密度、境界、リズム、余白を統合された視覚場として組織する方向へ移行した。" },
    "Home / 家園": { zh: "家園／家園", ja: "家園" },
    "2023 / Mixed media on canvas / 45.5 × 38 cm": { zh: "2023／布面綜合材料／45.5 × 38釐米", ja: "2023／キャンバスにミクストメディア／45.5 × 38 cm" },
    "Current Abstract Practice": { zh: "當前抽象實踐", ja: "現在の抽象実践" },
    "Ming is the internal working term for a continuing group of abstract paintings concerned with visual balance, density, fracture, spatial tension, and attentional movement.": { zh: "Ming 是一組持續發展的抽象繪畫所使用的內部工作用語，關注視覺平衡、密度、斷裂、空間張力與注意移動。", ja: "Mingは、視覚的均衡、密度、断裂、空間的緊張、注意の移動を扱う継続的な抽象絵画群の内部的作業用語である。" },
    "The term organizes the production process; it is not presented as a doctrine or fixed symbolic system.": { zh: "該詞用於組織創作過程；不作爲教義或固定符號體系呈現。", ja: "この語は制作過程を整理するためのものであり、教義や固定された象徴体系として提示しない。" },
    "Blazing Field / 炙域": { zh: "炙域", ja: "炙域" },
    "Rift / 裂隙": { zh: "裂隙", ja: "裂隙" },
    "Weave / 編織": { zh: "編織／編織", ja: "編織" },
    "Ming — Collision / 明—対撞": { zh: "Ming——對撞", ja: "Ming—対撞" },
    "Ming — Awareness / 明—覚知": { zh: "Ming——覺知", ja: "Ming—覚知" },
    "Ming — Self-Observation / 明—自観": { zh: "Ming——自觀", ja: "Ming—自観" },
    "2025 / Mixed media on canvas / 40 × 30 cm": { zh: "2025／布面綜合材料／40 × 30釐米", ja: "2025／キャンバスにミクストメディア／40 × 30 cm" },
    "2025 / Mixed media on canvas / 70 × 50 cm": { zh: "2025／布面綜合材料／70 × 50釐米", ja: "2025／キャンバスにミクストメディア／70 × 50 cm" },
    "Group Exhibition": { zh: "羣展", ja: "グループ展" },
    "Invited Exhibition": { zh: "邀請展", ja: "招待展" },
    "International Exhibition": { zh: "國際展覽", ja: "国際展" },
    "Art Fair": { zh: "藝術博覽會", ja: "アートフェア" },
    "Application / Discussion / Development": { zh: "申請／協商／發展", ja: "申請／協議／展開" },
    "Current activity includes a Kyoto arts and culture support application, an Osaka artist-in-residence plan, and selected gallery discussions in Kyoto and Shiga.": { zh: "當前活動包括京都藝術文化支持申請、大阪藝術家駐留計劃，以及與京都和滋賀部分畫廊的協商。", ja: "現在の活動には、京都の芸術文化支援申請、大阪のアーティスト・イン・レジデンス計画、京都・滋賀の一部ギャラリーとの協議が含まれる。" },
    "These activities remain under review, application, or discussion. No grant, residency, exhibition, or partnership is presented as confirmed.": { zh: "這些活動仍處於審查、申請或協商階段；不將資助、駐留、展覽或合作關係描述爲已經確認。", ja: "これらは審査、申請、協議の段階にあり、助成、滞在制作、展覧会、提携を確定済みとして提示しない。" },
    "View current project status →": { zh: "查看當前項目狀態 →", ja: "現在のプロジェクト状況を見る →" },
    "Art Practice / Primary practice": { zh: "藝術實踐／主要實踐", ja: "芸術実践／主要実践" },
    "How does structural attention enter narrative?": { zh: "結構性注意如何進入敘事？", ja: "構造的注意はいかに物語へ入るのか。" },
    "Writing extends the visual practice through fiction, poetic prose, mythic structures, duration, bodily pressure, and the gradual instability of perception.": { zh: "寫作通過小說、詩性散文、神話結構、時間、身體壓力與知覺的漸進失穩，延展視覺實踐。", ja: "執筆は、小説、詩的散文、神話的構造、時間、身体的圧力、知覚の段階的な不安定化を通じて視覚実践を拡張する。" },
    "Fiction / Poetic Prose / Long-Duration Narrative": { zh: "小說／詩性散文／長時段敘事", ja: "小説／詩的散文／長期的物語" },
    "Writing as an Extended Practice": { zh: "作爲延展實踐的寫作", ja: "拡張実践としての執筆" },
    "Pan Yao's writing moves between fiction, poetic prose, and long-duration narrative projects. Classical and mythic structures are used as perceptual frameworks through which fracture, fatigue, suspension, and transformation can be examined.": { zh: "潘垚的寫作遊走於小說、詩性散文與長時段敘事項目之間，以古典和神話結構作爲知覺框架，考察斷裂、疲憊、懸置與轉化。", ja: "潘垚の執筆は、小説、詩的散文、長期的物語プロジェクトを横断する。古典・神話構造を知覚の枠組みとして用い、断裂、疲労、宙吊り、変容を検討する。" },
    "Writing remains an independent creative practice while sharing concerns with the visual work: attention, duration, structure, and the limits of coherence.": { zh: "寫作保持獨立創作實踐，同時與視覺作品共享對注意、時間、結構與連貫性邊界的關注。", ja: "執筆は独立した創作実践でありながら、注意、時間、構造、一貫性の限界という関心を視覚作品と共有する。" },
    "Third-Party Public Record": { zh: "第三方公開記錄", ja: "第三者公開記録" },
    "Paper Republic maintains a public author profile for Pan Yao, identifying his work across writing and visual art and recording current literary projects.": { zh: "Paper Republic 爲潘垚維護公開作者檔案，標識其跨越寫作與視覺藝術的實踐，並記錄當前文學項目。", ja: "Paper Republicは潘垚の公開著者プロフィールを掲載し、執筆と視覚芸術を横断する活動および現在の文学プロジェクトを記録している。" },
    "Access": { zh: "訪問", ja: "アクセス" },
    "Public third-party page": { zh: "公開第三方頁面", ja: "公開第三者ページ" },
    "Long Project": { zh: "長篇項目", ja: "長期プロジェクト" },
    "In Development": { zh: "發展中", ja: "開発中" },
    "The Weight of Bone": { zh: "骨之重", ja: "骨の重さ" },
    "Part of a multi-part reimagining of Journey to the West, developed through embodied consciousness, attrition, delay, and unstable perception.": { zh: "一項多部曲《西遊記》重構項目的一部分，通過身體化意識、消耗、延遲與不穩定知覺展開。", ja: "身体化された意識、消耗、遅延、不安定な知覚を通して展開する、多部構成の『西遊記』再構想の一部。" },
    "Short Fiction": { zh: "短篇小說", ja: "短編小説" },
    "Accepted": { zh: "已採用", ja: "採用" },
    "The Listener of Light / 听光的人": { zh: "聽光的人", ja: "听光的人" },
    "An independent work within the Shanhai Man cycle. Paper Republic records the work as accepted for publication in Qingdao Literature.": { zh: "《山海蠻》系列中的獨立作品。Paper Republic 記錄該作品已被《青島文學》接受發表。", ja: "『山海蛮』サイクル内の独立作品。Paper Republicは本作が『青島文学』に掲載採用されたと記録している。" },
    "Accepted is not presented as published until the issue, date, contents page, and publication pages are available.": { zh: "在期號、日期、目錄頁與刊載頁公開前，不把“採用”描述爲“已發表”。", ja: "号数、発行日、目次、掲載頁が確認できるまでは、「採用」を「刊行済み」として提示しない。" },
    "Independent Publishing Record": { zh: "獨立出版記錄", ja: "独立出版記録" },
    "Bone, Emptiness, Fire, Extinction, Heart": { zh: "骨、空、火、滅、心", ja: "骨・空・火・滅・心" },
    "The author archive records six independently published electronic editions. ASIN identifiers are provided for bibliographic distinction; direct storefront links will be added after each public destination is verified.": { zh: "作者檔案記錄了六種獨立出版電子版本。ASIN 用於書目區分；各公開商品頁驗證後再添加直接鏈接。", ja: "著者資料には六つの独立出版電子版が記録されている。書誌上の識別としてASINを示し、各公開販売ページの確認後に直接リンクを追加する。" },
    "English": { zh: "英語", ja: "英語" },
    "Japanese": { zh: "日語", ja: "日本語" },
    "Spanish": { zh: "西班牙語", ja: "スペイン語" },
    "Traditional Chinese": { zh: "繁體中文", ja: "繁体字中国語" },
    "Arabic": { zh: "阿拉伯語", ja: "アラビア語" },
    "Hindi": { zh: "印地語", ja: "ヒンディー語" },
    "Independent publication is distinguished from third-party editorial selection, award, or institutional endorsement.": { zh: "獨立出版與第三方編輯採用、獎項或機構認可明確區分。", ja: "独立出版は、第三者編集部による採用、受賞、組織的推薦と明確に区別する。" },
    "Public Record Vocabulary": { zh: "公共記錄術語", ja: "公開記録の用語" },
    "Clear Status Labels": { zh: "清晰狀態標籤", ja: "明確な状態表示" },
    "Published": { zh: "已發表", ja: "刊行済み" },
    "Submissions and editorial receipts remain in the private professional archive unless a public record materially clarifies the status of a work.": { zh: "除非公共記錄能實質澄清作品狀態，投稿與編輯收稿記錄保留在私人專業檔案中。", ja: "公開記録が作品状況を実質的に明確化する場合を除き、投稿・編集部受領記録は非公開の専門資料として保存する。" },
    "Across Media": { zh: "跨媒介", ja: "媒体横断" },
    "Structure Across Image, Text, and Sound": { zh: "圖像、文本與聲音之間的結構", ja: "イメージ・テキスト・音を横断する構造" },
    "Writing examines duration and perceptual instability through narrative; painting organizes attention spatially; sound practice tests continuity and density through time.": { zh: "寫作通過敘事考察時間與知覺不穩定性；繪畫在空間中組織注意；聲音實踐在時間中檢驗連續性與密度。", ja: "執筆は物語を通じて時間と知覚的不安定性を検討し、絵画は空間的に注意を組織し、音の実践は時間の中で連続性と密度を検証する。" },
    "Writing Practice / Secondary interface": { zh: "寫作實踐／次級界面", ja: "執筆実践／第二インターフェース" }
  });
  Object.assign(contentTranslations, {
    "Archive → Curated Narrative → Public Interface": { zh: "檔案 → 整理敘事 → 公共界面", ja: "資料 → 編集された物語 → 公開インターフェース" },
    "“New Image” China Abstract Art Exhibition": { zh: "“新象”中國抽象藝術展", ja: "「新象」中国抽象芸術展" },
    "Art Practice →": { zh: "藝術實踐 →", ja: "芸術実践 →" },
    "Writing Practice →": { zh: "寫作實踐 →", ja: "執筆実践 →" },
    "Sound Practice →": { zh: "聲音實踐 →", ja: "サウンド・プラクティス →" },
    "Methods →": { zh: "方法 →", ja: "方法 →" },
    "in March 2026. The editorial receipt is recorded in the author archive, and the review status is recorded as in progress.": { zh: "於2026年3月投稿。編輯部收稿記錄保存在作者檔案中，審查狀態記錄爲進行中。", ja: "を2026年3月に投稿した。編集部の受領記録は著者資料に保存され、審査状況は進行中と記録されている。" },
    "was submitted in March 2026. Editorial receipt is confirmed in the author archive, and review is recorded as in progress.": { zh: "於2026年3月投稿。作者檔案已確認編輯部收稿，審查記錄爲進行中。", ja: "は2026年3月に投稿され、著者資料で編集部受領が確認され、審査は進行中と記録されている。" },
    "Hebei, China.": { zh: "中國河北。", ja: "中国・河北。" },
    "Qingdao, China.": { zh: "中國青島。", ja: "中国・青島。" },
    ", developed through embodied consciousness, attrition, delay, and unstable perception.": { zh: "的一部分，通過身體化意識、消耗、延遲與不穩定知覺展開。", ja: "の一部であり、身体化された意識、消耗、遅延、不安定な知覚を通して展開する。" }
  });
  Object.assign(contentTranslations, {
    "A status-labeled path connecting interim research, framework development, working methods, current Japan activity, and international continuity.": { zh: "一條以真實狀態爲標籤的路徑，連接階段研究、框架發展、工作方法、當前日本活動與國際連續性。", ja: "中間研究、フレームワーク開発、作業方法、現在の日本での活動、国際的継続性を、実際の状態表示で接続する経路。" },
    "A cumulative method moving from attention dynamics to studio operation, methodological synthesis, and practical application: Attention → Method → Synthesis → Application.": { zh: "從注意動力學遞進至工作室操作、方法綜合與實踐應用的累積方法：注意 → 方法 → 綜合 → 應用。", ja: "注意の動態からスタジオ運用、方法論的統合、実践的応用へ進む累積的方法：注意 → 方法 → 統合 → 応用。" }
  });
  const directoryLabels = {
    "Pan Yao": ["潘垚", "潘垚"], "Chang Bin": ["常斌", "常斌"],
    "Selected Exhibitions": ["精選展覽", "主な展覧会"], "Art Projects": ["藝術項目", "芸術プロジェクト"],
    "Japan / Collaboration": ["日本合作計劃", "日本での協働計画"],
    "Exhibitions & Activities": ["展覽與活動", "展覧会と活動"],
    "In Development": ["籌備項目", "企画中"], "Studio": ["工作室", "アトリエ"],
    "Abstraction": ["抽象繪畫", "抽象絵画"], "Sound": ["聲音", "音"], "Writing": ["文學", "執筆"],
    "Research Overview": ["研究概覽", "研究概要"], "Papers & Preprints": ["論文與預印本", "論文とプレプリント"],
    "Working Methods": ["工作方法", "制作方法"], "Research Notes": ["研究筆記", "研究ノート"],
    "About SANTOO": ["關於SANTOO", "SANTOOについて"], "Biography & CV": ["經歷與簡歷", "経歴と略歴"],
    "Collaborating Artists": ["合作藝術家", "協働作家"], "Public Profiles": ["公開檔案", "公開プロフィール"],
    "Artist": ["藝術家", "作家"], "Direct Contact": ["直接聯繫", "連絡先"],
    "Exhibition Inquiries": ["展覽合作", "展覧会のお問い合わせ"], "Artwork Inquiries": ["作品諮詢", "作品のお問い合わせ"],
    "Creative Collaboration": ["創作與研究合作", "創作・研究の協働"], "Sound & Time": ["聲音與時間", "音と時間"],
    "Across Media": ["跨媒介創作", "メディアを横断して"], "Listening & Collaboration": ["試聽與合作", "試聴と協働"],
    "Related Research": ["相關研究", "関連研究"],
    "Selected Works": ["精選作品", "作品選集"],
    "Early Studies": ["早期習作", "初期習作"],
    "Identity": ["身份", "アイデンティティ"], "Career Timeline": ["職業時間線", "経歴"],
    "Artistic Direction": ["藝術方向", "芸術的方向性"], "Studio Evolution": ["工作室演變", "スタジオの変遷"],
    "Current Position": ["當前位置", "現在の位置づけ"], "Methodological Foundation": ["方法論基礎", "方法論的基盤"],
    "Attention Systems": ["注意力系統", "注意システム"], "Visual Stability Studies": ["視覺穩定性研究", "視覚安定性研究"],
    "Research Platform": ["研究平臺", "研究プラットフォーム"], "Mission": ["使命", "ミッション"],
    "Registration": ["註冊", "登録"], "Publication": ["出版", "出版"], "Citation": ["引用", "引用"],
    "Expansion": ["拓展", "展開"], "Interim Research": ["階段性研究", "中間研究"], "Structure": ["結構", "構造"],
    "Tools": ["工具", "ツール"], "Regional Entry": ["區域進入", "地域展開"], "Global Expansion": ["全球拓展", "国際展開"],
    "Attention": ["注意力", "注意"], "Method": ["方法", "方法"], "Synthesis": ["綜合", "統合"],
    "Application": ["應用", "応用"], "Founder": ["創始人", "創設者"], "Network": ["網絡", "ネットワーク"],
    "Professional Recognition": ["專業認可", "専門的評価"], "Academic Recognition": ["學術認可", "学術的評価"],
    "Market Recognition": ["市場認可", "市場評価"], "International Cooperation": ["國際合作", "国際協力"],
    "Reach": ["聯繫入口", "連絡"], "Verify": ["驗證", "確認"], "Read": ["閱讀", "読む"],
    "Follow": ["關注", "フォロー"], "Enter": ["進入", "参加"], "Position": ["定位", "位置づけ"],
    "Research Foundation": ["研究基礎", "研究基盤"], "Selected Releases": ["精選發行", "主なリリース"],
    "Distribution & Copyright": ["發行與版權", "配信と著作権"], "Structural Relationship": ["結構關係", "構造的関係"],
    "Channels": ["渠道", "チャンネル"],
    "Formation": ["形成基礎", "形成基盤"], "Realist Studies": ["寫實研究", "写実研究"],
    "Transition to Abstraction": ["向抽象轉變", "抽象への移行"], "Ming Series": ["Ming 系列", "Ming シリーズ"],
    "Exhibition History": ["展覽履歷", "展覧会歴"], "Current Japan Practice": ["當前日本實踐", "現在の日本での実践"],
    "External Profile": ["外部檔案", "外部プロフィール"], "Selected Writing": ["精選寫作", "主な執筆作品"],
    "Multilingual Editions": ["多語言版本", "多言語版"], "Publication Status": ["出版狀態", "出版状況"],
    "Practice Connections": ["實踐連接", "実践間の接続"], "Current Structure": ["當前結構", "現在の構成"],
    "Current Collaboration": ["當前協作", "現在の協働"], "Public Verification": ["公共驗證", "公開検証"],
    "Professional Dialogue": ["專業對話", "専門的対話"], "Research Dialogue": ["研究對話", "研究対話"],
    "Framework Development": ["框架發展", "フレームワーク開発"], "Methodological Expansion": ["方法擴展", "方法論的拡張"],
    "Japan Activity": ["日本活動", "日本での活動"], "International Continuity": ["國際連續性", "国際的継続性"]
  };
  let activeLang = window.SantooLocale?.language || "en";

  function translatePageContent(lang) {
    if (!document.body) return;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach((node) => {
      const parent = node.parentElement;
      if (!parent || parent.closest("script, style, [data-no-translate]")) return;
      const current = node.nodeValue.trim();
      if (!current) return;

      let source = node.__santooSourceText;
      if (!source) {
        source = Object.keys(contentTranslations).find((english) => {
          const entry = contentTranslations[english];
          return current === english || current === entry.zh || current === entry.ja;
        });
        if (!source) return;
        node.__santooSourceText = source;
      }

      const entry = contentTranslations[source];
      const replacement = lang === "en" ? source : entry[lang];
      const leading = node.nodeValue.match(/^\s*/)?.[0] || "";
      const trailing = node.nodeValue.match(/\s*$/)?.[0] || "";
      node.nodeValue = `${leading}${replacement}${trailing}`;
    });
  }

  function translateDirectory(text, lang) {
    if (lang === "en" || !directoryLabels[text]) return text;
    return directoryLabels[text][lang === "zh" ? 0 : 1];
  }

  function applyLanguage(lang) {
    activeLang = ["en", "zh", "ja"].includes(lang) ? lang : "en";
    document.documentElement.lang = activeLang === "zh" ? "zh-Hant" : activeLang;

    document.querySelectorAll("a[href]").forEach((link) => {
      const labels = navLabels[routeName(link.href)];
      if (labels && (link.closest("#siteNav") || link.closest(".home-nav"))) link.textContent = labels[activeLang];
    });

    const heading = document.querySelector(".intro-copy h1");
    if (heading && pageTitles[currentPage]) heading.textContent = pageTitles[currentPage][activeLang];
    document.querySelectorAll(".immersive-directory-primary").forEach((label) => {
      label.textContent = translateDirectory(label.dataset.sourceTitle, activeLang);
    });

    const back = document.querySelector(".immersive-back");
    if (back) back.textContent = activeLang === "zh" ? "← 返回" : activeLang === "ja" ? "← 戻る" : "← Back";
    const close = document.querySelector(".immersive-close");
    if (close) close.textContent = activeLang === "zh" ? "關閉 ×" : activeLang === "ja" ? "閉じる ×" : "Close ×";
    const dialogHeading = document.querySelector(".immersive-dialog-title");
    if (dialogHeading?.dataset.sourceTitle) dialogHeading.textContent = translateDirectory(dialogHeading.dataset.sourceTitle, activeLang);
    document.querySelectorAll(".language-toggle").forEach((languageToggle) => {
      languageToggle.textContent = activeLang === "zh" ? "語言" : activeLang === "ja" ? "言語" : "Language";
    });
    if (nav) nav.setAttribute("aria-label", activeLang === "zh" ? "主導航" : activeLang === "ja" ? "メインナビゲーション" : "Primary navigation");
    const directory = document.querySelector(".immersive-directory");
    if (directory) directory.setAttribute("aria-label", activeLang === "zh" ? "頁面目錄" : activeLang === "ja" ? "ページ目次" : "Page contents");
    const trajectory = document.querySelector(".trajectory");
    if (trajectory) trajectory.setAttribute("aria-label", activeLang === "zh" ? "當前身份路徑" : activeLang === "ja" ? "現在の活動領域" : "Current identity trajectory");
    document.querySelectorAll(".artwork-media").forEach((media) => {
      const image = media.querySelector("img");
      const prefix = activeLang === "zh" ? "放大查看：" : activeLang === "ja" ? "拡大表示：" : "View at full size: ";
      media.setAttribute("aria-label", `${prefix}${image?.alt || "artwork"}`);
    });
    translatePageContent(activeLang);
  }

  function routeName(url) {
    const name = new URL(url, window.location.href).pathname.split("/").pop();
    return name || "index.html";
  }

  function makeTransition(background, direction = "right") {
    const layer = document.createElement("div");
    layer.className = "route-transition";
    layer.setAttribute("aria-hidden", "true");
    layer.dataset.pan = direction;
    layer.style.setProperty("--transition-bg", `url("${background}")`);
    document.body.appendChild(layer);
    return layer;
  }

  function transitionDirection(fromRoute, toRoute) {
    const routes = Object.keys(routeBackgrounds);
    const fromIndex = routes.indexOf(fromRoute);
    const toIndex = routes.indexOf(toRoute);
    return fromIndex >= 0 && toIndex >= 0 && toIndex < fromIndex ? "left" : "right";
  }

  const main = document.querySelector("main");
  if (main) {
    if (!main.id) main.id = "main-content";
    const skipLink = document.createElement("a");
    skipLink.className = "skip-link";
    skipLink.href = `#${main.id}`;
    skipLink.textContent = "Skip to content";
    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  document.querySelectorAll("[data-nav]").forEach((link) => {
    link.textContent = link.textContent.replace(/^\d{2}\s+/, "");
    if (link.dataset.nav === (body.dataset.primary || currentPage)) {
      link.setAttribute("aria-current", "page");
    }
  });

  if (nav) {
    const languageMenu = document.createElement("div");
    languageMenu.className = "language-menu";
    const languageToggle = document.createElement("button");
    languageToggle.type = "button";
    languageToggle.className = "language-toggle";
    languageToggle.setAttribute("aria-expanded", "false");
    languageToggle.textContent = "Language";
    const languageOptions = document.createElement("div");
    languageOptions.className = "language-options";
    languageOptions.setAttribute("role", "menu");
    [["en", "English"], ["zh", "繁體中文"], ["ja", "日本語"]].forEach(([code, label]) => {
      const option = document.createElement("button");
      option.type = "button";
      option.dataset.lang = code;
      option.setAttribute("role", "menuitem");
      option.textContent = label;
      option.addEventListener("click", () => {
        if (window.SantooLocale) window.SantooLocale.select(code);
        else applyLanguage(code);
        languageMenu.classList.remove("is-open");
        languageToggle.setAttribute("aria-expanded", "false");
      });
      languageOptions.appendChild(option);
    });
    languageToggle.addEventListener("click", () => {
      const open = languageMenu.classList.toggle("is-open");
      languageToggle.setAttribute("aria-expanded", String(open));
    });
    languageMenu.append(languageToggle, languageOptions);
    nav.prepend(languageMenu);
    document.addEventListener("click", (event) => {
      if (!languageMenu.contains(event.target)) {
        languageMenu.classList.remove("is-open");
        languageToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  const artworkImages = Array.from(document.querySelectorAll(".artwork-card > img"));
  if (artworkImages.length && body.dataset.artworkViewer !== "detail") {
    artworkImages.forEach((image) => {
      const media = document.createElement("button");
      media.type = "button";
      media.className = "artwork-media";
      media.setAttribute("aria-label", `View ${image.alt || "artwork"} at full size`);

      const lens = document.createElement("span");
      lens.className = "artwork-lens";
      lens.setAttribute("aria-hidden", "true");

      image.parentNode.insertBefore(media, image);
      media.append(image, lens);
    });

    const lightbox = document.createElement("section");
    lightbox.className = "artwork-lightbox";
    lightbox.hidden = true;
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-labelledby", "artworkLightboxTitle");

    const lightboxHeader = document.createElement("header");
    lightboxHeader.className = "artwork-lightbox-header";

    const lightboxTitle = document.createElement("span");
    lightboxTitle.id = "artworkLightboxTitle";
    lightboxTitle.className = "artwork-lightbox-title";

    const lightboxPixels = document.createElement("span");
    lightboxPixels.className = "artwork-lightbox-pixels";

    const lightboxClose = document.createElement("button");
    lightboxClose.type = "button";
    lightboxClose.className = "artwork-lightbox-close";

    const lightboxViewport = document.createElement("div");
    lightboxViewport.className = "artwork-lightbox-viewport";

    const lightboxCanvas = document.createElement("div");
    lightboxCanvas.className = "artwork-lightbox-canvas";

    const lightboxImage = document.createElement("img");
    lightboxImage.className = "artwork-lightbox-image";
    lightboxImage.decoding = "async";

    lightboxHeader.append(lightboxTitle, lightboxPixels, lightboxClose);
    lightboxCanvas.appendChild(lightboxImage);
    lightboxViewport.appendChild(lightboxCanvas);
    lightbox.append(lightboxHeader, lightboxViewport);
    body.appendChild(lightbox);

    const lightboxCopy = {
      en: { close: "Close ×", closeLabel: "Close artwork", pixels: "Original pixels" },
      zh: { close: "關閉 ×", closeLabel: "關閉作品大圖", pixels: "原始像素" },
      ja: { close: "閉じる ×", closeLabel: "作品画像を閉じる", pixels: "原寸ピクセル" }
    };
    let lastArtworkTrigger = null;
    let lightboxCloseTimer = null;

    const updatePixelLabel = () => {
      if (!lightboxImage.naturalWidth || !lightboxImage.naturalHeight) return;
      const copy = lightboxCopy[activeLang] || lightboxCopy.en;
      lightboxPixels.textContent = `${lightboxImage.naturalWidth} × ${lightboxImage.naturalHeight} px / ${copy.pixels}`;
    };

    const closeArtworkLightbox = () => {
      if (lightbox.hidden) return;
      lightbox.classList.remove("is-open");
      body.classList.remove("artwork-lightbox-open");
      window.clearTimeout(lightboxCloseTimer);
      lightboxCloseTimer = window.setTimeout(() => {
        lightbox.hidden = true;
        lightboxImage.removeAttribute("src");
        if (lastArtworkTrigger?.isConnected) lastArtworkTrigger.focus();
      }, reducedMotion ? 0 : 240);
    };

    const openArtworkLightbox = (media) => {
      const sourceImage = media.querySelector("img");
      if (!sourceImage) return;

      const card = media.closest(".artwork-card");
      const captionParts = card ? Array.from(card.querySelectorAll("figcaption span")) : [];
      const title = captionParts[0]?.textContent.trim() || sourceImage.alt || "Artwork";
      const copy = lightboxCopy[activeLang] || lightboxCopy.en;

      window.clearTimeout(lightboxCloseTimer);
      lastArtworkTrigger = media;
      lightboxTitle.textContent = title;
      lightboxClose.textContent = copy.close;
      lightboxClose.setAttribute("aria-label", copy.closeLabel);
      lightboxPixels.textContent = copy.pixels;
      lightboxImage.alt = sourceImage.alt;
      lightboxImage.src = sourceImage.currentSrc || sourceImage.src;
      lightbox.hidden = false;
      body.classList.add("artwork-lightbox-open");
      lightboxViewport.scrollTo(0, 0);
      updatePixelLabel();
      requestAnimationFrame(() => lightbox.classList.add("is-open"));
      lightboxClose.focus();
    };

    lightboxImage.addEventListener("load", updatePixelLabel);
    lightboxClose.addEventListener("click", closeArtworkLightbox);
    lightboxViewport.addEventListener("click", (event) => {
      if (event.target === lightboxViewport || event.target === lightboxCanvas) closeArtworkLightbox();
    });
    document.addEventListener("click", (event) => {
      const media = event.target.closest?.(".artwork-media");
      if (media) openArtworkLightbox(media);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !lightbox.hidden) {
        event.preventDefault();
        event.stopImmediatePropagation();
        closeArtworkLightbox();
      }
    });

    const hideArtworkLens = (media) => {
      if (media) media.classList.remove("is-lens-active");
    };

    document.addEventListener("pointermove", (event) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      const media = event.target.closest?.(".artwork-media");
      if (!media) return;

      const image = media.querySelector("img");
      const lens = media.querySelector(".artwork-lens");
      if (!image || !lens || !image.naturalWidth || !image.naturalHeight) return;

      const imageRect = image.getBoundingClientRect();
      const mediaRect = media.getBoundingClientRect();
      const naturalRatio = image.naturalWidth / image.naturalHeight;
      const elementRatio = imageRect.width / imageRect.height;
      let contentWidth = imageRect.width;
      let contentHeight = imageRect.height;
      let contentLeft = imageRect.left;
      let contentTop = imageRect.top;

      if (elementRatio > naturalRatio) {
        contentWidth = contentHeight * naturalRatio;
        contentLeft += (imageRect.width - contentWidth) / 2;
      } else {
        contentHeight = contentWidth / naturalRatio;
        contentTop += (imageRect.height - contentHeight) / 2;
      }

      if (
        event.clientX < contentLeft || event.clientX > contentLeft + contentWidth ||
        event.clientY < contentTop || event.clientY > contentTop + contentHeight
      ) {
        hideArtworkLens(media);
        return;
      }

      const zoom = 2;
      const lensWidth = lens.getBoundingClientRect().width;
      const lensHeight = lens.getBoundingClientRect().height;
      const sourceX = event.clientX - contentLeft;
      const sourceY = event.clientY - contentTop;
      lens.style.left = `${event.clientX - mediaRect.left}px`;
      lens.style.top = `${event.clientY - mediaRect.top}px`;
      lens.style.backgroundImage = `url("${image.currentSrc || image.src}")`;
      lens.style.backgroundSize = `${contentWidth * zoom}px ${contentHeight * zoom}px`;
      lens.style.backgroundPosition = `${lensWidth / 2 - sourceX * zoom}px ${lensHeight / 2 - sourceY * zoom}px`;
      media.classList.add("is-lens-active");
    });

    document.addEventListener("pointerout", (event) => {
      const media = event.target.closest?.(".artwork-media");
      if (media && !media.contains(event.relatedTarget)) hideArtworkLens(media);
    });
  }

  const immersiveSections = Array.from(document.querySelectorAll("main.page-shell > .section"));
  if (currentPage && currentPage !== "home" && immersiveSections.length) {
    body.classList.add("immersive-page");

    const backLink = document.createElement("a");
    backLink.className = "immersive-back";
    backLink.href = "index_pc.html";
    const parentRoutes = { practice: "art-practice.html", research: "research-fields.html", about: "about.html" };
    if (body.dataset.primary && body.dataset.primary !== currentPage && parentRoutes[body.dataset.primary]) backLink.href = parentRoutes[body.dataset.primary];
    backLink.textContent = "← Back";
    document.body.appendChild(backLink);

    const directory = document.createElement("nav");
    directory.className = "immersive-directory";
    directory.setAttribute("aria-label", "Page contents");

    const overlay = document.createElement("div");
    overlay.className = "immersive-overlay";
    overlay.hidden = true;

    const dialog = document.createElement("section");
    dialog.className = "immersive-dialog";
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    dialog.setAttribute("aria-labelledby", "immersiveDialogTitle");

    const closeButton = document.createElement("button");
    closeButton.className = "immersive-close";
    closeButton.type = "button";
    closeButton.textContent = "Close ×";

    const modalLanguageMenu = document.createElement("div");
    modalLanguageMenu.className = "language-menu modal-language-menu";
    const modalLanguageToggle = document.createElement("button");
    modalLanguageToggle.type = "button";
    modalLanguageToggle.className = "language-toggle";
    modalLanguageToggle.setAttribute("aria-expanded", "false");
    modalLanguageToggle.textContent = "Language";
    const modalLanguageOptions = document.createElement("div");
    modalLanguageOptions.className = "language-options";
    modalLanguageOptions.setAttribute("role", "menu");
    [["en", "English"], ["zh", "繁體中文"], ["ja", "日本語"]].forEach(([code, label]) => {
      const option = document.createElement("button");
      option.type = "button";
      option.dataset.lang = code;
      option.setAttribute("role", "menuitem");
      option.textContent = label;
      option.addEventListener("click", () => {
        if (window.SantooLocale) window.SantooLocale.select(code);
        else applyLanguage(code);
        modalLanguageMenu.classList.remove("is-open");
        modalLanguageToggle.setAttribute("aria-expanded", "false");
      });
      modalLanguageOptions.appendChild(option);
    });
    modalLanguageToggle.addEventListener("click", () => {
      const open = modalLanguageMenu.classList.toggle("is-open");
      modalLanguageToggle.setAttribute("aria-expanded", String(open));
    });
    modalLanguageMenu.append(modalLanguageToggle, modalLanguageOptions);

    const dialogTitle = document.createElement("h2");
    dialogTitle.id = "immersiveDialogTitle";
    dialogTitle.className = "immersive-dialog-title";

    const dialogContent = document.createElement("div");
    dialogContent.className = "immersive-dialog-content";
    dialog.append(modalLanguageMenu, closeButton, dialogTitle, dialogContent);
    overlay.appendChild(dialog);
    document.body.append(directory, overlay);

    let lastTrigger = null;
    const closeDialog = () => {
      overlay.hidden = true;
      body.classList.remove("modal-open");
      dialogContent.replaceChildren();
      if (window.location.hash) history.replaceState(null, "", window.location.pathname + window.location.search);
      if (lastTrigger) lastTrigger.focus();
    };

    const normalizeModalLabel = (value) => value
      .trim()
      .toLocaleLowerCase()
      .replace(/^[a-z]-?\d+(?:\s*[\/／]\s*[a-z]-?\d+)?\s*[\/／]\s*/i, "")
      .replace(/[\s\/／·:：_\-–—&]+/g, "");

    const removeRepeatedModalLabels = (clonedBody) => {
      const localizedTitle = normalizeModalLabel(dialogTitle.textContent);
      const sourceTitle = normalizeModalLabel(dialogTitle.dataset.sourceTitle || "");

      Array.from(clonedBody.querySelectorAll(":scope > .lead, :scope > h2, :scope > h3")).forEach((element) => {
        const value = normalizeModalLabel(element.textContent);
        if (value && (value === localizedTitle || value === sourceTitle)) element.remove();
      });

      const moduleCode = clonedBody.querySelector(":scope > .module-code");
      const lead = clonedBody.querySelector(":scope > .lead");
      if (!moduleCode || !lead) return;

      const codeValue = normalizeModalLabel(moduleCode.textContent);
      const leadValue = normalizeModalLabel(lead.textContent);
      if (codeValue && leadValue && (
        codeValue === leadValue ||
        codeValue.endsWith(leadValue) ||
        leadValue.endsWith(codeValue)
      )) lead.remove();
    };

    immersiveSections.forEach((section) => {
      const label = section.querySelector(".section-label");
      const sectionBody = section.querySelector(".section-body");
      if (!label || !sectionBody) return;

      const title = label.textContent.trim().replace(/^\d+\s*\/\s*/, "");
      if (section.dataset.href) {
        const link = document.createElement("a");
        link.href = section.dataset.href;
        link.className = "immersive-directory-item";
        link.innerHTML = '<span class="immersive-directory-primary"></span>';
        const primary = link.firstElementChild;
        primary.dataset.sourceTitle = title;
        primary.textContent = translateDirectory(title, activeLang);
        directory.appendChild(link);
        return;
      }
      const trigger = document.createElement("button");
      trigger.type = "button";
      trigger.className = "immersive-directory-item";
      trigger.dataset.section = section.id;

      const primary = document.createElement("span");
      primary.className = "immersive-directory-primary";
      primary.dataset.sourceTitle = title;
      primary.textContent = translateDirectory(title, activeLang);
      trigger.appendChild(primary);

      trigger.addEventListener("click", () => {
        lastTrigger = trigger;
        dialogTitle.dataset.sourceTitle = title;
        dialogTitle.textContent = translateDirectory(title, activeLang);
        const clonedBody = sectionBody.cloneNode(true);
        removeRepeatedModalLabels(clonedBody);
        dialogContent.replaceChildren(clonedBody);
        overlay.hidden = false;
        body.classList.add("modal-open");
        closeButton.focus();
        window.dispatchEvent(new CustomEvent('santoo:section-open', {detail:{id:section.id, content:dialogContent}}));
      });
      directory.appendChild(trigger);
    });

    const openHashSection = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const trigger = [...directory.children].find(button => button.dataset.section === id);
      if (trigger) trigger.click();
    };
    window.addEventListener("hashchange", openHashSection);
    if (window.location.hash) requestAnimationFrame(openHashSection);

    closeButton.addEventListener("click", closeDialog);
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) closeDialog();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !overlay.hidden) closeDialog();
      if (event.key === "Tab" && !overlay.hidden && !document.querySelector(".artwork-inspector[open]")) {
        const items = [...dialog.querySelectorAll('a[href], button, [tabindex="0"]')].filter(el => el.getClientRects().length);
        const first = items[0], last = items.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    });
  }

  window.addEventListener('santoo:language-change', event => applyLanguage(event.detail.language));
  applyLanguage(window.SantooLocale?.language || activeLang);

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.textContent = isOpen
        ? (activeLang === "zh" ? "關閉" : activeLang === "ja" ? "閉じる" : "Close")
        : (activeLang === "zh" ? "目錄" : activeLang === "ja" ? "目次" : "Index");
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.textContent = activeLang === "zh" ? "目錄" : activeLang === "ja" ? "目次" : "Index";
        menuButton.focus();
      }
    });
  }

  if (!reducedMotion) {
    try {
      const arrival = JSON.parse(sessionStorage.getItem("santoo-route-transition") || "null");
      const here = routeName(window.location.href);
      if (arrival && arrival.route === here && arrival.background) {
        sessionStorage.removeItem("santoo-route-transition");
        const arrivalLayer = makeTransition(arrival.background, arrival.direction || "right");
        arrivalLayer.classList.add("is-arrival");
        requestAnimationFrame(() => requestAnimationFrame(() => {
          arrivalLayer.classList.add("is-releasing");
          window.setTimeout(() => arrivalLayer.remove(), 650);
        }));
      }
    } catch (_) {}
  }

  document.querySelectorAll("a[href]").forEach((link) => {
    const destinationRoute = routeName(link.href);
    const background = routeBackgrounds[destinationRoute];
    if (!background) return;
    const preload = () => {
      const image = new Image();
      image.src = background;
    };
    link.addEventListener("pointerenter", preload, { once: true });
    link.addEventListener("focus", preload, { once: true });
  });

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (link.target === "_blank" || link.hasAttribute("download")) return;

    const destination = new URL(link.href, window.location.href);
    if (destination.origin !== window.location.origin || destination.hash || !destination.pathname.endsWith(".html")) return;

    const destinationRoute = routeName(destination.href);
    const background = routeBackgrounds[destinationRoute];
    if (!background) return;
    if (reducedMotion) return;

    event.preventDefault();
    if (body.classList.contains("is-route-leaving")) return;

    body.classList.add("is-route-leaving");
    const direction = transitionDirection(routeName(window.location.href), destinationRoute);
    const layer = makeTransition(background, direction);
    try {
      sessionStorage.setItem("santoo-route-transition", JSON.stringify({ route: destinationRoute, background, direction }));
    } catch (_) {}

    requestAnimationFrame(() => layer.classList.add("is-active"));
    window.setTimeout(() => window.location.assign(destination.href), 3000);
  });
})();
