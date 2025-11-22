# Deployment Guide

## Prerequisites
- Node.js 18+ installed
- Git account
- Vercel account (free tier works)

## Step 1: Initialize Git Repository

```bash
cd token-trading-table
git add .
git commit -m "Initial commit: Token Trading Table implementation"
```

## Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it: `token-trading-table`
3. Don't initialize with README (we already have one)

```bash
git remote add origin https://github.com/YOUR_USERNAME/token-trading-table.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

### Option A: Via Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Option B: Via Vercel Dashboard

1. Go to [Vercel](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings
5. Click "Deploy"

## Step 4: Record Demo Video

### Setup
1. Open the deployed app in your browser
2. Open browser DevTools (F12)
3. Switch to mobile device simulation (Toggle device toolbar)
4. Start screen recording (OBS, Loom, or browser extension)

### Demo Script (1-2 minutes)
1. **Intro (5s)**: "Token Trading Table - Pixel-perfect Axiom clone"
2. **Desktop View (20s)**:
   - Show all three tabs (New Pairs, Final Stretch, Migrated)
   - Demonstrate sorting by clicking column headers
   - Hover tooltips
   - Click popover on market cap
   - Open modal for migration details
3. **Real-time Updates (15s)**:
   - Point out price changes with color transitions
   - Show the "Real-time Price Updates" indicator
4. **Tablet View (10s)**:
   - Resize to 768px
   - Show table adapts
5. **Mobile View (15s)**:
   - Resize to 375px
   - Show card-based layout
   - Scroll through tokens
   - Open a modal on mobile
6. **Performance (10s)**:
   - Show fast tab switching
   - Demonstrate smooth scrolling
   - Quick sort changes
7. **Outro (5s)**: "Built with Next.js 14, TypeScript, and Tailwind CSS"

### Recording Tools
- **Free**: OBS Studio, Loom (5 min limit)
- **Paid**: Camtasia, ScreenFlow
- **Browser**: Chrome DevTools Recorder

### Upload to YouTube
1. Export video (MP4, 1080p recommended)
2. Upload to YouTube (can be unlisted)
3. Add title: "Token Trading Table - Full Stack Demo"
4. Add description with GitHub repo and deployment links
5. Copy the video link

## Step 5: Update README

## 🚀 Live Demo

- **Deployed App**: [https://token-trading-table-dun.vercel.app/](https://token-trading-table-dun.vercel.app/)

- **Demo Video**: [https://youtube.com/watch?v=YOUR_VIDEO_ID](https://youtu.be/XSsOOrhRD4U)

- **Repository**: [https://github.com/YOUR_USERNAME/token-trading-table
](https://github.com/bkp12345/token-trading-table/)

## Step 6: Test Lighthouse Scores

1. Open deployed app in Chrome Incognito
2. Open DevTools > Lighthouse
3. Run tests for Mobile and Desktop
4. Take screenshots of scores


```bash
mkdir screenshots
# Save lighthouse reports as lighthouse-mobile.png and lighthouse-desktop.png
```

## Step 7: Capture Responsive Screenshots

### Desktop (1920x1080)
```bash
# Use browser DevTools or a screenshot tool
# Save as screenshots/desktop.png
```

### Tablet (768x1024)
```bash
# DevTools > Toggle device toolbar > iPad
# Save as screenshots/tablet.png
```

### Mobile (375x667)
```bash
# DevTools > Toggle device toolbar > iPhone SE
# Save as screenshots/mobile.png
```

### Interactions
- Tooltip: `screenshots/tooltip.png`
- Popover: `screenshots/popover.png`
- Modal: `screenshots/modal.png`

## Step 8: Final Commit

```bash
git add .
git commit -m "Add deployment links, screenshots, and demo video"
git push origin main
```

## Verification Checklist

- [ ] Project builds without errors (`npm run build`)
- [ ] Dev server runs successfully (`npm run dev`)
- [ ] All three tabs work correctly
- [ ] Sorting functions on all columns
- [ ] Real-time price updates visible
- [ ] Tooltips appear on hover
- [ ] Popovers open on click
- [ ] Modals display correctly
- [ ] Responsive on 320px, 768px, and 1920px
- [ ] GitHub repository is public
- [ ] Vercel deployment is live
- [ ] Demo video is uploaded
- [ ] README has all links
- [ ] Screenshots are in repo
- [ ] Lighthouse scores ≥90

## Troubleshooting

### Build fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Deployment fails
- Check Node.js version (18+)
- Verify all dependencies are in package.json
- Check Vercel logs for specific errors

### Video too large
- Reduce resolution to 720p
- Compress with HandBrake
- Keep under 2 minutes

## Support

If you encounter issues:
1. Check Next.js documentation
2. Review Vercel deployment logs
3. Open an issue on GitHub
