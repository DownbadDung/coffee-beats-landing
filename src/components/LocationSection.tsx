import { useEffect, useRef } from "react";
import { MapPin, Clock, Train, Car } from "lucide-react";

const infoCards = [
  {
    icon: MapPin,
    title: "ADDRESS",
    content: (
      <>
        Millenia Walk<br />
        9 Raffles Boulevard<br />
        Singapore 039596
      </>
    ),
  },
  {
    icon: Clock,
    title: "OPERATING HOURS",
    content: (
      <>
        Mon – Thu: 10AM – 10PM<br />
        Fri: 10AM – 12AM<br />
        Sat: 9AM – 12AM<br />
        Sun: 9AM – 10PM
      </>
    ),
  },
  {
    icon: Train,
    title: "GETTING HERE",
    content: (
      <>
        <span className="font-semibold text-foreground">Nearest MRT:</span> Promenade (CC4 / DT15) — 3 min walk<br />
        <span className="font-semibold text-foreground">Via Bus:</span> Stops along Raffles Blvd (36, 97, 106, 111)<br />
        Walk through Millenia Walk mall, Level 1.
      </>
    ),
  },
  {
    icon: Car,
    title: "PARKING",
    content: (
      <>
        Park at <span className="font-semibold text-foreground">Millenia Walk Car Park</span> (B1/B2). Enter via Raffles Blvd or Temasek Blvd.
        <br />
        For carpark charges, please refer to the{" "}
        <a
          href="https://www.milleniawalk.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline hover:text-primary/80 transition-colors"
        >
          Millenia Walk website
        </a>.
      </>
    ),
  },
];

const LocationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("animate-fade-in-up");
        });
      },
      { threshold: 0.1 }
    );
    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="location" className="relative paper-texture py-20 md:py-28">
      {/* Newspaper section separator */}
      <div className="max-w-5xl mx-auto px-8 md:px-16">
        <div className="flex items-center gap-4 mb-16 reveal opacity-0">
          <div className="h-[3px] flex-1 bg-primary" />
          <span className="text-primary text-lg">✦</span>
          <div className="h-[1px] w-8 bg-primary" />
          <span className="text-primary text-lg">✦</span>
          <div className="h-[3px] flex-1 bg-primary" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 md:px-16">
        {/* Header */}
        <div className="text-center mb-14 reveal opacity-0">
          <span className="vintage-label text-[10px] mb-4 inline-block tracking-[0.3em]">
            VISIT THE PRESS ROOM
          </span>
          <h2 className="font-gothic text-4xl md:text-5xl text-primary mt-3">
            Find Us
          </h2>
          <p className="font-body text-sm text-muted-foreground mt-3 italic">
            — Directions to our establishment —
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-[1px] w-16 bg-primary/50" />
            <div className="w-2 h-2 border border-primary rotate-45" />
            <div className="h-[1px] w-16 bg-primary/50" />
          </div>
        </div>

        {/* Map in newspaper frame */}
        <div className="reveal opacity-0 animation-delay-200 mb-12">
          <div className="border-2 border-primary p-1">
            <div className="border border-primary/40 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7957!2d103.8590!3d1.2915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19a340000001%3A0x1234567890abcdef!2sMillenia%20Walk!5e0!3m2!1sen!2ssg!4v1700000000000!5m2!1sen!2ssg"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Da Maria Location"
                className="w-full"
              />
            </div>
          </div>
          <p className="text-center font-headline text-[10px] text-primary/60 mt-2 tracking-widest uppercase">
            — Fig. 1: Our Location at Millenia Walk —
          </p>
        </div>

        {/* Info cards in newspaper column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 reveal opacity-0 animation-delay-400">
          {infoCards.map((card, i) => (
            <div
              key={i}
              className={`p-6 border border-primary/30 relative group hover:bg-primary/5 transition-colors duration-300 ${
                i < 2 ? "md:border-b-0" : ""
              } ${i % 2 === 0 ? "md:border-r-0" : ""}`}
            >
              {/* Corner ornament */}
              <div className="absolute top-2 right-2 text-primary/20 text-xs">✦</div>

              <div className="flex gap-4 items-start">
                <div className="w-9 h-9 border border-primary/40 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <card.icon className="w-4 h-4 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="font-headline text-[11px] font-bold text-primary tracking-[0.2em] mb-2">
                    {card.title}
                  </h4>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {card.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom ornament */}
        <div className="text-center mt-10 reveal opacity-0 animation-delay-600">
          <div className="flex items-center justify-center gap-2">
            <span className="text-primary text-xs">✦</span>
            <span className="text-primary text-xs">✦</span>
            <span className="text-primary text-xs">✦</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
