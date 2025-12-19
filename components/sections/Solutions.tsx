import { SOLUTIONS } from "@/data";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { motion } from "framer-motion";

export function Solutions() {
  return (
    <section id="solutions" className="py-20 md:py-32 relative">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container relative z-10">
        <SectionTitle 
          title="Inteligência Artificial" 
          subtitle="Não é apenas um jogo. É uma máquina de conversão otimizada por dados."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOLUTIONS.map((solution, index) => {
            const Icon = solution.icon;
            
            return (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-card/40 hover:bg-card/80 border border-white/5 hover:border-primary/30 p-8 rounded-xl transition-all duration-300 overflow-hidden"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/5 group-hover:border-primary/20">
                    <Icon size={24} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    {solution.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {solution.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
