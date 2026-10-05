import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeatureBanner } from '@/components/sections/FeatureBanner';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { CategoriesSection } from '@/components/sections/CategoriesSection';
import { ConnectivitySection } from '@/components/sections/ConnectivitySection';
import { LocalDeliverySection } from '@/components/sections/LocalDeliverySection';
import { MapSection } from '@/components/sections/MapSection';
import { BusinessSection } from '@/components/sections/BusinessSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { DashboardSection } from '@/components/sections/DashboardSection';
import { DeliveryPartnerSection } from '@/components/sections/DeliveryPartnerSection';
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
        <ConnectivitySection />
        <LocalDeliverySection />
        <MapSection />
        <BusinessSection />
        <StatsSection />
        <DashboardSection />
        <DeliveryPartnerSection />
      </main>
      <Footer />
    </>
  );
}
