import Head from 'next/head'
import { Inter } from 'next/font/google'
import HexelBoard from "../scripts/hexel";
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Hexels</title>
      </Head>
      <main className={styles.main}>
          <div className={styles.container}>
              <HexelBoard />
              
              <div className={styles.howItWorks}>
                <h2 className={styles.title}>🎨 How This Works</h2>
                
                <div className={styles.step}>
                  <h3 className={styles.stepTitle}>Step 1: The Secret Code</h3>
                  <p className={styles.explanation}>
                    It all starts with a <strong>secret message</strong> that looks like gibberish:
                  </p>
                  <code className={styles.codeBlock}>
                    W1siIzFkMWUyMyIsIiMxZDFlMjIiLCIjMWQxZTIwIi...
                  </code>
                  <p className={styles.explanation}>
                    This is called <strong>Base64 encoding</strong> - it&apos;s like a special way to squish a picture into text!
                  </p>
                </div>

                <div className={styles.step}>
                  <h3 className={styles.stepTitle}>Step 2: Decoding the Message</h3>
                  <p className={styles.explanation}>
                    When we decode this secret message, we get two special lists:
                  </p>
                  <div className={styles.lists}>
                    <div className={styles.list}>
                      <strong>🎨 The Paint Box (Palette):</strong>
                      <code className={styles.smallCode}>
                        [&quot;#1d1e23&quot;, &quot;#f74070&quot;, &quot;#f8d871&quot;, ...]
                      </code>
                      <p className={styles.smallText}>These are all the colors we can use!</p>
                    </div>
                    <div className={styles.list}>
                      <strong>🗺️ The Map (Positions):</strong>
                      <code className={styles.smallCode}>
                        [0, 1, 1, 1, 0, 1, 2, 1, 8, 9, ...]
                      </code>
                      <p className={styles.smallText}>These numbers tell us which color goes where!</p>
                    </div>
                  </div>
                </div>

                <div className={styles.step}>
                  <h3 className={styles.stepTitle}>Step 3: Painting by Numbers</h3>
                  <p className={styles.explanation}>
                    The computer reads the map one number at a time:
                  </p>
                  <ul className={styles.bulletList}>
                    <li>Number <strong>0</strong> means &quot;use the 1st color from the paint box&quot;</li>
                    <li>Number <strong>1</strong> means &quot;use the 2nd color&quot;</li>
                    <li>Number <strong>8</strong> means &quot;use the 9th color&quot;</li>
                  </ul>
                  <p className={styles.explanation}>
                    It&apos;s just like paint-by-numbers, but the computer does it super fast! ⚡
                  </p>
                </div>

                <div className={styles.step}>
                  <h3 className={styles.stepTitle}>Step 4: Making it Interactive</h3>
                  <p className={styles.explanation}>
                    Each pixel is like a tiny square card that can flip! When you hover your mouse over it:
                  </p>
                  <ul className={styles.bulletList}>
                    <li>🖱️ <strong>Mouse goes on</strong> → The pixel flips to show its color</li>
                    <li>👋 <strong>Mouse goes away</strong> → The pixel flips back smoothly</li>
                  </ul>
                  <p className={styles.explanation}>
                    This uses CSS 3D transforms - like telling each card to do a backflip in your browser!
                  </p>
                </div>

                <div className={styles.funFact}>
                  <strong>✨ Fun Fact:</strong> The grid above has 256 pixels (16 × 16). 
                  Each one knows its own color and can flip independently!
                </div>
              </div>
          </div>
      </main>
    </>
  )
}
