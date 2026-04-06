import HeroSection from "@/components/HeroSection";
import MenuReserveSection from "@/components/MenuReserveSection";
import GallerySection from "@/components/GallerySection";
import BookNowSection from "@/components/BookNowSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <main className="bg-background">
      <HeroSection />
      <MenuReserveSection />
      <GallerySection />
      <BookNowSection />
      <FooterSection />
    </main>
  );
};

export default Index;
