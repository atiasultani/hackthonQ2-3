// pages/products/[id].js
import { client } from '../../lib/sanity';
import { useRouter } from 'next/router';
import Image from 'next/image';

const ProductDetails = ({ product }) => {
  const router = useRouter();

  // If the page is loading (initially or while waiting for query results)
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // Destructure product details
  const { name, price, description, category, image } = product;

  return (
    <div>
      <h1>{name}</h1>
      <p>{category}</p>
      <p>{description}</p>
      <p>Price: ${price}</p>

      {image && (
        <Image
          src={`https://cdn.sanity.io/images/${image}`}
          alt={name}
          width={500}
          height={500}
        />
      )}
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const { id } = params;

  // Fetch product data using the provided id
  const product = await client.fetch(
    `*[_type=="product" && _id == $id]{
      id: _id,
      name,
      price,
      description,
      category,
      "image": image.asset._ref
    }`,
    { id }
  );

  // If product not found, return 404
  if (!product || product.length === 0) {
    return {
      notFound: true,
    };
  }

  // Pass the product data to the page component as props
  return {
    props: {
      product: product[0],
    },
  };
}

export default ProductDetails;
