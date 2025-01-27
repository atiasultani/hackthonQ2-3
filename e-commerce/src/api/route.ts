// src/app/api/cart/route.ts
import { NextRequest, NextResponse } from 'next/server';

let cartData: Array<{ id: string; name: string; quantity: number; price: number }> = []; // In-memory cart storage

// GET: Retrieve cart items
export async function GET() {
  return NextResponse.json({ cartItems: cartData });
}

// POST: Add a new item to the cart
export async function POST(req: NextRequest) {
  try {
    const item = await req.json();

    const existingItem = cartData.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      // Update the quantity if the item already exists
      existingItem.quantity += item.quantity;
    } else {
      // Add a new item
      cartData.push(item);
    }

    return NextResponse.json({ message: 'Item added to cart successfully', cartItems: cartData });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add item to cart' }, { status: 500 });
  }
}

// PUT: Update an item in the cart
export async function PUT(req: NextRequest) {
  try {
    const item = await req.json();

    const existingItemIndex = cartData.findIndex((cartItem) => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      // Update the existing item
      cartData[existingItemIndex] = item;
      return NextResponse.json({ message: 'Item updated successfully', cartItems: cartData });
    } else {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}

// DELETE: Remove an item from the cart
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    cartData = cartData.filter((cartItem) => cartItem.id !== id);

    return NextResponse.json({ message: 'Item removed successfully', cartItems: cartData });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to remove item from cart' }, { status: 500 });
  }
}
