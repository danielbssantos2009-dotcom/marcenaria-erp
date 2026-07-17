export default function Loading() {
  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-300">
      <div className="w-10 h-10 border-4 border-zinc-200 border-t-[var(--color-brand-red)] rounded-full animate-spin"></div>
      <div className="text-zinc-500 font-medium text-sm tracking-widest uppercase">Carregando dados...</div>
    </div>
  )
}
