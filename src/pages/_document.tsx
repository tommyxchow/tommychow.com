import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en' className='scroll-smooth'>
      <Head>
        <link
          rel='icon'
          type='image/svg+xml'
          href='/assets/images/favicon.svg'
        />
        <link rel='icon' type='image/png' href='/assets/images/favicon.png' />
      </Head>
      <body className='bg-neutral-100 text-neutral-700 selection:bg-sky-600 dark:bg-black dark:text-neutral-300 dark:selection:bg-sky-400 dark:selection:text-neutral-800'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
