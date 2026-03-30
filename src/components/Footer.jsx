export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#F7F6F2] border-t border-[#0E0E12]/8 px-6 md:px-16 py-8">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 flex-wrap">
        <p className="font-['JetBrains_Mono',monospace] text-[11px] text-[#0E0E12]/30 tracking-[0.04em]">
          //{" "}
          <span className="text-[#4F8EF7]">prem.dev</span>
          {" "}· built with React + Tailwind
        </p>
        <p className="font-['JetBrains_Mono',monospace] text-[10.5px] text-[#0E0E12]/28 tracking-[0.03em]">
          © {year} Prem Chandra Prasad
        </p>
      </div>
    </footer>
  );
}