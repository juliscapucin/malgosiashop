import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";

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
  const { title, featuredImage, shipping, dimensions, description } =
    product.fields;

  return (
    <main className='product-container'>
      <section className='featured-img-container'>
        <Image
          src={`https:${featuredImage.fields.file.url}`}
          className='featured-img'
          alt={title}
          layout='fill'
          objectFit='cover'
          objectPosition='center center'
          priority
        />
      </section>
      <section className='product-text'>
        <div className='product-title'>
          <h2>{title}</h2>
        </div>
        <div className='product-description'>
          {documentToReactComponents(description)}
        </div>
        <div className='product-info'>
          <p>Ships in {shipping} working days</p>
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
        </div>
      </section>
      <style jsx>{`
        .product-container {
          display: grid;
          grid-template-columns: 2fr 1fr;
          grid-gap: 3rem;
          background-color: white;
          border: 0.001rem solid #e7e5e4;
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
      `}</style>
    </main>
  );
}
