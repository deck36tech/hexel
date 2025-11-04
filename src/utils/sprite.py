import json
import base64
from PIL import Image

# Load sprite image
sprite = Image.open("mario.JPG").convert("RGB")

# Extract dimensions
width, height = sprite.size

# Step 1: Collect all colors in order (row by row, left to right)
all_colors = []
for y in range(height):
    for x in range(width):
        # Get pixel color
        color = sprite.getpixel((x, y))
        # Convert RGB color to hex format
        hex_color = '#{:02x}{:02x}{:02x}'.format(color[0], color[1], color[2])
        all_colors.append(hex_color)

# Step 2: Build a unique color palette
unique_colors = []
color_to_index = {}
for color in all_colors:
    if color not in color_to_index:
        color_to_index[color] = len(unique_colors)
        unique_colors.append(color)

# Step 3: Create positions array (indices into the palette)
positions = []
for color in all_colors:
    positions.append(color_to_index[color])

# Step 4: Create the paint-by-numbers format [palette, positions]
paint_by_numbers = [unique_colors, positions]

# Write optimized JSON file
with open('mario.json', 'w') as f:
    json.dump(paint_by_numbers, f)

# Step 5: Create base64 encoded string for direct use in React component
# Use separators to create compact JSON without spaces (matching the original format)
json_string = json.dumps(paint_by_numbers, separators=(',', ':'))
base64_encoded = base64.b64encode(json_string.encode()).decode()

# Write the TypeScript export file (this one can have spaces for readability)
ts_content = f'export const mario_paint_by_numbers = {json.dumps(paint_by_numbers)}'
with open('mario_paint_by_numbers.ts', 'w') as f:
    f.write(ts_content)

# Write a file with the base64 encoded string
with open('mario_base64.txt', 'w') as f:
    f.write(base64_encoded)

print(f"✅ Processed {width}x{height} sprite")
print(f"🎨 Found {len(unique_colors)} unique colors")
print(f"📊 Original format: ~{len(all_colors) * 50} chars (position + color objects)")
print(f"📦 Optimized format: ~{len(json_string)} chars")
print(f"🔐 Base64 encoded: {len(base64_encoded)} chars")
print(f"\nGenerated files:")
print(f"  - mario.json (optimized format)")
print(f"  - mario_paint_by_numbers.ts (TypeScript export)")
print(f"  - mario_base64.txt (base64 string for React)")
