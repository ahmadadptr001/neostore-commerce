import AboutUs from "@/components/AboutUs";
import BestSellingProducts from "@/components/BestSellingProducts";
import HeroSection from "@/components/HeroSection";
import SpecialDeels from "@/components/SpecialDeels";

export default function Home() {
  
  return (
    <>
      <HeroSection />
      <BestSellingProducts />
      <SpecialDeels />
      <AboutUs />
    </>
  )
}