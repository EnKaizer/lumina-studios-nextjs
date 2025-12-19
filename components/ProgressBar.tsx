import { motion, useScroll, useSpring } from "framer-motion";

export function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[100] bg-white/5">
      <motion.div
        className="h-full bg-primary origin-left shadow-[0_0_10px_var(--color-primary)]"
        style={{ scaleX }}
      />
    </div>
  );
}
