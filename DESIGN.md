# Design System: n8n Dashboard

## 1. Product intent
- This product is a local-first operational dashboard for n8n.
- It should help users understand health, failures, active workflows, and recent executions quickly.
- The UX should optimize for clarity, fast scanning, and calm triage.

## 2. Visual theme and atmosphere
- Dark-first, modern, and focused.
- Dense enough for operations work, but not cramped.
- The aesthetic should feel premium and technical without looking cold or enterprise-heavy.
- Accent usage should be selective: warm coral/salmon for primary actions and focus, green for healthy states, amber for warnings, red for failures.

## 3. Color palette and roles
- Background: deep charcoal / blue-black
- Panel surface: slightly lighter charcoal panels with subtle separation
- Primary accent: coral / salmon for major actions and active navigation
- Success: mint-green / emerald
- Warning: warm amber
- Danger: soft red / rose
- Muted text: cool gray-blue

## 4. Typography rules
- Strong, high-contrast headings
- Clean body text with muted secondary copy
- Labels and metadata should be compact and subdued
- Use monospaced styling only for ids, traces, and raw technical values

## 5. Layout principles
- Fixed left navigation on desktop
- Clear top page header with filters/actions on the right
- Main content should use large content panels and analytics cards
- Tables should remain central to workflows and executions views
- Detail drill-downs should use right-side panels on wide layouts

## 6. Component stylings
- Buttons: rounded medium corners, solid coral for primary, dark secondary for neutral actions
- Cards: dark elevated panels with subtle border and soft depth
- Tables: compact, readable, high-contrast rows with restrained separators
- Inputs: dark filled surfaces with subtle borders
- Badges: semantic state pills with restrained color intensity
- Detail drawers/panels: darker side surfaces with clear grouping and stack structure
- Empty/loading/error states: deliberate, quiet, and informative

## 7. Screen-by-screen guidance
- Home: KPI cards, execution trend, recent workflows, active nodes / operational summary
- Workflows: searchable operational table with status and activate/deactivate actions
- Executions: table with strong status chips and right-side execution detail panel
- Instance: health and diagnostics page
- Settings: minimal and practical only

## 8. Interaction rules
- Hover and focus states should be subtle and crisp
- Motion should be minimal and smooth
- Filters should stay obvious but not visually heavy
- Drill-down should feel immediate and preserve context

## 9. Build handoff notes
- Prioritize a strong dark theme first
- Keep the coral accent disciplined so it feels premium, not loud
- Use larger KPI cards and cleaner spacing for the top of the dashboard
- Preserve operational clarity over visual novelty
- Avoid overbuilding charts; one strong chart is better than many weak ones
