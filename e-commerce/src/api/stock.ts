// pages/api/stock.ts
import { NextApiRequest, NextApiResponse } from 'next';

// Mock database for storing stock data
let stockDatabase: { [productId: string]: { stock: number } } = {};

// API handler
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET': {
      // Return all stock data
      return res.status(200).json(stockDatabase);
    }

    case 'POST': {
      const { productId, stock } = req.body;

      if (!productId || typeof stock !== 'number') {
        return res.status(400).json({ error: 'Invalid product data' });
      }

      // Add or update stock for a product
      stockDatabase[productId] = { stock };
      return res.status(200).json({
        message: `Stock for product ${productId} updated successfully`,
        stock: stockDatabase[productId],
      });
    }

    case 'PUT': {
      const { productId, stockChange } = req.body;

      if (!productId || typeof stockChange !== 'number') {
        return res.status(400).json({ error: 'Invalid product data' });
      }

      // Update stock by adding or subtracting stockChange
      if (stockDatabase[productId]) {
        stockDatabase[productId].stock += stockChange;
        return res.status(200).json({
          message: `Stock for product ${productId} updated successfully`,
          stock: stockDatabase[productId],
        });
      } else {
        return res
          .status(404)
          .json({ error: `Product ${productId} not found` });
      }
    }

    case 'DELETE': {
      const { productId } = req.body;

      if (!productId || !stockDatabase[productId]) {
        return res
          .status(404)
          .json({ error: `Product ${productId} not found` });
      }

      // Delete product from stock
      delete stockDatabase[productId];
      return res
        .status(200)
        .json({ message: `Product ${productId} deleted successfully` });
    }

    default: {
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res
        .status(405)
        .end(`Method ${method} Not Allowed`);
    }
  }
}
