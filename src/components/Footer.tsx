import { MessageCircle, Mail, Phone, MapPin } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const services = [
  "Amazon Store Management",
  "Shopify Store Development",
  "TikTok Shop Setup",
  "eBay Seller Account Setup",
  "LLC Formation",
  "Trademark & Brand Registry",
];

const Footer = () => (
  <footer className="bg-[hsl(210,35%,15%)] text-[hsl(210,20%,85%)] pt-16 pb-8">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Brand */}
        <div>
          <a href="#home" className="text-2xl font-heading font-bold block mb-4">
            <span className="text-primary">Team</span>{" "}
            <span className="text-white">Ecomify</span>
          </a>
          <p className="text-sm leading-relaxed text-[hsl(210,15%,65%)] mb-6">
            Your trusted partner in e-commerce success. We help entrepreneurs build, launch, and scale profitable online businesses.
          </p>
          <div className="flex gap-4">
            <a
              href="https://wa.me/19413050102"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors"
            >
              <MessageCircle size={16} className="text-primary" />
            </a>
            <a
              href="mailto:muazxsocial@gmail.com"
              className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors"
            >
              <Mail size={16} className="text-primary" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2.5">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-[hsl(210,15%,65%)] hover:text-primary transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-heading font-semibold text-white mb-4">Our Services</h4>
          <ul className="space-y-2.5">
            {services.map((service) => (
              <li key={service}>
                <span className="text-sm text-[hsl(210,15%,65%)]">{service}</span>
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
              <a
                href="https://wa.me/19413050102"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[hsl(210,15%,65%)] hover:text-primary transition-colors"
              >
                WhatsApp Us
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <a
                href="mailto:muazxsocial@gmail.com"
                className="text-sm text-[hsl(210,15%,65%)] hover:text-primary transition-colors"
              >
                muazxsocial@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm text-[hsl(210,15%,65%)]">Serving Clients Worldwide</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider + Bottom */}
      <div className="border-t border-[hsl(210,20%,22%)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[hsl(210,15%,55%)]">
          © {new Date().getFullYear()} Team Ecomify. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-sm text-[hsl(210,15%,55%)] hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="text-sm text-[hsl(210,15%,55%)] hover:text-primary transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
