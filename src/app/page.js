'use client'
import Head from 'next/head';
import GameStudio from './components/GameStudio';
import './globals.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Game Development Studio</title>
        <link
          rel="stylesheet"
          href="/animate.css"
        />
      </Head>
      <GameStudio />
    </div>
  );
}
