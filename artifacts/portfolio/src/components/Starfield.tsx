import { useEffect, useRef } from "react";

interface StarfieldProps {
  className?: string;
  /** Pixels of area per star — lower means denser */
  density?: number;
  /** Average milliseconds between shooting stars */
  shootingEvery?: number;
}

interface Star {
  x: number;
  y: number;
  r: number;
  alpha: number;
  speed: number;
  phase: number;
  drift: number;
  tint: string;
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  length: number;
}

const TINTS = ["255,255,255", "255,255,255", "255,255,255", "186,230,253", "199,210,254"];

// Twinkling star sky with occasional shooting stars, drawn on a canvas that
// fills its (positioned) parent. Pauses itself when scrolled out of view.
export default function Starfield({ className = "", density = 5200, shootingEvery = 2600 }: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !parent || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    const meteors: Meteor[] = [];
    let raf = 0;
    let visible = false;
    let last = performance.now();
    let nextMeteor = last + 800 + Math.random() * shootingEvery;

    function build() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent!.clientWidth;
      height = parent!.clientHeight;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(420, Math.round((width * height) / density));
      stars = Array.from({ length: count }, () => {
        const big = Math.random() < 0.08;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: big ? 0.9 + Math.random() * 0.8 : 0.25 + Math.random() * 0.6,
          alpha: big ? 0.6 + Math.random() * 0.4 : 0.15 + Math.random() * 0.5,
          speed: 0.4 + Math.random() * 1.6,
          phase: Math.random() * Math.PI * 2,
          drift: 0.6 + Math.random() * 2.4,
          tint: TINTS[Math.floor(Math.random() * TINTS.length)],
        };
      });
    }

    function spawnMeteor() {
      // Travel from upper-right towards lower-left at a shallow angle
      const angle = (200 + Math.random() * 25) * (Math.PI / 180);
      const speed = 0.9 + Math.random() * 0.7; // px per ms
      meteors.push({
        x: width * (0.35 + Math.random() * 0.7),
        y: -20 + Math.random() * height * 0.45,
        vx: Math.cos(angle) * speed,
        vy: -Math.sin(angle) * speed,
        life: 0,
        maxLife: 700 + Math.random() * 700,
        length: 90 + Math.random() * 140,
      });
    }

    function draw(now: number) {
      const dt = Math.min(now - last, 50);
      last = now;
      ctx!.clearRect(0, 0, width, height);

      const t = now / 1000;
      for (const s of stars) {
        if (!reduceMotion) {
          s.y -= (s.drift * dt) / 1000;
          if (s.y < -2) s.y = height + 2;
        }
        const twinkle = reduceMotion ? 1 : 0.55 + 0.45 * Math.sin(t * s.speed + s.phase);
        const a = s.alpha * twinkle;
        ctx!.beginPath();
        ctx!.fillStyle = `rgba(${s.tint},${a})`;
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fill();
        if (s.r > 1.1) {
          // soft halo on the brightest stars
          ctx!.beginPath();
          ctx!.fillStyle = `rgba(${s.tint},${a * 0.12})`;
          ctx!.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      if (!reduceMotion) {
        if (now > nextMeteor) {
          spawnMeteor();
          if (Math.random() < 0.25) spawnMeteor();
          nextMeteor = now + shootingEvery * (0.5 + Math.random());
        }

        for (let i = meteors.length - 1; i >= 0; i--) {
          const m = meteors[i];
          m.life += dt;
          m.x += m.vx * dt;
          m.y += m.vy * dt;
          const p = m.life / m.maxLife;
          if (p >= 1) {
            meteors.splice(i, 1);
            continue;
          }
          const fade = p < 0.15 ? p / 0.15 : 1 - (p - 0.15) / 0.85;
          const speed = Math.hypot(m.vx, m.vy);
          const tx = m.x - (m.vx / speed) * m.length;
          const ty = m.y - (m.vy / speed) * m.length;
          const grad = ctx!.createLinearGradient(m.x, m.y, tx, ty);
          grad.addColorStop(0, `rgba(255,255,255,${0.95 * fade})`);
          grad.addColorStop(0.2, `rgba(165,243,252,${0.5 * fade})`);
          grad.addColorStop(1, "rgba(129,140,248,0)");
          ctx!.strokeStyle = grad;
          ctx!.lineWidth = 1.4;
          ctx!.lineCap = "round";
          ctx!.beginPath();
          ctx!.moveTo(m.x, m.y);
          ctx!.lineTo(tx, ty);
          ctx!.stroke();

          ctx!.beginPath();
          ctx!.fillStyle = `rgba(255,255,255,${fade})`;
          ctx!.shadowColor = "rgba(165,243,252,0.9)";
          ctx!.shadowBlur = 10;
          ctx!.arc(m.x, m.y, 1.4, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.shadowBlur = 0;
        }
      }

      if (visible && !reduceMotion) raf = requestAnimationFrame(draw);
    }

    function start() {
      cancelAnimationFrame(raf);
      last = performance.now();
      raf = requestAnimationFrame(draw);
    }

    build();
    draw(performance.now());

    const resizeObserver = new ResizeObserver(() => {
      build();
      if (!visible || reduceMotion) draw(performance.now());
    });
    resizeObserver.observe(parent);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reduceMotion) start();
      else cancelAnimationFrame(raf);
    });
    io.observe(parent);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      io.disconnect();
    };
  }, [density, shootingEvery]);

  return <canvas ref={canvasRef} className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden />;
}
