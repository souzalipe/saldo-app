import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-1">Entrar</h1>
        <p className="text-foreground/60 mb-8">Acesse sua conta</p>
        <p className="text-center text-sm text-foreground/50">
          Não tem conta?{" "}
          <Link href="/cadastro" className="text-blue-600 dark:text-blue-400 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
