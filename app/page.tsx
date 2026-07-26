import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import CategoriesSection from '@/components/CategoriesSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import TopFavorsSection from '@/components/TopFavorsSection';
import TopSellersSection from '@/components/TopSellersSection';
import AppDownloadSection from '@/components/AppDownloadSection';
import BecomeSellerSection from '@/components/BecomeSellerSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <CategoriesSection />
        <WhyChooseUsSection />
        <TopFavorsSection />
        <TopSellersSection />
        <AppDownloadSection />
        <BecomeSellerSection />
      </main>
      <Footer />
    </>
  );
}
