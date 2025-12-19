import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center" | "right";
}

export function SectionTitle({ title, subtitle, className, align = "center" }: SectionTitleProps) {
  return (
    <div className={cn("mb-12 md:mb-20", {
      "text-center": align === "center",
      "text-left": align === "left",
      "text-right": align === "right",
    }, className)}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-5xl font-display font-bold mb-4 uppercase tracking-tight"
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
          {title}
        </span>
      </motion.h2>
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-light"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={cn("h-1 w-24 bg-primary mt-6", {
          "mx-auto": align === "center",
          "ml-0": align === "left",
          "ml-auto": align === "right",
        })}
      />
    </div>
  );
}
