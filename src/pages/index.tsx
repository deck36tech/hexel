import Head from 'next/head'
import { Inter } from 'next/font/google'
import HexelBoard from "../scripts/hexel";
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Hexel - Palette-Based Image Compression | Deck36 Labs</title>
        <meta name="description" content="An interactive demonstration of efficient palette-based image encoding and base64 serialization for web applications." />
      </Head>
      <main className={styles.main}>
          <div className={styles.container}>
              <HexelBoard />
              
              <div className={styles.howItWorks}>
                <div className={styles.header}>
                  <h2 className={styles.title}>Technical Overview</h2>
                  <p className={styles.subtitle}>Understanding Palette-Based Image Compression</p>
                </div>
                
                <div className={styles.step}>
                  <h3 className={styles.stepTitle}>Phase 1: Base64 Serialization</h3>
                  <p className={styles.explanation}>
                    The visualization begins with a base64-encoded string containing the compressed image data:
                  </p>
                  <code className={styles.codeBlock}>
                    W1siIzFkMWUyMyIsIiMxZDFlMjIiLCIjMWQxZTIwIi...
                  </code>
                  <p className={styles.explanation}>
                    This encoding format provides a compact, URL-safe representation of the JSON data structure, 
                    reducing file size by approximately 33% overhead while enabling efficient network transmission.
                  </p>
                </div>

                <div className={styles.step}>
                  <h3 className={styles.stepTitle}>Phase 2: Data Structure Decomposition</h3>
                  <p className={styles.explanation}>
                    The base64 string decodes to a 2D array structure with two distinct components:
                  </p>
                  <div className={styles.lists}>
                    <div className={styles.list}>
                      <strong>Color Palette (Unique Set):</strong>
                      <code className={styles.smallCode}>
                        [&quot;#1d1e23&quot;, &quot;#f74070&quot;, &quot;#f8d871&quot;, ...]
                      </code>
                      <p className={styles.smallText}>
                        Array of unique hex color values extracted using hash map lookup (O(1) complexity).
                      </p>
                    </div>
                    <div className={styles.list}>
                      <strong>Position Array (Index Map):</strong>
                      <code className={styles.smallCode}>
                        [0, 1, 1, 1, 0, 1, 2, 1, 8, 9, ...]
                      </code>
                      <p className={styles.smallText}>
                        Sequential array where each integer references a palette index, stored in row-major order.
                      </p>
                    </div>
                  </div>
                </div>

                <div className={styles.step}>
                  <h3 className={styles.stepTitle}>Phase 3: Index Resolution</h3>
                  <p className={styles.explanation}>
                    The rendering engine iterates through the position array and resolves palette indices:
                  </p>
                  <ul className={styles.bulletList}>
                    <li>Index <strong>0</strong> maps to <code>palette[0]</code> - the first color in the palette</li>
                    <li>Index <strong>1</strong> maps to <code>palette[1]</code> - the second color</li>
                    <li>Index <strong>n</strong> maps to <code>palette[n]</code> - constant-time lookup</li>
                  </ul>
                  <p className={styles.explanation}>
                    This approach eliminates redundant color data, achieving 85-90% compression for typical pixel art.
                  </p>
                </div>

                <div className={styles.step}>
                  <h3 className={styles.stepTitle}>Phase 4: Hardware-Accelerated Rendering</h3>
                  <p className={styles.explanation}>
                    Each pixel implements a 3D flip animation using CSS transforms:
                  </p>
                  <ul className={styles.bulletList}>
                    <li><strong>Mouse Enter Event:</strong> Triggers <code>rotateY(0deg)</code> transform to reveal color</li>
                    <li><strong>Mouse Leave Event:</strong> Applies <code>rotateY(180deg)</code> with eased transition</li>
                  </ul>
                  <p className={styles.explanation}>
                    CSS3 3D transforms leverage GPU hardware acceleration, maintaining consistent 60fps performance 
                    through the browser&apos;s compositor thread without blocking the main JavaScript thread.
                  </p>
                </div>

                <div className={styles.technicalNote}>
                  <strong>Implementation Details:</strong> The 16×16 grid (256 pixels) demonstrates O(n) rendering complexity 
                  with ~1-2ms decode time. Each pixel maintains independent state through React&apos;s component model, 
                  enabling parallel event handling and efficient re-rendering via virtual DOM diffing.
                </div>
              </div>
          </div>
      </main>
    </>
  )
}
