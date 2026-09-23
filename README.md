# Increcycle

An incremental game about garbage, built with React, TypeScript and Vite.

## Requirements

- [Node.js](https://nodejs.org/) 22 or newer
- npm (comes with Node.js)

## Getting started

```bash
git clone https://github.com/braymen/increcycle.git
cd increcycle
npm install
npm start
```

Then open the URL printed in the terminal (by default http://localhost:5173/increcycle/).

## Scripts

| Command           | What it does                                    |
| ----------------- | ----------------------------------------------- |
| `npm start`       | Runs the dev server with hot reload             |
| `npm run build`   | Type-checks and builds for production to `dist/` |
| `npm run preview` | Serves the production build locally             |
| `npm run lint`    | Lints the code with oxlint                      |

## Deployment

Every push to `main` is built and deployed to GitHub Pages by the workflow in [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

## AI usage

[CLAUDE.md](CLAUDE.md) asks Claude to log each change it makes as a one-line entry in [CLAUDE_CONTRIBUTIONS.md](CLAUDE_CONTRIBUTIONS.md), so AI-assisted work stays easy to track when it is used. The content folder is blocked from claude, so it doesn't try and write or edit content in any way.

## License

[GPL-3.0](LICENSE)
