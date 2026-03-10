import FloatingHearts from '@/components/FloatingHearts';
import BackgroundMusic from '@/components/BackgroundMusic';
import HeroSlider from '@/components/HeroSlider';
import Gallery from '@/components/Gallery';
import AllWishesSection from '@/components/AllWishesSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <FloatingHearts count={15} />
      <BackgroundMusic />

      <HeroSlider />
      <Gallery />
      <AllWishesSection />

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600 relative z-10">
        <p className="text-sm">Made with ❤️ for your special day</p>
      </footer>
    </div>
  );
}



