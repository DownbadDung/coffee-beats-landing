import { useEffect, useRef } from "react";
import { MapPin, Clock, Train, Car } from "lucide-react";

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
    <section
      ref={sectionRef}
      id="location"
      className="relative paper-texture py-20 md:py-28 border-t-2 border-primary"
    >
      <div className="max-w-5xl mx-auto px-8 md:px-16">
        {/* Header */}
        <div className="text-center mb-12 reveal opacity-0">
          <span className="vintage-label text-[10px] mb-4 inline-block">
            VISIT THE PRESS ROOM
          </span>
          <h2 className="font-gothic text-4xl md:text-5xl text-primary mt-3">
            Find Us
          </h2>
          <div className="newspaper-double-divider h-[5px] mt-6 max-w-xs mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Map */}
          <div className="reveal opacity-0 animation-delay-200 newspaper-border overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7957!2d103.8590!3d1.2915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19a340000001%3A0x1234567890abcdef!2sMillenia%20Walk!5e0!3m2!1sen!2ssg!4v1700000000000!5m2!1sen!2ssg"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Da Maria Location"
              className="w-full"
            />
          </div>

          {/* Info cards */}
          <div className="space-y-6 reveal opacity-0 animation-delay-400">
            {/* Address */}
            <div className="flex gap-4 items-start">
              <MapPin className="w-5 h-5 text-primary mt-1 shrink-0" />
              <div>
                <h4 className="font-headline text-base font-bold text-foreground mb-1">
                  Address
                </h4>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  Millenia Walk<br />
                  9 Raffles Boulevard<br />
                  Singapore 039596
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-4 items-start">
              <Clock className="w-5 h-5 text-primary mt-1 shrink-0" />
              <div>
                <h4 className="font-headline text-base font-bold text-foreground mb-1">
                  Operating Hours
                </h4>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  Mon – Thu: 10AM – 10PM<br />
                  Fri: 10AM – 12AM<br />
                  Sat: 9AM – 12AM<br />
                  Sun: 9AM – 10PM
                </p>
              </div>
            </div>

            {/* MRT / Transport */}
            <div className="flex gap-4 items-start">
              <Train className="w-5 h-5 text-primary mt-1 shrink-0" />
              <div>
                <h4 className="font-headline text-base font-bold text-foreground mb-1">
                  Getting Here
                </h4>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">Nearest MRT:</span> Promenade (CC4/DT15) — 3 min walk<br />
                  <span className="font-semibold text-foreground">Via Bus:</span> Stops along Raffles Boulevard (Bus 36, 97, 106, 111)<br />
                  Walk through Millenia Walk mall, Level 1.
                </p>
              </div>
            </div>

            {/* Parking */}
            <div className="flex gap-4 items-start">
              <Car className="w-5 h-5 text-primary mt-1 shrink-0" />
              <div>
                <h4 className="font-headline text-base font-bold text-foreground mb-1">
                  Parking
                </h4>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  Park at <span className="font-semibold text-foreground">Millenia Walk Car Park</span> (B1/B2 levels). Enter via Raffles Boulevard or Temasek Boulevard.
                  <br />
                  For carpark charges, please refer to the{" "}
                  <a
                    href="https://www.milleniawalk.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline hover:text-primary/80 transition-colors"
                  >
                    Millenia Walk website
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
