gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom bottom",
    scrub: true
  }
});

// Stage A: 0~30%
tl.to(".transition-path", { backgroundColor: "#e8e8e8", duration: 0.3 }, 0);

// Stage B: 30~70% (flatten)
tl.to(".black-box", {
  boxShadow: "0 0 0 rgba(0,0,0,0)",
  scale: 0.9,
  borderRadius: 1,
  duration: 0.4
}, 0.3)
.to(".network", { opacity: 0.55, duration: 0.4 }, 0.3);

// Stage C: 70~100% (system layer)
tl.to(".black-box", { scale: 0.35, duration: 0.3 }, 0.7)
  .to(".content", { autoAlpha: 1, duration: 0.2 }, 0.75)
  .to("#label2", { opacity: 1, duration: 0.15 }, 0.82)
  .to("#label3", { opacity: 1, duration: 0.15 }, 0.9);

// Logo: brand -> anchor
gsap.to(".logo-full", {
  opacity: 0,
  scrollTrigger: { trigger: ".hero", start: "top top", end: "70% top", scrub: true }
});
gsap.to(".logo-mark", {
  opacity: 1,
  scrollTrigger: { trigger: ".hero", start: "40% top", end: "90% top", scrub: true }
});
gsap.to("#logo", {
  scale: 0.72,
  scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
});

// Weak response system (small amplitude + delay)
const moveNode = gsap.quickTo(".aux-node", "x", { duration: 0.5, ease: "power2.out" });
const movePath = gsap.quickTo(".transition-path", "x", { duration: 0.7, ease: "power2.out" });

window.addEventListener("mousemove", (e) => {
  const xNorm = (e.clientX / window.innerWidth - 0.5); // -0.5 ~ 0.5
  moveNode(xNorm * 12); // max about +/-6px
  movePath(xNorm * 8);  // max about +/-4px
});
