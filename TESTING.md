# Testing Guide

## Manual Testing Checklist

### Functional Testing

#### 1. Category Tabs
- [ ] Click "New Pairs" tab - displays new pairs table
- [ ] Click "Final Stretch" tab - displays final stretch table with bonding progress
- [ ] Click "Migrated" tab - displays migrated tokens with migration details
- [ ] Active tab has visual indicator (underline)
- [ ] Tab switching is instant (<100ms)

#### 2. Table Sorting
- [ ] Click "Token" header - sorts by symbol (A-Z, Z-A)
- [ ] Click "Price" header - sorts by price (high-low, low-high)
- [ ] Click "24h %" header - sorts by price change
- [ ] Click "Market Cap" header - sorts by market cap
- [ ] Click "Volume" header - sorts by volume
- [ ] Click "Holders" header - sorts by holders count
- [ ] Click "Bonding" header (Final Stretch only) - sorts by bonding progress
- [ ] Sort direction toggles on second click (arrows change)
- [ ] Sorting maintains smooth animations

#### 3. Tooltips
- [ ] Hover over info icon next to token name - shows tooltip
- [ ] Hover over column headers - shows description tooltip
- [ ] Tooltips appear within 200ms
- [ ] Tooltips disappear when mouse leaves
- [ ] Tooltips don't block other elements

#### 4. Popovers
- [ ] Click on Market Cap value - opens popover
- [ ] Popover shows Market Cap, Volume, Liquidity
- [ ] Click outside popover - closes it
- [ ] Popover positioning is correct (no overflow)
- [ ] Multiple popovers don't overlap

#### 5. Modals
- [ ] Click "View Details" on Migrated tokens - opens modal
- [ ] Modal shows migration status, date, chain, holders
- [ ] Click X button - closes modal
- [ ] Click outside modal - closes modal
- [ ] Press Escape - closes modal
- [ ] Modal has proper backdrop overlay

#### 6. Real-time Updates
- [ ] Price updates occur every 2-5 seconds
- [ ] Updated prices flash green (increase) or red (decrease)
- [ ] Price change color transition is smooth (1s duration)
- [ ] "Real-time Price Updates" indicator pulses
- [ ] Updates continue while viewing different tabs

#### 7. Loading States
- [ ] Initial load shows skeleton loaders
- [ ] Skeleton has shimmer animation
- [ ] Tab switch shows loading state briefly
- [ ] No layout shift when data loads

#### 8. Error Handling
- [ ] Error boundary catches component errors
- [ ] Error message is user-friendly
- [ ] "Try again" button resets state
- [ ] Console errors don't break the app

### Responsive Testing

#### Desktop (1920x1080+)
- [ ] Table displays all columns
- [ ] Comfortable spacing between elements
- [ ] No horizontal scroll
- [ ] Smooth scrolling

#### Tablet (768-1023px)
- [ ] Table remains visible (may need horizontal scroll)
- [ ] Header stays sticky on scroll
- [ ] Touch interactions work
- [ ] Buttons are touch-friendly (min 44px)

#### Mobile (320-767px)
- [ ] Switches to card layout
- [ ] Cards are vertically stacked
- [ ] All information visible in cards
- [ ] Touch interactions work smoothly
- [ ] Modals are full-screen or appropriately sized

### Performance Testing

#### Interaction Speed
- [ ] Tab switching < 100ms
- [ ] Sort action < 100ms
- [ ] Tooltip appear < 200ms
- [ ] Modal open < 300ms
- [ ] Smooth 60fps scrolling

#### Layout Stability
- [ ] No layout shift on page load (CLS = 0)
- [ ] No layout shift when images load
- [ ] No layout shift during price updates
- [ ] No layout shift when opening/closing modals

#### Memory Usage
- [ ] No memory leaks after 5 minutes of use
- [ ] WebSocket cleans up properly
- [ ] No excessive re-renders (check React DevTools)

### Accessibility Testing

#### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Enter/Space activates buttons
- [ ] Escape closes modals and popovers
- [ ] Focus indicators are visible
- [ ] Tab order is logical

#### Screen Reader
- [ ] All images have alt text
- [ ] Button labels are descriptive
- [ ] Table headers are announced
- [ ] Modal titles are announced
- [ ] ARIA attributes are correct

### Cross-Browser Testing

#### Chrome (90+)
- [ ] All features work
- [ ] Animations smooth
- [ ] No console errors

#### Firefox (88+)
- [ ] All features work
- [ ] Animations smooth
- [ ] No console errors

#### Safari (14+)
- [ ] All features work
- [ ] Animations smooth
- [ ] No console errors

#### Edge (90+)
- [ ] All features work
- [ ] Animations smooth
- [ ] No console errors

## Automated Testing

### Lighthouse Testing

#### Desktop
```bash
# Open DevTools > Lighthouse
# Select Desktop
# Run audit
```

Expected scores:
- Performance: ≥ 95
- Accessibility: 100
- Best Practices: 100
- SEO: 100

#### Mobile
```bash
# Open DevTools > Lighthouse
# Select Mobile
# Run audit
```

Expected scores:
- Performance: ≥ 90
- Accessibility: 100
- Best Practices: 100
- SEO: 100

### Build Testing

```bash
# Clean build
rm -rf .next node_modules
npm install
npm run build

# Verify:
# - No TypeScript errors
# - No build warnings
# - Bundle size is reasonable
```

### Type Checking

```bash
# Run TypeScript compiler
npx tsc --noEmit

# Should have no errors
```

### Linting

```bash
# Run ESLint
npm run lint

# Should have no errors
```

## Visual Regression Testing

### Tools
- Percy (free for open source)
- Chromatic (free tier available)
- Manual screenshot comparison

### Process
1. Take screenshots of reference site (axiom.trade/pulse)
2. Take screenshots of your implementation
3. Compare pixel-by-pixel
4. Difference should be ≤ 2px

### Key Screens
- Desktop: All three tabs
- Tablet: All three tabs
- Mobile: Card view, open modal
- Interactions: Tooltip, popover, modal

## Bug Reporting

If you find a bug, report with:

```markdown
**Bug**: [Short description]

**Steps to Reproduce**:
1. Step one
2. Step two
3. Step three

**Expected**: What should happen
**Actual**: What actually happened

**Environment**:
- Browser: Chrome 120
- OS: Windows 11
- Screen: 1920x1080
- Network: Fast 3G throttling

**Screenshots**: [Attach if applicable]
```

## Performance Benchmarks

### Target Metrics
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- First Input Delay (FID): < 100ms
- Time to Interactive (TTI): < 3.8s

### Measurement
```bash
# Use Chrome DevTools > Performance
# Record 5 seconds of interaction
# Check metrics in summary
```

## Regression Testing

After any code changes, verify:
- [ ] All category tabs still work
- [ ] Sorting still works on all columns
- [ ] Real-time updates still occur
- [ ] Mobile layout still switches correctly
- [ ] Build still succeeds
- [ ] No new TypeScript errors
- [ ] No new console warnings
- [ ] Lighthouse scores maintained

## Notes
- Test on real devices when possible (not just DevTools simulation)
- Test with slow network (Fast 3G throttling)
- Test with CPU throttling (4x slowdown)
- Test with browser extensions disabled
- Clear cache between tests for accuracy
