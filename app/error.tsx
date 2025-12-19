'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505]">
      <div className="text-center">
        <h1 className="text-6xl font-display font-bold text-lumina-orange mb-4">Erro</h1>
        <h2 className="text-2xl font-display font-bold text-white mb-4">Algo deu errado!</h2>
        <p className="text-gray-400 mb-8">{error.message}</p>
        <button
          onClick={reset}
          className="inline-block px-8 py-3 bg-lumina-orange text-black font-bold rounded-lg hover:bg-lumina-orange/90 transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}
