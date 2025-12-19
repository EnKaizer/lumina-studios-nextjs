import React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface CyberButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

const CyberButton = React.forwardRef<HTMLButtonElement, CyberButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const variants = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90 border-transparent shadow-[0_0_15px_rgba(255,106,0,0.5)]",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border-white/10",
      outline: "bg-transparent border-primary text-primary hover:bg-primary/10 shadow-[0_0_10px_rgba(255,106,0,0.2)]",
      ghost: "bg-transparent hover:bg-white/5 text-foreground border-transparent",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-14 px-8 text-lg",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "relative inline-flex items-center justify-center font-display font-bold uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 clip-path-slant",
          variants[variant],
          sizes[size],
          className
        )}
        style={{
          clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)"
        }}
        {...props}
      >
        {children}
        {variant === "primary" && (
          <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />
        )}
      </motion.button>
    );
  }
);

CyberButton.displayName = "CyberButton";

export { CyberButton };
