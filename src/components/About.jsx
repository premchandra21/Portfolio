import { useRef } from "react";
import profile from "../assets/profile.jpg"
import { motion, useInView } from "framer-motion";

const FACTS = [
  { label: "status", value: "Undergrad — blink and it's gone" },
  { label: "focus", value: "Backend + genAI" },
  { label: "next interest", value: "Distributed systems" },
  { label: "building toward", value: "Something of my own" },
];

const INTERESTS = [
  "distributed systems",
  "GenAI infra",
  "system design",
  "ML pipelines",
  "backend architecture",
];

const BIO = [
  <>
    I'm a CS undergrad drawn to problems that don't have obvious answers. What keeps me going is{" "}
    <em className="not-italic text-[#0E0E12] font-medium">
      the clarity when everything finally clicks
    </em>{" "}
    — that moment when a system you've been wrestling with suddenly makes sense. I chase that feeling deliberately.
  </>,
  <>
    I care about doing things right, not just doing them. That means thinking end-to-end — from architecture to deployment — and not cutting corners at the seams where most bugs live. My edge is simple:{" "}
    <em className="not-italic text-[#0E0E12] font-medium">
      I ship things that actually work.
    </em>
  </>,
  <>
    I don't have a five-year plan and I'm not pretending I do. What I have is a direction — toward harder problems, toward building things people depend on, and eventually toward something of my own. I'm figuring it out by building.
  </>,
];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  },
});

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="bg-[#F7F6F2] py-28 px-6 md:px-16" ref={ref}>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-16 md:gap-20 items-start">

        {/* Left — text */}
        <div>
          <motion.p
            variants={fadeUp(0)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="font-['JetBrains_Mono',monospace] text-[11px] text-[#4F8EF7] tracking-[0.06em] mb-5"
          >
            // 02 — about
          </motion.p>

          <motion.h2
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-[clamp(2rem,4.5vw,2.5rem)] font-semibold text-[#0E0E12] leading-[1.08] tracking-[-0.025em] mb-7"
          >
            How I think,<br />not just what I build.
          </motion.h2>

          <div className="flex flex-col gap-[18px]">
            {BIO.map((para, i) => (
              <motion.p
                key={i}
                variants={fadeUp(0.2 + i * 0.1)}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="text-[15px] text-[#0E0E12]/60 leading-[1.78]"
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Interest tags */}
          <motion.div
            variants={fadeUp(0.55)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-wrap gap-2 mt-8"
          >
            {INTERESTS.map((tag) => (
              <span
                key={tag}
                className="
                  font-['JetBrains_Mono',monospace] text-[10.5px]
                  text-[#0E0E12]/48 bg-[#0E0E12]/[0.045]
                  border border-[#0E0E12]/8
                  rounded-md px-2.5 py-1
                "
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right — photo + fact cards */}
        <motion.div
          variants={fadeUp(0.15)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col gap-3.5 pt-1"
        >
          {/* Photo placeholder */}
          <div
            className="
              w-full aspect-[3/4] max-h-[300px]
              bg-[#0E0E12]/[0.04] border border-[#0E0E12]/8
              rounded-xl flex flex-col items-center justify-center gap-2.5
            "
          >
            {/* Swap this div for an <img> once you have a photo */}
            {/* <img src={yourPhoto} alt="Prem" className="w-full h-full object-cover rounded-xl" /> */}
            <div className="w-10 h-10 rounded-full bg-[#0E0E12]/10" />
            <img src={profile} alt="Prem" className="w-full h-full object-cover rounded-xl" />
          </div>

          {/* Fact grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {FACTS.map(({ label, value }) => (
              <div
                key={label}
                className="
                  bg-white border border-[#0E0E12]/8
                  rounded-lg px-3.5 py-3
                  flex flex-col gap-1
                "
              >
                <span className="font-['JetBrains_Mono',monospace] text-[9px] text-[#0E0E12]/32 tracking-[0.06em] uppercase">
                  {label}
                </span>
                <span className="text-[12.5px] font-medium text-[#0E0E12] leading-snug">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}