import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
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
      <style jsx>{`
        .product-container {
          display: grid;
          grid-template-columns: 2fr 1fr;
          grid-gap: 3rem;
          background-color: white;
          border: 0.001rem solid #e7e5e4;
        }
        .featured-images {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 1px;
          border-right: 0.001rem solid #e7e5e4;
        }
        .featured-img-container {
          position: relative;
          width: 100%;
          height: 40rem;
          display: flex;
          flex-direction: column;
        }
        .product-title {
          margin: 4rem 0 2rem 0;
        }
        .product-text {
          padding-right: 2rem;
        }
        .shipping {
          margin: 2rem 0;
        }
      `}</style>
    </Layout>
  );
}
