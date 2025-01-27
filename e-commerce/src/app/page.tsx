import React from 'react'
import TopSelling from '@/components/ProductsLandingPage/TopSelling';
import BrowseDress from '@/components/ProductsLandingPage/BrowseByDress';
import MainCover from '@/components/ProductsLandingPage/MainCover';
import Brands from '@/components/Brands';
import NewArrivals from '../components/ProductsLandingPage/Arrivels';

const page = () => {
  return (
    <div>
    <MainCover/>
    <Brands/>
    <NewArrivals/>
    <TopSelling/>
    <BrowseDress/>
  
    </div>
  )
}

export default page






