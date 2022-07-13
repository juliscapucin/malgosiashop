import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";

import Layout from "../../components/Layout";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({ content_type: "product" });

  const paths = res.items.map((item) => {
    return { params: { slug: item.fields.slug } };
  });

  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  const res = await client.getEntries({
    content_type: "product",
    "fields.slug": params.slug,
  });

  return {
    props: { product: res.items[0] },
  };
}

export default function ProductDetails({ product }) {
  const {
    title,
    featuredImage1,
    featuredImage2,
    shipping,
    dimensions,
    description,
  } = product.fields;

  return (
    <Layout>
      <main className='product-container'>
        <section className='featured-images'>
          <div className='featured-img-container'>
            <Image
              src={`https:${featuredImage1.fields.file.url}`}
              className='featured-img'
              alt={title}
              layout='fill'
              objectFit='cover'
              objectPosition='center center'
              priority
            />
          </div>
          <div className='featured-img-container'>
            <Image
              src={`https:${featuredImage2.fields.file.url}`}
              className='featured-img'
              alt={title}
              layout='fill'
              objectFit='cover'
              objectPosition='center center'
              priority
            />
          </div>
        </section>
        <section className='product-text'>
          <div className='product-title'>
            <h2>{title}</h2>
          </div>
          <div className='product-description'>
            {documentToReactComponents(description)}
          </div>
          <div className='product-info'>
            <h4>Measurements</h4>
            <ul className='measurements'>
              {dimensions.map((item, index) => {
                return (
                  <li key={index}>
                    <p>{item}</p>
                  </li>
                );
              })}
            </ul>
            <div className='shipping'>
              <p>
                <strong>Ships in {shipping} working days</strong>
              </p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
