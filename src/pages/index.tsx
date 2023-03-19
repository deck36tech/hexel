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
          <div>
              <HexelBoard />
          </div>
      </main>
    </>
  )
}
