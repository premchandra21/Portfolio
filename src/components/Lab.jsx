import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  },
});

function BlinkingCursor() {
  return (
    <motion.div
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{ duration: 1.1, repeat: Infinity, ease: "linear", times: [0, 0.49, 0.5, 1] }}
      className="w-[2px] h-7 bg-[#4F8EF7] rounded-sm mb-6"
    />
  );
}

export default function Lab() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="lab" className="bg-[#F7F6F2] py-28 px-6 md:px-16" ref={ref}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between gap-6 flex-wrap mb-12">
          <div>
            <motion.p
              variants={fadeUp(0)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="font-['JetBrains_Mono',monospace] text-[11px] text-[#4F8EF7] tracking-[0.06em] mb-4"
            >
              // 05 — lab
            </motion.p>
            <motion.h2
              variants={fadeUp(0.1)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="text-[clamp(2rem,4.5vw,2.5rem)] font-semibold text-[#0E0E12] leading-[1.08] tracking-[-0.025em]"
            >
              Things I'm<br />cooking up.
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp(0.2)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="font-['JetBrains_Mono',monospace] text-[12px] text-[#0E0E12]/30 text-right leading-[1.65]"
          >
            // growing section<br />check back soon
          </motion.p>
        </div>

        {/* Card */}
        <motion.div
          variants={fadeUp(0.25)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="
            relative border border-dashed border-[#0E0E12]/15
            rounded-2xl px-10 py-14
            flex flex-col items-center text-center
            overflow-hidden
          "
        >
          {/* Corner labels */}
          <span className="
            absolute top-3.5 left-4
            font-['JetBrains_Mono',monospace] text-[9.5px]
            text-[#0E0E12]/20 tracking-[0.05em]
          ">
            experiment_01.js
          </span>
          <span className="
            absolute bottom-3.5 right-4
            font-['JetBrains_Mono',monospace] text-[9.5px]
            text-[#0E0E12]/20 tracking-[0.05em]
          ">
            status: building
          </span>

          <BlinkingCursor />

          <h3 className="text-[20px] font-semibold text-[#0E0E12] tracking-[-0.015em] mb-2.5">
            Something's brewing here.
          </h3>
          <p className="text-[14px] text-[#0E0E12]/45 leading-[1.72] max-w-[400px] mb-7">
            This section will host live GenAI experiments — things you can actually
            interact with, not just read about. First one's in progress. Come back
            when the cursor stops blinking.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 justify-center">
            {["GenAI", "interactive", "shipping soon"].map((tag) => (
              <span
                key={tag}
                className="
                  font-['JetBrains_Mono',monospace] text-[10px]
                  text-[#0E0E12]/38 bg-[#0E0E12]/[0.04]
                  border border-[#0E0E12]/8
                  rounded-md px-2.5 py-1
                "
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}