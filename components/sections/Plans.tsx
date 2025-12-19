import { PLANS } from "@/data";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CyberButton } from "@/components/ui/CyberButton";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function Plans() {
  return (
    <section id="plans" className="py-20 md:py-32 relative">
      <div className="container relative z-10">
        <SectionTitle 
          title="Planos Flexíveis" 
          subtitle="Do piloto rápido à operação contínua. Escolha o modelo ideal para sua marca."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PLANS.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "relative p-8 rounded-2xl border flex flex-col h-full transition-all duration-300",
                plan.highlight 
                  ? "bg-card/80 border-primary/50 shadow-[0_0_30px_rgba(255,106,0,0.1)] scale-105 z-10" 
                  : "bg-card/40 border-white/10 hover:border-white/20"
              )}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-black text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                  Mais Popular
                </div>
              )}

              <div className="mb-8">
                <div className="text-sm text-primary font-mono uppercase tracking-wider mb-2">{plan.type}</div>
                <h3 className="text-3xl font-display font-bold text-white mb-4">{plan.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed min-h-[60px]">
                  {plan.description}
                </p>
              </div>

              <div className="flex-grow mb-8">
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-white/80">
                      <Check className="w-5 h-5 text-primary shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto">
                <div className="text-center mb-6">
                  <span className="text-sm text-muted-foreground">Preço sob consulta</span>
                </div>
                <CyberButton 
                  variant={plan.highlight ? "primary" : "outline"} 
                  className="w-full"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  {plan.cta}
                </CyberButton>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
