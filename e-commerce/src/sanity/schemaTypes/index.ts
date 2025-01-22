import { type SchemaTypeDefinition } from 'sanity'
import products from './products'
import arrivals from '../arrivals'
import topSelling from '../topSelling'
import brands from '../brands'
import mainCove from '../mainCover' 
import browseDress from '../browseDress'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [products,arrivals,topSelling,brands,mainCove,browseDress],
}
