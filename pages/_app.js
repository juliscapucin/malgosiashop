import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

import Head from "next/head";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <AnimatePresence exitBeforeEnter>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <Component {...pageProps} key={router.pathname} />
    </AnimatePresence>
  );
}

export default MyApp;
