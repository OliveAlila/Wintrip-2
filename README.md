# Wintrip 2 — Destination & community-inspired travel layout

A frontend-only Wintrip Safaris design concept inspired by the layout of the Leychert municipality reference supplied by the project owner. It adapts the structure for a travel company: a scenic hero, circular shortcuts, latest travel stories, upcoming experiences, a territory/location panel, and a branded footer.

This repository is separate from the original `wintrip-safaris` project.

## Project files

- `index.html` — complete homepage markup and content
- `assets/css/styles.css` — responsive styles
- `assets/js/main.js` — mobile navigation, hero slideshow, experience navigation and demo enquiry interactions
- `vercel.json` — static hosting configuration

The Wintrip logo is referenced from the existing public repository. Destination photography uses Unsplash image URLs as visual placeholders; replace with authorized company photos before a production launch.

## Local preview

Open `index.html` in a browser, or use a static server from the project root:

```bash
npx serve .
```

## Deploy to Vercel

Import this repository in Vercel using Framework Preset **Other**. Leave Build Command and Install Command blank; set Output Directory to `.`. No environment variables or backend services are needed.

## Prototype limitations

All pages and interactions are frontend-only. Contact buttons use email/anchor links; this prototype does not store bookings, inquiries or newsletter subscriptions. Confirm company phone/email details before publishing and replace image placeholders with licensed or company-owned assets.
