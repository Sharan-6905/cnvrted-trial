import { Container } from '@/components/layout/Container'

/**
 * SlackSection — "Join our Slack" as its own static, in-document-flow band.
 *
 * Previously this link lived inside the fixed/floating Nav pill, which is
 * position: fixed and sits on top of whatever content scrolls underneath it
 * — that's what caused it to visually overlap the page. Pulling it out into
 * an ordinary <section> means it scrolls with the page like everything else
 * and can never overlap anything.
 */
export function SlackSection() {
  return (
    <section aria-label="Community" className="bg-background border-y border-border py-10 md:py-12">
      <Container className="flex flex-col items-center gap-4 text-center">
        <p className="text-body text-text-secondary">
          Talk to the team, share feedback, and hear about new signals first.
        </p>
        <a
          href="https://join.slack.com/t/cnvrted/shared_invite/zt-4095523xy-~cLpdY4E3fhQ4_cKvUo8Ug"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-body font-medium text-text-primary hover:text-text-secondary transition-colors duration-[110ms] border border-border rounded-full px-6 py-2.5 hover:border-text-secondary"
        >
          <svg viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ width: 16, height: 16, display: 'block', flexShrink: 0 }}>
            <path d="M19.712.133a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386h5.376V5.52A5.381 5.381 0 0 0 19.712.133m0 14.365H5.376A5.381 5.381 0 0 0 0 19.884a5.381 5.381 0 0 0 5.376 5.387h14.336a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386" fill="#36C5F0"/>
            <path d="M53.76 19.884a5.381 5.381 0 0 0-5.376-5.386 5.381 5.381 0 0 0-5.376 5.386v5.387h5.376a5.381 5.381 0 0 0 5.376-5.387m-14.336 0V5.52A5.381 5.381 0 0 0 34.048.133a5.381 5.381 0 0 0-5.376 5.387v14.364a5.381 5.381 0 0 0 5.376 5.387 5.381 5.381 0 0 0 5.376-5.387" fill="#2EB67D"/>
            <path d="M34.048 54a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386h-5.376v5.386A5.381 5.381 0 0 0 34.048 54m0-14.365h14.336a5.381 5.381 0 0 0 5.376-5.386 5.381 5.381 0 0 0-5.376-5.387H34.048a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386" fill="#ECB22E"/>
            <path d="M0 34.249a5.381 5.381 0 0 0 5.376 5.386 5.381 5.381 0 0 0 5.376-5.386v-5.387H5.376A5.381 5.381 0 0 0 0 34.249m14.336 0v14.364A5.381 5.381 0 0 0 19.712 54a5.381 5.381 0 0 0 5.376-5.387V34.249a5.381 5.381 0 0 0-5.376-5.387 5.381 5.381 0 0 0-5.376 5.387" fill="#E01E5A"/>
          </svg>
          Join our Slack
        </a>
      </Container>
    </section>
  )
}
