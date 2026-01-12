import { useState } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CyberButton } from "@/components/ui/CyberButton";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, CheckCircle, Mail, Clock } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
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
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to submit contact');
      }
      
      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success("Mensagem enviada com sucesso! Você receberá um email de confirmação.");
      reset();
      
      // Reset success state after 8 seconds
      setTimeout(() => setIsSuccess(false), 8000);
    } catch (error) {
      console.error("Failed to submit contact:", error);
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
              className="flex flex-col items-center justify-center py-16 text-center relative"
            >
              {/* Animated background glow */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1.5, opacity: 0.3 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-primary/20 to-green-500/20 blur-3xl"
              />
              
              {/* Success icon with animation */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                className="relative z-10 w-32 h-32 bg-gradient-to-br from-green-500/30 to-green-600/30 rounded-full flex items-center justify-center mb-8 border-4 border-green-500/50 shadow-2xl shadow-green-500/50"
              >
                <CheckCircle className="w-16 h-16 text-green-500" strokeWidth={2.5} />
              </motion.div>
              
              {/* Success message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative z-10"
              >
                <h3 className="text-4xl font-bold text-white mb-4">Mensagem Enviada!</h3>
                <p className="text-muted-foreground text-lg max-w-md mb-8">
                  Você receberá um <strong className="text-primary">email de confirmação</strong> em instantes.
                  <br />
                  Nossa equipe retornará em <strong className="text-primary">24 a 48 horas</strong>.
                </p>
              </motion.div>

              {/* Info cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg relative z-10"
              >
                <div className="bg-black/40 border border-primary/20 rounded-lg p-4 flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div className="text-left">
                    <h4 className="font-semibold text-white text-sm mb-1">Email de Confirmação</h4>
                    <p className="text-xs text-muted-foreground">Verifique sua caixa de entrada</p>
                  </div>
                </div>
                <div className="bg-black/40 border border-primary/20 rounded-lg p-4 flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div className="text-left">
                    <h4 className="font-semibold text-white text-sm mb-1">Em Análise</h4>
                    <p className="text-xs text-muted-foreground">Resposta em até 48h</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="relative z-10 mt-8"
              >
                <CyberButton 
                  variant="outline" 
                  onClick={() => setIsSuccess(false)}
                >
                  ENVIAR OUTRA MENSAGEM
                </CyberButton>
              </motion.div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Nome *</label>
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
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">E-mail *</label>
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="seu@email.com"
                  />
                  {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">WhatsApp</label>
                  <input
                    {...register("phone")}
                    type="tel"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Mensagem *</label>
                <textarea
                  {...register("message")}
                  rows={4}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                  placeholder="Conte mais sobre seu projeto..."
                />
                {errors.message && <span className="text-xs text-red-500">{errors.message.message}</span>}
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
                    ENVIANDO...
                  </>
                ) : (
                  "SOLICITAR PROPOSTA"
                )}
              </CyberButton>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
