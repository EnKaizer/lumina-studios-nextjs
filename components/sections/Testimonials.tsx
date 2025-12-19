import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
}

// Dados de exemplo - substituir por dados reais quando disponível
const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Maria Silva",
    role: "Gerente de Marketing",
    company: "Tech Solutions",
    content: "Os jogos da Lumina transformaram completamente nossa estratégia de captura de leads. Aumentamos o engajamento em 85% e triplicamos a conversão!",
    rating: 5,
  },
  {
    id: 2,
    name: "João Santos",
    role: "Diretor Comercial",
    company: "Varejo Premium",
    content: "Implementamos o quiz personalizado em nossa loja e os resultados foram impressionantes. O tempo de interação aumentou de 8s para 45s!",
    rating: 5,
  },
  {
    id: 3,
    name: "Ana Costa",
    role: "Coordenadora de Eventos",
    company: "Eventos & Cia",
    content: "A caça ao tesouro interativa foi um sucesso absoluto em nosso evento. Os participantes adoraram e capturamos 3.5x mais leads!",
    rating: 5,
  },
];

function TestimonialSkeleton() {
  return (
    <div className="bg-card rounded-2xl p-8 border border-border">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-muted animate-pulse" />
        <div className="flex-1 space-y-3">
          <div className="h-5 bg-muted rounded animate-pulse w-32" />
          <div className="h-4 bg-muted rounded animate-pulse w-48" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-muted rounded animate-pulse w-full" />
        <div className="h-4 bg-muted rounded animate-pulse w-full" />
        <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
      </div>
      <div className="flex gap-1 mt-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-5 h-5 bg-muted rounded animate-pulse" />
        ))}
      </div>
    </div>
  );
}

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "bg-card rounded-2xl p-8 border border-border",
        "hover:border-primary/50 transition-all duration-300",
        "hover:shadow-lg hover:shadow-primary/10"
      )}
    >
      {/* Quote Icon */}
      <div className="mb-6">
        <Quote className="w-10 h-10 text-primary/20" />
      </div>

      {/* Content */}
      <p className="text-foreground/80 text-lg leading-relaxed mb-6">
        "{testimonial.content}"
      </p>

      {/* Rating */}
      <div className="flex gap-1 mb-6">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-primary text-primary" />
        ))}
      </div>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className={cn(
          "w-16 h-16 rounded-full",
          "bg-gradient-to-br from-primary/20 to-primary/5",
          "flex items-center justify-center",
          "text-2xl font-bold text-primary"
        )}>
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
          <p className="text-sm text-muted-foreground">
            {testimonial.role} • {testimonial.company}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula carregamento de dados (remover quando integrar com API real)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="container relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            DEPOIMENTOS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            O Que Nossos Clientes
            <span className="block text-primary">Estão Dizendo</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Empresas que transformaram suas campanhas com nossos jogos interativos
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Skeleton loading state
            <>
              <TestimonialSkeleton />
              <TestimonialSkeleton />
              <TestimonialSkeleton />
            </>
          ) : (
            // Actual testimonials
            TESTIMONIALS.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
