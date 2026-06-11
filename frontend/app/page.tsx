import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/sections/hero'
import { HowItWorksSection } from '@/components/sections/how-it-works'
import { EarlyDetectionSection } from '@/components/sections/early-detection'
import { ModelPerformanceSection } from '@/components/sections/model-performance'
import { AboutSection } from '@/components/sections/about'
import { Footer } from '@/components/footer'

export default function Page() {
  return (
    <main className="w-full">
      <Navigation />
      <HeroSection />
      <HowItWorksSection />
      <EarlyDetectionSection />
      <ModelPerformanceSection />
      <AboutSection />
      <Footer />
    </main>
  )
}
