/**
 * Font configuration.
 *
 * PRODUCTION NOTE — General Sans:
 * General Sans (Pangram Pangram) is a commercial typeface and cannot be loaded
 * via next/font/google. To activate it:
 *   1. Purchase a license at pangrampangram.com
 *   2. Place the WOFF2 files in /public/fonts/:
 *        GeneralSans-Regular.woff2   (weight 400)
 *        GeneralSans-Medium.woff2    (weight 500)
 *        GeneralSans-Semibold.woff2  (weight 600)
 *   3. Comment out the DM_Sans import block below
 *   4. Uncomment the localFont block
 *
 * DM Sans is used as a development stand-in. It shares General Sans's geometric
 * grotesque character and identical weight range (400/500/600), so all
 * component proportions will be accurate enough to develop against.
 */

import { JetBrains_Mono } from 'next/font/google'
import localFont from 'next/font/local'

// ─── Inter — from Cormorant_Garamond,Inter.zip (static weights) ─────────────
export const sans = localFont({
  src: [
    {
      path: '../public/fonts/Inter_24pt-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Inter_24pt-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Inter_24pt-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
})

// ─── Production: General Sans via next/font/local ───────────────────────────
// export const sans = localFont({
//   src: [
//     {
//       path: '../public/fonts/GeneralSans-Regular.woff2',
//       weight: '400',
//       style: 'normal',
//     },
//     {
//       path: '../public/fonts/GeneralSans-Medium.woff2',
//       weight: '500',
//       style: 'normal',
//     },
//     {
//       path: '../public/fonts/GeneralSans-Semibold.woff2',
//       weight: '600',
//       style: 'normal',
//     },
//   ],
//   variable: '--font-sans',
//   display: 'swap',
//   preload: true,
// })

// ─── JetBrains Mono (production-ready, available via Google Fonts) ───────────
export const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-mono',
  display: 'swap',
  preload: false, // Below-the-fold usage — don't block initial render
})
