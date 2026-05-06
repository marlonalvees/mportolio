export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/10 py-8 px-6 text-center">
      <p className="text-sm text-zinc-500">
        Desenvolvido por{" "}
        <span className="text-violet-400 font-medium">Marlon</span> ·{" "}
        {new Date().getFullYear()}
      </p>
    </footer>
  );
}
