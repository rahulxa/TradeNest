import React from 'react'
import HeroProduct from "./HeroProduct"
import LeftSection from "./LeftSection"
import RightSection from "./RightSection"
import Universe from "./Universe"

function ProductPage() {
  return (
    <>
      <HeroProduct />
      <LeftSection
        imageURL="Media/Images/products-kite.png"
        productName="Kite"
        productDesription="Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices. "
        tryDemo=""
        learnMore=""
        googlePlay=""
        appStore=""
      />
      <RightSection />
      <LeftSection
        imageURL="Media\Images\products-coin.png"
        productName="Coin"
        productDesription="Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices.  "
        tryDemo=""
        learnMore=""
        googlePlay=""
        appStore=""
      />
      <RightSection />
      <LeftSection
        imageURL="Media\Images\varsity-products.png"
        productName="Varsity"
        productDesription="An easy to grasp, collection of stock market lessons with in-depth coverage and illustrations. Content is broken down into bite-size cards to help you learn on the go. "
        tryDemo=""
        learnMore=""
        googlePlay=""
        appStore=""
      />
      <Universe />
    </>
  )
}

export default ProductPage