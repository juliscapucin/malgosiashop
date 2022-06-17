import { motion } from "framer-motion";

import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, staggerChildren: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.6, staggerChildren: 0.2 },
  },
};

export default function Layout({ children }, props) {
  const { title, description, keywords } = props;
  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      key='child'
    >
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>

      <div className='layout'>
        <header>
          <Link href='/'>
            <div className='logo'>
              <a>
                <img src='/logo.svg' alt='logo' />
              </a>
            </div>
          </Link>
        </header>

        <div className='page-content'>{children}</div>

        <footer>
          <a href='https://juliscapucin.com/' target='_blank'>
            <p>Copyright 2022 Juli Scapucin</p>
          </a>
        </footer>
      </div>
    </motion.div>
  );
}

Layout.defaultProps = {
  title: "Malgosia | Shop",
  description: "Handmade graphic apparel. Made in Amsterdam.",
  keywords: "handmade, graphic apparel, clothing, Amsterdam",
  link: "rel='icon' href='/favicon.ico'",
};
