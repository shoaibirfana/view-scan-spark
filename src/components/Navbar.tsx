import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Blog", href: "/blog" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Contact", href: "/#contact" },
];

const Navbar = () => {
  const [overHero, setOverHero] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHomeRoute = location.pathname === "/";

  useEffect(() => {
    if (!isHomeRoute) {
      setOverHero(false);
      return;
    }
    const hero = document.getElementById("home");
    if (!hero) {
      setOverHero(false);
      return;
    }
    const onScroll = () => {
      const rect = hero.getBoundingClientRect();
      // Over hero while its bottom is past the navbar
      setOverHero(rect.bottom > 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHomeRoute, location.pathname]);

  const navBg = overHero
    ? "bg-black/20 backdrop-blur-[16px]"
    : "bg-white/95 backdrop-blur-lg shadow-sm";
  const linkColor = overHero ? "text-white/85 hover:text-white" : "text-slate-700 hover:text-[#00C48C]";
  const brandSecondary = overHero ? "text-white" : "text-slate-900";
  const ctaClasses = overHero
    ? "bg-[#00C48C] text-white hover:shadow-[0_0_24px_rgba(0,196,140,0.55)]"
    : "bg-[#00C48C] text-white hover:shadow-[0_0_24px_rgba(0,196,140,0.45)]";

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-2xl font-heading font-bold">
          <img src={logo} alt="Team Ecomify logo" className="w-8 h-8 object-contain" />
          <span>
            <span className="text-[#00C48C]">Team</span>{" "}
            <span className={brandSecondary}>Ecomify</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${linkColor}`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/19413050102"
            target="_blank"
            rel="noopener noreferrer"
            className={`${ctaClasses} px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300`}
          >
            WhatsApp Me
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden ${overHero ? "text-white" : "text-slate-900"}`}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden border-t ${overHero ? "bg-black/60 backdrop-blur-lg border-white/10" : "bg-white border-slate-200"}`}
          >
            <div className="flex flex-col gap-4 p-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`font-medium transition-colors ${overHero ? "text-white" : "text-slate-800"}`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://wa.me/19413050102"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#00C48C] text-white px-5 py-3 rounded-lg text-sm font-semibold text-center"
              >
                WhatsApp Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
