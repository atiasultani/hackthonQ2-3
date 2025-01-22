import client from '@/sanity/lib/client';
import products from '@/sanity/schemaTypes/products';
import {react} from 'react';


interface Product{name:string;id:string;price:number;desprition:string;stock:number;imageUrl:string;discountedPrice:number;_id:string;size:string }
const page= async ({params:{id}}:{params:{id:string}})=>{
const query = `*[_type=="product" && _id == $id]{
"id":_id
name,
price,
description,
category,
"image":image.asset._ref,
}[0]`

const shopProducts:Product|null=await client.fetch(query,{id})
if(!shopProducts){return<div><h1>product not found</h1></div>}
return{
  <div key={shopProducts.id}>
  <h1>{shopProducts?.name}</h1>
  </div>}

return(
  <div>
<h1>ui</h1>
  </div>
)
}
export default shopProduct