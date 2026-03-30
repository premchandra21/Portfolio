import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CLUSTERS = [
  {
    id: "backend",
    label: "Backend",
    sub: "APIs · databases · server logic",
    skills: [
      { label: "Node.js" },
      { label: "Express" },
      { label: "PostgreSQL" },
      { label: "MongoDB" },
      { label: "Redis" },
      { label: "Prisma" },
      { label: "REST APIs" },
      { label: "TypeScript", bridge: true },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    sub: "interfaces · motion · styling",
    skills: [
      { label: "React" },
      { label: "Next.js" },
      { label: "TypeScript", bridge: true },
      { label: "Tailwind CSS" },
      { label: "Framer Motion" },
      { label: "HTML / CSS" },
    ],
  },
  {
    id: "dataml",
    label: "Data + ML",
    sub: "pipelines · models · experiments",
    skills: [
      { label: "Python", bridge: true },
      { label: "pandas" },
      { label: "scikit-learn" },
      { label: "Langchain" },
      { label: "Jupyter" },
    ],
  },
];

const LANGUAGES = ["Python", "TypeScript", "Java"];

const SOFT_SKILLS = [
  "Problem Solving",
  "Systems Thinking",
  "Fast Learner",
  "Async Communication",
  "Attention to Detail",
];

// ─── Chip ─────────────────────────────────────────────────────────────────────

function Chip({ label, bridge = false, index, inView, clusterIndex }) {
  const [hov, setHov] = useState(false);
  const delay = clusterIndex * 0.18 + index * 0.045 + 0.3;

  return (
    <motion.span
      initial={{ opacity: 0, y: 10, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.94 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1], delay }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        boxShadow: hov
          ? bridge
            ? "0 0 0 1px rgba(247,162,79,0.5), 0 2px 12px rgba(247,162,79,0.15)"
            : "0 0 0 1px rgba(79,142,247,0.45), 0 2px 12px rgba(79,142,247,0.12)"
          : "none",
        transform: hov ? "translateY(-2px)" : "translateY(0px)",
        transition: "transform 0.18s ease, box-shadow 0.18s ease",
      }}
      className={`
        inline-flex items-center gap-1.5
        font-['JetBrains_Mono',monospace] text-[11px]
        px-[11px] py-[5px] rounded-md border
        cursor-default select-none
        ${bridge
          ? "text-[#F7A24F] bg-[#F7A24F]/[0.06] border-[#F7A24F]/25 hover:border-[#F7A24F]/60"
          : "text-[#0E0E12]/60 bg-[#0E0E12]/[0.04] border-[#0E0E12]/9 hover:border-[#4F8EF7]/50 hover:text-[#4F8EF7]"
        }
      `}
    >
      {bridge && (
        <span className="text-[8px] leading-none opacity-80">◆</span>
      )}
      {label}
    </motion.span>
  );
}

// ─── Cluster Card ─────────────────────────────────────────────────────────────

function ClusterCard({ cluster, index, inView }) {
  const cardDelay = index * 0.12 + 0.1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: cardDelay }}
      className="bg-white border border-[#0E0E12]/8 rounded-xl px-6 py-6 flex flex-col"
    >
      <div className="mb-4">
        <p className="font-['JetBrains_Mono',monospace] text-[10px] text-[#4F8EF7] tracking-[0.07em] uppercase mb-1">
          {cluster.label}
        </p>
        <p className="text-[12px] text-[#0E0E12]/35 leading-snug">
          {cluster.sub}
        </p>
      </div>

      <div className="flex flex-wrap gap-[7px]">
        {cluster.skills.map((skill, i) => (
          <Chip
            key={skill.label + i}
            label={skill.label}
            bridge={!!skill.bridge}
            index={i}
            clusterIndex={index}
            inView={inView}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Languages Bar ────────────────────────────────────────────────────────────

function LanguagesBar({ inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.72 }}
      className="bg-white border border-[#0E0E12]/8 rounded-xl px-6 py-4 flex items-center gap-4 flex-wrap"
    >
      <p className="font-['JetBrains_Mono',monospace] text-[10px] text-[#4F8EF7] tracking-[0.07em] uppercase shrink-0">
        Languages
      </p>
      <span className="w-px h-4 bg-[#0E0E12]/10 shrink-0" />
      <div className="flex flex-wrap gap-[7px]">
        {LANGUAGES.map((lang, i) => (
          <motion.span
            key={lang}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1], delay: 0.78 + i * 0.06 }}
            className="font-['JetBrains_Mono',monospace] text-[11px] text-[#0E0E12]/55
              px-[11px] py-[5px] rounded-md border border-[#0E0E12]/9 bg-[#0E0E12]/[0.03]
              cursor-default"
          >
            {lang}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Soft Skills Strip ────────────────────────────────────────────────────────

function SoftSkillsStrip({ inView }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6, delay: 0.95 }}
      className="mt-2 pt-6 border-t border-[#0E0E12]/[0.06]"
    >
      <p className="font-['JetBrains_Mono',monospace] text-[10px] text-[#0E0E12]/25 tracking-[0.07em] uppercase mb-3">
        Beyond the stack
      </p>
      <div className="flex flex-wrap gap-x-6 gap-y-2 items-center">
        {SOFT_SKILLS.map((s, i) => (
          <motion.span
            key={s}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 1.0 + i * 0.07 }}
            className="font-['JetBrains_Mono',monospace] text-[11px] text-[#0E0E12]/30"
          >
            {s}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Bridge Legend ────────────────────────────────────────────────────────────

function BridgeLegend({ inView }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.22 }}
      className="flex flex-wrap items-center gap-x-5 gap-y-1 mb-8"
    >
      <span className="font-['JetBrains_Mono',monospace] text-[10px] text-[#0E0E12]/28 flex items-center gap-1.5">
        <span className="text-[#F7A24F]/70 text-[9px]">◆</span>
        bridge node — spans multiple clusters
      </span>
      <span className="font-['JetBrains_Mono',monospace] text-[10px] text-[#0E0E12]/20">
        TypeScript bridges Frontend ↔ Backend · Python bridges Languages ↔ Data+ML
      </span>
    </motion.div>
  );
}

// ─── Fade-up variant ──────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay } },
});

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Skills() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="bg-[#F7F6F2] py-28 px-6 md:px-16" ref={ref}>
      <div className="max-w-5xl mx-auto">

        <motion.p
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="font-['JetBrains_Mono',monospace] text-[11px] text-[#4F8EF7] tracking-[0.06em] mb-4"
        >
          // 04 — skills
        </motion.p>

        <motion.h2
          variants={fadeUp(0.08)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-[clamp(2rem,4.5vw,2.5rem)] font-semibold text-[#0E0E12] leading-[1.08] tracking-[-0.025em] mb-10"
        >
          What I build with.
        </motion.h2>

        <BridgeLegend inView={inView} />

        {/* Three cluster cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
          {CLUSTERS.map((cluster, i) => (
            <ClusterCard
              key={cluster.id}
              cluster={cluster}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        {/* Languages bar */}
        <LanguagesBar inView={inView} />

        {/* Soft skills */}
        <SoftSkillsStrip inView={inView} />

      </div>
    </section>
  );
}