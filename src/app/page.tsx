import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeatureBanner } from '@/components/sections/FeatureBanner';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { CategoriesSection } from '@/components/sections/CategoriesSection';
import { LocalDeliverySection } from '@/components/sections/LocalDeliverySection';
import { MapSection } from '@/components/sections/MapSection';
import { DownloadSection } from '@/components/sections/DownloadSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeatureBanner />
        <HowItWorksSection />
        <FeaturesSection />
        <CategoriesSection />
        <LocalDeliverySection />
        <MapSection />
        <DownloadSection />
        <StatsSection />
      </main>
      <Footer />
    </>
  );
}
