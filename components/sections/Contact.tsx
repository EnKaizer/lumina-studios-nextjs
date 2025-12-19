import { useState } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CyberButton } from "@/components/ui/CyberButton";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";
// Removed tRPC import

const formSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  company: z.string().min(2, "Empresa é obrigatória"),
  contact: z.string().min(5, "Email ou WhatsApp inválido"),
  type: z.string().min(1, "Selecione um tipo"),
  objective: z.string().min(1, "Selecione um objetivo"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Submit lead to backend via REST API
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.contact,
          source: "contact_form",
        }),
      });
      
      if (!response.ok) throw new Error('Failed to submit lead');
      
      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success("Mensagem enviada com sucesso!");
      reset();
      
      // Reset success state after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Failed to submit lead:", error);
      setIsSubmitting(false);
      toast.error("Erro ao enviar mensagem. Tente novamente.");
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 relative">
      <div className="container relative z-10 max-w-4xl">
        <SectionTitle 
          title="Vamos Conversar?" 
          subtitle="Descubra como a Lumina pode transformar seus resultados."
        />

        <div className="glass-panel p-8 md:p-12 rounded-2xl border border-white/10 relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] pointer-events-none" />
          
          {isSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Mensagem Recebida!</h3>
              <p className="text-muted-foreground max-w-md">
                Nossa equipe analisará seu perfil e entrará em contato em breve com uma proposta personalizada.
              </p>
              <CyberButton 
                variant="outline" 
                className="mt-8"
                onClick={() => setIsSuccess(false)}
              >
                Enviar outra mensagem
              </CyberButton>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Nome</label>
                  <input
                    {...register("name")}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="Seu nome completo"
                  />
                  {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Empresa</label>
                  <input
                    {...register("company")}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="Nome da sua empresa"
                  />
                  {errors.company && <span className="text-xs text-red-500">{errors.company.message}</span>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">WhatsApp ou E-mail</label>
                <input
                  {...register("contact")}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="Como podemos te contatar?"
                />
                {errors.contact && <span className="text-xs text-red-500">{errors.contact.message}</span>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Tipo de Negócio</label>
                  <select
                    {...register("type")}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
                  >
                    <option value="">Selecione...</option>
                    <option value="Evento">Evento</option>
                    <option value="Varejo">Varejo</option>
                    <option value="Imobiliária">Imobiliária</option>
                    <option value="Outro">Outro</option>
                  </select>
                  {errors.type && <span className="text-xs text-red-500">{errors.type.message}</span>}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Objetivo Principal</label>
                  <select
                    {...register("objective")}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
                  >
                    <option value="">Selecione...</option>
                    <option value="Leads">Captura de Leads</option>
                    <option value="Vendas">Aumento de Vendas</option>
                    <option value="Fluxo">Fluxo em Loja/Stand</option>
                    <option value="Branding">Branding / Awareness</option>
                  </select>
                  {errors.objective && <span className="text-xs text-red-500">{errors.objective.message}</span>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Mensagem (Opcional)</label>
                <textarea
                  {...register("message")}
                  rows={4}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                  placeholder="Conte mais sobre seu projeto..."
                />
              </div>

              <CyberButton 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Solicitar Proposta"
                )}
              </CyberButton>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
