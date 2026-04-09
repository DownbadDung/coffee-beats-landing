import { useState, useEffect, useRef } from "react";

const BookNowSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    people: "",
    date: "",
    type: "table",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="book" ref={sectionRef} className="relative paper-texture py-16 md:py-24">
      <div className="absolute inset-4 md:inset-8 border-2 border-primary pointer-events-none" />

      <div className="max-w-5xl mx-auto px-8 md:px-16">
        {/* Header */}
        <div className="text-center mb-12 reveal opacity-0">
          <h2 className="font-gothic text-5xl md:text-8xl text-primary tracking-wide">BOOK NOW</h2>
          <div className="flex items-center justify-center gap-4 mt-3">
            <span className="w-16 h-[1px] bg-primary" />
            <span className="text-primary">✦</span>
            <span className="w-16 h-[1px] bg-primary" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left - Description */}
          <div className="reveal opacity-0 animation-delay-200">
            <div className="drop-cap font-body text-lg leading-relaxed text-foreground/80">
              Step into a world of vibrant tastes and cozy moments. Our tables are set, the kitchen's humming, and something special is always cooking. Whether it's date night or a family feast, your seat is just one click away.
            </div>
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <div>
                  <h4 className="font-display text-sm font-bold text-primary tracking-wider">PRIVATE EVENTS</h4>
                  <p className="font-body text-sm text-muted-foreground">Host your next gathering with us — birthday, corporate, or just because.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div>
                  <h4 className="font-display text-sm font-bold text-primary tracking-wider">LIVE MUSIC BOOKING</h4>
                  <p className="font-body text-sm text-muted-foreground">Want to perform? Reach out through our event form below.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div>
                  <h4 className="font-display text-sm font-bold text-primary tracking-wider">MUAY THAI NIGHTS</h4>
                  <p className="font-body text-sm text-muted-foreground">Coming soon — watch this space for something truly unique.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="reveal opacity-0 animation-delay-400">
            {submitted ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center animate-scale-reveal">
                  <div className="text-4xl mb-3">✦</div>
                  <h3 className="font-display text-2xl text-primary font-bold">Thank You!</h3>
                  <p className="font-body text-muted-foreground mt-2">We'll get back to you shortly.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="vintage-label text-[10px] mb-2 block">NAME</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      required
                      className="w-full bg-secondary/50 border border-primary/20 px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="vintage-label text-[10px] mb-2 block">E-MAIL</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@email.com"
                      required
                      className="w-full bg-secondary/50 border border-primary/20 px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="vintage-label text-[10px] mb-2 block">PHONE NUMBER</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 234 567 890"
                      className="w-full bg-secondary/50 border border-primary/20 px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="vintage-label text-[10px] mb-2 block">PEOPLE</label>
                    <select
                      name="people"
                      value={formData.people}
                      onChange={handleChange}
                      required
                      className="w-full bg-secondary/50 border border-primary/20 px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                    >
                      <option value="">Select</option>
                      <option value="1">1 Person</option>
                      <option value="2">2 Persons</option>
                      <option value="3-4">3–4 Persons</option>
                      <option value="5-8">5–8 Persons</option>
                      <option value="8+">8+ Persons</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="vintage-label text-[10px] mb-2 block">DATE & TIME</label>
                    <input
                      type="datetime-local"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="w-full bg-secondary/50 border border-primary/20 px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="vintage-label text-[10px] mb-2 block">BOOKING TYPE</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full bg-secondary/50 border border-primary/20 px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                    >
                      <option value="table">Table Reservation</option>
                      <option value="event">Private Event</option>
                      <option value="music">Live Music Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="vintage-label text-[10px] mb-2 block">MESSAGE</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Any special requests..."
                    className="w-full bg-secondary/50 border border-primary/20 px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>
                <button type="submit" className="btn-newspaper-filled w-full text-sm animate-pulse-glow">
                  RESERVE NOW
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookNowSection;
