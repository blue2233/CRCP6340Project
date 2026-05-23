# Milestone 1 - Changes

## Favicon fix [X]
- [X] Fix favicon to jump to top of index.html page
  - Added `id="top"` to the `<body>` tag in `index.html` to create a named anchor target
  - Changed header logo link from `href="/"` (full page reload) to `href="#top"` (in-page scroll, no reload)
  - Restored and updated footer logo to also be a clickable link to `#top`
  - Added `scroll-behavior: smooth` to `style.css` for animated scrolling

## Changes to header + scroll behavior when flavicon is clicked [X]
- changed 'Featured' to text-white
- removed 'Projects'
- added 'Contact'
- added scroll-behavior: smooth; to style.css


### Wire up nav links + add section anchors [X]
- [X] Add `id="featured"` to the featured section div
- [X] Add `id="about"` to the about section div
- [X] Update "Featured" nav link → `#featured`
- [X] Update "About" nav link → `#about`
- [X] Renamed "Artist" nav link to "About"; "Contact" nav link → `./contact.html`

### Fill missing Featured section data divs
- [ ] Add labeled divs for: Name, Description, Editions, Price, Opens

### Fix About section button
- [ ] Change one About section button to "Contact Us" → `./contact.html`

### Add social media icons to footer
- [ ] Add icon library (Bootstrap Icons or FontAwesome)
- [ ] Add social media icon buttons (Twitter/X, Instagram, GitHub)

### Add middle initial field to contact form
- [ ] Add `col-md-2` middle initial input between first and last name fields

### Add header + footer to contact page
- [ ] Add sticky nav header (links adjusted for sub-page context)
- [ ] Add footer to contact page

### Favicon consistency + typo fix
- [ ] Update all pages to use `n-favicon.png`
- [ ] Fix `type=""image/x-icon"` typo in index.html 