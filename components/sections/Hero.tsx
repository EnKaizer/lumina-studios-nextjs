import { CyberButton } from "@/components/ui/CyberButton";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { MiniGame } from "@/components/MiniGame";
import { useState } from "react";

export function Hero() {
  const [showGame, setShowGame] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: y1 }}
      >
        <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
      </motion.div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />

      <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-mono mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            ADVERGAMES + IA
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
            ILUMINE SUAS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">CAMPANHAS</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
            Jogos rápidos via QR Code que transformam público em leads, vendas e dados acionáveis.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <CyberButton size="lg" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              Quero uma Demo <ArrowRight className="ml-2 w-5 h-5" />
            </CyberButton>
            <CyberButton variant="outline" size="lg" onClick={() => setShowGame(true)} className="lg:hidden">
              <Play className="mr-2 w-5 h-5" /> Jogar Demo
            </CyberButton>
            <CyberButton variant="outline" size="lg" onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })} className="hidden lg:inline-flex">
              Ver como funciona
            </CyberButton>
          </div>
        </motion.div>

        <motion.div
          style={{ y: y2, opacity }}
          className="relative mt-12 lg:mt-0"
        >
          {/* Abstract HUD / Game Element */}
          <div className="relative w-full aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 border border-primary/30 rounded-full animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-4 border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                onClick={() => setShowGame(true)}
                className="w-64 h-64 bg-primary/5 backdrop-blur-md rounded-2xl border border-primary/20 flex items-center justify-center relative overflow-hidden group cursor-pointer hover:bg-primary/10 transition-colors"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Play className="w-16 h-16 text-primary fill-primary/20 group-hover:scale-110 transition-transform" />
                <div className="absolute bottom-8 text-xs font-mono uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Testar Demo
                </div>
                
                {/* Floating Stats */}
                <div className="absolute -right-12 -top-4 bg-black/80 backdrop-blur border border-white/10 p-3 rounded-lg shadow-xl">
                  <div className="text-xs text-muted-foreground uppercase">Engajamento</div>
                  <div className="text-xl font-bold text-primary">85%</div>
                </div>
                
                <div className="absolute -left-8 -bottom-4 bg-black/80 backdrop-blur border border-white/10 p-3 rounded-lg shadow-xl">
                  <div className="text-xs text-muted-foreground uppercase">Leads</div>
                  <div className="text-xl font-bold text-white">+3.5x</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground font-mono uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
          {showGame && <MiniGame onClose={() => setShowGame(false)} />}
    </section>
  );
}
