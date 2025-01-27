export interface Product {
    _id: string;
    id: string;
    name: string;
    mainHeading: string;
    title: string;
    price: number;
    discountedPrice: number;
    imageUrl: string;
    quantity: number;
  }
  
// CartItem type
export interface CartItem {
  _id: string;
  mainHeading: string;
  title: string;
  discountedPrice: number;
  quantity: number;
}
 
export interface cart { cart: any }
  

export type CartContextType = {

  cartItems: CartItem[];

  // other properties

};
