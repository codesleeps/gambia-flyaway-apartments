# Deployment Guide

## GitHub Pages Deployment

This app is configured to deploy automatically to GitHub Pages using GitHub Actions.

### Setup Steps:

1. **Enable GitHub Pages in your repository:**
   - Go to your repository on GitHub
   - Click on "Settings" tab
   - Scroll down to "Pages" section
   - Under "Source", select "GitHub Actions"

2. **Push your changes:**
   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment configuration"
   git push origin main
   ```

3. **Monitor deployment:**
   - Go to the "Actions" tab in your repository
   - Watch the deployment workflow run
   - Once complete, your site will be available at: `https://yourusername.github.io/gambia-flyaway-apartments/`

### Files Added for Deployment:

- `.github/workflows/deploy.yml` - GitHub Actions workflow
- `public/404.html` - SPA routing fallback
- Updated `index.html` - Added SPA routing script
- Updated `vite.config.ts` - Fixed base path configuration

### Troubleshooting:

If you still see a blank page:

1. Check the browser console for errors
2. Verify the repository name matches the base path in `vite.config.ts`
3. Make sure GitHub Pages is enabled and set to use GitHub Actions
4. Check that the workflow completed successfully in the Actions tab

### Local Testing:

To test the production build locally:
```bash
npm run build
npm run preview
```
