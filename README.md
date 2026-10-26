# Kunj.exe — Cursor-Tracking Avatar Portfolio

An interactive React portfolio featuring an animated avatar video that responds to mouse movement. Move the cursor across the hero to scrub through the video frames and explore the character from different angles.

## Project overview

This project brings an AI-generated avatar to life on the web:

1. **Create an avatar portrait.** Generate a character portrait with an AI image tool such as ChatGPT or Gemini.
2. **Animate the portrait.** Turn the still image into a video using an AI video tool such as Google Flow or Gemini.
3. **Build the interactive scrubber.** Use a coding agent to create a website that connects mouse movement to video playback, then experiment with the code and refine the experience.

## How cursor tracking works

The hero uses the avatar video as its visual background. Mouse movement maps to a position in the video, so the character's view changes with the cursor instead of the video playing continuously. This creates a lightweight, interactive avatar experience.

## Tech stack and tools

- React and Node.js
- Antigravity
- Visual Studio Code
- GitHub Copilot
- ChatGPT
- Vite and Lucide React

## Preview

| Character reference | Portfolio preview |
| --- | --- |
| ![Character reference](docs/images/character-reference.jpg) | ![Portfolio preview](docs/images/portfolio-preview.jpg) |

## Explore the portfolio

Visit [kunjdesai.in](https://kunjdesai.in).

Open to freelance projects and collaborations. Feel free to DM me.

## Inspiration and credit

Original reel inspiration: **@sl_tech_journal**. ❤️

## Run locally

From the project folder, run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`). Vite refreshes the page when source files change.

## Customize the page

- `public/avatar-portrait.png` — front-facing portrait and video poster.
- `public/videos/avatar-turntable.mp4` — avatar video used in the hero.
- `src/App.jsx` — intro timing, hero copy, navigation, interests, and cursor scrubbing.
- `src/styles.css` — animations, portfolio styling, and responsive layout.

To reduce motion, enable your device's **Reduce Motion** accessibility setting; the intro will be skipped. Visitors can also skip it or replay it from the hero.

For smoother frame-by-frame scrubbing, encode the video at a constant frame rate with a short keyframe interval (about 0.1–0.25 seconds). All-intra encoding is smoothest but creates a much larger file.

## Topics

#WebDevelopment #ReactJS #CreativeCoding #CursorTracking #Portfolio

Interactive portfolio website, cursor tracking animation, animated avatar, creative web design, interactive UI, frontend developer, React projects, video scrubber, web animation, modern portfolio design, AI-assisted development, creative coding, personal website, web development experiments, portfolio inspiration.
