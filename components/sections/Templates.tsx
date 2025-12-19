import { TEMPLATES } from "@/data";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { motion } from "framer-motion";
import { Clock, Target, PlayCircle } from "lucide-react";
import { LazyImage } from "@/components/LazyImage";
import { LazyVideo } from "@/components/LazyVideo";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { CyberButton } from "@/components/ui/CyberButton";

export function Templates() {
  return (
    <section id="templates" className="py-20 md:py-32 relative bg-black/50">
      <div className="container relative z-10">
        <SectionTitle 
          title="Exemplos de Campanha" 
          subtitle="Desenvolvemos jogos customizados sob medida para sua marca. Veja alguns exemplos do que podemos criar."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEMPLATES.map((template, index) => (
            <Dialog key={template.id}>
              <DialogTrigger asChild>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 border border-white/10 group-hover:border-primary/50 transition-colors">
                    {/* Media Background */}
                    {template.video.endsWith('.mp4') ? (
                      <LazyVideo
                        src={template.video}
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        className="absolute inset-0"
                      />
                    ) : (
                      <LazyImage
                        src={template.video} 
                        alt={template.name}
                        className="absolute inset-0"
                      />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm">
                      <div className="flex flex-col items-center gap-2">
                        <PlayCircle className="w-12 h-12 text-primary" />
                        <span className="text-white font-bold uppercase tracking-widest text-sm">Ver Detalhes</span>
                      </div>
                    </div>
                    
                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent z-10">
                      <h3 className="text-xl font-bold text-white">{template.name}</h3>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground px-1">
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-primary" />
                      <span>{template.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Target size={14} className="text-primary" />
                      <span>{template.objective}</span>
                    </div>
                  </div>
                </motion.div>
              </DialogTrigger>
              
              <DialogContent className="bg-card/95 backdrop-blur-xl border-white/10 text-white sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-display font-bold text-primary mb-2">{template.name}</DialogTitle>
                  <DialogDescription className="text-lg text-muted-foreground">
                    Jogo customizado otimizado para {template.objective.toLowerCase()}.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
                  <div className="aspect-video bg-black/50 rounded-lg border border-white/10 overflow-hidden">
                    {template.video.endsWith('.mp4') ? (
                      <LazyVideo
                        src={template.video}
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                      />
                    ) : (
                      <LazyImage
                        src={template.video} 
                        alt={template.name}
                      />
                    )}
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-white mb-2">Mecânica</h4>
                      <p className="text-sm text-muted-foreground">
                        {template.mechanics}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-white mb-2">KPIs Principais</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                        {template.kpis.map((kpi: string, idx: number) => (
                          <li key={idx}>{kpi}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <DialogClose asChild>
                      <CyberButton 
                        className="w-full"
                        onClick={() => {
                          setTimeout(() => {
                            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }, 300);
                        }}
                      >
                        Solicitar Customização
                      </CyberButton>
                    </DialogClose>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}
