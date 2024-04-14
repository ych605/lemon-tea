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

**Installation**

Run the following script in order to install all node modules. Then spin up this web app in development mode:

```
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

```
yarn build
yarn preview
```
