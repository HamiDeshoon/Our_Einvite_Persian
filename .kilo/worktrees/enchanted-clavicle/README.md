# React + TypeScript + Vite

This project is a wedding e‑invite built with React, TypeScript, and Vite. It showcases a modern, accessible design with custom typography, improved colour contrast, subtle animations, a responsive video section, a styled location area, and a live countdown timer.

## Features

- **Distinct typography** – `Great Vibes` (display) paired with `Cormorant Garamond` (serif) and `Source Sans 3` (sans‑serif).
- **Accessible colour palette** – darker taupe (`#5A4632`) for better contrast against the cream background.
- **Fade‑in animations** – applied to major sections (`Hero`, `VideoUpload`, `LocationSection`, `CountdownTimer`, etc.) for a polished entrance.
- **Responsive video upload** – users can upload a local video file or provide a YouTube link (plain‑text file). The component automatically renders an `<iframe>` for YouTube URLs.
- **Styled location section** – includes an animated underline link to Google Maps and uses the `font-display` class for a decorative heading.
- **Live countdown timer** – announces remaining time with `aria‑live="polite"` for screen‑reader users.

## Installation

```bash
# Install dependencies
npm install
```

## Development

```bash
# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

## Build

```bash
# Create a production build
npm run build
```

The output is placed in the `dist/` folder.

## Usage

- **Video section** – click "Upload Video / Provide YouTube Link". Choose a video file or a plain‑text file containing a YouTube URL. The video will display inline; YouTube links are embedded via an `<iframe>`.
- **Location section** – displays the venue address with a clickable link that opens Google Maps in a new tab.
- **Countdown timer** – automatically counts down to the ceremony date (`2026‑08‑13T18:00:00`).

## Changelog

- **2026‑06‑29** – Added `font-display` (Great Vibes), updated colour palette (`--color-taupe`), introduced fade‑in animations, enhanced `VideoUpload` for YouTube embeds, refined `LocationSection` styling, added `aria-live` to `CountdownTimer`, and updated README with usage instructions and changelog.
