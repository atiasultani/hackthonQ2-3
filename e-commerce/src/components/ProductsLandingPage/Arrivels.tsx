import React from 'react';
import { client } from '@/sanity/lib/client'; // Adjust the path based on your project structure
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';


// Define a TypeScript interface for the arrival data
interface Arrival {
  _id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
}

// Fetch the data with proper typing
const getData = async (): Promise<Arrival[]> => {
  const response = await client.fetch(`*[_type == "arrivals"] {
    _id,
    name,
    price,
    category,
    "imageUrl": image.asset->url
  }`);
  return response;
};

const Arrivals = async () => {
  const arrivals = await getData();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">New Arrivals</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {arrivals.map((arrival: Arrival) => (
          <div
            key={arrival._id}
            className="border rounded-lg p-4 flex flex-col items-center bg-white shadow hover:shadow-lg transition-shadow"
          >
            {arrival.imageUrl && (
              <div className="w-full h-48 relative mb-4">
                <Image
                  src={urlFor(arrival.imageUrl).width(400).height(300).url()}
                  alt={arrival.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
            )}
            <h2 className="text-lg font-semibold text-gray-800 text-center">
              {arrival.name}
            </h2>
            <p className="text-gray-500">Category: {arrival.category}</p>
            <p className="text-green-600 font-bold">Price: ${arrival.price}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">

          <button className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition-colors">
            <a href="/newArrivals">View All</a>
          </button>
      
      </div>
    </div>
  );
};

export default Arrivals;
