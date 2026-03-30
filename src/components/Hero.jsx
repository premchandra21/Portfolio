import { useEffect, useRef } from "react";
import { motion, animate, useMotionValue } from "framer-motion";

// ── Node graph ────────────────────────────────────────────────────────────────
const NODES = [
  { label: "Nest Js",    bx: 0.62, by: 0.30, r: 38 },
  { label: "PostgreSQL", bx: 0.80, by: 0.54, r: 38 },
  { label: "React",      bx: 0.56, by: 0.64, r: 34 },
  { label: "XGBoost",    bx: 0.74, by: 0.20, r: 32 },
  { label: "Node.js",    bx: 0.90, by: 0.36, r: 32 },
  { label: "Langchain",  bx: 0.83, by: 0.70, r: 34 },
];

const EDGES = [[0,1],[0,2],[0,4],[1,2],[1,5],[2,5],[3,0],[4,1]];

const FLOAT = [
  { ax: 14, ay:  9, sx: 0.52, sy: 0.41, ph: 0.0 },
  { ax: 10, ay: 13, sx: 0.38, sy: 0.55, ph: 1.1 },
  { ax: 15, ay: 10, sx: 0.45, sy: 0.48, ph: 2.2 },
  { ax:  9, ay: 12, sx: 0.60, sy: 0.35, ph: 3.3 },
  { ax: 12, ay:  8, sx: 0.42, sy: 0.62, ph: 4.4 },
  { ax: 11, ay: 14, sx: 0.50, sy: 0.44, ph: 5.5 },
];

function NodeGraph({ mouseRef }) {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const tRef      = useRef(0);
  const lastTsRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    let W = 0, H = 0;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      W = canvas.width  = rect.width;
      H = canvas.height = rect.height;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    resize();

    function nodePos(n, f, t) {
      const fx = Math.sin(t * f.sx + f.ph) * f.ax;
      const fy = Math.cos(t * f.sy + f.ph * 1.3) * f.ay;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const px = (mx / W - 0.5) * 16 * (n.bx - 0.5);
      const py = (my / H - 0.5) * 10 * (n.by - 0.5);
      return { x: n.bx * W + fx + px, y: n.by * H + fy + py };
    }

    function draw(ts) {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const delta = Math.min((ts - lastTsRef.current) / 1000, 0.05);
      lastTsRef.current = ts;
      tRef.current += delta;
      const t = tRef.current;

      ctx.clearRect(0, 0, W, H);
      const pos = NODES.map((n, i) => nodePos(n, FLOAT[i], t));

      // Edges
      EDGES.forEach(([a, b]) => {
        const pa = pos[a], pb = pos[b];
        const g = ctx.createLinearGradient(pa.x, pa.y, pb.x, pb.y);
        g.addColorStop(0, "rgba(79,142,247,0.16)");
        g.addColorStop(1, "rgba(79,142,247,0.05)");
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.strokeStyle = g;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Travelling dots
      EDGES.forEach(([a, b], ei) => {
        const pa = pos[a], pb = pos[b];
        const prog = (t * 0.38 + ei * 0.37) % 1;
        ctx.beginPath();
        ctx.arc(
          pa.x + (pb.x - pa.x) * prog,
          pa.y + (pb.y - pa.y) * prog,
          2, 0, Math.PI * 2
        );
        ctx.fillStyle = "rgba(79,142,247,0.5)";
        ctx.fill();
      });

      // Nodes
      NODES.forEach((n, i) => {
        const p = pos[i];
        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, n.r + 7, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(79,142,247,0.035)";
        ctx.fill();
        // Circle
        ctx.beginPath();
        ctx.arc(p.x, p.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.strokeStyle = "rgba(79,142,247,0.2)";
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();
        // Label
        ctx.font = "500 11px 'JetBrains Mono', monospace";
        ctx.fillStyle = "rgba(14,14,18,0.62)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(n.label, p.x, p.y);
      });

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

// ── Variants ──────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

// ── Hero ──────────────────────────────────────────────────────────────────────
export default function Hero() {
  const mouseRef   = useRef({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (rect) mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-[#F7F6F2] flex items-center justify-center overflow-hidden"
    >
      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] stroke-[#4F8EF7]"
        style={{
          backgroundImage: `linear-gradient(#4F8EF7 1px, transparent 1px), linear-gradient(90deg, #4F8EF7 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Node graph — masked to right half */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          maskImage: "linear-gradient(to right, transparent 28%, black 52%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 28%, black 52%)",
        }}
      >
        <NodeGraph mouseRef={mouseRef} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-16 flex flex-col items-start">

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="font-mono text-[11px] text-[#4F8EF7] tracking-[0.2em] uppercase mb-6"
        >
          // Systems · Architecture · Human Impact
        </motion.p>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="text-[clamp(2.5rem,8vw,4.5rem)] font-semibold text-[#0E0E12] leading-[1.05] tracking-tight mb-8"
        >
          Prem Chandra <br />
          <span className="text-[#0E0E12]/40">Prasad.</span>
        </motion.h1>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
          className="max-w-[540px] mb-12"
        >
          <p className="text-[17px] text-[#0E0E12]/70 leading-relaxed">
            Engineering is progress — built step by step, not just with code, but with care.
            I navigate the space between{" "}
            <span className="text-[#0E0E12] font-medium">creativity and execution</span>,
            where small ideas grow into reliable systems.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="flex flex-wrap items-center gap-4"
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3 bg-[#0E0E12] text-[#F7F6F2] rounded-lg text-[14px] font-medium hover:bg-[#1c1c24] transition-all"
          >
            Explore Systems
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border border-[#0E0E12]/15 text-[#0E0E12]/60 rounded-lg text-[14px] font-medium hover:border-[#4F8EF7] hover:text-[#4F8EF7] transition-all"
          >
            View Journey ↗
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] text-[#0E0E12]/30 uppercase tracking-[0.2em]">
          Scroll
        </span>
        <motion.div
          animate={{ scaleY: [1, 0.5, 1], opacity: [0.3, 0.15, 0.3] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-[#0E0E12]/20 to-transparent origin-top"
        />
      </motion.div>
    </section>
  );
}