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

        <meta property='og:url' content='https://www.tommychow.com/' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='Tommy Chow' />
        <meta
          property='og:description'
          content='Software engineer and fried food lover.'
        />
        <meta
          property='og:image'
          content='https://www.tommychow.com/ogimage.png'
        />

        <meta name='twitter:card' content='summary_large_image' />
        <meta property='twitter:domain' content='tommychow.com' />
        <meta property='twitter:url' content='https://www.tommychow.com/' />
        <meta name='twitter:title' content='Tommy Chow' />
        <meta
          name='twitter:description'
          content='Software engineer and fried food lover.'
        />
        <meta
          name='twitter:image'
          content='https://www.tommychow.com/ogimage.png'
        />
      </Head>
      <body className='bg-neutral-100 text-neutral-900 selection:bg-sky-600 selection:text-neutral-100 dark:bg-neutral-950 dark:text-neutral-100 dark:selection:bg-sky-400 dark:selection:text-neutral-900'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
