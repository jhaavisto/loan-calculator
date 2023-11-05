# Yet another loan calculator

A loan calculator built with React, TypeScript, and Vite.

## Features

- Real-time loan calculations

## Tech Stack

- **Client:** React, TypeScript, Vite
- **CSS:** CSS Modules

## Run Locally

Clone the project

```bash
  git clone https://github.com/your-username/project-name.git
```

Go to the project directory

```bash
  cd project-name
```

Install dependencies

```bash
  npm install
```

Start the development server

```bash
  npm run dev
```

## Environment Variables

To run this project, you may need to add the following environment variables to your .env.local file to fetch correct Euribor interest rates from API Ninjas.

`
VITE_EURIBOR_API_KEY
`

## Deployment

This project is deployed to GitHub Pages.

### Deploying to GitHub Pages

To deploy this React application to GitHub Pages, follow these steps:

Build the application:

```bash
npm run build
```

Deploy it to GitHub Pages using the gh-pages package (make sure it's installed):

```bash
npm run deploy
```

This script is a shorthand for a series of commands that push the build directory to a gh-pages branch on GitHub.

Make sure your package.json includes the correct homepage field:

```json
"homepage": "https://jhaavisto.github.io/loan-calculator/",
```

And that your vite.config.ts file includes the correct base path:

```typescript
// vite.config.ts
export default defineConfig({
  base: '/loan-calculator/',
  // ...other Vite configs
})
```

In your package.json, add a homepage field:

```json
"homepage": "https://yourusername.github.io/project-name/"
```

After updating the configurations, commit your changes, and run the deployment script again.

## Live Application

You can see the live application here: 
[https://jhaavisto.github.io/loan-calculator/](https://jhaavisto.github.io/loan-calculator/)

Feel free to try it out and provide feedback!
