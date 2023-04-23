import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link
          rel='icon'
          type='image/svg+xml'
          href='/assets/images/favicon.svg'
        />
        <link rel='icon' type='image/png' href='/assets/images/favicon.png' />
      </Head>
      <body className='bg-neutral-100 text-neutral-900 selection:bg-sky-600 selection:text-neutral-100 dark:bg-neutral-950 dark:text-neutral-100 dark:selection:bg-sky-400 dark:selection:text-neutral-900'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
