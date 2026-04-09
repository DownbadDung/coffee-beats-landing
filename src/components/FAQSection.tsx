import { useEffect, useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Do you allow walk-ins?",
    a: "Yes! Walk-ins are always welcome. However, we recommend booking a table during peak hours (Friday & Saturday evenings) to guarantee your spot.",
  },
  {
    q: "Is there live music every night?",
    a: "Live music is featured on Friday and Saturday nights. We occasionally host special performances on weekday evenings — follow our Instagram for the latest updates.",
  },
  {
    q: "Age restrictions?",
    a: "All ages are welcome during the day for our café offerings. For evening events with alcohol service, guests must be 18 years and above.",
  },
  {
    q: "Dress code?",
    a: "Smart casual is encouraged. We want you to feel comfortable while enjoying the atmosphere — just no sleeveless tops or slippers, please.",
  },
  {
    q: "Do you serve alcohol?",
    a: "Yes, we offer a curated selection of wines, beers, cocktails, and spirits alongside our full coffee and non-alcoholic beverage menu.",
  },
];

const FAQSection = () => {
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
    <section
      ref={sectionRef}
      id="faq"
      className="relative paper-texture py-20 md:py-28 border-t-2 border-primary"
    >
      <div className="max-w-3xl mx-auto px-8 md:px-16">
        {/* Header */}
        <div className="text-center mb-12 reveal opacity-0">
          <span className="vintage-label text-[10px] mb-4 inline-block">
            READER ENQUIRIES
          </span>
          <h2 className="font-gothic text-4xl md:text-5xl text-primary mt-3">
            Frequently Asked
          </h2>
          <div className="newspaper-double-divider h-[5px] mt-6 max-w-xs mx-auto" />
        </div>

        {/* Accordion */}
        <div className="reveal opacity-0 animation-delay-200">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-primary/30"
              >
                <AccordionTrigger className="font-headline text-left text-base md:text-lg text-foreground hover:text-primary hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground text-sm md:text-base leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
