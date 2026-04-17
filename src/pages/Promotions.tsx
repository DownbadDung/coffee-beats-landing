import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface Promotion {
  id: string;
  badge: string;
  headline: string;
  subhead: string;
  body: string;
  code: string;
  validity: string;
  terms: string[];
  highlight?: boolean;
}

const promotions: Promotion[] = [
  {
    id: "happy-hour",
    badge: "DAILY SPECIAL",
    headline: "The Espresso Hour",
    subhead: "Half-price brews, 3 PM – 5 PM",
    body: "Beat the afternoon slump with our signature espresso, flat whites, and lattes — all at half price, every weekday between 3 and 5. Pull up a chair, open a book, and let the aroma do the talking.",
    code: "ESPRESSO50",
    validity: "Mon – Fri • 3 PM – 5 PM",
    terms: ["Dine-in only", "Cannot combine with other offers", "One discount per cup"],
    highlight: true,
  },
  {
    id: "live-music",
    badge: "FRIDAY NIGHTS",
    headline: "Free Cover, Free Vibes",
    subhead: "No entry fee on Live Music Fridays",
    body: "Every Friday from 8 PM, our stage comes alive with the city's finest acoustic and jazz acts. No cover charge — just come early, grab a drink, and stay for the encore.",
    code: "LIVEFRIDAY",
    validity: "Every Friday • 8 PM – Late",
    terms: ["Seating first-come first-served", "Reservation recommended", "Min. one drink per guest"],
  },
  {
    id: "weekend-brunch",
    badge: "WEEKEND TREAT",
    headline: "The Brunch Bundle",
    subhead: "Two mains + two coffees for $35",
    body: "Lazy weekends were made for this. Choose any two mains from our brunch menu, paired with two of our signature coffees, all for a flat $35. Add a fresh pastry for $4.",
    code: "BRUNCH35",
    validity: "Sat – Sun • 9 AM – 1 PM",
    terms: ["Dine-in only", "Substitutions may apply", "Pastry add-on optional"],
  },
  {
    id: "first-visit",
    badge: "NEW IN TOWN",
    headline: "First Cup is on Us",
    subhead: "A welcome from the house",
    body: "Never been to Da Maria? Show this code at the counter on your first visit and your first house coffee is on us. Consider it a handshake from the family.",
    code: "WELCOMEDM",
    validity: "One-time use • New guests only",
    terms: ["Valid ID may be requested", "Standard coffees only", "Non-transferable"],
  },
  {
    id: "private-event",
    badge: "PRIVATE BOOKINGS",
    headline: "Book the House",
    subhead: "10% off full venue hire",
    body: "Hosting a birthday, launch, or just an excuse to gather your favourite people? Book Da Maria for a private evening and enjoy 10% off the venue hire fee, plus a complimentary welcome round.",
    code: "HOUSE10",
    validity: "Bookings confirmed before month-end",
    terms: ["Min. 25 guests", "Subject to availability", "Deposit required"],
  },
  {
    id: "muay-thai",
    badge: "COMING SOON",
    headline: "Fight Night Founders",
    subhead: "Reserved seats for our day-one supporters",
    body: "When the ring arrives, our first Fight Night will be invite-only. Sign up now with the code below and you'll be on the founders list — front-row seats, complimentary drinks, and bragging rights for life.",
    code: "RINGSIDE01",
    validity: "Pre-registration • Limited spots",
    terms: ["Subject to opening date", "Email confirmation required", "ID required at door"],
    highlight: true,
  },
];

const Promotions = () => {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  const [flippedCard, setFlippedCard] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-idx"));
            if (!isNaN(idx)) setRevealed((prev) => new Set(prev).add(idx));
          }
        });
      },
      { threshold: 0.15 }
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      toast({ title: "Coupon copied!", description: `Code "${code}" is on your clipboard.` });
    } catch {
      toast({ title: "Couldn't copy", description: `Please copy manually: ${code}`, variant: "destructive" });
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast({ title: "Subscribed!", description: "You'll be the first to know about new offers." });
    setEmail("");
  };

  return (
    <main className="bg-background paper-texture min-h-screen relative">
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-secondary">
        <div className="h-full bg-primary transition-all duration-150 ease-out" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="m-4 md:m-8 border-2 border-primary relative">
        <div className="absolute inset-1 border border-primary/30 pointer-events-none z-30" />

        {/* Header */}
        <header className="relative z-40 px-8 md:px-16 pt-8 md:pt-12">
          <div className="flex items-center justify-between">
            <Link to="/" className="btn-newspaper text-xs tracking-widest">← HOME</Link>
            <div className="text-center">
              <div className="vintage-label text-xs tracking-[0.3em]">CLASSIFIEDS</div>
            </div>
            <Link to="/our-journey" className="btn-newspaper text-xs tracking-widest hidden md:inline-block">JOURNEY →</Link>
            <div className="w-20 md:hidden" />
          </div>
          <div className="newspaper-divider mt-4 animate-line-grow" />
        </header>

        {/* Masthead */}
        <section className="relative z-20 text-center px-8 md:px-16 pt-10 md:pt-16 pb-6">
          <p className="font-display text-xs md:text-sm tracking-[0.4em] text-muted-foreground uppercase mb-2">
            The Bulletin Board of
          </p>
          <h1 className="font-gothic text-5xl md:text-7xl lg:text-8xl text-primary leading-none animate-flicker">
            DA MARIA
          </h1>
          <div className="flex items-center justify-center gap-4 mt-3 mb-3">
            <span className="w-16 md:w-32 h-[1px] bg-primary" />
            <span className="text-primary text-lg">✦</span>
            <span className="w-16 md:w-32 h-[1px] bg-primary" />
          </div>
          <h2 className="font-display text-2xl md:text-4xl text-foreground italic">Promotions & Offers</h2>
          <p className="font-body text-base md:text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
            Clip the coupon. Save the code. Bring this paper — or your phone — and enjoy the latest deals from the house.
          </p>

          <div className="newspaper-double-divider h-[5px] mt-8 mb-2" />
          <div className="flex justify-between text-[10px] md:text-xs font-display text-muted-foreground tracking-widest uppercase px-2">
            <span>Vol. II — Offers Edition</span>
            <span>Limited Time Only</span>
            <span>Tap to Reveal</span>
          </div>
          <div className="newspaper-divider mt-2" />
        </section>

        {/* Featured / Headline promo */}
        {promotions.filter((p) => p.highlight).slice(0, 1).map((promo) => (
          <section key={promo.id} className="relative z-20 px-6 md:px-16 lg:px-24 pb-10 max-w-6xl mx-auto">
            <div className="vintage-label text-[10px] mb-3 mx-auto block w-fit animate-pulse-glow">⚡ TODAY'S HEADLINE ⚡</div>
            <article className="border-4 border-primary p-6 md:p-10 bg-card relative overflow-hidden">
              <div className="absolute top-2 right-2 w-20 h-20 md:w-28 md:h-28 rounded-full border-2 border-primary/40 flex items-center justify-center rotate-[-12deg] pointer-events-none">
                <div className="text-center text-primary/60 font-display">
                  <div className="text-[8px] md:text-[10px] tracking-widest">LIMITED</div>
                  <div className="text-base md:text-xl font-bold">50%</div>
                  <div className="text-[8px] md:text-[10px] tracking-widest">OFF</div>
                </div>
              </div>
              <div className="vintage-label text-[10px] mb-3">{promo.badge}</div>
              <h3 className="font-display text-3xl md:text-5xl font-bold text-primary leading-tight mb-2">
                {promo.headline}
              </h3>
              <p className="font-display text-lg md:text-2xl italic text-muted-foreground mb-4">{promo.subhead}</p>
              <div className="newspaper-divider mb-4" />
              <p className="drop-cap font-body text-base md:text-lg leading-relaxed text-foreground/85 mb-5 max-w-3xl">
                {promo.body}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => handleCopy(promo.code)}
                  className="btn-newspaper-filled text-xs md:text-sm group"
                >
                  Copy Code: {promo.code}
                </button>
                <span className="font-display text-xs md:text-sm text-muted-foreground tracking-wider uppercase">
                  Valid: {promo.validity}
                </span>
              </div>
            </article>
          </section>
        ))}

        {/* Coupon grid */}
        <section className="relative z-20 px-6 md:px-16 lg:px-24 pb-12 max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="vintage-label text-[10px] mb-2">THE CLASSIFIEDS</div>
            <h3 className="font-display text-2xl md:text-3xl text-foreground">More Offers In Print</h3>
            <p className="font-body text-sm text-muted-foreground italic mt-1">Tap a coupon to flip it open</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {promotions.filter((p) => !p.highlight || promotions.filter(x => x.highlight).indexOf(p) !== 0).map((promo, idx) => {
              const isRevealed = revealed.has(idx);
              const isFlipped = flippedCard === promo.id;
              return (
                <div
                  key={promo.id}
                  ref={(el) => { cardRefs.current[idx] = el; }}
                  data-idx={idx}
                  className={`transition-all duration-700 ${isRevealed ? "opacity-100 animate-fade-in-up" : "opacity-0"} [perspective:1200px]`}
                >
                  <div
                    className={`relative w-full min-h-[340px] transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`}
                  >
                    {/* Front - Coupon */}
                    <button
                      onClick={() => setFlippedCard(isFlipped ? null : promo.id)}
                      className="absolute inset-0 [backface-visibility:hidden] text-left"
                      aria-label={`Reveal details for ${promo.headline}`}
                    >
                      <div className="h-full border-2 border-dashed border-primary bg-card p-6 flex flex-col relative hover:shadow-lg transition-shadow">
                        {/* Punch holes */}
                        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary" />
                        <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary" />

                        <div className="flex items-start justify-between mb-3">
                          <span className="vintage-label text-[10px]">{promo.badge}</span>
                          <span className="font-display text-[10px] text-muted-foreground tracking-widest">№ {String(idx + 1).padStart(2, "0")}</span>
                        </div>

                        <h4 className="font-display text-2xl md:text-3xl font-bold text-primary leading-tight mb-1">
                          {promo.headline}
                        </h4>
                        <p className="font-display text-base italic text-muted-foreground mb-4">{promo.subhead}</p>

                        <div className="newspaper-divider mb-4" />

                        <p className="font-body text-sm md:text-base text-foreground/80 leading-relaxed flex-1 line-clamp-4">
                          {promo.body}
                        </p>

                        <div className="mt-4 pt-3 border-t border-primary/30 flex items-center justify-between">
                          <span className="font-display text-xs text-muted-foreground tracking-wider uppercase">
                            {promo.validity}
                          </span>
                          <span className="font-display text-xs text-primary tracking-widest uppercase">Flip ↻</span>
                        </div>
                      </div>
                    </button>

                    {/* Back - Code & Terms */}
                    <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <div className="h-full border-2 border-primary bg-primary/5 p-6 flex flex-col">
                        <div className="vintage-label text-[10px] mb-3 mx-auto">YOUR COUPON CODE</div>

                        <div className="flex-1 flex flex-col items-center justify-center text-center">
                          <p className="font-display text-xs tracking-widest text-muted-foreground uppercase mb-2">
                            Present at counter
                          </p>
                          <div className="border-2 border-dashed border-primary px-6 py-4 mb-4 bg-background">
                            <span className="font-gothic text-3xl md:text-4xl text-primary tracking-wider">
                              {promo.code}
                            </span>
                          </div>
                          <button
                            onClick={() => handleCopy(promo.code)}
                            className="btn-newspaper text-xs mb-4"
                          >
                            Copy to Clipboard
                          </button>

                          <div className="text-left w-full mt-2">
                            <p className="font-display text-[10px] tracking-widest text-muted-foreground uppercase mb-1">
                              Fine Print
                            </p>
                            <ul className="font-body text-xs text-foreground/70 space-y-0.5">
                              {promo.terms.map((t, i) => (
                                <li key={i}>• {t}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <button
                          onClick={() => setFlippedCard(null)}
                          className="mt-3 font-display text-xs tracking-widest uppercase text-primary hover:text-accent transition-colors self-end"
                        >
                          ↺ Flip Back
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Subscribe section */}
        <section className="relative z-20 px-8 md:px-16 pb-12 max-w-3xl mx-auto">
          <div className="newspaper-double-divider h-[5px] mb-8" />
          <div className="text-center">
            <div className="vintage-label text-[10px] mb-3">SUBSCRIBE TO THE PAPER</div>
            <h3 className="font-display text-2xl md:text-3xl text-foreground mb-2">
              Never Miss an Edition
            </h3>
            <p className="font-body text-sm md:text-base text-muted-foreground mb-6 max-w-lg mx-auto">
              Get the freshest offers, event invites, and Fight Night announcements delivered to your inbox — no spam, just the good stuff.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 border-2 border-primary bg-background px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <button type="submit" className="btn-newspaper-filled text-xs">
                Subscribe
              </button>
            </form>
          </div>
        </section>

        {/* End ornament */}
        <section className="relative z-20 text-center px-8 md:px-16 pb-12">
          <div className="flex items-center justify-center gap-2 text-primary mb-2">
            <span className="w-12 h-[1px] bg-primary" />
            <span className="text-2xl">✦</span>
            <span className="w-12 h-[1px] bg-primary" />
          </div>
          <p className="font-display text-sm text-muted-foreground italic tracking-wide mb-6">
            — End of the Offers Bulletin —
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/" className="btn-newspaper-filled text-xs md:text-sm">Back to Home</Link>
            <a href="/#book" className="btn-newspaper text-xs md:text-sm">Book a Table</a>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-20 border-t-2 border-primary py-6 text-center">
          <p className="font-body text-xs text-muted-foreground">
            © 2025 Da Maria Coffee & Music House. All offers subject to availability and house terms.
          </p>
        </footer>
      </div>
    </main>
  );
};

export default Promotions;
