# ClaimFlow Final Product Design QA

## Source page path

`/Users/USER/Documents/Codex/2026-07-12/sites-plugin-sites-openai-bundled-2/outputs/ClaimFlow-独立预览.html`

Source SHA-256: `817650d7d019bdc2a365efac6d032ce8d4525bc9d9ee8d4d3a1e72f8bdb9049d`

## Modified page path

`/Users/USER/Documents/Codex/2026-07-12/sites-plugin-sites-openai-bundled-2/outputs/claimflow-final-polish/ClaimFlow-final-preview.html`

## Viewports

- Desktop: 1440 × 900
- Tablet: 768 × 1024
- Mobile: 390 × 844
- Small Mobile: 320 × 568

## States tested

- Hero default and fixed CTA hidden
- Mobile menu open, close button, Escape close, link close
- Fixed CTA visible after Hero
- Fixed CTA hidden when Pilot form enters viewport
- Evidence Package pages 01, 05 and 07
- Form validation errors
- Prototype completion state
- FAQ expanded and collapsed states
- Footer proximity with fixed CTA hidden logic

## Interaction tests

- Five desktop and mobile navigation targets resolve to real matching IDs.
- Mobile menu opens, closes with close button/Escape, and closes after navigation.
- IntersectionObserver controls fixed CTA without high-frequency scroll handlers.
- Evidence Package Previous/Next and ArrowLeft/ArrowRight work; page counter remains accurate.
- Touch swipe handler is present for Evidence Package navigation.
- Required form fields, email format, error text, focus, loading lock and local completion work.
- FAQ uses real buttons, aria-expanded and aria-controls.

## Console errors

Final clean-browser run: 0 errors, 0 warnings.

## Typography findings

- Earlier issue: business metadata and disclaimers used 6–9px text.
- Fix applied: operational metadata is 10–11px minimum; disclaimers and auxiliary copy are 12–13px; form labels are 13px; form controls are 16px; buttons are 14px.
- Post-fix evidence: computed key metadata sizes ranged from 11px to 16px.

## Layout findings

- Earlier issue: fixed mobile CTA appeared immediately and obscured Hero/image content.
- Fix applied: CTA hidden at load, shown only after Hero CTA exits, hidden when Pilot form or Footer is visible; safe-area bottom offset retained.
- Earlier issue: hidden mobile drawer contributed to page width.
- Fix applied: aria-hidden drawer uses display:none; 390px and 320px document overflow both equal 0.

## Color findings

- Navy, white and safety orange brand system retained.
- Error states use border, text and icon/text meaning rather than color alone.
- Focus outline remains visible with high-contrast safety orange.

## Image findings

- Hero image retained with lightweight illustrative Base route → Revised route markup.
- Repeated full-size case image removed.
- Case and PDF photo index use four clearly labeled crops from the same illustrative scene; marked Illustrative Evidence Mockup.
- No customer photo or customer-performance claim is implied.

## Copy findings

- Core headline, Private Pilot and Assisted Workflow retained.
- Security navigation renamed to Example Package and points to the correct section.
- EV-01 through EV-08 visually reconcile the “Eight records” statement.
- Prototype completion now states: “No information was transmitted or stored.”
- Human Review Required, No Legal Advice and No Guaranteed Recovery remain visible.

## Accessibility findings

- Exactly one h1.
- Five navigation links are keyboard-focusable and target existing IDs.
- Mobile menu has aria-label, aria-expanded, aria-controls and Escape handling.
- FAQ buttons have aria-expanded and aria-controls.
- Evidence viewer has tabindex and labeled Previous/Next controls.
- Nine form labels and four required fields are present.
- Validation uses aria-invalid, aria-describedby, text and border treatment.
- All content images have alt; no image is missing alt.
- Reduced-motion disables menu and CTA transitions.
- No keyboard trap observed.
- 320px layout serves as the 200%-zoom resilience proxy for the desktop content hierarchy.

## Earlier issue / Fix applied / Post-fix evidence

| Earlier issue | Fix applied | Post-fix evidence |
|---|---|---|
| Fixed CTA obscured Hero | IntersectionObserver state logic | Hidden at Hero; visible after Hero; hidden at Pilot |
| Package only showed cover | Seven semantic pages + controls | 7 pages; counter tested at 01, 05, 07 |
| Security nav target mismatch | Example Package → #example-package | All five nav targets resolve |
| 6–9px operational copy | Readability override tokens | Key metadata computed at 11–16px |
| Eight records mismatch | EV-01 through EV-08 evidence collage | 8 unique evidence IDs |
| Repeated full photo | Evidence collage and four crops | Hero remains unique full image |
| No mobile navigation | Accessible drawer | Open, close, Escape and link close tested |
| Fake response promise | Local Prototype complete state | No information transmitted or stored |

## Remaining P3 findings

- The four photo records are intentional crops from one generated illustrative scene, not four independent field photographs.
- Evidence Package is a visual prototype, not a downloadable generated PDF.
- Pilot form remains local-only and has no approved CRM/backend.
- Direct project-system integrations remain implementation-specific and are not claimed as available.

## Final result

passed
