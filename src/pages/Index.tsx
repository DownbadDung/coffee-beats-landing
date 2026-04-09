import HeroSection from "@/components/HeroSection";
import MenuReserveSection from "@/components/MenuReserveSection";
import GallerySection from "@/components/GallerySection";
import BookNowSection from "@/components/BookNowSection";
import FAQSection from "@/components/FAQSection";
import LocationSection from "@/components/LocationSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <main className="bg-background">
      <HeroSection />
      <MenuReserveSection />
      <GallerySection />
      <BookNowSection />
      <FAQSection />
      <LocationSection />
      <FooterSection />
    </main>
  );
};

export default Index;
