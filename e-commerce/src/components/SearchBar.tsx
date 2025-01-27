'use client';
import { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import client from "@/sanity/lib/client";

type Product = {
  _id: string;
  name: string;
  price: number;
  discountPercent?: number;
  imageUrl?: string;
};

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState<string>(""); // For search input
  const [products, setProducts] = useState<Product[]>([]); // Full product list from backend
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Filtered products based on search

  // Fetch products from Sanity
  useEffect(() => {
    async function fetchProducts() {
      try {
        const data: Product[] = await client.fetch(`*[_type == "products"] {
          _id,
          name,
          "imageUrl": image.asset->url
        }`);
        setProducts(data); // Set the full product list
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }

    fetchProducts();
  }, []);

  // Handle search input changes
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Dynamically filter products based on the search query
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );

    // Update filtered products (show up to 5 results)
    setFilteredProducts(filtered.slice(0, 3));
  };

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-24 w-full max-w-7xl mx-auto">
      {/* Search bar */}
      <div className="relative flex flex-row items-center w-64 max-w-xl -mx-48  -mt-[9px] h-[40px] bg-gray-100 rounded-full shadow-sm">
        <Image
          src="/header2/search-icon.svg"
          alt="Search Icon"
          width={24}
          height={24}
          className="ml-3"
        />
        <input
          type="search"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={handleSearch}
          className="flex-1 ml-3 bg-transparent border-none outline-none placeholder-gray-500 text-sm sm:text-base"
        />

        {/* Show dropdown for filtered products only when there is a search query */}
        {searchQuery && filteredProducts.length > 0 && (
          <div className="absolute left-0 right-0 mt-80 bg-white shadow-lg max-h-60  border border-gray-200 rounded-md">
            <ul className="space-y-1">
              {filteredProducts.map((product) => (
                <li
                  key={product._id}
                  className="flex items-center p-3 text-sm hover:bg-gray-100 cursor-pointer"
                >
                  {product.imageUrl && (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="rounded-md mr-3"
                    />
                  )}
                  <div>
                    <p className="font-medium text-gray-800">{product.name}</p>
                  
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Display message when no products match */}
      {searchQuery && filteredProducts.length === 0 && (
        <div className="mt-2 text-gray-500 text-sm">
          No products found.
        </div>
      )}
    </div>
  );
}
