const Footer = () => (
  <footer className="bg-card border-t border-border py-8">
    <div className="container mx-auto px-4 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Muaz Tanzeel. All rights reserved.
      </p>
      <div className="flex gap-6">
        <a href="#home" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</a>
        <a href="#services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Services</a>
        <a href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</a>
        <a href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a>
      </div>
    </div>
  </footer>
);

export default Footer;
