import { useState } from "react";
import { METRICS } from "@/data";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Sector = "events" | "retail" | "real_estate";

export function BigNumbers() {
  const [activeSector, setActiveSector] = useState<Sector>("events");

  const sectors = [
    { id: "events", label: "Eventos" },
    { id: "retail", label: "Varejo" },
    { id: "real_estate", label: "Imobiliárias" },
  ];

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="container relative z-10">
        <SectionTitle 
          title="Impacto Real" 
          subtitle="Resultados que vão além do hype. Métricas concretas para cada setor."
        />

        {/* Sector Toggle */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex bg-white/5 p-1 rounded-lg border border-white/10 backdrop-blur-sm">
            {sectors.map((sector) => (
              <button
                key={sector.id}
                onClick={() => setActiveSector(sector.id as Sector)}
                className={cn(
                  "px-6 py-2 rounded-md text-sm font-medium transition-all duration-300",
                  activeSector === sector.id 
                    ? "bg-primary text-black shadow-lg" 
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                )}
              >
                {sector.label}
              </button>
            ))}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="wait">
            {METRICS[activeSector].map((metric, index) => (
              <motion.div
                key={`${activeSector}-${metric.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="glass-panel p-8 rounded-xl relative group hover:border-primary/50 transition-colors"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <div className="w-16 h-16 bg-primary blur-2xl rounded-full" />
                </div>
                
                <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {metric.value}
                </div>
                <div className="text-lg font-medium text-white/80 mb-4">
                  {metric.label}
                </div>
                <div className="text-sm text-muted-foreground border-t border-white/10 pt-4">
                  {metric.note}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        <p className="text-center text-xs text-muted-foreground mt-8 opacity-50">
          * Valores estimados baseados em médias de mercado e benchmarks internos. Resultados podem variar.
        </p>
      </div>
    </section>
  );
}
