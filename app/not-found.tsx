import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505]">
      <div className="text-center">
        <h1 className="text-9xl font-display font-bold text-lumina-orange mb-4">404</h1>
        <h2 className="text-3xl font-display font-bold text-white mb-4">Página não encontrada</h2>
        <p className="text-gray-400 mb-8">A página que você procura não existe.</p>
        <Link 
          href="/" 
          className="inline-block px-8 py-3 bg-lumina-orange text-black font-bold rounded-lg hover:bg-lumina-orange/90 transition-colors"
        >
          Voltar para Home
        </Link>
      </div>
    </div>
  );
}
