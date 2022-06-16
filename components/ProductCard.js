import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ title, slug, shipping, thumbnail }) {
  return (
    <article className='card'>
      <div className='thumb-container-outer'>
        <Link href={`/products/${slug}`}>
          <a>
            <div className='thumb-container'>
              <Image
                src={`https:${thumbnail.fields.file.url}`}
                className='thumb-img'
                alt={title}
                layout='fill'
                objectFit='cover'
                objectPosition='center center'
                priority
              />
            </div>
          </a>
        </Link>
      </div>
      <div className='content'>
        <div className='info'>
          <Link href={`/products/${slug}`}>
            <a>
              <h4>{title}</h4>
            </a>
          </Link>
          <p>Ships in {shipping} working days</p>
        </div>
        <div className='buttons-container'>
          <Link href={`/products/${slug}`}>
            <a>View details</a>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .card {
          background-color: white;
          border: 0.001rem solid #e7e5e4;
          padding: 1rem;
        }
        .thumb-container-outer {
          width: 100%;
          height: 20rem;
          overflow: hidden;
        }
        .thumb-container {
          position: relative;
          width: 100%;
          height: 100%;
          transition: all 0.3s linear;
        }
        .thumb-container:hover {
          transform: scale(1.08);
          transition: all 0.3s linear;
        }
        .content {
          padding: 0 0.5rem;
        }
      `}</style>
    </article>
  );
}
