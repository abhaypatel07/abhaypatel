import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { ArrowUp } from "lucide-react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="gradient-accent fixed inset-x-0 top-0 z-[60] h-0.5 origin-left"
    />
  );
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="glass fixed right-5 bottom-5 z-50 grid h-11 w-11 place-items-center rounded-full text-foreground transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -500, y: -500 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[55] hidden h-[26rem] w-[26rem] rounded-full opacity-60 blur-[90px] md:block"
      style={{
        left: pos.x - 208,
        top: pos.y - 208,
        background:
          "radial-gradient(circle, color-mix(in oklab, var(--primary) 26%, transparent), transparent 65%)",
        transition: "left 160ms ease-out, top 160ms ease-out",
      }}
    />
  );
}
