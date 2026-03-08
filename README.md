# My Site

This project is a React-based portfolio site, migrated to [Vite](https://vitejs.dev/) for a fast and secure development experience.

## Running the Project Locally

To install the required dependencies and start the local development server:

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server

**For the Public (Using Dummy Content):**
If you have cloned this repository, you do not have access to the private blog posts. You can run the site using dummy content:
```bash
npm run dev:public
```

**For the Owner (Using Private Content):**
If you are the owner, first make sure you have cloned the private submodule into `src/private-content/`. Then run:
```bash
npm run dev
```

This will boot up the Vite development server. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload instantly when you make changes.

## Building for Production

To create a production-ready build:

**For the Public (Using Dummy Content):**
```bash
npm run build:public
```

**For the Owner (Using Private Content):**
```bash
npm run build
```

The optimized static assets will be output to the `dist` or `build` folder, ready to be deployed.

## Deployment

This repository is configured with a GitHub Actions workflow (`.github/workflows/release.yml`) to automatically build and deploy the site to GitHub Pages whenever changes are pushed to the `main` branch.
