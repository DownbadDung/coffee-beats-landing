import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";

interface TimelineEvent {
  year: string;
  headline: string;
  subhead: string;
  body: string;
  pullQuote?: string;
  image?: string;
  tag: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "2023",
    headline: "A Spark Over Espresso",
    subhead: "The idea that started it all",
    body: "It began with a simple conversation between friends over a double espresso — what if there was a place where the aroma of freshly roasted coffee met the raw energy of live music? A place that felt like home but hit like a concert. That evening, on a napkin stained with coffee rings, the first sketch of Da Maria was born.",
    pullQuote: '"We didn\'t just want to serve coffee. We wanted to serve an experience."',
    tag: "THE GENESIS",
  },
  {
    year: "2024",
    headline: "From Blueprint to Brick",
    subhead: "Building the dream, one wall at a time",
    body: "After months of scouting locations, the perfect space was found — raw, industrial, full of character. The renovation was a labor of love. Vintage fixtures were sourced from flea markets across the country. The bar was hand-built from reclaimed timber. Every corner was designed to tell a story, from the exposed brick walls to the Edison bulbs that hang like constellations overhead.",
    pullQuote: '"Every brick we laid was a promise to the community."',
    tag: "THE BUILD",
  },
  {
    year: "EARLY 2025",
    headline: "The Sound System Arrives",
    subhead: "When the walls finally learned to sing",
    body: "A coffee house is nothing without its soul, and at Da Maria, that soul is music. A premium sound system was installed — carefully tuned to the acoustics of the space. The first test? A local jazz trio playing to an empty room. The sound was so alive, so warm, that the crew stopped working just to listen. That was the moment everyone knew — this place was going to be special.",
    tag: "THE SOUND",
  },
  {
    year: "MID 2025",
    headline: "Doors Open, Hearts Follow",
    subhead: "Grand opening night — standing room only",
    body: "Opening night was electric. The queue wrapped around the block. The espresso machine hissed and sang. A live band played until midnight. Strangers became friends over shared tables and stolen glances. The newspaper reviews the next morning called it 'the most exciting new venue in town.' But for the founders, the real review was the smile on every face that walked through the door.",
    pullQuote: '"The most exciting new venue in town." — City Herald',
    tag: "THE OPENING",
  },
  {
    year: "LATE 2025",
    headline: "The Ring Enters the Arena",
    subhead: "Muay Thai meets mocha — the unexpected twist",
    body: "Just when the city thought they had Da Maria figured out, a Muay Thai ring was installed right in the centre of the venue. It sounds mad. It is mad. But it works. Wednesday nights became fight nights — where the crowd roars over craft lattes and the ring ropes shake with every kick. It's unlike anything the city has ever seen, and that's exactly the point.",
    pullQuote: '"Coffee in one hand, adrenaline in the other."',
    tag: "THE RING",
  },
  {
    year: "2026 & BEYOND",
    headline: "The Story Continues…",
    subhead: "New chapters being written every night",
    body: "Da Maria isn't just a coffee house. It's a living, breathing story — one that's written every night by the musicians who play, the fighters who train, the baristas who pour, and the people who gather. Every cup of coffee is a paragraph. Every live set is a chapter. And the best part? The story is far from over.",
    tag: "THE FUTURE",
  },
];

const OurJourney = () => {
  const [revealedCards, setRevealedCards] = useState<Set<number>>(new Set());
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Intersection observer for reveal-on-scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-idx"));
            if (!isNaN(idx)) {
              setRevealedCards((prev) => new Set(prev).add(idx));
            }
          }
        });
      },
      { threshold: 0.2 }
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleCard = useCallback((idx: number) => {
    setExpandedCard((prev) => (prev === idx ? null : idx));
  }, []);

  return (
    <main className="bg-background paper-texture min-h-screen relative">
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-secondary">
        <div
          className="h-full bg-primary transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Newspaper border frame - static, wraps all content */}
      <div className="m-4 md:m-8 border-2 border-primary relative">
        <div className="absolute inset-1 border border-primary/30 pointer-events-none z-30" />

      {/* Header */}
      <header className="relative z-40 px-8 md:px-16 pt-8 md:pt-12">
        <div className="flex items-center justify-between">
          <Link to="/" className="btn-newspaper text-xs tracking-widest">
            ← HOME
          </Link>
          <div className="text-center">
            <div className="vintage-label text-xs tracking-[0.3em]">SPECIAL EDITION</div>
          </div>
          <div className="w-20" />
        </div>
        <div className="newspaper-divider mt-4 animate-line-grow" />
      </header>

      {/* Masthead */}
      <section className="relative z-20 text-center px-8 md:px-16 pt-10 md:pt-16 pb-6">
        <p className="font-display text-xs md:text-sm tracking-[0.4em] text-muted-foreground uppercase mb-2">
          The Official Chronicle of
        </p>
        <h1 className="font-gothic text-5xl md:text-7xl lg:text-8xl text-primary leading-none animate-flicker">
          DA MARIA
        </h1>
        <div className="flex items-center justify-center gap-4 mt-3 mb-3">
          <span className="w-16 md:w-32 h-[1px] bg-primary" />
          <span className="text-primary text-lg">✦</span>
          <span className="w-16 md:w-32 h-[1px] bg-primary" />
        </div>
        <h2 className="font-display text-2xl md:text-4xl text-foreground italic">
          Our Journey
        </h2>
        <p className="font-body text-base md:text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
          From a napkin sketch to a city landmark — the story of how coffee, music, and a Muay Thai ring
          came together to create something extraordinary.
        </p>

        {/* Decorative dateline */}
        <div className="newspaper-double-divider h-[5px] mt-8 mb-2" />
        <div className="flex justify-between text-[10px] md:text-xs font-display text-muted-foreground tracking-widest uppercase px-2">
          <span>Vol. I — Special Edition</span>
          <span>The Story So Far</span>
          <span>Price: One Espresso</span>
        </div>
        <div className="newspaper-divider mt-2" />
      </section>

      {/* Timeline */}
      <section ref={timelineRef} className="relative z-20 px-6 md:px-16 lg:px-24 pb-16 max-w-6xl mx-auto">
        {/* Vertical timeline line */}
        <div className="absolute left-[2.25rem] md:left-1/2 top-0 bottom-0 w-[2px] bg-primary/20 -translate-x-1/2" />

        {timelineEvents.map((event, idx) => {
          const isRevealed = revealedCards.has(idx);
          const isExpanded = expandedCard === idx;
          const isEven = idx % 2 === 0;

          return (
            <div
              key={idx}
              ref={(el) => { cardRefs.current[idx] = el; }}
              data-idx={idx}
              className={`relative mb-12 md:mb-16 md:flex ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
              {/* Timeline node */}
              <div className="absolute left-[2.25rem] md:left-1/2 -translate-x-1/2 z-10">
                <button
                  onClick={() => toggleCard(idx)}
                  className={`w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center transition-all duration-500 cursor-pointer
                    ${isRevealed ? "bg-primary text-primary-foreground scale-100" : "bg-background text-primary scale-75 opacity-0"}
                    ${isExpanded ? "animate-pulse-glow ring-2 ring-primary/50" : "hover:scale-110"}
                  `}
                  aria-label={`Toggle details for ${event.headline}`}
                >
                  <span className="font-display text-xs font-bold">{idx + 1}</span>
                </button>
              </div>

              {/* Card */}
              <div
                className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] transition-all duration-700
                  ${isEven ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"}
                  ${isRevealed
                    ? isEven
                      ? "opacity-100 translate-x-0 animate-slide-in-left"
                      : "opacity-100 translate-x-0 animate-slide-in-right"
                    : "opacity-0"
                  }
                `}
              >
                {/* Year badge */}
                <div className={`inline-block mb-2 ${isEven ? "md:ml-auto" : ""}`}>
                  <span className="vintage-label text-[10px]">{event.tag}</span>
                </div>

                {/* Year */}
                <div className={`font-display text-3xl md:text-4xl font-bold text-primary mb-1 ${isEven ? "" : ""}`}>
                  {event.year}
                </div>

                {/* Headline */}
                <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-1 leading-tight">
                  {event.headline}
                </h3>
                <p className="font-display text-sm text-muted-foreground italic mb-3">
                  {event.subhead}
                </p>

                {/* Expandable content area */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out
                    ${isExpanded ? "max-h-[600px] opacity-100" : "max-h-24 opacity-90"}
                  `}
                >
                  <p className={`font-body text-base md:text-lg leading-relaxed text-foreground/80 ${isExpanded ? "drop-cap" : ""} ${isEven ? "md:text-right" : "md:text-left"}`}>
                    {event.body}
                  </p>

                  {/* Pull quote - only visible when expanded */}
                  {event.pullQuote && (
                    <div
                      className={`mt-4 transition-all duration-500
                        ${isExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none h-0"}
                      `}
                    >
                      <blockquote
                        className={`border-l-4 border-primary pl-4 py-2 font-display text-lg md:text-xl italic text-primary/80 ${isEven ? "md:border-l-0 md:border-r-4 md:pr-4 md:pl-0 md:text-right" : ""}`}
                      >
                        {event.pullQuote}
                      </blockquote>
                    </div>
                  )}
                </div>

                {/* Read more toggle */}
                <button
                  onClick={() => toggleCard(idx)}
                  className="mt-3 font-display text-xs tracking-widest uppercase text-primary hover:text-accent transition-colors cursor-pointer inline-flex items-center gap-1"
                >
                  {isExpanded ? "— Read Less" : "— Read More ✦"}
                </button>

                {/* Decorative divider under card */}
                <div className={`newspaper-divider mt-4 ${isRevealed ? "animate-line-grow" : ""}`} />
              </div>
            </div>
          );
        })}

        {/* End ornament */}
        <div className="text-center mt-8">
          <div className="flex items-center justify-center gap-2 text-primary">
            <span className="w-12 h-[1px] bg-primary" />
            <span className="text-2xl">✦</span>
            <span className="w-12 h-[1px] bg-primary" />
          </div>
          <p className="font-display text-sm text-muted-foreground italic mt-2 tracking-wide">
            — End of Current Edition —
          </p>
        </div>
      </section>

      {/* Call to action */}
      <section className="relative z-20 text-center px-8 md:px-16 pb-16">
        <div className="newspaper-double-divider h-[5px] mb-8" />
        <h3 className="font-display text-2xl md:text-3xl text-foreground mb-3">
          Be Part of the Next Chapter
        </h3>
        <p className="font-body text-base text-muted-foreground mb-6 max-w-lg mx-auto">
          Every visit writes a new story. Come experience Da Maria — where every moment is worth the headline.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/" className="btn-newspaper-filled text-xs md:text-sm">
            Back to Home
          </Link>
          <a href="/#book" className="btn-newspaper text-xs md:text-sm">
            Book a Table
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 border-t-2 border-primary py-6 text-center">
        <p className="font-body text-xs text-muted-foreground">
          © 2025 Da Maria Coffee & Music House. All rights reserved.
        </p>
      </footer>

      </div>{/* Close newspaper border frame */}
    </main>
  );
};

export default OurJourney;
