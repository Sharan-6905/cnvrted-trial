import { HeroSection } from '@/components/sections/HeroSection'
import { TrustBar } from '@/components/sections/TrustBar'
import { PipelineScrollSection } from '@/components/sections/PipelineScrollSection'
import { IntegrationsSection } from '@/components/sections/IntegrationsSection'
import { ComparisonSection } from '@/components/sections/ComparisonSection'
import { FlowchartSection } from '@/components/sections/FlowchartSection'
import { Footer } from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <>
      <main id="main-content">
        <HeroSection />
        <TrustBar />
        <FlowchartSection />
        <PipelineScrollSection />
        <IntegrationsSection />
        <ComparisonSection />
      </main>
      <Footer />
    </>
  )
}
