# Token Trading Table - Axiom Trade Clone

A pixel-perfect, production-ready token discovery table built with Next.js 14, featuring real-time WebSocket updates, comprehensive UI interactions, and exceptional performance.

## 🚀 Live Demo

- **Deployed App**: [View on Vercel](https://token-trading-table-dun.vercel.app/)
- **Demo Video**: [Watch on YouTube](https://youtu.be/XSsOOrhRD4U)
- **Repository**: [GitHub](https://github.com/bkp12345/token-trading-table/)


## ✨ Features

### Core Functionality
- ✅ **Three Token Categories**: New Pairs, Final Stretch, Migrated
- ✅ **Real-time Price Updates**: Mock WebSocket with 2-5s intervals
- ✅ **Smooth Price Animations**: Color transitions on price changes
- ✅ **Multi-level Interactions**: Tooltips, Popovers, Modals
- ✅ **Advanced Sorting**: Multi-column sorting with direction toggle
- ✅ **Responsive Design**: 320px to 4K screens
- ✅ **Loading States**: Skeleton, shimmer, progressive loading
- ✅ **Error Boundaries**: Comprehensive error handling

### Technical Highlights
- ⚡ **Performance**: <100ms interactions, Lighthouse score ≥90
- 🎨 **Pixel-Perfect**: ≤2px difference from reference
- 🏗️ **Atomic Architecture**: Highly reusable components
- 📦 **Type Safety**: Strict TypeScript throughout
- 🔄 **State Management**: Redux Toolkit + React Query
- ♿ **Accessibility**: Radix UI primitives

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **State**: Redux Toolkit
- **Data Fetching**: TanStack React Query
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Performance**: React Compiler enabled

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/token-trading-table.git
cd token-trading-table

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🏗️ Project Structure

```
token-trading-table/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # Atomic UI components
│   │   ├── button.tsx
│   │   ├── tooltip.tsx
│   │   ├── popover.tsx
│   │   ├── dialog.tsx
│   │   └── skeleton.tsx
│   ├── table/              # Table components
│   │   ├── TokenTable.tsx
│   │   ├── TokenRow.tsx
│   │   ├── TableHeader.tsx
│   │   └── MobileTokenCard.tsx
│   ├── CategoryTabs.tsx    # Tab navigation
│   ├── ErrorBoundary.tsx   # Error handling
│   └── LoadingStates.tsx   # Loading components
├── store/
│   ├── store.ts            # Redux store configuration
│   ├── slices/
│   │   └── tokenSlice.ts   # Token state management
│   ├── hooks.ts            # Typed Redux hooks
│   └── StoreProvider.tsx   # Redux provider
├── providers/
│   └── ReactQueryProvider.tsx
├── hooks/
│   ├── useTokens.ts        # Token data fetching
│   └── useTableSort.ts     # Sorting logic
├── lib/
│   ├── utils.ts            # Utility functions
│   ├── mockData.ts         # Mock data generation
│   └── mockWebSocket.ts    # WebSocket simulation
├── types/
│   └── token.ts            # TypeScript types
└── public/
    └── placeholder.png     # Fallback image
```

## 🎯 Performance Optimizations

### Code-Level
- ✅ React.memo for all table components
- ✅ useMemo for sorted data
- ✅ useCallback for event handlers
- ✅ React Compiler enabled
- ✅ Debounced/throttled interactions

### Build-Level
- ✅ Next.js automatic code splitting
- ✅ Image optimization
- ✅ CSS purging
- ✅ Compression enabled

### Runtime
- ✅ No layout shifts (CLS = 0)
- ✅ <100ms interaction latency
- ✅ Smooth 60fps animations
- ✅ Lazy loading for modals

## 📱 Responsive Breakpoints

| Screen Size | Layout | Components |
|-------------|--------|------------|
| 320-767px | Mobile | Card-based list |
| 768-1023px | Tablet | Compact table |
| 1024px+ | Desktop | Full table |

## 🧪 Testing

### Lighthouse Scores Target
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📸 Screenshots

### Desktop View 
<img width="1918" height="1037" alt="image" src="https://github.com/user-attachments/assets/80c1418a-a5c5-484c-a789-44bceb623582" />

### Mobile View 
<img width="1917" height="911" alt="image" src="https://github.com/user-attachments/assets/cfab16be-adf0-46de-97e7-bfb4cddbe6c1" />


## 🚢 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Other Platforms
Compatible with any Next.js hosting:
- Netlify
- Railway
- AWS Amplify
- Cloudflare Pages

## 📊 Architecture Decisions

### Why Redux Toolkit?
- Centralized state for WebSocket updates
- DevTools for debugging
- Predictable state mutations

### Why React Query?
- Automatic caching and refetching
- Optimistic updates
- Parallel query execution

### Why Radix UI?
- Unstyled, accessible primitives
- Keyboard navigation
- ARIA compliance

### Why Tailwind CSS?
- Utility-first approach
- Minimal CSS bundle
- Design system consistency

## 🤝 Contributing

Contributions welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

MIT License - feel free to use for commercial projects

---

**Built with ❤️ for the crypto community**
