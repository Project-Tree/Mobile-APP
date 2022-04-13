import "../styles/globals.css";
import { AppProps } from "next/app";
import { ReactElement } from "react";
import Head from "next/head";

export default function MyApp({
  Component,
  pageProps,
}: AppProps): ReactElement {
  return (
    <>
      <Head>
        <title>Tree</title>
        <link rel="icon" href="/icons/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content="Tree" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="ios status bar color"
        />
        <meta name="apple-mobile-web-app-title" content="Tree" />
        <link rel="apple-touch-icon" href="/icons/logo-144x144.png" />
        <meta name="theme-color" content="#90cdf4" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
