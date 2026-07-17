import HeroSection from "@/components/home/HeroSection";
import FeaturedVendors from "@/components/home/FeaturedVendors";
import HowItWorks from "@/components/home/HowItWorks";
import Categories from "@/components/home/Categories";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedVendors />
      <HowItWorks />
      <Categories />
      <Stats />
      <Testimonials />
      <Newsletter />
    </>
  );
}
