gsap.registerPlugin(ScrollTrigger);

// 创建滚动触发的时间线
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom bottom",
    scrub: true  // 使动画与滚动同步
  }
});

// Stage A: 0~30%（初始状态）
tl.to(".transition-path", { backgroundColor: "#e8e8e8", duration: 0.3 }, 0);

// Stage B: 30~70%（压平效果）
tl.to(".black-box", {
  scale: 0.9,
  boxShadow: "0 0 0 rgba(0,0,0,0)",  // 去掉阴影
  borderRadius: 1,
  duration: 0.4
}, 0.3);

// Stage C: 70~100%（进入系统层）
tl.to(".black-box", { scale: 0.35, duration: 0.3 }, 0.7)
  .to(".content", { autoAlpha: 1, duration: 0.2 }, 0.75)
  .to("#label2", { opacity: 1, duration: 0.15 }, 0.82)
  .to("#label3", { opacity: 1, duration: 0.15 }, 0.9);

// 微互动：鼠标移动时的小方块和路径移动
const moveNode = gsap.quickTo(".aux-node", "x", { duration: 0.5, ease: "power2.out" });
const movePath = gsap.quickTo(".transition-path", "x", { duration: 0.7, ease: "power2.out" });

window.addEventListener("mousemove", (e) => {
  const xNorm = (e.clientX / window.innerWidth - 0.5); // 计算鼠标位置
  moveNode(xNorm * 6);   // 小方块的移动（缩小到±6px）
  movePath(xNorm * 4);   // 白色路径的轻微移动（缩小到±4px）
});
