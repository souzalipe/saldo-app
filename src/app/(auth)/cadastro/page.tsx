import Link from "next/link";

export default function CadastroPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-1">Criar conta</h1>
        <p className="text-foreground/60 mb-8">Comece a controlar suas finanças</p>
        <p className="text-center text-sm text-foreground/50">
          Já tem conta?{" "}
          <Link href="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
