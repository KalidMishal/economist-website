export default function SectionDivider({ title, color = "black" }: { title: string, color?: "black" | "red" }) {
  const isRed = color === "red";
  return (
    <div className="w-full mb-6">
      <div className={`h-1.5 w-full ${isRed ? 'bg-[var(--color-economist-red)]' : 'bg-black'} mb-2`} />
      <h2 className="text-2xl font-serif font-bold text-black uppercase tracking-wide">
        {title}
      </h2>
    </div>
  );
}
