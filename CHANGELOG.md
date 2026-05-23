# Milestone 1 - Changes

## Completed
- [X] Fix favicon to jump to top of index.html page
  - Added `id="top"` to the `<body>` tag in `index.html` to create a named anchor target
  - Changed header logo link from `href="/"` (full page reload) to `href="#top"` (in-page scroll, no reload)
  - Restored and updated footer logo to also be a clickable link to `#top`
  - Added `scroll-behavior: smooth` to `style.css` for animated scrolling

## Implementation Plan

### Wire up nav links + add section anchors
- [ ] Add `id="featured"` to the featured section div
- [ ] Add `id="about"` to the about section div
- [ ] Update "Featured" nav link → `#featured`
- [ ] Update "About" nav link → `#about`
- [ ] Rename "Artist" nav link to "Contact" → `./contact.html`

### Phase 2 — Fill missing Featured section data divs
- [ ] Add labeled divs for: Name, Description, Editions, Price, Opens

### Phase 3 — Fix About section button
- [ ] Change one About section button to "Contact Us" → `./contact.html`

### Phase 4 — Add social media icons to footer
- [ ] Add icon library (Bootstrap Icons or FontAwesome)
- [ ] Add social media icon buttons (Twitter/X, Instagram, GitHub)

### Phase 5 — Add middle initial field to contact form
- [ ] Add `col-md-2` middle initial input between first and last name fields

### Phase 6 — Add header + footer to contact page
- [ ] Add sticky nav header (links adjusted for sub-page context)
- [ ] Add footer to contact page

### Phase 7 — Favicon consistency + typo fix
- [ ] Update all pages to use `n-favicon.png`
- [ ] Fix `type=""image/x-icon"` typo in index.html 