# Implementation Plan for UI Enhancements

## Changes Requested:
1. ✅ Change font family for titles (Playfair Display added to Tailwind config)
2. ⏳ Aceternity Timeline UI for About page
3. ⏳ Make TextHoverEffect visible without hover
4. ⏳ Reduce white space in carousel transitions
5. ✅ How to change navbar blur (answered - modify backdrop-blur-sm in FloatingNavbar.jsx line 42)
6. ⏳ Animate numbers in home page sections
7. ⏳ Implement smooth scrolling
8. ⏳ Fade-in animations for sections
9. ⏳ Change navbar outline to light green

## Implementation Steps:

### 1. Font Setup (COMPLETED)
- Added Playfair Display to tailwind.config.js
- Font is now available as `font-serif` class

### 2. Add Google Font Link
Add to index.html in <head>:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
```

### 3. Smooth Scrolling
Add to index.css in @layer base:
```css
html {
  scroll-behavior: smooth;
}
```

### 4. Navbar Border Color
In FloatingNavbar.jsx, change border colors:
- Line 45: `border-white/20` → `border-green-500/40`
- Line 46: `border-white/40` → `border-green-500/50`

### 5. TextHoverEffect Visibility
In TextHoverEffect.jsx, increase initial opacity and stroke width

### 6. Carousel Transition
In ModernHero.jsx, adjust transition timing and opacity values

### 7. Number Animation
Create CountUp component for animating numbers

### 8. Section Fade-in
Add framer-motion animations to all sections

### 9. Aceternity Timeline
Create Timeline component for About page

## Files to Modify:
- index.html (add font link)
- index.css (add smooth scroll)
- FloatingNavbar.jsx (border colors)
- TextHoverEffect.jsx (visibility)
- ModernHero.jsx (transition timing)
- Home.jsx (number animations, section animations)
- About.jsx (timeline component, section animations)
- Contact.jsx (section animations)
- Products.jsx (section animations)

## New Components to Create:
- CountUp.jsx (number animation)
- Timeline.jsx (Aceternity-style timeline)
