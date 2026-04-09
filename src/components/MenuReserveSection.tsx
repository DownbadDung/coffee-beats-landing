import { useEffect, useRef } from "react";
import galleryDrinks from "@/assets/gallery-drinks.jpg";
import galleryFood from "@/assets/gallery-food.jpg";

const MenuReserveSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const menuCategories = [
    {
      title: "COFFEE",
      items: [
        { name: "Espresso", price: "4.50" },
        { name: "Cappuccino", price: "5.50" },
        { name: "Flat White", price: "5.50" },
        { name: "Cold Brew", price: "6.00" },
        { name: "Affogato", price: "7.00" },
      ],
    },
    {
      title: "BITES",
      items: [
        { name: "Avocado Toast", price: "12.00" },
        { name: "Bruschetta", price: "10.00" },
        { name: "Croissant & Jam", price: "6.50" },
        { name: "Charcuterie Board", price: "18.00" },
        { name: "Tiramisu", price: "9.00" },
      ],
    },
    {
      title: "DRINKS",
      items: [
        { name: "House Wine", price: "8.00" },
        { name: "Craft Beer", price: "7.00" },
        { name: "Aperol Spritz", price: "12.00" },
        { name: "Fresh Juice", price: "6.00" },
        { name: "Signature Cocktail", price: "14.00" },
      ],
    },
  ];

  return (
    <section id="menu" ref={sectionRef} className="relative paper-texture py-16 md:py-24">
      {/* Newspaper border */}
      <div className="absolute inset-4 md:inset-8 border-2 border-primary pointer-events-none" />

      <div className="max-w-6xl mx-auto px-8 md:px-16">
        {/* Section header */}
        <div className="text-center mb-12 reveal opacity-0">
          <div className="newspaper-double-divider h-[5px] mb-8" />
          <h2 className="font-gothic text-4xl md:text-7xl text-primary tracking-wide">MENU</h2>
          <div className="flex items-center justify-center gap-4 mt-3">
            <span className="w-16 h-[1px] bg-primary" />
            <span className="text-primary">✦</span>
            <span className="w-16 h-[1px] bg-primary" />
          </div>
          <p className="font-body text-lg text-muted-foreground italic mt-3">
            Crafted with care, served with soul
          </p>
        </div>

        {/* Menu grid - newspaper column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 reveal opacity-0 animation-delay-200">
          {menuCategories.map((cat, i) => (
            <div
              key={cat.title}
              className={`p-6 md:p-8 ${i < menuCategories.length - 1 ? "md:border-r border-primary/30" : ""} ${i > 0 ? "border-t md:border-t-0 border-primary/30" : ""}`}
            >
              <h3 className="vintage-label text-center mb-6">{cat.title}</h3>
              <div className="space-y-3">
                {cat.items.map((item) => (
                  <div key={item.name} className="flex justify-between items-baseline gap-2">
                    <span className="font-body text-base md:text-lg text-foreground">{item.name}</span>
                    <span className="flex-1 border-b border-dotted border-foreground/20 min-w-[20px] mb-1" />
                    <span className="font-display text-sm text-primary font-semibold">${item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Food images row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 reveal opacity-0 animation-delay-400">
          <div className="newspaper-border p-1">
            <img src={galleryDrinks} alt="Our signature drinks" loading="lazy" width={1024} height={768} className="w-full h-48 md:h-64 object-cover" />
            <p className="text-center text-xs text-muted-foreground italic py-2 font-body">Our signature drinks collection</p>
          </div>
          <div className="newspaper-border p-1">
            <img src={galleryFood} alt="Freshly prepared bites" loading="lazy" width={1024} height={768} className="w-full h-48 md:h-64 object-cover" />
            <p className="text-center text-xs text-muted-foreground italic py-2 font-body">Freshly prepared every day</p>
          </div>
        </div>

        <div className="text-center mt-10 reveal opacity-0 animation-delay-600">
          <a href="#book" className="btn-newspaper-filled text-sm">VIEW FULL MENU</a>
        </div>

        {/* Divider */}
        <div className="newspaper-double-divider h-[5px] mt-16" />

        {/* Live Music & Unique Concept highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="reveal opacity-0 text-center md:text-left">
            <h3 className="font-display text-2xl md:text-3xl text-primary font-bold mb-3">
              Live Music Nights
            </h3>
            <p className="font-body text-base md:text-lg text-foreground/80 leading-relaxed">
              Every Friday & Saturday, our stage comes alive with local bands and acoustic artists. 
              Enjoy your coffee with the soundtrack of the city's best emerging talent.
            </p>
          </div>
          <div className="reveal opacity-0 animation-delay-200 text-center md:text-left">
            <h3 className="font-display text-2xl md:text-3xl text-primary font-bold mb-3">
              Something Unique is Coming
            </h3>
            <p className="font-body text-base md:text-lg text-foreground/80 leading-relaxed">
              We're bringing something you've never seen in a coffee house before — 
              a Muay Thai ring. Stay tuned for an experience that blends caffeine with adrenaline.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuReserveSection;
