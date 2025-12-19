import { NAV_LINKS } from "@/data";
import { Instagram } from "lucide-react";
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-12 md:py-20 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <a href="#" className="text-2xl font-display font-bold tracking-tighter flex items-center gap-3 mb-6">
              <img 
                src="/lumina-icon-pure.f1a2b3c4.png" 
                alt="Lumina Studios" 
                className="h-10 w-auto object-contain"
              />
              <span className="text-primary font-display font-bold text-xl tracking-wider">
                LUMINA STUDIOS
              </span>
            </a>
            <p className="text-muted-foreground max-w-md text-lg">
              Transformamos atenção em ação através de advergames inteligentes e experiências imersivas potencializadas por IA.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Navegação</h4>
            <ul className="space-y-4">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Social</h4>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/lumina.studios.io/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all"
                aria-label="Instagram da Lumina Studios"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Lumina Studios. Todos os direitos reservados.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacidade
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Termos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
