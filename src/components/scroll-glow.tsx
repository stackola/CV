"use client";

import { useEffect, useRef } from "react";

/**
 * Site-wide accent glow that drifts from the top of the page to the bottom as
 * the visitor scrolls. The blob follows the scroll position with an eased lag
 * (rAF lerp) so the motion feels fluid rather than mechanically coupled, plus
 * a slow border-radius morph for an organic shape. Honours
 * prefers-reduced-motion by pinning the glow statically at the top.
 */
export function ScrollGlow() {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const blob = blobRef.current;
    if (!blob) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      blob.style.transform = "translate3d(-50%, -40%, 0)";
      return;
    }

    let current = -1; // forces an initial paint
    let raf = 0;

    const targetProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };

    const paint = (p: number) => {
      const vh = window.innerHeight;
      // blob center travels from just under the top edge to near the bottom edge
      const y = -0.35 * vh + p * 1.0 * vh;
      // slight, linear diagonal drift (no side-to-side wobble)
      const x = (p - 0.5) * 0.1 * window.innerWidth;
      blob.style.transform = `translate3d(calc(-50% + ${x.toFixed(1)}px), ${y.toFixed(1)}px, 0)`;
    };

    const tick = () => {
      const target = targetProgress();
      const delta = target - current;
      if (Math.abs(delta) < 0.0005) {
        current = target;
        paint(current);
        raf = 0;
        return; // settled: stop the loop until the next scroll/resize
      }
      current += delta * 0.07;
      paint(current);
      raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    current = targetProgress();
    paint(current);
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", wake, { passive: true });

    return () => {
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", wake);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        ref={blobRef}
        className="absolute left-1/2 top-0 h-[620px] w-[620px] rounded-full bg-[var(--color-accent)] opacity-20 blur-3xl will-change-transform"
        style={{ transform: "translate3d(-50%, -40%, 0)" }}
      />
    </div>
  );
}
