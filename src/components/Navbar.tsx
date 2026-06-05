import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Megaphone, FileText, Settings, Store } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import { motion, AnimatePresence } from "framer-motion";

const servicesDropdown = [
  { label: "Amazon PPC Management", href: "/amazon-ppc-management", icon: Megaphone },
  { label: "Listing Optimization", href: "/amazon-listing-optimization", icon: FileText },
  { label: "Account Management", href: "/amazon-account-management", icon: Settings },
  { label: "Walmart Marketplace", href: "/walmart-marketplace", icon: Store },
];

const navLinks = [
  { label: "About", href: "/#about", id: "about" },
  { label: "Blog", href: "/blog", id: "blog" },
  { label: "Testimonials", href: "/#testimonials", id: "testimonials" },
  { label: "Contact", href: "/#contact", id: "contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      const heroEl = document.getElementById("home");
      const heroBottom = heroEl ? heroEl.getBoundingClientRect().bottom : window.innerHeight;
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

  // Scroll spy
  useEffect(() => {
    if (!isHome) return;
    const ids = ["services", "about", "testimonials", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  const overHero = isHome && !scrolled;

  const navClasses = overHero
    ? "bg-transparent"
    : "bg-white/95 backdrop-blur-lg shadow-sm border-b border-black/5";

  const linkColor = overHero
    ? "text-white/90 hover:text-white"
    : "text-muted-foreground hover:text-primary";

  const brandText = overHero ? "text-white" : "text-foreground";

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navClasses}`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-2xl font-heading font-bold">
          <img src={logo} alt="Team Ecomify logo" className={`w-9 h-9 object-contain transition-all ${overHero ? "brightness-0 invert" : ""}`} />
          <span>
            <span className="text-primary">Team</span>{" "}
            <span className={brandText}>Ecomify</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className={`flex items-center gap-1 text-sm font-medium transition-colors ${linkColor}`}>
              Services <ChevronDown size={14} className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
              {activeSection === "services" && (
                <motion.span layoutId="active-dot" className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </button>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-72"
                >
                  <div className="bg-white rounded-xl shadow-xl border border-black/5 overflow-hidden">
                    {servicesDropdown.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-primary/5 hover:text-primary transition-colors"
                      >
                        <item.icon size={16} className="text-primary" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative text-sm font-medium transition-colors ${linkColor}`}
            >
              {link.label}
              {activeSection === link.id && (
                <motion.span layoutId="active-dot" className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </a>
          ))}
          <a
            href="https://wa.me/19413050102"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all duration-300"
          >
            WhatsApp Me
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden ${overHero ? "text-white" : "text-foreground"}`}
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
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="flex items-center justify-between text-foreground font-medium hover:text-primary transition-colors"
              >
                Services <ChevronDown size={16} className={`transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileServicesOpen && (
                <div className="flex flex-col gap-3 pl-4 border-l-2 border-primary/30">
                  {servicesDropdown.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <item.icon size={14} className="text-primary" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
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
