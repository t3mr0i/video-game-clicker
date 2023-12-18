'use client'
import Head from 'next/head';
import App from './components/App';
import './globals.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Game Studio Manager</title>
        <link
          rel="stylesheet"
          href="/animate.css" // The path to your animate.css file in the public folder
        />      </Head>
      <App></App>
    </div>
  );
}
