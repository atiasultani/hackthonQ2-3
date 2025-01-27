// api/auth/login.js
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { email, password } = loginSchema.parse(req.body);

      // **Replace this with your actual authentication logic**
      // 1. Check if the provided credentials are valid 
      //    (e.g., check against a database, API, or user directory)
      if (email === 'admin@gmail.com' && password === 'password123') { 
        // Replace with actual authentication logic
        const user = { 
          id: 1, 
          name: 'Admin User', 
          email: 'admin@gmail.com', 
          role: 'admin' 
        };
        res.status(200).json(user); 
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }

    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: 'Invalid input data', errors: error.errors });
      } else {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}