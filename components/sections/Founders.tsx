import { Linkedin } from "lucide-react";
import { LazyImage } from "@/components/LazyImage";

export function Founders() {
  const founders = [
    {
      name: "Caíque Gonçalves",
      role: "Co-Founder & CTO",
      image: "/founder-caique.a8f3d2e1.webp",
      linkedin: "https://www.linkedin.com/in/carbonegoncalves/",
      bio: "Gameplay Programmer and Software Architect. Especialista em Unity, React Native e arquitetura de sistemas."
    },
    {
      name: "Fagner de Gois",
      role: "Co-Founder & CTO",
      image: "/founder-fagner.b64a2827.png",
      linkedin: "https://www.linkedin.com/in/fagner-de-gois-222781b1/",
      bio: "Salesforce Engineer. Especialista em integrações complexas, DevOps e arquitetura Salesforce escalável."
    }
  ];

  return (
    <section id="fundadores" className="relative py-24 bg-gradient-to-b from-background via-background/95 to-background">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full mb-4">
            <span className="text-primary text-sm font-semibold tracking-wide uppercase">
              Quem Somos
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
            Fundadores
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conheça os visionários por trás da Lumina Studios, unindo tecnologia e estratégia para revolucionar o marketing interativo.
          </p>
        </div>

        {/* Founders grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {founders.map((founder, index) => (
            <div
              key={index}
              className="group relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
            >
              {/* Card glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                {/* Avatar */}
                <div className="mb-6 flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
                    <LazyImage
                      src={founder.image}
                      alt={founder.name}
                      className="relative w-32 h-32 rounded-full object-cover border-4 border-primary/20 group-hover:border-primary/40 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {founder.name}
                  </h3>
                  <p className="text-primary font-semibold mb-4">
                    {founder.role}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {founder.bio}
                  </p>
                </div>

                {/* LinkedIn button */}
                <div className="flex justify-center">
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/40 rounded-lg text-primary font-semibold transition-all duration-300 group/btn"
                  >
                    <Linkedin className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                    <span>Ver LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
