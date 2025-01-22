'use client';

import { useState } from 'react';
import Image from 'next/image';
const About = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">About Us</h1>

          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
          </button>
        
        
        </header>
        <div className='flex justify-center '>
        <Image src="/about.jpg" alt="img" width={150} height={150}  className='rounded-3xl'/>
        </div>

        <main className="mt-8">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg leading-7">
              Our mission is to deliver high-quality web solutions that empower businesses to thrive in the digital age.
              With cutting-edge technologies and a focus on innovation, we strive to create impactful and user-friendly
              experiences.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p className="text-lg leading-7">
              We envision a world where technology bridges gaps, fosters creativity, and transforms industries. Our goal
              is to be at the forefront of this transformation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
            <ul className="list-disc list-inside text-lg leading-7 space-y-3">
              <li>Innovative solutions tailored to your needs.</li>
              <li>Expertise in modern frameworks like Next.js.</li>
              <li>Commitment to delivering excellent results on time.</li>
            </ul>
          </section>
        </main>

        <footer className="mt-12 text-center">
          <p className="text-sm">&copy; 2025 Blogers . All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default About;
