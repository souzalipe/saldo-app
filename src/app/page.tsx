export default function Home() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-between px-6 py-12 max-w-md mx-auto">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-2xl bg-navy flex items-center justify-center mb-8">
          <span className="text-white text-4xl font-medium">S</span>
        </div>
        <h1 className="text-3xl font-medium mb-3 tracking-tight">Saldo</h1>
        <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
          Veja seu dinheiro entrar e sair com clareza. Nunca mais esqueça uma conta.
        </p>
      </div>

      <div className="w-full space-y-4">
        <button className="w-full bg-navy text-white py-4 rounded-xl font-medium text-sm hover:bg-navy-light transition-colors">
          Começar
        </button>
        <button className="w-full text-text-secondary py-2 text-sm">
          Já tenho conta
        </button>
      </div>
    </main>
  );
}