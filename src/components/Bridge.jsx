/**
 * Bridge — reusable gradient transition between light and dark surfaces.
 *
 * Usage:
 *   <Bridge direction="to-dark" />   — #F7F6F2 → #0E0E16  (before Projects)
 *   <Bridge direction="to-light" />  — #0E0E16 → #F7F6F2  (after Projects)
 */

export default function Bridge({ direction = "to-dark" }) {
  const gradient =
    direction === "to-dark"
      ? "linear-gradient(to bottom, #F7F6F2, #0E0E16)"
      : "linear-gradient(to bottom, #0E0E16, #F7F6F2)";

  return (
    <div
      aria-hidden="true"
      style={{ background: gradient }}
      className="w-full h-[72px] pointer-events-none"
    />
  );
}