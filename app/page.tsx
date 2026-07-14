import { HeroSection } from '@/components/sections/HeroSection'
import { TrustBar } from '@/components/sections/TrustBar'
import { IntegrationsSection } from '@/components/sections/IntegrationsSection'
import { ComparisonSection } from '@/components/sections/ComparisonSection'
import { Footer } from '@/components/layout/Footer'

// HowItWorksSection, IntentCardsSection, and FlowchartSection previously
// repeated the same "how CNVRTED works" explanation in three separate,
// disconnected forms (step list, static signal-card examples, clickable
// flowchart). That story now lives entirely in HeroSection's scroll-scrubbed
// StoryVisual — one continuous sequence instead of three independent retellings.

export default function HomePage() {
  return (
    <>
      <main id="main-content">
        <HeroSection />
        <TrustBar />
        <IntegrationsSection />
        <ComparisonSection />
      </main>
      <Footer />
    </>
  )
}
