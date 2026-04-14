import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

// ── Social icons (inline SVG — no extra dep needed) ──────────────────────────

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.23 0z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="2,4 12,13 22,4" />
    </svg>
  );
}

const SOCIALS = [
  { href: "https://github.com/premchandra21",                    icon: <GithubIcon />,   label: "GitHub"   },
  { href: "https://linkedin.com/in/prem-chandra-648223295", icon: <LinkedinIcon />, label: "LinkedIn" },
  { href: "mailto:prem21pcp@gmail.com",                     icon: <EmailIcon />,    label: "Email"    },
];

const FIELDS = [
  { name: "name",    type: "text",  placeholder: "Your name"    },
  { name: "email",   type: "email", placeholder: "Your email"   },
  { name: "subject", type: "text",  placeholder: "Subject"      },
];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  },
});

// ── Shared input className ────────────────────────────────────────────────────
const inputCls = `
  w-full font-['DM_Sans',sans-serif] text-[14px] text-[#0E0E12]
  bg-white border border-[#0E0E12]/10 rounded-lg
  px-3.5 py-[11px] outline-none placeholder:text-[#0E0E12]/28
  focus:border-[#4F8EF7] transition-colors duration-150
`;

export default function Contact() {
  const formRef = useRef(null);
  const ref     = useRef(null);
  const inView  = useInView(ref, { once: true, margin: "-100px" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(formRef.current);

    const res = await fetch("https://formspree.io/f/xkgrnqnw", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      toast.success("Message sent!");
      formRef.current.reset();
    } else {
      toast.error("Failed to send. Try again later.");
    }
  };

  return (
    <section id="contact" className="bg-[#F7F6F2] py-28 px-6 md:px-16" ref={ref}>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "13.5px",
            background: "#0E0E12",
            color: "#F7F6F2",
            borderRadius: "8px",
          },
        }}
      />

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-start">

        {/* ── Left ── */}
        <div>
          <motion.p
            variants={fadeUp(0)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="font-['JetBrains_Mono',monospace] text-[11px] text-[#4F8EF7] tracking-[0.06em] mb-4"
          >
            // 06 — contact
          </motion.p>

          <motion.h2
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-[clamp(2rem,4.5vw,2.5rem)] font-semibold text-[#0E0E12] leading-[1.08] tracking-[-0.025em] mb-4"
          >
            Let's talk.
          </motion.h2>

          <motion.p
            variants={fadeUp(0.2)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-[14.5px] text-[#0E0E12]/52 leading-[1.72] mb-8"
          >
            Have a project, idea, or opportunity? Drop me a message — I read everything.
          </motion.p>

          {/* Socials */}
          <motion.div
            variants={fadeUp(0.3)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex gap-3"
          >
            {SOCIALS.map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="
                  w-[38px] h-[38px] flex items-center justify-center
                  rounded-lg border border-[#0E0E12]/10
                  text-[#0E0E12]/45
                  hover:border-[#4F8EF7] hover:text-[#4F8EF7]
                  transition-colors duration-150
                "
              >
                {icon}
              </a>
            ))}
          </motion.div>
        </div>

        {/* ── Right — form ── */}
        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          variants={fadeUp(0.15)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col gap-2.5"
        >
          {FIELDS.map(({ name, type, placeholder }) => (
            <input
              key={name}
              type={type}
              name={name}
              placeholder={placeholder}
              required
              className={inputCls}
            />
          ))}

          <textarea
            name="message"
            rows={4}
            placeholder="Your message..."
            required
            className={`${inputCls} resize-none`}
          />

          <button
            type="submit"
            className="
              mt-1 self-start px-6 py-[11px]
              bg-[#0E0E12] text-[#F7F6F2]
              rounded-lg text-[13.5px] font-medium
              hover:bg-[#1c1c24]
              transition-colors duration-150
            "
          >
            Send message →
          </button>
        </motion.form>

      </div>
    </section>
  );
}
