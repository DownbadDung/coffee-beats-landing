const FooterSection = () => {
  return (
    <footer className="relative paper-texture py-12 border-t-2 border-primary">
      <div className="max-w-5xl mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="font-gothic text-2xl text-primary mb-3">DA MARIA</h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Coffee, music & moments.<br />
              Where every cup tells a story.
            </p>
          </div>
          <div>
            <h4 className="vintage-label text-[10px] mb-3">FIND US</h4>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              123 Main Street<br />
              Your City, ST 12345<br />
              info@damaria.com
            </p>
          </div>
          <div>
            <h4 className="vintage-label text-[10px] mb-3">HOURS</h4>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Mon – Fri: 8AM – 11PM<br />
              Sat – Sun: 9AM – 12AM<br />
              Live Music: Fri & Sat
            </p>
          </div>
        </div>

        <div className="newspaper-divider mt-8 mb-4" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-muted-foreground font-body">
          <p>© 2025 Da Maria Coffee & Music House. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">Instagram</a>
            <a href="#" className="hover:text-primary transition-colors">Facebook</a>
            <a href="#" className="hover:text-primary transition-colors">TikTok</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
