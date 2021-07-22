import Head from 'next/head'
import 'tailwindcss/tailwind.css'
import Navigation from '../components/shared/Navigation'

function MyApp({ Component, pageProps }) {
  return (
    <div className='text-text-primary'>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
      </Head>
      <Navigation />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
