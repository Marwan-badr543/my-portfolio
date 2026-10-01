import { useEffect, useRef } from "react";

// Soft light that trails the cursor across the whole page (mouse devices only).
export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const glow = glowRef.current;
    const core = coreRef.current;
    if (!finePointer || !glow || !core) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 3;
    let x = targetX;
    let y = targetY;
    let cx = targetX;
    let cy = targetY;
    let raf = 0;
    let running = false;

    function frame() {
      // The wide glow lags behind more than the small core, which gives depth
      const ease = reduceMotion ? 1 : 0.08;
      const coreEase = reduceMotion ? 1 : 0.22;
      x += (targetX - x) * ease;
      y += (targetY - y) * ease;
      cx += (targetX - cx) * coreEase;
      cy += (targetY - cy) * coreEase;
      glow!.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      core!.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      if (Math.abs(targetX - x) > 0.3 || Math.abs(targetY - y) > 0.3) {
        raf = requestAnimationFrame(frame);
      } else {
        running = false;
      }
    }

    function onMove(e: PointerEvent) {
      targetX = e.clientX;
      targetY = e.clientY;
      glow!.style.opacity = "1";
      core!.style.opacity = "1";
      if (!running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    }

    function onLeave() {
      glow!.style.opacity = "0";
      core!.style.opacity = "0";
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden hidden [@media(hover:hover)_and_(pointer:fine)]:block" aria-hidden>
      <div ref={glowRef} className="cursor-glow" />
      <div ref={coreRef} className="cursor-core" />
    </div>
  );
}
