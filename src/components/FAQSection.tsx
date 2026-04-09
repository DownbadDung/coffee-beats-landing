import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Do you allow walk-ins?",
    a: "Yes! Walk-ins are always welcome. However, we recommend booking a table during peak hours (Friday & Saturday evenings) to guarantee your spot.",
    icon: "🚶",
  },
  {
    q: "Is there live music every night?",
    a: "Live music is featured on Friday and Saturday nights. We occasionally host special performances on weekday evenings — follow our Instagram for the latest updates.",
    icon: "🎸",
  },
  {
    q: "Age restrictions?",
    a: "All ages are welcome during the day for our café offerings. For evening events with alcohol service, guests must be 18 years and above.",
    icon: "🎂",
  },
  {
    q: "Dress code?",
    a: "Smart casual is encouraged. We want you to feel comfortable while enjoying the atmosphere — just no sleeveless tops or slippers, please.",
    icon: "👔",
  },
  {
    q: "Do you serve alcohol?",
    a: "Yes, we offer a curated selection of wines, beers, cocktails, and spirits alongside our full coffee and non-alcoholic beverage menu.",
    icon: "🍷",
  },
];

const FAQSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section ref={sectionRef} id="faq" className="relative paper-texture py-20 md:py-28">
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

      <div className="max-w-3xl mx-auto px-8 md:px-16">
        {/* Header */}
        <div className="text-center mb-14 reveal opacity-0">
          <span className="vintage-label text-[10px] mb-4 inline-block tracking-[0.3em]">
            READER ENQUIRIES
          </span>
          <h2 className="font-gothic text-4xl md:text-5xl text-primary mt-3">
            Frequently Asked
          </h2>
          <p className="font-body text-sm text-muted-foreground mt-3 italic">
            — The editors respond to your most pressing questions —
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-[1px] w-16 bg-primary/50" />
            <div className="w-2 h-2 border border-primary rotate-45" />
            <div className="h-[1px] w-16 bg-primary/50" />
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-0 reveal opacity-0 animation-delay-200">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="group">
                {/* Top ornament line for first item */}
                {i === 0 && (
                  <div className="flex items-center gap-2 mb-0">
                    <div className="h-[2px] flex-1 bg-primary" />
                    <div className="h-[1px] flex-1 bg-primary mt-[4px]" />
                  </div>
                )}

                <button
                  onClick={() => toggle(i)}
                  className={`w-full text-left py-5 px-4 flex items-center gap-4 transition-all duration-300 hover:bg-primary/5 ${
                    isOpen ? "bg-primary/5" : ""
                  }`}
                >
                  <span className="text-xl shrink-0" role="img" aria-label="icon">
                    {faq.icon}
                  </span>
                  <span className="font-headline text-base md:text-lg text-foreground flex-1 leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Answer with smooth transition */}
                <div
                  className={`overflow-hidden transition-all duration-400 ease-in-out ${
                    isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-4 pb-5 pl-14">
                    <div className="border-l-2 border-primary/40 pl-4">
                      <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed italic">
                        "{faq.a}"
                      </p>
                      <p className="font-headline text-[10px] text-primary/60 mt-2 tracking-widest uppercase">
                        — The Management
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom separator */}
                <div className="flex items-center gap-0">
                  <div className="h-[2px] flex-1 bg-primary" />
                  <div className="h-[1px] flex-1 bg-primary mt-[4px]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom ornament */}
        <div className="text-center mt-10 reveal opacity-0 animation-delay-400">
          <p className="font-body text-xs text-muted-foreground italic">
            Have more questions? Drop us a line at{" "}
            <span className="text-primary font-semibold not-italic">info@notessg.com</span>
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="text-primary text-xs">✦</span>
            <span className="text-primary text-xs">✦</span>
            <span className="text-primary text-xs">✦</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
