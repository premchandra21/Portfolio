import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectDiagram from "./ProjectDiagram";

const BADGE_STYLES = {
  backend:   "bg-[#4F8EF7]/10 text-[#4F8EF7]",
  ml:        "bg-teal-500/10 text-teal-400",
  fullstack: "bg-purple-500/10 text-purple-400",
};

const STATUS_STYLES = {
  live:         { dot: "bg-green-500 shadow-[0_0_0_2px_rgba(34,197,94,0.18)]", label: "live" },
  experimental: { dot: "bg-orange-400 shadow-[0_0_0_2px_rgba(249,115,22,0.18)]", label: "experimental" },
  archived:     { dot: "bg-[#ffffff]/20", label: "archived" },
};

// Inline SVG icon for the diagram hint
function GraphIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2.5" cy="7"   r="1.7" stroke="#4F8EF7" strokeWidth="1.2" />
      <circle cx="7"   cy="2.5" r="1.7" stroke="#4F8EF7" strokeWidth="1.2" />
      <circle cx="11.5" cy="7"  r="1.7" stroke="#4F8EF7" strokeWidth="1.2" />
      <line x1="4.1" y1="6.2" x2="5.4" y2="4.1" stroke="#4F8EF7" strokeWidth="1" opacity=".5" />
      <line x1="8.6" y1="3.8" x2="9.9" y2="5.9" stroke="#4F8EF7" strokeWidth="1" opacity=".5" />
    </svg>
  );
}

export default function ProjectCard({ project }) {
  const [open, setOpen]   = useState(false);
  const [view, setView]   = useState("simple"); // "simple" | "technical"
  const panelRef          = useRef(null);

  const status = STATUS_STYLES[project.status] ?? STATUS_STYLES.archived;

  return (
    <div className="
      bg-[#13131E] border border-white/[0.07] rounded-xl overflow-hidden
      transition-colors duration-200 hover:border-[#4F8EF7]/20
    ">
      {/* ── Card body ── */}
      <div className="p-7 pb-0">

        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-[17px] font-semibold text-white tracking-[-0.01em]">
              {project.title}
            </span>
            <span className={`
              font-['JetBrains_Mono',monospace] text-[9px] px-2 py-1 rounded-[5px] tracking-[0.04em] font-medium
              ${BADGE_STYLES[project.badge] ?? BADGE_STYLES.backend}
            `}>
              {project.badge}
            </span>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0 pt-0.5">
            <div className={`w-[7px] h-[7px] rounded-full ${status.dot}`} />
            <span className="font-['JetBrains_Mono',monospace] text-[9.5px] text-white/25 tracking-[0.04em]">
              {status.label}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-[14px] text-white/42 leading-[1.72] mb-4">
          {project.description}
        </p>

        {/* Impact sentence */}
        <div className="border-l-2 border-[#F0A500] pl-3.5 mb-5">
          <p className="text-[13px] text-[#F0A500]/80 leading-[1.65] italic">
            {project.impact}
          </p>
        </div>

        {/* Stack pills */}
        <div className="flex flex-wrap gap-1.5 pb-6">
          {project.stack.map((s) => (
            <span
              key={s}
              className="
                font-['JetBrains_Mono',monospace] text-[10px]
                text-white/32 bg-white/[0.05] border border-white/[0.07]
                rounded-[5px] px-2 py-[3px]
              "
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* ── Diagram hint bar ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="
          w-full mx-0 px-7 py-3
          flex items-center justify-between gap-3
          border-t border-dashed border-[#4F8EF7]/18
          hover:bg-[#4F8EF7]/[0.04] hover:border-[#4F8EF7]/40
          transition-colors duration-150
          text-left
        "
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-[#4F8EF7]/10 flex items-center justify-center flex-shrink-0">
            <GraphIcon />
          </div>
          <span className="text-[12.5px] text-white/38">
            <span className="text-white/65 font-medium">Interactive diagram</span>
            {" "}— see how {project.title.toLowerCase()} connects
          </span>
        </div>
        <span className="font-['JetBrains_Mono',monospace] text-[10.5px] text-[#4F8EF7] flex-shrink-0">
          {open ? "Close ✕" : "View architecture →"}
        </span>
      </button>

      {/* ── Diagram panel ── */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
            ref={panelRef}
          >
            <div className="mx-7 mb-7 border border-white/[0.06] rounded-lg bg-black/25 overflow-hidden">

              {/* Toolbar */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.05]">
                <div className="flex bg-white/[0.05] rounded-md p-[2px] gap-[2px]">
                  {["simple", "technical"].map((v) => (
                    <button
                      key={v}
                      onClick={() => setView(v)}
                      className={`
                        font-['JetBrains_Mono',monospace] text-[10px] px-3 py-1 rounded-[4px]
                        tracking-[0.03em] transition-colors duration-15
                        ${view === v
                          ? "bg-[#4F8EF7] text-white"
                          : "text-white/32 hover:text-white/55"
                        }
                      `}
                    >
                      {v.charAt(0).toUpperCase() + v.slice(1)}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="font-['JetBrains_Mono',monospace] text-[10px] text-white/22 hover:text-white/50 transition-colors"
                >
                  close ✕
                </button>
              </div>

              {/* Diagram canvas — React Flow goes here */}
              <div className="h-[220px]">
                <ProjectDiagram
                  nodes={project.diagram[view].nodes}
                  edges={project.diagram[view].edges}
                />
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}