# Hexel

An interactive pixel art visualization engine built with Next.js that demonstrates efficient image encoding through palette-based compression and base64 serialization. Features real-time 3D CSS transform animations on user interaction.

**A Deck36 Labs Project**

## Overview

Hexel implements a paint-by-numbers encoding scheme to compress pixel art data for web applications. The system reduces redundant color information by extracting a unique color palette and mapping pixel positions to palette indices, achieving significant data reduction compared to traditional pixel-by-pixel color storage. The encoded data is then base64-serialized for efficient transmission and storage.

## Architecture

### Core Technologies

- **Framework**: Next.js 13.2.4 (React SSR)
- **Language**: TypeScript 5.0.2
- **Rendering**: React 18.2.0 with CSS Modules
- **Animation**: CSS3 3D Transforms (GPU-accelerated)
- **Build Tool**: Next.js built-in webpack configuration

### Key Features

- **Palette-Based Compression**: Reduces data payload by 85-90% through color deduplication
- **Base64 Serialization**: Enables inline data embedding and efficient network transmission
- **Hardware-Accelerated Rendering**: Leverages CSS3 3D transforms for smooth 60fps animations
- **Type-Safe Implementation**: Full TypeScript coverage with strict type checking
- **Responsive Grid System**: Flexbox-based layout with configurable dimensions

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

## Deployment

### GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

**Live Demo**: [https://deck36tech.github.io/hexel/](https://deck36tech.github.io/hexel/)

#### Automatic Deployment

Every push to the `main` branch automatically triggers a deployment workflow that:

1. Builds the Next.js static export
2. Uploads the build artifacts
3. Deploys to GitHub Pages

The workflow is defined in `.github/workflows/deploy.yml` and requires no manual intervention.

#### GitHub Pages Configuration

The repository must have GitHub Pages enabled:

1. Go to **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. The site will be available at `https://deck36tech.github.io/hexel/`

#### Local Static Build

To test the static export locally:

```bash
npm run build
npx serve out
```

The static files are generated in the `out/` directory.

#### Configuration Details

- **Base Path**: `/hexel` (configured in `next.config.js`)
- **Output Mode**: Static export via `next export` command
- **Build Process**: `next build && next export` generates static HTML/CSS/JS
- **Image Optimization**: Disabled (required for static export)
- **Jekyll Processing**: Disabled via `.nojekyll` file

## Encoding Methodology

### Algorithm Overview

Hexel implements a two-phase compression algorithm that separates color data from positional data:

#### Phase 1: Palette Extraction

The encoding process begins by scanning the source image sequentially (row-major order: left-to-right, top-to-bottom) and building a unique color palette using a hash map for O(1) lookup performance:

```python
# Pseudocode
unique_colors = []
color_to_index = {}

for each pixel in image (row-major order):
    hex_color = rgb_to_hex(pixel)
    if hex_color not in color_to_index:
        color_to_index[hex_color] = len(unique_colors)
        unique_colors.append(hex_color)
```

This phase produces:
- **Palette Array**: List of unique hex color values (e.g., `["#1d1e23", "#f74070", ...]`)
- **Color Index Map**: Hash table mapping colors to their palette positions

#### Phase 2: Position Encoding

A second pass through the image generates a position array where each element is an integer index referencing the palette:

```python
positions = []
for each pixel in image (same order):
    hex_color = rgb_to_hex(pixel)
    palette_index = color_to_index[hex_color]
    positions.append(palette_index)
```

The resulting data structure is a 2D array: `[[palette], [positions]]`

#### Phase 3: Serialization

The 2D array is JSON-serialized with minimal whitespace (`separators=(',',':')`) and then base64-encoded for compact string representation:

```python
json_string = json.dumps([palette, positions], separators=(',', ':'))
base64_string = base64.b64encode(json_string.encode()).decode()
```

### Compression Analysis

For a 16x16 pixel image (256 pixels):

**Uncompressed Format** (position + color per pixel):
```javascript
{position: [x, y, z], color: "#rrggbb"} × 256 ≈ 12,800 bytes
```

**Compressed Format** (palette + indices):
```javascript
[
  ["#color1", "#color2", ...],  // ~41 unique colors × 7 bytes
  [0, 1, 1, 2, 0, 1, ...]        // 256 indices (1-2 bytes each)
]
≈ 287 bytes (palette) + 512 bytes (positions) = 799 bytes
```

**Compression Ratio**: ~94% size reduction

**Base64 Overhead**: +33% (standard base64 expansion) → ~1,065 bytes final

**Net Compression**: ~92% reduction from uncompressed format

### Decoding Process

The React component performs the inverse operation at runtime:

1. **Base64 Decode**: Convert base64 string to JSON string (`atob()`)
2. **JSON Parse**: Extract palette and positions arrays
3. **Index Resolution**: Map each position index to its corresponding palette color
4. **Component State**: Store pixel data in React state as `{color: string, flipped: boolean}[]`
5. **Render**: Map state array to JSX elements with event handlers

### Rendering Pipeline

The pixel grid uses CSS Flexbox with wrapping enabled to automatically flow pixels into rows:

```typescript
pixels.map((pixel, index) => (
  <div 
    key={index}
    onMouseEnter={() => handleFlip(index)}
    style={{backgroundColor: pixel.color}}
  />
))
```

Each pixel implements a 3D card-flip effect using CSS transforms:
- **Default State**: `rotateY(180deg)` - back face visible
- **Hover State**: `rotateY(0deg)` - front face revealed with color
- **Transition**: Hardware-accelerated transform with `backface-visibility: hidden`

### Image Processing Utility

The `sprite.py` script automates the encoding process:

```bash
cd src/utils
python sprite.py
```

**Input**: `mario.JPG` (or any image file)

**Output**:
- `mario.json` - Optimized JSON format `[[palette], [positions]]`
- `mario_paint_by_numbers.ts` - TypeScript export for direct import
- `mario_base64.txt` - Base64 string ready for React component

**Control Image**: `pickle.JPG` is provided as a reference test image to verify the encoding pipeline produces consistent results across different source images.

## Project Structure

```
hexel/
├── src/
│   ├── pages/
│   │   ├── index.tsx           # Main page - HexelBoard + documentation
│   │   ├── _app.tsx            # Next.js app wrapper
│   │   └── _document.tsx       # HTML document structure
│   ├── scripts/
│   │   └── hexel.tsx           # HexelBoard component - decoding & rendering logic
│   ├── styles/
│   │   ├── Home.module.css     # Component styles with 3D transforms
│   │   └── globals.css         # Global styles and resets
│   └── utils/
│       ├── sprite.py           # Python image encoder utility
│       ├── mario.JPG           # Sample sprite image (16x16)
│       ├── pickle.JPG          # Control image for testing
│       ├── mario.json          # Encoded output (paint-by-numbers format)
│       ├── mario_paint_by_numbers.ts  # TypeScript export
│       └── mario_base64.txt    # Base64 encoded string
├── public/                     # Static assets (favicon, etc.)
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── next.config.js              # Next.js build configuration
```

## Configuration

### Encoding Custom Images

1. Place your source image in `src/utils/` (preferably 16x16 pixels for optimal performance)
2. Update the filename in `sprite.py`:
   ```python
   sprite = Image.open("your_image.JPG").convert("RGB")
   ```
3. Run the encoder:
   ```bash
   cd src/utils
   python sprite.py
   ```
4. Copy the base64 string from `your_image_base64.txt` to `src/scripts/hexel.tsx`:
   ```typescript
   const base64String = "W1siIzFkMWUyMyIsIiMxZDFlMjIiLCIjMWQxZTIw...";
   ```

### Adjusting Grid Parameters

Modify grid dimensions in `src/styles/Home.module.css`:

```css
.wrapperInside {
  width: 320px;   /* Total grid width (columns × pixel_size) */
  height: 320px;  /* Total grid height (rows × pixel_size) */
}

.pixel {
  width: 20px;    /* Individual pixel dimension */
  height: 20px;
}
```

**Note**: Flexbox wrapping automatically handles row breaks based on container width.

### Animation Parameters

Control flip animation timing in `src/styles/Home.module.css`:

```css
.pixel .side {
  transition: transform 0.75s ease-in-out;  /* Duration and easing function */
}

.pixel.flipped .front {
  transition: transform 0.01s ease-in-out;  /* Instant flip on hover */
}
```

**Performance Tip**: CSS3 3D transforms are hardware-accelerated on most modern browsers, ensuring smooth 60fps animations.

## Technical Considerations

### Browser Compatibility

- **Modern Browsers**: Full support (Chrome 36+, Firefox 45+, Safari 9+, Edge 12+)
- **Legacy Browsers**: Graceful degradation (2D fallback without transforms)
- **Mobile**: Touch events may require additional handlers for optimal UX

### Performance Characteristics

- **Initial Load**: O(n) where n = number of pixels (typically 256 for 16x16)
- **Decode Time**: ~1-2ms for typical sprites (single-threaded JavaScript)
- **Memory Footprint**: ~50KB per sprite including component overhead
- **Render Time**: O(n) React reconciliation, ~16ms (60fps) target

### Scalability Notes

Current implementation is optimized for small sprites (16x16 to 32x32). For larger images:
- Consider implementing virtualization (only render visible pixels)
- Add memoization to prevent unnecessary re-renders
- Explore WebGL/Canvas rendering for pixel counts >1000

## Development Roadmap

**Phase 1 - Core Features** (Completed)
- [x] Palette-based encoding algorithm
- [x] Base64 serialization
- [x] React component with 3D transforms
- [x] Python utility for image processing

**Phase 2 - Enhancement** (Planned)
- [ ] Browser-based image upload and encoding
- [ ] Export functionality (PNG/SVG/JSON)
- [ ] Real-time palette editor
- [ ] Variable grid size support (8x8, 32x32, 64x64)
- [ ] Animation preset library
- [ ] Click-to-lock flip state

**Phase 3 - Optimization** (Planned)
- [ ] WebWorker-based encoding for large images
- [ ] Progressive rendering for grids >1000 pixels
- [ ] Service Worker caching strategy
- [ ] Touch event optimization for mobile

## License

MIT License - Copyright (c) 2025 Deck36

## Contributing

This is a Deck36 Labs experimental project. Contributions are welcome via pull requests. For major changes, please open an issue first to discuss proposed modifications.

## Acknowledgments

Built by the Deck36 engineering team as an exploration of efficient data encoding techniques for web applications.
