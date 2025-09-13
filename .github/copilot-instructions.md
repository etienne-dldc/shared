# Copilot Instructions for Shared Design System

## Project Architecture

This is a **PandaCSS-based React design system** with an interactive playground for component documentation. The architecture follows a Frame-centric design where most UI components (Button, ListItem, Input, MenuItem) extend the base `Frame` component.

### Core Components Hierarchy

- **Frame** (`src/shared/components/frame/Frame.tsx`) - Base component providing styling, sizing, and layout
- **Button/ButtonLike/ButtonLink** - Interactive elements built on Frame
- **FrameGroup** - Container for grouped Frame-based components with automatic dividers
- **ItemContent/ItemContentFragment** - Content layout system for icons, text, and slots

### Key Design Systems

**4px-Based Sizing with Fractional Support:**

```typescript
// Examples: "7", "7_x" (7.5), "7x" (8), "7xx" (9)
TDesignHeight = `${IntRange<2, 13>}${"" | "x"}` | number;
```

**Nested Design Context:**

- `DefaultDesignProvider` - Sets design defaults for child components
- `NestedDefaultDesignProvider` - Multi-level design inheritance for nested components
- Auto-calculation of `contentHeight`, `rounded`, and spacing based on parent context

**Color System:**

- 22 palette colors (red, blue, neutral, etc.) + 5 variants (solid, surface, subtle, ghost, input)
- Uses PandaCSS `colorPalette` tokens for consistent theming

## Development Workflows

### Build & Development

```bash
pnpm dev                    # Start Vite dev server with playground
pnpm panda:codegen          # Generate PandaCSS styles (required before build)
pnpm build                  # Full build: panda + tsc + vite
pnpm typecheck:watch        # Watch mode TypeScript checking
```

### PandaCSS Integration

- **Config:** `panda.config.ts` uses `@dldc/panda-preset`
- **Generated:** `styled-system/` directory (gitignored)
- **CSS:** Import from `styled-system/css` and `styled-system/jsx`
- **Debugging:** `pnpm panda debug <file>` for style analysis

### Documentation Pattern

Stories live in `src/stories/` with associated widgets in `src/widgets/`:

```tsx
// Standard widget pattern
export function FrameBasicWidget() {
  return (
    <Grid css={{ gridTemplateColumns: "subgrid" }}>
      <CodeHighlight language="jsx" theme="dark-plus">
        {printElement(<Frame>Basic Frame</Frame>)}
      </CodeHighlight>
      <Paper css={{ bg: "neutral.900", p: "3" }}>
        <Frame>Basic Frame</Frame>
      </Paper>
    </Grid>
  );
}
```

## Critical Patterns

### Component Creation

When creating Frame-based components:

1. Import `Frame` and extend with `TItemContentFragmentProps` & `TDesignProps`
2. Use `pipePropsSplitters` to separate design, content, and HTML props
3. Wrap with appropriate Ariakit components for accessibility
4. Pass design props to `useContainerDesignProps()` for resolution

### Widget Development

- Use `printElement()` utility instead of manual string templates for code examples
- Follow `Grid gridTemplateColumns="subgrid"` layout pattern
- Include interactive hover states with `HighlightedGrid` when needed
- Place in `src/widgets/` and import in corresponding story

### Styling Approach

- Use PandaCSS `css()` and `cx()` for dynamic styles
- Use `styled-system/jsx` components (Grid, HStack, VStack, Paper)
- Leverage design tokens: `neutral.900`, `colorPalette.600`, etc.
- CSS-in-JS through `css.raw()` and CSS variables for dynamic values

### State Management

- **Jotai** for global state (`jotai`, `jotai-effect`)
- **Ariakit** for component state and accessibility
- Context providers for design system inheritance

## File Organization

```
src/
├── shared/           # Core design system
│   ├── components/   # Reusable components (Frame, Button, etc.)
│   ├── design/       # Types, sizing, and styling utilities
│   ├── finder/       # Navigation pattern for multi-panel UIs
│   └── utils/        # Shared utilities and contexts
├── widgets/          # Interactive documentation components
├── stories/          # Component documentation pages
└── playground/       # Development playground with routing
```

## Integration Points

- **Icons:** `@phosphor-icons/react` - consistent icon library
- **Routing:** Custom history-based routing for playground navigation
- **Accessibility:** Ariakit for ARIA compliance and keyboard navigation
- **Scrolling:** OverlayScrollbars for custom scroll behavior
- **Code Generation:** `printElement()` utility for JSX string representation

## Testing & Quality

- **TypeScript:** Strict mode with `tsx` compilation
- **ESLint:** Custom config with PandaCSS plugin rules
- **Prettier:** Code formatting (via plugins)
- **Type Safety:** Extensive use of branded types and strict token validation
