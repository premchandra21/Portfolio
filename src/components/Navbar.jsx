import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Lab", href: "#lab" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight active section on scroll
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${scrolled
            ? "bg-[#F7F6F2]/90 backdrop-blur-md border-b border-[#0E0E12]/8 shadow-[0_1px_0_0_rgba(14,14,18,0.06)]"
            : "bg-transparent"
          }
        `}
      >
        <div className="max-w-6xl mx-auto px-6 h-[60px] flex items-center justify-between">
          {/* Wordmark */}
          <a
            href="#"
            className="group flex items-center gap-2.5 select-none"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          >
            {/* Live dot */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4F8EF7] opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4F8EF7]" />
            </span>
            <span
              className="font-['JetBrains_Mono',monospace] text-[13px] font-medium tracking-tight text-[#0E0E12] group-hover:text-[#4F8EF7] transition-colors duration-200"
            >
              prem.dev
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`
                      relative px-3.5 py-1.5 rounded-md text-[13.5px] font-medium transition-colors duration-150
                      ${isActive
                        ? "text-[#4F8EF7]"
                        : "text-[#0E0E12]/60 hover:text-[#0E0E12]"
                      }
                    `}
                  >
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0.5 left-3.5 right-3.5 h-[1.5px] bg-[#4F8EF7] rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="
                px-4 py-1.5 rounded-md text-[13px] font-medium
                border border-[#0E0E12]/15 text-[#0E0E12]/70
                hover:border-[#4F8EF7] hover:text-[#4F8EF7]
                transition-all duration-150
              "
            >
              Resume ↗
            </a>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded-md hover:bg-[#0E0E12]/5 transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-5 h-px bg-[#0E0E12] rounded-full origin-center"
              transition={{ duration: 0.22 }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-px bg-[#0E0E12] rounded-full"
              transition={{ duration: 0.22 }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block w-5 h-px bg-[#0E0E12] rounded-full origin-center"
              transition={{ duration: 0.22 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="
              fixed top-[60px] left-0 right-0 z-40 md:hidden
              bg-[#F7F6F2]/95 backdrop-blur-md
              border-b border-[#0E0E12]/8
              px-6 pb-5 pt-2
            "
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map(({ label, href }) => {
                const id = href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <li key={href}>
                    <a
                      href={href}
                      onClick={(e) => {
                        e.preventDefault();
                        setMenuOpen(false);
                        setTimeout(() => {
                          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                        }, 150);
                      }}
                      className={`
                        flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-[14px] font-medium
                        transition-colors duration-150
                        ${isActive
                          ? "text-[#4F8EF7] bg-[#4F8EF7]/6"
                          : "text-[#0E0E12]/65 hover:text-[#0E0E12] hover:bg-[#0E0E12]/4"
                        }
                      `}
                    >
                      {label}
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4F8EF7]" />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className="mt-3 pt-3 border-t border-[#0E0E12]/8">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  block w-full text-center px-4 py-2.5 rounded-lg text-[13.5px] font-medium
                  border border-[#0E0E12]/12 text-[#0E0E12]/60
                  hover:border-[#4F8EF7] hover:text-[#4F8EF7]
                  transition-all duration-150
                "
              >
                Resume ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}