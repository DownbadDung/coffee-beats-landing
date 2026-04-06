import { useEffect, useRef } from "react";
import heroBg from "@/assets/hero-coffee.jpg";

const HeroSection = () => {
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

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col paper-texture">
      {/* Newspaper border frame */}
      <div className="absolute inset-4 md:inset-8 border-2 border-primary pointer-events-none z-10" />
      <div className="absolute inset-5 md:inset-9 border border-primary/30 pointer-events-none z-10" />

      {/* Top nav bar */}
      <header className="relative z-20 flex items-center justify-between px-8 md:px-16 pt-8 md:pt-12">
        <button className="btn-newspaper text-xs md:text-sm tracking-widest">MENU</button>
        <div className="text-center">
          <div className="vintage-label text-xs tracking-[0.3em]">EST. 2025</div>
        </div>
        <button className="btn-newspaper text-xs md:text-sm tracking-widest">RESERVE</button>
      </header>

      {/* Divider line */}
      <div className="relative z-20 mx-8 md:mx-16 mt-4">
        <div className="newspaper-divider animate-line-grow" />
      </div>

      {/* Main hero content */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-8 md:px-16 py-8 md:py-16">
        {/* Logo / Title with animation */}
        <div className="text-center mb-4 reveal opacity-0">
          <h1 className="font-gothic text-5xl md:text-8xl lg:text-[10rem] text-primary leading-none tracking-wide animate-flicker">
            DA MARIA
          </h1>
          <div className="flex items-center justify-center gap-4 mt-2">
            <span className="w-12 md:w-24 h-[1px] bg-primary" />
            <span className="text-primary text-xl">✦</span>
            <span className="w-12 md:w-24 h-[1px] bg-primary" />
          </div>
          <p className="font-display text-lg md:text-2xl text-primary italic mt-2 tracking-wider">
            Coffee & Music House
          </p>
        </div>

        {/* Tagline */}
        <p className="reveal opacity-0 animation-delay-200 font-body text-xl md:text-3xl text-foreground/80 italic text-center mt-4 max-w-xl">
          "Coffee, music & moments."
        </p>

        {/* Stamp decoration */}
        <div className="absolute right-8 md:right-20 top-1/3 opacity-0 animate-stamp pointer-events-none hidden md:block">
          <div className="w-28 h-28 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center rotate-[-12deg]">
            <div className="text-center text-muted-foreground/40 text-xs font-display">
              <div className="text-[10px] tracking-widest">LIVE MUSIC</div>
              <div className="text-lg font-bold">🎸</div>
              <div className="text-[10px] tracking-widest">NIGHTLY</div>
            </div>
          </div>
        </div>

        {/* Hero image preview */}
        <div className="reveal opacity-0 animation-delay-400 w-full max-w-4xl mt-8 md:mt-12 relative">
          <div className="newspaper-border p-1">
            <img
              src={heroBg}
              alt="Da Maria Coffee House interior"
              width={1920}
              height={1080}
              className="w-full h-48 md:h-72 lg:h-96 object-cover"
            />
          </div>
          <p className="text-center text-muted-foreground text-sm italic mt-2 font-body">
            Recently awarded on Taste Award — Where coffee meets live music
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="reveal opacity-0 animation-delay-600 flex flex-wrap justify-center gap-4 mt-8 md:mt-12">
          <a href="#menu" className="btn-newspaper-filled text-xs md:text-sm">View Menu</a>
          <a href="#book" className="btn-newspaper text-xs md:text-sm">Book a Table</a>
          <a href="#events" className="btn-newspaper text-xs md:text-sm">Event Booking</a>
        </div>

        {/* Opening hours quick glance */}
        <div className="reveal opacity-0 animation-delay-800 mt-8 text-center">
          <div className="vintage-label text-xs mb-3">Opening Hours</div>
          <div className="font-body text-sm md:text-base text-muted-foreground space-y-1">
            <p>Mon – Fri: 8:00 AM – 11:00 PM</p>
            <p>Sat – Sun: 9:00 AM – 12:00 AM</p>
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="relative z-20 mx-8 md:mx-16 mb-4">
        <div className="newspaper-divider" />
      </div>

      {/* Marquee ticker */}
      <div className="relative z-20 overflow-hidden mx-8 md:mx-16 mb-8 py-2">
        <div className="animate-marquee whitespace-nowrap">
          <span className="font-display text-sm text-primary tracking-widest mx-8">
            ✦ LIVE MUSIC EVERY FRIDAY & SATURDAY ✦ ARTISAN COFFEE ✦ MUAY THAI RING COMING SOON ✦ BOOK YOUR PRIVATE EVENT ✦ COFFEE, MUSIC & MOMENTS ✦ LIVE MUSIC EVERY FRIDAY & SATURDAY ✦ ARTISAN COFFEE ✦ MUAY THAI RING COMING SOON ✦ BOOK YOUR PRIVATE EVENT ✦ COFFEE, MUSIC & MOMENTS ✦
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
