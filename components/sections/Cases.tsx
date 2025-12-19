import { CASES } from "@/data";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { motion } from "framer-motion";

export function Cases() {
  return (
    <section className="py-20 md:py-32 relative bg-black/50">
      <div className="container relative z-10">
        <SectionTitle 
          title="Cases de Sucesso" 
          subtitle="Resultados reais em diversos setores."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CASES.map((item, index) => (
            <motion.div
              key={item.client}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel p-8 rounded-xl border-l-4 border-l-primary"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{item.client}</h3>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">{item.sector}</span>
                </div>
                <div className="bg-primary/10 px-3 py-1 rounded text-primary font-bold text-sm">
                  {item.result}
                </div>
              </div>
              
              <p className="text-white/80 text-sm leading-relaxed">
                {item.description}
              </p>
              
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-muted-foreground">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                Case Verificado
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
