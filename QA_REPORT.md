# Bangladesh Buildcon 2027 — QA Report

Final verification performed on 9 October 2027 against the production build in this workspace.

## Automated checks

| Check                | Result                                                                |
| -------------------- | --------------------------------------------------------------------- |
| `pnpm run lint`      | Pass — 0 errors, 0 warnings                                           |
| `pnpm run typecheck` | Pass                                                                  |
| `pnpm run build`     | Pass — 40 application routes generated                                |
| `pnpm test`          | Pass — 37 passed, 3 intentional/environment-dependent skips, 0 failed |

The Playwright suite runs against both desktop Chromium and a Pixel 7 mobile profile. It
checks core content, desktop and mobile navigation, public route responses, form controls and
CAPTCHA gating, empty-payload API validation, metadata, robots/sitemap output, internal links,
browser errors, reduced-motion behavior, and horizontal overflow at 320, 375, 390, 414, 768,
1024, 1280, 1440, and 1920 pixels.

## Content and asset audit

- The UI palette was sampled from the supplied brochure artwork and normalized across the
  site: Buildcon red `#C82028`, ink `#201820`, ASK royal blue `#304090`, purple `#6D3288`,
  coral `#E07878`, white, and brochure light grey. Red-to-purple-to-blue gradients reproduce
  the brochure's circular graphic treatment; unrelated cyan and emerald accents were removed.
- Event facts and imagery were sourced from the supplied 2027 brochure and 2025 post-show
  report. Unsupported inherited claims were removed.
- Confirmed event facts: 11th edition; 11-13 November 2027; ICCB Expo Village, Dhaka;
  200+ exhibiting companies, 7,000+ trade visitors, and 10+ participating countries at the
  previous edition.
- Tanzania-only routes, copy, logos, downloads, and stock images were removed from the live
  project. The prior workspace and superseded assets are preserved outside the project in a
  recoverable sibling backup.
- All statically referenced `/images`, `/logos`, and `/downloads` files were checked for
  existence.
- The public exhibitor directory intentionally remains empty until real profiles are approved;
  no fabricated company names are used.

## Functional behavior

- MongoDB remains the primary persistence layer; Google Sheets and email are secondary
  integrations.
- The existing local MongoDB endpoint was unreachable during final QA. Public CMS-backed
  pages correctly fall back to verified static content/empty states. The connection timeout
  is capped at five seconds so an unavailable optional CMS cannot stall public pages for the
  driver's default 30-second window.
- Form UIs, required controls, CAPTCHA gates, and server-side empty-payload validation were
  verified. End-to-end persistence, Sheets sync, notification email delivery, and admin login
  require working production credentials and were not falsely reported as tested.
- The mobile navigation was verified end to end, including submenu expansion and route
  navigation.

## Manual visual QA

The final production homepage was inspected in the in-app browser. The Bangladesh logo is
legible on the dark header, the brochure-derived hero image loads, the event date and venue
are present, and the red/black/white visual system with restrained blue accents is applied.

## Required before launch

- Verify the production MongoDB URI and seed the first admin account.
- Configure and test Google Sheets service-account credentials if lead mirroring is required.
- Configure and test SMTP/OAuth credentials for organiser and visitor emails.
- Verify the production reCAPTCHA domain/key pair; localhost is not accepted by the supplied
  site key, which is expected.
- Perform one controlled submission for each lead form in staging and confirm MongoDB,
  Sheets, and email outcomes.
- Have counsel review the privacy policy, terms, and cookie policy.
- Add final social URLs and analytics identifiers if required.

No external form submission was made during this audit.
