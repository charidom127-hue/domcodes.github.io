# Interactive Resume (Black & Gold)

A single-page interactive CV built with **HTML**, **CSS**, and **JavaScript** only. No build tools required.

## Open the site

1. Open the project folder `Doms Project`.
2. Double-click `index.html` to open it in your browser.

Optional (local server):

```bash
# From this folder, if you have Python installed:
python -m http.server 5500
```

Then visit `http://localhost:5500`.

## Replace placeholders

In `index.html`, search for text in square brackets and replace with your details:


| Placeholder                       | Replace with                               |
| --------------------------------- | ------------------------------------------ |
| `Dominic N Chari`                 | Your name (also update the page `<title>`) |
| `HillbRight Science College`      | Your school                                |
| `[Subject 1]` … `[Subject 9]`     | Your O-level subjects                      |
|                                   | Each corresponding grade                   |
| `charidom127@gmail.com`           | Your email                                 |
| `0776719275`                      | Your phone number                          |
| `Harare/Zimbabwe`                 | Your location                              |
| `[GitHub URL]` / `[LinkedIn URL]` | Your profile links (or remove those rows)  |




## Replace images

Drop your own photos into the `images/` folder using the **same filenames**:


| File             | Purpose                    |
| ---------------- | -------------------------- |
| `hero-bg.jpg`    | Hero background atmosphere |
| `profile.jpg`    | About section portrait     |
| `art-1.jpg`      | Art gallery piece 1        |
| `art-2.jpg`      | Art gallery piece 2        |
| `art-3.jpg`      | Art gallery piece 3        |
| `basketball.jpg` | Basketball activity        |
| `media-club.jpg` | Media club activity        |


No code changes needed if you keep these names. JPG or PNG both work if you also update the file extension in `index.html`.

## Features

- Sticky navigation with active section highlight
- Mobile menu
- Interactive skills panel and animated skill bars
- Art gallery lightbox (click to enlarge, Esc or click outside to close)
- Scroll reveal animations (respects reduced-motion preferences)
- Print-friendly styles for saving as PDF



## Project files

```
index.html   — page structure and content
styles.css   — black & gold theme and layout
script.js    — interactivity
images/      — photos and placeholders
README.md    — this file
```

