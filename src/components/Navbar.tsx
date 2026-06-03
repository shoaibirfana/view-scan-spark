import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Blog", href: "/blog" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Contact", href: "/#contact" },
];


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      const heroEl = document.getElementById("home");
      const heroBottom = heroEl ? heroEl.getBoundingClientRect().bottom : window.innerHeight;
      // Switch to solid white as soon as hero leaves the top under the navbar
      setScrolled(isHome ? heroBottom <= 80 : window.scrollY > 20);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome]);

  const overHero = isHome && !scrolled;

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,box-shadow,border-color] duration-500 ease-out border-b ${
        overHero
          ? "bg-black/20 backdrop-blur-xl border-white/10"
          : "bg-white/95 backdrop-blur-lg shadow-sm border-black/5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-2xl font-heading font-bold">
          <img src={logo} alt="Team Ecomify logo" className="w-9 h-9 object-contain" />
          <span>
            <span className="text-primary">Team</span>{" "}
            <span className={overHero ? "text-white" : "text-foreground"}>Ecomify</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                overHero ? "text-white/90 hover:text-white" : "text-muted-foreground hover:text-primary"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/19413050102"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
              overHero
                ? "bg-white/15 text-white border border-white/30 backdrop-blur-md hover:bg-white/25"
                : "bg-primary text-primary-foreground hover:opacity-90"
            }`}
          >
            WhatsApp Me
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={overHero ? "md:hidden text-white" : "md:hidden text-foreground"}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-lg border-t border-border"
          >
            <div className="flex flex-col gap-4 p-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-foreground font-medium hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://wa.me/19413050102"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-primary-foreground px-5 py-3 rounded-lg text-sm font-semibold text-center"
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
