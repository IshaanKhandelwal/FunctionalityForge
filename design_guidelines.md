# CreativeFlow Design Guidelines

## Design Approach

**Hybrid Approach**: Combine shadcn/ui component system with creative, agency-focused visual elements that reflect the platform's purpose - automating creative workflows.

**Design Philosophy**: Professional SaaS foundation with creative agency flair. Balance utility-focused dashboard interfaces with visually engaging landing/marketing elements that showcase the platform's creative industry focus.

**Reference Inspiration**: 
- Dashboard pages: Linear's clean data hierarchy + Notion's card-based layouts
- Landing page: Stripe's restrained elegance + Vercel's gradient treatments
- Overall aesthetic: Modern SaaS with creative industry polish

## Core Design Elements

### A. Typography

**Font System**: System font stack for performance and native feel
- Headings: Bold weights (700-800) for hierarchy
- Body: Regular (400) and Medium (500) weights
- Code/Data: Monospace for metrics and technical content

**Scale**:
- Hero Headlines: text-5xl to text-7xl (48-72px)
- Page Titles: text-4xl (36px)
- Section Headers: text-2xl to text-3xl (24-30px)
- Card Titles: text-lg to text-xl (18-20px)
- Body: text-base (16px)
- Supporting: text-sm (14px)
- Captions: text-xs (12px)

**Hierarchy Emphasis**:
- Use font-bold for primary headings
- Use font-semibold for card titles and labels
- Use font-medium for emphasis within body text
- Maintain generous line-height (leading-relaxed) for readability

### B. Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24, 32
- Component internal padding: p-4, p-6, p-8
- Section spacing: space-y-6, space-y-8
- Page margins: p-4 lg:p-8
- Card gaps: gap-4, gap-6

**Container Strategy**:
- Dashboard content: Full width with sidebar (lg:pl-64)
- Landing page: max-w-7xl centered containers
- Text content: max-w-4xl for optimal reading
- Cards: Natural height, avoid forced viewport constraints

**Grid Patterns**:
- Stats: grid-cols-2 md:grid-cols-4 (metrics cards)
- Projects/Assets: sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
- Split content: lg:grid-cols-2 or lg:grid-cols-3 for mixed layouts

### C. Component Library

**Cards**:
- Primary cards: White background (light) / dark-10% (dark) with subtle border
- Hover state: border-primary/50 with shadow-lg transition
- Internal spacing: p-6 for content, p-4 for compact
- Border radius: rounded-xl for cards, rounded-lg for nested elements

**Buttons**:
- Primary: Purple gradient background with white text
- Hover: Subtle glow effect using shadow-glow
- Secondary: Outlined with border-border
- Icon buttons: size-icon with ghost or outline variants
- Button groups: Consistent gap-2 spacing

**Badges**:
- Status indicators: Use semantic variants (default, secondary, destructive)
- Size variants: Default for body, sm for compact contexts
- Color coding: Success (green), Warning (yellow), Destructive (red), Default (purple)

**Navigation**:
- Sidebar: Fixed 256px width (w-64) on desktop
- Active state: bg-primary with white text and shadow
- Hover state: bg-secondary for inactive items
- Mobile: Slide-in drawer with backdrop blur

**Data Displays**:
- Progress bars: h-2 height with rounded-full ends
- Avatar fallbacks: Use brand gradient or solid colors with initials
- Stat cards: Large numbers (text-3xl) with small trend indicators
- Charts: Minimal, data-focused with primary/accent color scheme

**Forms & Inputs**:
- Input fields: Full-width with border-border and focus:ring-primary
- Search: Icon prefix (pl-9) with muted placeholder
- Filters: Outline buttons in horizontal groups

### D. Color Application

**Existing Color Tokens** (from index.css):
- Primary: Purple (262 83% 58%) - Main brand, CTAs, active states
- Accent: Violet (280 89% 65%) - Secondary actions, highlights
- Success: Green (142 76% 46%)
- Warning: Yellow (38 92% 50%)
- Destructive: Red (0 84% 60%)

**Gradient Usage**:
- Hero backgrounds: var(--gradient-hero) with 10-20% opacity
- Card accents: var(--gradient-primary) for decorative elements
- Icon backgrounds: Gradient backgrounds for feature icons
- CTAs: Primary gradient for important buttons

**Application Strategy**:
- Backgrounds: Keep clean with background/card colors
- Accents: Use gradients sparingly for visual hierarchy
- Text: Gradient text for headlines using bg-clip-text
- Borders: Use border-primary/50 for hover states

## Images

**Hero Section**: 
- Large abstract gradient background overlay (using CSS gradients, not image)
- Optional: Subtle pattern or noise texture for depth
- No photography - keep it clean and modern

**Feature Icons**:
- Use Lucide React icon library exclusively
- Render in 12px rounded containers with gradient backgrounds
- Icon size: w-6 h-6 for features, w-4 h-4 for inline

**Asset Thumbnails**:
- Use gradient placeholders with file type icons
- Maintain 16:9 aspect ratio for video, 1:1 for images
- Hover: Slight scale and opacity overlay

**No Stock Photography**: Platform focuses on gradients, icons, and clean UI rather than photographic imagery.

## Page-Specific Guidelines

### Landing Page (Home)
- Hero: 100vh with gradient overlay, centered content, large typography
- Features: 3-column grid with icon-title-description cards
- Stats: 4-column centered display with large gradient numbers
- CTA: Full-width section with gradient background and centered content
- Spacing: Generous py-24 between sections

### Dashboard Pages
- Header: Sticky top bar with mobile menu toggle
- Page title: text-4xl with subtitle below
- Stats: 4-column grid of metric cards at top
- Content: Mix of 2-column and full-width cards
- Data density: Balance white space with information

### Project/Asset Cards
- Thumbnail: Gradient background with icon (h-48)
- Content: p-6 spacing with clear hierarchy
- Metadata: Small badges and icons with gap-2
- Actions: Ghost/outline buttons in footer
- Hover: Lift effect with shadow-lg

## Animations

**Transitions**: Use transition-all duration-300 for smooth state changes
**Hover Effects**: 
- Cards: Border color change + shadow increase
- Buttons: Built-in shadcn states (no custom needed)
- Icons: Subtle scale (group-hover:scale-110)

**Motion Principles**:
- Keep animations subtle and purposeful
- No loading spinners unless async operations >500ms
- Avoid distracting entrance animations
- Focus on state change feedback

## Accessibility

- Maintain WCAG AA contrast ratios with HSL color system
- Use semantic HTML via shadcn components
- Ensure keyboard navigation works throughout
- Provide clear focus states (ring-primary)
- Include aria-labels for icon-only buttons