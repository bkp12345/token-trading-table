# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js 18+ ([Download](https://nodejs.org/))
- Git ([Download](https://git-scm.com/))
- Code editor (VS Code recommended)

### Installation

```bash
# Navigate to the project
cd token-trading-table

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 What You'll See

1. **Header**: "Token Discovery" with real-time indicator
2. **Tabs**: Three categories (New Pairs, Final Stretch, Migrated)
3. **Table**: Tokens with price, market cap, volume, holders
4. **Updates**: Prices change every 2-5 seconds with color flashes

## 🖱️ Try These Features

### Basic Interactions
- **Click tabs**: Switch between token categories
- **Click headers**: Sort by any column (click again to reverse)
- **Hover tooltips**: See token details and column descriptions

### Advanced Interactions
- **Click Market Cap**: Opens popover with detailed stats
- **Click "View Details"** (Migrated tab): Opens modal with migration info
- **Watch prices**: See green/red flashes on updates

### Responsive Testing
- **Press F12**: Open DevTools
- **Click device toggle**: Test mobile/tablet views
- **Resize window**: See layout adapt at 320px, 768px, 1024px

## 📂 Project Structure

```
token-trading-table/
├── app/page.tsx          ← Main page (start here)
├── components/           ← UI components
│   ├── table/           ← Table components
│   └── ui/              ← Base UI components
├── hooks/               ← Custom hooks
├── lib/                 ← Utilities
├── store/               ← Redux store
└── types/               ← TypeScript types
```

## 🔧 Common Commands

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)

# Production
npm run build        # Build for production
npm start           # Run production build

# Code Quality
npm run lint        # Check for linting errors
npx tsc --noEmit    # Check TypeScript types
```

## 🎨 Customize

### Change Colors
Edit `app/globals.css`:
```css
@theme {
  --color-positive: 142 76% 36%;  /* Green for price increases */
  --color-negative: 0 84% 60%;    /* Red for price decreases */
}
```

### Add New Token Category
1. Update `types/token.ts`: Add category type
2. Create mock data in `lib/mockData.ts`
3. Add tab in `components/CategoryTabs.tsx`
4. Add case in `hooks/useTokens.ts`

### Modify Update Interval
Edit `lib/mockWebSocket.ts`:
```typescript
// Change from 2-5s to 1-3s
setInterval(() => {
  this.sendRandomUpdate();
}, Math.random() * 2000 + 1000);  // 1-3 seconds
```

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill
```

### Build fails
```bash
# Clear cache and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### TypeScript errors
```bash
# Check specific file
npx tsc --noEmit <filename>

# Check all files
npx tsc --noEmit
```

### Real-time updates not working
- Check browser console for errors
- Verify WebSocket mock is initialized
- Try refreshing the page

## 📚 Learn More

- **Next.js**: [Documentation](https://nextjs.org/docs)
- **TypeScript**: [Handbook](https://www.typescriptlang.org/docs/)
- **Tailwind CSS**: [Docs](https://tailwindcss.com/docs)
- **Redux Toolkit**: [Guide](https://redux-toolkit.js.org/)
- **React Query**: [Docs](https://tanstack.com/query/latest)

## 🎥 Video Tutorials

### Record Your Demo
1. Install [OBS Studio](https://obsproject.com/) (free)
2. Set recording area to browser window
3. Follow script in `DEPLOYMENT.md`
4. Keep video under 2 minutes
5. Upload to YouTube

## 📝 Documentation Files

- `README.md`: Full project documentation
- `DEPLOYMENT.md`: Deployment instructions
- `TESTING.md`: Testing checklist
- `FEATURES.md`: Complete feature list
- `PROJECT_SUMMARY.md`: Project overview

## ✅ Deployment Checklist

Before deploying:
- [ ] Build succeeds (`npm run build`)
- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] No console errors in browser
- [ ] All tabs work correctly
- [ ] Real-time updates visible
- [ ] Responsive at 320px, 768px, 1920px
- [ ] README updated with your info

## 🆘 Need Help?

1. Check documentation files
2. Review console errors
3. Check [Next.js docs](https://nextjs.org/docs)
4. Open GitHub issue

## 🎉 Next Steps

1. ✅ Project is running locally
2. 🔄 Test all features
3. 📸 Take screenshots
4. 🚀 Deploy to Vercel
5. 🎥 Record demo video
6. 📤 Submit your work

---

**Happy coding!** 🚀
