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
              <h3>{title}</h3>
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
    </article>
  );
}
