import { MessageCircle, Mail, Phone, MapPin, Linkedin, Facebook } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const quickLinks = [
  { label: "Home", href: "/#home", type: "anchor" },
  { label: "Services", href: "/#services", type: "anchor" },
  { label: "About", href: "/#about", type: "anchor" },
  { label: "Blog", href: "/blog", type: "route" },
  { label: "Testimonials", href: "/#testimonials", type: "anchor" },
  { label: "Contact", href: "/#contact", type: "anchor" },
];

const services = [
  { label: "Amazon Store Management", href: "/amazon-ppc-management" },
  { label: "Shopify Store Development", href: "/#services" },
  { label: "TikTok Shop Setup", href: "/#services" },
  { label: "eBay Seller Account Setup", href: "/#services" },
  { label: "LLC Formation", href: "/#services" },
  { label: "Trademark & Brand Registry", href: "/#services" },
];

const servicePages = [
  { label: "Amazon PPC Management", href: "/amazon-ppc-management" },
  { label: "Listing Optimization", href: "/amazon-listing-optimization" },
  { label: "Account Management", href: "/amazon-account-management" },
  { label: "Walmart Marketplace", href: "/walmart-marketplace" },
];

const Footer = () => (
  <footer className="bg-[hsl(210,35%,15%)] text-[hsl(210,20%,85%)] pt-16 pb-8">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
        {/* Brand */}
        <div className="lg:col-span-1">
          <a href="#home" className="flex items-center gap-2 text-2xl font-heading font-bold mb-4">
            <img src={logo} alt="Team Ecomify logo" className="w-8 h-8 object-contain" />
            <span>
              <span className="text-primary">Team</span>{" "}
              <span className="text-white">Ecomify</span>
            </span>
          </a>
          <p className="text-sm leading-relaxed text-[hsl(210,15%,65%)] mb-6">
            Your trusted partner in e-commerce success. We help entrepreneurs build, launch, and scale profitable online businesses.
          </p>
          <div className="flex gap-3 flex-wrap">
            <a href="https://wa.me/19413050102" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors">
              <MessageCircle size={16} className="text-primary" />
            </a>
            <a href="mailto:hello@teamecomify.com" aria-label="Email" className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors">
              <Mail size={16} className="text-primary" />
            </a>
            <a href="https://linkedin.com/company/teamecomify" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors">
              <Linkedin size={16} className="text-primary" />
            </a>
            <a href="https://facebook.com/teamecomify" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors">
              <Facebook size={16} className="text-primary" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2.5">
            {quickLinks.map((link) => (
              <li key={link.href}>
                {link.type === "route" ? (
                  <Link to={link.href} className="text-sm text-[hsl(210,15%,65%)] hover:text-primary transition-colors">{link.label}</Link>
                ) : (
                  <a href={link.href} className="text-sm text-[hsl(210,15%,65%)] hover:text-primary transition-colors">{link.label}</a>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-heading font-semibold text-white mb-4">Our Services</h4>
          <ul className="space-y-2.5">
            {services.map((service) => (
              <li key={service.label}>
                <a href={service.href} className="text-sm text-[hsl(210,15%,65%)] hover:text-primary transition-colors">{service.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Service Pages */}
        <div>
          <h4 className="font-heading font-semibold text-white mb-4">Service Pages</h4>
          <ul className="space-y-2.5">
            {servicePages.map((page) => (
              <li key={page.href}>
                <Link to={page.href} className="text-sm text-[hsl(210,15%,65%)] hover:text-primary transition-colors">{page.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-heading font-semibold text-white mb-4">Contact Us</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <Phone size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm text-[hsl(210,15%,65%)]">+1 (941) 305-0102</span>
            </li>
            <li className="flex items-start gap-3">
              <MessageCircle size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <a href="https://wa.me/19413050102" target="_blank" rel="noopener noreferrer" className="text-sm text-[hsl(210,15%,65%)] hover:text-primary transition-colors">WhatsApp Us</a>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <a href="mailto:hello@teamecomify.com" className="text-sm text-[hsl(210,15%,65%)] hover:text-primary transition-colors">hello@teamecomify.com</a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm text-[hsl(210,15%,65%)]">1411 Upland Dr, Houston, TX 77043</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mb-12 rounded-xl overflow-hidden border border-[hsl(210,20%,22%)]">
        <iframe
          title="Team Ecomify Office Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3464.0!2d-95.555!3d29.78!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z1411+Upland+Dr+Houston+TX+77043!5e0!3m2!1sen!2sus!4v1700000000000"
          width="100%"
          height="280"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="border-t border-[hsl(210,20%,22%)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[hsl(210,15%,55%)]">
          © {new Date().getFullYear()} Team Ecomify. All rights reserved.
        </p>
        <div className="flex gap-6">
          <Link to="/privacy-policy" className="text-sm text-[hsl(210,15%,55%)] hover:text-primary transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="text-sm text-[hsl(210,15%,55%)] hover:text-primary transition-colors">Terms of Service</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
