import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import EarlyAccessSection from "@/components/EarlyAccessSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <EarlyAccessSection />
    </main>
  );
}
