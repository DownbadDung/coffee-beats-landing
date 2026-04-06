import { useState, useEffect, useRef, useCallback } from "react";
import galleryInterior from "@/assets/gallery-interior.jpg";
import galleryDrinks from "@/assets/gallery-drinks.jpg";
import galleryLiveband from "@/assets/gallery-liveband.jpg";
import galleryCrowd from "@/assets/gallery-crowd.jpg";
import galleryFood from "@/assets/gallery-food.jpg";
import heroCoffee from "@/assets/hero-coffee.jpg";

const tabs = [
  { key: "all", label: "ALL" },
  { key: "interior", label: "INTERIOR" },
  { key: "food", label: "FOOD & DRINKS" },
  { key: "music", label: "LIVE BAND" },
  { key: "crowd", label: "ATMOSPHERE" },
];

const allImages = [
  { src: galleryInterior, alt: "Interior shot of Da Maria", category: "interior" },
  { src: galleryDrinks, alt: "Signature drinks", category: "food" },
  { src: galleryLiveband, alt: "Live band performing", category: "music" },
  { src: galleryCrowd, alt: "Crowd & atmosphere", category: "crowd" },
  { src: galleryFood, alt: "Delicious food", category: "food" },
  { src: heroCoffee, alt: "Cozy coffee shop", category: "interior" },
];

const GallerySection = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const filteredImages = activeTab === "all" ? allImages : allImages.filter((img) => img.category === activeTab);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % filteredImages.length);
  }, [filteredImages.length]);

  useEffect(() => {
    setCurrentSlide(0);
  }, [activeTab]);

  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [nextSlide]);

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
    <section id="gallery" ref={sectionRef} className="relative paper-texture py-16 md:py-24">
      <div className="absolute inset-4 md:inset-8 border-2 border-primary pointer-events-none" />

      <div className="max-w-6xl mx-auto px-8 md:px-16">
        {/* Newspaper header */}
        <div className="text-center mb-10 reveal opacity-0">
          <div className="newspaper-double-divider h-[5px] mb-8" />
          <div className="flex items-center justify-center gap-4 mb-2">
            <span className="w-12 h-[2px] bg-primary" />
            <span className="vintage-label text-[10px] tracking-[0.4em]">THE DAILY</span>
            <span className="w-12 h-[2px] bg-primary" />
          </div>
          <h2 className="font-gothic text-4xl md:text-7xl text-primary tracking-wide">GALLERY</h2>
          <p className="font-body text-lg text-muted-foreground italic mt-2">
            A glimpse into our world
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 reveal opacity-0 animation-delay-200">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`font-display text-xs md:text-sm tracking-widest px-4 py-2 border transition-all duration-300 ${
                activeTab === tab.key
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Auto slider */}
        <div className="reveal opacity-0 animation-delay-400 relative overflow-hidden newspaper-border">
          <div className="relative w-full h-64 md:h-96 lg:h-[500px]">
            {filteredImages.map((img, i) => (
              <img
                key={img.alt + i}
                src={img.src}
                alt={img.alt}
                loading="lazy"
                width={1024}
                height={768}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  i === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>

          {/* Slide indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {filteredImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-2 h-2 md:w-3 md:h-3 border border-primary-foreground transition-all ${
                  i === currentSlide ? "bg-primary-foreground" : "bg-primary-foreground/30"
                }`}
              />
            ))}
          </div>

          {/* Nav arrows */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + filteredImages.length) % filteredImages.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 border border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
          >
            ‹
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % filteredImages.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 border border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
          >
            ›
          </button>
        </div>

        {/* Caption */}
        <p className="text-center text-sm text-muted-foreground italic mt-3 font-body">
          {filteredImages[currentSlide]?.alt}
        </p>

        {/* Thumbnail strip */}
        <div className="flex gap-2 mt-4 overflow-x-auto gallery-scroll reveal opacity-0 animation-delay-600">
          {filteredImages.map((img, i) => (
            <button
              key={img.alt + i}
              onClick={() => setCurrentSlide(i)}
              className={`flex-shrink-0 w-20 h-14 md:w-28 md:h-20 border-2 overflow-hidden transition-all ${
                i === currentSlide ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        <div className="newspaper-double-divider h-[5px] mt-12" />
      </div>
    </section>
  );
};

export default GallerySection;
