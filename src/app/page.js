'use client'
import Head from 'next/head';
import LeonardCookieClicker from './components/LeonardCookieClicker';
import './globals.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Leonard Cookie Clicker</title>
        <link
          rel="stylesheet"
          href="/animate.css"
        />
      </Head>
      <LeonardCookieClicker />
    </div>
  );
}
