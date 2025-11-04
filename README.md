# Hexel

A Next.js-based interactive pixel art visualization tool that displays encoded images with 3D flip animations on hover.

## Overview

Hexel is a creative pixel art renderer that decodes base64-encoded color data and displays it as an interactive grid of pixels. Each pixel responds to mouse interactions with smooth 3D flip animations, creating an engaging visual experience.

## Features

- **Base64 Image Encoding**: Images are stored as compressed base64 strings containing:
  - Color palette (hex values)
  - Position array (indices mapping to palette colors)
- **Interactive Pixels**: Hover over pixels to trigger 3D flip animations
- **Responsive Grid**: 16x16 pixel grid (320x320px) with customizable dimensions
- **3D CSS Transforms**: Smooth backface-flip transitions using CSS3
- **Dark Theme**: Retro-inspired UI with dark background and bordered container

## Tech Stack

- **Framework**: Next.js 13.2.4
- **Language**: TypeScript 5.0.2
- **UI Library**: React 18.2.0
- **Styling**: CSS Modules with 3D transforms

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, or pnpm

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the pixel art display.

### Build

Create a production build:

```bash
npm run build
npm start
```

## How It Works

### Image Encoding

The pixel data is encoded as a base64 string containing a 2D array:

```javascript
// Format: [[palette], [positions]]
// palette: array of hex color codes
// positions: array of indices into the palette
```

### Pixel Rendering

1. Base64 string is decoded to reveal the color palette and position array
2. Each position index maps to a specific color in the palette
3. Pixels are rendered in a flex-wrapped grid
4. Mouse interactions trigger CSS transform animations

### Interaction

- **Mouse Enter**: Pixel flips instantly to reveal its color
- **Mouse Leave**: Pixel flips back with smooth animation

## Project Structure

```
hexel/
├── src/
│   ├── pages/
│   │   ├── index.tsx           # Main page component
│   │   ├── _app.tsx            # Next.js app wrapper
│   │   ├── _document.tsx       # HTML document structure
│   │   └── api/
│   │       └── hello.ts        # Sample API route
│   ├── scripts/
│   │   └── hexel.tsx           # Main HexelBoard component
│   └── styles/
│       ├── Home.module.css     # Component styles
│       └── globals.css         # Global styles
├── public/                     # Static assets
├── package.json
└── tsconfig.json
```

## Customization

### Changing the Image

To display a different pixel art image, modify the `base64String` in `src/scripts/hexel.tsx`:

```typescript
const base64String = "YOUR_ENCODED_IMAGE_DATA";
```

### Grid Dimensions

Adjust the grid size in `src/styles/Home.module.css`:

```css
.wrapperInside {
  width: 320px;  /* 16 pixels × 20px */
  height: 320px;
}

.pixel {
  width: 20px;   /* Individual pixel size */
  height: 20px;
}
```

### Animation Timing

Modify transition speeds in the CSS:

```css
.pixel .side {
  transition: transform 0.75s ease-in-out;
}
```

## Future Enhancements

Potential features to add:
- Image upload and auto-encoding
- Export pixel art to PNG/SVG
- Color palette editor
- Variable grid sizes
- Animation presets
- Click-to-lock flip state
- Mobile touch support optimization

## License

This is a personal lab project.

## Contributing

This is an experimental project. Feel free to fork and modify for your own use.
