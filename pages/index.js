import { createClient } from "contentful";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({ content_type: "product" });

  return {
    props: { products: res.items },
  };
}

export default function Products({ products }) {
  return (
    <Layout>
      <main className='product-list-container'>
        <div className='product-list'>
          {products.map((product) => {
            return <ProductCard key={product.sys.id} {...product.fields} />;
          })}
        </div>
      </main>
      <style jsx>{`
        .product-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          grid-gap: 1rem;
        }
      `}</style>
    </Layout>
  );
}
