import { HeroSection } from '@/components/sections/HeroSection'
import { StoryExperience } from '@/components/sections/StoryExperience'
import { TrustBar } from '@/components/sections/TrustBar'
import { IntentCardsSection } from '@/components/sections/IntentCardsSection'
import { PipelineScrollSection } from '@/components/sections/PipelineScrollSection'
import { IntegrationsSection } from '@/components/sections/IntegrationsSection'
import { ComparisonSection } from '@/components/sections/ComparisonSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { Footer } from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <>
      <main id="main-content">
        <HeroSection />
        <StoryExperience />
        <TrustBar />
        <IntentCardsSection />
        <PipelineScrollSection />
        <IntegrationsSection />
        <ComparisonSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  )
}
