import { useState, useRef } from "react";
import { Menu, X, ChevronDown, ShoppingCart, BarChart3, Store, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { motion, AnimatePresence } from "framer-motion";

const serviceLinks = [
  { label: "Amazon PPC Management", href: "/amazon-ppc-management", icon: BarChart3 },
  { label: "Listing Optimization", href: "/amazon-listing-optimization", icon: ShoppingCart },
  { label: "Account Management", href: "/amazon-account-management", icon: Store },
  { label: "Walmart Marketplace", href: "/walmart-marketplace", icon: Building2 },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg shadow-sm border-b border-black/5"
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-2xl font-heading font-bold">
          <img src={logo} alt="Team Ecomify logo" className="w-9 h-9 object-contain" />
          <span>
            <span className="text-primary">Team</span>{" "}
            <span className="text-foreground">Ecomify</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="/#about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">About</a>

          <div ref={dropdownRef} className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Services <ChevronDown size={14} className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.18 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white rounded-xl shadow-xl border border-border/50 p-2 z-50"
                >
                  {serviceLinks.map((link) => (
                    <Link key={link.href} to={link.href} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-primary/5 hover:text-primary transition-colors">
                      <link.icon size={15} className="text-primary flex-shrink-0" />
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href="/blog" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Blog</a>
          <a href="/#testimonials" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Testimonials</a>
          <a href="/#contact" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Contact</a>

          <a href="https://wa.me/19413050102" target="_blank" rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all duration-300">
            WhatsApp Me
          </a>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-foreground" aria-label="Toggle menu">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-lg border-t border-border">
            <div className="flex flex-col gap-4 p-6">
              <a href="/#about" onClick={() => setMobileOpen(false)} className="text-foreground font-medium hover:text-primary transition-colors">About</a>
              <div>
                <button onClick={() => setMobileServicesOpen(!mobileServicesOpen)} className="flex items-center gap-1 text-foreground font-medium hover:text-primary transition-colors w-full text-left">
                  Services <ChevronDown size={14} className={`ml-auto transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-2 ml-4 flex flex-col gap-2">
                      {serviceLinks.map((link) => (
                        <Link key={link.href} to={link.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                          <link.icon size={13} className="text-primary" />
                          {link.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <a href="/blog" onClick={() => setMobileOpen(false)} className="text-foreground font-medium hover:text-primary transition-colors">Blog</a>
              <a href="/#testimonials" onClick={() => setMobileOpen(false)} className="text-foreground font-medium hover:text-primary transition-colors">Testimonials</a>
              <a href="/#contact" onClick={() => setMobileOpen(false)} className="text-foreground font-medium hover:text-primary transition-colors">Contact</a>
              <a href="https://wa.me/19413050102" target="_blank" rel="noopener noreferrer" className="bg-primary text-primary-foreground px-5 py-3 rounded-lg text-sm font-semibold text-center">
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
