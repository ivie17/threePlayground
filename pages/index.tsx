import Head from 'next/head'
import Image from 'next/image'
import CanvasSetup from '../src/components/Canvas'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
     <CanvasSetup/>
    </div>
  )
}
