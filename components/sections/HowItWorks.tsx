import { LEVELS } from "@/data";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { motion } from "framer-motion";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-32 relative bg-black/50">
      <div className="container relative z-10">
        <SectionTitle 
          title="Sua Jornada" 
          subtitle="Gamificamos o funil de vendas em 4 níveis estratégicos."
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Connecting Line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-white/5 -translate-x-1/2 hidden md:block" />
          <div className="absolute left-[28px] top-0 bottom-0 w-1 bg-white/5 -translate-x-1/2 md:hidden" />

          <div className="space-y-12 md:space-y-24">
            {LEVELS.map((level, index) => {
              const isEven = index % 2 === 0;
              const Icon = level.icon;

              return (
                <motion.div
                  key={level.level}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Level Marker */}
                  <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10 shadow-[0_0_20px_rgba(255,106,0,0.3)]">
                    <span className="font-display font-bold text-xl text-primary">
                      {level.level}
                    </span>
                  </div>

                  {/* Content Card */}
                  <div className={`ml-20 md:ml-0 w-full md:w-[calc(50%-40px)] glass-panel p-8 rounded-xl border-l-4 ${
                    isEven ? "border-l-primary md:border-l-white/10 md:border-r-4 md:border-r-primary" : "border-l-primary"
                  }`}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-white/5 rounded-lg text-primary">
                        <Icon size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-white">{level.title}</h3>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      {level.description}
                    </p>
                    <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary/80 border border-primary/20 px-3 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                      {level.action}
                    </div>
                  </div>
                  
                  {/* Empty space for the other side */}
                  <div className="hidden md:block w-[calc(50%-40px)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
