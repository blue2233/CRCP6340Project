# Milestone 1 - Changes


##### IMPLEMENTATION PLAN

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


##### IN-PROGRESS

## Fix fix contact links + add GitHub icon and link in footer
- [ ] linked the Contact Me' button  → ./contact.html in the About section
- [ ] updated footer section text and changed Contact Us > Contact
- [ ] added github icon in footer that links to my github
- [X] add id"about" to div in About the Artist section so that the 'About' header click works

##### COMPLETED

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
- Add id=featured to the featured section div
- Add id=about to the about section div
- Update Featured nav link → featured
- Update About nav link → #about
- Renamed Artist nav link to About; Contact nav link → ./contact.html

### Modification to splash/hero section [X]
- updated txt + hero art → splash-background-img.png created from .pde sketch
- modified 'overlay div' text alignment → align-items-center + text-center
- removed buttons from hero section 

---

## Bootstrap Typography Classes for `<h4>`

| Class | Property | Value | Example |
|---|---|---|---|
| **Font Weight** | | | |
| `fw-bold` | font-weight | 700 | `<h4 class="fw-bold">` |
| `fw-bolder` | font-weight | bolder (relative) | `<h4 class="fw-bolder">` |
| `fw-semibold` | font-weight | 600 | `<h4 class="fw-semibold">` |
| `fw-medium` | font-weight | 500 | `<h4 class="fw-medium">` |
| `fw-normal` | font-weight | 400 | `<h4 class="fw-normal">` |
| `fw-light` | font-weight | 300 | `<h4 class="fw-light">` |
| `fw-lighter` | font-weight | lighter (relative) | `<h4 class="fw-lighter">` |
| **Font Style** | | | |
| `fst-italic` | font-style | italic | `<h4 class="fst-italic">` |
| `fst-normal` | font-style | normal | `<h4 class="fst-normal">` |
| **Font Size** | | | |
| `fs-1` | font-size | 2.5rem | `<h4 class="fs-1">` |
| `fs-2` | font-size | 2rem | `<h4 class="fs-2">` |
| `fs-3` | font-size | 1.75rem | `<h4 class="fs-3">` |
| `fs-4` | font-size | 1.5rem | `<h4 class="fs-4">` |
| `fs-5` | font-size | 1.25rem | `<h4 class="fs-5">` |
| `fs-6` | font-size | 1rem | `<h4 class="fs-6">` |
| **Text Transform** | | | |
| `text-uppercase` | text-transform | uppercase | `<h4 class="text-uppercase">` |
| `text-lowercase` | text-transform | lowercase | `<h4 class="text-lowercase">` |
| `text-capitalize` | text-transform | capitalize | `<h4 class="text-capitalize">` |
| **Line Height** | | | |
| `lh-1` | line-height | 1 | `<h4 class="lh-1">` |
| `lh-sm` | line-height | 1.25 | `<h4 class="lh-sm">` |
| `lh-base` | line-height | 1.5 | `<h4 class="lh-base">` |
| `lh-lg` | line-height | 2 | `<h4 class="lh-lg">` |
| **Display Headings** | | | |
| `display-1` | font-size | 5rem, lighter | `<h4 class="display-1">` |
| `display-2` | font-size | 4.5rem, lighter | `<h4 class="display-2">` |
| `display-3` | font-size | 4rem, lighter | `<h4 class="display-3">` |
| `display-4` | font-size | 3.5rem, lighter | `<h4 class="display-4">` |
| `display-5` | font-size | 3rem, lighter | `<h4 class="display-5">` |
| `display-6` | font-size | 2.5rem, lighter | `<h4 class="display-6">` |

> Classes can be combined: `<h4 class="fw-semibold fs-5 text-uppercase lh-sm">`

---

### Reworked the Featured and About sections
- add labeled divs for: Name, Description, Editions, Price, Opens
- reworked the 'Featured' section layout using 'features with title' boiler plate bootstrap
- made some edits to the text of the 'About the Artist' section
- created Contact Me button in the bio section