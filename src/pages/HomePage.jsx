import HeroSection from '../components/home/HeroSection'
import FeaturesSection from '../components/home/FeaturesSection'
import StatsSection from '../components/home/StatsSection'
import HowItWorks from '../components/home/HowItWorks'
import MobileAppSection from '../components/home/MobileAppSection'
import TestimonialsSlider from '../components/home/TestimonialsSlider'
import CTASection from '../components/home/CTASection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorks />
      <MobileAppSection />
      <TestimonialsSlider />
      <CTASection />
    </>
  )
}
