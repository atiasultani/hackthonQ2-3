import React from 'react';
import AddToCart from '@/components/AddToCartButton'; // Adjust the path as necessary

export async function generateStaticParams() {
    const res = await fetch(`https://template1-neon-nu.vercel.app/api/products`);
  
    if (!res.ok) {
      throw new Error('Failed to fetch product IDs');
    }
  
    const products = await res.json();
  
    return products.map((product: { _id: string }) => ({
      id: product._id,
    }));
  }
  
// Fetch a single product by ID
async function fetchProduct(id: string) {
  const res = await fetch(`https://template1-neon-nu.vercel.app/api/products/${id}`);
  
  if (!res.ok) {
    throw new Error(`Failed to fetch product. Status: ${res.status}`);
  }

  return res.json();
}

// Dynamic Product Page Component
export default async function ProductPage({ params }: { params: { id: string } }) {
  try {
    const product = await fetchProduct(params.id);

    return (
      <div className="flex flex-col items-center px-4 py-8 md:px-16 lg:px-32">
        <div className="max-w-4xl w-full">
          {/* Product Image */}
          <div className="flex justify-center mb-6">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="rounded-lg shadow-lg w-full max-w-md md:max-w-lg object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-10">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">{product.title}</h1>
            <h2 className="text-lg md:text-xl font-medium text-gray-600 mb-4">{product.mainHeading}</h2>
            
            {/* Price Details */}
            <div className="flex items-center gap-4 mb-6">
              <p className="text-xl font-bold text-gray-800">
                Price: <span className="text-green-600">${product.price}</span>
              </p>
              {product.discountedPrice && (
                <p className="text-lg line-through text-gray-500">
                  ${product.discountedPrice}
                </p>
              )}
            </div>

            {/* Add to Cart Button */}
            <div className="flex justify-start">
              <AddToCart product={product} />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error: any) {
    console.error('Error fetching product:', error.message);
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load product. Please check the ID or try again later.
      </div>
    );
  }
}
