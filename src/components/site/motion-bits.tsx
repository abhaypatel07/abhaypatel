import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const total = 60;
    const tick = () => {
      frame += 1;
      const progress = 1 - Math.pow(1 - frame / total, 3);
      setDisplay(Math.round(value * progress));
      if (frame < total) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

export function Typing({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index] ?? "";
    const done = !deleting && text === current;
    const cleared = deleting && text === "";

    const timeout = window.setTimeout(
      () => {
        if (done) {
          setDeleting(true);
          return;
        }
        if (cleared) {
          setDeleting(false);
          setIndex((i) => (i + 1) % words.length);
          return;
        }
        setText(
          deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1),
        );
      },
      done ? 1600 : deleting ? 40 : 75,
    );

    return () => window.clearTimeout(timeout);
  }, [text, deleting, index, words]);

  return (
    <span aria-live="polite">
      <span className="gradient-text">{text}</span>
      <span className="animate-caret ml-1 inline-block h-[0.9em] w-[3px] translate-y-[2px] bg-primary" />
    </span>
  );
}
