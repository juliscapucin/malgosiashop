import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

export default function Layout({ children }, props) {
  const { title, description, keywords } = props;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>

      <div className='layout'>
        <header>
          <Link href='/'>
            <div className='logo'>
              <a>
                <Image
                  src='/../public/logo.svg'
                  alt='Malgosia logo'
                  layout='fill'
                  objectFit='cover'
                  objectPosition='center center'
                  priority
                />
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
    </>
  );
}

Layout.defaultProps = {
  title: "Malgosia | Shop",
  description: "Handmade graphic apparel. Made in Amsterdam.",
  keywords: "handmade, graphic apparel, clothing, Amsterdam",
  link: "rel='icon' href='/favicon.ico'",
};
