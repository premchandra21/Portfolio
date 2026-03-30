// src/components/ProjectDiagram.jsx
//
// This is the placeholder shell. In the next pass we'll wire in
// @xyflow/react with proper node/edge rendering, animated edges,
// and hover-highlight behavior.
//
// For now it renders the linear mock flow so the card looks correct.

function FlowNode({ label, sub, accent }) {
  return (
    <div
      className={`
        flex flex-col items-center justify-center text-center
        min-w-[88px] px-3.5 py-2 rounded-lg
        border
        ${accent
          ? "border-[#F0A500]/35 bg-[#F0A500]/[0.06]"
          : "border-[#4F8EF7]/22 bg-[#1c1c2e]"
        }
      `}
    >
      <span
        className={`
          font-['JetBrains_Mono',monospace] text-[10px] leading-tight tracking-[0.02em]
          ${accent ? "text-[#F0A500]" : "text-white/70"}
        `}
      >
        {label}
      </span>
      {sub && (
        <span className="font-['JetBrains_Mono',monospace] text-[8.5px] text-white/26 mt-[3px]">
          {sub}
        </span>
      )}
    </div>
  );
}

function FlowEdge({ delay = 0 }) {
  return (
    <div className="flex items-center flex-shrink-0">
      {/* Line with animated dot */}
      <div className="relative w-7 h-px bg-[#4F8EF7]/30 overflow-visible">
        <div
          className="absolute top-[-2px] w-[5px] h-[5px] rounded-full bg-[#4F8EF7]"
          style={{
            animation: `slideEdge 1.8s ease-in-out ${delay}s infinite`,
          }}
        />
      </div>
      {/* Arrowhead */}
      <div
        className="w-0 h-0"
        style={{
          borderTop: "4px solid transparent",
          borderBottom: "4px solid transparent",
          borderLeft: "6px solid rgba(79,142,247,0.35)",
        }}
      />
    </div>
  );
}

export default function ProjectDiagram({ nodes, edges }) {
  // Build a simple ordered list from the linear edge chain.
  // Works for all current projects (linear flow). Replace with
  // React Flow <ReactFlow> component in the next pass.
  const ordered = [];
  if (nodes.length > 0) {
    const edgeMap = Object.fromEntries(edges.map((e) => [e.from, e.to]));
    const targets = new Set(edges.map((e) => e.to));
    const startId = nodes.find((n) => !targets.has(n.id))?.id ?? nodes[0].id;
    const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));
    let cur = startId;
    while (cur) {
      ordered.push(nodeMap[cur]);
      cur = edgeMap[cur];
    }
  }

  return (
    <>
      {/* Keyframe animation injected once */}
      <style>{`
        @keyframes slideEdge {
          0%   { left: 0; opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { left: calc(100% + 5px); opacity: 0; }
        }
      `}</style>

      <div className="w-full h-full flex items-center justify-center px-4 overflow-x-auto">
        <div className="flex items-center gap-0 flex-nowrap">
          {ordered.map((node, i) => (
            <div key={node.id} className="flex items-center">
              <FlowNode label={node.label} sub={node.sub} accent={node.accent} />
              {i < ordered.length - 1 && <FlowEdge delay={i * 0.5} />}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}