# Lemon tea 🍋

The best drink in the world!

### Table of content

- [Prerequisite and Installation](#prerequisite-and-installation)
- [Usage](#usage)
- [Build production](#build-production)

---

### Prerequisite and Installation

**Prerequisite**

This repo is using `yarn` for package manager. (Installation: https://classic.yarnpkg.com/en/docs/install)

Also, `node` is using the version `lts/hydrogen -> v18.19.1`. `nvm` is suggested for managing the node versions. (Installation: https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)

**Environment variables**

Before spinning up the web app, you need to set the `API key` for Google Map APIs:

```bash
# .env
VITE_GOOGLE_MAP_API_KEY="<YOUR API KEY HERE>"
```

Alternatively, you can create `.env.local` file in the same directory as `.env`. The value with the same key will override:

```bash
VITE_API_ENDPOINT="<SOME OTHER API ENDPOINT HERE>"
VITE_GOOGLE_MAP_API_KEY="<YOUR API KEY HERE>"
```

**Installation**

Run the following script in order to install all node modules. Then spin up this web app in development mode:

```bash
yarn
yarn dev
```

---

### Usage

1. You will see 2 input boxes for `origin` and `destination`.
2. After input them, click `Go` and get your route!
3. After viewing the route in the map, you can re-submit another pair of `origin` and `destination` to get a new route.

---

### Build production

To create production build of this web app and preview it, run:

```bash
yarn build
yarn preview
```
