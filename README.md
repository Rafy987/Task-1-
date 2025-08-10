# SkillCraft Landing Page

Simple responsive landing page with a sticky navbar that changes color on scroll.

## Project Structure
- `index.html`: Markup
- `styles.css`: Styles
- `script.js`: Behavior

## Run Locally
- Open `index.html` directly in your browser, or serve the folder:
  - Python: `python3 -m http.server 8000` then open `http://localhost:8000`
  - Node: `npx serve -l 8000` then open `http://localhost:8000`

## Notes
- On scroll beyond 50px, the `scrolled` class is added to `#navbar` for a solid background and shadow.
- On small screens, use the menu button to toggle navigation links.
