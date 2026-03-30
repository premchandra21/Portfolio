import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  },
});

export default function Projects() {
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="bg-[#0E0E16] py-28 px-6 md:px-16" ref={ref}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between gap-6 flex-wrap mb-14">
          <div>
            <motion.p
              variants={fadeUp(0)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="font-['JetBrains_Mono',monospace] text-[11px] text-[#4F8EF7] tracking-[0.06em] mb-4"
            >
              // 03 — projects ★
            </motion.p>
            <motion.h2
              variants={fadeUp(0.1)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="text-[clamp(2rem,4.5vw,2.5rem)] font-semibold text-white leading-[1.08] tracking-[-0.025em]"
            >
              What I've built<br />and how it works.
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp(0.2)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-[13px] text-white/28 max-w-[220px] leading-[1.65] text-right"
          >
            Each project has two layers — a summary for context, a diagram for depth.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              variants={fadeUp(0.15 + i * 0.1)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}